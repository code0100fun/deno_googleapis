// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * On-Demand Scanning API Client for Deno
 * ======================================
 * 
 * A service to scan container images for vulnerabilities.
 * 
 * Docs: https://cloud.google.com/container-analysis/docs/on-demand-scanning/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * A service to scan container images for vulnerabilities.
 */
export class ondemandScanning {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://ondemandscanning.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
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
  async projectsLocationsOperationsCancel(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
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
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
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

  /**
   * Waits until the specified long-running operation is done or reaches at
   * most a specified timeout, returning the latest state. If the operation is
   * already done, the latest state is immediately returned. If the timeout
   * specified is greater than the default HTTP/RPC timeout, the HTTP/RPC
   * timeout is used. If the server does not support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort
   * basis. It may return the latest state before the specified timeout
   * (including immediately), meaning even an immediate response is no guarantee
   * that the operation is done.
   *
   * @param name The name of the operation resource to wait on.
   */
  async projectsLocationsOperationsWait(name: string, opts: ProjectsLocationsOperationsWaitOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsOperationsWaitOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }:wait`);
    if (opts.timeout !== undefined) {
      url.searchParams.append("timeout", String(opts.timeout));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Operation;
  }

  /**
   * Initiates an analysis of the provided packages.
   *
   * @param parent Required. The parent of the resource for which analysis is requested. Format: projects/[project_name]/locations/[location]
   */
  async projectsLocationsScansAnalyzePackages(parent: string, req: AnalyzePackagesRequestV1): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/scans:analyzePackages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists vulnerabilities resulting from a successfully completed scan.
   *
   * @param parent Required. The parent of the collection of Vulnerabilities being requested. Format: projects/[project_name]/locations/[location]/scans/[scan_id]
   */
  async projectsLocationsScansVulnerabilitiesList(parent: string, opts: ProjectsLocationsScansVulnerabilitiesListOptions = {}): Promise<ListVulnerabilitiesResponseV1> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/vulnerabilities`);
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
    return deserializeListVulnerabilitiesResponseV1(data);
  }
}

/**
 * An alias to a repo revision.
 */
export interface AliasContext {
  /**
   * The alias kind.
   */
  kind?:  | "KIND_UNSPECIFIED" | "FIXED" | "MOVABLE" | "OTHER";
  /**
   * The alias name.
   */
  name?: string;
}

/**
 * Indicates which analysis completed successfully. Multiple types of analysis
 * can be performed on a single resource.
 */
export interface AnalysisCompleted {
  analysisType?: string[];
}

/**
 * AnalyzePackagesMetadata contains metadata for an active scan of a container
 * image.
 */
export interface AnalyzePackagesMetadata {
  /**
   * When the scan was created.
   */
  createTime?: Date;
  /**
   * The resource URI of the container image being scanned.
   */
  resourceUri?: string;
}

function serializeAnalyzePackagesMetadata(data: any): AnalyzePackagesMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeAnalyzePackagesMetadata(data: any): AnalyzePackagesMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * AnalyzePackagesMetadata contains metadata for an active scan of a container
 * image.
 */
export interface AnalyzePackagesMetadataV1 {
  /**
   * When the scan was created.
   */
  createTime?: Date;
  /**
   * The resource URI of the container image being scanned.
   */
  resourceUri?: string;
}

function serializeAnalyzePackagesMetadataV1(data: any): AnalyzePackagesMetadataV1 {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeAnalyzePackagesMetadataV1(data: any): AnalyzePackagesMetadataV1 {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * AnalyzePackagesRequest is the request to analyze a list of packages and
 * create Vulnerability Occurrences for it.
 */
export interface AnalyzePackagesRequestV1 {
  /**
   * [DEPRECATED] Whether to include OSV data in the scan. For backwards
   * compatibility reasons, this field can be neither removed nor renamed.
   */
  includeOsvData?: boolean;
  /**
   * The packages to analyze.
   */
  packages?: PackageData[];
  /**
   * Required. The resource URI of the container image being scanned.
   */
  resourceUri?: string;
}

/**
 * AnalyzePackagesResponse contains the information necessary to find results
 * for the given scan.
 */
export interface AnalyzePackagesResponse {
  /**
   * The name of the scan resource created by this successful scan.
   */
  scan?: string;
}

/**
 * AnalyzePackagesResponse contains the information necessary to find results
 * for the given scan.
 */
export interface AnalyzePackagesResponseV1 {
  /**
   * The name of the scan resource created by this successful scan.
   */
  scan?: string;
}

/**
 * Artifact describes a build product.
 */
export interface Artifact {
  /**
   * Hash or checksum value of a binary, or Docker Registry 2.0 digest of a
   * container.
   */
  checksum?: string;
  /**
   * Artifact ID, if any; for container images, this will be a URL by digest
   * like `gcr.io/projectID/imagename@sha256:123456`.
   */
  id?: string;
  /**
   * Related artifact names. This may be the path to a binary or jar file, or
   * in the case of a container build, the name used to push the container image
   * to Google Container Registry, as presented to `docker push`. Note that a
   * single Artifact ID can have multiple names, for example if two tags are
   * applied to one image.
   */
  names?: string[];
}

/**
 * Occurrence that represents a single "attestation". The authenticity of an
 * attestation can be verified using the attached signature. If the verifier
 * trusts the public key of the signer, then verifying the signature is
 * sufficient to establish trust. In this circumstance, the authority to which
 * this attestation is attached is primarily useful for lookup (how to find this
 * attestation if you already know the authority and artifact to be verified)
 * and intent (for which authority this attestation was intended to sign.
 */
export interface AttestationOccurrence {
  /**
   * One or more JWTs encoding a self-contained attestation. Each JWT encodes
   * the payload that it verifies within the JWT itself. Verifier implementation
   * SHOULD ignore the `serialized_payload` field when verifying these JWTs. If
   * only JWTs are present on this AttestationOccurrence, then the
   * `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim
   * specific to the `resource_uri` of this Occurrence, but this is not
   * validated by Grafeas metadata API implementations. The JWT itself is opaque
   * to Grafeas.
   */
  jwts?: Jwt[];
  /**
   * Required. The serialized payload that is verified by one or more
   * `signatures`.
   */
  serializedPayload?: Uint8Array;
  /**
   * One or more signatures over `serialized_payload`. Verifier implementations
   * should consider this attestation message verified if at least one
   * `signature` verifies `serialized_payload`. See `Signature` in common.proto
   * for more details on signature structure and verification.
   */
  signatures?: Signature[];
}

function serializeAttestationOccurrence(data: any): AttestationOccurrence {
  return {
    ...data,
    serializedPayload: data["serializedPayload"] !== undefined ? encodeBase64(data["serializedPayload"]) : undefined,
    signatures: data["signatures"] !== undefined ? data["signatures"].map((item: any) => (serializeSignature(item))) : undefined,
  };
}

function deserializeAttestationOccurrence(data: any): AttestationOccurrence {
  return {
    ...data,
    serializedPayload: data["serializedPayload"] !== undefined ? decodeBase64(data["serializedPayload"] as string) : undefined,
    signatures: data["signatures"] !== undefined ? data["signatures"].map((item: any) => (deserializeSignature(item))) : undefined,
  };
}

export interface BuilderConfig {
  id?: string;
}

/**
 * Details of a build occurrence.
 */
export interface BuildOccurrence {
  /**
   * Deprecated. See InTotoStatement for the replacement. In-toto Provenance
   * representation as defined in spec.
   */
  intotoProvenance?: InTotoProvenance;
  /**
   * In-toto Statement representation as defined in spec. The intoto_statement
   * can contain any type of provenance. The serialized payload of the statement
   * can be stored and signed in the Occurrence's envelope.
   */
  intotoStatement?: InTotoStatement;
  /**
   * The actual provenance for the build.
   */
  provenance?: BuildProvenance;
  /**
   * Serialized JSON representation of the provenance, used in generating the
   * build signature in the corresponding build note. After verifying the
   * signature, `provenance_bytes` can be unmarshalled and compared to the
   * provenance to confirm that it is unchanged. A base64-encoded string
   * representation of the provenance bytes is used for the signature in order
   * to interoperate with openssl which expects this format for signature
   * verification. The serialized form is captured both to avoid ambiguity in
   * how the provenance is marshalled to json as well to prevent
   * incompatibilities with future changes.
   */
  provenanceBytes?: string;
}

function serializeBuildOccurrence(data: any): BuildOccurrence {
  return {
    ...data,
    intotoProvenance: data["intotoProvenance"] !== undefined ? serializeInTotoProvenance(data["intotoProvenance"]) : undefined,
    intotoStatement: data["intotoStatement"] !== undefined ? serializeInTotoStatement(data["intotoStatement"]) : undefined,
    provenance: data["provenance"] !== undefined ? serializeBuildProvenance(data["provenance"]) : undefined,
  };
}

function deserializeBuildOccurrence(data: any): BuildOccurrence {
  return {
    ...data,
    intotoProvenance: data["intotoProvenance"] !== undefined ? deserializeInTotoProvenance(data["intotoProvenance"]) : undefined,
    intotoStatement: data["intotoStatement"] !== undefined ? deserializeInTotoStatement(data["intotoStatement"]) : undefined,
    provenance: data["provenance"] !== undefined ? deserializeBuildProvenance(data["provenance"]) : undefined,
  };
}

/**
 * Provenance of a build. Contains all information needed to verify the full
 * details about the build from source to completion.
 */
export interface BuildProvenance {
  /**
   * Version string of the builder at the time this build was executed.
   */
  builderVersion?: string;
  /**
   * Special options applied to this build. This is a catch-all field where
   * build providers can enter any desired additional details.
   */
  buildOptions?: {
    [key: string]: string
  };
  /**
   * Output of the build.
   */
  builtArtifacts?: Artifact[];
  /**
   * Commands requested by the build.
   */
  commands?: Command[];
  /**
   * Time at which the build was created.
   */
  createTime?: Date;
  /**
   * E-mail address of the user who initiated this build. Note that this was
   * the user's e-mail address at the time the build was initiated; this address
   * may not represent the same end-user for all time.
   */
  creator?: string;
  /**
   * Time at which execution of the build was finished.
   */
  endTime?: Date;
  /**
   * Required. Unique identifier of the build.
   */
  id?: string;
  /**
   * URI where any logs for this provenance were written.
   */
  logsUri?: string;
  /**
   * ID of the project.
   */
  projectId?: string;
  /**
   * Details of the Source input to the build.
   */
  sourceProvenance?: Source;
  /**
   * Time at which execution of the build was started.
   */
  startTime?: Date;
  /**
   * Trigger identifier if the build was triggered automatically; empty if not.
   */
  triggerId?: string;
}

function serializeBuildProvenance(data: any): BuildProvenance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    sourceProvenance: data["sourceProvenance"] !== undefined ? serializeSource(data["sourceProvenance"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeBuildProvenance(data: any): BuildProvenance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    sourceProvenance: data["sourceProvenance"] !== undefined ? deserializeSource(data["sourceProvenance"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The category to which the update belongs.
 */
export interface Category {
  /**
   * The identifier of the category.
   */
  categoryId?: string;
  /**
   * The localized name of the category.
   */
  name?: string;
}

/**
 * A CloudRepoSourceContext denotes a particular revision in a Google Cloud
 * Source Repo.
 */
export interface CloudRepoSourceContext {
  /**
   * An alias, which may be a branch or tag.
   */
  aliasContext?: AliasContext;
  /**
   * The ID of the repo.
   */
  repoId?: RepoId;
  /**
   * A revision ID.
   */
  revisionId?: string;
}

/**
 * Command describes a step performed as part of the build pipeline.
 */
export interface Command {
  /**
   * Command-line arguments used when executing this command.
   */
  args?: string[];
  /**
   * Working directory (relative to project source root) used when running this
   * command.
   */
  dir?: string;
  /**
   * Environment variables set before running this command.
   */
  env?: string[];
  /**
   * Optional unique identifier for this command, used in wait_for to reference
   * this command as a dependency.
   */
  id?: string;
  /**
   * Required. Name of the command, as presented on the command line, or if the
   * command is packaged as a Docker container, as presented to `docker pull`.
   */
  name?: string;
  /**
   * The ID(s) of the command(s) that this command depends on.
   */
  waitFor?: string[];
}

/**
 * Indicates that the builder claims certain fields in this message to be
 * complete.
 */
export interface Completeness {
  /**
   * If true, the builder claims that recipe.arguments is complete, meaning
   * that all external inputs are properly captured in the recipe.
   */
  arguments?: boolean;
  /**
   * If true, the builder claims that recipe.environment is claimed to be
   * complete.
   */
  environment?: boolean;
  /**
   * If true, the builder claims that materials are complete, usually through
   * some controls to prevent network access. Sometimes called "hermetic".
   */
  materials?: boolean;
}

/**
 * An indication that the compliance checks in the associated ComplianceNote
 * were not satisfied for particular resources or a specified reason.
 */
export interface ComplianceOccurrence {
  nonComplianceReason?: string;
  nonCompliantFiles?: NonCompliantFile[];
}

/**
 * Common Vulnerability Scoring System. For details, see
 * https://www.first.org/cvss/specification-document This is a message we will
 * try to use for storing various versions of CVSS rather than making a separate
 * proto for storing a specific version.
 */
export interface CVSS {
  attackComplexity?:  | "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH";
  /**
   * Base Metrics Represents the intrinsic characteristics of a vulnerability
   * that are constant over time and across user environments.
   */
  attackVector?:  | "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL";
  authentication?:  | "AUTHENTICATION_UNSPECIFIED" | "AUTHENTICATION_MULTIPLE" | "AUTHENTICATION_SINGLE" | "AUTHENTICATION_NONE";
  availabilityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  /**
   * The base score is a function of the base metric scores.
   */
  baseScore?: number;
  confidentialityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  exploitabilityScore?: number;
  impactScore?: number;
  integrityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  privilegesRequired?:  | "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH";
  scope?:  | "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED";
  userInteraction?:  | "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED";
}

/**
 * The period during which some deployable was active in a runtime.
 */
export interface DeploymentOccurrence {
  /**
   * Address of the runtime element hosting this deployment.
   */
  address?: string;
  /**
   * Configuration used to create this deployment.
   */
  config?: string;
  /**
   * Required. Beginning of the lifetime of this deployment.
   */
  deployTime?: Date;
  /**
   * Platform hosting this deployment.
   */
  platform?:  | "PLATFORM_UNSPECIFIED" | "GKE" | "FLEX" | "CUSTOM";
  /**
   * Output only. Resource URI for the artifact being deployed taken from the
   * deployable field with the same name.
   */
  resourceUri?: string[];
  /**
   * End of the lifetime of this deployment.
   */
  undeployTime?: Date;
  /**
   * Identity of the user that triggered this deployment.
   */
  userEmail?: string;
}

function serializeDeploymentOccurrence(data: any): DeploymentOccurrence {
  return {
    ...data,
    deployTime: data["deployTime"] !== undefined ? data["deployTime"].toISOString() : undefined,
    undeployTime: data["undeployTime"] !== undefined ? data["undeployTime"].toISOString() : undefined,
  };
}

function deserializeDeploymentOccurrence(data: any): DeploymentOccurrence {
  return {
    ...data,
    deployTime: data["deployTime"] !== undefined ? new Date(data["deployTime"]) : undefined,
    undeployTime: data["undeployTime"] !== undefined ? new Date(data["undeployTime"]) : undefined,
  };
}

/**
 * Provides information about the analysis status of a discovered resource.
 */
export interface DiscoveryOccurrence {
  analysisCompleted?: AnalysisCompleted;
  /**
   * Indicates any errors encountered during analysis of a resource. There
   * could be 0 or more of these errors.
   */
  analysisError?: Status[];
  /**
   * The status of discovery for the resource.
   */
  analysisStatus?:  | "ANALYSIS_STATUS_UNSPECIFIED" | "PENDING" | "SCANNING" | "FINISHED_SUCCESS" | "COMPLETE" | "FINISHED_FAILED" | "FINISHED_UNSUPPORTED";
  /**
   * When an error is encountered this will contain a LocalizedMessage under
   * details to show to the user. The LocalizedMessage is output only and
   * populated by the API.
   */
  analysisStatusError?: Status;
  /**
   * Output only. The time occurrences related to this discovery occurrence
   * were archived.
   */
  readonly archiveTime?: Date;
  /**
   * Whether the resource is continuously analyzed.
   */
  continuousAnalysis?:  | "CONTINUOUS_ANALYSIS_UNSPECIFIED" | "ACTIVE" | "INACTIVE";
  /**
   * The CPE of the resource being scanned.
   */
  cpe?: string;
  /**
   * The last time this resource was scanned.
   */
  lastScanTime?: Date;
}

function serializeDiscoveryOccurrence(data: any): DiscoveryOccurrence {
  return {
    ...data,
    lastScanTime: data["lastScanTime"] !== undefined ? data["lastScanTime"].toISOString() : undefined,
  };
}

function deserializeDiscoveryOccurrence(data: any): DiscoveryOccurrence {
  return {
    ...data,
    archiveTime: data["archiveTime"] !== undefined ? new Date(data["archiveTime"]) : undefined,
    lastScanTime: data["lastScanTime"] !== undefined ? new Date(data["lastScanTime"]) : undefined,
  };
}

/**
 * Deprecated. Prefer to use a regular Occurrence, and populate the Envelope at
 * the top level of the Occurrence.
 */
export interface DSSEAttestationOccurrence {
  /**
   * If doing something security critical, make sure to verify the signatures
   * in this metadata.
   */
  envelope?: Envelope;
  statement?: InTotoStatement;
}

function serializeDSSEAttestationOccurrence(data: any): DSSEAttestationOccurrence {
  return {
    ...data,
    envelope: data["envelope"] !== undefined ? serializeEnvelope(data["envelope"]) : undefined,
    statement: data["statement"] !== undefined ? serializeInTotoStatement(data["statement"]) : undefined,
  };
}

function deserializeDSSEAttestationOccurrence(data: any): DSSEAttestationOccurrence {
  return {
    ...data,
    envelope: data["envelope"] !== undefined ? deserializeEnvelope(data["envelope"]) : undefined,
    statement: data["statement"] !== undefined ? deserializeInTotoStatement(data["statement"]) : undefined,
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
 * MUST match
 * https://github.com/secure-systems-lab/dsse/blob/master/envelope.proto. An
 * authenticated message of arbitrary type.
 */
export interface Envelope {
  payload?: Uint8Array;
  payloadType?: string;
  signatures?: EnvelopeSignature[];
}

function serializeEnvelope(data: any): Envelope {
  return {
    ...data,
    payload: data["payload"] !== undefined ? encodeBase64(data["payload"]) : undefined,
    signatures: data["signatures"] !== undefined ? data["signatures"].map((item: any) => (serializeEnvelopeSignature(item))) : undefined,
  };
}

function deserializeEnvelope(data: any): Envelope {
  return {
    ...data,
    payload: data["payload"] !== undefined ? decodeBase64(data["payload"] as string) : undefined,
    signatures: data["signatures"] !== undefined ? data["signatures"].map((item: any) => (deserializeEnvelopeSignature(item))) : undefined,
  };
}

export interface EnvelopeSignature {
  keyid?: string;
  sig?: Uint8Array;
}

function serializeEnvelopeSignature(data: any): EnvelopeSignature {
  return {
    ...data,
    sig: data["sig"] !== undefined ? encodeBase64(data["sig"]) : undefined,
  };
}

function deserializeEnvelopeSignature(data: any): EnvelopeSignature {
  return {
    ...data,
    sig: data["sig"] !== undefined ? decodeBase64(data["sig"] as string) : undefined,
  };
}

/**
 * Container message for hashes of byte content of files, used in source
 * messages to verify integrity of source input to the build.
 */
export interface FileHashes {
  /**
   * Required. Collection of file hashes.
   */
  fileHash?: Hash[];
}

function serializeFileHashes(data: any): FileHashes {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (serializeHash(item))) : undefined,
  };
}

function deserializeFileHashes(data: any): FileHashes {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (deserializeHash(item))) : undefined,
  };
}

/**
 * Indicates the location at which a package was found.
 */
export interface FileLocation {
  /**
   * For jars that are contained inside .war files, this filepath can indicate
   * the path to war file combined with the path to jar file.
   */
  filePath?: string;
}

/**
 * A set of properties that uniquely identify a given Docker image.
 */
export interface Fingerprint {
  /**
   * Required. The layer ID of the final layer in the Docker image's v1
   * representation.
   */
  v1Name?: string;
  /**
   * Required. The ordered list of v2 blobs that represent a given image.
   */
  v2Blob?: string[];
  /**
   * Output only. The name of the image's v2 blobs computed via: [bottom] :=
   * v2_blobbottom := sha256(v2_blob[N] + " " + v2_name[N+1]) Only the name of
   * the final blob is kept.
   */
  v2Name?: string;
}

/**
 * A SourceContext referring to a Gerrit project.
 */
export interface GerritSourceContext {
  /**
   * An alias, which may be a branch or tag.
   */
  aliasContext?: AliasContext;
  /**
   * The full project name within the host. Projects may be nested, so
   * "project/subproject" is a valid project name. The "repo name" is the
   * hostURI/project.
   */
  gerritProject?: string;
  /**
   * The URI of a running Gerrit instance.
   */
  hostUri?: string;
  /**
   * A revision (commit) ID.
   */
  revisionId?: string;
}

/**
 * A GitSourceContext denotes a particular revision in a third party Git
 * repository (e.g., GitHub).
 */
export interface GitSourceContext {
  /**
   * Git commit hash.
   */
  revisionId?: string;
  /**
   * Git repository URL.
   */
  url?: string;
}

/**
 * Indicates the location at which a package was found.
 */
export interface GrafeasV1FileLocation {
  /**
   * For jars that are contained inside .war files, this filepath can indicate
   * the path to war file combined with the path to jar file.
   */
  filePath?: string;
}

/**
 * Identifies the entity that executed the recipe, which is trusted to have
 * correctly performed the operation and populated this provenance.
 */
export interface GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder {
  id?: string;
}

/**
 * Indicates that the builder claims certain fields in this message to be
 * complete.
 */
export interface GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness {
  environment?: boolean;
  materials?: boolean;
  parameters?: boolean;
}

/**
 * Describes where the config file that kicked off the build came from. This is
 * effectively a pointer to the source where buildConfig came from.
 */
export interface GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource {
  digest?: {
    [key: string]: string
  };
  entryPoint?: string;
  uri?: string;
}

/**
 * Identifies the event that kicked off the build.
 */
export interface GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation {
  configSource?: GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource;
  environment?: {
    [key: string]: any
  };
  parameters?: {
    [key: string]: any
  };
}

/**
 * The collection of artifacts that influenced the build including sources,
 * dependencies, build tools, base images, and so on.
 */
export interface GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial {
  digest?: {
    [key: string]: string
  };
  uri?: string;
}

/**
 * Other properties of the build.
 */
export interface GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata {
  buildFinishedOn?: Date;
  buildInvocationId?: string;
  buildStartedOn?: Date;
  completeness?: GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness;
  reproducible?: boolean;
}

function serializeGrafeasV1SlsaProvenanceZeroTwoSlsaMetadata(data: any): GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata {
  return {
    ...data,
    buildFinishedOn: data["buildFinishedOn"] !== undefined ? data["buildFinishedOn"].toISOString() : undefined,
    buildStartedOn: data["buildStartedOn"] !== undefined ? data["buildStartedOn"].toISOString() : undefined,
  };
}

function deserializeGrafeasV1SlsaProvenanceZeroTwoSlsaMetadata(data: any): GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata {
  return {
    ...data,
    buildFinishedOn: data["buildFinishedOn"] !== undefined ? new Date(data["buildFinishedOn"]) : undefined,
    buildStartedOn: data["buildStartedOn"] !== undefined ? new Date(data["buildStartedOn"]) : undefined,
  };
}

/**
 * Container message for hash values.
 */
export interface Hash {
  /**
   * Required. The type of hash that was performed, e.g. "SHA-256".
   */
  type?: string;
  /**
   * Required. The hash value.
   */
  value?: Uint8Array;
}

function serializeHash(data: any): Hash {
  return {
    ...data,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializeHash(data: any): Hash {
  return {
    ...data,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

/**
 * The unique identifier of the update.
 */
export interface Identity {
  /**
   * The revision number of the update.
   */
  revision?: number;
  /**
   * The revision independent identifier of the update.
   */
  updateId?: string;
}

/**
 * Details of the derived image portion of the DockerImage relationship. This
 * image would be produced from a Dockerfile with FROM .
 */
export interface ImageOccurrence {
  /**
   * Output only. This contains the base image URL for the derived image
   * occurrence.
   */
  baseResourceUrl?: string;
  /**
   * Output only. The number of layers by which this image differs from the
   * associated image basis.
   */
  distance?: number;
  /**
   * Required. The fingerprint of the derived image.
   */
  fingerprint?: Fingerprint;
  /**
   * This contains layer-specific metadata, if populated it has length
   * "distance" and is ordered with [distance] being the layer immediately
   * following the base image and [1] being the final layer.
   */
  layerInfo?: Layer[];
}

export interface InTotoProvenance {
  /**
   * required
   */
  builderConfig?: BuilderConfig;
  /**
   * The collection of artifacts that influenced the build including sources,
   * dependencies, build tools, base images, and so on. This is considered to be
   * incomplete unless metadata.completeness.materials is true. Unset or null is
   * equivalent to empty.
   */
  materials?: string[];
  metadata?: Metadata;
  /**
   * Identifies the configuration used for the build. When combined with
   * materials, this SHOULD fully describe the build, such that re-running this
   * recipe results in bit-for-bit identical output (if the build is
   * reproducible). required
   */
  recipe?: Recipe;
}

function serializeInTotoProvenance(data: any): InTotoProvenance {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeMetadata(data["metadata"]) : undefined,
    recipe: data["recipe"] !== undefined ? serializeRecipe(data["recipe"]) : undefined,
  };
}

function deserializeInTotoProvenance(data: any): InTotoProvenance {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeMetadata(data["metadata"]) : undefined,
    recipe: data["recipe"] !== undefined ? deserializeRecipe(data["recipe"]) : undefined,
  };
}

/**
 * Spec defined at
 * https://github.com/in-toto/attestation/tree/main/spec#statement The
 * serialized InTotoStatement will be stored as Envelope.payload.
 * Envelope.payloadType is always "application/vnd.in-toto+json".
 */
export interface InTotoStatement {
  /**
   * Always `https://in-toto.io/Statement/v0.1`.
   */
  _type?: string;
  /**
   * `https://slsa.dev/provenance/v0.1` for SlsaProvenance.
   */
  predicateType?: string;
  provenance?: InTotoProvenance;
  slsaProvenance?: SlsaProvenance;
  slsaProvenanceZeroTwo?: SlsaProvenanceZeroTwo;
  subject?: Subject[];
}

function serializeInTotoStatement(data: any): InTotoStatement {
  return {
    ...data,
    provenance: data["provenance"] !== undefined ? serializeInTotoProvenance(data["provenance"]) : undefined,
    slsaProvenance: data["slsaProvenance"] !== undefined ? serializeSlsaProvenance(data["slsaProvenance"]) : undefined,
    slsaProvenanceZeroTwo: data["slsaProvenanceZeroTwo"] !== undefined ? serializeSlsaProvenanceZeroTwo(data["slsaProvenanceZeroTwo"]) : undefined,
  };
}

function deserializeInTotoStatement(data: any): InTotoStatement {
  return {
    ...data,
    provenance: data["provenance"] !== undefined ? deserializeInTotoProvenance(data["provenance"]) : undefined,
    slsaProvenance: data["slsaProvenance"] !== undefined ? deserializeSlsaProvenance(data["slsaProvenance"]) : undefined,
    slsaProvenanceZeroTwo: data["slsaProvenanceZeroTwo"] !== undefined ? deserializeSlsaProvenanceZeroTwo(data["slsaProvenanceZeroTwo"]) : undefined,
  };
}

export interface Jwt {
  /**
   * The compact encoding of a JWS, which is always three base64 encoded
   * strings joined by periods. For details, see:
   * https://tools.ietf.org/html/rfc7515.html#section-3.1
   */
  compactJwt?: string;
}

/**
 * Indicates a language package available between this package and the
 * customer's resource artifact.
 */
export interface LanguagePackageDependency {
  package?: string;
  version?: string;
}

/**
 * Layer holds metadata specific to a layer of a Docker image.
 */
export interface Layer {
  /**
   * The recovered arguments to the Dockerfile directive.
   */
  arguments?: string;
  /**
   * Required. The recovered Dockerfile directive used to construct this layer.
   * See https://docs.docker.com/engine/reference/builder/ for more information.
   */
  directive?: string;
}

/**
 * License information.
 */
export interface License {
  /**
   * Comments
   */
  comments?: string;
  /**
   * Often a single license can be used to represent the licensing terms.
   * Sometimes it is necessary to include a choice of one or more licenses or
   * some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT",
   * "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2".
   */
  expression?: string;
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
 * ListVulnerabilitiesResponse contains a single page of vulnerabilities
 * resulting from a scan.
 */
export interface ListVulnerabilitiesResponseV1 {
  /**
   * A page token that can be used in a subsequent call to ListVulnerabilities
   * to continue retrieving results.
   */
  nextPageToken?: string;
  /**
   * The list of Vulnerability Occurrences resulting from a scan.
   */
  occurrences?: Occurrence[];
}

function serializeListVulnerabilitiesResponseV1(data: any): ListVulnerabilitiesResponseV1 {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (serializeOccurrence(item))) : undefined,
  };
}

function deserializeListVulnerabilitiesResponseV1(data: any): ListVulnerabilitiesResponseV1 {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (deserializeOccurrence(item))) : undefined,
  };
}

/**
 * An occurrence of a particular package installation found within a system's
 * filesystem. E.g., glibc was found in `/var/lib/dpkg/status`.
 */
export interface Location {
  /**
   * Deprecated. The CPE URI in [CPE
   * format](https://cpe.mitre.org/specification/)
   */
  cpeUri?: string;
  /**
   * The path from which we gathered that this package/version is installed.
   */
  path?: string;
  /**
   * Deprecated. The version installed at this location.
   */
  version?: Version;
}

export interface Maintainer {
  kind?: string;
  name?: string;
}

export interface Material {
  digest?: {
    [key: string]: string
  };
  uri?: string;
}

/**
 * Other properties of the build.
 */
export interface Metadata {
  /**
   * The timestamp of when the build completed.
   */
  buildFinishedOn?: Date;
  /**
   * Identifies the particular build invocation, which can be useful for
   * finding associated logs or other ad-hoc analysis. The value SHOULD be
   * globally unique, per in-toto Provenance spec.
   */
  buildInvocationId?: string;
  /**
   * The timestamp of when the build started.
   */
  buildStartedOn?: Date;
  /**
   * Indicates that the builder claims certain fields in this message to be
   * complete.
   */
  completeness?: Completeness;
  /**
   * If true, the builder claims that running the recipe on materials will
   * produce bit-for-bit identical output.
   */
  reproducible?: boolean;
}

function serializeMetadata(data: any): Metadata {
  return {
    ...data,
    buildFinishedOn: data["buildFinishedOn"] !== undefined ? data["buildFinishedOn"].toISOString() : undefined,
    buildStartedOn: data["buildStartedOn"] !== undefined ? data["buildStartedOn"].toISOString() : undefined,
  };
}

function deserializeMetadata(data: any): Metadata {
  return {
    ...data,
    buildFinishedOn: data["buildFinishedOn"] !== undefined ? new Date(data["buildFinishedOn"]) : undefined,
    buildStartedOn: data["buildStartedOn"] !== undefined ? new Date(data["buildStartedOn"]) : undefined,
  };
}

/**
 * Details about files that caused a compliance check to fail. display_command
 * is a single command that can be used to display a list of non compliant
 * files. When there is no such command, we can also iterate a list of non
 * compliant file using 'path'.
 */
export interface NonCompliantFile {
  /**
   * Command to display the non-compliant files.
   */
  displayCommand?: string;
  /**
   * Empty if `display_command` is set.
   */
  path?: string;
  /**
   * Explains why a file is non compliant for a CIS check.
   */
  reason?: string;
}

/**
 * An instance of an analysis type that has been found on a resource.
 */
export interface Occurrence {
  /**
   * Describes an attestation of an artifact.
   */
  attestation?: AttestationOccurrence;
  /**
   * Describes a verifiable build.
   */
  build?: BuildOccurrence;
  /**
   * Describes a compliance violation on a linked resource.
   */
  compliance?: ComplianceOccurrence;
  /**
   * Output only. The time this occurrence was created.
   */
  createTime?: Date;
  /**
   * Describes the deployment of an artifact on a runtime.
   */
  deployment?: DeploymentOccurrence;
  /**
   * Describes when a resource was discovered.
   */
  discovery?: DiscoveryOccurrence;
  /**
   * Describes an attestation of an artifact using dsse.
   */
  dsseAttestation?: DSSEAttestationOccurrence;
  /**
   * https://github.com/secure-systems-lab/dsse
   */
  envelope?: Envelope;
  /**
   * Describes how this resource derives from the basis in the associated note.
   */
  image?: ImageOccurrence;
  /**
   * Output only. This explicitly denotes which of the occurrence details are
   * specified. This field can be used as a filter in list requests.
   */
  kind?:  | "NOTE_KIND_UNSPECIFIED" | "VULNERABILITY" | "BUILD" | "IMAGE" | "PACKAGE" | "DEPLOYMENT" | "DISCOVERY" | "ATTESTATION" | "UPGRADE" | "COMPLIANCE" | "DSSE_ATTESTATION";
  /**
   * Output only. The name of the occurrence in the form of
   * `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`.
   */
  name?: string;
  /**
   * Required. Immutable. The analysis note associated with this occurrence, in
   * the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be
   * used as a filter in list requests.
   */
  noteName?: string;
  /**
   * Describes the installation of a package on the linked resource.
   */
  package?: PackageOccurrence;
  /**
   * A description of actions that can be taken to remedy the note.
   */
  remediation?: string;
  /**
   * Required. Immutable. A URI that represents the resource for which the
   * occurrence applies. For example,
   * `https://gcr.io/project/image@sha256:123abc` for a Docker image.
   */
  resourceUri?: string;
  /**
   * Output only. The time this occurrence was last updated.
   */
  updateTime?: Date;
  /**
   * Describes an available package upgrade on the linked resource.
   */
  upgrade?: UpgradeOccurrence;
  /**
   * Describes a security vulnerability.
   */
  vulnerability?: VulnerabilityOccurrence;
}

function serializeOccurrence(data: any): Occurrence {
  return {
    ...data,
    attestation: data["attestation"] !== undefined ? serializeAttestationOccurrence(data["attestation"]) : undefined,
    build: data["build"] !== undefined ? serializeBuildOccurrence(data["build"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    deployment: data["deployment"] !== undefined ? serializeDeploymentOccurrence(data["deployment"]) : undefined,
    discovery: data["discovery"] !== undefined ? serializeDiscoveryOccurrence(data["discovery"]) : undefined,
    dsseAttestation: data["dsseAttestation"] !== undefined ? serializeDSSEAttestationOccurrence(data["dsseAttestation"]) : undefined,
    envelope: data["envelope"] !== undefined ? serializeEnvelope(data["envelope"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
    upgrade: data["upgrade"] !== undefined ? serializeUpgradeOccurrence(data["upgrade"]) : undefined,
  };
}

function deserializeOccurrence(data: any): Occurrence {
  return {
    ...data,
    attestation: data["attestation"] !== undefined ? deserializeAttestationOccurrence(data["attestation"]) : undefined,
    build: data["build"] !== undefined ? deserializeBuildOccurrence(data["build"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deployment: data["deployment"] !== undefined ? deserializeDeploymentOccurrence(data["deployment"]) : undefined,
    discovery: data["discovery"] !== undefined ? deserializeDiscoveryOccurrence(data["discovery"]) : undefined,
    dsseAttestation: data["dsseAttestation"] !== undefined ? deserializeDSSEAttestationOccurrence(data["dsseAttestation"]) : undefined,
    envelope: data["envelope"] !== undefined ? deserializeEnvelope(data["envelope"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    upgrade: data["upgrade"] !== undefined ? deserializeUpgradeOccurrence(data["upgrade"]) : undefined,
  };
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

export interface PackageData {
  /**
   * The architecture of the package.
   */
  architecture?: string;
  /**
   * The cpe_uri in [cpe format] (https://cpe.mitre.org/specification/) in
   * which the vulnerability may manifest. Examples include distro or storage
   * location for vulnerable jar.
   */
  cpeUri?: string;
  /**
   * The dependency chain between this package and the user's artifact. List in
   * order from the customer's package under review first, to the current
   * package last. Inclusive of the original package and the current package.
   */
  dependencyChain?: LanguagePackageDependency[];
  /**
   * The path to the jar file / go binary file.
   */
  fileLocation?: FileLocation[];
  /**
   * HashDigest stores the SHA512 hash digest of the jar file if the package is
   * of type Maven. This field will be unset for non Maven packages.
   */
  hashDigest?: string;
  /**
   * The maintainer of the package.
   */
  maintainer?: Maintainer;
  /**
   * The OS affected by a vulnerability Used to generate the cpe_uri for OS
   * packages
   */
  os?: string;
  /**
   * The version of the OS Used to generate the cpe_uri for OS packages
   */
  osVersion?: string;
  /**
   * The package being analysed for vulnerabilities
   */
  package?: string;
  /**
   * The type of package: os, maven, go, etc.
   */
  packageType?:  | "PACKAGE_TYPE_UNSPECIFIED" | "OS" | "MAVEN" | "GO" | "GO_STDLIB" | "PYPI" | "NPM";
  /**
   * CVEs that this package is no longer vulnerable to
   * go/drydock-dd-custom-binary-scanning
   */
  patchedCve?: string[];
  unused?: string;
  /**
   * The version of the package being analysed
   */
  version?: string;
}

/**
 * A detail for a distro and package this vulnerability occurrence was found in
 * and its associated fix (if one is available).
 */
export interface PackageIssue {
  /**
   * Required. The [CPE URI](https://cpe.mitre.org/specification/) this
   * vulnerability was found in.
   */
  affectedCpeUri?: string;
  /**
   * Required. The package this vulnerability was found in.
   */
  affectedPackage?: string;
  /**
   * Required. The version of the package that is installed on the resource
   * affected by this vulnerability.
   */
  affectedVersion?: Version;
  /**
   * Output only. The distro or language system assigned severity for this
   * vulnerability when that is available and note provider assigned severity
   * when it is not available.
   */
  readonly effectiveSeverity?:  | "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  /**
   * The location at which this package was found.
   */
  fileLocation?: GrafeasV1FileLocation[];
  /**
   * Output only. Whether a fix is available for this package.
   */
  fixAvailable?: boolean;
  /**
   * The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was
   * fixed in. It is possible for this to be different from the
   * affected_cpe_uri.
   */
  fixedCpeUri?: string;
  /**
   * The package this vulnerability was fixed in. It is possible for this to be
   * different from the affected_package.
   */
  fixedPackage?: string;
  /**
   * Required. The version of the package this vulnerability was fixed in.
   * Setting this to VersionKind.MAXIMUM means no fix is yet available.
   */
  fixedVersion?: Version;
  /**
   * The type of package (e.g. OS, MAVEN, GO).
   */
  packageType?: string;
}

/**
 * Details on how a particular software package was installed on a system.
 */
export interface PackageOccurrence {
  /**
   * Output only. The CPU architecture for which packages in this distribution
   * channel were built. Architecture will be blank for language packages.
   */
  readonly architecture?:  | "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64";
  /**
   * Output only. The cpe_uri in [CPE
   * format](https://cpe.mitre.org/specification/) denoting the package manager
   * version distributing a package. The cpe_uri will be blank for language
   * packages.
   */
  readonly cpeUri?: string;
  /**
   * Licenses that have been declared by the authors of the package.
   */
  license?: License;
  /**
   * All of the places within the filesystem versions of this package have been
   * found.
   */
  location?: Location[];
  /**
   * Required. Output only. The name of the installed package.
   */
  readonly name?: string;
  /**
   * Output only. The type of package; whether native or non native (e.g., ruby
   * gems, node.js packages, etc.).
   */
  readonly packageType?: string;
  /**
   * Output only. The version of the package.
   */
  readonly version?: Version;
}

/**
 * Selects a repo using a Google Cloud Platform project ID (e.g.,
 * winged-cargo-31) and a repo name within that project.
 */
export interface ProjectRepoId {
  /**
   * The ID of the project.
   */
  projectId?: string;
  /**
   * The name of the repo. Leave empty for the default repo.
   */
  repoName?: string;
}

/**
 * Additional options for ondemandScanning#projectsLocationsOperationsList.
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
 * Additional options for ondemandScanning#projectsLocationsOperationsWait.
 */
export interface ProjectsLocationsOperationsWaitOptions {
  /**
   * The maximum duration to wait before timing out. If left blank, the wait
   * will be at most the time permitted by the underlying HTTP/RPC protocol. If
   * RPC context deadline is also specified, the shorter one will be used.
   */
  timeout?: number /* Duration */;
}

function serializeProjectsLocationsOperationsWaitOptions(data: any): ProjectsLocationsOperationsWaitOptions {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeProjectsLocationsOperationsWaitOptions(data: any): ProjectsLocationsOperationsWaitOptions {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Additional options for
 * ondemandScanning#projectsLocationsScansVulnerabilitiesList.
 */
export interface ProjectsLocationsScansVulnerabilitiesListOptions {
  /**
   * The number of vulnerabilities to retrieve.
   */
  pageSize?: number;
  /**
   * The page token, resulting from a previous call to ListVulnerabilities.
   */
  pageToken?: string;
}

/**
 * Steps taken to build the artifact. For a TaskRun, typically each container
 * corresponds to one step in the recipe.
 */
export interface Recipe {
  /**
   * Collection of all external inputs that influenced the build on top of
   * recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe
   * type were "make", then this might be the flags passed to make aside from
   * the target, which is captured in recipe.entryPoint. Since the arguments
   * field can greatly vary in structure, depending on the builder and recipe
   * type, this is of form "Any".
   */
  arguments?: {
    [key: string]: any
  }[];
  /**
   * Index in materials containing the recipe steps that are not implied by
   * recipe.type. For example, if the recipe type were "make", then this would
   * point to the source containing the Makefile, not the make program itself.
   * Set to -1 if the recipe doesn't come from a material, as zero is default
   * unset value for int64.
   */
  definedInMaterial?: bigint;
  /**
   * String identifying the entry point into the build. This is often a path to
   * a configuration file and/or a target label within that file. The syntax and
   * meaning are defined by recipe.type. For example, if the recipe type were
   * "make", then this would reference the directory in which to run make as
   * well as which target to use.
   */
  entryPoint?: string;
  /**
   * Any other builder-controlled inputs necessary for correctly evaluating the
   * recipe. Usually only needed for reproducing the build but not evaluated as
   * part of policy. Since the environment field can greatly vary in structure,
   * depending on the builder and recipe type, this is of form "Any".
   */
  environment?: {
    [key: string]: any
  }[];
  /**
   * URI indicating what type of recipe was performed. It determines the
   * meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and
   * materials.
   */
  type?: string;
}

function serializeRecipe(data: any): Recipe {
  return {
    ...data,
    definedInMaterial: data["definedInMaterial"] !== undefined ? String(data["definedInMaterial"]) : undefined,
  };
}

function deserializeRecipe(data: any): Recipe {
  return {
    ...data,
    definedInMaterial: data["definedInMaterial"] !== undefined ? BigInt(data["definedInMaterial"]) : undefined,
  };
}

/**
 * Metadata for any related URL information.
 */
export interface RelatedUrl {
  /**
   * Label to describe usage of the URL.
   */
  label?: string;
  /**
   * Specific URL associated with the resource.
   */
  url?: string;
}

/**
 * A unique identifier for a Cloud Repo.
 */
export interface RepoId {
  /**
   * A combination of a project ID and a repo name.
   */
  projectRepoId?: ProjectRepoId;
  /**
   * A server-assigned, globally unique identifier.
   */
  uid?: string;
}

/**
 * Verifiers (e.g. Kritis implementations) MUST verify signatures with respect
 * to the trust anchors defined in policy (e.g. a Kritis policy). Typically this
 * means that the verifier has been configured with a map from `public_key_id`
 * to public key material (and any required parameters, e.g. signing algorithm).
 * In particular, verification implementations MUST NOT treat the signature
 * `public_key_id` as anything more than a key lookup hint. The `public_key_id`
 * DOES NOT validate or authenticate a public key; it only provides a mechanism
 * for quickly selecting a public key ALREADY CONFIGURED on the verifier through
 * a trusted channel. Verification implementations MUST reject signatures in any
 * of the following circumstances: * The `public_key_id` is not recognized by
 * the verifier. * The public key that `public_key_id` refers to does not verify
 * the signature with respect to the payload. The `signature` contents SHOULD
 * NOT be "attached" (where the payload is included with the serialized
 * `signature` bytes). Verifiers MUST ignore any "attached" payload and only
 * verify signatures with respect to explicitly provided payload (e.g. a
 * `payload` field on the proto message that holds this Signature, or the
 * canonical serialization of the proto message that holds this signature).
 */
export interface Signature {
  /**
   * The identifier for the public key that verifies this signature. * The
   * `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986
   * conformant URI. * When possible, the `public_key_id` SHOULD be an immutable
   * reference, such as a cryptographic digest. Examples of valid
   * `public_key_id`s: OpenPGP V4 public key fingerprint: *
   * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See
   * https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more
   * details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest
   * of the DER serialization): *
   * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" *
   * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5"
   */
  publicKeyId?: string;
  /**
   * The content of the signature, an opaque bytestring. The payload that this
   * signature verifies MUST be unambiguously provided with the Signature during
   * verification. A wrapper message might provide the payload explicitly.
   * Alternatively, a message might have a canonical serialization that can
   * always be unambiguously computed to derive the payload.
   */
  signature?: Uint8Array;
}

function serializeSignature(data: any): Signature {
  return {
    ...data,
    signature: data["signature"] !== undefined ? encodeBase64(data["signature"]) : undefined,
  };
}

function deserializeSignature(data: any): Signature {
  return {
    ...data,
    signature: data["signature"] !== undefined ? decodeBase64(data["signature"] as string) : undefined,
  };
}

export interface SlsaBuilder {
  id?: string;
}

/**
 * Indicates that the builder claims certain fields in this message to be
 * complete.
 */
export interface SlsaCompleteness {
  /**
   * If true, the builder claims that recipe.arguments is complete, meaning
   * that all external inputs are properly captured in the recipe.
   */
  arguments?: boolean;
  /**
   * If true, the builder claims that recipe.environment is claimed to be
   * complete.
   */
  environment?: boolean;
  /**
   * If true, the builder claims that materials are complete, usually through
   * some controls to prevent network access. Sometimes called "hermetic".
   */
  materials?: boolean;
}

/**
 * Other properties of the build.
 */
export interface SlsaMetadata {
  /**
   * The timestamp of when the build completed.
   */
  buildFinishedOn?: Date;
  /**
   * Identifies the particular build invocation, which can be useful for
   * finding associated logs or other ad-hoc analysis. The value SHOULD be
   * globally unique, per in-toto Provenance spec.
   */
  buildInvocationId?: string;
  /**
   * The timestamp of when the build started.
   */
  buildStartedOn?: Date;
  /**
   * Indicates that the builder claims certain fields in this message to be
   * complete.
   */
  completeness?: SlsaCompleteness;
  /**
   * If true, the builder claims that running the recipe on materials will
   * produce bit-for-bit identical output.
   */
  reproducible?: boolean;
}

function serializeSlsaMetadata(data: any): SlsaMetadata {
  return {
    ...data,
    buildFinishedOn: data["buildFinishedOn"] !== undefined ? data["buildFinishedOn"].toISOString() : undefined,
    buildStartedOn: data["buildStartedOn"] !== undefined ? data["buildStartedOn"].toISOString() : undefined,
  };
}

function deserializeSlsaMetadata(data: any): SlsaMetadata {
  return {
    ...data,
    buildFinishedOn: data["buildFinishedOn"] !== undefined ? new Date(data["buildFinishedOn"]) : undefined,
    buildStartedOn: data["buildStartedOn"] !== undefined ? new Date(data["buildStartedOn"]) : undefined,
  };
}

export interface SlsaProvenance {
  /**
   * required
   */
  builder?: SlsaBuilder;
  /**
   * The collection of artifacts that influenced the build including sources,
   * dependencies, build tools, base images, and so on. This is considered to be
   * incomplete unless metadata.completeness.materials is true. Unset or null is
   * equivalent to empty.
   */
  materials?: Material[];
  metadata?: SlsaMetadata;
  /**
   * Identifies the configuration used for the build. When combined with
   * materials, this SHOULD fully describe the build, such that re-running this
   * recipe results in bit-for-bit identical output (if the build is
   * reproducible). required
   */
  recipe?: SlsaRecipe;
}

function serializeSlsaProvenance(data: any): SlsaProvenance {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeSlsaMetadata(data["metadata"]) : undefined,
    recipe: data["recipe"] !== undefined ? serializeSlsaRecipe(data["recipe"]) : undefined,
  };
}

function deserializeSlsaProvenance(data: any): SlsaProvenance {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeSlsaMetadata(data["metadata"]) : undefined,
    recipe: data["recipe"] !== undefined ? deserializeSlsaRecipe(data["recipe"]) : undefined,
  };
}

/**
 * See full explanation of fields at slsa.dev/provenance/v0.2.
 */
export interface SlsaProvenanceZeroTwo {
  buildConfig?: {
    [key: string]: any
  };
  builder?: GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder;
  buildType?: string;
  invocation?: GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation;
  materials?: GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial[];
  metadata?: GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata;
}

function serializeSlsaProvenanceZeroTwo(data: any): SlsaProvenanceZeroTwo {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeGrafeasV1SlsaProvenanceZeroTwoSlsaMetadata(data["metadata"]) : undefined,
  };
}

function deserializeSlsaProvenanceZeroTwo(data: any): SlsaProvenanceZeroTwo {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeGrafeasV1SlsaProvenanceZeroTwoSlsaMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Steps taken to build the artifact. For a TaskRun, typically each container
 * corresponds to one step in the recipe.
 */
export interface SlsaRecipe {
  /**
   * Collection of all external inputs that influenced the build on top of
   * recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe
   * type were "make", then this might be the flags passed to make aside from
   * the target, which is captured in recipe.entryPoint. Depending on the recipe
   * Type, the structure may be different.
   */
  arguments?: {
    [key: string]: any
  };
  /**
   * Index in materials containing the recipe steps that are not implied by
   * recipe.type. For example, if the recipe type were "make", then this would
   * point to the source containing the Makefile, not the make program itself.
   * Set to -1 if the recipe doesn't come from a material, as zero is default
   * unset value for int64.
   */
  definedInMaterial?: bigint;
  /**
   * String identifying the entry point into the build. This is often a path to
   * a configuration file and/or a target label within that file. The syntax and
   * meaning are defined by recipe.type. For example, if the recipe type were
   * "make", then this would reference the directory in which to run make as
   * well as which target to use.
   */
  entryPoint?: string;
  /**
   * Any other builder-controlled inputs necessary for correctly evaluating the
   * recipe. Usually only needed for reproducing the build but not evaluated as
   * part of policy. Depending on the recipe Type, the structure may be
   * different.
   */
  environment?: {
    [key: string]: any
  };
  /**
   * URI indicating what type of recipe was performed. It determines the
   * meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and
   * materials.
   */
  type?: string;
}

function serializeSlsaRecipe(data: any): SlsaRecipe {
  return {
    ...data,
    definedInMaterial: data["definedInMaterial"] !== undefined ? String(data["definedInMaterial"]) : undefined,
  };
}

function deserializeSlsaRecipe(data: any): SlsaRecipe {
  return {
    ...data,
    definedInMaterial: data["definedInMaterial"] !== undefined ? BigInt(data["definedInMaterial"]) : undefined,
  };
}

/**
 * Source describes the location of the source used for the build.
 */
export interface Source {
  /**
   * If provided, some of the source code used for the build may be found in
   * these locations, in the case where the source repository had multiple
   * remotes or submodules. This list will not include the context specified in
   * the context field.
   */
  additionalContexts?: SourceContext[];
  /**
   * If provided, the input binary artifacts for the build came from this
   * location.
   */
  artifactStorageSourceUri?: string;
  /**
   * If provided, the source code used for the build came from this location.
   */
  context?: SourceContext;
  /**
   * Hash(es) of the build source, which can be used to verify that the
   * original source integrity was maintained in the build. The keys to this map
   * are file paths used as build source and the values contain the hash values
   * for those files. If the build source came in a single package such as a
   * gzipped tarfile (.tar.gz), the FileHash will be for the single path to that
   * file.
   */
  fileHashes?: {
    [key: string]: FileHashes
  };
}

function serializeSource(data: any): Source {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? Object.fromEntries(Object.entries(data["fileHashes"]).map(([k, v]: [string, any]) => ([k, serializeFileHashes(v)]))) : undefined,
  };
}

function deserializeSource(data: any): Source {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? Object.fromEntries(Object.entries(data["fileHashes"]).map(([k, v]: [string, any]) => ([k, deserializeFileHashes(v)]))) : undefined,
  };
}

/**
 * A SourceContext is a reference to a tree of files. A SourceContext together
 * with a path point to a unique revision of a single file or directory.
 */
export interface SourceContext {
  /**
   * A SourceContext referring to a revision in a Google Cloud Source Repo.
   */
  cloudRepo?: CloudRepoSourceContext;
  /**
   * A SourceContext referring to a Gerrit project.
   */
  gerrit?: GerritSourceContext;
  /**
   * A SourceContext referring to any third party Git repo (e.g., GitHub).
   */
  git?: GitSourceContext;
  /**
   * Labels with user defined metadata.
   */
  labels?: {
    [key: string]: string
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

export interface Subject {
  /**
   * `"": ""` Algorithms can be e.g. sha256, sha512 See
   * https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet
   */
  digest?: {
    [key: string]: string
  };
  name?: string;
}

/**
 * The Upgrade Distribution represents metadata about the Upgrade for each
 * operating system (CPE). Some distributions have additional metadata around
 * updates, classifying them into various categories and severities.
 */
export interface UpgradeDistribution {
  /**
   * The operating system classification of this Upgrade, as specified by the
   * upstream operating system upgrade feed. For Windows the classification is
   * one of the category_ids listed at
   * https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ff357803(v=vs.85)
   */
  classification?: string;
  /**
   * Required - The specific operating system this metadata applies to. See
   * https://cpe.mitre.org/specification/.
   */
  cpeUri?: string;
  /**
   * The cve tied to this Upgrade.
   */
  cve?: string[];
  /**
   * The severity as specified by the upstream operating system.
   */
  severity?: string;
}

/**
 * An Upgrade Occurrence represents that a specific resource_url could install
 * a specific upgrade. This presence is supplied via local sources (i.e. it is
 * present in the mirror and the running system has noticed its availability).
 * For Windows, both distribution and windows_update contain information for the
 * Windows update.
 */
export interface UpgradeOccurrence {
  /**
   * Metadata about the upgrade for available for the specific operating system
   * for the resource_url. This allows efficient filtering, as well as making it
   * easier to use the occurrence.
   */
  distribution?: UpgradeDistribution;
  /**
   * Required for non-Windows OS. The package this Upgrade is for.
   */
  package?: string;
  /**
   * Required for non-Windows OS. The version of the package in a machine +
   * human readable form.
   */
  parsedVersion?: Version;
  /**
   * Required for Windows OS. Represents the metadata about the Windows update.
   */
  windowsUpdate?: WindowsUpdate;
}

function serializeUpgradeOccurrence(data: any): UpgradeOccurrence {
  return {
    ...data,
    windowsUpdate: data["windowsUpdate"] !== undefined ? serializeWindowsUpdate(data["windowsUpdate"]) : undefined,
  };
}

function deserializeUpgradeOccurrence(data: any): UpgradeOccurrence {
  return {
    ...data,
    windowsUpdate: data["windowsUpdate"] !== undefined ? deserializeWindowsUpdate(data["windowsUpdate"]) : undefined,
  };
}

/**
 * Version contains structured information about the version of a package.
 */
export interface Version {
  /**
   * Used to correct mistakes in the version numbering scheme.
   */
  epoch?: number;
  /**
   * Human readable version string. This string is of the form :- and is only
   * set when kind is NORMAL.
   */
  fullName?: string;
  /**
   * Whether this version is specifying part of an inclusive range. Grafeas
   * does not have the capability to specify version ranges; instead we have
   * fields that specify start version and end versions. At times this is
   * insufficient - we also need to specify whether the version is included in
   * the range or is excluded from the range. This boolean is expected to be set
   * to true when the version is included in a range.
   */
  inclusive?: boolean;
  /**
   * Required. Distinguishes between sentinel MIN/MAX versions and normal
   * versions.
   */
  kind?:  | "VERSION_KIND_UNSPECIFIED" | "NORMAL" | "MINIMUM" | "MAXIMUM";
  /**
   * Required only when version kind is NORMAL. The main part of the version
   * name.
   */
  name?: string;
  /**
   * The iteration of the package build from the above version.
   */
  revision?: string;
}

/**
 * An occurrence of a severity vulnerability on a resource.
 */
export interface VulnerabilityOccurrence {
  /**
   * Output only. The CVSS score of this vulnerability. CVSS score is on a
   * scale of 0 - 10 where 0 indicates low severity and 10 indicates high
   * severity.
   */
  cvssScore?: number;
  /**
   * The cvss v2 score for the vulnerability.
   */
  cvssV2?: CVSS;
  /**
   * The cvss v3 score for the vulnerability.
   */
  cvssv3?: CVSS;
  /**
   * Output only. CVSS version used to populate cvss_score and severity.
   */
  cvssVersion?:  | "CVSS_VERSION_UNSPECIFIED" | "CVSS_VERSION_2" | "CVSS_VERSION_3";
  /**
   * The distro assigned severity for this vulnerability when it is available,
   * otherwise this is the note provider assigned severity. When there are
   * multiple PackageIssues for this vulnerability, they can have different
   * effective severities because some might be provided by the distro while
   * others are provided by the language ecosystem for a language pack. For this
   * reason, it is advised to use the effective severity on the PackageIssue
   * level. In the case where multiple PackageIssues have differing effective
   * severities, this field should be the highest severity for any of the
   * PackageIssues.
   */
  effectiveSeverity?:  | "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  /**
   * Output only. Whether at least one of the affected packages has a fix
   * available.
   */
  fixAvailable?: boolean;
  /**
   * Output only. A detailed description of this vulnerability.
   */
  longDescription?: string;
  /**
   * Required. The set of affected locations and their fixes (if available)
   * within the associated resource.
   */
  packageIssue?: PackageIssue[];
  /**
   * Output only. URLs related to this vulnerability.
   */
  relatedUrls?: RelatedUrl[];
  /**
   * Output only. The note provider assigned severity of this vulnerability.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  /**
   * Output only. A one sentence description of this vulnerability.
   */
  shortDescription?: string;
  /**
   * The type of package; whether native or non native (e.g., ruby gems,
   * node.js packages, etc.).
   */
  type?: string;
}

/**
 * Windows Update represents the metadata about the update for the Windows
 * operating system. The fields in this message come from the Windows Update API
 * documented at
 * https://docs.microsoft.com/en-us/windows/win32/api/wuapi/nn-wuapi-iupdate.
 */
export interface WindowsUpdate {
  /**
   * The list of categories to which the update belongs.
   */
  categories?: Category[];
  /**
   * The localized description of the update.
   */
  description?: string;
  /**
   * Required - The unique identifier for the update.
   */
  identity?: Identity;
  /**
   * The Microsoft Knowledge Base article IDs that are associated with the
   * update.
   */
  kbArticleIds?: string[];
  /**
   * The last published timestamp of the update.
   */
  lastPublishedTimestamp?: Date;
  /**
   * The hyperlink to the support information for the update.
   */
  supportUrl?: string;
  /**
   * The localized title of the update.
   */
  title?: string;
}

function serializeWindowsUpdate(data: any): WindowsUpdate {
  return {
    ...data,
    lastPublishedTimestamp: data["lastPublishedTimestamp"] !== undefined ? data["lastPublishedTimestamp"].toISOString() : undefined,
  };
}

function deserializeWindowsUpdate(data: any): WindowsUpdate {
  return {
    ...data,
    lastPublishedTimestamp: data["lastPublishedTimestamp"] !== undefined ? new Date(data["lastPublishedTimestamp"]) : undefined,
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
