// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Pub/Sub Lite API Client for Deno
 * ================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/pubsub/lite/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class pubsubLite {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://pubsublite.googleapis.com/") {
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
  async adminProjectsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
  async adminProjectsLocationsOperationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
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
  async adminProjectsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
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
  async adminProjectsLocationsOperationsList(name: string, opts: AdminProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }/operations`);
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
   * Creates a new reservation.
   *
   * @param parent Required. The parent location in which to create the reservation. Structured like `projects/{project_number}/locations/{location}`.
   */
  async adminProjectsLocationsReservationsCreate(parent: string, req: Reservation, opts: AdminProjectsLocationsReservationsCreateOptions = {}): Promise<Reservation> {
    req = serializeReservation(req);
    const url = new URL(`${this.#baseUrl}v1/admin/${ parent }/reservations`);
    if (opts.reservationId !== undefined) {
      url.searchParams.append("reservationId", String(opts.reservationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReservation(data);
  }

  /**
   * Deletes the specified reservation.
   *
   * @param name Required. The name of the reservation to delete. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id}
   */
  async adminProjectsLocationsReservationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the reservation configuration.
   *
   * @param name Required. The name of the reservation whose configuration to return. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id}
   */
  async adminProjectsLocationsReservationsGet(name: string): Promise<Reservation> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReservation(data);
  }

  /**
   * Returns the list of reservations for the given project.
   *
   * @param parent Required. The parent whose reservations are to be listed. Structured like `projects/{project_number}/locations/{location}`.
   */
  async adminProjectsLocationsReservationsList(parent: string, opts: AdminProjectsLocationsReservationsListOptions = {}): Promise<ListReservationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ parent }/reservations`);
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
    return deserializeListReservationsResponse(data);
  }

  /**
   * Updates properties of the specified reservation.
   *
   * @param name The name of the reservation. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id}
   */
  async adminProjectsLocationsReservationsPatch(name: string, req: Reservation, opts: AdminProjectsLocationsReservationsPatchOptions = {}): Promise<Reservation> {
    req = serializeReservation(req);
    opts = serializeAdminProjectsLocationsReservationsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeReservation(data);
  }

  /**
   * Lists the topics attached to the specified reservation.
   *
   * @param name Required. The name of the reservation whose topics to list. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id}
   */
  async adminProjectsLocationsReservationsTopicsList(name: string, opts: AdminProjectsLocationsReservationsTopicsListOptions = {}): Promise<ListReservationTopicsResponse> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }/topics`);
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
    return data as ListReservationTopicsResponse;
  }

  /**
   * Creates a new subscription.
   *
   * @param parent Required. The parent location in which to create the subscription. Structured like `projects/{project_number}/locations/{location}`.
   */
  async adminProjectsLocationsSubscriptionsCreate(parent: string, req: Subscription, opts: AdminProjectsLocationsSubscriptionsCreateOptions = {}): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ parent }/subscriptions`);
    if (opts.skipBacklog !== undefined) {
      url.searchParams.append("skipBacklog", String(opts.skipBacklog));
    }
    if (opts.subscriptionId !== undefined) {
      url.searchParams.append("subscriptionId", String(opts.subscriptionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Subscription;
  }

  /**
   * Deletes the specified subscription.
   *
   * @param name Required. The name of the subscription to delete.
   */
  async adminProjectsLocationsSubscriptionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the subscription configuration.
   *
   * @param name Required. The name of the subscription whose configuration to return.
   */
  async adminProjectsLocationsSubscriptionsGet(name: string): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Subscription;
  }

  /**
   * Returns the list of subscriptions for the given project.
   *
   * @param parent Required. The parent whose subscriptions are to be listed. Structured like `projects/{project_number}/locations/{location}`.
   */
  async adminProjectsLocationsSubscriptionsList(parent: string, opts: AdminProjectsLocationsSubscriptionsListOptions = {}): Promise<ListSubscriptionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ parent }/subscriptions`);
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
    return data as ListSubscriptionsResponse;
  }

  /**
   * Updates properties of the specified subscription.
   *
   * @param name The name of the subscription. Structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id}
   */
  async adminProjectsLocationsSubscriptionsPatch(name: string, req: Subscription, opts: AdminProjectsLocationsSubscriptionsPatchOptions = {}): Promise<Subscription> {
    opts = serializeAdminProjectsLocationsSubscriptionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Subscription;
  }

  /**
   * Performs an out-of-band seek for a subscription to a specified target,
   * which may be timestamps or named positions within the message backlog. Seek
   * translates these targets to cursors for each partition and orchestrates
   * subscribers to start consuming messages from these seek cursors. If an
   * operation is returned, the seek has been registered and subscribers will
   * eventually receive messages from the seek cursors (i.e. eventual
   * consistency), as long as they are using a minimum supported client library
   * version and not a system that tracks cursors independently of Pub/Sub Lite
   * (e.g. Apache Beam, Dataflow, Spark). The seek operation will fail for
   * unsupported clients. If clients would like to know when subscribers react
   * to the seek (or not), they can poll the operation. The seek operation will
   * succeed and complete once subscribers are ready to receive messages from
   * the seek cursors for all partitions of the topic. This means that the seek
   * operation will not complete until all subscribers come online. If the
   * previous seek operation has not yet completed, it will be aborted and the
   * new invocation of seek will supersede it.
   *
   * @param name Required. The name of the subscription to seek.
   */
  async adminProjectsLocationsSubscriptionsSeek(name: string, req: SeekSubscriptionRequest): Promise<Operation> {
    req = serializeSeekSubscriptionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }:seek`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a new topic.
   *
   * @param parent Required. The parent location in which to create the topic. Structured like `projects/{project_number}/locations/{location}`.
   */
  async adminProjectsLocationsTopicsCreate(parent: string, req: Topic, opts: AdminProjectsLocationsTopicsCreateOptions = {}): Promise<Topic> {
    req = serializeTopic(req);
    const url = new URL(`${this.#baseUrl}v1/admin/${ parent }/topics`);
    if (opts.topicId !== undefined) {
      url.searchParams.append("topicId", String(opts.topicId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTopic(data);
  }

  /**
   * Deletes the specified topic.
   *
   * @param name Required. The name of the topic to delete.
   */
  async adminProjectsLocationsTopicsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the topic configuration.
   *
   * @param name Required. The name of the topic whose configuration to return.
   */
  async adminProjectsLocationsTopicsGet(name: string): Promise<Topic> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTopic(data);
  }

  /**
   * Returns the partition information for the requested topic.
   *
   * @param name Required. The topic whose partition information to return.
   */
  async adminProjectsLocationsTopicsGetPartitions(name: string): Promise<TopicPartitions> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }/partitions`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTopicPartitions(data);
  }

  /**
   * Returns the list of topics for the given project.
   *
   * @param parent Required. The parent whose topics are to be listed. Structured like `projects/{project_number}/locations/{location}`.
   */
  async adminProjectsLocationsTopicsList(parent: string, opts: AdminProjectsLocationsTopicsListOptions = {}): Promise<ListTopicsResponse> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ parent }/topics`);
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
    return deserializeListTopicsResponse(data);
  }

  /**
   * Updates properties of the specified topic.
   *
   * @param name The name of the topic. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}
   */
  async adminProjectsLocationsTopicsPatch(name: string, req: Topic, opts: AdminProjectsLocationsTopicsPatchOptions = {}): Promise<Topic> {
    req = serializeTopic(req);
    opts = serializeAdminProjectsLocationsTopicsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTopic(data);
  }

  /**
   * Lists the subscriptions attached to the specified topic.
   *
   * @param name Required. The name of the topic whose subscriptions to list.
   */
  async adminProjectsLocationsTopicsSubscriptionsList(name: string, opts: AdminProjectsLocationsTopicsSubscriptionsListOptions = {}): Promise<ListTopicSubscriptionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/admin/${ name }/subscriptions`);
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
    return data as ListTopicSubscriptionsResponse;
  }

  /**
   * Updates the committed cursor.
   *
   * @param subscription The subscription for which to update the cursor.
   */
  async cursorProjectsLocationsSubscriptionsCommitCursor(subscription: string, req: CommitCursorRequest): Promise<CommitCursorResponse> {
    req = serializeCommitCursorRequest(req);
    const url = new URL(`${this.#baseUrl}v1/cursor/${ subscription }:commitCursor`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CommitCursorResponse;
  }

  /**
   * Returns all committed cursor information for a subscription.
   *
   * @param parent Required. The subscription for which to retrieve cursors. Structured like `projects/{project_number}/locations/{location}/subscriptions/{subscription_id}`.
   */
  async cursorProjectsLocationsSubscriptionsCursorsList(parent: string, opts: CursorProjectsLocationsSubscriptionsCursorsListOptions = {}): Promise<ListPartitionCursorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/cursor/${ parent }/cursors`);
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
    return deserializeListPartitionCursorsResponse(data);
  }

  /**
   * Compute the head cursor for the partition. The head cursor's offset is
   * guaranteed to be less than or equal to all messages which have not yet been
   * acknowledged as published, and greater than the offset of any message whose
   * publish has already been acknowledged. It is zero if there have never been
   * messages in the partition.
   *
   * @param topic Required. The topic for which we should compute the head cursor.
   */
  async topicStatsProjectsLocationsTopicsComputeHeadCursor(topic: string, req: ComputeHeadCursorRequest): Promise<ComputeHeadCursorResponse> {
    req = serializeComputeHeadCursorRequest(req);
    const url = new URL(`${this.#baseUrl}v1/topicStats/${ topic }:computeHeadCursor`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeComputeHeadCursorResponse(data);
  }

  /**
   * Compute statistics about a range of messages in a given topic and
   * partition.
   *
   * @param topic Required. The topic for which we should compute message stats.
   */
  async topicStatsProjectsLocationsTopicsComputeMessageStats(topic: string, req: ComputeMessageStatsRequest): Promise<ComputeMessageStatsResponse> {
    req = serializeComputeMessageStatsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/topicStats/${ topic }:computeMessageStats`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeComputeMessageStatsResponse(data);
  }

  /**
   * Compute the corresponding cursor for a publish or event time in a topic
   * partition.
   *
   * @param topic Required. The topic for which we should compute the cursor.
   */
  async topicStatsProjectsLocationsTopicsComputeTimeCursor(topic: string, req: ComputeTimeCursorRequest): Promise<ComputeTimeCursorResponse> {
    req = serializeComputeTimeCursorRequest(req);
    const url = new URL(`${this.#baseUrl}v1/topicStats/${ topic }:computeTimeCursor`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeComputeTimeCursorResponse(data);
  }
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsOperationsList.
 */
export interface AdminProjectsLocationsOperationsListOptions {
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
 * Additional options for pubsubLite#adminProjectsLocationsReservationsCreate.
 */
export interface AdminProjectsLocationsReservationsCreateOptions {
  /**
   * Required. The ID to use for the reservation, which will become the final
   * component of the reservation's name. This value is structured like:
   * `my-reservation-name`.
   */
  reservationId?: string;
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsReservationsList.
 */
export interface AdminProjectsLocationsReservationsListOptions {
  /**
   * The maximum number of reservations to return. The service may return fewer
   * than this value. If unset or zero, all reservations for the parent will be
   * returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListReservations` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListReservations` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsReservationsPatch.
 */
export interface AdminProjectsLocationsReservationsPatchOptions {
  /**
   * Required. A mask specifying the reservation fields to change.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdminProjectsLocationsReservationsPatchOptions(data: any): AdminProjectsLocationsReservationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdminProjectsLocationsReservationsPatchOptions(data: any): AdminProjectsLocationsReservationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * pubsubLite#adminProjectsLocationsReservationsTopicsList.
 */
export interface AdminProjectsLocationsReservationsTopicsListOptions {
  /**
   * The maximum number of topics to return. The service may return fewer than
   * this value. If unset or zero, all topics for the given reservation will be
   * returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListReservationTopics` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListReservationTopics` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsSubscriptionsCreate.
 */
export interface AdminProjectsLocationsSubscriptionsCreateOptions {
  /**
   * If true, the newly created subscription will only receive messages
   * published after the subscription was created. Otherwise, the entire message
   * backlog will be received on the subscription. Defaults to false.
   */
  skipBacklog?: boolean;
  /**
   * Required. The ID to use for the subscription, which will become the final
   * component of the subscription's name. This value is structured like:
   * `my-sub-name`.
   */
  subscriptionId?: string;
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsSubscriptionsList.
 */
export interface AdminProjectsLocationsSubscriptionsListOptions {
  /**
   * The maximum number of subscriptions to return. The service may return
   * fewer than this value. If unset or zero, all subscriptions for the parent
   * will be returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListSubscriptions` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListSubscriptions` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsSubscriptionsPatch.
 */
export interface AdminProjectsLocationsSubscriptionsPatchOptions {
  /**
   * Required. A mask specifying the subscription fields to change.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdminProjectsLocationsSubscriptionsPatchOptions(data: any): AdminProjectsLocationsSubscriptionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdminProjectsLocationsSubscriptionsPatchOptions(data: any): AdminProjectsLocationsSubscriptionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsTopicsCreate.
 */
export interface AdminProjectsLocationsTopicsCreateOptions {
  /**
   * Required. The ID to use for the topic, which will become the final
   * component of the topic's name. This value is structured like:
   * `my-topic-name`.
   */
  topicId?: string;
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsTopicsList.
 */
export interface AdminProjectsLocationsTopicsListOptions {
  /**
   * The maximum number of topics to return. The service may return fewer than
   * this value. If unset or zero, all topics for the parent will be returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListTopics` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListTopics` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for pubsubLite#adminProjectsLocationsTopicsPatch.
 */
export interface AdminProjectsLocationsTopicsPatchOptions {
  /**
   * Required. A mask specifying the topic fields to change.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAdminProjectsLocationsTopicsPatchOptions(data: any): AdminProjectsLocationsTopicsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAdminProjectsLocationsTopicsPatchOptions(data: any): AdminProjectsLocationsTopicsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * pubsubLite#adminProjectsLocationsTopicsSubscriptionsList.
 */
export interface AdminProjectsLocationsTopicsSubscriptionsListOptions {
  /**
   * The maximum number of subscriptions to return. The service may return
   * fewer than this value. If unset or zero, all subscriptions for the given
   * topic will be returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListTopicSubscriptions` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListTopicSubscriptions` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * The throughput capacity configuration for each partition.
 */
export interface Capacity {
  /**
   * Publish throughput capacity per partition in MiB/s. Must be >= 4 and <=
   * 16.
   */
  publishMibPerSec?: number;
  /**
   * Subscribe throughput capacity per partition in MiB/s. Must be >= 4 and <=
   * 32.
   */
  subscribeMibPerSec?: number;
}

/**
 * Request for CommitCursor.
 */
export interface CommitCursorRequest {
  /**
   * The new value for the committed cursor.
   */
  cursor?: Cursor;
  /**
   * The partition for which to update the cursor. Partitions are zero indexed,
   * so `partition` must be in the range [0, topic.num_partitions).
   */
  partition?: bigint;
}

function serializeCommitCursorRequest(data: any): CommitCursorRequest {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? serializeCursor(data["cursor"]) : undefined,
    partition: data["partition"] !== undefined ? String(data["partition"]) : undefined,
  };
}

function deserializeCommitCursorRequest(data: any): CommitCursorRequest {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? deserializeCursor(data["cursor"]) : undefined,
    partition: data["partition"] !== undefined ? BigInt(data["partition"]) : undefined,
  };
}

/**
 * Response for CommitCursor.
 */
export interface CommitCursorResponse {
}

/**
 * Compute the current head cursor for a partition.
 */
export interface ComputeHeadCursorRequest {
  /**
   * Required. The partition for which we should compute the head cursor.
   */
  partition?: bigint;
}

function serializeComputeHeadCursorRequest(data: any): ComputeHeadCursorRequest {
  return {
    ...data,
    partition: data["partition"] !== undefined ? String(data["partition"]) : undefined,
  };
}

function deserializeComputeHeadCursorRequest(data: any): ComputeHeadCursorRequest {
  return {
    ...data,
    partition: data["partition"] !== undefined ? BigInt(data["partition"]) : undefined,
  };
}

/**
 * Response containing the head cursor for the requested topic and partition.
 */
export interface ComputeHeadCursorResponse {
  /**
   * The head cursor.
   */
  headCursor?: Cursor;
}

function serializeComputeHeadCursorResponse(data: any): ComputeHeadCursorResponse {
  return {
    ...data,
    headCursor: data["headCursor"] !== undefined ? serializeCursor(data["headCursor"]) : undefined,
  };
}

function deserializeComputeHeadCursorResponse(data: any): ComputeHeadCursorResponse {
  return {
    ...data,
    headCursor: data["headCursor"] !== undefined ? deserializeCursor(data["headCursor"]) : undefined,
  };
}

/**
 * Compute statistics about a range of messages in a given topic and partition.
 */
export interface ComputeMessageStatsRequest {
  /**
   * The exclusive end of the range. The range is empty if end_cursor <=
   * start_cursor. Specifying a start_cursor before the first message and an
   * end_cursor after the last message will retrieve all messages.
   */
  endCursor?: Cursor;
  /**
   * Required. The partition for which we should compute message stats.
   */
  partition?: bigint;
  /**
   * The inclusive start of the range.
   */
  startCursor?: Cursor;
}

function serializeComputeMessageStatsRequest(data: any): ComputeMessageStatsRequest {
  return {
    ...data,
    endCursor: data["endCursor"] !== undefined ? serializeCursor(data["endCursor"]) : undefined,
    partition: data["partition"] !== undefined ? String(data["partition"]) : undefined,
    startCursor: data["startCursor"] !== undefined ? serializeCursor(data["startCursor"]) : undefined,
  };
}

function deserializeComputeMessageStatsRequest(data: any): ComputeMessageStatsRequest {
  return {
    ...data,
    endCursor: data["endCursor"] !== undefined ? deserializeCursor(data["endCursor"]) : undefined,
    partition: data["partition"] !== undefined ? BigInt(data["partition"]) : undefined,
    startCursor: data["startCursor"] !== undefined ? deserializeCursor(data["startCursor"]) : undefined,
  };
}

/**
 * Response containing stats for messages in the requested topic and partition.
 */
export interface ComputeMessageStatsResponse {
  /**
   * The number of quota bytes accounted to these messages.
   */
  messageBytes?: bigint;
  /**
   * The count of messages.
   */
  messageCount?: bigint;
  /**
   * The minimum event timestamp across these messages. For the purposes of
   * this computation, if a message does not have an event time, we use the
   * publish time. The timestamp will be unset if there are no messages.
   */
  minimumEventTime?: Date;
  /**
   * The minimum publish timestamp across these messages. Note that publish
   * timestamps within a partition are not guaranteed to be non-decreasing. The
   * timestamp will be unset if there are no messages.
   */
  minimumPublishTime?: Date;
}

function serializeComputeMessageStatsResponse(data: any): ComputeMessageStatsResponse {
  return {
    ...data,
    messageBytes: data["messageBytes"] !== undefined ? String(data["messageBytes"]) : undefined,
    messageCount: data["messageCount"] !== undefined ? String(data["messageCount"]) : undefined,
    minimumEventTime: data["minimumEventTime"] !== undefined ? data["minimumEventTime"].toISOString() : undefined,
    minimumPublishTime: data["minimumPublishTime"] !== undefined ? data["minimumPublishTime"].toISOString() : undefined,
  };
}

function deserializeComputeMessageStatsResponse(data: any): ComputeMessageStatsResponse {
  return {
    ...data,
    messageBytes: data["messageBytes"] !== undefined ? BigInt(data["messageBytes"]) : undefined,
    messageCount: data["messageCount"] !== undefined ? BigInt(data["messageCount"]) : undefined,
    minimumEventTime: data["minimumEventTime"] !== undefined ? new Date(data["minimumEventTime"]) : undefined,
    minimumPublishTime: data["minimumPublishTime"] !== undefined ? new Date(data["minimumPublishTime"]) : undefined,
  };
}

/**
 * Compute the corresponding cursor for a publish or event time in a topic
 * partition.
 */
export interface ComputeTimeCursorRequest {
  /**
   * Required. The partition for which we should compute the cursor.
   */
  partition?: bigint;
  /**
   * Required. The target publish or event time. Specifying a future time will
   * return an unset cursor.
   */
  target?: TimeTarget;
}

function serializeComputeTimeCursorRequest(data: any): ComputeTimeCursorRequest {
  return {
    ...data,
    partition: data["partition"] !== undefined ? String(data["partition"]) : undefined,
    target: data["target"] !== undefined ? serializeTimeTarget(data["target"]) : undefined,
  };
}

function deserializeComputeTimeCursorRequest(data: any): ComputeTimeCursorRequest {
  return {
    ...data,
    partition: data["partition"] !== undefined ? BigInt(data["partition"]) : undefined,
    target: data["target"] !== undefined ? deserializeTimeTarget(data["target"]) : undefined,
  };
}

/**
 * Response containing the cursor corresponding to a publish or event time in a
 * topic partition.
 */
export interface ComputeTimeCursorResponse {
  /**
   * If present, the cursor references the first message with time greater than
   * or equal to the specified target time. If such a message cannot be found,
   * the cursor will be unset (i.e. `cursor` is not present).
   */
  cursor?: Cursor;
}

function serializeComputeTimeCursorResponse(data: any): ComputeTimeCursorResponse {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? serializeCursor(data["cursor"]) : undefined,
  };
}

function deserializeComputeTimeCursorResponse(data: any): ComputeTimeCursorResponse {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? deserializeCursor(data["cursor"]) : undefined,
  };
}

/**
 * A cursor that describes the position of a message within a topic partition.
 */
export interface Cursor {
  /**
   * The offset of a message within a topic partition. Must be greater than or
   * equal 0.
   */
  offset?: bigint;
}

function serializeCursor(data: any): Cursor {
  return {
    ...data,
    offset: data["offset"] !== undefined ? String(data["offset"]) : undefined,
  };
}

function deserializeCursor(data: any): Cursor {
  return {
    ...data,
    offset: data["offset"] !== undefined ? BigInt(data["offset"]) : undefined,
  };
}

/**
 * Additional options for
 * pubsubLite#cursorProjectsLocationsSubscriptionsCursorsList.
 */
export interface CursorProjectsLocationsSubscriptionsCursorsListOptions {
  /**
   * The maximum number of cursors to return. The service may return fewer than
   * this value. If unset or zero, all cursors for the parent will be returned.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListPartitionCursors` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListPartitionCursors` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * The settings for a subscription's message delivery.
 */
export interface DeliveryConfig {
  /**
   * The DeliveryRequirement for this subscription.
   */
  deliveryRequirement?:  | "DELIVERY_REQUIREMENT_UNSPECIFIED" | "DELIVER_IMMEDIATELY" | "DELIVER_AFTER_STORED";
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
 * Configuration for a Pub/Sub Lite subscription that writes messages to a
 * destination. User subscriber clients must not connect to this subscription.
 */
export interface ExportConfig {
  /**
   * Output only. The current state of the export, which may be different to
   * the desired state due to errors. This field is output only.
   */
  readonly currentState?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "PAUSED" | "PERMISSION_DENIED" | "NOT_FOUND";
  /**
   * Optional. The name of an optional Pub/Sub Lite topic to publish messages
   * that can not be exported to the destination. For example, the message can
   * not be published to the Pub/Sub service because it does not satisfy the
   * constraints documented at https://cloud.google.com/pubsub/docs/publisher.
   * Structured like:
   * projects/{project_number}/locations/{location}/topics/{topic_id}. Must be
   * within the same project and location as the subscription. The topic may be
   * changed or removed.
   */
  deadLetterTopic?: string;
  /**
   * The desired state of this export. Setting this to values other than
   * `ACTIVE` and `PAUSED` will result in an error.
   */
  desiredState?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "PAUSED" | "PERMISSION_DENIED" | "NOT_FOUND";
  /**
   * Messages are automatically written from the Pub/Sub Lite topic associated
   * with this subscription to a Pub/Sub topic.
   */
  pubsubConfig?: PubSubConfig;
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
 * Response for ListPartitionCursors
 */
export interface ListPartitionCursorsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The partition cursors from this request.
   */
  partitionCursors?: PartitionCursor[];
}

function serializeListPartitionCursorsResponse(data: any): ListPartitionCursorsResponse {
  return {
    ...data,
    partitionCursors: data["partitionCursors"] !== undefined ? data["partitionCursors"].map((item: any) => (serializePartitionCursor(item))) : undefined,
  };
}

function deserializeListPartitionCursorsResponse(data: any): ListPartitionCursorsResponse {
  return {
    ...data,
    partitionCursors: data["partitionCursors"] !== undefined ? data["partitionCursors"].map((item: any) => (deserializePartitionCursor(item))) : undefined,
  };
}

/**
 * Response for ListReservations.
 */
export interface ListReservationsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page of
   * results. If this field is omitted, there are no more results.
   */
  nextPageToken?: string;
  /**
   * The list of reservation in the requested parent. The order of the
   * reservations is unspecified.
   */
  reservations?: Reservation[];
}

function serializeListReservationsResponse(data: any): ListReservationsResponse {
  return {
    ...data,
    reservations: data["reservations"] !== undefined ? data["reservations"].map((item: any) => (serializeReservation(item))) : undefined,
  };
}

function deserializeListReservationsResponse(data: any): ListReservationsResponse {
  return {
    ...data,
    reservations: data["reservations"] !== undefined ? data["reservations"].map((item: any) => (deserializeReservation(item))) : undefined,
  };
}

/**
 * Response for ListReservationTopics.
 */
export interface ListReservationTopicsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page of
   * results. If this field is omitted, there are no more results.
   */
  nextPageToken?: string;
  /**
   * The names of topics attached to the reservation. The order of the topics
   * is unspecified.
   */
  topics?: string[];
}

/**
 * Response for ListSubscriptions.
 */
export interface ListSubscriptionsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page of
   * results. If this field is omitted, there are no more results.
   */
  nextPageToken?: string;
  /**
   * The list of subscriptions in the requested parent. The order of the
   * subscriptions is unspecified.
   */
  subscriptions?: Subscription[];
}

/**
 * Response for ListTopics.
 */
export interface ListTopicsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page of
   * results. If this field is omitted, there are no more results.
   */
  nextPageToken?: string;
  /**
   * The list of topic in the requested parent. The order of the topics is
   * unspecified.
   */
  topics?: Topic[];
}

function serializeListTopicsResponse(data: any): ListTopicsResponse {
  return {
    ...data,
    topics: data["topics"] !== undefined ? data["topics"].map((item: any) => (serializeTopic(item))) : undefined,
  };
}

function deserializeListTopicsResponse(data: any): ListTopicsResponse {
  return {
    ...data,
    topics: data["topics"] !== undefined ? data["topics"].map((item: any) => (deserializeTopic(item))) : undefined,
  };
}

/**
 * Response for ListTopicSubscriptions.
 */
export interface ListTopicSubscriptionsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page of
   * results. If this field is omitted, there are no more results.
   */
  nextPageToken?: string;
  /**
   * The names of subscriptions attached to the topic. The order of the
   * subscriptions is unspecified.
   */
  subscriptions?: string[];
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
 * Metadata for long running operations.
 */
export interface OperationMetadata {
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running. Not set if the operation has not
   * completed.
   */
  endTime?: Date;
  /**
   * Resource path for the target of the operation. For example, targets of
   * seeks are subscription resources, structured like:
   * projects/{project_number}/locations/{location}/subscriptions/{subscription_id}
   */
  target?: string;
  /**
   * Name of the verb executed by the operation.
   */
  verb?: string;
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * The settings for a topic's partitions.
 */
export interface PartitionConfig {
  /**
   * The capacity configuration.
   */
  capacity?: Capacity;
  /**
   * The number of partitions in the topic. Must be at least 1. Once a topic
   * has been created the number of partitions can be increased but not
   * decreased. Message ordering is not guaranteed across a topic resize. For
   * more information see
   * https://cloud.google.com/pubsub/lite/docs/topics#scaling_capacity
   */
  count?: bigint;
  /**
   * DEPRECATED: Use capacity instead which can express a superset of
   * configurations. Every partition in the topic is allocated throughput
   * equivalent to `scale` times the standard partition throughput (4 MiB/s).
   * This is also reflected in the cost of this topic; a topic with `scale` of 2
   * and count of 10 is charged for 20 partitions. This value must be in the
   * range [1,4].
   */
  scale?: number;
}

function serializePartitionConfig(data: any): PartitionConfig {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializePartitionConfig(data: any): PartitionConfig {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * A pair of a Cursor and the partition it is for.
 */
export interface PartitionCursor {
  /**
   * The value of the cursor.
   */
  cursor?: Cursor;
  /**
   * The partition this is for.
   */
  partition?: bigint;
}

function serializePartitionCursor(data: any): PartitionCursor {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? serializeCursor(data["cursor"]) : undefined,
    partition: data["partition"] !== undefined ? String(data["partition"]) : undefined,
  };
}

function deserializePartitionCursor(data: any): PartitionCursor {
  return {
    ...data,
    cursor: data["cursor"] !== undefined ? deserializeCursor(data["cursor"]) : undefined,
    partition: data["partition"] !== undefined ? BigInt(data["partition"]) : undefined,
  };
}

/**
 * Configuration for exporting to a Pub/Sub topic.
 */
export interface PubSubConfig {
  /**
   * The name of the Pub/Sub topic. Structured like:
   * projects/{project_number}/topics/{topic_id}. The topic may be changed.
   */
  topic?: string;
}

/**
 * Metadata about a reservation resource.
 */
export interface Reservation {
  /**
   * The name of the reservation. Structured like:
   * projects/{project_number}/locations/{location}/reservations/{reservation_id}
   */
  name?: string;
  /**
   * The reserved throughput capacity. Every unit of throughput capacity is
   * equivalent to 1 MiB/s of published messages or 2 MiB/s of subscribed
   * messages. Any topics which are declared as using capacity from a
   * Reservation will consume resources from this reservation instead of being
   * charged individually.
   */
  throughputCapacity?: bigint;
}

function serializeReservation(data: any): Reservation {
  return {
    ...data,
    throughputCapacity: data["throughputCapacity"] !== undefined ? String(data["throughputCapacity"]) : undefined,
  };
}

function deserializeReservation(data: any): Reservation {
  return {
    ...data,
    throughputCapacity: data["throughputCapacity"] !== undefined ? BigInt(data["throughputCapacity"]) : undefined,
  };
}

/**
 * The settings for this topic's Reservation usage.
 */
export interface ReservationConfig {
  /**
   * The Reservation to use for this topic's throughput capacity. Structured
   * like:
   * projects/{project_number}/locations/{location}/reservations/{reservation_id}
   */
  throughputReservation?: string;
}

/**
 * The settings for a topic's message retention.
 */
export interface RetentionConfig {
  /**
   * How long a published message is retained. If unset, messages will be
   * retained as long as the bytes retained for each partition is below
   * `per_partition_bytes`.
   */
  period?: number /* Duration */;
  /**
   * The provisioned storage, in bytes, per partition. If the number of bytes
   * stored in any of the topic's partitions grows beyond this value, older
   * messages will be dropped to make room for newer ones, regardless of the
   * value of `period`.
   */
  perPartitionBytes?: bigint;
}

function serializeRetentionConfig(data: any): RetentionConfig {
  return {
    ...data,
    period: data["period"] !== undefined ? data["period"] : undefined,
    perPartitionBytes: data["perPartitionBytes"] !== undefined ? String(data["perPartitionBytes"]) : undefined,
  };
}

function deserializeRetentionConfig(data: any): RetentionConfig {
  return {
    ...data,
    period: data["period"] !== undefined ? data["period"] : undefined,
    perPartitionBytes: data["perPartitionBytes"] !== undefined ? BigInt(data["perPartitionBytes"]) : undefined,
  };
}

/**
 * Request for SeekSubscription.
 */
export interface SeekSubscriptionRequest {
  /**
   * Seek to a named position with respect to the message backlog.
   */
  namedTarget?:  | "NAMED_TARGET_UNSPECIFIED" | "TAIL" | "HEAD";
  /**
   * Seek to the first message whose publish or event time is greater than or
   * equal to the specified query time. If no such message can be located, will
   * seek to the end of the message backlog.
   */
  timeTarget?: TimeTarget;
}

function serializeSeekSubscriptionRequest(data: any): SeekSubscriptionRequest {
  return {
    ...data,
    timeTarget: data["timeTarget"] !== undefined ? serializeTimeTarget(data["timeTarget"]) : undefined,
  };
}

function deserializeSeekSubscriptionRequest(data: any): SeekSubscriptionRequest {
  return {
    ...data,
    timeTarget: data["timeTarget"] !== undefined ? deserializeTimeTarget(data["timeTarget"]) : undefined,
  };
}

/**
 * Response for SeekSubscription long running operation.
 */
export interface SeekSubscriptionResponse {
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
 * Metadata about a subscription resource.
 */
export interface Subscription {
  /**
   * The settings for this subscription's message delivery.
   */
  deliveryConfig?: DeliveryConfig;
  /**
   * If present, messages are automatically written from the Pub/Sub Lite topic
   * associated with this subscription to a destination.
   */
  exportConfig?: ExportConfig;
  /**
   * The name of the subscription. Structured like:
   * projects/{project_number}/locations/{location}/subscriptions/{subscription_id}
   */
  name?: string;
  /**
   * The name of the topic this subscription is attached to. Structured like:
   * projects/{project_number}/locations/{location}/topics/{topic_id}
   */
  topic?: string;
}

/**
 * A target publish or event time. Can be used for seeking to or retrieving the
 * corresponding cursor.
 */
export interface TimeTarget {
  /**
   * Request the cursor of the first message with event time greater than or
   * equal to `event_time`. If messages are missing an event time, the publish
   * time is used as a fallback. As event times are user supplied, subsequent
   * messages may have event times less than `event_time` and should be filtered
   * by the client, if necessary.
   */
  eventTime?: Date;
  /**
   * Request the cursor of the first message with publish time greater than or
   * equal to `publish_time`. All messages thereafter are guaranteed to have
   * publish times >= `publish_time`.
   */
  publishTime?: Date;
}

function serializeTimeTarget(data: any): TimeTarget {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
    publishTime: data["publishTime"] !== undefined ? data["publishTime"].toISOString() : undefined,
  };
}

function deserializeTimeTarget(data: any): TimeTarget {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
    publishTime: data["publishTime"] !== undefined ? new Date(data["publishTime"]) : undefined,
  };
}

/**
 * Metadata about a topic resource.
 */
export interface Topic {
  /**
   * The name of the topic. Structured like:
   * projects/{project_number}/locations/{location}/topics/{topic_id}
   */
  name?: string;
  /**
   * The settings for this topic's partitions.
   */
  partitionConfig?: PartitionConfig;
  /**
   * The settings for this topic's Reservation usage.
   */
  reservationConfig?: ReservationConfig;
  /**
   * The settings for this topic's message retention.
   */
  retentionConfig?: RetentionConfig;
}

function serializeTopic(data: any): Topic {
  return {
    ...data,
    partitionConfig: data["partitionConfig"] !== undefined ? serializePartitionConfig(data["partitionConfig"]) : undefined,
    retentionConfig: data["retentionConfig"] !== undefined ? serializeRetentionConfig(data["retentionConfig"]) : undefined,
  };
}

function deserializeTopic(data: any): Topic {
  return {
    ...data,
    partitionConfig: data["partitionConfig"] !== undefined ? deserializePartitionConfig(data["partitionConfig"]) : undefined,
    retentionConfig: data["retentionConfig"] !== undefined ? deserializeRetentionConfig(data["retentionConfig"]) : undefined,
  };
}

/**
 * Response for GetTopicPartitions.
 */
export interface TopicPartitions {
  /**
   * The number of partitions in the topic.
   */
  partitionCount?: bigint;
}

function serializeTopicPartitions(data: any): TopicPartitions {
  return {
    ...data,
    partitionCount: data["partitionCount"] !== undefined ? String(data["partitionCount"]) : undefined,
  };
}

function deserializeTopicPartitions(data: any): TopicPartitions {
  return {
    ...data,
    partitionCount: data["partitionCount"] !== undefined ? BigInt(data["partitionCount"]) : undefined,
  };
}