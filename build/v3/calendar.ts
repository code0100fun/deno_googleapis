// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Calendar API Client for Deno
 * ============================
 * 
 * Manipulates events and other calendar data.
 * 
 * Docs: https://developers.google.com/google-apps/calendar/firstapp
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manipulates events and other calendar data.
 */
export class Calendar {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://www.googleapis.com/calendar/v3/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes an access control rule.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param ruleId ACL rule identifier.
   */
  async aclDelete(calendarId: string, ruleId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/acl/${ ruleId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns an access control rule.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param ruleId ACL rule identifier.
   */
  async aclGet(calendarId: string, ruleId: string): Promise<AclRule> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/acl/${ ruleId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AclRule;
  }

  /**
   * Creates an access control rule.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async aclInsert(calendarId: string, req: AclRule, opts: AclInsertOptions = {}): Promise<AclRule> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/acl`);
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AclRule;
  }

  /**
   * Returns the rules in the access control list for the calendar.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async aclList(calendarId: string, opts: AclListOptions = {}): Promise<Acl> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/acl`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Acl;
  }

  /**
   * Updates an access control rule. This method supports patch semantics.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param ruleId ACL rule identifier.
   */
  async aclPatch(calendarId: string, ruleId: string, req: AclRule, opts: AclPatchOptions = {}): Promise<AclRule> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/acl/${ ruleId }`);
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as AclRule;
  }

  /**
   * Updates an access control rule.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param ruleId ACL rule identifier.
   */
  async aclUpdate(calendarId: string, ruleId: string, req: AclRule, opts: AclUpdateOptions = {}): Promise<AclRule> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/acl/${ ruleId }`);
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as AclRule;
  }

  /**
   * Watch for changes to ACL resources.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async aclWatch(calendarId: string, req: Channel, opts: AclWatchOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/acl/watch`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
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
   * Removes a calendar from the user's calendar list.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarListDelete(calendarId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}users/me/calendarList/${ calendarId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns a calendar from the user's calendar list.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarListGet(calendarId: string): Promise<CalendarListEntry> {
    const url = new URL(`${this.#baseUrl}users/me/calendarList/${ calendarId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CalendarListEntry;
  }

  /**
   * Inserts an existing calendar into the user's calendar list.
   *
   */
  async calendarListInsert(req: CalendarListEntry, opts: CalendarListInsertOptions = {}): Promise<CalendarListEntry> {
    const url = new URL(`${this.#baseUrl}users/me/calendarList`);
    if (opts.colorRgbFormat !== undefined) {
      url.searchParams.append("colorRgbFormat", String(opts.colorRgbFormat));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CalendarListEntry;
  }

  /**
   * Returns the calendars on the user's calendar list.
   *
   */
  async calendarListList(opts: CalendarListListOptions = {}): Promise<CalendarList> {
    const url = new URL(`${this.#baseUrl}users/me/calendarList`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.minAccessRole !== undefined) {
      url.searchParams.append("minAccessRole", String(opts.minAccessRole));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.showHidden !== undefined) {
      url.searchParams.append("showHidden", String(opts.showHidden));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CalendarList;
  }

  /**
   * Updates an existing calendar on the user's calendar list. This method
   * supports patch semantics.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarListPatch(calendarId: string, req: CalendarListEntry, opts: CalendarListPatchOptions = {}): Promise<CalendarListEntry> {
    const url = new URL(`${this.#baseUrl}users/me/calendarList/${ calendarId }`);
    if (opts.colorRgbFormat !== undefined) {
      url.searchParams.append("colorRgbFormat", String(opts.colorRgbFormat));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as CalendarListEntry;
  }

  /**
   * Updates an existing calendar on the user's calendar list.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarListUpdate(calendarId: string, req: CalendarListEntry, opts: CalendarListUpdateOptions = {}): Promise<CalendarListEntry> {
    const url = new URL(`${this.#baseUrl}users/me/calendarList/${ calendarId }`);
    if (opts.colorRgbFormat !== undefined) {
      url.searchParams.append("colorRgbFormat", String(opts.colorRgbFormat));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as CalendarListEntry;
  }

  /**
   * Watch for changes to CalendarList resources.
   *
   */
  async calendarListWatch(req: Channel, opts: CalendarListWatchOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}users/me/calendarList/watch`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.minAccessRole !== undefined) {
      url.searchParams.append("minAccessRole", String(opts.minAccessRole));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.showHidden !== undefined) {
      url.searchParams.append("showHidden", String(opts.showHidden));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
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
   * Clears a primary calendar. This operation deletes all events associated
   * with the primary calendar of an account.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarsClear(calendarId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/clear`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Deletes a secondary calendar. Use calendars.clear for clearing all events
   * on primary calendars.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarsDelete(calendarId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns metadata for a calendar.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarsGet(calendarId: string): Promise<Calendar> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Calendar;
  }

  /**
   * Creates a secondary calendar.
   *
   */
  async calendarsInsert(req: Calendar): Promise<Calendar> {
    const url = new URL(`${this.#baseUrl}calendars`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Calendar;
  }

  /**
   * Updates metadata for a calendar. This method supports patch semantics.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarsPatch(calendarId: string, req: Calendar): Promise<Calendar> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Calendar;
  }

  /**
   * Updates metadata for a calendar.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async calendarsUpdate(calendarId: string, req: Calendar): Promise<Calendar> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Calendar;
  }

  /**
   * Stop watching resources through this channel
   *
   */
  async channelsStop(req: Channel): Promise<void> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}channels/stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Returns the color definitions for calendars and events.
   *
   */
  async colorsGet(): Promise<Colors> {
    const url = new URL(`${this.#baseUrl}colors`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeColors(data);
  }

  /**
   * Deletes an event.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param eventId Event identifier.
   */
  async eventsDelete(calendarId: string, eventId: string, opts: EventsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/${ eventId }`);
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    if (opts.sendUpdates !== undefined) {
      url.searchParams.append("sendUpdates", String(opts.sendUpdates));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns an event based on its Google Calendar ID. To retrieve an event
   * using its iCalendar ID, call the events.list method using the iCalUID
   * parameter.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param eventId Event identifier.
   */
  async eventsGet(calendarId: string, eventId: string, opts: EventsGetOptions = {}): Promise<Event> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/${ eventId }`);
    if (opts.alwaysIncludeEmail !== undefined) {
      url.searchParams.append("alwaysIncludeEmail", String(opts.alwaysIncludeEmail));
    }
    if (opts.maxAttendees !== undefined) {
      url.searchParams.append("maxAttendees", String(opts.maxAttendees));
    }
    if (opts.timeZone !== undefined) {
      url.searchParams.append("timeZone", String(opts.timeZone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEvent(data);
  }

  /**
   * Imports an event. This operation is used to add a private copy of an
   * existing event to a calendar.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async eventsImport(calendarId: string, req: Event, opts: EventsImportOptions = {}): Promise<Event> {
    req = serializeEvent(req);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/import`);
    if (opts.conferenceDataVersion !== undefined) {
      url.searchParams.append("conferenceDataVersion", String(opts.conferenceDataVersion));
    }
    if (opts.supportsAttachments !== undefined) {
      url.searchParams.append("supportsAttachments", String(opts.supportsAttachments));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEvent(data);
  }

  /**
   * Creates an event.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async eventsInsert(calendarId: string, req: Event, opts: EventsInsertOptions = {}): Promise<Event> {
    req = serializeEvent(req);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events`);
    if (opts.conferenceDataVersion !== undefined) {
      url.searchParams.append("conferenceDataVersion", String(opts.conferenceDataVersion));
    }
    if (opts.maxAttendees !== undefined) {
      url.searchParams.append("maxAttendees", String(opts.maxAttendees));
    }
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    if (opts.sendUpdates !== undefined) {
      url.searchParams.append("sendUpdates", String(opts.sendUpdates));
    }
    if (opts.supportsAttachments !== undefined) {
      url.searchParams.append("supportsAttachments", String(opts.supportsAttachments));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEvent(data);
  }

  /**
   * Returns instances of the specified recurring event.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param eventId Recurring event identifier.
   */
  async eventsInstances(calendarId: string, eventId: string, opts: EventsInstancesOptions = {}): Promise<Events> {
    opts = serializeEventsInstancesOptions(opts);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/${ eventId }/instances`);
    if (opts.alwaysIncludeEmail !== undefined) {
      url.searchParams.append("alwaysIncludeEmail", String(opts.alwaysIncludeEmail));
    }
    if (opts.maxAttendees !== undefined) {
      url.searchParams.append("maxAttendees", String(opts.maxAttendees));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.originalStart !== undefined) {
      url.searchParams.append("originalStart", String(opts.originalStart));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.timeMax !== undefined) {
      url.searchParams.append("timeMax", String(opts.timeMax));
    }
    if (opts.timeMin !== undefined) {
      url.searchParams.append("timeMin", String(opts.timeMin));
    }
    if (opts.timeZone !== undefined) {
      url.searchParams.append("timeZone", String(opts.timeZone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEvents(data);
  }

  /**
   * Returns events on the specified calendar.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async eventsList(calendarId: string, opts: EventsListOptions = {}): Promise<Events> {
    opts = serializeEventsListOptions(opts);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events`);
    if (opts.alwaysIncludeEmail !== undefined) {
      url.searchParams.append("alwaysIncludeEmail", String(opts.alwaysIncludeEmail));
    }
    if (opts.iCalUID !== undefined) {
      url.searchParams.append("iCalUID", String(opts.iCalUID));
    }
    if (opts.maxAttendees !== undefined) {
      url.searchParams.append("maxAttendees", String(opts.maxAttendees));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.privateExtendedProperty !== undefined) {
      url.searchParams.append("privateExtendedProperty", String(opts.privateExtendedProperty));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.sharedExtendedProperty !== undefined) {
      url.searchParams.append("sharedExtendedProperty", String(opts.sharedExtendedProperty));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.showHiddenInvitations !== undefined) {
      url.searchParams.append("showHiddenInvitations", String(opts.showHiddenInvitations));
    }
    if (opts.singleEvents !== undefined) {
      url.searchParams.append("singleEvents", String(opts.singleEvents));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    if (opts.timeMax !== undefined) {
      url.searchParams.append("timeMax", String(opts.timeMax));
    }
    if (opts.timeMin !== undefined) {
      url.searchParams.append("timeMin", String(opts.timeMin));
    }
    if (opts.timeZone !== undefined) {
      url.searchParams.append("timeZone", String(opts.timeZone));
    }
    if (opts.updatedMin !== undefined) {
      url.searchParams.append("updatedMin", String(opts.updatedMin));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEvents(data);
  }

  /**
   * Moves an event to another calendar, i.e. changes an event's organizer.
   *
   * @param calendarId Calendar identifier of the source calendar where the event currently is on.
   * @param eventId Event identifier.
   */
  async eventsMove(calendarId: string, eventId: string, opts: EventsMoveOptions = {}): Promise<Event> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/${ eventId }/move`);
    if (opts.destination !== undefined) {
      url.searchParams.append("destination", String(opts.destination));
    }
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    if (opts.sendUpdates !== undefined) {
      url.searchParams.append("sendUpdates", String(opts.sendUpdates));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeEvent(data);
  }

  /**
   * Updates an event. This method supports patch semantics.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param eventId Event identifier.
   */
  async eventsPatch(calendarId: string, eventId: string, req: Event, opts: EventsPatchOptions = {}): Promise<Event> {
    req = serializeEvent(req);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/${ eventId }`);
    if (opts.alwaysIncludeEmail !== undefined) {
      url.searchParams.append("alwaysIncludeEmail", String(opts.alwaysIncludeEmail));
    }
    if (opts.conferenceDataVersion !== undefined) {
      url.searchParams.append("conferenceDataVersion", String(opts.conferenceDataVersion));
    }
    if (opts.maxAttendees !== undefined) {
      url.searchParams.append("maxAttendees", String(opts.maxAttendees));
    }
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    if (opts.sendUpdates !== undefined) {
      url.searchParams.append("sendUpdates", String(opts.sendUpdates));
    }
    if (opts.supportsAttachments !== undefined) {
      url.searchParams.append("supportsAttachments", String(opts.supportsAttachments));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeEvent(data);
  }

  /**
   * Creates an event based on a simple text string.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async eventsQuickAdd(calendarId: string, opts: EventsQuickAddOptions = {}): Promise<Event> {
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/quickAdd`);
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    if (opts.sendUpdates !== undefined) {
      url.searchParams.append("sendUpdates", String(opts.sendUpdates));
    }
    if (opts.text !== undefined) {
      url.searchParams.append("text", String(opts.text));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeEvent(data);
  }

  /**
   * Updates an event.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   * @param eventId Event identifier.
   */
  async eventsUpdate(calendarId: string, eventId: string, req: Event, opts: EventsUpdateOptions = {}): Promise<Event> {
    req = serializeEvent(req);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/${ eventId }`);
    if (opts.alwaysIncludeEmail !== undefined) {
      url.searchParams.append("alwaysIncludeEmail", String(opts.alwaysIncludeEmail));
    }
    if (opts.conferenceDataVersion !== undefined) {
      url.searchParams.append("conferenceDataVersion", String(opts.conferenceDataVersion));
    }
    if (opts.maxAttendees !== undefined) {
      url.searchParams.append("maxAttendees", String(opts.maxAttendees));
    }
    if (opts.sendNotifications !== undefined) {
      url.searchParams.append("sendNotifications", String(opts.sendNotifications));
    }
    if (opts.sendUpdates !== undefined) {
      url.searchParams.append("sendUpdates", String(opts.sendUpdates));
    }
    if (opts.supportsAttachments !== undefined) {
      url.searchParams.append("supportsAttachments", String(opts.supportsAttachments));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeEvent(data);
  }

  /**
   * Watch for changes to Events resources.
   *
   * @param calendarId Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  async eventsWatch(calendarId: string, req: Channel, opts: EventsWatchOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    opts = serializeEventsWatchOptions(opts);
    const url = new URL(`${this.#baseUrl}calendars/${ calendarId }/events/watch`);
    if (opts.alwaysIncludeEmail !== undefined) {
      url.searchParams.append("alwaysIncludeEmail", String(opts.alwaysIncludeEmail));
    }
    if (opts.iCalUID !== undefined) {
      url.searchParams.append("iCalUID", String(opts.iCalUID));
    }
    if (opts.maxAttendees !== undefined) {
      url.searchParams.append("maxAttendees", String(opts.maxAttendees));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.privateExtendedProperty !== undefined) {
      url.searchParams.append("privateExtendedProperty", String(opts.privateExtendedProperty));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.sharedExtendedProperty !== undefined) {
      url.searchParams.append("sharedExtendedProperty", String(opts.sharedExtendedProperty));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.showHiddenInvitations !== undefined) {
      url.searchParams.append("showHiddenInvitations", String(opts.showHiddenInvitations));
    }
    if (opts.singleEvents !== undefined) {
      url.searchParams.append("singleEvents", String(opts.singleEvents));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    if (opts.timeMax !== undefined) {
      url.searchParams.append("timeMax", String(opts.timeMax));
    }
    if (opts.timeMin !== undefined) {
      url.searchParams.append("timeMin", String(opts.timeMin));
    }
    if (opts.timeZone !== undefined) {
      url.searchParams.append("timeZone", String(opts.timeZone));
    }
    if (opts.updatedMin !== undefined) {
      url.searchParams.append("updatedMin", String(opts.updatedMin));
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
   * Returns free/busy information for a set of calendars.
   *
   */
  async freebusyQuery(req: FreeBusyRequest): Promise<FreeBusyResponse> {
    req = serializeFreeBusyRequest(req);
    const url = new URL(`${this.#baseUrl}freeBusy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFreeBusyResponse(data);
  }

  /**
   * Returns a single user setting.
   *
   * @param setting The id of the user setting.
   */
  async settingsGet(setting: string): Promise<Setting> {
    const url = new URL(`${this.#baseUrl}users/me/settings/${ setting }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Setting;
  }

  /**
   * Returns all user settings for the authenticated user.
   *
   */
  async settingsList(opts: SettingsListOptions = {}): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}users/me/settings`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Settings;
  }

  /**
   * Watch for changes to Settings resources.
   *
   */
  async settingsWatch(req: Channel, opts: SettingsWatchOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}users/me/settings/watch`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeChannel(data);
  }
}

export interface Acl {
  /**
   * ETag of the collection.
   */
  etag?: string;
  /**
   * List of rules on the access control list.
   */
  items?: AclRule[];
  /**
   * Type of the collection ("calendar#acl").
   */
  kind?: string;
  /**
   * Token used to access the next page of this result. Omitted if no further
   * results are available, in which case nextSyncToken is provided.
   */
  nextPageToken?: string;
  /**
   * Token used at a later point in time to retrieve only the entries that have
   * changed since this result was returned. Omitted if further results are
   * available, in which case nextPageToken is provided.
   */
  nextSyncToken?: string;
}

/**
 * Additional options for Calendar#aclInsert.
 */
export interface AclInsertOptions {
  /**
   * Whether to send notifications about the calendar sharing change. Optional.
   * The default is True.
   */
  sendNotifications?: boolean;
}

/**
 * Additional options for Calendar#aclList.
 */
export interface AclListOptions {
  /**
   * Maximum number of entries returned on one result page. By default the
   * value is 100 entries. The page size can never be larger than 250 entries.
   * Optional.
   */
  maxResults?: number;
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Whether to include deleted ACLs in the result. Deleted ACLs are
   * represented by role equal to "none". Deleted ACLs will always be included
   * if syncToken is provided. Optional. The default is False.
   */
  showDeleted?: boolean;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. All entries
   * deleted since the previous list request will always be in the result set
   * and it is not allowed to set showDeleted to False. If the syncToken
   * expires, the server will respond with a 410 GONE response code and the
   * client should clear its storage and perform a full synchronization without
   * any syncToken. Learn more about incremental synchronization. Optional. The
   * default is to return all entries.
   */
  syncToken?: string;
}

/**
 * Additional options for Calendar#aclPatch.
 */
export interface AclPatchOptions {
  /**
   * Whether to send notifications about the calendar sharing change. Note that
   * there are no notifications on access removal. Optional. The default is
   * True.
   */
  sendNotifications?: boolean;
}

export interface AclRule {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Identifier of the Access Control List (ACL) rule. See Sharing calendars.
   */
  id?: string;
  /**
   * Type of the resource ("calendar#aclRule").
   */
  kind?: string;
  /**
   * The role assigned to the scope. Possible values are: - "none" - Provides
   * no access. - "freeBusyReader" - Provides read access to free/busy
   * information. - "reader" - Provides read access to the calendar. Private
   * events will appear to users with reader access, but event details will be
   * hidden. - "writer" - Provides read and write access to the calendar.
   * Private events will appear to users with writer access, and event details
   * will be visible. - "owner" - Provides ownership of the calendar. This role
   * has all of the permissions of the writer role with the additional ability
   * to see and manipulate ACLs.
   */
  role?: string;
  /**
   * The extent to which calendar access is granted by this ACL rule.
   */
  scope?: {
    type?: string;
    value?: string;
  };
}

/**
 * Additional options for Calendar#aclUpdate.
 */
export interface AclUpdateOptions {
  /**
   * Whether to send notifications about the calendar sharing change. Note that
   * there are no notifications on access removal. Optional. The default is
   * True.
   */
  sendNotifications?: boolean;
}

/**
 * Additional options for Calendar#aclWatch.
 */
export interface AclWatchOptions {
  /**
   * Maximum number of entries returned on one result page. By default the
   * value is 100 entries. The page size can never be larger than 250 entries.
   * Optional.
   */
  maxResults?: number;
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Whether to include deleted ACLs in the result. Deleted ACLs are
   * represented by role equal to "none". Deleted ACLs will always be included
   * if syncToken is provided. Optional. The default is False.
   */
  showDeleted?: boolean;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. All entries
   * deleted since the previous list request will always be in the result set
   * and it is not allowed to set showDeleted to False. If the syncToken
   * expires, the server will respond with a 410 GONE response code and the
   * client should clear its storage and perform a full synchronization without
   * any syncToken. Learn more about incremental synchronization. Optional. The
   * default is to return all entries.
   */
  syncToken?: string;
}

export interface Calendar {
  /**
   * Conferencing properties for this calendar, for example what types of
   * conferences are allowed.
   */
  conferenceProperties?: ConferenceProperties;
  /**
   * Description of the calendar. Optional.
   */
  description?: string;
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Identifier of the calendar. To retrieve IDs call the calendarList.list()
   * method.
   */
  id?: string;
  /**
   * Type of the resource ("calendar#calendar").
   */
  kind?: string;
  /**
   * Geographic location of the calendar as free-form text. Optional.
   */
  location?: string;
  /**
   * Title of the calendar.
   */
  summary?: string;
  /**
   * The time zone of the calendar. (Formatted as an IANA Time Zone Database
   * name, e.g. "Europe/Zurich".) Optional.
   */
  timeZone?: string;
}

export interface CalendarList {
  /**
   * ETag of the collection.
   */
  etag?: string;
  /**
   * Calendars that are present on the user's calendar list.
   */
  items?: CalendarListEntry[];
  /**
   * Type of the collection ("calendar#calendarList").
   */
  kind?: string;
  /**
   * Token used to access the next page of this result. Omitted if no further
   * results are available, in which case nextSyncToken is provided.
   */
  nextPageToken?: string;
  /**
   * Token used at a later point in time to retrieve only the entries that have
   * changed since this result was returned. Omitted if further results are
   * available, in which case nextPageToken is provided.
   */
  nextSyncToken?: string;
}

export interface CalendarListEntry {
  /**
   * The effective access role that the authenticated user has on the calendar.
   * Read-only. Possible values are: - "freeBusyReader" - Provides read access
   * to free/busy information. - "reader" - Provides read access to the
   * calendar. Private events will appear to users with reader access, but event
   * details will be hidden. - "writer" - Provides read and write access to the
   * calendar. Private events will appear to users with writer access, and event
   * details will be visible. - "owner" - Provides ownership of the calendar.
   * This role has all of the permissions of the writer role with the additional
   * ability to see and manipulate ACLs.
   */
  accessRole?: string;
  /**
   * The main color of the calendar in the hexadecimal format "#0088aa". This
   * property supersedes the index-based colorId property. To set or change this
   * property, you need to specify colorRgbFormat=true in the parameters of the
   * insert, update and patch methods. Optional.
   */
  backgroundColor?: string;
  /**
   * The color of the calendar. This is an ID referring to an entry in the
   * calendar section of the colors definition (see the colors endpoint). This
   * property is superseded by the backgroundColor and foregroundColor
   * properties and can be ignored when using these properties. Optional.
   */
  colorId?: string;
  /**
   * Conferencing properties for this calendar, for example what types of
   * conferences are allowed.
   */
  conferenceProperties?: ConferenceProperties;
  /**
   * The default reminders that the authenticated user has for this calendar.
   */
  defaultReminders?: EventReminder[];
  /**
   * Whether this calendar list entry has been deleted from the calendar list.
   * Read-only. Optional. The default is False.
   */
  deleted?: boolean;
  /**
   * Description of the calendar. Optional. Read-only.
   */
  description?: string;
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * The foreground color of the calendar in the hexadecimal format "#ffffff".
   * This property supersedes the index-based colorId property. To set or change
   * this property, you need to specify colorRgbFormat=true in the parameters of
   * the insert, update and patch methods. Optional.
   */
  foregroundColor?: string;
  /**
   * Whether the calendar has been hidden from the list. Optional. The
   * attribute is only returned when the calendar is hidden, in which case the
   * value is true.
   */
  hidden?: boolean;
  /**
   * Identifier of the calendar.
   */
  id?: string;
  /**
   * Type of the resource ("calendar#calendarListEntry").
   */
  kind?: string;
  /**
   * Geographic location of the calendar as free-form text. Optional.
   * Read-only.
   */
  location?: string;
  /**
   * The notifications that the authenticated user is receiving for this
   * calendar.
   */
  notificationSettings?: {
    notifications?: CalendarNotification[];
  };
  /**
   * Whether the calendar is the primary calendar of the authenticated user.
   * Read-only. Optional. The default is False.
   */
  primary?: boolean;
  /**
   * Whether the calendar content shows up in the calendar UI. Optional. The
   * default is False.
   */
  selected?: boolean;
  /**
   * Title of the calendar. Read-only.
   */
  summary?: string;
  /**
   * The summary that the authenticated user has set for this calendar.
   * Optional.
   */
  summaryOverride?: string;
  /**
   * The time zone of the calendar. Optional. Read-only.
   */
  timeZone?: string;
}

/**
 * Additional options for Calendar#calendarListInsert.
 */
export interface CalendarListInsertOptions {
  /**
   * Whether to use the foregroundColor and backgroundColor fields to write the
   * calendar colors (RGB). If this feature is used, the index-based colorId
   * field will be set to the best matching option automatically. Optional. The
   * default is False.
   */
  colorRgbFormat?: boolean;
}

/**
 * Additional options for Calendar#calendarListList.
 */
export interface CalendarListListOptions {
  /**
   * Maximum number of entries returned on one result page. By default the
   * value is 100 entries. The page size can never be larger than 250 entries.
   * Optional.
   */
  maxResults?: number;
  /**
   * The minimum access role for the user in the returned entries. Optional.
   * The default is no restriction.
   */
  minAccessRole?:  | "freeBusyReader" | "owner" | "reader" | "writer";
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Whether to include deleted calendar list entries in the result. Optional.
   * The default is False.
   */
  showDeleted?: boolean;
  /**
   * Whether to show hidden entries. Optional. The default is False.
   */
  showHidden?: boolean;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. If only
   * read-only fields such as calendar properties or ACLs have changed, the
   * entry won't be returned. All entries deleted and hidden since the previous
   * list request will always be in the result set and it is not allowed to set
   * showDeleted neither showHidden to False. To ensure client state consistency
   * minAccessRole query parameter cannot be specified together with
   * nextSyncToken. If the syncToken expires, the server will respond with a 410
   * GONE response code and the client should clear its storage and perform a
   * full synchronization without any syncToken. Learn more about incremental
   * synchronization. Optional. The default is to return all entries.
   */
  syncToken?: string;
}

/**
 * Additional options for Calendar#calendarListPatch.
 */
export interface CalendarListPatchOptions {
  /**
   * Whether to use the foregroundColor and backgroundColor fields to write the
   * calendar colors (RGB). If this feature is used, the index-based colorId
   * field will be set to the best matching option automatically. Optional. The
   * default is False.
   */
  colorRgbFormat?: boolean;
}

/**
 * Additional options for Calendar#calendarListUpdate.
 */
export interface CalendarListUpdateOptions {
  /**
   * Whether to use the foregroundColor and backgroundColor fields to write the
   * calendar colors (RGB). If this feature is used, the index-based colorId
   * field will be set to the best matching option automatically. Optional. The
   * default is False.
   */
  colorRgbFormat?: boolean;
}

/**
 * Additional options for Calendar#calendarListWatch.
 */
export interface CalendarListWatchOptions {
  /**
   * Maximum number of entries returned on one result page. By default the
   * value is 100 entries. The page size can never be larger than 250 entries.
   * Optional.
   */
  maxResults?: number;
  /**
   * The minimum access role for the user in the returned entries. Optional.
   * The default is no restriction.
   */
  minAccessRole?:  | "freeBusyReader" | "owner" | "reader" | "writer";
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Whether to include deleted calendar list entries in the result. Optional.
   * The default is False.
   */
  showDeleted?: boolean;
  /**
   * Whether to show hidden entries. Optional. The default is False.
   */
  showHidden?: boolean;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. If only
   * read-only fields such as calendar properties or ACLs have changed, the
   * entry won't be returned. All entries deleted and hidden since the previous
   * list request will always be in the result set and it is not allowed to set
   * showDeleted neither showHidden to False. To ensure client state consistency
   * minAccessRole query parameter cannot be specified together with
   * nextSyncToken. If the syncToken expires, the server will respond with a 410
   * GONE response code and the client should clear its storage and perform a
   * full synchronization without any syncToken. Learn more about incremental
   * synchronization. Optional. The default is to return all entries.
   */
  syncToken?: string;
}

export interface CalendarNotification {
  /**
   * The method used to deliver the notification. The possible value is: -
   * "email" - Notifications are sent via email. Required when adding a
   * notification.
   */
  method?: string;
  /**
   * The type of notification. Possible values are: - "eventCreation" -
   * Notification sent when a new event is put on the calendar. - "eventChange"
   * - Notification sent when an event is changed. - "eventCancellation" -
   * Notification sent when an event is cancelled. - "eventResponse" -
   * Notification sent when an attendee responds to the event invitation. -
   * "agenda" - An agenda with the events of the day (sent out in the morning).
   * Required when adding a notification.
   */
  type?: string;
}

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
   * resource, which is "api#channel".
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
   * The type of delivery mechanism used for this channel. Valid values are
   * "web_hook" (or "webhook"). Both values refer to a channel where Http
   * requests are used to deliver messages.
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

export interface ColorDefinition {
  /**
   * The background color associated with this color definition.
   */
  background?: string;
  /**
   * The foreground color that can be used to write on top of a background with
   * 'background' color.
   */
  foreground?: string;
}

export interface Colors {
  /**
   * A global palette of calendar colors, mapping from the color ID to its
   * definition. A calendarListEntry resource refers to one of these color IDs
   * in its colorId field. Read-only.
   */
  calendar?: {
    [key: string]: ColorDefinition
  };
  /**
   * A global palette of event colors, mapping from the color ID to its
   * definition. An event resource may refer to one of these color IDs in its
   * colorId field. Read-only.
   */
  event?: {
    [key: string]: ColorDefinition
  };
  /**
   * Type of the resource ("calendar#colors").
   */
  kind?: string;
  /**
   * Last modification time of the color palette (as a RFC3339 timestamp).
   * Read-only.
   */
  updated?: Date;
}

function serializeColors(data: any): Colors {
  return {
    ...data,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeColors(data: any): Colors {
  return {
    ...data,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

export interface ConferenceData {
  /**
   * The ID of the conference. Can be used by developers to keep track of
   * conferences, should not be displayed to users. The ID value is formed
   * differently for each conference solution type: - eventHangout: ID is not
   * set. (This conference type is deprecated.) - eventNamedHangout: ID is the
   * name of the Hangout. (This conference type is deprecated.) - hangoutsMeet:
   * ID is the 10-letter meeting code, for example aaa-bbbb-ccc. - addOn: ID is
   * defined by the third-party provider. Optional.
   */
  conferenceId?: string;
  /**
   * The conference solution, such as Google Meet. Unset for a conference with
   * a failed create request. Either conferenceSolution and at least one
   * entryPoint, or createRequest is required.
   */
  conferenceSolution?: ConferenceSolution;
  /**
   * A request to generate a new conference and attach it to the event. The
   * data is generated asynchronously. To see whether the data is present check
   * the status field. Either conferenceSolution and at least one entryPoint, or
   * createRequest is required.
   */
  createRequest?: CreateConferenceRequest;
  /**
   * Information about individual conference entry points, such as URLs or
   * phone numbers. All of them must belong to the same conference. Either
   * conferenceSolution and at least one entryPoint, or createRequest is
   * required.
   */
  entryPoints?: EntryPoint[];
  /**
   * Additional notes (such as instructions from the domain administrator,
   * legal notices) to display to the user. Can contain HTML. The maximum length
   * is 2048 characters. Optional.
   */
  notes?: string;
  /**
   * Additional properties related to a conference. An example would be a
   * solution-specific setting for enabling video streaming.
   */
  parameters?: ConferenceParameters;
  /**
   * The signature of the conference data. Generated on server side. Unset for
   * a conference with a failed create request. Optional for a conference with a
   * pending create request.
   */
  signature?: string;
}

export interface ConferenceParameters {
  /**
   * Additional add-on specific data.
   */
  addOnParameters?: ConferenceParametersAddOnParameters;
}

export interface ConferenceParametersAddOnParameters {
  parameters?: {
    [key: string]: string
  };
}

export interface ConferenceProperties {
  /**
   * The types of conference solutions that are supported for this calendar.
   * The possible values are: - "eventHangout" - "eventNamedHangout" -
   * "hangoutsMeet" Optional.
   */
  allowedConferenceSolutionTypes?: string[];
}

export interface ConferenceRequestStatus {
  /**
   * The current status of the conference create request. Read-only. The
   * possible values are: - "pending": the conference create request is still
   * being processed. - "success": the conference create request succeeded, the
   * entry points are populated. - "failure": the conference create request
   * failed, there are no entry points.
   */
  statusCode?: string;
}

export interface ConferenceSolution {
  /**
   * The user-visible icon for this solution.
   */
  iconUri?: string;
  /**
   * The key which can uniquely identify the conference solution for this
   * event.
   */
  key?: ConferenceSolutionKey;
  /**
   * The user-visible name of this solution. Not localized.
   */
  name?: string;
}

export interface ConferenceSolutionKey {
  /**
   * The conference solution type. If a client encounters an unfamiliar or
   * empty type, it should still be able to display the entry points. However,
   * it should disallow modifications. The possible values are: - "eventHangout"
   * for Hangouts for consumers (deprecated; existing events may show this
   * conference solution type but new conferences cannot be created) -
   * "eventNamedHangout" for classic Hangouts for Google Workspace users
   * (deprecated; existing events may show this conference solution type but new
   * conferences cannot be created) - "hangoutsMeet" for Google Meet
   * (http://meet.google.com) - "addOn" for 3P conference providers
   */
  type?: string;
}

export interface CreateConferenceRequest {
  /**
   * The conference solution, such as Hangouts or Google Meet.
   */
  conferenceSolutionKey?: ConferenceSolutionKey;
  /**
   * The client-generated unique ID for this request. Clients should regenerate
   * this ID for every new request. If an ID provided is the same as for the
   * previous request, the request is ignored.
   */
  requestId?: string;
  /**
   * The status of the conference create request.
   */
  status?: ConferenceRequestStatus;
}

export interface EntryPoint {
  /**
   * The access code to access the conference. The maximum length is 128
   * characters. When creating new conference data, populate only the subset of
   * {meetingCode, accessCode, passcode, password, pin} fields that match the
   * terminology that the conference provider uses. Only the populated fields
   * should be displayed. Optional.
   */
  accessCode?: string;
  /**
   * Features of the entry point, such as being toll or toll-free. One entry
   * point can have multiple features. However, toll and toll-free cannot be
   * both set on the same entry point.
   */
  entryPointFeatures?: string[];
  /**
   * The type of the conference entry point. Possible values are: - "video" -
   * joining a conference over HTTP. A conference can have zero or one video
   * entry point. - "phone" - joining a conference by dialing a phone number. A
   * conference can have zero or more phone entry points. - "sip" - joining a
   * conference over SIP. A conference can have zero or one sip entry point. -
   * "more" - further conference joining instructions, for example additional
   * phone numbers. A conference can have zero or one more entry point. A
   * conference with only a more entry point is not a valid conference.
   */
  entryPointType?: string;
  /**
   * The label for the URI. Visible to end users. Not localized. The maximum
   * length is 512 characters. Examples: - for video:
   * meet.google.com/aaa-bbbb-ccc - for phone: +1 123 268 2601 - for sip:
   * 12345678@altostrat.com - for more: should not be filled Optional.
   */
  label?: string;
  /**
   * The meeting code to access the conference. The maximum length is 128
   * characters. When creating new conference data, populate only the subset of
   * {meetingCode, accessCode, passcode, password, pin} fields that match the
   * terminology that the conference provider uses. Only the populated fields
   * should be displayed. Optional.
   */
  meetingCode?: string;
  /**
   * The passcode to access the conference. The maximum length is 128
   * characters. When creating new conference data, populate only the subset of
   * {meetingCode, accessCode, passcode, password, pin} fields that match the
   * terminology that the conference provider uses. Only the populated fields
   * should be displayed.
   */
  passcode?: string;
  /**
   * The password to access the conference. The maximum length is 128
   * characters. When creating new conference data, populate only the subset of
   * {meetingCode, accessCode, passcode, password, pin} fields that match the
   * terminology that the conference provider uses. Only the populated fields
   * should be displayed. Optional.
   */
  password?: string;
  /**
   * The PIN to access the conference. The maximum length is 128 characters.
   * When creating new conference data, populate only the subset of
   * {meetingCode, accessCode, passcode, password, pin} fields that match the
   * terminology that the conference provider uses. Only the populated fields
   * should be displayed. Optional.
   */
  pin?: string;
  /**
   * The CLDR/ISO 3166 region code for the country associated with this phone
   * access. Example: "SE" for Sweden. Calendar backend will populate this field
   * only for EntryPointType.PHONE.
   */
  regionCode?: string;
  /**
   * The URI of the entry point. The maximum length is 1300 characters. Format:
   * - for video, http: or https: schema is required. - for phone, tel: schema
   * is required. The URI should include the entire dial sequence (e.g.,
   * tel:+12345678900,,,123456789;1234). - for sip, sip: schema is required,
   * e.g., sip:12345678@myprovider.com. - for more, http: or https: schema is
   * required.
   */
  uri?: string;
}

export interface Error {
  /**
   * Domain, or broad category, of the error.
   */
  domain?: string;
  /**
   * Specific reason for the error. Some of the possible values are: -
   * "groupTooBig" - The group of users requested is too large for a single
   * query. - "tooManyCalendarsRequested" - The number of calendars requested is
   * too large for a single query. - "notFound" - The requested resource was not
   * found. - "internalError" - The API service has encountered an internal
   * error. Additional error types may be added in the future, so clients should
   * gracefully handle additional error statuses not included in this list.
   */
  reason?: string;
}

export interface Event {
  /**
   * Whether anyone can invite themselves to the event (deprecated). Optional.
   * The default is False.
   */
  anyoneCanAddSelf?: boolean;
  /**
   * File attachments for the event. In order to modify attachments the
   * supportsAttachments request parameter should be set to true. There can be
   * at most 25 attachments per event,
   */
  attachments?: EventAttachment[];
  /**
   * The attendees of the event. See the Events with attendees guide for more
   * information on scheduling events with other calendar users. Service
   * accounts need to use domain-wide delegation of authority to populate the
   * attendee list.
   */
  attendees?: EventAttendee[];
  /**
   * Whether attendees may have been omitted from the event's representation.
   * When retrieving an event, this may be due to a restriction specified by the
   * maxAttendee query parameter. When updating an event, this can be used to
   * only update the participant's response. Optional. The default is False.
   */
  attendeesOmitted?: boolean;
  /**
   * The color of the event. This is an ID referring to an entry in the event
   * section of the colors definition (see the colors endpoint). Optional.
   */
  colorId?: string;
  /**
   * The conference-related information, such as details of a Google Meet
   * conference. To create new conference details use the createRequest field.
   * To persist your changes, remember to set the conferenceDataVersion request
   * parameter to 1 for all event modification requests.
   */
  conferenceData?: ConferenceData;
  /**
   * Creation time of the event (as a RFC3339 timestamp). Read-only.
   */
  created?: Date;
  /**
   * The creator of the event. Read-only.
   */
  creator?: {
    displayName?: string;
    email?: string;
    id?: string;
    self?: boolean;
  };
  /**
   * Description of the event. Can contain HTML. Optional.
   */
  description?: string;
  /**
   * The (exclusive) end time of the event. For a recurring event, this is the
   * end time of the first instance.
   */
  end?: EventDateTime;
  /**
   * Whether the end time is actually unspecified. An end time is still
   * provided for compatibility reasons, even if this attribute is set to True.
   * The default is False.
   */
  endTimeUnspecified?: boolean;
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Specific type of the event. Read-only. Possible values are: - "default" -
   * A regular event or not further specified. - "outOfOffice" - An
   * out-of-office event. - "focusTime" - A focus-time event. -
   * "workingLocation" - A working location event.
   */
  eventType?: string;
  /**
   * Extended properties of the event.
   */
  extendedProperties?: {
    private?: {
      [key: string]: string
    };
    shared?: {
      [key: string]: string
    };
  };
  /**
   * A gadget that extends this event. Gadgets are deprecated; this structure
   * is instead only used for returning birthday calendar metadata.
   */
  gadget?: {
    display?: string;
    height?: number;
    iconLink?: string;
    link?: string;
    preferences?: {
      [key: string]: string
    };
    title?: string;
    type?: string;
    width?: number;
  };
  /**
   * Whether attendees other than the organizer can invite others to the event.
   * Optional. The default is True.
   */
  guestsCanInviteOthers?: boolean;
  /**
   * Whether attendees other than the organizer can modify the event. Optional.
   * The default is False.
   */
  guestsCanModify?: boolean;
  /**
   * Whether attendees other than the organizer can see who the event's
   * attendees are. Optional. The default is True.
   */
  guestsCanSeeOtherGuests?: boolean;
  /**
   * An absolute link to the Google Hangout associated with this event.
   * Read-only.
   */
  hangoutLink?: string;
  /**
   * An absolute link to this event in the Google Calendar Web UI. Read-only.
   */
  htmlLink?: string;
  /**
   * Event unique identifier as defined in RFC5545. It is used to uniquely
   * identify events accross calendaring systems and must be supplied when
   * importing events via the import method. Note that the iCalUID and the id
   * are not identical and only one of them should be supplied at event creation
   * time. One difference in their semantics is that in recurring events, all
   * occurrences of one event have different ids while they all share the same
   * iCalUIDs. To retrieve an event using its iCalUID, call the events.list
   * method using the iCalUID parameter. To retrieve an event using its id, call
   * the events.get method.
   */
  iCalUID?: string;
  /**
   * Opaque identifier of the event. When creating new single or recurring
   * events, you can specify their IDs. Provided IDs must follow these rules: -
   * characters allowed in the ID are those used in base32hex encoding, i.e.
   * lowercase letters a-v and digits 0-9, see section 3.1.2 in RFC2938 - the
   * length of the ID must be between 5 and 1024 characters - the ID must be
   * unique per calendar Due to the globally distributed nature of the system,
   * we cannot guarantee that ID collisions will be detected at event creation
   * time. To minimize the risk of collisions we recommend using an established
   * UUID algorithm such as one described in RFC4122. If you do not specify an
   * ID, it will be automatically generated by the server. Note that the icalUID
   * and the id are not identical and only one of them should be supplied at
   * event creation time. One difference in their semantics is that in recurring
   * events, all occurrences of one event have different ids while they all
   * share the same icalUIDs.
   */
  id?: string;
  /**
   * Type of the resource ("calendar#event").
   */
  kind?: string;
  /**
   * Geographic location of the event as free-form text. Optional.
   */
  location?: string;
  /**
   * Whether this is a locked event copy where no changes can be made to the
   * main event fields "summary", "description", "location", "start", "end" or
   * "recurrence". The default is False. Read-Only.
   */
  locked?: boolean;
  /**
   * The organizer of the event. If the organizer is also an attendee, this is
   * indicated with a separate entry in attendees with the organizer field set
   * to True. To change the organizer, use the move operation. Read-only, except
   * when importing an event.
   */
  organizer?: {
    displayName?: string;
    email?: string;
    id?: string;
    self?: boolean;
  };
  /**
   * For an instance of a recurring event, this is the time at which this event
   * would start according to the recurrence data in the recurring event
   * identified by recurringEventId. It uniquely identifies the instance within
   * the recurring event series even if the instance was moved to a different
   * time. Immutable.
   */
  originalStartTime?: EventDateTime;
  /**
   * If set to True, Event propagation is disabled. Note that it is not the
   * same thing as Private event properties. Optional. Immutable. The default is
   * False.
   */
  privateCopy?: boolean;
  /**
   * List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as
   * specified in RFC5545. Note that DTSTART and DTEND lines are not allowed in
   * this field; event start and end times are specified in the start and end
   * fields. This field is omitted for single events or instances of recurring
   * events.
   */
  recurrence?: string[];
  /**
   * For an instance of a recurring event, this is the id of the recurring
   * event to which this instance belongs. Immutable.
   */
  recurringEventId?: string;
  /**
   * Information about the event's reminders for the authenticated user.
   */
  reminders?: {
    overrides?: EventReminder[];
    useDefault?: boolean;
  };
  /**
   * Sequence number as per iCalendar.
   */
  sequence?: number;
  /**
   * Source from which the event was created. For example, a web page, an email
   * message or any document identifiable by an URL with HTTP or HTTPS scheme.
   * Can only be seen or modified by the creator of the event.
   */
  source?: {
    title?: string;
    url?: string;
  };
  /**
   * The (inclusive) start time of the event. For a recurring event, this is
   * the start time of the first instance.
   */
  start?: EventDateTime;
  /**
   * Status of the event. Optional. Possible values are: - "confirmed" - The
   * event is confirmed. This is the default status. - "tentative" - The event
   * is tentatively confirmed. - "cancelled" - The event is cancelled (deleted).
   * The list method returns cancelled events only on incremental sync (when
   * syncToken or updatedMin are specified) or if the showDeleted flag is set to
   * true. The get method always returns them. A cancelled status represents two
   * different states depending on the event type: - Cancelled exceptions of an
   * uncancelled recurring event indicate that this instance should no longer be
   * presented to the user. Clients should store these events for the lifetime
   * of the parent recurring event. Cancelled exceptions are only guaranteed to
   * have values for the id, recurringEventId and originalStartTime fields
   * populated. The other fields might be empty. - All other cancelled events
   * represent deleted events. Clients should remove their locally synced
   * copies. Such cancelled events will eventually disappear, so do not rely on
   * them being available indefinitely. Deleted events are only guaranteed to
   * have the id field populated. On the organizer's calendar, cancelled events
   * continue to expose event details (summary, location, etc.) so that they can
   * be restored (undeleted). Similarly, the events to which the user was
   * invited and that they manually removed continue to provide details.
   * However, incremental sync requests with showDeleted set to false will not
   * return these details. If an event changes its organizer (for example via
   * the move operation) and the original organizer is not on the attendee list,
   * it will leave behind a cancelled event where only the id field is
   * guaranteed to be populated.
   */
  status?: string;
  /**
   * Title of the event.
   */
  summary?: string;
  /**
   * Whether the event blocks time on the calendar. Optional. Possible values
   * are: - "opaque" - Default value. The event does block time on the calendar.
   * This is equivalent to setting Show me as to Busy in the Calendar UI. -
   * "transparent" - The event does not block time on the calendar. This is
   * equivalent to setting Show me as to Available in the Calendar UI.
   */
  transparency?: string;
  /**
   * Last modification time of the event (as a RFC3339 timestamp). Read-only.
   */
  updated?: Date;
  /**
   * Visibility of the event. Optional. Possible values are: - "default" - Uses
   * the default visibility for events on the calendar. This is the default
   * value. - "public" - The event is public and event details are visible to
   * all readers of the calendar. - "private" - The event is private and only
   * event attendees may view event details. - "confidential" - The event is
   * private. This value is provided for compatibility reasons.
   */
  visibility?: string;
  /**
   * Working Location event data. Read-only.
   */
  workingLocationProperties?: EventWorkingLocationProperties;
}

function serializeEvent(data: any): Event {
  return {
    ...data,
    created: data["created"] !== undefined ? data["created"].toISOString() : undefined,
    end: data["end"] !== undefined ? serializeEventDateTime(data["end"]) : undefined,
    originalStartTime: data["originalStartTime"] !== undefined ? serializeEventDateTime(data["originalStartTime"]) : undefined,
    start: data["start"] !== undefined ? serializeEventDateTime(data["start"]) : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeEvent(data: any): Event {
  return {
    ...data,
    created: data["created"] !== undefined ? new Date(data["created"]) : undefined,
    end: data["end"] !== undefined ? deserializeEventDateTime(data["end"]) : undefined,
    originalStartTime: data["originalStartTime"] !== undefined ? deserializeEventDateTime(data["originalStartTime"]) : undefined,
    start: data["start"] !== undefined ? deserializeEventDateTime(data["start"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

export interface EventAttachment {
  /**
   * ID of the attached file. Read-only. For Google Drive files, this is the ID
   * of the corresponding Files resource entry in the Drive API.
   */
  fileId?: string;
  /**
   * URL link to the attachment. For adding Google Drive file attachments use
   * the same format as in alternateLink property of the Files resource in the
   * Drive API. Required when adding an attachment.
   */
  fileUrl?: string;
  /**
   * URL link to the attachment's icon. This field can only be modified for
   * custom third-party attachments.
   */
  iconLink?: string;
  /**
   * Internet media type (MIME type) of the attachment.
   */
  mimeType?: string;
  /**
   * Attachment title.
   */
  title?: string;
}

export interface EventAttendee {
  /**
   * Number of additional guests. Optional. The default is 0.
   */
  additionalGuests?: number;
  /**
   * The attendee's response comment. Optional.
   */
  comment?: string;
  /**
   * The attendee's name, if available. Optional.
   */
  displayName?: string;
  /**
   * The attendee's email address, if available. This field must be present
   * when adding an attendee. It must be a valid email address as per RFC5322.
   * Required when adding an attendee.
   */
  email?: string;
  /**
   * The attendee's Profile ID, if available.
   */
  id?: string;
  /**
   * Whether this is an optional attendee. Optional. The default is False.
   */
  optional?: boolean;
  /**
   * Whether the attendee is the organizer of the event. Read-only. The default
   * is False.
   */
  organizer?: boolean;
  /**
   * Whether the attendee is a resource. Can only be set when the attendee is
   * added to the event for the first time. Subsequent modifications are
   * ignored. Optional. The default is False.
   */
  resource?: boolean;
  /**
   * The attendee's response status. Possible values are: - "needsAction" - The
   * attendee has not responded to the invitation (recommended for new events).
   * - "declined" - The attendee has declined the invitation. - "tentative" -
   * The attendee has tentatively accepted the invitation. - "accepted" - The
   * attendee has accepted the invitation. Warning: If you add an event using
   * the values declined, tentative, or accepted, attendees with the "Add
   * invitations to my calendar" setting set to "When I respond to invitation in
   * email" won't see an event on their calendar unless they choose to change
   * their invitation response in the event invitation email.
   */
  responseStatus?: string;
  /**
   * Whether this entry represents the calendar on which this copy of the event
   * appears. Read-only. The default is False.
   */
  self?: boolean;
}

export interface EventDateTime {
  /**
   * The date, in the format "yyyy-mm-dd", if this is an all-day event.
   */
  date?: Date;
  /**
   * The time, as a combined date-time value (formatted according to RFC3339).
   * A time zone offset is required unless a time zone is explicitly specified
   * in timeZone.
   */
  dateTime?: Date;
  /**
   * The time zone in which the time is specified. (Formatted as an IANA Time
   * Zone Database name, e.g. "Europe/Zurich".) For recurring events this field
   * is required and specifies the time zone in which the recurrence is
   * expanded. For single events this field is optional and indicates a custom
   * time zone for the event start/end.
   */
  timeZone?: string;
}

function serializeEventDateTime(data: any): EventDateTime {
  return {
    ...data,
    date: data["date"] !== undefined ? data["date"].toISOString() : undefined,
    dateTime: data["dateTime"] !== undefined ? data["dateTime"].toISOString() : undefined,
  };
}

function deserializeEventDateTime(data: any): EventDateTime {
  return {
    ...data,
    date: data["date"] !== undefined ? new Date(data["date"]) : undefined,
    dateTime: data["dateTime"] !== undefined ? new Date(data["dateTime"]) : undefined,
  };
}

export interface EventReminder {
  /**
   * The method used by this reminder. Possible values are: - "email" -
   * Reminders are sent via email. - "popup" - Reminders are sent via a UI
   * popup. Required when adding a reminder.
   */
  method?: string;
  /**
   * Number of minutes before the start of the event when the reminder should
   * trigger. Valid values are between 0 and 40320 (4 weeks in minutes).
   * Required when adding a reminder.
   */
  minutes?: number;
}

export interface Events {
  /**
   * The user's access role for this calendar. Read-only. Possible values are:
   * - "none" - The user has no access. - "freeBusyReader" - The user has read
   * access to free/busy information. - "reader" - The user has read access to
   * the calendar. Private events will appear to users with reader access, but
   * event details will be hidden. - "writer" - The user has read and write
   * access to the calendar. Private events will appear to users with writer
   * access, and event details will be visible. - "owner" - The user has
   * ownership of the calendar. This role has all of the permissions of the
   * writer role with the additional ability to see and manipulate ACLs.
   */
  accessRole?: string;
  /**
   * The default reminders on the calendar for the authenticated user. These
   * reminders apply to all events on this calendar that do not explicitly
   * override them (i.e. do not have reminders.useDefault set to True).
   */
  defaultReminders?: EventReminder[];
  /**
   * Description of the calendar. Read-only.
   */
  description?: string;
  /**
   * ETag of the collection.
   */
  etag?: string;
  /**
   * List of events on the calendar.
   */
  items?: Event[];
  /**
   * Type of the collection ("calendar#events").
   */
  kind?: string;
  /**
   * Token used to access the next page of this result. Omitted if no further
   * results are available, in which case nextSyncToken is provided.
   */
  nextPageToken?: string;
  /**
   * Token used at a later point in time to retrieve only the entries that have
   * changed since this result was returned. Omitted if further results are
   * available, in which case nextPageToken is provided.
   */
  nextSyncToken?: string;
  /**
   * Title of the calendar. Read-only.
   */
  summary?: string;
  /**
   * The time zone of the calendar. Read-only.
   */
  timeZone?: string;
  /**
   * Last modification time of the calendar (as a RFC3339 timestamp).
   * Read-only.
   */
  updated?: Date;
}

function serializeEvents(data: any): Events {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeEvent(item))) : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeEvents(data: any): Events {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeEvent(item))) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * Additional options for Calendar#eventsDelete.
 */
export interface EventsDeleteOptions {
  /**
   * Deprecated. Please use sendUpdates instead. Whether to send notifications
   * about the deletion of the event. Note that some emails might still be sent
   * even if you set the value to false. The default is false.
   */
  sendNotifications?: boolean;
  /**
   * Guests who should receive notifications about the deletion of the event.
   */
  sendUpdates?:  | "all" | "externalOnly" | "none";
}

/**
 * Additional options for Calendar#eventsGet.
 */
export interface EventsGetOptions {
  /**
   * Deprecated and ignored. A value will always be returned in the email field
   * for the organizer, creator and attendees, even if no real email address is
   * available (i.e. a generated, non-working value will be provided).
   */
  alwaysIncludeEmail?: boolean;
  /**
   * The maximum number of attendees to include in the response. If there are
   * more than the specified number of attendees, only the participant is
   * returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Time zone used in the response. Optional. The default is the time zone of
   * the calendar.
   */
  timeZone?: string;
}

/**
 * Additional options for Calendar#eventsImport.
 */
export interface EventsImportOptions {
  /**
   * Version number of conference data supported by the API client. Version 0
   * assumes no conference data support and ignores conference data in the
   * event's body. Version 1 enables support for copying of ConferenceData as
   * well as for creating new conferences using the createRequest field of
   * conferenceData. The default is 0.
   */
  conferenceDataVersion?: number;
  /**
   * Whether API client performing operation supports event attachments.
   * Optional. The default is False.
   */
  supportsAttachments?: boolean;
}

/**
 * Additional options for Calendar#eventsInsert.
 */
export interface EventsInsertOptions {
  /**
   * Version number of conference data supported by the API client. Version 0
   * assumes no conference data support and ignores conference data in the
   * event's body. Version 1 enables support for copying of ConferenceData as
   * well as for creating new conferences using the createRequest field of
   * conferenceData. The default is 0.
   */
  conferenceDataVersion?: number;
  /**
   * The maximum number of attendees to include in the response. If there are
   * more than the specified number of attendees, only the participant is
   * returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Deprecated. Please use sendUpdates instead. Whether to send notifications
   * about the creation of the new event. Note that some emails might still be
   * sent even if you set the value to false. The default is false.
   */
  sendNotifications?: boolean;
  /**
   * Whether to send notifications about the creation of the new event. Note
   * that some emails might still be sent. The default is false.
   */
  sendUpdates?:  | "all" | "externalOnly" | "none";
  /**
   * Whether API client performing operation supports event attachments.
   * Optional. The default is False.
   */
  supportsAttachments?: boolean;
}

/**
 * Additional options for Calendar#eventsInstances.
 */
export interface EventsInstancesOptions {
  /**
   * Deprecated and ignored. A value will always be returned in the email field
   * for the organizer, creator and attendees, even if no real email address is
   * available (i.e. a generated, non-working value will be provided).
   */
  alwaysIncludeEmail?: boolean;
  /**
   * The maximum number of attendees to include in the response. If there are
   * more than the specified number of attendees, only the participant is
   * returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Maximum number of events returned on one result page. By default the value
   * is 250 events. The page size can never be larger than 2500 events.
   * Optional.
   */
  maxResults?: number;
  /**
   * The original start time of the instance in the result. Optional.
   */
  originalStart?: string;
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Whether to include deleted events (with status equals "cancelled") in the
   * result. Cancelled instances of recurring events will still be included if
   * singleEvents is False. Optional. The default is False.
   */
  showDeleted?: boolean;
  /**
   * Upper bound (exclusive) for an event's start time to filter by. Optional.
   * The default is not to filter by start time. Must be an RFC3339 timestamp
   * with mandatory time zone offset.
   */
  timeMax?: Date;
  /**
   * Lower bound (inclusive) for an event's end time to filter by. Optional.
   * The default is not to filter by end time. Must be an RFC3339 timestamp with
   * mandatory time zone offset.
   */
  timeMin?: Date;
  /**
   * Time zone used in the response. Optional. The default is the time zone of
   * the calendar.
   */
  timeZone?: string;
}

function serializeEventsInstancesOptions(data: any): EventsInstancesOptions {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? data["timeMax"].toISOString() : undefined,
    timeMin: data["timeMin"] !== undefined ? data["timeMin"].toISOString() : undefined,
  };
}

function deserializeEventsInstancesOptions(data: any): EventsInstancesOptions {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? new Date(data["timeMax"]) : undefined,
    timeMin: data["timeMin"] !== undefined ? new Date(data["timeMin"]) : undefined,
  };
}

/**
 * Additional options for Calendar#eventsList.
 */
export interface EventsListOptions {
  /**
   * Deprecated and ignored. A value will always be returned in the email field
   * for the organizer, creator and attendees, even if no real email address is
   * available (i.e. a generated, non-working value will be provided).
   */
  alwaysIncludeEmail?: boolean;
  /**
   * Specifies an event ID in the iCalendar format to be provided in the
   * response. Optional. Use this if you want to search for an event by its
   * iCalendar ID.
   */
  iCalUID?: string;
  /**
   * The maximum number of attendees to include in the response. If there are
   * more than the specified number of attendees, only the participant is
   * returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Maximum number of events returned on one result page. The number of events
   * in the resulting page may be less than this value, or none at all, even if
   * there are more events matching the query. Incomplete pages can be detected
   * by a non-empty nextPageToken field in the response. By default the value is
   * 250 events. The page size can never be larger than 2500 events. Optional.
   */
  maxResults?: number;
  /**
   * The order of the events returned in the result. Optional. The default is
   * an unspecified, stable order.
   */
  orderBy?:  | "startTime" | "updated";
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Extended properties constraint specified as propertyName=value. Matches
   * only private properties. This parameter might be repeated multiple times to
   * return events that match all given constraints.
   */
  privateExtendedProperty?: string;
  /**
   * Free text search terms to find events that match these terms in the
   * following fields: summary, description, location, attendee's displayName,
   * attendee's email. Optional.
   */
  q?: string;
  /**
   * Extended properties constraint specified as propertyName=value. Matches
   * only shared properties. This parameter might be repeated multiple times to
   * return events that match all given constraints.
   */
  sharedExtendedProperty?: string;
  /**
   * Whether to include deleted events (with status equals "cancelled") in the
   * result. Cancelled instances of recurring events (but not the underlying
   * recurring event) will still be included if showDeleted and singleEvents are
   * both False. If showDeleted and singleEvents are both True, only single
   * instances of deleted events (but not the underlying recurring events) are
   * returned. Optional. The default is False.
   */
  showDeleted?: boolean;
  /**
   * Whether to include hidden invitations in the result. Optional. The default
   * is False.
   */
  showHiddenInvitations?: boolean;
  /**
   * Whether to expand recurring events into instances and only return single
   * one-off events and instances of recurring events, but not the underlying
   * recurring events themselves. Optional. The default is False.
   */
  singleEvents?: boolean;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. All events
   * deleted since the previous list request will always be in the result set
   * and it is not allowed to set showDeleted to False. There are several query
   * parameters that cannot be specified together with nextSyncToken to ensure
   * consistency of the client state. These are: - iCalUID - orderBy -
   * privateExtendedProperty - q - sharedExtendedProperty - timeMin - timeMax -
   * updatedMin If the syncToken expires, the server will respond with a 410
   * GONE response code and the client should clear its storage and perform a
   * full synchronization without any syncToken. Learn more about incremental
   * synchronization. Optional. The default is to return all entries.
   */
  syncToken?: string;
  /**
   * Upper bound (exclusive) for an event's start time to filter by. Optional.
   * The default is not to filter by start time. Must be an RFC3339 timestamp
   * with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00,
   * 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If
   * timeMin is set, timeMax must be greater than timeMin.
   */
  timeMax?: Date;
  /**
   * Lower bound (exclusive) for an event's end time to filter by. Optional.
   * The default is not to filter by end time. Must be an RFC3339 timestamp with
   * mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00,
   * 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If
   * timeMax is set, timeMin must be smaller than timeMax.
   */
  timeMin?: Date;
  /**
   * Time zone used in the response. Optional. The default is the time zone of
   * the calendar.
   */
  timeZone?: string;
  /**
   * Lower bound for an event's last modification time (as a RFC3339 timestamp)
   * to filter by. When specified, entries deleted since this time will always
   * be included regardless of showDeleted. Optional. The default is not to
   * filter by last modification time.
   */
  updatedMin?: Date;
}

function serializeEventsListOptions(data: any): EventsListOptions {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? data["timeMax"].toISOString() : undefined,
    timeMin: data["timeMin"] !== undefined ? data["timeMin"].toISOString() : undefined,
    updatedMin: data["updatedMin"] !== undefined ? data["updatedMin"].toISOString() : undefined,
  };
}

function deserializeEventsListOptions(data: any): EventsListOptions {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? new Date(data["timeMax"]) : undefined,
    timeMin: data["timeMin"] !== undefined ? new Date(data["timeMin"]) : undefined,
    updatedMin: data["updatedMin"] !== undefined ? new Date(data["updatedMin"]) : undefined,
  };
}

/**
 * Additional options for Calendar#eventsMove.
 */
export interface EventsMoveOptions {
  /**
   * Calendar identifier of the target calendar where the event is to be moved
   * to.
   */
  destination: string;
  /**
   * Deprecated. Please use sendUpdates instead. Whether to send notifications
   * about the change of the event's organizer. Note that some emails might
   * still be sent even if you set the value to false. The default is false.
   */
  sendNotifications?: boolean;
  /**
   * Guests who should receive notifications about the change of the event's
   * organizer.
   */
  sendUpdates?:  | "all" | "externalOnly" | "none";
}

/**
 * Additional options for Calendar#eventsPatch.
 */
export interface EventsPatchOptions {
  /**
   * Deprecated and ignored. A value will always be returned in the email field
   * for the organizer, creator and attendees, even if no real email address is
   * available (i.e. a generated, non-working value will be provided).
   */
  alwaysIncludeEmail?: boolean;
  /**
   * Version number of conference data supported by the API client. Version 0
   * assumes no conference data support and ignores conference data in the
   * event's body. Version 1 enables support for copying of ConferenceData as
   * well as for creating new conferences using the createRequest field of
   * conferenceData. The default is 0.
   */
  conferenceDataVersion?: number;
  /**
   * The maximum number of attendees to include in the response. If there are
   * more than the specified number of attendees, only the participant is
   * returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Deprecated. Please use sendUpdates instead. Whether to send notifications
   * about the event update (for example, description changes, etc.). Note that
   * some emails might still be sent even if you set the value to false. The
   * default is false.
   */
  sendNotifications?: boolean;
  /**
   * Guests who should receive notifications about the event update (for
   * example, title changes, etc.).
   */
  sendUpdates?:  | "all" | "externalOnly" | "none";
  /**
   * Whether API client performing operation supports event attachments.
   * Optional. The default is False.
   */
  supportsAttachments?: boolean;
}

/**
 * Additional options for Calendar#eventsQuickAdd.
 */
export interface EventsQuickAddOptions {
  /**
   * Deprecated. Please use sendUpdates instead. Whether to send notifications
   * about the creation of the event. Note that some emails might still be sent
   * even if you set the value to false. The default is false.
   */
  sendNotifications?: boolean;
  /**
   * Guests who should receive notifications about the creation of the new
   * event.
   */
  sendUpdates?:  | "all" | "externalOnly" | "none";
  /**
   * The text describing the event to be created.
   */
  text: string;
}

/**
 * Additional options for Calendar#eventsUpdate.
 */
export interface EventsUpdateOptions {
  /**
   * Deprecated and ignored. A value will always be returned in the email field
   * for the organizer, creator and attendees, even if no real email address is
   * available (i.e. a generated, non-working value will be provided).
   */
  alwaysIncludeEmail?: boolean;
  /**
   * Version number of conference data supported by the API client. Version 0
   * assumes no conference data support and ignores conference data in the
   * event's body. Version 1 enables support for copying of ConferenceData as
   * well as for creating new conferences using the createRequest field of
   * conferenceData. The default is 0.
   */
  conferenceDataVersion?: number;
  /**
   * The maximum number of attendees to include in the response. If there are
   * more than the specified number of attendees, only the participant is
   * returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Deprecated. Please use sendUpdates instead. Whether to send notifications
   * about the event update (for example, description changes, etc.). Note that
   * some emails might still be sent even if you set the value to false. The
   * default is false.
   */
  sendNotifications?: boolean;
  /**
   * Guests who should receive notifications about the event update (for
   * example, title changes, etc.).
   */
  sendUpdates?:  | "all" | "externalOnly" | "none";
  /**
   * Whether API client performing operation supports event attachments.
   * Optional. The default is False.
   */
  supportsAttachments?: boolean;
}

/**
 * Additional options for Calendar#eventsWatch.
 */
export interface EventsWatchOptions {
  /**
   * Deprecated and ignored. A value will always be returned in the email field
   * for the organizer, creator and attendees, even if no real email address is
   * available (i.e. a generated, non-working value will be provided).
   */
  alwaysIncludeEmail?: boolean;
  /**
   * Specifies an event ID in the iCalendar format to be provided in the
   * response. Optional. Use this if you want to search for an event by its
   * iCalendar ID.
   */
  iCalUID?: string;
  /**
   * The maximum number of attendees to include in the response. If there are
   * more than the specified number of attendees, only the participant is
   * returned. Optional.
   */
  maxAttendees?: number;
  /**
   * Maximum number of events returned on one result page. The number of events
   * in the resulting page may be less than this value, or none at all, even if
   * there are more events matching the query. Incomplete pages can be detected
   * by a non-empty nextPageToken field in the response. By default the value is
   * 250 events. The page size can never be larger than 2500 events. Optional.
   */
  maxResults?: number;
  /**
   * The order of the events returned in the result. Optional. The default is
   * an unspecified, stable order.
   */
  orderBy?:  | "startTime" | "updated";
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Extended properties constraint specified as propertyName=value. Matches
   * only private properties. This parameter might be repeated multiple times to
   * return events that match all given constraints.
   */
  privateExtendedProperty?: string;
  /**
   * Free text search terms to find events that match these terms in the
   * following fields: summary, description, location, attendee's displayName,
   * attendee's email. Optional.
   */
  q?: string;
  /**
   * Extended properties constraint specified as propertyName=value. Matches
   * only shared properties. This parameter might be repeated multiple times to
   * return events that match all given constraints.
   */
  sharedExtendedProperty?: string;
  /**
   * Whether to include deleted events (with status equals "cancelled") in the
   * result. Cancelled instances of recurring events (but not the underlying
   * recurring event) will still be included if showDeleted and singleEvents are
   * both False. If showDeleted and singleEvents are both True, only single
   * instances of deleted events (but not the underlying recurring events) are
   * returned. Optional. The default is False.
   */
  showDeleted?: boolean;
  /**
   * Whether to include hidden invitations in the result. Optional. The default
   * is False.
   */
  showHiddenInvitations?: boolean;
  /**
   * Whether to expand recurring events into instances and only return single
   * one-off events and instances of recurring events, but not the underlying
   * recurring events themselves. Optional. The default is False.
   */
  singleEvents?: boolean;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. All events
   * deleted since the previous list request will always be in the result set
   * and it is not allowed to set showDeleted to False. There are several query
   * parameters that cannot be specified together with nextSyncToken to ensure
   * consistency of the client state. These are: - iCalUID - orderBy -
   * privateExtendedProperty - q - sharedExtendedProperty - timeMin - timeMax -
   * updatedMin If the syncToken expires, the server will respond with a 410
   * GONE response code and the client should clear its storage and perform a
   * full synchronization without any syncToken. Learn more about incremental
   * synchronization. Optional. The default is to return all entries.
   */
  syncToken?: string;
  /**
   * Upper bound (exclusive) for an event's start time to filter by. Optional.
   * The default is not to filter by start time. Must be an RFC3339 timestamp
   * with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00,
   * 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If
   * timeMin is set, timeMax must be greater than timeMin.
   */
  timeMax?: Date;
  /**
   * Lower bound (exclusive) for an event's end time to filter by. Optional.
   * The default is not to filter by end time. Must be an RFC3339 timestamp with
   * mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00,
   * 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If
   * timeMax is set, timeMin must be smaller than timeMax.
   */
  timeMin?: Date;
  /**
   * Time zone used in the response. Optional. The default is the time zone of
   * the calendar.
   */
  timeZone?: string;
  /**
   * Lower bound for an event's last modification time (as a RFC3339 timestamp)
   * to filter by. When specified, entries deleted since this time will always
   * be included regardless of showDeleted. Optional. The default is not to
   * filter by last modification time.
   */
  updatedMin?: Date;
}

function serializeEventsWatchOptions(data: any): EventsWatchOptions {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? data["timeMax"].toISOString() : undefined,
    timeMin: data["timeMin"] !== undefined ? data["timeMin"].toISOString() : undefined,
    updatedMin: data["updatedMin"] !== undefined ? data["updatedMin"].toISOString() : undefined,
  };
}

function deserializeEventsWatchOptions(data: any): EventsWatchOptions {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? new Date(data["timeMax"]) : undefined,
    timeMin: data["timeMin"] !== undefined ? new Date(data["timeMin"]) : undefined,
    updatedMin: data["updatedMin"] !== undefined ? new Date(data["updatedMin"]) : undefined,
  };
}

export interface EventWorkingLocationProperties {
  /**
   * If present, specifies that the user is working from a custom location.
   */
  customLocation?: {
    label?: string;
  };
  /**
   * If present, specifies that the user is working at home.
   */
  homeOffice?: any;
  /**
   * If present, specifies that the user is working from an office.
   */
  officeLocation?: {
    buildingId?: string;
    deskId?: string;
    floorId?: string;
    floorSectionId?: string;
    label?: string;
  };
}

export interface FreeBusyCalendar {
  /**
   * List of time ranges during which this calendar should be regarded as busy.
   */
  busy?: TimePeriod[];
  /**
   * Optional error(s) (if computation for the calendar failed).
   */
  errors?: Error[];
}

function serializeFreeBusyCalendar(data: any): FreeBusyCalendar {
  return {
    ...data,
    busy: data["busy"] !== undefined ? data["busy"].map((item: any) => (serializeTimePeriod(item))) : undefined,
  };
}

function deserializeFreeBusyCalendar(data: any): FreeBusyCalendar {
  return {
    ...data,
    busy: data["busy"] !== undefined ? data["busy"].map((item: any) => (deserializeTimePeriod(item))) : undefined,
  };
}

export interface FreeBusyGroup {
  /**
   * List of calendars' identifiers within a group.
   */
  calendars?: string[];
  /**
   * Optional error(s) (if computation for the group failed).
   */
  errors?: Error[];
}

export interface FreeBusyRequest {
  /**
   * Maximal number of calendars for which FreeBusy information is to be
   * provided. Optional. Maximum value is 50.
   */
  calendarExpansionMax?: number;
  /**
   * Maximal number of calendar identifiers to be provided for a single group.
   * Optional. An error is returned for a group with more members than this
   * value. Maximum value is 100.
   */
  groupExpansionMax?: number;
  /**
   * List of calendars and/or groups to query.
   */
  items?: FreeBusyRequestItem[];
  /**
   * The end of the interval for the query formatted as per RFC3339.
   */
  timeMax?: Date;
  /**
   * The start of the interval for the query formatted as per RFC3339.
   */
  timeMin?: Date;
  /**
   * Time zone used in the response. Optional. The default is UTC.
   */
  timeZone?: string;
}

function serializeFreeBusyRequest(data: any): FreeBusyRequest {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? data["timeMax"].toISOString() : undefined,
    timeMin: data["timeMin"] !== undefined ? data["timeMin"].toISOString() : undefined,
  };
}

function deserializeFreeBusyRequest(data: any): FreeBusyRequest {
  return {
    ...data,
    timeMax: data["timeMax"] !== undefined ? new Date(data["timeMax"]) : undefined,
    timeMin: data["timeMin"] !== undefined ? new Date(data["timeMin"]) : undefined,
  };
}

export interface FreeBusyRequestItem {
  /**
   * The identifier of a calendar or a group.
   */
  id?: string;
}

export interface FreeBusyResponse {
  /**
   * List of free/busy information for calendars.
   */
  calendars?: {
    [key: string]: FreeBusyCalendar
  };
  /**
   * Expansion of groups.
   */
  groups?: {
    [key: string]: FreeBusyGroup
  };
  /**
   * Type of the resource ("calendar#freeBusy").
   */
  kind?: string;
  /**
   * The end of the interval.
   */
  timeMax?: Date;
  /**
   * The start of the interval.
   */
  timeMin?: Date;
}

function serializeFreeBusyResponse(data: any): FreeBusyResponse {
  return {
    ...data,
    calendars: data["calendars"] !== undefined ? Object.fromEntries(Object.entries(data["calendars"]).map(([k, v]: [string, any]) => ([k, serializeFreeBusyCalendar(v)]))) : undefined,
    timeMax: data["timeMax"] !== undefined ? data["timeMax"].toISOString() : undefined,
    timeMin: data["timeMin"] !== undefined ? data["timeMin"].toISOString() : undefined,
  };
}

function deserializeFreeBusyResponse(data: any): FreeBusyResponse {
  return {
    ...data,
    calendars: data["calendars"] !== undefined ? Object.fromEntries(Object.entries(data["calendars"]).map(([k, v]: [string, any]) => ([k, deserializeFreeBusyCalendar(v)]))) : undefined,
    timeMax: data["timeMax"] !== undefined ? new Date(data["timeMax"]) : undefined,
    timeMin: data["timeMin"] !== undefined ? new Date(data["timeMin"]) : undefined,
  };
}

export interface Setting {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * The id of the user setting.
   */
  id?: string;
  /**
   * Type of the resource ("calendar#setting").
   */
  kind?: string;
  /**
   * Value of the user setting. The format of the value depends on the ID of
   * the setting. It must always be a UTF-8 string of length up to 1024
   * characters.
   */
  value?: string;
}

export interface Settings {
  /**
   * Etag of the collection.
   */
  etag?: string;
  /**
   * List of user settings.
   */
  items?: Setting[];
  /**
   * Type of the collection ("calendar#settings").
   */
  kind?: string;
  /**
   * Token used to access the next page of this result. Omitted if no further
   * results are available, in which case nextSyncToken is provided.
   */
  nextPageToken?: string;
  /**
   * Token used at a later point in time to retrieve only the entries that have
   * changed since this result was returned. Omitted if further results are
   * available, in which case nextPageToken is provided.
   */
  nextSyncToken?: string;
}

/**
 * Additional options for Calendar#settingsList.
 */
export interface SettingsListOptions {
  /**
   * Maximum number of entries returned on one result page. By default the
   * value is 100 entries. The page size can never be larger than 250 entries.
   * Optional.
   */
  maxResults?: number;
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. If the syncToken
   * expires, the server will respond with a 410 GONE response code and the
   * client should clear its storage and perform a full synchronization without
   * any syncToken. Learn more about incremental synchronization. Optional. The
   * default is to return all entries.
   */
  syncToken?: string;
}

/**
 * Additional options for Calendar#settingsWatch.
 */
export interface SettingsWatchOptions {
  /**
   * Maximum number of entries returned on one result page. By default the
   * value is 100 entries. The page size can never be larger than 250 entries.
   * Optional.
   */
  maxResults?: number;
  /**
   * Token specifying which result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Token obtained from the nextSyncToken field returned on the last page of
   * results from the previous list request. It makes the result of this list
   * request contain only entries that have changed since then. If the syncToken
   * expires, the server will respond with a 410 GONE response code and the
   * client should clear its storage and perform a full synchronization without
   * any syncToken. Learn more about incremental synchronization. Optional. The
   * default is to return all entries.
   */
  syncToken?: string;
}

export interface TimePeriod {
  /**
   * The (exclusive) end of the time period.
   */
  end?: Date;
  /**
   * The (inclusive) start of the time period.
   */
  start?: Date;
}

function serializeTimePeriod(data: any): TimePeriod {
  return {
    ...data,
    end: data["end"] !== undefined ? data["end"].toISOString() : undefined,
    start: data["start"] !== undefined ? data["start"].toISOString() : undefined,
  };
}

function deserializeTimePeriod(data: any): TimePeriod {
  return {
    ...data,
    end: data["end"] !== undefined ? new Date(data["end"]) : undefined,
    start: data["start"] !== undefined ? new Date(data["start"]) : undefined,
  };
}