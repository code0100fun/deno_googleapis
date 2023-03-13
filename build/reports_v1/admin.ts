// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Admin SDK API Client for Deno
 * =============================
 * 
 * Admin SDK lets administrators of enterprise domains to view and manage resources like user, groups etc. It also provides audit and usage reports of domain.
 * 
 * Docs: https://developers.google.com/admin-sdk/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Admin SDK lets administrators of enterprise domains to view and manage
 * resources like user, groups etc. It also provides audit and usage reports of
 * domain.
 */
export class Admin {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://admin.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieves a list of activities for a specific customer's account and
   * application such as the Admin console application or the Google Drive
   * application. For more information, see the guides for administrator and
   * Google Drive activity reports. For more information about the activity
   * report's parameters, see the activity parameters reference guides.
   *
   * @param applicationName Application name for which the events are to be retrieved.
   * @param userKey Represents the profile ID or the user email for which the data should be filtered. Can be `all` for all information, or `userKey` for a user's unique Google Workspace profile ID or their primary email address. Must not be a deleted user. For a deleted user, call `users.list` in Directory API with `showDeleted=true`, then use the returned `ID` as the `userKey`.
   */
  async activitiesList(applicationName:  | "access_transparency" | "admin" | "calendar" | "chat" | "drive" | "gcp" | "gplus" | "groups" | "groups_enterprise" | "jamboard" | "login" | "meet" | "mobile" | "rules" | "saml" | "token" | "user_accounts" | "context_aware_access" | "chrome" | "data_studio" | "keep", userKey: string, opts: ActivitiesListOptions = {}): Promise<Activities> {
    const url = new URL(`${this.#baseUrl}admin/reports/v1/activity/users/${ userKey }/applications/${ applicationName }`);
    if (opts.actorIpAddress !== undefined) {
      url.searchParams.append("actorIpAddress", String(opts.actorIpAddress));
    }
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.eventName !== undefined) {
      url.searchParams.append("eventName", String(opts.eventName));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.groupIdFilter !== undefined) {
      url.searchParams.append("groupIdFilter", String(opts.groupIdFilter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orgUnitID !== undefined) {
      url.searchParams.append("orgUnitID", String(opts.orgUnitID));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeActivities(data);
  }

  /**
   * Start receiving notifications for account activities. For more
   * information, see Receiving Push Notifications.
   *
   * @param applicationName Application name for which the events are to be retrieved.
   * @param userKey Represents the profile ID or the user email for which the data should be filtered. Can be `all` for all information, or `userKey` for a user's unique Google Workspace profile ID or their primary email address. Must not be a deleted user. For a deleted user, call `users.list` in Directory API with `showDeleted=true`, then use the returned `ID` as the `userKey`.
   */
  async activitiesWatch(applicationName:  | "access_transparency" | "admin" | "calendar" | "chat" | "drive" | "gcp" | "gplus" | "groups" | "groups_enterprise" | "jamboard" | "login" | "meet" | "mobile" | "rules" | "saml" | "token" | "user_accounts" | "context_aware_access" | "chrome" | "data_studio" | "keep", userKey: string, req: Channel, opts: ActivitiesWatchOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}admin/reports/v1/activity/users/${ userKey }/applications/${ applicationName }/watch`);
    if (opts.actorIpAddress !== undefined) {
      url.searchParams.append("actorIpAddress", String(opts.actorIpAddress));
    }
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.eventName !== undefined) {
      url.searchParams.append("eventName", String(opts.eventName));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.groupIdFilter !== undefined) {
      url.searchParams.append("groupIdFilter", String(opts.groupIdFilter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orgUnitID !== undefined) {
      url.searchParams.append("orgUnitID", String(opts.orgUnitID));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
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
   * Stop watching resources through this channel.
   *
   */
  async channelsStop(req: Channel): Promise<void> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}admin/reports_v1/channels/stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Retrieves a report which is a collection of properties and statistics for
   * a specific customer's account. For more information, see the Customers
   * Usage Report guide. For more information about the customer report's
   * parameters, see the Customers Usage parameters reference guides.
   *
   * @param date Represents the date the usage occurred, based on PST time zone. The timestamp is in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), `yyyy-mm-dd`.
   */
  async customerUsageReportsGet(date: string, opts: CustomerUsageReportsGetOptions = {}): Promise<UsageReports> {
    const url = new URL(`${this.#baseUrl}admin/reports/v1/usage/dates/${ date }`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parameters !== undefined) {
      url.searchParams.append("parameters", String(opts.parameters));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UsageReports;
  }

  /**
   * Retrieves a report which is a collection of properties and statistics for
   * entities used by users within the account. For more information, see the
   * Entities Usage Report guide. For more information about the entities
   * report's parameters, see the Entities Usage parameters reference guides.
   *
   * @param date Represents the date the usage occurred. The timestamp is in the ISO 8601 format, yyyy-mm-dd. We recommend you use your account's time zone for this.
   * @param entityKey Represents the key of the object to filter the data with. It is a string which can take the value `all` to get activity events for all users, or any other value for an app-specific entity. For details on how to obtain the `entityKey` for a particular `entityType`, see the Entities Usage parameters reference guides.
   * @param entityType Represents the type of entity for the report.
   */
  async entityUsageReportsGet(date: string, entityKey: string, entityType:  | "gplus_communities", opts: EntityUsageReportsGetOptions = {}): Promise<UsageReports> {
    const url = new URL(`${this.#baseUrl}admin/reports/v1/usage/${ entityType }/${ entityKey }/dates/${ date }`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parameters !== undefined) {
      url.searchParams.append("parameters", String(opts.parameters));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UsageReports;
  }

  /**
   * Retrieves a report which is a collection of properties and statistics for
   * a set of users with the account. For more information, see the User Usage
   * Report guide. For more information about the user report's parameters, see
   * the Users Usage parameters reference guides.
   *
   * @param date Represents the date the usage occurred, based on GMT-7:00 (Pacific Standard Time). The timestamp is in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601), `yyyy-mm-dd`.
   * @param userKey Represents the profile ID or the user email for which the data should be filtered. Can be `all` for all information, or `userKey` for a user's unique Google Workspace profile ID or their primary email address. Must not be a deleted user. For a deleted user, call `users.list` in Directory API with `showDeleted=true`, then use the returned `ID` as the `userKey`.
   */
  async userUsageReportGet(date: string, userKey: string, opts: UserUsageReportGetOptions = {}): Promise<UsageReports> {
    const url = new URL(`${this.#baseUrl}admin/reports/v1/usage/users/${ userKey }/dates/${ date }`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.groupIdFilter !== undefined) {
      url.searchParams.append("groupIdFilter", String(opts.groupIdFilter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orgUnitID !== undefined) {
      url.searchParams.append("orgUnitID", String(opts.orgUnitID));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parameters !== undefined) {
      url.searchParams.append("parameters", String(opts.parameters));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UsageReports;
  }
}

/**
 * JSON template for a collection of activities.
 */
export interface Activities {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Each activity record in the response.
   */
  items?: Activity[];
  /**
   * The type of API resource. For an activity report, the value is
   * `reports#activities`.
   */
  kind?: string;
  /**
   * Token for retrieving the follow-on next page of the report. The
   * `nextPageToken` value is used in the request's `pageToken` query string.
   */
  nextPageToken?: string;
}

function serializeActivities(data: any): Activities {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeActivity(item))) : undefined,
  };
}

function deserializeActivities(data: any): Activities {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeActivity(item))) : undefined,
  };
}

/**
 * Additional options for Admin#activitiesList.
 */
export interface ActivitiesListOptions {
  /**
   * The Internet Protocol (IP) Address of host where the event was performed.
   * This is an additional way to filter a report's summary using the IP address
   * of the user whose activity is being reported. This IP address may or may
   * not reflect the user's physical location. For example, the IP address can
   * be the user's proxy server's address or a virtual private network (VPN)
   * address. This parameter supports both IPv4 and IPv6 address versions.
   */
  actorIpAddress?: string;
  /**
   * The unique ID of the customer to retrieve data for.
   */
  customerId?: string;
  /**
   * Sets the end of the range of time shown in the report. The date is in the
   * RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The default value is
   * the approximate time of the API request. An API report has three basic time
   * concepts: - *Date of the API's request for a report*: When the API created
   * and retrieved the report. - *Report's start time*: The beginning of the
   * timespan shown in the report. The `startTime` must be before the `endTime`
   * (if specified) and the current time when the request is made, or the API
   * returns an error. - *Report's end time*: The end of the timespan shown in
   * the report. For example, the timespan of events summarized in a report can
   * start in April and end in May. The report itself can be requested in
   * August. If the `endTime` is not specified, the report returns all
   * activities from the `startTime` until the current time or the most recent
   * 180 days if the `startTime` is more than 180 days in the past.
   */
  endTime?: string;
  /**
   * The name of the event being queried by the API. Each `eventName` is
   * related to a specific Google Workspace service or feature which the API
   * organizes into types of events. An example is the Google Calendar events in
   * the Admin console application's reports. The Calendar Settings `type`
   * structure has all of the Calendar `eventName` activities reported by the
   * API. When an administrator changes a Calendar setting, the API reports this
   * activity in the Calendar Settings `type` and `eventName` parameters. For
   * more information about `eventName` query strings and parameters, see the
   * list of event names for various applications above in `applicationName`.
   */
  eventName?: string;
  /**
   * The `filters` query string is a comma-separated list composed of event
   * parameters manipulated by relational operators. Event parameters are in the
   * form `{parameter1 name}{relational operator}{parameter1 value},{parameter2
   * name}{relational operator}{parameter2 value},...` These event parameters
   * are associated with a specific `eventName`. An empty report is returned if
   * the request's parameter doesn't belong to the `eventName`. For more
   * information about the available `eventName` fields for each application and
   * their associated parameters, go to the [ApplicationName](#applicationname)
   * table, then click through to the Activity Events page in the Appendix for
   * the application you want. In the following Drive activity examples, the
   * returned list consists of all `edit` events where the `doc_id` parameter
   * value matches the conditions defined by the relational operator. In the
   * first example, the request returns all edited documents with a `doc_id`
   * value equal to `12345`. In the second example, the report returns any
   * edited documents where the `doc_id` value is not equal to `98765`. The `<>`
   * operator is URL-encoded in the request's query string (`%3C%3E`): ```
   * GET...&eventName=edit&filters=doc_id==12345
   * GET...&eventName=edit&filters=doc_id%3C%3E98765 ``` A `filters` query
   * supports these relational operators: * `==`—'equal to'. * `<>`—'not equal
   * to'. Must be URL-encoded (%3C%3E). * `<`—'less than'. Must be URL-encoded
   * (%3C). * `<=`—'less than or equal to'. Must be URL-encoded (%3C=). *
   * `>`—'greater than'. Must be URL-encoded (%3E). * `>=`—'greater than or
   * equal to'. Must be URL-encoded (%3E=). **Note:** The API doesn't accept
   * multiple values of the same parameter. If a parameter is supplied more than
   * once in the API request, the API only accepts the last value of that
   * parameter. In addition, if an invalid parameter is supplied in the API
   * request, the API ignores that parameter and returns the response
   * corresponding to the remaining valid parameters. If no parameters are
   * requested, all parameters are returned.
   */
  filters?: string;
  /**
   * Comma separated group ids (obfuscated) on which user activities are
   * filtered, i.e. the response will contain activities for only those users
   * that are a part of at least one of the group ids mentioned here. Format:
   * "id:abc123,id:xyz456"
   */
  groupIdFilter?: string;
  /**
   * Determines how many activity records are shown on each response page. For
   * example, if the request sets `maxResults=1` and the report has two
   * activities, the report has two pages. The response's `nextPageToken`
   * property has the token to the second page. The `maxResults` query string is
   * optional in the request. The default value is 1000.
   */
  maxResults?: number;
  /**
   * ID of the organizational unit to report on. Activity records will be shown
   * only for users who belong to the specified organizational unit. Data before
   * Dec 17, 2018 doesn't appear in the filtered results.
   */
  orgUnitID?: string;
  /**
   * The token to specify next page. A report with multiple pages has a
   * `nextPageToken` property in the response. In your follow-on request getting
   * the next page of the report, enter the `nextPageToken` value in the
   * `pageToken` query string.
   */
  pageToken?: string;
  /**
   * Sets the beginning of the range of time shown in the report. The date is
   * in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The report
   * returns all activities from `startTime` until `endTime`. The `startTime`
   * must be before the `endTime` (if specified) and the current time when the
   * request is made, or the API returns an error.
   */
  startTime?: string;
}

/**
 * Additional options for Admin#activitiesWatch.
 */
export interface ActivitiesWatchOptions {
  /**
   * The Internet Protocol (IP) Address of host where the event was performed.
   * This is an additional way to filter a report's summary using the IP address
   * of the user whose activity is being reported. This IP address may or may
   * not reflect the user's physical location. For example, the IP address can
   * be the user's proxy server's address or a virtual private network (VPN)
   * address. This parameter supports both IPv4 and IPv6 address versions.
   */
  actorIpAddress?: string;
  /**
   * The unique ID of the customer to retrieve data for.
   */
  customerId?: string;
  /**
   * Sets the end of the range of time shown in the report. The date is in the
   * RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The default value is
   * the approximate time of the API request. An API report has three basic time
   * concepts: - *Date of the API's request for a report*: When the API created
   * and retrieved the report. - *Report's start time*: The beginning of the
   * timespan shown in the report. The `startTime` must be before the `endTime`
   * (if specified) and the current time when the request is made, or the API
   * returns an error. - *Report's end time*: The end of the timespan shown in
   * the report. For example, the timespan of events summarized in a report can
   * start in April and end in May. The report itself can be requested in
   * August. If the `endTime` is not specified, the report returns all
   * activities from the `startTime` until the current time or the most recent
   * 180 days if the `startTime` is more than 180 days in the past.
   */
  endTime?: string;
  /**
   * The name of the event being queried by the API. Each `eventName` is
   * related to a specific Google Workspace service or feature which the API
   * organizes into types of events. An example is the Google Calendar events in
   * the Admin console application's reports. The Calendar Settings `type`
   * structure has all of the Calendar `eventName` activities reported by the
   * API. When an administrator changes a Calendar setting, the API reports this
   * activity in the Calendar Settings `type` and `eventName` parameters. For
   * more information about `eventName` query strings and parameters, see the
   * list of event names for various applications above in `applicationName`.
   */
  eventName?: string;
  /**
   * The `filters` query string is a comma-separated list composed of event
   * parameters manipulated by relational operators. Event parameters are in the
   * form `{parameter1 name}{relational operator}{parameter1 value},{parameter2
   * name}{relational operator}{parameter2 value},...` These event parameters
   * are associated with a specific `eventName`. An empty report is returned if
   * the request's parameter doesn't belong to the `eventName`. For more
   * information about the available `eventName` fields for each application and
   * their associated parameters, go to the [ApplicationName](#applicationname)
   * table, then click through to the Activity Events page in the Appendix for
   * the application you want. In the following Drive activity examples, the
   * returned list consists of all `edit` events where the `doc_id` parameter
   * value matches the conditions defined by the relational operator. In the
   * first example, the request returns all edited documents with a `doc_id`
   * value equal to `12345`. In the second example, the report returns any
   * edited documents where the `doc_id` value is not equal to `98765`. The `<>`
   * operator is URL-encoded in the request's query string (`%3C%3E`): ```
   * GET...&eventName=edit&filters=doc_id==12345
   * GET...&eventName=edit&filters=doc_id%3C%3E98765 ``` A `filters` query
   * supports these relational operators: * `==`—'equal to'. * `<>`—'not equal
   * to'. Must be URL-encoded (%3C%3E). * `<`—'less than'. Must be URL-encoded
   * (%3C). * `<=`—'less than or equal to'. Must be URL-encoded (%3C=). *
   * `>`—'greater than'. Must be URL-encoded (%3E). * `>=`—'greater than or
   * equal to'. Must be URL-encoded (%3E=). **Note:** The API doesn't accept
   * multiple values of the same parameter. If a parameter is supplied more than
   * once in the API request, the API only accepts the last value of that
   * parameter. In addition, if an invalid parameter is supplied in the API
   * request, the API ignores that parameter and returns the response
   * corresponding to the remaining valid parameters. If no parameters are
   * requested, all parameters are returned.
   */
  filters?: string;
  /**
   * Comma separated group ids (obfuscated) on which user activities are
   * filtered, i.e. the response will contain activities for only those users
   * that are a part of at least one of the group ids mentioned here. Format:
   * "id:abc123,id:xyz456"
   */
  groupIdFilter?: string;
  /**
   * Determines how many activity records are shown on each response page. For
   * example, if the request sets `maxResults=1` and the report has two
   * activities, the report has two pages. The response's `nextPageToken`
   * property has the token to the second page. The `maxResults` query string is
   * optional in the request. The default value is 1000.
   */
  maxResults?: number;
  /**
   * ID of the organizational unit to report on. Activity records will be shown
   * only for users who belong to the specified organizational unit. Data before
   * Dec 17, 2018 doesn't appear in the filtered results.
   */
  orgUnitID?: string;
  /**
   * The token to specify next page. A report with multiple pages has a
   * `nextPageToken` property in the response. In your follow-on request getting
   * the next page of the report, enter the `nextPageToken` value in the
   * `pageToken` query string.
   */
  pageToken?: string;
  /**
   * Sets the beginning of the range of time shown in the report. The date is
   * in the RFC 3339 format, for example 2010-10-28T10:26:35.000Z. The report
   * returns all activities from `startTime` until `endTime`. The `startTime`
   * must be before the `endTime` (if specified) and the current time when the
   * request is made, or the API returns an error.
   */
  startTime?: string;
}

/**
 * JSON template for the activity resource.
 */
export interface Activity {
  /**
   * User doing the action.
   */
  actor?: {
    callerType?: string;
    email?: string;
    key?: string;
    profileId?: string;
  };
  /**
   * ETag of the entry.
   */
  etag?: string;
  /**
   * Activity events in the report.
   */
  events?: {
    name?: string;
    parameters?: {
      boolValue?: boolean;
      intValue?: bigint;
      messageValue?: {
        parameter?: NestedParameter[];
      };
      multiIntValue?: bigint[];
      multiMessageValue?: {
        parameter?: NestedParameter[];
      }[];
      multiValue?: string[];
      name?: string;
      value?: string;
    }[];
    type?: string;
  }[];
  /**
   * Unique identifier for each activity record.
   */
  id?: {
    applicationName?: string;
    customerId?: string;
    time?: Date;
    uniqueQualifier?: bigint;
  };
  /**
   * IP address of the user doing the action. This is the Internet Protocol
   * (IP) address of the user when logging into Google Workspace, which may or
   * may not reflect the user's physical location. For example, the IP address
   * can be the user's proxy server's address or a virtual private network (VPN)
   * address. The API supports IPv4 and IPv6.
   */
  ipAddress?: string;
  /**
   * The type of API resource. For an activity report, the value is
   * `audit#activity`.
   */
  kind?: string;
  /**
   * This is the domain that is affected by the report's event. For example
   * domain of Admin console or the Drive application's document owner.
   */
  ownerDomain?: string;
}

function serializeActivity(data: any): Activity {
  return {
    ...data,
    events: data["events"] !== undefined ? data["events"].map((item: any) => ({
      ...item,
      parameters: item["parameters"] !== undefined ? item["parameters"].map((item: any) => ({
        ...item,
        intValue: item["intValue"] !== undefined ? String(item["intValue"]) : undefined,
        messageValue: item["messageValue"] !== undefined ? {
          ...item["messageValue"],
          parameter: item["messageValue"]["parameter"] !== undefined ? item["messageValue"]["parameter"].map((item: any) => (serializeNestedParameter(item))) : undefined,
        } : undefined,
        multiIntValue: item["multiIntValue"] !== undefined ? item["multiIntValue"].map((item: any) => (String(item))) : undefined,
        multiMessageValue: item["multiMessageValue"] !== undefined ? item["multiMessageValue"].map((item: any) => ({
          ...item,
          parameter: item["parameter"] !== undefined ? item["parameter"].map((item: any) => (serializeNestedParameter(item))) : undefined,
        })) : undefined,
      })) : undefined,
    })) : undefined,
    id: data["id"] !== undefined ? {
      ...data["id"],
      time: data["id"]["time"] !== undefined ? data["id"]["time"].toISOString() : undefined,
      uniqueQualifier: data["id"]["uniqueQualifier"] !== undefined ? String(data["id"]["uniqueQualifier"]) : undefined,
    } : undefined,
  };
}

function deserializeActivity(data: any): Activity {
  return {
    ...data,
    events: data["events"] !== undefined ? data["events"].map((item: any) => ({
      ...item,
      parameters: item["parameters"] !== undefined ? item["parameters"].map((item: any) => ({
        ...item,
        intValue: item["intValue"] !== undefined ? BigInt(item["intValue"]) : undefined,
        messageValue: item["messageValue"] !== undefined ? {
          ...item["messageValue"],
          parameter: item["messageValue"]["parameter"] !== undefined ? item["messageValue"]["parameter"].map((item: any) => (deserializeNestedParameter(item))) : undefined,
        } : undefined,
        multiIntValue: item["multiIntValue"] !== undefined ? item["multiIntValue"].map((item: any) => (BigInt(item))) : undefined,
        multiMessageValue: item["multiMessageValue"] !== undefined ? item["multiMessageValue"].map((item: any) => ({
          ...item,
          parameter: item["parameter"] !== undefined ? item["parameter"].map((item: any) => (deserializeNestedParameter(item))) : undefined,
        })) : undefined,
      })) : undefined,
    })) : undefined,
    id: data["id"] !== undefined ? {
      ...data["id"],
      time: data["id"]["time"] !== undefined ? new Date(data["id"]["time"]) : undefined,
      uniqueQualifier: data["id"]["uniqueQualifier"] !== undefined ? BigInt(data["id"]["uniqueQualifier"]) : undefined,
    } : undefined,
  };
}

/**
 * A notification channel used to watch for resource changes.
 */
export interface Channel {
  /**
   * The address where notifications are delivered for this channel.
   */
  address?: string;
  /**
   * Date and time of notification channel expiration, expressed as a Unix
   * timestamp, in milliseconds. Optional.
   */
  expiration?: bigint;
  /**
   * A UUID or similar unique string that identifies this channel.
   */
  id?: string;
  /**
   * Identifies this as a notification channel used to watch for changes to a
   * resource, which is "`api#channel`".
   */
  kind?: string;
  /**
   * Additional parameters controlling delivery channel behavior. Optional.
   */
  params?: {
    [key: string]: string
  };
  /**
   * A Boolean value to indicate whether payload is wanted. Optional.
   */
  payload?: boolean;
  /**
   * An opaque ID that identifies the resource being watched on this channel.
   * Stable across different API versions.
   */
  resourceId?: string;
  /**
   * A version-specific identifier for the watched resource.
   */
  resourceUri?: string;
  /**
   * An arbitrary string delivered to the target address with each notification
   * delivered over this channel. Optional.
   */
  token?: string;
  /**
   * The type of delivery mechanism used for this channel. The value should be
   * set to `"web_hook"`.
   */
  type?: string;
}

function serializeChannel(data: any): Channel {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? String(data["expiration"]) : undefined,
  };
}

function deserializeChannel(data: any): Channel {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? BigInt(data["expiration"]) : undefined,
  };
}

/**
 * Additional options for Admin#customerUsageReportsGet.
 */
export interface CustomerUsageReportsGetOptions {
  /**
   * The unique ID of the customer to retrieve data for.
   */
  customerId?: string;
  /**
   * Token to specify next page. A report with multiple pages has a
   * `nextPageToken` property in the response. For your follow-on requests
   * getting all of the report's pages, enter the `nextPageToken` value in the
   * `pageToken` query string.
   */
  pageToken?: string;
  /**
   * The `parameters` query string is a comma-separated list of event
   * parameters that refine a report's results. The parameter is associated with
   * a specific application. The application values for the Customers usage
   * report include `accounts`, `app_maker`, `apps_scripts`, `calendar`,
   * `classroom`, `cros`, `docs`, `gmail`, `gplus`, `device_management`, `meet`,
   * and `sites`. A `parameters` query string is in the CSV form of
   * `app_name1:param_name1, app_name2:param_name2`. *Note:* The API doesn't
   * accept multiple values of a parameter. If a particular parameter is
   * supplied more than once in the API request, the API only accepts the last
   * value of that request parameter. In addition, if an invalid request
   * parameter is supplied in the API request, the API ignores that request
   * parameter and returns the response corresponding to the remaining valid
   * request parameters. An example of an invalid request parameter is one that
   * does not belong to the application. If no parameters are requested, all
   * parameters are returned.
   */
  parameters?: string;
}

/**
 * Additional options for Admin#entityUsageReportsGet.
 */
export interface EntityUsageReportsGetOptions {
  /**
   * The unique ID of the customer to retrieve data for.
   */
  customerId?: string;
  /**
   * The `filters` query string is a comma-separated list of an application's
   * event parameters where the parameter's value is manipulated by a relational
   * operator. The `filters` query string includes the name of the application
   * whose usage is returned in the report. The application values for the
   * Entities usage report include `accounts`, `docs`, and `gmail`. Filters are
   * in the form `[application name]:parameter name[parameter value],...`. In
   * this example, the `<>` 'not equal to' operator is URL-encoded in the
   * request's query string (%3C%3E): GET
   * https://www.googleapis.com/admin/reports/v1/usage/gplus_communities/all/dates/2017-12-01
   * ?parameters=gplus:community_name,gplus:num_total_members
   * &filters=gplus:num_total_members%3C%3E0 The relational operators include: -
   * `==` - 'equal to'. - `<>` - 'not equal to'. It is URL-encoded (%3C%3E). -
   * `<` - 'less than'. It is URL-encoded (%3C). - `<=` - 'less than or equal
   * to'. It is URL-encoded (%3C=). - `>` - 'greater than'. It is URL-encoded
   * (%3E). - `>=` - 'greater than or equal to'. It is URL-encoded (%3E=).
   * Filters can only be applied to numeric parameters.
   */
  filters?: string;
  /**
   * Determines how many activity records are shown on each response page. For
   * example, if the request sets `maxResults=1` and the report has two
   * activities, the report has two pages. The response's `nextPageToken`
   * property has the token to the second page.
   */
  maxResults?: number;
  /**
   * Token to specify next page. A report with multiple pages has a
   * `nextPageToken` property in the response. In your follow-on request getting
   * the next page of the report, enter the `nextPageToken` value in the
   * `pageToken` query string.
   */
  pageToken?: string;
  /**
   * The `parameters` query string is a comma-separated list of event
   * parameters that refine a report's results. The parameter is associated with
   * a specific application. The application values for the Entities usage
   * report are only `gplus`. A `parameter` query string is in the CSV form of
   * `[app_name1:param_name1], [app_name2:param_name2]...`. *Note:* The API
   * doesn't accept multiple values of a parameter. If a particular parameter is
   * supplied more than once in the API request, the API only accepts the last
   * value of that request parameter. In addition, if an invalid request
   * parameter is supplied in the API request, the API ignores that request
   * parameter and returns the response corresponding to the remaining valid
   * request parameters. An example of an invalid request parameter is one that
   * does not belong to the application. If no parameters are requested, all
   * parameters are returned.
   */
  parameters?: string;
}

/**
 * JSON template for a parameter used in various reports.
 */
export interface NestedParameter {
  /**
   * Boolean value of the parameter.
   */
  boolValue?: boolean;
  /**
   * Integer value of the parameter.
   */
  intValue?: bigint;
  /**
   * Multiple boolean values of the parameter.
   */
  multiBoolValue?: boolean[];
  /**
   * Multiple integer values of the parameter.
   */
  multiIntValue?: bigint[];
  /**
   * Multiple string values of the parameter.
   */
  multiValue?: string[];
  /**
   * The name of the parameter.
   */
  name?: string;
  /**
   * String value of the parameter.
   */
  value?: string;
}

function serializeNestedParameter(data: any): NestedParameter {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
    multiIntValue: data["multiIntValue"] !== undefined ? data["multiIntValue"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeNestedParameter(data: any): NestedParameter {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
    multiIntValue: data["multiIntValue"] !== undefined ? data["multiIntValue"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * JSON template for a usage report.
 */
export interface UsageReport {
  /**
   * Output only. The date of the report request.
   */
  readonly date?: string;
  /**
   * Output only. Information about the type of the item.
   */
  readonly entity?: {
    customerId?: string;
    entityId?: string;
    profileId?: string;
    type?: string;
    userEmail?: string;
  };
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * The type of API resource. For a usage report, the value is
   * `admin#reports#usageReport`.
   */
  kind?: string;
  /**
   * Output only. Parameter value pairs for various applications. For the
   * Entity Usage Report parameters and values, see [the Entity Usage parameters
   * reference](/admin-sdk/reports/v1/reference/usage-ref-appendix-a/entities).
   */
  readonly parameters?: {
    boolValue?: boolean;
    datetimeValue?: Date;
    intValue?: bigint;
    msgValue?: {
      [key: string]: any
    }[];
    name?: string;
    stringValue?: string;
  }[];
}

export interface UsageReports {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * The type of API resource. For a usage report, the value is
   * `admin#reports#usageReports`.
   */
  kind?: string;
  /**
   * Token to specify next page. A report with multiple pages has a
   * `nextPageToken` property in the response. For your follow-on requests
   * getting all of the report's pages, enter the `nextPageToken` value in the
   * `pageToken` query string.
   */
  nextPageToken?: string;
  /**
   * Various application parameter records.
   */
  usageReports?: UsageReport[];
  /**
   * Warnings, if any.
   */
  warnings?: {
    code?: string;
    data?: {
      key?: string;
      value?: string;
    }[];
    message?: string;
  }[];
}

/**
 * Additional options for Admin#userUsageReportGet.
 */
export interface UserUsageReportGetOptions {
  /**
   * The unique ID of the customer to retrieve data for.
   */
  customerId?: string;
  /**
   * The `filters` query string is a comma-separated list of an application's
   * event parameters where the parameter's value is manipulated by a relational
   * operator. The `filters` query string includes the name of the application
   * whose usage is returned in the report. The application values for the Users
   * Usage Report include `accounts`, `docs`, and `gmail`. Filters are in the
   * form `[application name]:parameter name[parameter value],...`. In this
   * example, the `<>` 'not equal to' operator is URL-encoded in the request's
   * query string (%3C%3E): GET
   * https://www.googleapis.com/admin/reports/v1/usage/users/all/dates/2013-03-03
   * ?parameters=accounts:last_login_time
   * &filters=accounts:last_login_time%3C%3E2010-10-28T10:26:35.000Z The
   * relational operators include: - `==` - 'equal to'. - `<>` - 'not equal to'.
   * It is URL-encoded (%3C%3E). - `<` - 'less than'. It is URL-encoded (%3C). -
   * `<=` - 'less than or equal to'. It is URL-encoded (%3C=). - `>` - 'greater
   * than'. It is URL-encoded (%3E). - `>=` - 'greater than or equal to'. It is
   * URL-encoded (%3E=).
   */
  filters?: string;
  /**
   * Comma separated group ids (obfuscated) on which user activities are
   * filtered, i.e. the response will contain activities for only those users
   * that are a part of at least one of the group ids mentioned here. Format:
   * "id:abc123,id:xyz456"
   */
  groupIdFilter?: string;
  /**
   * Determines how many activity records are shown on each response page. For
   * example, if the request sets `maxResults=1` and the report has two
   * activities, the report has two pages. The response's `nextPageToken`
   * property has the token to the second page. The `maxResults` query string is
   * optional.
   */
  maxResults?: number;
  /**
   * ID of the organizational unit to report on. User activity will be shown
   * only for users who belong to the specified organizational unit. Data before
   * Dec 17, 2018 doesn't appear in the filtered results.
   */
  orgUnitID?: string;
  /**
   * Token to specify next page. A report with multiple pages has a
   * `nextPageToken` property in the response. In your follow-on request getting
   * the next page of the report, enter the `nextPageToken` value in the
   * `pageToken` query string.
   */
  pageToken?: string;
  /**
   * The `parameters` query string is a comma-separated list of event
   * parameters that refine a report's results. The parameter is associated with
   * a specific application. The application values for the Customers Usage
   * report include `accounts`, `app_maker`, `apps_scripts`, `calendar`,
   * `classroom`, `cros`, `docs`, `gmail`, `gplus`, `device_management`, `meet`,
   * and `sites`. A `parameters` query string is in the CSV form of
   * `app_name1:param_name1, app_name2:param_name2`. *Note:* The API doesn't
   * accept multiple values of a parameter. If a particular parameter is
   * supplied more than once in the API request, the API only accepts the last
   * value of that request parameter. In addition, if an invalid request
   * parameter is supplied in the API request, the API ignores that request
   * parameter and returns the response corresponding to the remaining valid
   * request parameters. An example of an invalid request parameter is one that
   * does not belong to the application. If no parameters are requested, all
   * parameters are returned.
   */
  parameters?: string;
}