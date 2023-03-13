// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Binary Authorization API Client for Deno
 * ========================================
 * 
 * The management interface for Binary Authorization, a service that provides policy-based deployment validation and control for images deployed to Google Kubernetes Engine (GKE), Anthos Service Mesh, Anthos Clusters, and Cloud Run. 
 * 
 * Docs: https://cloud.google.com/binary-authorization/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The management interface for Binary Authorization, a service that provides
 * policy-based deployment validation and control for images deployed to Google
 * Kubernetes Engine (GKE), Anthos Service Mesh, Anthos Clusters, and Cloud Run.
 * 
 */
export class BinaryAuthorization {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://binaryauthorization.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates an attestor, and returns a copy of the new attestor. Returns
   * NOT_FOUND if the project does not exist, INVALID_ARGUMENT if the request is
   * malformed, ALREADY_EXISTS if the attestor already exists.
   *
   * @param parent Required. The parent of this attestor.
   */
  async projectsAttestorsCreate(parent: string, req: Attestor, opts: ProjectsAttestorsCreateOptions = {}): Promise<Attestor> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attestors`);
    if (opts.attestorId !== undefined) {
      url.searchParams.append("attestorId", String(opts.attestorId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Attestor;
  }

  /**
   * Deletes an attestor. Returns NOT_FOUND if the attestor does not exist.
   *
   * @param name Required. The name of the attestors to delete, in the format `projects/*\/attestors/*`.
   */
  async projectsAttestorsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an attestor. Returns NOT_FOUND if the attestor does not exist.
   *
   * @param name Required. The name of the attestor to retrieve, in the format `projects/*\/attestors/*`.
   */
  async projectsAttestorsGet(name: string): Promise<Attestor> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Attestor;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsAttestorsGetIamPolicy(resource: string, opts: ProjectsAttestorsGetIamPolicyOptions = {}): Promise<IamPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeIamPolicy(data);
  }

  /**
   * Lists attestors. Returns INVALID_ARGUMENT if the project does not exist.
   *
   * @param parent Required. The resource name of the project associated with the attestors, in the format `projects/*`.
   */
  async projectsAttestorsList(parent: string, opts: ProjectsAttestorsListOptions = {}): Promise<ListAttestorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attestors`);
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
    return data as ListAttestorsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsAttestorsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<IamPolicy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeIamPolicy(data);
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
  async projectsAttestorsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates an attestor. Returns NOT_FOUND if the attestor does not exist.
   *
   * @param name Required. The resource name, in the format: `projects/*\/attestors/*`. This field may not be updated.
   */
  async projectsAttestorsUpdate(name: string, req: Attestor): Promise<Attestor> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Attestor;
  }

  /**
   * Returns whether the given Attestation for the given image URI was signed
   * by the given Attestor
   *
   * @param attestor Required. The resource name of the Attestor of the occurrence, in the format `projects/*\/attestors/*`.
   */
  async projectsAttestorsValidateAttestationOccurrence(attestor: string, req: ValidateAttestationOccurrenceRequest): Promise<ValidateAttestationOccurrenceResponse> {
    req = serializeValidateAttestationOccurrenceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ attestor }:validateAttestationOccurrence`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ValidateAttestationOccurrenceResponse;
  }

  /**
   * A policy specifies the attestors that must attest to a container image,
   * before the project is allowed to deploy that image. There is at most one
   * policy per project. All image admission requests are permitted if a project
   * has no policy. Gets the policy for this project. Returns a default policy
   * if the project does not have one.
   *
   * @param name Required. The resource name of the policy to retrieve, in the format `projects/*\/policy`.
   */
  async projectsGetPolicy(name: string): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Policy;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsPolicyGetIamPolicy(resource: string, opts: ProjectsPolicyGetIamPolicyOptions = {}): Promise<IamPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeIamPolicy(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsPolicySetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<IamPolicy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeIamPolicy(data);
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
  async projectsPolicyTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates or updates a project's policy, and returns a copy of the new
   * policy. A policy is always updated as a whole, to avoid race conditions
   * with concurrent policy enforcement (or management!) requests. Returns
   * NOT_FOUND if the project does not exist, INVALID_ARGUMENT if the request is
   * malformed.
   *
   * @param name Output only. The resource name, in the format `projects/*\/policy`. There is at most one policy per project.
   */
  async projectsUpdatePolicy(name: string, req: Policy): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Policy;
  }

  /**
   * Gets the current system policy in the specified location.
   *
   * @param name Required. The resource name, in the format `locations/*\/policy`. Note that the system policy is not associated with a project.
   */
  async systempolicyGetPolicy(name: string): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Policy;
  }
}

/**
 * An admission rule specifies either that all container images used in a pod
 * creation request must be attested to by one or more attestors, that all pod
 * creations will be allowed, or that all pod creations will be denied. Images
 * matching an admission allowlist pattern are exempted from admission rules and
 * will never block a pod creation.
 */
export interface AdmissionRule {
  /**
   * Required. The action when a pod creation is denied by the admission rule.
   */
  enforcementMode?:  | "ENFORCEMENT_MODE_UNSPECIFIED" | "ENFORCED_BLOCK_AND_AUDIT_LOG" | "DRYRUN_AUDIT_LOG_ONLY";
  /**
   * Required. How this admission rule will be evaluated.
   */
  evaluationMode?:  | "EVALUATION_MODE_UNSPECIFIED" | "ALWAYS_ALLOW" | "REQUIRE_ATTESTATION" | "ALWAYS_DENY";
  /**
   * Optional. The resource names of the attestors that must attest to a
   * container image, in the format `projects/*\/attestors/*`. Each attestor
   * must exist before a policy can reference it. To add an attestor to a policy
   * the principal issuing the policy change request must be able to read the
   * attestor resource. Note: this field must be non-empty when the
   * evaluation_mode field specifies REQUIRE_ATTESTATION, otherwise it must be
   * empty.
   */
  requireAttestationsBy?: string[];
}

/**
 * An admission allowlist pattern exempts images from checks by admission
 * rules.
 */
export interface AdmissionWhitelistPattern {
  /**
   * An image name pattern to allowlist, in the form `registry/path/to/image`.
   * This supports a trailing `*` wildcard, but this is allowed only in text
   * after the `registry/` part. This also supports a trailing `**` wildcard
   * which matches subdirectories of a given entry.
   */
  namePattern?: string;
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
 * An attestor that attests to container image artifacts. An existing attestor
 * cannot be modified except where indicated.
 */
export interface Attestor {
  /**
   * Optional. A descriptive comment. This field may be updated. The field may
   * be displayed in chooser dialogs.
   */
  description?: string;
  /**
   * Optional. A checksum, returned by the server, that can be sent on update
   * requests to ensure the attestor has an up-to-date value before attempting
   * to update it. See https://google.aip.dev/154.
   */
  etag?: string;
  /**
   * Required. The resource name, in the format: `projects/*\/attestors/*`.
   * This field may not be updated.
   */
  name?: string;
  /**
   * Output only. Time when the attestor was last updated.
   */
  readonly updateTime?: Date;
  /**
   * This specifies how an attestation will be read, and how it will be used
   * during policy enforcement.
   */
  userOwnedGrafeasNote?: UserOwnedGrafeasNote;
}

/**
 * An attestor public key that will be used to verify attestations signed by
 * this attestor.
 */
export interface AttestorPublicKey {
  /**
   * ASCII-armored representation of a PGP public key, as the entire output by
   * the command `gpg --export --armor foo@example.com` (either LF or CRLF line
   * endings). When using this field, `id` should be left blank. The BinAuthz
   * API handlers will calculate the ID and fill it in automatically. BinAuthz
   * computes this ID as the OpenPGP RFC4880 V4 fingerprint, represented as
   * upper-case hex. If `id` is provided by the caller, it will be overwritten
   * by the API-calculated ID.
   */
  asciiArmoredPgpPublicKey?: string;
  /**
   * Optional. A descriptive comment. This field may be updated.
   */
  comment?: string;
  /**
   * The ID of this public key. Signatures verified by BinAuthz must include
   * the ID of the public key that can be used to verify them, and that ID must
   * match the contents of this field exactly. Additional restrictions on this
   * field can be imposed based on which public key type is encapsulated. See
   * the documentation on `public_key` cases below for details.
   */
  id?: string;
  /**
   * A raw PKIX SubjectPublicKeyInfo format public key. NOTE: `id` may be
   * explicitly provided by the caller when using this type of public key, but
   * it MUST be a valid RFC3986 URI. If `id` is left blank, a default one will
   * be computed based on the digest of the DER encoding of the public key.
   */
  pkixPublicKey?: PkixPublicKey;
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
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
export interface IamPolicy {
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

function serializeIamPolicy(data: any): IamPolicy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeIamPolicy(data: any): IamPolicy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
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
 * Response message for BinauthzManagementService.ListAttestors.
 */
export interface ListAttestorsResponse {
  /**
   * The list of attestors.
   */
  attestors?: Attestor[];
  /**
   * A token to retrieve the next page of results. Pass this value in the
   * ListAttestorsRequest.page_token field in the subsequent call to the
   * `ListAttestors` method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * A public key in the PkixPublicKey format (see
 * https://tools.ietf.org/html/rfc5280#section-4.1.2.7 for details). Public keys
 * of this type are typically textually encoded using the PEM format.
 */
export interface PkixPublicKey {
  /**
   * A PEM-encoded public key, as described in
   * https://tools.ietf.org/html/rfc7468#section-13
   */
  publicKeyPem?: string;
  /**
   * The signature algorithm used to verify a message against a signature using
   * this key. These signature algorithm must match the structure and any object
   * identifiers encoded in `public_key_pem` (i.e. this algorithm must match
   * that of the public key).
   */
  signatureAlgorithm?:  | "SIGNATURE_ALGORITHM_UNSPECIFIED" | "RSA_PSS_2048_SHA256" | "RSA_SIGN_PSS_2048_SHA256" | "RSA_PSS_3072_SHA256" | "RSA_SIGN_PSS_3072_SHA256" | "RSA_PSS_4096_SHA256" | "RSA_SIGN_PSS_4096_SHA256" | "RSA_PSS_4096_SHA512" | "RSA_SIGN_PSS_4096_SHA512" | "RSA_SIGN_PKCS1_2048_SHA256" | "RSA_SIGN_PKCS1_3072_SHA256" | "RSA_SIGN_PKCS1_4096_SHA256" | "RSA_SIGN_PKCS1_4096_SHA512" | "ECDSA_P256_SHA256" | "EC_SIGN_P256_SHA256" | "ECDSA_P384_SHA384" | "EC_SIGN_P384_SHA384" | "ECDSA_P521_SHA512" | "EC_SIGN_P521_SHA512";
}

/**
 * A policy for container image binary authorization.
 */
export interface Policy {
  /**
   * Optional. Admission policy allowlisting. A matching admission request will
   * always be permitted. This feature is typically used to exclude Google or
   * third-party infrastructure images from Binary Authorization policies.
   */
  admissionWhitelistPatterns?: AdmissionWhitelistPattern[];
  /**
   * Optional. Per-cluster admission rules. Cluster spec format:
   * `location.clusterId`. There can be at most one admission rule per cluster
   * spec. A `location` is either a compute zone (e.g. us-central1-a) or a
   * region (e.g. us-central1). For `clusterId` syntax restrictions see
   * https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters.
   */
  clusterAdmissionRules?: {
    [key: string]: AdmissionRule
  };
  /**
   * Required. Default admission rule for a cluster without a per-cluster, per-
   * kubernetes-service-account, or per-istio-service-identity admission rule.
   */
  defaultAdmissionRule?: AdmissionRule;
  /**
   * Optional. A descriptive comment.
   */
  description?: string;
  /**
   * Optional. A checksum, returned by the server, that can be sent on update
   * requests to ensure the policy has an up-to-date value before attempting to
   * update it. See https://google.aip.dev/154.
   */
  etag?: string;
  /**
   * Optional. Controls the evaluation of a Google-maintained global admission
   * policy for common system-level images. Images not covered by the global
   * policy will be subject to the project admission policy. This setting has no
   * effect when specified inside a global admission policy.
   */
  globalPolicyEvaluationMode?:  | "GLOBAL_POLICY_EVALUATION_MODE_UNSPECIFIED" | "ENABLE" | "DISABLE";
  /**
   * Optional. Per-istio-service-identity admission rules. Istio service
   * identity spec format: `spiffe:///ns//sa/` or `/ns//sa/` e.g.
   * `spiffe://example.com/ns/test-ns/sa/default`
   */
  istioServiceIdentityAdmissionRules?: {
    [key: string]: AdmissionRule
  };
  /**
   * Optional. Per-kubernetes-namespace admission rules. K8s namespace spec
   * format: `[a-z.-]+`, e.g. `some-namespace`
   */
  kubernetesNamespaceAdmissionRules?: {
    [key: string]: AdmissionRule
  };
  /**
   * Optional. Per-kubernetes-service-account admission rules. Service account
   * spec format: `namespace:serviceaccount`. e.g. `test-ns:default`
   */
  kubernetesServiceAccountAdmissionRules?: {
    [key: string]: AdmissionRule
  };
  /**
   * Output only. The resource name, in the format `projects/*\/policy`. There
   * is at most one policy per project.
   */
  readonly name?: string;
  /**
   * Output only. Time when the policy was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Additional options for BinaryAuthorization#projectsAttestorsCreate.
 */
export interface ProjectsAttestorsCreateOptions {
  /**
   * Required. The attestors ID.
   */
  attestorId?: string;
}

/**
 * Additional options for BinaryAuthorization#projectsAttestorsGetIamPolicy.
 */
export interface ProjectsAttestorsGetIamPolicyOptions {
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
 * Additional options for BinaryAuthorization#projectsAttestorsList.
 */
export interface ProjectsAttestorsListOptions {
  /**
   * Requested page size. The server may return fewer results than requested.
   * If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListAttestorsResponse.next_page_token returned from
   * the previous call to the `ListAttestors` method.
   */
  pageToken?: string;
}

/**
 * Additional options for BinaryAuthorization#projectsPolicyGetIamPolicy.
 */
export interface ProjectsPolicyGetIamPolicyOptions {
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
 * Request message for `SetIamPolicy` method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: IamPolicy;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeIamPolicy(data["policy"]) : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeIamPolicy(data["policy"]) : undefined,
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
 * An user owned Grafeas note references a Grafeas Attestation.Authority Note
 * created by the user.
 */
export interface UserOwnedGrafeasNote {
  /**
   * Output only. This field will contain the service account email address
   * that this Attestor will use as the principal when querying Container
   * Analysis. Attestor administrators must grant this service account the IAM
   * role needed to read attestations from the note_reference in Container
   * Analysis (`containeranalysis.notes.occurrences.viewer`). This email address
   * is fixed for the lifetime of the Attestor, but callers should not make any
   * other assumptions about the service account email; future versions may use
   * an email based on a different naming pattern.
   */
  readonly delegationServiceAccountEmail?: string;
  /**
   * Required. The Grafeas resource name of a Attestation.Authority Note,
   * created by the user, in the format: `projects/*\/notes/*`. This field may
   * not be updated. An attestation by this attestor is stored as a Grafeas
   * Attestation.Authority Occurrence that names a container image and that
   * links to this Note. Grafeas is an external dependency.
   */
  noteReference?: string;
  /**
   * Optional. Public keys that verify attestations signed by this attestor.
   * This field may be updated. If this field is non-empty, one of the specified
   * public keys must verify that an attestation was signed by this attestor for
   * the image specified in the admission request. If this field is empty, this
   * attestor always returns that no valid attestations exist.
   */
  publicKeys?: AttestorPublicKey[];
}

/**
 * Request message for ValidationHelperV1.ValidateAttestationOccurrence.
 */
export interface ValidateAttestationOccurrenceRequest {
  /**
   * Required. An AttestationOccurrence to be checked that it can be verified
   * by the Attestor. It does not have to be an existing entity in Container
   * Analysis. It must otherwise be a valid AttestationOccurrence.
   */
  attestation?: AttestationOccurrence;
  /**
   * Required. The resource name of the Note to which the containing Occurrence
   * is associated.
   */
  occurrenceNote?: string;
  /**
   * Required. The URI of the artifact (e.g. container image) that is the
   * subject of the containing Occurrence.
   */
  occurrenceResourceUri?: string;
}

function serializeValidateAttestationOccurrenceRequest(data: any): ValidateAttestationOccurrenceRequest {
  return {
    ...data,
    attestation: data["attestation"] !== undefined ? serializeAttestationOccurrence(data["attestation"]) : undefined,
  };
}

function deserializeValidateAttestationOccurrenceRequest(data: any): ValidateAttestationOccurrenceRequest {
  return {
    ...data,
    attestation: data["attestation"] !== undefined ? deserializeAttestationOccurrence(data["attestation"]) : undefined,
  };
}

/**
 * Response message for ValidationHelperV1.ValidateAttestationOccurrence.
 */
export interface ValidateAttestationOccurrenceResponse {
  /**
   * The reason for denial if the Attestation couldn't be validated.
   */
  denialReason?: string;
  /**
   * The result of the Attestation validation.
   */
  result?:  | "RESULT_UNSPECIFIED" | "VERIFIED" | "ATTESTATION_NOT_VERIFIABLE";
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
