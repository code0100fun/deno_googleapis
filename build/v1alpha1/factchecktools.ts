// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Fact Check Tools API Client for Deno
 * ====================================
 * 
 * 
 * 
 * Docs: https://developers.google.com/fact-check/tools/api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class FactCheckTools {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://factchecktools.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Search through fact-checked claims.
   *
   */
  async claimsSearch(opts: ClaimsSearchOptions = {}): Promise<GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/claims:search`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.maxAgeDays !== undefined) {
      url.searchParams.append("maxAgeDays", String(opts.maxAgeDays));
    }
    if (opts.offset !== undefined) {
      url.searchParams.append("offset", String(opts.offset));
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
    if (opts.reviewPublisherSiteFilter !== undefined) {
      url.searchParams.append("reviewPublisherSiteFilter", String(opts.reviewPublisherSiteFilter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse(data);
  }

  /**
   * Create `ClaimReview` markup on a page.
   *
   */
  async pagesCreate(req: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage): Promise<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage> {
    const url = new URL(`${this.#baseUrl}v1alpha1/pages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
  }

  /**
   * Delete all `ClaimReview` markup on a page.
   *
   * @param name The name of the resource to delete, in the form of `pages/{page_id}`.
   */
  async pagesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Get all `ClaimReview` markup on a page.
   *
   * @param name The name of the resource to get, in the form of `pages/{page_id}`.
   */
  async pagesGet(name: string): Promise<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
  }

  /**
   * List the `ClaimReview` markup pages for a specific URL or for an
   * organization.
   *
   */
  async pagesList(opts: PagesListOptions = {}): Promise<GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/pages`);
    if (opts.offset !== undefined) {
      url.searchParams.append("offset", String(opts.offset));
    }
    if (opts.organization !== undefined) {
      url.searchParams.append("organization", String(opts.organization));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.url !== undefined) {
      url.searchParams.append("url", String(opts.url));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse;
  }

  /**
   * Update for all `ClaimReview` markup on a page Note that this is a full
   * update. To retain the existing `ClaimReview` markup on a page, first
   * perform a Get operation, then modify the returned markup, and finally call
   * Update with the entire `ClaimReview` markup as the body.
   *
   * @param name The name of this `ClaimReview` markup page resource, in the form of `pages/{page_id}`. Except for update requests, this field is output-only and should not be set by the user.
   */
  async pagesUpdate(name: string, req: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage): Promise<GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage;
  }
}

/**
 * Additional options for FactCheckTools#claimsSearch.
 */
export interface ClaimsSearchOptions {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". Can be used to
   * restrict results by language, though we do not currently consider the
   * region.
   */
  languageCode?: string;
  /**
   * The maximum age of the returned search results, in days. Age is determined
   * by either claim date or review date, whichever is newer.
   */
  maxAgeDays?: number;
  /**
   * An integer that specifies the current offset (that is, starting result
   * location) in search results. This field is only considered if `page_token`
   * is unset. For example, 0 means to return results starting from the first
   * matching result, and 10 means to return from the 11th result.
   */
  offset?: number;
  /**
   * The pagination size. We will return up to that many results. Defaults to
   * 10 if not set.
   */
  pageSize?: number;
  /**
   * The pagination token. You may provide the `next_page_token` returned from
   * a previous List request, if any, in order to get the next page. All other
   * fields must have the same values as in the previous request.
   */
  pageToken?: string;
  /**
   * Textual query string. Required unless `review_publisher_site_filter` is
   * specified.
   */
  query?: string;
  /**
   * The review publisher site to filter results by, e.g. nytimes.com.
   */
  reviewPublisherSiteFilter?: string;
}

/**
 * Information about the claim.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1Claim {
  /**
   * A person or organization stating the claim. For instance, "John Doe".
   */
  claimant?: string;
  /**
   * The date that the claim was made.
   */
  claimDate?: Date;
  /**
   * One or more reviews of this claim (namely, a fact-checking article).
   */
  claimReview?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview[];
  /**
   * The claim text. For instance, "Crime has doubled in the last 2 years."
   */
  text?: string;
}

function serializeGoogleFactcheckingFactchecktoolsV1alpha1Claim(data: any): GoogleFactcheckingFactchecktoolsV1alpha1Claim {
  return {
    ...data,
    claimDate: data["claimDate"] !== undefined ? data["claimDate"].toISOString() : undefined,
    claimReview: data["claimReview"] !== undefined ? data["claimReview"].map((item: any) => (serializeGoogleFactcheckingFactchecktoolsV1alpha1ClaimReview(item))) : undefined,
  };
}

function deserializeGoogleFactcheckingFactchecktoolsV1alpha1Claim(data: any): GoogleFactcheckingFactchecktoolsV1alpha1Claim {
  return {
    ...data,
    claimDate: data["claimDate"] !== undefined ? new Date(data["claimDate"]) : undefined,
    claimReview: data["claimReview"] !== undefined ? data["claimReview"].map((item: any) => (deserializeGoogleFactcheckingFactchecktoolsV1alpha1ClaimReview(item))) : undefined,
  };
}

/**
 * Information about the claim author.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor {
  /**
   * Corresponds to `ClaimReview.itemReviewed.author.image`.
   */
  imageUrl?: string;
  /**
   * Corresponds to `ClaimReview.itemReviewed.author.jobTitle`.
   */
  jobTitle?: string;
  /**
   * A person or organization stating the claim. For instance, "John Doe".
   * Corresponds to `ClaimReview.itemReviewed.author.name`.
   */
  name?: string;
  /**
   * Corresponds to `ClaimReview.itemReviewed.author.sameAs`.
   */
  sameAs?: string;
}

/**
 * Information about the claim rating.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating {
  /**
   * For numeric ratings, the best value possible in the scale from worst to
   * best. Corresponds to `ClaimReview.reviewRating.bestRating`.
   */
  bestRating?: number;
  /**
   * Corresponds to `ClaimReview.reviewRating.image`.
   */
  imageUrl?: string;
  /**
   * Corresponds to `ClaimReview.reviewRating.ratingExplanation`.
   */
  ratingExplanation?: string;
  /**
   * A numeric rating of this claim, in the range worstRating — bestRating
   * inclusive. Corresponds to `ClaimReview.reviewRating.ratingValue`.
   */
  ratingValue?: number;
  /**
   * The truthfulness rating as a human-readible short word or phrase.
   * Corresponds to `ClaimReview.reviewRating.alternateName`.
   */
  textualRating?: string;
  /**
   * For numeric ratings, the worst value possible in the scale from worst to
   * best. Corresponds to `ClaimReview.reviewRating.worstRating`.
   */
  worstRating?: number;
}

/**
 * Information about a claim review.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview {
  /**
   * The language this review was written in. For instance, "en" or "de".
   */
  languageCode?: string;
  /**
   * The publisher of this claim review.
   */
  publisher?: GoogleFactcheckingFactchecktoolsV1alpha1Publisher;
  /**
   * The date the claim was reviewed.
   */
  reviewDate?: Date;
  /**
   * Textual rating. For instance, "Mostly false".
   */
  textualRating?: string;
  /**
   * The title of this claim review, if it can be determined.
   */
  title?: string;
  /**
   * The URL of this claim review.
   */
  url?: string;
}

function serializeGoogleFactcheckingFactchecktoolsV1alpha1ClaimReview(data: any): GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview {
  return {
    ...data,
    reviewDate: data["reviewDate"] !== undefined ? data["reviewDate"].toISOString() : undefined,
  };
}

function deserializeGoogleFactcheckingFactchecktoolsV1alpha1ClaimReview(data: any): GoogleFactcheckingFactchecktoolsV1alpha1ClaimReview {
  return {
    ...data,
    reviewDate: data["reviewDate"] !== undefined ? new Date(data["reviewDate"]) : undefined,
  };
}

/**
 * Information about the claim review author.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor {
  /**
   * Corresponds to `ClaimReview.author.image`.
   */
  imageUrl?: string;
  /**
   * Name of the organization that is publishing the fact check. Corresponds to
   * `ClaimReview.author.name`.
   */
  name?: string;
}

/**
 * Fields for an individual `ClaimReview` element. Except for sub-messages that
 * group fields together, each of these fields correspond those in
 * https://schema.org/ClaimReview. We list the precise mapping for each field.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup {
  /**
   * A list of links to works in which this claim appears, aside from the one
   * specified in `claim_first_appearance`. Corresponds to
   * `ClaimReview.itemReviewed[@type=Claim].appearance.url`.
   */
  claimAppearances?: string[];
  /**
   * Info about the author of this claim.
   */
  claimAuthor?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimAuthor;
  /**
   * The date when the claim was made or entered public discourse. Corresponds
   * to `ClaimReview.itemReviewed.datePublished`.
   */
  claimDate?: string;
  /**
   * A link to a work in which this claim first appears. Corresponds to
   * `ClaimReview.itemReviewed[@type=Claim].firstAppearance.url`.
   */
  claimFirstAppearance?: string;
  /**
   * The location where this claim was made. Corresponds to
   * `ClaimReview.itemReviewed.name`.
   */
  claimLocation?: string;
  /**
   * A short summary of the claim being evaluated. Corresponds to
   * `ClaimReview.claimReviewed`.
   */
  claimReviewed?: string;
  /**
   * Info about the rating of this claim review.
   */
  rating?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimRating;
  /**
   * This field is optional, and will default to the page URL. We provide this
   * field to allow you the override the default value, but the only permitted
   * override is the page URL plus an optional anchor link ("page jump").
   * Corresponds to `ClaimReview.url`
   */
  url?: string;
}

/**
 * Holds one or more instances of `ClaimReview` markup for a webpage.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage {
  /**
   * Info about the author of this claim review. Similar to the above,
   * semantically these are page-level fields, and each `ClaimReview` on this
   * page will contain the same values.
   */
  claimReviewAuthor?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewAuthor;
  /**
   * A list of individual claim reviews for this page. Each item in the list
   * corresponds to one `ClaimReview` element.
   */
  claimReviewMarkups?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkup[];
  /**
   * The name of this `ClaimReview` markup page resource, in the form of
   * `pages/{page_id}`. Except for update requests, this field is output-only
   * and should not be set by the user.
   */
  name?: string;
  /**
   * The URL of the page associated with this `ClaimReview` markup. While every
   * individual `ClaimReview` has its own URL field, semantically this is a
   * page-level field, and each `ClaimReview` on this page will use this value
   * unless individually overridden. Corresponds to `ClaimReview.url`
   */
  pageUrl?: string;
  /**
   * The date when the fact check was published. Similar to the URL,
   * semantically this is a page-level field, and each `ClaimReview` on this
   * page will contain the same value. Corresponds to
   * `ClaimReview.datePublished`
   */
  publishDate?: string;
  /**
   * The version ID for this markup. Except for update requests, this field is
   * output-only and should not be set by the user.
   */
  versionId?: string;
}

/**
 * Response from searching fact-checked claims.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse {
  /**
   * The list of claims and all of their associated information.
   */
  claims?: GoogleFactcheckingFactchecktoolsV1alpha1Claim[];
  /**
   * The next pagination token in the Search response. It should be used as the
   * `page_token` for the following request. An empty value means no more
   * results.
   */
  nextPageToken?: string;
}

function serializeGoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse(data: any): GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse {
  return {
    ...data,
    claims: data["claims"] !== undefined ? data["claims"].map((item: any) => (serializeGoogleFactcheckingFactchecktoolsV1alpha1Claim(item))) : undefined,
  };
}

function deserializeGoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse(data: any): GoogleFactcheckingFactchecktoolsV1alpha1FactCheckedClaimSearchResponse {
  return {
    ...data,
    claims: data["claims"] !== undefined ? data["claims"].map((item: any) => (deserializeGoogleFactcheckingFactchecktoolsV1alpha1Claim(item))) : undefined,
  };
}

/**
 * Response from listing `ClaimReview` markup.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1ListClaimReviewMarkupPagesResponse {
  /**
   * The result list of pages of `ClaimReview` markup.
   */
  claimReviewMarkupPages?: GoogleFactcheckingFactchecktoolsV1alpha1ClaimReviewMarkupPage[];
  /**
   * The next pagination token in the Search response. It should be used as the
   * `page_token` for the following request. An empty value means no more
   * results.
   */
  nextPageToken?: string;
}

/**
 * Information about the publisher.
 */
export interface GoogleFactcheckingFactchecktoolsV1alpha1Publisher {
  /**
   * The name of this publisher. For instance, "Awesome Fact Checks".
   */
  name?: string;
  /**
   * Host-level site name, without the protocol or "www" prefix. For instance,
   * "awesomefactchecks.com". This value of this field is based purely on the
   * claim review URL.
   */
  site?: string;
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
}

/**
 * Additional options for FactCheckTools#pagesList.
 */
export interface PagesListOptions {
  /**
   * An integer that specifies the current offset (that is, starting result
   * location) in search results. This field is only considered if `page_token`
   * is unset, and if the request is not for a specific URL. For example, 0
   * means to return results starting from the first matching result, and 10
   * means to return from the 11th result.
   */
  offset?: number;
  /**
   * The organization for which we want to fetch markups for. For instance,
   * "site.com". Cannot be specified along with an URL.
   */
  organization?: string;
  /**
   * The pagination size. We will return up to that many results. Defaults to
   * 10 if not set. Has no effect if a URL is requested.
   */
  pageSize?: number;
  /**
   * The pagination token. You may provide the `next_page_token` returned from
   * a previous List request, if any, in order to get the next page. All other
   * fields must have the same values as in the previous request.
   */
  pageToken?: string;
  /**
   * The URL from which to get `ClaimReview` markup. There will be at most one
   * result. If markup is associated with a more canonical version of the URL
   * provided, we will return that URL instead. Cannot be specified along with
   * an organization.
   */
  url?: string;
}