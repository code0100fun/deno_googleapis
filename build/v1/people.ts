// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * People API Client for Deno
 * ==========================
 * 
 * Provides access to information about profiles and contacts.
 * 
 * Docs: https://developers.google.com/people/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides access to information about profiles and contacts.
 */
export class People {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://people.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Get a list of contact groups owned by the authenticated user by specifying
   * a list of contact group resource names.
   *
   */
  async contactGroupsBatchGet(opts: ContactGroupsBatchGetOptions = {}): Promise<BatchGetContactGroupsResponse> {
    opts = serializeContactGroupsBatchGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/contactGroups:batchGet`);
    if (opts.groupFields !== undefined) {
      url.searchParams.append("groupFields", String(opts.groupFields));
    }
    if (opts.maxMembers !== undefined) {
      url.searchParams.append("maxMembers", String(opts.maxMembers));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BatchGetContactGroupsResponse;
  }

  /**
   * Create a new contact group owned by the authenticated user. Created
   * contact group names must be unique to the users contact groups. Attempting
   * to create a group with a duplicate name will return a HTTP 409 error.
   * Mutate requests for the same user should be sent sequentially to avoid
   * increased latency and failures.
   *
   */
  async contactGroupsCreate(req: CreateContactGroupRequest): Promise<ContactGroup> {
    req = serializeCreateContactGroupRequest(req);
    const url = new URL(`${this.#baseUrl}v1/contactGroups`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ContactGroup;
  }

  /**
   * Delete an existing contact group owned by the authenticated user by
   * specifying a contact group resource name. Mutate requests for the same user
   * should be sent sequentially to avoid increased latency and failures.
   *
   * @param resourceName Required. The resource name of the contact group to delete.
   */
  async contactGroupsDelete(resourceName: string, opts: ContactGroupsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }`);
    if (opts.deleteContacts !== undefined) {
      url.searchParams.append("deleteContacts", String(opts.deleteContacts));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a specific contact group owned by the authenticated user by specifying
   * a contact group resource name.
   *
   * @param resourceName Required. The resource name of the contact group to get.
   */
  async contactGroupsGet(resourceName: string, opts: ContactGroupsGetOptions = {}): Promise<ContactGroup> {
    opts = serializeContactGroupsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }`);
    if (opts.groupFields !== undefined) {
      url.searchParams.append("groupFields", String(opts.groupFields));
    }
    if (opts.maxMembers !== undefined) {
      url.searchParams.append("maxMembers", String(opts.maxMembers));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ContactGroup;
  }

  /**
   * List all contact groups owned by the authenticated user. Members of the
   * contact groups are not populated.
   *
   */
  async contactGroupsList(opts: ContactGroupsListOptions = {}): Promise<ListContactGroupsResponse> {
    opts = serializeContactGroupsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/contactGroups`);
    if (opts.groupFields !== undefined) {
      url.searchParams.append("groupFields", String(opts.groupFields));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListContactGroupsResponse;
  }

  /**
   * Modify the members of a contact group owned by the authenticated user. The
   * only system contact groups that can have members added are
   * `contactGroups/myContacts` and `contactGroups/starred`. Other system
   * contact groups are deprecated and can only have contacts removed.
   *
   * @param resourceName Required. The resource name of the contact group to modify.
   */
  async contactGroupsMembersModify(resourceName: string, req: ModifyContactGroupMembersRequest): Promise<ModifyContactGroupMembersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }/members:modify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ModifyContactGroupMembersResponse;
  }

  /**
   * Update the name of an existing contact group owned by the authenticated
   * user. Updated contact group names must be unique to the users contact
   * groups. Attempting to create a group with a duplicate name will return a
   * HTTP 409 error. Mutate requests for the same user should be sent
   * sequentially to avoid increased latency and failures.
   *
   * @param resourceName The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`.
   */
  async contactGroupsUpdate(resourceName: string, req: UpdateContactGroupRequest): Promise<ContactGroup> {
    req = serializeUpdateContactGroupRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ContactGroup;
  }

  /**
   * Copies an "Other contact" to a new contact in the user's "myContacts"
   * group Mutate requests for the same user should be sent sequentially to
   * avoid increased latency and failures.
   *
   * @param resourceName Required. The resource name of the "Other contact" to copy.
   */
  async otherContactsCopyOtherContactToMyContactsGroup(resourceName: string, req: CopyOtherContactToMyContactsGroupRequest): Promise<Person> {
    req = serializeCopyOtherContactToMyContactsGroupRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }:copyOtherContactToMyContactsGroup`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Person;
  }

  /**
   * List all "Other contacts", that is contacts that are not in a contact
   * group. "Other contacts" are typically auto created contacts from
   * interactions. Sync tokens expire 7 days after the full sync. A request with
   * an expired sync token will get an error with an
   * [google.rpc.ErrorInfo](https://cloud.google.com/apis/design/errors#error_info)
   * with reason "EXPIRED_SYNC_TOKEN". In the case of such an error clients
   * should make a full sync request without a `sync_token`. The first page of a
   * full sync request has an additional quota. If the quota is exceeded, a 429
   * error will be returned. This quota is fixed and can not be increased. When
   * the `sync_token` is specified, resources deleted since the last sync will
   * be returned as a person with `PersonMetadata.deleted` set to true. When the
   * `page_token` or `sync_token` is specified, all other request parameters
   * must match the first call. Writes may have a propagation delay of several
   * minutes for sync requests. Incremental syncs are not intended for
   * read-after-write use cases. See example usage at [List the user's other
   * contacts that have
   * changed](/people/v1/other-contacts#list_the_users_other_contacts_that_have_changed).
   *
   */
  async otherContactsList(opts: OtherContactsListOptions = {}): Promise<ListOtherContactsResponse> {
    opts = serializeOtherContactsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/otherContacts`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    if (opts.requestSyncToken !== undefined) {
      url.searchParams.append("requestSyncToken", String(opts.requestSyncToken));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListOtherContactsResponse;
  }

  /**
   * Provides a list of contacts in the authenticated user's other contacts
   * that matches the search query. The query matches on a contact's `names`,
   * `emailAddresses`, and `phoneNumbers` fields that are from the OTHER_CONTACT
   * source. **IMPORTANT**: Before searching, clients should send a warmup
   * request with an empty query to update the cache. See
   * https://developers.google.com/people/v1/other-contacts#search_the_users_other_contacts
   *
   */
  async otherContactsSearch(opts: OtherContactsSearchOptions = {}): Promise<SearchResponse> {
    opts = serializeOtherContactsSearchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/otherContacts:search`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchResponse;
  }

  /**
   * Create a batch of new contacts and return the PersonResponses for the
   * newly Mutate requests for the same user should be sent sequentially to
   * avoid increased latency and failures.
   *
   */
  async peopleBatchCreateContacts(req: BatchCreateContactsRequest): Promise<BatchCreateContactsResponse> {
    req = serializeBatchCreateContactsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/people:batchCreateContacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchCreateContactsResponse;
  }

  /**
   * Delete a batch of contacts. Any non-contact data will not be deleted.
   * Mutate requests for the same user should be sent sequentially to avoid
   * increased latency and failures.
   *
   */
  async peopleBatchDeleteContacts(req: BatchDeleteContactsRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/people:batchDeleteContacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Update a batch of contacts and return a map of resource names to
   * PersonResponses for the updated contacts. Mutate requests for the same user
   * should be sent sequentially to avoid increased latency and failures.
   *
   */
  async peopleBatchUpdateContacts(req: BatchUpdateContactsRequest): Promise<BatchUpdateContactsResponse> {
    req = serializeBatchUpdateContactsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/people:batchUpdateContacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchUpdateContactsResponse;
  }

  /**
   * Provides a list of the authenticated user's contacts. Sync tokens expire 7
   * days after the full sync. A request with an expired sync token will get an
   * error with an
   * [google.rpc.ErrorInfo](https://cloud.google.com/apis/design/errors#error_info)
   * with reason "EXPIRED_SYNC_TOKEN". In the case of such an error clients
   * should make a full sync request without a `sync_token`. The first page of a
   * full sync request has an additional quota. If the quota is exceeded, a 429
   * error will be returned. This quota is fixed and can not be increased. When
   * the `sync_token` is specified, resources deleted since the last sync will
   * be returned as a person with `PersonMetadata.deleted` set to true. When the
   * `page_token` or `sync_token` is specified, all other request parameters
   * must match the first call. Writes may have a propagation delay of several
   * minutes for sync requests. Incremental syncs are not intended for
   * read-after-write use cases. See example usage at [List the user's contacts
   * that have
   * changed](/people/v1/contacts#list_the_users_contacts_that_have_changed).
   *
   * @param resourceName Required. The resource name to return connections for. Only `people/me` is valid.
   */
  async peopleConnectionsList(resourceName: string, opts: PeopleConnectionsListOptions = {}): Promise<ListConnectionsResponse> {
    opts = serializePeopleConnectionsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }/connections`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.personFields !== undefined) {
      url.searchParams.append("personFields", String(opts.personFields));
    }
    if (opts["requestMask.includeField"] !== undefined) {
      url.searchParams.append("requestMask.includeField", String(opts["requestMask.includeField"]));
    }
    if (opts.requestSyncToken !== undefined) {
      url.searchParams.append("requestSyncToken", String(opts.requestSyncToken));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListConnectionsResponse;
  }

  /**
   * Create a new contact and return the person resource for that contact. The
   * request returns a 400 error if more than one field is specified on a field
   * that is a singleton for contact sources: * biographies * birthdays *
   * genders * names Mutate requests for the same user should be sent
   * sequentially to avoid increased latency and failures.
   *
   */
  async peopleCreateContact(req: Person, opts: PeopleCreateContactOptions = {}): Promise<Person> {
    opts = serializePeopleCreateContactOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/people:createContact`);
    if (opts.personFields !== undefined) {
      url.searchParams.append("personFields", String(opts.personFields));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Person;
  }

  /**
   * Delete a contact person. Any non-contact data will not be deleted. Mutate
   * requests for the same user should be sent sequentially to avoid increased
   * latency and failures.
   *
   * @param resourceName Required. The resource name of the contact to delete.
   */
  async peopleDeleteContact(resourceName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }:deleteContact`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Delete a contact's photo. Mutate requests for the same user should be done
   * sequentially to avoid // lock contention.
   *
   * @param resourceName Required. The resource name of the contact whose photo will be deleted.
   */
  async peopleDeleteContactPhoto(resourceName: string, opts: PeopleDeleteContactPhotoOptions = {}): Promise<DeleteContactPhotoResponse> {
    opts = serializePeopleDeleteContactPhotoOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }:deleteContactPhoto`);
    if (opts.personFields !== undefined) {
      url.searchParams.append("personFields", String(opts.personFields));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as DeleteContactPhotoResponse;
  }

  /**
   * Provides information about a person by specifying a resource name. Use
   * `people/me` to indicate the authenticated user. The request returns a 400
   * error if 'personFields' is not specified.
   *
   * @param resourceName Required. The resource name of the person to provide information about. - To get information about the authenticated user, specify `people/me`. - To get information about a google account, specify `people/{account_id}`. - To get information about a contact, specify the resource name that identifies the contact as returned by `people.connections.list`.
   */
  async peopleGet(resourceName: string, opts: PeopleGetOptions = {}): Promise<Person> {
    opts = serializePeopleGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }`);
    if (opts.personFields !== undefined) {
      url.searchParams.append("personFields", String(opts.personFields));
    }
    if (opts["requestMask.includeField"] !== undefined) {
      url.searchParams.append("requestMask.includeField", String(opts["requestMask.includeField"]));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Person;
  }

  /**
   * Provides information about a list of specific people by specifying a list
   * of requested resource names. Use `people/me` to indicate the authenticated
   * user. The request returns a 400 error if 'personFields' is not specified.
   *
   */
  async peopleGetBatchGet(opts: PeopleGetBatchGetOptions = {}): Promise<GetPeopleResponse> {
    opts = serializePeopleGetBatchGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/people:batchGet`);
    if (opts.personFields !== undefined) {
      url.searchParams.append("personFields", String(opts.personFields));
    }
    if (opts["requestMask.includeField"] !== undefined) {
      url.searchParams.append("requestMask.includeField", String(opts["requestMask.includeField"]));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GetPeopleResponse;
  }

  /**
   * Provides a list of domain profiles and domain contacts in the
   * authenticated user's domain directory. When the `sync_token` is specified,
   * resources deleted since the last sync will be returned as a person with
   * `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token`
   * is specified, all other request parameters must match the first call.
   * Writes may have a propagation delay of several minutes for sync requests.
   * Incremental syncs are not intended for read-after-write use cases. See
   * example usage at [List the directory people that have
   * changed](/people/v1/directory#list_the_directory_people_that_have_changed).
   *
   */
  async peopleListDirectoryPeople(opts: PeopleListDirectoryPeopleOptions = {}): Promise<ListDirectoryPeopleResponse> {
    opts = serializePeopleListDirectoryPeopleOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/people:listDirectoryPeople`);
    if (opts.mergeSources !== undefined) {
      url.searchParams.append("mergeSources", String(opts.mergeSources));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    if (opts.requestSyncToken !== undefined) {
      url.searchParams.append("requestSyncToken", String(opts.requestSyncToken));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    if (opts.syncToken !== undefined) {
      url.searchParams.append("syncToken", String(opts.syncToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListDirectoryPeopleResponse;
  }

  /**
   * Provides a list of contacts in the authenticated user's grouped contacts
   * that matches the search query. The query matches on a contact's `names`,
   * `nickNames`, `emailAddresses`, `phoneNumbers`, and `organizations` fields
   * that are from the CONTACT source. **IMPORTANT**: Before searching, clients
   * should send a warmup request with an empty query to update the cache. See
   * https://developers.google.com/people/v1/contacts#search_the_users_contacts
   *
   */
  async peopleSearchContacts(opts: PeopleSearchContactsOptions = {}): Promise<SearchResponse> {
    opts = serializePeopleSearchContactsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/people:searchContacts`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchResponse;
  }

  /**
   * Provides a list of domain profiles and domain contacts in the
   * authenticated user's domain directory that match the search query.
   *
   */
  async peopleSearchDirectoryPeople(opts: PeopleSearchDirectoryPeopleOptions = {}): Promise<SearchDirectoryPeopleResponse> {
    opts = serializePeopleSearchDirectoryPeopleOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/people:searchDirectoryPeople`);
    if (opts.mergeSources !== undefined) {
      url.searchParams.append("mergeSources", String(opts.mergeSources));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchDirectoryPeopleResponse;
  }

  /**
   * Update contact data for an existing contact person. Any non-contact data
   * will not be modified. Any non-contact data in the person to update will be
   * ignored. All fields specified in the `update_mask` will be replaced. The
   * server returns a 400 error if `person.metadata.sources` is not specified
   * for the contact to be updated or if there is no contact source. The server
   * returns a 400 error with reason `"failedPrecondition"` if
   * `person.metadata.sources.etag` is different than the contact's etag, which
   * indicates the contact has changed since its data was read. Clients should
   * get the latest person and merge their updates into the latest person. The
   * server returns a 400 error if `memberships` are being updated and there are
   * no contact group memberships specified on the person. The server returns a
   * 400 error if more than one field is specified on a field that is a
   * singleton for contact sources: * biographies * birthdays * genders * names
   * Mutate requests for the same user should be sent sequentially to avoid
   * increased latency and failures.
   *
   * @param resourceName The resource name for the person, assigned by the server. An ASCII string in the form of `people/{person_id}`.
   */
  async peopleUpdateContact(resourceName: string, req: Person, opts: PeopleUpdateContactOptions = {}): Promise<Person> {
    opts = serializePeopleUpdateContactOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }:updateContact`);
    if (opts.personFields !== undefined) {
      url.searchParams.append("personFields", String(opts.personFields));
    }
    if (opts.sources !== undefined) {
      url.searchParams.append("sources", String(opts.sources));
    }
    if (opts.updatePersonFields !== undefined) {
      url.searchParams.append("updatePersonFields", String(opts.updatePersonFields));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Person;
  }

  /**
   * Update a contact's photo. Mutate requests for the same user should be sent
   * sequentially to avoid increased latency and failures.
   *
   * @param resourceName Required. Person resource name
   */
  async peopleUpdateContactPhoto(resourceName: string, req: UpdateContactPhotoRequest): Promise<UpdateContactPhotoResponse> {
    req = serializeUpdateContactPhotoRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }:updateContactPhoto`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as UpdateContactPhotoResponse;
  }
}

/**
 * A person's physical address. May be a P.O. box or street address. All fields
 * are optional.
 */
export interface Address {
  /**
   * The city of the address.
   */
  city?: string;
  /**
   * The country of the address.
   */
  country?: string;
  /**
   * The [ISO 3166-1 alpha-2](http://www.iso.org/iso/country_codes.htm) country
   * code of the address.
   */
  countryCode?: string;
  /**
   * The extended address of the address; for example, the apartment number.
   */
  extendedAddress?: string;
  /**
   * Output only. The type of the address translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * The unstructured value of the address. If this is not set by the user it
   * will be automatically constructed from structured values.
   */
  formattedValue?: string;
  /**
   * Metadata about the address.
   */
  metadata?: FieldMetadata;
  /**
   * The P.O. box of the address.
   */
  poBox?: string;
  /**
   * The postal code of the address.
   */
  postalCode?: string;
  /**
   * The region of the address; for example, the state or province.
   */
  region?: string;
  /**
   * The street address.
   */
  streetAddress?: string;
  /**
   * The type of the address. The type can be custom or one of these predefined
   * values: * `home` * `work` * `other`
   */
  type?: string;
}

/**
 * A person's age range.
 */
export interface AgeRangeType {
  /**
   * The age range.
   */
  ageRange?:  | "AGE_RANGE_UNSPECIFIED" | "LESS_THAN_EIGHTEEN" | "EIGHTEEN_TO_TWENTY" | "TWENTY_ONE_OR_OLDER";
  /**
   * Metadata about the age range.
   */
  metadata?: FieldMetadata;
}

/**
 * A request to create a batch of contacts.
 */
export interface BatchCreateContactsRequest {
  /**
   * Required. The contact to create. Allows up to 200 contacts in a single
   * request.
   */
  contacts?: ContactToCreate[];
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned in the response. Multiple fields can be specified by separating
   * them with commas. If read mask is left empty, the post-mutate-get is
   * skipped and no data will be returned in the response. Valid values are: *
   * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData
   * * coverPhotos * emailAddresses * events * externalIds * genders * imClients
   * * interests * locales * locations * memberships * metadata * miscKeywords *
   * names * nicknames * occupations * organizations * phoneNumbers * photos *
   * relations * sipAddresses * skills * urls * userDefined
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return in the post mutate read.
   * Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not
   * set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT"[];
}

function serializeBatchCreateContactsRequest(data: any): BatchCreateContactsRequest {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeBatchCreateContactsRequest(data: any): BatchCreateContactsRequest {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * If not successful, returns BatchCreateContactsErrorDetails which contains a
 * list of errors for each invalid contact. The response to a request to create
 * a batch of contacts.
 */
export interface BatchCreateContactsResponse {
  /**
   * The contacts that were created, unless the request `read_mask` is empty.
   */
  createdPeople?: PersonResponse[];
}

/**
 * A request to delete a batch of existing contacts.
 */
export interface BatchDeleteContactsRequest {
  /**
   * Required. The resource names of the contact to delete. It's repeatable.
   * Allows up to 500 resource names in a single request.
   */
  resourceNames?: string[];
}

/**
 * The response to a batch get contact groups request.
 */
export interface BatchGetContactGroupsResponse {
  /**
   * The list of responses for each requested contact group resource.
   */
  responses?: ContactGroupResponse[];
}

/**
 * A request to update a batch of contacts.
 */
export interface BatchUpdateContactsRequest {
  /**
   * Required. A map of resource names to the person data to be updated. Allows
   * up to 200 contacts in a single request.
   */
  contacts?: {
    [key: string]: Person
  };
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * If read mask is left empty, the post-mutate-get is skipped and no data will
   * be returned in the response. Valid values are: * addresses * ageRanges *
   * biographies * birthdays * calendarUrls * clientData * coverPhotos *
   * emailAddresses * events * externalIds * genders * imClients * interests *
   * locales * locations * memberships * metadata * miscKeywords * names *
   * nicknames * occupations * organizations * phoneNumbers * photos * relations
   * * sipAddresses * skills * urls * userDefined
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT"[];
  /**
   * Required. A field mask to restrict which fields on the person are updated.
   * Multiple fields can be specified by separating them with commas. All
   * specified fields will be replaced, or cleared if left empty for each
   * person. Valid values are: * addresses * biographies * birthdays *
   * calendarUrls * clientData * emailAddresses * events * externalIds * genders
   * * imClients * interests * locales * locations * memberships * miscKeywords
   * * names * nicknames * occupations * organizations * phoneNumbers *
   * relations * sipAddresses * urls * userDefined
   */
  updateMask?: string /* FieldMask */;
}

function serializeBatchUpdateContactsRequest(data: any): BatchUpdateContactsRequest {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBatchUpdateContactsRequest(data: any): BatchUpdateContactsRequest {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * If not successful, returns BatchUpdateContactsErrorDetails, a list of errors
 * corresponding to each contact. The response to a request to update a batch of
 * contacts.
 */
export interface BatchUpdateContactsResponse {
  /**
   * A map of resource names to the contacts that were updated, unless the
   * request `read_mask` is empty.
   */
  updateResult?: {
    [key: string]: PersonResponse
  };
}

/**
 * A person's short biography.
 */
export interface Biography {
  /**
   * The content type of the biography.
   */
  contentType?:  | "CONTENT_TYPE_UNSPECIFIED" | "TEXT_PLAIN" | "TEXT_HTML";
  /**
   * Metadata about the biography.
   */
  metadata?: FieldMetadata;
  /**
   * The short biography.
   */
  value?: string;
}

/**
 * A person's birthday. At least one of the `date` and `text` fields are
 * specified. The `date` and `text` fields typically represent the same date,
 * but are not guaranteed to. Clients should always set the `date` field when
 * mutating birthdays.
 */
export interface Birthday {
  /**
   * The structured date of the birthday.
   */
  date?: Date;
  /**
   * Metadata about the birthday.
   */
  metadata?: FieldMetadata;
  /**
   * Prefer to use the `date` field if set. A free-form string representing the
   * user's birthday. This value is not validated.
   */
  text?: string;
}

/**
 * **DEPRECATED**: No data will be returned A person's bragging rights.
 */
export interface BraggingRights {
  /**
   * Metadata about the bragging rights.
   */
  metadata?: FieldMetadata;
  /**
   * The bragging rights; for example, `climbed mount everest`.
   */
  value?: string;
}

/**
 * A person's calendar URL.
 */
export interface CalendarUrl {
  /**
   * Output only. The type of the calendar URL translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the calendar URL.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the calendar URL. The type can be custom or one of these
   * predefined values: * `home` * `freeBusy` * `work`
   */
  type?: string;
  /**
   * The calendar URL.
   */
  url?: string;
}

/**
 * Arbitrary client data that is populated by clients. Duplicate keys and
 * values are allowed.
 */
export interface ClientData {
  /**
   * The client specified key of the client data.
   */
  key?: string;
  /**
   * Metadata about the client data.
   */
  metadata?: FieldMetadata;
  /**
   * The client specified value of the client data.
   */
  value?: string;
}

/**
 * A contact group.
 */
export interface ContactGroup {
  /**
   * The group's client data.
   */
  clientData?: GroupClientData[];
  /**
   * The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the
   * resource. Used for web cache validation.
   */
  etag?: string;
  /**
   * Output only. The name translated and formatted in the viewer's account
   * locale or the `Accept-Language` HTTP header locale for system groups names.
   * Group names set by the owner are the same as name.
   */
  readonly formattedName?: string;
  /**
   * Output only. The contact group type.
   */
  readonly groupType?:  | "GROUP_TYPE_UNSPECIFIED" | "USER_CONTACT_GROUP" | "SYSTEM_CONTACT_GROUP";
  /**
   * Output only. The total number of contacts in the group irrespective of max
   * members in specified in the request.
   */
  readonly memberCount?: number;
  /**
   * Output only. The list of contact person resource names that are members of
   * the contact group. The field is only populated for GET requests and will
   * only return as many members as `maxMembers` in the get request.
   */
  readonly memberResourceNames?: string[];
  /**
   * Output only. Metadata about the contact group.
   */
  readonly metadata?: ContactGroupMetadata;
  /**
   * The contact group name set by the group owner or a system provided name
   * for system groups. For
   * [`contactGroups.create`](/people/api/rest/v1/contactGroups/create) or
   * [`contactGroups.update`](/people/api/rest/v1/contactGroups/update) the name
   * must be unique to the users contact groups. Attempting to create a group
   * with a duplicate name will return a HTTP 409 error.
   */
  name?: string;
  /**
   * The resource name for the contact group, assigned by the server. An ASCII
   * string, in the form of `contactGroups/{contact_group_id}`.
   */
  resourceName?: string;
}

/**
 * A Google contact group membership.
 */
export interface ContactGroupMembership {
  /**
   * Output only. The contact group ID for the contact group membership.
   */
  readonly contactGroupId?: string;
  /**
   * The resource name for the contact group, assigned by the server. An ASCII
   * string, in the form of `contactGroups/{contact_group_id}`. Only
   * contact_group_resource_name can be used for modifying memberships. Any
   * contact group membership can be removed, but only user group or
   * "myContacts" or "starred" system groups memberships can be added. A contact
   * must always have at least one contact group membership.
   */
  contactGroupResourceName?: string;
}

/**
 * The metadata about a contact group.
 */
export interface ContactGroupMetadata {
  /**
   * Output only. True if the contact group resource has been deleted.
   * Populated only for
   * [`ListContactGroups`](/people/api/rest/v1/contactgroups/list) requests that
   * include a sync token.
   */
  readonly deleted?: boolean;
  /**
   * Output only. The time the group was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * The response for a specific contact group.
 */
export interface ContactGroupResponse {
  /**
   * The contact group.
   */
  contactGroup?: ContactGroup;
  /**
   * The original requested resource name.
   */
  requestedResourceName?: string;
  /**
   * The status of the response.
   */
  status?: Status;
}

/**
 * Additional options for People#contactGroupsBatchGet.
 */
export interface ContactGroupsBatchGetOptions {
  /**
   * Optional. A field mask to restrict which fields on the group are returned.
   * Defaults to `metadata`, `groupType`, `memberCount`, and `name` if not set
   * or set to empty. Valid fields are: * clientData * groupType * memberCount *
   * metadata * name
   */
  groupFields?: string /* FieldMask */;
  /**
   * Optional. Specifies the maximum number of members to return for each
   * group. Defaults to 0 if not set, which will return zero members.
   */
  maxMembers?: number;
  /**
   * Required. The resource names of the contact groups to get. There is a
   * maximum of 200 resource names.
   */
  resourceNames?: string;
}

function serializeContactGroupsBatchGetOptions(data: any): ContactGroupsBatchGetOptions {
  return {
    ...data,
    groupFields: data["groupFields"] !== undefined ? data["groupFields"] : undefined,
  };
}

function deserializeContactGroupsBatchGetOptions(data: any): ContactGroupsBatchGetOptions {
  return {
    ...data,
    groupFields: data["groupFields"] !== undefined ? data["groupFields"] : undefined,
  };
}

/**
 * Additional options for People#contactGroupsDelete.
 */
export interface ContactGroupsDeleteOptions {
  /**
   * Optional. Set to true to also delete the contacts in the specified group.
   */
  deleteContacts?: boolean;
}

/**
 * Additional options for People#contactGroupsGet.
 */
export interface ContactGroupsGetOptions {
  /**
   * Optional. A field mask to restrict which fields on the group are returned.
   * Defaults to `metadata`, `groupType`, `memberCount`, and `name` if not set
   * or set to empty. Valid fields are: * clientData * groupType * memberCount *
   * metadata * name
   */
  groupFields?: string /* FieldMask */;
  /**
   * Optional. Specifies the maximum number of members to return. Defaults to 0
   * if not set, which will return zero members.
   */
  maxMembers?: number;
}

function serializeContactGroupsGetOptions(data: any): ContactGroupsGetOptions {
  return {
    ...data,
    groupFields: data["groupFields"] !== undefined ? data["groupFields"] : undefined,
  };
}

function deserializeContactGroupsGetOptions(data: any): ContactGroupsGetOptions {
  return {
    ...data,
    groupFields: data["groupFields"] !== undefined ? data["groupFields"] : undefined,
  };
}

/**
 * Additional options for People#contactGroupsList.
 */
export interface ContactGroupsListOptions {
  /**
   * Optional. A field mask to restrict which fields on the group are returned.
   * Defaults to `metadata`, `groupType`, `memberCount`, and `name` if not set
   * or set to empty. Valid fields are: * clientData * groupType * memberCount *
   * metadata * name
   */
  groupFields?: string /* FieldMask */;
  /**
   * Optional. The maximum number of resources to return. Valid values are
   * between 1 and 1000, inclusive. Defaults to 30 if not set or set to 0.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous call to
   * [ListContactGroups](/people/api/rest/v1/contactgroups/list). Requests the
   * next page of resources.
   */
  pageToken?: string;
  /**
   * Optional. A sync token, returned by a previous call to
   * `contactgroups.list`. Only resources changed since the sync token was
   * created will be returned.
   */
  syncToken?: string;
}

function serializeContactGroupsListOptions(data: any): ContactGroupsListOptions {
  return {
    ...data,
    groupFields: data["groupFields"] !== undefined ? data["groupFields"] : undefined,
  };
}

function deserializeContactGroupsListOptions(data: any): ContactGroupsListOptions {
  return {
    ...data,
    groupFields: data["groupFields"] !== undefined ? data["groupFields"] : undefined,
  };
}

/**
 * A wrapper that contains the person data to populate a newly created source.
 */
export interface ContactToCreate {
  /**
   * Required. The person data to populate a newly created source.
   */
  contactPerson?: Person;
}

/**
 * A request to copy an "Other contact" to my contacts group.
 */
export interface CopyOtherContactToMyContactsGroupRequest {
  /**
   * Required. A field mask to restrict which fields are copied into the new
   * contact. Valid values are: * emailAddresses * names * phoneNumbers
   */
  copyMask?: string /* FieldMask */;
  /**
   * Optional. A field mask to restrict which fields on the person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Defaults to the copy mask with metadata and membership fields if not set.
   * Valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT"[];
}

function serializeCopyOtherContactToMyContactsGroupRequest(data: any): CopyOtherContactToMyContactsGroupRequest {
  return {
    ...data,
    copyMask: data["copyMask"] !== undefined ? data["copyMask"] : undefined,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeCopyOtherContactToMyContactsGroupRequest(data: any): CopyOtherContactToMyContactsGroupRequest {
  return {
    ...data,
    copyMask: data["copyMask"] !== undefined ? data["copyMask"] : undefined,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * A person's cover photo. A large image shown on the person's profile page
 * that represents who they are or what they care about.
 */
export interface CoverPhoto {
  /**
   * True if the cover photo is the default cover photo; false if the cover
   * photo is a user-provided cover photo.
   */
  default?: boolean;
  /**
   * Metadata about the cover photo.
   */
  metadata?: FieldMetadata;
  /**
   * The URL of the cover photo.
   */
  url?: string;
}

/**
 * A request to create a new contact group.
 */
export interface CreateContactGroupRequest {
  /**
   * Required. The contact group to create.
   */
  contactGroup?: ContactGroup;
  /**
   * Optional. A field mask to restrict which fields on the group are returned.
   * Defaults to `metadata`, `groupType`, and `name` if not set or set to empty.
   * Valid fields are: * clientData * groupType * metadata * name
   */
  readGroupFields?: string /* FieldMask */;
}

function serializeCreateContactGroupRequest(data: any): CreateContactGroupRequest {
  return {
    ...data,
    readGroupFields: data["readGroupFields"] !== undefined ? data["readGroupFields"] : undefined,
  };
}

function deserializeCreateContactGroupRequest(data: any): CreateContactGroupRequest {
  return {
    ...data,
    readGroupFields: data["readGroupFields"] !== undefined ? data["readGroupFields"] : undefined,
  };
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface Date {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
}

/**
 * The response for deleting a contact's photo.
 */
export interface DeleteContactPhotoResponse {
  /**
   * The updated person, if person_fields is set in the
   * DeleteContactPhotoRequest; otherwise this will be unset.
   */
  person?: Person;
}

/**
 * A Google Workspace Domain membership.
 */
export interface DomainMembership {
  /**
   * True if the person is in the viewer's Google Workspace domain.
   */
  inViewerDomain?: boolean;
}

/**
 * A person's email address.
 */
export interface EmailAddress {
  /**
   * The display name of the email.
   */
  displayName?: string;
  /**
   * Output only. The type of the email address translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the email address.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the email address. The type can be custom or one of these
   * predefined values: * `home` * `work` * `other`
   */
  type?: string;
  /**
   * The email address.
   */
  value?: string;
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
 * An event related to the person.
 */
export interface Event {
  /**
   * The date of the event.
   */
  date?: Date;
  /**
   * Output only. The type of the event translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the event.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the event. The type can be custom or one of these predefined
   * values: * `anniversary` * `other`
   */
  type?: string;
}

/**
 * An identifier from an external entity related to the person.
 */
export interface ExternalId {
  /**
   * Output only. The type of the event translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the external ID.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the external ID. The type can be custom or one of these
   * predefined values: * `account` * `customer` * `loginId` * `network` *
   * `organization`
   */
  type?: string;
  /**
   * The value of the external ID.
   */
  value?: string;
}

/**
 * Metadata about a field.
 */
export interface FieldMetadata {
  /**
   * Output only. True if the field is the primary field for all sources in the
   * person. Each person will have at most one field with `primary` set to true.
   */
  readonly primary?: boolean;
  /**
   * The source of the field.
   */
  source?: Source;
  /**
   * True if the field is the primary field for the source. Each source must
   * have at most one field with `source_primary` set to true.
   */
  sourcePrimary?: boolean;
  /**
   * Output only. True if the field is verified; false if the field is
   * unverified. A verified field is typically a name, email address, phone
   * number, or website that has been confirmed to be owned by the person.
   */
  readonly verified?: boolean;
}

/**
 * The name that should be used to sort the person in a list.
 */
export interface FileAs {
  /**
   * Metadata about the file-as.
   */
  metadata?: FieldMetadata;
  /**
   * The file-as value
   */
  value?: string;
}

/**
 * A person's gender.
 */
export interface Gender {
  /**
   * Free form text field for pronouns that should be used to address the
   * person. Common values are: * `he`/`him` * `she`/`her` * `they`/`them`
   */
  addressMeAs?: string;
  /**
   * Output only. The value of the gender translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   * Unspecified or custom value are not localized.
   */
  readonly formattedValue?: string;
  /**
   * Metadata about the gender.
   */
  metadata?: FieldMetadata;
  /**
   * The gender for the person. The gender can be custom or one of these
   * predefined values: * `male` * `female` * `unspecified`
   */
  value?: string;
}

/**
 * The response to a get request for a list of people by resource name.
 */
export interface GetPeopleResponse {
  /**
   * The response for each requested resource name.
   */
  responses?: PersonResponse[];
}

/**
 * Arbitrary client data that is populated by clients. Duplicate keys and
 * values are allowed.
 */
export interface GroupClientData {
  /**
   * The client specified key of the client data.
   */
  key?: string;
  /**
   * The client specified value of the client data.
   */
  value?: string;
}

/**
 * A person's instant messaging client.
 */
export interface ImClient {
  /**
   * Output only. The protocol of the IM client formatted in the viewer's
   * account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedProtocol?: string;
  /**
   * Output only. The type of the IM client translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the IM client.
   */
  metadata?: FieldMetadata;
  /**
   * The protocol of the IM client. The protocol can be custom or one of these
   * predefined values: * `aim` * `msn` * `yahoo` * `skype` * `qq` *
   * `googleTalk` * `icq` * `jabber` * `netMeeting`
   */
  protocol?: string;
  /**
   * The type of the IM client. The type can be custom or one of these
   * predefined values: * `home` * `work` * `other`
   */
  type?: string;
  /**
   * The user name used in the IM client.
   */
  username?: string;
}

/**
 * One of the person's interests.
 */
export interface Interest {
  /**
   * Metadata about the interest.
   */
  metadata?: FieldMetadata;
  /**
   * The interest; for example, `stargazing`.
   */
  value?: string;
}

/**
 * The response to a request for the authenticated user's connections.
 */
export interface ListConnectionsResponse {
  /**
   * The list of people that the requestor is connected to.
   */
  connections?: Person[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * A token, which can be sent as `sync_token` to retrieve changes since the
   * last request. Request must set `request_sync_token` to return the sync
   * token. When the response is paginated, only the last page will contain
   * `nextSyncToken`.
   */
  nextSyncToken?: string;
  /**
   * The total number of items in the list without pagination.
   */
  totalItems?: number;
  /**
   * **DEPRECATED** (Please use totalItems) The total number of people in the
   * list without pagination.
   */
  totalPeople?: number;
}

/**
 * The response to a list contact groups request.
 */
export interface ListContactGroupsResponse {
  /**
   * The list of contact groups. Members of the contact groups are not
   * populated.
   */
  contactGroups?: ContactGroup[];
  /**
   * The token that can be used to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The token that can be used to retrieve changes since the last request.
   */
  nextSyncToken?: string;
  /**
   * The total number of items in the list without pagination.
   */
  totalItems?: number;
}

/**
 * The response to a request for the authenticated user's domain directory.
 */
export interface ListDirectoryPeopleResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * A token, which can be sent as `sync_token` to retrieve changes since the
   * last request. Request must set `request_sync_token` to return the sync
   * token.
   */
  nextSyncToken?: string;
  /**
   * The list of people in the domain directory.
   */
  people?: Person[];
}

/**
 * The response to a request for the authenticated user's "Other contacts".
 */
export interface ListOtherContactsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * A token, which can be sent as `sync_token` to retrieve changes since the
   * last request. Request must set `request_sync_token` to return the sync
   * token.
   */
  nextSyncToken?: string;
  /**
   * The list of "Other contacts" returned as Person resources. "Other
   * contacts" support a limited subset of fields. See
   * ListOtherContactsRequest.request_mask for more detailed information.
   */
  otherContacts?: Person[];
  /**
   * The total number of other contacts in the list without pagination.
   */
  totalSize?: number;
}

/**
 * A person's locale preference.
 */
export interface Locale {
  /**
   * Metadata about the locale.
   */
  metadata?: FieldMetadata;
  /**
   * The well-formed [IETF BCP 47](https://tools.ietf.org/html/bcp47) language
   * tag representing the locale.
   */
  value?: string;
}

/**
 * A person's location.
 */
export interface Location {
  /**
   * The building identifier.
   */
  buildingId?: string;
  /**
   * Whether the location is the current location.
   */
  current?: boolean;
  /**
   * The individual desk location.
   */
  deskCode?: string;
  /**
   * The floor name or number.
   */
  floor?: string;
  /**
   * The floor section in `floor_name`.
   */
  floorSection?: string;
  /**
   * Metadata about the location.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the location. The type can be custom or one of these
   * predefined values: * `desk` * `grewUp`
   */
  type?: string;
  /**
   * The free-form value of the location.
   */
  value?: string;
}

/**
 * A person's membership in a group. Only contact group memberships can be
 * modified.
 */
export interface Membership {
  /**
   * The contact group membership.
   */
  contactGroupMembership?: ContactGroupMembership;
  /**
   * Output only. The domain membership.
   */
  readonly domainMembership?: DomainMembership;
  /**
   * Metadata about the membership.
   */
  metadata?: FieldMetadata;
}

/**
 * A person's miscellaneous keyword.
 */
export interface MiscKeyword {
  /**
   * Output only. The type of the miscellaneous keyword translated and
   * formatted in the viewer's account locale or the `Accept-Language` HTTP
   * header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the miscellaneous keyword.
   */
  metadata?: FieldMetadata;
  /**
   * The miscellaneous keyword type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "OUTLOOK_BILLING_INFORMATION" | "OUTLOOK_DIRECTORY_SERVER" | "OUTLOOK_KEYWORD" | "OUTLOOK_MILEAGE" | "OUTLOOK_PRIORITY" | "OUTLOOK_SENSITIVITY" | "OUTLOOK_SUBJECT" | "OUTLOOK_USER" | "HOME" | "WORK" | "OTHER";
  /**
   * The value of the miscellaneous keyword.
   */
  value?: string;
}

/**
 * A request to modify an existing contact group's members. Contacts can be
 * removed from any group but they can only be added to a user group or
 * "myContacts" or "starred" system groups.
 */
export interface ModifyContactGroupMembersRequest {
  /**
   * Optional. The resource names of the contact people to add in the form of
   * `people/{person_id}`. The total number of resource names in
   * `resource_names_to_add` and `resource_names_to_remove` must be less than or
   * equal to 1000.
   */
  resourceNamesToAdd?: string[];
  /**
   * Optional. The resource names of the contact people to remove in the form
   * of `people/{person_id}`. The total number of resource names in
   * `resource_names_to_add` and `resource_names_to_remove` must be less than or
   * equal to 1000.
   */
  resourceNamesToRemove?: string[];
}

/**
 * The response to a modify contact group members request.
 */
export interface ModifyContactGroupMembersResponse {
  /**
   * The contact people resource names that cannot be removed from their last
   * contact group.
   */
  canNotRemoveLastContactGroupResourceNames?: string[];
  /**
   * The contact people resource names that were not found.
   */
  notFoundResourceNames?: string[];
}

/**
 * A person's name. If the name is a mononym, the family name is empty.
 */
export interface Name {
  /**
   * Output only. The display name formatted according to the locale specified
   * by the viewer's account or the `Accept-Language` HTTP header.
   */
  readonly displayName?: string;
  /**
   * Output only. The display name with the last name first formatted according
   * to the locale specified by the viewer's account or the `Accept-Language`
   * HTTP header.
   */
  readonly displayNameLastFirst?: string;
  /**
   * The family name.
   */
  familyName?: string;
  /**
   * The given name.
   */
  givenName?: string;
  /**
   * The honorific prefixes, such as `Mrs.` or `Dr.`
   */
  honorificPrefix?: string;
  /**
   * The honorific suffixes, such as `Jr.`
   */
  honorificSuffix?: string;
  /**
   * Metadata about the name.
   */
  metadata?: FieldMetadata;
  /**
   * The middle name(s).
   */
  middleName?: string;
  /**
   * The family name spelled as it sounds.
   */
  phoneticFamilyName?: string;
  /**
   * The full name spelled as it sounds.
   */
  phoneticFullName?: string;
  /**
   * The given name spelled as it sounds.
   */
  phoneticGivenName?: string;
  /**
   * The honorific prefixes spelled as they sound.
   */
  phoneticHonorificPrefix?: string;
  /**
   * The honorific suffixes spelled as they sound.
   */
  phoneticHonorificSuffix?: string;
  /**
   * The middle name(s) spelled as they sound.
   */
  phoneticMiddleName?: string;
  /**
   * The free form name value.
   */
  unstructuredName?: string;
}

/**
 * A person's nickname.
 */
export interface Nickname {
  /**
   * Metadata about the nickname.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the nickname.
   */
  type?:  | "DEFAULT" | "MAIDEN_NAME" | "INITIALS" | "GPLUS" | "OTHER_NAME" | "ALTERNATE_NAME" | "SHORT_NAME";
  /**
   * The nickname.
   */
  value?: string;
}

/**
 * A person's occupation.
 */
export interface Occupation {
  /**
   * Metadata about the occupation.
   */
  metadata?: FieldMetadata;
  /**
   * The occupation; for example, `carpenter`.
   */
  value?: string;
}

/**
 * A person's past or current organization. Overlapping date ranges are
 * permitted.
 */
export interface Organization {
  /**
   * The person's cost center at the organization.
   */
  costCenter?: string;
  /**
   * True if the organization is the person's current organization; false if
   * the organization is a past organization.
   */
  current?: boolean;
  /**
   * The person's department at the organization.
   */
  department?: string;
  /**
   * The domain name associated with the organization; for example,
   * `google.com`.
   */
  domain?: string;
  /**
   * The end date when the person left the organization.
   */
  endDate?: Date;
  /**
   * Output only. The type of the organization translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * The person's full-time equivalent millipercent within the organization
   * (100000 = 100%).
   */
  fullTimeEquivalentMillipercent?: number;
  /**
   * The person's job description at the organization.
   */
  jobDescription?: string;
  /**
   * The location of the organization office the person works at.
   */
  location?: string;
  /**
   * Metadata about the organization.
   */
  metadata?: FieldMetadata;
  /**
   * The name of the organization.
   */
  name?: string;
  /**
   * The phonetic name of the organization.
   */
  phoneticName?: string;
  /**
   * The start date when the person joined the organization.
   */
  startDate?: Date;
  /**
   * The symbol associated with the organization; for example, a stock ticker
   * symbol, abbreviation, or acronym.
   */
  symbol?: string;
  /**
   * The person's job title at the organization.
   */
  title?: string;
  /**
   * The type of the organization. The type can be custom or one of these
   * predefined values: * `work` * `school`
   */
  type?: string;
}

/**
 * Additional options for People#otherContactsList.
 */
export interface OtherContactsListOptions {
  /**
   * Optional. The number of "Other contacts" to include in the response. Valid
   * values are between 1 and 1000, inclusive. Defaults to 100 if not set or set
   * to 0.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous response
   * `next_page_token`. Provide this to retrieve the subsequent page. When
   * paginating, all other parameters provided to `otherContacts.list` must
   * match the first call that provided the page token.
   */
  pageToken?: string;
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * What values are valid depend on what ReadSourceType is used. If
   * READ_SOURCE_TYPE_CONTACT is used, valid values are: * emailAddresses *
   * metadata * names * phoneNumbers * photos If READ_SOURCE_TYPE_PROFILE is
   * used, valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. Whether the response should return `next_sync_token` on the last
   * page of results. It can be used to get incremental changes since the last
   * request by setting it on the request `sync_token`. More details about sync
   * behavior at `otherContacts.list`.
   */
  requestSyncToken?: boolean;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT if not set. Possible values for this field are: *
   * READ_SOURCE_TYPE_CONTACT *
   * READ_SOURCE_TYPE_CONTACT,READ_SOURCE_TYPE_PROFILE Specifying
   * READ_SOURCE_TYPE_PROFILE without specifying READ_SOURCE_TYPE_CONTACT is not
   * permitted.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
  /**
   * Optional. A sync token, received from a previous response
   * `next_sync_token` Provide this to retrieve only the resources changed since
   * the last request. When syncing, all other parameters provided to
   * `otherContacts.list` must match the first call that provided the sync
   * token. More details about sync behavior at `otherContacts.list`.
   */
  syncToken?: string;
}

function serializeOtherContactsListOptions(data: any): OtherContactsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeOtherContactsListOptions(data: any): OtherContactsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for People#otherContactsSearch.
 */
export interface OtherContactsSearchOptions {
  /**
   * Optional. The number of results to return. Defaults to 10 if field is not
   * set, or set to 0. Values greater than 30 will be capped to 30.
   */
  pageSize?: number;
  /**
   * Required. The plain-text query for the request. The query is used to match
   * prefix phrases of the fields on a person. For example, a person with name
   * "foo name" matches queries such as "f", "fo", "foo", "foo n", "nam", etc.,
   * but not "oo n".
   */
  query?: string;
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Valid values are: * emailAddresses * metadata * names * phoneNumbers
   */
  readMask?: string /* FieldMask */;
}

function serializeOtherContactsSearchOptions(data: any): OtherContactsSearchOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeOtherContactsSearchOptions(data: any): OtherContactsSearchOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for People#peopleConnectionsList.
 */
export interface PeopleConnectionsListOptions {
  /**
   * Optional. The number of connections to include in the response. Valid
   * values are between 1 and 1000, inclusive. Defaults to 100 if not set or set
   * to 0.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous response
   * `next_page_token`. Provide this to retrieve the subsequent page. When
   * paginating, all other parameters provided to `people.connections.list` must
   * match the first call that provided the page token.
   */
  pageToken?: string;
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  personFields?: string /* FieldMask */;
  /**
   * Required. Comma-separated list of person fields to be included in the
   * response. Each path should start with `person.`: for example,
   * `person.names` or `person.photos`.
   */
  ["requestMask.includeField"]?: string /* FieldMask */;
  /**
   * Optional. Whether the response should return `next_sync_token` on the last
   * page of results. It can be used to get incremental changes since the last
   * request by setting it on the request `sync_token`. More details about sync
   * behavior at `people.connections.list`.
   */
  requestSyncToken?: boolean;
  /**
   * Optional. The order in which the connections should be sorted. Defaults to
   * `LAST_MODIFIED_ASCENDING`.
   */
  sortOrder?:  | "LAST_MODIFIED_ASCENDING" | "LAST_MODIFIED_DESCENDING" | "FIRST_NAME_ASCENDING" | "LAST_NAME_ASCENDING";
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
  /**
   * Optional. A sync token, received from a previous response
   * `next_sync_token` Provide this to retrieve only the resources changed since
   * the last request. When syncing, all other parameters provided to
   * `people.connections.list` must match the first call that provided the sync
   * token. More details about sync behavior at `people.connections.list`.
   */
  syncToken?: string;
}

function serializePeopleConnectionsListOptions(data: any): PeopleConnectionsListOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    ["requestMask.includeField"]: data["requestMask.includeField"] !== undefined ? data["requestMask.includeField"] : undefined,
  };
}

function deserializePeopleConnectionsListOptions(data: any): PeopleConnectionsListOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    ["requestMask.includeField"]: data["requestMask.includeField"] !== undefined ? data["requestMask.includeField"] : undefined,
  };
}

/**
 * Additional options for People#peopleCreateContact.
 */
export interface PeopleCreateContactOptions {
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Defaults to all fields if not set. Valid values are: * addresses *
   * ageRanges * biographies * birthdays * calendarUrls * clientData *
   * coverPhotos * emailAddresses * events * externalIds * genders * imClients *
   * interests * locales * locations * memberships * metadata * miscKeywords *
   * names * nicknames * occupations * organizations * phoneNumbers * photos *
   * relations * sipAddresses * skills * urls * userDefined
   */
  personFields?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
}

function serializePeopleCreateContactOptions(data: any): PeopleCreateContactOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
  };
}

function deserializePeopleCreateContactOptions(data: any): PeopleCreateContactOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
  };
}

/**
 * Additional options for People#peopleDeleteContactPhoto.
 */
export interface PeopleDeleteContactPhotoOptions {
  /**
   * Optional. A field mask to restrict which fields on the person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Defaults to empty if not set, which will skip the post mutate get. Valid
   * values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  personFields?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
}

function serializePeopleDeleteContactPhotoOptions(data: any): PeopleDeleteContactPhotoOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
  };
}

function deserializePeopleDeleteContactPhotoOptions(data: any): PeopleDeleteContactPhotoOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
  };
}

/**
 * Additional options for People#peopleGetBatchGet.
 */
export interface PeopleGetBatchGetOptions {
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  personFields?: string /* FieldMask */;
  /**
   * Required. Comma-separated list of person fields to be included in the
   * response. Each path should start with `person.`: for example,
   * `person.names` or `person.photos`.
   */
  ["requestMask.includeField"]?: string /* FieldMask */;
  /**
   * Required. The resource names of the people to provide information about.
   * It's repeatable. The URL query parameter should be
   * resourceNames=<name1>&resourceNames=<name2>&... - To get information about
   * the authenticated user, specify `people/me`. - To get information about a
   * google account, specify `people/{account_id}`. - To get information about a
   * contact, specify the resource name that identifies the contact as returned
   * by `people.connections.list`. There is a maximum of 200 resource names.
   */
  resourceNames?: string;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
}

function serializePeopleGetBatchGetOptions(data: any): PeopleGetBatchGetOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    ["requestMask.includeField"]: data["requestMask.includeField"] !== undefined ? data["requestMask.includeField"] : undefined,
  };
}

function deserializePeopleGetBatchGetOptions(data: any): PeopleGetBatchGetOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    ["requestMask.includeField"]: data["requestMask.includeField"] !== undefined ? data["requestMask.includeField"] : undefined,
  };
}

/**
 * Additional options for People#peopleGet.
 */
export interface PeopleGetOptions {
  /**
   * Required. A field mask to restrict which fields on the person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  personFields?: string /* FieldMask */;
  /**
   * Required. Comma-separated list of person fields to be included in the
   * response. Each path should start with `person.`: for example,
   * `person.names` or `person.photos`.
   */
  ["requestMask.includeField"]?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_PROFILE and READ_SOURCE_TYPE_CONTACT if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
}

function serializePeopleGetOptions(data: any): PeopleGetOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    ["requestMask.includeField"]: data["requestMask.includeField"] !== undefined ? data["requestMask.includeField"] : undefined,
  };
}

function deserializePeopleGetOptions(data: any): PeopleGetOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    ["requestMask.includeField"]: data["requestMask.includeField"] !== undefined ? data["requestMask.includeField"] : undefined,
  };
}

/**
 * Additional options for People#peopleListDirectoryPeople.
 */
export interface PeopleListDirectoryPeopleOptions {
  /**
   * Optional. Additional data to merge into the directory sources if they are
   * connected through verified join keys such as email addresses or phone
   * numbers.
   */
  mergeSources?:  | "DIRECTORY_MERGE_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_MERGE_SOURCE_TYPE_CONTACT";
  /**
   * Optional. The number of people to include in the response. Valid values
   * are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous response
   * `next_page_token`. Provide this to retrieve the subsequent page. When
   * paginating, all other parameters provided to `people.listDirectoryPeople`
   * must match the first call that provided the page token.
   */
  pageToken?: string;
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. Whether the response should return `next_sync_token`. It can be
   * used to get incremental changes since the last request by setting it on the
   * request `sync_token`. More details about sync behavior at
   * `people.listDirectoryPeople`.
   */
  requestSyncToken?: boolean;
  /**
   * Required. Directory sources to return.
   */
  sources?:  | "DIRECTORY_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT" | "DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE";
  /**
   * Optional. A sync token, received from a previous response
   * `next_sync_token` Provide this to retrieve only the resources changed since
   * the last request. When syncing, all other parameters provided to
   * `people.listDirectoryPeople` must match the first call that provided the
   * sync token. More details about sync behavior at
   * `people.listDirectoryPeople`.
   */
  syncToken?: string;
}

function serializePeopleListDirectoryPeopleOptions(data: any): PeopleListDirectoryPeopleOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializePeopleListDirectoryPeopleOptions(data: any): PeopleListDirectoryPeopleOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for People#peopleSearchContacts.
 */
export interface PeopleSearchContactsOptions {
  /**
   * Optional. The number of results to return. Defaults to 10 if field is not
   * set, or set to 0. Values greater than 30 will be capped to 30.
   */
  pageSize?: number;
  /**
   * Required. The plain-text query for the request. The query is used to match
   * prefix phrases of the fields on a person. For example, a person with name
   * "foo name" matches queries such as "f", "fo", "foo", "foo n", "nam", etc.,
   * but not "oo n".
   */
  query?: string;
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  readMask?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
}

function serializePeopleSearchContactsOptions(data: any): PeopleSearchContactsOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializePeopleSearchContactsOptions(data: any): PeopleSearchContactsOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for People#peopleSearchDirectoryPeople.
 */
export interface PeopleSearchDirectoryPeopleOptions {
  /**
   * Optional. Additional data to merge into the directory sources if they are
   * connected through verified join keys such as email addresses or phone
   * numbers.
   */
  mergeSources?:  | "DIRECTORY_MERGE_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_MERGE_SOURCE_TYPE_CONTACT";
  /**
   * Optional. The number of people to include in the response. Valid values
   * are between 1 and 500, inclusive. Defaults to 100 if not set or set to 0.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous response
   * `next_page_token`. Provide this to retrieve the subsequent page. When
   * paginating, all other parameters provided to `SearchDirectoryPeople` must
   * match the first call that provided the page token.
   */
  pageToken?: string;
  /**
   * Required. Prefix query that matches fields in the person. Does NOT use the
   * read_mask for determining what fields to match.
   */
  query?: string;
  /**
   * Required. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Valid values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  readMask?: string /* FieldMask */;
  /**
   * Required. Directory sources to return.
   */
  sources?:  | "DIRECTORY_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT" | "DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE";
}

function serializePeopleSearchDirectoryPeopleOptions(data: any): PeopleSearchDirectoryPeopleOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializePeopleSearchDirectoryPeopleOptions(data: any): PeopleSearchDirectoryPeopleOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for People#peopleUpdateContact.
 */
export interface PeopleUpdateContactOptions {
  /**
   * Optional. A field mask to restrict which fields on each person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Defaults to all fields if not set. Valid values are: * addresses *
   * ageRanges * biographies * birthdays * calendarUrls * clientData *
   * coverPhotos * emailAddresses * events * externalIds * genders * imClients *
   * interests * locales * locations * memberships * metadata * miscKeywords *
   * names * nicknames * occupations * organizations * phoneNumbers * photos *
   * relations * sipAddresses * skills * urls * userDefined
   */
  personFields?: string /* FieldMask */;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT";
  /**
   * Required. A field mask to restrict which fields on the person are updated.
   * Multiple fields can be specified by separating them with commas. All
   * updated fields will be replaced. Valid values are: * addresses *
   * biographies * birthdays * calendarUrls * clientData * emailAddresses *
   * events * externalIds * genders * imClients * interests * locales *
   * locations * memberships * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * relations * sipAddresses * urls *
   * userDefined
   */
  updatePersonFields?: string /* FieldMask */;
}

function serializePeopleUpdateContactOptions(data: any): PeopleUpdateContactOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    updatePersonFields: data["updatePersonFields"] !== undefined ? data["updatePersonFields"] : undefined,
  };
}

function deserializePeopleUpdateContactOptions(data: any): PeopleUpdateContactOptions {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    updatePersonFields: data["updatePersonFields"] !== undefined ? data["updatePersonFields"] : undefined,
  };
}

/**
 * Information about a person merged from various data sources such as the
 * authenticated user's contacts and profile data. Most fields can have multiple
 * items. The items in a field have no guaranteed order, but each non-empty
 * field is guaranteed to have exactly one field with `metadata.primary` set to
 * true.
 */
export interface Person {
  /**
   * The person's street addresses.
   */
  addresses?: Address[];
  /**
   * Output only. **DEPRECATED** (Please use `person.ageRanges` instead) The
   * person's age range.
   */
  readonly ageRange?:  | "AGE_RANGE_UNSPECIFIED" | "LESS_THAN_EIGHTEEN" | "EIGHTEEN_TO_TWENTY" | "TWENTY_ONE_OR_OLDER";
  /**
   * Output only. The person's age ranges.
   */
  readonly ageRanges?: AgeRangeType[];
  /**
   * The person's biographies. This field is a singleton for contact sources.
   */
  biographies?: Biography[];
  /**
   * The person's birthdays. This field is a singleton for contact sources.
   */
  birthdays?: Birthday[];
  /**
   * **DEPRECATED**: No data will be returned The person's bragging rights.
   */
  braggingRights?: BraggingRights[];
  /**
   * The person's calendar URLs.
   */
  calendarUrls?: CalendarUrl[];
  /**
   * The person's client data.
   */
  clientData?: ClientData[];
  /**
   * Output only. The person's cover photos.
   */
  readonly coverPhotos?: CoverPhoto[];
  /**
   * The person's email addresses. For `people.connections.list` and
   * `otherContacts.list` the number of email addresses is limited to 100. If a
   * Person has more email addresses the entire set can be obtained by calling
   * GetPeople.
   */
  emailAddresses?: EmailAddress[];
  /**
   * The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the
   * resource. Used for web cache validation.
   */
  etag?: string;
  /**
   * The person's events.
   */
  events?: Event[];
  /**
   * The person's external IDs.
   */
  externalIds?: ExternalId[];
  /**
   * The person's file-ases.
   */
  fileAses?: FileAs[];
  /**
   * The person's genders. This field is a singleton for contact sources.
   */
  genders?: Gender[];
  /**
   * The person's instant messaging clients.
   */
  imClients?: ImClient[];
  /**
   * The person's interests.
   */
  interests?: Interest[];
  /**
   * The person's locale preferences.
   */
  locales?: Locale[];
  /**
   * The person's locations.
   */
  locations?: Location[];
  /**
   * The person's group memberships.
   */
  memberships?: Membership[];
  /**
   * Output only. Metadata about the person.
   */
  readonly metadata?: PersonMetadata;
  /**
   * The person's miscellaneous keywords.
   */
  miscKeywords?: MiscKeyword[];
  /**
   * The person's names. This field is a singleton for contact sources.
   */
  names?: Name[];
  /**
   * The person's nicknames.
   */
  nicknames?: Nickname[];
  /**
   * The person's occupations.
   */
  occupations?: Occupation[];
  /**
   * The person's past or current organizations.
   */
  organizations?: Organization[];
  /**
   * The person's phone numbers. For `people.connections.list` and
   * `otherContacts.list` the number of phone numbers is limited to 100. If a
   * Person has more phone numbers the entire set can be obtained by calling
   * GetPeople.
   */
  phoneNumbers?: PhoneNumber[];
  /**
   * Output only. The person's photos.
   */
  readonly photos?: Photo[];
  /**
   * The person's relations.
   */
  relations?: Relation[];
  /**
   * Output only. **DEPRECATED**: No data will be returned The person's
   * relationship interests.
   */
  readonly relationshipInterests?: RelationshipInterest[];
  /**
   * Output only. **DEPRECATED**: No data will be returned The person's
   * relationship statuses.
   */
  readonly relationshipStatuses?: RelationshipStatus[];
  /**
   * **DEPRECATED**: (Please use `person.locations` instead) The person's
   * residences.
   */
  residences?: Residence[];
  /**
   * The resource name for the person, assigned by the server. An ASCII string
   * in the form of `people/{person_id}`.
   */
  resourceName?: string;
  /**
   * The person's SIP addresses.
   */
  sipAddresses?: SipAddress[];
  /**
   * The person's skills.
   */
  skills?: Skill[];
  /**
   * Output only. **DEPRECATED**: No data will be returned The person's
   * taglines.
   */
  readonly taglines?: Tagline[];
  /**
   * The person's associated URLs.
   */
  urls?: Url[];
  /**
   * The person's user defined data.
   */
  userDefined?: UserDefined[];
}

/**
 * The metadata about a person.
 */
export interface PersonMetadata {
  /**
   * Output only. True if the person resource has been deleted. Populated only
   * for `people.connections.list` and `otherContacts.list` sync requests.
   */
  readonly deleted?: boolean;
  /**
   * Output only. Resource names of people linked to this resource.
   */
  readonly linkedPeopleResourceNames?: string[];
  /**
   * Output only. **DEPRECATED** (Please use
   * `person.metadata.sources.profileMetadata.objectType` instead) The type of
   * the person object.
   */
  readonly objectType?:  | "OBJECT_TYPE_UNSPECIFIED" | "PERSON" | "PAGE";
  /**
   * Output only. Any former resource names this person has had. Populated only
   * for `people.connections.list` requests that include a sync token. The
   * resource name may change when adding or removing fields that link a contact
   * and profile such as a verified email, verified phone number, or profile
   * URL.
   */
  readonly previousResourceNames?: string[];
  /**
   * The sources of data for the person.
   */
  sources?: Source[];
}

/**
 * The response for a single person
 */
export interface PersonResponse {
  /**
   * **DEPRECATED** (Please use status instead) [HTTP 1.1 status code]
   * (http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).
   */
  httpStatusCode?: number;
  /**
   * The person.
   */
  person?: Person;
  /**
   * The original requested resource name. May be different than the resource
   * name on the returned person. The resource name can change when adding or
   * removing fields that link a contact and profile such as a verified email,
   * verified phone number, or a profile URL.
   */
  requestedResourceName?: string;
  /**
   * The status of the response.
   */
  status?: Status;
}

/**
 * A person's phone number.
 */
export interface PhoneNumber {
  /**
   * Output only. The canonicalized [ITU-T
   * E.164](https://law.resource.org/pub/us/cfr/ibr/004/itu-t.E.164.1.2008.pdf)
   * form of the phone number.
   */
  readonly canonicalForm?: string;
  /**
   * Output only. The type of the phone number translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the phone number.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the phone number. The type can be custom or one of these
   * predefined values: * `home` * `work` * `mobile` * `homeFax` * `workFax` *
   * `otherFax` * `pager` * `workMobile` * `workPager` * `main` * `googleVoice`
   * * `other`
   */
  type?: string;
  /**
   * The phone number.
   */
  value?: string;
}

/**
 * A person's photo. A picture shown next to the person's name to help others
 * recognize the person.
 */
export interface Photo {
  /**
   * True if the photo is a default photo; false if the photo is a
   * user-provided photo.
   */
  default?: boolean;
  /**
   * Metadata about the photo.
   */
  metadata?: FieldMetadata;
  /**
   * The URL of the photo. You can change the desired size by appending a query
   * parameter `sz={size}` at the end of the url, where {size} is the size in
   * pixels. Example:
   * https://lh3.googleusercontent.com/-T_wVWLlmg7w/AAAAAAAAAAI/AAAAAAAABa8/00gzXvDBYqw/s100/photo.jpg?sz=50
   */
  url?: string;
}

/**
 * The metadata about a profile.
 */
export interface ProfileMetadata {
  /**
   * Output only. The profile object type.
   */
  readonly objectType?:  | "OBJECT_TYPE_UNSPECIFIED" | "PERSON" | "PAGE";
  /**
   * Output only. The user types.
   */
  readonly userTypes?:  | "USER_TYPE_UNKNOWN" | "GOOGLE_USER" | "GPLUS_USER" | "GOOGLE_APPS_USER"[];
}

/**
 * A person's relation to another person.
 */
export interface Relation {
  /**
   * Output only. The type of the relation translated and formatted in the
   * viewer's account locale or the locale specified in the Accept-Language HTTP
   * header.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the relation.
   */
  metadata?: FieldMetadata;
  /**
   * The name of the other person this relation refers to.
   */
  person?: string;
  /**
   * The person's relation to the other person. The type can be custom or one
   * of these predefined values: * `spouse` * `child` * `mother` * `father` *
   * `parent` * `brother` * `sister` * `friend` * `relative` * `domesticPartner`
   * * `manager` * `assistant` * `referredBy` * `partner`
   */
  type?: string;
}

/**
 * **DEPRECATED**: No data will be returned A person's relationship interest .
 */
export interface RelationshipInterest {
  /**
   * Output only. The value of the relationship interest translated and
   * formatted in the viewer's account locale or the locale specified in the
   * Accept-Language HTTP header.
   */
  readonly formattedValue?: string;
  /**
   * Metadata about the relationship interest.
   */
  metadata?: FieldMetadata;
  /**
   * The kind of relationship the person is looking for. The value can be
   * custom or one of these predefined values: * `friend` * `date` *
   * `relationship` * `networking`
   */
  value?: string;
}

/**
 * **DEPRECATED**: No data will be returned A person's relationship status.
 */
export interface RelationshipStatus {
  /**
   * Output only. The value of the relationship status translated and formatted
   * in the viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedValue?: string;
  /**
   * Metadata about the relationship status.
   */
  metadata?: FieldMetadata;
  /**
   * The relationship status. The value can be custom or one of these
   * predefined values: * `single` * `inARelationship` * `engaged` * `married` *
   * `itsComplicated` * `openRelationship` * `widowed` * `inDomesticPartnership`
   * * `inCivilUnion`
   */
  value?: string;
}

/**
 * **DEPRECATED**: Please use `person.locations` instead. A person's past or
 * current residence.
 */
export interface Residence {
  /**
   * True if the residence is the person's current residence; false if the
   * residence is a past residence.
   */
  current?: boolean;
  /**
   * Metadata about the residence.
   */
  metadata?: FieldMetadata;
  /**
   * The address of the residence.
   */
  value?: string;
}

/**
 * The response to a request for people in the authenticated user's domain
 * directory that match the specified query.
 */
export interface SearchDirectoryPeopleResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of people in the domain directory that match the query.
   */
  people?: Person[];
  /**
   * The total number of items in the list without pagination.
   */
  totalSize?: number;
}

/**
 * The response to a search request for the authenticated user, given a query.
 */
export interface SearchResponse {
  /**
   * The results of the request.
   */
  results?: SearchResult[];
}

/**
 * A result of a search query.
 */
export interface SearchResult {
  /**
   * The matched Person.
   */
  person?: Person;
}

/**
 * A person's SIP address. Session Initial Protocol addresses are used for VoIP
 * communications to make voice or video calls over the internet.
 */
export interface SipAddress {
  /**
   * Output only. The type of the SIP address translated and formatted in the
   * viewer's account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the SIP address.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the SIP address. The type can be custom or or one of these
   * predefined values: * `home` * `work` * `mobile` * `other`
   */
  type?: string;
  /**
   * The SIP address in the [RFC 3261
   * 19.1](https://tools.ietf.org/html/rfc3261#section-19.1) SIP URI format.
   */
  value?: string;
}

/**
 * A skill that the person has.
 */
export interface Skill {
  /**
   * Metadata about the skill.
   */
  metadata?: FieldMetadata;
  /**
   * The skill; for example, `underwater basket weaving`.
   */
  value?: string;
}

/**
 * The source of a field.
 */
export interface Source {
  /**
   * **Only populated in `person.metadata.sources`.** The [HTTP entity
   * tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the source. Used for web
   * cache validation.
   */
  etag?: string;
  /**
   * The unique identifier within the source type generated by the server.
   */
  id?: string;
  /**
   * Output only. **Only populated in `person.metadata.sources`.** Metadata
   * about a source of type PROFILE.
   */
  readonly profileMetadata?: ProfileMetadata;
  /**
   * The source type.
   */
  type?:  | "SOURCE_TYPE_UNSPECIFIED" | "ACCOUNT" | "PROFILE" | "DOMAIN_PROFILE" | "CONTACT" | "OTHER_CONTACT" | "DOMAIN_CONTACT";
  /**
   * Output only. **Only populated in `person.metadata.sources`.** Last update
   * timestamp of this source.
   */
  readonly updateTime?: Date;
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
 * **DEPRECATED**: No data will be returned A brief one-line description of the
 * person.
 */
export interface Tagline {
  /**
   * Metadata about the tagline.
   */
  metadata?: FieldMetadata;
  /**
   * The tagline.
   */
  value?: string;
}

/**
 * A request to update an existing user contact group. All updated fields will
 * be replaced.
 */
export interface UpdateContactGroupRequest {
  /**
   * Required. The contact group to update.
   */
  contactGroup?: ContactGroup;
  /**
   * Optional. A field mask to restrict which fields on the group are returned.
   * Defaults to `metadata`, `groupType`, and `name` if not set or set to empty.
   * Valid fields are: * clientData * groupType * memberCount * metadata * name
   */
  readGroupFields?: string /* FieldMask */;
  /**
   * Optional. A field mask to restrict which fields on the group are updated.
   * Multiple fields can be specified by separating them with commas. Defaults
   * to `name` if not set or set to empty. Updated fields are replaced. Valid
   * values are: * clientData * name
   */
  updateGroupFields?: string /* FieldMask */;
}

function serializeUpdateContactGroupRequest(data: any): UpdateContactGroupRequest {
  return {
    ...data,
    readGroupFields: data["readGroupFields"] !== undefined ? data["readGroupFields"] : undefined,
    updateGroupFields: data["updateGroupFields"] !== undefined ? data["updateGroupFields"] : undefined,
  };
}

function deserializeUpdateContactGroupRequest(data: any): UpdateContactGroupRequest {
  return {
    ...data,
    readGroupFields: data["readGroupFields"] !== undefined ? data["readGroupFields"] : undefined,
    updateGroupFields: data["updateGroupFields"] !== undefined ? data["updateGroupFields"] : undefined,
  };
}

/**
 * A request to update an existing contact's photo. All requests must have a
 * valid photo format: JPEG or PNG.
 */
export interface UpdateContactPhotoRequest {
  /**
   * Optional. A field mask to restrict which fields on the person are
   * returned. Multiple fields can be specified by separating them with commas.
   * Defaults to empty if not set, which will skip the post mutate get. Valid
   * values are: * addresses * ageRanges * biographies * birthdays *
   * calendarUrls * clientData * coverPhotos * emailAddresses * events *
   * externalIds * genders * imClients * interests * locales * locations *
   * memberships * metadata * miscKeywords * names * nicknames * occupations *
   * organizations * phoneNumbers * photos * relations * sipAddresses * skills *
   * urls * userDefined
   */
  personFields?: string /* FieldMask */;
  /**
   * Required. Raw photo bytes
   */
  photoBytes?: Uint8Array;
  /**
   * Optional. A mask of what source types to return. Defaults to
   * READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
   */
  sources?:  | "READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT"[];
}

function serializeUpdateContactPhotoRequest(data: any): UpdateContactPhotoRequest {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    photoBytes: data["photoBytes"] !== undefined ? encodeBase64(data["photoBytes"]) : undefined,
  };
}

function deserializeUpdateContactPhotoRequest(data: any): UpdateContactPhotoRequest {
  return {
    ...data,
    personFields: data["personFields"] !== undefined ? data["personFields"] : undefined,
    photoBytes: data["photoBytes"] !== undefined ? decodeBase64(data["photoBytes"] as string) : undefined,
  };
}

/**
 * The response for updating a contact's photo.
 */
export interface UpdateContactPhotoResponse {
  /**
   * The updated person, if person_fields is set in the
   * UpdateContactPhotoRequest; otherwise this will be unset.
   */
  person?: Person;
}

/**
 * A person's associated URLs.
 */
export interface Url {
  /**
   * Output only. The type of the URL translated and formatted in the viewer's
   * account locale or the `Accept-Language` HTTP header locale.
   */
  readonly formattedType?: string;
  /**
   * Metadata about the URL.
   */
  metadata?: FieldMetadata;
  /**
   * The type of the URL. The type can be custom or one of these predefined
   * values: * `home` * `work` * `blog` * `profile` * `homePage` * `ftp` *
   * `reservations` * `appInstallPage`: website for a Currents application. *
   * `other`
   */
  type?: string;
  /**
   * The URL.
   */
  value?: string;
}

/**
 * Arbitrary user data that is populated by the end users.
 */
export interface UserDefined {
  /**
   * The end user specified key of the user defined data.
   */
  key?: string;
  /**
   * Metadata about the user defined data.
   */
  metadata?: FieldMetadata;
  /**
   * The end user specified value of the user defined data.
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
