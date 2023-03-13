// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * KMS Inventory API Client for Deno
 * =================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/kms/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class KMSInventory {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://kmsinventory.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns metadata about the resources protected by the given Cloud KMS
   * CryptoKey in the given Cloud organization.
   *
   * @param scope Required. Resource name of the organization. Example: organizations/123
   */
  async organizationsProtectedResourcesSearch(scope: string, opts: OrganizationsProtectedResourcesSearchOptions = {}): Promise<GoogleCloudKmsInventoryV1SearchProtectedResourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ scope }/protectedResources:search`);
    if (opts.cryptoKey !== undefined) {
      url.searchParams.append("cryptoKey", String(opts.cryptoKey));
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
    return data as GoogleCloudKmsInventoryV1SearchProtectedResourcesResponse;
  }

  /**
   * Returns cryptographic keys managed by Cloud KMS in a given Cloud project.
   * Note that this data is sourced from snapshots, meaning it may not
   * completely reflect the actual state of key metadata at call time.
   *
   * @param parent Required. The Google Cloud project for which to retrieve key metadata, in the format `projects/*`
   */
  async projectsCryptoKeysList(parent: string, opts: ProjectsCryptoKeysListOptions = {}): Promise<GoogleCloudKmsInventoryV1ListCryptoKeysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cryptoKeys`);
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
    return deserializeGoogleCloudKmsInventoryV1ListCryptoKeysResponse(data);
  }

  /**
   * Returns aggregate information about the resources protected by the given
   * Cloud KMS CryptoKey. Only resources within the same Cloud organization as
   * the key will be returned. The project that holds the key must be part of an
   * organization in order for this call to succeed.
   *
   * @param name Required. The resource name of the CryptoKey.
   */
  async projectsLocationsKeyRingsCryptoKeysGetProtectedResourcesSummary(name: string): Promise<GoogleCloudKmsInventoryV1ProtectedResourcesSummary> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/protectedResourcesSummary`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudKmsInventoryV1ProtectedResourcesSummary(data);
  }
}

/**
 * Response message for KeyDashboardService.ListCryptoKeys.
 */
export interface GoogleCloudKmsInventoryV1ListCryptoKeysResponse {
  /**
   * The list of CryptoKeys.
   */
  cryptoKeys?: GoogleCloudKmsV1CryptoKey[];
  /**
   * The page token returned from the previous response if the next page is
   * desired.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudKmsInventoryV1ListCryptoKeysResponse(data: any): GoogleCloudKmsInventoryV1ListCryptoKeysResponse {
  return {
    ...data,
    cryptoKeys: data["cryptoKeys"] !== undefined ? data["cryptoKeys"].map((item: any) => (serializeGoogleCloudKmsV1CryptoKey(item))) : undefined,
  };
}

function deserializeGoogleCloudKmsInventoryV1ListCryptoKeysResponse(data: any): GoogleCloudKmsInventoryV1ListCryptoKeysResponse {
  return {
    ...data,
    cryptoKeys: data["cryptoKeys"] !== undefined ? data["cryptoKeys"].map((item: any) => (deserializeGoogleCloudKmsV1CryptoKey(item))) : undefined,
  };
}

/**
 * Metadata about a resource protected by a Cloud KMS key.
 */
export interface GoogleCloudKmsInventoryV1ProtectedResource {
  /**
   * The Cloud product that owns the resource. Example: `compute`
   */
  cloudProduct?: string;
  /**
   * Output only. The time at which this resource was created. The granularity
   * is in seconds. Timestamp.nanos will always be 0.
   */
  readonly createTime?: Date;
  /**
   * The name of the Cloud KMS
   * [CryptoKeyVersion](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions?hl=en)
   * used to protect this resource via CMEK. This field is empty if the Google
   * Cloud product owning the resource does not provide key version data to
   * Asset Inventory. If there are multiple key versions protecting the
   * resource, then this is same value as the first element of
   * crypto_key_versions.
   */
  cryptoKeyVersion?: string;
  /**
   * The names of the Cloud KMS
   * [CryptoKeyVersion](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions?hl=en)
   * used to protect this resource via CMEK. This field is empty if the Google
   * Cloud product owning the resource does not provide key versions data to
   * Asset Inventory. The first element of this field is stored in
   * crypto_key_version.
   */
  cryptoKeyVersions?: string[];
  /**
   * A key-value pair of the resource's labels (v1) to their values.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Location can be `global`, regional like `us-east1`, or zonal like
   * `us-west1-b`.
   */
  location?: string;
  /**
   * The full resource name of the resource. Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   */
  name?: string;
  /**
   * Format: `projects/{PROJECT_NUMBER}`.
   */
  project?: string;
  /**
   * The ID of the project that owns the resource.
   */
  projectId?: string;
  /**
   * Example: `compute.googleapis.com/Disk`
   */
  resourceType?: string;
}

/**
 * Aggregate information about the resources protected by a Cloud KMS key in
 * the same Cloud organization as the key.
 */
export interface GoogleCloudKmsInventoryV1ProtectedResourcesSummary {
  /**
   * The number of resources protected by the key grouped by Cloud product.
   */
  cloudProducts?: {
    [key: string]: bigint
  };
  /**
   * The number of resources protected by the key grouped by region.
   */
  locations?: {
    [key: string]: bigint
  };
  /**
   * The full name of the ProtectedResourcesSummary resource. Example:
   * projects/test-project/locations/us/keyRings/test-keyring/cryptoKeys/test-key/protectedResourcesSummary
   */
  name?: string;
  /**
   * The number of distinct Cloud projects in the same Cloud organization as
   * the key that have resources protected by the key.
   */
  projectCount?: number;
  /**
   * The total number of protected resources in the same Cloud organization as
   * the key.
   */
  resourceCount?: bigint;
  /**
   * The number of resources protected by the key grouped by resource type.
   */
  resourceTypes?: {
    [key: string]: bigint
  };
}

function serializeGoogleCloudKmsInventoryV1ProtectedResourcesSummary(data: any): GoogleCloudKmsInventoryV1ProtectedResourcesSummary {
  return {
    ...data,
    cloudProducts: data["cloudProducts"] !== undefined ? Object.fromEntries(Object.entries(data["cloudProducts"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
    locations: data["locations"] !== undefined ? Object.fromEntries(Object.entries(data["locations"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
    resourceCount: data["resourceCount"] !== undefined ? String(data["resourceCount"]) : undefined,
    resourceTypes: data["resourceTypes"] !== undefined ? Object.fromEntries(Object.entries(data["resourceTypes"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeGoogleCloudKmsInventoryV1ProtectedResourcesSummary(data: any): GoogleCloudKmsInventoryV1ProtectedResourcesSummary {
  return {
    ...data,
    cloudProducts: data["cloudProducts"] !== undefined ? Object.fromEntries(Object.entries(data["cloudProducts"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
    locations: data["locations"] !== undefined ? Object.fromEntries(Object.entries(data["locations"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
    resourceCount: data["resourceCount"] !== undefined ? BigInt(data["resourceCount"]) : undefined,
    resourceTypes: data["resourceTypes"] !== undefined ? Object.fromEntries(Object.entries(data["resourceTypes"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Response message for KeyTrackingService.SearchProtectedResources.
 */
export interface GoogleCloudKmsInventoryV1SearchProtectedResourcesResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Protected resources for this page.
   */
  protectedResources?: GoogleCloudKmsInventoryV1ProtectedResource[];
}

/**
 * A CryptoKey represents a logical key that can be used for cryptographic
 * operations. A CryptoKey is made up of zero or more versions, which represent
 * the actual key material used in cryptographic operations.
 */
export interface GoogleCloudKmsV1CryptoKey {
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
  readonly primary?: GoogleCloudKmsV1CryptoKeyVersion;
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
  versionTemplate?: GoogleCloudKmsV1CryptoKeyVersionTemplate;
}

function serializeGoogleCloudKmsV1CryptoKey(data: any): GoogleCloudKmsV1CryptoKey {
  return {
    ...data,
    destroyScheduledDuration: data["destroyScheduledDuration"] !== undefined ? data["destroyScheduledDuration"] : undefined,
    nextRotationTime: data["nextRotationTime"] !== undefined ? data["nextRotationTime"].toISOString() : undefined,
    rotationPeriod: data["rotationPeriod"] !== undefined ? data["rotationPeriod"] : undefined,
  };
}

function deserializeGoogleCloudKmsV1CryptoKey(data: any): GoogleCloudKmsV1CryptoKey {
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
export interface GoogleCloudKmsV1CryptoKeyVersion {
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
  readonly attestation?: GoogleCloudKmsV1KeyOperationAttestation;
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
   * ExternalProtectionLevelOptions stores a group of additional fields for
   * configuring a CryptoKeyVersion that are specific to the EXTERNAL protection
   * level and EXTERNAL_VPC protection levels.
   */
  externalProtectionLevelOptions?: GoogleCloudKmsV1ExternalProtectionLevelOptions;
  /**
   * Output only. The time this CryptoKeyVersion's key material was generated.
   */
  readonly generateTime?: Date;
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
  state?:  | "CRYPTO_KEY_VERSION_STATE_UNSPECIFIED" | "PENDING_GENERATION" | "ENABLED" | "DISABLED" | "DESTROYED" | "DESTROY_SCHEDULED" | "PENDING_IMPORT" | "IMPORT_FAILED";
}

/**
 * A CryptoKeyVersionTemplate specifies the properties to use when creating a
 * new CryptoKeyVersion, either manually with CreateCryptoKeyVersion or
 * automatically as a result of auto-rotation.
 */
export interface GoogleCloudKmsV1CryptoKeyVersionTemplate {
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
 * ExternalProtectionLevelOptions stores a group of additional fields for
 * configuring a CryptoKeyVersion that are specific to the EXTERNAL protection
 * level and EXTERNAL_VPC protection levels.
 */
export interface GoogleCloudKmsV1ExternalProtectionLevelOptions {
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
 * Contains an HSM-generated attestation about a key operation. For more
 * information, see [Verifying attestations]
 * (https://cloud.google.com/kms/docs/attest-key).
 */
export interface GoogleCloudKmsV1KeyOperationAttestation {
  /**
   * Output only. The certificate chains needed to validate the attestation
   */
  readonly certChains?: GoogleCloudKmsV1KeyOperationAttestationCertificateChains;
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
 * Certificate chains needed to verify the attestation. Certificates in chains
 * are PEM-encoded and are ordered based on
 * https://tools.ietf.org/html/rfc5246#section-7.4.2.
 */
export interface GoogleCloudKmsV1KeyOperationAttestationCertificateChains {
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
 * Additional options for KMSInventory#organizationsProtectedResourcesSearch.
 */
export interface OrganizationsProtectedResourcesSearchOptions {
  /**
   * Required. The resource name of the CryptoKey.
   */
  cryptoKey?: string;
  /**
   * The maximum number of resources to return. The service may return fewer
   * than this value. If unspecified, at most 500 resources will be returned.
   * The maximum value is 500; values above 500 will be coerced to 500.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous
   * KeyTrackingService.SearchProtectedResources call. Provide this to retrieve
   * the subsequent page. When paginating, all other parameters provided to
   * KeyTrackingService.SearchProtectedResources must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for KMSInventory#projectsCryptoKeysList.
 */
export interface ProjectsCryptoKeysListOptions {
  /**
   * Optional. The maximum number of keys to return. The service may return
   * fewer than this value. If unspecified, at most 1000 keys will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Pass this into a subsequent request in order to receive the next
   * page of results.
   */
  pageToken?: string;
}