// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Cloud Data Catalog API Client for Deno
 * =============================================
 * 
 * A fully managed and highly scalable data discovery and metadata management service. 
 * 
 * Docs: https://cloud.google.com/data-catalog/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * A fully managed and highly scalable data discovery and metadata management
 * service.
 */
export class DataCatalog {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://datacatalog.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Searches Data Catalog for multiple resources like entries and tags that
   * match a query. This is a [Custom Method]
   * (https://cloud.google.com/apis/design/custom_methods) that doesn't return
   * all information on a resource, only its ID and high level fields. To get
   * more information, you can subsequently call specific get methods. Note:
   * Data Catalog search queries don't guarantee full recall. Results that match
   * your query might not be returned, even in subsequent result pages.
   * Additionally, returned (and not returned) results can vary if you repeat
   * search queries. For more information, see [Data Catalog search syntax]
   * (https://cloud.google.com/data-catalog/docs/how-to/search-reference).
   *
   */
  async catalogSearch(req: GoogleCloudDatacatalogV1SearchCatalogRequest): Promise<GoogleCloudDatacatalogV1SearchCatalogResponse> {
    const url = new URL(`${this.#baseUrl}v1/catalog:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogV1SearchCatalogResponse(data);
  }

  /**
   * Gets an entry by its target resource name. The resource name comes from
   * the source Google Cloud Platform service.
   *
   */
  async entriesLookup(opts: EntriesLookupOptions = {}): Promise<GoogleCloudDatacatalogV1Entry> {
    const url = new URL(`${this.#baseUrl}v1/entries:lookup`);
    if (opts.fullyQualifiedName !== undefined) {
      url.searchParams.append("fullyQualifiedName", String(opts.fullyQualifiedName));
    }
    if (opts.linkedResource !== undefined) {
      url.searchParams.append("linkedResource", String(opts.linkedResource));
    }
    if (opts.sqlResource !== undefined) {
      url.searchParams.append("sqlResource", String(opts.sqlResource));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatacatalogV1Entry(data);
  }

  /**
   * Creates an entry group. An entry group contains logically related entries
   * together with [Cloud Identity and Access
   * Management](/data-catalog/docs/concepts/iam) policies. These policies
   * specify users who can create, edit, and view entries within entry groups.
   * Data Catalog automatically creates entry groups with names that start with
   * the `@` symbol for the following resources: * BigQuery entries
   * (`@bigquery`) * Pub/Sub topics (`@pubsub`) * Dataproc Metastore services
   * (`@dataproc_metastore_{SERVICE_NAME_HASH}`) You can create your own entry
   * groups for Cloud Storage fileset entries and custom entries together with
   * the corresponding IAM policies. User-created entry groups can't contain the
   * `@` symbol, it is reserved for automatically created groups. Entry groups,
   * like entries, can be searched. A maximum of 10,000 entry groups may be
   * created per organization across all locations. You must enable the Data
   * Catalog API in the project identified by the `parent` parameter. For more
   * information, see [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param parent Required. The names of the project and location that the new entry group belongs to. Note: The entry group itself and its child resources might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsCreate(parent: string, req: GoogleCloudDatacatalogV1EntryGroup, opts: ProjectsLocationsEntryGroupsCreateOptions = {}): Promise<GoogleCloudDatacatalogV1EntryGroup> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entryGroups`);
    if (opts.entryGroupId !== undefined) {
      url.searchParams.append("entryGroupId", String(opts.entryGroupId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1EntryGroup;
  }

  /**
   * Deletes an entry group. You must enable the Data Catalog API in the
   * project identified by the `name` parameter. For more information, see [Data
   * Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name Required. The name of the entry group to delete.
   */
  async projectsLocationsEntryGroupsDelete(name: string, opts: ProjectsLocationsEntryGroupsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Creates an entry. You can create entries only with 'FILESET', 'CLUSTER',
   * 'DATA_STREAM', or custom types. Data Catalog automatically creates entries
   * with other types during metadata ingestion from integrated systems. You
   * must enable the Data Catalog API in the project identified by the `parent`
   * parameter. For more information, see [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   * An entry group can have a maximum of 100,000 entries.
   *
   * @param parent Required. The name of the entry group this entry belongs to. Note: The entry itself and its child resources might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsEntriesCreate(parent: string, req: GoogleCloudDatacatalogV1Entry, opts: ProjectsLocationsEntryGroupsEntriesCreateOptions = {}): Promise<GoogleCloudDatacatalogV1Entry> {
    req = serializeGoogleCloudDatacatalogV1Entry(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
    if (opts.entryId !== undefined) {
      url.searchParams.append("entryId", String(opts.entryId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogV1Entry(data);
  }

  /**
   * Deletes an existing entry. You can delete only the entries created by the
   * CreateEntry method. You must enable the Data Catalog API in the project
   * identified by the `name` parameter. For more information, see [Data Catalog
   * resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name Required. The name of the entry to delete.
   */
  async projectsLocationsEntryGroupsEntriesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an entry.
   *
   * @param name Required. The name of the entry to get.
   */
  async projectsLocationsEntryGroupsEntriesGet(name: string): Promise<GoogleCloudDatacatalogV1Entry> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatacatalogV1Entry(data);
  }

  /**
   * Gets the access control policy for a resource. May return: * A`NOT_FOUND`
   * error if the resource doesn't exist or you don't have the permission to
   * view it. * An empty policy if the resource exists but doesn't have a set
   * policy. Supported resources are: - Tag templates - Entry groups Note: This
   * method doesn't get policies from Google Cloud Platform resources ingested
   * into Data Catalog. To call this method, you must have the following Google
   * IAM permissions: - `datacatalog.tagTemplates.getIamPolicy` to get policies
   * on tag templates. - `datacatalog.entryGroups.getIamPolicy` to get policies
   * on entry groups.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEntryGroupsEntriesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Imports entries from a source, such as data previously dumped into a Cloud
   * Storage bucket, into Data Catalog. Import of entries is a sync operation
   * that reconciles the state of the third-party system with the Data Catalog.
   * `ImportEntries` accepts source data snapshots of a third-party system.
   * Snapshot should be delivered as a .wire or base65-encoded .txt file
   * containing a sequence of Protocol Buffer messages of DumpItem type.
   * `ImportEntries` returns a long-running operation resource that can be
   * queried with Operations.GetOperation to return ImportEntriesMetadata and an
   * ImportEntriesResponse message.
   *
   * @param parent Required. Target entry group for ingested entries.
   */
  async projectsLocationsEntryGroupsEntriesImport(parent: string, req: GoogleCloudDatacatalogV1ImportEntriesRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists entries. Note: Currently, this method can list only custom entries.
   * To get a list of both custom and automatically created entries, use
   * SearchCatalog.
   *
   * @param parent Required. The name of the entry group that contains the entries to list. Can be provided in URL format.
   */
  async projectsLocationsEntryGroupsEntriesList(parent: string, opts: ProjectsLocationsEntryGroupsEntriesListOptions = {}): Promise<GoogleCloudDatacatalogV1ListEntriesResponse> {
    opts = serializeProjectsLocationsEntryGroupsEntriesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entries`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatacatalogV1ListEntriesResponse(data);
  }

  /**
   * Modifies contacts, part of the business context of an Entry. To call this
   * method, you must have the `datacatalog.entries.updateContacts` IAM
   * permission on the corresponding project.
   *
   * @param name Required. The full resource name of the entry.
   */
  async projectsLocationsEntryGroupsEntriesModifyEntryContacts(name: string, req: GoogleCloudDatacatalogV1ModifyEntryContactsRequest): Promise<GoogleCloudDatacatalogV1Contacts> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:modifyEntryContacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1Contacts;
  }

  /**
   * Modifies entry overview, part of the business context of an Entry. To call
   * this method, you must have the `datacatalog.entries.updateOverview` IAM
   * permission on the corresponding project.
   *
   * @param name Required. The full resource name of the entry.
   */
  async projectsLocationsEntryGroupsEntriesModifyEntryOverview(name: string, req: GoogleCloudDatacatalogV1ModifyEntryOverviewRequest): Promise<GoogleCloudDatacatalogV1EntryOverview> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:modifyEntryOverview`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1EntryOverview;
  }

  /**
   * Updates an existing entry. You must enable the Data Catalog API in the
   * project identified by the `entry.name` parameter. For more information, see
   * [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name Output only. The resource name of an entry in URL format. Note: The entry itself and its child resources might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsEntriesPatch(name: string, req: GoogleCloudDatacatalogV1Entry, opts: ProjectsLocationsEntryGroupsEntriesPatchOptions = {}): Promise<GoogleCloudDatacatalogV1Entry> {
    req = serializeGoogleCloudDatacatalogV1Entry(req);
    opts = serializeProjectsLocationsEntryGroupsEntriesPatchOptions(opts);
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
    return deserializeGoogleCloudDatacatalogV1Entry(data);
  }

  /**
   * Marks an Entry as starred by the current user. Starring information is
   * private to each user.
   *
   * @param name Required. The name of the entry to mark as starred.
   */
  async projectsLocationsEntryGroupsEntriesStar(name: string, req: GoogleCloudDatacatalogV1StarEntryRequest): Promise<GoogleCloudDatacatalogV1StarEntryResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:star`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1StarEntryResponse;
  }

  /**
   * Creates a tag and assigns it to: * An Entry if the method name is
   * `projects.locations.entryGroups.entries.tags.create`. * Or EntryGroupif the
   * method name is `projects.locations.entryGroups.tags.create`. Note: The
   * project identified by the `parent` parameter for the [tag]
   * (https://cloud.google.com/data-catalog/docs/reference/rest/v1/projects.locations.entryGroups.entries.tags/create#path-parameters)
   * and the [tag template]
   * (https://cloud.google.com/data-catalog/docs/reference/rest/v1/projects.locations.tagTemplates/create#path-parameters)
   * used to create the tag must be in the same organization.
   *
   * @param parent Required. The name of the resource to attach this tag to. Tags can be attached to entries or entry groups. An entry can have up to 1000 attached tags. Note: The tag and its child resources might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsEntriesTagsCreate(parent: string, req: GoogleCloudDatacatalogV1Tag): Promise<GoogleCloudDatacatalogV1Tag> {
    req = serializeGoogleCloudDatacatalogV1Tag(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tags`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogV1Tag(data);
  }

  /**
   * Deletes a tag.
   *
   * @param name Required. The name of the tag to delete.
   */
  async projectsLocationsEntryGroupsEntriesTagsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists tags assigned to an Entry. The columns in the response are
   * lowercased.
   *
   * @param parent Required. The name of the Data Catalog resource to list the tags of. The resource can be an Entry or an EntryGroup (without `/entries/{entries}` at the end).
   */
  async projectsLocationsEntryGroupsEntriesTagsList(parent: string, opts: ProjectsLocationsEntryGroupsEntriesTagsListOptions = {}): Promise<GoogleCloudDatacatalogV1ListTagsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tags`);
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
    return deserializeGoogleCloudDatacatalogV1ListTagsResponse(data);
  }

  /**
   * Updates an existing tag.
   *
   * @param name The resource name of the tag in URL format where tag ID is a system-generated identifier. Note: The tag itself might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsEntriesTagsPatch(name: string, req: GoogleCloudDatacatalogV1Tag, opts: ProjectsLocationsEntryGroupsEntriesTagsPatchOptions = {}): Promise<GoogleCloudDatacatalogV1Tag> {
    req = serializeGoogleCloudDatacatalogV1Tag(req);
    opts = serializeProjectsLocationsEntryGroupsEntriesTagsPatchOptions(opts);
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
    return deserializeGoogleCloudDatacatalogV1Tag(data);
  }

  /**
   * Gets your permissions on a resource. Returns an empty set of permissions
   * if the resource doesn't exist. Supported resources are: - Tag templates -
   * Entry groups Note: This method gets policies only within Data Catalog and
   * can't be used to get policies from BigQuery, Pub/Sub, Dataproc Metastore,
   * and any external Google Cloud Platform resources ingested into Data
   * Catalog. No Google IAM permissions are required to call this method.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEntryGroupsEntriesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Marks an Entry as NOT starred by the current user. Starring information is
   * private to each user.
   *
   * @param name Required. The name of the entry to mark as **not** starred.
   */
  async projectsLocationsEntryGroupsEntriesUnstar(name: string, req: GoogleCloudDatacatalogV1UnstarEntryRequest): Promise<GoogleCloudDatacatalogV1UnstarEntryResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:unstar`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1UnstarEntryResponse;
  }

  /**
   * Gets an entry group.
   *
   * @param name Required. The name of the entry group to get.
   */
  async projectsLocationsEntryGroupsGet(name: string, opts: ProjectsLocationsEntryGroupsGetOptions = {}): Promise<GoogleCloudDatacatalogV1EntryGroup> {
    opts = serializeProjectsLocationsEntryGroupsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatacatalogV1EntryGroup;
  }

  /**
   * Gets the access control policy for a resource. May return: * A`NOT_FOUND`
   * error if the resource doesn't exist or you don't have the permission to
   * view it. * An empty policy if the resource exists but doesn't have a set
   * policy. Supported resources are: - Tag templates - Entry groups Note: This
   * method doesn't get policies from Google Cloud Platform resources ingested
   * into Data Catalog. To call this method, you must have the following Google
   * IAM permissions: - `datacatalog.tagTemplates.getIamPolicy` to get policies
   * on tag templates. - `datacatalog.entryGroups.getIamPolicy` to get policies
   * on entry groups.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEntryGroupsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Lists entry groups.
   *
   * @param parent Required. The name of the location that contains the entry groups to list. Can be provided as a URL.
   */
  async projectsLocationsEntryGroupsList(parent: string, opts: ProjectsLocationsEntryGroupsListOptions = {}): Promise<GoogleCloudDatacatalogV1ListEntryGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entryGroups`);
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
    return data as GoogleCloudDatacatalogV1ListEntryGroupsResponse;
  }

  /**
   * Updates an entry group. You must enable the Data Catalog API in the
   * project identified by the `entry_group.name` parameter. For more
   * information, see [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name The resource name of the entry group in URL format. Note: The entry group itself and its child resources might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsPatch(name: string, req: GoogleCloudDatacatalogV1EntryGroup, opts: ProjectsLocationsEntryGroupsPatchOptions = {}): Promise<GoogleCloudDatacatalogV1EntryGroup> {
    opts = serializeProjectsLocationsEntryGroupsPatchOptions(opts);
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
    return data as GoogleCloudDatacatalogV1EntryGroup;
  }

  /**
   * Sets an access control policy for a resource. Replaces any existing
   * policy. Supported resources are: - Tag templates - Entry groups Note: This
   * method sets policies only within Data Catalog and can't be used to manage
   * policies in BigQuery, Pub/Sub, Dataproc Metastore, and any external Google
   * Cloud Platform resources synced with the Data Catalog. To call this method,
   * you must have the following Google IAM permissions: -
   * `datacatalog.tagTemplates.setIamPolicy` to set policies on tag templates. -
   * `datacatalog.entryGroups.setIamPolicy` to set policies on entry groups.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEntryGroupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Creates a tag and assigns it to: * An Entry if the method name is
   * `projects.locations.entryGroups.entries.tags.create`. * Or EntryGroupif the
   * method name is `projects.locations.entryGroups.tags.create`. Note: The
   * project identified by the `parent` parameter for the [tag]
   * (https://cloud.google.com/data-catalog/docs/reference/rest/v1/projects.locations.entryGroups.entries.tags/create#path-parameters)
   * and the [tag template]
   * (https://cloud.google.com/data-catalog/docs/reference/rest/v1/projects.locations.tagTemplates/create#path-parameters)
   * used to create the tag must be in the same organization.
   *
   * @param parent Required. The name of the resource to attach this tag to. Tags can be attached to entries or entry groups. An entry can have up to 1000 attached tags. Note: The tag and its child resources might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsTagsCreate(parent: string, req: GoogleCloudDatacatalogV1Tag): Promise<GoogleCloudDatacatalogV1Tag> {
    req = serializeGoogleCloudDatacatalogV1Tag(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tags`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogV1Tag(data);
  }

  /**
   * Deletes a tag.
   *
   * @param name Required. The name of the tag to delete.
   */
  async projectsLocationsEntryGroupsTagsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists tags assigned to an Entry. The columns in the response are
   * lowercased.
   *
   * @param parent Required. The name of the Data Catalog resource to list the tags of. The resource can be an Entry or an EntryGroup (without `/entries/{entries}` at the end).
   */
  async projectsLocationsEntryGroupsTagsList(parent: string, opts: ProjectsLocationsEntryGroupsTagsListOptions = {}): Promise<GoogleCloudDatacatalogV1ListTagsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tags`);
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
    return deserializeGoogleCloudDatacatalogV1ListTagsResponse(data);
  }

  /**
   * Updates an existing tag.
   *
   * @param name The resource name of the tag in URL format where tag ID is a system-generated identifier. Note: The tag itself might not be stored in the location specified in its name.
   */
  async projectsLocationsEntryGroupsTagsPatch(name: string, req: GoogleCloudDatacatalogV1Tag, opts: ProjectsLocationsEntryGroupsTagsPatchOptions = {}): Promise<GoogleCloudDatacatalogV1Tag> {
    req = serializeGoogleCloudDatacatalogV1Tag(req);
    opts = serializeProjectsLocationsEntryGroupsTagsPatchOptions(opts);
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
    return deserializeGoogleCloudDatacatalogV1Tag(data);
  }

  /**
   * Gets your permissions on a resource. Returns an empty set of permissions
   * if the resource doesn't exist. Supported resources are: - Tag templates -
   * Entry groups Note: This method gets policies only within Data Catalog and
   * can't be used to get policies from BigQuery, Pub/Sub, Dataproc Metastore,
   * and any external Google Cloud Platform resources ingested into Data
   * Catalog. No Google IAM permissions are required to call this method.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsEntryGroupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a tag template. You must enable the Data Catalog API in the
   * project identified by the `parent` parameter. For more information, see
   * [Data Catalog resource project]
   * (https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param parent Required. The name of the project and the template location [region](https://cloud.google.com/data-catalog/docs/concepts/regions).
   */
  async projectsLocationsTagTemplatesCreate(parent: string, req: GoogleCloudDatacatalogV1TagTemplate, opts: ProjectsLocationsTagTemplatesCreateOptions = {}): Promise<GoogleCloudDatacatalogV1TagTemplate> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tagTemplates`);
    if (opts.tagTemplateId !== undefined) {
      url.searchParams.append("tagTemplateId", String(opts.tagTemplateId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1TagTemplate;
  }

  /**
   * Deletes a tag template and all tags that use it. You must enable the Data
   * Catalog API in the project identified by the `name` parameter. For more
   * information, see [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name Required. The name of the tag template to delete.
   */
  async projectsLocationsTagTemplatesDelete(name: string, opts: ProjectsLocationsTagTemplatesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Creates a field in a tag template. You must enable the Data Catalog API in
   * the project identified by the `parent` parameter. For more information, see
   * [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param parent Required. The name of the project and the template location [region](https://cloud.google.com/data-catalog/docs/concepts/regions).
   */
  async projectsLocationsTagTemplatesFieldsCreate(parent: string, req: GoogleCloudDatacatalogV1TagTemplateField, opts: ProjectsLocationsTagTemplatesFieldsCreateOptions = {}): Promise<GoogleCloudDatacatalogV1TagTemplateField> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/fields`);
    if (opts.tagTemplateFieldId !== undefined) {
      url.searchParams.append("tagTemplateFieldId", String(opts.tagTemplateFieldId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1TagTemplateField;
  }

  /**
   * Deletes a field in a tag template and all uses of this field from the tags
   * based on this template. You must enable the Data Catalog API in the project
   * identified by the `name` parameter. For more information, see [Data Catalog
   * resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name Required. The name of the tag template field to delete.
   */
  async projectsLocationsTagTemplatesFieldsDelete(name: string, opts: ProjectsLocationsTagTemplatesFieldsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Renames an enum value in a tag template. Within a single enum field, enum
   * values must be unique.
   *
   * @param name Required. The name of the enum field value.
   */
  async projectsLocationsTagTemplatesFieldsEnumValuesRename(name: string, req: GoogleCloudDatacatalogV1RenameTagTemplateFieldEnumValueRequest): Promise<GoogleCloudDatacatalogV1TagTemplateField> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:rename`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1TagTemplateField;
  }

  /**
   * Updates a field in a tag template. You can't update the field type with
   * this method. You must enable the Data Catalog API in the project identified
   * by the `name` parameter. For more information, see [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name Required. The name of the tag template field.
   */
  async projectsLocationsTagTemplatesFieldsPatch(name: string, req: GoogleCloudDatacatalogV1TagTemplateField, opts: ProjectsLocationsTagTemplatesFieldsPatchOptions = {}): Promise<GoogleCloudDatacatalogV1TagTemplateField> {
    opts = serializeProjectsLocationsTagTemplatesFieldsPatchOptions(opts);
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
    return data as GoogleCloudDatacatalogV1TagTemplateField;
  }

  /**
   * Renames a field in a tag template. You must enable the Data Catalog API in
   * the project identified by the `name` parameter. For more information, see
   * [Data Catalog resource project]
   * (https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name Required. The name of the tag template field.
   */
  async projectsLocationsTagTemplatesFieldsRename(name: string, req: GoogleCloudDatacatalogV1RenameTagTemplateFieldRequest): Promise<GoogleCloudDatacatalogV1TagTemplateField> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:rename`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1TagTemplateField;
  }

  /**
   * Gets a tag template.
   *
   * @param name Required. The name of the tag template to get.
   */
  async projectsLocationsTagTemplatesGet(name: string): Promise<GoogleCloudDatacatalogV1TagTemplate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatacatalogV1TagTemplate;
  }

  /**
   * Gets the access control policy for a resource. May return: * A`NOT_FOUND`
   * error if the resource doesn't exist or you don't have the permission to
   * view it. * An empty policy if the resource exists but doesn't have a set
   * policy. Supported resources are: - Tag templates - Entry groups Note: This
   * method doesn't get policies from Google Cloud Platform resources ingested
   * into Data Catalog. To call this method, you must have the following Google
   * IAM permissions: - `datacatalog.tagTemplates.getIamPolicy` to get policies
   * on tag templates. - `datacatalog.entryGroups.getIamPolicy` to get policies
   * on entry groups.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTagTemplatesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Updates a tag template. You can't update template fields with this method.
   * These fields are separate resources with their own create, update, and
   * delete methods. You must enable the Data Catalog API in the project
   * identified by the `tag_template.name` parameter. For more information, see
   * [Data Catalog resource
   * project](https://cloud.google.com/data-catalog/docs/concepts/resource-project).
   *
   * @param name The resource name of the tag template in URL format. Note: The tag template itself and its child resources might not be stored in the location specified in its name.
   */
  async projectsLocationsTagTemplatesPatch(name: string, req: GoogleCloudDatacatalogV1TagTemplate, opts: ProjectsLocationsTagTemplatesPatchOptions = {}): Promise<GoogleCloudDatacatalogV1TagTemplate> {
    opts = serializeProjectsLocationsTagTemplatesPatchOptions(opts);
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
    return data as GoogleCloudDatacatalogV1TagTemplate;
  }

  /**
   * Sets an access control policy for a resource. Replaces any existing
   * policy. Supported resources are: - Tag templates - Entry groups Note: This
   * method sets policies only within Data Catalog and can't be used to manage
   * policies in BigQuery, Pub/Sub, Dataproc Metastore, and any external Google
   * Cloud Platform resources synced with the Data Catalog. To call this method,
   * you must have the following Google IAM permissions: -
   * `datacatalog.tagTemplates.setIamPolicy` to set policies on tag templates. -
   * `datacatalog.entryGroups.setIamPolicy` to set policies on entry groups.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTagTemplatesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Gets your permissions on a resource. Returns an empty set of permissions
   * if the resource doesn't exist. Supported resources are: - Tag templates -
   * Entry groups Note: This method gets policies only within Data Catalog and
   * can't be used to get policies from BigQuery, Pub/Sub, Dataproc Metastore,
   * and any external Google Cloud Platform resources ingested into Data
   * Catalog. No Google IAM permissions are required to call this method.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTagTemplatesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a taxonomy in a specified project. The taxonomy is initially
   * empty, that is, it doesn't contain policy tags.
   *
   * @param parent Required. Resource name of the project that the taxonomy will belong to.
   */
  async projectsLocationsTaxonomiesCreate(parent: string, req: GoogleCloudDatacatalogV1Taxonomy): Promise<GoogleCloudDatacatalogV1Taxonomy> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/taxonomies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1Taxonomy;
  }

  /**
   * Deletes a taxonomy, including all policy tags in this taxonomy, their
   * associated policies, and the policy tags references from BigQuery columns.
   *
   * @param name Required. Resource name of the taxonomy to delete. Note: All policy tags in this taxonomy are also deleted.
   */
  async projectsLocationsTaxonomiesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Exports taxonomies in the requested type and returns them, including their
   * policy tags. The requested taxonomies must belong to the same project. This
   * method generates `SerializedTaxonomy` protocol buffers with nested policy
   * tags that can be used as input for `ImportTaxonomies` calls.
   *
   * @param parent Required. Resource name of the project that the exported taxonomies belong to.
   */
  async projectsLocationsTaxonomiesExport(parent: string, opts: ProjectsLocationsTaxonomiesExportOptions = {}): Promise<GoogleCloudDatacatalogV1ExportTaxonomiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/taxonomies:export`);
    if (opts.serializedTaxonomies !== undefined) {
      url.searchParams.append("serializedTaxonomies", String(opts.serializedTaxonomies));
    }
    if (opts.taxonomies !== undefined) {
      url.searchParams.append("taxonomies", String(opts.taxonomies));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatacatalogV1ExportTaxonomiesResponse;
  }

  /**
   * Gets a taxonomy.
   *
   * @param name Required. Resource name of the taxonomy to get.
   */
  async projectsLocationsTaxonomiesGet(name: string): Promise<GoogleCloudDatacatalogV1Taxonomy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatacatalogV1Taxonomy;
  }

  /**
   * Gets the IAM policy for a policy tag or a taxonomy.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTaxonomiesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Creates new taxonomies (including their policy tags) in a given project by
   * importing from inlined or cross-regional sources. For a cross-regional
   * source, new taxonomies are created by copying from a source in another
   * region. For an inlined source, taxonomies and policy tags are created in
   * bulk using nested protocol buffer structures.
   *
   * @param parent Required. Resource name of project that the imported taxonomies will belong to.
   */
  async projectsLocationsTaxonomiesImport(parent: string, req: GoogleCloudDatacatalogV1ImportTaxonomiesRequest): Promise<GoogleCloudDatacatalogV1ImportTaxonomiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/taxonomies:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1ImportTaxonomiesResponse;
  }

  /**
   * Lists all taxonomies in a project in a particular location that you have a
   * permission to view.
   *
   * @param parent Required. Resource name of the project to list the taxonomies of.
   */
  async projectsLocationsTaxonomiesList(parent: string, opts: ProjectsLocationsTaxonomiesListOptions = {}): Promise<GoogleCloudDatacatalogV1ListTaxonomiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/taxonomies`);
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
    return data as GoogleCloudDatacatalogV1ListTaxonomiesResponse;
  }

  /**
   * Updates a taxonomy, including its display name, description, and activated
   * policy types.
   *
   * @param name Output only. Resource name of this taxonomy in URL format. Note: Policy tag manager generates unique taxonomy IDs.
   */
  async projectsLocationsTaxonomiesPatch(name: string, req: GoogleCloudDatacatalogV1Taxonomy, opts: ProjectsLocationsTaxonomiesPatchOptions = {}): Promise<GoogleCloudDatacatalogV1Taxonomy> {
    opts = serializeProjectsLocationsTaxonomiesPatchOptions(opts);
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
    return data as GoogleCloudDatacatalogV1Taxonomy;
  }

  /**
   * Creates a policy tag in a taxonomy.
   *
   * @param parent Required. Resource name of the taxonomy that the policy tag will belong to.
   */
  async projectsLocationsTaxonomiesPolicyTagsCreate(parent: string, req: GoogleCloudDatacatalogV1PolicyTag): Promise<GoogleCloudDatacatalogV1PolicyTag> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/policyTags`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1PolicyTag;
  }

  /**
   * Deletes a policy tag together with the following: * All of its descendant
   * policy tags, if any * Policies associated with the policy tag and its
   * descendants * References from BigQuery table schema of the policy tag and
   * its descendants
   *
   * @param name Required. Resource name of the policy tag to delete. Note: All of its descendant policy tags are also deleted.
   */
  async projectsLocationsTaxonomiesPolicyTagsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a policy tag.
   *
   * @param name Required. Resource name of the policy tag.
   */
  async projectsLocationsTaxonomiesPolicyTagsGet(name: string): Promise<GoogleCloudDatacatalogV1PolicyTag> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatacatalogV1PolicyTag;
  }

  /**
   * Gets the IAM policy for a policy tag or a taxonomy.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTaxonomiesPolicyTagsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
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
   * Lists all policy tags in a taxonomy.
   *
   * @param parent Required. Resource name of the taxonomy to list the policy tags of.
   */
  async projectsLocationsTaxonomiesPolicyTagsList(parent: string, opts: ProjectsLocationsTaxonomiesPolicyTagsListOptions = {}): Promise<GoogleCloudDatacatalogV1ListPolicyTagsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/policyTags`);
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
    return data as GoogleCloudDatacatalogV1ListPolicyTagsResponse;
  }

  /**
   * Updates a policy tag, including its display name, description, and parent
   * policy tag.
   *
   * @param name Output only. Resource name of this policy tag in the URL format. The policy tag manager generates unique taxonomy IDs and policy tag IDs.
   */
  async projectsLocationsTaxonomiesPolicyTagsPatch(name: string, req: GoogleCloudDatacatalogV1PolicyTag, opts: ProjectsLocationsTaxonomiesPolicyTagsPatchOptions = {}): Promise<GoogleCloudDatacatalogV1PolicyTag> {
    opts = serializeProjectsLocationsTaxonomiesPolicyTagsPatchOptions(opts);
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
    return data as GoogleCloudDatacatalogV1PolicyTag;
  }

  /**
   * Sets the IAM policy for a policy tag or a taxonomy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTaxonomiesPolicyTagsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns your permissions on a specified policy tag or taxonomy.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTaxonomiesPolicyTagsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Replaces (updates) a taxonomy and all its policy tags. The taxonomy and
   * its entire hierarchy of policy tags must be represented literally by
   * `SerializedTaxonomy` and the nested `SerializedPolicyTag` messages. This
   * operation automatically does the following: - Deletes the existing policy
   * tags that are missing from the `SerializedPolicyTag`. - Creates policy tags
   * that don't have resource names. They are considered new. - Updates policy
   * tags with valid resources names accordingly.
   *
   * @param name Required. Resource name of the taxonomy to update.
   */
  async projectsLocationsTaxonomiesReplace(name: string, req: GoogleCloudDatacatalogV1ReplaceTaxonomyRequest): Promise<GoogleCloudDatacatalogV1Taxonomy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:replace`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogV1Taxonomy;
  }

  /**
   * Sets the IAM policy for a policy tag or a taxonomy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTaxonomiesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns your permissions on a specified policy tag or taxonomy.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTaxonomiesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
 * Additional options for DataCatalog#entriesLookup.
 */
export interface EntriesLookupOptions {
  /**
   * Fully qualified name (FQN) of the resource. FQNs take two forms: * For
   * non-regionalized resources:
   * `{SYSTEM}:{PROJECT}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}` * For
   * regionalized resources:
   * `{SYSTEM}:{PROJECT}.{LOCATION_ID}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}`
   * Example for a DPMS table:
   * `dataproc_metastore:{PROJECT_ID}.{LOCATION_ID}.{INSTANCE_ID}.{DATABASE_ID}.{TABLE_ID}`
   */
  fullyQualifiedName?: string;
  /**
   * The full name of the Google Cloud Platform resource the Data Catalog entry
   * represents. For more information, see [Full Resource Name]
   * (https://cloud.google.com/apis/design/resource_names#full_resource_name).
   * Full names are case-sensitive. For example: *
   * `//bigquery.googleapis.com/projects/{PROJECT_ID}/datasets/{DATASET_ID}/tables/{TABLE_ID}`
   * * `//pubsub.googleapis.com/projects/{PROJECT_ID}/topics/{TOPIC_ID}`
   */
  linkedResource?: string;
  /**
   * The SQL name of the entry. SQL names are case-sensitive. Examples: *
   * `pubsub.topic.{PROJECT_ID}.{TOPIC_ID}` *
   * `pubsub.topic.{PROJECT_ID}.`\``{TOPIC.ID.SEPARATED.WITH.DOTS}`\` *
   * `bigquery.table.{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}` *
   * `bigquery.dataset.{PROJECT_ID}.{DATASET_ID}` *
   * `datacatalog.entry.{PROJECT_ID}.{LOCATION_ID}.{ENTRY_GROUP_ID}.{ENTRY_ID}`
   * Identifiers (`*_ID`) should comply with the [Lexical structure in Standard
   * SQL]
   * (https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical).
   */
  sqlResource?: string;
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
 * Specification for the BigQuery connection.
 */
export interface GoogleCloudDatacatalogV1BigQueryConnectionSpec {
  /**
   * Specification for the BigQuery connection to a Cloud SQL instance.
   */
  cloudSql?: GoogleCloudDatacatalogV1CloudSqlBigQueryConnectionSpec;
  /**
   * The type of the BigQuery connection.
   */
  connectionType?:  | "CONNECTION_TYPE_UNSPECIFIED" | "CLOUD_SQL";
  /**
   * True if there are credentials attached to the BigQuery connection; false
   * otherwise.
   */
  hasCredential?: boolean;
}

/**
 * Specification for a group of BigQuery tables with the `[prefix]YYYYMMDD`
 * name pattern. For more information, see [Introduction to partitioned tables]
 * (https://cloud.google.com/bigquery/docs/partitioned-tables#partitioning_versus_sharding).
 */
export interface GoogleCloudDatacatalogV1BigQueryDateShardedSpec {
  /**
   * Output only. The Data Catalog resource name of the dataset entry the
   * current table belongs to. For example:
   * `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`.
   */
  readonly dataset?: string;
  /**
   * Output only. BigQuery resource name of the latest shard.
   */
  readonly latestShardResource?: string;
  /**
   * Output only. Total number of shards.
   */
  readonly shardCount?: bigint;
  /**
   * Output only. The table name prefix of the shards. The name of any given
   * shard is `[table_prefix]YYYYMMDD`. For example, for the `MyTable20180101`
   * shard, the `table_prefix` is `MyTable`.
   */
  readonly tablePrefix?: string;
}

/**
 * Fields specific for BigQuery routines.
 */
export interface GoogleCloudDatacatalogV1BigQueryRoutineSpec {
  /**
   * Paths of the imported libraries.
   */
  importedLibraries?: string[];
}

/**
 * Describes a BigQuery table.
 */
export interface GoogleCloudDatacatalogV1BigQueryTableSpec {
  /**
   * Output only. The table source type.
   */
  readonly tableSourceType?:  | "TABLE_SOURCE_TYPE_UNSPECIFIED" | "BIGQUERY_VIEW" | "BIGQUERY_TABLE" | "BIGQUERY_MATERIALIZED_VIEW";
  /**
   * Specification of a BigQuery table. Populated only if the
   * `table_source_type` is `BIGQUERY_TABLE`.
   */
  tableSpec?: GoogleCloudDatacatalogV1TableSpec;
  /**
   * Table view specification. Populated only if the `table_source_type` is
   * `BIGQUERY_VIEW`.
   */
  viewSpec?: GoogleCloudDatacatalogV1ViewSpec;
}

/**
 * Business Context of the entry.
 */
export interface GoogleCloudDatacatalogV1BusinessContext {
  /**
   * Contact people for the entry.
   */
  contacts?: GoogleCloudDatacatalogV1Contacts;
  /**
   * Entry overview fields for rich text descriptions of entries.
   */
  entryOverview?: GoogleCloudDatacatalogV1EntryOverview;
}

/**
 * Specification for the BigQuery connection to a Cloud SQL instance.
 */
export interface GoogleCloudDatacatalogV1CloudSqlBigQueryConnectionSpec {
  /**
   * Database name.
   */
  database?: string;
  /**
   * Cloud SQL instance ID in the format of `project:location:instance`.
   */
  instanceId?: string;
  /**
   * Type of the Cloud SQL database.
   */
  type?:  | "DATABASE_TYPE_UNSPECIFIED" | "POSTGRES" | "MYSQL";
}

/**
 * A column within a schema. Columns can be nested inside other columns.
 */
export interface GoogleCloudDatacatalogV1ColumnSchema {
  /**
   * Required. Name of the column. Must be a UTF-8 string without dots (.). The
   * maximum size is 64 bytes.
   */
  column?: string;
  /**
   * Optional. Default value for the column.
   */
  defaultValue?: string;
  /**
   * Optional. Description of the column. Default value is an empty string. The
   * description must be a UTF-8 string with the maximum size of 2000 bytes.
   */
  description?: string;
  /**
   * Optional. Garbage collection policy for the column or column family.
   * Applies to systems like Cloud Bigtable.
   */
  gcRule?: string;
  /**
   * Optional. Most important inclusion of this column.
   */
  highestIndexingType?:  | "INDEXING_TYPE_UNSPECIFIED" | "INDEXING_TYPE_NONE" | "INDEXING_TYPE_NON_UNIQUE" | "INDEXING_TYPE_UNIQUE" | "INDEXING_TYPE_PRIMARY_KEY";
  /**
   * Looker specific column info of this column.
   */
  lookerColumnSpec?: GoogleCloudDatacatalogV1ColumnSchemaLookerColumnSpec;
  /**
   * Optional. A column's mode indicates whether values in this column are
   * required, nullable, or repeated. Only `NULLABLE`, `REQUIRED`, and
   * `REPEATED` values are supported. Default mode is `NULLABLE`.
   */
  mode?: string;
  /**
   * Optional. Ordinal position
   */
  ordinalPosition?: number;
  /**
   * Optional. Schema of sub-columns. A column can have zero or more
   * sub-columns.
   */
  subcolumns?: GoogleCloudDatacatalogV1ColumnSchema[];
  /**
   * Required. Type of the column. Must be a UTF-8 string with the maximum size
   * of 128 bytes.
   */
  type?: string;
}

/**
 * Column info specific to Looker System.
 */
export interface GoogleCloudDatacatalogV1ColumnSchemaLookerColumnSpec {
  /**
   * Looker specific column type of this column.
   */
  type?:  | "LOOKER_COLUMN_TYPE_UNSPECIFIED" | "DIMENSION" | "DIMENSION_GROUP" | "FILTER" | "MEASURE" | "PAREMETER";
}

/**
 * Common statistics on the entry's usage. They can be set on any system.
 */
export interface GoogleCloudDatacatalogV1CommonUsageStats {
  /**
   * View count in source system.
   */
  viewCount?: bigint;
}

function serializeGoogleCloudDatacatalogV1CommonUsageStats(data: any): GoogleCloudDatacatalogV1CommonUsageStats {
  return {
    ...data,
    viewCount: data["viewCount"] !== undefined ? String(data["viewCount"]) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1CommonUsageStats(data: any): GoogleCloudDatacatalogV1CommonUsageStats {
  return {
    ...data,
    viewCount: data["viewCount"] !== undefined ? BigInt(data["viewCount"]) : undefined,
  };
}

/**
 * Contact people for the entry.
 */
export interface GoogleCloudDatacatalogV1Contacts {
  /**
   * The list of contact people for the entry.
   */
  people?: GoogleCloudDatacatalogV1ContactsPerson[];
}

/**
 * A contact person for the entry.
 */
export interface GoogleCloudDatacatalogV1ContactsPerson {
  /**
   * Designation of the person, for example, Data Steward.
   */
  designation?: string;
  /**
   * Email of the person in the format of `john.doe@xyz`, ``, or `John Doe`.
   */
  email?: string;
}

/**
 * Cross-regional source used to import an existing taxonomy into a different
 * region.
 */
export interface GoogleCloudDatacatalogV1CrossRegionalSource {
  /**
   * Required. The resource name of the source taxonomy to import.
   */
  taxonomy?: string;
}

/**
 * Specification that applies to a table resource. Valid only for entries with
 * the `TABLE` type.
 */
export interface GoogleCloudDatacatalogV1DatabaseTableSpec {
  /**
   * Spec what aplies to tables that are actually views. Not set for "real"
   * tables.
   */
  databaseViewSpec?: GoogleCloudDatacatalogV1DatabaseTableSpecDatabaseViewSpec;
  /**
   * Output only. Fields specific to a Dataplex table and present only in the
   * Dataplex table entries.
   */
  readonly dataplexTable?: GoogleCloudDatacatalogV1DataplexTableSpec;
  /**
   * Type of this table.
   */
  type?:  | "TABLE_TYPE_UNSPECIFIED" | "NATIVE" | "EXTERNAL";
}

/**
 * Specification that applies to database view.
 */
export interface GoogleCloudDatacatalogV1DatabaseTableSpecDatabaseViewSpec {
  /**
   * Name of a singular table this view reflects one to one.
   */
  baseTable?: string;
  /**
   * SQL query used to generate this view.
   */
  sqlQuery?: string;
  /**
   * Type of this view.
   */
  viewType?:  | "VIEW_TYPE_UNSPECIFIED" | "STANDARD_VIEW" | "MATERIALIZED_VIEW";
}

/**
 * External table registered by Dataplex. Dataplex publishes data discovered
 * from an asset into multiple other systems (BigQuery, DPMS) in form of tables.
 * We call them "external tables". External tables are also synced into the Data
 * Catalog. This message contains pointers to those external tables (fully
 * qualified name, resource name et cetera) within the Data Catalog.
 */
export interface GoogleCloudDatacatalogV1DataplexExternalTable {
  /**
   * Name of the Data Catalog entry representing the external table.
   */
  dataCatalogEntry?: string;
  /**
   * Fully qualified name (FQN) of the external table.
   */
  fullyQualifiedName?: string;
  /**
   * Google Cloud resource name of the external table.
   */
  googleCloudResource?: string;
  /**
   * Service in which the external table is registered.
   */
  system?:  | "INTEGRATED_SYSTEM_UNSPECIFIED" | "BIGQUERY" | "CLOUD_PUBSUB" | "DATAPROC_METASTORE" | "DATAPLEX" | "CLOUD_SQL" | "LOOKER";
}

/**
 * Entry specyfication for a Dataplex fileset.
 */
export interface GoogleCloudDatacatalogV1DataplexFilesetSpec {
  /**
   * Common Dataplex fields.
   */
  dataplexSpec?: GoogleCloudDatacatalogV1DataplexSpec;
}

/**
 * Common Dataplex fields.
 */
export interface GoogleCloudDatacatalogV1DataplexSpec {
  /**
   * Fully qualified resource name of an asset in Dataplex, to which the
   * underlying data source (Cloud Storage bucket or BigQuery dataset) of the
   * entity is attached.
   */
  asset?: string;
  /**
   * Compression format of the data, e.g., zip, gzip etc.
   */
  compressionFormat?: string;
  /**
   * Format of the data.
   */
  dataFormat?: GoogleCloudDatacatalogV1PhysicalSchema;
  /**
   * Project ID of the underlying Cloud Storage or BigQuery data. Note that
   * this may not be the same project as the correspondingly Dataplex lake /
   * zone / asset.
   */
  projectId?: string;
}

/**
 * Entry specification for a Dataplex table.
 */
export interface GoogleCloudDatacatalogV1DataplexTableSpec {
  /**
   * Common Dataplex fields.
   */
  dataplexSpec?: GoogleCloudDatacatalogV1DataplexSpec;
  /**
   * List of external tables registered by Dataplex in other systems based on
   * the same underlying data. External tables allow to query this data in those
   * systems.
   */
  externalTables?: GoogleCloudDatacatalogV1DataplexExternalTable[];
  /**
   * Indicates if the table schema is managed by the user or not.
   */
  userManaged?: boolean;
}

/**
 * Physical location of an entry.
 */
export interface GoogleCloudDatacatalogV1DataSource {
  /**
   * Full name of a resource as defined by the service. For example:
   * `//bigquery.googleapis.com/projects/{PROJECT_ID}/locations/{LOCATION}/datasets/{DATASET_ID}/tables/{TABLE_ID}`
   */
  resource?: string;
  /**
   * Service that physically stores the data.
   */
  service?:  | "SERVICE_UNSPECIFIED" | "CLOUD_STORAGE" | "BIGQUERY";
  /**
   * Output only. Data Catalog entry name, if applicable.
   */
  readonly sourceEntry?: string;
  /**
   * Detailed properties of the underlying storage.
   */
  storageProperties?: GoogleCloudDatacatalogV1StorageProperties;
}

/**
 * Specification that applies to a data source connection. Valid only for
 * entries with the `DATA_SOURCE_CONNECTION` type. Only one of internal specs
 * can be set at the time, and cannot be changed later.
 */
export interface GoogleCloudDatacatalogV1DataSourceConnectionSpec {
  /**
   * Output only. Fields specific to BigQuery connections.
   */
  bigqueryConnectionSpec?: GoogleCloudDatacatalogV1BigQueryConnectionSpec;
}

/**
 * Wrapper for any item that can be contained in the dump.
 */
export interface GoogleCloudDatacatalogV1DumpItem {
  /**
   * Entry and its tags.
   */
  taggedEntry?: GoogleCloudDatacatalogV1TaggedEntry;
}

function serializeGoogleCloudDatacatalogV1DumpItem(data: any): GoogleCloudDatacatalogV1DumpItem {
  return {
    ...data,
    taggedEntry: data["taggedEntry"] !== undefined ? serializeGoogleCloudDatacatalogV1TaggedEntry(data["taggedEntry"]) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1DumpItem(data: any): GoogleCloudDatacatalogV1DumpItem {
  return {
    ...data,
    taggedEntry: data["taggedEntry"] !== undefined ? deserializeGoogleCloudDatacatalogV1TaggedEntry(data["taggedEntry"]) : undefined,
  };
}

/**
 * Entry metadata. A Data Catalog entry represents another resource in Google
 * Cloud Platform (such as a BigQuery dataset or a Pub/Sub topic) or outside of
 * it. You can use the `linked_resource` field in the entry resource to refer to
 * the original resource ID of the source system. An entry resource contains
 * resource details, for example, its schema. Additionally, you can attach
 * flexible metadata to an entry in the form of a Tag.
 */
export interface GoogleCloudDatacatalogV1Entry {
  /**
   * Output only. Specification for a group of BigQuery tables with the
   * `[prefix]YYYYMMDD` name pattern. For more information, see [Introduction to
   * partitioned tables]
   * (https://cloud.google.com/bigquery/docs/partitioned-tables#partitioning_versus_sharding).
   */
  readonly bigqueryDateShardedSpec?: GoogleCloudDatacatalogV1BigQueryDateShardedSpec;
  /**
   * Output only. Specification that applies to a BigQuery table. Valid only
   * for entries with the `TABLE` type.
   */
  readonly bigqueryTableSpec?: GoogleCloudDatacatalogV1BigQueryTableSpec;
  /**
   * Business Context of the entry. Not supported for BigQuery datasets
   */
  businessContext?: GoogleCloudDatacatalogV1BusinessContext;
  /**
   * Specification that applies to a table resource. Valid only for entries
   * with the `TABLE` or `EXPLORE` type.
   */
  databaseTableSpec?: GoogleCloudDatacatalogV1DatabaseTableSpec;
  /**
   * Output only. Physical location of the entry.
   */
  readonly dataSource?: GoogleCloudDatacatalogV1DataSource;
  /**
   * Specification that applies to a data source connection. Valid only for
   * entries with the `DATA_SOURCE_CONNECTION` type.
   */
  dataSourceConnectionSpec?: GoogleCloudDatacatalogV1DataSourceConnectionSpec;
  /**
   * Entry description that can consist of several sentences or paragraphs that
   * describe entry contents. The description must not contain Unicode
   * non-characters as well as C0 and C1 control codes except tabs (HT), new
   * lines (LF), carriage returns (CR), and page breaks (FF). The maximum size
   * is 2000 bytes when encoded in UTF-8. Default value is an empty string.
   */
  description?: string;
  /**
   * Display name of an entry. The maximum size is 500 bytes when encoded in
   * UTF-8. Default value is an empty string.
   */
  displayName?: string;
  /**
   * Specification that applies to a fileset resource. Valid only for entries
   * with the `FILESET` type.
   */
  filesetSpec?: GoogleCloudDatacatalogV1FilesetSpec;
  /**
   * Fully qualified name (FQN) of the resource. Set automatically for entries
   * representing resources from synced systems. Settable only during creation
   * and read-only afterwards. Can be used for search and lookup of the entries.
   * FQNs take two forms: * For non-regionalized resources:
   * `{SYSTEM}:{PROJECT}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}` * For
   * regionalized resources:
   * `{SYSTEM}:{PROJECT}.{LOCATION_ID}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}`
   * Example for a DPMS table:
   * `dataproc_metastore:{PROJECT_ID}.{LOCATION_ID}.{INSTANCE_ID}.{DATABASE_ID}.{TABLE_ID}`
   */
  fullyQualifiedName?: string;
  /**
   * Specification that applies to a Cloud Storage fileset. Valid only for
   * entries with the `FILESET` type.
   */
  gcsFilesetSpec?: GoogleCloudDatacatalogV1GcsFilesetSpec;
  /**
   * Output only. Indicates the entry's source system that Data Catalog
   * integrates with, such as BigQuery, Pub/Sub, or Dataproc Metastore.
   */
  readonly integratedSystem?:  | "INTEGRATED_SYSTEM_UNSPECIFIED" | "BIGQUERY" | "CLOUD_PUBSUB" | "DATAPROC_METASTORE" | "DATAPLEX" | "CLOUD_SQL" | "LOOKER";
  /**
   * Cloud labels attached to the entry. In Data Catalog, you can create and
   * modify labels attached only to custom entries. Synced entries have
   * unmodifiable labels that come from the source system.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The resource this metadata entry refers to. For Google Cloud Platform
   * resources, `linked_resource` is the [Full Resource Name]
   * (https://cloud.google.com/apis/design/resource_names#full_resource_name).
   * For example, the `linked_resource` for a table resource from BigQuery is:
   * `//bigquery.googleapis.com/projects/{PROJECT_ID}/datasets/{DATASET_ID}/tables/{TABLE_ID}`
   * Output only when the entry is one of the types in the `EntryType` enum. For
   * entries with a `user_specified_type`, this field is optional and defaults
   * to an empty string. The resource string must contain only letters (a-z,
   * A-Z), numbers (0-9), underscores (_), periods (.), colons (:), slashes (/),
   * dashes (-), and hashes (#). The maximum size is 200 bytes when encoded in
   * UTF-8.
   */
  linkedResource?: string;
  /**
   * Specification that applies to Looker sysstem. Only settable when
   * `user_specified_system` is equal to `LOOKER`
   */
  lookerSystemSpec?: GoogleCloudDatacatalogV1LookerSystemSpec;
  /**
   * Output only. The resource name of an entry in URL format. Note: The entry
   * itself and its child resources might not be stored in the location
   * specified in its name.
   */
  readonly name?: string;
  /**
   * Output only. Additional information related to the entry. Private to the
   * current user.
   */
  readonly personalDetails?: GoogleCloudDatacatalogV1PersonalDetails;
  /**
   * Specification that applies to a user-defined function or procedure. Valid
   * only for entries with the `ROUTINE` type.
   */
  routineSpec?: GoogleCloudDatacatalogV1RoutineSpec;
  /**
   * Schema of the entry. An entry might not have any schema attached to it.
   */
  schema?: GoogleCloudDatacatalogV1Schema;
  /**
   * Timestamps from the underlying resource, not from the Data Catalog entry.
   * Output only when the entry has a system listed in the `IntegratedSystem`
   * enum. For entries with `user_specified_system`, this field is optional and
   * defaults to an empty timestamp.
   */
  sourceSystemTimestamps?: GoogleCloudDatacatalogV1SystemTimestamps;
  /**
   * Specification that applies to a relational database system. Only settable
   * when `user_specified_system` is equal to `SQL_DATABASE`
   */
  sqlDatabaseSystemSpec?: GoogleCloudDatacatalogV1SqlDatabaseSystemSpec;
  /**
   * The type of the entry. Only used for entries with types listed in the
   * `EntryType` enum. Currently, only `FILESET` enum value is allowed. All
   * other entries created in Data Catalog must use the `user_specified_type`.
   */
  type?:  | "ENTRY_TYPE_UNSPECIFIED" | "TABLE" | "MODEL" | "DATA_STREAM" | "FILESET" | "CLUSTER" | "DATABASE" | "DATA_SOURCE_CONNECTION" | "ROUTINE" | "LAKE" | "ZONE" | "SERVICE" | "DATABASE_SCHEMA" | "DASHBOARD" | "EXPLORE" | "LOOK";
  /**
   * Resource usage statistics.
   */
  usageSignal?: GoogleCloudDatacatalogV1UsageSignal;
  /**
   * Indicates the entry's source system that Data Catalog doesn't
   * automatically integrate with. The `user_specified_system` string has the
   * following limitations: * Is case insensitive. * Must begin with a letter or
   * underscore. * Can only contain letters, numbers, and underscores. * Must be
   * at least 1 character and at most 64 characters long.
   */
  userSpecifiedSystem?: string;
  /**
   * Custom entry type that doesn't match any of the values allowed for input
   * and listed in the `EntryType` enum. When creating an entry, first check the
   * type values in the enum. If there are no appropriate types for the new
   * entry, provide a custom value, for example, `my_special_type`. The
   * `user_specified_type` string has the following limitations: * Is case
   * insensitive. * Must begin with a letter or underscore. * Can only contain
   * letters, numbers, and underscores. * Must be at least 1 character and at
   * most 64 characters long.
   */
  userSpecifiedType?: string;
}

function serializeGoogleCloudDatacatalogV1Entry(data: any): GoogleCloudDatacatalogV1Entry {
  return {
    ...data,
    sourceSystemTimestamps: data["sourceSystemTimestamps"] !== undefined ? serializeGoogleCloudDatacatalogV1SystemTimestamps(data["sourceSystemTimestamps"]) : undefined,
    usageSignal: data["usageSignal"] !== undefined ? serializeGoogleCloudDatacatalogV1UsageSignal(data["usageSignal"]) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1Entry(data: any): GoogleCloudDatacatalogV1Entry {
  return {
    ...data,
    personalDetails: data["personalDetails"] !== undefined ? deserializeGoogleCloudDatacatalogV1PersonalDetails(data["personalDetails"]) : undefined,
    sourceSystemTimestamps: data["sourceSystemTimestamps"] !== undefined ? deserializeGoogleCloudDatacatalogV1SystemTimestamps(data["sourceSystemTimestamps"]) : undefined,
    usageSignal: data["usageSignal"] !== undefined ? deserializeGoogleCloudDatacatalogV1UsageSignal(data["usageSignal"]) : undefined,
  };
}

/**
 * Entry group metadata. An `EntryGroup` resource represents a logical grouping
 * of zero or more Data Catalog Entry resources.
 */
export interface GoogleCloudDatacatalogV1EntryGroup {
  /**
   * Output only. Timestamps of the entry group. Default value is empty.
   */
  readonly dataCatalogTimestamps?: GoogleCloudDatacatalogV1SystemTimestamps;
  /**
   * Entry group description. Can consist of several sentences or paragraphs
   * that describe the entry group contents. Default value is an empty string.
   */
  description?: string;
  /**
   * A short name to identify the entry group, for example, "analytics data -
   * jan 2011". Default value is an empty string.
   */
  displayName?: string;
  /**
   * The resource name of the entry group in URL format. Note: The entry group
   * itself and its child resources might not be stored in the location
   * specified in its name.
   */
  name?: string;
}

/**
 * Entry overview fields for rich text descriptions of entries.
 */
export interface GoogleCloudDatacatalogV1EntryOverview {
  /**
   * Entry overview with support for rich text. The overview must only contain
   * Unicode characters, and should be formatted using HTML. The maximum length
   * is 10 MiB as this value holds HTML descriptions including encoded images.
   * The maximum length of the text without images is 100 KiB.
   */
  overview?: string;
}

/**
 * Response message for ExportTaxonomies.
 */
export interface GoogleCloudDatacatalogV1ExportTaxonomiesResponse {
  /**
   * List of taxonomies and policy tags as nested protocol buffers.
   */
  taxonomies?: GoogleCloudDatacatalogV1SerializedTaxonomy[];
}

export interface GoogleCloudDatacatalogV1FieldType {
  /**
   * An enum type.
   */
  enumType?: GoogleCloudDatacatalogV1FieldTypeEnumType;
  /**
   * Primitive types, such as string, boolean, etc.
   */
  primitiveType?:  | "PRIMITIVE_TYPE_UNSPECIFIED" | "DOUBLE" | "STRING" | "BOOL" | "TIMESTAMP" | "RICHTEXT";
}

export interface GoogleCloudDatacatalogV1FieldTypeEnumType {
  /**
   * The set of allowed values for this enum. This set must not be empty and
   * can include up to 100 allowed values. The display names of the values in
   * this set must not be empty and must be case-insensitively unique within
   * this set. The order of items in this set is preserved. This field can be
   * used to create, remove, and reorder enum values. To rename enum values, use
   * the `RenameTagTemplateFieldEnumValue` method.
   */
  allowedValues?: GoogleCloudDatacatalogV1FieldTypeEnumTypeEnumValue[];
}

export interface GoogleCloudDatacatalogV1FieldTypeEnumTypeEnumValue {
  /**
   * Required. The display name of the enum value. Must not be an empty string.
   * The name must contain only Unicode letters, numbers (0-9), underscores (_),
   * dashes (-), spaces ( ), and can't start or end with spaces. The maximum
   * length is 200 characters.
   */
  displayName?: string;
}

/**
 * Specification that applies to a fileset. Valid only for entries with the
 * 'FILESET' type.
 */
export interface GoogleCloudDatacatalogV1FilesetSpec {
  /**
   * Fields specific to a Dataplex fileset and present only in the Dataplex
   * fileset entries.
   */
  dataplexFileset?: GoogleCloudDatacatalogV1DataplexFilesetSpec;
}

/**
 * Describes a Cloud Storage fileset entry.
 */
export interface GoogleCloudDatacatalogV1GcsFilesetSpec {
  /**
   * Required. Patterns to identify a set of files in Google Cloud Storage. For
   * more information, see [Wildcard Names]
   * (https://cloud.google.com/storage/docs/gsutil/addlhelp/WildcardNames).
   * Note: Currently, bucket wildcards are not supported. Examples of valid
   * `file_patterns`: * `gs://bucket_name/dir/*`: matches all files in
   * `bucket_name/dir` directory * `gs://bucket_name/dir/**`: matches all files
   * in `bucket_name/dir` and all subdirectories * `gs://bucket_name/file*`:
   * matches files prefixed by `file` in `bucket_name` *
   * `gs://bucket_name/??.txt`: matches files with two characters followed by
   * `.txt` in `bucket_name` * `gs://bucket_name/[aeiou].txt`: matches files
   * that contain a single vowel character followed by `.txt` in `bucket_name` *
   * `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`, ... or
   * `m` followed by `.txt` in `bucket_name` * `gs://bucket_name/a/*\/b`:
   * matches all files in `bucket_name` that match the `a/*\/b` pattern, such as
   * `a/c/b`, `a/d/b` * `gs://another_bucket/a.txt`: matches
   * `gs://another_bucket/a.txt` You can combine wildcards to match complex sets
   * of files, for example: `gs://bucket_name/[a-m]??.j*g`
   */
  filePatterns?: string[];
  /**
   * Output only. Sample files contained in this fileset, not all files
   * contained in this fileset are represented here.
   */
  readonly sampleGcsFileSpecs?: GoogleCloudDatacatalogV1GcsFileSpec[];
}

/**
 * Specification of a single file in Cloud Storage.
 */
export interface GoogleCloudDatacatalogV1GcsFileSpec {
  /**
   * Required. Full file path. Example: `gs://bucket_name/a/b.txt`.
   */
  filePath?: string;
  /**
   * Output only. Creation, modification, and expiration timestamps of a Cloud
   * Storage file.
   */
  readonly gcsTimestamps?: GoogleCloudDatacatalogV1SystemTimestamps;
  /**
   * Output only. File size in bytes.
   */
  readonly sizeBytes?: bigint;
}

/**
 * Metadata message for long-running operation returned by the ImportEntries.
 */
export interface GoogleCloudDatacatalogV1ImportEntriesMetadata {
  /**
   * Partial errors that are encountered during the ImportEntries operation.
   * There is no guarantee that all the encountered errors are reported.
   * However, if no errors are reported, it means that no errors were
   * encountered.
   */
  errors?: Status[];
  /**
   * State of the import operation.
   */
  state?:  | "IMPORT_STATE_UNSPECIFIED" | "IMPORT_QUEUED" | "IMPORT_IN_PROGRESS" | "IMPORT_DONE" | "IMPORT_OBSOLETE";
}

/**
 * Request message for ImportEntries method.
 */
export interface GoogleCloudDatacatalogV1ImportEntriesRequest {
  /**
   * Path to a Cloud Storage bucket that contains a dump ready for ingestion.
   */
  gcsBucketPath?: string;
}

/**
 * Response message for long-running operation returned by the ImportEntries.
 */
export interface GoogleCloudDatacatalogV1ImportEntriesResponse {
  /**
   * Number of entries deleted as a result of import operation.
   */
  deletedEntriesCount?: bigint;
  /**
   * Cumulative number of entries created and entries updated as a result of
   * import operation.
   */
  upsertedEntriesCount?: bigint;
}

function serializeGoogleCloudDatacatalogV1ImportEntriesResponse(data: any): GoogleCloudDatacatalogV1ImportEntriesResponse {
  return {
    ...data,
    deletedEntriesCount: data["deletedEntriesCount"] !== undefined ? String(data["deletedEntriesCount"]) : undefined,
    upsertedEntriesCount: data["upsertedEntriesCount"] !== undefined ? String(data["upsertedEntriesCount"]) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1ImportEntriesResponse(data: any): GoogleCloudDatacatalogV1ImportEntriesResponse {
  return {
    ...data,
    deletedEntriesCount: data["deletedEntriesCount"] !== undefined ? BigInt(data["deletedEntriesCount"]) : undefined,
    upsertedEntriesCount: data["upsertedEntriesCount"] !== undefined ? BigInt(data["upsertedEntriesCount"]) : undefined,
  };
}

/**
 * Request message for ImportTaxonomies.
 */
export interface GoogleCloudDatacatalogV1ImportTaxonomiesRequest {
  /**
   * Cross-regional source taxonomy to import.
   */
  crossRegionalSource?: GoogleCloudDatacatalogV1CrossRegionalSource;
  /**
   * Inline source taxonomy to import.
   */
  inlineSource?: GoogleCloudDatacatalogV1InlineSource;
}

/**
 * Response message for ImportTaxonomies.
 */
export interface GoogleCloudDatacatalogV1ImportTaxonomiesResponse {
  /**
   * Imported taxonomies.
   */
  taxonomies?: GoogleCloudDatacatalogV1Taxonomy[];
}

/**
 * Inline source containing taxonomies to import.
 */
export interface GoogleCloudDatacatalogV1InlineSource {
  /**
   * Required. Taxonomies to import.
   */
  taxonomies?: GoogleCloudDatacatalogV1SerializedTaxonomy[];
}

/**
 * Response message for ListEntries.
 */
export interface GoogleCloudDatacatalogV1ListEntriesResponse {
  /**
   * Entry details.
   */
  entries?: GoogleCloudDatacatalogV1Entry[];
  /**
   * Pagination token of the next results page. Empty if there are no more
   * items in results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatacatalogV1ListEntriesResponse(data: any): GoogleCloudDatacatalogV1ListEntriesResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeGoogleCloudDatacatalogV1Entry(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1ListEntriesResponse(data: any): GoogleCloudDatacatalogV1ListEntriesResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeGoogleCloudDatacatalogV1Entry(item))) : undefined,
  };
}

/**
 * Response message for ListEntryGroups.
 */
export interface GoogleCloudDatacatalogV1ListEntryGroupsResponse {
  /**
   * Entry group details.
   */
  entryGroups?: GoogleCloudDatacatalogV1EntryGroup[];
  /**
   * Pagination token to specify in the next call to retrieve the next page of
   * results. Empty if there are no more items.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListPolicyTags.
 */
export interface GoogleCloudDatacatalogV1ListPolicyTagsResponse {
  /**
   * Pagination token of the next results page. Empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The policy tags that belong to the taxonomy.
   */
  policyTags?: GoogleCloudDatacatalogV1PolicyTag[];
}

/**
 * Response message for ListTags.
 */
export interface GoogleCloudDatacatalogV1ListTagsResponse {
  /**
   * Pagination token of the next results page. Empty if there are no more
   * items in results.
   */
  nextPageToken?: string;
  /**
   * Tag details.
   */
  tags?: GoogleCloudDatacatalogV1Tag[];
}

function serializeGoogleCloudDatacatalogV1ListTagsResponse(data: any): GoogleCloudDatacatalogV1ListTagsResponse {
  return {
    ...data,
    tags: data["tags"] !== undefined ? data["tags"].map((item: any) => (serializeGoogleCloudDatacatalogV1Tag(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1ListTagsResponse(data: any): GoogleCloudDatacatalogV1ListTagsResponse {
  return {
    ...data,
    tags: data["tags"] !== undefined ? data["tags"].map((item: any) => (deserializeGoogleCloudDatacatalogV1Tag(item))) : undefined,
  };
}

/**
 * Response message for ListTaxonomies.
 */
export interface GoogleCloudDatacatalogV1ListTaxonomiesResponse {
  /**
   * Pagination token of the next results page. Empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Taxonomies that the project contains.
   */
  taxonomies?: GoogleCloudDatacatalogV1Taxonomy[];
}

/**
 * Specification that applies to entries that are part `LOOKER` system
 * (user_specified_type)
 */
export interface GoogleCloudDatacatalogV1LookerSystemSpec {
  /**
   * Name of the parent Looker Instance. Empty if it does not exist.
   */
  parentInstanceDisplayName?: string;
  /**
   * ID of the parent Looker Instance. Empty if it does not exist. Example
   * value: `someinstance.looker.com`
   */
  parentInstanceId?: string;
  /**
   * Name of the parent Model. Empty if it does not exist.
   */
  parentModelDisplayName?: string;
  /**
   * ID of the parent Model. Empty if it does not exist.
   */
  parentModelId?: string;
  /**
   * Name of the parent View. Empty if it does not exist.
   */
  parentViewDisplayName?: string;
  /**
   * ID of the parent View. Empty if it does not exist.
   */
  parentViewId?: string;
}

/**
 * Request message for ModifyEntryContacts.
 */
export interface GoogleCloudDatacatalogV1ModifyEntryContactsRequest {
  /**
   * Required. The new value for the Contacts.
   */
  contacts?: GoogleCloudDatacatalogV1Contacts;
}

/**
 * Request message for ModifyEntryOverview.
 */
export interface GoogleCloudDatacatalogV1ModifyEntryOverviewRequest {
  /**
   * Required. The new value for the Entry Overview.
   */
  entryOverview?: GoogleCloudDatacatalogV1EntryOverview;
}

/**
 * Entry metadata relevant only to the user and private to them.
 */
export interface GoogleCloudDatacatalogV1PersonalDetails {
  /**
   * True if the entry is starred by the user; false otherwise.
   */
  starred?: boolean;
  /**
   * Set if the entry is starred; unset otherwise.
   */
  starTime?: Date;
}

function serializeGoogleCloudDatacatalogV1PersonalDetails(data: any): GoogleCloudDatacatalogV1PersonalDetails {
  return {
    ...data,
    starTime: data["starTime"] !== undefined ? data["starTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1PersonalDetails(data: any): GoogleCloudDatacatalogV1PersonalDetails {
  return {
    ...data,
    starTime: data["starTime"] !== undefined ? new Date(data["starTime"]) : undefined,
  };
}

/**
 * Native schema used by a resource represented as an entry. Used by query
 * engines for deserializing and parsing source data.
 */
export interface GoogleCloudDatacatalogV1PhysicalSchema {
  /**
   * Schema in Avro JSON format.
   */
  avro?: GoogleCloudDatacatalogV1PhysicalSchemaAvroSchema;
  /**
   * Marks a CSV-encoded data source.
   */
  csv?: GoogleCloudDatacatalogV1PhysicalSchemaCsvSchema;
  /**
   * Marks an ORC-encoded data source.
   */
  orc?: GoogleCloudDatacatalogV1PhysicalSchemaOrcSchema;
  /**
   * Marks a Parquet-encoded data source.
   */
  parquet?: GoogleCloudDatacatalogV1PhysicalSchemaParquetSchema;
  /**
   * Schema in protocol buffer format.
   */
  protobuf?: GoogleCloudDatacatalogV1PhysicalSchemaProtobufSchema;
  /**
   * Schema in Thrift format.
   */
  thrift?: GoogleCloudDatacatalogV1PhysicalSchemaThriftSchema;
}

/**
 * Schema in Avro JSON format.
 */
export interface GoogleCloudDatacatalogV1PhysicalSchemaAvroSchema {
  /**
   * JSON source of the Avro schema.
   */
  text?: string;
}

/**
 * Marks a CSV-encoded data source.
 */
export interface GoogleCloudDatacatalogV1PhysicalSchemaCsvSchema {
}

/**
 * Marks an ORC-encoded data source.
 */
export interface GoogleCloudDatacatalogV1PhysicalSchemaOrcSchema {
}

/**
 * Marks a Parquet-encoded data source.
 */
export interface GoogleCloudDatacatalogV1PhysicalSchemaParquetSchema {
}

/**
 * Schema in protocol buffer format.
 */
export interface GoogleCloudDatacatalogV1PhysicalSchemaProtobufSchema {
  /**
   * Protocol buffer source of the schema.
   */
  text?: string;
}

/**
 * Schema in Thrift format.
 */
export interface GoogleCloudDatacatalogV1PhysicalSchemaThriftSchema {
  /**
   * Thrift IDL source of the schema.
   */
  text?: string;
}

/**
 * Denotes one policy tag in a taxonomy, for example, SSN. Policy tags can be
 * defined in a hierarchy. For example: ``` + Geolocation + LatLong + City +
 * ZipCode ``` Where the "Geolocation" policy tag contains three children.
 */
export interface GoogleCloudDatacatalogV1PolicyTag {
  /**
   * Output only. Resource names of child policy tags of this policy tag.
   */
  readonly childPolicyTags?: string[];
  /**
   * Description of this policy tag. If not set, defaults to empty. The
   * description must contain only Unicode characters, tabs, newlines, carriage
   * returns and page breaks, and be at most 2000 bytes long when encoded in
   * UTF-8.
   */
  description?: string;
  /**
   * Required. User-defined name of this policy tag. The name can't start or
   * end with spaces and must be unique within the parent taxonomy, contain only
   * Unicode letters, numbers, underscores, dashes and spaces, and be at most
   * 200 bytes long when encoded in UTF-8.
   */
  displayName?: string;
  /**
   * Output only. Resource name of this policy tag in the URL format. The
   * policy tag manager generates unique taxonomy IDs and policy tag IDs.
   */
  readonly name?: string;
  /**
   * Resource name of this policy tag's parent policy tag. If empty, this is a
   * top level tag. If not set, defaults to an empty string. For example, for
   * the "LatLong" policy tag in the example above, this field contains the
   * resource name of the "Geolocation" policy tag, and, for "Geolocation", this
   * field is empty.
   */
  parentPolicyTag?: string;
}

/**
 * Request message for RenameTagTemplateFieldEnumValue.
 */
export interface GoogleCloudDatacatalogV1RenameTagTemplateFieldEnumValueRequest {
  /**
   * Required. The new display name of the enum value. For example,
   * `my_new_enum_value`.
   */
  newEnumValueDisplayName?: string;
}

/**
 * Request message for RenameTagTemplateField.
 */
export interface GoogleCloudDatacatalogV1RenameTagTemplateFieldRequest {
  /**
   * Required. The new ID of this tag template field. For example,
   * `my_new_field`.
   */
  newTagTemplateFieldId?: string;
}

/**
 * Request message for ReplaceTaxonomy.
 */
export interface GoogleCloudDatacatalogV1ReplaceTaxonomyRequest {
  /**
   * Required. Taxonomy to update along with its child policy tags.
   */
  serializedTaxonomy?: GoogleCloudDatacatalogV1SerializedTaxonomy;
}

/**
 * Specification that applies to a routine. Valid only for entries with the
 * `ROUTINE` type.
 */
export interface GoogleCloudDatacatalogV1RoutineSpec {
  /**
   * Fields specific for BigQuery routines.
   */
  bigqueryRoutineSpec?: GoogleCloudDatacatalogV1BigQueryRoutineSpec;
  /**
   * The body of the routine.
   */
  definitionBody?: string;
  /**
   * The language the routine is written in. The exact value depends on the
   * source system. For BigQuery routines, possible values are: * `SQL` *
   * `JAVASCRIPT`
   */
  language?: string;
  /**
   * Return type of the argument. The exact value depends on the source system
   * and the language.
   */
  returnType?: string;
  /**
   * Arguments of the routine.
   */
  routineArguments?: GoogleCloudDatacatalogV1RoutineSpecArgument[];
  /**
   * The type of the routine.
   */
  routineType?:  | "ROUTINE_TYPE_UNSPECIFIED" | "SCALAR_FUNCTION" | "PROCEDURE";
}

/**
 * Input or output argument of a function or stored procedure.
 */
export interface GoogleCloudDatacatalogV1RoutineSpecArgument {
  /**
   * Specifies whether the argument is input or output.
   */
  mode?:  | "MODE_UNSPECIFIED" | "IN" | "OUT" | "INOUT";
  /**
   * The name of the argument. A return argument of a function might not have a
   * name.
   */
  name?: string;
  /**
   * Type of the argument. The exact value depends on the source system and the
   * language.
   */
  type?: string;
}

/**
 * Represents a schema, for example, a BigQuery, GoogleSQL, or Avro schema.
 */
export interface GoogleCloudDatacatalogV1Schema {
  /**
   * The unified GoogleSQL-like schema of columns. The overall maximum number
   * of columns and nested columns is 10,000. The maximum nested depth is 15
   * levels.
   */
  columns?: GoogleCloudDatacatalogV1ColumnSchema[];
}

/**
 * Request message for SearchCatalog.
 */
export interface GoogleCloudDatacatalogV1SearchCatalogRequest {
  /**
   * Specifies the order of results. Currently supported case-sensitive values
   * are: * `relevance` that can only be descending * `last_modified_timestamp
   * [asc|desc]` with descending (`desc`) as default * `default` that can only
   * be descending If this parameter is omitted, it defaults to the descending
   * `relevance`.
   */
  orderBy?: string;
  /**
   * Number of results to return in a single search page. Can't be negative or
   * 0, defaults to 10 in this case. The maximum number is 1000. If exceeded,
   * throws an "invalid argument" exception.
   */
  pageSize?: number;
  /**
   * Optional. Pagination token that, if specified, returns the next page of
   * search results. If empty, returns the first page. This token is returned in
   * the SearchCatalogResponse.next_page_token field of the response to a
   * previous SearchCatalogRequest call.
   */
  pageToken?: string;
  /**
   * Optional. The query string with a minimum of 3 characters and specific
   * syntax. For more information, see [Data Catalog search
   * syntax](https://cloud.google.com/data-catalog/docs/how-to/search-reference).
   * An empty query string returns all data assets (in the specified scope) that
   * you have access to. A query string can be a simple `xyz` or qualified by
   * predicates: * `name:x` * `column:y` * `description:z`
   */
  query?: string;
  /**
   * Required. The scope of this search request. The `scope` is invalid if
   * `include_org_ids`, `include_project_ids` are empty AND
   * `include_gcp_public_datasets` is set to `false`. In this case, the request
   * returns an error.
   */
  scope?: GoogleCloudDatacatalogV1SearchCatalogRequestScope;
}

/**
 * The criteria that select the subspace used for query matching.
 */
export interface GoogleCloudDatacatalogV1SearchCatalogRequestScope {
  /**
   * If `true`, include Google Cloud public datasets in search results. By
   * default, they are excluded. See [Google Cloud Public
   * Datasets](/public-datasets) for more information.
   */
  includeGcpPublicDatasets?: boolean;
  /**
   * The list of organization IDs to search within. To find your organization
   * ID, follow the steps from [Creating and managing organizations]
   * (/resource-manager/docs/creating-managing-organization).
   */
  includeOrgIds?: string[];
  /**
   * The list of project IDs to search within. For more information on the
   * distinction between project names, IDs, and numbers, see
   * [Projects](/docs/overview/#projects).
   */
  includeProjectIds?: string[];
  /**
   * Optional. This field is deprecated. The search mechanism for public and
   * private tag templates is the same.
   */
  includePublicTagTemplates?: boolean;
  /**
   * Optional. The list of locations to search within. If empty, all locations
   * are searched. Returns an error if any location in the list isn't one of the
   * [Supported
   * regions](https://cloud.google.com/data-catalog/docs/concepts/regions#supported_regions).
   * If a location is unreachable, its name is returned in the
   * `SearchCatalogResponse.unreachable` field. To get additional information on
   * the error, repeat the search request and set the location name as the value
   * of this parameter.
   */
  restrictedLocations?: string[];
  /**
   * Optional. If `true`, search only among starred entries. By default, all
   * results are returned, starred or not.
   */
  starredOnly?: boolean;
}

/**
 * Response message for SearchCatalog.
 */
export interface GoogleCloudDatacatalogV1SearchCatalogResponse {
  /**
   * Pagination token that can be used in subsequent calls to retrieve the next
   * page of results.
   */
  nextPageToken?: string;
  /**
   * Search results.
   */
  results?: GoogleCloudDatacatalogV1SearchCatalogResult[];
  /**
   * Unreachable locations. Search results don't include data from those
   * locations. To get additional information on an error, repeat the search
   * request and restrict it to specific locations by setting the
   * `SearchCatalogRequest.scope.restricted_locations` parameter.
   */
  unreachable?: string[];
}

function serializeGoogleCloudDatacatalogV1SearchCatalogResponse(data: any): GoogleCloudDatacatalogV1SearchCatalogResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeGoogleCloudDatacatalogV1SearchCatalogResult(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1SearchCatalogResponse(data: any): GoogleCloudDatacatalogV1SearchCatalogResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeGoogleCloudDatacatalogV1SearchCatalogResult(item))) : undefined,
  };
}

/**
 * Result in the response to a search request. Each result captures details of
 * one entry that matches the search.
 */
export interface GoogleCloudDatacatalogV1SearchCatalogResult {
  /**
   * Entry description that can consist of several sentences or paragraphs that
   * describe entry contents.
   */
  description?: string;
  /**
   * The display name of the result.
   */
  displayName?: string;
  /**
   * Fully qualified name (FQN) of the resource. FQNs take two forms: * For
   * non-regionalized resources:
   * `{SYSTEM}:{PROJECT}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}` * For
   * regionalized resources:
   * `{SYSTEM}:{PROJECT}.{LOCATION_ID}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}`
   * Example for a DPMS table:
   * `dataproc_metastore:PROJECT_ID.LOCATION_ID.INSTANCE_ID.DATABASE_ID.TABLE_ID`
   */
  fullyQualifiedName?: string;
  /**
   * Output only. The source system that Data Catalog automatically integrates
   * with, such as BigQuery, Cloud Pub/Sub, or Dataproc Metastore.
   */
  readonly integratedSystem?:  | "INTEGRATED_SYSTEM_UNSPECIFIED" | "BIGQUERY" | "CLOUD_PUBSUB" | "DATAPROC_METASTORE" | "DATAPLEX" | "CLOUD_SQL" | "LOOKER";
  /**
   * The full name of the Google Cloud resource the entry belongs to. For more
   * information, see [Full Resource Name]
   * (/apis/design/resource_names#full_resource_name). Example:
   * `//bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID`
   */
  linkedResource?: string;
  /**
   * The last modification timestamp of the entry in the source system.
   */
  modifyTime?: Date;
  /**
   * The relative name of the resource in URL format. Examples: *
   * `projects/{PROJECT_ID}/locations/{LOCATION_ID}/entryGroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`
   * * `projects/{PROJECT_ID}/tagTemplates/{TAG_TEMPLATE_ID}`
   */
  relativeResourceName?: string;
  /**
   * Sub-type of the search result. A dot-delimited full type of the resource.
   * The same type you specify in the `type` search predicate. Examples:
   * `entry.table`, `entry.dataStream`, `tagTemplate`.
   */
  searchResultSubtype?: string;
  /**
   * Type of the search result. You can use this field to determine which get
   * method to call to fetch the full resource.
   */
  searchResultType?:  | "SEARCH_RESULT_TYPE_UNSPECIFIED" | "ENTRY" | "TAG_TEMPLATE" | "ENTRY_GROUP";
  /**
   * Custom source system that you can manually integrate Data Catalog with.
   */
  userSpecifiedSystem?: string;
}

function serializeGoogleCloudDatacatalogV1SearchCatalogResult(data: any): GoogleCloudDatacatalogV1SearchCatalogResult {
  return {
    ...data,
    modifyTime: data["modifyTime"] !== undefined ? data["modifyTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1SearchCatalogResult(data: any): GoogleCloudDatacatalogV1SearchCatalogResult {
  return {
    ...data,
    modifyTime: data["modifyTime"] !== undefined ? new Date(data["modifyTime"]) : undefined,
  };
}

/**
 * A nested protocol buffer that represents a policy tag and all its
 * descendants.
 */
export interface GoogleCloudDatacatalogV1SerializedPolicyTag {
  /**
   * Children of the policy tag, if any.
   */
  childPolicyTags?: GoogleCloudDatacatalogV1SerializedPolicyTag[];
  /**
   * Description of the serialized policy tag. At most 2000 bytes when encoded
   * in UTF-8. If not set, defaults to an empty description.
   */
  description?: string;
  /**
   * Required. Display name of the policy tag. At most 200 bytes when encoded
   * in UTF-8.
   */
  displayName?: string;
  /**
   * Resource name of the policy tag. This field is ignored when calling
   * `ImportTaxonomies`.
   */
  policyTag?: string;
}

/**
 * A nested protocol buffer that represents a taxonomy and the hierarchy of its
 * policy tags. Used for taxonomy replacement, import, and export.
 */
export interface GoogleCloudDatacatalogV1SerializedTaxonomy {
  /**
   * A list of policy types that are activated per taxonomy.
   */
  activatedPolicyTypes?:  | "POLICY_TYPE_UNSPECIFIED" | "FINE_GRAINED_ACCESS_CONTROL"[];
  /**
   * Description of the serialized taxonomy. At most 2000 bytes when encoded in
   * UTF-8. If not set, defaults to an empty description.
   */
  description?: string;
  /**
   * Required. Display name of the taxonomy. At most 200 bytes when encoded in
   * UTF-8.
   */
  displayName?: string;
  /**
   * Top level policy tags associated with the taxonomy, if any.
   */
  policyTags?: GoogleCloudDatacatalogV1SerializedPolicyTag[];
}

/**
 * Specification that applies to entries that are part `SQL_DATABASE` system
 * (user_specified_type)
 */
export interface GoogleCloudDatacatalogV1SqlDatabaseSystemSpec {
  /**
   * Version of the database engine.
   */
  databaseVersion?: string;
  /**
   * Host of the SQL database enum InstanceHost { UNDEFINED = 0; SELF_HOSTED =
   * 1; CLOUD_SQL = 2; AMAZON_RDS = 3; AZURE_SQL = 4; } Host of the enclousing
   * database instance.
   */
  instanceHost?: string;
  /**
   * SQL Database Engine. enum SqlEngine { UNDEFINED = 0; MY_SQL = 1;
   * POSTGRE_SQL = 2; SQL_SERVER = 3; } Engine of the enclosing database
   * instance.
   */
  sqlEngine?: string;
}

/**
 * Request message for StarEntry.
 */
export interface GoogleCloudDatacatalogV1StarEntryRequest {
}

/**
 * Response message for StarEntry. Empty for now
 */
export interface GoogleCloudDatacatalogV1StarEntryResponse {
}

/**
 * Details the properties of the underlying storage.
 */
export interface GoogleCloudDatacatalogV1StorageProperties {
  /**
   * Patterns to identify a set of files for this fileset. Examples of a valid
   * `file_pattern`: * `gs://bucket_name/dir/*`: matches all files in the
   * `bucket_name/dir` directory * `gs://bucket_name/dir/**`: matches all files
   * in the `bucket_name/dir` and all subdirectories recursively *
   * `gs://bucket_name/file*`: matches files prefixed by `file` in `bucket_name`
   * * `gs://bucket_name/??.txt`: matches files with two characters followed by
   * `.txt` in `bucket_name` * `gs://bucket_name/[aeiou].txt`: matches files
   * that contain a single vowel character followed by `.txt` in `bucket_name` *
   * `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`, ... or
   * `m` followed by `.txt` in `bucket_name` * `gs://bucket_name/a/*\/b`:
   * matches all files in `bucket_name` that match the `a/*\/b` pattern, such as
   * `a/c/b`, `a/d/b` * `gs://another_bucket/a.txt`: matches
   * `gs://another_bucket/a.txt`
   */
  filePattern?: string[];
  /**
   * File type in MIME format, for example, `text/plain`.
   */
  fileType?: string;
}

/**
 * Timestamps associated with this resource in a particular system.
 */
export interface GoogleCloudDatacatalogV1SystemTimestamps {
  /**
   * Creation timestamp of the resource within the given system.
   */
  createTime?: Date;
  /**
   * Output only. Expiration timestamp of the resource within the given system.
   * Currently only applicable to BigQuery resources.
   */
  readonly expireTime?: Date;
  /**
   * Timestamp of the last modification of the resource or its metadata within
   * a given system. Note: Depending on the source system, not every
   * modification updates this timestamp. For example, BigQuery timestamps every
   * metadata modification but not data or permission changes.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDatacatalogV1SystemTimestamps(data: any): GoogleCloudDatacatalogV1SystemTimestamps {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1SystemTimestamps(data: any): GoogleCloudDatacatalogV1SystemTimestamps {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Normal BigQuery table specification.
 */
export interface GoogleCloudDatacatalogV1TableSpec {
  /**
   * Output only. If the table is date-sharded, that is, it matches the
   * `[prefix]YYYYMMDD` name pattern, this field is the Data Catalog resource
   * name of the date-sharded grouped entry. For example:
   * `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`.
   * Otherwise, `grouped_entry` is empty.
   */
  readonly groupedEntry?: string;
}

/**
 * Tags contain custom metadata and are attached to Data Catalog resources.
 * Tags conform with the specification of their tag template. See [Data Catalog
 * IAM](https://cloud.google.com/data-catalog/docs/concepts/iam) for information
 * on the permissions needed to create or view tags.
 */
export interface GoogleCloudDatacatalogV1Tag {
  /**
   * Resources like entry can have schemas associated with them. This scope
   * allows you to attach tags to an individual column based on that schema. To
   * attach a tag to a nested column, separate column names with a dot (`.`).
   * Example: `column.nested_column`.
   */
  column?: string;
  /**
   * Required. Maps the ID of a tag field to its value and additional
   * information about that field. Tag template defines valid field IDs. A tag
   * must have at least 1 field and at most 500 fields.
   */
  fields?: {
    [key: string]: GoogleCloudDatacatalogV1TagField
  };
  /**
   * The resource name of the tag in URL format where tag ID is a
   * system-generated identifier. Note: The tag itself might not be stored in
   * the location specified in its name.
   */
  name?: string;
  /**
   * Required. The resource name of the tag template this tag uses. Example:
   * `projects/{PROJECT_ID}/locations/{LOCATION}/tagTemplates/{TAG_TEMPLATE_ID}`
   * This field cannot be modified after creation.
   */
  template?: string;
  /**
   * Output only. The display name of the tag template.
   */
  readonly templateDisplayName?: string;
}

function serializeGoogleCloudDatacatalogV1Tag(data: any): GoogleCloudDatacatalogV1Tag {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudDatacatalogV1TagField(v)]))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1Tag(data: any): GoogleCloudDatacatalogV1Tag {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudDatacatalogV1TagField(v)]))) : undefined,
  };
}

/**
 * Contains the value and additional information on a field within a Tag.
 */
export interface GoogleCloudDatacatalogV1TagField {
  /**
   * The value of a tag field with a boolean type.
   */
  boolValue?: boolean;
  /**
   * Output only. The display name of this field.
   */
  readonly displayName?: string;
  /**
   * The value of a tag field with a double type.
   */
  doubleValue?: number;
  /**
   * The value of a tag field with an enum type. This value must be one of the
   * allowed values listed in this enum.
   */
  enumValue?: GoogleCloudDatacatalogV1TagFieldEnumValue;
  /**
   * Output only. The order of this field with respect to other fields in this
   * tag. Can be set by Tag. For example, a higher value can indicate a more
   * important field. The value can be negative. Multiple fields can have the
   * same order, and field orders within a tag don't have to be sequential.
   */
  readonly order?: number;
  /**
   * The value of a tag field with a rich text type. The maximum length is 10
   * MiB as this value holds HTML descriptions including encoded images. The
   * maximum length of the text without images is 100 KiB.
   */
  richtextValue?: string;
  /**
   * The value of a tag field with a string type. The maximum length is 2000
   * UTF-8 characters.
   */
  stringValue?: string;
  /**
   * The value of a tag field with a timestamp type.
   */
  timestampValue?: Date;
}

function serializeGoogleCloudDatacatalogV1TagField(data: any): GoogleCloudDatacatalogV1TagField {
  return {
    ...data,
    timestampValue: data["timestampValue"] !== undefined ? data["timestampValue"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1TagField(data: any): GoogleCloudDatacatalogV1TagField {
  return {
    ...data,
    timestampValue: data["timestampValue"] !== undefined ? new Date(data["timestampValue"]) : undefined,
  };
}

/**
 * An enum value.
 */
export interface GoogleCloudDatacatalogV1TagFieldEnumValue {
  /**
   * The display name of the enum value.
   */
  displayName?: string;
}

/**
 * Wrapper containing Entry and information about Tags that should and should
 * not be attached to it.
 */
export interface GoogleCloudDatacatalogV1TaggedEntry {
  /**
   * Tags that should be deleted from the Data Catalog. Caller should populate
   * template name and column only.
   */
  absentTags?: GoogleCloudDatacatalogV1Tag[];
  /**
   * Tags that should be ingested into the Data Catalog. Caller should populate
   * template name, column and fields.
   */
  presentTags?: GoogleCloudDatacatalogV1Tag[];
  /**
   * Non-encrypted Data Catalog v1 Entry.
   */
  v1Entry?: GoogleCloudDatacatalogV1Entry;
}

function serializeGoogleCloudDatacatalogV1TaggedEntry(data: any): GoogleCloudDatacatalogV1TaggedEntry {
  return {
    ...data,
    absentTags: data["absentTags"] !== undefined ? data["absentTags"].map((item: any) => (serializeGoogleCloudDatacatalogV1Tag(item))) : undefined,
    presentTags: data["presentTags"] !== undefined ? data["presentTags"].map((item: any) => (serializeGoogleCloudDatacatalogV1Tag(item))) : undefined,
    v1Entry: data["v1Entry"] !== undefined ? serializeGoogleCloudDatacatalogV1Entry(data["v1Entry"]) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1TaggedEntry(data: any): GoogleCloudDatacatalogV1TaggedEntry {
  return {
    ...data,
    absentTags: data["absentTags"] !== undefined ? data["absentTags"].map((item: any) => (deserializeGoogleCloudDatacatalogV1Tag(item))) : undefined,
    presentTags: data["presentTags"] !== undefined ? data["presentTags"].map((item: any) => (deserializeGoogleCloudDatacatalogV1Tag(item))) : undefined,
    v1Entry: data["v1Entry"] !== undefined ? deserializeGoogleCloudDatacatalogV1Entry(data["v1Entry"]) : undefined,
  };
}

/**
 * A tag template defines a tag that can have one or more typed fields. The
 * template is used to create tags that are attached to Google Cloud resources.
 * [Tag template roles]
 * (https://cloud.google.com/iam/docs/understanding-roles#data-catalog-roles)
 * provide permissions to create, edit, and use the template. For example, see
 * the [TagTemplate User]
 * (https://cloud.google.com/data-catalog/docs/how-to/template-user) role that
 * includes a permission to use the tag template to tag resources.
 */
export interface GoogleCloudDatacatalogV1TagTemplate {
  /**
   * Display name for this template. Defaults to an empty string. The name must
   * contain only Unicode letters, numbers (0-9), underscores (_), dashes (-),
   * spaces ( ), and can't start or end with spaces. The maximum length is 200
   * characters.
   */
  displayName?: string;
  /**
   * Required. Map of tag template field IDs to the settings for the field.
   * This map is an exhaustive list of the allowed fields. The map must contain
   * at least one field and at most 500 fields. The keys to this map are tag
   * template field IDs. The IDs have the following limitations: * Can contain
   * uppercase and lowercase letters, numbers (0-9) and underscores (_). * Must
   * be at least 1 character and at most 64 characters long. * Must start with a
   * letter or underscore.
   */
  fields?: {
    [key: string]: GoogleCloudDatacatalogV1TagTemplateField
  };
  /**
   * Indicates whether tags created with this template are public. Public tags
   * do not require tag template access to appear in ListTags API response.
   * Additionally, you can search for a public tag by value with a simple search
   * query in addition to using a ``tag:`` predicate.
   */
  isPubliclyReadable?: boolean;
  /**
   * The resource name of the tag template in URL format. Note: The tag
   * template itself and its child resources might not be stored in the location
   * specified in its name.
   */
  name?: string;
}

/**
 * The template for an individual field within a tag template.
 */
export interface GoogleCloudDatacatalogV1TagTemplateField {
  /**
   * The description for this field. Defaults to an empty string.
   */
  description?: string;
  /**
   * The display name for this field. Defaults to an empty string. The name
   * must contain only Unicode letters, numbers (0-9), underscores (_), dashes
   * (-), spaces ( ), and can't start or end with spaces. The maximum length is
   * 200 characters.
   */
  displayName?: string;
  /**
   * If true, this field is required. Defaults to false.
   */
  isRequired?: boolean;
  /**
   * Output only. The resource name of the tag template field in URL format.
   * Example:
   * `projects/{PROJECT_ID}/locations/{LOCATION}/tagTemplates/{TAG_TEMPLATE}/fields/{FIELD}`
   * Note: The tag template field itself might not be stored in the location
   * specified in its name. The name must contain only letters (a-z, A-Z),
   * numbers (0-9), or underscores (_), and must start with a letter or
   * underscore. The maximum length is 64 characters.
   */
  readonly name?: string;
  /**
   * The order of this field with respect to other fields in this tag template.
   * For example, a higher value can indicate a more important field. The value
   * can be negative. Multiple fields can have the same order and field orders
   * within a tag don't have to be sequential.
   */
  order?: number;
  /**
   * Required. The type of value this tag field can contain.
   */
  type?: GoogleCloudDatacatalogV1FieldType;
}

/**
 * A taxonomy is a collection of hierarchical policy tags that classify data
 * along a common axis. For example, a "data sensitivity" taxonomy might contain
 * the following policy tags: ``` + PII + Account number + Age + SSN + Zipcode +
 * Financials + Revenue ``` A "data origin" taxonomy might contain the following
 * policy tags: ``` + User data + Employee data + Partner data + Public data ```
 */
export interface GoogleCloudDatacatalogV1Taxonomy {
  /**
   * Optional. A list of policy types that are activated for this taxonomy. If
   * not set, defaults to an empty list.
   */
  activatedPolicyTypes?:  | "POLICY_TYPE_UNSPECIFIED" | "FINE_GRAINED_ACCESS_CONTROL"[];
  /**
   * Optional. Description of this taxonomy. If not set, defaults to empty. The
   * description must contain only Unicode characters, tabs, newlines, carriage
   * returns, and page breaks, and be at most 2000 bytes long when encoded in
   * UTF-8.
   */
  description?: string;
  /**
   * Required. User-defined name of this taxonomy. The name can't start or end
   * with spaces, must contain only Unicode letters, numbers, underscores,
   * dashes, and spaces, and be at most 200 bytes long when encoded in UTF-8.
   * The taxonomy display name must be unique within an organization.
   */
  displayName?: string;
  /**
   * Output only. Resource name of this taxonomy in URL format. Note: Policy
   * tag manager generates unique taxonomy IDs.
   */
  readonly name?: string;
  /**
   * Output only. Number of policy tags in this taxonomy.
   */
  readonly policyTagCount?: number;
  /**
   * Output only. Identity of the service which owns the Taxonomy. This field
   * is only populated when the taxonomy is created by a Google Cloud service.
   * Currently only 'DATAPLEX' is supported.
   */
  readonly service?: GoogleCloudDatacatalogV1TaxonomyService;
  /**
   * Output only. Creation and modification timestamps of this taxonomy.
   */
  readonly taxonomyTimestamps?: GoogleCloudDatacatalogV1SystemTimestamps;
}

/**
 * The source system of the Taxonomy.
 */
export interface GoogleCloudDatacatalogV1TaxonomyService {
  /**
   * P4SA Identity of the service.
   */
  identity?: string;
  /**
   * The Google Cloud service name.
   */
  name?:  | "MANAGING_SYSTEM_UNSPECIFIED" | "MANAGING_SYSTEM_DATAPLEX" | "MANAGING_SYSTEM_OTHER";
}

/**
 * Request message for UnstarEntry.
 */
export interface GoogleCloudDatacatalogV1UnstarEntryRequest {
}

/**
 * Response message for UnstarEntry. Empty for now
 */
export interface GoogleCloudDatacatalogV1UnstarEntryResponse {
}

/**
 * The set of all usage signals that Data Catalog stores. Note: Usually, these
 * signals are updated daily. In rare cases, an update may fail but will be
 * performed again on the next day.
 */
export interface GoogleCloudDatacatalogV1UsageSignal {
  /**
   * Common usage statistics over each of the predefined time ranges. Supported
   * time ranges are `{"24H", "7D", "30D", "Lifetime"}`.
   */
  commonUsageWithinTimeRange?: {
    [key: string]: GoogleCloudDatacatalogV1CommonUsageStats
  };
  /**
   * Favorite count in the source system.
   */
  favoriteCount?: bigint;
  /**
   * The end timestamp of the duration of usage statistics.
   */
  updateTime?: Date;
  /**
   * Output only. BigQuery usage statistics over each of the predefined time
   * ranges. Supported time ranges are `{"24H", "7D", "30D"}`.
   */
  readonly usageWithinTimeRange?: {
    [key: string]: GoogleCloudDatacatalogV1UsageStats
  };
}

function serializeGoogleCloudDatacatalogV1UsageSignal(data: any): GoogleCloudDatacatalogV1UsageSignal {
  return {
    ...data,
    commonUsageWithinTimeRange: data["commonUsageWithinTimeRange"] !== undefined ? Object.fromEntries(Object.entries(data["commonUsageWithinTimeRange"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudDatacatalogV1CommonUsageStats(v)]))) : undefined,
    favoriteCount: data["favoriteCount"] !== undefined ? String(data["favoriteCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogV1UsageSignal(data: any): GoogleCloudDatacatalogV1UsageSignal {
  return {
    ...data,
    commonUsageWithinTimeRange: data["commonUsageWithinTimeRange"] !== undefined ? Object.fromEntries(Object.entries(data["commonUsageWithinTimeRange"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudDatacatalogV1CommonUsageStats(v)]))) : undefined,
    favoriteCount: data["favoriteCount"] !== undefined ? BigInt(data["favoriteCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Detailed statistics on the entry's usage. Usage statistics have the
 * following limitations: - Only BigQuery tables have them. - They only include
 * BigQuery query jobs. - They might be underestimated because wildcard table
 * references are not yet counted. For more information, see [Querying multiple
 * tables using a wildcard table]
 * (https://cloud.google.com/bigquery/docs/querying-wildcard-tables)
 */
export interface GoogleCloudDatacatalogV1UsageStats {
  /**
   * The number of cancelled attempts to use the underlying entry.
   */
  totalCancellations?: number;
  /**
   * The number of successful uses of the underlying entry.
   */
  totalCompletions?: number;
  /**
   * Total time spent only on successful uses, in milliseconds.
   */
  totalExecutionTimeForCompletionsMillis?: number;
  /**
   * The number of failed attempts to use the underlying entry.
   */
  totalFailures?: number;
}

/**
 * Table view specification.
 */
export interface GoogleCloudDatacatalogV1ViewSpec {
  /**
   * Output only. The query that defines the table view.
   */
  readonly viewQuery?: string;
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
 * Additional options for DataCatalog#projectsLocationsEntryGroupsCreate.
 */
export interface ProjectsLocationsEntryGroupsCreateOptions {
  /**
   * Required. The ID of the entry group to create. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and must start with a
   * letter or underscore. The maximum size is 64 bytes when encoded in UTF-8.
   */
  entryGroupId?: string;
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsDelete.
 */
export interface ProjectsLocationsEntryGroupsDeleteOptions {
  /**
   * Optional. If true, deletes all entries in the entry group.
   */
  force?: boolean;
}

/**
 * Additional options for
 * DataCatalog#projectsLocationsEntryGroupsEntriesCreate.
 */
export interface ProjectsLocationsEntryGroupsEntriesCreateOptions {
  /**
   * Required. The ID of the entry to create. The ID must contain only letters
   * (a-z, A-Z), numbers (0-9), and underscores (_). The maximum size is 64
   * bytes when encoded in UTF-8.
   */
  entryId?: string;
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsEntriesList.
 */
export interface ProjectsLocationsEntryGroupsEntriesListOptions {
  /**
   * The maximum number of items to return. Default is 10. Maximum limit is
   * 1000. Throws an invalid argument if `page_size` is more than 1000.
   */
  pageSize?: number;
  /**
   * Pagination token that specifies the next page to return. If empty, the
   * first page is returned.
   */
  pageToken?: string;
  /**
   * The fields to return for each entry. If empty or omitted, all fields are
   * returned. For example, to return a list of entries with only the `name`
   * field, set `read_mask` to only one path with the `name` value.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEntryGroupsEntriesListOptions(data: any): ProjectsLocationsEntryGroupsEntriesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsEntryGroupsEntriesListOptions(data: any): ProjectsLocationsEntryGroupsEntriesListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsEntriesPatch.
 */
export interface ProjectsLocationsEntryGroupsEntriesPatchOptions {
  /**
   * Names of fields whose values to overwrite on an entry. If this parameter
   * is absent or empty, all modifiable fields are overwritten. If such fields
   * are non-required and omitted in the request body, their values are emptied.
   * You can modify only the fields listed below. For entries with type
   * `DATA_STREAM`: * `schema` For entries with type `FILESET`: * `schema` *
   * `display_name` * `description` * `gcs_fileset_spec` *
   * `gcs_fileset_spec.file_patterns` For entries with `user_specified_type`: *
   * `schema` * `display_name` * `description` * `user_specified_type` *
   * `user_specified_system` * `linked_resource` * `source_system_timestamps`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEntryGroupsEntriesPatchOptions(data: any): ProjectsLocationsEntryGroupsEntriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsEntryGroupsEntriesPatchOptions(data: any): ProjectsLocationsEntryGroupsEntriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * DataCatalog#projectsLocationsEntryGroupsEntriesTagsList.
 */
export interface ProjectsLocationsEntryGroupsEntriesTagsListOptions {
  /**
   * The maximum number of tags to return. Default is 10. Maximum limit is
   * 1000.
   */
  pageSize?: number;
  /**
   * Pagination token that specifies the next page to return. If empty, the
   * first page is returned.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DataCatalog#projectsLocationsEntryGroupsEntriesTagsPatch.
 */
export interface ProjectsLocationsEntryGroupsEntriesTagsPatchOptions {
  /**
   * Names of fields whose values to overwrite on a tag. Currently, a tag has
   * the only modifiable field with the name `fields`. In general, if this
   * parameter is absent or empty, all modifiable fields are overwritten. If
   * such fields are non-required and omitted in the request body, their values
   * are emptied.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEntryGroupsEntriesTagsPatchOptions(data: any): ProjectsLocationsEntryGroupsEntriesTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsEntryGroupsEntriesTagsPatchOptions(data: any): ProjectsLocationsEntryGroupsEntriesTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsGet.
 */
export interface ProjectsLocationsEntryGroupsGetOptions {
  /**
   * The fields to return. If empty or omitted, all fields are returned.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEntryGroupsGetOptions(data: any): ProjectsLocationsEntryGroupsGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsEntryGroupsGetOptions(data: any): ProjectsLocationsEntryGroupsGetOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsList.
 */
export interface ProjectsLocationsEntryGroupsListOptions {
  /**
   * Optional. The maximum number of items to return. Default is 10. Maximum
   * limit is 1000. Throws an invalid argument if `page_size` is greater than
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. Pagination token that specifies the next page to return. If
   * empty, returns the first page.
   */
  pageToken?: string;
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsPatch.
 */
export interface ProjectsLocationsEntryGroupsPatchOptions {
  /**
   * Names of fields whose values to overwrite on an entry group. If this
   * parameter is absent or empty, all modifiable fields are overwritten. If
   * such fields are non-required and omitted in the request body, their values
   * are emptied.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEntryGroupsPatchOptions(data: any): ProjectsLocationsEntryGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsEntryGroupsPatchOptions(data: any): ProjectsLocationsEntryGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsTagsList.
 */
export interface ProjectsLocationsEntryGroupsTagsListOptions {
  /**
   * The maximum number of tags to return. Default is 10. Maximum limit is
   * 1000.
   */
  pageSize?: number;
  /**
   * Pagination token that specifies the next page to return. If empty, the
   * first page is returned.
   */
  pageToken?: string;
}

/**
 * Additional options for DataCatalog#projectsLocationsEntryGroupsTagsPatch.
 */
export interface ProjectsLocationsEntryGroupsTagsPatchOptions {
  /**
   * Names of fields whose values to overwrite on a tag. Currently, a tag has
   * the only modifiable field with the name `fields`. In general, if this
   * parameter is absent or empty, all modifiable fields are overwritten. If
   * such fields are non-required and omitted in the request body, their values
   * are emptied.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEntryGroupsTagsPatchOptions(data: any): ProjectsLocationsEntryGroupsTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsEntryGroupsTagsPatchOptions(data: any): ProjectsLocationsEntryGroupsTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DataCatalog#projectsLocationsOperationsList.
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
 * Additional options for DataCatalog#projectsLocationsTagTemplatesCreate.
 */
export interface ProjectsLocationsTagTemplatesCreateOptions {
  /**
   * Required. The ID of the tag template to create. The ID must contain only
   * lowercase letters (a-z), numbers (0-9), or underscores (_), and must start
   * with a letter or underscore. The maximum size is 64 bytes when encoded in
   * UTF-8.
   */
  tagTemplateId?: string;
}

/**
 * Additional options for DataCatalog#projectsLocationsTagTemplatesDelete.
 */
export interface ProjectsLocationsTagTemplatesDeleteOptions {
  /**
   * Required. If true, deletes all tags that use this template. Currently,
   * `true` is the only supported value.
   */
  force?: boolean;
}

/**
 * Additional options for
 * DataCatalog#projectsLocationsTagTemplatesFieldsCreate.
 */
export interface ProjectsLocationsTagTemplatesFieldsCreateOptions {
  /**
   * Required. The ID of the tag template field to create. Note: Adding a
   * required field to an existing template is *not* allowed. Field IDs can
   * contain letters (both uppercase and lowercase), numbers (0-9), underscores
   * (_) and dashes (-). Field IDs must be at least 1 character long and at most
   * 128 characters long. Field IDs must also be unique within their template.
   */
  tagTemplateFieldId?: string;
}

/**
 * Additional options for
 * DataCatalog#projectsLocationsTagTemplatesFieldsDelete.
 */
export interface ProjectsLocationsTagTemplatesFieldsDeleteOptions {
  /**
   * Required. If true, deletes this field from any tags that use it.
   * Currently, `true` is the only supported value.
   */
  force?: boolean;
}

/**
 * Additional options for DataCatalog#projectsLocationsTagTemplatesFieldsPatch.
 */
export interface ProjectsLocationsTagTemplatesFieldsPatchOptions {
  /**
   * Optional. Names of fields whose values to overwrite on an individual field
   * of a tag template. The following fields are modifiable: * `display_name` *
   * `type.enum_type` * `is_required` If this parameter is absent or empty, all
   * modifiable fields are overwritten. If such fields are non-required and
   * omitted in the request body, their values are emptied with one exception:
   * when updating an enum type, the provided values are merged with the
   * existing values. Therefore, enum values can only be added, existing enum
   * values cannot be deleted or renamed. Additionally, updating a template
   * field from optional to required is *not* allowed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsTagTemplatesFieldsPatchOptions(data: any): ProjectsLocationsTagTemplatesFieldsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTagTemplatesFieldsPatchOptions(data: any): ProjectsLocationsTagTemplatesFieldsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DataCatalog#projectsLocationsTagTemplatesPatch.
 */
export interface ProjectsLocationsTagTemplatesPatchOptions {
  /**
   * Names of fields whose values to overwrite on a tag template. Currently,
   * only `display_name` and `is_publicly_readable` can be overwritten. If this
   * parameter is absent or empty, all modifiable fields are overwritten. If
   * such fields are non-required and omitted in the request body, their values
   * are emptied. Note: Updating the `is_publicly_readable` field may require up
   * to 12 hours to take effect in search results.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsTagTemplatesPatchOptions(data: any): ProjectsLocationsTagTemplatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTagTemplatesPatchOptions(data: any): ProjectsLocationsTagTemplatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DataCatalog#projectsLocationsTaxonomiesExport.
 */
export interface ProjectsLocationsTaxonomiesExportOptions {
  /**
   * Serialized export taxonomies that contain all the policy tags as nested
   * protocol buffers.
   */
  serializedTaxonomies?: boolean;
  /**
   * Required. Resource names of the taxonomies to export.
   */
  taxonomies?: string;
}

/**
 * Additional options for DataCatalog#projectsLocationsTaxonomiesList.
 */
export interface ProjectsLocationsTaxonomiesListOptions {
  /**
   * Supported field for filter is 'service' and value is 'dataplex'. Eg:
   * service=dataplex.
   */
  filter?: string;
  /**
   * The maximum number of items to return. Must be a value between 1 and 1000
   * inclusively. If not set, defaults to 50.
   */
  pageSize?: number;
  /**
   * The pagination token of the next results page. If not set, the first page
   * is returned. The token is returned in the response to a previous list
   * request.
   */
  pageToken?: string;
}

/**
 * Additional options for DataCatalog#projectsLocationsTaxonomiesPatch.
 */
export interface ProjectsLocationsTaxonomiesPatchOptions {
  /**
   * Specifies fields to update. If not set, defaults to all fields you can
   * update. For more information, see [FieldMask]
   * (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask).
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsTaxonomiesPatchOptions(data: any): ProjectsLocationsTaxonomiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTaxonomiesPatchOptions(data: any): ProjectsLocationsTaxonomiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * DataCatalog#projectsLocationsTaxonomiesPolicyTagsList.
 */
export interface ProjectsLocationsTaxonomiesPolicyTagsListOptions {
  /**
   * The maximum number of items to return. Must be a value between 1 and 1000
   * inclusively. If not set, defaults to 50.
   */
  pageSize?: number;
  /**
   * The pagination token of the next results page. If not set, returns the
   * first page. The token is returned in the response to a previous list
   * request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DataCatalog#projectsLocationsTaxonomiesPolicyTagsPatch.
 */
export interface ProjectsLocationsTaxonomiesPolicyTagsPatchOptions {
  /**
   * Specifies the fields to update. You can update only display name,
   * description, and parent policy tag. If not set, defaults to all updatable
   * fields. For more information, see [FieldMask]
   * (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask).
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsTaxonomiesPolicyTagsPatchOptions(data: any): ProjectsLocationsTaxonomiesPolicyTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTaxonomiesPolicyTagsPatchOptions(data: any): ProjectsLocationsTaxonomiesPolicyTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
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
