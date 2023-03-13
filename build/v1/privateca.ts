// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Certificate Authority API Client for Deno
 * =========================================
 * 
 * The Certificate Authority Service API is a highly-available, scalable service that enables you to simplify and automate the management of private certificate authorities (CAs) while staying in control of your private keys. 
 * 
 * Docs: https://cloud.google.com/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Certificate Authority Service API is a highly-available, scalable
 * service that enables you to simplify and automate the management of private
 * certificate authorities (CAs) while staying in control of your private keys.
 */
export class privateca {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://privateca.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Activate a CertificateAuthority that is in state AWAITING_USER_ACTIVATION
   * and is of type SUBORDINATE. After the parent Certificate Authority signs a
   * certificate signing request from FetchCertificateAuthorityCsr, this method
   * can complete the activation process.
   *
   * @param name Required. The resource name for this CertificateAuthority in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesActivate(name: string, req: ActivateCertificateAuthorityRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Returns a CertificateRevocationList.
   *
   * @param name Required. The name of the CertificateRevocationList to get.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsGet(name: string): Promise<CertificateRevocationList> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CertificateRevocationList;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsGetIamPolicy(resource: string, opts: ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists CertificateRevocationLists.
   *
   * @param parent Required. The resource name of the location associated with the CertificateRevocationLists, in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsList(parent: string, opts: ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsListOptions = {}): Promise<ListCertificateRevocationListsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateRevocationLists`);
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
    return data as ListCertificateRevocationListsResponse;
  }

  /**
   * Update a CertificateRevocationList.
   *
   * @param name Output only. The resource name for this CertificateRevocationList in the format `projects/*\/locations/*\/caPools/*certificateAuthorities/*\/ certificateRevocationLists/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatch(name: string, req: CertificateRevocationList, opts: ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Create a new CertificateAuthority in a given Project and Location.
   *
   * @param parent Required. The resource name of the CaPool associated with the CertificateAuthorities, in the format `projects/*\/locations/*\/caPools/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesCreate(parent: string, req: CertificateAuthority, opts: ProjectsLocationsCaPoolsCertificateAuthoritiesCreateOptions = {}): Promise<Operation> {
    req = serializeCertificateAuthority(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateAuthorities`);
    if (opts.certificateAuthorityId !== undefined) {
      url.searchParams.append("certificateAuthorityId", String(opts.certificateAuthorityId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Delete a CertificateAuthority.
   *
   * @param name Required. The resource name for this CertificateAuthority in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesDelete(name: string, opts: ProjectsLocationsCaPoolsCertificateAuthoritiesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.ignoreActiveCertificates !== undefined) {
      url.searchParams.append("ignoreActiveCertificates", String(opts.ignoreActiveCertificates));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.skipGracePeriod !== undefined) {
      url.searchParams.append("skipGracePeriod", String(opts.skipGracePeriod));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Disable a CertificateAuthority.
   *
   * @param name Required. The resource name for this CertificateAuthority in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesDisable(name: string, req: DisableCertificateAuthorityRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:disable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Enable a CertificateAuthority.
   *
   * @param name Required. The resource name for this CertificateAuthority in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesEnable(name: string, req: EnableCertificateAuthorityRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:enable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Fetch a certificate signing request (CSR) from a CertificateAuthority that
   * is in state AWAITING_USER_ACTIVATION and is of type SUBORDINATE. The CSR
   * must then be signed by the desired parent Certificate Authority, which
   * could be another CertificateAuthority resource, or could be an on-prem
   * certificate authority. See also ActivateCertificateAuthority.
   *
   * @param name Required. The resource name for this CertificateAuthority in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesFetch(name: string): Promise<FetchCertificateAuthorityCsrResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:fetch`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FetchCertificateAuthorityCsrResponse;
  }

  /**
   * Returns a CertificateAuthority.
   *
   * @param name Required. The name of the CertificateAuthority to get.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesGet(name: string): Promise<CertificateAuthority> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCertificateAuthority(data);
  }

  /**
   * Lists CertificateAuthorities.
   *
   * @param parent Required. The resource name of the CaPool associated with the CertificateAuthorities, in the format `projects/*\/locations/*\/caPools/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesList(parent: string, opts: ProjectsLocationsCaPoolsCertificateAuthoritiesListOptions = {}): Promise<ListCertificateAuthoritiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateAuthorities`);
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
    return deserializeListCertificateAuthoritiesResponse(data);
  }

  /**
   * Update a CertificateAuthority.
   *
   * @param name Output only. The resource name for this CertificateAuthority in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesPatch(name: string, req: CertificateAuthority, opts: ProjectsLocationsCaPoolsCertificateAuthoritiesPatchOptions = {}): Promise<Operation> {
    req = serializeCertificateAuthority(req);
    opts = serializeProjectsLocationsCaPoolsCertificateAuthoritiesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
   * Undelete a CertificateAuthority that has been deleted.
   *
   * @param name Required. The resource name for this CertificateAuthority in the format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  async projectsLocationsCaPoolsCertificateAuthoritiesUndelete(name: string, req: UndeleteCertificateAuthorityRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Create a new Certificate in a given Project, Location from a particular
   * CaPool.
   *
   * @param parent Required. The resource name of the CaPool associated with the Certificate, in the format `projects/*\/locations/*\/caPools/*`.
   */
  async projectsLocationsCaPoolsCertificatesCreate(parent: string, req: Certificate, opts: ProjectsLocationsCaPoolsCertificatesCreateOptions = {}): Promise<Certificate> {
    req = serializeCertificate(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificates`);
    if (opts.certificateId !== undefined) {
      url.searchParams.append("certificateId", String(opts.certificateId));
    }
    if (opts.issuingCertificateAuthorityId !== undefined) {
      url.searchParams.append("issuingCertificateAuthorityId", String(opts.issuingCertificateAuthorityId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCertificate(data);
  }

  /**
   * Returns a Certificate.
   *
   * @param name Required. The name of the Certificate to get.
   */
  async projectsLocationsCaPoolsCertificatesGet(name: string): Promise<Certificate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCertificate(data);
  }

  /**
   * Lists Certificates.
   *
   * @param parent Required. The resource name of the location associated with the Certificates, in the format `projects/*\/locations/*\/caPools/*`.
   */
  async projectsLocationsCaPoolsCertificatesList(parent: string, opts: ProjectsLocationsCaPoolsCertificatesListOptions = {}): Promise<ListCertificatesResponse> {
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
    return deserializeListCertificatesResponse(data);
  }

  /**
   * Update a Certificate. Currently, the only field you can update is the
   * labels field.
   *
   * @param name Output only. The resource name for this Certificate in the format `projects/*\/locations/*\/caPools/*\/certificates/*`.
   */
  async projectsLocationsCaPoolsCertificatesPatch(name: string, req: Certificate, opts: ProjectsLocationsCaPoolsCertificatesPatchOptions = {}): Promise<Certificate> {
    req = serializeCertificate(req);
    opts = serializeProjectsLocationsCaPoolsCertificatesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCertificate(data);
  }

  /**
   * Revoke a Certificate.
   *
   * @param name Required. The resource name for this Certificate in the format `projects/*\/locations/*\/caPools/*\/certificates/*`.
   */
  async projectsLocationsCaPoolsCertificatesRevoke(name: string, req: RevokeCertificateRequest): Promise<Certificate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:revoke`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCertificate(data);
  }

  /**
   * Create a CaPool.
   *
   * @param parent Required. The resource name of the location associated with the CaPool, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCaPoolsCreate(parent: string, req: CaPool, opts: ProjectsLocationsCaPoolsCreateOptions = {}): Promise<Operation> {
    req = serializeCaPool(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/caPools`);
    if (opts.caPoolId !== undefined) {
      url.searchParams.append("caPoolId", String(opts.caPoolId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Delete a CaPool.
   *
   * @param name Required. The resource name for this CaPool in the format `projects/*\/locations/*\/caPools/*`.
   */
  async projectsLocationsCaPoolsDelete(name: string, opts: ProjectsLocationsCaPoolsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * FetchCaCerts returns the current trust anchor for the CaPool. This will
   * include CA certificate chains for all ACTIVE CertificateAuthority resources
   * in the CaPool.
   *
   * @param caPool Required. The resource name for the CaPool in the format `projects/*\/locations/*\/caPools/*`.
   */
  async projectsLocationsCaPoolsFetchCaCerts(caPool: string, req: FetchCaCertsRequest): Promise<FetchCaCertsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ caPool }:fetchCaCerts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as FetchCaCertsResponse;
  }

  /**
   * Returns a CaPool.
   *
   * @param name Required. The name of the CaPool to get.
   */
  async projectsLocationsCaPoolsGet(name: string): Promise<CaPool> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCaPool(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCaPoolsGetIamPolicy(resource: string, opts: ProjectsLocationsCaPoolsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists CaPools.
   *
   * @param parent Required. The resource name of the location associated with the CaPools, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCaPoolsList(parent: string, opts: ProjectsLocationsCaPoolsListOptions = {}): Promise<ListCaPoolsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/caPools`);
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
    return deserializeListCaPoolsResponse(data);
  }

  /**
   * Update a CaPool.
   *
   * @param name Output only. The resource name for this CaPool in the format `projects/*\/locations/*\/caPools/*`.
   */
  async projectsLocationsCaPoolsPatch(name: string, req: CaPool, opts: ProjectsLocationsCaPoolsPatchOptions = {}): Promise<Operation> {
    req = serializeCaPool(req);
    opts = serializeProjectsLocationsCaPoolsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCaPoolsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCaPoolsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Create a new CertificateTemplate in a given Project and Location.
   *
   * @param parent Required. The resource name of the location associated with the CertificateTemplate, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificateTemplatesCreate(parent: string, req: CertificateTemplate, opts: ProjectsLocationsCertificateTemplatesCreateOptions = {}): Promise<Operation> {
    req = serializeCertificateTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateTemplates`);
    if (opts.certificateTemplateId !== undefined) {
      url.searchParams.append("certificateTemplateId", String(opts.certificateTemplateId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * DeleteCertificateTemplate deletes a CertificateTemplate.
   *
   * @param name Required. The resource name for this CertificateTemplate in the format `projects/*\/locations/*\/certificateTemplates/*`.
   */
  async projectsLocationsCertificateTemplatesDelete(name: string, opts: ProjectsLocationsCertificateTemplatesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Returns a CertificateTemplate.
   *
   * @param name Required. The name of the CertificateTemplate to get.
   */
  async projectsLocationsCertificateTemplatesGet(name: string): Promise<CertificateTemplate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCertificateTemplate(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCertificateTemplatesGetIamPolicy(resource: string, opts: ProjectsLocationsCertificateTemplatesGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists CertificateTemplates.
   *
   * @param parent Required. The resource name of the location associated with the CertificateTemplates, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsCertificateTemplatesList(parent: string, opts: ProjectsLocationsCertificateTemplatesListOptions = {}): Promise<ListCertificateTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/certificateTemplates`);
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
    return deserializeListCertificateTemplatesResponse(data);
  }

  /**
   * Update a CertificateTemplate.
   *
   * @param name Output only. The resource name for this CertificateTemplate in the format `projects/*\/locations/*\/certificateTemplates/*`.
   */
  async projectsLocationsCertificateTemplatesPatch(name: string, req: CertificateTemplate, opts: ProjectsLocationsCertificateTemplatesPatchOptions = {}): Promise<Operation> {
    req = serializeCertificateTemplate(req);
    opts = serializeProjectsLocationsCertificateTemplatesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCertificateTemplatesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsCertificateTemplatesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
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
 * URLs where a CertificateAuthority will publish content.
 */
export interface AccessUrls {
  /**
   * The URL where this CertificateAuthority's CA certificate is published.
   * This will only be set for CAs that have been activated.
   */
  caCertificateAccessUrl?: string;
  /**
   * The URLs where this CertificateAuthority's CRLs are published. This will
   * only be set for CAs that have been activated.
   */
  crlAccessUrls?: string[];
}

/**
 * Request message for
 * CertificateAuthorityService.ActivateCertificateAuthority.
 */
export interface ActivateCertificateAuthorityRequest {
  /**
   * Required. The signed CA certificate issued from
   * FetchCertificateAuthorityCsrResponse.pem_csr.
   */
  pemCaCertificate?: string;
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Must include information about the issuer of
   * 'pem_ca_certificate', and any further issuers until the self-signed CA.
   */
  subordinateConfig?: SubordinateConfig;
}

/**
 * Describes a "type" of key that may be used in a Certificate issued from a
 * CaPool. Note that a single AllowedKeyType may refer to either a
 * fully-qualified key algorithm, such as RSA 4096, or a family of key
 * algorithms, such as any RSA key.
 */
export interface AllowedKeyType {
  /**
   * Represents an allowed Elliptic Curve key type.
   */
  ellipticCurve?: EcKeyType;
  /**
   * Represents an allowed RSA key type.
   */
  rsa?: RsaKeyType;
}

function serializeAllowedKeyType(data: any): AllowedKeyType {
  return {
    ...data,
    rsa: data["rsa"] !== undefined ? serializeRsaKeyType(data["rsa"]) : undefined,
  };
}

function deserializeAllowedKeyType(data: any): AllowedKeyType {
  return {
    ...data,
    rsa: data["rsa"] !== undefined ? deserializeRsaKeyType(data["rsa"]) : undefined,
  };
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
   */
  service?: string;
}

/**
 * Provides the configuration for logging a type of permissions. Example: {
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables
 * 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from
 * DATA_READ logging.
 */
export interface AuditLogConfig {
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission. Follows the same format of Binding.members.
   */
  exemptedMembers?: string[];
  /**
   * The log type that this config enables.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values: * `allUsers`: A special identifier
   * that represents anyone who is on the internet; with or without a Google
   * account. * `allAuthenticatedUsers`: A special identifier that represents
   * anyone who is authenticated with a Google account or a service account.
   * Does not include identities that come from external identity providers
   * (IdPs) through identity federation. * `user:{emailid}`: An email address
   * that represents a specific Google account. For example, `alice@example.com`
   * . * `serviceAccount:{emailid}`: An email address that represents a Google
   * service account. For example, `my-other-app@appspot.gserviceaccount.com`. *
   * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An
   * identifier for a [Kubernetes service
   * account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. *
   * `group:{emailid}`: An email address that represents a Google group. For
   * example, `admins@example.com`. * `domain:{domain}`: The G Suite domain
   * (primary) that represents all the users of that domain. For example,
   * `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a user that has been
   * recently deleted. For example,
   * `alice@example.com?uid=123456789012345678901`. If the user is recovered,
   * this value reverts to `user:{emailid}` and the recovered user retains the
   * role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a service account
   * that has been recently deleted. For example,
   * `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If
   * the service account is undeleted, this value reverts to
   * `serviceAccount:{emailid}` and the undeleted service account retains the
   * role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email
   * address (plus unique identifier) representing a Google group that has been
   * recently deleted. For example,
   * `admins@example.com?uid=123456789012345678901`. If the group is recovered,
   * this value reverts to `group:{emailid}` and the recovered group retains the
   * role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of `members`, or principals. For
   * example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Describes values that are relevant in a CA certificate.
 */
export interface CaOptions {
  /**
   * Optional. Refers to the "CA" X.509 extension, which is a boolean value.
   * When this value is missing, the extension will be omitted from the CA
   * certificate.
   */
  isCa?: boolean;
  /**
   * Optional. Refers to the path length restriction X.509 extension. For a CA
   * certificate, this value describes the depth of subordinate CA certificates
   * that are allowed. If this value is less than 0, the request will fail. If
   * this value is missing, the max path length will be omitted from the CA
   * certificate.
   */
  maxIssuerPathLength?: number;
}

/**
 * A CaPool represents a group of CertificateAuthorities that form a trust
 * anchor. A CaPool can be used to manage issuance policies for one or more
 * CertificateAuthority resources and to rotate CA certificates in and out of
 * the trust anchor.
 */
export interface CaPool {
  /**
   * Optional. The IssuancePolicy to control how Certificates will be issued
   * from this CaPool.
   */
  issuancePolicy?: IssuancePolicy;
  /**
   * Optional. Labels with user-defined metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name for this CaPool in the format
   * `projects/*\/locations/*\/caPools/*`.
   */
  readonly name?: string;
  /**
   * Optional. The PublishingOptions to follow when issuing Certificates from
   * any CertificateAuthority in this CaPool.
   */
  publishingOptions?: PublishingOptions;
  /**
   * Required. Immutable. The Tier of this CaPool.
   */
  tier?:  | "TIER_UNSPECIFIED" | "ENTERPRISE" | "DEVOPS";
}

function serializeCaPool(data: any): CaPool {
  return {
    ...data,
    issuancePolicy: data["issuancePolicy"] !== undefined ? serializeIssuancePolicy(data["issuancePolicy"]) : undefined,
  };
}

function deserializeCaPool(data: any): CaPool {
  return {
    ...data,
    issuancePolicy: data["issuancePolicy"] !== undefined ? deserializeIssuancePolicy(data["issuancePolicy"]) : undefined,
  };
}

export interface CertChain {
  /**
   * The certificates that form the CA chain, from leaf to root order.
   */
  certificates?: string[];
}

/**
 * A Certificate corresponds to a signed X.509 certificate issued by a
 * CertificateAuthority.
 */
export interface Certificate {
  /**
   * Output only. A structured description of the issued X.509 certificate.
   */
  readonly certificateDescription?: CertificateDescription;
  /**
   * Immutable. The resource name for a CertificateTemplate used to issue this
   * certificate, in the format
   * `projects/*\/locations/*\/certificateTemplates/*`. If this is specified,
   * the caller must have the necessary permission to use this template. If this
   * is omitted, no template will be used. This template must be in the same
   * location as the Certificate.
   */
  certificateTemplate?: string;
  /**
   * Immutable. A description of the certificate and key that does not require
   * X.509 or ASN.1.
   */
  config?: CertificateConfig;
  /**
   * Output only. The time at which this Certificate was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The resource name of the issuing CertificateAuthority in the
   * format `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  readonly issuerCertificateAuthority?: string;
  /**
   * Optional. Labels with user-defined metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Immutable. The desired lifetime of a certificate. Used to create
   * the "not_before_time" and "not_after_time" fields inside an X.509
   * certificate. Note that the lifetime may be truncated if it would extend
   * past the life of any certificate authority in the issuing chain.
   */
  lifetime?: number /* Duration */;
  /**
   * Output only. The resource name for this Certificate in the format
   * `projects/*\/locations/*\/caPools/*\/certificates/*`.
   */
  readonly name?: string;
  /**
   * Output only. The pem-encoded, signed X.509 certificate.
   */
  readonly pemCertificate?: string;
  /**
   * Output only. The chain that may be used to verify the X.509 certificate.
   * Expected to be in issuer-to-root order according to RFC 5246.
   */
  readonly pemCertificateChain?: string[];
  /**
   * Immutable. A pem-encoded X.509 certificate signing request (CSR).
   */
  pemCsr?: string;
  /**
   * Output only. Details regarding the revocation of this Certificate. This
   * Certificate is considered revoked if and only if this field is present.
   */
  readonly revocationDetails?: RevocationDetails;
  /**
   * Immutable. Specifies how the Certificate's identity fields are to be
   * decided. If this is omitted, the `DEFAULT` subject mode will be used.
   */
  subjectMode?:  | "SUBJECT_REQUEST_MODE_UNSPECIFIED" | "DEFAULT" | "REFLECTED_SPIFFE";
  /**
   * Output only. The time at which this Certificate was updated.
   */
  readonly updateTime?: Date;
}

function serializeCertificate(data: any): Certificate {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeCertificateConfig(data["config"]) : undefined,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
  };
}

function deserializeCertificate(data: any): Certificate {
  return {
    ...data,
    certificateDescription: data["certificateDescription"] !== undefined ? deserializeCertificateDescription(data["certificateDescription"]) : undefined,
    config: data["config"] !== undefined ? deserializeCertificateConfig(data["config"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
    revocationDetails: data["revocationDetails"] !== undefined ? deserializeRevocationDetails(data["revocationDetails"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A CertificateAuthority represents an individual Certificate Authority. A
 * CertificateAuthority can be used to create Certificates.
 */
export interface CertificateAuthority {
  /**
   * Output only. URLs for accessing content published by this CA, such as the
   * CA certificate and CRLs.
   */
  readonly accessUrls?: AccessUrls;
  /**
   * Output only. A structured description of this CertificateAuthority's CA
   * certificate and its issuers. Ordered as self-to-root.
   */
  readonly caCertificateDescriptions?: CertificateDescription[];
  /**
   * Required. Immutable. The config used to create a self-signed X.509
   * certificate or CSR.
   */
  config?: CertificateConfig;
  /**
   * Output only. The time at which this CertificateAuthority was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time at which this CertificateAuthority was soft deleted,
   * if it is in the DELETED state.
   */
  readonly deleteTime?: Date;
  /**
   * Output only. The time at which this CertificateAuthority will be
   * permanently purged, if it is in the DELETED state.
   */
  readonly expireTime?: Date;
  /**
   * Immutable. The name of a Cloud Storage bucket where this
   * CertificateAuthority will publish content, such as the CA certificate and
   * CRLs. This must be a bucket name, without any prefixes (such as `gs://`) or
   * suffixes (such as `.googleapis.com`). For example, to use a bucket named
   * `my-bucket`, you would simply specify `my-bucket`. If not specified, a
   * managed bucket will be created.
   */
  gcsBucket?: string;
  /**
   * Required. Immutable. Used when issuing certificates for this
   * CertificateAuthority. If this CertificateAuthority is a self-signed
   * CertificateAuthority, this key is also used to sign the self-signed CA
   * certificate. Otherwise, it is used to sign a CSR.
   */
  keySpec?: KeyVersionSpec;
  /**
   * Optional. Labels with user-defined metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Immutable. The desired lifetime of the CA certificate. Used to
   * create the "not_before_time" and "not_after_time" fields inside an X.509
   * certificate.
   */
  lifetime?: number /* Duration */;
  /**
   * Output only. The resource name for this CertificateAuthority in the format
   * `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  readonly name?: string;
  /**
   * Output only. This CertificateAuthority's certificate chain, including the
   * current CertificateAuthority's certificate. Ordered such that the root
   * issuer is the final element (consistent with RFC 5246). For a self-signed
   * CA, this will only list the current CertificateAuthority's certificate.
   */
  readonly pemCaCertificates?: string[];
  /**
   * Output only. The State for this CertificateAuthority.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "STAGED" | "AWAITING_USER_ACTIVATION" | "DELETED";
  /**
   * Optional. If this is a subordinate CertificateAuthority, this field will
   * be set with the subordinate configuration, which describes its issuers.
   * This may be updated, but this CertificateAuthority must continue to
   * validate.
   */
  subordinateConfig?: SubordinateConfig;
  /**
   * Output only. The CaPool.Tier of the CaPool that includes this
   * CertificateAuthority.
   */
  readonly tier?:  | "TIER_UNSPECIFIED" | "ENTERPRISE" | "DEVOPS";
  /**
   * Required. Immutable. The Type of this CertificateAuthority.
   */
  type?:  | "TYPE_UNSPECIFIED" | "SELF_SIGNED" | "SUBORDINATE";
  /**
   * Output only. The time at which this CertificateAuthority was last updated.
   */
  readonly updateTime?: Date;
}

function serializeCertificateAuthority(data: any): CertificateAuthority {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeCertificateConfig(data["config"]) : undefined,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
  };
}

function deserializeCertificateAuthority(data: any): CertificateAuthority {
  return {
    ...data,
    caCertificateDescriptions: data["caCertificateDescriptions"] !== undefined ? data["caCertificateDescriptions"].map((item: any) => (deserializeCertificateDescription(item))) : undefined,
    config: data["config"] !== undefined ? deserializeCertificateConfig(data["config"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A CertificateConfig describes an X.509 certificate or CSR that is to be
 * created, as an alternative to using ASN.1.
 */
export interface CertificateConfig {
  /**
   * Optional. The public key that corresponds to this config. This is, for
   * example, used when issuing Certificates, but not when creating a
   * self-signed CertificateAuthority or CertificateAuthority CSR.
   */
  publicKey?: PublicKey;
  /**
   * Required. Specifies some of the values in a certificate that are related
   * to the subject.
   */
  subjectConfig?: SubjectConfig;
  /**
   * Required. Describes how some of the technical X.509 fields in a
   * certificate should be populated.
   */
  x509Config?: X509Parameters;
}

function serializeCertificateConfig(data: any): CertificateConfig {
  return {
    ...data,
    publicKey: data["publicKey"] !== undefined ? serializePublicKey(data["publicKey"]) : undefined,
    subjectConfig: data["subjectConfig"] !== undefined ? serializeSubjectConfig(data["subjectConfig"]) : undefined,
    x509Config: data["x509Config"] !== undefined ? serializeX509Parameters(data["x509Config"]) : undefined,
  };
}

function deserializeCertificateConfig(data: any): CertificateConfig {
  return {
    ...data,
    publicKey: data["publicKey"] !== undefined ? deserializePublicKey(data["publicKey"]) : undefined,
    subjectConfig: data["subjectConfig"] !== undefined ? deserializeSubjectConfig(data["subjectConfig"]) : undefined,
    x509Config: data["x509Config"] !== undefined ? deserializeX509Parameters(data["x509Config"]) : undefined,
  };
}

/**
 * A CertificateDescription describes an X.509 certificate or CSR that has been
 * issued, as an alternative to using ASN.1 / X.509.
 */
export interface CertificateDescription {
  /**
   * Describes lists of issuer CA certificate URLs that appear in the
   * "Authority Information Access" extension in the certificate.
   */
  aiaIssuingCertificateUrls?: string[];
  /**
   * Identifies the subject_key_id of the parent certificate, per
   * https://tools.ietf.org/html/rfc5280#section-4.2.1.1
   */
  authorityKeyId?: KeyId;
  /**
   * The hash of the x.509 certificate.
   */
  certFingerprint?: CertificateFingerprint;
  /**
   * Describes a list of locations to obtain CRL information, i.e. the
   * DistributionPoint.fullName described by
   * https://tools.ietf.org/html/rfc5280#section-4.2.1.13
   */
  crlDistributionPoints?: string[];
  /**
   * The public key that corresponds to an issued certificate.
   */
  publicKey?: PublicKey;
  /**
   * Describes some of the values in a certificate that are related to the
   * subject and lifetime.
   */
  subjectDescription?: SubjectDescription;
  /**
   * Provides a means of identifiying certificates that contain a particular
   * public key, per https://tools.ietf.org/html/rfc5280#section-4.2.1.2.
   */
  subjectKeyId?: KeyId;
  /**
   * Describes some of the technical X.509 fields in a certificate.
   */
  x509Description?: X509Parameters;
}

function serializeCertificateDescription(data: any): CertificateDescription {
  return {
    ...data,
    publicKey: data["publicKey"] !== undefined ? serializePublicKey(data["publicKey"]) : undefined,
    subjectDescription: data["subjectDescription"] !== undefined ? serializeSubjectDescription(data["subjectDescription"]) : undefined,
    x509Description: data["x509Description"] !== undefined ? serializeX509Parameters(data["x509Description"]) : undefined,
  };
}

function deserializeCertificateDescription(data: any): CertificateDescription {
  return {
    ...data,
    publicKey: data["publicKey"] !== undefined ? deserializePublicKey(data["publicKey"]) : undefined,
    subjectDescription: data["subjectDescription"] !== undefined ? deserializeSubjectDescription(data["subjectDescription"]) : undefined,
    x509Description: data["x509Description"] !== undefined ? deserializeX509Parameters(data["x509Description"]) : undefined,
  };
}

/**
 * Describes a set of X.509 extensions that may be part of some certificate
 * issuance controls.
 */
export interface CertificateExtensionConstraints {
  /**
   * Optional. A set of ObjectIds identifying custom X.509 extensions. Will be
   * combined with known_extensions to determine the full set of X.509
   * extensions.
   */
  additionalExtensions?: ObjectId[];
  /**
   * Optional. A set of named X.509 extensions. Will be combined with
   * additional_extensions to determine the full set of X.509 extensions.
   */
  knownExtensions?:  | "KNOWN_CERTIFICATE_EXTENSION_UNSPECIFIED" | "BASE_KEY_USAGE" | "EXTENDED_KEY_USAGE" | "CA_OPTIONS" | "POLICY_IDS" | "AIA_OCSP_SERVERS" | "NAME_CONSTRAINTS"[];
}

/**
 * A group of fingerprints for the x509 certificate.
 */
export interface CertificateFingerprint {
  /**
   * The SHA 256 hash, encoded in hexadecimal, of the DER x509 certificate.
   */
  sha256Hash?: string;
}

/**
 * Describes constraints on a Certificate's Subject and SubjectAltNames.
 */
export interface CertificateIdentityConstraints {
  /**
   * Required. If this is true, the SubjectAltNames extension may be copied
   * from a certificate request into the signed certificate. Otherwise, the
   * requested SubjectAltNames will be discarded.
   */
  allowSubjectAltNamesPassthrough?: boolean;
  /**
   * Required. If this is true, the Subject field may be copied from a
   * certificate request into the signed certificate. Otherwise, the requested
   * Subject will be discarded.
   */
  allowSubjectPassthrough?: boolean;
  /**
   * Optional. A CEL expression that may be used to validate the resolved X.509
   * Subject and/or Subject Alternative Name before a certificate is signed. To
   * see the full allowed syntax and some examples, see
   * https://cloud.google.com/certificate-authority-service/docs/using-cel
   */
  celExpression?: Expr;
}

/**
 * A CertificateRevocationList corresponds to a signed X.509 certificate
 * Revocation List (CRL). A CRL contains the serial numbers of certificates that
 * should no longer be trusted.
 */
export interface CertificateRevocationList {
  /**
   * Output only. The location where 'pem_crl' can be accessed.
   */
  readonly accessUrl?: string;
  /**
   * Output only. The time at which this CertificateRevocationList was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Labels with user-defined metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name for this CertificateRevocationList in the
   * format `projects/*\/locations/*\/caPools/*certificateAuthorities/*\/
   * certificateRevocationLists/*`.
   */
  readonly name?: string;
  /**
   * Output only. The PEM-encoded X.509 CRL.
   */
  readonly pemCrl?: string;
  /**
   * Output only. The revision ID of this CertificateRevocationList. A new
   * revision is committed whenever a new CRL is published. The format is an
   * 8-character hexadecimal string.
   */
  readonly revisionId?: string;
  /**
   * Output only. The revoked serial numbers that appear in pem_crl.
   */
  readonly revokedCertificates?: RevokedCertificate[];
  /**
   * Output only. The CRL sequence number that appears in pem_crl.
   */
  readonly sequenceNumber?: bigint;
  /**
   * Output only. The State for this CertificateRevocationList.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "SUPERSEDED";
  /**
   * Output only. The time at which this CertificateRevocationList was updated.
   */
  readonly updateTime?: Date;
}

/**
 * A CertificateTemplate refers to a managed template for certificate issuance.
 */
export interface CertificateTemplate {
  /**
   * Output only. The time at which this CertificateTemplate was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A human-readable description of scenarios this template is
   * intended for.
   */
  description?: string;
  /**
   * Optional. Describes constraints on identities that may be appear in
   * Certificates issued using this template. If this is omitted, then this
   * template will not add restrictions on a certificate's identity.
   */
  identityConstraints?: CertificateIdentityConstraints;
  /**
   * Optional. Labels with user-defined metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name for this CertificateTemplate in the format
   * `projects/*\/locations/*\/certificateTemplates/*`.
   */
  readonly name?: string;
  /**
   * Optional. Describes the set of X.509 extensions that may appear in a
   * Certificate issued using this CertificateTemplate. If a certificate request
   * sets extensions that don't appear in the passthrough_extensions, those
   * extensions will be dropped. If the issuing CaPool's IssuancePolicy defines
   * baseline_values that don't appear here, the certificate issuance request
   * will fail. If this is omitted, then this template will not add restrictions
   * on a certificate's X.509 extensions. These constraints do not apply to
   * X.509 extensions set in this CertificateTemplate's predefined_values.
   */
  passthroughExtensions?: CertificateExtensionConstraints;
  /**
   * Optional. A set of X.509 values that will be applied to all issued
   * certificates that use this template. If the certificate request includes
   * conflicting values for the same properties, they will be overwritten by the
   * values defined here. If the issuing CaPool's IssuancePolicy defines
   * conflicting baseline_values for the same properties, the certificate
   * issuance request will fail.
   */
  predefinedValues?: X509Parameters;
  /**
   * Output only. The time at which this CertificateTemplate was updated.
   */
  readonly updateTime?: Date;
}

function serializeCertificateTemplate(data: any): CertificateTemplate {
  return {
    ...data,
    predefinedValues: data["predefinedValues"] !== undefined ? serializeX509Parameters(data["predefinedValues"]) : undefined,
  };
}

function deserializeCertificateTemplate(data: any): CertificateTemplate {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    predefinedValues: data["predefinedValues"] !== undefined ? deserializeX509Parameters(data["predefinedValues"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Request message for CertificateAuthorityService.DisableCertificateAuthority.
 */
export interface DisableCertificateAuthorityRequest {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Describes an Elliptic Curve key that may be used in a Certificate issued
 * from a CaPool.
 */
export interface EcKeyType {
  /**
   * Optional. A signature algorithm that must be used. If this is omitted, any
   * EC-based signature algorithm will be allowed.
   */
  signatureAlgorithm?:  | "EC_SIGNATURE_ALGORITHM_UNSPECIFIED" | "ECDSA_P256" | "ECDSA_P384" | "EDDSA_25519";
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
 * Request message for CertificateAuthorityService.EnableCertificateAuthority.
 */
export interface EnableCertificateAuthorityRequest {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec. Example (Comparison):
 * title: "Summary size limit" description: "Determines if a summary is less
 * than 100 chars" expression: "document.summary.size() < 100" Example
 * (Equality): title: "Requestor is owner" description: "Determines if requestor
 * is the document owner" expression: "document.owner ==
 * request.auth.claims.email" Example (Logic): title: "Public documents"
 * description: "Determine whether the document should be publicly visible"
 * expression: "document.type != 'private' && document.type != 'internal'"
 * Example (Data Manipulation): title: "Notification string" description:
 * "Create a notification string with a timestamp." expression: "'New message
 * received at ' + string(document.create_time)" The exact variables and
 * functions that may be referenced within an expression are determined by the
 * service that evaluates it. See the service documentation for additional
 * information.
 */
export interface Expr {
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description?: string;
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression?: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location?: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing its
   * purpose. This can be used e.g. in UIs which allow to enter the expression.
   */
  title?: string;
}

/**
 * KeyUsage.ExtendedKeyUsageOptions has fields that correspond to certain
 * common OIDs that could be specified as an extended key usage value.
 */
export interface ExtendedKeyUsageOptions {
  /**
   * Corresponds to OID 1.3.6.1.5.5.7.3.2. Officially described as "TLS WWW
   * client authentication", though regularly used for non-WWW TLS.
   */
  clientAuth?: boolean;
  /**
   * Corresponds to OID 1.3.6.1.5.5.7.3.3. Officially described as "Signing of
   * downloadable executable code client authentication".
   */
  codeSigning?: boolean;
  /**
   * Corresponds to OID 1.3.6.1.5.5.7.3.4. Officially described as "Email
   * protection".
   */
  emailProtection?: boolean;
  /**
   * Corresponds to OID 1.3.6.1.5.5.7.3.9. Officially described as "Signing
   * OCSP responses".
   */
  ocspSigning?: boolean;
  /**
   * Corresponds to OID 1.3.6.1.5.5.7.3.1. Officially described as "TLS WWW
   * server authentication", though regularly used for non-WWW TLS.
   */
  serverAuth?: boolean;
  /**
   * Corresponds to OID 1.3.6.1.5.5.7.3.8. Officially described as "Binding the
   * hash of an object to a time".
   */
  timeStamping?: boolean;
}

/**
 * Request message for CertificateAuthorityService.FetchCaCerts.
 */
export interface FetchCaCertsRequest {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Response message for CertificateAuthorityService.FetchCaCerts.
 */
export interface FetchCaCertsResponse {
  /**
   * The PEM encoded CA certificate chains of all ACTIVE CertificateAuthority
   * resources in this CaPool.
   */
  caCerts?: CertChain[];
}

/**
 * Response message for
 * CertificateAuthorityService.FetchCertificateAuthorityCsr.
 */
export interface FetchCertificateAuthorityCsrResponse {
  /**
   * Output only. The PEM-encoded signed certificate signing request (CSR).
   */
  readonly pemCsr?: string;
}

/**
 * IssuanceModes specifies the allowed ways in which Certificates may be
 * requested from this CaPool.
 */
export interface IssuanceModes {
  /**
   * Optional. When true, allows callers to create Certificates by specifying a
   * CertificateConfig.
   */
  allowConfigBasedIssuance?: boolean;
  /**
   * Optional. When true, allows callers to create Certificates by specifying a
   * CSR.
   */
  allowCsrBasedIssuance?: boolean;
}

/**
 * Defines controls over all certificate issuance within a CaPool.
 */
export interface IssuancePolicy {
  /**
   * Optional. If specified, then only methods allowed in the IssuanceModes may
   * be used to issue Certificates.
   */
  allowedIssuanceModes?: IssuanceModes;
  /**
   * Optional. If any AllowedKeyType is specified, then the certificate
   * request's public key must match one of the key types listed here.
   * Otherwise, any key may be used.
   */
  allowedKeyTypes?: AllowedKeyType[];
  /**
   * Optional. A set of X.509 values that will be applied to all certificates
   * issued through this CaPool. If a certificate request includes conflicting
   * values for the same properties, they will be overwritten by the values
   * defined here. If a certificate request uses a CertificateTemplate that
   * defines conflicting predefined_values for the same properties, the
   * certificate issuance request will fail.
   */
  baselineValues?: X509Parameters;
  /**
   * Optional. Describes constraints on identities that may appear in
   * Certificates issued through this CaPool. If this is omitted, then this
   * CaPool will not add restrictions on a certificate's identity.
   */
  identityConstraints?: CertificateIdentityConstraints;
  /**
   * Optional. The maximum lifetime allowed for issued Certificates. Note that
   * if the issuing CertificateAuthority expires before a Certificate's
   * requested maximum_lifetime, the effective lifetime will be explicitly
   * truncated to match it.
   */
  maximumLifetime?: number /* Duration */;
  /**
   * Optional. Describes the set of X.509 extensions that may appear in a
   * Certificate issued through this CaPool. If a certificate request sets
   * extensions that don't appear in the passthrough_extensions, those
   * extensions will be dropped. If a certificate request uses a
   * CertificateTemplate with predefined_values that don't appear here, the
   * certificate issuance request will fail. If this is omitted, then this
   * CaPool will not add restrictions on a certificate's X.509 extensions. These
   * constraints do not apply to X.509 extensions set in this CaPool's
   * baseline_values.
   */
  passthroughExtensions?: CertificateExtensionConstraints;
}

function serializeIssuancePolicy(data: any): IssuancePolicy {
  return {
    ...data,
    allowedKeyTypes: data["allowedKeyTypes"] !== undefined ? data["allowedKeyTypes"].map((item: any) => (serializeAllowedKeyType(item))) : undefined,
    baselineValues: data["baselineValues"] !== undefined ? serializeX509Parameters(data["baselineValues"]) : undefined,
    maximumLifetime: data["maximumLifetime"] !== undefined ? data["maximumLifetime"] : undefined,
  };
}

function deserializeIssuancePolicy(data: any): IssuancePolicy {
  return {
    ...data,
    allowedKeyTypes: data["allowedKeyTypes"] !== undefined ? data["allowedKeyTypes"].map((item: any) => (deserializeAllowedKeyType(item))) : undefined,
    baselineValues: data["baselineValues"] !== undefined ? deserializeX509Parameters(data["baselineValues"]) : undefined,
    maximumLifetime: data["maximumLifetime"] !== undefined ? data["maximumLifetime"] : undefined,
  };
}

/**
 * A KeyId identifies a specific public key, usually by hashing the public key.
 */
export interface KeyId {
  /**
   * Optional. The value of this KeyId encoded in lowercase hexadecimal. This
   * is most likely the 160 bit SHA-1 hash of the public key.
   */
  keyId?: string;
}

/**
 * A KeyUsage describes key usage values that may appear in an X.509
 * certificate.
 */
export interface KeyUsage {
  /**
   * Describes high-level ways in which a key may be used.
   */
  baseKeyUsage?: KeyUsageOptions;
  /**
   * Detailed scenarios in which a key may be used.
   */
  extendedKeyUsage?: ExtendedKeyUsageOptions;
  /**
   * Used to describe extended key usages that are not listed in the
   * KeyUsage.ExtendedKeyUsageOptions message.
   */
  unknownExtendedKeyUsages?: ObjectId[];
}

/**
 * KeyUsage.KeyUsageOptions corresponds to the key usage values described in
 * https://tools.ietf.org/html/rfc5280#section-4.2.1.3.
 */
export interface KeyUsageOptions {
  /**
   * The key may be used to sign certificates.
   */
  certSign?: boolean;
  /**
   * The key may be used for cryptographic commitments. Note that this may also
   * be referred to as "non-repudiation".
   */
  contentCommitment?: boolean;
  /**
   * The key may be used sign certificate revocation lists.
   */
  crlSign?: boolean;
  /**
   * The key may be used to encipher data.
   */
  dataEncipherment?: boolean;
  /**
   * The key may be used to decipher only.
   */
  decipherOnly?: boolean;
  /**
   * The key may be used for digital signatures.
   */
  digitalSignature?: boolean;
  /**
   * The key may be used to encipher only.
   */
  encipherOnly?: boolean;
  /**
   * The key may be used in a key agreement protocol.
   */
  keyAgreement?: boolean;
  /**
   * The key may be used to encipher other keys.
   */
  keyEncipherment?: boolean;
}

/**
 * A Cloud KMS key configuration that a CertificateAuthority will use.
 */
export interface KeyVersionSpec {
  /**
   * The algorithm to use for creating a managed Cloud KMS key for a for a
   * simplified experience. All managed keys will be have their ProtectionLevel
   * as `HSM`.
   */
  algorithm?:  | "SIGN_HASH_ALGORITHM_UNSPECIFIED" | "RSA_PSS_2048_SHA256" | "RSA_PSS_3072_SHA256" | "RSA_PSS_4096_SHA256" | "RSA_PKCS1_2048_SHA256" | "RSA_PKCS1_3072_SHA256" | "RSA_PKCS1_4096_SHA256" | "EC_P256_SHA256" | "EC_P384_SHA384";
  /**
   * The resource name for an existing Cloud KMS CryptoKeyVersion in the format
   * `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*\/cryptoKeyVersions/*`.
   * This option enables full flexibility in the key's capabilities and
   * properties.
   */
  cloudKmsKeyVersion?: string;
}

/**
 * Response message for CertificateAuthorityService.ListCaPools.
 */
export interface ListCaPoolsResponse {
  /**
   * The list of CaPools.
   */
  caPools?: CaPool[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListCertificateAuthoritiesRequest.next_page_token to retrieve the next page
   * of results.
   */
  nextPageToken?: string;
  /**
   * A list of locations (e.g. "us-west1") that could not be reached.
   */
  unreachable?: string[];
}

function serializeListCaPoolsResponse(data: any): ListCaPoolsResponse {
  return {
    ...data,
    caPools: data["caPools"] !== undefined ? data["caPools"].map((item: any) => (serializeCaPool(item))) : undefined,
  };
}

function deserializeListCaPoolsResponse(data: any): ListCaPoolsResponse {
  return {
    ...data,
    caPools: data["caPools"] !== undefined ? data["caPools"].map((item: any) => (deserializeCaPool(item))) : undefined,
  };
}

/**
 * Response message for CertificateAuthorityService.ListCertificateAuthorities.
 */
export interface ListCertificateAuthoritiesResponse {
  /**
   * The list of CertificateAuthorities.
   */
  certificateAuthorities?: CertificateAuthority[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListCertificateAuthoritiesRequest.next_page_token to retrieve the next page
   * of results.
   */
  nextPageToken?: string;
  /**
   * A list of locations (e.g. "us-west1") that could not be reached.
   */
  unreachable?: string[];
}

function serializeListCertificateAuthoritiesResponse(data: any): ListCertificateAuthoritiesResponse {
  return {
    ...data,
    certificateAuthorities: data["certificateAuthorities"] !== undefined ? data["certificateAuthorities"].map((item: any) => (serializeCertificateAuthority(item))) : undefined,
  };
}

function deserializeListCertificateAuthoritiesResponse(data: any): ListCertificateAuthoritiesResponse {
  return {
    ...data,
    certificateAuthorities: data["certificateAuthorities"] !== undefined ? data["certificateAuthorities"].map((item: any) => (deserializeCertificateAuthority(item))) : undefined,
  };
}

/**
 * Response message for
 * CertificateAuthorityService.ListCertificateRevocationLists.
 */
export interface ListCertificateRevocationListsResponse {
  /**
   * The list of CertificateRevocationLists.
   */
  certificateRevocationLists?: CertificateRevocationList[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListCertificateRevocationListsRequest.next_page_token to retrieve the next
   * page of results.
   */
  nextPageToken?: string;
  /**
   * A list of locations (e.g. "us-west1") that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response message for CertificateAuthorityService.ListCertificates.
 */
export interface ListCertificatesResponse {
  /**
   * The list of Certificates.
   */
  certificates?: Certificate[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListCertificatesRequest.next_page_token to retrieve the next page of
   * results.
   */
  nextPageToken?: string;
  /**
   * A list of locations (e.g. "us-west1") that could not be reached.
   */
  unreachable?: string[];
}

function serializeListCertificatesResponse(data: any): ListCertificatesResponse {
  return {
    ...data,
    certificates: data["certificates"] !== undefined ? data["certificates"].map((item: any) => (serializeCertificate(item))) : undefined,
  };
}

function deserializeListCertificatesResponse(data: any): ListCertificatesResponse {
  return {
    ...data,
    certificates: data["certificates"] !== undefined ? data["certificates"].map((item: any) => (deserializeCertificate(item))) : undefined,
  };
}

/**
 * Response message for CertificateAuthorityService.ListCertificateTemplates.
 */
export interface ListCertificateTemplatesResponse {
  /**
   * The list of CertificateTemplates.
   */
  certificateTemplates?: CertificateTemplate[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListCertificateTemplatesRequest.next_page_token to retrieve the next page
   * of results.
   */
  nextPageToken?: string;
  /**
   * A list of locations (e.g. "us-west1") that could not be reached.
   */
  unreachable?: string[];
}

function serializeListCertificateTemplatesResponse(data: any): ListCertificateTemplatesResponse {
  return {
    ...data,
    certificateTemplates: data["certificateTemplates"] !== undefined ? data["certificateTemplates"].map((item: any) => (serializeCertificateTemplate(item))) : undefined,
  };
}

function deserializeListCertificateTemplatesResponse(data: any): ListCertificateTemplatesResponse {
  return {
    ...data,
    certificateTemplates: data["certificateTemplates"] !== undefined ? data["certificateTemplates"].map((item: any) => (deserializeCertificateTemplate(item))) : undefined,
  };
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
 * Describes the X.509 name constraints extension, per
 * https://tools.ietf.org/html/rfc5280#section-4.2.1.10
 */
export interface NameConstraints {
  /**
   * Indicates whether or not the name constraints are marked critical.
   */
  critical?: boolean;
  /**
   * Contains excluded DNS names. Any DNS name that can be constructed by
   * simply adding zero or more labels to the left-hand side of the name
   * satisfies the name constraint. For example, `example.com`,
   * `www.example.com`, `www.sub.example.com` would satisfy `example.com` while
   * `example1.com` does not.
   */
  excludedDnsNames?: string[];
  /**
   * Contains the excluded email addresses. The value can be a particular email
   * address, a hostname to indicate all email addresses on that host or a
   * domain with a leading period (e.g. `.example.com`) to indicate all email
   * addresses in that domain.
   */
  excludedEmailAddresses?: string[];
  /**
   * Contains the excluded IP ranges. For IPv4 addresses, the ranges are
   * expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses,
   * the ranges are expressed in similar encoding as IPv4 addresses.
   */
  excludedIpRanges?: string[];
  /**
   * Contains the excluded URIs that apply to the host part of the name. The
   * value can be a hostname or a domain with a leading period (like
   * `.example.com`)
   */
  excludedUris?: string[];
  /**
   * Contains permitted DNS names. Any DNS name that can be constructed by
   * simply adding zero or more labels to the left-hand side of the name
   * satisfies the name constraint. For example, `example.com`,
   * `www.example.com`, `www.sub.example.com` would satisfy `example.com` while
   * `example1.com` does not.
   */
  permittedDnsNames?: string[];
  /**
   * Contains the permitted email addresses. The value can be a particular
   * email address, a hostname to indicate all email addresses on that host or a
   * domain with a leading period (e.g. `.example.com`) to indicate all email
   * addresses in that domain.
   */
  permittedEmailAddresses?: string[];
  /**
   * Contains the permitted IP ranges. For IPv4 addresses, the ranges are
   * expressed using CIDR notation as specified in RFC 4632. For IPv6 addresses,
   * the ranges are expressed in similar encoding as IPv4 addresses.
   */
  permittedIpRanges?: string[];
  /**
   * Contains the permitted URIs that apply to the host part of the name. The
   * value can be a hostname or a domain with a leading period (like
   * `.example.com`)
   */
  permittedUris?: string[];
}

/**
 * An ObjectId specifies an object identifier (OID). These provide context and
 * describe types in ASN.1 messages.
 */
export interface ObjectId {
  /**
   * Required. The parts of an OID path. The most significant parts of the path
   * come first.
   */
  objectIdPath?: number[];
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
 * Represents the metadata of the long-running operation.
 */
export interface OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly requestedCancellation?: boolean;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusMessage?: string;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources. A `Policy` is a collection of
 * `bindings`. A `binding` binds one or more `members`, or principals, to a
 * single `role`. Principals can be user accounts, service accounts, Google
 * groups, and domains (such as G Suite). A `role` is a named list of
 * permissions; each `role` can be an IAM predefined role or a user-created
 * custom role. For some types of Google Cloud resources, a `binding` can also
 * specify a `condition`, which is a logical expression that allows access to a
 * resource only if the expression evaluates to `true`. A condition can add
 * constraints based on attributes of the request, the resource, or both. To
 * learn which resources support conditions in their IAM policies, see the [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * **JSON example:** { "bindings": [ { "role":
 * "roles/resourcemanager.organizationAdmin", "members": [
 * "user:mike@example.com", "group:admins@example.com", "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the [IAM
 * documentation](https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: AuditConfig[];
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal. The
   * `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of
   * these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings?: Binding[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy. Valid values are `0`, `1`, and `3`.
   * Requests that specify an invalid value are rejected. Any operation that
   * affects conditional role bindings must specify version `3`. This
   * requirement applies to the following operations: * Getting a policy that
   * includes a conditional role binding * Adding a conditional role binding to
   * a policy * Changing a conditional role binding in a policy * Removing any
   * role binding, with or without a condition, from a policy that includes
   * conditions **Important:** If you use IAM Conditions, you must include the
   * `etag` field whenever you call `setIamPolicy`. If you omit this field, then
   * IAM allows you to overwrite a version `3` policy with a version `1` policy,
   * and all of the conditions in the version `3` policy are lost. If a policy
   * does not include any conditions, operations on that policy may specify any
   * valid version or leave the field unset. To learn which resources support
   * conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  version?: number;
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Additional options for
 * privateca#projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsGetIamPolicy.
 */
export interface ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for
 * privateca#projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsList.
 */
export interface ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted.
   */
  orderBy?: string;
  /**
   * Optional. Limit on the number of CertificateRevocationLists to include in
   * the response. Further CertificateRevocationLists can subsequently be
   * obtained by including the
   * ListCertificateRevocationListsResponse.next_page_token in a subsequent
   * request. If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Pagination token, returned earlier via
   * ListCertificateRevocationListsResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * privateca#projectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatch.
 */
export interface ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatchOptions {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. A list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatchOptions(data: any): ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatchOptions(data: any): ProjectsLocationsCaPoolsCertificateAuthoritiesCertificateRevocationListsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * privateca#projectsLocationsCaPoolsCertificateAuthoritiesCreate.
 */
export interface ProjectsLocationsCaPoolsCertificateAuthoritiesCreateOptions {
  /**
   * Required. It must be unique within a location and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`
   */
  certificateAuthorityId?: string;
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * privateca#projectsLocationsCaPoolsCertificateAuthoritiesDelete.
 */
export interface ProjectsLocationsCaPoolsCertificateAuthoritiesDeleteOptions {
  /**
   * Optional. This field allows the CA to be deleted even if the CA has active
   * certs. Active certs include both unrevoked and unexpired certs.
   */
  ignoreActiveCertificates?: boolean;
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If this flag is set, the Certificate Authority will be deleted
   * as soon as possible without a 30-day grace period where undeletion would
   * have been allowed. If you proceed, there will be no way to recover this CA.
   */
  skipGracePeriod?: boolean;
}

/**
 * Additional options for
 * privateca#projectsLocationsCaPoolsCertificateAuthoritiesList.
 */
export interface ProjectsLocationsCaPoolsCertificateAuthoritiesListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted.
   */
  orderBy?: string;
  /**
   * Optional. Limit on the number of CertificateAuthorities to include in the
   * response. Further CertificateAuthorities can subsequently be obtained by
   * including the ListCertificateAuthoritiesResponse.next_page_token in a
   * subsequent request. If unspecified, the server will pick an appropriate
   * default.
   */
  pageSize?: number;
  /**
   * Optional. Pagination token, returned earlier via
   * ListCertificateAuthoritiesResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * privateca#projectsLocationsCaPoolsCertificateAuthoritiesPatch.
 */
export interface ProjectsLocationsCaPoolsCertificateAuthoritiesPatchOptions {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. A list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCaPoolsCertificateAuthoritiesPatchOptions(data: any): ProjectsLocationsCaPoolsCertificateAuthoritiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCaPoolsCertificateAuthoritiesPatchOptions(data: any): ProjectsLocationsCaPoolsCertificateAuthoritiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsCertificatesCreate.
 */
export interface ProjectsLocationsCaPoolsCertificatesCreateOptions {
  /**
   * Optional. It must be unique within a location and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`. This field is required when using a
   * CertificateAuthority in the Enterprise CertificateAuthority.Tier, but is
   * optional and its value is ignored otherwise.
   */
  certificateId?: string;
  /**
   * Optional. The resource ID of the CertificateAuthority that should issue
   * the certificate. This optional field will ignore the load-balancing scheme
   * of the Pool and directly issue the certificate from the CA with the
   * specified ID, contained in the same CaPool referenced by `parent`. Per-CA
   * quota rules apply. If left empty, a CertificateAuthority will be chosen
   * from the CaPool by the service. For example, to issue a Certificate from a
   * Certificate Authority with resource name
   * "projects/my-project/locations/us-central1/caPools/my-pool/certificateAuthorities/my-ca",
   * you can set the parent to
   * "projects/my-project/locations/us-central1/caPools/my-pool" and the
   * issuing_certificate_authority_id to "my-ca".
   */
  issuingCertificateAuthorityId?: string;
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If this is true, no Certificate resource will be persisted
   * regardless of the CaPool's tier, and the returned Certificate will not
   * contain the pem_certificate field.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsCertificatesList.
 */
export interface ProjectsLocationsCaPoolsCertificatesListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   * For details on supported filters and syntax, see [Certificates Filtering
   * documentation](https://cloud.google.com/certificate-authority-service/docs/sorting-filtering-certificates#filtering_support).
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted. For details on
   * supported fields and syntax, see [Certificates Sorting
   * documentation](https://cloud.google.com/certificate-authority-service/docs/sorting-filtering-certificates#sorting_support).
   */
  orderBy?: string;
  /**
   * Optional. Limit on the number of Certificates to include in the response.
   * Further Certificates can subsequently be obtained by including the
   * ListCertificatesResponse.next_page_token in a subsequent request. If
   * unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Pagination token, returned earlier via
   * ListCertificatesResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsCertificatesPatch.
 */
export interface ProjectsLocationsCaPoolsCertificatesPatchOptions {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. A list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCaPoolsCertificatesPatchOptions(data: any): ProjectsLocationsCaPoolsCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCaPoolsCertificatesPatchOptions(data: any): ProjectsLocationsCaPoolsCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsCreate.
 */
export interface ProjectsLocationsCaPoolsCreateOptions {
  /**
   * Required. It must be unique within a location and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`
   */
  caPoolId?: string;
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsDelete.
 */
export interface ProjectsLocationsCaPoolsDeleteOptions {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsGetIamPolicy.
 */
export interface ProjectsLocationsCaPoolsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsList.
 */
export interface ProjectsLocationsCaPoolsListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted.
   */
  orderBy?: string;
  /**
   * Optional. Limit on the number of CaPools to include in the response.
   * Further CaPools can subsequently be obtained by including the
   * ListCaPoolsResponse.next_page_token in a subsequent request. If
   * unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Pagination token, returned earlier via
   * ListCaPoolsResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for privateca#projectsLocationsCaPoolsPatch.
 */
export interface ProjectsLocationsCaPoolsPatchOptions {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. A list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCaPoolsPatchOptions(data: any): ProjectsLocationsCaPoolsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCaPoolsPatchOptions(data: any): ProjectsLocationsCaPoolsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * privateca#projectsLocationsCertificateTemplatesCreate.
 */
export interface ProjectsLocationsCertificateTemplatesCreateOptions {
  /**
   * Required. It must be unique within a location and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`
   */
  certificateTemplateId?: string;
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * privateca#projectsLocationsCertificateTemplatesDelete.
 */
export interface ProjectsLocationsCertificateTemplatesDeleteOptions {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * privateca#projectsLocationsCertificateTemplatesGetIamPolicy.
 */
export interface ProjectsLocationsCertificateTemplatesGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for privateca#projectsLocationsCertificateTemplatesList.
 */
export interface ProjectsLocationsCertificateTemplatesListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted.
   */
  orderBy?: string;
  /**
   * Optional. Limit on the number of CertificateTemplates to include in the
   * response. Further CertificateTemplates can subsequently be obtained by
   * including the ListCertificateTemplatesResponse.next_page_token in a
   * subsequent request. If unspecified, the server will pick an appropriate
   * default.
   */
  pageSize?: number;
  /**
   * Optional. Pagination token, returned earlier via
   * ListCertificateTemplatesResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for privateca#projectsLocationsCertificateTemplatesPatch.
 */
export interface ProjectsLocationsCertificateTemplatesPatchOptions {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. A list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCertificateTemplatesPatchOptions(data: any): ProjectsLocationsCertificateTemplatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCertificateTemplatesPatchOptions(data: any): ProjectsLocationsCertificateTemplatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for privateca#projectsLocationsList.
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
 * Additional options for privateca#projectsLocationsOperationsList.
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
 * A PublicKey describes a public key.
 */
export interface PublicKey {
  /**
   * Required. The format of the public key.
   */
  format?:  | "KEY_FORMAT_UNSPECIFIED" | "PEM";
  /**
   * Required. A public key. The padding and encoding must match with the
   * `KeyFormat` value specified for the `format` field.
   */
  key?: Uint8Array;
}

function serializePublicKey(data: any): PublicKey {
  return {
    ...data,
    key: data["key"] !== undefined ? encodeBase64(data["key"]) : undefined,
  };
}

function deserializePublicKey(data: any): PublicKey {
  return {
    ...data,
    key: data["key"] !== undefined ? decodeBase64(data["key"] as string) : undefined,
  };
}

/**
 * Options relating to the publication of each CertificateAuthority's CA
 * certificate and CRLs and their inclusion as extensions in issued
 * Certificates. The options set here apply to certificates issued by any
 * CertificateAuthority in the CaPool.
 */
export interface PublishingOptions {
  /**
   * Optional. When true, publishes each CertificateAuthority's CA certificate
   * and includes its URL in the "Authority Information Access" X.509 extension
   * in all issued Certificates. If this is false, the CA certificate will not
   * be published and the corresponding X.509 extension will not be written in
   * issued certificates.
   */
  publishCaCert?: boolean;
  /**
   * Optional. When true, publishes each CertificateAuthority's CRL and
   * includes its URL in the "CRL Distribution Points" X.509 extension in all
   * issued Certificates. If this is false, CRLs will not be published and the
   * corresponding X.509 extension will not be written in issued certificates.
   * CRLs will expire 7 days from their creation. However, we will rebuild
   * daily. CRLs are also rebuilt shortly after a certificate is revoked.
   */
  publishCrl?: boolean;
}

/**
 * Operation metadata returned by the CLH during resource state reconciliation.
 */
export interface ReconciliationOperationMetadata {
  /**
   * DEPRECATED. Use exclusive_action instead.
   */
  deleteResource?: boolean;
  /**
   * Excluisive action returned by the CLH.
   */
  exclusiveAction?:  | "UNKNOWN_REPAIR_ACTION" | "DELETE" | "RETRY";
}

/**
 * Describes fields that are relavent to the revocation of a Certificate.
 */
export interface RevocationDetails {
  /**
   * Indicates why a Certificate was revoked.
   */
  revocationState?:  | "REVOCATION_REASON_UNSPECIFIED" | "KEY_COMPROMISE" | "CERTIFICATE_AUTHORITY_COMPROMISE" | "AFFILIATION_CHANGED" | "SUPERSEDED" | "CESSATION_OF_OPERATION" | "CERTIFICATE_HOLD" | "PRIVILEGE_WITHDRAWN" | "ATTRIBUTE_AUTHORITY_COMPROMISE";
  /**
   * The time at which this Certificate was revoked.
   */
  revocationTime?: Date;
}

function serializeRevocationDetails(data: any): RevocationDetails {
  return {
    ...data,
    revocationTime: data["revocationTime"] !== undefined ? data["revocationTime"].toISOString() : undefined,
  };
}

function deserializeRevocationDetails(data: any): RevocationDetails {
  return {
    ...data,
    revocationTime: data["revocationTime"] !== undefined ? new Date(data["revocationTime"]) : undefined,
  };
}

/**
 * Request message for CertificateAuthorityService.RevokeCertificate.
 */
export interface RevokeCertificateRequest {
  /**
   * Required. The RevocationReason for revoking this certificate.
   */
  reason?:  | "REVOCATION_REASON_UNSPECIFIED" | "KEY_COMPROMISE" | "CERTIFICATE_AUTHORITY_COMPROMISE" | "AFFILIATION_CHANGED" | "SUPERSEDED" | "CESSATION_OF_OPERATION" | "CERTIFICATE_HOLD" | "PRIVILEGE_WITHDRAWN" | "ATTRIBUTE_AUTHORITY_COMPROMISE";
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Describes a revoked Certificate.
 */
export interface RevokedCertificate {
  /**
   * The resource name for the Certificate in the format
   * `projects/*\/locations/*\/caPools/*\/certificates/*`.
   */
  certificate?: string;
  /**
   * The serial number of the Certificate.
   */
  hexSerialNumber?: string;
  /**
   * The reason the Certificate was revoked.
   */
  revocationReason?:  | "REVOCATION_REASON_UNSPECIFIED" | "KEY_COMPROMISE" | "CERTIFICATE_AUTHORITY_COMPROMISE" | "AFFILIATION_CHANGED" | "SUPERSEDED" | "CESSATION_OF_OPERATION" | "CERTIFICATE_HOLD" | "PRIVILEGE_WITHDRAWN" | "ATTRIBUTE_AUTHORITY_COMPROMISE";
}

/**
 * Describes an RSA key that may be used in a Certificate issued from a CaPool.
 */
export interface RsaKeyType {
  /**
   * Optional. The maximum allowed RSA modulus size (inclusive), in bits. If
   * this is not set, or if set to zero, the service will not enforce an
   * explicit upper bound on RSA modulus sizes.
   */
  maxModulusSize?: bigint;
  /**
   * Optional. The minimum allowed RSA modulus size (inclusive), in bits. If
   * this is not set, or if set to zero, the service-level min RSA modulus size
   * will continue to apply.
   */
  minModulusSize?: bigint;
}

function serializeRsaKeyType(data: any): RsaKeyType {
  return {
    ...data,
    maxModulusSize: data["maxModulusSize"] !== undefined ? String(data["maxModulusSize"]) : undefined,
    minModulusSize: data["minModulusSize"] !== undefined ? String(data["minModulusSize"]) : undefined,
  };
}

function deserializeRsaKeyType(data: any): RsaKeyType {
  return {
    ...data,
    maxModulusSize: data["maxModulusSize"] !== undefined ? BigInt(data["maxModulusSize"]) : undefined,
    minModulusSize: data["minModulusSize"] !== undefined ? BigInt(data["minModulusSize"]) : undefined,
  };
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
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

/**
 * Subject describes parts of a distinguished name that, in turn, describes the
 * subject of the certificate.
 */
export interface Subject {
  /**
   * The "common name" of the subject.
   */
  commonName?: string;
  /**
   * The country code of the subject.
   */
  countryCode?: string;
  /**
   * The locality or city of the subject.
   */
  locality?: string;
  /**
   * The organization of the subject.
   */
  organization?: string;
  /**
   * The organizational_unit of the subject.
   */
  organizationalUnit?: string;
  /**
   * The postal code of the subject.
   */
  postalCode?: string;
  /**
   * The province, territory, or regional state of the subject.
   */
  province?: string;
  /**
   * The street address of the subject.
   */
  streetAddress?: string;
}

/**
 * SubjectAltNames corresponds to a more modern way of listing what the
 * asserted identity is in a certificate (i.e., compared to the "common name" in
 * the distinguished name).
 */
export interface SubjectAltNames {
  /**
   * Contains additional subject alternative name values. For each custom_san,
   * the `value` field must contain an ASN.1 encoded UTF8String.
   */
  customSans?: X509Extension[];
  /**
   * Contains only valid, fully-qualified host names.
   */
  dnsNames?: string[];
  /**
   * Contains only valid RFC 2822 E-mail addresses.
   */
  emailAddresses?: string[];
  /**
   * Contains only valid 32-bit IPv4 addresses or RFC 4291 IPv6 addresses.
   */
  ipAddresses?: string[];
  /**
   * Contains only valid RFC 3986 URIs.
   */
  uris?: string[];
}

function serializeSubjectAltNames(data: any): SubjectAltNames {
  return {
    ...data,
    customSans: data["customSans"] !== undefined ? data["customSans"].map((item: any) => (serializeX509Extension(item))) : undefined,
  };
}

function deserializeSubjectAltNames(data: any): SubjectAltNames {
  return {
    ...data,
    customSans: data["customSans"] !== undefined ? data["customSans"].map((item: any) => (deserializeX509Extension(item))) : undefined,
  };
}

/**
 * These values are used to create the distinguished name and subject
 * alternative name fields in an X.509 certificate.
 */
export interface SubjectConfig {
  /**
   * Required. Contains distinguished name fields such as the common name,
   * location and organization.
   */
  subject?: Subject;
  /**
   * Optional. The subject alternative name fields.
   */
  subjectAltName?: SubjectAltNames;
}

function serializeSubjectConfig(data: any): SubjectConfig {
  return {
    ...data,
    subjectAltName: data["subjectAltName"] !== undefined ? serializeSubjectAltNames(data["subjectAltName"]) : undefined,
  };
}

function deserializeSubjectConfig(data: any): SubjectConfig {
  return {
    ...data,
    subjectAltName: data["subjectAltName"] !== undefined ? deserializeSubjectAltNames(data["subjectAltName"]) : undefined,
  };
}

/**
 * These values describe fields in an issued X.509 certificate such as the
 * distinguished name, subject alternative names, serial number, and lifetime.
 */
export interface SubjectDescription {
  /**
   * The serial number encoded in lowercase hexadecimal.
   */
  hexSerialNumber?: string;
  /**
   * For convenience, the actual lifetime of an issued certificate.
   */
  lifetime?: number /* Duration */;
  /**
   * The time after which the certificate is expired. Per RFC 5280, the
   * validity period for a certificate is the period of time from
   * not_before_time through not_after_time, inclusive. Corresponds to
   * 'not_before_time' + 'lifetime' - 1 second.
   */
  notAfterTime?: Date;
  /**
   * The time at which the certificate becomes valid.
   */
  notBeforeTime?: Date;
  /**
   * Contains distinguished name fields such as the common name, location and /
   * organization.
   */
  subject?: Subject;
  /**
   * The subject alternative name fields.
   */
  subjectAltName?: SubjectAltNames;
}

function serializeSubjectDescription(data: any): SubjectDescription {
  return {
    ...data,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
    notAfterTime: data["notAfterTime"] !== undefined ? data["notAfterTime"].toISOString() : undefined,
    notBeforeTime: data["notBeforeTime"] !== undefined ? data["notBeforeTime"].toISOString() : undefined,
    subjectAltName: data["subjectAltName"] !== undefined ? serializeSubjectAltNames(data["subjectAltName"]) : undefined,
  };
}

function deserializeSubjectDescription(data: any): SubjectDescription {
  return {
    ...data,
    lifetime: data["lifetime"] !== undefined ? data["lifetime"] : undefined,
    notAfterTime: data["notAfterTime"] !== undefined ? new Date(data["notAfterTime"]) : undefined,
    notBeforeTime: data["notBeforeTime"] !== undefined ? new Date(data["notBeforeTime"]) : undefined,
    subjectAltName: data["subjectAltName"] !== undefined ? deserializeSubjectAltNames(data["subjectAltName"]) : undefined,
  };
}

/**
 * Describes a subordinate CA's issuers. This is either a resource name to a
 * known issuing CertificateAuthority, or a PEM issuer certificate chain.
 */
export interface SubordinateConfig {
  /**
   * Required. This can refer to a CertificateAuthority that was used to create
   * a subordinate CertificateAuthority. This field is used for information and
   * usability purposes only. The resource name is in the format
   * `projects/*\/locations/*\/caPools/*\/certificateAuthorities/*`.
   */
  certificateAuthority?: string;
  /**
   * Required. Contains the PEM certificate chain for the issuers of this
   * CertificateAuthority, but not pem certificate for this CA itself.
   */
  pemIssuerChain?: SubordinateConfigChain;
}

/**
 * This message describes a subordinate CA's issuer certificate chain. This
 * wrapper exists for compatibility reasons.
 */
export interface SubordinateConfigChain {
  /**
   * Required. Expected to be in leaf-to-root order according to RFC 5246.
   */
  pemCertificates?: string[];
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as `*` or `storage.*`) are not allowed. For more
   * information see [IAM
   * Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * Request message for
 * CertificateAuthorityService.UndeleteCertificateAuthority.
 */
export interface UndeleteCertificateAuthorityRequest {
  /**
   * Optional. An ID to identify requests. Specify a unique request ID so that
   * if you must retry your request, the server will know to ignore the request
   * if it has already been completed. The server will guarantee that for at
   * least 60 minutes since the first request. For example, consider a situation
   * where you make an initial request and the request times out. If you make
   * the request again with the same request ID, the server can check if
   * original operation with the same request ID was received, and if so, will
   * ignore the second request. This prevents clients from accidentally creating
   * duplicate commitments. The request ID must be a valid UUID with the
   * exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * An X509Extension specifies an X.509 extension, which may be used in
 * different parts of X.509 objects like certificates, CSRs, and CRLs.
 */
export interface X509Extension {
  /**
   * Optional. Indicates whether or not this extension is critical (i.e., if
   * the client does not know how to handle this extension, the client should
   * consider this to be an error).
   */
  critical?: boolean;
  /**
   * Required. The OID for this X.509 extension.
   */
  objectId?: ObjectId;
  /**
   * Required. The value of this X.509 extension.
   */
  value?: Uint8Array;
}

function serializeX509Extension(data: any): X509Extension {
  return {
    ...data,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializeX509Extension(data: any): X509Extension {
  return {
    ...data,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

/**
 * An X509Parameters is used to describe certain fields of an X.509
 * certificate, such as the key usage fields, fields specific to CA
 * certificates, certificate policy extensions and custom extensions.
 */
export interface X509Parameters {
  /**
   * Optional. Describes custom X.509 extensions.
   */
  additionalExtensions?: X509Extension[];
  /**
   * Optional. Describes Online Certificate Status Protocol (OCSP) endpoint
   * addresses that appear in the "Authority Information Access" extension in
   * the certificate.
   */
  aiaOcspServers?: string[];
  /**
   * Optional. Describes options in this X509Parameters that are relevant in a
   * CA certificate.
   */
  caOptions?: CaOptions;
  /**
   * Optional. Indicates the intended use for keys that correspond to a
   * certificate.
   */
  keyUsage?: KeyUsage;
  /**
   * Optional. Describes the X.509 name constraints extension.
   */
  nameConstraints?: NameConstraints;
  /**
   * Optional. Describes the X.509 certificate policy object identifiers, per
   * https://tools.ietf.org/html/rfc5280#section-4.2.1.4.
   */
  policyIds?: ObjectId[];
}

function serializeX509Parameters(data: any): X509Parameters {
  return {
    ...data,
    additionalExtensions: data["additionalExtensions"] !== undefined ? data["additionalExtensions"].map((item: any) => (serializeX509Extension(item))) : undefined,
  };
}

function deserializeX509Parameters(data: any): X509Parameters {
  return {
    ...data,
    additionalExtensions: data["additionalExtensions"] !== undefined ? data["additionalExtensions"].map((item: any) => (deserializeX509Extension(item))) : undefined,
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