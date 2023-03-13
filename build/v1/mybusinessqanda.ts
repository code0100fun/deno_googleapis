// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Q&A API Client for Deno
 * ===================================
 * 
 * The My Business Q&A API allows questions and answers to be posted for specific listings. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Q&A API allows questions and answers to be posted for
 * specific listings. Note - If you have a quota of 0 after enabling the API,
 * please request for GBP API access.
 */
export class MyBusinessqanda {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinessqanda.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes the answer written by the current user to a question.
   *
   * @param name Required. The name of the question to delete an answer for.
   */
  async locationsQuestionsAnswersDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/answers:delete`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the paginated list of answers for a specified question.
   *
   * @param parent Required. The name of the question to fetch answers for.
   */
  async locationsQuestionsAnswersList(parent: string, opts: LocationsQuestionsAnswersListOptions = {}): Promise<ListAnswersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/answers`);
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
    return data as ListAnswersResponse;
  }

  /**
   * Creates an answer or updates the existing answer written by the user for
   * the specified question. A user can only create one answer per question.
   *
   * @param parent Required. The name of the question to write an answer for.
   */
  async locationsQuestionsAnswersUpsert(parent: string, req: UpsertAnswerRequest): Promise<Answer> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/answers:upsert`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Answer;
  }

  /**
   * Adds a question for the specified location.
   *
   * @param parent Required. The name of the location to write a question for.
   */
  async locationsQuestionsCreate(parent: string, req: Question): Promise<Question> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Question;
  }

  /**
   * Deletes a specific question written by the current user.
   *
   * @param name Required. The name of the question to delete.
   */
  async locationsQuestionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the paginated list of questions and some of its answers for a
   * specified location. This operation is only valid if the specified location
   * is verified.
   *
   * @param parent Required. The name of the location to fetch questions for.
   */
  async locationsQuestionsList(parent: string, opts: LocationsQuestionsListOptions = {}): Promise<ListQuestionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }`);
    if (opts.answersPerQuestion !== undefined) {
      url.searchParams.append("answersPerQuestion", String(opts.answersPerQuestion));
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
    return data as ListQuestionsResponse;
  }

  /**
   * Updates a specific question written by the current user.
   *
   * @param name Immutable. The unique name for the question. locations/*\/questions/* This field will be ignored if set during question creation.
   */
  async locationsQuestionsPatch(name: string, req: Question, opts: LocationsQuestionsPatchOptions = {}): Promise<Question> {
    opts = serializeLocationsQuestionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Question;
  }
}

/**
 * Represents an answer to a question
 */
export interface Answer {
  /**
   * Output only. The author of the answer. Will only be set during list
   * operations.
   */
  readonly author?: Author;
  /**
   * Output only. The timestamp for when the answer was written. Only retrieved
   * during ListResponse fetching.
   */
  readonly createTime?: Date;
  /**
   * Output only. The unique name for the answer
   * locations/*\/questions/*\/answers/*
   */
  readonly name?: string;
  /**
   * Required. The text of the answer. It should contain at least one
   * non-whitespace character. The maximum length is 4096 characters.
   */
  text?: string;
  /**
   * Output only. The timestamp for when the answer was last modified.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The number of upvotes for the answer.
   */
  readonly upvoteCount?: number;
}

/**
 * Represents the author of a question or answer
 */
export interface Author {
  /**
   * The display name of the user
   */
  displayName?: string;
  /**
   * The profile photo URI of the user.
   */
  profilePhotoUri?: string;
  /**
   * The type of user the author is.
   */
  type?:  | "AUTHOR_TYPE_UNSPECIFIED" | "REGULAR_USER" | "LOCAL_GUIDE" | "MERCHANT";
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
 * Response message for QuestionsAndAnswers.ListAnswers
 */
export interface ListAnswersResponse {
  /**
   * The requested answers.
   */
  answers?: Answer[];
  /**
   * If the number of answers exceeds the requested max page size, this field
   * is populated with a token to fetch the next page of answers on a subsequent
   * call. If there are no more answers, this field is not present in the
   * response.
   */
  nextPageToken?: string;
  /**
   * The total number of answers posted for this question across all pages.
   */
  totalSize?: number;
}

/**
 * Response message for QuestionsAndAnswers.ListQuestions
 */
export interface ListQuestionsResponse {
  /**
   * If the number of questions exceeds the requested max page size, this field
   * is populated with a token to fetch the next page of questions on a
   * subsequent call. If there are no more questions, this field is not present
   * in the response.
   */
  nextPageToken?: string;
  /**
   * The requested questions,
   */
  questions?: Question[];
  /**
   * The total number of questions posted for this location across all pages.
   */
  totalSize?: number;
}

/**
 * Additional options for MyBusinessqanda#locationsQuestionsAnswersList.
 */
export interface LocationsQuestionsAnswersListOptions {
  /**
   * Optional. The order to return the answers. Valid options include
   * 'update_time desc' and 'upvote_count desc', which will return the answers
   * sorted descendingly by the requested field. The default sort order is
   * 'update_time desc'.
   */
  orderBy?: string;
  /**
   * Optional. How many answers to fetch per page. The default and maximum
   * `page_size` values are 10.
   */
  pageSize?: number;
  /**
   * Optional. If specified, the next page of answers is retrieved.
   */
  pageToken?: string;
}

/**
 * Additional options for MyBusinessqanda#locationsQuestionsList.
 */
export interface LocationsQuestionsListOptions {
  /**
   * Optional. How many answers to fetch per question. The default and maximum
   * `answers_per_question` values are 10.
   */
  answersPerQuestion?: number;
  /**
   * Optional. A filter constraining the questions to return. The only filter
   * currently supported is "ignore_answered=true"
   */
  filter?: string;
  /**
   * Optional. The order to return the questions. Valid options include
   * 'update_time desc' and 'upvote_count desc', which will return the questions
   * sorted descendingly by the requested field. The default sort order is
   * 'update_time desc'.
   */
  orderBy?: string;
  /**
   * Optional. How many questions to fetch per page. The default and maximum
   * `page_size` values are 10.
   */
  pageSize?: number;
  /**
   * Optional. If specified, the next page of questions is retrieved.
   */
  pageToken?: string;
}

/**
 * Additional options for MyBusinessqanda#locationsQuestionsPatch.
 */
export interface LocationsQuestionsPatchOptions {
  /**
   * Required. The specific fields to update. Only question text can be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsQuestionsPatchOptions(data: any): LocationsQuestionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsQuestionsPatchOptions(data: any): LocationsQuestionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Represents a single question and some of its answers.
 */
export interface Question {
  /**
   * Output only. The author of the question.
   */
  readonly author?: Author;
  /**
   * Output only. The timestamp for when the question was written.
   */
  readonly createTime?: Date;
  /**
   * Immutable. The unique name for the question. locations/*\/questions/* This
   * field will be ignored if set during question creation.
   */
  name?: string;
  /**
   * Required. The text of the question. It should contain at least three words
   * and the total length should be greater than or equal to 10 characters. The
   * maximum length is 4096 characters.
   */
  text?: string;
  /**
   * Output only. A list of answers to the question, sorted by upvotes. This
   * may not be a complete list of answers depending on the request parameters
   * (answers_per_question)
   */
  readonly topAnswers?: Answer[];
  /**
   * Output only. The total number of answers posted for this question.
   */
  readonly totalAnswerCount?: number;
  /**
   * Output only. The timestamp for when the question was last modified.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The number of upvotes for the question.
   */
  readonly upvoteCount?: number;
}

/**
 * Request message for QuestionsAndAnswers.UpsertAnswer
 */
export interface UpsertAnswerRequest {
  /**
   * Required. The new answer.
   */
  answer?: Answer;
}