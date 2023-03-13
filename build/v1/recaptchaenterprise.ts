// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * reCAPTCHA Enterprise API Client for Deno
 * ========================================
 * 
 * Help protect your website from fraudulent activity, spam, and abuse without creating friction.
 * 
 * Docs: https://cloud.google.com/recaptcha-enterprise/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Help protect your website from fraudulent activity, spam, and abuse without
 * creating friction.
 */
export class reCAPTCHAEnterprise {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://recaptchaenterprise.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Annotates a previously created Assessment to provide additional
   * information on whether the event turned out to be authentic or fraudulent.
   *
   * @param name Required. The resource name of the Assessment, in the format "projects/{project}/assessments/{assessment}".
   */
  async projectsAssessmentsAnnotate(name: string, req: GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest): Promise<GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse> {
    req = serializeGoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse;
  }

  /**
   * Creates an Assessment of the likelihood an event is legitimate.
   *
   * @param parent Required. The name of the project in which the assessment will be created, in the format "projects/{project}".
   */
  async projectsAssessmentsCreate(parent: string, req: GoogleCloudRecaptchaenterpriseV1Assessment): Promise<GoogleCloudRecaptchaenterpriseV1Assessment> {
    req = serializeGoogleCloudRecaptchaenterpriseV1Assessment(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assessments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecaptchaenterpriseV1Assessment(data);
  }

  /**
   * Creates a new reCAPTCHA Enterprise key.
   *
   * @param parent Required. The name of the project in which the key will be created, in the format "projects/{project}".
   */
  async projectsKeysCreate(parent: string, req: GoogleCloudRecaptchaenterpriseV1Key): Promise<GoogleCloudRecaptchaenterpriseV1Key> {
    req = serializeGoogleCloudRecaptchaenterpriseV1Key(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keys`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecaptchaenterpriseV1Key(data);
  }

  /**
   * Deletes the specified key.
   *
   * @param name Required. The name of the key to be deleted, in the format "projects/{project}/keys/{key}".
   */
  async projectsKeysDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Returns the specified key.
   *
   * @param name Required. The name of the requested key, in the format "projects/{project}/keys/{key}".
   */
  async projectsKeysGet(name: string): Promise<GoogleCloudRecaptchaenterpriseV1Key> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecaptchaenterpriseV1Key(data);
  }

  /**
   * Get some aggregated metrics for a Key. This data can be used to build
   * dashboards.
   *
   * @param name Required. The name of the requested metrics, in the format "projects/{project}/keys/{key}/metrics".
   */
  async projectsKeysGetMetrics(name: string): Promise<GoogleCloudRecaptchaenterpriseV1Metrics> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecaptchaenterpriseV1Metrics(data);
  }

  /**
   * Returns the list of all keys that belong to a project.
   *
   * @param parent Required. The name of the project that contains the keys that will be listed, in the format "projects/{project}".
   */
  async projectsKeysList(parent: string, opts: ProjectsKeysListOptions = {}): Promise<GoogleCloudRecaptchaenterpriseV1ListKeysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keys`);
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
    return deserializeGoogleCloudRecaptchaenterpriseV1ListKeysResponse(data);
  }

  /**
   * Migrates an existing key from reCAPTCHA to reCAPTCHA Enterprise. Once a
   * key is migrated, it can be used from either product. SiteVerify requests
   * are billed as CreateAssessment calls. You must be authenticated as one of
   * the current owners of the reCAPTCHA Site Key, and your user must have the
   * reCAPTCHA Enterprise Admin IAM role in the destination project.
   *
   * @param name Required. The name of the key to be migrated, in the format "projects/{project}/keys/{key}".
   */
  async projectsKeysMigrate(name: string, req: GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest): Promise<GoogleCloudRecaptchaenterpriseV1Key> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:migrate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecaptchaenterpriseV1Key(data);
  }

  /**
   * Updates the specified key.
   *
   * @param name The resource name for the Key in the format "projects/{project}/keys/{key}".
   */
  async projectsKeysPatch(name: string, req: GoogleCloudRecaptchaenterpriseV1Key, opts: ProjectsKeysPatchOptions = {}): Promise<GoogleCloudRecaptchaenterpriseV1Key> {
    req = serializeGoogleCloudRecaptchaenterpriseV1Key(req);
    opts = serializeProjectsKeysPatchOptions(opts);
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
    return deserializeGoogleCloudRecaptchaenterpriseV1Key(data);
  }

  /**
   * Returns the secret key related to the specified public key. You must use
   * the legacy secret key only in a 3rd party integration with legacy
   * reCAPTCHA.
   *
   * @param key Required. The public key name linked to the requested secret key in the format "projects/{project}/keys/{key}".
   */
  async projectsKeysRetrieveLegacySecretKey(key: string): Promise<GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ key }:retrieveLegacySecretKey`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse;
  }

  /**
   * Search group memberships related to a given account.
   *
   * @param project Required. The name of the project to search related account group memberships from. Specify the project name in the following format: "projects/{project}".
   */
  async projectsRelatedaccountgroupmembershipsSearch(project: string, req: GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest): Promise<GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse> {
    req = serializeGoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ project }/relatedaccountgroupmemberships:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse(data);
  }

  /**
   * List groups of related accounts.
   *
   * @param parent Required. The name of the project to list related account groups from, in the format "projects/{project}".
   */
  async projectsRelatedaccountgroupsList(parent: string, opts: ProjectsRelatedaccountgroupsListOptions = {}): Promise<GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/relatedaccountgroups`);
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
    return data as GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse;
  }

  /**
   * Get memberships in a group of related accounts.
   *
   * @param parent Required. The resource name for the related account group in the format `projects/{project}/relatedaccountgroups/{relatedaccountgroup}`.
   */
  async projectsRelatedaccountgroupsMembershipsList(parent: string, opts: ProjectsRelatedaccountgroupsMembershipsListOptions = {}): Promise<GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships`);
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
    return deserializeGoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse(data);
  }
}

/**
 * Account defender risk assessment.
 */
export interface GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment {
  /**
   * Labels for this request.
   */
  labels?:  | "ACCOUNT_DEFENDER_LABEL_UNSPECIFIED" | "PROFILE_MATCH" | "SUSPICIOUS_LOGIN_ACTIVITY" | "SUSPICIOUS_ACCOUNT_CREATION" | "RELATED_ACCOUNTS_NUMBER_HIGH"[];
}

/**
 * Information about account verification, used for identity verification.
 */
export interface GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo {
  /**
   * Endpoints that can be used for identity verification.
   */
  endpoints?: GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo[];
  /**
   * Language code preference for the verification message, set as a IETF BCP
   * 47 language code.
   */
  languageCode?: string;
  /**
   * Output only. Result of the latest account verification challenge.
   */
  readonly latestVerificationResult?:  | "RESULT_UNSPECIFIED" | "SUCCESS_USER_VERIFIED" | "ERROR_USER_NOT_VERIFIED" | "ERROR_SITE_ONBOARDING_INCOMPLETE" | "ERROR_RECIPIENT_NOT_ALLOWED" | "ERROR_RECIPIENT_ABUSE_LIMIT_EXHAUSTED" | "ERROR_CRITICAL_INTERNAL" | "ERROR_CUSTOMER_QUOTA_EXHAUSTED" | "ERROR_VERIFICATION_BYPASSED" | "ERROR_VERDICT_MISMATCH";
  /**
   * Username of the account that is being verified. Deprecated. Customers
   * should now provide the hashed account ID field in Event.
   */
  username?: string;
}

/**
 * Settings specific to keys that can be used by Android apps.
 */
export interface GoogleCloudRecaptchaenterpriseV1AndroidKeySettings {
  /**
   * If set to true, allowed_package_names are not enforced.
   */
  allowAllPackageNames?: boolean;
  /**
   * Android package names of apps allowed to use the key. Example:
   * 'com.companyname.appname'
   */
  allowedPackageNames?: string[];
}

/**
 * The request message to annotate an Assessment.
 */
export interface GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest {
  /**
   * Optional. The annotation that will be assigned to the Event. This field
   * can be left empty to provide reasons that apply to an event without
   * concluding whether the event is legitimate or fraudulent.
   */
  annotation?:  | "ANNOTATION_UNSPECIFIED" | "LEGITIMATE" | "FRAUDULENT" | "PASSWORD_CORRECT" | "PASSWORD_INCORRECT";
  /**
   * Optional. Unique stable hashed user identifier to apply to the assessment.
   * This is an alternative to setting the hashed_account_id in
   * CreateAssessment, for example when the account identifier is not yet known
   * in the initial request. It is recommended that the identifier is hashed
   * using hmac-sha256 with stable secret.
   */
  hashedAccountId?: Uint8Array;
  /**
   * Optional. Optional reasons for the annotation that will be assigned to the
   * Event.
   */
  reasons?:  | "REASON_UNSPECIFIED" | "CHARGEBACK" | "CHARGEBACK_FRAUD" | "CHARGEBACK_DISPUTE" | "REFUND" | "REFUND_FRAUD" | "TRANSACTION_ACCEPTED" | "TRANSACTION_DECLINED" | "PAYMENT_HEURISTICS" | "INITIATED_TWO_FACTOR" | "PASSED_TWO_FACTOR" | "FAILED_TWO_FACTOR" | "CORRECT_PASSWORD" | "INCORRECT_PASSWORD" | "SOCIAL_SPAM"[];
  /**
   * Optional. If the assessment is part of a payment transaction, provide
   * details on payment lifecycle events that occur in the transaction.
   */
  transactionEvent?: GoogleCloudRecaptchaenterpriseV1TransactionEvent;
}

function serializeGoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest(data: any): GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? encodeBase64(data["hashedAccountId"]) : undefined,
    transactionEvent: data["transactionEvent"] !== undefined ? serializeGoogleCloudRecaptchaenterpriseV1TransactionEvent(data["transactionEvent"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest(data: any): GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentRequest {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? decodeBase64(data["hashedAccountId"] as string) : undefined,
    transactionEvent: data["transactionEvent"] !== undefined ? deserializeGoogleCloudRecaptchaenterpriseV1TransactionEvent(data["transactionEvent"]) : undefined,
  };
}

/**
 * Empty response for AnnotateAssessment.
 */
export interface GoogleCloudRecaptchaenterpriseV1AnnotateAssessmentResponse {
}

/**
 * A reCAPTCHA Enterprise assessment resource.
 */
export interface GoogleCloudRecaptchaenterpriseV1Assessment {
  /**
   * Assessment returned by account defender when a hashed_account_id is
   * provided.
   */
  accountDefenderAssessment?: GoogleCloudRecaptchaenterpriseV1AccountDefenderAssessment;
  /**
   * Account verification information for identity verification. The assessment
   * event must include a token and site key to use this feature.
   */
  accountVerification?: GoogleCloudRecaptchaenterpriseV1AccountVerificationInfo;
  /**
   * The event being assessed.
   */
  event?: GoogleCloudRecaptchaenterpriseV1Event;
  /**
   * Assessment returned by Fraud Prevention when TransactionData is provided.
   */
  fraudPreventionAssessment?: GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment;
  /**
   * Output only. The resource name for the Assessment in the format
   * "projects/{project}/assessments/{assessment}".
   */
  readonly name?: string;
  /**
   * The private password leak verification field contains the parameters that
   * are used to to check for leaks privately without sharing user credentials.
   */
  privatePasswordLeakVerification?: GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification;
  /**
   * Output only. The risk analysis result for the event being assessed.
   */
  readonly riskAnalysis?: GoogleCloudRecaptchaenterpriseV1RiskAnalysis;
  /**
   * Output only. Properties of the provided event token.
   */
  readonly tokenProperties?: GoogleCloudRecaptchaenterpriseV1TokenProperties;
}

function serializeGoogleCloudRecaptchaenterpriseV1Assessment(data: any): GoogleCloudRecaptchaenterpriseV1Assessment {
  return {
    ...data,
    event: data["event"] !== undefined ? serializeGoogleCloudRecaptchaenterpriseV1Event(data["event"]) : undefined,
    privatePasswordLeakVerification: data["privatePasswordLeakVerification"] !== undefined ? serializeGoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification(data["privatePasswordLeakVerification"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1Assessment(data: any): GoogleCloudRecaptchaenterpriseV1Assessment {
  return {
    ...data,
    event: data["event"] !== undefined ? deserializeGoogleCloudRecaptchaenterpriseV1Event(data["event"]) : undefined,
    privatePasswordLeakVerification: data["privatePasswordLeakVerification"] !== undefined ? deserializeGoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification(data["privatePasswordLeakVerification"]) : undefined,
    tokenProperties: data["tokenProperties"] !== undefined ? deserializeGoogleCloudRecaptchaenterpriseV1TokenProperties(data["tokenProperties"]) : undefined,
  };
}

/**
 * Metrics related to challenges.
 */
export interface GoogleCloudRecaptchaenterpriseV1ChallengeMetrics {
  /**
   * Count of submitted challenge solutions that were incorrect or otherwise
   * deemed suspicious such that a subsequent challenge was triggered.
   */
  failedCount?: bigint;
  /**
   * Count of nocaptchas (successful verification without a challenge) issued.
   */
  nocaptchaCount?: bigint;
  /**
   * Count of reCAPTCHA checkboxes or badges rendered. This is mostly
   * equivalent to a count of pageloads for pages that include reCAPTCHA.
   */
  pageloadCount?: bigint;
  /**
   * Count of nocaptchas (successful verification without a challenge) plus
   * submitted challenge solutions that were correct and resulted in
   * verification.
   */
  passedCount?: bigint;
}

function serializeGoogleCloudRecaptchaenterpriseV1ChallengeMetrics(data: any): GoogleCloudRecaptchaenterpriseV1ChallengeMetrics {
  return {
    ...data,
    failedCount: data["failedCount"] !== undefined ? String(data["failedCount"]) : undefined,
    nocaptchaCount: data["nocaptchaCount"] !== undefined ? String(data["nocaptchaCount"]) : undefined,
    pageloadCount: data["pageloadCount"] !== undefined ? String(data["pageloadCount"]) : undefined,
    passedCount: data["passedCount"] !== undefined ? String(data["passedCount"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1ChallengeMetrics(data: any): GoogleCloudRecaptchaenterpriseV1ChallengeMetrics {
  return {
    ...data,
    failedCount: data["failedCount"] !== undefined ? BigInt(data["failedCount"]) : undefined,
    nocaptchaCount: data["nocaptchaCount"] !== undefined ? BigInt(data["nocaptchaCount"]) : undefined,
    pageloadCount: data["pageloadCount"] !== undefined ? BigInt(data["pageloadCount"]) : undefined,
    passedCount: data["passedCount"] !== undefined ? BigInt(data["passedCount"]) : undefined,
  };
}

/**
 * Information about a verification endpoint that can be used for 2FA.
 */
export interface GoogleCloudRecaptchaenterpriseV1EndpointVerificationInfo {
  /**
   * Email address for which to trigger a verification request.
   */
  emailAddress?: string;
  /**
   * Output only. Timestamp of the last successful verification for the
   * endpoint, if any.
   */
  readonly lastVerificationTime?: Date;
  /**
   * Phone number for which to trigger a verification request. Should be given
   * in E.164 format.
   */
  phoneNumber?: string;
  /**
   * Output only. Token to provide to the client to trigger endpoint
   * verification. It must be used within 15 minutes.
   */
  readonly requestToken?: string;
}

export interface GoogleCloudRecaptchaenterpriseV1Event {
  /**
   * Optional. The expected action for this type of event. This should be the
   * same action provided at token generation time on client-side platforms
   * already integrated with recaptcha enterprise.
   */
  expectedAction?: string;
  /**
   * Optional. Unique stable hashed user identifier for the request. The
   * identifier must be hashed using hmac-sha256 with stable secret.
   */
  hashedAccountId?: Uint8Array;
  /**
   * Optional. The site key that was used to invoke reCAPTCHA Enterprise on
   * your site and generate the token.
   */
  siteKey?: string;
  /**
   * Optional. The user response token provided by the reCAPTCHA Enterprise
   * client-side integration on your site.
   */
  token?: string;
  /**
   * Optional. Data describing a payment transaction to be assessed. Sending
   * this data enables reCAPTCHA Enterprise Fraud Prevention and the
   * FraudPreventionAssessment component in the response.
   */
  transactionData?: GoogleCloudRecaptchaenterpriseV1TransactionData;
  /**
   * Optional. The user agent present in the request from the user's device
   * related to this event.
   */
  userAgent?: string;
  /**
   * Optional. The IP address in the request from the user's device related to
   * this event.
   */
  userIpAddress?: string;
}

function serializeGoogleCloudRecaptchaenterpriseV1Event(data: any): GoogleCloudRecaptchaenterpriseV1Event {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? encodeBase64(data["hashedAccountId"]) : undefined,
    transactionData: data["transactionData"] !== undefined ? serializeGoogleCloudRecaptchaenterpriseV1TransactionData(data["transactionData"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1Event(data: any): GoogleCloudRecaptchaenterpriseV1Event {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? decodeBase64(data["hashedAccountId"] as string) : undefined,
    transactionData: data["transactionData"] !== undefined ? deserializeGoogleCloudRecaptchaenterpriseV1TransactionData(data["transactionData"]) : undefined,
  };
}

/**
 * Assessment for Fraud Prevention.
 */
export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessment {
  /**
   * Assessment of this transaction for risk of being part of a card testing
   * attack.
   */
  cardTestingVerdict?: GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict;
  /**
   * Assessment of this transaction for risk of a stolen instrument.
   */
  stolenInstrumentVerdict?: GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict;
  /**
   * Probability (0-1) of this transaction being fraudulent. Summarizes the
   * combined risk of attack vectors below.
   */
  transactionRisk?: number;
}

/**
 * Information about card testing fraud, where an adversary is testing
 * fraudulently obtained cards or brute forcing their details.
 */
export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentCardTestingVerdict {
  /**
   * Probability (0-1) of this transaction attempt being part of a card testing
   * attack.
   */
  risk?: number;
}

/**
 * Information about stolen instrument fraud, where the user is not the
 * legitimate owner of the instrument being used for the purchase.
 */
export interface GoogleCloudRecaptchaenterpriseV1FraudPreventionAssessmentStolenInstrumentVerdict {
  /**
   * Probability (0-1) of this transaction being executed with a stolen
   * instrument.
   */
  risk?: number;
}

/**
 * Settings specific to keys that can be used by iOS apps.
 */
export interface GoogleCloudRecaptchaenterpriseV1IOSKeySettings {
  /**
   * If set to true, allowed_bundle_ids are not enforced.
   */
  allowAllBundleIds?: boolean;
  /**
   * iOS bundle ids of apps allowed to use the key. Example:
   * 'com.companyname.productname.appname'
   */
  allowedBundleIds?: string[];
}

/**
 * A key used to identify and configure applications (web and/or mobile) that
 * use reCAPTCHA Enterprise.
 */
export interface GoogleCloudRecaptchaenterpriseV1Key {
  /**
   * Settings for keys that can be used by Android apps.
   */
  androidSettings?: GoogleCloudRecaptchaenterpriseV1AndroidKeySettings;
  /**
   * The timestamp corresponding to the creation of this Key.
   */
  createTime?: Date;
  /**
   * Human-readable display name of this key. Modifiable by user.
   */
  displayName?: string;
  /**
   * Settings for keys that can be used by iOS apps.
   */
  iosSettings?: GoogleCloudRecaptchaenterpriseV1IOSKeySettings;
  /**
   * See Creating and managing labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The resource name for the Key in the format
   * "projects/{project}/keys/{key}".
   */
  name?: string;
  /**
   * Options for user acceptance testing.
   */
  testingOptions?: GoogleCloudRecaptchaenterpriseV1TestingOptions;
  /**
   * Settings for WAF
   */
  wafSettings?: GoogleCloudRecaptchaenterpriseV1WafSettings;
  /**
   * Settings for keys that can be used by websites.
   */
  webSettings?: GoogleCloudRecaptchaenterpriseV1WebKeySettings;
}

function serializeGoogleCloudRecaptchaenterpriseV1Key(data: any): GoogleCloudRecaptchaenterpriseV1Key {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1Key(data: any): GoogleCloudRecaptchaenterpriseV1Key {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response to request to list keys in a project.
 */
export interface GoogleCloudRecaptchaenterpriseV1ListKeysResponse {
  /**
   * Key details.
   */
  keys?: GoogleCloudRecaptchaenterpriseV1Key[];
  /**
   * Token to retrieve the next page of results. It is set to empty if no keys
   * remain in results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudRecaptchaenterpriseV1ListKeysResponse(data: any): GoogleCloudRecaptchaenterpriseV1ListKeysResponse {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (serializeGoogleCloudRecaptchaenterpriseV1Key(item))) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1ListKeysResponse(data: any): GoogleCloudRecaptchaenterpriseV1ListKeysResponse {
  return {
    ...data,
    keys: data["keys"] !== undefined ? data["keys"].map((item: any) => (deserializeGoogleCloudRecaptchaenterpriseV1Key(item))) : undefined,
  };
}

/**
 * The response to a `ListRelatedAccountGroupMemberships` call.
 */
export interface GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The memberships listed by the query.
   */
  relatedAccountGroupMemberships?: GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership[];
}

function serializeGoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse(data: any): GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse {
  return {
    ...data,
    relatedAccountGroupMemberships: data["relatedAccountGroupMemberships"] !== undefined ? data["relatedAccountGroupMemberships"].map((item: any) => (serializeGoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership(item))) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse(data: any): GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupMembershipsResponse {
  return {
    ...data,
    relatedAccountGroupMemberships: data["relatedAccountGroupMemberships"] !== undefined ? data["relatedAccountGroupMemberships"].map((item: any) => (deserializeGoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership(item))) : undefined,
  };
}

/**
 * The response to a `ListRelatedAccountGroups` call.
 */
export interface GoogleCloudRecaptchaenterpriseV1ListRelatedAccountGroupsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The groups of related accounts listed by the query.
   */
  relatedAccountGroups?: GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup[];
}

/**
 * Metrics for a single Key.
 */
export interface GoogleCloudRecaptchaenterpriseV1Metrics {
  /**
   * Metrics will be continuous and in order by dates, and in the granularity
   * of day. Only challenge-based keys (CHECKBOX, INVISIBLE), will have
   * challenge-based data.
   */
  challengeMetrics?: GoogleCloudRecaptchaenterpriseV1ChallengeMetrics[];
  /**
   * Output only. The name of the metrics, in the format
   * "projects/{project}/keys/{key}/metrics".
   */
  readonly name?: string;
  /**
   * Metrics will be continuous and in order by dates, and in the granularity
   * of day. All Key types should have score-based data.
   */
  scoreMetrics?: GoogleCloudRecaptchaenterpriseV1ScoreMetrics[];
  /**
   * Inclusive start time aligned to a day (UTC).
   */
  startTime?: Date;
}

function serializeGoogleCloudRecaptchaenterpriseV1Metrics(data: any): GoogleCloudRecaptchaenterpriseV1Metrics {
  return {
    ...data,
    challengeMetrics: data["challengeMetrics"] !== undefined ? data["challengeMetrics"].map((item: any) => (serializeGoogleCloudRecaptchaenterpriseV1ChallengeMetrics(item))) : undefined,
    scoreMetrics: data["scoreMetrics"] !== undefined ? data["scoreMetrics"].map((item: any) => (serializeGoogleCloudRecaptchaenterpriseV1ScoreMetrics(item))) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1Metrics(data: any): GoogleCloudRecaptchaenterpriseV1Metrics {
  return {
    ...data,
    challengeMetrics: data["challengeMetrics"] !== undefined ? data["challengeMetrics"].map((item: any) => (deserializeGoogleCloudRecaptchaenterpriseV1ChallengeMetrics(item))) : undefined,
    scoreMetrics: data["scoreMetrics"] !== undefined ? data["scoreMetrics"].map((item: any) => (deserializeGoogleCloudRecaptchaenterpriseV1ScoreMetrics(item))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The migrate key request message.
 */
export interface GoogleCloudRecaptchaenterpriseV1MigrateKeyRequest {
  /**
   * Optional. If true, skips the billing check. A reCAPTCHA Enterprise key or
   * migrated key behaves differently than a reCAPTCHA (non-Enterprise version)
   * key when you reach a quota limit (see
   * https://cloud.google.com/recaptcha-enterprise/quotas#quota_limit). To avoid
   * any disruption of your usage, we check that a billing account is present.
   * If your usage of reCAPTCHA is under the free quota, you can safely skip the
   * billing check and proceed with the migration. See
   * https://cloud.google.com/recaptcha-enterprise/docs/billing-information.
   */
  skipBillingCheck?: boolean;
}

/**
 * Private password leak verification info.
 */
export interface GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification {
  /**
   * Output only. List of prefixes of the encrypted potential password leaks
   * that matched the given parameters. They must be compared with the
   * client-side decryption prefix of `reencrypted_user_credentials_hash`
   */
  readonly encryptedLeakMatchPrefixes?: Uint8Array[];
  /**
   * Optional. Encrypted Scrypt hash of the canonicalized username+password. It
   * is re-encrypted by the server and returned through
   * `reencrypted_user_credentials_hash`.
   */
  encryptedUserCredentialsHash?: Uint8Array;
  /**
   * Optional. Exactly 26-bit prefix of the SHA-256 hash of the canonicalized
   * username. It is used to look up password leaks associated with that hash
   * prefix.
   */
  lookupHashPrefix?: Uint8Array;
  /**
   * Output only. Corresponds to the re-encryption of the
   * `encrypted_user_credentials_hash` field. It is used to match potential
   * password leaks within `encrypted_leak_match_prefixes`.
   */
  readonly reencryptedUserCredentialsHash?: Uint8Array;
}

function serializeGoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification(data: any): GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification {
  return {
    ...data,
    encryptedUserCredentialsHash: data["encryptedUserCredentialsHash"] !== undefined ? encodeBase64(data["encryptedUserCredentialsHash"]) : undefined,
    lookupHashPrefix: data["lookupHashPrefix"] !== undefined ? encodeBase64(data["lookupHashPrefix"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification(data: any): GoogleCloudRecaptchaenterpriseV1PrivatePasswordLeakVerification {
  return {
    ...data,
    encryptedLeakMatchPrefixes: data["encryptedLeakMatchPrefixes"] !== undefined ? data["encryptedLeakMatchPrefixes"].map((item: any) => (decodeBase64(item as string))) : undefined,
    encryptedUserCredentialsHash: data["encryptedUserCredentialsHash"] !== undefined ? decodeBase64(data["encryptedUserCredentialsHash"] as string) : undefined,
    lookupHashPrefix: data["lookupHashPrefix"] !== undefined ? decodeBase64(data["lookupHashPrefix"] as string) : undefined,
    reencryptedUserCredentialsHash: data["reencryptedUserCredentialsHash"] !== undefined ? decodeBase64(data["reencryptedUserCredentialsHash"] as string) : undefined,
  };
}

/**
 * A group of related accounts.
 */
export interface GoogleCloudRecaptchaenterpriseV1RelatedAccountGroup {
  /**
   * Required. The resource name for the related account group in the format
   * `projects/{project}/relatedaccountgroups/{related_account_group}`.
   */
  name?: string;
}

/**
 * A membership in a group of related accounts.
 */
export interface GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership {
  /**
   * The unique stable hashed user identifier of the member. The identifier
   * corresponds to a `hashed_account_id` provided in a previous
   * `CreateAssessment` or `AnnotateAssessment` call.
   */
  hashedAccountId?: Uint8Array;
  /**
   * Required. The resource name for this membership in the format
   * `projects/{project}/relatedaccountgroups/{relatedaccountgroup}/memberships/{membership}`.
   */
  name?: string;
}

function serializeGoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership(data: any): GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? encodeBase64(data["hashedAccountId"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership(data: any): GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? decodeBase64(data["hashedAccountId"] as string) : undefined,
  };
}

/**
 * Secret key is used only in legacy reCAPTCHA. It must be used in a 3rd party
 * integration with legacy reCAPTCHA.
 */
export interface GoogleCloudRecaptchaenterpriseV1RetrieveLegacySecretKeyResponse {
  /**
   * The secret key (also known as shared secret) authorizes communication
   * between your application backend and the reCAPTCHA Enterprise server to
   * create an assessment. The secret key needs to be kept safe for security
   * purposes.
   */
  legacySecretKey?: string;
}

/**
 * Risk analysis result for an event.
 */
export interface GoogleCloudRecaptchaenterpriseV1RiskAnalysis {
  /**
   * Reasons contributing to the risk analysis verdict.
   */
  reasons?:  | "CLASSIFICATION_REASON_UNSPECIFIED" | "AUTOMATION" | "UNEXPECTED_ENVIRONMENT" | "TOO_MUCH_TRAFFIC" | "UNEXPECTED_USAGE_PATTERNS" | "LOW_CONFIDENCE_SCORE" | "SUSPECTED_CARDING" | "SUSPECTED_CHARGEBACK"[];
  /**
   * Legitimate event score from 0.0 to 1.0. (1.0 means very likely legitimate
   * traffic while 0.0 means very likely non-legitimate traffic).
   */
  score?: number;
}

/**
 * Score distribution.
 */
export interface GoogleCloudRecaptchaenterpriseV1ScoreDistribution {
  /**
   * Map key is score value multiplied by 100. The scores are discrete values
   * between [0, 1]. The maximum number of buckets is on order of a few dozen,
   * but typically much lower (ie. 10).
   */
  scoreBuckets?: {
    [key: string]: bigint
  };
}

function serializeGoogleCloudRecaptchaenterpriseV1ScoreDistribution(data: any): GoogleCloudRecaptchaenterpriseV1ScoreDistribution {
  return {
    ...data,
    scoreBuckets: data["scoreBuckets"] !== undefined ? Object.fromEntries(Object.entries(data["scoreBuckets"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1ScoreDistribution(data: any): GoogleCloudRecaptchaenterpriseV1ScoreDistribution {
  return {
    ...data,
    scoreBuckets: data["scoreBuckets"] !== undefined ? Object.fromEntries(Object.entries(data["scoreBuckets"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Metrics related to scoring.
 */
export interface GoogleCloudRecaptchaenterpriseV1ScoreMetrics {
  /**
   * Action-based metrics. The map key is the action name which specified by
   * the site owners at time of the "execute" client-side call.
   */
  actionMetrics?: {
    [key: string]: GoogleCloudRecaptchaenterpriseV1ScoreDistribution
  };
  /**
   * Aggregated score metrics for all traffic.
   */
  overallMetrics?: GoogleCloudRecaptchaenterpriseV1ScoreDistribution;
}

function serializeGoogleCloudRecaptchaenterpriseV1ScoreMetrics(data: any): GoogleCloudRecaptchaenterpriseV1ScoreMetrics {
  return {
    ...data,
    actionMetrics: data["actionMetrics"] !== undefined ? Object.fromEntries(Object.entries(data["actionMetrics"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudRecaptchaenterpriseV1ScoreDistribution(v)]))) : undefined,
    overallMetrics: data["overallMetrics"] !== undefined ? serializeGoogleCloudRecaptchaenterpriseV1ScoreDistribution(data["overallMetrics"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1ScoreMetrics(data: any): GoogleCloudRecaptchaenterpriseV1ScoreMetrics {
  return {
    ...data,
    actionMetrics: data["actionMetrics"] !== undefined ? Object.fromEntries(Object.entries(data["actionMetrics"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudRecaptchaenterpriseV1ScoreDistribution(v)]))) : undefined,
    overallMetrics: data["overallMetrics"] !== undefined ? deserializeGoogleCloudRecaptchaenterpriseV1ScoreDistribution(data["overallMetrics"]) : undefined,
  };
}

/**
 * The request message to search related account group memberships.
 */
export interface GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest {
  /**
   * Optional. The unique stable hashed user identifier we should search
   * connections to. The identifier should correspond to a `hashed_account_id`
   * provided in a previous `CreateAssessment` or `AnnotateAssessment` call.
   */
  hashedAccountId?: Uint8Array;
  /**
   * Optional. The maximum number of groups to return. The service might return
   * fewer than this value. If unspecified, at most 50 groups are returned. The
   * maximum value is 1000; values above 1000 are coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * `SearchRelatedAccountGroupMemberships` call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * `SearchRelatedAccountGroupMemberships` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

function serializeGoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest(data: any): GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? encodeBase64(data["hashedAccountId"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest(data: any): GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsRequest {
  return {
    ...data,
    hashedAccountId: data["hashedAccountId"] !== undefined ? decodeBase64(data["hashedAccountId"] as string) : undefined,
  };
}

/**
 * The response to a `SearchRelatedAccountGroupMemberships` call.
 */
export interface GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The queried memberships.
   */
  relatedAccountGroupMemberships?: GoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership[];
}

function serializeGoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse(data: any): GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse {
  return {
    ...data,
    relatedAccountGroupMemberships: data["relatedAccountGroupMemberships"] !== undefined ? data["relatedAccountGroupMemberships"].map((item: any) => (serializeGoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership(item))) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse(data: any): GoogleCloudRecaptchaenterpriseV1SearchRelatedAccountGroupMembershipsResponse {
  return {
    ...data,
    relatedAccountGroupMemberships: data["relatedAccountGroupMemberships"] !== undefined ? data["relatedAccountGroupMemberships"].map((item: any) => (deserializeGoogleCloudRecaptchaenterpriseV1RelatedAccountGroupMembership(item))) : undefined,
  };
}

/**
 * Options for user acceptance testing.
 */
export interface GoogleCloudRecaptchaenterpriseV1TestingOptions {
  /**
   * For challenge-based keys only (CHECKBOX, INVISIBLE), all challenge
   * requests for this site will return nocaptcha if NOCAPTCHA, or an unsolvable
   * challenge if CHALLENGE.
   */
  testingChallenge?:  | "TESTING_CHALLENGE_UNSPECIFIED" | "NOCAPTCHA" | "UNSOLVABLE_CHALLENGE";
  /**
   * All assessments for this Key will return this score. Must be between 0
   * (likely not legitimate) and 1 (likely legitimate) inclusive.
   */
  testingScore?: number;
}

export interface GoogleCloudRecaptchaenterpriseV1TokenProperties {
  /**
   * Action name provided at token generation.
   */
  action?: string;
  /**
   * The name of the Android package with which the token was generated
   * (Android keys only).
   */
  androidPackageName?: string;
  /**
   * The timestamp corresponding to the generation of the token.
   */
  createTime?: Date;
  /**
   * The hostname of the page on which the token was generated (Web keys only).
   */
  hostname?: string;
  /**
   * Reason associated with the response when valid = false.
   */
  invalidReason?:  | "INVALID_REASON_UNSPECIFIED" | "UNKNOWN_INVALID_REASON" | "MALFORMED" | "EXPIRED" | "DUPE" | "MISSING" | "BROWSER_ERROR";
  /**
   * The ID of the iOS bundle with which the token was generated (iOS keys
   * only).
   */
  iosBundleId?: string;
  /**
   * Whether the provided user response token is valid. When valid = false, the
   * reason could be specified in invalid_reason or it could also be due to a
   * user failing to solve a challenge or a sitekey mismatch (i.e the sitekey
   * used to generate the token was different than the one specified in the
   * assessment).
   */
  valid?: boolean;
}

function serializeGoogleCloudRecaptchaenterpriseV1TokenProperties(data: any): GoogleCloudRecaptchaenterpriseV1TokenProperties {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1TokenProperties(data: any): GoogleCloudRecaptchaenterpriseV1TokenProperties {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Transaction data associated with a payment protected by reCAPTCHA
 * Enterprise. All fields are optional.
 */
export interface GoogleCloudRecaptchaenterpriseV1TransactionData {
  /**
   * Address associated with the payment method when applicable.
   */
  billingAddress?: GoogleCloudRecaptchaenterpriseV1TransactionDataAddress;
  /**
   * The Bank Identification Number - generally the first 6 or 8 digits of the
   * card.
   */
  cardBin?: string;
  /**
   * The last four digits of the card.
   */
  cardLastFour?: string;
  /**
   * The currency code in ISO-4217 format.
   */
  currencyCode?: string;
  /**
   * Information about the payment gateway's response to the transaction.
   */
  gatewayInfo?: GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo;
  /**
   * Items purchased in this transaction.
   */
  items?: GoogleCloudRecaptchaenterpriseV1TransactionDataItem[];
  /**
   * Information about the user or users fulfilling the transaction.
   */
  merchants?: GoogleCloudRecaptchaenterpriseV1TransactionDataUser[];
  /**
   * The payment method for the transaction. The allowed values are: *
   * credit-card * debit-card * gift-card * processor-{name} (If a third-party
   * is used, for example, processor-paypal) * custom-{name} (If an alternative
   * method is used, for example, custom-crypto)
   */
  paymentMethod?: string;
  /**
   * Destination address if this transaction involves shipping a physical item.
   */
  shippingAddress?: GoogleCloudRecaptchaenterpriseV1TransactionDataAddress;
  /**
   * The value of shipping in the specified currency. 0 for free or no
   * shipping.
   */
  shippingValue?: number;
  /**
   * Unique identifier for the transaction. This custom identifier can be used
   * to reference this transaction in the future, for example, labeling a refund
   * or chargeback event. Two attempts at the same transaction should use the
   * same transaction id.
   */
  transactionId?: string;
  /**
   * Information about the user paying/initiating the transaction.
   */
  user?: GoogleCloudRecaptchaenterpriseV1TransactionDataUser;
  /**
   * The decimal value of the transaction in the specified currency.
   */
  value?: number;
}

function serializeGoogleCloudRecaptchaenterpriseV1TransactionData(data: any): GoogleCloudRecaptchaenterpriseV1TransactionData {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeGoogleCloudRecaptchaenterpriseV1TransactionDataItem(item))) : undefined,
    merchants: data["merchants"] !== undefined ? data["merchants"].map((item: any) => (serializeGoogleCloudRecaptchaenterpriseV1TransactionDataUser(item))) : undefined,
    user: data["user"] !== undefined ? serializeGoogleCloudRecaptchaenterpriseV1TransactionDataUser(data["user"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1TransactionData(data: any): GoogleCloudRecaptchaenterpriseV1TransactionData {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeGoogleCloudRecaptchaenterpriseV1TransactionDataItem(item))) : undefined,
    merchants: data["merchants"] !== undefined ? data["merchants"].map((item: any) => (deserializeGoogleCloudRecaptchaenterpriseV1TransactionDataUser(item))) : undefined,
    user: data["user"] !== undefined ? deserializeGoogleCloudRecaptchaenterpriseV1TransactionDataUser(data["user"]) : undefined,
  };
}

/**
 * Structured address format for billing and shipping addresses.
 */
export interface GoogleCloudRecaptchaenterpriseV1TransactionDataAddress {
  /**
   * The first lines of the address. The first line generally contains the
   * street name and number, and further lines may include information such as
   * an apartment number.
   */
  address?: string[];
  /**
   * The state, province, or otherwise administrative area of the address.
   */
  administrativeArea?: string;
  /**
   * The town/city of the address.
   */
  locality?: string;
  /**
   * The postal or ZIP code of the address.
   */
  postalCode?: string;
  /**
   * The recipient name, potentially including information such as "care of".
   */
  recipient?: string;
  /**
   * The CLDR country/region of the address.
   */
  regionCode?: string;
}

/**
 * Details about the transaction from the gateway.
 */
export interface GoogleCloudRecaptchaenterpriseV1TransactionDataGatewayInfo {
  /**
   * AVS response code from the gateway (available only when reCAPTCHA
   * Enterprise is called after authorization).
   */
  avsResponseCode?: string;
  /**
   * CVV response code from the gateway (available only when reCAPTCHA
   * Enterprise is called after authorization).
   */
  cvvResponseCode?: string;
  /**
   * Gateway response code describing the state of the transaction.
   */
  gatewayResponseCode?: string;
  /**
   * Name of the gateway service (for example, stripe, square, paypal).
   */
  name?: string;
}

/**
 * Line items being purchased in this transaction.
 */
export interface GoogleCloudRecaptchaenterpriseV1TransactionDataItem {
  /**
   * When a merchant is specified, its corresponding account_id. Necessary to
   * populate marketplace-style transactions.
   */
  merchantAccountId?: string;
  /**
   * The full name of the item.
   */
  name?: string;
  /**
   * The quantity of this item that is being purchased.
   */
  quantity?: bigint;
  /**
   * The value per item that the user is paying, in the transaction currency,
   * after discounts.
   */
  value?: number;
}

function serializeGoogleCloudRecaptchaenterpriseV1TransactionDataItem(data: any): GoogleCloudRecaptchaenterpriseV1TransactionDataItem {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? String(data["quantity"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1TransactionDataItem(data: any): GoogleCloudRecaptchaenterpriseV1TransactionDataItem {
  return {
    ...data,
    quantity: data["quantity"] !== undefined ? BigInt(data["quantity"]) : undefined,
  };
}

/**
 * Details about a user's account involved in the transaction.
 */
export interface GoogleCloudRecaptchaenterpriseV1TransactionDataUser {
  /**
   * Unique account identifier for this user. If using account defender, this
   * should match the hashed_account_id field. Otherwise, a unique and
   * persistent identifier for this account.
   */
  accountId?: string;
  /**
   * The epoch milliseconds of the user's account creation.
   */
  creationMs?: bigint;
  /**
   * The email address of the user.
   */
  email?: string;
  /**
   * Whether the email has been verified to be accessible by the user (OTP or
   * similar).
   */
  emailVerified?: boolean;
  /**
   * The phone number of the user, with country code.
   */
  phoneNumber?: string;
  /**
   * Whether the phone number has been verified to be accessible by the user
   * (OTP or similar).
   */
  phoneVerified?: boolean;
}

function serializeGoogleCloudRecaptchaenterpriseV1TransactionDataUser(data: any): GoogleCloudRecaptchaenterpriseV1TransactionDataUser {
  return {
    ...data,
    creationMs: data["creationMs"] !== undefined ? String(data["creationMs"]) : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1TransactionDataUser(data: any): GoogleCloudRecaptchaenterpriseV1TransactionDataUser {
  return {
    ...data,
    creationMs: data["creationMs"] !== undefined ? BigInt(data["creationMs"]) : undefined,
  };
}

/**
 * Describes an event in the lifecycle of a payment transaction.
 */
export interface GoogleCloudRecaptchaenterpriseV1TransactionEvent {
  /**
   * Optional. Timestamp when this transaction event occurred; otherwise
   * assumed to be the time of the API call.
   */
  eventTime?: Date;
  /**
   * Optional. The type of this transaction event.
   */
  eventType?:  | "TRANSACTION_EVENT_TYPE_UNSPECIFIED" | "MERCHANT_APPROVE" | "MERCHANT_DENY" | "MANUAL_REVIEW" | "AUTHORIZATION" | "AUTHORIZATION_DECLINE" | "PAYMENT_CAPTURE" | "PAYMENT_CAPTURE_DECLINE" | "CANCEL" | "CHARGEBACK_INQUIRY" | "CHARGEBACK_ALERT" | "FRAUD_NOTIFICATION" | "CHARGEBACK" | "CHARGEBACK_REPRESENTMENT" | "CHARGEBACK_REVERSE" | "REFUND_REQUEST" | "REFUND_DECLINE" | "REFUND" | "REFUND_REVERSE";
  /**
   * Optional. The reason or standardized code that corresponds with this
   * transaction event, if one exists. For example, a CHARGEBACK event with code
   * 6005.
   */
  reason?: string;
  /**
   * Optional. The value that corresponds with this transaction event, if one
   * exists. For example, a refund event where $5.00 was refunded. Currency is
   * obtained from the original transaction data.
   */
  value?: number;
}

function serializeGoogleCloudRecaptchaenterpriseV1TransactionEvent(data: any): GoogleCloudRecaptchaenterpriseV1TransactionEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecaptchaenterpriseV1TransactionEvent(data: any): GoogleCloudRecaptchaenterpriseV1TransactionEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * Settings specific to keys that can be used for WAF (Web Application
 * Firewall).
 */
export interface GoogleCloudRecaptchaenterpriseV1WafSettings {
  /**
   * Required. The WAF feature for which this key is enabled.
   */
  wafFeature?:  | "WAF_FEATURE_UNSPECIFIED" | "CHALLENGE_PAGE" | "SESSION_TOKEN" | "ACTION_TOKEN";
  /**
   * Required. The WAF service that uses this key.
   */
  wafService?:  | "WAF_SERVICE_UNSPECIFIED" | "CA" | "FASTLY";
}

/**
 * Settings specific to keys that can be used by websites.
 */
export interface GoogleCloudRecaptchaenterpriseV1WebKeySettings {
  /**
   * If set to true, it means allowed_domains will not be enforced.
   */
  allowAllDomains?: boolean;
  /**
   * If set to true, the key can be used on AMP (Accelerated Mobile Pages)
   * websites. This is supported only for the SCORE integration type.
   */
  allowAmpTraffic?: boolean;
  /**
   * Domains or subdomains of websites allowed to use the key. All subdomains
   * of an allowed domain are automatically allowed. A valid domain requires a
   * host and must not include any path, port, query or fragment. Examples:
   * 'example.com' or 'subdomain.example.com'
   */
  allowedDomains?: string[];
  /**
   * Settings for the frequency and difficulty at which this key triggers
   * captcha challenges. This should only be specified for IntegrationTypes
   * CHECKBOX and INVISIBLE.
   */
  challengeSecurityPreference?:  | "CHALLENGE_SECURITY_PREFERENCE_UNSPECIFIED" | "USABILITY" | "BALANCE" | "SECURITY";
  /**
   * Required. Describes how this key is integrated with the website.
   */
  integrationType?:  | "INTEGRATION_TYPE_UNSPECIFIED" | "SCORE" | "CHECKBOX" | "INVISIBLE";
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
 * Additional options for reCAPTCHAEnterprise#projectsKeysList.
 */
export interface ProjectsKeysListOptions {
  /**
   * Optional. The maximum number of keys to return. Default is 10. Max limit
   * is 1000.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous.
   * ListKeysRequest, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for reCAPTCHAEnterprise#projectsKeysPatch.
 */
export interface ProjectsKeysPatchOptions {
  /**
   * Optional. The mask to control which fields of the key get updated. If the
   * mask is not present, all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsKeysPatchOptions(data: any): ProjectsKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsKeysPatchOptions(data: any): ProjectsKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for reCAPTCHAEnterprise#projectsRelatedaccountgroupsList.
 */
export interface ProjectsRelatedaccountgroupsListOptions {
  /**
   * Optional. The maximum number of groups to return. The service might return
   * fewer than this value. If unspecified, at most 50 groups are returned. The
   * maximum value is 1000; values above 1000 are coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * `ListRelatedAccountGroups` call. Provide this to retrieve the subsequent
   * page. When paginating, all other parameters provided to
   * `ListRelatedAccountGroups` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * reCAPTCHAEnterprise#projectsRelatedaccountgroupsMembershipsList.
 */
export interface ProjectsRelatedaccountgroupsMembershipsListOptions {
  /**
   * Optional. The maximum number of accounts to return. The service might
   * return fewer than this value. If unspecified, at most 50 accounts are
   * returned. The maximum value is 1000; values above 1000 are coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * `ListRelatedAccountGroupMemberships` call. When paginating, all other
   * parameters provided to `ListRelatedAccountGroupMemberships` must match the
   * call that provided the page token.
   */
  pageToken?: string;
}

function decodeBase64(b64: string): Uint8Array {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

const base64abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */
function encodeBase64(uint8: Uint8Array): string {
  let result = "", i;
  const l = uint8.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[((uint8[i - 1] & 0x0f) << 2) | (uint8[i] >> 6)];
    result += base64abc[uint8[i] & 0x3f];
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4];
    result += "==";
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2];
    result += "=";
  }
  return result;
}
