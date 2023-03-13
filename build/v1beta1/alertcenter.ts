// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Workspace Alert Center API Client for Deno
 * =================================================
 * 
 * Manages alerts on issues affecting your domain. Note: The current version of this API (v1beta1) is available to all Google Workspace customers. 
 * 
 * Docs: https://developers.google.com/admin-sdk/alertcenter/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages alerts on issues affecting your domain. Note: The current version of
 * this API (v1beta1) is available to all Google Workspace customers.
 */
export class AlertCenter {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://alertcenter.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Performs batch delete operation on alerts.
   *
   */
  async alertsBatchDelete(req: BatchDeleteAlertsRequest): Promise<BatchDeleteAlertsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchDeleteAlertsResponse;
  }

  /**
   * Performs batch undelete operation on alerts.
   *
   */
  async alertsBatchUndelete(req: BatchUndeleteAlertsRequest): Promise<BatchUndeleteAlertsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts:batchUndelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchUndeleteAlertsResponse;
  }

  /**
   * Marks the specified alert for deletion. An alert that has been marked for
   * deletion is removed from Alert Center after 30 days. Marking an alert for
   * deletion has no effect on an alert which has already been marked for
   * deletion. Attempting to mark a nonexistent alert for deletion results in a
   * `NOT_FOUND` error.
   *
   * @param alertId Required. The identifier of the alert to delete.
   */
  async alertsDelete(alertId: string, opts: AlertsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts/${ alertId }`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Creates new feedback for an alert. Attempting to create a feedback for a
   * non-existent alert returns `NOT_FOUND` error. Attempting to create a
   * feedback for an alert that is marked for deletion returns
   * `FAILED_PRECONDITION' error.
   *
   * @param alertId Required. The identifier of the alert this feedback belongs to.
   */
  async alertsFeedbackCreate(alertId: string, req: AlertFeedback, opts: AlertsFeedbackCreateOptions = {}): Promise<AlertFeedback> {
    req = serializeAlertFeedback(req);
    const url = new URL(`${this.#baseUrl}v1beta1/alerts/${ alertId }/feedback`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAlertFeedback(data);
  }

  /**
   * Lists all the feedback for an alert. Attempting to list feedbacks for a
   * non-existent alert returns `NOT_FOUND` error.
   *
   * @param alertId Required. The alert identifier. The "-" wildcard could be used to represent all alerts.
   */
  async alertsFeedbackList(alertId: string, opts: AlertsFeedbackListOptions = {}): Promise<ListAlertFeedbackResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts/${ alertId }/feedback`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListAlertFeedbackResponse(data);
  }

  /**
   * Gets the specified alert. Attempting to get a nonexistent alert returns
   * `NOT_FOUND` error.
   *
   * @param alertId Required. The identifier of the alert to retrieve.
   */
  async alertsGet(alertId: string, opts: AlertsGetOptions = {}): Promise<Alert> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts/${ alertId }`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAlert(data);
  }

  /**
   * Returns the metadata of an alert. Attempting to get metadata for a
   * non-existent alert returns `NOT_FOUND` error.
   *
   * @param alertId Required. The identifier of the alert this metadata belongs to.
   */
  async alertsGetMetadata(alertId: string, opts: AlertsGetMetadataOptions = {}): Promise<AlertMetadata> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts/${ alertId }/metadata`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAlertMetadata(data);
  }

  /**
   * Lists the alerts.
   *
   */
  async alertsList(opts: AlertsListOptions = {}): Promise<ListAlertsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
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
    return deserializeListAlertsResponse(data);
  }

  /**
   * Restores, or "undeletes", an alert that was marked for deletion within the
   * past 30 days. Attempting to undelete an alert which was marked for deletion
   * over 30 days ago (which has been removed from the Alert Center database) or
   * a nonexistent alert returns a `NOT_FOUND` error. Attempting to undelete an
   * alert which has not been marked for deletion has no effect.
   *
   * @param alertId Required. The identifier of the alert to undelete.
   */
  async alertsUndelete(alertId: string, req: UndeleteAlertRequest): Promise<Alert> {
    const url = new URL(`${this.#baseUrl}v1beta1/alerts/${ alertId }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAlert(data);
  }

  /**
   * Returns customer-level settings.
   *
   */
  async v1beta1GetSettings(opts: V1beta1GetSettingsOptions = {}): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}v1beta1/settings`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Settings;
  }

  /**
   * Updates the customer-level settings.
   *
   */
  async v1beta1UpdateSettings(req: Settings, opts: V1beta1UpdateSettingsOptions = {}): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}v1beta1/settings`);
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Settings;
  }
}

/**
 * Details about why an account is receiving an account suspension warning.
 */
export interface AccountSuspensionDetails {
  /**
   * The reason why this account is receiving an account suspension warning.
   */
  abuseReason?:  | "ACCOUNT_SUSPENSION_ABUSE_REASON_UNSPECIFIED" | "TOS_VIOLATION" | "SPAM" | "PHISHING" | "TRAFFIC_PUMPING" | "FRAUD" | "NUMBER_HARVESTING" | "PAYMENTS_FRAUD" | "UNWANTED_CONTENT";
  /**
   * The name of the product being abused. This is restricted to only the
   * following values: "Gmail" "Google Workspace" "Payments" "Voice" "YouTube"
   * "Other"
   */
  productName?: string;
}

/**
 * A warning that the customer's account is about to be suspended.
 */
export interface AccountSuspensionWarning {
  /**
   * The amount of time remaining to appeal an imminent suspension. After this
   * window has elapsed, the account will be suspended. Only populated if the
   * account suspension is in WARNING state.
   */
  appealWindow?: number /* Duration */;
  /**
   * Account suspension warning state.
   */
  state?:  | "ACCOUNT_SUSPENSION_WARNING_STATE_UNSPECIFIED" | "WARNING" | "SUSPENDED" | "APPEAL_APPROVED" | "APPEAL_SUBMITTED";
  /**
   * Details about why an account is being suspended.
   */
  suspensionDetails?: AccountSuspensionDetails[];
}

function serializeAccountSuspensionWarning(data: any): AccountSuspensionWarning {
  return {
    ...data,
    appealWindow: data["appealWindow"] !== undefined ? data["appealWindow"] : undefined,
  };
}

function deserializeAccountSuspensionWarning(data: any): AccountSuspensionWarning {
  return {
    ...data,
    appealWindow: data["appealWindow"] !== undefined ? data["appealWindow"] : undefined,
  };
}

/**
 * Alerts for user account warning events.
 */
export interface AccountWarning {
  /**
   * Required. The email of the user that this event belongs to.
   */
  email?: string;
  /**
   * Optional. Details of the login action associated with the warning event.
   * This is only available for: * Suspicious login * Suspicious login (less
   * secure app) * Suspicious programmatic login * User suspended (suspicious
   * activity)
   */
  loginDetails?: LoginDetails;
}

function serializeAccountWarning(data: any): AccountWarning {
  return {
    ...data,
    loginDetails: data["loginDetails"] !== undefined ? serializeLoginDetails(data["loginDetails"]) : undefined,
  };
}

function deserializeAccountWarning(data: any): AccountWarning {
  return {
    ...data,
    loginDetails: data["loginDetails"] !== undefined ? deserializeLoginDetails(data["loginDetails"]) : undefined,
  };
}

/**
 * Metadata related to the action.
 */
export interface ActionInfo {
}

/**
 * Alerts from Google Workspace Security Center rules service configured by an
 * admin.
 */
export interface ActivityRule {
  /**
   * List of action names associated with the rule threshold.
   */
  actionNames?: string[];
  /**
   * Rule create timestamp.
   */
  createTime?: Date;
  /**
   * Description of the rule.
   */
  description?: string;
  /**
   * Alert display name.
   */
  displayName?: string;
  /**
   * Rule name.
   */
  name?: string;
  /**
   * Query that is used to get the data from the associated source.
   */
  query?: string;
  /**
   * List of alert IDs superseded by this alert. It is used to indicate that
   * this alert is essentially extension of superseded alerts and we found the
   * relationship after creating these alerts.
   */
  supersededAlerts?: string[];
  /**
   * Alert ID superseding this alert. It is used to indicate that superseding
   * alert is essentially extension of this alert and we found the relationship
   * after creating both alerts.
   */
  supersedingAlert?: string;
  /**
   * Alert threshold is for example “COUNT > 5”.
   */
  threshold?: string;
  /**
   * The trigger sources for this rule. * GMAIL_EVENTS * DEVICE_EVENTS *
   * USER_EVENTS
   */
  triggerSource?: string;
  /**
   * The timestamp of the last update to the rule.
   */
  updateTime?: Date;
  /**
   * Rule window size. Possible values are 1 hour or 24 hours.
   */
  windowSize?: number /* Duration */;
}

function serializeActivityRule(data: any): ActivityRule {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
    windowSize: data["windowSize"] !== undefined ? data["windowSize"] : undefined,
  };
}

function deserializeActivityRule(data: any): ActivityRule {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    windowSize: data["windowSize"] !== undefined ? data["windowSize"] : undefined,
  };
}

/**
 * An alert affecting a customer.
 */
export interface Alert {
  /**
   * Output only. The unique identifier for the alert.
   */
  alertId?: string;
  /**
   * Output only. The time this alert was created.
   */
  createTime?: Date;
  /**
   * Output only. The unique identifier of the Google Workspace account of the
   * customer.
   */
  customerId?: string;
  /**
   * Optional. The data associated with this alert, for example
   * google.apps.alertcenter.type.DeviceCompromised.
   */
  data?: {
    [key: string]: any
  };
  /**
   * Output only. `True` if this alert is marked for deletion.
   */
  deleted?: boolean;
  /**
   * Optional. The time the event that caused this alert ceased being active.
   * If provided, the end time must not be earlier than the start time. If not
   * provided, it indicates an ongoing alert.
   */
  endTime?: Date;
  /**
   * Optional. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of an alert from overwriting each other.
   * It is strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform alert updates in order to avoid race
   * conditions: An `etag` is returned in the response which contains alerts,
   * and systems are expected to put that etag in the request to update alert to
   * ensure that their change will be applied to the same version of the alert.
   * If no `etag` is provided in the call to update alert, then the existing
   * alert is overwritten blindly.
   */
  etag?: string;
  /**
   * Output only. The metadata associated with this alert.
   */
  metadata?: AlertMetadata;
  /**
   * Output only. An optional [Security Investigation
   * Tool](https://support.google.com/a/answer/7575955) query for this alert.
   */
  securityInvestigationToolLink?: string;
  /**
   * Required. A unique identifier for the system that reported the alert. This
   * is output only after alert is created. Supported sources are any of the
   * following: * Google Operations * Mobile device management * Gmail phishing
   * * Data Loss Prevention * Domain wide takeout * State sponsored attack *
   * Google identity * Apps outage
   */
  source?: string;
  /**
   * Required. The time the event that caused this alert was started or
   * detected.
   */
  startTime?: Date;
  /**
   * Required. The type of the alert. This is output only after alert is
   * created. For a list of available alert types see [Google Workspace Alert
   * types](https://developers.google.com/admin-sdk/alertcenter/reference/alert-types).
   */
  type?: string;
  /**
   * Output only. The time this alert was last updated.
   */
  updateTime?: Date;
}

function serializeAlert(data: any): Alert {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    metadata: data["metadata"] !== undefined ? serializeAlertMetadata(data["metadata"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeAlert(data: any): Alert {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    metadata: data["metadata"] !== undefined ? deserializeAlertMetadata(data["metadata"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A customer feedback about an alert.
 */
export interface AlertFeedback {
  /**
   * Output only. The alert identifier.
   */
  alertId?: string;
  /**
   * Output only. The time this feedback was created.
   */
  createTime?: Date;
  /**
   * Output only. The unique identifier of the Google Workspace account of the
   * customer.
   */
  customerId?: string;
  /**
   * Output only. The email of the user that provided the feedback.
   */
  email?: string;
  /**
   * Output only. The unique identifier for the feedback.
   */
  feedbackId?: string;
  /**
   * Required. The type of the feedback.
   */
  type?:  | "ALERT_FEEDBACK_TYPE_UNSPECIFIED" | "NOT_USEFUL" | "SOMEWHAT_USEFUL" | "VERY_USEFUL";
}

function serializeAlertFeedback(data: any): AlertFeedback {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeAlertFeedback(data: any): AlertFeedback {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * An alert metadata.
 */
export interface AlertMetadata {
  /**
   * Output only. The alert identifier.
   */
  alertId?: string;
  /**
   * The email address of the user assigned to the alert.
   */
  assignee?: string;
  /**
   * Output only. The unique identifier of the Google Workspace account of the
   * customer.
   */
  customerId?: string;
  /**
   * Optional. `etag` is used for optimistic concurrency control as a way to
   * help prevent simultaneous updates of an alert metadata from overwriting
   * each other. It is strongly suggested that systems make use of the `etag` in
   * the read-modify-write cycle to perform metadata updates in order to avoid
   * race conditions: An `etag` is returned in the response which contains alert
   * metadata, and systems are expected to put that etag in the request to
   * update alert metadata to ensure that their change will be applied to the
   * same version of the alert metadata. If no `etag` is provided in the call to
   * update alert metadata, then the existing alert metadata is overwritten
   * blindly.
   */
  etag?: string;
  /**
   * The severity value of the alert. Alert Center will set this field at alert
   * creation time, default's to an empty string when it could not be
   * determined. The supported values for update actions on this field are the
   * following: * HIGH * MEDIUM * LOW
   */
  severity?: string;
  /**
   * The current status of the alert. The supported values are the following: *
   * NOT_STARTED * IN_PROGRESS * CLOSED
   */
  status?: string;
  /**
   * Output only. The time this metadata was last updated.
   */
  updateTime?: Date;
}

function serializeAlertMetadata(data: any): AlertMetadata {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeAlertMetadata(data: any): AlertMetadata {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional options for AlertCenter#alertsDelete.
 */
export interface AlertsDeleteOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert is associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Additional options for AlertCenter#alertsFeedbackCreate.
 */
export interface AlertsFeedbackCreateOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert is associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Additional options for AlertCenter#alertsFeedbackList.
 */
export interface AlertsFeedbackListOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert is associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
  /**
   * Optional. A query string for filtering alert feedback results. For more
   * details, see [Query
   * filters](https://developers.google.com/admin-sdk/alertcenter/guides/query-filters)
   * and [Supported query filter
   * fields](https://developers.google.com/admin-sdk/alertcenter/reference/filter-fields#alerts.feedback.list).
   */
  filter?: string;
}

/**
 * Additional options for AlertCenter#alertsGetMetadata.
 */
export interface AlertsGetMetadataOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert metadata is associated with. The `customer_id` must have
   * the initial "C" stripped (for example, `046psxkn`). Inferred from the
   * caller identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Additional options for AlertCenter#alertsGet.
 */
export interface AlertsGetOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert is associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Additional options for AlertCenter#alertsList.
 */
export interface AlertsListOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alerts are associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
  /**
   * Optional. A query string for filtering alert results. For more details,
   * see [Query
   * filters](https://developers.google.com/admin-sdk/alertcenter/guides/query-filters)
   * and [Supported query filter
   * fields](https://developers.google.com/admin-sdk/alertcenter/reference/filter-fields#alerts.list).
   */
  filter?: string;
  /**
   * Optional. The sort order of the list results. If not specified results may
   * be returned in arbitrary order. You can sort the results in descending
   * order based on the creation timestamp using `order_by="create_time desc"`.
   * Currently, supported sorting are `create_time asc`, `create_time desc`,
   * `update_time desc`
   */
  orderBy?: string;
  /**
   * Optional. The requested page size. Server may return fewer items than
   * requested. If unspecified, server picks an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results the server should return.
   * If empty, a new iteration is started. To continue an iteration, pass in the
   * value from the previous ListAlertsResponse's next_page_token field.
   */
  pageToken?: string;
}

/**
 * The explanation message associated with ApnsCertificationExpiring and
 * ApnsCertificationExpired alerts.
 */
export interface ApnsCertificateExpirationInfo {
  /**
   * The Apple ID used for the certificate may be blank if admins didn't enter
   * it.
   */
  appleId?: string;
  /**
   * The expiration date of the APNS Certificate.
   */
  expirationTime?: Date;
  /**
   * The UID for the certificate.
   */
  uid?: string;
}

function serializeApnsCertificateExpirationInfo(data: any): ApnsCertificateExpirationInfo {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
  };
}

function deserializeApnsCertificateExpirationInfo(data: any): ApnsCertificateExpirationInfo {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
  };
}

/**
 * Alerts from App Maker to notify admins to set up default SQL instance.
 */
export interface AppMakerSqlSetupNotification {
  /**
   * List of applications with requests for default SQL set up.
   */
  requestInfo?: RequestInfo[];
}

function serializeAppMakerSqlSetupNotification(data: any): AppMakerSqlSetupNotification {
  return {
    ...data,
    requestInfo: data["requestInfo"] !== undefined ? data["requestInfo"].map((item: any) => (serializeRequestInfo(item))) : undefined,
  };
}

function deserializeAppMakerSqlSetupNotification(data: any): AppMakerSqlSetupNotification {
  return {
    ...data,
    requestInfo: data["requestInfo"] !== undefined ? data["requestInfo"].map((item: any) => (deserializeRequestInfo(item))) : undefined,
  };
}

/**
 * Alerts from AppSettingsChanged bucket Rules configured by Admin which
 * contain the below rules. Calendar settings changed Drive settings changed
 * Email settings changed Mobile settings changed
 */
export interface AppSettingsChanged {
  /**
   * Any other associated alert details, for example, AlertConfiguration.
   */
  alertDetails?: Uint8Array;
  /**
   * Rule name
   */
  name?: string;
}

function serializeAppSettingsChanged(data: any): AppSettingsChanged {
  return {
    ...data,
    alertDetails: data["alertDetails"] !== undefined ? encodeBase64(data["alertDetails"]) : undefined,
  };
}

function deserializeAppSettingsChanged(data: any): AppSettingsChanged {
  return {
    ...data,
    alertDetails: data["alertDetails"] !== undefined ? decodeBase64(data["alertDetails"] as string) : undefined,
  };
}

/**
 * An outage incident reported for a Google Workspace service.
 */
export interface AppsOutage {
  /**
   * Link to the outage event in Google Workspace Status Dashboard
   */
  dashboardUri?: string;
  /**
   * Incident tracking ID.
   */
  incidentTrackingId?: string;
  /**
   * Indicates new alert details under which the outage is communicated. Only
   * populated when Status is MERGED.
   */
  mergeInfo?: MergeInfo;
  /**
   * Timestamp by which the next update is expected to arrive.
   */
  nextUpdateTime?: Date;
  /**
   * List of products impacted by the outage.
   */
  products?: string[];
  /**
   * Timestamp when the outage is expected to be resolved, or has confirmed
   * resolution. Provided only when known.
   */
  resolutionTime?: Date;
  /**
   * Current outage status.
   */
  status?:  | "STATUS_UNSPECIFIED" | "NEW" | "ONGOING" | "RESOLVED" | "FALSE_POSITIVE" | "PARTIALLY_RESOLVED" | "MERGED" | "DOWNGRADED";
}

function serializeAppsOutage(data: any): AppsOutage {
  return {
    ...data,
    nextUpdateTime: data["nextUpdateTime"] !== undefined ? data["nextUpdateTime"].toISOString() : undefined,
    resolutionTime: data["resolutionTime"] !== undefined ? data["resolutionTime"].toISOString() : undefined,
  };
}

function deserializeAppsOutage(data: any): AppsOutage {
  return {
    ...data,
    nextUpdateTime: data["nextUpdateTime"] !== undefined ? new Date(data["nextUpdateTime"]) : undefined,
    resolutionTime: data["resolutionTime"] !== undefined ? new Date(data["resolutionTime"]) : undefined,
  };
}

/**
 * Attachment with application-specific information about an alert.
 */
export interface Attachment {
  /**
   * A CSV file attachment.
   */
  csv?: Csv;
}

/**
 * Alert for setting the domain or IP that malicious email comes from as
 * whitelisted domain or IP in Gmail advanced settings.
 */
export interface BadWhitelist {
  /**
   * The domain ID.
   */
  domainId?: DomainId;
  /**
   * The entity whose actions triggered a Gmail phishing alert.
   */
  maliciousEntity?: MaliciousEntity;
  /**
   * The list of messages contained by this alert.
   */
  messages?: GmailMessageInfo[];
  /**
   * The source IP address of the malicious email, for example, `127.0.0.1`.
   */
  sourceIp?: string;
}

function serializeBadWhitelist(data: any): BadWhitelist {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (serializeGmailMessageInfo(item))) : undefined,
  };
}

function deserializeBadWhitelist(data: any): BadWhitelist {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (deserializeGmailMessageInfo(item))) : undefined,
  };
}

/**
 * A request to perform batch delete on alerts.
 */
export interface BatchDeleteAlertsRequest {
  /**
   * Required. The list of alert IDs to delete.
   */
  alertId?: string[];
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alerts are associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Response to batch delete operation on alerts.
 */
export interface BatchDeleteAlertsResponse {
  /**
   * The status details for each failed `alert_id`.
   */
  failedAlertStatus?: {
    [key: string]: Status
  };
  /**
   * The successful list of alert IDs.
   */
  successAlertIds?: string[];
}

/**
 * A request to perform batch undelete on alerts.
 */
export interface BatchUndeleteAlertsRequest {
  /**
   * Required. The list of alert IDs to undelete.
   */
  alertId?: string[];
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alerts are associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Response to batch undelete operation on alerts.
 */
export interface BatchUndeleteAlertsResponse {
  /**
   * The status details for each failed `alert_id`.
   */
  failedAlertStatus?: {
    [key: string]: Status
  };
  /**
   * The successful list of alert IDs.
   */
  successAlertIds?: string[];
}

/**
 * A reference to a Cloud Pubsub topic. To register for notifications, the
 * owner of the topic must grant
 * `alerts-api-push-notifications@system.gserviceaccount.com` the
 * `projects.topics.publish` permission.
 */
export interface CloudPubsubTopic {
  /**
   * Optional. The format of the payload that would be sent. If not specified
   * the format will be JSON.
   */
  payloadFormat?:  | "PAYLOAD_FORMAT_UNSPECIFIED" | "JSON";
  /**
   * The `name` field of a Cloud Pubsub [Topic]
   * (https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#Topic).
   */
  topicName?: string;
}

/**
 * A representation of a CSV file attachment, as a list of column headers and a
 * list of data rows.
 */
export interface Csv {
  /**
   * The list of data rows in a CSV file, as string arrays rather than as a
   * single comma-separated string.
   */
  dataRows?: CsvRow[];
  /**
   * The list of headers for data columns in a CSV file.
   */
  headers?: string[];
}

/**
 * A representation of a single data row in a CSV file.
 */
export interface CsvRow {
  /**
   * The data entries in a CSV file row, as a string array rather than a single
   * comma-separated string.
   */
  entries?: string[];
}

/**
 * A mobile device compromised alert. Derived from audit logs.
 */
export interface DeviceCompromised {
  /**
   * The email of the user this alert was created for.
   */
  email?: string;
  /**
   * Required. The list of security events.
   */
  events?: DeviceCompromisedSecurityDetail[];
}

/**
 * Detailed information of a single MDM device compromised event.
 */
export interface DeviceCompromisedSecurityDetail {
  /**
   * The device compromised state. Possible values are "`Compromised`" or "`Not
   * Compromised`".
   */
  deviceCompromisedState?: string;
  /**
   * Required. The device ID.
   */
  deviceId?: string;
  /**
   * The model of the device.
   */
  deviceModel?: string;
  /**
   * The type of the device.
   */
  deviceType?: string;
  /**
   * Required for iOS, empty for others.
   */
  iosVendorId?: string;
  /**
   * The device resource ID.
   */
  resourceId?: string;
  /**
   * The serial number of the device.
   */
  serialNumber?: string;
}

/**
 * Alerts that get triggered on violations of Data Loss Prevention (DLP) rules.
 */
export interface DlpRuleViolation {
  /**
   * Details about the violated DLP rule. Admins can use the predefined
   * detectors provided by Google Cloud DLP https://cloud.google.com/dlp/ when
   * setting up a DLP rule. Matched Cloud DLP detectors in this violation if any
   * will be captured in the MatchInfo.predefined_detector.
   */
  ruleViolationInfo?: RuleViolationInfo;
}

/**
 * Domain ID of Gmail phishing alerts.
 */
export interface DomainId {
  /**
   * The primary domain for the customer.
   */
  customerPrimaryDomain?: string;
}

/**
 * A takeout operation for the entire domain was initiated by an admin. Derived
 * from audit logs.
 */
export interface DomainWideTakeoutInitiated {
  /**
   * The email of the admin who initiated the takeout.
   */
  email?: string;
  /**
   * The takeout request ID.
   */
  takeoutRequestId?: string;
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
 * Details of a message in phishing spike alert.
 */
export interface GmailMessageInfo {
  /**
   * The `SHA256` hash of email's attachment and all MIME parts.
   */
  attachmentsSha256Hash?: string[];
  /**
   * The date of the event related to this email.
   */
  date?: Date;
  /**
   * The hash of the message body text.
   */
  md5HashMessageBody?: string;
  /**
   * The MD5 Hash of email's subject (only available for reported emails).
   */
  md5HashSubject?: string;
  /**
   * The snippet of the message body text (only available for reported emails).
   */
  messageBodySnippet?: string;
  /**
   * The message ID.
   */
  messageId?: string;
  /**
   * The recipient of this email.
   */
  recipient?: string;
  /**
   * The email subject text (only available for reported emails).
   */
  subjectText?: string;
}

function serializeGmailMessageInfo(data: any): GmailMessageInfo {
  return {
    ...data,
    date: data["date"] !== undefined ? data["date"].toISOString() : undefined,
  };
}

function deserializeGmailMessageInfo(data: any): GmailMessageInfo {
  return {
    ...data,
    date: data["date"] !== undefined ? new Date(data["date"]) : undefined,
  };
}

/**
 * An incident reported by Google Operations for a Google Workspace
 * application.
 */
export interface GoogleOperations {
  /**
   * The list of emails which correspond to the users directly affected by the
   * incident.
   */
  affectedUserEmails?: string[];
  /**
   * Optional. Application-specific data for an incident, provided when the
   * Google Workspace application which reported the incident cannot be
   * completely restored to a valid state.
   */
  attachmentData?: Attachment;
  /**
   * A detailed, freeform incident description.
   */
  description?: string;
  /**
   * Customer domain for email template personalization.
   */
  domain?: string;
  /**
   * A header to display above the incident message. Typically used to attach a
   * localized notice on the timeline for followup comms translations.
   */
  header?: string;
  /**
   * A one-line incident description.
   */
  title?: string;
}

/**
 * Response message for an alert feedback listing request.
 */
export interface ListAlertFeedbackResponse {
  /**
   * The list of alert feedback. Feedback entries for each alert are ordered by
   * creation time descending.
   */
  feedback?: AlertFeedback[];
}

function serializeListAlertFeedbackResponse(data: any): ListAlertFeedbackResponse {
  return {
    ...data,
    feedback: data["feedback"] !== undefined ? data["feedback"].map((item: any) => (serializeAlertFeedback(item))) : undefined,
  };
}

function deserializeListAlertFeedbackResponse(data: any): ListAlertFeedbackResponse {
  return {
    ...data,
    feedback: data["feedback"] !== undefined ? data["feedback"].map((item: any) => (deserializeAlertFeedback(item))) : undefined,
  };
}

/**
 * Response message for an alert listing request.
 */
export interface ListAlertsResponse {
  /**
   * The list of alerts.
   */
  alerts?: Alert[];
  /**
   * The token for the next page. If not empty, indicates that there may be
   * more alerts that match the listing request; this value can be used in a
   * subsequent ListAlertsRequest to get alerts continuing from last result of
   * the current list call.
   */
  nextPageToken?: string;
}

function serializeListAlertsResponse(data: any): ListAlertsResponse {
  return {
    ...data,
    alerts: data["alerts"] !== undefined ? data["alerts"].map((item: any) => (serializeAlert(item))) : undefined,
  };
}

function deserializeListAlertsResponse(data: any): ListAlertsResponse {
  return {
    ...data,
    alerts: data["alerts"] !== undefined ? data["alerts"].map((item: any) => (deserializeAlert(item))) : undefined,
  };
}

/**
 * The details of the login action.
 */
export interface LoginDetails {
  /**
   * Optional. The human-readable IP address (for example, `11.22.33.44`) that
   * is associated with the warning event.
   */
  ipAddress?: string;
  /**
   * Optional. The successful login time that is associated with the warning
   * event. This isn't present for blocked login attempts.
   */
  loginTime?: Date;
}

function serializeLoginDetails(data: any): LoginDetails {
  return {
    ...data,
    loginTime: data["loginTime"] !== undefined ? data["loginTime"].toISOString() : undefined,
  };
}

function deserializeLoginDetails(data: any): LoginDetails {
  return {
    ...data,
    loginTime: data["loginTime"] !== undefined ? new Date(data["loginTime"]) : undefined,
  };
}

/**
 * Proto for all phishing alerts with common payload. Supported types are any
 * of the following: * User reported phishing * User reported spam spike *
 * Suspicious message reported * Phishing reclassification * Malware
 * reclassification * Gmail potential employee spoofing
 */
export interface MailPhishing {
  /**
   * The domain ID.
   */
  domainId?: DomainId;
  /**
   * If `true`, the email originated from within the organization.
   */
  isInternal?: boolean;
  /**
   * The entity whose actions triggered a Gmail phishing alert.
   */
  maliciousEntity?: MaliciousEntity;
  /**
   * The list of messages contained by this alert.
   */
  messages?: GmailMessageInfo[];
  /**
   * System actions on the messages.
   */
  systemActionType?:  | "SYSTEM_ACTION_TYPE_UNSPECIFIED" | "NO_OPERATION" | "REMOVED_FROM_INBOX";
}

function serializeMailPhishing(data: any): MailPhishing {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (serializeGmailMessageInfo(item))) : undefined,
  };
}

function deserializeMailPhishing(data: any): MailPhishing {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (deserializeGmailMessageInfo(item))) : undefined,
  };
}

/**
 * Entity whose actions triggered a Gmail phishing alert.
 */
export interface MaliciousEntity {
  /**
   * The header from display name.
   */
  displayName?: string;
  /**
   * The actor who triggered a gmail phishing alert.
   */
  entity?: User;
  /**
   * The sender email address.
   */
  fromHeader?: string;
}

/**
 * Alert Created by the MSA team for communications necessary for continued use
 * of Google Workspace Products.
 */
export interface MandatoryServiceAnnouncement {
  /**
   * Detailed, freeform text describing the announcement
   */
  description?: string;
  /**
   * One line summary of the announcement
   */
  title?: string;
}

/**
 * Proto that contains match information from the condition part of the rule.
 */
export interface MatchInfo {
  /**
   * For matched detector predefined by Google.
   */
  predefinedDetector?: PredefinedDetectorInfo;
  /**
   * For matched detector defined by administrators.
   */
  userDefinedDetector?: UserDefinedDetectorInfo;
}

/**
 * New alert tracking numbers.
 */
export interface MergeInfo {
  /**
   * Optional. New alert ID. Reference the [google.apps.alertcenter.Alert] with
   * this ID for the current state.
   */
  newAlertId?: string;
  /**
   * The new tracking ID from the parent incident.
   */
  newIncidentTrackingId?: string;
}

/**
 * Settings for callback notifications. For more details see [Google Workspace
 * Alert
 * Notification](https://developers.google.com/admin-sdk/alertcenter/guides/notifications).
 */
export interface Notification {
  /**
   * A Google Cloud Pub/sub topic destination.
   */
  cloudPubsubTopic?: CloudPubsubTopic;
}

/**
 * Alert for a spike in user reported phishing. *Warning*: This type has been
 * deprecated. Use
 * [MailPhishing](/admin-sdk/alertcenter/reference/rest/v1beta1/MailPhishing)
 * instead.
 */
export interface PhishingSpike {
  /**
   * The domain ID.
   */
  domainId?: DomainId;
  /**
   * If `true`, the email originated from within the organization.
   */
  isInternal?: boolean;
  /**
   * The entity whose actions triggered a Gmail phishing alert.
   */
  maliciousEntity?: MaliciousEntity;
  /**
   * The list of messages contained by this alert.
   */
  messages?: GmailMessageInfo[];
}

function serializePhishingSpike(data: any): PhishingSpike {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (serializeGmailMessageInfo(item))) : undefined,
  };
}

function deserializePhishingSpike(data: any): PhishingSpike {
  return {
    ...data,
    messages: data["messages"] !== undefined ? data["messages"].map((item: any) => (deserializeGmailMessageInfo(item))) : undefined,
  };
}

/**
 * Detector provided by Google.
 */
export interface PredefinedDetectorInfo {
  /**
   * Name that uniquely identifies the detector.
   */
  detectorName?: string;
}

/**
 * Event occurred when primary admin changed in customer's account. The event
 * are being received from insight forwarder
 */
export interface PrimaryAdminChangedEvent {
  /**
   * domain in which actioned occurred
   */
  domain?: string;
  /**
   * Email of person who was the primary admin before the action
   */
  previousAdminEmail?: string;
  /**
   * Email of person who is the primary admin after the action
   */
  updatedAdminEmail?: string;
}

/**
 * Alerts from Reporting Rules configured by Admin.
 */
export interface ReportingRule {
  /**
   * Any other associated alert details, for example, AlertConfiguration.
   */
  alertDetails?: Uint8Array;
  /**
   * Rule name
   */
  name?: string;
  /**
   * Alert Rule query Sample Query query { condition { filter {
   * expected_application_id: 777491262838 expected_event_name:
   * "indexable_content_change" filter_op: IN } } conjunction_operator: OR }
   */
  query?: Uint8Array;
}

function serializeReportingRule(data: any): ReportingRule {
  return {
    ...data,
    alertDetails: data["alertDetails"] !== undefined ? encodeBase64(data["alertDetails"]) : undefined,
    query: data["query"] !== undefined ? encodeBase64(data["query"]) : undefined,
  };
}

function deserializeReportingRule(data: any): ReportingRule {
  return {
    ...data,
    alertDetails: data["alertDetails"] !== undefined ? decodeBase64(data["alertDetails"] as string) : undefined,
    query: data["query"] !== undefined ? decodeBase64(data["query"] as string) : undefined,
  };
}

/**
 * Requests for one application that needs default SQL setup.
 */
export interface RequestInfo {
  /**
   * List of app developers who triggered notifications for above application.
   */
  appDeveloperEmail?: string[];
  /**
   * Required. The application that requires the SQL setup.
   */
  appKey?: string;
  /**
   * Required. Number of requests sent for this application to set up default
   * SQL instance.
   */
  numberOfRequests?: bigint;
}

function serializeRequestInfo(data: any): RequestInfo {
  return {
    ...data,
    numberOfRequests: data["numberOfRequests"] !== undefined ? String(data["numberOfRequests"]) : undefined,
  };
}

function deserializeRequestInfo(data: any): RequestInfo {
  return {
    ...data,
    numberOfRequests: data["numberOfRequests"] !== undefined ? BigInt(data["numberOfRequests"]) : undefined,
  };
}

/**
 * Proto that contains resource information.
 */
export interface ResourceInfo {
  /**
   * Drive file ID.
   */
  documentId?: string;
  /**
   * Title of the resource, for example email subject, or document title.
   */
  resourceTitle?: string;
}

/**
 * Proto that contains rule information.
 */
export interface RuleInfo {
  /**
   * User provided name of the rule.
   */
  displayName?: string;
  /**
   * Resource name that uniquely identifies the rule.
   */
  resourceName?: string;
}

/**
 * Common alert information about violated rules that are configured by Google
 * Workspace administrators.
 */
export interface RuleViolationInfo {
  /**
   * Source of the data.
   */
  dataSource?:  | "DATA_SOURCE_UNSPECIFIED" | "DRIVE";
  /**
   * List of matches that were found in the resource content.
   */
  matchInfo?: MatchInfo[];
  /**
   * Resource recipients. For Drive, they are grantees that the Drive file was
   * shared with at the time of rule triggering. Valid values include user
   * emails, group emails, domains, or 'anyone' if the file was publicly
   * accessible. If the file was private the recipients list will be empty. For
   * Gmail, they are emails of the users or groups that the Gmail message was
   * sent to.
   */
  recipients?: string[];
  /**
   * Details of the resource which violated the rule.
   */
  resourceInfo?: ResourceInfo;
  /**
   * Details of the violated rule.
   */
  ruleInfo?: RuleInfo;
  /**
   * Actions suppressed due to other actions with higher priority.
   */
  suppressedActionTypes?:  | "ACTION_TYPE_UNSPECIFIED" | "DRIVE_BLOCK_EXTERNAL_SHARING" | "DRIVE_WARN_ON_EXTERNAL_SHARING" | "DELETE_WEBPROTECT_EVIDENCE" | "ALERT" | "RULE_ACTIVATE" | "RULE_DEACTIVATE"[];
  /**
   * Trigger of the rule.
   */
  trigger?:  | "TRIGGER_UNSPECIFIED" | "DRIVE_SHARE";
  /**
   * Metadata related to the triggered actions.
   */
  triggeredActionInfo?: ActionInfo[];
  /**
   * Actions applied as a consequence of the rule being triggered.
   */
  triggeredActionTypes?:  | "ACTION_TYPE_UNSPECIFIED" | "DRIVE_BLOCK_EXTERNAL_SHARING" | "DRIVE_WARN_ON_EXTERNAL_SHARING" | "DELETE_WEBPROTECT_EVIDENCE" | "ALERT" | "RULE_ACTIVATE" | "RULE_DEACTIVATE"[];
  /**
   * Email of the user who caused the violation. Value could be empty if not
   * applicable, for example, a violation found by drive continuous scan.
   */
  triggeringUserEmail?: string;
}

/**
 * Alert that is triggered when Sensitive Admin Action occur in customer
 * account.
 */
export interface SensitiveAdminAction {
  /**
   * Email of person who performed the action
   */
  actorEmail?: string;
  /**
   * The time at which event occurred
   */
  eventTime?: Date;
  /**
   * Event occurred when primary admin changed in customer's account
   */
  primaryAdminChangedEvent?: PrimaryAdminChangedEvent;
  /**
   * Event occurred when SSO Profile created in customer's account
   */
  ssoProfileCreatedEvent?: SSOProfileCreatedEvent;
  /**
   * Event occurred when SSO Profile deleted in customer's account
   */
  ssoProfileDeletedEvent?: SSOProfileDeletedEvent;
  /**
   * Event occurred when SSO Profile updated in customer's account
   */
  ssoProfileUpdatedEvent?: SSOProfileUpdatedEvent;
  /**
   * Event occurred when password was reset for super admin in customer's
   * account
   */
  superAdminPasswordResetEvent?: SuperAdminPasswordResetEvent;
}

function serializeSensitiveAdminAction(data: any): SensitiveAdminAction {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeSensitiveAdminAction(data: any): SensitiveAdminAction {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * Customer-level settings.
 */
export interface Settings {
  /**
   * The list of notifications.
   */
  notifications?: Notification[];
}

/**
 * Event occurred when SSO Profile created in customer's account. The event are
 * being received from insight forwarder
 */
export interface SSOProfileCreatedEvent {
  /**
   * sso profile name which got created
   */
  inboundSsoProfileName?: string;
}

/**
 * Event occurred when SSO Profile deleted in customer's account. The event are
 * being received from insight forwarder
 */
export interface SSOProfileDeletedEvent {
  /**
   * sso profile name which got deleted
   */
  inboundSsoProfileName?: string;
}

/**
 * Event occurred when SSO Profile updated in customer's account. The event are
 * being received from insight forwarder
 */
export interface SSOProfileUpdatedEvent {
  /**
   * changes made to sso profile
   */
  inboundSsoProfileChanges?: string;
  /**
   * sso profile name which got updated
   */
  inboundSsoProfileName?: string;
}

/**
 * A state-sponsored attack alert. Derived from audit logs.
 */
export interface StateSponsoredAttack {
  /**
   * The email of the user this incident was created for.
   */
  email?: string;
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
 * Event occurred when password was reset for super admin in customer's
 * account. The event are being received from insight forwarder
 */
export interface SuperAdminPasswordResetEvent {
  /**
   * email of person whose password was reset
   */
  userEmail?: string;
}

/**
 * A mobile suspicious activity alert. Derived from audit logs.
 */
export interface SuspiciousActivity {
  /**
   * The email of the user this alert was created for.
   */
  email?: string;
  /**
   * Required. The list of security events.
   */
  events?: SuspiciousActivitySecurityDetail[];
}

/**
 * Detailed information of a single MDM suspicious activity event.
 */
export interface SuspiciousActivitySecurityDetail {
  /**
   * Required. The device ID.
   */
  deviceId?: string;
  /**
   * The model of the device.
   */
  deviceModel?: string;
  /**
   * The device property which was changed.
   */
  deviceProperty?: string;
  /**
   * The type of the device.
   */
  deviceType?: string;
  /**
   * Required for iOS, empty for others.
   */
  iosVendorId?: string;
  /**
   * The new value of the device property after the change.
   */
  newValue?: string;
  /**
   * The old value of the device property before the change.
   */
  oldValue?: string;
  /**
   * The device resource ID.
   */
  resourceId?: string;
  /**
   * The serial number of the device.
   */
  serialNumber?: string;
}

/**
 * Details for an invalid transfer or forward.
 */
export interface TransferError {
  /**
   * User's email address. This may be unavailable if the entity was deleted.
   */
  email?: string;
  /**
   * Type of entity being transferred to. For ring group members, this should
   * always be USER.
   */
  entityType?:  | "TRANSFER_ENTITY_TYPE_UNSPECIFIED" | "TRANSFER_AUTO_ATTENDANT" | "TRANSFER_RING_GROUP" | "TRANSFER_USER";
  /**
   * Ring group or auto attendant ID. Not set for users.
   */
  id?: string;
  /**
   * Reason for the error.
   */
  invalidReason?:  | "TRANSFER_INVALID_REASON_UNSPECIFIED" | "TRANSFER_TARGET_DELETED" | "UNLICENSED" | "SUSPENDED" | "NO_PHONE_NUMBER";
  /**
   * User's full name, or the ring group / auto attendant name. This may be
   * unavailable if the entity was deleted.
   */
  name?: string;
}

/**
 * Error related to transferring or forwarding a phone call.
 */
export interface TransferMisconfiguration {
  /**
   * Details for each invalid transfer or forward.
   */
  errors?: TransferError[];
}

/**
 * A request to undelete a specific alert that was marked for deletion.
 */
export interface UndeleteAlertRequest {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert is associated with. The `customer_id` must have the
   * initial "C" stripped (for example, `046psxkn`). Inferred from the caller
   * identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * A user.
 */
export interface User {
  /**
   * Display name of the user.
   */
  displayName?: string;
  /**
   * Email address of the user.
   */
  emailAddress?: string;
}

/**
 * Alerts from UserChanges bucket Rules for predefined rules which contain the
 * below rules. Suspended user made active New user Added User suspended (by
 * admin) User granted admin privileges User admin privileges revoked User
 * deleted Users password changed
 */
export interface UserChanges {
  /**
   * Rule name
   */
  name?: string;
}

/**
 * Detector defined by administrators.
 */
export interface UserDefinedDetectorInfo {
  /**
   * Display name of the detector.
   */
  displayName?: string;
  /**
   * Resource name that uniquely identifies the detector.
   */
  resourceName?: string;
}

/**
 * Additional options for AlertCenter#v1beta1GetSettings.
 */
export interface V1beta1GetSettingsOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert settings are associated with. The `customer_id` must/
   * have the initial "C" stripped (for example, `046psxkn`). Inferred from the
   * caller identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Additional options for AlertCenter#v1beta1UpdateSettings.
 */
export interface V1beta1UpdateSettingsOptions {
  /**
   * Optional. The unique identifier of the Google Workspace account of the
   * customer the alert settings are associated with. The `customer_id` must
   * have the initial "C" stripped (for example, `046psxkn`). Inferred from the
   * caller identity if not provided. [Find your customer
   * ID](https://support.google.com/cloudidentity/answer/10070793).
   */
  customerId?: string;
}

/**
 * Issue(s) with sending to voicemail.
 */
export interface VoicemailMisconfiguration {
  /**
   * Issue(s) with voicemail recipients.
   */
  errors?: VoicemailRecipientError[];
}

/**
 * Issue(s) with a voicemail recipient.
 */
export interface VoicemailRecipientError {
  /**
   * Email address of the invalid recipient. This may be unavailable if the
   * recipient was deleted.
   */
  email?: string;
  /**
   * Reason for the error.
   */
  invalidReason?:  | "EMAIL_INVALID_REASON_UNSPECIFIED" | "OUT_OF_QUOTA" | "RECIPIENT_DELETED";
}

/**
 * An alert triggered when Google Voice configuration becomes invalid,
 * generally due to an external entity being modified or deleted.
 */
export interface VoiceMisconfiguration {
  /**
   * Name of the entity whose configuration is now invalid.
   */
  entityName?: string;
  /**
   * Type of the entity whose configuration is now invalid.
   */
  entityType?:  | "ENTITY_TYPE_UNSPECIFIED" | "AUTO_ATTENDANT" | "RING_GROUP";
  /**
   * Link that the admin can follow to fix the issue.
   */
  fixUri?: string;
  /**
   * Issue(s) with members of a ring group.
   */
  membersMisconfiguration?: TransferMisconfiguration;
  /**
   * Issue(s) with transferring or forwarding to an external entity.
   */
  transferMisconfiguration?: TransferMisconfiguration;
  /**
   * Issue(s) with sending to voicemail.
   */
  voicemailMisconfiguration?: VoicemailMisconfiguration;
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
