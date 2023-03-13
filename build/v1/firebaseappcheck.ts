// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Firebase App Check API Client for Deno
 * ======================================
 * 
 * Firebase App Check works alongside other Firebase services to help protect your backend resources from abuse, such as billing fraud or phishing.
 * 
 * Docs: https://firebase.google.com/docs/app-check
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Firebase App Check works alongside other Firebase services to help protect
 * your backend resources from abuse, such as billing fraud or phishing.
 */
export class FirebaseAppCheck {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://firebaseappcheck.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns a public JWK set as specified by [RFC
   * 7517](https://tools.ietf.org/html/rfc7517) that can be used to verify App
   * Check tokens. Exactly one of the public keys in the returned set will
   * successfully validate any App Check token that is currently valid.
   *
   * @param name Required. The relative resource name to the public JWK set. Must always be exactly the string `jwks`.
   */
  async jwksGet(name: string): Promise<GoogleFirebaseAppcheckV1PublicJwkSet> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFirebaseAppcheckV1PublicJwkSet;
  }

  /**
   * Atomically gets the AppAttestConfigs for the specified list of apps.
   *
   * @param parent Required. The parent project name shared by all AppAttestConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails.
   */
  async projectsAppsAppAttestConfigBatchGet(parent: string, opts: ProjectsAppsAppAttestConfigBatchGetOptions = {}): Promise<GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps/-/appAttestConfig:batchGet`);
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse(data);
  }

  /**
   * Gets the AppAttestConfig for the specified app.
   *
   * @param name Required. The relative resource name of the AppAttestConfig, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ```
   */
  async projectsAppsAppAttestConfigGet(name: string): Promise<GoogleFirebaseAppcheckV1AppAttestConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1AppAttestConfig(data);
  }

  /**
   * Updates the AppAttestConfig for the specified app. While this
   * configuration is incomplete or invalid, the app will be unable to exchange
   * AppAttest tokens for App Check tokens.
   *
   * @param name Required. The relative resource name of the App Attest configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/appAttestConfig ```
   */
  async projectsAppsAppAttestConfigPatch(name: string, req: GoogleFirebaseAppcheckV1AppAttestConfig, opts: ProjectsAppsAppAttestConfigPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1AppAttestConfig> {
    req = serializeGoogleFirebaseAppcheckV1AppAttestConfig(req);
    opts = serializeProjectsAppsAppAttestConfigPatchOptions(opts);
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
    return deserializeGoogleFirebaseAppcheckV1AppAttestConfig(data);
  }

  /**
   * Creates a new DebugToken for the specified app. For security reasons,
   * after the creation operation completes, the `token` field cannot be updated
   * or retrieved, but you can revoke the debug token using DeleteDebugToken.
   * Each app can have a maximum of 20 debug tokens.
   *
   * @param parent Required. The relative resource name of the parent app in which the specified DebugToken will be created, in the format: ``` projects/{project_number}/apps/{app_id} ```
   */
  async projectsAppsDebugTokensCreate(parent: string, req: GoogleFirebaseAppcheckV1DebugToken): Promise<GoogleFirebaseAppcheckV1DebugToken> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/debugTokens`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleFirebaseAppcheckV1DebugToken;
  }

  /**
   * Deletes the specified DebugToken. A deleted debug token cannot be used to
   * exchange for an App Check token. Use this method when you suspect the
   * secret `token` has been compromised or when you no longer need the debug
   * token.
   *
   * @param name Required. The relative resource name of the DebugToken to delete, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ```
   */
  async projectsAppsDebugTokensDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the specified DebugToken. For security reasons, the `token` field is
   * never populated in the response.
   *
   * @param name Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ```
   */
  async projectsAppsDebugTokensGet(name: string): Promise<GoogleFirebaseAppcheckV1DebugToken> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFirebaseAppcheckV1DebugToken;
  }

  /**
   * Lists all DebugTokens for the specified app. For security reasons, the
   * `token` field is never populated in the response.
   *
   * @param parent Required. The relative resource name of the parent app for which to list each associated DebugToken, in the format: ``` projects/{project_number}/apps/{app_id} ```
   */
  async projectsAppsDebugTokensList(parent: string, opts: ProjectsAppsDebugTokensListOptions = {}): Promise<GoogleFirebaseAppcheckV1ListDebugTokensResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/debugTokens`);
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
    return data as GoogleFirebaseAppcheckV1ListDebugTokensResponse;
  }

  /**
   * Updates the specified DebugToken. For security reasons, the `token` field
   * cannot be updated, nor will it be populated in the response, but you can
   * revoke the debug token using DeleteDebugToken.
   *
   * @param name Required. The relative resource name of the debug token, in the format: ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id} ```
   */
  async projectsAppsDebugTokensPatch(name: string, req: GoogleFirebaseAppcheckV1DebugToken, opts: ProjectsAppsDebugTokensPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1DebugToken> {
    opts = serializeProjectsAppsDebugTokensPatchOptions(opts);
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
    return data as GoogleFirebaseAppcheckV1DebugToken;
  }

  /**
   * Atomically gets the DeviceCheckConfigs for the specified list of apps. For
   * security reasons, the `private_key` field is never populated in the
   * response.
   *
   * @param parent Required. The parent project name shared by all DeviceCheckConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails.
   */
  async projectsAppsDeviceCheckConfigBatchGet(parent: string, opts: ProjectsAppsDeviceCheckConfigBatchGetOptions = {}): Promise<GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps/-/deviceCheckConfig:batchGet`);
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse(data);
  }

  /**
   * Gets the DeviceCheckConfig for the specified app. For security reasons,
   * the `private_key` field is never populated in the response.
   *
   * @param name Required. The relative resource name of the DeviceCheckConfig, in the format: ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ```
   */
  async projectsAppsDeviceCheckConfigGet(name: string): Promise<GoogleFirebaseAppcheckV1DeviceCheckConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1DeviceCheckConfig(data);
  }

  /**
   * Updates the DeviceCheckConfig for the specified app. While this
   * configuration is incomplete or invalid, the app will be unable to exchange
   * DeviceCheck tokens for App Check tokens. For security reasons, the
   * `private_key` field is never populated in the response.
   *
   * @param name Required. The relative resource name of the DeviceCheck configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/deviceCheckConfig ```
   */
  async projectsAppsDeviceCheckConfigPatch(name: string, req: GoogleFirebaseAppcheckV1DeviceCheckConfig, opts: ProjectsAppsDeviceCheckConfigPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1DeviceCheckConfig> {
    req = serializeGoogleFirebaseAppcheckV1DeviceCheckConfig(req);
    opts = serializeProjectsAppsDeviceCheckConfigPatchOptions(opts);
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
    return deserializeGoogleFirebaseAppcheckV1DeviceCheckConfig(data);
  }

  /**
   * Accepts an App Attest assertion and an artifact previously obtained from
   * ExchangeAppAttestAttestation and verifies those with Apple. If valid,
   * returns an AppCheckToken.
   *
   * @param app Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeAppAttestAssertion(app: string, req: GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    req = serializeGoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeAppAttestAssertion`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Accepts an App Attest CBOR attestation and verifies it with Apple using
   * your preconfigured team and bundle IDs. If valid, returns an attestation
   * artifact that can later be exchanged for an AppCheckToken using
   * ExchangeAppAttestAssertion. For convenience and performance, this method's
   * response object will also contain an AppCheckToken (if the verification is
   * successful).
   *
   * @param app Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeAppAttestAttestation(app: string, req: GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest): Promise<GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse> {
    req = serializeGoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeAppAttestAttestation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse(data);
  }

  /**
   * Validates a custom token signed using your project's Admin SDK service
   * account credentials. If valid, returns an AppCheckToken.
   *
   * @param app Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeCustomToken(app: string, req: GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeCustomToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Validates a debug token secret that you have previously created using
   * CreateDebugToken. If valid, returns an AppCheckToken. Note that a
   * restrictive quota is enforced on this method to prevent accidental exposure
   * of the app to abuse.
   *
   * @param app Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeDebugToken(app: string, req: GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeDebugToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Accepts a
   * [`device_token`](https://developer.apple.com/documentation/devicecheck/dcdevice)
   * issued by DeviceCheck, and attempts to validate it with Apple. If valid,
   * returns an AppCheckToken.
   *
   * @param app Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeDeviceCheckToken(app: string, req: GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeDeviceCheckToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Validates an [integrity verdict response token from Play
   * Integrity](https://developer.android.com/google/play/integrity/verdict#decrypt-verify).
   * If valid, returns an AppCheckToken.
   *
   * @param app Required. The relative resource name of the Android app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangePlayIntegrityToken(app: string, req: GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangePlayIntegrityToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Validates a [reCAPTCHA Enterprise response
   * token](https://cloud.google.com/recaptcha-enterprise/docs/create-assessment#retrieve_token).
   * If valid, returns an AppCheckToken.
   *
   * @param app Required. The relative resource name of the web app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeRecaptchaEnterpriseToken(app: string, req: GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeRecaptchaEnterpriseToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Validates a [reCAPTCHA v3 response
   * token](https://developers.google.com/recaptcha/docs/v3). If valid, returns
   * an AppCheckToken.
   *
   * @param app Required. The relative resource name of the web app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeRecaptchaV3Token(app: string, req: GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeRecaptchaV3Token`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Validates a [SafetyNet
   * token](https://developer.android.com/training/safetynet/attestation#request-attestation-step).
   * If valid, returns an AppCheckToken.
   *
   * @param app Required. The relative resource name of the Android app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsExchangeSafetyNetToken(app: string, req: GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest): Promise<GoogleFirebaseAppcheckV1AppCheckToken> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:exchangeSafetyNetToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1AppCheckToken(data);
  }

  /**
   * Generates a challenge that protects the integrity of an immediately
   * following call to ExchangeAppAttestAttestation or
   * ExchangeAppAttestAssertion. A challenge should not be reused for multiple
   * calls.
   *
   * @param app Required. The relative resource name of the iOS app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsGenerateAppAttestChallenge(app: string, req: GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest): Promise<GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:generateAppAttestChallenge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse(data);
  }

  /**
   * Generates a challenge that protects the integrity of an immediately
   * following integrity verdict request to the Play Integrity API. The next
   * call to ExchangePlayIntegrityToken using the resulting integrity token will
   * verify the presence and validity of the challenge. A challenge should not
   * be reused for multiple calls.
   *
   * @param app Required. The relative resource name of the app, in the format: ``` projects/{project_number}/apps/{app_id} ``` If necessary, the `project_number` element can be replaced with the project ID of the Firebase project. Learn more about using project identifiers in Google's [AIP 2510](https://google.aip.dev/cloud/2510) standard.
   */
  async projectsAppsGeneratePlayIntegrityChallenge(app: string, req: GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest): Promise<GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ app }:generatePlayIntegrityChallenge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse(data);
  }

  /**
   * Atomically gets the PlayIntegrityConfigs for the specified list of apps.
   *
   * @param parent Required. The parent project name shared by all PlayIntegrityConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails.
   */
  async projectsAppsPlayIntegrityConfigBatchGet(parent: string, opts: ProjectsAppsPlayIntegrityConfigBatchGetOptions = {}): Promise<GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps/-/playIntegrityConfig:batchGet`);
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse(data);
  }

  /**
   * Gets the PlayIntegrityConfig for the specified app.
   *
   * @param name Required. The relative resource name of the PlayIntegrityConfig, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ```
   */
  async projectsAppsPlayIntegrityConfigGet(name: string): Promise<GoogleFirebaseAppcheckV1PlayIntegrityConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1PlayIntegrityConfig(data);
  }

  /**
   * Updates the PlayIntegrityConfig for the specified app. While this
   * configuration is incomplete or invalid, the app will be unable to exchange
   * Play Integrity tokens for App Check tokens.
   *
   * @param name Required. The relative resource name of the Play Integrity configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/playIntegrityConfig ```
   */
  async projectsAppsPlayIntegrityConfigPatch(name: string, req: GoogleFirebaseAppcheckV1PlayIntegrityConfig, opts: ProjectsAppsPlayIntegrityConfigPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1PlayIntegrityConfig> {
    req = serializeGoogleFirebaseAppcheckV1PlayIntegrityConfig(req);
    opts = serializeProjectsAppsPlayIntegrityConfigPatchOptions(opts);
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
    return deserializeGoogleFirebaseAppcheckV1PlayIntegrityConfig(data);
  }

  /**
   * Atomically gets the RecaptchaEnterpriseConfigs for the specified list of
   * apps.
   *
   * @param parent Required. The parent project name shared by all RecaptchaEnterpriseConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails.
   */
  async projectsAppsRecaptchaEnterpriseConfigBatchGet(parent: string, opts: ProjectsAppsRecaptchaEnterpriseConfigBatchGetOptions = {}): Promise<GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps/-/recaptchaEnterpriseConfig:batchGet`);
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse(data);
  }

  /**
   * Gets the RecaptchaEnterpriseConfig for the specified app.
   *
   * @param name Required. The relative resource name of the RecaptchaEnterpriseConfig, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ```
   */
  async projectsAppsRecaptchaEnterpriseConfigGet(name: string): Promise<GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig(data);
  }

  /**
   * Updates the RecaptchaEnterpriseConfig for the specified app. While this
   * configuration is incomplete or invalid, the app will be unable to exchange
   * reCAPTCHA Enterprise tokens for App Check tokens.
   *
   * @param name Required. The relative resource name of the reCAPTCHA Enterprise configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ```
   */
  async projectsAppsRecaptchaEnterpriseConfigPatch(name: string, req: GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig, opts: ProjectsAppsRecaptchaEnterpriseConfigPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig> {
    req = serializeGoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig(req);
    opts = serializeProjectsAppsRecaptchaEnterpriseConfigPatchOptions(opts);
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
    return deserializeGoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig(data);
  }

  /**
   * Atomically gets the RecaptchaV3Configs for the specified list of apps. For
   * security reasons, the `site_secret` field is never populated in the
   * response.
   *
   * @param parent Required. The parent project name shared by all RecaptchaV3Configs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails.
   */
  async projectsAppsRecaptchaV3ConfigBatchGet(parent: string, opts: ProjectsAppsRecaptchaV3ConfigBatchGetOptions = {}): Promise<GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps/-/recaptchaV3Config:batchGet`);
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse(data);
  }

  /**
   * Gets the RecaptchaV3Config for the specified app. For security reasons,
   * the `site_secret` field is never populated in the response.
   *
   * @param name Required. The relative resource name of the RecaptchaV3Config, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ```
   */
  async projectsAppsRecaptchaV3ConfigGet(name: string): Promise<GoogleFirebaseAppcheckV1RecaptchaV3Config> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1RecaptchaV3Config(data);
  }

  /**
   * Updates the RecaptchaV3Config for the specified app. While this
   * configuration is incomplete or invalid, the app will be unable to exchange
   * reCAPTCHA tokens for App Check tokens. For security reasons, the
   * `site_secret` field is never populated in the response.
   *
   * @param name Required. The relative resource name of the reCAPTCHA v3 configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/recaptchaV3Config ```
   */
  async projectsAppsRecaptchaV3ConfigPatch(name: string, req: GoogleFirebaseAppcheckV1RecaptchaV3Config, opts: ProjectsAppsRecaptchaV3ConfigPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1RecaptchaV3Config> {
    req = serializeGoogleFirebaseAppcheckV1RecaptchaV3Config(req);
    opts = serializeProjectsAppsRecaptchaV3ConfigPatchOptions(opts);
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
    return deserializeGoogleFirebaseAppcheckV1RecaptchaV3Config(data);
  }

  /**
   * Atomically gets the SafetyNetConfigs for the specified list of apps.
   *
   * @param parent Required. The parent project name shared by all SafetyNetConfigs being retrieved, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being retrieved must match this field, or the entire batch fails.
   */
  async projectsAppsSafetyNetConfigBatchGet(parent: string, opts: ProjectsAppsSafetyNetConfigBatchGetOptions = {}): Promise<GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apps/-/safetyNetConfig:batchGet`);
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse(data);
  }

  /**
   * Gets the SafetyNetConfig for the specified app.
   *
   * @param name Required. The relative resource name of the SafetyNetConfig, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ```
   */
  async projectsAppsSafetyNetConfigGet(name: string): Promise<GoogleFirebaseAppcheckV1SafetyNetConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleFirebaseAppcheckV1SafetyNetConfig(data);
  }

  /**
   * Updates the SafetyNetConfig for the specified app. While this
   * configuration is incomplete or invalid, the app will be unable to exchange
   * SafetyNet tokens for App Check tokens.
   *
   * @param name Required. The relative resource name of the SafetyNet configuration object, in the format: ``` projects/{project_number}/apps/{app_id}/safetyNetConfig ```
   */
  async projectsAppsSafetyNetConfigPatch(name: string, req: GoogleFirebaseAppcheckV1SafetyNetConfig, opts: ProjectsAppsSafetyNetConfigPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1SafetyNetConfig> {
    req = serializeGoogleFirebaseAppcheckV1SafetyNetConfig(req);
    opts = serializeProjectsAppsSafetyNetConfigPatchOptions(opts);
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
    return deserializeGoogleFirebaseAppcheckV1SafetyNetConfig(data);
  }

  /**
   * Atomically updates the specified Service configurations.
   *
   * @param parent Required. The parent project name shared by all Service configurations being updated, in the format ``` projects/{project_number} ``` The parent collection in the `name` field of any resource being updated must match this field, or the entire batch fails.
   */
  async projectsServicesBatchUpdate(parent: string, req: GoogleFirebaseAppcheckV1BatchUpdateServicesRequest): Promise<GoogleFirebaseAppcheckV1BatchUpdateServicesResponse> {
    req = serializeGoogleFirebaseAppcheckV1BatchUpdateServicesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/services:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleFirebaseAppcheckV1BatchUpdateServicesResponse;
  }

  /**
   * Gets the Service configuration for the specified service name.
   *
   * @param name Required. The relative resource name of the Service to retrieve, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore)
   */
  async projectsServicesGet(name: string): Promise<GoogleFirebaseAppcheckV1Service> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleFirebaseAppcheckV1Service;
  }

  /**
   * Lists all Service configurations for the specified project. Only Services
   * which were explicitly configured using UpdateService or BatchUpdateServices
   * will be returned.
   *
   * @param parent Required. The relative resource name of the parent project for which to list each associated Service, in the format: ``` projects/{project_number} ```
   */
  async projectsServicesList(parent: string, opts: ProjectsServicesListOptions = {}): Promise<GoogleFirebaseAppcheckV1ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/services`);
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
    return data as GoogleFirebaseAppcheckV1ListServicesResponse;
  }

  /**
   * Updates the specified Service configuration.
   *
   * @param name Required. The relative resource name of the service configuration object, in the format: ``` projects/{project_number}/services/{service_id} ``` Note that the `service_id` element must be a supported service ID. Currently, the following service IDs are supported: * `firebasestorage.googleapis.com` (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase Realtime Database) * `firestore.googleapis.com` (Cloud Firestore)
   */
  async projectsServicesPatch(name: string, req: GoogleFirebaseAppcheckV1Service, opts: ProjectsServicesPatchOptions = {}): Promise<GoogleFirebaseAppcheckV1Service> {
    opts = serializeProjectsServicesPatchOptions(opts);
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
    return data as GoogleFirebaseAppcheckV1Service;
  }
}

/**
 * An app's App Attest configuration object. This configuration controls
 * certain properties of the `AppCheckToken` returned by
 * ExchangeAppAttestAttestation and ExchangeAppAttestAssertion, such as its ttl.
 * Note that the Team ID registered with your app is used as part of the
 * validation process. Please register it via the Firebase Console or
 * programmatically via the [Firebase Management
 * Service](https://firebase.google.com/docs/projects/api/reference/rest/v11/projects.iosApps/patch).
 */
export interface GoogleFirebaseAppcheckV1AppAttestConfig {
  /**
   * Required. The relative resource name of the App Attest configuration
   * object, in the format: ```
   * projects/{project_number}/apps/{app_id}/appAttestConfig ```
   */
  name?: string;
  /**
   * Specifies the duration for which App Check tokens exchanged from App
   * Attest artifacts will be valid. If unset, a default value of 1 hour is
   * assumed. Must be between 30 minutes and 7 days, inclusive.
   */
  tokenTtl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1AppAttestConfig(data: any): GoogleFirebaseAppcheckV1AppAttestConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1AppAttestConfig(data: any): GoogleFirebaseAppcheckV1AppAttestConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

/**
 * Encapsulates an *App Check token*, which are used to access Firebase
 * services protected by App Check.
 */
export interface GoogleFirebaseAppcheckV1AppCheckToken {
  /**
   * The App Check token. App Check tokens are signed
   * [JWTs](https://tools.ietf.org/html/rfc7519) containing claims that identify
   * the attested app and Firebase project. This token is used to access
   * Firebase services protected by App Check. These tokens can also be
   * [verified by your own custom
   * backends](https://firebase.google.com/docs/app-check/custom-resource-backend)
   * using the Firebase Admin SDK.
   */
  token?: string;
  /**
   * The duration from the time this token is minted until its expiration. This
   * field is intended to ease client-side token management, since the client
   * may have clock skew, but is still able to accurately measure a duration.
   */
  ttl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1AppCheckToken(data: any): GoogleFirebaseAppcheckV1AppCheckToken {
  return {
    ...data,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1AppCheckToken(data: any): GoogleFirebaseAppcheckV1AppCheckToken {
  return {
    ...data,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * Response message for the BatchGetAppAttestConfigs method.
 */
export interface GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse {
  /**
   * AppAttestConfigs retrieved.
   */
  configs?: GoogleFirebaseAppcheckV1AppAttestConfig[];
}

function serializeGoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (serializeGoogleFirebaseAppcheckV1AppAttestConfig(item))) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetAppAttestConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (deserializeGoogleFirebaseAppcheckV1AppAttestConfig(item))) : undefined,
  };
}

/**
 * Response message for the BatchGetDeviceCheckConfigs method.
 */
export interface GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse {
  /**
   * DeviceCheckConfigs retrieved.
   */
  configs?: GoogleFirebaseAppcheckV1DeviceCheckConfig[];
}

function serializeGoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (serializeGoogleFirebaseAppcheckV1DeviceCheckConfig(item))) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetDeviceCheckConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (deserializeGoogleFirebaseAppcheckV1DeviceCheckConfig(item))) : undefined,
  };
}

/**
 * Response message for the BatchGetPlayIntegrityConfigs method.
 */
export interface GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse {
  /**
   * PlayIntegrityConfigs retrieved.
   */
  configs?: GoogleFirebaseAppcheckV1PlayIntegrityConfig[];
}

function serializeGoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (serializeGoogleFirebaseAppcheckV1PlayIntegrityConfig(item))) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetPlayIntegrityConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (deserializeGoogleFirebaseAppcheckV1PlayIntegrityConfig(item))) : undefined,
  };
}

/**
 * Response message for the BatchGetRecaptchaEnterpriseConfigs method.
 */
export interface GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse {
  /**
   * RecaptchaEnterpriseConfigs retrieved.
   */
  configs?: GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig[];
}

function serializeGoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (serializeGoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig(item))) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetRecaptchaEnterpriseConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (deserializeGoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig(item))) : undefined,
  };
}

/**
 * Response message for the BatchGetRecaptchaV3Configs method.
 */
export interface GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse {
  /**
   * RecaptchaV3Configs retrieved.
   */
  configs?: GoogleFirebaseAppcheckV1RecaptchaV3Config[];
}

function serializeGoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (serializeGoogleFirebaseAppcheckV1RecaptchaV3Config(item))) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetRecaptchaV3ConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (deserializeGoogleFirebaseAppcheckV1RecaptchaV3Config(item))) : undefined,
  };
}

/**
 * Response message for the BatchGetSafetyNetConfigs method.
 */
export interface GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse {
  /**
   * SafetyNetConfigs retrieved.
   */
  configs?: GoogleFirebaseAppcheckV1SafetyNetConfig[];
}

function serializeGoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (serializeGoogleFirebaseAppcheckV1SafetyNetConfig(item))) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse(data: any): GoogleFirebaseAppcheckV1BatchGetSafetyNetConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (deserializeGoogleFirebaseAppcheckV1SafetyNetConfig(item))) : undefined,
  };
}

/**
 * Request message for the BatchUpdateServices method.
 */
export interface GoogleFirebaseAppcheckV1BatchUpdateServicesRequest {
  /**
   * Required. The request messages specifying the Services to update. A
   * maximum of 100 objects can be updated in a batch.
   */
  requests?: GoogleFirebaseAppcheckV1UpdateServiceRequest[];
  /**
   * Optional. A comma-separated list of names of fields in the Services to
   * update. Example: `display_name`. If the `update_mask` field is set in both
   * this request and any of the UpdateServiceRequest messages, they must match
   * or the entire batch fails and no updates will be committed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleFirebaseAppcheckV1BatchUpdateServicesRequest(data: any): GoogleFirebaseAppcheckV1BatchUpdateServicesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeGoogleFirebaseAppcheckV1UpdateServiceRequest(item))) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1BatchUpdateServicesRequest(data: any): GoogleFirebaseAppcheckV1BatchUpdateServicesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeGoogleFirebaseAppcheckV1UpdateServiceRequest(item))) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response message for the BatchUpdateServices method.
 */
export interface GoogleFirebaseAppcheckV1BatchUpdateServicesResponse {
  /**
   * Service objects after the updates have been applied.
   */
  services?: GoogleFirebaseAppcheckV1Service[];
}

/**
 * A *debug token* is a secret used during the development or integration
 * testing of an app. It essentially allows the development or integration
 * testing to bypass app attestation while still allowing App Check to enforce
 * protection on supported production Firebase services.
 */
export interface GoogleFirebaseAppcheckV1DebugToken {
  /**
   * Required. A human readable display name used to identify this debug token.
   */
  displayName?: string;
  /**
   * Required. The relative resource name of the debug token, in the format:
   * ``` projects/{project_number}/apps/{app_id}/debugTokens/{debug_token_id}
   * ```
   */
  name?: string;
  /**
   * Required. Input only. Immutable. The secret token itself. Must be provided
   * during creation, and must be a UUID4, case insensitive. This field is
   * immutable once set, and cannot be provided during an UpdateDebugToken
   * request. You can, however, delete this debug token using DeleteDebugToken
   * to revoke it. For security reasons, this field will never be populated in
   * any response.
   */
  token?: string;
}

/**
 * An app's DeviceCheck configuration object. This configuration is used by
 * ExchangeDeviceCheckToken to validate device tokens issued to apps by
 * DeviceCheck. It also controls certain properties of the returned
 * `AppCheckToken`, such as its ttl. Note that the Team ID registered with your
 * app is used as part of the validation process. Please register it via the
 * Firebase Console or programmatically via the [Firebase Management
 * Service](https://firebase.google.com/docs/projects/api/reference/rest/v11/projects.iosApps/patch).
 */
export interface GoogleFirebaseAppcheckV1DeviceCheckConfig {
  /**
   * Required. The key identifier of a private key enabled with DeviceCheck,
   * created in your Apple Developer account.
   */
  keyId?: string;
  /**
   * Required. The relative resource name of the DeviceCheck configuration
   * object, in the format: ```
   * projects/{project_number}/apps/{app_id}/deviceCheckConfig ```
   */
  name?: string;
  /**
   * Required. Input only. The contents of the private key (`.p8`) file
   * associated with the key specified by `key_id`. For security reasons, this
   * field will never be populated in any response.
   */
  privateKey?: string;
  /**
   * Output only. Whether the `private_key` field was previously set. Since we
   * will never return the `private_key` field, this field is the only way to
   * find out whether it was previously set.
   */
  readonly privateKeySet?: boolean;
  /**
   * Specifies the duration for which App Check tokens exchanged from
   * DeviceCheck tokens will be valid. If unset, a default value of 1 hour is
   * assumed. Must be between 30 minutes and 7 days, inclusive.
   */
  tokenTtl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1DeviceCheckConfig(data: any): GoogleFirebaseAppcheckV1DeviceCheckConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1DeviceCheckConfig(data: any): GoogleFirebaseAppcheckV1DeviceCheckConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

/**
 * Request message for the ExchangeAppAttestAssertion method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest {
  /**
   * Required. The artifact returned by a previous call to
   * ExchangeAppAttestAttestation.
   */
  artifact?: Uint8Array;
  /**
   * Required. The CBOR-encoded assertion returned by the client-side App
   * Attest API.
   */
  assertion?: Uint8Array;
  /**
   * Required. A one-time challenge returned by an immediately prior call to
   * GenerateAppAttestChallenge.
   */
  challenge?: Uint8Array;
}

function serializeGoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest(data: any): GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest {
  return {
    ...data,
    artifact: data["artifact"] !== undefined ? encodeBase64(data["artifact"]) : undefined,
    assertion: data["assertion"] !== undefined ? encodeBase64(data["assertion"]) : undefined,
    challenge: data["challenge"] !== undefined ? encodeBase64(data["challenge"]) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest(data: any): GoogleFirebaseAppcheckV1ExchangeAppAttestAssertionRequest {
  return {
    ...data,
    artifact: data["artifact"] !== undefined ? decodeBase64(data["artifact"] as string) : undefined,
    assertion: data["assertion"] !== undefined ? decodeBase64(data["assertion"] as string) : undefined,
    challenge: data["challenge"] !== undefined ? decodeBase64(data["challenge"] as string) : undefined,
  };
}

/**
 * Request message for the ExchangeAppAttestAttestation method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest {
  /**
   * Required. The App Attest statement returned by the client-side App Attest
   * API. This is a base64url encoded CBOR object in the JSON response.
   */
  attestationStatement?: Uint8Array;
  /**
   * Required. A one-time challenge returned by an immediately prior call to
   * GenerateAppAttestChallenge.
   */
  challenge?: Uint8Array;
  /**
   * Required. The key ID generated by App Attest for the client app.
   */
  keyId?: Uint8Array;
}

function serializeGoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest(data: any): GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest {
  return {
    ...data,
    attestationStatement: data["attestationStatement"] !== undefined ? encodeBase64(data["attestationStatement"]) : undefined,
    challenge: data["challenge"] !== undefined ? encodeBase64(data["challenge"]) : undefined,
    keyId: data["keyId"] !== undefined ? encodeBase64(data["keyId"]) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest(data: any): GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationRequest {
  return {
    ...data,
    attestationStatement: data["attestationStatement"] !== undefined ? decodeBase64(data["attestationStatement"] as string) : undefined,
    challenge: data["challenge"] !== undefined ? decodeBase64(data["challenge"] as string) : undefined,
    keyId: data["keyId"] !== undefined ? decodeBase64(data["keyId"] as string) : undefined,
  };
}

/**
 * Response message for the ExchangeAppAttestAttestation method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse {
  /**
   * Encapsulates an App Check token.
   */
  appCheckToken?: GoogleFirebaseAppcheckV1AppCheckToken;
  /**
   * An artifact that can be used in future calls to
   * ExchangeAppAttestAssertion.
   */
  artifact?: Uint8Array;
}

function serializeGoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse(data: any): GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse {
  return {
    ...data,
    appCheckToken: data["appCheckToken"] !== undefined ? serializeGoogleFirebaseAppcheckV1AppCheckToken(data["appCheckToken"]) : undefined,
    artifact: data["artifact"] !== undefined ? encodeBase64(data["artifact"]) : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse(data: any): GoogleFirebaseAppcheckV1ExchangeAppAttestAttestationResponse {
  return {
    ...data,
    appCheckToken: data["appCheckToken"] !== undefined ? deserializeGoogleFirebaseAppcheckV1AppCheckToken(data["appCheckToken"]) : undefined,
    artifact: data["artifact"] !== undefined ? decodeBase64(data["artifact"] as string) : undefined,
  };
}

/**
 * Request message for the ExchangeCustomToken method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeCustomTokenRequest {
  /**
   * Required. A custom token signed using your project's Admin SDK service
   * account credentials.
   */
  customToken?: string;
}

/**
 * Request message for the ExchangeDebugToken method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeDebugTokenRequest {
  /**
   * Required. A debug token secret. This string must match a debug token
   * secret previously created using CreateDebugToken.
   */
  debugToken?: string;
}

/**
 * Request message for the ExchangeDeviceCheckToken method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeDeviceCheckTokenRequest {
  /**
   * Required. The `device_token` as returned by Apple's client-side
   * [DeviceCheck
   * API](https://developer.apple.com/documentation/devicecheck/dcdevice). This
   * is the base64 encoded `Data` (Swift) or `NSData` (ObjC) object.
   */
  deviceToken?: string;
}

/**
 * Request message for the ExchangePlayIntegrityToken method.
 */
export interface GoogleFirebaseAppcheckV1ExchangePlayIntegrityTokenRequest {
  /**
   * Required. The [integrity verdict response token from Play
   * Integrity](https://developer.android.com/google/play/integrity/verdict#decrypt-verify)
   * issued to your app.
   */
  playIntegrityToken?: string;
}

/**
 * Request message for the ExchangeRecaptchaEnterpriseToken method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeRecaptchaEnterpriseTokenRequest {
  /**
   * Required. The reCAPTCHA token as returned by the [reCAPTCHA Enterprise
   * JavaScript
   * API](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages).
   */
  recaptchaEnterpriseToken?: string;
}

/**
 * Request message for the ExchangeRecaptchaV3Token method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeRecaptchaV3TokenRequest {
  /**
   * Required. The reCAPTCHA token as returned by the [reCAPTCHA v3 JavaScript
   * API](https://developers.google.com/recaptcha/docs/v3).
   */
  recaptchaV3Token?: string;
}

/**
 * Request message for the ExchangeSafetyNetToken method.
 */
export interface GoogleFirebaseAppcheckV1ExchangeSafetyNetTokenRequest {
  /**
   * Required. The [SafetyNet attestation
   * response](https://developer.android.com/training/safetynet/attestation#request-attestation-step)
   * issued to your app.
   */
  safetyNetToken?: string;
}

/**
 * Request message for the GenerateAppAttestChallenge method.
 */
export interface GoogleFirebaseAppcheckV1GenerateAppAttestChallengeRequest {
}

/**
 * Response message for the GenerateAppAttestChallenge method.
 */
export interface GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse {
  /**
   * A one-time use challenge for the client to pass to the App Attest API.
   */
  challenge?: Uint8Array;
  /**
   * The duration from the time this challenge is minted until its expiration.
   * This field is intended to ease client-side token management, since the
   * client may have clock skew, but is still able to accurately measure a
   * duration.
   */
  ttl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse(data: any): GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse {
  return {
    ...data,
    challenge: data["challenge"] !== undefined ? encodeBase64(data["challenge"]) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse(data: any): GoogleFirebaseAppcheckV1GenerateAppAttestChallengeResponse {
  return {
    ...data,
    challenge: data["challenge"] !== undefined ? decodeBase64(data["challenge"] as string) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * Request message for the GeneratePlayIntegrityChallenge method.
 */
export interface GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeRequest {
}

/**
 * Response message for the GeneratePlayIntegrityChallenge method.
 */
export interface GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse {
  /**
   * A one-time use
   * [challenge](https://developer.android.com/google/play/integrity/verdict#protect-against-replay-attacks)
   * for the client to pass to the Play Integrity API.
   */
  challenge?: string;
  /**
   * The duration from the time this challenge is minted until its expiration.
   * This field is intended to ease client-side token management, since the
   * client may have clock skew, but is still able to accurately measure a
   * duration.
   */
  ttl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse(data: any): GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse {
  return {
    ...data,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse(data: any): GoogleFirebaseAppcheckV1GeneratePlayIntegrityChallengeResponse {
  return {
    ...data,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * Response message for the ListDebugTokens method.
 */
export interface GoogleFirebaseAppcheckV1ListDebugTokensResponse {
  /**
   * The DebugTokens retrieved.
   */
  debugTokens?: GoogleFirebaseAppcheckV1DebugToken[];
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty or omitted, then this response is the
   * last page of results. This token can be used in a subsequent call to
   * ListDebugTokens to find the next group of DebugTokens. Page tokens are
   * short-lived and should not be persisted.
   */
  nextPageToken?: string;
}

/**
 * Response message for the ListServices method.
 */
export interface GoogleFirebaseAppcheckV1ListServicesResponse {
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty or omitted, then this response is the
   * last page of results. This token can be used in a subsequent call to
   * ListServices to find the next group of Services. Page tokens are
   * short-lived and should not be persisted.
   */
  nextPageToken?: string;
  /**
   * The Services retrieved.
   */
  services?: GoogleFirebaseAppcheckV1Service[];
}

/**
 * An app's Play Integrity configuration object. This configuration controls
 * certain properties of the `AppCheckToken` returned by
 * ExchangePlayIntegrityToken, such as its ttl. Note that your registered
 * SHA-256 certificate fingerprints are used to validate tokens issued by the
 * Play Integrity API; please register them via the Firebase Console or
 * programmatically via the [Firebase Management
 * Service](https://firebase.google.com/docs/projects/api/reference/rest/v1beta1/projects.androidApps.sha/create).
 */
export interface GoogleFirebaseAppcheckV1PlayIntegrityConfig {
  /**
   * Required. The relative resource name of the Play Integrity configuration
   * object, in the format: ```
   * projects/{project_number}/apps/{app_id}/playIntegrityConfig ```
   */
  name?: string;
  /**
   * Specifies the duration for which App Check tokens exchanged from Play
   * Integrity tokens will be valid. If unset, a default value of 1 hour is
   * assumed. Must be between 30 minutes and 7 days, inclusive.
   */
  tokenTtl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1PlayIntegrityConfig(data: any): GoogleFirebaseAppcheckV1PlayIntegrityConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1PlayIntegrityConfig(data: any): GoogleFirebaseAppcheckV1PlayIntegrityConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

/**
 * A JWK as specified by [section 4 of RFC
 * 7517](https://tools.ietf.org/html/rfc7517#section-4) and [section 6.3.1 of
 * RFC 7518](https://tools.ietf.org/html/rfc7518#section-6.3.1).
 */
export interface GoogleFirebaseAppcheckV1PublicJwk {
  /**
   * See [section 4.4 of RFC
   * 7517](https://tools.ietf.org/html/rfc7517#section-4.4).
   */
  alg?: string;
  /**
   * See [section 6.3.1.2 of RFC
   * 7518](https://tools.ietf.org/html/rfc7518#section-6.3.1.2).
   */
  e?: string;
  /**
   * See [section 4.5 of RFC
   * 7517](https://tools.ietf.org/html/rfc7517#section-4.5).
   */
  kid?: string;
  /**
   * See [section 4.1 of RFC
   * 7517](https://tools.ietf.org/html/rfc7517#section-4.1).
   */
  kty?: string;
  /**
   * See [section 6.3.1.1 of RFC
   * 7518](https://tools.ietf.org/html/rfc7518#section-6.3.1.1).
   */
  n?: string;
  /**
   * See [section 4.2 of RFC
   * 7517](https://tools.ietf.org/html/rfc7517#section-4.2).
   */
  use?: string;
}

/**
 * The currently active set of public keys that can be used to verify App Check
 * tokens. This object is a JWK set as specified by [section 5 of RFC
 * 7517](https://tools.ietf.org/html/rfc7517#section-5). For security, the
 * response **must not** be cached for longer than six hours.
 */
export interface GoogleFirebaseAppcheckV1PublicJwkSet {
  /**
   * The set of public keys. See [section 5.1 of RFC
   * 7517](https://tools.ietf.org/html/rfc7517#section-5).
   */
  keys?: GoogleFirebaseAppcheckV1PublicJwk[];
}

/**
 * An app's reCAPTCHA Enterprise configuration object. This configuration is
 * used by ExchangeRecaptchaEnterpriseToken to validate reCAPTCHA tokens issued
 * to apps by reCAPTCHA Enterprise. It also controls certain properties of the
 * returned `AppCheckToken`, such as its ttl.
 */
export interface GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig {
  /**
   * Required. The relative resource name of the reCAPTCHA Enterprise
   * configuration object, in the format: ```
   * projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ```
   */
  name?: string;
  /**
   * The score-based site key [created in reCAPTCHA
   * Enterprise](https://cloud.google.com/recaptcha-enterprise/docs/create-key#creating_a_site_key)
   * used to [invoke reCAPTCHA and generate the reCAPTCHA
   * tokens](https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages)
   * for your application. Important: This is *not* the `site_secret` (as it is
   * in reCAPTCHA v3), but rather your score-based reCAPTCHA Enterprise site
   * key.
   */
  siteKey?: string;
  /**
   * Specifies the duration for which App Check tokens exchanged from reCAPTCHA
   * Enterprise tokens will be valid. If unset, a default value of 1 hour is
   * assumed. Must be between 30 minutes and 7 days, inclusive.
   */
  tokenTtl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig(data: any): GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig(data: any): GoogleFirebaseAppcheckV1RecaptchaEnterpriseConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

/**
 * An app's reCAPTCHA v3 configuration object. This configuration is used by
 * ExchangeRecaptchaV3Token to validate reCAPTCHA tokens issued to apps by
 * reCAPTCHA v3. It also controls certain properties of the returned
 * `AppCheckToken`, such as its ttl.
 */
export interface GoogleFirebaseAppcheckV1RecaptchaV3Config {
  /**
   * Required. The relative resource name of the reCAPTCHA v3 configuration
   * object, in the format: ```
   * projects/{project_number}/apps/{app_id}/recaptchaV3Config ```
   */
  name?: string;
  /**
   * Required. Input only. The site secret used to identify your service for
   * reCAPTCHA v3 verification. For security reasons, this field will never be
   * populated in any response.
   */
  siteSecret?: string;
  /**
   * Output only. Whether the `site_secret` field was previously set. Since we
   * will never return the `site_secret` field, this field is the only way to
   * find out whether it was previously set.
   */
  readonly siteSecretSet?: boolean;
  /**
   * Specifies the duration for which App Check tokens exchanged from reCAPTCHA
   * tokens will be valid. If unset, a default value of 1 day is assumed. Must
   * be between 30 minutes and 7 days, inclusive.
   */
  tokenTtl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1RecaptchaV3Config(data: any): GoogleFirebaseAppcheckV1RecaptchaV3Config {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1RecaptchaV3Config(data: any): GoogleFirebaseAppcheckV1RecaptchaV3Config {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

/**
 * An app's SafetyNet configuration object. This configuration controls certain
 * properties of the `AppCheckToken` returned by ExchangeSafetyNetToken, such as
 * its ttl. Note that your registered SHA-256 certificate fingerprints are used
 * to validate tokens issued by SafetyNet; please register them via the Firebase
 * Console or programmatically via the [Firebase Management
 * Service](https://firebase.google.com/docs/projects/api/reference/rest/v11/projects.androidApps.sha/create).
 */
export interface GoogleFirebaseAppcheckV1SafetyNetConfig {
  /**
   * Required. The relative resource name of the SafetyNet configuration
   * object, in the format: ```
   * projects/{project_number}/apps/{app_id}/safetyNetConfig ```
   */
  name?: string;
  /**
   * Specifies the duration for which App Check tokens exchanged from SafetyNet
   * tokens will be valid. If unset, a default value of 1 hour is assumed. Must
   * be between 30 minutes and 7 days, inclusive.
   */
  tokenTtl?: number /* Duration */;
}

function serializeGoogleFirebaseAppcheckV1SafetyNetConfig(data: any): GoogleFirebaseAppcheckV1SafetyNetConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1SafetyNetConfig(data: any): GoogleFirebaseAppcheckV1SafetyNetConfig {
  return {
    ...data,
    tokenTtl: data["tokenTtl"] !== undefined ? data["tokenTtl"] : undefined,
  };
}

/**
 * The enforcement configuration for a Firebase service supported by App Check.
 */
export interface GoogleFirebaseAppcheckV1Service {
  /**
   * Required. The App Check enforcement mode for this service.
   */
  enforcementMode?:  | "OFF" | "UNENFORCED" | "ENFORCED";
  /**
   * Required. The relative resource name of the service configuration object,
   * in the format: ``` projects/{project_number}/services/{service_id} ``` Note
   * that the `service_id` element must be a supported service ID. Currently,
   * the following service IDs are supported: * `firebasestorage.googleapis.com`
   * (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase
   * Realtime Database) * `firestore.googleapis.com` (Cloud Firestore)
   */
  name?: string;
}

/**
 * Request message for the UpdateService method as well as an individual update
 * message for the BatchUpdateServices method.
 */
export interface GoogleFirebaseAppcheckV1UpdateServiceRequest {
  /**
   * Required. The Service to update. The Service's `name` field is used to
   * identify the Service to be updated, in the format: ```
   * projects/{project_number}/services/{service_id} ``` Note that the
   * `service_id` element must be a supported service ID. Currently, the
   * following service IDs are supported: * `firebasestorage.googleapis.com`
   * (Cloud Storage for Firebase) * `firebasedatabase.googleapis.com` (Firebase
   * Realtime Database) * `firestore.googleapis.com` (Cloud Firestore)
   */
  service?: GoogleFirebaseAppcheckV1Service;
  /**
   * Required. A comma-separated list of names of fields in the Service to
   * update. Example: `enforcement_mode`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleFirebaseAppcheckV1UpdateServiceRequest(data: any): GoogleFirebaseAppcheckV1UpdateServiceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleFirebaseAppcheckV1UpdateServiceRequest(data: any): GoogleFirebaseAppcheckV1UpdateServiceRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
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
 * Additional options for FirebaseAppCheck#projectsAppsAppAttestConfigBatchGet.
 */
export interface ProjectsAppsAppAttestConfigBatchGetOptions {
  /**
   * Required. The relative resource names of the AppAttestConfigs to retrieve,
   * in the format ``` projects/{project_number}/apps/{app_id}/appAttestConfig
   * ``` A maximum of 100 objects can be retrieved in a batch.
   */
  names?: string;
}

/**
 * Additional options for FirebaseAppCheck#projectsAppsAppAttestConfigPatch.
 */
export interface ProjectsAppsAppAttestConfigPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the AppAttestConfig
   * Gets to update. Example: `token_ttl`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAppsAppAttestConfigPatchOptions(data: any): ProjectsAppsAppAttestConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAppsAppAttestConfigPatchOptions(data: any): ProjectsAppsAppAttestConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for FirebaseAppCheck#projectsAppsDebugTokensList.
 */
export interface ProjectsAppsDebugTokensListOptions {
  /**
   * The maximum number of DebugTokens to return in the response. Note that an
   * app can have at most 20 debug tokens. The server may return fewer than this
   * at its own discretion. If no value is specified (or too large a value is
   * specified), the server will impose its own limit.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to ListDebugTokens indicating where in
   * the set of DebugTokens to resume listing. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * ListDebugTokens must match the call that provided the page token; if they
   * do not match, the result is undefined.
   */
  pageToken?: string;
}

/**
 * Additional options for FirebaseAppCheck#projectsAppsDebugTokensPatch.
 */
export interface ProjectsAppsDebugTokensPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the DebugToken to
   * update. Example: `display_name`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAppsDebugTokensPatchOptions(data: any): ProjectsAppsDebugTokensPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAppsDebugTokensPatchOptions(data: any): ProjectsAppsDebugTokensPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * FirebaseAppCheck#projectsAppsDeviceCheckConfigBatchGet.
 */
export interface ProjectsAppsDeviceCheckConfigBatchGetOptions {
  /**
   * Required. The relative resource names of the DeviceCheckConfigs to
   * retrieve, in the format ```
   * projects/{project_number}/apps/{app_id}/deviceCheckConfig ``` A maximum of
   * 100 objects can be retrieved in a batch.
   */
  names?: string;
}

/**
 * Additional options for FirebaseAppCheck#projectsAppsDeviceCheckConfigPatch.
 */
export interface ProjectsAppsDeviceCheckConfigPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the
   * DeviceCheckConfig Gets to update. Example: `key_id,private_key`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAppsDeviceCheckConfigPatchOptions(data: any): ProjectsAppsDeviceCheckConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAppsDeviceCheckConfigPatchOptions(data: any): ProjectsAppsDeviceCheckConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * FirebaseAppCheck#projectsAppsPlayIntegrityConfigBatchGet.
 */
export interface ProjectsAppsPlayIntegrityConfigBatchGetOptions {
  /**
   * Required. The relative resource names of the PlayIntegrityConfigs to
   * retrieve, in the format ```
   * projects/{project_number}/apps/{app_id}/playIntegrityConfig ``` A maximum
   * of 100 objects can be retrieved in a batch.
   */
  names?: string;
}

/**
 * Additional options for
 * FirebaseAppCheck#projectsAppsPlayIntegrityConfigPatch.
 */
export interface ProjectsAppsPlayIntegrityConfigPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the
   * PlayIntegrityConfig Gets to update. Example: `token_ttl`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAppsPlayIntegrityConfigPatchOptions(data: any): ProjectsAppsPlayIntegrityConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAppsPlayIntegrityConfigPatchOptions(data: any): ProjectsAppsPlayIntegrityConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * FirebaseAppCheck#projectsAppsRecaptchaEnterpriseConfigBatchGet.
 */
export interface ProjectsAppsRecaptchaEnterpriseConfigBatchGetOptions {
  /**
   * Required. The relative resource names of the RecaptchaEnterpriseConfigs to
   * retrieve, in the format: ```
   * projects/{project_number}/apps/{app_id}/recaptchaEnterpriseConfig ``` A
   * maximum of 100 objects can be retrieved in a batch.
   */
  names?: string;
}

/**
 * Additional options for
 * FirebaseAppCheck#projectsAppsRecaptchaEnterpriseConfigPatch.
 */
export interface ProjectsAppsRecaptchaEnterpriseConfigPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the
   * RecaptchaEnterpriseConfig to update. Example: `site_key`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAppsRecaptchaEnterpriseConfigPatchOptions(data: any): ProjectsAppsRecaptchaEnterpriseConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAppsRecaptchaEnterpriseConfigPatchOptions(data: any): ProjectsAppsRecaptchaEnterpriseConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * FirebaseAppCheck#projectsAppsRecaptchaV3ConfigBatchGet.
 */
export interface ProjectsAppsRecaptchaV3ConfigBatchGetOptions {
  /**
   * Required. The relative resource names of the RecaptchaV3Configs to
   * retrieve, in the format: ```
   * projects/{project_number}/apps/{app_id}/recaptchaV3Config ``` A maximum of
   * 100 objects can be retrieved in a batch.
   */
  names?: string;
}

/**
 * Additional options for FirebaseAppCheck#projectsAppsRecaptchaV3ConfigPatch.
 */
export interface ProjectsAppsRecaptchaV3ConfigPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the
   * RecaptchaV3Config to update. Example: `site_secret`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAppsRecaptchaV3ConfigPatchOptions(data: any): ProjectsAppsRecaptchaV3ConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAppsRecaptchaV3ConfigPatchOptions(data: any): ProjectsAppsRecaptchaV3ConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for FirebaseAppCheck#projectsAppsSafetyNetConfigBatchGet.
 */
export interface ProjectsAppsSafetyNetConfigBatchGetOptions {
  /**
   * Required. The relative resource names of the SafetyNetConfigs to retrieve,
   * in the format ``` projects/{project_number}/apps/{app_id}/safetyNetConfig
   * ``` A maximum of 100 objects can be retrieved in a batch.
   */
  names?: string;
}

/**
 * Additional options for FirebaseAppCheck#projectsAppsSafetyNetConfigPatch.
 */
export interface ProjectsAppsSafetyNetConfigPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the SafetyNetConfig
   * Gets to update. Example: `token_ttl`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAppsSafetyNetConfigPatchOptions(data: any): ProjectsAppsSafetyNetConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAppsSafetyNetConfigPatchOptions(data: any): ProjectsAppsSafetyNetConfigPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for FirebaseAppCheck#projectsServicesList.
 */
export interface ProjectsServicesListOptions {
  /**
   * The maximum number of Services to return in the response. Only explicitly
   * configured services are returned. The server may return fewer than this at
   * its own discretion. If no value is specified (or too large a value is
   * specified), the server will impose its own limit.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to ListServices indicating where in
   * the set of Services to resume listing. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * ListServices must match the call that provided the page token; if they do
   * not match, the result is undefined.
   */
  pageToken?: string;
}

/**
 * Additional options for FirebaseAppCheck#projectsServicesPatch.
 */
export interface ProjectsServicesPatchOptions {
  /**
   * Required. A comma-separated list of names of fields in the Service to
   * update. Example: `enforcement_mode`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsServicesPatchOptions(data: any): ProjectsServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsServicesPatchOptions(data: any): ProjectsServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
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
