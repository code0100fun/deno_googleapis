// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Identity Toolkit API Client for Deno
 * ===========================================
 * 
 * Help the third party sites to implement federated login.
 * 
 * Docs: https://developers.google.com/identity-toolkit/v3/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Help the third party sites to implement federated login.
 */
export class IdentityToolkit {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates the URI used by the IdP to authenticate the user.
   *
   */
  async relyingpartyCreateAuthUri(req: IdentitytoolkitRelyingpartyCreateAuthUriRequest): Promise<CreateAuthUriResponse> {
    req = serializeIdentitytoolkitRelyingpartyCreateAuthUriRequest(req);
    const url = new URL(`${this.#baseUrl}createAuthUri`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CreateAuthUriResponse;
  }

  /**
   * Delete user account.
   *
   */
  async relyingpartyDeleteAccount(req: IdentitytoolkitRelyingpartyDeleteAccountRequest): Promise<DeleteAccountResponse> {
    req = serializeIdentitytoolkitRelyingpartyDeleteAccountRequest(req);
    const url = new URL(`${this.#baseUrl}deleteAccount`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DeleteAccountResponse;
  }

  /**
   * Batch download user accounts.
   *
   */
  async relyingpartyDownloadAccount(req: IdentitytoolkitRelyingpartyDownloadAccountRequest): Promise<DownloadAccountResponse> {
    req = serializeIdentitytoolkitRelyingpartyDownloadAccountRequest(req);
    const url = new URL(`${this.#baseUrl}downloadAccount`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDownloadAccountResponse(data);
  }

  /**
   * Reset password for a user.
   *
   */
  async relyingpartyEmailLinkSignin(req: IdentitytoolkitRelyingpartyEmailLinkSigninRequest): Promise<EmailLinkSigninResponse> {
    const url = new URL(`${this.#baseUrl}emailLinkSignin`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEmailLinkSigninResponse(data);
  }

  /**
   * Returns the account info.
   *
   */
  async relyingpartyGetAccountInfo(req: IdentitytoolkitRelyingpartyGetAccountInfoRequest): Promise<GetAccountInfoResponse> {
    req = serializeIdentitytoolkitRelyingpartyGetAccountInfoRequest(req);
    const url = new URL(`${this.#baseUrl}getAccountInfo`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGetAccountInfoResponse(data);
  }

  /**
   * Get a code for user action confirmation.
   *
   */
  async relyingpartyGetOobConfirmationCode(req: Relyingparty): Promise<GetOobConfirmationCodeResponse> {
    const url = new URL(`${this.#baseUrl}getOobConfirmationCode`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GetOobConfirmationCodeResponse;
  }

  /**
   * Get project configuration.
   *
   */
  async relyingpartyGetProjectConfig(opts: RelyingpartyGetProjectConfigOptions = {}): Promise<IdentitytoolkitRelyingpartyGetProjectConfigResponse> {
    const url = new URL(`${this.#baseUrl}getProjectConfig`);
    if (opts.delegatedProjectNumber !== undefined) {
      url.searchParams.append("delegatedProjectNumber", String(opts.delegatedProjectNumber));
    }
    if (opts.projectNumber !== undefined) {
      url.searchParams.append("projectNumber", String(opts.projectNumber));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as IdentitytoolkitRelyingpartyGetProjectConfigResponse;
  }

  /**
   * Get token signing public key.
   *
   */
  async relyingpartyGetPublicKeys(): Promise<IdentitytoolkitRelyingpartyGetPublicKeysResponse> {
    const url = new URL(`${this.#baseUrl}publicKeys`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as IdentitytoolkitRelyingpartyGetPublicKeysResponse;
  }

  /**
   * Get recaptcha secure param.
   *
   */
  async relyingpartyGetRecaptchaParam(): Promise<GetRecaptchaParamResponse> {
    const url = new URL(`${this.#baseUrl}getRecaptchaParam`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GetRecaptchaParamResponse;
  }

  /**
   * Reset password for a user.
   *
   */
  async relyingpartyResetPassword(req: IdentitytoolkitRelyingpartyResetPasswordRequest): Promise<ResetPasswordResponse> {
    const url = new URL(`${this.#baseUrl}resetPassword`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ResetPasswordResponse;
  }

  /**
   * Send SMS verification code.
   *
   */
  async relyingpartySendVerificationCode(req: IdentitytoolkitRelyingpartySendVerificationCodeRequest): Promise<IdentitytoolkitRelyingpartySendVerificationCodeResponse> {
    const url = new URL(`${this.#baseUrl}sendVerificationCode`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as IdentitytoolkitRelyingpartySendVerificationCodeResponse;
  }

  /**
   * Set account info for a user.
   *
   */
  async relyingpartySetAccountInfo(req: IdentitytoolkitRelyingpartySetAccountInfoRequest): Promise<SetAccountInfoResponse> {
    req = serializeIdentitytoolkitRelyingpartySetAccountInfoRequest(req);
    const url = new URL(`${this.#baseUrl}setAccountInfo`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSetAccountInfoResponse(data);
  }

  /**
   * Set project configuration.
   *
   */
  async relyingpartySetProjectConfig(req: IdentitytoolkitRelyingpartySetProjectConfigRequest): Promise<IdentitytoolkitRelyingpartySetProjectConfigResponse> {
    req = serializeIdentitytoolkitRelyingpartySetProjectConfigRequest(req);
    const url = new URL(`${this.#baseUrl}setProjectConfig`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as IdentitytoolkitRelyingpartySetProjectConfigResponse;
  }

  /**
   * Sign out user.
   *
   */
  async relyingpartySignOutUser(req: IdentitytoolkitRelyingpartySignOutUserRequest): Promise<IdentitytoolkitRelyingpartySignOutUserResponse> {
    const url = new URL(`${this.#baseUrl}signOutUser`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as IdentitytoolkitRelyingpartySignOutUserResponse;
  }

  /**
   * Signup new user.
   *
   */
  async relyingpartySignupNewUser(req: IdentitytoolkitRelyingpartySignupNewUserRequest): Promise<SignupNewUserResponse> {
    req = serializeIdentitytoolkitRelyingpartySignupNewUserRequest(req);
    const url = new URL(`${this.#baseUrl}signupNewUser`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSignupNewUserResponse(data);
  }

  /**
   * Batch upload existing user accounts.
   *
   */
  async relyingpartyUploadAccount(req: IdentitytoolkitRelyingpartyUploadAccountRequest): Promise<UploadAccountResponse> {
    req = serializeIdentitytoolkitRelyingpartyUploadAccountRequest(req);
    const url = new URL(`${this.#baseUrl}uploadAccount`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UploadAccountResponse;
  }

  /**
   * Verifies the assertion returned by the IdP.
   *
   */
  async relyingpartyVerifyAssertion(req: IdentitytoolkitRelyingpartyVerifyAssertionRequest): Promise<VerifyAssertionResponse> {
    req = serializeIdentitytoolkitRelyingpartyVerifyAssertionRequest(req);
    const url = new URL(`${this.#baseUrl}verifyAssertion`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVerifyAssertionResponse(data);
  }

  /**
   * Verifies the developer asserted ID token.
   *
   */
  async relyingpartyVerifyCustomToken(req: IdentitytoolkitRelyingpartyVerifyCustomTokenRequest): Promise<VerifyCustomTokenResponse> {
    req = serializeIdentitytoolkitRelyingpartyVerifyCustomTokenRequest(req);
    const url = new URL(`${this.#baseUrl}verifyCustomToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVerifyCustomTokenResponse(data);
  }

  /**
   * Verifies the user entered password.
   *
   */
  async relyingpartyVerifyPassword(req: IdentitytoolkitRelyingpartyVerifyPasswordRequest): Promise<VerifyPasswordResponse> {
    req = serializeIdentitytoolkitRelyingpartyVerifyPasswordRequest(req);
    const url = new URL(`${this.#baseUrl}verifyPassword`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVerifyPasswordResponse(data);
  }

  /**
   * Verifies ownership of a phone number and creates/updates the user account
   * accordingly.
   *
   */
  async relyingpartyVerifyPhoneNumber(req: IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest): Promise<IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse> {
    const url = new URL(`${this.#baseUrl}verifyPhoneNumber`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeIdentitytoolkitRelyingpartyVerifyPhoneNumberResponse(data);
  }
}

/**
 * Response of creating the IDP authentication URL.
 */
export interface CreateAuthUriResponse {
  /**
   * all providers the user has once used to do federated login
   */
  allProviders?: string[];
  /**
   * The URI used by the IDP to authenticate the user.
   */
  authUri?: string;
  /**
   * True if captcha is required.
   */
  captchaRequired?: boolean;
  /**
   * True if the authUri is for user's existing provider.
   */
  forExistingProvider?: boolean;
  /**
   * The fixed string identitytoolkit#CreateAuthUriResponse".
   */
  kind?: string;
  /**
   * The provider ID of the auth URI.
   */
  providerId?: string;
  /**
   * Whether the user is registered if the identifier is an email.
   */
  registered?: boolean;
  /**
   * Session ID which should be passed in the following verifyAssertion
   * request.
   */
  sessionId?: string;
  /**
   * All sign-in methods this user has used.
   */
  signinMethods?: string[];
}

/**
 * Respone of deleting account.
 */
export interface DeleteAccountResponse {
  /**
   * The fixed string "identitytoolkit#DeleteAccountResponse".
   */
  kind?: string;
}

/**
 * Response of downloading accounts in batch.
 */
export interface DownloadAccountResponse {
  /**
   * The fixed string "identitytoolkit#DownloadAccountResponse".
   */
  kind?: string;
  /**
   * The next page token. To be used in a subsequent request to return the next
   * page of results.
   */
  nextPageToken?: string;
  /**
   * The user accounts data.
   */
  users?: UserInfo[];
}

function serializeDownloadAccountResponse(data: any): DownloadAccountResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (serializeUserInfo(item))) : undefined,
  };
}

function deserializeDownloadAccountResponse(data: any): DownloadAccountResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (deserializeUserInfo(item))) : undefined,
  };
}

/**
 * Response of email signIn.
 */
export interface EmailLinkSigninResponse {
  /**
   * The user's email.
   */
  email?: string;
  /**
   * Expiration time of STS id token in seconds.
   */
  expiresIn?: bigint;
  /**
   * The STS id token to login the newly signed in user.
   */
  idToken?: string;
  /**
   * Whether the user is new.
   */
  isNewUser?: boolean;
  /**
   * The fixed string "identitytoolkit#EmailLinkSigninResponse".
   */
  kind?: string;
  /**
   * The RP local ID of the user.
   */
  localId?: string;
  /**
   * The refresh token for the signed in user.
   */
  refreshToken?: string;
}

function serializeEmailLinkSigninResponse(data: any): EmailLinkSigninResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
  };
}

function deserializeEmailLinkSigninResponse(data: any): EmailLinkSigninResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
  };
}

/**
 * Template for an email template.
 */
export interface EmailTemplate {
  /**
   * Email body.
   */
  body?: string;
  /**
   * Email body format.
   */
  format?: string;
  /**
   * From address of the email.
   */
  from?: string;
  /**
   * From display name.
   */
  fromDisplayName?: string;
  /**
   * Reply-to address.
   */
  replyTo?: string;
  /**
   * Subject of the email.
   */
  subject?: string;
}

/**
 * Response of getting account information.
 */
export interface GetAccountInfoResponse {
  /**
   * The fixed string "identitytoolkit#GetAccountInfoResponse".
   */
  kind?: string;
  /**
   * The info of the users.
   */
  users?: UserInfo[];
}

function serializeGetAccountInfoResponse(data: any): GetAccountInfoResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (serializeUserInfo(item))) : undefined,
  };
}

function deserializeGetAccountInfoResponse(data: any): GetAccountInfoResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (deserializeUserInfo(item))) : undefined,
  };
}

/**
 * Response of getting a code for user confirmation (reset password, change
 * email etc.).
 */
export interface GetOobConfirmationCodeResponse {
  /**
   * The email address that the email is sent to.
   */
  email?: string;
  /**
   * The fixed string "identitytoolkit#GetOobConfirmationCodeResponse".
   */
  kind?: string;
  /**
   * The code to be send to the user.
   */
  oobCode?: string;
}

/**
 * Response of getting recaptcha param.
 */
export interface GetRecaptchaParamResponse {
  /**
   * The fixed string "identitytoolkit#GetRecaptchaParamResponse".
   */
  kind?: string;
  /**
   * Site key registered at recaptcha.
   */
  recaptchaSiteKey?: string;
  /**
   * The stoken field for the recaptcha widget, used to request captcha
   * challenge.
   */
  recaptchaStoken?: string;
}

/**
 * Request to get the IDP authentication URL.
 */
export interface IdentitytoolkitRelyingpartyCreateAuthUriRequest {
  /**
   * The app ID of the mobile app, base64(CERT_SHA1):PACKAGE_NAME for Android,
   * BUNDLE_ID for iOS.
   */
  appId?: string;
  /**
   * Explicitly specify the auth flow type. Currently only support "CODE_FLOW"
   * type. The field is only used for Google provider.
   */
  authFlowType?: string;
  /**
   * The relying party OAuth client ID.
   */
  clientId?: string;
  /**
   * The opaque value used by the client to maintain context info between the
   * authentication request and the IDP callback.
   */
  context?: string;
  /**
   * The URI to which the IDP redirects the user after the federated login
   * flow.
   */
  continueUri?: string;
  /**
   * The query parameter that client can customize by themselves in auth url.
   * The following parameters are reserved for server so that they cannot be
   * customized by clients: client_id, response_type, scope, redirect_uri,
   * state, oauth_token.
   */
  customParameter?: {
    [key: string]: string
  };
  /**
   * The hosted domain to restrict sign-in to accounts at that domain for
   * Google Apps hosted accounts.
   */
  hostedDomain?: string;
  /**
   * The email or federated ID of the user.
   */
  identifier?: string;
  /**
   * The developer's consumer key for OpenId OAuth Extension
   */
  oauthConsumerKey?: string;
  /**
   * Additional oauth scopes, beyond the basid user profile, that the user
   * would be prompted to grant
   */
  oauthScope?: string;
  /**
   * Optional realm for OpenID protocol. The sub string "scheme://domain:port"
   * of the param "continueUri" is used if this is not set.
   */
  openidRealm?: string;
  /**
   * The native app package for OTA installation.
   */
  otaApp?: string;
  /**
   * The IdP ID. For white listed IdPs it's a short domain name e.g.
   * google.com, aol.com, live.net and yahoo.com. For other OpenID IdPs it's the
   * OP identifier.
   */
  providerId?: string;
  /**
   * The session_id passed by client.
   */
  sessionId?: string;
  /**
   * For multi-tenant use cases, in order to construct sign-in URL with the
   * correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP
   * configs from.
   */
  tenantId?: string;
  /**
   * Tenant project number to be used for idp discovery.
   */
  tenantProjectNumber?: bigint;
}

function serializeIdentitytoolkitRelyingpartyCreateAuthUriRequest(data: any): IdentitytoolkitRelyingpartyCreateAuthUriRequest {
  return {
    ...data,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? String(data["tenantProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyCreateAuthUriRequest(data: any): IdentitytoolkitRelyingpartyCreateAuthUriRequest {
  return {
    ...data,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? BigInt(data["tenantProjectNumber"]) : undefined,
  };
}

/**
 * Request to delete account.
 */
export interface IdentitytoolkitRelyingpartyDeleteAccountRequest {
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * The GITKit token or STS id token of the authenticated user.
   */
  idToken?: string;
  /**
   * The local ID of the user.
   */
  localId?: string;
}

function serializeIdentitytoolkitRelyingpartyDeleteAccountRequest(data: any): IdentitytoolkitRelyingpartyDeleteAccountRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyDeleteAccountRequest(data: any): IdentitytoolkitRelyingpartyDeleteAccountRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
  };
}

/**
 * Request to download user account in batch.
 */
export interface IdentitytoolkitRelyingpartyDownloadAccountRequest {
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * The max number of results to return in the response.
   */
  maxResults?: number;
  /**
   * The token for the next page. This should be taken from the previous
   * response.
   */
  nextPageToken?: string;
  /**
   * Specify which project (field value is actually project id) to operate.
   * Only used when provided credential.
   */
  targetProjectId?: string;
}

function serializeIdentitytoolkitRelyingpartyDownloadAccountRequest(data: any): IdentitytoolkitRelyingpartyDownloadAccountRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyDownloadAccountRequest(data: any): IdentitytoolkitRelyingpartyDownloadAccountRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
  };
}

/**
 * Request to sign in with email.
 */
export interface IdentitytoolkitRelyingpartyEmailLinkSigninRequest {
  /**
   * The email address of the user.
   */
  email?: string;
  /**
   * Token for linking flow.
   */
  idToken?: string;
  /**
   * The confirmation code.
   */
  oobCode?: string;
}

/**
 * Request to get the account information.
 */
export interface IdentitytoolkitRelyingpartyGetAccountInfoRequest {
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * The list of emails of the users to inquiry.
   */
  email?: string[];
  /**
   * The GITKit token of the authenticated user.
   */
  idToken?: string;
  /**
   * The list of local ID's of the users to inquiry.
   */
  localId?: string[];
  /**
   * Privileged caller can query users by specified phone number.
   */
  phoneNumber?: string[];
}

function serializeIdentitytoolkitRelyingpartyGetAccountInfoRequest(data: any): IdentitytoolkitRelyingpartyGetAccountInfoRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyGetAccountInfoRequest(data: any): IdentitytoolkitRelyingpartyGetAccountInfoRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
  };
}

/**
 * Response of getting the project configuration.
 */
export interface IdentitytoolkitRelyingpartyGetProjectConfigResponse {
  /**
   * Whether to allow password user sign in or sign up.
   */
  allowPasswordUser?: boolean;
  /**
   * Browser API key, needed when making http request to Apiary.
   */
  apiKey?: string;
  /**
   * Authorized domains.
   */
  authorizedDomains?: string[];
  /**
   * Change email template.
   */
  changeEmailTemplate?: EmailTemplate;
  dynamicLinksDomain?: string;
  /**
   * Whether anonymous user is enabled.
   */
  enableAnonymousUser?: boolean;
  /**
   * OAuth2 provider configuration.
   */
  idpConfig?: IdpConfig[];
  /**
   * Legacy reset password email template.
   */
  legacyResetPasswordTemplate?: EmailTemplate;
  /**
   * Project ID of the relying party.
   */
  projectId?: string;
  /**
   * Reset password email template.
   */
  resetPasswordTemplate?: EmailTemplate;
  /**
   * Whether to use email sending provided by Firebear.
   */
  useEmailSending?: boolean;
  /**
   * Verify email template.
   */
  verifyEmailTemplate?: EmailTemplate;
}

/**
 * Respone of getting public keys.
 */
export interface IdentitytoolkitRelyingpartyGetPublicKeysResponse {
  [key: string]: string;
}

/**
 * Request to reset the password.
 */
export interface IdentitytoolkitRelyingpartyResetPasswordRequest {
  /**
   * The email address of the user.
   */
  email?: string;
  /**
   * The new password inputted by the user.
   */
  newPassword?: string;
  /**
   * The old password inputted by the user.
   */
  oldPassword?: string;
  /**
   * The confirmation code.
   */
  oobCode?: string;
}

/**
 * Request for Identitytoolkit-SendVerificationCode
 */
export interface IdentitytoolkitRelyingpartySendVerificationCodeRequest {
  /**
   * Receipt of successful app token validation with APNS.
   */
  iosReceipt?: string;
  /**
   * Secret delivered to iOS app via APNS.
   */
  iosSecret?: string;
  /**
   * The phone number to send the verification code to in E.164 format.
   */
  phoneNumber?: string;
  /**
   * Recaptcha solution.
   */
  recaptchaToken?: string;
}

/**
 * Response for Identitytoolkit-SendVerificationCode
 */
export interface IdentitytoolkitRelyingpartySendVerificationCodeResponse {
  /**
   * Encrypted session information
   */
  sessionInfo?: string;
}

/**
 * Request to set the account information.
 */
export interface IdentitytoolkitRelyingpartySetAccountInfoRequest {
  /**
   * The captcha challenge.
   */
  captchaChallenge?: string;
  /**
   * Response to the captcha.
   */
  captchaResponse?: string;
  /**
   * The timestamp when the account is created.
   */
  createdAt?: bigint;
  /**
   * The custom attributes to be set in the user's id token.
   */
  customAttributes?: string;
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * The attributes users request to delete.
   */
  deleteAttribute?: string[];
  /**
   * The IDPs the user request to delete.
   */
  deleteProvider?: string[];
  /**
   * Whether to disable the user.
   */
  disableUser?: boolean;
  /**
   * The name of the user.
   */
  displayName?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * Mark the email as verified or not.
   */
  emailVerified?: boolean;
  /**
   * The GITKit token of the authenticated user.
   */
  idToken?: string;
  /**
   * Instance id token of the app.
   */
  instanceId?: string;
  /**
   * Last login timestamp.
   */
  lastLoginAt?: bigint;
  /**
   * The local ID of the user.
   */
  localId?: string;
  /**
   * The out-of-band code of the change email request.
   */
  oobCode?: string;
  /**
   * The new password of the user.
   */
  password?: string;
  /**
   * Privileged caller can update user with specified phone number.
   */
  phoneNumber?: string;
  /**
   * The photo url of the user.
   */
  photoUrl?: string;
  /**
   * The associated IDPs of the user.
   */
  provider?: string[];
  /**
   * Whether return sts id token and refresh token instead of gitkit token.
   */
  returnSecureToken?: boolean;
  /**
   * Mark the user to upgrade to federated login.
   */
  upgradeToFederatedLogin?: boolean;
  /**
   * Timestamp in seconds for valid login token.
   */
  validSince?: bigint;
}

function serializeIdentitytoolkitRelyingpartySetAccountInfoRequest(data: any): IdentitytoolkitRelyingpartySetAccountInfoRequest {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? String(data["createdAt"]) : undefined,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
    lastLoginAt: data["lastLoginAt"] !== undefined ? String(data["lastLoginAt"]) : undefined,
    validSince: data["validSince"] !== undefined ? String(data["validSince"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartySetAccountInfoRequest(data: any): IdentitytoolkitRelyingpartySetAccountInfoRequest {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
    lastLoginAt: data["lastLoginAt"] !== undefined ? BigInt(data["lastLoginAt"]) : undefined,
    validSince: data["validSince"] !== undefined ? BigInt(data["validSince"]) : undefined,
  };
}

/**
 * Request to set the project configuration.
 */
export interface IdentitytoolkitRelyingpartySetProjectConfigRequest {
  /**
   * Whether to allow password user sign in or sign up.
   */
  allowPasswordUser?: boolean;
  /**
   * Browser API key, needed when making http request to Apiary.
   */
  apiKey?: string;
  /**
   * Authorized domains for widget redirect.
   */
  authorizedDomains?: string[];
  /**
   * Change email template.
   */
  changeEmailTemplate?: EmailTemplate;
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * Whether to enable anonymous user.
   */
  enableAnonymousUser?: boolean;
  /**
   * Oauth2 provider configuration.
   */
  idpConfig?: IdpConfig[];
  /**
   * Legacy reset password email template.
   */
  legacyResetPasswordTemplate?: EmailTemplate;
  /**
   * Reset password email template.
   */
  resetPasswordTemplate?: EmailTemplate;
  /**
   * Whether to use email sending provided by Firebear.
   */
  useEmailSending?: boolean;
  /**
   * Verify email template.
   */
  verifyEmailTemplate?: EmailTemplate;
}

function serializeIdentitytoolkitRelyingpartySetProjectConfigRequest(data: any): IdentitytoolkitRelyingpartySetProjectConfigRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartySetProjectConfigRequest(data: any): IdentitytoolkitRelyingpartySetProjectConfigRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
  };
}

/**
 * Response of setting the project configuration.
 */
export interface IdentitytoolkitRelyingpartySetProjectConfigResponse {
  /**
   * Project ID of the relying party.
   */
  projectId?: string;
}

/**
 * Request to sign out user.
 */
export interface IdentitytoolkitRelyingpartySignOutUserRequest {
  /**
   * Instance id token of the app.
   */
  instanceId?: string;
  /**
   * The local ID of the user.
   */
  localId?: string;
}

/**
 * Response of signing out user.
 */
export interface IdentitytoolkitRelyingpartySignOutUserResponse {
  /**
   * The local ID of the user.
   */
  localId?: string;
}

/**
 * Request to signup new user, create anonymous user or anonymous user reauth.
 */
export interface IdentitytoolkitRelyingpartySignupNewUserRequest {
  /**
   * The captcha challenge.
   */
  captchaChallenge?: string;
  /**
   * Response to the captcha.
   */
  captchaResponse?: string;
  /**
   * Whether to disable the user. Only can be used by service account.
   */
  disabled?: boolean;
  /**
   * The name of the user.
   */
  displayName?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * Mark the email as verified or not. Only can be used by service account.
   */
  emailVerified?: boolean;
  /**
   * The GITKit token of the authenticated user.
   */
  idToken?: string;
  /**
   * Instance id token of the app.
   */
  instanceId?: string;
  /**
   * Privileged caller can create user with specified user id.
   */
  localId?: string;
  /**
   * The new password of the user.
   */
  password?: string;
  /**
   * Privileged caller can create user with specified phone number.
   */
  phoneNumber?: string;
  /**
   * The photo url of the user.
   */
  photoUrl?: string;
  /**
   * For multi-tenant use cases, in order to construct sign-in URL with the
   * correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP
   * configs from.
   */
  tenantId?: string;
  /**
   * Tenant project number to be used for idp discovery.
   */
  tenantProjectNumber?: bigint;
}

function serializeIdentitytoolkitRelyingpartySignupNewUserRequest(data: any): IdentitytoolkitRelyingpartySignupNewUserRequest {
  return {
    ...data,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? String(data["tenantProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartySignupNewUserRequest(data: any): IdentitytoolkitRelyingpartySignupNewUserRequest {
  return {
    ...data,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? BigInt(data["tenantProjectNumber"]) : undefined,
  };
}

/**
 * Request to upload user account in batch.
 */
export interface IdentitytoolkitRelyingpartyUploadAccountRequest {
  /**
   * Whether allow overwrite existing account when user local_id exists.
   */
  allowOverwrite?: boolean;
  blockSize?: number;
  /**
   * The following 4 fields are for standard scrypt algorithm.
   */
  cpuMemCost?: number;
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  dkLen?: number;
  /**
   * The password hash algorithm.
   */
  hashAlgorithm?: string;
  /**
   * Memory cost for hash calculation. Used by scrypt similar algorithms.
   */
  memoryCost?: number;
  parallelization?: number;
  /**
   * Rounds for hash calculation. Used by scrypt and similar algorithms.
   */
  rounds?: number;
  /**
   * The salt separator.
   */
  saltSeparator?: Uint8Array;
  /**
   * If true, backend will do sanity check(including duplicate email and
   * federated id) when uploading account.
   */
  sanityCheck?: boolean;
  /**
   * The key for to hash the password.
   */
  signerKey?: Uint8Array;
  /**
   * Specify which project (field value is actually project id) to operate.
   * Only used when provided credential.
   */
  targetProjectId?: string;
  /**
   * The account info to be stored.
   */
  users?: UserInfo[];
}

function serializeIdentitytoolkitRelyingpartyUploadAccountRequest(data: any): IdentitytoolkitRelyingpartyUploadAccountRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
    saltSeparator: data["saltSeparator"] !== undefined ? encodeBase64(data["saltSeparator"]) : undefined,
    signerKey: data["signerKey"] !== undefined ? encodeBase64(data["signerKey"]) : undefined,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (serializeUserInfo(item))) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyUploadAccountRequest(data: any): IdentitytoolkitRelyingpartyUploadAccountRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
    saltSeparator: data["saltSeparator"] !== undefined ? decodeBase64(data["saltSeparator"] as string) : undefined,
    signerKey: data["signerKey"] !== undefined ? decodeBase64(data["signerKey"] as string) : undefined,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (deserializeUserInfo(item))) : undefined,
  };
}

/**
 * Request to verify the IDP assertion.
 */
export interface IdentitytoolkitRelyingpartyVerifyAssertionRequest {
  /**
   * When it's true, automatically creates a new account if the user doesn't
   * exist. When it's false, allows existing user to sign in normally and throws
   * exception if the user doesn't exist.
   */
  autoCreate?: boolean;
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * The GITKit token of the authenticated user.
   */
  idToken?: string;
  /**
   * Instance id token of the app.
   */
  instanceId?: string;
  /**
   * The GITKit token for the non-trusted IDP pending to be confirmed by the
   * user.
   */
  pendingIdToken?: string;
  /**
   * The post body if the request is a HTTP POST.
   */
  postBody?: string;
  /**
   * The URI to which the IDP redirects the user back. It may contain federated
   * login result params added by the IDP.
   */
  requestUri?: string;
  /**
   * Whether return 200 and IDP credential rather than throw exception when
   * federated id is already linked.
   */
  returnIdpCredential?: boolean;
  /**
   * Whether to return refresh tokens.
   */
  returnRefreshToken?: boolean;
  /**
   * Whether return sts id token and refresh token instead of gitkit token.
   */
  returnSecureToken?: boolean;
  /**
   * Session ID, which should match the one in previous createAuthUri request.
   */
  sessionId?: string;
  /**
   * For multi-tenant use cases, in order to construct sign-in URL with the
   * correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP
   * configs from.
   */
  tenantId?: string;
  /**
   * Tenant project number to be used for idp discovery.
   */
  tenantProjectNumber?: bigint;
}

function serializeIdentitytoolkitRelyingpartyVerifyAssertionRequest(data: any): IdentitytoolkitRelyingpartyVerifyAssertionRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? String(data["tenantProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyVerifyAssertionRequest(data: any): IdentitytoolkitRelyingpartyVerifyAssertionRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? BigInt(data["tenantProjectNumber"]) : undefined,
  };
}

/**
 * Request to verify a custom token
 */
export interface IdentitytoolkitRelyingpartyVerifyCustomTokenRequest {
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * Instance id token of the app.
   */
  instanceId?: string;
  /**
   * Whether return sts id token and refresh token instead of gitkit token.
   */
  returnSecureToken?: boolean;
  /**
   * The custom token to verify
   */
  token?: string;
}

function serializeIdentitytoolkitRelyingpartyVerifyCustomTokenRequest(data: any): IdentitytoolkitRelyingpartyVerifyCustomTokenRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyVerifyCustomTokenRequest(data: any): IdentitytoolkitRelyingpartyVerifyCustomTokenRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
  };
}

/**
 * Request to verify the password.
 */
export interface IdentitytoolkitRelyingpartyVerifyPasswordRequest {
  /**
   * The captcha challenge.
   */
  captchaChallenge?: string;
  /**
   * Response to the captcha.
   */
  captchaResponse?: string;
  /**
   * GCP project number of the requesting delegated app. Currently only
   * intended for Firebase V1 migration.
   */
  delegatedProjectNumber?: bigint;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * The GITKit token of the authenticated user.
   */
  idToken?: string;
  /**
   * Instance id token of the app.
   */
  instanceId?: string;
  /**
   * The password inputed by the user.
   */
  password?: string;
  /**
   * The GITKit token for the non-trusted IDP, which is to be confirmed by the
   * user.
   */
  pendingIdToken?: string;
  /**
   * Whether return sts id token and refresh token instead of gitkit token.
   */
  returnSecureToken?: boolean;
  /**
   * For multi-tenant use cases, in order to construct sign-in URL with the
   * correct IDP parameters, Firebear needs to know which Tenant to retrieve IDP
   * configs from.
   */
  tenantId?: string;
  /**
   * Tenant project number to be used for idp discovery.
   */
  tenantProjectNumber?: bigint;
}

function serializeIdentitytoolkitRelyingpartyVerifyPasswordRequest(data: any): IdentitytoolkitRelyingpartyVerifyPasswordRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? String(data["delegatedProjectNumber"]) : undefined,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? String(data["tenantProjectNumber"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyVerifyPasswordRequest(data: any): IdentitytoolkitRelyingpartyVerifyPasswordRequest {
  return {
    ...data,
    delegatedProjectNumber: data["delegatedProjectNumber"] !== undefined ? BigInt(data["delegatedProjectNumber"]) : undefined,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? BigInt(data["tenantProjectNumber"]) : undefined,
  };
}

/**
 * Request for Identitytoolkit-VerifyPhoneNumber
 */
export interface IdentitytoolkitRelyingpartyVerifyPhoneNumberRequest {
  code?: string;
  idToken?: string;
  operation?: string;
  phoneNumber?: string;
  /**
   * The session info previously returned by
   * IdentityToolkit-SendVerificationCode.
   */
  sessionInfo?: string;
  temporaryProof?: string;
  verificationProof?: string;
}

/**
 * Response for Identitytoolkit-VerifyPhoneNumber
 */
export interface IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse {
  expiresIn?: bigint;
  idToken?: string;
  isNewUser?: boolean;
  localId?: string;
  phoneNumber?: string;
  refreshToken?: string;
  temporaryProof?: string;
  temporaryProofExpiresIn?: bigint;
  verificationProof?: string;
  verificationProofExpiresIn?: bigint;
}

function serializeIdentitytoolkitRelyingpartyVerifyPhoneNumberResponse(data: any): IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
    temporaryProofExpiresIn: data["temporaryProofExpiresIn"] !== undefined ? String(data["temporaryProofExpiresIn"]) : undefined,
    verificationProofExpiresIn: data["verificationProofExpiresIn"] !== undefined ? String(data["verificationProofExpiresIn"]) : undefined,
  };
}

function deserializeIdentitytoolkitRelyingpartyVerifyPhoneNumberResponse(data: any): IdentitytoolkitRelyingpartyVerifyPhoneNumberResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
    temporaryProofExpiresIn: data["temporaryProofExpiresIn"] !== undefined ? BigInt(data["temporaryProofExpiresIn"]) : undefined,
    verificationProofExpiresIn: data["verificationProofExpiresIn"] !== undefined ? BigInt(data["verificationProofExpiresIn"]) : undefined,
  };
}

/**
 * Template for a single idp configuration.
 */
export interface IdpConfig {
  /**
   * OAuth2 client ID.
   */
  clientId?: string;
  /**
   * Whether this IDP is enabled.
   */
  enabled?: boolean;
  /**
   * Percent of users who will be prompted/redirected federated login for this
   * IDP.
   */
  experimentPercent?: number;
  /**
   * OAuth2 provider.
   */
  provider?: string;
  /**
   * OAuth2 client secret.
   */
  secret?: string;
  /**
   * Whitelisted client IDs for audience check.
   */
  whitelistedAudiences?: string[];
}

/**
 * Request of getting a code for user confirmation (reset password, change
 * email etc.)
 */
export interface Relyingparty {
  /**
   * whether or not to install the android app on the device where the link is
   * opened
   */
  androidInstallApp?: boolean;
  /**
   * minimum version of the app. if the version on the device is lower than
   * this version then the user is taken to the play store to upgrade the app
   */
  androidMinimumVersion?: string;
  /**
   * android package name of the android app to handle the action code
   */
  androidPackageName?: string;
  /**
   * whether or not the app can handle the oob code without first going to web
   */
  canHandleCodeInApp?: boolean;
  /**
   * The recaptcha response from the user.
   */
  captchaResp?: string;
  /**
   * The recaptcha challenge presented to the user.
   */
  challenge?: string;
  /**
   * The url to continue to the Gitkit app
   */
  continueUrl?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * The user's Gitkit login token for email change.
   */
  idToken?: string;
  /**
   * iOS app store id to download the app if it's not already installed
   */
  iOSAppStoreId?: string;
  /**
   * the iOS bundle id of iOS app to handle the action code
   */
  iOSBundleId?: string;
  /**
   * The fixed string "identitytoolkit#relyingparty".
   */
  kind?: string;
  /**
   * The new email if the code is for email change.
   */
  newEmail?: string;
  /**
   * The request type.
   */
  requestType?: string;
  /**
   * The IP address of the user.
   */
  userIp?: string;
}

/**
 * Additional options for IdentityToolkit#relyingpartyGetProjectConfig.
 */
export interface RelyingpartyGetProjectConfigOptions {
  /**
   * Delegated GCP project number of the request.
   */
  delegatedProjectNumber?: string;
  /**
   * GCP project number of the request.
   */
  projectNumber?: string;
}

/**
 * Response of resetting the password.
 */
export interface ResetPasswordResponse {
  /**
   * The user's email. If the out-of-band code is for email recovery, the
   * user's original email.
   */
  email?: string;
  /**
   * The fixed string "identitytoolkit#ResetPasswordResponse".
   */
  kind?: string;
  /**
   * If the out-of-band code is for email recovery, the user's new email.
   */
  newEmail?: string;
  /**
   * The request type.
   */
  requestType?: string;
}

/**
 * Respone of setting the account information.
 */
export interface SetAccountInfoResponse {
  /**
   * The name of the user.
   */
  displayName?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * If email has been verified.
   */
  emailVerified?: boolean;
  /**
   * If idToken is STS id token, then this field will be expiration time of STS
   * id token in seconds.
   */
  expiresIn?: bigint;
  /**
   * The Gitkit id token to login the newly sign up user.
   */
  idToken?: string;
  /**
   * The fixed string "identitytoolkit#SetAccountInfoResponse".
   */
  kind?: string;
  /**
   * The local ID of the user.
   */
  localId?: string;
  /**
   * The new email the user attempts to change to.
   */
  newEmail?: string;
  /**
   * The user's hashed password.
   */
  passwordHash?: Uint8Array;
  /**
   * The photo url of the user.
   */
  photoUrl?: string;
  /**
   * The user's profiles at the associated IdPs.
   */
  providerUserInfo?: {
    displayName?: string;
    federatedId?: string;
    photoUrl?: string;
    providerId?: string;
  }[];
  /**
   * If idToken is STS id token, then this field will be refresh token.
   */
  refreshToken?: string;
}

function serializeSetAccountInfoResponse(data: any): SetAccountInfoResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
    passwordHash: data["passwordHash"] !== undefined ? encodeBase64(data["passwordHash"]) : undefined,
  };
}

function deserializeSetAccountInfoResponse(data: any): SetAccountInfoResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
    passwordHash: data["passwordHash"] !== undefined ? decodeBase64(data["passwordHash"] as string) : undefined,
  };
}

/**
 * Response of signing up new user, creating anonymous user or anonymous user
 * reauth.
 */
export interface SignupNewUserResponse {
  /**
   * The name of the user.
   */
  displayName?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * If idToken is STS id token, then this field will be expiration time of STS
   * id token in seconds.
   */
  expiresIn?: bigint;
  /**
   * The Gitkit id token to login the newly sign up user.
   */
  idToken?: string;
  /**
   * The fixed string "identitytoolkit#SignupNewUserResponse".
   */
  kind?: string;
  /**
   * The RP local ID of the user.
   */
  localId?: string;
  /**
   * If idToken is STS id token, then this field will be refresh token.
   */
  refreshToken?: string;
}

function serializeSignupNewUserResponse(data: any): SignupNewUserResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
  };
}

function deserializeSignupNewUserResponse(data: any): SignupNewUserResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
  };
}

/**
 * Respone of uploading accounts in batch.
 */
export interface UploadAccountResponse {
  /**
   * The error encountered while processing the account info.
   */
  error?: {
    index?: number;
    message?: string;
  }[];
  /**
   * The fixed string "identitytoolkit#UploadAccountResponse".
   */
  kind?: string;
}

/**
 * Template for an individual account info.
 */
export interface UserInfo {
  /**
   * User creation timestamp.
   */
  createdAt?: bigint;
  /**
   * The custom attributes to be set in the user's id token.
   */
  customAttributes?: string;
  /**
   * Whether the user is authenticated by the developer.
   */
  customAuth?: boolean;
  /**
   * Whether the user is disabled.
   */
  disabled?: boolean;
  /**
   * The name of the user.
   */
  displayName?: string;
  /**
   * The email of the user.
   */
  email?: string;
  /**
   * Whether the email has been verified.
   */
  emailVerified?: boolean;
  /**
   * last login timestamp.
   */
  lastLoginAt?: bigint;
  /**
   * The local ID of the user.
   */
  localId?: string;
  /**
   * The user's hashed password.
   */
  passwordHash?: Uint8Array;
  /**
   * The timestamp when the password was last updated.
   */
  passwordUpdatedAt?: number;
  /**
   * User's phone number.
   */
  phoneNumber?: string;
  /**
   * The URL of the user profile photo.
   */
  photoUrl?: string;
  /**
   * The IDP of the user.
   */
  providerUserInfo?: {
    displayName?: string;
    email?: string;
    federatedId?: string;
    phoneNumber?: string;
    photoUrl?: string;
    providerId?: string;
    rawId?: string;
    screenName?: string;
  }[];
  /**
   * The user's plain text password.
   */
  rawPassword?: string;
  /**
   * The user's password salt.
   */
  salt?: Uint8Array;
  /**
   * User's screen name at Twitter or login name at Github.
   */
  screenName?: string;
  /**
   * Timestamp in seconds for valid login token.
   */
  validSince?: bigint;
  /**
   * Version of the user's password.
   */
  version?: number;
}

function serializeUserInfo(data: any): UserInfo {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? String(data["createdAt"]) : undefined,
    lastLoginAt: data["lastLoginAt"] !== undefined ? String(data["lastLoginAt"]) : undefined,
    passwordHash: data["passwordHash"] !== undefined ? encodeBase64(data["passwordHash"]) : undefined,
    salt: data["salt"] !== undefined ? encodeBase64(data["salt"]) : undefined,
    validSince: data["validSince"] !== undefined ? String(data["validSince"]) : undefined,
  };
}

function deserializeUserInfo(data: any): UserInfo {
  return {
    ...data,
    createdAt: data["createdAt"] !== undefined ? BigInt(data["createdAt"]) : undefined,
    lastLoginAt: data["lastLoginAt"] !== undefined ? BigInt(data["lastLoginAt"]) : undefined,
    passwordHash: data["passwordHash"] !== undefined ? decodeBase64(data["passwordHash"] as string) : undefined,
    salt: data["salt"] !== undefined ? decodeBase64(data["salt"] as string) : undefined,
    validSince: data["validSince"] !== undefined ? BigInt(data["validSince"]) : undefined,
  };
}

/**
 * Response of verifying the IDP assertion.
 */
export interface VerifyAssertionResponse {
  /**
   * The action code.
   */
  action?: string;
  /**
   * URL for OTA app installation.
   */
  appInstallationUrl?: string;
  /**
   * The custom scheme used by mobile app.
   */
  appScheme?: string;
  /**
   * The opaque value used by the client to maintain context info between the
   * authentication request and the IDP callback.
   */
  context?: string;
  /**
   * The birth date of the IdP account.
   */
  dateOfBirth?: string;
  /**
   * The display name of the user.
   */
  displayName?: string;
  /**
   * The email returned by the IdP. NOTE: The federated login user may not own
   * the email.
   */
  email?: string;
  /**
   * It's true if the email is recycled.
   */
  emailRecycled?: boolean;
  /**
   * The value is true if the IDP is also the email provider. It means the user
   * owns the email.
   */
  emailVerified?: boolean;
  /**
   * Client error code.
   */
  errorMessage?: string;
  /**
   * If idToken is STS id token, then this field will be expiration time of STS
   * id token in seconds.
   */
  expiresIn?: bigint;
  /**
   * The unique ID identifies the IdP account.
   */
  federatedId?: string;
  /**
   * The first name of the user.
   */
  firstName?: string;
  /**
   * The full name of the user.
   */
  fullName?: string;
  /**
   * The ID token.
   */
  idToken?: string;
  /**
   * It's the identifier param in the createAuthUri request if the identifier
   * is an email. It can be used to check whether the user input email is
   * different from the asserted email.
   */
  inputEmail?: string;
  /**
   * True if it's a new user sign-in, false if it's a returning user.
   */
  isNewUser?: boolean;
  /**
   * The fixed string "identitytoolkit#VerifyAssertionResponse".
   */
  kind?: string;
  /**
   * The language preference of the user.
   */
  language?: string;
  /**
   * The last name of the user.
   */
  lastName?: string;
  /**
   * The RP local ID if it's already been mapped to the IdP account identified
   * by the federated ID.
   */
  localId?: string;
  /**
   * Whether the assertion is from a non-trusted IDP and need account linking
   * confirmation.
   */
  needConfirmation?: boolean;
  /**
   * Whether need client to supply email to complete the federated login flow.
   */
  needEmail?: boolean;
  /**
   * The nick name of the user.
   */
  nickName?: string;
  /**
   * The OAuth2 access token.
   */
  oauthAccessToken?: string;
  /**
   * The OAuth2 authorization code.
   */
  oauthAuthorizationCode?: string;
  /**
   * The lifetime in seconds of the OAuth2 access token.
   */
  oauthExpireIn?: number;
  /**
   * The OIDC id token.
   */
  oauthIdToken?: string;
  /**
   * The user approved request token for the OpenID OAuth extension.
   */
  oauthRequestToken?: string;
  /**
   * The scope for the OpenID OAuth extension.
   */
  oauthScope?: string;
  /**
   * The OAuth1 access token secret.
   */
  oauthTokenSecret?: string;
  /**
   * The original email stored in the mapping storage. It's returned when the
   * federated ID is associated to a different email.
   */
  originalEmail?: string;
  /**
   * The URI of the public accessible profiel picture.
   */
  photoUrl?: string;
  /**
   * The IdP ID. For white listed IdPs it's a short domain name e.g.
   * google.com, aol.com, live.net and yahoo.com. If the "providerId" param is
   * set to OpenID OP identifer other than the whilte listed IdPs the OP
   * identifier is returned. If the "identifier" param is federated ID in the
   * createAuthUri request. The domain part of the federated ID is returned.
   */
  providerId?: string;
  /**
   * Raw IDP-returned user info.
   */
  rawUserInfo?: string;
  /**
   * If idToken is STS id token, then this field will be refresh token.
   */
  refreshToken?: string;
  /**
   * The screen_name of a Twitter user or the login name at Github.
   */
  screenName?: string;
  /**
   * The timezone of the user.
   */
  timeZone?: string;
  /**
   * When action is 'map', contains the idps which can be used for
   * confirmation.
   */
  verifiedProvider?: string[];
}

function serializeVerifyAssertionResponse(data: any): VerifyAssertionResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
  };
}

function deserializeVerifyAssertionResponse(data: any): VerifyAssertionResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
  };
}

/**
 * Response from verifying a custom token
 */
export interface VerifyCustomTokenResponse {
  /**
   * If idToken is STS id token, then this field will be expiration time of STS
   * id token in seconds.
   */
  expiresIn?: bigint;
  /**
   * The GITKit token for authenticated user.
   */
  idToken?: string;
  /**
   * True if it's a new user sign-in, false if it's a returning user.
   */
  isNewUser?: boolean;
  /**
   * The fixed string "identitytoolkit#VerifyCustomTokenResponse".
   */
  kind?: string;
  /**
   * If idToken is STS id token, then this field will be refresh token.
   */
  refreshToken?: string;
}

function serializeVerifyCustomTokenResponse(data: any): VerifyCustomTokenResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
  };
}

function deserializeVerifyCustomTokenResponse(data: any): VerifyCustomTokenResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
  };
}

/**
 * Request of verifying the password.
 */
export interface VerifyPasswordResponse {
  /**
   * The name of the user.
   */
  displayName?: string;
  /**
   * The email returned by the IdP. NOTE: The federated login user may not own
   * the email.
   */
  email?: string;
  /**
   * If idToken is STS id token, then this field will be expiration time of STS
   * id token in seconds.
   */
  expiresIn?: bigint;
  /**
   * The GITKit token for authenticated user.
   */
  idToken?: string;
  /**
   * The fixed string "identitytoolkit#VerifyPasswordResponse".
   */
  kind?: string;
  /**
   * The RP local ID if it's already been mapped to the IdP account identified
   * by the federated ID.
   */
  localId?: string;
  /**
   * The OAuth2 access token.
   */
  oauthAccessToken?: string;
  /**
   * The OAuth2 authorization code.
   */
  oauthAuthorizationCode?: string;
  /**
   * The lifetime in seconds of the OAuth2 access token.
   */
  oauthExpireIn?: number;
  /**
   * The URI of the user's photo at IdP
   */
  photoUrl?: string;
  /**
   * If idToken is STS id token, then this field will be refresh token.
   */
  refreshToken?: string;
  /**
   * Whether the email is registered.
   */
  registered?: boolean;
}

function serializeVerifyPasswordResponse(data: any): VerifyPasswordResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? String(data["expiresIn"]) : undefined,
  };
}

function deserializeVerifyPasswordResponse(data: any): VerifyPasswordResponse {
  return {
    ...data,
    expiresIn: data["expiresIn"] !== undefined ? BigInt(data["expiresIn"]) : undefined,
  };
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
