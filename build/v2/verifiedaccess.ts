// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Chrome Verified Access API Client for Deno
 * ==========================================
 * 
 * API for Verified Access chrome extension to provide credential verification for chrome devices connecting to an enterprise network
 * 
 * Docs: https://developers.google.com/chrome/verified-access
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * API for Verified Access chrome extension to provide credential verification
 * for chrome devices connecting to an enterprise network
 */
export class VerifiedAccess {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://verifiedaccess.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Generates a new challenge.
   *
   */
  async challengeGenerate(req: Empty): Promise<Challenge> {
    const url = new URL(`${this.#baseUrl}v2/challenge:generate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeChallenge(data);
  }

  /**
   * Verifies the challenge response.
   *
   */
  async challengeVerify(req: VerifyChallengeResponseRequest): Promise<VerifyChallengeResponseResult> {
    req = serializeVerifyChallengeResponseRequest(req);
    const url = new URL(`${this.#baseUrl}v2/challenge:verify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as VerifyChallengeResponseResult;
  }
}

/**
 * Result message for VerifiedAccess.GenerateChallenge.
 */
export interface Challenge {
  /**
   * Challenge generated with the old signing key, the bytes representation of
   * SignedData (this will only be present during key rotation).
   */
  alternativeChallenge?: Uint8Array;
  /**
   * Generated challenge, the bytes representation of SignedData.
   */
  challenge?: Uint8Array;
}

function serializeChallenge(data: any): Challenge {
  return {
    ...data,
    alternativeChallenge: data["alternativeChallenge"] !== undefined ? encodeBase64(data["alternativeChallenge"]) : undefined,
    challenge: data["challenge"] !== undefined ? encodeBase64(data["challenge"]) : undefined,
  };
}

function deserializeChallenge(data: any): Challenge {
  return {
    ...data,
    alternativeChallenge: data["alternativeChallenge"] !== undefined ? decodeBase64(data["alternativeChallenge"] as string) : undefined,
    challenge: data["challenge"] !== undefined ? decodeBase64(data["challenge"] as string) : undefined,
  };
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
 * Signed ChallengeResponse.
 */
export interface VerifyChallengeResponseRequest {
  /**
   * Required. The generated response to the challenge, the bytes
   * representation of SignedData.
   */
  challengeResponse?: Uint8Array;
  /**
   * Optional. Service can optionally provide identity information about the
   * device or user associated with the key. For an EMK, this value is the
   * enrolled domain. For an EUK, this value is the user's email address. If
   * present, this value will be checked against contents of the response, and
   * verification will fail if there is no match.
   */
  expectedIdentity?: string;
}

function serializeVerifyChallengeResponseRequest(data: any): VerifyChallengeResponseRequest {
  return {
    ...data,
    challengeResponse: data["challengeResponse"] !== undefined ? encodeBase64(data["challengeResponse"]) : undefined,
  };
}

function deserializeVerifyChallengeResponseRequest(data: any): VerifyChallengeResponseRequest {
  return {
    ...data,
    challengeResponse: data["challengeResponse"] !== undefined ? decodeBase64(data["challengeResponse"] as string) : undefined,
  };
}

/**
 * Result message for VerifiedAccess.VerifyChallengeResponse.
 */
export interface VerifyChallengeResponseResult {
  /**
   * Unique customer id that this device belongs to, as defined by the Google
   * Admin SDK at
   * https://developers.google.com/admin-sdk/directory/v1/guides/manage-customers
   */
  customerId?: string;
  /**
   * Device permanent id is returned in this field (for the machine response
   * only).
   */
  devicePermanentId?: string;
  /**
   * Device signal in json string representation.
   */
  deviceSignal?: string;
  /**
   * Device attested key trust level.
   */
  keyTrustLevel?:  | "KEY_TRUST_LEVEL_UNSPECIFIED" | "CHROME_OS_VERIFIED_MODE" | "CHROME_OS_DEVELOPER_MODE" | "CHROME_BROWSER_HW_KEY" | "CHROME_BROWSER_OS_KEY";
  /**
   * Certificate Signing Request (in the SPKAC format, base64 encoded) is
   * returned in this field. This field will be set only if device has included
   * CSR in its challenge response. (the option to include CSR is now available
   * for both user and machine responses)
   */
  signedPublicKeyAndChallenge?: string;
  /**
   * Virtual device id of the device. The definition of virtual device id is
   * platform-specific.
   */
  virtualDeviceId?: string;
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
