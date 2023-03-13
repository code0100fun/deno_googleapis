// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * ACME DNS API Client for Deno
 * ============================
 * 
 * Google Domains ACME DNS API that allows users to complete ACME DNS-01 challenges for a domain.
 * 
 * Docs: https://developers.google.com/domains/acme-dns/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Google Domains ACME DNS API that allows users to complete ACME DNS-01
 * challenges for a domain.
 */
export class ACMEDNS {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://acmedns.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the ACME challenge set for a given domain name. Domain names must be
   * provided in Punycode.
   *
   * @param rootDomain Required. SLD + TLD domain name to list challenges. For example, this would be "google.com" for any FQDN under "google.com". That includes challenges for "subdomain.google.com". This MAY be Unicode or Punycode.
   */
  async acmeChallengeSetsGet(rootDomain: string): Promise<AcmeChallengeSet> {
    const url = new URL(`${this.#baseUrl}v1/acmeChallengeSets/${ rootDomain }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AcmeChallengeSet;
  }

  /**
   * Rotate the ACME challenges for a given domain name. By default, removes
   * any challenges that are older than 30 days. Domain names must be provided
   * in Punycode.
   *
   * @param rootDomain Required. SLD + TLD domain name to update records for. For example, this would be "google.com" for any FQDN under "google.com". That includes challenges for "subdomain.google.com". This MAY be Unicode or Punycode.
   */
  async acmeChallengeSetsRotateChallenges(rootDomain: string, req: RotateChallengesRequest): Promise<AcmeChallengeSet> {
    req = serializeRotateChallengesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/acmeChallengeSets/${ rootDomain }:rotateChallenges`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AcmeChallengeSet;
  }
}

/**
 * The up-to-date ACME challenge set on a domain for an RPC. This contains all
 * of the ACME TXT records that exist on the domain.
 */
export interface AcmeChallengeSet {
  /**
   * The ACME challenges on the requested domain represented as individual TXT
   * records.
   */
  record?: AcmeTxtRecord[];
}

/**
 * The TXT record message that represents an ACME DNS-01 challenge.
 */
export interface AcmeTxtRecord {
  /**
   * Holds the ACME challenge data put in the TXT record. This will be checked
   * to be a valid TXT record data entry.
   */
  digest?: string;
  /**
   * The domain/subdomain for the record. In a request, this MAY be Unicode or
   * Punycode. In a response, this will be in Unicode. The fqdn MUST contain the
   * root_domain field on the request.
   */
  fqdn?: string;
  /**
   * Output only. The time when this record was last updated. This will be in
   * UTC time.
   */
  readonly updateTime?: Date;
}

/**
 * The request message for the RotateChallenges RPC. Requires an access token,
 * a root domain, and either records_to_add or records_to_remove to be
 * populated. Records may be set for multiple subdomains at once to support SAN
 * requests for multiple subdomains in a single domain. By default, ACME TXT
 * record challenges that are older than 30 days will be removed. Set
 * `keep_expired_records` to false if this behavior is undesired. There is a
 * record maximum of 100 records per domain including expired records. Any
 * request sent that would exceed this maximum will result in a
 * FAILED_PRECONDITION error. NEXT ID: 6
 */
export interface RotateChallengesRequest {
  /**
   * Required. ACME DNS access token. This is a base64 token secret that is
   * procured from the Google Domains website. It authorizes ACME TXT record
   * updates for a domain.
   */
  accessToken?: Uint8Array;
  /**
   * Keep records older than 30 days that were used for previous requests.
   */
  keepExpiredRecords?: boolean;
  /**
   * ACME TXT record challenges to add. Supports multiple challenges on the
   * same FQDN.
   */
  recordsToAdd?: AcmeTxtRecord[];
  /**
   * ACME TXT record challenges to remove.
   */
  recordsToRemove?: AcmeTxtRecord[];
}

function serializeRotateChallengesRequest(data: any): RotateChallengesRequest {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? encodeBase64(data["accessToken"]) : undefined,
  };
}

function deserializeRotateChallengesRequest(data: any): RotateChallengesRequest {
  return {
    ...data,
    accessToken: data["accessToken"] !== undefined ? decodeBase64(data["accessToken"] as string) : undefined,
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
