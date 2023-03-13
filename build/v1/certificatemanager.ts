// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Certificate Manager API Client for Deno
 * =======================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/certificate-manager
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class CertificateManager {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://certificatemanager.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new CertificateIssuanceConfig in a given project and location.
   *
   * @param parent Required. The parent resource of the certificate issuance config. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificateIssuanceConfigsCreate(parent: string, req: CertificateIssuanceConfig, opts: ProjectsLocationsCertificateIssuanceConfigsCreateOptions = {}): Promise<Operation> {
    req = serializeCertificateIssuanceConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateIssuanceConfigs`);
    if (opts.certificateIssuanceConfigId !== undefined) {
      url.searchParams.append("certificateIssuanceConfigId", String(opts.certificateIssuanceConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a single CertificateIssuanceConfig.
   *
   * @param name Required. A name of the certificate issuance config to delete. Must be in the format `projects/*\/locations/*\/certificateIssuanceConfigs/*`.
   */
  async projectsLocationsCertificateIssuanceConfigsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single CertificateIssuanceConfig.
   *
   * @param name Required. A name of the certificate issuance config to describe. Must be in the format `projects/*\/locations/*\/certificateIssuanceConfigs/*`.
   */
  async projectsLocationsCertificateIssuanceConfigsGet(name: string): Promise<CertificateIssuanceConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCertificateIssuanceConfig(data);
  }

  /**
   * Lists CertificateIssuanceConfigs in a given project and location.
   *
   * @param parent Required. The project and location from which the certificate should be listed, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificateIssuanceConfigsList(parent: string, opts: ProjectsLocationsCertificateIssuanceConfigsListOptions = {}): Promise<ListCertificateIssuanceConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateIssuanceConfigs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
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
    return deserializeListCertificateIssuanceConfigsResponse(data);
  }

  /**
   * Creates a new CertificateMapEntry in a given project and location.
   *
   * @param parent Required. The parent resource of the certificate map entry. Must be in the format `projects/*\/locations/*\/certificateMaps/*`.
   */
  async projectsLocationsCertificateMapsCertificateMapEntriesCreate(parent: string, req: CertificateMapEntry, opts: ProjectsLocationsCertificateMapsCertificateMapEntriesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateMapEntries`);
    if (opts.certificateMapEntryId !== undefined) {
      url.searchParams.append("certificateMapEntryId", String(opts.certificateMapEntryId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a single CertificateMapEntry.
   *
   * @param name Required. A name of the certificate map entry to delete. Must be in the format `projects/*\/locations/*\/certificateMaps/*\/certificateMapEntries/*`.
   */
  async projectsLocationsCertificateMapsCertificateMapEntriesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single CertificateMapEntry.
   *
   * @param name Required. A name of the certificate map entry to describe. Must be in the format `projects/*\/locations/*\/certificateMaps/*\/certificateMapEntries/*`.
   */
  async projectsLocationsCertificateMapsCertificateMapEntriesGet(name: string): Promise<CertificateMapEntry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CertificateMapEntry;
  }

  /**
   * Lists CertificateMapEntries in a given project and location.
   *
   * @param parent Required. The project, location and certificate map from which the certificate map entries should be listed, specified in the format `projects/*\/locations/*\/certificateMaps/*`.
   */
  async projectsLocationsCertificateMapsCertificateMapEntriesList(parent: string, opts: ProjectsLocationsCertificateMapsCertificateMapEntriesListOptions = {}): Promise<ListCertificateMapEntriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateMapEntries`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
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
    return data as ListCertificateMapEntriesResponse;
  }

  /**
   * Updates a CertificateMapEntry.
   *
   * @param name A user-defined name of the Certificate Map Entry. Certificate Map Entry names must be unique globally and match pattern `projects/*\/locations/*\/certificateMaps/*\/certificateMapEntries/*`.
   */
  async projectsLocationsCertificateMapsCertificateMapEntriesPatch(name: string, req: CertificateMapEntry, opts: ProjectsLocationsCertificateMapsCertificateMapEntriesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsCertificateMapsCertificateMapEntriesPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Creates a new CertificateMap in a given project and location.
   *
   * @param parent Required. The parent resource of the certificate map. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificateMapsCreate(parent: string, req: CertificateMap, opts: ProjectsLocationsCertificateMapsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateMaps`);
    if (opts.certificateMapId !== undefined) {
      url.searchParams.append("certificateMapId", String(opts.certificateMapId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a single CertificateMap. A Certificate Map can't be deleted if it
   * contains Certificate Map Entries. Remove all the entries from the map
   * before calling this method.
   *
   * @param name Required. A name of the certificate map to delete. Must be in the format `projects/*\/locations/*\/certificateMaps/*`.
   */
  async projectsLocationsCertificateMapsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single CertificateMap.
   *
   * @param name Required. A name of the certificate map to describe. Must be in the format `projects/*\/locations/*\/certificateMaps/*`.
   */
  async projectsLocationsCertificateMapsGet(name: string): Promise<CertificateMap> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CertificateMap;
  }

  /**
   * Lists CertificateMaps in a given project and location.
   *
   * @param parent Required. The project and location from which the certificate maps should be listed, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificateMapsList(parent: string, opts: ProjectsLocationsCertificateMapsListOptions = {}): Promise<ListCertificateMapsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateMaps`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
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
    return data as ListCertificateMapsResponse;
  }

  /**
   * Updates a CertificateMap.
   *
   * @param name A user-defined name of the Certificate Map. Certificate Map names must be unique globally and match pattern `projects/*\/locations/*\/certificateMaps/*`.
   */
  async projectsLocationsCertificateMapsPatch(name: string, req: CertificateMap, opts: ProjectsLocationsCertificateMapsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsCertificateMapsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Creates a new Certificate in a given project and location.
   *
   * @param parent Required. The parent resource of the certificate. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificatesCreate(parent: string, req: Certificate, opts: ProjectsLocationsCertificatesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificates`);
    if (opts.certificateId !== undefined) {
      url.searchParams.append("certificateId", String(opts.certificateId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a single Certificate.
   *
   * @param name Required. A name of the certificate to delete. Must be in the format `projects/*\/locations/*\/certificates/*`.
   */
  async projectsLocationsCertificatesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Certificate.
   *
   * @param name Required. A name of the certificate to describe. Must be in the format `projects/*\/locations/*\/certificates/*`.
   */
  async projectsLocationsCertificatesGet(name: string): Promise<Certificate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Certificate;
  }

  /**
   * Lists Certificates in a given project and location.
   *
   * @param parent Required. The project and location from which the certificate should be listed, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificatesList(parent: string, opts: ProjectsLocationsCertificatesListOptions = {}): Promise<ListCertificatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificates`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
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
    return data as ListCertificatesResponse;
  }

  /**
   * Updates a Certificate.
   *
   * @param name A user-defined name of the certificate. Certificate names must be unique globally and match pattern `projects/*\/locations/*\/certificates/*`.
   */
  async projectsLocationsCertificatesPatch(name: string, req: Certificate, opts: ProjectsLocationsCertificatesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsCertificatesPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Creates a new DnsAuthorization in a given project and location.
   *
   * @param parent Required. The parent resource of the dns authorization. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsDnsAuthorizationsCreate(parent: string, req: DnsAuthorization, opts: ProjectsLocationsDnsAuthorizationsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dnsAuthorizations`);
    if (opts.dnsAuthorizationId !== undefined) {
      url.searchParams.append("dnsAuthorizationId", String(opts.dnsAuthorizationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a single DnsAuthorization.
   *
   * @param name Required. A name of the dns authorization to delete. Must be in the format `projects/*\/locations/*\/dnsAuthorizations/*`.
   */
  async projectsLocationsDnsAuthorizationsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single DnsAuthorization.
   *
   * @param name Required. A name of the dns authorization to describe. Must be in the format `projects/*\/locations/*\/dnsAuthorizations/*`.
   */
  async projectsLocationsDnsAuthorizationsGet(name: string): Promise<DnsAuthorization> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DnsAuthorization;
  }

  /**
   * Lists DnsAuthorizations in a given project and location.
   *
   * @param parent Required. The project and location from which the dns authorizations should be listed, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsDnsAuthorizationsList(parent: string, opts: ProjectsLocationsDnsAuthorizationsListOptions = {}): Promise<ListDnsAuthorizationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dnsAuthorizations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
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
    return data as ListDnsAuthorizationsResponse;
  }

  /**
   * Updates a DnsAuthorization.
   *
   * @param name A user-defined name of the dns authorization. DnsAuthorization names must be unique globally and match pattern `projects/*\/locations/*\/dnsAuthorizations/*`.
   */
  async projectsLocationsDnsAuthorizationsPatch(name: string, req: DnsAuthorization, opts: ProjectsLocationsDnsAuthorizationsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsDnsAuthorizationsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/locations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
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
    return data as ListLocationsResponse;
  }

  /**
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async projectsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsOperationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the
   * `name` binding allows API services to override the binding to use different
   * resource name schemes, such as `users/*\/operations`. To override the
   * binding, API services can add a binding such as
   * `"/v1/{name=users/*}/operations"` to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/operations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
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
    return data as ListOperationsResponse;
  }
}

/**
 * State of the latest attempt to authorize a domain for certificate issuance.
 */
export interface AuthorizationAttemptInfo {
  /**
   * Output only. Human readable explanation for reaching the state. Provided
   * to help address the configuration issues. Not guaranteed to be stable. For
   * programmatic access use FailureReason enum.
   */
  readonly details?: string;
  /**
   * Domain name of the authorization attempt.
   */
  domain?: string;
  /**
   * Output only. Reason for failure of the authorization attempt for the
   * domain.
   */
  readonly failureReason?:  | "FAILURE_REASON_UNSPECIFIED" | "CONFIG" | "CAA" | "RATE_LIMITED";
  /**
   * Output only. State of the domain for managed certificate issuance.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "AUTHORIZING" | "AUTHORIZED" | "FAILED";
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Defines TLS certificate.
 */
export interface Certificate {
  /**
   * Output only. The creation timestamp of a Certificate.
   */
  readonly createTime?: Date;
  /**
   * One or more paragraphs of text description of a certificate.
   */
  description?: string;
  /**
   * Output only. The expiry timestamp of a Certificate.
   */
  readonly expireTime?: Date;
  /**
   * Set of labels associated with a Certificate.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * If set, contains configuration and state of a managed certificate.
   */
  managed?: ManagedCertificate;
  /**
   * A user-defined name of the certificate. Certificate names must be unique
   * globally and match pattern `projects/*\/locations/*\/certificates/*`.
   */
  name?: string;
  /**
   * Output only. The PEM-encoded certificate chain.
   */
  readonly pemCertificate?: string;
  /**
   * Output only. The list of Subject Alternative Names of dnsName type defined
   * in the certificate (see RFC 5280 4.2.1.6). Managed certificates that
   * haven't been provisioned yet have this field populated with a value of the
   * managed.domains field.
   */
  readonly sanDnsnames?: string[];
  /**
   * Immutable. The scope of the certificate.
   */
  scope?:  | "DEFAULT" | "EDGE_CACHE";
  /**
   * If set, defines data of a self-managed certificate.
   */
  selfManaged?: SelfManagedCertificate;
  /**
   * Output only. The last update timestamp of a Certificate.
   */
  readonly updateTime?: Date;
}

/**
 * The CA that issues the workload certificate. It includes CA address, type,
 * authentication to CA service, etc.
 */
export interface CertificateAuthorityConfig {
  /**
   * Defines a CertificateAuthorityServiceConfig.
   */
  certificateAuthorityServiceConfig?: CertificateAuthorityServiceConfig;
}

/**
 * Contains information required to contact CA service.
 */
export interface CertificateAuthorityServiceConfig {
  /**
   * Required. A CA pool resource used to issue a certificate. The CA pool
   * string has a relative resource path following the form
   * "projects/{project}/locations/{location}/caPools/{ca_pool}".
   */
  caPool?: string;
}

/**
 * CertificateIssuanceConfig specifies how to issue and manage a certificate.
 */
export interface CertificateIssuanceConfig {
  /**
   * Required. The CA that issues the workload certificate. It includes the CA
   * address, type, authentication to CA service, etc.
   */
  certificateAuthorityConfig?: CertificateAuthorityConfig;
  /**
   * Output only. The creation timestamp of a CertificateIssuanceConfig.
   */
  readonly createTime?: Date;
  /**
   * One or more paragraphs of text description of a CertificateIssuanceConfig.
   */
  description?: string;
  /**
   * Required. The key algorithm to use when generating the private key.
   */
  keyAlgorithm?:  | "KEY_ALGORITHM_UNSPECIFIED" | "RSA_2048" | "ECDSA_P256";
  /**
   * Set of labels associated with a CertificateIssuanceConfig.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Workload certificate lifetime requested.
   */
  lifetime?: number /* Duration */;
  /**
   * A user-defined name of the certificate issuance config.
   * CertificateIssuanceConfig names must be unique globally and match pattern
   * `projects/*\/locations/*\/certificateIssuanceConfigs/*`.
   */
  name?: string;
  /**
   * Required. Specifies the percentage of elapsed time of the certificate
   * lifetime to wait before renewing the certificate. Must be a number between
   * 1-99, inclusive.
   */
  rotationWindowPercentage?: number;
  /**
   * Output only. The last update timestamp of a CertificateIssuanceConfig.
   */
  readonly updateTime?: Date;
}

function serializeCertificateIssuanceConfig(data: any): CertificateIssuanceConfig {
  return {
    ...data,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
  };
}

function deserializeCertificateIssuanceConfig(data: any): CertificateIssuanceConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Defines a collection of certificate configurations.
 */
export interface CertificateMap {
  /**
   * Output only. The creation timestamp of a Certificate Map.
   */
  readonly createTime?: Date;
  /**
   * One or more paragraphs of text description of a certificate map.
   */
  description?: string;
  /**
   * Output only. A list of GCLB targets that use this Certificate Map. A
   * Target Proxy is only present on this list if it's attached to a Forwarding
   * Rule.
   */
  readonly gclbTargets?: GclbTarget[];
  /**
   * Set of labels associated with a Certificate Map.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A user-defined name of the Certificate Map. Certificate Map names must be
   * unique globally and match pattern
   * `projects/*\/locations/*\/certificateMaps/*`.
   */
  name?: string;
  /**
   * Output only. The update timestamp of a Certificate Map.
   */
  readonly updateTime?: Date;
}

/**
 * Defines a certificate map entry.
 */
export interface CertificateMapEntry {
  /**
   * A set of Certificates defines for the given `hostname`. There can be
   * defined up to fifteen certificates in each Certificate Map Entry. Each
   * certificate must match pattern `projects/*\/locations/*\/certificates/*`.
   */
  certificates?: string[];
  /**
   * Output only. The creation timestamp of a Certificate Map Entry.
   */
  readonly createTime?: Date;
  /**
   * One or more paragraphs of text description of a certificate map entry.
   */
  description?: string;
  /**
   * A Hostname (FQDN, e.g. `example.com`) or a wildcard hostname expression
   * (`*.example.com`) for a set of hostnames with common suffix. Used as Server
   * Name Indication (SNI) for selecting a proper certificate.
   */
  hostname?: string;
  /**
   * Set of labels associated with a Certificate Map Entry.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A predefined matcher for particular cases, other than SNI selection.
   */
  matcher?:  | "MATCHER_UNSPECIFIED" | "PRIMARY";
  /**
   * A user-defined name of the Certificate Map Entry. Certificate Map Entry
   * names must be unique globally and match pattern
   * `projects/*\/locations/*\/certificateMaps/*\/certificateMapEntries/*`.
   */
  name?: string;
  /**
   * Output only. A serving state of this Certificate Map Entry.
   */
  readonly state?:  | "SERVING_STATE_UNSPECIFIED" | "ACTIVE" | "PENDING";
  /**
   * Output only. The update timestamp of a Certificate Map Entry.
   */
  readonly updateTime?: Date;
}

/**
 * A DnsAuthorization resource describes a way to perform domain authorization
 * for certificate issuance.
 */
export interface DnsAuthorization {
  /**
   * Output only. The creation timestamp of a DnsAuthorization.
   */
  readonly createTime?: Date;
  /**
   * One or more paragraphs of text description of a DnsAuthorization.
   */
  description?: string;
  /**
   * Output only. DNS Resource Record that needs to be added to DNS
   * configuration.
   */
  readonly dnsResourceRecord?: DnsResourceRecord;
  /**
   * Required. Immutable. A domain that is being authorized. A DnsAuthorization
   * resource covers a single domain and its wildcard, e.g. authorization for
   * `example.com` can be used to issue certificates for `example.com` and
   * `*.example.com`.
   */
  domain?: string;
  /**
   * Set of labels associated with a DnsAuthorization.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A user-defined name of the dns authorization. DnsAuthorization names must
   * be unique globally and match pattern
   * `projects/*\/locations/*\/dnsAuthorizations/*`.
   */
  name?: string;
  /**
   * Output only. The last update timestamp of a DnsAuthorization.
   */
  readonly updateTime?: Date;
}

/**
 * The structure describing the DNS Resource Record that needs to be added to
 * DNS configuration for the authorization to be usable by certificate.
 */
export interface DnsResourceRecord {
  /**
   * Output only. Data of the DNS Resource Record.
   */
  readonly data?: string;
  /**
   * Output only. Fully qualified name of the DNS Resource Record. e.g.
   * `_acme-challenge.example.com`
   */
  readonly name?: string;
  /**
   * Output only. Type of the DNS Resource Record. Currently always set to
   * "CNAME".
   */
  readonly type?: string;
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
 * Describes a Target Proxy that uses this Certificate Map.
 */
export interface GclbTarget {
  /**
   * Output only. IP configurations for this Target Proxy where the Certificate
   * Map is serving.
   */
  readonly ipConfigs?: IpConfig[];
  /**
   * Output only. This field returns the resource name in the following format:
   * `//compute.googleapis.com/projects/*\/global/targetHttpsProxies/*`.
   */
  readonly targetHttpsProxy?: string;
  /**
   * Output only. This field returns the resource name in the following format:
   * `//compute.googleapis.com/projects/*\/global/targetSslProxies/*`.
   */
  readonly targetSslProxy?: string;
}

/**
 * Defines IP configuration where this Certificate Map is serving.
 */
export interface IpConfig {
  /**
   * Output only. An external IP address.
   */
  readonly ipAddress?: string;
  /**
   * Output only. Ports.
   */
  readonly ports?: number[];
}

/**
 * Response for the `ListCertificateIssuanceConfigs` method.
 */
export interface ListCertificateIssuanceConfigsResponse {
  /**
   * A list of certificate configs for the parent resource.
   */
  certificateIssuanceConfigs?: CertificateIssuanceConfig[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListCertificateIssuanceConfigsResponse(data: any): ListCertificateIssuanceConfigsResponse {
  return {
    ...data,
    certificateIssuanceConfigs: data["certificateIssuanceConfigs"] !== undefined ? data["certificateIssuanceConfigs"].map((item: any) => (serializeCertificateIssuanceConfig(item))) : undefined,
  };
}

function deserializeListCertificateIssuanceConfigsResponse(data: any): ListCertificateIssuanceConfigsResponse {
  return {
    ...data,
    certificateIssuanceConfigs: data["certificateIssuanceConfigs"] !== undefined ? data["certificateIssuanceConfigs"].map((item: any) => (deserializeCertificateIssuanceConfig(item))) : undefined,
  };
}

/**
 * Response for the `ListCertificateMapEntries` method.
 */
export interface ListCertificateMapEntriesResponse {
  /**
   * A list of certificate map entries for the parent resource.
   */
  certificateMapEntries?: CertificateMapEntry[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response for the `ListCertificateMaps` method.
 */
export interface ListCertificateMapsResponse {
  /**
   * A list of certificate maps for the parent resource.
   */
  certificateMaps?: CertificateMap[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response for the `ListCertificates` method.
 */
export interface ListCertificatesResponse {
  /**
   * A list of certificates for the parent resource.
   */
  certificates?: Certificate[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * A list of locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response for the `ListDnsAuthorizations` method.
 */
export interface ListDnsAuthorizationsResponse {
  /**
   * A list of dns authorizations for the parent resource.
   */
  dnsAuthorizations?: DnsAuthorization[];
  /**
   * If there might be more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * The response message for Locations.ListLocations.
 */
export interface ListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: Location[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

/**
 * The response message for Operations.ListOperations.
 */
export interface ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: Operation[];
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface Location {
  /**
   * The friendly name for this location, typically a nearby city name. For
   * example, "Tokyo".
   */
  displayName?: string;
  /**
   * Cross-service attributes for the location. For example
   * {"cloud.googleapis.com/region": "us-east1"}
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The canonical id for this location. For example: `"us-east1"`.
   */
  locationId?: string;
  /**
   * Service-specific metadata. For example the available capacity at the given
   * location.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Resource name for the location, which may vary between implementations.
   * For example: `"projects/example-project/locations/us-east1"`
   */
  name?: string;
}

/**
 * Configuration and state of a Managed Certificate. Certificate Manager
 * provisions and renews Managed Certificates automatically, for as long as it's
 * authorized to do so.
 */
export interface ManagedCertificate {
  /**
   * Output only. Detailed state of the latest authorization attempt for each
   * domain specified for managed certificate resource.
   */
  readonly authorizationAttemptInfo?: AuthorizationAttemptInfo[];
  /**
   * Immutable. Authorizations that will be used for performing domain
   * authorization.
   */
  dnsAuthorizations?: string[];
  /**
   * Immutable. The domains for which a managed SSL certificate will be
   * generated. Wildcard domains are only supported with DNS challenge
   * resolution.
   */
  domains?: string[];
  /**
   * Immutable. The resource name for a CertificateIssuanceConfig used to
   * configure private PKI certificates in the format
   * `projects/*\/locations/*\/certificateIssuanceConfigs/*`. If this field is
   * not set, the certificates will instead be publicly signed as documented at
   * https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs#caa.
   */
  issuanceConfig?: string;
  /**
   * Output only. Information about issues with provisioning a Managed
   * Certificate.
   */
  readonly provisioningIssue?: ProvisioningIssue;
  /**
   * Output only. State of the managed certificate resource.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PROVISIONING" | "FAILED" | "ACTIVE";
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: Status;
  /**
   * Service-specific metadata associated with the operation. It typically
   * contains progress information and common metadata such as create time. Some
   * services might not provide such metadata. Any method that returns a
   * long-running operation should document the metadata type, if any.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * The server-assigned name, which is only unique within the same service
   * that originally returns it. If you use the default HTTP mapping, the `name`
   * should be a resource name ending with `operations/{unique_id}`.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as `Delete`, the response is
   * `google.protobuf.Empty`. If the original method is standard
   * `Get`/`Create`/`Update`, the response should be the resource. For other
   * methods, the response should have the type `XxxResponse`, where `Xxx` is
   * the original method name. For example, if the original method name is
   * `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Represents the metadata of the long-running operation. Output only.
 */
export interface OperationMetadata {
  /**
   * API version used to start the operation.
   */
  apiVersion?: string;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * Identifies whether the user has requested cancellation of the operation.
   * Operations that have successfully been cancelled have Operation.error value
   * with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
   */
  requestedCancellation?: boolean;
  /**
   * Human-readable status of the operation, if any.
   */
  statusMessage?: string;
  /**
   * Server-defined resource path for the target of the operation.
   */
  target?: string;
  /**
   * Name of the verb executed by the operation.
   */
  verb?: string;
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateIssuanceConfigsCreate.
 */
export interface ProjectsLocationsCertificateIssuanceConfigsCreateOptions {
  /**
   * Required. A user-provided name of the certificate config.
   */
  certificateIssuanceConfigId?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateIssuanceConfigsList.
 */
export interface ProjectsLocationsCertificateIssuanceConfigsListOptions {
  /**
   * Filter expression to restrict the Certificates Configs returned.
   */
  filter?: string;
  /**
   * A list of Certificate Config field names used to specify the order of the
   * returned results. The default sorting order is ascending. To specify
   * descending order for a field, add a suffix " desc".
   */
  orderBy?: string;
  /**
   * Maximum number of certificate configs to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListCertificateIssuanceConfigsResponse`.
   * Indicates that this is a continuation of a prior
   * `ListCertificateIssuanceConfigs` call, and that the system should return
   * the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateMapsCertificateMapEntriesCreate.
 */
export interface ProjectsLocationsCertificateMapsCertificateMapEntriesCreateOptions {
  /**
   * Required. A user-provided name of the certificate map entry.
   */
  certificateMapEntryId?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateMapsCertificateMapEntriesList.
 */
export interface ProjectsLocationsCertificateMapsCertificateMapEntriesListOptions {
  /**
   * Filter expression to restrict the returned Certificate Map Entries.
   */
  filter?: string;
  /**
   * A list of Certificate Map Entry field names used to specify the order of
   * the returned results. The default sorting order is ascending. To specify
   * descending order for a field, add a suffix " desc".
   */
  orderBy?: string;
  /**
   * Maximum number of certificate map entries to return. The service may
   * return fewer than this value. If unspecified, at most 50 certificate map
   * entries will be returned. The maximum value is 1000; values above 1000 will
   * be coerced to 1000.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListCertificateMapEntriesResponse`.
   * Indicates that this is a continuation of a prior
   * `ListCertificateMapEntries` call, and that the system should return the
   * next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateMapsCertificateMapEntriesPatch.
 */
export interface ProjectsLocationsCertificateMapsCertificateMapEntriesPatchOptions {
  /**
   * Required. The update mask applies to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCertificateMapsCertificateMapEntriesPatchOptions(data: any): ProjectsLocationsCertificateMapsCertificateMapEntriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCertificateMapsCertificateMapEntriesPatchOptions(data: any): ProjectsLocationsCertificateMapsCertificateMapEntriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateMapsCreate.
 */
export interface ProjectsLocationsCertificateMapsCreateOptions {
  /**
   * Required. A user-provided name of the certificate map.
   */
  certificateMapId?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateMapsList.
 */
export interface ProjectsLocationsCertificateMapsListOptions {
  /**
   * Filter expression to restrict the Certificates Maps returned.
   */
  filter?: string;
  /**
   * A list of Certificate Map field names used to specify the order of the
   * returned results. The default sorting order is ascending. To specify
   * descending order for a field, add a suffix " desc".
   */
  orderBy?: string;
  /**
   * Maximum number of certificate maps to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListCertificateMapsResponse`. Indicates
   * that this is a continuation of a prior `ListCertificateMaps` call, and that
   * the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificateMapsPatch.
 */
export interface ProjectsLocationsCertificateMapsPatchOptions {
  /**
   * Required. The update mask applies to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCertificateMapsPatchOptions(data: any): ProjectsLocationsCertificateMapsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCertificateMapsPatchOptions(data: any): ProjectsLocationsCertificateMapsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificatesCreate.
 */
export interface ProjectsLocationsCertificatesCreateOptions {
  /**
   * Required. A user-provided name of the certificate.
   */
  certificateId?: string;
}

/**
 * Additional options for CertificateManager#projectsLocationsCertificatesList.
 */
export interface ProjectsLocationsCertificatesListOptions {
  /**
   * Filter expression to restrict the Certificates returned.
   */
  filter?: string;
  /**
   * A list of Certificate field names used to specify the order of the
   * returned results. The default sorting order is ascending. To specify
   * descending order for a field, add a suffix " desc".
   */
  orderBy?: string;
  /**
   * Maximum number of certificates to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListCertificatesResponse`. Indicates that
   * this is a continuation of a prior `ListCertificates` call, and that the
   * system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsCertificatesPatch.
 */
export interface ProjectsLocationsCertificatesPatchOptions {
  /**
   * Required. The update mask applies to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCertificatesPatchOptions(data: any): ProjectsLocationsCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCertificatesPatchOptions(data: any): ProjectsLocationsCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsDnsAuthorizationsCreate.
 */
export interface ProjectsLocationsDnsAuthorizationsCreateOptions {
  /**
   * Required. A user-provided name of the dns authorization.
   */
  dnsAuthorizationId?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsDnsAuthorizationsList.
 */
export interface ProjectsLocationsDnsAuthorizationsListOptions {
  /**
   * Filter expression to restrict the Dns Authorizations returned.
   */
  filter?: string;
  /**
   * A list of Dns Authorization field names used to specify the order of the
   * returned results. The default sorting order is ascending. To specify
   * descending order for a field, add a suffix " desc".
   */
  orderBy?: string;
  /**
   * Maximum number of dns authorizations to return per call.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListDnsAuthorizationsResponse`. Indicates
   * that this is a continuation of a prior `ListDnsAuthorizations` call, and
   * that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CertificateManager#projectsLocationsDnsAuthorizationsPatch.
 */
export interface ProjectsLocationsDnsAuthorizationsPatchOptions {
  /**
   * Required. The update mask applies to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDnsAuthorizationsPatchOptions(data: any): ProjectsLocationsDnsAuthorizationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDnsAuthorizationsPatchOptions(data: any): ProjectsLocationsDnsAuthorizationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CertificateManager#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like `"displayName=tokyo"`, and is documented in
   * more detail in [AIP-160](https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the `next_page_token` field in the response.
   * Send that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for CertificateManager#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * Information about issues with provisioning a Managed Certificate.
 */
export interface ProvisioningIssue {
  /**
   * Output only. Human readable explanation about the issue. Provided to help
   * address the configuration issues. Not guaranteed to be stable. For
   * programmatic access use Reason enum.
   */
  readonly details?: string;
  /**
   * Output only. Reason for provisioning failures.
   */
  readonly reason?:  | "REASON_UNSPECIFIED" | "AUTHORIZATION_ISSUE" | "RATE_LIMITED";
}

/**
 * Certificate data for a SelfManaged Certificate. SelfManaged Certificates are
 * uploaded by the user. Updating such certificates before they expire remains
 * the user's responsibility.
 */
export interface SelfManagedCertificate {
  /**
   * Input only. The PEM-encoded certificate chain. Leaf certificate comes
   * first, followed by intermediate ones if any.
   */
  pemCertificate?: string;
  /**
   * Input only. The PEM-encoded private key of the leaf certificate.
   */
  pemPrivateKey?: string;
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface Status {
  /**
   * The status code, which should be an enum value of google.rpc.Code.
   */
  code?: number;
  /**
   * A list of messages that carry the error details. There is a common set of
   * message types for APIs to use.
   */
  details?: {
    [key: string]: any
  }[];
  /**
   * A developer-facing error message, which should be in English. Any
   * user-facing error message should be localized and sent in the
   * google.rpc.Status.details field, or localized by the client.
   */
  message?: string;
}