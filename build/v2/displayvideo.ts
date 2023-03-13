// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Display & Video 360 API Client for Deno
 * =======================================
 * 
 * Display & Video 360 API allows users to automate complex Display & Video 360 workflows, such as creating insertion orders and setting targeting options for individual line items.
 * 
 * Docs: https://developers.google.com/display-video/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Display & Video 360 API allows users to automate complex Display & Video 360
 * workflows, such as creating insertion orders and setting targeting options
 * for individual line items.
 */
export class DisplayVideo {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://displayvideo.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Uploads an asset. Returns the ID of the newly uploaded asset if
   * successful. The asset file size should be no more than 10 MB for images,
   * 200 MB for ZIP files, and 1 GB for videos. Must be used within the
   * [multipart media upload
   * process](/display-video/api/guides/how-tos/upload#multipart). Examples
   * using provided client libraries can be found in our [Creating Creatives
   * guide](/display-video/api/guides/creating-creatives/overview#upload_an_asset).
   *
   * @param advertiserId Required. The ID of the advertiser this asset belongs to.
   */
  async advertisersAssetsUpload(advertiserId: bigint, req: CreateAssetRequest): Promise<CreateAssetResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/assets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreateAssetResponse(data);
  }

  /**
   * Audits an advertiser. Returns the counts of used entities per resource
   * type under the advertiser provided. Used entities count towards their
   * respective resource limit. See
   * https://support.google.com/displayvideo/answer/6071450.
   *
   * @param advertiserId Required. The ID of the advertiser to audit.
   */
  async advertisersAudit(advertiserId: bigint, opts: AdvertisersAuditOptions = {}): Promise<AuditAdvertiserResponse> {
    advertiserId = String(advertiserId);
    opts = serializeAdvertisersAuditOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }:audit`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAuditAdvertiserResponse(data);
  }

  /**
   * Creates a new campaign. Returns the newly created campaign if successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser the campaign belongs to.
   */
  async advertisersCampaignsCreate(advertiserId: bigint, req: Campaign): Promise<Campaign> {
    advertiserId = String(advertiserId);
    req = serializeCampaign(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCampaign(data);
  }

  /**
   * Permanently deletes a campaign. A deleted campaign cannot be recovered.
   * The campaign should be archived first, i.e. set entity_status to
   * `ENTITY_STATUS_ARCHIVED`, to be able to delete it.
   *
   * @param advertiserId The ID of the advertiser this campaign belongs to.
   * @param campaignId The ID of the campaign we need to delete.
   */
  async advertisersCampaignsDelete(advertiserId: bigint, campaignId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    campaignId = String(campaignId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns/${ campaignId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a campaign.
   *
   * @param advertiserId Required. The ID of the advertiser this campaign belongs to.
   * @param campaignId Required. The ID of the campaign to fetch.
   */
  async advertisersCampaignsGet(advertiserId: bigint, campaignId: bigint): Promise<Campaign> {
    advertiserId = String(advertiserId);
    campaignId = String(campaignId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns/${ campaignId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCampaign(data);
  }

  /**
   * Lists campaigns in an advertiser. The order is defined by the order_by
   * parameter. If a filter by entity_status is not specified, campaigns with
   * `ENTITY_STATUS_ARCHIVED` will not be included in the results.
   *
   * @param advertiserId The ID of the advertiser to list campaigns for.
   */
  async advertisersCampaignsList(advertiserId: bigint, opts: AdvertisersCampaignsListOptions = {}): Promise<ListCampaignsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns`);
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
    return deserializeListCampaignsResponse(data);
  }

  /**
   * Lists assigned targeting options of a campaign across targeting types.
   *
   * @param advertiserId Required. The ID of the advertiser the campaign belongs to.
   * @param campaignId Required. The ID of the campaign to list assigned targeting options for.
   */
  async advertisersCampaignsListAssignedTargetingOptions(advertiserId: bigint, campaignId: bigint, opts: AdvertisersCampaignsListAssignedTargetingOptionsOptions = {}): Promise<BulkListCampaignAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    campaignId = String(campaignId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns/${ campaignId }:listAssignedTargetingOptions`);
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
    return deserializeBulkListCampaignAssignedTargetingOptionsResponse(data);
  }

  /**
   * Updates an existing campaign. Returns the updated campaign if successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser the campaign belongs to.
   * @param campaignId Output only. The unique ID of the campaign. Assigned by the system.
   */
  async advertisersCampaignsPatch(advertiserId: bigint, campaignId: bigint, req: Campaign, opts: AdvertisersCampaignsPatchOptions = {}): Promise<Campaign> {
    advertiserId = String(advertiserId);
    campaignId = String(campaignId);
    req = serializeCampaign(req);
    opts = serializeAdvertisersCampaignsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns/${ campaignId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCampaign(data);
  }

  /**
   * Gets a single targeting option assigned to a campaign.
   *
   * @param advertiserId Required. The ID of the advertiser the campaign belongs to.
   * @param assignedTargetingOptionId Required. An identifier unique to the targeting type in this campaign that identifies the assigned targeting option being requested.
   * @param campaignId Required. The ID of the campaign the assigned targeting option belongs to.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersCampaignsTargetingTypesAssignedTargetingOptionsGet(advertiserId: bigint, assignedTargetingOptionId: string, campaignId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    campaignId = String(campaignId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns/${ campaignId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Lists the targeting options assigned to a campaign for a specified
   * targeting type.
   *
   * @param advertiserId Required. The ID of the advertiser the campaign belongs to.
   * @param campaignId Required. The ID of the campaign to list assigned targeting options for.
   * @param targetingType Required. Identifies the type of assigned targeting options to list. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersCampaignsTargetingTypesAssignedTargetingOptionsList(advertiserId: bigint, campaignId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", opts: AdvertisersCampaignsTargetingTypesAssignedTargetingOptionsListOptions = {}): Promise<ListCampaignAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    campaignId = String(campaignId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/campaigns/${ campaignId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
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
    return deserializeListCampaignAssignedTargetingOptionsResponse(data);
  }

  /**
   * Creates a new channel. Returns the newly created channel if successful.
   *
   * @param advertiserId The ID of the advertiser that owns the created channel.
   */
  async advertisersChannelsCreate(advertiserId: bigint, req: Channel, opts: AdvertisersChannelsCreateOptions = {}): Promise<Channel> {
    advertiserId = String(advertiserId);
    req = serializeChannel(req);
    opts = serializeAdvertisersChannelsCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Gets a channel for a partner or advertiser.
   *
   * @param advertiserId The ID of the advertiser that owns the fetched channel.
   * @param channelId Required. The ID of the channel to fetch.
   */
  async advertisersChannelsGet(advertiserId: bigint, channelId: bigint, opts: AdvertisersChannelsGetOptions = {}): Promise<Channel> {
    advertiserId = String(advertiserId);
    channelId = String(channelId);
    opts = serializeAdvertisersChannelsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels/${ channelId }`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeChannel(data);
  }

  /**
   * Lists channels for a partner or advertiser.
   *
   * @param advertiserId The ID of the advertiser that owns the channels.
   */
  async advertisersChannelsList(advertiserId: bigint, opts: AdvertisersChannelsListOptions = {}): Promise<ListChannelsResponse> {
    advertiserId = String(advertiserId);
    opts = serializeAdvertisersChannelsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels`);
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListChannelsResponse(data);
  }

  /**
   * Updates a channel. Returns the updated channel if successful.
   *
   * @param advertiserId The ID of the advertiser that owns the created channel.
   * @param channelId Output only. The unique ID of the channel. Assigned by the system.
   */
  async advertisersChannelsPatch(advertiserId: bigint, channelId: bigint, req: Channel, opts: AdvertisersChannelsPatchOptions = {}): Promise<Channel> {
    advertiserId = String(advertiserId);
    channelId = String(channelId);
    req = serializeChannel(req);
    opts = serializeAdvertisersChannelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels/${ channelId }`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Bulk edits sites under a single channel. The operation will delete the
   * sites provided in BulkEditSitesRequest.deleted_sites and then create the
   * sites provided in BulkEditSitesRequest.created_sites.
   *
   * @param advertiserId The ID of the advertiser that owns the parent channel.
   * @param channelId Required. The ID of the parent channel to which the sites belong.
   */
  async advertisersChannelsSitesBulkEdit(advertiserId: bigint, channelId: bigint, req: BulkEditSitesRequest): Promise<BulkEditSitesResponse> {
    advertiserId = String(advertiserId);
    channelId = String(channelId);
    req = serializeBulkEditSitesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels/${ channelId }/sites:bulkEdit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BulkEditSitesResponse;
  }

  /**
   * Creates a site in a channel.
   *
   * @param advertiserId The ID of the advertiser that owns the parent channel.
   * @param channelId Required. The ID of the parent channel in which the site will be created.
   */
  async advertisersChannelsSitesCreate(advertiserId: bigint, channelId: bigint, req: Site, opts: AdvertisersChannelsSitesCreateOptions = {}): Promise<Site> {
    advertiserId = String(advertiserId);
    channelId = String(channelId);
    opts = serializeAdvertisersChannelsSitesCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels/${ channelId }/sites`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Site;
  }

  /**
   * Deletes a site from a channel.
   *
   * @param advertiserId The ID of the advertiser that owns the parent channel.
   * @param channelId Required. The ID of the parent channel to which the site belongs.
   * @param urlOrAppId Required. The URL or app ID of the site to delete.
   */
  async advertisersChannelsSitesDelete(advertiserId: bigint, channelId: bigint, urlOrAppId: string, opts: AdvertisersChannelsSitesDeleteOptions = {}): Promise<Empty> {
    advertiserId = String(advertiserId);
    channelId = String(channelId);
    opts = serializeAdvertisersChannelsSitesDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels/${ channelId }/sites/${ urlOrAppId }`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists sites in a channel.
   *
   * @param advertiserId The ID of the advertiser that owns the parent channel.
   * @param channelId Required. The ID of the parent channel to which the requested sites belong.
   */
  async advertisersChannelsSitesList(advertiserId: bigint, channelId: bigint, opts: AdvertisersChannelsSitesListOptions = {}): Promise<ListSitesResponse> {
    advertiserId = String(advertiserId);
    channelId = String(channelId);
    opts = serializeAdvertisersChannelsSitesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels/${ channelId }/sites`);
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListSitesResponse;
  }

  /**
   * Replaces all of the sites under a single channel. The operation will
   * replace the sites under a channel with the sites provided in
   * ReplaceSitesRequest.new_sites.
   *
   * @param advertiserId The ID of the advertiser that owns the parent channel.
   * @param channelId Required. The ID of the parent channel whose sites will be replaced.
   */
  async advertisersChannelsSitesReplace(advertiserId: bigint, channelId: bigint, req: ReplaceSitesRequest): Promise<ReplaceSitesResponse> {
    advertiserId = String(advertiserId);
    channelId = String(channelId);
    req = serializeReplaceSitesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/channels/${ channelId }/sites:replace`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReplaceSitesResponse;
  }

  /**
   * Creates a new advertiser. Returns the newly created advertiser if
   * successful. This method can take up to 180 seconds to complete.
   *
   */
  async advertisersCreate(req: Advertiser): Promise<Advertiser> {
    req = serializeAdvertiser(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAdvertiser(data);
  }

  /**
   * Creates a new creative. Returns the newly created creative if successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser the creative belongs to.
   */
  async advertisersCreativesCreate(advertiserId: bigint, req: Creative): Promise<Creative> {
    advertiserId = String(advertiserId);
    req = serializeCreative(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/creatives`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Deletes a creative. Returns error code `NOT_FOUND` if the creative does
   * not exist. The creative should be archived first, i.e. set entity_status to
   * `ENTITY_STATUS_ARCHIVED`, before it can be deleted.
   *
   * @param advertiserId The ID of the advertiser this creative belongs to.
   * @param creativeId The ID of the creative to be deleted.
   */
  async advertisersCreativesDelete(advertiserId: bigint, creativeId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    creativeId = String(creativeId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/creatives/${ creativeId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a creative.
   *
   * @param advertiserId Required. The ID of the advertiser this creative belongs to.
   * @param creativeId Required. The ID of the creative to fetch.
   */
  async advertisersCreativesGet(advertiserId: bigint, creativeId: bigint): Promise<Creative> {
    advertiserId = String(advertiserId);
    creativeId = String(creativeId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/creatives/${ creativeId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCreative(data);
  }

  /**
   * Lists creatives in an advertiser. The order is defined by the order_by
   * parameter. If a filter by entity_status is not specified, creatives with
   * `ENTITY_STATUS_ARCHIVED` will not be included in the results.
   *
   * @param advertiserId Required. The ID of the advertiser to list creatives for.
   */
  async advertisersCreativesList(advertiserId: bigint, opts: AdvertisersCreativesListOptions = {}): Promise<ListCreativesResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/creatives`);
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
    return deserializeListCreativesResponse(data);
  }

  /**
   * Updates an existing creative. Returns the updated creative if successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser the creative belongs to.
   * @param creativeId Output only. The unique ID of the creative. Assigned by the system.
   */
  async advertisersCreativesPatch(advertiserId: bigint, creativeId: bigint, req: Creative, opts: AdvertisersCreativesPatchOptions = {}): Promise<Creative> {
    advertiserId = String(advertiserId);
    creativeId = String(creativeId);
    req = serializeCreative(req);
    opts = serializeAdvertisersCreativesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/creatives/${ creativeId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCreative(data);
  }

  /**
   * Deletes an advertiser. Deleting an advertiser will delete all of its child
   * resources, for example, campaigns, insertion orders and line items. A
   * deleted advertiser cannot be recovered.
   *
   * @param advertiserId The ID of the advertiser we need to delete.
   */
  async advertisersDelete(advertiserId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Edits targeting options under a single advertiser. The operation will
   * delete the assigned targeting options provided in
   * BulkEditAdvertiserAssignedTargetingOptionsRequest.delete_requests and then
   * create the assigned targeting options provided in
   * BulkEditAdvertiserAssignedTargetingOptionsRequest.create_requests .
   *
   * @param advertiserId Required. The ID of the advertiser.
   */
  async advertisersEditAssignedTargetingOptions(advertiserId: bigint, req: BulkEditAdvertiserAssignedTargetingOptionsRequest): Promise<BulkEditAdvertiserAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    req = serializeBulkEditAdvertiserAssignedTargetingOptionsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }:editAssignedTargetingOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBulkEditAdvertiserAssignedTargetingOptionsResponse(data);
  }

  /**
   * Gets an advertiser.
   *
   * @param advertiserId Required. The ID of the advertiser to fetch.
   */
  async advertisersGet(advertiserId: bigint): Promise<Advertiser> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAdvertiser(data);
  }

  /**
   * Creates a new insertion order. Returns the newly created insertion order
   * if successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser the insertion order belongs to.
   */
  async advertisersInsertionOrdersCreate(advertiserId: bigint, req: InsertionOrder): Promise<InsertionOrder> {
    advertiserId = String(advertiserId);
    req = serializeInsertionOrder(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeInsertionOrder(data);
  }

  /**
   * Deletes an insertion order. Returns error code `NOT_FOUND` if the
   * insertion order does not exist. The insertion order should be archived
   * first, i.e. set entity_status to `ENTITY_STATUS_ARCHIVED`, to be able to
   * delete it.
   *
   * @param advertiserId The ID of the advertiser this insertion order belongs to.
   * @param insertionOrderId The ID of the insertion order to delete.
   */
  async advertisersInsertionOrdersDelete(advertiserId: bigint, insertionOrderId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an insertion order. Returns error code `NOT_FOUND` if the insertion
   * order does not exist.
   *
   * @param advertiserId Required. The ID of the advertiser this insertion order belongs to.
   * @param insertionOrderId Required. The ID of the insertion order to fetch.
   */
  async advertisersInsertionOrdersGet(advertiserId: bigint, insertionOrderId: bigint): Promise<InsertionOrder> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInsertionOrder(data);
  }

  /**
   * Lists insertion orders in an advertiser. The order is defined by the
   * order_by parameter. If a filter by entity_status is not specified,
   * insertion orders with `ENTITY_STATUS_ARCHIVED` will not be included in the
   * results.
   *
   * @param advertiserId Required. The ID of the advertiser to list insertion orders for.
   */
  async advertisersInsertionOrdersList(advertiserId: bigint, opts: AdvertisersInsertionOrdersListOptions = {}): Promise<ListInsertionOrdersResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders`);
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
    return deserializeListInsertionOrdersResponse(data);
  }

  /**
   * Lists assigned targeting options of an insertion order across targeting
   * types.
   *
   * @param advertiserId Required. The ID of the advertiser the insertion order belongs to.
   * @param insertionOrderId Required. The ID of the insertion order to list assigned targeting options for.
   */
  async advertisersInsertionOrdersListAssignedTargetingOptions(advertiserId: bigint, insertionOrderId: bigint, opts: AdvertisersInsertionOrdersListAssignedTargetingOptionsOptions = {}): Promise<BulkListInsertionOrderAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }:listAssignedTargetingOptions`);
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
    return deserializeBulkListInsertionOrderAssignedTargetingOptionsResponse(data);
  }

  /**
   * Updates an existing insertion order. Returns the updated insertion order
   * if successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser the insertion order belongs to.
   * @param insertionOrderId Output only. The unique ID of the insertion order. Assigned by the system.
   */
  async advertisersInsertionOrdersPatch(advertiserId: bigint, insertionOrderId: bigint, req: InsertionOrder, opts: AdvertisersInsertionOrdersPatchOptions = {}): Promise<InsertionOrder> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    req = serializeInsertionOrder(req);
    opts = serializeAdvertisersInsertionOrdersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeInsertionOrder(data);
  }

  /**
   * Assigns a targeting option to an insertion order. Returns the assigned
   * targeting option if successful. Supported targeting types: *
   * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_BROWSER` *
   * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` *
   * `TARGETING_TYPE_DEVICE_MAKE_MODEL` *
   * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` *
   * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_GENDER` *
   * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` *
   * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OPERATING_SYSTEM`
   * * `TARGETING_TYPE_PARENTAL_STATUS` *
   * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` *
   * `TARGETING_TYPE_VIEWABILITY`
   *
   * @param advertiserId Required. The ID of the advertiser the insertion order belongs to.
   * @param insertionOrderId Required. The ID of the insertion order the assigned targeting option will belong to.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersInsertionOrdersTargetingTypesAssignedTargetingOptionsCreate(advertiserId: bigint, insertionOrderId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", req: AssignedTargetingOption): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    req = serializeAssignedTargetingOption(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Deletes an assigned targeting option from an insertion order. Supported
   * targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_BROWSER` *
   * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` *
   * `TARGETING_TYPE_DEVICE_MAKE_MODEL` *
   * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` *
   * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_GENDER` *
   * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` *
   * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OPERATING_SYSTEM`
   * * `TARGETING_TYPE_PARENTAL_STATUS` *
   * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` *
   * `TARGETING_TYPE_VIEWABILITY`
   *
   * @param advertiserId Required. The ID of the advertiser the insertion order belongs to.
   * @param assignedTargetingOptionId Required. The ID of the assigned targeting option to delete.
   * @param insertionOrderId Required. The ID of the insertion order the assigned targeting option belongs to.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersInsertionOrdersTargetingTypesAssignedTargetingOptionsDelete(advertiserId: bigint, assignedTargetingOptionId: string, insertionOrderId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<Empty> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single targeting option assigned to an insertion order.
   *
   * @param advertiserId Required. The ID of the advertiser the insertion order belongs to.
   * @param assignedTargetingOptionId Required. An identifier unique to the targeting type in this insertion order that identifies the assigned targeting option being requested.
   * @param insertionOrderId Required. The ID of the insertion order the assigned targeting option belongs to.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersInsertionOrdersTargetingTypesAssignedTargetingOptionsGet(advertiserId: bigint, assignedTargetingOptionId: string, insertionOrderId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Lists the targeting options assigned to an insertion order.
   *
   * @param advertiserId Required. The ID of the advertiser the insertion order belongs to.
   * @param insertionOrderId Required. The ID of the insertion order to list assigned targeting options for.
   * @param targetingType Required. Identifies the type of assigned targeting options to list. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersInsertionOrdersTargetingTypesAssignedTargetingOptionsList(advertiserId: bigint, insertionOrderId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", opts: AdvertisersInsertionOrdersTargetingTypesAssignedTargetingOptionsListOptions = {}): Promise<ListInsertionOrderAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    insertionOrderId = String(insertionOrderId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/insertionOrders/${ insertionOrderId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
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
    return deserializeListInsertionOrderAssignedTargetingOptionsResponse(data);
  }

  /**
   * Lists invoices posted for an advertiser in a given month. Invoices
   * generated by billing profiles with a "Partner" invoice level are not
   * retrievable through this method.
   *
   * @param advertiserId Required. The ID of the advertiser to list invoices for.
   */
  async advertisersInvoicesList(advertiserId: bigint, opts: AdvertisersInvoicesListOptions = {}): Promise<ListInvoicesResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/invoices`);
    if (opts.issueMonth !== undefined) {
      url.searchParams.append("issueMonth", String(opts.issueMonth));
    }
    if (opts.loiSapinInvoiceType !== undefined) {
      url.searchParams.append("loiSapinInvoiceType", String(opts.loiSapinInvoiceType));
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
    return deserializeListInvoicesResponse(data);
  }

  /**
   * Retrieves the invoice currency used by an advertiser in a given month.
   *
   * @param advertiserId Required. The ID of the advertiser to lookup currency for.
   */
  async advertisersInvoicesLookupInvoiceCurrency(advertiserId: bigint, opts: AdvertisersInvoicesLookupInvoiceCurrencyOptions = {}): Promise<LookupInvoiceCurrencyResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/invoices:lookupInvoiceCurrency`);
    if (opts.invoiceMonth !== undefined) {
      url.searchParams.append("invoiceMonth", String(opts.invoiceMonth));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LookupInvoiceCurrencyResponse;
  }

  /**
   * Bulk edits targeting options under multiple line items. The operation will
   * delete the assigned targeting options provided in
   * BulkEditAssignedTargetingOptionsRequest.delete_requests and then create the
   * assigned targeting options provided in
   * BulkEditAssignedTargetingOptionsRequest.create_requests. Requests to this
   * endpoint cannot be made concurrently with the following requests updating
   * the same line item: * BulkUpdate * UpdateLineItem *
   * CreateLineItemAssignedTargetingOption *
   * DeleteLineItemAssignedTargetingOption
   *
   * @param advertiserId Required. The ID of the advertiser the line items belong to.
   */
  async advertisersLineItemsBulkEditAssignedTargetingOptions(advertiserId: bigint, req: BulkEditAssignedTargetingOptionsRequest): Promise<BulkEditAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    req = serializeBulkEditAssignedTargetingOptionsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems:bulkEditAssignedTargetingOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BulkEditAssignedTargetingOptionsResponse;
  }

  /**
   * Lists assigned targeting options for multiple line items across targeting
   * types.
   *
   * @param advertiserId Required. The ID of the advertiser the line items belongs to.
   */
  async advertisersLineItemsBulkListAssignedTargetingOptions(advertiserId: bigint, opts: AdvertisersLineItemsBulkListAssignedTargetingOptionsOptions = {}): Promise<BulkListAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    opts = serializeAdvertisersLineItemsBulkListAssignedTargetingOptionsOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems:bulkListAssignedTargetingOptions`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.lineItemIds !== undefined) {
      url.searchParams.append("lineItemIds", String(opts.lineItemIds));
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
    return deserializeBulkListAssignedTargetingOptionsResponse(data);
  }

  /**
   * Updates multiple line items. Requests to this endpoint cannot be made
   * concurrently with the following requests updating the same line item: *
   * BulkEditAssignedTargetingOptions * UpdateLineItem *
   * CreateLineItemAssignedTargetingOption *
   * DeleteLineItemAssignedTargetingOption
   *
   * @param advertiserId Required. The ID of the advertiser this line item belongs to.
   */
  async advertisersLineItemsBulkUpdate(advertiserId: bigint, req: BulkUpdateLineItemsRequest): Promise<BulkUpdateLineItemsResponse> {
    advertiserId = String(advertiserId);
    req = serializeBulkUpdateLineItemsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems:bulkUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBulkUpdateLineItemsResponse(data);
  }

  /**
   * Creates a new line item. Returns the newly created line item if
   * successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser the line item belongs to.
   */
  async advertisersLineItemsCreate(advertiserId: bigint, req: LineItem): Promise<LineItem> {
    advertiserId = String(advertiserId);
    req = serializeLineItem(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLineItem(data);
  }

  /**
   * Deletes a line item. Returns error code `NOT_FOUND` if the line item does
   * not exist. The line item should be archived first, i.e. set entity_status
   * to `ENTITY_STATUS_ARCHIVED`, to be able to delete it.
   *
   * @param advertiserId The ID of the advertiser this line item belongs to.
   * @param lineItemId The ID of the line item to delete.
   */
  async advertisersLineItemsDelete(advertiserId: bigint, lineItemId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Duplicates a line item. Returns the ID of the created line item if
   * successful.
   *
   * @param advertiserId Required. The ID of the advertiser this line item belongs to.
   * @param lineItemId Required. The ID of the line item to duplicate.
   */
  async advertisersLineItemsDuplicate(advertiserId: bigint, lineItemId: bigint, req: DuplicateLineItemRequest): Promise<DuplicateLineItemResponse> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }:duplicate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDuplicateLineItemResponse(data);
  }

  /**
   * Creates a new line item with settings (including targeting) inherited from
   * the insertion order and an `ENTITY_STATUS_DRAFT` entity_status. Returns the
   * newly created line item if successful. There are default values based on
   * the three fields: * The insertion order's insertion_order_type * The
   * insertion order's automation_type * The given line_item_type
   *
   * @param advertiserId Required. The ID of the advertiser this line item belongs to.
   */
  async advertisersLineItemsGenerateDefault(advertiserId: bigint, req: GenerateDefaultLineItemRequest): Promise<LineItem> {
    advertiserId = String(advertiserId);
    req = serializeGenerateDefaultLineItemRequest(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems:generateDefault`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLineItem(data);
  }

  /**
   * Gets a line item.
   *
   * @param advertiserId Required. The ID of the advertiser this line item belongs to.
   * @param lineItemId Required. The ID of the line item to fetch.
   */
  async advertisersLineItemsGet(advertiserId: bigint, lineItemId: bigint): Promise<LineItem> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLineItem(data);
  }

  /**
   * Lists line items in an advertiser. The order is defined by the order_by
   * parameter. If a filter by entity_status is not specified, line items with
   * `ENTITY_STATUS_ARCHIVED` will not be included in the results.
   *
   * @param advertiserId Required. The ID of the advertiser to list line items for.
   */
  async advertisersLineItemsList(advertiserId: bigint, opts: AdvertisersLineItemsListOptions = {}): Promise<ListLineItemsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems`);
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
    return deserializeListLineItemsResponse(data);
  }

  /**
   * Updates an existing line item. Returns the updated line item if
   * successful. Requests to this endpoint cannot be made concurrently with the
   * following requests updating the same line item: *
   * BulkEditAssignedTargetingOptions * BulkUpdateLineItems *
   * CreateLineItemAssignedTargetingOption *
   * DeleteLineItemAssignedTargetingOption
   *
   * @param advertiserId Output only. The unique ID of the advertiser the line item belongs to.
   * @param lineItemId Output only. The unique ID of the line item. Assigned by the system.
   */
  async advertisersLineItemsPatch(advertiserId: bigint, lineItemId: bigint, req: LineItem, opts: AdvertisersLineItemsPatchOptions = {}): Promise<LineItem> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    req = serializeLineItem(req);
    opts = serializeAdvertisersLineItemsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeLineItem(data);
  }

  /**
   * Assigns a targeting option to a line item. Returns the assigned targeting
   * option if successful. Requests to this endpoint cannot be made concurrently
   * with the following requests updating the same line item: *
   * BulkEditAssignedTargetingOptions * BulkUpdate * UpdateLineItem *
   * DeleteLineItemAssignedTargetingOption
   *
   * @param advertiserId Required. The ID of the advertiser the line item belongs to.
   * @param lineItemId Required. The ID of the line item the assigned targeting option will belong to.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersLineItemsTargetingTypesAssignedTargetingOptionsCreate(advertiserId: bigint, lineItemId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", req: AssignedTargetingOption): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    req = serializeAssignedTargetingOption(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Deletes an assigned targeting option from a line item. Requests to this
   * endpoint cannot be made concurrently with the following requests updating
   * the same line item: * BulkEditAssignedTargetingOptions * BulkUpdate *
   * UpdateLineItem * CreateLineItemAssignedTargetingOption
   *
   * @param advertiserId Required. The ID of the advertiser the line item belongs to.
   * @param assignedTargetingOptionId Required. The ID of the assigned targeting option to delete.
   * @param lineItemId Required. The ID of the line item the assigned targeting option belongs to.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY`
   */
  async advertisersLineItemsTargetingTypesAssignedTargetingOptionsDelete(advertiserId: bigint, assignedTargetingOptionId: string, lineItemId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<Empty> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single targeting option assigned to a line item.
   *
   * @param advertiserId Required. The ID of the advertiser the line item belongs to.
   * @param assignedTargetingOptionId Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested.
   * @param lineItemId Required. The ID of the line item the assigned targeting option belongs to.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_YOUTUBE_CHANNEL` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) * `TARGETING_TYPE_YOUTUBE_VIDEO` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items)
   */
  async advertisersLineItemsTargetingTypesAssignedTargetingOptionsGet(advertiserId: bigint, assignedTargetingOptionId: string, lineItemId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Lists the targeting options assigned to a line item.
   *
   * @param advertiserId Required. The ID of the advertiser the line item belongs to.
   * @param lineItemId Required. The ID of the line item to list assigned targeting options for.
   * @param targetingType Required. Identifies the type of assigned targeting options to list. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_YOUTUBE_CHANNEL` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items) * `TARGETING_TYPE_YOUTUBE_VIDEO` (only for `LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE` line items)
   */
  async advertisersLineItemsTargetingTypesAssignedTargetingOptionsList(advertiserId: bigint, lineItemId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", opts: AdvertisersLineItemsTargetingTypesAssignedTargetingOptionsListOptions = {}): Promise<ListLineItemAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    lineItemId = String(lineItemId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/lineItems/${ lineItemId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
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
    return deserializeListLineItemAssignedTargetingOptionsResponse(data);
  }

  /**
   * Lists advertisers that are accessible to the current user. The order is
   * defined by the order_by parameter. A single partner_id is required.
   * Cross-partner listing is not supported.
   *
   */
  async advertisersList(opts: AdvertisersListOptions = {}): Promise<ListAdvertisersResponse> {
    opts = serializeAdvertisersListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers`);
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListAdvertisersResponse(data);
  }

  /**
   * Lists assigned targeting options of an advertiser across targeting types.
   *
   * @param advertiserId Required. The ID of the advertiser the line item belongs to.
   */
  async advertisersListAssignedTargetingOptions(advertiserId: bigint, opts: AdvertisersListAssignedTargetingOptionsOptions = {}): Promise<BulkListAdvertiserAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }:listAssignedTargetingOptions`);
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
    return deserializeBulkListAdvertiserAssignedTargetingOptionsResponse(data);
  }

  /**
   * Bulk edits multiple assignments between locations and a single location
   * list. The operation will delete the assigned locations provided in
   * BulkEditAssignedLocationsRequest.deleted_assigned_locations and then create
   * the assigned locations provided in
   * BulkEditAssignedLocationsRequest.created_assigned_locations.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the location list belongs.
   * @param locationListId Required. The ID of the location list to which these assignments are assigned.
   */
  async advertisersLocationListsAssignedLocationsBulkEdit(advertiserId: bigint, locationListId: bigint, req: BulkEditAssignedLocationsRequest): Promise<BulkEditAssignedLocationsResponse> {
    advertiserId = String(advertiserId);
    locationListId = String(locationListId);
    req = serializeBulkEditAssignedLocationsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists/${ locationListId }/assignedLocations:bulkEdit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BulkEditAssignedLocationsResponse;
  }

  /**
   * Creates an assignment between a location and a location list.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the location list belongs.
   * @param locationListId Required. The ID of the location list for which the assignment will be created.
   */
  async advertisersLocationListsAssignedLocationsCreate(advertiserId: bigint, locationListId: bigint, req: AssignedLocation): Promise<AssignedLocation> {
    advertiserId = String(advertiserId);
    locationListId = String(locationListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists/${ locationListId }/assignedLocations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AssignedLocation;
  }

  /**
   * Deletes the assignment between a location and a location list.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the location list belongs.
   * @param assignedLocationId Required. The ID of the assigned location to delete.
   * @param locationListId Required. The ID of the location list to which this assignment is assigned.
   */
  async advertisersLocationListsAssignedLocationsDelete(advertiserId: bigint, assignedLocationId: bigint, locationListId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    assignedLocationId = String(assignedLocationId);
    locationListId = String(locationListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists/${ locationListId }/assignedLocations/${ assignedLocationId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists locations assigned to a location list.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the location list belongs.
   * @param locationListId Required. The ID of the location list to which these assignments are assigned.
   */
  async advertisersLocationListsAssignedLocationsList(advertiserId: bigint, locationListId: bigint, opts: AdvertisersLocationListsAssignedLocationsListOptions = {}): Promise<ListAssignedLocationsResponse> {
    advertiserId = String(advertiserId);
    locationListId = String(locationListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists/${ locationListId }/assignedLocations`);
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
    return data as ListAssignedLocationsResponse;
  }

  /**
   * Creates a new location list. Returns the newly created location list if
   * successful.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the location list belongs.
   */
  async advertisersLocationListsCreate(advertiserId: bigint, req: LocationList): Promise<LocationList> {
    advertiserId = String(advertiserId);
    req = serializeLocationList(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLocationList(data);
  }

  /**
   * Gets a location list.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the fetched location list belongs.
   * @param locationListId Required. The ID of the location list to fetch.
   */
  async advertisersLocationListsGet(advertiserId: bigint, locationListId: bigint): Promise<LocationList> {
    advertiserId = String(advertiserId);
    locationListId = String(locationListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists/${ locationListId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLocationList(data);
  }

  /**
   * Lists location lists based on a given advertiser id.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the fetched location lists belong.
   */
  async advertisersLocationListsList(advertiserId: bigint, opts: AdvertisersLocationListsListOptions = {}): Promise<ListLocationListsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists`);
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
    return deserializeListLocationListsResponse(data);
  }

  /**
   * Updates a location list. Returns the updated location list if successful.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the location lists belongs.
   * @param locationListId Output only. The unique ID of the location list. Assigned by the system.
   */
  async advertisersLocationListsPatch(advertiserId: bigint, locationListId: bigint, req: LocationList, opts: AdvertisersLocationListsPatchOptions = {}): Promise<LocationList> {
    advertiserId = String(advertiserId);
    locationListId = String(locationListId);
    req = serializeLocationList(req);
    opts = serializeAdvertisersLocationListsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/locationLists/${ locationListId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeLocationList(data);
  }

  /**
   * Activates a manual trigger. Each activation of the manual trigger must be
   * at least 5 minutes apart, otherwise an error will be returned.
   *
   * @param advertiserId Required. The ID of the advertiser that the manual trigger belongs.
   * @param triggerId Required. The ID of the manual trigger to activate.
   */
  async advertisersManualTriggersActivate(advertiserId: bigint, triggerId: bigint, req: ActivateManualTriggerRequest): Promise<ManualTrigger> {
    advertiserId = String(advertiserId);
    triggerId = String(triggerId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/manualTriggers/${ triggerId }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeManualTrigger(data);
  }

  /**
   * Creates a new manual trigger. Returns the newly created manual trigger if
   * successful.
   *
   * @param advertiserId Required. Immutable. The unique ID of the advertiser that the manual trigger belongs to.
   */
  async advertisersManualTriggersCreate(advertiserId: bigint, req: ManualTrigger): Promise<ManualTrigger> {
    advertiserId = String(advertiserId);
    req = serializeManualTrigger(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/manualTriggers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeManualTrigger(data);
  }

  /**
   * Deactivates a manual trigger.
   *
   * @param advertiserId Required. The ID of the advertiser that the manual trigger belongs.
   * @param triggerId Required. The ID of the manual trigger to deactivate.
   */
  async advertisersManualTriggersDeactivate(advertiserId: bigint, triggerId: bigint, req: DeactivateManualTriggerRequest): Promise<ManualTrigger> {
    advertiserId = String(advertiserId);
    triggerId = String(triggerId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/manualTriggers/${ triggerId }:deactivate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeManualTrigger(data);
  }

  /**
   * Gets a manual trigger.
   *
   * @param advertiserId Required. The ID of the advertiser this manual trigger belongs to.
   * @param triggerId Required. The ID of the manual trigger to fetch.
   */
  async advertisersManualTriggersGet(advertiserId: bigint, triggerId: bigint): Promise<ManualTrigger> {
    advertiserId = String(advertiserId);
    triggerId = String(triggerId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/manualTriggers/${ triggerId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeManualTrigger(data);
  }

  /**
   * Lists manual triggers that are accessible to the current user for a given
   * advertiser ID. The order is defined by the order_by parameter. A single
   * advertiser_id is required.
   *
   * @param advertiserId Required. The ID of the advertiser that the fetched manual triggers belong to.
   */
  async advertisersManualTriggersList(advertiserId: bigint, opts: AdvertisersManualTriggersListOptions = {}): Promise<ListManualTriggersResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/manualTriggers`);
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
    return deserializeListManualTriggersResponse(data);
  }

  /**
   * Updates a manual trigger. Returns the updated manual trigger if
   * successful.
   *
   * @param advertiserId Required. Immutable. The unique ID of the advertiser that the manual trigger belongs to.
   * @param triggerId Output only. The unique ID of the manual trigger.
   */
  async advertisersManualTriggersPatch(advertiserId: bigint, triggerId: bigint, req: ManualTrigger, opts: AdvertisersManualTriggersPatchOptions = {}): Promise<ManualTrigger> {
    advertiserId = String(advertiserId);
    triggerId = String(triggerId);
    req = serializeManualTrigger(req);
    opts = serializeAdvertisersManualTriggersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/manualTriggers/${ triggerId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeManualTrigger(data);
  }

  /**
   * Creates a new negative keyword list. Returns the newly created negative
   * keyword list if successful.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the negative keyword list will belong.
   */
  async advertisersNegativeKeywordListsCreate(advertiserId: bigint, req: NegativeKeywordList): Promise<NegativeKeywordList> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as NegativeKeywordList;
  }

  /**
   * Deletes a negative keyword list given an advertiser ID and a negative
   * keyword list ID.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the negative keyword list belongs.
   * @param negativeKeywordListId Required. The ID of the negative keyword list to delete.
   */
  async advertisersNegativeKeywordListsDelete(advertiserId: bigint, negativeKeywordListId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a negative keyword list given an advertiser ID and a negative keyword
   * list ID.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the fetched negative keyword list belongs.
   * @param negativeKeywordListId Required. The ID of the negative keyword list to fetch.
   */
  async advertisersNegativeKeywordListsGet(advertiserId: bigint, negativeKeywordListId: bigint): Promise<NegativeKeywordList> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NegativeKeywordList;
  }

  /**
   * Lists negative keyword lists based on a given advertiser id.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the fetched negative keyword lists belong.
   */
  async advertisersNegativeKeywordListsList(advertiserId: bigint, opts: AdvertisersNegativeKeywordListsListOptions = {}): Promise<ListNegativeKeywordListsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists`);
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
    return data as ListNegativeKeywordListsResponse;
  }

  /**
   * Bulk edits negative keywords in a single negative keyword list. The
   * operation will delete the negative keywords provided in
   * BulkEditNegativeKeywordsRequest.deleted_negative_keywords and then create
   * the negative keywords provided in
   * BulkEditNegativeKeywordsRequest.created_negative_keywords. This operation
   * is guaranteed to be atomic and will never result in a partial success or
   * partial failure.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs.
   * @param negativeKeywordListId Required. The ID of the parent negative keyword list to which the negative keywords belong.
   */
  async advertisersNegativeKeywordListsNegativeKeywordsBulkEdit(advertiserId: bigint, negativeKeywordListId: bigint, req: BulkEditNegativeKeywordsRequest): Promise<BulkEditNegativeKeywordsResponse> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }/negativeKeywords:bulkEdit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BulkEditNegativeKeywordsResponse;
  }

  /**
   * Creates a negative keyword in a negative keyword list.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs.
   * @param negativeKeywordListId Required. The ID of the parent negative keyword list in which the negative keyword will be created.
   */
  async advertisersNegativeKeywordListsNegativeKeywordsCreate(advertiserId: bigint, negativeKeywordListId: bigint, req: NegativeKeyword): Promise<NegativeKeyword> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }/negativeKeywords`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as NegativeKeyword;
  }

  /**
   * Deletes a negative keyword from a negative keyword list.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs.
   * @param keywordValue Required. The keyword value of the negative keyword to delete.
   * @param negativeKeywordListId Required. The ID of the parent negative keyword list to which the negative keyword belongs.
   */
  async advertisersNegativeKeywordListsNegativeKeywordsDelete(advertiserId: bigint, keywordValue: string, negativeKeywordListId: bigint): Promise<Empty> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }/negativeKeywords/${ keywordValue }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists negative keywords in a negative keyword list.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs.
   * @param negativeKeywordListId Required. The ID of the parent negative keyword list to which the requested negative keywords belong.
   */
  async advertisersNegativeKeywordListsNegativeKeywordsList(advertiserId: bigint, negativeKeywordListId: bigint, opts: AdvertisersNegativeKeywordListsNegativeKeywordsListOptions = {}): Promise<ListNegativeKeywordsResponse> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }/negativeKeywords`);
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
    return data as ListNegativeKeywordsResponse;
  }

  /**
   * Replaces all negative keywords in a single negative keyword list. The
   * operation will replace the keywords in a negative keyword list with
   * keywords provided in ReplaceNegativeKeywordsRequest.new_negative_keywords.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs.
   * @param negativeKeywordListId Required. The ID of the parent negative keyword list to which the negative keywords belong.
   */
  async advertisersNegativeKeywordListsNegativeKeywordsReplace(advertiserId: bigint, negativeKeywordListId: bigint, req: ReplaceNegativeKeywordsRequest): Promise<ReplaceNegativeKeywordsResponse> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }/negativeKeywords:replace`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReplaceNegativeKeywordsResponse;
  }

  /**
   * Updates a negative keyword list. Returns the updated negative keyword list
   * if successful.
   *
   * @param advertiserId Required. The ID of the DV360 advertiser to which the negative keyword list belongs.
   * @param negativeKeywordListId Output only. The unique ID of the negative keyword list. Assigned by the system.
   */
  async advertisersNegativeKeywordListsPatch(advertiserId: bigint, negativeKeywordListId: bigint, req: NegativeKeywordList, opts: AdvertisersNegativeKeywordListsPatchOptions = {}): Promise<NegativeKeywordList> {
    advertiserId = String(advertiserId);
    negativeKeywordListId = String(negativeKeywordListId);
    opts = serializeAdvertisersNegativeKeywordListsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/negativeKeywordLists/${ negativeKeywordListId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as NegativeKeywordList;
  }

  /**
   * Updates an existing advertiser. Returns the updated advertiser if
   * successful.
   *
   * @param advertiserId Output only. The unique ID of the advertiser. Assigned by the system.
   */
  async advertisersPatch(advertiserId: bigint, req: Advertiser, opts: AdvertisersPatchOptions = {}): Promise<Advertiser> {
    advertiserId = String(advertiserId);
    req = serializeAdvertiser(req);
    opts = serializeAdvertisersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAdvertiser(data);
  }

  /**
   * Assigns a targeting option to an advertiser. Returns the assigned
   * targeting option if successful.
   *
   * @param advertiserId Required. The ID of the advertiser.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`
   */
  async advertisersTargetingTypesAssignedTargetingOptionsCreate(advertiserId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", req: AssignedTargetingOption): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    req = serializeAssignedTargetingOption(req);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Deletes an assigned targeting option from an advertiser.
   *
   * @param advertiserId Required. The ID of the advertiser.
   * @param assignedTargetingOptionId Required. The ID of the assigned targeting option to delete.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`
   */
  async advertisersTargetingTypesAssignedTargetingOptionsDelete(advertiserId: bigint, assignedTargetingOptionId: string, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<Empty> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single targeting option assigned to an advertiser.
   *
   * @param advertiserId Required. The ID of the advertiser.
   * @param assignedTargetingOptionId Required. An identifier unique to the targeting type in this advertiser that identifies the assigned targeting option being requested.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_YOUTUBE_VIDEO` * `TARGETING_TYPE_YOUTUBE_CHANNEL`
   */
  async advertisersTargetingTypesAssignedTargetingOptionsGet(advertiserId: bigint, assignedTargetingOptionId: string, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Lists the targeting options assigned to an advertiser.
   *
   * @param advertiserId Required. The ID of the advertiser.
   * @param targetingType Required. Identifies the type of assigned targeting options to list. Supported targeting types: * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_YOUTUBE_VIDEO` * `TARGETING_TYPE_YOUTUBE_CHANNEL`
   */
  async advertisersTargetingTypesAssignedTargetingOptionsList(advertiserId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", opts: AdvertisersTargetingTypesAssignedTargetingOptionsListOptions = {}): Promise<ListAdvertiserAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
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
    return deserializeListAdvertiserAssignedTargetingOptionsResponse(data);
  }

  /**
   * Gets a YouTube ad group ad.
   *
   * @param advertiserId Required. The ID of the advertiser this ad group ad belongs to.
   * @param youtubeAdGroupAdId Required. The ID of the ad group ad to fetch.
   */
  async advertisersYoutubeAdGroupAdsGet(advertiserId: bigint, youtubeAdGroupAdId: bigint): Promise<YoutubeAdGroupAd> {
    advertiserId = String(advertiserId);
    youtubeAdGroupAdId = String(youtubeAdGroupAdId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/youtubeAdGroupAds/${ youtubeAdGroupAdId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeYoutubeAdGroupAd(data);
  }

  /**
   * Lists YouTube ad group ads.
   *
   * @param advertiserId Required. The ID of the advertiser the ad groups belongs to.
   */
  async advertisersYoutubeAdGroupAdsList(advertiserId: bigint, opts: AdvertisersYoutubeAdGroupAdsListOptions = {}): Promise<ListYoutubeAdGroupAdsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/youtubeAdGroupAds`);
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
    return deserializeListYoutubeAdGroupAdsResponse(data);
  }

  /**
   * Lists assigned targeting options for multiple YouTube ad groups across
   * targeting types. Inherieted assigned targeting options are not included.
   *
   * @param advertiserId Required. The ID of the advertiser the line items belongs to.
   */
  async advertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptions(advertiserId: bigint, opts: AdvertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptionsOptions = {}): Promise<BulkListAdGroupAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    opts = serializeAdvertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptionsOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/youtubeAdGroups:bulkListAdGroupAssignedTargetingOptions`);
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
    if (opts.youtubeAdGroupIds !== undefined) {
      url.searchParams.append("youtubeAdGroupIds", String(opts.youtubeAdGroupIds));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBulkListAdGroupAssignedTargetingOptionsResponse(data);
  }

  /**
   * Gets a YouTube ad group.
   *
   * @param advertiserId Required. The ID of the advertiser this ad group belongs to.
   * @param youtubeAdGroupId Required. The ID of the ad group to fetch.
   */
  async advertisersYoutubeAdGroupsGet(advertiserId: bigint, youtubeAdGroupId: bigint): Promise<YoutubeAdGroup> {
    advertiserId = String(advertiserId);
    youtubeAdGroupId = String(youtubeAdGroupId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/youtubeAdGroups/${ youtubeAdGroupId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeYoutubeAdGroup(data);
  }

  /**
   * Lists YouTube ad groups.
   *
   * @param advertiserId Required. The ID of the advertiser the ad groups belongs to.
   */
  async advertisersYoutubeAdGroupsList(advertiserId: bigint, opts: AdvertisersYoutubeAdGroupsListOptions = {}): Promise<ListYoutubeAdGroupsResponse> {
    advertiserId = String(advertiserId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/youtubeAdGroups`);
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
    return deserializeListYoutubeAdGroupsResponse(data);
  }

  /**
   * Gets a single targeting option assigned to a YouTube ad group. Inherited
   * assigned targeting options are not included.
   *
   * @param advertiserId Required. The ID of the advertiser the ad group belongs to.
   * @param assignedTargetingOptionId Required. An identifier unique to the targeting type in this line item that identifies the assigned targeting option being requested.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SESSION_POSITION` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO`
   * @param youtubeAdGroupId Required. The ID of the ad group the assigned targeting option belongs to.
   */
  async advertisersYoutubeAdGroupsTargetingTypesAssignedTargetingOptionsGet(advertiserId: bigint, assignedTargetingOptionId: string, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", youtubeAdGroupId: bigint): Promise<AssignedTargetingOption> {
    advertiserId = String(advertiserId);
    youtubeAdGroupId = String(youtubeAdGroupId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/youtubeAdGroups/${ youtubeAdGroupId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Lists the targeting options assigned to a YouTube ad group. Inherited
   * assigned targeting options are not included.
   *
   * @param advertiserId Required. The ID of the advertiser the ad group belongs to.
   * @param targetingType Required. Identifies the type of assigned targeting options to list. Supported targeting types include: * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_KEYWORD` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_SESSION_POSITION` * `TARGETING_TYPE_URL` * `TARGETING_TYPE_YOUTUBE_CHANNEL` * `TARGETING_TYPE_YOUTUBE_VIDEO`
   * @param youtubeAdGroupId Required. The ID of the ad group to list assigned targeting options for.
   */
  async advertisersYoutubeAdGroupsTargetingTypesAssignedTargetingOptionsList(advertiserId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", youtubeAdGroupId: bigint, opts: AdvertisersYoutubeAdGroupsTargetingTypesAssignedTargetingOptionsListOptions = {}): Promise<ListYoutubeAdGroupAssignedTargetingOptionsResponse> {
    advertiserId = String(advertiserId);
    youtubeAdGroupId = String(youtubeAdGroupId);
    const url = new URL(`${this.#baseUrl}v2/advertisers/${ advertiserId }/youtubeAdGroups/${ youtubeAdGroupId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
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
    return deserializeListYoutubeAdGroupAssignedTargetingOptionsResponse(data);
  }

  /**
   * Gets a combined audience.
   *
   * @param combinedAudienceId Required. The ID of the combined audience to fetch.
   */
  async combinedAudiencesGet(combinedAudienceId: bigint, opts: CombinedAudiencesGetOptions = {}): Promise<CombinedAudience> {
    combinedAudienceId = String(combinedAudienceId);
    opts = serializeCombinedAudiencesGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/combinedAudiences/${ combinedAudienceId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CombinedAudience;
  }

  /**
   * Lists combined audiences. The order is defined by the order_by parameter.
   *
   */
  async combinedAudiencesList(opts: CombinedAudiencesListOptions = {}): Promise<ListCombinedAudiencesResponse> {
    opts = serializeCombinedAudiencesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/combinedAudiences`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListCombinedAudiencesResponse;
  }

  /**
   * Creates a new custom bidding algorithm. Returns the newly created custom
   * bidding algorithm if successful.
   *
   */
  async customBiddingAlgorithmsCreate(req: CustomBiddingAlgorithm): Promise<CustomBiddingAlgorithm> {
    req = serializeCustomBiddingAlgorithm(req);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCustomBiddingAlgorithm(data);
  }

  /**
   * Gets a custom bidding algorithm.
   *
   * @param customBiddingAlgorithmId Required. The ID of the custom bidding algorithm to fetch.
   */
  async customBiddingAlgorithmsGet(customBiddingAlgorithmId: bigint, opts: CustomBiddingAlgorithmsGetOptions = {}): Promise<CustomBiddingAlgorithm> {
    customBiddingAlgorithmId = String(customBiddingAlgorithmId);
    opts = serializeCustomBiddingAlgorithmsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms/${ customBiddingAlgorithmId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCustomBiddingAlgorithm(data);
  }

  /**
   * Lists custom bidding algorithms that are accessible to the current user
   * and can be used in bidding stratgies. The order is defined by the order_by
   * parameter.
   *
   */
  async customBiddingAlgorithmsList(opts: CustomBiddingAlgorithmsListOptions = {}): Promise<ListCustomBiddingAlgorithmsResponse> {
    opts = serializeCustomBiddingAlgorithmsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListCustomBiddingAlgorithmsResponse(data);
  }

  /**
   * Updates an existing custom bidding algorithm. Returns the updated custom
   * bidding algorithm if successful.
   *
   * @param customBiddingAlgorithmId Output only. The unique ID of the custom bidding algorithm. Assigned by the system.
   */
  async customBiddingAlgorithmsPatch(customBiddingAlgorithmId: bigint, req: CustomBiddingAlgorithm, opts: CustomBiddingAlgorithmsPatchOptions = {}): Promise<CustomBiddingAlgorithm> {
    customBiddingAlgorithmId = String(customBiddingAlgorithmId);
    req = serializeCustomBiddingAlgorithm(req);
    opts = serializeCustomBiddingAlgorithmsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms/${ customBiddingAlgorithmId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCustomBiddingAlgorithm(data);
  }

  /**
   * Creates a new custom bidding script. Returns the newly created script if
   * successful.
   *
   * @param customBiddingAlgorithmId Required. The ID of the custom bidding algorithm that owns the script.
   */
  async customBiddingAlgorithmsScriptsCreate(customBiddingAlgorithmId: bigint, req: CustomBiddingScript, opts: CustomBiddingAlgorithmsScriptsCreateOptions = {}): Promise<CustomBiddingScript> {
    customBiddingAlgorithmId = String(customBiddingAlgorithmId);
    opts = serializeCustomBiddingAlgorithmsScriptsCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms/${ customBiddingAlgorithmId }/scripts`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomBiddingScript;
  }

  /**
   * Gets a custom bidding script.
   *
   * @param customBiddingAlgorithmId Required. The ID of the custom bidding algorithm owns the script.
   * @param customBiddingScriptId Required. The ID of the custom bidding script to fetch.
   */
  async customBiddingAlgorithmsScriptsGet(customBiddingAlgorithmId: bigint, customBiddingScriptId: bigint, opts: CustomBiddingAlgorithmsScriptsGetOptions = {}): Promise<CustomBiddingScript> {
    customBiddingAlgorithmId = String(customBiddingAlgorithmId);
    customBiddingScriptId = String(customBiddingScriptId);
    opts = serializeCustomBiddingAlgorithmsScriptsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms/${ customBiddingAlgorithmId }/scripts/${ customBiddingScriptId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomBiddingScript;
  }

  /**
   * Lists custom bidding scripts that belong to the given algorithm. The order
   * is defined by the order_by parameter.
   *
   * @param customBiddingAlgorithmId Required. The ID of the custom bidding algorithm owns the script.
   */
  async customBiddingAlgorithmsScriptsList(customBiddingAlgorithmId: bigint, opts: CustomBiddingAlgorithmsScriptsListOptions = {}): Promise<ListCustomBiddingScriptsResponse> {
    customBiddingAlgorithmId = String(customBiddingAlgorithmId);
    opts = serializeCustomBiddingAlgorithmsScriptsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms/${ customBiddingAlgorithmId }/scripts`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListCustomBiddingScriptsResponse;
  }

  /**
   * Creates a custom bidding script reference object for a script file. The
   * resulting reference object provides a resource path to which the script
   * file should be uploaded. This reference object should be included in when
   * creating a new custom bidding script object.
   *
   * @param customBiddingAlgorithmId Required. The ID of the custom bidding algorithm owns the script.
   */
  async customBiddingAlgorithmsUploadScript(customBiddingAlgorithmId: bigint, opts: CustomBiddingAlgorithmsUploadScriptOptions = {}): Promise<CustomBiddingScriptRef> {
    customBiddingAlgorithmId = String(customBiddingAlgorithmId);
    opts = serializeCustomBiddingAlgorithmsUploadScriptOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customBiddingAlgorithms/${ customBiddingAlgorithmId }:uploadScript`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomBiddingScriptRef;
  }

  /**
   * Gets a custom list.
   *
   * @param customListId Required. The ID of the custom list to fetch.
   */
  async customListsGet(customListId: bigint, opts: CustomListsGetOptions = {}): Promise<CustomList> {
    customListId = String(customListId);
    opts = serializeCustomListsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customLists/${ customListId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomList;
  }

  /**
   * Lists custom lists. The order is defined by the order_by parameter.
   *
   */
  async customListsList(opts: CustomListsListOptions = {}): Promise<ListCustomListsResponse> {
    opts = serializeCustomListsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/customLists`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    return data as ListCustomListsResponse;
  }

  /**
   * Creates a FirstAndThirdPartyAudience. Only supported for the following
   * audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`
   *
   */
  async firstAndThirdPartyAudiencesCreate(req: FirstAndThirdPartyAudience, opts: FirstAndThirdPartyAudiencesCreateOptions = {}): Promise<FirstAndThirdPartyAudience> {
    req = serializeFirstAndThirdPartyAudience(req);
    opts = serializeFirstAndThirdPartyAudiencesCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/firstAndThirdPartyAudiences`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFirstAndThirdPartyAudience(data);
  }

  /**
   * Updates the member list of a Customer Match audience. Only supported for
   * the following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` *
   * `CUSTOMER_MATCH_DEVICE_ID`
   *
   * @param firstAndThirdPartyAudienceId Required. The ID of the Customer Match FirstAndThirdPartyAudience whose members will be edited.
   */
  async firstAndThirdPartyAudiencesEditCustomerMatchMembers(firstAndThirdPartyAudienceId: bigint, req: EditCustomerMatchMembersRequest): Promise<EditCustomerMatchMembersResponse> {
    firstAndThirdPartyAudienceId = String(firstAndThirdPartyAudienceId);
    req = serializeEditCustomerMatchMembersRequest(req);
    const url = new URL(`${this.#baseUrl}v2/firstAndThirdPartyAudiences/${ firstAndThirdPartyAudienceId }:editCustomerMatchMembers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEditCustomerMatchMembersResponse(data);
  }

  /**
   * Gets a first and third party audience.
   *
   * @param firstAndThirdPartyAudienceId Required. The ID of the first and third party audience to fetch.
   */
  async firstAndThirdPartyAudiencesGet(firstAndThirdPartyAudienceId: bigint, opts: FirstAndThirdPartyAudiencesGetOptions = {}): Promise<FirstAndThirdPartyAudience> {
    firstAndThirdPartyAudienceId = String(firstAndThirdPartyAudienceId);
    opts = serializeFirstAndThirdPartyAudiencesGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/firstAndThirdPartyAudiences/${ firstAndThirdPartyAudienceId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFirstAndThirdPartyAudience(data);
  }

  /**
   * Lists first and third party audiences. The order is defined by the
   * order_by parameter.
   *
   */
  async firstAndThirdPartyAudiencesList(opts: FirstAndThirdPartyAudiencesListOptions = {}): Promise<ListFirstAndThirdPartyAudiencesResponse> {
    opts = serializeFirstAndThirdPartyAudiencesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/firstAndThirdPartyAudiences`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListFirstAndThirdPartyAudiencesResponse(data);
  }

  /**
   * Updates an existing FirstAndThirdPartyAudience. Only supported for the
   * following audience_type: * `CUSTOMER_MATCH_CONTACT_INFO` *
   * `CUSTOMER_MATCH_DEVICE_ID`
   *
   * @param firstAndThirdPartyAudienceId Output only. The unique ID of the first and third party audience. Assigned by the system.
   */
  async firstAndThirdPartyAudiencesPatch(firstAndThirdPartyAudienceId: bigint, req: FirstAndThirdPartyAudience, opts: FirstAndThirdPartyAudiencesPatchOptions = {}): Promise<FirstAndThirdPartyAudience> {
    firstAndThirdPartyAudienceId = String(firstAndThirdPartyAudienceId);
    req = serializeFirstAndThirdPartyAudience(req);
    opts = serializeFirstAndThirdPartyAudiencesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/firstAndThirdPartyAudiences/${ firstAndThirdPartyAudienceId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeFirstAndThirdPartyAudience(data);
  }

  /**
   * Gets a Floodlight group.
   *
   * @param floodlightGroupId Required. The ID of the Floodlight group to fetch.
   */
  async floodlightGroupsGet(floodlightGroupId: bigint, opts: FloodlightGroupsGetOptions = {}): Promise<FloodlightGroup> {
    floodlightGroupId = String(floodlightGroupId);
    opts = serializeFloodlightGroupsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/floodlightGroups/${ floodlightGroupId }`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FloodlightGroup;
  }

  /**
   * Updates an existing Floodlight group. Returns the updated Floodlight group
   * if successful.
   *
   * @param floodlightGroupId Output only. The unique ID of the Floodlight group. Assigned by the system.
   */
  async floodlightGroupsPatch(floodlightGroupId: bigint, req: FloodlightGroup, opts: FloodlightGroupsPatchOptions = {}): Promise<FloodlightGroup> {
    floodlightGroupId = String(floodlightGroupId);
    opts = serializeFloodlightGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/floodlightGroups/${ floodlightGroupId }`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as FloodlightGroup;
  }

  /**
   * Gets a Google audience.
   *
   * @param googleAudienceId Required. The ID of the Google audience to fetch.
   */
  async googleAudiencesGet(googleAudienceId: bigint, opts: GoogleAudiencesGetOptions = {}): Promise<GoogleAudience> {
    googleAudienceId = String(googleAudienceId);
    opts = serializeGoogleAudiencesGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/googleAudiences/${ googleAudienceId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAudience;
  }

  /**
   * Lists Google audiences. The order is defined by the order_by parameter.
   *
   */
  async googleAudiencesList(opts: GoogleAudiencesListOptions = {}): Promise<ListGoogleAudiencesResponse> {
    opts = serializeGoogleAudiencesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/googleAudiences`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListGoogleAudiencesResponse;
  }

  /**
   * Creates a new guaranteed order. Returns the newly created guaranteed order
   * if successful.
   *
   */
  async guaranteedOrdersCreate(req: GuaranteedOrder, opts: GuaranteedOrdersCreateOptions = {}): Promise<GuaranteedOrder> {
    req = serializeGuaranteedOrder(req);
    opts = serializeGuaranteedOrdersCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/guaranteedOrders`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGuaranteedOrder(data);
  }

  /**
   * Edits read advertisers of a guaranteed order.
   *
   * @param guaranteedOrderId Required. The ID of the guaranteed order to edit. The ID is of the format `{exchange}-{legacy_guaranteed_order_id}`
   */
  async guaranteedOrdersEditGuaranteedOrderReadAccessors(guaranteedOrderId: string, req: EditGuaranteedOrderReadAccessorsRequest): Promise<EditGuaranteedOrderReadAccessorsResponse> {
    req = serializeEditGuaranteedOrderReadAccessorsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/guaranteedOrders/${ guaranteedOrderId }:editGuaranteedOrderReadAccessors`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEditGuaranteedOrderReadAccessorsResponse(data);
  }

  /**
   * Gets a guaranteed order.
   *
   * @param guaranteedOrderId Required. The ID of the guaranteed order to fetch. The ID is of the format `{exchange}-{legacy_guaranteed_order_id}`
   */
  async guaranteedOrdersGet(guaranteedOrderId: string, opts: GuaranteedOrdersGetOptions = {}): Promise<GuaranteedOrder> {
    opts = serializeGuaranteedOrdersGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/guaranteedOrders/${ guaranteedOrderId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGuaranteedOrder(data);
  }

  /**
   * Lists guaranteed orders that are accessible to the current user. The order
   * is defined by the order_by parameter. If a filter by entity_status is not
   * specified, guaranteed orders with entity status `ENTITY_STATUS_ARCHIVED`
   * will not be included in the results.
   *
   */
  async guaranteedOrdersList(opts: GuaranteedOrdersListOptions = {}): Promise<ListGuaranteedOrdersResponse> {
    opts = serializeGuaranteedOrdersListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/guaranteedOrders`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListGuaranteedOrdersResponse(data);
  }

  /**
   * Updates an existing guaranteed order. Returns the updated guaranteed order
   * if successful.
   *
   * @param guaranteedOrderId Output only. The unique identifier of the guaranteed order. The guaranteed order IDs have the format `{exchange}-{legacy_guaranteed_order_id}`.
   */
  async guaranteedOrdersPatch(guaranteedOrderId: string, req: GuaranteedOrder, opts: GuaranteedOrdersPatchOptions = {}): Promise<GuaranteedOrder> {
    req = serializeGuaranteedOrder(req);
    opts = serializeGuaranteedOrdersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/guaranteedOrders/${ guaranteedOrderId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGuaranteedOrder(data);
  }

  /**
   * Bulk edits multiple assignments between inventory sources and a single
   * inventory source group. The operation will delete the assigned inventory
   * sources provided in
   * BulkEditAssignedInventorySourcesRequest.deleted_assigned_inventory_sources
   * and then create the assigned inventory sources provided in
   * BulkEditAssignedInventorySourcesRequest.created_assigned_inventory_sources.
   *
   * @param inventorySourceGroupId Required. The ID of the inventory source group to which the assignments are assigned.
   */
  async inventorySourceGroupsAssignedInventorySourcesBulkEdit(inventorySourceGroupId: bigint, req: BulkEditAssignedInventorySourcesRequest): Promise<BulkEditAssignedInventorySourcesResponse> {
    inventorySourceGroupId = String(inventorySourceGroupId);
    req = serializeBulkEditAssignedInventorySourcesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups/${ inventorySourceGroupId }/assignedInventorySources:bulkEdit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BulkEditAssignedInventorySourcesResponse;
  }

  /**
   * Creates an assignment between an inventory source and an inventory source
   * group.
   *
   * @param inventorySourceGroupId Required. The ID of the inventory source group to which the assignment will be assigned.
   */
  async inventorySourceGroupsAssignedInventorySourcesCreate(inventorySourceGroupId: bigint, req: AssignedInventorySource, opts: InventorySourceGroupsAssignedInventorySourcesCreateOptions = {}): Promise<AssignedInventorySource> {
    inventorySourceGroupId = String(inventorySourceGroupId);
    opts = serializeInventorySourceGroupsAssignedInventorySourcesCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups/${ inventorySourceGroupId }/assignedInventorySources`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AssignedInventorySource;
  }

  /**
   * Deletes the assignment between an inventory source and an inventory source
   * group.
   *
   * @param assignedInventorySourceId Required. The ID of the assigned inventory source to delete.
   * @param inventorySourceGroupId Required. The ID of the inventory source group to which this assignment is assigned.
   */
  async inventorySourceGroupsAssignedInventorySourcesDelete(assignedInventorySourceId: bigint, inventorySourceGroupId: bigint, opts: InventorySourceGroupsAssignedInventorySourcesDeleteOptions = {}): Promise<Empty> {
    assignedInventorySourceId = String(assignedInventorySourceId);
    inventorySourceGroupId = String(inventorySourceGroupId);
    opts = serializeInventorySourceGroupsAssignedInventorySourcesDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups/${ inventorySourceGroupId }/assignedInventorySources/${ assignedInventorySourceId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists inventory sources assigned to an inventory source group.
   *
   * @param inventorySourceGroupId Required. The ID of the inventory source group to which these assignments are assigned.
   */
  async inventorySourceGroupsAssignedInventorySourcesList(inventorySourceGroupId: bigint, opts: InventorySourceGroupsAssignedInventorySourcesListOptions = {}): Promise<ListAssignedInventorySourcesResponse> {
    inventorySourceGroupId = String(inventorySourceGroupId);
    opts = serializeInventorySourceGroupsAssignedInventorySourcesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups/${ inventorySourceGroupId }/assignedInventorySources`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAssignedInventorySourcesResponse;
  }

  /**
   * Creates a new inventory source group. Returns the newly created inventory
   * source group if successful.
   *
   */
  async inventorySourceGroupsCreate(req: InventorySourceGroup, opts: InventorySourceGroupsCreateOptions = {}): Promise<InventorySourceGroup> {
    opts = serializeInventorySourceGroupsCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as InventorySourceGroup;
  }

  /**
   * Deletes an inventory source group.
   *
   * @param inventorySourceGroupId Required. The ID of the inventory source group to delete.
   */
  async inventorySourceGroupsDelete(inventorySourceGroupId: bigint, opts: InventorySourceGroupsDeleteOptions = {}): Promise<Empty> {
    inventorySourceGroupId = String(inventorySourceGroupId);
    opts = serializeInventorySourceGroupsDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups/${ inventorySourceGroupId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an inventory source group.
   *
   * @param inventorySourceGroupId Required. The ID of the inventory source group to fetch.
   */
  async inventorySourceGroupsGet(inventorySourceGroupId: bigint, opts: InventorySourceGroupsGetOptions = {}): Promise<InventorySourceGroup> {
    inventorySourceGroupId = String(inventorySourceGroupId);
    opts = serializeInventorySourceGroupsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups/${ inventorySourceGroupId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InventorySourceGroup;
  }

  /**
   * Lists inventory source groups that are accessible to the current user. The
   * order is defined by the order_by parameter.
   *
   */
  async inventorySourceGroupsList(opts: InventorySourceGroupsListOptions = {}): Promise<ListInventorySourceGroupsResponse> {
    opts = serializeInventorySourceGroupsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListInventorySourceGroupsResponse;
  }

  /**
   * Updates an inventory source group. Returns the updated inventory source
   * group if successful.
   *
   * @param inventorySourceGroupId Output only. The unique ID of the inventory source group. Assigned by the system.
   */
  async inventorySourceGroupsPatch(inventorySourceGroupId: bigint, req: InventorySourceGroup, opts: InventorySourceGroupsPatchOptions = {}): Promise<InventorySourceGroup> {
    inventorySourceGroupId = String(inventorySourceGroupId);
    opts = serializeInventorySourceGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySourceGroups/${ inventorySourceGroupId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as InventorySourceGroup;
  }

  /**
   * Creates a new inventory source. Returns the newly created inventory source
   * if successful.
   *
   */
  async inventorySourcesCreate(req: InventorySource, opts: InventorySourcesCreateOptions = {}): Promise<InventorySource> {
    req = serializeInventorySource(req);
    opts = serializeInventorySourcesCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySources`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeInventorySource(data);
  }

  /**
   * Edits read/write accessors of an inventory source. Returns the updated
   * read_write_accessors for the inventory source.
   *
   * @param inventorySourceId Required. The ID of inventory source to update.
   */
  async inventorySourcesEditInventorySourceReadWriteAccessors(inventorySourceId: bigint, req: EditInventorySourceReadWriteAccessorsRequest): Promise<InventorySourceAccessors> {
    inventorySourceId = String(inventorySourceId);
    req = serializeEditInventorySourceReadWriteAccessorsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/inventorySources/${ inventorySourceId }:editInventorySourceReadWriteAccessors`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeInventorySourceAccessors(data);
  }

  /**
   * Gets an inventory source.
   *
   * @param inventorySourceId Required. The ID of the inventory source to fetch.
   */
  async inventorySourcesGet(inventorySourceId: bigint, opts: InventorySourcesGetOptions = {}): Promise<InventorySource> {
    inventorySourceId = String(inventorySourceId);
    opts = serializeInventorySourcesGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySources/${ inventorySourceId }`);
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInventorySource(data);
  }

  /**
   * Lists inventory sources that are accessible to the current user. The order
   * is defined by the order_by parameter. If a filter by entity_status is not
   * specified, inventory sources with entity status `ENTITY_STATUS_ARCHIVED`
   * will not be included in the results.
   *
   */
  async inventorySourcesList(opts: InventorySourcesListOptions = {}): Promise<ListInventorySourcesResponse> {
    opts = serializeInventorySourcesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySources`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListInventorySourcesResponse(data);
  }

  /**
   * Updates an existing inventory source. Returns the updated inventory source
   * if successful.
   *
   * @param inventorySourceId Output only. The unique ID of the inventory source. Assigned by the system.
   */
  async inventorySourcesPatch(inventorySourceId: bigint, req: InventorySource, opts: InventorySourcesPatchOptions = {}): Promise<InventorySource> {
    inventorySourceId = String(inventorySourceId);
    req = serializeInventorySource(req);
    opts = serializeInventorySourcesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/inventorySources/${ inventorySourceId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.partnerId !== undefined) {
      url.searchParams.append("partnerId", String(opts.partnerId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeInventorySource(data);
  }

  /**
   * Downloads media. Download is supported on the URI
   * `/download/{resource_name=**}?alt=media.` **Note**: Download requests will
   * not be successful without including `alt=media` query string.
   *
   * @param resourceName Name of the media that is being downloaded. See ReadRequest.resource_name.
   */
  async mediaDownload(resourceName: string): Promise<GoogleBytestreamMedia> {
    const url = new URL(`${this.#baseUrl}download/${ resourceName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleBytestreamMedia;
  }

  /**
   * Uploads media. Upload is supported on the URI
   * `/upload/media/{resource_name=**}?upload_type=media.` **Note**: Upload
   * requests will not be successful without including `upload_type=media` query
   * string.
   *
   * @param resourceName Name of the media that is being downloaded. See ReadRequest.resource_name.
   */
  async mediaUpload(resourceName: string, req: GoogleBytestreamMedia): Promise<GoogleBytestreamMedia> {
    const url = new URL(`${this.#baseUrl}media/${ resourceName }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleBytestreamMedia;
  }

  /**
   * Creates a new channel. Returns the newly created channel if successful.
   *
   * @param partnerId The ID of the partner that owns the created channel.
   */
  async partnersChannelsCreate(partnerId: bigint, req: Channel, opts: PartnersChannelsCreateOptions = {}): Promise<Channel> {
    partnerId = String(partnerId);
    req = serializeChannel(req);
    opts = serializePartnersChannelsCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Gets a channel for a partner or advertiser.
   *
   * @param channelId Required. The ID of the channel to fetch.
   * @param partnerId The ID of the partner that owns the fetched channel.
   */
  async partnersChannelsGet(channelId: bigint, partnerId: bigint, opts: PartnersChannelsGetOptions = {}): Promise<Channel> {
    channelId = String(channelId);
    partnerId = String(partnerId);
    opts = serializePartnersChannelsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels/${ channelId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeChannel(data);
  }

  /**
   * Lists channels for a partner or advertiser.
   *
   * @param partnerId The ID of the partner that owns the channels.
   */
  async partnersChannelsList(partnerId: bigint, opts: PartnersChannelsListOptions = {}): Promise<ListChannelsResponse> {
    partnerId = String(partnerId);
    opts = serializePartnersChannelsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    return deserializeListChannelsResponse(data);
  }

  /**
   * Updates a channel. Returns the updated channel if successful.
   *
   * @param channelId Output only. The unique ID of the channel. Assigned by the system.
   * @param partnerId The ID of the partner that owns the created channel.
   */
  async partnersChannelsPatch(channelId: bigint, partnerId: bigint, req: Channel, opts: PartnersChannelsPatchOptions = {}): Promise<Channel> {
    channelId = String(channelId);
    partnerId = String(partnerId);
    req = serializeChannel(req);
    opts = serializePartnersChannelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels/${ channelId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Bulk edits sites under a single channel. The operation will delete the
   * sites provided in BulkEditSitesRequest.deleted_sites and then create the
   * sites provided in BulkEditSitesRequest.created_sites.
   *
   * @param channelId Required. The ID of the parent channel to which the sites belong.
   * @param partnerId The ID of the partner that owns the parent channel.
   */
  async partnersChannelsSitesBulkEdit(channelId: bigint, partnerId: bigint, req: BulkEditSitesRequest): Promise<BulkEditSitesResponse> {
    channelId = String(channelId);
    partnerId = String(partnerId);
    req = serializeBulkEditSitesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels/${ channelId }/sites:bulkEdit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BulkEditSitesResponse;
  }

  /**
   * Creates a site in a channel.
   *
   * @param channelId Required. The ID of the parent channel in which the site will be created.
   * @param partnerId The ID of the partner that owns the parent channel.
   */
  async partnersChannelsSitesCreate(channelId: bigint, partnerId: bigint, req: Site, opts: PartnersChannelsSitesCreateOptions = {}): Promise<Site> {
    channelId = String(channelId);
    partnerId = String(partnerId);
    opts = serializePartnersChannelsSitesCreateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels/${ channelId }/sites`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Site;
  }

  /**
   * Deletes a site from a channel.
   *
   * @param channelId Required. The ID of the parent channel to which the site belongs.
   * @param partnerId The ID of the partner that owns the parent channel.
   * @param urlOrAppId Required. The URL or app ID of the site to delete.
   */
  async partnersChannelsSitesDelete(channelId: bigint, partnerId: bigint, urlOrAppId: string, opts: PartnersChannelsSitesDeleteOptions = {}): Promise<Empty> {
    channelId = String(channelId);
    partnerId = String(partnerId);
    opts = serializePartnersChannelsSitesDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels/${ channelId }/sites/${ urlOrAppId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists sites in a channel.
   *
   * @param channelId Required. The ID of the parent channel to which the requested sites belong.
   * @param partnerId The ID of the partner that owns the parent channel.
   */
  async partnersChannelsSitesList(channelId: bigint, partnerId: bigint, opts: PartnersChannelsSitesListOptions = {}): Promise<ListSitesResponse> {
    channelId = String(channelId);
    partnerId = String(partnerId);
    opts = serializePartnersChannelsSitesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels/${ channelId }/sites`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    return data as ListSitesResponse;
  }

  /**
   * Replaces all of the sites under a single channel. The operation will
   * replace the sites under a channel with the sites provided in
   * ReplaceSitesRequest.new_sites.
   *
   * @param channelId Required. The ID of the parent channel whose sites will be replaced.
   * @param partnerId The ID of the partner that owns the parent channel.
   */
  async partnersChannelsSitesReplace(channelId: bigint, partnerId: bigint, req: ReplaceSitesRequest): Promise<ReplaceSitesResponse> {
    channelId = String(channelId);
    partnerId = String(partnerId);
    req = serializeReplaceSitesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/channels/${ channelId }/sites:replace`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReplaceSitesResponse;
  }

  /**
   * Edits targeting options under a single partner. The operation will delete
   * the assigned targeting options provided in
   * BulkEditPartnerAssignedTargetingOptionsRequest.deleteRequests and then
   * create the assigned targeting options provided in
   * BulkEditPartnerAssignedTargetingOptionsRequest.createRequests .
   *
   * @param partnerId Required. The ID of the partner.
   */
  async partnersEditAssignedTargetingOptions(partnerId: bigint, req: BulkEditPartnerAssignedTargetingOptionsRequest): Promise<BulkEditPartnerAssignedTargetingOptionsResponse> {
    partnerId = String(partnerId);
    req = serializeBulkEditPartnerAssignedTargetingOptionsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }:editAssignedTargetingOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBulkEditPartnerAssignedTargetingOptionsResponse(data);
  }

  /**
   * Gets a partner.
   *
   * @param partnerId Required. The ID of the partner to fetch.
   */
  async partnersGet(partnerId: bigint): Promise<Partner> {
    partnerId = String(partnerId);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Partner;
  }

  /**
   * Lists partners that are accessible to the current user. The order is
   * defined by the order_by parameter.
   *
   */
  async partnersList(opts: PartnersListOptions = {}): Promise<ListPartnersResponse> {
    const url = new URL(`${this.#baseUrl}v2/partners`);
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
    return data as ListPartnersResponse;
  }

  /**
   * Assigns a targeting option to a partner. Returns the assigned targeting
   * option if successful.
   *
   * @param partnerId Required. The ID of the partner.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL`
   */
  async partnersTargetingTypesAssignedTargetingOptionsCreate(partnerId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", req: AssignedTargetingOption): Promise<AssignedTargetingOption> {
    partnerId = String(partnerId);
    req = serializeAssignedTargetingOption(req);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Deletes an assigned targeting option from a partner.
   *
   * @param assignedTargetingOptionId Required. The ID of the assigned targeting option to delete.
   * @param partnerId Required. The ID of the partner.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL`
   */
  async partnersTargetingTypesAssignedTargetingOptionsDelete(assignedTargetingOptionId: string, partnerId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<Empty> {
    partnerId = String(partnerId);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single targeting option assigned to a partner.
   *
   * @param assignedTargetingOptionId Required. An identifier unique to the targeting type in this partner that identifies the assigned targeting option being requested.
   * @param partnerId Required. The ID of the partner.
   * @param targetingType Required. Identifies the type of this assigned targeting option. Supported targeting types: * `TARGETING_TYPE_CHANNEL`
   */
  async partnersTargetingTypesAssignedTargetingOptionsGet(assignedTargetingOptionId: string, partnerId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION"): Promise<AssignedTargetingOption> {
    partnerId = String(partnerId);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/targetingTypes/${ targetingType }/assignedTargetingOptions/${ assignedTargetingOptionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAssignedTargetingOption(data);
  }

  /**
   * Lists the targeting options assigned to a partner.
   *
   * @param partnerId Required. The ID of the partner.
   * @param targetingType Required. Identifies the type of assigned targeting options to list. Supported targeting types: * `TARGETING_TYPE_CHANNEL`
   */
  async partnersTargetingTypesAssignedTargetingOptionsList(partnerId: bigint, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", opts: PartnersTargetingTypesAssignedTargetingOptionsListOptions = {}): Promise<ListPartnerAssignedTargetingOptionsResponse> {
    partnerId = String(partnerId);
    const url = new URL(`${this.#baseUrl}v2/partners/${ partnerId }/targetingTypes/${ targetingType }/assignedTargetingOptions`);
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
    return deserializeListPartnerAssignedTargetingOptionsResponse(data);
  }

  /**
   * Creates an SDF Download Task. Returns an Operation. An SDF Download Task
   * is a long-running, asynchronous operation. The metadata type of this
   * operation is SdfDownloadTaskMetadata. If the request is successful, the
   * response type of the operation is SdfDownloadTask. The response will not
   * include the download files, which must be retrieved with media.download.
   * The state of operation can be retrieved with
   * sdfdownloadtask.operations.get. Any errors can be found in the
   * error.message. Note that error.details is expected to be empty.
   *
   */
  async sdfdownloadtasksCreate(req: CreateSdfDownloadTaskRequest): Promise<Operation> {
    req = serializeCreateSdfDownloadTaskRequest(req);
    const url = new URL(`${this.#baseUrl}v2/sdfdownloadtasks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the latest state of an asynchronous SDF download task operation.
   * Clients should poll this method at intervals of 30 seconds.
   *
   * @param name The name of the operation resource.
   */
  async sdfdownloadtasksOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Gets a single targeting option.
   *
   * @param targetingOptionId Required. The ID of the of targeting option to retrieve.
   * @param targetingType Required. The type of targeting option to retrieve. Accepted values are: * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID`
   */
  async targetingTypesTargetingOptionsGet(targetingOptionId: string, targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", opts: TargetingTypesTargetingOptionsGetOptions = {}): Promise<TargetingOption> {
    opts = serializeTargetingTypesTargetingOptionsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/targetingTypes/${ targetingType }/targetingOptions/${ targetingOptionId }`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TargetingOption;
  }

  /**
   * Lists targeting options of a given type.
   *
   * @param targetingType Required. The type of targeting option to be listed. Accepted values are: * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_USER_REWARDED_CONTENT` * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` * `TARGETING_TYPE_DEVICE_TYPE` * `TARGETING_TYPE_BROWSER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_CARRIER_AND_ISP` * `TARGETING_TYPE_OPERATING_SYSTEM` * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_VIEWABILITY` * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` * `TARGETING_TYPE_EXCHANGE` * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID`
   */
  async targetingTypesTargetingOptionsList(targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", opts: TargetingTypesTargetingOptionsListOptions = {}): Promise<ListTargetingOptionsResponse> {
    opts = serializeTargetingTypesTargetingOptionsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/targetingTypes/${ targetingType }/targetingOptions`);
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
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
    return data as ListTargetingOptionsResponse;
  }

  /**
   * Searches for targeting options of a given type based on the given search
   * terms.
   *
   * @param targetingType Required. The type of targeting options to retrieve. Accepted values are: * `TARGETING_TYPE_GEO_REGION` * `TARGETING_TYPE_POI` * `TARGETING_TYPE_BUSINESS_CHAIN`
   */
  async targetingTypesTargetingOptionsSearch(targetingType:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION", req: SearchTargetingOptionsRequest): Promise<SearchTargetingOptionsResponse> {
    req = serializeSearchTargetingOptionsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/targetingTypes/${ targetingType }/targetingOptions:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SearchTargetingOptionsResponse;
  }

  /**
   * Bulk edits user roles for a user. The operation will delete the assigned
   * user roles provided in
   * BulkEditAssignedUserRolesRequest.deletedAssignedUserRoles and then assign
   * the user roles provided in
   * BulkEditAssignedUserRolesRequest.createdAssignedUserRoles.
   *
   * @param userId Required. The ID of the user to which the assigned user roles belong.
   */
  async usersBulkEditAssignedUserRoles(userId: bigint, req: BulkEditAssignedUserRolesRequest): Promise<BulkEditAssignedUserRolesResponse> {
    userId = String(userId);
    req = serializeBulkEditAssignedUserRolesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/users/${ userId }:bulkEditAssignedUserRoles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBulkEditAssignedUserRolesResponse(data);
  }

  /**
   * Creates a new user. Returns the newly created user if successful.
   *
   */
  async usersCreate(req: User): Promise<User> {
    req = serializeUser(req);
    const url = new URL(`${this.#baseUrl}v2/users`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUser(data);
  }

  /**
   * Deletes a user.
   *
   * @param userId Required. The ID of the user to delete.
   */
  async usersDelete(userId: bigint): Promise<Empty> {
    userId = String(userId);
    const url = new URL(`${this.#baseUrl}v2/users/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a user.
   *
   * @param userId Required. The ID of the user to fetch.
   */
  async usersGet(userId: bigint): Promise<User> {
    userId = String(userId);
    const url = new URL(`${this.#baseUrl}v2/users/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUser(data);
  }

  /**
   * Lists users that are accessible to the current user. If two users have
   * user roles on the same partner or advertiser, they can access each other.
   *
   */
  async usersList(opts: UsersListOptions = {}): Promise<ListUsersResponse> {
    const url = new URL(`${this.#baseUrl}v2/users`);
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
    return deserializeListUsersResponse(data);
  }

  /**
   * Updates an existing user. Returns the updated user if successful.
   *
   * @param userId Output only. The unique ID of the user. Assigned by the system.
   */
  async usersPatch(userId: bigint, req: User, opts: UsersPatchOptions = {}): Promise<User> {
    userId = String(userId);
    req = serializeUser(req);
    opts = serializeUsersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/users/${ userId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeUser(data);
  }
}

/**
 * Request message for ManualTriggerService.ActivateManualTrigger.
 */
export interface ActivateManualTriggerRequest {
}

/**
 * Configuration for custom Active View video viewability metrics.
 */
export interface ActiveViewVideoViewabilityMetricConfig {
  /**
   * Required. The display name of the custom metric.
   */
  displayName?: string;
  /**
   * The minimum visible video duration required (in seconds) in order for an
   * impression to be recorded. You must specify minimum_duration,
   * minimum_quartile or both. If both are specified, an impression meets the
   * metric criteria if either requirement is met (whichever happens first).
   */
  minimumDuration?:  | "VIDEO_DURATION_UNSPECIFIED" | "VIDEO_DURATION_SECONDS_NONE" | "VIDEO_DURATION_SECONDS_0" | "VIDEO_DURATION_SECONDS_1" | "VIDEO_DURATION_SECONDS_2" | "VIDEO_DURATION_SECONDS_3" | "VIDEO_DURATION_SECONDS_4" | "VIDEO_DURATION_SECONDS_5" | "VIDEO_DURATION_SECONDS_6" | "VIDEO_DURATION_SECONDS_7" | "VIDEO_DURATION_SECONDS_8" | "VIDEO_DURATION_SECONDS_9" | "VIDEO_DURATION_SECONDS_10" | "VIDEO_DURATION_SECONDS_11" | "VIDEO_DURATION_SECONDS_12" | "VIDEO_DURATION_SECONDS_13" | "VIDEO_DURATION_SECONDS_14" | "VIDEO_DURATION_SECONDS_15" | "VIDEO_DURATION_SECONDS_30" | "VIDEO_DURATION_SECONDS_45" | "VIDEO_DURATION_SECONDS_60";
  /**
   * The minimum visible video duration required, based on the video quartiles,
   * in order for an impression to be recorded. You must specify
   * minimum_duration, minimum_quartile or both. If both are specified, an
   * impression meets the metric criteria if either requirement is met
   * (whichever happens first).
   */
  minimumQuartile?:  | "VIDEO_DURATION_QUARTILE_UNSPECIFIED" | "VIDEO_DURATION_QUARTILE_NONE" | "VIDEO_DURATION_QUARTILE_FIRST" | "VIDEO_DURATION_QUARTILE_SECOND" | "VIDEO_DURATION_QUARTILE_THIRD" | "VIDEO_DURATION_QUARTILE_FOURTH";
  /**
   * Required. The minimum percentage of the video ad's pixels visible on the
   * screen in order for an impression to be recorded.
   */
  minimumViewability?:  | "VIEWABILITY_PERCENT_UNSPECIFIED" | "VIEWABILITY_PERCENT_0" | "VIEWABILITY_PERCENT_25" | "VIEWABILITY_PERCENT_50" | "VIEWABILITY_PERCENT_75" | "VIEWABILITY_PERCENT_100";
  /**
   * Required. The minimum percentage of the video ad's volume required in
   * order for an impression to be recorded.
   */
  minimumVolume?:  | "VIDEO_VOLUME_PERCENT_UNSPECIFIED" | "VIDEO_VOLUME_PERCENT_0" | "VIDEO_VOLUME_PERCENT_10";
}

/**
 * Details of Adloox settings.
 */
export interface Adloox {
  /**
   * Adloox's brand safety settings.
   */
  excludedAdlooxCategories?:  | "ADLOOX_UNSPECIFIED" | "ADULT_CONTENT_HARD" | "ADULT_CONTENT_SOFT" | "ILLEGAL_CONTENT" | "BORDERLINE_CONTENT" | "DISCRIMINATORY_CONTENT" | "VIOLENT_CONTENT_WEAPONS" | "LOW_VIEWABILITY_DOMAINS" | "FRAUD"[];
}

/**
 * Additional URLs related to the ad, including beacons.
 */
export interface AdUrl {
  /**
   * The type of the Ad URL.
   */
  type?:  | "AD_URL_TYPE_UNSPECIFIED" | "AD_URL_TYPE_BEACON_IMPRESSION" | "AD_URL_TYPE_BEACON_EXPANDABLE_DCM_IMPRESSION" | "AD_URL_TYPE_BEACON_CLICK" | "AD_URL_TYPE_BEACON_SKIP";
  /**
   * The URL string value.
   */
  url?: string;
}

/**
 * A single advertiser in Display & Video 360 (DV360).
 */
export interface Advertiser {
  /**
   * Required. Immutable. Ad server related settings of the advertiser.
   */
  adServerConfig?: AdvertiserAdServerConfig;
  /**
   * Output only. The unique ID of the advertiser. Assigned by the system.
   */
  readonly advertiserId?: bigint;
  /**
   * Billing related settings of the advertiser.
   */
  billingConfig?: AdvertiserBillingConfig;
  /**
   * Required. Creative related settings of the advertiser.
   */
  creativeConfig?: AdvertiserCreativeConfig;
  /**
   * Settings that control how advertiser data may be accessed.
   */
  dataAccessConfig?: AdvertiserDataAccessConfig;
  /**
   * Required. The display name of the advertiser. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Required. Controls whether or not insertion orders and line items of the
   * advertiser can spend their budgets and bid on inventory. * Accepted values
   * are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_PAUSED` and
   * `ENTITY_STATUS_SCHEDULED_FOR_DELETION`. * If set to
   * `ENTITY_STATUS_SCHEDULED_FOR_DELETION`, the advertiser will be deleted 30
   * days from when it was first scheduled for deletion.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Required. General settings of the advertiser.
   */
  generalConfig?: AdvertiserGeneralConfig;
  /**
   * Integration details of the advertiser. Only integrationCode is currently
   * applicable to advertiser. Other fields of IntegrationDetails are not
   * supported and will be ignored if provided.
   */
  integrationDetails?: IntegrationDetails;
  /**
   * Output only. The resource name of the advertiser.
   */
  readonly name?: string;
  /**
   * Required. Immutable. The unique ID of the partner that the advertiser
   * belongs to.
   */
  partnerId?: bigint;
  /**
   * Whether integration with Mediaocean (Prisma) is enabled. By enabling this,
   * you agree to the following: On behalf of my company, I authorize Mediaocean
   * (Prisma) to send budget segment plans to Google, and I authorize Google to
   * send corresponding reporting and invoices from DV360 to Mediaocean for the
   * purposes of budget planning, billing, and reconciliation for this
   * advertiser.
   */
  prismaEnabled?: boolean;
  /**
   * Targeting settings related to ad serving of the advertiser.
   */
  servingConfig?: AdvertiserTargetingConfig;
  /**
   * Output only. The timestamp when the advertiser was last updated. Assigned
   * by the system.
   */
  readonly updateTime?: Date;
}

function serializeAdvertiser(data: any): Advertiser {
  return {
    ...data,
    adServerConfig: data["adServerConfig"] !== undefined ? serializeAdvertiserAdServerConfig(data["adServerConfig"]) : undefined,
    billingConfig: data["billingConfig"] !== undefined ? serializeAdvertiserBillingConfig(data["billingConfig"]) : undefined,
    creativeConfig: data["creativeConfig"] !== undefined ? serializeAdvertiserCreativeConfig(data["creativeConfig"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertiser(data: any): Advertiser {
  return {
    ...data,
    adServerConfig: data["adServerConfig"] !== undefined ? deserializeAdvertiserAdServerConfig(data["adServerConfig"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    billingConfig: data["billingConfig"] !== undefined ? deserializeAdvertiserBillingConfig(data["billingConfig"]) : undefined,
    creativeConfig: data["creativeConfig"] !== undefined ? deserializeAdvertiserCreativeConfig(data["creativeConfig"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Ad server related settings of an advertiser.
 */
export interface AdvertiserAdServerConfig {
  /**
   * The configuration for advertisers that use both Campaign Manager 360
   * (CM360) and third-party ad servers.
   */
  cmHybridConfig?: CmHybridConfig;
  /**
   * The configuration for advertisers that use third-party ad servers only.
   */
  thirdPartyOnlyConfig?: ThirdPartyOnlyConfig;
}

function serializeAdvertiserAdServerConfig(data: any): AdvertiserAdServerConfig {
  return {
    ...data,
    cmHybridConfig: data["cmHybridConfig"] !== undefined ? serializeCmHybridConfig(data["cmHybridConfig"]) : undefined,
  };
}

function deserializeAdvertiserAdServerConfig(data: any): AdvertiserAdServerConfig {
  return {
    ...data,
    cmHybridConfig: data["cmHybridConfig"] !== undefined ? deserializeCmHybridConfig(data["cmHybridConfig"]) : undefined,
  };
}

/**
 * Billing related settings of an advertiser.
 */
export interface AdvertiserBillingConfig {
  /**
   * The ID of a billing profile assigned to the advertiser. This field will
   * default to the default billing profile ID of the advertiser's parent
   * partner if a value is not provided.
   */
  billingProfileId?: bigint;
}

function serializeAdvertiserBillingConfig(data: any): AdvertiserBillingConfig {
  return {
    ...data,
    billingProfileId: data["billingProfileId"] !== undefined ? String(data["billingProfileId"]) : undefined,
  };
}

function deserializeAdvertiserBillingConfig(data: any): AdvertiserBillingConfig {
  return {
    ...data,
    billingProfileId: data["billingProfileId"] !== undefined ? BigInt(data["billingProfileId"]) : undefined,
  };
}

/**
 * Creatives related settings of an advertiser.
 */
export interface AdvertiserCreativeConfig {
  /**
   * Whether or not the advertiser is enabled for dynamic creatives.
   */
  dynamicCreativeEnabled?: boolean;
  /**
   * An ID for configuring campaign monitoring provided by Integral Ad Service
   * (IAS). The DV360 system will append an IAS "Campaign Monitor" tag
   * containing this ID to the creative tag.
   */
  iasClientId?: bigint;
  /**
   * Whether or not to use DV360's Online Behavioral Advertising (OBA)
   * compliance. Warning: Changing OBA settings may cause the audit status of
   * your creatives to be reset by some ad exchanges, making them ineligible to
   * serve until they are re-approved.
   */
  obaComplianceDisabled?: boolean;
  /**
   * By setting this field to `true`, you, on behalf of your company, authorize
   * Google to use video creatives associated with this Display & Video 360
   * advertiser to provide reporting and features related to the advertiser's
   * television campaigns. Applicable only when the advertiser has a CM360
   * hybrid ad server configuration.
   */
  videoCreativeDataSharingAuthorized?: boolean;
}

function serializeAdvertiserCreativeConfig(data: any): AdvertiserCreativeConfig {
  return {
    ...data,
    iasClientId: data["iasClientId"] !== undefined ? String(data["iasClientId"]) : undefined,
  };
}

function deserializeAdvertiserCreativeConfig(data: any): AdvertiserCreativeConfig {
  return {
    ...data,
    iasClientId: data["iasClientId"] !== undefined ? BigInt(data["iasClientId"]) : undefined,
  };
}

/**
 * Settings that control how advertiser related data may be accessed.
 */
export interface AdvertiserDataAccessConfig {
  /**
   * Structured Data Files (SDF) settings for the advertiser. If not specified,
   * the SDF settings of the parent partner are used.
   */
  sdfConfig?: AdvertiserSdfConfig;
}

/**
 * General settings of an advertiser.
 */
export interface AdvertiserGeneralConfig {
  /**
   * Required. Immutable. Advertiser's currency in ISO 4217 format. Accepted
   * codes and the currencies they represent are: Currency Code : Currency Name
   * * `ARS` : Argentine Peso * `AUD` : Australian Dollar * `BRL` : Brazilian
   * Real * `CAD` : Canadian Dollar * `CHF` : Swiss Franc * `CLP` : Chilean Peso
   * * `CNY` : Chinese Yuan * `COP` : Colombian Peso * `CZK` : Czech Koruna *
   * `DKK` : Danish Krone * `EGP` : Egyption Pound * `EUR` : Euro * `GBP` :
   * British Pound * `HKD` : Hong Kong Dollar * `HUF` : Hungarian Forint * `IDR`
   * : Indonesian Rupiah * `ILS` : Israeli Shekel * `INR` : Indian Rupee * `JPY`
   * : Japanese Yen * `KRW` : South Korean Won * `MXN` : Mexican Pesos * `MYR` :
   * Malaysian Ringgit * `NGN` : Nigerian Naira * `NOK` : Norwegian Krone *
   * `NZD` : New Zealand Dollar * `PEN` : Peruvian Nuevo Sol * `PLN` : Polish
   * Zloty * `RON` : New Romanian Leu * `RUB` : Russian Ruble * `SEK` : Swedish
   * Krona * `TRY` : Turkish Lira * `TWD` : New Taiwan Dollar * `USD` : US
   * Dollar * `ZAR` : South African Rand
   */
  currencyCode?: string;
  /**
   * Required. The domain URL of the advertiser's primary website. The system
   * will send this information to publishers that require website URL to
   * associate a campaign with an advertiser. Provide a URL with no path or
   * query string, beginning with `http:` or `https:`. For example,
   * http://www.example.com
   */
  domainUrl?: string;
  /**
   * Output only. The standard TZ database name of the advertiser's time zone.
   * For example, `America/New_York`. See more at:
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones For CM360
   * hybrid advertisers, the time zone is the same as that of the associated
   * CM360 account; for third-party only advertisers, the time zone is the same
   * as that of the parent partner.
   */
  readonly timeZone?: string;
}

/**
 * Additional options for DisplayVideo#advertisersAudit.
 */
export interface AdvertisersAuditOptions {
  /**
   * Optional. The specific fields to return. If no mask is specified, all
   * fields in the response proto will be filled. Valid values are: *
   * usedLineItemsCount * usedInsertionOrdersCount * usedCampaignsCount *
   * channelsCount * negativelyTargetedChannelsCount * negativeKeywordListsCount
   * * adGroupCriteriaCount * campaignCriteriaCount
   */
  readMask?: string /* FieldMask */;
}

function serializeAdvertisersAuditOptions(data: any): AdvertisersAuditOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeAdvertisersAuditOptions(data: any): AdvertisersAuditOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#advertisersCampaignsListAssignedTargetingOptions.
 */
export interface AdvertisersCampaignsListAssignedTargetingOptionsOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR` on the same
   * field. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `EQUALS (=)`. * Supported fields: - `targetingType` -
   * `inheritance` Examples: * AssignedTargetingOptions of targeting type
   * TARGETING_TYPE_LANGUAGE or TARGETING_TYPE_GENDER
   * `targetingType="TARGETING_TYPE_LANGUAGE" OR
   * targetingType="TARGETING_TYPE_GENDER"` * AssignedTargetingOptions with
   * inheritance status of NOT_INHERITED or INHERITED_FROM_PARTNER
   * `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"` The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `targetingType`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix "desc" should be added to the field name.
   * Example: `targetingType desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. The size must be an integer between `1` and `5000`.
   * If unspecified, the default is `5000`. Returns error code
   * `INVALID_ARGUMENT` if an invalid value is specified.
   */
  pageSize?: number;
  /**
   * A token that lets the client fetch the next page of results. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `BulkListCampaignAssignedTargetingOptions` method. If not specified, the
   * first page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersCampaignsList.
 */
export interface AdvertisersCampaignsListOptions {
  /**
   * Allows filtering by campaign properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by `AND` or `OR` logical operators. A sequence of restrictions
   * implicitly uses `AND`. * A restriction has the form of `{field} {operator}
   * {value}`. * The operator used on `updateTime` must be `GREATER THAN OR
   * EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `campaignId` - `displayName` -
   * `entityStatus` - `updateTime` (input in ISO 8601 format, or
   * YYYY-MM-DDTHH:MM:SSZ) Examples: * All `ENTITY_STATUS_ACTIVE` or
   * `ENTITY_STATUS_PAUSED` campaigns under an advertiser:
   * `(entityStatus="ENTITY_STATUS_ACTIVE" OR
   * entityStatus="ENTITY_STATUS_PAUSED")` * All campaigns with an update time
   * less than or equal to `2020-11-04T18:54:47Z (format of ISO 8601)`:
   * `updateTime<="2020-11-04T18:54:47Z"` * All campaigns with an update time
   * greater than or equal to `2020-11-04T18:54:47Z (format of ISO 8601)`:
   * `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `entityStatus` * `updateTime` The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListCampaigns` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersCampaignsPatch.
 */
export interface AdvertisersCampaignsPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersCampaignsPatchOptions(data: any): AdvertisersCampaignsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersCampaignsPatchOptions(data: any): AdvertisersCampaignsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#advertisersCampaignsTargetingTypesAssignedTargetingOptionsList.
 */
export interface AdvertisersCampaignsTargetingTypesAssignedTargetingOptionsListOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR`. * A restriction
   * has the form of `{field} {operator} {value}`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `assignedTargetingOptionId` -
   * `inheritance` Examples: * AssignedTargetingOptions with ID 1 or 2
   * `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` *
   * AssignedTargetingOptions with inheritance status of NOT_INHERITED or
   * INHERITED_FROM_PARTNER `inheritance="NOT_INHERITED" OR
   * inheritance="INHERITED_FROM_PARTNER"` The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedTargetingOptionId` (default) The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `assignedTargetingOptionId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `5000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListCampaignAssignedTargetingOptions` method. If not specified, the first
   * page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersChannelsCreate.
 */
export interface AdvertisersChannelsCreateOptions {
  /**
   * The ID of the partner that owns the created channel.
   */
  partnerId?: bigint;
}

function serializeAdvertisersChannelsCreateOptions(data: any): AdvertisersChannelsCreateOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertisersChannelsCreateOptions(data: any): AdvertisersChannelsCreateOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersChannelsGet.
 */
export interface AdvertisersChannelsGetOptions {
  /**
   * The ID of the partner that owns the fetched channel.
   */
  partnerId?: bigint;
}

function serializeAdvertisersChannelsGetOptions(data: any): AdvertisersChannelsGetOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertisersChannelsGetOptions(data: any): AdvertisersChannelsGetOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersChannelsList.
 */
export interface AdvertisersChannelsListOptions {
  /**
   * Allows filtering by channel fields. Supported syntax: * Filter expressions
   * for channel currently can only contain at most one * restriction. * A
   * restriction has the form of `{field} {operator} {value}`. * The operator
   * must be `CONTAINS (:)`. * Supported fields: - `displayName` Examples: * All
   * channels for which the display name contains "google": `displayName :
   * "google"`. The length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `channelId` The default sorting order is ascending. To specify
   * descending order for a field, a suffix " desc" should be added to the field
   * name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListChannels` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that owns the channels.
   */
  partnerId?: bigint;
}

function serializeAdvertisersChannelsListOptions(data: any): AdvertisersChannelsListOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertisersChannelsListOptions(data: any): AdvertisersChannelsListOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersChannelsPatch.
 */
export interface AdvertisersChannelsPatchOptions {
  /**
   * The ID of the partner that owns the created channel.
   */
  partnerId?: bigint;
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersChannelsPatchOptions(data: any): AdvertisersChannelsPatchOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersChannelsPatchOptions(data: any): AdvertisersChannelsPatchOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersChannelsSitesCreate.
 */
export interface AdvertisersChannelsSitesCreateOptions {
  /**
   * The ID of the partner that owns the parent channel.
   */
  partnerId?: bigint;
}

function serializeAdvertisersChannelsSitesCreateOptions(data: any): AdvertisersChannelsSitesCreateOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertisersChannelsSitesCreateOptions(data: any): AdvertisersChannelsSitesCreateOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersChannelsSitesDelete.
 */
export interface AdvertisersChannelsSitesDeleteOptions {
  /**
   * The ID of the partner that owns the parent channel.
   */
  partnerId?: bigint;
}

function serializeAdvertisersChannelsSitesDeleteOptions(data: any): AdvertisersChannelsSitesDeleteOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertisersChannelsSitesDeleteOptions(data: any): AdvertisersChannelsSitesDeleteOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersChannelsSitesList.
 */
export interface AdvertisersChannelsSitesListOptions {
  /**
   * Allows filtering by site fields. Supported syntax: * Filter expressions
   * for site currently can only contain at most one * restriction. * A
   * restriction has the form of `{field} {operator} {value}`. * The operator
   * must be `CONTAINS (:)`. * Supported fields: - `urlOrAppId` Examples: * All
   * sites for which the URL or app ID contains "google": `urlOrAppId :
   * "google"`
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `urlOrAppId`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix " desc" should be added to the field name.
   * Example: `urlOrAppId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `10000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListSites` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that owns the parent channel.
   */
  partnerId?: bigint;
}

function serializeAdvertisersChannelsSitesListOptions(data: any): AdvertisersChannelsSitesListOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertisersChannelsSitesListOptions(data: any): AdvertisersChannelsSitesListOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersCreativesList.
 */
export interface AdvertisersCreativesListOptions {
  /**
   * Allows filtering by creative properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restriction for the
   * same field must be combined by `OR`. * Restriction for different fields
   * must be combined by `AND`. * Between `(` and `)` there can only be
   * restrictions combined by `OR` for the same field. * A restriction has the
   * form of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`
   * for the following fields: - `entityStatus` - `creativeType`. - `dimensions`
   * - `minDuration` - `maxDuration` - `approvalStatus` - `exchangeReviewStatus`
   * - `dynamic` - `creativeId` * The operator must be `HAS (:)` for the
   * following fields: - `lineItemIds` * The operator must be `GREATER THAN OR
   * EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` for the following fields: -
   * `updateTime` (input in ISO 8601 format, or YYYY-MM-DDTHH:MM:SSZ) * For
   * `entityStatus`, `minDuration`, `maxDuration`, `updateTime`, and `dynamic`,
   * there may be at most one restriction. * For `dimensions`, the value is in
   * the form of `"{width}x{height}"`. * For `exchangeReviewStatus`, the value
   * is in the form of `{exchange}-{reviewStatus}`. * For `minDuration` and
   * `maxDuration`, the value is in the form of `"{duration}s"`. Only seconds
   * are supported with millisecond granularity. * For `updateTime`, a creative
   * resource's field value reflects the last time that a creative has been
   * updated, which includes updates made by the system (e.g. creative review
   * updates). * There may be multiple `lineItemIds` restrictions in order to
   * search against multiple possible line item IDs. * There may be multiple
   * `creativeId` restrictions in order to search against multiple possible
   * creative IDs. Examples: * All native creatives:
   * `creativeType="CREATIVE_TYPE_NATIVE"` * All active creatives with 300x400
   * or 50x100 dimensions: `entityStatus="ENTITY_STATUS_ACTIVE" AND
   * (dimensions="300x400" OR dimensions="50x100")` * All dynamic creatives that
   * are approved by AdX or AppNexus, with a minimum duration of 5 seconds and
   * 200ms. `dynamic="true" AND minDuration="5.2s" AND
   * (exchangeReviewStatus="EXCHANGE_GOOGLE_AD_MANAGER-REVIEW_STATUS_APPROVED"
   * OR exchangeReviewStatus="EXCHANGE_APPNEXUS-REVIEW_STATUS_APPROVED")` * All
   * video creatives that are associated with line item ID 1 or 2:
   * `creativeType="CREATIVE_TYPE_VIDEO" AND (lineItemIds:1 OR lineItemIds:2)` *
   * Find creatives by multiple creative IDs: `creativeId=1 OR creativeId=2` *
   * All creatives with an update time greater than or equal to
   * `2020-11-04T18:54:47Z (format of ISO 8601)`:
   * `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `creativeId`
   * (default) * `createTime` * `mediaDuration` * `dimensions` (sorts by width
   * first, then by height) The default sorting order is ascending. To specify
   * descending order for a field, a suffix "desc" should be added to the field
   * name. Example: `createTime desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListCreatives` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersCreativesPatch.
 */
export interface AdvertisersCreativesPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersCreativesPatchOptions(data: any): AdvertisersCreativesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersCreativesPatchOptions(data: any): AdvertisersCreativesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Structured Data Files (SDF) settings of an advertiser.
 */
export interface AdvertiserSdfConfig {
  /**
   * Whether or not this advertiser overrides the SDF configuration of its
   * parent partner. By default, an advertiser inherits the SDF configuration
   * from the parent partner. To override the partner configuration, set this
   * field to `true` and provide the new configuration in sdfConfig.
   */
  overridePartnerSdfConfig?: boolean;
  /**
   * The SDF configuration for the advertiser. * Required when
   * overridePartnerSdfConfig is `true`. * Output only when
   * overridePartnerSdfConfig is `false`.
   */
  sdfConfig?: SdfConfig;
}

/**
 * Additional options for
 * DisplayVideo#advertisersInsertionOrdersListAssignedTargetingOptions.
 */
export interface AdvertisersInsertionOrdersListAssignedTargetingOptionsOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR` on the same
   * field. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `EQUALS (=)`. * Supported fields: - `targetingType` -
   * `inheritance` Examples: * AssignedTargetingOptions of targeting type
   * TARGETING_TYPE_PROXIMITY_LOCATION_LIST or TARGETING_TYPE_CHANNEL
   * `targetingType="TARGETING_TYPE_PROXIMITY_LOCATION_LIST" OR
   * targetingType="TARGETING_TYPE_CHANNEL"` * AssignedTargetingOptions with
   * inheritance status of NOT_INHERITED or INHERITED_FROM_PARTNER
   * `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"` The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `targetingType`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix "desc" should be added to the field name.
   * Example: `targetingType desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. The size must be an integer between `1` and `5000`.
   * If unspecified, the default is `5000`. Returns error code
   * `INVALID_ARGUMENT` if an invalid value is specified.
   */
  pageSize?: number;
  /**
   * A token that lets the client fetch the next page of results. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `BulkListInsertionOrderAssignedTargetingOptions` method. If not specified,
   * the first page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersInsertionOrdersList.
 */
export interface AdvertisersInsertionOrdersListOptions {
  /**
   * Allows filtering by insertion order properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by `AND` or `OR` logical operators. A sequence of restrictions
   * implicitly uses `AND`. * A restriction has the form of `{field} {operator}
   * {value}`. * The operator used on
   * `budget.budget_segments.date_range.end_date` must be LESS THAN (<). * The
   * operator used on `updateTime` must be `GREATER THAN OR EQUAL TO (>=)` or
   * `LESS THAN OR EQUAL TO (<=)`. * The operators used on all other fields must
   * be `EQUALS (=)`. * Supported fields: - `campaignId` - `displayName` -
   * `entityStatus` - `budget.budget_segments.date_range.end_date` (input as
   * YYYY-MM-DD) - `updateTime` (input in ISO 8601 format, or
   * YYYY-MM-DDTHH:MM:SSZ) Examples: * All insertion orders under a campaign:
   * `campaignId="1234"` * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED`
   * insertion orders under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE"
   * OR entityStatus="ENTITY_STATUS_PAUSED")` * All insertion orders whose
   * budget segments' dates end before March 28, 2019:
   * `budget.budget_segments.date_range.end_date<"2019-03-28"` * All insertion
   * orders with an update time less than or equal to `2020-11-04T18:54:47Z
   * (format of ISO 8601)`: `updateTime<="2020-11-04T18:54:47Z"` * All insertion
   * orders with an update time greater than or equal to `2020-11-04T18:54:47Z
   * (format of ISO 8601)`: `updateTime>="2020-11-04T18:54:47Z"` The length of
   * this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * "displayName"
   * (default) * "entityStatus" * "updateTime" The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `100`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListInsertionOrders` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersInsertionOrdersPatch.
 */
export interface AdvertisersInsertionOrdersPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersInsertionOrdersPatchOptions(data: any): AdvertisersInsertionOrdersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersInsertionOrdersPatchOptions(data: any): AdvertisersInsertionOrdersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#advertisersInsertionOrdersTargetingTypesAssignedTargetingOptionsList.
 */
export interface AdvertisersInsertionOrdersTargetingTypesAssignedTargetingOptionsListOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR`. * A restriction
   * has the form of `{field} {operator} {value}`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `assignedTargetingOptionId` -
   * `inheritance` Examples: * AssignedTargetingOptions with ID 1 or 2
   * `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` *
   * AssignedTargetingOptions with inheritance status of NOT_INHERITED or
   * INHERITED_FROM_PARTNER `inheritance="NOT_INHERITED" OR
   * inheritance="INHERITED_FROM_PARTNER"` The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedTargetingOptionId` (default) The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `assignedTargetingOptionId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `5000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListInsertionOrderAssignedTargetingOptions` method. If not specified, the
   * first page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersInvoicesList.
 */
export interface AdvertisersInvoicesListOptions {
  /**
   * The month to list the invoices for. If not set, the request will retrieve
   * invoices for the previous month. Must be in the format YYYYMM.
   */
  issueMonth?: string;
  /**
   * Select type of invoice to retrieve for Loi Sapin advertisers. Only
   * applicable to Loi Sapin advertisers. Will be ignored otherwise.
   */
  loiSapinInvoiceType?:  | "LOI_SAPIN_INVOICE_TYPE_UNSPECIFIED" | "LOI_SAPIN_INVOICE_TYPE_MEDIA" | "LOI_SAPIN_INVOICE_TYPE_PLATFORM";
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListInvoices` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DisplayVideo#advertisersInvoicesLookupInvoiceCurrency.
 */
export interface AdvertisersInvoicesLookupInvoiceCurrencyOptions {
  /**
   * Month for which the currency is needed. If not set, the request will
   * return existing currency settings for the advertiser. Must be in the format
   * YYYYMM.
   */
  invoiceMonth?: string;
}

/**
 * Additional options for
 * DisplayVideo#advertisersLineItemsBulkListAssignedTargetingOptions.
 */
export interface AdvertisersLineItemsBulkListAssignedTargetingOptionsOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR` on the same
   * field. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `EQUALS (=)`. * Supported fields: - `targetingType` -
   * `inheritance` Examples: * AssignedTargetingOptions of targeting type
   * TARGETING_TYPE_PROXIMITY_LOCATION_LIST or TARGETING_TYPE_CHANNEL
   * `targetingType="TARGETING_TYPE_PROXIMITY_LOCATION_LIST" OR
   * targetingType="TARGETING_TYPE_CHANNEL"` * AssignedTargetingOptions with
   * inheritance status of NOT_INHERITED or INHERITED_FROM_PARTNER
   * `inheritance="NOT_INHERITED" OR inheritance="INHERITED_FROM_PARTNER"` The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Required. The IDs of the line items to list assigned targeting options
   * for.
   */
  lineItemIds?: bigint;
  /**
   * Field by which to sort the list. Acceptable values are: * `lineItemId`
   * (default) * `assignedTargetingOption.targetingType` The default sorting
   * order is ascending. To specify descending order for a field, a suffix
   * "desc" should be added to the field name. Example: `targetingType desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. The size must be an integer between `1` and `5000`.
   * If unspecified, the default is `5000`. Returns error code
   * `INVALID_ARGUMENT` if an invalid value is specified.
   */
  pageSize?: number;
  /**
   * A token that lets the client fetch the next page of results. Typically,
   * this is the value of next_page_token returned from the previous call to the
   * `BulkListAssignedTargetingOptions` method. If not specified, the first page
   * of results will be returned.
   */
  pageToken?: string;
}

function serializeAdvertisersLineItemsBulkListAssignedTargetingOptionsOptions(data: any): AdvertisersLineItemsBulkListAssignedTargetingOptionsOptions {
  return {
    ...data,
    lineItemIds: data["lineItemIds"] !== undefined ? String(data["lineItemIds"]) : undefined,
  };
}

function deserializeAdvertisersLineItemsBulkListAssignedTargetingOptionsOptions(data: any): AdvertisersLineItemsBulkListAssignedTargetingOptionsOptions {
  return {
    ...data,
    lineItemIds: data["lineItemIds"] !== undefined ? BigInt(data["lineItemIds"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersLineItemsList.
 */
export interface AdvertisersLineItemsListOptions {
  /**
   * Allows filtering by line item properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by `AND` or `OR` logical operators. A sequence of restrictions
   * implicitly uses `AND`. * A restriction has the form of `{field} {operator}
   * {value}`. * The operator used on `flight.dateRange.endDate` must be LESS
   * THAN (<). * The operator used on `updateTime` must be `GREATER THAN OR
   * EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)`. * The operator used on
   * `warningMessages` must be `HAS (:)`. * The operators used on all other
   * fields must be `EQUALS (=)`. * Supported properties: - `campaignId` -
   * `displayName` - `insertionOrderId` - `entityStatus` - `lineItemId` -
   * `lineItemType` - `flight.dateRange.endDate` (input formatted as YYYY-MM-DD)
   * - `warningMessages` - `flight.triggerId` - `updateTime` (input in ISO 8601
   * format, or YYYY-MM-DDTHH:MM:SSZ) - `targetedChannelId` -
   * `targetedNegativeKeywordListId` Examples: * All line items under an
   * insertion order: `insertionOrderId="1234"` * All `ENTITY_STATUS_ACTIVE` or
   * `ENTITY_STATUS_PAUSED` and `LINE_ITEM_TYPE_DISPLAY_DEFAULT` line items
   * under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR
   * entityStatus="ENTITY_STATUS_PAUSED") AND
   * lineItemType="LINE_ITEM_TYPE_DISPLAY_DEFAULT"` * All line items whose
   * flight dates end before March 28, 2019:
   * `flight.dateRange.endDate<"2019-03-28"` * All line items that have
   * `NO_VALID_CREATIVE` in `warningMessages`:
   * `warningMessages:"NO_VALID_CREATIVE"` * All line items with an update time
   * less than or equal to `2020-11-04T18:54:47Z (format of ISO 8601)`:
   * `updateTime<="2020-11-04T18:54:47Z"` * All line items with an update time
   * greater than or equal to `2020-11-04T18:54:47Z (format of ISO 8601)`:
   * `updateTime>="2020-11-04T18:54:47Z"` * All line items that are using both
   * the specified channel and specified negative keyword list in their
   * targeting: `targetedNegativeKeywordListId=789 AND targetedChannelId=12345`
   * The length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `entityStatus` * `flight.dateRange.endDate` * `updateTime` The
   * default sorting order is ascending. To specify descending order for a
   * field, a suffix "desc" should be added to the field name. Example:
   * `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListLineItems` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersLineItemsPatch.
 */
export interface AdvertisersLineItemsPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersLineItemsPatchOptions(data: any): AdvertisersLineItemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersLineItemsPatchOptions(data: any): AdvertisersLineItemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#advertisersLineItemsTargetingTypesAssignedTargetingOptionsList.
 */
export interface AdvertisersLineItemsTargetingTypesAssignedTargetingOptionsListOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR`. * A restriction
   * has the form of `{field} {operator} {value}`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `assignedTargetingOptionId` -
   * `inheritance` Examples: * AssignedTargetingOptions with ID 1 or 2
   * `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` *
   * AssignedTargetingOptions with inheritance status of NOT_INHERITED or
   * INHERITED_FROM_PARTNER `inheritance="NOT_INHERITED" OR
   * inheritance="INHERITED_FROM_PARTNER"` The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedTargetingOptionId` (default) The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `assignedTargetingOptionId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `5000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListLineItemAssignedTargetingOptions` method. If not specified, the first
   * page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersListAssignedTargetingOptions.
 */
export interface AdvertisersListAssignedTargetingOptionsOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR`.. * A restriction
   * has the form of `{field} {operator} {value}`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `targetingType` Examples: *
   * targetingType with value TARGETING_TYPE_CHANNEL
   * `targetingType="TARGETING_TYPE_CHANNEL"` The length of this field should be
   * no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `targetingType`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix "desc" should be added to the field name.
   * Example: `targetingType desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. The size must be an integer between `1` and `5000`.
   * If unspecified, the default is '5000'. Returns error code
   * `INVALID_ARGUMENT` if an invalid value is specified.
   */
  pageSize?: number;
  /**
   * A token that lets the client fetch the next page of results. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `BulkListAdvertiserAssignedTargetingOptions` method. If not specified, the
   * first page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersList.
 */
export interface AdvertisersListOptions {
  /**
   * Allows filtering by advertiser properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by `AND` or `OR` logical operators. A sequence of restrictions
   * implicitly uses `AND`. * A restriction has the form of `{field} {operator}
   * {value}`. * The operator used on `updateTime` must be `GREATER THAN OR
   * EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `advertiserId` - `displayName` -
   * `entityStatus` - `updateTime` (input in ISO 8601 format, or
   * YYYY-MM-DDTHH:MM:SSZ) Examples: * All active advertisers under a partner:
   * `entityStatus="ENTITY_STATUS_ACTIVE"` * All advertisers with an update time
   * less than or equal to `2020-11-04T18:54:47Z (format of ISO 8601)`:
   * `updateTime<="2020-11-04T18:54:47Z"` * All advertisers with an update time
   * greater than or equal to `2020-11-04T18:54:47Z (format of ISO 8601)`:
   * `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `entityStatus` * `updateTime` The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. For example, `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListAdvertisers` method. If not specified, the first page of results will
   * be returned.
   */
  pageToken?: string;
  /**
   * Required. The ID of the partner that the fetched advertisers should all
   * belong to. The system only supports listing advertisers for one partner at
   * a time.
   */
  partnerId?: bigint;
}

function serializeAdvertisersListOptions(data: any): AdvertisersListOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAdvertisersListOptions(data: any): AdvertisersListOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#advertisersLocationListsAssignedLocationsList.
 */
export interface AdvertisersLocationListsAssignedLocationsListOptions {
  /**
   * Allows filtering by location list assignment fields. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by the logical operator `OR`. * A restriction has the form
   * of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. *
   * Supported fields: - `assignedLocationId` The length of this field should be
   * no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedLocationId` (default) The default sorting order is ascending. To
   * specify descending order for a field, a suffix " desc" should be added to
   * the field name. Example: `assignedLocationId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListAssignedLocations` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersLocationListsList.
 */
export interface AdvertisersLocationListsListOptions {
  /**
   * Allows filtering by location list fields. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by `AND` or `OR` logical operators. A sequence of restrictions
   * implicitly uses `AND`. * A restriction has the form of `{field} {operator}
   * {value}`. * The operator must be `EQUALS (=)`. * Supported fields: -
   * `locationType` Examples: * All regional location list:
   * `locationType="TARGETING_LOCATION_TYPE_REGIONAL"` * All proximity location
   * list: `locationType="TARGETING_LOCATION_TYPE_PROXIMITY"`
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `locationListId`
   * (default) * `displayName` The default sorting order is ascending. To
   * specify descending order for a field, a suffix "desc" should be added to
   * the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. Defaults to `100` if
   * not set. Returns error code `INVALID_ARGUMENT` if an invalid value is
   * specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListLocationLists` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersLocationListsPatch.
 */
export interface AdvertisersLocationListsPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersLocationListsPatchOptions(data: any): AdvertisersLocationListsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersLocationListsPatchOptions(data: any): AdvertisersLocationListsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersManualTriggersList.
 */
export interface AdvertisersManualTriggersListOptions {
  /**
   * Allows filtering by manual trigger properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by `AND` or `OR` logical operators. A sequence of restrictions
   * implicitly uses `AND`. * A restriction has the form of `{field} {operator}
   * {value}`. * The operator must be `EQUALS (=)`. * Supported fields: -
   * `displayName` - `state` Examples: * All active manual triggers under an
   * advertiser: `state="ACTIVE"` The length of this field should be no more
   * than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `state` The default sorting order is ascending. To specify
   * descending order for a field, a suffix "desc" should be added to the field
   * name. For example, `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListManualTriggers` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersManualTriggersPatch.
 */
export interface AdvertisersManualTriggersPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersManualTriggersPatchOptions(data: any): AdvertisersManualTriggersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersManualTriggersPatchOptions(data: any): AdvertisersManualTriggersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersNegativeKeywordListsList.
 */
export interface AdvertisersNegativeKeywordListsListOptions {
  /**
   * Requested page size. Must be between `1` and `200`. Defaults to `100` if
   * not set. Returns error code `INVALID_ARGUMENT` if an invalid value is
   * specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListNegativeKeywordLists` method. If not specified, the first page of
   * results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DisplayVideo#advertisersNegativeKeywordListsNegativeKeywordsList.
 */
export interface AdvertisersNegativeKeywordListsNegativeKeywordsListOptions {
  /**
   * Allows filtering by negative keyword fields. Supported syntax: * Filter
   * expressions for negative keyword currently can only contain at most one *
   * restriction. * A restriction has the form of `{field} {operator} {value}`.
   * * The operator must be `CONTAINS (:)`. * Supported fields: - `keywordValue`
   * Examples: * All negative keywords for which the keyword value contains
   * "google": `keywordValue : "google"`
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `keywordValue`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix " desc" should be added to the field name.
   * Example: `keywordValue desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `1000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListNegativeKeywords` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersNegativeKeywordListsPatch.
 */
export interface AdvertisersNegativeKeywordListsPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersNegativeKeywordListsPatchOptions(data: any): AdvertisersNegativeKeywordListsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersNegativeKeywordListsPatchOptions(data: any): AdvertisersNegativeKeywordListsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersPatch.
 */
export interface AdvertisersPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdvertisersPatchOptions(data: any): AdvertisersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdvertisersPatchOptions(data: any): AdvertisersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#advertisersTargetingTypesAssignedTargetingOptionsList.
 */
export interface AdvertisersTargetingTypesAssignedTargetingOptionsListOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR`. * A restriction
   * has the form of `{field} {operator} {value}`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `assignedTargetingOptionId` Examples: *
   * AssignedTargetingOption with ID 123456 `assignedTargetingOptionId="123456"`
   * The length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedTargetingOptionId` (default) The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `assignedTargetingOptionId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `5000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListAdvertiserAssignedTargetingOptions` method. If not specified, the
   * first page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#advertisersYoutubeAdGroupAdsList.
 */
export interface AdvertisersYoutubeAdGroupAdsListOptions {
  /**
   * Allows filtering by custom YouTube ad group ad fields. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by `AND` and `OR`. Only the restrictions for * the same
   * field can be combined by `OR`. A sequence of restrictions * implicitly uses
   * `AND`. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `EQUALS (=)`. * Supported properties: - `adGroupId` -
   * `displayName` - `entityStatus` - `adGroupAdId` Examples: * All ad group ads
   * under an ad group: `adGroupId="1234"` and its * entityStatus is
   * `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED`:
   * `(entityStatus="ENTITY_STATUS_ACTIVE" OR
   * entityStatus="ENTITY_STATUS_PAUSED") AND adGroupId="12345"` The length of
   * this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `entityStatus` The default sorting order is ascending. To
   * specify descending order for a field, a suffix "desc" should be added to
   * the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `100`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListYoutubeAdGroupAds` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DisplayVideo#advertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptions.
 */
export interface AdvertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptionsOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR` on the same
   * field. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `EQUALS (=)`. * Supported fields: - `targetingType`
   * Examples: * AssignedTargetingOptions of targeting type
   * TARGETING_TYPE_YOUTUBE_VIDEO or TARGETING_TYPE_YOUTUBE_CHANNEL
   * `targetingType="TARGETING_TYPE_YOUTUBE_VIDEO" OR
   * targetingType="TARGETING_TYPE_YOUTUBE_CHANNEL"` The length of this field
   * should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `youtubeAdGroupId` (default) * `assignedTargetingOption.targetingType` The
   * default sorting order is ascending. To specify descending order for a
   * field, a suffix "desc" should be added to the field name. Example:
   * `targetingType desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. The size must be an integer between `1` and `5000`.
   * If unspecified, the default is `5000`. Returns error code
   * `INVALID_ARGUMENT` if an invalid value is specified.
   */
  pageSize?: number;
  /**
   * A token that lets the client fetch the next page of results. Typically,
   * this is the value of next_page_token returned from the previous call to the
   * `BulkListAdGroupAssignedTargetingOptions` method. If not specified, the
   * first page of results will be returned.
   */
  pageToken?: string;
  /**
   * Required. The IDs of the youtube ad groups to list assigned targeting
   * options for.
   */
  youtubeAdGroupIds?: bigint;
}

function serializeAdvertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptionsOptions(data: any): AdvertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptionsOptions {
  return {
    ...data,
    youtubeAdGroupIds: data["youtubeAdGroupIds"] !== undefined ? String(data["youtubeAdGroupIds"]) : undefined,
  };
}

function deserializeAdvertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptionsOptions(data: any): AdvertisersYoutubeAdGroupsBulkListAdGroupAssignedTargetingOptionsOptions {
  return {
    ...data,
    youtubeAdGroupIds: data["youtubeAdGroupIds"] !== undefined ? BigInt(data["youtubeAdGroupIds"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#advertisersYoutubeAdGroupsList.
 */
export interface AdvertisersYoutubeAdGroupsListOptions {
  /**
   * Allows filtering by custom YouTube ad group fields. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by `AND` and `OR`. Only the restrictions for * the same
   * field can be combined by `OR`. A sequence of restrictions * implicitly uses
   * `AND`. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `EQUALS (=)`. * Supported properties: - `adGroupId` -
   * `displayName` - `entityStatus` - `lineItemId` - `adGroupFormat` Examples: *
   * All ad groups under an line item: `lineItemId="1234"` * All
   * `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` and
   * `YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_IN_STREAM` ad groups under an
   * advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR
   * entityStatus="ENTITY_STATUS_PAUSED") AND
   * adGroupFormat="YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_IN_STREAM"` The length
   * of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `entityStatus` The default sorting order is ascending. To
   * specify descending order for a field, a suffix "desc" should be added to
   * the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListYoutubeAdGroups` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DisplayVideo#advertisersYoutubeAdGroupsTargetingTypesAssignedTargetingOptionsList.
 */
export interface AdvertisersYoutubeAdGroupsTargetingTypesAssignedTargetingOptionsListOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR`. * A restriction
   * has the form of `{field} {operator} {value}`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `assignedTargetingOptionId` Examples: *
   * AssignedTargetingOptions with ID 1 or 2 `assignedTargetingOptionId="1" OR
   * assignedTargetingOptionId="2"` The length of this field should be no more
   * than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedTargetingOptionId` (default) The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `assignedTargetingOptionId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `5000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListYoutubeAdGroupAssignedTargetingOptions` method. If not specified, the
   * first page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Targeting settings related to ad serving of an advertiser.
 */
export interface AdvertiserTargetingConfig {
  /**
   * Whether or not connected TV devices are exempt from viewability targeting
   * for all video line items under the advertiser.
   */
  exemptTvFromViewabilityTargeting?: boolean;
}

/**
 * Represents a targetable age range. This will be populated in the details
 * field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_AGE_RANGE`.
 */
export interface AgeRangeAssignedTargetingOptionDetails {
  /**
   * The age range of an audience. We only support targeting a continuous age
   * range of an audience. Thus, the age range represented in this field can be
   * 1) targeted solely, or, 2) part of a larger continuous age range. The reach
   * of a continuous age range targeting can be expanded by also targeting an
   * audience of an unknown age. Output only in v1. Required in v2.
   */
  ageRange?:  | "AGE_RANGE_UNSPECIFIED" | "AGE_RANGE_18_24" | "AGE_RANGE_25_34" | "AGE_RANGE_35_44" | "AGE_RANGE_45_54" | "AGE_RANGE_55_64" | "AGE_RANGE_65_PLUS" | "AGE_RANGE_UNKNOWN" | "AGE_RANGE_18_20" | "AGE_RANGE_21_24" | "AGE_RANGE_25_29" | "AGE_RANGE_30_34" | "AGE_RANGE_35_39" | "AGE_RANGE_40_44" | "AGE_RANGE_45_49" | "AGE_RANGE_50_54" | "AGE_RANGE_55_59" | "AGE_RANGE_60_64";
}

/**
 * Represents a targetable age range. This will be populated in the
 * age_range_details field when targeting_type is `TARGETING_TYPE_AGE_RANGE`.
 */
export interface AgeRangeTargetingOptionDetails {
  /**
   * Output only. The age range of an audience.
   */
  readonly ageRange?:  | "AGE_RANGE_UNSPECIFIED" | "AGE_RANGE_18_24" | "AGE_RANGE_25_34" | "AGE_RANGE_35_44" | "AGE_RANGE_45_54" | "AGE_RANGE_55_64" | "AGE_RANGE_65_PLUS" | "AGE_RANGE_UNKNOWN" | "AGE_RANGE_18_20" | "AGE_RANGE_21_24" | "AGE_RANGE_25_29" | "AGE_RANGE_30_34" | "AGE_RANGE_35_39" | "AGE_RANGE_40_44" | "AGE_RANGE_45_49" | "AGE_RANGE_50_54" | "AGE_RANGE_55_59" | "AGE_RANGE_60_64";
}

/**
 * Details for assigned app targeting option. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_APP`.
 */
export interface AppAssignedTargetingOptionDetails {
  /**
   * Required. The ID of the app. Android's Play store app uses bundle ID, for
   * example `com.google.android.gm`. Apple's App store app ID uses 9 digit
   * string, for example `422689480`.
   */
  appId?: string;
  /**
   * Indicates the platform of the targeted app. If this field is not
   * specified, the app platform will be assumed to be mobile (i.e., Android or
   * iOS), and we will derive the appropriate mobile platform from the app ID.
   */
  appPlatform?:  | "APP_PLATFORM_UNSPECIFIED" | "APP_PLATFORM_IOS" | "APP_PLATFORM_ANDROID" | "APP_PLATFORM_ROKU" | "APP_PLATFORM_AMAZON_FIRETV" | "APP_PLATFORM_PLAYSTATION" | "APP_PLATFORM_APPLE_TV" | "APP_PLATFORM_XBOX" | "APP_PLATFORM_SAMSUNG_TV" | "APP_PLATFORM_ANDROID_TV" | "APP_PLATFORM_GENERIC_CTV";
  /**
   * Output only. The display name of the app.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
}

/**
 * Details for assigned app category targeting option. This will be populated
 * in the app_category_details field of an AssignedTargetingOption when
 * targeting_type is `TARGETING_TYPE_APP_CATEGORY`.
 */
export interface AppCategoryAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the app category.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_APP_CATEGORY`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable collection of apps. A collection lets you target
 * dynamic groups of related apps that are maintained by the platform, for
 * example `All Apps/Google Play/Games`. This will be populated in the
 * app_category_details field when targeting_type is
 * `TARGETING_TYPE_APP_CATEGORY`.
 */
export interface AppCategoryTargetingOptionDetails {
  /**
   * Output only. The name of the app collection.
   */
  readonly displayName?: string;
}

/**
 * A single asset.
 */
export interface Asset {
  /**
   * The asset content. For uploaded assets, the content is the serving path.
   */
  content?: string;
  /**
   * Media ID of the uploaded asset. This is a unique identifier for the asset.
   * This ID can be passed to other API calls, e.g. CreateCreative to associate
   * the asset with a creative. **On April 5, 2023, the value of this ID will be
   * updated. Before this date, we recommend that you stop using any cached
   * media IDs when creating or updating creatives, and instead upload assets
   * immediately before using them for creative production.** **After April 5,
   * you can update cached media IDs to the new values by retrieving them from
   * associated creative resources or re-uploading them.**
   */
  mediaId?: bigint;
}

function serializeAsset(data: any): Asset {
  return {
    ...data,
    mediaId: data["mediaId"] !== undefined ? String(data["mediaId"]) : undefined,
  };
}

function deserializeAsset(data: any): Asset {
  return {
    ...data,
    mediaId: data["mediaId"] !== undefined ? BigInt(data["mediaId"]) : undefined,
  };
}

/**
 * Asset association for the creative.
 */
export interface AssetAssociation {
  /**
   * The associated asset.
   */
  asset?: Asset;
  /**
   * The role of this asset for the creative.
   */
  role?:  | "ASSET_ROLE_UNSPECIFIED" | "ASSET_ROLE_MAIN" | "ASSET_ROLE_BACKUP" | "ASSET_ROLE_POLITE_LOAD" | "ASSET_ROLE_HEADLINE" | "ASSET_ROLE_LONG_HEADLINE" | "ASSET_ROLE_BODY" | "ASSET_ROLE_LONG_BODY" | "ASSET_ROLE_CAPTION_URL" | "ASSET_ROLE_CALL_TO_ACTION" | "ASSET_ROLE_ADVERTISER_NAME" | "ASSET_ROLE_PRICE" | "ASSET_ROLE_ANDROID_APP_ID" | "ASSET_ROLE_IOS_APP_ID" | "ASSET_ROLE_RATING" | "ASSET_ROLE_ICON" | "ASSET_ROLE_COVER_IMAGE";
}

function serializeAssetAssociation(data: any): AssetAssociation {
  return {
    ...data,
    asset: data["asset"] !== undefined ? serializeAsset(data["asset"]) : undefined,
  };
}

function deserializeAssetAssociation(data: any): AssetAssociation {
  return {
    ...data,
    asset: data["asset"] !== undefined ? deserializeAsset(data["asset"]) : undefined,
  };
}

/**
 * An assignment between a targetable inventory source and an inventory source
 * group.
 */
export interface AssignedInventorySource {
  /**
   * Output only. The unique ID of the assigned inventory source. The ID is
   * only unique within a given inventory source group. It may be reused in
   * other contexts.
   */
  readonly assignedInventorySourceId?: bigint;
  /**
   * Required. The ID of the inventory source entity being targeted.
   */
  inventorySourceId?: string;
  /**
   * Output only. The resource name of the assigned inventory source.
   */
  readonly name?: string;
}

/**
 * An assignment between a location list and a relevant targeting option.
 * Currently, geo region targeting options are the only supported option for
 * assignment.
 */
export interface AssignedLocation {
  /**
   * Output only. The unique ID of the assigned location. The ID is only unique
   * within a location list. It may be reused in other contexts.
   */
  readonly assignedLocationId?: bigint;
  /**
   * Output only. The resource name of the assigned location.
   */
  readonly name?: string;
  /**
   * Required. The ID of the targeting option assigned to the location list.
   * Must be of type TARGETING_TYPE_GEO_REGION.
   */
  targetingOptionId?: string;
}

/**
 * A single assigned targeting option, which defines the state of a targeting
 * option for an entity with targeting settings.
 */
export interface AssignedTargetingOption {
  /**
   * Age range details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_AGE_RANGE`.
   */
  ageRangeDetails?: AgeRangeAssignedTargetingOptionDetails;
  /**
   * App category details. This field will be populated when the targeting_type
   * is `TARGETING_TYPE_APP_CATEGORY`.
   */
  appCategoryDetails?: AppCategoryAssignedTargetingOptionDetails;
  /**
   * App details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_APP`.
   */
  appDetails?: AppAssignedTargetingOptionDetails;
  /**
   * Output only. The unique ID of the assigned targeting option. The ID is
   * only unique within a given resource and targeting type. It may be reused in
   * other contexts.
   */
  readonly assignedTargetingOptionId?: string;
  /**
   * Output only. An alias for the assigned_targeting_option_id. This value can
   * be used in place of `assignedTargetingOptionId` when retrieving or deleting
   * existing targeting. This field will only be supported for all assigned
   * targeting options of the following targeting types: *
   * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_DEVICE_TYPE` *
   * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` *
   * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` *
   * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_HOUSEHOLD_INCOME` *
   * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` * `TARGETING_TYPE_OMID` *
   * `TARGETING_TYPE_PARENTAL_STATUS` *
   * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` *
   * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY` This
   * field is also supported for line item assigned targeting options of the
   * following targeting types: * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` *
   * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`
   */
  readonly assignedTargetingOptionIdAlias?: string;
  /**
   * Audience targeting details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_AUDIENCE_GROUP`. You can only target one
   * audience group option per resource.
   */
  audienceGroupDetails?: AudienceGroupAssignedTargetingOptionDetails;
  /**
   * Audio content type details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_AUDIO_CONTENT_TYPE`.
   */
  audioContentTypeDetails?: AudioContentTypeAssignedTargetingOptionDetails;
  /**
   * Authorized seller status details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`. You can only
   * target one authorized seller status option per resource. If a resource
   * doesn't have an authorized seller status option, all authorized sellers
   * indicated as DIRECT or RESELLER in the ads.txt file are targeted by
   * default.
   */
  authorizedSellerStatusDetails?: AuthorizedSellerStatusAssignedTargetingOptionDetails;
  /**
   * Browser details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_BROWSER`.
   */
  browserDetails?: BrowserAssignedTargetingOptionDetails;
  /**
   * Business chain details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`.
   */
  businessChainDetails?: BusinessChainAssignedTargetingOptionDetails;
  /**
   * Carrier and ISP details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`.
   */
  carrierAndIspDetails?: CarrierAndIspAssignedTargetingOptionDetails;
  /**
   * Category details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_CATEGORY`. Targeting a category will also target its
   * subcategories. If a category is excluded from targeting and a subcategory
   * is included, the exclusion will take precedence.
   */
  categoryDetails?: CategoryAssignedTargetingOptionDetails;
  /**
   * Channel details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_CHANNEL`.
   */
  channelDetails?: ChannelAssignedTargetingOptionDetails;
  /**
   * Content duration details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_CONTENT_DURATION`.
   */
  contentDurationDetails?: ContentDurationAssignedTargetingOptionDetails;
  /**
   * Content genre details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_CONTENT_GENRE`.
   */
  contentGenreDetails?: ContentGenreAssignedTargetingOptionDetails;
  /**
   * Content instream position details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.
   */
  contentInstreamPositionDetails?: ContentInstreamPositionAssignedTargetingOptionDetails;
  /**
   * Content outstream position details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.
   */
  contentOutstreamPositionDetails?: ContentOutstreamPositionAssignedTargetingOptionDetails;
  /**
   * Content duration details. This field will be populated when the
   * TargetingType is `TARGETING_TYPE_CONTENT_STREAM_TYPE`.
   */
  contentStreamTypeDetails?: ContentStreamTypeAssignedTargetingOptionDetails;
  /**
   * Day and time details. This field will be populated when the targeting_type
   * is `TARGETING_TYPE_DAY_AND_TIME`.
   */
  dayAndTimeDetails?: DayAndTimeAssignedTargetingOptionDetails;
  /**
   * Device make and model details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
   */
  deviceMakeModelDetails?: DeviceMakeModelAssignedTargetingOptionDetails;
  /**
   * Device Type details. This field will be populated when the targeting_type
   * is `TARGETING_TYPE_DEVICE_TYPE`.
   */
  deviceTypeDetails?: DeviceTypeAssignedTargetingOptionDetails;
  /**
   * Digital content label details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`. Digital
   * content labels are targeting exclusions. Advertiser level digital content
   * label exclusions, if set, are always applied in serving (even though they
   * aren't visible in resource settings). Resource settings can exclude content
   * labels in addition to advertiser exclusions, but can't override them. A
   * line item won't serve if all the digital content labels are excluded.
   */
  digitalContentLabelExclusionDetails?: DigitalContentLabelAssignedTargetingOptionDetails;
  /**
   * Environment details. This field will be populated when the targeting_type
   * is `TARGETING_TYPE_ENVIRONMENT`.
   */
  environmentDetails?: EnvironmentAssignedTargetingOptionDetails;
  /**
   * Exchange details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_EXCHANGE`.
   */
  exchangeDetails?: ExchangeAssignedTargetingOptionDetails;
  /**
   * Gender details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_GENDER`.
   */
  genderDetails?: GenderAssignedTargetingOptionDetails;
  /**
   * Geographic region details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_GEO_REGION`.
   */
  geoRegionDetails?: GeoRegionAssignedTargetingOptionDetails;
  /**
   * Household income details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`.
   */
  householdIncomeDetails?: HouseholdIncomeAssignedTargetingOptionDetails;
  /**
   * Output only. The inheritance status of the assigned targeting option.
   */
  readonly inheritance?:  | "INHERITANCE_UNSPECIFIED" | "NOT_INHERITED" | "INHERITED_FROM_PARTNER" | "INHERITED_FROM_ADVERTISER";
  /**
   * Inventory source details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE`.
   */
  inventorySourceDetails?: InventorySourceAssignedTargetingOptionDetails;
  /**
   * Inventory source group details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`.
   */
  inventorySourceGroupDetails?: InventorySourceGroupAssignedTargetingOptionDetails;
  /**
   * Keyword details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_KEYWORD`. A maximum of 5000 direct negative keywords can be
   * assigned to a resource. No limit on number of positive keywords that can be
   * assigned.
   */
  keywordDetails?: KeywordAssignedTargetingOptionDetails;
  /**
   * Language details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_LANGUAGE`.
   */
  languageDetails?: LanguageAssignedTargetingOptionDetails;
  /**
   * Output only. The resource name for this assigned targeting option.
   */
  readonly name?: string;
  /**
   * Native content position details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_NATIVE_CONTENT_POSITION`.
   */
  nativeContentPositionDetails?: NativeContentPositionAssignedTargetingOptionDetails;
  /**
   * Keyword details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`. A maximum of 4 negative keyword
   * lists can be assigned to a resource.
   */
  negativeKeywordListDetails?: NegativeKeywordListAssignedTargetingOptionDetails;
  /**
   * Open Measurement enabled inventory details. This field will be populated
   * when the targeting_type is `TARGETING_TYPE_OMID`.
   */
  omidDetails?: OmidAssignedTargetingOptionDetails;
  /**
   * On screen position details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.
   */
  onScreenPositionDetails?: OnScreenPositionAssignedTargetingOptionDetails;
  /**
   * Operating system details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.
   */
  operatingSystemDetails?: OperatingSystemAssignedTargetingOptionDetails;
  /**
   * Parental status details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_PARENTAL_STATUS`.
   */
  parentalStatusDetails?: ParentalStatusAssignedTargetingOptionDetails;
  /**
   * POI details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_POI`.
   */
  poiDetails?: PoiAssignedTargetingOptionDetails;
  /**
   * Proximity location list details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`.
   */
  proximityLocationListDetails?: ProximityLocationListAssignedTargetingOptionDetails;
  /**
   * Regional location list details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_REGIONAL_LOCATION_LIST`.
   */
  regionalLocationListDetails?: RegionalLocationListAssignedTargetingOptionDetails;
  /**
   * Sensitive category details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`. Sensitive
   * categories are targeting exclusions. Advertiser level sensitive category
   * exclusions, if set, are always applied in serving (even though they aren't
   * visible in resource settings). Resource settings can exclude sensitive
   * categories in addition to advertiser exclusions, but can't override them.
   */
  sensitiveCategoryExclusionDetails?: SensitiveCategoryAssignedTargetingOptionDetails;
  /**
   * Session position details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_SESSION_POSITION`.
   */
  sessionPositionDetails?: SessionPositionAssignedTargetingOptionDetails;
  /**
   * Sub-exchange details. This field will be populated when the targeting_type
   * is `TARGETING_TYPE_SUB_EXCHANGE`.
   */
  subExchangeDetails?: SubExchangeAssignedTargetingOptionDetails;
  /**
   * Output only. Identifies the type of this assigned targeting option.
   */
  readonly targetingType?:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION";
  /**
   * Third party verification details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`.
   */
  thirdPartyVerifierDetails?: ThirdPartyVerifierAssignedTargetingOptionDetails;
  /**
   * URL details. This field will be populated when the targeting_type is
   * `TARGETING_TYPE_URL`.
   */
  urlDetails?: UrlAssignedTargetingOptionDetails;
  /**
   * User rewarded content details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.
   */
  userRewardedContentDetails?: UserRewardedContentAssignedTargetingOptionDetails;
  /**
   * Video player size details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`.
   */
  videoPlayerSizeDetails?: VideoPlayerSizeAssignedTargetingOptionDetails;
  /**
   * Viewability details. This field will be populated when the targeting_type
   * is `TARGETING_TYPE_VIEWABILITY`. You can only target one viewability option
   * per resource.
   */
  viewabilityDetails?: ViewabilityAssignedTargetingOptionDetails;
  /**
   * YouTube channel details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_YOUTUBE_CHANNEL`.
   */
  youtubeChannelDetails?: YoutubeChannelAssignedTargetingOptionDetails;
  /**
   * YouTube video details. This field will be populated when the
   * targeting_type is `TARGETING_TYPE_YOUTUBE_VIDEO`.
   */
  youtubeVideoDetails?: YoutubeVideoAssignedTargetingOptionDetails;
}

function serializeAssignedTargetingOption(data: any): AssignedTargetingOption {
  return {
    ...data,
    audienceGroupDetails: data["audienceGroupDetails"] !== undefined ? serializeAudienceGroupAssignedTargetingOptionDetails(data["audienceGroupDetails"]) : undefined,
    channelDetails: data["channelDetails"] !== undefined ? serializeChannelAssignedTargetingOptionDetails(data["channelDetails"]) : undefined,
    inventorySourceDetails: data["inventorySourceDetails"] !== undefined ? serializeInventorySourceAssignedTargetingOptionDetails(data["inventorySourceDetails"]) : undefined,
    inventorySourceGroupDetails: data["inventorySourceGroupDetails"] !== undefined ? serializeInventorySourceGroupAssignedTargetingOptionDetails(data["inventorySourceGroupDetails"]) : undefined,
    negativeKeywordListDetails: data["negativeKeywordListDetails"] !== undefined ? serializeNegativeKeywordListAssignedTargetingOptionDetails(data["negativeKeywordListDetails"]) : undefined,
    proximityLocationListDetails: data["proximityLocationListDetails"] !== undefined ? serializeProximityLocationListAssignedTargetingOptionDetails(data["proximityLocationListDetails"]) : undefined,
    regionalLocationListDetails: data["regionalLocationListDetails"] !== undefined ? serializeRegionalLocationListAssignedTargetingOptionDetails(data["regionalLocationListDetails"]) : undefined,
    thirdPartyVerifierDetails: data["thirdPartyVerifierDetails"] !== undefined ? serializeThirdPartyVerifierAssignedTargetingOptionDetails(data["thirdPartyVerifierDetails"]) : undefined,
  };
}

function deserializeAssignedTargetingOption(data: any): AssignedTargetingOption {
  return {
    ...data,
    audienceGroupDetails: data["audienceGroupDetails"] !== undefined ? deserializeAudienceGroupAssignedTargetingOptionDetails(data["audienceGroupDetails"]) : undefined,
    channelDetails: data["channelDetails"] !== undefined ? deserializeChannelAssignedTargetingOptionDetails(data["channelDetails"]) : undefined,
    inventorySourceDetails: data["inventorySourceDetails"] !== undefined ? deserializeInventorySourceAssignedTargetingOptionDetails(data["inventorySourceDetails"]) : undefined,
    inventorySourceGroupDetails: data["inventorySourceGroupDetails"] !== undefined ? deserializeInventorySourceGroupAssignedTargetingOptionDetails(data["inventorySourceGroupDetails"]) : undefined,
    negativeKeywordListDetails: data["negativeKeywordListDetails"] !== undefined ? deserializeNegativeKeywordListAssignedTargetingOptionDetails(data["negativeKeywordListDetails"]) : undefined,
    proximityLocationListDetails: data["proximityLocationListDetails"] !== undefined ? deserializeProximityLocationListAssignedTargetingOptionDetails(data["proximityLocationListDetails"]) : undefined,
    regionalLocationListDetails: data["regionalLocationListDetails"] !== undefined ? deserializeRegionalLocationListAssignedTargetingOptionDetails(data["regionalLocationListDetails"]) : undefined,
    thirdPartyVerifierDetails: data["thirdPartyVerifierDetails"] !== undefined ? deserializeThirdPartyVerifierAssignedTargetingOptionDetails(data["thirdPartyVerifierDetails"]) : undefined,
  };
}

/**
 * A single assigned user role, which defines a user's authorized interaction
 * with a specified partner or advertiser.
 */
export interface AssignedUserRole {
  /**
   * The ID of the advertiser that the assigend user role applies to.
   */
  advertiserId?: bigint;
  /**
   * Output only. The ID of the assigned user role.
   */
  readonly assignedUserRoleId?: string;
  /**
   * The ID of the partner that the assigned user role applies to.
   */
  partnerId?: bigint;
  /**
   * Required. The user role to assign to a user for the entity.
   */
  userRole?:  | "USER_ROLE_UNSPECIFIED" | "ADMIN" | "ADMIN_PARTNER_CLIENT" | "STANDARD" | "STANDARD_PLANNER" | "STANDARD_PLANNER_LIMITED" | "STANDARD_PARTNER_CLIENT" | "READ_ONLY" | "REPORTING_ONLY" | "LIMITED_REPORTING_ONLY" | "CREATIVE" | "CREATIVE_ADMIN";
}

function serializeAssignedUserRole(data: any): AssignedUserRole {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeAssignedUserRole(data: any): AssignedUserRole {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Assigned audience group targeting option details. This will be populated in
 * the details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_AUDIENCE_GROUP`. The relation between each group is UNION,
 * except for excluded_first_and_third_party_audience_group and
 * excluded_google_audience_group, of which COMPLEMENT is used as an
 * INTERSECTION with other groups.
 */
export interface AudienceGroupAssignedTargetingOptionDetails {
  /**
   * The first and third party audience ids and recencies of the excluded first
   * and third party audience group. Used for negative targeting. The COMPLEMENT
   * of the UNION of this group and other excluded audience groups is used as an
   * INTERSECTION to any positive audience targeting. All items are logically
   * ‘OR’ of each other.
   */
  excludedFirstAndThirdPartyAudienceGroup?: FirstAndThirdPartyAudienceGroup;
  /**
   * The Google audience ids of the excluded Google audience group. Used for
   * negative targeting. The COMPLEMENT of the UNION of this group and other
   * excluded audience groups is used as an INTERSECTION to any positive
   * audience targeting. Only contains Affinity, In-market and Installed-apps
   * type Google audiences. All items are logically ‘OR’ of each other.
   */
  excludedGoogleAudienceGroup?: GoogleAudienceGroup;
  /**
   * The combined audience ids of the included combined audience group.
   * Contains combined audience ids only.
   */
  includedCombinedAudienceGroup?: CombinedAudienceGroup;
  /**
   * The custom list ids of the included custom list group. Contains custom
   * list ids only.
   */
  includedCustomListGroup?: CustomListGroup;
  /**
   * The first and third party audience ids and recencies of included first and
   * third party audience groups. Each first and third party audience group
   * contains first and third party audience ids only. The relation between each
   * first and third party audience group is INTERSECTION, and the result is
   * UNION'ed with other audience groups. Repeated groups with same settings
   * will be ignored.
   */
  includedFirstAndThirdPartyAudienceGroups?: FirstAndThirdPartyAudienceGroup[];
  /**
   * The Google audience ids of the included Google audience group. Contains
   * Google audience ids only.
   */
  includedGoogleAudienceGroup?: GoogleAudienceGroup;
}

function serializeAudienceGroupAssignedTargetingOptionDetails(data: any): AudienceGroupAssignedTargetingOptionDetails {
  return {
    ...data,
    excludedFirstAndThirdPartyAudienceGroup: data["excludedFirstAndThirdPartyAudienceGroup"] !== undefined ? serializeFirstAndThirdPartyAudienceGroup(data["excludedFirstAndThirdPartyAudienceGroup"]) : undefined,
    excludedGoogleAudienceGroup: data["excludedGoogleAudienceGroup"] !== undefined ? serializeGoogleAudienceGroup(data["excludedGoogleAudienceGroup"]) : undefined,
    includedCombinedAudienceGroup: data["includedCombinedAudienceGroup"] !== undefined ? serializeCombinedAudienceGroup(data["includedCombinedAudienceGroup"]) : undefined,
    includedCustomListGroup: data["includedCustomListGroup"] !== undefined ? serializeCustomListGroup(data["includedCustomListGroup"]) : undefined,
    includedFirstAndThirdPartyAudienceGroups: data["includedFirstAndThirdPartyAudienceGroups"] !== undefined ? data["includedFirstAndThirdPartyAudienceGroups"].map((item: any) => (serializeFirstAndThirdPartyAudienceGroup(item))) : undefined,
    includedGoogleAudienceGroup: data["includedGoogleAudienceGroup"] !== undefined ? serializeGoogleAudienceGroup(data["includedGoogleAudienceGroup"]) : undefined,
  };
}

function deserializeAudienceGroupAssignedTargetingOptionDetails(data: any): AudienceGroupAssignedTargetingOptionDetails {
  return {
    ...data,
    excludedFirstAndThirdPartyAudienceGroup: data["excludedFirstAndThirdPartyAudienceGroup"] !== undefined ? deserializeFirstAndThirdPartyAudienceGroup(data["excludedFirstAndThirdPartyAudienceGroup"]) : undefined,
    excludedGoogleAudienceGroup: data["excludedGoogleAudienceGroup"] !== undefined ? deserializeGoogleAudienceGroup(data["excludedGoogleAudienceGroup"]) : undefined,
    includedCombinedAudienceGroup: data["includedCombinedAudienceGroup"] !== undefined ? deserializeCombinedAudienceGroup(data["includedCombinedAudienceGroup"]) : undefined,
    includedCustomListGroup: data["includedCustomListGroup"] !== undefined ? deserializeCustomListGroup(data["includedCustomListGroup"]) : undefined,
    includedFirstAndThirdPartyAudienceGroups: data["includedFirstAndThirdPartyAudienceGroups"] !== undefined ? data["includedFirstAndThirdPartyAudienceGroups"].map((item: any) => (deserializeFirstAndThirdPartyAudienceGroup(item))) : undefined,
    includedGoogleAudienceGroup: data["includedGoogleAudienceGroup"] !== undefined ? deserializeGoogleAudienceGroup(data["includedGoogleAudienceGroup"]) : undefined,
  };
}

/**
 * Details for an audio ad.
 */
export interface AudioAd {
  /**
   * The webpage address that appears with the ad.
   */
  displayUrl?: string;
  /**
   * The URL address of the webpage that people reach after they click the ad.
   */
  finalUrl?: string;
  /**
   * The URL address loaded in the background for tracking purposes.
   */
  trackingUrl?: string;
  /**
   * The YouTube video of the ad.
   */
  video?: YoutubeVideoDetails;
}

/**
 * Details for audio content type assigned targeting option. This will be
 * populated in the audio_content_type_details field when targeting_type is
 * `TARGETING_TYPE_AUDIO_CONTENT_TYPE`. Explicitly targeting all options is not
 * supported. Remove all audio content type targeting options to achieve this
 * effect.
 */
export interface AudioContentTypeAssignedTargetingOptionDetails {
  /**
   * The audio content type. Output only in v1. Required in v2.
   */
  audioContentType?:  | "AUDIO_CONTENT_TYPE_UNSPECIFIED" | "AUDIO_CONTENT_TYPE_UNKNOWN" | "AUDIO_CONTENT_TYPE_MUSIC" | "AUDIO_CONTENT_TYPE_BROADCAST" | "AUDIO_CONTENT_TYPE_PODCAST";
}

/**
 * Represents a targetable audio content type. This will be populated in the
 * audio_content_type_details field when targeting_type is
 * `TARGETING_TYPE_AUDIO_CONTENT_TYPE`.
 */
export interface AudioContentTypeTargetingOptionDetails {
  /**
   * Output only. The audio content type.
   */
  readonly audioContentType?:  | "AUDIO_CONTENT_TYPE_UNSPECIFIED" | "AUDIO_CONTENT_TYPE_UNKNOWN" | "AUDIO_CONTENT_TYPE_MUSIC" | "AUDIO_CONTENT_TYPE_BROADCAST" | "AUDIO_CONTENT_TYPE_PODCAST";
}

/**
 * The length an audio or a video has been played.
 */
export interface AudioVideoOffset {
  /**
   * The offset in percentage of the audio or video duration.
   */
  percentage?: bigint;
  /**
   * The offset in seconds from the start of the audio or video.
   */
  seconds?: bigint;
}

function serializeAudioVideoOffset(data: any): AudioVideoOffset {
  return {
    ...data,
    percentage: data["percentage"] !== undefined ? String(data["percentage"]) : undefined,
    seconds: data["seconds"] !== undefined ? String(data["seconds"]) : undefined,
  };
}

function deserializeAudioVideoOffset(data: any): AudioVideoOffset {
  return {
    ...data,
    percentage: data["percentage"] !== undefined ? BigInt(data["percentage"]) : undefined,
    seconds: data["seconds"] !== undefined ? BigInt(data["seconds"]) : undefined,
  };
}

/**
 * Response message for AdvertiserService.AuditAdvertiser.
 */
export interface AuditAdvertiserResponse {
  /**
   * The number of individual targeting options from the following targeting
   * types that are assigned to a line item under this advertiser. These
   * individual targeting options count towards the limit of 4500000 ad group
   * targeting options per advertiser. Qualifying Targeting types: * Channels,
   * URLs, apps, and collections * Demographic * Google Audiences, including
   * Affinity, Custom Affinity, and In-market audiences * Inventory source *
   * Keyword * Mobile app category * User lists * Video targeting * Viewability
   */
  adGroupCriteriaCount?: bigint;
  /**
   * The number of individual targeting options from the following targeting
   * types that are assigned to a line item under this advertiser. These
   * individual targeting options count towards the limit of 900000 campaign
   * targeting options per advertiser. Qualifying Targeting types: * Position *
   * Browser * Connection speed * Day and time * Device and operating system *
   * Digital content label * Sensitive categories * Environment * Geography,
   * including business chains and proximity * ISP * Language * Third-party
   * verification
   */
  campaignCriteriaCount?: bigint;
  /**
   * The number of channels created under this advertiser. These channels count
   * towards the limit of 1000 channels per advertiser.
   */
  channelsCount?: bigint;
  /**
   * The number of negative keyword lists created under this advertiser. These
   * negative keyword lists count towards the limit of 20 negative keyword lists
   * per advertiser.
   */
  negativeKeywordListsCount?: bigint;
  /**
   * The number of negatively targeted channels created under this advertiser.
   * These negatively targeted channels count towards the limit of 5 negatively
   * targeted channels per advertiser.
   */
  negativelyTargetedChannelsCount?: bigint;
  /**
   * The number of ACTIVE and PAUSED campaigns under this advertiser. These
   * campaigns count towards the limit of 9999 campaigns per advertiser.
   */
  usedCampaignsCount?: bigint;
  /**
   * The number of ACTIVE, PAUSED and DRAFT insertion orders under this
   * advertiser. These insertion orders count towards the limit of 9999
   * insertion orders per advertiser.
   */
  usedInsertionOrdersCount?: bigint;
  /**
   * The number of ACTIVE, PAUSED, and DRAFT line items under this advertiser.
   * These line items count towards the limit of 9999 line items per advertiser.
   */
  usedLineItemsCount?: bigint;
}

function serializeAuditAdvertiserResponse(data: any): AuditAdvertiserResponse {
  return {
    ...data,
    adGroupCriteriaCount: data["adGroupCriteriaCount"] !== undefined ? String(data["adGroupCriteriaCount"]) : undefined,
    campaignCriteriaCount: data["campaignCriteriaCount"] !== undefined ? String(data["campaignCriteriaCount"]) : undefined,
    channelsCount: data["channelsCount"] !== undefined ? String(data["channelsCount"]) : undefined,
    negativeKeywordListsCount: data["negativeKeywordListsCount"] !== undefined ? String(data["negativeKeywordListsCount"]) : undefined,
    negativelyTargetedChannelsCount: data["negativelyTargetedChannelsCount"] !== undefined ? String(data["negativelyTargetedChannelsCount"]) : undefined,
    usedCampaignsCount: data["usedCampaignsCount"] !== undefined ? String(data["usedCampaignsCount"]) : undefined,
    usedInsertionOrdersCount: data["usedInsertionOrdersCount"] !== undefined ? String(data["usedInsertionOrdersCount"]) : undefined,
    usedLineItemsCount: data["usedLineItemsCount"] !== undefined ? String(data["usedLineItemsCount"]) : undefined,
  };
}

function deserializeAuditAdvertiserResponse(data: any): AuditAdvertiserResponse {
  return {
    ...data,
    adGroupCriteriaCount: data["adGroupCriteriaCount"] !== undefined ? BigInt(data["adGroupCriteriaCount"]) : undefined,
    campaignCriteriaCount: data["campaignCriteriaCount"] !== undefined ? BigInt(data["campaignCriteriaCount"]) : undefined,
    channelsCount: data["channelsCount"] !== undefined ? BigInt(data["channelsCount"]) : undefined,
    negativeKeywordListsCount: data["negativeKeywordListsCount"] !== undefined ? BigInt(data["negativeKeywordListsCount"]) : undefined,
    negativelyTargetedChannelsCount: data["negativelyTargetedChannelsCount"] !== undefined ? BigInt(data["negativelyTargetedChannelsCount"]) : undefined,
    usedCampaignsCount: data["usedCampaignsCount"] !== undefined ? BigInt(data["usedCampaignsCount"]) : undefined,
    usedInsertionOrdersCount: data["usedInsertionOrdersCount"] !== undefined ? BigInt(data["usedInsertionOrdersCount"]) : undefined,
    usedLineItemsCount: data["usedLineItemsCount"] !== undefined ? BigInt(data["usedLineItemsCount"]) : undefined,
  };
}

/**
 * Represents an assigned authorized seller status. This will be populated in
 * the details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.
 */
export interface AuthorizedSellerStatusAssignedTargetingOptionDetails {
  /**
   * Output only. The authorized seller status to target.
   */
  readonly authorizedSellerStatus?:  | "AUTHORIZED_SELLER_STATUS_UNSPECIFIED" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS";
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable authorized seller status. This will be populated in
 * the authorized_seller_status_details field when targeting_type is
 * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.
 */
export interface AuthorizedSellerStatusTargetingOptionDetails {
  /**
   * Output only. The authorized seller status.
   */
  readonly authorizedSellerStatus?:  | "AUTHORIZED_SELLER_STATUS_UNSPECIFIED" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY" | "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS";
}

/**
 * Settings that control the bid strategy. Bid strategy determines the bid
 * price.
 */
export interface BiddingStrategy {
  /**
   * A strategy that uses a fixed bid price.
   */
  fixedBid?: FixedBidStrategy;
  /**
   * A strategy that automatically adjusts the bid to optimize to your
   * performance goal while spending the full budget. At insertion order level,
   * the markup_type of line items cannot be set to
   * `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`. In addition, when
   * performance_goal_type is one of: *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` , the line_item_type of
   * the insertion order line items must be either: *
   * `LINE_ITEM_TYPE_DISPLAY_DEFAULT` * `LINE_ITEM_TYPE_VIDEO_DEFAULT` , and
   * when performance_goal_type is either: *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN` the line_item_type of the
   * insertion order line items must be `LINE_ITEM_TYPE_VIDEO_DEFAULT`.
   */
  maximizeSpendAutoBid?: MaximizeSpendBidStrategy;
  /**
   * A strategy that automatically adjusts the bid to meet or beat a specified
   * performance goal. It is to be used only for a line item entity.
   */
  performanceGoalAutoBid?: PerformanceGoalBidStrategy;
}

function serializeBiddingStrategy(data: any): BiddingStrategy {
  return {
    ...data,
    fixedBid: data["fixedBid"] !== undefined ? serializeFixedBidStrategy(data["fixedBid"]) : undefined,
    maximizeSpendAutoBid: data["maximizeSpendAutoBid"] !== undefined ? serializeMaximizeSpendBidStrategy(data["maximizeSpendAutoBid"]) : undefined,
    performanceGoalAutoBid: data["performanceGoalAutoBid"] !== undefined ? serializePerformanceGoalBidStrategy(data["performanceGoalAutoBid"]) : undefined,
  };
}

function deserializeBiddingStrategy(data: any): BiddingStrategy {
  return {
    ...data,
    fixedBid: data["fixedBid"] !== undefined ? deserializeFixedBidStrategy(data["fixedBid"]) : undefined,
    maximizeSpendAutoBid: data["maximizeSpendAutoBid"] !== undefined ? deserializeMaximizeSpendBidStrategy(data["maximizeSpendAutoBid"]) : undefined,
    performanceGoalAutoBid: data["performanceGoalAutoBid"] !== undefined ? deserializePerformanceGoalBidStrategy(data["performanceGoalAutoBid"]) : undefined,
  };
}

/**
 * Details for assigned browser targeting option. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_BROWSER`.
 */
export interface BrowserAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the browser.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted. All assigned
   * browser targeting options on the same resource must have the same value for
   * this field.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_BROWSER`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable browser. This will be populated in the
 * browser_details field when targeting_type is `TARGETING_TYPE_BROWSER`.
 */
export interface BrowserTargetingOptionDetails {
  /**
   * Output only. The display name of the browser.
   */
  readonly displayName?: string;
}

/**
 * Summarized information of an individual campaign budget.
 */
export interface BudgetSummary {
  /**
   * Corresponds to the external_budget_id of a campaign budget. If the value
   * is not set in the campaign budget, this field will be empty.
   */
  externalBudgetId?: string;
  /**
   * The sum of charges made under this budget before taxes, in micros of the
   * invoice's currency. For example, if currency_code is `USD`, then 1000000
   * represents one US dollar.
   */
  preTaxAmountMicros?: bigint;
  /**
   * Relevant client, product, and estimate codes from the Mediaocean Prisma
   * tool. Only applicable for campaign budgets with an external_budget_source
   * of EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN.
   */
  prismaCpeCode?: PrismaCpeCode;
  /**
   * The amount of tax applied to charges under this budget, in micros of the
   * invoice's currency. For example, if currency_code is `USD`, then 1000000
   * represents one US dollar.
   */
  taxAmountMicros?: bigint;
  /**
   * The total sum of charges made under this budget, including tax, in micros
   * of the invoice's currency. For example, if currency_code is `USD`, then
   * 1000000 represents one US dollar.
   */
  totalAmountMicros?: bigint;
}

function serializeBudgetSummary(data: any): BudgetSummary {
  return {
    ...data,
    preTaxAmountMicros: data["preTaxAmountMicros"] !== undefined ? String(data["preTaxAmountMicros"]) : undefined,
    taxAmountMicros: data["taxAmountMicros"] !== undefined ? String(data["taxAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? String(data["totalAmountMicros"]) : undefined,
  };
}

function deserializeBudgetSummary(data: any): BudgetSummary {
  return {
    ...data,
    preTaxAmountMicros: data["preTaxAmountMicros"] !== undefined ? BigInt(data["preTaxAmountMicros"]) : undefined,
    taxAmountMicros: data["taxAmountMicros"] !== undefined ? BigInt(data["taxAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? BigInt(data["totalAmountMicros"]) : undefined,
  };
}

/**
 * Request message for BulkEditAdvertiserAssignedTargetingOptions.
 */
export interface BulkEditAdvertiserAssignedTargetingOptionsRequest {
  /**
   * The assigned targeting options to create in batch, specified as a list of
   * `CreateAssignedTargetingOptionsRequest`. Supported targeting types: *
   * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`
   * * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`
   */
  createRequests?: CreateAssignedTargetingOptionsRequest[];
  /**
   * The assigned targeting options to delete in batch, specified as a list of
   * `DeleteAssignedTargetingOptionsRequest`. Supported targeting types: *
   * `TARGETING_TYPE_CHANNEL` * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`
   * * `TARGETING_TYPE_OMID` * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`
   */
  deleteRequests?: DeleteAssignedTargetingOptionsRequest[];
}

function serializeBulkEditAdvertiserAssignedTargetingOptionsRequest(data: any): BulkEditAdvertiserAssignedTargetingOptionsRequest {
  return {
    ...data,
    createRequests: data["createRequests"] !== undefined ? data["createRequests"].map((item: any) => (serializeCreateAssignedTargetingOptionsRequest(item))) : undefined,
  };
}

function deserializeBulkEditAdvertiserAssignedTargetingOptionsRequest(data: any): BulkEditAdvertiserAssignedTargetingOptionsRequest {
  return {
    ...data,
    createRequests: data["createRequests"] !== undefined ? data["createRequests"].map((item: any) => (deserializeCreateAssignedTargetingOptionsRequest(item))) : undefined,
  };
}

export interface BulkEditAdvertiserAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options that have been successfully
   * created. This list will be absent if empty.
   */
  createdAssignedTargetingOptions?: AssignedTargetingOption[];
}

function serializeBulkEditAdvertiserAssignedTargetingOptionsResponse(data: any): BulkEditAdvertiserAssignedTargetingOptionsResponse {
  return {
    ...data,
    createdAssignedTargetingOptions: data["createdAssignedTargetingOptions"] !== undefined ? data["createdAssignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeBulkEditAdvertiserAssignedTargetingOptionsResponse(data: any): BulkEditAdvertiserAssignedTargetingOptionsResponse {
  return {
    ...data,
    createdAssignedTargetingOptions: data["createdAssignedTargetingOptions"] !== undefined ? data["createdAssignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

/**
 * Request message for AssignedInventorySourceService.BulkEdit.
 */
export interface BulkEditAssignedInventorySourcesRequest {
  /**
   * The ID of the advertiser that owns the parent inventory source group. The
   * parent partner does not have access to these assigned inventory sources.
   */
  advertiserId?: bigint;
  /**
   * The assigned inventory sources to create in bulk, specified as a list of
   * AssignedInventorySources.
   */
  createdAssignedInventorySources?: AssignedInventorySource[];
  /**
   * The IDs of the assigned inventory sources to delete in bulk, specified as
   * a list of assigned_inventory_source_ids.
   */
  deletedAssignedInventorySources?: bigint[];
  /**
   * The ID of the partner that owns the inventory source group. Only this
   * partner has write access to these assigned inventory sources.
   */
  partnerId?: bigint;
}

function serializeBulkEditAssignedInventorySourcesRequest(data: any): BulkEditAssignedInventorySourcesRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    deletedAssignedInventorySources: data["deletedAssignedInventorySources"] !== undefined ? data["deletedAssignedInventorySources"].map((item: any) => (String(item))) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeBulkEditAssignedInventorySourcesRequest(data: any): BulkEditAssignedInventorySourcesRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    deletedAssignedInventorySources: data["deletedAssignedInventorySources"] !== undefined ? data["deletedAssignedInventorySources"].map((item: any) => (BigInt(item))) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Response message for AssignedInventorySourceService.BulkEdit.
 */
export interface BulkEditAssignedInventorySourcesResponse {
  /**
   * The list of assigned inventory sources that have been successfully
   * created. This list will be absent if empty.
   */
  assignedInventorySources?: AssignedInventorySource[];
}

/**
 * Request message for AssignedLocationService.BulkEditAssignedLocations.
 */
export interface BulkEditAssignedLocationsRequest {
  /**
   * The assigned locations to create in bulk, specified as a list of
   * AssignedLocations.
   */
  createdAssignedLocations?: AssignedLocation[];
  /**
   * The IDs of the assigned locations to delete in bulk, specified as a list
   * of assigned_location_ids.
   */
  deletedAssignedLocations?: bigint[];
}

function serializeBulkEditAssignedLocationsRequest(data: any): BulkEditAssignedLocationsRequest {
  return {
    ...data,
    deletedAssignedLocations: data["deletedAssignedLocations"] !== undefined ? data["deletedAssignedLocations"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeBulkEditAssignedLocationsRequest(data: any): BulkEditAssignedLocationsRequest {
  return {
    ...data,
    deletedAssignedLocations: data["deletedAssignedLocations"] !== undefined ? data["deletedAssignedLocations"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Response message for AssignedLocationService.BulkEditAssignedLocations.
 */
export interface BulkEditAssignedLocationsResponse {
  /**
   * The list of assigned locations that have been successfully created. This
   * list will be absent if empty.
   */
  assignedLocations?: AssignedLocation[];
}

/**
 * Request message for BulkEditLineItemsAssignedTargetingOptions.
 */
export interface BulkEditAssignedTargetingOptionsRequest {
  /**
   * The assigned targeting options to create in batch, specified as a list of
   * CreateAssignedTargetingOptionsRequest. Supported targeting types include: *
   * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` *
   * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` *
   * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` *
   * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` *
   * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` *
   * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` *
   * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` *
   * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` *
   * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` *
   * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` *
   * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` *
   * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` *
   * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` *
   * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` *
   * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` *
   * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` *
   * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` *
   * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` *
   * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` *
   * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` *
   * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` *
   * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` *
   * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` *
   * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` *
   * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` *
   * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY`
   */
  createRequests?: CreateAssignedTargetingOptionsRequest[];
  /**
   * The assigned targeting options to delete in batch, specified as a list of
   * DeleteAssignedTargetingOptionsRequest. Supported targeting types include: *
   * `TARGETING_TYPE_AGE_RANGE` * `TARGETING_TYPE_APP` *
   * `TARGETING_TYPE_APP_CATEGORY` * `TARGETING_TYPE_AUDIENCE_GROUP` *
   * `TARGETING_TYPE_AUDIO_CONTENT_TYPE` *
   * `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` * `TARGETING_TYPE_BROWSER` *
   * `TARGETING_TYPE_BUSINESS_CHAIN` * `TARGETING_TYPE_CARRIER_AND_ISP` *
   * `TARGETING_TYPE_CATEGORY` * `TARGETING_TYPE_CHANNEL` *
   * `TARGETING_TYPE_CONTENT_DURATION` * `TARGETING_TYPE_CONTENT_GENRE` *
   * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION` *
   * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION` *
   * `TARGETING_TYPE_CONTENT_STREAM_TYPE` * `TARGETING_TYPE_DAY_AND_TIME` *
   * `TARGETING_TYPE_DEVICE_MAKE_MODEL` * `TARGETING_TYPE_DEVICE_TYPE` *
   * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION` *
   * `TARGETING_TYPE_ENVIRONMENT` * `TARGETING_TYPE_EXCHANGE` *
   * `TARGETING_TYPE_GENDER` * `TARGETING_TYPE_GEO_REGION` *
   * `TARGETING_TYPE_HOUSEHOLD_INCOME` * `TARGETING_TYPE_INVENTORY_SOURCE` *
   * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP` * `TARGETING_TYPE_KEYWORD` *
   * `TARGETING_TYPE_LANGUAGE` * `TARGETING_TYPE_NATIVE_CONTENT_POSITION` *
   * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST` * `TARGETING_TYPE_OMID` *
   * `TARGETING_TYPE_ON_SCREEN_POSITION` * `TARGETING_TYPE_OPERATING_SYSTEM` *
   * `TARGETING_TYPE_PARENTAL_STATUS` * `TARGETING_TYPE_POI` *
   * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST` *
   * `TARGETING_TYPE_REGIONAL_LOCATION_LIST` *
   * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION` *
   * `TARGETING_TYPE_SUB_EXCHANGE` * `TARGETING_TYPE_THIRD_PARTY_VERIFIER` *
   * `TARGETING_TYPE_URL` * `TARGETING_TYPE_USER_REWARDED_CONTENT` *
   * `TARGETING_TYPE_VIDEO_PLAYER_SIZE` * `TARGETING_TYPE_VIEWABILITY`
   */
  deleteRequests?: DeleteAssignedTargetingOptionsRequest[];
  /**
   * Required. The ID of the line items whose targeting is being updated.
   */
  lineItemIds?: bigint[];
}

function serializeBulkEditAssignedTargetingOptionsRequest(data: any): BulkEditAssignedTargetingOptionsRequest {
  return {
    ...data,
    createRequests: data["createRequests"] !== undefined ? data["createRequests"].map((item: any) => (serializeCreateAssignedTargetingOptionsRequest(item))) : undefined,
    lineItemIds: data["lineItemIds"] !== undefined ? data["lineItemIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeBulkEditAssignedTargetingOptionsRequest(data: any): BulkEditAssignedTargetingOptionsRequest {
  return {
    ...data,
    createRequests: data["createRequests"] !== undefined ? data["createRequests"].map((item: any) => (deserializeCreateAssignedTargetingOptionsRequest(item))) : undefined,
    lineItemIds: data["lineItemIds"] !== undefined ? data["lineItemIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface BulkEditAssignedTargetingOptionsResponse {
  /**
   * The error information for each line item that failed to update.
   */
  errors?: Status[];
  /**
   * Output only. The IDs of the line items which failed.
   */
  readonly failedLineItemIds?: bigint[];
  /**
   * Output only. The IDs of the line items which successfully updated.
   */
  readonly updatedLineItemIds?: bigint[];
}

/**
 * Request message for BulkEditAssignedUserRoles.
 */
export interface BulkEditAssignedUserRolesRequest {
  /**
   * The assigned user roles to create in batch, specified as a list of
   * AssignedUserRoles.
   */
  createdAssignedUserRoles?: AssignedUserRole[];
  /**
   * The assigned user roles to delete in batch, specified as a list of
   * assigned_user_role_ids. The format of assigned_user_role_id is
   * `entityType-entityid`, for example `partner-123`.
   */
  deletedAssignedUserRoles?: string[];
}

function serializeBulkEditAssignedUserRolesRequest(data: any): BulkEditAssignedUserRolesRequest {
  return {
    ...data,
    createdAssignedUserRoles: data["createdAssignedUserRoles"] !== undefined ? data["createdAssignedUserRoles"].map((item: any) => (serializeAssignedUserRole(item))) : undefined,
  };
}

function deserializeBulkEditAssignedUserRolesRequest(data: any): BulkEditAssignedUserRolesRequest {
  return {
    ...data,
    createdAssignedUserRoles: data["createdAssignedUserRoles"] !== undefined ? data["createdAssignedUserRoles"].map((item: any) => (deserializeAssignedUserRole(item))) : undefined,
  };
}

export interface BulkEditAssignedUserRolesResponse {
  /**
   * The list of assigned user roles that have been successfully created. This
   * list will be absent if empty.
   */
  createdAssignedUserRoles?: AssignedUserRole[];
}

function serializeBulkEditAssignedUserRolesResponse(data: any): BulkEditAssignedUserRolesResponse {
  return {
    ...data,
    createdAssignedUserRoles: data["createdAssignedUserRoles"] !== undefined ? data["createdAssignedUserRoles"].map((item: any) => (serializeAssignedUserRole(item))) : undefined,
  };
}

function deserializeBulkEditAssignedUserRolesResponse(data: any): BulkEditAssignedUserRolesResponse {
  return {
    ...data,
    createdAssignedUserRoles: data["createdAssignedUserRoles"] !== undefined ? data["createdAssignedUserRoles"].map((item: any) => (deserializeAssignedUserRole(item))) : undefined,
  };
}

/**
 * Request message for NegativeKeywordService.BulkEditNegativeKeywords.
 */
export interface BulkEditNegativeKeywordsRequest {
  /**
   * The negative keywords to create in batch, specified as a list of
   * NegativeKeywords.
   */
  createdNegativeKeywords?: NegativeKeyword[];
  /**
   * The negative keywords to delete in batch, specified as a list of
   * keyword_values.
   */
  deletedNegativeKeywords?: string[];
}

/**
 * Response message for NegativeKeywordService.BulkEditNegativeKeywords.
 */
export interface BulkEditNegativeKeywordsResponse {
  /**
   * The list of negative keywords that have been successfully created. This
   * list will be absent if empty.
   */
  negativeKeywords?: NegativeKeyword[];
}

/**
 * Request message for BulkEditPartnerAssignedTargetingOptions.
 */
export interface BulkEditPartnerAssignedTargetingOptionsRequest {
  /**
   * The assigned targeting options to create in batch, specified as a list of
   * `CreateAssignedTargetingOptionsRequest`. Supported targeting types: *
   * `TARGETING_TYPE_CHANNEL`
   */
  createRequests?: CreateAssignedTargetingOptionsRequest[];
  /**
   * The assigned targeting options to delete in batch, specified as a list of
   * `DeleteAssignedTargetingOptionsRequest`. Supported targeting types: *
   * `TARGETING_TYPE_CHANNEL`
   */
  deleteRequests?: DeleteAssignedTargetingOptionsRequest[];
}

function serializeBulkEditPartnerAssignedTargetingOptionsRequest(data: any): BulkEditPartnerAssignedTargetingOptionsRequest {
  return {
    ...data,
    createRequests: data["createRequests"] !== undefined ? data["createRequests"].map((item: any) => (serializeCreateAssignedTargetingOptionsRequest(item))) : undefined,
  };
}

function deserializeBulkEditPartnerAssignedTargetingOptionsRequest(data: any): BulkEditPartnerAssignedTargetingOptionsRequest {
  return {
    ...data,
    createRequests: data["createRequests"] !== undefined ? data["createRequests"].map((item: any) => (deserializeCreateAssignedTargetingOptionsRequest(item))) : undefined,
  };
}

export interface BulkEditPartnerAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options that have been successfully
   * created. This list will be absent if empty.
   */
  createdAssignedTargetingOptions?: AssignedTargetingOption[];
}

function serializeBulkEditPartnerAssignedTargetingOptionsResponse(data: any): BulkEditPartnerAssignedTargetingOptionsResponse {
  return {
    ...data,
    createdAssignedTargetingOptions: data["createdAssignedTargetingOptions"] !== undefined ? data["createdAssignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeBulkEditPartnerAssignedTargetingOptionsResponse(data: any): BulkEditPartnerAssignedTargetingOptionsResponse {
  return {
    ...data,
    createdAssignedTargetingOptions: data["createdAssignedTargetingOptions"] !== undefined ? data["createdAssignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

/**
 * Request message for SiteService.BulkEditSites.
 */
export interface BulkEditSitesRequest {
  /**
   * The ID of the advertiser that owns the parent channel.
   */
  advertiserId?: bigint;
  /**
   * The sites to create in batch, specified as a list of Sites.
   */
  createdSites?: Site[];
  /**
   * The sites to delete in batch, specified as a list of site url_or_app_ids.
   */
  deletedSites?: string[];
  /**
   * The ID of the partner that owns the parent channel.
   */
  partnerId?: bigint;
}

function serializeBulkEditSitesRequest(data: any): BulkEditSitesRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeBulkEditSitesRequest(data: any): BulkEditSitesRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Response message for SiteService.BulkEditSites.
 */
export interface BulkEditSitesResponse {
  /**
   * The list of sites that have been successfully created. This list will be
   * absent if empty.
   */
  sites?: Site[];
}

export interface BulkListAdGroupAssignedTargetingOptionsResponse {
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent call to
   * `BulkListAdGroupAssignedTargetingOptions` to fetch the next page of
   * results. This token will be absent if there are no more
   * youtube_ad_group_assigned_targeting_options to return.
   */
  nextPageToken?: string;
  /**
   * The list of wrapper objects, each providing an assigned targeting option
   * and the youtube ad group it is assigned to. This list will be absent if
   * empty.
   */
  youtubeAdGroupAssignedTargetingOptions?: YoutubeAdGroupAssignedTargetingOption[];
}

function serializeBulkListAdGroupAssignedTargetingOptionsResponse(data: any): BulkListAdGroupAssignedTargetingOptionsResponse {
  return {
    ...data,
    youtubeAdGroupAssignedTargetingOptions: data["youtubeAdGroupAssignedTargetingOptions"] !== undefined ? data["youtubeAdGroupAssignedTargetingOptions"].map((item: any) => (serializeYoutubeAdGroupAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeBulkListAdGroupAssignedTargetingOptionsResponse(data: any): BulkListAdGroupAssignedTargetingOptionsResponse {
  return {
    ...data,
    youtubeAdGroupAssignedTargetingOptions: data["youtubeAdGroupAssignedTargetingOptions"] !== undefined ? data["youtubeAdGroupAssignedTargetingOptions"].map((item: any) => (deserializeYoutubeAdGroupAssignedTargetingOption(item))) : undefined,
  };
}

export interface BulkListAdvertiserAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * BulkListAdvertiserAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeBulkListAdvertiserAssignedTargetingOptionsResponse(data: any): BulkListAdvertiserAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeBulkListAdvertiserAssignedTargetingOptionsResponse(data: any): BulkListAdvertiserAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

export interface BulkListAssignedTargetingOptionsResponse {
  /**
   * The list of wrapper objects, each providing an assigned targeting option
   * and the line item it is assigned to. This list will be absent if empty.
   */
  lineItemAssignedTargetingOptions?: LineItemAssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent call to
   * `BulkListAssignedTargetingOptions` to fetch the next page of results. This
   * token will be absent if there are no more
   * line_item_assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeBulkListAssignedTargetingOptionsResponse(data: any): BulkListAssignedTargetingOptionsResponse {
  return {
    ...data,
    lineItemAssignedTargetingOptions: data["lineItemAssignedTargetingOptions"] !== undefined ? data["lineItemAssignedTargetingOptions"].map((item: any) => (serializeLineItemAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeBulkListAssignedTargetingOptionsResponse(data: any): BulkListAssignedTargetingOptionsResponse {
  return {
    ...data,
    lineItemAssignedTargetingOptions: data["lineItemAssignedTargetingOptions"] !== undefined ? data["lineItemAssignedTargetingOptions"].map((item: any) => (deserializeLineItemAssignedTargetingOption(item))) : undefined,
  };
}

/**
 * Response message for BulkListCampaignAssignedTargetingOptions.
 */
export interface BulkListCampaignAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * BulkListCampaignAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeBulkListCampaignAssignedTargetingOptionsResponse(data: any): BulkListCampaignAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeBulkListCampaignAssignedTargetingOptionsResponse(data: any): BulkListCampaignAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

/**
 * Response message for BulkListInsertionOrderAssignedTargetingOptions.
 */
export interface BulkListInsertionOrderAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * BulkListInsertionOrderAssignedTargetingOptionsRequest to fetch the next
   * page of results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeBulkListInsertionOrderAssignedTargetingOptionsResponse(data: any): BulkListInsertionOrderAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeBulkListInsertionOrderAssignedTargetingOptionsResponse(data: any): BulkListInsertionOrderAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

/**
 * Request message for LineItemService.BulkUpdateLineItems.
 */
export interface BulkUpdateLineItemsRequest {
  /**
   * Required. IDs of line items to update.
   */
  lineItemIds?: bigint[];
  /**
   * Required. A line item object containing the fields to be updated and the
   * new values to assign to all line items specified in line_item_ids."
   */
  targetLineItem?: LineItem;
  /**
   * Required. A field mask identifying which fields to update. Only the
   * following fields are currently supported: * entityStatus
   */
  updateMask?: string /* FieldMask */;
}

function serializeBulkUpdateLineItemsRequest(data: any): BulkUpdateLineItemsRequest {
  return {
    ...data,
    lineItemIds: data["lineItemIds"] !== undefined ? data["lineItemIds"].map((item: any) => (String(item))) : undefined,
    targetLineItem: data["targetLineItem"] !== undefined ? serializeLineItem(data["targetLineItem"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBulkUpdateLineItemsRequest(data: any): BulkUpdateLineItemsRequest {
  return {
    ...data,
    lineItemIds: data["lineItemIds"] !== undefined ? data["lineItemIds"].map((item: any) => (BigInt(item))) : undefined,
    targetLineItem: data["targetLineItem"] !== undefined ? deserializeLineItem(data["targetLineItem"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response message for LineItemService.BulkUpdateLineItems.
 */
export interface BulkUpdateLineItemsResponse {
  /**
   * Errors returned by line items that failed to update.
   */
  errors?: Status[];
  /**
   * The IDs of line items that failed to update.
   */
  failedLineItemIds?: bigint[];
  /**
   * The IDs of line items that are skipped for updates. For example,
   * unnecessary mutates that will result in effectively no changes to line
   * items will be skipped and corresponding line item IDs can be tracked here.
   */
  skippedLineItemIds?: bigint[];
  /**
   * The IDs of successfully updated line items.
   */
  updatedLineItemIds?: bigint[];
}

function serializeBulkUpdateLineItemsResponse(data: any): BulkUpdateLineItemsResponse {
  return {
    ...data,
    failedLineItemIds: data["failedLineItemIds"] !== undefined ? data["failedLineItemIds"].map((item: any) => (String(item))) : undefined,
    skippedLineItemIds: data["skippedLineItemIds"] !== undefined ? data["skippedLineItemIds"].map((item: any) => (String(item))) : undefined,
    updatedLineItemIds: data["updatedLineItemIds"] !== undefined ? data["updatedLineItemIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeBulkUpdateLineItemsResponse(data: any): BulkUpdateLineItemsResponse {
  return {
    ...data,
    failedLineItemIds: data["failedLineItemIds"] !== undefined ? data["failedLineItemIds"].map((item: any) => (BigInt(item))) : undefined,
    skippedLineItemIds: data["skippedLineItemIds"] !== undefined ? data["skippedLineItemIds"].map((item: any) => (BigInt(item))) : undefined,
    updatedLineItemIds: data["updatedLineItemIds"] !== undefined ? data["updatedLineItemIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Details for a bumper ad.
 */
export interface BumperAd {
  /**
   * Common ad attributes.
   */
  commonInStreamAttribute?: CommonInStreamAttribute;
}

function serializeBumperAd(data: any): BumperAd {
  return {
    ...data,
    commonInStreamAttribute: data["commonInStreamAttribute"] !== undefined ? serializeCommonInStreamAttribute(data["commonInStreamAttribute"]) : undefined,
  };
}

function deserializeBumperAd(data: any): BumperAd {
  return {
    ...data,
    commonInStreamAttribute: data["commonInStreamAttribute"] !== undefined ? deserializeCommonInStreamAttribute(data["commonInStreamAttribute"]) : undefined,
  };
}

/**
 * Details for assigned Business chain targeting option. This will be populated
 * in the details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_BUSINESS_CHAIN`.
 */
export interface BusinessChainAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of a business chain, e.g. "KFC", "Chase
   * Bank".
   */
  readonly displayName?: string;
  /**
   * Required. The radius of the area around the business chain that will be
   * targeted. The units of the radius are specified by proximity_radius_unit.
   * Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit
   * is `DISTANCE_UNIT_MILES`. The minimum increment for both cases is 0.1.
   * Inputs will be rounded to the nearest acceptable value if it is too
   * granular, e.g. 15.57 will become 15.6.
   */
  proximityRadiusAmount?: number;
  /**
   * Required. The unit of distance by which the targeting radius is measured.
   */
  proximityRadiusUnit?:  | "DISTANCE_UNIT_UNSPECIFIED" | "DISTANCE_UNIT_MILES" | "DISTANCE_UNIT_KILOMETERS";
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_BUSINESS_CHAIN`. Accepted business chain targeting option
   * IDs can be retrieved using SearchTargetingOptions.
   */
  targetingOptionId?: string;
}

/**
 * Search terms for Business Chain targeting options. At least one of the field
 * should be populated.
 */
export interface BusinessChainSearchTerms {
  /**
   * The search query for the desired business chain. The query must be the
   * full name of the business, e.g. "KFC", "mercedes-benz".
   */
  businessChainQuery?: string;
  /**
   * The search query for the desired geo region, e.g. "Seattle", "United
   * State".
   */
  regionQuery?: string;
}

/**
 * Represents a targetable business chain within a geo region. This will be
 * populated in the business_chain_details field when targeting_type is
 * `TARGETING_TYPE_BUSINESS_CHAIN`.
 */
export interface BusinessChainTargetingOptionDetails {
  /**
   * Output only. The display name of the business chain, e.g. "KFC", "Chase
   * Bank".
   */
  readonly businessChain?: string;
  /**
   * Output only. The display name of the geographic region, e.g. "Ontario,
   * Canada".
   */
  readonly geoRegion?: string;
  /**
   * Output only. The type of the geographic region.
   */
  readonly geoRegionType?:  | "GEO_REGION_TYPE_UNKNOWN" | "GEO_REGION_TYPE_OTHER" | "GEO_REGION_TYPE_COUNTRY" | "GEO_REGION_TYPE_REGION" | "GEO_REGION_TYPE_TERRITORY" | "GEO_REGION_TYPE_PROVINCE" | "GEO_REGION_TYPE_STATE" | "GEO_REGION_TYPE_PREFECTURE" | "GEO_REGION_TYPE_GOVERNORATE" | "GEO_REGION_TYPE_CANTON" | "GEO_REGION_TYPE_UNION_TERRITORY" | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY" | "GEO_REGION_TYPE_DMA_REGION" | "GEO_REGION_TYPE_METRO" | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT" | "GEO_REGION_TYPE_COUNTY" | "GEO_REGION_TYPE_MUNICIPALITY" | "GEO_REGION_TYPE_CITY" | "GEO_REGION_TYPE_POSTAL_CODE" | "GEO_REGION_TYPE_DEPARTMENT" | "GEO_REGION_TYPE_AIRPORT" | "GEO_REGION_TYPE_TV_REGION" | "GEO_REGION_TYPE_OKRUG" | "GEO_REGION_TYPE_BOROUGH" | "GEO_REGION_TYPE_CITY_REGION" | "GEO_REGION_TYPE_ARRONDISSEMENT" | "GEO_REGION_TYPE_NEIGHBORHOOD" | "GEO_REGION_TYPE_UNIVERSITY" | "GEO_REGION_TYPE_DISTRICT";
}

/**
 * A single campaign.
 */
export interface Campaign {
  /**
   * Output only. The unique ID of the advertiser the campaign belongs to.
   */
  readonly advertiserId?: bigint;
  /**
   * The list of budgets available to this campaign. If this field is not set,
   * the campaign uses an unlimited budget.
   */
  campaignBudgets?: CampaignBudget[];
  /**
   * Required. The planned spend and duration of the campaign.
   */
  campaignFlight?: CampaignFlight;
  /**
   * Required. The goal of the campaign.
   */
  campaignGoal?: CampaignGoal;
  /**
   * Output only. The unique ID of the campaign. Assigned by the system.
   */
  readonly campaignId?: bigint;
  /**
   * Required. The display name of the campaign. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Required. Controls whether or not the insertion orders under this campaign
   * can spend their budgets and bid on inventory. * Accepted values are
   * `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and
   * `ENTITY_STATUS_PAUSED`. * For CreateCampaign method,
   * `ENTITY_STATUS_ARCHIVED` is not allowed.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Required. The frequency cap setting of the campaign.
   */
  frequencyCap?: FrequencyCap;
  /**
   * Output only. The resource name of the campaign.
   */
  readonly name?: string;
  /**
   * Output only. The timestamp when the campaign was last updated. Assigned by
   * the system.
   */
  readonly updateTime?: Date;
}

function serializeCampaign(data: any): Campaign {
  return {
    ...data,
    campaignBudgets: data["campaignBudgets"] !== undefined ? data["campaignBudgets"].map((item: any) => (serializeCampaignBudget(item))) : undefined,
    campaignFlight: data["campaignFlight"] !== undefined ? serializeCampaignFlight(data["campaignFlight"]) : undefined,
    campaignGoal: data["campaignGoal"] !== undefined ? serializeCampaignGoal(data["campaignGoal"]) : undefined,
  };
}

function deserializeCampaign(data: any): Campaign {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    campaignBudgets: data["campaignBudgets"] !== undefined ? data["campaignBudgets"].map((item: any) => (deserializeCampaignBudget(item))) : undefined,
    campaignFlight: data["campaignFlight"] !== undefined ? deserializeCampaignFlight(data["campaignFlight"]) : undefined,
    campaignGoal: data["campaignGoal"] !== undefined ? deserializeCampaignGoal(data["campaignGoal"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Settings that control how the campaign budget is allocated.
 */
export interface CampaignBudget {
  /**
   * Required. The total amount the linked insertion order segments can budget.
   * The amount is in micros. Must be greater than 0. For example, 500000000
   * represents 500 standard units of the currency.
   */
  budgetAmountMicros?: bigint;
  /**
   * The unique ID of the campaign budget. Assigned by the system. Do not set
   * for new budgets. Must be included when updating or adding budgets to
   * campaign_budgets. Otherwise, a new ID will be generated and assigned.
   */
  budgetId?: bigint;
  /**
   * Required. Immutable. Specifies whether the budget is measured in currency
   * or impressions.
   */
  budgetUnit?:  | "BUDGET_UNIT_UNSPECIFIED" | "BUDGET_UNIT_CURRENCY" | "BUDGET_UNIT_IMPRESSIONS";
  /**
   * Required. The date range for the campaign budget. Linked budget segments
   * may have a different date range. They are resolved relative to the parent
   * advertiser's time zone. Both `start_date` and `end_date` must be before the
   * year 2037.
   */
  dateRange?: DateRange;
  /**
   * Required. The display name of the budget. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Immutable. The ID identifying this budget to the external source. If this
   * field is set and the invoice detail level of the corresponding billing
   * profile is set to "Budget level PO", all impressions served against this
   * budget will include this ID on the invoice. Must be unique under the
   * campaign.
   */
  externalBudgetId?: string;
  /**
   * Required. The external source of the budget.
   */
  externalBudgetSource?:  | "EXTERNAL_BUDGET_SOURCE_UNSPECIFIED" | "EXTERNAL_BUDGET_SOURCE_NONE" | "EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN";
  /**
   * Immutable. The ID used to group budgets to be included the same invoice.
   * If this field is set and the invoice level of the corresponding billing
   * profile is set to "Budget invoice grouping ID", all external_budget_id
   * sharing the same invoice_grouping_id will be grouped in the same invoice.
   */
  invoiceGroupingId?: string;
  /**
   * Additional metadata for use by the Mediaocean Prisma tool. Required for
   * Mediaocean budgets. Only applicable to prisma_enabled advertisers.
   */
  prismaConfig?: PrismaConfig;
}

function serializeCampaignBudget(data: any): CampaignBudget {
  return {
    ...data,
    budgetAmountMicros: data["budgetAmountMicros"] !== undefined ? String(data["budgetAmountMicros"]) : undefined,
    budgetId: data["budgetId"] !== undefined ? String(data["budgetId"]) : undefined,
  };
}

function deserializeCampaignBudget(data: any): CampaignBudget {
  return {
    ...data,
    budgetAmountMicros: data["budgetAmountMicros"] !== undefined ? BigInt(data["budgetAmountMicros"]) : undefined,
    budgetId: data["budgetId"] !== undefined ? BigInt(data["budgetId"]) : undefined,
  };
}

/**
 * Settings that track the planned spend and duration of a campaign.
 */
export interface CampaignFlight {
  /**
   * Required. The dates that the campaign is expected to run. They are
   * resolved relative to the parent advertiser's time zone. * The dates
   * specified here will not affect serving. They are used to generate alerts
   * and warnings. For example, if the flight date of any child insertion order
   * is outside the range of these dates, the user interface will show a
   * warning. * `start_date` is required and must be the current date or later.
   * * `end_date` is optional. If specified, it must be the `start_date` or
   * later. * Any specified date must be before the year 2037.
   */
  plannedDates?: DateRange;
  /**
   * The amount the campaign is expected to spend for its given planned_dates.
   * This will not limit serving, but will be used for tracking spend in the
   * DV360 UI. The amount is in micros. Must be greater than or equal to 0. For
   * example, 500000000 represents 500 standard units of the currency.
   */
  plannedSpendAmountMicros?: bigint;
}

function serializeCampaignFlight(data: any): CampaignFlight {
  return {
    ...data,
    plannedSpendAmountMicros: data["plannedSpendAmountMicros"] !== undefined ? String(data["plannedSpendAmountMicros"]) : undefined,
  };
}

function deserializeCampaignFlight(data: any): CampaignFlight {
  return {
    ...data,
    plannedSpendAmountMicros: data["plannedSpendAmountMicros"] !== undefined ? BigInt(data["plannedSpendAmountMicros"]) : undefined,
  };
}

/**
 * Settings that control the goal of a campaign.
 */
export interface CampaignGoal {
  /**
   * Required. The type of the campaign goal.
   */
  campaignGoalType?:  | "CAMPAIGN_GOAL_TYPE_UNSPECIFIED" | "CAMPAIGN_GOAL_TYPE_APP_INSTALL" | "CAMPAIGN_GOAL_TYPE_BRAND_AWARENESS" | "CAMPAIGN_GOAL_TYPE_OFFLINE_ACTION" | "CAMPAIGN_GOAL_TYPE_ONLINE_ACTION";
  /**
   * Required. The performance goal of the campaign. Acceptable values for
   * performance_goal_type are: * `PERFORMANCE_GOAL_TYPE_CPM` *
   * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` *
   * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_CTR` *
   * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_OTHER`
   */
  performanceGoal?: PerformanceGoal;
}

function serializeCampaignGoal(data: any): CampaignGoal {
  return {
    ...data,
    performanceGoal: data["performanceGoal"] !== undefined ? serializePerformanceGoal(data["performanceGoal"]) : undefined,
  };
}

function deserializeCampaignGoal(data: any): CampaignGoal {
  return {
    ...data,
    performanceGoal: data["performanceGoal"] !== undefined ? deserializePerformanceGoal(data["performanceGoal"]) : undefined,
  };
}

/**
 * Details for assigned carrier and ISP targeting option. This will be
 * populated in the details field of an AssignedTargetingOption when
 * targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`.
 */
export interface CarrierAndIspAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the carrier or ISP.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted. All assigned
   * carrier and ISP targeting options on the same resource must have the same
   * value for this field.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_CARRIER_AND_ISP`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable carrier or ISP. This will be populated in the
 * carrier_and_isp_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_CARRIER_AND_ISP`.
 */
export interface CarrierAndIspTargetingOptionDetails {
  /**
   * Output only. The display name of the carrier or ISP.
   */
  readonly displayName?: string;
  /**
   * Output only. The type indicating if it's carrier or ISP.
   */
  readonly type?:  | "CARRIER_AND_ISP_TYPE_UNSPECIFIED" | "CARRIER_AND_ISP_TYPE_ISP" | "CARRIER_AND_ISP_TYPE_CARRIER";
}

/**
 * Assigned category targeting option details. This will be populated in the
 * category_details field when targeting_type is `TARGETING_TYPE_CATEGORY`.
 */
export interface CategoryAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the category.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_CATEGORY`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable category. This will be populated in the
 * category_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_CATEGORY`.
 */
export interface CategoryTargetingOptionDetails {
  /**
   * Output only. The display name of the category.
   */
  readonly displayName?: string;
}

/**
 * A single channel. Channels are custom groups of related websites and apps.
 */
export interface Channel {
  /**
   * The ID of the advertiser that owns the channel.
   */
  advertiserId?: bigint;
  /**
   * Output only. The unique ID of the channel. Assigned by the system.
   */
  readonly channelId?: bigint;
  /**
   * Required. The display name of the channel. Must be UTF-8 encoded with a
   * maximum length of 240 bytes.
   */
  displayName?: string;
  /**
   * Output only. The resource name of the channel.
   */
  readonly name?: string;
  /**
   * Output only. Number of line items that are directly targeting this channel
   * negatively.
   */
  readonly negativelyTargetedLineItemCount?: bigint;
  /**
   * The ID of the partner that owns the channel.
   */
  partnerId?: bigint;
  /**
   * Output only. Number of line items that are directly targeting this channel
   * positively.
   */
  readonly positivelyTargetedLineItemCount?: bigint;
}

function serializeChannel(data: any): Channel {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeChannel(data: any): Channel {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    channelId: data["channelId"] !== undefined ? BigInt(data["channelId"]) : undefined,
    negativelyTargetedLineItemCount: data["negativelyTargetedLineItemCount"] !== undefined ? BigInt(data["negativelyTargetedLineItemCount"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    positivelyTargetedLineItemCount: data["positivelyTargetedLineItemCount"] !== undefined ? BigInt(data["positivelyTargetedLineItemCount"]) : undefined,
  };
}

/**
 * Details for assigned channel targeting option. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_CHANNEL`.
 */
export interface ChannelAssignedTargetingOptionDetails {
  /**
   * Required. ID of the channel. Should refer to the channel ID field on a
   * [Partner-owned channel](partners.channels#Channel.FIELDS.channel_id) or
   * [advertiser-owned channel](advertisers.channels#Channel.FIELDS.channel_id)
   * resource.
   */
  channelId?: bigint;
  /**
   * Indicates if this option is being negatively targeted. For advertiser
   * level assigned targeting option, this field must be true.
   */
  negative?: boolean;
}

function serializeChannelAssignedTargetingOptionDetails(data: any): ChannelAssignedTargetingOptionDetails {
  return {
    ...data,
    channelId: data["channelId"] !== undefined ? String(data["channelId"]) : undefined,
  };
}

function deserializeChannelAssignedTargetingOptionDetails(data: any): ChannelAssignedTargetingOptionDetails {
  return {
    ...data,
    channelId: data["channelId"] !== undefined ? BigInt(data["channelId"]) : undefined,
  };
}

/**
 * Settings for advertisers that use both Campaign Manager 360 (CM360) and
 * third-party ad servers.
 */
export interface CmHybridConfig {
  /**
   * Required. Immutable. Account ID of the CM360 Floodlight configuration
   * linked with the DV360 advertiser.
   */
  cmAccountId?: bigint;
  /**
   * Required. Immutable. ID of the CM360 Floodlight configuration linked with
   * the DV360 advertiser.
   */
  cmFloodlightConfigId?: bigint;
  /**
   * Required. Immutable. By setting this field to `true`, you, on behalf of
   * your company, authorize the sharing of information from the given
   * Floodlight configuration to this Display & Video 360 advertiser.
   */
  cmFloodlightLinkingAuthorized?: boolean;
  /**
   * A list of CM360 sites whose placements will be synced to DV360 as
   * creatives. If absent or empty in CreateAdvertiser method, the system will
   * automatically create a CM360 site. Removing sites from this list may cause
   * DV360 creatives synced from CM360 to be deleted. At least one site must be
   * specified.
   */
  cmSyncableSiteIds?: bigint[];
  /**
   * Whether or not to report DV360 cost to CM360.
   */
  dv360ToCmCostReportingEnabled?: boolean;
  /**
   * Whether or not to include DV360 data in CM360 data transfer reports.
   */
  dv360ToCmDataSharingEnabled?: boolean;
}

function serializeCmHybridConfig(data: any): CmHybridConfig {
  return {
    ...data,
    cmAccountId: data["cmAccountId"] !== undefined ? String(data["cmAccountId"]) : undefined,
    cmFloodlightConfigId: data["cmFloodlightConfigId"] !== undefined ? String(data["cmFloodlightConfigId"]) : undefined,
    cmSyncableSiteIds: data["cmSyncableSiteIds"] !== undefined ? data["cmSyncableSiteIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeCmHybridConfig(data: any): CmHybridConfig {
  return {
    ...data,
    cmAccountId: data["cmAccountId"] !== undefined ? BigInt(data["cmAccountId"]) : undefined,
    cmFloodlightConfigId: data["cmFloodlightConfigId"] !== undefined ? BigInt(data["cmFloodlightConfigId"]) : undefined,
    cmSyncableSiteIds: data["cmSyncableSiteIds"] !== undefined ? data["cmSyncableSiteIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A Campaign Manager 360 tracking ad.
 */
export interface CmTrackingAd {
  /**
   * The ad ID of the campaign manager 360 tracking Ad.
   */
  cmAdId?: bigint;
  /**
   * The creative ID of the campaign manager 360 tracking Ad.
   */
  cmCreativeId?: bigint;
  /**
   * The placement ID of the campaign manager 360 tracking Ad.
   */
  cmPlacementId?: bigint;
}

function serializeCmTrackingAd(data: any): CmTrackingAd {
  return {
    ...data,
    cmAdId: data["cmAdId"] !== undefined ? String(data["cmAdId"]) : undefined,
    cmCreativeId: data["cmCreativeId"] !== undefined ? String(data["cmCreativeId"]) : undefined,
    cmPlacementId: data["cmPlacementId"] !== undefined ? String(data["cmPlacementId"]) : undefined,
  };
}

function deserializeCmTrackingAd(data: any): CmTrackingAd {
  return {
    ...data,
    cmAdId: data["cmAdId"] !== undefined ? BigInt(data["cmAdId"]) : undefined,
    cmCreativeId: data["cmCreativeId"] !== undefined ? BigInt(data["cmCreativeId"]) : undefined,
    cmPlacementId: data["cmPlacementId"] !== undefined ? BigInt(data["cmPlacementId"]) : undefined,
  };
}

/**
 * Describes a combined audience resource.
 */
export interface CombinedAudience {
  /**
   * Output only. The unique ID of the combined audience. Assigned by the
   * system.
   */
  readonly combinedAudienceId?: bigint;
  /**
   * Output only. The display name of the combined audience. .
   */
  readonly displayName?: string;
  /**
   * Output only. The resource name of the combined audience.
   */
  readonly name?: string;
}

/**
 * Details of combined audience group. All combined audience targeting settings
 * are logically ‘OR’ of each other.
 */
export interface CombinedAudienceGroup {
  /**
   * Required. All combined audience targeting settings in combined audience
   * group. Repeated settings with same id will be ignored. The number of
   * combined audience settings should be no more than five, error will be
   * thrown otherwise.
   */
  settings?: CombinedAudienceTargetingSetting[];
}

function serializeCombinedAudienceGroup(data: any): CombinedAudienceGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (serializeCombinedAudienceTargetingSetting(item))) : undefined,
  };
}

function deserializeCombinedAudienceGroup(data: any): CombinedAudienceGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (deserializeCombinedAudienceTargetingSetting(item))) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#combinedAudiencesGet.
 */
export interface CombinedAudiencesGetOptions {
  /**
   * The ID of the advertiser that has access to the fetched combined audience.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that has access to the fetched combined audience.
   */
  partnerId?: bigint;
}

function serializeCombinedAudiencesGetOptions(data: any): CombinedAudiencesGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCombinedAudiencesGetOptions(data: any): CombinedAudiencesGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#combinedAudiencesList.
 */
export interface CombinedAudiencesListOptions {
  /**
   * The ID of the advertiser that has access to the fetched combined
   * audiences.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by combined audience fields. Supported syntax: * Filter
   * expressions for combined audiences currently can only contain at most one
   * restriction. * A restriction has the form of `{field} {operator} {value}`.
   * * The operator must be `CONTAINS (:)`. * Supported fields: - `displayName`
   * Examples: * All combined audiences for which the display name contains
   * "Google": `displayName : "Google"`. The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `combinedAudienceId` (default) * `displayName` The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListCombinedAudiences` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that has access to the fetched combined audiences.
   */
  partnerId?: bigint;
}

function serializeCombinedAudiencesListOptions(data: any): CombinedAudiencesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCombinedAudiencesListOptions(data: any): CombinedAudiencesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Details of combined audience targeting setting.
 */
export interface CombinedAudienceTargetingSetting {
  /**
   * Required. Combined audience id of combined audience targeting setting.
   * This id is combined_audience_id.
   */
  combinedAudienceId?: bigint;
}

function serializeCombinedAudienceTargetingSetting(data: any): CombinedAudienceTargetingSetting {
  return {
    ...data,
    combinedAudienceId: data["combinedAudienceId"] !== undefined ? String(data["combinedAudienceId"]) : undefined,
  };
}

function deserializeCombinedAudienceTargetingSetting(data: any): CombinedAudienceTargetingSetting {
  return {
    ...data,
    combinedAudienceId: data["combinedAudienceId"] !== undefined ? BigInt(data["combinedAudienceId"]) : undefined,
  };
}

/**
 * Common attributes for in-stream, non-skippable and bumper ads.
 */
export interface CommonInStreamAttribute {
  /**
   * The text on the call-to-action button.
   */
  actionButtonLabel?: string;
  /**
   * The headline of the call-to-action banner.
   */
  actionHeadline?: string;
  /**
   * The image which shows next to the video ad.
   */
  companionBanner?: ImageAsset;
  /**
   * The webpage address that appears with the ad.
   */
  displayUrl?: string;
  /**
   * The URL address of the webpage that people reach after they click the ad.
   */
  finalUrl?: string;
  /**
   * The URL address loaded in the background for tracking purposes.
   */
  trackingUrl?: string;
  /**
   * The YouTube video of the ad.
   */
  video?: YoutubeVideoDetails;
}

function serializeCommonInStreamAttribute(data: any): CommonInStreamAttribute {
  return {
    ...data,
    companionBanner: data["companionBanner"] !== undefined ? serializeImageAsset(data["companionBanner"]) : undefined,
  };
}

function deserializeCommonInStreamAttribute(data: any): CommonInStreamAttribute {
  return {
    ...data,
    companionBanner: data["companionBanner"] !== undefined ? deserializeImageAsset(data["companionBanner"]) : undefined,
  };
}

/**
 * Contact information defining a Customer Match audience member.
 */
export interface ContactInfo {
  /**
   * Country code of the member. Must also be set with the following fields: *
   * hashed_first_name * hashed_last_name * zip_codes
   */
  countryCode?: string;
  /**
   * A list of SHA256 hashed email of the member. Before hashing, remove all
   * whitespace and make sure the string is all lowercase.
   */
  hashedEmails?: string[];
  /**
   * SHA256 hashed first name of the member. Before hashing, remove all
   * whitespace and make sure the string is all lowercase. Must also be set with
   * the following fields: * country_code * hashed_last_name * zip_codes
   */
  hashedFirstName?: string;
  /**
   * SHA256 hashed last name of the member. Before hashing, remove all
   * whitespace and make sure the string is all lowercase. Must also be set with
   * the following fields: * country_code * hashed_first_name * zip_codes
   */
  hashedLastName?: string;
  /**
   * A list of SHA256 hashed phone numbers of the member. Before hashing, all
   * phone numbers must be formatted using the [E.164
   * format](//en.wikipedia.org/wiki/E.164) and include the country calling
   * code.
   */
  hashedPhoneNumbers?: string[];
  /**
   * A list of zip codes of the member. Must also be set with the following
   * fields: * country_code * hashed_first_name * hashed_last_name
   */
  zipCodes?: string[];
}

/**
 * Wrapper message for a list of contact information defining Customer Match
 * audience members.
 */
export interface ContactInfoList {
  /**
   * A list of ContactInfo objects defining Customer Match audience members.
   * The size of members after splitting the contact_infos mustn't be greater
   * than 500,000.
   */
  contactInfos?: ContactInfo[];
}

/**
 * Details for content duration assigned targeting option. This will be
 * populated in the content_duration_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_DURATION`. Explicitly targeting all options is not
 * supported. Remove all content duration targeting options to achieve this
 * effect.
 */
export interface ContentDurationAssignedTargetingOptionDetails {
  /**
   * Output only. The content duration.
   */
  readonly contentDuration?:  | "CONTENT_DURATION_UNSPECIFIED" | "CONTENT_DURATION_UNKNOWN" | "CONTENT_DURATION_0_TO_1_MIN" | "CONTENT_DURATION_1_TO_5_MIN" | "CONTENT_DURATION_5_TO_15_MIN" | "CONTENT_DURATION_15_TO_30_MIN" | "CONTENT_DURATION_30_TO_60_MIN" | "CONTENT_DURATION_OVER_60_MIN";
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_CONTENT_DURATION`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable content duration. This will be populated in the
 * content_duration_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_DURATION`.
 */
export interface ContentDurationTargetingOptionDetails {
  /**
   * Output only. The content duration.
   */
  readonly contentDuration?:  | "CONTENT_DURATION_UNSPECIFIED" | "CONTENT_DURATION_UNKNOWN" | "CONTENT_DURATION_0_TO_1_MIN" | "CONTENT_DURATION_1_TO_5_MIN" | "CONTENT_DURATION_5_TO_15_MIN" | "CONTENT_DURATION_15_TO_30_MIN" | "CONTENT_DURATION_30_TO_60_MIN" | "CONTENT_DURATION_OVER_60_MIN";
}

/**
 * Details for content genre assigned targeting option. This will be populated
 * in the content_genre_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_GENRE`. Explicitly targeting all options is not
 * supported. Remove all content genre targeting options to achieve this effect.
 */
export interface ContentGenreAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the content genre.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_CONTENT_GENRE`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable content genre. This will be populated in the
 * content_genre_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_GENRE`.
 */
export interface ContentGenreTargetingOptionDetails {
  /**
   * Output only. The display name of the content genre
   */
  readonly displayName?: string;
}

/**
 * Assigned content instream position targeting option details. This will be
 * populated in the content_instream_position_details field when targeting_type
 * is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.
 */
export interface ContentInstreamPositionAssignedTargetingOptionDetails {
  /**
   * Output only. The ad type to target. Only applicable to insertion order
   * targeting and new line items supporting the specified ad type will inherit
   * this targeting option by default. Possible values are: * `AD_TYPE_VIDEO`,
   * the setting will be inherited by new line item when line_item_type is
   * `LINE_ITEM_TYPE_VIDEO_DEFAULT`. * `AD_TYPE_AUDIO`, the setting will be
   * inherited by new line item when line_item_type is
   * `LINE_ITEM_TYPE_AUDIO_DEFAULT`.
   */
  readonly adType?:  | "AD_TYPE_UNSPECIFIED" | "AD_TYPE_DISPLAY" | "AD_TYPE_VIDEO" | "AD_TYPE_AUDIO";
  /**
   * The content instream position for video or audio ads. Output only in v1.
   * Required in v2.
   */
  contentInstreamPosition?:  | "CONTENT_INSTREAM_POSITION_UNSPECIFIED" | "CONTENT_INSTREAM_POSITION_PRE_ROLL" | "CONTENT_INSTREAM_POSITION_MID_ROLL" | "CONTENT_INSTREAM_POSITION_POST_ROLL" | "CONTENT_INSTREAM_POSITION_UNKNOWN";
}

/**
 * Represents a targetable content instream position, which could be used by
 * video and audio ads. This will be populated in the
 * content_instream_position_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.
 */
export interface ContentInstreamPositionTargetingOptionDetails {
  /**
   * Output only. The content instream position.
   */
  readonly contentInstreamPosition?:  | "CONTENT_INSTREAM_POSITION_UNSPECIFIED" | "CONTENT_INSTREAM_POSITION_PRE_ROLL" | "CONTENT_INSTREAM_POSITION_MID_ROLL" | "CONTENT_INSTREAM_POSITION_POST_ROLL" | "CONTENT_INSTREAM_POSITION_UNKNOWN";
}

/**
 * Assigned content outstream position targeting option details. This will be
 * populated in the content_outstream_position_details field when targeting_type
 * is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.
 */
export interface ContentOutstreamPositionAssignedTargetingOptionDetails {
  /**
   * Output only. The ad type to target. Only applicable to insertion order
   * targeting and new line items supporting the specified ad type will inherit
   * this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`,
   * the setting will be inherited by new line item when line_item_type is
   * `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be
   * inherited by new line item when line_item_type is
   * `LINE_ITEM_TYPE_VIDEO_DEFAULT`.
   */
  readonly adType?:  | "AD_TYPE_UNSPECIFIED" | "AD_TYPE_DISPLAY" | "AD_TYPE_VIDEO" | "AD_TYPE_AUDIO";
  /**
   * The content outstream position. Output only in v1. Required in v2.
   */
  contentOutstreamPosition?:  | "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED" | "CONTENT_OUTSTREAM_POSITION_UNKNOWN" | "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE" | "CONTENT_OUTSTREAM_POSITION_IN_BANNER" | "CONTENT_OUTSTREAM_POSITION_IN_FEED" | "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL";
}

/**
 * Represents a targetable content outstream position, which could be used by
 * display and video ads. This will be populated in the
 * content_outstream_position_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.
 */
export interface ContentOutstreamPositionTargetingOptionDetails {
  /**
   * Output only. The content outstream position.
   */
  readonly contentOutstreamPosition?:  | "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED" | "CONTENT_OUTSTREAM_POSITION_UNKNOWN" | "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE" | "CONTENT_OUTSTREAM_POSITION_IN_BANNER" | "CONTENT_OUTSTREAM_POSITION_IN_FEED" | "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL";
}

/**
 * Details for content stream type assigned targeting option. This will be
 * populated in the content_stream_type_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_STREAM_TYPE`. Explicitly targeting all options is not
 * supported. Remove all content stream type targeting options to achieve this
 * effect.
 */
export interface ContentStreamTypeAssignedTargetingOptionDetails {
  /**
   * Output only. The content stream type.
   */
  readonly contentStreamType?:  | "CONTENT_STREAM_TYPE_UNSPECIFIED" | "CONTENT_LIVE_STREAM" | "CONTENT_ON_DEMAND";
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_CONTENT_STREAM_TYPE`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable content stream type. This will be populated in the
 * content_stream_type_details field when targeting_type is
 * `TARGETING_TYPE_CONTENT_STREAM_TYPE`.
 */
export interface ContentStreamTypeTargetingOptionDetails {
  /**
   * Output only. The content stream type.
   */
  readonly contentStreamType?:  | "CONTENT_STREAM_TYPE_UNSPECIFIED" | "CONTENT_LIVE_STREAM" | "CONTENT_ON_DEMAND";
}

/**
 * Settings that control how conversions are counted. All post-click
 * conversions will be counted. A percentage value can be set for post-view
 * conversions counting.
 */
export interface ConversionCountingConfig {
  /**
   * The Floodlight activity configs used to track conversions. The number of
   * conversions counted is the sum of all of the conversions counted by all of
   * the Floodlight activity IDs specified in this field.
   */
  floodlightActivityConfigs?: TrackingFloodlightActivityConfig[];
  /**
   * The percentage of post-view conversions to count, in millis (1/1000 of a
   * percent). Must be between 0 and 100000 inclusive. For example, to track 50%
   * of the post-click conversions, set a value of 50000.
   */
  postViewCountPercentageMillis?: bigint;
}

function serializeConversionCountingConfig(data: any): ConversionCountingConfig {
  return {
    ...data,
    floodlightActivityConfigs: data["floodlightActivityConfigs"] !== undefined ? data["floodlightActivityConfigs"].map((item: any) => (serializeTrackingFloodlightActivityConfig(item))) : undefined,
    postViewCountPercentageMillis: data["postViewCountPercentageMillis"] !== undefined ? String(data["postViewCountPercentageMillis"]) : undefined,
  };
}

function deserializeConversionCountingConfig(data: any): ConversionCountingConfig {
  return {
    ...data,
    floodlightActivityConfigs: data["floodlightActivityConfigs"] !== undefined ? data["floodlightActivityConfigs"].map((item: any) => (deserializeTrackingFloodlightActivityConfig(item))) : undefined,
    postViewCountPercentageMillis: data["postViewCountPercentageMillis"] !== undefined ? BigInt(data["postViewCountPercentageMillis"]) : undefined,
  };
}

/**
 * Counter event of the creative.
 */
export interface CounterEvent {
  /**
   * Required. The name of the counter event.
   */
  name?: string;
  /**
   * Required. The name used to identify this counter event in reports.
   */
  reportingName?: string;
}

/**
 * A request message for CreateAsset.
 */
export interface CreateAssetRequest {
  /**
   * Required. The filename of the asset, including the file extension. The
   * filename must be UTF-8 encoded with a maximum size of 240 bytes.
   */
  filename?: string;
}

/**
 * A response message for CreateAsset.
 */
export interface CreateAssetResponse {
  /**
   * The uploaded asset, if successful.
   */
  asset?: Asset;
}

function serializeCreateAssetResponse(data: any): CreateAssetResponse {
  return {
    ...data,
    asset: data["asset"] !== undefined ? serializeAsset(data["asset"]) : undefined,
  };
}

function deserializeCreateAssetResponse(data: any): CreateAssetResponse {
  return {
    ...data,
    asset: data["asset"] !== undefined ? deserializeAsset(data["asset"]) : undefined,
  };
}

/**
 * A request listing which assigned targeting options of a given targeting type
 * should be created and added.
 */
export interface CreateAssignedTargetingOptionsRequest {
  /**
   * Required. The assigned targeting options to create and add.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * Required. Identifies the type of this assigned targeting option.
   */
  targetingType?:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION";
}

function serializeCreateAssignedTargetingOptionsRequest(data: any): CreateAssignedTargetingOptionsRequest {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeCreateAssignedTargetingOptionsRequest(data: any): CreateAssignedTargetingOptionsRequest {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

/**
 * Request message for [SdfDownloadTaskService.CreateSdfDownloadTask].
 */
export interface CreateSdfDownloadTaskRequest {
  /**
   * The ID of the advertiser to download SDF for.
   */
  advertiserId?: bigint;
  /**
   * Filters on entities by their entity IDs.
   */
  idFilter?: IdFilter;
  /**
   * Filters on Inventory Sources by their IDs.
   */
  inventorySourceFilter?: InventorySourceFilter;
  /**
   * Filters on selected file types. The entities in each file are filtered by
   * a chosen set of filter entities. The filter entities must be the same type
   * as, or a parent type of, the selected file types.
   */
  parentEntityFilter?: ParentEntityFilter;
  /**
   * The ID of the partner to download SDF for.
   */
  partnerId?: bigint;
  /**
   * Required. The SDF version of the downloaded file. If set to
   * `SDF_VERSION_UNSPECIFIED`, this will default to the version specified by
   * the advertiser or partner identified by `root_id`. An advertiser inherits
   * its SDF version from its partner unless configured otherwise.
   */
  version?:  | "SDF_VERSION_UNSPECIFIED" | "SDF_VERSION_3_1" | "SDF_VERSION_4" | "SDF_VERSION_4_1" | "SDF_VERSION_4_2" | "SDF_VERSION_5" | "SDF_VERSION_5_1" | "SDF_VERSION_5_2" | "SDF_VERSION_5_3" | "SDF_VERSION_5_4" | "SDF_VERSION_5_5";
}

function serializeCreateSdfDownloadTaskRequest(data: any): CreateSdfDownloadTaskRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    idFilter: data["idFilter"] !== undefined ? serializeIdFilter(data["idFilter"]) : undefined,
    inventorySourceFilter: data["inventorySourceFilter"] !== undefined ? serializeInventorySourceFilter(data["inventorySourceFilter"]) : undefined,
    parentEntityFilter: data["parentEntityFilter"] !== undefined ? serializeParentEntityFilter(data["parentEntityFilter"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCreateSdfDownloadTaskRequest(data: any): CreateSdfDownloadTaskRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    idFilter: data["idFilter"] !== undefined ? deserializeIdFilter(data["idFilter"]) : undefined,
    inventorySourceFilter: data["inventorySourceFilter"] !== undefined ? deserializeInventorySourceFilter(data["inventorySourceFilter"]) : undefined,
    parentEntityFilter: data["parentEntityFilter"] !== undefined ? deserializeParentEntityFilter(data["parentEntityFilter"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * A single Creative.
 */
export interface Creative {
  /**
   * Additional dimensions. Applicable when creative_type is one of: *
   * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` *
   * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_TEMPLATED_APP_INSTALL` *
   * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_LIGHTBOX` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE` *
   * `CREATIVE_TYPE_PUBLISHER_HOSTED` If this field is specified, width_pixels
   * and height_pixels are both required and must be greater than or equal to 0.
   */
  additionalDimensions?: Dimensions[];
  /**
   * Output only. The unique ID of the advertiser the creative belongs to.
   */
  readonly advertiserId?: bigint;
  /**
   * Third-party HTML tracking tag to be appended to the creative tag.
   */
  appendedTag?: string;
  /**
   * Required. Assets associated to this creative. Assets can be associated to
   * the creative in one of following roles: * `ASSET_ROLE_UNSPECIFIED` *
   * `ASSET_ROLE_MAIN` * `ASSET_ROLE_BACKUP` * `ASSET_ROLE_POLITE_LOAD`
   */
  assets?: AssetAssociation[];
  /**
   * Output only. The unique ID of the Campaign Manager 360 placement
   * associated with the creative. This field is only applicable for creatives
   * that are synced from Campaign Manager.
   */
  readonly cmPlacementId?: bigint;
  /**
   * The Campaign Manager 360 tracking ad associated with the creative.
   * Optional for the following creative_type when created by an advertiser that
   * uses both Campaign Manager 360 and third-party ad serving: *
   * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE` Output only for other cases.
   */
  cmTrackingAd?: CmTrackingAd;
  /**
   * The IDs of companion creatives for a video creative. You can assign
   * existing display creatives (with image or HTML5 assets) to serve
   * surrounding the publisher's video player. Companions display around the
   * video player while the video is playing and remain after the video has
   * completed. Creatives contain additional dimensions can not be companion
   * creatives. This field is only supported for following creative_type: *
   * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`
   */
  companionCreativeIds?: bigint[];
  /**
   * Counter events for a rich media creative. Counters track the number of
   * times that a user interacts with any part of a rich media creative in a
   * specified way (mouse-overs, mouse-outs, clicks, taps, data loading,
   * keyboard entries, etc.). Any event that can be captured in the creative can
   * be recorded as a counter. Leave it empty or unset for creatives containing
   * image assets only.
   */
  counterEvents?: CounterEvent[];
  /**
   * Output only. The timestamp when the creative was created. Assigned by the
   * system.
   */
  readonly createTime?: Date;
  /**
   * Output only. A list of attributes of the creative that is generated by the
   * system.
   */
  readonly creativeAttributes?:  | "CREATIVE_ATTRIBUTE_UNSPECIFIED" | "CREATIVE_ATTRIBUTE_VAST" | "CREATIVE_ATTRIBUTE_VPAID_LINEAR" | "CREATIVE_ATTRIBUTE_VPAID_NON_LINEAR"[];
  /**
   * Output only. The unique ID of the creative. Assigned by the system.
   */
  readonly creativeId?: bigint;
  /**
   * Required. Immutable. The type of the creative.
   */
  creativeType?:  | "CREATIVE_TYPE_UNSPECIFIED" | "CREATIVE_TYPE_STANDARD" | "CREATIVE_TYPE_EXPANDABLE" | "CREATIVE_TYPE_VIDEO" | "CREATIVE_TYPE_NATIVE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_SITE_SQUARE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL" | "CREATIVE_TYPE_LIGHTBOX" | "CREATIVE_TYPE_NATIVE_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE" | "CREATIVE_TYPE_AUDIO" | "CREATIVE_TYPE_PUBLISHER_HOSTED" | "CREATIVE_TYPE_NATIVE_VIDEO" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO";
  /**
   * Required. Primary dimensions of the creative. Applicable to all creative
   * types. The value of width_pixels and height_pixels defaults to `0` when
   * creative_type is one of: * `CREATIVE_TYPE_VIDEO` *
   * `CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL` * `CREATIVE_TYPE_AUDIO`
   * * `CREATIVE_TYPE_NATIVE_VIDEO` *
   * `CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO`
   */
  dimensions?: Dimensions;
  /**
   * Required. The display name of the creative. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Output only. Indicates whether the creative is dynamic.
   */
  readonly dynamic?: boolean;
  /**
   * Required. Controls whether or not the creative can serve. Accepted values
   * are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` *
   * `ENTITY_STATUS_PAUSED`
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Required. Exit events for this creative. An exit (also known as a click
   * tag) is any area in your creative that someone can click or tap to open an
   * advertiser's landing page. Every creative must include at least one exit.
   * You can add an exit to your creative in any of the following ways: * Use
   * Google Web Designer's tap area. * Define a JavaScript variable called
   * "clickTag". * Use the Enabler (Enabler.exit()) to track exits in rich media
   * formats.
   */
  exitEvents?: ExitEvent[];
  /**
   * Optional. Specifies the expanding direction of the creative. Required and
   * only valid for third-party expandable creatives. Third-party expandable
   * creatives are creatives with following hosting source: *
   * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: *
   * `CREATIVE_TYPE_EXPANDABLE`
   */
  expandingDirection?:  | "EXPANDING_DIRECTION_UNSPECIFIED" | "EXPANDING_DIRECTION_NONE" | "EXPANDING_DIRECTION_UP" | "EXPANDING_DIRECTION_DOWN" | "EXPANDING_DIRECTION_LEFT" | "EXPANDING_DIRECTION_RIGHT" | "EXPANDING_DIRECTION_UP_AND_LEFT" | "EXPANDING_DIRECTION_UP_AND_RIGHT" | "EXPANDING_DIRECTION_DOWN_AND_LEFT" | "EXPANDING_DIRECTION_DOWN_AND_RIGHT" | "EXPANDING_DIRECTION_UP_OR_DOWN" | "EXPANDING_DIRECTION_LEFT_OR_RIGHT" | "EXPANDING_DIRECTION_ANY_DIAGONAL";
  /**
   * Optional. Indicates the creative will automatically expand on hover.
   * Optional and only valid for third-party expandable creatives. Third-party
   * expandable creatives are creatives with following hosting source: *
   * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: *
   * `CREATIVE_TYPE_EXPANDABLE`
   */
  expandOnHover?: boolean;
  /**
   * Required. Indicates where the creative is hosted.
   */
  hostingSource?:  | "HOSTING_SOURCE_UNSPECIFIED" | "HOSTING_SOURCE_CM" | "HOSTING_SOURCE_THIRD_PARTY" | "HOSTING_SOURCE_HOSTED" | "HOSTING_SOURCE_RICH_MEDIA";
  /**
   * Output only. Indicates the third-party VAST tag creative requires HTML5
   * Video support. Output only and only valid for third-party VAST tag
   * creatives. Third-party VAST tag creatives are creatives with following
   * hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following
   * creative_type: * `CREATIVE_TYPE_VIDEO`
   */
  readonly html5Video?: boolean;
  /**
   * Indicates whether Integral Ad Science (IAS) campaign monitoring is
   * enabled. To enable this for the creative, make sure the
   * Advertiser.creative_config.ias_client_id has been set to your IAS client
   * ID.
   */
  iasCampaignMonitoring?: boolean;
  /**
   * ID information used to link this creative to an external system. Must be
   * UTF-8 encoded with a length of no more than 10,000 characters.
   */
  integrationCode?: string;
  /**
   * JavaScript measurement URL from supported third-party verification
   * providers (ComScore, DoubleVerify, IAS, Moat). HTML script tags are not
   * supported. This field is only supported in following creative_type: *
   * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`
   */
  jsTrackerUrl?: string;
  /**
   * Output only. The IDs of the line items this creative is associated with.
   * To associate a creative to a line item, use LineItem.creative_ids instead.
   */
  readonly lineItemIds?: bigint[];
  /**
   * Output only. Media duration of the creative. Applicable when creative_type
   * is one of: * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_AUDIO` *
   * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_PUBLISHER_HOSTED`
   */
  readonly mediaDuration?: number /* Duration */;
  /**
   * Output only. Indicates the third-party audio creative supports MP3. Output
   * only and only valid for third-party audio creatives. Third-party audio
   * creatives are creatives with following hosting_source: *
   * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: *
   * `CREATIVE_TYPE_AUDIO`
   */
  readonly mp3Audio?: boolean;
  /**
   * Output only. The resource name of the creative.
   */
  readonly name?: string;
  /**
   * User notes for this creative. Must be UTF-8 encoded with a length of no
   * more than 20,000 characters.
   */
  notes?: string;
  /**
   * Specifies the OBA icon for a video creative. This field is only supported
   * in following creative_type: * `CREATIVE_TYPE_VIDEO`
   */
  obaIcon?: ObaIcon;
  /**
   * Output only. Indicates the third-party audio creative supports OGG. Output
   * only and only valid for third-party audio creatives. Third-party audio
   * creatives are creatives with following hosting_source: *
   * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: *
   * `CREATIVE_TYPE_AUDIO`
   */
  readonly oggAudio?: boolean;
  /**
   * Amount of time to play the video before counting a view. This field is
   * required when skippable is true. This field is only supported for the
   * following creative_type: * `CREATIVE_TYPE_VIDEO`
   */
  progressOffset?: AudioVideoOffset;
  /**
   * Optional. Indicates that the creative relies on HTML5 to render properly.
   * Optional and only valid for third-party tag creatives. Third-party tag
   * creatives are creatives with following hosting_source: *
   * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: *
   * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`
   */
  requireHtml5?: boolean;
  /**
   * Optional. Indicates that the creative requires MRAID (Mobile Rich Media Ad
   * Interface Definitions system). Set this if the creative relies on mobile
   * gestures for interactivity, such as swiping or tapping. Optional and only
   * valid for third-party tag creatives. Third-party tag creatives are
   * creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY`
   * combined with following creative_type: * `CREATIVE_TYPE_STANDARD` *
   * `CREATIVE_TYPE_EXPANDABLE`
   */
  requireMraid?: boolean;
  /**
   * Optional. Indicates that the creative will wait for a return ping for
   * attribution. Only valid when using a Campaign Manager 360 tracking ad with
   * a third-party ad server parameter and the ${DC_DBM_TOKEN} macro. Optional
   * and only valid for third-party tag creatives or third-party VAST tag
   * creatives. Third-party tag creatives are creatives with following
   * hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following
   * creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`
   * Third-party VAST tag creatives are creatives with following hosting_source:
   * * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: *
   * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`
   */
  requirePingForAttribution?: boolean;
  /**
   * Output only. The current status of the creative review process.
   */
  readonly reviewStatus?: ReviewStatusInfo;
  /**
   * Amount of time to play the video before the skip button appears. This
   * field is required when skippable is true. This field is only supported for
   * the following creative_type: * `CREATIVE_TYPE_VIDEO`
   */
  skipOffset?: AudioVideoOffset;
  /**
   * Whether the user can choose to skip a video creative. This field is only
   * supported for the following creative_type: * `CREATIVE_TYPE_VIDEO`
   */
  skippable?: boolean;
  /**
   * Optional. The original third-party tag used for the creative. Required and
   * only valid for third-party tag creatives. Third-party tag creatives are
   * creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY`
   * combined with following creative_type: * `CREATIVE_TYPE_STANDARD` *
   * `CREATIVE_TYPE_EXPANDABLE`
   */
  thirdPartyTag?: string;
  /**
   * Tracking URLs from third parties to track interactions with a video
   * creative. This field is only supported for the following creative_type: *
   * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` *
   * `CREATIVE_TYPE_NATIVE_VIDEO`
   */
  thirdPartyUrls?: ThirdPartyUrl[];
  /**
   * Timer custom events for a rich media creative. Timers track the time
   * during which a user views and interacts with a specified part of a rich
   * media creative. A creative can have multiple timer events, each timed
   * independently. Leave it empty or unset for creatives containing image
   * assets only.
   */
  timerEvents?: TimerEvent[];
  /**
   * Tracking URLs for analytics providers or third-party ad technology
   * vendors. The URLs must start with https (except on inventory that doesn't
   * require SSL compliance). If using macros in your URL, use only macros
   * supported by Display & Video 360. Standard URLs only, no IMG or SCRIPT
   * tags. This field is only supported in following creative_type: *
   * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL` *
   * `CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`
   */
  trackerUrls?: string[];
  /**
   * Output only. Audio/Video transcodes. Display & Video 360 transcodes the
   * main asset into a number of alternative versions that use different file
   * formats or have different properties (resolution, audio bit rate, and video
   * bit rate), each designed for specific video players or bandwidths. These
   * transcodes give a publisher's system more options to choose from for each
   * impression on your video and ensures that the appropriate file serves based
   * on the viewer’s connection and screen size. This field is only supported in
   * following creative_type: * `CREATIVE_TYPE_VIDEO` *
   * `CREATIVE_TYPE_NATIVE_VIDEO` * `CREATIVE_TYPE_AUDIO`
   */
  readonly transcodes?: Transcode[];
  /**
   * Optional. An optional creative identifier provided by a registry that is
   * unique across all platforms. Universal Ad ID is part of the VAST 4.0
   * standard. It can be modified after the creative is created. This field is
   * only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO`
   */
  universalAdId?: UniversalAdId;
  /**
   * Output only. The timestamp when the creative was last updated, either by
   * the user or system (e.g. creative review). Assigned by the system.
   */
  readonly updateTime?: Date;
  /**
   * Optional. The URL of the VAST tag for a third-party VAST tag creative.
   * Required and only valid for third-party VAST tag creatives. Third-party
   * VAST tag creatives are creatives with following hosting_source: *
   * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: *
   * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`
   */
  vastTagUrl?: string;
  /**
   * Output only. Indicates the third-party VAST tag creative requires VPAID
   * (Digital Video Player-Ad Interface). Output only and only valid for
   * third-party VAST tag creatives. Third-party VAST tag creatives are
   * creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY`
   * combined with following creative_type: * `CREATIVE_TYPE_VIDEO`
   */
  readonly vpaid?: boolean;
}

function serializeCreative(data: any): Creative {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (serializeAssetAssociation(item))) : undefined,
    cmTrackingAd: data["cmTrackingAd"] !== undefined ? serializeCmTrackingAd(data["cmTrackingAd"]) : undefined,
    companionCreativeIds: data["companionCreativeIds"] !== undefined ? data["companionCreativeIds"].map((item: any) => (String(item))) : undefined,
    progressOffset: data["progressOffset"] !== undefined ? serializeAudioVideoOffset(data["progressOffset"]) : undefined,
    skipOffset: data["skipOffset"] !== undefined ? serializeAudioVideoOffset(data["skipOffset"]) : undefined,
  };
}

function deserializeCreative(data: any): Creative {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (deserializeAssetAssociation(item))) : undefined,
    cmPlacementId: data["cmPlacementId"] !== undefined ? BigInt(data["cmPlacementId"]) : undefined,
    cmTrackingAd: data["cmTrackingAd"] !== undefined ? deserializeCmTrackingAd(data["cmTrackingAd"]) : undefined,
    companionCreativeIds: data["companionCreativeIds"] !== undefined ? data["companionCreativeIds"].map((item: any) => (BigInt(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    creativeId: data["creativeId"] !== undefined ? BigInt(data["creativeId"]) : undefined,
    lineItemIds: data["lineItemIds"] !== undefined ? data["lineItemIds"].map((item: any) => (BigInt(item))) : undefined,
    mediaDuration: data["mediaDuration"] !== undefined ? data["mediaDuration"] : undefined,
    progressOffset: data["progressOffset"] !== undefined ? deserializeAudioVideoOffset(data["progressOffset"]) : undefined,
    skipOffset: data["skipOffset"] !== undefined ? deserializeAudioVideoOffset(data["skipOffset"]) : undefined,
    transcodes: data["transcodes"] !== undefined ? data["transcodes"].map((item: any) => (deserializeTranscode(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Creative requirements configuration for the inventory source.
 */
export interface CreativeConfig {
  /**
   * The type of creative that can be assigned to the inventory source. Only
   * the following types are supported: * `CREATIVE_TYPE_STANDARD` *
   * `CREATIVE_TYPE_VIDEO`
   */
  creativeType?:  | "CREATIVE_TYPE_UNSPECIFIED" | "CREATIVE_TYPE_STANDARD" | "CREATIVE_TYPE_EXPANDABLE" | "CREATIVE_TYPE_VIDEO" | "CREATIVE_TYPE_NATIVE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_SITE_SQUARE" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL" | "CREATIVE_TYPE_LIGHTBOX" | "CREATIVE_TYPE_NATIVE_APP_INSTALL" | "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE" | "CREATIVE_TYPE_AUDIO" | "CREATIVE_TYPE_PUBLISHER_HOSTED" | "CREATIVE_TYPE_NATIVE_VIDEO" | "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO";
  /**
   * The configuration for display creatives. Applicable when creative_type is
   * `CREATIVE_TYPE_STANDARD`.
   */
  displayCreativeConfig?: InventorySourceDisplayCreativeConfig;
  /**
   * The configuration for video creatives. Applicable when creative_type is
   * `CREATIVE_TYPE_VIDEO`.
   */
  videoCreativeConfig?: InventorySourceVideoCreativeConfig;
}

function serializeCreativeConfig(data: any): CreativeConfig {
  return {
    ...data,
    videoCreativeConfig: data["videoCreativeConfig"] !== undefined ? serializeInventorySourceVideoCreativeConfig(data["videoCreativeConfig"]) : undefined,
  };
}

function deserializeCreativeConfig(data: any): CreativeConfig {
  return {
    ...data,
    videoCreativeConfig: data["videoCreativeConfig"] !== undefined ? deserializeInventorySourceVideoCreativeConfig(data["videoCreativeConfig"]) : undefined,
  };
}

/**
 * A single custom bidding algorithm.
 */
export interface CustomBiddingAlgorithm {
  /**
   * Immutable. The unique ID of the advertiser that owns the custom bidding
   * algorithm.
   */
  advertiserId?: bigint;
  /**
   * Output only. The unique ID of the custom bidding algorithm. Assigned by
   * the system.
   */
  readonly customBiddingAlgorithmId?: bigint;
  /**
   * Required. Immutable. The type of custom bidding algorithm.
   */
  customBiddingAlgorithmType?:  | "CUSTOM_BIDDING_ALGORITHM_TYPE_UNSPECIFIED" | "SCRIPT_BASED" | "ADS_DATA_HUB_BASED" | "GOAL_BUILDER_BASED";
  /**
   * Required. The display name of the custom bidding algorithm. Must be UTF-8
   * encoded with a maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Controls whether or not the custom bidding algorithm can be used as a
   * bidding strategy. Accepted values are: * `ENTITY_STATUS_ACTIVE` *
   * `ENTITY_STATUS_ARCHIVED`
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Output only. The details of custom bidding models for each advertiser who
   * has access. This field may only include the details of the queried
   * advertiser if the algorithm
   * [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner)
   * is a partner and is being retrieved using an advertiser
   * [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor).
   */
  readonly modelDetails?: CustomBiddingModelDetails[];
  /**
   * Output only. The resource name of the custom bidding algorithm.
   */
  readonly name?: string;
  /**
   * Immutable. The unique ID of the partner that owns the custom bidding
   * algorithm.
   */
  partnerId?: bigint;
  /**
   * The IDs of the advertisers who have access to this algorithm. If
   * advertiser_id is set, this field will only consist of that value. This
   * field will not be set if the algorithm
   * [`owner`](/display-video/api/reference/rest/v1/customBiddingAlgorithms#CustomBiddingAlgorithm.FIELDS.oneof_owner)
   * is a partner and is being retrieved using an advertiser
   * [`accessor`](/display-video/api/reference/rest/v1/customBiddingAlgorithms/list#body.QUERY_PARAMETERS.oneof_accessor).
   */
  sharedAdvertiserIds?: bigint[];
}

function serializeCustomBiddingAlgorithm(data: any): CustomBiddingAlgorithm {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
    sharedAdvertiserIds: data["sharedAdvertiserIds"] !== undefined ? data["sharedAdvertiserIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeCustomBiddingAlgorithm(data: any): CustomBiddingAlgorithm {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    customBiddingAlgorithmId: data["customBiddingAlgorithmId"] !== undefined ? BigInt(data["customBiddingAlgorithmId"]) : undefined,
    modelDetails: data["modelDetails"] !== undefined ? data["modelDetails"].map((item: any) => (deserializeCustomBiddingModelDetails(item))) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    sharedAdvertiserIds: data["sharedAdvertiserIds"] !== undefined ? data["sharedAdvertiserIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customBiddingAlgorithmsGet.
 */
export interface CustomBiddingAlgorithmsGetOptions {
  /**
   * The ID of the DV360 partner that has access to the custom bidding
   * algorithm.
   */
  advertiserId?: bigint;
  /**
   * The ID of the DV360 partner that has access to the custom bidding
   * algorithm.
   */
  partnerId?: bigint;
}

function serializeCustomBiddingAlgorithmsGetOptions(data: any): CustomBiddingAlgorithmsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCustomBiddingAlgorithmsGetOptions(data: any): CustomBiddingAlgorithmsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customBiddingAlgorithmsList.
 */
export interface CustomBiddingAlgorithmsListOptions {
  /**
   * The ID of the DV360 advertiser that has access to the custom bidding
   * algorithm.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by custom bidding algorithm fields. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by `AND`. A sequence of restrictions * implicitly uses
   * `AND`. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `CONTAINS (:)` or `EQUALS (=)`. * The operator must be
   * `CONTAINS (:)` for the following field: - `displayName` * The operator must
   * be `EQUALS (=)` for the following field: - `customBiddingAlgorithmType` *
   * For `displayName`, the value is a string. We return all custom bidding
   * algorithms whose display_name contains such string. * For
   * `customBiddingAlgorithmType`, the value is a string. We return all
   * algorithms whose custom_bidding_algorithm_type is equal to the given type.
   * Examples: * All custom bidding algorithms for which the display name
   * contains "politics": `displayName:politics`. * All custom bidding
   * algorithms for which the type is "SCRIPT_BASED":
   * `customBiddingAlgorithmType=SCRIPT_BASED` The length of this field should
   * be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix "desc" should be added to the field name.
   * Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListCustomBiddingAlgorithms` method. If not specified, the first page of
   * results will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the DV360 partner that has access to the custom bidding
   * algorithm.
   */
  partnerId?: bigint;
}

function serializeCustomBiddingAlgorithmsListOptions(data: any): CustomBiddingAlgorithmsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCustomBiddingAlgorithmsListOptions(data: any): CustomBiddingAlgorithmsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customBiddingAlgorithmsPatch.
 */
export interface CustomBiddingAlgorithmsPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeCustomBiddingAlgorithmsPatchOptions(data: any): CustomBiddingAlgorithmsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCustomBiddingAlgorithmsPatchOptions(data: any): CustomBiddingAlgorithmsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customBiddingAlgorithmsScriptsCreate.
 */
export interface CustomBiddingAlgorithmsScriptsCreateOptions {
  /**
   * The ID of the advertiser that owns the parent custom bidding algorithm.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the parent custom bidding algorithm. Only
   * this partner will have write access to this custom bidding script.
   */
  partnerId?: bigint;
}

function serializeCustomBiddingAlgorithmsScriptsCreateOptions(data: any): CustomBiddingAlgorithmsScriptsCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCustomBiddingAlgorithmsScriptsCreateOptions(data: any): CustomBiddingAlgorithmsScriptsCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customBiddingAlgorithmsScriptsGet.
 */
export interface CustomBiddingAlgorithmsScriptsGetOptions {
  /**
   * The ID of the advertiser that owns the parent custom bidding algorithm.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the parent custom bidding algorithm. Only
   * this partner will have write access to this custom bidding script.
   */
  partnerId?: bigint;
}

function serializeCustomBiddingAlgorithmsScriptsGetOptions(data: any): CustomBiddingAlgorithmsScriptsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCustomBiddingAlgorithmsScriptsGetOptions(data: any): CustomBiddingAlgorithmsScriptsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customBiddingAlgorithmsScriptsList.
 */
export interface CustomBiddingAlgorithmsScriptsListOptions {
  /**
   * The ID of the advertiser that owns the parent custom bidding algorithm.
   */
  advertiserId?: bigint;
  /**
   * Field by which to sort the list. Acceptable values are: * `createTime
   * desc` (default) The default sorting order is descending. To specify
   * ascending order for a field, the suffix "desc" should be removed. Example:
   * `createTime`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListCustomBiddingScripts` method. If not specified, the first page of
   * results will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that owns the parent custom bidding algorithm. Only
   * this partner will have write access to this custom bidding script.
   */
  partnerId?: bigint;
}

function serializeCustomBiddingAlgorithmsScriptsListOptions(data: any): CustomBiddingAlgorithmsScriptsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCustomBiddingAlgorithmsScriptsListOptions(data: any): CustomBiddingAlgorithmsScriptsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customBiddingAlgorithmsUploadScript.
 */
export interface CustomBiddingAlgorithmsUploadScriptOptions {
  /**
   * The ID of the advertiser that owns the parent custom bidding algorithm.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the parent custom bidding algorithm. Only
   * this partner will have write access to this custom bidding script.
   */
  partnerId?: bigint;
}

function serializeCustomBiddingAlgorithmsUploadScriptOptions(data: any): CustomBiddingAlgorithmsUploadScriptOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeCustomBiddingAlgorithmsUploadScriptOptions(data: any): CustomBiddingAlgorithmsUploadScriptOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * The details of a custom bidding algorithm model for a single shared
 * advertiser.
 */
export interface CustomBiddingModelDetails {
  /**
   * The unique ID of the relevant advertiser.
   */
  advertiserId?: bigint;
  /**
   * The readiness state of custom bidding model.
   */
  readinessState?:  | "READINESS_STATE_UNSPECIFIED" | "READINESS_STATE_ACTIVE" | "READINESS_STATE_INSUFFICIENT_DATA" | "READINESS_STATE_TRAINING" | "READINESS_STATE_NO_VALID_SCRIPT";
  /**
   * Output only. The suspension state of custom bidding model.
   */
  readonly suspensionState?:  | "SUSPENSION_STATE_UNSPECIFIED" | "SUSPENSION_STATE_ENABLED" | "SUSPENSION_STATE_DORMANT" | "SUSPENSION_STATE_SUSPENDED";
}

function serializeCustomBiddingModelDetails(data: any): CustomBiddingModelDetails {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeCustomBiddingModelDetails(data: any): CustomBiddingModelDetails {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * A single custom bidding script.
 */
export interface CustomBiddingScript {
  /**
   * Output only. Whether the script is currently being used for scoring by the
   * parent algorithm.
   */
  readonly active?: boolean;
  /**
   * Output only. The time when the script was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The unique ID of the custom bidding algorithm the script
   * belongs to.
   */
  readonly customBiddingAlgorithmId?: bigint;
  /**
   * Output only. The unique ID of the custom bidding script.
   */
  readonly customBiddingScriptId?: bigint;
  /**
   * Output only. Error details of a rejected custom bidding script. This field
   * will only be populated when Script.state is REJECTED.
   */
  readonly errors?: ScriptError[];
  /**
   * Output only. The resource name of the custom bidding script.
   */
  readonly name?: string;
  /**
   * The reference to the uploaded script file.
   */
  script?: CustomBiddingScriptRef;
  /**
   * Output only. The state of the custom bidding script.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACCEPTED" | "REJECTED" | "PENDING";
}

/**
 * The reference to the uploaded custom bidding script file.
 */
export interface CustomBiddingScriptRef {
  /**
   * A resource name to be used in media.download to Download the script files.
   * Or media.upload to Upload the script files. Resource names have the format
   * `customBiddingAlgorithms/{custom_bidding_algorithm_id}/scriptRef/{ref_id}`.
   */
  resourceName?: string;
}

/**
 * The key and value of a custom label.
 */
export interface CustomLabel {
  /**
   * The key of the label.
   */
  key?:  | "CUSTOM_LABEL_KEY_UNSPECIFIED" | "CUSTOM_LABEL_KEY_0" | "CUSTOM_LABEL_KEY_1" | "CUSTOM_LABEL_KEY_2" | "CUSTOM_LABEL_KEY_3" | "CUSTOM_LABEL_KEY_4";
  /**
   * The value of the label.
   */
  value?: string;
}

/**
 * Describes a custom list entity, such as a custom affinity or custom intent
 * audience list.
 */
export interface CustomList {
  /**
   * Output only. The unique ID of the custom list. Assigned by the system.
   */
  readonly customListId?: bigint;
  /**
   * Output only. The display name of the custom list. .
   */
  readonly displayName?: string;
  /**
   * Output only. The resource name of the custom list.
   */
  readonly name?: string;
}

/**
 * Details of custom list group. All custom list targeting settings are
 * logically ‘OR’ of each other.
 */
export interface CustomListGroup {
  /**
   * Required. All custom list targeting settings in custom list group.
   * Repeated settings with same id will be ignored.
   */
  settings?: CustomListTargetingSetting[];
}

function serializeCustomListGroup(data: any): CustomListGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (serializeCustomListTargetingSetting(item))) : undefined,
  };
}

function deserializeCustomListGroup(data: any): CustomListGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (deserializeCustomListTargetingSetting(item))) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customListsGet.
 */
export interface CustomListsGetOptions {
  /**
   * The ID of the DV360 advertiser that has access to the fetched custom
   * lists.
   */
  advertiserId?: bigint;
}

function serializeCustomListsGetOptions(data: any): CustomListsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeCustomListsGetOptions(data: any): CustomListsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#customListsList.
 */
export interface CustomListsListOptions {
  /**
   * The ID of the DV360 advertiser that has access to the fetched custom
   * lists.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by custom list fields. Supported syntax: * Filter
   * expressions for custom lists currently can only contain at most one
   * restriction. * A restriction has the form of `{field} {operator} {value}`.
   * * The operator must be `CONTAINS (:)`. * Supported fields: - `displayName`
   * Examples: * All custom lists for which the display name contains "Google":
   * `displayName : "Google"`. The length of this field should be no more than
   * 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `customListId`
   * (default) * `displayName` The default sorting order is ascending. To
   * specify descending order for a field, a suffix "desc" should be added to
   * the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListCustomLists` method. If not specified, the first page of results will
   * be returned.
   */
  pageToken?: string;
}

function serializeCustomListsListOptions(data: any): CustomListsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeCustomListsListOptions(data: any): CustomListsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Details of custom list targeting setting.
 */
export interface CustomListTargetingSetting {
  /**
   * Required. Custom id of custom list targeting setting. This id is
   * custom_list_id.
   */
  customListId?: bigint;
}

function serializeCustomListTargetingSetting(data: any): CustomListTargetingSetting {
  return {
    ...data,
    customListId: data["customListId"] !== undefined ? String(data["customListId"]) : undefined,
  };
}

function deserializeCustomListTargetingSetting(data: any): CustomListTargetingSetting {
  return {
    ...data,
    customListId: data["customListId"] !== undefined ? BigInt(data["customListId"]) : undefined,
  };
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
export interface Date {
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
 * A date range.
 */
export interface DateRange {
  /**
   * The upper bound of the date range, inclusive. Must specify a positive
   * value for `year`, `month`, and `day`.
   */
  endDate?: Date;
  /**
   * The lower bound of the date range, inclusive. Must specify a positive
   * value for `year`, `month`, and `day`.
   */
  startDate?: Date;
}

/**
 * Representation of a segment of time defined on a specific day of the week
 * and with a start and end time. The time represented by `start_hour` must be
 * before the time represented by `end_hour`.
 */
export interface DayAndTimeAssignedTargetingOptionDetails {
  /**
   * Required. The day of the week for this day and time targeting setting.
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Required. The end hour for day and time targeting. Must be between 1 (1
   * hour after start of day) and 24 (end of day).
   */
  endHour?: number;
  /**
   * Required. The start hour for day and time targeting. Must be between 0
   * (start of day) and 23 (1 hour before end of day).
   */
  startHour?: number;
  /**
   * Required. The mechanism used to determine which timezone to use for this
   * day and time targeting setting.
   */
  timeZoneResolution?:  | "TIME_ZONE_RESOLUTION_UNSPECIFIED" | "TIME_ZONE_RESOLUTION_END_USER" | "TIME_ZONE_RESOLUTION_ADVERTISER";
}

/**
 * Request message for ManualTriggerService.DeactivateManualTrigger.
 */
export interface DeactivateManualTriggerRequest {
}

/**
 * A request listing which assigned targeting options of a given targeting type
 * should be deleted.
 */
export interface DeleteAssignedTargetingOptionsRequest {
  /**
   * Required. The assigned targeting option IDs to delete.
   */
  assignedTargetingOptionIds?: string[];
  /**
   * Required. Identifies the type of this assigned targeting option.
   */
  targetingType?:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION";
}

/**
 * Assigned device make and model targeting option details. This will be
 * populated in the device_make_model_details field when targeting_type is
 * `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
 */
export interface DeviceMakeModelAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the device make and model.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable device make and model. This will be populated in the
 * device_make_model_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_DEVICE_MAKE_MODEL`.
 */
export interface DeviceMakeModelTargetingOptionDetails {
  /**
   * Output only. The display name of the device make and model.
   */
  readonly displayName?: string;
}

/**
 * Targeting details for device type. This will be populated in the details
 * field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_DEVICE_TYPE`.
 */
export interface DeviceTypeAssignedTargetingOptionDetails {
  /**
   * The display name of the device type. Output only in v1. Required in v2.
   */
  deviceType?:  | "DEVICE_TYPE_UNSPECIFIED" | "DEVICE_TYPE_COMPUTER" | "DEVICE_TYPE_CONNECTED_TV" | "DEVICE_TYPE_SMART_PHONE" | "DEVICE_TYPE_TABLET";
  /**
   * Output only. Bid multiplier allows you to show your ads more or less
   * frequently based on the device type. It will apply a multiplier on the
   * original bid price. When this field is 0, it indicates this field is not
   * applicable instead of multiplying 0 on the original bid price. For example,
   * if the bid price without multiplier is $10.0 and the multiplier is 1.5 for
   * Tablet, the resulting bid price for Tablet will be $15.0. Only applicable
   * to YouTube and Partners line items.
   */
  readonly youtubeAndPartnersBidMultiplier?: number;
}

/**
 * Represents a targetable device type. This will be populated in the
 * device_type_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_DEVICE_TYPE`.
 */
export interface DeviceTypeTargetingOptionDetails {
  /**
   * Output only. The device type that is used to be targeted.
   */
  readonly deviceType?:  | "DEVICE_TYPE_UNSPECIFIED" | "DEVICE_TYPE_COMPUTER" | "DEVICE_TYPE_CONNECTED_TV" | "DEVICE_TYPE_SMART_PHONE" | "DEVICE_TYPE_TABLET";
}

/**
 * Targeting details for digital content label. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`.
 */
export interface DigitalContentLabelAssignedTargetingOptionDetails {
  /**
   * Required. The display name of the digital content label rating tier to be
   * EXCLUDED.
   */
  excludedContentRatingTier?:  | "CONTENT_RATING_TIER_UNSPECIFIED" | "CONTENT_RATING_TIER_UNRATED" | "CONTENT_RATING_TIER_GENERAL" | "CONTENT_RATING_TIER_PARENTAL_GUIDANCE" | "CONTENT_RATING_TIER_TEENS" | "CONTENT_RATING_TIER_MATURE" | "CONTENT_RATING_TIER_FAMILIES";
}

/**
 * Represents a targetable digital content label rating tier. This will be
 * populated in the digital_content_label_details field of the TargetingOption
 * when targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`.
 */
export interface DigitalContentLabelTargetingOptionDetails {
  /**
   * Output only. An enum for the content label brand safety tiers.
   */
  readonly contentRatingTier?:  | "CONTENT_RATING_TIER_UNSPECIFIED" | "CONTENT_RATING_TIER_UNRATED" | "CONTENT_RATING_TIER_GENERAL" | "CONTENT_RATING_TIER_PARENTAL_GUIDANCE" | "CONTENT_RATING_TIER_TEENS" | "CONTENT_RATING_TIER_MATURE" | "CONTENT_RATING_TIER_FAMILIES";
}

/**
 * Dimensions.
 */
export interface Dimensions {
  /**
   * The height in pixels.
   */
  heightPixels?: number;
  /**
   * The width in pixels.
   */
  widthPixels?: number;
}

/**
 * The ad sourced from a DV360 creative.
 */
export interface DisplayVideoSourceAd {
  /**
   * The ID of the source creative.
   */
  creativeId?: bigint;
}

function serializeDisplayVideoSourceAd(data: any): DisplayVideoSourceAd {
  return {
    ...data,
    creativeId: data["creativeId"] !== undefined ? String(data["creativeId"]) : undefined,
  };
}

function deserializeDisplayVideoSourceAd(data: any): DisplayVideoSourceAd {
  return {
    ...data,
    creativeId: data["creativeId"] !== undefined ? BigInt(data["creativeId"]) : undefined,
  };
}

/**
 * Details of DoubleVerify settings.
 */
export interface DoubleVerify {
  /**
   * Avoid bidding on apps with the star ratings.
   */
  appStarRating?: DoubleVerifyAppStarRating;
  /**
   * Avoid bidding on apps with the age rating.
   */
  avoidedAgeRatings?:  | "AGE_RATING_UNSPECIFIED" | "APP_AGE_RATE_UNKNOWN" | "APP_AGE_RATE_4_PLUS" | "APP_AGE_RATE_9_PLUS" | "APP_AGE_RATE_12_PLUS" | "APP_AGE_RATE_17_PLUS" | "APP_AGE_RATE_18_PLUS"[];
  /**
   * DV Brand Safety Controls.
   */
  brandSafetyCategories?: DoubleVerifyBrandSafetyCategories;
  /**
   * The custom segment ID provided by DoubleVerify. The ID must start with
   * "51" and consist of eight digits. Custom segment ID cannot be specified
   * along with any of the following fields: * brand_safety_categories *
   * avoided_age_ratings * app_star_rating * fraud_invalid_traffic
   */
  customSegmentId?: bigint;
  /**
   * Display viewability settings (applicable to display line items only).
   */
  displayViewability?: DoubleVerifyDisplayViewability;
  /**
   * Avoid Sites and Apps with historical Fraud & IVT Rates.
   */
  fraudInvalidTraffic?: DoubleVerifyFraudInvalidTraffic;
  /**
   * Video viewability settings (applicable to video line items only).
   */
  videoViewability?: DoubleVerifyVideoViewability;
}

function serializeDoubleVerify(data: any): DoubleVerify {
  return {
    ...data,
    customSegmentId: data["customSegmentId"] !== undefined ? String(data["customSegmentId"]) : undefined,
  };
}

function deserializeDoubleVerify(data: any): DoubleVerify {
  return {
    ...data,
    customSegmentId: data["customSegmentId"] !== undefined ? BigInt(data["customSegmentId"]) : undefined,
  };
}

/**
 * Details of DoubleVerify star ratings settings.
 */
export interface DoubleVerifyAppStarRating {
  /**
   * Avoid bidding on apps with the star ratings.
   */
  avoidedStarRating?:  | "APP_STAR_RATE_UNSPECIFIED" | "APP_STAR_RATE_1_POINT_5_LESS" | "APP_STAR_RATE_2_LESS" | "APP_STAR_RATE_2_POINT_5_LESS" | "APP_STAR_RATE_3_LESS" | "APP_STAR_RATE_3_POINT_5_LESS" | "APP_STAR_RATE_4_LESS" | "APP_STAR_RATE_4_POINT_5_LESS";
  /**
   * Avoid bidding on apps with insufficient star ratings.
   */
  avoidInsufficientStarRating?: boolean;
}

/**
 * Settings for brand safety controls.
 */
export interface DoubleVerifyBrandSafetyCategories {
  /**
   * Brand safety high severity avoidance categories.
   */
  avoidedHighSeverityCategories?:  | "HIGHER_SEVERITY_UNSPECIFIED" | "ADULT_CONTENT_PORNOGRAPHY" | "COPYRIGHT_INFRINGEMENT" | "SUBSTANCE_ABUSE" | "GRAPHIC_VIOLENCE_WEAPONS" | "HATE_PROFANITY" | "CRIMINAL_SKILLS" | "NUISANCE_INCENTIVIZED_MALWARE_CLUTTER"[];
  /**
   * Brand safety medium severity avoidance categories.
   */
  avoidedMediumSeverityCategories?:  | "MEDIUM_SEVERITY_UNSPECIFIED" | "AD_SERVERS" | "ADULT_CONTENT_SWIMSUIT" | "ALTERNATIVE_LIFESTYLES" | "CELEBRITY_GOSSIP" | "GAMBLING" | "OCCULT" | "SEX_EDUCATION" | "DISASTER_AVIATION" | "DISASTER_MAN_MADE" | "DISASTER_NATURAL" | "DISASTER_TERRORIST_EVENTS" | "DISASTER_VEHICLE" | "ALCOHOL" | "SMOKING" | "NEGATIVE_NEWS_FINANCIAL" | "NON_ENGLISH" | "PARKING_PAGE" | "UNMODERATED_UGC" | "INFLAMMATORY_POLITICS_AND_NEWS" | "NEGATIVE_NEWS_PHARMACEUTICAL"[];
  /**
   * Unknown or unrateable.
   */
  avoidUnknownBrandSafetyCategory?: boolean;
}

/**
 * Details of DoubleVerify display viewability settings.
 */
export interface DoubleVerifyDisplayViewability {
  /**
   * Target web and app inventory to maximize IAB viewable rate.
   */
  iab?:  | "IAB_VIEWED_RATE_UNSPECIFIED" | "IAB_VIEWED_RATE_80_PERCENT_HIGHER" | "IAB_VIEWED_RATE_75_PERCENT_HIGHER" | "IAB_VIEWED_RATE_70_PERCENT_HIGHER" | "IAB_VIEWED_RATE_65_PERCENT_HIGHER" | "IAB_VIEWED_RATE_60_PERCENT_HIGHER" | "IAB_VIEWED_RATE_55_PERCENT_HIGHER" | "IAB_VIEWED_RATE_50_PERCENT_HIGHER" | "IAB_VIEWED_RATE_40_PERCENT_HIGHER" | "IAB_VIEWED_RATE_30_PERCENT_HIGHER";
  /**
   * Target web and app inventory to maximize 100% viewable duration.
   */
  viewableDuring?:  | "AVERAGE_VIEW_DURATION_UNSPECIFIED" | "AVERAGE_VIEW_DURATION_5_SEC" | "AVERAGE_VIEW_DURATION_10_SEC" | "AVERAGE_VIEW_DURATION_15_SEC";
}

/**
 * DoubleVerify Fraud & Invalid Traffic settings.
 */
export interface DoubleVerifyFraudInvalidTraffic {
  /**
   * Avoid Sites and Apps with historical Fraud & IVT.
   */
  avoidedFraudOption?:  | "FRAUD_UNSPECIFIED" | "AD_IMPRESSION_FRAUD_100" | "AD_IMPRESSION_FRAUD_50" | "AD_IMPRESSION_FRAUD_25" | "AD_IMPRESSION_FRAUD_10" | "AD_IMPRESSION_FRAUD_8" | "AD_IMPRESSION_FRAUD_6" | "AD_IMPRESSION_FRAUD_4" | "AD_IMPRESSION_FRAUD_2";
  /**
   * Insufficient Historical Fraud & IVT Stats.
   */
  avoidInsufficientOption?: boolean;
}

/**
 * Details of DoubleVerify video viewability settings.
 */
export interface DoubleVerifyVideoViewability {
  /**
   * Target inventory to maximize impressions with 400x300 or greater player
   * size.
   */
  playerImpressionRate?:  | "PLAYER_SIZE_400X300_UNSPECIFIED" | "PLAYER_SIZE_400X300_95" | "PLAYER_SIZE_400X300_70" | "PLAYER_SIZE_400X300_25" | "PLAYER_SIZE_400X300_5";
  /**
   * Target web inventory to maximize IAB viewable rate.
   */
  videoIab?:  | "VIDEO_IAB_UNSPECIFIED" | "IAB_VIEWABILITY_80_PERCENT_HIGHER" | "IAB_VIEWABILITY_75_PERCENT_HIGHER" | "IAB_VIEWABILITY_70_PERCENT_HIGHER" | "IAB_VIEWABILITY_65_PERCENT_HIHGER" | "IAB_VIEWABILITY_60_PERCENT_HIGHER" | "IAB_VIEWABILITY_55_PERCENT_HIHGER" | "IAB_VIEWABILITY_50_PERCENT_HIGHER" | "IAB_VIEWABILITY_40_PERCENT_HIHGER" | "IAB_VIEWABILITY_30_PERCENT_HIHGER";
  /**
   * Target web inventory to maximize fully viewable rate.
   */
  videoViewableRate?:  | "VIDEO_VIEWABLE_RATE_UNSPECIFIED" | "VIEWED_PERFORMANCE_40_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_35_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_30_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_25_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_20_PERCENT_HIGHER" | "VIEWED_PERFORMANCE_10_PERCENT_HIGHER";
}

/**
 * Request message for LineItemService.DuplicateLineItem.
 */
export interface DuplicateLineItemRequest {
  /**
   * The display name of the new line item. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  targetDisplayName?: string;
}

export interface DuplicateLineItemResponse {
  /**
   * The ID of the created line item.
   */
  duplicateLineItemId?: bigint;
}

function serializeDuplicateLineItemResponse(data: any): DuplicateLineItemResponse {
  return {
    ...data,
    duplicateLineItemId: data["duplicateLineItemId"] !== undefined ? String(data["duplicateLineItemId"]) : undefined,
  };
}

function deserializeDuplicateLineItemResponse(data: any): DuplicateLineItemResponse {
  return {
    ...data,
    duplicateLineItemId: data["duplicateLineItemId"] !== undefined ? BigInt(data["duplicateLineItemId"]) : undefined,
  };
}

/**
 * Request message for
 * FirstAndThirdPartyAudienceService.EditCustomerMatchMembers.
 */
export interface EditCustomerMatchMembersRequest {
  /**
   * Input only. A list of contact information to define the members to be
   * added.
   */
  addedContactInfoList?: ContactInfoList;
  /**
   * Input only. A list of mobile device IDs to define the members to be added.
   */
  addedMobileDeviceIdList?: MobileDeviceIdList;
  /**
   * Required. The ID of the owner advertiser of the updated Customer Match
   * FirstAndThirdPartyAudience.
   */
  advertiserId?: bigint;
}

function serializeEditCustomerMatchMembersRequest(data: any): EditCustomerMatchMembersRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeEditCustomerMatchMembersRequest(data: any): EditCustomerMatchMembersRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * The response of FirstAndThirdPartyAudienceService.EditCustomerMatchMembers.
 */
export interface EditCustomerMatchMembersResponse {
  /**
   * Required. The ID of the updated Customer Match FirstAndThirdPartyAudience.
   */
  firstAndThirdPartyAudienceId?: bigint;
}

function serializeEditCustomerMatchMembersResponse(data: any): EditCustomerMatchMembersResponse {
  return {
    ...data,
    firstAndThirdPartyAudienceId: data["firstAndThirdPartyAudienceId"] !== undefined ? String(data["firstAndThirdPartyAudienceId"]) : undefined,
  };
}

function deserializeEditCustomerMatchMembersResponse(data: any): EditCustomerMatchMembersResponse {
  return {
    ...data,
    firstAndThirdPartyAudienceId: data["firstAndThirdPartyAudienceId"] !== undefined ? BigInt(data["firstAndThirdPartyAudienceId"]) : undefined,
  };
}

/**
 * Request message for GuaranteedOrderService.EditGuaranteedOrderReadAccessors.
 */
export interface EditGuaranteedOrderReadAccessorsRequest {
  /**
   * The advertisers to add as read accessors to the guaranteed order.
   */
  addedAdvertisers?: bigint[];
  /**
   * Required. The partner context in which the change is being made.
   */
  partnerId?: bigint;
  /**
   * Whether to give all advertisers of the read/write accessor partner read
   * access to the guaranteed order. Only applicable if read_write_partner_id is
   * set in the guaranteed order.
   */
  readAccessInherited?: boolean;
  /**
   * The advertisers to remove as read accessors to the guaranteed order.
   */
  removedAdvertisers?: bigint[];
}

function serializeEditGuaranteedOrderReadAccessorsRequest(data: any): EditGuaranteedOrderReadAccessorsRequest {
  return {
    ...data,
    addedAdvertisers: data["addedAdvertisers"] !== undefined ? data["addedAdvertisers"].map((item: any) => (String(item))) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
    removedAdvertisers: data["removedAdvertisers"] !== undefined ? data["removedAdvertisers"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeEditGuaranteedOrderReadAccessorsRequest(data: any): EditGuaranteedOrderReadAccessorsRequest {
  return {
    ...data,
    addedAdvertisers: data["addedAdvertisers"] !== undefined ? data["addedAdvertisers"].map((item: any) => (BigInt(item))) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    removedAdvertisers: data["removedAdvertisers"] !== undefined ? data["removedAdvertisers"].map((item: any) => (BigInt(item))) : undefined,
  };
}

export interface EditGuaranteedOrderReadAccessorsResponse {
  /**
   * Whether all advertisers of read_write_partner_id have read access to the
   * guaranteed order.
   */
  readAccessInherited?: boolean;
  /**
   * The IDs of advertisers with read access to the guaranteed order.
   */
  readAdvertiserIds?: bigint[];
}

function serializeEditGuaranteedOrderReadAccessorsResponse(data: any): EditGuaranteedOrderReadAccessorsResponse {
  return {
    ...data,
    readAdvertiserIds: data["readAdvertiserIds"] !== undefined ? data["readAdvertiserIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeEditGuaranteedOrderReadAccessorsResponse(data: any): EditGuaranteedOrderReadAccessorsResponse {
  return {
    ...data,
    readAdvertiserIds: data["readAdvertiserIds"] !== undefined ? data["readAdvertiserIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Request message for
 * InventorySourceService.EditInventorySourceReadWriteAccessors.
 */
export interface EditInventorySourceReadWriteAccessorsRequest {
  /**
   * The advertisers to add or remove from the list of advertisers that have
   * read/write access to the inventory source. This change will remove an
   * existing partner read/write accessor.
   */
  advertisersUpdate?: EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate;
  /**
   * Set the partner context as read/write accessor of the inventory source.
   * This will remove all other current read/write advertiser accessors.
   */
  assignPartner?: boolean;
  /**
   * Required. The partner context by which the accessors change is being made.
   */
  partnerId?: bigint;
}

function serializeEditInventorySourceReadWriteAccessorsRequest(data: any): EditInventorySourceReadWriteAccessorsRequest {
  return {
    ...data,
    advertisersUpdate: data["advertisersUpdate"] !== undefined ? serializeEditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate(data["advertisersUpdate"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeEditInventorySourceReadWriteAccessorsRequest(data: any): EditInventorySourceReadWriteAccessorsRequest {
  return {
    ...data,
    advertisersUpdate: data["advertisersUpdate"] !== undefined ? deserializeEditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate(data["advertisersUpdate"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Update to the list of advertisers with read/write access to the inventory
 * source.
 */
export interface EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate {
  /**
   * The advertisers to add.
   */
  addedAdvertisers?: bigint[];
  /**
   * The advertisers to remove.
   */
  removedAdvertisers?: bigint[];
}

function serializeEditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate(data: any): EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate {
  return {
    ...data,
    addedAdvertisers: data["addedAdvertisers"] !== undefined ? data["addedAdvertisers"].map((item: any) => (String(item))) : undefined,
    removedAdvertisers: data["removedAdvertisers"] !== undefined ? data["removedAdvertisers"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeEditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate(data: any): EditInventorySourceReadWriteAccessorsRequestAdvertisersUpdate {
  return {
    ...data,
    addedAdvertisers: data["addedAdvertisers"] !== undefined ? data["addedAdvertisers"].map((item: any) => (BigInt(item))) : undefined,
    removedAdvertisers: data["removedAdvertisers"] !== undefined ? data["removedAdvertisers"].map((item: any) => (BigInt(item))) : undefined,
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
 * Assigned environment targeting option details. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_ENVIRONMENT`.
 */
export interface EnvironmentAssignedTargetingOptionDetails {
  /**
   * The serving environment. Output only in v1. Required in v2.
   */
  environment?:  | "ENVIRONMENT_UNSPECIFIED" | "ENVIRONMENT_WEB_OPTIMIZED" | "ENVIRONMENT_WEB_NOT_OPTIMIZED" | "ENVIRONMENT_APP";
}

/**
 * Represents a targetable environment. This will be populated in the
 * environment_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_ENVIRONMENT`.
 */
export interface EnvironmentTargetingOptionDetails {
  /**
   * Output only. The serving environment.
   */
  readonly environment?:  | "ENVIRONMENT_UNSPECIFIED" | "ENVIRONMENT_WEB_OPTIMIZED" | "ENVIRONMENT_WEB_NOT_OPTIMIZED" | "ENVIRONMENT_APP";
}

/**
 * Details for assigned exchange targeting option. This will be populated in
 * the details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_EXCHANGE`.
 */
export interface ExchangeAssignedTargetingOptionDetails {
  /**
   * Required. The enum value for the exchange.
   */
  exchange?:  | "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX";
}

/**
 * Settings that control which exchanges are enabled for a partner.
 */
export interface ExchangeConfig {
  /**
   * All enabled exchanges in the partner. Duplicate enabled exchanges will be
   * ignored.
   */
  enabledExchanges?: ExchangeConfigEnabledExchange[];
}

/**
 * An enabled exchange in the partner.
 */
export interface ExchangeConfigEnabledExchange {
  /**
   * The enabled exchange.
   */
  exchange?:  | "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX";
  /**
   * Output only. Agency ID of Google Ad Manager. The field is only relevant
   * when Google Ad Manager is the enabled exchange.
   */
  readonly googleAdManagerAgencyId?: string;
  /**
   * Output only. Network ID of Google Ad Manager. The field is only relevant
   * when Google Ad Manager is the enabled exchange.
   */
  readonly googleAdManagerBuyerNetworkId?: string;
  /**
   * Output only. Seat ID of the enabled exchange.
   */
  readonly seatId?: string;
}

/**
 * Exchange review status for the creative.
 */
export interface ExchangeReviewStatus {
  /**
   * The exchange reviewing the creative.
   */
  exchange?:  | "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX";
  /**
   * Status of the exchange review.
   */
  status?:  | "REVIEW_STATUS_UNSPECIFIED" | "REVIEW_STATUS_APPROVED" | "REVIEW_STATUS_REJECTED" | "REVIEW_STATUS_PENDING";
}

/**
 * Represents a targetable exchange. This will be populated in the
 * exchange_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_EXCHANGE`.
 */
export interface ExchangeTargetingOptionDetails {
  /**
   * Output only. The type of exchange.
   */
  readonly exchange?:  | "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX";
}

/**
 * Exit event of the creative.
 */
export interface ExitEvent {
  /**
   * The name of the click tag of the exit event. The name must be unique
   * within one creative. Leave it empty or unset for creatives containing image
   * assets only.
   */
  name?: string;
  /**
   * The name used to identify this event in reports. Leave it empty or unset
   * for creatives containing image assets only.
   */
  reportingName?: string;
  /**
   * Required. The type of the exit event.
   */
  type?:  | "EXIT_EVENT_TYPE_UNSPECIFIED" | "EXIT_EVENT_TYPE_DEFAULT" | "EXIT_EVENT_TYPE_BACKUP";
  /**
   * Required. The click through URL of the exit event. This is required when
   * type is: * `EXIT_EVENT_TYPE_DEFAULT` * `EXIT_EVENT_TYPE_BACKUP`
   */
  url?: string;
}

/**
 * Describes a first or third party audience list used for targeting. First
 * party audiences are created via usage of client data. Third party audiences
 * are provided by Third Party data providers and can only be licensed to
 * customers.
 */
export interface FirstAndThirdPartyAudience {
  /**
   * Output only. The estimated audience size for the Display network in the
   * past month. If the size is less than 1000, the number will be hidden and 0
   * will be returned due to privacy reasons. Otherwise, the number will be
   * rounded off to two significant digits. Only returned in GET request.
   */
  readonly activeDisplayAudienceSize?: bigint;
  /**
   * The app_id matches with the type of the mobile_device_ids being uploaded.
   * Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID`
   */
  appId?: string;
  /**
   * Output only. The source of the audience.
   */
  readonly audienceSource?:  | "AUDIENCE_SOURCE_UNSPECIFIED" | "DISPLAY_VIDEO_360" | "CAMPAIGN_MANAGER" | "AD_MANAGER" | "SEARCH_ADS_360" | "YOUTUBE" | "ADS_DATA_HUB";
  /**
   * The type of the audience.
   */
  audienceType?:  | "AUDIENCE_TYPE_UNSPECIFIED" | "CUSTOMER_MATCH_CONTACT_INFO" | "CUSTOMER_MATCH_DEVICE_ID" | "CUSTOMER_MATCH_USER_ID" | "ACTIVITY_BASED" | "FREQUENCY_CAP" | "TAG_BASED" | "YOUTUBE_USERS" | "LICENSED";
  /**
   * Input only. A list of contact information to define the initial audience
   * members. Only applicable to audience_type `CUSTOMER_MATCH_CONTACT_INFO`
   */
  contactInfoList?: ContactInfoList;
  /**
   * The user-provided description of the audience. Only applicable to first
   * party audiences.
   */
  description?: string;
  /**
   * Output only. The estimated audience size for the Display network. If the
   * size is less than 1000, the number will be hidden and 0 will be returned
   * due to privacy reasons. Otherwise, the number will be rounded off to two
   * significant digits. Only returned in GET request.
   */
  readonly displayAudienceSize?: bigint;
  /**
   * Output only. The estimated desktop audience size in Display network. If
   * the size is less than 1000, the number will be hidden and 0 will be
   * returned due to privacy reasons. Otherwise, the number will be rounded off
   * to two significant digits. Only applicable to first party audiences. Only
   * returned in GET request.
   */
  readonly displayDesktopAudienceSize?: bigint;
  /**
   * Output only. The estimated mobile app audience size in Display network. If
   * the size is less than 1000, the number will be hidden and 0 will be
   * returned due to privacy reasons. Otherwise, the number will be rounded off
   * to two significant digits. Only applicable to first party audiences. Only
   * returned in GET request.
   */
  readonly displayMobileAppAudienceSize?: bigint;
  /**
   * Output only. The estimated mobile web audience size in Display network. If
   * the size is less than 1000, the number will be hidden and 0 will be
   * returned due to privacy reasons. Otherwise, the number will be rounded off
   * to two significant digits. Only applicable to first party audiences. Only
   * returned in GET request.
   */
  readonly displayMobileWebAudienceSize?: bigint;
  /**
   * The display name of the first and third party audience.
   */
  displayName?: string;
  /**
   * Output only. The unique ID of the first and third party audience. Assigned
   * by the system.
   */
  readonly firstAndThirdPartyAudienceId?: bigint;
  /**
   * Whether the audience is a first or third party audience.
   */
  firstAndThirdPartyAudienceType?:  | "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_UNSPECIFIED" | "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_FIRST_PARTY" | "FIRST_AND_THIRD_PARTY_AUDIENCE_TYPE_THIRD_PARTY";
  /**
   * Output only. The estimated audience size for Gmail network. If the size is
   * less than 1000, the number will be hidden and 0 will be returned due to
   * privacy reasons. Otherwise, the number will be rounded off to two
   * significant digits. Only applicable to first party audiences. Only returned
   * in GET request.
   */
  readonly gmailAudienceSize?: bigint;
  /**
   * The duration in days that an entry remains in the audience after the
   * qualifying event. If the audience has no expiration, set the value of this
   * field to 10000. Otherwise, the set value must be greater than 0 and less
   * than or equal to 540. Only applicable to first party audiences. This field
   * is required if one of the following audience_type is used: *
   * `CUSTOMER_MATCH_CONTACT_INFO` * `CUSTOMER_MATCH_DEVICE_ID`
   */
  membershipDurationDays?: bigint;
  /**
   * Input only. A list of mobile device IDs to define the initial audience
   * members. Only applicable to audience_type `CUSTOMER_MATCH_DEVICE_ID`
   */
  mobileDeviceIdList?: MobileDeviceIdList;
  /**
   * Output only. The resource name of the first and third party audience.
   */
  readonly name?: string;
  /**
   * Output only. The estimated audience size for YouTube network. If the size
   * is less than 1000, the number will be hidden and 0 will be returned due to
   * privacy reasons. Otherwise, the number will be rounded off to two
   * significant digits. Only applicable to first party audiences. Only returned
   * in GET request.
   */
  readonly youtubeAudienceSize?: bigint;
}

function serializeFirstAndThirdPartyAudience(data: any): FirstAndThirdPartyAudience {
  return {
    ...data,
    membershipDurationDays: data["membershipDurationDays"] !== undefined ? String(data["membershipDurationDays"]) : undefined,
  };
}

function deserializeFirstAndThirdPartyAudience(data: any): FirstAndThirdPartyAudience {
  return {
    ...data,
    activeDisplayAudienceSize: data["activeDisplayAudienceSize"] !== undefined ? BigInt(data["activeDisplayAudienceSize"]) : undefined,
    displayAudienceSize: data["displayAudienceSize"] !== undefined ? BigInt(data["displayAudienceSize"]) : undefined,
    displayDesktopAudienceSize: data["displayDesktopAudienceSize"] !== undefined ? BigInt(data["displayDesktopAudienceSize"]) : undefined,
    displayMobileAppAudienceSize: data["displayMobileAppAudienceSize"] !== undefined ? BigInt(data["displayMobileAppAudienceSize"]) : undefined,
    displayMobileWebAudienceSize: data["displayMobileWebAudienceSize"] !== undefined ? BigInt(data["displayMobileWebAudienceSize"]) : undefined,
    firstAndThirdPartyAudienceId: data["firstAndThirdPartyAudienceId"] !== undefined ? BigInt(data["firstAndThirdPartyAudienceId"]) : undefined,
    gmailAudienceSize: data["gmailAudienceSize"] !== undefined ? BigInt(data["gmailAudienceSize"]) : undefined,
    membershipDurationDays: data["membershipDurationDays"] !== undefined ? BigInt(data["membershipDurationDays"]) : undefined,
    youtubeAudienceSize: data["youtubeAudienceSize"] !== undefined ? BigInt(data["youtubeAudienceSize"]) : undefined,
  };
}

/**
 * Details of first and third party audience group. All first and third party
 * audience targeting settings are logically ‘OR’ of each other.
 */
export interface FirstAndThirdPartyAudienceGroup {
  /**
   * Required. All first and third party audience targeting settings in first
   * and third party audience group. Repeated settings with same id are not
   * allowed.
   */
  settings?: FirstAndThirdPartyAudienceTargetingSetting[];
}

function serializeFirstAndThirdPartyAudienceGroup(data: any): FirstAndThirdPartyAudienceGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (serializeFirstAndThirdPartyAudienceTargetingSetting(item))) : undefined,
  };
}

function deserializeFirstAndThirdPartyAudienceGroup(data: any): FirstAndThirdPartyAudienceGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (deserializeFirstAndThirdPartyAudienceTargetingSetting(item))) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#firstAndThirdPartyAudiencesCreate.
 */
export interface FirstAndThirdPartyAudiencesCreateOptions {
  /**
   * Required. The ID of the advertiser under whom the
   * FirstAndThirdPartyAudience will be created.
   */
  advertiserId?: bigint;
}

function serializeFirstAndThirdPartyAudiencesCreateOptions(data: any): FirstAndThirdPartyAudiencesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeFirstAndThirdPartyAudiencesCreateOptions(data: any): FirstAndThirdPartyAudiencesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#firstAndThirdPartyAudiencesGet.
 */
export interface FirstAndThirdPartyAudiencesGetOptions {
  /**
   * The ID of the advertiser that has access to the fetched first and third
   * party audience.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that has access to the fetched first and third party
   * audience.
   */
  partnerId?: bigint;
}

function serializeFirstAndThirdPartyAudiencesGetOptions(data: any): FirstAndThirdPartyAudiencesGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeFirstAndThirdPartyAudiencesGetOptions(data: any): FirstAndThirdPartyAudiencesGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#firstAndThirdPartyAudiencesList.
 */
export interface FirstAndThirdPartyAudiencesListOptions {
  /**
   * The ID of the advertiser that has access to the fetched first and third
   * party audiences.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by first and third party audience fields. Supported
   * syntax: * Filter expressions for first and third party audiences currently
   * can only contain at most one restriction. * A restriction has the form of
   * `{field} {operator} {value}`. * The operator must be `CONTAINS (:)`. *
   * Supported fields: - `displayName` Examples: * All first and third party
   * audiences for which the display name contains "Google": `displayName :
   * "Google"`. The length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `firstAndThirdPartyAudienceId` (default) * `displayName` The default
   * sorting order is ascending. To specify descending order for a field, a
   * suffix "desc" should be added to the field name. Example: `displayName
   * desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListFirstAndThirdPartyAudiences` method. If not specified, the first page
   * of results will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that has access to the fetched first and third party
   * audiences.
   */
  partnerId?: bigint;
}

function serializeFirstAndThirdPartyAudiencesListOptions(data: any): FirstAndThirdPartyAudiencesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeFirstAndThirdPartyAudiencesListOptions(data: any): FirstAndThirdPartyAudiencesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#firstAndThirdPartyAudiencesPatch.
 */
export interface FirstAndThirdPartyAudiencesPatchOptions {
  /**
   * Required. The ID of the owner advertiser of the updated
   * FirstAndThirdPartyAudience.
   */
  advertiserId?: bigint;
  /**
   * Required. The mask to control which fields to update. Updates are only
   * supported for the following fields: * `displayName` * `description` *
   * `membershipDurationDays`
   */
  updateMask?: string /* FieldMask */;
}

function serializeFirstAndThirdPartyAudiencesPatchOptions(data: any): FirstAndThirdPartyAudiencesPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFirstAndThirdPartyAudiencesPatchOptions(data: any): FirstAndThirdPartyAudiencesPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Details of first and third party audience targeting setting.
 */
export interface FirstAndThirdPartyAudienceTargetingSetting {
  /**
   * Required. First and third party audience id of the first and third party
   * audience targeting setting. This id is first_and_third_party_audience_id.
   */
  firstAndThirdPartyAudienceId?: bigint;
  /**
   * The recency of the first and third party audience targeting setting. Only
   * applicable to first party audiences, otherwise will be ignored. For more
   * info, refer to
   * https://support.google.com/displayvideo/answer/2949947#recency When
   * unspecified, no recency limit will be used.
   */
  recency?:  | "RECENCY_NO_LIMIT" | "RECENCY_1_MINUTE" | "RECENCY_5_MINUTES" | "RECENCY_10_MINUTES" | "RECENCY_15_MINUTES" | "RECENCY_30_MINUTES" | "RECENCY_1_HOUR" | "RECENCY_2_HOURS" | "RECENCY_3_HOURS" | "RECENCY_6_HOURS" | "RECENCY_12_HOURS" | "RECENCY_1_DAY" | "RECENCY_2_DAYS" | "RECENCY_3_DAYS" | "RECENCY_5_DAYS" | "RECENCY_7_DAYS" | "RECENCY_10_DAYS" | "RECENCY_14_DAYS" | "RECENCY_15_DAYS" | "RECENCY_21_DAYS" | "RECENCY_28_DAYS" | "RECENCY_30_DAYS" | "RECENCY_40_DAYS" | "RECENCY_45_DAYS" | "RECENCY_60_DAYS" | "RECENCY_90_DAYS" | "RECENCY_120_DAYS" | "RECENCY_180_DAYS" | "RECENCY_270_DAYS" | "RECENCY_365_DAYS";
}

function serializeFirstAndThirdPartyAudienceTargetingSetting(data: any): FirstAndThirdPartyAudienceTargetingSetting {
  return {
    ...data,
    firstAndThirdPartyAudienceId: data["firstAndThirdPartyAudienceId"] !== undefined ? String(data["firstAndThirdPartyAudienceId"]) : undefined,
  };
}

function deserializeFirstAndThirdPartyAudienceTargetingSetting(data: any): FirstAndThirdPartyAudienceTargetingSetting {
  return {
    ...data,
    firstAndThirdPartyAudienceId: data["firstAndThirdPartyAudienceId"] !== undefined ? BigInt(data["firstAndThirdPartyAudienceId"]) : undefined,
  };
}

/**
 * A strategy that uses a fixed bidding price.
 */
export interface FixedBidStrategy {
  /**
   * The fixed bid amount, in micros of the advertiser's currency. For
   * insertion order entity, bid_amount_micros should be set as 0. For line item
   * entity, bid_amount_micros must be greater than or equal to billable unit of
   * the given currency and smaller than or equal to the upper limit 1000000000.
   * For example, 1500000 represents 1.5 standard units of the currency.
   */
  bidAmountMicros?: bigint;
}

function serializeFixedBidStrategy(data: any): FixedBidStrategy {
  return {
    ...data,
    bidAmountMicros: data["bidAmountMicros"] !== undefined ? String(data["bidAmountMicros"]) : undefined,
  };
}

function deserializeFixedBidStrategy(data: any): FixedBidStrategy {
  return {
    ...data,
    bidAmountMicros: data["bidAmountMicros"] !== undefined ? BigInt(data["bidAmountMicros"]) : undefined,
  };
}

/**
 * A single Floodlight group.
 */
export interface FloodlightGroup {
  /**
   * The Active View video viewability metric configuration for the Floodlight
   * group.
   */
  activeViewConfig?: ActiveViewVideoViewabilityMetricConfig;
  /**
   * User-defined custom variables owned by the Floodlight group. Use custom
   * Floodlight variables to create reporting data that is tailored to your
   * unique business needs. Custom Floodlight variables use the keys `U1=`,
   * `U2=`, and so on, and can take any values that you choose to pass to them.
   * You can use them to track virtually any type of data that you collect about
   * your customers, such as the genre of movie that a customer purchases, the
   * country to which the item is shipped, and so on. Custom Floodlight
   * variables may not be used to pass any data that could be used or recognized
   * as personally identifiable information (PII). Example: `custom_variables {
   * fields { "U1": value { number_value: 123.4 }, "U2": value { string_value:
   * "MyVariable2" }, "U3": value { string_value: "MyVariable3" } } }`
   * Acceptable values for keys are "U1" through "U100", inclusive. String
   * values must be less than 64 characters long, and cannot contain the
   * following characters: `"<>`.
   */
  customVariables?: {
    [key: string]: any
  };
  /**
   * Required. The display name of the Floodlight group.
   */
  displayName?: string;
  /**
   * Output only. The unique ID of the Floodlight group. Assigned by the
   * system.
   */
  readonly floodlightGroupId?: bigint;
  /**
   * Required. The lookback window for the Floodlight group. Both click_days
   * and impression_days are required. Acceptable values for both are `0` to
   * `90`, inclusive.
   */
  lookbackWindow?: LookbackWindow;
  /**
   * Output only. The resource name of the Floodlight group.
   */
  readonly name?: string;
  /**
   * Required. The web tag type enabled for the Floodlight group.
   */
  webTagType?:  | "WEB_TAG_TYPE_UNSPECIFIED" | "WEB_TAG_TYPE_NONE" | "WEB_TAG_TYPE_IMAGE" | "WEB_TAG_TYPE_DYNAMIC";
}

/**
 * Additional options for DisplayVideo#floodlightGroupsGet.
 */
export interface FloodlightGroupsGetOptions {
  /**
   * Required. The partner context by which the Floodlight group is being
   * accessed.
   */
  partnerId?: bigint;
}

function serializeFloodlightGroupsGetOptions(data: any): FloodlightGroupsGetOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeFloodlightGroupsGetOptions(data: any): FloodlightGroupsGetOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#floodlightGroupsPatch.
 */
export interface FloodlightGroupsPatchOptions {
  /**
   * Required. The partner context by which the Floodlight group is being
   * accessed.
   */
  partnerId?: bigint;
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFloodlightGroupsPatchOptions(data: any): FloodlightGroupsPatchOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFloodlightGroupsPatchOptions(data: any): FloodlightGroupsPatchOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Settings that control the number of times a user may be shown with the same
 * ad during a given time period.
 */
export interface FrequencyCap {
  /**
   * The maximum number of times a user may be shown the same ad during this
   * period. Must be greater than 0. Required when unlimited is `false` and
   * max_views is not set.
   */
  maxImpressions?: number;
  /**
   * The maximum number of times a user may click-through or fully view an ad
   * during this period until it is no longer served to them. Must be greater
   * than 0. Only applicable to YouTube and Partners resources. Required when
   * unlimited is `false` and max_impressions is not set.
   */
  maxViews?: number;
  /**
   * The time unit in which the frequency cap will be applied. Required when
   * unlimited is `false`.
   */
  timeUnit?:  | "TIME_UNIT_UNSPECIFIED" | "TIME_UNIT_LIFETIME" | "TIME_UNIT_MONTHS" | "TIME_UNIT_WEEKS" | "TIME_UNIT_DAYS" | "TIME_UNIT_HOURS" | "TIME_UNIT_MINUTES";
  /**
   * The number of time_unit the frequency cap will last. Required when
   * unlimited is `false`. The following restrictions apply based on the value
   * of time_unit: * `TIME_UNIT_LIFETIME` - this field is output only and will
   * default to 1 * `TIME_UNIT_MONTHS` - must be between 1 and 2 *
   * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be
   * between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 *
   * `TIME_UNIT_MINUTES` - must be between 1 and 59
   */
  timeUnitCount?: number;
  /**
   * Whether unlimited frequency capping is applied. When this field is set to
   * `true`, the remaining frequency cap fields are not applicable.
   */
  unlimited?: boolean;
}

/**
 * Details for assigned gender targeting option. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_GENDER`.
 */
export interface GenderAssignedTargetingOptionDetails {
  /**
   * The gender of the audience. Output only in v1. Required in v2.
   */
  gender?:  | "GENDER_UNSPECIFIED" | "GENDER_MALE" | "GENDER_FEMALE" | "GENDER_UNKNOWN";
}

/**
 * Represents a targetable gender. This will be populated in the gender_details
 * field of a TargetingOption when targeting_type is `TARGETING_TYPE_GENDER`.
 */
export interface GenderTargetingOptionDetails {
  /**
   * Output only. The gender of an audience.
   */
  readonly gender?:  | "GENDER_UNSPECIFIED" | "GENDER_MALE" | "GENDER_FEMALE" | "GENDER_UNKNOWN";
}

/**
 * Request message for LineItemService.GenerateDefaultLineItem.
 */
export interface GenerateDefaultLineItemRequest {
  /**
   * Required. The display name of the line item. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Required. The unique ID of the insertion order that the line item belongs
   * to.
   */
  insertionOrderId?: bigint;
  /**
   * Required. The type of the line item.
   */
  lineItemType?:  | "LINE_ITEM_TYPE_UNSPECIFIED" | "LINE_ITEM_TYPE_DISPLAY_DEFAULT" | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL" | "LINE_ITEM_TYPE_VIDEO_DEFAULT" | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL" | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INVENTORY" | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INVENTORY" | "LINE_ITEM_TYPE_AUDIO_DEFAULT" | "LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_ACTION" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_AUDIO" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_TARGET_FREQUENCY";
  /**
   * The mobile app promoted by the line item. This is applicable only when
   * line_item_type is either `LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL` or
   * `LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL`.
   */
  mobileApp?: MobileApp;
}

function serializeGenerateDefaultLineItemRequest(data: any): GenerateDefaultLineItemRequest {
  return {
    ...data,
    insertionOrderId: data["insertionOrderId"] !== undefined ? String(data["insertionOrderId"]) : undefined,
  };
}

function deserializeGenerateDefaultLineItemRequest(data: any): GenerateDefaultLineItemRequest {
  return {
    ...data,
    insertionOrderId: data["insertionOrderId"] !== undefined ? BigInt(data["insertionOrderId"]) : undefined,
  };
}

/**
 * Details for assigned geographic region targeting option. This will be
 * populated in the details field of an AssignedTargetingOption when
 * targeting_type is `TARGETING_TYPE_GEO_REGION`.
 */
export interface GeoRegionAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the geographic region (e.g., "Ontario,
   * Canada").
   */
  readonly displayName?: string;
  /**
   * Output only. The type of geographic region targeting.
   */
  readonly geoRegionType?:  | "GEO_REGION_TYPE_UNKNOWN" | "GEO_REGION_TYPE_OTHER" | "GEO_REGION_TYPE_COUNTRY" | "GEO_REGION_TYPE_REGION" | "GEO_REGION_TYPE_TERRITORY" | "GEO_REGION_TYPE_PROVINCE" | "GEO_REGION_TYPE_STATE" | "GEO_REGION_TYPE_PREFECTURE" | "GEO_REGION_TYPE_GOVERNORATE" | "GEO_REGION_TYPE_CANTON" | "GEO_REGION_TYPE_UNION_TERRITORY" | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY" | "GEO_REGION_TYPE_DMA_REGION" | "GEO_REGION_TYPE_METRO" | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT" | "GEO_REGION_TYPE_COUNTY" | "GEO_REGION_TYPE_MUNICIPALITY" | "GEO_REGION_TYPE_CITY" | "GEO_REGION_TYPE_POSTAL_CODE" | "GEO_REGION_TYPE_DEPARTMENT" | "GEO_REGION_TYPE_AIRPORT" | "GEO_REGION_TYPE_TV_REGION" | "GEO_REGION_TYPE_OKRUG" | "GEO_REGION_TYPE_BOROUGH" | "GEO_REGION_TYPE_CITY_REGION" | "GEO_REGION_TYPE_ARRONDISSEMENT" | "GEO_REGION_TYPE_NEIGHBORHOOD" | "GEO_REGION_TYPE_UNIVERSITY" | "GEO_REGION_TYPE_DISTRICT";
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_GEO_REGION`.
   */
  targetingOptionId?: string;
}

/**
 * Search terms for geo region targeting options.
 */
export interface GeoRegionSearchTerms {
  /**
   * The search query for the desired geo region. The query can be a prefix,
   * e.g. "New Yor", "Seattle", "USA", etc.
   */
  geoRegionQuery?: string;
}

/**
 * Represents a targetable geographic region. This will be populated in the
 * geo_region_details field when targeting_type is `TARGETING_TYPE_GEO_REGION`.
 */
export interface GeoRegionTargetingOptionDetails {
  /**
   * Output only. The display name of the geographic region (e.g., "Ontario,
   * Canada").
   */
  readonly displayName?: string;
  /**
   * Output only. The type of geographic region targeting.
   */
  readonly geoRegionType?:  | "GEO_REGION_TYPE_UNKNOWN" | "GEO_REGION_TYPE_OTHER" | "GEO_REGION_TYPE_COUNTRY" | "GEO_REGION_TYPE_REGION" | "GEO_REGION_TYPE_TERRITORY" | "GEO_REGION_TYPE_PROVINCE" | "GEO_REGION_TYPE_STATE" | "GEO_REGION_TYPE_PREFECTURE" | "GEO_REGION_TYPE_GOVERNORATE" | "GEO_REGION_TYPE_CANTON" | "GEO_REGION_TYPE_UNION_TERRITORY" | "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY" | "GEO_REGION_TYPE_DMA_REGION" | "GEO_REGION_TYPE_METRO" | "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT" | "GEO_REGION_TYPE_COUNTY" | "GEO_REGION_TYPE_MUNICIPALITY" | "GEO_REGION_TYPE_CITY" | "GEO_REGION_TYPE_POSTAL_CODE" | "GEO_REGION_TYPE_DEPARTMENT" | "GEO_REGION_TYPE_AIRPORT" | "GEO_REGION_TYPE_TV_REGION" | "GEO_REGION_TYPE_OKRUG" | "GEO_REGION_TYPE_BOROUGH" | "GEO_REGION_TYPE_CITY_REGION" | "GEO_REGION_TYPE_ARRONDISSEMENT" | "GEO_REGION_TYPE_NEIGHBORHOOD" | "GEO_REGION_TYPE_UNIVERSITY" | "GEO_REGION_TYPE_DISTRICT";
}

/**
 * Describes a Google audience resource. Includes Google audience lists.
 */
export interface GoogleAudience {
  /**
   * Output only. The display name of the Google audience. .
   */
  readonly displayName?: string;
  /**
   * Output only. The unique ID of the Google audience. Assigned by the system.
   */
  readonly googleAudienceId?: bigint;
  /**
   * Output only. The type of Google audience. .
   */
  readonly googleAudienceType?:  | "GOOGLE_AUDIENCE_TYPE_UNSPECIFIED" | "GOOGLE_AUDIENCE_TYPE_AFFINITY" | "GOOGLE_AUDIENCE_TYPE_IN_MARKET" | "GOOGLE_AUDIENCE_TYPE_INSTALLED_APPS" | "GOOGLE_AUDIENCE_TYPE_NEW_MOBILE_DEVICES" | "GOOGLE_AUDIENCE_TYPE_LIFE_EVENT" | "GOOGLE_AUDIENCE_TYPE_EXTENDED_DEMOGRAPHIC";
  /**
   * Output only. The resource name of the google audience.
   */
  readonly name?: string;
}

/**
 * Details of Google audience group. All Google audience targeting settings are
 * logically ‘OR’ of each other.
 */
export interface GoogleAudienceGroup {
  /**
   * Required. All Google audience targeting settings in Google audience group.
   * Repeated settings with same id will be ignored.
   */
  settings?: GoogleAudienceTargetingSetting[];
}

function serializeGoogleAudienceGroup(data: any): GoogleAudienceGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (serializeGoogleAudienceTargetingSetting(item))) : undefined,
  };
}

function deserializeGoogleAudienceGroup(data: any): GoogleAudienceGroup {
  return {
    ...data,
    settings: data["settings"] !== undefined ? data["settings"].map((item: any) => (deserializeGoogleAudienceTargetingSetting(item))) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#googleAudiencesGet.
 */
export interface GoogleAudiencesGetOptions {
  /**
   * The ID of the advertiser that has access to the fetched Google audience.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that has access to the fetched Google audience.
   */
  partnerId?: bigint;
}

function serializeGoogleAudiencesGetOptions(data: any): GoogleAudiencesGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeGoogleAudiencesGetOptions(data: any): GoogleAudiencesGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#googleAudiencesList.
 */
export interface GoogleAudiencesListOptions {
  /**
   * The ID of the advertiser that has access to the fetched Google audiences.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by Google audience fields. Supported syntax: * Filter
   * expressions for Google audiences currently can only contain at most one
   * restriction. * A restriction has the form of `{field} {operator} {value}`.
   * * The operator must be `CONTAINS (:)`. * Supported fields: - `displayName`
   * Examples: * All Google audiences for which the display name contains
   * "Google": `displayName : "Google"`. The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `googleAudienceId` (default) * `displayName` The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListGoogleAudiences` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that has access to the fetched Google audiences.
   */
  partnerId?: bigint;
}

function serializeGoogleAudiencesListOptions(data: any): GoogleAudiencesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeGoogleAudiencesListOptions(data: any): GoogleAudiencesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Details of Google audience targeting setting.
 */
export interface GoogleAudienceTargetingSetting {
  /**
   * Required. Google audience id of the Google audience targeting setting.
   * This id is google_audience_id.
   */
  googleAudienceId?: bigint;
}

function serializeGoogleAudienceTargetingSetting(data: any): GoogleAudienceTargetingSetting {
  return {
    ...data,
    googleAudienceId: data["googleAudienceId"] !== undefined ? String(data["googleAudienceId"]) : undefined,
  };
}

function deserializeGoogleAudienceTargetingSetting(data: any): GoogleAudienceTargetingSetting {
  return {
    ...data,
    googleAudienceId: data["googleAudienceId"] !== undefined ? BigInt(data["googleAudienceId"]) : undefined,
  };
}

/**
 * Media resource.
 */
export interface GoogleBytestreamMedia {
  /**
   * Name of the media resource.
   */
  resourceName?: string;
}

/**
 * A guaranteed order. Guaranteed orders are parent entity of guaranteed
 * inventory sources. When creating a guaranteed inventory source, a guaranteed
 * order ID must be assigned to the inventory source.
 */
export interface GuaranteedOrder {
  /**
   * Output only. The ID of default advertiser of the guaranteed order. The
   * default advertiser is either the read_write_advertiser_id or, if that is
   * not set, the first advertiser listed in read_advertiser_ids. Otherwise,
   * there is no default advertiser.
   */
  readonly defaultAdvertiserId?: bigint;
  /**
   * The ID of the default campaign that is assigned to the guaranteed order.
   * The default campaign must belong to the default advertiser.
   */
  defaultCampaignId?: bigint;
  /**
   * Required. The display name of the guaranteed order. Must be UTF-8 encoded
   * with a maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Required. Immutable. The exchange where the guaranteed order originated.
   */
  exchange?:  | "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX";
  /**
   * Output only. The unique identifier of the guaranteed order. The guaranteed
   * order IDs have the format `{exchange}-{legacy_guaranteed_order_id}`.
   */
  readonly guaranteedOrderId?: string;
  /**
   * Output only. The legacy ID of the guaranteed order. Assigned by the
   * original exchange. The legacy ID is unique within one exchange, but is not
   * guaranteed to be unique across all guaranteed orders. This ID is used in
   * SDF and UI.
   */
  readonly legacyGuaranteedOrderId?: string;
  /**
   * Output only. The resource name of the guaranteed order.
   */
  readonly name?: string;
  /**
   * Required. The publisher name of the guaranteed order. Must be UTF-8
   * encoded with a maximum size of 240 bytes.
   */
  publisherName?: string;
  /**
   * Whether all advertisers of read_write_partner_id have read access to the
   * guaranteed order. Only applicable if read_write_partner_id is set. If True,
   * overrides read_advertiser_ids.
   */
  readAccessInherited?: boolean;
  /**
   * The IDs of advertisers with read access to the guaranteed order. This
   * field must not include the advertiser assigned to read_write_advertiser_id
   * if it is set. All advertisers in this field must belong to
   * read_write_partner_id or the same partner as read_write_advertiser_id.
   */
  readAdvertiserIds?: bigint[];
  /**
   * The advertiser with read/write access to the guaranteed order. This is
   * also the default advertiser of the guaranteed order.
   */
  readWriteAdvertiserId?: bigint;
  /**
   * The partner with read/write access to the guaranteed order.
   */
  readWritePartnerId?: bigint;
  /**
   * The status settings of the guaranteed order.
   */
  status?: GuaranteedOrderStatus;
  /**
   * Output only. The timestamp when the guaranteed order was last updated.
   * Assigned by the system.
   */
  readonly updateTime?: Date;
}

function serializeGuaranteedOrder(data: any): GuaranteedOrder {
  return {
    ...data,
    defaultCampaignId: data["defaultCampaignId"] !== undefined ? String(data["defaultCampaignId"]) : undefined,
    readAdvertiserIds: data["readAdvertiserIds"] !== undefined ? data["readAdvertiserIds"].map((item: any) => (String(item))) : undefined,
    readWriteAdvertiserId: data["readWriteAdvertiserId"] !== undefined ? String(data["readWriteAdvertiserId"]) : undefined,
    readWritePartnerId: data["readWritePartnerId"] !== undefined ? String(data["readWritePartnerId"]) : undefined,
  };
}

function deserializeGuaranteedOrder(data: any): GuaranteedOrder {
  return {
    ...data,
    defaultAdvertiserId: data["defaultAdvertiserId"] !== undefined ? BigInt(data["defaultAdvertiserId"]) : undefined,
    defaultCampaignId: data["defaultCampaignId"] !== undefined ? BigInt(data["defaultCampaignId"]) : undefined,
    readAdvertiserIds: data["readAdvertiserIds"] !== undefined ? data["readAdvertiserIds"].map((item: any) => (BigInt(item))) : undefined,
    readWriteAdvertiserId: data["readWriteAdvertiserId"] !== undefined ? BigInt(data["readWriteAdvertiserId"]) : undefined,
    readWritePartnerId: data["readWritePartnerId"] !== undefined ? BigInt(data["readWritePartnerId"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#guaranteedOrdersCreate.
 */
export interface GuaranteedOrdersCreateOptions {
  /**
   * The ID of the advertiser that the request is being made within.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that the request is being made within.
   */
  partnerId?: bigint;
}

function serializeGuaranteedOrdersCreateOptions(data: any): GuaranteedOrdersCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeGuaranteedOrdersCreateOptions(data: any): GuaranteedOrdersCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#guaranteedOrdersGet.
 */
export interface GuaranteedOrdersGetOptions {
  /**
   * The ID of the advertiser that has access to the guaranteed order.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that has access to the guaranteed order.
   */
  partnerId?: bigint;
}

function serializeGuaranteedOrdersGetOptions(data: any): GuaranteedOrdersGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeGuaranteedOrdersGetOptions(data: any): GuaranteedOrdersGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#guaranteedOrdersList.
 */
export interface GuaranteedOrdersListOptions {
  /**
   * The ID of the advertiser that has access to the guaranteed order.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by guaranteed order properties. * Filter expressions are
   * made up of one or more restrictions. * Restrictions can be combined by
   * `AND` or `OR` logical operators. A sequence of restrictions implicitly uses
   * `AND`. * A restriction has the form of `{field} {operator} {value}`. * The
   * operator must be `EQUALS (=)`. * Supported fields: - `guaranteed_order_id`
   * - `exchange` - `display_name` - `status.entityStatus` Examples: * All
   * active guaranteed orders: `status.entityStatus="ENTITY_STATUS_ACTIVE"` *
   * Guaranteed orders belonging to Google Ad Manager or Rubicon exchanges:
   * `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"` The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix "desc" should be added to the field name. For
   * example, `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListGuaranteedOrders` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that has access to the guaranteed order.
   */
  partnerId?: bigint;
}

function serializeGuaranteedOrdersListOptions(data: any): GuaranteedOrdersListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeGuaranteedOrdersListOptions(data: any): GuaranteedOrdersListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#guaranteedOrdersPatch.
 */
export interface GuaranteedOrdersPatchOptions {
  /**
   * The ID of the advertiser that the request is being made within.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that the request is being made within.
   */
  partnerId?: bigint;
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGuaranteedOrdersPatchOptions(data: any): GuaranteedOrdersPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGuaranteedOrdersPatchOptions(data: any): GuaranteedOrdersPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The status settings of the guaranteed order.
 */
export interface GuaranteedOrderStatus {
  /**
   * Output only. The configuration status of the guaranteed order. Acceptable
   * values are `PENDING` and `COMPLETED`. A guaranteed order must be configured
   * (fill in the required fields, choose creatives, and select a default
   * campaign) before it can serve. Currently the configuration action can only
   * be performed via UI.
   */
  readonly configStatus?:  | "GUARANTEED_ORDER_CONFIG_STATUS_UNSPECIFIED" | "PENDING" | "COMPLETED";
  /**
   * The user-provided reason for pausing this guaranteed order. Must be UTF-8
   * encoded with a maximum length of 100 bytes. Only applicable when
   * entity_status is set to `ENTITY_STATUS_PAUSED`.
   */
  entityPauseReason?: string;
  /**
   * Whether or not the guaranteed order is servable. Acceptable values are
   * `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and
   * `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
}

/**
 * Details for assigned household income targeting option. This will be
 * populated in the details field of an AssignedTargetingOption when
 * targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`.
 */
export interface HouseholdIncomeAssignedTargetingOptionDetails {
  /**
   * The household income of the audience. Output only in v1. Required in v2.
   */
  householdIncome?:  | "HOUSEHOLD_INCOME_UNSPECIFIED" | "HOUSEHOLD_INCOME_UNKNOWN" | "HOUSEHOLD_INCOME_LOWER_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT" | "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT" | "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT" | "HOUSEHOLD_INCOME_TOP_10_PERCENT";
}

/**
 * Represents a targetable household income. This will be populated in the
 * household_income_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_HOUSEHOLD_INCOME`.
 */
export interface HouseholdIncomeTargetingOptionDetails {
  /**
   * Output only. The household income of an audience.
   */
  readonly householdIncome?:  | "HOUSEHOLD_INCOME_UNSPECIFIED" | "HOUSEHOLD_INCOME_UNKNOWN" | "HOUSEHOLD_INCOME_LOWER_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT" | "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT" | "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT" | "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT" | "HOUSEHOLD_INCOME_TOP_10_PERCENT";
}

/**
 * A filtering option that filters entities by their entity IDs.
 */
export interface IdFilter {
  /**
   * YouTube Ads to download by ID. All IDs must belong to the same Advertiser
   * or Partner specified in CreateSdfDownloadTaskRequest.
   */
  adGroupAdIds?: bigint[];
  /**
   * YouTube Ad Groups to download by ID. All IDs must belong to the same
   * Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
   */
  adGroupIds?: bigint[];
  /**
   * Campaigns to download by ID. All IDs must belong to the same Advertiser or
   * Partner specified in CreateSdfDownloadTaskRequest.
   */
  campaignIds?: bigint[];
  /**
   * Insertion Orders to download by ID. All IDs must belong to the same
   * Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
   */
  insertionOrderIds?: bigint[];
  /**
   * Line Items to download by ID. All IDs must belong to the same Advertiser
   * or Partner specified in CreateSdfDownloadTaskRequest.
   */
  lineItemIds?: bigint[];
  /**
   * Media Products to download by ID. All IDs must belong to the same
   * Advertiser or Partner specified in CreateSdfDownloadTaskRequest.
   */
  mediaProductIds?: bigint[];
}

function serializeIdFilter(data: any): IdFilter {
  return {
    ...data,
    adGroupAdIds: data["adGroupAdIds"] !== undefined ? data["adGroupAdIds"].map((item: any) => (String(item))) : undefined,
    adGroupIds: data["adGroupIds"] !== undefined ? data["adGroupIds"].map((item: any) => (String(item))) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? data["campaignIds"].map((item: any) => (String(item))) : undefined,
    insertionOrderIds: data["insertionOrderIds"] !== undefined ? data["insertionOrderIds"].map((item: any) => (String(item))) : undefined,
    lineItemIds: data["lineItemIds"] !== undefined ? data["lineItemIds"].map((item: any) => (String(item))) : undefined,
    mediaProductIds: data["mediaProductIds"] !== undefined ? data["mediaProductIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeIdFilter(data: any): IdFilter {
  return {
    ...data,
    adGroupAdIds: data["adGroupAdIds"] !== undefined ? data["adGroupAdIds"].map((item: any) => (BigInt(item))) : undefined,
    adGroupIds: data["adGroupIds"] !== undefined ? data["adGroupIds"].map((item: any) => (BigInt(item))) : undefined,
    campaignIds: data["campaignIds"] !== undefined ? data["campaignIds"].map((item: any) => (BigInt(item))) : undefined,
    insertionOrderIds: data["insertionOrderIds"] !== undefined ? data["insertionOrderIds"].map((item: any) => (BigInt(item))) : undefined,
    lineItemIds: data["lineItemIds"] !== undefined ? data["lineItemIds"].map((item: any) => (BigInt(item))) : undefined,
    mediaProductIds: data["mediaProductIds"] !== undefined ? data["mediaProductIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Meta data of an image asset.
 */
export interface ImageAsset {
  /**
   * File size of the image asset in bytes.
   */
  fileSize?: bigint;
  /**
   * Metadata for this image at its original size.
   */
  fullSize?: Dimensions;
  /**
   * MIME type of the image asset.
   */
  mimeType?: string;
}

function serializeImageAsset(data: any): ImageAsset {
  return {
    ...data,
    fileSize: data["fileSize"] !== undefined ? String(data["fileSize"]) : undefined,
  };
}

function deserializeImageAsset(data: any): ImageAsset {
  return {
    ...data,
    fileSize: data["fileSize"] !== undefined ? BigInt(data["fileSize"]) : undefined,
  };
}

/**
 * A single insertion order.
 */
export interface InsertionOrder {
  /**
   * Output only. The unique ID of the advertiser the insertion order belongs
   * to.
   */
  readonly advertiserId?: bigint;
  /**
   * The bidding strategy of the insertion order. By default, fixed_bid is set.
   */
  bidStrategy?: BiddingStrategy;
  /**
   * Immutable. The billable outcome of the insertion order.
   */
  billableOutcome?:  | "BILLABLE_OUTCOME_UNSPECIFIED" | "BILLABLE_OUTCOME_PAY_PER_IMPRESSION" | "BILLABLE_OUTCOME_PAY_PER_CLICK" | "BILLABLE_OUTCOME_PAY_PER_VIEWABLE_IMPRESSION";
  /**
   * Required. The budget allocation settings of the insertion order.
   */
  budget?: InsertionOrderBudget;
  /**
   * Required. Immutable. The unique ID of the campaign that the insertion
   * order belongs to.
   */
  campaignId?: bigint;
  /**
   * Required. The display name of the insertion order. Must be UTF-8 encoded
   * with a maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Required. Controls whether or not the insertion order can spend its budget
   * and bid on inventory. * For CreateInsertionOrder method, only
   * `ENTITY_STATUS_DRAFT` is allowed. To activate an insertion order, use
   * UpdateInsertionOrder method and update the status to `ENTITY_STATUS_ACTIVE`
   * after creation. * An insertion order cannot be changed back to
   * `ENTITY_STATUS_DRAFT` status from any other status. * An insertion order
   * cannot be set to `ENTITY_STATUS_ACTIVE` if its parent campaign is not
   * active.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Required. The frequency capping setting of the insertion order.
   */
  frequencyCap?: FrequencyCap;
  /**
   * Output only. The unique ID of the insertion order. Assigned by the system.
   */
  readonly insertionOrderId?: bigint;
  /**
   * The type of insertion order. If this field is unspecified in creation, the
   * value defaults to `RTB`.
   */
  insertionOrderType?:  | "INSERTION_ORDER_TYPE_UNSPECIFIED" | "RTB" | "OVER_THE_TOP";
  /**
   * Additional integration details of the insertion order.
   */
  integrationDetails?: IntegrationDetails;
  /**
   * Output only. The resource name of the insertion order.
   */
  readonly name?: string;
  /**
   * Required. The budget spending speed setting of the insertion order.
   */
  pacing?: Pacing;
  /**
   * The partner costs associated with the insertion order. If absent or empty
   * in CreateInsertionOrder method, the newly created insertion order will
   * inherit partner costs from the partner settings.
   */
  partnerCosts?: PartnerCost[];
  /**
   * Required. Performance goal of the insertion order.
   */
  performanceGoal?: PerformanceGoal;
  /**
   * Output only. The reservation type of the insertion order.
   */
  readonly reservationType?:  | "RESERVATION_TYPE_UNSPECIFIED" | "RESERVATION_TYPE_NOT_GUARANTEED" | "RESERVATION_TYPE_PROGRAMMATIC_GUARANTEED" | "RESERVATION_TYPE_TAG_GUARANTEED" | "RESERVATION_TYPE_PETRA_VIRAL" | "RESERVATION_TYPE_INSTANT_RESERVE";
  /**
   * Output only. The timestamp when the insertion order was last updated.
   * Assigned by the system.
   */
  readonly updateTime?: Date;
}

function serializeInsertionOrder(data: any): InsertionOrder {
  return {
    ...data,
    bidStrategy: data["bidStrategy"] !== undefined ? serializeBiddingStrategy(data["bidStrategy"]) : undefined,
    budget: data["budget"] !== undefined ? serializeInsertionOrderBudget(data["budget"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    pacing: data["pacing"] !== undefined ? serializePacing(data["pacing"]) : undefined,
    partnerCosts: data["partnerCosts"] !== undefined ? data["partnerCosts"].map((item: any) => (serializePartnerCost(item))) : undefined,
    performanceGoal: data["performanceGoal"] !== undefined ? serializePerformanceGoal(data["performanceGoal"]) : undefined,
  };
}

function deserializeInsertionOrder(data: any): InsertionOrder {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    bidStrategy: data["bidStrategy"] !== undefined ? deserializeBiddingStrategy(data["bidStrategy"]) : undefined,
    budget: data["budget"] !== undefined ? deserializeInsertionOrderBudget(data["budget"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    insertionOrderId: data["insertionOrderId"] !== undefined ? BigInt(data["insertionOrderId"]) : undefined,
    pacing: data["pacing"] !== undefined ? deserializePacing(data["pacing"]) : undefined,
    partnerCosts: data["partnerCosts"] !== undefined ? data["partnerCosts"].map((item: any) => (deserializePartnerCost(item))) : undefined,
    performanceGoal: data["performanceGoal"] !== undefined ? deserializePerformanceGoal(data["performanceGoal"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Settings that control how insertion order budget is allocated.
 */
export interface InsertionOrderBudget {
  /**
   * The type of automation used to manage bid and budget for the insertion
   * order. If this field is unspecified in creation, the value defaults to
   * `INSERTION_ORDER_AUTOMATION_TYPE_NONE`.
   */
  automationType?:  | "INSERTION_ORDER_AUTOMATION_TYPE_UNSPECIFIED" | "INSERTION_ORDER_AUTOMATION_TYPE_BUDGET" | "INSERTION_ORDER_AUTOMATION_TYPE_NONE" | "INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET";
  /**
   * Required. The list of budget segments. Use a budget segment to specify a
   * specific budget for a given period of time an insertion order is running.
   */
  budgetSegments?: InsertionOrderBudgetSegment[];
  /**
   * Required. Immutable. The budget unit specifies whether the budget is
   * currency based or impression based.
   */
  budgetUnit?:  | "BUDGET_UNIT_UNSPECIFIED" | "BUDGET_UNIT_CURRENCY" | "BUDGET_UNIT_IMPRESSIONS";
}

function serializeInsertionOrderBudget(data: any): InsertionOrderBudget {
  return {
    ...data,
    budgetSegments: data["budgetSegments"] !== undefined ? data["budgetSegments"].map((item: any) => (serializeInsertionOrderBudgetSegment(item))) : undefined,
  };
}

function deserializeInsertionOrderBudget(data: any): InsertionOrderBudget {
  return {
    ...data,
    budgetSegments: data["budgetSegments"] !== undefined ? data["budgetSegments"].map((item: any) => (deserializeInsertionOrderBudgetSegment(item))) : undefined,
  };
}

/**
 * Settings that control the budget of a single budget segment.
 */
export interface InsertionOrderBudgetSegment {
  /**
   * Required. The budget amount the insertion order will spend for the given
   * date_range. The amount is in micros. Must be greater than 0. For example,
   * 500000000 represents 500 standard units of the currency.
   */
  budgetAmountMicros?: bigint;
  /**
   * The budget_id of the campaign budget that this insertion order budget
   * segment is a part of.
   */
  campaignBudgetId?: bigint;
  /**
   * Required. The start and end date settings of the budget segment. They are
   * resolved relative to the parent advertiser's time zone. * When creating a
   * new budget segment, both `start_date` and `end_date` must be in the future.
   * * An existing budget segment with a `start_date` in the past has a mutable
   * `end_date` but an immutable `start_date`. * `end_date` must be the
   * `start_date` or later, both before the year 2037.
   */
  dateRange?: DateRange;
  /**
   * The budget segment description. It can be used to enter Purchase Order
   * information for each budget segment and have that information printed on
   * the invoices. Must be UTF-8 encoded.
   */
  description?: string;
}

function serializeInsertionOrderBudgetSegment(data: any): InsertionOrderBudgetSegment {
  return {
    ...data,
    budgetAmountMicros: data["budgetAmountMicros"] !== undefined ? String(data["budgetAmountMicros"]) : undefined,
    campaignBudgetId: data["campaignBudgetId"] !== undefined ? String(data["campaignBudgetId"]) : undefined,
  };
}

function deserializeInsertionOrderBudgetSegment(data: any): InsertionOrderBudgetSegment {
  return {
    ...data,
    budgetAmountMicros: data["budgetAmountMicros"] !== undefined ? BigInt(data["budgetAmountMicros"]) : undefined,
    campaignBudgetId: data["campaignBudgetId"] !== undefined ? BigInt(data["campaignBudgetId"]) : undefined,
  };
}

/**
 * Details for an in-stream ad.
 */
export interface InStreamAd {
  /**
   * Common ad attributes.
   */
  commonInStreamAttribute?: CommonInStreamAttribute;
  /**
   * The custom parameters to pass custom values to tracking URL template.
   */
  customParameters?: {
    [key: string]: string
  };
}

function serializeInStreamAd(data: any): InStreamAd {
  return {
    ...data,
    commonInStreamAttribute: data["commonInStreamAttribute"] !== undefined ? serializeCommonInStreamAttribute(data["commonInStreamAttribute"]) : undefined,
  };
}

function deserializeInStreamAd(data: any): InStreamAd {
  return {
    ...data,
    commonInStreamAttribute: data["commonInStreamAttribute"] !== undefined ? deserializeCommonInStreamAttribute(data["commonInStreamAttribute"]) : undefined,
  };
}

/**
 * Details of Integral Ad Science settings.
 */
export interface IntegralAdScience {
  /**
   * The custom segment ID provided by Integral Ad Science. The ID must be
   * between `1000001` and `1999999`, inclusive.
   */
  customSegmentId?: bigint[];
  /**
   * Display Viewability section (applicable to display line items only).
   */
  displayViewability?:  | "PERFORMANCE_VIEWABILITY_UNSPECIFIED" | "PERFORMANCE_VIEWABILITY_40" | "PERFORMANCE_VIEWABILITY_50" | "PERFORMANCE_VIEWABILITY_60" | "PERFORMANCE_VIEWABILITY_70";
  /**
   * Ad Fraud settings.
   */
  excludedAdFraudRisk?:  | "SUSPICIOUS_ACTIVITY_UNSPECIFIED" | "SUSPICIOUS_ACTIVITY_HR" | "SUSPICIOUS_ACTIVITY_HMR";
  /**
   * Brand Safety - **Adult content**.
   */
  excludedAdultRisk?:  | "ADULT_UNSPECIFIED" | "ADULT_HR" | "ADULT_HMR";
  /**
   * Brand Safety - **Alcohol**.
   */
  excludedAlcoholRisk?:  | "ALCOHOL_UNSPECIFIED" | "ALCOHOL_HR" | "ALCOHOL_HMR";
  /**
   * Brand Safety - **Drugs**.
   */
  excludedDrugsRisk?:  | "DRUGS_UNSPECIFIED" | "DRUGS_HR" | "DRUGS_HMR";
  /**
   * Brand Safety - **Gambling**.
   */
  excludedGamblingRisk?:  | "GAMBLING_UNSPECIFIED" | "GAMBLING_HR" | "GAMBLING_HMR";
  /**
   * Brand Safety - **Hate speech**.
   */
  excludedHateSpeechRisk?:  | "HATE_SPEECH_UNSPECIFIED" | "HATE_SPEECH_HR" | "HATE_SPEECH_HMR";
  /**
   * Brand Safety - **Illegal downloads**.
   */
  excludedIllegalDownloadsRisk?:  | "ILLEGAL_DOWNLOADS_UNSPECIFIED" | "ILLEGAL_DOWNLOADS_HR" | "ILLEGAL_DOWNLOADS_HMR";
  /**
   * Brand Safety - **Offensive language**.
   */
  excludedOffensiveLanguageRisk?:  | "OFFENSIVE_LANGUAGE_UNSPECIFIED" | "OFFENSIVE_LANGUAGE_HR" | "OFFENSIVE_LANGUAGE_HMR";
  /**
   * Brand Safety - **Violence**.
   */
  excludedViolenceRisk?:  | "VIOLENCE_UNSPECIFIED" | "VIOLENCE_HR" | "VIOLENCE_HMR";
  /**
   * Brand Safety - **Unrateable**.
   */
  excludeUnrateable?: boolean;
  /**
   * True advertising quality (applicable to Display line items only).
   */
  traqScoreOption?:  | "TRAQ_UNSPECIFIED" | "TRAQ_250" | "TRAQ_500" | "TRAQ_600" | "TRAQ_700" | "TRAQ_750" | "TRAQ_875" | "TRAQ_1000";
  /**
   * Video Viewability Section (applicable to video line items only).
   */
  videoViewability?:  | "VIDEO_VIEWABILITY_UNSPECIFIED" | "VIDEO_VIEWABILITY_40" | "VIDEO_VIEWABILITY_50" | "VIDEO_VIEWABILITY_60" | "VIDEO_VIEWABILITY_70";
}

function serializeIntegralAdScience(data: any): IntegralAdScience {
  return {
    ...data,
    customSegmentId: data["customSegmentId"] !== undefined ? data["customSegmentId"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeIntegralAdScience(data: any): IntegralAdScience {
  return {
    ...data,
    customSegmentId: data["customSegmentId"] !== undefined ? data["customSegmentId"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Integration details of an entry.
 */
export interface IntegrationDetails {
  /**
   * Additional details of the entry in string format. Must be UTF-8 encoded
   * with a length of no more than 1000 characters.
   */
  details?: string;
  /**
   * An external identifier to be associated with the entry. The integration
   * code will show up together with the entry in many places in the system, for
   * example, reporting. Must be UTF-8 encoded with a length of no more than 500
   * characters.
   */
  integrationCode?: string;
}

/**
 * An inventory source.
 */
export interface InventorySource {
  /**
   * Whether the inventory source has a guaranteed or non-guaranteed delivery.
   */
  commitment?:  | "INVENTORY_SOURCE_COMMITMENT_UNSPECIFIED" | "INVENTORY_SOURCE_COMMITMENT_GUARANTEED" | "INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED";
  /**
   * The creative requirements of the inventory source. Not applicable for
   * auction packages.
   */
  creativeConfigs?: CreativeConfig[];
  /**
   * The ID in the exchange space that uniquely identifies the inventory
   * source. Must be unique across buyers within each exchange but not
   * necessarily unique across exchanges.
   */
  dealId?: string;
  /**
   * The delivery method of the inventory source. * For non-guaranteed
   * inventory sources, the only acceptable value is
   * `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. * For guaranteed inventory
   * sources, acceptable values are `INVENTORY_SOURCE_DELIVERY_METHOD_TAG` and
   * `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`.
   */
  deliveryMethod?:  | "INVENTORY_SOURCE_DELIVERY_METHOD_UNSPECIFIED" | "INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC" | "INVENTORY_SOURCE_DELIVERY_METHOD_TAG";
  /**
   * The display name of the inventory source. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * The exchange to which the inventory source belongs.
   */
  exchange?:  | "EXCHANGE_UNSPECIFIED" | "EXCHANGE_GOOGLE_AD_MANAGER" | "EXCHANGE_APPNEXUS" | "EXCHANGE_BRIGHTROLL" | "EXCHANGE_ADFORM" | "EXCHANGE_ADMETA" | "EXCHANGE_ADMIXER" | "EXCHANGE_ADSMOGO" | "EXCHANGE_ADSWIZZ" | "EXCHANGE_BIDSWITCH" | "EXCHANGE_BRIGHTROLL_DISPLAY" | "EXCHANGE_CADREON" | "EXCHANGE_DAILYMOTION" | "EXCHANGE_FIVE" | "EXCHANGE_FLUCT" | "EXCHANGE_FREEWHEEL" | "EXCHANGE_GENIEE" | "EXCHANGE_GUMGUM" | "EXCHANGE_IMOBILE" | "EXCHANGE_IBILLBOARD" | "EXCHANGE_IMPROVE_DIGITAL" | "EXCHANGE_INDEX" | "EXCHANGE_KARGO" | "EXCHANGE_MICROAD" | "EXCHANGE_MOPUB" | "EXCHANGE_NEND" | "EXCHANGE_ONE_BY_AOL_DISPLAY" | "EXCHANGE_ONE_BY_AOL_MOBILE" | "EXCHANGE_ONE_BY_AOL_VIDEO" | "EXCHANGE_OOYALA" | "EXCHANGE_OPENX" | "EXCHANGE_PERMODO" | "EXCHANGE_PLATFORMONE" | "EXCHANGE_PLATFORMID" | "EXCHANGE_PUBMATIC" | "EXCHANGE_PULSEPOINT" | "EXCHANGE_REVENUEMAX" | "EXCHANGE_RUBICON" | "EXCHANGE_SMARTCLIP" | "EXCHANGE_SMARTRTB" | "EXCHANGE_SMARTSTREAMTV" | "EXCHANGE_SOVRN" | "EXCHANGE_SPOTXCHANGE" | "EXCHANGE_STROER" | "EXCHANGE_TEADSTV" | "EXCHANGE_TELARIA" | "EXCHANGE_TVN" | "EXCHANGE_UNITED" | "EXCHANGE_YIELDLAB" | "EXCHANGE_YIELDMO" | "EXCHANGE_UNRULYX" | "EXCHANGE_OPEN8" | "EXCHANGE_TRITON" | "EXCHANGE_TRIPLELIFT" | "EXCHANGE_TABOOLA" | "EXCHANGE_INMOBI" | "EXCHANGE_SMAATO" | "EXCHANGE_AJA" | "EXCHANGE_SUPERSHIP" | "EXCHANGE_NEXSTAR_DIGITAL" | "EXCHANGE_WAZE" | "EXCHANGE_SOUNDCAST" | "EXCHANGE_SHARETHROUGH" | "EXCHANGE_FYBER" | "EXCHANGE_RED_FOR_PUBLISHERS" | "EXCHANGE_MEDIANET" | "EXCHANGE_TAPJOY" | "EXCHANGE_VISTAR" | "EXCHANGE_DAX" | "EXCHANGE_JCD" | "EXCHANGE_PLACE_EXCHANGE" | "EXCHANGE_APPLOVIN" | "EXCHANGE_CONNATIX";
  /**
   * Immutable. The ID of the guaranteed order that this inventory source
   * belongs to. Only applicable when commitment is
   * `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`.
   */
  guaranteedOrderId?: string;
  /**
   * Output only. The unique ID of the inventory source. Assigned by the
   * system.
   */
  readonly inventorySourceId?: bigint;
  /**
   * Output only. The product type of the inventory source, denoting the way
   * through which it sells inventory.
   */
  readonly inventorySourceProductType?:  | "INVENTORY_SOURCE_PRODUCT_TYPE_UNSPECIFIED" | "PREFERRED_DEAL" | "PRIVATE_AUCTION" | "PROGRAMMATIC_GUARANTEED" | "TAG_GUARANTEED" | "YOUTUBE_RESERVE" | "INSTANT_RESERVE" | "GUARANTEED_PACKAGE" | "PROGRAMMATIC_TV" | "AUCTION_PACKAGE";
  /**
   * Denotes the type of the inventory source.
   */
  inventorySourceType?:  | "INVENTORY_SOURCE_TYPE_UNSPECIFIED" | "INVENTORY_SOURCE_TYPE_PRIVATE" | "INVENTORY_SOURCE_TYPE_AUCTION_PACKAGE";
  /**
   * Output only. The resource name of the inventory source.
   */
  readonly name?: string;
  /**
   * The publisher/seller name of the inventory source.
   */
  publisherName?: string;
  /**
   * Required. The rate details of the inventory source.
   */
  rateDetails?: RateDetails;
  /**
   * Output only. The IDs of advertisers with read-only access to the inventory
   * source.
   */
  readonly readAdvertiserIds?: bigint[];
  /**
   * Output only. The IDs of partners with read-only access to the inventory
   * source. All advertisers of partners in this field inherit read-only access
   * to the inventory source.
   */
  readonly readPartnerIds?: bigint[];
  /**
   * The partner or advertisers that have read/write access to the inventory
   * source. Output only when commitment is
   * `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`, in which case the read/write
   * accessors are inherited from the parent guaranteed order. Required when
   * commitment is `INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED`. If commitment
   * is `INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED` and a partner is set in
   * this field, all advertisers under this partner will automatically have
   * read-only access to the inventory source. These advertisers will not be
   * included in read_advertiser_ids.
   */
  readWriteAccessors?: InventorySourceAccessors;
  /**
   * The status settings of the inventory source.
   */
  status?: InventorySourceStatus;
  /**
   * Immutable. The unique ID of the sub-site property assigned to this
   * inventory source.
   */
  subSitePropertyId?: bigint;
  /**
   * The time range when this inventory source starts and stops serving.
   */
  timeRange?: TimeRange;
  /**
   * Output only. The timestamp when the inventory source was last updated.
   * Assigned by the system.
   */
  readonly updateTime?: Date;
}

function serializeInventorySource(data: any): InventorySource {
  return {
    ...data,
    creativeConfigs: data["creativeConfigs"] !== undefined ? data["creativeConfigs"].map((item: any) => (serializeCreativeConfig(item))) : undefined,
    rateDetails: data["rateDetails"] !== undefined ? serializeRateDetails(data["rateDetails"]) : undefined,
    readWriteAccessors: data["readWriteAccessors"] !== undefined ? serializeInventorySourceAccessors(data["readWriteAccessors"]) : undefined,
    subSitePropertyId: data["subSitePropertyId"] !== undefined ? String(data["subSitePropertyId"]) : undefined,
    timeRange: data["timeRange"] !== undefined ? serializeTimeRange(data["timeRange"]) : undefined,
  };
}

function deserializeInventorySource(data: any): InventorySource {
  return {
    ...data,
    creativeConfigs: data["creativeConfigs"] !== undefined ? data["creativeConfigs"].map((item: any) => (deserializeCreativeConfig(item))) : undefined,
    inventorySourceId: data["inventorySourceId"] !== undefined ? BigInt(data["inventorySourceId"]) : undefined,
    rateDetails: data["rateDetails"] !== undefined ? deserializeRateDetails(data["rateDetails"]) : undefined,
    readAdvertiserIds: data["readAdvertiserIds"] !== undefined ? data["readAdvertiserIds"].map((item: any) => (BigInt(item))) : undefined,
    readPartnerIds: data["readPartnerIds"] !== undefined ? data["readPartnerIds"].map((item: any) => (BigInt(item))) : undefined,
    readWriteAccessors: data["readWriteAccessors"] !== undefined ? deserializeInventorySourceAccessors(data["readWriteAccessors"]) : undefined,
    subSitePropertyId: data["subSitePropertyId"] !== undefined ? BigInt(data["subSitePropertyId"]) : undefined,
    timeRange: data["timeRange"] !== undefined ? deserializeTimeRange(data["timeRange"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The partner or advertisers with access to the inventory source.
 */
export interface InventorySourceAccessors {
  /**
   * The advertisers with access to the inventory source. All advertisers must
   * belong to the same partner.
   */
  advertisers?: InventorySourceAccessorsAdvertiserAccessors;
  /**
   * The partner with access to the inventory source.
   */
  partner?: InventorySourceAccessorsPartnerAccessor;
}

function serializeInventorySourceAccessors(data: any): InventorySourceAccessors {
  return {
    ...data,
    advertisers: data["advertisers"] !== undefined ? serializeInventorySourceAccessorsAdvertiserAccessors(data["advertisers"]) : undefined,
    partner: data["partner"] !== undefined ? serializeInventorySourceAccessorsPartnerAccessor(data["partner"]) : undefined,
  };
}

function deserializeInventorySourceAccessors(data: any): InventorySourceAccessors {
  return {
    ...data,
    advertisers: data["advertisers"] !== undefined ? deserializeInventorySourceAccessorsAdvertiserAccessors(data["advertisers"]) : undefined,
    partner: data["partner"] !== undefined ? deserializeInventorySourceAccessorsPartnerAccessor(data["partner"]) : undefined,
  };
}

/**
 * The advertisers with access to the inventory source.
 */
export interface InventorySourceAccessorsAdvertiserAccessors {
  /**
   * The IDs of the advertisers.
   */
  advertiserIds?: bigint[];
}

function serializeInventorySourceAccessorsAdvertiserAccessors(data: any): InventorySourceAccessorsAdvertiserAccessors {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? data["advertiserIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeInventorySourceAccessorsAdvertiserAccessors(data: any): InventorySourceAccessorsAdvertiserAccessors {
  return {
    ...data,
    advertiserIds: data["advertiserIds"] !== undefined ? data["advertiserIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * The partner with access to the inventory source.
 */
export interface InventorySourceAccessorsPartnerAccessor {
  /**
   * The ID of the partner.
   */
  partnerId?: bigint;
}

function serializeInventorySourceAccessorsPartnerAccessor(data: any): InventorySourceAccessorsPartnerAccessor {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceAccessorsPartnerAccessor(data: any): InventorySourceAccessorsPartnerAccessor {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Targeting details for inventory source. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_INVENTORY_SOURCE`.
 */
export interface InventorySourceAssignedTargetingOptionDetails {
  /**
   * Required. ID of the inventory source. Should refer to the
   * inventory_source_id field of an InventorySource resource.
   */
  inventorySourceId?: bigint;
}

function serializeInventorySourceAssignedTargetingOptionDetails(data: any): InventorySourceAssignedTargetingOptionDetails {
  return {
    ...data,
    inventorySourceId: data["inventorySourceId"] !== undefined ? String(data["inventorySourceId"]) : undefined,
  };
}

function deserializeInventorySourceAssignedTargetingOptionDetails(data: any): InventorySourceAssignedTargetingOptionDetails {
  return {
    ...data,
    inventorySourceId: data["inventorySourceId"] !== undefined ? BigInt(data["inventorySourceId"]) : undefined,
  };
}

/**
 * The configuration for display creatives.
 */
export interface InventorySourceDisplayCreativeConfig {
  /**
   * The size requirements for display creatives that can be assigned to the
   * inventory source.
   */
  creativeSize?: Dimensions;
}

/**
 * A filtering option for filtering on Inventory Source entities.
 */
export interface InventorySourceFilter {
  /**
   * Inventory Sources to download by ID. All IDs must belong to the same
   * Advertiser or Partner specified in CreateSdfDownloadTaskRequest. Leave
   * empty to download all Inventory Sources for the selected Advertiser or
   * Partner.
   */
  inventorySourceIds?: bigint[];
}

function serializeInventorySourceFilter(data: any): InventorySourceFilter {
  return {
    ...data,
    inventorySourceIds: data["inventorySourceIds"] !== undefined ? data["inventorySourceIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeInventorySourceFilter(data: any): InventorySourceFilter {
  return {
    ...data,
    inventorySourceIds: data["inventorySourceIds"] !== undefined ? data["inventorySourceIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A collection of targetable inventory sources.
 */
export interface InventorySourceGroup {
  /**
   * Required. The display name of the inventory source group. Must be UTF-8
   * encoded with a maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Output only. The unique ID of the inventory source group. Assigned by the
   * system.
   */
  readonly inventorySourceGroupId?: bigint;
  /**
   * Output only. The resource name of the inventory source group.
   */
  readonly name?: string;
}

/**
 * Targeting details for inventory source group. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`.
 */
export interface InventorySourceGroupAssignedTargetingOptionDetails {
  /**
   * Required. ID of the inventory source group. Should refer to the
   * inventory_source_group_id field of an InventorySourceGroup resource.
   */
  inventorySourceGroupId?: bigint;
}

function serializeInventorySourceGroupAssignedTargetingOptionDetails(data: any): InventorySourceGroupAssignedTargetingOptionDetails {
  return {
    ...data,
    inventorySourceGroupId: data["inventorySourceGroupId"] !== undefined ? String(data["inventorySourceGroupId"]) : undefined,
  };
}

function deserializeInventorySourceGroupAssignedTargetingOptionDetails(data: any): InventorySourceGroupAssignedTargetingOptionDetails {
  return {
    ...data,
    inventorySourceGroupId: data["inventorySourceGroupId"] !== undefined ? BigInt(data["inventorySourceGroupId"]) : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#inventorySourceGroupsAssignedInventorySourcesCreate.
 */
export interface InventorySourceGroupsAssignedInventorySourcesCreateOptions {
  /**
   * The ID of the advertiser that owns the parent inventory source group. The
   * parent partner will not have access to this assigned inventory source.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the parent inventory source group. Only
   * this partner will have write access to this assigned inventory source.
   */
  partnerId?: bigint;
}

function serializeInventorySourceGroupsAssignedInventorySourcesCreateOptions(data: any): InventorySourceGroupsAssignedInventorySourcesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceGroupsAssignedInventorySourcesCreateOptions(data: any): InventorySourceGroupsAssignedInventorySourcesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#inventorySourceGroupsAssignedInventorySourcesDelete.
 */
export interface InventorySourceGroupsAssignedInventorySourcesDeleteOptions {
  /**
   * The ID of the advertiser that owns the parent inventory source group. The
   * parent partner does not have access to this assigned inventory source.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the parent inventory source group. Only
   * this partner has write access to this assigned inventory source.
   */
  partnerId?: bigint;
}

function serializeInventorySourceGroupsAssignedInventorySourcesDeleteOptions(data: any): InventorySourceGroupsAssignedInventorySourcesDeleteOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceGroupsAssignedInventorySourcesDeleteOptions(data: any): InventorySourceGroupsAssignedInventorySourcesDeleteOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for
 * DisplayVideo#inventorySourceGroupsAssignedInventorySourcesList.
 */
export interface InventorySourceGroupsAssignedInventorySourcesListOptions {
  /**
   * The ID of the advertiser that has access to the assignment. If the parent
   * inventory source group is partner-owned, only advertisers to which the
   * parent group is explicitly shared can access the assigned inventory source.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by assigned inventory source fields. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by the logical operator `OR`. * A restriction has the form
   * of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. *
   * Supported fields: - `assignedInventorySourceId` The length of this field
   * should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedInventorySourceId` (default) The default sorting order is
   * ascending. To specify descending order for a field, a suffix " desc" should
   * be added to the field name. Example: `assignedInventorySourceId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `100`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListAssignedInventorySources` method. If not specified, the first page of
   * results will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that has access to the assignment. If the parent
   * inventory source group is advertiser-owned, the assignment cannot be
   * accessed via a partner.
   */
  partnerId?: bigint;
}

function serializeInventorySourceGroupsAssignedInventorySourcesListOptions(data: any): InventorySourceGroupsAssignedInventorySourcesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceGroupsAssignedInventorySourcesListOptions(data: any): InventorySourceGroupsAssignedInventorySourcesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourceGroupsCreate.
 */
export interface InventorySourceGroupsCreateOptions {
  /**
   * The ID of the advertiser that owns the inventory source group. The parent
   * partner will not have access to this group.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the inventory source group. Only this
   * partner will have write access to this group. Only advertisers to which
   * this group is explicitly shared will have read access to this group.
   */
  partnerId?: bigint;
}

function serializeInventorySourceGroupsCreateOptions(data: any): InventorySourceGroupsCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceGroupsCreateOptions(data: any): InventorySourceGroupsCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourceGroupsDelete.
 */
export interface InventorySourceGroupsDeleteOptions {
  /**
   * The ID of the advertiser that owns the inventory source group. The parent
   * partner does not have access to this group.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the inventory source group. Only this
   * partner has write access to this group.
   */
  partnerId?: bigint;
}

function serializeInventorySourceGroupsDeleteOptions(data: any): InventorySourceGroupsDeleteOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceGroupsDeleteOptions(data: any): InventorySourceGroupsDeleteOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourceGroupsGet.
 */
export interface InventorySourceGroupsGetOptions {
  /**
   * The ID of the advertiser that has access to the inventory source group. If
   * an inventory source group is partner-owned, only advertisers to which the
   * group is explicitly shared can access the group.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that has access to the inventory source group. A
   * partner cannot access an advertiser-owned inventory source group.
   */
  partnerId?: bigint;
}

function serializeInventorySourceGroupsGetOptions(data: any): InventorySourceGroupsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceGroupsGetOptions(data: any): InventorySourceGroupsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourceGroupsList.
 */
export interface InventorySourceGroupsListOptions {
  /**
   * The ID of the advertiser that has access to the inventory source group. If
   * an inventory source group is partner-owned, only advertisers to which the
   * group is explicitly shared can access the group.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by inventory source group properties. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by the logical operator `OR`. * A restriction has the form
   * of `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. *
   * Supported fields: - `inventorySourceGroupId` The length of this field
   * should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `inventorySourceGroupId` The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. For example, `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListInventorySources` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that has access to the inventory source group. A
   * partner cannot access advertiser-owned inventory source groups.
   */
  partnerId?: bigint;
}

function serializeInventorySourceGroupsListOptions(data: any): InventorySourceGroupsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourceGroupsListOptions(data: any): InventorySourceGroupsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourceGroupsPatch.
 */
export interface InventorySourceGroupsPatchOptions {
  /**
   * The ID of the advertiser that owns the inventory source group. The parent
   * partner does not have access to this group.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that owns the inventory source group. Only this
   * partner has write access to this group.
   */
  partnerId?: bigint;
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeInventorySourceGroupsPatchOptions(data: any): InventorySourceGroupsPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeInventorySourceGroupsPatchOptions(data: any): InventorySourceGroupsPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourcesCreate.
 */
export interface InventorySourcesCreateOptions {
  /**
   * The ID of the advertiser that the request is being made within.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that the request is being made within.
   */
  partnerId?: bigint;
}

function serializeInventorySourcesCreateOptions(data: any): InventorySourcesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourcesCreateOptions(data: any): InventorySourcesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourcesGet.
 */
export interface InventorySourcesGetOptions {
  /**
   * Required. The ID of the DV360 partner to which the fetched inventory
   * source is permissioned.
   */
  partnerId?: bigint;
}

function serializeInventorySourcesGetOptions(data: any): InventorySourcesGetOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourcesGetOptions(data: any): InventorySourcesGetOptions {
  return {
    ...data,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourcesList.
 */
export interface InventorySourcesListOptions {
  /**
   * The ID of the advertiser that has access to the inventory source.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by inventory source properties. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by `AND` or `OR` logical operators. A sequence of
   * restrictions implicitly uses `AND`. * A restriction has the form of
   * `{field} {operator} {value}`. * The operator must be `EQUALS (=)`. *
   * Supported fields: - `status.entityStatus` - `commitment` - `deliveryMethod`
   * - `rateDetails.rateType` - `exchange` Examples: * All active inventory
   * sources: `status.entityStatus="ENTITY_STATUS_ACTIVE"` * Inventory sources
   * belonging to Google Ad Manager or Rubicon exchanges:
   * `exchange="EXCHANGE_GOOGLE_AD_MANAGER" OR exchange="EXCHANGE_RUBICON"` The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix "desc" should be added to the field name. For
   * example, `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListInventorySources` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
  /**
   * The ID of the partner that has access to the inventory source.
   */
  partnerId?: bigint;
}

function serializeInventorySourcesListOptions(data: any): InventorySourcesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeInventorySourcesListOptions(data: any): InventorySourcesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#inventorySourcesPatch.
 */
export interface InventorySourcesPatchOptions {
  /**
   * The ID of the advertiser that the request is being made within.
   */
  advertiserId?: bigint;
  /**
   * The ID of the partner that the request is being made within.
   */
  partnerId?: bigint;
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeInventorySourcesPatchOptions(data: any): InventorySourcesPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeInventorySourcesPatchOptions(data: any): InventorySourcesPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The status related settings of the inventory source.
 */
export interface InventorySourceStatus {
  /**
   * Output only. The configuration status of the inventory source. Only
   * applicable for guaranteed inventory sources. Acceptable values are
   * `INVENTORY_SOURCE_CONFIG_STATUS_PENDING` and
   * `INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED`. An inventory source must be
   * configured (fill in the required fields, choose creatives, and select a
   * default campaign) before it can serve.
   */
  readonly configStatus?:  | "INVENTORY_SOURCE_CONFIG_STATUS_UNSPECIFIED" | "INVENTORY_SOURCE_CONFIG_STATUS_PENDING" | "INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED";
  /**
   * The user-provided reason for pausing this inventory source. Must not
   * exceed 100 characters. Only applicable when entity_status is set to
   * `ENTITY_STATUS_PAUSED`.
   */
  entityPauseReason?: string;
  /**
   * Whether or not the inventory source is servable. Acceptable values are
   * `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and
   * `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Output only. The seller-provided reason for pausing this inventory source.
   * Only applicable for inventory sources synced directly from the publishers
   * and when seller_status is set to `ENTITY_STATUS_PAUSED`.
   */
  readonly sellerPauseReason?: string;
  /**
   * Output only. The status set by the seller for the inventory source. Only
   * applicable for inventory sources synced directly from the publishers.
   * Acceptable values are `ENTITY_STATUS_ACTIVE` and `ENTITY_STATUS_PAUSED`.
   */
  readonly sellerStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
}

/**
 * The configuration for video creatives.
 */
export interface InventorySourceVideoCreativeConfig {
  /**
   * The duration requirements for the video creatives that can be assigned to
   * the inventory source.
   */
  duration?: number /* Duration */;
}

function serializeInventorySourceVideoCreativeConfig(data: any): InventorySourceVideoCreativeConfig {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeInventorySourceVideoCreativeConfig(data: any): InventorySourceVideoCreativeConfig {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * A single invoice.
 */
export interface Invoice {
  /**
   * The budget grouping ID for this invoice. This field will only be set if
   * the invoice level of the corresponding billing profile was set to "Budget
   * invoice grouping ID".
   */
  budgetInvoiceGroupingId?: string;
  /**
   * The list of summarized information for each budget associated with this
   * invoice. This field will only be set if the invoice detail level of the
   * corresponding billing profile was set to "Budget level PO".
   */
  budgetSummaries?: BudgetSummary[];
  /**
   * The ID of the original invoice being adjusted by this invoice, if
   * applicable. May appear on the invoice PDF as `Reference invoice number`. If
   * replaced_invoice_ids is set, this field will be empty.
   */
  correctedInvoiceId?: string;
  /**
   * The currency used in the invoice in ISO 4217 format.
   */
  currencyCode?: string;
  /**
   * The display name of the invoice.
   */
  displayName?: string;
  /**
   * The date when the invoice is due.
   */
  dueDate?: Date;
  /**
   * The unique ID of the invoice.
   */
  invoiceId?: string;
  /**
   * The type of invoice document.
   */
  invoiceType?:  | "INVOICE_TYPE_UNSPECIFIED" | "INVOICE_TYPE_CREDIT" | "INVOICE_TYPE_INVOICE";
  /**
   * The date when the invoice was issued.
   */
  issueDate?: Date;
  /**
   * The resource name of the invoice.
   */
  name?: string;
  /**
   * The total amount of costs or adjustments not tied to a particular budget,
   * in micros of the invoice's currency. For example, if currency_code is
   * `USD`, then 1000000 represents one US dollar.
   */
  nonBudgetMicros?: bigint;
  /**
   * The ID of the payments account the invoice belongs to. Appears on the
   * invoice PDF as `Billing Account Number`.
   */
  paymentsAccountId?: string;
  /**
   * The ID of the payments profile the invoice belongs to. Appears on the
   * invoice PDF as `Billing ID`.
   */
  paymentsProfileId?: string;
  /**
   * The URL to download a PDF copy of the invoice. This URL is user specific
   * and requires a valid OAuth 2.0 access token to access. The access token
   * must be provided in an `Authorization: Bearer` HTTP header and be
   * authorized for one of the following scopes: *
   * `https://www.googleapis.com/auth/display-video-mediaplanning` *
   * `https://www.googleapis.com/auth/display-video` The URL will be valid for 7
   * days after retrieval of this invoice object or until this invoice is
   * retrieved again.
   */
  pdfUrl?: string;
  /**
   * Purchase order number associated with the invoice.
   */
  purchaseOrderNumber?: string;
  /**
   * The ID(s) of any originally issued invoice that is being cancelled by this
   * invoice, if applicable. Multiple invoices may be listed if those invoices
   * are being consolidated into a single invoice. May appear on invoice PDF as
   * `Replaced invoice numbers`. If corrected_invoice_id is set, this field will
   * be empty.
   */
  replacedInvoiceIds?: string[];
  /**
   * The service start and end dates which are covered by this invoice.
   */
  serviceDateRange?: DateRange;
  /**
   * The pre-tax subtotal amount, in micros of the invoice's currency. For
   * example, if currency_code is `USD`, then 1000000 represents one US dollar.
   */
  subtotalAmountMicros?: bigint;
  /**
   * The invoice total amount, in micros of the invoice's currency. For
   * example, if currency_code is `USD`, then 1000000 represents one US dollar.
   */
  totalAmountMicros?: bigint;
  /**
   * The sum of all taxes in invoice, in micros of the invoice's currency. For
   * example, if currency_code is `USD`, then 1000000 represents one US dollar.
   */
  totalTaxAmountMicros?: bigint;
}

function serializeInvoice(data: any): Invoice {
  return {
    ...data,
    budgetSummaries: data["budgetSummaries"] !== undefined ? data["budgetSummaries"].map((item: any) => (serializeBudgetSummary(item))) : undefined,
    nonBudgetMicros: data["nonBudgetMicros"] !== undefined ? String(data["nonBudgetMicros"]) : undefined,
    subtotalAmountMicros: data["subtotalAmountMicros"] !== undefined ? String(data["subtotalAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? String(data["totalAmountMicros"]) : undefined,
    totalTaxAmountMicros: data["totalTaxAmountMicros"] !== undefined ? String(data["totalTaxAmountMicros"]) : undefined,
  };
}

function deserializeInvoice(data: any): Invoice {
  return {
    ...data,
    budgetSummaries: data["budgetSummaries"] !== undefined ? data["budgetSummaries"].map((item: any) => (deserializeBudgetSummary(item))) : undefined,
    nonBudgetMicros: data["nonBudgetMicros"] !== undefined ? BigInt(data["nonBudgetMicros"]) : undefined,
    subtotalAmountMicros: data["subtotalAmountMicros"] !== undefined ? BigInt(data["subtotalAmountMicros"]) : undefined,
    totalAmountMicros: data["totalAmountMicros"] !== undefined ? BigInt(data["totalAmountMicros"]) : undefined,
    totalTaxAmountMicros: data["totalTaxAmountMicros"] !== undefined ? BigInt(data["totalTaxAmountMicros"]) : undefined,
  };
}

/**
 * Details for assigned keyword targeting option. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_KEYWORD`.
 */
export interface KeywordAssignedTargetingOptionDetails {
  /**
   * Required. The keyword, for example `car insurance`. Positive keyword
   * cannot be offensive word. Must be UTF-8 encoded with a maximum size of 255
   * bytes. Maximum number of characters is 80. Maximum number of words is 10.
   */
  keyword?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
}

/**
 * Details for assigned language targeting option. This will be populated in
 * the details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_LANGUAGE`.
 */
export interface LanguageAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the language (e.g., "French").
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted. All assigned
   * language targeting options on the same resource must have the same value
   * for this field.
   */
  negative?: boolean;
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_LANGUAGE`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable language. This will be populated in the
 * language_details field when targeting_type is `TARGETING_TYPE_LANGUAGE`.
 */
export interface LanguageTargetingOptionDetails {
  /**
   * Output only. The display name of the language (e.g., "French").
   */
  readonly displayName?: string;
}

/**
 * A single line item.
 */
export interface LineItem {
  /**
   * Output only. The unique ID of the advertiser the line item belongs to.
   */
  readonly advertiserId?: bigint;
  /**
   * Required. The bidding strategy of the line item.
   */
  bidStrategy?: BiddingStrategy;
  /**
   * Required. The budget allocation setting of the line item.
   */
  budget?: LineItemBudget;
  /**
   * Output only. The unique ID of the campaign that the line item belongs to.
   */
  readonly campaignId?: bigint;
  /**
   * The conversion tracking setting of the line item.
   */
  conversionCounting?: ConversionCountingConfig;
  /**
   * The IDs of the creatives associated with the line item.
   */
  creativeIds?: bigint[];
  /**
   * Required. The display name of the line item. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Required. Controls whether or not the line item can spend its budget and
   * bid on inventory. * For CreateLineItem method, only `ENTITY_STATUS_DRAFT`
   * is allowed. To activate a line item, use UpdateLineItem method and update
   * the status to `ENTITY_STATUS_ACTIVE` after creation. * A line item cannot
   * be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * If
   * the line item's parent insertion order is not active, the line item can't
   * spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Whether to exclude new exchanges from automatically being targeted by the
   * line item. This field is false by default.
   */
  excludeNewExchanges?: boolean;
  /**
   * Required. The start and end time of the line item's flight.
   */
  flight?: LineItemFlight;
  /**
   * Required. The impression frequency cap settings of the line item. The
   * max_impressions field in this settings object must be used if assigning a
   * limited cap.
   */
  frequencyCap?: FrequencyCap;
  /**
   * Required. Immutable. The unique ID of the insertion order that the line
   * item belongs to.
   */
  insertionOrderId?: bigint;
  /**
   * Integration details of the line item.
   */
  integrationDetails?: IntegrationDetails;
  /**
   * Output only. The unique ID of the line item. Assigned by the system.
   */
  readonly lineItemId?: bigint;
  /**
   * Required. Immutable. The type of the line item.
   */
  lineItemType?:  | "LINE_ITEM_TYPE_UNSPECIFIED" | "LINE_ITEM_TYPE_DISPLAY_DEFAULT" | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL" | "LINE_ITEM_TYPE_VIDEO_DEFAULT" | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL" | "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INVENTORY" | "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INVENTORY" | "LINE_ITEM_TYPE_AUDIO_DEFAULT" | "LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_ACTION" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_AUDIO" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE_OVER_THE_TOP" | "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_TARGET_FREQUENCY";
  /**
   * The mobile app promoted by the line item. This is applicable only when
   * line_item_type is either `LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL` or
   * `LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL`.
   */
  mobileApp?: MobileApp;
  /**
   * Output only. The resource name of the line item.
   */
  readonly name?: string;
  /**
   * Required. The budget spending speed setting of the line item.
   */
  pacing?: Pacing;
  /**
   * The partner costs associated with the line item. If absent or empty in
   * CreateLineItem method, the newly created line item will inherit partner
   * costs from its parent insertion order.
   */
  partnerCosts?: PartnerCost[];
  /**
   * Required. The partner revenue model setting of the line item.
   */
  partnerRevenueModel?: PartnerRevenueModel;
  /**
   * Output only. The reservation type of the line item.
   */
  readonly reservationType?:  | "RESERVATION_TYPE_UNSPECIFIED" | "RESERVATION_TYPE_NOT_GUARANTEED" | "RESERVATION_TYPE_PROGRAMMATIC_GUARANTEED" | "RESERVATION_TYPE_TAG_GUARANTEED" | "RESERVATION_TYPE_PETRA_VIRAL" | "RESERVATION_TYPE_INSTANT_RESERVE";
  /**
   * The [targeting
   * expansion](//support.google.com/displayvideo/answer/10191558) settings of
   * the line item. This config is only applicable when eligible audience list
   * targeting is assigned to the line item.
   */
  targetingExpansion?: TargetingExpansionConfig;
  /**
   * Output only. The timestamp when the line item was last updated. Assigned
   * by the system.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The warning messages generated by the line item. These
   * warnings do not block saving the line item, but some may block the line
   * item from running.
   */
  readonly warningMessages?:  | "LINE_ITEM_WARNING_MESSAGE_UNSPECIFIED" | "INVALID_FLIGHT_DATES" | "EXPIRED" | "PENDING_FLIGHT" | "ALL_PARTNER_ENABLED_EXCHANGES_NEGATIVELY_TARGETED" | "INVALID_INVENTORY_SOURCE" | "APP_INVENTORY_INVALID_SITE_TARGETING" | "APP_INVENTORY_INVALID_AUDIENCE_LISTS" | "NO_VALID_CREATIVE" | "PARENT_INSERTION_ORDER_PAUSED" | "PARENT_INSERTION_ORDER_EXPIRED" | "DEPRECATED_FIRST_PARTY_AUDIENCE_EXCLUSION"[];
  /**
   * Output only. Settings specific to YouTube and Partners line items.
   */
  readonly youtubeAndPartnersSettings?: YoutubeAndPartnersSettings;
}

function serializeLineItem(data: any): LineItem {
  return {
    ...data,
    bidStrategy: data["bidStrategy"] !== undefined ? serializeBiddingStrategy(data["bidStrategy"]) : undefined,
    budget: data["budget"] !== undefined ? serializeLineItemBudget(data["budget"]) : undefined,
    conversionCounting: data["conversionCounting"] !== undefined ? serializeConversionCountingConfig(data["conversionCounting"]) : undefined,
    creativeIds: data["creativeIds"] !== undefined ? data["creativeIds"].map((item: any) => (String(item))) : undefined,
    insertionOrderId: data["insertionOrderId"] !== undefined ? String(data["insertionOrderId"]) : undefined,
    pacing: data["pacing"] !== undefined ? serializePacing(data["pacing"]) : undefined,
    partnerCosts: data["partnerCosts"] !== undefined ? data["partnerCosts"].map((item: any) => (serializePartnerCost(item))) : undefined,
    partnerRevenueModel: data["partnerRevenueModel"] !== undefined ? serializePartnerRevenueModel(data["partnerRevenueModel"]) : undefined,
  };
}

function deserializeLineItem(data: any): LineItem {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    bidStrategy: data["bidStrategy"] !== undefined ? deserializeBiddingStrategy(data["bidStrategy"]) : undefined,
    budget: data["budget"] !== undefined ? deserializeLineItemBudget(data["budget"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    conversionCounting: data["conversionCounting"] !== undefined ? deserializeConversionCountingConfig(data["conversionCounting"]) : undefined,
    creativeIds: data["creativeIds"] !== undefined ? data["creativeIds"].map((item: any) => (BigInt(item))) : undefined,
    insertionOrderId: data["insertionOrderId"] !== undefined ? BigInt(data["insertionOrderId"]) : undefined,
    lineItemId: data["lineItemId"] !== undefined ? BigInt(data["lineItemId"]) : undefined,
    pacing: data["pacing"] !== undefined ? deserializePacing(data["pacing"]) : undefined,
    partnerCosts: data["partnerCosts"] !== undefined ? data["partnerCosts"].map((item: any) => (deserializePartnerCost(item))) : undefined,
    partnerRevenueModel: data["partnerRevenueModel"] !== undefined ? deserializePartnerRevenueModel(data["partnerRevenueModel"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    youtubeAndPartnersSettings: data["youtubeAndPartnersSettings"] !== undefined ? deserializeYoutubeAndPartnersSettings(data["youtubeAndPartnersSettings"]) : undefined,
  };
}

/**
 * Wrapper object associating an assigned_targeting_option resource and the
 * line item it is assigned to.
 */
export interface LineItemAssignedTargetingOption {
  /**
   * The assigned targeting option resource.
   */
  assignedTargetingOption?: AssignedTargetingOption;
  /**
   * The ID of the line item the assigned targeting option is assigned to.
   */
  lineItemId?: bigint;
}

function serializeLineItemAssignedTargetingOption(data: any): LineItemAssignedTargetingOption {
  return {
    ...data,
    assignedTargetingOption: data["assignedTargetingOption"] !== undefined ? serializeAssignedTargetingOption(data["assignedTargetingOption"]) : undefined,
    lineItemId: data["lineItemId"] !== undefined ? String(data["lineItemId"]) : undefined,
  };
}

function deserializeLineItemAssignedTargetingOption(data: any): LineItemAssignedTargetingOption {
  return {
    ...data,
    assignedTargetingOption: data["assignedTargetingOption"] !== undefined ? deserializeAssignedTargetingOption(data["assignedTargetingOption"]) : undefined,
    lineItemId: data["lineItemId"] !== undefined ? BigInt(data["lineItemId"]) : undefined,
  };
}

/**
 * Settings that control how budget is allocated.
 */
export interface LineItemBudget {
  /**
   * Required. The type of the budget allocation.
   * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC` is only applicable when
   * automatic budget allocation is enabled for the parent insertion order.
   */
  budgetAllocationType?:  | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNSPECIFIED" | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC" | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED" | "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED";
  /**
   * Output only. The budget unit specifies whether the budget is currency
   * based or impression based. This value is inherited from the parent
   * insertion order.
   */
  readonly budgetUnit?:  | "BUDGET_UNIT_UNSPECIFIED" | "BUDGET_UNIT_CURRENCY" | "BUDGET_UNIT_IMPRESSIONS";
  /**
   * The maximum budget amount the line item will spend. Must be greater than
   * 0. When budget_allocation_type is: *
   * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC`, this field is immutable and
   * is set by the system. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED`, if
   * budget_unit is: - `BUDGET_UNIT_CURRENCY`, this field represents maximum
   * budget amount to spend, in micros of the advertiser's currency. For
   * example, 1500000 represents 1.5 standard units of the currency. -
   * `BUDGET_UNIT_IMPRESSIONS`, this field represents the maximum number of
   * impressions to serve. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED`, this
   * field is not applicable and will be ignored by the system.
   */
  maxAmount?: bigint;
}

function serializeLineItemBudget(data: any): LineItemBudget {
  return {
    ...data,
    maxAmount: data["maxAmount"] !== undefined ? String(data["maxAmount"]) : undefined,
  };
}

function deserializeLineItemBudget(data: any): LineItemBudget {
  return {
    ...data,
    maxAmount: data["maxAmount"] !== undefined ? BigInt(data["maxAmount"]) : undefined,
  };
}

/**
 * Settings that control the active duration of a line item.
 */
export interface LineItemFlight {
  /**
   * The flight start and end dates of the line item. They are resolved
   * relative to the parent advertiser's time zone. * Required when
   * flight_date_type is `LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM`. Output only
   * otherwise. * When creating a new flight, both `start_date` and `end_date`
   * must be in the future. * An existing flight with a `start_date` in the past
   * has a mutable `end_date` but an immutable `start_date`. * `end_date` must
   * be the `start_date` or later, both before the year 2037.
   */
  dateRange?: DateRange;
  /**
   * Required. The type of the line item's flight dates.
   */
  flightDateType?:  | "LINE_ITEM_FLIGHT_DATE_TYPE_UNSPECIFIED" | "LINE_ITEM_FLIGHT_DATE_TYPE_INHERITED" | "LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM";
}

/**
 * Response message for ListAdvertiserAssignedTargetingOptions.
 */
export interface ListAdvertiserAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * ListAdvertiserAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeListAdvertiserAssignedTargetingOptionsResponse(data: any): ListAdvertiserAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeListAdvertiserAssignedTargetingOptionsResponse(data: any): ListAdvertiserAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

export interface ListAdvertisersResponse {
  /**
   * The list of advertisers. This list will be absent if empty.
   */
  advertisers?: Advertiser[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListAdvertisers` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListAdvertisersResponse(data: any): ListAdvertisersResponse {
  return {
    ...data,
    advertisers: data["advertisers"] !== undefined ? data["advertisers"].map((item: any) => (serializeAdvertiser(item))) : undefined,
  };
}

function deserializeListAdvertisersResponse(data: any): ListAdvertisersResponse {
  return {
    ...data,
    advertisers: data["advertisers"] !== undefined ? data["advertisers"].map((item: any) => (deserializeAdvertiser(item))) : undefined,
  };
}

/**
 * Response message for
 * AssignedInventorySourceService.ListAssignedInventorySources.
 */
export interface ListAssignedInventorySourcesResponse {
  /**
   * The list of assigned inventory sources. This list will be absent if empty.
   */
  assignedInventorySources?: AssignedInventorySource[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListAssignedInventorySources`
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for AssignedLocationService.ListAssignedLocations.
 */
export interface ListAssignedLocationsResponse {
  /**
   * The list of assigned locations. This list will be absent if empty.
   */
  assignedLocations?: AssignedLocation[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListAssignedLocations` method
   * to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListCampaignAssignedTargetingOptions.
 */
export interface ListCampaignAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * ListCampaignAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeListCampaignAssignedTargetingOptionsResponse(data: any): ListCampaignAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeListCampaignAssignedTargetingOptionsResponse(data: any): ListCampaignAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

export interface ListCampaignsResponse {
  /**
   * The list of campaigns. This list will be absent if empty.
   */
  campaigns?: Campaign[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListCampaigns` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListCampaignsResponse(data: any): ListCampaignsResponse {
  return {
    ...data,
    campaigns: data["campaigns"] !== undefined ? data["campaigns"].map((item: any) => (serializeCampaign(item))) : undefined,
  };
}

function deserializeListCampaignsResponse(data: any): ListCampaignsResponse {
  return {
    ...data,
    campaigns: data["campaigns"] !== undefined ? data["campaigns"].map((item: any) => (deserializeCampaign(item))) : undefined,
  };
}

export interface ListChannelsResponse {
  /**
   * The list of channels. This list will be absent if empty.
   */
  channels?: Channel[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListChannels` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListChannelsResponse(data: any): ListChannelsResponse {
  return {
    ...data,
    channels: data["channels"] !== undefined ? data["channels"].map((item: any) => (serializeChannel(item))) : undefined,
  };
}

function deserializeListChannelsResponse(data: any): ListChannelsResponse {
  return {
    ...data,
    channels: data["channels"] !== undefined ? data["channels"].map((item: any) => (deserializeChannel(item))) : undefined,
  };
}

export interface ListCombinedAudiencesResponse {
  /**
   * The list of combined audiences. This list will be absent if empty.
   */
  combinedAudiences?: CombinedAudience[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListCombinedAudiences` method
   * to retrieve the next page of results.
   */
  nextPageToken?: string;
}

export interface ListCreativesResponse {
  /**
   * The list of creatives. This list will be absent if empty.
   */
  creatives?: Creative[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListCreativesRequest` method to
   * retrieve the next page of results. If this field is null, it means this is
   * the last page.
   */
  nextPageToken?: string;
}

function serializeListCreativesResponse(data: any): ListCreativesResponse {
  return {
    ...data,
    creatives: data["creatives"] !== undefined ? data["creatives"].map((item: any) => (serializeCreative(item))) : undefined,
  };
}

function deserializeListCreativesResponse(data: any): ListCreativesResponse {
  return {
    ...data,
    creatives: data["creatives"] !== undefined ? data["creatives"].map((item: any) => (deserializeCreative(item))) : undefined,
  };
}

export interface ListCustomBiddingAlgorithmsResponse {
  /**
   * The list of custom bidding algorithms. This list will be absent if empty.
   */
  customBiddingAlgorithms?: CustomBiddingAlgorithm[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to
   * `ListCustomBiddingAlgorithmsRequest` method to retrieve the next page of
   * results. If this field is null, it means this is the last page.
   */
  nextPageToken?: string;
}

function serializeListCustomBiddingAlgorithmsResponse(data: any): ListCustomBiddingAlgorithmsResponse {
  return {
    ...data,
    customBiddingAlgorithms: data["customBiddingAlgorithms"] !== undefined ? data["customBiddingAlgorithms"].map((item: any) => (serializeCustomBiddingAlgorithm(item))) : undefined,
  };
}

function deserializeListCustomBiddingAlgorithmsResponse(data: any): ListCustomBiddingAlgorithmsResponse {
  return {
    ...data,
    customBiddingAlgorithms: data["customBiddingAlgorithms"] !== undefined ? data["customBiddingAlgorithms"].map((item: any) => (deserializeCustomBiddingAlgorithm(item))) : undefined,
  };
}

export interface ListCustomBiddingScriptsResponse {
  /**
   * The list of custom bidding scripts. This list will be absent if empty.
   */
  customBiddingScripts?: CustomBiddingScript[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to
   * `ListCustomBiddingScriptsRequest` method to retrieve the next page of
   * results. If this field is null, it means this is the last page.
   */
  nextPageToken?: string;
}

export interface ListCustomListsResponse {
  /**
   * The list of custom lists. This list will be absent if empty.
   */
  customLists?: CustomList[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListCustomLists` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

export interface ListFirstAndThirdPartyAudiencesResponse {
  /**
   * The list of first and third party audiences. Audience size properties will
   * not be included. This list will be absent if empty.
   */
  firstAndThirdPartyAudiences?: FirstAndThirdPartyAudience[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to
   * `ListFirstAndThirdPartyAudiences` method to retrieve the next page of
   * results.
   */
  nextPageToken?: string;
}

function serializeListFirstAndThirdPartyAudiencesResponse(data: any): ListFirstAndThirdPartyAudiencesResponse {
  return {
    ...data,
    firstAndThirdPartyAudiences: data["firstAndThirdPartyAudiences"] !== undefined ? data["firstAndThirdPartyAudiences"].map((item: any) => (serializeFirstAndThirdPartyAudience(item))) : undefined,
  };
}

function deserializeListFirstAndThirdPartyAudiencesResponse(data: any): ListFirstAndThirdPartyAudiencesResponse {
  return {
    ...data,
    firstAndThirdPartyAudiences: data["firstAndThirdPartyAudiences"] !== undefined ? data["firstAndThirdPartyAudiences"].map((item: any) => (deserializeFirstAndThirdPartyAudience(item))) : undefined,
  };
}

export interface ListGoogleAudiencesResponse {
  /**
   * The list of Google audiences. This list will be absent if empty.
   */
  googleAudiences?: GoogleAudience[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListGoogleAudiences` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

export interface ListGuaranteedOrdersResponse {
  /**
   * The list of guaranteed orders. This list will be absent if empty.
   */
  guaranteedOrders?: GuaranteedOrder[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListGuaranteedOrders` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListGuaranteedOrdersResponse(data: any): ListGuaranteedOrdersResponse {
  return {
    ...data,
    guaranteedOrders: data["guaranteedOrders"] !== undefined ? data["guaranteedOrders"].map((item: any) => (serializeGuaranteedOrder(item))) : undefined,
  };
}

function deserializeListGuaranteedOrdersResponse(data: any): ListGuaranteedOrdersResponse {
  return {
    ...data,
    guaranteedOrders: data["guaranteedOrders"] !== undefined ? data["guaranteedOrders"].map((item: any) => (deserializeGuaranteedOrder(item))) : undefined,
  };
}

/**
 * Response message for ListInsertionOrderAssignedTargetingOptions.
 */
export interface ListInsertionOrderAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * ListInsertionOrderAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeListInsertionOrderAssignedTargetingOptionsResponse(data: any): ListInsertionOrderAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeListInsertionOrderAssignedTargetingOptionsResponse(data: any): ListInsertionOrderAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

export interface ListInsertionOrdersResponse {
  /**
   * The list of insertion orders. This list will be absent if empty.
   */
  insertionOrders?: InsertionOrder[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListInsertionOrders` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListInsertionOrdersResponse(data: any): ListInsertionOrdersResponse {
  return {
    ...data,
    insertionOrders: data["insertionOrders"] !== undefined ? data["insertionOrders"].map((item: any) => (serializeInsertionOrder(item))) : undefined,
  };
}

function deserializeListInsertionOrdersResponse(data: any): ListInsertionOrdersResponse {
  return {
    ...data,
    insertionOrders: data["insertionOrders"] !== undefined ? data["insertionOrders"].map((item: any) => (deserializeInsertionOrder(item))) : undefined,
  };
}

/**
 * Response message for InventorySourceGroupService.ListInventorySourceGroups.
 */
export interface ListInventorySourceGroupsResponse {
  /**
   * The list of inventory source groups. This list will be absent if empty.
   */
  inventorySourceGroups?: InventorySourceGroup[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListInventorySourceGroups`
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

export interface ListInventorySourcesResponse {
  /**
   * The list of inventory sources. This list will be absent if empty.
   */
  inventorySources?: InventorySource[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListInventorySources` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListInventorySourcesResponse(data: any): ListInventorySourcesResponse {
  return {
    ...data,
    inventorySources: data["inventorySources"] !== undefined ? data["inventorySources"].map((item: any) => (serializeInventorySource(item))) : undefined,
  };
}

function deserializeListInventorySourcesResponse(data: any): ListInventorySourcesResponse {
  return {
    ...data,
    inventorySources: data["inventorySources"] !== undefined ? data["inventorySources"].map((item: any) => (deserializeInventorySource(item))) : undefined,
  };
}

export interface ListInvoicesResponse {
  /**
   * The list of invoices. This list will be absent if empty.
   */
  invoices?: Invoice[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListInvoices` method to
   * retrieve the next page of results. This token will be absent if there are
   * no more invoices to return.
   */
  nextPageToken?: string;
}

function serializeListInvoicesResponse(data: any): ListInvoicesResponse {
  return {
    ...data,
    invoices: data["invoices"] !== undefined ? data["invoices"].map((item: any) => (serializeInvoice(item))) : undefined,
  };
}

function deserializeListInvoicesResponse(data: any): ListInvoicesResponse {
  return {
    ...data,
    invoices: data["invoices"] !== undefined ? data["invoices"].map((item: any) => (deserializeInvoice(item))) : undefined,
  };
}

/**
 * Response message for ListLineItemAssignedTargetingOptions.
 */
export interface ListLineItemAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * ListLineItemAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeListLineItemAssignedTargetingOptionsResponse(data: any): ListLineItemAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeListLineItemAssignedTargetingOptionsResponse(data: any): ListLineItemAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

export interface ListLineItemsResponse {
  /**
   * The list of line items. This list will be absent if empty.
   */
  lineItems?: LineItem[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListLineItems` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListLineItemsResponse(data: any): ListLineItemsResponse {
  return {
    ...data,
    lineItems: data["lineItems"] !== undefined ? data["lineItems"].map((item: any) => (serializeLineItem(item))) : undefined,
  };
}

function deserializeListLineItemsResponse(data: any): ListLineItemsResponse {
  return {
    ...data,
    lineItems: data["lineItems"] !== undefined ? data["lineItems"].map((item: any) => (deserializeLineItem(item))) : undefined,
  };
}

export interface ListLocationListsResponse {
  /**
   * The list of location lists. This list will be absent if empty.
   */
  locationLists?: LocationList[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListLocationLists` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListLocationListsResponse(data: any): ListLocationListsResponse {
  return {
    ...data,
    locationLists: data["locationLists"] !== undefined ? data["locationLists"].map((item: any) => (serializeLocationList(item))) : undefined,
  };
}

function deserializeListLocationListsResponse(data: any): ListLocationListsResponse {
  return {
    ...data,
    locationLists: data["locationLists"] !== undefined ? data["locationLists"].map((item: any) => (deserializeLocationList(item))) : undefined,
  };
}

export interface ListManualTriggersResponse {
  /**
   * The list of manual triggers. This list will be absent if empty.
   */
  manualTriggers?: ManualTrigger[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListManualTriggers` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListManualTriggersResponse(data: any): ListManualTriggersResponse {
  return {
    ...data,
    manualTriggers: data["manualTriggers"] !== undefined ? data["manualTriggers"].map((item: any) => (serializeManualTrigger(item))) : undefined,
  };
}

function deserializeListManualTriggersResponse(data: any): ListManualTriggersResponse {
  return {
    ...data,
    manualTriggers: data["manualTriggers"] !== undefined ? data["manualTriggers"].map((item: any) => (deserializeManualTrigger(item))) : undefined,
  };
}

/**
 * Response message for NegativeKeywordListService.ListNegativeKeywordLists.
 */
export interface ListNegativeKeywordListsResponse {
  /**
   * The list of negative keyword lists. This list will be absent if empty.
   */
  negativeKeywordLists?: NegativeKeywordList[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListNegativeKeywordLists`
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for NegativeKeywordService.ListNegativeKeywords.
 */
export interface ListNegativeKeywordsResponse {
  /**
   * The list of negative keywords. This list will be absent if empty.
   */
  negativeKeywords?: NegativeKeyword[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListNegativeKeywords` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
}

export interface ListPartnerAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * ListPartnerAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeListPartnerAssignedTargetingOptionsResponse(data: any): ListPartnerAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeListPartnerAssignedTargetingOptionsResponse(data: any): ListPartnerAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

export interface ListPartnersResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListPartners` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of partners. This list will be absent if empty.
   */
  partners?: Partner[];
}

/**
 * Response message for SiteService.ListSites.
 */
export interface ListSitesResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListSites` method to retrieve
   * the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of sites. This list will be absent if empty.
   */
  sites?: Site[];
}

/**
 * Response message for ListTargetingOptions.
 */
export interface ListTargetingOptionsResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListTargetingOptions` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of targeting options. This list will be absent if empty.
   */
  targetingOptions?: TargetingOption[];
}

export interface ListUsersResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListUsers` method to retrieve
   * the next page of results. This token will be absent if there are no more
   * results to return.
   */
  nextPageToken?: string;
  /**
   * The list of users. This list will be absent if empty.
   */
  users?: User[];
}

function serializeListUsersResponse(data: any): ListUsersResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (serializeUser(item))) : undefined,
  };
}

function deserializeListUsersResponse(data: any): ListUsersResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (deserializeUser(item))) : undefined,
  };
}

export interface ListYoutubeAdGroupAdsResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListYoutubeAdGroupAds` method
   * to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of ad group ads. This list will be absent if empty.
   */
  youtubeAdGroupAds?: YoutubeAdGroupAd[];
}

function serializeListYoutubeAdGroupAdsResponse(data: any): ListYoutubeAdGroupAdsResponse {
  return {
    ...data,
    youtubeAdGroupAds: data["youtubeAdGroupAds"] !== undefined ? data["youtubeAdGroupAds"].map((item: any) => (serializeYoutubeAdGroupAd(item))) : undefined,
  };
}

function deserializeListYoutubeAdGroupAdsResponse(data: any): ListYoutubeAdGroupAdsResponse {
  return {
    ...data,
    youtubeAdGroupAds: data["youtubeAdGroupAds"] !== undefined ? data["youtubeAdGroupAds"].map((item: any) => (deserializeYoutubeAdGroupAd(item))) : undefined,
  };
}

/**
 * Response message for ListYoutubeAdGroupAssignedTargetingOptions.
 */
export interface ListYoutubeAdGroupAssignedTargetingOptionsResponse {
  /**
   * The list of assigned targeting options. This list will be absent if empty.
   */
  assignedTargetingOptions?: AssignedTargetingOption[];
  /**
   * A token identifying the next page of results. This value should be
   * specified as the pageToken in a subsequent
   * ListYoutubeAdGroupAssignedTargetingOptionsRequest to fetch the next page of
   * results. This token will be absent if there are no more
   * assigned_targeting_options to return.
   */
  nextPageToken?: string;
}

function serializeListYoutubeAdGroupAssignedTargetingOptionsResponse(data: any): ListYoutubeAdGroupAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (serializeAssignedTargetingOption(item))) : undefined,
  };
}

function deserializeListYoutubeAdGroupAssignedTargetingOptionsResponse(data: any): ListYoutubeAdGroupAssignedTargetingOptionsResponse {
  return {
    ...data,
    assignedTargetingOptions: data["assignedTargetingOptions"] !== undefined ? data["assignedTargetingOptions"].map((item: any) => (deserializeAssignedTargetingOption(item))) : undefined,
  };
}

export interface ListYoutubeAdGroupsResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `ListYoutubeAdGroups` method to
   * retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of ad groups. This list will be absent if empty.
   */
  youtubeAdGroups?: YoutubeAdGroup[];
}

function serializeListYoutubeAdGroupsResponse(data: any): ListYoutubeAdGroupsResponse {
  return {
    ...data,
    youtubeAdGroups: data["youtubeAdGroups"] !== undefined ? data["youtubeAdGroups"].map((item: any) => (serializeYoutubeAdGroup(item))) : undefined,
  };
}

function deserializeListYoutubeAdGroupsResponse(data: any): ListYoutubeAdGroupsResponse {
  return {
    ...data,
    youtubeAdGroups: data["youtubeAdGroups"] !== undefined ? data["youtubeAdGroups"].map((item: any) => (deserializeYoutubeAdGroup(item))) : undefined,
  };
}

/**
 * A list of locations used for targeting.
 */
export interface LocationList {
  /**
   * Required. Immutable. The unique ID of the advertiser the location list
   * belongs to.
   */
  advertiserId?: bigint;
  /**
   * Required. The display name of the location list. Must be UTF-8 encoded
   * with a maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Output only. The unique ID of the location list. Assigned by the system.
   */
  readonly locationListId?: bigint;
  /**
   * Required. Immutable. The type of location. All locations in the list will
   * share this type.
   */
  locationType?:  | "TARGETING_LOCATION_TYPE_UNSPECIFIED" | "TARGETING_LOCATION_TYPE_PROXIMITY" | "TARGETING_LOCATION_TYPE_REGIONAL";
  /**
   * Output only. The resource name of the location list.
   */
  readonly name?: string;
}

function serializeLocationList(data: any): LocationList {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeLocationList(data: any): LocationList {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    locationListId: data["locationListId"] !== undefined ? BigInt(data["locationListId"]) : undefined,
  };
}

/**
 * Specifies how many days into the past to look when determining whether to
 * record a conversion.
 */
export interface LookbackWindow {
  /**
   * Lookback window, in days, from the last time a given user clicked on one
   * of your ads.
   */
  clickDays?: number;
  /**
   * Lookback window, in days, from the last time a given user viewed one of
   * your ads.
   */
  impressionDays?: number;
}

export interface LookupInvoiceCurrencyResponse {
  /**
   * Currency used by the advertiser in ISO 4217 format.
   */
  currencyCode?: string;
}

/**
 * A single manual trigger in Display & Video 360.
 */
export interface ManualTrigger {
  /**
   * Required. The maximum duration of each activation in minutes. Must be
   * between 1 and 360 inclusive. After this duration, the trigger will be
   * automatically deactivated.
   */
  activationDurationMinutes?: bigint;
  /**
   * Required. Immutable. The unique ID of the advertiser that the manual
   * trigger belongs to.
   */
  advertiserId?: bigint;
  /**
   * Required. The display name of the manual trigger. Must be UTF-8 encoded
   * with a maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Output only. The timestamp of the trigger's latest activation.
   */
  readonly latestActivationTime?: Date;
  /**
   * Output only. The resource name of the manual trigger.
   */
  readonly name?: string;
  /**
   * Output only. The state of the manual trigger. Will be set to the
   * `INACTIVE` state upon creation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE";
  /**
   * Output only. The unique ID of the manual trigger.
   */
  readonly triggerId?: bigint;
}

function serializeManualTrigger(data: any): ManualTrigger {
  return {
    ...data,
    activationDurationMinutes: data["activationDurationMinutes"] !== undefined ? String(data["activationDurationMinutes"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeManualTrigger(data: any): ManualTrigger {
  return {
    ...data,
    activationDurationMinutes: data["activationDurationMinutes"] !== undefined ? BigInt(data["activationDurationMinutes"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    latestActivationTime: data["latestActivationTime"] !== undefined ? new Date(data["latestActivationTime"]) : undefined,
    triggerId: data["triggerId"] !== undefined ? BigInt(data["triggerId"]) : undefined,
  };
}

/**
 * Details for a Masthead Ad.
 */
export interface MastheadAd {
  /**
   * The duration of time the video will autoplay.
   */
  autoplayVideoDuration?: number /* Duration */;
  /**
   * The amount of time in milliseconds after which the video will start to
   * play.
   */
  autoplayVideoStartMillisecond?: bigint;
  /**
   * The text on the call-to-action button.
   */
  callToActionButtonLabel?: string;
  /**
   * The destination URL for the call-to-action button.
   */
  callToActionFinalUrl?: string;
  /**
   * The tracking URL for the call-to-action button.
   */
  callToActionTrackingUrl?: string;
  /**
   * The videos that appear next to the Masthead Ad on desktop. Can be no more
   * than two.
   */
  companionYoutubeVideos?: YoutubeVideoDetails[];
  /**
   * The description of the ad.
   */
  description?: string;
  /**
   * The headline of the ad.
   */
  headline?: string;
  /**
   * Whether to show a background or banner that appears at the top of a
   * YouTube page.
   */
  showChannelArt?: boolean;
  /**
   * The YouTube video used by the ad.
   */
  video?: YoutubeVideoDetails;
  /**
   * The aspect ratio of the autoplaying YouTube video on the Masthead.
   */
  videoAspectRatio?:  | "VIDEO_ASPECT_RATIO_UNSPECIFIED" | "VIDEO_ASPECT_RATIO_WIDESCREEN" | "VIDEO_ASPECT_RATIO_FIXED_16_9";
}

function serializeMastheadAd(data: any): MastheadAd {
  return {
    ...data,
    autoplayVideoDuration: data["autoplayVideoDuration"] !== undefined ? data["autoplayVideoDuration"] : undefined,
    autoplayVideoStartMillisecond: data["autoplayVideoStartMillisecond"] !== undefined ? String(data["autoplayVideoStartMillisecond"]) : undefined,
  };
}

function deserializeMastheadAd(data: any): MastheadAd {
  return {
    ...data,
    autoplayVideoDuration: data["autoplayVideoDuration"] !== undefined ? data["autoplayVideoDuration"] : undefined,
    autoplayVideoStartMillisecond: data["autoplayVideoStartMillisecond"] !== undefined ? BigInt(data["autoplayVideoStartMillisecond"]) : undefined,
  };
}

/**
 * A strategy that automatically adjusts the bid to optimize a specified
 * performance goal while spending the full budget.
 */
export interface MaximizeSpendBidStrategy {
  /**
   * The ID of the Custom Bidding Algorithm used by this strategy. Only
   * applicable when performance_goal_type is set to
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`.
   */
  customBiddingAlgorithmId?: bigint;
  /**
   * The maximum average CPM that may be bid, in micros of the advertiser's
   * currency. Must be greater than or equal to a billable unit of the given
   * currency. For example, 1500000 represents 1.5 standard units of the
   * currency.
   */
  maxAverageCpmBidAmountMicros?: bigint;
  /**
   * Required. The type of the performance goal that the bidding strategy tries
   * to minimize while spending the full budget.
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` is not supported for
   * this strategy.
   */
  performanceGoalType?:  | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED";
  /**
   * Whether the strategy takes deal floor prices into account.
   */
  raiseBidForDeals?: boolean;
}

function serializeMaximizeSpendBidStrategy(data: any): MaximizeSpendBidStrategy {
  return {
    ...data,
    customBiddingAlgorithmId: data["customBiddingAlgorithmId"] !== undefined ? String(data["customBiddingAlgorithmId"]) : undefined,
    maxAverageCpmBidAmountMicros: data["maxAverageCpmBidAmountMicros"] !== undefined ? String(data["maxAverageCpmBidAmountMicros"]) : undefined,
  };
}

function deserializeMaximizeSpendBidStrategy(data: any): MaximizeSpendBidStrategy {
  return {
    ...data,
    customBiddingAlgorithmId: data["customBiddingAlgorithmId"] !== undefined ? BigInt(data["customBiddingAlgorithmId"]) : undefined,
    maxAverageCpmBidAmountMicros: data["maxAverageCpmBidAmountMicros"] !== undefined ? BigInt(data["maxAverageCpmBidAmountMicros"]) : undefined,
  };
}

/**
 * Measurement settings of a partner.
 */
export interface MeasurementConfig {
  /**
   * Whether or not to report DV360 cost to CM360.
   */
  dv360ToCmCostReportingEnabled?: boolean;
  /**
   * Whether or not to include DV360 data in CM360 data transfer reports.
   */
  dv360ToCmDataSharingEnabled?: boolean;
}

/**
 * A mobile app promoted by a mobile app install line item.
 */
export interface MobileApp {
  /**
   * Required. The ID of the app provided by the platform store. Android apps
   * are identified by the bundle ID used by Android's Play store, such as
   * `com.google.android.gm`. iOS apps are identified by a nine-digit app ID
   * used by Apple's App store, such as `422689480`.
   */
  appId?: string;
  /**
   * Output only. The app name.
   */
  readonly displayName?: string;
  /**
   * Output only. The app platform.
   */
  readonly platform?:  | "PLATFORM_UNSPECIFIED" | "IOS" | "ANDROID";
  /**
   * Output only. The app publisher.
   */
  readonly publisher?: string;
}

/**
 * Wrapper message for a list of mobile device IDs defining Customer Match
 * audience members.
 */
export interface MobileDeviceIdList {
  /**
   * A list of mobile device IDs defining Customer Match audience members. The
   * size of mobile_device_ids mustn't be greater than 500,000.
   */
  mobileDeviceIds?: string[];
}

/**
 * Represents an amount of money with its currency type.
 */
export interface Money {
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

function serializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Details for native content position assigned targeting option. This will be
 * populated in the native_content_position_details field when targeting_type is
 * `TARGETING_TYPE_NATIVE_CONTENT_POSITION`. Explicitly targeting all options is
 * not supported. Remove all native content position targeting options to
 * achieve this effect.
 */
export interface NativeContentPositionAssignedTargetingOptionDetails {
  /**
   * The content position. Output only in v1. Required in v2.
   */
  contentPosition?:  | "NATIVE_CONTENT_POSITION_UNSPECIFIED" | "NATIVE_CONTENT_POSITION_UNKNOWN" | "NATIVE_CONTENT_POSITION_IN_ARTICLE" | "NATIVE_CONTENT_POSITION_IN_FEED" | "NATIVE_CONTENT_POSITION_PERIPHERAL" | "NATIVE_CONTENT_POSITION_RECOMMENDATION";
}

/**
 * Represents a targetable native content position. This will be populated in
 * the native_content_position_details field when targeting_type is
 * `TARGETING_TYPE_NATIVE_CONTENT_POSITION`.
 */
export interface NativeContentPositionTargetingOptionDetails {
  /**
   * Output only. The content position.
   */
  readonly contentPosition?:  | "NATIVE_CONTENT_POSITION_UNSPECIFIED" | "NATIVE_CONTENT_POSITION_UNKNOWN" | "NATIVE_CONTENT_POSITION_IN_ARTICLE" | "NATIVE_CONTENT_POSITION_IN_FEED" | "NATIVE_CONTENT_POSITION_PERIPHERAL" | "NATIVE_CONTENT_POSITION_RECOMMENDATION";
}

/**
 * A negatively targeted keyword that belongs to a negative keyword list.
 */
export interface NegativeKeyword {
  /**
   * Required. Immutable. The negatively targeted keyword, for example `car
   * insurance`. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum
   * number of characters is 80. Maximum number of words is 10. Valid characters
   * are restricted to ASCII characters only. The only URL-escaping permitted is
   * for representing whitespace between words. Leading or trailing whitespace
   * is ignored.
   */
  keywordValue?: string;
  /**
   * Output only. The resource name of the negative keyword.
   */
  readonly name?: string;
}

/**
 * A list of negative keywords used for targeting.
 */
export interface NegativeKeywordList {
  /**
   * Output only. The unique ID of the advertiser the negative keyword list
   * belongs to.
   */
  readonly advertiserId?: bigint;
  /**
   * Required. The display name of the negative keyword list. Must be UTF-8
   * encoded with a maximum size of 255 bytes.
   */
  displayName?: string;
  /**
   * Output only. The resource name of the negative keyword list.
   */
  readonly name?: string;
  /**
   * Output only. The unique ID of the negative keyword list. Assigned by the
   * system.
   */
  readonly negativeKeywordListId?: bigint;
  /**
   * Output only. Number of line items that are directly targeting this
   * negative keyword list.
   */
  readonly targetedLineItemCount?: bigint;
}

/**
 * Targeting details for negative keyword list. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`.
 */
export interface NegativeKeywordListAssignedTargetingOptionDetails {
  /**
   * Required. ID of the negative keyword list. Should refer to the
   * negative_keyword_list_id field of a NegativeKeywordList resource.
   */
  negativeKeywordListId?: bigint;
}

function serializeNegativeKeywordListAssignedTargetingOptionDetails(data: any): NegativeKeywordListAssignedTargetingOptionDetails {
  return {
    ...data,
    negativeKeywordListId: data["negativeKeywordListId"] !== undefined ? String(data["negativeKeywordListId"]) : undefined,
  };
}

function deserializeNegativeKeywordListAssignedTargetingOptionDetails(data: any): NegativeKeywordListAssignedTargetingOptionDetails {
  return {
    ...data,
    negativeKeywordListId: data["negativeKeywordListId"] !== undefined ? BigInt(data["negativeKeywordListId"]) : undefined,
  };
}

/**
 * Details for a non-skippable ad.
 */
export interface NonSkippableAd {
  /**
   * Common ad attributes.
   */
  commonInStreamAttribute?: CommonInStreamAttribute;
  /**
   * The custom parameters to pass custom values to tracking URL template.
   */
  customParameters?: {
    [key: string]: string
  };
}

function serializeNonSkippableAd(data: any): NonSkippableAd {
  return {
    ...data,
    commonInStreamAttribute: data["commonInStreamAttribute"] !== undefined ? serializeCommonInStreamAttribute(data["commonInStreamAttribute"]) : undefined,
  };
}

function deserializeNonSkippableAd(data: any): NonSkippableAd {
  return {
    ...data,
    commonInStreamAttribute: data["commonInStreamAttribute"] !== undefined ? deserializeCommonInStreamAttribute(data["commonInStreamAttribute"]) : undefined,
  };
}

/**
 * OBA Icon for a Creative
 */
export interface ObaIcon {
  /**
   * Required. The click tracking URL of the OBA icon. Only URLs of the
   * following domains are allowed: * https://info.evidon.com *
   * https://l.betrad.com
   */
  clickTrackingUrl?: string;
  /**
   * The dimensions of the OBA icon.
   */
  dimensions?: Dimensions;
  /**
   * Required. The landing page URL of the OBA icon. Only URLs of the following
   * domains are allowed: * https://info.evidon.com * https://l.betrad.com
   */
  landingPageUrl?: string;
  /**
   * The position of the OBA icon on the creative.
   */
  position?:  | "OBA_ICON_POSITION_UNSPECIFIED" | "OBA_ICON_POSITION_UPPER_RIGHT" | "OBA_ICON_POSITION_UPPER_LEFT" | "OBA_ICON_POSITION_LOWER_RIGHT" | "OBA_ICON_POSITION_LOWER_LEFT";
  /**
   * The program of the OBA icon. For example: “AdChoices”.
   */
  program?: string;
  /**
   * The MIME type of the OBA icon resource.
   */
  resourceMimeType?: string;
  /**
   * The URL of the OBA icon resource.
   */
  resourceUrl?: string;
  /**
   * Required. The view tracking URL of the OBA icon. Only URLs of the
   * following domains are allowed: * https://info.evidon.com *
   * https://l.betrad.com
   */
  viewTrackingUrl?: string;
}

/**
 * Represents a targetable Open Measurement enabled inventory type. This will
 * be populated in the details field of an AssignedTargetingOption when
 * targeting_type is `TARGETING_TYPE_OMID`.
 */
export interface OmidAssignedTargetingOptionDetails {
  /**
   * The type of Open Measurement enabled inventory. Output only in v1.
   * Required in v2.
   */
  omid?:  | "OMID_UNSPECIFIED" | "OMID_FOR_MOBILE_DISPLAY_ADS";
}

/**
 * Represents a targetable Open Measurement enabled inventory type. This will
 * be populated in the omid_details field when targeting_type is
 * `TARGETING_TYPE_OMID`.
 */
export interface OmidTargetingOptionDetails {
  /**
   * Output only. The type of Open Measurement enabled inventory.
   */
  readonly omid?:  | "OMID_UNSPECIFIED" | "OMID_FOR_MOBILE_DISPLAY_ADS";
}

/**
 * On screen position targeting option details. This will be populated in the
 * on_screen_position_details field when targeting_type is
 * `TARGETING_TYPE_ON_SCREEN_POSITION`.
 */
export interface OnScreenPositionAssignedTargetingOptionDetails {
  /**
   * Output only. The ad type to target. Only applicable to insertion order
   * targeting and new line items supporting the specified ad type will inherit
   * this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`,
   * the setting will be inherited by new line item when line_item_type is
   * `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be
   * inherited by new line item when line_item_type is
   * `LINE_ITEM_TYPE_VIDEO_DEFAULT`.
   */
  readonly adType?:  | "AD_TYPE_UNSPECIFIED" | "AD_TYPE_DISPLAY" | "AD_TYPE_VIDEO" | "AD_TYPE_AUDIO";
  /**
   * Output only. The on screen position.
   */
  readonly onScreenPosition?:  | "ON_SCREEN_POSITION_UNSPECIFIED" | "ON_SCREEN_POSITION_UNKNOWN" | "ON_SCREEN_POSITION_ABOVE_THE_FOLD" | "ON_SCREEN_POSITION_BELOW_THE_FOLD";
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_ON_SCREEN_POSITION`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable on screen position, which could be used by display
 * and video ads. This will be populated in the on_screen_position_details field
 * when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.
 */
export interface OnScreenPositionTargetingOptionDetails {
  /**
   * Output only. The on screen position.
   */
  readonly onScreenPosition?:  | "ON_SCREEN_POSITION_UNSPECIFIED" | "ON_SCREEN_POSITION_UNKNOWN" | "ON_SCREEN_POSITION_ABOVE_THE_FOLD" | "ON_SCREEN_POSITION_BELOW_THE_FOLD";
}

/**
 * Assigned operating system targeting option details. This will be populated
 * in the operating_system_details field when targeting_type is
 * `TARGETING_TYPE_OPERATING_SYSTEM`.
 */
export interface OperatingSystemAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of the operating system.
   */
  readonly displayName?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. The targeting option ID populated in targeting_option_id field
   * when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable operating system. This will be populated in the
 * operating_system_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_OPERATING_SYSTEM`.
 */
export interface OperatingSystemTargetingOptionDetails {
  /**
   * Output only. The display name of the operating system.
   */
  readonly displayName?: string;
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
 * Settings that control the rate at which a budget is spent.
 */
export interface Pacing {
  /**
   * Maximum number of impressions to serve every day. Applicable when the
   * budget is impression based. Must be greater than 0.
   */
  dailyMaxImpressions?: bigint;
  /**
   * Maximum currency amount to spend every day in micros of advertiser's
   * currency. Applicable when the budget is currency based. Must be greater
   * than 0. For example, for 1.5 standard unit of the currency, set this field
   * to 1500000. The value assigned will be rounded to whole billable units for
   * the relevant currency by the following rules: any positive value less than
   * a single billable unit will be rounded up to one billable unit and any
   * value larger than a single billable unit will be rounded down to the
   * nearest billable value. For example, if the currency's billable unit is
   * 0.01, and this field is set to 10257770, it will round down to 10250000, a
   * value of 10.25. If set to 505, it will round up to 10000, a value of 0.01.
   */
  dailyMaxMicros?: bigint;
  /**
   * Required. The time period in which the pacing budget will be spent. When
   * automatic budget allocation is enabled at the insertion order via
   * auto_budget_allocation, this field is output only and defaults to
   * `PACING_PERIOD_FLIGHT`.
   */
  pacingPeriod?:  | "PACING_PERIOD_UNSPECIFIED" | "PACING_PERIOD_DAILY" | "PACING_PERIOD_FLIGHT";
  /**
   * Required. The type of pacing that defines how the budget amount will be
   * spent across the pacing_period.
   */
  pacingType?:  | "PACING_TYPE_UNSPECIFIED" | "PACING_TYPE_AHEAD" | "PACING_TYPE_ASAP" | "PACING_TYPE_EVEN";
}

function serializePacing(data: any): Pacing {
  return {
    ...data,
    dailyMaxImpressions: data["dailyMaxImpressions"] !== undefined ? String(data["dailyMaxImpressions"]) : undefined,
    dailyMaxMicros: data["dailyMaxMicros"] !== undefined ? String(data["dailyMaxMicros"]) : undefined,
  };
}

function deserializePacing(data: any): Pacing {
  return {
    ...data,
    dailyMaxImpressions: data["dailyMaxImpressions"] !== undefined ? BigInt(data["dailyMaxImpressions"]) : undefined,
    dailyMaxMicros: data["dailyMaxMicros"] !== undefined ? BigInt(data["dailyMaxMicros"]) : undefined,
  };
}

/**
 * Details for assigned parental status targeting option. This will be
 * populated in the details field of an AssignedTargetingOption when
 * targeting_type is `TARGETING_TYPE_PARENTAL_STATUS`.
 */
export interface ParentalStatusAssignedTargetingOptionDetails {
  /**
   * The parental status of the audience. Output only in v1. Required in v2.
   */
  parentalStatus?:  | "PARENTAL_STATUS_UNSPECIFIED" | "PARENTAL_STATUS_PARENT" | "PARENTAL_STATUS_NOT_A_PARENT" | "PARENTAL_STATUS_UNKNOWN";
}

/**
 * Represents a targetable parental status. This will be populated in the
 * parental_status_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_PARENTAL_STATUS`.
 */
export interface ParentalStatusTargetingOptionDetails {
  /**
   * Output only. The parental status of an audience.
   */
  readonly parentalStatus?:  | "PARENTAL_STATUS_UNSPECIFIED" | "PARENTAL_STATUS_PARENT" | "PARENTAL_STATUS_NOT_A_PARENT" | "PARENTAL_STATUS_UNKNOWN";
}

/**
 * A filtering option that filters on selected file types belonging to a chosen
 * set of filter entities.
 */
export interface ParentEntityFilter {
  /**
   * Required. File types that will be returned.
   */
  fileType?:  | "FILE_TYPE_UNSPECIFIED" | "FILE_TYPE_CAMPAIGN" | "FILE_TYPE_MEDIA_PRODUCT" | "FILE_TYPE_INSERTION_ORDER" | "FILE_TYPE_LINE_ITEM" | "FILE_TYPE_AD_GROUP" | "FILE_TYPE_AD"[];
  /**
   * The IDs of the specified filter type. This is used to filter entities to
   * fetch. If filter type is not `FILTER_TYPE_NONE`, at least one ID must be
   * specified.
   */
  filterIds?: bigint[];
  /**
   * Required. Filter type used to filter fetched entities.
   */
  filterType?:  | "FILTER_TYPE_UNSPECIFIED" | "FILTER_TYPE_NONE" | "FILTER_TYPE_ADVERTISER_ID" | "FILTER_TYPE_CAMPAIGN_ID" | "FILTER_TYPE_MEDIA_PRODUCT_ID" | "FILTER_TYPE_INSERTION_ORDER_ID" | "FILTER_TYPE_LINE_ITEM_ID";
}

function serializeParentEntityFilter(data: any): ParentEntityFilter {
  return {
    ...data,
    filterIds: data["filterIds"] !== undefined ? data["filterIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeParentEntityFilter(data: any): ParentEntityFilter {
  return {
    ...data,
    filterIds: data["filterIds"] !== undefined ? data["filterIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A single partner in Display & Video 360 (DV360).
 */
export interface Partner {
  /**
   * Ad server related settings of the partner.
   */
  adServerConfig?: PartnerAdServerConfig;
  /**
   * Settings that control how partner data may be accessed.
   */
  dataAccessConfig?: PartnerDataAccessConfig;
  /**
   * The display name of the partner. Must be UTF-8 encoded with a maximum size
   * of 240 bytes.
   */
  displayName?: string;
  /**
   * Output only. The status of the partner.
   */
  readonly entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Settings that control which exchanges are enabled for the partner.
   */
  exchangeConfig?: ExchangeConfig;
  /**
   * General settings of the partner.
   */
  generalConfig?: PartnerGeneralConfig;
  /**
   * Output only. The resource name of the partner.
   */
  readonly name?: string;
  /**
   * Output only. The unique ID of the partner. Assigned by the system.
   */
  readonly partnerId?: bigint;
  /**
   * Output only. The timestamp when the partner was last updated. Assigned by
   * the system.
   */
  readonly updateTime?: Date;
}

/**
 * Ad server related settings of a partner.
 */
export interface PartnerAdServerConfig {
  /**
   * Measurement settings of a partner.
   */
  measurementConfig?: MeasurementConfig;
}

/**
 * Settings that control a partner cost. A partner cost is any type of expense
 * involved in running a campaign, other than the costs of purchasing
 * impressions (which is called the media cost) and using third-party audience
 * segment data (data fee). Some examples of partner costs include the fees for
 * using DV360, a third-party ad server, or a third-party ad serving
 * verification service.
 */
export interface PartnerCost {
  /**
   * Required. The type of the partner cost.
   */
  costType?:  | "PARTNER_COST_TYPE_UNSPECIFIED" | "PARTNER_COST_TYPE_ADLOOX" | "PARTNER_COST_TYPE_ADLOOX_PREBID" | "PARTNER_COST_TYPE_ADSAFE" | "PARTNER_COST_TYPE_ADXPOSE" | "PARTNER_COST_TYPE_AGGREGATE_KNOWLEDGE" | "PARTNER_COST_TYPE_AGENCY_TRADING_DESK" | "PARTNER_COST_TYPE_DV360_FEE" | "PARTNER_COST_TYPE_COMSCORE_VCE" | "PARTNER_COST_TYPE_DATA_MANAGEMENT_PLATFORM" | "PARTNER_COST_TYPE_DEFAULT" | "PARTNER_COST_TYPE_DOUBLE_VERIFY" | "PARTNER_COST_TYPE_DOUBLE_VERIFY_PREBID" | "PARTNER_COST_TYPE_EVIDON" | "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_VIDEO" | "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_PREBID" | "PARTNER_COST_TYPE_MEDIA_COST_DATA" | "PARTNER_COST_TYPE_MOAT_VIDEO" | "PARTNER_COST_TYPE_NIELSEN_DAR" | "PARTNER_COST_TYPE_SHOP_LOCAL" | "PARTNER_COST_TYPE_TERACENT" | "PARTNER_COST_TYPE_THIRD_PARTY_AD_SERVER" | "PARTNER_COST_TYPE_TRUST_METRICS" | "PARTNER_COST_TYPE_VIZU" | "PARTNER_COST_TYPE_ADLINGO_FEE" | "PARTNER_COST_TYPE_CUSTOM_FEE_1" | "PARTNER_COST_TYPE_CUSTOM_FEE_2" | "PARTNER_COST_TYPE_CUSTOM_FEE_3" | "PARTNER_COST_TYPE_CUSTOM_FEE_4" | "PARTNER_COST_TYPE_CUSTOM_FEE_5";
  /**
   * The CPM fee amount in micros of advertiser's currency. Applicable when the
   * fee_type is `PARTNER_FEE_TYPE_CPM_FEE`. Must be greater than or equal to 0.
   * For example, for 1.5 standard unit of the advertiser's currency, set this
   * field to 1500000.
   */
  feeAmount?: bigint;
  /**
   * The media fee percentage in millis (1/1000 of a percent). Applicable when
   * the fee_type is `PARTNER_FEE_TYPE_MEDIA_FEE`. Must be greater than or equal
   * to 0. For example: 100 represents 0.1%.
   */
  feePercentageMillis?: bigint;
  /**
   * Required. The fee type for this partner cost.
   */
  feeType?:  | "PARTNER_COST_FEE_TYPE_UNSPECIFIED" | "PARTNER_COST_FEE_TYPE_CPM_FEE" | "PARTNER_COST_FEE_TYPE_MEDIA_FEE";
  /**
   * The invoice type for this partner cost. * Required when cost_type is one
   * of: - `PARTNER_COST_TYPE_ADLOOX` - `PARTNER_COST_TYPE_DOUBLE_VERIFY` -
   * `PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE`. * Output only for other types.
   */
  invoiceType?:  | "PARTNER_COST_INVOICE_TYPE_UNSPECIFIED" | "PARTNER_COST_INVOICE_TYPE_DV360" | "PARTNER_COST_INVOICE_TYPE_PARTNER";
}

function serializePartnerCost(data: any): PartnerCost {
  return {
    ...data,
    feeAmount: data["feeAmount"] !== undefined ? String(data["feeAmount"]) : undefined,
    feePercentageMillis: data["feePercentageMillis"] !== undefined ? String(data["feePercentageMillis"]) : undefined,
  };
}

function deserializePartnerCost(data: any): PartnerCost {
  return {
    ...data,
    feeAmount: data["feeAmount"] !== undefined ? BigInt(data["feeAmount"]) : undefined,
    feePercentageMillis: data["feePercentageMillis"] !== undefined ? BigInt(data["feePercentageMillis"]) : undefined,
  };
}

/**
 * Settings that control how partner related data may be accessed.
 */
export interface PartnerDataAccessConfig {
  /**
   * Structured Data Files (SDF) settings for the partner. The SDF
   * configuration for the partner.
   */
  sdfConfig?: SdfConfig;
}

/**
 * General settings of a partner.
 */
export interface PartnerGeneralConfig {
  /**
   * Immutable. Partner's currency in ISO 4217 format.
   */
  currencyCode?: string;
  /**
   * Immutable. The standard TZ database name of the partner's time zone. For
   * example, `America/New_York`. See more at:
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  timeZone?: string;
}

/**
 * Settings that control how partner revenue is calculated.
 */
export interface PartnerRevenueModel {
  /**
   * Required. The markup amount of the partner revenue model. Must be greater
   * than or equal to 0. * When the markup_type is set to be
   * `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`, this field represents the CPM
   * markup in micros of advertiser's currency. For example, 1500000 represents
   * 1.5 standard units of the currency. * When the markup_type is set to be
   * `PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP`, this field
   * represents the media cost percent markup in millis. For example, 100
   * represents 0.1% (decimal 0.001). * When the markup_type is set to be
   * `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP`, this field
   * represents the total media cost percent markup in millis. For example, 100
   * represents 0.1% (decimal 0.001).
   */
  markupAmount?: bigint;
  /**
   * Required. The markup type of the partner revenue model.
   */
  markupType?:  | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_UNSPECIFIED" | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM" | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP" | "PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP";
}

function serializePartnerRevenueModel(data: any): PartnerRevenueModel {
  return {
    ...data,
    markupAmount: data["markupAmount"] !== undefined ? String(data["markupAmount"]) : undefined,
  };
}

function deserializePartnerRevenueModel(data: any): PartnerRevenueModel {
  return {
    ...data,
    markupAmount: data["markupAmount"] !== undefined ? BigInt(data["markupAmount"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersChannelsCreate.
 */
export interface PartnersChannelsCreateOptions {
  /**
   * The ID of the advertiser that owns the created channel.
   */
  advertiserId?: bigint;
}

function serializePartnersChannelsCreateOptions(data: any): PartnersChannelsCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializePartnersChannelsCreateOptions(data: any): PartnersChannelsCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersChannelsGet.
 */
export interface PartnersChannelsGetOptions {
  /**
   * The ID of the advertiser that owns the fetched channel.
   */
  advertiserId?: bigint;
}

function serializePartnersChannelsGetOptions(data: any): PartnersChannelsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializePartnersChannelsGetOptions(data: any): PartnersChannelsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersChannelsList.
 */
export interface PartnersChannelsListOptions {
  /**
   * The ID of the advertiser that owns the channels.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by channel fields. Supported syntax: * Filter expressions
   * for channel currently can only contain at most one * restriction. * A
   * restriction has the form of `{field} {operator} {value}`. * The operator
   * must be `CONTAINS (:)`. * Supported fields: - `displayName` Examples: * All
   * channels for which the display name contains "google": `displayName :
   * "google"`. The length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) * `channelId` The default sorting order is ascending. To specify
   * descending order for a field, a suffix " desc" should be added to the field
   * name. Example: `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListChannels` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

function serializePartnersChannelsListOptions(data: any): PartnersChannelsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializePartnersChannelsListOptions(data: any): PartnersChannelsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersChannelsPatch.
 */
export interface PartnersChannelsPatchOptions {
  /**
   * The ID of the advertiser that owns the created channel.
   */
  advertiserId?: bigint;
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializePartnersChannelsPatchOptions(data: any): PartnersChannelsPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePartnersChannelsPatchOptions(data: any): PartnersChannelsPatchOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersChannelsSitesCreate.
 */
export interface PartnersChannelsSitesCreateOptions {
  /**
   * The ID of the advertiser that owns the parent channel.
   */
  advertiserId?: bigint;
}

function serializePartnersChannelsSitesCreateOptions(data: any): PartnersChannelsSitesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializePartnersChannelsSitesCreateOptions(data: any): PartnersChannelsSitesCreateOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersChannelsSitesDelete.
 */
export interface PartnersChannelsSitesDeleteOptions {
  /**
   * The ID of the advertiser that owns the parent channel.
   */
  advertiserId?: bigint;
}

function serializePartnersChannelsSitesDeleteOptions(data: any): PartnersChannelsSitesDeleteOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializePartnersChannelsSitesDeleteOptions(data: any): PartnersChannelsSitesDeleteOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersChannelsSitesList.
 */
export interface PartnersChannelsSitesListOptions {
  /**
   * The ID of the advertiser that owns the parent channel.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by site fields. Supported syntax: * Filter expressions
   * for site currently can only contain at most one * restriction. * A
   * restriction has the form of `{field} {operator} {value}`. * The operator
   * must be `CONTAINS (:)`. * Supported fields: - `urlOrAppId` Examples: * All
   * sites for which the URL or app ID contains "google": `urlOrAppId :
   * "google"`
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `urlOrAppId`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix " desc" should be added to the field name.
   * Example: `urlOrAppId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `10000`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListSites` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

function serializePartnersChannelsSitesListOptions(data: any): PartnersChannelsSitesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializePartnersChannelsSitesListOptions(data: any): PartnersChannelsSitesListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#partnersList.
 */
export interface PartnersListOptions {
  /**
   * Allows filtering by partner properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by `AND` or `OR` logical operators. A sequence of restrictions
   * implicitly uses `AND`. * A restriction has the form of `{field} {operator}
   * {value}`. * The operator must be `EQUALS (=)`. * Supported fields: -
   * `entityStatus` Examples: * All active partners:
   * `entityStatus="ENTITY_STATUS_ACTIVE"` The length of this field should be no
   * more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * The default sorting order is ascending. To specify descending order for a
   * field, a suffix "desc" should be added to the field name. For example,
   * `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListPartners` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DisplayVideo#partnersTargetingTypesAssignedTargetingOptionsList.
 */
export interface PartnersTargetingTypesAssignedTargetingOptionsListOptions {
  /**
   * Allows filtering by assigned targeting option properties. Supported
   * syntax: * Filter expressions are made up of one or more restrictions. *
   * Restrictions can be combined by the logical operator `OR`. * A restriction
   * has the form of `{field} {operator} {value}`. * The operator must be
   * `EQUALS (=)`. * Supported fields: - `assignedTargetingOptionId` Examples: *
   * AssignedTargetingOption with ID 123456 `assignedTargetingOptionId="123456"`
   * The length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `assignedTargetingOptionId` (default) The default sorting order is
   * ascending. To specify descending order for a field, a suffix "desc" should
   * be added to the field name. Example: `assignedTargetingOptionId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListPartnerAssignedTargetingOptions` method. If not specified, the first
   * page of results will be returned.
   */
  pageToken?: string;
}

/**
 * Settings that control the performance goal of a campaign or insertion order.
 */
export interface PerformanceGoal {
  /**
   * The goal amount, in micros of the advertiser's currency. Applicable when
   * performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CPM` *
   * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` *
   * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_VCPM` For example
   * 1500000 represents 1.5 standard units of the currency.
   */
  performanceGoalAmountMicros?: bigint;
  /**
   * The decimal representation of the goal percentage in micros. Applicable
   * when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CTR` *
   * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_CLICK_CVR` *
   * `PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR` * `PERFORMANCE_GOAL_TYPE_VTR` *
   * `PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE` *
   * `PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE` For example, 70000 represents
   * 7% (decimal 0.07).
   */
  performanceGoalPercentageMicros?: bigint;
  /**
   * A key performance indicator (KPI) string, which can be empty. Must be
   * UTF-8 encoded with a length of no more than 100 characters. Applicable when
   * performance_goal_type is set to `PERFORMANCE_GOAL_TYPE_OTHER`.
   */
  performanceGoalString?: string;
  /**
   * Required. The type of the performance goal.
   */
  performanceGoalType?:  | "PERFORMANCE_GOAL_TYPE_UNSPECIFIED" | "PERFORMANCE_GOAL_TYPE_CPM" | "PERFORMANCE_GOAL_TYPE_CPC" | "PERFORMANCE_GOAL_TYPE_CPA" | "PERFORMANCE_GOAL_TYPE_CTR" | "PERFORMANCE_GOAL_TYPE_VIEWABILITY" | "PERFORMANCE_GOAL_TYPE_CPIAVC" | "PERFORMANCE_GOAL_TYPE_CPE" | "PERFORMANCE_GOAL_TYPE_CLICK_CVR" | "PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR" | "PERFORMANCE_GOAL_TYPE_VCPM" | "PERFORMANCE_GOAL_TYPE_VTR" | "PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE" | "PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE" | "PERFORMANCE_GOAL_TYPE_OTHER";
}

function serializePerformanceGoal(data: any): PerformanceGoal {
  return {
    ...data,
    performanceGoalAmountMicros: data["performanceGoalAmountMicros"] !== undefined ? String(data["performanceGoalAmountMicros"]) : undefined,
    performanceGoalPercentageMicros: data["performanceGoalPercentageMicros"] !== undefined ? String(data["performanceGoalPercentageMicros"]) : undefined,
  };
}

function deserializePerformanceGoal(data: any): PerformanceGoal {
  return {
    ...data,
    performanceGoalAmountMicros: data["performanceGoalAmountMicros"] !== undefined ? BigInt(data["performanceGoalAmountMicros"]) : undefined,
    performanceGoalPercentageMicros: data["performanceGoalPercentageMicros"] !== undefined ? BigInt(data["performanceGoalPercentageMicros"]) : undefined,
  };
}

/**
 * A strategy that automatically adjusts the bid to meet or beat a specified
 * performance goal.
 */
export interface PerformanceGoalBidStrategy {
  /**
   * The ID of the Custom Bidding Algorithm used by this strategy. Only
   * applicable when performance_goal_type is set to
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`.
   */
  customBiddingAlgorithmId?: bigint;
  /**
   * The maximum average CPM that may be bid, in micros of the advertiser's
   * currency. Must be greater than or equal to a billable unit of the given
   * currency. Not applicable when performance_goal_type is set to
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`. For example, 1500000
   * represents 1.5 standard units of the currency.
   */
  maxAverageCpmBidAmountMicros?: bigint;
  /**
   * Required. The performance goal the bidding strategy will attempt to meet
   * or beat, in micros of the advertiser's currency or in micro of the ROAS
   * (Return On Advertising Spend) value which is also based on advertiser's
   * currency. Must be greater than or equal to a billable unit of the given
   * currency and smaller or equal to upper bounds. Each performance_goal_type
   * has its upper bound: * when performance_goal_type is
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, upper bound is 10000.00 USD.
   * * when performance_goal_type is
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, upper bound is 1000.00 USD. *
   * when performance_goal_type is
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, upper bound is
   * 1000.00 USD. * when performance_goal_type is
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`, upper bound is
   * 1000.00 and lower bound is 0.01. Example: If set to
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, the bid price will
   * be based on the probability that each available impression will be
   * viewable. For example, if viewable CPM target is $2 and an impression is
   * 40% likely to be viewable, the bid price will be $0.80 CPM (40% of $2). For
   * example, 1500000 represents 1.5 standard units of the currency or ROAS
   * value.
   */
  performanceGoalAmountMicros?: bigint;
  /**
   * Required. The type of the performance goal that the bidding strategy will
   * try to meet or beat. For line item level usage, the value must be one of: *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` *
   * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`.
   */
  performanceGoalType?:  | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN" | "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED";
}

function serializePerformanceGoalBidStrategy(data: any): PerformanceGoalBidStrategy {
  return {
    ...data,
    customBiddingAlgorithmId: data["customBiddingAlgorithmId"] !== undefined ? String(data["customBiddingAlgorithmId"]) : undefined,
    maxAverageCpmBidAmountMicros: data["maxAverageCpmBidAmountMicros"] !== undefined ? String(data["maxAverageCpmBidAmountMicros"]) : undefined,
    performanceGoalAmountMicros: data["performanceGoalAmountMicros"] !== undefined ? String(data["performanceGoalAmountMicros"]) : undefined,
  };
}

function deserializePerformanceGoalBidStrategy(data: any): PerformanceGoalBidStrategy {
  return {
    ...data,
    customBiddingAlgorithmId: data["customBiddingAlgorithmId"] !== undefined ? BigInt(data["customBiddingAlgorithmId"]) : undefined,
    maxAverageCpmBidAmountMicros: data["maxAverageCpmBidAmountMicros"] !== undefined ? BigInt(data["maxAverageCpmBidAmountMicros"]) : undefined,
    performanceGoalAmountMicros: data["performanceGoalAmountMicros"] !== undefined ? BigInt(data["performanceGoalAmountMicros"]) : undefined,
  };
}

/**
 * Details for assigned POI targeting option. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_POI`.
 */
export interface PoiAssignedTargetingOptionDetails {
  /**
   * Output only. The display name of a POI, e.g. "Times Square", "Space
   * Needle", followed by its full address if available.
   */
  readonly displayName?: string;
  /**
   * Output only. Latitude of the POI rounding to 6th decimal place.
   */
  readonly latitude?: number;
  /**
   * Output only. Longitude of the POI rounding to 6th decimal place.
   */
  readonly longitude?: number;
  /**
   * Required. The radius of the area around the POI that will be targeted. The
   * units of the radius are specified by proximity_radius_unit. Must be 1 to
   * 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is
   * `DISTANCE_UNIT_MILES`.
   */
  proximityRadiusAmount?: number;
  /**
   * Required. The unit of distance by which the targeting radius is measured.
   */
  proximityRadiusUnit?:  | "DISTANCE_UNIT_UNSPECIFIED" | "DISTANCE_UNIT_MILES" | "DISTANCE_UNIT_KILOMETERS";
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_POI`. Accepted POI targeting option IDs can be retrieved
   * using SearchTargetingOptions. If targeting a specific latitude/longitude
   * coordinate removed from an address or POI name, you can generate the
   * necessary targeting option ID by rounding the desired coordinate values to
   * the 6th decimal place, removing the decimals, and concatenating the string
   * values separated by a semicolon. For example, you can target the
   * latitude/longitude pair of 40.7414691, -74.003387 using the targeting
   * option ID "40741469;-74003387".
   */
  targetingOptionId?: string;
}

/**
 * Search terms for POI targeting options.
 */
export interface PoiSearchTerms {
  /**
   * The search query for the desired POI name, street address, or coordinate
   * of the desired POI. The query can be a prefix, e.g. "Times squar",
   * "40.7505045,-73.99562", "315 W 44th St", etc.
   */
  poiQuery?: string;
}

/**
 * Represents a targetable point of interest(POI). This will be populated in
 * the poi_details field when targeting_type is `TARGETING_TYPE_POI`.
 */
export interface PoiTargetingOptionDetails {
  /**
   * Output only. The display name of a POI(e.g. "Times Square", "Space
   * Needle"), followed by its full address if available.
   */
  readonly displayName?: string;
  /**
   * Output only. Latitude of the POI rounding to 6th decimal place.
   */
  readonly latitude?: number;
  /**
   * Output only. Longitude of the POI rounding to 6th decimal place.
   */
  readonly longitude?: number;
}

/**
 * Settings specific to the Mediaocean Prisma tool.
 */
export interface PrismaConfig {
  /**
   * Required. Relevant client, product, and estimate codes from the Mediaocean
   * Prisma tool.
   */
  prismaCpeCode?: PrismaCpeCode;
  /**
   * Required. The Prisma type.
   */
  prismaType?:  | "PRISMA_TYPE_UNSPECIFIED" | "PRISMA_TYPE_DISPLAY" | "PRISMA_TYPE_SEARCH" | "PRISMA_TYPE_VIDEO" | "PRISMA_TYPE_AUDIO" | "PRISMA_TYPE_SOCIAL" | "PRISMA_TYPE_FEE";
  /**
   * Required. The entity allocated this budget (DSP, site, etc.).
   */
  supplier?: string;
}

/**
 * Google Payments Center supports searching and filtering on the component
 * fields of this code.
 */
export interface PrismaCpeCode {
  /**
   * The Prisma client code.
   */
  prismaClientCode?: string;
  /**
   * The Prisma estimate code.
   */
  prismaEstimateCode?: string;
  /**
   * The Prisma product code.
   */
  prismaProductCode?: string;
}

/**
 * The details of product feed.
 */
export interface ProductFeedData {
  /**
   * Whether the product feed has opted-out of showing products.
   */
  isFeedDisabled?: boolean;
  /**
   * A list of dimensions used to match products.
   */
  productMatchDimensions?: ProductMatchDimension[];
  /**
   * How products are selected by the product feed.
   */
  productMatchType?:  | "PRODUCT_MATCH_TYPE_UNSPECIFIED" | "PRODUCT_MATCH_TYPE_ALL_PRODUCTS" | "PRODUCT_MATCH_TYPE_SPECIFIC_PRODUCTS" | "PRODUCT_MATCH_TYPE_CUSTOM_LABEL";
}

/**
 * A dimension used to match products.
 */
export interface ProductMatchDimension {
  /**
   * The custom label to match all the products with the label.
   */
  customLabel?: CustomLabel;
  /**
   * The ID of the product offer to match with a product with the same offer
   * ID.
   */
  productOfferId?: string;
}

/**
 * Targeting details for proximity location list. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`.
 */
export interface ProximityLocationListAssignedTargetingOptionDetails {
  /**
   * Required. ID of the proximity location list. Should refer to the
   * location_list_id field of a LocationList resource whose type is
   * `TARGETING_LOCATION_TYPE_PROXIMITY`.
   */
  proximityLocationListId?: bigint;
  /**
   * Required. Radius expressed in the distance units set in
   * proximity_radius_unit. This represents the size of the area around a chosen
   * location that will be targeted. Radius should be between 1 and 500 miles or
   * 800 kilometers.
   */
  proximityRadius?: number;
  /**
   * Required. Radius distance units.
   */
  proximityRadiusUnit?:  | "PROXIMITY_RADIUS_UNIT_UNSPECIFIED" | "PROXIMITY_RADIUS_UNIT_MILES" | "PROXIMITY_RADIUS_UNIT_KILOMETERS";
}

function serializeProximityLocationListAssignedTargetingOptionDetails(data: any): ProximityLocationListAssignedTargetingOptionDetails {
  return {
    ...data,
    proximityLocationListId: data["proximityLocationListId"] !== undefined ? String(data["proximityLocationListId"]) : undefined,
  };
}

function deserializeProximityLocationListAssignedTargetingOptionDetails(data: any): ProximityLocationListAssignedTargetingOptionDetails {
  return {
    ...data,
    proximityLocationListId: data["proximityLocationListId"] !== undefined ? BigInt(data["proximityLocationListId"]) : undefined,
  };
}

/**
 * Publisher review status for the creative.
 */
export interface PublisherReviewStatus {
  /**
   * The publisher reviewing the creative.
   */
  publisherName?: string;
  /**
   * Status of the publisher review.
   */
  status?:  | "REVIEW_STATUS_UNSPECIFIED" | "REVIEW_STATUS_APPROVED" | "REVIEW_STATUS_REJECTED" | "REVIEW_STATUS_PENDING";
}

/**
 * The rate related settings of the inventory source.
 */
export interface RateDetails {
  /**
   * The rate type. Acceptable values are
   * `INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED`,
   * `INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR`, and
   * `INVENTORY_SOURCE_RATE_TYPE_CPD`.
   */
  inventorySourceRateType?:  | "INVENTORY_SOURCE_RATE_TYPE_UNSPECIFIED" | "INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED" | "INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR" | "INVENTORY_SOURCE_RATE_TYPE_CPD" | "INVENTORY_SOURCE_RATE_TYPE_FLAT";
  /**
   * Output only. The amount that the buyer has committed to spending on the
   * inventory source up front. Only applicable for guaranteed inventory
   * sources.
   */
  readonly minimumSpend?: Money;
  /**
   * The rate for the inventory source.
   */
  rate?: Money;
  /**
   * Required for guaranteed inventory sources. The number of impressions
   * guaranteed by the seller.
   */
  unitsPurchased?: bigint;
}

function serializeRateDetails(data: any): RateDetails {
  return {
    ...data,
    rate: data["rate"] !== undefined ? serializeMoney(data["rate"]) : undefined,
    unitsPurchased: data["unitsPurchased"] !== undefined ? String(data["unitsPurchased"]) : undefined,
  };
}

function deserializeRateDetails(data: any): RateDetails {
  return {
    ...data,
    minimumSpend: data["minimumSpend"] !== undefined ? deserializeMoney(data["minimumSpend"]) : undefined,
    rate: data["rate"] !== undefined ? deserializeMoney(data["rate"]) : undefined,
    unitsPurchased: data["unitsPurchased"] !== undefined ? BigInt(data["unitsPurchased"]) : undefined,
  };
}

/**
 * Targeting details for regional location list. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_REGIONAL_LOCATION_LIST`.
 */
export interface RegionalLocationListAssignedTargetingOptionDetails {
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. ID of the regional location list. Should refer to the
   * location_list_id field of a LocationList resource whose type is
   * `TARGETING_LOCATION_TYPE_REGIONAL`.
   */
  regionalLocationListId?: bigint;
}

function serializeRegionalLocationListAssignedTargetingOptionDetails(data: any): RegionalLocationListAssignedTargetingOptionDetails {
  return {
    ...data,
    regionalLocationListId: data["regionalLocationListId"] !== undefined ? String(data["regionalLocationListId"]) : undefined,
  };
}

function deserializeRegionalLocationListAssignedTargetingOptionDetails(data: any): RegionalLocationListAssignedTargetingOptionDetails {
  return {
    ...data,
    regionalLocationListId: data["regionalLocationListId"] !== undefined ? BigInt(data["regionalLocationListId"]) : undefined,
  };
}

/**
 * Request message for NegativeKeywordService.ReplaceNegativeKeywords.
 */
export interface ReplaceNegativeKeywordsRequest {
  /**
   * The negative keywords that will replace the existing keywords in the
   * negative keyword list, specified as a list of NegativeKeywords.
   */
  newNegativeKeywords?: NegativeKeyword[];
}

/**
 * Response message for NegativeKeywordService.ReplaceNegativeKeywords.
 */
export interface ReplaceNegativeKeywordsResponse {
  /**
   * The full list of negative keywords now present in the negative keyword
   * list.
   */
  negativeKeywords?: NegativeKeyword[];
}

/**
 * Request message for SiteService.ReplaceSites.
 */
export interface ReplaceSitesRequest {
  /**
   * The ID of the advertiser that owns the parent channel.
   */
  advertiserId?: bigint;
  /**
   * The sites that will replace the existing sites assigned to the channel,
   * specified as a list of Sites.
   */
  newSites?: Site[];
  /**
   * The ID of the partner that owns the parent channel.
   */
  partnerId?: bigint;
}

function serializeReplaceSitesRequest(data: any): ReplaceSitesRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? String(data["partnerId"]) : undefined,
  };
}

function deserializeReplaceSitesRequest(data: any): ReplaceSitesRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    partnerId: data["partnerId"] !== undefined ? BigInt(data["partnerId"]) : undefined,
  };
}

/**
 * Response message for SiteService.ReplaceSites.
 */
export interface ReplaceSitesResponse {
  /**
   * The list of sites in the channel after replacing.
   */
  sites?: Site[];
}

/**
 * Review statuses for the creative.
 */
export interface ReviewStatusInfo {
  /**
   * Represents the basic approval needed for a creative to begin serving.
   * Summary of creative_and_landing_page_review_status and
   * content_and_policy_review_status.
   */
  approvalStatus?:  | "APPROVAL_STATUS_UNSPECIFIED" | "APPROVAL_STATUS_PENDING_NOT_SERVABLE" | "APPROVAL_STATUS_PENDING_SERVABLE" | "APPROVAL_STATUS_APPROVED_SERVABLE" | "APPROVAL_STATUS_REJECTED_NOT_SERVABLE";
  /**
   * Content and policy review status for the creative.
   */
  contentAndPolicyReviewStatus?:  | "REVIEW_STATUS_UNSPECIFIED" | "REVIEW_STATUS_APPROVED" | "REVIEW_STATUS_REJECTED" | "REVIEW_STATUS_PENDING";
  /**
   * Creative and landing page review status for the creative.
   */
  creativeAndLandingPageReviewStatus?:  | "REVIEW_STATUS_UNSPECIFIED" | "REVIEW_STATUS_APPROVED" | "REVIEW_STATUS_REJECTED" | "REVIEW_STATUS_PENDING";
  /**
   * Exchange review statuses for the creative.
   */
  exchangeReviewStatuses?: ExchangeReviewStatus[];
  /**
   * Publisher review statuses for the creative.
   */
  publisherReviewStatuses?: PublisherReviewStatus[];
}

/**
 * An error message for a custom bidding script.
 */
export interface ScriptError {
  /**
   * The column number in the script where the error was thrown.
   */
  column?: bigint;
  /**
   * The type of error.
   */
  errorCode?:  | "ERROR_CODE_UNSPECIFIED" | "SYNTAX_ERROR" | "DEPRECATED_SYNTAX" | "INTERNAL_ERROR";
  /**
   * The detailed error message.
   */
  errorMessage?: string;
  /**
   * The line number in the script where the error was thrown.
   */
  line?: bigint;
}

function serializeScriptError(data: any): ScriptError {
  return {
    ...data,
    column: data["column"] !== undefined ? String(data["column"]) : undefined,
    line: data["line"] !== undefined ? String(data["line"]) : undefined,
  };
}

function deserializeScriptError(data: any): ScriptError {
  return {
    ...data,
    column: data["column"] !== undefined ? BigInt(data["column"]) : undefined,
    line: data["line"] !== undefined ? BigInt(data["line"]) : undefined,
  };
}

/**
 * Structured Data File (SDF) related settings.
 */
export interface SdfConfig {
  /**
   * An administrator email address to which the SDF processing status reports
   * will be sent.
   */
  adminEmail?: string;
  /**
   * Required. The version of SDF being used.
   */
  version?:  | "SDF_VERSION_UNSPECIFIED" | "SDF_VERSION_3_1" | "SDF_VERSION_4" | "SDF_VERSION_4_1" | "SDF_VERSION_4_2" | "SDF_VERSION_5" | "SDF_VERSION_5_1" | "SDF_VERSION_5_2" | "SDF_VERSION_5_3" | "SDF_VERSION_5_4" | "SDF_VERSION_5_5";
}

/**
 * Type for the response returned by
 * [SdfDownloadTaskService.CreateSdfDownloadTask].
 */
export interface SdfDownloadTask {
  /**
   * A resource name to be used in media.download to Download the prepared
   * files. Resource names have the format
   * `download/sdfdownloadtasks/media/{media_id}`. `media_id` will be made
   * available by the long running operation service once the task status is
   * done.
   */
  resourceName?: string;
}

/**
 * Type for the metadata returned by
 * [SdfDownloadTaskService.CreateSdfDownloadTask].
 */
export interface SdfDownloadTaskMetadata {
  /**
   * The time when the operation was created.
   */
  createTime?: Date;
  /**
   * The time when execution was completed.
   */
  endTime?: Date;
  /**
   * The SDF version used to execute this download task.
   */
  version?:  | "SDF_VERSION_UNSPECIFIED" | "SDF_VERSION_3_1" | "SDF_VERSION_4" | "SDF_VERSION_4_1" | "SDF_VERSION_4_2" | "SDF_VERSION_5" | "SDF_VERSION_5_1" | "SDF_VERSION_5_2" | "SDF_VERSION_5_3" | "SDF_VERSION_5_4" | "SDF_VERSION_5_5";
}

function serializeSdfDownloadTaskMetadata(data: any): SdfDownloadTaskMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeSdfDownloadTaskMetadata(data: any): SdfDownloadTaskMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Request message for SearchTargetingOptions.
 */
export interface SearchTargetingOptionsRequest {
  /**
   * Required. The Advertiser this request is being made in the context of.
   */
  advertiserId?: bigint;
  /**
   * Search terms for Business Chain targeting options. Can only be used when
   * targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`.
   */
  businessChainSearchTerms?: BusinessChainSearchTerms;
  /**
   * Search terms for geo region targeting options. Can only be used when
   * targeting_type is `TARGETING_TYPE_GEO_REGION`.
   */
  geoRegionSearchTerms?: GeoRegionSearchTerms;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `SearchTargetingOptions` method. If not specified, the first page of
   * results will be returned.
   */
  pageToken?: string;
  /**
   * Search terms for POI targeting options. Can only be used when
   * targeting_type is `TARGETING_TYPE_POI`.
   */
  poiSearchTerms?: PoiSearchTerms;
}

function serializeSearchTargetingOptionsRequest(data: any): SearchTargetingOptionsRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeSearchTargetingOptionsRequest(data: any): SearchTargetingOptionsRequest {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Response message for SearchTargetingOptions.
 */
export interface SearchTargetingOptionsResponse {
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * page_token field in the subsequent call to `SearchTargetingOptions` method
   * to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of targeting options that match the search criteria. This list
   * will be absent if empty.
   */
  targetingOptions?: TargetingOption[];
}

/**
 * Targeting details for sensitive category. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`.
 */
export interface SensitiveCategoryAssignedTargetingOptionDetails {
  /**
   * Required. An enum for the DV360 Sensitive category content classified to
   * be EXCLUDED.
   */
  excludedSensitiveCategory?:  | "SENSITIVE_CATEGORY_UNSPECIFIED" | "SENSITIVE_CATEGORY_ADULT" | "SENSITIVE_CATEGORY_DEROGATORY" | "SENSITIVE_CATEGORY_DOWNLOADS_SHARING" | "SENSITIVE_CATEGORY_WEAPONS" | "SENSITIVE_CATEGORY_GAMBLING" | "SENSITIVE_CATEGORY_VIOLENCE" | "SENSITIVE_CATEGORY_SUGGESTIVE" | "SENSITIVE_CATEGORY_PROFANITY" | "SENSITIVE_CATEGORY_ALCOHOL" | "SENSITIVE_CATEGORY_DRUGS" | "SENSITIVE_CATEGORY_TOBACCO" | "SENSITIVE_CATEGORY_POLITICS" | "SENSITIVE_CATEGORY_RELIGION" | "SENSITIVE_CATEGORY_TRAGEDY" | "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS" | "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES" | "SENSITIVE_CATEGORY_SHOCKING" | "SENSITIVE_CATEGORY_EMBEDDED_VIDEO" | "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO";
}

/**
 * Represents a targetable sensitive category. This will be populated in the
 * sensitive_category_details field of the TargetingOption when targeting_type
 * is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`.
 */
export interface SensitiveCategoryTargetingOptionDetails {
  /**
   * Output only. An enum for the DV360 Sensitive category content classifier.
   */
  readonly sensitiveCategory?:  | "SENSITIVE_CATEGORY_UNSPECIFIED" | "SENSITIVE_CATEGORY_ADULT" | "SENSITIVE_CATEGORY_DEROGATORY" | "SENSITIVE_CATEGORY_DOWNLOADS_SHARING" | "SENSITIVE_CATEGORY_WEAPONS" | "SENSITIVE_CATEGORY_GAMBLING" | "SENSITIVE_CATEGORY_VIOLENCE" | "SENSITIVE_CATEGORY_SUGGESTIVE" | "SENSITIVE_CATEGORY_PROFANITY" | "SENSITIVE_CATEGORY_ALCOHOL" | "SENSITIVE_CATEGORY_DRUGS" | "SENSITIVE_CATEGORY_TOBACCO" | "SENSITIVE_CATEGORY_POLITICS" | "SENSITIVE_CATEGORY_RELIGION" | "SENSITIVE_CATEGORY_TRAGEDY" | "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS" | "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES" | "SENSITIVE_CATEGORY_SHOCKING" | "SENSITIVE_CATEGORY_EMBEDDED_VIDEO" | "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO";
}

/**
 * Details for session position assigned targeting option. This will be
 * populated in the session_position_details field when targeting_type is
 * `TARGETING_TYPE_SESSION_POSITION`.
 */
export interface SessionPositionAssignedTargetingOptionDetails {
  /**
   * The position where the ad will show in a session.
   */
  sessionPosition?:  | "SESSION_POSITION_UNSPECIFIED" | "SESSION_POSITION_FIRST_IMPRESSION";
}

/**
 * A single site. Sites are apps or websites belonging to a channel.
 */
export interface Site {
  /**
   * Output only. The resource name of the site.
   */
  readonly name?: string;
  /**
   * Required. The app ID or URL of the site. Must be UTF-8 encoded with a
   * maximum length of 240 bytes.
   */
  urlOrAppId?: string;
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
 * Details for assigned sub-exchange targeting option. This will be populated
 * in the details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_SUB_EXCHANGE`.
 */
export interface SubExchangeAssignedTargetingOptionDetails {
  /**
   * Required. The targeting_option_id of a TargetingOption of type
   * `TARGETING_TYPE_SUB_EXCHANGE`.
   */
  targetingOptionId?: string;
}

/**
 * Represents a targetable sub-exchange. This will be populated in the
 * sub_exchange_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_SUB_EXCHANGE`.
 */
export interface SubExchangeTargetingOptionDetails {
  /**
   * Output only. The display name of the sub-exchange.
   */
  readonly displayName?: string;
}

/**
 * Setting that controls the average number of times the ads will show to the
 * same person over a certain period of time.
 */
export interface TargetFrequency {
  /**
   * The target number of times, on average, the ads will be shown to the same
   * person in the timespan dictated by time_unit and time_unit_count.
   */
  targetCount?: bigint;
  /**
   * The unit of time in which the target frequency will be applied. The
   * following time unit is applicable: * `TIME_UNIT_WEEKS`
   */
  timeUnit?:  | "TIME_UNIT_UNSPECIFIED" | "TIME_UNIT_LIFETIME" | "TIME_UNIT_MONTHS" | "TIME_UNIT_WEEKS" | "TIME_UNIT_DAYS" | "TIME_UNIT_HOURS" | "TIME_UNIT_MINUTES";
  /**
   * The number of time_unit the target frequency will last. The following
   * restrictions apply based on the value of time_unit: * `TIME_UNIT_WEEKS` -
   * must be 1
   */
  timeUnitCount?: number;
}

function serializeTargetFrequency(data: any): TargetFrequency {
  return {
    ...data,
    targetCount: data["targetCount"] !== undefined ? String(data["targetCount"]) : undefined,
  };
}

function deserializeTargetFrequency(data: any): TargetFrequency {
  return {
    ...data,
    targetCount: data["targetCount"] !== undefined ? BigInt(data["targetCount"]) : undefined,
  };
}

/**
 * Settings that control the targeting expansion of the line item. Targeting
 * expansion allows the line item to reach a larger audience based on the
 * original audience list and the targeting expansion level.
 */
export interface TargetingExpansionConfig {
  /**
   * Required. Whether to exclude first-party audiences from use in targeting
   * expansion or optimized targeting. Similar audiences of the excluded
   * first-party lists will not be excluded. Only applicable when a first-party
   * audience is positively targeted (directly or included in a combined
   * audience), otherwise this selection will be ignored.
   */
  excludeFirstPartyAudience?: boolean;
  /**
   * Required. Magnitude of expansion for applicable targeting under this line
   * item.
   */
  targetingExpansionLevel?:  | "TARGETING_EXPANSION_LEVEL_UNSPECIFIED" | "NO_EXPANSION" | "LEAST_EXPANSION" | "SOME_EXPANSION" | "BALANCED_EXPANSION" | "MORE_EXPANSION" | "MOST_EXPANSION";
}

/**
 * Represents a single targeting option, which is a targetable concept in
 * DV360.
 */
export interface TargetingOption {
  /**
   * Age range details.
   */
  ageRangeDetails?: AgeRangeTargetingOptionDetails;
  /**
   * App category details.
   */
  appCategoryDetails?: AppCategoryTargetingOptionDetails;
  /**
   * Audio content type details.
   */
  audioContentTypeDetails?: AudioContentTypeTargetingOptionDetails;
  /**
   * Authorized seller status resource details.
   */
  authorizedSellerStatusDetails?: AuthorizedSellerStatusTargetingOptionDetails;
  /**
   * Browser details.
   */
  browserDetails?: BrowserTargetingOptionDetails;
  /**
   * Business chain resource details.
   */
  businessChainDetails?: BusinessChainTargetingOptionDetails;
  /**
   * Carrier and ISP details.
   */
  carrierAndIspDetails?: CarrierAndIspTargetingOptionDetails;
  /**
   * Category resource details.
   */
  categoryDetails?: CategoryTargetingOptionDetails;
  /**
   * Content duration resource details.
   */
  contentDurationDetails?: ContentDurationTargetingOptionDetails;
  /**
   * Content genre resource details.
   */
  contentGenreDetails?: ContentGenreTargetingOptionDetails;
  /**
   * Content instream position details.
   */
  contentInstreamPositionDetails?: ContentInstreamPositionTargetingOptionDetails;
  /**
   * Content outstream position details.
   */
  contentOutstreamPositionDetails?: ContentOutstreamPositionTargetingOptionDetails;
  /**
   * Content stream type resource details.
   */
  contentStreamTypeDetails?: ContentStreamTypeTargetingOptionDetails;
  /**
   * Device make and model resource details.
   */
  deviceMakeModelDetails?: DeviceMakeModelTargetingOptionDetails;
  /**
   * Device type details.
   */
  deviceTypeDetails?: DeviceTypeTargetingOptionDetails;
  /**
   * Digital content label details.
   */
  digitalContentLabelDetails?: DigitalContentLabelTargetingOptionDetails;
  /**
   * Environment details.
   */
  environmentDetails?: EnvironmentTargetingOptionDetails;
  /**
   * Exchange details.
   */
  exchangeDetails?: ExchangeTargetingOptionDetails;
  /**
   * Gender details.
   */
  genderDetails?: GenderTargetingOptionDetails;
  /**
   * Geographic region resource details.
   */
  geoRegionDetails?: GeoRegionTargetingOptionDetails;
  /**
   * Household income details.
   */
  householdIncomeDetails?: HouseholdIncomeTargetingOptionDetails;
  /**
   * Language resource details.
   */
  languageDetails?: LanguageTargetingOptionDetails;
  /**
   * Output only. The resource name for this targeting option.
   */
  readonly name?: string;
  /**
   * Native content position details.
   */
  nativeContentPositionDetails?: NativeContentPositionTargetingOptionDetails;
  /**
   * Open Measurement enabled inventory details.
   */
  omidDetails?: OmidTargetingOptionDetails;
  /**
   * On screen position details.
   */
  onScreenPositionDetails?: OnScreenPositionTargetingOptionDetails;
  /**
   * Operating system resources details.
   */
  operatingSystemDetails?: OperatingSystemTargetingOptionDetails;
  /**
   * Parental status details.
   */
  parentalStatusDetails?: ParentalStatusTargetingOptionDetails;
  /**
   * POI resource details.
   */
  poiDetails?: PoiTargetingOptionDetails;
  /**
   * Sensitive Category details.
   */
  sensitiveCategoryDetails?: SensitiveCategoryTargetingOptionDetails;
  /**
   * Sub-exchange details.
   */
  subExchangeDetails?: SubExchangeTargetingOptionDetails;
  /**
   * Output only. A unique identifier for this targeting option. The tuple
   * {`targeting_type`, `targeting_option_id`} will be unique.
   */
  readonly targetingOptionId?: string;
  /**
   * Output only. The type of this targeting option.
   */
  readonly targetingType?:  | "TARGETING_TYPE_UNSPECIFIED" | "TARGETING_TYPE_CHANNEL" | "TARGETING_TYPE_APP_CATEGORY" | "TARGETING_TYPE_APP" | "TARGETING_TYPE_URL" | "TARGETING_TYPE_DAY_AND_TIME" | "TARGETING_TYPE_AGE_RANGE" | "TARGETING_TYPE_REGIONAL_LOCATION_LIST" | "TARGETING_TYPE_PROXIMITY_LOCATION_LIST" | "TARGETING_TYPE_GENDER" | "TARGETING_TYPE_VIDEO_PLAYER_SIZE" | "TARGETING_TYPE_USER_REWARDED_CONTENT" | "TARGETING_TYPE_PARENTAL_STATUS" | "TARGETING_TYPE_CONTENT_INSTREAM_POSITION" | "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION" | "TARGETING_TYPE_DEVICE_TYPE" | "TARGETING_TYPE_AUDIENCE_GROUP" | "TARGETING_TYPE_BROWSER" | "TARGETING_TYPE_HOUSEHOLD_INCOME" | "TARGETING_TYPE_ON_SCREEN_POSITION" | "TARGETING_TYPE_THIRD_PARTY_VERIFIER" | "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION" | "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION" | "TARGETING_TYPE_ENVIRONMENT" | "TARGETING_TYPE_CARRIER_AND_ISP" | "TARGETING_TYPE_OPERATING_SYSTEM" | "TARGETING_TYPE_DEVICE_MAKE_MODEL" | "TARGETING_TYPE_KEYWORD" | "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST" | "TARGETING_TYPE_VIEWABILITY" | "TARGETING_TYPE_CATEGORY" | "TARGETING_TYPE_INVENTORY_SOURCE" | "TARGETING_TYPE_LANGUAGE" | "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS" | "TARGETING_TYPE_GEO_REGION" | "TARGETING_TYPE_INVENTORY_SOURCE_GROUP" | "TARGETING_TYPE_EXCHANGE" | "TARGETING_TYPE_SUB_EXCHANGE" | "TARGETING_TYPE_POI" | "TARGETING_TYPE_BUSINESS_CHAIN" | "TARGETING_TYPE_CONTENT_DURATION" | "TARGETING_TYPE_CONTENT_STREAM_TYPE" | "TARGETING_TYPE_NATIVE_CONTENT_POSITION" | "TARGETING_TYPE_OMID" | "TARGETING_TYPE_AUDIO_CONTENT_TYPE" | "TARGETING_TYPE_CONTENT_GENRE" | "TARGETING_TYPE_YOUTUBE_VIDEO" | "TARGETING_TYPE_YOUTUBE_CHANNEL" | "TARGETING_TYPE_SESSION_POSITION";
  /**
   * User rewarded content details.
   */
  userRewardedContentDetails?: UserRewardedContentTargetingOptionDetails;
  /**
   * Video player size details.
   */
  videoPlayerSizeDetails?: VideoPlayerSizeTargetingOptionDetails;
  /**
   * Viewability resource details.
   */
  viewabilityDetails?: ViewabilityTargetingOptionDetails;
}

/**
 * Additional options for DisplayVideo#targetingTypesTargetingOptionsGet.
 */
export interface TargetingTypesTargetingOptionsGetOptions {
  /**
   * Required. The Advertiser this request is being made in the context of.
   */
  advertiserId?: bigint;
}

function serializeTargetingTypesTargetingOptionsGetOptions(data: any): TargetingTypesTargetingOptionsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeTargetingTypesTargetingOptionsGetOptions(data: any): TargetingTypesTargetingOptionsGetOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Additional options for DisplayVideo#targetingTypesTargetingOptionsList.
 */
export interface TargetingTypesTargetingOptionsListOptions {
  /**
   * Required. The Advertiser this request is being made in the context of.
   */
  advertiserId?: bigint;
  /**
   * Allows filtering by targeting option properties. Supported syntax: *
   * Filter expressions are made up of one or more restrictions. * Restrictions
   * can be combined by `OR` logical operators. * A restriction has the form of
   * `{field} {operator} {value}`. * The operator must be "=" (equal sign). *
   * Supported fields: - `carrierAndIspDetails.type` -
   * `geoRegionDetails.geoRegionType` - `targetingOptionId` Examples: * All `GEO
   * REGION` targeting options that belong to sub type `GEO_REGION_TYPE_COUNTRY`
   * or `GEO_REGION_TYPE_STATE`:
   * `geoRegionDetails.geoRegionType="GEO_REGION_TYPE_COUNTRY" OR
   * geoRegionDetails.geoRegionType="GEO_REGION_TYPE_STATE"` * All `CARRIER AND
   * ISP` targeting options that belong to sub type
   * `CARRIER_AND_ISP_TYPE_CARRIER`:
   * `carrierAndIspDetails.type="CARRIER_AND_ISP_TYPE_CARRIER"`. The length of
   * this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: *
   * `targetingOptionId` (default) The default sorting order is ascending. To
   * specify descending order for a field, a suffix "desc" should be added to
   * the field name. Example: `targetingOptionId desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value
   * is specified.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListTargetingOptions` method. If not specified, the first page of results
   * will be returned.
   */
  pageToken?: string;
}

function serializeTargetingTypesTargetingOptionsListOptions(data: any): TargetingTypesTargetingOptionsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
  };
}

function deserializeTargetingTypesTargetingOptionsListOptions(data: any): TargetingTypesTargetingOptionsListOptions {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
  };
}

/**
 * Settings for advertisers that use third-party ad servers only.
 */
export interface ThirdPartyOnlyConfig {
  /**
   * Whether or not order ID reporting for pixels is enabled. This value cannot
   * be changed once set to `true`.
   */
  pixelOrderIdReportingEnabled?: boolean;
}

/**
 * Tracking URLs from third parties to track interactions with an audio or a
 * video creative.
 */
export interface ThirdPartyUrl {
  /**
   * The type of interaction needs to be tracked by the tracking URL
   */
  type?:  | "THIRD_PARTY_URL_TYPE_UNSPECIFIED" | "THIRD_PARTY_URL_TYPE_IMPRESSION" | "THIRD_PARTY_URL_TYPE_CLICK_TRACKING" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_START" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FIRST_QUARTILE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MIDPOINT" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_THIRD_QUARTILE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_COMPLETE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MUTE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PAUSE" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_REWIND" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FULLSCREEN" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_STOP" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_CUSTOM" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_SKIP" | "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PROGRESS";
  /**
   * Tracking URL used to track the interaction. Provide a URL with optional
   * path or query string, beginning with `https:`. For example,
   * https://www.example.com/path
   */
  url?: string;
}

/**
 * Settings that control how third-party measurement vendors are configured.
 */
export interface ThirdPartyVendorConfig {
  /**
   * The ID used by the platform of the third-party vendor to identify the line
   * item.
   */
  placementId?: string;
  /**
   * The third-party measurement vendor.
   */
  vendor?:  | "THIRD_PARTY_VENDOR_UNSPECIFIED" | "THIRD_PARTY_VENDOR_MOAT" | "THIRD_PARTY_VENDOR_DOUBLE_VERIFY" | "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE" | "THIRD_PARTY_VENDOR_COMSCORE" | "THIRD_PARTY_VENDOR_TELEMETRY" | "THIRD_PARTY_VENDOR_MEETRICS" | "THIRD_PARTY_VENDOR_ZEFR" | "THIRD_PARTY_VENDOR_NIELSEN" | "THIRD_PARTY_VENDOR_KANTAR" | "THIRD_PARTY_VENDOR_DYNATA";
}

/**
 * Assigned third party verifier targeting option details. This will be
 * populated in the details field of an AssignedTargetingOption when
 * targeting_type is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`.
 */
export interface ThirdPartyVerifierAssignedTargetingOptionDetails {
  /**
   * Third party brand verifier -- Adloox.
   */
  adloox?: Adloox;
  /**
   * Third party brand verifier -- DoubleVerify.
   */
  doubleVerify?: DoubleVerify;
  /**
   * Third party brand verifier -- Integral Ad Science.
   */
  integralAdScience?: IntegralAdScience;
}

function serializeThirdPartyVerifierAssignedTargetingOptionDetails(data: any): ThirdPartyVerifierAssignedTargetingOptionDetails {
  return {
    ...data,
    doubleVerify: data["doubleVerify"] !== undefined ? serializeDoubleVerify(data["doubleVerify"]) : undefined,
    integralAdScience: data["integralAdScience"] !== undefined ? serializeIntegralAdScience(data["integralAdScience"]) : undefined,
  };
}

function deserializeThirdPartyVerifierAssignedTargetingOptionDetails(data: any): ThirdPartyVerifierAssignedTargetingOptionDetails {
  return {
    ...data,
    doubleVerify: data["doubleVerify"] !== undefined ? deserializeDoubleVerify(data["doubleVerify"]) : undefined,
    integralAdScience: data["integralAdScience"] !== undefined ? deserializeIntegralAdScience(data["integralAdScience"]) : undefined,
  };
}

/**
 * A time range.
 */
export interface TimeRange {
  /**
   * Required. The upper bound of a time range, inclusive.
   */
  endTime?: Date;
  /**
   * Required. The lower bound of a time range, inclusive.
   */
  startTime?: Date;
}

function serializeTimeRange(data: any): TimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeRange(data: any): TimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Timer event of the creative.
 */
export interface TimerEvent {
  /**
   * Required. The name of the timer event.
   */
  name?: string;
  /**
   * Required. The name used to identify this timer event in reports.
   */
  reportingName?: string;
}

/**
 * Settings that control the behavior of a single Floodlight activity config.
 */
export interface TrackingFloodlightActivityConfig {
  /**
   * Required. The ID of the Floodlight activity.
   */
  floodlightActivityId?: bigint;
  /**
   * Required. The number of days after an ad has been clicked in which a
   * conversion may be counted. Must be between 0 and 90 inclusive.
   */
  postClickLookbackWindowDays?: number;
  /**
   * Required. The number of days after an ad has been viewed in which a
   * conversion may be counted. Must be between 0 and 90 inclusive.
   */
  postViewLookbackWindowDays?: number;
}

function serializeTrackingFloodlightActivityConfig(data: any): TrackingFloodlightActivityConfig {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? String(data["floodlightActivityId"]) : undefined,
  };
}

function deserializeTrackingFloodlightActivityConfig(data: any): TrackingFloodlightActivityConfig {
  return {
    ...data,
    floodlightActivityId: data["floodlightActivityId"] !== undefined ? BigInt(data["floodlightActivityId"]) : undefined,
  };
}

/**
 * Represents information about the transcoded audio or video file.
 */
export interface Transcode {
  /**
   * The bit rate for the audio stream of the transcoded video, or the bit rate
   * for the transcoded audio, in kilobits per second.
   */
  audioBitRateKbps?: bigint;
  /**
   * The sample rate for the audio stream of the transcoded video, or the
   * sample rate for the transcoded audio, in hertz.
   */
  audioSampleRateHz?: bigint;
  /**
   * The transcoding bit rate of the transcoded video, in kilobits per second.
   */
  bitRateKbps?: bigint;
  /**
   * The dimensions of the transcoded video.
   */
  dimensions?: Dimensions;
  /**
   * The size of the transcoded file, in bytes.
   */
  fileSizeBytes?: bigint;
  /**
   * The frame rate of the transcoded video, in frames per second.
   */
  frameRate?: number;
  /**
   * The MIME type of the transcoded file.
   */
  mimeType?: string;
  /**
   * The name of the transcoded file.
   */
  name?: string;
  /**
   * Indicates if the transcoding was successful.
   */
  transcoded?: boolean;
}

function serializeTranscode(data: any): Transcode {
  return {
    ...data,
    audioBitRateKbps: data["audioBitRateKbps"] !== undefined ? String(data["audioBitRateKbps"]) : undefined,
    audioSampleRateHz: data["audioSampleRateHz"] !== undefined ? String(data["audioSampleRateHz"]) : undefined,
    bitRateKbps: data["bitRateKbps"] !== undefined ? String(data["bitRateKbps"]) : undefined,
    fileSizeBytes: data["fileSizeBytes"] !== undefined ? String(data["fileSizeBytes"]) : undefined,
  };
}

function deserializeTranscode(data: any): Transcode {
  return {
    ...data,
    audioBitRateKbps: data["audioBitRateKbps"] !== undefined ? BigInt(data["audioBitRateKbps"]) : undefined,
    audioSampleRateHz: data["audioSampleRateHz"] !== undefined ? BigInt(data["audioSampleRateHz"]) : undefined,
    bitRateKbps: data["bitRateKbps"] !== undefined ? BigInt(data["bitRateKbps"]) : undefined,
    fileSizeBytes: data["fileSizeBytes"] !== undefined ? BigInt(data["fileSizeBytes"]) : undefined,
  };
}

/**
 * A creative identifier provided by a registry that is unique across all
 * platforms. This is part of the VAST 4.0 standard.
 */
export interface UniversalAdId {
  /**
   * The unique creative identifier.
   */
  id?: string;
  /**
   * The registry provides unique creative identifiers.
   */
  registry?:  | "UNIVERSAL_AD_REGISTRY_UNSPECIFIED" | "UNIVERSAL_AD_REGISTRY_OTHER" | "UNIVERSAL_AD_REGISTRY_AD_ID" | "UNIVERSAL_AD_REGISTRY_CLEARCAST" | "UNIVERSAL_AD_REGISTRY_DV360" | "UNIVERSAL_AD_REGISTRY_CM";
}

/**
 * Details for assigned URL targeting option. This will be populated in the
 * details field of an AssignedTargetingOption when targeting_type is
 * `TARGETING_TYPE_URL`.
 */
export interface UrlAssignedTargetingOptionDetails {
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * Required. The URL, for example `example.com`. DV360 supports two levels of
   * subdirectory targeting, for example
   * `www.example.com/one-subdirectory-level/second-level`, and five levels of
   * subdomain targeting, for example `five.four.three.two.one.example.com`.
   */
  url?: string;
}

/**
 * A single user in Display & Video 360.
 */
export interface User {
  /**
   * The assigned user roles. Required in CreateUser. Output only in
   * UpdateUser. Can only be updated through BulkEditAssignedUserRoles.
   */
  assignedUserRoles?: AssignedUserRole[];
  /**
   * Required. The display name of the user. Must be UTF-8 encoded with a
   * maximum size of 240 bytes.
   */
  displayName?: string;
  /**
   * Required. Immutable. The email address used to identify the user.
   */
  email?: string;
  /**
   * Output only. The resource name of the user.
   */
  readonly name?: string;
  /**
   * Output only. The unique ID of the user. Assigned by the system.
   */
  readonly userId?: bigint;
}

function serializeUser(data: any): User {
  return {
    ...data,
    assignedUserRoles: data["assignedUserRoles"] !== undefined ? data["assignedUserRoles"].map((item: any) => (serializeAssignedUserRole(item))) : undefined,
  };
}

function deserializeUser(data: any): User {
  return {
    ...data,
    assignedUserRoles: data["assignedUserRoles"] !== undefined ? data["assignedUserRoles"].map((item: any) => (deserializeAssignedUserRole(item))) : undefined,
    userId: data["userId"] !== undefined ? BigInt(data["userId"]) : undefined,
  };
}

/**
 * User rewarded content targeting option details. This will be populated in
 * the user_rewarded_content_details field when targeting_type is
 * `TARGETING_TYPE_USER_REWARDED_CONTENT`.
 */
export interface UserRewardedContentAssignedTargetingOptionDetails {
  /**
   * Required. The targeting_option_id field when targeting_type is
   * `TARGETING_TYPE_USER_REWARDED_CONTENT`.
   */
  targetingOptionId?: string;
  /**
   * Output only. User rewarded content status for video ads.
   */
  readonly userRewardedContent?:  | "USER_REWARDED_CONTENT_UNSPECIFIED" | "USER_REWARDED_CONTENT_USER_REWARDED" | "USER_REWARDED_CONTENT_NOT_USER_REWARDED";
}

/**
 * Represents a targetable user rewarded content status for video ads only.
 * This will be populated in the user_rewarded_content_details field when
 * targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.
 */
export interface UserRewardedContentTargetingOptionDetails {
  /**
   * Output only. User rewarded content status for video ads.
   */
  readonly userRewardedContent?:  | "USER_REWARDED_CONTENT_UNSPECIFIED" | "USER_REWARDED_CONTENT_USER_REWARDED" | "USER_REWARDED_CONTENT_NOT_USER_REWARDED";
}

/**
 * Additional options for DisplayVideo#usersList.
 */
export interface UsersListOptions {
  /**
   * Allows filtering by user properties. Supported syntax: * Filter
   * expressions are made up of one or more restrictions. * Restrictions can be
   * combined by the logical operator `AND`. * A restriction has the form of
   * `{field} {operator} {value}`. * The operator must be `CONTAINS (:)` or
   * `EQUALS (=)`. * The operator must be `CONTAINS (:)` for the following
   * fields: - `displayName` - `email` * The operator must be `EQUALS (=)` for
   * the following fields: - `assignedUserRole.userRole` -
   * `assignedUserRole.partnerId` - `assignedUserRole.advertiserId` -
   * `assignedUserRole.entityType`: A synthetic field of AssignedUserRole used
   * for filtering. Identifies the type of entity to which the user role is
   * assigned. Valid values are `Partner` and `Advertiser`. -
   * `assignedUserRole.parentPartnerId`: A synthetic field of AssignedUserRole
   * used for filtering. Identifies the parent partner of the entity to which
   * the user role is assigned." Examples: * The user with displayName
   * containing `foo`: `displayName:"foo"` * The user with email containing
   * `bar`: `email:"bar"` * All users with standard user roles:
   * `assignedUserRole.userRole="STANDARD"` * All users with user roles for
   * partner 123: `assignedUserRole.partnerId="123"` * All users with user roles
   * for advertiser 123: `assignedUserRole.advertiserId="123"` * All users with
   * partner level user roles: `entityType="PARTNER"` * All users with user
   * roles for partner 123 and advertisers under partner 123:
   * `parentPartnerId="123"` The length of this field should be no more than 500
   * characters.
   */
  filter?: string;
  /**
   * Field by which to sort the list. Acceptable values are: * `displayName`
   * (default) The default sorting order is ascending. To specify descending
   * order for a field, a suffix "desc" should be added to the field name. For
   * example, `displayName desc`.
   */
  orderBy?: string;
  /**
   * Requested page size. Must be between `1` and `200`. If unspecified will
   * default to `100`.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of next_page_token returned from the previous call to
   * `ListUsers` method. If not specified, the first page of results will be
   * returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DisplayVideo#usersPatch.
 */
export interface UsersPatchOptions {
  /**
   * Required. The mask to control which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUsersPatchOptions(data: any): UsersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUsersPatchOptions(data: any): UsersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Settings related to VideoAdSequence.
 */
export interface VideoAdSequenceSettings {
  /**
   * The minimum time interval before the same user sees this sequence again.
   */
  minimumDuration?:  | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_UNSPECIFIED" | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_WEEK" | "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_MONTH";
  /**
   * The steps of which the sequence consists.
   */
  steps?: VideoAdSequenceStep[];
}

function serializeVideoAdSequenceSettings(data: any): VideoAdSequenceSettings {
  return {
    ...data,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (serializeVideoAdSequenceStep(item))) : undefined,
  };
}

function deserializeVideoAdSequenceSettings(data: any): VideoAdSequenceSettings {
  return {
    ...data,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (deserializeVideoAdSequenceStep(item))) : undefined,
  };
}

/**
 * The detail of a single step in a VideoAdSequence.
 */
export interface VideoAdSequenceStep {
  /**
   * The ID of the corresponding ad group of the step.
   */
  adGroupId?: bigint;
  /**
   * The interaction on the previous step that will lead the viewer to this
   * step. The first step does not have interaction_type.
   */
  interactionType?:  | "INTERACTION_TYPE_UNSPECIFIED" | "INTERACTION_TYPE_PAID_VIEW" | "INTERACTION_TYPE_SKIP" | "INTERACTION_TYPE_IMPRESSION" | "INTERACTION_TYPE_ENGAGED_IMPRESSION";
  /**
   * The ID of the previous step. The first step does not have previous step.
   */
  previousStepId?: bigint;
  /**
   * The ID of the step.
   */
  stepId?: bigint;
}

function serializeVideoAdSequenceStep(data: any): VideoAdSequenceStep {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? String(data["adGroupId"]) : undefined,
    previousStepId: data["previousStepId"] !== undefined ? String(data["previousStepId"]) : undefined,
    stepId: data["stepId"] !== undefined ? String(data["stepId"]) : undefined,
  };
}

function deserializeVideoAdSequenceStep(data: any): VideoAdSequenceStep {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? BigInt(data["adGroupId"]) : undefined,
    previousStepId: data["previousStepId"] !== undefined ? BigInt(data["previousStepId"]) : undefined,
    stepId: data["stepId"] !== undefined ? BigInt(data["stepId"]) : undefined,
  };
}

/**
 * Details for a video discovery ad.
 */
export interface VideoDiscoveryAd {
  /**
   * First text line for the ad.
   */
  description1?: string;
  /**
   * Second text line for the ad.
   */
  description2?: string;
  /**
   * The headline of ad.
   */
  headline?: string;
  /**
   * Thumbnail image used in the ad.
   */
  thumbnail?:  | "THUMBNAIL_UNSPECIFIED" | "THUMBNAIL_DEFAULT" | "THUMBNAIL_1" | "THUMBNAIL_2" | "THUMBNAIL_3";
  /**
   * The YouTube video the ad promotes.
   */
  video?: YoutubeVideoDetails;
}

/**
 * Details for a video performance ad.
 */
export interface VideoPerformanceAd {
  /**
   * The list of text assets shown on the call-to-action button.
   */
  actionButtonLabels?: string[];
  /**
   * The list of companion banners used by this ad.
   */
  companionBanners?: ImageAsset[];
  /**
   * The custom parameters to pass custom values to tracking URL template.
   */
  customParameters?: {
    [key: string]: string
  };
  /**
   * The list of descriptions shown on the call-to-action banner.
   */
  descriptions?: string[];
  /**
   * The first piece after the domain in the display URL.
   */
  displayUrlBreadcrumb1?: string;
  /**
   * The second piece after the domain in the display URL.
   */
  displayUrlBreadcrumb2?: string;
  /**
   * The domain of the display URL.
   */
  domain?: string;
  /**
   * The URL address of the webpage that people reach after they click the ad.
   */
  finalUrl?: string;
  /**
   * The list of headlines shown on the call-to-action banner.
   */
  headlines?: string[];
  /**
   * The list of lone headlines shown on the call-to-action banner.
   */
  longHeadlines?: string[];
  /**
   * The URL address loaded in the background for tracking purposes.
   */
  trackingUrl?: string;
  /**
   * The list of YouTube video assets used by this ad.
   */
  videos?: YoutubeVideoDetails[];
}

function serializeVideoPerformanceAd(data: any): VideoPerformanceAd {
  return {
    ...data,
    companionBanners: data["companionBanners"] !== undefined ? data["companionBanners"].map((item: any) => (serializeImageAsset(item))) : undefined,
  };
}

function deserializeVideoPerformanceAd(data: any): VideoPerformanceAd {
  return {
    ...data,
    companionBanners: data["companionBanners"] !== undefined ? data["companionBanners"].map((item: any) => (deserializeImageAsset(item))) : undefined,
  };
}

/**
 * Video player size targeting option details. This will be populated in the
 * video_player_size_details field when targeting_type is
 * `TARGETING_TYPE_VIDEO_PLAYER_SIZE`. Explicitly targeting all options is not
 * supported. Remove all video player size targeting options to achieve this
 * effect.
 */
export interface VideoPlayerSizeAssignedTargetingOptionDetails {
  /**
   * The video player size. Output only in v1. Required in v2.
   */
  videoPlayerSize?:  | "VIDEO_PLAYER_SIZE_UNSPECIFIED" | "VIDEO_PLAYER_SIZE_SMALL" | "VIDEO_PLAYER_SIZE_LARGE" | "VIDEO_PLAYER_SIZE_HD" | "VIDEO_PLAYER_SIZE_UNKNOWN";
}

/**
 * Represents a targetable video player size. This will be populated in the
 * video_player_size_details field when targeting_type is
 * `TARGETING_TYPE_VIDEO_PLAYER_SIZE`.
 */
export interface VideoPlayerSizeTargetingOptionDetails {
  /**
   * Output only. The video player size.
   */
  readonly videoPlayerSize?:  | "VIDEO_PLAYER_SIZE_UNSPECIFIED" | "VIDEO_PLAYER_SIZE_SMALL" | "VIDEO_PLAYER_SIZE_LARGE" | "VIDEO_PLAYER_SIZE_HD" | "VIDEO_PLAYER_SIZE_UNKNOWN";
}

/**
 * Assigned viewability targeting option details. This will be populated in the
 * viewability_details field of an AssignedTargetingOption when targeting_type
 * is `TARGETING_TYPE_VIEWABILITY`.
 */
export interface ViewabilityAssignedTargetingOptionDetails {
  /**
   * The predicted viewability percentage. Output only in v1. Required in v2.
   */
  viewability?:  | "VIEWABILITY_UNSPECIFIED" | "VIEWABILITY_10_PERCENT_OR_MORE" | "VIEWABILITY_20_PERCENT_OR_MORE" | "VIEWABILITY_30_PERCENT_OR_MORE" | "VIEWABILITY_40_PERCENT_OR_MORE" | "VIEWABILITY_50_PERCENT_OR_MORE" | "VIEWABILITY_60_PERCENT_OR_MORE" | "VIEWABILITY_70_PERCENT_OR_MORE" | "VIEWABILITY_80_PERCENT_OR_MORE" | "VIEWABILITY_90_PERCENT_OR_MORE";
}

/**
 * Represents a targetable viewability. This will be populated in the
 * viewability_details field of a TargetingOption when targeting_type is
 * `TARGETING_TYPE_VIEWABILITY`.
 */
export interface ViewabilityTargetingOptionDetails {
  /**
   * Output only. The predicted viewability percentage.
   */
  readonly viewability?:  | "VIEWABILITY_UNSPECIFIED" | "VIEWABILITY_10_PERCENT_OR_MORE" | "VIEWABILITY_20_PERCENT_OR_MORE" | "VIEWABILITY_30_PERCENT_OR_MORE" | "VIEWABILITY_40_PERCENT_OR_MORE" | "VIEWABILITY_50_PERCENT_OR_MORE" | "VIEWABILITY_60_PERCENT_OR_MORE" | "VIEWABILITY_70_PERCENT_OR_MORE" | "VIEWABILITY_80_PERCENT_OR_MORE" | "VIEWABILITY_90_PERCENT_OR_MORE";
}

/**
 * A single YouTube ad group associated with a YouTube and Partners line item.
 */
export interface YoutubeAdGroup {
  /**
   * The format of the ads in the ad group.
   */
  adGroupFormat?:  | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_UNSPECIFIED" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_IN_STREAM" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_VIDEO_DISCOVERY" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_BUMPER" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_NON_SKIPPABLE_IN_STREAM" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_AUDIO" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_ACTION" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_REACH" | "YOUTUBE_AND_PARTNERS_AD_GROUP_FORMAT_MASTHEAD";
  /**
   * The unique ID of the ad group. Assigned by the system.
   */
  adGroupId?: bigint;
  /**
   * The unique ID of the advertiser the ad group belongs to.
   */
  advertiserId?: bigint;
  /**
   * The bidding strategy used by the ad group.
   */
  biddingStrategy?: YoutubeAndPartnersBiddingStrategy;
  /**
   * The display name of the ad group. Must be UTF-8 encoded with a maximum
   * size of 255 bytes.
   */
  displayName?: string;
  /**
   * Controls whether or not the ad group can spend its budget and bid on
   * inventory. If the ad group's parent line item is not active, the ad group
   * can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * The unique ID of the line item that the ad group belongs to.
   */
  lineItemId?: bigint;
  /**
   * The resource name of the ad group.
   */
  name?: string;
  /**
   * The settings of the product feed in this ad group.
   */
  productFeedData?: ProductFeedData;
  /**
   * The [targeting
   * expansion](https://support.google.com/displayvideo/answer/10191558)
   * settings of the ad group. This config is only applicable when eligible
   * audience list targeting is assigned to the ad group.
   */
  targetingExpansion?: TargetingExpansionConfig;
  /**
   * The IDs of the youtube_ad_group_ad resources associated with the ad group.
   */
  youtubeAdIds?: bigint[];
}

function serializeYoutubeAdGroup(data: any): YoutubeAdGroup {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? String(data["adGroupId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    biddingStrategy: data["biddingStrategy"] !== undefined ? serializeYoutubeAndPartnersBiddingStrategy(data["biddingStrategy"]) : undefined,
    lineItemId: data["lineItemId"] !== undefined ? String(data["lineItemId"]) : undefined,
    youtubeAdIds: data["youtubeAdIds"] !== undefined ? data["youtubeAdIds"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeYoutubeAdGroup(data: any): YoutubeAdGroup {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? BigInt(data["adGroupId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    biddingStrategy: data["biddingStrategy"] !== undefined ? deserializeYoutubeAndPartnersBiddingStrategy(data["biddingStrategy"]) : undefined,
    lineItemId: data["lineItemId"] !== undefined ? BigInt(data["lineItemId"]) : undefined,
    youtubeAdIds: data["youtubeAdIds"] !== undefined ? data["youtubeAdIds"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A single ad associated with a YouTube ad group.
 */
export interface YoutubeAdGroupAd {
  /**
   * The unique ID of the ad. Assigned by the system.
   */
  adGroupAdId?: bigint;
  /**
   * The unique ID of the ad group that the ad belongs to.
   */
  adGroupId?: bigint;
  /**
   * List of URLs used by the ad.
   */
  adUrls?: AdUrl[];
  /**
   * The unique ID of the advertiser the ad belongs to.
   */
  advertiserId?: bigint;
  /**
   * Details of an [audio ad](//support.google.com/displayvideo/answer/6274216)
   * used for reach marketing objectives.
   */
  audioAd?: AudioAd;
  /**
   * Details of a [non-skippable short video
   * ad](//support.google.com/displayvideo/answer/6274216), equal to or less
   * than 6 seconds, used for reach.
   */
  bumperAd?: BumperAd;
  /**
   * The display name of the ad. Must be UTF-8 encoded with a maximum size of
   * 255 bytes.
   */
  displayName?: string;
  /**
   * Details of an ad sourced from a Display & Video 360 creative.
   */
  displayVideoSourceAd?: DisplayVideoSourceAd;
  /**
   * The entity status of the ad.
   */
  entityStatus?:  | "ENTITY_STATUS_UNSPECIFIED" | "ENTITY_STATUS_ACTIVE" | "ENTITY_STATUS_ARCHIVED" | "ENTITY_STATUS_DRAFT" | "ENTITY_STATUS_PAUSED" | "ENTITY_STATUS_SCHEDULED_FOR_DELETION";
  /**
   * Details of an [in-stream ad skippable after 5
   * seconds](//support.google.com/displayvideo/answer/6274216), used for brand
   * awareness or reach marketing objectives.
   */
  inStreamAd?: InStreamAd;
  /**
   * Details of an [ad served on the YouTube Home
   * feed](//support.google.com/google-ads/answer/9709826).
   */
  mastheadAd?: MastheadAd;
  /**
   * The resource name of the ad.
   */
  name?: string;
  /**
   * Details of a [non-skippable short in-stream video
   * ad](//support.google.com/displayvideo/answer/6274216), between 6 and 15
   * seconds, used for reach marketing objectives.
   */
  nonSkippableAd?: NonSkippableAd;
  /**
   * Details of an [ad promoting a
   * video](//support.google.com/displayvideo/answer/6274216) that shows in
   * places of discovery.
   */
  videoDiscoverAd?: VideoDiscoveryAd;
  /**
   * Details of an [ad used in a video action
   * campaign](//support.google.com/google-ads/answer/10147229) to drive actions
   * to the business, service or product.
   */
  videoPerformanceAd?: VideoPerformanceAd;
}

function serializeYoutubeAdGroupAd(data: any): YoutubeAdGroupAd {
  return {
    ...data,
    adGroupAdId: data["adGroupAdId"] !== undefined ? String(data["adGroupAdId"]) : undefined,
    adGroupId: data["adGroupId"] !== undefined ? String(data["adGroupId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    bumperAd: data["bumperAd"] !== undefined ? serializeBumperAd(data["bumperAd"]) : undefined,
    displayVideoSourceAd: data["displayVideoSourceAd"] !== undefined ? serializeDisplayVideoSourceAd(data["displayVideoSourceAd"]) : undefined,
    inStreamAd: data["inStreamAd"] !== undefined ? serializeInStreamAd(data["inStreamAd"]) : undefined,
    mastheadAd: data["mastheadAd"] !== undefined ? serializeMastheadAd(data["mastheadAd"]) : undefined,
    nonSkippableAd: data["nonSkippableAd"] !== undefined ? serializeNonSkippableAd(data["nonSkippableAd"]) : undefined,
    videoPerformanceAd: data["videoPerformanceAd"] !== undefined ? serializeVideoPerformanceAd(data["videoPerformanceAd"]) : undefined,
  };
}

function deserializeYoutubeAdGroupAd(data: any): YoutubeAdGroupAd {
  return {
    ...data,
    adGroupAdId: data["adGroupAdId"] !== undefined ? BigInt(data["adGroupAdId"]) : undefined,
    adGroupId: data["adGroupId"] !== undefined ? BigInt(data["adGroupId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    bumperAd: data["bumperAd"] !== undefined ? deserializeBumperAd(data["bumperAd"]) : undefined,
    displayVideoSourceAd: data["displayVideoSourceAd"] !== undefined ? deserializeDisplayVideoSourceAd(data["displayVideoSourceAd"]) : undefined,
    inStreamAd: data["inStreamAd"] !== undefined ? deserializeInStreamAd(data["inStreamAd"]) : undefined,
    mastheadAd: data["mastheadAd"] !== undefined ? deserializeMastheadAd(data["mastheadAd"]) : undefined,
    nonSkippableAd: data["nonSkippableAd"] !== undefined ? deserializeNonSkippableAd(data["nonSkippableAd"]) : undefined,
    videoPerformanceAd: data["videoPerformanceAd"] !== undefined ? deserializeVideoPerformanceAd(data["videoPerformanceAd"]) : undefined,
  };
}

/**
 * Wrapper object associating an assigned_targeting_option resource and the
 * youtube ad group it is assigned to.
 */
export interface YoutubeAdGroupAssignedTargetingOption {
  /**
   * The assigned targeting option resource.
   */
  assignedTargetingOption?: AssignedTargetingOption;
  /**
   * The ID of the youtube ad group the assigned targeting option is assigned
   * to.
   */
  youtubeAdGroupId?: bigint;
}

function serializeYoutubeAdGroupAssignedTargetingOption(data: any): YoutubeAdGroupAssignedTargetingOption {
  return {
    ...data,
    assignedTargetingOption: data["assignedTargetingOption"] !== undefined ? serializeAssignedTargetingOption(data["assignedTargetingOption"]) : undefined,
    youtubeAdGroupId: data["youtubeAdGroupId"] !== undefined ? String(data["youtubeAdGroupId"]) : undefined,
  };
}

function deserializeYoutubeAdGroupAssignedTargetingOption(data: any): YoutubeAdGroupAssignedTargetingOption {
  return {
    ...data,
    assignedTargetingOption: data["assignedTargetingOption"] !== undefined ? deserializeAssignedTargetingOption(data["assignedTargetingOption"]) : undefined,
    youtubeAdGroupId: data["youtubeAdGroupId"] !== undefined ? BigInt(data["youtubeAdGroupId"]) : undefined,
  };
}

/**
 * Settings that control the bid strategy for YouTube and Partners resources.
 */
export interface YoutubeAndPartnersBiddingStrategy {
  /**
   * Output only. Source of the effective targetCpa value for AdGroup.
   */
  readonly adGroupEffectiveTargetCpaSource?:  | "BIDDING_SOURCE_UNSPECIFIED" | "BIDDING_SOURCE_LINE_ITEM" | "BIDDING_SOURCE_AD_GROUP";
  /**
   * Output only. The effective targetCpa for AdGroup, in micros of
   * advertiser's currency.
   */
  readonly adGroupEffectiveTargetCpaValue?: bigint;
  /**
   * The type of the bidding strategy.
   */
  type?:  | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_UNSPECIFIED" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_LIFT" | "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS";
  /**
   * The value used by the bidding strategy. When the bidding strategy is
   * assigned at the line item level, this field is only applicable for the
   * following strategy types: *
   * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` When the bidding
   * strategy is assigned at the ad group level, this field is only applicable
   * for the following strategy types: *
   * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM` *
   * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV` *
   * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` *
   * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM` If not using an
   * applicable strategy, the value of this field will be 0.
   */
  value?: bigint;
}

function serializeYoutubeAndPartnersBiddingStrategy(data: any): YoutubeAndPartnersBiddingStrategy {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeYoutubeAndPartnersBiddingStrategy(data: any): YoutubeAndPartnersBiddingStrategy {
  return {
    ...data,
    adGroupEffectiveTargetCpaValue: data["adGroupEffectiveTargetCpaValue"] !== undefined ? BigInt(data["adGroupEffectiveTargetCpaValue"]) : undefined,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * Settings that control what YouTube related inventories the YouTube and
 * Partners line item will target.
 */
export interface YoutubeAndPartnersInventorySourceConfig {
  /**
   * Whether to target inventory on the YouTube search results page.
   */
  includeYoutubeSearch?: boolean;
  /**
   * Whether to target inventory on a collection of partner sites and apps that
   * follow the same brand safety standards as YouTube.
   */
  includeYoutubeVideoPartners?: boolean;
  /**
   * Whether to target inventory of channels and videos on YouTube and YouTube
   * videos embedded on other sites.
   */
  includeYoutubeVideos?: boolean;
}

/**
 * Settings for YouTube and Partners line items.
 */
export interface YoutubeAndPartnersSettings {
  /**
   * The bidding strategy of the YouTube and Partners line item.
   */
  biddingStrategy?: YoutubeAndPartnersBiddingStrategy;
  /**
   * The kind of content on which the YouTube and Partners ads will be shown.
   */
  contentCategory?:  | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED" | "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED";
  /**
   * Settings that control what YouTube and Partners inventories the line item
   * will target.
   */
  inventorySourceSettings?: YoutubeAndPartnersInventorySourceConfig;
  /**
   * The ID of the form to generate leads.
   */
  leadFormId?: bigint;
  /**
   * The ID of the merchant which is linked to the line item for product feed.
   */
  linkedMerchantId?: bigint;
  /**
   * The IDs of the videos appear below the primary video ad when the ad is
   * playing in the YouTube app on mobile devices.
   */
  relatedVideoIds?: string[];
  /**
   * The average number of times you want ads from this line item to show to
   * the same person over a certain period of time.
   */
  targetFrequency?: TargetFrequency;
  /**
   * The third-party measurement settings of the line item.
   */
  thirdPartyMeasurementSettings?: YoutubeAndPartnersThirdPartyMeasurementSettings;
  /**
   * The settings related to VideoAdSequence.
   */
  videoAdSequenceSettings?: VideoAdSequenceSettings;
  /**
   * The view frequency cap settings of the line item. The max_views field in
   * this settings object must be used if assigning a limited cap.
   */
  viewFrequencyCap?: FrequencyCap;
}

function serializeYoutubeAndPartnersSettings(data: any): YoutubeAndPartnersSettings {
  return {
    ...data,
    biddingStrategy: data["biddingStrategy"] !== undefined ? serializeYoutubeAndPartnersBiddingStrategy(data["biddingStrategy"]) : undefined,
    leadFormId: data["leadFormId"] !== undefined ? String(data["leadFormId"]) : undefined,
    linkedMerchantId: data["linkedMerchantId"] !== undefined ? String(data["linkedMerchantId"]) : undefined,
    targetFrequency: data["targetFrequency"] !== undefined ? serializeTargetFrequency(data["targetFrequency"]) : undefined,
    videoAdSequenceSettings: data["videoAdSequenceSettings"] !== undefined ? serializeVideoAdSequenceSettings(data["videoAdSequenceSettings"]) : undefined,
  };
}

function deserializeYoutubeAndPartnersSettings(data: any): YoutubeAndPartnersSettings {
  return {
    ...data,
    biddingStrategy: data["biddingStrategy"] !== undefined ? deserializeYoutubeAndPartnersBiddingStrategy(data["biddingStrategy"]) : undefined,
    leadFormId: data["leadFormId"] !== undefined ? BigInt(data["leadFormId"]) : undefined,
    linkedMerchantId: data["linkedMerchantId"] !== undefined ? BigInt(data["linkedMerchantId"]) : undefined,
    targetFrequency: data["targetFrequency"] !== undefined ? deserializeTargetFrequency(data["targetFrequency"]) : undefined,
    videoAdSequenceSettings: data["videoAdSequenceSettings"] !== undefined ? deserializeVideoAdSequenceSettings(data["videoAdSequenceSettings"]) : undefined,
  };
}

/**
 * Settings that control what third-party vendors are measuring specific line
 * item metrics.
 */
export interface YoutubeAndPartnersThirdPartyMeasurementSettings {
  /**
   * The third-party vendors measuring brand lift. The following third-party
   * vendors are applicable: * `THIRD_PARTY_VENDOR_DYNATA` *
   * `THIRD_PARTY_VENDOR_KANTAR`
   */
  brandLiftVendorConfigs?: ThirdPartyVendorConfig[];
  /**
   * The third-party vendors measuring brand safety. The following third-party
   * vendors are applicable: * `THIRD_PARTY_VENDOR_ZERF` *
   * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` *
   * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE`
   */
  brandSafetyVendorConfigs?: ThirdPartyVendorConfig[];
  /**
   * The third-party vendors measuring reach. The following third-party vendors
   * are applicable: * `THIRD_PARTY_VENDOR_NIELSEN` *
   * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_KANTAR`
   */
  reachVendorConfigs?: ThirdPartyVendorConfig[];
  /**
   * The third-party vendors measuring viewability. The following third-party
   * vendors are applicable: * `THIRD_PARTY_VENDOR_MOAT` *
   * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` *
   * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_COMSCORE` *
   * `THIRD_PARTY_VENDOR_TELEMETRY` * `THIRD_PARTY_VENDOR_MEETRICS`
   */
  viewabilityVendorConfigs?: ThirdPartyVendorConfig[];
}

/**
 * Details for YouTube channel assigned targeting option. This will be
 * populated in the youtube_channel_details field when targeting_type is
 * `TARGETING_TYPE_YOUTUBE_CHANNEL`.
 */
export interface YoutubeChannelAssignedTargetingOptionDetails {
  /**
   * The YouTube uploader channel id or the channel code of a YouTube channel.
   */
  channelId?: string;
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
}

/**
 * Details for YouTube video assigned targeting option. This will be populated
 * in the youtube_video_details field when targeting_type is
 * `TARGETING_TYPE_YOUTUBE_VIDEO`.
 */
export interface YoutubeVideoAssignedTargetingOptionDetails {
  /**
   * Indicates if this option is being negatively targeted.
   */
  negative?: boolean;
  /**
   * YouTube video id as it appears on the YouTube watch page.
   */
  videoId?: string;
}

/**
 * Details of a YouTube video.
 */
export interface YoutubeVideoDetails {
  /**
   * The YouTube video ID which can be searched on YouTube webpage.
   */
  id?: string;
  /**
   * The reason why the video data is not available.
   */
  unavailableReason?:  | "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED" | "VIDEO_UNAVAILABLE_REASON_PRIVATE" | "VIDEO_UNAVAILABLE_REASON_DELETED";
}