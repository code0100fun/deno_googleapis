// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Search Ads 360 API Client for Deno
 * ==================================
 * 
 * The Search Ads 360 API allows developers to automate uploading conversions and downloading reports from Search Ads 360.
 * 
 * Docs: https://developers.google.com/search-ads
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Search Ads 360 API allows developers to automate uploading conversions
 * and downloading reports from Search Ads 360.
 */
export class doubleclickSearch {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://doubleclicksearch.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieves a list of conversions from a DoubleClick Search engine account.
   *
   * @param advertiserId Numeric ID of the advertiser.
   * @param agencyId Numeric ID of the agency.
   * @param engineAccountId Numeric ID of the engine account.
   */
  async conversionGet(advertiserId: bigint, agencyId: bigint, engineAccountId: bigint, opts: ConversionGetOptions = {}): Promise<ConversionList> {
    advertiserId = String(advertiserId);
    agencyId = String(agencyId);
    engineAccountId = String(engineAccountId);
    opts = serializeConversionGetOptions(opts);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/agency/${ agencyId }/advertiser/${ advertiserId }/engine/${ engineAccountId }/conversion`);
    if (opts.adGroupId !== undefined) {
      url.searchParams.append("adGroupId", String(opts.adGroupId));
    }
    if (opts.adId !== undefined) {
      url.searchParams.append("adId", String(opts.adId));
    }
    if (opts.campaignId !== undefined) {
      url.searchParams.append("campaignId", String(opts.campaignId));
    }
    if (opts.criterionId !== undefined) {
      url.searchParams.append("criterionId", String(opts.criterionId));
    }
    if (opts.customerId !== undefined) {
      url.searchParams.append("customerId", String(opts.customerId));
    }
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.rowCount !== undefined) {
      url.searchParams.append("rowCount", String(opts.rowCount));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.startRow !== undefined) {
      url.searchParams.append("startRow", String(opts.startRow));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConversionList(data);
  }

  /**
   * Retrieves a list of conversions from a DoubleClick Search engine account.
   *
   * @param customerId Customer ID of a client account in the new Search Ads 360 experience.
   */
  async conversionGetByCustomerId(customerId: string, opts: ConversionGetByCustomerIdOptions = {}): Promise<ConversionList> {
    opts = serializeConversionGetByCustomerIdOptions(opts);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/customer/${ customerId }/conversion`);
    if (opts.adGroupId !== undefined) {
      url.searchParams.append("adGroupId", String(opts.adGroupId));
    }
    if (opts.adId !== undefined) {
      url.searchParams.append("adId", String(opts.adId));
    }
    if (opts.advertiserId !== undefined) {
      url.searchParams.append("advertiserId", String(opts.advertiserId));
    }
    if (opts.agencyId !== undefined) {
      url.searchParams.append("agencyId", String(opts.agencyId));
    }
    if (opts.campaignId !== undefined) {
      url.searchParams.append("campaignId", String(opts.campaignId));
    }
    if (opts.criterionId !== undefined) {
      url.searchParams.append("criterionId", String(opts.criterionId));
    }
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.engineAccountId !== undefined) {
      url.searchParams.append("engineAccountId", String(opts.engineAccountId));
    }
    if (opts.rowCount !== undefined) {
      url.searchParams.append("rowCount", String(opts.rowCount));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.startRow !== undefined) {
      url.searchParams.append("startRow", String(opts.startRow));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConversionList(data);
  }

  /**
   * Inserts a batch of new conversions into DoubleClick Search.
   *
   */
  async conversionInsert(req: ConversionList): Promise<ConversionList> {
    req = serializeConversionList(req);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/conversion`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConversionList(data);
  }

  /**
   * Updates a batch of conversions in DoubleClick Search.
   *
   */
  async conversionUpdate(req: ConversionList): Promise<ConversionList> {
    req = serializeConversionList(req);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/conversion`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeConversionList(data);
  }

  /**
   * Updates the availabilities of a batch of floodlight activities in
   * DoubleClick Search.
   *
   */
  async conversionUpdateAvailability(req: UpdateAvailabilityRequest): Promise<UpdateAvailabilityResponse> {
    req = serializeUpdateAvailabilityRequest(req);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/conversion/updateAvailability`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUpdateAvailabilityResponse(data);
  }

  /**
   * Generates and returns a report immediately.
   *
   */
  async reportsGenerate(req: ReportRequest): Promise<Report> {
    req = serializeReportRequest(req);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/reports/generate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReport(data);
  }

  /**
   * Polls for the status of a report request.
   *
   * @param reportId ID of the report request being polled.
   */
  async reportsGet(reportId: string): Promise<Report> {
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/reports/${ reportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReport(data);
  }

  /**
   * Downloads a report file encoded in UTF-8.
   *
   * @param reportFragment The index of the report fragment to download.
   * @param reportId ID of the report.
   */
  async reportsGetFile(reportFragment: number, reportId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/reports/${ reportId }/files/${ reportFragment }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
  }

  /**
   * Downloads a csv file(encoded in UTF-8) that contains ID mappings between
   * legacy SA360 and new SA360. The file includes all children entities of the
   * given advertiser(e.g. engine accounts, campaigns, ad groups, etc.) that
   * exist in both legacy SA360 and new SA360.
   *
   * @param advertiserId Legacy SA360 advertiser ID.
   * @param agencyId Legacy SA360 agency ID.
   */
  async reportsGetIdMappingFile(advertiserId: bigint, agencyId: bigint): Promise<IdMappingFile> {
    advertiserId = String(advertiserId);
    agencyId = String(agencyId);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/agency/${ agencyId }/advertiser/${ advertiserId }/idmapping`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as IdMappingFile;
  }

  /**
   * Inserts a report request into the reporting system.
   *
   */
  async reportsRequest(req: ReportRequest): Promise<Report> {
    req = serializeReportRequest(req);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/reports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReport(data);
  }

  /**
   * Retrieve the list of saved columns for a specified advertiser.
   *
   * @param advertiserId DS ID of the advertiser.
   * @param agencyId DS ID of the agency.
   */
  async savedColumnsList(advertiserId: bigint, agencyId: bigint): Promise<SavedColumnList> {
    advertiserId = String(advertiserId);
    agencyId = String(agencyId);
    const url = new URL(`${this.#baseUrl}doubleclicksearch/v2/agency/${ agencyId }/advertiser/${ advertiserId }/savedcolumns`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SavedColumnList;
  }
}

/**
 * A message containing availability data relevant to DoubleClick Search.
 */
export interface Availability {
  /**
   * DS advertiser ID.
   */
  advertiserId?: bigint;
  /**
   * DS agency ID.
   */
  agencyId?: bigint;
  /**
   * The time by which all conversions have been uploaded, in epoch millis UTC.
   */
  availabilityTimestamp?: bigint;
  /**
   * Customer ID of a client account in the new Search Ads 360 experience.
   */
  customerId?: string;
  /**
   * The numeric segmentation identifier (for example, DoubleClick Search
   * Floodlight activity ID).
   */
  segmentationId?: bigint;
  /**
   * The friendly segmentation identifier (for example, DoubleClick Search
   * Floodlight activity name).
   */
  segmentationName?: string;
  /**
   * The segmentation type that this availability is for (its default value is
   * `FLOODLIGHT`).
   */
  segmentationType?: string;
}

function serializeAvailability(data: any): Availability {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? String(data["agencyId"]) : undefined,
    availabilityTimestamp: data["availabilityTimestamp"] !== undefined ? String(data["availabilityTimestamp"]) : undefined,
    segmentationId: data["segmentationId"] !== undefined ? String(data["segmentationId"]) : undefined,
  };
}

function deserializeAvailability(data: any): Availability {
  return {
    ...data,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? BigInt(data["agencyId"]) : undefined,
    availabilityTimestamp: data["availabilityTimestamp"] !== undefined ? BigInt(data["availabilityTimestamp"]) : undefined,
    segmentationId: data["segmentationId"] !== undefined ? BigInt(data["segmentationId"]) : undefined,
  };
}

/**
 * A conversion containing data relevant to DoubleClick Search.
 */
export interface Conversion {
  /**
   * DS ad group ID.
   */
  adGroupId?: bigint;
  /**
   * DS ad ID.
   */
  adId?: bigint;
  /**
   * DS advertiser ID.
   */
  advertiserId?: bigint;
  /**
   * DS agency ID.
   */
  agencyId?: bigint;
  /**
   * Available to advertisers only after contacting DoubleClick Search customer
   * support.
   */
  attributionModel?: string;
  /**
   * DS campaign ID.
   */
  campaignId?: bigint;
  /**
   * Sales channel for the product. Acceptable values are: - "`local`": a
   * physical store - "`online`": an online store
   */
  channel?: string;
  /**
   * DS click ID for the conversion.
   */
  clickId?: string;
  /**
   * For offline conversions, advertisers provide this ID. Advertisers can
   * specify any ID that is meaningful to them. Each conversion in a request
   * must specify a unique ID, and the combination of ID and timestamp must be
   * unique amongst all conversions within the advertiser. For online
   * conversions, DS copies the `dsConversionId` or `floodlightOrderId` into
   * this property depending on the advertiser's Floodlight instructions.
   */
  conversionId?: string;
  /**
   * The time at which the conversion was last modified, in epoch millis UTC.
   */
  conversionModifiedTimestamp?: bigint;
  /**
   * The time at which the conversion took place, in epoch millis UTC.
   */
  conversionTimestamp?: string;
  /**
   * Available to advertisers only after contacting DoubleClick Search customer
   * support.
   */
  countMillis?: bigint;
  /**
   * DS criterion (keyword) ID.
   */
  criterionId?: bigint;
  /**
   * The currency code for the conversion's revenue. Should be in ISO 4217
   * alphabetic (3-char) format.
   */
  currencyCode?: string;
  /**
   * Custom dimensions for the conversion, which can be used to filter data in
   * a report.
   */
  customDimension?: CustomDimension[];
  /**
   * Customer ID of a client account in the new Search Ads 360 experience.
   */
  customerId?: string;
  /**
   * Custom metrics for the conversion.
   */
  customMetric?: CustomMetric[];
  /**
   * The type of device on which the conversion occurred.
   */
  deviceType?: string;
  /**
   * ID that DoubleClick Search generates for each conversion.
   */
  dsConversionId?: bigint;
  /**
   * DS engine account ID.
   */
  engineAccountId?: bigint;
  /**
   * The Floodlight order ID provided by the advertiser for the conversion.
   */
  floodlightOrderId?: string;
  /**
   * ID that DS generates and uses to uniquely identify the inventory account
   * that contains the product.
   */
  inventoryAccountId?: bigint;
  /**
   * The country registered for the Merchant Center feed that contains the
   * product. Use an ISO 3166 code to specify a country.
   */
  productCountry?: string;
  /**
   * DS product group ID.
   */
  productGroupId?: bigint;
  /**
   * The product ID (SKU).
   */
  productId?: string;
  /**
   * The language registered for the Merchant Center feed that contains the
   * product. Use an ISO 639 code to specify a language.
   */
  productLanguage?: string;
  /**
   * The quantity of this conversion, in millis.
   */
  quantityMillis?: bigint;
  /**
   * The revenue amount of this `TRANSACTION` conversion, in micros (value
   * multiplied by 1000000, no decimal). For example, to specify a revenue value
   * of "10" enter "10000000" (10 million) in your request.
   */
  revenueMicros?: string;
  /**
   * The numeric segmentation identifier (for example, DoubleClick Search
   * Floodlight activity ID).
   */
  segmentationId?: bigint;
  /**
   * The friendly segmentation identifier (for example, DoubleClick Search
   * Floodlight activity name).
   */
  segmentationName?: string;
  /**
   * The segmentation type of this conversion (for example, `FLOODLIGHT`).
   */
  segmentationType?: string;
  /**
   * The state of the conversion, that is, either `ACTIVE` or `REMOVED`. Note:
   * state DELETED is deprecated.
   */
  state?: string;
  /**
   * The ID of the local store for which the product was advertised. Applicable
   * only when the channel is "`local`".
   */
  storeId?: string;
  /**
   * The type of the conversion, that is, either `ACTION` or `TRANSACTION`. An
   * `ACTION` conversion is an action by the user that has no monetarily
   * quantifiable value, while a `TRANSACTION` conversion is an action that does
   * have a monetarily quantifiable value. Examples are email list signups
   * (`ACTION`) versus ecommerce purchases (`TRANSACTION`).
   */
  type?: string;
}

function serializeConversion(data: any): Conversion {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? String(data["adGroupId"]) : undefined,
    adId: data["adId"] !== undefined ? String(data["adId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? String(data["agencyId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    conversionModifiedTimestamp: data["conversionModifiedTimestamp"] !== undefined ? String(data["conversionModifiedTimestamp"]) : undefined,
    countMillis: data["countMillis"] !== undefined ? String(data["countMillis"]) : undefined,
    criterionId: data["criterionId"] !== undefined ? String(data["criterionId"]) : undefined,
    dsConversionId: data["dsConversionId"] !== undefined ? String(data["dsConversionId"]) : undefined,
    engineAccountId: data["engineAccountId"] !== undefined ? String(data["engineAccountId"]) : undefined,
    inventoryAccountId: data["inventoryAccountId"] !== undefined ? String(data["inventoryAccountId"]) : undefined,
    productGroupId: data["productGroupId"] !== undefined ? String(data["productGroupId"]) : undefined,
    quantityMillis: data["quantityMillis"] !== undefined ? String(data["quantityMillis"]) : undefined,
    segmentationId: data["segmentationId"] !== undefined ? String(data["segmentationId"]) : undefined,
  };
}

function deserializeConversion(data: any): Conversion {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? BigInt(data["adGroupId"]) : undefined,
    adId: data["adId"] !== undefined ? BigInt(data["adId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? BigInt(data["agencyId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    conversionModifiedTimestamp: data["conversionModifiedTimestamp"] !== undefined ? BigInt(data["conversionModifiedTimestamp"]) : undefined,
    countMillis: data["countMillis"] !== undefined ? BigInt(data["countMillis"]) : undefined,
    criterionId: data["criterionId"] !== undefined ? BigInt(data["criterionId"]) : undefined,
    dsConversionId: data["dsConversionId"] !== undefined ? BigInt(data["dsConversionId"]) : undefined,
    engineAccountId: data["engineAccountId"] !== undefined ? BigInt(data["engineAccountId"]) : undefined,
    inventoryAccountId: data["inventoryAccountId"] !== undefined ? BigInt(data["inventoryAccountId"]) : undefined,
    productGroupId: data["productGroupId"] !== undefined ? BigInt(data["productGroupId"]) : undefined,
    quantityMillis: data["quantityMillis"] !== undefined ? BigInt(data["quantityMillis"]) : undefined,
    segmentationId: data["segmentationId"] !== undefined ? BigInt(data["segmentationId"]) : undefined,
  };
}

/**
 * Additional options for doubleclickSearch#conversionGetByCustomerId.
 */
export interface ConversionGetByCustomerIdOptions {
  /**
   * Numeric ID of the ad group.
   */
  adGroupId?: bigint;
  /**
   * Numeric ID of the ad.
   */
  adId?: bigint;
  /**
   * Numeric ID of the advertiser.
   */
  advertiserId?: bigint;
  /**
   * Numeric ID of the agency.
   */
  agencyId?: bigint;
  /**
   * Numeric ID of the campaign.
   */
  campaignId?: bigint;
  /**
   * Numeric ID of the criterion.
   */
  criterionId?: bigint;
  /**
   * Last date (inclusive) on which to retrieve conversions. Format is
   * yyyymmdd.
   */
  endDate: number;
  /**
   * Numeric ID of the engine account.
   */
  engineAccountId?: bigint;
  /**
   * The number of conversions to return per call.
   */
  rowCount: number;
  /**
   * First date (inclusive) on which to retrieve conversions. Format is
   * yyyymmdd.
   */
  startDate: number;
  /**
   * The 0-based starting index for retrieving conversions results.
   */
  startRow: number;
}

function serializeConversionGetByCustomerIdOptions(data: any): ConversionGetByCustomerIdOptions {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? String(data["adGroupId"]) : undefined,
    adId: data["adId"] !== undefined ? String(data["adId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? String(data["advertiserId"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? String(data["agencyId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    criterionId: data["criterionId"] !== undefined ? String(data["criterionId"]) : undefined,
    engineAccountId: data["engineAccountId"] !== undefined ? String(data["engineAccountId"]) : undefined,
  };
}

function deserializeConversionGetByCustomerIdOptions(data: any): ConversionGetByCustomerIdOptions {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? BigInt(data["adGroupId"]) : undefined,
    adId: data["adId"] !== undefined ? BigInt(data["adId"]) : undefined,
    advertiserId: data["advertiserId"] !== undefined ? BigInt(data["advertiserId"]) : undefined,
    agencyId: data["agencyId"] !== undefined ? BigInt(data["agencyId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    criterionId: data["criterionId"] !== undefined ? BigInt(data["criterionId"]) : undefined,
    engineAccountId: data["engineAccountId"] !== undefined ? BigInt(data["engineAccountId"]) : undefined,
  };
}

/**
 * Additional options for doubleclickSearch#conversionGet.
 */
export interface ConversionGetOptions {
  /**
   * Numeric ID of the ad group.
   */
  adGroupId?: bigint;
  /**
   * Numeric ID of the ad.
   */
  adId?: bigint;
  /**
   * Numeric ID of the campaign.
   */
  campaignId?: bigint;
  /**
   * Numeric ID of the criterion.
   */
  criterionId?: bigint;
  /**
   * Customer ID of a client account in the new Search Ads 360 experience.
   */
  customerId?: string;
  /**
   * Last date (inclusive) on which to retrieve conversions. Format is
   * yyyymmdd.
   */
  endDate: number;
  /**
   * The number of conversions to return per call.
   */
  rowCount: number;
  /**
   * First date (inclusive) on which to retrieve conversions. Format is
   * yyyymmdd.
   */
  startDate: number;
  /**
   * The 0-based starting index for retrieving conversions results.
   */
  startRow: number;
}

function serializeConversionGetOptions(data: any): ConversionGetOptions {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? String(data["adGroupId"]) : undefined,
    adId: data["adId"] !== undefined ? String(data["adId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? String(data["campaignId"]) : undefined,
    criterionId: data["criterionId"] !== undefined ? String(data["criterionId"]) : undefined,
  };
}

function deserializeConversionGetOptions(data: any): ConversionGetOptions {
  return {
    ...data,
    adGroupId: data["adGroupId"] !== undefined ? BigInt(data["adGroupId"]) : undefined,
    adId: data["adId"] !== undefined ? BigInt(data["adId"]) : undefined,
    campaignId: data["campaignId"] !== undefined ? BigInt(data["campaignId"]) : undefined,
    criterionId: data["criterionId"] !== undefined ? BigInt(data["criterionId"]) : undefined,
  };
}

/**
 * A list of conversions.
 */
export interface ConversionList {
  /**
   * The conversions being requested.
   */
  conversion?: Conversion[];
  /**
   * Identifies this as a ConversionList resource. Value: the fixed string
   * doubleclicksearch#conversionList.
   */
  kind?: string;
}

function serializeConversionList(data: any): ConversionList {
  return {
    ...data,
    conversion: data["conversion"] !== undefined ? data["conversion"].map((item: any) => (serializeConversion(item))) : undefined,
  };
}

function deserializeConversionList(data: any): ConversionList {
  return {
    ...data,
    conversion: data["conversion"] !== undefined ? data["conversion"].map((item: any) => (deserializeConversion(item))) : undefined,
  };
}

/**
 * A message containing the custom dimension.
 */
export interface CustomDimension {
  /**
   * Custom dimension name.
   */
  name?: string;
  /**
   * Custom dimension value.
   */
  value?: string;
}

/**
 * A message containing the custom metric.
 */
export interface CustomMetric {
  /**
   * Custom metric name.
   */
  name?: string;
  /**
   * Custom metric numeric value.
   */
  value?: number;
}

/**
 * File returned to
 * https://developers.google.com/search-ads/v2/reference/reports/getIdMappingFile.
 */
export interface IdMappingFile {
}

/**
 * A DoubleClick Search report. This object contains the report request, some
 * report metadata such as currency code, and the generated report rows or
 * report files.
 */
export interface Report {
  /**
   * Asynchronous report only. Contains a list of generated report files once
   * the report has successfully completed.
   */
  files?: {
    byteCount?: bigint;
    url?: string;
  }[];
  /**
   * Asynchronous report only. Id of the report.
   */
  id?: string;
  /**
   * Asynchronous report only. True if and only if the report has completed
   * successfully and the report files are ready to be downloaded.
   */
  isReportReady?: boolean;
  /**
   * Identifies this as a Report resource. Value: the fixed string
   * `doubleclicksearch#report`.
   */
  kind?: string;
  /**
   * The request that created the report. Optional fields not specified in the
   * original request are filled with default values.
   */
  request?: ReportRequest;
  /**
   * The number of report rows generated by the report, not including headers.
   */
  rowCount?: number;
  /**
   * Synchronous report only. Generated report rows.
   */
  rows?: ReportRow[];
  /**
   * The currency code of all monetary values produced in the report, including
   * values that are set by users (e.g., keyword bid settings) and metrics
   * (e.g., cost and revenue). The currency code of a report is determined by
   * the `statisticsCurrency` field of the report request.
   */
  statisticsCurrencyCode?: string;
  /**
   * If all statistics of the report are sourced from the same time zone, this
   * would be it. Otherwise the field is unset.
   */
  statisticsTimeZone?: string;
}

function serializeReport(data: any): Report {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => ({
      ...item,
      byteCount: item["byteCount"] !== undefined ? String(item["byteCount"]) : undefined,
    })) : undefined,
    request: data["request"] !== undefined ? serializeReportRequest(data["request"]) : undefined,
  };
}

function deserializeReport(data: any): Report {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => ({
      ...item,
      byteCount: item["byteCount"] !== undefined ? BigInt(item["byteCount"]) : undefined,
    })) : undefined,
    request: data["request"] !== undefined ? deserializeReportRequest(data["request"]) : undefined,
  };
}

/**
 * A request object used to create a DoubleClick Search report.
 */
export interface ReportApiColumnSpec {
  /**
   * Name of a DoubleClick Search column to include in the report.
   */
  columnName?: string;
  /**
   * Segments a report by a custom dimension. The report must be scoped to an
   * advertiser or lower, and the custom dimension must already be set up in
   * DoubleClick Search. The custom dimension name, which appears in DoubleClick
   * Search, is case sensitive.\ If used in a conversion report, returns the
   * value of the specified custom dimension for the given conversion, if set.
   * This column does not segment the conversion report.
   */
  customDimensionName?: string;
  /**
   * Name of a custom metric to include in the report. The report must be
   * scoped to an advertiser or lower, and the custom metric must already be set
   * up in DoubleClick Search. The custom metric name, which appears in
   * DoubleClick Search, is case sensitive.
   */
  customMetricName?: string;
  /**
   * Inclusive day in YYYY-MM-DD format. When provided, this overrides the
   * overall time range of the report for this column only. Must be provided
   * together with `startDate`.
   */
  endDate?: string;
  /**
   * Synchronous report only. Set to `true` to group by this column. Defaults
   * to `false`.
   */
  groupByColumn?: boolean;
  /**
   * Text used to identify this column in the report output; defaults to
   * `columnName` or `savedColumnName` when not specified. This can be used to
   * prevent collisions between DoubleClick Search columns and saved columns
   * with the same name.
   */
  headerText?: string;
  /**
   * The platform that is used to provide data for the custom dimension.
   * Acceptable values are "floodlight".
   */
  platformSource?: string;
  /**
   * Returns metrics only for a specific type of product activity. Accepted
   * values are: - "`sold`": returns metrics only for products that were sold -
   * "`advertised`": returns metrics only for products that were advertised in a
   * Shopping campaign, and that might or might not have been sold
   */
  productReportPerspective?: string;
  /**
   * Name of a saved column to include in the report. The report must be scoped
   * at advertiser or lower, and this saved column must already be created in
   * the DoubleClick Search UI.
   */
  savedColumnName?: string;
  /**
   * Inclusive date in YYYY-MM-DD format. When provided, this overrides the
   * overall time range of the report for this column only. Must be provided
   * together with `endDate`.
   */
  startDate?: string;
}

/**
 * A request object used to create a DoubleClick Search report.
 */
export interface ReportRequest {
  /**
   * The columns to include in the report. This includes both DoubleClick
   * Search columns and saved columns. For DoubleClick Search columns, only the
   * `columnName` parameter is required. For saved columns only the
   * `savedColumnName` parameter is required. Both `columnName` and
   * `savedColumnName` cannot be set in the same stanza.\ The maximum number of
   * columns per request is 300.
   */
  columns?: ReportApiColumnSpec[];
  /**
   * Format that the report should be returned in. Currently `csv` or `tsv` is
   * supported.
   */
  downloadFormat?: string;
  /**
   * A list of filters to be applied to the report.\ The maximum number of
   * filters per request is 300.
   */
  filters?: {
    column?: ReportApiColumnSpec;
    operator?: string;
    values?: any[];
  }[];
  /**
   * Determines if removed entities should be included in the report. Defaults
   * to `false`. Deprecated, please use `includeRemovedEntities` instead.
   */
  includeDeletedEntities?: boolean;
  /**
   * Determines if removed entities should be included in the report. Defaults
   * to `false`.
   */
  includeRemovedEntities?: boolean;
  /**
   * Asynchronous report only. The maximum number of rows per report file. A
   * large report is split into many files based on this field. Acceptable
   * values are `1000000` to `100000000`, inclusive.
   */
  maxRowsPerFile?: number;
  /**
   * Synchronous report only. A list of columns and directions defining sorting
   * to be performed on the report rows.\ The maximum number of orderings per
   * request is 300.
   */
  orderBy?: {
    column?: ReportApiColumnSpec;
    sortOrder?: string;
  }[];
  /**
   * The reportScope is a set of IDs that are used to determine which subset of
   * entities will be returned in the report. The full lineage of IDs from the
   * lowest scoped level desired up through agency is required.
   */
  reportScope?: {
    adGroupId?: bigint;
    adId?: bigint;
    advertiserId?: bigint;
    agencyId?: bigint;
    campaignId?: bigint;
    engineAccountId?: bigint;
    keywordId?: bigint;
  };
  /**
   * Determines the type of rows that are returned in the report. For example,
   * if you specify `reportType: keyword`, each row in the report will contain
   * data about a keyword. See the [Types of
   * Reports](/search-ads/v2/report-types/) reference for the columns that are
   * available for each type.
   */
  reportType?: string;
  /**
   * Synchronous report only. The maximum number of rows to return; additional
   * rows are dropped. Acceptable values are `0` to `10000`, inclusive. Defaults
   * to `10000`.
   */
  rowCount?: number;
  /**
   * Synchronous report only. Zero-based index of the first row to return.
   * Acceptable values are `0` to `50000`, inclusive. Defaults to `0`.
   */
  startRow?: number;
  /**
   * Specifies the currency in which monetary will be returned. Possible values
   * are: `usd`, `agency` (valid if the report is scoped to agency or lower),
   * `advertiser` (valid if the report is scoped to * advertiser or lower), or
   * `account` (valid if the report is scoped to engine account or lower).
   */
  statisticsCurrency?: string;
  /**
   * If metrics are requested in a report, this argument will be used to
   * restrict the metrics to a specific time range.
   */
  timeRange?: {
    changedAttributesSinceTimestamp?: string;
    changedMetricsSinceTimestamp?: string;
    endDate?: string;
    startDate?: string;
  };
  /**
   * If `true`, the report would only be created if all the requested stat data
   * are sourced from a single timezone. Defaults to `false`.
   */
  verifySingleTimeZone?: boolean;
}

function serializeReportRequest(data: any): ReportRequest {
  return {
    ...data,
    reportScope: data["reportScope"] !== undefined ? {
      ...data["reportScope"],
      adGroupId: data["reportScope"]["adGroupId"] !== undefined ? String(data["reportScope"]["adGroupId"]) : undefined,
      adId: data["reportScope"]["adId"] !== undefined ? String(data["reportScope"]["adId"]) : undefined,
      advertiserId: data["reportScope"]["advertiserId"] !== undefined ? String(data["reportScope"]["advertiserId"]) : undefined,
      agencyId: data["reportScope"]["agencyId"] !== undefined ? String(data["reportScope"]["agencyId"]) : undefined,
      campaignId: data["reportScope"]["campaignId"] !== undefined ? String(data["reportScope"]["campaignId"]) : undefined,
      engineAccountId: data["reportScope"]["engineAccountId"] !== undefined ? String(data["reportScope"]["engineAccountId"]) : undefined,
      keywordId: data["reportScope"]["keywordId"] !== undefined ? String(data["reportScope"]["keywordId"]) : undefined,
    } : undefined,
  };
}

function deserializeReportRequest(data: any): ReportRequest {
  return {
    ...data,
    reportScope: data["reportScope"] !== undefined ? {
      ...data["reportScope"],
      adGroupId: data["reportScope"]["adGroupId"] !== undefined ? BigInt(data["reportScope"]["adGroupId"]) : undefined,
      adId: data["reportScope"]["adId"] !== undefined ? BigInt(data["reportScope"]["adId"]) : undefined,
      advertiserId: data["reportScope"]["advertiserId"] !== undefined ? BigInt(data["reportScope"]["advertiserId"]) : undefined,
      agencyId: data["reportScope"]["agencyId"] !== undefined ? BigInt(data["reportScope"]["agencyId"]) : undefined,
      campaignId: data["reportScope"]["campaignId"] !== undefined ? BigInt(data["reportScope"]["campaignId"]) : undefined,
      engineAccountId: data["reportScope"]["engineAccountId"] !== undefined ? BigInt(data["reportScope"]["engineAccountId"]) : undefined,
      keywordId: data["reportScope"]["keywordId"] !== undefined ? BigInt(data["reportScope"]["keywordId"]) : undefined,
    } : undefined,
  };
}

/**
 * A row in a DoubleClick Search report.
 */
export interface ReportRow {
  [key: string]: any;
}

/**
 * A saved column
 */
export interface SavedColumn {
  /**
   * Identifies this as a SavedColumn resource. Value: the fixed string
   * doubleclicksearch#savedColumn.
   */
  kind?: string;
  /**
   * The name of the saved column.
   */
  savedColumnName?: string;
  /**
   * The type of data this saved column will produce.
   */
  type?: string;
}

/**
 * A list of saved columns. Advertisers create saved columns to report on
 * Floodlight activities, Google Analytics goals, or custom KPIs. To request
 * reports with saved columns, you'll need the saved column names that are
 * available from this list.
 */
export interface SavedColumnList {
  /**
   * The saved columns being requested.
   */
  items?: SavedColumn[];
  /**
   * Identifies this as a SavedColumnList resource. Value: the fixed string
   * doubleclicksearch#savedColumnList.
   */
  kind?: string;
}

/**
 * The request to update availability.
 */
export interface UpdateAvailabilityRequest {
  /**
   * The availabilities being requested.
   */
  availabilities?: Availability[];
}

function serializeUpdateAvailabilityRequest(data: any): UpdateAvailabilityRequest {
  return {
    ...data,
    availabilities: data["availabilities"] !== undefined ? data["availabilities"].map((item: any) => (serializeAvailability(item))) : undefined,
  };
}

function deserializeUpdateAvailabilityRequest(data: any): UpdateAvailabilityRequest {
  return {
    ...data,
    availabilities: data["availabilities"] !== undefined ? data["availabilities"].map((item: any) => (deserializeAvailability(item))) : undefined,
  };
}

/**
 * The response to a update availability request.
 */
export interface UpdateAvailabilityResponse {
  /**
   * The availabilities being returned.
   */
  availabilities?: Availability[];
}

function serializeUpdateAvailabilityResponse(data: any): UpdateAvailabilityResponse {
  return {
    ...data,
    availabilities: data["availabilities"] !== undefined ? data["availabilities"].map((item: any) => (serializeAvailability(item))) : undefined,
  };
}

function deserializeUpdateAvailabilityResponse(data: any): UpdateAvailabilityResponse {
  return {
    ...data,
    availabilities: data["availabilities"] !== undefined ? data["availabilities"].map((item: any) => (deserializeAvailability(item))) : undefined,
  };
}