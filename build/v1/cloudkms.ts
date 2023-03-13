// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Key Management Service (KMS) API Client for Deno
 * ======================================================
 * 
 * Manages keys and performs cryptographic operations in a central cloud service, for direct use by other cloud resources and applications. 
 * 
 * Docs: https://cloud.google.com/kms/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages keys and performs cryptographic operations in a central cloud
 * service, for direct use by other cloud resources and applications.
 */
export class Cloudkms {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudkms.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEkmConfigGetIamPolicy(resource: string, opts: ProjectsLocationsEkmConfigGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEkmConfigSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsEkmConfigTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new EkmConnection in a given Project and Location.
   *
   * @param parent Required. The resource name of the location associated with the EkmConnection, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsEkmConnectionsCreate(parent: string, req: EkmConnection, opts: ProjectsLocationsEkmConnectionsCreateOptions = {}): Promise<EkmConnection> {
    req = serializeEkmConnection(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/ekmConnections`);
    if (opts.ekmConnectionId !== undefined) {
      url.searchParams.append("ekmConnectionId", String(opts.ekmConnectionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEkmConnection(data);
  }

  /**
   * Returns metadata for a given EkmConnection.
   *
   * @param name Required. The name of the EkmConnection to get.
   */
  async projectsLocationsEkmConnectionsGet(name: string): Promise<EkmConnection> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEkmConnection(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEkmConnectionsGetIamPolicy(resource: string, opts: ProjectsLocationsEkmConnectionsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists EkmConnections.
   *
   * @param parent Required. The resource name of the location associated with the EkmConnections to list, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsEkmConnectionsList(parent: string, opts: ProjectsLocationsEkmConnectionsListOptions = {}): Promise<ListEkmConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/ekmConnections`);
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
    return deserializeListEkmConnectionsResponse(data);
  }

  /**
   * Updates an EkmConnection's metadata.
   *
   * @param name Output only. The resource name for the EkmConnection in the format `projects/*\/locations/*\/ekmConnections/*`.
   */
  async projectsLocationsEkmConnectionsPatch(name: string, req: EkmConnection, opts: ProjectsLocationsEkmConnectionsPatchOptions = {}): Promise<EkmConnection> {
    req = serializeEkmConnection(req);
    opts = serializeProjectsLocationsEkmConnectionsPatchOptions(opts);
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
    return deserializeEkmConnection(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEkmConnectionsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsEkmConnectionsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Generate random bytes using the Cloud KMS randomness source in the
   * provided location.
   *
   * @param location The project-specific location in which to generate random bytes. For example, "projects/my-project/locations/us-central1".
   */
  async projectsLocationsGenerateRandomBytes(location: string, req: GenerateRandomBytesRequest): Promise<GenerateRandomBytesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }:generateRandomBytes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGenerateRandomBytesResponse(data);
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
   * Returns the EkmConfig singleton resource for a given project and location.
   *
   * @param name Required. The name of the EkmConfig to get.
   */
  async projectsLocationsGetEkmConfig(name: string): Promise<EkmConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EkmConfig;
  }

  /**
   * Create a new KeyRing in a given Project and Location.
   *
   * @param parent Required. The resource name of the location associated with the KeyRings, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsKeyRingsCreate(parent: string, req: KeyRing, opts: ProjectsLocationsKeyRingsCreateOptions = {}): Promise<KeyRing> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keyRings`);
    if (opts.keyRingId !== undefined) {
      url.searchParams.append("keyRingId", String(opts.keyRingId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as KeyRing;
  }

  /**
   * Create a new CryptoKey within a KeyRing. CryptoKey.purpose and
   * CryptoKey.version_template.algorithm are required.
   *
   * @param parent Required. The name of the KeyRing associated with the CryptoKeys.
   */
  async projectsLocationsKeyRingsCryptoKeysCreate(parent: string, req: CryptoKey, opts: ProjectsLocationsKeyRingsCryptoKeysCreateOptions = {}): Promise<CryptoKey> {
    req = serializeCryptoKey(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cryptoKeys`);
    if (opts.cryptoKeyId !== undefined) {
      url.searchParams.append("cryptoKeyId", String(opts.cryptoKeyId));
    }
    if (opts.skipInitialVersionCreation !== undefined) {
      url.searchParams.append("skipInitialVersionCreation", String(opts.skipInitialVersionCreation));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCryptoKey(data);
  }

  /**
   * Decrypts data that was encrypted with a public key retrieved from
   * GetPublicKey corresponding to a CryptoKeyVersion with CryptoKey.purpose
   * ASYMMETRIC_DECRYPT.
   *
   * @param name Required. The resource name of the CryptoKeyVersion to use for decryption.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsAsymmetricDecrypt(name: string, req: AsymmetricDecryptRequest): Promise<AsymmetricDecryptResponse> {
    req = serializeAsymmetricDecryptRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:asymmetricDecrypt`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAsymmetricDecryptResponse(data);
  }

  /**
   * Signs data using a CryptoKeyVersion with CryptoKey.purpose
   * ASYMMETRIC_SIGN, producing a signature that can be verified with the public
   * key retrieved from GetPublicKey.
   *
   * @param name Required. The resource name of the CryptoKeyVersion to use for signing.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsAsymmetricSign(name: string, req: AsymmetricSignRequest): Promise<AsymmetricSignResponse> {
    req = serializeAsymmetricSignRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:asymmetricSign`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAsymmetricSignResponse(data);
  }

  /**
   * Create a new CryptoKeyVersion in a CryptoKey. The server will assign the
   * next sequential id. If unset, state will be set to ENABLED.
   *
   * @param parent Required. The name of the CryptoKey associated with the CryptoKeyVersions.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsCreate(parent: string, req: CryptoKeyVersion): Promise<CryptoKeyVersion> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cryptoKeyVersions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CryptoKeyVersion;
  }

  /**
   * Schedule a CryptoKeyVersion for destruction. Upon calling this method,
   * CryptoKeyVersion.state will be set to DESTROY_SCHEDULED, and destroy_time
   * will be set to the time destroy_scheduled_duration in the future. At that
   * time, the state will automatically change to DESTROYED, and the key
   * material will be irrevocably destroyed. Before the destroy_time is reached,
   * RestoreCryptoKeyVersion may be called to reverse the process.
   *
   * @param name Required. The resource name of the CryptoKeyVersion to destroy.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsDestroy(name: string, req: DestroyCryptoKeyVersionRequest): Promise<CryptoKeyVersion> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:destroy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CryptoKeyVersion;
  }

  /**
   * Returns metadata for a given CryptoKeyVersion.
   *
   * @param name Required. The name of the CryptoKeyVersion to get.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsGet(name: string): Promise<CryptoKeyVersion> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CryptoKeyVersion;
  }

  /**
   * Returns the public key for the given CryptoKeyVersion. The
   * CryptoKey.purpose must be ASYMMETRIC_SIGN or ASYMMETRIC_DECRYPT.
   *
   * @param name Required. The name of the CryptoKeyVersion public key to get.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsGetPublicKey(name: string): Promise<PublicKey> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/publicKey`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePublicKey(data);
  }

  /**
   * Import wrapped key material into a CryptoKeyVersion. All requests must
   * specify a CryptoKey. If a CryptoKeyVersion is additionally specified in the
   * request, key material will be reimported into that version. Otherwise, a
   * new version will be created, and will be assigned the next sequential id
   * within the CryptoKey.
   *
   * @param parent Required. The name of the CryptoKey to be imported into. The create permission is only required on this key when creating a new CryptoKeyVersion.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsImport(parent: string, req: ImportCryptoKeyVersionRequest): Promise<CryptoKeyVersion> {
    req = serializeImportCryptoKeyVersionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cryptoKeyVersions:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CryptoKeyVersion;
  }

  /**
   * Lists CryptoKeyVersions.
   *
   * @param parent Required. The resource name of the CryptoKey to list, in the format `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*`.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsList(parent: string, opts: ProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsListOptions = {}): Promise<ListCryptoKeyVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cryptoKeyVersions`);
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
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListCryptoKeyVersionsResponse;
  }

  /**
   * Signs data using a CryptoKeyVersion with CryptoKey.purpose MAC, producing
   * a tag that can be verified by another source with the same key.
   *
   * @param name Required. The resource name of the CryptoKeyVersion to use for signing.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsMacSign(name: string, req: MacSignRequest): Promise<MacSignResponse> {
    req = serializeMacSignRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:macSign`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMacSignResponse(data);
  }

  /**
   * Verifies MAC tag using a CryptoKeyVersion with CryptoKey.purpose MAC, and
   * returns a response that indicates whether or not the verification was
   * successful.
   *
   * @param name Required. The resource name of the CryptoKeyVersion to use for verification.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsMacVerify(name: string, req: MacVerifyRequest): Promise<MacVerifyResponse> {
    req = serializeMacVerifyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:macVerify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as MacVerifyResponse;
  }

  /**
   * Update a CryptoKeyVersion's metadata. state may be changed between ENABLED
   * and DISABLED using this method. See DestroyCryptoKeyVersion and
   * RestoreCryptoKeyVersion to move between other states.
   *
   * @param name Output only. The resource name for this CryptoKeyVersion in the format `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*\/cryptoKeyVersions/*`.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatch(name: string, req: CryptoKeyVersion, opts: ProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatchOptions = {}): Promise<CryptoKeyVersion> {
    opts = serializeProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatchOptions(opts);
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
    return data as CryptoKeyVersion;
  }

  /**
   * Restore a CryptoKeyVersion in the DESTROY_SCHEDULED state. Upon
   * restoration of the CryptoKeyVersion, state will be set to DISABLED, and
   * destroy_time will be cleared.
   *
   * @param name Required. The resource name of the CryptoKeyVersion to restore.
   */
  async projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsRestore(name: string, req: RestoreCryptoKeyVersionRequest): Promise<CryptoKeyVersion> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:restore`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CryptoKeyVersion;
  }

  /**
   * Decrypts data that was protected by Encrypt. The CryptoKey.purpose must be
   * ENCRYPT_DECRYPT.
   *
   * @param name Required. The resource name of the CryptoKey to use for decryption. The server will choose the appropriate version.
   */
  async projectsLocationsKeyRingsCryptoKeysDecrypt(name: string, req: DecryptRequest): Promise<DecryptResponse> {
    req = serializeDecryptRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:decrypt`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDecryptResponse(data);
  }

  /**
   * Encrypts data, so that it can only be recovered by a call to Decrypt. The
   * CryptoKey.purpose must be ENCRYPT_DECRYPT.
   *
   * @param name Required. The resource name of the CryptoKey or CryptoKeyVersion to use for encryption. If a CryptoKey is specified, the server will use its primary version.
   */
  async projectsLocationsKeyRingsCryptoKeysEncrypt(name: string, req: EncryptRequest): Promise<EncryptResponse> {
    req = serializeEncryptRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:encrypt`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEncryptResponse(data);
  }

  /**
   * Returns metadata for a given CryptoKey, as well as its primary
   * CryptoKeyVersion.
   *
   * @param name Required. The name of the CryptoKey to get.
   */
  async projectsLocationsKeyRingsCryptoKeysGet(name: string): Promise<CryptoKey> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCryptoKey(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsKeyRingsCryptoKeysGetIamPolicy(resource: string, opts: ProjectsLocationsKeyRingsCryptoKeysGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists CryptoKeys.
   *
   * @param parent Required. The resource name of the KeyRing to list, in the format `projects/*\/locations/*\/keyRings/*`.
   */
  async projectsLocationsKeyRingsCryptoKeysList(parent: string, opts: ProjectsLocationsKeyRingsCryptoKeysListOptions = {}): Promise<ListCryptoKeysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cryptoKeys`);
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
    if (opts.versionView !== undefined) {
      url.searchParams.append("versionView", String(opts.versionView));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListCryptoKeysResponse(data);
  }

  /**
   * Update a CryptoKey.
   *
   * @param name Output only. The resource name for this CryptoKey in the format `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*`.
   */
  async projectsLocationsKeyRingsCryptoKeysPatch(name: string, req: CryptoKey, opts: ProjectsLocationsKeyRingsCryptoKeysPatchOptions = {}): Promise<CryptoKey> {
    req = serializeCryptoKey(req);
    opts = serializeProjectsLocationsKeyRingsCryptoKeysPatchOptions(opts);
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
    return deserializeCryptoKey(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsKeyRingsCryptoKeysSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsKeyRingsCryptoKeysTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Update the version of a CryptoKey that will be used in Encrypt. Returns an
   * error if called on a key whose purpose is not ENCRYPT_DECRYPT.
   *
   * @param name Required. The resource name of the CryptoKey to update.
   */
  async projectsLocationsKeyRingsCryptoKeysUpdatePrimaryVersion(name: string, req: UpdateCryptoKeyPrimaryVersionRequest): Promise<CryptoKey> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:updatePrimaryVersion`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCryptoKey(data);
  }

  /**
   * Returns metadata for a given KeyRing.
   *
   * @param name Required. The name of the KeyRing to get.
   */
  async projectsLocationsKeyRingsGet(name: string): Promise<KeyRing> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as KeyRing;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsKeyRingsGetIamPolicy(resource: string, opts: ProjectsLocationsKeyRingsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Create a new ImportJob within a KeyRing. ImportJob.import_method is
   * required.
   *
   * @param parent Required. The name of the KeyRing associated with the ImportJobs.
   */
  async projectsLocationsKeyRingsImportJobsCreate(parent: string, req: ImportJob, opts: ProjectsLocationsKeyRingsImportJobsCreateOptions = {}): Promise<ImportJob> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/importJobs`);
    if (opts.importJobId !== undefined) {
      url.searchParams.append("importJobId", String(opts.importJobId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ImportJob;
  }

  /**
   * Returns metadata for a given ImportJob.
   *
   * @param name Required. The name of the ImportJob to get.
   */
  async projectsLocationsKeyRingsImportJobsGet(name: string): Promise<ImportJob> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ImportJob;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsKeyRingsImportJobsGetIamPolicy(resource: string, opts: ProjectsLocationsKeyRingsImportJobsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists ImportJobs.
   *
   * @param parent Required. The resource name of the KeyRing to list, in the format `projects/*\/locations/*\/keyRings/*`.
   */
  async projectsLocationsKeyRingsImportJobsList(parent: string, opts: ProjectsLocationsKeyRingsImportJobsListOptions = {}): Promise<ListImportJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/importJobs`);
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
    return data as ListImportJobsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsKeyRingsImportJobsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsKeyRingsImportJobsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Lists KeyRings.
   *
   * @param parent Required. The resource name of the location associated with the KeyRings, in the format `projects/*\/locations/*`.
   */
  async projectsLocationsKeyRingsList(parent: string, opts: ProjectsLocationsKeyRingsListOptions = {}): Promise<ListKeyRingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/keyRings`);
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
    return data as ListKeyRingsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsKeyRingsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsKeyRingsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates the EkmConfig singleton resource for a given project and location.
   *
   * @param name Output only. The resource name for the EkmConfig in the format `projects/*\/locations/*\/ekmConfig`.
   */
  async projectsLocationsUpdateEkmConfig(name: string, req: EkmConfig, opts: ProjectsLocationsUpdateEkmConfigOptions = {}): Promise<EkmConfig> {
    opts = serializeProjectsLocationsUpdateEkmConfigOptions(opts);
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
    return data as EkmConfig;
  }
}

/**
 * Request message for KeyManagementService.AsymmetricDecrypt.
 */
export interface AsymmetricDecryptRequest {
  /**
   * Required. The data encrypted with the named CryptoKeyVersion's public key
   * using OAEP.
   */
  ciphertext?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the
   * AsymmetricDecryptRequest.ciphertext. If specified, KeyManagementService
   * will verify the integrity of the received
   * AsymmetricDecryptRequest.ciphertext using this checksum.
   * KeyManagementService will report an error if the checksum verification
   * fails. If you receive a checksum error, your client should verify that
   * CRC32C(AsymmetricDecryptRequest.ciphertext) is equal to
   * AsymmetricDecryptRequest.ciphertext_crc32c, and if so, perform a limited
   * number of retries. A persistent mismatch may indicate an issue in your
   * computation of the CRC32C checksum. Note: This field is defined as int64
   * for reasons of compatibility across different languages. However, it is a
   * non-negative integer, which will never exceed 2^32-1, and can be safely
   * downconverted to uint32 in languages that support this type.
   */
  ciphertextCrc32c?: bigint;
}

function serializeAsymmetricDecryptRequest(data: any): AsymmetricDecryptRequest {
  return {
    ...data,
    ciphertext: data["ciphertext"] !== undefined ? encodeBase64(data["ciphertext"]) : undefined,
    ciphertextCrc32c: data["ciphertextCrc32c"] !== undefined ? String(data["ciphertextCrc32c"]) : undefined,
  };
}

function deserializeAsymmetricDecryptRequest(data: any): AsymmetricDecryptRequest {
  return {
    ...data,
    ciphertext: data["ciphertext"] !== undefined ? decodeBase64(data["ciphertext"] as string) : undefined,
    ciphertextCrc32c: data["ciphertextCrc32c"] !== undefined ? BigInt(data["ciphertextCrc32c"]) : undefined,
  };
}

/**
 * Response message for KeyManagementService.AsymmetricDecrypt.
 */
export interface AsymmetricDecryptResponse {
  /**
   * The decrypted data originally encrypted with the matching public key.
   */
  plaintext?: Uint8Array;
  /**
   * Integrity verification field. A CRC32C checksum of the returned
   * AsymmetricDecryptResponse.plaintext. An integrity check of
   * AsymmetricDecryptResponse.plaintext can be performed by computing the
   * CRC32C checksum of AsymmetricDecryptResponse.plaintext and comparing your
   * results to this field. Discard the response in case of non-matching
   * checksum values, and perform a limited number of retries. A persistent
   * mismatch may indicate an issue in your computation of the CRC32C checksum.
   * Note: This field is defined as int64 for reasons of compatibility across
   * different languages. However, it is a non-negative integer, which will
   * never exceed 2^32-1, and can be safely downconverted to uint32 in languages
   * that support this type.
   */
  plaintextCrc32c?: bigint;
  /**
   * The ProtectionLevel of the CryptoKeyVersion used in decryption.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * Integrity verification field. A flag indicating whether
   * AsymmetricDecryptRequest.ciphertext_crc32c was received by
   * KeyManagementService and used for the integrity verification of the
   * ciphertext. A false value of this field indicates either that
   * AsymmetricDecryptRequest.ciphertext_crc32c was left unset or that it was
   * not delivered to KeyManagementService. If you've set
   * AsymmetricDecryptRequest.ciphertext_crc32c but this field is still false,
   * discard the response and perform a limited number of retries.
   */
  verifiedCiphertextCrc32c?: boolean;
}

function serializeAsymmetricDecryptResponse(data: any): AsymmetricDecryptResponse {
  return {
    ...data,
    plaintext: data["plaintext"] !== undefined ? encodeBase64(data["plaintext"]) : undefined,
    plaintextCrc32c: data["plaintextCrc32c"] !== undefined ? String(data["plaintextCrc32c"]) : undefined,
  };
}

function deserializeAsymmetricDecryptResponse(data: any): AsymmetricDecryptResponse {
  return {
    ...data,
    plaintext: data["plaintext"] !== undefined ? decodeBase64(data["plaintext"] as string) : undefined,
    plaintextCrc32c: data["plaintextCrc32c"] !== undefined ? BigInt(data["plaintextCrc32c"]) : undefined,
  };
}

/**
 * Request message for KeyManagementService.AsymmetricSign.
 */
export interface AsymmetricSignRequest {
  /**
   * Optional. The data to sign. It can't be supplied if
   * AsymmetricSignRequest.digest is supplied.
   */
  data?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the AsymmetricSignRequest.data.
   * If specified, KeyManagementService will verify the integrity of the
   * received AsymmetricSignRequest.data using this checksum.
   * KeyManagementService will report an error if the checksum verification
   * fails. If you receive a checksum error, your client should verify that
   * CRC32C(AsymmetricSignRequest.data) is equal to
   * AsymmetricSignRequest.data_crc32c, and if so, perform a limited number of
   * retries. A persistent mismatch may indicate an issue in your computation of
   * the CRC32C checksum. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  dataCrc32c?: bigint;
  /**
   * Optional. The digest of the data to sign. The digest must be produced with
   * the same digest algorithm as specified by the key version's algorithm. This
   * field may not be supplied if AsymmetricSignRequest.data is supplied.
   */
  digest?: Digest;
  /**
   * Optional. An optional CRC32C checksum of the AsymmetricSignRequest.digest.
   * If specified, KeyManagementService will verify the integrity of the
   * received AsymmetricSignRequest.digest using this checksum.
   * KeyManagementService will report an error if the checksum verification
   * fails. If you receive a checksum error, your client should verify that
   * CRC32C(AsymmetricSignRequest.digest) is equal to
   * AsymmetricSignRequest.digest_crc32c, and if so, perform a limited number of
   * retries. A persistent mismatch may indicate an issue in your computation of
   * the CRC32C checksum. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  digestCrc32c?: bigint;
}

function serializeAsymmetricSignRequest(data: any): AsymmetricSignRequest {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? String(data["dataCrc32c"]) : undefined,
    digest: data["digest"] !== undefined ? serializeDigest(data["digest"]) : undefined,
    digestCrc32c: data["digestCrc32c"] !== undefined ? String(data["digestCrc32c"]) : undefined,
  };
}

function deserializeAsymmetricSignRequest(data: any): AsymmetricSignRequest {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? BigInt(data["dataCrc32c"]) : undefined,
    digest: data["digest"] !== undefined ? deserializeDigest(data["digest"]) : undefined,
    digestCrc32c: data["digestCrc32c"] !== undefined ? BigInt(data["digestCrc32c"]) : undefined,
  };
}

/**
 * Response message for KeyManagementService.AsymmetricSign.
 */
export interface AsymmetricSignResponse {
  /**
   * The resource name of the CryptoKeyVersion used for signing. Check this
   * field to verify that the intended resource was used for signing.
   */
  name?: string;
  /**
   * The ProtectionLevel of the CryptoKeyVersion used for signing.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * The created signature.
   */
  signature?: Uint8Array;
  /**
   * Integrity verification field. A CRC32C checksum of the returned
   * AsymmetricSignResponse.signature. An integrity check of
   * AsymmetricSignResponse.signature can be performed by computing the CRC32C
   * checksum of AsymmetricSignResponse.signature and comparing your results to
   * this field. Discard the response in case of non-matching checksum values,
   * and perform a limited number of retries. A persistent mismatch may indicate
   * an issue in your computation of the CRC32C checksum. Note: This field is
   * defined as int64 for reasons of compatibility across different languages.
   * However, it is a non-negative integer, which will never exceed 2^32-1, and
   * can be safely downconverted to uint32 in languages that support this type.
   */
  signatureCrc32c?: bigint;
  /**
   * Integrity verification field. A flag indicating whether
   * AsymmetricSignRequest.data_crc32c was received by KeyManagementService and
   * used for the integrity verification of the data. A false value of this
   * field indicates either that AsymmetricSignRequest.data_crc32c was left
   * unset or that it was not delivered to KeyManagementService. If you've set
   * AsymmetricSignRequest.data_crc32c but this field is still false, discard
   * the response and perform a limited number of retries.
   */
  verifiedDataCrc32c?: boolean;
  /**
   * Integrity verification field. A flag indicating whether
   * AsymmetricSignRequest.digest_crc32c was received by KeyManagementService
   * and used for the integrity verification of the digest. A false value of
   * this field indicates either that AsymmetricSignRequest.digest_crc32c was
   * left unset or that it was not delivered to KeyManagementService. If you've
   * set AsymmetricSignRequest.digest_crc32c but this field is still false,
   * discard the response and perform a limited number of retries.
   */
  verifiedDigestCrc32c?: boolean;
}

function serializeAsymmetricSignResponse(data: any): AsymmetricSignResponse {
  return {
    ...data,
    signature: data["signature"] !== undefined ? encodeBase64(data["signature"]) : undefined,
    signatureCrc32c: data["signatureCrc32c"] !== undefined ? String(data["signatureCrc32c"]) : undefined,
  };
}

function deserializeAsymmetricSignResponse(data: any): AsymmetricSignResponse {
  return {
    ...data,
    signature: data["signature"] !== undefined ? decodeBase64(data["signature"] as string) : undefined,
    signatureCrc32c: data["signatureCrc32c"] !== undefined ? BigInt(data["signatureCrc32c"]) : undefined,
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
 * A Certificate represents an X.509 certificate used to authenticate HTTPS
 * connections to EKM replicas.
 */
export interface Certificate {
  /**
   * Output only. The issuer distinguished name in RFC 2253 format. Only
   * present if parsed is true.
   */
  readonly issuer?: string;
  /**
   * Output only. The certificate is not valid after this time. Only present if
   * parsed is true.
   */
  readonly notAfterTime?: Date;
  /**
   * Output only. The certificate is not valid before this time. Only present
   * if parsed is true.
   */
  readonly notBeforeTime?: Date;
  /**
   * Output only. True if the certificate was parsed successfully.
   */
  readonly parsed?: boolean;
  /**
   * Required. The raw certificate bytes in DER format.
   */
  rawDer?: Uint8Array;
  /**
   * Output only. The certificate serial number as a hex string. Only present
   * if parsed is true.
   */
  readonly serialNumber?: string;
  /**
   * Output only. The SHA-256 certificate fingerprint as a hex string. Only
   * present if parsed is true.
   */
  readonly sha256Fingerprint?: string;
  /**
   * Output only. The subject distinguished name in RFC 2253 format. Only
   * present if parsed is true.
   */
  readonly subject?: string;
  /**
   * Output only. The subject Alternative DNS names. Only present if parsed is
   * true.
   */
  readonly subjectAlternativeDnsNames?: string[];
}

function serializeCertificate(data: any): Certificate {
  return {
    ...data,
    rawDer: data["rawDer"] !== undefined ? encodeBase64(data["rawDer"]) : undefined,
  };
}

function deserializeCertificate(data: any): Certificate {
  return {
    ...data,
    notAfterTime: data["notAfterTime"] !== undefined ? new Date(data["notAfterTime"]) : undefined,
    notBeforeTime: data["notBeforeTime"] !== undefined ? new Date(data["notBeforeTime"]) : undefined,
    rawDer: data["rawDer"] !== undefined ? decodeBase64(data["rawDer"] as string) : undefined,
  };
}

/**
 * Certificate chains needed to verify the attestation. Certificates in chains
 * are PEM-encoded and are ordered based on
 * https://tools.ietf.org/html/rfc5246#section-7.4.2.
 */
export interface CertificateChains {
  /**
   * Cavium certificate chain corresponding to the attestation.
   */
  caviumCerts?: string[];
  /**
   * Google card certificate chain corresponding to the attestation.
   */
  googleCardCerts?: string[];
  /**
   * Google partition certificate chain corresponding to the attestation.
   */
  googlePartitionCerts?: string[];
}

/**
 * A CryptoKey represents a logical key that can be used for cryptographic
 * operations. A CryptoKey is made up of zero or more versions, which represent
 * the actual key material used in cryptographic operations.
 */
export interface CryptoKey {
  /**
   * Output only. The time at which this CryptoKey was created.
   */
  readonly createTime?: Date;
  /**
   * Immutable. The resource name of the backend environment where the key
   * material for all CryptoKeyVersions associated with this CryptoKey reside
   * and where all related cryptographic operations are performed. Only
   * applicable if CryptoKeyVersions have a ProtectionLevel of EXTERNAL_VPC,
   * with the resource name in the format
   * `projects/*\/locations/*\/ekmConnections/*`. Note, this list is
   * non-exhaustive and may apply to additional ProtectionLevels in the future.
   */
  cryptoKeyBackend?: string;
  /**
   * Immutable. The period of time that versions of this key spend in the
   * DESTROY_SCHEDULED state before transitioning to DESTROYED. If not specified
   * at creation time, the default duration is 24 hours.
   */
  destroyScheduledDuration?: number /* Duration */;
  /**
   * Immutable. Whether this key may contain imported versions only.
   */
  importOnly?: boolean;
  /**
   * Labels with user-defined metadata. For more information, see [Labeling
   * Keys](https://cloud.google.com/kms/docs/labeling-keys).
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name for this CryptoKey in the format
   * `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*`.
   */
  readonly name?: string;
  /**
   * At next_rotation_time, the Key Management Service will automatically: 1.
   * Create a new version of this CryptoKey. 2. Mark the new version as primary.
   * Key rotations performed manually via CreateCryptoKeyVersion and
   * UpdateCryptoKeyPrimaryVersion do not affect next_rotation_time. Keys with
   * purpose ENCRYPT_DECRYPT support automatic rotation. For other keys, this
   * field must be omitted.
   */
  nextRotationTime?: Date;
  /**
   * Output only. A copy of the "primary" CryptoKeyVersion that will be used by
   * Encrypt when this CryptoKey is given in EncryptRequest.name. The
   * CryptoKey's primary version can be updated via
   * UpdateCryptoKeyPrimaryVersion. Keys with purpose ENCRYPT_DECRYPT may have a
   * primary. For other keys, this field will be omitted.
   */
  readonly primary?: CryptoKeyVersion;
  /**
   * Immutable. The immutable purpose of this CryptoKey.
   */
  purpose?:  | "CRYPTO_KEY_PURPOSE_UNSPECIFIED" | "ENCRYPT_DECRYPT" | "ASYMMETRIC_SIGN" | "ASYMMETRIC_DECRYPT" | "MAC";
  /**
   * next_rotation_time will be advanced by this period when the service
   * automatically rotates a key. Must be at least 24 hours and at most 876,000
   * hours. If rotation_period is set, next_rotation_time must also be set. Keys
   * with purpose ENCRYPT_DECRYPT support automatic rotation. For other keys,
   * this field must be omitted.
   */
  rotationPeriod?: number /* Duration */;
  /**
   * A template describing settings for new CryptoKeyVersion instances. The
   * properties of new CryptoKeyVersion instances created by either
   * CreateCryptoKeyVersion or auto-rotation are controlled by this template.
   */
  versionTemplate?: CryptoKeyVersionTemplate;
}

function serializeCryptoKey(data: any): CryptoKey {
  return {
    ...data,
    destroyScheduledDuration: data["destroyScheduledDuration"] !== undefined ? data["destroyScheduledDuration"] : undefined,
    nextRotationTime: data["nextRotationTime"] !== undefined ? data["nextRotationTime"].toISOString() : undefined,
    rotationPeriod: data["rotationPeriod"] !== undefined ? data["rotationPeriod"] : undefined,
  };
}

function deserializeCryptoKey(data: any): CryptoKey {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    destroyScheduledDuration: data["destroyScheduledDuration"] !== undefined ? data["destroyScheduledDuration"] : undefined,
    nextRotationTime: data["nextRotationTime"] !== undefined ? new Date(data["nextRotationTime"]) : undefined,
    rotationPeriod: data["rotationPeriod"] !== undefined ? data["rotationPeriod"] : undefined,
  };
}

/**
 * A CryptoKeyVersion represents an individual cryptographic key, and the
 * associated key material. An ENABLED version can be used for cryptographic
 * operations. For security reasons, the raw cryptographic key material
 * represented by a CryptoKeyVersion can never be viewed or exported. It can
 * only be used to encrypt, decrypt, or sign data when an authorized user or
 * application invokes Cloud KMS.
 */
export interface CryptoKeyVersion {
  /**
   * Output only. The CryptoKeyVersionAlgorithm that this CryptoKeyVersion
   * supports.
   */
  readonly algorithm?:  | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED" | "GOOGLE_SYMMETRIC_ENCRYPTION" | "RSA_SIGN_PSS_2048_SHA256" | "RSA_SIGN_PSS_3072_SHA256" | "RSA_SIGN_PSS_4096_SHA256" | "RSA_SIGN_PSS_4096_SHA512" | "RSA_SIGN_PKCS1_2048_SHA256" | "RSA_SIGN_PKCS1_3072_SHA256" | "RSA_SIGN_PKCS1_4096_SHA256" | "RSA_SIGN_PKCS1_4096_SHA512" | "RSA_SIGN_RAW_PKCS1_2048" | "RSA_SIGN_RAW_PKCS1_3072" | "RSA_SIGN_RAW_PKCS1_4096" | "RSA_DECRYPT_OAEP_2048_SHA256" | "RSA_DECRYPT_OAEP_3072_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA512" | "RSA_DECRYPT_OAEP_2048_SHA1" | "RSA_DECRYPT_OAEP_3072_SHA1" | "RSA_DECRYPT_OAEP_4096_SHA1" | "EC_SIGN_P256_SHA256" | "EC_SIGN_P384_SHA384" | "EC_SIGN_SECP256K1_SHA256" | "HMAC_SHA256" | "HMAC_SHA1" | "HMAC_SHA384" | "HMAC_SHA512" | "HMAC_SHA224" | "EXTERNAL_SYMMETRIC_ENCRYPTION";
  /**
   * Output only. Statement that was generated and signed by the HSM at key
   * creation time. Use this statement to verify attributes of the key as stored
   * on the HSM, independently of Google. Only provided for key versions with
   * protection_level HSM.
   */
  readonly attestation?: KeyOperationAttestation;
  /**
   * Output only. The time at which this CryptoKeyVersion was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time this CryptoKeyVersion's key material was destroyed.
   * Only present if state is DESTROYED.
   */
  readonly destroyEventTime?: Date;
  /**
   * Output only. The time this CryptoKeyVersion's key material is scheduled
   * for destruction. Only present if state is DESTROY_SCHEDULED.
   */
  readonly destroyTime?: Date;
  /**
   * Output only. The root cause of the most recent external destruction
   * failure. Only present if state is EXTERNAL_DESTRUCTION_FAILED.
   */
  readonly externalDestructionFailureReason?: string;
  /**
   * ExternalProtectionLevelOptions stores a group of additional fields for
   * configuring a CryptoKeyVersion that are specific to the EXTERNAL protection
   * level and EXTERNAL_VPC protection levels.
   */
  externalProtectionLevelOptions?: ExternalProtectionLevelOptions;
  /**
   * Output only. The time this CryptoKeyVersion's key material was generated.
   */
  readonly generateTime?: Date;
  /**
   * Output only. The root cause of the most recent generation failure. Only
   * present if state is GENERATION_FAILED.
   */
  readonly generationFailureReason?: string;
  /**
   * Output only. The root cause of the most recent import failure. Only
   * present if state is IMPORT_FAILED.
   */
  readonly importFailureReason?: string;
  /**
   * Output only. The name of the ImportJob used in the most recent import of
   * this CryptoKeyVersion. Only present if the underlying key material was
   * imported.
   */
  readonly importJob?: string;
  /**
   * Output only. The time at which this CryptoKeyVersion's key material was
   * most recently imported.
   */
  readonly importTime?: Date;
  /**
   * Output only. The resource name for this CryptoKeyVersion in the format
   * `projects/*\/locations/*\/keyRings/*\/cryptoKeys/*\/cryptoKeyVersions/*`.
   */
  readonly name?: string;
  /**
   * Output only. The ProtectionLevel describing how crypto operations are
   * performed with this CryptoKeyVersion.
   */
  readonly protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * Output only. Whether or not this key version is eligible for reimport, by
   * being specified as a target in
   * ImportCryptoKeyVersionRequest.crypto_key_version.
   */
  readonly reimportEligible?: boolean;
  /**
   * The current state of the CryptoKeyVersion.
   */
  state?:  | "CRYPTO_KEY_VERSION_STATE_UNSPECIFIED" | "PENDING_GENERATION" | "ENABLED" | "DISABLED" | "DESTROYED" | "DESTROY_SCHEDULED" | "PENDING_IMPORT" | "IMPORT_FAILED" | "GENERATION_FAILED" | "PENDING_EXTERNAL_DESTRUCTION" | "EXTERNAL_DESTRUCTION_FAILED";
}

/**
 * A CryptoKeyVersionTemplate specifies the properties to use when creating a
 * new CryptoKeyVersion, either manually with CreateCryptoKeyVersion or
 * automatically as a result of auto-rotation.
 */
export interface CryptoKeyVersionTemplate {
  /**
   * Required. Algorithm to use when creating a CryptoKeyVersion based on this
   * template. For backwards compatibility, GOOGLE_SYMMETRIC_ENCRYPTION is
   * implied if both this field is omitted and CryptoKey.purpose is
   * ENCRYPT_DECRYPT.
   */
  algorithm?:  | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED" | "GOOGLE_SYMMETRIC_ENCRYPTION" | "RSA_SIGN_PSS_2048_SHA256" | "RSA_SIGN_PSS_3072_SHA256" | "RSA_SIGN_PSS_4096_SHA256" | "RSA_SIGN_PSS_4096_SHA512" | "RSA_SIGN_PKCS1_2048_SHA256" | "RSA_SIGN_PKCS1_3072_SHA256" | "RSA_SIGN_PKCS1_4096_SHA256" | "RSA_SIGN_PKCS1_4096_SHA512" | "RSA_SIGN_RAW_PKCS1_2048" | "RSA_SIGN_RAW_PKCS1_3072" | "RSA_SIGN_RAW_PKCS1_4096" | "RSA_DECRYPT_OAEP_2048_SHA256" | "RSA_DECRYPT_OAEP_3072_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA512" | "RSA_DECRYPT_OAEP_2048_SHA1" | "RSA_DECRYPT_OAEP_3072_SHA1" | "RSA_DECRYPT_OAEP_4096_SHA1" | "EC_SIGN_P256_SHA256" | "EC_SIGN_P384_SHA384" | "EC_SIGN_SECP256K1_SHA256" | "HMAC_SHA256" | "HMAC_SHA1" | "HMAC_SHA384" | "HMAC_SHA512" | "HMAC_SHA224" | "EXTERNAL_SYMMETRIC_ENCRYPTION";
  /**
   * ProtectionLevel to use when creating a CryptoKeyVersion based on this
   * template. Immutable. Defaults to SOFTWARE.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
}

/**
 * Request message for KeyManagementService.Decrypt.
 */
export interface DecryptRequest {
  /**
   * Optional. Optional data that must match the data originally supplied in
   * EncryptRequest.additional_authenticated_data.
   */
  additionalAuthenticatedData?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the
   * DecryptRequest.additional_authenticated_data. If specified,
   * KeyManagementService will verify the integrity of the received
   * DecryptRequest.additional_authenticated_data using this checksum.
   * KeyManagementService will report an error if the checksum verification
   * fails. If you receive a checksum error, your client should verify that
   * CRC32C(DecryptRequest.additional_authenticated_data) is equal to
   * DecryptRequest.additional_authenticated_data_crc32c, and if so, perform a
   * limited number of retries. A persistent mismatch may indicate an issue in
   * your computation of the CRC32C checksum. Note: This field is defined as
   * int64 for reasons of compatibility across different languages. However, it
   * is a non-negative integer, which will never exceed 2^32-1, and can be
   * safely downconverted to uint32 in languages that support this type.
   */
  additionalAuthenticatedDataCrc32c?: bigint;
  /**
   * Required. The encrypted data originally returned in
   * EncryptResponse.ciphertext.
   */
  ciphertext?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the DecryptRequest.ciphertext. If
   * specified, KeyManagementService will verify the integrity of the received
   * DecryptRequest.ciphertext using this checksum. KeyManagementService will
   * report an error if the checksum verification fails. If you receive a
   * checksum error, your client should verify that
   * CRC32C(DecryptRequest.ciphertext) is equal to
   * DecryptRequest.ciphertext_crc32c, and if so, perform a limited number of
   * retries. A persistent mismatch may indicate an issue in your computation of
   * the CRC32C checksum. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  ciphertextCrc32c?: bigint;
}

function serializeDecryptRequest(data: any): DecryptRequest {
  return {
    ...data,
    additionalAuthenticatedData: data["additionalAuthenticatedData"] !== undefined ? encodeBase64(data["additionalAuthenticatedData"]) : undefined,
    additionalAuthenticatedDataCrc32c: data["additionalAuthenticatedDataCrc32c"] !== undefined ? String(data["additionalAuthenticatedDataCrc32c"]) : undefined,
    ciphertext: data["ciphertext"] !== undefined ? encodeBase64(data["ciphertext"]) : undefined,
    ciphertextCrc32c: data["ciphertextCrc32c"] !== undefined ? String(data["ciphertextCrc32c"]) : undefined,
  };
}

function deserializeDecryptRequest(data: any): DecryptRequest {
  return {
    ...data,
    additionalAuthenticatedData: data["additionalAuthenticatedData"] !== undefined ? decodeBase64(data["additionalAuthenticatedData"] as string) : undefined,
    additionalAuthenticatedDataCrc32c: data["additionalAuthenticatedDataCrc32c"] !== undefined ? BigInt(data["additionalAuthenticatedDataCrc32c"]) : undefined,
    ciphertext: data["ciphertext"] !== undefined ? decodeBase64(data["ciphertext"] as string) : undefined,
    ciphertextCrc32c: data["ciphertextCrc32c"] !== undefined ? BigInt(data["ciphertextCrc32c"]) : undefined,
  };
}

/**
 * Response message for KeyManagementService.Decrypt.
 */
export interface DecryptResponse {
  /**
   * The decrypted data originally supplied in EncryptRequest.plaintext.
   */
  plaintext?: Uint8Array;
  /**
   * Integrity verification field. A CRC32C checksum of the returned
   * DecryptResponse.plaintext. An integrity check of DecryptResponse.plaintext
   * can be performed by computing the CRC32C checksum of
   * DecryptResponse.plaintext and comparing your results to this field. Discard
   * the response in case of non-matching checksum values, and perform a limited
   * number of retries. A persistent mismatch may indicate an issue in your
   * computation of the CRC32C checksum. Note: receiving this response message
   * indicates that KeyManagementService is able to successfully decrypt the
   * ciphertext. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  plaintextCrc32c?: bigint;
  /**
   * The ProtectionLevel of the CryptoKeyVersion used in decryption.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * Whether the Decryption was performed using the primary key version.
   */
  usedPrimary?: boolean;
}

function serializeDecryptResponse(data: any): DecryptResponse {
  return {
    ...data,
    plaintext: data["plaintext"] !== undefined ? encodeBase64(data["plaintext"]) : undefined,
    plaintextCrc32c: data["plaintextCrc32c"] !== undefined ? String(data["plaintextCrc32c"]) : undefined,
  };
}

function deserializeDecryptResponse(data: any): DecryptResponse {
  return {
    ...data,
    plaintext: data["plaintext"] !== undefined ? decodeBase64(data["plaintext"] as string) : undefined,
    plaintextCrc32c: data["plaintextCrc32c"] !== undefined ? BigInt(data["plaintextCrc32c"]) : undefined,
  };
}

/**
 * Request message for KeyManagementService.DestroyCryptoKeyVersion.
 */
export interface DestroyCryptoKeyVersionRequest {
}

/**
 * A Digest holds a cryptographic message digest.
 */
export interface Digest {
  /**
   * A message digest produced with the SHA-256 algorithm.
   */
  sha256?: Uint8Array;
  /**
   * A message digest produced with the SHA-384 algorithm.
   */
  sha384?: Uint8Array;
  /**
   * A message digest produced with the SHA-512 algorithm.
   */
  sha512?: Uint8Array;
}

function serializeDigest(data: any): Digest {
  return {
    ...data,
    sha256: data["sha256"] !== undefined ? encodeBase64(data["sha256"]) : undefined,
    sha384: data["sha384"] !== undefined ? encodeBase64(data["sha384"]) : undefined,
    sha512: data["sha512"] !== undefined ? encodeBase64(data["sha512"]) : undefined,
  };
}

function deserializeDigest(data: any): Digest {
  return {
    ...data,
    sha256: data["sha256"] !== undefined ? decodeBase64(data["sha256"] as string) : undefined,
    sha384: data["sha384"] !== undefined ? decodeBase64(data["sha384"] as string) : undefined,
    sha512: data["sha512"] !== undefined ? decodeBase64(data["sha512"] as string) : undefined,
  };
}

/**
 * An EkmConfig is a singleton resource that represents configuration
 * parameters that apply to all CryptoKeys and CryptoKeyVersions with a
 * ProtectionLevel of EXTERNAL_VPC in a given project and location.
 */
export interface EkmConfig {
  /**
   * Optional. Resource name of the default EkmConnection. Setting this field
   * to the empty string removes the default.
   */
  defaultEkmConnection?: string;
  /**
   * Output only. The resource name for the EkmConfig in the format
   * `projects/*\/locations/*\/ekmConfig`.
   */
  readonly name?: string;
}

/**
 * An EkmConnection represents an individual EKM connection. It can be used for
 * creating CryptoKeys and CryptoKeyVersions with a ProtectionLevel of
 * EXTERNAL_VPC, as well as performing cryptographic operations using keys
 * created within the EkmConnection.
 */
export interface EkmConnection {
  /**
   * Output only. The time at which the EkmConnection was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Identifies the EKM Crypto Space that this EkmConnection maps to.
   * Note: This field is required if KeyManagementMode is CLOUD_KMS.
   */
  cryptoSpacePath?: string;
  /**
   * Optional. Etag of the currently stored EkmConnection.
   */
  etag?: string;
  /**
   * Optional. Describes who can perform control plane operations on the EKM.
   * If unset, this defaults to MANUAL.
   */
  keyManagementMode?:  | "KEY_MANAGEMENT_MODE_UNSPECIFIED" | "MANUAL" | "CLOUD_KMS";
  /**
   * Output only. The resource name for the EkmConnection in the format
   * `projects/*\/locations/*\/ekmConnections/*`.
   */
  readonly name?: string;
  /**
   * A list of ServiceResolvers where the EKM can be reached. There should be
   * one ServiceResolver per EKM replica. Currently, only a single
   * ServiceResolver is supported.
   */
  serviceResolvers?: ServiceResolver[];
}

function serializeEkmConnection(data: any): EkmConnection {
  return {
    ...data,
    serviceResolvers: data["serviceResolvers"] !== undefined ? data["serviceResolvers"].map((item: any) => (serializeServiceResolver(item))) : undefined,
  };
}

function deserializeEkmConnection(data: any): EkmConnection {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    serviceResolvers: data["serviceResolvers"] !== undefined ? data["serviceResolvers"].map((item: any) => (deserializeServiceResolver(item))) : undefined,
  };
}

/**
 * Request message for KeyManagementService.Encrypt.
 */
export interface EncryptRequest {
  /**
   * Optional. Optional data that, if specified, must also be provided during
   * decryption through DecryptRequest.additional_authenticated_data. The
   * maximum size depends on the key version's protection_level. For SOFTWARE,
   * EXTERNAL, and EXTERNAL_VPC keys the AAD must be no larger than 64KiB. For
   * HSM keys, the combined length of the plaintext and
   * additional_authenticated_data fields must be no larger than 8KiB.
   */
  additionalAuthenticatedData?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the
   * EncryptRequest.additional_authenticated_data. If specified,
   * KeyManagementService will verify the integrity of the received
   * EncryptRequest.additional_authenticated_data using this checksum.
   * KeyManagementService will report an error if the checksum verification
   * fails. If you receive a checksum error, your client should verify that
   * CRC32C(EncryptRequest.additional_authenticated_data) is equal to
   * EncryptRequest.additional_authenticated_data_crc32c, and if so, perform a
   * limited number of retries. A persistent mismatch may indicate an issue in
   * your computation of the CRC32C checksum. Note: This field is defined as
   * int64 for reasons of compatibility across different languages. However, it
   * is a non-negative integer, which will never exceed 2^32-1, and can be
   * safely downconverted to uint32 in languages that support this type.
   */
  additionalAuthenticatedDataCrc32c?: bigint;
  /**
   * Required. The data to encrypt. Must be no larger than 64KiB. The maximum
   * size depends on the key version's protection_level. For SOFTWARE, EXTERNAL,
   * and EXTERNAL_VPC keys, the plaintext must be no larger than 64KiB. For HSM
   * keys, the combined length of the plaintext and
   * additional_authenticated_data fields must be no larger than 8KiB.
   */
  plaintext?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the EncryptRequest.plaintext. If
   * specified, KeyManagementService will verify the integrity of the received
   * EncryptRequest.plaintext using this checksum. KeyManagementService will
   * report an error if the checksum verification fails. If you receive a
   * checksum error, your client should verify that
   * CRC32C(EncryptRequest.plaintext) is equal to
   * EncryptRequest.plaintext_crc32c, and if so, perform a limited number of
   * retries. A persistent mismatch may indicate an issue in your computation of
   * the CRC32C checksum. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  plaintextCrc32c?: bigint;
}

function serializeEncryptRequest(data: any): EncryptRequest {
  return {
    ...data,
    additionalAuthenticatedData: data["additionalAuthenticatedData"] !== undefined ? encodeBase64(data["additionalAuthenticatedData"]) : undefined,
    additionalAuthenticatedDataCrc32c: data["additionalAuthenticatedDataCrc32c"] !== undefined ? String(data["additionalAuthenticatedDataCrc32c"]) : undefined,
    plaintext: data["plaintext"] !== undefined ? encodeBase64(data["plaintext"]) : undefined,
    plaintextCrc32c: data["plaintextCrc32c"] !== undefined ? String(data["plaintextCrc32c"]) : undefined,
  };
}

function deserializeEncryptRequest(data: any): EncryptRequest {
  return {
    ...data,
    additionalAuthenticatedData: data["additionalAuthenticatedData"] !== undefined ? decodeBase64(data["additionalAuthenticatedData"] as string) : undefined,
    additionalAuthenticatedDataCrc32c: data["additionalAuthenticatedDataCrc32c"] !== undefined ? BigInt(data["additionalAuthenticatedDataCrc32c"]) : undefined,
    plaintext: data["plaintext"] !== undefined ? decodeBase64(data["plaintext"] as string) : undefined,
    plaintextCrc32c: data["plaintextCrc32c"] !== undefined ? BigInt(data["plaintextCrc32c"]) : undefined,
  };
}

/**
 * Response message for KeyManagementService.Encrypt.
 */
export interface EncryptResponse {
  /**
   * The encrypted data.
   */
  ciphertext?: Uint8Array;
  /**
   * Integrity verification field. A CRC32C checksum of the returned
   * EncryptResponse.ciphertext. An integrity check of
   * EncryptResponse.ciphertext can be performed by computing the CRC32C
   * checksum of EncryptResponse.ciphertext and comparing your results to this
   * field. Discard the response in case of non-matching checksum values, and
   * perform a limited number of retries. A persistent mismatch may indicate an
   * issue in your computation of the CRC32C checksum. Note: This field is
   * defined as int64 for reasons of compatibility across different languages.
   * However, it is a non-negative integer, which will never exceed 2^32-1, and
   * can be safely downconverted to uint32 in languages that support this type.
   */
  ciphertextCrc32c?: bigint;
  /**
   * The resource name of the CryptoKeyVersion used in encryption. Check this
   * field to verify that the intended resource was used for encryption.
   */
  name?: string;
  /**
   * The ProtectionLevel of the CryptoKeyVersion used in encryption.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * Integrity verification field. A flag indicating whether
   * EncryptRequest.additional_authenticated_data_crc32c was received by
   * KeyManagementService and used for the integrity verification of the AAD. A
   * false value of this field indicates either that
   * EncryptRequest.additional_authenticated_data_crc32c was left unset or that
   * it was not delivered to KeyManagementService. If you've set
   * EncryptRequest.additional_authenticated_data_crc32c but this field is still
   * false, discard the response and perform a limited number of retries.
   */
  verifiedAdditionalAuthenticatedDataCrc32c?: boolean;
  /**
   * Integrity verification field. A flag indicating whether
   * EncryptRequest.plaintext_crc32c was received by KeyManagementService and
   * used for the integrity verification of the plaintext. A false value of this
   * field indicates either that EncryptRequest.plaintext_crc32c was left unset
   * or that it was not delivered to KeyManagementService. If you've set
   * EncryptRequest.plaintext_crc32c but this field is still false, discard the
   * response and perform a limited number of retries.
   */
  verifiedPlaintextCrc32c?: boolean;
}

function serializeEncryptResponse(data: any): EncryptResponse {
  return {
    ...data,
    ciphertext: data["ciphertext"] !== undefined ? encodeBase64(data["ciphertext"]) : undefined,
    ciphertextCrc32c: data["ciphertextCrc32c"] !== undefined ? String(data["ciphertextCrc32c"]) : undefined,
  };
}

function deserializeEncryptResponse(data: any): EncryptResponse {
  return {
    ...data,
    ciphertext: data["ciphertext"] !== undefined ? decodeBase64(data["ciphertext"] as string) : undefined,
    ciphertextCrc32c: data["ciphertextCrc32c"] !== undefined ? BigInt(data["ciphertextCrc32c"]) : undefined,
  };
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
 * ExternalProtectionLevelOptions stores a group of additional fields for
 * configuring a CryptoKeyVersion that are specific to the EXTERNAL protection
 * level and EXTERNAL_VPC protection levels.
 */
export interface ExternalProtectionLevelOptions {
  /**
   * The path to the external key material on the EKM when using EkmConnection
   * e.g., "v0/my/key". Set this field instead of external_key_uri when using an
   * EkmConnection.
   */
  ekmConnectionKeyPath?: string;
  /**
   * The URI for an external resource that this CryptoKeyVersion represents.
   */
  externalKeyUri?: string;
}

/**
 * Request message for KeyManagementService.GenerateRandomBytes.
 */
export interface GenerateRandomBytesRequest {
  /**
   * The length in bytes of the amount of randomness to retrieve. Minimum 8
   * bytes, maximum 1024 bytes.
   */
  lengthBytes?: number;
  /**
   * The ProtectionLevel to use when generating the random data. Currently,
   * only HSM protection level is supported.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
}

/**
 * Response message for KeyManagementService.GenerateRandomBytes.
 */
export interface GenerateRandomBytesResponse {
  /**
   * The generated data.
   */
  data?: Uint8Array;
  /**
   * Integrity verification field. A CRC32C checksum of the returned
   * GenerateRandomBytesResponse.data. An integrity check of
   * GenerateRandomBytesResponse.data can be performed by computing the CRC32C
   * checksum of GenerateRandomBytesResponse.data and comparing your results to
   * this field. Discard the response in case of non-matching checksum values,
   * and perform a limited number of retries. A persistent mismatch may indicate
   * an issue in your computation of the CRC32C checksum. Note: This field is
   * defined as int64 for reasons of compatibility across different languages.
   * However, it is a non-negative integer, which will never exceed 2^32-1, and
   * can be safely downconverted to uint32 in languages that support this type.
   */
  dataCrc32c?: bigint;
}

function serializeGenerateRandomBytesResponse(data: any): GenerateRandomBytesResponse {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? String(data["dataCrc32c"]) : undefined,
  };
}

function deserializeGenerateRandomBytesResponse(data: any): GenerateRandomBytesResponse {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? BigInt(data["dataCrc32c"]) : undefined,
  };
}

/**
 * Request message for KeyManagementService.ImportCryptoKeyVersion.
 */
export interface ImportCryptoKeyVersionRequest {
  /**
   * Required. The algorithm of the key being imported. This does not need to
   * match the version_template of the CryptoKey this version imports into.
   */
  algorithm?:  | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED" | "GOOGLE_SYMMETRIC_ENCRYPTION" | "RSA_SIGN_PSS_2048_SHA256" | "RSA_SIGN_PSS_3072_SHA256" | "RSA_SIGN_PSS_4096_SHA256" | "RSA_SIGN_PSS_4096_SHA512" | "RSA_SIGN_PKCS1_2048_SHA256" | "RSA_SIGN_PKCS1_3072_SHA256" | "RSA_SIGN_PKCS1_4096_SHA256" | "RSA_SIGN_PKCS1_4096_SHA512" | "RSA_SIGN_RAW_PKCS1_2048" | "RSA_SIGN_RAW_PKCS1_3072" | "RSA_SIGN_RAW_PKCS1_4096" | "RSA_DECRYPT_OAEP_2048_SHA256" | "RSA_DECRYPT_OAEP_3072_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA512" | "RSA_DECRYPT_OAEP_2048_SHA1" | "RSA_DECRYPT_OAEP_3072_SHA1" | "RSA_DECRYPT_OAEP_4096_SHA1" | "EC_SIGN_P256_SHA256" | "EC_SIGN_P384_SHA384" | "EC_SIGN_SECP256K1_SHA256" | "HMAC_SHA256" | "HMAC_SHA1" | "HMAC_SHA384" | "HMAC_SHA512" | "HMAC_SHA224" | "EXTERNAL_SYMMETRIC_ENCRYPTION";
  /**
   * Optional. The optional name of an existing CryptoKeyVersion to target for
   * an import operation. If this field is not present, a new CryptoKeyVersion
   * containing the supplied key material is created. If this field is present,
   * the supplied key material is imported into the existing CryptoKeyVersion.
   * To import into an existing CryptoKeyVersion, the CryptoKeyVersion must be a
   * child of ImportCryptoKeyVersionRequest.parent, have been previously created
   * via ImportCryptoKeyVersion, and be in DESTROYED or IMPORT_FAILED state. The
   * key material and algorithm must match the previous CryptoKeyVersion exactly
   * if the CryptoKeyVersion has ever contained key material.
   */
  cryptoKeyVersion?: string;
  /**
   * Required. The name of the ImportJob that was used to wrap this key
   * material.
   */
  importJob?: string;
  /**
   * Optional. This field has the same meaning as wrapped_key. Prefer to use
   * that field in new work. Either that field or this field (but not both) must
   * be specified.
   */
  rsaAesWrappedKey?: Uint8Array;
  /**
   * Optional. The wrapped key material to import. Before wrapping, key
   * material must be formatted. If importing symmetric key material, the
   * expected key material format is plain bytes. If importing asymmetric key
   * material, the expected key material format is PKCS#8-encoded DER (the
   * PrivateKeyInfo structure from RFC 5208). When wrapping with import methods
   * (RSA_OAEP_3072_SHA1_AES_256 or RSA_OAEP_4096_SHA1_AES_256 or
   * RSA_OAEP_3072_SHA256_AES_256 or RSA_OAEP_4096_SHA256_AES_256), this field
   * must contain the concatenation of: 1. An ephemeral AES-256 wrapping key
   * wrapped with the public_key using RSAES-OAEP with SHA-1/SHA-256, MGF1 with
   * SHA-1/SHA-256, and an empty label. 2. The formatted key to be imported,
   * wrapped with the ephemeral AES-256 key using AES-KWP (RFC 5649). This
   * format is the same as the format produced by PKCS#11 mechanism
   * CKM_RSA_AES_KEY_WRAP. When wrapping with import methods
   * (RSA_OAEP_3072_SHA256 or RSA_OAEP_4096_SHA256), this field must contain the
   * formatted key to be imported, wrapped with the public_key using RSAES-OAEP
   * with SHA-256, MGF1 with SHA-256, and an empty label.
   */
  wrappedKey?: Uint8Array;
}

function serializeImportCryptoKeyVersionRequest(data: any): ImportCryptoKeyVersionRequest {
  return {
    ...data,
    rsaAesWrappedKey: data["rsaAesWrappedKey"] !== undefined ? encodeBase64(data["rsaAesWrappedKey"]) : undefined,
    wrappedKey: data["wrappedKey"] !== undefined ? encodeBase64(data["wrappedKey"]) : undefined,
  };
}

function deserializeImportCryptoKeyVersionRequest(data: any): ImportCryptoKeyVersionRequest {
  return {
    ...data,
    rsaAesWrappedKey: data["rsaAesWrappedKey"] !== undefined ? decodeBase64(data["rsaAesWrappedKey"] as string) : undefined,
    wrappedKey: data["wrappedKey"] !== undefined ? decodeBase64(data["wrappedKey"] as string) : undefined,
  };
}

/**
 * An ImportJob can be used to create CryptoKeys and CryptoKeyVersions using
 * pre-existing key material, generated outside of Cloud KMS. When an ImportJob
 * is created, Cloud KMS will generate a "wrapping key", which is a
 * public/private key pair. You use the wrapping key to encrypt (also known as
 * wrap) the pre-existing key material to protect it during the import process.
 * The nature of the wrapping key depends on the choice of import_method. When
 * the wrapping key generation is complete, the state will be set to ACTIVE and
 * the public_key can be fetched. The fetched public key can then be used to
 * wrap your pre-existing key material. Once the key material is wrapped, it can
 * be imported into a new CryptoKeyVersion in an existing CryptoKey by calling
 * ImportCryptoKeyVersion. Multiple CryptoKeyVersions can be imported with a
 * single ImportJob. Cloud KMS uses the private key portion of the wrapping key
 * to unwrap the key material. Only Cloud KMS has access to the private key. An
 * ImportJob expires 3 days after it is created. Once expired, Cloud KMS will no
 * longer be able to import or unwrap any key material that was wrapped with the
 * ImportJob's public key. For more information, see [Importing a
 * key](https://cloud.google.com/kms/docs/importing-a-key).
 */
export interface ImportJob {
  /**
   * Output only. Statement that was generated and signed by the key creator
   * (for example, an HSM) at key creation time. Use this statement to verify
   * attributes of the key as stored on the HSM, independently of Google. Only
   * present if the chosen ImportMethod is one with a protection level of HSM.
   */
  readonly attestation?: KeyOperationAttestation;
  /**
   * Output only. The time at which this ImportJob was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time this ImportJob expired. Only present if state is
   * EXPIRED.
   */
  readonly expireEventTime?: Date;
  /**
   * Output only. The time at which this ImportJob is scheduled for expiration
   * and can no longer be used to import key material.
   */
  readonly expireTime?: Date;
  /**
   * Output only. The time this ImportJob's key material was generated.
   */
  readonly generateTime?: Date;
  /**
   * Required. Immutable. The wrapping method to be used for incoming key
   * material.
   */
  importMethod?:  | "IMPORT_METHOD_UNSPECIFIED" | "RSA_OAEP_3072_SHA1_AES_256" | "RSA_OAEP_4096_SHA1_AES_256" | "RSA_OAEP_3072_SHA256_AES_256" | "RSA_OAEP_4096_SHA256_AES_256" | "RSA_OAEP_3072_SHA256" | "RSA_OAEP_4096_SHA256";
  /**
   * Output only. The resource name for this ImportJob in the format
   * `projects/*\/locations/*\/keyRings/*\/importJobs/*`.
   */
  readonly name?: string;
  /**
   * Required. Immutable. The protection level of the ImportJob. This must
   * match the protection_level of the version_template on the CryptoKey you
   * attempt to import into.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * Output only. The public key with which to wrap key material prior to
   * import. Only returned if state is ACTIVE.
   */
  readonly publicKey?: WrappingPublicKey;
  /**
   * Output only. The current state of the ImportJob, indicating if it can be
   * used.
   */
  readonly state?:  | "IMPORT_JOB_STATE_UNSPECIFIED" | "PENDING_GENERATION" | "ACTIVE" | "EXPIRED";
}

/**
 * Contains an HSM-generated attestation about a key operation. For more
 * information, see [Verifying attestations]
 * (https://cloud.google.com/kms/docs/attest-key).
 */
export interface KeyOperationAttestation {
  /**
   * Output only. The certificate chains needed to validate the attestation
   */
  readonly certChains?: CertificateChains;
  /**
   * Output only. The attestation data provided by the HSM when the key
   * operation was performed.
   */
  readonly content?: Uint8Array;
  /**
   * Output only. The format of the attestation data.
   */
  readonly format?:  | "ATTESTATION_FORMAT_UNSPECIFIED" | "CAVIUM_V1_COMPRESSED" | "CAVIUM_V2_COMPRESSED";
}

/**
 * A KeyRing is a toplevel logical grouping of CryptoKeys.
 */
export interface KeyRing {
  /**
   * Output only. The time at which this KeyRing was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The resource name for the KeyRing in the format
   * `projects/*\/locations/*\/keyRings/*`.
   */
  readonly name?: string;
}

/**
 * Response message for KeyManagementService.ListCryptoKeys.
 */
export interface ListCryptoKeysResponse {
  /**
   * The list of CryptoKeys.
   */
  cryptoKeys?: CryptoKey[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListCryptoKeysRequest.page_token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The total number of CryptoKeys that matched the query.
   */
  totalSize?: number;
}

function serializeListCryptoKeysResponse(data: any): ListCryptoKeysResponse {
  return {
    ...data,
    cryptoKeys: data["cryptoKeys"] !== undefined ? data["cryptoKeys"].map((item: any) => (serializeCryptoKey(item))) : undefined,
  };
}

function deserializeListCryptoKeysResponse(data: any): ListCryptoKeysResponse {
  return {
    ...data,
    cryptoKeys: data["cryptoKeys"] !== undefined ? data["cryptoKeys"].map((item: any) => (deserializeCryptoKey(item))) : undefined,
  };
}

/**
 * Response message for KeyManagementService.ListCryptoKeyVersions.
 */
export interface ListCryptoKeyVersionsResponse {
  /**
   * The list of CryptoKeyVersions.
   */
  cryptoKeyVersions?: CryptoKeyVersion[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListCryptoKeyVersionsRequest.page_token to retrieve the next page of
   * results.
   */
  nextPageToken?: string;
  /**
   * The total number of CryptoKeyVersions that matched the query.
   */
  totalSize?: number;
}

/**
 * Response message for EkmService.ListEkmConnections.
 */
export interface ListEkmConnectionsResponse {
  /**
   * The list of EkmConnections.
   */
  ekmConnections?: EkmConnection[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListEkmConnectionsRequest.page_token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The total number of EkmConnections that matched the query.
   */
  totalSize?: number;
}

function serializeListEkmConnectionsResponse(data: any): ListEkmConnectionsResponse {
  return {
    ...data,
    ekmConnections: data["ekmConnections"] !== undefined ? data["ekmConnections"].map((item: any) => (serializeEkmConnection(item))) : undefined,
  };
}

function deserializeListEkmConnectionsResponse(data: any): ListEkmConnectionsResponse {
  return {
    ...data,
    ekmConnections: data["ekmConnections"] !== undefined ? data["ekmConnections"].map((item: any) => (deserializeEkmConnection(item))) : undefined,
  };
}

/**
 * Response message for KeyManagementService.ListImportJobs.
 */
export interface ListImportJobsResponse {
  /**
   * The list of ImportJobs.
   */
  importJobs?: ImportJob[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListImportJobsRequest.page_token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The total number of ImportJobs that matched the query.
   */
  totalSize?: number;
}

/**
 * Response message for KeyManagementService.ListKeyRings.
 */
export interface ListKeyRingsResponse {
  /**
   * The list of KeyRings.
   */
  keyRings?: KeyRing[];
  /**
   * A token to retrieve next page of results. Pass this value in
   * ListKeyRingsRequest.page_token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The total number of KeyRings that matched the query.
   */
  totalSize?: number;
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
 * Cloud KMS metadata for the given google.cloud.location.Location.
 */
export interface LocationMetadata {
  /**
   * Indicates whether CryptoKeys with protection_level EXTERNAL can be created
   * in this location.
   */
  ekmAvailable?: boolean;
  /**
   * Indicates whether CryptoKeys with protection_level HSM can be created in
   * this location.
   */
  hsmAvailable?: boolean;
}

/**
 * Request message for KeyManagementService.MacSign.
 */
export interface MacSignRequest {
  /**
   * Required. The data to sign. The MAC tag is computed over this data field
   * based on the specific algorithm.
   */
  data?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the MacSignRequest.data. If
   * specified, KeyManagementService will verify the integrity of the received
   * MacSignRequest.data using this checksum. KeyManagementService will report
   * an error if the checksum verification fails. If you receive a checksum
   * error, your client should verify that CRC32C(MacSignRequest.data) is equal
   * to MacSignRequest.data_crc32c, and if so, perform a limited number of
   * retries. A persistent mismatch may indicate an issue in your computation of
   * the CRC32C checksum. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  dataCrc32c?: bigint;
}

function serializeMacSignRequest(data: any): MacSignRequest {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? String(data["dataCrc32c"]) : undefined,
  };
}

function deserializeMacSignRequest(data: any): MacSignRequest {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? BigInt(data["dataCrc32c"]) : undefined,
  };
}

/**
 * Response message for KeyManagementService.MacSign.
 */
export interface MacSignResponse {
  /**
   * The created signature.
   */
  mac?: Uint8Array;
  /**
   * Integrity verification field. A CRC32C checksum of the returned
   * MacSignResponse.mac. An integrity check of MacSignResponse.mac can be
   * performed by computing the CRC32C checksum of MacSignResponse.mac and
   * comparing your results to this field. Discard the response in case of
   * non-matching checksum values, and perform a limited number of retries. A
   * persistent mismatch may indicate an issue in your computation of the CRC32C
   * checksum. Note: This field is defined as int64 for reasons of compatibility
   * across different languages. However, it is a non-negative integer, which
   * will never exceed 2^32-1, and can be safely downconverted to uint32 in
   * languages that support this type.
   */
  macCrc32c?: bigint;
  /**
   * The resource name of the CryptoKeyVersion used for signing. Check this
   * field to verify that the intended resource was used for signing.
   */
  name?: string;
  /**
   * The ProtectionLevel of the CryptoKeyVersion used for signing.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * Integrity verification field. A flag indicating whether
   * MacSignRequest.data_crc32c was received by KeyManagementService and used
   * for the integrity verification of the data. A false value of this field
   * indicates either that MacSignRequest.data_crc32c was left unset or that it
   * was not delivered to KeyManagementService. If you've set
   * MacSignRequest.data_crc32c but this field is still false, discard the
   * response and perform a limited number of retries.
   */
  verifiedDataCrc32c?: boolean;
}

function serializeMacSignResponse(data: any): MacSignResponse {
  return {
    ...data,
    mac: data["mac"] !== undefined ? encodeBase64(data["mac"]) : undefined,
    macCrc32c: data["macCrc32c"] !== undefined ? String(data["macCrc32c"]) : undefined,
  };
}

function deserializeMacSignResponse(data: any): MacSignResponse {
  return {
    ...data,
    mac: data["mac"] !== undefined ? decodeBase64(data["mac"] as string) : undefined,
    macCrc32c: data["macCrc32c"] !== undefined ? BigInt(data["macCrc32c"]) : undefined,
  };
}

/**
 * Request message for KeyManagementService.MacVerify.
 */
export interface MacVerifyRequest {
  /**
   * Required. The data used previously as a MacSignRequest.data to generate
   * the MAC tag.
   */
  data?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the MacVerifyRequest.data. If
   * specified, KeyManagementService will verify the integrity of the received
   * MacVerifyRequest.data using this checksum. KeyManagementService will report
   * an error if the checksum verification fails. If you receive a checksum
   * error, your client should verify that CRC32C(MacVerifyRequest.data) is
   * equal to MacVerifyRequest.data_crc32c, and if so, perform a limited number
   * of retries. A persistent mismatch may indicate an issue in your computation
   * of the CRC32C checksum. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  dataCrc32c?: bigint;
  /**
   * Required. The signature to verify.
   */
  mac?: Uint8Array;
  /**
   * Optional. An optional CRC32C checksum of the MacVerifyRequest.mac. If
   * specified, KeyManagementService will verify the integrity of the received
   * MacVerifyRequest.mac using this checksum. KeyManagementService will report
   * an error if the checksum verification fails. If you receive a checksum
   * error, your client should verify that CRC32C(MacVerifyRequest.tag) is equal
   * to MacVerifyRequest.mac_crc32c, and if so, perform a limited number of
   * retries. A persistent mismatch may indicate an issue in your computation of
   * the CRC32C checksum. Note: This field is defined as int64 for reasons of
   * compatibility across different languages. However, it is a non-negative
   * integer, which will never exceed 2^32-1, and can be safely downconverted to
   * uint32 in languages that support this type.
   */
  macCrc32c?: bigint;
}

function serializeMacVerifyRequest(data: any): MacVerifyRequest {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? String(data["dataCrc32c"]) : undefined,
    mac: data["mac"] !== undefined ? encodeBase64(data["mac"]) : undefined,
    macCrc32c: data["macCrc32c"] !== undefined ? String(data["macCrc32c"]) : undefined,
  };
}

function deserializeMacVerifyRequest(data: any): MacVerifyRequest {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
    dataCrc32c: data["dataCrc32c"] !== undefined ? BigInt(data["dataCrc32c"]) : undefined,
    mac: data["mac"] !== undefined ? decodeBase64(data["mac"] as string) : undefined,
    macCrc32c: data["macCrc32c"] !== undefined ? BigInt(data["macCrc32c"]) : undefined,
  };
}

/**
 * Response message for KeyManagementService.MacVerify.
 */
export interface MacVerifyResponse {
  /**
   * The resource name of the CryptoKeyVersion used for verification. Check
   * this field to verify that the intended resource was used for verification.
   */
  name?: string;
  /**
   * The ProtectionLevel of the CryptoKeyVersion used for verification.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
  /**
   * This field indicates whether or not the verification operation for
   * MacVerifyRequest.mac over MacVerifyRequest.data was successful.
   */
  success?: boolean;
  /**
   * Integrity verification field. A flag indicating whether
   * MacVerifyRequest.data_crc32c was received by KeyManagementService and used
   * for the integrity verification of the data. A false value of this field
   * indicates either that MacVerifyRequest.data_crc32c was left unset or that
   * it was not delivered to KeyManagementService. If you've set
   * MacVerifyRequest.data_crc32c but this field is still false, discard the
   * response and perform a limited number of retries.
   */
  verifiedDataCrc32c?: boolean;
  /**
   * Integrity verification field. A flag indicating whether
   * MacVerifyRequest.mac_crc32c was received by KeyManagementService and used
   * for the integrity verification of the data. A false value of this field
   * indicates either that MacVerifyRequest.mac_crc32c was left unset or that it
   * was not delivered to KeyManagementService. If you've set
   * MacVerifyRequest.mac_crc32c but this field is still false, discard the
   * response and perform a limited number of retries.
   */
  verifiedMacCrc32c?: boolean;
  /**
   * Integrity verification field. This value is used for the integrity
   * verification of [MacVerifyResponse.success]. If the value of this field
   * contradicts the value of [MacVerifyResponse.success], discard the response
   * and perform a limited number of retries.
   */
  verifiedSuccessIntegrity?: boolean;
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
 * Additional options for Cloudkms#projectsLocationsEkmConfigGetIamPolicy.
 */
export interface ProjectsLocationsEkmConfigGetIamPolicyOptions {
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
 * Additional options for Cloudkms#projectsLocationsEkmConnectionsCreate.
 */
export interface ProjectsLocationsEkmConnectionsCreateOptions {
  /**
   * Required. It must be unique within a location and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`.
   */
  ekmConnectionId?: string;
}

/**
 * Additional options for Cloudkms#projectsLocationsEkmConnectionsGetIamPolicy.
 */
export interface ProjectsLocationsEkmConnectionsGetIamPolicyOptions {
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
 * Additional options for Cloudkms#projectsLocationsEkmConnectionsList.
 */
export interface ProjectsLocationsEkmConnectionsListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   * For more information, see [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted. If not specified, the
   * results will be sorted in the default order. For more information, see
   * [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  orderBy?: string;
  /**
   * Optional. Optional limit on the number of EkmConnections to include in the
   * response. Further EkmConnections can subsequently be obtained by including
   * the ListEkmConnectionsResponse.next_page_token in a subsequent request. If
   * unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Optional pagination token, returned earlier via
   * ListEkmConnectionsResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for Cloudkms#projectsLocationsEkmConnectionsPatch.
 */
export interface ProjectsLocationsEkmConnectionsPatchOptions {
  /**
   * Required. List of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEkmConnectionsPatchOptions(data: any): ProjectsLocationsEkmConnectionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsEkmConnectionsPatchOptions(data: any): ProjectsLocationsEkmConnectionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Cloudkms#projectsLocationsKeyRingsCreate.
 */
export interface ProjectsLocationsKeyRingsCreateOptions {
  /**
   * Required. It must be unique within a location and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`
   */
  keyRingId?: string;
}

/**
 * Additional options for Cloudkms#projectsLocationsKeyRingsCryptoKeysCreate.
 */
export interface ProjectsLocationsKeyRingsCryptoKeysCreateOptions {
  /**
   * Required. It must be unique within a KeyRing and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`
   */
  cryptoKeyId?: string;
  /**
   * If set to true, the request will create a CryptoKey without any
   * CryptoKeyVersions. You must manually call CreateCryptoKeyVersion or
   * ImportCryptoKeyVersion before you can use this CryptoKey.
   */
  skipInitialVersionCreation?: boolean;
}

/**
 * Additional options for
 * Cloudkms#projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsList.
 */
export interface ProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   * For more information, see [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted. If not specified, the
   * results will be sorted in the default order. For more information, see
   * [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  orderBy?: string;
  /**
   * Optional. Optional limit on the number of CryptoKeyVersions to include in
   * the response. Further CryptoKeyVersions can subsequently be obtained by
   * including the ListCryptoKeyVersionsResponse.next_page_token in a subsequent
   * request. If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Optional pagination token, returned earlier via
   * ListCryptoKeyVersionsResponse.next_page_token.
   */
  pageToken?: string;
  /**
   * The fields to include in the response.
   */
  view?:  | "CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED" | "FULL";
}

/**
 * Additional options for
 * Cloudkms#projectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatch.
 */
export interface ProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatchOptions {
  /**
   * Required. List of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatchOptions(data: any): ProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatchOptions(data: any): ProjectsLocationsKeyRingsCryptoKeysCryptoKeyVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Cloudkms#projectsLocationsKeyRingsCryptoKeysGetIamPolicy.
 */
export interface ProjectsLocationsKeyRingsCryptoKeysGetIamPolicyOptions {
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
 * Additional options for Cloudkms#projectsLocationsKeyRingsCryptoKeysList.
 */
export interface ProjectsLocationsKeyRingsCryptoKeysListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   * For more information, see [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted. If not specified, the
   * results will be sorted in the default order. For more information, see
   * [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  orderBy?: string;
  /**
   * Optional. Optional limit on the number of CryptoKeys to include in the
   * response. Further CryptoKeys can subsequently be obtained by including the
   * ListCryptoKeysResponse.next_page_token in a subsequent request. If
   * unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Optional pagination token, returned earlier via
   * ListCryptoKeysResponse.next_page_token.
   */
  pageToken?: string;
  /**
   * The fields of the primary version to include in the response.
   */
  versionView?:  | "CRYPTO_KEY_VERSION_VIEW_UNSPECIFIED" | "FULL";
}

/**
 * Additional options for Cloudkms#projectsLocationsKeyRingsCryptoKeysPatch.
 */
export interface ProjectsLocationsKeyRingsCryptoKeysPatchOptions {
  /**
   * Required. List of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsKeyRingsCryptoKeysPatchOptions(data: any): ProjectsLocationsKeyRingsCryptoKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsKeyRingsCryptoKeysPatchOptions(data: any): ProjectsLocationsKeyRingsCryptoKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Cloudkms#projectsLocationsKeyRingsGetIamPolicy.
 */
export interface ProjectsLocationsKeyRingsGetIamPolicyOptions {
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
 * Additional options for Cloudkms#projectsLocationsKeyRingsImportJobsCreate.
 */
export interface ProjectsLocationsKeyRingsImportJobsCreateOptions {
  /**
   * Required. It must be unique within a KeyRing and match the regular
   * expression `[a-zA-Z0-9_-]{1,63}`
   */
  importJobId?: string;
}

/**
 * Additional options for
 * Cloudkms#projectsLocationsKeyRingsImportJobsGetIamPolicy.
 */
export interface ProjectsLocationsKeyRingsImportJobsGetIamPolicyOptions {
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
 * Additional options for Cloudkms#projectsLocationsKeyRingsImportJobsList.
 */
export interface ProjectsLocationsKeyRingsImportJobsListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   * For more information, see [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted. If not specified, the
   * results will be sorted in the default order. For more information, see
   * [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  orderBy?: string;
  /**
   * Optional. Optional limit on the number of ImportJobs to include in the
   * response. Further ImportJobs can subsequently be obtained by including the
   * ListImportJobsResponse.next_page_token in a subsequent request. If
   * unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Optional pagination token, returned earlier via
   * ListImportJobsResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for Cloudkms#projectsLocationsKeyRingsList.
 */
export interface ProjectsLocationsKeyRingsListOptions {
  /**
   * Optional. Only include resources that match the filter in the response.
   * For more information, see [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  filter?: string;
  /**
   * Optional. Specify how the results should be sorted. If not specified, the
   * results will be sorted in the default order. For more information, see
   * [Sorting and filtering list
   * results](https://cloud.google.com/kms/docs/sorting-and-filtering).
   */
  orderBy?: string;
  /**
   * Optional. Optional limit on the number of KeyRings to include in the
   * response. Further KeyRings can subsequently be obtained by including the
   * ListKeyRingsResponse.next_page_token in a subsequent request. If
   * unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Optional pagination token, returned earlier via
   * ListKeyRingsResponse.next_page_token.
   */
  pageToken?: string;
}

/**
 * Additional options for Cloudkms#projectsLocationsList.
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
 * Additional options for Cloudkms#projectsLocationsUpdateEkmConfig.
 */
export interface ProjectsLocationsUpdateEkmConfigOptions {
  /**
   * Required. List of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsUpdateEkmConfigOptions(data: any): ProjectsLocationsUpdateEkmConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsUpdateEkmConfigOptions(data: any): ProjectsLocationsUpdateEkmConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The public key for a given CryptoKeyVersion. Obtained via GetPublicKey.
 */
export interface PublicKey {
  /**
   * The Algorithm associated with this key.
   */
  algorithm?:  | "CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED" | "GOOGLE_SYMMETRIC_ENCRYPTION" | "RSA_SIGN_PSS_2048_SHA256" | "RSA_SIGN_PSS_3072_SHA256" | "RSA_SIGN_PSS_4096_SHA256" | "RSA_SIGN_PSS_4096_SHA512" | "RSA_SIGN_PKCS1_2048_SHA256" | "RSA_SIGN_PKCS1_3072_SHA256" | "RSA_SIGN_PKCS1_4096_SHA256" | "RSA_SIGN_PKCS1_4096_SHA512" | "RSA_SIGN_RAW_PKCS1_2048" | "RSA_SIGN_RAW_PKCS1_3072" | "RSA_SIGN_RAW_PKCS1_4096" | "RSA_DECRYPT_OAEP_2048_SHA256" | "RSA_DECRYPT_OAEP_3072_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA256" | "RSA_DECRYPT_OAEP_4096_SHA512" | "RSA_DECRYPT_OAEP_2048_SHA1" | "RSA_DECRYPT_OAEP_3072_SHA1" | "RSA_DECRYPT_OAEP_4096_SHA1" | "EC_SIGN_P256_SHA256" | "EC_SIGN_P384_SHA384" | "EC_SIGN_SECP256K1_SHA256" | "HMAC_SHA256" | "HMAC_SHA1" | "HMAC_SHA384" | "HMAC_SHA512" | "HMAC_SHA224" | "EXTERNAL_SYMMETRIC_ENCRYPTION";
  /**
   * The name of the CryptoKeyVersion public key. Provided here for
   * verification. NOTE: This field is in Beta.
   */
  name?: string;
  /**
   * The public key, encoded in PEM format. For more information, see the [RFC
   * 7468](https://tools.ietf.org/html/rfc7468) sections for [General
   * Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual
   * Encoding of Subject Public Key Info]
   * (https://tools.ietf.org/html/rfc7468#section-13).
   */
  pem?: string;
  /**
   * Integrity verification field. A CRC32C checksum of the returned
   * PublicKey.pem. An integrity check of PublicKey.pem can be performed by
   * computing the CRC32C checksum of PublicKey.pem and comparing your results
   * to this field. Discard the response in case of non-matching checksum
   * values, and perform a limited number of retries. A persistent mismatch may
   * indicate an issue in your computation of the CRC32C checksum. Note: This
   * field is defined as int64 for reasons of compatibility across different
   * languages. However, it is a non-negative integer, which will never exceed
   * 2^32-1, and can be safely downconverted to uint32 in languages that support
   * this type. NOTE: This field is in Beta.
   */
  pemCrc32c?: bigint;
  /**
   * The ProtectionLevel of the CryptoKeyVersion public key.
   */
  protectionLevel?:  | "PROTECTION_LEVEL_UNSPECIFIED" | "SOFTWARE" | "HSM" | "EXTERNAL" | "EXTERNAL_VPC";
}

function serializePublicKey(data: any): PublicKey {
  return {
    ...data,
    pemCrc32c: data["pemCrc32c"] !== undefined ? String(data["pemCrc32c"]) : undefined,
  };
}

function deserializePublicKey(data: any): PublicKey {
  return {
    ...data,
    pemCrc32c: data["pemCrc32c"] !== undefined ? BigInt(data["pemCrc32c"]) : undefined,
  };
}

/**
 * Request message for KeyManagementService.RestoreCryptoKeyVersion.
 */
export interface RestoreCryptoKeyVersionRequest {
}

/**
 * A ServiceResolver represents an EKM replica that can be reached within an
 * EkmConnection.
 */
export interface ServiceResolver {
  /**
   * Optional. The filter applied to the endpoints of the resolved service. If
   * no filter is specified, all endpoints will be considered. An endpoint will
   * be chosen arbitrarily from the filtered list for each request. For endpoint
   * filter syntax and examples, see
   * https://cloud.google.com/service-directory/docs/reference/rpc/google.cloud.servicedirectory.v1#resolveservicerequest.
   */
  endpointFilter?: string;
  /**
   * Required. The hostname of the EKM replica used at TLS and HTTP layers.
   */
  hostname?: string;
  /**
   * Required. A list of leaf server certificates used to authenticate HTTPS
   * connections to the EKM replica. Currently, a maximum of 10 Certificate is
   * supported.
   */
  serverCertificates?: Certificate[];
  /**
   * Required. The resource name of the Service Directory service pointing to
   * an EKM replica, in the format
   * `projects/*\/locations/*\/namespaces/*\/services/*`.
   */
  serviceDirectoryService?: string;
}

function serializeServiceResolver(data: any): ServiceResolver {
  return {
    ...data,
    serverCertificates: data["serverCertificates"] !== undefined ? data["serverCertificates"].map((item: any) => (serializeCertificate(item))) : undefined,
  };
}

function deserializeServiceResolver(data: any): ServiceResolver {
  return {
    ...data,
    serverCertificates: data["serverCertificates"] !== undefined ? data["serverCertificates"].map((item: any) => (deserializeCertificate(item))) : undefined,
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
 * Request message for KeyManagementService.UpdateCryptoKeyPrimaryVersion.
 */
export interface UpdateCryptoKeyPrimaryVersionRequest {
  /**
   * Required. The id of the child CryptoKeyVersion to use as primary.
   */
  cryptoKeyVersionId?: string;
}

/**
 * The public key component of the wrapping key. For details of the type of key
 * this public key corresponds to, see the ImportMethod.
 */
export interface WrappingPublicKey {
  /**
   * The public key, encoded in PEM format. For more information, see the [RFC
   * 7468](https://tools.ietf.org/html/rfc7468) sections for [General
   * Considerations](https://tools.ietf.org/html/rfc7468#section-2) and [Textual
   * Encoding of Subject Public Key Info]
   * (https://tools.ietf.org/html/rfc7468#section-13).
   */
  pem?: string;
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
