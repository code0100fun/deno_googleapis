// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Essential Contacts API Client for Deno
 * ======================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/essentialcontacts/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class EssentialContacts {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://essentialcontacts.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists all contacts for the resource that are subscribed to the specified
   * notification categories, including contacts inherited from any parent
   * resources.
   *
   * @param parent Required. The name of the resource to compute contacts for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async foldersContactsCompute(parent: string, opts: FoldersContactsComputeOptions = {}): Promise<GoogleCloudEssentialcontactsV1ComputeContactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts:compute`);
    if (opts.notificationCategories !== undefined) {
      url.searchParams.append("notificationCategories", String(opts.notificationCategories));
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
    return deserializeGoogleCloudEssentialcontactsV1ComputeContactsResponse(data);
  }

  /**
   * Adds a new contact for a resource.
   *
   * @param parent Required. The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async foldersContactsCreate(parent: string, req: GoogleCloudEssentialcontactsV1Contact): Promise<GoogleCloudEssentialcontactsV1Contact> {
    req = serializeGoogleCloudEssentialcontactsV1Contact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Deletes a contact.
   *
   * @param name Required. The name of the contact to delete. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id}
   */
  async foldersContactsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a single contact.
   *
   * @param name Required. The name of the contact to retrieve. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id}
   */
  async foldersContactsGet(name: string): Promise<GoogleCloudEssentialcontactsV1Contact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Lists the contacts that have been set on a resource.
   *
   * @param parent Required. The parent resource name. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async foldersContactsList(parent: string, opts: FoldersContactsListOptions = {}): Promise<GoogleCloudEssentialcontactsV1ListContactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts`);
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
    return deserializeGoogleCloudEssentialcontactsV1ListContactsResponse(data);
  }

  /**
   * Updates a contact. Note: A contact's email address cannot be changed.
   *
   * @param name Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id}
   */
  async foldersContactsPatch(name: string, req: GoogleCloudEssentialcontactsV1Contact, opts: FoldersContactsPatchOptions = {}): Promise<GoogleCloudEssentialcontactsV1Contact> {
    req = serializeGoogleCloudEssentialcontactsV1Contact(req);
    opts = serializeFoldersContactsPatchOptions(opts);
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
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Allows a contact admin to send a test message to contact to verify that it
   * has been configured correctly.
   *
   * @param resource Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async foldersContactsSendTestMessage(resource: string, req: GoogleCloudEssentialcontactsV1SendTestMessageRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }/contacts:sendTestMessage`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lists all contacts for the resource that are subscribed to the specified
   * notification categories, including contacts inherited from any parent
   * resources.
   *
   * @param parent Required. The name of the resource to compute contacts for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async organizationsContactsCompute(parent: string, opts: OrganizationsContactsComputeOptions = {}): Promise<GoogleCloudEssentialcontactsV1ComputeContactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts:compute`);
    if (opts.notificationCategories !== undefined) {
      url.searchParams.append("notificationCategories", String(opts.notificationCategories));
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
    return deserializeGoogleCloudEssentialcontactsV1ComputeContactsResponse(data);
  }

  /**
   * Adds a new contact for a resource.
   *
   * @param parent Required. The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async organizationsContactsCreate(parent: string, req: GoogleCloudEssentialcontactsV1Contact): Promise<GoogleCloudEssentialcontactsV1Contact> {
    req = serializeGoogleCloudEssentialcontactsV1Contact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Deletes a contact.
   *
   * @param name Required. The name of the contact to delete. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id}
   */
  async organizationsContactsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a single contact.
   *
   * @param name Required. The name of the contact to retrieve. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id}
   */
  async organizationsContactsGet(name: string): Promise<GoogleCloudEssentialcontactsV1Contact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Lists the contacts that have been set on a resource.
   *
   * @param parent Required. The parent resource name. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async organizationsContactsList(parent: string, opts: OrganizationsContactsListOptions = {}): Promise<GoogleCloudEssentialcontactsV1ListContactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts`);
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
    return deserializeGoogleCloudEssentialcontactsV1ListContactsResponse(data);
  }

  /**
   * Updates a contact. Note: A contact's email address cannot be changed.
   *
   * @param name Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id}
   */
  async organizationsContactsPatch(name: string, req: GoogleCloudEssentialcontactsV1Contact, opts: OrganizationsContactsPatchOptions = {}): Promise<GoogleCloudEssentialcontactsV1Contact> {
    req = serializeGoogleCloudEssentialcontactsV1Contact(req);
    opts = serializeOrganizationsContactsPatchOptions(opts);
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
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Allows a contact admin to send a test message to contact to verify that it
   * has been configured correctly.
   *
   * @param resource Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async organizationsContactsSendTestMessage(resource: string, req: GoogleCloudEssentialcontactsV1SendTestMessageRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }/contacts:sendTestMessage`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lists all contacts for the resource that are subscribed to the specified
   * notification categories, including contacts inherited from any parent
   * resources.
   *
   * @param parent Required. The name of the resource to compute contacts for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async projectsContactsCompute(parent: string, opts: ProjectsContactsComputeOptions = {}): Promise<GoogleCloudEssentialcontactsV1ComputeContactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts:compute`);
    if (opts.notificationCategories !== undefined) {
      url.searchParams.append("notificationCategories", String(opts.notificationCategories));
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
    return deserializeGoogleCloudEssentialcontactsV1ComputeContactsResponse(data);
  }

  /**
   * Adds a new contact for a resource.
   *
   * @param parent Required. The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async projectsContactsCreate(parent: string, req: GoogleCloudEssentialcontactsV1Contact): Promise<GoogleCloudEssentialcontactsV1Contact> {
    req = serializeGoogleCloudEssentialcontactsV1Contact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Deletes a contact.
   *
   * @param name Required. The name of the contact to delete. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id}
   */
  async projectsContactsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a single contact.
   *
   * @param name Required. The name of the contact to retrieve. Format: organizations/{organization_id}/contacts/{contact_id}, folders/{folder_id}/contacts/{contact_id} or projects/{project_id}/contacts/{contact_id}
   */
  async projectsContactsGet(name: string): Promise<GoogleCloudEssentialcontactsV1Contact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Lists the contacts that have been set on a resource.
   *
   * @param parent Required. The parent resource name. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async projectsContactsList(parent: string, opts: ProjectsContactsListOptions = {}): Promise<GoogleCloudEssentialcontactsV1ListContactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contacts`);
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
    return deserializeGoogleCloudEssentialcontactsV1ListContactsResponse(data);
  }

  /**
   * Updates a contact. Note: A contact's email address cannot be changed.
   *
   * @param name Output only. The identifier for the contact. Format: {resource_type}/{resource_id}/contacts/{contact_id}
   */
  async projectsContactsPatch(name: string, req: GoogleCloudEssentialcontactsV1Contact, opts: ProjectsContactsPatchOptions = {}): Promise<GoogleCloudEssentialcontactsV1Contact> {
    req = serializeGoogleCloudEssentialcontactsV1Contact(req);
    opts = serializeProjectsContactsPatchOptions(opts);
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
    return deserializeGoogleCloudEssentialcontactsV1Contact(data);
  }

  /**
   * Allows a contact admin to send a test message to contact to verify that it
   * has been configured correctly.
   *
   * @param resource Required. The name of the resource to send the test message for. All contacts must either be set directly on this resource or inherited from another resource that is an ancestor of this one. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   */
  async projectsContactsSendTestMessage(resource: string, req: GoogleCloudEssentialcontactsV1SendTestMessageRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }/contacts:sendTestMessage`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }
}

/**
 * Additional options for EssentialContacts#foldersContactsCompute.
 */
export interface FoldersContactsComputeOptions {
  /**
   * The categories of notifications to compute contacts for. If ALL is
   * included in this list, contacts subscribed to any notification category
   * will be returned.
   */
  notificationCategories?:  | "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS";
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of `next_page_token` in the
   * response indicates that more results might be available. If not specified,
   * the default page_size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for EssentialContacts#foldersContactsList.
 */
export interface FoldersContactsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of `next_page_token` in the
   * response indicates that more results might be available. If not specified,
   * the default page_size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for EssentialContacts#foldersContactsPatch.
 */
export interface FoldersContactsPatchOptions {
  /**
   * Optional. The update mask applied to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersContactsPatchOptions(data: any): FoldersContactsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersContactsPatchOptions(data: any): FoldersContactsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response message for the ComputeContacts method.
 */
export interface GoogleCloudEssentialcontactsV1ComputeContactsResponse {
  /**
   * All contacts for the resource that are subscribed to the specified
   * notification categories, including contacts inherited from any parent
   * resources.
   */
  contacts?: GoogleCloudEssentialcontactsV1Contact[];
  /**
   * If there are more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token` and the
   * rest of the parameters the same as the original request.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudEssentialcontactsV1ComputeContactsResponse(data: any): GoogleCloudEssentialcontactsV1ComputeContactsResponse {
  return {
    ...data,
    contacts: data["contacts"] !== undefined ? data["contacts"].map((item: any) => (serializeGoogleCloudEssentialcontactsV1Contact(item))) : undefined,
  };
}

function deserializeGoogleCloudEssentialcontactsV1ComputeContactsResponse(data: any): GoogleCloudEssentialcontactsV1ComputeContactsResponse {
  return {
    ...data,
    contacts: data["contacts"] !== undefined ? data["contacts"].map((item: any) => (deserializeGoogleCloudEssentialcontactsV1Contact(item))) : undefined,
  };
}

/**
 * A contact that will receive notifications from Google Cloud.
 */
export interface GoogleCloudEssentialcontactsV1Contact {
  /**
   * Required. The email address to send notifications to. The email address
   * does not need to be a Google Account.
   */
  email?: string;
  /**
   * Required. The preferred language for notifications, as a ISO 639-1
   * language code. See [Supported
   * languages](https://cloud.google.com/resource-manager/docs/managing-notification-contacts#supported-languages)
   * for a list of supported languages.
   */
  languageTag?: string;
  /**
   * Output only. The identifier for the contact. Format:
   * {resource_type}/{resource_id}/contacts/{contact_id}
   */
  readonly name?: string;
  /**
   * Required. The categories of notifications that the contact will receive
   * communications for.
   */
  notificationCategorySubscriptions?:  | "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS"[];
  /**
   * The last time the validation_state was updated, either manually or
   * automatically. A contact is considered stale if its validation state was
   * updated more than 1 year ago.
   */
  validateTime?: Date;
  /**
   * The validity of the contact. A contact is considered valid if it is the
   * correct recipient for notifications for a particular resource.
   */
  validationState?:  | "VALIDATION_STATE_UNSPECIFIED" | "VALID" | "INVALID";
}

function serializeGoogleCloudEssentialcontactsV1Contact(data: any): GoogleCloudEssentialcontactsV1Contact {
  return {
    ...data,
    validateTime: data["validateTime"] !== undefined ? data["validateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudEssentialcontactsV1Contact(data: any): GoogleCloudEssentialcontactsV1Contact {
  return {
    ...data,
    validateTime: data["validateTime"] !== undefined ? new Date(data["validateTime"]) : undefined,
  };
}

/**
 * Response message for the ListContacts method.
 */
export interface GoogleCloudEssentialcontactsV1ListContactsResponse {
  /**
   * The contacts for the specified resource.
   */
  contacts?: GoogleCloudEssentialcontactsV1Contact[];
  /**
   * If there are more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token` and the
   * rest of the parameters the same as the original request.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudEssentialcontactsV1ListContactsResponse(data: any): GoogleCloudEssentialcontactsV1ListContactsResponse {
  return {
    ...data,
    contacts: data["contacts"] !== undefined ? data["contacts"].map((item: any) => (serializeGoogleCloudEssentialcontactsV1Contact(item))) : undefined,
  };
}

function deserializeGoogleCloudEssentialcontactsV1ListContactsResponse(data: any): GoogleCloudEssentialcontactsV1ListContactsResponse {
  return {
    ...data,
    contacts: data["contacts"] !== undefined ? data["contacts"].map((item: any) => (deserializeGoogleCloudEssentialcontactsV1Contact(item))) : undefined,
  };
}

/**
 * Request message for the SendTestMessage method.
 */
export interface GoogleCloudEssentialcontactsV1SendTestMessageRequest {
  /**
   * Required. The list of names of the contacts to send a test message to.
   * Format: organizations/{organization_id}/contacts/{contact_id},
   * folders/{folder_id}/contacts/{contact_id} or
   * projects/{project_id}/contacts/{contact_id}
   */
  contacts?: string[];
  /**
   * Required. The notification category to send the test message for. All
   * contacts must be subscribed to this category.
   */
  notificationCategory?:  | "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS";
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
}

/**
 * Additional options for EssentialContacts#organizationsContactsCompute.
 */
export interface OrganizationsContactsComputeOptions {
  /**
   * The categories of notifications to compute contacts for. If ALL is
   * included in this list, contacts subscribed to any notification category
   * will be returned.
   */
  notificationCategories?:  | "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS";
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of `next_page_token` in the
   * response indicates that more results might be available. If not specified,
   * the default page_size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for EssentialContacts#organizationsContactsList.
 */
export interface OrganizationsContactsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of `next_page_token` in the
   * response indicates that more results might be available. If not specified,
   * the default page_size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for EssentialContacts#organizationsContactsPatch.
 */
export interface OrganizationsContactsPatchOptions {
  /**
   * Optional. The update mask applied to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsContactsPatchOptions(data: any): OrganizationsContactsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsContactsPatchOptions(data: any): OrganizationsContactsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for EssentialContacts#projectsContactsCompute.
 */
export interface ProjectsContactsComputeOptions {
  /**
   * The categories of notifications to compute contacts for. If ALL is
   * included in this list, contacts subscribed to any notification category
   * will be returned.
   */
  notificationCategories?:  | "NOTIFICATION_CATEGORY_UNSPECIFIED" | "ALL" | "SUSPENSION" | "SECURITY" | "TECHNICAL" | "BILLING" | "LEGAL" | "PRODUCT_UPDATES" | "TECHNICAL_INCIDENTS";
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of `next_page_token` in the
   * response indicates that more results might be available. If not specified,
   * the default page_size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for EssentialContacts#projectsContactsList.
 */
export interface ProjectsContactsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of `next_page_token` in the
   * response indicates that more results might be available. If not specified,
   * the default page_size is 100.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for EssentialContacts#projectsContactsPatch.
 */
export interface ProjectsContactsPatchOptions {
  /**
   * Optional. The update mask applied to the resource. For the `FieldMask`
   * definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsContactsPatchOptions(data: any): ProjectsContactsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsContactsPatchOptions(data: any): ProjectsContactsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}