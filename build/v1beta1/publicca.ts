// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Public Certificate Authority API Client for Deno
 * ================================================
 * 
 * The Public Certificate Authority API may be used to create and manage ACME external account binding keys associated with Google Trust Services' publicly trusted certificate authority. 
 * 
 * Docs: https://cloud.google.com/public-certificate-authority/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Public Certificate Authority API may be used to create and manage ACME
 * external account binding keys associated with Google Trust Services' publicly
 * trusted certificate authority.
 */
export class Publicca {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://publicca.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new ExternalAccountKey bound to the project.
   *
   * @param parent Required. The parent resource where this external_account_key will be created. Format: projects/[project_id]/locations/[location]. At present only the "global" location is supported.
   */
  async projectsLocationsExternalAccountKeysCreate(parent: string, req: ExternalAccountKey): Promise<ExternalAccountKey> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/externalAccountKeys`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ExternalAccountKey;
  }
}

/**
 * A representation of an ExternalAccountKey used for [external account
 * binding](https://tools.ietf.org/html/rfc8555#section-7.3.4) within ACME.
 */
export interface ExternalAccountKey {
  /**
   * Output only. Base64-URL-encoded HS256 key. It is generated by the
   * PublicCertificateAuthorityService when the ExternalAccountKey is created
   */
  readonly b64MacKey?: Uint8Array;
  /**
   * Output only. Key ID. It is generated by the
   * PublicCertificateAuthorityService when the ExternalAccountKey is created
   */
  readonly keyId?: string;
  /**
   * Output only. Resource name.
   * projects/{project}/locations/{location}/externalAccountKeys/{key_id}
   */
  readonly name?: string;
}