// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Monitoring API Client for Deno
 * ====================================
 * 
 * Manages your Cloud Monitoring data and configurations.
 * 
 * Docs: https://cloud.google.com/monitoring/api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages your Cloud Monitoring data and configurations.
 */
export class Monitoring {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://monitoring.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists time series that match a filter.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] organizations/[ORGANIZATION_ID] folders/[FOLDER_ID] 
   */
  async foldersTimeSeriesList(name: string, opts: FoldersTimeSeriesListOptions = {}): Promise<ListTimeSeriesResponse> {
    opts = serializeFoldersTimeSeriesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }/timeSeries`);
    if (opts["aggregation.alignmentPeriod"] !== undefined) {
      url.searchParams.append("aggregation.alignmentPeriod", String(opts["aggregation.alignmentPeriod"]));
    }
    if (opts["aggregation.crossSeriesReducer"] !== undefined) {
      url.searchParams.append("aggregation.crossSeriesReducer", String(opts["aggregation.crossSeriesReducer"]));
    }
    if (opts["aggregation.groupByFields"] !== undefined) {
      url.searchParams.append("aggregation.groupByFields", String(opts["aggregation.groupByFields"]));
    }
    if (opts["aggregation.perSeriesAligner"] !== undefined) {
      url.searchParams.append("aggregation.perSeriesAligner", String(opts["aggregation.perSeriesAligner"]));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts["interval.endTime"] !== undefined) {
      url.searchParams.append("interval.endTime", String(opts["interval.endTime"]));
    }
    if (opts["interval.startTime"] !== undefined) {
      url.searchParams.append("interval.startTime", String(opts["interval.startTime"]));
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
    if (opts["secondaryAggregation.alignmentPeriod"] !== undefined) {
      url.searchParams.append("secondaryAggregation.alignmentPeriod", String(opts["secondaryAggregation.alignmentPeriod"]));
    }
    if (opts["secondaryAggregation.crossSeriesReducer"] !== undefined) {
      url.searchParams.append("secondaryAggregation.crossSeriesReducer", String(opts["secondaryAggregation.crossSeriesReducer"]));
    }
    if (opts["secondaryAggregation.groupByFields"] !== undefined) {
      url.searchParams.append("secondaryAggregation.groupByFields", String(opts["secondaryAggregation.groupByFields"]));
    }
    if (opts["secondaryAggregation.perSeriesAligner"] !== undefined) {
      url.searchParams.append("secondaryAggregation.perSeriesAligner", String(opts["secondaryAggregation.perSeriesAligner"]));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListTimeSeriesResponse(data);
  }

  /**
   * Lists time series that match a filter.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] organizations/[ORGANIZATION_ID] folders/[FOLDER_ID] 
   */
  async organizationsTimeSeriesList(name: string, opts: OrganizationsTimeSeriesListOptions = {}): Promise<ListTimeSeriesResponse> {
    opts = serializeOrganizationsTimeSeriesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }/timeSeries`);
    if (opts["aggregation.alignmentPeriod"] !== undefined) {
      url.searchParams.append("aggregation.alignmentPeriod", String(opts["aggregation.alignmentPeriod"]));
    }
    if (opts["aggregation.crossSeriesReducer"] !== undefined) {
      url.searchParams.append("aggregation.crossSeriesReducer", String(opts["aggregation.crossSeriesReducer"]));
    }
    if (opts["aggregation.groupByFields"] !== undefined) {
      url.searchParams.append("aggregation.groupByFields", String(opts["aggregation.groupByFields"]));
    }
    if (opts["aggregation.perSeriesAligner"] !== undefined) {
      url.searchParams.append("aggregation.perSeriesAligner", String(opts["aggregation.perSeriesAligner"]));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts["interval.endTime"] !== undefined) {
      url.searchParams.append("interval.endTime", String(opts["interval.endTime"]));
    }
    if (opts["interval.startTime"] !== undefined) {
      url.searchParams.append("interval.startTime", String(opts["interval.startTime"]));
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
    if (opts["secondaryAggregation.alignmentPeriod"] !== undefined) {
      url.searchParams.append("secondaryAggregation.alignmentPeriod", String(opts["secondaryAggregation.alignmentPeriod"]));
    }
    if (opts["secondaryAggregation.crossSeriesReducer"] !== undefined) {
      url.searchParams.append("secondaryAggregation.crossSeriesReducer", String(opts["secondaryAggregation.crossSeriesReducer"]));
    }
    if (opts["secondaryAggregation.groupByFields"] !== undefined) {
      url.searchParams.append("secondaryAggregation.groupByFields", String(opts["secondaryAggregation.groupByFields"]));
    }
    if (opts["secondaryAggregation.perSeriesAligner"] !== undefined) {
      url.searchParams.append("secondaryAggregation.perSeriesAligner", String(opts["secondaryAggregation.perSeriesAligner"]));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListTimeSeriesResponse(data);
  }

  /**
   * Creates a new alerting policy.Design your application to single-thread API
   * calls that modify the state of alerting policies in a single project. This
   * includes calls to CreateAlertPolicy, DeleteAlertPolicy and
   * UpdateAlertPolicy.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the alerting policy. The format is: projects/[PROJECT_ID_OR_NUMBER] Note that this field names the parent container in which the alerting policy will be written, not the name of the created policy. |name| must be a host project of a Metrics Scope, otherwise INVALID_ARGUMENT error will return. The alerting policy that is returned will have a name that contains a normalized representation of this name as a prefix but adds a suffix of the form /alertPolicies/[ALERT_POLICY_ID], identifying the policy in the container.
   */
  async projectsAlertPoliciesCreate(name: string, req: AlertPolicy): Promise<AlertPolicy> {
    req = serializeAlertPolicy(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }/alertPolicies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAlertPolicy(data);
  }

  /**
   * Deletes an alerting policy.Design your application to single-thread API
   * calls that modify the state of alerting policies in a single project. This
   * includes calls to CreateAlertPolicy, DeleteAlertPolicy and
   * UpdateAlertPolicy.
   *
   * @param name Required. The alerting policy to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] For more information, see AlertPolicy.
   */
  async projectsAlertPoliciesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single alerting policy.
   *
   * @param name Required. The alerting policy to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] 
   */
  async projectsAlertPoliciesGet(name: string): Promise<AlertPolicy> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAlertPolicy(data);
  }

  /**
   * Lists the existing alerting policies for the workspace.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose alert policies are to be listed. The format is: projects/[PROJECT_ID_OR_NUMBER] Note that this field names the parent container in which the alerting policies to be listed are stored. To retrieve a single alerting policy by name, use the GetAlertPolicy operation, instead.
   */
  async projectsAlertPoliciesList(name: string, opts: ProjectsAlertPoliciesListOptions = {}): Promise<ListAlertPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/alertPolicies`);
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
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListAlertPoliciesResponse(data);
  }

  /**
   * Updates an alerting policy. You can either replace the entire policy with
   * a new one or replace only certain fields in the current alerting policy by
   * specifying the fields to be updated via updateMask. Returns the updated
   * alerting policy.Design your application to single-thread API calls that
   * modify the state of alerting policies in a single project. This includes
   * calls to CreateAlertPolicy, DeleteAlertPolicy and UpdateAlertPolicy.
   *
   * @param name Required if the policy exists. The resource name for this policy. The format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID] [ALERT_POLICY_ID] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request.
   */
  async projectsAlertPoliciesPatch(name: string, req: AlertPolicy, opts: ProjectsAlertPoliciesPatchOptions = {}): Promise<AlertPolicy> {
    req = serializeAlertPolicy(req);
    opts = serializeProjectsAlertPoliciesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAlertPolicy(data);
  }

  /**
   * Cloud Monitoring Agent only: Creates a new time series.This method is only
   * for use by the Cloud Monitoring Agent. Use projects.timeSeries.create
   * instead.
   *
   * @param name The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the time series. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsCollectdTimeSeriesCreate(name: string, req: CreateCollectdTimeSeriesRequest): Promise<CreateCollectdTimeSeriesResponse> {
    req = serializeCreateCollectdTimeSeriesRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }/collectdTimeSeries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CreateCollectdTimeSeriesResponse;
  }

  /**
   * Creates a new group.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the group. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsGroupsCreate(name: string, req: Group, opts: ProjectsGroupsCreateOptions = {}): Promise<Group> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/groups`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Group;
  }

  /**
   * Deletes an existing group.
   *
   * @param name Required. The group to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] 
   */
  async projectsGroupsDelete(name: string, opts: ProjectsGroupsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.recursive !== undefined) {
      url.searchParams.append("recursive", String(opts.recursive));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single group.
   *
   * @param name Required. The group to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] 
   */
  async projectsGroupsGet(name: string): Promise<Group> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Group;
  }

  /**
   * Lists the existing groups.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose groups are to be listed. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsGroupsList(name: string, opts: ProjectsGroupsListOptions = {}): Promise<ListGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/groups`);
    if (opts.ancestorsOfGroup !== undefined) {
      url.searchParams.append("ancestorsOfGroup", String(opts.ancestorsOfGroup));
    }
    if (opts.childrenOfGroup !== undefined) {
      url.searchParams.append("childrenOfGroup", String(opts.childrenOfGroup));
    }
    if (opts.descendantsOfGroup !== undefined) {
      url.searchParams.append("descendantsOfGroup", String(opts.descendantsOfGroup));
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
    return data as ListGroupsResponse;
  }

  /**
   * Lists the monitored resources that are members of a group.
   *
   * @param name Required. The group whose members are listed. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] 
   */
  async projectsGroupsMembersList(name: string, opts: ProjectsGroupsMembersListOptions = {}): Promise<ListGroupMembersResponse> {
    opts = serializeProjectsGroupsMembersListOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }/members`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts["interval.endTime"] !== undefined) {
      url.searchParams.append("interval.endTime", String(opts["interval.endTime"]));
    }
    if (opts["interval.startTime"] !== undefined) {
      url.searchParams.append("interval.startTime", String(opts["interval.startTime"]));
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
    return data as ListGroupMembersResponse;
  }

  /**
   * Updates an existing group. You can change any group attributes except
   * name.
   *
   * @param name Output only. The name of this group. The format is: projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] When creating a group, this field is ignored and a new name is created consisting of the project specified in the call to CreateGroup and a unique [GROUP_ID] that is generated automatically.
   */
  async projectsGroupsUpdate(name: string, req: Group, opts: ProjectsGroupsUpdateOptions = {}): Promise<Group> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Group;
  }

  /**
   * Creates a new metric descriptor. The creation is executed asynchronously.
   * User-created metric descriptors define custom metrics
   * (https://cloud.google.com/monitoring/custom-metrics). The metric descriptor
   * is updated if it already exists, except that metric labels are never
   * removed.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: 4 projects/PROJECT_ID_OR_NUMBER
   */
  async projectsMetricDescriptorsCreate(name: string, req: MetricDescriptor): Promise<MetricDescriptor> {
    req = serializeMetricDescriptor(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }/metricDescriptors`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeMetricDescriptor(data);
  }

  /**
   * Deletes a metric descriptor. Only user-created custom metrics
   * (https://cloud.google.com/monitoring/custom-metrics) can be deleted.
   *
   * @param name Required. The metric descriptor on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/metricDescriptors/[METRIC_ID] An example of [METRIC_ID] is: "custom.googleapis.com/my_test_metric".
   */
  async projectsMetricDescriptorsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single metric descriptor.
   *
   * @param name Required. The metric descriptor on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/metricDescriptors/[METRIC_ID] An example value of [METRIC_ID] is "compute.googleapis.com/instance/disk/read_bytes_count".
   */
  async projectsMetricDescriptorsGet(name: string): Promise<MetricDescriptor> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMetricDescriptor(data);
  }

  /**
   * Lists metric descriptors that match a filter.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsMetricDescriptorsList(name: string, opts: ProjectsMetricDescriptorsListOptions = {}): Promise<ListMetricDescriptorsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/metricDescriptors`);
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
    return deserializeListMetricDescriptorsResponse(data);
  }

  /**
   * Gets a single monitored resource descriptor.
   *
   * @param name Required. The monitored resource descriptor to get. The format is: projects/[PROJECT_ID_OR_NUMBER]/monitoredResourceDescriptors/[RESOURCE_TYPE] The [RESOURCE_TYPE] is a predefined type, such as cloudsql_database.
   */
  async projectsMonitoredResourceDescriptorsGet(name: string): Promise<MonitoredResourceDescriptor> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MonitoredResourceDescriptor;
  }

  /**
   * Lists monitored resource descriptors that match a filter.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsMonitoredResourceDescriptorsList(name: string, opts: ProjectsMonitoredResourceDescriptorsListOptions = {}): Promise<ListMonitoredResourceDescriptorsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/monitoredResourceDescriptors`);
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
    return data as ListMonitoredResourceDescriptorsResponse;
  }

  /**
   * Gets a single channel descriptor. The descriptor indicates which fields
   * are expected / permitted for a notification channel of the given type.
   *
   * @param name Required. The channel type for which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannelDescriptors/[CHANNEL_TYPE] 
   */
  async projectsNotificationChannelDescriptorsGet(name: string): Promise<NotificationChannelDescriptor> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NotificationChannelDescriptor;
  }

  /**
   * Lists the descriptors for supported channel types. The use of descriptors
   * makes it possible for new channel types to be dynamically added.
   *
   * @param name Required. The REST resource name of the parent from which to retrieve the notification channel descriptors. The expected syntax is: projects/[PROJECT_ID_OR_NUMBER] Note that this names (https://cloud.google.com/monitoring/api/v3#project_name) the parent container in which to look for the descriptors; to retrieve a single descriptor by name, use the GetNotificationChannelDescriptor operation, instead.
   */
  async projectsNotificationChannelDescriptorsList(name: string, opts: ProjectsNotificationChannelDescriptorsListOptions = {}): Promise<ListNotificationChannelDescriptorsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/notificationChannelDescriptors`);
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
    return data as ListNotificationChannelDescriptorsResponse;
  }

  /**
   * Creates a new notification channel, representing a single notification
   * endpoint such as an email address, SMS number, or PagerDuty service.Design
   * your application to single-thread API calls that modify the state of
   * notification channels in a single project. This includes calls to
   * CreateNotificationChannel, DeleteNotificationChannel and
   * UpdateNotificationChannel.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] This names the container into which the channel will be written, this does not name the newly created channel. The resulting channel's name will have a normalized version of this field as a prefix, but will add /notificationChannels/[CHANNEL_ID] to identify the channel.
   */
  async projectsNotificationChannelsCreate(name: string, req: NotificationChannel): Promise<NotificationChannel> {
    req = serializeNotificationChannel(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }/notificationChannels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeNotificationChannel(data);
  }

  /**
   * Deletes a notification channel.Design your application to single-thread
   * API calls that modify the state of notification channels in a single
   * project. This includes calls to CreateNotificationChannel,
   * DeleteNotificationChannel and UpdateNotificationChannel.
   *
   * @param name Required. The channel for which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] 
   */
  async projectsNotificationChannelsDelete(name: string, opts: ProjectsNotificationChannelsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Gets a single notification channel. The channel includes the relevant
   * configuration details with which the channel was created. However, the
   * response may truncate or omit passwords, API keys, or other private key
   * matter and thus the response may not be 100% identical to the information
   * that was supplied in the call to the create method.
   *
   * @param name Required. The channel for which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] 
   */
  async projectsNotificationChannelsGet(name: string): Promise<NotificationChannel> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNotificationChannel(data);
  }

  /**
   * Requests a verification code for an already verified channel that can then
   * be used in a call to VerifyNotificationChannel() on a different channel
   * with an equivalent identity in the same or in a different project. This
   * makes it possible to copy a channel between projects without requiring
   * manual reverification of the channel. If the channel is not in the verified
   * state, this method will fail (in other words, this may only be used if the
   * SendNotificationChannelVerificationCode and VerifyNotificationChannel paths
   * have already been used to put the given channel into the verified
   * state).There is no guarantee that the verification codes returned by this
   * method will be of a similar structure or form as the ones that are
   * delivered to the channel via SendNotificationChannelVerificationCode; while
   * VerifyNotificationChannel() will recognize both the codes delivered via
   * SendNotificationChannelVerificationCode() and returned from
   * GetNotificationChannelVerificationCode(), it is typically the case that the
   * verification codes delivered via SendNotificationChannelVerificationCode()
   * will be shorter and also have a shorter expiration (e.g. codes such as
   * "G-123456") whereas GetVerificationCode() will typically return a much
   * longer, websafe base 64 encoded string that has a longer expiration time.
   *
   * @param name Required. The notification channel for which a verification code is to be generated and retrieved. This must name a channel that is already verified; if the specified channel is not verified, the request will fail.
   */
  async projectsNotificationChannelsGetVerificationCode(name: string, req: GetNotificationChannelVerificationCodeRequest): Promise<GetNotificationChannelVerificationCodeResponse> {
    req = serializeGetNotificationChannelVerificationCodeRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }:getVerificationCode`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGetNotificationChannelVerificationCodeResponse(data);
  }

  /**
   * Lists the notification channels that have been created for the project.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] This names the container in which to look for the notification channels; it does not name a specific channel. To query a specific channel by REST resource name, use the GetNotificationChannel operation.
   */
  async projectsNotificationChannelsList(name: string, opts: ProjectsNotificationChannelsListOptions = {}): Promise<ListNotificationChannelsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/notificationChannels`);
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
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListNotificationChannelsResponse(data);
  }

  /**
   * Updates a notification channel. Fields not specified in the field mask
   * remain unchanged.Design your application to single-thread API calls that
   * modify the state of notification channels in a single project. This
   * includes calls to CreateNotificationChannel, DeleteNotificationChannel and
   * UpdateNotificationChannel.
   *
   * @param name The full REST resource name for this channel. The format is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] The [CHANNEL_ID] is automatically assigned by the server on creation.
   */
  async projectsNotificationChannelsPatch(name: string, req: NotificationChannel, opts: ProjectsNotificationChannelsPatchOptions = {}): Promise<NotificationChannel> {
    req = serializeNotificationChannel(req);
    opts = serializeProjectsNotificationChannelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeNotificationChannel(data);
  }

  /**
   * Causes a verification code to be delivered to the channel. The code can
   * then be supplied in VerifyNotificationChannel to verify the channel.
   *
   * @param name Required. The notification channel to which to send a verification code.
   */
  async projectsNotificationChannelsSendVerificationCode(name: string, req: SendNotificationChannelVerificationCodeRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:sendVerificationCode`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Verifies a NotificationChannel by proving receipt of the code delivered to
   * the channel as a result of calling SendNotificationChannelVerificationCode.
   *
   * @param name Required. The notification channel to verify.
   */
  async projectsNotificationChannelsVerify(name: string, req: VerifyNotificationChannelRequest): Promise<NotificationChannel> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:verify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeNotificationChannel(data);
  }

  /**
   * Creates a Snooze that will prevent alerts, which match the provided
   * criteria, from being opened. The Snooze applies for a specific time
   * interval.
   *
   * @param parent Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which a Snooze should be created. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsSnoozesCreate(parent: string, req: Snooze): Promise<Snooze> {
    req = serializeSnooze(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/snoozes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSnooze(data);
  }

  /**
   * Retrieves a Snooze by name.
   *
   * @param name Required. The ID of the Snooze to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] 
   */
  async projectsSnoozesGet(name: string): Promise<Snooze> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSnooze(data);
  }

  /**
   * Lists the Snoozes associated with a project. Can optionally pass in
   * filter, which specifies predicates to match Snoozes.
   *
   * @param parent Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose Snoozes should be listed. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsSnoozesList(parent: string, opts: ProjectsSnoozesListOptions = {}): Promise<ListSnoozesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/snoozes`);
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
    return deserializeListSnoozesResponse(data);
  }

  /**
   * Updates a Snooze, identified by its name, with the parameters in the given
   * Snooze object.
   *
   * @param name Required. The name of the Snooze. The format is: projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] The ID of the Snooze will be generated by the system.
   */
  async projectsSnoozesPatch(name: string, req: Snooze, opts: ProjectsSnoozesPatchOptions = {}): Promise<Snooze> {
    req = serializeSnooze(req);
    opts = serializeProjectsSnoozesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSnooze(data);
  }

  /**
   * Creates or adds data to one or more time series. The response is empty if
   * all time series in the request were written. If any time series could not
   * be written, a corresponding failure message is included in the error
   * response.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsTimeSeriesCreate(name: string, req: CreateTimeSeriesRequest): Promise<Empty> {
    req = serializeCreateTimeSeriesRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }/timeSeries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Creates or adds data to one or more service time series. A service time
   * series is a time series for a metric from a Google Cloud service. The
   * response is empty if all time series in the request were written. If any
   * time series could not be written, a corresponding failure message is
   * included in the error response. This endpoint rejects writes to
   * user-defined metrics. This method is only for use by Google Cloud services.
   * Use projects.timeSeries.create instead.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsTimeSeriesCreateService(name: string, req: CreateTimeSeriesRequest): Promise<Empty> {
    req = serializeCreateTimeSeriesRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }/timeSeries:createService`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Lists time series that match a filter.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] organizations/[ORGANIZATION_ID] folders/[FOLDER_ID] 
   */
  async projectsTimeSeriesList(name: string, opts: ProjectsTimeSeriesListOptions = {}): Promise<ListTimeSeriesResponse> {
    opts = serializeProjectsTimeSeriesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }/timeSeries`);
    if (opts["aggregation.alignmentPeriod"] !== undefined) {
      url.searchParams.append("aggregation.alignmentPeriod", String(opts["aggregation.alignmentPeriod"]));
    }
    if (opts["aggregation.crossSeriesReducer"] !== undefined) {
      url.searchParams.append("aggregation.crossSeriesReducer", String(opts["aggregation.crossSeriesReducer"]));
    }
    if (opts["aggregation.groupByFields"] !== undefined) {
      url.searchParams.append("aggregation.groupByFields", String(opts["aggregation.groupByFields"]));
    }
    if (opts["aggregation.perSeriesAligner"] !== undefined) {
      url.searchParams.append("aggregation.perSeriesAligner", String(opts["aggregation.perSeriesAligner"]));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts["interval.endTime"] !== undefined) {
      url.searchParams.append("interval.endTime", String(opts["interval.endTime"]));
    }
    if (opts["interval.startTime"] !== undefined) {
      url.searchParams.append("interval.startTime", String(opts["interval.startTime"]));
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
    if (opts["secondaryAggregation.alignmentPeriod"] !== undefined) {
      url.searchParams.append("secondaryAggregation.alignmentPeriod", String(opts["secondaryAggregation.alignmentPeriod"]));
    }
    if (opts["secondaryAggregation.crossSeriesReducer"] !== undefined) {
      url.searchParams.append("secondaryAggregation.crossSeriesReducer", String(opts["secondaryAggregation.crossSeriesReducer"]));
    }
    if (opts["secondaryAggregation.groupByFields"] !== undefined) {
      url.searchParams.append("secondaryAggregation.groupByFields", String(opts["secondaryAggregation.groupByFields"]));
    }
    if (opts["secondaryAggregation.perSeriesAligner"] !== undefined) {
      url.searchParams.append("secondaryAggregation.perSeriesAligner", String(opts["secondaryAggregation.perSeriesAligner"]));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListTimeSeriesResponse(data);
  }

  /**
   * Queries time series using Monitoring Query Language.
   *
   * @param name Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsTimeSeriesQuery(name: string, req: QueryTimeSeriesRequest): Promise<QueryTimeSeriesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/timeSeries:query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeQueryTimeSeriesResponse(data);
  }

  /**
   * Creates a new Uptime check configuration.
   *
   * @param parent Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the Uptime check. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsUptimeCheckConfigsCreate(parent: string, req: UptimeCheckConfig): Promise<UptimeCheckConfig> {
    req = serializeUptimeCheckConfig(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/uptimeCheckConfigs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUptimeCheckConfig(data);
  }

  /**
   * Deletes an Uptime check configuration. Note that this method will fail if
   * the Uptime check configuration is referenced by an alert policy or other
   * dependent configs that would be rendered invalid by the deletion.
   *
   * @param name Required. The Uptime check configuration to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] 
   */
  async projectsUptimeCheckConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single Uptime check configuration.
   *
   * @param name Required. The Uptime check configuration to retrieve. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] 
   */
  async projectsUptimeCheckConfigsGet(name: string): Promise<UptimeCheckConfig> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUptimeCheckConfig(data);
  }

  /**
   * Lists the existing valid Uptime check configurations for the project
   * (leaving out any invalid configurations).
   *
   * @param parent Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose Uptime check configurations are listed. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async projectsUptimeCheckConfigsList(parent: string, opts: ProjectsUptimeCheckConfigsListOptions = {}): Promise<ListUptimeCheckConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/uptimeCheckConfigs`);
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
    return deserializeListUptimeCheckConfigsResponse(data);
  }

  /**
   * Updates an Uptime check configuration. You can either replace the entire
   * configuration with a new one or replace only certain fields in the current
   * configuration by specifying the fields to be updated via updateMask.
   * Returns the updated configuration.
   *
   * @param name A unique resource name for this Uptime check configuration. The format is: projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID] [PROJECT_ID_OR_NUMBER] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response.
   */
  async projectsUptimeCheckConfigsPatch(name: string, req: UptimeCheckConfig, opts: ProjectsUptimeCheckConfigsPatchOptions = {}): Promise<UptimeCheckConfig> {
    req = serializeUptimeCheckConfig(req);
    opts = serializeProjectsUptimeCheckConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeUptimeCheckConfig(data);
  }

  /**
   * Create a Service.
   *
   * @param parent Required. Resource name (https://cloud.google.com/monitoring/api/v3#project_name) of the parent Metrics Scope. The format is: projects/[PROJECT_ID_OR_NUMBER] 
   */
  async servicesCreate(parent: string, req: Service, opts: ServicesCreateOptions = {}): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/services`);
    if (opts.serviceId !== undefined) {
      url.searchParams.append("serviceId", String(opts.serviceId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Service;
  }

  /**
   * Soft delete this Service.
   *
   * @param name Required. Resource name of the Service to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] 
   */
  async servicesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get the named Service.
   *
   * @param name Required. Resource name of the Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] 
   */
  async servicesGet(name: string): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Service;
  }

  /**
   * List Services for this Metrics Scope.
   *
   * @param parent Required. Resource name of the parent containing the listed services, either a project (https://cloud.google.com/monitoring/api/v3#project_name) or a Monitoring Metrics Scope. The formats are: projects/[PROJECT_ID_OR_NUMBER] workspaces/[HOST_PROJECT_ID_OR_NUMBER] 
   */
  async servicesList(parent: string, opts: ServicesListOptions = {}): Promise<ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/services`);
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
    return data as ListServicesResponse;
  }

  /**
   * Update this Service.
   *
   * @param name Resource name for this Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] 
   */
  async servicesPatch(name: string, req: Service, opts: ServicesPatchOptions = {}): Promise<Service> {
    opts = serializeServicesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Service;
  }

  /**
   * Create a ServiceLevelObjective for the given Service.
   *
   * @param parent Required. Resource name of the parent Service. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] 
   */
  async servicesServiceLevelObjectivesCreate(parent: string, req: ServiceLevelObjective, opts: ServicesServiceLevelObjectivesCreateOptions = {}): Promise<ServiceLevelObjective> {
    req = serializeServiceLevelObjective(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/serviceLevelObjectives`);
    if (opts.serviceLevelObjectiveId !== undefined) {
      url.searchParams.append("serviceLevelObjectiveId", String(opts.serviceLevelObjectiveId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeServiceLevelObjective(data);
  }

  /**
   * Delete the given ServiceLevelObjective.
   *
   * @param name Required. Resource name of the ServiceLevelObjective to delete. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] 
   */
  async servicesServiceLevelObjectivesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a ServiceLevelObjective by name.
   *
   * @param name Required. Resource name of the ServiceLevelObjective to get. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] 
   */
  async servicesServiceLevelObjectivesGet(name: string, opts: ServicesServiceLevelObjectivesGetOptions = {}): Promise<ServiceLevelObjective> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeServiceLevelObjective(data);
  }

  /**
   * List the ServiceLevelObjectives for the given Service.
   *
   * @param parent Required. Resource name of the parent containing the listed SLOs, either a project or a Monitoring Metrics Scope. The formats are: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID] workspaces/[HOST_PROJECT_ID_OR_NUMBER]/services/- 
   */
  async servicesServiceLevelObjectivesList(parent: string, opts: ServicesServiceLevelObjectivesListOptions = {}): Promise<ListServiceLevelObjectivesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/serviceLevelObjectives`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return deserializeListServiceLevelObjectivesResponse(data);
  }

  /**
   * Update the given ServiceLevelObjective.
   *
   * @param name Resource name for this ServiceLevelObjective. The format is: projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME] 
   */
  async servicesServiceLevelObjectivesPatch(name: string, req: ServiceLevelObjective, opts: ServicesServiceLevelObjectivesPatchOptions = {}): Promise<ServiceLevelObjective> {
    req = serializeServiceLevelObjective(req);
    opts = serializeServicesServiceLevelObjectivesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeServiceLevelObjective(data);
  }

  /**
   * Returns the list of IP addresses that checkers run from
   *
   */
  async uptimeCheckIpsList(opts: UptimeCheckIpsListOptions = {}): Promise<ListUptimeCheckIpsResponse> {
    const url = new URL(`${this.#baseUrl}v3/uptimeCheckIps`);
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
    return data as ListUptimeCheckIpsResponse;
  }
}

/**
 * Describes how to combine multiple time series to provide a different view of
 * the data. Aggregation of time series is done in two steps. First, each time
 * series in the set is aligned to the same time interval boundaries, then the
 * set of time series is optionally reduced in number.Alignment consists of
 * applying the per_series_aligner operation to each time series after its data
 * has been divided into regular alignment_period time intervals. This process
 * takes all of the data points in an alignment period, applies a mathematical
 * transformation such as averaging, minimum, maximum, delta, etc., and converts
 * them into a single data point per period.Reduction is when the aligned and
 * transformed time series can optionally be combined, reducing the number of
 * time series through similar mathematical transformations. Reduction involves
 * applying a cross_series_reducer to all the time series, optionally sorting
 * the time series into subsets with group_by_fields, and applying the reducer
 * to each subset.The raw time series data can contain a huge amount of
 * information from multiple sources. Alignment and reduction transforms this
 * mass of data into a more manageable and representative collection of data,
 * for example "the 95% latency across the average of all tasks in a cluster".
 * This representative data can be more easily graphed and comprehended, and the
 * individual time series data is still available for later drilldown. For more
 * details, see Filtering and aggregation
 * (https://cloud.google.com/monitoring/api/v3/aggregation).
 */
export interface Aggregation {
  /**
   * The alignment_period specifies a time interval, in seconds, that is used
   * to divide the data in all the time series into consistent blocks of time.
   * This will be done before the per-series aligner can be applied to the
   * data.The value must be at least 60 seconds. If a per-series aligner other
   * than ALIGN_NONE is specified, this field is required or an error is
   * returned. If no per-series aligner is specified, or the aligner ALIGN_NONE
   * is specified, then this field is ignored.The maximum value of the
   * alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25
   * hours) for alerting policies.
   */
  alignmentPeriod?: number /* Duration */;
  /**
   * The reduction operation to be used to combine time series into a single
   * time series, where the value of each data point in the resulting series is
   * a function of all the already aligned values in the input time series.Not
   * all reducer operations can be applied to all time series. The valid choices
   * depend on the metric_kind and the value_type of the original time series.
   * Reduction can yield a time series with a different metric_kind or
   * value_type than the input time series.Time series data must first be
   * aligned (see per_series_aligner) in order to perform cross-time series
   * reduction. If cross_series_reducer is specified, then per_series_aligner
   * must be specified, and must not be ALIGN_NONE. An alignment_period must
   * also be specified; otherwise, an error is returned.
   */
  crossSeriesReducer?:  | "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05";
  /**
   * The set of fields to preserve when cross_series_reducer is specified. The
   * group_by_fields determine how the time series are partitioned into subsets
   * prior to applying the aggregation operation. Each subset contains time
   * series that have the same value for each of the grouping fields. Each
   * individual time series is a member of exactly one subset. The
   * cross_series_reducer is applied to each subset of time series. It is not
   * possible to reduce across different resource types, so this field
   * implicitly contains resource.type. Fields not specified in group_by_fields
   * are aggregated away. If group_by_fields is not specified and all the time
   * series have the same resource type, then the time series are aggregated
   * into a single output time series. If cross_series_reducer is not defined,
   * this field is ignored.
   */
  groupByFields?: string[];
  /**
   * An Aligner describes how to bring the data points in a single time series
   * into temporal alignment. Except for ALIGN_NONE, all alignments cause all
   * the data points in an alignment_period to be mathematically grouped
   * together, resulting in a single data point for each alignment_period with
   * end timestamp at the end of the period.Not all alignment operations may be
   * applied to all time series. The valid choices depend on the metric_kind and
   * value_type of the original time series. Alignment can change the
   * metric_kind or the value_type of the time series.Time series data must be
   * aligned in order to perform cross-time series reduction. If
   * cross_series_reducer is specified, then per_series_aligner must be
   * specified and not equal to ALIGN_NONE and alignment_period must be
   * specified; otherwise, an error is returned.
   */
  perSeriesAligner?:  | "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE";
}

function serializeAggregation(data: any): Aggregation {
  return {
    ...data,
    alignmentPeriod: data["alignmentPeriod"] !== undefined ? data["alignmentPeriod"] : undefined,
  };
}

function deserializeAggregation(data: any): Aggregation {
  return {
    ...data,
    alignmentPeriod: data["alignmentPeriod"] !== undefined ? data["alignmentPeriod"] : undefined,
  };
}

/**
 * A description of the conditions under which some aspect of your system is
 * considered to be "unhealthy" and the ways to notify people or services about
 * this state. For an overview of alert policies, see Introduction to Alerting
 * (https://cloud.google.com/monitoring/alerts/).
 */
export interface AlertPolicy {
  /**
   * Control over how this alert policy's notification channels are notified.
   */
  alertStrategy?: AlertStrategy;
  /**
   * How to combine the results of multiple conditions to determine if an
   * incident should be opened. If condition_time_series_query_language is
   * present, this must be COMBINE_UNSPECIFIED.
   */
  combiner?:  | "COMBINE_UNSPECIFIED" | "AND" | "OR" | "AND_WITH_MATCHING_RESOURCE";
  /**
   * A list of conditions for the policy. The conditions are combined by AND or
   * OR according to the combiner field. If the combined conditions evaluate to
   * true, then an incident is created. A policy can have from one to six
   * conditions. If condition_time_series_query_language is present, it must be
   * the only condition.
   */
  conditions?: Condition[];
  /**
   * A read-only record of the creation of the alerting policy. If provided in
   * a call to create or update, this field will be ignored.
   */
  creationRecord?: MutationRecord;
  /**
   * A short name or phrase used to identify the policy in dashboards,
   * notifications, and incidents. To avoid confusion, don't use the same
   * display name for multiple policies in the same project. The name is limited
   * to 512 Unicode characters.
   */
  displayName?: string;
  /**
   * Documentation that is included with notifications and incidents related to
   * this policy. Best practice is for the documentation to include information
   * to help responders understand, mitigate, escalate, and correct the
   * underlying problems detected by the alerting policy. Notification channels
   * that have limited capacity might not show this documentation.
   */
  documentation?: Documentation;
  /**
   * Whether or not the policy is enabled. On write, the default interpretation
   * if unset is that the policy is enabled. On read, clients should not make
   * any assumption about the state if it has not been populated. The field
   * should always be populated on List and Get operations, unless a field
   * projection has been specified that strips it out.
   */
  enabled?: boolean;
  /**
   * A read-only record of the most recent change to the alerting policy. If
   * provided in a call to create or update, this field will be ignored.
   */
  mutationRecord?: MutationRecord;
  /**
   * Required if the policy exists. The resource name for this policy. The
   * format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[ALERT_POLICY_ID]
   * [ALERT_POLICY_ID] is assigned by Cloud Monitoring when the policy is
   * created. When calling the alertPolicies.create method, do not include the
   * name field in the alerting policy passed as part of the request.
   */
  name?: string;
  /**
   * Identifies the notification channels to which notifications should be sent
   * when incidents are opened or closed or when new violations occur on an
   * already opened incident. Each element of this array corresponds to the name
   * field in each of the NotificationChannel objects that are returned from the
   * ListNotificationChannels method. The format of the entries in this field
   * is: projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID]
   */
  notificationChannels?: string[];
  /**
   * User-supplied key/value data to be used for organizing and identifying the
   * AlertPolicy objects.The field can contain up to 64 entries. Each key and
   * value is limited to 63 Unicode characters or 128 bytes, whichever is
   * smaller. Labels and values can contain only lowercase letters, numerals,
   * underscores, and dashes. Keys must begin with a letter.
   */
  userLabels?: {
    [key: string]: string
  };
  /**
   * Read-only description of how the alert policy is invalid. OK if the alert
   * policy is valid. If not OK, the alert policy will not generate incidents.
   */
  validity?: Status;
}

function serializeAlertPolicy(data: any): AlertPolicy {
  return {
    ...data,
    alertStrategy: data["alertStrategy"] !== undefined ? serializeAlertStrategy(data["alertStrategy"]) : undefined,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (serializeCondition(item))) : undefined,
    creationRecord: data["creationRecord"] !== undefined ? serializeMutationRecord(data["creationRecord"]) : undefined,
    mutationRecord: data["mutationRecord"] !== undefined ? serializeMutationRecord(data["mutationRecord"]) : undefined,
  };
}

function deserializeAlertPolicy(data: any): AlertPolicy {
  return {
    ...data,
    alertStrategy: data["alertStrategy"] !== undefined ? deserializeAlertStrategy(data["alertStrategy"]) : undefined,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeCondition(item))) : undefined,
    creationRecord: data["creationRecord"] !== undefined ? deserializeMutationRecord(data["creationRecord"]) : undefined,
    mutationRecord: data["mutationRecord"] !== undefined ? deserializeMutationRecord(data["mutationRecord"]) : undefined,
  };
}

/**
 * Control over how the notification channels in notification_channels are
 * notified when this alert fires.
 */
export interface AlertStrategy {
  /**
   * If an alert policy that was active has no data for this long, any open
   * incidents will close
   */
  autoClose?: number /* Duration */;
  /**
   * Required for alert policies with a LogMatch condition.This limit is not
   * implemented for alert policies that are not log-based.
   */
  notificationRateLimit?: NotificationRateLimit;
}

function serializeAlertStrategy(data: any): AlertStrategy {
  return {
    ...data,
    autoClose: data["autoClose"] !== undefined ? data["autoClose"] : undefined,
    notificationRateLimit: data["notificationRateLimit"] !== undefined ? serializeNotificationRateLimit(data["notificationRateLimit"]) : undefined,
  };
}

function deserializeAlertStrategy(data: any): AlertStrategy {
  return {
    ...data,
    autoClose: data["autoClose"] !== undefined ? data["autoClose"] : undefined,
    notificationRateLimit: data["notificationRateLimit"] !== undefined ? deserializeNotificationRateLimit(data["notificationRateLimit"]) : undefined,
  };
}

/**
 * App Engine service. Learn more at https://cloud.google.com/appengine.
 */
export interface AppEngine {
  /**
   * The ID of the App Engine module underlying this service. Corresponds to
   * the module_id resource label in the gae_app monitored resource
   * (https://cloud.google.com/monitoring/api/resources#tag_gae_app).
   */
  moduleId?: string;
}

/**
 * Future parameters for the availability SLI.
 */
export interface AvailabilityCriteria {
}

/**
 * The authentication parameters to provide to the specified resource or URL
 * that requires a username and password. Currently, only Basic HTTP
 * authentication (https://tools.ietf.org/html/rfc7617) is supported in Uptime
 * checks.
 */
export interface BasicAuthentication {
  /**
   * The password to use when authenticating with the HTTP server.
   */
  password?: string;
  /**
   * The username to use when authenticating with the HTTP server.
   */
  username?: string;
}

/**
 * A well-known service type, defined by its service type and service labels.
 * Documentation and examples here
 * (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).
 */
export interface BasicService {
  /**
   * Labels that specify the resource that emits the monitoring data which is
   * used for SLO reporting of this Service. Documentation and valid values for
   * given service types here
   * (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).
   */
  serviceLabels?: {
    [key: string]: string
  };
  /**
   * The type of service that this basic service defines, e.g. APP_ENGINE
   * service type. Documentation and valid values here
   * (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).
   */
  serviceType?: string;
}

/**
 * An SLI measuring performance on a well-known service type. Performance will
 * be computed on the basis of pre-defined metrics. The type of the
 * service_resource determines the metrics to use and the
 * service_resource.labels and metric_labels are used to construct a monitoring
 * filter to filter that metric down to just the data relevant to this service.
 */
export interface BasicSli {
  /**
   * Good service is defined to be the count of requests made to this service
   * that return successfully.
   */
  availability?: AvailabilityCriteria;
  /**
   * Good service is defined to be the count of requests made to this service
   * that are fast enough with respect to latency.threshold.
   */
  latency?: LatencyCriteria;
  /**
   * OPTIONAL: The set of locations to which this SLI is relevant. Telemetry
   * from other locations will not be used to calculate performance for this
   * SLI. If omitted, this SLI applies to all locations in which the Service has
   * activity. For service types that don't support breaking down by location,
   * setting this field will result in an error.
   */
  location?: string[];
  /**
   * OPTIONAL: The set of RPCs to which this SLI is relevant. Telemetry from
   * other methods will not be used to calculate performance for this SLI. If
   * omitted, this SLI applies to all the Service's methods. For service types
   * that don't support breaking down by method, setting this field will result
   * in an error.
   */
  method?: string[];
  /**
   * OPTIONAL: The set of API versions to which this SLI is relevant. Telemetry
   * from other API versions will not be used to calculate performance for this
   * SLI. If omitted, this SLI applies to all API versions. For service types
   * that don't support breaking down by version, setting this field will result
   * in an error.
   */
  version?: string[];
}

function serializeBasicSli(data: any): BasicSli {
  return {
    ...data,
    latency: data["latency"] !== undefined ? serializeLatencyCriteria(data["latency"]) : undefined,
  };
}

function deserializeBasicSli(data: any): BasicSli {
  return {
    ...data,
    latency: data["latency"] !== undefined ? deserializeLatencyCriteria(data["latency"]) : undefined,
  };
}

/**
 * BucketOptions describes the bucket boundaries used to create a histogram for
 * the distribution. The buckets can be in a linear sequence, an exponential
 * sequence, or each bucket can be specified explicitly. BucketOptions does not
 * include the number of values in each bucket.A bucket has an inclusive lower
 * bound and exclusive upper bound for the values that are counted for that
 * bucket. The upper bound of a bucket must be strictly greater than the lower
 * bound. The sequence of N buckets for a distribution consists of an underflow
 * bucket (number 0), zero or more finite buckets (number 1 through N - 2) and
 * an overflow bucket (number N - 1). The buckets are contiguous: the lower
 * bound of bucket i (i > 0) is the same as the upper bound of bucket i - 1. The
 * buckets span the whole range of finite values: lower bound of the underflow
 * bucket is -infinity and the upper bound of the overflow bucket is +infinity.
 * The finite buckets are so-called because both bounds are finite.
 */
export interface BucketOptions {
  /**
   * The explicit buckets.
   */
  explicitBuckets?: Explicit;
  /**
   * The exponential buckets.
   */
  exponentialBuckets?: Exponential;
  /**
   * The linear bucket.
   */
  linearBuckets?: Linear;
}

/**
 * Cloud Endpoints service. Learn more at https://cloud.google.com/endpoints.
 */
export interface CloudEndpoints {
  /**
   * The name of the Cloud Endpoints service underlying this service.
   * Corresponds to the service resource label in the api monitored resource
   * (https://cloud.google.com/monitoring/api/resources#tag_api).
   */
  service?: string;
}

/**
 * Cloud Run service. Learn more at https://cloud.google.com/run.
 */
export interface CloudRun {
  /**
   * The location the service is run. Corresponds to the location resource
   * label in the cloud_run_revision monitored resource
   * (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision).
   */
  location?: string;
  /**
   * The name of the Cloud Run service. Corresponds to the service_name
   * resource label in the cloud_run_revision monitored resource
   * (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision).
   */
  serviceName?: string;
}

/**
 * Istio service scoped to a single Kubernetes cluster. Learn more at
 * https://istio.io. Clusters running OSS Istio will have their services
 * ingested as this type.
 */
export interface ClusterIstio {
  /**
   * The name of the Kubernetes cluster in which this Istio service is defined.
   * Corresponds to the cluster_name resource label in k8s_cluster resources.
   */
  clusterName?: string;
  /**
   * The location of the Kubernetes cluster in which this Istio service is
   * defined. Corresponds to the location resource label in k8s_cluster
   * resources.
   */
  location?: string;
  /**
   * The name of the Istio service underlying this service. Corresponds to the
   * destination_service_name metric label in Istio metrics.
   */
  serviceName?: string;
  /**
   * The namespace of the Istio service underlying this service. Corresponds to
   * the destination_service_namespace metric label in Istio metrics.
   */
  serviceNamespace?: string;
}

/**
 * A collection of data points sent from a collectd-based plugin. See the
 * collectd documentation for more information.
 */
export interface CollectdPayload {
  /**
   * The end time of the interval.
   */
  endTime?: Date;
  /**
   * The measurement metadata. Example: "process_id" -> 12345
   */
  metadata?: {
    [key: string]: TypedValue
  };
  /**
   * The name of the plugin. Example: "disk".
   */
  plugin?: string;
  /**
   * The instance name of the plugin Example: "hdcl".
   */
  pluginInstance?: string;
  /**
   * The start time of the interval.
   */
  startTime?: Date;
  /**
   * The measurement type. Example: "memory".
   */
  type?: string;
  /**
   * The measurement type instance. Example: "used".
   */
  typeInstance?: string;
  /**
   * The measured values during this time interval. Each value must have a
   * different data_source_name.
   */
  values?: CollectdValue[];
}

function serializeCollectdPayload(data: any): CollectdPayload {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    metadata: data["metadata"] !== undefined ? Object.fromEntries(Object.entries(data["metadata"]).map(([k, v]: [string, any]) => ([k, serializeTypedValue(v)]))) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeCollectdValue(item))) : undefined,
  };
}

function deserializeCollectdPayload(data: any): CollectdPayload {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    metadata: data["metadata"] !== undefined ? Object.fromEntries(Object.entries(data["metadata"]).map(([k, v]: [string, any]) => ([k, deserializeTypedValue(v)]))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeCollectdValue(item))) : undefined,
  };
}

/**
 * Describes the error status for payloads that were not written.
 */
export interface CollectdPayloadError {
  /**
   * Records the error status for the payload. If this field is present, the
   * partial errors for nested values won't be populated.
   */
  error?: Status;
  /**
   * The zero-based index in CreateCollectdTimeSeriesRequest.collectd_payloads.
   */
  index?: number;
  /**
   * Records the error status for values that were not written due to an
   * error.Failed payloads for which nothing is written will not include partial
   * value errors.
   */
  valueErrors?: CollectdValueError[];
}

/**
 * A single data point from a collectd-based plugin.
 */
export interface CollectdValue {
  /**
   * The data source for the collectd value. For example, there are two data
   * sources for network measurements: "rx" and "tx".
   */
  dataSourceName?: string;
  /**
   * The type of measurement.
   */
  dataSourceType?:  | "UNSPECIFIED_DATA_SOURCE_TYPE" | "GAUGE" | "COUNTER" | "DERIVE" | "ABSOLUTE";
  /**
   * The measurement value.
   */
  value?: TypedValue;
}

function serializeCollectdValue(data: any): CollectdValue {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeTypedValue(data["value"]) : undefined,
  };
}

function deserializeCollectdValue(data: any): CollectdValue {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeTypedValue(data["value"]) : undefined,
  };
}

/**
 * Describes the error status for values that were not written.
 */
export interface CollectdValueError {
  /**
   * Records the error status for the value.
   */
  error?: Status;
  /**
   * The zero-based index in CollectdPayload.values within the parent
   * CreateCollectdTimeSeriesRequest.collectd_payloads.
   */
  index?: number;
}

/**
 * A condition is a true/false test that determines when an alerting policy
 * should open an incident. If a condition evaluates to true, it signifies that
 * something is wrong.
 */
export interface Condition {
  /**
   * A condition that checks that a time series continues to receive new data
   * points.
   */
  conditionAbsent?: MetricAbsence;
  /**
   * A condition that checks for log messages matching given constraints. If
   * set, no other conditions can be present.
   */
  conditionMatchedLog?: LogMatch;
  /**
   * A condition that uses the Monitoring Query Language to define alerts.
   */
  conditionMonitoringQueryLanguage?: MonitoringQueryLanguageCondition;
  /**
   * A condition that compares a time series against a threshold.
   */
  conditionThreshold?: MetricThreshold;
  /**
   * A short name or phrase used to identify the condition in dashboards,
   * notifications, and incidents. To avoid confusion, don't use the same
   * display name for multiple conditions in the same policy.
   */
  displayName?: string;
  /**
   * Required if the condition exists. The unique resource name for this
   * condition. Its format is:
   * projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID]/conditions/[CONDITION_ID]
   * [CONDITION_ID] is assigned by Cloud Monitoring when the condition is
   * created as part of a new or updated alerting policy.When calling the
   * alertPolicies.create method, do not include the name field in the
   * conditions of the requested alerting policy. Cloud Monitoring creates the
   * condition identifiers and includes them in the new policy.When calling the
   * alertPolicies.update method to update a policy, including a condition name
   * causes the existing condition to be updated. Conditions without names are
   * added to the updated policy. Existing conditions are deleted if they are
   * not updated.Best practice is to preserve [CONDITION_ID] if you make only
   * small changes, such as those to condition thresholds, durations, or trigger
   * values. Otherwise, treat the change as a new condition and let the existing
   * condition be deleted.
   */
  name?: string;
}

function serializeCondition(data: any): Condition {
  return {
    ...data,
    conditionAbsent: data["conditionAbsent"] !== undefined ? serializeMetricAbsence(data["conditionAbsent"]) : undefined,
    conditionMonitoringQueryLanguage: data["conditionMonitoringQueryLanguage"] !== undefined ? serializeMonitoringQueryLanguageCondition(data["conditionMonitoringQueryLanguage"]) : undefined,
    conditionThreshold: data["conditionThreshold"] !== undefined ? serializeMetricThreshold(data["conditionThreshold"]) : undefined,
  };
}

function deserializeCondition(data: any): Condition {
  return {
    ...data,
    conditionAbsent: data["conditionAbsent"] !== undefined ? deserializeMetricAbsence(data["conditionAbsent"]) : undefined,
    conditionMonitoringQueryLanguage: data["conditionMonitoringQueryLanguage"] !== undefined ? deserializeMonitoringQueryLanguageCondition(data["conditionMonitoringQueryLanguage"]) : undefined,
    conditionThreshold: data["conditionThreshold"] !== undefined ? deserializeMetricThreshold(data["conditionThreshold"]) : undefined,
  };
}

/**
 * Optional. Used to perform content matching. This allows matching based on
 * substrings and regular expressions, together with their negations. Only the
 * first 4 MB of an HTTP or HTTPS check's response (and the first 1 MB of a TCP
 * check's response) are examined for purposes of content matching.
 */
export interface ContentMatcher {
  /**
   * String, regex or JSON content to match. Maximum 1024 bytes. An empty
   * content string indicates no content matching is to be performed.
   */
  content?: string;
  /**
   * Matcher information for MATCHES_JSON_PATH and NOT_MATCHES_JSON_PATH
   */
  jsonPathMatcher?: JsonPathMatcher;
  /**
   * The type of content matcher that will be applied to the server output,
   * compared to the content string when the check is run.
   */
  matcher?:  | "CONTENT_MATCHER_OPTION_UNSPECIFIED" | "CONTAINS_STRING" | "NOT_CONTAINS_STRING" | "MATCHES_REGEX" | "NOT_MATCHES_REGEX" | "MATCHES_JSON_PATH" | "NOT_MATCHES_JSON_PATH";
}

/**
 * The CreateCollectdTimeSeries request.
 */
export interface CreateCollectdTimeSeriesRequest {
  /**
   * The collectd payloads representing the time series data. You must not
   * include more than a single point for each time series, so no two payloads
   * can have the same values for all of the fields plugin, plugin_instance,
   * type, and type_instance.
   */
  collectdPayloads?: CollectdPayload[];
  /**
   * The version of collectd that collected the data. Example: "5.3.0-192.el6".
   */
  collectdVersion?: string;
  /**
   * The monitored resource associated with the time series.
   */
  resource?: MonitoredResource;
}

function serializeCreateCollectdTimeSeriesRequest(data: any): CreateCollectdTimeSeriesRequest {
  return {
    ...data,
    collectdPayloads: data["collectdPayloads"] !== undefined ? data["collectdPayloads"].map((item: any) => (serializeCollectdPayload(item))) : undefined,
  };
}

function deserializeCreateCollectdTimeSeriesRequest(data: any): CreateCollectdTimeSeriesRequest {
  return {
    ...data,
    collectdPayloads: data["collectdPayloads"] !== undefined ? data["collectdPayloads"].map((item: any) => (deserializeCollectdPayload(item))) : undefined,
  };
}

/**
 * The CreateCollectdTimeSeries response.
 */
export interface CreateCollectdTimeSeriesResponse {
  /**
   * Records the error status for points that were not written due to an error
   * in the request.Failed requests for which nothing is written will return an
   * error response instead. Requests where data points were rejected by the
   * backend will set summary instead.
   */
  payloadErrors?: CollectdPayloadError[];
  /**
   * Aggregate statistics from writing the payloads. This field is omitted if
   * all points were successfully written, so that the response is empty. This
   * is for backwards compatibility with clients that log errors on any
   * non-empty response.
   */
  summary?: CreateTimeSeriesSummary;
}

/**
 * The CreateTimeSeries request.
 */
export interface CreateTimeSeriesRequest {
  /**
   * Required. The new data to be added to a list of time series. Adds at most
   * one data point to each of several time series. The new data point must be
   * more recent than any other point in its time series. Each TimeSeries value
   * must fully specify a unique time series by supplying all label values for
   * the metric and the monitored resource.The maximum number of TimeSeries
   * objects per Create request is 200.
   */
  timeSeries?: TimeSeries[];
}

function serializeCreateTimeSeriesRequest(data: any): CreateTimeSeriesRequest {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? data["timeSeries"].map((item: any) => (serializeTimeSeries(item))) : undefined,
  };
}

function deserializeCreateTimeSeriesRequest(data: any): CreateTimeSeriesRequest {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? data["timeSeries"].map((item: any) => (deserializeTimeSeries(item))) : undefined,
  };
}

/**
 * Summary of the result of a failed request to write data to a time series.
 */
export interface CreateTimeSeriesSummary {
  /**
   * The number of points that failed to be written. Order is not guaranteed.
   */
  errors?: Error[];
  /**
   * The number of points that were successfully written.
   */
  successPointCount?: number;
  /**
   * The number of points in the request.
   */
  totalPointCount?: number;
}

/**
 * Criteria specific to the AlertPolicys that this Snooze applies to. The
 * Snooze will suppress alerts that come from one of the AlertPolicys whose
 * names are supplied.
 */
export interface Criteria {
  /**
   * The specific AlertPolicy names for the alert that should be snoozed. The
   * format is: projects/[PROJECT_ID_OR_NUMBER]/alertPolicies/[POLICY_ID] There
   * is a limit of 16 policies per snooze. This limit is checked during snooze
   * creation.
   */
  policies?: string[];
}

/**
 * Use a custom service to designate a service that you want to monitor when
 * none of the other service types (like App Engine, Cloud Run, or a GKE type)
 * matches your intended service.
 */
export interface Custom {
}

/**
 * Distribution contains summary statistics for a population of values. It
 * optionally contains a histogram representing the distribution of those values
 * across a set of buckets.The summary statistics are the count, mean, sum of
 * the squared deviation from the mean, the minimum, and the maximum of the set
 * of population of values. The histogram is based on a sequence of buckets and
 * gives a count of values that fall into each bucket. The boundaries of the
 * buckets are given either explicitly or by formulas for buckets of fixed or
 * exponentially increasing widths.Although it is not forbidden, it is generally
 * a bad idea to include non-finite values (infinities or NaNs) in the
 * population of values, as this will render the mean and
 * sum_of_squared_deviation fields meaningless.
 */
export interface Distribution {
  /**
   * Required in the Cloud Monitoring API v3. The values for each bucket
   * specified in bucket_options. The sum of the values in bucketCounts must
   * equal the value in the count field of the Distribution object. The order of
   * the bucket counts follows the numbering schemes described for the three
   * bucket types. The underflow bucket has number 0; the finite buckets, if
   * any, have numbers 1 through N-2; and the overflow bucket has number N-1.
   * The size of bucket_counts must not be greater than N. If the size is less
   * than N, then the remaining buckets are assigned values of zero.
   */
  bucketCounts?: bigint[];
  /**
   * Required in the Cloud Monitoring API v3. Defines the histogram bucket
   * boundaries.
   */
  bucketOptions?: BucketOptions;
  /**
   * The number of values in the population. Must be non-negative. This value
   * must equal the sum of the values in bucket_counts if a histogram is
   * provided.
   */
  count?: bigint;
  /**
   * Must be in increasing order of value field.
   */
  exemplars?: Exemplar[];
  /**
   * The arithmetic mean of the values in the population. If count is zero then
   * this field must be zero.
   */
  mean?: number;
  /**
   * If specified, contains the range of the population values. The field must
   * not be present if the count is zero. This field is presently ignored by the
   * Cloud Monitoring API v3.
   */
  range?: Range;
  /**
   * The sum of squared deviations from the mean of the values in the
   * population. For values x_i this is: Sum[i=1..n]((x_i - mean)^2) Knuth, "The
   * Art of Computer Programming", Vol. 2, page 232, 3rd edition describes
   * Welford's method for accumulating this sum in one pass.If count is zero
   * then this field must be zero.
   */
  sumOfSquaredDeviation?: number;
}

function serializeDistribution(data: any): Distribution {
  return {
    ...data,
    bucketCounts: data["bucketCounts"] !== undefined ? data["bucketCounts"].map((item: any) => (String(item))) : undefined,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
    exemplars: data["exemplars"] !== undefined ? data["exemplars"].map((item: any) => (serializeExemplar(item))) : undefined,
  };
}

function deserializeDistribution(data: any): Distribution {
  return {
    ...data,
    bucketCounts: data["bucketCounts"] !== undefined ? data["bucketCounts"].map((item: any) => (BigInt(item))) : undefined,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
    exemplars: data["exemplars"] !== undefined ? data["exemplars"].map((item: any) => (deserializeExemplar(item))) : undefined,
  };
}

/**
 * A DistributionCut defines a TimeSeries and thresholds used for measuring
 * good service and total service. The TimeSeries must have ValueType =
 * DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. The computed
 * good_service will be the estimated count of values in the Distribution that
 * fall within the specified min and max.
 */
export interface DistributionCut {
  /**
   * A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters)
   * specifying a TimeSeries aggregating values. Must have ValueType =
   * DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE.
   */
  distributionFilter?: string;
  /**
   * Range of values considered "good." For a one-sided range, set one bound to
   * an infinite value.
   */
  range?: GoogleMonitoringV3Range;
}

/**
 * A content string and a MIME type that describes the content string's format.
 */
export interface Documentation {
  /**
   * The body of the documentation, interpreted according to mime_type. The
   * content may not exceed 8,192 Unicode characters and may not exceed more
   * than 10,240 bytes when encoded in UTF-8 format, whichever is smaller. This
   * text can be templatized by using variables
   * (https://cloud.google.com/monitoring/alerts/doc-variables).
   */
  content?: string;
  /**
   * The format of the content field. Presently, only the value "text/markdown"
   * is supported. See Markdown (https://en.wikipedia.org/wiki/Markdown) for
   * more information.
   */
  mimeType?: string;
}

/**
 * A set of (label, value) pairs that were removed from a Distribution time
 * series during aggregation and then added as an attachment to a
 * Distribution.Exemplar.The full label set for the exemplars is constructed by
 * using the dropped pairs in combination with the label values that remain on
 * the aggregated Distribution time series. The constructed full label set can
 * be used to identify the specific entity, such as the instance or job, which
 * might be contributing to a long-tail. However, with dropped labels, the
 * storage requirements are reduced because only the aggregated distribution
 * values for a large group of time series are stored.Note that there are no
 * guarantees on ordering of the labels from exemplar-to-exemplar and from
 * distribution-to-distribution in the same stream, and there may be duplicates.
 * It is up to clients to resolve any ambiguities.
 */
export interface DroppedLabels {
  /**
   * Map from label to its value, for all labels dropped in any aggregation.
   */
  label?: {
    [key: string]: string
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
 * Detailed information about an error category.
 */
export interface Error {
  /**
   * The number of points that couldn't be written because of status.
   */
  pointCount?: number;
  /**
   * The status of the requested write operation.
   */
  status?: Status;
}

/**
 * Exemplars are example points that may be used to annotate aggregated
 * distribution values. They are metadata that gives information about a
 * particular value added to a Distribution bucket, such as a trace ID that was
 * active when a value was added. They may contain further information, such as
 * a example values and timestamps, origin, etc.
 */
export interface Exemplar {
  /**
   * Contextual information about the example value. Examples are:Trace:
   * type.googleapis.com/google.monitoring.v3.SpanContextLiteral string:
   * type.googleapis.com/google.protobuf.StringValueLabels dropped during
   * aggregation: type.googleapis.com/google.monitoring.v3.DroppedLabelsThere
   * may be only a single attachment of any given message type in a single
   * exemplar, and this is enforced by the system.
   */
  attachments?: {
    [key: string]: any
  }[];
  /**
   * The observation (sampling) time of the above value.
   */
  timestamp?: Date;
  /**
   * Value of the exemplar point. This value determines to which bucket the
   * exemplar belongs.
   */
  value?: number;
}

function serializeExemplar(data: any): Exemplar {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeExemplar(data: any): Exemplar {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Specifies a set of buckets with arbitrary widths.There are size(bounds) + 1
 * (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i <
 * N-1): boundsi Lower bound (1 <= i < N); boundsi - 1The bounds field must
 * contain at least one element. If bounds has only one element, then there are
 * no finite buckets, and that single element is the common boundary of the
 * overflow and underflow buckets.
 */
export interface Explicit {
  /**
   * The values must be monotonically increasing.
   */
  bounds?: number[];
}

/**
 * Specifies an exponential sequence of buckets that have a width that is
 * proportional to the value of the lower bound. Each bucket represents a
 * constant relative uncertainty on a specific value in the bucket.There are
 * num_finite_buckets + 2 (= N) buckets. Bucket i has the following
 * boundaries:Upper bound (0 <= i < N-1): scale * (growth_factor ^ i). Lower
 * bound (1 <= i < N): scale * (growth_factor ^ (i - 1)).
 */
export interface Exponential {
  /**
   * Must be greater than 1.
   */
  growthFactor?: number;
  /**
   * Must be greater than 0.
   */
  numFiniteBuckets?: number;
  /**
   * Must be greater than 0.
   */
  scale?: number;
}

/**
 * A single field of a message type.
 */
export interface Field {
  /**
   * The field cardinality.
   */
  cardinality?:  | "CARDINALITY_UNKNOWN" | "CARDINALITY_OPTIONAL" | "CARDINALITY_REQUIRED" | "CARDINALITY_REPEATED";
  /**
   * The string value of the default value of this field. Proto2 syntax only.
   */
  defaultValue?: string;
  /**
   * The field JSON name.
   */
  jsonName?: string;
  /**
   * The field type.
   */
  kind?:  | "TYPE_UNKNOWN" | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64";
  /**
   * The field name.
   */
  name?: string;
  /**
   * The field number.
   */
  number?: number;
  /**
   * The index of the field type in Type.oneofs, for message or enumeration
   * types. The first type has index 1; zero means the type is not in the list.
   */
  oneofIndex?: number;
  /**
   * The protocol buffer options.
   */
  options?: Option[];
  /**
   * Whether to use alternative packed wire representation.
   */
  packed?: boolean;
  /**
   * The field type URL, without the scheme, for message or enumeration types.
   * Example: "type.googleapis.com/google.protobuf.Timestamp".
   */
  typeUrl?: string;
}

/**
 * Additional options for Monitoring#foldersTimeSeriesList.
 */
export interface FoldersTimeSeriesListOptions {
  /**
   * The alignment_period specifies a time interval, in seconds, that is used
   * to divide the data in all the time series into consistent blocks of time.
   * This will be done before the per-series aligner can be applied to the
   * data.The value must be at least 60 seconds. If a per-series aligner other
   * than ALIGN_NONE is specified, this field is required or an error is
   * returned. If no per-series aligner is specified, or the aligner ALIGN_NONE
   * is specified, then this field is ignored.The maximum value of the
   * alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25
   * hours) for alerting policies.
   */
  ["aggregation.alignmentPeriod"]?: number /* Duration */;
  /**
   * The reduction operation to be used to combine time series into a single
   * time series, where the value of each data point in the resulting series is
   * a function of all the already aligned values in the input time series.Not
   * all reducer operations can be applied to all time series. The valid choices
   * depend on the metric_kind and the value_type of the original time series.
   * Reduction can yield a time series with a different metric_kind or
   * value_type than the input time series.Time series data must first be
   * aligned (see per_series_aligner) in order to perform cross-time series
   * reduction. If cross_series_reducer is specified, then per_series_aligner
   * must be specified, and must not be ALIGN_NONE. An alignment_period must
   * also be specified; otherwise, an error is returned.
   */
  ["aggregation.crossSeriesReducer"]?:  | "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05";
  /**
   * The set of fields to preserve when cross_series_reducer is specified. The
   * group_by_fields determine how the time series are partitioned into subsets
   * prior to applying the aggregation operation. Each subset contains time
   * series that have the same value for each of the grouping fields. Each
   * individual time series is a member of exactly one subset. The
   * cross_series_reducer is applied to each subset of time series. It is not
   * possible to reduce across different resource types, so this field
   * implicitly contains resource.type. Fields not specified in group_by_fields
   * are aggregated away. If group_by_fields is not specified and all the time
   * series have the same resource type, then the time series are aggregated
   * into a single output time series. If cross_series_reducer is not defined,
   * this field is ignored.
   */
  ["aggregation.groupByFields"]?: string;
  /**
   * An Aligner describes how to bring the data points in a single time series
   * into temporal alignment. Except for ALIGN_NONE, all alignments cause all
   * the data points in an alignment_period to be mathematically grouped
   * together, resulting in a single data point for each alignment_period with
   * end timestamp at the end of the period.Not all alignment operations may be
   * applied to all time series. The valid choices depend on the metric_kind and
   * value_type of the original time series. Alignment can change the
   * metric_kind or the value_type of the time series.Time series data must be
   * aligned in order to perform cross-time series reduction. If
   * cross_series_reducer is specified, then per_series_aligner must be
   * specified and not equal to ALIGN_NONE and alignment_period must be
   * specified; otherwise, an error is returned.
   */
  ["aggregation.perSeriesAligner"]?:  | "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE";
  /**
   * Required. A monitoring filter
   * (https://cloud.google.com/monitoring/api/v3/filters) that specifies which
   * time series should be returned. The filter must specify a single metric
   * type, and can additionally specify metric labels and other information. For
   * example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND
   * metric.labels.instance_name = "my-instance-name"
   */
  filter?: string;
  /**
   * Required. The end of the time interval.
   */
  ["interval.endTime"]?: Date;
  /**
   * Optional. The beginning of the time interval. The default value for the
   * start time is the end time. The start time must not be later than the end
   * time.
   */
  ["interval.startTime"]?: Date;
  /**
   * Unsupported: must be left blank. The points in each time series are
   * currently returned in reverse time order (most recent to oldest).
   */
  orderBy?: string;
  /**
   * A positive number that is the maximum number of results to return. If
   * page_size is empty or more than 100,000 results, the effective page_size is
   * 100,000 results. If view is set to FULL, this is the maximum number of
   * Points returned. If view is set to HEADERS, this is the maximum number of
   * TimeSeries returned.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
  /**
   * The alignment_period specifies a time interval, in seconds, that is used
   * to divide the data in all the time series into consistent blocks of time.
   * This will be done before the per-series aligner can be applied to the
   * data.The value must be at least 60 seconds. If a per-series aligner other
   * than ALIGN_NONE is specified, this field is required or an error is
   * returned. If no per-series aligner is specified, or the aligner ALIGN_NONE
   * is specified, then this field is ignored.The maximum value of the
   * alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25
   * hours) for alerting policies.
   */
  ["secondaryAggregation.alignmentPeriod"]?: number /* Duration */;
  /**
   * The reduction operation to be used to combine time series into a single
   * time series, where the value of each data point in the resulting series is
   * a function of all the already aligned values in the input time series.Not
   * all reducer operations can be applied to all time series. The valid choices
   * depend on the metric_kind and the value_type of the original time series.
   * Reduction can yield a time series with a different metric_kind or
   * value_type than the input time series.Time series data must first be
   * aligned (see per_series_aligner) in order to perform cross-time series
   * reduction. If cross_series_reducer is specified, then per_series_aligner
   * must be specified, and must not be ALIGN_NONE. An alignment_period must
   * also be specified; otherwise, an error is returned.
   */
  ["secondaryAggregation.crossSeriesReducer"]?:  | "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05";
  /**
   * The set of fields to preserve when cross_series_reducer is specified. The
   * group_by_fields determine how the time series are partitioned into subsets
   * prior to applying the aggregation operation. Each subset contains time
   * series that have the same value for each of the grouping fields. Each
   * individual time series is a member of exactly one subset. The
   * cross_series_reducer is applied to each subset of time series. It is not
   * possible to reduce across different resource types, so this field
   * implicitly contains resource.type. Fields not specified in group_by_fields
   * are aggregated away. If group_by_fields is not specified and all the time
   * series have the same resource type, then the time series are aggregated
   * into a single output time series. If cross_series_reducer is not defined,
   * this field is ignored.
   */
  ["secondaryAggregation.groupByFields"]?: string;
  /**
   * An Aligner describes how to bring the data points in a single time series
   * into temporal alignment. Except for ALIGN_NONE, all alignments cause all
   * the data points in an alignment_period to be mathematically grouped
   * together, resulting in a single data point for each alignment_period with
   * end timestamp at the end of the period.Not all alignment operations may be
   * applied to all time series. The valid choices depend on the metric_kind and
   * value_type of the original time series. Alignment can change the
   * metric_kind or the value_type of the time series.Time series data must be
   * aligned in order to perform cross-time series reduction. If
   * cross_series_reducer is specified, then per_series_aligner must be
   * specified and not equal to ALIGN_NONE and alignment_period must be
   * specified; otherwise, an error is returned.
   */
  ["secondaryAggregation.perSeriesAligner"]?:  | "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE";
  /**
   * Required. Specifies which information is returned about the time series.
   */
  view?:  | "FULL" | "HEADERS";
}

function serializeFoldersTimeSeriesListOptions(data: any): FoldersTimeSeriesListOptions {
  return {
    ...data,
    ["aggregation.alignmentPeriod"]: data["aggregation.alignmentPeriod"] !== undefined ? data["aggregation.alignmentPeriod"] : undefined,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? data["interval.endTime"].toISOString() : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? data["interval.startTime"].toISOString() : undefined,
    ["secondaryAggregation.alignmentPeriod"]: data["secondaryAggregation.alignmentPeriod"] !== undefined ? data["secondaryAggregation.alignmentPeriod"] : undefined,
  };
}

function deserializeFoldersTimeSeriesListOptions(data: any): FoldersTimeSeriesListOptions {
  return {
    ...data,
    ["aggregation.alignmentPeriod"]: data["aggregation.alignmentPeriod"] !== undefined ? data["aggregation.alignmentPeriod"] : undefined,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? new Date(data["interval.endTime"]) : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? new Date(data["interval.startTime"]) : undefined,
    ["secondaryAggregation.alignmentPeriod"]: data["secondaryAggregation.alignmentPeriod"] !== undefined ? data["secondaryAggregation.alignmentPeriod"] : undefined,
  };
}

/**
 * Options used when forecasting the time series and testing the predicted
 * value against the threshold.
 */
export interface ForecastOptions {
  /**
   * Required. The length of time into the future to forecast whether a time
   * series will violate the threshold. If the predicted value is found to
   * violate the threshold, and the violation is observed in all forecasts made
   * for the configured duration, then the time series is considered to be
   * failing.
   */
  forecastHorizon?: number /* Duration */;
}

function serializeForecastOptions(data: any): ForecastOptions {
  return {
    ...data,
    forecastHorizon: data["forecastHorizon"] !== undefined ? data["forecastHorizon"] : undefined,
  };
}

function deserializeForecastOptions(data: any): ForecastOptions {
  return {
    ...data,
    forecastHorizon: data["forecastHorizon"] !== undefined ? data["forecastHorizon"] : undefined,
  };
}

/**
 * The GetNotificationChannelVerificationCode request.
 */
export interface GetNotificationChannelVerificationCodeRequest {
  /**
   * The desired expiration time. If specified, the API will guarantee that the
   * returned code will not be valid after the specified timestamp; however, the
   * API cannot guarantee that the returned code will be valid for at least as
   * long as the requested time (the API puts an upper bound on the amount of
   * time for which a code may be valid). If omitted, a default expiration will
   * be used, which may be less than the max permissible expiration (so
   * specifying an expiration may extend the code's lifetime over omitting an
   * expiration, even though the API does impose an upper limit on the maximum
   * expiration that is permitted).
   */
  expireTime?: Date;
}

function serializeGetNotificationChannelVerificationCodeRequest(data: any): GetNotificationChannelVerificationCodeRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeGetNotificationChannelVerificationCodeRequest(data: any): GetNotificationChannelVerificationCodeRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * The GetNotificationChannelVerificationCode request.
 */
export interface GetNotificationChannelVerificationCodeResponse {
  /**
   * The verification code, which may be used to verify other channels that
   * have an equivalent identity (i.e. other channels of the same type with the
   * same fingerprint such as other email channels with the same email address
   * or other sms channels with the same number).
   */
  code?: string;
  /**
   * The expiration time associated with the code that was returned. If an
   * expiration was provided in the request, this is the minimum of the
   * requested expiration in the request and the max permitted expiration.
   */
  expireTime?: Date;
}

function serializeGetNotificationChannelVerificationCodeResponse(data: any): GetNotificationChannelVerificationCodeResponse {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeGetNotificationChannelVerificationCodeResponse(data: any): GetNotificationChannelVerificationCodeResponse {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * GKE Namespace. The field names correspond to the resource metadata labels on
 * monitored resources that fall under a namespace (for example, k8s_container
 * or k8s_pod).
 */
export interface GkeNamespace {
  /**
   * The name of the parent cluster.
   */
  clusterName?: string;
  /**
   * The location of the parent cluster. This may be a zone or region.
   */
  location?: string;
  /**
   * The name of this namespace.
   */
  namespaceName?: string;
  /**
   * Output only. The project this resource lives in. For legacy services
   * migrated from the Custom type, this may be a distinct project from the one
   * parenting the service itself.
   */
  readonly projectId?: string;
}

/**
 * GKE Service. The "service" here represents a Kubernetes service object
 * (https://kubernetes.io/docs/concepts/services-networking/service). The field
 * names correspond to the resource labels on k8s_service monitored resources
 * (https://cloud.google.com/monitoring/api/resources#tag_k8s_service).
 */
export interface GkeService {
  /**
   * The name of the parent cluster.
   */
  clusterName?: string;
  /**
   * The location of the parent cluster. This may be a zone or region.
   */
  location?: string;
  /**
   * The name of the parent namespace.
   */
  namespaceName?: string;
  /**
   * Output only. The project this resource lives in. For legacy services
   * migrated from the Custom type, this may be a distinct project from the one
   * parenting the service itself.
   */
  readonly projectId?: string;
  /**
   * The name of this service.
   */
  serviceName?: string;
}

/**
 * A GKE Workload (Deployment, StatefulSet, etc). The field names correspond to
 * the metadata labels on monitored resources that fall under a workload (for
 * example, k8s_container or k8s_pod).
 */
export interface GkeWorkload {
  /**
   * The name of the parent cluster.
   */
  clusterName?: string;
  /**
   * The location of the parent cluster. This may be a zone or region.
   */
  location?: string;
  /**
   * The name of the parent namespace.
   */
  namespaceName?: string;
  /**
   * Output only. The project this resource lives in. For legacy services
   * migrated from the Custom type, this may be a distinct project from the one
   * parenting the service itself.
   */
  readonly projectId?: string;
  /**
   * The name of this workload.
   */
  topLevelControllerName?: string;
  /**
   * The type of this workload (for example, "Deployment" or "DaemonSet")
   */
  topLevelControllerType?: string;
}

/**
 * Range of numerical values within min and max.
 */
export interface GoogleMonitoringV3Range {
  /**
   * Range maximum.
   */
  max?: number;
  /**
   * Range minimum.
   */
  min?: number;
}

/**
 * The description of a dynamic collection of monitored resources. Each group
 * has a filter that is matched against monitored resources and their associated
 * metadata. If a group's filter matches an available monitored resource, then
 * that resource is a member of that group. Groups can contain any number of
 * monitored resources, and each monitored resource can be a member of any
 * number of groups.Groups can be nested in parent-child hierarchies. The
 * parentName field identifies an optional parent for each group. If a group has
 * a parent, then the only monitored resources available to be matched by the
 * group's filter are the resources contained in the parent group. In other
 * words, a group contains the monitored resources that match its filter and the
 * filters of all the group's ancestors. A group without a parent can contain
 * any monitored resource.For example, consider an infrastructure running a set
 * of instances with two user-defined tags: "environment" and "role". A parent
 * group has a filter, environment="production". A child of that parent group
 * has a filter, role="transcoder". The parent group contains all instances in
 * the production environment, regardless of their roles. The child group
 * contains instances that have the transcoder role and are in the production
 * environment.The monitored resources contained in a group can change at any
 * moment, depending on what resources exist and what filters are associated
 * with the group and its ancestors.
 */
export interface Group {
  /**
   * A user-assigned name for this group, used only for display purposes.
   */
  displayName?: string;
  /**
   * The filter used to determine which monitored resources belong to this
   * group.
   */
  filter?: string;
  /**
   * If true, the members of this group are considered to be a cluster. The
   * system can perform additional analysis on groups that are clusters.
   */
  isCluster?: boolean;
  /**
   * Output only. The name of this group. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] When creating a group,
   * this field is ignored and a new name is created consisting of the project
   * specified in the call to CreateGroup and a unique [GROUP_ID] that is
   * generated automatically.
   */
  name?: string;
  /**
   * The name of the group's parent, if it has one. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] For groups with no
   * parent, parent_name is the empty string, "".
   */
  parentName?: string;
}

/**
 * Information involved in an HTTP/HTTPS Uptime check request.
 */
export interface HttpCheck {
  /**
   * If present, the check will only pass if the HTTP response status code is
   * in this set of status codes. If empty, the HTTP status code will only pass
   * if the HTTP status code is 200-299.
   */
  acceptedResponseStatusCodes?: ResponseStatusCode[];
  /**
   * The authentication information. Optional when creating an HTTP check;
   * defaults to empty.
   */
  authInfo?: BasicAuthentication;
  /**
   * The request body associated with the HTTP POST request. If content_type is
   * URL_ENCODED, the body passed in must be URL-encoded. Users can provide a
   * Content-Length header via the headers field or the API will do so. If the
   * request_method is GET and body is not empty, the API will return an error.
   * The maximum byte size is 1 megabyte.Note: If client libraries aren't used
   * (which performs the conversion automatically) base64 encode your body data
   * since the field is of bytes type.
   */
  body?: Uint8Array;
  /**
   * The content type header to use for the check. The following configurations
   * result in errors: 1. Content type is specified in both the headers field
   * and the content_type field. 2. Request method is GET and content_type is
   * not TYPE_UNSPECIFIED 3. Request method is POST and content_type is
   * TYPE_UNSPECIFIED. 4. Request method is POST and a "Content-Type" header is
   * provided via headers field. The content_type field should be used instead.
   */
  contentType?:  | "TYPE_UNSPECIFIED" | "URL_ENCODED" | "USER_PROVIDED";
  /**
   * A user provided content type header to use for the check. The invalid
   * configurations outlined in the content_type field apply to
   * custom_content_type, as well as the following: 1. content_type is
   * URL_ENCODED and custom_content_type is set. 2. content_type is
   * USER_PROVIDED and custom_content_type is not set.
   */
  customContentType?: string;
  /**
   * The list of headers to send as part of the Uptime check request. If two
   * headers have the same key and different values, they should be entered as a
   * single header, with the value being a comma-separated list of all the
   * desired values as described at
   * https://www.w3.org/Protocols/rfc2616/rfc2616.txt (page 31). Entering two
   * separate headers with the same key in a Create call will cause the first to
   * be overwritten by the second. The maximum number of headers allowed is 100.
   */
  headers?: {
    [key: string]: string
  };
  /**
   * Boolean specifying whether to encrypt the header information. Encryption
   * should be specified for any headers related to authentication that you do
   * not wish to be seen when retrieving the configuration. The server will be
   * responsible for encrypting the headers. On Get/List calls, if mask_headers
   * is set to true then the headers will be obscured with ******.
   */
  maskHeaders?: boolean;
  /**
   * Optional (defaults to "/"). The path to the page against which to run the
   * check. Will be combined with the host (specified within the
   * monitored_resource) and port to construct the full URL. If the provided
   * path does not begin with "/", a "/" will be prepended automatically.
   */
  path?: string;
  /**
   * Contains information needed to add pings to an HTTP check.
   */
  pingConfig?: PingConfig;
  /**
   * Optional (defaults to 80 when use_ssl is false, and 443 when use_ssl is
   * true). The TCP port on the HTTP server against which to run the check. Will
   * be combined with host (specified within the monitored_resource) and path to
   * construct the full URL.
   */
  port?: number;
  /**
   * The HTTP request method to use for the check. If set to METHOD_UNSPECIFIED
   * then request_method defaults to GET.
   */
  requestMethod?:  | "METHOD_UNSPECIFIED" | "GET" | "POST";
  /**
   * If true, use HTTPS instead of HTTP to run the check.
   */
  useSsl?: boolean;
  /**
   * Boolean specifying whether to include SSL certificate validation as a part
   * of the Uptime check. Only applies to checks where monitored_resource is set
   * to uptime_url. If use_ssl is false, setting validate_ssl to true has no
   * effect.
   */
  validateSsl?: boolean;
}

function serializeHttpCheck(data: any): HttpCheck {
  return {
    ...data,
    body: data["body"] !== undefined ? encodeBase64(data["body"]) : undefined,
  };
}

function deserializeHttpCheck(data: any): HttpCheck {
  return {
    ...data,
    body: data["body"] !== undefined ? decodeBase64(data["body"] as string) : undefined,
  };
}

/**
 * An internal checker allows Uptime checks to run on private/internal GCP
 * resources.
 */
export interface InternalChecker {
  /**
   * The checker's human-readable name. The display name should be unique
   * within a Cloud Monitoring Metrics Scope in order to make it easier to
   * identify; however, uniqueness is not enforced.
   */
  displayName?: string;
  /**
   * The GCP zone the Uptime check should egress from. Only respected for
   * internal Uptime checks, where internal_network is specified.
   */
  gcpZone?: string;
  /**
   * A unique resource name for this InternalChecker. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/internalCheckers/[INTERNAL_CHECKER_ID]
   * [PROJECT_ID_OR_NUMBER] is the Cloud Monitoring Metrics Scope project for
   * the Uptime check config associated with the internal checker.
   */
  name?: string;
  /**
   * The GCP VPC network (https://cloud.google.com/vpc/docs/vpc) where the
   * internal resource lives (ex: "default").
   */
  network?: string;
  /**
   * The GCP project ID where the internal checker lives. Not necessary the
   * same as the Metrics Scope project.
   */
  peerProjectId?: string;
  /**
   * The current operational state of the internal checker.
   */
  state?:  | "UNSPECIFIED" | "CREATING" | "RUNNING";
}

/**
 * Canonical service scoped to an Istio mesh. Anthos clusters running ASM >=
 * 1.6.8 will have their services ingested as this type.
 */
export interface IstioCanonicalService {
  /**
   * The name of the canonical service underlying this service. Corresponds to
   * the destination_canonical_service_name metric label in label in Istio
   * metrics (https://cloud.google.com/monitoring/api/metrics_istio).
   */
  canonicalService?: string;
  /**
   * The namespace of the canonical service underlying this service.
   * Corresponds to the destination_canonical_service_namespace metric label in
   * Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio).
   */
  canonicalServiceNamespace?: string;
  /**
   * Identifier for the Istio mesh in which this canonical service is defined.
   * Corresponds to the mesh_uid metric label in Istio metrics
   * (https://cloud.google.com/monitoring/api/metrics_istio).
   */
  meshUid?: string;
}

/**
 * Information needed to perform a JSONPath content match. Used for
 * ContentMatcherOption::MATCHES_JSON_PATH and
 * ContentMatcherOption::NOT_MATCHES_JSON_PATH.
 */
export interface JsonPathMatcher {
  /**
   * The type of JSONPath match that will be applied to the JSON output
   * (ContentMatcher.content)
   */
  jsonMatcher?:  | "JSON_PATH_MATCHER_OPTION_UNSPECIFIED" | "EXACT_MATCH" | "REGEX_MATCH";
  /**
   * JSONPath within the response output pointing to the expected
   * ContentMatcher::content to match against.
   */
  jsonPath?: string;
}

/**
 * A description of a label.
 */
export interface LabelDescriptor {
  /**
   * A human-readable description for the label.
   */
  description?: string;
  /**
   * The key for this label. The key must meet the following criteria: Does not
   * exceed 100 characters. Matches the following regular expression:
   * [a-zA-Z][a-zA-Z0-9_]* The first character must be an upper- or lower-case
   * letter. The remaining characters must be letters, digits, or underscores.
   */
  key?: string;
  /**
   * The type of data that can be assigned to the label.
   */
  valueType?:  | "STRING" | "BOOL" | "INT64";
}

/**
 * A label value.
 */
export interface LabelValue {
  /**
   * A bool label value.
   */
  boolValue?: boolean;
  /**
   * An int64 label value.
   */
  int64Value?: bigint;
  /**
   * A string label value.
   */
  stringValue?: string;
}

function serializeLabelValue(data: any): LabelValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeLabelValue(data: any): LabelValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * Parameters for a latency threshold SLI.
 */
export interface LatencyCriteria {
  /**
   * Good service is defined to be the count of requests made to this service
   * that return in no more than threshold.
   */
  threshold?: number /* Duration */;
}

function serializeLatencyCriteria(data: any): LatencyCriteria {
  return {
    ...data,
    threshold: data["threshold"] !== undefined ? data["threshold"] : undefined,
  };
}

function deserializeLatencyCriteria(data: any): LatencyCriteria {
  return {
    ...data,
    threshold: data["threshold"] !== undefined ? data["threshold"] : undefined,
  };
}

/**
 * Specifies a linear sequence of buckets that all have the same width (except
 * overflow and underflow). Each bucket represents a constant absolute
 * uncertainty on the specific value in the bucket.There are num_finite_buckets
 * + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i
 * < N-1): offset + (width * i). Lower bound (1 <= i < N): offset + (width * (i
 * - 1)).
 */
export interface Linear {
  /**
   * Must be greater than 0.
   */
  numFiniteBuckets?: number;
  /**
   * Lower bound of the first bucket.
   */
  offset?: number;
  /**
   * Must be greater than 0.
   */
  width?: number;
}

/**
 * The protocol for the ListAlertPolicies response.
 */
export interface ListAlertPoliciesResponse {
  /**
   * The returned alert policies.
   */
  alertPolicies?: AlertPolicy[];
  /**
   * If there might be more results than were returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
  /**
   * The total number of alert policies in all pages. This number is only an
   * estimate, and may change in subsequent pages. https://aip.dev/158
   */
  totalSize?: number;
}

function serializeListAlertPoliciesResponse(data: any): ListAlertPoliciesResponse {
  return {
    ...data,
    alertPolicies: data["alertPolicies"] !== undefined ? data["alertPolicies"].map((item: any) => (serializeAlertPolicy(item))) : undefined,
  };
}

function deserializeListAlertPoliciesResponse(data: any): ListAlertPoliciesResponse {
  return {
    ...data,
    alertPolicies: data["alertPolicies"] !== undefined ? data["alertPolicies"].map((item: any) => (deserializeAlertPolicy(item))) : undefined,
  };
}

/**
 * The ListGroupMembers response.
 */
export interface ListGroupMembersResponse {
  /**
   * A set of monitored resources in the group.
   */
  members?: MonitoredResource[];
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
  /**
   * The total number of elements matching this request.
   */
  totalSize?: number;
}

/**
 * The ListGroups response.
 */
export interface ListGroupsResponse {
  /**
   * The groups that match the specified filters.
   */
  group?: Group[];
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
}

/**
 * The ListMetricDescriptors response.
 */
export interface ListMetricDescriptorsResponse {
  /**
   * The metric descriptors that are available to the project and that match
   * the value of filter, if present.
   */
  metricDescriptors?: MetricDescriptor[];
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
}

function serializeListMetricDescriptorsResponse(data: any): ListMetricDescriptorsResponse {
  return {
    ...data,
    metricDescriptors: data["metricDescriptors"] !== undefined ? data["metricDescriptors"].map((item: any) => (serializeMetricDescriptor(item))) : undefined,
  };
}

function deserializeListMetricDescriptorsResponse(data: any): ListMetricDescriptorsResponse {
  return {
    ...data,
    metricDescriptors: data["metricDescriptors"] !== undefined ? data["metricDescriptors"].map((item: any) => (deserializeMetricDescriptor(item))) : undefined,
  };
}

/**
 * The ListMonitoredResourceDescriptors response.
 */
export interface ListMonitoredResourceDescriptorsResponse {
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
  /**
   * The monitored resource descriptors that are available to this project and
   * that match filter, if present.
   */
  resourceDescriptors?: MonitoredResourceDescriptor[];
}

/**
 * The ListNotificationChannelDescriptors response.
 */
export interface ListNotificationChannelDescriptorsResponse {
  /**
   * The monitored resource descriptors supported for the specified project,
   * optionally filtered.
   */
  channelDescriptors?: NotificationChannelDescriptor[];
  /**
   * If not empty, indicates that there may be more results that match the
   * request. Use the value in the page_token field in a subsequent request to
   * fetch the next set of results. If empty, all results have been returned.
   */
  nextPageToken?: string;
}

/**
 * The ListNotificationChannels response.
 */
export interface ListNotificationChannelsResponse {
  /**
   * If not empty, indicates that there may be more results that match the
   * request. Use the value in the page_token field in a subsequent request to
   * fetch the next set of results. If empty, all results have been returned.
   */
  nextPageToken?: string;
  /**
   * The notification channels defined for the specified project.
   */
  notificationChannels?: NotificationChannel[];
  /**
   * The total number of notification channels in all pages. This number is
   * only an estimate, and may change in subsequent pages. https://aip.dev/158
   */
  totalSize?: number;
}

function serializeListNotificationChannelsResponse(data: any): ListNotificationChannelsResponse {
  return {
    ...data,
    notificationChannels: data["notificationChannels"] !== undefined ? data["notificationChannels"].map((item: any) => (serializeNotificationChannel(item))) : undefined,
  };
}

function deserializeListNotificationChannelsResponse(data: any): ListNotificationChannelsResponse {
  return {
    ...data,
    notificationChannels: data["notificationChannels"] !== undefined ? data["notificationChannels"].map((item: any) => (deserializeNotificationChannel(item))) : undefined,
  };
}

/**
 * The ListServiceLevelObjectives response.
 */
export interface ListServiceLevelObjectivesResponse {
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
  /**
   * The ServiceLevelObjectives matching the specified filter.
   */
  serviceLevelObjectives?: ServiceLevelObjective[];
}

function serializeListServiceLevelObjectivesResponse(data: any): ListServiceLevelObjectivesResponse {
  return {
    ...data,
    serviceLevelObjectives: data["serviceLevelObjectives"] !== undefined ? data["serviceLevelObjectives"].map((item: any) => (serializeServiceLevelObjective(item))) : undefined,
  };
}

function deserializeListServiceLevelObjectivesResponse(data: any): ListServiceLevelObjectivesResponse {
  return {
    ...data,
    serviceLevelObjectives: data["serviceLevelObjectives"] !== undefined ? data["serviceLevelObjectives"].map((item: any) => (deserializeServiceLevelObjective(item))) : undefined,
  };
}

/**
 * The ListServices response.
 */
export interface ListServicesResponse {
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
  /**
   * The Services matching the specified filter.
   */
  services?: Service[];
}

/**
 * The results of a successful ListSnoozes call, containing the matching
 * Snoozes.
 */
export interface ListSnoozesResponse {
  /**
   * Page token for repeated calls to ListSnoozes, to fetch additional pages of
   * results. If this is empty or missing, there are no more pages.
   */
  nextPageToken?: string;
  /**
   * Snoozes matching this list call.
   */
  snoozes?: Snooze[];
}

function serializeListSnoozesResponse(data: any): ListSnoozesResponse {
  return {
    ...data,
    snoozes: data["snoozes"] !== undefined ? data["snoozes"].map((item: any) => (serializeSnooze(item))) : undefined,
  };
}

function deserializeListSnoozesResponse(data: any): ListSnoozesResponse {
  return {
    ...data,
    snoozes: data["snoozes"] !== undefined ? data["snoozes"].map((item: any) => (deserializeSnooze(item))) : undefined,
  };
}

/**
 * The ListTimeSeries response.
 */
export interface ListTimeSeriesResponse {
  /**
   * Query execution errors that may have caused the time series data returned
   * to be incomplete.
   */
  executionErrors?: Status[];
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
  /**
   * One or more time series that match the filter included in the request.
   */
  timeSeries?: TimeSeries[];
  /**
   * The unit in which all time_series point values are reported. unit follows
   * the UCUM format for units as seen in https://unitsofmeasure.org/ucum.html.
   * If different time_series have different units (for example, because they
   * come from different metric types, or a unit is absent), then unit will be
   * "{not_a_unit}".
   */
  unit?: string;
}

function serializeListTimeSeriesResponse(data: any): ListTimeSeriesResponse {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? data["timeSeries"].map((item: any) => (serializeTimeSeries(item))) : undefined,
  };
}

function deserializeListTimeSeriesResponse(data: any): ListTimeSeriesResponse {
  return {
    ...data,
    timeSeries: data["timeSeries"] !== undefined ? data["timeSeries"].map((item: any) => (deserializeTimeSeries(item))) : undefined,
  };
}

/**
 * The protocol for the ListUptimeCheckConfigs response.
 */
export interface ListUptimeCheckConfigsResponse {
  /**
   * This field represents the pagination token to retrieve the next page of
   * results. If the value is empty, it means no further results for the
   * request. To retrieve the next page of results, the value of the
   * next_page_token is passed to the subsequent List method call (in the
   * request message's page_token field).
   */
  nextPageToken?: string;
  /**
   * The total number of Uptime check configurations for the project,
   * irrespective of any pagination.
   */
  totalSize?: number;
  /**
   * The returned Uptime check configurations.
   */
  uptimeCheckConfigs?: UptimeCheckConfig[];
}

function serializeListUptimeCheckConfigsResponse(data: any): ListUptimeCheckConfigsResponse {
  return {
    ...data,
    uptimeCheckConfigs: data["uptimeCheckConfigs"] !== undefined ? data["uptimeCheckConfigs"].map((item: any) => (serializeUptimeCheckConfig(item))) : undefined,
  };
}

function deserializeListUptimeCheckConfigsResponse(data: any): ListUptimeCheckConfigsResponse {
  return {
    ...data,
    uptimeCheckConfigs: data["uptimeCheckConfigs"] !== undefined ? data["uptimeCheckConfigs"].map((item: any) => (deserializeUptimeCheckConfig(item))) : undefined,
  };
}

/**
 * The protocol for the ListUptimeCheckIps response.
 */
export interface ListUptimeCheckIpsResponse {
  /**
   * This field represents the pagination token to retrieve the next page of
   * results. If the value is empty, it means no further results for the
   * request. To retrieve the next page of results, the value of the
   * next_page_token is passed to the subsequent List method call (in the
   * request message's page_token field). NOTE: this field is not yet
   * implemented
   */
  nextPageToken?: string;
  /**
   * The returned list of IP addresses (including region and location) that the
   * checkers run from.
   */
  uptimeCheckIps?: UptimeCheckIp[];
}

/**
 * A condition type that checks whether a log message in the scoping project
 * (https://cloud.google.com/monitoring/api/v3#project_name) satisfies the given
 * filter. Logs from other projects in the metrics scope are not evaluated.
 */
export interface LogMatch {
  /**
   * Required. A logs-based filter. See Advanced Logs Queries
   * (https://cloud.google.com/logging/docs/view/advanced-queries) for how this
   * filter should be constructed.
   */
  filter?: string;
  /**
   * Optional. A map from a label key to an extractor expression, which is used
   * to extract the value for this label key. Each entry in this map is a
   * specification for how data should be extracted from log entries that match
   * filter. Each combination of extracted values is treated as a separate rule
   * for the purposes of triggering notifications. Label keys and corresponding
   * values can be used in notifications generated by this condition.Please see
   * the documentation on logs-based metric valueExtractors
   * (https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.FIELDS.value_extractor)
   * for syntax and examples.
   */
  labelExtractors?: {
    [key: string]: string
  };
}

/**
 * Istio service scoped to an Istio mesh. Anthos clusters running ASM < 1.6.8
 * will have their services ingested as this type.
 */
export interface MeshIstio {
  /**
   * Identifier for the mesh in which this Istio service is defined.
   * Corresponds to the mesh_uid metric label in Istio metrics.
   */
  meshUid?: string;
  /**
   * The name of the Istio service underlying this service. Corresponds to the
   * destination_service_name metric label in Istio metrics.
   */
  serviceName?: string;
  /**
   * The namespace of the Istio service underlying this service. Corresponds to
   * the destination_service_namespace metric label in Istio metrics.
   */
  serviceNamespace?: string;
}

/**
 * A specific metric, identified by specifying values for all of the labels of
 * a MetricDescriptor.
 */
export interface Metric {
  /**
   * The set of label values that uniquely identify this metric. All labels
   * listed in the MetricDescriptor must be assigned values.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * An existing metric type, see google.api.MetricDescriptor. For example,
   * custom.googleapis.com/invoice/paid/amount.
   */
  type?: string;
}

/**
 * A condition type that checks that monitored resources are reporting data.
 * The configuration defines a metric and a set of monitored resources. The
 * predicate is considered in violation when a time series for the specified
 * metric of a monitored resource does not include any data in the specified
 * duration.
 */
export interface MetricAbsence {
  /**
   * Specifies the alignment of data points in individual time series as well
   * as how to combine the retrieved time series together (such as when
   * aggregating multiple streams on each resource to a single stream for each
   * resource or when aggregating streams across all members of a group of
   * resources). Multiple aggregations are applied in the order specified.This
   * field is similar to the one in the ListTimeSeries request
   * (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list).
   * It is advisable to use the ListTimeSeries method when debugging this field.
   */
  aggregations?: Aggregation[];
  /**
   * The amount of time that a time series must fail to report new data to be
   * considered failing. The minimum value of this field is 120 seconds. Larger
   * values that are a multiple of a minute--for example, 240 or 300
   * seconds--are supported. If an invalid value is given, an error will be
   * returned. The Duration.nanos field is ignored.
   */
  duration?: number /* Duration */;
  /**
   * Required. A filter (https://cloud.google.com/monitoring/api/v3/filters)
   * that identifies which time series should be compared with the threshold.The
   * filter is similar to the one that is specified in the ListTimeSeries
   * request
   * (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list)
   * (that call is useful to verify the time series that will be retrieved /
   * processed). The filter must specify the metric type and the resource type.
   * Optionally, it can specify resource labels and metric labels. This field
   * must not exceed 2048 Unicode characters in length.
   */
  filter?: string;
  /**
   * The number/percent of time series for which the comparison must hold in
   * order for the condition to trigger. If unspecified, then the condition will
   * trigger if the comparison is true for any of the time series that have been
   * identified by filter and aggregations.
   */
  trigger?: Trigger;
}

function serializeMetricAbsence(data: any): MetricAbsence {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (serializeAggregation(item))) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeMetricAbsence(data: any): MetricAbsence {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (deserializeAggregation(item))) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Defines a metric type and its schema. Once a metric descriptor is created,
 * deleting or altering it stops data collection and makes the metric type's
 * existing data unusable.
 */
export interface MetricDescriptor {
  /**
   * A detailed description of the metric, which can be used in documentation.
   */
  description?: string;
  /**
   * A concise name for the metric, which can be displayed in user interfaces.
   * Use sentence case without an ending period, for example "Request count".
   * This field is optional but it is recommended to be set for any metrics
   * associated with user-visible concepts, such as Quota.
   */
  displayName?: string;
  /**
   * The set of labels that can be used to describe a specific instance of this
   * metric type. For example, the
   * appengine.googleapis.com/http/server/response_latencies metric type has a
   * label for the HTTP response code, response_code, so you can look at
   * latencies for successful responses or just for responses that failed.
   */
  labels?: LabelDescriptor[];
  /**
   * Optional. The launch stage of the metric definition.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Optional. Metadata which can be used to guide usage of the metric.
   */
  metadata?: MetricDescriptorMetadata;
  /**
   * Whether the metric records instantaneous values, changes to a value, etc.
   * Some combinations of metric_kind and value_type might not be supported.
   */
  metricKind?:  | "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE";
  /**
   * Read-only. If present, then a time series, which is identified partially
   * by a metric type and a MonitoredResourceDescriptor, that is associated with
   * this metric type can only be associated with one of the monitored resource
   * types listed here.
   */
  monitoredResourceTypes?: string[];
  /**
   * The resource name of the metric descriptor.
   */
  name?: string;
  /**
   * The metric type, including its DNS name prefix. The type is not
   * URL-encoded. All user-defined metric types have the DNS name
   * custom.googleapis.com or external.googleapis.com. Metric types should use a
   * natural hierarchical grouping. For example:
   * "custom.googleapis.com/invoice/paid/amount"
   * "external.googleapis.com/prometheus/up"
   * "appengine.googleapis.com/http/server/response_latencies"
   */
  type?: string;
  /**
   * The units in which the metric value is reported. It is only applicable if
   * the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the
   * representation of the stored metric values.Different systems might scale
   * the values to be more easily displayed (so a value of 0.02kBy might be
   * displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy).
   * However, if the unit is kBy, then the value of the metric is always in
   * thousands of bytes, no matter how it might be displayed.If you want a
   * custom metric to record the exact number of CPU-seconds used by a job, you
   * can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently
   * 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is
   * written as 12005.Alternatively, if you want a custom metric to record data
   * in a more granular way, you can create a DOUBLE CUMULATIVE metric whose
   * unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or
   * use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are
   * a subset of The Unified Code for Units of Measure
   * (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit
   * By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k
   * kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa
   * (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n
   * nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto
   * (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti
   * tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these
   * connectors: / division or ratio (as an infix operator). For examples,
   * kBy/{email} or MiBy/10ms (although you should almost never have /s in a
   * metric unit; rates should always be computed at query time from the
   * underlying cumulative or delta value). . multiplication or composition (as
   * an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit
   * is as follows: Expression = Component { "." Component } { "/" Component } ;
   * Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ;
   * Annotation = "{" NAME "}" ; Notes: Annotation is just a comment if it
   * follows a UNIT. If the annotation is used alone, then the unit is
   * equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s ==
   * By/s. NAME is a sequence of non-blank printable ASCII characters not
   * containing { or }. 1 represents a unitary dimensionless unit
   * (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in
   * 1/s. It is typically used when none of the basic units are appropriate. For
   * example, "new users per day" can be represented as 1/d or {new-users}/d
   * (and a metric value 5 would mean "5 new users). Alternatively, "thousands
   * of page views per day" would be represented as 1000/d or k1/d or
   * k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per
   * day"). % represents dimensionless value of 1/100, and annotates values
   * giving a percentage (so the metric values are typically in the range of
   * 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric
   * contains a ratio, typically in the range 0..1, that will be multiplied by
   * 100 and displayed as a percentage (so a metric value 0.03 means "3
   * percent").
   */
  unit?: string;
  /**
   * Whether the measurement is an integer, a floating-point number, etc. Some
   * combinations of metric_kind and value_type might not be supported.
   */
  valueType?:  | "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY";
}

function serializeMetricDescriptor(data: any): MetricDescriptor {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeMetricDescriptorMetadata(data["metadata"]) : undefined,
  };
}

function deserializeMetricDescriptor(data: any): MetricDescriptor {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeMetricDescriptorMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Additional annotations that can be used to guide the usage of a metric.
 */
export interface MetricDescriptorMetadata {
  /**
   * The delay of data points caused by ingestion. Data points older than this
   * age are guaranteed to be ingested and available to be read, excluding data
   * loss due to errors.
   */
  ingestDelay?: number /* Duration */;
  /**
   * Deprecated. Must use the MetricDescriptor.launch_stage instead.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * The sampling period of metric data points. For metrics which are written
   * periodically, consecutive data points are stored at this time interval,
   * excluding data loss due to errors. Metrics with a higher granularity have a
   * smaller sampling period.
   */
  samplePeriod?: number /* Duration */;
}

function serializeMetricDescriptorMetadata(data: any): MetricDescriptorMetadata {
  return {
    ...data,
    ingestDelay: data["ingestDelay"] !== undefined ? data["ingestDelay"] : undefined,
    samplePeriod: data["samplePeriod"] !== undefined ? data["samplePeriod"] : undefined,
  };
}

function deserializeMetricDescriptorMetadata(data: any): MetricDescriptorMetadata {
  return {
    ...data,
    ingestDelay: data["ingestDelay"] !== undefined ? data["ingestDelay"] : undefined,
    samplePeriod: data["samplePeriod"] !== undefined ? data["samplePeriod"] : undefined,
  };
}

/**
 * A MetricRange is used when each window is good when the value x of a single
 * TimeSeries satisfies range.min <= x <= range.max. The provided TimeSeries
 * must have ValueType = INT64 or ValueType = DOUBLE and MetricKind = GAUGE.
 */
export interface MetricRange {
  /**
   * Range of values considered "good." For a one-sided range, set one bound to
   * an infinite value.
   */
  range?: GoogleMonitoringV3Range;
  /**
   * A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters)
   * specifying the TimeSeries to use for evaluating window quality.
   */
  timeSeries?: string;
}

/**
 * A condition type that compares a collection of time series against a
 * threshold.
 */
export interface MetricThreshold {
  /**
   * Specifies the alignment of data points in individual time series as well
   * as how to combine the retrieved time series together (such as when
   * aggregating multiple streams on each resource to a single stream for each
   * resource or when aggregating streams across all members of a group of
   * resources). Multiple aggregations are applied in the order specified.This
   * field is similar to the one in the ListTimeSeries request
   * (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list).
   * It is advisable to use the ListTimeSeries method when debugging this field.
   */
  aggregations?: Aggregation[];
  /**
   * The comparison to apply between the time series (indicated by filter and
   * aggregation) and the threshold (indicated by threshold_value). The
   * comparison is applied on each time series, with the time series on the
   * left-hand side and the threshold on the right-hand side.Only COMPARISON_LT
   * and COMPARISON_GT are supported currently.
   */
  comparison?:  | "COMPARISON_UNSPECIFIED" | "COMPARISON_GT" | "COMPARISON_GE" | "COMPARISON_LT" | "COMPARISON_LE" | "COMPARISON_EQ" | "COMPARISON_NE";
  /**
   * Specifies the alignment of data points in individual time series selected
   * by denominatorFilter as well as how to combine the retrieved time series
   * together (such as when aggregating multiple streams on each resource to a
   * single stream for each resource or when aggregating streams across all
   * members of a group of resources).When computing ratios, the aggregations
   * and denominator_aggregations fields must use the same alignment period and
   * produce time series that have the same periodicity and labels.
   */
  denominatorAggregations?: Aggregation[];
  /**
   * A filter (https://cloud.google.com/monitoring/api/v3/filters) that
   * identifies a time series that should be used as the denominator of a ratio
   * that will be compared with the threshold. If a denominator_filter is
   * specified, the time series specified by the filter field will be used as
   * the numerator.The filter must specify the metric type and optionally may
   * contain restrictions on resource type, resource labels, and metric labels.
   * This field may not exceed 2048 Unicode characters in length.
   */
  denominatorFilter?: string;
  /**
   * The amount of time that a time series must violate the threshold to be
   * considered failing. Currently, only values that are a multiple of a
   * minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid
   * value is given, an error will be returned. When choosing a duration, it is
   * useful to keep in mind the frequency of the underlying time series data
   * (which may also be affected by any alignments specified in the aggregations
   * field); a good duration is long enough so that a single outlier does not
   * generate spurious alerts, but short enough that unhealthy states are
   * detected and alerted on quickly.
   */
  duration?: number /* Duration */;
  /**
   * A condition control that determines how metric-threshold conditions are
   * evaluated when data stops arriving.
   */
  evaluationMissingData?:  | "EVALUATION_MISSING_DATA_UNSPECIFIED" | "EVALUATION_MISSING_DATA_INACTIVE" | "EVALUATION_MISSING_DATA_ACTIVE" | "EVALUATION_MISSING_DATA_NO_OP";
  /**
   * Required. A filter (https://cloud.google.com/monitoring/api/v3/filters)
   * that identifies which time series should be compared with the threshold.The
   * filter is similar to the one that is specified in the ListTimeSeries
   * request
   * (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list)
   * (that call is useful to verify the time series that will be retrieved /
   * processed). The filter must specify the metric type and the resource type.
   * Optionally, it can specify resource labels and metric labels. This field
   * must not exceed 2048 Unicode characters in length.
   */
  filter?: string;
  /**
   * When this field is present, the MetricThreshold condition forecasts
   * whether the time series is predicted to violate the threshold within the
   * forecast_horizon. When this field is not set, the MetricThreshold tests the
   * current value of the timeseries against the threshold.
   */
  forecastOptions?: ForecastOptions;
  /**
   * A value against which to compare the time series.
   */
  thresholdValue?: number;
  /**
   * The number/percent of time series for which the comparison must hold in
   * order for the condition to trigger. If unspecified, then the condition will
   * trigger if the comparison is true for any of the time series that have been
   * identified by filter and aggregations, or by the ratio, if
   * denominator_filter and denominator_aggregations are specified.
   */
  trigger?: Trigger;
}

function serializeMetricThreshold(data: any): MetricThreshold {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (serializeAggregation(item))) : undefined,
    denominatorAggregations: data["denominatorAggregations"] !== undefined ? data["denominatorAggregations"].map((item: any) => (serializeAggregation(item))) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    forecastOptions: data["forecastOptions"] !== undefined ? serializeForecastOptions(data["forecastOptions"]) : undefined,
  };
}

function deserializeMetricThreshold(data: any): MetricThreshold {
  return {
    ...data,
    aggregations: data["aggregations"] !== undefined ? data["aggregations"].map((item: any) => (deserializeAggregation(item))) : undefined,
    denominatorAggregations: data["denominatorAggregations"] !== undefined ? data["denominatorAggregations"].map((item: any) => (deserializeAggregation(item))) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    forecastOptions: data["forecastOptions"] !== undefined ? deserializeForecastOptions(data["forecastOptions"]) : undefined,
  };
}

/**
 * An object representing a resource that can be used for monitoring, logging,
 * billing, or other purposes. Examples include virtual machine instances,
 * databases, and storage devices such as disks. The type field identifies a
 * MonitoredResourceDescriptor object that describes the resource's schema.
 * Information in the labels field identifies the actual resource and its
 * attributes according to the schema. For example, a particular Compute Engine
 * VM instance could be represented by the following object, because the
 * MonitoredResourceDescriptor for "gce_instance" has labels "project_id",
 * "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id":
 * "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}
 */
export interface MonitoredResource {
  /**
   * Required. Values for all of the labels listed in the associated monitored
   * resource descriptor. For example, Compute Engine VM instances use the
   * labels "project_id", "instance_id", and "zone".
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The monitored resource type. This field must match the type
   * field of a MonitoredResourceDescriptor object. For example, the type of a
   * Compute Engine VM instance is gce_instance. For a list of types, see
   * Monitoring resource types
   * (https://cloud.google.com/monitoring/api/resources) and Logging resource
   * types (https://cloud.google.com/logging/docs/api/v2/resource-list).
   */
  type?: string;
}

/**
 * An object that describes the schema of a MonitoredResource object using a
 * type name and a set of labels. For example, the monitored resource descriptor
 * for Google Compute Engine VM instances has a type of "gce_instance" and
 * specifies the use of the labels "instance_id" and "zone" to identify
 * particular VM instances.Different APIs can support different monitored
 * resource types. APIs generally provide a list method that returns the
 * monitored resource descriptors used by the API.
 */
export interface MonitoredResourceDescriptor {
  /**
   * Optional. A detailed description of the monitored resource type that might
   * be used in documentation.
   */
  description?: string;
  /**
   * Optional. A concise name for the monitored resource type that might be
   * displayed in user interfaces. It should be a Title Cased Noun Phrase,
   * without any article or other determiners. For example, "Google Cloud SQL
   * Database".
   */
  displayName?: string;
  /**
   * Required. A set of labels used to describe instances of this monitored
   * resource type. For example, an individual Google Cloud SQL database is
   * identified by values for the labels "database_id" and "zone".
   */
  labels?: LabelDescriptor[];
  /**
   * Optional. The launch stage of the monitored resource definition.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Optional. The resource name of the monitored resource descriptor:
   * "projects/{project_id}/monitoredResourceDescriptors/{type}" where {type} is
   * the value of the type field in this object and {project_id} is a project ID
   * that provides API-specific context for accessing the type. APIs that do not
   * use project information can use the resource name format
   * "monitoredResourceDescriptors/{type}".
   */
  name?: string;
  /**
   * Required. The monitored resource type. For example, the type
   * "cloudsql_database" represents databases in Google Cloud SQL. For a list of
   * types, see Monitoring resource types
   * (https://cloud.google.com/monitoring/api/resources) and Logging resource
   * types (https://cloud.google.com/logging/docs/api/v2/resource-list).
   */
  type?: string;
}

/**
 * Auxiliary metadata for a MonitoredResource object. MonitoredResource objects
 * contain the minimum set of information to uniquely identify a monitored
 * resource instance. There is some other useful auxiliary metadata. Monitoring
 * and Logging use an ingestion pipeline to extract metadata for cloud resources
 * of all types, and store the metadata in this message.
 */
export interface MonitoredResourceMetadata {
  /**
   * Output only. Values for predefined system metadata labels. System labels
   * are a kind of metadata extracted by Google, including "machine_image",
   * "vpc", "subnet_id", "security_group", "name", etc. System label values can
   * be only strings, Boolean values, or a list of strings. For example: {
   * "name": "my-test-instance", "security_group": ["a", "b", "c"],
   * "spot_instance": false }
   */
  systemLabels?: {
    [key: string]: any
  };
  /**
   * Output only. A map of user-defined metadata labels.
   */
  userLabels?: {
    [key: string]: string
  };
}

/**
 * A condition type that allows alert policies to be defined using Monitoring
 * Query Language (https://cloud.google.com/monitoring/mql).
 */
export interface MonitoringQueryLanguageCondition {
  /**
   * The amount of time that a time series must violate the threshold to be
   * considered failing. Currently, only values that are a multiple of a
   * minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid
   * value is given, an error will be returned. When choosing a duration, it is
   * useful to keep in mind the frequency of the underlying time series data
   * (which may also be affected by any alignments specified in the aggregations
   * field); a good duration is long enough so that a single outlier does not
   * generate spurious alerts, but short enough that unhealthy states are
   * detected and alerted on quickly.
   */
  duration?: number /* Duration */;
  /**
   * A condition control that determines how metric-threshold conditions are
   * evaluated when data stops arriving.
   */
  evaluationMissingData?:  | "EVALUATION_MISSING_DATA_UNSPECIFIED" | "EVALUATION_MISSING_DATA_INACTIVE" | "EVALUATION_MISSING_DATA_ACTIVE" | "EVALUATION_MISSING_DATA_NO_OP";
  /**
   * Monitoring Query Language (https://cloud.google.com/monitoring/mql) query
   * that outputs a boolean stream.
   */
  query?: string;
  /**
   * The number/percent of time series for which the comparison must hold in
   * order for the condition to trigger. If unspecified, then the condition will
   * trigger if the comparison is true for any of the time series that have been
   * identified by filter and aggregations, or by the ratio, if
   * denominator_filter and denominator_aggregations are specified.
   */
  trigger?: Trigger;
}

function serializeMonitoringQueryLanguageCondition(data: any): MonitoringQueryLanguageCondition {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeMonitoringQueryLanguageCondition(data: any): MonitoringQueryLanguageCondition {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Describes a change made to a configuration.
 */
export interface MutationRecord {
  /**
   * The email address of the user making the change.
   */
  mutatedBy?: string;
  /**
   * When the change occurred.
   */
  mutateTime?: Date;
}

function serializeMutationRecord(data: any): MutationRecord {
  return {
    ...data,
    mutateTime: data["mutateTime"] !== undefined ? data["mutateTime"].toISOString() : undefined,
  };
}

function deserializeMutationRecord(data: any): MutationRecord {
  return {
    ...data,
    mutateTime: data["mutateTime"] !== undefined ? new Date(data["mutateTime"]) : undefined,
  };
}

/**
 * A NotificationChannel is a medium through which an alert is delivered when a
 * policy violation is detected. Examples of channels include email, SMS, and
 * third-party messaging applications. Fields containing sensitive information
 * like authentication tokens or contact info are only partially populated on
 * retrieval.
 */
export interface NotificationChannel {
  /**
   * Record of the creation of this channel.
   */
  creationRecord?: MutationRecord;
  /**
   * An optional human-readable description of this notification channel. This
   * description may provide additional details, beyond the display name, for
   * the channel. This may not exceed 1024 Unicode characters.
   */
  description?: string;
  /**
   * An optional human-readable name for this notification channel. It is
   * recommended that you specify a non-empty and unique name in order to make
   * it easier to identify the channels in your project, though this is not
   * enforced. The display name is limited to 512 Unicode characters.
   */
  displayName?: string;
  /**
   * Whether notifications are forwarded to the described channel. This makes
   * it possible to disable delivery of notifications to a particular channel
   * without removing the channel from all alerting policies that reference the
   * channel. This is a more convenient approach when the change is temporary
   * and you want to receive notifications from the same set of alerting
   * policies on the channel at some point in the future.
   */
  enabled?: boolean;
  /**
   * Configuration fields that define the channel and its behavior. The
   * permissible and required labels are specified in the
   * NotificationChannelDescriptor.labels of the NotificationChannelDescriptor
   * corresponding to the type field.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Records of the modification of this channel.
   */
  mutationRecords?: MutationRecord[];
  /**
   * The full REST resource name for this channel. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/notificationChannels/[CHANNEL_ID] The
   * [CHANNEL_ID] is automatically assigned by the server on creation.
   */
  name?: string;
  /**
   * The type of the notification channel. This field matches the value of the
   * NotificationChannelDescriptor.type field.
   */
  type?: string;
  /**
   * User-supplied key/value data that does not need to conform to the
   * corresponding NotificationChannelDescriptor's schema, unlike the labels
   * field. This field is intended to be used for organizing and identifying the
   * NotificationChannel objects.The field can contain up to 64 entries. Each
   * key and value is limited to 63 Unicode characters or 128 bytes, whichever
   * is smaller. Labels and values can contain only lowercase letters, numerals,
   * underscores, and dashes. Keys must begin with a letter.
   */
  userLabels?: {
    [key: string]: string
  };
  /**
   * Indicates whether this channel has been verified or not. On a
   * ListNotificationChannels or GetNotificationChannel operation, this field is
   * expected to be populated.If the value is UNVERIFIED, then it indicates that
   * the channel is non-functioning (it both requires verification and lacks
   * verification); otherwise, it is assumed that the channel works.If the
   * channel is neither VERIFIED nor UNVERIFIED, it implies that the channel is
   * of a type that does not require verification or that this specific channel
   * has been exempted from verification because it was created prior to
   * verification being required for channels of this type.This field cannot be
   * modified using a standard UpdateNotificationChannel operation. To change
   * the value of this field, you must call VerifyNotificationChannel.
   */
  verificationStatus?:  | "VERIFICATION_STATUS_UNSPECIFIED" | "UNVERIFIED" | "VERIFIED";
}

function serializeNotificationChannel(data: any): NotificationChannel {
  return {
    ...data,
    creationRecord: data["creationRecord"] !== undefined ? serializeMutationRecord(data["creationRecord"]) : undefined,
    mutationRecords: data["mutationRecords"] !== undefined ? data["mutationRecords"].map((item: any) => (serializeMutationRecord(item))) : undefined,
  };
}

function deserializeNotificationChannel(data: any): NotificationChannel {
  return {
    ...data,
    creationRecord: data["creationRecord"] !== undefined ? deserializeMutationRecord(data["creationRecord"]) : undefined,
    mutationRecords: data["mutationRecords"] !== undefined ? data["mutationRecords"].map((item: any) => (deserializeMutationRecord(item))) : undefined,
  };
}

/**
 * A description of a notification channel. The descriptor includes the
 * properties of the channel and the set of labels or fields that must be
 * specified to configure channels of a given type.
 */
export interface NotificationChannelDescriptor {
  /**
   * A human-readable description of the notification channel type. The
   * description may include a description of the properties of the channel and
   * pointers to external documentation.
   */
  description?: string;
  /**
   * A human-readable name for the notification channel type. This form of the
   * name is suitable for a user interface.
   */
  displayName?: string;
  /**
   * The set of labels that must be defined to identify a particular channel of
   * the corresponding type. Each label includes a description for how that
   * field should be populated.
   */
  labels?: LabelDescriptor[];
  /**
   * The product launch stage for channels of this type.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * The full REST resource name for this descriptor. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/notificationChannelDescriptors/[TYPE] In
   * the above, [TYPE] is the value of the type field.
   */
  name?: string;
  /**
   * The tiers that support this notification channel; the project service tier
   * must be one of the supported_tiers.
   */
  supportedTiers?:  | "SERVICE_TIER_UNSPECIFIED" | "SERVICE_TIER_BASIC" | "SERVICE_TIER_PREMIUM"[];
  /**
   * The type of notification channel, such as "email" and "sms". To view the
   * full list of channels, see Channel descriptors
   * (https://cloud.google.com/monitoring/alerts/using-channels-api#ncd).
   * Notification channel types are globally unique.
   */
  type?: string;
}

/**
 * Control over the rate of notifications sent to this alert policy's
 * notification channels.
 */
export interface NotificationRateLimit {
  /**
   * Not more than one notification per period.
   */
  period?: number /* Duration */;
}

function serializeNotificationRateLimit(data: any): NotificationRateLimit {
  return {
    ...data,
    period: data["period"] !== undefined ? data["period"] : undefined,
  };
}

function deserializeNotificationRateLimit(data: any): NotificationRateLimit {
  return {
    ...data,
    period: data["period"] !== undefined ? data["period"] : undefined,
  };
}

/**
 * Contains metadata for longrunning operation for the edit Metrics Scope
 * endpoints.
 */
export interface OperationMetadata {
  /**
   * The time when the batch request was received.
   */
  createTime?: Date;
  /**
   * Current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED";
  /**
   * The time when the operation result was last updated.
   */
  updateTime?: Date;
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A protocol buffer option, which can be attached to a message, field,
 * enumeration, etc.
 */
export interface Option {
  /**
   * The option's name. For protobuf built-in options (options defined in
   * descriptor.proto), this is the short name. For example, "map_entry". For
   * custom options, it should be the fully-qualified name. For example,
   * "google.api.http".
   */
  name?: string;
  /**
   * The option's value packed in an Any message. If the value is a primitive,
   * the corresponding wrapper type defined in google/protobuf/wrappers.proto
   * should be used. If the value is an enum, it should be stored as an int32
   * value using the google.protobuf.Int32Value type.
   */
  value?: {
    [key: string]: any
  };
}

/**
 * Additional options for Monitoring#organizationsTimeSeriesList.
 */
export interface OrganizationsTimeSeriesListOptions {
  /**
   * The alignment_period specifies a time interval, in seconds, that is used
   * to divide the data in all the time series into consistent blocks of time.
   * This will be done before the per-series aligner can be applied to the
   * data.The value must be at least 60 seconds. If a per-series aligner other
   * than ALIGN_NONE is specified, this field is required or an error is
   * returned. If no per-series aligner is specified, or the aligner ALIGN_NONE
   * is specified, then this field is ignored.The maximum value of the
   * alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25
   * hours) for alerting policies.
   */
  ["aggregation.alignmentPeriod"]?: number /* Duration */;
  /**
   * The reduction operation to be used to combine time series into a single
   * time series, where the value of each data point in the resulting series is
   * a function of all the already aligned values in the input time series.Not
   * all reducer operations can be applied to all time series. The valid choices
   * depend on the metric_kind and the value_type of the original time series.
   * Reduction can yield a time series with a different metric_kind or
   * value_type than the input time series.Time series data must first be
   * aligned (see per_series_aligner) in order to perform cross-time series
   * reduction. If cross_series_reducer is specified, then per_series_aligner
   * must be specified, and must not be ALIGN_NONE. An alignment_period must
   * also be specified; otherwise, an error is returned.
   */
  ["aggregation.crossSeriesReducer"]?:  | "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05";
  /**
   * The set of fields to preserve when cross_series_reducer is specified. The
   * group_by_fields determine how the time series are partitioned into subsets
   * prior to applying the aggregation operation. Each subset contains time
   * series that have the same value for each of the grouping fields. Each
   * individual time series is a member of exactly one subset. The
   * cross_series_reducer is applied to each subset of time series. It is not
   * possible to reduce across different resource types, so this field
   * implicitly contains resource.type. Fields not specified in group_by_fields
   * are aggregated away. If group_by_fields is not specified and all the time
   * series have the same resource type, then the time series are aggregated
   * into a single output time series. If cross_series_reducer is not defined,
   * this field is ignored.
   */
  ["aggregation.groupByFields"]?: string;
  /**
   * An Aligner describes how to bring the data points in a single time series
   * into temporal alignment. Except for ALIGN_NONE, all alignments cause all
   * the data points in an alignment_period to be mathematically grouped
   * together, resulting in a single data point for each alignment_period with
   * end timestamp at the end of the period.Not all alignment operations may be
   * applied to all time series. The valid choices depend on the metric_kind and
   * value_type of the original time series. Alignment can change the
   * metric_kind or the value_type of the time series.Time series data must be
   * aligned in order to perform cross-time series reduction. If
   * cross_series_reducer is specified, then per_series_aligner must be
   * specified and not equal to ALIGN_NONE and alignment_period must be
   * specified; otherwise, an error is returned.
   */
  ["aggregation.perSeriesAligner"]?:  | "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE";
  /**
   * Required. A monitoring filter
   * (https://cloud.google.com/monitoring/api/v3/filters) that specifies which
   * time series should be returned. The filter must specify a single metric
   * type, and can additionally specify metric labels and other information. For
   * example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND
   * metric.labels.instance_name = "my-instance-name"
   */
  filter?: string;
  /**
   * Required. The end of the time interval.
   */
  ["interval.endTime"]?: Date;
  /**
   * Optional. The beginning of the time interval. The default value for the
   * start time is the end time. The start time must not be later than the end
   * time.
   */
  ["interval.startTime"]?: Date;
  /**
   * Unsupported: must be left blank. The points in each time series are
   * currently returned in reverse time order (most recent to oldest).
   */
  orderBy?: string;
  /**
   * A positive number that is the maximum number of results to return. If
   * page_size is empty or more than 100,000 results, the effective page_size is
   * 100,000 results. If view is set to FULL, this is the maximum number of
   * Points returned. If view is set to HEADERS, this is the maximum number of
   * TimeSeries returned.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
  /**
   * The alignment_period specifies a time interval, in seconds, that is used
   * to divide the data in all the time series into consistent blocks of time.
   * This will be done before the per-series aligner can be applied to the
   * data.The value must be at least 60 seconds. If a per-series aligner other
   * than ALIGN_NONE is specified, this field is required or an error is
   * returned. If no per-series aligner is specified, or the aligner ALIGN_NONE
   * is specified, then this field is ignored.The maximum value of the
   * alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25
   * hours) for alerting policies.
   */
  ["secondaryAggregation.alignmentPeriod"]?: number /* Duration */;
  /**
   * The reduction operation to be used to combine time series into a single
   * time series, where the value of each data point in the resulting series is
   * a function of all the already aligned values in the input time series.Not
   * all reducer operations can be applied to all time series. The valid choices
   * depend on the metric_kind and the value_type of the original time series.
   * Reduction can yield a time series with a different metric_kind or
   * value_type than the input time series.Time series data must first be
   * aligned (see per_series_aligner) in order to perform cross-time series
   * reduction. If cross_series_reducer is specified, then per_series_aligner
   * must be specified, and must not be ALIGN_NONE. An alignment_period must
   * also be specified; otherwise, an error is returned.
   */
  ["secondaryAggregation.crossSeriesReducer"]?:  | "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05";
  /**
   * The set of fields to preserve when cross_series_reducer is specified. The
   * group_by_fields determine how the time series are partitioned into subsets
   * prior to applying the aggregation operation. Each subset contains time
   * series that have the same value for each of the grouping fields. Each
   * individual time series is a member of exactly one subset. The
   * cross_series_reducer is applied to each subset of time series. It is not
   * possible to reduce across different resource types, so this field
   * implicitly contains resource.type. Fields not specified in group_by_fields
   * are aggregated away. If group_by_fields is not specified and all the time
   * series have the same resource type, then the time series are aggregated
   * into a single output time series. If cross_series_reducer is not defined,
   * this field is ignored.
   */
  ["secondaryAggregation.groupByFields"]?: string;
  /**
   * An Aligner describes how to bring the data points in a single time series
   * into temporal alignment. Except for ALIGN_NONE, all alignments cause all
   * the data points in an alignment_period to be mathematically grouped
   * together, resulting in a single data point for each alignment_period with
   * end timestamp at the end of the period.Not all alignment operations may be
   * applied to all time series. The valid choices depend on the metric_kind and
   * value_type of the original time series. Alignment can change the
   * metric_kind or the value_type of the time series.Time series data must be
   * aligned in order to perform cross-time series reduction. If
   * cross_series_reducer is specified, then per_series_aligner must be
   * specified and not equal to ALIGN_NONE and alignment_period must be
   * specified; otherwise, an error is returned.
   */
  ["secondaryAggregation.perSeriesAligner"]?:  | "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE";
  /**
   * Required. Specifies which information is returned about the time series.
   */
  view?:  | "FULL" | "HEADERS";
}

function serializeOrganizationsTimeSeriesListOptions(data: any): OrganizationsTimeSeriesListOptions {
  return {
    ...data,
    ["aggregation.alignmentPeriod"]: data["aggregation.alignmentPeriod"] !== undefined ? data["aggregation.alignmentPeriod"] : undefined,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? data["interval.endTime"].toISOString() : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? data["interval.startTime"].toISOString() : undefined,
    ["secondaryAggregation.alignmentPeriod"]: data["secondaryAggregation.alignmentPeriod"] !== undefined ? data["secondaryAggregation.alignmentPeriod"] : undefined,
  };
}

function deserializeOrganizationsTimeSeriesListOptions(data: any): OrganizationsTimeSeriesListOptions {
  return {
    ...data,
    ["aggregation.alignmentPeriod"]: data["aggregation.alignmentPeriod"] !== undefined ? data["aggregation.alignmentPeriod"] : undefined,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? new Date(data["interval.endTime"]) : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? new Date(data["interval.startTime"]) : undefined,
    ["secondaryAggregation.alignmentPeriod"]: data["secondaryAggregation.alignmentPeriod"] !== undefined ? data["secondaryAggregation.alignmentPeriod"] : undefined,
  };
}

/**
 * A PerformanceThreshold is used when each window is good when that window has
 * a sufficiently high performance.
 */
export interface PerformanceThreshold {
  /**
   * BasicSli to evaluate to judge window quality.
   */
  basicSliPerformance?: BasicSli;
  /**
   * RequestBasedSli to evaluate to judge window quality.
   */
  performance?: RequestBasedSli;
  /**
   * If window performance >= threshold, the window is counted as good.
   */
  threshold?: number;
}

function serializePerformanceThreshold(data: any): PerformanceThreshold {
  return {
    ...data,
    basicSliPerformance: data["basicSliPerformance"] !== undefined ? serializeBasicSli(data["basicSliPerformance"]) : undefined,
  };
}

function deserializePerformanceThreshold(data: any): PerformanceThreshold {
  return {
    ...data,
    basicSliPerformance: data["basicSliPerformance"] !== undefined ? deserializeBasicSli(data["basicSliPerformance"]) : undefined,
  };
}

/**
 * Information involved in sending ICMP pings alongside public HTTP/TCP checks.
 * For HTTP, the pings are performed for each part of the redirect chain.
 */
export interface PingConfig {
  /**
   * Number of ICMP pings. A maximum of 3 ICMP pings is currently supported.
   */
  pingsCount?: number;
}

/**
 * A single data point in a time series.
 */
export interface Point {
  /**
   * The time interval to which the data point applies. For GAUGE metrics, the
   * start time is optional, but if it is supplied, it must equal the end time.
   * For DELTA metrics, the start and end time should specify a non-zero
   * interval, with subsequent points specifying contiguous and non-overlapping
   * intervals. For CUMULATIVE metrics, the start and end time should specify a
   * non-zero interval, with subsequent points specifying the same start time
   * and increasing end times, until an event resets the cumulative value to
   * zero and sets a new start time for the following points.
   */
  interval?: TimeInterval;
  /**
   * The value of the data point.
   */
  value?: TypedValue;
}

function serializePoint(data: any): Point {
  return {
    ...data,
    interval: data["interval"] !== undefined ? serializeTimeInterval(data["interval"]) : undefined,
    value: data["value"] !== undefined ? serializeTypedValue(data["value"]) : undefined,
  };
}

function deserializePoint(data: any): Point {
  return {
    ...data,
    interval: data["interval"] !== undefined ? deserializeTimeInterval(data["interval"]) : undefined,
    value: data["value"] !== undefined ? deserializeTypedValue(data["value"]) : undefined,
  };
}

/**
 * A point's value columns and time interval. Each point has one or more point
 * values corresponding to the entries in point_descriptors field in the
 * TimeSeriesDescriptor associated with this object.
 */
export interface PointData {
  /**
   * The time interval associated with the point.
   */
  timeInterval?: TimeInterval;
  /**
   * The values that make up the point.
   */
  values?: TypedValue[];
}

function serializePointData(data: any): PointData {
  return {
    ...data,
    timeInterval: data["timeInterval"] !== undefined ? serializeTimeInterval(data["timeInterval"]) : undefined,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeTypedValue(item))) : undefined,
  };
}

function deserializePointData(data: any): PointData {
  return {
    ...data,
    timeInterval: data["timeInterval"] !== undefined ? deserializeTimeInterval(data["timeInterval"]) : undefined,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeTypedValue(item))) : undefined,
  };
}

/**
 * Additional options for Monitoring#projectsAlertPoliciesList.
 */
export interface ProjectsAlertPoliciesListOptions {
  /**
   * If provided, this field specifies the criteria that must be met by alert
   * policies to be included in the response.For more details, see sorting and
   * filtering
   * (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering).
   */
  filter?: string;
  /**
   * A comma-separated list of fields by which to sort the result. Supports the
   * same set of field references as the filter field. Entries can be prefixed
   * with a minus sign to sort by the field in descending order.For more
   * details, see sorting and filtering
   * (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering).
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return more results from the previous method call.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#projectsAlertPoliciesPatch.
 */
export interface ProjectsAlertPoliciesPatchOptions {
  /**
   * Optional. A list of alerting policy field names. If this field is not
   * empty, each listed field in the existing alerting policy is set to the
   * value of the corresponding field in the supplied policy (alert_policy), or
   * to the field's default value if the field is not in the supplied alerting
   * policy. Fields not listed retain their previous value.Examples of valid
   * field masks include display_name, documentation, documentation.content,
   * documentation.mime_type, user_labels, user_label.nameofkey, enabled,
   * conditions, combiner, etc.If this field is empty, then the supplied
   * alerting policy replaces the existing policy. It is the same as deleting
   * the existing policy and adding the supplied policy, except for the
   * following: The new policy will have the same [ALERT_POLICY_ID] as the
   * former policy. This gives you continuity with the former policy in your
   * notifications and incidents. Conditions in the new policy will keep their
   * former [CONDITION_ID] if the supplied condition includes the name field
   * with that [CONDITION_ID]. If the supplied condition omits the name field,
   * then a new [CONDITION_ID] is created.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAlertPoliciesPatchOptions(data: any): ProjectsAlertPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAlertPoliciesPatchOptions(data: any): ProjectsAlertPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Monitoring#projectsGroupsCreate.
 */
export interface ProjectsGroupsCreateOptions {
  /**
   * If true, validate this request but do not create the group.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Monitoring#projectsGroupsDelete.
 */
export interface ProjectsGroupsDeleteOptions {
  /**
   * If this field is true, then the request means to delete a group with all
   * its descendants. Otherwise, the request means to delete a group only when
   * it has no descendants. The default value is false.
   */
  recursive?: boolean;
}

/**
 * Additional options for Monitoring#projectsGroupsList.
 */
export interface ProjectsGroupsListOptions {
  /**
   * A group name. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] Returns groups that are
   * ancestors of the specified group. The groups are returned in order,
   * starting with the immediate parent and ending with the most distant
   * ancestor. If the specified group has no immediate parent, the results are
   * empty.
   */
  ancestorsOfGroup?: string;
  /**
   * A group name. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] Returns groups whose
   * parent_name field contains the group name. If no groups have this parent,
   * the results are empty.
   */
  childrenOfGroup?: string;
  /**
   * A group name. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID] Returns the descendants
   * of the specified group. This is a superset of the results returned by the
   * children_of_group filter, and includes children-of-children, and so forth.
   */
  descendantsOfGroup?: string;
  /**
   * A positive number that is the maximum number of results to return.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the next_page_token value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#projectsGroupsMembersList.
 */
export interface ProjectsGroupsMembersListOptions {
  /**
   * An optional list filter
   * (https://cloud.google.com/monitoring/api/learn_more#filtering) describing
   * the members to be returned. The filter may reference the type, labels, and
   * metadata of monitored resources that comprise the group. For example, to
   * return only resources representing Compute Engine VM instances, use this
   * filter: `resource.type = "gce_instance"`
   */
  filter?: string;
  /**
   * Required. The end of the time interval.
   */
  ["interval.endTime"]?: Date;
  /**
   * Optional. The beginning of the time interval. The default value for the
   * start time is the end time. The start time must not be later than the end
   * time.
   */
  ["interval.startTime"]?: Date;
  /**
   * A positive number that is the maximum number of results to return.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the next_page_token value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
}

function serializeProjectsGroupsMembersListOptions(data: any): ProjectsGroupsMembersListOptions {
  return {
    ...data,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? data["interval.endTime"].toISOString() : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? data["interval.startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsGroupsMembersListOptions(data: any): ProjectsGroupsMembersListOptions {
  return {
    ...data,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? new Date(data["interval.endTime"]) : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? new Date(data["interval.startTime"]) : undefined,
  };
}

/**
 * Additional options for Monitoring#projectsGroupsUpdate.
 */
export interface ProjectsGroupsUpdateOptions {
  /**
   * If true, validate this request but do not update the existing group.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Monitoring#projectsMetricDescriptorsList.
 */
export interface ProjectsMetricDescriptorsListOptions {
  /**
   * If this field is empty, all custom and system-defined metric descriptors
   * are returned. Otherwise, the filter
   * (https://cloud.google.com/monitoring/api/v3/filters) specifies which metric
   * descriptors are to be returned. For example, the following filter matches
   * all custom metrics (https://cloud.google.com/monitoring/custom-metrics):
   * metric.type = starts_with("custom.googleapis.com/")
   */
  filter?: string;
  /**
   * A positive number that is the maximum number of results to return.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#projectsMonitoredResourceDescriptorsList.
 */
export interface ProjectsMonitoredResourceDescriptorsListOptions {
  /**
   * An optional filter (https://cloud.google.com/monitoring/api/v3/filters)
   * describing the descriptors to be returned. The filter can reference the
   * descriptor's type and labels. For example, the following filter returns
   * only Google Compute Engine descriptors that have an id label: resource.type
   * = starts_with("gce_") AND resource.label:id
   */
  filter?: string;
  /**
   * A positive number that is the maximum number of results to return.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Monitoring#projectsNotificationChannelDescriptorsList.
 */
export interface ProjectsNotificationChannelDescriptorsListOptions {
  /**
   * The maximum number of results to return in a single response. If not set
   * to a positive number, a reasonable value will be chosen by the service.
   */
  pageSize?: number;
  /**
   * If non-empty, page_token must contain a value returned as the
   * next_page_token in a previous response to request the next set of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#projectsNotificationChannelsDelete.
 */
export interface ProjectsNotificationChannelsDeleteOptions {
  /**
   * If true, the notification channel will be deleted regardless of its use in
   * alert policies (the policies will be updated to remove the channel). If
   * false, channels that are still referenced by an existing alerting policy
   * will fail to be deleted in a delete operation.
   */
  force?: boolean;
}

/**
 * Additional options for Monitoring#projectsNotificationChannelsList.
 */
export interface ProjectsNotificationChannelsListOptions {
  /**
   * If provided, this field specifies the criteria that must be met by
   * notification channels to be included in the response.For more details, see
   * sorting and filtering
   * (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering).
   */
  filter?: string;
  /**
   * A comma-separated list of fields by which to sort the result. Supports the
   * same set of fields as in filter. Entries can be prefixed with a minus sign
   * to sort in descending rather than ascending order.For more details, see
   * sorting and filtering
   * (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering).
   */
  orderBy?: string;
  /**
   * The maximum number of results to return in a single response. If not set
   * to a positive number, a reasonable value will be chosen by the service.
   */
  pageSize?: number;
  /**
   * If non-empty, page_token must contain a value returned as the
   * next_page_token in a previous response to request the next set of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#projectsNotificationChannelsPatch.
 */
export interface ProjectsNotificationChannelsPatchOptions {
  /**
   * The fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsNotificationChannelsPatchOptions(data: any): ProjectsNotificationChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsNotificationChannelsPatchOptions(data: any): ProjectsNotificationChannelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Monitoring#projectsSnoozesList.
 */
export interface ProjectsSnoozesListOptions {
  /**
   * Optional. Optional filter to restrict results to the given criteria. The
   * following fields are supported. interval.start_time interval.end_timeFor
   * example: ``` interval.start_time > "2022-03-11T00:00:00-08:00" AND
   * interval.end_time < "2022-03-12T00:00:00-08:00" ```
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return for a single query. The
   * server may further constrain the maximum number of results returned in a
   * single page. The value should be in the range 1, 1000. If the value given
   * is outside this range, the server will decide the number of results to be
   * returned.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token from a previous call to ListSnoozesRequest
   * to get the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#projectsSnoozesPatch.
 */
export interface ProjectsSnoozesPatchOptions {
  /**
   * Required. The fields to update.For each field listed in update_mask: If
   * the Snooze object supplied in the UpdateSnoozeRequest has a value for that
   * field, the value of the field in the existing Snooze will be set to the
   * value of the field in the supplied Snooze. If the field does not have a
   * value in the supplied Snooze, the field in the existing Snooze is set to
   * its default value.Fields not listed retain their existing value.The
   * following are the field names that are accepted in update_mask:
   * display_name interval.start_time interval.end_timeThat said, the start time
   * and end time of the Snooze determines which fields can legally be updated.
   * Before attempting an update, users should consult the documentation for
   * UpdateSnoozeRequest, which talks about which fields can be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsSnoozesPatchOptions(data: any): ProjectsSnoozesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsSnoozesPatchOptions(data: any): ProjectsSnoozesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Monitoring#projectsTimeSeriesList.
 */
export interface ProjectsTimeSeriesListOptions {
  /**
   * The alignment_period specifies a time interval, in seconds, that is used
   * to divide the data in all the time series into consistent blocks of time.
   * This will be done before the per-series aligner can be applied to the
   * data.The value must be at least 60 seconds. If a per-series aligner other
   * than ALIGN_NONE is specified, this field is required or an error is
   * returned. If no per-series aligner is specified, or the aligner ALIGN_NONE
   * is specified, then this field is ignored.The maximum value of the
   * alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25
   * hours) for alerting policies.
   */
  ["aggregation.alignmentPeriod"]?: number /* Duration */;
  /**
   * The reduction operation to be used to combine time series into a single
   * time series, where the value of each data point in the resulting series is
   * a function of all the already aligned values in the input time series.Not
   * all reducer operations can be applied to all time series. The valid choices
   * depend on the metric_kind and the value_type of the original time series.
   * Reduction can yield a time series with a different metric_kind or
   * value_type than the input time series.Time series data must first be
   * aligned (see per_series_aligner) in order to perform cross-time series
   * reduction. If cross_series_reducer is specified, then per_series_aligner
   * must be specified, and must not be ALIGN_NONE. An alignment_period must
   * also be specified; otherwise, an error is returned.
   */
  ["aggregation.crossSeriesReducer"]?:  | "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05";
  /**
   * The set of fields to preserve when cross_series_reducer is specified. The
   * group_by_fields determine how the time series are partitioned into subsets
   * prior to applying the aggregation operation. Each subset contains time
   * series that have the same value for each of the grouping fields. Each
   * individual time series is a member of exactly one subset. The
   * cross_series_reducer is applied to each subset of time series. It is not
   * possible to reduce across different resource types, so this field
   * implicitly contains resource.type. Fields not specified in group_by_fields
   * are aggregated away. If group_by_fields is not specified and all the time
   * series have the same resource type, then the time series are aggregated
   * into a single output time series. If cross_series_reducer is not defined,
   * this field is ignored.
   */
  ["aggregation.groupByFields"]?: string;
  /**
   * An Aligner describes how to bring the data points in a single time series
   * into temporal alignment. Except for ALIGN_NONE, all alignments cause all
   * the data points in an alignment_period to be mathematically grouped
   * together, resulting in a single data point for each alignment_period with
   * end timestamp at the end of the period.Not all alignment operations may be
   * applied to all time series. The valid choices depend on the metric_kind and
   * value_type of the original time series. Alignment can change the
   * metric_kind or the value_type of the time series.Time series data must be
   * aligned in order to perform cross-time series reduction. If
   * cross_series_reducer is specified, then per_series_aligner must be
   * specified and not equal to ALIGN_NONE and alignment_period must be
   * specified; otherwise, an error is returned.
   */
  ["aggregation.perSeriesAligner"]?:  | "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE";
  /**
   * Required. A monitoring filter
   * (https://cloud.google.com/monitoring/api/v3/filters) that specifies which
   * time series should be returned. The filter must specify a single metric
   * type, and can additionally specify metric labels and other information. For
   * example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND
   * metric.labels.instance_name = "my-instance-name"
   */
  filter?: string;
  /**
   * Required. The end of the time interval.
   */
  ["interval.endTime"]?: Date;
  /**
   * Optional. The beginning of the time interval. The default value for the
   * start time is the end time. The start time must not be later than the end
   * time.
   */
  ["interval.startTime"]?: Date;
  /**
   * Unsupported: must be left blank. The points in each time series are
   * currently returned in reverse time order (most recent to oldest).
   */
  orderBy?: string;
  /**
   * A positive number that is the maximum number of results to return. If
   * page_size is empty or more than 100,000 results, the effective page_size is
   * 100,000 results. If view is set to FULL, this is the maximum number of
   * Points returned. If view is set to HEADERS, this is the maximum number of
   * TimeSeries returned.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
  /**
   * The alignment_period specifies a time interval, in seconds, that is used
   * to divide the data in all the time series into consistent blocks of time.
   * This will be done before the per-series aligner can be applied to the
   * data.The value must be at least 60 seconds. If a per-series aligner other
   * than ALIGN_NONE is specified, this field is required or an error is
   * returned. If no per-series aligner is specified, or the aligner ALIGN_NONE
   * is specified, then this field is ignored.The maximum value of the
   * alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25
   * hours) for alerting policies.
   */
  ["secondaryAggregation.alignmentPeriod"]?: number /* Duration */;
  /**
   * The reduction operation to be used to combine time series into a single
   * time series, where the value of each data point in the resulting series is
   * a function of all the already aligned values in the input time series.Not
   * all reducer operations can be applied to all time series. The valid choices
   * depend on the metric_kind and the value_type of the original time series.
   * Reduction can yield a time series with a different metric_kind or
   * value_type than the input time series.Time series data must first be
   * aligned (see per_series_aligner) in order to perform cross-time series
   * reduction. If cross_series_reducer is specified, then per_series_aligner
   * must be specified, and must not be ALIGN_NONE. An alignment_period must
   * also be specified; otherwise, an error is returned.
   */
  ["secondaryAggregation.crossSeriesReducer"]?:  | "REDUCE_NONE" | "REDUCE_MEAN" | "REDUCE_MIN" | "REDUCE_MAX" | "REDUCE_SUM" | "REDUCE_STDDEV" | "REDUCE_COUNT" | "REDUCE_COUNT_TRUE" | "REDUCE_COUNT_FALSE" | "REDUCE_FRACTION_TRUE" | "REDUCE_PERCENTILE_99" | "REDUCE_PERCENTILE_95" | "REDUCE_PERCENTILE_50" | "REDUCE_PERCENTILE_05";
  /**
   * The set of fields to preserve when cross_series_reducer is specified. The
   * group_by_fields determine how the time series are partitioned into subsets
   * prior to applying the aggregation operation. Each subset contains time
   * series that have the same value for each of the grouping fields. Each
   * individual time series is a member of exactly one subset. The
   * cross_series_reducer is applied to each subset of time series. It is not
   * possible to reduce across different resource types, so this field
   * implicitly contains resource.type. Fields not specified in group_by_fields
   * are aggregated away. If group_by_fields is not specified and all the time
   * series have the same resource type, then the time series are aggregated
   * into a single output time series. If cross_series_reducer is not defined,
   * this field is ignored.
   */
  ["secondaryAggregation.groupByFields"]?: string;
  /**
   * An Aligner describes how to bring the data points in a single time series
   * into temporal alignment. Except for ALIGN_NONE, all alignments cause all
   * the data points in an alignment_period to be mathematically grouped
   * together, resulting in a single data point for each alignment_period with
   * end timestamp at the end of the period.Not all alignment operations may be
   * applied to all time series. The valid choices depend on the metric_kind and
   * value_type of the original time series. Alignment can change the
   * metric_kind or the value_type of the time series.Time series data must be
   * aligned in order to perform cross-time series reduction. If
   * cross_series_reducer is specified, then per_series_aligner must be
   * specified and not equal to ALIGN_NONE and alignment_period must be
   * specified; otherwise, an error is returned.
   */
  ["secondaryAggregation.perSeriesAligner"]?:  | "ALIGN_NONE" | "ALIGN_DELTA" | "ALIGN_RATE" | "ALIGN_INTERPOLATE" | "ALIGN_NEXT_OLDER" | "ALIGN_MIN" | "ALIGN_MAX" | "ALIGN_MEAN" | "ALIGN_COUNT" | "ALIGN_SUM" | "ALIGN_STDDEV" | "ALIGN_COUNT_TRUE" | "ALIGN_COUNT_FALSE" | "ALIGN_FRACTION_TRUE" | "ALIGN_PERCENTILE_99" | "ALIGN_PERCENTILE_95" | "ALIGN_PERCENTILE_50" | "ALIGN_PERCENTILE_05" | "ALIGN_PERCENT_CHANGE";
  /**
   * Required. Specifies which information is returned about the time series.
   */
  view?:  | "FULL" | "HEADERS";
}

function serializeProjectsTimeSeriesListOptions(data: any): ProjectsTimeSeriesListOptions {
  return {
    ...data,
    ["aggregation.alignmentPeriod"]: data["aggregation.alignmentPeriod"] !== undefined ? data["aggregation.alignmentPeriod"] : undefined,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? data["interval.endTime"].toISOString() : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? data["interval.startTime"].toISOString() : undefined,
    ["secondaryAggregation.alignmentPeriod"]: data["secondaryAggregation.alignmentPeriod"] !== undefined ? data["secondaryAggregation.alignmentPeriod"] : undefined,
  };
}

function deserializeProjectsTimeSeriesListOptions(data: any): ProjectsTimeSeriesListOptions {
  return {
    ...data,
    ["aggregation.alignmentPeriod"]: data["aggregation.alignmentPeriod"] !== undefined ? data["aggregation.alignmentPeriod"] : undefined,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? new Date(data["interval.endTime"]) : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? new Date(data["interval.startTime"]) : undefined,
    ["secondaryAggregation.alignmentPeriod"]: data["secondaryAggregation.alignmentPeriod"] !== undefined ? data["secondaryAggregation.alignmentPeriod"] : undefined,
  };
}

/**
 * Additional options for Monitoring#projectsUptimeCheckConfigsList.
 */
export interface ProjectsUptimeCheckConfigsListOptions {
  /**
   * If provided, this field specifies the criteria that must be met by uptime
   * checks to be included in the response.For more details, see Filtering
   * syntax
   * (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering#filter_syntax).
   */
  filter?: string;
  /**
   * The maximum number of results to return in a single response. The server
   * may further constrain the maximum number of results returned in a single
   * page. If the page_size is <=0, the server will decide the number of results
   * to be returned.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return more results from the previous method call.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#projectsUptimeCheckConfigsPatch.
 */
export interface ProjectsUptimeCheckConfigsPatchOptions {
  /**
   * Optional. If present, only the listed fields in the current Uptime check
   * configuration are updated with values from the new configuration. If this
   * field is empty, then the current configuration is completely replaced with
   * the new configuration.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsUptimeCheckConfigsPatchOptions(data: any): ProjectsUptimeCheckConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsUptimeCheckConfigsPatchOptions(data: any): ProjectsUptimeCheckConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The QueryTimeSeries request.
 */
export interface QueryTimeSeriesRequest {
  /**
   * A positive number that is the maximum number of time_series_data to
   * return.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
  /**
   * Required. The query in the Monitoring Query Language
   * (https://cloud.google.com/monitoring/mql/reference) format. The default
   * time zone is in UTC.
   */
  query?: string;
}

/**
 * The QueryTimeSeries response.
 */
export interface QueryTimeSeriesResponse {
  /**
   * If there are more results than have been returned, then this field is set
   * to a non-empty value. To see the additional results, use that value as
   * page_token in the next call to this method.
   */
  nextPageToken?: string;
  /**
   * Query execution errors that may have caused the time series data returned
   * to be incomplete. The available data will be available in the response.
   */
  partialErrors?: Status[];
  /**
   * The time series data.
   */
  timeSeriesData?: TimeSeriesData[];
  /**
   * The descriptor for the time series data.
   */
  timeSeriesDescriptor?: TimeSeriesDescriptor;
}

function serializeQueryTimeSeriesResponse(data: any): QueryTimeSeriesResponse {
  return {
    ...data,
    timeSeriesData: data["timeSeriesData"] !== undefined ? data["timeSeriesData"].map((item: any) => (serializeTimeSeriesData(item))) : undefined,
  };
}

function deserializeQueryTimeSeriesResponse(data: any): QueryTimeSeriesResponse {
  return {
    ...data,
    timeSeriesData: data["timeSeriesData"] !== undefined ? data["timeSeriesData"].map((item: any) => (deserializeTimeSeriesData(item))) : undefined,
  };
}

/**
 * The range of the population values.
 */
export interface Range {
  /**
   * The maximum of the population values.
   */
  max?: number;
  /**
   * The minimum of the population values.
   */
  min?: number;
}

/**
 * Service Level Indicators for which atomic units of service are counted
 * directly.
 */
export interface RequestBasedSli {
  /**
   * distribution_cut is used when good_service is a count of values aggregated
   * in a Distribution that fall into a good range. The total_service is the
   * total count of all values aggregated in the Distribution.
   */
  distributionCut?: DistributionCut;
  /**
   * good_total_ratio is used when the ratio of good_service to total_service
   * is computed from two TimeSeries.
   */
  goodTotalRatio?: TimeSeriesRatio;
}

/**
 * The resource submessage for group checks. It can be used instead of a
 * monitored resource, when multiple resources are being monitored.
 */
export interface ResourceGroup {
  /**
   * The group of resources being monitored. Should be only the [GROUP_ID], and
   * not the full-path projects/[PROJECT_ID_OR_NUMBER]/groups/[GROUP_ID].
   */
  groupId?: string;
  /**
   * The resource type of the group members.
   */
  resourceType?:  | "RESOURCE_TYPE_UNSPECIFIED" | "INSTANCE" | "AWS_ELB_LOAD_BALANCER";
}

/**
 * A status to accept. Either a status code class like "2xx", or an integer
 * status code like "200".
 */
export interface ResponseStatusCode {
  /**
   * A class of status codes to accept.
   */
  statusClass?:  | "STATUS_CLASS_UNSPECIFIED" | "STATUS_CLASS_1XX" | "STATUS_CLASS_2XX" | "STATUS_CLASS_3XX" | "STATUS_CLASS_4XX" | "STATUS_CLASS_5XX" | "STATUS_CLASS_ANY";
  /**
   * A status code to accept.
   */
  statusValue?: number;
}

/**
 * The SendNotificationChannelVerificationCode request.
 */
export interface SendNotificationChannelVerificationCodeRequest {
}

/**
 * A Service is a discrete, autonomous, and network-accessible unit, designed
 * to solve an individual concern (Wikipedia
 * (https://en.wikipedia.org/wiki/Service-orientation)). In Cloud Monitoring, a
 * Service acts as the root resource under which operational aspects of the
 * service are accessible.
 */
export interface Service {
  /**
   * Type used for App Engine services.
   */
  appEngine?: AppEngine;
  /**
   * Message that contains the service type and service labels of this service
   * if it is a basic service. Documentation and examples here
   * (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).
   */
  basicService?: BasicService;
  /**
   * Type used for Cloud Endpoints services.
   */
  cloudEndpoints?: CloudEndpoints;
  /**
   * Type used for Cloud Run services.
   */
  cloudRun?: CloudRun;
  /**
   * Type used for Istio services that live in a Kubernetes cluster.
   */
  clusterIstio?: ClusterIstio;
  /**
   * Custom service type.
   */
  custom?: Custom;
  /**
   * Name used for UI elements listing this Service.
   */
  displayName?: string;
  /**
   * Type used for GKE Namespaces.
   */
  gkeNamespace?: GkeNamespace;
  /**
   * Type used for GKE Services (the Kubernetes concept of a service).
   */
  gkeService?: GkeService;
  /**
   * Type used for GKE Workloads.
   */
  gkeWorkload?: GkeWorkload;
  /**
   * Type used for canonical services scoped to an Istio mesh. Metrics for
   * Istio are documented here
   * (https://istio.io/latest/docs/reference/config/metrics/)
   */
  istioCanonicalService?: IstioCanonicalService;
  /**
   * Type used for Istio services scoped to an Istio mesh.
   */
  meshIstio?: MeshIstio;
  /**
   * Resource name for this Service. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]
   */
  name?: string;
  /**
   * Configuration for how to query telemetry on a Service.
   */
  telemetry?: Telemetry;
  /**
   * Labels which have been used to annotate the service. Label keys must start
   * with a letter. Label keys and values may contain lowercase letters,
   * numbers, underscores, and dashes. Label keys and values have a maximum
   * length of 63 characters, and must be less than 128 bytes in size. Up to 64
   * label entries may be stored. For labels which do not have a semantic value,
   * the empty string may be supplied for the label value.
   */
  userLabels?: {
    [key: string]: string
  };
}

/**
 * A Service-Level Indicator (SLI) describes the "performance" of a service.
 * For some services, the SLI is well-defined. In such cases, the SLI can be
 * described easily by referencing the well-known SLI and providing the needed
 * parameters. Alternatively, a "custom" SLI can be defined with a query to the
 * underlying metric store. An SLI is defined to be good_service / total_service
 * over any queried time interval. The value of performance always falls into
 * the range 0 <= performance <= 1. A custom SLI describes how to compute this
 * ratio, whether this is by dividing values from a pair of time series, cutting
 * a Distribution into good and bad counts, or counting time windows in which
 * the service complies with a criterion. For separation of concerns, a single
 * Service-Level Indicator measures performance for only one aspect of service
 * quality, such as fraction of successful queries or fast-enough queries.
 */
export interface ServiceLevelIndicator {
  /**
   * Basic SLI on a well-known service type.
   */
  basicSli?: BasicSli;
  /**
   * Request-based SLIs
   */
  requestBased?: RequestBasedSli;
  /**
   * Windows-based SLIs
   */
  windowsBased?: WindowsBasedSli;
}

function serializeServiceLevelIndicator(data: any): ServiceLevelIndicator {
  return {
    ...data,
    basicSli: data["basicSli"] !== undefined ? serializeBasicSli(data["basicSli"]) : undefined,
    windowsBased: data["windowsBased"] !== undefined ? serializeWindowsBasedSli(data["windowsBased"]) : undefined,
  };
}

function deserializeServiceLevelIndicator(data: any): ServiceLevelIndicator {
  return {
    ...data,
    basicSli: data["basicSli"] !== undefined ? deserializeBasicSli(data["basicSli"]) : undefined,
    windowsBased: data["windowsBased"] !== undefined ? deserializeWindowsBasedSli(data["windowsBased"]) : undefined,
  };
}

/**
 * A Service-Level Objective (SLO) describes a level of desired good service.
 * It consists of a service-level indicator (SLI), a performance goal, and a
 * period over which the objective is to be evaluated against that goal. The SLO
 * can use SLIs defined in a number of different manners. Typical SLOs might
 * include "99% of requests in each rolling week have latency below 200
 * milliseconds" or "99.5% of requests in each calendar month return
 * successfully."
 */
export interface ServiceLevelObjective {
  /**
   * A calendar period, semantically "since the start of the current ". At this
   * time, only DAY, WEEK, FORTNIGHT, and MONTH are supported.
   */
  calendarPeriod?:  | "CALENDAR_PERIOD_UNSPECIFIED" | "DAY" | "WEEK" | "FORTNIGHT" | "MONTH" | "QUARTER" | "HALF" | "YEAR";
  /**
   * Name used for UI elements listing this SLO.
   */
  displayName?: string;
  /**
   * The fraction of service that must be good in order for this objective to
   * be met. 0 < goal <= 0.999.
   */
  goal?: number;
  /**
   * Resource name for this ServiceLevelObjective. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/services/[SERVICE_ID]/serviceLevelObjectives/[SLO_NAME]
   * 
   */
  name?: string;
  /**
   * A rolling time period, semantically "in the past ". Must be an integer
   * multiple of 1 day no larger than 30 days.
   */
  rollingPeriod?: number /* Duration */;
  /**
   * The definition of good service, used to measure and calculate the quality
   * of the Service's performance with respect to a single aspect of service
   * quality.
   */
  serviceLevelIndicator?: ServiceLevelIndicator;
  /**
   * Labels which have been used to annotate the service-level objective. Label
   * keys must start with a letter. Label keys and values may contain lowercase
   * letters, numbers, underscores, and dashes. Label keys and values have a
   * maximum length of 63 characters, and must be less than 128 bytes in size.
   * Up to 64 label entries may be stored. For labels which do not have a
   * semantic value, the empty string may be supplied for the label value.
   */
  userLabels?: {
    [key: string]: string
  };
}

function serializeServiceLevelObjective(data: any): ServiceLevelObjective {
  return {
    ...data,
    rollingPeriod: data["rollingPeriod"] !== undefined ? data["rollingPeriod"] : undefined,
    serviceLevelIndicator: data["serviceLevelIndicator"] !== undefined ? serializeServiceLevelIndicator(data["serviceLevelIndicator"]) : undefined,
  };
}

function deserializeServiceLevelObjective(data: any): ServiceLevelObjective {
  return {
    ...data,
    rollingPeriod: data["rollingPeriod"] !== undefined ? data["rollingPeriod"] : undefined,
    serviceLevelIndicator: data["serviceLevelIndicator"] !== undefined ? deserializeServiceLevelIndicator(data["serviceLevelIndicator"]) : undefined,
  };
}

/**
 * Additional options for Monitoring#servicesCreate.
 */
export interface ServicesCreateOptions {
  /**
   * Optional. The Service id to use for this Service. If omitted, an id will
   * be generated instead. Must match the pattern [a-z0-9\-]+
   */
  serviceId?: string;
}

/**
 * Additional options for Monitoring#servicesList.
 */
export interface ServicesListOptions {
  /**
   * A filter specifying what Services to return. The filter supports filtering
   * on a particular service-identifier type or one of its attributes.To filter
   * on a particular service-identifier type, the identifier_case refers to
   * which option in the identifier field is populated. For example, the filter
   * identifier_case = "CUSTOM" would match all services with a value for the
   * custom field. Valid options include "CUSTOM", "APP_ENGINE", "MESH_ISTIO",
   * and the other options listed at
   * https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#ServiceTo
   * filter on an attribute of a service-identifier type, apply the filter name
   * by using the snake case of the service-identifier type and the attribute of
   * that service-identifier type, and join the two with a period. For example,
   * to filter by the meshUid field of the MeshIstio service-identifier type,
   * you must filter on mesh_istio.mesh_uid = "123" to match all services with
   * mesh UID "123". Service-identifier types and their attributes are described
   * at https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#Service
   */
  filter?: string;
  /**
   * A non-negative number that is the maximum number of results to return.
   * When 0, use default page size.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
}

/**
 * Additional options for Monitoring#servicesPatch.
 */
export interface ServicesPatchOptions {
  /**
   * A set of field paths defining which fields to use for the update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeServicesPatchOptions(data: any): ServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeServicesPatchOptions(data: any): ServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Monitoring#servicesServiceLevelObjectivesCreate.
 */
export interface ServicesServiceLevelObjectivesCreateOptions {
  /**
   * Optional. The ServiceLevelObjective id to use for this
   * ServiceLevelObjective. If omitted, an id will be generated instead. Must
   * match the pattern [a-z0-9\-]+
   */
  serviceLevelObjectiveId?: string;
}

/**
 * Additional options for Monitoring#servicesServiceLevelObjectivesGet.
 */
export interface ServicesServiceLevelObjectivesGetOptions {
  /**
   * View of the ServiceLevelObjective to return. If DEFAULT, return the
   * ServiceLevelObjective as originally defined. If EXPLICIT and the
   * ServiceLevelObjective is defined in terms of a BasicSli, replace the
   * BasicSli with a RequestBasedSli spelling out how the SLI is computed.
   */
  view?:  | "VIEW_UNSPECIFIED" | "FULL" | "EXPLICIT";
}

/**
 * Additional options for Monitoring#servicesServiceLevelObjectivesList.
 */
export interface ServicesServiceLevelObjectivesListOptions {
  /**
   * A filter specifying what ServiceLevelObjectives to return.
   */
  filter?: string;
  /**
   * A non-negative number that is the maximum number of results to return.
   * When 0, use default page size.
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return additional results from the previous method call.
   */
  pageToken?: string;
  /**
   * View of the ServiceLevelObjectives to return. If DEFAULT, return each
   * ServiceLevelObjective as originally defined. If EXPLICIT and the
   * ServiceLevelObjective is defined in terms of a BasicSli, replace the
   * BasicSli with a RequestBasedSli spelling out how the SLI is computed.
   */
  view?:  | "VIEW_UNSPECIFIED" | "FULL" | "EXPLICIT";
}

/**
 * Additional options for Monitoring#servicesServiceLevelObjectivesPatch.
 */
export interface ServicesServiceLevelObjectivesPatchOptions {
  /**
   * A set of field paths defining which fields to use for the update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeServicesServiceLevelObjectivesPatchOptions(data: any): ServicesServiceLevelObjectivesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeServicesServiceLevelObjectivesPatchOptions(data: any): ServicesServiceLevelObjectivesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A Snooze will prevent any alerts from being opened, and close any that are
 * already open. The Snooze will work on alerts that match the criteria defined
 * in the Snooze. The Snooze will be active from interval.start_time through
 * interval.end_time.
 */
export interface Snooze {
  /**
   * Required. This defines the criteria for applying the Snooze. See Criteria
   * for more information.
   */
  criteria?: Criteria;
  /**
   * Required. A display name for the Snooze. This can be, at most, 512 unicode
   * characters.
   */
  displayName?: string;
  /**
   * Required. The Snooze will be active from interval.start_time through
   * interval.end_time. interval.start_time cannot be in the past. There is a 15
   * second clock skew to account for the time it takes for a request to reach
   * the API from the UI.
   */
  interval?: TimeInterval;
  /**
   * Required. The name of the Snooze. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/snoozes/[SNOOZE_ID] The ID of the Snooze
   * will be generated by the system.
   */
  name?: string;
}

function serializeSnooze(data: any): Snooze {
  return {
    ...data,
    interval: data["interval"] !== undefined ? serializeTimeInterval(data["interval"]) : undefined,
  };
}

function deserializeSnooze(data: any): Snooze {
  return {
    ...data,
    interval: data["interval"] !== undefined ? deserializeTimeInterval(data["interval"]) : undefined,
  };
}

/**
 * SourceContext represents information about the source of a protobuf element,
 * like the file in which it is defined.
 */
export interface SourceContext {
  /**
   * The path-qualified name of the .proto file that contained the associated
   * protobuf element. For example: "google/protobuf/source_context.proto".
   */
  fileName?: string;
}

/**
 * The context of a span. This is attached to an Exemplar in Distribution
 * values during aggregation.It contains the name of a span with format:
 * projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID]
 */
export interface SpanContext {
  /**
   * The resource name of the span. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID]
   * [TRACE_ID] is a unique identifier for a trace within a project; it is a
   * 32-character hexadecimal encoding of a 16-byte array.[SPAN_ID] is a unique
   * identifier for a span within a trace; it is a 16-character hexadecimal
   * encoding of an 8-byte array.
   */
  spanName?: string;
}

/**
 * The Status type defines a logical error model that is suitable for different
 * programming environments, including REST APIs and RPC APIs. It is used by
 * gRPC (https://github.com/grpc). Each Status message contains three pieces of
 * data: error code, error message, and error details.You can find out more
 * about this error model and how to work with it in the API Design Guide
 * (https://cloud.google.com/apis/design/errors).
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
 * Information required for a TCP Uptime check request.
 */
export interface TcpCheck {
  /**
   * Contains information needed to add pings to a TCP check.
   */
  pingConfig?: PingConfig;
  /**
   * The TCP port on the server against which to run the check. Will be
   * combined with host (specified within the monitored_resource) to construct
   * the full URL. Required.
   */
  port?: number;
}

/**
 * Configuration for how to query telemetry on a Service.
 */
export interface Telemetry {
  /**
   * The full name of the resource that defines this service. Formatted as
   * described in https://cloud.google.com/apis/design/resource_names.
   */
  resourceName?: string;
}

/**
 * Describes a time interval: Reads: A half-open time interval. It includes the
 * end time but excludes the start time: (startTime, endTime]. The start time
 * must be specified, must be earlier than the end time, and should be no older
 * than the data retention period for the metric. Writes: A closed time
 * interval. It extends from the start time to the end time, and includes both:
 * [startTime, endTime]. Valid time intervals depend on the MetricKind
 * (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors#MetricKind)
 * of the metric value. The end time must not be earlier than the start time,
 * and the end time must not be more than 25 hours in the past or more than five
 * minutes in the future. For GAUGE metrics, the startTime value is technically
 * optional; if no value is specified, the start time defaults to the value of
 * the end time, and the interval represents a single point in time. If both
 * start and end times are specified, they must be identical. Such an interval
 * is valid only for GAUGE metrics, which are point-in-time measurements. The
 * end time of a new interval must be at least a millisecond after the end time
 * of the previous interval. For DELTA metrics, the start time and end time must
 * specify a non-zero interval, with subsequent points specifying contiguous and
 * non-overlapping intervals. For DELTA metrics, the start time of the next
 * interval must be at least a millisecond after the end time of the previous
 * interval. For CUMULATIVE metrics, the start time and end time must specify a
 * non-zero interval, with subsequent points specifying the same start time and
 * increasing end times, until an event resets the cumulative value to zero and
 * sets a new start time for the following points. The new start time must be at
 * least a millisecond after the end time of the previous interval. The start
 * time of a new interval must be at least a millisecond after the end time of
 * the previous interval because intervals are closed. If the start time of a
 * new interval is the same as the end time of the previous interval, then data
 * written at the new start time could overwrite data written at the previous
 * end time.
 */
export interface TimeInterval {
  /**
   * Required. The end of the time interval.
   */
  endTime?: Date;
  /**
   * Optional. The beginning of the time interval. The default value for the
   * start time is the end time. The start time must not be later than the end
   * time.
   */
  startTime?: Date;
}

function serializeTimeInterval(data: any): TimeInterval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeInterval(data: any): TimeInterval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A collection of data points that describes the time-varying values of a
 * metric. A time series is identified by a combination of a fully-specified
 * monitored resource and a fully-specified metric. This type is used for both
 * listing and creating time series.
 */
export interface TimeSeries {
  /**
   * Output only. The associated monitored resource metadata. When reading a
   * time series, this field will include metadata labels that are explicitly
   * named in the reduction. When creating a time series, this field is ignored.
   */
  metadata?: MonitoredResourceMetadata;
  /**
   * The associated metric. A fully-specified metric used to identify the time
   * series.
   */
  metric?: Metric;
  /**
   * The metric kind of the time series. When listing time series, this metric
   * kind might be different from the metric kind of the associated metric if
   * this time series is an alignment or reduction of other time series.When
   * creating a time series, this field is optional. If present, it must be the
   * same as the metric kind of the associated metric. If the associated
   * metric's descriptor must be auto-created, then this field specifies the
   * metric kind of the new descriptor and must be either GAUGE (the default) or
   * CUMULATIVE.
   */
  metricKind?:  | "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE";
  /**
   * The data points of this time series. When listing time series, points are
   * returned in reverse time order.When creating a time series, this field must
   * contain exactly one point and the point's type must be the same as the
   * value type of the associated metric. If the associated metric's descriptor
   * must be auto-created, then the value type of the descriptor is determined
   * by the point's type, which must be BOOL, INT64, DOUBLE, or DISTRIBUTION.
   */
  points?: Point[];
  /**
   * The associated monitored resource. Custom metrics can use only certain
   * monitored resource types in their time series data. For more information,
   * see Monitored resources for custom metrics
   * (https://cloud.google.com/monitoring/custom-metrics/creating-metrics#custom-metric-resources).
   */
  resource?: MonitoredResource;
  /**
   * The units in which the metric value is reported. It is only applicable if
   * the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the
   * representation of the stored metric values.
   */
  unit?: string;
  /**
   * The value type of the time series. When listing time series, this value
   * type might be different from the value type of the associated metric if
   * this time series is an alignment or reduction of other time series.When
   * creating a time series, this field is optional. If present, it must be the
   * same as the type of the data in the points field.
   */
  valueType?:  | "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY";
}

function serializeTimeSeries(data: any): TimeSeries {
  return {
    ...data,
    points: data["points"] !== undefined ? data["points"].map((item: any) => (serializePoint(item))) : undefined,
  };
}

function deserializeTimeSeries(data: any): TimeSeries {
  return {
    ...data,
    points: data["points"] !== undefined ? data["points"].map((item: any) => (deserializePoint(item))) : undefined,
  };
}

/**
 * Represents the values of a time series associated with a
 * TimeSeriesDescriptor.
 */
export interface TimeSeriesData {
  /**
   * The values of the labels in the time series identifier, given in the same
   * order as the label_descriptors field of the TimeSeriesDescriptor associated
   * with this object. Each value must have a value of the type given in the
   * corresponding entry of label_descriptors.
   */
  labelValues?: LabelValue[];
  /**
   * The points in the time series.
   */
  pointData?: PointData[];
}

function serializeTimeSeriesData(data: any): TimeSeriesData {
  return {
    ...data,
    labelValues: data["labelValues"] !== undefined ? data["labelValues"].map((item: any) => (serializeLabelValue(item))) : undefined,
    pointData: data["pointData"] !== undefined ? data["pointData"].map((item: any) => (serializePointData(item))) : undefined,
  };
}

function deserializeTimeSeriesData(data: any): TimeSeriesData {
  return {
    ...data,
    labelValues: data["labelValues"] !== undefined ? data["labelValues"].map((item: any) => (deserializeLabelValue(item))) : undefined,
    pointData: data["pointData"] !== undefined ? data["pointData"].map((item: any) => (deserializePointData(item))) : undefined,
  };
}

/**
 * A descriptor for the labels and points in a time series.
 */
export interface TimeSeriesDescriptor {
  /**
   * Descriptors for the labels.
   */
  labelDescriptors?: LabelDescriptor[];
  /**
   * Descriptors for the point data value columns.
   */
  pointDescriptors?: ValueDescriptor[];
}

/**
 * A TimeSeriesRatio specifies two TimeSeries to use for computing the
 * good_service / total_service ratio. The specified TimeSeries must have
 * ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or
 * MetricKind = CUMULATIVE. The TimeSeriesRatio must specify exactly two of
 * good, bad, and total, and the relationship good_service + bad_service =
 * total_service will be assumed.
 */
export interface TimeSeriesRatio {
  /**
   * A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters)
   * specifying a TimeSeries quantifying bad service, either demanded service
   * that was not provided or demanded service that was of inadequate quality.
   * Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind
   * = DELTA or MetricKind = CUMULATIVE.
   */
  badServiceFilter?: string;
  /**
   * A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters)
   * specifying a TimeSeries quantifying good service provided. Must have
   * ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or
   * MetricKind = CUMULATIVE.
   */
  goodServiceFilter?: string;
  /**
   * A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters)
   * specifying a TimeSeries quantifying total demanded service. Must have
   * ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or
   * MetricKind = CUMULATIVE.
   */
  totalServiceFilter?: string;
}

/**
 * Specifies how many time series must fail a predicate to trigger a condition.
 * If not specified, then a {count: 1} trigger is used.
 */
export interface Trigger {
  /**
   * The absolute number of time series that must fail the predicate for the
   * condition to be triggered.
   */
  count?: number;
  /**
   * The percentage of time series that must fail the predicate for the
   * condition to be triggered.
   */
  percent?: number;
}

/**
 * A protocol buffer message type.
 */
export interface Type {
  /**
   * The list of fields.
   */
  fields?: Field[];
  /**
   * The fully qualified message name.
   */
  name?: string;
  /**
   * The list of types appearing in oneof definitions in this type.
   */
  oneofs?: string[];
  /**
   * The protocol buffer options.
   */
  options?: Option[];
  /**
   * The source context.
   */
  sourceContext?: SourceContext;
  /**
   * The source syntax.
   */
  syntax?:  | "SYNTAX_PROTO2" | "SYNTAX_PROTO3";
}

/**
 * A single strongly-typed value.
 */
export interface TypedValue {
  /**
   * A Boolean value: true or false.
   */
  boolValue?: boolean;
  /**
   * A distribution value.
   */
  distributionValue?: Distribution;
  /**
   * A 64-bit double-precision floating-point number. Its magnitude is
   * approximately ±10±300 and it has 16 significant digits of precision.
   */
  doubleValue?: number;
  /**
   * A 64-bit integer. Its range is approximately ±9.2x1018.
   */
  int64Value?: bigint;
  /**
   * A variable-length string value.
   */
  stringValue?: string;
}

function serializeTypedValue(data: any): TypedValue {
  return {
    ...data,
    distributionValue: data["distributionValue"] !== undefined ? serializeDistribution(data["distributionValue"]) : undefined,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeTypedValue(data: any): TypedValue {
  return {
    ...data,
    distributionValue: data["distributionValue"] !== undefined ? deserializeDistribution(data["distributionValue"]) : undefined,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * This message configures which resources and services to monitor for
 * availability.
 */
export interface UptimeCheckConfig {
  /**
   * The type of checkers to use to execute the Uptime check.
   */
  checkerType?:  | "CHECKER_TYPE_UNSPECIFIED" | "STATIC_IP_CHECKERS" | "VPC_CHECKERS";
  /**
   * The content that is expected to appear in the data returned by the target
   * server against which the check is run. Currently, only the first entry in
   * the content_matchers list is supported, and additional entries will be
   * ignored. This field is optional and should only be specified if a content
   * match is required as part of the/ Uptime check.
   */
  contentMatchers?: ContentMatcher[];
  /**
   * A human-friendly name for the Uptime check configuration. The display name
   * should be unique within a Cloud Monitoring Workspace in order to make it
   * easier to identify; however, uniqueness is not enforced. Required.
   */
  displayName?: string;
  /**
   * Contains information needed to make an HTTP or HTTPS check.
   */
  httpCheck?: HttpCheck;
  /**
   * The internal checkers that this check will egress from. If is_internal is
   * true and this list is empty, the check will egress from all the
   * InternalCheckers configured for the project that owns this
   * UptimeCheckConfig.
   */
  internalCheckers?: InternalChecker[];
  /**
   * If this is true, then checks are made only from the 'internal_checkers'.
   * If it is false, then checks are made only from the 'selected_regions'. It
   * is an error to provide 'selected_regions' when is_internal is true, or to
   * provide 'internal_checkers' when is_internal is false.
   */
  isInternal?: boolean;
  /**
   * The monitored resource (https://cloud.google.com/monitoring/api/resources)
   * associated with the configuration. The following monitored resource types
   * are valid for this field: uptime_url, gce_instance, gae_app,
   * aws_ec2_instance, aws_elb_load_balancer k8s_service
   * servicedirectory_service cloud_run_revision
   */
  monitoredResource?: MonitoredResource;
  /**
   * A unique resource name for this Uptime check configuration. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/uptimeCheckConfigs/[UPTIME_CHECK_ID]
   * [PROJECT_ID_OR_NUMBER] is the Workspace host project associated with the
   * Uptime check.This field should be omitted when creating the Uptime check
   * configuration; on create, the resource name is assigned by the server and
   * included in the response.
   */
  name?: string;
  /**
   * How often, in seconds, the Uptime check is performed. Currently, the only
   * supported values are 60s (1 minute), 300s (5 minutes), 600s (10 minutes),
   * and 900s (15 minutes). Optional, defaults to 60s.
   */
  period?: number /* Duration */;
  /**
   * The group resource associated with the configuration.
   */
  resourceGroup?: ResourceGroup;
  /**
   * The list of regions from which the check will be run. Some regions contain
   * one location, and others contain more than one. If this field is specified,
   * enough regions must be provided to include a minimum of 3 locations. Not
   * specifying this field will result in Uptime checks running from all
   * available regions.
   */
  selectedRegions?:  | "REGION_UNSPECIFIED" | "USA" | "EUROPE" | "SOUTH_AMERICA" | "ASIA_PACIFIC" | "USA_OREGON" | "USA_IOWA" | "USA_VIRGINIA"[];
  /**
   * Contains information needed to make a TCP check.
   */
  tcpCheck?: TcpCheck;
  /**
   * The maximum amount of time to wait for the request to complete (must be
   * between 1 and 60 seconds). Required.
   */
  timeout?: number /* Duration */;
  /**
   * User-supplied key/value data to be used for organizing and identifying the
   * UptimeCheckConfig objects.The field can contain up to 64 entries. Each key
   * and value is limited to 63 Unicode characters or 128 bytes, whichever is
   * smaller. Labels and values can contain only lowercase letters, numerals,
   * underscores, and dashes. Keys must begin with a letter.
   */
  userLabels?: {
    [key: string]: string
  };
}

function serializeUptimeCheckConfig(data: any): UptimeCheckConfig {
  return {
    ...data,
    httpCheck: data["httpCheck"] !== undefined ? serializeHttpCheck(data["httpCheck"]) : undefined,
    period: data["period"] !== undefined ? data["period"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeUptimeCheckConfig(data: any): UptimeCheckConfig {
  return {
    ...data,
    httpCheck: data["httpCheck"] !== undefined ? deserializeHttpCheck(data["httpCheck"]) : undefined,
    period: data["period"] !== undefined ? data["period"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Contains the region, location, and list of IP addresses where checkers in
 * the location run from.
 */
export interface UptimeCheckIp {
  /**
   * The IP address from which the Uptime check originates. This is a fully
   * specified IP address (not an IP address range). Most IP addresses, as of
   * this publication, are in IPv4 format; however, one should not rely on the
   * IP addresses being in IPv4 format indefinitely, and should support
   * interpreting this field in either IPv4 or IPv6 format.
   */
  ipAddress?: string;
  /**
   * A more specific location within the region that typically encodes a
   * particular city/town/metro (and its containing state/province or country)
   * within the broader umbrella region category.
   */
  location?: string;
  /**
   * A broad region category in which the IP address is located.
   */
  region?:  | "REGION_UNSPECIFIED" | "USA" | "EUROPE" | "SOUTH_AMERICA" | "ASIA_PACIFIC" | "USA_OREGON" | "USA_IOWA" | "USA_VIRGINIA";
}

/**
 * Additional options for Monitoring#uptimeCheckIpsList.
 */
export interface UptimeCheckIpsListOptions {
  /**
   * The maximum number of results to return in a single response. The server
   * may further constrain the maximum number of results returned in a single
   * page. If the page_size is <=0, the server will decide the number of results
   * to be returned. NOTE: this field is not yet implemented
   */
  pageSize?: number;
  /**
   * If this field is not empty then it must contain the nextPageToken value
   * returned by a previous call to this method. Using this field causes the
   * method to return more results from the previous method call. NOTE: this
   * field is not yet implemented
   */
  pageToken?: string;
}

/**
 * A descriptor for the value columns in a data point.
 */
export interface ValueDescriptor {
  /**
   * The value key.
   */
  key?: string;
  /**
   * The value stream kind.
   */
  metricKind?:  | "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE";
  /**
   * The unit in which time_series point values are reported. unit follows the
   * UCUM format for units as seen in https://unitsofmeasure.org/ucum.html. unit
   * is only valid if value_type is INTEGER, DOUBLE, DISTRIBUTION.
   */
  unit?: string;
  /**
   * The value type.
   */
  valueType?:  | "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY";
}

/**
 * The VerifyNotificationChannel request.
 */
export interface VerifyNotificationChannelRequest {
  /**
   * Required. The verification code that was delivered to the channel as a
   * result of invoking the SendNotificationChannelVerificationCode API method
   * or that was retrieved from a verified channel via
   * GetNotificationChannelVerificationCode. For example, one might have
   * "G-123456" or "TKNZGhhd2EyN3I1MnRnMjRv" (in general, one is only guaranteed
   * that the code is valid UTF-8; one should not make any assumptions regarding
   * the structure or format of the code).
   */
  code?: string;
}

/**
 * A WindowsBasedSli defines good_service as the count of time windows for
 * which the provided service was of good quality. Criteria for determining if
 * service was good are embedded in the window_criterion.
 */
export interface WindowsBasedSli {
  /**
   * A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters)
   * specifying a TimeSeries with ValueType = BOOL. The window is good if any
   * true values appear in the window.
   */
  goodBadMetricFilter?: string;
  /**
   * A window is good if its performance is high enough.
   */
  goodTotalRatioThreshold?: PerformanceThreshold;
  /**
   * A window is good if the metric's value is in a good range, averaged across
   * returned streams.
   */
  metricMeanInRange?: MetricRange;
  /**
   * A window is good if the metric's value is in a good range, summed across
   * returned streams.
   */
  metricSumInRange?: MetricRange;
  /**
   * Duration over which window quality is evaluated. Must be an integer
   * fraction of a day and at least 60s.
   */
  windowPeriod?: number /* Duration */;
}

function serializeWindowsBasedSli(data: any): WindowsBasedSli {
  return {
    ...data,
    goodTotalRatioThreshold: data["goodTotalRatioThreshold"] !== undefined ? serializePerformanceThreshold(data["goodTotalRatioThreshold"]) : undefined,
    windowPeriod: data["windowPeriod"] !== undefined ? data["windowPeriod"] : undefined,
  };
}

function deserializeWindowsBasedSli(data: any): WindowsBasedSli {
  return {
    ...data,
    goodTotalRatioThreshold: data["goodTotalRatioThreshold"] !== undefined ? deserializePerformanceThreshold(data["goodTotalRatioThreshold"]) : undefined,
    windowPeriod: data["windowPeriod"] !== undefined ? data["windowPeriod"] : undefined,
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
