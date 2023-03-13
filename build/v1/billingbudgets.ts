// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Billing Budget API Client for Deno
 * ========================================
 * 
 * The Cloud Billing Budget API stores Cloud Billing budgets, which define a budget plan and the rules to execute as spend is tracked against that plan.
 * 
 * Docs: https://cloud.google.com/billing/docs/how-to/budget-api-overview
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Cloud Billing Budget API stores Cloud Billing budgets, which define a
 * budget plan and the rules to execute as spend is tracked against that plan.
 */
export class BillingBudgets {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://billingbudgets.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new budget. See [Quotas and
   * limits](https://cloud.google.com/billing/quotas) for more information on
   * the limits of the number of budgets you can create.
   *
   * @param parent Required. The name of the billing account to create the budget in. Values are of the form `billingAccounts/{billingAccountId}`.
   */
  async billingAccountsBudgetsCreate(parent: string, req: GoogleCloudBillingBudgetsV1Budget): Promise<GoogleCloudBillingBudgetsV1Budget> {
    req = serializeGoogleCloudBillingBudgetsV1Budget(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/budgets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudBillingBudgetsV1Budget(data);
  }

  /**
   * Deletes a budget. Returns successfully if already deleted.
   *
   * @param name Required. Name of the budget to delete. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
   */
  async billingAccountsBudgetsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Returns a budget. WARNING: There are some fields exposed on the Google
   * Cloud Console that aren't available on this API. When reading from the API,
   * you will not see these fields in the return value, though they may have
   * been set in the Cloud Console.
   *
   * @param name Required. Name of budget to get. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
   */
  async billingAccountsBudgetsGet(name: string): Promise<GoogleCloudBillingBudgetsV1Budget> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudBillingBudgetsV1Budget(data);
  }

  /**
   * Returns a list of budgets for a billing account. WARNING: There are some
   * fields exposed on the Google Cloud Console that aren't available on this
   * API. When reading from the API, you will not see these fields in the return
   * value, though they may have been set in the Cloud Console.
   *
   * @param parent Required. Name of billing account to list budgets under. Values are of the form `billingAccounts/{billingAccountId}`.
   */
  async billingAccountsBudgetsList(parent: string, opts: BillingAccountsBudgetsListOptions = {}): Promise<GoogleCloudBillingBudgetsV1ListBudgetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/budgets`);
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
    return deserializeGoogleCloudBillingBudgetsV1ListBudgetsResponse(data);
  }

  /**
   * Updates a budget and returns the updated budget. WARNING: There are some
   * fields exposed on the Google Cloud Console that aren't available on this
   * API. Budget fields that are not exposed in this API will not be changed by
   * this method.
   *
   * @param name Output only. Resource name of the budget. The resource name implies the scope of a budget. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
   */
  async billingAccountsBudgetsPatch(name: string, req: GoogleCloudBillingBudgetsV1Budget, opts: BillingAccountsBudgetsPatchOptions = {}): Promise<GoogleCloudBillingBudgetsV1Budget> {
    req = serializeGoogleCloudBillingBudgetsV1Budget(req);
    opts = serializeBillingAccountsBudgetsPatchOptions(opts);
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
    return deserializeGoogleCloudBillingBudgetsV1Budget(data);
  }
}

/**
 * Additional options for BillingBudgets#billingAccountsBudgetsList.
 */
export interface BillingAccountsBudgetsListOptions {
  /**
   * Optional. The maximum number of budgets to return per page. The default
   * and maximum value are 100.
   */
  pageSize?: number;
  /**
   * Optional. The value returned by the last `ListBudgetsResponse` which
   * indicates that this is a continuation of a prior `ListBudgets` call, and
   * that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for BillingBudgets#billingAccountsBudgetsPatch.
 */
export interface BillingAccountsBudgetsPatchOptions {
  /**
   * Optional. Indicates which fields in the provided budget to update.
   * Read-only fields (such as `name`) cannot be changed. If this is not
   * provided, then only fields with non-default values from the request are
   * updated. See
   * https://developers.google.com/protocol-buffers/docs/proto3#default for more
   * details about default values.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsBudgetsPatchOptions(data: any): BillingAccountsBudgetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsBudgetsPatchOptions(data: any): BillingAccountsBudgetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A budget is a plan that describes what you expect to spend on Cloud
 * projects, plus the rules to execute as spend is tracked against that plan,
 * (for example, send an alert when 90% of the target spend is met). The budget
 * time period is configurable, with options such as month (default), quarter,
 * year, or custom time period.
 */
export interface GoogleCloudBillingBudgetsV1Budget {
  /**
   * Required. Budgeted amount.
   */
  amount?: GoogleCloudBillingBudgetsV1BudgetAmount;
  /**
   * Optional. Filters that define which resources are used to compute the
   * actual spend against the budget amount, such as projects, services, and the
   * budget's time period, as well as other filters.
   */
  budgetFilter?: GoogleCloudBillingBudgetsV1Filter;
  /**
   * User data for display name in UI. The name must be less than or equal to
   * 60 characters.
   */
  displayName?: string;
  /**
   * Optional. Etag to validate that the object is unchanged for a
   * read-modify-write operation. An empty etag causes an update to overwrite
   * other changes.
   */
  etag?: string;
  /**
   * Output only. Resource name of the budget. The resource name implies the
   * scope of a budget. Values are of the form
   * `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
   */
  readonly name?: string;
  /**
   * Optional. Rules to apply to notifications sent based on budget spend and
   * thresholds.
   */
  notificationsRule?: GoogleCloudBillingBudgetsV1NotificationsRule;
  /**
   * Optional. Rules that trigger alerts (notifications of thresholds being
   * crossed) when spend exceeds the specified percentages of the budget.
   * Optional for `pubsubTopic` notifications. Required if using email
   * notifications.
   */
  thresholdRules?: GoogleCloudBillingBudgetsV1ThresholdRule[];
}

function serializeGoogleCloudBillingBudgetsV1Budget(data: any): GoogleCloudBillingBudgetsV1Budget {
  return {
    ...data,
    amount: data["amount"] !== undefined ? serializeGoogleCloudBillingBudgetsV1BudgetAmount(data["amount"]) : undefined,
  };
}

function deserializeGoogleCloudBillingBudgetsV1Budget(data: any): GoogleCloudBillingBudgetsV1Budget {
  return {
    ...data,
    amount: data["amount"] !== undefined ? deserializeGoogleCloudBillingBudgetsV1BudgetAmount(data["amount"]) : undefined,
  };
}

/**
 * The budgeted amount for each usage period.
 */
export interface GoogleCloudBillingBudgetsV1BudgetAmount {
  /**
   * Use the last period's actual spend as the budget for the present period.
   * LastPeriodAmount can only be set when the budget's time period is a
   * Filter.calendar_period. It cannot be set in combination with
   * Filter.custom_period.
   */
  lastPeriodAmount?: GoogleCloudBillingBudgetsV1LastPeriodAmount;
  /**
   * A specified amount to use as the budget. `currency_code` is optional. If
   * specified when creating a budget, it must match the currency of the billing
   * account. If specified when updating a budget, it must match the
   * currency_code of the existing budget. The `currency_code` is provided on
   * output.
   */
  specifiedAmount?: GoogleTypeMoney;
}

function serializeGoogleCloudBillingBudgetsV1BudgetAmount(data: any): GoogleCloudBillingBudgetsV1BudgetAmount {
  return {
    ...data,
    specifiedAmount: data["specifiedAmount"] !== undefined ? serializeGoogleTypeMoney(data["specifiedAmount"]) : undefined,
  };
}

function deserializeGoogleCloudBillingBudgetsV1BudgetAmount(data: any): GoogleCloudBillingBudgetsV1BudgetAmount {
  return {
    ...data,
    specifiedAmount: data["specifiedAmount"] !== undefined ? deserializeGoogleTypeMoney(data["specifiedAmount"]) : undefined,
  };
}

/**
 * All date times begin at 12 AM US and Canadian Pacific Time (UTC-8).
 */
export interface GoogleCloudBillingBudgetsV1CustomPeriod {
  /**
   * Optional. The end date of the time period. Budgets with elapsed end date
   * won't be processed. If unset, specifies to track all usage incurred since
   * the start_date.
   */
  endDate?: GoogleTypeDate;
  /**
   * Required. The start date must be after January 1, 2017.
   */
  startDate?: GoogleTypeDate;
}

/**
 * A filter for a budget, limiting the scope of the cost to calculate.
 */
export interface GoogleCloudBillingBudgetsV1Filter {
  /**
   * Optional. Specifies to track usage for recurring calendar period. For
   * example, assume that CalendarPeriod.QUARTER is set. The budget tracks usage
   * from April 1 to June 30, when the current calendar month is April, May,
   * June. After that, it tracks usage from July 1 to September 30 when the
   * current calendar month is July, August, September, so on.
   */
  calendarPeriod?:  | "CALENDAR_PERIOD_UNSPECIFIED" | "MONTH" | "QUARTER" | "YEAR";
  /**
   * Optional. If Filter.credit_types_treatment is INCLUDE_SPECIFIED_CREDITS,
   * this is a list of credit types to be subtracted from gross cost to
   * determine the spend for threshold calculations. See [a list of acceptable
   * credit type
   * values](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables#credits-type).
   * If Filter.credit_types_treatment is **not** INCLUDE_SPECIFIED_CREDITS, this
   * field must be empty.
   */
  creditTypes?: string[];
  /**
   * Optional. If not set, default behavior is `INCLUDE_ALL_CREDITS`.
   */
  creditTypesTreatment?:  | "CREDIT_TYPES_TREATMENT_UNSPECIFIED" | "INCLUDE_ALL_CREDITS" | "EXCLUDE_ALL_CREDITS" | "INCLUDE_SPECIFIED_CREDITS";
  /**
   * Optional. Specifies to track usage from any start date (required) to any
   * end date (optional). This time period is static, it does not recur.
   */
  customPeriod?: GoogleCloudBillingBudgetsV1CustomPeriod;
  /**
   * Optional. A single label and value pair specifying that usage from only
   * this set of labeled resources should be included in the budget. If omitted,
   * the report includes all labeled and unlabeled usage. An object containing a
   * single `"key": value` pair. Example: `{ "name": "wrench" }`. _Currently,
   * multiple entries or multiple values per entry are not allowed._
   */
  labels?: {
    [key: string]: any[]
  };
  /**
   * Optional. A set of projects of the form `projects/{project}`, specifying
   * that usage from only this set of projects should be included in the budget.
   * If omitted, the report includes all usage for the billing account,
   * regardless of which project the usage occurred on.
   */
  projects?: string[];
  /**
   * Optional. A set of services of the form `services/{service_id}`,
   * specifying that usage from only this set of services should be included in
   * the budget. If omitted, the report includes usage for all the services. The
   * service names are available through the Catalog API:
   * https://cloud.google.com/billing/v1/how-tos/catalog-api.
   */
  services?: string[];
  /**
   * Optional. A set of subaccounts of the form `billingAccounts/{account_id}`,
   * specifying that usage from only this set of subaccounts should be included
   * in the budget. If a subaccount is set to the name of the parent account,
   * usage from the parent account is included. If the field is omitted, the
   * report includes usage from the parent account and all subaccounts, if they
   * exist.
   */
  subaccounts?: string[];
}

/**
 * Describes a budget amount targeted to the last Filter.calendar_period spend.
 * At this time, the amount is automatically 100% of the last calendar period's
 * spend; that is, there are no other options yet. LastPeriodAmount cannot be
 * set for a budget configured with a Filter.custom_period.
 */
export interface GoogleCloudBillingBudgetsV1LastPeriodAmount {
}

/**
 * Response for ListBudgets
 */
export interface GoogleCloudBillingBudgetsV1ListBudgetsResponse {
  /**
   * List of the budgets owned by the requested billing account.
   */
  budgets?: GoogleCloudBillingBudgetsV1Budget[];
  /**
   * If not empty, indicates that there may be more budgets that match the
   * request; this value should be passed in a new `ListBudgetsRequest`.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudBillingBudgetsV1ListBudgetsResponse(data: any): GoogleCloudBillingBudgetsV1ListBudgetsResponse {
  return {
    ...data,
    budgets: data["budgets"] !== undefined ? data["budgets"].map((item: any) => (serializeGoogleCloudBillingBudgetsV1Budget(item))) : undefined,
  };
}

function deserializeGoogleCloudBillingBudgetsV1ListBudgetsResponse(data: any): GoogleCloudBillingBudgetsV1ListBudgetsResponse {
  return {
    ...data,
    budgets: data["budgets"] !== undefined ? data["budgets"].map((item: any) => (deserializeGoogleCloudBillingBudgetsV1Budget(item))) : undefined,
  };
}

/**
 * NotificationsRule defines notifications that are sent based on budget spend
 * and thresholds.
 */
export interface GoogleCloudBillingBudgetsV1NotificationsRule {
  /**
   * Optional. When set to true, disables default notifications sent when a
   * threshold is exceeded. Default notifications are sent to those with Billing
   * Account Administrator and Billing Account User IAM roles for the target
   * account.
   */
  disableDefaultIamRecipients?: boolean;
  /**
   * Optional. Email targets to send notifications to when a threshold is
   * exceeded. This is in addition to the `DefaultIamRecipients` who receive
   * alert emails based on their billing account IAM role. The value is the full
   * REST resource name of a Cloud Monitoring email notification channel with
   * the form `projects/{project_id}/notificationChannels/{channel_id}`. A
   * maximum of 5 email notifications are allowed. To customize budget alert
   * email recipients with monitoring notification channels, you _must create
   * the monitoring notification channels before you link them to a budget_. For
   * guidance on setting up notification channels to use with budgets, see
   * [Customize budget alert email
   * recipients](https://cloud.google.com/billing/docs/how-to/budgets-notification-recipients).
   * For Cloud Billing budget alerts, you _must use email notification
   * channels_. The other types of notification channels are _not_ supported,
   * such as Slack, SMS, or PagerDuty. If you want to [send budget notifications
   * to
   * Slack](https://cloud.google.com/billing/docs/how-to/notify#send_notifications_to_slack),
   * use a pubsubTopic and configure [programmatic
   * notifications](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications).
   */
  monitoringNotificationChannels?: string[];
  /**
   * Optional. The name of the Pub/Sub topic where budget-related messages are
   * published, in the form `projects/{project_id}/topics/{topic_id}`. Updates
   * are sent to the topic at regular intervals; the timing of the updates is
   * not dependent on the [threshold rules](#thresholdrule) you've set. Note
   * that if you want your [Pub/Sub JSON
   * object](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification_format)
   * to contain data for `alertThresholdExceeded`, you need at least one [alert
   * threshold rule](#thresholdrule). When you set threshold rules, you must
   * also enable at least one of the email notification options, either using
   * the default IAM recipients or Cloud Monitoring email notification channels.
   * To use Pub/Sub topics with budgets, you must do the following: 1. Create
   * the Pub/Sub topic before connecting it to your budget. For guidance, see
   * [Manage programmatic budget alert
   * notifications](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications).
   * 2. Grant the API caller the `pubsub.topics.setIamPolicy` permission on the
   * Pub/Sub topic. If not set, the API call fails with PERMISSION_DENIED. For
   * additional details on Pub/Sub roles and permissions, see [Permissions
   * required for this
   * task](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#permissions_required_for_this_task).
   */
  pubsubTopic?: string;
  /**
   * Optional. Required when NotificationsRule.pubsub_topic is set. The schema
   * version of the notification sent to NotificationsRule.pubsub_topic. Only
   * "1.0" is accepted. It represents the JSON schema as defined in
   * https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification_format.
   */
  schemaVersion?: string;
}

/**
 * ThresholdRule contains the definition of a threshold. Threshold rules define
 * the triggering events used to generate a budget notification email. When a
 * threshold is crossed (spend exceeds the specified percentages of the budget),
 * budget alert emails are sent to the email recipients you specify in the
 * [NotificationsRule](#notificationsrule). Threshold rules also affect the
 * fields included in the [JSON data
 * object](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification_format)
 * sent to a Pub/Sub topic. Threshold rules are _required_ if using email
 * notifications. Threshold rules are _optional_ if only setting a
 * [`pubsubTopic` NotificationsRule](#NotificationsRule), unless you want your
 * JSON data object to include data about the thresholds you set. For more
 * information, see [set budget threshold rules and
 * actions](https://cloud.google.com/billing/docs/how-to/budgets#budget-actions).
 */
export interface GoogleCloudBillingBudgetsV1ThresholdRule {
  /**
   * Optional. The type of basis used to determine if spend has passed the
   * threshold. Behavior defaults to CURRENT_SPEND if not set.
   */
  spendBasis?:  | "BASIS_UNSPECIFIED" | "CURRENT_SPEND" | "FORECASTED_SPEND";
  /**
   * Required. Send an alert when this threshold is exceeded. This is a
   * 1.0-based percentage, so 0.5 = 50%. Validation: non-negative number.
   */
  thresholdPercent?: number;
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
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface GoogleTypeDate {
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
 * Represents an amount of money with its currency type.
 */
export interface GoogleTypeMoney {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode?: string;
  /**
   * Number of nano (10^-9) units of the amount. The value must be between
   * -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos`
   * must be positive or zero. If `units` is zero, `nanos` can be positive,
   * zero, or negative. If `units` is negative, `nanos` must be negative or
   * zero. For example $-1.75 is represented as `units`=-1 and
   * `nanos`=-750,000,000.
   */
  nanos?: number;
  /**
   * The whole units of the amount. For example if `currencyCode` is `"USD"`,
   * then 1 unit is one US dollar.
   */
  units?: bigint;
}

function serializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}