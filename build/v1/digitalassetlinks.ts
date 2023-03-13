// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Digital Asset Links API Client for Deno
 * =======================================
 * 
 * Discovers relationships between online assets such as websites or mobile apps.
 * 
 * Docs: https://developers.google.com/digital-asset-links/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Discovers relationships between online assets such as websites or mobile
 * apps.
 */
export class DigitalAssetLinks {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://digitalassetlinks.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Send a bundle of statement checks in a single RPC to minimize latency and
   * service load. Statements need not be all for the same source and/or target.
   * We recommend using this method when you need to check more than one
   * statement in a short period of time.
   *
   */
  async assetlinksBulkCheck(req: BulkCheckRequest): Promise<BulkCheckResponse> {
    const url = new URL(`${this.#baseUrl}v1/assetlinks:bulkCheck`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBulkCheckResponse(data);
  }

  /**
   * Determines whether the specified (directional) relationship exists between
   * the specified source and target assets. The relation describes the intent
   * of the link between the two assets as claimed by the source asset. An
   * example for such relationships is the delegation of privileges or
   * permissions. This command is most often used by infrastructure systems to
   * check preconditions for an action. For example, a client may want to know
   * if it is OK to send a web URL to a particular mobile app instead. The
   * client can check for the relevant asset link from the website to the mobile
   * app to decide if the operation should be allowed. A note about security: if
   * you specify a secure asset as the source, such as an HTTPS website or an
   * Android app, the API will ensure that any statements used to generate the
   * response have been made in a secure way by the owner of that asset.
   * Conversely, if the source asset is an insecure HTTP website (that is, the
   * URL starts with `http://` instead of `https://`), the API cannot verify its
   * statements securely, and it is not possible to ensure that the website's
   * statements have not been altered by a third party. For more information,
   * see the [Digital Asset Links technical design
   * specification](https://github.com/google/digitalassetlinks/blob/master/well-known/details.md).
   *
   */
  async assetlinksCheck(opts: AssetlinksCheckOptions = {}): Promise<CheckResponse> {
    const url = new URL(`${this.#baseUrl}v1/assetlinks:check`);
    if (opts.relation !== undefined) {
      url.searchParams.append("relation", String(opts.relation));
    }
    if (opts["source.androidApp.certificate.sha256Fingerprint"] !== undefined) {
      url.searchParams.append("source.androidApp.certificate.sha256Fingerprint", String(opts["source.androidApp.certificate.sha256Fingerprint"]));
    }
    if (opts["source.androidApp.packageName"] !== undefined) {
      url.searchParams.append("source.androidApp.packageName", String(opts["source.androidApp.packageName"]));
    }
    if (opts["source.web.site"] !== undefined) {
      url.searchParams.append("source.web.site", String(opts["source.web.site"]));
    }
    if (opts["target.androidApp.certificate.sha256Fingerprint"] !== undefined) {
      url.searchParams.append("target.androidApp.certificate.sha256Fingerprint", String(opts["target.androidApp.certificate.sha256Fingerprint"]));
    }
    if (opts["target.androidApp.packageName"] !== undefined) {
      url.searchParams.append("target.androidApp.packageName", String(opts["target.androidApp.packageName"]));
    }
    if (opts["target.web.site"] !== undefined) {
      url.searchParams.append("target.web.site", String(opts["target.web.site"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCheckResponse(data);
  }

  /**
   * Retrieves a list of all statements from a given source that match the
   * specified target and statement string. The API guarantees that all
   * statements with secure source assets, such as HTTPS websites or Android
   * apps, have been made in a secure way by the owner of those assets, as
   * described in the [Digital Asset Links technical design
   * specification](https://github.com/google/digitalassetlinks/blob/master/well-known/details.md).
   * Specifically, you should consider that for insecure websites (that is,
   * where the URL starts with `http://` instead of `https://`), this guarantee
   * cannot be made. The `List` command is most useful in cases where the API
   * client wants to know all the ways in which two assets are related, or
   * enumerate all the relationships from a particular source asset. Example: a
   * feature that helps users navigate to related items. When a mobile app is
   * running on a device, the feature would make it easy to navigate to the
   * corresponding web site or Google+ profile.
   *
   */
  async statementsList(opts: StatementsListOptions = {}): Promise<ListResponse> {
    const url = new URL(`${this.#baseUrl}v1/statements:list`);
    if (opts.relation !== undefined) {
      url.searchParams.append("relation", String(opts.relation));
    }
    if (opts["source.androidApp.certificate.sha256Fingerprint"] !== undefined) {
      url.searchParams.append("source.androidApp.certificate.sha256Fingerprint", String(opts["source.androidApp.certificate.sha256Fingerprint"]));
    }
    if (opts["source.androidApp.packageName"] !== undefined) {
      url.searchParams.append("source.androidApp.packageName", String(opts["source.androidApp.packageName"]));
    }
    if (opts["source.web.site"] !== undefined) {
      url.searchParams.append("source.web.site", String(opts["source.web.site"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListResponse(data);
  }
}

/**
 * Describes an android app asset.
 */
export interface AndroidAppAsset {
  /**
   * Because there is no global enforcement of package name uniqueness, we also
   * require a signing certificate, which in combination with the package name
   * uniquely identifies an app. Some apps' signing keys are rotated, so they
   * may be signed by different keys over time. We treat these as distinct
   * assets, since we use (package name, cert) as the unique ID. This should not
   * normally pose any problems as both versions of the app will make the same
   * or similar statements. Other assets making statements about the app will
   * have to be updated when a key is rotated, however. (Note that the syntaxes
   * for publishing and querying for statements contain syntactic sugar to
   * easily let you specify apps that are known by multiple certificates.)
   * REQUIRED
   */
  certificate?: CertificateInfo;
  /**
   * Android App assets are naturally identified by their Java package name.
   * For example, the Google Maps app uses the package name
   * `com.google.android.apps.maps`. REQUIRED
   */
  packageName?: string;
}

/**
 * Uniquely identifies an asset. A digital asset is an identifiable and
 * addressable online entity that typically provides some service or content.
 * Examples of assets are websites, Android apps, Twitter feeds, and Plus Pages.
 */
export interface Asset {
  /**
   * Set if this is an Android App asset.
   */
  androidApp?: AndroidAppAsset;
  /**
   * Set if this is a web asset.
   */
  web?: WebAsset;
}

/**
 * Additional options for DigitalAssetLinks#assetlinksCheck.
 */
export interface AssetlinksCheckOptions {
  /**
   * Query string for the relation. We identify relations with strings of the
   * format `/`, where `` must be one of a set of pre-defined purpose
   * categories, and `` is a free-form lowercase alphanumeric string that
   * describes the specific use case of the statement. Refer to [our API
   * documentation](/digital-asset-links/v1/relation-strings) for the current
   * list of supported relations. For a query to match an asset link, both the
   * query's and the asset link's relation strings must match exactly. Example:
   * A query with relation `delegate_permission/common.handle_all_urls` matches
   * an asset link with relation `delegate_permission/common.handle_all_urls`.
   */
  relation?: string;
  /**
   * The uppercase SHA-265 fingerprint of the certificate. From the PEM
   * certificate, it can be acquired like this: $ keytool -printcert -file
   * $CERTFILE | grep SHA256: SHA256:
   * 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \
   * 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in
   * $CERTFILE -noout -fingerprint -sha256 SHA256
   * Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \
   * 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the
   * contents of this field would be `14:6D:E9:83:C5:73:
   * 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:
   * 44:E5`. If these tools are not available to you, you can convert the PEM
   * certificate into the DER format, compute the SHA-256 hash of that string
   * and represent the result as a hexstring (that is, uppercase hexadecimal
   * representations of each octet, separated by colons).
   */
  ["source.androidApp.certificate.sha256Fingerprint"]?: string;
  /**
   * Android App assets are naturally identified by their Java package name.
   * For example, the Google Maps app uses the package name
   * `com.google.android.apps.maps`. REQUIRED
   */
  ["source.androidApp.packageName"]?: string;
  /**
   * Web assets are identified by a URL that contains only the scheme, hostname
   * and port parts. The format is http[s]://[:] Hostnames must be fully
   * qualified: they must end in a single period ("`.`"). Only the schemes
   * "http" and "https" are currently allowed. Port numbers are given as a
   * decimal number, and they must be omitted if the standard port numbers are
   * used: 80 for http and 443 for https. We call this limited URL the "site".
   * All URLs that share the same scheme, hostname and port are considered to be
   * a part of the site and thus belong to the web asset. Example: the asset
   * with the site `https://www.google.com` contains all these URLs: *
   * `https://www.google.com/` * `https://www.google.com:443/` *
   * `https://www.google.com/foo` * `https://www.google.com/foo?bar` *
   * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/`
   * But it does not contain these URLs: * `http://www.google.com/` (wrong
   * scheme) * `https://google.com/` (hostname does not match) *
   * `https://www.google.com:444/` (port does not match) REQUIRED
   */
  ["source.web.site"]?: string;
  /**
   * The uppercase SHA-265 fingerprint of the certificate. From the PEM
   * certificate, it can be acquired like this: $ keytool -printcert -file
   * $CERTFILE | grep SHA256: SHA256:
   * 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \
   * 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in
   * $CERTFILE -noout -fingerprint -sha256 SHA256
   * Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \
   * 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the
   * contents of this field would be `14:6D:E9:83:C5:73:
   * 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:
   * 44:E5`. If these tools are not available to you, you can convert the PEM
   * certificate into the DER format, compute the SHA-256 hash of that string
   * and represent the result as a hexstring (that is, uppercase hexadecimal
   * representations of each octet, separated by colons).
   */
  ["target.androidApp.certificate.sha256Fingerprint"]?: string;
  /**
   * Android App assets are naturally identified by their Java package name.
   * For example, the Google Maps app uses the package name
   * `com.google.android.apps.maps`. REQUIRED
   */
  ["target.androidApp.packageName"]?: string;
  /**
   * Web assets are identified by a URL that contains only the scheme, hostname
   * and port parts. The format is http[s]://[:] Hostnames must be fully
   * qualified: they must end in a single period ("`.`"). Only the schemes
   * "http" and "https" are currently allowed. Port numbers are given as a
   * decimal number, and they must be omitted if the standard port numbers are
   * used: 80 for http and 443 for https. We call this limited URL the "site".
   * All URLs that share the same scheme, hostname and port are considered to be
   * a part of the site and thus belong to the web asset. Example: the asset
   * with the site `https://www.google.com` contains all these URLs: *
   * `https://www.google.com/` * `https://www.google.com:443/` *
   * `https://www.google.com/foo` * `https://www.google.com/foo?bar` *
   * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/`
   * But it does not contain these URLs: * `http://www.google.com/` (wrong
   * scheme) * `https://google.com/` (hostname does not match) *
   * `https://www.google.com:444/` (port does not match) REQUIRED
   */
  ["target.web.site"]?: string;
}

/**
 * Message used to check for the existence of multiple digital asset links
 * within a single RPC.
 */
export interface BulkCheckRequest {
  /**
   * Same configuration as in Check request, all statements checks will use
   * same configurations.
   */
  allowGoogleInternalDataSources?: boolean;
  /**
   * If specified, will be used in any given template statement that doesn’t
   * specify a relation.
   */
  defaultRelation?: string;
  /**
   * If specified, will be used in any given template statement that doesn’t
   * specify a source.
   */
  defaultSource?: Asset;
  /**
   * If specified, will be used in any given template statement that doesn’t
   * specify a target.
   */
  defaultTarget?: Asset;
  /**
   * Same configuration as in Check request, all statements checks will use
   * same configurations.
   */
  skipCacheLookup?: boolean;
  /**
   * List of statements to check. For each statement, you can omit a field if
   * the corresponding default_* field below was supplied. Minimum 1 statement;
   * maximum 1,000 statements. Any additional statements will be ignored.
   */
  statements?: StatementTemplate[];
}

/**
 * Response for BulkCheck call. Results are sent in a list in the same order in
 * which they were sent. Individual check errors are described in the
 * appropriate check_results entry. If the entire call fails, the response will
 * include a bulk_error_code field describing the error.
 */
export interface BulkCheckResponse {
  /**
   * Error code for the entire request. Present only if the entire request
   * failed. Individual check errors will not trigger the presence of this
   * field.
   */
  bulkErrorCode?:  | "ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_INVALID_QUERY" | "ERROR_CODE_FETCH_ERROR" | "ERROR_CODE_FAILED_SSL_VALIDATION" | "ERROR_CODE_REDIRECT" | "ERROR_CODE_TOO_LARGE" | "ERROR_CODE_MALFORMED_HTTP_RESPONSE" | "ERROR_CODE_WRONG_CONTENT_TYPE" | "ERROR_CODE_MALFORMED_CONTENT" | "ERROR_CODE_SECURE_ASSET_INCLUDES_INSECURE" | "ERROR_CODE_FETCH_BUDGET_EXHAUSTED";
  /**
   * List of results for each check request. Results are returned in the same
   * order in which they were sent in the request.
   */
  checkResults?: CheckResponse[];
}

function serializeBulkCheckResponse(data: any): BulkCheckResponse {
  return {
    ...data,
    checkResults: data["checkResults"] !== undefined ? data["checkResults"].map((item: any) => (serializeCheckResponse(item))) : undefined,
  };
}

function deserializeBulkCheckResponse(data: any): BulkCheckResponse {
  return {
    ...data,
    checkResults: data["checkResults"] !== undefined ? data["checkResults"].map((item: any) => (deserializeCheckResponse(item))) : undefined,
  };
}

/**
 * Describes an X509 certificate.
 */
export interface CertificateInfo {
  /**
   * The uppercase SHA-265 fingerprint of the certificate. From the PEM
   * certificate, it can be acquired like this: $ keytool -printcert -file
   * $CERTFILE | grep SHA256: SHA256:
   * 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \
   * 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in
   * $CERTFILE -noout -fingerprint -sha256 SHA256
   * Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \
   * 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the
   * contents of this field would be `14:6D:E9:83:C5:73:
   * 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:
   * 44:E5`. If these tools are not available to you, you can convert the PEM
   * certificate into the DER format, compute the SHA-256 hash of that string
   * and represent the result as a hexstring (that is, uppercase hexadecimal
   * representations of each octet, separated by colons).
   */
  sha256Fingerprint?: string;
}

/**
 * Response message for the CheckAssetLinks call.
 */
export interface CheckResponse {
  /**
   * Human-readable message containing information intended to help end users
   * understand, reproduce and debug the result. The message will be in English
   * and we are currently not planning to offer any translations. Please note
   * that no guarantees are made about the contents or format of this string.
   * Any aspect of it may be subject to change without notice. You should not
   * attempt to programmatically parse this data. For programmatic access, use
   * the error_code field below.
   */
  debugString?: string;
  /**
   * Error codes that describe the result of the Check operation.
   */
  errorCode?:  | "ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_INVALID_QUERY" | "ERROR_CODE_FETCH_ERROR" | "ERROR_CODE_FAILED_SSL_VALIDATION" | "ERROR_CODE_REDIRECT" | "ERROR_CODE_TOO_LARGE" | "ERROR_CODE_MALFORMED_HTTP_RESPONSE" | "ERROR_CODE_WRONG_CONTENT_TYPE" | "ERROR_CODE_MALFORMED_CONTENT" | "ERROR_CODE_SECURE_ASSET_INCLUDES_INSECURE" | "ERROR_CODE_FETCH_BUDGET_EXHAUSTED"[];
  /**
   * Set to true if the assets specified in the request are linked by the
   * relation specified in the request.
   */
  linked?: boolean;
  /**
   * From serving time, how much longer the response should be considered valid
   * barring further updates. REQUIRED
   */
  maxAge?: number /* Duration */;
}

function serializeCheckResponse(data: any): CheckResponse {
  return {
    ...data,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
  };
}

function deserializeCheckResponse(data: any): CheckResponse {
  return {
    ...data,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
  };
}

/**
 * Response message for the List call.
 */
export interface ListResponse {
  /**
   * Human-readable message containing information intended to help end users
   * understand, reproduce and debug the result. The message will be in English
   * and we are currently not planning to offer any translations. Please note
   * that no guarantees are made about the contents or format of this string.
   * Any aspect of it may be subject to change without notice. You should not
   * attempt to programmatically parse this data. For programmatic access, use
   * the error_code field below.
   */
  debugString?: string;
  /**
   * Error codes that describe the result of the List operation.
   */
  errorCode?:  | "ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_INVALID_QUERY" | "ERROR_CODE_FETCH_ERROR" | "ERROR_CODE_FAILED_SSL_VALIDATION" | "ERROR_CODE_REDIRECT" | "ERROR_CODE_TOO_LARGE" | "ERROR_CODE_MALFORMED_HTTP_RESPONSE" | "ERROR_CODE_WRONG_CONTENT_TYPE" | "ERROR_CODE_MALFORMED_CONTENT" | "ERROR_CODE_SECURE_ASSET_INCLUDES_INSECURE" | "ERROR_CODE_FETCH_BUDGET_EXHAUSTED"[];
  /**
   * From serving time, how much longer the response should be considered valid
   * barring further updates. REQUIRED
   */
  maxAge?: number /* Duration */;
  /**
   * A list of all the matching statements that have been found.
   */
  statements?: Statement[];
}

function serializeListResponse(data: any): ListResponse {
  return {
    ...data,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
  };
}

function deserializeListResponse(data: any): ListResponse {
  return {
    ...data,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
  };
}

/**
 * Describes a reliable statement that has been made about the relationship
 * between a source asset and a target asset. Statements are always made by the
 * source asset, either directly or by delegating to a statement list that is
 * stored elsewhere. For more detailed definitions of statements and assets,
 * please refer to our [API documentation landing
 * page](/digital-asset-links/v1/getting-started).
 */
export interface Statement {
  /**
   * The relation identifies the use of the statement as intended by the source
   * asset's owner (that is, the person or entity who issued the statement).
   * Every complete statement has a relation. We identify relations with strings
   * of the format `/`, where `` must be one of a set of pre-defined purpose
   * categories, and `` is a free-form lowercase alphanumeric string that
   * describes the specific use case of the statement. Refer to [our API
   * documentation](/digital-asset-links/v1/relation-strings) for the current
   * list of supported relations. Example:
   * `delegate_permission/common.handle_all_urls` REQUIRED
   */
  relation?: string;
  /**
   * Every statement has a source asset. REQUIRED
   */
  source?: Asset;
  /**
   * Every statement has a target asset. REQUIRED
   */
  target?: Asset;
}

/**
 * Additional options for DigitalAssetLinks#statementsList.
 */
export interface StatementsListOptions {
  /**
   * Use only associations that match the specified relation. See the
   * [`Statement`](#Statement) message for a detailed definition of relation
   * strings. For a query to match a statement, one of the following must be
   * true: * both the query's and the statement's relation strings match
   * exactly, or * the query's relation string is empty or missing. Example: A
   * query with relation `delegate_permission/common.handle_all_urls` matches an
   * asset link with relation `delegate_permission/common.handle_all_urls`.
   */
  relation?: string;
  /**
   * The uppercase SHA-265 fingerprint of the certificate. From the PEM
   * certificate, it can be acquired like this: $ keytool -printcert -file
   * $CERTFILE | grep SHA256: SHA256:
   * 14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83: \
   * 42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 or like this: $ openssl x509 -in
   * $CERTFILE -noout -fingerprint -sha256 SHA256
   * Fingerprint=14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64: \
   * 16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5 In this example, the
   * contents of this field would be `14:6D:E9:83:C5:73:
   * 06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:
   * 44:E5`. If these tools are not available to you, you can convert the PEM
   * certificate into the DER format, compute the SHA-256 hash of that string
   * and represent the result as a hexstring (that is, uppercase hexadecimal
   * representations of each octet, separated by colons).
   */
  ["source.androidApp.certificate.sha256Fingerprint"]?: string;
  /**
   * Android App assets are naturally identified by their Java package name.
   * For example, the Google Maps app uses the package name
   * `com.google.android.apps.maps`. REQUIRED
   */
  ["source.androidApp.packageName"]?: string;
  /**
   * Web assets are identified by a URL that contains only the scheme, hostname
   * and port parts. The format is http[s]://[:] Hostnames must be fully
   * qualified: they must end in a single period ("`.`"). Only the schemes
   * "http" and "https" are currently allowed. Port numbers are given as a
   * decimal number, and they must be omitted if the standard port numbers are
   * used: 80 for http and 443 for https. We call this limited URL the "site".
   * All URLs that share the same scheme, hostname and port are considered to be
   * a part of the site and thus belong to the web asset. Example: the asset
   * with the site `https://www.google.com` contains all these URLs: *
   * `https://www.google.com/` * `https://www.google.com:443/` *
   * `https://www.google.com/foo` * `https://www.google.com/foo?bar` *
   * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/`
   * But it does not contain these URLs: * `http://www.google.com/` (wrong
   * scheme) * `https://google.com/` (hostname does not match) *
   * `https://www.google.com:444/` (port does not match) REQUIRED
   */
  ["source.web.site"]?: string;
}

/**
 * A single statement to check in a bulk call using BulkCheck. See CheckRequest
 * for details about each field.
 */
export interface StatementTemplate {
  /**
   * The relationship being asserted between the source and target. If omitted,
   * you must specify a BulkCheckRequest.default_relation value to use here.
   */
  relation?: string;
  /**
   * The source asset that is asserting the statement. If omitted, you must
   * specify a BulkCheckRequest.default_source value to use here.
   */
  source?: Asset;
  /**
   * The target that the source is declaring the relationship with. If omitted,
   * you must specify a BulkCheckRequest.default_target to use here.
   */
  target?: Asset;
}

/**
 * Describes a web asset.
 */
export interface WebAsset {
  /**
   * Web assets are identified by a URL that contains only the scheme, hostname
   * and port parts. The format is http[s]://[:] Hostnames must be fully
   * qualified: they must end in a single period ("`.`"). Only the schemes
   * "http" and "https" are currently allowed. Port numbers are given as a
   * decimal number, and they must be omitted if the standard port numbers are
   * used: 80 for http and 443 for https. We call this limited URL the "site".
   * All URLs that share the same scheme, hostname and port are considered to be
   * a part of the site and thus belong to the web asset. Example: the asset
   * with the site `https://www.google.com` contains all these URLs: *
   * `https://www.google.com/` * `https://www.google.com:443/` *
   * `https://www.google.com/foo` * `https://www.google.com/foo?bar` *
   * `https://www.google.com/foo#bar` * `https://user@password:www.google.com/`
   * But it does not contain these URLs: * `http://www.google.com/` (wrong
   * scheme) * `https://google.com/` (hostname does not match) *
   * `https://www.google.com:444/` (port does not match) REQUIRED
   */
  site?: string;
}