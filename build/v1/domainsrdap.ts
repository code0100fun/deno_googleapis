// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Domains RDAP API Client for Deno
 * ================================
 * 
 * Read-only public API that lets users search for information about domain names.
 * 
 * Docs: https://developers.google.com/domains/rdap/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Read-only public API that lets users search for information about domain
 * names.
 */
export class DomainsRDAP {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://domainsrdap.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async autnumGet(autnumId: string): Promise<RdapResponse> {
    const url = new URL(`${this.#baseUrl}v1/autnum/${ autnumId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRdapResponse(data);
  }

  /**
   * Look up RDAP information for a domain by name.
   *
   * @param domainName Full domain name to look up. Example: "example.com"
   */
  async domainGet(domainName: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/domain/${ domainName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async entityGet(entityId: string): Promise<RdapResponse> {
    const url = new URL(`${this.#baseUrl}v1/entity/${ entityId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRdapResponse(data);
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async ipGet(ipId: string, ipId1: string): Promise<RdapResponse> {
    const url = new URL(`${this.#baseUrl}v1/ip/${ ipId }/${ ipId1 }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRdapResponse(data);
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async nameserverGet(nameserverId: string): Promise<RdapResponse> {
    const url = new URL(`${this.#baseUrl}v1/nameserver/${ nameserverId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRdapResponse(data);
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async v1GetDomains(): Promise<RdapResponse> {
    const url = new URL(`${this.#baseUrl}v1/domains`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRdapResponse(data);
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async v1GetEntities(): Promise<RdapResponse> {
    const url = new URL(`${this.#baseUrl}v1/entities`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRdapResponse(data);
  }

  /**
   * Get help information for the RDAP API, including links to documentation.
   *
   */
  async v1GetHelp(): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/help`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async v1GetIp(): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/ip`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * The RDAP API recognizes this command from the RDAP specification but does
   * not support it. The response is a formatted 501 error.
   *
   */
  async v1GetNameservers(): Promise<RdapResponse> {
    const url = new URL(`${this.#baseUrl}v1/nameservers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRdapResponse(data);
  }
}

/**
 * Message that represents an arbitrary HTTP body. It should only be used for
 * payload formats that can't be represented as JSON, such as raw binary or an
 * HTML page. This message can be used both in streaming and non-streaming API
 * methods in the request as well as the response. It can be used as a top-level
 * request field, which is convenient if one wants to extract parameters from
 * either the URL or HTTP template into the request fields and also want access
 * to the raw HTTP body. Example: message GetResourceRequest { // A unique
 * request id. string request_id = 1; // The raw HTTP body is bound to this
 * field. google.api.HttpBody http_body = 2; } service ResourceService { rpc
 * GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc
 * UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); }
 * Example with streaming methods: service CaldavService { rpc
 * GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody);
 * rpc UpdateCalendar(stream google.api.HttpBody) returns (stream
 * google.api.HttpBody); } Use of this type only changes how the request and
 * response bodies are handled, all other features will continue to work
 * unchanged.
 */
export interface HttpBody {
  /**
   * The HTTP Content-Type header value specifying the content type of the
   * body.
   */
  contentType?: string;
  /**
   * The HTTP request/response body as raw binary.
   */
  data?: Uint8Array;
  /**
   * Application specific response metadata. Must be set in the first response
   * for streaming APIs.
   */
  extensions?: {
    [key: string]: any
  }[];
}

function serializeHttpBody(data: any): HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeHttpBody(data: any): HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * Links object defined in [section 4.2 of RFC
 * 7483](https://tools.ietf.org/html/rfc7483#section-4.2).
 */
export interface Link {
  /**
   * Target URL of a link. Example: "http://example.com/previous".
   */
  href?: string;
  /**
   * Language code of a link. Example: "en".
   */
  hreflang?: string;
  /**
   * Media type of the link destination. Example: "screen".
   */
  media?: string;
  /**
   * Relation type of a link. Example: "previous".
   */
  rel?: string;
  /**
   * Title of this link. Example: "title".
   */
  title?: string;
  /**
   * Content type of the link. Example: "application/json".
   */
  type?: string;
  /**
   * URL giving context for the link. Example: "http://example.com/current".
   */
  value?: string;
}

/**
 * Notices object defined in [section 4.3 of RFC
 * 7483](https://tools.ietf.org/html/rfc7483#section-4.3).
 */
export interface Notice {
  /**
   * Description of the notice.
   */
  description?: string[];
  /**
   * Link to a document containing more information.
   */
  links?: Link[];
  /**
   * Title of a notice. Example: "Terms of Service".
   */
  title?: string;
  /**
   * Type values defined in [section 10.2.1 of RFC
   * 7483](https://tools.ietf.org/html/rfc7483#section-10.2.1) specific to a
   * whole response: "result set truncated due to authorization", "result set
   * truncated due to excessive load", "result set truncated due to
   * unexplainable reasons".
   */
  type?: string;
}

/**
 * Response to a general RDAP query.
 */
export interface RdapResponse {
  /**
   * Error description.
   */
  description?: string[];
  /**
   * Error HTTP code. Example: "501".
   */
  errorCode?: number;
  /**
   * HTTP response with content type set to "application/json+rdap".
   */
  jsonResponse?: HttpBody;
  /**
   * Error language code. Error response info fields are defined in [section 6
   * of RFC 7483](https://tools.ietf.org/html/rfc7483#section-6).
   */
  lang?: string;
  /**
   * Notices applying to this response.
   */
  notices?: Notice[];
  /**
   * RDAP conformance level.
   */
  rdapConformance?: string[];
  /**
   * Error title.
   */
  title?: string;
}

function serializeRdapResponse(data: any): RdapResponse {
  return {
    ...data,
    jsonResponse: data["jsonResponse"] !== undefined ? serializeHttpBody(data["jsonResponse"]) : undefined,
  };
}

function deserializeRdapResponse(data: any): RdapResponse {
  return {
    ...data,
    jsonResponse: data["jsonResponse"] !== undefined ? deserializeHttpBody(data["jsonResponse"]) : undefined,
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
