// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Healthcare API Client for Deno
 * ====================================
 * 
 * Manage, store, and access healthcare data in Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/healthcare
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manage, store, and access healthcare data in Google Cloud Platform.
 */
export class Healthcare {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://healthcare.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new Attribute definition in the parent consent store.
   *
   * @param parent Required. The name of the consent store that this Attribute definition belongs to.
   */
  async projectsLocationsDatasetsConsentStoresAttributeDefinitionsCreate(parent: string, req: AttributeDefinition, opts: ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsCreateOptions = {}): Promise<AttributeDefinition> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributeDefinitions`);
    if (opts.attributeDefinitionId !== undefined) {
      url.searchParams.append("attributeDefinitionId", String(opts.attributeDefinitionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AttributeDefinition;
  }

  /**
   * Deletes the specified Attribute definition. Fails if the Attribute
   * definition is referenced by any User data mapping, or the latest revision
   * of any Consent.
   *
   * @param name Required. The resource name of the Attribute definition to delete. To preserve referential integrity, Attribute definitions referenced by a User data mapping or the latest revision of a Consent cannot be deleted.
   */
  async projectsLocationsDatasetsConsentStoresAttributeDefinitionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified Attribute definition.
   *
   * @param name Required. The resource name of the Attribute definition to get.
   */
  async projectsLocationsDatasetsConsentStoresAttributeDefinitionsGet(name: string): Promise<AttributeDefinition> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AttributeDefinition;
  }

  /**
   * Lists the Attribute definitions in the specified consent store.
   *
   * @param parent Required. Name of the consent store to retrieve Attribute definitions from.
   */
  async projectsLocationsDatasetsConsentStoresAttributeDefinitionsList(parent: string, opts: ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsListOptions = {}): Promise<ListAttributeDefinitionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributeDefinitions`);
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
    return data as ListAttributeDefinitionsResponse;
  }

  /**
   * Updates the specified Attribute definition.
   *
   * @param name Resource name of the Attribute definition, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/attributeDefinitions/{attribute_definition_id}`. Cannot be changed after creation.
   */
  async projectsLocationsDatasetsConsentStoresAttributeDefinitionsPatch(name: string, req: AttributeDefinition, opts: ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsPatchOptions = {}): Promise<AttributeDefinition> {
    opts = serializeProjectsLocationsDatasetsConsentStoresAttributeDefinitionsPatchOptions(opts);
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
    return data as AttributeDefinition;
  }

  /**
   * Checks if a particular data_id of a User data mapping in the specified
   * consent store is consented for the specified use.
   *
   * @param consentStore Required. Name of the consent store where the requested data_id is stored, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`.
   */
  async projectsLocationsDatasetsConsentStoresCheckDataAccess(consentStore: string, req: CheckDataAccessRequest): Promise<CheckDataAccessResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ consentStore }:checkDataAccess`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CheckDataAccessResponse;
  }

  /**
   * Creates a new Consent artifact in the parent consent store.
   *
   * @param parent Required. The name of the consent store this Consent artifact belongs to.
   */
  async projectsLocationsDatasetsConsentStoresConsentArtifactsCreate(parent: string, req: ConsentArtifact): Promise<ConsentArtifact> {
    req = serializeConsentArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/consentArtifacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConsentArtifact(data);
  }

  /**
   * Deletes the specified Consent artifact. Fails if the artifact is
   * referenced by the latest revision of any Consent.
   *
   * @param name Required. The resource name of the Consent artifact to delete. To preserve referential integrity, Consent artifacts referenced by the latest revision of a Consent cannot be deleted.
   */
  async projectsLocationsDatasetsConsentStoresConsentArtifactsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified Consent artifact.
   *
   * @param name Required. The resource name of the Consent artifact to retrieve.
   */
  async projectsLocationsDatasetsConsentStoresConsentArtifactsGet(name: string): Promise<ConsentArtifact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConsentArtifact(data);
  }

  /**
   * Lists the Consent artifacts in the specified consent store.
   *
   * @param parent Required. Name of the consent store to retrieve consent artifacts from.
   */
  async projectsLocationsDatasetsConsentStoresConsentArtifactsList(parent: string, opts: ProjectsLocationsDatasetsConsentStoresConsentArtifactsListOptions = {}): Promise<ListConsentArtifactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/consentArtifacts`);
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
    return deserializeListConsentArtifactsResponse(data);
  }

  /**
   * Activates the latest revision of the specified Consent by committing a new
   * revision with `state` updated to `ACTIVE`. If the latest revision of the
   * specified Consent is in the `ACTIVE` state, no new revision is committed. A
   * FAILED_PRECONDITION error occurs if the latest revision of the specified
   * Consent is in the `REJECTED` or `REVOKED` state.
   *
   * @param name Required. The resource name of the Consent to activate, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name.
   */
  async projectsLocationsDatasetsConsentStoresConsentsActivate(name: string, req: ActivateConsentRequest): Promise<Consent> {
    req = serializeActivateConsentRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConsent(data);
  }

  /**
   * Creates a new Consent in the parent consent store.
   *
   * @param parent Required. Name of the consent store.
   */
  async projectsLocationsDatasetsConsentStoresConsentsCreate(parent: string, req: Consent): Promise<Consent> {
    req = serializeConsent(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/consents`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConsent(data);
  }

  /**
   * Deletes the Consent and its revisions. To keep a record of the Consent but
   * mark it inactive, see [RevokeConsent]. To delete a revision of a Consent,
   * see [DeleteConsentRevision]. This operation does not delete the related
   * Consent artifact.
   *
   * @param name Required. The resource name of the Consent to delete, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name.
   */
  async projectsLocationsDatasetsConsentStoresConsentsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Deletes the specified revision of a Consent. An INVALID_ARGUMENT error
   * occurs if the specified revision is the latest revision.
   *
   * @param name Required. The resource name of the Consent revision to delete, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}@{revision_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is not specified in the name.
   */
  async projectsLocationsDatasetsConsentStoresConsentsDeleteRevision(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:deleteRevision`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified revision of a Consent, or the latest revision if
   * `revision_id` is not specified in the resource name.
   *
   * @param name Required. The resource name of the Consent to retrieve, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. In order to retrieve a previous revision of the Consent, also provide the revision ID: `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}@{revision_id}`
   */
  async projectsLocationsDatasetsConsentStoresConsentsGet(name: string): Promise<Consent> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConsent(data);
  }

  /**
   * Lists the Consent in the given consent store, returning each Consent's
   * latest revision.
   *
   * @param parent Required. Name of the consent store to retrieve Consents from.
   */
  async projectsLocationsDatasetsConsentStoresConsentsList(parent: string, opts: ProjectsLocationsDatasetsConsentStoresConsentsListOptions = {}): Promise<ListConsentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/consents`);
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
    return deserializeListConsentsResponse(data);
  }

  /**
   * Lists the revisions of the specified Consent in reverse chronological
   * order.
   *
   * @param name Required. The resource name of the Consent to retrieve revisions for.
   */
  async projectsLocationsDatasetsConsentStoresConsentsListRevisions(name: string, opts: ProjectsLocationsDatasetsConsentStoresConsentsListRevisionsOptions = {}): Promise<ListConsentRevisionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:listRevisions`);
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
    return deserializeListConsentRevisionsResponse(data);
  }

  /**
   * Updates the latest revision of the specified Consent by committing a new
   * revision with the changes. A FAILED_PRECONDITION error occurs if the latest
   * revision of the specified Consent is in the `REJECTED` or `REVOKED` state.
   *
   * @param name Resource name of the Consent, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. Cannot be changed after creation.
   */
  async projectsLocationsDatasetsConsentStoresConsentsPatch(name: string, req: Consent, opts: ProjectsLocationsDatasetsConsentStoresConsentsPatchOptions = {}): Promise<Consent> {
    req = serializeConsent(req);
    opts = serializeProjectsLocationsDatasetsConsentStoresConsentsPatchOptions(opts);
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
    return deserializeConsent(data);
  }

  /**
   * Rejects the latest revision of the specified Consent by committing a new
   * revision with `state` updated to `REJECTED`. If the latest revision of the
   * specified Consent is in the `REJECTED` state, no new revision is committed.
   * A FAILED_PRECONDITION error occurs if the latest revision of the specified
   * Consent is in the `ACTIVE` or `REVOKED` state.
   *
   * @param name Required. The resource name of the Consent to reject, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name.
   */
  async projectsLocationsDatasetsConsentStoresConsentsReject(name: string, req: RejectConsentRequest): Promise<Consent> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:reject`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConsent(data);
  }

  /**
   * Revokes the latest revision of the specified Consent by committing a new
   * revision with `state` updated to `REVOKED`. If the latest revision of the
   * specified Consent is in the `REVOKED` state, no new revision is committed.
   * A FAILED_PRECONDITION error occurs if the latest revision of the given
   * consent is in `DRAFT` or `REJECTED` state.
   *
   * @param name Required. The resource name of the Consent to revoke, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name.
   */
  async projectsLocationsDatasetsConsentStoresConsentsRevoke(name: string, req: RevokeConsentRequest): Promise<Consent> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:revoke`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConsent(data);
  }

  /**
   * Creates a new consent store in the parent dataset. Attempting to create a
   * consent store with the same ID as an existing store fails with an
   * ALREADY_EXISTS error.
   *
   * @param parent Required. The name of the dataset this consent store belongs to.
   */
  async projectsLocationsDatasetsConsentStoresCreate(parent: string, req: ConsentStore, opts: ProjectsLocationsDatasetsConsentStoresCreateOptions = {}): Promise<ConsentStore> {
    req = serializeConsentStore(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/consentStores`);
    if (opts.consentStoreId !== undefined) {
      url.searchParams.append("consentStoreId", String(opts.consentStoreId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConsentStore(data);
  }

  /**
   * Deletes the specified consent store and removes all the consent store's
   * data.
   *
   * @param name Required. The resource name of the consent store to delete.
   */
  async projectsLocationsDatasetsConsentStoresDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Evaluates the user's Consents for all matching User data mappings. Note:
   * User data mappings are indexed asynchronously, which can cause a slight
   * delay between the time mappings are created or updated and when they are
   * included in EvaluateUserConsents results.
   *
   * @param consentStore Required. Name of the consent store to retrieve User data mappings from.
   */
  async projectsLocationsDatasetsConsentStoresEvaluateUserConsents(consentStore: string, req: EvaluateUserConsentsRequest): Promise<EvaluateUserConsentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ consentStore }:evaluateUserConsents`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as EvaluateUserConsentsResponse;
  }

  /**
   * Gets the specified consent store.
   *
   * @param name Required. The resource name of the consent store to get.
   */
  async projectsLocationsDatasetsConsentStoresGet(name: string): Promise<ConsentStore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConsentStore(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsConsentStoresGetIamPolicy(resource: string, opts: ProjectsLocationsDatasetsConsentStoresGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists the consent stores in the specified dataset.
   *
   * @param parent Required. Name of the dataset.
   */
  async projectsLocationsDatasetsConsentStoresList(parent: string, opts: ProjectsLocationsDatasetsConsentStoresListOptions = {}): Promise<ListConsentStoresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/consentStores`);
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
    return deserializeListConsentStoresResponse(data);
  }

  /**
   * Updates the specified consent store.
   *
   * @param name Resource name of the consent store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`. Cannot be changed after creation.
   */
  async projectsLocationsDatasetsConsentStoresPatch(name: string, req: ConsentStore, opts: ProjectsLocationsDatasetsConsentStoresPatchOptions = {}): Promise<ConsentStore> {
    req = serializeConsentStore(req);
    opts = serializeProjectsLocationsDatasetsConsentStoresPatchOptions(opts);
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
    return deserializeConsentStore(data);
  }

  /**
   * Queries all data_ids that are consented for a specified use in the given
   * consent store and writes them to a specified destination. The returned
   * Operation includes a progress counter for the number of User data mappings
   * processed. If the request is successful, a detailed response is returned of
   * type QueryAccessibleDataResponse, contained in the response field when the
   * operation finishes. The metadata field type is OperationMetadata. Errors
   * are logged to Cloud Logging (see [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). For
   * example, the following sample log entry shows a `failed to evaluate consent
   * policy` error that occurred during a QueryAccessibleData call to consent
   * store
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`.
   * ```json jsonPayload: { @type:
   * "type.googleapis.com/google.cloud.healthcare.logging.QueryAccessibleDataLogEntry"
   * error: { code: 9 message: "failed to evaluate consent policy" }
   * resourceName:
   * "projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}"
   * } logName:
   * "projects/{project_id}/logs/healthcare.googleapis.com%2Fquery_accessible_data"
   * operation: { id:
   * "projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/operations/{operation_id}"
   * producer: "healthcare.googleapis.com/QueryAccessibleData" }
   * receiveTimestamp: "TIMESTAMP" resource: { labels: { consent_store_id:
   * "{consent_store_id}" dataset_id: "{dataset_id}" location: "{location_id}"
   * project_id: "{project_id}" } type: "healthcare_consent_store" } severity:
   * "ERROR" timestamp: "TIMESTAMP" ```
   *
   * @param consentStore Required. Name of the consent store to retrieve User data mappings from.
   */
  async projectsLocationsDatasetsConsentStoresQueryAccessibleData(consentStore: string, req: QueryAccessibleDataRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ consentStore }:queryAccessibleData`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
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
  async projectsLocationsDatasetsConsentStoresSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsDatasetsConsentStoresTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Archives the specified User data mapping.
   *
   * @param name Required. The resource name of the User data mapping to archive.
   */
  async projectsLocationsDatasetsConsentStoresUserDataMappingsArchive(name: string, req: ArchiveUserDataMappingRequest): Promise<ArchiveUserDataMappingResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:archive`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ArchiveUserDataMappingResponse;
  }

  /**
   * Creates a new User data mapping in the parent consent store.
   *
   * @param parent Required. Name of the consent store.
   */
  async projectsLocationsDatasetsConsentStoresUserDataMappingsCreate(parent: string, req: UserDataMapping): Promise<UserDataMapping> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/userDataMappings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UserDataMapping;
  }

  /**
   * Deletes the specified User data mapping.
   *
   * @param name Required. The resource name of the User data mapping to delete.
   */
  async projectsLocationsDatasetsConsentStoresUserDataMappingsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified User data mapping.
   *
   * @param name Required. The resource name of the User data mapping to retrieve.
   */
  async projectsLocationsDatasetsConsentStoresUserDataMappingsGet(name: string): Promise<UserDataMapping> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UserDataMapping;
  }

  /**
   * Lists the User data mappings in the specified consent store.
   *
   * @param parent Required. Name of the consent store to retrieve User data mappings from.
   */
  async projectsLocationsDatasetsConsentStoresUserDataMappingsList(parent: string, opts: ProjectsLocationsDatasetsConsentStoresUserDataMappingsListOptions = {}): Promise<ListUserDataMappingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/userDataMappings`);
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
    return data as ListUserDataMappingsResponse;
  }

  /**
   * Updates the specified User data mapping.
   *
   * @param name Resource name of the User data mapping, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/userDataMappings/{user_data_mapping_id}`.
   */
  async projectsLocationsDatasetsConsentStoresUserDataMappingsPatch(name: string, req: UserDataMapping, opts: ProjectsLocationsDatasetsConsentStoresUserDataMappingsPatchOptions = {}): Promise<UserDataMapping> {
    opts = serializeProjectsLocationsDatasetsConsentStoresUserDataMappingsPatchOptions(opts);
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
    return data as UserDataMapping;
  }

  /**
   * Creates a new health dataset. Results are returned through the Operation
   * interface which returns either an `Operation.response` which contains a
   * Dataset or `Operation.error`. The metadata field type is OperationMetadata.
   *
   * @param parent The name of the project where the server creates the dataset. For example, `projects/{project_id}/locations/{location_id}`.
   */
  async projectsLocationsDatasetsCreate(parent: string, req: Dataset, opts: ProjectsLocationsDatasetsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/datasets`);
    if (opts.datasetId !== undefined) {
      url.searchParams.append("datasetId", String(opts.datasetId));
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
   * Creates a new dataset containing de-identified data from the source
   * dataset. The metadata field type is OperationMetadata. If the request is
   * successful, the response field type is DeidentifySummary. If errors occur,
   * error is set. The LRO result may still be successful if de-identification
   * fails for some DICOM instances. The new de-identified dataset will not
   * contain these failed resources. Failed resource totals are tracked in
   * Operation.metadata. Error details are also logged to Cloud Logging. For
   * more information, see [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging).
   *
   * @param sourceDataset Source dataset resource name. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`.
   */
  async projectsLocationsDatasetsDeidentify(sourceDataset: string, req: DeidentifyDatasetRequest): Promise<Operation> {
    req = serializeDeidentifyDatasetRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ sourceDataset }:deidentify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the specified health dataset and all data contained in the
   * dataset. Deleting a dataset does not affect the sources from which the
   * dataset was imported (if any).
   *
   * @param name The name of the dataset to delete. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`.
   */
  async projectsLocationsDatasetsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Creates a new DICOM store within the parent dataset.
   *
   * @param parent The name of the dataset this DICOM store belongs to.
   */
  async projectsLocationsDatasetsDicomStoresCreate(parent: string, req: DicomStore, opts: ProjectsLocationsDatasetsDicomStoresCreateOptions = {}): Promise<DicomStore> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomStores`);
    if (opts.dicomStoreId !== undefined) {
      url.searchParams.append("dicomStoreId", String(opts.dicomStoreId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DicomStore;
  }

  /**
   * De-identifies data from the source store and writes it to the destination
   * store. The metadata field type is OperationMetadata. If the request is
   * successful, the response field type is DeidentifyDicomStoreSummary. If
   * errors occur, error is set. The LRO result may still be successful if
   * de-identification fails for some DICOM instances. The output DICOM store
   * will not contain these failed resources. Failed resource totals are tracked
   * in Operation.metadata. Error details are also logged to Cloud Logging (see
   * [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   *
   * @param sourceStore Source DICOM store resource name. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresDeidentify(sourceStore: string, req: DeidentifyDicomStoreRequest): Promise<Operation> {
    req = serializeDeidentifyDicomStoreRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ sourceStore }:deidentify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the specified DICOM store and removes all images that are
   * contained within it.
   *
   * @param name The resource name of the DICOM store to delete.
   */
  async projectsLocationsDatasetsDicomStoresDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Exports data to the specified destination by copying it from the DICOM
   * store. Errors are also logged to Cloud Logging. For more information, see
   * [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging). The
   * metadata field type is OperationMetadata.
   *
   * @param name The DICOM store resource name from which to export the data. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresExport(name: string, req: ExportDicomDataRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the specified DICOM store.
   *
   * @param name The resource name of the DICOM store to get.
   */
  async projectsLocationsDatasetsDicomStoresGet(name: string): Promise<DicomStore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DicomStore;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsDicomStoresGetIamPolicy(resource: string, opts: ProjectsLocationsDatasetsDicomStoresGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Imports data into the DICOM store by copying it from the specified source.
   * Errors are logged to Cloud Logging. For more information, see [Viewing
   * error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging). The
   * metadata field type is OperationMetadata.
   *
   * @param name The name of the DICOM store resource into which the data is imported. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresImport(name: string, req: ImportDicomDataRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists the DICOM stores in the given dataset.
   *
   * @param parent Name of the dataset.
   */
  async projectsLocationsDatasetsDicomStoresList(parent: string, opts: ProjectsLocationsDatasetsDicomStoresListOptions = {}): Promise<ListDicomStoresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomStores`);
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
    return data as ListDicomStoresResponse;
  }

  /**
   * Updates the specified DICOM store.
   *
   * @param name Resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresPatch(name: string, req: DicomStore, opts: ProjectsLocationsDatasetsDicomStoresPatchOptions = {}): Promise<DicomStore> {
    opts = serializeProjectsLocationsDatasetsDicomStoresPatchOptions(opts);
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
    return data as DicomStore;
  }

  /**
   * SearchForInstances returns a list of matching instances. See [Search
   * Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6).
   * For details on the implementation of SearchForInstances, see [Search
   * transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call SearchForInstances, see [Searching for studies, series,
   * instances, and
   * frames](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#searching_for_studies_series_instances_and_frames).
   *
   * @param dicomWebPath The path of the SearchForInstancesRequest DICOMweb request. For example, `instances`, `series/{series_uid}/instances`, or `studies/{study_uid}/instances`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresSearchForInstances(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * SearchForSeries returns a list of matching series. See [Search
   * Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6).
   * For details on the implementation of SearchForSeries, see [Search
   * transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call SearchForSeries, see [Searching for studies, series, instances,
   * and
   * frames](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#searching_for_studies_series_instances_and_frames).
   *
   * @param dicomWebPath The path of the SearchForSeries DICOMweb request. For example, `series` or `studies/{study_uid}/series`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresSearchForSeries(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * SearchForStudies returns a list of matching studies. See [Search
   * Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6).
   * For details on the implementation of SearchForStudies, see [Search
   * transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call SearchForStudies, see [Searching for studies, series,
   * instances, and
   * frames](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#searching_for_studies_series_instances_and_frames).
   *
   * @param dicomWebPath The path of the SearchForStudies DICOMweb request. For example, `studies`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresSearchForStudies(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsDicomStoresSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * StoreInstances stores DICOM instances associated with study instance
   * unique identifiers (SUID). See [Store Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5).
   * For details on the implementation of StoreInstances, see [Store
   * transaction](https://cloud.google.com/healthcare/docs/dicom#store_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call StoreInstances, see [Storing DICOM
   * data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#storing_dicom_data).
   *
   * @param dicomWebPath The path of the StoreInstances DICOMweb request. For example, `studies/[{study_uid}]`. Note that the `study_uid` is optional.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStoreInstances(dicomWebPath: string, parent: string, req: HttpBody): Promise<HttpBody> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * DeleteStudy deletes all instances within the given study. Delete requests
   * are equivalent to the GET requests specified in the Retrieve transaction.
   * The method returns an Operation which will be marked successful when the
   * deletion is complete. Warning: Instances cannot be inserted into a study
   * that is being deleted by an operation until the operation completes. For
   * samples that show how to call DeleteStudy, see [Deleting a study, series,
   * or
   * instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#deleting_a_study_series_or_instance).
   *
   * @param dicomWebPath The path of the DeleteStudy request. For example, `studies/{study_uid}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesDelete(dicomWebPath: string, parent: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * RetrieveStudyMetadata returns instance associated with the given study
   * presented as metadata with the bulk data removed. See [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveStudyMetadata, see [Metadata
   * resources](https://cloud.google.com/healthcare/docs/dicom#metadata_resources)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveStudyMetadata, see [Retrieving
   * metadata](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_metadata).
   *
   * @param dicomWebPath The path of the RetrieveStudyMetadata DICOMweb request. For example, `studies/{study_uid}/metadata`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesRetrieveMetadata(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * RetrieveStudy returns all instances within the given study. See
   * [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveStudy, see [DICOM
   * study/series/instances](https://cloud.google.com/healthcare/docs/dicom#dicom_studyseriesinstances)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveStudy, see [Retrieving DICOM
   * data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_dicom_data).
   *
   * @param dicomWebPath The path of the RetrieveStudy DICOMweb request. For example, `studies/{study_uid}`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesRetrieveStudy(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * SearchForInstances returns a list of matching instances. See [Search
   * Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6).
   * For details on the implementation of SearchForInstances, see [Search
   * transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call SearchForInstances, see [Searching for studies, series,
   * instances, and
   * frames](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#searching_for_studies_series_instances_and_frames).
   *
   * @param dicomWebPath The path of the SearchForInstancesRequest DICOMweb request. For example, `instances`, `series/{series_uid}/instances`, or `studies/{study_uid}/instances`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSearchForInstances(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * SearchForSeries returns a list of matching series. See [Search
   * Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6).
   * For details on the implementation of SearchForSeries, see [Search
   * transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call SearchForSeries, see [Searching for studies, series, instances,
   * and
   * frames](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#searching_for_studies_series_instances_and_frames).
   *
   * @param dicomWebPath The path of the SearchForSeries DICOMweb request. For example, `series` or `studies/{study_uid}/series`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSearchForSeries(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * DeleteSeries deletes all instances within the given study and series.
   * Delete requests are equivalent to the GET requests specified in the
   * Retrieve transaction. The method returns an Operation which will be marked
   * successful when the deletion is complete. Warning: Instances cannot be
   * inserted into a series that is being deleted by an operation until the
   * operation completes. For samples that show how to call DeleteSeries, see
   * [Deleting a study, series, or
   * instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#deleting_a_study_series_or_instance).
   *
   * @param dicomWebPath The path of the DeleteSeries request. For example, `studies/{study_uid}/series/{series_uid}`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesDelete(dicomWebPath: string, parent: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * DeleteInstance deletes an instance associated with the given study,
   * series, and SOP Instance UID. Delete requests are equivalent to the GET
   * requests specified in the Retrieve transaction. Study and series search
   * results can take a few seconds to be updated after an instance is deleted
   * using DeleteInstance. For samples that show how to call DeleteInstance, see
   * [Deleting a study, series, or
   * instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#deleting_a_study_series_or_instance).
   *
   * @param dicomWebPath The path of the DeleteInstance request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesInstancesDelete(dicomWebPath: string, parent: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * RetrieveFrames returns instances associated with the given study, series,
   * SOP Instance UID and frame numbers. See [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4}.
   * For details on the implementation of RetrieveFrames, see [DICOM
   * frames](https://cloud.google.com/healthcare/docs/dicom#dicom_frames) in the
   * Cloud Healthcare API conformance statement. For samples that show how to
   * call RetrieveFrames, see [Retrieving DICOM
   * data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_dicom_data).
   *
   * @param dicomWebPath The path of the RetrieveFrames DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/frames/{frame_list}`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRetrieveFrames(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * RetrieveRenderedFrames returns instances associated with the given study,
   * series, SOP Instance UID and frame numbers in an acceptable Rendered Media
   * Type. See [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveRenderedFrames, see [Rendered
   * resources](https://cloud.google.com/healthcare/docs/dicom#rendered_resources)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveRenderedFrames, see [Retrieving consumer image
   * formats](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_consumer_image_formats).
   *
   * @param dicomWebPath The path of the RetrieveRenderedFrames DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/frames/{frame_list}/rendered`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRetrieveRendered(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * RetrieveInstance returns instance associated with the given study, series,
   * and SOP Instance UID. See [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveInstance, see [DICOM
   * study/series/instances](https://cloud.google.com/healthcare/docs/dicom#dicom_studyseriesinstances)
   * and [DICOM
   * instances](https://cloud.google.com/healthcare/docs/dicom#dicom_instances)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveInstance, see [Retrieving an
   * instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_an_instance).
   *
   * @param dicomWebPath The path of the RetrieveInstance DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRetrieveInstance(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * RetrieveInstanceMetadata returns instance associated with the given study,
   * series, and SOP Instance UID presented as metadata with the bulk data
   * removed. See [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveInstanceMetadata, see
   * [Metadata
   * resources](https://cloud.google.com/healthcare/docs/dicom#metadata_resources)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveInstanceMetadata, see [Retrieving
   * metadata](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_metadata).
   *
   * @param dicomWebPath The path of the RetrieveInstanceMetadata DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/metadata`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRetrieveMetadata(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * RetrieveRenderedInstance returns instance associated with the given study,
   * series, and SOP Instance UID in an acceptable Rendered Media Type. See
   * [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveRenderedInstance, see
   * [Rendered
   * resources](https://cloud.google.com/healthcare/docs/dicom#rendered_resources)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveRenderedInstance, see [Retrieving consumer image
   * formats](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_consumer_image_formats).
   *
   * @param dicomWebPath The path of the RetrieveRenderedInstance DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/rendered`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRetrieveRendered(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * RetrieveSeriesMetadata returns instance associated with the given study
   * and series, presented as metadata with the bulk data removed. See
   * [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveSeriesMetadata, see [Metadata
   * resources](https://cloud.google.com/healthcare/docs/dicom#metadata_resources)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveSeriesMetadata, see [Retrieving
   * metadata](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_metadata).
   *
   * @param dicomWebPath The path of the RetrieveSeriesMetadata DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/metadata`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesRetrieveMetadata(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * RetrieveSeries returns all instances within the given study and series.
   * See [RetrieveTransaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4).
   * For details on the implementation of RetrieveSeries, see [DICOM
   * study/series/instances](https://cloud.google.com/healthcare/docs/dicom#dicom_studyseriesinstances)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call RetrieveSeries, see [Retrieving DICOM
   * data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieving_dicom_data).
   *
   * @param dicomWebPath The path of the RetrieveSeries DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesRetrieveSeries(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * SearchForInstances returns a list of matching instances. See [Search
   * Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6).
   * For details on the implementation of SearchForInstances, see [Search
   * transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call SearchForInstances, see [Searching for studies, series,
   * instances, and
   * frames](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#searching_for_studies_series_instances_and_frames).
   *
   * @param dicomWebPath The path of the SearchForInstancesRequest DICOMweb request. For example, `instances`, `series/{series_uid}/instances`, or `studies/{study_uid}/instances`.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesSeriesSearchForInstances(dicomWebPath: string, parent: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * StoreInstances stores DICOM instances associated with study instance
   * unique identifiers (SUID). See [Store Transaction]
   * (http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5).
   * For details on the implementation of StoreInstances, see [Store
   * transaction](https://cloud.google.com/healthcare/docs/dicom#store_transaction)
   * in the Cloud Healthcare API conformance statement. For samples that show
   * how to call StoreInstances, see [Storing DICOM
   * data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#storing_dicom_data).
   *
   * @param dicomWebPath The path of the StoreInstances DICOMweb request. For example, `studies/[{study_uid}]`. Note that the `study_uid` is optional.
   * @param parent The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  async projectsLocationsDatasetsDicomStoresStudiesStoreInstances(dicomWebPath: string, parent: string, req: HttpBody): Promise<HttpBody> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dicomWeb/${ dicomWebPath }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHttpBody(data);
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
  async projectsLocationsDatasetsDicomStoresTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a new FHIR store within the parent dataset.
   *
   * @param parent The name of the dataset this FHIR store belongs to.
   */
  async projectsLocationsDatasetsFhirStoresCreate(parent: string, req: FhirStore, opts: ProjectsLocationsDatasetsFhirStoresCreateOptions = {}): Promise<FhirStore> {
    req = serializeFhirStore(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fhirStores`);
    if (opts.fhirStoreId !== undefined) {
      url.searchParams.append("fhirStoreId", String(opts.fhirStoreId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeFhirStore(data);
  }

  /**
   * De-identifies data from the source store and writes it to the destination
   * store. The metadata field type is OperationMetadata. If the request is
   * successful, the response field type is DeidentifyFhirStoreSummary. If
   * errors occur, error is set. Error details are also logged to Cloud Logging
   * (see [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   *
   * @param sourceStore Source FHIR store resource name. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   */
  async projectsLocationsDatasetsFhirStoresDeidentify(sourceStore: string, req: DeidentifyFhirStoreRequest): Promise<Operation> {
    req = serializeDeidentifyFhirStoreRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ sourceStore }:deidentify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the specified FHIR store and removes all resources within it.
   *
   * @param name The resource name of the FHIR store to delete.
   */
  async projectsLocationsDatasetsFhirStoresDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Export resources from the FHIR store to the specified destination. This
   * method returns an Operation that can be used to track the status of the
   * export by calling GetOperation. Immediate fatal errors appear in the error
   * field, errors are also logged to Cloud Logging (see [Viewing error logs in
   * Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   * Otherwise, when the operation finishes, a detailed response of type
   * ExportResourcesResponse is returned in the response field. The metadata
   * field type for this operation is OperationMetadata.
   *
   * @param name The name of the FHIR store to export resource from, in the format of `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   */
  async projectsLocationsDatasetsFhirStoresExport(name: string, req: ExportResourcesRequest): Promise<Operation> {
    req = serializeExportResourcesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the FHIR capability statement
   * ([STU3](http://hl7.org/implement/standards/fhir/STU3/capabilitystatement.html),
   * [R4](http://hl7.org/implement/standards/fhir/R4/capabilitystatement.html)),
   * or the [conformance
   * statement](http://hl7.org/implement/standards/fhir/DSTU2/conformance.html)
   * in the DSTU2 case for the store, which contains a description of
   * functionality supported by the server. Implements the FHIR standard
   * capabilities interaction
   * ([STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#capabilities),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#capabilities)),
   * or the [conformance
   * interaction](http://hl7.org/implement/standards/fhir/DSTU2/http.html#conformance)
   * in the DSTU2 case. On success, the response body contains a JSON-encoded
   * representation of a `CapabilityStatement` resource.
   *
   * @param name Name of the FHIR store to retrieve the capabilities for.
   */
  async projectsLocationsDatasetsFhirStoresFhirCapabilities(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/fhir/metadata`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Creates a FHIR resource. Implements the FHIR standard create interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#create),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#create),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#create)), which
   * creates a new resource with a server-assigned resource ID. The request body
   * must contain a JSON-encoded FHIR resource, and the request headers must
   * contain `Content-Type: application/fhir+json`. On success, the response
   * body contains a JSON-encoded representation of the resource as it was
   * created on the server, including the server-assigned resource ID and
   * version ID. Errors generated by the FHIR store contain a JSON-encoded
   * `OperationOutcome` resource describing the reason for the error. If the
   * request cannot be mapped to a valid API method on a FHIR store, a generic
   * GCP error might be returned instead. For samples that show how to call
   * `create`, see [Creating a FHIR
   * resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#creating_a_fhir_resource).
   *
   * @param parent The name of the FHIR store this resource belongs to.
   * @param type The FHIR resource type to create, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/resourcelist.html), [STU3](http://hl7.org/implement/standards/fhir/STU3/resourcelist.html), [R4](http://hl7.org/implement/standards/fhir/R4/resourcelist.html)). Must match the resource type in the provided content.
   */
  async projectsLocationsDatasetsFhirStoresFhirCreate(parent: string, type: string, req: HttpBody): Promise<HttpBody> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fhir/${ type }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * Deletes a FHIR resource. Implements the FHIR standard delete interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#delete),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#delete),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#delete)). Note:
   * Unless resource versioning is disabled by setting the
   * disable_resource_versioning flag on the FHIR store, the deleted resources
   * will be moved to a history repository that can still be retrieved through
   * vread and related methods, unless they are removed by the purge method. For
   * samples that show how to call `delete`, see [Deleting a FHIR
   * resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#deleting_a_fhir_resource).
   *
   * @param name The name of the resource to delete.
   */
  async projectsLocationsDatasetsFhirStoresFhirDelete(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Executes all the requests in the given Bundle. Implements the FHIR
   * standard batch/transaction interaction
   * ([DSTU2](https://hl7.org/implement/standards/fhir/DSTU2/http.html#transaction),
   * [STU3](https://hl7.org/implement/standards/fhir/STU3/http.html#transaction),
   * [R4](https://hl7.org/implement/standards/fhir/R4/http.html#transaction)).
   * Supports all interactions within a bundle, except search. This method
   * accepts Bundles of type `batch` and `transaction`, processing them
   * according to the batch processing rules
   * ([DSTU2](https://hl7.org/implement/standards/fhir/DSTU2/http.html#2.1.0.16.1),
   * [STU3](https://hl7.org/implement/standards/fhir/STU3/http.html#2.21.0.17.1),
   * [R4](https://hl7.org/implement/standards/fhir/R4/http.html#brules)) and
   * transaction processing rules
   * ([DSTU2](https://hl7.org/implement/standards/fhir/DSTU2/http.html#2.1.0.16.2),
   * [STU3](https://hl7.org/implement/standards/fhir/STU3/http.html#2.21.0.17.2),
   * [R4](https://hl7.org/implement/standards/fhir/R4/http.html#trules)). The
   * request body must contain a JSON-encoded FHIR `Bundle` resource, and the
   * request headers must contain `Content-Type: application/fhir+json`. For a
   * batch bundle or a successful transaction, the response body contains a
   * JSON-encoded representation of a `Bundle` resource of type `batch-response`
   * or `transaction-response` containing one entry for each entry in the
   * request, with the outcome of processing the entry. In the case of an error
   * for a transaction bundle, the response body contains a JSON-encoded
   * `OperationOutcome` resource describing the reason for the error. If the
   * request cannot be mapped to a valid API method on a FHIR store, a generic
   * GCP error might be returned instead. This method checks permissions for
   * each request in the bundle. The `executeBundle` permission is required to
   * call this method, but you must also grant sufficient permissions to execute
   * the individual requests in the bundle. For example, if the bundle contains
   * a request to create a FHIR resource, the caller must also have been granted
   * the `healthcare.fhirResources.create` permission. You can use audit logs to
   * view the permissions for `executeBundle` and each request in the bundle.
   * For more information, see [Viewing Cloud Audit
   * logs](https://cloud.google.com/healthcare-api/docs/how-tos/audit-logging).
   * For samples that show how to call `executeBundle`, see [Managing FHIR
   * resources using FHIR
   * bundles](https://cloud.google.com/healthcare/docs/how-tos/fhir-bundles).
   *
   * @param parent Name of the FHIR store in which this bundle will be executed.
   */
  async projectsLocationsDatasetsFhirStoresFhirExecuteBundle(parent: string, req: HttpBody): Promise<HttpBody> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fhir`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * Lists all the versions of a resource (including the current version and
   * deleted versions) from the FHIR store. Implements the per-resource form of
   * the FHIR standard history interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#history),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#history),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#history)). On
   * success, the response body contains a JSON-encoded representation of a
   * `Bundle` resource of type `history`, containing the version history sorted
   * from most recent to oldest versions. Errors generated by the FHIR store
   * contain a JSON-encoded `OperationOutcome` resource describing the reason
   * for the error. If the request cannot be mapped to a valid API method on a
   * FHIR store, a generic GCP error might be returned instead. For samples that
   * show how to call `history`, see [Listing FHIR resource
   * versions](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#listing_fhir_resource_versions).
   *
   * @param name The name of the resource to retrieve.
   */
  async projectsLocationsDatasetsFhirStoresFhirHistory(name: string, opts: ProjectsLocationsDatasetsFhirStoresFhirHistoryOptions = {}): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/_history`);
    if (opts._at !== undefined) {
      url.searchParams.append("_at", String(opts._at));
    }
    if (opts._count !== undefined) {
      url.searchParams.append("_count", String(opts._count));
    }
    if (opts._page_token !== undefined) {
      url.searchParams.append("_page_token", String(opts._page_token));
    }
    if (opts._since !== undefined) {
      url.searchParams.append("_since", String(opts._since));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Updates part of an existing resource by applying the operations specified
   * in a [JSON Patch](http://jsonpatch.com/) document. Implements the FHIR
   * standard patch interaction
   * ([STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#patch),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#patch)). DSTU2
   * doesn't define a patch method, but the server supports it in the same way
   * it supports STU3. The request body must contain a JSON Patch document, and
   * the request headers must contain `Content-Type:
   * application/json-patch+json`. On success, the response body contains a
   * JSON-encoded representation of the updated resource, including the
   * server-assigned version ID. Errors generated by the FHIR store contain a
   * JSON-encoded `OperationOutcome` resource describing the reason for the
   * error. If the request cannot be mapped to a valid API method on a FHIR
   * store, a generic GCP error might be returned instead. For samples that show
   * how to call `patch`, see [Patching a FHIR
   * resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#patching_a_fhir_resource).
   *
   * @param name The name of the resource to update.
   */
  async projectsLocationsDatasetsFhirStoresFhirPatch(name: string, req: HttpBody): Promise<HttpBody> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * Retrieves a Patient resource and resources related to that patient.
   * Implements the FHIR extended operation Patient-everything
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/patient-operations.html#everything),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/patient-operations.html#everything),
   * [R4](http://hl7.org/implement/standards/fhir/R4/patient-operations.html#everything)).
   * On success, the response body contains a JSON-encoded representation of a
   * `Bundle` resource of type `searchset`, containing the results of the
   * operation. Errors generated by the FHIR store contain a JSON-encoded
   * `OperationOutcome` resource describing the reason for the error. If the
   * request cannot be mapped to a valid API method on a FHIR store, a generic
   * GCP error might be returned instead. The resources in scope for the
   * response are: * The patient resource itself. * All the resources directly
   * referenced by the patient resource. * Resources directly referencing the
   * patient resource that meet the inclusion criteria. The inclusion criteria
   * are based on the membership rules in the patient compartment definition
   * ([DSTU2](http://hl7.org/fhir/DSTU2/compartment-patient.html),
   * [STU3](http://www.hl7.org/fhir/stu3/compartmentdefinition-patient.html),
   * [R4](http://hl7.org/fhir/R4/compartmentdefinition-patient.html)), which
   * details the eligible resource types and referencing search parameters. For
   * samples that show how to call `Patient-everything`, see [Getting all
   * patient compartment
   * resources](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#getting_all_patient_compartment_resources).
   *
   * @param name Name of the `Patient` resource for which the information is required.
   */
  async projectsLocationsDatasetsFhirStoresFhirPatient-everything(name: string, opts: ProjectsLocationsDatasetsFhirStoresFhirPatient-everythingOptions = {}): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/$everything`);
    if (opts._count !== undefined) {
      url.searchParams.append("_count", String(opts._count));
    }
    if (opts._page_token !== undefined) {
      url.searchParams.append("_page_token", String(opts._page_token));
    }
    if (opts._since !== undefined) {
      url.searchParams.append("_since", String(opts._since));
    }
    if (opts._type !== undefined) {
      url.searchParams.append("_type", String(opts._type));
    }
    if (opts.end !== undefined) {
      url.searchParams.append("end", String(opts.end));
    }
    if (opts.start !== undefined) {
      url.searchParams.append("start", String(opts.start));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the contents of a FHIR resource. Implements the FHIR standard read
   * interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#read),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#read),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#read)). Also
   * supports the FHIR standard conditional read interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#cread),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#cread),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#cread)) specified
   * by supplying an `If-Modified-Since` header with a date/time value or an
   * `If-None-Match` header with an ETag value. On success, the response body
   * contains a JSON-encoded representation of the resource. Errors generated by
   * the FHIR store contain a JSON-encoded `OperationOutcome` resource
   * describing the reason for the error. If the request cannot be mapped to a
   * valid API method on a FHIR store, a generic GCP error might be returned
   * instead. For samples that show how to call `read`, see [Getting a FHIR
   * resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#getting_a_fhir_resource).
   *
   * @param name The name of the resource to retrieve.
   */
  async projectsLocationsDatasetsFhirStoresFhirRead(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Deletes all the historical versions of a resource (excluding the current
   * version) from the FHIR store. To remove all versions of a resource, first
   * delete the current version and then call this method. This is not a FHIR
   * standard operation. For samples that show how to call `Resource-purge`, see
   * [Deleting historical versions of a FHIR
   * resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#deleting_historical_versions_of_a_fhir_resource).
   *
   * @param name The name of the resource to purge.
   */
  async projectsLocationsDatasetsFhirStoresFhirResource-purge(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/$purge`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Validates an input FHIR resource's conformance to its profiles and the
   * profiles configured on the FHIR store. Implements the FHIR extended
   * operation $validate
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/resource-operations.html#validate),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/resource-operations.html#validate),
   * or
   * [R4](http://hl7.org/implement/standards/fhir/R4/resource-operation-validate.html)).
   * The request body must contain a JSON-encoded FHIR resource, and the request
   * headers must contain `Content-Type: application/fhir+json`. The
   * `Parameters` input syntax is not supported. The `profile` query parameter
   * can be used to request that the resource only be validated against a
   * specific profile. If a profile with the given URL cannot be found in the
   * FHIR store then an error is returned. Errors generated by validation
   * contain a JSON-encoded `OperationOutcome` resource describing the reason
   * for the error. If the request cannot be mapped to a valid API method on a
   * FHIR store, a generic GCP error might be returned instead.
   *
   * @param parent The name of the FHIR store that holds the profiles being used for validation.
   * @param type The FHIR resource type of the resource being validated. For a complete list, see the FHIR Resource Index ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/resourcelist.html), [STU3](http://hl7.org/implement/standards/fhir/STU3/resourcelist.html), or [R4](http://hl7.org/implement/standards/fhir/R4/resourcelist.html)). Must match the resource type in the provided content.
   */
  async projectsLocationsDatasetsFhirStoresFhirResource-validate(parent: string, type: string, req: HttpBody, opts: ProjectsLocationsDatasetsFhirStoresFhirResource-validateOptions = {}): Promise<HttpBody> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fhir/${ type }/$validate`);
    if (opts.profile !== undefined) {
      url.searchParams.append("profile", String(opts.profile));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * Searches for resources in the given FHIR store according to criteria
   * specified as query parameters. Implements the FHIR standard search
   * interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#search),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#search),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#search)) using
   * the search semantics described in the FHIR Search specification
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/search.html),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/search.html),
   * [R4](http://hl7.org/implement/standards/fhir/R4/search.html)). Supports
   * four methods of search defined by the specification: * `GET
   * [base]?[parameters]` to search across all resources. * `GET
   * [base]/[type]?[parameters]` to search resources of a specified type. *
   * `POST [base]/_search?[parameters]` as an alternate form having the same
   * semantics as the `GET` method across all resources. * `POST
   * [base]/[type]/_search?[parameters]` as an alternate form having the same
   * semantics as the `GET` method for the specified type. The `GET` and `POST`
   * methods do not support compartment searches. The `POST` method does not
   * support `application/x-www-form-urlencoded` search parameters. On success,
   * the response body contains a JSON-encoded representation of a `Bundle`
   * resource of type `searchset`, containing the results of the search. Errors
   * generated by the FHIR store contain a JSON-encoded `OperationOutcome`
   * resource describing the reason for the error. If the request cannot be
   * mapped to a valid API method on a FHIR store, a generic GCP error might be
   * returned instead. The server's capability statement, retrieved through
   * capabilities, indicates what search parameters are supported on each FHIR
   * resource. A list of all search parameters defined by the specification can
   * be found in the FHIR Search Parameter Registry
   * ([STU3](http://hl7.org/implement/standards/fhir/STU3/searchparameter-registry.html),
   * [R4](http://hl7.org/implement/standards/fhir/R4/searchparameter-registry.html)).
   * FHIR search parameters for DSTU2 can be found on each resource's definition
   * page. Supported search modifiers: `:missing`, `:exact`, `:contains`,
   * `:text`, `:in`, `:not-in`, `:above`, `:below`, `:[type]`, `:not`, and
   * `recurse` (DSTU2 and STU3) or `:iterate` (R4). Supported search result
   * parameters: `_sort`, `_count`, `_include`, `_revinclude`, `_summary=text`,
   * `_summary=data`, and `_elements`. The maximum number of search results
   * returned defaults to 100, which can be overridden by the `_count` parameter
   * up to a maximum limit of 1000. If there are additional results, the
   * returned `Bundle` contains a link of `relation` "next", which has a
   * `_page_token` parameter for an opaque pagination token that can be used to
   * retrieve the next page. Resources with a total size larger than 5MB or a
   * field count larger than 50,000 might not be fully searchable as the server
   * might trim its generated search index in those cases. Note: FHIR resources
   * are indexed asynchronously, so there might be a slight delay between the
   * time a resource is created or changes and when the change is reflected in
   * search results. For samples and detailed information, see [Searching for
   * FHIR
   * resources](https://cloud.google.com/healthcare/docs/how-tos/fhir-search)
   * and [Advanced FHIR search
   * features](https://cloud.google.com/healthcare/docs/how-tos/fhir-advanced-search).
   *
   * @param parent Name of the FHIR store to retrieve resources from.
   */
  async projectsLocationsDatasetsFhirStoresFhirSearch(parent: string, req: SearchResourcesRequest): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fhir/_search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * Searches for resources in the given FHIR store according to criteria
   * specified as query parameters. Implements the FHIR standard search
   * interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#search),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#search),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#search)) using
   * the search semantics described in the FHIR Search specification
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/search.html),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/search.html),
   * [R4](http://hl7.org/implement/standards/fhir/R4/search.html)). Supports
   * four methods of search defined by the specification: * `GET
   * [base]?[parameters]` to search across all resources. * `GET
   * [base]/[type]?[parameters]` to search resources of a specified type. *
   * `POST [base]/_search?[parameters]` as an alternate form having the same
   * semantics as the `GET` method across all resources. * `POST
   * [base]/[type]/_search?[parameters]` as an alternate form having the same
   * semantics as the `GET` method for the specified type. The `GET` and `POST`
   * methods do not support compartment searches. The `POST` method does not
   * support `application/x-www-form-urlencoded` search parameters. On success,
   * the response body contains a JSON-encoded representation of a `Bundle`
   * resource of type `searchset`, containing the results of the search. Errors
   * generated by the FHIR store contain a JSON-encoded `OperationOutcome`
   * resource describing the reason for the error. If the request cannot be
   * mapped to a valid API method on a FHIR store, a generic GCP error might be
   * returned instead. The server's capability statement, retrieved through
   * capabilities, indicates what search parameters are supported on each FHIR
   * resource. A list of all search parameters defined by the specification can
   * be found in the FHIR Search Parameter Registry
   * ([STU3](http://hl7.org/implement/standards/fhir/STU3/searchparameter-registry.html),
   * [R4](http://hl7.org/implement/standards/fhir/R4/searchparameter-registry.html)).
   * FHIR search parameters for DSTU2 can be found on each resource's definition
   * page. Supported search modifiers: `:missing`, `:exact`, `:contains`,
   * `:text`, `:in`, `:not-in`, `:above`, `:below`, `:[type]`, `:not`, and
   * `recurse` (DSTU2 and STU3) or `:iterate` (R4). Supported search result
   * parameters: `_sort`, `_count`, `_include`, `_revinclude`, `_summary=text`,
   * `_summary=data`, and `_elements`. The maximum number of search results
   * returned defaults to 100, which can be overridden by the `_count` parameter
   * up to a maximum limit of 1000. If there are additional results, the
   * returned `Bundle` contains a link of `relation` "next", which has a
   * `_page_token` parameter for an opaque pagination token that can be used to
   * retrieve the next page. Resources with a total size larger than 5MB or a
   * field count larger than 50,000 might not be fully searchable as the server
   * might trim its generated search index in those cases. Note: FHIR resources
   * are indexed asynchronously, so there might be a slight delay between the
   * time a resource is created or changes and when the change is reflected in
   * search results. For samples and detailed information, see [Searching for
   * FHIR
   * resources](https://cloud.google.com/healthcare/docs/how-tos/fhir-search)
   * and [Advanced FHIR search
   * features](https://cloud.google.com/healthcare/docs/how-tos/fhir-advanced-search).
   *
   * @param parent Name of the FHIR store to retrieve resources from.
   * @param resourceType The FHIR resource type to search, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/resourcelist.html), [STU3](http://hl7.org/implement/standards/fhir/STU3/resourcelist.html), [R4](http://hl7.org/implement/standards/fhir/R4/resourcelist.html)).
   */
  async projectsLocationsDatasetsFhirStoresFhirSearch-type(parent: string, resourceType: string, req: SearchResourcesRequest): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fhir/${ resourceType }/_search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * Updates the entire contents of a resource. Implements the FHIR standard
   * update interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#update),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#update),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#update)). If the
   * specified resource does not exist and the FHIR store has
   * enable_update_create set, creates the resource with the client-specified
   * ID. It is strongly advised not to include or encode any sensitive data such
   * as patient identifiers in client-specified resource IDs. Those IDs are part
   * of the FHIR resource path recorded in Cloud Audit Logs and Pub/Sub
   * notifications. Those IDs can also be contained in reference fields within
   * other resources. The request body must contain a JSON-encoded FHIR
   * resource, and the request headers must contain `Content-Type:
   * application/fhir+json`. The resource must contain an `id` element having an
   * identical value to the ID in the REST path of the request. On success, the
   * response body contains a JSON-encoded representation of the updated
   * resource, including the server-assigned version ID. Errors generated by the
   * FHIR store contain a JSON-encoded `OperationOutcome` resource describing
   * the reason for the error. If the request cannot be mapped to a valid API
   * method on a FHIR store, a generic GCP error might be returned instead. For
   * samples that show how to call `update`, see [Updating a FHIR
   * resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#updating_a_fhir_resource).
   *
   * @param name The name of the resource to update.
   */
  async projectsLocationsDatasetsFhirStoresFhirUpdate(name: string, req: HttpBody): Promise<HttpBody> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the contents of a version (current or historical) of a FHIR resource
   * by version ID. Implements the FHIR standard vread interaction
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/http.html#vread),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/http.html#vread),
   * [R4](http://hl7.org/implement/standards/fhir/R4/http.html#vread)). On
   * success, the response body contains a JSON-encoded representation of the
   * resource. Errors generated by the FHIR store contain a JSON-encoded
   * `OperationOutcome` resource describing the reason for the error. If the
   * request cannot be mapped to a valid API method on a FHIR store, a generic
   * GCP error might be returned instead. For samples that show how to call
   * `vread`, see [Retrieving a FHIR resource
   * version](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#retrieving_a_fhir_resource_version).
   *
   * @param name The name of the resource version to retrieve.
   */
  async projectsLocationsDatasetsFhirStoresFhirVread(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the configuration of the specified FHIR store.
   *
   * @param name The resource name of the FHIR store to get.
   */
  async projectsLocationsDatasetsFhirStoresGet(name: string): Promise<FhirStore> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFhirStore(data);
  }

  /**
   * Gets metrics associated with the FHIR store.
   *
   * @param name The resource name of the FHIR store to get metrics for.
   */
  async projectsLocationsDatasetsFhirStoresGetFHIRStoreMetrics(name: string): Promise<FhirStoreMetrics> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getFHIRStoreMetrics`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFhirStoreMetrics(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsFhirStoresGetIamPolicy(resource: string, opts: ProjectsLocationsDatasetsFhirStoresGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Imports resources to the FHIR store by loading data from the specified
   * sources. This method is optimized to load large quantities of data using
   * import semantics that ignore some FHIR store configuration options and are
   * not suitable for all use cases. It is primarily intended to load data into
   * an empty FHIR store that is not being used by other clients. In cases where
   * this method is not appropriate, consider using ExecuteBundle to load data.
   * Every resource in the input must contain a client-supplied ID. Each
   * resource is stored using the supplied ID regardless of the
   * enable_update_create setting on the FHIR store. It is strongly advised not
   * to include or encode any sensitive data such as patient identifiers in
   * client-specified resource IDs. Those IDs are part of the FHIR resource path
   * recorded in Cloud Audit Logs and Cloud Pub/Sub notifications. Those IDs can
   * also be contained in reference fields within other resources. The import
   * process does not enforce referential integrity, regardless of the
   * disable_referential_integrity setting on the FHIR store. This allows the
   * import of resources with arbitrary interdependencies without considering
   * grouping or ordering, but if the input data contains invalid references or
   * if some resources fail to be imported, the FHIR store might be left in a
   * state that violates referential integrity. The import process does not
   * trigger Pub/Sub notification or BigQuery streaming update, regardless of
   * how those are configured on the FHIR store. If a resource with the
   * specified ID already exists, the most recent version of the resource is
   * overwritten without creating a new historical version, regardless of the
   * disable_resource_versioning setting on the FHIR store. If transient
   * failures occur during the import, it's possible that successfully imported
   * resources will be overwritten more than once. The import operation is
   * idempotent unless the input data contains multiple valid resources with the
   * same ID but different contents. In that case, after the import completes,
   * the store contains exactly one resource with that ID but there is no
   * ordering guarantee on which version of the contents it will have. The
   * operation result counters do not count duplicate IDs as an error and count
   * one success for each resource in the input, which might result in a success
   * count larger than the number of resources in the FHIR store. This often
   * occurs when importing data organized in bundles produced by
   * Patient-everything where each bundle contains its own copy of a resource
   * such as Practitioner that might be referred to by many patients. If some
   * resources fail to import, for example due to parsing errors, successfully
   * imported resources are not rolled back. The location and format of the
   * input data is specified by the parameters in ImportResourcesRequest. Note
   * that if no format is specified, this method assumes the `BUNDLE` format.
   * When using the `BUNDLE` format this method ignores the `Bundle.type` field,
   * except that `history` bundles are rejected, and does not apply any of the
   * bundle processing semantics for batch or transaction bundles. Unlike in
   * ExecuteBundle, transaction bundles are not executed as a single transaction
   * and bundle-internal references are not rewritten. The bundle is treated as
   * a collection of resources to be written as provided in
   * `Bundle.entry.resource`, ignoring `Bundle.entry.request`. As an example,
   * this allows the import of `searchset` bundles produced by a FHIR search or
   * Patient-everything operation. This method returns an Operation that can be
   * used to track the status of the import by calling GetOperation. Immediate
   * fatal errors appear in the error field, errors are also logged to Cloud
   * Logging (see [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   * Otherwise, when the operation finishes, a detailed response of type
   * ImportResourcesResponse is returned in the response field. The metadata
   * field type for this operation is OperationMetadata.
   *
   * @param name The name of the FHIR store to import FHIR resources to, in the format of `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   */
  async projectsLocationsDatasetsFhirStoresImport(name: string, req: ImportResourcesRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists the FHIR stores in the given dataset.
   *
   * @param parent Name of the dataset.
   */
  async projectsLocationsDatasetsFhirStoresList(parent: string, opts: ProjectsLocationsDatasetsFhirStoresListOptions = {}): Promise<ListFhirStoresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fhirStores`);
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
    return deserializeListFhirStoresResponse(data);
  }

  /**
   * Updates the configuration of the specified FHIR store.
   *
   * @param name Output only. Resource name of the FHIR store, of the form `projects/{project_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   */
  async projectsLocationsDatasetsFhirStoresPatch(name: string, req: FhirStore, opts: ProjectsLocationsDatasetsFhirStoresPatchOptions = {}): Promise<FhirStore> {
    req = serializeFhirStore(req);
    opts = serializeProjectsLocationsDatasetsFhirStoresPatchOptions(opts);
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
    return deserializeFhirStore(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsFhirStoresSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsDatasetsFhirStoresTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Gets any metadata associated with a dataset.
   *
   * @param name The name of the dataset to read. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`.
   */
  async projectsLocationsDatasetsGet(name: string): Promise<Dataset> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Dataset;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsGetIamPolicy(resource: string, opts: ProjectsLocationsDatasetsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Creates a new HL7v2 store within the parent dataset.
   *
   * @param parent The name of the dataset this HL7v2 store belongs to.
   */
  async projectsLocationsDatasetsHl7V2StoresCreate(parent: string, req: Hl7V2Store, opts: ProjectsLocationsDatasetsHl7V2StoresCreateOptions = {}): Promise<Hl7V2Store> {
    req = serializeHl7V2Store(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hl7V2Stores`);
    if (opts.hl7V2StoreId !== undefined) {
      url.searchParams.append("hl7V2StoreId", String(opts.hl7V2StoreId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeHl7V2Store(data);
  }

  /**
   * Deletes the specified HL7v2 store and removes all messages that it
   * contains.
   *
   * @param name The resource name of the HL7v2 store to delete.
   */
  async projectsLocationsDatasetsHl7V2StoresDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Exports the messages to a destination. To filter messages to be exported,
   * define a filter using the start and end time, relative to the message
   * generation time (MSH.7). This API returns an Operation that can be used to
   * track the status of the job by calling GetOperation. Immediate fatal errors
   * appear in the error field. Otherwise, when the operation finishes, a
   * detailed response of type ExportMessagesResponse is returned in the
   * response field. The metadata field type for this operation is
   * OperationMetadata.
   *
   * @param name The name of the source HL7v2 store, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7v2Stores/{hl7v2_store_id}`
   */
  async projectsLocationsDatasetsHl7V2StoresExport(name: string, req: ExportMessagesRequest): Promise<Operation> {
    req = serializeExportMessagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the specified HL7v2 store.
   *
   * @param name The resource name of the HL7v2 store to get.
   */
  async projectsLocationsDatasetsHl7V2StoresGet(name: string): Promise<Hl7V2Store> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHl7V2Store(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsHl7V2StoresGetIamPolicy(resource: string, opts: ProjectsLocationsDatasetsHl7V2StoresGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Import messages to the HL7v2 store by loading data from the specified
   * sources. This method is optimized to load large quantities of data using
   * import semantics that ignore some HL7v2 store configuration options and are
   * not suitable for all use cases. It is primarily intended to load data into
   * an empty HL7v2 store that is not being used by other clients. An existing
   * message will be overwritten if a duplicate message is imported. A duplicate
   * message is a message with the same raw bytes as a message that already
   * exists in this HL7v2 store. When a message is overwritten, its labels will
   * also be overwritten. The import operation is idempotent unless the input
   * data contains multiple valid messages with the same raw bytes but different
   * labels. In that case, after the import completes, the store contains
   * exactly one message with those raw bytes but there is no ordering guarantee
   * on which version of the labels it has. The operation result counters do not
   * count duplicated raw bytes as an error and count one success for each
   * message in the input, which might result in a success count larger than the
   * number of messages in the HL7v2 store. If some messages fail to import, for
   * example due to parsing errors, successfully imported messages are not
   * rolled back. This method returns an Operation that can be used to track the
   * status of the import by calling GetOperation. Immediate fatal errors appear
   * in the error field, errors are also logged to Cloud Logging (see [Viewing
   * error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   * Otherwise, when the operation finishes, a response of type
   * ImportMessagesResponse is returned in the response field. The metadata
   * field type for this operation is OperationMetadata.
   *
   * @param name The name of the target HL7v2 store, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7v2Stores/{hl7v2_store_id}`
   */
  async projectsLocationsDatasetsHl7V2StoresImport(name: string, req: ImportMessagesRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists the HL7v2 stores in the given dataset.
   *
   * @param parent Name of the dataset.
   */
  async projectsLocationsDatasetsHl7V2StoresList(parent: string, opts: ProjectsLocationsDatasetsHl7V2StoresListOptions = {}): Promise<ListHl7V2StoresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/hl7V2Stores`);
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
    return deserializeListHl7V2StoresResponse(data);
  }

  /**
   * Parses and stores an HL7v2 message. This method triggers an asynchronous
   * notification to any Pub/Sub topic configured in
   * Hl7V2Store.Hl7V2NotificationConfig, if the filtering matches the message.
   * If an MLLP adapter is configured to listen to a Pub/Sub topic, the adapter
   * transmits the message when a notification is received.
   *
   * @param parent The name of the dataset this message belongs to.
   */
  async projectsLocationsDatasetsHl7V2StoresMessagesCreate(parent: string, req: CreateMessageRequest): Promise<Message> {
    req = serializeCreateMessageRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/messages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMessage(data);
  }

  /**
   * Deletes an HL7v2 message.
   *
   * @param name The resource name of the HL7v2 message to delete.
   */
  async projectsLocationsDatasetsHl7V2StoresMessagesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an HL7v2 message.
   *
   * @param name The resource name of the HL7v2 message to retrieve.
   */
  async projectsLocationsDatasetsHl7V2StoresMessagesGet(name: string, opts: ProjectsLocationsDatasetsHl7V2StoresMessagesGetOptions = {}): Promise<Message> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMessage(data);
  }

  /**
   * Parses and stores an HL7v2 message. This method triggers an asynchronous
   * notification to any Pub/Sub topic configured in
   * Hl7V2Store.Hl7V2NotificationConfig, if the filtering matches the message.
   * If an MLLP adapter is configured to listen to a Pub/Sub topic, the adapter
   * transmits the message when a notification is received. If the method is
   * successful, it generates a response containing an HL7v2 acknowledgment
   * (`ACK`) message. If the method encounters an error, it returns a negative
   * acknowledgment (`NACK`) message. This behavior is suitable for replying to
   * HL7v2 interface systems that expect these acknowledgments.
   *
   * @param parent The name of the HL7v2 store this message belongs to.
   */
  async projectsLocationsDatasetsHl7V2StoresMessagesIngest(parent: string, req: IngestMessageRequest): Promise<IngestMessageResponse> {
    req = serializeIngestMessageRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/messages:ingest`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeIngestMessageResponse(data);
  }

  /**
   * Lists all the messages in the given HL7v2 store with support for
   * filtering. Note: HL7v2 messages are indexed asynchronously, so there might
   * be a slight delay between the time a message is created and when it can be
   * found through a filter.
   *
   * @param parent Name of the HL7v2 store to retrieve messages from.
   */
  async projectsLocationsDatasetsHl7V2StoresMessagesList(parent: string, opts: ProjectsLocationsDatasetsHl7V2StoresMessagesListOptions = {}): Promise<ListMessagesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/messages`);
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
    return deserializeListMessagesResponse(data);
  }

  /**
   * Update the message. The contents of the message in Message.data and data
   * extracted from the contents such as Message.create_time cannot be altered.
   * Only the Message.labels field is allowed to be updated. The labels in the
   * request are merged with the existing set of labels. Existing labels with
   * the same keys are updated.
   *
   * @param name Resource name of the Message, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`. Assigned by the server.
   */
  async projectsLocationsDatasetsHl7V2StoresMessagesPatch(name: string, req: Message, opts: ProjectsLocationsDatasetsHl7V2StoresMessagesPatchOptions = {}): Promise<Message> {
    req = serializeMessage(req);
    opts = serializeProjectsLocationsDatasetsHl7V2StoresMessagesPatchOptions(opts);
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
    return deserializeMessage(data);
  }

  /**
   * Updates the HL7v2 store.
   *
   * @param name Resource name of the HL7v2 store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`.
   */
  async projectsLocationsDatasetsHl7V2StoresPatch(name: string, req: Hl7V2Store, opts: ProjectsLocationsDatasetsHl7V2StoresPatchOptions = {}): Promise<Hl7V2Store> {
    req = serializeHl7V2Store(req);
    opts = serializeProjectsLocationsDatasetsHl7V2StoresPatchOptions(opts);
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
    return deserializeHl7V2Store(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsHl7V2StoresSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsDatasetsHl7V2StoresTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Lists the health datasets in the current project.
   *
   * @param parent The name of the project whose datasets should be listed. For example, `projects/{project_id}/locations/{location_id}`.
   */
  async projectsLocationsDatasetsList(parent: string, opts: ProjectsLocationsDatasetsListOptions = {}): Promise<ListDatasetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/datasets`);
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
    return data as ListDatasetsResponse;
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
  async projectsLocationsDatasetsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsDatasetsOperationsGet(name: string): Promise<Operation> {
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
  async projectsLocationsDatasetsOperationsList(name: string, opts: ProjectsLocationsDatasetsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
   * Updates dataset metadata.
   *
   * @param name Resource name of the dataset, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`.
   */
  async projectsLocationsDatasetsPatch(name: string, req: Dataset, opts: ProjectsLocationsDatasetsPatchOptions = {}): Promise<Dataset> {
    opts = serializeProjectsLocationsDatasetsPatchOptions(opts);
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
    return data as Dataset;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDatasetsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsDatasetsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Analyze heathcare entity in a document. Its response includes the
   * recognized entity mentions and the relationships between them.
   * AnalyzeEntities uses context aware models to detect entities.
   *
   * @param nlpService The resource name of the service of the form: "projects/{project_id}/locations/{location_id}/services/nlp".
   */
  async projectsLocationsServicesNlpAnalyzeEntities(nlpService: string, req: AnalyzeEntitiesRequest): Promise<AnalyzeEntitiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ nlpService }:analyzeEntities`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AnalyzeEntitiesResponse;
  }
}

/**
 * Activates the latest revision of the specified Consent by committing a new
 * revision with `state` updated to `ACTIVE`. If the latest revision of the
 * given Consent is in the `ACTIVE` state, no new revision is committed. A
 * FAILED_PRECONDITION error occurs if the latest revision of the given consent
 * is in the `REJECTED` or `REVOKED` state.
 */
export interface ActivateConsentRequest {
  /**
   * Required. The resource name of the Consent artifact that contains
   * documentation of the user's consent, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`.
   * If the draft Consent had a Consent artifact, this Consent artifact
   * overwrites it.
   */
  consentArtifact?: string;
  /**
   * Timestamp in UTC of when this Consent is considered expired.
   */
  expireTime?: Date;
  /**
   * The time to live for this Consent from when it is marked as active.
   */
  ttl?: number /* Duration */;
}

function serializeActivateConsentRequest(data: any): ActivateConsentRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeActivateConsentRequest(data: any): ActivateConsentRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * The request to analyze healthcare entities in a document.
 */
export interface AnalyzeEntitiesRequest {
  /**
   * document_content is a document to be annotated.
   */
  documentContent?: string;
  /**
   * A list of licensed vocabularies to use in the request, in addition to the
   * default unlicensed vocabularies.
   */
  licensedVocabularies?:  | "LICENSED_VOCABULARY_UNSPECIFIED" | "ICD10CM" | "SNOMEDCT_US"[];
}

/**
 * Includes recognized entity mentions and relationships between them.
 */
export interface AnalyzeEntitiesResponse {
  /**
   * The union of all the candidate entities that the entity_mentions in this
   * response could link to. These are UMLS concepts or normalized mention
   * content.
   */
  entities?: Entity[];
  /**
   * entity_mentions contains all the annotated medical entities that were
   * mentioned in the provided document.
   */
  entityMentions?: EntityMention[];
  /**
   * relationships contains all the binary relationships that were identified
   * between entity mentions within the provided document.
   */
  relationships?: EntityMentionRelationship[];
}

/**
 * Archives the specified User data mapping.
 */
export interface ArchiveUserDataMappingRequest {
}

/**
 * Archives the specified User data mapping.
 */
export interface ArchiveUserDataMappingResponse {
}

/**
 * An attribute value for a Consent or User data mapping. Each Attribute must
 * have a corresponding AttributeDefinition in the consent store that defines
 * the default and allowed values.
 */
export interface Attribute {
  /**
   * Indicates the name of an attribute defined in the consent store.
   */
  attributeDefinitionId?: string;
  /**
   * Required. The value of the attribute. Must be an acceptable value as
   * defined in the consent store. For example, if the consent store defines
   * "data type" with acceptable values "questionnaire" and "step-count", when
   * the attribute name is data type, this field must contain one of those
   * values.
   */
  values?: string[];
}

/**
 * A client-defined consent attribute.
 */
export interface AttributeDefinition {
  /**
   * Required. Possible values for the attribute. The number of allowed values
   * must not exceed 500. An empty list is invalid. The list can only be
   * expanded after creation.
   */
  allowedValues?: string[];
  /**
   * Required. The category of the attribute. The value of this field cannot be
   * changed after creation.
   */
  category?:  | "CATEGORY_UNSPECIFIED" | "RESOURCE" | "REQUEST";
  /**
   * Optional. Default values of the attribute in Consents. If no default
   * values are specified, it defaults to an empty value.
   */
  consentDefaultValues?: string[];
  /**
   * Optional. Default value of the attribute in User data mappings. If no
   * default value is specified, it defaults to an empty value. This field is
   * only applicable to attributes of the category `RESOURCE`.
   */
  dataMappingDefaultValue?: string;
  /**
   * Optional. A description of the attribute.
   */
  description?: string;
  /**
   * Resource name of the Attribute definition, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/attributeDefinitions/{attribute_definition_id}`.
   * Cannot be changed after creation.
   */
  name?: string;
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
 * Mask a string by replacing its characters with a fixed character.
 */
export interface CharacterMaskConfig {
  /**
   * Character to mask the sensitive values. If not supplied, defaults to "*".
   */
  maskingCharacter?: string;
}

/**
 * Checks if a particular data_id of a User data mapping in the given consent
 * store is consented for a given use.
 */
export interface CheckDataAccessRequest {
  /**
   * Optional. Specific Consents to evaluate the access request against. These
   * Consents must have the same `user_id` as the evaluated User data mapping,
   * must exist in the current `consent_store`, and have a `state` of either
   * `ACTIVE` or `DRAFT`. A maximum of 100 Consents can be provided here. If no
   * selection is specified, the access request is evaluated against all
   * `ACTIVE` unexpired Consents with the same `user_id` as the evaluated User
   * data mapping.
   */
  consentList?: ConsentList;
  /**
   * Required. The unique identifier of the resource to check access for. This
   * identifier must correspond to a User data mapping in the given consent
   * store.
   */
  dataId?: string;
  /**
   * The values of request attributes associated with this access request.
   */
  requestAttributes?: {
    [key: string]: string
  };
  /**
   * Optional. The view for CheckDataAccessResponse. If unspecified, defaults
   * to `BASIC` and returns `consented` as `TRUE` or `FALSE`.
   */
  responseView?:  | "RESPONSE_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Checks if a particular data_id of a User data mapping in the given consent
 * store is consented for a given use.
 */
export interface CheckDataAccessResponse {
  /**
   * The resource names of all evaluated Consents mapped to their evaluation.
   */
  consentDetails?: {
    [key: string]: ConsentEvaluation
  };
  /**
   * Whether the requested resource is consented for the given use.
   */
  consented?: boolean;
}

/**
 * Represents a user's consent.
 */
export interface Consent {
  /**
   * Required. The resource name of the Consent artifact that contains proof of
   * the end user's consent, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`.
   */
  consentArtifact?: string;
  /**
   * Timestamp in UTC of when this Consent is considered expired.
   */
  expireTime?: Date;
  /**
   * Optional. User-supplied key-value pairs used to organize Consent
   * resources. Metadata keys must: - be between 1 and 63 characters long - have
   * a UTF-8 encoding of maximum 128 bytes - begin with a letter - consist of up
   * to 63 characters including lowercase letters, numeric characters,
   * underscores, and dashes Metadata values must be: - be between 1 and 63
   * characters long - have a UTF-8 encoding of maximum 128 bytes - consist of
   * up to 63 characters including lowercase letters, numeric characters,
   * underscores, and dashes No more than 64 metadata entries can be associated
   * with a given consent.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Resource name of the Consent, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`.
   * Cannot be changed after creation.
   */
  name?: string;
  /**
   * Optional. Represents a user's consent in terms of the resources that can
   * be accessed and under what conditions.
   */
  policies?: GoogleCloudHealthcareV1ConsentPolicy[];
  /**
   * Output only. The timestamp that the revision was created.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. The revision ID of the Consent. The format is an 8-character
   * hexadecimal string. Refer to a specific revision of a Consent by appending
   * `@{revision_id}` to the Consent's resource name.
   */
  readonly revisionId?: string;
  /**
   * Required. Indicates the current state of this Consent.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "REVOKED" | "DRAFT" | "REJECTED";
  /**
   * Input only. The time to live for this Consent from when it is created.
   */
  ttl?: number /* Duration */;
  /**
   * Required. User's UUID provided by the client.
   */
  userId?: string;
}

function serializeConsent(data: any): Consent {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeConsent(data: any): Consent {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? new Date(data["revisionCreateTime"]) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * Documentation of a user's consent.
 */
export interface ConsentArtifact {
  /**
   * Optional. Screenshots, PDFs, or other binary information documenting the
   * user's consent.
   */
  consentContentScreenshots?: Image[];
  /**
   * Optional. An string indicating the version of the consent information
   * shown to the user.
   */
  consentContentVersion?: string;
  /**
   * Optional. A signature from a guardian.
   */
  guardianSignature?: Signature;
  /**
   * Optional. Metadata associated with the Consent artifact. For example, the
   * consent locale or user agent version.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Resource name of the Consent artifact, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`.
   * Cannot be changed after creation.
   */
  name?: string;
  /**
   * Required. User's UUID provided by the client.
   */
  userId?: string;
  /**
   * Optional. User's signature.
   */
  userSignature?: Signature;
  /**
   * Optional. A signature from a witness.
   */
  witnessSignature?: Signature;
}

function serializeConsentArtifact(data: any): ConsentArtifact {
  return {
    ...data,
    consentContentScreenshots: data["consentContentScreenshots"] !== undefined ? data["consentContentScreenshots"].map((item: any) => (serializeImage(item))) : undefined,
    guardianSignature: data["guardianSignature"] !== undefined ? serializeSignature(data["guardianSignature"]) : undefined,
    userSignature: data["userSignature"] !== undefined ? serializeSignature(data["userSignature"]) : undefined,
    witnessSignature: data["witnessSignature"] !== undefined ? serializeSignature(data["witnessSignature"]) : undefined,
  };
}

function deserializeConsentArtifact(data: any): ConsentArtifact {
  return {
    ...data,
    consentContentScreenshots: data["consentContentScreenshots"] !== undefined ? data["consentContentScreenshots"].map((item: any) => (deserializeImage(item))) : undefined,
    guardianSignature: data["guardianSignature"] !== undefined ? deserializeSignature(data["guardianSignature"]) : undefined,
    userSignature: data["userSignature"] !== undefined ? deserializeSignature(data["userSignature"]) : undefined,
    witnessSignature: data["witnessSignature"] !== undefined ? deserializeSignature(data["witnessSignature"]) : undefined,
  };
}

/**
 * The detailed evaluation of a particular Consent.
 */
export interface ConsentEvaluation {
  /**
   * The evaluation result.
   */
  evaluationResult?:  | "EVALUATION_RESULT_UNSPECIFIED" | "NOT_APPLICABLE" | "NO_MATCHING_POLICY" | "NO_SATISFIED_POLICY" | "HAS_SATISFIED_POLICY";
}

/**
 * List of resource names of Consent resources.
 */
export interface ConsentList {
  /**
   * The resource names of the Consents to evaluate against, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`.
   */
  consents?: string[];
}

/**
 * Represents a consent store.
 */
export interface ConsentStore {
  /**
   * Optional. Default time to live for Consents created in this store. Must be
   * at least 24 hours. Updating this field will not affect the expiration time
   * of existing consents.
   */
  defaultConsentTtl?: number /* Duration */;
  /**
   * Optional. If `true`, UpdateConsent creates the Consent if it does not
   * already exist. If unspecified, defaults to `false`.
   */
  enableConsentCreateOnUpdate?: boolean;
  /**
   * Optional. User-supplied key-value pairs used to organize consent stores.
   * Label keys must be between 1 and 63 characters long, have a UTF-8 encoding
   * of maximum 128 bytes, and must conform to the following PCRE regular
   * expression: \p{Ll}\p{Lo}{0,62}. Label values must be between 1 and 63
   * characters long, have a UTF-8 encoding of maximum 128 bytes, and must
   * conform to the following PCRE regular expression:
   * [\p{Ll}\p{Lo}\p{N}_-]{0,63}. No more than 64 labels can be associated with
   * a given store. For more information:
   * https://cloud.google.com/healthcare/docs/how-tos/labeling-resources
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Resource name of the consent store, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`.
   * Cannot be changed after creation.
   */
  name?: string;
}

function serializeConsentStore(data: any): ConsentStore {
  return {
    ...data,
    defaultConsentTtl: data["defaultConsentTtl"] !== undefined ? data["defaultConsentTtl"] : undefined,
  };
}

function deserializeConsentStore(data: any): ConsentStore {
  return {
    ...data,
    defaultConsentTtl: data["defaultConsentTtl"] !== undefined ? data["defaultConsentTtl"] : undefined,
  };
}

/**
 * Creates a new message.
 */
export interface CreateMessageRequest {
  /**
   * HL7v2 message.
   */
  message?: Message;
}

function serializeCreateMessageRequest(data: any): CreateMessageRequest {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeCreateMessageRequest(data: any): CreateMessageRequest {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

/**
 * Pseudonymization method that generates surrogates via cryptographic hashing.
 * Uses SHA-256. Outputs a base64-encoded representation of the hashed output
 * (for example, `L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=`).
 */
export interface CryptoHashConfig {
  /**
   * An AES 128/192/256 bit key. Causes the hash to be computed based on this
   * key. A default key is generated for each Deidentify operation and is used
   * when neither `crypto_key` nor `kms_wrapped` is specified. Must not be set
   * if `kms_wrapped` is set.
   */
  cryptoKey?: Uint8Array;
  /**
   * KMS wrapped key. Must not be set if `crypto_key` is set.
   */
  kmsWrapped?: KmsWrappedCryptoKey;
}

function serializeCryptoHashConfig(data: any): CryptoHashConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? encodeBase64(data["cryptoKey"]) : undefined,
    kmsWrapped: data["kmsWrapped"] !== undefined ? serializeKmsWrappedCryptoKey(data["kmsWrapped"]) : undefined,
  };
}

function deserializeCryptoHashConfig(data: any): CryptoHashConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? decodeBase64(data["cryptoKey"] as string) : undefined,
    kmsWrapped: data["kmsWrapped"] !== undefined ? deserializeKmsWrappedCryptoKey(data["kmsWrapped"]) : undefined,
  };
}

/**
 * A message representing a health dataset. A health dataset represents a
 * collection of healthcare data pertaining to one or more patients. This may
 * include multiple modalities of healthcare data, such as electronic medical
 * records or medical imaging data.
 */
export interface Dataset {
  /**
   * Resource name of the dataset, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`.
   */
  name?: string;
  /**
   * The default timezone used by this dataset. Must be a either a valid IANA
   * time zone name such as "America/New_York" or empty, which defaults to UTC.
   * This is used for parsing times in resources, such as HL7 messages, where no
   * explicit timezone is specified.
   */
  timeZone?: string;
}

/**
 * Shift a date forward or backward in time by a random amount which is
 * consistent for a given patient and crypto key combination.
 */
export interface DateShiftConfig {
  /**
   * An AES 128/192/256 bit key. The date shift is computed based on this key
   * and the patient ID. If the patient ID is empty for a DICOM resource, the
   * date shift is computed based on this key and the study instance UID. If
   * `crypto_key` is not set, then `kms_wrapped` is used to calculate the date
   * shift. If neither is set, a default key is generated for each de-identify
   * operation. Must not be set if `kms_wrapped` is set.
   */
  cryptoKey?: Uint8Array;
  /**
   * KMS wrapped key. If `kms_wrapped` is not set, then `crypto_key` is used to
   * calculate the date shift. If neither is set, a default key is generated for
   * each de-identify operation. Must not be set if `crypto_key` is set.
   */
  kmsWrapped?: KmsWrappedCryptoKey;
}

function serializeDateShiftConfig(data: any): DateShiftConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? encodeBase64(data["cryptoKey"]) : undefined,
    kmsWrapped: data["kmsWrapped"] !== undefined ? serializeKmsWrappedCryptoKey(data["kmsWrapped"]) : undefined,
  };
}

function deserializeDateShiftConfig(data: any): DateShiftConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? decodeBase64(data["cryptoKey"] as string) : undefined,
    kmsWrapped: data["kmsWrapped"] !== undefined ? deserializeKmsWrappedCryptoKey(data["kmsWrapped"]) : undefined,
  };
}

/**
 * Contains configuration for streaming de-identified FHIR export.
 */
export interface DeidentifiedStoreDestination {
  /**
   * The configuration to use when de-identifying resources that are added to
   * this store.
   */
  config?: DeidentifyConfig;
  /**
   * The full resource name of a Cloud Healthcare FHIR store, for example,
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   */
  store?: string;
}

function serializeDeidentifiedStoreDestination(data: any): DeidentifiedStoreDestination {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeDeidentifyConfig(data["config"]) : undefined,
  };
}

function deserializeDeidentifiedStoreDestination(data: any): DeidentifiedStoreDestination {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeDeidentifyConfig(data["config"]) : undefined,
  };
}

/**
 * Configures de-id options specific to different types of content. Each
 * submessage customizes the handling of an https://tools.ietf.org/html/rfc6838
 * media type or subtype. Configs are applied in a nested manner at runtime.
 */
export interface DeidentifyConfig {
  /**
   * Configures de-id of application/DICOM content.
   */
  dicom?: DicomConfig;
  /**
   * Configures de-id of application/FHIR content.
   */
  fhir?: FhirConfig;
  /**
   * Configures de-identification of image pixels wherever they are found in
   * the source_dataset.
   */
  image?: ImageConfig;
  /**
   * Configures de-identification of text wherever it is found in the
   * source_dataset.
   */
  text?: TextConfig;
}

function serializeDeidentifyConfig(data: any): DeidentifyConfig {
  return {
    ...data,
    text: data["text"] !== undefined ? serializeTextConfig(data["text"]) : undefined,
  };
}

function deserializeDeidentifyConfig(data: any): DeidentifyConfig {
  return {
    ...data,
    text: data["text"] !== undefined ? deserializeTextConfig(data["text"]) : undefined,
  };
}

/**
 * Redacts identifying information from the specified dataset.
 */
export interface DeidentifyDatasetRequest {
  /**
   * Deidentify configuration. Only one of `config` and `gcs_config_uri` can be
   * specified.
   */
  config?: DeidentifyConfig;
  /**
   * The name of the dataset resource to create and write the redacted data to.
   * * The destination dataset must not exist. * The destination dataset must be
   * in the same location as the source dataset. De-identifying data across
   * multiple locations is not supported.
   */
  destinationDataset?: string;
  /**
   * Cloud Storage location to read the JSON
   * cloud.healthcare.deidentify.DeidentifyConfig from, overriding the default
   * config. Must be of the form `gs://{bucket_id}/path/to/object`. The Cloud
   * Storage location must grant the Cloud IAM role `roles/storage.objectViewer`
   * to the project's Cloud Healthcare Service Agent service account. Only one
   * of `config` and `gcs_config_uri` can be specified.
   */
  gcsConfigUri?: string;
}

function serializeDeidentifyDatasetRequest(data: any): DeidentifyDatasetRequest {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeDeidentifyConfig(data["config"]) : undefined,
  };
}

function deserializeDeidentifyDatasetRequest(data: any): DeidentifyDatasetRequest {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeDeidentifyConfig(data["config"]) : undefined,
  };
}

/**
 * Creates a new DICOM store with sensitive information de-identified.
 */
export interface DeidentifyDicomStoreRequest {
  /**
   * Deidentify configuration. Only one of `config` and `gcs_config_uri` can be
   * specified.
   */
  config?: DeidentifyConfig;
  /**
   * The name of the DICOM store to create and write the redacted data to. For
   * example,
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   * * The destination dataset must exist. * The source dataset and destination
   * dataset must both reside in the same location. De-identifying data across
   * multiple locations is not supported. * The destination DICOM store must not
   * exist. * The caller must have the necessary permissions to create the
   * destination DICOM store.
   */
  destinationStore?: string;
  /**
   * Filter configuration.
   */
  filterConfig?: DicomFilterConfig;
  /**
   * Cloud Storage location to read the JSON
   * cloud.healthcare.deidentify.DeidentifyConfig from, overriding the default
   * config. Must be of the form `gs://{bucket_id}/path/to/object`. The Cloud
   * Storage location must grant the Cloud IAM role `roles/storage.objectViewer`
   * to the project's Cloud Healthcare Service Agent service account. Only one
   * of `config` and `gcs_config_uri` can be specified.
   */
  gcsConfigUri?: string;
}

function serializeDeidentifyDicomStoreRequest(data: any): DeidentifyDicomStoreRequest {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeDeidentifyConfig(data["config"]) : undefined,
  };
}

function deserializeDeidentifyDicomStoreRequest(data: any): DeidentifyDicomStoreRequest {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeDeidentifyConfig(data["config"]) : undefined,
  };
}

/**
 * Creates a new FHIR store with sensitive information de-identified.
 */
export interface DeidentifyFhirStoreRequest {
  /**
   * Deidentify configuration. Only one of `config` and `gcs_config_uri` can be
   * specified.
   */
  config?: DeidentifyConfig;
  /**
   * The name of the FHIR store to create and write the redacted data to. For
   * example,
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   * * The destination dataset must exist. * The source dataset and destination
   * dataset must both reside in the same location. De-identifying data across
   * multiple locations is not supported. * The destination FHIR store must
   * exist. * The caller must have the healthcare.fhirResources.update
   * permission to write to the destination FHIR store.
   */
  destinationStore?: string;
  /**
   * Cloud Storage location to read the JSON
   * cloud.healthcare.deidentify.DeidentifyConfig from, overriding the default
   * config. Must be of the form `gs://{bucket_id}/path/to/object`. The Cloud
   * Storage location must grant the Cloud IAM role `roles/storage.objectViewer`
   * to the project's Cloud Healthcare Service Agent service account. Only one
   * of `config` and `gcs_config_uri` can be specified.
   */
  gcsConfigUri?: string;
  /**
   * A filter specifying the resources to include in the output. If not
   * specified, all resources are included in the output.
   */
  resourceFilter?: FhirFilter;
  /**
   * If true, skips resources that are created or modified after the
   * de-identify operation is created.
   */
  skipModifiedResources?: boolean;
}

function serializeDeidentifyFhirStoreRequest(data: any): DeidentifyFhirStoreRequest {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeDeidentifyConfig(data["config"]) : undefined,
  };
}

function deserializeDeidentifyFhirStoreRequest(data: any): DeidentifyFhirStoreRequest {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeDeidentifyConfig(data["config"]) : undefined,
  };
}

/**
 * Contains a summary of the Deidentify operation.
 */
export interface DeidentifySummary {
}

/**
 * Specifies the parameters needed for de-identification of DICOM stores.
 */
export interface DicomConfig {
  /**
   * Tag filtering profile that determines which tags to keep/remove.
   */
  filterProfile?:  | "TAG_FILTER_PROFILE_UNSPECIFIED" | "MINIMAL_KEEP_LIST_PROFILE" | "ATTRIBUTE_CONFIDENTIALITY_BASIC_PROFILE" | "KEEP_ALL_PROFILE" | "DEIDENTIFY_TAG_CONTENTS";
  /**
   * List of tags to keep. Remove all other tags.
   */
  keepList?: TagFilterList;
  /**
   * List of tags to remove. Keep all other tags.
   */
  removeList?: TagFilterList;
  /**
   * If true, skip replacing StudyInstanceUID, SeriesInstanceUID,
   * SOPInstanceUID, and MediaStorageSOPInstanceUID and leave them untouched.
   * The Cloud Healthcare API regenerates these UIDs by default based on the
   * DICOM Standard's reasoning: "Whilst these UIDs cannot be mapped directly to
   * an individual out of context, given access to the original images, or to a
   * database of the original images containing the UIDs, it would be possible
   * to recover the individual's identity."
   * http://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.3.9.html
   */
  skipIdRedaction?: boolean;
}

/**
 * Specifies the filter configuration for DICOM resources.
 */
export interface DicomFilterConfig {
  /**
   * The Cloud Storage location of the filter configuration file. The `gcs_uri`
   * must be in the format `gs://bucket/path/to/object`. The filter
   * configuration file must contain a list of resource paths separated by
   * newline characters (\n or \r\n). Each resource path must be in the format
   * "/studies/{studyUID}[/series/{seriesUID}[/instances/{instanceUID}]]" The
   * Cloud Healthcare API service account must have the
   * `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage
   * location.
   */
  resourcePathsGcsUri?: string;
}

/**
 * Represents a DICOM store.
 */
export interface DicomStore {
  /**
   * User-supplied key-value pairs used to organize DICOM stores. Label keys
   * must be between 1 and 63 characters long, have a UTF-8 encoding of maximum
   * 128 bytes, and must conform to the following PCRE regular expression:
   * \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63
   * characters long, have a UTF-8 encoding of maximum 128 bytes, and must
   * conform to the following PCRE regular expression:
   * [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a
   * given store.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Resource name of the DICOM store, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`.
   */
  name?: string;
  /**
   * Notification destination for new DICOM instances. Supplied by the client.
   */
  notificationConfig?: NotificationConfig;
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
 * The candidate entities that an entity mention could link to.
 */
export interface Entity {
  /**
   * entity_id is a first class field entity_id uniquely identifies this
   * concept and its meta-vocabulary. For example, "UMLS/C0000970".
   */
  entityId?: string;
  /**
   * preferred_term is the preferred term for this concept. For example,
   * "Acetaminophen". For ad hoc entities formed by normalization, this is the
   * most popular unnormalized string.
   */
  preferredTerm?: string;
  /**
   * Vocabulary codes are first-class fields and differentiated from the
   * concept unique identifier (entity_id). vocabulary_codes contains the
   * representation of this concept in particular vocabularies, such as ICD-10,
   * SNOMED-CT and RxNORM. These are prefixed by the name of the vocabulary,
   * followed by the unique code within that vocabulary. For example,
   * "RXNORM/A10334543".
   */
  vocabularyCodes?: string[];
}

/**
 * An entity mention in the document.
 */
export interface EntityMention {
  /**
   * The certainty assessment of the entity mention. Its value is one of:
   * LIKELY, SOMEWHAT_LIKELY, UNCERTAIN, SOMEWHAT_UNLIKELY, UNLIKELY,
   * CONDITIONAL
   */
  certaintyAssessment?: Feature;
  /**
   * The model's confidence in this entity mention annotation. A number between
   * 0 and 1.
   */
  confidence?: number;
  /**
   * linked_entities are candidate ontological concepts that this entity
   * mention may refer to. They are sorted by decreasing confidence.
   */
  linkedEntities?: LinkedEntity[];
  /**
   * mention_id uniquely identifies each entity mention in a single response.
   */
  mentionId?: string;
  /**
   * The subject this entity mention relates to. Its value is one of: PATIENT,
   * FAMILY_MEMBER, OTHER
   */
  subject?: Feature;
  /**
   * How this entity mention relates to the subject temporally. Its value is
   * one of: CURRENT, CLINICAL_HISTORY, FAMILY_HISTORY, UPCOMING, ALLERGY
   */
  temporalAssessment?: Feature;
  /**
   * text is the location of the entity mention in the document.
   */
  text?: TextSpan;
  /**
   * The semantic type of the entity: UNKNOWN_ENTITY_TYPE, ALONE,
   * ANATOMICAL_STRUCTURE, ASSISTED_LIVING, BF_RESULT, BM_RESULT, BM_UNIT,
   * BM_VALUE, BODY_FUNCTION, BODY_MEASUREMENT, COMPLIANT, DOESNOT_FOLLOWUP,
   * FAMILY, FOLLOWSUP, LABORATORY_DATA, LAB_RESULT, LAB_UNIT, LAB_VALUE,
   * MEDICAL_DEVICE, MEDICINE, MED_DOSE, MED_DURATION, MED_FORM, MED_FREQUENCY,
   * MED_ROUTE, MED_STATUS, MED_STRENGTH, MED_TOTALDOSE, MED_UNIT,
   * NON_COMPLIANT, OTHER_LIVINGSTATUS, PROBLEM, PROCEDURE, PROCEDURE_RESULT,
   * PROC_METHOD, REASON_FOR_NONCOMPLIANCE, SEVERITY, SUBSTANCE_ABUSE,
   * UNCLEAR_FOLLOWUP.
   */
  type?: string;
}

/**
 * Defines directed relationship from one entity mention to another.
 */
export interface EntityMentionRelationship {
  /**
   * The model's confidence in this annotation. A number between 0 and 1.
   */
  confidence?: number;
  /**
   * object_id is the id of the object entity mention.
   */
  objectId?: string;
  /**
   * subject_id is the id of the subject entity mention.
   */
  subjectId?: string;
}

/**
 * Evaluate a user's Consents for all matching User data mappings. Note: User
 * data mappings are indexed asynchronously, causing slight delays between the
 * time mappings are created or updated and when they are included in
 * EvaluateUserConsents results.
 */
export interface EvaluateUserConsentsRequest {
  /**
   * Optional. Specific Consents to evaluate the access request against. These
   * Consents must have the same `user_id` as the User data mappings being
   * evalauted, must exist in the current `consent_store`, and must have a
   * `state` of either `ACTIVE` or `DRAFT`. A maximum of 100 Consents can be
   * provided here. If unspecified, all `ACTIVE` unexpired Consents in the
   * current `consent_store` will be evaluated.
   */
  consentList?: ConsentList;
  /**
   * Optional. Limit on the number of User data mappings to return in a single
   * response. If not specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * Optional. Token to retrieve the next page of results, or empty to get the
   * first page.
   */
  pageToken?: string;
  /**
   * Required. The values of request attributes associated with this access
   * request.
   */
  requestAttributes?: {
    [key: string]: string
  };
  /**
   * Optional. The values of resource attributes associated with the resources
   * being requested. If no values are specified, then all resources are
   * queried.
   */
  resourceAttributes?: {
    [key: string]: string
  };
  /**
   * Optional. The view for EvaluateUserConsentsResponse. If unspecified,
   * defaults to `BASIC` and returns `consented` as `TRUE` or `FALSE`.
   */
  responseView?:  | "RESPONSE_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
  /**
   * Required. User ID to evaluate consents for.
   */
  userId?: string;
}

export interface EvaluateUserConsentsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list. This token is valid for 72 hours after it is created.
   */
  nextPageToken?: string;
  /**
   * The consent evaluation result for each `data_id`.
   */
  results?: Result[];
}

/**
 * Exports data from the specified DICOM store. If a given resource, such as a
 * DICOM object with the same SOPInstance UID, already exists in the output, it
 * is overwritten with the version in the source dataset. Exported DICOM data
 * persists when the DICOM store from which it was exported is deleted.
 */
export interface ExportDicomDataRequest {
  /**
   * The BigQuery output destination. You can only export to a BigQuery dataset
   * that's in the same project as the DICOM store you're exporting from. The
   * Cloud Healthcare Service Agent requires two IAM roles on the BigQuery
   * location: `roles/bigquery.dataEditor` and `roles/bigquery.jobUser`.
   */
  bigqueryDestination?: GoogleCloudHealthcareV1DicomBigQueryDestination;
  /**
   * The Cloud Storage output destination. The Cloud Healthcare Service Agent
   * requires the `roles/storage.objectAdmin` Cloud IAM roles on the Cloud
   * Storage location.
   */
  gcsDestination?: GoogleCloudHealthcareV1DicomGcsDestination;
}

/**
 * Returns additional information in regards to a completed DICOM store export.
 */
export interface ExportDicomDataResponse {
}

/**
 * Request to schedule an export.
 */
export interface ExportMessagesRequest {
  /**
   * The end of the range in `send_time` (MSH.7,
   * https://www.hl7.org/documentcenter/public_temp_2E58C1F9-1C23-BA17-0C6126475344DA9D/wg/conf/HL7MSH.htm)
   * to process. If not specified, the time when the export is scheduled is
   * used. This value has to come after the `start_time` defined below. Only
   * messages whose `send_time` lies in the range `start_time` (inclusive) to
   * `end_time` (exclusive) are exported.
   */
  endTime?: Date;
  /**
   * Export to a Cloud Storage destination.
   */
  gcsDestination?: GcsDestination;
  /**
   * The start of the range in `send_time` (MSH.7,
   * https://www.hl7.org/documentcenter/public_temp_2E58C1F9-1C23-BA17-0C6126475344DA9D/wg/conf/HL7MSH.htm)
   * to process. If not specified, the UNIX epoch (1970-01-01T00:00:00Z) is
   * used. This value has to come before the `end_time` defined below. Only
   * messages whose `send_time` lies in the range `start_time` (inclusive) to
   * `end_time` (exclusive) are exported.
   */
  startTime?: Date;
}

function serializeExportMessagesRequest(data: any): ExportMessagesRequest {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeExportMessagesRequest(data: any): ExportMessagesRequest {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Final response for the export operation. This structure is included in the
 * response to describe the detailed outcome.
 */
export interface ExportMessagesResponse {
}

/**
 * Request to export resources.
 */
export interface ExportResourcesRequest {
  /**
   * If provided, only resources updated after this time are exported. The time
   * uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. For example,
   * `2015-02-07T13:28:17.239+02:00` or `2017-01-01T00:00:00Z`. The time must be
   * specified to the second and include a time zone.
   */
  _since?: string;
  /**
   * String of comma-delimited FHIR resource types. If provided, only resources
   * of the specified resource type(s) are exported.
   */
  _type?: string;
  /**
   * The BigQuery output destination. The Cloud Healthcare Service Agent
   * requires two IAM roles on the BigQuery location:
   * `roles/bigquery.dataEditor` and `roles/bigquery.jobUser`. The output is one
   * BigQuery table per resource type. Unlike when setting `BigQueryDestination`
   * for `StreamConfig`, `ExportResources` does not create BigQuery views.
   */
  bigqueryDestination?: GoogleCloudHealthcareV1FhirBigQueryDestination;
  /**
   * The Cloud Storage output destination. The Healthcare Service Agent account
   * requires the `roles/storage.objectAdmin` role on the Cloud Storage
   * location. The exported outputs are organized by FHIR resource types. The
   * server creates one object per resource type. Each object contains newline
   * delimited JSON, and each line is a FHIR resource.
   */
  gcsDestination?: GoogleCloudHealthcareV1FhirGcsDestination;
}

function serializeExportResourcesRequest(data: any): ExportResourcesRequest {
  return {
    ...data,
    bigqueryDestination: data["bigqueryDestination"] !== undefined ? serializeGoogleCloudHealthcareV1FhirBigQueryDestination(data["bigqueryDestination"]) : undefined,
  };
}

function deserializeExportResourcesRequest(data: any): ExportResourcesRequest {
  return {
    ...data,
    bigqueryDestination: data["bigqueryDestination"] !== undefined ? deserializeGoogleCloudHealthcareV1FhirBigQueryDestination(data["bigqueryDestination"]) : undefined,
  };
}

/**
 * Response when all resources export successfully. This structure is included
 * in the response to describe the detailed outcome after the operation finishes
 * successfully.
 */
export interface ExportResourcesResponse {
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
 * A feature of an entity mention.
 */
export interface Feature {
  /**
   * The model's confidence in this feature annotation. A number between 0 and
   * 1.
   */
  confidence?: number;
  /**
   * The value of this feature annotation. Its range depends on the type of the
   * feature.
   */
  value?: string;
}

/**
 * Specifies how to handle de-identification of a FHIR store.
 */
export interface FhirConfig {
  /**
   * The behaviour for handling FHIR extensions that aren't otherwise specified
   * for de-identification. If true, all extensions are preserved during
   * de-identification by default. If false or unspecified, all extensions are
   * removed during de-identification by default.
   */
  defaultKeepExtensions?: boolean;
  /**
   * Specifies FHIR paths to match and how to transform them. Any field that is
   * not matched by a FieldMetadata is passed through to the output dataset
   * unmodified. All extensions will be processed according to
   * `default_keep_extensions`.
   */
  fieldMetadataList?: FieldMetadata[];
}

/**
 * Filter configuration.
 */
export interface FhirFilter {
  /**
   * List of resources to include in the output. If this list is empty or not
   * specified, all resources are included in the output.
   */
  resources?: Resources;
}

/**
 * Represents a FHIR store.
 */
export interface FhirStore {
  /**
   * Enable parsing of references within complex FHIR data types such as
   * Extensions. If this value is set to ENABLED, then features like referential
   * integrity and Bundle reference rewriting apply to all references. If this
   * flag has not been specified the behavior of the FHIR store will not change,
   * references in complex data types will not be parsed. New stores will have
   * this value set to ENABLED after a notification period. Warning: turning on
   * this flag causes processing existing resources to fail if they contain
   * references to non-existent resources.
   */
  complexDataTypeReferenceParsing?:  | "COMPLEX_DATA_TYPE_REFERENCE_PARSING_UNSPECIFIED" | "DISABLED" | "ENABLED";
  /**
   * If true, overrides the default search behavior for this FHIR store to
   * `handling=strict` which returns an error for unrecognized search
   * parameters. If false, uses the FHIR specification default
   * `handling=lenient` which ignores unrecognized search parameters. The
   * handling can always be changed from the default on an individual API call
   * by setting the HTTP header `Prefer: handling=strict` or `Prefer:
   * handling=lenient`.
   */
  defaultSearchHandlingStrict?: boolean;
  /**
   * Immutable. Whether to disable referential integrity in this FHIR store.
   * This field is immutable after FHIR store creation. The default value is
   * false, meaning that the API enforces referential integrity and fails the
   * requests that result in inconsistent state in the FHIR store. When this
   * field is set to true, the API skips referential integrity checks.
   * Consequently, operations that rely on references, such as
   * GetPatientEverything, do not return all the results if broken references
   * exist.
   */
  disableReferentialIntegrity?: boolean;
  /**
   * Immutable. Whether to disable resource versioning for this FHIR store.
   * This field can not be changed after the creation of FHIR store. If set to
   * false, which is the default behavior, all write operations cause historical
   * versions to be recorded automatically. The historical versions can be
   * fetched through the history APIs, but cannot be updated. If set to true, no
   * historical versions are kept. The server sends errors for attempts to read
   * the historical versions.
   */
  disableResourceVersioning?: boolean;
  /**
   * Whether this FHIR store has the [updateCreate
   * capability](https://www.hl7.org/fhir/capabilitystatement-definitions.html#CapabilityStatement.rest.resource.updateCreate).
   * This determines if the client can use an Update operation to create a new
   * resource with a client-specified ID. If false, all IDs are server-assigned
   * through the Create operation and attempts to update a non-existent resource
   * return errors. It is strongly advised not to include or encode any
   * sensitive data such as patient identifiers in client-specified resource
   * IDs. Those IDs are part of the FHIR resource path recorded in Cloud audit
   * logs and Pub/Sub notifications. Those IDs can also be contained in
   * reference fields within other resources.
   */
  enableUpdateCreate?: boolean;
  /**
   * User-supplied key-value pairs used to organize FHIR stores. Label keys
   * must be between 1 and 63 characters long, have a UTF-8 encoding of maximum
   * 128 bytes, and must conform to the following PCRE regular expression:
   * \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63
   * characters long, have a UTF-8 encoding of maximum 128 bytes, and must
   * conform to the following PCRE regular expression:
   * [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a
   * given store.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Resource name of the FHIR store, of the form
   * `projects/{project_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   */
  name?: string;
  /**
   * If non-empty, publish all resource modifications of this FHIR store to
   * this destination. The Pub/Sub message attributes contain a map with a
   * string describing the action that has triggered the notification. For
   * example, "action":"CreateResource".
   */
  notificationConfig?: NotificationConfig;
  /**
   * A list of streaming configs that configure the destinations of streaming
   * export for every resource mutation in this FHIR store. Each store is
   * allowed to have up to 10 streaming configs. After a new config is added,
   * the next resource mutation is streamed to the new location in addition to
   * the existing ones. When a location is removed from the list, the server
   * stops streaming to that location. Before adding a new config, you must add
   * the required
   * [`bigquery.dataEditor`](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataEditor)
   * role to your project's **Cloud Healthcare Service Agent** [service
   * account](https://cloud.google.com/iam/docs/service-accounts). Some lag
   * (typically on the order of dozens of seconds) is expected before the
   * results show up in the streaming destination.
   */
  streamConfigs?: StreamConfig[];
  /**
   * Configuration for how to validate incoming FHIR resources against
   * configured profiles.
   */
  validationConfig?: ValidationConfig;
  /**
   * Immutable. The FHIR specification version that this FHIR store supports
   * natively. This field is immutable after store creation. Requests are
   * rejected if they contain FHIR resources of a different version. Version is
   * required for every FHIR store.
   */
  version?:  | "VERSION_UNSPECIFIED" | "DSTU2" | "STU3" | "R4";
}

function serializeFhirStore(data: any): FhirStore {
  return {
    ...data,
    streamConfigs: data["streamConfigs"] !== undefined ? data["streamConfigs"].map((item: any) => (serializeStreamConfig(item))) : undefined,
  };
}

function deserializeFhirStore(data: any): FhirStore {
  return {
    ...data,
    streamConfigs: data["streamConfigs"] !== undefined ? data["streamConfigs"].map((item: any) => (deserializeStreamConfig(item))) : undefined,
  };
}

/**
 * Count of resources and total storage size by type for a given FHIR store.
 */
export interface FhirStoreMetric {
  /**
   * The total count of FHIR resources in the store of this resource type.
   */
  count?: bigint;
  /**
   * The FHIR resource type this metric applies to.
   */
  resourceType?: string;
  /**
   * The total amount of structured storage used by FHIR resources of this
   * resource type in the store.
   */
  structuredStorageSizeBytes?: bigint;
}

function serializeFhirStoreMetric(data: any): FhirStoreMetric {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
    structuredStorageSizeBytes: data["structuredStorageSizeBytes"] !== undefined ? String(data["structuredStorageSizeBytes"]) : undefined,
  };
}

function deserializeFhirStoreMetric(data: any): FhirStoreMetric {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
    structuredStorageSizeBytes: data["structuredStorageSizeBytes"] !== undefined ? BigInt(data["structuredStorageSizeBytes"]) : undefined,
  };
}

/**
 * List of metrics for a given FHIR store.
 */
export interface FhirStoreMetrics {
  /**
   * List of FhirStoreMetric by resource type.
   */
  metrics?: FhirStoreMetric[];
  /**
   * The resource name of the FHIR store to get metrics for, in the format
   * `projects/{project_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`.
   */
  name?: string;
}

function serializeFhirStoreMetrics(data: any): FhirStoreMetrics {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeFhirStoreMetric(item))) : undefined,
  };
}

function deserializeFhirStoreMetrics(data: any): FhirStoreMetrics {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeFhirStoreMetric(item))) : undefined,
  };
}

/**
 * A (sub) field of a type.
 */
export interface Field {
  /**
   * The maximum number of times this field can be repeated. 0 or -1 means
   * unbounded.
   */
  maxOccurs?: number;
  /**
   * The minimum number of times this field must be present/repeated.
   */
  minOccurs?: number;
  /**
   * The name of the field. For example, "PID-1" or just "1".
   */
  name?: string;
  /**
   * The HL7v2 table this field refers to. For example, PID-15 (Patient's
   * Primary Language) usually refers to table "0296".
   */
  table?: string;
  /**
   * The type of this field. A Type with this name must be defined in an
   * Hl7TypesConfig.
   */
  type?: string;
}

/**
 * Specifies FHIR paths to match, and how to handle de-identification of
 * matching fields.
 */
export interface FieldMetadata {
  /**
   * Deidentify action for one field.
   */
  action?:  | "ACTION_UNSPECIFIED" | "TRANSFORM" | "INSPECT_AND_TRANSFORM" | "DO_NOT_TRANSFORM";
  /**
   * List of paths to FHIR fields to be redacted. Each path is a
   * period-separated list where each component is either a field name or FHIR
   * type name, for example: Patient, HumanName. For "choice" types (those
   * defined in the FHIR spec with the form: field[x]) we use two separate
   * components. For example, "deceasedAge.unit" is matched by
   * "Deceased.Age.unit". Supported types are: AdministrativeGenderCode,
   * Base64Binary, Boolean, Code, Date, DateTime, Decimal, HumanName, Id,
   * Instant, Integer, LanguageCode, Markdown, Oid, PositiveInt, String,
   * UnsignedInt, Uri, Uuid, Xhtml.
   */
  paths?: string[];
}

/**
 * The Cloud Storage output destination. The Cloud Healthcare Service Agent
 * requires the `roles/storage.objectAdmin` Cloud IAM roles on the Cloud Storage
 * location.
 */
export interface GcsDestination {
  /**
   * The format of the exported HL7v2 message files.
   */
  contentStructure?:  | "CONTENT_STRUCTURE_UNSPECIFIED" | "MESSAGE_JSON";
  /**
   * Specifies the parts of the Message resource to include in the export. If
   * not specified, FULL is used.
   */
  messageView?:  | "MESSAGE_VIEW_UNSPECIFIED" | "RAW_ONLY" | "PARSED_ONLY" | "FULL" | "SCHEMATIZED_ONLY" | "BASIC";
  /**
   * URI of an existing Cloud Storage directory where the server writes result
   * files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there
   * is no trailing slash, the service appends one when composing the object
   * path.
   */
  uriPrefix?: string;
}

/**
 * Specifies the configuration for importing data from Cloud Storage.
 */
export interface GcsSource {
  /**
   * Points to a Cloud Storage URI containing file(s) to import. The URI must
   * be in the following format: `gs://{bucket_id}/{object_id}`. The URI can
   * include wildcards in `object_id` and thus identify multiple files.
   * Supported wildcards: * `*` to match 0 or more non-separator characters *
   * `**` to match 0 or more characters (including separators). Must be used at
   * the end of a path and with no other wildcards in the path. Can also be used
   * with a file extension (such as .ndjson), which imports all files with the
   * extension in the specified directory and its sub-directories. For example,
   * `gs://my-bucket/my-directory/**.ndjson` imports all files with `.ndjson`
   * extensions in `my-directory/` and its sub-directories. * `?` to match 1
   * character Files matching the wildcard are expected to contain content only,
   * no metadata.
   */
  uri?: string;
}

/**
 * The Cloud Storage location for export.
 */
export interface GoogleCloudHealthcareV1ConsentGcsDestination {
  /**
   * URI for a Cloud Storage directory where the server writes result files, in
   * the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no
   * trailing slash, the service appends one when composing the object path. The
   * user is responsible for creating the Cloud Storage bucket and directory
   * referenced in `uri_prefix`.
   */
  uriPrefix?: string;
}

/**
 * Represents a user's consent in terms of the resources that can be accessed
 * and under what conditions.
 */
export interface GoogleCloudHealthcareV1ConsentPolicy {
  /**
   * Required. The request conditions to meet to grant access. In addition to
   * any supported comparison operators, authorization rules may have `IN`
   * operator as well as at most 10 logical operators that are limited to `AND`
   * (`&&`), `OR` (`||`).
   */
  authorizationRule?: Expr;
  /**
   * The resources that this policy applies to. A resource is a match if it
   * matches all the attributes listed here. If empty, this policy applies to
   * all User data mappings for the given user.
   */
  resourceAttributes?: Attribute[];
}

/**
 * Contains a summary of the DeidentifyDicomStore operation.
 */
export interface GoogleCloudHealthcareV1DeidentifyDeidentifyDicomStoreSummary {
}

/**
 * Contains a summary of the DeidentifyFhirStore operation.
 */
export interface GoogleCloudHealthcareV1DeidentifyDeidentifyFhirStoreSummary {
}

/**
 * The BigQuery table where the server writes the output.
 */
export interface GoogleCloudHealthcareV1DicomBigQueryDestination {
  /**
   * Use `write_disposition` instead. If `write_disposition` is specified, this
   * parameter is ignored. force=false is equivalent to
   * write_disposition=WRITE_EMPTY and force=true is equivalent to
   * write_disposition=WRITE_TRUNCATE.
   */
  force?: boolean;
  /**
   * BigQuery URI to a table, up to 2000 characters long, in the format
   * `bq://projectId.bqDatasetId.tableId`
   */
  tableUri?: string;
  /**
   * Determines whether the existing table in the destination is to be
   * overwritten or appended to. If a write_disposition is specified, the
   * `force` parameter is ignored.
   */
  writeDisposition?:  | "WRITE_DISPOSITION_UNSPECIFIED" | "WRITE_EMPTY" | "WRITE_TRUNCATE" | "WRITE_APPEND";
}

/**
 * The Cloud Storage location where the server writes the output and the export
 * configuration.
 */
export interface GoogleCloudHealthcareV1DicomGcsDestination {
  /**
   * MIME types supported by DICOM spec. Each file is written in the following
   * format:
   * `.../{study_id}/{series_id}/{instance_id}[/{frame_number}].{extension}` The
   * frame_number component exists only for multi-frame instances. Supported
   * MIME types are consistent with supported formats in DICOMweb:
   * https://cloud.google.com/healthcare/docs/dicom#retrieve_transaction.
   * Specifically, the following are supported: - application/dicom;
   * transfer-syntax=1.2.840.10008.1.2.1 (uncompressed DICOM) -
   * application/dicom; transfer-syntax=1.2.840.10008.1.2.4.50 (DICOM with
   * embedded JPEG Baseline) - application/dicom;
   * transfer-syntax=1.2.840.10008.1.2.4.90 (DICOM with embedded JPEG 2000
   * Lossless Only) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.91
   * (DICOM with embedded JPEG 2000) - application/dicom; transfer-syntax=*
   * (DICOM with no transcoding) - application/octet-stream;
   * transfer-syntax=1.2.840.10008.1.2.1 (raw uncompressed PixelData) -
   * application/octet-stream; transfer-syntax=* (raw PixelData in whatever
   * format it was uploaded in) - image/jpeg;
   * transfer-syntax=1.2.840.10008.1.2.4.50 (Consumer JPEG) - image/png The
   * following extensions are used for output files: - application/dicom -> .dcm
   * - image/jpeg -> .jpg - image/png -> .png - application/octet-stream -> no
   * extension If unspecified, the instances are exported in the original DICOM
   * format they were uploaded in.
   */
  mimeType?: string;
  /**
   * The Cloud Storage destination to export to. URI for a Cloud Storage
   * directory where the server writes the result files, in the format
   * `gs://{bucket-id}/{path/to/destination/dir}`). If there is no trailing
   * slash, the service appends one when composing the object path. The user is
   * responsible for creating the Cloud Storage bucket referenced in
   * `uri_prefix`.
   */
  uriPrefix?: string;
}

/**
 * Specifies the configuration for importing data from Cloud Storage.
 */
export interface GoogleCloudHealthcareV1DicomGcsSource {
  /**
   * Points to a Cloud Storage URI containing file(s) with content only. The
   * URI must be in the following format: `gs://{bucket_id}/{object_id}`. The
   * URI can include wildcards in `object_id` and thus identify multiple files.
   * Supported wildcards: * '*' to match 0 or more non-separator characters *
   * '**' to match 0 or more characters (including separators). Must be used at
   * the end of a path and with no other wildcards in the path. Can also be used
   * with a file extension (such as .dcm), which imports all files with the
   * extension in the specified directory and its sub-directories. For example,
   * `gs://my-bucket/my-directory/**.dcm` imports all files with .dcm extensions
   * in `my-directory/` and its sub-directories. * '?' to match 1 character. All
   * other URI formats are invalid. Files matching the wildcard are expected to
   * contain content only, no metadata.
   */
  uri?: string;
}

/**
 * The configuration for exporting to BigQuery.
 */
export interface GoogleCloudHealthcareV1FhirBigQueryDestination {
  /**
   * BigQuery URI to an existing dataset, up to 2000 characters long, in the
   * format `bq://projectId.bqDatasetId`.
   */
  datasetUri?: string;
  /**
   * If this flag is `TRUE`, all tables are deleted from the dataset before the
   * new exported tables are written. If the flag is not set and the destination
   * dataset contains tables, the export call returns an error. If
   * `write_disposition` is specified, this parameter is ignored. force=false is
   * equivalent to write_disposition=WRITE_EMPTY and force=true is equivalent to
   * write_disposition=WRITE_TRUNCATE.
   */
  force?: boolean;
  /**
   * The configuration for the exported BigQuery schema.
   */
  schemaConfig?: SchemaConfig;
  /**
   * Determines if existing data in the destination dataset is overwritten,
   * appended to, or not written if the tables contain data. If a
   * write_disposition is specified, the `force` parameter is ignored.
   */
  writeDisposition?:  | "WRITE_DISPOSITION_UNSPECIFIED" | "WRITE_EMPTY" | "WRITE_TRUNCATE" | "WRITE_APPEND";
}

function serializeGoogleCloudHealthcareV1FhirBigQueryDestination(data: any): GoogleCloudHealthcareV1FhirBigQueryDestination {
  return {
    ...data,
    schemaConfig: data["schemaConfig"] !== undefined ? serializeSchemaConfig(data["schemaConfig"]) : undefined,
  };
}

function deserializeGoogleCloudHealthcareV1FhirBigQueryDestination(data: any): GoogleCloudHealthcareV1FhirBigQueryDestination {
  return {
    ...data,
    schemaConfig: data["schemaConfig"] !== undefined ? deserializeSchemaConfig(data["schemaConfig"]) : undefined,
  };
}

/**
 * The configuration for exporting to Cloud Storage.
 */
export interface GoogleCloudHealthcareV1FhirGcsDestination {
  /**
   * URI for a Cloud Storage directory where result files should be written, in
   * the format of `gs://{bucket-id}/{path/to/destination/dir}`. If there is no
   * trailing slash, the service appends one when composing the object path. The
   * user is responsible for creating the Cloud Storage bucket referenced in
   * `uri_prefix`.
   */
  uriPrefix?: string;
}

/**
 * Specifies the configuration for importing data from Cloud Storage.
 */
export interface GoogleCloudHealthcareV1FhirGcsSource {
  /**
   * Points to a Cloud Storage URI containing file(s) to import. The URI must
   * be in the following format: `gs://{bucket_id}/{object_id}`. The URI can
   * include wildcards in `object_id` and thus identify multiple files.
   * Supported wildcards: * `*` to match 0 or more non-separator characters *
   * `**` to match 0 or more characters (including separators). Must be used at
   * the end of a path and with no other wildcards in the path. Can also be used
   * with a file extension (such as .ndjson), which imports all files with the
   * extension in the specified directory and its sub-directories. For example,
   * `gs://my-bucket/my-directory/**.ndjson` imports all files with `.ndjson`
   * extensions in `my-directory/` and its sub-directories. * `?` to match 1
   * character Files matching the wildcard are expected to contain content only,
   * no metadata.
   */
  uri?: string;
}

/**
 * Construct representing a logical group or a segment.
 */
export interface GroupOrSegment {
  group?: SchemaGroup;
  segment?: SchemaSegment;
}

/**
 * Root config message for HL7v2 schema. This contains a schema structure of
 * groups and segments, and filters that determine which messages to apply the
 * schema structure to.
 */
export interface Hl7SchemaConfig {
  /**
   * Map from each HL7v2 message type and trigger event pair, such as ADT_A04,
   * to its schema configuration root group.
   */
  messageSchemaConfigs?: {
    [key: string]: SchemaGroup
  };
  /**
   * Each VersionSource is tested and only if they all match is the schema used
   * for the message.
   */
  version?: VersionSource[];
}

/**
 * Root config for HL7v2 datatype definitions for a specific HL7v2 version.
 */
export interface Hl7TypesConfig {
  /**
   * The HL7v2 type definitions.
   */
  type?: Type[];
  /**
   * The version selectors that this config applies to. A message must match
   * ALL version sources to apply.
   */
  version?: VersionSource[];
}

/**
 * Specifies where and whether to send notifications upon changes to a data
 * store.
 */
export interface Hl7V2NotificationConfig {
  /**
   * Restricts notifications sent for messages matching a filter. If this is
   * empty, all messages are matched. The following syntax is available: * A
   * string field value can be written as text inside quotation marks, for
   * example `"query text"`. The only valid relational operation for text fields
   * is equality (`=`), where text is searched within the field, rather than
   * having the field be equal to the text. For example, `"Comment = great"`
   * returns messages with `great` in the comment field. * A number field value
   * can be written as an integer, a decimal, or an exponential. The valid
   * relational operators for number fields are the equality operator (`=`),
   * along with the less than/greater than operators (`<`, `<=`, `>`, `>=`).
   * Note that there is no inequality (`!=`) operator. You can prepend the `NOT`
   * operator to an expression to negate it. * A date field value must be
   * written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339
   * time format. Leading zeros are required for one-digit months and days. The
   * valid relational operators for date fields are the equality operator (`=`)
   * , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`).
   * Note that there is no inequality (`!=`) operator. You can prepend the `NOT`
   * operator to an expression to negate it. * Multiple field query expressions
   * can be combined in one query by adding `AND` or `OR` operators between the
   * expressions. If a boolean operator appears within a quoted string, it is
   * not treated as special, it's just another part of the character string to
   * be matched. You can prepend the `NOT` operator to an expression to negate
   * it. The following fields and functions are available for filtering: *
   * `message_type`, from the MSH-9.1 field. For example, `NOT message_type =
   * "ADT"`. * `send_date` or `sendDate`, the YYYY-MM-DD date the message was
   * sent in the dataset's time_zone, from the MSH-7 segment. For example,
   * `send_date < "2017-01-02"`. * `send_time`, the timestamp when the message
   * was sent, using the RFC3339 time format for comparisons, from the MSH-7
   * segment. For example, `send_time < "2017-01-02T00:00:00-05:00"`. *
   * `create_time`, the timestamp when the message was created in the HL7v2
   * store. Use the RFC3339 time format for comparisons. For example,
   * `create_time < "2017-01-02T00:00:00-05:00"`. * `send_facility`, the care
   * center that the message came from, from the MSH-4 segment. For example,
   * `send_facility = "ABC"`. * `PatientId(value, type)`, which matches if the
   * message lists a patient having an ID of the given value and type in the
   * PID-2, PID-3, or PID-4 segments. For example, `PatientId("123456", "MRN")`.
   * * `labels.x`, a string value of the label with key `x` as set using the
   * Message.labels map. For example, `labels."priority"="high"`. The operator
   * `:*` can be used to assert the existence of a label. For example,
   * `labels."priority":*`.
   */
  filter?: string;
  /**
   * The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that
   * notifications of changes are published on. Supplied by the client. The
   * notification is a `PubsubMessage` with the following fields: *
   * `PubsubMessage.Data` contains the resource name. *
   * `PubsubMessage.MessageId` is the ID of this notification. It's guaranteed
   * to be unique within the topic. * `PubsubMessage.PublishTime` is the time
   * when the message was published. Note that notifications are only sent if
   * the topic is non-empty. [Topic
   * names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped
   * to a project. The Cloud Healthcare API service account,
   * service-PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com, must have
   * publisher permissions on the given Pub/Sub topic. Not having adequate
   * permissions causes the calls that send notifications to fail. If a
   * notification cannot be published to Pub/Sub, errors are logged to Cloud
   * Logging. For more information, see [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   */
  pubsubTopic?: string;
}

/**
 * Represents an HL7v2 store.
 */
export interface Hl7V2Store {
  /**
   * User-supplied key-value pairs used to organize HL7v2 stores. Label keys
   * must be between 1 and 63 characters long, have a UTF-8 encoding of maximum
   * 128 bytes, and must conform to the following PCRE regular expression:
   * \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63
   * characters long, have a UTF-8 encoding of maximum 128 bytes, and must
   * conform to the following PCRE regular expression:
   * [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a
   * given store.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Resource name of the HL7v2 store, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`.
   */
  name?: string;
  /**
   * A list of notification configs. Each configuration uses a filter to
   * determine whether to publish a message (both Ingest & Create) on the
   * corresponding notification destination. Only the message name is sent as
   * part of the notification. Supplied by the client.
   */
  notificationConfigs?: Hl7V2NotificationConfig[];
  /**
   * The configuration for the parser. It determines how the server parses the
   * messages.
   */
  parserConfig?: ParserConfig;
  /**
   * Determines whether to reject duplicate messages. A duplicate message is a
   * message with the same raw bytes as a message that has already been
   * ingested/created in this HL7v2 store. The default value is false, meaning
   * that the store accepts the duplicate messages and it also returns the same
   * ACK message in the IngestMessageResponse as has been returned previously.
   * Note that only one resource is created in the store. When this field is set
   * to true, CreateMessage/IngestMessage requests with a duplicate message will
   * be rejected by the store, and IngestMessageErrorDetail returns a NACK
   * message upon rejection.
   */
  rejectDuplicateMessage?: boolean;
}

function serializeHl7V2Store(data: any): Hl7V2Store {
  return {
    ...data,
    parserConfig: data["parserConfig"] !== undefined ? serializeParserConfig(data["parserConfig"]) : undefined,
  };
}

function deserializeHl7V2Store(data: any): Hl7V2Store {
  return {
    ...data,
    parserConfig: data["parserConfig"] !== undefined ? deserializeParserConfig(data["parserConfig"]) : undefined,
  };
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
 * Raw bytes representing consent artifact content.
 */
export interface Image {
  /**
   * Input only. Points to a Cloud Storage URI containing the consent artifact
   * content. The URI must be in the following format:
   * `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account
   * must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud
   * Storage location. The consent artifact content at this URI is copied to a
   * Cloud Storage location managed by the Cloud Healthcare API. Responses to
   * fetching requests return the consent artifact content in raw_bytes.
   */
  gcsUri?: string;
  /**
   * Consent artifact content represented as a stream of bytes. This field is
   * populated when returned in GetConsentArtifact response, but not included in
   * CreateConsentArtifact and ListConsentArtifact response.
   */
  rawBytes?: Uint8Array;
}

function serializeImage(data: any): Image {
  return {
    ...data,
    rawBytes: data["rawBytes"] !== undefined ? encodeBase64(data["rawBytes"]) : undefined,
  };
}

function deserializeImage(data: any): Image {
  return {
    ...data,
    rawBytes: data["rawBytes"] !== undefined ? decodeBase64(data["rawBytes"] as string) : undefined,
  };
}

/**
 * Specifies how to handle de-identification of image pixels.
 */
export interface ImageConfig {
  /**
   * Determines how to redact text from image.
   */
  textRedactionMode?:  | "TEXT_REDACTION_MODE_UNSPECIFIED" | "REDACT_ALL_TEXT" | "REDACT_SENSITIVE_TEXT" | "REDACT_NO_TEXT";
}

/**
 * Imports data into the specified DICOM store. Returns an error if any of the
 * files to import are not DICOM files. This API accepts duplicate DICOM
 * instances by ignoring the newly-pushed instance. It does not overwrite.
 */
export interface ImportDicomDataRequest {
  /**
   * Cloud Storage source data location and import configuration. The Cloud
   * Healthcare Service Agent requires the `roles/storage.objectViewer` Cloud
   * IAM roles on the Cloud Storage location.
   */
  gcsSource?: GoogleCloudHealthcareV1DicomGcsSource;
}

/**
 * Returns additional information in regards to a completed DICOM store import.
 */
export interface ImportDicomDataResponse {
}

/**
 * Request to import messages.
 */
export interface ImportMessagesRequest {
  /**
   * Cloud Storage source data location and import configuration. The Cloud
   * Healthcare Service Agent requires the `roles/storage.objectViewer` Cloud
   * IAM roles on the Cloud Storage location.
   */
  gcsSource?: GcsSource;
}

/**
 * Final response of importing messages. This structure is included in the
 * response to describe the detailed outcome. It is only included when the
 * operation finishes successfully.
 */
export interface ImportMessagesResponse {
}

/**
 * Request to import resources.
 */
export interface ImportResourcesRequest {
  /**
   * The content structure in the source location. If not specified, the server
   * treats the input source files as BUNDLE.
   */
  contentStructure?:  | "CONTENT_STRUCTURE_UNSPECIFIED" | "BUNDLE" | "RESOURCE" | "BUNDLE_PRETTY" | "RESOURCE_PRETTY";
  /**
   * Cloud Storage source data location and import configuration. The
   * Healthcare Service Agent account requires the `roles/storage.objectAdmin`
   * role on the Cloud Storage location. Each Cloud Storage object should be a
   * text file that contains the format specified in ContentStructure.
   */
  gcsSource?: GoogleCloudHealthcareV1FhirGcsSource;
}

/**
 * Final response of importing resources. This structure is included in the
 * response to describe the detailed outcome after the operation finishes
 * successfully.
 */
export interface ImportResourcesResponse {
}

/**
 * A transformation to apply to text that is identified as a specific
 * info_type.
 */
export interface InfoTypeTransformation {
  /**
   * Config for character mask.
   */
  characterMaskConfig?: CharacterMaskConfig;
  /**
   * Config for crypto hash.
   */
  cryptoHashConfig?: CryptoHashConfig;
  /**
   * Config for date shift.
   */
  dateShiftConfig?: DateShiftConfig;
  /**
   * InfoTypes to apply this transformation to. If this is not specified, the
   * transformation applies to any info_type.
   */
  infoTypes?: string[];
  /**
   * Config for text redaction.
   */
  redactConfig?: RedactConfig;
  /**
   * Config for replace with InfoType.
   */
  replaceWithInfoTypeConfig?: ReplaceWithInfoTypeConfig;
}

function serializeInfoTypeTransformation(data: any): InfoTypeTransformation {
  return {
    ...data,
    cryptoHashConfig: data["cryptoHashConfig"] !== undefined ? serializeCryptoHashConfig(data["cryptoHashConfig"]) : undefined,
    dateShiftConfig: data["dateShiftConfig"] !== undefined ? serializeDateShiftConfig(data["dateShiftConfig"]) : undefined,
  };
}

function deserializeInfoTypeTransformation(data: any): InfoTypeTransformation {
  return {
    ...data,
    cryptoHashConfig: data["cryptoHashConfig"] !== undefined ? deserializeCryptoHashConfig(data["cryptoHashConfig"]) : undefined,
    dateShiftConfig: data["dateShiftConfig"] !== undefined ? deserializeDateShiftConfig(data["dateShiftConfig"]) : undefined,
  };
}

/**
 * Ingests a message into the specified HL7v2 store.
 */
export interface IngestMessageRequest {
  /**
   * HL7v2 message to ingest.
   */
  message?: Message;
}

function serializeIngestMessageRequest(data: any): IngestMessageRequest {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeIngestMessageRequest(data: any): IngestMessageRequest {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

/**
 * Acknowledges that a message has been ingested into the specified HL7v2
 * store.
 */
export interface IngestMessageResponse {
  /**
   * HL7v2 ACK message.
   */
  hl7Ack?: Uint8Array;
  /**
   * Created message resource.
   */
  message?: Message;
}

function serializeIngestMessageResponse(data: any): IngestMessageResponse {
  return {
    ...data,
    hl7Ack: data["hl7Ack"] !== undefined ? encodeBase64(data["hl7Ack"]) : undefined,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeIngestMessageResponse(data: any): IngestMessageResponse {
  return {
    ...data,
    hl7Ack: data["hl7Ack"] !== undefined ? decodeBase64(data["hl7Ack"] as string) : undefined,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

/**
 * Include to use an existing data crypto key wrapped by KMS. The wrapped key
 * must be a 128-, 192-, or 256-bit key. The key must grant the Cloud IAM
 * permission `cloudkms.cryptoKeyVersions.useToDecrypt` to the project's Cloud
 * Healthcare Service Agent service account. For more information, see [Creating
 * a wrapped key] (https://cloud.google.com/dlp/docs/create-wrapped-key).
 */
export interface KmsWrappedCryptoKey {
  /**
   * Required. The resource name of the KMS CryptoKey to use for unwrapping.
   * For example,
   * `projects/{project_id}/locations/{location_id}/keyRings/{keyring}/cryptoKeys/{key}`.
   */
  cryptoKey?: string;
  /**
   * Required. The wrapped data crypto key.
   */
  wrappedKey?: Uint8Array;
}

function serializeKmsWrappedCryptoKey(data: any): KmsWrappedCryptoKey {
  return {
    ...data,
    wrappedKey: data["wrappedKey"] !== undefined ? encodeBase64(data["wrappedKey"]) : undefined,
  };
}

function deserializeKmsWrappedCryptoKey(data: any): KmsWrappedCryptoKey {
  return {
    ...data,
    wrappedKey: data["wrappedKey"] !== undefined ? decodeBase64(data["wrappedKey"] as string) : undefined,
  };
}

/**
 * EntityMentions can be linked to multiple entities using a LinkedEntity
 * message lets us add other fields, e.g. confidence.
 */
export interface LinkedEntity {
  /**
   * entity_id is a concept unique identifier. These are prefixed by a string
   * that identifies the entity coding system, followed by the unique identifier
   * within that system. For example, "UMLS/C0000970". This also supports ad hoc
   * entities, which are formed by normalizing entity mention content.
   */
  entityId?: string;
}

export interface ListAttributeDefinitionsResponse {
  /**
   * The returned Attribute definitions. The maximum number of attributes
   * returned is determined by the value of page_size in the
   * ListAttributeDefinitionsRequest.
   */
  attributeDefinitions?: AttributeDefinition[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

export interface ListConsentArtifactsResponse {
  /**
   * The returned Consent artifacts. The maximum number of artifacts returned
   * is determined by the value of page_size in the ListConsentArtifactsRequest.
   */
  consentArtifacts?: ConsentArtifact[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListConsentArtifactsResponse(data: any): ListConsentArtifactsResponse {
  return {
    ...data,
    consentArtifacts: data["consentArtifacts"] !== undefined ? data["consentArtifacts"].map((item: any) => (serializeConsentArtifact(item))) : undefined,
  };
}

function deserializeListConsentArtifactsResponse(data: any): ListConsentArtifactsResponse {
  return {
    ...data,
    consentArtifacts: data["consentArtifacts"] !== undefined ? data["consentArtifacts"].map((item: any) => (deserializeConsentArtifact(item))) : undefined,
  };
}

export interface ListConsentRevisionsResponse {
  /**
   * The returned Consent revisions. The maximum number of revisions returned
   * is determined by the value of `page_size` in the
   * ListConsentRevisionsRequest.
   */
  consents?: Consent[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListConsentRevisionsResponse(data: any): ListConsentRevisionsResponse {
  return {
    ...data,
    consents: data["consents"] !== undefined ? data["consents"].map((item: any) => (serializeConsent(item))) : undefined,
  };
}

function deserializeListConsentRevisionsResponse(data: any): ListConsentRevisionsResponse {
  return {
    ...data,
    consents: data["consents"] !== undefined ? data["consents"].map((item: any) => (deserializeConsent(item))) : undefined,
  };
}

export interface ListConsentsResponse {
  /**
   * The returned Consents. The maximum number of Consents returned is
   * determined by the value of page_size in the ListConsentsRequest.
   */
  consents?: Consent[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListConsentsResponse(data: any): ListConsentsResponse {
  return {
    ...data,
    consents: data["consents"] !== undefined ? data["consents"].map((item: any) => (serializeConsent(item))) : undefined,
  };
}

function deserializeListConsentsResponse(data: any): ListConsentsResponse {
  return {
    ...data,
    consents: data["consents"] !== undefined ? data["consents"].map((item: any) => (deserializeConsent(item))) : undefined,
  };
}

export interface ListConsentStoresResponse {
  /**
   * The returned consent stores. The maximum number of stores returned is
   * determined by the value of page_size in the ListConsentStoresRequest.
   */
  consentStores?: ConsentStore[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListConsentStoresResponse(data: any): ListConsentStoresResponse {
  return {
    ...data,
    consentStores: data["consentStores"] !== undefined ? data["consentStores"].map((item: any) => (serializeConsentStore(item))) : undefined,
  };
}

function deserializeListConsentStoresResponse(data: any): ListConsentStoresResponse {
  return {
    ...data,
    consentStores: data["consentStores"] !== undefined ? data["consentStores"].map((item: any) => (deserializeConsentStore(item))) : undefined,
  };
}

/**
 * Lists the available datasets.
 */
export interface ListDatasetsResponse {
  /**
   * The first page of datasets.
   */
  datasets?: Dataset[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * Lists the DICOM stores in the given dataset.
 */
export interface ListDicomStoresResponse {
  /**
   * The returned DICOM stores. Won't be more DICOM stores than the value of
   * page_size in the request.
   */
  dicomStores?: DicomStore[];
  /**
   * Token to retrieve the next page of results or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * Lists the FHIR stores in the given dataset.
 */
export interface ListFhirStoresResponse {
  /**
   * The returned FHIR stores. Won't be more FHIR stores than the value of
   * page_size in the request.
   */
  fhirStores?: FhirStore[];
  /**
   * Token to retrieve the next page of results or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListFhirStoresResponse(data: any): ListFhirStoresResponse {
  return {
    ...data,
    fhirStores: data["fhirStores"] !== undefined ? data["fhirStores"].map((item: any) => (serializeFhirStore(item))) : undefined,
  };
}

function deserializeListFhirStoresResponse(data: any): ListFhirStoresResponse {
  return {
    ...data,
    fhirStores: data["fhirStores"] !== undefined ? data["fhirStores"].map((item: any) => (deserializeFhirStore(item))) : undefined,
  };
}

/**
 * Lists the HL7v2 stores in the given dataset.
 */
export interface ListHl7V2StoresResponse {
  /**
   * The returned HL7v2 stores. Won't be more HL7v2 stores than the value of
   * page_size in the request.
   */
  hl7V2Stores?: Hl7V2Store[];
  /**
   * Token to retrieve the next page of results or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListHl7V2StoresResponse(data: any): ListHl7V2StoresResponse {
  return {
    ...data,
    hl7V2Stores: data["hl7V2Stores"] !== undefined ? data["hl7V2Stores"].map((item: any) => (serializeHl7V2Store(item))) : undefined,
  };
}

function deserializeListHl7V2StoresResponse(data: any): ListHl7V2StoresResponse {
  return {
    ...data,
    hl7V2Stores: data["hl7V2Stores"] !== undefined ? data["hl7V2Stores"].map((item: any) => (deserializeHl7V2Store(item))) : undefined,
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
 * Lists the messages in the specified HL7v2 store.
 */
export interface ListMessagesResponse {
  /**
   * The returned Messages. Won't be more Messages than the value of page_size
   * in the request. See view for populated fields.
   */
  hl7V2Messages?: Message[];
  /**
   * Token to retrieve the next page of results or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListMessagesResponse(data: any): ListMessagesResponse {
  return {
    ...data,
    hl7V2Messages: data["hl7V2Messages"] !== undefined ? data["hl7V2Messages"].map((item: any) => (serializeMessage(item))) : undefined,
  };
}

function deserializeListMessagesResponse(data: any): ListMessagesResponse {
  return {
    ...data,
    hl7V2Messages: data["hl7V2Messages"] !== undefined ? data["hl7V2Messages"].map((item: any) => (deserializeMessage(item))) : undefined,
  };
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

export interface ListUserDataMappingsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The returned User data mappings. The maximum number of User data mappings
   * returned is determined by the value of page_size in the
   * ListUserDataMappingsRequest.
   */
  userDataMappings?: UserDataMapping[];
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
 * A complete HL7v2 message. See [Introduction to HL7 Standards]
 * (https://www.hl7.org/implement/standards/index.cfm?ref=common) for details on
 * the standard.
 */
export interface Message {
  /**
   * Output only. The datetime when the message was created. Set by the server.
   */
  readonly createTime?: Date;
  /**
   * Raw message bytes.
   */
  data?: Uint8Array;
  /**
   * User-supplied key-value pairs used to organize HL7v2 stores. Label keys
   * must be between 1 and 63 characters long, have a UTF-8 encoding of maximum
   * 128 bytes, and must conform to the following PCRE regular expression:
   * \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63
   * characters long, have a UTF-8 encoding of maximum 128 bytes, and must
   * conform to the following PCRE regular expression:
   * [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a
   * given store.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The message type for this message. MSH-9.1.
   */
  messageType?: string;
  /**
   * Resource name of the Message, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`.
   * Assigned by the server.
   */
  name?: string;
  /**
   * Output only. The parsed version of the raw message data.
   */
  readonly parsedData?: ParsedData;
  /**
   * All patient IDs listed in the PID-2, PID-3, and PID-4 segments of this
   * message.
   */
  patientIds?: PatientId[];
  /**
   * The parsed version of the raw message data schematized according to this
   * store's schemas and type definitions.
   */
  schematizedData?: SchematizedData;
  /**
   * The hospital that this message came from. MSH-4.
   */
  sendFacility?: string;
  /**
   * The datetime the sending application sent this message. MSH-7.
   */
  sendTime?: Date;
}

function serializeMessage(data: any): Message {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
    sendTime: data["sendTime"] !== undefined ? data["sendTime"].toISOString() : undefined,
  };
}

function deserializeMessage(data: any): Message {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
    sendTime: data["sendTime"] !== undefined ? new Date(data["sendTime"]) : undefined,
  };
}

/**
 * Specifies where to send notifications upon changes to a data store.
 */
export interface NotificationConfig {
  /**
   * The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that
   * notifications of changes are published on. Supplied by the client.
   * PubsubMessage.Data contains the resource name. PubsubMessage.MessageId is
   * the ID of this message. It is guaranteed to be unique within the topic.
   * PubsubMessage.PublishTime is the time at which the message was published.
   * Notifications are only sent if the topic is non-empty. [Topic
   * names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped
   * to a project. Cloud Healthcare API service account must have publisher
   * permissions on the given Pub/Sub topic. Not having adequate permissions
   * causes the calls that send notifications to fail. If a notification can't
   * be published to Pub/Sub, errors are logged to Cloud Logging (see [Viewing
   * error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). If the
   * number of errors exceeds a certain rate, some aren't submitted. Note that
   * not all operations trigger notifications, see [Configuring Pub/Sub
   * notifications](https://cloud.google.com/healthcare/docs/how-tos/pubsub) for
   * specific details.
   */
  pubsubTopic?: string;
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
 * OperationMetadata provides information about the operation execution.
 * Returned in the long-running operation's metadata field.
 */
export interface OperationMetadata {
  /**
   * The name of the API method that initiated the operation.
   */
  apiMethodName?: string;
  /**
   * Specifies if cancellation was requested for the operation.
   */
  cancelRequested?: boolean;
  counter?: ProgressCounter;
  /**
   * The time at which the operation was created by the API.
   */
  createTime?: Date;
  /**
   * The time at which execution was completed.
   */
  endTime?: Date;
  /**
   * A link to audit and error logs in the log viewer. Error logs are generated
   * only by some operations, listed at [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging).
   */
  logsUrl?: string;
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    counter: data["counter"] !== undefined ? serializeProgressCounter(data["counter"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    counter: data["counter"] !== undefined ? deserializeProgressCounter(data["counter"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * The content of a HL7v2 message in a structured format.
 */
export interface ParsedData {
  segments?: Segment[];
}

/**
 * The configuration for the parser. It determines how the server parses the
 * messages.
 */
export interface ParserConfig {
  /**
   * Determines whether messages with no header are allowed.
   */
  allowNullHeader?: boolean;
  /**
   * Schemas used to parse messages in this store, if schematized parsing is
   * desired.
   */
  schema?: SchemaPackage;
  /**
   * Byte(s) to use as the segment terminator. If this is unset, '\r' is used
   * as segment terminator, matching the HL7 version 2 specification.
   */
  segmentTerminator?: Uint8Array;
  /**
   * Immutable. Determines the version of both the default parser to be used
   * when `schema` is not given, as well as the schematized parser used when
   * `schema` is specified. This field is immutable after HL7v2 store creation.
   */
  version?:  | "PARSER_VERSION_UNSPECIFIED" | "V1" | "V2" | "V3";
}

function serializeParserConfig(data: any): ParserConfig {
  return {
    ...data,
    segmentTerminator: data["segmentTerminator"] !== undefined ? encodeBase64(data["segmentTerminator"]) : undefined,
  };
}

function deserializeParserConfig(data: any): ParserConfig {
  return {
    ...data,
    segmentTerminator: data["segmentTerminator"] !== undefined ? decodeBase64(data["segmentTerminator"] as string) : undefined,
  };
}

/**
 * A patient identifier and associated type.
 */
export interface PatientId {
  /**
   * ID type. For example, MRN or NHS.
   */
  type?: string;
  /**
   * The patient's unique identifier.
   */
  value?: string;
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
 * ProgressCounter provides counters to describe an operation's progress.
 */
export interface ProgressCounter {
  /**
   * The number of units that failed in the operation.
   */
  failure?: bigint;
  /**
   * The number of units that are pending in the operation.
   */
  pending?: bigint;
  /**
   * The number of units that succeeded in the operation.
   */
  success?: bigint;
}

function serializeProgressCounter(data: any): ProgressCounter {
  return {
    ...data,
    failure: data["failure"] !== undefined ? String(data["failure"]) : undefined,
    pending: data["pending"] !== undefined ? String(data["pending"]) : undefined,
    success: data["success"] !== undefined ? String(data["success"]) : undefined,
  };
}

function deserializeProgressCounter(data: any): ProgressCounter {
  return {
    ...data,
    failure: data["failure"] !== undefined ? BigInt(data["failure"]) : undefined,
    pending: data["pending"] !== undefined ? BigInt(data["pending"]) : undefined,
    success: data["success"] !== undefined ? BigInt(data["success"]) : undefined,
  };
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresAttributeDefinitionsCreate.
 */
export interface ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsCreateOptions {
  /**
   * Required. The ID of the Attribute definition to create. The string must
   * match the following regex: `_a-zA-Z{0,255}` and must not be a reserved
   * keyword within the Common Expression Language as listed on
   * https://github.com/google/cel-spec/blob/master/doc/langdef.md.
   */
  attributeDefinitionId?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresAttributeDefinitionsList.
 */
export interface ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsListOptions {
  /**
   * Optional. Restricts the attributes returned to those matching a filter.
   * The only field available for filtering is `category`. For example,
   * `filter=category=\"REQUEST\"`.
   */
  filter?: string;
  /**
   * Optional. Limit on the number of Attribute definitions to return in a
   * single response. If not specified, 100 is used. May not be larger than
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. Token to retrieve the next page of results or empty to get the
   * first page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresAttributeDefinitionsPatch.
 */
export interface ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsPatchOptions {
  /**
   * Required. The update mask that applies to the resource. For the
   * `FieldMask` definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   * Only the `description`, `allowed_values`, `consent_default_values` and
   * `data_mapping_default_value` fields can be updated. The updated
   * `allowed_values` must contain all values from the previous
   * `allowed_values`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsConsentStoresAttributeDefinitionsPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsConsentStoresAttributeDefinitionsPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresAttributeDefinitionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresConsentArtifactsList.
 */
export interface ProjectsLocationsDatasetsConsentStoresConsentArtifactsListOptions {
  /**
   * Optional. Restricts the artifacts returned to those matching a filter. The
   * following syntax is available: * A string field value can be written as
   * text inside quotation marks, for example `"query text"`. The only valid
   * relational operation for text fields is equality (`=`), where text is
   * searched within the field, rather than having the field be equal to the
   * text. For example, `"Comment = great"` returns messages with `great` in the
   * comment field. * A number field value can be written as an integer, a
   * decimal, or an exponential. The valid relational operators for number
   * fields are the equality operator (`=`), along with the less than/greater
   * than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality
   * (`!=`) operator. You can prepend the `NOT` operator to an expression to
   * negate it. * A date field value must be written in `yyyy-mm-dd` form.
   * Fields with date and time use the RFC3339 time format. Leading zeros are
   * required for one-digit months and days. The valid relational operators for
   * date fields are the equality operator (`=`) , along with the less
   * than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no
   * inequality (`!=`) operator. You can prepend the `NOT` operator to an
   * expression to negate it. * Multiple field query expressions can be combined
   * in one query by adding `AND` or `OR` operators between the expressions. If
   * a boolean operator appears within a quoted string, it is not treated as
   * special, it's just another part of the character string to be matched. You
   * can prepend the `NOT` operator to an expression to negate it. The fields
   * available for filtering are: - user_id. For example,
   * `filter=user_id=\"user123\"`. - consent_content_version - metadata. For
   * example, `filter=Metadata(\"testkey\")=\"value\"` or
   * `filter=HasMetadata(\"testkey\")`.
   */
  filter?: string;
  /**
   * Optional. Limit on the number of consent artifacts to return in a single
   * response. If not specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from the previous List
   * request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresConsentsList.
 */
export interface ProjectsLocationsDatasetsConsentStoresConsentsListOptions {
  /**
   * Optional. Restricts the Consents returned to those matching a filter. The
   * following syntax is available: * A string field value can be written as
   * text inside quotation marks, for example `"query text"`. The only valid
   * relational operation for text fields is equality (`=`), where text is
   * searched within the field, rather than having the field be equal to the
   * text. For example, `"Comment = great"` returns messages with `great` in the
   * comment field. * A number field value can be written as an integer, a
   * decimal, or an exponential. The valid relational operators for number
   * fields are the equality operator (`=`), along with the less than/greater
   * than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality
   * (`!=`) operator. You can prepend the `NOT` operator to an expression to
   * negate it. * A date field value must be written in `yyyy-mm-dd` form.
   * Fields with date and time use the RFC3339 time format. Leading zeros are
   * required for one-digit months and days. The valid relational operators for
   * date fields are the equality operator (`=`) , along with the less
   * than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no
   * inequality (`!=`) operator. You can prepend the `NOT` operator to an
   * expression to negate it. * Multiple field query expressions can be combined
   * in one query by adding `AND` or `OR` operators between the expressions. If
   * a boolean operator appears within a quoted string, it is not treated as
   * special, it's just another part of the character string to be matched. You
   * can prepend the `NOT` operator to an expression to negate it. The fields
   * available for filtering are: - user_id. For example,
   * `filter='user_id="user123"'`. - consent_artifact - state -
   * revision_create_time - metadata. For example,
   * `filter=Metadata(\"testkey\")=\"value\"` or
   * `filter=HasMetadata(\"testkey\")`.
   */
  filter?: string;
  /**
   * Optional. Limit on the number of Consents to return in a single response.
   * If not specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from the previous List
   * request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresConsentsListRevisions.
 */
export interface ProjectsLocationsDatasetsConsentStoresConsentsListRevisionsOptions {
  /**
   * Optional. Restricts the revisions returned to those matching a filter. The
   * following syntax is available: * A string field value can be written as
   * text inside quotation marks, for example `"query text"`. The only valid
   * relational operation for text fields is equality (`=`), where text is
   * searched within the field, rather than having the field be equal to the
   * text. For example, `"Comment = great"` returns messages with `great` in the
   * comment field. * A number field value can be written as an integer, a
   * decimal, or an exponential. The valid relational operators for number
   * fields are the equality operator (`=`), along with the less than/greater
   * than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality
   * (`!=`) operator. You can prepend the `NOT` operator to an expression to
   * negate it. * A date field value must be written in `yyyy-mm-dd` form.
   * Fields with date and time use the RFC3339 time format. Leading zeros are
   * required for one-digit months and days. The valid relational operators for
   * date fields are the equality operator (`=`) , along with the less
   * than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no
   * inequality (`!=`) operator. You can prepend the `NOT` operator to an
   * expression to negate it. * Multiple field query expressions can be combined
   * in one query by adding `AND` or `OR` operators between the expressions. If
   * a boolean operator appears within a quoted string, it is not treated as
   * special, it's just another part of the character string to be matched. You
   * can prepend the `NOT` operator to an expression to negate it. Fields
   * available for filtering are: - user_id. For example,
   * `filter='user_id="user123"'`. - consent_artifact - state -
   * revision_create_time - metadata. For example,
   * `filter=Metadata(\"testkey\")=\"value\"` or
   * `filter=HasMetadata(\"testkey\")`.
   */
  filter?: string;
  /**
   * Optional. Limit on the number of revisions to return in a single response.
   * If not specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * Optional. Token to retrieve the next page of results or empty if there are
   * no more results in the list.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresConsentsPatch.
 */
export interface ProjectsLocationsDatasetsConsentStoresConsentsPatchOptions {
  /**
   * Required. The update mask to apply to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   * Only the `user_id`, `policies`, `consent_artifact`, and `metadata` fields
   * can be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsConsentStoresConsentsPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresConsentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsConsentStoresConsentsPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresConsentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresCreate.
 */
export interface ProjectsLocationsDatasetsConsentStoresCreateOptions {
  /**
   * Required. The ID of the consent store to create. The string must match the
   * following regex: `[\p{L}\p{N}_\-\.]{1,256}`. Cannot be changed after
   * creation.
   */
  consentStoreId?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresGetIamPolicy.
 */
export interface ProjectsLocationsDatasetsConsentStoresGetIamPolicyOptions {
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
 * Healthcare#projectsLocationsDatasetsConsentStoresList.
 */
export interface ProjectsLocationsDatasetsConsentStoresListOptions {
  /**
   * Optional. Restricts the stores returned to those matching a filter. Only
   * filtering on labels is supported. For example, `filter=labels.key=value`.
   */
  filter?: string;
  /**
   * Optional. Limit on the number of consent stores to return in a single
   * response. If not specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * Optional. Token to retrieve the next page of results, or empty to get the
   * first page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresPatch.
 */
export interface ProjectsLocationsDatasetsConsentStoresPatchOptions {
  /**
   * Required. The update mask that applies to the resource. For the
   * `FieldMask` definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   * Only the `labels`, `default_consent_ttl`, and
   * `enable_consent_create_on_update` fields are allowed to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsConsentStoresPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsConsentStoresPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresUserDataMappingsList.
 */
export interface ProjectsLocationsDatasetsConsentStoresUserDataMappingsListOptions {
  /**
   * Optional. Restricts the User data mappings returned to those matching a
   * filter. The following syntax is available: * A string field value can be
   * written as text inside quotation marks, for example `"query text"`. The
   * only valid relational operation for text fields is equality (`=`), where
   * text is searched within the field, rather than having the field be equal to
   * the text. For example, `"Comment = great"` returns messages with `great` in
   * the comment field. * A number field value can be written as an integer, a
   * decimal, or an exponential. The valid relational operators for number
   * fields are the equality operator (`=`), along with the less than/greater
   * than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality
   * (`!=`) operator. You can prepend the `NOT` operator to an expression to
   * negate it. * A date field value must be written in `yyyy-mm-dd` form.
   * Fields with date and time use the RFC3339 time format. Leading zeros are
   * required for one-digit months and days. The valid relational operators for
   * date fields are the equality operator (`=`) , along with the less
   * than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no
   * inequality (`!=`) operator. You can prepend the `NOT` operator to an
   * expression to negate it. * Multiple field query expressions can be combined
   * in one query by adding `AND` or `OR` operators between the expressions. If
   * a boolean operator appears within a quoted string, it is not treated as
   * special, it's just another part of the character string to be matched. You
   * can prepend the `NOT` operator to an expression to negate it. The fields
   * available for filtering are: - data_id - user_id. For example,
   * `filter=user_id=\"user123\"`. - archived - archive_time
   */
  filter?: string;
  /**
   * Optional. Limit on the number of User data mappings to return in a single
   * response. If not specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * Optional. Token to retrieve the next page of results, or empty to get the
   * first page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsConsentStoresUserDataMappingsPatch.
 */
export interface ProjectsLocationsDatasetsConsentStoresUserDataMappingsPatchOptions {
  /**
   * Required. The update mask that applies to the resource. For the
   * `FieldMask` definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask.
   * Only the `data_id`, `user_id` and `resource_attributes` fields can be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsConsentStoresUserDataMappingsPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresUserDataMappingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsConsentStoresUserDataMappingsPatchOptions(data: any): ProjectsLocationsDatasetsConsentStoresUserDataMappingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsCreate.
 */
export interface ProjectsLocationsDatasetsCreateOptions {
  /**
   * The ID of the dataset that is being created. The string must match the
   * following regex: `[\p{L}\p{N}_\-\.]{1,256}`.
   */
  datasetId?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsDicomStoresCreate.
 */
export interface ProjectsLocationsDatasetsDicomStoresCreateOptions {
  /**
   * The ID of the DICOM store that is being created. Any string value up to
   * 256 characters in length.
   */
  dicomStoreId?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsDicomStoresGetIamPolicy.
 */
export interface ProjectsLocationsDatasetsDicomStoresGetIamPolicyOptions {
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
 * Additional options for Healthcare#projectsLocationsDatasetsDicomStoresList.
 */
export interface ProjectsLocationsDatasetsDicomStoresListOptions {
  /**
   * Restricts stores returned to those matching a filter. The following syntax
   * is available: * A string field value can be written as text inside
   * quotation marks, for example `"query text"`. The only valid relational
   * operation for text fields is equality (`=`), where text is searched within
   * the field, rather than having the field be equal to the text. For example,
   * `"Comment = great"` returns messages with `great` in the comment field. * A
   * number field value can be written as an integer, a decimal, or an
   * exponential. The valid relational operators for number fields are the
   * equality operator (`=`), along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. * A date
   * field value must be written in `yyyy-mm-dd` form. Fields with date and time
   * use the RFC3339 time format. Leading zeros are required for one-digit
   * months and days. The valid relational operators for date fields are the
   * equality operator (`=`) , along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. *
   * Multiple field query expressions can be combined in one query by adding
   * `AND` or `OR` operators between the expressions. If a boolean operator
   * appears within a quoted string, it is not treated as special, it's just
   * another part of the character string to be matched. You can prepend the
   * `NOT` operator to an expression to negate it. Only filtering on labels is
   * supported. For example, `labels.key=value`.
   */
  filter?: string;
  /**
   * Limit on the number of DICOM stores to return in a single response. If not
   * specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from the previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsDicomStoresPatch.
 */
export interface ProjectsLocationsDatasetsDicomStoresPatchOptions {
  /**
   * The update mask applies to the resource. For the `FieldMask` definition,
   * see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsDicomStoresPatchOptions(data: any): ProjectsLocationsDatasetsDicomStoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsDicomStoresPatchOptions(data: any): ProjectsLocationsDatasetsDicomStoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsFhirStoresCreate.
 */
export interface ProjectsLocationsDatasetsFhirStoresCreateOptions {
  /**
   * The ID of the FHIR store that is being created. The string must match the
   * following regex: `[\p{L}\p{N}_\-\.]{1,256}`.
   */
  fhirStoreId?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsFhirStoresFhirHistory.
 */
export interface ProjectsLocationsDatasetsFhirStoresFhirHistoryOptions {
  /**
   * Only include resource versions that were current at some point during the
   * time period specified in the date time value. The date parameter format is
   * yyyy-mm-ddThh:mm:ss[Z|(+|-)hh:mm] Clients may specify any of the following:
   * * An entire year: `_at=2019` * An entire month: `_at=2019-01` * A specific
   * day: `_at=2019-01-20` * A specific second: `_at=2018-12-31T23:59:58Z`
   */
  _at?: string;
  /**
   * The maximum number of search results on a page. If not specified, 100 is
   * used. May not be larger than 1000.
   */
  _count?: number;
  /**
   * Used to retrieve the first, previous, next, or last page of resource
   * versions when using pagination. Value should be set to the value of
   * `_page_token` set in next or previous page links' URLs. Next and previous
   * page are returned in the response bundle's links field, where
   * `link.relation` is "previous" or "next". Omit `_page_token` if no previous
   * request has been made.
   */
  _page_token?: string;
  /**
   * Only include resource versions that were created at or after the given
   * instant in time. The instant in time uses the format
   * YYYY-MM-DDThh:mm:ss.sss+zz:zz (for example 2015-02-07T13:28:17.239+02:00 or
   * 2017-01-01T00:00:00Z). The time must be specified to the second and include
   * a time zone.
   */
  _since?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsFhirStoresFhirPatient-everything.
 */
export interface ProjectsLocationsDatasetsFhirStoresFhirPatient-everythingOptions {
  /**
   * Maximum number of resources in a page. If not specified, 100 is used. May
   * not be larger than 1000.
   */
  _count?: number;
  /**
   * Used to retrieve the next or previous page of results when using
   * pagination. Set `_page_token` to the value of _page_token set in next or
   * previous page links' url. Next and previous page are returned in the
   * response bundle's links field, where `link.relation` is "previous" or
   * "next". Omit `_page_token` if no previous request has been made.
   */
  _page_token?: string;
  /**
   * If provided, only resources updated after this time are returned. The time
   * uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. For example,
   * `2015-02-07T13:28:17.239+02:00` or `2017-01-01T00:00:00Z`. The time must be
   * specified to the second and include a time zone.
   */
  _since?: string;
  /**
   * String of comma-delimited FHIR resource types. If provided, only resources
   * of the specified resource type(s) are returned.
   */
  _type?: string;
  /**
   * The response includes records prior to the end date. The date uses the
   * format YYYY-MM-DD. If no end date is provided, all records subsequent to
   * the start date are in scope.
   */
  end?: string;
  /**
   * The response includes records subsequent to the start date. The date uses
   * the format YYYY-MM-DD. If no start date is provided, all records prior to
   * the end date are in scope.
   */
  start?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsFhirStoresFhirResource-validate.
 */
export interface ProjectsLocationsDatasetsFhirStoresFhirResource-validateOptions {
  /**
   * The canonical URL of a profile that this resource should be validated
   * against. For example, to validate a Patient resource against the US Core
   * Patient profile this parameter would be
   * `http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient`. A
   * StructureDefinition with this canonical URL must exist in the FHIR store.
   */
  profile?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsFhirStoresGetIamPolicy.
 */
export interface ProjectsLocationsDatasetsFhirStoresGetIamPolicyOptions {
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
 * Additional options for Healthcare#projectsLocationsDatasetsFhirStoresList.
 */
export interface ProjectsLocationsDatasetsFhirStoresListOptions {
  /**
   * Restricts stores returned to those matching a filter. The following syntax
   * is available: * A string field value can be written as text inside
   * quotation marks, for example `"query text"`. The only valid relational
   * operation for text fields is equality (`=`), where text is searched within
   * the field, rather than having the field be equal to the text. For example,
   * `"Comment = great"` returns messages with `great` in the comment field. * A
   * number field value can be written as an integer, a decimal, or an
   * exponential. The valid relational operators for number fields are the
   * equality operator (`=`), along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. * A date
   * field value must be written in `yyyy-mm-dd` form. Fields with date and time
   * use the RFC3339 time format. Leading zeros are required for one-digit
   * months and days. The valid relational operators for date fields are the
   * equality operator (`=`) , along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. *
   * Multiple field query expressions can be combined in one query by adding
   * `AND` or `OR` operators between the expressions. If a boolean operator
   * appears within a quoted string, it is not treated as special, it's just
   * another part of the character string to be matched. You can prepend the
   * `NOT` operator to an expression to negate it. Only filtering on labels is
   * supported, for example `labels.key=value`.
   */
  filter?: string;
  /**
   * Limit on the number of FHIR stores to return in a single response. If not
   * specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from the previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsFhirStoresPatch.
 */
export interface ProjectsLocationsDatasetsFhirStoresPatchOptions {
  /**
   * The update mask applies to the resource. For the `FieldMask` definition,
   * see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsFhirStoresPatchOptions(data: any): ProjectsLocationsDatasetsFhirStoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsFhirStoresPatchOptions(data: any): ProjectsLocationsDatasetsFhirStoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsGetIamPolicy.
 */
export interface ProjectsLocationsDatasetsGetIamPolicyOptions {
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
 * Healthcare#projectsLocationsDatasetsHl7V2StoresCreate.
 */
export interface ProjectsLocationsDatasetsHl7V2StoresCreateOptions {
  /**
   * The ID of the HL7v2 store that is being created. The string must match the
   * following regex: `[\p{L}\p{N}_\-\.]{1,256}`.
   */
  hl7V2StoreId?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsHl7V2StoresGetIamPolicy.
 */
export interface ProjectsLocationsDatasetsHl7V2StoresGetIamPolicyOptions {
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
 * Additional options for Healthcare#projectsLocationsDatasetsHl7V2StoresList.
 */
export interface ProjectsLocationsDatasetsHl7V2StoresListOptions {
  /**
   * Restricts stores returned to those matching a filter. The following syntax
   * is available: * A string field value can be written as text inside
   * quotation marks, for example `"query text"`. The only valid relational
   * operation for text fields is equality (`=`), where text is searched within
   * the field, rather than having the field be equal to the text. For example,
   * `"Comment = great"` returns messages with `great` in the comment field. * A
   * number field value can be written as an integer, a decimal, or an
   * exponential. The valid relational operators for number fields are the
   * equality operator (`=`), along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. * A date
   * field value must be written in `yyyy-mm-dd` form. Fields with date and time
   * use the RFC3339 time format. Leading zeros are required for one-digit
   * months and days. The valid relational operators for date fields are the
   * equality operator (`=`) , along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. *
   * Multiple field query expressions can be combined in one query by adding
   * `AND` or `OR` operators between the expressions. If a boolean operator
   * appears within a quoted string, it is not treated as special, it's just
   * another part of the character string to be matched. You can prepend the
   * `NOT` operator to an expression to negate it. Only filtering on labels is
   * supported. For example, `labels.key=value`.
   */
  filter?: string;
  /**
   * Limit on the number of HL7v2 stores to return in a single response. If not
   * specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from the previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsHl7V2StoresMessagesGet.
 */
export interface ProjectsLocationsDatasetsHl7V2StoresMessagesGetOptions {
  /**
   * Specifies which parts of the Message resource to return in the response.
   * When unspecified, equivalent to FULL.
   */
  view?:  | "MESSAGE_VIEW_UNSPECIFIED" | "RAW_ONLY" | "PARSED_ONLY" | "FULL" | "SCHEMATIZED_ONLY" | "BASIC";
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsHl7V2StoresMessagesList.
 */
export interface ProjectsLocationsDatasetsHl7V2StoresMessagesListOptions {
  /**
   * Restricts messages returned to those matching a filter. The following
   * syntax is available: * A string field value can be written as text inside
   * quotation marks, for example `"query text"`. The only valid relational
   * operation for text fields is equality (`=`), where text is searched within
   * the field, rather than having the field be equal to the text. For example,
   * `"Comment = great"` returns messages with `great` in the comment field. * A
   * number field value can be written as an integer, a decimal, or an
   * exponential. The valid relational operators for number fields are the
   * equality operator (`=`), along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. * A date
   * field value must be written in `yyyy-mm-dd` form. Fields with date and time
   * use the RFC3339 time format. Leading zeros are required for one-digit
   * months and days. The valid relational operators for date fields are the
   * equality operator (`=`) , along with the less than/greater than operators
   * (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator.
   * You can prepend the `NOT` operator to an expression to negate it. *
   * Multiple field query expressions can be combined in one query by adding
   * `AND` or `OR` operators between the expressions. If a boolean operator
   * appears within a quoted string, it is not treated as special, it's just
   * another part of the character string to be matched. You can prepend the
   * `NOT` operator to an expression to negate it. Fields/functions available
   * for filtering are: * `message_type`, from the MSH-9.1 field. For example,
   * `NOT message_type = "ADT"`. * `send_date` or `sendDate`, the YYYY-MM-DD
   * date the message was sent in the dataset's time_zone, from the MSH-7
   * segment. For example, `send_date < "2017-01-02"`. * `send_time`, the
   * timestamp when the message was sent, using the RFC3339 time format for
   * comparisons, from the MSH-7 segment. For example, `send_time <
   * "2017-01-02T00:00:00-05:00"`. * `create_time`, the timestamp when the
   * message was created in the HL7v2 store. Use the RFC3339 time format for
   * comparisons. For example, `create_time < "2017-01-02T00:00:00-05:00"`. *
   * `send_facility`, the care center that the message came from, from the MSH-4
   * segment. For example, `send_facility = "ABC"`. * `PatientId(value, type)`,
   * which matches if the message lists a patient having an ID of the given
   * value and type in the PID-2, PID-3, or PID-4 segments. For example,
   * `PatientId("123456", "MRN")`. * `labels.x`, a string value of the label
   * with key `x` as set using the Message.labels map. For example,
   * `labels."priority"="high"`. The operator `:*` can be used to assert the
   * existence of a label. For example, `labels."priority":*`.
   */
  filter?: string;
  /**
   * Orders messages returned by the specified order_by clause. Syntax:
   * https://cloud.google.com/apis/design/design_patterns#sorting_order Fields
   * available for ordering are: * `send_time`
   */
  orderBy?: string;
  /**
   * Limit on the number of messages to return in a single response. If not
   * specified, 100 is used. May not be larger than 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from the previous List request, if any.
   */
  pageToken?: string;
  /**
   * Specifies the parts of the Message to return in the response. When
   * unspecified, equivalent to BASIC. Setting this to anything other than BASIC
   * with a `page_size` larger than the default can generate a large response,
   * which impacts the performance of this method.
   */
  view?:  | "MESSAGE_VIEW_UNSPECIFIED" | "RAW_ONLY" | "PARSED_ONLY" | "FULL" | "SCHEMATIZED_ONLY" | "BASIC";
}

/**
 * Additional options for
 * Healthcare#projectsLocationsDatasetsHl7V2StoresMessagesPatch.
 */
export interface ProjectsLocationsDatasetsHl7V2StoresMessagesPatchOptions {
  /**
   * The update mask applies to the resource. For the `FieldMask` definition,
   * see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsHl7V2StoresMessagesPatchOptions(data: any): ProjectsLocationsDatasetsHl7V2StoresMessagesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsHl7V2StoresMessagesPatchOptions(data: any): ProjectsLocationsDatasetsHl7V2StoresMessagesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsHl7V2StoresPatch.
 */
export interface ProjectsLocationsDatasetsHl7V2StoresPatchOptions {
  /**
   * The update mask applies to the resource. For the `FieldMask` definition,
   * see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsHl7V2StoresPatchOptions(data: any): ProjectsLocationsDatasetsHl7V2StoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsHl7V2StoresPatchOptions(data: any): ProjectsLocationsDatasetsHl7V2StoresPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsList.
 */
export interface ProjectsLocationsDatasetsListOptions {
  /**
   * The maximum number of items to return. If not specified, 100 is used. May
   * not be larger than 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Healthcare#projectsLocationsDatasetsOperationsList.
 */
export interface ProjectsLocationsDatasetsOperationsListOptions {
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
 * Additional options for Healthcare#projectsLocationsDatasetsPatch.
 */
export interface ProjectsLocationsDatasetsPatchOptions {
  /**
   * The update mask applies to the resource. For the `FieldMask` definition,
   * see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDatasetsPatchOptions(data: any): ProjectsLocationsDatasetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDatasetsPatchOptions(data: any): ProjectsLocationsDatasetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Healthcare#projectsLocationsList.
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
 * Queries all data_ids that are consented for a given use in the given consent
 * store and writes them to a specified destination. The returned Operation
 * includes a progress counter for the number of User data mappings processed.
 * Errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging]
 * (https://cloud.google.com/healthcare/docs/how-tos/logging) and
 * [QueryAccessibleData] for a sample log entry).
 */
export interface QueryAccessibleDataRequest {
  /**
   * The Cloud Storage destination. The Cloud Healthcare API service account
   * must have the `roles/storage.objectAdmin` Cloud IAM role for this Cloud
   * Storage location.
   */
  gcsDestination?: GoogleCloudHealthcareV1ConsentGcsDestination;
  /**
   * The values of request attributes associated with this access request.
   */
  requestAttributes?: {
    [key: string]: string
  };
  /**
   * Optional. The values of resource attributes associated with the type of
   * resources being requested. If no values are specified, then all resource
   * types are included in the output.
   */
  resourceAttributes?: {
    [key: string]: string
  };
}

/**
 * Response for successful QueryAccessibleData operations. This structure is
 * included in the response upon operation completion.
 */
export interface QueryAccessibleDataResponse {
  /**
   * List of files, each of which contains a list of data_id(s) that are
   * consented for a specified use in the request.
   */
  gcsUris?: string[];
}

/**
 * Define how to redact sensitive values. Default behaviour is erase. For
 * example, "My name is Jane." becomes "My name is ."
 */
export interface RedactConfig {
}

/**
 * Rejects the latest revision of the specified Consent by committing a new
 * revision with `state` updated to `REJECTED`. If the latest revision of the
 * given Consent is in the `REJECTED` state, no new revision is committed.
 */
export interface RejectConsentRequest {
  /**
   * Optional. The resource name of the Consent artifact that contains
   * documentation of the user's rejection of the draft Consent, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`.
   * If the draft Consent had a Consent artifact, this Consent artifact
   * overwrites it.
   */
  consentArtifact?: string;
}

/**
 * When using the INSPECT_AND_TRANSFORM action, each match is replaced with the
 * name of the info_type. For example, "My name is Jane" becomes "My name is
 * [PERSON_NAME]." The TRANSFORM action is equivalent to redacting.
 */
export interface ReplaceWithInfoTypeConfig {
}

/**
 * A list of FHIR resources.
 */
export interface Resources {
  /**
   * List of resources IDs. For example, "Patient/1234".
   */
  resources?: string[];
}

/**
 * The consent evaluation result for a single `data_id`.
 */
export interface Result {
  /**
   * The resource names of all evaluated Consents mapped to their evaluation.
   */
  consentDetails?: {
    [key: string]: ConsentEvaluation
  };
  /**
   * Whether the resource is consented for the given use.
   */
  consented?: boolean;
  /**
   * The unique identifier of the evaluated resource.
   */
  dataId?: string;
}

/**
 * Revokes the latest revision of the specified Consent by committing a new
 * revision with `state` updated to `REVOKED`. If the latest revision of the
 * given Consent is in the `REVOKED` state, no new revision is committed.
 */
export interface RevokeConsentRequest {
  /**
   * Optional. The resource name of the Consent artifact that contains proof of
   * the user's revocation of the Consent, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`.
   */
  consentArtifact?: string;
}

/**
 * Configuration for the FHIR BigQuery schema. Determines how the server
 * generates the schema.
 */
export interface SchemaConfig {
  /**
   * The configuration for exported BigQuery tables to be partitioned by FHIR
   * resource's last updated time column.
   */
  lastUpdatedPartitionConfig?: TimePartitioning;
  /**
   * The depth for all recursive structures in the output analytics schema. For
   * example, `concept` in the CodeSystem resource is a recursive structure;
   * when the depth is 2, the CodeSystem table will have a column called
   * `concept.concept` but not `concept.concept.concept`. If not specified or
   * set to 0, the server will use the default value 2. The maximum depth
   * allowed is 5.
   */
  recursiveStructureDepth?: bigint;
  /**
   * Specifies the output schema type. Schema type is required.
   */
  schemaType?:  | "SCHEMA_TYPE_UNSPECIFIED" | "ANALYTICS" | "ANALYTICS_V2";
}

function serializeSchemaConfig(data: any): SchemaConfig {
  return {
    ...data,
    lastUpdatedPartitionConfig: data["lastUpdatedPartitionConfig"] !== undefined ? serializeTimePartitioning(data["lastUpdatedPartitionConfig"]) : undefined,
    recursiveStructureDepth: data["recursiveStructureDepth"] !== undefined ? String(data["recursiveStructureDepth"]) : undefined,
  };
}

function deserializeSchemaConfig(data: any): SchemaConfig {
  return {
    ...data,
    lastUpdatedPartitionConfig: data["lastUpdatedPartitionConfig"] !== undefined ? deserializeTimePartitioning(data["lastUpdatedPartitionConfig"]) : undefined,
    recursiveStructureDepth: data["recursiveStructureDepth"] !== undefined ? BigInt(data["recursiveStructureDepth"]) : undefined,
  };
}

/**
 * An HL7v2 logical group construct.
 */
export interface SchemaGroup {
  /**
   * True indicates that this is a choice group, meaning that only one of its
   * segments can exist in a given message.
   */
  choice?: boolean;
  /**
   * The maximum number of times this group can be repeated. 0 or -1 means
   * unbounded.
   */
  maxOccurs?: number;
  /**
   * Nested groups and/or segments.
   */
  members?: GroupOrSegment[];
  /**
   * The minimum number of times this group must be present/repeated.
   */
  minOccurs?: number;
  /**
   * The name of this group. For example, "ORDER_DETAIL".
   */
  name?: string;
}

/**
 * A schema package contains a set of schemas and type definitions.
 */
export interface SchemaPackage {
  /**
   * Flag to ignore all min_occurs restrictions in the schema. This means that
   * incoming messages can omit any group, segment, field, component, or
   * subcomponent.
   */
  ignoreMinOccurs?: boolean;
  /**
   * Schema configs that are layered based on their VersionSources that match
   * the incoming message. Schema configs present in higher indices override
   * those in lower indices with the same message type and trigger event if
   * their VersionSources all match an incoming message.
   */
  schemas?: Hl7SchemaConfig[];
  /**
   * Determines how messages that fail to parse are handled.
   */
  schematizedParsingType?:  | "SCHEMATIZED_PARSING_TYPE_UNSPECIFIED" | "SOFT_FAIL" | "HARD_FAIL";
  /**
   * Schema type definitions that are layered based on their VersionSources
   * that match the incoming message. Type definitions present in higher indices
   * override those in lower indices with the same type name if their
   * VersionSources all match an incoming message.
   */
  types?: Hl7TypesConfig[];
  /**
   * Determines how unexpected segments (segments not matched to the schema)
   * are handled.
   */
  unexpectedSegmentHandling?:  | "UNEXPECTED_SEGMENT_HANDLING_MODE_UNSPECIFIED" | "FAIL" | "SKIP" | "PARSE";
}

/**
 * An HL7v2 Segment.
 */
export interface SchemaSegment {
  /**
   * The maximum number of times this segment can be present in this group. 0
   * or -1 means unbounded.
   */
  maxOccurs?: number;
  /**
   * The minimum number of times this segment can be present in this group.
   */
  minOccurs?: number;
  /**
   * The Segment type. For example, "PID".
   */
  type?: string;
}

/**
 * The content of an HL7v2 message in a structured format as specified by a
 * schema.
 */
export interface SchematizedData {
  /**
   * JSON output of the parser.
   */
  data?: string;
  /**
   * The error output of the parser.
   */
  error?: string;
}

/**
 * Request to search the resources in the specified FHIR store.
 */
export interface SearchResourcesRequest {
  /**
   * The FHIR resource type to search, such as Patient or Observation. For a
   * complete list, see the FHIR Resource Index
   * ([DSTU2](http://hl7.org/implement/standards/fhir/DSTU2/resourcelist.html),
   * [STU3](http://hl7.org/implement/standards/fhir/STU3/resourcelist.html),
   * [R4](http://hl7.org/implement/standards/fhir/R4/resourcelist.html)).
   */
  resourceType?: string;
}

/**
 * A segment in a structured format.
 */
export interface Segment {
  /**
   * A mapping from the positional location to the value. The key string uses
   * zero-based indexes separated by dots to identify Fields, components and
   * sub-components. A bracket notation is also used to identify different
   * instances of a repeated field. Regex for key: (\d+)(\[\d+\])?(.\d+)?(.\d+)?
   * Examples of (key, value) pairs: * (0.1, "hemoglobin") denotes that the
   * first component of Field 0 has the value "hemoglobin". * (1.1.2, "CBC")
   * denotes that the second sub-component of the first component of Field 1 has
   * the value "CBC". * (1[0].1, "HbA1c") denotes that the first component of
   * the first Instance of Field 1, which is repeated, has the value "HbA1c".
   */
  fields?: {
    [key: string]: string
  };
  /**
   * A string that indicates the type of segment. For example, EVN or PID.
   */
  segmentId?: string;
  /**
   * Set ID for segments that can be in a set. This can be empty if it's
   * missing or isn't applicable.
   */
  setId?: string;
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
 * User signature.
 */
export interface Signature {
  /**
   * Optional. An image of the user's signature.
   */
  image?: Image;
  /**
   * Optional. Metadata associated with the user's signature. For example, the
   * user's name or the user's title.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Optional. Timestamp of the signature.
   */
  signatureTime?: Date;
  /**
   * Required. User's UUID provided by the client.
   */
  userId?: string;
}

function serializeSignature(data: any): Signature {
  return {
    ...data,
    image: data["image"] !== undefined ? serializeImage(data["image"]) : undefined,
    signatureTime: data["signatureTime"] !== undefined ? data["signatureTime"].toISOString() : undefined,
  };
}

function deserializeSignature(data: any): Signature {
  return {
    ...data,
    image: data["image"] !== undefined ? deserializeImage(data["image"]) : undefined,
    signatureTime: data["signatureTime"] !== undefined ? new Date(data["signatureTime"]) : undefined,
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
 * Contains configuration for streaming FHIR export.
 */
export interface StreamConfig {
  /**
   * The destination BigQuery structure that contains both the dataset location
   * and corresponding schema config. The output is organized in one table per
   * resource type. The server reuses the existing tables (if any) that are
   * named after the resource types. For example, "Patient", "Observation". When
   * there is no existing table for a given resource type, the server attempts
   * to create one. When a table schema doesn't align with the schema config,
   * either because of existing incompatible schema or out of band incompatible
   * modification, the server does not stream in new data. BigQuery imposes a 1
   * MB limit on streaming insert row size, therefore any resource mutation that
   * generates more than 1 MB of BigQuery data is not streamed. One resolution
   * in this case is to delete the incompatible table and let the server
   * recreate one, though the newly created table only contains data after the
   * table recreation. Results are written to BigQuery tables according to the
   * parameters in BigQueryDestination.WriteDisposition. Different versions of
   * the same resource are distinguishable by the meta.versionId and
   * meta.lastUpdated columns. The operation (CREATE/UPDATE/DELETE) that results
   * in the new version is recorded in the meta.tag. The tables contain all
   * historical resource versions since streaming was enabled. For query
   * convenience, the server also creates one view per table of the same name
   * containing only the current resource version. The streamed data in the
   * BigQuery dataset is not guaranteed to be completely unique. The combination
   * of the id and meta.versionId columns should ideally identify a single
   * unique row. But in rare cases, duplicates may exist. At query time, users
   * may use the SQL select statement to keep only one of the duplicate rows
   * given an id and meta.versionId pair. Alternatively, the server created view
   * mentioned above also filters out duplicates. If a resource mutation cannot
   * be streamed to BigQuery, errors are logged to Cloud Logging. For more
   * information, see [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   */
  bigqueryDestination?: GoogleCloudHealthcareV1FhirBigQueryDestination;
  /**
   * The destination FHIR store for de-identified resources. After this field
   * is added, all subsequent creates/updates/patches to the source store will
   * be de-identified using the provided configuration and applied to the
   * destination store. Importing resources to the source store will not trigger
   * the streaming. If the source store already contains resources when this
   * option is enabled, those resources will not be copied to the destination
   * store unless they are subsequently updated. This may result in invalid
   * references in the destination store. Before adding this config, you must
   * grant the healthcare.fhirResources.update permission on the destination
   * store to your project's **Cloud Healthcare Service Agent** [service
   * account](https://cloud.google.com/healthcare/docs/how-tos/permissions-healthcare-api-gcp-products#the_cloud_healthcare_service_agent).
   * The destination store must set enable_update_create to true. The
   * destination store must have disable_referential_integrity set to true. If a
   * resource cannot be de-identified, errors will be logged to Cloud Logging
   * (see [Viewing error logs in Cloud
   * Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)).
   */
  deidentifiedStoreDestination?: DeidentifiedStoreDestination;
  /**
   * Supply a FHIR resource type (such as "Patient" or "Observation"). See
   * https://www.hl7.org/fhir/valueset-resource-types.html for a list of all
   * FHIR resource types. The server treats an empty list as an intent to stream
   * all the supported resource types in this FHIR store.
   */
  resourceTypes?: string[];
}

function serializeStreamConfig(data: any): StreamConfig {
  return {
    ...data,
    bigqueryDestination: data["bigqueryDestination"] !== undefined ? serializeGoogleCloudHealthcareV1FhirBigQueryDestination(data["bigqueryDestination"]) : undefined,
    deidentifiedStoreDestination: data["deidentifiedStoreDestination"] !== undefined ? serializeDeidentifiedStoreDestination(data["deidentifiedStoreDestination"]) : undefined,
  };
}

function deserializeStreamConfig(data: any): StreamConfig {
  return {
    ...data,
    bigqueryDestination: data["bigqueryDestination"] !== undefined ? deserializeGoogleCloudHealthcareV1FhirBigQueryDestination(data["bigqueryDestination"]) : undefined,
    deidentifiedStoreDestination: data["deidentifiedStoreDestination"] !== undefined ? deserializeDeidentifiedStoreDestination(data["deidentifiedStoreDestination"]) : undefined,
  };
}

/**
 * List of tags to be filtered.
 */
export interface TagFilterList {
  /**
   * Tags to be filtered. Tags must be DICOM Data Elements, File Meta Elements,
   * or Directory Structuring Elements, as defined at:
   * http://dicom.nema.org/medical/dicom/current/output/html/part06.html#table_6-1,.
   * They may be provided by "Keyword" or "Tag". For example "PatientID",
   * "00100010".
   */
  tags?: string[];
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

export interface TextConfig {
  /**
   * The transformations to apply to the detected data. Deprecated. Use
   * `additional_transformations` instead.
   */
  transformations?: InfoTypeTransformation[];
}

function serializeTextConfig(data: any): TextConfig {
  return {
    ...data,
    transformations: data["transformations"] !== undefined ? data["transformations"].map((item: any) => (serializeInfoTypeTransformation(item))) : undefined,
  };
}

function deserializeTextConfig(data: any): TextConfig {
  return {
    ...data,
    transformations: data["transformations"] !== undefined ? data["transformations"].map((item: any) => (deserializeInfoTypeTransformation(item))) : undefined,
  };
}

/**
 * A span of text in the provided document.
 */
export interface TextSpan {
  /**
   * The unicode codepoint index of the beginning of this span.
   */
  beginOffset?: number;
  /**
   * The original text contained in this span.
   */
  content?: string;
}

/**
 * Configuration for FHIR BigQuery time-partitioned tables.
 */
export interface TimePartitioning {
  /**
   * Number of milliseconds for which to keep the storage for a partition.
   */
  expirationMs?: bigint;
  /**
   * Type of partitioning.
   */
  type?:  | "PARTITION_TYPE_UNSPECIFIED" | "HOUR" | "DAY" | "MONTH" | "YEAR";
}

function serializeTimePartitioning(data: any): TimePartitioning {
  return {
    ...data,
    expirationMs: data["expirationMs"] !== undefined ? String(data["expirationMs"]) : undefined,
  };
}

function deserializeTimePartitioning(data: any): TimePartitioning {
  return {
    ...data,
    expirationMs: data["expirationMs"] !== undefined ? BigInt(data["expirationMs"]) : undefined,
  };
}

/**
 * A type definition for some HL7v2 type (incl. Segments and Datatypes).
 */
export interface Type {
  /**
   * The (sub) fields this type has (if not primitive).
   */
  fields?: Field[];
  /**
   * The name of this type. This would be the segment or datatype name. For
   * example, "PID" or "XPN".
   */
  name?: string;
  /**
   * If this is a primitive type then this field is the type of the primitive
   * For example, STRING. Leave unspecified for composite types.
   */
  primitive?:  | "PRIMITIVE_UNSPECIFIED" | "STRING" | "VARIES" | "UNESCAPED_STRING";
}

/**
 * Maps a resource to the associated user and Attributes.
 */
export interface UserDataMapping {
  /**
   * Output only. Indicates whether this mapping is archived.
   */
  readonly archived?: boolean;
  /**
   * Output only. Indicates the time when this mapping was archived.
   */
  readonly archiveTime?: Date;
  /**
   * Required. A unique identifier for the mapped resource.
   */
  dataId?: string;
  /**
   * Resource name of the User data mapping, of the form
   * `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/userDataMappings/{user_data_mapping_id}`.
   */
  name?: string;
  /**
   * Attributes of the resource. Only explicitly set attributes are displayed
   * here. Attribute definitions with defaults set implicitly apply to these
   * User data mappings. Attributes listed here must be single valued, that is,
   * exactly one value is specified for the field "values" in each Attribute.
   */
  resourceAttributes?: Attribute[];
  /**
   * Required. User's UUID provided by the client.
   */
  userId?: string;
}

/**
 * Contains the configuration for FHIR profiles and validation.
 */
export interface ValidationConfig {
  /**
   * Whether to disable FHIRPath validation for incoming resources. Set this to
   * true to disable checking incoming resources for conformance against
   * FHIRPath requirement defined in the FHIR specification. This property only
   * affects resource types that do not have profiles configured for them, any
   * rules in enabled implementation guides will still be enforced.
   */
  disableFhirpathValidation?: boolean;
  /**
   * Whether to disable profile validation for this FHIR store. Set this to
   * true to disable checking incoming resources for conformance against
   * structure definitions in this FHIR store.
   */
  disableProfileValidation?: boolean;
  /**
   * Whether to disable reference type validation for incoming resources. Set
   * this to true to disable checking incoming resources for conformance against
   * reference type requirement defined in the FHIR specification. This property
   * only affects resource types that do not have profiles configured for them,
   * any rules in enabled implementation guides will still be enforced.
   */
  disableReferenceTypeValidation?: boolean;
  /**
   * Whether to disable required fields validation for incoming resources. Set
   * this to true to disable checking incoming resources for conformance against
   * required fields requirement defined in the FHIR specification. This
   * property only affects resource types that do not have profiles configured
   * for them, any rules in enabled implementation guides will still be
   * enforced.
   */
  disableRequiredFieldValidation?: boolean;
  /**
   * A list of implementation guide URLs in this FHIR store that are used to
   * configure the profiles to use for validation. For example, to use the US
   * Core profiles for validation, set `enabled_implementation_guides` to
   * `["http://hl7.org/fhir/us/core/ImplementationGuide/ig"]`. If
   * `enabled_implementation_guides` is empty or omitted, then incoming
   * resources are only required to conform to the base FHIR profiles.
   * Otherwise, a resource must conform to at least one profile listed in the
   * `global` property of one of the enabled ImplementationGuides. The Cloud
   * Healthcare API does not currently enforce all of the rules in a
   * StructureDefinition. The following rules are supported: - min/max -
   * minValue/maxValue - maxLength - type - fixed[x] - pattern[x] on simple
   * types - slicing, when using "value" as the discriminator type When a URL
   * cannot be resolved (for example, in a type assertion), the server does not
   * return an error.
   */
  enabledImplementationGuides?: string[];
}

/**
 * Describes a selector for extracting and matching an MSH field to a value.
 */
export interface VersionSource {
  /**
   * The field to extract from the MSH segment. For example, "3.1" or
   * "18[1].1".
   */
  mshField?: string;
  /**
   * The value to match with the field. For example, "My Application Name" or
   * "2.3".
   */
  value?: string;
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
