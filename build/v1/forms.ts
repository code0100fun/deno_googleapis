// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Forms API Client for Deno
 * ================================
 * 
 * Reads and writes Google Forms and responses.
 * 
 * Docs: https://developers.google.com/forms/api
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Reads and writes Google Forms and responses.
 */
export class Forms {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://forms.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Change the form with a batch of updates.
   *
   * @param formId Required. The form ID.
   */
  async formsBatchUpdate(formId: string, req: BatchUpdateFormRequest): Promise<BatchUpdateFormResponse> {
    req = serializeBatchUpdateFormRequest(req);
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchUpdateFormResponse(data);
  }

  /**
   * Create a new form using the title given in the provided form message in
   * the request. *Important:* Only the form.info.title and
   * form.info.document_title fields are copied to the new form. All other
   * fields including the form description, items and settings are disallowed.
   * To create a new form and add items, you must first call forms.create to
   * create an empty form with a title and (optional) document title, and then
   * call forms.update to add the items.
   *
   */
  async formsCreate(req: Form): Promise<Form> {
    req = serializeForm(req);
    const url = new URL(`${this.#baseUrl}v1/forms`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeForm(data);
  }

  /**
   * Get a form.
   *
   * @param formId Required. The form ID.
   */
  async formsGet(formId: string): Promise<Form> {
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeForm(data);
  }

  /**
   * Get one response from the form.
   *
   * @param formId Required. The form ID.
   * @param responseId Required. The response ID within the form.
   */
  async formsResponsesGet(formId: string, responseId: string): Promise<FormResponse> {
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }/responses/${ responseId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FormResponse;
  }

  /**
   * List a form's responses.
   *
   * @param formId Required. ID of the Form whose responses to list.
   */
  async formsResponsesList(formId: string, opts: FormsResponsesListOptions = {}): Promise<ListFormResponsesResponse> {
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }/responses`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return data as ListFormResponsesResponse;
  }

  /**
   * Create a new watch. If a watch ID is provided, it must be unused. For each
   * invoking project, the per form limit is one watch per Watch.EventType. A
   * watch expires seven days after it is created (see Watch.expire_time).
   *
   * @param formId Required. ID of the Form to watch.
   */
  async formsWatchesCreate(formId: string, req: CreateWatchRequest): Promise<Watch> {
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }/watches`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Watch;
  }

  /**
   * Delete a watch.
   *
   * @param formId Required. The ID of the Form.
   * @param watchId Required. The ID of the Watch to delete.
   */
  async formsWatchesDelete(formId: string, watchId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }/watches/${ watchId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Return a list of the watches owned by the invoking project. The maximum
   * number of watches is two: For each invoker, the limit is one for each event
   * type per form.
   *
   * @param formId Required. ID of the Form whose watches to list.
   */
  async formsWatchesList(formId: string): Promise<ListWatchesResponse> {
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }/watches`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListWatchesResponse;
  }

  /**
   * Renew an existing watch for seven days. The state of the watch after
   * renewal is `ACTIVE`, and the `expire_time` is seven days from the renewal.
   * Renewing a watch in an error state (e.g. `SUSPENDED`) succeeds if the error
   * is no longer present, but fail otherwise. After a watch has expired,
   * RenewWatch returns `NOT_FOUND`.
   *
   * @param formId Required. The ID of the Form.
   * @param watchId Required. The ID of the Watch to renew.
   */
  async formsWatchesRenew(formId: string, watchId: string, req: RenewWatchRequest): Promise<Watch> {
    const url = new URL(`${this.#baseUrl}v1/forms/${ formId }/watches/${ watchId }:renew`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Watch;
  }
}

/**
 * The submitted answer for a question.
 */
export interface Answer {
  /**
   * Output only. The answers to a file upload question.
   */
  readonly fileUploadAnswers?: FileUploadAnswers;
  /**
   * Output only. The grade for the answer if the form was a quiz.
   */
  readonly grade?: Grade;
  /**
   * Output only. The question's ID. See also Question.question_id.
   */
  readonly questionId?: string;
  /**
   * Output only. The specific answers as text.
   */
  readonly textAnswers?: TextAnswers;
}

/**
 * A batch of updates to perform on a form. All the specified updates are made
 * or none of them are.
 */
export interface BatchUpdateFormRequest {
  /**
   * Whether to return an updated version of the model in the response.
   */
  includeFormInResponse?: boolean;
  /**
   * Required. The update requests of this batch.
   */
  requests?: Request[];
  /**
   * Provides control over how write requests are executed.
   */
  writeControl?: WriteControl;
}

function serializeBatchUpdateFormRequest(data: any): BatchUpdateFormRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeRequest(item))) : undefined,
  };
}

function deserializeBatchUpdateFormRequest(data: any): BatchUpdateFormRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeRequest(item))) : undefined,
  };
}

/**
 * Response to a BatchUpdateFormRequest.
 */
export interface BatchUpdateFormResponse {
  /**
   * Based on the bool request field `include_form_in_response`, a form with
   * all applied mutations/updates is returned or not. This may be later than
   * the revision ID created by these changes.
   */
  form?: Form;
  /**
   * The reply of the updates. This maps 1:1 with the update requests, although
   * replies to some requests may be empty.
   */
  replies?: Response[];
  /**
   * The updated write control after applying the request.
   */
  writeControl?: WriteControl;
}

function serializeBatchUpdateFormResponse(data: any): BatchUpdateFormResponse {
  return {
    ...data,
    form: data["form"] !== undefined ? serializeForm(data["form"]) : undefined,
  };
}

function deserializeBatchUpdateFormResponse(data: any): BatchUpdateFormResponse {
  return {
    ...data,
    form: data["form"] !== undefined ? deserializeForm(data["form"]) : undefined,
  };
}

/**
 * A radio/checkbox/dropdown question.
 */
export interface ChoiceQuestion {
  /**
   * Required. List of options that a respondent must choose from.
   */
  options?: Option[];
  /**
   * Whether the options should be displayed in random order for different
   * instances of the quiz. This is often used to prevent cheating by
   * respondents who might be looking at another respondent's screen, or to
   * address bias in a survey that might be introduced by always putting the
   * same options first or last.
   */
  shuffle?: boolean;
  /**
   * Required. The type of choice question.
   */
  type?:  | "CHOICE_TYPE_UNSPECIFIED" | "RADIO" | "CHECKBOX" | "DROP_DOWN";
}

/**
 * A Pub/Sub topic.
 */
export interface CloudPubsubTopic {
  /**
   * Required. A fully qualified Pub/Sub topic name to publish the events to.
   * This topic must be owned by the calling project and already exist in
   * Pub/Sub.
   */
  topicName?: string;
}

/**
 * A single correct answer for a question. For multiple-valued (`CHECKBOX`)
 * questions, several `CorrectAnswer`s may be needed to represent a single
 * correct response option.
 */
export interface CorrectAnswer {
  /**
   * Required. The correct answer value. See the documentation for
   * TextAnswer.value for details on how various value types are formatted.
   */
  value?: string;
}

/**
 * The answer key for a question.
 */
export interface CorrectAnswers {
  /**
   * A list of correct answers. A quiz response can be automatically graded
   * based on these answers. For single-valued questions, a response is marked
   * correct if it matches any value in this list (in other words, multiple
   * correct answers are possible). For multiple-valued (`CHECKBOX`) questions,
   * a response is marked correct if it contains exactly the values in this
   * list.
   */
  answers?: CorrectAnswer[];
}

/**
 * Create an item in a form.
 */
export interface CreateItemRequest {
  /**
   * Required. The item to create.
   */
  item?: Item;
  /**
   * Required. Where to place the new item.
   */
  location?: Location;
}

function serializeCreateItemRequest(data: any): CreateItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? serializeItem(data["item"]) : undefined,
  };
}

function deserializeCreateItemRequest(data: any): CreateItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? deserializeItem(data["item"]) : undefined,
  };
}

/**
 * The result of creating an item.
 */
export interface CreateItemResponse {
  /**
   * The ID of the created item.
   */
  itemId?: string;
  /**
   * The ID of the question created as part of this item, for a question group
   * it lists IDs of all the questions created for this item.
   */
  questionId?: string[];
}

/**
 * Create a new watch.
 */
export interface CreateWatchRequest {
  /**
   * Required. The watch object. No ID should be set on this object; use
   * `watch_id` instead.
   */
  watch?: Watch;
  /**
   * The ID to use for the watch. If specified, the ID must not already be in
   * use. If not specified, an ID is generated. This value should be 4-63
   * characters, and valid characters are /a-z-/.
   */
  watchId?: string;
}

/**
 * A date question. Date questions default to just month + day.
 */
export interface DateQuestion {
  /**
   * Whether to include the time as part of the question.
   */
  includeTime?: boolean;
  /**
   * Whether to include the year as part of the question.
   */
  includeYear?: boolean;
}

/**
 * Delete an item in a form.
 */
export interface DeleteItemRequest {
  /**
   * Required. The location of the item to delete.
   */
  location?: Location;
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
 * Supplementary material to the feedback.
 */
export interface ExtraMaterial {
  /**
   * Text feedback.
   */
  link?: TextLink;
  /**
   * Video feedback.
   */
  video?: VideoLink;
}

/**
 * Feedback for a respondent about their response to a question.
 */
export interface Feedback {
  /**
   * Additional information provided as part of the feedback, often used to
   * point the respondent to more reading and resources.
   */
  material?: ExtraMaterial[];
  /**
   * Required. The main text of the feedback.
   */
  text?: string;
}

/**
 * Info for a single file submitted to a file upload question.
 */
export interface FileUploadAnswer {
  /**
   * Output only. The ID of the Google Drive file.
   */
  readonly fileId?: string;
  /**
   * Output only. The file name, as stored in Google Drive on upload.
   */
  readonly fileName?: string;
  /**
   * Output only. The MIME type of the file, as stored in Google Drive on
   * upload.
   */
  readonly mimeType?: string;
}

/**
 * All submitted files for a FileUpload question.
 */
export interface FileUploadAnswers {
  /**
   * Output only. All submitted files for a FileUpload question.
   */
  readonly answers?: FileUploadAnswer[];
}

/**
 * A file upload question. The API currently does not support creating file
 * upload questions.
 */
export interface FileUploadQuestion {
  /**
   * Required. The ID of the Drive folder where uploaded files are stored.
   */
  folderId?: string;
  /**
   * Maximum number of files that can be uploaded for this question in a single
   * response.
   */
  maxFiles?: number;
  /**
   * Maximum number of bytes allowed for any single file uploaded to this
   * question.
   */
  maxFileSize?: bigint;
  /**
   * File types accepted by this question.
   */
  types?:  | "FILE_TYPE_UNSPECIFIED" | "ANY" | "DOCUMENT" | "PRESENTATION" | "SPREADSHEET" | "DRAWING" | "PDF" | "IMAGE" | "VIDEO" | "AUDIO"[];
}

function serializeFileUploadQuestion(data: any): FileUploadQuestion {
  return {
    ...data,
    maxFileSize: data["maxFileSize"] !== undefined ? String(data["maxFileSize"]) : undefined,
  };
}

function deserializeFileUploadQuestion(data: any): FileUploadQuestion {
  return {
    ...data,
    maxFileSize: data["maxFileSize"] !== undefined ? BigInt(data["maxFileSize"]) : undefined,
  };
}

/**
 * A Google Forms document. A form is created in Drive, and deleting a form or
 * changing its access protections is done via the [Drive
 * API](https://developers.google.com/drive/api/v3/about-sdk).
 */
export interface Form {
  /**
   * Output only. The form ID.
   */
  readonly formId?: string;
  /**
   * Required. The title and description of the form.
   */
  info?: Info;
  /**
   * Required. A list of the form's items, which can include section headers,
   * questions, embedded media, etc.
   */
  items?: Item[];
  /**
   * Output only. The ID of the linked Google Sheet which is accumulating
   * responses from this Form (if such a Sheet exists).
   */
  readonly linkedSheetId?: string;
  /**
   * Output only. The form URI to share with responders. This opens a page that
   * allows the user to submit responses but not edit the questions.
   */
  readonly responderUri?: string;
  /**
   * Output only. The revision ID of the form. Used in the WriteControl in
   * update requests to identify the revision on which the changes are based.
   * The format of the revision ID may change over time, so it should be treated
   * opaquely. A returned revision ID is only guaranteed to be valid for 24
   * hours after it has been returned and cannot be shared across users. If the
   * revision ID is unchanged between calls, then the form has not changed.
   * Conversely, a changed ID (for the same form and user) usually means the
   * form has been updated; however, a changed ID can also be due to internal
   * factors such as ID format changes.
   */
  readonly revisionId?: string;
  /**
   * The form's settings. This must be updated with UpdateSettingsRequest; it
   * is ignored during `forms.create` and UpdateFormInfoRequest.
   */
  settings?: FormSettings;
}

function serializeForm(data: any): Form {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeItem(item))) : undefined,
  };
}

function deserializeForm(data: any): Form {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeItem(item))) : undefined,
  };
}

/**
 * A form response.
 */
export interface FormResponse {
  /**
   * Output only. The actual answers to the questions, keyed by question_id.
   */
  readonly answers?: {
    [key: string]: Answer
  };
  /**
   * Output only. Timestamp for the first time the response was submitted.
   */
  readonly createTime?: Date;
  /**
   * Output only. The form ID.
   */
  readonly formId?: string;
  /**
   * Output only. Timestamp for the most recent time the response was
   * submitted. Does not track changes to grades.
   */
  readonly lastSubmittedTime?: Date;
  /**
   * Output only. The email address (if collected) for the respondent.
   */
  readonly respondentEmail?: string;
  /**
   * Output only. The response ID.
   */
  readonly responseId?: string;
  /**
   * Output only. The total number of points the respondent received for their
   * submission Only set if the form was a quiz and the response was graded.
   * This includes points automatically awarded via autograding adjusted by any
   * manual corrections entered by the form owner.
   */
  readonly totalScore?: number;
}

/**
 * A form's settings.
 */
export interface FormSettings {
  /**
   * Settings related to quiz forms and grading.
   */
  quizSettings?: QuizSettings;
}

/**
 * Additional options for Forms#formsResponsesList.
 */
export interface FormsResponsesListOptions {
  /**
   * Which form responses to return. Currently, the only supported filters are:
   * * timestamp > *N* which means to get all form responses submitted after
   * (but not at) timestamp *N*. * timestamp >= *N* which means to get all form
   * responses submitted at and after timestamp *N*. For both supported filters,
   * timestamp must be formatted in RFC3339 UTC "Zulu" format. Examples:
   * "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z".
   */
  filter?: string;
  /**
   * The maximum number of responses to return. The service may return fewer
   * than this value. If unspecified or zero, at most 5000 responses are
   * returned.
   */
  pageSize?: number;
  /**
   * A page token returned by a previous list response. If this field is set,
   * the form and the values of the filter must be the same as for the original
   * request.
   */
  pageToken?: string;
}

/**
 * Grade information associated with a respondent's answer to a question.
 */
export interface Grade {
  /**
   * Output only. Whether the question was answered correctly or not. A
   * zero-point score is not enough to infer incorrectness, since a correctly
   * answered question could be worth zero points.
   */
  readonly correct?: boolean;
  /**
   * Output only. Additional feedback given for an answer.
   */
  readonly feedback?: Feedback;
  /**
   * Output only. The numeric score awarded for the answer.
   */
  readonly score?: number;
}

/**
 * Grading for a single question
 */
export interface Grading {
  /**
   * Required. The answer key for the question. Responses are automatically
   * graded based on this field.
   */
  correctAnswers?: CorrectAnswers;
  /**
   * The feedback displayed for all answers. This is commonly used for short
   * answer questions when a quiz owner wants to quickly give respondents some
   * sense of whether they answered the question correctly before they've had a
   * chance to officially grade the response. General feedback cannot be set for
   * automatically graded multiple choice questions.
   */
  generalFeedback?: Feedback;
  /**
   * Required. The maximum number of points a respondent can automatically get
   * for a correct answer. This must not be negative.
   */
  pointValue?: number;
  /**
   * The feedback displayed for correct responses. This feedback can only be
   * set for multiple choice questions that have correct answers provided.
   */
  whenRight?: Feedback;
  /**
   * The feedback displayed for incorrect responses. This feedback can only be
   * set for multiple choice questions that have correct answers provided.
   */
  whenWrong?: Feedback;
}

/**
 * A grid of choices (radio or check boxes) with each row constituting a
 * separate question. Each row has the same choices, which are shown as the
 * columns.
 */
export interface Grid {
  /**
   * Required. The choices shared by each question in the grid. In other words,
   * the values of the columns. Only `CHECK_BOX` and `RADIO` choices are
   * allowed.
   */
  columns?: ChoiceQuestion;
  /**
   * If `true`, the questions are randomly ordered. In other words, the rows
   * appear in a different order for every respondent.
   */
  shuffleQuestions?: boolean;
}

/**
 * Data representing an image.
 */
export interface Image {
  /**
   * A description of the image that is shown on hover and read by
   * screenreaders.
   */
  altText?: string;
  /**
   * Output only. A URI from which you can download the image; this is valid
   * only for a limited time.
   */
  readonly contentUri?: string;
  /**
   * Properties of an image.
   */
  properties?: MediaProperties;
  /**
   * Input only. The source URI is the URI used to insert the image. The source
   * URI can be empty when fetched.
   */
  sourceUri?: string;
}

/**
 * An item containing an image.
 */
export interface ImageItem {
  /**
   * Required. The image displayed in the item.
   */
  image?: Image;
}

/**
 * The general information for a form.
 */
export interface Info {
  /**
   * The description of the form.
   */
  description?: string;
  /**
   * Output only. The title of the document which is visible in Drive. If
   * `Info.title` is empty, `document_title` may appear in its place in the
   * Google Forms UI and be visible to responders. `document_title` can be set
   * on create, but cannot be modified by a batchUpdate request. Please use the
   * [Google Drive
   * API](https://developers.google.com/drive/api/v3/reference/files/update) if
   * you need to programmatically update `document_title`.
   */
  readonly documentTitle?: string;
  /**
   * Required. The title of the form which is visible to responders.
   */
  title?: string;
}

/**
 * A single item of the form. `kind` defines which kind of item it is.
 */
export interface Item {
  /**
   * The description of the item.
   */
  description?: string;
  /**
   * Displays an image on the page.
   */
  imageItem?: ImageItem;
  /**
   * The item ID. On creation, it can be provided but the ID must not be
   * already used in the form. If not provided, a new ID is assigned.
   */
  itemId?: string;
  /**
   * Starts a new page with a title.
   */
  pageBreakItem?: PageBreakItem;
  /**
   * Poses one or more questions to the user with a single major prompt.
   */
  questionGroupItem?: QuestionGroupItem;
  /**
   * Poses a question to the user.
   */
  questionItem?: QuestionItem;
  /**
   * Displays a title and description on the page.
   */
  textItem?: TextItem;
  /**
   * The title of the item.
   */
  title?: string;
  /**
   * Displays a video on the page.
   */
  videoItem?: VideoItem;
}

function serializeItem(data: any): Item {
  return {
    ...data,
    questionGroupItem: data["questionGroupItem"] !== undefined ? serializeQuestionGroupItem(data["questionGroupItem"]) : undefined,
    questionItem: data["questionItem"] !== undefined ? serializeQuestionItem(data["questionItem"]) : undefined,
  };
}

function deserializeItem(data: any): Item {
  return {
    ...data,
    questionGroupItem: data["questionGroupItem"] !== undefined ? deserializeQuestionGroupItem(data["questionGroupItem"]) : undefined,
    questionItem: data["questionItem"] !== undefined ? deserializeQuestionItem(data["questionItem"]) : undefined,
  };
}

/**
 * Response to a ListFormResponsesRequest.
 */
export interface ListFormResponsesResponse {
  /**
   * If set, there are more responses. To get the next page of responses,
   * provide this as `page_token` in a future request.
   */
  nextPageToken?: string;
  /**
   * The returned form responses. Note: The `formId` field is not returned in
   * the `FormResponse` object for list requests.
   */
  responses?: FormResponse[];
}

/**
 * The response of a ListWatchesRequest.
 */
export interface ListWatchesResponse {
  /**
   * The returned watches.
   */
  watches?: Watch[];
}

/**
 * A specific location in a form.
 */
export interface Location {
  /**
   * The index of an item in the form. This must be in the range [0..*N*),
   * where *N* is the number of items in the form.
   */
  index?: number;
}

/**
 * Properties of the media.
 */
export interface MediaProperties {
  /**
   * Position of the media.
   */
  alignment?:  | "ALIGNMENT_UNSPECIFIED" | "LEFT" | "RIGHT" | "CENTER";
  /**
   * The width of the media in pixels. When the media is displayed, it is
   * scaled to the smaller of this value or the width of the displayed form. The
   * original aspect ratio of the media is preserved. If a width is not
   * specified when the media is added to the form, it is set to the width of
   * the media source. Width must be between 0 and 740, inclusive. Setting width
   * to 0 or unspecified is only permitted when updating the media source.
   */
  width?: number;
}

/**
 * Move an item in a form.
 */
export interface MoveItemRequest {
  /**
   * Required. The new location for the item.
   */
  newLocation?: Location;
  /**
   * Required. The location of the item to move.
   */
  originalLocation?: Location;
}

/**
 * An option for a Choice question.
 */
export interface Option {
  /**
   * Section navigation type.
   */
  goToAction?:  | "GO_TO_ACTION_UNSPECIFIED" | "NEXT_SECTION" | "RESTART_FORM" | "SUBMIT_FORM";
  /**
   * Item ID of section header to go to.
   */
  goToSectionId?: string;
  /**
   * Display image as an option.
   */
  image?: Image;
  /**
   * Whether the option is "other". Currently only applies to `RADIO` and
   * `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem.
   */
  isOther?: boolean;
  /**
   * Required. The choice as presented to the user.
   */
  value?: string;
}

/**
 * A page break. The title and description of this item are shown at the top of
 * the new page.
 */
export interface PageBreakItem {
}

/**
 * Any question. The specific type of question is known by its `kind`.
 */
export interface Question {
  /**
   * A respondent can choose from a pre-defined set of options.
   */
  choiceQuestion?: ChoiceQuestion;
  /**
   * A respondent can enter a date.
   */
  dateQuestion?: DateQuestion;
  /**
   * A respondent can upload one or more files.
   */
  fileUploadQuestion?: FileUploadQuestion;
  /**
   * Grading setup for the question.
   */
  grading?: Grading;
  /**
   * Read only. The question ID. On creation, it can be provided but the ID
   * must not be already used in the form. If not provided, a new ID is
   * assigned.
   */
  questionId?: string;
  /**
   * Whether the question must be answered in order for a respondent to submit
   * their response.
   */
  required?: boolean;
  /**
   * A row of a QuestionGroupItem.
   */
  rowQuestion?: RowQuestion;
  /**
   * A respondent can choose a number from a range.
   */
  scaleQuestion?: ScaleQuestion;
  /**
   * A respondent can enter a free text response.
   */
  textQuestion?: TextQuestion;
  /**
   * A respondent can enter a time.
   */
  timeQuestion?: TimeQuestion;
}

function serializeQuestion(data: any): Question {
  return {
    ...data,
    fileUploadQuestion: data["fileUploadQuestion"] !== undefined ? serializeFileUploadQuestion(data["fileUploadQuestion"]) : undefined,
  };
}

function deserializeQuestion(data: any): Question {
  return {
    ...data,
    fileUploadQuestion: data["fileUploadQuestion"] !== undefined ? deserializeFileUploadQuestion(data["fileUploadQuestion"]) : undefined,
  };
}

/**
 * Defines a question that comprises multiple questions grouped together.
 */
export interface QuestionGroupItem {
  /**
   * The question group is a grid with rows of multiple choice questions that
   * share the same options. When `grid` is set, all questions in the group must
   * be of kind `row`.
   */
  grid?: Grid;
  /**
   * The image displayed within the question group above the specific
   * questions.
   */
  image?: Image;
  /**
   * Required. A list of questions that belong in this question group. A
   * question must only belong to one group. The `kind` of the group may affect
   * what types of questions are allowed.
   */
  questions?: Question[];
}

function serializeQuestionGroupItem(data: any): QuestionGroupItem {
  return {
    ...data,
    questions: data["questions"] !== undefined ? data["questions"].map((item: any) => (serializeQuestion(item))) : undefined,
  };
}

function deserializeQuestionGroupItem(data: any): QuestionGroupItem {
  return {
    ...data,
    questions: data["questions"] !== undefined ? data["questions"].map((item: any) => (deserializeQuestion(item))) : undefined,
  };
}

/**
 * A form item containing a single question.
 */
export interface QuestionItem {
  /**
   * The image displayed within the question.
   */
  image?: Image;
  /**
   * Required. The displayed question.
   */
  question?: Question;
}

function serializeQuestionItem(data: any): QuestionItem {
  return {
    ...data,
    question: data["question"] !== undefined ? serializeQuestion(data["question"]) : undefined,
  };
}

function deserializeQuestionItem(data: any): QuestionItem {
  return {
    ...data,
    question: data["question"] !== undefined ? deserializeQuestion(data["question"]) : undefined,
  };
}

/**
 * Settings related to quiz forms and grading. These must be updated with the
 * UpdateSettingsRequest.
 */
export interface QuizSettings {
  /**
   * Whether this form is a quiz or not. When true, responses are graded based
   * on question Grading. Upon setting to false, all question Grading is
   * deleted.
   */
  isQuiz?: boolean;
}

/**
 * Renew an existing Watch for seven days.
 */
export interface RenewWatchRequest {
}

/**
 * The kinds of update requests that can be made.
 */
export interface Request {
  /**
   * Create a new item.
   */
  createItem?: CreateItemRequest;
  /**
   * Delete an item.
   */
  deleteItem?: DeleteItemRequest;
  /**
   * Move an item to a specified location.
   */
  moveItem?: MoveItemRequest;
  /**
   * Update Form's Info.
   */
  updateFormInfo?: UpdateFormInfoRequest;
  /**
   * Update an item.
   */
  updateItem?: UpdateItemRequest;
  /**
   * Updates the Form's settings.
   */
  updateSettings?: UpdateSettingsRequest;
}

function serializeRequest(data: any): Request {
  return {
    ...data,
    createItem: data["createItem"] !== undefined ? serializeCreateItemRequest(data["createItem"]) : undefined,
    updateFormInfo: data["updateFormInfo"] !== undefined ? serializeUpdateFormInfoRequest(data["updateFormInfo"]) : undefined,
    updateItem: data["updateItem"] !== undefined ? serializeUpdateItemRequest(data["updateItem"]) : undefined,
    updateSettings: data["updateSettings"] !== undefined ? serializeUpdateSettingsRequest(data["updateSettings"]) : undefined,
  };
}

function deserializeRequest(data: any): Request {
  return {
    ...data,
    createItem: data["createItem"] !== undefined ? deserializeCreateItemRequest(data["createItem"]) : undefined,
    updateFormInfo: data["updateFormInfo"] !== undefined ? deserializeUpdateFormInfoRequest(data["updateFormInfo"]) : undefined,
    updateItem: data["updateItem"] !== undefined ? deserializeUpdateItemRequest(data["updateItem"]) : undefined,
    updateSettings: data["updateSettings"] !== undefined ? deserializeUpdateSettingsRequest(data["updateSettings"]) : undefined,
  };
}

/**
 * A single response from an update.
 */
export interface Response {
  /**
   * The result of creating an item.
   */
  createItem?: CreateItemResponse;
}

/**
 * Configuration for a question that is part of a question group.
 */
export interface RowQuestion {
  /**
   * Required. The title for the single row in the QuestionGroupItem.
   */
  title?: string;
}

/**
 * A scale question. The user has a range of numeric values to choose from.
 */
export interface ScaleQuestion {
  /**
   * Required. The highest possible value for the scale.
   */
  high?: number;
  /**
   * The label to display describing the highest point on the scale.
   */
  highLabel?: string;
  /**
   * Required. The lowest possible value for the scale.
   */
  low?: number;
  /**
   * The label to display describing the lowest point on the scale.
   */
  lowLabel?: string;
}

/**
 * An answer to a question represented as text.
 */
export interface TextAnswer {
  /**
   * Output only. The answer value. Formatting used for different kinds of
   * question: * ChoiceQuestion * `RADIO` or `DROP_DOWN`: A single string
   * corresponding to the option that was selected. * `CHECKBOX`: Multiple
   * strings corresponding to each option that was selected. * TextQuestion: The
   * text that the user entered. * ScaleQuestion: A string containing the number
   * that was selected. * DateQuestion * Without time or year: MM-DD e.g.
   * "05-19" * With year: YYYY-MM-DD e.g. "1986-05-19" * With time: MM-DD HH:MM
   * e.g. "05-19 14:51" * With year and time: YYYY-MM-DD HH:MM e.g. "1986-05-19
   * 14:51" * TimeQuestion: String with time or duration in HH:MM format e.g.
   * "14:51" * RowQuestion within QuestionGroupItem: The answer for each row of
   * a QuestionGroupItem is represented as a separate Answer. Each will contain
   * one string for `RADIO`-type choices or multiple strings for `CHECKBOX`
   * choices.
   */
  readonly value?: string;
}

/**
 * A question's answers as text.
 */
export interface TextAnswers {
  /**
   * Output only. Answers to a question. For multiple-value ChoiceQuestions,
   * each answer is a separate value.
   */
  readonly answers?: TextAnswer[];
}

/**
 * A text item.
 */
export interface TextItem {
}

/**
 * Link for text.
 */
export interface TextLink {
  /**
   * Required. Display text for the URI.
   */
  displayText?: string;
  /**
   * Required. The URI.
   */
  uri?: string;
}

/**
 * A text-based question.
 */
export interface TextQuestion {
  /**
   * Whether the question is a paragraph question or not. If not, the question
   * is a short text question.
   */
  paragraph?: boolean;
}

/**
 * A time question.
 */
export interface TimeQuestion {
  /**
   * `true` if the question is about an elapsed time. Otherwise it is about a
   * time of day.
   */
  duration?: boolean;
}

/**
 * Update Form's Info.
 */
export interface UpdateFormInfoRequest {
  /**
   * The info to update.
   */
  info?: Info;
  /**
   * Required. Only values named in this mask are changed. At least one field
   * must be specified. The root `info` is implied and should not be specified.
   * A single `"*"` can be used as short-hand for updating every field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateFormInfoRequest(data: any): UpdateFormInfoRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateFormInfoRequest(data: any): UpdateFormInfoRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Update an item in a form.
 */
export interface UpdateItemRequest {
  /**
   * Required. New values for the item. Note that item and question IDs are
   * used if they are provided (and are in the field mask). If an ID is blank
   * (and in the field mask) a new ID is generated. This means you can modify an
   * item by getting the form via forms.get, modifying your local copy of that
   * item to be how you want it, and using UpdateItemRequest to write it back,
   * with the IDs being the same (or not in the field mask).
   */
  item?: Item;
  /**
   * Required. The location identifying the item to update.
   */
  location?: Location;
  /**
   * Required. Only values named in this mask are changed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateItemRequest(data: any): UpdateItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? serializeItem(data["item"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateItemRequest(data: any): UpdateItemRequest {
  return {
    ...data,
    item: data["item"] !== undefined ? deserializeItem(data["item"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Update Form's FormSettings.
 */
export interface UpdateSettingsRequest {
  /**
   * Required. The settings to update with.
   */
  settings?: FormSettings;
  /**
   * Required. Only values named in this mask are changed. At least one field
   * must be specified. The root `settings` is implied and should not be
   * specified. A single `"*"` can be used as short-hand for updating every
   * field.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateSettingsRequest(data: any): UpdateSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateSettingsRequest(data: any): UpdateSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Data representing a video.
 */
export interface Video {
  /**
   * Properties of a video.
   */
  properties?: MediaProperties;
  /**
   * Required. A YouTube URI.
   */
  youtubeUri?: string;
}

/**
 * An item containing a video.
 */
export interface VideoItem {
  /**
   * The text displayed below the video.
   */
  caption?: string;
  /**
   * Required. The video displayed in the item.
   */
  video?: Video;
}

/**
 * Link to a video.
 */
export interface VideoLink {
  /**
   * Required. The display text for the link.
   */
  displayText?: string;
  /**
   * The URI of a YouTube video.
   */
  youtubeUri?: string;
}

/**
 * A watch for events for a form. When the designated event happens, a
 * notification will be published to the specified target. The notification's
 * attributes will include a `formId` key that has the ID of the watched form
 * and an `eventType` key that has the string of the type. Messages are sent
 * with at-least-once delivery and are only dropped in extraordinary
 * circumstances. Typically all notifications should be reliably delivered
 * within a few seconds; however, in some situations notifications may be
 * delayed. A watch expires seven days after it is created unless it is renewed
 * with watches.renew
 */
export interface Watch {
  /**
   * Output only. Timestamp of when this was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The most recent error type for an attempted delivery. To
   * begin watching the form again a call can be made to watches.renew which
   * also clears this error information.
   */
  readonly errorType?:  | "ERROR_TYPE_UNSPECIFIED" | "PROJECT_NOT_AUTHORIZED" | "NO_USER_ACCESS" | "OTHER_ERRORS";
  /**
   * Required. Which event type to watch for.
   */
  eventType?:  | "EVENT_TYPE_UNSPECIFIED" | "SCHEMA" | "RESPONSES";
  /**
   * Output only. Timestamp for when this will expire. Each watches.renew call
   * resets this to seven days in the future.
   */
  readonly expireTime?: Date;
  /**
   * Output only. The ID of this watch. See notes on
   * CreateWatchRequest.watch_id.
   */
  readonly id?: string;
  /**
   * Output only. The current state of the watch. Additional details about
   * suspended watches can be found by checking the `error_type`.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "SUSPENDED";
  /**
   * Required. Where to send the notification.
   */
  target?: WatchTarget;
}

/**
 * The target for notification delivery.
 */
export interface WatchTarget {
  /**
   * A Pub/Sub topic. To receive notifications, the topic must grant publish
   * privileges to the Forms service account
   * `serviceAccount:forms-notifications@system.gserviceaccount.com`. Only the
   * project that owns a topic may create a watch with it. Pub/Sub delivery
   * guarantees should be considered.
   */
  topic?: CloudPubsubTopic;
}

/**
 * Provides control over how write requests are executed.
 */
export interface WriteControl {
  /**
   * The revision ID of the form that the write request is applied to. If this
   * is not the latest revision of the form, the request is not processed and
   * returns a 400 bad request error.
   */
  requiredRevisionId?: string;
  /**
   * The target revision ID of the form that the write request is applied to.
   * If changes have occurred after this revision, the changes in this update
   * request are transformed against those changes. This results in a new
   * revision of the form that incorporates both the changes in the request and
   * the intervening changes, with the server resolving conflicting changes. The
   * target revision ID may only be used to write to recent versions of a form.
   * If the target revision is too far behind the latest revision, the request
   * is not processed and returns a 400 (Bad Request Error). The request may be
   * retried after reading the latest version of the form. In most cases a
   * target revision ID remains valid for several minutes after it is read, but
   * for frequently-edited forms this window may be shorter.
   */
  targetRevisionId?: string;
}