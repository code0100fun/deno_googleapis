// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Local Services API Client for Deno
 * ==================================
 * 
 * 
 * 
 * Docs: https://ads.google.com/local-services-ads/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class LocalServices {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://localservices.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Get account reports containing aggregate account data of all linked GLS
   * accounts. Caller needs to provide their manager customer id and the
   * associated auth credential that allows them read permissions on their
   * linked accounts.
   *
   */
  async accountReportsSearch(opts: AccountReportsSearchOptions = {}): Promise<GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/accountReports:search`);
    if (opts["endDate.day"] !== undefined) {
      url.searchParams.append("endDate.day", String(opts["endDate.day"]));
    }
    if (opts["endDate.month"] !== undefined) {
      url.searchParams.append("endDate.month", String(opts["endDate.month"]));
    }
    if (opts["endDate.year"] !== undefined) {
      url.searchParams.append("endDate.year", String(opts["endDate.year"]));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts["startDate.day"] !== undefined) {
      url.searchParams.append("startDate.day", String(opts["startDate.day"]));
    }
    if (opts["startDate.month"] !== undefined) {
      url.searchParams.append("startDate.month", String(opts["startDate.month"]));
    }
    if (opts["startDate.year"] !== undefined) {
      url.searchParams.append("startDate.year", String(opts["startDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse(data);
  }

  /**
   * Get detailed lead reports containing leads that have been received by all
   * linked GLS accounts. Caller needs to provide their manager customer id and
   * the associated auth credential that allows them read permissions on their
   * linked accounts.
   *
   */
  async detailedLeadReportsSearch(opts: DetailedLeadReportsSearchOptions = {}): Promise<GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/detailedLeadReports:search`);
    if (opts["endDate.day"] !== undefined) {
      url.searchParams.append("endDate.day", String(opts["endDate.day"]));
    }
    if (opts["endDate.month"] !== undefined) {
      url.searchParams.append("endDate.month", String(opts["endDate.month"]));
    }
    if (opts["endDate.year"] !== undefined) {
      url.searchParams.append("endDate.year", String(opts["endDate.year"]));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts["startDate.day"] !== undefined) {
      url.searchParams.append("startDate.day", String(opts["startDate.day"]));
    }
    if (opts["startDate.month"] !== undefined) {
      url.searchParams.append("startDate.month", String(opts["startDate.month"]));
    }
    if (opts["startDate.year"] !== undefined) {
      url.searchParams.append("startDate.year", String(opts["startDate.year"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse(data);
  }
}

/**
 * Additional options for LocalServices#accountReportsSearch.
 */
export interface AccountReportsSearchOptions {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["endDate.year"]?: number;
  /**
   * The maximum number of accounts to return. If the page size is unset, page
   * size will default to 1000. Maximum page_size is 10000. Optional.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous request to
   * SearchAccountReports that indicates where listing should continue.
   * Optional.
   */
  pageToken?: string;
  /**
   * A query string for searching for account reports. Caller must provide a
   * customer id of their MCC account with an associated Gaia Mint that allows
   * read permission on their linked accounts. Search expressions are case
   * insensitive. Example query: | Query | Description |
   * |-------------------------|-----------------------------------------------|
   * | manager_customer_id:123 | Get Account Report for Manager with id 123. |
   * Required.
   */
  query?: string;
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["startDate.year"]?: number;
}

/**
 * Additional options for LocalServices#detailedLeadReportsSearch.
 */
export interface DetailedLeadReportsSearchOptions {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["endDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["endDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["endDate.year"]?: number;
  /**
   * The maximum number of accounts to return. If the page size is unset, page
   * size will default to 1000. Maximum page_size is 10000. Optional.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous request to
   * SearchDetailedLeadReports that indicates where listing should continue.
   * Optional.
   */
  pageToken?: string;
  /**
   * A query string for searching for account reports. Caller must provide a
   * customer id of their MCC account with an associated Gaia Mint that allows
   * read permission on their linked accounts. Search expressions are case
   * insensitive. Example query: | Query | Description |
   * |-------------------------|-----------------------------------------------|
   * | manager_customer_id:123 | Get Detailed Lead Report for Manager with id |
   * | | 123. | Required.
   */
  query?: string;
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  ["startDate.day"]?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  ["startDate.month"]?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  ["startDate.year"]?: number;
}

/**
 * An Account Report of a GLS account identified by their account id containing
 * aggregate data gathered from a particular date range. Next ID: 18
 */
export interface GoogleAdsHomeservicesLocalservicesV1AccountReport {
  /**
   * Unique identifier of the GLS account.
   */
  accountId?: bigint;
  /**
   * Aggregator specific information related to the account.
   */
  aggregatorInfo?: GoogleAdsHomeservicesLocalservicesV1AggregatorInfo;
  /**
   * Average review rating score from 1-5 stars.
   */
  averageFiveStarRating?: number;
  /**
   * Average weekly budget in the currency code of the account.
   */
  averageWeeklyBudget?: number;
  /**
   * Business name of the account.
   */
  businessName?: string;
  /**
   * Currency code of the account.
   */
  currencyCode?: string;
  /**
   * Number of charged leads the account received in current specified period.
   */
  currentPeriodChargedLeads?: bigint;
  /**
   * Number of connected phone calls (duration over 30s) in current specified
   * period.
   */
  currentPeriodConnectedPhoneCalls?: bigint;
  /**
   * Number of phone calls in current specified period, including both
   * connected and unconnected calls.
   */
  currentPeriodPhoneCalls?: bigint;
  /**
   * Total cost of the account in current specified period in the account's
   * specified currency.
   */
  currentPeriodTotalCost?: number;
  /**
   * Number of impressions that customers have had in the past 2 days.
   */
  impressionsLastTwoDays?: bigint;
  /**
   * Phone lead responsiveness of the account for the past 90 days from current
   * date. This is computed by taking the total number of connected calls from
   * charged phone leads and dividing by the total number of calls received.
   */
  phoneLeadResponsiveness?: number;
  /**
   * Number of charged leads the account received in previous specified period.
   */
  previousPeriodChargedLeads?: bigint;
  /**
   * Number of connected phone calls (duration over 30s) in previous specified
   * period.
   */
  previousPeriodConnectedPhoneCalls?: bigint;
  /**
   * Number of phone calls in previous specified period, including both
   * connected and unconnected calls.
   */
  previousPeriodPhoneCalls?: bigint;
  /**
   * Total cost of the account in previous specified period in the account's
   * specified currency.
   */
  previousPeriodTotalCost?: number;
  /**
   * Total number of reviews the account has up to current date.
   */
  totalReview?: number;
}

function serializeGoogleAdsHomeservicesLocalservicesV1AccountReport(data: any): GoogleAdsHomeservicesLocalservicesV1AccountReport {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    currentPeriodChargedLeads: data["currentPeriodChargedLeads"] !== undefined ? String(data["currentPeriodChargedLeads"]) : undefined,
    currentPeriodConnectedPhoneCalls: data["currentPeriodConnectedPhoneCalls"] !== undefined ? String(data["currentPeriodConnectedPhoneCalls"]) : undefined,
    currentPeriodPhoneCalls: data["currentPeriodPhoneCalls"] !== undefined ? String(data["currentPeriodPhoneCalls"]) : undefined,
    impressionsLastTwoDays: data["impressionsLastTwoDays"] !== undefined ? String(data["impressionsLastTwoDays"]) : undefined,
    previousPeriodChargedLeads: data["previousPeriodChargedLeads"] !== undefined ? String(data["previousPeriodChargedLeads"]) : undefined,
    previousPeriodConnectedPhoneCalls: data["previousPeriodConnectedPhoneCalls"] !== undefined ? String(data["previousPeriodConnectedPhoneCalls"]) : undefined,
    previousPeriodPhoneCalls: data["previousPeriodPhoneCalls"] !== undefined ? String(data["previousPeriodPhoneCalls"]) : undefined,
  };
}

function deserializeGoogleAdsHomeservicesLocalservicesV1AccountReport(data: any): GoogleAdsHomeservicesLocalservicesV1AccountReport {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    currentPeriodChargedLeads: data["currentPeriodChargedLeads"] !== undefined ? BigInt(data["currentPeriodChargedLeads"]) : undefined,
    currentPeriodConnectedPhoneCalls: data["currentPeriodConnectedPhoneCalls"] !== undefined ? BigInt(data["currentPeriodConnectedPhoneCalls"]) : undefined,
    currentPeriodPhoneCalls: data["currentPeriodPhoneCalls"] !== undefined ? BigInt(data["currentPeriodPhoneCalls"]) : undefined,
    impressionsLastTwoDays: data["impressionsLastTwoDays"] !== undefined ? BigInt(data["impressionsLastTwoDays"]) : undefined,
    previousPeriodChargedLeads: data["previousPeriodChargedLeads"] !== undefined ? BigInt(data["previousPeriodChargedLeads"]) : undefined,
    previousPeriodConnectedPhoneCalls: data["previousPeriodConnectedPhoneCalls"] !== undefined ? BigInt(data["previousPeriodConnectedPhoneCalls"]) : undefined,
    previousPeriodPhoneCalls: data["previousPeriodPhoneCalls"] !== undefined ? BigInt(data["previousPeriodPhoneCalls"]) : undefined,
  };
}

/**
 * Conatiner for aggregator specific information if lead is for an aggregator
 * GLS account.
 */
export interface GoogleAdsHomeservicesLocalservicesV1AggregatorInfo {
  /**
   * Provider id (listed in aggregator system) which maps to a account id in
   * GLS system.
   */
  aggregatorProviderId?: string;
}

/**
 * Container for booking lead specific information.
 */
export interface GoogleAdsHomeservicesLocalservicesV1BookingLead {
  /**
   * Timestamp of when service is provided by advertiser.
   */
  bookingAppointmentTimestamp?: Date;
  /**
   * Consumer email associated with the booking lead.
   */
  consumerEmail?: string;
  /**
   * Consumer phone number associated with the booking lead.
   */
  consumerPhoneNumber?: string;
  /**
   * Name of the customer who created the lead.
   */
  customerName?: string;
  /**
   * The job type of the specified lead.
   */
  jobType?: string;
}

function serializeGoogleAdsHomeservicesLocalservicesV1BookingLead(data: any): GoogleAdsHomeservicesLocalservicesV1BookingLead {
  return {
    ...data,
    bookingAppointmentTimestamp: data["bookingAppointmentTimestamp"] !== undefined ? data["bookingAppointmentTimestamp"].toISOString() : undefined,
  };
}

function deserializeGoogleAdsHomeservicesLocalservicesV1BookingLead(data: any): GoogleAdsHomeservicesLocalservicesV1BookingLead {
  return {
    ...data,
    bookingAppointmentTimestamp: data["bookingAppointmentTimestamp"] !== undefined ? new Date(data["bookingAppointmentTimestamp"]) : undefined,
  };
}

/**
 * A Detailed Lead Report of a lead identified by their lead id and contains
 * consumer, account, monetization, and lead data.
 */
export interface GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport {
  /**
   * Identifies account that received the lead.
   */
  accountId?: bigint;
  /**
   * Aggregator specific information related to the lead.
   */
  aggregatorInfo?: GoogleAdsHomeservicesLocalservicesV1AggregatorInfo;
  /**
   * More information associated to only booking leads.
   */
  bookingLead?: GoogleAdsHomeservicesLocalservicesV1BookingLead;
  /**
   * Business name associated to the account.
   */
  businessName?: string;
  /**
   * Whether the lead has been charged.
   */
  chargeStatus?:  | "CHARGE_STATUS_UNSPECIFIED" | "CHARGED" | "NOT_CHARGED";
  /**
   * Currency code.
   */
  currencyCode?: string;
  /**
   * Dispute status related to the lead.
   */
  disputeStatus?: string;
  /**
   * Location of the associated account's home city.
   */
  geo?: string;
  /**
   * Lead category (e.g. hvac, plumber)
   */
  leadCategory?: string;
  /**
   * Timestamp of when the lead was created.
   */
  leadCreationTimestamp?: Date;
  /**
   * Unique identifier of a Detailed Lead Report.
   */
  leadId?: bigint;
  /**
   * Price of the lead (available only after it has been charged).
   */
  leadPrice?: number;
  /**
   * Lead type.
   */
  leadType?:  | "LEAD_TYPE_UNSPECIFIED" | "MESSAGE" | "PHONE_CALL" | "BOOKING";
  /**
   * More information associated to only message leads.
   */
  messageLead?: GoogleAdsHomeservicesLocalservicesV1MessageLead;
  /**
   * More information associated to only phone leads.
   */
  phoneLead?: GoogleAdsHomeservicesLocalservicesV1PhoneLead;
  /**
   * Timezone of the particular provider associated to a lead.
   */
  timezone?: GoogleTypeTimeZone;
}

function serializeGoogleAdsHomeservicesLocalservicesV1DetailedLeadReport(data: any): GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    bookingLead: data["bookingLead"] !== undefined ? serializeGoogleAdsHomeservicesLocalservicesV1BookingLead(data["bookingLead"]) : undefined,
    leadCreationTimestamp: data["leadCreationTimestamp"] !== undefined ? data["leadCreationTimestamp"].toISOString() : undefined,
    leadId: data["leadId"] !== undefined ? String(data["leadId"]) : undefined,
    phoneLead: data["phoneLead"] !== undefined ? serializeGoogleAdsHomeservicesLocalservicesV1PhoneLead(data["phoneLead"]) : undefined,
  };
}

function deserializeGoogleAdsHomeservicesLocalservicesV1DetailedLeadReport(data: any): GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    bookingLead: data["bookingLead"] !== undefined ? deserializeGoogleAdsHomeservicesLocalservicesV1BookingLead(data["bookingLead"]) : undefined,
    leadCreationTimestamp: data["leadCreationTimestamp"] !== undefined ? new Date(data["leadCreationTimestamp"]) : undefined,
    leadId: data["leadId"] !== undefined ? BigInt(data["leadId"]) : undefined,
    phoneLead: data["phoneLead"] !== undefined ? deserializeGoogleAdsHomeservicesLocalservicesV1PhoneLead(data["phoneLead"]) : undefined,
  };
}

/**
 * Container for message lead specific information.
 */
export interface GoogleAdsHomeservicesLocalservicesV1MessageLead {
  /**
   * Consumer phone number associated with the message lead.
   */
  consumerPhoneNumber?: string;
  /**
   * Name of the customer who created the lead.
   */
  customerName?: string;
  /**
   * The job type of the specified lead.
   */
  jobType?: string;
  /**
   * The postal code of the customer who created the lead.
   */
  postalCode?: string;
}

/**
 * Container for phone lead specific information.
 */
export interface GoogleAdsHomeservicesLocalservicesV1PhoneLead {
  /**
   * Timestamp of the phone call which resulted in a charged phone lead.
   */
  chargedCallTimestamp?: Date;
  /**
   * Duration of the charged phone call in seconds.
   */
  chargedConnectedCallDurationSeconds?: number /* Duration */;
  /**
   * Consumer phone number associated with the phone lead.
   */
  consumerPhoneNumber?: string;
}

function serializeGoogleAdsHomeservicesLocalservicesV1PhoneLead(data: any): GoogleAdsHomeservicesLocalservicesV1PhoneLead {
  return {
    ...data,
    chargedCallTimestamp: data["chargedCallTimestamp"] !== undefined ? data["chargedCallTimestamp"].toISOString() : undefined,
    chargedConnectedCallDurationSeconds: data["chargedConnectedCallDurationSeconds"] !== undefined ? data["chargedConnectedCallDurationSeconds"] : undefined,
  };
}

function deserializeGoogleAdsHomeservicesLocalservicesV1PhoneLead(data: any): GoogleAdsHomeservicesLocalservicesV1PhoneLead {
  return {
    ...data,
    chargedCallTimestamp: data["chargedCallTimestamp"] !== undefined ? new Date(data["chargedCallTimestamp"]) : undefined,
    chargedConnectedCallDurationSeconds: data["chargedConnectedCallDurationSeconds"] !== undefined ? data["chargedConnectedCallDurationSeconds"] : undefined,
  };
}

/**
 * A page of the response received from the SearchAccountReports method. A
 * paginated response where more pages are available has `next_page_token` set.
 * This token can be used in a subsequent request to retrieve the next request
 * page.
 */
export interface GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse {
  /**
   * List of account reports which maps 1:1 to a particular linked GLS account.
   */
  accountReports?: GoogleAdsHomeservicesLocalservicesV1AccountReport[];
  /**
   * Pagination token to retrieve the next page of results. When
   * `next_page_token` is not filled in, there is no next page and the list
   * returned is the last page in the result set.
   */
  nextPageToken?: string;
}

function serializeGoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse(data: any): GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse {
  return {
    ...data,
    accountReports: data["accountReports"] !== undefined ? data["accountReports"].map((item: any) => (serializeGoogleAdsHomeservicesLocalservicesV1AccountReport(item))) : undefined,
  };
}

function deserializeGoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse(data: any): GoogleAdsHomeservicesLocalservicesV1SearchAccountReportsResponse {
  return {
    ...data,
    accountReports: data["accountReports"] !== undefined ? data["accountReports"].map((item: any) => (deserializeGoogleAdsHomeservicesLocalservicesV1AccountReport(item))) : undefined,
  };
}

/**
 * A page of the response received from the SearchDetailedLeadReports method. A
 * paginated response where more pages are available has `next_page_token` set.
 * This token can be used in a subsequent request to retrieve the next request
 * page.
 */
export interface GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse {
  /**
   * List of detailed lead reports uniquely identified by external lead id.
   */
  detailedLeadReports?: GoogleAdsHomeservicesLocalservicesV1DetailedLeadReport[];
  /**
   * Pagination token to retrieve the next page of results. When
   * `next_page_token` is not filled in, there is no next page and the list
   * returned is the last page in the result set.
   */
  nextPageToken?: string;
}

function serializeGoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse(data: any): GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse {
  return {
    ...data,
    detailedLeadReports: data["detailedLeadReports"] !== undefined ? data["detailedLeadReports"].map((item: any) => (serializeGoogleAdsHomeservicesLocalservicesV1DetailedLeadReport(item))) : undefined,
  };
}

function deserializeGoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse(data: any): GoogleAdsHomeservicesLocalservicesV1SearchDetailedLeadReportsResponse {
  return {
    ...data,
    detailedLeadReports: data["detailedLeadReports"] !== undefined ? data["detailedLeadReports"].map((item: any) => (deserializeGoogleAdsHomeservicesLocalservicesV1DetailedLeadReport(item))) : undefined,
  };
}

/**
 * Represents a time zone from the [IANA Time Zone
 * Database](https://www.iana.org/time-zones).
 */
export interface GoogleTypeTimeZone {
  /**
   * IANA Time Zone Database time zone, e.g. "America/New_York".
   */
  id?: string;
  /**
   * Optional. IANA Time Zone Database version number, e.g. "2019a".
   */
  version?: string;
}