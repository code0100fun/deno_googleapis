// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Gmail Postmaster Tools API Client for Deno
 * ==========================================
 * 
 * The Postmaster Tools API is a RESTful API that provides programmatic access to email traffic metrics (like spam reports, delivery errors etc) otherwise available through the Gmail Postmaster Tools UI currently.
 * 
 * Docs: https://developers.google.com/gmail/postmaster
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Postmaster Tools API is a RESTful API that provides programmatic access
 * to email traffic metrics (like spam reports, delivery errors etc) otherwise
 * available through the Gmail Postmaster Tools UI currently.
 */
export class GmailPostmasterTools {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://gmailpostmastertools.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets a specific domain registered by the client. Returns NOT_FOUND if the
   * domain does not exist.
   *
   * @param name The resource name of the domain. It should have the form `domains/{domain_name}`, where domain_name is the fully qualified domain name.
   */
  async domainsGet(name: string): Promise<Domain> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDomain(data);
  }

  /**
   * Lists the domains that have been registered by the client. The order of
   * domains in the response is unspecified and non-deterministic. Newly created
   * domains will not necessarily be added to the end of this list.
   *
   */
  async domainsList(opts: DomainsListOptions = {}): Promise<ListDomainsResponse> {
    const url = new URL(`${this.#baseUrl}v1/domains`);
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
    return deserializeListDomainsResponse(data);
  }

  /**
   * Get traffic statistics for a domain on a specific date. Returns
   * PERMISSION_DENIED if user does not have permission to access TrafficStats
   * for the domain.
   *
   * @param name The resource name of the traffic statistics to get. E.g., domains/mymail.mydomain.com/trafficStats/20160807.
   */
  async domainsTrafficStatsGet(name: string): Promise<TrafficStats> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTrafficStats(data);
  }

  /**
   * List traffic statistics for all available days. Returns PERMISSION_DENIED
   * if user does not have permission to access TrafficStats for the domain.
   *
   * @param parent The resource name of the domain whose traffic statistics we'd like to list. It should have the form `domains/{domain_name}`, where domain_name is the fully qualified domain name.
   */
  async domainsTrafficStatsList(parent: string, opts: DomainsTrafficStatsListOptions = {}): Promise<ListTrafficStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/trafficStats`);
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
    return deserializeListTrafficStatsResponse(data);
  }
}

/**
 * Metric on a particular delivery error type.
 */
export interface DeliveryError {
  /**
   * The class of delivery error.
   */
  errorClass?:  | "DELIVERY_ERROR_CLASS_UNSPECIFIED" | "PERMANENT_ERROR" | "TEMPORARY_ERROR";
  /**
   * The ratio of messages where the error occurred vs all authenticated
   * traffic.
   */
  errorRatio?: number;
  /**
   * The type of delivery error.
   */
  errorType?:  | "DELIVERY_ERROR_TYPE_UNSPECIFIED" | "RATE_LIMIT_EXCEEDED" | "SUSPECTED_SPAM" | "CONTENT_SPAMMY" | "BAD_ATTACHMENT" | "BAD_DMARC_POLICY" | "LOW_IP_REPUTATION" | "LOW_DOMAIN_REPUTATION" | "IP_IN_RBL" | "DOMAIN_IN_RBL" | "BAD_PTR_RECORD";
}

/**
 * A registered domain resource in the Postmaster API.
 */
export interface Domain {
  /**
   * Timestamp when the user registered this domain. Assigned by the server.
   */
  createTime?: Date;
  /**
   * The resource name of the Domain. Domain names have the form
   * `domains/{domain_name}`, where domain_name is the fully qualified domain
   * name (i.e., mymail.mydomain.com).
   */
  name?: string;
  /**
   * User’s permission for this domain. Assigned by the server.
   */
  permission?:  | "PERMISSION_UNSPECIFIED" | "OWNER" | "READER" | "NONE";
}

function serializeDomain(data: any): Domain {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeDomain(data: any): Domain {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Additional options for GmailPostmasterTools#domainsList.
 */
export interface DomainsListOptions {
  /**
   * Requested page size. Server may return fewer domains than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   * This is the value of ListDomainsResponse.next_page_token returned from the
   * previous call to `ListDomains` method.
   */
  pageToken?: string;
}

/**
 * Additional options for GmailPostmasterTools#domainsTrafficStatsList.
 */
export interface DomainsTrafficStatsListOptions {
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
   * Requested page size. Server may return fewer TrafficStats than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   * This is the value of ListTrafficStatsResponse.next_page_token returned from
   * the previous call to `ListTrafficStats` method.
   */
  pageToken?: string;
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
 * [Feedback loop](https://support.google.com/mail/answer/6254652) identifier
 * information.
 */
export interface FeedbackLoop {
  /**
   * Feedback loop identifier that uniquely identifies individual campaigns.
   */
  id?: string;
  /**
   * The ratio of user marked spam messages with the identifier vs the total
   * number of inboxed messages with that identifier.
   */
  spamRatio?: number;
}

/**
 * IP Reputation information for a set of IPs in a specific reputation
 * category.
 */
export interface IpReputation {
  /**
   * Total number of unique IPs in this reputation category. This metric only
   * pertains to traffic that passed [SPF](http://www.openspf.org/) or
   * [DKIM](http://www.dkim.org/).
   */
  ipCount?: bigint;
  /**
   * The reputation category this IP reputation represents.
   */
  reputation?:  | "REPUTATION_CATEGORY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BAD";
  /**
   * A sample of IPs in this reputation category.
   */
  sampleIps?: string[];
}

function serializeIpReputation(data: any): IpReputation {
  return {
    ...data,
    ipCount: data["ipCount"] !== undefined ? String(data["ipCount"]) : undefined,
  };
}

function deserializeIpReputation(data: any): IpReputation {
  return {
    ...data,
    ipCount: data["ipCount"] !== undefined ? BigInt(data["ipCount"]) : undefined,
  };
}

/**
 * Response message for ListDomains.
 */
export interface ListDomainsResponse {
  /**
   * The list of domains.
   */
  domains?: Domain[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListDomainsResponse(data: any): ListDomainsResponse {
  return {
    ...data,
    domains: data["domains"] !== undefined ? data["domains"].map((item: any) => (serializeDomain(item))) : undefined,
  };
}

function deserializeListDomainsResponse(data: any): ListDomainsResponse {
  return {
    ...data,
    domains: data["domains"] !== undefined ? data["domains"].map((item: any) => (deserializeDomain(item))) : undefined,
  };
}

/**
 * Response message for ListTrafficStats.
 */
export interface ListTrafficStatsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of TrafficStats.
   */
  trafficStats?: TrafficStats[];
}

function serializeListTrafficStatsResponse(data: any): ListTrafficStatsResponse {
  return {
    ...data,
    trafficStats: data["trafficStats"] !== undefined ? data["trafficStats"].map((item: any) => (serializeTrafficStats(item))) : undefined,
  };
}

function deserializeListTrafficStatsResponse(data: any): ListTrafficStatsResponse {
  return {
    ...data,
    trafficStats: data["trafficStats"] !== undefined ? data["trafficStats"].map((item: any) => (deserializeTrafficStats(item))) : undefined,
  };
}

/**
 * Email traffic statistics pertaining to a specific date.
 */
export interface TrafficStats {
  /**
   * Delivery errors for the domain. This metric only pertains to traffic that
   * passed [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/).
   */
  deliveryErrors?: DeliveryError[];
  /**
   * The ratio of mail that successfully authenticated with DKIM vs. all mail
   * that attempted to authenticate with [DKIM](http://www.dkim.org/). Spoofed
   * mail is excluded.
   */
  dkimSuccessRatio?: number;
  /**
   * The ratio of mail that passed [DMARC](https://dmarc.org/) alignment checks
   * vs all mail received from the domain that successfully authenticated with
   * either of [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/).
   */
  dmarcSuccessRatio?: number;
  /**
   * Reputation of the domain.
   */
  domainReputation?:  | "REPUTATION_CATEGORY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW" | "BAD";
  /**
   * The ratio of incoming mail (to Gmail), that passed secure transport (TLS)
   * vs all mail received from that domain. This metric only pertains to traffic
   * that passed [SPF](http://www.openspf.org/) or [DKIM](http://www.dkim.org/).
   */
  inboundEncryptionRatio?: number;
  /**
   * Reputation information pertaining to the IP addresses of the email servers
   * for the domain. There is exactly one entry for each reputation category
   * except REPUTATION_CATEGORY_UNSPECIFIED.
   */
  ipReputations?: IpReputation[];
  /**
   * The resource name of the traffic statistics. Traffic statistic names have
   * the form `domains/{domain}/trafficStats/{date}`, where domain_name is the
   * fully qualified domain name (i.e., mymail.mydomain.com) of the domain this
   * traffic statistics pertains to and date is the date in yyyymmdd format that
   * these statistics corresponds to. For example:
   * domains/mymail.mydomain.com/trafficStats/20160807
   */
  name?: string;
  /**
   * The ratio of outgoing mail (from Gmail) that was accepted over secure
   * transport (TLS).
   */
  outboundEncryptionRatio?: number;
  /**
   * Spammy [Feedback loop identifiers]
   * (https://support.google.com/mail/answer/6254652) with their individual spam
   * rates. This metric only pertains to traffic that is authenticated by
   * [DKIM](http://www.dkim.org/).
   */
  spammyFeedbackLoops?: FeedbackLoop[];
  /**
   * The ratio of mail that successfully authenticated with SPF vs. all mail
   * that attempted to authenticate with [SPF](http://www.openspf.org/). Spoofed
   * mail is excluded.
   */
  spfSuccessRatio?: number;
  /**
   * The ratio of user-report spam vs. email that was sent to the inbox. This
   * metric only pertains to emails authenticated by
   * [DKIM](http://www.dkim.org/).
   */
  userReportedSpamRatio?: number;
}

function serializeTrafficStats(data: any): TrafficStats {
  return {
    ...data,
    ipReputations: data["ipReputations"] !== undefined ? data["ipReputations"].map((item: any) => (serializeIpReputation(item))) : undefined,
  };
}

function deserializeTrafficStats(data: any): TrafficStats {
  return {
    ...data,
    ipReputations: data["ipReputations"] !== undefined ? data["ipReputations"].map((item: any) => (deserializeIpReputation(item))) : undefined,
  };
}