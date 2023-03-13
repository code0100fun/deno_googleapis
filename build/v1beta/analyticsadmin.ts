// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Analytics Admin API Client for Deno
 * ==========================================
 * 
 * 
 * 
 * Docs: http://code.google.com/apis/analytics/docs/mgmt/home.html
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class AnalyticsAdmin {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://analyticsadmin.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Marks target Account as soft-deleted (ie: "trashed") and returns it. This
   * API does not have a method to restore soft-deleted accounts. However, they
   * can be restored using the Trash Can UI. If the accounts are not restored
   * before the expiration time, the account and all child resources (eg:
   * Properties, GoogleAdsLinks, Streams, UserLinks) will be permanently purged.
   * https://support.google.com/analytics/answer/6154772 Returns an error if the
   * target is not found.
   *
   * @param name Required. The name of the Account to soft-delete. Format: accounts/{account} Example: "accounts/100"
   */
  async accountsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lookup for a single Account.
   *
   * @param name Required. The name of the account to lookup. Format: accounts/{account} Example: "accounts/100"
   */
  async accountsGet(name: string): Promise<GoogleAnalyticsAdminV1betaAccount> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaAccount;
  }

  /**
   * Get data sharing settings on an account. Data sharing settings are
   * singletons.
   *
   * @param name Required. The name of the settings to lookup. Format: accounts/{account}/dataSharingSettings Example: "accounts/1000/dataSharingSettings"
   */
  async accountsGetDataSharingSettings(name: string): Promise<GoogleAnalyticsAdminV1betaDataSharingSettings> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaDataSharingSettings;
  }

  /**
   * Returns all accounts accessible by the caller. Note that these accounts
   * might not currently have GA4 properties. Soft-deleted (ie: "trashed")
   * accounts are excluded by default. Returns an empty list if no relevant
   * accounts are found.
   *
   */
  async accountsList(opts: AccountsListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/accounts`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaListAccountsResponse;
  }

  /**
   * Updates an account.
   *
   * @param name Output only. Resource name of this account. Format: accounts/{account} Example: "accounts/100"
   */
  async accountsPatch(name: string, req: GoogleAnalyticsAdminV1betaAccount, opts: AccountsPatchOptions = {}): Promise<GoogleAnalyticsAdminV1betaAccount> {
    opts = serializeAccountsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaAccount;
  }

  /**
   * Requests a ticket for creating an account.
   *
   */
  async accountsProvisionAccountTicket(req: GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest): Promise<GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/accounts:provisionAccountTicket`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse;
  }

  /**
   * Returns a customized report of data access records. The report provides
   * records of each time a user reads Google Analytics reporting data. Access
   * records are retained for up to 2 years. Data Access Reports can be
   * requested for a property. The property must be in Google Analytics 360.
   * This method is only available to Administrators. These data access records
   * include GA4 UI Reporting, GA4 UI Explorations, GA4 Data API, and other
   * products like Firebase & Admob that can retrieve data from Google Analytics
   * through a linkage. These records don't include property configuration
   * changes like adding a stream or changing a property's time zone. For
   * configuration change history, see
   * [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents).
   *
   * @param entity The Data Access Report supports requesting at the property level or account level. If requested at the account level, Data Access Reports include all access for all properties under that account. To request at the property level, entity should be for example 'properties/123' if "123" is your GA4 property ID. To request at the account level, entity should be for example 'accounts/1234' if "1234" is your GA4 Account ID.
   */
  async accountsRunAccessReport(entity: string, req: GoogleAnalyticsAdminV1betaRunAccessReportRequest): Promise<GoogleAnalyticsAdminV1betaRunAccessReportResponse> {
    req = serializeGoogleAnalyticsAdminV1betaRunAccessReportRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ entity }:runAccessReport`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaRunAccessReportResponse;
  }

  /**
   * Searches through all changes to an account or its children given the
   * specified set of filters.
   *
   * @param account Required. The account resource for which to return change history resources.
   */
  async accountsSearchChangeHistoryEvents(account: string, req: GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest): Promise<GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse> {
    req = serializeGoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ account }:searchChangeHistoryEvents`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse(data);
  }

  /**
   * Returns summaries of all accounts accessible by the caller.
   *
   */
  async accountSummariesList(opts: AccountSummariesListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListAccountSummariesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/accountSummaries`);
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
    return data as GoogleAnalyticsAdminV1betaListAccountSummariesResponse;
  }

  /**
   * Acknowledges the terms of user data collection for the specified property.
   * This acknowledgement must be completed (either in the Google Analytics UI
   * or through this API) before MeasurementProtocolSecret resources may be
   * created.
   *
   * @param property Required. The property for which to acknowledge user data collection.
   */
  async propertiesAcknowledgeUserDataCollection(property: string, req: GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest): Promise<GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ property }:acknowledgeUserDataCollection`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse;
  }

  /**
   * Creates a conversion event with the specified attributes.
   *
   * @param parent Required. The resource name of the parent property where this conversion event will be created. Format: properties/123
   */
  async propertiesConversionEventsCreate(parent: string, req: GoogleAnalyticsAdminV1betaConversionEvent): Promise<GoogleAnalyticsAdminV1betaConversionEvent> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/conversionEvents`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaConversionEvent;
  }

  /**
   * Deletes a conversion event in a property.
   *
   * @param name Required. The resource name of the conversion event to delete. Format: properties/{property}/conversionEvents/{conversion_event} Example: "properties/123/conversionEvents/456"
   */
  async propertiesConversionEventsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieve a single conversion event.
   *
   * @param name Required. The resource name of the conversion event to retrieve. Format: properties/{property}/conversionEvents/{conversion_event} Example: "properties/123/conversionEvents/456"
   */
  async propertiesConversionEventsGet(name: string): Promise<GoogleAnalyticsAdminV1betaConversionEvent> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaConversionEvent;
  }

  /**
   * Returns a list of conversion events in the specified parent property.
   * Returns an empty list if no conversion events are found.
   *
   * @param parent Required. The resource name of the parent property. Example: 'properties/123'
   */
  async propertiesConversionEventsList(parent: string, opts: PropertiesConversionEventsListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListConversionEventsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/conversionEvents`);
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
    return data as GoogleAnalyticsAdminV1betaListConversionEventsResponse;
  }

  /**
   * Creates an "GA4" property with the specified location and attributes.
   *
   */
  async propertiesCreate(req: GoogleAnalyticsAdminV1betaProperty): Promise<GoogleAnalyticsAdminV1betaProperty> {
    const url = new URL(`${this.#baseUrl}v1beta/properties`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaProperty;
  }

  /**
   * Archives a CustomDimension on a property.
   *
   * @param name Required. The name of the CustomDimension to archive. Example format: properties/1234/customDimensions/5678
   */
  async propertiesCustomDimensionsArchive(name: string, req: GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:archive`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a CustomDimension.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesCustomDimensionsCreate(parent: string, req: GoogleAnalyticsAdminV1betaCustomDimension): Promise<GoogleAnalyticsAdminV1betaCustomDimension> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/customDimensions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaCustomDimension;
  }

  /**
   * Lookup for a single CustomDimension.
   *
   * @param name Required. The name of the CustomDimension to get. Example format: properties/1234/customDimensions/5678
   */
  async propertiesCustomDimensionsGet(name: string): Promise<GoogleAnalyticsAdminV1betaCustomDimension> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaCustomDimension;
  }

  /**
   * Lists CustomDimensions on a property.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesCustomDimensionsList(parent: string, opts: PropertiesCustomDimensionsListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListCustomDimensionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/customDimensions`);
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
    return data as GoogleAnalyticsAdminV1betaListCustomDimensionsResponse;
  }

  /**
   * Updates a CustomDimension on a property.
   *
   * @param name Output only. Resource name for this CustomDimension resource. Format: properties/{property}/customDimensions/{customDimension}
   */
  async propertiesCustomDimensionsPatch(name: string, req: GoogleAnalyticsAdminV1betaCustomDimension, opts: PropertiesCustomDimensionsPatchOptions = {}): Promise<GoogleAnalyticsAdminV1betaCustomDimension> {
    opts = serializePropertiesCustomDimensionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaCustomDimension;
  }

  /**
   * Archives a CustomMetric on a property.
   *
   * @param name Required. The name of the CustomMetric to archive. Example format: properties/1234/customMetrics/5678
   */
  async propertiesCustomMetricsArchive(name: string, req: GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:archive`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a CustomMetric.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesCustomMetricsCreate(parent: string, req: GoogleAnalyticsAdminV1betaCustomMetric): Promise<GoogleAnalyticsAdminV1betaCustomMetric> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/customMetrics`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaCustomMetric;
  }

  /**
   * Lookup for a single CustomMetric.
   *
   * @param name Required. The name of the CustomMetric to get. Example format: properties/1234/customMetrics/5678
   */
  async propertiesCustomMetricsGet(name: string): Promise<GoogleAnalyticsAdminV1betaCustomMetric> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaCustomMetric;
  }

  /**
   * Lists CustomMetrics on a property.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesCustomMetricsList(parent: string, opts: PropertiesCustomMetricsListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListCustomMetricsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/customMetrics`);
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
    return data as GoogleAnalyticsAdminV1betaListCustomMetricsResponse;
  }

  /**
   * Updates a CustomMetric on a property.
   *
   * @param name Output only. Resource name for this CustomMetric resource. Format: properties/{property}/customMetrics/{customMetric}
   */
  async propertiesCustomMetricsPatch(name: string, req: GoogleAnalyticsAdminV1betaCustomMetric, opts: PropertiesCustomMetricsPatchOptions = {}): Promise<GoogleAnalyticsAdminV1betaCustomMetric> {
    opts = serializePropertiesCustomMetricsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaCustomMetric;
  }

  /**
   * Creates a DataStream.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesDataStreamsCreate(parent: string, req: GoogleAnalyticsAdminV1betaDataStream): Promise<GoogleAnalyticsAdminV1betaDataStream> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/dataStreams`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaDataStream;
  }

  /**
   * Deletes a DataStream on a property.
   *
   * @param name Required. The name of the DataStream to delete. Example format: properties/1234/dataStreams/5678
   */
  async propertiesDataStreamsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lookup for a single DataStream.
   *
   * @param name Required. The name of the DataStream to get. Example format: properties/1234/dataStreams/5678
   */
  async propertiesDataStreamsGet(name: string): Promise<GoogleAnalyticsAdminV1betaDataStream> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaDataStream;
  }

  /**
   * Lists DataStreams on a property.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesDataStreamsList(parent: string, opts: PropertiesDataStreamsListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListDataStreamsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/dataStreams`);
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
    return data as GoogleAnalyticsAdminV1betaListDataStreamsResponse;
  }

  /**
   * Creates a measurement protocol secret.
   *
   * @param parent Required. The parent resource where this secret will be created. Format: properties/{property}/dataStreams/{dataStream}
   */
  async propertiesDataStreamsMeasurementProtocolSecretsCreate(parent: string, req: GoogleAnalyticsAdminV1betaMeasurementProtocolSecret): Promise<GoogleAnalyticsAdminV1betaMeasurementProtocolSecret> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/measurementProtocolSecrets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
  }

  /**
   * Deletes target MeasurementProtocolSecret.
   *
   * @param name Required. The name of the MeasurementProtocolSecret to delete. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret}
   */
  async propertiesDataStreamsMeasurementProtocolSecretsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lookup for a single "GA4" MeasurementProtocolSecret.
   *
   * @param name Required. The name of the measurement protocol secret to lookup. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret}
   */
  async propertiesDataStreamsMeasurementProtocolSecretsGet(name: string): Promise<GoogleAnalyticsAdminV1betaMeasurementProtocolSecret> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
  }

  /**
   * Returns child MeasurementProtocolSecrets under the specified parent
   * Property.
   *
   * @param parent Required. The resource name of the parent stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets
   */
  async propertiesDataStreamsMeasurementProtocolSecretsList(parent: string, opts: PropertiesDataStreamsMeasurementProtocolSecretsListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/measurementProtocolSecrets`);
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
    return data as GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse;
  }

  /**
   * Updates a measurement protocol secret.
   *
   * @param name Output only. Resource name of this secret. This secret may be a child of any type of stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret}
   */
  async propertiesDataStreamsMeasurementProtocolSecretsPatch(name: string, req: GoogleAnalyticsAdminV1betaMeasurementProtocolSecret, opts: PropertiesDataStreamsMeasurementProtocolSecretsPatchOptions = {}): Promise<GoogleAnalyticsAdminV1betaMeasurementProtocolSecret> {
    opts = serializePropertiesDataStreamsMeasurementProtocolSecretsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
  }

  /**
   * Updates a DataStream on a property.
   *
   * @param name Output only. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000"
   */
  async propertiesDataStreamsPatch(name: string, req: GoogleAnalyticsAdminV1betaDataStream, opts: PropertiesDataStreamsPatchOptions = {}): Promise<GoogleAnalyticsAdminV1betaDataStream> {
    opts = serializePropertiesDataStreamsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaDataStream;
  }

  /**
   * Marks target Property as soft-deleted (ie: "trashed") and returns it. This
   * API does not have a method to restore soft-deleted properties. However,
   * they can be restored using the Trash Can UI. If the properties are not
   * restored before the expiration time, the Property and all child resources
   * (eg: GoogleAdsLinks, Streams, UserLinks) will be permanently purged.
   * https://support.google.com/analytics/answer/6154772 Returns an error if the
   * target is not found, or is not a GA4 Property.
   *
   * @param name Required. The name of the Property to soft-delete. Format: properties/{property_id} Example: "properties/1000"
   */
  async propertiesDelete(name: string): Promise<GoogleAnalyticsAdminV1betaProperty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleAnalyticsAdminV1betaProperty;
  }

  /**
   * Creates a FirebaseLink. Properties can have at most one FirebaseLink.
   *
   * @param parent Required. Format: properties/{property_id} Example: properties/1234
   */
  async propertiesFirebaseLinksCreate(parent: string, req: GoogleAnalyticsAdminV1betaFirebaseLink): Promise<GoogleAnalyticsAdminV1betaFirebaseLink> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/firebaseLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaFirebaseLink;
  }

  /**
   * Deletes a FirebaseLink on a property
   *
   * @param name Required. Format: properties/{property_id}/firebaseLinks/{firebase_link_id} Example: properties/1234/firebaseLinks/5678
   */
  async propertiesFirebaseLinksDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lists FirebaseLinks on a property. Properties can have at most one
   * FirebaseLink.
   *
   * @param parent Required. Format: properties/{property_id} Example: properties/1234
   */
  async propertiesFirebaseLinksList(parent: string, opts: PropertiesFirebaseLinksListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListFirebaseLinksResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/firebaseLinks`);
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
    return data as GoogleAnalyticsAdminV1betaListFirebaseLinksResponse;
  }

  /**
   * Lookup for a single "GA4" Property.
   *
   * @param name Required. The name of the property to lookup. Format: properties/{property_id} Example: "properties/1000"
   */
  async propertiesGet(name: string): Promise<GoogleAnalyticsAdminV1betaProperty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaProperty;
  }

  /**
   * Returns the singleton data retention settings for this property.
   *
   * @param name Required. The name of the settings to lookup. Format: properties/{property}/dataRetentionSettings Example: "properties/1000/dataRetentionSettings"
   */
  async propertiesGetDataRetentionSettings(name: string): Promise<GoogleAnalyticsAdminV1betaDataRetentionSettings> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaDataRetentionSettings;
  }

  /**
   * Creates a GoogleAdsLink.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesGoogleAdsLinksCreate(parent: string, req: GoogleAnalyticsAdminV1betaGoogleAdsLink): Promise<GoogleAnalyticsAdminV1betaGoogleAdsLink> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/googleAdsLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaGoogleAdsLink;
  }

  /**
   * Deletes a GoogleAdsLink on a property
   *
   * @param name Required. Example format: properties/1234/googleAdsLinks/5678
   */
  async propertiesGoogleAdsLinksDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Lists GoogleAdsLinks on a property.
   *
   * @param parent Required. Example format: properties/1234
   */
  async propertiesGoogleAdsLinksList(parent: string, opts: PropertiesGoogleAdsLinksListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/googleAdsLinks`);
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
    return data as GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse;
  }

  /**
   * Updates a GoogleAdsLink on a property
   *
   * @param name Output only. Format: properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note: googleAdsLinkId is not the Google Ads customer ID.
   */
  async propertiesGoogleAdsLinksPatch(name: string, req: GoogleAnalyticsAdminV1betaGoogleAdsLink, opts: PropertiesGoogleAdsLinksPatchOptions = {}): Promise<GoogleAnalyticsAdminV1betaGoogleAdsLink> {
    opts = serializePropertiesGoogleAdsLinksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaGoogleAdsLink;
  }

  /**
   * Returns child Properties under the specified parent Account. Only "GA4"
   * properties will be returned. Properties will be excluded if the caller does
   * not have access. Soft-deleted (ie: "trashed") properties are excluded by
   * default. Returns an empty list if no relevant properties are found.
   *
   */
  async propertiesList(opts: PropertiesListOptions = {}): Promise<GoogleAnalyticsAdminV1betaListPropertiesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/properties`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAnalyticsAdminV1betaListPropertiesResponse;
  }

  /**
   * Updates a property.
   *
   * @param name Output only. Resource name of this property. Format: properties/{property_id} Example: "properties/1000"
   */
  async propertiesPatch(name: string, req: GoogleAnalyticsAdminV1betaProperty, opts: PropertiesPatchOptions = {}): Promise<GoogleAnalyticsAdminV1betaProperty> {
    opts = serializePropertiesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaProperty;
  }

  /**
   * Returns a customized report of data access records. The report provides
   * records of each time a user reads Google Analytics reporting data. Access
   * records are retained for up to 2 years. Data Access Reports can be
   * requested for a property. The property must be in Google Analytics 360.
   * This method is only available to Administrators. These data access records
   * include GA4 UI Reporting, GA4 UI Explorations, GA4 Data API, and other
   * products like Firebase & Admob that can retrieve data from Google Analytics
   * through a linkage. These records don't include property configuration
   * changes like adding a stream or changing a property's time zone. For
   * configuration change history, see
   * [searchChangeHistoryEvents](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/accounts/searchChangeHistoryEvents).
   *
   * @param entity The Data Access Report supports requesting at the property level or account level. If requested at the account level, Data Access Reports include all access for all properties under that account. To request at the property level, entity should be for example 'properties/123' if "123" is your GA4 property ID. To request at the account level, entity should be for example 'accounts/1234' if "1234" is your GA4 Account ID.
   */
  async propertiesRunAccessReport(entity: string, req: GoogleAnalyticsAdminV1betaRunAccessReportRequest): Promise<GoogleAnalyticsAdminV1betaRunAccessReportResponse> {
    req = serializeGoogleAnalyticsAdminV1betaRunAccessReportRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta/${ entity }:runAccessReport`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaRunAccessReportResponse;
  }

  /**
   * Updates the singleton data retention settings for this property.
   *
   * @param name Output only. Resource name for this DataRetentionSetting resource. Format: properties/{property}/dataRetentionSettings
   */
  async propertiesUpdateDataRetentionSettings(name: string, req: GoogleAnalyticsAdminV1betaDataRetentionSettings, opts: PropertiesUpdateDataRetentionSettingsOptions = {}): Promise<GoogleAnalyticsAdminV1betaDataRetentionSettings> {
    opts = serializePropertiesUpdateDataRetentionSettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleAnalyticsAdminV1betaDataRetentionSettings;
  }
}

/**
 * Additional options for AnalyticsAdmin#accountsList.
 */
export interface AccountsListOptions {
  /**
   * The maximum number of resources to return. The service may return fewer
   * than this value, even if there are additional pages. If unspecified, at
   * most 50 resources will be returned. The maximum value is 200; (higher
   * values will be coerced to the maximum)
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAccounts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListAccounts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
  /**
   * Whether to include soft-deleted (ie: "trashed") Accounts in the results.
   * Accounts can be inspected to determine whether they are deleted or not.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for AnalyticsAdmin#accountsPatch.
 */
export interface AccountsPatchOptions {
  /**
   * Required. The list of fields to be updated. Field names must be in snake
   * case (for example, "field_to_update"). Omitted fields will not be updated.
   * To replace the entire entity, use one path with the string "*" to match all
   * fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAccountsPatchOptions(data: any): AccountsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAccountsPatchOptions(data: any): AccountsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsAdmin#accountSummariesList.
 */
export interface AccountSummariesListOptions {
  /**
   * The maximum number of AccountSummary resources to return. The service may
   * return fewer than this value, even if there are additional pages. If
   * unspecified, at most 50 resources will be returned. The maximum value is
   * 200; (higher values will be coerced to the maximum)
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListAccountSummaries` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListAccountSummaries` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * To express that the result needs to be between two numbers (inclusive).
 */
export interface GoogleAnalyticsAdminV1betaAccessBetweenFilter {
  /**
   * Begins with this number.
   */
  fromValue?: GoogleAnalyticsAdminV1betaNumericValue;
  /**
   * Ends with this number.
   */
  toValue?: GoogleAnalyticsAdminV1betaNumericValue;
}

function serializeGoogleAnalyticsAdminV1betaAccessBetweenFilter(data: any): GoogleAnalyticsAdminV1betaAccessBetweenFilter {
  return {
    ...data,
    fromValue: data["fromValue"] !== undefined ? serializeGoogleAnalyticsAdminV1betaNumericValue(data["fromValue"]) : undefined,
    toValue: data["toValue"] !== undefined ? serializeGoogleAnalyticsAdminV1betaNumericValue(data["toValue"]) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaAccessBetweenFilter(data: any): GoogleAnalyticsAdminV1betaAccessBetweenFilter {
  return {
    ...data,
    fromValue: data["fromValue"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaNumericValue(data["fromValue"]) : undefined,
    toValue: data["toValue"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaNumericValue(data["toValue"]) : undefined,
  };
}

/**
 * A contiguous range of days: startDate, startDate + 1, ..., endDate.
 */
export interface GoogleAnalyticsAdminV1betaAccessDateRange {
  /**
   * The inclusive end date for the query in the format `YYYY-MM-DD`. Cannot be
   * before `startDate`. The format `NdaysAgo`, `yesterday`, or `today` is also
   * accepted, and in that case, the date is inferred based on the current time
   * in the request's time zone.
   */
  endDate?: string;
  /**
   * The inclusive start date for the query in the format `YYYY-MM-DD`. Cannot
   * be after `endDate`. The format `NdaysAgo`, `yesterday`, or `today` is also
   * accepted, and in that case, the date is inferred based on the current time
   * in the request's time zone.
   */
  startDate?: string;
}

/**
 * Dimensions are attributes of your data. For example, the dimension
 * `userEmail` indicates the email of the user that accessed reporting data.
 * Dimension values in report responses are strings.
 */
export interface GoogleAnalyticsAdminV1betaAccessDimension {
  /**
   * The API name of the dimension. See [Data Access
   * Schema](https://developers.google.com/analytics/devguides/config/admin/v1/access-api-schema)
   * for the list of dimensions supported in this API. Dimensions are referenced
   * by name in `dimensionFilter` and `orderBys`.
   */
  dimensionName?: string;
}

/**
 * Describes a dimension column in the report. Dimensions requested in a report
 * produce column entries within rows and DimensionHeaders. However, dimensions
 * used exclusively within filters or expressions do not produce columns in a
 * report; correspondingly, those dimensions do not produce headers.
 */
export interface GoogleAnalyticsAdminV1betaAccessDimensionHeader {
  /**
   * The dimension's name; for example 'userEmail'.
   */
  dimensionName?: string;
}

/**
 * The value of a dimension.
 */
export interface GoogleAnalyticsAdminV1betaAccessDimensionValue {
  /**
   * The dimension value. For example, this value may be 'France' for the
   * 'country' dimension.
   */
  value?: string;
}

/**
 * An expression to filter dimension or metric values.
 */
export interface GoogleAnalyticsAdminV1betaAccessFilter {
  /**
   * A filter for two values.
   */
  betweenFilter?: GoogleAnalyticsAdminV1betaAccessBetweenFilter;
  /**
   * The dimension name or metric name.
   */
  fieldName?: string;
  /**
   * A filter for in list values.
   */
  inListFilter?: GoogleAnalyticsAdminV1betaAccessInListFilter;
  /**
   * A filter for numeric or date values.
   */
  numericFilter?: GoogleAnalyticsAdminV1betaAccessNumericFilter;
  /**
   * Strings related filter.
   */
  stringFilter?: GoogleAnalyticsAdminV1betaAccessStringFilter;
}

function serializeGoogleAnalyticsAdminV1betaAccessFilter(data: any): GoogleAnalyticsAdminV1betaAccessFilter {
  return {
    ...data,
    betweenFilter: data["betweenFilter"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessBetweenFilter(data["betweenFilter"]) : undefined,
    numericFilter: data["numericFilter"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessNumericFilter(data["numericFilter"]) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaAccessFilter(data: any): GoogleAnalyticsAdminV1betaAccessFilter {
  return {
    ...data,
    betweenFilter: data["betweenFilter"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessBetweenFilter(data["betweenFilter"]) : undefined,
    numericFilter: data["numericFilter"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessNumericFilter(data["numericFilter"]) : undefined,
  };
}

/**
 * Expresses dimension or metric filters. The fields in the same expression
 * need to be either all dimensions or all metrics.
 */
export interface GoogleAnalyticsAdminV1betaAccessFilterExpression {
  /**
   * A primitive filter. In the same FilterExpression, all of the filter's
   * field names need to be either all dimensions or all metrics.
   */
  accessFilter?: GoogleAnalyticsAdminV1betaAccessFilter;
  /**
   * Each of the FilterExpressions in the and_group has an AND relationship.
   */
  andGroup?: GoogleAnalyticsAdminV1betaAccessFilterExpressionList;
  /**
   * The FilterExpression is NOT of not_expression.
   */
  notExpression?: GoogleAnalyticsAdminV1betaAccessFilterExpression;
  /**
   * Each of the FilterExpressions in the or_group has an OR relationship.
   */
  orGroup?: GoogleAnalyticsAdminV1betaAccessFilterExpressionList;
}

function serializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data: any): GoogleAnalyticsAdminV1betaAccessFilterExpression {
  return {
    ...data,
    accessFilter: data["accessFilter"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessFilter(data["accessFilter"]) : undefined,
    andGroup: data["andGroup"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessFilterExpressionList(data["andGroup"]) : undefined,
    notExpression: data["notExpression"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data["notExpression"]) : undefined,
    orGroup: data["orGroup"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessFilterExpressionList(data["orGroup"]) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data: any): GoogleAnalyticsAdminV1betaAccessFilterExpression {
  return {
    ...data,
    accessFilter: data["accessFilter"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessFilter(data["accessFilter"]) : undefined,
    andGroup: data["andGroup"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessFilterExpressionList(data["andGroup"]) : undefined,
    notExpression: data["notExpression"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data["notExpression"]) : undefined,
    orGroup: data["orGroup"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessFilterExpressionList(data["orGroup"]) : undefined,
  };
}

/**
 * A list of filter expressions.
 */
export interface GoogleAnalyticsAdminV1betaAccessFilterExpressionList {
  /**
   * A list of filter expressions.
   */
  expressions?: GoogleAnalyticsAdminV1betaAccessFilterExpression[];
}

function serializeGoogleAnalyticsAdminV1betaAccessFilterExpressionList(data: any): GoogleAnalyticsAdminV1betaAccessFilterExpressionList {
  return {
    ...data,
    expressions: data["expressions"] !== undefined ? data["expressions"].map((item: any) => (serializeGoogleAnalyticsAdminV1betaAccessFilterExpression(item))) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaAccessFilterExpressionList(data: any): GoogleAnalyticsAdminV1betaAccessFilterExpressionList {
  return {
    ...data,
    expressions: data["expressions"] !== undefined ? data["expressions"].map((item: any) => (deserializeGoogleAnalyticsAdminV1betaAccessFilterExpression(item))) : undefined,
  };
}

/**
 * The result needs to be in a list of string values.
 */
export interface GoogleAnalyticsAdminV1betaAccessInListFilter {
  /**
   * If true, the string value is case sensitive.
   */
  caseSensitive?: boolean;
  /**
   * The list of string values. Must be non-empty.
   */
  values?: string[];
}

/**
 * The quantitative measurements of a report. For example, the metric
 * `accessCount` is the total number of data access records.
 */
export interface GoogleAnalyticsAdminV1betaAccessMetric {
  /**
   * The API name of the metric. See [Data Access
   * Schema](https://developers.google.com/analytics/devguides/config/admin/v1/access-api-schema)
   * for the list of metrics supported in this API. Metrics are referenced by
   * name in `metricFilter` & `orderBys`.
   */
  metricName?: string;
}

/**
 * Describes a metric column in the report. Visible metrics requested in a
 * report produce column entries within rows and MetricHeaders. However, metrics
 * used exclusively within filters or expressions do not produce columns in a
 * report; correspondingly, those metrics do not produce headers.
 */
export interface GoogleAnalyticsAdminV1betaAccessMetricHeader {
  /**
   * The metric's name; for example 'accessCount'.
   */
  metricName?: string;
}

/**
 * The value of a metric.
 */
export interface GoogleAnalyticsAdminV1betaAccessMetricValue {
  /**
   * The measurement value. For example, this value may be '13'.
   */
  value?: string;
}

/**
 * Filters for numeric or date values.
 */
export interface GoogleAnalyticsAdminV1betaAccessNumericFilter {
  /**
   * The operation type for this filter.
   */
  operation?:  | "OPERATION_UNSPECIFIED" | "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL";
  /**
   * A numeric value or a date value.
   */
  value?: GoogleAnalyticsAdminV1betaNumericValue;
}

function serializeGoogleAnalyticsAdminV1betaAccessNumericFilter(data: any): GoogleAnalyticsAdminV1betaAccessNumericFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeGoogleAnalyticsAdminV1betaNumericValue(data["value"]) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaAccessNumericFilter(data: any): GoogleAnalyticsAdminV1betaAccessNumericFilter {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaNumericValue(data["value"]) : undefined,
  };
}

/**
 * Order bys define how rows will be sorted in the response. For example,
 * ordering rows by descending access count is one ordering, and ordering rows
 * by the country string is a different ordering.
 */
export interface GoogleAnalyticsAdminV1betaAccessOrderBy {
  /**
   * If true, sorts by descending order. If false or unspecified, sorts in
   * ascending order.
   */
  desc?: boolean;
  /**
   * Sorts results by a dimension's values.
   */
  dimension?: GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy;
  /**
   * Sorts results by a metric's values.
   */
  metric?: GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy;
}

/**
 * Sorts by dimension values.
 */
export interface GoogleAnalyticsAdminV1betaAccessOrderByDimensionOrderBy {
  /**
   * A dimension name in the request to order by.
   */
  dimensionName?: string;
  /**
   * Controls the rule for dimension value ordering.
   */
  orderType?:  | "ORDER_TYPE_UNSPECIFIED" | "ALPHANUMERIC" | "CASE_INSENSITIVE_ALPHANUMERIC" | "NUMERIC";
}

/**
 * Sorts by metric values.
 */
export interface GoogleAnalyticsAdminV1betaAccessOrderByMetricOrderBy {
  /**
   * A metric name in the request to order by.
   */
  metricName?: string;
}

/**
 * Current state of all quotas for this Analytics property. If any quota for a
 * property is exhausted, all requests to that property will return Resource
 * Exhausted errors.
 */
export interface GoogleAnalyticsAdminV1betaAccessQuota {
  /**
   * Properties can use up to 50 concurrent requests.
   */
  concurrentRequests?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /**
   * Properties and cloud project pairs can have up to 50 server errors per
   * hour.
   */
  serverErrorsPerProjectPerHour?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /**
   * Properties can use 250,000 tokens per day. Most requests consume fewer
   * than 10 tokens.
   */
  tokensPerDay?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /**
   * Properties can use 50,000 tokens per hour. An API request consumes a
   * single number of tokens, and that number is deducted from all of the
   * hourly, daily, and per project hourly quotas.
   */
  tokensPerHour?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
  /**
   * Properties can use up to 25% of their tokens per project per hour. This
   * amounts to Analytics 360 Properties can use 12,500 tokens per project per
   * hour. An API request consumes a single number of tokens, and that number is
   * deducted from all of the hourly, daily, and per project hourly quotas.
   */
  tokensPerProjectPerHour?: GoogleAnalyticsAdminV1betaAccessQuotaStatus;
}

/**
 * Current state for a particular quota group.
 */
export interface GoogleAnalyticsAdminV1betaAccessQuotaStatus {
  /**
   * Quota consumed by this request.
   */
  consumed?: number;
  /**
   * Quota remaining after this request.
   */
  remaining?: number;
}

/**
 * Access report data for each row.
 */
export interface GoogleAnalyticsAdminV1betaAccessRow {
  /**
   * List of dimension values. These values are in the same order as specified
   * in the request.
   */
  dimensionValues?: GoogleAnalyticsAdminV1betaAccessDimensionValue[];
  /**
   * List of metric values. These values are in the same order as specified in
   * the request.
   */
  metricValues?: GoogleAnalyticsAdminV1betaAccessMetricValue[];
}

/**
 * The filter for strings.
 */
export interface GoogleAnalyticsAdminV1betaAccessStringFilter {
  /**
   * If true, the string value is case sensitive.
   */
  caseSensitive?: boolean;
  /**
   * The match type for this filter.
   */
  matchType?:  | "MATCH_TYPE_UNSPECIFIED" | "EXACT" | "BEGINS_WITH" | "ENDS_WITH" | "CONTAINS" | "FULL_REGEXP" | "PARTIAL_REGEXP";
  /**
   * The string value used for the matching.
   */
  value?: string;
}

/**
 * A resource message representing a Google Analytics account.
 */
export interface GoogleAnalyticsAdminV1betaAccount {
  /**
   * Output only. Time when this account was originally created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Indicates whether this Account is soft-deleted or not.
   * Deleted accounts are excluded from List results unless specifically
   * requested.
   */
  readonly deleted?: boolean;
  /**
   * Required. Human-readable display name for this account.
   */
  displayName?: string;
  /**
   * Output only. Resource name of this account. Format: accounts/{account}
   * Example: "accounts/100"
   */
  readonly name?: string;
  /**
   * Country of business. Must be a Unicode CLDR region code.
   */
  regionCode?: string;
  /**
   * Output only. Time when account payload fields were last updated.
   */
  readonly updateTime?: Date;
}

/**
 * A virtual resource representing an overview of an account and all its child
 * GA4 properties.
 */
export interface GoogleAnalyticsAdminV1betaAccountSummary {
  /**
   * Resource name of account referred to by this account summary Format:
   * accounts/{account_id} Example: "accounts/1000"
   */
  account?: string;
  /**
   * Display name for the account referred to in this account summary.
   */
  displayName?: string;
  /**
   * Resource name for this account summary. Format:
   * accountSummaries/{account_id} Example: "accountSummaries/1000"
   */
  name?: string;
  /**
   * List of summaries for child accounts of this account.
   */
  propertySummaries?: GoogleAnalyticsAdminV1betaPropertySummary[];
}

/**
 * Request message for AcknowledgeUserDataCollection RPC.
 */
export interface GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionRequest {
  /**
   * Required. An acknowledgement that the caller of this method understands
   * the terms of user data collection. This field must contain the exact value:
   * "I acknowledge that I have the necessary privacy disclosures and rights
   * from my end users for the collection and processing of their data,
   * including the association of such data with the visitation information
   * Google Analytics collects from my site and/or app property."
   */
  acknowledgement?: string;
}

/**
 * Response message for AcknowledgeUserDataCollection RPC.
 */
export interface GoogleAnalyticsAdminV1betaAcknowledgeUserDataCollectionResponse {
}

/**
 * Request message for ArchiveCustomDimension RPC.
 */
export interface GoogleAnalyticsAdminV1betaArchiveCustomDimensionRequest {
}

/**
 * Request message for ArchiveCustomMetric RPC.
 */
export interface GoogleAnalyticsAdminV1betaArchiveCustomMetricRequest {
}

/**
 * A description of a change to a single Google Analytics resource.
 */
export interface GoogleAnalyticsAdminV1betaChangeHistoryChange {
  /**
   * The type of action that changed this resource.
   */
  action?:  | "ACTION_TYPE_UNSPECIFIED" | "CREATED" | "UPDATED" | "DELETED";
  /**
   * Resource name of the resource whose changes are described by this entry.
   */
  resource?: string;
  /**
   * Resource contents from after the change was made. If this resource was
   * deleted in this change, this field will be missing.
   */
  resourceAfterChange?: GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource;
  /**
   * Resource contents from before the change was made. If this resource was
   * created in this change, this field will be missing.
   */
  resourceBeforeChange?: GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource;
}

/**
 * A snapshot of a resource as before or after the result of a change in change
 * history.
 */
export interface GoogleAnalyticsAdminV1betaChangeHistoryChangeChangeHistoryResource {
  /**
   * A snapshot of an Account resource in change history.
   */
  account?: GoogleAnalyticsAdminV1betaAccount;
  /**
   * A snapshot of a ConversionEvent resource in change history.
   */
  conversionEvent?: GoogleAnalyticsAdminV1betaConversionEvent;
  /**
   * A snapshot of a data retention settings resource in change history.
   */
  dataRetentionSettings?: GoogleAnalyticsAdminV1betaDataRetentionSettings;
  /**
   * A snapshot of a DataStream resource in change history.
   */
  dataStream?: GoogleAnalyticsAdminV1betaDataStream;
  /**
   * A snapshot of a FirebaseLink resource in change history.
   */
  firebaseLink?: GoogleAnalyticsAdminV1betaFirebaseLink;
  /**
   * A snapshot of a GoogleAdsLink resource in change history.
   */
  googleAdsLink?: GoogleAnalyticsAdminV1betaGoogleAdsLink;
  /**
   * A snapshot of a MeasurementProtocolSecret resource in change history.
   */
  measurementProtocolSecret?: GoogleAnalyticsAdminV1betaMeasurementProtocolSecret;
  /**
   * A snapshot of a Property resource in change history.
   */
  property?: GoogleAnalyticsAdminV1betaProperty;
}

/**
 * A set of changes within a Google Analytics account or its child properties
 * that resulted from the same cause. Common causes would be updates made in the
 * Google Analytics UI, changes from customer support, or automatic Google
 * Analytics system changes.
 */
export interface GoogleAnalyticsAdminV1betaChangeHistoryEvent {
  /**
   * The type of actor that made this change.
   */
  actorType?:  | "ACTOR_TYPE_UNSPECIFIED" | "USER" | "SYSTEM" | "SUPPORT";
  /**
   * A list of changes made in this change history event that fit the filters
   * specified in SearchChangeHistoryEventsRequest.
   */
  changes?: GoogleAnalyticsAdminV1betaChangeHistoryChange[];
  /**
   * If true, then the list of changes returned was filtered, and does not
   * represent all changes that occurred in this event.
   */
  changesFiltered?: boolean;
  /**
   * Time when change was made.
   */
  changeTime?: Date;
  /**
   * ID of this change history event. This ID is unique across Google
   * Analytics.
   */
  id?: string;
  /**
   * Email address of the Google account that made the change. This will be a
   * valid email address if the actor field is set to USER, and empty otherwise.
   * Google accounts that have been deleted will cause an error.
   */
  userActorEmail?: string;
}

function serializeGoogleAnalyticsAdminV1betaChangeHistoryEvent(data: any): GoogleAnalyticsAdminV1betaChangeHistoryEvent {
  return {
    ...data,
    changeTime: data["changeTime"] !== undefined ? data["changeTime"].toISOString() : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaChangeHistoryEvent(data: any): GoogleAnalyticsAdminV1betaChangeHistoryEvent {
  return {
    ...data,
    changeTime: data["changeTime"] !== undefined ? new Date(data["changeTime"]) : undefined,
  };
}

/**
 * A conversion event in a Google Analytics property.
 */
export interface GoogleAnalyticsAdminV1betaConversionEvent {
  /**
   * Output only. Time when this conversion event was created in the property.
   */
  readonly createTime?: Date;
  /**
   * Output only. If set to true, this conversion event refers to a custom
   * event. If set to false, this conversion event refers to a default event in
   * GA. Default events typically have special meaning in GA. Default events are
   * usually created for you by the GA system, but in some cases can be created
   * by property admins. Custom events count towards the maximum number of
   * custom conversion events that may be created per property.
   */
  readonly custom?: boolean;
  /**
   * Output only. If set, this event can currently be deleted with
   * DeleteConversionEvent.
   */
  readonly deletable?: boolean;
  /**
   * Immutable. The event name for this conversion event. Examples: 'click',
   * 'purchase'
   */
  eventName?: string;
  /**
   * Output only. Resource name of this conversion event. Format:
   * properties/{property}/conversionEvents/{conversion_event}
   */
  readonly name?: string;
}

/**
 * A definition for a CustomDimension.
 */
export interface GoogleAnalyticsAdminV1betaCustomDimension {
  /**
   * Optional. Description for this custom dimension. Max length of 150
   * characters.
   */
  description?: string;
  /**
   * Optional. If set to true, sets this dimension as NPA and excludes it from
   * ads personalization. This is currently only supported by user-scoped custom
   * dimensions.
   */
  disallowAdsPersonalization?: boolean;
  /**
   * Required. Display name for this custom dimension as shown in the Analytics
   * UI. Max length of 82 characters, alphanumeric plus space and underscore
   * starting with a letter. Legacy system-generated display names may contain
   * square brackets, but updates to this field will never permit square
   * brackets.
   */
  displayName?: string;
  /**
   * Output only. Resource name for this CustomDimension resource. Format:
   * properties/{property}/customDimensions/{customDimension}
   */
  readonly name?: string;
  /**
   * Required. Immutable. Tagging parameter name for this custom dimension. If
   * this is a user-scoped dimension, then this is the user property name. If
   * this is an event-scoped dimension, then this is the event parameter name.
   * May only contain alphanumeric and underscore characters, starting with a
   * letter. Max length of 24 characters for user-scoped dimensions, 40
   * characters for event-scoped dimensions.
   */
  parameterName?: string;
  /**
   * Required. Immutable. The scope of this dimension.
   */
  scope?:  | "DIMENSION_SCOPE_UNSPECIFIED" | "EVENT" | "USER";
}

/**
 * A definition for a custom metric.
 */
export interface GoogleAnalyticsAdminV1betaCustomMetric {
  /**
   * Optional. Description for this custom dimension. Max length of 150
   * characters.
   */
  description?: string;
  /**
   * Required. Display name for this custom metric as shown in the Analytics
   * UI. Max length of 82 characters, alphanumeric plus space and underscore
   * starting with a letter. Legacy system-generated display names may contain
   * square brackets, but updates to this field will never permit square
   * brackets.
   */
  displayName?: string;
  /**
   * Required. The type for the custom metric's value.
   */
  measurementUnit?:  | "MEASUREMENT_UNIT_UNSPECIFIED" | "STANDARD" | "CURRENCY" | "FEET" | "METERS" | "KILOMETERS" | "MILES" | "MILLISECONDS" | "SECONDS" | "MINUTES" | "HOURS";
  /**
   * Output only. Resource name for this CustomMetric resource. Format:
   * properties/{property}/customMetrics/{customMetric}
   */
  readonly name?: string;
  /**
   * Required. Immutable. Tagging name for this custom metric. If this is an
   * event-scoped metric, then this is the event parameter name. May only
   * contain alphanumeric and underscore charactes, starting with a letter. Max
   * length of 40 characters for event-scoped metrics.
   */
  parameterName?: string;
  /**
   * Optional. Types of restricted data that this metric may contain. Required
   * for metrics with CURRENCY measurement unit. Must be empty for metrics with
   * a non-CURRENCY measurement unit.
   */
  restrictedMetricType?:  | "RESTRICTED_METRIC_TYPE_UNSPECIFIED" | "COST_DATA" | "REVENUE_DATA"[];
  /**
   * Required. Immutable. The scope of this custom metric.
   */
  scope?:  | "METRIC_SCOPE_UNSPECIFIED" | "EVENT";
}

/**
 * Settings values for data retention. This is a singleton resource.
 */
export interface GoogleAnalyticsAdminV1betaDataRetentionSettings {
  /**
   * The length of time that event-level data is retained.
   */
  eventDataRetention?:  | "RETENTION_DURATION_UNSPECIFIED" | "TWO_MONTHS" | "FOURTEEN_MONTHS" | "TWENTY_SIX_MONTHS" | "THIRTY_EIGHT_MONTHS" | "FIFTY_MONTHS";
  /**
   * Output only. Resource name for this DataRetentionSetting resource. Format:
   * properties/{property}/dataRetentionSettings
   */
  readonly name?: string;
  /**
   * If true, reset the retention period for the user identifier with every
   * event from that user.
   */
  resetUserDataOnNewActivity?: boolean;
}

/**
 * A resource message representing data sharing settings of a Google Analytics
 * account.
 */
export interface GoogleAnalyticsAdminV1betaDataSharingSettings {
  /**
   * Output only. Resource name. Format: accounts/{account}/dataSharingSettings
   * Example: "accounts/1000/dataSharingSettings"
   */
  readonly name?: string;
  /**
   * Allows any of Google sales to access the data in order to suggest
   * configuration changes to improve results.
   */
  sharingWithGoogleAnySalesEnabled?: boolean;
  /**
   * Allows Google sales teams that are assigned to the customer to access the
   * data in order to suggest configuration changes to improve results. Sales
   * team restrictions still apply when enabled.
   */
  sharingWithGoogleAssignedSalesEnabled?: boolean;
  /**
   * Allows Google to use the data to improve other Google products or
   * services.
   */
  sharingWithGoogleProductsEnabled?: boolean;
  /**
   * Allows Google support to access the data in order to help troubleshoot
   * issues.
   */
  sharingWithGoogleSupportEnabled?: boolean;
  /**
   * Allows Google to share the data anonymously in aggregate form with others.
   */
  sharingWithOthersEnabled?: boolean;
}

/**
 * A resource message representing a data stream.
 */
export interface GoogleAnalyticsAdminV1betaDataStream {
  /**
   * Data specific to Android app streams. Must be populated if type is
   * ANDROID_APP_DATA_STREAM.
   */
  androidAppStreamData?: GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData;
  /**
   * Output only. Time when this stream was originally created.
   */
  readonly createTime?: Date;
  /**
   * Human-readable display name for the Data Stream. Required for web data
   * streams. The max allowed display name length is 255 UTF-16 code units.
   */
  displayName?: string;
  /**
   * Data specific to iOS app streams. Must be populated if type is
   * IOS_APP_DATA_STREAM.
   */
  iosAppStreamData?: GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData;
  /**
   * Output only. Resource name of this Data Stream. Format:
   * properties/{property_id}/dataStreams/{stream_id} Example:
   * "properties/1000/dataStreams/2000"
   */
  readonly name?: string;
  /**
   * Required. Immutable. The type of this DataStream resource.
   */
  type?:  | "DATA_STREAM_TYPE_UNSPECIFIED" | "WEB_DATA_STREAM" | "ANDROID_APP_DATA_STREAM" | "IOS_APP_DATA_STREAM";
  /**
   * Output only. Time when stream payload fields were last updated.
   */
  readonly updateTime?: Date;
  /**
   * Data specific to web streams. Must be populated if type is
   * WEB_DATA_STREAM.
   */
  webStreamData?: GoogleAnalyticsAdminV1betaDataStreamWebStreamData;
}

/**
 * Data specific to Android app streams.
 */
export interface GoogleAnalyticsAdminV1betaDataStreamAndroidAppStreamData {
  /**
   * Output only. ID of the corresponding Android app in Firebase, if any. This
   * ID can change if the Android app is deleted and recreated.
   */
  readonly firebaseAppId?: string;
  /**
   * Immutable. The package name for the app being measured. Example:
   * "com.example.myandroidapp"
   */
  packageName?: string;
}

/**
 * Data specific to iOS app streams.
 */
export interface GoogleAnalyticsAdminV1betaDataStreamIosAppStreamData {
  /**
   * Required. Immutable. The Apple App Store Bundle ID for the app Example:
   * "com.example.myiosapp"
   */
  bundleId?: string;
  /**
   * Output only. ID of the corresponding iOS app in Firebase, if any. This ID
   * can change if the iOS app is deleted and recreated.
   */
  readonly firebaseAppId?: string;
}

/**
 * Data specific to web streams.
 */
export interface GoogleAnalyticsAdminV1betaDataStreamWebStreamData {
  /**
   * Immutable. Domain name of the web app being measured, or empty. Example:
   * "http://www.google.com", "https://www.google.com"
   */
  defaultUri?: string;
  /**
   * Output only. ID of the corresponding web app in Firebase, if any. This ID
   * can change if the web app is deleted and recreated.
   */
  readonly firebaseAppId?: string;
  /**
   * Output only. Analytics "Measurement ID", without the "G-" prefix. Example:
   * "G-1A2BCD345E" would just be "1A2BCD345E"
   */
  readonly measurementId?: string;
}

/**
 * A link between a GA4 property and a Firebase project.
 */
export interface GoogleAnalyticsAdminV1betaFirebaseLink {
  /**
   * Output only. Time when this FirebaseLink was originally created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Example format: properties/1234/firebaseLinks/5678
   */
  readonly name?: string;
  /**
   * Immutable. Firebase project resource name. When creating a FirebaseLink,
   * you may provide this resource name using either a project number or project
   * ID. Once this resource has been created, returned FirebaseLinks will always
   * have a project_name that contains a project number. Format:
   * 'projects/{project number}' Example: 'projects/1234'
   */
  project?: string;
}

/**
 * A link between a GA4 property and a Google Ads account.
 */
export interface GoogleAnalyticsAdminV1betaGoogleAdsLink {
  /**
   * Enable personalized advertising features with this integration.
   * Automatically publish my Google Analytics audience lists and Google
   * Analytics remarketing events/parameters to the linked Google Ads account.
   * If this field is not set on create/update, it will be defaulted to true.
   */
  adsPersonalizationEnabled?: boolean;
  /**
   * Output only. If true, this link is for a Google Ads manager account.
   */
  readonly canManageClients?: boolean;
  /**
   * Output only. Time when this link was originally created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Email address of the user that created the link. An empty
   * string will be returned if the email address can't be retrieved.
   */
  readonly creatorEmailAddress?: string;
  /**
   * Immutable. Google Ads customer ID.
   */
  customerId?: string;
  /**
   * Output only. Format:
   * properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note:
   * googleAdsLinkId is not the Google Ads customer ID.
   */
  readonly name?: string;
  /**
   * Output only. Time when this link was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Request message for ListAccounts RPC.
 */
export interface GoogleAnalyticsAdminV1betaListAccountsResponse {
  /**
   * Results that were accessible to the caller.
   */
  accounts?: GoogleAnalyticsAdminV1betaAccount[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListAccountSummaries RPC.
 */
export interface GoogleAnalyticsAdminV1betaListAccountSummariesResponse {
  /**
   * Account summaries of all accounts the caller has access to.
   */
  accountSummaries?: GoogleAnalyticsAdminV1betaAccountSummary[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListConversionEvents RPC.
 */
export interface GoogleAnalyticsAdminV1betaListConversionEventsResponse {
  /**
   * The requested conversion events
   */
  conversionEvents?: GoogleAnalyticsAdminV1betaConversionEvent[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListCustomDimensions RPC.
 */
export interface GoogleAnalyticsAdminV1betaListCustomDimensionsResponse {
  /**
   * List of CustomDimensions.
   */
  customDimensions?: GoogleAnalyticsAdminV1betaCustomDimension[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListCustomMetrics RPC.
 */
export interface GoogleAnalyticsAdminV1betaListCustomMetricsResponse {
  /**
   * List of CustomMetrics.
   */
  customMetrics?: GoogleAnalyticsAdminV1betaCustomMetric[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListDataStreams RPC.
 */
export interface GoogleAnalyticsAdminV1betaListDataStreamsResponse {
  /**
   * List of DataStreams.
   */
  dataStreams?: GoogleAnalyticsAdminV1betaDataStream[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListFirebaseLinks RPC
 */
export interface GoogleAnalyticsAdminV1betaListFirebaseLinksResponse {
  /**
   * List of FirebaseLinks. This will have at most one value.
   */
  firebaseLinks?: GoogleAnalyticsAdminV1betaFirebaseLink[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages. Currently, Google
   * Analytics supports only one FirebaseLink per property, so this will never
   * be populated.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListGoogleAdsLinks RPC.
 */
export interface GoogleAnalyticsAdminV1betaListGoogleAdsLinksResponse {
  /**
   * List of GoogleAdsLinks.
   */
  googleAdsLinks?: GoogleAnalyticsAdminV1betaGoogleAdsLink[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListMeasurementProtocolSecret RPC
 */
export interface GoogleAnalyticsAdminV1betaListMeasurementProtocolSecretsResponse {
  /**
   * A list of secrets for the parent stream specified in the request.
   */
  measurementProtocolSecrets?: GoogleAnalyticsAdminV1betaMeasurementProtocolSecret[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListProperties RPC.
 */
export interface GoogleAnalyticsAdminV1betaListPropertiesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Results that matched the filter criteria and were accessible to the
   * caller.
   */
  properties?: GoogleAnalyticsAdminV1betaProperty[];
}

/**
 * A secret value used for sending hits to Measurement Protocol.
 */
export interface GoogleAnalyticsAdminV1betaMeasurementProtocolSecret {
  /**
   * Required. Human-readable display name for this secret.
   */
  displayName?: string;
  /**
   * Output only. Resource name of this secret. This secret may be a child of
   * any type of stream. Format:
   * properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret}
   */
  readonly name?: string;
  /**
   * Output only. The measurement protocol secret value. Pass this value to the
   * api_secret field of the Measurement Protocol API when sending hits to this
   * secret's parent property.
   */
  readonly secretValue?: string;
}

/**
 * To represent a number.
 */
export interface GoogleAnalyticsAdminV1betaNumericValue {
  /**
   * Double value
   */
  doubleValue?: number;
  /**
   * Integer value
   */
  int64Value?: bigint;
}

function serializeGoogleAnalyticsAdminV1betaNumericValue(data: any): GoogleAnalyticsAdminV1betaNumericValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaNumericValue(data: any): GoogleAnalyticsAdminV1betaNumericValue {
  return {
    ...data,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
  };
}

/**
 * A resource message representing a Google Analytics GA4 property.
 */
export interface GoogleAnalyticsAdminV1betaProperty {
  /**
   * Immutable. The resource name of the parent account Format:
   * accounts/{account_id} Example: "accounts/123"
   */
  account?: string;
  /**
   * Output only. Time when the entity was originally created.
   */
  readonly createTime?: Date;
  /**
   * The currency type used in reports involving monetary values. Format:
   * https://en.wikipedia.org/wiki/ISO_4217 Examples: "USD", "EUR", "JPY"
   */
  currencyCode?: string;
  /**
   * Output only. If set, the time at which this property was trashed. If not
   * set, then this property is not currently in the trash can.
   */
  readonly deleteTime?: Date;
  /**
   * Required. Human-readable display name for this property. The max allowed
   * display name length is 100 UTF-16 code units.
   */
  displayName?: string;
  /**
   * Output only. If set, the time at which this trashed property will be
   * permanently deleted. If not set, then this property is not currently in the
   * trash can and is not slated to be deleted.
   */
  readonly expireTime?: Date;
  /**
   * Industry associated with this property Example: AUTOMOTIVE, FOOD_AND_DRINK
   */
  industryCategory?:  | "INDUSTRY_CATEGORY_UNSPECIFIED" | "AUTOMOTIVE" | "BUSINESS_AND_INDUSTRIAL_MARKETS" | "FINANCE" | "HEALTHCARE" | "TECHNOLOGY" | "TRAVEL" | "OTHER" | "ARTS_AND_ENTERTAINMENT" | "BEAUTY_AND_FITNESS" | "BOOKS_AND_LITERATURE" | "FOOD_AND_DRINK" | "GAMES" | "HOBBIES_AND_LEISURE" | "HOME_AND_GARDEN" | "INTERNET_AND_TELECOM" | "LAW_AND_GOVERNMENT" | "NEWS" | "ONLINE_COMMUNITIES" | "PEOPLE_AND_SOCIETY" | "PETS_AND_ANIMALS" | "REAL_ESTATE" | "REFERENCE" | "SCIENCE" | "SPORTS" | "JOBS_AND_EDUCATION" | "SHOPPING";
  /**
   * Output only. Resource name of this property. Format:
   * properties/{property_id} Example: "properties/1000"
   */
  readonly name?: string;
  /**
   * Immutable. Resource name of this property's logical parent. Note: The
   * Property-Moving UI can be used to change the parent. Format:
   * accounts/{account}, properties/{property} Example: "accounts/100",
   * "properties/101"
   */
  parent?: string;
  /**
   * Immutable. The property type for this Property resource. When creating a
   * property, if the type is "PROPERTY_TYPE_UNSPECIFIED", then
   * "ORDINARY_PROPERTY" will be implied. "SUBPROPERTY" and "ROLLUP_PROPERTY"
   * types cannot yet be created with the Google Analytics Admin API.
   */
  propertyType?:  | "PROPERTY_TYPE_UNSPECIFIED" | "PROPERTY_TYPE_ORDINARY" | "PROPERTY_TYPE_SUBPROPERTY" | "PROPERTY_TYPE_ROLLUP";
  /**
   * Output only. The Google Analytics service level that applies to this
   * property.
   */
  readonly serviceLevel?:  | "SERVICE_LEVEL_UNSPECIFIED" | "GOOGLE_ANALYTICS_STANDARD" | "GOOGLE_ANALYTICS_360";
  /**
   * Required. Reporting Time Zone, used as the day boundary for reports,
   * regardless of where the data originates. If the time zone honors DST,
   * Analytics will automatically adjust for the changes. NOTE: Changing the
   * time zone only affects data going forward, and is not applied
   * retroactively. Format: https://www.iana.org/time-zones Example:
   * "America/Los_Angeles"
   */
  timeZone?: string;
  /**
   * Output only. Time when entity payload fields were last updated.
   */
  readonly updateTime?: Date;
}

/**
 * A virtual resource representing metadata for a GA4 property.
 */
export interface GoogleAnalyticsAdminV1betaPropertySummary {
  /**
   * Display name for the property referred to in this property summary.
   */
  displayName?: string;
  /**
   * Resource name of this property's logical parent. Note: The Property-Moving
   * UI can be used to change the parent. Format: accounts/{account},
   * properties/{property} Example: "accounts/100", "properties/200"
   */
  parent?: string;
  /**
   * Resource name of property referred to by this property summary Format:
   * properties/{property_id} Example: "properties/1000"
   */
  property?: string;
  /**
   * The property's property type.
   */
  propertyType?:  | "PROPERTY_TYPE_UNSPECIFIED" | "PROPERTY_TYPE_ORDINARY" | "PROPERTY_TYPE_SUBPROPERTY" | "PROPERTY_TYPE_ROLLUP";
}

/**
 * Request message for ProvisionAccountTicket RPC.
 */
export interface GoogleAnalyticsAdminV1betaProvisionAccountTicketRequest {
  /**
   * The account to create.
   */
  account?: GoogleAnalyticsAdminV1betaAccount;
  /**
   * Redirect URI where the user will be sent after accepting Terms of Service.
   * Must be configured in Cloud Console as a Redirect URI.
   */
  redirectUri?: string;
}

/**
 * Response message for ProvisionAccountTicket RPC.
 */
export interface GoogleAnalyticsAdminV1betaProvisionAccountTicketResponse {
  /**
   * The param to be passed in the ToS link.
   */
  accountTicketId?: string;
}

/**
 * The request for a Data Access Record Report.
 */
export interface GoogleAnalyticsAdminV1betaRunAccessReportRequest {
  /**
   * Date ranges of access records to read. If multiple date ranges are
   * requested, each response row will contain a zero based date range index. If
   * two date ranges overlap, the access records for the overlapping days is
   * included in the response rows for both date ranges. Requests are allowed up
   * to 2 date ranges.
   */
  dateRanges?: GoogleAnalyticsAdminV1betaAccessDateRange[];
  /**
   * Dimension filters let you restrict report response to specific dimension
   * values which match the filter. For example, filtering on access records of
   * a single user. To learn more, see [Fundamentals of Dimension
   * Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters)
   * for examples. Metrics cannot be used in this filter.
   */
  dimensionFilter?: GoogleAnalyticsAdminV1betaAccessFilterExpression;
  /**
   * The dimensions requested and displayed in the response. Requests are
   * allowed up to 9 dimensions.
   */
  dimensions?: GoogleAnalyticsAdminV1betaAccessDimension[];
  /**
   * The number of rows to return. If unspecified, 10,000 rows are returned.
   * The API returns a maximum of 100,000 rows per request, no matter how many
   * you ask for. `limit` must be positive. The API may return fewer rows than
   * the requested `limit`, if there aren't as many remaining rows as the
   * `limit`. For instance, there are fewer than 300 possible values for the
   * dimension `country`, so when reporting on only `country`, you can't get
   * more than 300 rows, even if you set `limit` to a higher value. To learn
   * more about this pagination parameter, see
   * [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  limit?: bigint;
  /**
   * Metric filters allow you to restrict report response to specific metric
   * values which match the filter. Metric filters are applied after aggregating
   * the report's rows, similar to SQL having-clause. Dimensions cannot be used
   * in this filter.
   */
  metricFilter?: GoogleAnalyticsAdminV1betaAccessFilterExpression;
  /**
   * The metrics requested and displayed in the response. Requests are allowed
   * up to 10 metrics.
   */
  metrics?: GoogleAnalyticsAdminV1betaAccessMetric[];
  /**
   * The row count of the start row. The first row is counted as row 0. If
   * offset is unspecified, it is treated as 0. If offset is zero, then this
   * method will return the first page of results with `limit` entries. To learn
   * more about this pagination parameter, see
   * [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  offset?: bigint;
  /**
   * Specifies how rows are ordered in the response.
   */
  orderBys?: GoogleAnalyticsAdminV1betaAccessOrderBy[];
  /**
   * Toggles whether to return the current state of this Analytics Property's
   * quota. Quota is returned in [AccessQuota](#AccessQuota). For account-level
   * requests, this field must be false.
   */
  returnEntityQuota?: boolean;
  /**
   * This request's time zone if specified. If unspecified, the property's time
   * zone is used. The request's time zone is used to interpret the start & end
   * dates of the report. Formatted as strings from the IANA Time Zone database
   * (https://www.iana.org/time-zones); for example "America/New_York" or
   * "Asia/Tokyo".
   */
  timeZone?: string;
}

function serializeGoogleAnalyticsAdminV1betaRunAccessReportRequest(data: any): GoogleAnalyticsAdminV1betaRunAccessReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data["dimensionFilter"]) : undefined,
    limit: data["limit"] !== undefined ? String(data["limit"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? serializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data["metricFilter"]) : undefined,
    offset: data["offset"] !== undefined ? String(data["offset"]) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaRunAccessReportRequest(data: any): GoogleAnalyticsAdminV1betaRunAccessReportRequest {
  return {
    ...data,
    dimensionFilter: data["dimensionFilter"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data["dimensionFilter"]) : undefined,
    limit: data["limit"] !== undefined ? BigInt(data["limit"]) : undefined,
    metricFilter: data["metricFilter"] !== undefined ? deserializeGoogleAnalyticsAdminV1betaAccessFilterExpression(data["metricFilter"]) : undefined,
    offset: data["offset"] !== undefined ? BigInt(data["offset"]) : undefined,
  };
}

/**
 * The customized Data Access Record Report response.
 */
export interface GoogleAnalyticsAdminV1betaRunAccessReportResponse {
  /**
   * The header for a column in the report that corresponds to a specific
   * dimension. The number of DimensionHeaders and ordering of DimensionHeaders
   * matches the dimensions present in rows.
   */
  dimensionHeaders?: GoogleAnalyticsAdminV1betaAccessDimensionHeader[];
  /**
   * The header for a column in the report that corresponds to a specific
   * metric. The number of MetricHeaders and ordering of MetricHeaders matches
   * the metrics present in rows.
   */
  metricHeaders?: GoogleAnalyticsAdminV1betaAccessMetricHeader[];
  /**
   * The quota state for this Analytics property including this request. This
   * field doesn't work with account-level requests.
   */
  quota?: GoogleAnalyticsAdminV1betaAccessQuota;
  /**
   * The total number of rows in the query result. `rowCount` is independent of
   * the number of rows returned in the response, the `limit` request parameter,
   * and the `offset` request parameter. For example if a query returns 175 rows
   * and includes `limit` of 50 in the API request, the response will contain
   * `rowCount` of 175 but only 50 rows. To learn more about this pagination
   * parameter, see
   * [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  rowCount?: number;
  /**
   * Rows of dimension value combinations and metric values in the report.
   */
  rows?: GoogleAnalyticsAdminV1betaAccessRow[];
}

/**
 * Request message for SearchChangeHistoryEvents RPC.
 */
export interface GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest {
  /**
   * Optional. If set, only return changes that match one or more of these
   * types of actions.
   */
  action?:  | "ACTION_TYPE_UNSPECIFIED" | "CREATED" | "UPDATED" | "DELETED"[];
  /**
   * Optional. If set, only return changes if they are made by a user in this
   * list.
   */
  actorEmail?: string[];
  /**
   * Optional. If set, only return changes made after this time (inclusive).
   */
  earliestChangeTime?: Date;
  /**
   * Optional. If set, only return changes made before this time (inclusive).
   */
  latestChangeTime?: Date;
  /**
   * Optional. The maximum number of ChangeHistoryEvent items to return. The
   * service may return fewer than this value, even if there are additional
   * pages. If unspecified, at most 50 items will be returned. The maximum value
   * is 200 (higher values will be coerced to the maximum).
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * `SearchChangeHistoryEvents` call. Provide this to retrieve the subsequent
   * page. When paginating, all other parameters provided to
   * `SearchChangeHistoryEvents` must match the call that provided the page
   * token.
   */
  pageToken?: string;
  /**
   * Optional. Resource name for a child property. If set, only return changes
   * made to this property or its child resources.
   */
  property?: string;
  /**
   * Optional. If set, only return changes if they are for a resource that
   * matches at least one of these types.
   */
  resourceType?:  | "CHANGE_HISTORY_RESOURCE_TYPE_UNSPECIFIED" | "ACCOUNT" | "PROPERTY" | "FIREBASE_LINK" | "GOOGLE_ADS_LINK" | "GOOGLE_SIGNALS_SETTINGS" | "CONVERSION_EVENT" | "MEASUREMENT_PROTOCOL_SECRET" | "DATA_RETENTION_SETTINGS" | "DISPLAY_VIDEO_360_ADVERTISER_LINK" | "DISPLAY_VIDEO_360_ADVERTISER_LINK_PROPOSAL" | "SEARCH_ADS_360_LINK" | "DATA_STREAM" | "ATTRIBUTION_SETTINGS" | "EXPANDED_DATA_SET" | "CHANNEL_GROUP"[];
}

function serializeGoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest(data: any): GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest {
  return {
    ...data,
    earliestChangeTime: data["earliestChangeTime"] !== undefined ? data["earliestChangeTime"].toISOString() : undefined,
    latestChangeTime: data["latestChangeTime"] !== undefined ? data["latestChangeTime"].toISOString() : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest(data: any): GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsRequest {
  return {
    ...data,
    earliestChangeTime: data["earliestChangeTime"] !== undefined ? new Date(data["earliestChangeTime"]) : undefined,
    latestChangeTime: data["latestChangeTime"] !== undefined ? new Date(data["latestChangeTime"]) : undefined,
  };
}

/**
 * Response message for SearchAccounts RPC.
 */
export interface GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse {
  /**
   * Results that were accessible to the caller.
   */
  changeHistoryEvents?: GoogleAnalyticsAdminV1betaChangeHistoryEvent[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeGoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse(data: any): GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse {
  return {
    ...data,
    changeHistoryEvents: data["changeHistoryEvents"] !== undefined ? data["changeHistoryEvents"].map((item: any) => (serializeGoogleAnalyticsAdminV1betaChangeHistoryEvent(item))) : undefined,
  };
}

function deserializeGoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse(data: any): GoogleAnalyticsAdminV1betaSearchChangeHistoryEventsResponse {
  return {
    ...data,
    changeHistoryEvents: data["changeHistoryEvents"] !== undefined ? data["changeHistoryEvents"].map((item: any) => (deserializeGoogleAnalyticsAdminV1betaChangeHistoryEvent(item))) : undefined,
  };
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
 * Additional options for AnalyticsAdmin#propertiesConversionEventsList.
 */
export interface PropertiesConversionEventsListOptions {
  /**
   * The maximum number of resources to return. If unspecified, at most 50
   * resources will be returned. The maximum value is 200; (higher values will
   * be coerced to the maximum)
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListConversionEvents` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListConversionEvents` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for AnalyticsAdmin#propertiesCustomDimensionsList.
 */
export interface PropertiesCustomDimensionsListOptions {
  /**
   * The maximum number of resources to return. If unspecified, at most 50
   * resources will be returned. The maximum value is 200 (higher values will be
   * coerced to the maximum).
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListCustomDimensions` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListCustomDimensions` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for AnalyticsAdmin#propertiesCustomDimensionsPatch.
 */
export interface PropertiesCustomDimensionsPatchOptions {
  /**
   * Required. The list of fields to be updated. Omitted fields will not be
   * updated. To replace the entire entity, use one path with the string "*" to
   * match all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializePropertiesCustomDimensionsPatchOptions(data: any): PropertiesCustomDimensionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePropertiesCustomDimensionsPatchOptions(data: any): PropertiesCustomDimensionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsAdmin#propertiesCustomMetricsList.
 */
export interface PropertiesCustomMetricsListOptions {
  /**
   * The maximum number of resources to return. If unspecified, at most 50
   * resources will be returned. The maximum value is 200 (higher values will be
   * coerced to the maximum).
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListCustomMetrics` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListCustomMetrics` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AnalyticsAdmin#propertiesCustomMetricsPatch.
 */
export interface PropertiesCustomMetricsPatchOptions {
  /**
   * Required. The list of fields to be updated. Omitted fields will not be
   * updated. To replace the entire entity, use one path with the string "*" to
   * match all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializePropertiesCustomMetricsPatchOptions(data: any): PropertiesCustomMetricsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePropertiesCustomMetricsPatchOptions(data: any): PropertiesCustomMetricsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsAdmin#propertiesDataStreamsList.
 */
export interface PropertiesDataStreamsListOptions {
  /**
   * The maximum number of resources to return. If unspecified, at most 50
   * resources will be returned. The maximum value is 200 (higher values will be
   * coerced to the maximum).
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListDataStreams` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListDataStreams` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AnalyticsAdmin#propertiesDataStreamsMeasurementProtocolSecretsList.
 */
export interface PropertiesDataStreamsMeasurementProtocolSecretsListOptions {
  /**
   * The maximum number of resources to return. If unspecified, at most 10
   * resources will be returned. The maximum value is 10. Higher values will be
   * coerced to the maximum.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListMeasurementProtocolSecrets`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListMeasurementProtocolSecrets` must match
   * the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AnalyticsAdmin#propertiesDataStreamsMeasurementProtocolSecretsPatch.
 */
export interface PropertiesDataStreamsMeasurementProtocolSecretsPatchOptions {
  /**
   * The list of fields to be updated. Omitted fields will not be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializePropertiesDataStreamsMeasurementProtocolSecretsPatchOptions(data: any): PropertiesDataStreamsMeasurementProtocolSecretsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePropertiesDataStreamsMeasurementProtocolSecretsPatchOptions(data: any): PropertiesDataStreamsMeasurementProtocolSecretsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsAdmin#propertiesDataStreamsPatch.
 */
export interface PropertiesDataStreamsPatchOptions {
  /**
   * Required. The list of fields to be updated. Omitted fields will not be
   * updated. To replace the entire entity, use one path with the string "*" to
   * match all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializePropertiesDataStreamsPatchOptions(data: any): PropertiesDataStreamsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePropertiesDataStreamsPatchOptions(data: any): PropertiesDataStreamsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsAdmin#propertiesFirebaseLinksList.
 */
export interface PropertiesFirebaseLinksListOptions {
  /**
   * The maximum number of resources to return. The service may return fewer
   * than this value, even if there are additional pages. If unspecified, at
   * most 50 resources will be returned. The maximum value is 200; (higher
   * values will be coerced to the maximum)
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListFirebaseLinks` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListFirebaseLinks` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AnalyticsAdmin#propertiesGoogleAdsLinksList.
 */
export interface PropertiesGoogleAdsLinksListOptions {
  /**
   * The maximum number of resources to return. If unspecified, at most 50
   * resources will be returned. The maximum value is 200 (higher values will be
   * coerced to the maximum).
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListGoogleAdsLinks` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListGoogleAdsLinks` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for AnalyticsAdmin#propertiesGoogleAdsLinksPatch.
 */
export interface PropertiesGoogleAdsLinksPatchOptions {
  /**
   * Required. The list of fields to be updated. Field names must be in snake
   * case (e.g., "field_to_update"). Omitted fields will not be updated. To
   * replace the entire entity, use one path with the string "*" to match all
   * fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializePropertiesGoogleAdsLinksPatchOptions(data: any): PropertiesGoogleAdsLinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePropertiesGoogleAdsLinksPatchOptions(data: any): PropertiesGoogleAdsLinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsAdmin#propertiesList.
 */
export interface PropertiesListOptions {
  /**
   * Required. An expression for filtering the results of the request. Fields
   * eligible for filtering are: `parent:`(The resource name of the parent
   * account/property) or `ancestor:`(The resource name of the parent account)
   * or `firebase_project:`(The id or number of the linked firebase project).
   * Some examples of filters: ``` | Filter | Description |
   * |-----------------------------|-------------------------------------------|
   * | parent:accounts/123 | The account with account id: 123. | |
   * parent:properties/123 | The property with property id: 123. | |
   * ancestor:accounts/123 | The account with account id: 123. | |
   * firebase_project:project-id | The firebase project with id: project-id. | |
   * firebase_project:123 | The firebase project with number: 123. | ```
   */
  filter?: string;
  /**
   * The maximum number of resources to return. The service may return fewer
   * than this value, even if there are additional pages. If unspecified, at
   * most 50 resources will be returned. The maximum value is 200; (higher
   * values will be coerced to the maximum)
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListProperties` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListProperties` must match the call that provided the page
   * token.
   */
  pageToken?: string;
  /**
   * Whether to include soft-deleted (ie: "trashed") Properties in the results.
   * Properties can be inspected to determine whether they are deleted or not.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for AnalyticsAdmin#propertiesPatch.
 */
export interface PropertiesPatchOptions {
  /**
   * Required. The list of fields to be updated. Field names must be in snake
   * case (e.g., "field_to_update"). Omitted fields will not be updated. To
   * replace the entire entity, use one path with the string "*" to match all
   * fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializePropertiesPatchOptions(data: any): PropertiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePropertiesPatchOptions(data: any): PropertiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsAdmin#propertiesUpdateDataRetentionSettings.
 */
export interface PropertiesUpdateDataRetentionSettingsOptions {
  /**
   * Required. The list of fields to be updated. Field names must be in snake
   * case (e.g., "field_to_update"). Omitted fields will not be updated. To
   * replace the entire entity, use one path with the string "*" to match all
   * fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializePropertiesUpdateDataRetentionSettingsOptions(data: any): PropertiesUpdateDataRetentionSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePropertiesUpdateDataRetentionSettingsOptions(data: any): PropertiesUpdateDataRetentionSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}