// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Container Analysis API Client for Deno
 * ======================================
 * 
 * An implementation of the Grafeas API, which stores, and enables querying and retrieval of critical metadata about all of your software artifacts.
 * 
 * Docs: https://cloud.google.com/container-analysis/api/reference/rest/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * An implementation of the Grafeas API, which stores, and enables querying and
 * retrieval of critical metadata about all of your software artifacts.
 */
export class ContainerAnalysis {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://containeranalysis.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates new notes in batch.
   *
   * @param parent Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the notes are to be created.
   */
  async projectsNotesBatchCreate(parent: string, req: BatchCreateNotesRequest): Promise<BatchCreateNotesResponse> {
    req = serializeBatchCreateNotesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notes:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchCreateNotesResponse(data);
  }

  /**
   * Creates a new note.
   *
   * @param parent Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the note is to be created.
   */
  async projectsNotesCreate(parent: string, req: Note, opts: ProjectsNotesCreateOptions = {}): Promise<Note> {
    req = serializeNote(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notes`);
    if (opts.noteId !== undefined) {
      url.searchParams.append("noteId", String(opts.noteId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeNote(data);
  }

  /**
   * Deletes the specified note.
   *
   * @param name Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`.
   */
  async projectsNotesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified note.
   *
   * @param name Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`.
   */
  async projectsNotesGet(name: string): Promise<Note> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNote(data);
  }

  /**
   * Gets the access control policy for a note or an occurrence resource.
   * Requires `containeranalysis.notes.setIamPolicy` or
   * `containeranalysis.occurrences.setIamPolicy` permission if the resource is
   * a note or occurrence, respectively. The resource takes the format
   * `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and
   * `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsNotesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists notes for the specified project.
   *
   * @param parent Required. The name of the project to list notes for in the form of `projects/[PROJECT_ID]`.
   */
  async projectsNotesList(parent: string, opts: ProjectsNotesListOptions = {}): Promise<ListNotesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/notes`);
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
    return deserializeListNotesResponse(data);
  }

  /**
   * Lists occurrences referencing the specified note. Provider projects can
   * use this method to get all occurrences across consumer projects referencing
   * the specified note.
   *
   * @param name Required. The name of the note to list occurrences for in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`.
   */
  async projectsNotesOccurrencesList(name: string, opts: ProjectsNotesOccurrencesListOptions = {}): Promise<ListNoteOccurrencesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/occurrences`);
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
    return deserializeListNoteOccurrencesResponse(data);
  }

  /**
   * Updates the specified note.
   *
   * @param name Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`.
   */
  async projectsNotesPatch(name: string, req: Note, opts: ProjectsNotesPatchOptions = {}): Promise<Note> {
    req = serializeNote(req);
    opts = serializeProjectsNotesPatchOptions(opts);
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
    return deserializeNote(data);
  }

  /**
   * Sets the access control policy on the specified note or occurrence.
   * Requires `containeranalysis.notes.setIamPolicy` or
   * `containeranalysis.occurrences.setIamPolicy` permission if the resource is
   * a note or an occurrence, respectively. The resource takes the format
   * `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and
   * `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsNotesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns the permissions that a caller has on the specified note or
   * occurrence. Requires list permission on the project (for example,
   * `containeranalysis.notes.list`). The resource takes the format
   * `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and
   * `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsNotesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates new occurrences in batch.
   *
   * @param parent Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrences are to be created.
   */
  async projectsOccurrencesBatchCreate(parent: string, req: BatchCreateOccurrencesRequest): Promise<BatchCreateOccurrencesResponse> {
    req = serializeBatchCreateOccurrencesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/occurrences:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchCreateOccurrencesResponse(data);
  }

  /**
   * Creates a new occurrence.
   *
   * @param parent Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrence is to be created.
   */
  async projectsOccurrencesCreate(parent: string, req: Occurrence): Promise<Occurrence> {
    req = serializeOccurrence(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/occurrences`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOccurrence(data);
  }

  /**
   * Deletes the specified occurrence. For example, use this method to delete
   * an occurrence when the occurrence is no longer applicable for the given
   * resource.
   *
   * @param name Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`.
   */
  async projectsOccurrencesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified occurrence.
   *
   * @param name Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`.
   */
  async projectsOccurrencesGet(name: string): Promise<Occurrence> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOccurrence(data);
  }

  /**
   * Gets the access control policy for a note or an occurrence resource.
   * Requires `containeranalysis.notes.setIamPolicy` or
   * `containeranalysis.occurrences.setIamPolicy` permission if the resource is
   * a note or occurrence, respectively. The resource takes the format
   * `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and
   * `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsOccurrencesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Gets the note attached to the specified occurrence. Consumer projects can
   * use this method to get a note that belongs to a provider project.
   *
   * @param name Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`.
   */
  async projectsOccurrencesGetNotes(name: string): Promise<Note> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/notes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNote(data);
  }

  /**
   * Gets a summary of the number and severity of occurrences.
   *
   * @param parent Required. The name of the project to get a vulnerability summary for in the form of `projects/[PROJECT_ID]`.
   */
  async projectsOccurrencesGetVulnerabilitySummary(parent: string, opts: ProjectsOccurrencesGetVulnerabilitySummaryOptions = {}): Promise<VulnerabilityOccurrencesSummary> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/occurrences:vulnerabilitySummary`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVulnerabilityOccurrencesSummary(data);
  }

  /**
   * Lists occurrences for the specified project.
   *
   * @param parent Required. The name of the project to list occurrences for in the form of `projects/[PROJECT_ID]`.
   */
  async projectsOccurrencesList(parent: string, opts: ProjectsOccurrencesListOptions = {}): Promise<ListOccurrencesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/occurrences`);
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
    return deserializeListOccurrencesResponse(data);
  }

  /**
   * Updates the specified occurrence.
   *
   * @param name Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`.
   */
  async projectsOccurrencesPatch(name: string, req: Occurrence, opts: ProjectsOccurrencesPatchOptions = {}): Promise<Occurrence> {
    req = serializeOccurrence(req);
    opts = serializeProjectsOccurrencesPatchOptions(opts);
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
    return deserializeOccurrence(data);
  }

  /**
   * Sets the access control policy on the specified note or occurrence.
   * Requires `containeranalysis.notes.setIamPolicy` or
   * `containeranalysis.occurrences.setIamPolicy` permission if the resource is
   * a note or an occurrence, respectively. The resource takes the format
   * `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and
   * `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsOccurrencesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns the permissions that a caller has on the specified note or
   * occurrence. Requires list permission on the project (for example,
   * `containeranalysis.notes.list`). The resource takes the format
   * `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and
   * `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsOccurrencesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
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
 * Note kind that represents a logical attestation "role" or "authority". For
 * example, an organization might have one `Authority` for "QA" and one for
 * "build". This note is intended to act strictly as a grouping mechanism for
 * the attached occurrences (Attestations). This grouping mechanism also
 * provides a security boundary, since IAM ACLs gate the ability for a principle
 * to attach an occurrence to a given note. It also provides a single point of
 * lookup to find all attached attestation occurrences, even if they don't all
 * live in the same project.
 */
export interface AttestationNote {
  /**
   * Hint hints at the purpose of the attestation authority.
   */
  hint?: Hint;
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

/**
 * Request to create notes in batch.
 */
export interface BatchCreateNotesRequest {
  /**
   * Required. The notes to create. Max allowed length is 1000.
   */
  notes?: {
    [key: string]: Note
  };
}

function serializeBatchCreateNotesRequest(data: any): BatchCreateNotesRequest {
  return {
    ...data,
    notes: data["notes"] !== undefined ? Object.fromEntries(Object.entries(data["notes"]).map(([k, v]: [string, any]) => ([k, serializeNote(v)]))) : undefined,
  };
}

function deserializeBatchCreateNotesRequest(data: any): BatchCreateNotesRequest {
  return {
    ...data,
    notes: data["notes"] !== undefined ? Object.fromEntries(Object.entries(data["notes"]).map(([k, v]: [string, any]) => ([k, deserializeNote(v)]))) : undefined,
  };
}

/**
 * Response for creating notes in batch.
 */
export interface BatchCreateNotesResponse {
  /**
   * The notes that were created.
   */
  notes?: Note[];
}

function serializeBatchCreateNotesResponse(data: any): BatchCreateNotesResponse {
  return {
    ...data,
    notes: data["notes"] !== undefined ? data["notes"].map((item: any) => (serializeNote(item))) : undefined,
  };
}

function deserializeBatchCreateNotesResponse(data: any): BatchCreateNotesResponse {
  return {
    ...data,
    notes: data["notes"] !== undefined ? data["notes"].map((item: any) => (deserializeNote(item))) : undefined,
  };
}

/**
 * Request to create occurrences in batch.
 */
export interface BatchCreateOccurrencesRequest {
  /**
   * Required. The occurrences to create. Max allowed length is 1000.
   */
  occurrences?: Occurrence[];
}

function serializeBatchCreateOccurrencesRequest(data: any): BatchCreateOccurrencesRequest {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (serializeOccurrence(item))) : undefined,
  };
}

function deserializeBatchCreateOccurrencesRequest(data: any): BatchCreateOccurrencesRequest {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (deserializeOccurrence(item))) : undefined,
  };
}

/**
 * Response for creating occurrences in batch.
 */
export interface BatchCreateOccurrencesResponse {
  /**
   * The occurrences that were created.
   */
  occurrences?: Occurrence[];
}

function serializeBatchCreateOccurrencesResponse(data: any): BatchCreateOccurrencesResponse {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (serializeOccurrence(item))) : undefined,
  };
}

function deserializeBatchCreateOccurrencesResponse(data: any): BatchCreateOccurrencesResponse {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (deserializeOccurrence(item))) : undefined,
  };
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

export interface BuilderConfig {
  id?: string;
}

/**
 * Note holding the version of the provider's builder and the signature of the
 * provenance message in the build details occurrence.
 */
export interface BuildNote {
  /**
   * Required. Immutable. Version of the builder which produced this build.
   */
  builderVersion?: string;
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
 * A step in the build pipeline. Next ID: 20
 */
export interface BuildStep {
  /**
   * Allow this build step to fail without failing the entire build if and only
   * if the exit code is one of the specified codes. If allow_failure is also
   * specified, this field will take precedence.
   */
  allowExitCodes?: number[];
  /**
   * Allow this build step to fail without failing the entire build. If false,
   * the entire build will fail if this step fails. Otherwise, the build will
   * succeed, but this step will still have a failure status. Error information
   * will be reported in the failure_detail field.
   */
  allowFailure?: boolean;
  /**
   * A list of arguments that will be presented to the step when it is started.
   * If the image used to run the step's container has an entrypoint, the `args`
   * are used as arguments to that entrypoint. If the image does not define an
   * entrypoint, the first element in args is used as the entrypoint, and the
   * remainder will be used as arguments.
   */
  args?: string[];
  /**
   * Working directory to use when running this step's container. If this value
   * is a relative path, it is relative to the build's working directory. If
   * this value is absolute, it may be outside the build's working directory, in
   * which case the contents of the path may not be persisted across build step
   * executions, unless a `volume` for that path is specified. If the build
   * specifies a `RepoSource` with `dir` and a step with a `dir`, which
   * specifies an absolute path, the `RepoSource` `dir` is ignored for the
   * step's execution.
   */
  dir?: string;
  /**
   * Entrypoint to be used instead of the build step image's default
   * entrypoint. If unset, the image's default entrypoint is used.
   */
  entrypoint?: string;
  /**
   * A list of environment variable definitions to be used when running a step.
   * The elements are of the form "KEY=VALUE" for the environment variable "KEY"
   * being given the value "VALUE".
   */
  env?: string[];
  /**
   * Output only. Return code from running the step.
   */
  exitCode?: number;
  /**
   * Unique identifier for this build step, used in `wait_for` to reference
   * this build step as a dependency.
   */
  id?: string;
  /**
   * Required. The name of the container image that will run this particular
   * build step. If the image is available in the host's Docker daemon's cache,
   * it will be run directly. If not, the host will attempt to pull the image
   * first, using the builder service account's credentials if necessary. The
   * Docker daemon's cache will already have the latest versions of all of the
   * officially supported build steps
   * ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)).
   * The Docker daemon will also have cached many of the layers for some popular
   * images, like "ubuntu", "debian", but they will be refreshed at the time you
   * attempt to use them. If you built an image in a previous build step, it
   * will be stored in the host's Docker daemon's cache and is available to use
   * as the name for a later build step.
   */
  name?: string;
  /**
   * Output only. Stores timing information for pulling this build step's
   * builder image only.
   */
  pullTiming?: TimeSpan;
  /**
   * A shell script to be executed in the step. When script is provided, the
   * user cannot specify the entrypoint or args.
   */
  script?: string;
  /**
   * A list of environment variables which are encrypted using a Cloud Key
   * Management Service crypto key. These values must be specified in the
   * build's `Secret`.
   */
  secretEnv?: string[];
  /**
   * Output only. Status of the build step. At this time, build step status is
   * only updated on build completion; step status is not updated in real-time
   * as the build progresses.
   */
  status?:  | "STATUS_UNKNOWN" | "PENDING" | "QUEUING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED";
  /**
   * Time limit for executing this build step. If not defined, the step has no
   * time limit and will be allowed to continue to run until either it completes
   * or the build itself times out.
   */
  timeout?: number /* Duration */;
  /**
   * Output only. Stores timing information for executing this build step.
   */
  timing?: TimeSpan;
  /**
   * List of volumes to mount into the build step. Each volume is created as an
   * empty volume prior to execution of the build step. Upon completion of the
   * build, volumes and their contents are discarded. Using a named volume in
   * only one step is not valid as it is indicative of a build request with an
   * incorrect configuration.
   */
  volumes?: Volume[];
  /**
   * The ID(s) of the step(s) that this build step depends on. This build step
   * will not start until all the build steps in `wait_for` have completed
   * successfully. If `wait_for` is empty, this build step will start when all
   * previous build steps in the `Build.Steps` list have completed successfully.
   */
  waitFor?: string[];
}

function serializeBuildStep(data: any): BuildStep {
  return {
    ...data,
    pullTiming: data["pullTiming"] !== undefined ? serializeTimeSpan(data["pullTiming"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    timing: data["timing"] !== undefined ? serializeTimeSpan(data["timing"]) : undefined,
  };
}

function deserializeBuildStep(data: any): BuildStep {
  return {
    ...data,
    pullTiming: data["pullTiming"] !== undefined ? deserializeTimeSpan(data["pullTiming"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    timing: data["timing"] !== undefined ? deserializeTimeSpan(data["timing"]) : undefined,
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
 * A compliance check that is a CIS benchmark.
 */
export interface CisBenchmark {
  profileLevel?: number;
  severity?:  | "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
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

export interface ComplianceNote {
  cisBenchmark?: CisBenchmark;
  /**
   * A description about this compliance check.
   */
  description?: string;
  /**
   * A rationale for the existence of this compliance check.
   */
  rationale?: string;
  /**
   * A description of remediation steps if the compliance check fails.
   */
  remediation?: string;
  /**
   * Serialized scan instructions with a predefined format.
   */
  scanInstructions?: Uint8Array;
  /**
   * The title that identifies this compliance check.
   */
  title?: string;
  /**
   * The OS and config versions the benchmark applies to.
   */
  version?: ComplianceVersion[];
}

function serializeComplianceNote(data: any): ComplianceNote {
  return {
    ...data,
    scanInstructions: data["scanInstructions"] !== undefined ? encodeBase64(data["scanInstructions"]) : undefined,
  };
}

function deserializeComplianceNote(data: any): ComplianceNote {
  return {
    ...data,
    scanInstructions: data["scanInstructions"] !== undefined ? decodeBase64(data["scanInstructions"] as string) : undefined,
  };
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
 * Describes the CIS benchmark version that is applicable to a given OS and os
 * version.
 */
export interface ComplianceVersion {
  /**
   * The name of the document that defines this benchmark, e.g. "CIS
   * Container-Optimized OS".
   */
  benchmarkDocument?: string;
  /**
   * The CPE URI (https://cpe.mitre.org/specification/) this benchmark is
   * applicable to.
   */
  cpeUri?: string;
  /**
   * The version of the benchmark. This is set to the version of the
   * OS-specific CIS document the benchmark is defined in.
   */
  version?: string;
}

/**
 * ApprovalConfig describes configuration for manual approval of a build.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig {
  /**
   * Whether or not approval is needed. If this is set on a build, it will
   * become pending when created, and will need to be explicitly approved to
   * start.
   */
  approvalRequired?: boolean;
}

/**
 * ApprovalResult describes the decision and associated metadata of a manual
 * approval of a build.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult {
  /**
   * Output only. The time when the approval decision was made.
   */
  readonly approvalTime?: Date;
  /**
   * Output only. Email of the user that called the ApproveBuild API to approve
   * or reject a build at the time that the API was called.
   */
  readonly approverAccount?: string;
  /**
   * Optional. An optional comment for this manual approval result.
   */
  comment?: string;
  /**
   * Required. The decision of this manual approval.
   */
  decision?:  | "DECISION_UNSPECIFIED" | "APPROVED" | "REJECTED";
  /**
   * Optional. An optional URL tied to this manual approval result. This field
   * is essentially the same as comment, except that it will be rendered by the
   * UI differently. An example use case is a link to an external job that
   * approved this Build.
   */
  url?: string;
}

/**
 * Artifacts produced by a build that should be uploaded upon successful
 * completion of all build steps.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts {
  /**
   * A list of images to be pushed upon the successful completion of all build
   * steps. The images will be pushed using the builder service account's
   * credentials. The digests of the pushed images will be stored in the Build
   * resource's results field. If any of the images fail to be pushed, the build
   * is marked FAILURE.
   */
  images?: string[];
  /**
   * A list of Maven artifacts to be uploaded to Artifact Registry upon
   * successful completion of all build steps. Artifacts in the workspace
   * matching specified paths globs will be uploaded to the specified Artifact
   * Registry repository using the builder service account's credentials. If any
   * artifacts fail to be pushed, the build is marked FAILURE.
   */
  mavenArtifacts?: ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact[];
  /**
   * A list of objects to be uploaded to Cloud Storage upon successful
   * completion of all build steps. Files in the workspace matching specified
   * paths globs will be uploaded to the specified Cloud Storage location using
   * the builder service account's credentials. The location and generation of
   * the uploaded objects will be stored in the Build resource's results field.
   * If any objects fail to be pushed, the build is marked FAILURE.
   */
  objects?: ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects;
  /**
   * A list of Python packages to be uploaded to Artifact Registry upon
   * successful completion of all build steps. The build service account
   * credentials will be used to perform the upload. If any objects fail to be
   * pushed, the build is marked FAILURE.
   */
  pythonPackages?: ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage[];
}

/**
 * Files in the workspace to upload to Cloud Storage upon successful completion
 * of all build steps.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects {
  /**
   * Cloud Storage bucket and optional object path, in the form
   * "gs://bucket/path/to/somewhere/". (see [Bucket Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   * Files in the workspace matching any path pattern will be uploaded to Cloud
   * Storage with this location as a prefix.
   */
  location?: string;
  /**
   * Path globs used to match files in the build's workspace.
   */
  paths?: string[];
  /**
   * Output only. Stores timing information for pushing all artifact objects.
   */
  readonly timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
}

/**
 * A Maven artifact to upload to Artifact Registry upon successful completion
 * of all build steps.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact {
  /**
   * Maven `artifactId` value used when uploading the artifact to Artifact
   * Registry.
   */
  artifactId?: string;
  /**
   * Maven `groupId` value used when uploading the artifact to Artifact
   * Registry.
   */
  groupId?: string;
  /**
   * Path to an artifact in the build's workspace to be uploaded to Artifact
   * Registry. This can be either an absolute path, e.g.
   * /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from
   * /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar.
   */
  path?: string;
  /**
   * Artifact Registry repository, in the form
   * "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the
   * workspace specified by path will be uploaded to Artifact Registry with this
   * location as a prefix.
   */
  repository?: string;
  /**
   * Maven `version` value used when uploading the artifact to Artifact
   * Registry.
   */
  version?: string;
}

/**
 * Python package to upload to Artifact Registry upon successful completion of
 * all build steps. A package can encapsulate multiple objects to be uploaded to
 * a single repository.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage {
  /**
   * Path globs used to match files in the build's workspace. For Python/
   * Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file.
   */
  paths?: string[];
  /**
   * Artifact Registry repository, in the form
   * "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the
   * workspace matching any path pattern will be uploaded to Artifact Registry
   * with this location as a prefix.
   */
  repository?: string;
}

/**
 * A build resource in the Cloud Build API. At a high level, a `Build`
 * describes where to find source code, how to build it (for example, the
 * builder image to run on the source), and where to store the built artifacts.
 * Fields can include the following variables, which will be expanded when the
 * build is created: - $PROJECT_ID: the project ID of the build. -
 * $PROJECT_NUMBER: the project number of the build. - $LOCATION: the
 * location/region of the build. - $BUILD_ID: the autogenerated ID of the build.
 * - $REPO_NAME: the source repository name specified by RepoSource. -
 * $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag
 * name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA
 * specified by RepoSource or resolved from the specified branch or tag. -
 * $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Build {
  /**
   * Output only. Describes this build's approval configuration, status, and
   * result.
   */
  readonly approval?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval;
  /**
   * Artifacts produced by the build that should be uploaded upon successful
   * completion of all build steps.
   */
  artifacts?: ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts;
  /**
   * Secrets and secret environment variables.
   */
  availableSecrets?: ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets;
  /**
   * Output only. The ID of the `BuildTrigger` that triggered this build, if it
   * was triggered automatically.
   */
  readonly buildTriggerId?: string;
  /**
   * Output only. Time at which the request to create the build was received.
   */
  readonly createTime?: Date;
  /**
   * Output only. Contains information about the build when status=FAILURE.
   */
  readonly failureInfo?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo;
  /**
   * Output only. Time at which execution of the build was finished. The
   * difference between finish_time and start_time is the duration of the
   * build's execution.
   */
  readonly finishTime?: Date;
  /**
   * Output only. Unique identifier of the build.
   */
  readonly id?: string;
  /**
   * A list of images to be pushed upon the successful completion of all build
   * steps. The images are pushed using the builder service account's
   * credentials. The digests of the pushed images will be stored in the `Build`
   * resource's results field. If any of the images fail to be pushed, the build
   * status is marked `FAILURE`.
   */
  images?: string[];
  /**
   * Google Cloud Storage bucket where logs should be written (see [Bucket Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   * Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`.
   */
  logsBucket?: string;
  /**
   * Output only. URL to logs for this build in Google Cloud Console.
   */
  readonly logUrl?: string;
  /**
   * Output only. The 'Build' name with format:
   * `projects/{project}/locations/{location}/builds/{build}`, where {build} is
   * a unique identifier generated by the service.
   */
  readonly name?: string;
  /**
   * Special options for this build.
   */
  options?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions;
  /**
   * Output only. ID of the project.
   */
  readonly projectId?: string;
  /**
   * TTL in queue for this build. If provided and the build is enqueued longer
   * than this value, the build will expire and the build status will be
   * `EXPIRED`. The TTL starts ticking from create_time.
   */
  queueTtl?: number /* Duration */;
  /**
   * Output only. Results of the build.
   */
  readonly results?: ContaineranalysisGoogleDevtoolsCloudbuildV1Results;
  /**
   * Secrets to decrypt using Cloud Key Management Service. Note: Secret
   * Manager is the recommended technique for managing sensitive data with Cloud
   * Build. Use `available_secrets` to configure builds to access secrets from
   * Secret Manager. For instructions, see:
   * https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets
   */
  secrets?: ContaineranalysisGoogleDevtoolsCloudbuildV1Secret[];
  /**
   * IAM service account whose credentials will be used at build runtime. Must
   * be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT
   * can be email address or uniqueId of the service account.
   */
  serviceAccount?: string;
  /**
   * The location of the source files to build.
   */
  source?: ContaineranalysisGoogleDevtoolsCloudbuildV1Source;
  /**
   * Output only. A permanent fixed identifier for source.
   */
  readonly sourceProvenance?: ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance;
  /**
   * Output only. Time at which execution of the build was started.
   */
  readonly startTime?: Date;
  /**
   * Output only. Status of the build.
   */
  readonly status?:  | "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED";
  /**
   * Output only. Customer-readable message about the current status.
   */
  readonly statusDetail?: string;
  /**
   * Required. The operations to be performed on the workspace.
   */
  steps?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep[];
  /**
   * Substitutions data for `Build` resource.
   */
  substitutions?: {
    [key: string]: string
  };
  /**
   * Tags for annotation of a `Build`. These are not docker tags.
   */
  tags?: string[];
  /**
   * Amount of time that this build should be allowed to run, to second
   * granularity. If this amount of time elapses, work on the build will cease
   * and the build status will be `TIMEOUT`. `timeout` starts ticking from
   * `startTime`. Default time is 60 minutes.
   */
  timeout?: number /* Duration */;
  /**
   * Output only. Stores timing information for phases of the build. Valid keys
   * are: * BUILD: time to execute all build steps. * PUSH: time to push all
   * artifacts including docker images and non docker artifacts. * FETCHSOURCE:
   * time to fetch source. * SETUPBUILD: time to set up build. If the build does
   * not specify source or images, these keys will not be included.
   */
  readonly timing?: {
    [key: string]: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan
  };
  /**
   * Output only. Non-fatal problems encountered during the execution of the
   * build.
   */
  readonly warnings?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning[];
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1Build(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Build {
  return {
    ...data,
    availableSecrets: data["availableSecrets"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1Secrets(data["availableSecrets"]) : undefined,
    options: data["options"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions(data["options"]) : undefined,
    queueTtl: data["queueTtl"] !== undefined ? data["queueTtl"] : undefined,
    secrets: data["secrets"] !== undefined ? data["secrets"].map((item: any) => (serializeContaineranalysisGoogleDevtoolsCloudbuildV1Secret(item))) : undefined,
    source: data["source"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1Source(data["source"]) : undefined,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (serializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep(item))) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Build(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Build {
  return {
    ...data,
    availableSecrets: data["availableSecrets"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Secrets(data["availableSecrets"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    options: data["options"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions(data["options"]) : undefined,
    queueTtl: data["queueTtl"] !== undefined ? data["queueTtl"] : undefined,
    results: data["results"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Results(data["results"]) : undefined,
    secrets: data["secrets"] !== undefined ? data["secrets"].map((item: any) => (deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Secret(item))) : undefined,
    source: data["source"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Source(data["source"]) : undefined,
    sourceProvenance: data["sourceProvenance"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance(data["sourceProvenance"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (deserializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep(item))) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    timing: data["timing"] !== undefined ? Object.fromEntries(Object.entries(data["timing"]).map(([k, v]: [string, any]) => ([k, deserializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(v)]))) : undefined,
  };
}

/**
 * BuildApproval describes a build's approval configuration, state, and result.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval {
  /**
   * Output only. Configuration for manual approval of this build.
   */
  readonly config?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig;
  /**
   * Output only. Result of manual approval for this Build.
   */
  readonly result?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult;
  /**
   * Output only. The state of this build's approval.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
}

/**
 * A fatal problem encountered during the execution of the build.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo {
  /**
   * Explains the failure issue in more detail using hard-coded text.
   */
  detail?: string;
  /**
   * The name of the failure.
   */
  type?:  | "FAILURE_TYPE_UNSPECIFIED" | "PUSH_FAILED" | "PUSH_IMAGE_NOT_FOUND" | "PUSH_NOT_AUTHORIZED" | "LOGGING_FAILURE" | "USER_BUILD_STEP" | "FETCH_SOURCE_FAILED";
}

/**
 * Optional arguments to enable specific features of builds.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions {
  /**
   * Requested disk size for the VM that runs the build. Note that this is
   * *NOT* "disk free"; some of the space will be used by the operating system
   * and build utilities. Also note that this is the minimum disk size that will
   * be allocated for the build -- the build may run with a larger disk than
   * requested. At present, the maximum disk size is 2000GB; builds that request
   * more than the maximum are rejected with an error.
   */
  diskSizeGb?: bigint;
  /**
   * Option to specify whether or not to apply bash style string operations to
   * the substitutions. NOTE: this is always enabled for triggered builds and
   * cannot be overridden in the build configuration file.
   */
  dynamicSubstitutions?: boolean;
  /**
   * A list of global environment variable definitions that will exist for all
   * build steps in this build. If a variable is defined in both globally and in
   * a build step, the variable will use the build step value. The elements are
   * of the form "KEY=VALUE" for the environment variable "KEY" being given the
   * value "VALUE".
   */
  env?: string[];
  /**
   * Option to specify the logging mode, which determines if and where build
   * logs are stored.
   */
  logging?:  | "LOGGING_UNSPECIFIED" | "LEGACY" | "GCS_ONLY" | "STACKDRIVER_ONLY" | "CLOUD_LOGGING_ONLY" | "NONE";
  /**
   * Option to define build log streaming behavior to Google Cloud Storage.
   */
  logStreamingOption?:  | "STREAM_DEFAULT" | "STREAM_ON" | "STREAM_OFF";
  /**
   * Compute Engine machine type on which to run the build.
   */
  machineType?:  | "UNSPECIFIED" | "N1_HIGHCPU_8" | "N1_HIGHCPU_32" | "E2_HIGHCPU_8" | "E2_HIGHCPU_32";
  /**
   * Optional. Specification for execution on a `WorkerPool`. See [running
   * builds in a private
   * pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool)
   * for more information.
   */
  pool?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption;
  /**
   * Requested verifiability options.
   */
  requestedVerifyOption?:  | "NOT_VERIFIED" | "VERIFIED";
  /**
   * A list of global environment variables, which are encrypted using a Cloud
   * Key Management Service crypto key. These values must be specified in the
   * build's `Secret`. These variables will be available to all build steps in
   * this build.
   */
  secretEnv?: string[];
  /**
   * Requested hash for SourceProvenance.
   */
  sourceProvenanceHash?:  | "NONE" | "SHA256" | "MD5"[];
  /**
   * Option to specify behavior when there is an error in the substitution
   * checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and
   * cannot be overridden in the build configuration file.
   */
  substitutionOption?:  | "MUST_MATCH" | "ALLOW_LOOSE";
  /**
   * Global list of volumes to mount for ALL build steps Each volume is created
   * as an empty volume prior to starting the build process. Upon completion of
   * the build, volumes and their contents are discarded. Global volume names
   * and paths cannot conflict with the volumes defined a build step. Using a
   * global volume in a build with only one step is not valid as it is
   * indicative of a build request with an incorrect configuration.
   */
  volumes?: ContaineranalysisGoogleDevtoolsCloudbuildV1Volume[];
  /**
   * This field deprecated; please use `pool.name` instead.
   */
  workerPool?: string;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions {
  return {
    ...data,
    diskSizeGb: data["diskSizeGb"] !== undefined ? String(data["diskSizeGb"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions {
  return {
    ...data,
    diskSizeGb: data["diskSizeGb"] !== undefined ? BigInt(data["diskSizeGb"]) : undefined,
  };
}

/**
 * Details about how a build should be executed on a `WorkerPool`. See [running
 * builds in a private
 * pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool)
 * for more information.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption {
  /**
   * The `WorkerPool` resource to execute the build on. You must have
   * `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format
   * projects/{project}/locations/{location}/workerPools/{workerPoolId}
   */
  name?: string;
}

/**
 * A step in the build pipeline.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep {
  /**
   * Allow this build step to fail without failing the entire build if and only
   * if the exit code is one of the specified codes. If allow_failure is also
   * specified, this field will take precedence.
   */
  allowExitCodes?: number[];
  /**
   * Allow this build step to fail without failing the entire build. If false,
   * the entire build will fail if this step fails. Otherwise, the build will
   * succeed, but this step will still have a failure status. Error information
   * will be reported in the failure_detail field.
   */
  allowFailure?: boolean;
  /**
   * A list of arguments that will be presented to the step when it is started.
   * If the image used to run the step's container has an entrypoint, the `args`
   * are used as arguments to that entrypoint. If the image does not define an
   * entrypoint, the first element in args is used as the entrypoint, and the
   * remainder will be used as arguments.
   */
  args?: string[];
  /**
   * Working directory to use when running this step's container. If this value
   * is a relative path, it is relative to the build's working directory. If
   * this value is absolute, it may be outside the build's working directory, in
   * which case the contents of the path may not be persisted across build step
   * executions, unless a `volume` for that path is specified. If the build
   * specifies a `RepoSource` with `dir` and a step with a `dir`, which
   * specifies an absolute path, the `RepoSource` `dir` is ignored for the
   * step's execution.
   */
  dir?: string;
  /**
   * Entrypoint to be used instead of the build step image's default
   * entrypoint. If unset, the image's default entrypoint is used.
   */
  entrypoint?: string;
  /**
   * A list of environment variable definitions to be used when running a step.
   * The elements are of the form "KEY=VALUE" for the environment variable "KEY"
   * being given the value "VALUE".
   */
  env?: string[];
  /**
   * Output only. Return code from running the step.
   */
  readonly exitCode?: number;
  /**
   * Unique identifier for this build step, used in `wait_for` to reference
   * this build step as a dependency.
   */
  id?: string;
  /**
   * Required. The name of the container image that will run this particular
   * build step. If the image is available in the host's Docker daemon's cache,
   * it will be run directly. If not, the host will attempt to pull the image
   * first, using the builder service account's credentials if necessary. The
   * Docker daemon's cache will already have the latest versions of all of the
   * officially supported build steps
   * ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)).
   * The Docker daemon will also have cached many of the layers for some popular
   * images, like "ubuntu", "debian", but they will be refreshed at the time you
   * attempt to use them. If you built an image in a previous build step, it
   * will be stored in the host's Docker daemon's cache and is available to use
   * as the name for a later build step.
   */
  name?: string;
  /**
   * Output only. Stores timing information for pulling this build step's
   * builder image only.
   */
  readonly pullTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /**
   * A shell script to be executed in the step. When script is provided, the
   * user cannot specify the entrypoint or args.
   */
  script?: string;
  /**
   * A list of environment variables which are encrypted using a Cloud Key
   * Management Service crypto key. These values must be specified in the
   * build's `Secret`.
   */
  secretEnv?: string[];
  /**
   * Output only. Status of the build step. At this time, build step status is
   * only updated on build completion; step status is not updated in real-time
   * as the build progresses.
   */
  readonly status?:  | "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED";
  /**
   * Time limit for executing this build step. If not defined, the step has no
   * time limit and will be allowed to continue to run until either it completes
   * or the build itself times out.
   */
  timeout?: number /* Duration */;
  /**
   * Output only. Stores timing information for executing this build step.
   */
  readonly timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /**
   * List of volumes to mount into the build step. Each volume is created as an
   * empty volume prior to execution of the build step. Upon completion of the
   * build, volumes and their contents are discarded. Using a named volume in
   * only one step is not valid as it is indicative of a build request with an
   * incorrect configuration.
   */
  volumes?: ContaineranalysisGoogleDevtoolsCloudbuildV1Volume[];
  /**
   * The ID(s) of the step(s) that this build step depends on. This build step
   * will not start until all the build steps in `wait_for` have completed
   * successfully. If `wait_for` is empty, this build step will start when all
   * previous build steps in the `Build.Steps` list have completed successfully.
   */
  waitFor?: string[];
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep {
  return {
    ...data,
    pullTiming: data["pullTiming"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data["pullTiming"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    timing: data["timing"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data["timing"]) : undefined,
  };
}

/**
 * A non-fatal problem encountered during the execution of the build.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning {
  /**
   * The priority for this warning.
   */
  priority?:  | "PRIORITY_UNSPECIFIED" | "INFO" | "WARNING" | "ALERT";
  /**
   * Explanation of the warning generated.
   */
  text?: string;
}

/**
 * An image built by the pipeline.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage {
  /**
   * Docker Registry 2.0 digest.
   */
  digest?: string;
  /**
   * Name used to push the container image to Google Container Registry, as
   * presented to `docker push`.
   */
  name?: string;
  /**
   * Output only. Stores timing information for pushing the specified image.
   */
  readonly pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
}

/**
 * Container message for hashes of byte content of files, used in
 * SourceProvenance messages to verify integrity of source input to the build.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes {
  /**
   * Collection of file hashes.
   */
  fileHash?: ContaineranalysisGoogleDevtoolsCloudbuildV1Hash[];
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (serializeContaineranalysisGoogleDevtoolsCloudbuildV1Hash(item))) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Hash(item))) : undefined,
  };
}

/**
 * Container message for hash values.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Hash {
  /**
   * The type of hash that was performed.
   */
  type?:  | "NONE" | "SHA256" | "MD5";
  /**
   * The hash value.
   */
  value?: Uint8Array;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1Hash(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Hash {
  return {
    ...data,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Hash(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Hash {
  return {
    ...data,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

/**
 * Pairs a set of secret environment variables mapped to encrypted values with
 * the Cloud KMS key to use to decrypt the value.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret {
  /**
   * Map of environment variable name to its encrypted value. Secret
   * environment variables must be unique across all of a build's secrets, and
   * must be used by at least one build step. Values can be at most 64 KB in
   * size. There can be at most 100 secret values across all of a build's
   * secrets.
   */
  envMap?: {
    [key: string]: Uint8Array
  };
  /**
   * Resource name of Cloud KMS crypto key to decrypt the encrypted value. In
   * format: projects/*\/locations/*\/keyRings/*\/cryptoKeys/*
   */
  kmsKeyName?: string;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret {
  return {
    ...data,
    envMap: data["envMap"] !== undefined ? Object.fromEntries(Object.entries(data["envMap"]).map(([k, v]: [string, any]) => ([k, encodeBase64(v)]))) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret {
  return {
    ...data,
    envMap: data["envMap"] !== undefined ? Object.fromEntries(Object.entries(data["envMap"]).map(([k, v]: [string, any]) => ([k, decodeBase64(v as string)]))) : undefined,
  };
}

/**
 * Location of the source in a Google Cloud Source Repository.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource {
  /**
   * Regex matching branches to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  branchName?: string;
  /**
   * Explicit commit SHA to build.
   */
  commitSha?: string;
  /**
   * Directory, relative to the source root, in which to run the build. This
   * must be a relative path. If a step's `dir` is specified and is an absolute
   * path, this value is ignored for that step's execution.
   */
  dir?: string;
  /**
   * Only trigger a build if the revision regex does NOT match the revision
   * regex.
   */
  invertRegex?: boolean;
  /**
   * ID of the project that owns the Cloud Source Repository. If omitted, the
   * project ID requesting the build is assumed.
   */
  projectId?: string;
  /**
   * Name of the Cloud Source Repository.
   */
  repoName?: string;
  /**
   * Substitutions to use in a triggered build. Should only be used with
   * RunBuildTrigger
   */
  substitutions?: {
    [key: string]: string
  };
  /**
   * Regex matching tags to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  tagName?: string;
}

/**
 * Artifacts created by the build pipeline.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Results {
  /**
   * Path to the artifact manifest for non-container artifacts uploaded to
   * Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage.
   */
  artifactManifest?: string;
  /**
   * Time to push all non-container artifacts to Cloud Storage.
   */
  artifactTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /**
   * List of build step digests, in the order corresponding to build step
   * indices.
   */
  buildStepImages?: string[];
  /**
   * List of build step outputs, produced by builder images, in the order
   * corresponding to build step indices. [Cloud
   * Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can
   * produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first
   * 4KB of data is stored.
   */
  buildStepOutputs?: Uint8Array[];
  /**
   * Container images that were built as a part of the build.
   */
  images?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage[];
  /**
   * Maven artifacts uploaded to Artifact Registry at the end of the build.
   */
  mavenArtifacts?: ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact[];
  /**
   * Number of non-container artifacts uploaded to Cloud Storage. Only
   * populated when artifacts are uploaded to Cloud Storage.
   */
  numArtifacts?: bigint;
  /**
   * Python artifacts uploaded to Artifact Registry at the end of the build.
   */
  pythonPackages?: ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage[];
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1Results(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Results {
  return {
    ...data,
    artifactTiming: data["artifactTiming"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data["artifactTiming"]) : undefined,
    buildStepOutputs: data["buildStepOutputs"] !== undefined ? data["buildStepOutputs"].map((item: any) => (encodeBase64(item))) : undefined,
    mavenArtifacts: data["mavenArtifacts"] !== undefined ? data["mavenArtifacts"].map((item: any) => (serializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact(item))) : undefined,
    numArtifacts: data["numArtifacts"] !== undefined ? String(data["numArtifacts"]) : undefined,
    pythonPackages: data["pythonPackages"] !== undefined ? data["pythonPackages"].map((item: any) => (serializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage(item))) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Results(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Results {
  return {
    ...data,
    artifactTiming: data["artifactTiming"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data["artifactTiming"]) : undefined,
    buildStepOutputs: data["buildStepOutputs"] !== undefined ? data["buildStepOutputs"].map((item: any) => (decodeBase64(item as string))) : undefined,
    mavenArtifacts: data["mavenArtifacts"] !== undefined ? data["mavenArtifacts"].map((item: any) => (deserializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact(item))) : undefined,
    numArtifacts: data["numArtifacts"] !== undefined ? BigInt(data["numArtifacts"]) : undefined,
    pythonPackages: data["pythonPackages"] !== undefined ? data["pythonPackages"].map((item: any) => (deserializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage(item))) : undefined,
  };
}

/**
 * Pairs a set of secret environment variables containing encrypted values with
 * the Cloud KMS key to use to decrypt the value. Note: Use `kmsKeyName` with
 * `available_secrets` instead of using `kmsKeyName` with `secret`. For
 * instructions see:
 * https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-credentials.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secret {
  /**
   * Cloud KMS key name to use to decrypt these envs.
   */
  kmsKeyName?: string;
  /**
   * Map of environment variable name to its encrypted value. Secret
   * environment variables must be unique across all of a build's secrets, and
   * must be used by at least one build step. Values can be at most 64 KB in
   * size. There can be at most 100 secret values across all of a build's
   * secrets.
   */
  secretEnv?: {
    [key: string]: Uint8Array
  };
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1Secret(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Secret {
  return {
    ...data,
    secretEnv: data["secretEnv"] !== undefined ? Object.fromEntries(Object.entries(data["secretEnv"]).map(([k, v]: [string, any]) => ([k, encodeBase64(v)]))) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Secret(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Secret {
  return {
    ...data,
    secretEnv: data["secretEnv"] !== undefined ? Object.fromEntries(Object.entries(data["secretEnv"]).map(([k, v]: [string, any]) => ([k, decodeBase64(v as string)]))) : undefined,
  };
}

/**
 * Pairs a secret environment variable with a SecretVersion in Secret Manager.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret {
  /**
   * Environment variable name to associate with the secret. Secret environment
   * variables must be unique across all of a build's secrets, and must be used
   * by at least one build step.
   */
  env?: string;
  /**
   * Resource name of the SecretVersion. In format:
   * projects/*\/secrets/*\/versions/*
   */
  versionName?: string;
}

/**
 * Secrets and secret environment variables.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets {
  /**
   * Secrets encrypted with KMS key and the associated secret environment
   * variable.
   */
  inline?: ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret[];
  /**
   * Secrets in Secret Manager and associated secret environment variable.
   */
  secretManager?: ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret[];
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1Secrets(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets {
  return {
    ...data,
    inline: data["inline"] !== undefined ? data["inline"].map((item: any) => (serializeContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret(item))) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Secrets(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets {
  return {
    ...data,
    inline: data["inline"] !== undefined ? data["inline"].map((item: any) => (deserializeContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret(item))) : undefined,
  };
}

/**
 * Location of the source in a supported storage service.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Source {
  /**
   * If provided, get the source from this location in a Cloud Source
   * Repository.
   */
  repoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
  /**
   * If provided, get the source from this location in Google Cloud Storage.
   */
  storageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
  /**
   * If provided, get the source from this manifest in Google Cloud Storage.
   * This feature is in Preview; see description
   * [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).
   */
  storageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1Source(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Source {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource(data["storageSource"]) : undefined,
    storageSourceManifest: data["storageSourceManifest"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest(data["storageSourceManifest"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1Source(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1Source {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource(data["storageSource"]) : undefined,
    storageSourceManifest: data["storageSourceManifest"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest(data["storageSourceManifest"]) : undefined,
  };
}

/**
 * Provenance of the source. Ways to find the original source, or verify that
 * some source was used for this build.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance {
  /**
   * Output only. Hash(es) of the build source, which can be used to verify
   * that the original source integrity was maintained in the build. Note that
   * `FileHashes` will only be populated if `BuildOptions` has requested a
   * `SourceProvenanceHash`. The keys to this map are file paths used as build
   * source and the values contain the hash values for those files. If the build
   * source came in a single package such as a gzipped tarfile (`.tar.gz`), the
   * `FileHash` will be for the single path to that file.
   */
  readonly fileHashes?: {
    [key: string]: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes
  };
  /**
   * A copy of the build's `source.repo_source`, if exists, with any revisions
   * resolved.
   */
  resolvedRepoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
  /**
   * A copy of the build's `source.storage_source`, if exists, with any
   * generations resolved.
   */
  resolvedStorageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
  /**
   * A copy of the build's `source.storage_source_manifest`, if exists, with
   * any revisions resolved. This feature is in Preview.
   */
  resolvedStorageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance {
  return {
    ...data,
    resolvedStorageSource: data["resolvedStorageSource"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource(data["resolvedStorageSource"]) : undefined,
    resolvedStorageSourceManifest: data["resolvedStorageSourceManifest"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest(data["resolvedStorageSourceManifest"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? Object.fromEntries(Object.entries(data["fileHashes"]).map(([k, v]: [string, any]) => ([k, deserializeContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes(v)]))) : undefined,
    resolvedStorageSource: data["resolvedStorageSource"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource(data["resolvedStorageSource"]) : undefined,
    resolvedStorageSourceManifest: data["resolvedStorageSourceManifest"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest(data["resolvedStorageSourceManifest"]) : undefined,
  };
}

/**
 * Location of the source in an archive file in Google Cloud Storage.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource {
  /**
   * Google Cloud Storage bucket containing the source (see [Bucket Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   */
  bucket?: string;
  /**
   * Google Cloud Storage generation for the object. If the generation is
   * omitted, the latest generation will be used.
   */
  generation?: bigint;
  /**
   * Google Cloud Storage object containing the source. This object must be a
   * zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to
   * build.
   */
  object?: string;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Location of the source manifest in Google Cloud Storage. This feature is in
 * Preview; see description
 * [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest {
  /**
   * Google Cloud Storage bucket containing the source manifest (see [Bucket
   * Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   */
  bucket?: string;
  /**
   * Google Cloud Storage generation for the object. If the generation is
   * omitted, the latest generation will be used.
   */
  generation?: bigint;
  /**
   * Google Cloud Storage object containing the source manifest. This object
   * must be a JSON file.
   */
  object?: string;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Start and end times for a build execution phase.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan {
  /**
   * End of time span.
   */
  endTime?: Date;
  /**
   * Start of time span.
   */
  startTime?: Date;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A Maven artifact uploaded using the MavenArtifact directive.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact {
  /**
   * Hash types and values of the Maven Artifact.
   */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /**
   * Output only. Stores timing information for pushing the specified artifact.
   */
  readonly pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /**
   * URI of the uploaded artifact.
   */
  uri?: string;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes(data["fileHashes"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes(data["fileHashes"]) : undefined,
    pushTiming: data["pushTiming"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data["pushTiming"]) : undefined,
  };
}

/**
 * Artifact uploaded using the PythonPackage directive.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage {
  /**
   * Hash types and values of the Python Artifact.
   */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /**
   * Output only. Stores timing information for pushing the specified artifact.
   */
  readonly pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /**
   * URI of the uploaded artifact.
   */
  uri?: string;
}

function serializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? serializeContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes(data["fileHashes"]) : undefined,
  };
}

function deserializeContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage(data: any): ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes(data["fileHashes"]) : undefined,
    pushTiming: data["pushTiming"] !== undefined ? deserializeContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan(data["pushTiming"]) : undefined,
  };
}

/**
 * Volume describes a Docker container volume which is mounted into build steps
 * in order to persist files across build step execution.
 */
export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Volume {
  /**
   * Name of the volume to mount. Volume names must be unique per build step
   * and must be valid names for Docker volumes. Each named volume must be used
   * by at least two build steps.
   */
  name?: string;
  /**
   * Path at which to mount the volume. Paths must be absolute and cannot
   * conflict with other volume paths on the same build step or with certain
   * reserved volume paths.
   */
  path?: string;
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
 * Common Vulnerability Scoring System version 3. For details, see
 * https://www.first.org/cvss/specification-document
 */
export interface CVSSv3 {
  attackComplexity?:  | "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH";
  /**
   * Base Metrics Represents the intrinsic characteristics of a vulnerability
   * that are constant over time and across user environments.
   */
  attackVector?:  | "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL";
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
 * An artifact that can be deployed in some runtime.
 */
export interface DeploymentNote {
  /**
   * Required. Resource URI for the artifact being deployed.
   */
  resourceUri?: string[];
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
 * A detail for a distro and package affected by this vulnerability and its
 * associated fix (if one is available).
 */
export interface Detail {
  /**
   * Required. The [CPE URI](https://cpe.mitre.org/specification/) this
   * vulnerability affects.
   */
  affectedCpeUri?: string;
  /**
   * Required. The package this vulnerability affects.
   */
  affectedPackage?: string;
  /**
   * The version number at the end of an interval in which this vulnerability
   * exists. A vulnerability can affect a package between version numbers that
   * are disjoint sets of intervals (example: [1.0.0-1.1.0], [2.4.6-2.4.8] and
   * [4.5.6-4.6.8]) each of which will be represented in its own Detail. If a
   * specific affected version is provided by a vulnerability database,
   * affected_version_start and affected_version_end will be the same in that
   * Detail.
   */
  affectedVersionEnd?: Version;
  /**
   * The version number at the start of an interval in which this vulnerability
   * exists. A vulnerability can affect a package between version numbers that
   * are disjoint sets of intervals (example: [1.0.0-1.1.0], [2.4.6-2.4.8] and
   * [4.5.6-4.6.8]) each of which will be represented in its own Detail. If a
   * specific affected version is provided by a vulnerability database,
   * affected_version_start and affected_version_end will be the same in that
   * Detail.
   */
  affectedVersionStart?: Version;
  /**
   * A vendor-specific description of this vulnerability.
   */
  description?: string;
  /**
   * The distro recommended [CPE URI](https://cpe.mitre.org/specification/) to
   * update to that contains a fix for this vulnerability. It is possible for
   * this to be different from the affected_cpe_uri.
   */
  fixedCpeUri?: string;
  /**
   * The distro recommended package to update to that contains a fix for this
   * vulnerability. It is possible for this to be different from the
   * affected_package.
   */
  fixedPackage?: string;
  /**
   * The distro recommended version to update to that contains a fix for this
   * vulnerability. Setting this to VersionKind.MAXIMUM means no such version is
   * yet available.
   */
  fixedVersion?: Version;
  /**
   * Whether this detail is obsolete. Occurrences are expected not to point to
   * obsolete details.
   */
  isObsolete?: boolean;
  /**
   * The type of package; whether native or non native (e.g., ruby gems,
   * node.js packages, etc.).
   */
  packageType?: string;
  /**
   * The distro assigned severity of this vulnerability.
   */
  severityName?: string;
  /**
   * The source from which the information in this Detail was obtained.
   */
  source?: string;
  /**
   * The time this information was last changed at the source. This is an
   * upstream timestamp from the underlying information source - e.g. Ubuntu
   * security tracker.
   */
  sourceUpdateTime?: Date;
  /**
   * The name of the vendor of the product.
   */
  vendor?: string;
}

function serializeDetail(data: any): Detail {
  return {
    ...data,
    sourceUpdateTime: data["sourceUpdateTime"] !== undefined ? data["sourceUpdateTime"].toISOString() : undefined,
  };
}

function deserializeDetail(data: any): Detail {
  return {
    ...data,
    sourceUpdateTime: data["sourceUpdateTime"] !== undefined ? new Date(data["sourceUpdateTime"]) : undefined,
  };
}

/**
 * Digest information.
 */
export interface Digest {
  /**
   * `SHA1`, `SHA512` etc.
   */
  algo?: string;
  /**
   * Value of the digest.
   */
  digestBytes?: Uint8Array;
}

function serializeDigest(data: any): Digest {
  return {
    ...data,
    digestBytes: data["digestBytes"] !== undefined ? encodeBase64(data["digestBytes"]) : undefined,
  };
}

function deserializeDigest(data: any): Digest {
  return {
    ...data,
    digestBytes: data["digestBytes"] !== undefined ? decodeBase64(data["digestBytes"] as string) : undefined,
  };
}

/**
 * A note that indicates a type of analysis a provider would perform. This note
 * exists in a provider's project. A `Discovery` occurrence is created in a
 * consumer's project at the start of analysis.
 */
export interface DiscoveryNote {
  /**
   * Required. Immutable. The kind of analysis that is handled by this
   * discovery.
   */
  analysisKind?:  | "NOTE_KIND_UNSPECIFIED" | "VULNERABILITY" | "BUILD" | "IMAGE" | "PACKAGE" | "DEPLOYMENT" | "DISCOVERY" | "ATTESTATION" | "UPGRADE" | "COMPLIANCE" | "DSSE_ATTESTATION";
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
 * This represents a particular channel of distribution for a given package.
 * E.g., Debian's jessie-backports dpkg mirror.
 */
export interface Distribution {
  /**
   * The CPU architecture for which packages in this distribution channel were
   * built.
   */
  architecture?:  | "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64";
  /**
   * Required. The cpe_uri in [CPE
   * format](https://cpe.mitre.org/specification/) denoting the package manager
   * version distributing a package.
   */
  cpeUri?: string;
  /**
   * The distribution channel-specific description of this package.
   */
  description?: string;
  /**
   * The latest available version of this package in this distribution channel.
   */
  latestVersion?: Version;
  /**
   * A freeform string denoting the maintainer of this package.
   */
  maintainer?: string;
  /**
   * The distribution channel-specific homepage for this package.
   */
  url?: string;
}

export interface DSSEAttestationNote {
  /**
   * DSSEHint hints at the purpose of the attestation authority.
   */
  hint?: DSSEHint;
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
 * This submessage provides human-readable hints about the purpose of the
 * authority. Because the name of a note acts as its resource reference, it is
 * important to disambiguate the canonical name of the Note (which might be a
 * UUID for security purposes) from "readable" names more suitable for debug
 * output. Note that these hints should not be used to look up authorities in
 * security sensitive contexts, such as when looking up attestations to verify.
 */
export interface DSSEHint {
  /**
   * Required. The human readable name of this attestation authority, for
   * example "cloudbuild-prod".
   */
  humanReadableName?: string;
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
 * Per resource and severity counts of fixable and total vulnerabilities.
 */
export interface FixableTotalByDigest {
  /**
   * The number of fixable vulnerabilities associated with this resource.
   */
  fixableCount?: bigint;
  /**
   * The affected resource.
   */
  resourceUri?: string;
  /**
   * The severity for this count. SEVERITY_UNSPECIFIED indicates total across
   * all severities.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  /**
   * The total number of vulnerabilities associated with this resource.
   */
  totalCount?: bigint;
}

function serializeFixableTotalByDigest(data: any): FixableTotalByDigest {
  return {
    ...data,
    fixableCount: data["fixableCount"] !== undefined ? String(data["fixableCount"]) : undefined,
    totalCount: data["totalCount"] !== undefined ? String(data["totalCount"]) : undefined,
  };
}

function deserializeFixableTotalByDigest(data: any): FixableTotalByDigest {
  return {
    ...data,
    fixableCount: data["fixableCount"] !== undefined ? BigInt(data["fixableCount"]) : undefined,
    totalCount: data["totalCount"] !== undefined ? BigInt(data["totalCount"]) : undefined,
  };
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
 * Request message for `GetIamPolicy` method.
 */
export interface GetIamPolicyRequest {
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GetPolicyOptions;
}

/**
 * Encapsulates settings provided to GetIamPolicy.
 */
export interface GetPolicyOptions {
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
  requestedPolicyVersion?: number;
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
 * Metadata for all operations used and required for all operations that
 * created by Container Analysis Providers
 */
export interface GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata {
  /**
   * Output only. The time this operation was created.
   */
  createTime?: Date;
  /**
   * Output only. The time that this operation was marked completed or failed.
   */
  endTime?: Date;
}

function serializeGoogleDevtoolsContaineranalysisV1alpha1OperationMetadata(data: any): GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleDevtoolsContaineranalysisV1alpha1OperationMetadata(data: any): GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
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
 * This submessage provides human-readable hints about the purpose of the
 * authority. Because the name of a note acts as its resource reference, it is
 * important to disambiguate the canonical name of the Note (which might be a
 * UUID for security purposes) from "readable" names more suitable for debug
 * output. Note that these hints should not be used to look up authorities in
 * security sensitive contexts, such as when looking up attestations to verify.
 */
export interface Hint {
  /**
   * Required. The human readable name of this attestation authority, for
   * example "qa".
   */
  humanReadableName?: string;
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
 * Basis describes the base image portion (Note) of the DockerImage
 * relationship. Linked occurrences are derived from this or an equivalent image
 * via: FROM Or an equivalent reference, e.g., a tag of the resource_url.
 */
export interface ImageNote {
  /**
   * Required. Immutable. The fingerprint of the base image.
   */
  fingerprint?: Fingerprint;
  /**
   * Required. Immutable. The resource_url for the resource representing the
   * basis of associated occurrence images.
   */
  resourceUrl?: string;
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

export interface KnowledgeBase {
  /**
   * The KB name (generally of the form KB[0-9]+ (e.g., KB123456)).
   */
  name?: string;
  /**
   * A link to the KB in the [Windows update catalog]
   * (https://www.catalog.update.microsoft.com/).
   */
  url?: string;
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
 * Response for listing occurrences for a note.
 */
export interface ListNoteOccurrencesResponse {
  /**
   * Token to provide to skip to a particular spot in the list.
   */
  nextPageToken?: string;
  /**
   * The occurrences attached to the specified note.
   */
  occurrences?: Occurrence[];
}

function serializeListNoteOccurrencesResponse(data: any): ListNoteOccurrencesResponse {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (serializeOccurrence(item))) : undefined,
  };
}

function deserializeListNoteOccurrencesResponse(data: any): ListNoteOccurrencesResponse {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (deserializeOccurrence(item))) : undefined,
  };
}

/**
 * Response for listing notes.
 */
export interface ListNotesResponse {
  /**
   * The next pagination token in the list response. It should be used as
   * `page_token` for the following request. An empty value means no more
   * results.
   */
  nextPageToken?: string;
  /**
   * The notes requested.
   */
  notes?: Note[];
}

function serializeListNotesResponse(data: any): ListNotesResponse {
  return {
    ...data,
    notes: data["notes"] !== undefined ? data["notes"].map((item: any) => (serializeNote(item))) : undefined,
  };
}

function deserializeListNotesResponse(data: any): ListNotesResponse {
  return {
    ...data,
    notes: data["notes"] !== undefined ? data["notes"].map((item: any) => (deserializeNote(item))) : undefined,
  };
}

/**
 * Response for listing occurrences.
 */
export interface ListOccurrencesResponse {
  /**
   * The next pagination token in the list response. It should be used as
   * `page_token` for the following request. An empty value means no more
   * results.
   */
  nextPageToken?: string;
  /**
   * The occurrences requested.
   */
  occurrences?: Occurrence[];
}

function serializeListOccurrencesResponse(data: any): ListOccurrencesResponse {
  return {
    ...data,
    occurrences: data["occurrences"] !== undefined ? data["occurrences"].map((item: any) => (serializeOccurrence(item))) : undefined,
  };
}

function deserializeListOccurrencesResponse(data: any): ListOccurrencesResponse {
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
 * A type of analysis that can be done for a resource.
 */
export interface Note {
  /**
   * A note describing an attestation role.
   */
  attestation?: AttestationNote;
  /**
   * A note describing build provenance for a verifiable build.
   */
  build?: BuildNote;
  /**
   * A note describing a compliance check.
   */
  compliance?: ComplianceNote;
  /**
   * Output only. The time this note was created. This field can be used as a
   * filter in list requests.
   */
  createTime?: Date;
  /**
   * A note describing something that can be deployed.
   */
  deployment?: DeploymentNote;
  /**
   * A note describing the initial analysis of a resource.
   */
  discovery?: DiscoveryNote;
  /**
   * A note describing a dsse attestation note.
   */
  dsseAttestation?: DSSEAttestationNote;
  /**
   * Time of expiration for this note. Empty if note does not expire.
   */
  expirationTime?: Date;
  /**
   * A note describing a base image.
   */
  image?: ImageNote;
  /**
   * Output only. The type of analysis. This field can be used as a filter in
   * list requests.
   */
  kind?:  | "NOTE_KIND_UNSPECIFIED" | "VULNERABILITY" | "BUILD" | "IMAGE" | "PACKAGE" | "DEPLOYMENT" | "DISCOVERY" | "ATTESTATION" | "UPGRADE" | "COMPLIANCE" | "DSSE_ATTESTATION";
  /**
   * A detailed description of this note.
   */
  longDescription?: string;
  /**
   * Output only. The name of the note in the form of
   * `projects/[PROVIDER_ID]/notes/[NOTE_ID]`.
   */
  name?: string;
  /**
   * A note describing a package hosted by various package managers.
   */
  package?: PackageNote;
  /**
   * Other notes related to this note.
   */
  relatedNoteNames?: string[];
  /**
   * URLs associated with this note.
   */
  relatedUrl?: RelatedUrl[];
  /**
   * A one sentence description of this note.
   */
  shortDescription?: string;
  /**
   * Output only. The time this note was last updated. This field can be used
   * as a filter in list requests.
   */
  updateTime?: Date;
  /**
   * A note describing available package upgrades.
   */
  upgrade?: UpgradeNote;
  /**
   * A note describing a package vulnerability.
   */
  vulnerability?: VulnerabilityNote;
}

function serializeNote(data: any): Note {
  return {
    ...data,
    compliance: data["compliance"] !== undefined ? serializeComplianceNote(data["compliance"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
    package: data["package"] !== undefined ? serializePackageNote(data["package"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
    upgrade: data["upgrade"] !== undefined ? serializeUpgradeNote(data["upgrade"]) : undefined,
    vulnerability: data["vulnerability"] !== undefined ? serializeVulnerabilityNote(data["vulnerability"]) : undefined,
  };
}

function deserializeNote(data: any): Note {
  return {
    ...data,
    compliance: data["compliance"] !== undefined ? deserializeComplianceNote(data["compliance"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
    package: data["package"] !== undefined ? deserializePackageNote(data["package"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    upgrade: data["upgrade"] !== undefined ? deserializeUpgradeNote(data["upgrade"]) : undefined,
    vulnerability: data["vulnerability"] !== undefined ? deserializeVulnerabilityNote(data["vulnerability"]) : undefined,
  };
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
 * PackageNote represents a particular package version.
 */
export interface PackageNote {
  /**
   * The CPU architecture for which packages in this distribution channel were
   * built. Architecture will be blank for language packages.
   */
  architecture?:  | "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64";
  /**
   * The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting
   * the package manager version distributing a package. The cpe_uri will be
   * blank for language packages.
   */
  cpeUri?: string;
  /**
   * The description of this package.
   */
  description?: string;
  /**
   * Hash value, typically a file digest, that allows unique identification a
   * specific package.
   */
  digest?: Digest[];
  /**
   * Deprecated. The various channels by which a package is distributed.
   */
  distribution?: Distribution[];
  /**
   * Licenses that have been declared by the authors of the package.
   */
  license?: License;
  /**
   * A freeform text denoting the maintainer of this package.
   */
  maintainer?: string;
  /**
   * Required. Immutable. The name of the package.
   */
  name?: string;
  /**
   * The type of package; whether native or non native (e.g., ruby gems,
   * node.js packages, etc.).
   */
  packageType?: string;
  /**
   * The homepage for this package.
   */
  url?: string;
  /**
   * The version of the package.
   */
  version?: Version;
}

function serializePackageNote(data: any): PackageNote {
  return {
    ...data,
    digest: data["digest"] !== undefined ? data["digest"].map((item: any) => (serializeDigest(item))) : undefined,
  };
}

function deserializePackageNote(data: any): PackageNote {
  return {
    ...data,
    digest: data["digest"] !== undefined ? data["digest"].map((item: any) => (deserializeDigest(item))) : undefined,
  };
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
 * Additional options for ContainerAnalysis#projectsNotesCreate.
 */
export interface ProjectsNotesCreateOptions {
  /**
   * Required. The ID to use for this note.
   */
  noteId?: string;
}

/**
 * Additional options for ContainerAnalysis#projectsNotesList.
 */
export interface ProjectsNotesListOptions {
  /**
   * The filter expression.
   */
  filter?: string;
  /**
   * Number of notes to return in the list. Must be positive. Max allowed page
   * size is 1000. If not specified, page size defaults to 20.
   */
  pageSize?: number;
  /**
   * Token to provide to skip to a particular spot in the list.
   */
  pageToken?: string;
}

/**
 * Additional options for ContainerAnalysis#projectsNotesOccurrencesList.
 */
export interface ProjectsNotesOccurrencesListOptions {
  /**
   * The filter expression.
   */
  filter?: string;
  /**
   * Number of occurrences to return in the list.
   */
  pageSize?: number;
  /**
   * Token to provide to skip to a particular spot in the list.
   */
  pageToken?: string;
}

/**
 * Additional options for ContainerAnalysis#projectsNotesPatch.
 */
export interface ProjectsNotesPatchOptions {
  /**
   * The fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsNotesPatchOptions(data: any): ProjectsNotesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsNotesPatchOptions(data: any): ProjectsNotesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ContainerAnalysis#projectsOccurrencesGetVulnerabilitySummary.
 */
export interface ProjectsOccurrencesGetVulnerabilitySummaryOptions {
  /**
   * The filter expression.
   */
  filter?: string;
}

/**
 * Additional options for ContainerAnalysis#projectsOccurrencesList.
 */
export interface ProjectsOccurrencesListOptions {
  /**
   * The filter expression.
   */
  filter?: string;
  /**
   * Number of occurrences to return in the list. Must be positive. Max allowed
   * page size is 1000. If not specified, page size defaults to 20.
   */
  pageSize?: number;
  /**
   * Token to provide to skip to a particular spot in the list.
   */
  pageToken?: string;
}

/**
 * Additional options for ContainerAnalysis#projectsOccurrencesPatch.
 */
export interface ProjectsOccurrencesPatchOptions {
  /**
   * The fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsOccurrencesPatchOptions(data: any): ProjectsOccurrencesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsOccurrencesPatchOptions(data: any): ProjectsOccurrencesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
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
 * Request message for `SetIamPolicy` method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: Policy;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
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
 * Start and end times for a build execution phase. Next ID: 3
 */
export interface TimeSpan {
  /**
   * End of time span.
   */
  endTime?: Date;
  /**
   * Start of time span.
   */
  startTime?: Date;
}

function serializeTimeSpan(data: any): TimeSpan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeSpan(data: any): TimeSpan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
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
 * An Upgrade Note represents a potential upgrade of a package to a given
 * version. For each package version combination (i.e. bash 4.0, bash 4.1, bash
 * 4.1.2), there will be an Upgrade Note. For Windows, windows_update field
 * represents the information related to the update.
 */
export interface UpgradeNote {
  /**
   * Metadata about the upgrade for each specific operating system.
   */
  distributions?: UpgradeDistribution[];
  /**
   * Required for non-Windows OS. The package this Upgrade is for.
   */
  package?: string;
  /**
   * Required for non-Windows OS. The version of the package in machine + human
   * readable form.
   */
  version?: Version;
  /**
   * Required for Windows OS. Represents the metadata about the Windows update.
   */
  windowsUpdate?: WindowsUpdate;
}

function serializeUpgradeNote(data: any): UpgradeNote {
  return {
    ...data,
    windowsUpdate: data["windowsUpdate"] !== undefined ? serializeWindowsUpdate(data["windowsUpdate"]) : undefined,
  };
}

function deserializeUpgradeNote(data: any): UpgradeNote {
  return {
    ...data,
    windowsUpdate: data["windowsUpdate"] !== undefined ? deserializeWindowsUpdate(data["windowsUpdate"]) : undefined,
  };
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
 * Volume describes a Docker container volume which is mounted into build steps
 * in order to persist files across build step execution. Next ID: 3
 */
export interface Volume {
  /**
   * Name of the volume to mount. Volume names must be unique per build step
   * and must be valid names for Docker volumes. Each named volume must be used
   * by at least two build steps.
   */
  name?: string;
  /**
   * Path at which to mount the volume. Paths must be absolute and cannot
   * conflict with other volume paths on the same build step or with certain
   * reserved volume paths.
   */
  path?: string;
}

/**
 * A security vulnerability that can be found in resources.
 */
export interface VulnerabilityNote {
  /**
   * The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10
   * where 0 indicates low severity and 10 indicates high severity.
   */
  cvssScore?: number;
  /**
   * The full description of the v2 CVSS for this vulnerability.
   */
  cvssV2?: CVSS;
  /**
   * The full description of the CVSSv3 for this vulnerability.
   */
  cvssV3?: CVSSv3;
  /**
   * CVSS version used to populate cvss_score and severity.
   */
  cvssVersion?:  | "CVSS_VERSION_UNSPECIFIED" | "CVSS_VERSION_2" | "CVSS_VERSION_3";
  /**
   * Details of all known distros and packages affected by this vulnerability.
   */
  details?: Detail[];
  /**
   * The note provider assigned severity of this vulnerability.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  /**
   * The time this information was last changed at the source. This is an
   * upstream timestamp from the underlying information source - e.g. Ubuntu
   * security tracker.
   */
  sourceUpdateTime?: Date;
  /**
   * Windows details get their own format because the information format and
   * model don't match a normal detail. Specifically Windows updates are done as
   * patches, thus Windows vulnerabilities really are a missing package, rather
   * than a package being at an incorrect version.
   */
  windowsDetails?: WindowsDetail[];
}

function serializeVulnerabilityNote(data: any): VulnerabilityNote {
  return {
    ...data,
    details: data["details"] !== undefined ? data["details"].map((item: any) => (serializeDetail(item))) : undefined,
    sourceUpdateTime: data["sourceUpdateTime"] !== undefined ? data["sourceUpdateTime"].toISOString() : undefined,
  };
}

function deserializeVulnerabilityNote(data: any): VulnerabilityNote {
  return {
    ...data,
    details: data["details"] !== undefined ? data["details"].map((item: any) => (deserializeDetail(item))) : undefined,
    sourceUpdateTime: data["sourceUpdateTime"] !== undefined ? new Date(data["sourceUpdateTime"]) : undefined,
  };
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
 * A summary of how many vulnerability occurrences there are per resource and
 * severity type.
 */
export interface VulnerabilityOccurrencesSummary {
  /**
   * A listing by resource of the number of fixable and total vulnerabilities.
   */
  counts?: FixableTotalByDigest[];
}

function serializeVulnerabilityOccurrencesSummary(data: any): VulnerabilityOccurrencesSummary {
  return {
    ...data,
    counts: data["counts"] !== undefined ? data["counts"].map((item: any) => (serializeFixableTotalByDigest(item))) : undefined,
  };
}

function deserializeVulnerabilityOccurrencesSummary(data: any): VulnerabilityOccurrencesSummary {
  return {
    ...data,
    counts: data["counts"] !== undefined ? data["counts"].map((item: any) => (deserializeFixableTotalByDigest(item))) : undefined,
  };
}

export interface WindowsDetail {
  /**
   * Required. The [CPE URI](https://cpe.mitre.org/specification/) this
   * vulnerability affects.
   */
  cpeUri?: string;
  /**
   * The description of this vulnerability.
   */
  description?: string;
  /**
   * Required. The names of the KBs which have hotfixes to mitigate this
   * vulnerability. Note that there may be multiple hotfixes (and thus multiple
   * KBs) that mitigate a given vulnerability. Currently any listed KBs presence
   * is considered a fix.
   */
  fixingKbs?: KnowledgeBase[];
  /**
   * Required. The name of this vulnerability.
   */
  name?: string;
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
