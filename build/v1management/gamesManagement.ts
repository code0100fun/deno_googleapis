// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play Game Management Client for Deno
 * ===========================================
 * 
 * The Google Play Game Management API allows developers to manage resources from the Google Play Game service.
 * 
 * Docs: https://developers.google.com/games/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Play Game Management API allows developers to manage resources
 * from the Google Play Game service.
 */
export class GamesManagement {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://gamesmanagement.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Resets the achievement with the given ID for the currently authenticated
   * player. This method is only accessible to whitelisted tester accounts for
   * your application.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementsReset(achievementId: string): Promise<AchievementResetResponse> {
    const url = new URL(`${this.#baseUrl}games/v1management/achievements/${ achievementId }/reset`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AchievementResetResponse;
  }

  /**
   * Resets all achievements for the currently authenticated player for your
   * application. This method is only accessible to whitelisted tester accounts
   * for your application.
   *
   */
  async achievementsResetAll(): Promise<AchievementResetAllResponse> {
    const url = new URL(`${this.#baseUrl}games/v1management/achievements/reset`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AchievementResetAllResponse;
  }

  /**
   * Resets all draft achievements for all players. This method is only
   * available to user accounts for your developer console.
   *
   */
  async achievementsResetAllForAllPlayers(): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/achievements/resetAllForAllPlayers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets the achievement with the given ID for all players. This method is
   * only available to user accounts for your developer console. Only draft
   * achievements can be reset.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementsResetForAllPlayers(achievementId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/achievements/${ achievementId }/resetForAllPlayers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets achievements with the given IDs for all players. This method is
   * only available to user accounts for your developer console. Only draft
   * achievements may be reset.
   *
   */
  async achievementsResetMultipleForAllPlayers(req: AchievementResetMultipleForAllRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/achievements/resetMultipleForAllPlayers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Get the list of players hidden from the given application. This method is
   * only available to user accounts for your developer console.
   *
   * @param applicationId The application ID from the Google Play developer console.
   */
  async applicationsListHidden(applicationId: string, opts: ApplicationsListHiddenOptions = {}): Promise<HiddenPlayerList> {
    const url = new URL(`${this.#baseUrl}games/v1management/applications/${ applicationId }/players/hidden`);
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
    return data as HiddenPlayerList;
  }

  /**
   * Resets all player progress on the event with the given ID for the
   * currently authenticated player. This method is only accessible to
   * whitelisted tester accounts for your application.
   *
   * @param eventId The ID of the event.
   */
  async eventsReset(eventId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/events/${ eventId }/reset`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets all player progress on all events for the currently authenticated
   * player. This method is only accessible to whitelisted tester accounts for
   * your application.
   *
   */
  async eventsResetAll(): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/events/reset`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets all draft events for all players. This method is only available to
   * user accounts for your developer console.
   *
   */
  async eventsResetAllForAllPlayers(): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/events/resetAllForAllPlayers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets the event with the given ID for all players. This method is only
   * available to user accounts for your developer console. Only draft events
   * can be reset.
   *
   * @param eventId The ID of the event.
   */
  async eventsResetForAllPlayers(eventId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/events/${ eventId }/resetForAllPlayers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets events with the given IDs for all players. This method is only
   * available to user accounts for your developer console. Only draft events
   * may be reset.
   *
   */
  async eventsResetMultipleForAllPlayers(req: EventsResetMultipleForAllRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/events/resetMultipleForAllPlayers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Hide the given player's leaderboard scores from the given application.
   * This method is only available to user accounts for your developer console.
   *
   * @param applicationId The application ID from the Google Play developer console.
   * @param playerId A player ID. A value of `me` may be used in place of the authenticated player's ID.
   */
  async playersHide(applicationId: string, playerId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/applications/${ applicationId }/players/hidden/${ playerId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Unhide the given player's leaderboard scores from the given application.
   * This method is only available to user accounts for your developer console.
   *
   * @param applicationId The application ID from the Google Play developer console.
   * @param playerId A player ID. A value of `me` may be used in place of the authenticated player's ID.
   */
  async playersUnhide(applicationId: string, playerId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/applications/${ applicationId }/players/hidden/${ playerId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Resets scores for the leaderboard with the given ID for the currently
   * authenticated player. This method is only accessible to whitelisted tester
   * accounts for your application.
   *
   * @param leaderboardId The ID of the leaderboard.
   */
  async scoresReset(leaderboardId: string): Promise<PlayerScoreResetResponse> {
    const url = new URL(`${this.#baseUrl}games/v1management/leaderboards/${ leaderboardId }/scores/reset`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as PlayerScoreResetResponse;
  }

  /**
   * Resets all scores for all leaderboards for the currently authenticated
   * players. This method is only accessible to whitelisted tester accounts for
   * your application.
   *
   */
  async scoresResetAll(): Promise<PlayerScoreResetAllResponse> {
    const url = new URL(`${this.#baseUrl}games/v1management/scores/reset`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as PlayerScoreResetAllResponse;
  }

  /**
   * Resets scores for all draft leaderboards for all players. This method is
   * only available to user accounts for your developer console.
   *
   */
  async scoresResetAllForAllPlayers(): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/scores/resetAllForAllPlayers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets scores for the leaderboard with the given ID for all players. This
   * method is only available to user accounts for your developer console. Only
   * draft leaderboards can be reset.
   *
   * @param leaderboardId The ID of the leaderboard.
   */
  async scoresResetForAllPlayers(leaderboardId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/leaderboards/${ leaderboardId }/scores/resetForAllPlayers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Resets scores for the leaderboards with the given IDs for all players.
   * This method is only available to user accounts for your developer console.
   * Only draft leaderboards may be reset.
   *
   */
  async scoresResetMultipleForAllPlayers(req: ScoresResetMultipleForAllRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1management/scores/resetMultipleForAllPlayers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }
}

/**
 * Achievement reset all response.
 */
export interface AchievementResetAllResponse {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#achievementResetAllResponse`.
   */
  kind?: string;
  /**
   * The achievement reset results.
   */
  results?: AchievementResetResponse[];
}

export interface AchievementResetMultipleForAllRequest {
  /**
   * The IDs of achievements to reset.
   */
  achievement_ids?: string[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#achievementResetMultipleForAllRequest`.
   */
  kind?: string;
}

/**
 * An achievement reset response.
 */
export interface AchievementResetResponse {
  /**
   * The current state of the achievement. This is the same as the initial
   * state of the achievement. Possible values are: - "`HIDDEN`"- Achievement is
   * hidden. - "`REVEALED`" - Achievement is revealed. - "`UNLOCKED`" -
   * Achievement is unlocked.
   */
  currentState?: string;
  /**
   * The ID of an achievement for which player state has been updated.
   */
  definitionId?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#achievementResetResponse`.
   */
  kind?: string;
  /**
   * Flag to indicate if the requested update actually occurred.
   */
  updateOccurred?: boolean;
}

/**
 * Additional options for GamesManagement#applicationsListHidden.
 */
export interface ApplicationsListHiddenOptions {
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
 * Multiple events reset all request.
 */
export interface EventsResetMultipleForAllRequest {
  /**
   * The IDs of events to reset.
   */
  event_ids?: string[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#eventsResetMultipleForAllRequest`.
   */
  kind?: string;
}

/**
 * 1P/3P metadata about the player's experience.
 */
export interface GamesPlayerExperienceInfoResource {
  /**
   * The current number of experience points for the player.
   */
  currentExperiencePoints?: bigint;
  /**
   * The current level of the player.
   */
  currentLevel?: GamesPlayerLevelResource;
  /**
   * The timestamp when the player was leveled up, in millis since Unix epoch
   * UTC.
   */
  lastLevelUpTimestampMillis?: bigint;
  /**
   * The next level of the player. If the current level is the maximum level,
   * this should be same as the current level.
   */
  nextLevel?: GamesPlayerLevelResource;
}

function serializeGamesPlayerExperienceInfoResource(data: any): GamesPlayerExperienceInfoResource {
  return {
    ...data,
    currentExperiencePoints: data["currentExperiencePoints"] !== undefined ? String(data["currentExperiencePoints"]) : undefined,
    currentLevel: data["currentLevel"] !== undefined ? serializeGamesPlayerLevelResource(data["currentLevel"]) : undefined,
    lastLevelUpTimestampMillis: data["lastLevelUpTimestampMillis"] !== undefined ? String(data["lastLevelUpTimestampMillis"]) : undefined,
    nextLevel: data["nextLevel"] !== undefined ? serializeGamesPlayerLevelResource(data["nextLevel"]) : undefined,
  };
}

function deserializeGamesPlayerExperienceInfoResource(data: any): GamesPlayerExperienceInfoResource {
  return {
    ...data,
    currentExperiencePoints: data["currentExperiencePoints"] !== undefined ? BigInt(data["currentExperiencePoints"]) : undefined,
    currentLevel: data["currentLevel"] !== undefined ? deserializeGamesPlayerLevelResource(data["currentLevel"]) : undefined,
    lastLevelUpTimestampMillis: data["lastLevelUpTimestampMillis"] !== undefined ? BigInt(data["lastLevelUpTimestampMillis"]) : undefined,
    nextLevel: data["nextLevel"] !== undefined ? deserializeGamesPlayerLevelResource(data["nextLevel"]) : undefined,
  };
}

/**
 * 1P/3P metadata about a user's level.
 */
export interface GamesPlayerLevelResource {
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

function serializeGamesPlayerLevelResource(data: any): GamesPlayerLevelResource {
  return {
    ...data,
    maxExperiencePoints: data["maxExperiencePoints"] !== undefined ? String(data["maxExperiencePoints"]) : undefined,
    minExperiencePoints: data["minExperiencePoints"] !== undefined ? String(data["minExperiencePoints"]) : undefined,
  };
}

function deserializeGamesPlayerLevelResource(data: any): GamesPlayerLevelResource {
  return {
    ...data,
    maxExperiencePoints: data["maxExperiencePoints"] !== undefined ? BigInt(data["maxExperiencePoints"]) : undefined,
    minExperiencePoints: data["minExperiencePoints"] !== undefined ? BigInt(data["minExperiencePoints"]) : undefined,
  };
}

/**
 * The HiddenPlayer resource.
 */
export interface HiddenPlayer {
  /**
   * Output only. The time this player was hidden.
   */
  readonly hiddenTimeMillis?: bigint;
  /**
   * Output only. Uniquely identifies the type of this resource. Value is
   * always the fixed string `gamesManagement#hiddenPlayer`.
   */
  readonly kind?: string;
  /**
   * Output only. The player information.
   */
  readonly player?: Player;
}

/**
 * A list of hidden players.
 */
export interface HiddenPlayerList {
  /**
   * The players.
   */
  items?: HiddenPlayer[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#hiddenPlayerList`.
   */
  kind?: string;
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
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
  experienceInfo?: GamesPlayerExperienceInfoResource;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#player`.
   */
  kind?: string;
  /**
   * An object representation of the individual components of the player's
   * name. For some players, these fields may not be present.
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
    experienceInfo: data["experienceInfo"] !== undefined ? serializeGamesPlayerExperienceInfoResource(data["experienceInfo"]) : undefined,
  };
}

function deserializePlayer(data: any): Player {
  return {
    ...data,
    experienceInfo: data["experienceInfo"] !== undefined ? deserializeGamesPlayerExperienceInfoResource(data["experienceInfo"]) : undefined,
  };
}

/**
 * A list of leaderboard reset resources.
 */
export interface PlayerScoreResetAllResponse {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#playerScoreResetAllResponse`.
   */
  kind?: string;
  /**
   * The leaderboard reset results.
   */
  results?: PlayerScoreResetResponse[];
}

/**
 * A list of reset leaderboard entry resources.
 */
export interface PlayerScoreResetResponse {
  /**
   * The ID of an leaderboard for which player state has been updated.
   */
  definitionId?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#playerScoreResetResponse`.
   */
  kind?: string;
  /**
   * The time spans of the updated score. Possible values are: - "`ALL_TIME`" -
   * The score is an all-time score. - "`WEEKLY`" - The score is a weekly score.
   * - "`DAILY`" - The score is a daily score.
   */
  resetScoreTimeSpans?: string[];
}

/**
 * Profile settings
 */
export interface ProfileSettings {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#profileSettings`.
   */
  kind?: string;
  profileVisible?: boolean;
}

export interface ScoresResetMultipleForAllRequest {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesManagement#scoresResetMultipleForAllRequest`.
   */
  kind?: string;
  /**
   * The IDs of leaderboards to reset.
   */
  leaderboard_ids?: string[];
}