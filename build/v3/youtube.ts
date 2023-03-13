// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * YouTube Data API v3 Client for Deno
 * ===================================
 * 
 * The YouTube Data API v3 is an API that provides access to YouTube data, such as videos, playlists, and channels.
 * 
 * Docs: https://developers.google.com/youtube/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The YouTube Data API v3 is an API that provides access to YouTube data, such
 * as videos, playlists, and channels.
 */
export class YouTube {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://youtube.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async abuseReportsInsert(req: AbuseReport, opts: AbuseReportsInsertOptions = {}): Promise<AbuseReport> {
    const url = new URL(`${this.#baseUrl}youtube/v3/abuseReports`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AbuseReport;
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async activitiesList(opts: ActivitiesListOptions = {}): Promise<ActivityListResponse> {
    opts = serializeActivitiesListOptions(opts);
    const url = new URL(`${this.#baseUrl}youtube/v3/activities`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.home !== undefined) {
      url.searchParams.append("home", String(opts.home));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.mine !== undefined) {
      url.searchParams.append("mine", String(opts.mine));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.publishedAfter !== undefined) {
      url.searchParams.append("publishedAfter", String(opts.publishedAfter));
    }
    if (opts.publishedBefore !== undefined) {
      url.searchParams.append("publishedBefore", String(opts.publishedBefore));
    }
    if (opts.regionCode !== undefined) {
      url.searchParams.append("regionCode", String(opts.regionCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeActivityListResponse(data);
  }

  /**
   * Deletes a resource.
   *
   */
  async captionsDelete(opts: CaptionsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/captions`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOf !== undefined) {
      url.searchParams.append("onBehalfOf", String(opts.onBehalfOf));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Downloads a caption track.
   *
   * @param id The ID of the caption track to download, required for One Platform.
   */
  async captionsDownload(id: string, opts: CaptionsDownloadOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/captions/${ id }`);
    if (opts.onBehalfOf !== undefined) {
      url.searchParams.append("onBehalfOf", String(opts.onBehalfOf));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.tfmt !== undefined) {
      url.searchParams.append("tfmt", String(opts.tfmt));
    }
    if (opts.tlang !== undefined) {
      url.searchParams.append("tlang", String(opts.tlang));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async captionsInsert(req: Caption, opts: CaptionsInsertOptions = {}): Promise<Caption> {
    req = serializeCaption(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/captions`);
    if (opts.onBehalfOf !== undefined) {
      url.searchParams.append("onBehalfOf", String(opts.onBehalfOf));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.sync !== undefined) {
      url.searchParams.append("sync", String(opts.sync));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCaption(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async captionsList(opts: CaptionsListOptions = {}): Promise<CaptionListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/captions`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOf !== undefined) {
      url.searchParams.append("onBehalfOf", String(opts.onBehalfOf));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.videoId !== undefined) {
      url.searchParams.append("videoId", String(opts.videoId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCaptionListResponse(data);
  }

  /**
   * Updates an existing resource.
   *
   */
  async captionsUpdate(req: Caption, opts: CaptionsUpdateOptions = {}): Promise<Caption> {
    req = serializeCaption(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/captions`);
    if (opts.onBehalfOf !== undefined) {
      url.searchParams.append("onBehalfOf", String(opts.onBehalfOf));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.sync !== undefined) {
      url.searchParams.append("sync", String(opts.sync));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCaption(data);
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async channelBannersInsert(req: ChannelBannerResource, opts: ChannelBannersInsertOptions = {}): Promise<ChannelBannerResource> {
    const url = new URL(`${this.#baseUrl}youtube/v3/channelBanners/insert`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ChannelBannerResource;
  }

  /**
   * Deletes a resource.
   *
   */
  async channelSectionsDelete(opts: ChannelSectionsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/channelSections`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async channelSectionsInsert(req: ChannelSection, opts: ChannelSectionsInsertOptions = {}): Promise<ChannelSection> {
    const url = new URL(`${this.#baseUrl}youtube/v3/channelSections`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ChannelSection;
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async channelSectionsList(opts: ChannelSectionsListOptions = {}): Promise<ChannelSectionListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/channelSections`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.mine !== undefined) {
      url.searchParams.append("mine", String(opts.mine));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ChannelSectionListResponse;
  }

  /**
   * Updates an existing resource.
   *
   */
  async channelSectionsUpdate(req: ChannelSection, opts: ChannelSectionsUpdateOptions = {}): Promise<ChannelSection> {
    const url = new URL(`${this.#baseUrl}youtube/v3/channelSections`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ChannelSection;
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async channelsList(opts: ChannelsListOptions = {}): Promise<ChannelListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/channels`);
    if (opts.categoryId !== undefined) {
      url.searchParams.append("categoryId", String(opts.categoryId));
    }
    if (opts.forUsername !== undefined) {
      url.searchParams.append("forUsername", String(opts.forUsername));
    }
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.managedByMe !== undefined) {
      url.searchParams.append("managedByMe", String(opts.managedByMe));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.mine !== undefined) {
      url.searchParams.append("mine", String(opts.mine));
    }
    if (opts.mySubscribers !== undefined) {
      url.searchParams.append("mySubscribers", String(opts.mySubscribers));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeChannelListResponse(data);
  }

  /**
   * Updates an existing resource.
   *
   */
  async channelsUpdate(req: Channel, opts: ChannelsUpdateOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/channels`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Deletes a resource.
   *
   */
  async commentsDelete(opts: CommentsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/comments`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async commentsInsert(req: Comment, opts: CommentsInsertOptions = {}): Promise<Comment> {
    req = serializeComment(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/comments`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeComment(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async commentsList(opts: CommentsListOptions = {}): Promise<CommentListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/comments`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parentId !== undefined) {
      url.searchParams.append("parentId", String(opts.parentId));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.textFormat !== undefined) {
      url.searchParams.append("textFormat", String(opts.textFormat));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCommentListResponse(data);
  }

  /**
   * Expresses the caller's opinion that one or more comments should be flagged
   * as spam.
   *
   */
  async commentsMarkAsSpam(opts: CommentsMarkAsSpamOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/comments/markAsSpam`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Sets the moderation status of one or more comments.
   *
   */
  async commentsSetModerationStatus(opts: CommentsSetModerationStatusOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/comments/setModerationStatus`);
    if (opts.banAuthor !== undefined) {
      url.searchParams.append("banAuthor", String(opts.banAuthor));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.moderationStatus !== undefined) {
      url.searchParams.append("moderationStatus", String(opts.moderationStatus));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Updates an existing resource.
   *
   */
  async commentsUpdate(req: Comment, opts: CommentsUpdateOptions = {}): Promise<Comment> {
    req = serializeComment(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/comments`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeComment(data);
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async commentThreadsInsert(req: CommentThread, opts: CommentThreadsInsertOptions = {}): Promise<CommentThread> {
    req = serializeCommentThread(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/commentThreads`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCommentThread(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async commentThreadsList(opts: CommentThreadsListOptions = {}): Promise<CommentThreadListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/commentThreads`);
    if (opts.allThreadsRelatedToChannelId !== undefined) {
      url.searchParams.append("allThreadsRelatedToChannelId", String(opts.allThreadsRelatedToChannelId));
    }
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.moderationStatus !== undefined) {
      url.searchParams.append("moderationStatus", String(opts.moderationStatus));
    }
    if (opts.order !== undefined) {
      url.searchParams.append("order", String(opts.order));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.searchTerms !== undefined) {
      url.searchParams.append("searchTerms", String(opts.searchTerms));
    }
    if (opts.textFormat !== undefined) {
      url.searchParams.append("textFormat", String(opts.textFormat));
    }
    if (opts.videoId !== undefined) {
      url.searchParams.append("videoId", String(opts.videoId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCommentThreadListResponse(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async i18nLanguagesList(opts: I18nLanguagesListOptions = {}): Promise<I18nLanguageListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/i18nLanguages`);
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as I18nLanguageListResponse;
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async i18nRegionsList(opts: I18nRegionsListOptions = {}): Promise<I18nRegionListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/i18nRegions`);
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as I18nRegionListResponse;
  }

  /**
   * Bind a broadcast to a stream.
   *
   */
  async liveBroadcastsBind(opts: LiveBroadcastsBindOptions = {}): Promise<LiveBroadcast> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveBroadcasts/bind`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.streamId !== undefined) {
      url.searchParams.append("streamId", String(opts.streamId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeLiveBroadcast(data);
  }

  /**
   * Delete a given broadcast.
   *
   */
  async liveBroadcastsDelete(opts: LiveBroadcastsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveBroadcasts`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new stream for the authenticated user.
   *
   */
  async liveBroadcastsInsert(req: LiveBroadcast, opts: LiveBroadcastsInsertOptions = {}): Promise<LiveBroadcast> {
    req = serializeLiveBroadcast(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/liveBroadcasts`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLiveBroadcast(data);
  }

  /**
   * Insert cuepoints in a broadcast
   *
   */
  async liveBroadcastsInsertCuepoint(req: Cuepoint, opts: LiveBroadcastsInsertCuepointOptions = {}): Promise<Cuepoint> {
    req = serializeCuepoint(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/liveBroadcasts/cuepoint`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCuepoint(data);
  }

  /**
   * Retrieve the list of broadcasts associated with the given channel.
   *
   */
  async liveBroadcastsList(opts: LiveBroadcastsListOptions = {}): Promise<LiveBroadcastListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveBroadcasts`);
    if (opts.broadcastStatus !== undefined) {
      url.searchParams.append("broadcastStatus", String(opts.broadcastStatus));
    }
    if (opts.broadcastType !== undefined) {
      url.searchParams.append("broadcastType", String(opts.broadcastType));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.mine !== undefined) {
      url.searchParams.append("mine", String(opts.mine));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLiveBroadcastListResponse(data);
  }

  /**
   * Transition a broadcast to a given status.
   *
   */
  async liveBroadcastsTransition(opts: LiveBroadcastsTransitionOptions = {}): Promise<LiveBroadcast> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveBroadcasts/transition`);
    if (opts.broadcastStatus !== undefined) {
      url.searchParams.append("broadcastStatus", String(opts.broadcastStatus));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeLiveBroadcast(data);
  }

  /**
   * Updates an existing broadcast for the authenticated user.
   *
   */
  async liveBroadcastsUpdate(req: LiveBroadcast, opts: LiveBroadcastsUpdateOptions = {}): Promise<LiveBroadcast> {
    req = serializeLiveBroadcast(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/liveBroadcasts`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeLiveBroadcast(data);
  }

  /**
   * Deletes a chat ban.
   *
   */
  async liveChatBansDelete(opts: LiveChatBansDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/bans`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async liveChatBansInsert(req: LiveChatBan, opts: LiveChatBansInsertOptions = {}): Promise<LiveChatBan> {
    req = serializeLiveChatBan(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/bans`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLiveChatBan(data);
  }

  /**
   * Deletes a chat message.
   *
   */
  async liveChatMessagesDelete(opts: LiveChatMessagesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/messages`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async liveChatMessagesInsert(req: LiveChatMessage, opts: LiveChatMessagesInsertOptions = {}): Promise<LiveChatMessage> {
    req = serializeLiveChatMessage(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/messages`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLiveChatMessage(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async liveChatMessagesList(opts: LiveChatMessagesListOptions = {}): Promise<LiveChatMessageListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/messages`);
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.liveChatId !== undefined) {
      url.searchParams.append("liveChatId", String(opts.liveChatId));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.profileImageSize !== undefined) {
      url.searchParams.append("profileImageSize", String(opts.profileImageSize));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLiveChatMessageListResponse(data);
  }

  /**
   * Deletes a chat moderator.
   *
   */
  async liveChatModeratorsDelete(opts: LiveChatModeratorsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/moderators`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async liveChatModeratorsInsert(req: LiveChatModerator, opts: LiveChatModeratorsInsertOptions = {}): Promise<LiveChatModerator> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/moderators`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LiveChatModerator;
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async liveChatModeratorsList(opts: LiveChatModeratorsListOptions = {}): Promise<LiveChatModeratorListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveChat/moderators`);
    if (opts.liveChatId !== undefined) {
      url.searchParams.append("liveChatId", String(opts.liveChatId));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LiveChatModeratorListResponse;
  }

  /**
   * Deletes an existing stream for the authenticated user.
   *
   */
  async liveStreamsDelete(opts: LiveStreamsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveStreams`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new stream for the authenticated user.
   *
   */
  async liveStreamsInsert(req: LiveStream, opts: LiveStreamsInsertOptions = {}): Promise<LiveStream> {
    req = serializeLiveStream(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/liveStreams`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLiveStream(data);
  }

  /**
   * Retrieve the list of streams associated with the given channel. --
   *
   */
  async liveStreamsList(opts: LiveStreamsListOptions = {}): Promise<LiveStreamListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/liveStreams`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.mine !== undefined) {
      url.searchParams.append("mine", String(opts.mine));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLiveStreamListResponse(data);
  }

  /**
   * Updates an existing stream for the authenticated user.
   *
   */
  async liveStreamsUpdate(req: LiveStream, opts: LiveStreamsUpdateOptions = {}): Promise<LiveStream> {
    req = serializeLiveStream(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/liveStreams`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeLiveStream(data);
  }

  /**
   * Retrieves a list of all pricing levels offered by a creator to the fans.
   *
   */
  async membershipsLevelsList(opts: MembershipsLevelsListOptions = {}): Promise<MembershipsLevelListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/membershipsLevels`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MembershipsLevelListResponse;
  }

  /**
   * Retrieves a list of members that match the request criteria for a channel.
   *
   */
  async membersList(opts: MembersListOptions = {}): Promise<MemberListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/members`);
    if (opts.filterByMemberChannelId !== undefined) {
      url.searchParams.append("filterByMemberChannelId", String(opts.filterByMemberChannelId));
    }
    if (opts.hasAccessToLevel !== undefined) {
      url.searchParams.append("hasAccessToLevel", String(opts.hasAccessToLevel));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.mode !== undefined) {
      url.searchParams.append("mode", String(opts.mode));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MemberListResponse;
  }

  /**
   * Deletes a resource.
   *
   */
  async playlistItemsDelete(opts: PlaylistItemsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/playlistItems`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async playlistItemsInsert(req: PlaylistItem, opts: PlaylistItemsInsertOptions = {}): Promise<PlaylistItem> {
    req = serializePlaylistItem(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/playlistItems`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePlaylistItem(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async playlistItemsList(opts: PlaylistItemsListOptions = {}): Promise<PlaylistItemListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/playlistItems`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.playlistId !== undefined) {
      url.searchParams.append("playlistId", String(opts.playlistId));
    }
    if (opts.videoId !== undefined) {
      url.searchParams.append("videoId", String(opts.videoId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlaylistItemListResponse(data);
  }

  /**
   * Updates an existing resource.
   *
   */
  async playlistItemsUpdate(req: PlaylistItem, opts: PlaylistItemsUpdateOptions = {}): Promise<PlaylistItem> {
    req = serializePlaylistItem(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/playlistItems`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePlaylistItem(data);
  }

  /**
   * Deletes a resource.
   *
   */
  async playlistsDelete(opts: PlaylistsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/playlists`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async playlistsInsert(req: Playlist, opts: PlaylistsInsertOptions = {}): Promise<Playlist> {
    req = serializePlaylist(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/playlists`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePlaylist(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async playlistsList(opts: PlaylistsListOptions = {}): Promise<PlaylistListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/playlists`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.mine !== undefined) {
      url.searchParams.append("mine", String(opts.mine));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlaylistListResponse(data);
  }

  /**
   * Updates an existing resource.
   *
   */
  async playlistsUpdate(req: Playlist, opts: PlaylistsUpdateOptions = {}): Promise<Playlist> {
    req = serializePlaylist(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/playlists`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePlaylist(data);
  }

  /**
   * Retrieves a list of search resources
   *
   */
  async searchList(opts: SearchListOptions = {}): Promise<SearchListResponse> {
    opts = serializeSearchListOptions(opts);
    const url = new URL(`${this.#baseUrl}youtube/v3/search`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.channelType !== undefined) {
      url.searchParams.append("channelType", String(opts.channelType));
    }
    if (opts.eventType !== undefined) {
      url.searchParams.append("eventType", String(opts.eventType));
    }
    if (opts.forContentOwner !== undefined) {
      url.searchParams.append("forContentOwner", String(opts.forContentOwner));
    }
    if (opts.forDeveloper !== undefined) {
      url.searchParams.append("forDeveloper", String(opts.forDeveloper));
    }
    if (opts.forMine !== undefined) {
      url.searchParams.append("forMine", String(opts.forMine));
    }
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.locationRadius !== undefined) {
      url.searchParams.append("locationRadius", String(opts.locationRadius));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.order !== undefined) {
      url.searchParams.append("order", String(opts.order));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.publishedAfter !== undefined) {
      url.searchParams.append("publishedAfter", String(opts.publishedAfter));
    }
    if (opts.publishedBefore !== undefined) {
      url.searchParams.append("publishedBefore", String(opts.publishedBefore));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.regionCode !== undefined) {
      url.searchParams.append("regionCode", String(opts.regionCode));
    }
    if (opts.relatedToVideoId !== undefined) {
      url.searchParams.append("relatedToVideoId", String(opts.relatedToVideoId));
    }
    if (opts.relevanceLanguage !== undefined) {
      url.searchParams.append("relevanceLanguage", String(opts.relevanceLanguage));
    }
    if (opts.safeSearch !== undefined) {
      url.searchParams.append("safeSearch", String(opts.safeSearch));
    }
    if (opts.topicId !== undefined) {
      url.searchParams.append("topicId", String(opts.topicId));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    if (opts.videoCaption !== undefined) {
      url.searchParams.append("videoCaption", String(opts.videoCaption));
    }
    if (opts.videoCategoryId !== undefined) {
      url.searchParams.append("videoCategoryId", String(opts.videoCategoryId));
    }
    if (opts.videoDefinition !== undefined) {
      url.searchParams.append("videoDefinition", String(opts.videoDefinition));
    }
    if (opts.videoDimension !== undefined) {
      url.searchParams.append("videoDimension", String(opts.videoDimension));
    }
    if (opts.videoDuration !== undefined) {
      url.searchParams.append("videoDuration", String(opts.videoDuration));
    }
    if (opts.videoEmbeddable !== undefined) {
      url.searchParams.append("videoEmbeddable", String(opts.videoEmbeddable));
    }
    if (opts.videoLicense !== undefined) {
      url.searchParams.append("videoLicense", String(opts.videoLicense));
    }
    if (opts.videoSyndicated !== undefined) {
      url.searchParams.append("videoSyndicated", String(opts.videoSyndicated));
    }
    if (opts.videoType !== undefined) {
      url.searchParams.append("videoType", String(opts.videoType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSearchListResponse(data);
  }

  /**
   * Deletes a resource.
   *
   */
  async subscriptionsDelete(opts: SubscriptionsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/subscriptions`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async subscriptionsInsert(req: Subscription, opts: SubscriptionsInsertOptions = {}): Promise<Subscription> {
    req = serializeSubscription(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/subscriptions`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async subscriptionsList(opts: SubscriptionsListOptions = {}): Promise<SubscriptionListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/subscriptions`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.forChannelId !== undefined) {
      url.searchParams.append("forChannelId", String(opts.forChannelId));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.mine !== undefined) {
      url.searchParams.append("mine", String(opts.mine));
    }
    if (opts.myRecentSubscribers !== undefined) {
      url.searchParams.append("myRecentSubscribers", String(opts.myRecentSubscribers));
    }
    if (opts.mySubscribers !== undefined) {
      url.searchParams.append("mySubscribers", String(opts.mySubscribers));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.order !== undefined) {
      url.searchParams.append("order", String(opts.order));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubscriptionListResponse(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async superChatEventsList(opts: SuperChatEventsListOptions = {}): Promise<SuperChatEventListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/superChatEvents`);
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSuperChatEventListResponse(data);
  }

  /**
   * POST method.
   *
   */
  async testsInsert(req: TestItem, opts: TestsInsertOptions = {}): Promise<TestItem> {
    req = serializeTestItem(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/tests`);
    if (opts.externalChannelId !== undefined) {
      url.searchParams.append("externalChannelId", String(opts.externalChannelId));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTestItem(data);
  }

  /**
   * Deletes a resource.
   *
   */
  async thirdPartyLinksDelete(opts: ThirdPartyLinksDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/thirdPartyLinks`);
    if (opts.externalChannelId !== undefined) {
      url.searchParams.append("externalChannelId", String(opts.externalChannelId));
    }
    if (opts.linkingToken !== undefined) {
      url.searchParams.append("linkingToken", String(opts.linkingToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async thirdPartyLinksInsert(req: ThirdPartyLink, opts: ThirdPartyLinksInsertOptions = {}): Promise<ThirdPartyLink> {
    req = serializeThirdPartyLink(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/thirdPartyLinks`);
    if (opts.externalChannelId !== undefined) {
      url.searchParams.append("externalChannelId", String(opts.externalChannelId));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeThirdPartyLink(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async thirdPartyLinksList(opts: ThirdPartyLinksListOptions = {}): Promise<ThirdPartyLinkListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/thirdPartyLinks`);
    if (opts.externalChannelId !== undefined) {
      url.searchParams.append("externalChannelId", String(opts.externalChannelId));
    }
    if (opts.linkingToken !== undefined) {
      url.searchParams.append("linkingToken", String(opts.linkingToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeThirdPartyLinkListResponse(data);
  }

  /**
   * Updates an existing resource.
   *
   */
  async thirdPartyLinksUpdate(req: ThirdPartyLink, opts: ThirdPartyLinksUpdateOptions = {}): Promise<ThirdPartyLink> {
    req = serializeThirdPartyLink(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/thirdPartyLinks`);
    if (opts.externalChannelId !== undefined) {
      url.searchParams.append("externalChannelId", String(opts.externalChannelId));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeThirdPartyLink(data);
  }

  /**
   * As this is not an insert in a strict sense (it supports uploading/setting
   * of a thumbnail for multiple videos, which doesn't result in creation of a
   * single resource), I use a custom verb here.
   *
   */
  async thumbnailsSet(opts: ThumbnailsSetOptions = {}): Promise<ThumbnailSetResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/thumbnails/set`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.videoId !== undefined) {
      url.searchParams.append("videoId", String(opts.videoId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as ThumbnailSetResponse;
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async videoAbuseReportReasonsList(opts: VideoAbuseReportReasonsListOptions = {}): Promise<VideoAbuseReportReasonListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/videoAbuseReportReasons`);
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VideoAbuseReportReasonListResponse;
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async videoCategoriesList(opts: VideoCategoriesListOptions = {}): Promise<VideoCategoryListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/videoCategories`);
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.regionCode !== undefined) {
      url.searchParams.append("regionCode", String(opts.regionCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VideoCategoryListResponse;
  }

  /**
   * Deletes a resource.
   *
   */
  async videosDelete(opts: VideosDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/videos`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves the ratings that the authorized user gave to a list of specified
   * videos.
   *
   */
  async videosGetRating(opts: VideosGetRatingOptions = {}): Promise<VideoGetRatingResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/videos/getRating`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VideoGetRatingResponse;
  }

  /**
   * Inserts a new resource into this collection.
   *
   */
  async videosInsert(req: Video, opts: VideosInsertOptions = {}): Promise<Video> {
    req = serializeVideo(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/videos`);
    if (opts.autoLevels !== undefined) {
      url.searchParams.append("autoLevels", String(opts.autoLevels));
    }
    if (opts.notifySubscribers !== undefined) {
      url.searchParams.append("notifySubscribers", String(opts.notifySubscribers));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.onBehalfOfContentOwnerChannel !== undefined) {
      url.searchParams.append("onBehalfOfContentOwnerChannel", String(opts.onBehalfOfContentOwnerChannel));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.stabilize !== undefined) {
      url.searchParams.append("stabilize", String(opts.stabilize));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVideo(data);
  }

  /**
   * Retrieves a list of resources, possibly filtered.
   *
   */
  async videosList(opts: VideosListOptions = {}): Promise<VideoListResponse> {
    const url = new URL(`${this.#baseUrl}youtube/v3/videos`);
    if (opts.chart !== undefined) {
      url.searchParams.append("chart", String(opts.chart));
    }
    if (opts.hl !== undefined) {
      url.searchParams.append("hl", String(opts.hl));
    }
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxHeight !== undefined) {
      url.searchParams.append("maxHeight", String(opts.maxHeight));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.maxWidth !== undefined) {
      url.searchParams.append("maxWidth", String(opts.maxWidth));
    }
    if (opts.myRating !== undefined) {
      url.searchParams.append("myRating", String(opts.myRating));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    if (opts.regionCode !== undefined) {
      url.searchParams.append("regionCode", String(opts.regionCode));
    }
    if (opts.videoCategoryId !== undefined) {
      url.searchParams.append("videoCategoryId", String(opts.videoCategoryId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVideoListResponse(data);
  }

  /**
   * Adds a like or dislike rating to a video or removes a rating from a video.
   *
   */
  async videosRate(opts: VideosRateOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/videos/rate`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.rating !== undefined) {
      url.searchParams.append("rating", String(opts.rating));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Report abuse for a video.
   *
   */
  async videosReportAbuse(req: VideoAbuseReport, opts: VideosReportAbuseOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/videos/reportAbuse`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Updates an existing resource.
   *
   */
  async videosUpdate(req: Video, opts: VideosUpdateOptions = {}): Promise<Video> {
    req = serializeVideo(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/videos`);
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeVideo(data);
  }

  /**
   * Allows upload of watermark image and setting it for a channel.
   *
   */
  async watermarksSet(req: InvideoBranding, opts: WatermarksSetOptions = {}): Promise<void> {
    req = serializeInvideoBranding(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/watermarks/set`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Allows removal of channel watermark.
   *
   */
  async watermarksUnset(opts: WatermarksUnsetOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}youtube/v3/watermarks/unset`);
    if (opts.channelId !== undefined) {
      url.searchParams.append("channelId", String(opts.channelId));
    }
    if (opts.onBehalfOfContentOwner !== undefined) {
      url.searchParams.append("onBehalfOfContentOwner", String(opts.onBehalfOfContentOwner));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Updates an existing resource.
   *
   */
  async youtubeV3UpdateCommentThreads(req: CommentThread, opts: YoutubeV3UpdateCommentThreadsOptions = {}): Promise<CommentThread> {
    req = serializeCommentThread(req);
    const url = new URL(`${this.#baseUrl}youtube/v3/commentThreads`);
    if (opts.part !== undefined) {
      url.searchParams.append("part", String(opts.part));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCommentThread(data);
  }
}

export interface AbuseReport {
  abuseTypes?: AbuseType[];
  description?: string;
  relatedEntities?: RelatedEntity[];
  subject?: Entity;
}

/**
 * Additional options for YouTube#abuseReportsInsert.
 */
export interface AbuseReportsInsertOptions {
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include.
   */
  part: string;
}

export interface AbuseType {
  id?: string;
}

/**
 * Rights management policy for YouTube resources.
 */
export interface AccessPolicy {
  /**
   * The value of allowed indicates whether the access to the policy is allowed
   * or denied by default.
   */
  allowed?: boolean;
  /**
   * A list of region codes that identify countries where the default policy do
   * not apply.
   */
  exception?: string[];
}

/**
 * Additional options for YouTube#activitiesList.
 */
export interface ActivitiesListOptions {
  channelId?: string;
  home?: boolean;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  mine?: boolean;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * activity resource properties that the API response will include. If the
   * parameter identifies a property that contains child properties, the child
   * properties will be included in the response. For example, in an activity
   * resource, the snippet property contains other properties that identify the
   * type of activity, a display title for the activity, and so forth. If you
   * set *part=snippet*, the API response will also contain all of those nested
   * properties.
   */
  part: string;
  publishedAfter?: Date;
  publishedBefore?: Date;
  regionCode?: string;
}

function serializeActivitiesListOptions(data: any): ActivitiesListOptions {
  return {
    ...data,
    publishedAfter: data["publishedAfter"] !== undefined ? data["publishedAfter"].toISOString() : undefined,
    publishedBefore: data["publishedBefore"] !== undefined ? data["publishedBefore"].toISOString() : undefined,
  };
}

function deserializeActivitiesListOptions(data: any): ActivitiesListOptions {
  return {
    ...data,
    publishedAfter: data["publishedAfter"] !== undefined ? new Date(data["publishedAfter"]) : undefined,
    publishedBefore: data["publishedBefore"] !== undefined ? new Date(data["publishedBefore"]) : undefined,
  };
}

/**
 * An *activity* resource contains information about an action that a
 * particular channel, or user, has taken on YouTube.The actions reported in
 * activity feeds include rating a video, sharing a video, marking a video as a
 * favorite, commenting on a video, uploading a video, and so forth. Each
 * activity resource identifies the type of action, the channel associated with
 * the action, and the resource(s) associated with the action, such as the video
 * that was rated or uploaded.
 */
export interface Activity {
  /**
   * The contentDetails object contains information about the content
   * associated with the activity. For example, if the snippet.type value is
   * videoRated, then the contentDetails object's content identifies the rated
   * video.
   */
  contentDetails?: ActivityContentDetails;
  /**
   * Etag of this resource
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the activity.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#activity".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the activity, including
   * the activity's type and group ID.
   */
  snippet?: ActivitySnippet;
}

function serializeActivity(data: any): Activity {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeActivitySnippet(data["snippet"]) : undefined,
  };
}

function deserializeActivity(data: any): Activity {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeActivitySnippet(data["snippet"]) : undefined,
  };
}

/**
 * Details about the content of an activity: the video that was shared, the
 * channel that was subscribed to, etc.
 */
export interface ActivityContentDetails {
  /**
   * The bulletin object contains details about a channel bulletin post. This
   * object is only present if the snippet.type is bulletin.
   */
  bulletin?: ActivityContentDetailsBulletin;
  /**
   * The channelItem object contains details about a resource which was added
   * to a channel. This property is only present if the snippet.type is
   * channelItem.
   */
  channelItem?: ActivityContentDetailsChannelItem;
  /**
   * The comment object contains information about a resource that received a
   * comment. This property is only present if the snippet.type is comment.
   */
  comment?: ActivityContentDetailsComment;
  /**
   * The favorite object contains information about a video that was marked as
   * a favorite video. This property is only present if the snippet.type is
   * favorite.
   */
  favorite?: ActivityContentDetailsFavorite;
  /**
   * The like object contains information about a resource that received a
   * positive (like) rating. This property is only present if the snippet.type
   * is like.
   */
  like?: ActivityContentDetailsLike;
  /**
   * The playlistItem object contains information about a new playlist item.
   * This property is only present if the snippet.type is playlistItem.
   */
  playlistItem?: ActivityContentDetailsPlaylistItem;
  /**
   * The promotedItem object contains details about a resource which is being
   * promoted. This property is only present if the snippet.type is
   * promotedItem.
   */
  promotedItem?: ActivityContentDetailsPromotedItem;
  /**
   * The recommendation object contains information about a recommended
   * resource. This property is only present if the snippet.type is
   * recommendation.
   */
  recommendation?: ActivityContentDetailsRecommendation;
  /**
   * The social object contains details about a social network post. This
   * property is only present if the snippet.type is social.
   */
  social?: ActivityContentDetailsSocial;
  /**
   * The subscription object contains information about a channel that a user
   * subscribed to. This property is only present if the snippet.type is
   * subscription.
   */
  subscription?: ActivityContentDetailsSubscription;
  /**
   * The upload object contains information about the uploaded video. This
   * property is only present if the snippet.type is upload.
   */
  upload?: ActivityContentDetailsUpload;
}

/**
 * Details about a channel bulletin post.
 */
export interface ActivityContentDetailsBulletin {
  /**
   * The resourceId object contains information that identifies the resource
   * associated with a bulletin post. @mutable youtube.activities.insert
   */
  resourceId?: ResourceId;
}

/**
 * Details about a resource which was added to a channel.
 */
export interface ActivityContentDetailsChannelItem {
  /**
   * The resourceId object contains information that identifies the resource
   * that was added to the channel.
   */
  resourceId?: ResourceId;
}

/**
 * Information about a resource that received a comment.
 */
export interface ActivityContentDetailsComment {
  /**
   * The resourceId object contains information that identifies the resource
   * associated with the comment.
   */
  resourceId?: ResourceId;
}

/**
 * Information about a video that was marked as a favorite video.
 */
export interface ActivityContentDetailsFavorite {
  /**
   * The resourceId object contains information that identifies the resource
   * that was marked as a favorite.
   */
  resourceId?: ResourceId;
}

/**
 * Information about a resource that received a positive (like) rating.
 */
export interface ActivityContentDetailsLike {
  /**
   * The resourceId object contains information that identifies the rated
   * resource.
   */
  resourceId?: ResourceId;
}

/**
 * Information about a new playlist item.
 */
export interface ActivityContentDetailsPlaylistItem {
  /**
   * The value that YouTube uses to uniquely identify the playlist.
   */
  playlistId?: string;
  /**
   * ID of the item within the playlist.
   */
  playlistItemId?: string;
  /**
   * The resourceId object contains information about the resource that was
   * added to the playlist.
   */
  resourceId?: ResourceId;
}

/**
 * Details about a resource which is being promoted.
 */
export interface ActivityContentDetailsPromotedItem {
  /**
   * The URL the client should fetch to request a promoted item.
   */
  adTag?: string;
  /**
   * The URL the client should ping to indicate that the user clicked through
   * on this promoted item.
   */
  clickTrackingUrl?: string;
  /**
   * The URL the client should ping to indicate that the user was shown this
   * promoted item.
   */
  creativeViewUrl?: string;
  /**
   * The type of call-to-action, a message to the user indicating action that
   * can be taken.
   */
  ctaType?:  | "ctaTypeUnspecified" | "visitAdvertiserSite";
  /**
   * The custom call-to-action button text. If specified, it will override the
   * default button text for the cta_type.
   */
  customCtaButtonText?: string;
  /**
   * The text description to accompany the promoted item.
   */
  descriptionText?: string;
  /**
   * The URL the client should direct the user to, if the user chooses to visit
   * the advertiser's website.
   */
  destinationUrl?: string;
  /**
   * The list of forecasting URLs. The client should ping all of these URLs
   * when a promoted item is not available, to indicate that a promoted item
   * could have been shown.
   */
  forecastingUrl?: string[];
  /**
   * The list of impression URLs. The client should ping all of these URLs to
   * indicate that the user was shown this promoted item.
   */
  impressionUrl?: string[];
  /**
   * The ID that YouTube uses to uniquely identify the promoted video.
   */
  videoId?: string;
}

/**
 * Information that identifies the recommended resource.
 */
export interface ActivityContentDetailsRecommendation {
  /**
   * The reason that the resource is recommended to the user.
   */
  reason?:  | "reasonUnspecified" | "videoFavorited" | "videoLiked" | "videoWatched";
  /**
   * The resourceId object contains information that identifies the recommended
   * resource.
   */
  resourceId?: ResourceId;
  /**
   * The seedResourceId object contains information about the resource that
   * caused the recommendation.
   */
  seedResourceId?: ResourceId;
}

/**
 * Details about a social network post.
 */
export interface ActivityContentDetailsSocial {
  /**
   * The author of the social network post.
   */
  author?: string;
  /**
   * An image of the post's author.
   */
  imageUrl?: string;
  /**
   * The URL of the social network post.
   */
  referenceUrl?: string;
  /**
   * The resourceId object encapsulates information that identifies the
   * resource associated with a social network post.
   */
  resourceId?: ResourceId;
  /**
   * The name of the social network.
   */
  type?:  | "unspecified" | "googlePlus" | "facebook" | "twitter";
}

/**
 * Information about a channel that a user subscribed to.
 */
export interface ActivityContentDetailsSubscription {
  /**
   * The resourceId object contains information that identifies the resource
   * that the user subscribed to.
   */
  resourceId?: ResourceId;
}

/**
 * Information about the uploaded video.
 */
export interface ActivityContentDetailsUpload {
  /**
   * The ID that YouTube uses to uniquely identify the uploaded video.
   */
  videoId?: string;
}

export interface ActivityListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  items?: Activity[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#activityListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeActivityListResponse(data: any): ActivityListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeActivity(item))) : undefined,
  };
}

function deserializeActivityListResponse(data: any): ActivityListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeActivity(item))) : undefined,
  };
}

/**
 * Basic details about an activity, including title, description, thumbnails,
 * activity type and group. Next ID: 12
 */
export interface ActivitySnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel associated with
   * the activity.
   */
  channelId?: string;
  /**
   * Channel title for the channel responsible for this activity
   */
  channelTitle?: string;
  /**
   * The description of the resource primarily associated with the activity.
   * @mutable youtube.activities.insert
   */
  description?: string;
  /**
   * The group ID associated with the activity. A group ID identifies user
   * events that are associated with the same user and resource. For example, if
   * a user rates a video and marks the same video as a favorite, the entries
   * for those events would have the same group ID in the user's activity feed.
   * In your user interface, you can avoid repetition by grouping events with
   * the same groupId value.
   */
  groupId?: string;
  /**
   * The date and time that the video was uploaded.
   */
  publishedAt?: Date;
  /**
   * A map of thumbnail images associated with the resource that is primarily
   * associated with the activity. For each object in the map, the key is the
   * name of the thumbnail image, and the value is an object that contains other
   * information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The title of the resource primarily associated with the activity.
   */
  title?: string;
  /**
   * The type of activity that the resource describes.
   */
  type?:  | "typeUnspecified" | "upload" | "like" | "favorite" | "comment" | "subscription" | "playlistItem" | "recommendation" | "bulletin" | "social" | "channelItem" | "promotedItem";
}

function serializeActivitySnippet(data: any): ActivitySnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializeActivitySnippet(data: any): ActivitySnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

/**
 * A *caption* resource represents a YouTube caption track. A caption track is
 * associated with exactly one YouTube video.
 */
export interface Caption {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the caption track.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#caption".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the caption.
   */
  snippet?: CaptionSnippet;
}

function serializeCaption(data: any): Caption {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeCaptionSnippet(data["snippet"]) : undefined,
  };
}

function deserializeCaption(data: any): Caption {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeCaptionSnippet(data["snippet"]) : undefined,
  };
}

export interface CaptionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of captions that match the request criteria.
   */
  items?: Caption[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#captionListResponse".
   */
  kind?: string;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeCaptionListResponse(data: any): CaptionListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeCaption(item))) : undefined,
  };
}

function deserializeCaptionListResponse(data: any): CaptionListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeCaption(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#captionsDelete.
 */
export interface CaptionsDeleteOptions {
  id: string;
  /**
   * ID of the Google+ Page for the channel that the request is be on behalf of
   */
  onBehalfOf?: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#captionsDownload.
 */
export interface CaptionsDownloadOptions {
  /**
   * ID of the Google+ Page for the channel that the request is be on behalf of
   */
  onBehalfOf?: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * Convert the captions into this format. Supported options are sbv, srt, and
   * vtt.
   */
  tfmt?: string;
  /**
   * tlang is the language code; machine translate the captions into this
   * language.
   */
  tlang?: string;
}

/**
 * Additional options for YouTube#captionsInsert.
 */
export interface CaptionsInsertOptions {
  /**
   * ID of the Google+ Page for the channel that the request is be on behalf of
   */
  onBehalfOf?: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter specifies the caption resource parts that the API
   * response will include. Set the parameter value to snippet.
   */
  part: string;
  /**
   * Extra parameter to allow automatically syncing the uploaded
   * caption/transcript with the audio.
   */
  sync?: boolean;
}

/**
 * Additional options for YouTube#captionsList.
 */
export interface CaptionsListOptions {
  /**
   * Returns the captions with the given IDs for Stubby or Apiary.
   */
  id?: string;
  /**
   * ID of the Google+ Page for the channel that the request is on behalf of.
   */
  onBehalfOf?: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * caption resource parts that the API response will include. The part names
   * that you can include in the parameter value are id and snippet.
   */
  part: string;
  /**
   * Returns the captions for the specified video.
   */
  videoId: string;
}

/**
 * Basic details about a caption track, such as its language and name.
 */
export interface CaptionSnippet {
  /**
   * The type of audio track associated with the caption track.
   */
  audioTrackType?:  | "unknown" | "primary" | "commentary" | "descriptive";
  /**
   * The reason that YouTube failed to process the caption track. This property
   * is only present if the state property's value is failed.
   */
  failureReason?:  | "unknownFormat" | "unsupportedFormat" | "processingFailed";
  /**
   * Indicates whether YouTube synchronized the caption track to the audio
   * track in the video. The value will be true if a sync was explicitly
   * requested when the caption track was uploaded. For example, when calling
   * the captions.insert or captions.update methods, you can set the sync
   * parameter to true to instruct YouTube to sync the uploaded track to the
   * video. If the value is false, YouTube uses the time codes in the uploaded
   * caption track to determine when to display captions.
   */
  isAutoSynced?: boolean;
  /**
   * Indicates whether the track contains closed captions for the deaf and hard
   * of hearing. The default value is false.
   */
  isCC?: boolean;
  /**
   * Indicates whether the caption track is a draft. If the value is true, then
   * the track is not publicly visible. The default value is false. @mutable
   * youtube.captions.insert youtube.captions.update
   */
  isDraft?: boolean;
  /**
   * Indicates whether caption track is formatted for "easy reader," meaning it
   * is at a third-grade level for language learners. The default value is
   * false.
   */
  isEasyReader?: boolean;
  /**
   * Indicates whether the caption track uses large text for the
   * vision-impaired. The default value is false.
   */
  isLarge?: boolean;
  /**
   * The language of the caption track. The property value is a BCP-47 language
   * tag.
   */
  language?: string;
  /**
   * The date and time when the caption track was last updated.
   */
  lastUpdated?: Date;
  /**
   * The name of the caption track. The name is intended to be visible to the
   * user as an option during playback.
   */
  name?: string;
  /**
   * The caption track's status.
   */
  status?:  | "serving" | "syncing" | "failed";
  /**
   * The caption track's type.
   */
  trackKind?:  | "standard" | "ASR" | "forced";
  /**
   * The ID that YouTube uses to uniquely identify the video associated with
   * the caption track. @mutable youtube.captions.insert
   */
  videoId?: string;
}

function serializeCaptionSnippet(data: any): CaptionSnippet {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeCaptionSnippet(data: any): CaptionSnippet {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

/**
 * Additional options for YouTube#captionsUpdate.
 */
export interface CaptionsUpdateOptions {
  /**
   * ID of the Google+ Page for the channel that the request is on behalf of.
   */
  onBehalfOf?: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * caption resource parts that the API response will include. The part names
   * that you can include in the parameter value are id and snippet.
   */
  part: string;
  /**
   * Extra parameter to allow automatically syncing the uploaded
   * caption/transcript with the audio.
   */
  sync?: boolean;
}

/**
 * Brief description of the live stream cdn settings.
 */
export interface CdnSettings {
  /**
   * The format of the video stream that you are sending to Youtube.
   */
  format?: string;
  /**
   * The frame rate of the inbound video data.
   */
  frameRate?:  | "30fps" | "60fps" | "variable";
  /**
   * The ingestionInfo object contains information that YouTube provides that
   * you need to transmit your RTMP or HTTP stream to YouTube.
   */
  ingestionInfo?: IngestionInfo;
  /**
   * The method or protocol used to transmit the video stream.
   */
  ingestionType?:  | "rtmp" | "dash" | "webrtc" | "hls";
  /**
   * The resolution of the inbound video data.
   */
  resolution?:  | "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "2160p" | "variable";
}

/**
 * A *channel* resource contains information about a YouTube channel.
 */
export interface Channel {
  /**
   * The auditionDetails object encapsulates channel data that is relevant for
   * YouTube Partners during the audition process.
   */
  auditDetails?: ChannelAuditDetails;
  /**
   * The brandingSettings object encapsulates information about the branding of
   * the channel.
   */
  brandingSettings?: ChannelBrandingSettings;
  /**
   * The contentDetails object encapsulates information about the channel's
   * content.
   */
  contentDetails?: ChannelContentDetails;
  /**
   * The contentOwnerDetails object encapsulates channel data that is relevant
   * for YouTube Partners linked with the channel.
   */
  contentOwnerDetails?: ChannelContentOwnerDetails;
  /**
   * The conversionPings object encapsulates information about conversion pings
   * that need to be respected by the channel.
   */
  conversionPings?: ChannelConversionPings;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the channel.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#channel".
   */
  kind?: string;
  /**
   * Localizations for different languages
   */
  localizations?: {
    [key: string]: ChannelLocalization
  };
  /**
   * The snippet object contains basic details about the channel, such as its
   * title, description, and thumbnail images.
   */
  snippet?: ChannelSnippet;
  /**
   * The statistics object encapsulates statistics for the channel.
   */
  statistics?: ChannelStatistics;
  /**
   * The status object encapsulates information about the privacy status of the
   * channel.
   */
  status?: ChannelStatus;
  /**
   * The topicDetails object encapsulates information about Freebase topics
   * associated with the channel.
   */
  topicDetails?: ChannelTopicDetails;
}

function serializeChannel(data: any): Channel {
  return {
    ...data,
    contentOwnerDetails: data["contentOwnerDetails"] !== undefined ? serializeChannelContentOwnerDetails(data["contentOwnerDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? serializeChannelSnippet(data["snippet"]) : undefined,
    statistics: data["statistics"] !== undefined ? serializeChannelStatistics(data["statistics"]) : undefined,
  };
}

function deserializeChannel(data: any): Channel {
  return {
    ...data,
    contentOwnerDetails: data["contentOwnerDetails"] !== undefined ? deserializeChannelContentOwnerDetails(data["contentOwnerDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? deserializeChannelSnippet(data["snippet"]) : undefined,
    statistics: data["statistics"] !== undefined ? deserializeChannelStatistics(data["statistics"]) : undefined,
  };
}

/**
 * The auditDetails object encapsulates channel data that is relevant for
 * YouTube Partners during the audit process.
 */
export interface ChannelAuditDetails {
  /**
   * Whether or not the channel respects the community guidelines.
   */
  communityGuidelinesGoodStanding?: boolean;
  /**
   * Whether or not the channel has any unresolved claims.
   */
  contentIdClaimsGoodStanding?: boolean;
  /**
   * Whether or not the channel has any copyright strikes.
   */
  copyrightStrikesGoodStanding?: boolean;
}

/**
 * A channel banner returned as the response to a channel_banner.insert call.
 */
export interface ChannelBannerResource {
  etag?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#channelBannerResource".
   */
  kind?: string;
  /**
   * The URL of this banner image.
   */
  url?: string;
}

/**
 * Additional options for YouTube#channelBannersInsert.
 */
export interface ChannelBannersInsertOptions {
  /**
   * Unused, channel_id is currently derived from the security context of the
   * requestor.
   */
  channelId?: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
}

/**
 * Branding properties of a YouTube channel.
 */
export interface ChannelBrandingSettings {
  /**
   * Branding properties for the channel view.
   */
  channel?: ChannelSettings;
  /**
   * Additional experimental branding properties.
   */
  hints?: PropertyValue[];
  /**
   * Branding properties for branding images.
   */
  image?: ImageSettings;
  /**
   * Branding properties for the watch page.
   */
  watch?: WatchSettings;
}

/**
 * Details about the content of a channel.
 */
export interface ChannelContentDetails {
  relatedPlaylists?: {
    favorites?: string;
    likes?: string;
    uploads?: string;
    watchHistory?: string;
    watchLater?: string;
  };
}

/**
 * The contentOwnerDetails object encapsulates channel data that is relevant
 * for YouTube Partners linked with the channel.
 */
export interface ChannelContentOwnerDetails {
  /**
   * The ID of the content owner linked to the channel.
   */
  contentOwner?: string;
  /**
   * The date and time when the channel was linked to the content owner.
   */
  timeLinked?: Date;
}

function serializeChannelContentOwnerDetails(data: any): ChannelContentOwnerDetails {
  return {
    ...data,
    timeLinked: data["timeLinked"] !== undefined ? data["timeLinked"].toISOString() : undefined,
  };
}

function deserializeChannelContentOwnerDetails(data: any): ChannelContentOwnerDetails {
  return {
    ...data,
    timeLinked: data["timeLinked"] !== undefined ? new Date(data["timeLinked"]) : undefined,
  };
}

/**
 * Pings that the app shall fire (authenticated by biscotti cookie). Each ping
 * has a context, in which the app must fire the ping, and a url identifying the
 * ping.
 */
export interface ChannelConversionPing {
  /**
   * Defines the context of the ping.
   */
  context?:  | "subscribe" | "unsubscribe" | "cview";
  /**
   * The url (without the schema) that the player shall send the ping to. It's
   * at caller's descretion to decide which schema to use (http vs https)
   * Example of a returned url: //googleads.g.doubleclick.net/pagead/
   * viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D
   * cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append
   * biscotti authentication (ms param in case of mobile, for example) to this
   * ping.
   */
  conversionUrl?: string;
}

/**
 * The conversionPings object encapsulates information about conversion pings
 * that need to be respected by the channel.
 */
export interface ChannelConversionPings {
  /**
   * Pings that the app shall fire (authenticated by biscotti cookie). Each
   * ping has a context, in which the app must fire the ping, and a url
   * identifying the ping.
   */
  pings?: ChannelConversionPing[];
}

export interface ChannelListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  items?: Channel[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#channelListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeChannelListResponse(data: any): ChannelListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeChannel(item))) : undefined,
  };
}

function deserializeChannelListResponse(data: any): ChannelListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeChannel(item))) : undefined,
  };
}

/**
 * Channel localization setting
 */
export interface ChannelLocalization {
  /**
   * The localized strings for channel's description.
   */
  description?: string;
  /**
   * The localized strings for channel's title.
   */
  title?: string;
}

export interface ChannelProfileDetails {
  /**
   * The YouTube channel ID.
   */
  channelId?: string;
  /**
   * The channel's URL.
   */
  channelUrl?: string;
  /**
   * The channel's display name.
   */
  displayName?: string;
  /**
   * The channels's avatar URL.
   */
  profileImageUrl?: string;
}

export interface ChannelSection {
  /**
   * The contentDetails object contains details about the channel section
   * content, such as a list of playlists or channels featured in the section.
   */
  contentDetails?: ChannelSectionContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the channel section.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#channelSection".
   */
  kind?: string;
  /**
   * Localizations for different languages
   */
  localizations?: {
    [key: string]: ChannelSectionLocalization
  };
  /**
   * The snippet object contains basic details about the channel section, such
   * as its type, style and title.
   */
  snippet?: ChannelSectionSnippet;
  /**
   * The targeting object contains basic targeting settings about the channel
   * section.
   */
  targeting?: ChannelSectionTargeting;
}

/**
 * Details about a channelsection, including playlists and channels.
 */
export interface ChannelSectionContentDetails {
  /**
   * The channel ids for type multiple_channels.
   */
  channels?: string[];
  /**
   * The playlist ids for type single_playlist and multiple_playlists. For
   * singlePlaylist, only one playlistId is allowed.
   */
  playlists?: string[];
}

export interface ChannelSectionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of ChannelSections that match the request criteria.
   */
  items?: ChannelSection[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#channelSectionListResponse".
   */
  kind?: string;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

/**
 * ChannelSection localization setting
 */
export interface ChannelSectionLocalization {
  /**
   * The localized strings for channel section's title.
   */
  title?: string;
}

/**
 * Additional options for YouTube#channelSectionsDelete.
 */
export interface ChannelSectionsDeleteOptions {
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#channelSectionsInsert.
 */
export interface ChannelSectionsInsertOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. The part names that you can include in
   * the parameter value are snippet and contentDetails.
   */
  part: string;
}

/**
 * Additional options for YouTube#channelSectionsList.
 */
export interface ChannelSectionsListOptions {
  /**
   * Return the ChannelSections owned by the specified channel ID.
   */
  channelId?: string;
  /**
   * Return content in specified language
   */
  hl?: string;
  /**
   * Return the ChannelSections with the given IDs for Stubby or Apiary.
   */
  id?: string;
  /**
   * Return the ChannelSections owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * channelSection resource properties that the API response will include. The
   * part names that you can include in the parameter value are id, snippet, and
   * contentDetails. If the parameter identifies a property that contains child
   * properties, the child properties will be included in the response. For
   * example, in a channelSection resource, the snippet property contains other
   * properties, such as a display title for the channelSection. If you set
   * *part=snippet*, the API response will also contain all of those nested
   * properties.
   */
  part: string;
}

/**
 * Basic details about a channel section, including title, style and position.
 */
export interface ChannelSectionSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel that published
   * the channel section.
   */
  channelId?: string;
  /**
   * The language of the channel section's default title and description.
   */
  defaultLanguage?: string;
  /**
   * Localized title, read-only.
   */
  localized?: ChannelSectionLocalization;
  /**
   * The position of the channel section in the channel.
   */
  position?: number;
  /**
   * The style of the channel section.
   */
  style?:  | "channelsectionStyleUnspecified" | "horizontalRow" | "verticalList";
  /**
   * The channel section's title for multiple_playlists and multiple_channels.
   */
  title?: string;
  /**
   * The type of the channel section.
   */
  type?:  | "channelsectionTypeUndefined" | "singlePlaylist" | "multiplePlaylists" | "popularUploads" | "recentUploads" | "likes" | "allPlaylists" | "likedPlaylists" | "recentPosts" | "recentActivity" | "liveEvents" | "upcomingEvents" | "completedEvents" | "multipleChannels" | "postedVideos" | "postedPlaylists" | "subscriptions";
}

/**
 * Additional options for YouTube#channelSectionsUpdate.
 */
export interface ChannelSectionsUpdateOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. The part names that you can include in
   * the parameter value are snippet and contentDetails.
   */
  part: string;
}

/**
 * ChannelSection targeting setting.
 */
export interface ChannelSectionTargeting {
  /**
   * The country the channel section is targeting.
   */
  countries?: string[];
  /**
   * The language the channel section is targeting.
   */
  languages?: string[];
  /**
   * The region the channel section is targeting.
   */
  regions?: string[];
}

/**
 * Branding properties for the channel view.
 */
export interface ChannelSettings {
  /**
   * The country of the channel.
   */
  country?: string;
  defaultLanguage?: string;
  /**
   * Which content tab users should see when viewing the channel.
   */
  defaultTab?: string;
  /**
   * Specifies the channel description.
   */
  description?: string;
  /**
   * Title for the featured channels tab.
   */
  featuredChannelsTitle?: string;
  /**
   * The list of featured channels.
   */
  featuredChannelsUrls?: string[];
  /**
   * Lists keywords associated with the channel, comma-separated.
   */
  keywords?: string;
  /**
   * Whether user-submitted comments left on the channel page need to be
   * approved by the channel owner to be publicly visible.
   */
  moderateComments?: boolean;
  /**
   * A prominent color that can be rendered on this channel page.
   */
  profileColor?: string;
  /**
   * Whether the tab to browse the videos should be displayed.
   */
  showBrowseView?: boolean;
  /**
   * Whether related channels should be proposed.
   */
  showRelatedChannels?: boolean;
  /**
   * Specifies the channel title.
   */
  title?: string;
  /**
   * The ID for a Google Analytics account to track and measure traffic to the
   * channels.
   */
  trackingAnalyticsAccountId?: string;
  /**
   * The trailer of the channel, for users that are not subscribers.
   */
  unsubscribedTrailer?: string;
}

/**
 * Additional options for YouTube#channelsList.
 */
export interface ChannelsListOptions {
  /**
   * Return the channels within the specified guide category ID.
   */
  categoryId?: string;
  /**
   * Return the channel associated with a YouTube username.
   */
  forUsername?: string;
  /**
   * Stands for "host language". Specifies the localization language of the
   * metadata to be filled into snippet.localized. The field is filled with the
   * default metadata if there is no localization in the specified language. The
   * parameter value must be a language code included in the list returned by
   * the i18nLanguages.list method (e.g. en_US, es_MX).
   */
  hl?: string;
  /**
   * Return the channels with the specified IDs.
   */
  id?: string;
  /**
   * Return the channels managed by the authenticated user.
   */
  managedByMe?: boolean;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Return the ids of channels owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * Return the channels subscribed to the authenticated user
   */
  mySubscribers?: boolean;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * channel resource properties that the API response will include. If the
   * parameter identifies a property that contains child properties, the child
   * properties will be included in the response. For example, in a channel
   * resource, the contentDetails property contains other properties, such as
   * the uploads properties. As such, if you set *part=contentDetails*, the API
   * response will also contain all of those nested properties.
   */
  part: string;
}

/**
 * Basic details about a channel, including title, description and thumbnails.
 */
export interface ChannelSnippet {
  /**
   * The country of the channel.
   */
  country?: string;
  /**
   * The custom url of the channel.
   */
  customUrl?: string;
  /**
   * The language of the channel's default title and description.
   */
  defaultLanguage?: string;
  /**
   * The description of the channel.
   */
  description?: string;
  /**
   * Localized title and description, read-only.
   */
  localized?: ChannelLocalization;
  /**
   * The date and time that the channel was created.
   */
  publishedAt?: Date;
  /**
   * A map of thumbnail images associated with the channel. For each object in
   * the map, the key is the name of the thumbnail image, and the value is an
   * object that contains other information about the thumbnail. When displaying
   * thumbnails in your application, make sure that your code uses the image
   * URLs exactly as they are returned in API responses. For example, your
   * application should not use the http domain instead of the https domain in a
   * URL returned in an API response. Beginning in July 2018, channel thumbnail
   * URLs will only be available in the https domain, which is how the URLs
   * appear in API responses. After that time, you might see broken images in
   * your application if it tries to load YouTube images from the http domain.
   * Thumbnail images might be empty for newly created channels and might take
   * up to one day to populate.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The channel's title.
   */
  title?: string;
}

function serializeChannelSnippet(data: any): ChannelSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializeChannelSnippet(data: any): ChannelSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

/**
 * Statistics about a channel: number of subscribers, number of videos in the
 * channel, etc.
 */
export interface ChannelStatistics {
  /**
   * The number of comments for the channel.
   */
  commentCount?: bigint;
  /**
   * Whether or not the number of subscribers is shown for this user.
   */
  hiddenSubscriberCount?: boolean;
  /**
   * The number of subscribers that the channel has.
   */
  subscriberCount?: bigint;
  /**
   * The number of videos uploaded to the channel.
   */
  videoCount?: bigint;
  /**
   * The number of times the channel has been viewed.
   */
  viewCount?: bigint;
}

function serializeChannelStatistics(data: any): ChannelStatistics {
  return {
    ...data,
    commentCount: data["commentCount"] !== undefined ? String(data["commentCount"]) : undefined,
    subscriberCount: data["subscriberCount"] !== undefined ? String(data["subscriberCount"]) : undefined,
    videoCount: data["videoCount"] !== undefined ? String(data["videoCount"]) : undefined,
    viewCount: data["viewCount"] !== undefined ? String(data["viewCount"]) : undefined,
  };
}

function deserializeChannelStatistics(data: any): ChannelStatistics {
  return {
    ...data,
    commentCount: data["commentCount"] !== undefined ? BigInt(data["commentCount"]) : undefined,
    subscriberCount: data["subscriberCount"] !== undefined ? BigInt(data["subscriberCount"]) : undefined,
    videoCount: data["videoCount"] !== undefined ? BigInt(data["videoCount"]) : undefined,
    viewCount: data["viewCount"] !== undefined ? BigInt(data["viewCount"]) : undefined,
  };
}

/**
 * JSON template for the status part of a channel.
 */
export interface ChannelStatus {
  /**
   * If true, then the user is linked to either a YouTube username or G+
   * account. Otherwise, the user doesn't have a public YouTube identity.
   */
  isLinked?: boolean;
  /**
   * The long uploads status of this channel. See
   * https://support.google.com/youtube/answer/71673 for more information.
   */
  longUploadsStatus?:  | "longUploadsUnspecified" | "allowed" | "eligible" | "disallowed";
  madeForKids?: boolean;
  /**
   * Privacy status of the channel.
   */
  privacyStatus?:  | "public" | "unlisted" | "private";
  selfDeclaredMadeForKids?: boolean;
}

/**
 * Additional options for YouTube#channelsUpdate.
 */
export interface ChannelsUpdateOptions {
  /**
   * The *onBehalfOfContentOwner* parameter indicates that the authenticated
   * user is acting on behalf of the content owner specified in the parameter
   * value. This parameter is intended for YouTube content partners that own and
   * manage many different YouTube channels. It allows content owners to
   * authenticate once and get access to all their video and channel data,
   * without having to provide authentication credentials for each individual
   * channel. The actual CMS account that the user authenticates with needs to
   * be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. The API currently only allows the
   * parameter value to be set to either brandingSettings or invideoPromotion.
   * (You cannot update both of those parts with a single request.) Note that
   * this method overrides the existing values for all of the mutable properties
   * that are contained in any parts that the parameter value specifies.
   */
  part: string;
}

/**
 * Freebase topic information related to the channel.
 */
export interface ChannelTopicDetails {
  /**
   * A list of Wikipedia URLs that describe the channel's content.
   */
  topicCategories?: string[];
  /**
   * A list of Freebase topic IDs associated with the channel. You can retrieve
   * information about each topic using the Freebase Topic API.
   */
  topicIds?: string[];
}

/**
 * Information specific to a store on a merchandising platform linked to a
 * YouTube channel.
 */
export interface ChannelToStoreLinkDetails {
  /**
   * Google Merchant Center id of the store.
   */
  merchantId?: bigint;
  /**
   * Name of the store.
   */
  storeName?: string;
  /**
   * Landing page of the store.
   */
  storeUrl?: string;
}

function serializeChannelToStoreLinkDetails(data: any): ChannelToStoreLinkDetails {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? String(data["merchantId"]) : undefined,
  };
}

function deserializeChannelToStoreLinkDetails(data: any): ChannelToStoreLinkDetails {
  return {
    ...data,
    merchantId: data["merchantId"] !== undefined ? BigInt(data["merchantId"]) : undefined,
  };
}

/**
 * A *comment* represents a single YouTube comment.
 */
export interface Comment {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the comment.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#comment".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the comment.
   */
  snippet?: CommentSnippet;
}

function serializeComment(data: any): Comment {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeCommentSnippet(data["snippet"]) : undefined,
  };
}

function deserializeComment(data: any): Comment {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeCommentSnippet(data["snippet"]) : undefined,
  };
}

export interface CommentListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of comments that match the request criteria.
   */
  items?: Comment[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#commentListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeCommentListResponse(data: any): CommentListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeComment(item))) : undefined,
  };
}

function deserializeCommentListResponse(data: any): CommentListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeComment(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#commentsDelete.
 */
export interface CommentsDeleteOptions {
  id: string;
}

/**
 * Additional options for YouTube#commentsInsert.
 */
export interface CommentsInsertOptions {
  /**
   * The *part* parameter identifies the properties that the API response will
   * include. Set the parameter value to snippet. The snippet part has a quota
   * cost of 2 units.
   */
  part: string;
}

/**
 * Additional options for YouTube#commentsList.
 */
export interface CommentsListOptions {
  /**
   * Returns the comments with the given IDs for One Platform.
   */
  id?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * Returns replies to the specified comment. Note, currently YouTube features
   * only one level of replies (ie replies to top level comments). However
   * replies to replies may be supported in the future.
   */
  parentId?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * comment resource properties that the API response will include.
   */
  part: string;
  /**
   * The requested text format for the returned comments.
   */
  textFormat?:  | "textFormatUnspecified" | "html" | "plainText";
}

/**
 * Additional options for YouTube#commentsMarkAsSpam.
 */
export interface CommentsMarkAsSpamOptions {
  /**
   * Flags the comments with the given IDs as spam in the caller's opinion.
   */
  id: string;
}

/**
 * Basic details about a comment, such as its author and text.
 */
export interface CommentSnippet {
  authorChannelId?: CommentSnippetAuthorChannelId;
  /**
   * Link to the author's YouTube channel, if any.
   */
  authorChannelUrl?: string;
  /**
   * The name of the user who posted the comment.
   */
  authorDisplayName?: string;
  /**
   * The URL for the avatar of the user who posted the comment.
   */
  authorProfileImageUrl?: string;
  /**
   * Whether the current viewer can rate this comment.
   */
  canRate?: boolean;
  /**
   * The id of the corresponding YouTube channel. In case of a channel comment
   * this is the channel the comment refers to. In case of a video comment it's
   * the video's channel.
   */
  channelId?: string;
  /**
   * The total number of likes this comment has received.
   */
  likeCount?: number;
  /**
   * The comment's moderation status. Will not be set if the comments were
   * requested through the id filter.
   */
  moderationStatus?:  | "published" | "heldForReview" | "likelySpam" | "rejected";
  /**
   * The unique id of the parent comment, only set for replies.
   */
  parentId?: string;
  /**
   * The date and time when the comment was originally published.
   */
  publishedAt?: Date;
  /**
   * The comment's text. The format is either plain text or HTML dependent on
   * what has been requested. Even the plain text representation may differ from
   * the text originally posted in that it may replace video links with video
   * titles etc.
   */
  textDisplay?: string;
  /**
   * The comment's original raw text as initially posted or last updated. The
   * original text will only be returned if it is accessible to the viewer,
   * which is only guaranteed if the viewer is the comment's author.
   */
  textOriginal?: string;
  /**
   * The date and time when the comment was last updated.
   */
  updatedAt?: Date;
  /**
   * The ID of the video the comment refers to, if any.
   */
  videoId?: string;
  /**
   * The rating the viewer has given to this comment. For the time being this
   * will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This
   * may change in the future.
   */
  viewerRating?:  | "none" | "like" | "dislike";
}

function serializeCommentSnippet(data: any): CommentSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
    updatedAt: data["updatedAt"] !== undefined ? data["updatedAt"].toISOString() : undefined,
  };
}

function deserializeCommentSnippet(data: any): CommentSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
    updatedAt: data["updatedAt"] !== undefined ? new Date(data["updatedAt"]) : undefined,
  };
}

/**
 * The id of the author's YouTube channel, if any.
 */
export interface CommentSnippetAuthorChannelId {
  value?: string;
}

/**
 * Additional options for YouTube#commentsSetModerationStatus.
 */
export interface CommentsSetModerationStatusOptions {
  /**
   * If set to true the author of the comment gets added to the ban list. This
   * means all future comments of the author will autmomatically be rejected.
   * Only valid in combination with STATUS_REJECTED.
   */
  banAuthor?: boolean;
  /**
   * Modifies the moderation status of the comments with the given IDs
   */
  id: string;
  /**
   * Specifies the requested moderation status. Note, comments can be in
   * statuses, which are not available through this call. For example, this call
   * does not allow to mark a comment as 'likely spam'. Valid values:
   * MODERATION_STATUS_PUBLISHED, MODERATION_STATUS_HELD_FOR_REVIEW,
   * MODERATION_STATUS_REJECTED.
   */
  moderationStatus:  | "published" | "heldForReview" | "likelySpam" | "rejected";
}

/**
 * Additional options for YouTube#commentsUpdate.
 */
export interface CommentsUpdateOptions {
  /**
   * The *part* parameter identifies the properties that the API response will
   * include. You must at least include the snippet part in the parameter value
   * since that part contains all of the properties that the API request can
   * update.
   */
  part: string;
}

/**
 * A *comment thread* represents information that applies to a top level
 * comment and all its replies. It can also include the top level comment itself
 * and some of the replies.
 */
export interface CommentThread {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the comment thread.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#commentThread".
   */
  kind?: string;
  /**
   * The replies object contains a limited number of replies (if any) to the
   * top level comment found in the snippet.
   */
  replies?: CommentThreadReplies;
  /**
   * The snippet object contains basic details about the comment thread and
   * also the top level comment.
   */
  snippet?: CommentThreadSnippet;
}

function serializeCommentThread(data: any): CommentThread {
  return {
    ...data,
    replies: data["replies"] !== undefined ? serializeCommentThreadReplies(data["replies"]) : undefined,
    snippet: data["snippet"] !== undefined ? serializeCommentThreadSnippet(data["snippet"]) : undefined,
  };
}

function deserializeCommentThread(data: any): CommentThread {
  return {
    ...data,
    replies: data["replies"] !== undefined ? deserializeCommentThreadReplies(data["replies"]) : undefined,
    snippet: data["snippet"] !== undefined ? deserializeCommentThreadSnippet(data["snippet"]) : undefined,
  };
}

export interface CommentThreadListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of comment threads that match the request criteria.
   */
  items?: CommentThread[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#commentThreadListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeCommentThreadListResponse(data: any): CommentThreadListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeCommentThread(item))) : undefined,
  };
}

function deserializeCommentThreadListResponse(data: any): CommentThreadListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeCommentThread(item))) : undefined,
  };
}

/**
 * Comments written in (direct or indirect) reply to the top level comment.
 */
export interface CommentThreadReplies {
  /**
   * A limited number of replies. Unless the number of replies returned equals
   * total_reply_count in the snippet the returned replies are only a subset of
   * the total number of replies.
   */
  comments?: Comment[];
}

function serializeCommentThreadReplies(data: any): CommentThreadReplies {
  return {
    ...data,
    comments: data["comments"] !== undefined ? data["comments"].map((item: any) => (serializeComment(item))) : undefined,
  };
}

function deserializeCommentThreadReplies(data: any): CommentThreadReplies {
  return {
    ...data,
    comments: data["comments"] !== undefined ? data["comments"].map((item: any) => (deserializeComment(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#commentThreadsInsert.
 */
export interface CommentThreadsInsertOptions {
  /**
   * The *part* parameter identifies the properties that the API response will
   * include. Set the parameter value to snippet. The snippet part has a quota
   * cost of 2 units.
   */
  part: string;
}

/**
 * Additional options for YouTube#commentThreadsList.
 */
export interface CommentThreadsListOptions {
  /**
   * Returns the comment threads of all videos of the channel and the channel
   * comments as well.
   */
  allThreadsRelatedToChannelId?: string;
  /**
   * Returns the comment threads for all the channel comments (ie does not
   * include comments left on videos).
   */
  channelId?: string;
  /**
   * Returns the comment threads with the given IDs for Stubby or Apiary.
   */
  id?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Limits the returned comment threads to those with the specified moderation
   * status. Not compatible with the 'id' filter. Valid values: published,
   * heldForReview, likelySpam.
   */
  moderationStatus?:  | "published" | "heldForReview" | "likelySpam" | "rejected";
  order?:  | "orderUnspecified" | "time" | "relevance";
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * commentThread resource properties that the API response will include.
   */
  part: string;
  /**
   * Limits the returned comment threads to those matching the specified key
   * words. Not compatible with the 'id' filter.
   */
  searchTerms?: string;
  /**
   * The requested text format for the returned comments.
   */
  textFormat?:  | "textFormatUnspecified" | "html" | "plainText";
  /**
   * Returns the comment threads of the specified video.
   */
  videoId?: string;
}

/**
 * Basic details about a comment thread.
 */
export interface CommentThreadSnippet {
  /**
   * Whether the current viewer of the thread can reply to it. This is viewer
   * specific - other viewers may see a different value for this field.
   */
  canReply?: boolean;
  /**
   * The YouTube channel the comments in the thread refer to or the channel
   * with the video the comments refer to. If video_id isn't set the comments
   * refer to the channel itself.
   */
  channelId?: string;
  /**
   * Whether the thread (and therefore all its comments) is visible to all
   * YouTube users.
   */
  isPublic?: boolean;
  /**
   * The top level comment of this thread.
   */
  topLevelComment?: Comment;
  /**
   * The total number of replies (not including the top level comment).
   */
  totalReplyCount?: number;
  /**
   * The ID of the video the comments refer to, if any. No video_id implies a
   * channel discussion comment.
   */
  videoId?: string;
}

function serializeCommentThreadSnippet(data: any): CommentThreadSnippet {
  return {
    ...data,
    topLevelComment: data["topLevelComment"] !== undefined ? serializeComment(data["topLevelComment"]) : undefined,
  };
}

function deserializeCommentThreadSnippet(data: any): CommentThreadSnippet {
  return {
    ...data,
    topLevelComment: data["topLevelComment"] !== undefined ? deserializeComment(data["topLevelComment"]) : undefined,
  };
}

/**
 * Ratings schemes. The country-specific ratings are mostly for movies and
 * shows. LINT.IfChange
 */
export interface ContentRating {
  /**
   * The video's Australian Classification Board (ACB) or Australian
   * Communications and Media Authority (ACMA) rating. ACMA ratings are used to
   * classify children's television programming.
   */
  acbRating?:  | "acbUnspecified" | "acbE" | "acbP" | "acbC" | "acbG" | "acbPg" | "acbM" | "acbMa15plus" | "acbR18plus" | "acbUnrated";
  /**
   * The video's rating from Italy's Autorità per le Garanzie nelle
   * Comunicazioni (AGCOM).
   */
  agcomRating?:  | "agcomUnspecified" | "agcomT" | "agcomVm14" | "agcomVm18" | "agcomUnrated";
  /**
   * The video's Anatel (Asociación Nacional de Televisión) rating for Chilean
   * television.
   */
  anatelRating?:  | "anatelUnspecified" | "anatelF" | "anatelI" | "anatelI7" | "anatelI10" | "anatelI12" | "anatelR" | "anatelA" | "anatelUnrated";
  /**
   * The video's British Board of Film Classification (BBFC) rating.
   */
  bbfcRating?:  | "bbfcUnspecified" | "bbfcU" | "bbfcPg" | "bbfc12a" | "bbfc12" | "bbfc15" | "bbfc18" | "bbfcR18" | "bbfcUnrated";
  /**
   * The video's rating from Thailand's Board of Film and Video Censors.
   */
  bfvcRating?:  | "bfvcUnspecified" | "bfvcG" | "bfvcE" | "bfvc13" | "bfvc15" | "bfvc18" | "bfvc20" | "bfvcB" | "bfvcUnrated";
  /**
   * The video's rating from the Austrian Board of Media Classification
   * (Bundesministerium für Unterricht, Kunst und Kultur).
   */
  bmukkRating?:  | "bmukkUnspecified" | "bmukkAa" | "bmukk6" | "bmukk8" | "bmukk10" | "bmukk12" | "bmukk14" | "bmukk16" | "bmukkUnrated";
  /**
   * The video's rating from the Canadian Radio-Television and
   * Telecommunications Commission (CRTC) for Canadian French-language
   * broadcasts. For more information, see the Canadian Broadcast Standards
   * Council website.
   */
  catvfrRating?:  | "catvfrUnspecified" | "catvfrG" | "catvfr8plus" | "catvfr13plus" | "catvfr16plus" | "catvfr18plus" | "catvfrUnrated" | "catvfrE";
  /**
   * Rating system for Canadian TV - Canadian TV Classification System The
   * video's rating from the Canadian Radio-Television and Telecommunications
   * Commission (CRTC) for Canadian English-language broadcasts. For more
   * information, see the Canadian Broadcast Standards Council website.
   */
  catvRating?:  | "catvUnspecified" | "catvC" | "catvC8" | "catvG" | "catvPg" | "catv14plus" | "catv18plus" | "catvUnrated" | "catvE";
  /**
   * The video's Central Board of Film Certification (CBFC - India) rating.
   */
  cbfcRating?:  | "cbfcUnspecified" | "cbfcU" | "cbfcUA" | "cbfcUA7plus" | "cbfcUA13plus" | "cbfcUA16plus" | "cbfcA" | "cbfcS" | "cbfcUnrated";
  /**
   * The video's Consejo de Calificación Cinematográfica (Chile) rating.
   */
  cccRating?:  | "cccUnspecified" | "cccTe" | "ccc6" | "ccc14" | "ccc18" | "ccc18v" | "ccc18s" | "cccUnrated";
  /**
   * The video's rating from Portugal's Comissão de Classificação de
   * Espect´culos.
   */
  cceRating?:  | "cceUnspecified" | "cceM4" | "cceM6" | "cceM12" | "cceM16" | "cceM18" | "cceUnrated" | "cceM14";
  /**
   * The video's rating in Switzerland.
   */
  chfilmRating?:  | "chfilmUnspecified" | "chfilm0" | "chfilm6" | "chfilm12" | "chfilm16" | "chfilm18" | "chfilmUnrated";
  /**
   * The video's Canadian Home Video Rating System (CHVRS) rating.
   */
  chvrsRating?:  | "chvrsUnspecified" | "chvrsG" | "chvrsPg" | "chvrs14a" | "chvrs18a" | "chvrsR" | "chvrsE" | "chvrsUnrated";
  /**
   * The video's rating from the Commission de Contrôle des Films (Belgium).
   */
  cicfRating?:  | "cicfUnspecified" | "cicfE" | "cicfKtEa" | "cicfKntEna" | "cicfUnrated";
  /**
   * The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI
   * (CNA).
   */
  cnaRating?:  | "cnaUnspecified" | "cnaAp" | "cna12" | "cna15" | "cna18" | "cna18plus" | "cnaUnrated";
  /**
   * Rating system in France - Commission de classification cinematographique
   */
  cncRating?:  | "cncUnspecified" | "cncT" | "cnc10" | "cnc12" | "cnc16" | "cnc18" | "cncE" | "cncInterdiction" | "cncUnrated";
  /**
   * The video's rating from France's Conseil supérieur de l’audiovisuel, which
   * rates broadcast content.
   */
  csaRating?:  | "csaUnspecified" | "csaT" | "csa10" | "csa12" | "csa16" | "csa18" | "csaInterdiction" | "csaUnrated";
  /**
   * The video's rating from Luxembourg's Commission de surveillance de la
   * classification des films (CSCF).
   */
  cscfRating?:  | "cscfUnspecified" | "cscfAl" | "cscfA" | "cscf6" | "cscf9" | "cscf12" | "cscf16" | "cscf18" | "cscfUnrated";
  /**
   * The video's rating in the Czech Republic.
   */
  czfilmRating?:  | "czfilmUnspecified" | "czfilmU" | "czfilm12" | "czfilm14" | "czfilm18" | "czfilmUnrated";
  /**
   * The video's Departamento de Justiça, Classificação, Qualificação e Títulos
   * (DJCQT - Brazil) rating.
   */
  djctqRating?:  | "djctqUnspecified" | "djctqL" | "djctq10" | "djctq12" | "djctq14" | "djctq16" | "djctq18" | "djctqEr" | "djctqL10" | "djctqL12" | "djctqL14" | "djctqL16" | "djctqL18" | "djctq1012" | "djctq1014" | "djctq1016" | "djctq1018" | "djctq1214" | "djctq1216" | "djctq1218" | "djctq1416" | "djctq1418" | "djctq1618" | "djctqUnrated";
  /**
   * Reasons that explain why the video received its DJCQT (Brazil) rating.
   */
  djctqRatingReasons?:  | "djctqRatingReasonUnspecified" | "djctqViolence" | "djctqExtremeViolence" | "djctqSexualContent" | "djctqNudity" | "djctqSex" | "djctqExplicitSex" | "djctqDrugs" | "djctqLegalDrugs" | "djctqIllegalDrugs" | "djctqInappropriateLanguage" | "djctqCriminalActs" | "djctqImpactingContent"[];
  /**
   * Rating system in Turkey - Evaluation and Classification Board of the
   * Ministry of Culture and Tourism
   */
  ecbmctRating?:  | "ecbmctUnspecified" | "ecbmctG" | "ecbmct7a" | "ecbmct7plus" | "ecbmct13a" | "ecbmct13plus" | "ecbmct15a" | "ecbmct15plus" | "ecbmct18plus" | "ecbmctUnrated";
  /**
   * The video's rating in Estonia.
   */
  eefilmRating?:  | "eefilmUnspecified" | "eefilmPere" | "eefilmL" | "eefilmMs6" | "eefilmK6" | "eefilmMs12" | "eefilmK12" | "eefilmK14" | "eefilmK16" | "eefilmUnrated";
  /**
   * The video's rating in Egypt.
   */
  egfilmRating?:  | "egfilmUnspecified" | "egfilmGn" | "egfilm18" | "egfilmBn" | "egfilmUnrated";
  /**
   * The video's Eirin (映倫) rating. Eirin is the Japanese rating system.
   */
  eirinRating?:  | "eirinUnspecified" | "eirinG" | "eirinPg12" | "eirinR15plus" | "eirinR18plus" | "eirinUnrated";
  /**
   * The video's rating from Malaysia's Film Censorship Board.
   */
  fcbmRating?:  | "fcbmUnspecified" | "fcbmU" | "fcbmPg13" | "fcbmP13" | "fcbm18" | "fcbm18sx" | "fcbm18pa" | "fcbm18sg" | "fcbm18pl" | "fcbmUnrated";
  /**
   * The video's rating from Hong Kong's Office for Film, Newspaper and Article
   * Administration.
   */
  fcoRating?:  | "fcoUnspecified" | "fcoI" | "fcoIia" | "fcoIib" | "fcoIi" | "fcoIii" | "fcoUnrated";
  /**
   * This property has been deprecated. Use the
   * contentDetails.contentRating.cncRating instead.
   */
  fmocRating?:  | "fmocUnspecified" | "fmocU" | "fmoc10" | "fmoc12" | "fmoc16" | "fmoc18" | "fmocE" | "fmocUnrated";
  /**
   * The video's rating from South Africa's Film and Publication Board.
   */
  fpbRating?:  | "fpbUnspecified" | "fpbA" | "fpbPg" | "fpb79Pg" | "fpb1012Pg" | "fpb13" | "fpb16" | "fpb18" | "fpbX18" | "fpbXx" | "fpbUnrated" | "fpb10";
  /**
   * Reasons that explain why the video received its FPB (South Africa) rating.
   */
  fpbRatingReasons?:  | "fpbRatingReasonUnspecified" | "fpbBlasphemy" | "fpbLanguage" | "fpbNudity" | "fpbPrejudice" | "fpbSex" | "fpbViolence" | "fpbDrugs" | "fpbSexualViolence" | "fpbHorror" | "fpbCriminalTechniques" | "fpbImitativeActsTechniques"[];
  /**
   * The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany)
   * rating.
   */
  fskRating?:  | "fskUnspecified" | "fsk0" | "fsk6" | "fsk12" | "fsk16" | "fsk18" | "fskUnrated";
  /**
   * The video's rating in Greece.
   */
  grfilmRating?:  | "grfilmUnspecified" | "grfilmK" | "grfilmE" | "grfilmK12" | "grfilmK13" | "grfilmK15" | "grfilmK17" | "grfilmK18" | "grfilmUnrated";
  /**
   * The video's Instituto de la Cinematografía y de las Artes Audiovisuales
   * (ICAA - Spain) rating.
   */
  icaaRating?:  | "icaaUnspecified" | "icaaApta" | "icaa7" | "icaa12" | "icaa13" | "icaa16" | "icaa18" | "icaaX" | "icaaUnrated";
  /**
   * The video's Irish Film Classification Office (IFCO - Ireland) rating. See
   * the IFCO website for more information.
   */
  ifcoRating?:  | "ifcoUnspecified" | "ifcoG" | "ifcoPg" | "ifco12" | "ifco12a" | "ifco15" | "ifco15a" | "ifco16" | "ifco18" | "ifcoUnrated";
  /**
   * The video's rating in Israel.
   */
  ilfilmRating?:  | "ilfilmUnspecified" | "ilfilmAa" | "ilfilm12" | "ilfilm14" | "ilfilm16" | "ilfilm18" | "ilfilmUnrated";
  /**
   * The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales -
   * Argentina) rating.
   */
  incaaRating?:  | "incaaUnspecified" | "incaaAtp" | "incaaSam13" | "incaaSam16" | "incaaSam18" | "incaaC" | "incaaUnrated";
  /**
   * The video's rating from the Kenya Film Classification Board.
   */
  kfcbRating?:  | "kfcbUnspecified" | "kfcbG" | "kfcbPg" | "kfcb16plus" | "kfcbR" | "kfcbUnrated";
  /**
   * The video's NICAM/Kijkwijzer rating from the Nederlands Instituut voor de
   * Classificatie van Audiovisuele Media (Netherlands).
   */
  kijkwijzerRating?:  | "kijkwijzerUnspecified" | "kijkwijzerAl" | "kijkwijzer6" | "kijkwijzer9" | "kijkwijzer12" | "kijkwijzer16" | "kijkwijzer18" | "kijkwijzerUnrated";
  /**
   * The video's Korea Media Rating Board (영상물등급위원회) rating. The KMRB rates
   * videos in South Korea.
   */
  kmrbRating?:  | "kmrbUnspecified" | "kmrbAll" | "kmrb12plus" | "kmrb15plus" | "kmrbTeenr" | "kmrbR" | "kmrbUnrated";
  /**
   * The video's rating from Indonesia's Lembaga Sensor Film.
   */
  lsfRating?:  | "lsfUnspecified" | "lsfSu" | "lsfA" | "lsfBo" | "lsf13" | "lsfR" | "lsf17" | "lsfD" | "lsf21" | "lsfUnrated";
  /**
   * The video's rating from Malta's Film Age-Classification Board.
   */
  mccaaRating?:  | "mccaaUnspecified" | "mccaaU" | "mccaaPg" | "mccaa12a" | "mccaa12" | "mccaa14" | "mccaa15" | "mccaa16" | "mccaa18" | "mccaaUnrated";
  /**
   * The video's rating from the Danish Film Institute's (Det Danske
   * Filminstitut) Media Council for Children and Young People.
   */
  mccypRating?:  | "mccypUnspecified" | "mccypA" | "mccyp7" | "mccyp11" | "mccyp15" | "mccypUnrated";
  /**
   * The video's rating system for Vietnam - MCST
   */
  mcstRating?:  | "mcstUnspecified" | "mcstP" | "mcst0" | "mcstC13" | "mcstC16" | "mcst16plus" | "mcstC18" | "mcstGPg" | "mcstUnrated";
  /**
   * The video's rating from Singapore's Media Development Authority (MDA) and,
   * specifically, it's Board of Film Censors (BFC).
   */
  mdaRating?:  | "mdaUnspecified" | "mdaG" | "mdaPg" | "mdaPg13" | "mdaNc16" | "mdaM18" | "mdaR21" | "mdaUnrated";
  /**
   * The video's rating from Medietilsynet, the Norwegian Media Authority.
   */
  medietilsynetRating?:  | "medietilsynetUnspecified" | "medietilsynetA" | "medietilsynet6" | "medietilsynet7" | "medietilsynet9" | "medietilsynet11" | "medietilsynet12" | "medietilsynet15" | "medietilsynet18" | "medietilsynetUnrated";
  /**
   * The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti
   * (National Audiovisual Institute).
   */
  mekuRating?:  | "mekuUnspecified" | "mekuS" | "meku7" | "meku12" | "meku16" | "meku18" | "mekuUnrated";
  /**
   * The rating system for MENA countries, a clone of MPAA. It is needed to
   * prevent titles go live w/o additional QC check, since some of them can be
   * inappropriate for the countries at all. See b/33408548 for more details.
   */
  menaMpaaRating?:  | "menaMpaaUnspecified" | "menaMpaaG" | "menaMpaaPg" | "menaMpaaPg13" | "menaMpaaR" | "menaMpaaUnrated";
  /**
   * The video's rating from the Ministero dei Beni e delle Attività Culturali
   * e del Turismo (Italy).
   */
  mibacRating?:  | "mibacUnspecified" | "mibacT" | "mibacVap" | "mibacVm6" | "mibacVm12" | "mibacVm14" | "mibacVm16" | "mibacVm18" | "mibacUnrated";
  /**
   * The video's Ministerio de Cultura (Colombia) rating.
   */
  mocRating?:  | "mocUnspecified" | "mocE" | "mocT" | "moc7" | "moc12" | "moc15" | "moc18" | "mocX" | "mocBanned" | "mocUnrated";
  /**
   * The video's rating from Taiwan's Ministry of Culture (文化部).
   */
  moctwRating?:  | "moctwUnspecified" | "moctwG" | "moctwP" | "moctwPg" | "moctwR" | "moctwUnrated" | "moctwR12" | "moctwR15";
  /**
   * The video's Motion Picture Association of America (MPAA) rating.
   */
  mpaaRating?:  | "mpaaUnspecified" | "mpaaG" | "mpaaPg" | "mpaaPg13" | "mpaaR" | "mpaaNc17" | "mpaaX" | "mpaaUnrated";
  /**
   * The rating system for trailer, DVD, and Ad in the US. See
   * http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html.
   */
  mpaatRating?:  | "mpaatUnspecified" | "mpaatGb" | "mpaatRb";
  /**
   * The video's rating from the Movie and Television Review and Classification
   * Board (Philippines).
   */
  mtrcbRating?:  | "mtrcbUnspecified" | "mtrcbG" | "mtrcbPg" | "mtrcbR13" | "mtrcbR16" | "mtrcbR18" | "mtrcbX" | "mtrcbUnrated";
  /**
   * The video's rating in Poland.
   */
  nbcplRating?:  | "nbcplUnspecified" | "nbcplI" | "nbcplIi" | "nbcplIii" | "nbcplIv" | "nbcpl18plus" | "nbcplUnrated";
  /**
   * The video's rating from the Maldives National Bureau of Classification.
   */
  nbcRating?:  | "nbcUnspecified" | "nbcG" | "nbcPg" | "nbc12plus" | "nbc15plus" | "nbc18plus" | "nbc18plusr" | "nbcPu" | "nbcUnrated";
  /**
   * The video's rating from the Bulgarian National Film Center.
   */
  nfrcRating?:  | "nfrcUnspecified" | "nfrcA" | "nfrcB" | "nfrcC" | "nfrcD" | "nfrcX" | "nfrcUnrated";
  /**
   * The video's rating from Nigeria's National Film and Video Censors Board.
   */
  nfvcbRating?:  | "nfvcbUnspecified" | "nfvcbG" | "nfvcbPg" | "nfvcb12" | "nfvcb12a" | "nfvcb15" | "nfvcb18" | "nfvcbRe" | "nfvcbUnrated";
  /**
   * The video's rating from the Nacionãlais Kino centrs (National Film Centre
   * of Latvia).
   */
  nkclvRating?:  | "nkclvUnspecified" | "nkclvU" | "nkclv7plus" | "nkclv12plus" | "nkclv16plus" | "nkclv18plus" | "nkclvUnrated";
  /**
   * The National Media Council ratings system for United Arab Emirates.
   */
  nmcRating?:  | "nmcUnspecified" | "nmcG" | "nmcPg" | "nmcPg13" | "nmcPg15" | "nmc15plus" | "nmc18plus" | "nmc18tc" | "nmcUnrated";
  /**
   * The video's Office of Film and Literature Classification (OFLC - New
   * Zealand) rating.
   */
  oflcRating?:  | "oflcUnspecified" | "oflcG" | "oflcPg" | "oflcM" | "oflcR13" | "oflcR15" | "oflcR16" | "oflcR18" | "oflcUnrated" | "oflcRp13" | "oflcRp16" | "oflcRp18";
  /**
   * The video's rating in Peru.
   */
  pefilmRating?:  | "pefilmUnspecified" | "pefilmPt" | "pefilmPg" | "pefilm14" | "pefilm18" | "pefilmUnrated";
  /**
   * The video's rating from the Hungarian Nemzeti Filmiroda, the Rating
   * Committee of the National Office of Film.
   */
  rcnofRating?:  | "rcnofUnspecified" | "rcnofI" | "rcnofIi" | "rcnofIii" | "rcnofIv" | "rcnofV" | "rcnofVi" | "rcnofUnrated";
  /**
   * The video's rating in Venezuela.
   */
  resorteviolenciaRating?:  | "resorteviolenciaUnspecified" | "resorteviolenciaA" | "resorteviolenciaB" | "resorteviolenciaC" | "resorteviolenciaD" | "resorteviolenciaE" | "resorteviolenciaUnrated";
  /**
   * The video's General Directorate of Radio, Television and Cinematography
   * (Mexico) rating.
   */
  rtcRating?:  | "rtcUnspecified" | "rtcAa" | "rtcA" | "rtcB" | "rtcB15" | "rtcC" | "rtcD" | "rtcUnrated";
  /**
   * The video's rating from Ireland's Raidió Teilifís Éireann.
   */
  rteRating?:  | "rteUnspecified" | "rteGa" | "rteCh" | "rtePs" | "rteMa" | "rteUnrated";
  /**
   * The video's National Film Registry of the Russian Federation (MKRF -
   * Russia) rating.
   */
  russiaRating?:  | "russiaUnspecified" | "russia0" | "russia6" | "russia12" | "russia16" | "russia18" | "russiaUnrated";
  /**
   * The video's rating in Slovakia.
   */
  skfilmRating?:  | "skfilmUnspecified" | "skfilmG" | "skfilmP2" | "skfilmP5" | "skfilmP8" | "skfilmUnrated";
  /**
   * The video's rating in Iceland.
   */
  smaisRating?:  | "smaisUnspecified" | "smaisL" | "smais7" | "smais12" | "smais14" | "smais16" | "smais18" | "smaisUnrated";
  /**
   * The video's rating from Statens medieråd (Sweden's National Media
   * Council).
   */
  smsaRating?:  | "smsaUnspecified" | "smsaA" | "smsa7" | "smsa11" | "smsa15" | "smsaUnrated";
  /**
   * The video's TV Parental Guidelines (TVPG) rating.
   */
  tvpgRating?:  | "tvpgUnspecified" | "tvpgY" | "tvpgY7" | "tvpgY7Fv" | "tvpgG" | "tvpgPg" | "pg14" | "tvpgMa" | "tvpgUnrated";
  /**
   * A rating that YouTube uses to identify age-restricted content.
   */
  ytRating?:  | "ytUnspecified" | "ytAgeRestricted";
}

/**
 * Note that there may be a 5-second end-point resolution issue. For instance,
 * if a cuepoint comes in for 22:03:27, we may stuff the cuepoint into 22:03:25
 * or 22:03:30, depending. This is an artifact of HLS.
 */
export interface Cuepoint {
  cueType?:  | "cueTypeUnspecified" | "cueTypeAd";
  /**
   * The duration of this cuepoint.
   */
  durationSecs?: number;
  etag?: string;
  /**
   * The identifier for cuepoint resource.
   */
  id?: string;
  /**
   * The time when the cuepoint should be inserted by offset to the broadcast
   * actual start time.
   */
  insertionOffsetTimeMs?: bigint;
  /**
   * The wall clock time at which the cuepoint should be inserted. Only one of
   * insertion_offset_time_ms and walltime_ms may be set at a time.
   */
  walltimeMs?: bigint;
}

function serializeCuepoint(data: any): Cuepoint {
  return {
    ...data,
    insertionOffsetTimeMs: data["insertionOffsetTimeMs"] !== undefined ? String(data["insertionOffsetTimeMs"]) : undefined,
    walltimeMs: data["walltimeMs"] !== undefined ? String(data["walltimeMs"]) : undefined,
  };
}

function deserializeCuepoint(data: any): Cuepoint {
  return {
    ...data,
    insertionOffsetTimeMs: data["insertionOffsetTimeMs"] !== undefined ? BigInt(data["insertionOffsetTimeMs"]) : undefined,
    walltimeMs: data["walltimeMs"] !== undefined ? BigInt(data["walltimeMs"]) : undefined,
  };
}

export interface Entity {
  id?: string;
  typeId?: string;
  url?: string;
}

/**
 * Geographical coordinates of a point, in WGS84.
 */
export interface GeoPoint {
  /**
   * Altitude above the reference ellipsoid, in meters.
   */
  altitude?: number;
  /**
   * Latitude in degrees.
   */
  latitude?: number;
  /**
   * Longitude in degrees.
   */
  longitude?: number;
}

/**
 * An *i18nLanguage* resource identifies a UI language currently supported by
 * YouTube.
 */
export interface I18nLanguage {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the i18n language.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#i18nLanguage".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the i18n language, such as
   * language code and human-readable name.
   */
  snippet?: I18nLanguageSnippet;
}

export interface I18nLanguageListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of supported i18n languages. In this map, the i18n language ID is
   * the map key, and its value is the corresponding i18nLanguage resource.
   */
  items?: I18nLanguage[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#i18nLanguageListResponse".
   */
  kind?: string;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

/**
 * Additional options for YouTube#i18nLanguagesList.
 */
export interface I18nLanguagesListOptions {
  hl?: string;
  /**
   * The *part* parameter specifies the i18nLanguage resource properties that
   * the API response will include. Set the parameter value to snippet.
   */
  part: string;
}

/**
 * Basic details about an i18n language, such as language code and
 * human-readable name.
 */
export interface I18nLanguageSnippet {
  /**
   * A short BCP-47 code that uniquely identifies a language.
   */
  hl?: string;
  /**
   * The human-readable name of the language in the language itself.
   */
  name?: string;
}

/**
 * A *i18nRegion* resource identifies a region where YouTube is available.
 */
export interface I18nRegion {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the i18n region.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#i18nRegion".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the i18n region, such as
   * region code and human-readable name.
   */
  snippet?: I18nRegionSnippet;
}

export interface I18nRegionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of regions where YouTube is available. In this map, the i18n region
   * ID is the map key, and its value is the corresponding i18nRegion resource.
   */
  items?: I18nRegion[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#i18nRegionListResponse".
   */
  kind?: string;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

/**
 * Additional options for YouTube#i18nRegionsList.
 */
export interface I18nRegionsListOptions {
  hl?: string;
  /**
   * The *part* parameter specifies the i18nRegion resource properties that the
   * API response will include. Set the parameter value to snippet.
   */
  part: string;
}

/**
 * Basic details about an i18n region, such as region code and human-readable
 * name.
 */
export interface I18nRegionSnippet {
  /**
   * The region code as a 2-letter ISO country code.
   */
  gl?: string;
  /**
   * The human-readable name of the region.
   */
  name?: string;
}

/**
 * Branding properties for images associated with the channel.
 */
export interface ImageSettings {
  /**
   * The URL for the background image shown on the video watch page. The image
   * should be 1200px by 615px, with a maximum file size of 128k.
   */
  backgroundImageUrl?: LocalizedProperty;
  /**
   * This is generated when a ChannelBanner.Insert request has succeeded for
   * the given channel.
   */
  bannerExternalUrl?: string;
  /**
   * Banner image. Desktop size (1060x175).
   */
  bannerImageUrl?: string;
  /**
   * Banner image. Mobile size high resolution (1440x395).
   */
  bannerMobileExtraHdImageUrl?: string;
  /**
   * Banner image. Mobile size high resolution (1280x360).
   */
  bannerMobileHdImageUrl?: string;
  /**
   * Banner image. Mobile size (640x175).
   */
  bannerMobileImageUrl?: string;
  /**
   * Banner image. Mobile size low resolution (320x88).
   */
  bannerMobileLowImageUrl?: string;
  /**
   * Banner image. Mobile size medium/high resolution (960x263).
   */
  bannerMobileMediumHdImageUrl?: string;
  /**
   * Banner image. Tablet size extra high resolution (2560x424).
   */
  bannerTabletExtraHdImageUrl?: string;
  /**
   * Banner image. Tablet size high resolution (2276x377).
   */
  bannerTabletHdImageUrl?: string;
  /**
   * Banner image. Tablet size (1707x283).
   */
  bannerTabletImageUrl?: string;
  /**
   * Banner image. Tablet size low resolution (1138x188).
   */
  bannerTabletLowImageUrl?: string;
  /**
   * Banner image. TV size high resolution (1920x1080).
   */
  bannerTvHighImageUrl?: string;
  /**
   * Banner image. TV size extra high resolution (2120x1192).
   */
  bannerTvImageUrl?: string;
  /**
   * Banner image. TV size low resolution (854x480).
   */
  bannerTvLowImageUrl?: string;
  /**
   * Banner image. TV size medium resolution (1280x720).
   */
  bannerTvMediumImageUrl?: string;
  /**
   * The image map script for the large banner image.
   */
  largeBrandedBannerImageImapScript?: LocalizedProperty;
  /**
   * The URL for the 854px by 70px image that appears below the video player in
   * the expanded video view of the video watch page.
   */
  largeBrandedBannerImageUrl?: LocalizedProperty;
  /**
   * The image map script for the small banner image.
   */
  smallBrandedBannerImageImapScript?: LocalizedProperty;
  /**
   * The URL for the 640px by 70px banner image that appears below the video
   * player in the default view of the video watch page. The URL for the image
   * that appears above the top-left corner of the video player. This is a
   * 25-pixel-high image with a flexible width that cannot exceed 170 pixels.
   */
  smallBrandedBannerImageUrl?: LocalizedProperty;
  /**
   * The URL for a 1px by 1px tracking pixel that can be used to collect
   * statistics for views of the channel or video pages.
   */
  trackingImageUrl?: string;
  watchIconImageUrl?: string;
}

/**
 * Describes information necessary for ingesting an RTMP, HTTP, or SRT stream.
 */
export interface IngestionInfo {
  /**
   * The backup ingestion URL that you should use to stream video to YouTube.
   * You have the option of simultaneously streaming the content that you are
   * sending to the ingestionAddress to this URL.
   */
  backupIngestionAddress?: string;
  /**
   * The primary ingestion URL that you should use to stream video to YouTube.
   * You must stream video to this URL. Depending on which application or tool
   * you use to encode your video stream, you may need to enter the stream URL
   * and stream name separately or you may need to concatenate them in the
   * following format: *STREAM_URL/STREAM_NAME*
   */
  ingestionAddress?: string;
  /**
   * This ingestion url may be used instead of backupIngestionAddress in order
   * to stream via RTMPS. Not applicable to non-RTMP streams.
   */
  rtmpsBackupIngestionAddress?: string;
  /**
   * This ingestion url may be used instead of ingestionAddress in order to
   * stream via RTMPS. Not applicable to non-RTMP streams.
   */
  rtmpsIngestionAddress?: string;
  /**
   * The stream name that YouTube assigns to the video stream.
   */
  streamName?: string;
}

/**
 * LINT.IfChange Describes an invideo branding.
 */
export interface InvideoBranding {
  /**
   * The bytes the uploaded image. Only used in api to youtube communication.
   */
  imageBytes?: Uint8Array;
  /**
   * The url of the uploaded image. Only used in apiary to api communication.
   */
  imageUrl?: string;
  /**
   * The spatial position within the video where the branding watermark will be
   * displayed.
   */
  position?: InvideoPosition;
  /**
   * The channel to which this branding links. If not present it defaults to
   * the current channel.
   */
  targetChannelId?: string;
  /**
   * The temporal position within the video where watermark will be displayed.
   */
  timing?: InvideoTiming;
}

function serializeInvideoBranding(data: any): InvideoBranding {
  return {
    ...data,
    imageBytes: data["imageBytes"] !== undefined ? encodeBase64(data["imageBytes"]) : undefined,
    timing: data["timing"] !== undefined ? serializeInvideoTiming(data["timing"]) : undefined,
  };
}

function deserializeInvideoBranding(data: any): InvideoBranding {
  return {
    ...data,
    imageBytes: data["imageBytes"] !== undefined ? decodeBase64(data["imageBytes"] as string) : undefined,
    timing: data["timing"] !== undefined ? deserializeInvideoTiming(data["timing"]) : undefined,
  };
}

/**
 * Describes the spatial position of a visual widget inside a video. It is a
 * union of various position types, out of which only will be set one.
 */
export interface InvideoPosition {
  /**
   * Describes in which corner of the video the visual widget will appear.
   */
  cornerPosition?:  | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /**
   * Defines the position type.
   */
  type?:  | "corner";
}

/**
 * Describes a temporal position of a visual widget inside a video.
 */
export interface InvideoTiming {
  /**
   * Defines the duration in milliseconds for which the promotion should be
   * displayed. If missing, the client should use the default.
   */
  durationMs?: bigint;
  /**
   * Defines the time at which the promotion will appear. Depending on the
   * value of type the value of the offsetMs field will represent a time offset
   * from the start or from the end of the video, expressed in milliseconds.
   */
  offsetMs?: bigint;
  /**
   * Describes a timing type. If the value is offsetFromStart, then the
   * offsetMs field represents an offset from the start of the video. If the
   * value is offsetFromEnd, then the offsetMs field represents an offset from
   * the end of the video.
   */
  type?:  | "offsetFromStart" | "offsetFromEnd";
}

function serializeInvideoTiming(data: any): InvideoTiming {
  return {
    ...data,
    durationMs: data["durationMs"] !== undefined ? String(data["durationMs"]) : undefined,
    offsetMs: data["offsetMs"] !== undefined ? String(data["offsetMs"]) : undefined,
  };
}

function deserializeInvideoTiming(data: any): InvideoTiming {
  return {
    ...data,
    durationMs: data["durationMs"] !== undefined ? BigInt(data["durationMs"]) : undefined,
    offsetMs: data["offsetMs"] !== undefined ? BigInt(data["offsetMs"]) : undefined,
  };
}

export interface LanguageTag {
  value?: string;
}

export interface LevelDetails {
  /**
   * The name that should be used when referring to this level.
   */
  displayName?: string;
}

/**
 * A *liveBroadcast* resource represents an event that will be streamed, via
 * live video, on YouTube.
 */
export interface LiveBroadcast {
  /**
   * The contentDetails object contains information about the event's video
   * content, such as whether the content can be shown in an embedded video
   * player or if it will be archived and therefore available for viewing after
   * the event has concluded.
   */
  contentDetails?: LiveBroadcastContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube assigns to uniquely identify the broadcast.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveBroadcast".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the event, including its
   * title, description, start time, and end time.
   */
  snippet?: LiveBroadcastSnippet;
  /**
   * The statistics object contains info about the event's current stats. These
   * include concurrent viewers and total chat count. Statistics can change (in
   * either direction) during the lifetime of an event. Statistics are only
   * returned while the event is live.
   */
  statistics?: LiveBroadcastStatistics;
  /**
   * The status object contains information about the event's status.
   */
  status?: LiveBroadcastStatus;
}

function serializeLiveBroadcast(data: any): LiveBroadcast {
  return {
    ...data,
    contentDetails: data["contentDetails"] !== undefined ? serializeLiveBroadcastContentDetails(data["contentDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? serializeLiveBroadcastSnippet(data["snippet"]) : undefined,
    statistics: data["statistics"] !== undefined ? serializeLiveBroadcastStatistics(data["statistics"]) : undefined,
  };
}

function deserializeLiveBroadcast(data: any): LiveBroadcast {
  return {
    ...data,
    contentDetails: data["contentDetails"] !== undefined ? deserializeLiveBroadcastContentDetails(data["contentDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? deserializeLiveBroadcastSnippet(data["snippet"]) : undefined,
    statistics: data["statistics"] !== undefined ? deserializeLiveBroadcastStatistics(data["statistics"]) : undefined,
  };
}

/**
 * Detailed settings of a broadcast.
 */
export interface LiveBroadcastContentDetails {
  /**
   * This value uniquely identifies the live stream bound to the broadcast.
   */
  boundStreamId?: string;
  /**
   * The date and time that the live stream referenced by boundStreamId was
   * last updated.
   */
  boundStreamLastUpdateTimeMs?: Date;
  closedCaptionsType?:  | "closedCaptionsTypeUnspecified" | "closedCaptionsDisabled" | "closedCaptionsHttpPost" | "closedCaptionsEmbedded";
  /**
   * This setting indicates whether auto start is enabled for this broadcast.
   * The default value for this property is false. This setting can only be used
   * by Events.
   */
  enableAutoStart?: boolean;
  /**
   * This setting indicates whether auto stop is enabled for this broadcast.
   * The default value for this property is false. This setting can only be used
   * by Events.
   */
  enableAutoStop?: boolean;
  /**
   * This setting indicates whether HTTP POST closed captioning is enabled for
   * this broadcast. The ingestion URL of the closed captions is returned
   * through the liveStreams API. This is mutually exclusive with using the
   * closed_captions_type property, and is equivalent to setting
   * closed_captions_type to CLOSED_CAPTIONS_HTTP_POST.
   */
  enableClosedCaptions?: boolean;
  /**
   * This setting indicates whether YouTube should enable content encryption
   * for the broadcast.
   */
  enableContentEncryption?: boolean;
  /**
   * This setting determines whether viewers can access DVR controls while
   * watching the video. DVR controls enable the viewer to control the video
   * playback experience by pausing, rewinding, or fast forwarding content. The
   * default value for this property is true. *Important:* You must set the
   * value to true and also set the enableArchive property's value to true if
   * you want to make playback available immediately after the broadcast ends.
   */
  enableDvr?: boolean;
  /**
   * This setting indicates whether the broadcast video can be played in an
   * embedded player. If you choose to archive the video (using the
   * enableArchive property), this setting will also apply to the archived
   * video.
   */
  enableEmbed?: boolean;
  /**
   * Indicates whether this broadcast has low latency enabled.
   */
  enableLowLatency?: boolean;
  /**
   * If both this and enable_low_latency are set, they must match.
   * LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should
   * match enable_low_latency=true LATENCY_ULTRA_LOW should have
   * enable_low_latency omitted.
   */
  latencyPreference?:  | "latencyPreferenceUnspecified" | "normal" | "low" | "ultraLow";
  /**
   * The mesh for projecting the video if projection is mesh. The mesh value
   * must be a UTF-8 string containing the base-64 encoding of 3D mesh data that
   * follows the Spherical Video V2 RFC specification for an mshp box, excluding
   * the box size and type but including the following four reserved zero bytes
   * for the version and flags.
   */
  mesh?: Uint8Array;
  /**
   * The monitorStream object contains information about the monitor stream,
   * which the broadcaster can use to review the event content before the
   * broadcast stream is shown publicly.
   */
  monitorStream?: MonitorStreamInfo;
  /**
   * The projection format of this broadcast. This defaults to rectangular.
   */
  projection?:  | "projectionUnspecified" | "rectangular" | "360" | "mesh";
  /**
   * Automatically start recording after the event goes live. The default value
   * for this property is true. *Important:* You must also set the enableDvr
   * property's value to true if you want the playback to be available
   * immediately after the broadcast ends. If you set this property's value to
   * true but do not also set the enableDvr property to true, there may be a
   * delay of around one day before the archived video will be available for
   * playback.
   */
  recordFromStart?: boolean;
  /**
   * This setting indicates whether the broadcast should automatically begin
   * with an in-stream slate when you update the broadcast's status to live.
   * After updating the status, you then need to send a liveCuepoints.insert
   * request that sets the cuepoint's eventState to end to remove the in-stream
   * slate and make your broadcast stream visible to viewers.
   */
  startWithSlate?: boolean;
  /**
   * The 3D stereo layout of this broadcast. This defaults to mono.
   */
  stereoLayout?:  | "stereoLayoutUnspecified" | "mono" | "leftRight" | "topBottom";
}

function serializeLiveBroadcastContentDetails(data: any): LiveBroadcastContentDetails {
  return {
    ...data,
    boundStreamLastUpdateTimeMs: data["boundStreamLastUpdateTimeMs"] !== undefined ? data["boundStreamLastUpdateTimeMs"].toISOString() : undefined,
    mesh: data["mesh"] !== undefined ? encodeBase64(data["mesh"]) : undefined,
  };
}

function deserializeLiveBroadcastContentDetails(data: any): LiveBroadcastContentDetails {
  return {
    ...data,
    boundStreamLastUpdateTimeMs: data["boundStreamLastUpdateTimeMs"] !== undefined ? new Date(data["boundStreamLastUpdateTimeMs"]) : undefined,
    mesh: data["mesh"] !== undefined ? decodeBase64(data["mesh"] as string) : undefined,
  };
}

export interface LiveBroadcastListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of broadcasts that match the request criteria.
   */
  items?: LiveBroadcast[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveBroadcastListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeLiveBroadcastListResponse(data: any): LiveBroadcastListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeLiveBroadcast(item))) : undefined,
  };
}

function deserializeLiveBroadcastListResponse(data: any): LiveBroadcastListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeLiveBroadcast(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#liveBroadcastsBind.
 */
export interface LiveBroadcastsBindOptions {
  /**
   * Broadcast to bind to the stream
   */
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * liveBroadcast resource properties that the API response will include. The
   * part names that you can include in the parameter value are id, snippet,
   * contentDetails, and status.
   */
  part: string;
  /**
   * Stream to bind, if not set unbind the current one.
   */
  streamId?: string;
}

/**
 * Additional options for YouTube#liveBroadcastsDelete.
 */
export interface LiveBroadcastsDeleteOptions {
  /**
   * Broadcast to delete.
   */
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
}

/**
 * Additional options for YouTube#liveBroadcastsInsertCuepoint.
 */
export interface LiveBroadcastsInsertCuepointOptions {
  /**
   * Broadcast to insert ads to, or equivalently `external_video_id` for
   * internal use.
   */
  id?: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * liveBroadcast resource properties that the API response will include. The
   * part names that you can include in the parameter value are id, snippet,
   * contentDetails, and status.
   */
  part?: string;
}

/**
 * Additional options for YouTube#liveBroadcastsInsert.
 */
export interface LiveBroadcastsInsertOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. The part properties that you can
   * include in the parameter value are id, snippet, contentDetails, and status.
   */
  part: string;
}

/**
 * Additional options for YouTube#liveBroadcastsList.
 */
export interface LiveBroadcastsListOptions {
  /**
   * Return broadcasts with a certain status, e.g. active broadcasts.
   */
  broadcastStatus?:  | "broadcastStatusFilterUnspecified" | "all" | "active" | "upcoming" | "completed";
  /**
   * Return only broadcasts with the selected type.
   */
  broadcastType?:  | "broadcastTypeFilterUnspecified" | "all" | "event" | "persistent";
  /**
   * Return broadcasts with the given ids from Stubby or Apiary.
   */
  id?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  mine?: boolean;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * liveBroadcast resource properties that the API response will include. The
   * part names that you can include in the parameter value are id, snippet,
   * contentDetails, status and statistics.
   */
  part: string;
}

/**
 * Basic broadcast information.
 */
export interface LiveBroadcastSnippet {
  /**
   * The date and time that the broadcast actually ended. This information is
   * only available once the broadcast's state is complete.
   */
  actualEndTime?: Date;
  /**
   * The date and time that the broadcast actually started. This information is
   * only available once the broadcast's state is live.
   */
  actualStartTime?: Date;
  /**
   * The ID that YouTube uses to uniquely identify the channel that is
   * publishing the broadcast.
   */
  channelId?: string;
  /**
   * The broadcast's description. As with the title, you can set this field by
   * modifying the broadcast resource or by setting the description field of the
   * corresponding video resource.
   */
  description?: string;
  /**
   * Indicates whether this broadcast is the default broadcast. Internal only.
   */
  isDefaultBroadcast?: boolean;
  /**
   * The id of the live chat for this broadcast.
   */
  liveChatId?: string;
  /**
   * The date and time that the broadcast was added to YouTube's live broadcast
   * schedule.
   */
  publishedAt?: Date;
  /**
   * The date and time that the broadcast is scheduled to end.
   */
  scheduledEndTime?: Date;
  /**
   * The date and time that the broadcast is scheduled to start.
   */
  scheduledStartTime?: Date;
  /**
   * A map of thumbnail images associated with the broadcast. For each nested
   * object in this object, the key is the name of the thumbnail image, and the
   * value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The broadcast's title. Note that the broadcast represents exactly one
   * YouTube video. You can set this field by modifying the broadcast resource
   * or by setting the title field of the corresponding video resource.
   */
  title?: string;
}

function serializeLiveBroadcastSnippet(data: any): LiveBroadcastSnippet {
  return {
    ...data,
    actualEndTime: data["actualEndTime"] !== undefined ? data["actualEndTime"].toISOString() : undefined,
    actualStartTime: data["actualStartTime"] !== undefined ? data["actualStartTime"].toISOString() : undefined,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
    scheduledEndTime: data["scheduledEndTime"] !== undefined ? data["scheduledEndTime"].toISOString() : undefined,
    scheduledStartTime: data["scheduledStartTime"] !== undefined ? data["scheduledStartTime"].toISOString() : undefined,
  };
}

function deserializeLiveBroadcastSnippet(data: any): LiveBroadcastSnippet {
  return {
    ...data,
    actualEndTime: data["actualEndTime"] !== undefined ? new Date(data["actualEndTime"]) : undefined,
    actualStartTime: data["actualStartTime"] !== undefined ? new Date(data["actualStartTime"]) : undefined,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
    scheduledEndTime: data["scheduledEndTime"] !== undefined ? new Date(data["scheduledEndTime"]) : undefined,
    scheduledStartTime: data["scheduledStartTime"] !== undefined ? new Date(data["scheduledStartTime"]) : undefined,
  };
}

/**
 * Statistics about the live broadcast. These represent a snapshot of the
 * values at the time of the request. Statistics are only returned for live
 * broadcasts.
 */
export interface LiveBroadcastStatistics {
  /**
   * The number of viewers currently watching the broadcast. The property and
   * its value will be present if the broadcast has current viewers and the
   * broadcast owner has not hidden the viewcount for the video. Note that
   * YouTube stops tracking the number of concurrent viewers for a broadcast
   * when the broadcast ends. So, this property would not identify the number of
   * viewers watching an archived video of a live broadcast that already ended.
   */
  concurrentViewers?: bigint;
  /**
   * The total number of live chat messages currently on the broadcast. The
   * property and its value will be present if the broadcast is public, has the
   * live chat feature enabled, and has at least one message. Note that this
   * field will not be filled after the broadcast ends. So this property would
   * not identify the number of chat messages for an archived video of a
   * completed live broadcast.
   */
  totalChatCount?: bigint;
}

function serializeLiveBroadcastStatistics(data: any): LiveBroadcastStatistics {
  return {
    ...data,
    concurrentViewers: data["concurrentViewers"] !== undefined ? String(data["concurrentViewers"]) : undefined,
    totalChatCount: data["totalChatCount"] !== undefined ? String(data["totalChatCount"]) : undefined,
  };
}

function deserializeLiveBroadcastStatistics(data: any): LiveBroadcastStatistics {
  return {
    ...data,
    concurrentViewers: data["concurrentViewers"] !== undefined ? BigInt(data["concurrentViewers"]) : undefined,
    totalChatCount: data["totalChatCount"] !== undefined ? BigInt(data["totalChatCount"]) : undefined,
  };
}

/**
 * Live broadcast state.
 */
export interface LiveBroadcastStatus {
  /**
   * The broadcast's status. The status can be updated using the API's
   * liveBroadcasts.transition method.
   */
  lifeCycleStatus?:  | "lifeCycleStatusUnspecified" | "created" | "ready" | "testing" | "live" | "complete" | "revoked" | "testStarting" | "liveStarting";
  /**
   * Priority of the live broadcast event (internal state).
   */
  liveBroadcastPriority?:  | "liveBroadcastPriorityUnspecified" | "low" | "normal" | "high";
  /**
   * Whether the broadcast is made for kids or not, decided by YouTube instead
   * of the creator. This field is read only.
   */
  madeForKids?: boolean;
  /**
   * The broadcast's privacy status. Note that the broadcast represents exactly
   * one YouTube video, so the privacy settings are identical to those supported
   * for videos. In addition, you can set this field by modifying the broadcast
   * resource or by setting the privacyStatus field of the corresponding video
   * resource.
   */
  privacyStatus?:  | "public" | "unlisted" | "private";
  /**
   * The broadcast's recording status.
   */
  recordingStatus?:  | "liveBroadcastRecordingStatusUnspecified" | "notRecording" | "recording" | "recorded";
  /**
   * This field will be set to True if the creator declares the broadcast to be
   * kids only: go/live-cw-work.
   */
  selfDeclaredMadeForKids?: boolean;
}

/**
 * Additional options for YouTube#liveBroadcastsTransition.
 */
export interface LiveBroadcastsTransitionOptions {
  /**
   * The status to which the broadcast is going to transition.
   */
  broadcastStatus:  | "statusUnspecified" | "testing" | "live" | "complete";
  /**
   * Broadcast to transition.
   */
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * liveBroadcast resource properties that the API response will include. The
   * part names that you can include in the parameter value are id, snippet,
   * contentDetails, and status.
   */
  part: string;
}

/**
 * Additional options for YouTube#liveBroadcastsUpdate.
 */
export interface LiveBroadcastsUpdateOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. The part properties that you can
   * include in the parameter value are id, snippet, contentDetails, and status.
   * Note that this method will override the existing values for all of the
   * mutable properties that are contained in any parts that the parameter value
   * specifies. For example, a broadcast's privacy status is defined in the
   * status part. As such, if your request is updating a private or unlisted
   * broadcast, and the request's part parameter value includes the status part,
   * the broadcast's privacy setting will be updated to whatever value the
   * request body specifies. If the request body does not specify a value, the
   * existing privacy setting will be removed and the broadcast will revert to
   * the default privacy setting.
   */
  part: string;
}

/**
 * A `__liveChatBan__` resource represents a ban for a YouTube live chat.
 */
export interface LiveChatBan {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube assigns to uniquely identify the ban.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * `"youtube#liveChatBan"`.
   */
  kind?: string;
  /**
   * The `snippet` object contains basic details about the ban.
   */
  snippet?: LiveChatBanSnippet;
}

function serializeLiveChatBan(data: any): LiveChatBan {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeLiveChatBanSnippet(data["snippet"]) : undefined,
  };
}

function deserializeLiveChatBan(data: any): LiveChatBan {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeLiveChatBanSnippet(data["snippet"]) : undefined,
  };
}

/**
 * Additional options for YouTube#liveChatBansDelete.
 */
export interface LiveChatBansDeleteOptions {
  id: string;
}

/**
 * Additional options for YouTube#liveChatBansInsert.
 */
export interface LiveChatBansInsertOptions {
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response returns. Set the parameter value to snippet.
   */
  part: string;
}

export interface LiveChatBanSnippet {
  /**
   * The duration of a ban, only filled if the ban has type TEMPORARY.
   */
  banDurationSeconds?: bigint;
  bannedUserDetails?: ChannelProfileDetails;
  /**
   * The chat this ban is pertinent to.
   */
  liveChatId?: string;
  /**
   * The type of ban.
   */
  type?:  | "liveChatBanTypeUnspecified" | "permanent" | "temporary";
}

function serializeLiveChatBanSnippet(data: any): LiveChatBanSnippet {
  return {
    ...data,
    banDurationSeconds: data["banDurationSeconds"] !== undefined ? String(data["banDurationSeconds"]) : undefined,
  };
}

function deserializeLiveChatBanSnippet(data: any): LiveChatBanSnippet {
  return {
    ...data,
    banDurationSeconds: data["banDurationSeconds"] !== undefined ? BigInt(data["banDurationSeconds"]) : undefined,
  };
}

export interface LiveChatFanFundingEventDetails {
  /**
   * A rendered string that displays the fund amount and currency to the user.
   */
  amountDisplayString?: string;
  /**
   * The amount of the fund.
   */
  amountMicros?: bigint;
  /**
   * The currency in which the fund was made.
   */
  currency?: string;
  /**
   * The comment added by the user to this fan funding event.
   */
  userComment?: string;
}

function serializeLiveChatFanFundingEventDetails(data: any): LiveChatFanFundingEventDetails {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? String(data["amountMicros"]) : undefined,
  };
}

function deserializeLiveChatFanFundingEventDetails(data: any): LiveChatFanFundingEventDetails {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? BigInt(data["amountMicros"]) : undefined,
  };
}

export interface LiveChatGiftMembershipReceivedDetails {
  /**
   * The ID of the membership gifting message that is related to this gift
   * membership. This ID will always refer to a message whose type is
   * 'membershipGiftingEvent'.
   */
  associatedMembershipGiftingMessageId?: string;
  /**
   * The ID of the user that made the membership gifting purchase. This matches
   * the `snippet.authorChannelId` of the associated membership gifting message.
   */
  gifterChannelId?: string;
  /**
   * The name of the Level at which the viewer is a member. This matches the
   * `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the
   * associated membership gifting message. The Level names are defined by the
   * YouTube channel offering the Membership. In some situations this field
   * isn't filled.
   */
  memberLevelName?: string;
}

export interface LiveChatMemberMilestoneChatDetails {
  /**
   * The name of the Level at which the viever is a member. The Level names are
   * defined by the YouTube channel offering the Membership. In some situations
   * this field isn't filled.
   */
  memberLevelName?: string;
  /**
   * The total amount of months (rounded up) the viewer has been a member that
   * granted them this Member Milestone Chat. This is the same number of months
   * as is being displayed to YouTube users.
   */
  memberMonth?: number;
  /**
   * The comment added by the member to this Member Milestone Chat. This field
   * is empty for messages without a comment from the member.
   */
  userComment?: string;
}

export interface LiveChatMembershipGiftingDetails {
  /**
   * The number of gift memberships purchased by the user.
   */
  giftMembershipsCount?: number;
  /**
   * The name of the level of the gift memberships purchased by the user. The
   * Level names are defined by the YouTube channel offering the Membership. In
   * some situations this field isn't filled.
   */
  giftMembershipsLevelName?: string;
}

/**
 * A *liveChatMessage* resource represents a chat message in a YouTube Live
 * Chat.
 */
export interface LiveChatMessage {
  /**
   * The authorDetails object contains basic details about the user that posted
   * this message.
   */
  authorDetails?: LiveChatMessageAuthorDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube assigns to uniquely identify the message.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveChatMessage".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the message.
   */
  snippet?: LiveChatMessageSnippet;
}

function serializeLiveChatMessage(data: any): LiveChatMessage {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeLiveChatMessageSnippet(data["snippet"]) : undefined,
  };
}

function deserializeLiveChatMessage(data: any): LiveChatMessage {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeLiveChatMessageSnippet(data["snippet"]) : undefined,
  };
}

export interface LiveChatMessageAuthorDetails {
  /**
   * The YouTube channel ID.
   */
  channelId?: string;
  /**
   * The channel's URL.
   */
  channelUrl?: string;
  /**
   * The channel's display name.
   */
  displayName?: string;
  /**
   * Whether the author is a moderator of the live chat.
   */
  isChatModerator?: boolean;
  /**
   * Whether the author is the owner of the live chat.
   */
  isChatOwner?: boolean;
  /**
   * Whether the author is a sponsor of the live chat.
   */
  isChatSponsor?: boolean;
  /**
   * Whether the author's identity has been verified by YouTube.
   */
  isVerified?: boolean;
  /**
   * The channels's avatar URL.
   */
  profileImageUrl?: string;
}

export interface LiveChatMessageDeletedDetails {
  deletedMessageId?: string;
}

export interface LiveChatMessageListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  items?: LiveChatMessage[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveChatMessageListResponse".
   */
  kind?: string;
  nextPageToken?: string;
  /**
   * The date and time when the underlying stream went offline.
   */
  offlineAt?: Date;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The amount of time the client should wait before polling again.
   */
  pollingIntervalMillis?: number;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeLiveChatMessageListResponse(data: any): LiveChatMessageListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeLiveChatMessage(item))) : undefined,
    offlineAt: data["offlineAt"] !== undefined ? data["offlineAt"].toISOString() : undefined,
  };
}

function deserializeLiveChatMessageListResponse(data: any): LiveChatMessageListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeLiveChatMessage(item))) : undefined,
    offlineAt: data["offlineAt"] !== undefined ? new Date(data["offlineAt"]) : undefined,
  };
}

export interface LiveChatMessageRetractedDetails {
  retractedMessageId?: string;
}

/**
 * Additional options for YouTube#liveChatMessagesDelete.
 */
export interface LiveChatMessagesDeleteOptions {
  id: string;
}

/**
 * Additional options for YouTube#liveChatMessagesInsert.
 */
export interface LiveChatMessagesInsertOptions {
  /**
   * The *part* parameter serves two purposes. It identifies the properties
   * that the write operation will set as well as the properties that the API
   * response will include. Set the parameter value to snippet.
   */
  part: string;
}

/**
 * Additional options for YouTube#liveChatMessagesList.
 */
export interface LiveChatMessagesListOptions {
  /**
   * Specifies the localization language in which the system messages should be
   * returned.
   */
  hl?: string;
  /**
   * The id of the live chat for which comments should be returned.
   */
  liveChatId: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken property
   * identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies the liveChatComment resource parts that the
   * API response will include. Supported values are id and snippet.
   */
  part: string;
  /**
   * Specifies the size of the profile image that should be returned for each
   * user.
   */
  profileImageSize?: number;
}

/**
 * Next ID: 33
 */
export interface LiveChatMessageSnippet {
  /**
   * The ID of the user that authored this message, this field is not always
   * filled. textMessageEvent - the user that wrote the message fanFundingEvent
   * - the user that funded the broadcast newSponsorEvent - the user that just
   * became a sponsor memberMilestoneChatEvent - the member that sent the
   * message membershipGiftingEvent - the user that made the purchase
   * giftMembershipReceivedEvent - the user that received the gift membership
   * messageDeletedEvent - the moderator that took the action
   * messageRetractedEvent - the author that retracted their message
   * userBannedEvent - the moderator that took the action superChatEvent - the
   * user that made the purchase superStickerEvent - the user that made the
   * purchase
   */
  authorChannelId?: string;
  /**
   * Contains a string that can be displayed to the user. If this field is not
   * present the message is silent, at the moment only messages of type
   * TOMBSTONE and CHAT_ENDED_EVENT are silent.
   */
  displayMessage?: string;
  /**
   * Details about the funding event, this is only set if the type is
   * 'fanFundingEvent'.
   */
  fanFundingEventDetails?: LiveChatFanFundingEventDetails;
  /**
   * Details about the Gift Membership Received event, this is only set if the
   * type is 'giftMembershipReceivedEvent'.
   */
  giftMembershipReceivedDetails?: LiveChatGiftMembershipReceivedDetails;
  /**
   * Whether the message has display content that should be displayed to users.
   */
  hasDisplayContent?: boolean;
  liveChatId?: string;
  /**
   * Details about the Member Milestone Chat event, this is only set if the
   * type is 'memberMilestoneChatEvent'.
   */
  memberMilestoneChatDetails?: LiveChatMemberMilestoneChatDetails;
  /**
   * Details about the Membership Gifting event, this is only set if the type
   * is 'membershipGiftingEvent'.
   */
  membershipGiftingDetails?: LiveChatMembershipGiftingDetails;
  messageDeletedDetails?: LiveChatMessageDeletedDetails;
  messageRetractedDetails?: LiveChatMessageRetractedDetails;
  /**
   * Details about the New Member Announcement event, this is only set if the
   * type is 'newSponsorEvent'. Please note that "member" is the new term for
   * "sponsor".
   */
  newSponsorDetails?: LiveChatNewSponsorDetails;
  /**
   * The date and time when the message was orignally published.
   */
  publishedAt?: Date;
  /**
   * Details about the Super Chat event, this is only set if the type is
   * 'superChatEvent'.
   */
  superChatDetails?: LiveChatSuperChatDetails;
  /**
   * Details about the Super Sticker event, this is only set if the type is
   * 'superStickerEvent'.
   */
  superStickerDetails?: LiveChatSuperStickerDetails;
  /**
   * Details about the text message, this is only set if the type is
   * 'textMessageEvent'.
   */
  textMessageDetails?: LiveChatTextMessageDetails;
  /**
   * The type of message, this will always be present, it determines the
   * contents of the message as well as which fields will be present.
   */
  type?:  | "invalidType" | "textMessageEvent" | "tombstone" | "fanFundingEvent" | "chatEndedEvent" | "sponsorOnlyModeStartedEvent" | "sponsorOnlyModeEndedEvent" | "newSponsorEvent" | "memberMilestoneChatEvent" | "membershipGiftingEvent" | "giftMembershipReceivedEvent" | "messageDeletedEvent" | "messageRetractedEvent" | "userBannedEvent" | "superChatEvent" | "superStickerEvent";
  userBannedDetails?: LiveChatUserBannedMessageDetails;
}

function serializeLiveChatMessageSnippet(data: any): LiveChatMessageSnippet {
  return {
    ...data,
    fanFundingEventDetails: data["fanFundingEventDetails"] !== undefined ? serializeLiveChatFanFundingEventDetails(data["fanFundingEventDetails"]) : undefined,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
    superChatDetails: data["superChatDetails"] !== undefined ? serializeLiveChatSuperChatDetails(data["superChatDetails"]) : undefined,
    superStickerDetails: data["superStickerDetails"] !== undefined ? serializeLiveChatSuperStickerDetails(data["superStickerDetails"]) : undefined,
    userBannedDetails: data["userBannedDetails"] !== undefined ? serializeLiveChatUserBannedMessageDetails(data["userBannedDetails"]) : undefined,
  };
}

function deserializeLiveChatMessageSnippet(data: any): LiveChatMessageSnippet {
  return {
    ...data,
    fanFundingEventDetails: data["fanFundingEventDetails"] !== undefined ? deserializeLiveChatFanFundingEventDetails(data["fanFundingEventDetails"]) : undefined,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
    superChatDetails: data["superChatDetails"] !== undefined ? deserializeLiveChatSuperChatDetails(data["superChatDetails"]) : undefined,
    superStickerDetails: data["superStickerDetails"] !== undefined ? deserializeLiveChatSuperStickerDetails(data["superStickerDetails"]) : undefined,
    userBannedDetails: data["userBannedDetails"] !== undefined ? deserializeLiveChatUserBannedMessageDetails(data["userBannedDetails"]) : undefined,
  };
}

/**
 * A *liveChatModerator* resource represents a moderator for a YouTube live
 * chat. A chat moderator has the ability to ban/unban users from a chat, remove
 * message, etc.
 */
export interface LiveChatModerator {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube assigns to uniquely identify the moderator.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveChatModerator".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the moderator.
   */
  snippet?: LiveChatModeratorSnippet;
}

export interface LiveChatModeratorListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of moderators that match the request criteria.
   */
  items?: LiveChatModerator[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveChatModeratorListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

/**
 * Additional options for YouTube#liveChatModeratorsDelete.
 */
export interface LiveChatModeratorsDeleteOptions {
  id: string;
}

/**
 * Additional options for YouTube#liveChatModeratorsInsert.
 */
export interface LiveChatModeratorsInsertOptions {
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response returns. Set the parameter value to snippet.
   */
  part: string;
}

/**
 * Additional options for YouTube#liveChatModeratorsList.
 */
export interface LiveChatModeratorsListOptions {
  /**
   * The id of the live chat for which moderators should be returned.
   */
  liveChatId: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies the liveChatModerator resource parts that
   * the API response will include. Supported values are id and snippet.
   */
  part: string;
}

export interface LiveChatModeratorSnippet {
  /**
   * The ID of the live chat this moderator can act on.
   */
  liveChatId?: string;
  /**
   * Details about the moderator.
   */
  moderatorDetails?: ChannelProfileDetails;
}

export interface LiveChatNewSponsorDetails {
  /**
   * If the viewer just had upgraded from a lower level. For viewers that were
   * not members at the time of purchase, this field is false.
   */
  isUpgrade?: boolean;
  /**
   * The name of the Level that the viewer just had joined. The Level names are
   * defined by the YouTube channel offering the Membership. In some situations
   * this field isn't filled.
   */
  memberLevelName?: string;
}

export interface LiveChatSuperChatDetails {
  /**
   * A rendered string that displays the fund amount and currency to the user.
   */
  amountDisplayString?: string;
  /**
   * The amount purchased by the user, in micros (1,750,000 micros = 1.75).
   */
  amountMicros?: bigint;
  /**
   * The currency in which the purchase was made.
   */
  currency?: string;
  /**
   * The tier in which the amount belongs. Lower amounts belong to lower tiers.
   * The lowest tier is 1.
   */
  tier?: number;
  /**
   * The comment added by the user to this Super Chat event.
   */
  userComment?: string;
}

function serializeLiveChatSuperChatDetails(data: any): LiveChatSuperChatDetails {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? String(data["amountMicros"]) : undefined,
  };
}

function deserializeLiveChatSuperChatDetails(data: any): LiveChatSuperChatDetails {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? BigInt(data["amountMicros"]) : undefined,
  };
}

export interface LiveChatSuperStickerDetails {
  /**
   * A rendered string that displays the fund amount and currency to the user.
   */
  amountDisplayString?: string;
  /**
   * The amount purchased by the user, in micros (1,750,000 micros = 1.75).
   */
  amountMicros?: bigint;
  /**
   * The currency in which the purchase was made.
   */
  currency?: string;
  /**
   * Information about the Super Sticker.
   */
  superStickerMetadata?: SuperStickerMetadata;
  /**
   * The tier in which the amount belongs. Lower amounts belong to lower tiers.
   * The lowest tier is 1.
   */
  tier?: number;
}

function serializeLiveChatSuperStickerDetails(data: any): LiveChatSuperStickerDetails {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? String(data["amountMicros"]) : undefined,
  };
}

function deserializeLiveChatSuperStickerDetails(data: any): LiveChatSuperStickerDetails {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? BigInt(data["amountMicros"]) : undefined,
  };
}

export interface LiveChatTextMessageDetails {
  /**
   * The user's message.
   */
  messageText?: string;
}

export interface LiveChatUserBannedMessageDetails {
  /**
   * The duration of the ban. This property is only present if the banType is
   * temporary.
   */
  banDurationSeconds?: bigint;
  /**
   * The details of the user that was banned.
   */
  bannedUserDetails?: ChannelProfileDetails;
  /**
   * The type of ban.
   */
  banType?:  | "permanent" | "temporary";
}

function serializeLiveChatUserBannedMessageDetails(data: any): LiveChatUserBannedMessageDetails {
  return {
    ...data,
    banDurationSeconds: data["banDurationSeconds"] !== undefined ? String(data["banDurationSeconds"]) : undefined,
  };
}

function deserializeLiveChatUserBannedMessageDetails(data: any): LiveChatUserBannedMessageDetails {
  return {
    ...data,
    banDurationSeconds: data["banDurationSeconds"] !== undefined ? BigInt(data["banDurationSeconds"]) : undefined,
  };
}

/**
 * A live stream describes a live ingestion point.
 */
export interface LiveStream {
  /**
   * The cdn object defines the live stream's content delivery network (CDN)
   * settings. These settings provide details about the manner in which you
   * stream your content to YouTube.
   */
  cdn?: CdnSettings;
  /**
   * The content_details object contains information about the stream,
   * including the closed captions ingestion URL.
   */
  contentDetails?: LiveStreamContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube assigns to uniquely identify the stream.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveStream".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the stream, including its
   * channel, title, and description.
   */
  snippet?: LiveStreamSnippet;
  /**
   * The status object contains information about live stream's status.
   */
  status?: LiveStreamStatus;
}

function serializeLiveStream(data: any): LiveStream {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeLiveStreamSnippet(data["snippet"]) : undefined,
    status: data["status"] !== undefined ? serializeLiveStreamStatus(data["status"]) : undefined,
  };
}

function deserializeLiveStream(data: any): LiveStream {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeLiveStreamSnippet(data["snippet"]) : undefined,
    status: data["status"] !== undefined ? deserializeLiveStreamStatus(data["status"]) : undefined,
  };
}

export interface LiveStreamConfigurationIssue {
  /**
   * The long-form description of the issue and how to resolve it.
   */
  description?: string;
  /**
   * The short-form reason for this issue.
   */
  reason?: string;
  /**
   * How severe this issue is to the stream.
   */
  severity?:  | "info" | "warning" | "error";
  /**
   * The kind of error happening.
   */
  type?:  | "gopSizeOver" | "gopSizeLong" | "gopSizeShort" | "openGop" | "badContainer" | "audioBitrateHigh" | "audioBitrateLow" | "audioSampleRate" | "bitrateHigh" | "bitrateLow" | "audioCodec" | "videoCodec" | "noAudioStream" | "noVideoStream" | "multipleVideoStreams" | "multipleAudioStreams" | "audioTooManyChannels" | "interlacedVideo" | "frameRateHigh" | "resolutionMismatch" | "videoCodecMismatch" | "videoInterlaceMismatch" | "videoProfileMismatch" | "videoBitrateMismatch" | "framerateMismatch" | "gopMismatch" | "audioSampleRateMismatch" | "audioStereoMismatch" | "audioCodecMismatch" | "audioBitrateMismatch" | "videoResolutionSuboptimal" | "videoResolutionUnsupported" | "videoIngestionStarved" | "videoIngestionFasterThanRealtime";
}

/**
 * Detailed settings of a stream.
 */
export interface LiveStreamContentDetails {
  /**
   * The ingestion URL where the closed captions of this stream are sent.
   */
  closedCaptionsIngestionUrl?: string;
  /**
   * Indicates whether the stream is reusable, which means that it can be bound
   * to multiple broadcasts. It is common for broadcasters to reuse the same
   * stream for many different broadcasts if those broadcasts occur at different
   * times. If you set this value to false, then the stream will not be
   * reusable, which means that it can only be bound to one broadcast.
   * Non-reusable streams differ from reusable streams in the following ways: -
   * A non-reusable stream can only be bound to one broadcast. - A non-reusable
   * stream might be deleted by an automated process after the broadcast ends. -
   * The liveStreams.list method does not list non-reusable streams if you call
   * the method and set the mine parameter to true. The only way to use that
   * method to retrieve the resource for a non-reusable stream is to use the id
   * parameter to identify the stream.
   */
  isReusable?: boolean;
}

export interface LiveStreamHealthStatus {
  /**
   * The configurations issues on this stream
   */
  configurationIssues?: LiveStreamConfigurationIssue[];
  /**
   * The last time this status was updated (in seconds)
   */
  lastUpdateTimeSeconds?: bigint;
  /**
   * The status code of this stream
   */
  status?:  | "good" | "ok" | "bad" | "noData" | "revoked";
}

function serializeLiveStreamHealthStatus(data: any): LiveStreamHealthStatus {
  return {
    ...data,
    lastUpdateTimeSeconds: data["lastUpdateTimeSeconds"] !== undefined ? String(data["lastUpdateTimeSeconds"]) : undefined,
  };
}

function deserializeLiveStreamHealthStatus(data: any): LiveStreamHealthStatus {
  return {
    ...data,
    lastUpdateTimeSeconds: data["lastUpdateTimeSeconds"] !== undefined ? BigInt(data["lastUpdateTimeSeconds"]) : undefined,
  };
}

export interface LiveStreamListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of live streams that match the request criteria.
   */
  items?: LiveStream[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#liveStreamListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeLiveStreamListResponse(data: any): LiveStreamListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeLiveStream(item))) : undefined,
  };
}

function deserializeLiveStreamListResponse(data: any): LiveStreamListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeLiveStream(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#liveStreamsDelete.
 */
export interface LiveStreamsDeleteOptions {
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
}

/**
 * Additional options for YouTube#liveStreamsInsert.
 */
export interface LiveStreamsInsertOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. The part properties that you can
   * include in the parameter value are id, snippet, cdn, content_details, and
   * status.
   */
  part: string;
}

/**
 * Additional options for YouTube#liveStreamsList.
 */
export interface LiveStreamsListOptions {
  /**
   * Return LiveStreams with the given ids from Stubby or Apiary.
   */
  id?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  mine?: boolean;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * liveStream resource properties that the API response will include. The part
   * names that you can include in the parameter value are id, snippet, cdn, and
   * status.
   */
  part: string;
}

export interface LiveStreamSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel that is
   * transmitting the stream.
   */
  channelId?: string;
  /**
   * The stream's description. The value cannot be longer than 10000
   * characters.
   */
  description?: string;
  isDefaultStream?: boolean;
  /**
   * The date and time that the stream was created.
   */
  publishedAt?: Date;
  /**
   * The stream's title. The value must be between 1 and 128 characters long.
   */
  title?: string;
}

function serializeLiveStreamSnippet(data: any): LiveStreamSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializeLiveStreamSnippet(data: any): LiveStreamSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

/**
 * Brief description of the live stream status.
 */
export interface LiveStreamStatus {
  /**
   * The health status of the stream.
   */
  healthStatus?: LiveStreamHealthStatus;
  streamStatus?:  | "created" | "ready" | "active" | "inactive" | "error";
}

function serializeLiveStreamStatus(data: any): LiveStreamStatus {
  return {
    ...data,
    healthStatus: data["healthStatus"] !== undefined ? serializeLiveStreamHealthStatus(data["healthStatus"]) : undefined,
  };
}

function deserializeLiveStreamStatus(data: any): LiveStreamStatus {
  return {
    ...data,
    healthStatus: data["healthStatus"] !== undefined ? deserializeLiveStreamHealthStatus(data["healthStatus"]) : undefined,
  };
}

/**
 * Additional options for YouTube#liveStreamsUpdate.
 */
export interface LiveStreamsUpdateOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. The part properties that you can
   * include in the parameter value are id, snippet, cdn, and status. Note that
   * this method will override the existing values for all of the mutable
   * properties that are contained in any parts that the parameter value
   * specifies. If the request body does not specify a value for a mutable
   * property, the existing value for that property will be removed.
   */
  part: string;
}

export interface LocalizedProperty {
  default?: string;
  /**
   * The language of the default property.
   */
  defaultLanguage?: LanguageTag;
  localized?: LocalizedString[];
}

export interface LocalizedString {
  language?: string;
  value?: string;
}

/**
 * A *member* resource represents a member for a YouTube channel. A member
 * provides recurring monetary support to a creator and receives special
 * benefits.
 */
export interface Member {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#member".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the member.
   */
  snippet?: MemberSnippet;
}

export interface MemberListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of members that match the request criteria.
   */
  items?: Member[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#memberListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

export interface MembershipsDetails {
  /**
   * Ids of all levels that the user has access to. This includes the currently
   * active level and all other levels that are included because of a higher
   * purchase.
   */
  accessibleLevels?: string[];
  /**
   * Id of the highest level that the user has access to at the moment.
   */
  highestAccessibleLevel?: string;
  /**
   * Display name for the highest level that the user has access to at the
   * moment.
   */
  highestAccessibleLevelDisplayName?: string;
  /**
   * Data about memberships duration without taking into consideration pricing
   * levels.
   */
  membershipsDuration?: MembershipsDuration;
  /**
   * Data about memberships duration on particular pricing levels.
   */
  membershipsDurationAtLevels?: MembershipsDurationAtLevel[];
}

export interface MembershipsDuration {
  /**
   * The date and time when the user became a continuous member across all
   * levels.
   */
  memberSince?: string;
  /**
   * The cumulative time the user has been a member across all levels in
   * complete months (the time is rounded down to the nearest integer).
   */
  memberTotalDurationMonths?: number;
}

export interface MembershipsDurationAtLevel {
  /**
   * Pricing level ID.
   */
  level?: string;
  /**
   * The date and time when the user became a continuous member for the given
   * level.
   */
  memberSince?: string;
  /**
   * The cumulative time the user has been a member for the given level in
   * complete months (the time is rounded down to the nearest integer).
   */
  memberTotalDurationMonths?: number;
}

/**
 * A *membershipsLevel* resource represents an offer made by YouTube creators
 * for their fans. Users can become members of the channel by joining one of the
 * available levels. They will provide recurring monetary support and receives
 * special benefits.
 */
export interface MembershipsLevel {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube assigns to uniquely identify the memberships level.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#membershipsLevelListResponse".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the level.
   */
  snippet?: MembershipsLevelSnippet;
}

export interface MembershipsLevelListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of pricing levels offered by a creator to the fans.
   */
  items?: MembershipsLevel[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#membershipsLevelListResponse".
   */
  kind?: string;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

/**
 * Additional options for YouTube#membershipsLevelsList.
 */
export interface MembershipsLevelsListOptions {
  /**
   * The *part* parameter specifies the membershipsLevel resource parts that
   * the API response will include. Supported values are id and snippet.
   */
  part: string;
}

export interface MembershipsLevelSnippet {
  /**
   * The id of the channel that's offering channel memberships.
   */
  creatorChannelId?: string;
  /**
   * Details about the pricing level.
   */
  levelDetails?: LevelDetails;
}

/**
 * Additional options for YouTube#membersList.
 */
export interface MembersListOptions {
  /**
   * Comma separated list of channel IDs. Only data about members that are part
   * of this list will be included in the response.
   */
  filterByMemberChannelId?: string;
  /**
   * Filter members in the results set to the ones that have access to a level.
   */
  hasAccessToLevel?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Parameter that specifies which channel members to return.
   */
  mode?:  | "listMembersModeUnknown" | "updates" | "all_current";
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies the member resource parts that the API
   * response will include. Set the parameter value to snippet.
   */
  part: string;
}

export interface MemberSnippet {
  /**
   * The id of the channel that's offering memberships.
   */
  creatorChannelId?: string;
  /**
   * Details about the member.
   */
  memberDetails?: ChannelProfileDetails;
  /**
   * Details about the user's membership.
   */
  membershipsDetails?: MembershipsDetails;
}

/**
 * Settings and Info of the monitor stream
 */
export interface MonitorStreamInfo {
  /**
   * If you have set the enableMonitorStream property to true, then this
   * property determines the length of the live broadcast delay.
   */
  broadcastStreamDelayMs?: number;
  /**
   * HTML code that embeds a player that plays the monitor stream.
   */
  embedHtml?: string;
  /**
   * This value determines whether the monitor stream is enabled for the
   * broadcast. If the monitor stream is enabled, then YouTube will broadcast
   * the event content on a special stream intended only for the broadcaster's
   * consumption. The broadcaster can use the stream to review the event content
   * and also to identify the optimal times to insert cuepoints. You need to set
   * this value to true if you intend to have a broadcast delay for your event.
   * *Note:* This property cannot be updated once the broadcast is in the
   * testing or live state.
   */
  enableMonitorStream?: boolean;
}

/**
 * Paging details for lists of resources, including total number of items
 * available and number of resources returned in a single page.
 */
export interface PageInfo {
  /**
   * The number of results included in the API response.
   */
  resultsPerPage?: number;
  /**
   * The total number of results in the result set.
   */
  totalResults?: number;
}

/**
 * A *playlist* resource represents a YouTube playlist. A playlist is a
 * collection of videos that can be viewed sequentially and shared with other
 * users. A playlist can contain up to 200 videos, and YouTube does not limit
 * the number of playlists that each user creates. By default, playlists are
 * publicly visible to other users, but playlists can be public or private.
 * YouTube also uses playlists to identify special collections of videos for a
 * channel, such as: - uploaded videos - favorite videos - positively rated
 * (liked) videos - watch history - watch later To be more specific, these lists
 * are associated with a channel, which is a collection of a person, group, or
 * company's videos, playlists, and other YouTube information. You can retrieve
 * the playlist IDs for each of these lists from the channel resource for a
 * given channel. You can then use the playlistItems.list method to retrieve any
 * of those lists. You can also add or remove items from those lists by calling
 * the playlistItems.insert and playlistItems.delete methods.
 */
export interface Playlist {
  /**
   * The contentDetails object contains information like video count.
   */
  contentDetails?: PlaylistContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the playlist.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#playlist".
   */
  kind?: string;
  /**
   * Localizations for different languages
   */
  localizations?: {
    [key: string]: PlaylistLocalization
  };
  /**
   * The player object contains information that you would use to play the
   * playlist in an embedded player.
   */
  player?: PlaylistPlayer;
  /**
   * The snippet object contains basic details about the playlist, such as its
   * title and description.
   */
  snippet?: PlaylistSnippet;
  /**
   * The status object contains status information for the playlist.
   */
  status?: PlaylistStatus;
}

function serializePlaylist(data: any): Playlist {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializePlaylistSnippet(data["snippet"]) : undefined,
  };
}

function deserializePlaylist(data: any): Playlist {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializePlaylistSnippet(data["snippet"]) : undefined,
  };
}

export interface PlaylistContentDetails {
  /**
   * The number of videos in the playlist.
   */
  itemCount?: number;
}

/**
 * A *playlistItem* resource identifies another resource, such as a video, that
 * is included in a playlist. In addition, the playlistItem resource contains
 * details about the included resource that pertain specifically to how that
 * resource is used in that playlist. YouTube uses playlists to identify special
 * collections of videos for a channel, such as: - uploaded videos - favorite
 * videos - positively rated (liked) videos - watch history - watch later To be
 * more specific, these lists are associated with a channel, which is a
 * collection of a person, group, or company's videos, playlists, and other
 * YouTube information. You can retrieve the playlist IDs for each of these
 * lists from the channel resource for a given channel. You can then use the
 * playlistItems.list method to retrieve any of those lists. You can also add or
 * remove items from those lists by calling the playlistItems.insert and
 * playlistItems.delete methods. For example, if a user gives a positive rating
 * to a video, you would insert that video into the liked videos playlist for
 * that user's channel.
 */
export interface PlaylistItem {
  /**
   * The contentDetails object is included in the resource if the included item
   * is a YouTube video. The object contains additional information about the
   * video.
   */
  contentDetails?: PlaylistItemContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the playlist item.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#playlistItem".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the playlist item, such as
   * its title and position in the playlist.
   */
  snippet?: PlaylistItemSnippet;
  /**
   * The status object contains information about the playlist item's privacy
   * status.
   */
  status?: PlaylistItemStatus;
}

function serializePlaylistItem(data: any): PlaylistItem {
  return {
    ...data,
    contentDetails: data["contentDetails"] !== undefined ? serializePlaylistItemContentDetails(data["contentDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? serializePlaylistItemSnippet(data["snippet"]) : undefined,
  };
}

function deserializePlaylistItem(data: any): PlaylistItem {
  return {
    ...data,
    contentDetails: data["contentDetails"] !== undefined ? deserializePlaylistItemContentDetails(data["contentDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? deserializePlaylistItemSnippet(data["snippet"]) : undefined,
  };
}

export interface PlaylistItemContentDetails {
  /**
   * The time, measured in seconds from the start of the video, when the video
   * should stop playing. (The playlist owner can specify the times when the
   * video should start and stop playing when the video is played in the context
   * of the playlist.) By default, assume that the video.endTime is the end of
   * the video.
   */
  endAt?: string;
  /**
   * A user-generated note for this item.
   */
  note?: string;
  /**
   * The time, measured in seconds from the start of the video, when the video
   * should start playing. (The playlist owner can specify the times when the
   * video should start and stop playing when the video is played in the context
   * of the playlist.) The default value is 0.
   */
  startAt?: string;
  /**
   * The ID that YouTube uses to uniquely identify a video. To retrieve the
   * video resource, set the id query parameter to this value in your API
   * request.
   */
  videoId?: string;
  /**
   * The date and time that the video was published to YouTube.
   */
  videoPublishedAt?: Date;
}

function serializePlaylistItemContentDetails(data: any): PlaylistItemContentDetails {
  return {
    ...data,
    videoPublishedAt: data["videoPublishedAt"] !== undefined ? data["videoPublishedAt"].toISOString() : undefined,
  };
}

function deserializePlaylistItemContentDetails(data: any): PlaylistItemContentDetails {
  return {
    ...data,
    videoPublishedAt: data["videoPublishedAt"] !== undefined ? new Date(data["videoPublishedAt"]) : undefined,
  };
}

export interface PlaylistItemListResponse {
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of playlist items that match the request criteria.
   */
  items?: PlaylistItem[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#playlistItemListResponse". Etag of this resource.
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializePlaylistItemListResponse(data: any): PlaylistItemListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePlaylistItem(item))) : undefined,
  };
}

function deserializePlaylistItemListResponse(data: any): PlaylistItemListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePlaylistItem(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#playlistItemsDelete.
 */
export interface PlaylistItemsDeleteOptions {
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#playlistItemsInsert.
 */
export interface PlaylistItemsInsertOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include.
   */
  part: string;
}

/**
 * Additional options for YouTube#playlistItemsList.
 */
export interface PlaylistItemsListOptions {
  id?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * playlistItem resource properties that the API response will include. If the
   * parameter identifies a property that contains child properties, the child
   * properties will be included in the response. For example, in a playlistItem
   * resource, the snippet property contains numerous fields, including the
   * title, description, position, and resourceId properties. As such, if you
   * set *part=snippet*, the API response will contain all of those properties.
   */
  part: string;
  /**
   * Return the playlist items within the given playlist.
   */
  playlistId?: string;
  /**
   * Return the playlist items associated with the given video ID.
   */
  videoId?: string;
}

/**
 * Basic details about a playlist, including title, description and thumbnails.
 * Basic details of a YouTube Playlist item provided by the author. Next ID: 15
 */
export interface PlaylistItemSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the user that added the item
   * to the playlist.
   */
  channelId?: string;
  /**
   * Channel title for the channel that the playlist item belongs to.
   */
  channelTitle?: string;
  /**
   * The item's description.
   */
  description?: string;
  /**
   * The ID that YouTube uses to uniquely identify thGe playlist that the
   * playlist item is in.
   */
  playlistId?: string;
  /**
   * The order in which the item appears in the playlist. The value uses a
   * zero-based index, so the first item has a position of 0, the second item
   * has a position of 1, and so forth.
   */
  position?: number;
  /**
   * The date and time that the item was added to the playlist.
   */
  publishedAt?: Date;
  /**
   * The id object contains information that can be used to uniquely identify
   * the resource that is included in the playlist as the playlist item.
   */
  resourceId?: ResourceId;
  /**
   * A map of thumbnail images associated with the playlist item. For each
   * object in the map, the key is the name of the thumbnail image, and the
   * value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The item's title.
   */
  title?: string;
  /**
   * Channel id for the channel this video belongs to.
   */
  videoOwnerChannelId?: string;
  /**
   * Channel title for the channel this video belongs to.
   */
  videoOwnerChannelTitle?: string;
}

function serializePlaylistItemSnippet(data: any): PlaylistItemSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializePlaylistItemSnippet(data: any): PlaylistItemSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

/**
 * Information about the playlist item's privacy status.
 */
export interface PlaylistItemStatus {
  /**
   * This resource's privacy status.
   */
  privacyStatus?:  | "public" | "unlisted" | "private";
}

/**
 * Additional options for YouTube#playlistItemsUpdate.
 */
export interface PlaylistItemsUpdateOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. Note that this method will override the
   * existing values for all of the mutable properties that are contained in any
   * parts that the parameter value specifies. For example, a playlist item can
   * specify a start time and end time, which identify the times portion of the
   * video that should play when users watch the video in the playlist. If your
   * request is updating a playlist item that sets these values, and the
   * request's part parameter value includes the contentDetails part, the
   * playlist item's start and end times will be updated to whatever value the
   * request body specifies. If the request body does not specify values, the
   * existing start and end times will be removed and replaced with the default
   * settings.
   */
  part: string;
}

export interface PlaylistListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of playlists that match the request criteria
   */
  items?: Playlist[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#playlistListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializePlaylistListResponse(data: any): PlaylistListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePlaylist(item))) : undefined,
  };
}

function deserializePlaylistListResponse(data: any): PlaylistListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePlaylist(item))) : undefined,
  };
}

/**
 * Playlist localization setting
 */
export interface PlaylistLocalization {
  /**
   * The localized strings for playlist's description.
   */
  description?: string;
  /**
   * The localized strings for playlist's title.
   */
  title?: string;
}

export interface PlaylistPlayer {
  /**
   * An <iframe> tag that embeds a player that will play the playlist.
   */
  embedHtml?: string;
}

/**
 * Additional options for YouTube#playlistsDelete.
 */
export interface PlaylistsDeleteOptions {
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#playlistsInsert.
 */
export interface PlaylistsInsertOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include.
   */
  part: string;
}

/**
 * Additional options for YouTube#playlistsList.
 */
export interface PlaylistsListOptions {
  /**
   * Return the playlists owned by the specified channel ID.
   */
  channelId?: string;
  /**
   * Return content in specified language
   */
  hl?: string;
  /**
   * Return the playlists with the given IDs for Stubby or Apiary.
   */
  id?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Return the playlists owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * playlist resource properties that the API response will include. If the
   * parameter identifies a property that contains child properties, the child
   * properties will be included in the response. For example, in a playlist
   * resource, the snippet property contains properties like author, title,
   * description, tags, and timeCreated. As such, if you set *part=snippet*, the
   * API response will contain all of those properties.
   */
  part: string;
}

/**
 * Basic details about a playlist, including title, description and thumbnails.
 */
export interface PlaylistSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel that published
   * the playlist.
   */
  channelId?: string;
  /**
   * The channel title of the channel that the video belongs to.
   */
  channelTitle?: string;
  /**
   * The language of the playlist's default title and description.
   */
  defaultLanguage?: string;
  /**
   * The playlist's description.
   */
  description?: string;
  /**
   * Localized title and description, read-only.
   */
  localized?: PlaylistLocalization;
  /**
   * The date and time that the playlist was created.
   */
  publishedAt?: Date;
  /**
   * Keyword tags associated with the playlist.
   */
  tags?: string[];
  /**
   * A map of thumbnail images associated with the playlist. For each object in
   * the map, the key is the name of the thumbnail image, and the value is an
   * object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * Note: if the playlist has a custom thumbnail, this field will not be
   * populated. The video id selected by the user that will be used as the
   * thumbnail of this playlist. This field defaults to the first publicly
   * viewable video in the playlist, if: 1. The user has never selected a video
   * to be the thumbnail of the playlist. 2. The user selects a video to be the
   * thumbnail, and then removes that video from the playlist. 3. The user
   * selects a non-owned video to be the thumbnail, but that video becomes
   * private, or gets deleted.
   */
  thumbnailVideoId?: string;
  /**
   * The playlist's title.
   */
  title?: string;
}

function serializePlaylistSnippet(data: any): PlaylistSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializePlaylistSnippet(data: any): PlaylistSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

export interface PlaylistStatus {
  /**
   * The playlist's privacy status.
   */
  privacyStatus?:  | "public" | "unlisted" | "private";
}

/**
 * Additional options for YouTube#playlistsUpdate.
 */
export interface PlaylistsUpdateOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. Note that this method will override the
   * existing values for mutable properties that are contained in any parts that
   * the request body specifies. For example, a playlist's description is
   * contained in the snippet part, which must be included in the request body.
   * If the request does not specify a value for the snippet.description
   * property, the playlist's existing description will be deleted.
   */
  part: string;
}

/**
 * A pair Property / Value.
 */
export interface PropertyValue {
  /**
   * A property.
   */
  property?: string;
  /**
   * The property's value.
   */
  value?: string;
}

export interface RelatedEntity {
  entity?: Entity;
}

/**
 * A resource id is a generic reference that points to another YouTube
 * resource.
 */
export interface ResourceId {
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if
   * that resource is a channel. This property is only present if the
   * resourceId.kind value is youtube#channel.
   */
  channelId?: string;
  /**
   * The type of the API resource.
   */
  kind?: string;
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if
   * that resource is a playlist. This property is only present if the
   * resourceId.kind value is youtube#playlist.
   */
  playlistId?: string;
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if
   * that resource is a video. This property is only present if the
   * resourceId.kind value is youtube#video.
   */
  videoId?: string;
}

/**
 * Additional options for YouTube#searchList.
 */
export interface SearchListOptions {
  /**
   * Filter on resources belonging to this channelId.
   */
  channelId?: string;
  /**
   * Add a filter on the channel search.
   */
  channelType?:  | "channelTypeUnspecified" | "any" | "show";
  /**
   * Filter on the livestream status of the videos.
   */
  eventType?:  | "none" | "upcoming" | "live" | "completed";
  /**
   * Search owned by a content owner.
   */
  forContentOwner?: boolean;
  /**
   * Restrict the search to only retrieve videos uploaded using the project id
   * of the authenticated user.
   */
  forDeveloper?: boolean;
  /**
   * Search for the private videos of the authenticated user.
   */
  forMine?: boolean;
  /**
   * Filter on location of the video
   */
  location?: string;
  /**
   * Filter on distance from the location (specified above).
   */
  locationRadius?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * Sort order of the results.
   */
  order?:  | "searchSortUnspecified" | "date" | "rating" | "viewCount" | "relevance" | "title" | "videoCount";
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * search resource properties that the API response will include. Set the
   * parameter value to snippet.
   */
  part: string;
  /**
   * Filter on resources published after this date.
   */
  publishedAfter?: Date;
  /**
   * Filter on resources published before this date.
   */
  publishedBefore?: Date;
  /**
   * Textual search terms to match.
   */
  q?: string;
  /**
   * Display the content as seen by viewers in this country.
   */
  regionCode?: string;
  /**
   * Search related to a resource.
   */
  relatedToVideoId?: string;
  /**
   * Return results relevant to this language.
   */
  relevanceLanguage?: string;
  /**
   * Indicates whether the search results should include restricted content as
   * well as standard content.
   */
  safeSearch?:  | "safeSearchSettingUnspecified" | "none" | "moderate" | "strict";
  /**
   * Restrict results to a particular topic.
   */
  topicId?: string;
  /**
   * Restrict results to a particular set of resource types from One Platform.
   */
  type?: string;
  /**
   * Filter on the presence of captions on the videos.
   */
  videoCaption?:  | "videoCaptionUnspecified" | "any" | "closedCaption" | "none";
  /**
   * Filter on videos in a specific category.
   */
  videoCategoryId?: string;
  /**
   * Filter on the definition of the videos.
   */
  videoDefinition?:  | "any" | "standard" | "high";
  /**
   * Filter on 3d videos.
   */
  videoDimension?:  | "any" | "2d" | "3d";
  /**
   * Filter on the duration of the videos.
   */
  videoDuration?:  | "videoDurationUnspecified" | "any" | "short" | "medium" | "long";
  /**
   * Filter on embeddable videos.
   */
  videoEmbeddable?:  | "videoEmbeddableUnspecified" | "any" | "true";
  /**
   * Filter on the license of the videos.
   */
  videoLicense?:  | "any" | "youtube" | "creativeCommon";
  /**
   * Filter on syndicated videos.
   */
  videoSyndicated?:  | "videoSyndicatedUnspecified" | "any" | "true";
  /**
   * Filter on videos of a specific type.
   */
  videoType?:  | "videoTypeUnspecified" | "any" | "movie" | "episode";
}

function serializeSearchListOptions(data: any): SearchListOptions {
  return {
    ...data,
    publishedAfter: data["publishedAfter"] !== undefined ? data["publishedAfter"].toISOString() : undefined,
    publishedBefore: data["publishedBefore"] !== undefined ? data["publishedBefore"].toISOString() : undefined,
  };
}

function deserializeSearchListOptions(data: any): SearchListOptions {
  return {
    ...data,
    publishedAfter: data["publishedAfter"] !== undefined ? new Date(data["publishedAfter"]) : undefined,
    publishedBefore: data["publishedBefore"] !== undefined ? new Date(data["publishedBefore"]) : undefined,
  };
}

export interface SearchListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * Pagination information for token pagination.
   */
  items?: SearchResult[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#searchListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  regionCode?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeSearchListResponse(data: any): SearchListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeSearchResult(item))) : undefined,
  };
}

function deserializeSearchListResponse(data: any): SearchListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeSearchResult(item))) : undefined,
  };
}

/**
 * A search result contains information about a YouTube video, channel, or
 * playlist that matches the search parameters specified in an API request.
 * While a search result points to a uniquely identifiable resource, like a
 * video, it does not have its own persistent data.
 */
export interface SearchResult {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The id object contains information that can be used to uniquely identify
   * the resource that matches the search request.
   */
  id?: ResourceId;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#searchResult".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about a search result, such as
   * its title or description. For example, if the search result is a video,
   * then the title will be the video's title and the description will be the
   * video's description.
   */
  snippet?: SearchResultSnippet;
}

function serializeSearchResult(data: any): SearchResult {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeSearchResultSnippet(data["snippet"]) : undefined,
  };
}

function deserializeSearchResult(data: any): SearchResult {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeSearchResultSnippet(data["snippet"]) : undefined,
  };
}

/**
 * Basic details about a search result, including title, description and
 * thumbnails of the item referenced by the search result.
 */
export interface SearchResultSnippet {
  /**
   * The value that YouTube uses to uniquely identify the channel that
   * published the resource that the search result identifies.
   */
  channelId?: string;
  /**
   * The title of the channel that published the resource that the search
   * result identifies.
   */
  channelTitle?: string;
  /**
   * A description of the search result.
   */
  description?: string;
  /**
   * It indicates if the resource (video or channel) has upcoming/active live
   * broadcast content. Or it's "none" if there is not any upcoming/active live
   * broadcasts.
   */
  liveBroadcastContent?:  | "none" | "upcoming" | "live" | "completed";
  /**
   * The creation date and time of the resource that the search result
   * identifies.
   */
  publishedAt?: Date;
  /**
   * A map of thumbnail images associated with the search result. For each
   * object in the map, the key is the name of the thumbnail image, and the
   * value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The title of the search result.
   */
  title?: string;
}

function serializeSearchResultSnippet(data: any): SearchResultSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializeSearchResultSnippet(data: any): SearchResultSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

/**
 * A *subscription* resource contains information about a YouTube user
 * subscription. A subscription notifies a user when new videos are added to a
 * channel or when another user takes one of several actions on YouTube, such as
 * uploading a video, rating a video, or commenting on a video.
 */
export interface Subscription {
  /**
   * The contentDetails object contains basic statistics about the
   * subscription.
   */
  contentDetails?: SubscriptionContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the subscription.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#subscription".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the subscription,
   * including its title and the channel that the user subscribed to.
   */
  snippet?: SubscriptionSnippet;
  /**
   * The subscriberSnippet object contains basic details about the subscriber.
   */
  subscriberSnippet?: SubscriptionSubscriberSnippet;
}

function serializeSubscription(data: any): Subscription {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeSubscriptionSnippet(data["snippet"]) : undefined,
  };
}

function deserializeSubscription(data: any): Subscription {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeSubscriptionSnippet(data["snippet"]) : undefined,
  };
}

/**
 * Details about the content to witch a subscription refers.
 */
export interface SubscriptionContentDetails {
  /**
   * The type of activity this subscription is for (only uploads, everything).
   */
  activityType?:  | "subscriptionActivityTypeUnspecified" | "all" | "uploads";
  /**
   * The number of new items in the subscription since its content was last
   * read.
   */
  newItemCount?: number;
  /**
   * The approximate number of items that the subscription points to.
   */
  totalItemCount?: number;
}

export interface SubscriptionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of subscriptions that match the request criteria.
   */
  items?: Subscription[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#subscriptionListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeSubscriptionListResponse(data: any): SubscriptionListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeSubscription(item))) : undefined,
  };
}

function deserializeSubscriptionListResponse(data: any): SubscriptionListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeSubscription(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#subscriptionsDelete.
 */
export interface SubscriptionsDeleteOptions {
  id: string;
}

/**
 * Additional options for YouTube#subscriptionsInsert.
 */
export interface SubscriptionsInsertOptions {
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include.
   */
  part: string;
}

/**
 * Additional options for YouTube#subscriptionsList.
 */
export interface SubscriptionsListOptions {
  /**
   * Return the subscriptions of the given channel owner.
   */
  channelId?: string;
  /**
   * Return the subscriptions to the subset of these channels that the
   * authenticated user is subscribed to.
   */
  forChannelId?: string;
  /**
   * Return the subscriptions with the given IDs for Stubby or Apiary.
   */
  id?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Flag for returning the subscriptions of the authenticated user.
   */
  mine?: boolean;
  myRecentSubscribers?: boolean;
  /**
   * Return the subscribers of the given channel owner.
   */
  mySubscribers?: boolean;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The order of the returned subscriptions
   */
  order?:  | "subscriptionOrderUnspecified" | "relevance" | "unread" | "alphabetical";
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more
   * subscription resource properties that the API response will include. If the
   * parameter identifies a property that contains child properties, the child
   * properties will be included in the response. For example, in a subscription
   * resource, the snippet property contains other properties, such as a display
   * title for the subscription. If you set *part=snippet*, the API response
   * will also contain all of those nested properties.
   */
  part: string;
}

/**
 * Basic details about a subscription, including title, description and
 * thumbnails of the subscribed item.
 */
export interface SubscriptionSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the subscriber's channel.
   */
  channelId?: string;
  /**
   * Channel title for the channel that the subscription belongs to.
   */
  channelTitle?: string;
  /**
   * The subscription's details.
   */
  description?: string;
  /**
   * The date and time that the subscription was created.
   */
  publishedAt?: Date;
  /**
   * The id object contains information about the channel that the user
   * subscribed to.
   */
  resourceId?: ResourceId;
  /**
   * A map of thumbnail images associated with the video. For each object in
   * the map, the key is the name of the thumbnail image, and the value is an
   * object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The subscription's title.
   */
  title?: string;
}

function serializeSubscriptionSnippet(data: any): SubscriptionSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializeSubscriptionSnippet(data: any): SubscriptionSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

/**
 * Basic details about a subscription's subscriber including title,
 * description, channel ID and thumbnails.
 */
export interface SubscriptionSubscriberSnippet {
  /**
   * The channel ID of the subscriber.
   */
  channelId?: string;
  /**
   * The description of the subscriber.
   */
  description?: string;
  /**
   * Thumbnails for this subscriber.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The title of the subscriber.
   */
  title?: string;
}

/**
 * A `__superChatEvent__` resource represents a Super Chat purchase on a
 * YouTube channel.
 */
export interface SuperChatEvent {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube assigns to uniquely identify the Super Chat event.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * `"youtube#superChatEvent"`.
   */
  kind?: string;
  /**
   * The `snippet` object contains basic details about the Super Chat event.
   */
  snippet?: SuperChatEventSnippet;
}

function serializeSuperChatEvent(data: any): SuperChatEvent {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeSuperChatEventSnippet(data["snippet"]) : undefined,
  };
}

function deserializeSuperChatEvent(data: any): SuperChatEvent {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeSuperChatEventSnippet(data["snippet"]) : undefined,
  };
}

export interface SuperChatEventListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of Super Chat purchases that match the request criteria.
   */
  items?: SuperChatEvent[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#superChatEventListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeSuperChatEventListResponse(data: any): SuperChatEventListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeSuperChatEvent(item))) : undefined,
  };
}

function deserializeSuperChatEventListResponse(data: any): SuperChatEventListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeSuperChatEvent(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#superChatEventsList.
 */
export interface SuperChatEventsListOptions {
  /**
   * Return rendered funding amounts in specified language.
   */
  hl?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies the superChatEvent resource parts that the
   * API response will include. This parameter is currently not supported.
   */
  part: string;
}

export interface SuperChatEventSnippet {
  /**
   * The purchase amount, in micros of the purchase currency. e.g., 1 is
   * represented as 1000000.
   */
  amountMicros?: bigint;
  /**
   * Channel id where the event occurred.
   */
  channelId?: string;
  /**
   * The text contents of the comment left by the user.
   */
  commentText?: string;
  /**
   * The date and time when the event occurred.
   */
  createdAt?: Date;
  /**
   * The currency in which the purchase was made. ISO 4217.
   */
  currency?: string;
  /**
   * A rendered string that displays the purchase amount and currency (e.g.,
   * "$1.00"). The string is rendered for the given language.
   */
  displayString?: string;
  /**
   * True if this event is a Super Sticker event.
   */
  isSuperStickerEvent?: boolean;
  /**
   * The tier for the paid message, which is based on the amount of money spent
   * to purchase the message.
   */
  messageType?: number;
  /**
   * If this event is a Super Sticker event, this field will contain metadata
   * about the Super Sticker.
   */
  superStickerMetadata?: SuperStickerMetadata;
  /**
   * Details about the supporter.
   */
  supporterDetails?: ChannelProfileDetails;
}

function serializeSuperChatEventSnippet(data: any): SuperChatEventSnippet {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? String(data["amountMicros"]) : undefined,
    createdAt: data["createdAt"] !== undefined ? data["createdAt"].toISOString() : undefined,
  };
}

function deserializeSuperChatEventSnippet(data: any): SuperChatEventSnippet {
  return {
    ...data,
    amountMicros: data["amountMicros"] !== undefined ? BigInt(data["amountMicros"]) : undefined,
    createdAt: data["createdAt"] !== undefined ? new Date(data["createdAt"]) : undefined,
  };
}

export interface SuperStickerMetadata {
  /**
   * Internationalized alt text that describes the sticker image and any
   * animation associated with it.
   */
  altText?: string;
  /**
   * Specifies the localization language in which the alt text is returned.
   */
  altTextLanguage?: string;
  /**
   * Unique identifier of the Super Sticker. This is a shorter form of the
   * alt_text that includes pack name and a recognizable characteristic of the
   * sticker.
   */
  stickerId?: string;
}

export interface TestItem {
  featuredPart?: boolean;
  gaia?: bigint;
  id?: string;
  snippet?: TestItemTestItemSnippet;
}

function serializeTestItem(data: any): TestItem {
  return {
    ...data,
    gaia: data["gaia"] !== undefined ? String(data["gaia"]) : undefined,
  };
}

function deserializeTestItem(data: any): TestItem {
  return {
    ...data,
    gaia: data["gaia"] !== undefined ? BigInt(data["gaia"]) : undefined,
  };
}

export interface TestItemTestItemSnippet {
}

/**
 * Additional options for YouTube#testsInsert.
 */
export interface TestsInsertOptions {
  externalChannelId?: string;
  part: string;
}

/**
 * A *third party account link* resource represents a link between a YouTube
 * account or a channel and an account on a third-party service.
 */
export interface ThirdPartyLink {
  /**
   * Etag of this resource
   */
  etag?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#thirdPartyLink".
   */
  kind?: string;
  /**
   * The linking_token identifies a YouTube account and channel with which the
   * third party account is linked.
   */
  linkingToken?: string;
  /**
   * The snippet object contains basic details about the third- party account
   * link.
   */
  snippet?: ThirdPartyLinkSnippet;
  /**
   * The status object contains information about the status of the link.
   */
  status?: ThirdPartyLinkStatus;
}

function serializeThirdPartyLink(data: any): ThirdPartyLink {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? serializeThirdPartyLinkSnippet(data["snippet"]) : undefined,
  };
}

function deserializeThirdPartyLink(data: any): ThirdPartyLink {
  return {
    ...data,
    snippet: data["snippet"] !== undefined ? deserializeThirdPartyLinkSnippet(data["snippet"]) : undefined,
  };
}

export interface ThirdPartyLinkListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  items?: ThirdPartyLink[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#thirdPartyLinkListResponse".
   */
  kind?: string;
}

function serializeThirdPartyLinkListResponse(data: any): ThirdPartyLinkListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeThirdPartyLink(item))) : undefined,
  };
}

function deserializeThirdPartyLinkListResponse(data: any): ThirdPartyLinkListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeThirdPartyLink(item))) : undefined,
  };
}

/**
 * Additional options for YouTube#thirdPartyLinksDelete.
 */
export interface ThirdPartyLinksDeleteOptions {
  /**
   * Channel ID to which changes should be applied, for delegation.
   */
  externalChannelId?: string;
  /**
   * Delete the partner links with the given linking token.
   */
  linkingToken: string;
  /**
   * Do not use. Required for compatibility.
   */
  part?: string;
  /**
   * Type of the link to be deleted.
   */
  type:  | "linkUnspecified" | "channelToStoreLink";
}

/**
 * Additional options for YouTube#thirdPartyLinksInsert.
 */
export interface ThirdPartyLinksInsertOptions {
  /**
   * Channel ID to which changes should be applied, for delegation.
   */
  externalChannelId?: string;
  /**
   * The *part* parameter specifies the thirdPartyLink resource parts that the
   * API request and response will include. Supported values are linkingToken,
   * status, and snippet.
   */
  part: string;
}

/**
 * Additional options for YouTube#thirdPartyLinksList.
 */
export interface ThirdPartyLinksListOptions {
  /**
   * Channel ID to which changes should be applied, for delegation.
   */
  externalChannelId?: string;
  /**
   * Get a third party link with the given linking token.
   */
  linkingToken?: string;
  /**
   * The *part* parameter specifies the thirdPartyLink resource parts that the
   * API response will include. Supported values are linkingToken, status, and
   * snippet.
   */
  part: string;
  /**
   * Get a third party link of the given type.
   */
  type?:  | "linkUnspecified" | "channelToStoreLink";
}

/**
 * Basic information about a third party account link, including its type and
 * type-specific information.
 */
export interface ThirdPartyLinkSnippet {
  /**
   * Information specific to a link between a channel and a store on a
   * merchandising platform.
   */
  channelToStoreLink?: ChannelToStoreLinkDetails;
  /**
   * Type of the link named after the entities that are being linked.
   */
  type?:  | "linkUnspecified" | "channelToStoreLink";
}

function serializeThirdPartyLinkSnippet(data: any): ThirdPartyLinkSnippet {
  return {
    ...data,
    channelToStoreLink: data["channelToStoreLink"] !== undefined ? serializeChannelToStoreLinkDetails(data["channelToStoreLink"]) : undefined,
  };
}

function deserializeThirdPartyLinkSnippet(data: any): ThirdPartyLinkSnippet {
  return {
    ...data,
    channelToStoreLink: data["channelToStoreLink"] !== undefined ? deserializeChannelToStoreLinkDetails(data["channelToStoreLink"]) : undefined,
  };
}

/**
 * The third-party link status object contains information about the status of
 * the link.
 */
export interface ThirdPartyLinkStatus {
  linkStatus?:  | "unknown" | "failed" | "pending" | "linked";
}

/**
 * Additional options for YouTube#thirdPartyLinksUpdate.
 */
export interface ThirdPartyLinksUpdateOptions {
  /**
   * Channel ID to which changes should be applied, for delegation.
   */
  externalChannelId?: string;
  /**
   * The *part* parameter specifies the thirdPartyLink resource parts that the
   * API request and response will include. Supported values are linkingToken,
   * status, and snippet.
   */
  part: string;
}

/**
 * A thumbnail is an image representing a YouTube resource.
 */
export interface Thumbnail {
  /**
   * (Optional) Height of the thumbnail image.
   */
  height?: number;
  /**
   * The thumbnail image's URL.
   */
  url?: string;
  /**
   * (Optional) Width of the thumbnail image.
   */
  width?: number;
}

/**
 * Internal representation of thumbnails for a YouTube resource.
 */
export interface ThumbnailDetails {
  /**
   * The default image for this resource.
   */
  default?: Thumbnail;
  /**
   * The high quality image for this resource.
   */
  high?: Thumbnail;
  /**
   * The maximum resolution quality image for this resource.
   */
  maxres?: Thumbnail;
  /**
   * The medium quality image for this resource.
   */
  medium?: Thumbnail;
  /**
   * The standard quality image for this resource.
   */
  standard?: Thumbnail;
}

export interface ThumbnailSetResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of thumbnails.
   */
  items?: ThumbnailDetails[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#thumbnailSetResponse".
   */
  kind?: string;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

/**
 * Additional options for YouTube#thumbnailsSet.
 */
export interface ThumbnailsSetOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * Returns the Thumbnail with the given video IDs for Stubby or Apiary.
   */
  videoId: string;
}

/**
 * Stub token pagination template to suppress results.
 */
export interface TokenPagination {
}

/**
 * A *video* resource represents a YouTube video.
 */
export interface Video {
  /**
   * Age restriction details related to a video. This data can only be
   * retrieved by the video owner.
   */
  ageGating?: VideoAgeGating;
  /**
   * The contentDetails object contains information about the video content,
   * including the length of the video and its aspect ratio.
   */
  contentDetails?: VideoContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The fileDetails object encapsulates information about the video file that
   * was uploaded to YouTube, including the file's resolution, duration, audio
   * and video codecs, stream bitrates, and more. This data can only be
   * retrieved by the video owner.
   */
  fileDetails?: VideoFileDetails;
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#video".
   */
  kind?: string;
  /**
   * The liveStreamingDetails object contains metadata about a live video
   * broadcast. The object will only be present in a video resource if the video
   * is an upcoming, live, or completed live broadcast.
   */
  liveStreamingDetails?: VideoLiveStreamingDetails;
  /**
   * The localizations object contains localized versions of the basic details
   * about the video, such as its title and description.
   */
  localizations?: {
    [key: string]: VideoLocalization
  };
  /**
   * The monetizationDetails object encapsulates information about the
   * monetization status of the video.
   */
  monetizationDetails?: VideoMonetizationDetails;
  /**
   * The player object contains information that you would use to play the
   * video in an embedded player.
   */
  player?: VideoPlayer;
  /**
   * The processingDetails object encapsulates information about YouTube's
   * progress in processing the uploaded video file. The properties in the
   * object identify the current processing status and an estimate of the time
   * remaining until YouTube finishes processing the video. This part also
   * indicates whether different types of data or content, such as file details
   * or thumbnail images, are available for the video. The processingProgress
   * object is designed to be polled so that the video uploaded can track the
   * progress that YouTube has made in processing the uploaded video file. This
   * data can only be retrieved by the video owner.
   */
  processingDetails?: VideoProcessingDetails;
  /**
   * The projectDetails object contains information about the project specific
   * video metadata. b/157517979: This part was never populated after it was
   * added. However, it sees non-zero traffic because there is generated client
   * code in the wild that refers to it [1]. We keep this field and do NOT
   * remove it because otherwise V3 would return an error when this part gets
   * requested [2]. [1]
   * https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html
   * [2]
   * http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677
   */
  projectDetails?: VideoProjectDetails;
  /**
   * The recordingDetails object encapsulates information about the location,
   * date and address where the video was recorded.
   */
  recordingDetails?: VideoRecordingDetails;
  /**
   * The snippet object contains basic details about the video, such as its
   * title, description, and category.
   */
  snippet?: VideoSnippet;
  /**
   * The statistics object contains statistics about the video.
   */
  statistics?: VideoStatistics;
  /**
   * The status object contains information about the video's uploading,
   * processing, and privacy statuses.
   */
  status?: VideoStatus;
  /**
   * The suggestions object encapsulates suggestions that identify
   * opportunities to improve the video quality or the metadata for the uploaded
   * video. This data can only be retrieved by the video owner.
   */
  suggestions?: VideoSuggestions;
  /**
   * The topicDetails object encapsulates information about Freebase topics
   * associated with the video.
   */
  topicDetails?: VideoTopicDetails;
}

function serializeVideo(data: any): Video {
  return {
    ...data,
    fileDetails: data["fileDetails"] !== undefined ? serializeVideoFileDetails(data["fileDetails"]) : undefined,
    liveStreamingDetails: data["liveStreamingDetails"] !== undefined ? serializeVideoLiveStreamingDetails(data["liveStreamingDetails"]) : undefined,
    player: data["player"] !== undefined ? serializeVideoPlayer(data["player"]) : undefined,
    processingDetails: data["processingDetails"] !== undefined ? serializeVideoProcessingDetails(data["processingDetails"]) : undefined,
    recordingDetails: data["recordingDetails"] !== undefined ? serializeVideoRecordingDetails(data["recordingDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? serializeVideoSnippet(data["snippet"]) : undefined,
    statistics: data["statistics"] !== undefined ? serializeVideoStatistics(data["statistics"]) : undefined,
    status: data["status"] !== undefined ? serializeVideoStatus(data["status"]) : undefined,
  };
}

function deserializeVideo(data: any): Video {
  return {
    ...data,
    fileDetails: data["fileDetails"] !== undefined ? deserializeVideoFileDetails(data["fileDetails"]) : undefined,
    liveStreamingDetails: data["liveStreamingDetails"] !== undefined ? deserializeVideoLiveStreamingDetails(data["liveStreamingDetails"]) : undefined,
    player: data["player"] !== undefined ? deserializeVideoPlayer(data["player"]) : undefined,
    processingDetails: data["processingDetails"] !== undefined ? deserializeVideoProcessingDetails(data["processingDetails"]) : undefined,
    recordingDetails: data["recordingDetails"] !== undefined ? deserializeVideoRecordingDetails(data["recordingDetails"]) : undefined,
    snippet: data["snippet"] !== undefined ? deserializeVideoSnippet(data["snippet"]) : undefined,
    statistics: data["statistics"] !== undefined ? deserializeVideoStatistics(data["statistics"]) : undefined,
    status: data["status"] !== undefined ? deserializeVideoStatus(data["status"]) : undefined,
  };
}

export interface VideoAbuseReport {
  /**
   * Additional comments regarding the abuse report.
   */
  comments?: string;
  /**
   * The language that the content was viewed in.
   */
  language?: string;
  /**
   * The high-level, or primary, reason that the content is abusive. The value
   * is an abuse report reason ID.
   */
  reasonId?: string;
  /**
   * The specific, or secondary, reason that this content is abusive (if
   * available). The value is an abuse report reason ID that is a valid
   * secondary reason for the primary reason.
   */
  secondaryReasonId?: string;
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  videoId?: string;
}

/**
 * A `__videoAbuseReportReason__` resource identifies a reason that a video
 * could be reported as abusive. Video abuse report reasons are used with
 * `video.ReportAbuse`.
 */
export interface VideoAbuseReportReason {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID of this abuse report reason.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * `"youtube#videoAbuseReportReason"`.
   */
  kind?: string;
  /**
   * The `snippet` object contains basic details about the abuse report reason.
   */
  snippet?: VideoAbuseReportReasonSnippet;
}

export interface VideoAbuseReportReasonListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of valid abuse reasons that are used with `video.ReportAbuse`.
   */
  items?: VideoAbuseReportReason[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * `"youtube#videoAbuseReportReasonListResponse"`.
   */
  kind?: string;
  /**
   * The `visitorId` identifies the visitor.
   */
  visitorId?: string;
}

/**
 * Additional options for YouTube#videoAbuseReportReasonsList.
 */
export interface VideoAbuseReportReasonsListOptions {
  hl?: string;
  /**
   * The *part* parameter specifies the videoCategory resource parts that the
   * API response will include. Supported values are id and snippet.
   */
  part: string;
}

/**
 * Basic details about a video category, such as its localized title.
 */
export interface VideoAbuseReportReasonSnippet {
  /**
   * The localized label belonging to this abuse report reason.
   */
  label?: string;
  /**
   * The secondary reasons associated with this reason, if any are available.
   * (There might be 0 or more.)
   */
  secondaryReasons?: VideoAbuseReportSecondaryReason[];
}

export interface VideoAbuseReportSecondaryReason {
  /**
   * The ID of this abuse report secondary reason.
   */
  id?: string;
  /**
   * The localized label for this abuse report secondary reason.
   */
  label?: string;
}

export interface VideoAgeGating {
  /**
   * Indicates whether or not the video has alcoholic beverage content. Only
   * users of legal purchasing age in a particular country, as identified by
   * ICAP, can view the content.
   */
  alcoholContent?: boolean;
  /**
   * Age-restricted trailers. For redband trailers and adult-rated video-games.
   * Only users aged 18+ can view the content. The the field is true the content
   * is restricted to viewers aged 18+. Otherwise The field won't be present.
   */
  restricted?: boolean;
  /**
   * Video game rating, if any.
   */
  videoGameRating?:  | "anyone" | "m15Plus" | "m16Plus" | "m17Plus";
}

/**
 * Additional options for YouTube#videoCategoriesList.
 */
export interface VideoCategoriesListOptions {
  hl?: string;
  /**
   * Returns the video categories with the given IDs for Stubby or Apiary.
   */
  id?: string;
  /**
   * The *part* parameter specifies the videoCategory resource properties that
   * the API response will include. Set the parameter value to snippet.
   */
  part: string;
  regionCode?: string;
}

/**
 * A *videoCategory* resource identifies a category that has been or could be
 * associated with uploaded videos.
 */
export interface VideoCategory {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * The ID that YouTube uses to uniquely identify the video category.
   */
  id?: string;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#videoCategory".
   */
  kind?: string;
  /**
   * The snippet object contains basic details about the video category,
   * including its title.
   */
  snippet?: VideoCategorySnippet;
}

export interface VideoCategoryListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of video categories that can be associated with YouTube videos. In
   * this map, the video category ID is the map key, and its value is the
   * corresponding videoCategory resource.
   */
  items?: VideoCategory[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#videoCategoryListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

/**
 * Basic details about a video category, such as its localized title.
 */
export interface VideoCategorySnippet {
  assignable?: boolean;
  /**
   * The YouTube channel that created the video category.
   */
  channelId?: string;
  /**
   * The video category's title.
   */
  title?: string;
}

/**
 * Details about the content of a YouTube Video.
 */
export interface VideoContentDetails {
  /**
   * The value of captions indicates whether the video has captions or not.
   */
  caption?:  | "true" | "false";
  /**
   * Specifies the ratings that the video received under various rating
   * schemes.
   */
  contentRating?: ContentRating;
  /**
   * The countryRestriction object contains information about the countries
   * where a video is (or is not) viewable.
   */
  countryRestriction?: AccessPolicy;
  /**
   * The value of definition indicates whether the video is available in high
   * definition or only in standard definition.
   */
  definition?:  | "sd" | "hd";
  /**
   * The value of dimension indicates whether the video is available in 3D or
   * in 2D.
   */
  dimension?: string;
  /**
   * The length of the video. The tag value is an ISO 8601 duration in the
   * format PT#M#S, in which the letters PT indicate that the value specifies a
   * period of time, and the letters M and S refer to length in minutes and
   * seconds, respectively. The # characters preceding the M and S letters are
   * both integers that specify the number of minutes (or seconds) of the video.
   * For example, a value of PT15M51S indicates that the video is 15 minutes and
   * 51 seconds long.
   */
  duration?: string;
  /**
   * Indicates whether the video uploader has provided a custom thumbnail image
   * for the video. This property is only visible to the video uploader.
   */
  hasCustomThumbnail?: boolean;
  /**
   * The value of is_license_content indicates whether the video is licensed
   * content.
   */
  licensedContent?: boolean;
  /**
   * Specifies the projection format of the video.
   */
  projection?:  | "rectangular" | "360";
  /**
   * The regionRestriction object contains information about the countries
   * where a video is (or is not) viewable. The object will contain either the
   * contentDetails.regionRestriction.allowed property or the
   * contentDetails.regionRestriction.blocked property.
   */
  regionRestriction?: VideoContentDetailsRegionRestriction;
}

/**
 * DEPRECATED Region restriction of the video.
 */
export interface VideoContentDetailsRegionRestriction {
  /**
   * A list of region codes that identify countries where the video is
   * viewable. If this property is present and a country is not listed in its
   * value, then the video is blocked from appearing in that country. If this
   * property is present and contains an empty list, the video is blocked in all
   * countries.
   */
  allowed?: string[];
  /**
   * A list of region codes that identify countries where the video is blocked.
   * If this property is present and a country is not listed in its value, then
   * the video is viewable in that country. If this property is present and
   * contains an empty list, the video is viewable in all countries.
   */
  blocked?: string[];
}

/**
 * Describes original video file properties, including technical details about
 * audio and video streams, but also metadata information like content length,
 * digitization time, or geotagging information.
 */
export interface VideoFileDetails {
  /**
   * A list of audio streams contained in the uploaded video file. Each item in
   * the list contains detailed metadata about an audio stream.
   */
  audioStreams?: VideoFileDetailsAudioStream[];
  /**
   * The uploaded video file's combined (video and audio) bitrate in bits per
   * second.
   */
  bitrateBps?: bigint;
  /**
   * The uploaded video file's container format.
   */
  container?: string;
  /**
   * The date and time when the uploaded video file was created. The value is
   * specified in ISO 8601 format. Currently, the following ISO 8601 formats are
   * supported: - Date only: YYYY-MM-DD - Naive time: YYYY-MM-DDTHH:MM:SS - Time
   * with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM
   */
  creationTime?: string;
  /**
   * The length of the uploaded video in milliseconds.
   */
  durationMs?: bigint;
  /**
   * The uploaded file's name. This field is present whether a video file or
   * another type of file was uploaded.
   */
  fileName?: string;
  /**
   * The uploaded file's size in bytes. This field is present whether a video
   * file or another type of file was uploaded.
   */
  fileSize?: bigint;
  /**
   * The uploaded file's type as detected by YouTube's video processing engine.
   * Currently, YouTube only processes video files, but this field is present
   * whether a video file or another type of file was uploaded.
   */
  fileType?:  | "video" | "audio" | "image" | "archive" | "document" | "project" | "other";
  /**
   * A list of video streams contained in the uploaded video file. Each item in
   * the list contains detailed metadata about a video stream.
   */
  videoStreams?: VideoFileDetailsVideoStream[];
}

function serializeVideoFileDetails(data: any): VideoFileDetails {
  return {
    ...data,
    audioStreams: data["audioStreams"] !== undefined ? data["audioStreams"].map((item: any) => (serializeVideoFileDetailsAudioStream(item))) : undefined,
    bitrateBps: data["bitrateBps"] !== undefined ? String(data["bitrateBps"]) : undefined,
    durationMs: data["durationMs"] !== undefined ? String(data["durationMs"]) : undefined,
    fileSize: data["fileSize"] !== undefined ? String(data["fileSize"]) : undefined,
    videoStreams: data["videoStreams"] !== undefined ? data["videoStreams"].map((item: any) => (serializeVideoFileDetailsVideoStream(item))) : undefined,
  };
}

function deserializeVideoFileDetails(data: any): VideoFileDetails {
  return {
    ...data,
    audioStreams: data["audioStreams"] !== undefined ? data["audioStreams"].map((item: any) => (deserializeVideoFileDetailsAudioStream(item))) : undefined,
    bitrateBps: data["bitrateBps"] !== undefined ? BigInt(data["bitrateBps"]) : undefined,
    durationMs: data["durationMs"] !== undefined ? BigInt(data["durationMs"]) : undefined,
    fileSize: data["fileSize"] !== undefined ? BigInt(data["fileSize"]) : undefined,
    videoStreams: data["videoStreams"] !== undefined ? data["videoStreams"].map((item: any) => (deserializeVideoFileDetailsVideoStream(item))) : undefined,
  };
}

/**
 * Information about an audio stream.
 */
export interface VideoFileDetailsAudioStream {
  /**
   * The audio stream's bitrate, in bits per second.
   */
  bitrateBps?: bigint;
  /**
   * The number of audio channels that the stream contains.
   */
  channelCount?: number;
  /**
   * The audio codec that the stream uses.
   */
  codec?: string;
  /**
   * A value that uniquely identifies a video vendor. Typically, the value is a
   * four-letter vendor code.
   */
  vendor?: string;
}

function serializeVideoFileDetailsAudioStream(data: any): VideoFileDetailsAudioStream {
  return {
    ...data,
    bitrateBps: data["bitrateBps"] !== undefined ? String(data["bitrateBps"]) : undefined,
  };
}

function deserializeVideoFileDetailsAudioStream(data: any): VideoFileDetailsAudioStream {
  return {
    ...data,
    bitrateBps: data["bitrateBps"] !== undefined ? BigInt(data["bitrateBps"]) : undefined,
  };
}

/**
 * Information about a video stream.
 */
export interface VideoFileDetailsVideoStream {
  /**
   * The video content's display aspect ratio, which specifies the aspect ratio
   * in which the video should be displayed.
   */
  aspectRatio?: number;
  /**
   * The video stream's bitrate, in bits per second.
   */
  bitrateBps?: bigint;
  /**
   * The video codec that the stream uses.
   */
  codec?: string;
  /**
   * The video stream's frame rate, in frames per second.
   */
  frameRateFps?: number;
  /**
   * The encoded video content's height in pixels.
   */
  heightPixels?: number;
  /**
   * The amount that YouTube needs to rotate the original source content to
   * properly display the video.
   */
  rotation?:  | "none" | "clockwise" | "upsideDown" | "counterClockwise" | "other";
  /**
   * A value that uniquely identifies a video vendor. Typically, the value is a
   * four-letter vendor code.
   */
  vendor?: string;
  /**
   * The encoded video content's width in pixels. You can calculate the video's
   * encoding aspect ratio as width_pixels / height_pixels.
   */
  widthPixels?: number;
}

function serializeVideoFileDetailsVideoStream(data: any): VideoFileDetailsVideoStream {
  return {
    ...data,
    bitrateBps: data["bitrateBps"] !== undefined ? String(data["bitrateBps"]) : undefined,
  };
}

function deserializeVideoFileDetailsVideoStream(data: any): VideoFileDetailsVideoStream {
  return {
    ...data,
    bitrateBps: data["bitrateBps"] !== undefined ? BigInt(data["bitrateBps"]) : undefined,
  };
}

export interface VideoGetRatingResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  /**
   * A list of ratings that match the request criteria.
   */
  items?: VideoRating[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#videoGetRatingResponse".
   */
  kind?: string;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

export interface VideoListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string;
  items?: Video[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "youtube#videoListResponse".
   */
  kind?: string;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the next page in the result set.
   */
  nextPageToken?: string;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the pageToken parameter to
   * retrieve the previous page in the result set.
   */
  prevPageToken?: string;
  tokenPagination?: TokenPagination;
  /**
   * The visitorId identifies the visitor.
   */
  visitorId?: string;
}

function serializeVideoListResponse(data: any): VideoListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeVideo(item))) : undefined,
  };
}

function deserializeVideoListResponse(data: any): VideoListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeVideo(item))) : undefined,
  };
}

/**
 * Details about the live streaming metadata.
 */
export interface VideoLiveStreamingDetails {
  /**
   * The ID of the currently active live chat attached to this video. This
   * field is filled only if the video is a currently live broadcast that has
   * live chat. Once the broadcast transitions to complete this field will be
   * removed and the live chat closed down. For persistent broadcasts that live
   * chat id will no longer be tied to this video but rather to the new video
   * being displayed at the persistent page.
   */
  activeLiveChatId?: string;
  /**
   * The time that the broadcast actually ended. This value will not be
   * available until the broadcast is over.
   */
  actualEndTime?: Date;
  /**
   * The time that the broadcast actually started. This value will not be
   * available until the broadcast begins.
   */
  actualStartTime?: Date;
  /**
   * The number of viewers currently watching the broadcast. The property and
   * its value will be present if the broadcast has current viewers and the
   * broadcast owner has not hidden the viewcount for the video. Note that
   * YouTube stops tracking the number of concurrent viewers for a broadcast
   * when the broadcast ends. So, this property would not identify the number of
   * viewers watching an archived video of a live broadcast that already ended.
   */
  concurrentViewers?: bigint;
  /**
   * The time that the broadcast is scheduled to end. If the value is empty or
   * the property is not present, then the broadcast is scheduled to contiue
   * indefinitely.
   */
  scheduledEndTime?: Date;
  /**
   * The time that the broadcast is scheduled to begin.
   */
  scheduledStartTime?: Date;
}

function serializeVideoLiveStreamingDetails(data: any): VideoLiveStreamingDetails {
  return {
    ...data,
    actualEndTime: data["actualEndTime"] !== undefined ? data["actualEndTime"].toISOString() : undefined,
    actualStartTime: data["actualStartTime"] !== undefined ? data["actualStartTime"].toISOString() : undefined,
    concurrentViewers: data["concurrentViewers"] !== undefined ? String(data["concurrentViewers"]) : undefined,
    scheduledEndTime: data["scheduledEndTime"] !== undefined ? data["scheduledEndTime"].toISOString() : undefined,
    scheduledStartTime: data["scheduledStartTime"] !== undefined ? data["scheduledStartTime"].toISOString() : undefined,
  };
}

function deserializeVideoLiveStreamingDetails(data: any): VideoLiveStreamingDetails {
  return {
    ...data,
    actualEndTime: data["actualEndTime"] !== undefined ? new Date(data["actualEndTime"]) : undefined,
    actualStartTime: data["actualStartTime"] !== undefined ? new Date(data["actualStartTime"]) : undefined,
    concurrentViewers: data["concurrentViewers"] !== undefined ? BigInt(data["concurrentViewers"]) : undefined,
    scheduledEndTime: data["scheduledEndTime"] !== undefined ? new Date(data["scheduledEndTime"]) : undefined,
    scheduledStartTime: data["scheduledStartTime"] !== undefined ? new Date(data["scheduledStartTime"]) : undefined,
  };
}

/**
 * Localized versions of certain video properties (e.g. title).
 */
export interface VideoLocalization {
  /**
   * Localized version of the video's description.
   */
  description?: string;
  /**
   * Localized version of the video's title.
   */
  title?: string;
}

/**
 * Details about monetization of a YouTube Video.
 */
export interface VideoMonetizationDetails {
  /**
   * The value of access indicates whether the video can be monetized or not.
   */
  access?: AccessPolicy;
}

/**
 * Player to be used for a video playback.
 */
export interface VideoPlayer {
  embedHeight?: bigint;
  /**
   * An <iframe> tag that embeds a player that will play the video.
   */
  embedHtml?: string;
  /**
   * The embed width
   */
  embedWidth?: bigint;
}

function serializeVideoPlayer(data: any): VideoPlayer {
  return {
    ...data,
    embedHeight: data["embedHeight"] !== undefined ? String(data["embedHeight"]) : undefined,
    embedWidth: data["embedWidth"] !== undefined ? String(data["embedWidth"]) : undefined,
  };
}

function deserializeVideoPlayer(data: any): VideoPlayer {
  return {
    ...data,
    embedHeight: data["embedHeight"] !== undefined ? BigInt(data["embedHeight"]) : undefined,
    embedWidth: data["embedWidth"] !== undefined ? BigInt(data["embedWidth"]) : undefined,
  };
}

/**
 * Describes processing status and progress and availability of some other
 * Video resource parts.
 */
export interface VideoProcessingDetails {
  /**
   * This value indicates whether video editing suggestions, which might
   * improve video quality or the playback experience, are available for the
   * video. You can retrieve these suggestions by requesting the suggestions
   * part in your videos.list() request.
   */
  editorSuggestionsAvailability?: string;
  /**
   * This value indicates whether file details are available for the uploaded
   * video. You can retrieve a video's file details by requesting the
   * fileDetails part in your videos.list() request.
   */
  fileDetailsAvailability?: string;
  /**
   * The reason that YouTube failed to process the video. This property will
   * only have a value if the processingStatus property's value is failed.
   */
  processingFailureReason?:  | "uploadFailed" | "transcodeFailed" | "streamingFailed" | "other";
  /**
   * This value indicates whether the video processing engine has generated
   * suggestions that might improve YouTube's ability to process the the video,
   * warnings that explain video processing problems, or errors that cause video
   * processing problems. You can retrieve these suggestions by requesting the
   * suggestions part in your videos.list() request.
   */
  processingIssuesAvailability?: string;
  /**
   * The processingProgress object contains information about the progress
   * YouTube has made in processing the video. The values are really only
   * relevant if the video's processing status is processing.
   */
  processingProgress?: VideoProcessingDetailsProcessingProgress;
  /**
   * The video's processing status. This value indicates whether YouTube was
   * able to process the video or if the video is still being processed.
   */
  processingStatus?:  | "processing" | "succeeded" | "failed" | "terminated";
  /**
   * This value indicates whether keyword (tag) suggestions are available for
   * the video. Tags can be added to a video's metadata to make it easier for
   * other users to find the video. You can retrieve these suggestions by
   * requesting the suggestions part in your videos.list() request.
   */
  tagSuggestionsAvailability?: string;
  /**
   * This value indicates whether thumbnail images have been generated for the
   * video.
   */
  thumbnailsAvailability?: string;
}

function serializeVideoProcessingDetails(data: any): VideoProcessingDetails {
  return {
    ...data,
    processingProgress: data["processingProgress"] !== undefined ? serializeVideoProcessingDetailsProcessingProgress(data["processingProgress"]) : undefined,
  };
}

function deserializeVideoProcessingDetails(data: any): VideoProcessingDetails {
  return {
    ...data,
    processingProgress: data["processingProgress"] !== undefined ? deserializeVideoProcessingDetailsProcessingProgress(data["processingProgress"]) : undefined,
  };
}

/**
 * Video processing progress and completion time estimate.
 */
export interface VideoProcessingDetailsProcessingProgress {
  /**
   * The number of parts of the video that YouTube has already processed. You
   * can estimate the percentage of the video that YouTube has already processed
   * by calculating: 100 * parts_processed / parts_total Note that since the
   * estimated number of parts could increase without a corresponding increase
   * in the number of parts that have already been processed, it is possible
   * that the calculated progress could periodically decrease while YouTube
   * processes a video.
   */
  partsProcessed?: bigint;
  /**
   * An estimate of the total number of parts that need to be processed for the
   * video. The number may be updated with more precise estimates while YouTube
   * processes the video.
   */
  partsTotal?: bigint;
  /**
   * An estimate of the amount of time, in millseconds, that YouTube needs to
   * finish processing the video.
   */
  timeLeftMs?: bigint;
}

function serializeVideoProcessingDetailsProcessingProgress(data: any): VideoProcessingDetailsProcessingProgress {
  return {
    ...data,
    partsProcessed: data["partsProcessed"] !== undefined ? String(data["partsProcessed"]) : undefined,
    partsTotal: data["partsTotal"] !== undefined ? String(data["partsTotal"]) : undefined,
    timeLeftMs: data["timeLeftMs"] !== undefined ? String(data["timeLeftMs"]) : undefined,
  };
}

function deserializeVideoProcessingDetailsProcessingProgress(data: any): VideoProcessingDetailsProcessingProgress {
  return {
    ...data,
    partsProcessed: data["partsProcessed"] !== undefined ? BigInt(data["partsProcessed"]) : undefined,
    partsTotal: data["partsTotal"] !== undefined ? BigInt(data["partsTotal"]) : undefined,
    timeLeftMs: data["timeLeftMs"] !== undefined ? BigInt(data["timeLeftMs"]) : undefined,
  };
}

/**
 * DEPRECATED. b/157517979: This part was never populated after it was added.
 * However, it sees non-zero traffic because there is generated client code in
 * the wild that refers to it [1]. We keep this field and do NOT remove it
 * because otherwise V3 would return an error when this part gets requested [2].
 * [1]
 * https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html
 * [2]
 * http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677
 */
export interface VideoProjectDetails {
}

/**
 * Basic details about rating of a video.
 */
export interface VideoRating {
  /**
   * Rating of a video.
   */
  rating?:  | "none" | "like" | "dislike";
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  videoId?: string;
}

/**
 * Recording information associated with the video.
 */
export interface VideoRecordingDetails {
  /**
   * The geolocation information associated with the video.
   */
  location?: GeoPoint;
  /**
   * The text description of the location where the video was recorded.
   */
  locationDescription?: string;
  /**
   * The date and time when the video was recorded.
   */
  recordingDate?: Date;
}

function serializeVideoRecordingDetails(data: any): VideoRecordingDetails {
  return {
    ...data,
    recordingDate: data["recordingDate"] !== undefined ? data["recordingDate"].toISOString() : undefined,
  };
}

function deserializeVideoRecordingDetails(data: any): VideoRecordingDetails {
  return {
    ...data,
    recordingDate: data["recordingDate"] !== undefined ? new Date(data["recordingDate"]) : undefined,
  };
}

/**
 * Additional options for YouTube#videosDelete.
 */
export interface VideosDeleteOptions {
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#videosGetRating.
 */
export interface VideosGetRatingOptions {
  id: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#videosInsert.
 */
export interface VideosInsertOptions {
  /**
   * Should auto-levels be applied to the upload.
   */
  autoLevels?: boolean;
  /**
   * Notify the channel subscribers about the new video. As default, the
   * notification is enabled.
   */
  notifySubscribers?: boolean;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly authorized request. *Note:*
   * This parameter is intended exclusively for YouTube content partners. The
   * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID
   * of the channel to which a video is being added. This parameter is required
   * when a request specifies a value for the onBehalfOfContentOwner parameter,
   * and it can only be used in conjunction with that parameter. In addition,
   * the request must be authorized using a CMS account that is linked to the
   * content owner that the onBehalfOfContentOwner parameter specifies. Finally,
   * the channel that the onBehalfOfContentOwnerChannel parameter value
   * specifies must be linked to the content owner that the
   * onBehalfOfContentOwner parameter specifies. This parameter is intended for
   * YouTube content partners that own and manage many different YouTube
   * channels. It allows content owners to authenticate once and perform actions
   * on behalf of the channel specified in the parameter value, without having
   * to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. Note that not all parts contain
   * properties that can be set when inserting or updating a video. For example,
   * the statistics object encapsulates statistics that YouTube calculates for a
   * video and does not contain values that you can set or modify. If the
   * parameter value specifies a part that does not contain mutable values, that
   * part will still be included in the API response.
   */
  part: string;
  /**
   * Should stabilize be applied to the upload.
   */
  stabilize?: boolean;
}

/**
 * Additional options for YouTube#videosList.
 */
export interface VideosListOptions {
  /**
   * Return the videos that are in the specified chart.
   */
  chart?:  | "chartUnspecified" | "mostPopular";
  /**
   * Stands for "host language". Specifies the localization language of the
   * metadata to be filled into snippet.localized. The field is filled with the
   * default metadata if there is no localization in the specified language. The
   * parameter value must be a language code included in the list returned by
   * the i18nLanguages.list method (e.g. en_US, es_MX).
   */
  hl?: string;
  /**
   * Return videos with the given ids.
   */
  id?: string;
  locale?: string;
  maxHeight?: number;
  /**
   * The *maxResults* parameter specifies the maximum number of items that
   * should be returned in the result set. *Note:* This parameter is supported
   * for use in conjunction with the myRating and chart parameters, but it is
   * not supported for use in conjunction with the id parameter.
   */
  maxResults?: number;
  /**
   * Return the player with maximum height specified in
   */
  maxWidth?: number;
  /**
   * Return videos liked/disliked by the authenticated user. Does not support
   * RateType.RATED_TYPE_NONE.
   */
  myRating?:  | "none" | "like" | "dislike";
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *pageToken* parameter identifies a specific page in the result set
   * that should be returned. In an API response, the nextPageToken and
   * prevPageToken properties identify other pages that could be retrieved.
   * *Note:* This parameter is supported for use in conjunction with the
   * myRating and chart parameters, but it is not supported for use in
   * conjunction with the id parameter.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more video
   * resource properties that the API response will include. If the parameter
   * identifies a property that contains child properties, the child properties
   * will be included in the response. For example, in a video resource, the
   * snippet property contains the channelId, title, description, tags, and
   * categoryId properties. As such, if you set *part=snippet*, the API response
   * will contain all of those properties.
   */
  part: string;
  /**
   * Use a chart that is specific to the specified region
   */
  regionCode?: string;
  /**
   * Use chart that is specific to the specified video category
   */
  videoCategoryId?: string;
}

/**
 * Basic details about a video, including title, description, uploader,
 * thumbnails and category.
 */
export interface VideoSnippet {
  /**
   * The YouTube video category associated with the video.
   */
  categoryId?: string;
  /**
   * The ID that YouTube uses to uniquely identify the channel that the video
   * was uploaded to.
   */
  channelId?: string;
  /**
   * Channel title for the channel that the video belongs to.
   */
  channelTitle?: string;
  /**
   * The default_audio_language property specifies the language spoken in the
   * video's default audio track.
   */
  defaultAudioLanguage?: string;
  /**
   * The language of the videos's default snippet.
   */
  defaultLanguage?: string;
  /**
   * The video's description. @mutable youtube.videos.insert
   * youtube.videos.update
   */
  description?: string;
  /**
   * Indicates if the video is an upcoming/active live broadcast. Or it's
   * "none" if the video is not an upcoming/active live broadcast.
   */
  liveBroadcastContent?:  | "none" | "upcoming" | "live" | "completed";
  /**
   * Localized snippet selected with the hl parameter. If no such localization
   * exists, this field is populated with the default snippet. (Read-only)
   */
  localized?: VideoLocalization;
  /**
   * The date and time when the video was uploaded.
   */
  publishedAt?: Date;
  /**
   * A list of keyword tags associated with the video. Tags may contain spaces.
   */
  tags?: string[];
  /**
   * A map of thumbnail images associated with the video. For each object in
   * the map, the key is the name of the thumbnail image, and the value is an
   * object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The video's title. @mutable youtube.videos.insert youtube.videos.update
   */
  title?: string;
}

function serializeVideoSnippet(data: any): VideoSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? data["publishedAt"].toISOString() : undefined,
  };
}

function deserializeVideoSnippet(data: any): VideoSnippet {
  return {
    ...data,
    publishedAt: data["publishedAt"] !== undefined ? new Date(data["publishedAt"]) : undefined,
  };
}

/**
 * Additional options for YouTube#videosRate.
 */
export interface VideosRateOptions {
  id: string;
  rating:  | "none" | "like" | "dislike";
}

/**
 * Additional options for YouTube#videosReportAbuse.
 */
export interface VideosReportAbuseOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Statistics about the video, such as the number of times the video was viewed
 * or liked.
 */
export interface VideoStatistics {
  /**
   * The number of comments for the video.
   */
  commentCount?: bigint;
  /**
   * The number of users who have indicated that they disliked the video by
   * giving it a negative rating.
   */
  dislikeCount?: bigint;
  /**
   * The number of users who currently have the video marked as a favorite
   * video.
   */
  favoriteCount?: bigint;
  /**
   * The number of users who have indicated that they liked the video by giving
   * it a positive rating.
   */
  likeCount?: bigint;
  /**
   * The number of times the video has been viewed.
   */
  viewCount?: bigint;
}

function serializeVideoStatistics(data: any): VideoStatistics {
  return {
    ...data,
    commentCount: data["commentCount"] !== undefined ? String(data["commentCount"]) : undefined,
    dislikeCount: data["dislikeCount"] !== undefined ? String(data["dislikeCount"]) : undefined,
    favoriteCount: data["favoriteCount"] !== undefined ? String(data["favoriteCount"]) : undefined,
    likeCount: data["likeCount"] !== undefined ? String(data["likeCount"]) : undefined,
    viewCount: data["viewCount"] !== undefined ? String(data["viewCount"]) : undefined,
  };
}

function deserializeVideoStatistics(data: any): VideoStatistics {
  return {
    ...data,
    commentCount: data["commentCount"] !== undefined ? BigInt(data["commentCount"]) : undefined,
    dislikeCount: data["dislikeCount"] !== undefined ? BigInt(data["dislikeCount"]) : undefined,
    favoriteCount: data["favoriteCount"] !== undefined ? BigInt(data["favoriteCount"]) : undefined,
    likeCount: data["likeCount"] !== undefined ? BigInt(data["likeCount"]) : undefined,
    viewCount: data["viewCount"] !== undefined ? BigInt(data["viewCount"]) : undefined,
  };
}

/**
 * Basic details about a video category, such as its localized title. Next Id:
 * 18
 */
export interface VideoStatus {
  /**
   * This value indicates if the video can be embedded on another website.
   * @mutable youtube.videos.insert youtube.videos.update
   */
  embeddable?: boolean;
  /**
   * This value explains why a video failed to upload. This property is only
   * present if the uploadStatus property indicates that the upload failed.
   */
  failureReason?:  | "conversion" | "invalidFile" | "emptyFile" | "tooSmall" | "codec" | "uploadAborted";
  /**
   * The video's license. @mutable youtube.videos.insert youtube.videos.update
   */
  license?:  | "youtube" | "creativeCommon";
  madeForKids?: boolean;
  /**
   * The video's privacy status.
   */
  privacyStatus?:  | "public" | "unlisted" | "private";
  /**
   * This value indicates if the extended video statistics on the watch page
   * can be viewed by everyone. Note that the view count, likes, etc will still
   * be visible if this is disabled. @mutable youtube.videos.insert
   * youtube.videos.update
   */
  publicStatsViewable?: boolean;
  /**
   * The date and time when the video is scheduled to publish. It can be set
   * only if the privacy status of the video is private..
   */
  publishAt?: Date;
  /**
   * This value explains why YouTube rejected an uploaded video. This property
   * is only present if the uploadStatus property indicates that the upload was
   * rejected.
   */
  rejectionReason?:  | "copyright" | "inappropriate" | "duplicate" | "termsOfUse" | "uploaderAccountSuspended" | "length" | "claim" | "uploaderAccountClosed" | "trademark" | "legal";
  selfDeclaredMadeForKids?: boolean;
  /**
   * The status of the uploaded video.
   */
  uploadStatus?:  | "uploaded" | "processed" | "failed" | "rejected" | "deleted";
}

function serializeVideoStatus(data: any): VideoStatus {
  return {
    ...data,
    publishAt: data["publishAt"] !== undefined ? data["publishAt"].toISOString() : undefined,
  };
}

function deserializeVideoStatus(data: any): VideoStatus {
  return {
    ...data,
    publishAt: data["publishAt"] !== undefined ? new Date(data["publishAt"]) : undefined,
  };
}

/**
 * Specifies suggestions on how to improve video content, including encoding
 * hints, tag suggestions, and editor suggestions.
 */
export interface VideoSuggestions {
  /**
   * A list of video editing operations that might improve the video quality or
   * playback experience of the uploaded video.
   */
  editorSuggestions?:  | "videoAutoLevels" | "videoStabilize" | "videoCrop" | "audioQuietAudioSwap"[];
  /**
   * A list of errors that will prevent YouTube from successfully processing
   * the uploaded video video. These errors indicate that, regardless of the
   * video's current processing status, eventually, that status will almost
   * certainly be failed.
   */
  processingErrors?:  | "audioFile" | "imageFile" | "projectFile" | "notAVideoFile" | "docFile" | "archiveFile" | "unsupportedSpatialAudioLayout"[];
  /**
   * A list of suggestions that may improve YouTube's ability to process the
   * video.
   */
  processingHints?:  | "nonStreamableMov" | "sendBestQualityVideo" | "sphericalVideo" | "spatialAudio" | "vrVideo" | "hdrVideo"[];
  /**
   * A list of reasons why YouTube may have difficulty transcoding the uploaded
   * video or that might result in an erroneous transcoding. These warnings are
   * generated before YouTube actually processes the uploaded video file. In
   * addition, they identify issues that are unlikely to cause the video
   * processing to fail but that might cause problems such as sync issues, video
   * artifacts, or a missing audio track.
   */
  processingWarnings?:  | "unknownContainer" | "unknownVideoCodec" | "unknownAudioCodec" | "inconsistentResolution" | "hasEditlist" | "problematicVideoCodec" | "problematicAudioCodec" | "unsupportedVrStereoMode" | "unsupportedSphericalProjectionType" | "unsupportedHdrPixelFormat" | "unsupportedHdrColorMetadata" | "problematicHdrLookupTable"[];
  /**
   * A list of keyword tags that could be added to the video's metadata to
   * increase the likelihood that users will locate your video when searching or
   * browsing on YouTube.
   */
  tagSuggestions?: VideoSuggestionsTagSuggestion[];
}

/**
 * A single tag suggestion with it's relevance information.
 */
export interface VideoSuggestionsTagSuggestion {
  /**
   * A set of video categories for which the tag is relevant. You can use this
   * information to display appropriate tag suggestions based on the video
   * category that the video uploader associates with the video. By default, tag
   * suggestions are relevant for all categories if there are no restricts
   * defined for the keyword.
   */
  categoryRestricts?: string[];
  /**
   * The keyword tag suggested for the video.
   */
  tag?: string;
}

/**
 * Additional options for YouTube#videosUpdate.
 */
export interface VideosUpdateOptions {
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The actual
   * CMS account that the user authenticates with must be linked to the
   * specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The *part* parameter serves two purposes in this operation. It identifies
   * the properties that the write operation will set as well as the properties
   * that the API response will include. Note that this method will override the
   * existing values for all of the mutable properties that are contained in any
   * parts that the parameter value specifies. For example, a video's privacy
   * setting is contained in the status part. As such, if your request is
   * updating a private video, and the request's part parameter value includes
   * the status part, the video's privacy setting will be updated to whatever
   * value the request body specifies. If the request body does not specify a
   * value, the existing privacy setting will be removed and the video will
   * revert to the default privacy setting. In addition, not all parts contain
   * properties that can be set when inserting or updating a video. For example,
   * the statistics object encapsulates statistics that YouTube calculates for a
   * video and does not contain values that you can set or modify. If the
   * parameter value specifies a part that does not contain mutable values, that
   * part will still be included in the API response.
   */
  part: string;
}

/**
 * Freebase topic information related to the video.
 */
export interface VideoTopicDetails {
  /**
   * Similar to topic_id, except that these topics are merely relevant to the
   * video. These are topics that may be mentioned in, or appear in the video.
   * You can retrieve information about each topic using Freebase Topic API.
   */
  relevantTopicIds?: string[];
  /**
   * A list of Wikipedia URLs that provide a high-level description of the
   * video's content.
   */
  topicCategories?: string[];
  /**
   * A list of Freebase topic IDs that are centrally associated with the video.
   * These are topics that are centrally featured in the video, and it can be
   * said that the video is mainly about each of these. You can retrieve
   * information about each topic using the < a
   * href="http://wiki.freebase.com/wiki/Topic_API">Freebase Topic API.
   */
  topicIds?: string[];
}

/**
 * Branding properties for the watch. All deprecated.
 */
export interface WatchSettings {
  /**
   * The text color for the video watch page's branded area.
   */
  backgroundColor?: string;
  /**
   * An ID that uniquely identifies a playlist that displays next to the video
   * player.
   */
  featuredPlaylistId?: string;
  /**
   * The background color for the video watch page's branded area.
   */
  textColor?: string;
}

/**
 * Additional options for YouTube#watermarksSet.
 */
export interface WatermarksSetOptions {
  channelId: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#watermarksUnset.
 */
export interface WatermarksUnsetOptions {
  channelId: string;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content
   * partners. The *onBehalfOfContentOwner* parameter indicates that the
   * request's authorization credentials identify a YouTube CMS user who is
   * acting on behalf of the content owner specified in the parameter value.
   * This parameter is intended for YouTube content partners that own and manage
   * many different YouTube channels. It allows content owners to authenticate
   * once and get access to all their video and channel data, without having to
   * provide authentication credentials for each individual channel. The CMS
   * account that the user authenticates with must be linked to the specified
   * YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}

/**
 * Additional options for YouTube#youtubeV3UpdateCommentThreads.
 */
export interface YoutubeV3UpdateCommentThreadsOptions {
  /**
   * The *part* parameter specifies a comma-separated list of commentThread
   * resource properties that the API response will include. You must at least
   * include the snippet part in the parameter value since that part contains
   * all of the properties that the API request can update.
   */
  part?: string;
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
