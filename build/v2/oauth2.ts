// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google OAuth2 API Client for Deno
 * =================================
 * 
 * Obtains end-user authorization grants for use with other Google APIs.
 * 
 * Docs: https://developers.google.com/identity/protocols/oauth2/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Obtains end-user authorization grants for use with other Google APIs.
 */
export class OAuth2 {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://www.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  async userinfoGet(): Promise<Userinfo> {
    const url = new URL(`${this.#baseUrl}oauth2/v2/userinfo`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Userinfo;
  }

  async userinfoV2MeGet(): Promise<Userinfo> {
    const url = new URL(`${this.#baseUrl}userinfo/v2/me`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Userinfo;
  }
}

export interface Tokeninfo {
  /**
   * Who is the intended audience for this token. In general the same as
   * issued_to.
   */
  audience?: string;
  /**
   * The email address of the user. Present only if the email scope is present
   * in the request.
   */
  email?: string;
  /**
   * The expiry time of the token, as number of seconds left until expiry.
   */
  expires_in?: number;
  /**
   * To whom was the token issued to. In general the same as audience.
   */
  issued_to?: string;
  /**
   * The space separated list of scopes granted to this token.
   */
  scope?: string;
  /**
   * The obfuscated user id.
   */
  user_id?: string;
  /**
   * Boolean flag which is true if the email address is verified. Present only
   * if the email scope is present in the request.
   */
  verified_email?: boolean;
}

export interface Userinfo {
  /**
   * The user's email address.
   */
  email?: string;
  /**
   * The user's last name.
   */
  family_name?: string;
  /**
   * The user's gender.
   */
  gender?: string;
  /**
   * The user's first name.
   */
  given_name?: string;
  /**
   * The hosted domain e.g. example.com if the user is Google apps user.
   */
  hd?: string;
  /**
   * The obfuscated ID of the user.
   */
  id?: string;
  /**
   * URL of the profile page.
   */
  link?: string;
  /**
   * The user's preferred locale.
   */
  locale?: string;
  /**
   * The user's full name.
   */
  name?: string;
  /**
   * URL of the user's picture image.
   */
  picture?: string;
  /**
   * Boolean flag which is true if the email address is verified. Always
   * verified because we only return the user's primary email address.
   */
  verified_email?: boolean;
}