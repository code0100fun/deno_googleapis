// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Travel Impact Model API Client for Deno
 * =======================================
 * 
 * Travel Impact Model API lets you query travel carbon emission estimates.
 * 
 * Docs: https://developers.google.com/travel/impact-model
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Travel Impact Model API lets you query travel carbon emission estimates.
 */
export class TravelImpactModel {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://travelimpactmodel.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Stateless method to retrieve emission estimates. Details on how emission
   * estimates are computed: https://github.com/google/travel-impact-model The
   * response will contain all entries that match the input flight legs, in the
   * same order. If there are no estimates available for a certain flight leg,
   * the response will return the flight leg object with empty emission fields.
   * The request will still be considered successful. Reasons for missing
   * emission estimates include: - The flight is unknown to the server. - The
   * input flight leg is missing one or more identifiers. - The flight date is
   * in the past. - The aircraft type is not supported by the model. - Missing
   * seat configuration. The request can contain up to 1000 flight legs. If the
   * request has more than 1000 direct flights, if will fail with an
   * INVALID_ARGUMENT error.
   *
   */
  async flightsComputeFlightEmissions(req: ComputeFlightEmissionsRequest): Promise<ComputeFlightEmissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/flights:computeFlightEmissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ComputeFlightEmissionsResponse;
  }
}

/**
 * Input definition for the ComputeFlightEmissions request.
 */
export interface ComputeFlightEmissionsRequest {
  /**
   * Required. Direct flights to return emission estimates for.
   */
  flights?: Flight[];
}

/**
 * Output definition for the ComputeFlightEmissions response.
 */
export interface ComputeFlightEmissionsResponse {
  /**
   * List of flight legs with emission estimates.
   */
  flightEmissions?: FlightWithEmissions[];
  /**
   * The model version under which emission estimates for all flights in this
   * response were computed.
   */
  modelVersion?: ModelVersion;
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
 * Grouped emissions per seating class results.
 */
export interface EmissionsGramsPerPax {
  /**
   * Emissions for one passenger in business class in grams. This field is
   * always computed and populated, regardless of whether the aircraft has
   * business class seats or not.
   */
  business?: number;
  /**
   * Emissions for one passenger in economy class in grams. This field is
   * always computed and populated, regardless of whether the aircraft has
   * economy class seats or not.
   */
  economy?: number;
  /**
   * Emissions for one passenger in first class in grams. This field is always
   * computed and populated, regardless of whether the aircraft has first class
   * seats or not.
   */
  first?: number;
  /**
   * Emissions for one passenger in premium economy class in grams. This field
   * is always computed and populated, regardless of whether the aircraft has
   * premium economy class seats or not.
   */
  premiumEconomy?: number;
}

/**
 * All details related to a single request item for a direct flight emission
 * estimates.
 */
export interface Flight {
  /**
   * Required. Date of the flight in the time zone of the origin airport. Must
   * be a date in the present or future.
   */
  departureDate?: Date;
  /**
   * Required. IATA airport code for flight destination, e.g. "JFK".
   */
  destination?: string;
  /**
   * Required. Flight number, e.g. 324.
   */
  flightNumber?: number;
  /**
   * Required. IATA carrier code, e.g. "AA".
   */
  operatingCarrierCode?: string;
  /**
   * Required. IATA airport code for flight origin, e.g. "LHR".
   */
  origin?: string;
}

/**
 * Direct flight with emission estimates.
 */
export interface FlightWithEmissions {
  /**
   * Optional. Per-passenger emission estimate numbers. Will not be present if
   * emissions could not be computed. For the list of reasons why emissions
   * could not be computed, see ComputeFlightEmissions.
   */
  emissionsGramsPerPax?: EmissionsGramsPerPax;
  /**
   * Required. Matches the flight identifiers in the request. Note: all IATA
   * codes are capitalized.
   */
  flight?: Flight;
}

/**
 * Travel Impact Model version. For more information about the model versioning
 * see https://github.com/google/travel-impact-model/#versioning.
 */
export interface ModelVersion {
  /**
   * Dated versions: Model datasets are recreated with refreshed input data but
   * no change to the algorithms regularly.
   */
  dated?: string;
  /**
   * Major versions: Major changes to methodology (e.g. adding new data sources
   * to the model that lead to major output changes). Such changes will be
   * infrequent and announced well in advance. Might involve API version
   * changes, which will respect guidelines in
   * https://cloud.google.com/endpoints/docs/openapi/versioning-an-api#backwards-incompatible
   */
  major?: number;
  /**
   * Minor versions: Changes to the model that, while being consistent across
   * schema versions, change the model parameters or implementation.
   */
  minor?: number;
  /**
   * Patch versions: Implementation changes meant to address bugs or
   * inaccuracies in the model implementation.
   */
  patch?: number;
}