// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * IAM Service Account Credentials API Client for Deno
 * ===================================================
 * 
 * Creates short-lived credentials for impersonating IAM service accounts. To enable this API, you must enable the IAM API (iam.googleapis.com). 
 * 
 * Docs: https://cloud.google.com/iam/docs/creating-short-lived-service-account-credentials
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Creates short-lived credentials for impersonating IAM service accounts. To
 * enable this API, you must enable the IAM API (iam.googleapis.com).
 */
export class IAMCredentials {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://iamcredentials.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Generates an OAuth 2.0 access token for a service account.
   *
   * @param name Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid.
   */
  async projectsServiceAccountsGenerateAccessToken(name: string, req: GenerateAccessTokenRequest): Promise<GenerateAccessTokenResponse> {
    req = serializeGenerateAccessTokenRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:generateAccessToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGenerateAccessTokenResponse(data);
  }

  /**
   * Generates an OpenID Connect ID token for a service account.
   *
   * @param name Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid.
   */
  async projectsServiceAccountsGenerateIdToken(name: string, req: GenerateIdTokenRequest): Promise<GenerateIdTokenResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:generateIdToken`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GenerateIdTokenResponse;
  }

  /**
   * Signs a blob using a service account's system-managed private key.
   *
   * @param name Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid.
   */
  async projectsServiceAccountsSignBlob(name: string, req: SignBlobRequest): Promise<SignBlobResponse> {
    req = serializeSignBlobRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:signBlob`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSignBlobResponse(data);
  }

  /**
   * Signs a JWT using a service account's system-managed private key.
   *
   * @param name Required. The resource name of the service account for which the credentials are requested, in the following format: `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard character is required; replacing it with a project ID is invalid.
   */
  async projectsServiceAccountsSignJwt(name: string, req: SignJwtRequest): Promise<SignJwtResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:signJwt`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SignJwtResponse;
  }
}

export interface GenerateAccessTokenRequest {
  /**
   * The sequence of service accounts in a delegation chain. This field is
   * required for [delegated
   * requests](https://cloud.google.com/iam/help/credentials/delegated-request).
   * For [direct
   * requests](https://cloud.google.com/iam/help/credentials/direct-request),
   * which are more common, do not specify this field. Each service account must
   * be granted the `roles/iam.serviceAccountTokenCreator` role on its next
   * service account in the chain. The last service account in the chain must be
   * granted the `roles/iam.serviceAccountTokenCreator` role on the service
   * account that is specified in the `name` field of the request. The delegates
   * must have the following format:
   * `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard
   * character is required; replacing it with a project ID is invalid.
   */
  delegates?: string[];
  /**
   * The desired lifetime duration of the access token in seconds. By default,
   * the maximum allowed value is 1 hour. To set a lifetime of up to 12 hours,
   * you can add the service account as an allowed value in an Organization
   * Policy that enforces the
   * `constraints/iam.allowServiceAccountCredentialLifetimeExtension`
   * constraint. See detailed instructions at
   * https://cloud.google.com/iam/help/credentials/lifetime If a value is not
   * specified, the token's lifetime will be set to a default value of 1 hour.
   */
  lifetime?: number /* Duration */;
  /**
   * Required. Code to identify the scopes to be included in the OAuth 2.0
   * access token. See
   * https://developers.google.com/identity/protocols/googlescopes for more
   * information. At least one value required.
   */
  scope?: string[];
}

function serializeGenerateAccessTokenRequest(data: any): GenerateAccessTokenRequest {
  return {
    ...data,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
  };
}

function deserializeGenerateAccessTokenRequest(data: any): GenerateAccessTokenRequest {
  return {
    ...data,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
  };
}

export interface GenerateAccessTokenResponse {
  /**
   * The OAuth 2.0 access token.
   */
  accessToken?: string;
  /**
   * Token expiration time. The expiration time is always set.
   */
  expireTime?: Date;
}

function serializeGenerateAccessTokenResponse(data: any): GenerateAccessTokenResponse {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeGenerateAccessTokenResponse(data: any): GenerateAccessTokenResponse {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

export interface GenerateIdTokenRequest {
  /**
   * Required. The audience for the token, such as the API or account that this
   * token grants access to.
   */
  audience?: string;
  /**
   * The sequence of service accounts in a delegation chain. Each service
   * account must be granted the `roles/iam.serviceAccountTokenCreator` role on
   * its next service account in the chain. The last service account in the
   * chain must be granted the `roles/iam.serviceAccountTokenCreator` role on
   * the service account that is specified in the `name` field of the request.
   * The delegates must have the following format:
   * `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard
   * character is required; replacing it with a project ID is invalid.
   */
  delegates?: string[];
  /**
   * Include the service account email in the token. If set to `true`, the
   * token will contain `email` and `email_verified` claims.
   */
  includeEmail?: boolean;
}

export interface GenerateIdTokenResponse {
  /**
   * The OpenId Connect ID token.
   */
  token?: string;
}

export interface SignBlobRequest {
  /**
   * The sequence of service accounts in a delegation chain. Each service
   * account must be granted the `roles/iam.serviceAccountTokenCreator` role on
   * its next service account in the chain. The last service account in the
   * chain must be granted the `roles/iam.serviceAccountTokenCreator` role on
   * the service account that is specified in the `name` field of the request.
   * The delegates must have the following format:
   * `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard
   * character is required; replacing it with a project ID is invalid.
   */
  delegates?: string[];
  /**
   * Required. The bytes to sign.
   */
  payload?: Uint8Array;
}

function serializeSignBlobRequest(data: any): SignBlobRequest {
  return {
    ...data,
    payload: data["payload"] !== undefined ? encodeBase64(data["payload"]) : undefined,
  };
}

function deserializeSignBlobRequest(data: any): SignBlobRequest {
  return {
    ...data,
    payload: data["payload"] !== undefined ? decodeBase64(data["payload"] as string) : undefined,
  };
}

export interface SignBlobResponse {
  /**
   * The ID of the key used to sign the blob. The key used for signing will
   * remain valid for at least 12 hours after the blob is signed. To verify the
   * signature, you can retrieve the public key in several formats from the
   * following endpoints: - RSA public key wrapped in an X.509 v3 certificate:
   * `https://www.googleapis.com/service_accounts/v1/metadata/x509/{ACCOUNT_EMAIL}`
   * - Raw key in JSON format:
   * `https://www.googleapis.com/service_accounts/v1/metadata/raw/{ACCOUNT_EMAIL}`
   * - JSON Web Key (JWK):
   * `https://www.googleapis.com/service_accounts/v1/metadata/jwk/{ACCOUNT_EMAIL}`
   */
  keyId?: string;
  /**
   * The signature for the blob. Does not include the original blob. After the
   * key pair referenced by the `key_id` response field expires, Google no
   * longer exposes the public key that can be used to verify the blob. As a
   * result, the receiver can no longer verify the signature.
   */
  signedBlob?: Uint8Array;
}

function serializeSignBlobResponse(data: any): SignBlobResponse {
  return {
    ...data,
    signedBlob: data["signedBlob"] !== undefined ? encodeBase64(data["signedBlob"]) : undefined,
  };
}

function deserializeSignBlobResponse(data: any): SignBlobResponse {
  return {
    ...data,
    signedBlob: data["signedBlob"] !== undefined ? decodeBase64(data["signedBlob"] as string) : undefined,
  };
}

export interface SignJwtRequest {
  /**
   * The sequence of service accounts in a delegation chain. Each service
   * account must be granted the `roles/iam.serviceAccountTokenCreator` role on
   * its next service account in the chain. The last service account in the
   * chain must be granted the `roles/iam.serviceAccountTokenCreator` role on
   * the service account that is specified in the `name` field of the request.
   * The delegates must have the following format:
   * `projects/-/serviceAccounts/{ACCOUNT_EMAIL_OR_UNIQUEID}`. The `-` wildcard
   * character is required; replacing it with a project ID is invalid.
   */
  delegates?: string[];
  /**
   * Required. The JWT payload to sign. Must be a serialized JSON object that
   * contains a JWT Claims Set. For example: `{"sub": "user@example.com", "iat":
   * 313435}` If the JWT Claims Set contains an expiration time (`exp`) claim,
   * it must be an integer timestamp that is not in the past and no more than 12
   * hours in the future.
   */
  payload?: string;
}

export interface SignJwtResponse {
  /**
   * The ID of the key used to sign the JWT. The key used for signing will
   * remain valid for at least 12 hours after the JWT is signed. To verify the
   * signature, you can retrieve the public key in several formats from the
   * following endpoints: - RSA public key wrapped in an X.509 v3 certificate:
   * `https://www.googleapis.com/service_accounts/v1/metadata/x509/{ACCOUNT_EMAIL}`
   * - Raw key in JSON format:
   * `https://www.googleapis.com/service_accounts/v1/metadata/raw/{ACCOUNT_EMAIL}`
   * - JSON Web Key (JWK):
   * `https://www.googleapis.com/service_accounts/v1/metadata/jwk/{ACCOUNT_EMAIL}`
   */
  keyId?: string;
  /**
   * The signed JWT. Contains the automatically generated header; the
   * client-supplied payload; and the signature, which is generated using the
   * key referenced by the `kid` field in the header. After the key pair
   * referenced by the `key_id` response field expires, Google no longer exposes
   * the public key that can be used to verify the JWT. As a result, the
   * receiver can no longer verify the signature.
   */
  signedJwt?: string;
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
