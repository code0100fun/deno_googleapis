// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Gmail API Client for Deno
 * =========================
 * 
 * The Gmail API lets you view and manage Gmail mailbox data like threads, messages, and labels.
 * 
 * Docs: https://developers.google.com/gmail/api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Gmail API lets you view and manage Gmail mailbox data like threads,
 * messages, and labels.
 */
export class Gmail {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://gmail.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new draft with the `DRAFT` label.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersDraftsCreate(userId: string, req: Draft): Promise<Draft> {
    req = serializeDraft(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/drafts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDraft(data);
  }

  /**
   * Immediately and permanently deletes the specified draft. Does not simply
   * trash it.
   *
   * @param id The ID of the draft to delete.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersDraftsDelete(id: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/drafts/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified draft.
   *
   * @param id The ID of the draft to retrieve.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersDraftsGet(id: string, userId: string, opts: UsersDraftsGetOptions = {}): Promise<Draft> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/drafts/${ id }`);
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDraft(data);
  }

  /**
   * Lists the drafts in the user's mailbox.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersDraftsList(userId: string, opts: UsersDraftsListOptions = {}): Promise<ListDraftsResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/drafts`);
    if (opts.includeSpamTrash !== undefined) {
      url.searchParams.append("includeSpamTrash", String(opts.includeSpamTrash));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListDraftsResponse(data);
  }

  /**
   * Sends the specified, existing draft to the recipients in the `To`, `Cc`,
   * and `Bcc` headers.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersDraftsSend(userId: string, req: Draft): Promise<Message> {
    req = serializeDraft(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/drafts/send`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMessage(data);
  }

  /**
   * Replaces a draft's content.
   *
   * @param id The ID of the draft to update.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersDraftsUpdate(id: string, userId: string, req: Draft): Promise<Draft> {
    req = serializeDraft(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/drafts/${ id }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeDraft(data);
  }

  /**
   * Gets the current user's Gmail profile.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersGetProfile(userId: string): Promise<Profile> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/profile`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProfile(data);
  }

  /**
   * Lists the history of all changes to the given mailbox. History results are
   * returned in chronological order (increasing `historyId`).
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersHistoryList(userId: string, opts: UsersHistoryListOptions = {}): Promise<ListHistoryResponse> {
    opts = serializeUsersHistoryListOptions(opts);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/history`);
    if (opts.historyTypes !== undefined) {
      url.searchParams.append("historyTypes", String(opts.historyTypes));
    }
    if (opts.labelId !== undefined) {
      url.searchParams.append("labelId", String(opts.labelId));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startHistoryId !== undefined) {
      url.searchParams.append("startHistoryId", String(opts.startHistoryId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListHistoryResponse(data);
  }

  /**
   * Creates a new label.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersLabelsCreate(userId: string, req: Label): Promise<Label> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/labels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Label;
  }

  /**
   * Immediately and permanently deletes the specified label and removes it
   * from any messages and threads that it is applied to.
   *
   * @param id The ID of the label to delete.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersLabelsDelete(id: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/labels/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified label.
   *
   * @param id The ID of the label to retrieve.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersLabelsGet(id: string, userId: string): Promise<Label> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/labels/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Label;
  }

  /**
   * Lists all labels in the user's mailbox.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersLabelsList(userId: string): Promise<ListLabelsResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/labels`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLabelsResponse;
  }

  /**
   * Patch the specified label.
   *
   * @param id The ID of the label to update.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersLabelsPatch(id: string, userId: string, req: Label): Promise<Label> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/labels/${ id }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Label;
  }

  /**
   * Updates the specified label.
   *
   * @param id The ID of the label to update.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersLabelsUpdate(id: string, userId: string, req: Label): Promise<Label> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/labels/${ id }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Label;
  }

  /**
   * Gets the specified message attachment.
   *
   * @param id The ID of the attachment.
   * @param messageId The ID of the message containing the attachment.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesAttachmentsGet(id: string, messageId: string, userId: string): Promise<MessagePartBody> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/${ messageId }/attachments/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMessagePartBody(data);
  }

  /**
   * Deletes many messages by message ID. Provides no guarantees that messages
   * were not already deleted or even existed at all.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesBatchDelete(userId: string, req: BatchDeleteMessagesRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Modifies the labels on the specified messages.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesBatchModify(userId: string, req: BatchModifyMessagesRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/batchModify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Immediately and permanently deletes the specified message. This operation
   * cannot be undone. Prefer `messages.trash` instead.
   *
   * @param id The ID of the message to delete.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesDelete(id: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified message.
   *
   * @param id The ID of the message to retrieve. This ID is usually retrieved using `messages.list`. The ID is also contained in the result when a message is inserted (`messages.insert`) or imported (`messages.import`).
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesGet(id: string, userId: string, opts: UsersMessagesGetOptions = {}): Promise<Message> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/${ id }`);
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
    }
    if (opts.metadataHeaders !== undefined) {
      url.searchParams.append("metadataHeaders", String(opts.metadataHeaders));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMessage(data);
  }

  /**
   * Imports a message into only this user's mailbox, with standard email
   * delivery scanning and classification similar to receiving via SMTP. This
   * method doesn't perform SPF checks, so it might not work for some spam
   * messages, such as those attempting to perform domain spoofing. This method
   * does not send a message. Note: This function doesn't trigger forwarding
   * rules or filters set up by the user.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesImport(userId: string, req: Message, opts: UsersMessagesImportOptions = {}): Promise<Message> {
    req = serializeMessage(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/import`);
    if (opts.deleted !== undefined) {
      url.searchParams.append("deleted", String(opts.deleted));
    }
    if (opts.internalDateSource !== undefined) {
      url.searchParams.append("internalDateSource", String(opts.internalDateSource));
    }
    if (opts.neverMarkSpam !== undefined) {
      url.searchParams.append("neverMarkSpam", String(opts.neverMarkSpam));
    }
    if (opts.processForCalendar !== undefined) {
      url.searchParams.append("processForCalendar", String(opts.processForCalendar));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMessage(data);
  }

  /**
   * Directly inserts a message into only this user's mailbox similar to `IMAP
   * APPEND`, bypassing most scanning and classification. Does not send a
   * message.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesInsert(userId: string, req: Message, opts: UsersMessagesInsertOptions = {}): Promise<Message> {
    req = serializeMessage(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages`);
    if (opts.deleted !== undefined) {
      url.searchParams.append("deleted", String(opts.deleted));
    }
    if (opts.internalDateSource !== undefined) {
      url.searchParams.append("internalDateSource", String(opts.internalDateSource));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMessage(data);
  }

  /**
   * Lists the messages in the user's mailbox.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesList(userId: string, opts: UsersMessagesListOptions = {}): Promise<ListMessagesResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages`);
    if (opts.includeSpamTrash !== undefined) {
      url.searchParams.append("includeSpamTrash", String(opts.includeSpamTrash));
    }
    if (opts.labelIds !== undefined) {
      url.searchParams.append("labelIds", String(opts.labelIds));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListMessagesResponse(data);
  }

  /**
   * Modifies the labels on the specified message.
   *
   * @param id The ID of the message to modify.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesModify(id: string, userId: string, req: ModifyMessageRequest): Promise<Message> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/${ id }/modify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMessage(data);
  }

  /**
   * Sends the specified message to the recipients in the `To`, `Cc`, and `Bcc`
   * headers. For example usage, see [Sending
   * email](https://developers.google.com/gmail/api/guides/sending).
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesSend(userId: string, req: Message): Promise<Message> {
    req = serializeMessage(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/send`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMessage(data);
  }

  /**
   * Moves the specified message to the trash.
   *
   * @param id The ID of the message to Trash.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesTrash(id: string, userId: string): Promise<Message> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/${ id }/trash`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeMessage(data);
  }

  /**
   * Removes the specified message from the trash.
   *
   * @param id The ID of the message to remove from Trash.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersMessagesUntrash(id: string, userId: string): Promise<Message> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/messages/${ id }/untrash`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeMessage(data);
  }

  /**
   * Creates and configures a client-side encryption identity that's authorized
   * to send mail from the user account. Google publishes the S/MIME certificate
   * to a shared domain-wide directory so that people within a Google Workspace
   * organization can encrypt and send mail to the identity.
   *
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseIdentitiesCreate(userId: string, req: CseIdentity): Promise<CseIdentity> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/identities`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CseIdentity;
  }

  /**
   * Deletes a client-side encryption identity. The authenticated user can no
   * longer use the identity to send encrypted messages. You cannot restore the
   * identity after you delete it. Instead, use the CreateCseIdentity method to
   * create another identity with the same configuration.
   *
   * @param cseEmailAddress The primary email address associated with the client-side encryption identity configuration that's removed.
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseIdentitiesDelete(cseEmailAddress: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/identities/${ cseEmailAddress }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves a client-side encryption identity configuration.
   *
   * @param cseEmailAddress The primary email address associated with the client-side encryption identity configuration that's retrieved.
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseIdentitiesGet(cseEmailAddress: string, userId: string): Promise<CseIdentity> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/identities/${ cseEmailAddress }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CseIdentity;
  }

  /**
   * Lists the client-side encrypted identities for an authenticated user.
   *
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseIdentitiesList(userId: string, opts: UsersSettingsCseIdentitiesListOptions = {}): Promise<ListCseIdentitiesResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/identities`);
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
    return data as ListCseIdentitiesResponse;
  }

  /**
   * Associates a different key pair with an existing client-side encryption
   * identity. The updated key pair must validate against Google's [S/MIME
   * certificate profiles](https://support.google.com/a/answer/7300887).
   *
   * @param emailAddress The email address of the client-side encryption identity to update.
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseIdentitiesPatch(emailAddress: string, userId: string, req: CseIdentity): Promise<CseIdentity> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/identities/${ emailAddress }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as CseIdentity;
  }

  /**
   * Creates and uploads a client-side encryption S/MIME public key certificate
   * chain and private key metadata for the authenticated user.
   *
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseKeypairsCreate(userId: string, req: CseKeyPair): Promise<CseKeyPair> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/keypairs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CseKeyPair;
  }

  /**
   * Turns off a client-side encryption key pair. The authenticated user can no
   * longer use the key pair to decrypt incoming CSE message texts or sign
   * outgoing CSE mail. To regain access, use the EnableCseKeyPair to turn on
   * the key pair. After 30 days, you can permanently delete the key pair by
   * using the ObliterateCseKeyPair method.
   *
   * @param keyPairId The identifier of the key pair to turn off.
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseKeypairsDisable(keyPairId: string, userId: string, req: DisableCseKeyPairRequest): Promise<CseKeyPair> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/keypairs/${ keyPairId }:disable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CseKeyPair;
  }

  /**
   * Turns on a client-side encryption key pair that was turned off. The key
   * pair becomes active again for any associated client-side encryption
   * identities.
   *
   * @param keyPairId The identifier of the key pair to turn on.
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseKeypairsEnable(keyPairId: string, userId: string, req: EnableCseKeyPairRequest): Promise<CseKeyPair> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/keypairs/${ keyPairId }:enable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CseKeyPair;
  }

  /**
   * Retrieves an existing client-side encryption key pair.
   *
   * @param keyPairId The identifier of the key pair to retrieve.
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseKeypairsGet(keyPairId: string, userId: string): Promise<CseKeyPair> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/keypairs/${ keyPairId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CseKeyPair;
  }

  /**
   * Lists client-side encryption key pairs for an authenticated user.
   *
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseKeypairsList(userId: string, opts: UsersSettingsCseKeypairsListOptions = {}): Promise<ListCseKeyPairsResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/keypairs`);
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
    return data as ListCseKeyPairsResponse;
  }

  /**
   * Deletes a client-side encryption key pair permanently and immediately. You
   * can only permanently delete key pairs that have been turned off for more
   * than 30 days. To turn off a key pair, use the DisableCseKeyPair method.
   * Gmail can't restore or decrypt any messages that were encrypted by an
   * obliterated key. Authenticated users and Google Workspace administrators
   * lose access to reading the encrypted messages.
   *
   * @param keyPairId The identifier of the key pair to obliterate.
   * @param userId The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.
   */
  async usersSettingsCseKeypairsObliterate(keyPairId: string, userId: string, req: ObliterateCseKeyPairRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/cse/keypairs/${ keyPairId }:obliterate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Adds a delegate with its verification status set directly to `accepted`,
   * without sending any verification email. The delegate user must be a member
   * of the same Google Workspace organization as the delegator user. Gmail
   * imposes limitations on the number of delegates and delegators each user in
   * a Google Workspace organization can have. These limits depend on your
   * organization, but in general each user can have up to 25 delegates and up
   * to 10 delegators. Note that a delegate user must be referred to by their
   * primary email address, and not an email alias. Also note that when a new
   * delegate is created, there may be up to a one minute delay before the new
   * delegate is available for use. This method is only available to service
   * account clients that have been delegated domain-wide authority.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsDelegatesCreate(userId: string, req: Delegate): Promise<Delegate> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/delegates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Delegate;
  }

  /**
   * Removes the specified delegate (which can be of any verification status),
   * and revokes any verification that may have been required for using it. Note
   * that a delegate user must be referred to by their primary email address,
   * and not an email alias. This method is only available to service account
   * clients that have been delegated domain-wide authority.
   *
   * @param delegateEmail The email address of the user to be removed as a delegate.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsDelegatesDelete(delegateEmail: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/delegates/${ delegateEmail }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified delegate. Note that a delegate user must be referred to
   * by their primary email address, and not an email alias. This method is only
   * available to service account clients that have been delegated domain-wide
   * authority.
   *
   * @param delegateEmail The email address of the user whose delegate relationship is to be retrieved.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsDelegatesGet(delegateEmail: string, userId: string): Promise<Delegate> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/delegates/${ delegateEmail }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Delegate;
  }

  /**
   * Lists the delegates for the specified account. This method is only
   * available to service account clients that have been delegated domain-wide
   * authority.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsDelegatesList(userId: string): Promise<ListDelegatesResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/delegates`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListDelegatesResponse;
  }

  /**
   * Creates a filter. Note: you can only create a maximum of 1,000 filters.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsFiltersCreate(userId: string, req: Filter): Promise<Filter> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/filters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Filter;
  }

  /**
   * Immediately and permanently deletes the specified filter.
   *
   * @param id The ID of the filter to be deleted.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsFiltersDelete(id: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/filters/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a filter.
   *
   * @param id The ID of the filter to be fetched.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsFiltersGet(id: string, userId: string): Promise<Filter> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/filters/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Filter;
  }

  /**
   * Lists the message filters of a Gmail user.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsFiltersList(userId: string): Promise<ListFiltersResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/filters`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListFiltersResponse;
  }

  /**
   * Creates a forwarding address. If ownership verification is required, a
   * message will be sent to the recipient and the resource's verification
   * status will be set to `pending`; otherwise, the resource will be created
   * with verification status set to `accepted`. This method is only available
   * to service account clients that have been delegated domain-wide authority.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsForwardingAddressesCreate(userId: string, req: ForwardingAddress): Promise<ForwardingAddress> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/forwardingAddresses`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ForwardingAddress;
  }

  /**
   * Deletes the specified forwarding address and revokes any verification that
   * may have been required. This method is only available to service account
   * clients that have been delegated domain-wide authority.
   *
   * @param forwardingEmail The forwarding address to be deleted.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsForwardingAddressesDelete(forwardingEmail: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/forwardingAddresses/${ forwardingEmail }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified forwarding address.
   *
   * @param forwardingEmail The forwarding address to be retrieved.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsForwardingAddressesGet(forwardingEmail: string, userId: string): Promise<ForwardingAddress> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/forwardingAddresses/${ forwardingEmail }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ForwardingAddress;
  }

  /**
   * Lists the forwarding addresses for the specified account.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsForwardingAddressesList(userId: string): Promise<ListForwardingAddressesResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/forwardingAddresses`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListForwardingAddressesResponse;
  }

  /**
   * Gets the auto-forwarding setting for the specified account.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsGetAutoForwarding(userId: string): Promise<AutoForwarding> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/autoForwarding`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AutoForwarding;
  }

  /**
   * Gets IMAP settings.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsGetImap(userId: string): Promise<ImapSettings> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/imap`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ImapSettings;
  }

  /**
   * Gets language settings.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsGetLanguage(userId: string): Promise<LanguageSettings> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/language`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LanguageSettings;
  }

  /**
   * Gets POP settings.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsGetPop(userId: string): Promise<PopSettings> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/pop`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PopSettings;
  }

  /**
   * Gets vacation responder settings.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsGetVacation(userId: string): Promise<VacationSettings> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/vacation`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVacationSettings(data);
  }

  /**
   * Creates a custom "from" send-as alias. If an SMTP MSA is specified, Gmail
   * will attempt to connect to the SMTP service to validate the configuration
   * before creating the alias. If ownership verification is required for the
   * alias, a message will be sent to the email address and the resource's
   * verification status will be set to `pending`; otherwise, the resource will
   * be created with verification status set to `accepted`. If a signature is
   * provided, Gmail will sanitize the HTML before saving it with the alias.
   * This method is only available to service account clients that have been
   * delegated domain-wide authority.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsCreate(userId: string, req: SendAs): Promise<SendAs> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SendAs;
  }

  /**
   * Deletes the specified send-as alias. Revokes any verification that may
   * have been required for using it. This method is only available to service
   * account clients that have been delegated domain-wide authority.
   *
   * @param sendAsEmail The send-as alias to be deleted.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsDelete(sendAsEmail: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified send-as alias. Fails with an HTTP 404 error if the
   * specified address is not a member of the collection.
   *
   * @param sendAsEmail The send-as alias to be retrieved.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsGet(sendAsEmail: string, userId: string): Promise<SendAs> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SendAs;
  }

  /**
   * Lists the send-as aliases for the specified account. The result includes
   * the primary send-as address associated with the account as well as any
   * custom "from" aliases.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsList(userId: string): Promise<ListSendAsResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListSendAsResponse;
  }

  /**
   * Patch the specified send-as alias.
   *
   * @param sendAsEmail The send-as alias to be updated.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsPatch(sendAsEmail: string, userId: string, req: SendAs): Promise<SendAs> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SendAs;
  }

  /**
   * Deletes the specified S/MIME config for the specified send-as alias.
   *
   * @param id The immutable ID for the SmimeInfo.
   * @param sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsSmimeInfoDelete(id: string, sendAsEmail: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }/smimeInfo/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified S/MIME config for the specified send-as alias.
   *
   * @param id The immutable ID for the SmimeInfo.
   * @param sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsSmimeInfoGet(id: string, sendAsEmail: string, userId: string): Promise<SmimeInfo> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }/smimeInfo/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSmimeInfo(data);
  }

  /**
   * Insert (upload) the given S/MIME config for the specified send-as alias.
   * Note that pkcs12 format is required for the key.
   *
   * @param sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsSmimeInfoInsert(sendAsEmail: string, userId: string, req: SmimeInfo): Promise<SmimeInfo> {
    req = serializeSmimeInfo(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }/smimeInfo`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSmimeInfo(data);
  }

  /**
   * Lists S/MIME configs for the specified send-as alias.
   *
   * @param sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsSmimeInfoList(sendAsEmail: string, userId: string): Promise<ListSmimeInfoResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }/smimeInfo`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListSmimeInfoResponse(data);
  }

  /**
   * Sets the default S/MIME config for the specified send-as alias.
   *
   * @param id The immutable ID for the SmimeInfo.
   * @param sendAsEmail The email address that appears in the "From:" header for mail sent using this alias.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsSmimeInfoSetDefault(id: string, sendAsEmail: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }/smimeInfo/${ id }/setDefault`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Updates a send-as alias. If a signature is provided, Gmail will sanitize
   * the HTML before saving it with the alias. Addresses other than the primary
   * address for the account can only be updated by service account clients that
   * have been delegated domain-wide authority.
   *
   * @param sendAsEmail The send-as alias to be updated.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsUpdate(sendAsEmail: string, userId: string, req: SendAs): Promise<SendAs> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as SendAs;
  }

  /**
   * Sends a verification email to the specified send-as alias address. The
   * verification status must be `pending`. This method is only available to
   * service account clients that have been delegated domain-wide authority.
   *
   * @param sendAsEmail The send-as alias to be verified.
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsSendAsVerify(sendAsEmail: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/sendAs/${ sendAsEmail }/verify`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Updates the auto-forwarding setting for the specified account. A verified
   * forwarding address must be specified when auto-forwarding is enabled. This
   * method is only available to service account clients that have been
   * delegated domain-wide authority.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsUpdateAutoForwarding(userId: string, req: AutoForwarding): Promise<AutoForwarding> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/autoForwarding`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as AutoForwarding;
  }

  /**
   * Updates IMAP settings.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsUpdateImap(userId: string, req: ImapSettings): Promise<ImapSettings> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/imap`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ImapSettings;
  }

  /**
   * Updates language settings. If successful, the return object contains the
   * `displayLanguage` that was saved for the user, which may differ from the
   * value passed into the request. This is because the requested
   * `displayLanguage` may not be directly supported by Gmail but have a close
   * variant that is, and so the variant may be chosen and saved instead.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsUpdateLanguage(userId: string, req: LanguageSettings): Promise<LanguageSettings> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/language`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as LanguageSettings;
  }

  /**
   * Updates POP settings.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsUpdatePop(userId: string, req: PopSettings): Promise<PopSettings> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/pop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as PopSettings;
  }

  /**
   * Updates vacation responder settings.
   *
   * @param userId User's email address. The special value "me" can be used to indicate the authenticated user.
   */
  async usersSettingsUpdateVacation(userId: string, req: VacationSettings): Promise<VacationSettings> {
    req = serializeVacationSettings(req);
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/settings/vacation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeVacationSettings(data);
  }

  /**
   * Stop receiving push notifications for the given user mailbox.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersStop(userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/stop`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Immediately and permanently deletes the specified thread. Any messages
   * that belong to the thread are also deleted. This operation cannot be
   * undone. Prefer `threads.trash` instead.
   *
   * @param id ID of the Thread to delete.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersThreadsDelete(id: string, userId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/threads/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets the specified thread.
   *
   * @param id The ID of the thread to retrieve.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersThreadsGet(id: string, userId: string, opts: UsersThreadsGetOptions = {}): Promise<Thread> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/threads/${ id }`);
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
    }
    if (opts.metadataHeaders !== undefined) {
      url.searchParams.append("metadataHeaders", String(opts.metadataHeaders));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeThread(data);
  }

  /**
   * Lists the threads in the user's mailbox.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersThreadsList(userId: string, opts: UsersThreadsListOptions = {}): Promise<ListThreadsResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/threads`);
    if (opts.includeSpamTrash !== undefined) {
      url.searchParams.append("includeSpamTrash", String(opts.includeSpamTrash));
    }
    if (opts.labelIds !== undefined) {
      url.searchParams.append("labelIds", String(opts.labelIds));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListThreadsResponse(data);
  }

  /**
   * Modifies the labels applied to the thread. This applies to all messages in
   * the thread.
   *
   * @param id The ID of the thread to modify.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersThreadsModify(id: string, userId: string, req: ModifyThreadRequest): Promise<Thread> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/threads/${ id }/modify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeThread(data);
  }

  /**
   * Moves the specified thread to the trash. Any messages that belong to the
   * thread are also moved to the trash.
   *
   * @param id The ID of the thread to Trash.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersThreadsTrash(id: string, userId: string): Promise<Thread> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/threads/${ id }/trash`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeThread(data);
  }

  /**
   * Removes the specified thread from the trash. Any messages that belong to
   * the thread are also removed from the trash.
   *
   * @param id The ID of the thread to remove from Trash.
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersThreadsUntrash(id: string, userId: string): Promise<Thread> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/threads/${ id }/untrash`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeThread(data);
  }

  /**
   * Set up or update a push notification watch on the given user mailbox.
   *
   * @param userId The user's email address. The special value `me` can be used to indicate the authenticated user.
   */
  async usersWatch(userId: string, req: WatchRequest): Promise<WatchResponse> {
    const url = new URL(`${this.#baseUrl}gmail/v1/users/${ userId }/watch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeWatchResponse(data);
  }
}

/**
 * Auto-forwarding settings for an account.
 */
export interface AutoForwarding {
  /**
   * The state that a message should be left in after it has been forwarded.
   */
  disposition?:  | "dispositionUnspecified" | "leaveInInbox" | "archive" | "trash" | "markRead";
  /**
   * Email address to which all incoming messages are forwarded. This email
   * address must be a verified member of the forwarding addresses.
   */
  emailAddress?: string;
  /**
   * Whether all incoming mail is automatically forwarded to another address.
   */
  enabled?: boolean;
}

export interface BatchDeleteMessagesRequest {
  /**
   * The IDs of the messages to delete.
   */
  ids?: string[];
}

export interface BatchModifyMessagesRequest {
  /**
   * A list of label IDs to add to messages.
   */
  addLabelIds?: string[];
  /**
   * The IDs of the messages to modify. There is a limit of 1000 ids per
   * request.
   */
  ids?: string[];
  /**
   * A list of label IDs to remove from messages.
   */
  removeLabelIds?: string[];
}

/**
 * The client-side encryption (CSE) configuration for the email address of an
 * authenticated user. Gmail uses CSE configurations to save drafts of
 * client-side encrypted email messages, and to sign and send encrypted email
 * messages.
 */
export interface CseIdentity {
  /**
   * The email address for the sending identity. The email address must be the
   * primary email address of the authenticated user.
   */
  emailAddress?: string;
  /**
   * If a key pair is associated, the identifier of the key pair, CseKeyPair.
   */
  primaryKeyPairId?: string;
}

/**
 * A client-side encryption S/MIME key pair, which is comprised of a public
 * key, its certificate chain, and metadata for its paired private key. Gmail
 * uses the key pair to complete the following tasks: - Sign outgoing
 * client-side encrypted messages. - Save and reopen drafts of client-side
 * encrypted messages. - Save and reopen sent messages. - Decrypt incoming or
 * archived S/MIME messages.
 */
export interface CseKeyPair {
  /**
   * Output only. If a key pair is set to `DISABLED`, the time that the key
   * pair's state changed from `ENABLED` to `DISABLED`. This field is present
   * only when the key pair is in state `DISABLED`.
   */
  readonly disableTime?: Date;
  /**
   * Output only. The current state of the key pair.
   */
  readonly enablementState?:  | "stateUnspecified" | "enabled" | "disabled";
  /**
   * Output only. The immutable ID for the client-side encryption S/MIME key
   * pair.
   */
  readonly keyPairId?: string;
  /**
   * Output only. The public key and its certificate chain, in
   * [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) format.
   */
  readonly pem?: string;
  /**
   * Input only. The public key and its certificate chain. The chain must be in
   * [PKCS#7](https://en.wikipedia.org/wiki/PKCS_7) format and use PEM encoding
   * and ASCII armor.
   */
  pkcs7?: string;
  /**
   * Metadata for instances of this key pair's private key.
   */
  privateKeyMetadata?: CsePrivateKeyMetadata[];
  /**
   * Output only. The email address identities that are specified on the leaf
   * certificate.
   */
  readonly subjectEmailAddresses?: string[];
}

/**
 * Metadata for a private key instance.
 */
export interface CsePrivateKeyMetadata {
  /**
   * Metadata for a private key instance managed by an external key access
   * control list service.
   */
  kaclsKeyMetadata?: KaclsKeyMetadata;
  /**
   * Output only. The immutable ID for the private key metadata instance.
   */
  readonly privateKeyMetadataId?: string;
}

/**
 * Settings for a delegate. Delegates can read, send, and delete messages, as
 * well as view and add contacts, for the delegator's account. See "Set up mail
 * delegation" for more information about delegates.
 */
export interface Delegate {
  /**
   * The email address of the delegate.
   */
  delegateEmail?: string;
  /**
   * Indicates whether this address has been verified and can act as a delegate
   * for the account. Read-only.
   */
  verificationStatus?:  | "verificationStatusUnspecified" | "accepted" | "pending" | "rejected" | "expired";
}

/**
 * Requests to turn off a client-side encryption key pair.
 */
export interface DisableCseKeyPairRequest {
}

/**
 * A draft email in the user's mailbox.
 */
export interface Draft {
  /**
   * The immutable ID of the draft.
   */
  id?: string;
  /**
   * The message content of the draft.
   */
  message?: Message;
}

function serializeDraft(data: any): Draft {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeDraft(data: any): Draft {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

/**
 * Requests to turn on a client-side encryption key pair.
 */
export interface EnableCseKeyPairRequest {
}

/**
 * Resource definition for Gmail filters. Filters apply to specific messages
 * instead of an entire email thread.
 */
export interface Filter {
  /**
   * Action that the filter performs.
   */
  action?: FilterAction;
  /**
   * Matching criteria for the filter.
   */
  criteria?: FilterCriteria;
  /**
   * The server assigned ID of the filter.
   */
  id?: string;
}

/**
 * A set of actions to perform on a message.
 */
export interface FilterAction {
  /**
   * List of labels to add to the message.
   */
  addLabelIds?: string[];
  /**
   * Email address that the message should be forwarded to.
   */
  forward?: string;
  /**
   * List of labels to remove from the message.
   */
  removeLabelIds?: string[];
}

/**
 * Message matching criteria.
 */
export interface FilterCriteria {
  /**
   * Whether the response should exclude chats.
   */
  excludeChats?: boolean;
  /**
   * The sender's display name or email address.
   */
  from?: string;
  /**
   * Whether the message has any attachment.
   */
  hasAttachment?: boolean;
  /**
   * Only return messages not matching the specified query. Supports the same
   * query format as the Gmail search box. For example,
   * `"from:someuser@example.com rfc822msgid: is:unread"`.
   */
  negatedQuery?: string;
  /**
   * Only return messages matching the specified query. Supports the same query
   * format as the Gmail search box. For example, `"from:someuser@example.com
   * rfc822msgid: is:unread"`.
   */
  query?: string;
  /**
   * The size of the entire RFC822 message in bytes, including all headers and
   * attachments.
   */
  size?: number;
  /**
   * How the message size in bytes should be in relation to the size field.
   */
  sizeComparison?:  | "unspecified" | "smaller" | "larger";
  /**
   * Case-insensitive phrase found in the message's subject. Trailing and
   * leading whitespace are be trimmed and adjacent spaces are collapsed.
   */
  subject?: string;
  /**
   * The recipient's display name or email address. Includes recipients in the
   * "to", "cc", and "bcc" header fields. You can use simply the local part of
   * the email address. For example, "example" and "example@" both match
   * "example@gmail.com". This field is case-insensitive.
   */
  to?: string;
}

/**
 * Settings for a forwarding address.
 */
export interface ForwardingAddress {
  /**
   * An email address to which messages can be forwarded.
   */
  forwardingEmail?: string;
  /**
   * Indicates whether this address has been verified and is usable for
   * forwarding. Read-only.
   */
  verificationStatus?:  | "verificationStatusUnspecified" | "accepted" | "pending";
}

/**
 * A record of a change to the user's mailbox. Each history change may affect
 * multiple messages in multiple ways.
 */
export interface History {
  /**
   * The mailbox sequence ID.
   */
  id?: bigint;
  /**
   * Labels added to messages in this history record.
   */
  labelsAdded?: HistoryLabelAdded[];
  /**
   * Labels removed from messages in this history record.
   */
  labelsRemoved?: HistoryLabelRemoved[];
  /**
   * List of messages changed in this history record. The fields for specific
   * change types, such as `messagesAdded` may duplicate messages in this field.
   * We recommend using the specific change-type fields instead of this.
   */
  messages?: Message[];
  /**
   * Messages added to the mailbox in this history record.
   */
  messagesAdded?: HistoryMessageAdded[];
  /**
   * Messages deleted (not Trashed) from the mailbox in this history record.
   */
  messagesDeleted?: HistoryMessageDeleted[];
}

function serializeHistory(data: any): History {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    labelsAdded: data["labelsAdded"] !== undefined ? data["labelsAdded"].map((item: any) => (serializeHistoryLabelAdded(item))) : undefined,
    labelsRemoved: data["labelsRemoved"] !== undefined ? data["labelsRemoved"].map((item: any) => (serializeHistoryLabelRemoved(item))) : undefined,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (serializeMessage(item))) : undefined,
    messagesAdded: data["messagesAdded"] !== undefined ? data["messagesAdded"].map((item: any) => (serializeHistoryMessageAdded(item))) : undefined,
    messagesDeleted: data["messagesDeleted"] !== undefined ? data["messagesDeleted"].map((item: any) => (serializeHistoryMessageDeleted(item))) : undefined,
  };
}

function deserializeHistory(data: any): History {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    labelsAdded: data["labelsAdded"] !== undefined ? data["labelsAdded"].map((item: any) => (deserializeHistoryLabelAdded(item))) : undefined,
    labelsRemoved: data["labelsRemoved"] !== undefined ? data["labelsRemoved"].map((item: any) => (deserializeHistoryLabelRemoved(item))) : undefined,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (deserializeMessage(item))) : undefined,
    messagesAdded: data["messagesAdded"] !== undefined ? data["messagesAdded"].map((item: any) => (deserializeHistoryMessageAdded(item))) : undefined,
    messagesDeleted: data["messagesDeleted"] !== undefined ? data["messagesDeleted"].map((item: any) => (deserializeHistoryMessageDeleted(item))) : undefined,
  };
}

export interface HistoryLabelAdded {
  /**
   * Label IDs added to the message.
   */
  labelIds?: string[];
  message?: Message;
}

function serializeHistoryLabelAdded(data: any): HistoryLabelAdded {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeHistoryLabelAdded(data: any): HistoryLabelAdded {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

export interface HistoryLabelRemoved {
  /**
   * Label IDs removed from the message.
   */
  labelIds?: string[];
  message?: Message;
}

function serializeHistoryLabelRemoved(data: any): HistoryLabelRemoved {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeHistoryLabelRemoved(data: any): HistoryLabelRemoved {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

export interface HistoryMessageAdded {
  message?: Message;
}

function serializeHistoryMessageAdded(data: any): HistoryMessageAdded {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeHistoryMessageAdded(data: any): HistoryMessageAdded {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

export interface HistoryMessageDeleted {
  message?: Message;
}

function serializeHistoryMessageDeleted(data: any): HistoryMessageDeleted {
  return {
    ...data,
    message: data["message"] !== undefined ? serializeMessage(data["message"]) : undefined,
  };
}

function deserializeHistoryMessageDeleted(data: any): HistoryMessageDeleted {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializeMessage(data["message"]) : undefined,
  };
}

/**
 * IMAP settings for an account.
 */
export interface ImapSettings {
  /**
   * If this value is true, Gmail will immediately expunge a message when it is
   * marked as deleted in IMAP. Otherwise, Gmail will wait for an update from
   * the client before expunging messages marked as deleted.
   */
  autoExpunge?: boolean;
  /**
   * Whether IMAP is enabled for the account.
   */
  enabled?: boolean;
  /**
   * The action that will be executed on a message when it is marked as deleted
   * and expunged from the last visible IMAP folder.
   */
  expungeBehavior?:  | "expungeBehaviorUnspecified" | "archive" | "trash" | "deleteForever";
  /**
   * An optional limit on the number of messages that an IMAP folder may
   * contain. Legal values are 0, 1000, 2000, 5000 or 10000. A value of zero is
   * interpreted to mean that there is no limit.
   */
  maxFolderSize?: number;
}

/**
 * Metadata for private keys managed by an external key access control list
 * service. For details about managing key access, see [Google Workspace CSE API
 * Reference](https://developers.google.com/workspace/cse/reference).
 */
export interface KaclsKeyMetadata {
  /**
   * Opaque data generated and used by the key access control list service.
   * Maximum size: 8 KiB.
   */
  kaclsData?: string;
  /**
   * The URI of the key access control list service that manages the private
   * key.
   */
  kaclsUri?: string;
}

/**
 * Labels are used to categorize messages and threads within the user's
 * mailbox. The maximum number of labels supported for a user's mailbox is
 * 10,000.
 */
export interface Label {
  /**
   * The color to assign to the label. Color is only available for labels that
   * have their `type` set to `user`.
   */
  color?: LabelColor;
  /**
   * The immutable ID of the label.
   */
  id?: string;
  /**
   * The visibility of the label in the label list in the Gmail web interface.
   */
  labelListVisibility?:  | "labelShow" | "labelShowIfUnread" | "labelHide";
  /**
   * The visibility of messages with this label in the message list in the
   * Gmail web interface.
   */
  messageListVisibility?:  | "show" | "hide";
  /**
   * The total number of messages with the label.
   */
  messagesTotal?: number;
  /**
   * The number of unread messages with the label.
   */
  messagesUnread?: number;
  /**
   * The display name of the label.
   */
  name?: string;
  /**
   * The total number of threads with the label.
   */
  threadsTotal?: number;
  /**
   * The number of unread threads with the label.
   */
  threadsUnread?: number;
  /**
   * The owner type for the label. User labels are created by the user and can
   * be modified and deleted by the user and can be applied to any message or
   * thread. System labels are internally created and cannot be added, modified,
   * or deleted. System labels may be able to be applied to or removed from
   * messages and threads under some circumstances but this is not guaranteed.
   * For example, users can apply and remove the `INBOX` and `UNREAD` labels
   * from messages and threads, but cannot apply or remove the `DRAFTS` or
   * `SENT` labels from messages or threads.
   */
  type?:  | "system" | "user";
}

export interface LabelColor {
  /**
   * The background color represented as hex string #RRGGBB (ex #000000). This
   * field is required in order to set the color of a label. Only the following
   * predefined set of color values are allowed: \#000000, #434343, #666666,
   * #999999, #cccccc, #efefef, #f3f3f3, #ffffff, \#fb4c2f, #ffad47, #fad165,
   * #16a766, #43d692, #4a86e8, #a479e2, #f691b3, \#f6c5be, #ffe6c7, #fef1d1,
   * #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, \#efa093, #ffd6a2, #fce8b3,
   * #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, \#e66550, #ffbc6b, #fcda83,
   * #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, \#cc3a21, #eaa041, #f2c960,
   * #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, \#ac2b16, #cf8933, #d5ae49,
   * #0b804b, #2a9c68, #285bac, #653e9b, #b65775, \#822111, #a46a21, #aa8831,
   * #076239, #1a764d, #1c4587, #41236d, #83334c \#464646, #e7e7e7, #0d3472,
   * #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, \#711a36, #fbd3e0, #8a1c0a,
   * #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, \#594c05, #fbe983, #684e07,
   * #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, \#c2c2c2, #4986e7, #2da2bb,
   * #b99aff, #994a64, #f691b2, #ff7537, #ffad46, \#662e37, #ebdbde, #cca6ac,
   * #094228, #42d692, #16a765
   */
  backgroundColor?: string;
  /**
   * The text color of the label, represented as hex string. This field is
   * required in order to set the color of a label. Only the following
   * predefined set of color values are allowed: \#000000, #434343, #666666,
   * #999999, #cccccc, #efefef, #f3f3f3, #ffffff, \#fb4c2f, #ffad47, #fad165,
   * #16a766, #43d692, #4a86e8, #a479e2, #f691b3, \#f6c5be, #ffe6c7, #fef1d1,
   * #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, \#efa093, #ffd6a2, #fce8b3,
   * #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, \#e66550, #ffbc6b, #fcda83,
   * #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, \#cc3a21, #eaa041, #f2c960,
   * #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, \#ac2b16, #cf8933, #d5ae49,
   * #0b804b, #2a9c68, #285bac, #653e9b, #b65775, \#822111, #a46a21, #aa8831,
   * #076239, #1a764d, #1c4587, #41236d, #83334c \#464646, #e7e7e7, #0d3472,
   * #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, \#711a36, #fbd3e0, #8a1c0a,
   * #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, \#594c05, #fbe983, #684e07,
   * #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, \#c2c2c2, #4986e7, #2da2bb,
   * #b99aff, #994a64, #f691b2, #ff7537, #ffad46, \#662e37, #ebdbde, #cca6ac,
   * #094228, #42d692, #16a765
   */
  textColor?: string;
}

/**
 * Language settings for an account. These settings correspond to the "Language
 * settings" feature in the web interface.
 */
export interface LanguageSettings {
  /**
   * The language to display Gmail in, formatted as an RFC 3066 Language Tag
   * (for example `en-GB`, `fr` or `ja` for British English, French, or Japanese
   * respectively). The set of languages supported by Gmail evolves over time,
   * so please refer to the "Language" dropdown in the Gmail settings for all
   * available options, as described in the language settings help article. A
   * table of sample values is also provided in the Managing Language Settings
   * guide Not all Gmail clients can display the same set of languages. In the
   * case that a user's display language is not available for use on a
   * particular client, said client automatically chooses to display in the
   * closest supported variant (or a reasonable default).
   */
  displayLanguage?: string;
}

export interface ListCseIdentitiesResponse {
  /**
   * One page of the list of CSE identities configured for the user.
   */
  cseIdentities?: CseIdentity[];
  /**
   * Pagination token to be passed to a subsequent ListCseIdentities call in
   * order to retrieve the next page of identities. If this value is not
   * returned or is the empty string, then no further pages remain.
   */
  nextPageToken?: string;
}

export interface ListCseKeyPairsResponse {
  /**
   * One page of the list of CSE key pairs installed for the user.
   */
  cseKeyPairs?: CseKeyPair[];
  /**
   * Pagination token to be passed to a subsequent ListCseKeyPairs call in
   * order to retrieve the next page of key pairs. If this value is not
   * returned, then no further pages remain.
   */
  nextPageToken?: string;
}

/**
 * Response for the ListDelegates method.
 */
export interface ListDelegatesResponse {
  /**
   * List of the user's delegates (with any verification status). If an account
   * doesn't have delegates, this field doesn't appear.
   */
  delegates?: Delegate[];
}

export interface ListDraftsResponse {
  /**
   * List of drafts. Note that the `Message` property in each `Draft` resource
   * only contains an `id` and a `threadId`. The messages.get method can fetch
   * additional message details.
   */
  drafts?: Draft[];
  /**
   * Token to retrieve the next page of results in the list.
   */
  nextPageToken?: string;
  /**
   * Estimated total number of results.
   */
  resultSizeEstimate?: number;
}

function serializeListDraftsResponse(data: any): ListDraftsResponse {
  return {
    ...data,
    drafts: data["drafts"] !== undefined ? data["drafts"].map((item: any) => (serializeDraft(item))) : undefined,
  };
}

function deserializeListDraftsResponse(data: any): ListDraftsResponse {
  return {
    ...data,
    drafts: data["drafts"] !== undefined ? data["drafts"].map((item: any) => (deserializeDraft(item))) : undefined,
  };
}

/**
 * Response for the ListFilters method.
 */
export interface ListFiltersResponse {
  /**
   * List of a user's filters.
   */
  filter?: Filter[];
}

/**
 * Response for the ListForwardingAddresses method.
 */
export interface ListForwardingAddressesResponse {
  /**
   * List of addresses that may be used for forwarding.
   */
  forwardingAddresses?: ForwardingAddress[];
}

export interface ListHistoryResponse {
  /**
   * List of history records. Any `messages` contained in the response will
   * typically only have `id` and `threadId` fields populated.
   */
  history?: History[];
  /**
   * The ID of the mailbox's current history record.
   */
  historyId?: bigint;
  /**
   * Page token to retrieve the next page of results in the list.
   */
  nextPageToken?: string;
}

function serializeListHistoryResponse(data: any): ListHistoryResponse {
  return {
    ...data,
    history: data["history"] !== undefined ? data["history"].map((item: any) => (serializeHistory(item))) : undefined,
    historyId: data["historyId"] !== undefined ? String(data["historyId"]) : undefined,
  };
}

function deserializeListHistoryResponse(data: any): ListHistoryResponse {
  return {
    ...data,
    history: data["history"] !== undefined ? data["history"].map((item: any) => (deserializeHistory(item))) : undefined,
    historyId: data["historyId"] !== undefined ? BigInt(data["historyId"]) : undefined,
  };
}

export interface ListLabelsResponse {
  /**
   * List of labels. Note that each label resource only contains an `id`,
   * `name`, `messageListVisibility`, `labelListVisibility`, and `type`. The
   * labels.get method can fetch additional label details.
   */
  labels?: Label[];
}

export interface ListMessagesResponse {
  /**
   * List of messages. Note that each message resource contains only an `id`
   * and a `threadId`. Additional message details can be fetched using the
   * messages.get method.
   */
  messages?: Message[];
  /**
   * Token to retrieve the next page of results in the list.
   */
  nextPageToken?: string;
  /**
   * Estimated total number of results.
   */
  resultSizeEstimate?: number;
}

function serializeListMessagesResponse(data: any): ListMessagesResponse {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (serializeMessage(item))) : undefined,
  };
}

function deserializeListMessagesResponse(data: any): ListMessagesResponse {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (deserializeMessage(item))) : undefined,
  };
}

/**
 * Response for the ListSendAs method.
 */
export interface ListSendAsResponse {
  /**
   * List of send-as aliases.
   */
  sendAs?: SendAs[];
}

export interface ListSmimeInfoResponse {
  /**
   * List of SmimeInfo.
   */
  smimeInfo?: SmimeInfo[];
}

function serializeListSmimeInfoResponse(data: any): ListSmimeInfoResponse {
  return {
    ...data,
    smimeInfo: data["smimeInfo"] !== undefined ? data["smimeInfo"].map((item: any) => (serializeSmimeInfo(item))) : undefined,
  };
}

function deserializeListSmimeInfoResponse(data: any): ListSmimeInfoResponse {
  return {
    ...data,
    smimeInfo: data["smimeInfo"] !== undefined ? data["smimeInfo"].map((item: any) => (deserializeSmimeInfo(item))) : undefined,
  };
}

export interface ListThreadsResponse {
  /**
   * Page token to retrieve the next page of results in the list.
   */
  nextPageToken?: string;
  /**
   * Estimated total number of results.
   */
  resultSizeEstimate?: number;
  /**
   * List of threads. Note that each thread resource does not contain a list of
   * `messages`. The list of `messages` for a given thread can be fetched using
   * the threads.get method.
   */
  threads?: Thread[];
}

function serializeListThreadsResponse(data: any): ListThreadsResponse {
  return {
    ...data,
    threads: data["threads"] !== undefined ? data["threads"].map((item: any) => (serializeThread(item))) : undefined,
  };
}

function deserializeListThreadsResponse(data: any): ListThreadsResponse {
  return {
    ...data,
    threads: data["threads"] !== undefined ? data["threads"].map((item: any) => (deserializeThread(item))) : undefined,
  };
}

/**
 * An email message.
 */
export interface Message {
  /**
   * The ID of the last history record that modified this message.
   */
  historyId?: bigint;
  /**
   * The immutable ID of the message.
   */
  id?: string;
  /**
   * The internal message creation timestamp (epoch ms), which determines
   * ordering in the inbox. For normal SMTP-received email, this represents the
   * time the message was originally accepted by Google, which is more reliable
   * than the `Date` header. However, for API-migrated mail, it can be
   * configured by client to be based on the `Date` header.
   */
  internalDate?: bigint;
  /**
   * List of IDs of labels applied to this message.
   */
  labelIds?: string[];
  /**
   * The parsed email structure in the message parts.
   */
  payload?: MessagePart;
  /**
   * The entire email message in an RFC 2822 formatted and base64url encoded
   * string. Returned in `messages.get` and `drafts.get` responses when the
   * `format=RAW` parameter is supplied.
   */
  raw?: Uint8Array;
  /**
   * Estimated size in bytes of the message.
   */
  sizeEstimate?: number;
  /**
   * A short part of the message text.
   */
  snippet?: string;
  /**
   * The ID of the thread the message belongs to. To add a message or draft to
   * a thread, the following criteria must be met: 1. The requested `threadId`
   * must be specified on the `Message` or `Draft.Message` you supply with your
   * request. 2. The `References` and `In-Reply-To` headers must be set in
   * compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822)
   * standard. 3. The `Subject` headers must match.
   */
  threadId?: string;
}

function serializeMessage(data: any): Message {
  return {
    ...data,
    historyId: data["historyId"] !== undefined ? String(data["historyId"]) : undefined,
    internalDate: data["internalDate"] !== undefined ? String(data["internalDate"]) : undefined,
    payload: data["payload"] !== undefined ? serializeMessagePart(data["payload"]) : undefined,
    raw: data["raw"] !== undefined ? encodeBase64(data["raw"]) : undefined,
  };
}

function deserializeMessage(data: any): Message {
  return {
    ...data,
    historyId: data["historyId"] !== undefined ? BigInt(data["historyId"]) : undefined,
    internalDate: data["internalDate"] !== undefined ? BigInt(data["internalDate"]) : undefined,
    payload: data["payload"] !== undefined ? deserializeMessagePart(data["payload"]) : undefined,
    raw: data["raw"] !== undefined ? decodeBase64(data["raw"] as string) : undefined,
  };
}

/**
 * A single MIME message part.
 */
export interface MessagePart {
  /**
   * The message part body for this part, which may be empty for container MIME
   * message parts.
   */
  body?: MessagePartBody;
  /**
   * The filename of the attachment. Only present if this message part
   * represents an attachment.
   */
  filename?: string;
  /**
   * List of headers on this message part. For the top-level message part,
   * representing the entire message payload, it will contain the standard RFC
   * 2822 email headers such as `To`, `From`, and `Subject`.
   */
  headers?: MessagePartHeader[];
  /**
   * The MIME type of the message part.
   */
  mimeType?: string;
  /**
   * The immutable ID of the message part.
   */
  partId?: string;
  /**
   * The child MIME message parts of this part. This only applies to container
   * MIME message parts, for example `multipart/*`. For non- container MIME
   * message part types, such as `text/plain`, this field is empty. For more
   * information, see RFC 1521.
   */
  parts?: MessagePart[];
}

function serializeMessagePart(data: any): MessagePart {
  return {
    ...data,
    body: data["body"] !== undefined ? serializeMessagePartBody(data["body"]) : undefined,
    parts: data["parts"] !== undefined ? data["parts"].map((item: any) => (serializeMessagePart(item))) : undefined,
  };
}

function deserializeMessagePart(data: any): MessagePart {
  return {
    ...data,
    body: data["body"] !== undefined ? deserializeMessagePartBody(data["body"]) : undefined,
    parts: data["parts"] !== undefined ? data["parts"].map((item: any) => (deserializeMessagePart(item))) : undefined,
  };
}

/**
 * The body of a single MIME message part.
 */
export interface MessagePartBody {
  /**
   * When present, contains the ID of an external attachment that can be
   * retrieved in a separate `messages.attachments.get` request. When not
   * present, the entire content of the message part body is contained in the
   * data field.
   */
  attachmentId?: string;
  /**
   * The body data of a MIME message part as a base64url encoded string. May be
   * empty for MIME container types that have no message body or when the body
   * data is sent as a separate attachment. An attachment ID is present if the
   * body data is contained in a separate attachment.
   */
  data?: Uint8Array;
  /**
   * Number of bytes for the message part data (encoding notwithstanding).
   */
  size?: number;
}

function serializeMessagePartBody(data: any): MessagePartBody {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeMessagePartBody(data: any): MessagePartBody {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

export interface MessagePartHeader {
  /**
   * The name of the header before the `:` separator. For example, `To`.
   */
  name?: string;
  /**
   * The value of the header after the `:` separator. For example,
   * `someuser@example.com`.
   */
  value?: string;
}

export interface ModifyMessageRequest {
  /**
   * A list of IDs of labels to add to this message. You can add up to 100
   * labels with each update.
   */
  addLabelIds?: string[];
  /**
   * A list IDs of labels to remove from this message. You can remove up to 100
   * labels with each update.
   */
  removeLabelIds?: string[];
}

export interface ModifyThreadRequest {
  /**
   * A list of IDs of labels to add to this thread. You can add up to 100
   * labels with each update.
   */
  addLabelIds?: string[];
  /**
   * A list of IDs of labels to remove from this thread. You can remove up to
   * 100 labels with each update.
   */
  removeLabelIds?: string[];
}

/**
 * Request to obliterate a CSE key pair.
 */
export interface ObliterateCseKeyPairRequest {
}

/**
 * POP settings for an account.
 */
export interface PopSettings {
  /**
   * The range of messages which are accessible via POP.
   */
  accessWindow?:  | "accessWindowUnspecified" | "disabled" | "fromNowOn" | "allMail";
  /**
   * The action that will be executed on a message after it has been fetched
   * via POP.
   */
  disposition?:  | "dispositionUnspecified" | "leaveInInbox" | "archive" | "trash" | "markRead";
}

/**
 * Profile for a Gmail user.
 */
export interface Profile {
  /**
   * The user's email address.
   */
  emailAddress?: string;
  /**
   * The ID of the mailbox's current history record.
   */
  historyId?: bigint;
  /**
   * The total number of messages in the mailbox.
   */
  messagesTotal?: number;
  /**
   * The total number of threads in the mailbox.
   */
  threadsTotal?: number;
}

function serializeProfile(data: any): Profile {
  return {
    ...data,
    historyId: data["historyId"] !== undefined ? String(data["historyId"]) : undefined,
  };
}

function deserializeProfile(data: any): Profile {
  return {
    ...data,
    historyId: data["historyId"] !== undefined ? BigInt(data["historyId"]) : undefined,
  };
}

/**
 * Settings associated with a send-as alias, which can be either the primary
 * login address associated with the account or a custom "from" address. Send-as
 * aliases correspond to the "Send Mail As" feature in the web interface.
 */
export interface SendAs {
  /**
   * A name that appears in the "From:" header for mail sent using this alias.
   * For custom "from" addresses, when this is empty, Gmail will populate the
   * "From:" header with the name that is used for the primary address
   * associated with the account. If the admin has disabled the ability for
   * users to update their name format, requests to update this field for the
   * primary login will silently fail.
   */
  displayName?: string;
  /**
   * Whether this address is selected as the default "From:" address in
   * situations such as composing a new message or sending a vacation
   * auto-reply. Every Gmail account has exactly one default send-as address, so
   * the only legal value that clients may write to this field is `true`.
   * Changing this from `false` to `true` for an address will result in this
   * field becoming `false` for the other previous default address.
   */
  isDefault?: boolean;
  /**
   * Whether this address is the primary address used to login to the account.
   * Every Gmail account has exactly one primary address, and it cannot be
   * deleted from the collection of send-as aliases. This field is read-only.
   */
  isPrimary?: boolean;
  /**
   * An optional email address that is included in a "Reply-To:" header for
   * mail sent using this alias. If this is empty, Gmail will not generate a
   * "Reply-To:" header.
   */
  replyToAddress?: string;
  /**
   * The email address that appears in the "From:" header for mail sent using
   * this alias. This is read-only for all operations except create.
   */
  sendAsEmail?: string;
  /**
   * An optional HTML signature that is included in messages composed with this
   * alias in the Gmail web UI. This signature is added to new emails only.
   */
  signature?: string;
  /**
   * An optional SMTP service that will be used as an outbound relay for mail
   * sent using this alias. If this is empty, outbound mail will be sent
   * directly from Gmail's servers to the destination SMTP service. This setting
   * only applies to custom "from" aliases.
   */
  smtpMsa?: SmtpMsa;
  /**
   * Whether Gmail should treat this address as an alias for the user's primary
   * email address. This setting only applies to custom "from" aliases.
   */
  treatAsAlias?: boolean;
  /**
   * Indicates whether this address has been verified for use as a send-as
   * alias. Read-only. This setting only applies to custom "from" aliases.
   */
  verificationStatus?:  | "verificationStatusUnspecified" | "accepted" | "pending";
}

/**
 * An S/MIME email config.
 */
export interface SmimeInfo {
  /**
   * Encrypted key password, when key is encrypted.
   */
  encryptedKeyPassword?: string;
  /**
   * When the certificate expires (in milliseconds since epoch).
   */
  expiration?: bigint;
  /**
   * The immutable ID for the SmimeInfo.
   */
  id?: string;
  /**
   * Whether this SmimeInfo is the default one for this user's send-as address.
   */
  isDefault?: boolean;
  /**
   * The S/MIME certificate issuer's common name.
   */
  issuerCn?: string;
  /**
   * PEM formatted X509 concatenated certificate string (standard base64
   * encoding). Format used for returning key, which includes public key as well
   * as certificate chain (not private key).
   */
  pem?: string;
  /**
   * PKCS#12 format containing a single private/public key pair and certificate
   * chain. This format is only accepted from client for creating a new
   * SmimeInfo and is never returned, because the private key is not intended to
   * be exported. PKCS#12 may be encrypted, in which case encryptedKeyPassword
   * should be set appropriately.
   */
  pkcs12?: Uint8Array;
}

function serializeSmimeInfo(data: any): SmimeInfo {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? String(data["expiration"]) : undefined,
    pkcs12: data["pkcs12"] !== undefined ? encodeBase64(data["pkcs12"]) : undefined,
  };
}

function deserializeSmimeInfo(data: any): SmimeInfo {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? BigInt(data["expiration"]) : undefined,
    pkcs12: data["pkcs12"] !== undefined ? decodeBase64(data["pkcs12"] as string) : undefined,
  };
}

/**
 * Configuration for communication with an SMTP service.
 */
export interface SmtpMsa {
  /**
   * The hostname of the SMTP service. Required.
   */
  host?: string;
  /**
   * The password that will be used for authentication with the SMTP service.
   * This is a write-only field that can be specified in requests to create or
   * update SendAs settings; it is never populated in responses.
   */
  password?: string;
  /**
   * The port of the SMTP service. Required.
   */
  port?: number;
  /**
   * The protocol that will be used to secure communication with the SMTP
   * service. Required.
   */
  securityMode?:  | "securityModeUnspecified" | "none" | "ssl" | "starttls";
  /**
   * The username that will be used for authentication with the SMTP service.
   * This is a write-only field that can be specified in requests to create or
   * update SendAs settings; it is never populated in responses.
   */
  username?: string;
}

/**
 * A collection of messages representing a conversation.
 */
export interface Thread {
  /**
   * The ID of the last history record that modified this thread.
   */
  historyId?: bigint;
  /**
   * The unique ID of the thread.
   */
  id?: string;
  /**
   * The list of messages in the thread.
   */
  messages?: Message[];
  /**
   * A short part of the message text.
   */
  snippet?: string;
}

function serializeThread(data: any): Thread {
  return {
    ...data,
    historyId: data["historyId"] !== undefined ? String(data["historyId"]) : undefined,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (serializeMessage(item))) : undefined,
  };
}

function deserializeThread(data: any): Thread {
  return {
    ...data,
    historyId: data["historyId"] !== undefined ? BigInt(data["historyId"]) : undefined,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (deserializeMessage(item))) : undefined,
  };
}

/**
 * Additional options for Gmail#usersDraftsGet.
 */
export interface UsersDraftsGetOptions {
  /**
   * The format to return the draft in.
   */
  format?:  | "minimal" | "full" | "raw" | "metadata";
}

/**
 * Additional options for Gmail#usersDraftsList.
 */
export interface UsersDraftsListOptions {
  /**
   * Include drafts from `SPAM` and `TRASH` in the results.
   */
  includeSpamTrash?: boolean;
  /**
   * Maximum number of drafts to return. This field defaults to 100. The
   * maximum allowed value for this field is 500.
   */
  maxResults?: number;
  /**
   * Page token to retrieve a specific page of results in the list.
   */
  pageToken?: string;
  /**
   * Only return draft messages matching the specified query. Supports the same
   * query format as the Gmail search box. For example,
   * `"from:someuser@example.com rfc822msgid: is:unread"`.
   */
  q?: string;
}

/**
 * Additional options for Gmail#usersHistoryList.
 */
export interface UsersHistoryListOptions {
  /**
   * History types to be returned by the function
   */
  historyTypes?:  | "messageAdded" | "messageDeleted" | "labelAdded" | "labelRemoved";
  /**
   * Only return messages with a label matching the ID.
   */
  labelId?: string;
  /**
   * Maximum number of history records to return. This field defaults to 100.
   * The maximum allowed value for this field is 500.
   */
  maxResults?: number;
  /**
   * Page token to retrieve a specific page of results in the list.
   */
  pageToken?: string;
  /**
   * Required. Returns history records after the specified `startHistoryId`.
   * The supplied `startHistoryId` should be obtained from the `historyId` of a
   * message, thread, or previous `list` response. History IDs increase
   * chronologically but are not contiguous with random gaps in between valid
   * IDs. Supplying an invalid or out of date `startHistoryId` typically returns
   * an `HTTP 404` error code. A `historyId` is typically valid for at least a
   * week, but in some rare circumstances may be valid for only a few hours. If
   * you receive an `HTTP 404` error response, your application should perform a
   * full sync. If you receive no `nextPageToken` in the response, there are no
   * updates to retrieve and you can store the returned `historyId` for a future
   * request.
   */
  startHistoryId?: bigint;
}

function serializeUsersHistoryListOptions(data: any): UsersHistoryListOptions {
  return {
    ...data,
    startHistoryId: data["startHistoryId"] !== undefined ? String(data["startHistoryId"]) : undefined,
  };
}

function deserializeUsersHistoryListOptions(data: any): UsersHistoryListOptions {
  return {
    ...data,
    startHistoryId: data["startHistoryId"] !== undefined ? BigInt(data["startHistoryId"]) : undefined,
  };
}

/**
 * Additional options for Gmail#usersMessagesGet.
 */
export interface UsersMessagesGetOptions {
  /**
   * The format to return the message in.
   */
  format?:  | "minimal" | "full" | "raw" | "metadata";
  /**
   * When given and format is `METADATA`, only include headers specified.
   */
  metadataHeaders?: string;
}

/**
 * Additional options for Gmail#usersMessagesImport.
 */
export interface UsersMessagesImportOptions {
  /**
   * Mark the email as permanently deleted (not TRASH) and only visible in
   * Google Vault to a Vault administrator. Only used for Google Workspace
   * accounts.
   */
  deleted?: boolean;
  /**
   * Source for Gmail's internal date of the message.
   */
  internalDateSource?:  | "receivedTime" | "dateHeader";
  /**
   * Ignore the Gmail spam classifier decision and never mark this email as
   * SPAM in the mailbox.
   */
  neverMarkSpam?: boolean;
  /**
   * Process calendar invites in the email and add any extracted meetings to
   * the Google Calendar for this user.
   */
  processForCalendar?: boolean;
}

/**
 * Additional options for Gmail#usersMessagesInsert.
 */
export interface UsersMessagesInsertOptions {
  /**
   * Mark the email as permanently deleted (not TRASH) and only visible in
   * Google Vault to a Vault administrator. Only used for Google Workspace
   * accounts.
   */
  deleted?: boolean;
  /**
   * Source for Gmail's internal date of the message.
   */
  internalDateSource?:  | "receivedTime" | "dateHeader";
}

/**
 * Additional options for Gmail#usersMessagesList.
 */
export interface UsersMessagesListOptions {
  /**
   * Include messages from `SPAM` and `TRASH` in the results.
   */
  includeSpamTrash?: boolean;
  /**
   * Only return messages with labels that match all of the specified label
   * IDs.
   */
  labelIds?: string;
  /**
   * Maximum number of messages to return. This field defaults to 100. The
   * maximum allowed value for this field is 500.
   */
  maxResults?: number;
  /**
   * Page token to retrieve a specific page of results in the list.
   */
  pageToken?: string;
  /**
   * Only return messages matching the specified query. Supports the same query
   * format as the Gmail search box. For example, `"from:someuser@example.com
   * rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api
   * using the gmail.metadata scope.
   */
  q?: string;
}

/**
 * Additional options for Gmail#usersSettingsCseIdentitiesList.
 */
export interface UsersSettingsCseIdentitiesListOptions {
  /**
   * The number of identities to return. If not provided, the page size will
   * default to 20 entries.
   */
  pageSize?: number;
  /**
   * Pagination token indicating which page of identities to return. If the
   * token is not supplied, then the API will return the first page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Gmail#usersSettingsCseKeypairsList.
 */
export interface UsersSettingsCseKeypairsListOptions {
  /**
   * The number of key pairs to return. If not provided, the page size will
   * default to 20 entries.
   */
  pageSize?: number;
  /**
   * Pagination token indicating which page of key pairs to return. If the
   * token is not supplied, then the API will return the first page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Gmail#usersThreadsGet.
 */
export interface UsersThreadsGetOptions {
  /**
   * The format to return the messages in.
   */
  format?:  | "full" | "metadata" | "minimal";
  /**
   * When given and format is METADATA, only include headers specified.
   */
  metadataHeaders?: string;
}

/**
 * Additional options for Gmail#usersThreadsList.
 */
export interface UsersThreadsListOptions {
  /**
   * Include threads from `SPAM` and `TRASH` in the results.
   */
  includeSpamTrash?: boolean;
  /**
   * Only return threads with labels that match all of the specified label IDs.
   */
  labelIds?: string;
  /**
   * Maximum number of threads to return. This field defaults to 100. The
   * maximum allowed value for this field is 500.
   */
  maxResults?: number;
  /**
   * Page token to retrieve a specific page of results in the list.
   */
  pageToken?: string;
  /**
   * Only return threads matching the specified query. Supports the same query
   * format as the Gmail search box. For example, `"from:someuser@example.com
   * rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api
   * using the gmail.metadata scope.
   */
  q?: string;
}

/**
 * Vacation auto-reply settings for an account. These settings correspond to
 * the "Vacation responder" feature in the web interface.
 */
export interface VacationSettings {
  /**
   * Flag that controls whether Gmail automatically replies to messages.
   */
  enableAutoReply?: boolean;
  /**
   * An optional end time for sending auto-replies (epoch ms). When this is
   * specified, Gmail will automatically reply only to messages that it receives
   * before the end time. If both `startTime` and `endTime` are specified,
   * `startTime` must precede `endTime`.
   */
  endTime?: bigint;
  /**
   * Response body in HTML format. Gmail will sanitize the HTML before storing
   * it. If both `response_body_plain_text` and `response_body_html` are
   * specified, `response_body_html` will be used.
   */
  responseBodyHtml?: string;
  /**
   * Response body in plain text format. If both `response_body_plain_text` and
   * `response_body_html` are specified, `response_body_html` will be used.
   */
  responseBodyPlainText?: string;
  /**
   * Optional text to prepend to the subject line in vacation responses. In
   * order to enable auto-replies, either the response subject or the response
   * body must be nonempty.
   */
  responseSubject?: string;
  /**
   * Flag that determines whether responses are sent to recipients who are not
   * in the user's list of contacts.
   */
  restrictToContacts?: boolean;
  /**
   * Flag that determines whether responses are sent to recipients who are
   * outside of the user's domain. This feature is only available for Google
   * Workspace users.
   */
  restrictToDomain?: boolean;
  /**
   * An optional start time for sending auto-replies (epoch ms). When this is
   * specified, Gmail will automatically reply only to messages that it receives
   * after the start time. If both `startTime` and `endTime` are specified,
   * `startTime` must precede `endTime`.
   */
  startTime?: bigint;
}

function serializeVacationSettings(data: any): VacationSettings {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? String(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? String(data["startTime"]) : undefined,
  };
}

function deserializeVacationSettings(data: any): VacationSettings {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? BigInt(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? BigInt(data["startTime"]) : undefined,
  };
}

/**
 * Set up or update a new push notification watch on this user's mailbox.
 */
export interface WatchRequest {
  /**
   * Filtering behavior of labelIds list specified.
   */
  labelFilterAction?:  | "include" | "exclude";
  /**
   * List of label_ids to restrict notifications about. By default, if
   * unspecified, all changes are pushed out. If specified then dictates which
   * labels are required for a push notification to be generated.
   */
  labelIds?: string[];
  /**
   * A fully qualified Google Cloud Pub/Sub API topic name to publish the
   * events to. This topic name **must** already exist in Cloud Pub/Sub and you
   * **must** have already granted gmail "publish" permission on it. For
   * example, "projects/my-project-identifier/topics/my-topic-name" (using the
   * Cloud Pub/Sub "v1" topic naming format). Note that the
   * "my-project-identifier" portion must exactly match your Google developer
   * project id (the one executing this watch request).
   */
  topicName?: string;
}

/**
 * Push notification watch response.
 */
export interface WatchResponse {
  /**
   * When Gmail will stop sending notifications for mailbox updates (epoch
   * millis). Call `watch` again before this time to renew the watch.
   */
  expiration?: bigint;
  /**
   * The ID of the mailbox's current history record.
   */
  historyId?: bigint;
}

function serializeWatchResponse(data: any): WatchResponse {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? String(data["expiration"]) : undefined,
    historyId: data["historyId"] !== undefined ? String(data["historyId"]) : undefined,
  };
}

function deserializeWatchResponse(data: any): WatchResponse {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? BigInt(data["expiration"]) : undefined,
    historyId: data["historyId"] !== undefined ? BigInt(data["historyId"]) : undefined,
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
