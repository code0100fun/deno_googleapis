// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play Game Services Client for Deno
 * =========================================
 * 
 * The Google Play games service allows developers to enhance games with social leaderboards, achievements, game state, sign-in with Google, and more.
 * 
 * Docs: https://developers.google.com/games/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Play games service allows developers to enhance games with social
 * leaderboards, achievements, game state, sign-in with Google, and more.
 */
export class Games {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://games.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists all the achievement definitions for your application.
   *
   */
  async achievementDefinitionsList(opts: AchievementDefinitionsListOptions = {}): Promise<AchievementDefinitionsListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/achievements`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAchievementDefinitionsListResponse(data);
  }

  /**
   * Increments the steps of the achievement with the given ID for the
   * currently authenticated player.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementsIncrement(achievementId: string, opts: AchievementsIncrementOptions = {}): Promise<AchievementIncrementResponse> {
    opts = serializeAchievementsIncrementOptions(opts);
    const url = new URL(`${this.#baseUrl}games/v1/achievements/${ achievementId }/increment`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.stepsToIncrement !== undefined) {
      url.searchParams.append("stepsToIncrement", String(opts.stepsToIncrement));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AchievementIncrementResponse;
  }

  /**
   * Lists the progress for all your application's achievements for the
   * currently authenticated player.
   *
   * @param playerId A player ID. A value of `me` may be used in place of the authenticated player's ID.
   */
  async achievementsList(playerId: string, opts: AchievementsListOptions = {}): Promise<PlayerAchievementListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/players/${ playerId }/achievements`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.state !== undefined) {
      url.searchParams.append("state", String(opts.state));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlayerAchievementListResponse(data);
  }

  /**
   * Sets the state of the achievement with the given ID to `REVEALED` for the
   * currently authenticated player.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementsReveal(achievementId: string): Promise<AchievementRevealResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/achievements/${ achievementId }/reveal`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AchievementRevealResponse;
  }

  /**
   * Sets the steps for the currently authenticated player towards unlocking an
   * achievement. If the steps parameter is less than the current number of
   * steps that the player already gained for the achievement, the achievement
   * is not modified.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementsSetStepsAtLeast(achievementId: string, opts: AchievementsSetStepsAtLeastOptions = {}): Promise<AchievementSetStepsAtLeastResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/achievements/${ achievementId }/setStepsAtLeast`);
    if (opts.steps !== undefined) {
      url.searchParams.append("steps", String(opts.steps));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AchievementSetStepsAtLeastResponse;
  }

  /**
   * Unlocks this achievement for the currently authenticated player.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementsUnlock(achievementId: string): Promise<AchievementUnlockResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/achievements/${ achievementId }/unlock`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AchievementUnlockResponse;
  }

  /**
   * Updates multiple achievements for the currently authenticated player.
   *
   */
  async achievementsUpdateMultiple(req: AchievementUpdateMultipleRequest): Promise<AchievementUpdateMultipleResponse> {
    req = serializeAchievementUpdateMultipleRequest(req);
    const url = new URL(`${this.#baseUrl}games/v1/achievements/updateMultiple`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AchievementUpdateMultipleResponse;
  }

  /**
   * Retrieves the metadata of the application with the given ID. If the
   * requested application is not available for the specified `platformType`,
   * the returned response will not include any instance data.
   *
   * @param applicationId The application ID from the Google Play developer console.
   */
  async applicationsGet(applicationId: string, opts: ApplicationsGetOptions = {}): Promise<Application> {
    const url = new URL(`${this.#baseUrl}games/v1/applications/${ applicationId }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.platformType !== undefined) {
      url.searchParams.append("platformType", String(opts.platformType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApplication(data);
  }

  /**
   * Returns a URL for the requested end point type.
   *
   */
  async applicationsGetEndPoint(opts: ApplicationsGetEndPointOptions = {}): Promise<EndPoint> {
    const url = new URL(`${this.#baseUrl}games/v1/applications/getEndPoint`);
    if (opts.applicationId !== undefined) {
      url.searchParams.append("applicationId", String(opts.applicationId));
    }
    if (opts.endPointType !== undefined) {
      url.searchParams.append("endPointType", String(opts.endPointType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as EndPoint;
  }

  /**
   * Indicate that the currently authenticated user is playing your
   * application.
   *
   */
  async applicationsPlayed(): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1/applications/played`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Verifies the auth token provided with this request is for the application
   * with the specified ID, and returns the ID of the player it was granted for.
   *
   * @param applicationId The application ID from the Google Play developer console.
   */
  async applicationsVerify(applicationId: string): Promise<ApplicationVerifyResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/applications/${ applicationId }/verify`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApplicationVerifyResponse;
  }

  /**
   * Returns a list showing the current progress on events in this application
   * for the currently authenticated user.
   *
   */
  async eventsListByPlayer(opts: EventsListByPlayerOptions = {}): Promise<PlayerEventListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/events`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlayerEventListResponse(data);
  }

  /**
   * Returns a list of the event definitions in this application.
   *
   */
  async eventsListDefinitions(opts: EventsListDefinitionsOptions = {}): Promise<EventDefinitionListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/eventDefinitions`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EventDefinitionListResponse;
  }

  /**
   * Records a batch of changes to the number of times events have occurred for
   * the currently authenticated user of this application.
   *
   */
  async eventsRecord(req: EventRecordRequest, opts: EventsRecordOptions = {}): Promise<EventUpdateResponse> {
    req = serializeEventRecordRequest(req);
    const url = new URL(`${this.#baseUrl}games/v1/events`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEventUpdateResponse(data);
  }

  /**
   * Retrieves the metadata of the leaderboard with the given ID.
   *
   * @param leaderboardId The ID of the leaderboard.
   */
  async leaderboardsGet(leaderboardId: string, opts: LeaderboardsGetOptions = {}): Promise<Leaderboard> {
    const url = new URL(`${this.#baseUrl}games/v1/leaderboards/${ leaderboardId }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Leaderboard;
  }

  /**
   * Lists all the leaderboard metadata for your application.
   *
   */
  async leaderboardsList(opts: LeaderboardsListOptions = {}): Promise<LeaderboardListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/leaderboards`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LeaderboardListResponse;
  }

  /**
   * Return the metagame configuration data for the calling application.
   *
   */
  async metagameGetMetagameConfig(): Promise<MetagameConfig> {
    const url = new URL(`${this.#baseUrl}games/v1/metagameConfig`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMetagameConfig(data);
  }

  /**
   * List play data aggregated per category for the player corresponding to
   * `playerId`.
   *
   * @param collection The collection of categories for which data will be returned.
   * @param playerId A player ID. A value of `me` may be used in place of the authenticated player's ID.
   */
  async metagameListCategoriesByPlayer(collection:  | "COLLECTION_UNSPECIFIED" | "ALL", playerId: string, opts: MetagameListCategoriesByPlayerOptions = {}): Promise<CategoryListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/players/${ playerId }/categories/${ collection }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCategoryListResponse(data);
  }

  /**
   * Retrieves the Player resource with the given ID. To retrieve the player
   * for the currently authenticated user, set `playerId` to `me`.
   *
   * @param playerId A player ID. A value of `me` may be used in place of the authenticated player's ID.
   */
  async playersGet(playerId: string, opts: PlayersGetOptions = {}): Promise<Player> {
    const url = new URL(`${this.#baseUrl}games/v1/players/${ playerId }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.playerIdConsistencyToken !== undefined) {
      url.searchParams.append("playerIdConsistencyToken", String(opts.playerIdConsistencyToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlayer(data);
  }

  /**
   * Retrieves scoped player identifiers for currently authenticated user.
   *
   */
  async playersGetScopedPlayerIds(): Promise<ScopedPlayerIds> {
    const url = new URL(`${this.#baseUrl}games/v1/players/me/scopedIds`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ScopedPlayerIds;
  }

  /**
   * Get the collection of players for the currently authenticated user.
   *
   * @param collection Collection of players being retrieved
   */
  async playersList(collection:  | "CONNECTED" | "VISIBLE" | "FRIENDS_ALL", opts: PlayersListOptions = {}): Promise<PlayerListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/players/me/players/${ collection }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlayerListResponse(data);
  }

  /**
   * Checks whether the games client is out of date.
   *
   */
  async revisionsCheck(opts: RevisionsCheckOptions = {}): Promise<RevisionCheckResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/revisions/check`);
    if (opts.clientRevision !== undefined) {
      url.searchParams.append("clientRevision", String(opts.clientRevision));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as RevisionCheckResponse;
  }

  /**
   * Get high scores, and optionally ranks, in leaderboards for the currently
   * authenticated player. For a specific time span, `leaderboardId` can be set
   * to `ALL` to retrieve data for all leaderboards in a given time span. `NOTE:
   * You cannot ask for 'ALL' leaderboards and 'ALL' timeSpans in the same
   * request; only one parameter may be set to 'ALL'.
   *
   * @param leaderboardId The ID of the leaderboard. Can be set to 'ALL' to retrieve data for all leaderboards for this application.
   * @param playerId A player ID. A value of `me` may be used in place of the authenticated player's ID.
   * @param timeSpan The time span for the scores and ranks you're requesting.
   */
  async scoresGet(leaderboardId: string, playerId: string, timeSpan:  | "SCORE_TIME_SPAN_UNSPECIFIED" | "ALL" | "ALL_TIME" | "WEEKLY" | "DAILY", opts: ScoresGetOptions = {}): Promise<PlayerLeaderboardScoreListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/players/${ playerId }/leaderboards/${ leaderboardId }/scores/${ timeSpan }`);
    if (opts.includeRankType !== undefined) {
      url.searchParams.append("includeRankType", String(opts.includeRankType));
    }
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePlayerLeaderboardScoreListResponse(data);
  }

  /**
   * Lists the scores in a leaderboard, starting from the top.
   *
   * @param collection The collection of scores you're requesting.
   * @param leaderboardId The ID of the leaderboard.
   */
  async scoresList(collection:  | "SCORE_COLLECTION_UNSPECIFIED" | "PUBLIC" | "SOCIAL" | "FRIENDS", leaderboardId: string, opts: ScoresListOptions = {}): Promise<LeaderboardScores> {
    const url = new URL(`${this.#baseUrl}games/v1/leaderboards/${ leaderboardId }/scores/${ collection }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.timeSpan !== undefined) {
      url.searchParams.append("timeSpan", String(opts.timeSpan));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLeaderboardScores(data);
  }

  /**
   * Lists the scores in a leaderboard around (and including) a player's score.
   *
   * @param collection The collection of scores you're requesting.
   * @param leaderboardId The ID of the leaderboard.
   */
  async scoresListWindow(collection:  | "SCORE_COLLECTION_UNSPECIFIED" | "PUBLIC" | "SOCIAL" | "FRIENDS", leaderboardId: string, opts: ScoresListWindowOptions = {}): Promise<LeaderboardScores> {
    const url = new URL(`${this.#baseUrl}games/v1/leaderboards/${ leaderboardId }/window/${ collection }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resultsAbove !== undefined) {
      url.searchParams.append("resultsAbove", String(opts.resultsAbove));
    }
    if (opts.returnTopIfAbsent !== undefined) {
      url.searchParams.append("returnTopIfAbsent", String(opts.returnTopIfAbsent));
    }
    if (opts.timeSpan !== undefined) {
      url.searchParams.append("timeSpan", String(opts.timeSpan));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLeaderboardScores(data);
  }

  /**
   * Submits a score to the specified leaderboard.
   *
   * @param leaderboardId The ID of the leaderboard.
   */
  async scoresSubmit(leaderboardId: string, opts: ScoresSubmitOptions = {}): Promise<PlayerScoreResponse> {
    opts = serializeScoresSubmitOptions(opts);
    const url = new URL(`${this.#baseUrl}games/v1/leaderboards/${ leaderboardId }/scores`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.score !== undefined) {
      url.searchParams.append("score", String(opts.score));
    }
    if (opts.scoreTag !== undefined) {
      url.searchParams.append("scoreTag", String(opts.scoreTag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializePlayerScoreResponse(data);
  }

  /**
   * Submits multiple scores to leaderboards.
   *
   */
  async scoresSubmitMultiple(req: PlayerScoreSubmissionList, opts: ScoresSubmitMultipleOptions = {}): Promise<PlayerScoreListResponse> {
    req = serializePlayerScoreSubmissionList(req);
    const url = new URL(`${this.#baseUrl}games/v1/leaderboards/scores`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePlayerScoreListResponse(data);
  }

  /**
   * Retrieves the metadata for a given snapshot ID.
   *
   * @param snapshotId The ID of the snapshot.
   */
  async snapshotsGet(snapshotId: string, opts: SnapshotsGetOptions = {}): Promise<Snapshot> {
    const url = new URL(`${this.#baseUrl}games/v1/snapshots/${ snapshotId }`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSnapshot(data);
  }

  /**
   * Retrieves a list of snapshots created by your application for the player
   * corresponding to the player ID.
   *
   * @param playerId A player ID. A value of `me` may be used in place of the authenticated player's ID.
   */
  async snapshotsList(playerId: string, opts: SnapshotsListOptions = {}): Promise<SnapshotListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/players/${ playerId }/snapshots`);
    if (opts.language !== undefined) {
      url.searchParams.append("language", String(opts.language));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSnapshotListResponse(data);
  }

  /**
   * Returns engagement and spend statistics in this application for the
   * currently authenticated user.
   *
   */
  async statsGet(): Promise<StatsResponse> {
    const url = new URL(`${this.#baseUrl}games/v1/stats`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StatsResponse;
  }
}

/**
 * An achievement definition object.
 */
export interface AchievementDefinition {
  /**
   * The type of the achievement.
   */
  achievementType?:  | "ACHIEVEMENT_TYPE_UNSPECIFIED" | "STANDARD" | "INCREMENTAL";
  /**
   * The description of the achievement.
   */
  description?: string;
  /**
   * Experience points which will be earned when unlocking this achievement.
   */
  experiencePoints?: bigint;
  /**
   * The total steps for an incremental achievement as a string.
   */
  formattedTotalSteps?: string;
  /**
   * The ID of the achievement.
   */
  id?: string;
  /**
   * The initial state of the achievement.
   */
  initialState?:  | "INITIAL_ACHIEVEMENT_STATE_UNSPECIFIED" | "HIDDEN" | "REVEALED" | "UNLOCKED";
  /**
   * Indicates whether the revealed icon image being returned is a default
   * image, or is provided by the game.
   */
  isRevealedIconUrlDefault?: boolean;
  /**
   * Indicates whether the unlocked icon image being returned is a default
   * image, or is game-provided.
   */
  isUnlockedIconUrlDefault?: boolean;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementDefinition`.
   */
  kind?: string;
  /**
   * The name of the achievement.
   */
  name?: string;
  /**
   * The image URL for the revealed achievement icon.
   */
  revealedIconUrl?: string;
  /**
   * The total steps for an incremental achievement.
   */
  totalSteps?: number;
  /**
   * The image URL for the unlocked achievement icon.
   */
  unlockedIconUrl?: string;
}

function serializeAchievementDefinition(data: any): AchievementDefinition {
  return {
    ...data,
    experiencePoints: data["experiencePoints"] !== undefined ? String(data["experiencePoints"]) : undefined,
  };
}

function deserializeAchievementDefinition(data: any): AchievementDefinition {
  return {
    ...data,
    experiencePoints: data["experiencePoints"] !== undefined ? BigInt(data["experiencePoints"]) : undefined,
  };
}

/**
 * Additional options for Games#achievementDefinitionsList.
 */
export interface AchievementDefinitionsListOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of achievement resources to return in the response,
   * used for paging. For any response, the actual number of achievement
   * resources returned may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * A list of achievement definition objects.
 */
export interface AchievementDefinitionsListResponse {
  /**
   * The achievement definitions.
   */
  items?: AchievementDefinition[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementDefinitionsListResponse`.
   */
  kind?: string;
  /**
   * Token corresponding to the next page of results.
   */
  nextPageToken?: string;
}

function serializeAchievementDefinitionsListResponse(data: any): AchievementDefinitionsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeAchievementDefinition(item))) : undefined,
  };
}

function deserializeAchievementDefinitionsListResponse(data: any): AchievementDefinitionsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeAchievementDefinition(item))) : undefined,
  };
}

/**
 * An achievement increment response
 */
export interface AchievementIncrementResponse {
  /**
   * The current steps recorded for this incremental achievement.
   */
  currentSteps?: number;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementIncrementResponse`.
   */
  kind?: string;
  /**
   * Whether the current steps for the achievement has reached the number of
   * steps required to unlock.
   */
  newlyUnlocked?: boolean;
}

/**
 * An achievement reveal response
 */
export interface AchievementRevealResponse {
  /**
   * The current state of the achievement for which a reveal was attempted.
   * This might be `UNLOCKED` if the achievement was already unlocked.
   */
  currentState?:  | "REVEAL_ACHIEVEMENT_STATE_UNSPECIFIED" | "REVEALED" | "UNLOCKED";
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementRevealResponse`.
   */
  kind?: string;
}

/**
 * An achievement set steps at least response.
 */
export interface AchievementSetStepsAtLeastResponse {
  /**
   * The current steps recorded for this incremental achievement.
   */
  currentSteps?: number;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementSetStepsAtLeastResponse`.
   */
  kind?: string;
  /**
   * Whether the current steps for the achievement has reached the number of
   * steps required to unlock.
   */
  newlyUnlocked?: boolean;
}

/**
 * Additional options for Games#achievementsIncrement.
 */
export interface AchievementsIncrementOptions {
  /**
   * A randomly generated numeric ID for each request specified by the caller.
   * This number is used at the server to ensure that the request is handled
   * correctly across retries.
   */
  requestId?: bigint;
  /**
   * The number of steps to increment.
   */
  stepsToIncrement: number;
}

function serializeAchievementsIncrementOptions(data: any): AchievementsIncrementOptions {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? String(data["requestId"]) : undefined,
  };
}

function deserializeAchievementsIncrementOptions(data: any): AchievementsIncrementOptions {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? BigInt(data["requestId"]) : undefined,
  };
}

/**
 * Additional options for Games#achievementsList.
 */
export interface AchievementsListOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of achievement resources to return in the response,
   * used for paging. For any response, the actual number of achievement
   * resources returned may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * Tells the server to return only achievements with the specified state. If
   * this parameter isn't specified, all achievements are returned.
   */
  state?:  | "ALL" | "HIDDEN" | "REVEALED" | "UNLOCKED";
}

/**
 * Additional options for Games#achievementsSetStepsAtLeast.
 */
export interface AchievementsSetStepsAtLeastOptions {
  /**
   * The minimum value to set the steps to.
   */
  steps: number;
}

/**
 * An achievement unlock response
 */
export interface AchievementUnlockResponse {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementUnlockResponse`.
   */
  kind?: string;
  /**
   * Whether this achievement was newly unlocked (that is, whether the unlock
   * request for the achievement was the first for the player).
   */
  newlyUnlocked?: boolean;
}

/**
 * A list of achievement update requests.
 */
export interface AchievementUpdateMultipleRequest {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementUpdateMultipleRequest`.
   */
  kind?: string;
  /**
   * The individual achievement update requests.
   */
  updates?: AchievementUpdateRequest[];
}

function serializeAchievementUpdateMultipleRequest(data: any): AchievementUpdateMultipleRequest {
  return {
    ...data,
    updates: data["updates"] !== undefined ? data["updates"].map((item: any) => (serializeAchievementUpdateRequest(item))) : undefined,
  };
}

function deserializeAchievementUpdateMultipleRequest(data: any): AchievementUpdateMultipleRequest {
  return {
    ...data,
    updates: data["updates"] !== undefined ? data["updates"].map((item: any) => (deserializeAchievementUpdateRequest(item))) : undefined,
  };
}

/**
 * Response message for UpdateMultipleAchievements rpc.
 */
export interface AchievementUpdateMultipleResponse {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementUpdateMultipleResponse`.
   */
  kind?: string;
  /**
   * The updated state of the achievements.
   */
  updatedAchievements?: AchievementUpdateResponse[];
}

/**
 * A request to update an achievement.
 */
export interface AchievementUpdateRequest {
  /**
   * The achievement this update is being applied to.
   */
  achievementId?: string;
  /**
   * The payload if an update of type `INCREMENT` was requested for the
   * achievement.
   */
  incrementPayload?: GamesAchievementIncrement;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementUpdateRequest`.
   */
  kind?: string;
  /**
   * The payload if an update of type `SET_STEPS_AT_LEAST` was requested for
   * the achievement.
   */
  setStepsAtLeastPayload?: GamesAchievementSetStepsAtLeast;
  /**
   * The type of update being applied.
   */
  updateType?:  | "ACHIEVEMENT_UPDATE_TYPE_UNSPECIFIED" | "REVEAL" | "UNLOCK" | "INCREMENT" | "SET_STEPS_AT_LEAST";
}

function serializeAchievementUpdateRequest(data: any): AchievementUpdateRequest {
  return {
    ...data,
    incrementPayload: data["incrementPayload"] !== undefined ? serializeGamesAchievementIncrement(data["incrementPayload"]) : undefined,
  };
}

function deserializeAchievementUpdateRequest(data: any): AchievementUpdateRequest {
  return {
    ...data,
    incrementPayload: data["incrementPayload"] !== undefined ? deserializeGamesAchievementIncrement(data["incrementPayload"]) : undefined,
  };
}

/**
 * An updated achievement.
 */
export interface AchievementUpdateResponse {
  /**
   * The achievement this update is was applied to.
   */
  achievementId?: string;
  /**
   * The current state of the achievement.
   */
  currentState?:  | "UPDATED_ACHIEVEMENT_STATE_UNSPECIFIED" | "HIDDEN" | "REVEALED" | "UNLOCKED";
  /**
   * The current steps recorded for this achievement if it is incremental.
   */
  currentSteps?: number;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#achievementUpdateResponse`.
   */
  kind?: string;
  /**
   * Whether this achievement was newly unlocked (that is, whether the unlock
   * request for the achievement was the first for the player).
   */
  newlyUnlocked?: boolean;
  /**
   * Whether the requested updates actually affected the achievement.
   */
  updateOccurred?: boolean;
}

/**
 * The Application resource.
 */
export interface Application {
  /**
   * The number of achievements visible to the currently authenticated player.
   */
  achievement_count?: number;
  /**
   * The assets of the application.
   */
  assets?: ImageAsset[];
  /**
   * The author of the application.
   */
  author?: string;
  /**
   * The category of the application.
   */
  category?: ApplicationCategory;
  /**
   * The description of the application.
   */
  description?: string;
  /**
   * A list of features that have been enabled for the application.
   */
  enabledFeatures?:  | "APPLICATION_FEATURE_UNSPECIFIED" | "SNAPSHOTS"[];
  /**
   * The ID of the application.
   */
  id?: string;
  /**
   * The instances of the application.
   */
  instances?: Instance[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#application`.
   */
  kind?: string;
  /**
   * The last updated timestamp of the application.
   */
  lastUpdatedTimestamp?: bigint;
  /**
   * The number of leaderboards visible to the currently authenticated player.
   */
  leaderboard_count?: number;
  /**
   * The name of the application.
   */
  name?: string;
  /**
   * A hint to the client UI for what color to use as an app-themed color. The
   * color is given as an RGB triplet (e.g. "E0E0E0").
   */
  themeColor?: string;
}

function serializeApplication(data: any): Application {
  return {
    ...data,
    lastUpdatedTimestamp: data["lastUpdatedTimestamp"] !== undefined ? String(data["lastUpdatedTimestamp"]) : undefined,
  };
}

function deserializeApplication(data: any): Application {
  return {
    ...data,
    lastUpdatedTimestamp: data["lastUpdatedTimestamp"] !== undefined ? BigInt(data["lastUpdatedTimestamp"]) : undefined,
  };
}

/**
 * An application category object.
 */
export interface ApplicationCategory {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#applicationCategory`.
   */
  kind?: string;
  /**
   * The primary category.
   */
  primary?: string;
  /**
   * The secondary category.
   */
  secondary?: string;
}

/**
 * Additional options for Games#applicationsGetEndPoint.
 */
export interface ApplicationsGetEndPointOptions {
  /**
   * The application ID from the Google Play developer console.
   */
  applicationId?: string;
  /**
   * Type of endpoint being requested.
   */
  endPointType?:  | "END_POINT_TYPE_UNSPECIFIED" | "PROFILE_CREATION" | "PROFILE_SETTINGS";
}

/**
 * Additional options for Games#applicationsGet.
 */
export interface ApplicationsGetOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * Restrict application details returned to the specific platform.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "ANDROID" | "IOS" | "WEB_APP";
}

/**
 * A third party application verification response resource.
 */
export interface ApplicationVerifyResponse {
  /**
   * An alternate ID that was once used for the player that was issued the auth
   * token used in this request. (This field is not normally populated.)
   */
  alternate_player_id?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#applicationVerifyResponse`.
   */
  kind?: string;
  /**
   * The ID of the player that was issued the auth token used in this request.
   */
  player_id?: string;
}

/**
 * Data related to individual game categories.
 */
export interface Category {
  /**
   * The category name.
   */
  category?: string;
  /**
   * Experience points earned in this category.
   */
  experiencePoints?: bigint;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#category`.
   */
  kind?: string;
}

function serializeCategory(data: any): Category {
  return {
    ...data,
    experiencePoints: data["experiencePoints"] !== undefined ? String(data["experiencePoints"]) : undefined,
  };
}

function deserializeCategory(data: any): Category {
  return {
    ...data,
    experiencePoints: data["experiencePoints"] !== undefined ? BigInt(data["experiencePoints"]) : undefined,
  };
}

/**
 * A third party list metagame categories response.
 */
export interface CategoryListResponse {
  /**
   * The list of categories with usage data.
   */
  items?: Category[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#categoryListResponse`.
   */
  kind?: string;
  /**
   * Token corresponding to the next page of results.
   */
  nextPageToken?: string;
}

function serializeCategoryListResponse(data: any): CategoryListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeCategory(item))) : undefined,
  };
}

function deserializeCategoryListResponse(data: any): CategoryListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeCategory(item))) : undefined,
  };
}

/**
 * Container for a URL end point of the requested type.
 */
export interface EndPoint {
  /**
   * A URL suitable for loading in a web browser for the requested endpoint.
   */
  url?: string;
}

/**
 * A batch update failure resource.
 */
export interface EventBatchRecordFailure {
  /**
   * The cause for the update failure.
   */
  failureCause?:  | "EVENT_FAILURE_CAUSE_UNSPECIFIED" | "TOO_LARGE" | "TIME_PERIOD_EXPIRED" | "TIME_PERIOD_SHORT" | "TIME_PERIOD_LONG" | "ALREADY_UPDATED" | "RECORD_RATE_HIGH";
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventBatchRecordFailure`.
   */
  kind?: string;
  /**
   * The time range which was rejected; empty for a request-wide failure.
   */
  range?: EventPeriodRange;
}

function serializeEventBatchRecordFailure(data: any): EventBatchRecordFailure {
  return {
    ...data,
    range: data["range"] !== undefined ? serializeEventPeriodRange(data["range"]) : undefined,
  };
}

function deserializeEventBatchRecordFailure(data: any): EventBatchRecordFailure {
  return {
    ...data,
    range: data["range"] !== undefined ? deserializeEventPeriodRange(data["range"]) : undefined,
  };
}

/**
 * An event child relationship resource.
 */
export interface EventChild {
  /**
   * The ID of the child event.
   */
  childId?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventChild`.
   */
  kind?: string;
}

/**
 * An event definition resource.
 */
export interface EventDefinition {
  /**
   * A list of events that are a child of this event.
   */
  childEvents?: EventChild[];
  /**
   * Description of what this event represents.
   */
  description?: string;
  /**
   * The name to display for the event.
   */
  displayName?: string;
  /**
   * The ID of the event.
   */
  id?: string;
  /**
   * The base URL for the image that represents the event.
   */
  imageUrl?: string;
  /**
   * Indicates whether the icon image being returned is a default image, or is
   * game-provided.
   */
  isDefaultImageUrl?: boolean;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventDefinition`.
   */
  kind?: string;
  /**
   * The visibility of event being tracked in this definition.
   */
  visibility?:  | "EVENT_VISIBILITY_UNSPECIFIED" | "REVEALED" | "HIDDEN";
}

/**
 * A ListDefinitions response.
 */
export interface EventDefinitionListResponse {
  /**
   * The event definitions.
   */
  items?: EventDefinition[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventDefinitionListResponse`.
   */
  kind?: string;
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
}

/**
 * An event period time range.
 */
export interface EventPeriodRange {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventPeriodRange`.
   */
  kind?: string;
  /**
   * The time when this update period ends, in millis, since 1970 UTC (Unix
   * Epoch).
   */
  periodEndMillis?: bigint;
  /**
   * The time when this update period begins, in millis, since 1970 UTC (Unix
   * Epoch).
   */
  periodStartMillis?: bigint;
}

function serializeEventPeriodRange(data: any): EventPeriodRange {
  return {
    ...data,
    periodEndMillis: data["periodEndMillis"] !== undefined ? String(data["periodEndMillis"]) : undefined,
    periodStartMillis: data["periodStartMillis"] !== undefined ? String(data["periodStartMillis"]) : undefined,
  };
}

function deserializeEventPeriodRange(data: any): EventPeriodRange {
  return {
    ...data,
    periodEndMillis: data["periodEndMillis"] !== undefined ? BigInt(data["periodEndMillis"]) : undefined,
    periodStartMillis: data["periodStartMillis"] !== undefined ? BigInt(data["periodStartMillis"]) : undefined,
  };
}

/**
 * An event period update resource.
 */
export interface EventPeriodUpdate {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventPeriodUpdate`.
   */
  kind?: string;
  /**
   * The time period being covered by this update.
   */
  timePeriod?: EventPeriodRange;
  /**
   * The updates being made for this time period.
   */
  updates?: EventUpdateRequest[];
}

function serializeEventPeriodUpdate(data: any): EventPeriodUpdate {
  return {
    ...data,
    timePeriod: data["timePeriod"] !== undefined ? serializeEventPeriodRange(data["timePeriod"]) : undefined,
    updates: data["updates"] !== undefined ? data["updates"].map((item: any) => (serializeEventUpdateRequest(item))) : undefined,
  };
}

function deserializeEventPeriodUpdate(data: any): EventPeriodUpdate {
  return {
    ...data,
    timePeriod: data["timePeriod"] !== undefined ? deserializeEventPeriodRange(data["timePeriod"]) : undefined,
    updates: data["updates"] !== undefined ? data["updates"].map((item: any) => (deserializeEventUpdateRequest(item))) : undefined,
  };
}

/**
 * An event update failure resource.
 */
export interface EventRecordFailure {
  /**
   * The ID of the event that was not updated.
   */
  eventId?: string;
  /**
   * The cause for the update failure.
   */
  failureCause?:  | "EVENT_UPDATE_FAILURE_CAUSE_UNSPECIFIED" | "NOT_FOUND" | "INVALID_UPDATE_VALUE";
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventRecordFailure`.
   */
  kind?: string;
}

/**
 * An event period update resource.
 */
export interface EventRecordRequest {
  /**
   * The current time when this update was sent, in milliseconds, since 1970
   * UTC (Unix Epoch).
   */
  currentTimeMillis?: bigint;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventRecordRequest`.
   */
  kind?: string;
  /**
   * The request ID used to identify this attempt to record events.
   */
  requestId?: bigint;
  /**
   * A list of the time period updates being made in this request.
   */
  timePeriods?: EventPeriodUpdate[];
}

function serializeEventRecordRequest(data: any): EventRecordRequest {
  return {
    ...data,
    currentTimeMillis: data["currentTimeMillis"] !== undefined ? String(data["currentTimeMillis"]) : undefined,
    requestId: data["requestId"] !== undefined ? String(data["requestId"]) : undefined,
    timePeriods: data["timePeriods"] !== undefined ? data["timePeriods"].map((item: any) => (serializeEventPeriodUpdate(item))) : undefined,
  };
}

function deserializeEventRecordRequest(data: any): EventRecordRequest {
  return {
    ...data,
    currentTimeMillis: data["currentTimeMillis"] !== undefined ? BigInt(data["currentTimeMillis"]) : undefined,
    requestId: data["requestId"] !== undefined ? BigInt(data["requestId"]) : undefined,
    timePeriods: data["timePeriods"] !== undefined ? data["timePeriods"].map((item: any) => (deserializeEventPeriodUpdate(item))) : undefined,
  };
}

/**
 * Additional options for Games#eventsListByPlayer.
 */
export interface EventsListByPlayerOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of events to return in the response, used for paging.
   * For any response, the actual number of events to return may be less than
   * the specified maxResults.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * Additional options for Games#eventsListDefinitions.
 */
export interface EventsListDefinitionsOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of event definitions to return in the response, used
   * for paging. For any response, the actual number of event definitions to
   * return may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * Additional options for Games#eventsRecord.
 */
export interface EventsRecordOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
}

/**
 * An event period update resource.
 */
export interface EventUpdateRequest {
  /**
   * The ID of the event being modified in this update.
   */
  definitionId?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventUpdateRequest`.
   */
  kind?: string;
  /**
   * The number of times this event occurred in this time period.
   */
  updateCount?: bigint;
}

function serializeEventUpdateRequest(data: any): EventUpdateRequest {
  return {
    ...data,
    updateCount: data["updateCount"] !== undefined ? String(data["updateCount"]) : undefined,
  };
}

function deserializeEventUpdateRequest(data: any): EventUpdateRequest {
  return {
    ...data,
    updateCount: data["updateCount"] !== undefined ? BigInt(data["updateCount"]) : undefined,
  };
}

/**
 * An event period update resource.
 */
export interface EventUpdateResponse {
  /**
   * Any batch-wide failures which occurred applying updates.
   */
  batchFailures?: EventBatchRecordFailure[];
  /**
   * Any failures updating a particular event.
   */
  eventFailures?: EventRecordFailure[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#eventUpdateResponse`.
   */
  kind?: string;
  /**
   * The current status of any updated events
   */
  playerEvents?: PlayerEvent[];
}

function serializeEventUpdateResponse(data: any): EventUpdateResponse {
  return {
    ...data,
    batchFailures: data["batchFailures"] !== undefined ? data["batchFailures"].map((item: any) => (serializeEventBatchRecordFailure(item))) : undefined,
    playerEvents: data["playerEvents"] !== undefined ? data["playerEvents"].map((item: any) => (serializePlayerEvent(item))) : undefined,
  };
}

function deserializeEventUpdateResponse(data: any): EventUpdateResponse {
  return {
    ...data,
    batchFailures: data["batchFailures"] !== undefined ? data["batchFailures"].map((item: any) => (deserializeEventBatchRecordFailure(item))) : undefined,
    playerEvents: data["playerEvents"] !== undefined ? data["playerEvents"].map((item: any) => (deserializePlayerEvent(item))) : undefined,
  };
}

/**
 * The payload to request to increment an achievement.
 */
export interface GamesAchievementIncrement {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#GamesAchievementIncrement`.
   */
  kind?: string;
  /**
   * The requestId associated with an increment to an achievement.
   */
  requestId?: bigint;
  /**
   * The number of steps to be incremented.
   */
  steps?: number;
}

function serializeGamesAchievementIncrement(data: any): GamesAchievementIncrement {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? String(data["requestId"]) : undefined,
  };
}

function deserializeGamesAchievementIncrement(data: any): GamesAchievementIncrement {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? BigInt(data["requestId"]) : undefined,
  };
}

/**
 * The payload to request to increment an achievement.
 */
export interface GamesAchievementSetStepsAtLeast {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#GamesAchievementSetStepsAtLeast`.
   */
  kind?: string;
  /**
   * The minimum number of steps for the achievement to be set to.
   */
  steps?: number;
}

/**
 * An image asset object.
 */
export interface ImageAsset {
  /**
   * The height of the asset.
   */
  height?: number;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#imageAsset`.
   */
  kind?: string;
  /**
   * The name of the asset.
   */
  name?: string;
  /**
   * The URL of the asset.
   */
  url?: string;
  /**
   * The width of the asset.
   */
  width?: number;
}

/**
 * The Instance resource.
 */
export interface Instance {
  /**
   * URI which shows where a user can acquire this instance.
   */
  acquisitionUri?: string;
  /**
   * Platform dependent details for Android.
   */
  androidInstance?: InstanceAndroidDetails;
  /**
   * Platform dependent details for iOS.
   */
  iosInstance?: InstanceIosDetails;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#instance`.
   */
  kind?: string;
  /**
   * Localized display name.
   */
  name?: string;
  /**
   * The platform type.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "ANDROID" | "IOS" | "WEB_APP";
  /**
   * Flag to show if this game instance supports realtime play.
   */
  realtimePlay?: boolean;
  /**
   * Flag to show if this game instance supports turn based play.
   */
  turnBasedPlay?: boolean;
  /**
   * Platform dependent details for Web.
   */
  webInstance?: InstanceWebDetails;
}

/**
 * The Android instance details resource.
 */
export interface InstanceAndroidDetails {
  /**
   * Flag indicating whether the anti-piracy check is enabled.
   */
  enablePiracyCheck?: boolean;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#instanceAndroidDetails`.
   */
  kind?: string;
  /**
   * Android package name which maps to Google Play URL.
   */
  packageName?: string;
  /**
   * Indicates that this instance is the default for new installations.
   */
  preferred?: boolean;
}

/**
 * The iOS details resource.
 */
export interface InstanceIosDetails {
  /**
   * Bundle identifier.
   */
  bundleIdentifier?: string;
  /**
   * iTunes App ID.
   */
  itunesAppId?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#instanceIosDetails`.
   */
  kind?: string;
  /**
   * Indicates that this instance is the default for new installations on iPad
   * devices.
   */
  preferredForIpad?: boolean;
  /**
   * Indicates that this instance is the default for new installations on
   * iPhone devices.
   */
  preferredForIphone?: boolean;
  /**
   * Flag to indicate if this instance supports iPad.
   */
  supportIpad?: boolean;
  /**
   * Flag to indicate if this instance supports iPhone.
   */
  supportIphone?: boolean;
}

/**
 * The Web details resource.
 */
export interface InstanceWebDetails {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#instanceWebDetails`.
   */
  kind?: string;
  /**
   * Launch URL for the game.
   */
  launchUrl?: string;
  /**
   * Indicates that this instance is the default for new installations.
   */
  preferred?: boolean;
}

/**
 * The Leaderboard resource.
 */
export interface Leaderboard {
  /**
   * The icon for the leaderboard.
   */
  iconUrl?: string;
  /**
   * The leaderboard ID.
   */
  id?: string;
  /**
   * Indicates whether the icon image being returned is a default image, or is
   * game-provided.
   */
  isIconUrlDefault?: boolean;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#leaderboard`.
   */
  kind?: string;
  /**
   * The name of the leaderboard.
   */
  name?: string;
  /**
   * How scores are ordered.
   */
  order?:  | "SCORE_ORDER_UNSPECIFIED" | "LARGER_IS_BETTER" | "SMALLER_IS_BETTER";
}

/**
 * The Leaderboard Entry resource.
 */
export interface LeaderboardEntry {
  /**
   * The localized string for the numerical value of this score.
   */
  formattedScore?: string;
  /**
   * The localized string for the rank of this score for this leaderboard.
   */
  formattedScoreRank?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#leaderboardEntry`.
   */
  kind?: string;
  /**
   * The player who holds this score.
   */
  player?: Player;
  /**
   * The rank of this score for this leaderboard.
   */
  scoreRank?: bigint;
  /**
   * Additional information about the score. Values must contain no more than
   * 64 URI-safe characters as defined by section 2.3 of RFC 3986.
   */
  scoreTag?: string;
  /**
   * The numerical value of this score.
   */
  scoreValue?: bigint;
  /**
   * The time span of this high score.
   */
  timeSpan?:  | "SCORE_TIME_SPAN_UNSPECIFIED" | "ALL_TIME" | "WEEKLY" | "DAILY";
  /**
   * The timestamp at which this score was recorded, in milliseconds since the
   * epoch in UTC.
   */
  writeTimestampMillis?: bigint;
}

function serializeLeaderboardEntry(data: any): LeaderboardEntry {
  return {
    ...data,
    player: data["player"] !== undefined ? serializePlayer(data["player"]) : undefined,
    scoreRank: data["scoreRank"] !== undefined ? String(data["scoreRank"]) : undefined,
    scoreValue: data["scoreValue"] !== undefined ? String(data["scoreValue"]) : undefined,
    writeTimestampMillis: data["writeTimestampMillis"] !== undefined ? String(data["writeTimestampMillis"]) : undefined,
  };
}

function deserializeLeaderboardEntry(data: any): LeaderboardEntry {
  return {
    ...data,
    player: data["player"] !== undefined ? deserializePlayer(data["player"]) : undefined,
    scoreRank: data["scoreRank"] !== undefined ? BigInt(data["scoreRank"]) : undefined,
    scoreValue: data["scoreValue"] !== undefined ? BigInt(data["scoreValue"]) : undefined,
    writeTimestampMillis: data["writeTimestampMillis"] !== undefined ? BigInt(data["writeTimestampMillis"]) : undefined,
  };
}

/**
 * A list of leaderboard objects.
 */
export interface LeaderboardListResponse {
  /**
   * The leaderboards.
   */
  items?: Leaderboard[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#leaderboardListResponse`.
   */
  kind?: string;
  /**
   * Token corresponding to the next page of results.
   */
  nextPageToken?: string;
}

/**
 * A score rank in a leaderboard.
 */
export interface LeaderboardScoreRank {
  /**
   * The number of scores in the leaderboard as a string.
   */
  formattedNumScores?: string;
  /**
   * The rank in the leaderboard as a string.
   */
  formattedRank?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#leaderboardScoreRank`.
   */
  kind?: string;
  /**
   * The number of scores in the leaderboard.
   */
  numScores?: bigint;
  /**
   * The rank in the leaderboard.
   */
  rank?: bigint;
}

function serializeLeaderboardScoreRank(data: any): LeaderboardScoreRank {
  return {
    ...data,
    numScores: data["numScores"] !== undefined ? String(data["numScores"]) : undefined,
    rank: data["rank"] !== undefined ? String(data["rank"]) : undefined,
  };
}

function deserializeLeaderboardScoreRank(data: any): LeaderboardScoreRank {
  return {
    ...data,
    numScores: data["numScores"] !== undefined ? BigInt(data["numScores"]) : undefined,
    rank: data["rank"] !== undefined ? BigInt(data["rank"]) : undefined,
  };
}

/**
 * A ListScores response.
 */
export interface LeaderboardScores {
  /**
   * The scores in the leaderboard.
   */
  items?: LeaderboardEntry[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#leaderboardScores`.
   */
  kind?: string;
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
  /**
   * The total number of scores in the leaderboard.
   */
  numScores?: bigint;
  /**
   * The score of the requesting player on the leaderboard. The player's score
   * may appear both here and in the list of scores above. If you are viewing a
   * public leaderboard and the player is not sharing their gameplay information
   * publicly, the `scoreRank`and `formattedScoreRank` values will not be
   * present.
   */
  playerScore?: LeaderboardEntry;
  /**
   * The pagination token for the previous page of results.
   */
  prevPageToken?: string;
}

function serializeLeaderboardScores(data: any): LeaderboardScores {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeLeaderboardEntry(item))) : undefined,
    numScores: data["numScores"] !== undefined ? String(data["numScores"]) : undefined,
    playerScore: data["playerScore"] !== undefined ? serializeLeaderboardEntry(data["playerScore"]) : undefined,
  };
}

function deserializeLeaderboardScores(data: any): LeaderboardScores {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeLeaderboardEntry(item))) : undefined,
    numScores: data["numScores"] !== undefined ? BigInt(data["numScores"]) : undefined,
    playerScore: data["playerScore"] !== undefined ? deserializeLeaderboardEntry(data["playerScore"]) : undefined,
  };
}

/**
 * Additional options for Games#leaderboardsGet.
 */
export interface LeaderboardsGetOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
}

/**
 * Additional options for Games#leaderboardsList.
 */
export interface LeaderboardsListOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of leaderboards to return in the response. For any
   * response, the actual number of leaderboards returned may be less than the
   * specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * The metagame config resource
 */
export interface MetagameConfig {
  /**
   * Current version of the metagame configuration data. When this data is
   * updated, the version number will be increased by one.
   */
  currentVersion?: number;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#metagameConfig`.
   */
  kind?: string;
  /**
   * The list of player levels.
   */
  playerLevels?: PlayerLevel[];
}

function serializeMetagameConfig(data: any): MetagameConfig {
  return {
    ...data,
    playerLevels: data["playerLevels"] !== undefined ? data["playerLevels"].map((item: any) => (serializePlayerLevel(item))) : undefined,
  };
}

function deserializeMetagameConfig(data: any): MetagameConfig {
  return {
    ...data,
    playerLevels: data["playerLevels"] !== undefined ? data["playerLevels"].map((item: any) => (deserializePlayerLevel(item))) : undefined,
  };
}

/**
 * Additional options for Games#metagameListCategoriesByPlayer.
 */
export interface MetagameListCategoriesByPlayerOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of category resources to return in the response, used
   * for paging. For any response, the actual number of category resources
   * returned may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * A Player resource.
 */
export interface Player {
  /**
   * The base URL for the image that represents the player.
   */
  avatarImageUrl?: string;
  /**
   * The url to the landscape mode player banner image.
   */
  bannerUrlLandscape?: string;
  /**
   * The url to the portrait mode player banner image.
   */
  bannerUrlPortrait?: string;
  /**
   * The name to display for the player.
   */
  displayName?: string;
  /**
   * An object to represent Play Game experience information for the player.
   */
  experienceInfo?: PlayerExperienceInfo;
  /**
   * The friend status of the given player, relative to the requester. This is
   * unset if the player is not sharing their friends list with the game.
   */
  friendStatus?:  | "FRIEND_STATUS_UNSPECIFIED" | "NO_RELATIONSHIP" | "FRIEND";
  /**
   * Per-application unique player identifier.
   */
  gamePlayerId?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#player`
   */
  kind?: string;
  /**
   * A representation of the individual components of the name.
   */
  name?: {
    familyName?: string;
    givenName?: string;
  };
  /**
   * The player ID that was used for this player the first time they signed
   * into the game in question. This is only populated for calls to player.get
   * for the requesting player, only if the player ID has subsequently changed,
   * and only to clients that support remapping player IDs.
   */
  originalPlayerId?: string;
  /**
   * The ID of the player.
   */
  playerId?: string;
  /**
   * The player's profile settings. Controls whether or not the player's
   * profile is visible to other players.
   */
  profileSettings?: ProfileSettings;
  /**
   * The player's title rewarded for their game activities.
   */
  title?: string;
}

function serializePlayer(data: any): Player {
  return {
    ...data,
    experienceInfo: data["experienceInfo"] !== undefined ? serializePlayerExperienceInfo(data["experienceInfo"]) : undefined,
  };
}

function deserializePlayer(data: any): Player {
  return {
    ...data,
    experienceInfo: data["experienceInfo"] !== undefined ? deserializePlayerExperienceInfo(data["experienceInfo"]) : undefined,
  };
}

/**
 * An achievement object.
 */
export interface PlayerAchievement {
  /**
   * The state of the achievement.
   */
  achievementState?:  | "STATE_UNSPECIFIED" | "HIDDEN" | "REVEALED" | "UNLOCKED";
  /**
   * The current steps for an incremental achievement.
   */
  currentSteps?: number;
  /**
   * Experience points earned for the achievement. This field is absent for
   * achievements that have not yet been unlocked and 0 for achievements that
   * have been unlocked by testers but that are unpublished.
   */
  experiencePoints?: bigint;
  /**
   * The current steps for an incremental achievement as a string.
   */
  formattedCurrentStepsString?: string;
  /**
   * The ID of the achievement.
   */
  id?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerAchievement`.
   */
  kind?: string;
  /**
   * The timestamp of the last modification to this achievement's state.
   */
  lastUpdatedTimestamp?: bigint;
}

function serializePlayerAchievement(data: any): PlayerAchievement {
  return {
    ...data,
    experiencePoints: data["experiencePoints"] !== undefined ? String(data["experiencePoints"]) : undefined,
    lastUpdatedTimestamp: data["lastUpdatedTimestamp"] !== undefined ? String(data["lastUpdatedTimestamp"]) : undefined,
  };
}

function deserializePlayerAchievement(data: any): PlayerAchievement {
  return {
    ...data,
    experiencePoints: data["experiencePoints"] !== undefined ? BigInt(data["experiencePoints"]) : undefined,
    lastUpdatedTimestamp: data["lastUpdatedTimestamp"] !== undefined ? BigInt(data["lastUpdatedTimestamp"]) : undefined,
  };
}

/**
 * A list of achievement objects.
 */
export interface PlayerAchievementListResponse {
  /**
   * The achievements.
   */
  items?: PlayerAchievement[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerAchievementListResponse`.
   */
  kind?: string;
  /**
   * Token corresponding to the next page of results.
   */
  nextPageToken?: string;
}

function serializePlayerAchievementListResponse(data: any): PlayerAchievementListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePlayerAchievement(item))) : undefined,
  };
}

function deserializePlayerAchievementListResponse(data: any): PlayerAchievementListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePlayerAchievement(item))) : undefined,
  };
}

/**
 * An event status resource.
 */
export interface PlayerEvent {
  /**
   * The ID of the event definition.
   */
  definitionId?: string;
  /**
   * The current number of times this event has occurred, as a string. The
   * formatting of this string depends on the configuration of your event in the
   * Play Games Developer Console.
   */
  formattedNumEvents?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerEvent`.
   */
  kind?: string;
  /**
   * The current number of times this event has occurred.
   */
  numEvents?: bigint;
  /**
   * The ID of the player.
   */
  playerId?: string;
}

function serializePlayerEvent(data: any): PlayerEvent {
  return {
    ...data,
    numEvents: data["numEvents"] !== undefined ? String(data["numEvents"]) : undefined,
  };
}

function deserializePlayerEvent(data: any): PlayerEvent {
  return {
    ...data,
    numEvents: data["numEvents"] !== undefined ? BigInt(data["numEvents"]) : undefined,
  };
}

/**
 * A ListByPlayer response.
 */
export interface PlayerEventListResponse {
  /**
   * The player events.
   */
  items?: PlayerEvent[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerEventListResponse`.
   */
  kind?: string;
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
}

function serializePlayerEventListResponse(data: any): PlayerEventListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePlayerEvent(item))) : undefined,
  };
}

function deserializePlayerEventListResponse(data: any): PlayerEventListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePlayerEvent(item))) : undefined,
  };
}

/**
 * 1P/3P metadata about the player's experience.
 */
export interface PlayerExperienceInfo {
  /**
   * The current number of experience points for the player.
   */
  currentExperiencePoints?: bigint;
  /**
   * The current level of the player.
   */
  currentLevel?: PlayerLevel;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerExperienceInfo`.
   */
  kind?: string;
  /**
   * The timestamp when the player was leveled up, in millis since Unix epoch
   * UTC.
   */
  lastLevelUpTimestampMillis?: bigint;
  /**
   * The next level of the player. If the current level is the maximum level,
   * this should be same as the current level.
   */
  nextLevel?: PlayerLevel;
}

function serializePlayerExperienceInfo(data: any): PlayerExperienceInfo {
  return {
    ...data,
    currentExperiencePoints: data["currentExperiencePoints"] !== undefined ? String(data["currentExperiencePoints"]) : undefined,
    currentLevel: data["currentLevel"] !== undefined ? serializePlayerLevel(data["currentLevel"]) : undefined,
    lastLevelUpTimestampMillis: data["lastLevelUpTimestampMillis"] !== undefined ? String(data["lastLevelUpTimestampMillis"]) : undefined,
    nextLevel: data["nextLevel"] !== undefined ? serializePlayerLevel(data["nextLevel"]) : undefined,
  };
}

function deserializePlayerExperienceInfo(data: any): PlayerExperienceInfo {
  return {
    ...data,
    currentExperiencePoints: data["currentExperiencePoints"] !== undefined ? BigInt(data["currentExperiencePoints"]) : undefined,
    currentLevel: data["currentLevel"] !== undefined ? deserializePlayerLevel(data["currentLevel"]) : undefined,
    lastLevelUpTimestampMillis: data["lastLevelUpTimestampMillis"] !== undefined ? BigInt(data["lastLevelUpTimestampMillis"]) : undefined,
    nextLevel: data["nextLevel"] !== undefined ? deserializePlayerLevel(data["nextLevel"]) : undefined,
  };
}

/**
 * A player leaderboard score object.
 */
export interface PlayerLeaderboardScore {
  /**
   * The rank of the score in the friends collection for this leaderboard.
   */
  friendsRank?: LeaderboardScoreRank;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerLeaderboardScore`.
   */
  kind?: string;
  /**
   * The ID of the leaderboard this score is in.
   */
  leaderboard_id?: string;
  /**
   * The public rank of the score in this leaderboard. This object will not be
   * present if the user is not sharing their scores publicly.
   */
  publicRank?: LeaderboardScoreRank;
  /**
   * The formatted value of this score.
   */
  scoreString?: string;
  /**
   * Additional information about the score. Values must contain no more than
   * 64 URI-safe characters as defined by section 2.3 of RFC 3986.
   */
  scoreTag?: string;
  /**
   * The numerical value of this score.
   */
  scoreValue?: bigint;
  /**
   * The social rank of the score in this leaderboard.
   */
  socialRank?: LeaderboardScoreRank;
  /**
   * The time span of this score.
   */
  timeSpan?:  | "SCORE_TIME_SPAN_UNSPECIFIED" | "ALL_TIME" | "WEEKLY" | "DAILY";
  /**
   * The timestamp at which this score was recorded, in milliseconds since the
   * epoch in UTC.
   */
  writeTimestamp?: bigint;
}

function serializePlayerLeaderboardScore(data: any): PlayerLeaderboardScore {
  return {
    ...data,
    friendsRank: data["friendsRank"] !== undefined ? serializeLeaderboardScoreRank(data["friendsRank"]) : undefined,
    publicRank: data["publicRank"] !== undefined ? serializeLeaderboardScoreRank(data["publicRank"]) : undefined,
    scoreValue: data["scoreValue"] !== undefined ? String(data["scoreValue"]) : undefined,
    socialRank: data["socialRank"] !== undefined ? serializeLeaderboardScoreRank(data["socialRank"]) : undefined,
    writeTimestamp: data["writeTimestamp"] !== undefined ? String(data["writeTimestamp"]) : undefined,
  };
}

function deserializePlayerLeaderboardScore(data: any): PlayerLeaderboardScore {
  return {
    ...data,
    friendsRank: data["friendsRank"] !== undefined ? deserializeLeaderboardScoreRank(data["friendsRank"]) : undefined,
    publicRank: data["publicRank"] !== undefined ? deserializeLeaderboardScoreRank(data["publicRank"]) : undefined,
    scoreValue: data["scoreValue"] !== undefined ? BigInt(data["scoreValue"]) : undefined,
    socialRank: data["socialRank"] !== undefined ? deserializeLeaderboardScoreRank(data["socialRank"]) : undefined,
    writeTimestamp: data["writeTimestamp"] !== undefined ? BigInt(data["writeTimestamp"]) : undefined,
  };
}

/**
 * A list of player leaderboard scores.
 */
export interface PlayerLeaderboardScoreListResponse {
  /**
   * The leaderboard scores.
   */
  items?: PlayerLeaderboardScore[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerLeaderboardScoreListResponse`.
   */
  kind?: string;
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
  /**
   * The Player resources for the owner of this score.
   */
  player?: Player;
}

function serializePlayerLeaderboardScoreListResponse(data: any): PlayerLeaderboardScoreListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePlayerLeaderboardScore(item))) : undefined,
    player: data["player"] !== undefined ? serializePlayer(data["player"]) : undefined,
  };
}

function deserializePlayerLeaderboardScoreListResponse(data: any): PlayerLeaderboardScoreListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePlayerLeaderboardScore(item))) : undefined,
    player: data["player"] !== undefined ? deserializePlayer(data["player"]) : undefined,
  };
}

/**
 * 1P/3P metadata about a user's level.
 */
export interface PlayerLevel {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerLevel`.
   */
  kind?: string;
  /**
   * The level for the user.
   */
  level?: number;
  /**
   * The maximum experience points for this level.
   */
  maxExperiencePoints?: bigint;
  /**
   * The minimum experience points for this level.
   */
  minExperiencePoints?: bigint;
}

function serializePlayerLevel(data: any): PlayerLevel {
  return {
    ...data,
    maxExperiencePoints: data["maxExperiencePoints"] !== undefined ? String(data["maxExperiencePoints"]) : undefined,
    minExperiencePoints: data["minExperiencePoints"] !== undefined ? String(data["minExperiencePoints"]) : undefined,
  };
}

function deserializePlayerLevel(data: any): PlayerLevel {
  return {
    ...data,
    maxExperiencePoints: data["maxExperiencePoints"] !== undefined ? BigInt(data["maxExperiencePoints"]) : undefined,
    minExperiencePoints: data["minExperiencePoints"] !== undefined ? BigInt(data["minExperiencePoints"]) : undefined,
  };
}

/**
 * A third party player list response.
 */
export interface PlayerListResponse {
  /**
   * The players.
   */
  items?: Player[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerListResponse`.
   */
  kind?: string;
  /**
   * Token corresponding to the next page of results.
   */
  nextPageToken?: string;
}

function serializePlayerListResponse(data: any): PlayerListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePlayer(item))) : undefined,
  };
}

function deserializePlayerListResponse(data: any): PlayerListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePlayer(item))) : undefined,
  };
}

/**
 * A player score.
 */
export interface PlayerScore {
  /**
   * The formatted score for this player score.
   */
  formattedScore?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerScore`.
   */
  kind?: string;
  /**
   * The numerical value for this player score.
   */
  score?: bigint;
  /**
   * Additional information about this score. Values will contain no more than
   * 64 URI-safe characters as defined by section 2.3 of RFC 3986.
   */
  scoreTag?: string;
  /**
   * The time span for this player score.
   */
  timeSpan?:  | "SCORE_TIME_SPAN_UNSPECIFIED" | "ALL_TIME" | "WEEKLY" | "DAILY";
}

function serializePlayerScore(data: any): PlayerScore {
  return {
    ...data,
    score: data["score"] !== undefined ? String(data["score"]) : undefined,
  };
}

function deserializePlayerScore(data: any): PlayerScore {
  return {
    ...data,
    score: data["score"] !== undefined ? BigInt(data["score"]) : undefined,
  };
}

/**
 * A list of score submission statuses.
 */
export interface PlayerScoreListResponse {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerScoreListResponse`.
   */
  kind?: string;
  /**
   * The score submissions statuses.
   */
  submittedScores?: PlayerScoreResponse[];
}

function serializePlayerScoreListResponse(data: any): PlayerScoreListResponse {
  return {
    ...data,
    submittedScores: data["submittedScores"] !== undefined ? data["submittedScores"].map((item: any) => (serializePlayerScoreResponse(item))) : undefined,
  };
}

function deserializePlayerScoreListResponse(data: any): PlayerScoreListResponse {
  return {
    ...data,
    submittedScores: data["submittedScores"] !== undefined ? data["submittedScores"].map((item: any) => (deserializePlayerScoreResponse(item))) : undefined,
  };
}

/**
 * A list of leaderboard entry resources.
 */
export interface PlayerScoreResponse {
  /**
   * The time spans where the submitted score is better than the existing score
   * for that time span.
   */
  beatenScoreTimeSpans?:  | "SCORE_TIME_SPAN_UNSPECIFIED" | "ALL_TIME" | "WEEKLY" | "DAILY"[];
  /**
   * The formatted value of the submitted score.
   */
  formattedScore?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerScoreResponse`.
   */
  kind?: string;
  /**
   * The leaderboard ID that this score was submitted to.
   */
  leaderboardId?: string;
  /**
   * Additional information about this score. Values will contain no more than
   * 64 URI-safe characters as defined by section 2.3 of RFC 3986.
   */
  scoreTag?: string;
  /**
   * The scores in time spans that have not been beaten. As an example, the
   * submitted score may be better than the player's `DAILY` score, but not
   * better than the player's scores for the `WEEKLY` or `ALL_TIME` time spans.
   */
  unbeatenScores?: PlayerScore[];
}

function serializePlayerScoreResponse(data: any): PlayerScoreResponse {
  return {
    ...data,
    unbeatenScores: data["unbeatenScores"] !== undefined ? data["unbeatenScores"].map((item: any) => (serializePlayerScore(item))) : undefined,
  };
}

function deserializePlayerScoreResponse(data: any): PlayerScoreResponse {
  return {
    ...data,
    unbeatenScores: data["unbeatenScores"] !== undefined ? data["unbeatenScores"].map((item: any) => (deserializePlayerScore(item))) : undefined,
  };
}

/**
 * A list of score submission requests.
 */
export interface PlayerScoreSubmissionList {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#playerScoreSubmissionList`.
   */
  kind?: string;
  /**
   * The score submissions.
   */
  scores?: ScoreSubmission[];
}

function serializePlayerScoreSubmissionList(data: any): PlayerScoreSubmissionList {
  return {
    ...data,
    scores: data["scores"] !== undefined ? data["scores"].map((item: any) => (serializeScoreSubmission(item))) : undefined,
  };
}

function deserializePlayerScoreSubmissionList(data: any): PlayerScoreSubmissionList {
  return {
    ...data,
    scores: data["scores"] !== undefined ? data["scores"].map((item: any) => (deserializeScoreSubmission(item))) : undefined,
  };
}

/**
 * Additional options for Games#playersGet.
 */
export interface PlayersGetOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * Consistency token of the player id. The call returns a 'not found' result
   * when the token is present and invalid. Empty value is ignored. See also
   * GlobalPlayerIdConsistencyTokenProto
   */
  playerIdConsistencyToken?: string;
}

/**
 * Additional options for Games#playersList.
 */
export interface PlayersListOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of player resources to return in the response, used for
   * paging. For any response, the actual number of player resources returned
   * may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * Profile settings
 */
export interface ProfileSettings {
  friendsListVisibility?:  | "FRIENDS_LIST_VISIBILITY_UNSPECIFIED" | "VISIBLE" | "REQUEST_REQUIRED" | "UNAVAILABLE";
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#profileSettings`.
   */
  kind?: string;
  /**
   * Whether the player's profile is visible to the currently signed in player.
   */
  profileVisible?: boolean;
}

/**
 * A third party checking a revision response.
 */
export interface RevisionCheckResponse {
  /**
   * The version of the API this client revision should use when calling API
   * methods.
   */
  apiVersion?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#revisionCheckResponse`.
   */
  kind?: string;
  /**
   * The result of the revision check.
   */
  revisionStatus?:  | "REVISION_STATUS_UNSPECIFIED" | "OK" | "DEPRECATED" | "INVALID";
}

/**
 * Additional options for Games#revisionsCheck.
 */
export interface RevisionsCheckOptions {
  /**
   * The revision of the client SDK used by your application. Format:
   * `[PLATFORM_TYPE]:[VERSION_NUMBER]`. Possible values of `PLATFORM_TYPE` are:
   * * `ANDROID` - Client is running the Android SDK. * `IOS` - Client is
   * running the iOS SDK. * `WEB_APP` - Client is running as a Web App.
   */
  clientRevision: string;
}

/**
 * Scoped player identifiers.
 */
export interface ScopedPlayerIds {
  /**
   * Identifier of the player across all games of the given developer. Every
   * player has the same developer_player_key in all games of one developer.
   * Developer player key changes for the game if the game is transferred to
   * another developer. Note that game_player_id will stay unchanged.
   */
  developerPlayerKey?: string;
  /**
   * Game-scoped player identifier. This is the same id that is returned in
   * GetPlayer game_player_id field.
   */
  gamePlayerId?: string;
}

/**
 * Additional options for Games#scoresGet.
 */
export interface ScoresGetOptions {
  /**
   * The types of ranks to return. If the parameter is omitted, no ranks will
   * be returned.
   */
  includeRankType?:  | "INCLUDE_RANK_TYPE_UNSPECIFIED" | "ALL" | "PUBLIC" | "SOCIAL" | "FRIENDS";
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of leaderboard scores to return in the response. For
   * any response, the actual number of leaderboard scores returned may be less
   * than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * Additional options for Games#scoresList.
 */
export interface ScoresListOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of leaderboard scores to return in the response. For
   * any response, the actual number of leaderboard scores returned may be less
   * than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * The time span for the scores and ranks you're requesting.
   */
  timeSpan:  | "SCORE_TIME_SPAN_UNSPECIFIED" | "ALL_TIME" | "WEEKLY" | "DAILY";
}

/**
 * Additional options for Games#scoresListWindow.
 */
export interface ScoresListWindowOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of leaderboard scores to return in the response. For
   * any response, the actual number of leaderboard scores returned may be less
   * than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
  /**
   * The preferred number of scores to return above the player's score. More
   * scores may be returned if the player is at the bottom of the leaderboard;
   * fewer may be returned if the player is at the top. Must be less than or
   * equal to maxResults.
   */
  resultsAbove?: number;
  /**
   * True if the top scores should be returned when the player is not in the
   * leaderboard. Defaults to true.
   */
  returnTopIfAbsent?: boolean;
  /**
   * The time span for the scores and ranks you're requesting.
   */
  timeSpan:  | "SCORE_TIME_SPAN_UNSPECIFIED" | "ALL_TIME" | "WEEKLY" | "DAILY";
}

/**
 * Additional options for Games#scoresSubmitMultiple.
 */
export interface ScoresSubmitMultipleOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
}

/**
 * Additional options for Games#scoresSubmit.
 */
export interface ScoresSubmitOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The score you're submitting. The submitted score is ignored if it is worse
   * than a previously submitted score, where worse depends on the leaderboard
   * sort order. The meaning of the score value depends on the leaderboard
   * format type. For fixed-point, the score represents the raw value. For time,
   * the score represents elapsed time in milliseconds. For currency, the score
   * represents a value in micro units.
   */
  score: bigint;
  /**
   * Additional information about the score you're submitting. Values must
   * contain no more than 64 URI-safe characters as defined by section 2.3 of
   * RFC 3986.
   */
  scoreTag?: string;
}

function serializeScoresSubmitOptions(data: any): ScoresSubmitOptions {
  return {
    ...data,
    score: String(data["score"]),
  };
}

function deserializeScoresSubmitOptions(data: any): ScoresSubmitOptions {
  return {
    ...data,
    score: BigInt(data["score"]),
  };
}

/**
 * A request to submit a score to leaderboards.
 */
export interface ScoreSubmission {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#scoreSubmission`.
   */
  kind?: string;
  /**
   * The leaderboard this score is being submitted to.
   */
  leaderboardId?: string;
  /**
   * The new score being submitted.
   */
  score?: bigint;
  /**
   * Additional information about this score. Values will contain no more than
   * 64 URI-safe characters as defined by section 2.3 of RFC 3986.
   */
  scoreTag?: string;
  /**
   * Signature Values will contain URI-safe characters as defined by section
   * 2.3 of RFC 3986.
   */
  signature?: string;
}

function serializeScoreSubmission(data: any): ScoreSubmission {
  return {
    ...data,
    score: data["score"] !== undefined ? String(data["score"]) : undefined,
  };
}

function deserializeScoreSubmission(data: any): ScoreSubmission {
  return {
    ...data,
    score: data["score"] !== undefined ? BigInt(data["score"]) : undefined,
  };
}

/**
 * An snapshot object.
 */
export interface Snapshot {
  /**
   * The cover image of this snapshot. May be absent if there is no image.
   */
  coverImage?: SnapshotImage;
  /**
   * The description of this snapshot.
   */
  description?: string;
  /**
   * The ID of the file underlying this snapshot in the Drive API. Only present
   * if the snapshot is a view on a Drive file and the file is owned by the
   * caller.
   */
  driveId?: string;
  /**
   * The duration associated with this snapshot, in millis.
   */
  durationMillis?: bigint;
  /**
   * The ID of the snapshot.
   */
  id?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#snapshot`.
   */
  kind?: string;
  /**
   * The timestamp (in millis since Unix epoch) of the last modification to
   * this snapshot.
   */
  lastModifiedMillis?: bigint;
  /**
   * The progress value (64-bit integer set by developer) associated with this
   * snapshot.
   */
  progressValue?: bigint;
  /**
   * The title of this snapshot.
   */
  title?: string;
  /**
   * The type of this snapshot.
   */
  type?:  | "SNAPSHOT_TYPE_UNSPECIFIED" | "SAVE_GAME";
  /**
   * The unique name provided when the snapshot was created.
   */
  uniqueName?: string;
}

function serializeSnapshot(data: any): Snapshot {
  return {
    ...data,
    durationMillis: data["durationMillis"] !== undefined ? String(data["durationMillis"]) : undefined,
    lastModifiedMillis: data["lastModifiedMillis"] !== undefined ? String(data["lastModifiedMillis"]) : undefined,
    progressValue: data["progressValue"] !== undefined ? String(data["progressValue"]) : undefined,
  };
}

function deserializeSnapshot(data: any): Snapshot {
  return {
    ...data,
    durationMillis: data["durationMillis"] !== undefined ? BigInt(data["durationMillis"]) : undefined,
    lastModifiedMillis: data["lastModifiedMillis"] !== undefined ? BigInt(data["lastModifiedMillis"]) : undefined,
    progressValue: data["progressValue"] !== undefined ? BigInt(data["progressValue"]) : undefined,
  };
}

/**
 * An image of a snapshot.
 */
export interface SnapshotImage {
  /**
   * The height of the image.
   */
  height?: number;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#snapshotImage`.
   */
  kind?: string;
  /**
   * The MIME type of the image.
   */
  mime_type?: string;
  /**
   * The URL of the image. This URL may be invalidated at any time and should
   * not be cached.
   */
  url?: string;
  /**
   * The width of the image.
   */
  width?: number;
}

/**
 * A third party list snapshots response.
 */
export interface SnapshotListResponse {
  /**
   * The snapshots.
   */
  items?: Snapshot[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#snapshotListResponse`.
   */
  kind?: string;
  /**
   * Token corresponding to the next page of results. If there are no more
   * results, the token is omitted.
   */
  nextPageToken?: string;
}

function serializeSnapshotListResponse(data: any): SnapshotListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeSnapshot(item))) : undefined,
  };
}

function deserializeSnapshotListResponse(data: any): SnapshotListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeSnapshot(item))) : undefined,
  };
}

/**
 * Additional options for Games#snapshotsGet.
 */
export interface SnapshotsGetOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
}

/**
 * Additional options for Games#snapshotsList.
 */
export interface SnapshotsListOptions {
  /**
   * The preferred language to use for strings returned by this method.
   */
  language?: string;
  /**
   * The maximum number of snapshot resources to return in the response, used
   * for paging. For any response, the actual number of snapshot resources
   * returned may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * A third party stats resource.
 */
export interface StatsResponse {
  /**
   * Average session length in minutes of the player. E.g., 1, 30, 60, ... .
   * Not populated if there is not enough information.
   */
  avg_session_length_minutes?: number;
  /**
   * The probability of the player not returning to play the game in the next
   * day. E.g., 0, 0.1, 0.5, ..., 1.0. Not populated if there is not enough
   * information.
   */
  churn_probability?: number;
  /**
   * Number of days since the player last played this game. E.g., 0, 1, 5, 10,
   * ... . Not populated if there is not enough information.
   */
  days_since_last_played?: number;
  /**
   * The probability of the player going to spend beyond a threshold amount of
   * money. E.g., 0, 0.25, 0.50, 0.75. Not populated if there is not enough
   * information.
   */
  high_spender_probability?: number;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `games#statsResponse`.
   */
  kind?: string;
  /**
   * Number of in-app purchases made by the player in this game. E.g., 0, 1, 5,
   * 10, ... . Not populated if there is not enough information.
   */
  num_purchases?: number;
  /**
   * The approximate number of sessions of the player within the last 28 days,
   * where a session begins when the player is connected to Play Games Services
   * and ends when they are disconnected. E.g., 0, 1, 5, 10, ... . Not populated
   * if there is not enough information.
   */
  num_sessions?: number;
  /**
   * The approximation of the sessions percentile of the player within the last
   * 30 days, where a session begins when the player is connected to Play Games
   * Services and ends when they are disconnected. E.g., 0, 0.25, 0.5, 0.75. Not
   * populated if there is not enough information.
   */
  num_sessions_percentile?: number;
  /**
   * The approximate spend percentile of the player in this game. E.g., 0,
   * 0.25, 0.5, 0.75. Not populated if there is not enough information.
   */
  spend_percentile?: number;
  /**
   * The probability of the player going to spend the game in the next seven
   * days. E.g., 0, 0.25, 0.50, 0.75. Not populated if there is not enough
   * information.
   */
  spend_probability?: number;
  /**
   * The predicted amount of money that the player going to spend in the next
   * 28 days. E.g., 1, 30, 60, ... . Not populated if there is not enough
   * information.
   */
  total_spend_next_28_days?: number;
}