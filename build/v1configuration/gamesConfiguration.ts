// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play Game Services Publishing API Client for Deno
 * ========================================================
 * 
 * The Google Play Game Services Publishing API allows developers to configure their games in Game Services.
 * 
 * Docs: https://developers.google.com/games/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Play Game Services Publishing API allows developers to configure
 * their games in Game Services.
 */
export class GamesConfiguration {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://gamesconfiguration.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Delete the achievement configuration with the given ID.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementConfigurationsDelete(achievementId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/achievements/${ achievementId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves the metadata of the achievement configuration with the given ID.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementConfigurationsGet(achievementId: string): Promise<AchievementConfiguration> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/achievements/${ achievementId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AchievementConfiguration;
  }

  /**
   * Insert a new achievement configuration in this application.
   *
   * @param applicationId The application ID from the Google Play developer console.
   */
  async achievementConfigurationsInsert(applicationId: string, req: AchievementConfiguration): Promise<AchievementConfiguration> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/applications/${ applicationId }/achievements`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AchievementConfiguration;
  }

  /**
   * Returns a list of the achievement configurations in this application.
   *
   * @param applicationId The application ID from the Google Play developer console.
   */
  async achievementConfigurationsList(applicationId: string, opts: AchievementConfigurationsListOptions = {}): Promise<AchievementConfigurationListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/applications/${ applicationId }/achievements`);
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
    return data as AchievementConfigurationListResponse;
  }

  /**
   * Update the metadata of the achievement configuration with the given ID.
   *
   * @param achievementId The ID of the achievement used by this method.
   */
  async achievementConfigurationsUpdate(achievementId: string, req: AchievementConfiguration): Promise<AchievementConfiguration> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/achievements/${ achievementId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as AchievementConfiguration;
  }

  /**
   * Delete the leaderboard configuration with the given ID.
   *
   * @param leaderboardId The ID of the leaderboard.
   */
  async leaderboardConfigurationsDelete(leaderboardId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/leaderboards/${ leaderboardId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves the metadata of the leaderboard configuration with the given ID.
   *
   * @param leaderboardId The ID of the leaderboard.
   */
  async leaderboardConfigurationsGet(leaderboardId: string): Promise<LeaderboardConfiguration> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/leaderboards/${ leaderboardId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLeaderboardConfiguration(data);
  }

  /**
   * Insert a new leaderboard configuration in this application.
   *
   * @param applicationId The application ID from the Google Play developer console.
   */
  async leaderboardConfigurationsInsert(applicationId: string, req: LeaderboardConfiguration): Promise<LeaderboardConfiguration> {
    req = serializeLeaderboardConfiguration(req);
    const url = new URL(`${this.#baseUrl}games/v1configuration/applications/${ applicationId }/leaderboards`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLeaderboardConfiguration(data);
  }

  /**
   * Returns a list of the leaderboard configurations in this application.
   *
   * @param applicationId The application ID from the Google Play developer console.
   */
  async leaderboardConfigurationsList(applicationId: string, opts: LeaderboardConfigurationsListOptions = {}): Promise<LeaderboardConfigurationListResponse> {
    const url = new URL(`${this.#baseUrl}games/v1configuration/applications/${ applicationId }/leaderboards`);
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
    return deserializeLeaderboardConfigurationListResponse(data);
  }

  /**
   * Update the metadata of the leaderboard configuration with the given ID.
   *
   * @param leaderboardId The ID of the leaderboard.
   */
  async leaderboardConfigurationsUpdate(leaderboardId: string, req: LeaderboardConfiguration): Promise<LeaderboardConfiguration> {
    req = serializeLeaderboardConfiguration(req);
    const url = new URL(`${this.#baseUrl}games/v1configuration/leaderboards/${ leaderboardId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeLeaderboardConfiguration(data);
  }
}

/**
 * An achievement configuration resource.
 */
export interface AchievementConfiguration {
  /**
   * The type of the achievement.
   */
  achievementType?:  | "ACHIEVEMENT_TYPE_UNSPECIFIED" | "STANDARD" | "INCREMENTAL";
  /**
   * The draft data of the achievement.
   */
  draft?: AchievementConfigurationDetail;
  /**
   * The ID of the achievement.
   */
  id?: string;
  /**
   * The initial state of the achievement.
   */
  initialState?:  | "INITIAL_STATE_UNSPECIFIED" | "HIDDEN" | "REVEALED";
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#achievementConfiguration`.
   */
  kind?: string;
  /**
   * The read-only published data of the achievement.
   */
  published?: AchievementConfigurationDetail;
  /**
   * Steps to unlock. Only applicable to incremental achievements.
   */
  stepsToUnlock?: number;
  /**
   * The token for this resource.
   */
  token?: string;
}

/**
 * An achievement configuration detail.
 */
export interface AchievementConfigurationDetail {
  /**
   * Localized strings for the achievement description.
   */
  description?: LocalizedStringBundle;
  /**
   * The icon url of this achievement. Writes to this field are ignored.
   */
  iconUrl?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#achievementConfigurationDetail`.
   */
  kind?: string;
  /**
   * Localized strings for the achievement name.
   */
  name?: LocalizedStringBundle;
  /**
   * Point value for the achievement.
   */
  pointValue?: number;
  /**
   * The sort rank of this achievement. Writes to this field are ignored.
   */
  sortRank?: number;
}

/**
 * A ListConfigurations response.
 */
export interface AchievementConfigurationListResponse {
  /**
   * The achievement configurations.
   */
  items?: AchievementConfiguration[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#achievementConfigurationListResponse`.
   */
  kind?: string;
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Additional options for GamesConfiguration#achievementConfigurationsList.
 */
export interface AchievementConfigurationsListOptions {
  /**
   * The maximum number of resource configurations to return in the response,
   * used for paging. For any response, the actual number of resources returned
   * may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * A number affix resource.
 */
export interface GamesNumberAffixConfiguration {
  /**
   * When the language requires special treatment of "small" numbers (as with
   * 2, 3, and 4 in Czech; or numbers ending 2, 3, or 4 but not 12, 13, or 14 in
   * Polish).
   */
  few?: LocalizedStringBundle;
  /**
   * When the language requires special treatment of "large" numbers (as with
   * numbers ending 11-99 in Maltese).
   */
  many?: LocalizedStringBundle;
  /**
   * When the language requires special treatment of numbers like one (as with
   * the number 1 in English and most other languages; in Russian, any number
   * ending in 1 but not ending in 11 is in this class).
   */
  one?: LocalizedStringBundle;
  /**
   * When the language does not require special treatment of the given quantity
   * (as with all numbers in Chinese, or 42 in English).
   */
  other?: LocalizedStringBundle;
  /**
   * When the language requires special treatment of numbers like two (as with
   * 2 in Welsh, or 102 in Slovenian).
   */
  two?: LocalizedStringBundle;
  /**
   * When the language requires special treatment of the number 0 (as in
   * Arabic).
   */
  zero?: LocalizedStringBundle;
}

/**
 * A number format resource.
 */
export interface GamesNumberFormatConfiguration {
  /**
   * The curreny code string. Only used for CURRENCY format type.
   */
  currencyCode?: string;
  /**
   * The formatting for the number.
   */
  numberFormatType?:  | "NUMBER_FORMAT_TYPE_UNSPECIFIED" | "NUMERIC" | "TIME_DURATION" | "CURRENCY";
  /**
   * The number of decimal places for number. Only used for NUMERIC format
   * type.
   */
  numDecimalPlaces?: number;
  /**
   * An optional suffix for the NUMERIC format type. These strings follow the
   * same plural rules as all Android string resources.
   */
  suffix?: GamesNumberAffixConfiguration;
}

/**
 * An leaderboard configuration resource.
 */
export interface LeaderboardConfiguration {
  /**
   * The draft data of the leaderboard.
   */
  draft?: LeaderboardConfigurationDetail;
  /**
   * The ID of the leaderboard.
   */
  id?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#leaderboardConfiguration`.
   */
  kind?: string;
  /**
   * The read-only published data of the leaderboard.
   */
  published?: LeaderboardConfigurationDetail;
  /**
   * Maximum score that can be posted to this leaderboard.
   */
  scoreMax?: bigint;
  /**
   * Minimum score that can be posted to this leaderboard.
   */
  scoreMin?: bigint;
  scoreOrder?:  | "SCORE_ORDER_UNSPECIFIED" | "LARGER_IS_BETTER" | "SMALLER_IS_BETTER";
  /**
   * The token for this resource.
   */
  token?: string;
}

function serializeLeaderboardConfiguration(data: any): LeaderboardConfiguration {
  return {
    ...data,
    scoreMax: data["scoreMax"] !== undefined ? String(data["scoreMax"]) : undefined,
    scoreMin: data["scoreMin"] !== undefined ? String(data["scoreMin"]) : undefined,
  };
}

function deserializeLeaderboardConfiguration(data: any): LeaderboardConfiguration {
  return {
    ...data,
    scoreMax: data["scoreMax"] !== undefined ? BigInt(data["scoreMax"]) : undefined,
    scoreMin: data["scoreMin"] !== undefined ? BigInt(data["scoreMin"]) : undefined,
  };
}

/**
 * A leaderboard configuration detail.
 */
export interface LeaderboardConfigurationDetail {
  /**
   * The icon url of this leaderboard. Writes to this field are ignored.
   */
  iconUrl?: string;
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#leaderboardConfigurationDetail`.
   */
  kind?: string;
  /**
   * Localized strings for the leaderboard name.
   */
  name?: LocalizedStringBundle;
  /**
   * The score formatting for the leaderboard.
   */
  scoreFormat?: GamesNumberFormatConfiguration;
  /**
   * The sort rank of this leaderboard. Writes to this field are ignored.
   */
  sortRank?: number;
}

/**
 * A ListConfigurations response.
 */
export interface LeaderboardConfigurationListResponse {
  /**
   * The leaderboard configurations.
   */
  items?: LeaderboardConfiguration[];
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#leaderboardConfigurationListResponse`.
   */
  kind?: string;
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
}

function serializeLeaderboardConfigurationListResponse(data: any): LeaderboardConfigurationListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeLeaderboardConfiguration(item))) : undefined,
  };
}

function deserializeLeaderboardConfigurationListResponse(data: any): LeaderboardConfigurationListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeLeaderboardConfiguration(item))) : undefined,
  };
}

/**
 * Additional options for GamesConfiguration#leaderboardConfigurationsList.
 */
export interface LeaderboardConfigurationsListOptions {
  /**
   * The maximum number of resource configurations to return in the response,
   * used for paging. For any response, the actual number of resources returned
   * may be less than the specified `maxResults`.
   */
  maxResults?: number;
  /**
   * The token returned by the previous request.
   */
  pageToken?: string;
}

/**
 * A localized string resource.
 */
export interface LocalizedString {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#localizedString`.
   */
  kind?: string;
  /**
   * The locale string.
   */
  locale?: string;
  /**
   * The string value.
   */
  value?: string;
}

/**
 * A localized string bundle resource.
 */
export interface LocalizedStringBundle {
  /**
   * Uniquely identifies the type of this resource. Value is always the fixed
   * string `gamesConfiguration#localizedStringBundle`.
   */
  kind?: string;
  /**
   * The locale strings.
   */
  translations?: LocalizedString[];
}