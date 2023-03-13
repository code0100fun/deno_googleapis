// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play Integrity API Client for Deno
 * =========================================
 * 
 * The Play Integrity API helps you check that you're interacting with your genuine app on a genuine Android device powered by Google Play services. The Play Integrity API has replaced SafetyNet Attestation and Android Device Verification.
 * 
 * Docs: https://developer.android.com/google/play/integrity
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Play Integrity API helps you check that you're interacting with your
 * genuine app on a genuine Android device powered by Google Play services. The
 * Play Integrity API has replaced SafetyNet Attestation and Android Device
 * Verification.
 */
export class PlayIntegrity {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://playintegrity.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Decodes the integrity token and returns the token payload.
   *
   * @param packageName  Package name of the app the attached integrity token belongs to.
   */
  async v1DecodeIntegrityToken(packageName: string, req: DecodeIntegrityTokenRequest): Promise<DecodeIntegrityTokenResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ packageName }:decodeIntegrityToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDecodeIntegrityTokenResponse(data);
  }
}

/**
 * Contains a signal helping apps differentiating between likely genuine users
 * and likely non-genuine traffic (such as accounts being used for fraud,
 * accounts used by automated traffic, or accounts used in device farms) based
 * on the presence and volume of Play store activity.
 */
export interface AccountActivity {
  /**
   * Required. Indicates the activity level of the account.
   */
  activityLevel?:  | "ACTIVITY_LEVEL_UNSPECIFIED" | "UNEVALUATED" | "UNUSUAL" | "UNKNOWN" | "TYPICAL_BASIC" | "TYPICAL_STRONG";
}

/**
 * Contains the account information such as the licensing status for the user
 * in the scope.
 */
export interface AccountDetails {
  /**
   * Details about the account activity for the user in the scope.
   */
  accountActivity?: AccountActivity;
  /**
   * Required. Details about the licensing status of the user for the app in
   * the scope.
   */
  appLicensingVerdict?:  | "UNKNOWN" | "LICENSED" | "UNLICENSED" | "UNEVALUATED";
}

/**
 * Contains the application integrity information.
 */
export interface AppIntegrity {
  /**
   * Required. Details about the app recognition verdict
   */
  appRecognitionVerdict?:  | "UNKNOWN" | "PLAY_RECOGNIZED" | "UNRECOGNIZED_VERSION" | "UNEVALUATED";
  /**
   * The SHA256 hash of the requesting app's signing certificates (base64
   * web-safe encoded). Set iff app_recognition_verdict != UNEVALUATED.
   */
  certificateSha256Digest?: string[];
  /**
   * Package name of the application under attestation. Set iff
   * app_recognition_verdict != UNEVALUATED.
   */
  packageName?: string;
  /**
   * Version code of the application. Set iff app_recognition_verdict !=
   * UNEVALUATED.
   */
  versionCode?: bigint;
}

function serializeAppIntegrity(data: any): AppIntegrity {
  return {
    ...data,
    versionCode: data["versionCode"] !== undefined ? String(data["versionCode"]) : undefined,
  };
}

function deserializeAppIntegrity(data: any): AppIntegrity {
  return {
    ...data,
    versionCode: data["versionCode"] !== undefined ? BigInt(data["versionCode"]) : undefined,
  };
}

/**
 * Request to decode the integrity token.
 */
export interface DecodeIntegrityTokenRequest {
  /**
   * Encoded integrity token.
   */
  integrityToken?: string;
}

/**
 * Response containing the decoded integrity payload.
 */
export interface DecodeIntegrityTokenResponse {
  /**
   * Plain token payload generated from the decoded integrity token.
   */
  tokenPayloadExternal?: TokenPayloadExternal;
}

function serializeDecodeIntegrityTokenResponse(data: any): DecodeIntegrityTokenResponse {
  return {
    ...data,
    tokenPayloadExternal: data["tokenPayloadExternal"] !== undefined ? serializeTokenPayloadExternal(data["tokenPayloadExternal"]) : undefined,
  };
}

function deserializeDecodeIntegrityTokenResponse(data: any): DecodeIntegrityTokenResponse {
  return {
    ...data,
    tokenPayloadExternal: data["tokenPayloadExternal"] !== undefined ? deserializeTokenPayloadExternal(data["tokenPayloadExternal"]) : undefined,
  };
}

/**
 * Contains the device attestation information.
 */
export interface DeviceIntegrity {
  /**
   * Details about the integrity of the device the app is running on
   */
  deviceRecognitionVerdict?:  | "UNKNOWN" | "MEETS_BASIC_INTEGRITY" | "MEETS_DEVICE_INTEGRITY" | "MEETS_STRONG_INTEGRITY" | "MEETS_VIRTUAL_INTEGRITY"[];
}

/**
 * Contains the integrity request information.
 */
export interface RequestDetails {
  /**
   * Nonce that was provided in the request (which is base64 web-safe no-wrap).
   */
  nonce?: string;
  /**
   * Request hash that was provided in the request.
   */
  requestHash?: string;
  /**
   * Required. Application package name this attestation was requested for.
   * Note: This field makes no guarantees or promises on the caller integrity.
   * For details on application integrity, check application_integrity.
   */
  requestPackageName?: string;
  /**
   * Required. Timestamp, in milliseconds, of the integrity application
   * request.
   */
  timestampMillis?: bigint;
}

function serializeRequestDetails(data: any): RequestDetails {
  return {
    ...data,
    timestampMillis: data["timestampMillis"] !== undefined ? String(data["timestampMillis"]) : undefined,
  };
}

function deserializeRequestDetails(data: any): RequestDetails {
  return {
    ...data,
    timestampMillis: data["timestampMillis"] !== undefined ? BigInt(data["timestampMillis"]) : undefined,
  };
}

/**
 * Contains additional information generated for testing responses.
 */
export interface TestingDetails {
  /**
   * Required. Indicates that the information contained in this payload is a
   * testing response that is statically overridden for a tester.
   */
  isTestingResponse?: boolean;
}

/**
 * Contains basic app information and integrity signals like device attestation
 * and licensing details.
 */
export interface TokenPayloadExternal {
  /**
   * Required. Details about the Play Store account.
   */
  accountDetails?: AccountDetails;
  /**
   * Required. Details about the application integrity.
   */
  appIntegrity?: AppIntegrity;
  /**
   * Required. Details about the device integrity.
   */
  deviceIntegrity?: DeviceIntegrity;
  /**
   * Required. Details about the integrity request.
   */
  requestDetails?: RequestDetails;
  /**
   * Indicates that this payload is generated for testing purposes and contains
   * any additional data that is linked with testing status.
   */
  testingDetails?: TestingDetails;
}

function serializeTokenPayloadExternal(data: any): TokenPayloadExternal {
  return {
    ...data,
    appIntegrity: data["appIntegrity"] !== undefined ? serializeAppIntegrity(data["appIntegrity"]) : undefined,
    requestDetails: data["requestDetails"] !== undefined ? serializeRequestDetails(data["requestDetails"]) : undefined,
  };
}

function deserializeTokenPayloadExternal(data: any): TokenPayloadExternal {
  return {
    ...data,
    appIntegrity: data["appIntegrity"] !== undefined ? deserializeAppIntegrity(data["appIntegrity"]) : undefined,
    requestDetails: data["requestDetails"] !== undefined ? deserializeRequestDetails(data["requestDetails"]) : undefined,
  };
}