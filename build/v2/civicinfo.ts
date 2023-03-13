// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Civic Information API Client for Deno
 * ============================================
 * 
 * Provides polling places, early vote locations, contest data, election officials, and government representatives for U.S. residential addresses.
 * 
 * Docs: https://developers.google.com/civic-information/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides polling places, early vote locations, contest data, election
 * officials, and government representatives for U.S. residential addresses.
 */
export class Civicinfo {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://civicinfo.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Searches for political divisions by their natural name or OCD ID.
   *
   */
  async divisionsSearch(opts: DivisionsSearchOptions = {}): Promise<DivisionSearchResponse> {
    const url = new URL(`${this.#baseUrl}civicinfo/v2/divisions`);
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DivisionSearchResponse;
  }

  /**
   * List of available elections to query.
   *
   */
  async electionsElectionQuery(): Promise<ElectionsQueryResponse> {
    const url = new URL(`${this.#baseUrl}civicinfo/v2/elections`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeElectionsQueryResponse(data);
  }

  /**
   * Looks up information relevant to a voter based on the voter's registered
   * address.
   *
   */
  async electionsVoterInfoQuery(opts: ElectionsVoterInfoQueryOptions = {}): Promise<VoterInfoResponse> {
    opts = serializeElectionsVoterInfoQueryOptions(opts);
    const url = new URL(`${this.#baseUrl}civicinfo/v2/voterinfo`);
    if (opts.address !== undefined) {
      url.searchParams.append("address", String(opts.address));
    }
    if (opts.electionId !== undefined) {
      url.searchParams.append("electionId", String(opts.electionId));
    }
    if (opts.officialOnly !== undefined) {
      url.searchParams.append("officialOnly", String(opts.officialOnly));
    }
    if (opts.returnAllAvailableData !== undefined) {
      url.searchParams.append("returnAllAvailableData", String(opts.returnAllAvailableData));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVoterInfoResponse(data);
  }

  /**
   * Looks up political geography and representative information for a single
   * address.
   *
   */
  async representativesRepresentativeInfoByAddress(opts: RepresentativesRepresentativeInfoByAddressOptions = {}): Promise<RepresentativeInfoResponse> {
    const url = new URL(`${this.#baseUrl}civicinfo/v2/representatives`);
    if (opts.address !== undefined) {
      url.searchParams.append("address", String(opts.address));
    }
    if (opts.includeOffices !== undefined) {
      url.searchParams.append("includeOffices", String(opts.includeOffices));
    }
    if (opts.levels !== undefined) {
      url.searchParams.append("levels", String(opts.levels));
    }
    if (opts.roles !== undefined) {
      url.searchParams.append("roles", String(opts.roles));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRepresentativeInfoResponse(data);
  }

  /**
   * Looks up representative information for a single geographic division.
   *
   * @param ocdId The Open Civic Data division identifier of the division to look up.
   */
  async representativesRepresentativeInfoByDivision(ocdId: string, opts: RepresentativesRepresentativeInfoByDivisionOptions = {}): Promise<RepresentativeInfoData> {
    const url = new URL(`${this.#baseUrl}civicinfo/v2/representatives/${ ocdId }`);
    if (opts.levels !== undefined) {
      url.searchParams.append("levels", String(opts.levels));
    }
    if (opts.recursive !== undefined) {
      url.searchParams.append("recursive", String(opts.recursive));
    }
    if (opts.roles !== undefined) {
      url.searchParams.append("roles", String(opts.roles));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRepresentativeInfoData(data);
  }
}

/**
 * Describes information about a regional election administrative area.
 */
export interface AdministrationRegion {
  /**
   * The election administration body for this area.
   */
  electionAdministrationBody?: AdministrativeBody;
  /**
   * The city or county that provides election information for this voter. This
   * object can have the same elements as state.
   */
  local_jurisdiction?: AdministrationRegion;
  /**
   * The name of the jurisdiction.
   */
  name?: string;
  /**
   * A list of sources for this area. If multiple sources are listed the data
   * has been aggregated from those sources.
   */
  sources?: Source[];
}

/**
 * Information about an election administrative body (e.g. County Board of
 * Elections).
 */
export interface AdministrativeBody {
  /**
   * A URL provided by this administrative body for information on absentee
   * voting.
   */
  absenteeVotingInfoUrl?: string;
  /**
   * A URL provided by this administrative body to give contest information to
   * the voter.
   */
  ballotInfoUrl?: string;
  /**
   * The mailing address of this administrative body.
   */
  correspondenceAddress?: SimpleAddressType;
  /**
   * A URL provided by this administrative body for looking up general election
   * information.
   */
  electionInfoUrl?: string;
  /**
   * A last minute or emergency notification text provided by this
   * administrative body.
   */
  electionNoticeText?: string;
  /**
   * A URL provided by this administrative body for additional information
   * related to the last minute or emergency notification.
   */
  electionNoticeUrl?: string;
  /**
   * The election officials for this election administrative body.
   */
  electionOfficials?: ElectionOfficial[];
  /**
   * A URL provided by this administrative body for confirming that the voter
   * is registered to vote.
   */
  electionRegistrationConfirmationUrl?: string;
  /**
   * A URL provided by this administrative body for looking up how to register
   * to vote.
   */
  electionRegistrationUrl?: string;
  /**
   * A URL provided by this administrative body describing election rules to
   * the voter.
   */
  electionRulesUrl?: string;
  /**
   * A description of the hours of operation for this administrative body.
   */
  hoursOfOperation?: string;
  /**
   * The name of this election administrative body.
   */
  name?: string;
  /**
   * The physical address of this administrative body.
   */
  physicalAddress?: SimpleAddressType;
  /**
   * A description of the services this administrative body may provide.
   */
  voter_services?: string[];
  /**
   * A URL provided by this administrative body for looking up where to vote.
   */
  votingLocationFinderUrl?: string;
}

/**
 * Information about a candidate running for elected office.
 */
export interface Candidate {
  /**
   * The URL for the candidate's campaign web site.
   */
  candidateUrl?: string;
  /**
   * A list of known (social) media channels for this candidate.
   */
  channels?: Channel[];
  /**
   * The email address for the candidate's campaign.
   */
  email?: string;
  /**
   * The candidate's name. If this is a joint ticket it will indicate the name
   * of the candidate at the top of a ticket followed by a / and that name of
   * candidate at the bottom of the ticket. e.g. "Mitt Romney / Paul Ryan"
   */
  name?: string;
  /**
   * The order the candidate appears on the ballot for this contest.
   */
  orderOnBallot?: bigint;
  /**
   * The full name of the party the candidate is a member of.
   */
  party?: string;
  /**
   * The voice phone number for the candidate's campaign office.
   */
  phone?: string;
  /**
   * A URL for a photo of the candidate.
   */
  photoUrl?: string;
}

function serializeCandidate(data: any): Candidate {
  return {
    ...data,
    orderOnBallot: data["orderOnBallot"] !== undefined ? String(data["orderOnBallot"]) : undefined,
  };
}

function deserializeCandidate(data: any): Candidate {
  return {
    ...data,
    orderOnBallot: data["orderOnBallot"] !== undefined ? BigInt(data["orderOnBallot"]) : undefined,
  };
}

/**
 * A social media or web channel for a candidate.
 */
export interface Channel {
  /**
   * The unique public identifier for the candidate's channel.
   */
  id?: string;
  /**
   * The type of channel. The following is a list of types of channels, but is
   * not exhaustive. More channel types may be added at a later time. One of:
   * GooglePlus, YouTube, Facebook, Twitter
   */
  type?: string;
}

/**
 * Information about a contest that appears on a voter's ballot.
 */
export interface Contest {
  /**
   * A number specifying the position of this contest on the voter's ballot.
   */
  ballotPlacement?: bigint;
  /**
   * The official title on the ballot for this contest, only where available.
   */
  ballotTitle?: string;
  /**
   * The candidate choices for this contest.
   */
  candidates?: Candidate[];
  /**
   * Information about the electoral district that this contest is in.
   */
  district?: ElectoralDistrict;
  /**
   * A description of any additional eligibility requirements for voting in
   * this contest.
   */
  electorateSpecifications?: string;
  /**
   * The levels of government of the office for this contest. There may be more
   * than one in cases where a jurisdiction effectively acts at two different
   * levels of government; for example, the mayor of the District of Columbia
   * acts at "locality" level, but also effectively at both
   * "administrative-area-2" and "administrative-area-1".
   */
  level?:  | "international" | "country" | "administrativeArea1" | "regional" | "administrativeArea2" | "locality" | "subLocality1" | "subLocality2" | "special"[];
  /**
   * The number of candidates that will be elected to office in this contest.
   */
  numberElected?: bigint;
  /**
   * The number of candidates that a voter may vote for in this contest.
   */
  numberVotingFor?: bigint;
  /**
   * The name of the office for this contest.
   */
  office?: string;
  /**
   * If this is a partisan election, the name of the party/parties it is for.
   */
  primaryParties?: string[];
  /**
   * [DEPRECATED] If this is a partisan election, the name of the party it is
   * for. This field as deprecated in favor of the array "primaryParties", as
   * contests may contain more than one party.
   */
  primaryParty?: string;
  /**
   * The set of ballot responses for the referendum. A ballot response
   * represents a line on the ballot. Common examples might include "yes" or
   * "no" for referenda. This field is only populated for contests of type
   * 'Referendum'.
   */
  referendumBallotResponses?: string[];
  /**
   * Specifies a short summary of the referendum that is typically on the
   * ballot below the title but above the text. This field is only populated for
   * contests of type 'Referendum'.
   */
  referendumBrief?: string;
  /**
   * A statement in opposition to the referendum. It does not necessarily
   * appear on the ballot. This field is only populated for contests of type
   * 'Referendum'.
   */
  referendumConStatement?: string;
  /**
   * Specifies what effect abstaining (not voting) on the proposition will have
   * (i.e. whether abstaining is considered a vote against it). This field is
   * only populated for contests of type 'Referendum'.
   */
  referendumEffectOfAbstain?: string;
  /**
   * The threshold of votes that the referendum needs in order to pass, e.g.
   * "two-thirds". This field is only populated for contests of type
   * 'Referendum'.
   */
  referendumPassageThreshold?: string;
  /**
   * A statement in favor of the referendum. It does not necessarily appear on
   * the ballot. This field is only populated for contests of type 'Referendum'.
   */
  referendumProStatement?: string;
  /**
   * A brief description of the referendum. This field is only populated for
   * contests of type 'Referendum'.
   */
  referendumSubtitle?: string;
  /**
   * The full text of the referendum. This field is only populated for contests
   * of type 'Referendum'.
   */
  referendumText?: string;
  /**
   * The title of the referendum (e.g. 'Proposition 42'). This field is only
   * populated for contests of type 'Referendum'.
   */
  referendumTitle?: string;
  /**
   * A link to the referendum. This field is only populated for contests of
   * type 'Referendum'.
   */
  referendumUrl?: string;
  /**
   * The roles which this office fulfills.
   */
  roles?:  | "headOfState" | "headOfGovernment" | "deputyHeadOfGovernment" | "governmentOfficer" | "executiveCouncil" | "legislatorUpperBody" | "legislatorLowerBody" | "highestCourtJudge" | "judge" | "schoolBoard" | "specialPurposeOfficer" | "otherRole"[];
  /**
   * A list of sources for this contest. If multiple sources are listed, the
   * data has been aggregated from those sources.
   */
  sources?: Source[];
  /**
   * "Yes" or "No" depending on whether this a contest being held outside the
   * normal election cycle.
   */
  special?: string;
  /**
   * The type of contest. Usually this will be 'General', 'Primary', or
   * 'Run-off' for contests with candidates. For referenda this will be
   * 'Referendum'. For Retention contests this will typically be 'Retention'.
   */
  type?: string;
}

function serializeContest(data: any): Contest {
  return {
    ...data,
    ballotPlacement: data["ballotPlacement"] !== undefined ? String(data["ballotPlacement"]) : undefined,
    candidates: data["candidates"] !== undefined ? data["candidates"].map((item: any) => (serializeCandidate(item))) : undefined,
    numberElected: data["numberElected"] !== undefined ? String(data["numberElected"]) : undefined,
    numberVotingFor: data["numberVotingFor"] !== undefined ? String(data["numberVotingFor"]) : undefined,
  };
}

function deserializeContest(data: any): Contest {
  return {
    ...data,
    ballotPlacement: data["ballotPlacement"] !== undefined ? BigInt(data["ballotPlacement"]) : undefined,
    candidates: data["candidates"] !== undefined ? data["candidates"].map((item: any) => (deserializeCandidate(item))) : undefined,
    numberElected: data["numberElected"] !== undefined ? BigInt(data["numberElected"]) : undefined,
    numberVotingFor: data["numberVotingFor"] !== undefined ? BigInt(data["numberVotingFor"]) : undefined,
  };
}

/**
 * The result of a division search query.
 */
export interface DivisionSearchResponse {
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "civicinfo#divisionSearchResponse".
   */
  kind?: string;
  results?: DivisionSearchResult[];
}

/**
 * Represents a political geographic division that matches the requested query.
 */
export interface DivisionSearchResult {
  /**
   * Other Open Civic Data identifiers that refer to the same division -- for
   * example, those that refer to other political divisions whose boundaries are
   * defined to be coterminous with this one. For example,
   * ocd-division/country:us/state:wy will include an alias of
   * ocd-division/country:us/state:wy/cd:1, since Wyoming has only one
   * Congressional district.
   */
  aliases?: string[];
  /**
   * The name of the division.
   */
  name?: string;
  /**
   * The unique Open Civic Data identifier for this division
   */
  ocdId?: string;
}

/**
 * Additional options for Civicinfo#divisionsSearch.
 */
export interface DivisionsSearchOptions {
  /**
   * The search query. Queries can cover any parts of a OCD ID or a human
   * readable division name. All words given in the query are treated as
   * required patterns. In addition to that, most query operators of the Apache
   * Lucene library are supported. See
   * http://lucene.apache.org/core/2_9_4/queryparsersyntax.html
   */
  query?: string;
}

/**
 * Information about the election that was queried.
 */
export interface Election {
  /**
   * Day of the election in YYYY-MM-DD format.
   */
  electionDay?: string;
  /**
   * The unique ID of this election.
   */
  id?: bigint;
  /**
   * A displayable name for the election.
   */
  name?: string;
  /**
   * The political division of the election. Represented as an OCD Division ID.
   * Voters within these political jurisdictions are covered by this election.
   * This is typically a state such as ocd-division/country:us/state:ca or for
   * the midterms or general election the entire US (i.e.
   * ocd-division/country:us).
   */
  ocdDivisionId?: string;
  shapeLookupBehavior?:  | "shapeLookupDefault" | "shapeLookupDisabled" | "shapeLookupEnabled";
}

function serializeElection(data: any): Election {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeElection(data: any): Election {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Information about individual election officials.
 */
export interface ElectionOfficial {
  /**
   * The email address of the election official.
   */
  emailAddress?: string;
  /**
   * The fax number of the election official.
   */
  faxNumber?: string;
  /**
   * The full name of the election official.
   */
  name?: string;
  /**
   * The office phone number of the election official.
   */
  officePhoneNumber?: string;
  /**
   * The title of the election official.
   */
  title?: string;
}

/**
 * The list of elections available for this version of the API.
 */
export interface ElectionsQueryResponse {
  /**
   * A list of available elections
   */
  elections?: Election[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "civicinfo#electionsQueryResponse".
   */
  kind?: string;
}

function serializeElectionsQueryResponse(data: any): ElectionsQueryResponse {
  return {
    ...data,
    elections: data["elections"] !== undefined ? data["elections"].map((item: any) => (serializeElection(item))) : undefined,
  };
}

function deserializeElectionsQueryResponse(data: any): ElectionsQueryResponse {
  return {
    ...data,
    elections: data["elections"] !== undefined ? data["elections"].map((item: any) => (deserializeElection(item))) : undefined,
  };
}

/**
 * Additional options for Civicinfo#electionsVoterInfoQuery.
 */
export interface ElectionsVoterInfoQueryOptions {
  /**
   * The registered address of the voter to look up.
   */
  address: string;
  /**
   * The unique ID of the election to look up. A list of election IDs can be
   * obtained at https://www.googleapis.com/civicinfo/{version}/elections. If no
   * election ID is specified in the query and there is more than one election
   * with data for the given voter, the additional elections are provided in the
   * otherElections response field.
   */
  electionId?: bigint;
  /**
   * If set to true, only data from official state sources will be returned.
   */
  officialOnly?: boolean;
  /**
   * If set to true, the query will return the success code and include any
   * partial information when it is unable to determine a matching address or
   * unable to determine the election for electionId=0 queries.
   */
  returnAllAvailableData?: boolean;
}

function serializeElectionsVoterInfoQueryOptions(data: any): ElectionsVoterInfoQueryOptions {
  return {
    ...data,
    electionId: data["electionId"] !== undefined ? String(data["electionId"]) : undefined,
  };
}

function deserializeElectionsVoterInfoQueryOptions(data: any): ElectionsVoterInfoQueryOptions {
  return {
    ...data,
    electionId: data["electionId"] !== undefined ? BigInt(data["electionId"]) : undefined,
  };
}

/**
 * Describes the geographic scope of a contest.
 */
export interface ElectoralDistrict {
  /**
   * An identifier for this district, relative to its scope. For example, the
   * 34th State Senate district would have id "34" and a scope of stateUpper.
   */
  id?: string;
  /**
   * The name of the district.
   */
  name?: string;
  /**
   * The geographic scope of this district. If unspecified the district's
   * geography is not known. One of: national, statewide, congressional,
   * stateUpper, stateLower, countywide, judicial, schoolBoard, cityWide,
   * township, countyCouncil, cityCouncil, ward, special
   */
  scope?:  | "statewide" | "congressional" | "stateUpper" | "stateLower" | "countywide" | "judicial" | "schoolBoard" | "citywide" | "special" | "countyCouncil" | "township" | "ward" | "cityCouncil" | "national";
}

/**
 * A globally unique identifier associated with each feature. We use 128-bit
 * identifiers so that we have lots of bits available to distinguish between
 * features. The feature id currently consists of a 64-bit "cell id" that
 * **sometimes** corresponds to the approximate centroid of the feature, plus a
 * 64-bit fingerprint of other identifying information. See more on each
 * respective field in its comments. Feature ids are first assigned when the
 * data is created in MapFacts. After initial creation of the feature, they are
 * immutable. This means that the only properties that you should rely on are
 * that they are unique, and that cell_ids often - but not always - preserve
 * spatial locality. The degree of locality varies as the feature undergoes
 * geometry changes, and should not in general be considered a firm guarantee of
 * the location of any particular feature. In fact, some locationless features
 * have randomized cell IDs! Consumers of FeatureProtos from Mapfacts are
 * guaranteed that fprints in the id field of features will be globally unique.
 * Using the fprint allows consumers who don't need the spatial benefit of cell
 * ids to uniquely identify features in a 64-bit address space. This property is
 * not guaranteed for other sources of FeatureProtos.
 */
export interface FeatureIdProto {
  /**
   * The S2CellId corresponding to the approximate location of this feature as
   * of when it was first created. This can be of variable accuracy, ranging
   * from the exact centroid of the feature at creation, a very large S2 Cell,
   * or even being completely randomized for locationless features. Cell ids
   * have the nice property that they follow a space-filling curve over the
   * surface of the earth. (See s2cellid.h for details.) WARNING: Clients should
   * only use cell IDs to perform spatial locality optimizations. There is no
   * strict guarantee that the cell ID of a feature is related to the current
   * geometry of the feature in any way.
   */
  cellId?: bigint;
  /**
   * A 64-bit fingerprint used to identify features. Most clients should rely
   * on MapFacts or OneRing to choose fingerprints. If creating new fprints, the
   * strategy should be chosen so that the chance of collision is remote or
   * non-existent, and the distribution should be reasonably uniform. For
   * example, if the source data assigns unique ids to features, then a
   * fingerprint of the provider name, version, and source id is sufficient.
   */
  fprint?: bigint;
  /**
   * A place for clients to attach arbitrary data to a feature ID. Never set in
   * MapFacts.
   */
  temporaryData?: MessageSet;
}

function serializeFeatureIdProto(data: any): FeatureIdProto {
  return {
    ...data,
    cellId: data["cellId"] !== undefined ? String(data["cellId"]) : undefined,
    fprint: data["fprint"] !== undefined ? String(data["fprint"]) : undefined,
  };
}

function deserializeFeatureIdProto(data: any): FeatureIdProto {
  return {
    ...data,
    cellId: data["cellId"] !== undefined ? BigInt(data["cellId"]) : undefined,
    fprint: data["fprint"] !== undefined ? BigInt(data["fprint"]) : undefined,
  };
}

/**
 * Detailed summary of the result from geocoding an address
 */
export interface GeocodingSummary {
  /**
   * Represents the best estimate of whether or not the input address was fully
   * understood and the address is correctly componentized. Mirrors the
   * same-name field in geostore.staging.AddressLinkupScoringProto.
   */
  addressUnderstood?: boolean;
  /**
   * The ID of the FeatureProto returned by the geocoder
   */
  featureId?: FeatureIdProto;
  /**
   * The feature type for the FeatureProto returned by the geocoder
   */
  featureType?:  | "typeAny" | "typeTransportation" | "typeRoute" | "typeDeprecatedHighwayDoNotUse" | "typeHighway" | "typeHighway1" | "typeHighway2" | "typeHighway3" | "typeHighway4" | "typeHighway5" | "typeHighway6" | "typeHighway7" | "typeHighway8" | "typeHighway9" | "typeBicycleRoute" | "typeTrail" | "typeSegment" | "typeRoad" | "typeRailway" | "typeStandardTrack" | "typeJrTrack" | "typeNarrowTrack" | "typeMonorailTrack" | "typeSubwayTrack" | "typeLightRailTrack" | "typeBroadTrack" | "typeHighSpeedRail" | "typeTrolleyTrack" | "typeFerry" | "typeFerryBoat" | "typeFerryTrain" | "typeVirtualSegment" | "typeIntersection" | "typeTransit" | "typeTransitStation" | "typeBusStation" | "typeTramwayStation" | "typeTrainStation" | "typeSubwayStation" | "typeFerryTerminal" | "typeAirport" | "typeAirportCivil" | "typeAirportMilitary" | "typeAirportMixed" | "typeHeliport" | "typeSeaplaneBase" | "typeAirstrip" | "typeCableCarStation" | "typeGondolaLiftStation" | "typeFunicularStation" | "typeSpecialStation" | "typeHorseCarriageStation" | "typeMonorailStation" | "typeSeaport" | "typeTransitStop" | "typeTransitTrip" | "typeTransitDeparture" | "typeTransitLeg" | "typeTransitLine" | "typeTransitAgencyDeprecatedValue" | "typeTransitTransfer" | "typeSegmentPath" | "typeRoadSign" | "typeIntersectionGroup" | "typePathway" | "typeRestrictionGroup" | "typeTollCluster" | "typePolitical" | "typeCountry" | "typeAdministrativeArea" | "typeAdministrativeArea1" | "typeUsState" | "typeGbCountry" | "typeJpTodoufuken" | "typeAdministrativeArea2" | "typeGbFormerPostalCounty" | "typeGbTraditionalCounty" | "typeAdministrativeArea3" | "typeAdministrativeArea4" | "typeAdministrativeArea5" | "typeAdministrativeArea6" | "typeAdministrativeArea7" | "typeAdministrativeArea8" | "typeAdministrativeArea9" | "typeColloquialArea" | "typeReservation" | "typeLocality" | "typeGbPostTown" | "typeJpGun" | "typeJpShikuchouson" | "typeJpSubShikuchouson" | "typeColloquialCity" | "typeSublocality" | "typeUsBorough" | "typeGbDependentLocality" | "typeJpOoaza" | "typeJpKoaza" | "typeJpGaiku" | "typeGbDoubleDependentLocality" | "typeJpChiban" | "typeJpEdaban" | "typeSublocality1" | "typeSublocality2" | "typeSublocality3" | "typeSublocality4" | "typeSublocality5" | "typeNeighborhood" | "typeConstituency" | "typeDesignatedMarketArea" | "typeSchoolDistrict" | "typeLandParcel" | "typeDisputedArea" | "typePoliceJurisdiction" | "typeStatisticalArea" | "typeConstituencyFuture" | "typePark" | "typeGolfCourse" | "typeLocalPark" | "typeNationalPark" | "typeUsNationalPark" | "typeUsNationalMonument" | "typeNationalForest" | "typeProvincialPark" | "typeProvincialForest" | "typeCampgrounds" | "typeHikingArea" | "typeBusiness" | "typeGovernment" | "typeBorderCrossing" | "typeCityHall" | "typeCourthouse" | "typeEmbassy" | "typeLibrary" | "typeSchool" | "typeUniversity" | "typeEmergency" | "typeHospital" | "typePharmacy" | "typePolice" | "typeFire" | "typeDoctor" | "typeDentist" | "typeVeterinarian" | "typeTravelService" | "typeLodging" | "typeRestaurant" | "typeGasStation" | "typeParking" | "typePostOffice" | "typeRestArea" | "typeCashMachine" | "typeCarRental" | "typeCarRepair" | "typeShopping" | "typeGrocery" | "typeTouristDestination" | "typeEcoTouristDestination" | "typeBirdWatching" | "typeFishing" | "typeHunting" | "typeNatureReserve" | "typeTemple" | "typeChurch" | "typeGurudwara" | "typeHinduTemple" | "typeMosque" | "typeSynagogue" | "typeStadium" | "typeBar" | "typeMovieRental" | "typeCoffee" | "typeGolf" | "typeBank" | "typeDoodle" | "typeGrounds" | "typeAirportGrounds" | "typeBuildingGrounds" | "typeCemetery" | "typeHospitalGrounds" | "typeIndustrial" | "typeMilitary" | "typeShoppingCenter" | "typeSportsComplex" | "typeUniversityGrounds" | "typeDeprecatedTarmac" | "typeEnclosedTrafficArea" | "typeParkingLot" | "typeParkingGarage" | "typeOffRoadArea" | "typeBorder" | "typeBuilding" | "typeGeocodedAddress" | "typeNaturalFeature" | "typeTerrain" | "typeSand" | "typeBeach" | "typeDune" | "typeRocky" | "typeIce" | "typeGlacier" | "typeBuiltUpArea" | "typeVegetation" | "typeShrubbery" | "typeWoods" | "typeAgricultural" | "typeGrassland" | "typeTundra" | "typeDesert" | "typeSaltFlat" | "typeWater" | "typeOcean" | "typeBay" | "typeBight" | "typeLagoon" | "typeSea" | "typeStrait" | "typeInlet" | "typeFjord" | "typeLake" | "typeSeasonalLake" | "typeReservoir" | "typePond" | "typeRiver" | "typeRapids" | "typeDistributary" | "typeConfluence" | "typeWaterfall" | "typeSpring" | "typeGeyser" | "typeHotSpring" | "typeSeasonalRiver" | "typeWadi" | "typeEstuary" | "typeWetland" | "typeWaterNavigation" | "typeFord" | "typeCanal" | "typeHarbor" | "typeChannel" | "typeReef" | "typeReefFlat" | "typeReefGrowth" | "typeReefExtent" | "typeReefRockSubmerged" | "typeIrrigation" | "typeDam" | "typeDrinkingWater" | "typeCurrent" | "typeWateringHole" | "typeTectonic" | "typeWateringHoleDeprecated" | "typeVolcano" | "typeLavaField" | "typeFissure" | "typeFault" | "typeLandMass" | "typeContinent" | "typeIsland" | "typeAtoll" | "typeOceanRockExposed" | "typeCay" | "typePeninsula" | "typeIsthmus" | "typeElevated" | "typePeak" | "typeNunatak" | "typeSpur" | "typePass" | "typePlateau" | "typeRidge" | "typeRavine" | "typeCrater" | "typeKarst" | "typeCliff" | "typeVista" | "typeDigitalElevationModel" | "typeUpland" | "typeTerrace" | "typeSlope" | "typeContourLine" | "typePan" | "typeUnstableHillside" | "typeMountainRange" | "typeUndersea" | "typeSubmarineSeamount" | "typeSubmarineRidge" | "typeSubmarineGap" | "typeSubmarinePlateau" | "typeSubmarineDeep" | "typeSubmarineValley" | "typeSubmarineBasin" | "typeSubmarineSlope" | "typeSubmarineCliff" | "typeSubmarinePlain" | "typeSubmarineFractureZone" | "typeCave" | "typeRock" | "typeArchipelago" | "typePostal" | "typePostalCode" | "typePostalCodePrefix" | "typePremise" | "typeSubPremise" | "typeSuite" | "typePostTown" | "typePostalRound" | "typeMetaFeature" | "typeDataSource" | "typeLocale" | "typeTimezone" | "typeBusinessChain" | "typePhoneNumberPrefix" | "typePhoneNumberAreaCode" | "typeBusinessCorridor" | "typeAddressTemplate" | "typeTransitAgency" | "typeFutureGeometry" | "typeEvent" | "typeEarthquake" | "typeHurricane" | "typeWeatherCondition" | "typeTransient" | "typeEntrance" | "typeCartographic" | "typeHighTension" | "typeSkiTrail" | "typeSkiLift" | "typeSkiBoundary" | "typeWatershedBoundary" | "typeTarmac" | "typeWall" | "typePicnicArea" | "typePlayGround" | "typeTrailHead" | "typeGolfTeeingGround" | "typeGolfPuttingGreen" | "typeGolfRough" | "typeGolfSandBunker" | "typeGolfFairway" | "typeGolfHole" | "typeDeprecatedGolfShop" | "typeCampingSite" | "typeDesignatedBarbecuePit" | "typeDesignatedCookingArea" | "typeCampfirePit" | "typeWaterFountain" | "typeLitterReceptacle" | "typeLockerArea" | "typeAnimalEnclosure" | "typeCartographicLine" | "typeEstablishment" | "typeEstablishmentGrounds" | "typeEstablishmentBuilding" | "typeEstablishmentPoi" | "typeEstablishmentService" | "typeCelestial" | "typeRoadMonitor" | "typePublicSpacesAndMonuments" | "typeStatue" | "typeTownSquare" | "typeLevel" | "typeCompound" | "typeCompoundGrounds" | "typeCompoundBuilding" | "typeCompoundSection" | "typeTerminalPoint" | "typeRegulatedArea" | "typeLogicalBorder" | "typeDoNotUseReservedToCatchGeneratedFiles" | "typeUnknown";
  /**
   * Precision of the center point (lat/long) of the geocoded FeatureProto
   */
  positionPrecisionMeters?: number;
  /**
   * The query sent to the geocoder
   */
  queryString?: string;
}

function serializeGeocodingSummary(data: any): GeocodingSummary {
  return {
    ...data,
    featureId: data["featureId"] !== undefined ? serializeFeatureIdProto(data["featureId"]) : undefined,
  };
}

function deserializeGeocodingSummary(data: any): GeocodingSummary {
  return {
    ...data,
    featureId: data["featureId"] !== undefined ? deserializeFeatureIdProto(data["featureId"]) : undefined,
  };
}

/**
 * Describes a political geography.
 */
export interface GeographicDivision {
  /**
   * Any other valid OCD IDs that refer to the same division.\n\nBecause OCD
   * IDs are meant to be human-readable and at least somewhat predictable, there
   * are occasionally several identifiers for a single division. These
   * identifiers are defined to be equivalent to one another, and one is always
   * indicated as the primary identifier. The primary identifier will be
   * returned in ocd_id above, and any other equivalent valid identifiers will
   * be returned in this list.\n\nFor example, if this division's OCD ID is
   * ocd-division/country:us/district:dc, this will contain
   * ocd-division/country:us/state:dc.
   */
  alsoKnownAs?: string[];
  /**
   * The name of the division.
   */
  name?: string;
  /**
   * List of indices in the offices array, one for each office elected from
   * this division. Will only be present if includeOffices was true (or absent)
   * in the request.
   */
  officeIndices?: number[];
}

/**
 * This is proto2's version of MessageSet.
 */
export interface MessageSet {
}

/**
 * Information about an Office held by one or more Officials.
 */
export interface Office {
  /**
   * The OCD ID of the division with which this office is associated.
   */
  divisionId?: string;
  /**
   * The levels of government of which this office is part. There may be more
   * than one in cases where a jurisdiction effectively acts at two different
   * levels of government; for example, the mayor of the District of Columbia
   * acts at "locality" level, but also effectively at both
   * "administrative-area-2" and "administrative-area-1".
   */
  levels?:  | "international" | "country" | "administrativeArea1" | "regional" | "administrativeArea2" | "locality" | "subLocality1" | "subLocality2" | "special"[];
  /**
   * The human-readable name of the office.
   */
  name?: string;
  /**
   * List of indices in the officials array of people who presently hold this
   * office.
   */
  officialIndices?: number[];
  /**
   * The roles which this office fulfills. Roles are not meant to be
   * exhaustive, or to exactly specify the entire set of responsibilities of a
   * given office, but are meant to be rough categories that are useful for
   * general selection from or sorting of a list of offices.
   */
  roles?:  | "headOfState" | "headOfGovernment" | "deputyHeadOfGovernment" | "governmentOfficer" | "executiveCouncil" | "legislatorUpperBody" | "legislatorLowerBody" | "highestCourtJudge" | "judge" | "schoolBoard" | "specialPurposeOfficer" | "otherRole"[];
  /**
   * A list of sources for this office. If multiple sources are listed, the
   * data has been aggregated from those sources.
   */
  sources?: Source[];
}

/**
 * Information about a person holding an elected office.
 */
export interface Official {
  /**
   * Addresses at which to contact the official.
   */
  address?: SimpleAddressType[];
  /**
   * A list of known (social) media channels for this official.
   */
  channels?: Channel[];
  /**
   * The direct email addresses for the official.
   */
  emails?: string[];
  /**
   * Detailed summary about the official's address's geocoding
   */
  geocodingSummaries?: GeocodingSummary[];
  /**
   * The official's name.
   */
  name?: string;
  /**
   * The full name of the party the official belongs to.
   */
  party?: string;
  /**
   * The official's public contact phone numbers.
   */
  phones?: string[];
  /**
   * A URL for a photo of the official.
   */
  photoUrl?: string;
  /**
   * The official's public website URLs.
   */
  urls?: string[];
}

function serializeOfficial(data: any): Official {
  return {
    ...data,
    geocodingSummaries: data["geocodingSummaries"] !== undefined ? data["geocodingSummaries"].map((item: any) => (serializeGeocodingSummary(item))) : undefined,
  };
}

function deserializeOfficial(data: any): Official {
  return {
    ...data,
    geocodingSummaries: data["geocodingSummaries"] !== undefined ? data["geocodingSummaries"].map((item: any) => (deserializeGeocodingSummary(item))) : undefined,
  };
}

/**
 * A location where a voter can vote. This may be an early vote site, an
 * election day voting location, or a drop off location for a completed ballot.
 */
export interface PollingLocation {
  /**
   * The address of the location.
   */
  address?: SimpleAddressType;
  /**
   * The last date that this early vote site or drop off location may be used.
   * This field is not populated for polling locations.
   */
  endDate?: string;
  /**
   * Latitude of the location, in degrees north of the equator. Note this field
   * may not be available for some locations.
   */
  latitude?: number;
  /**
   * Longitude of the location, in degrees east of the Prime Meridian. Note
   * this field may not be available for some locations.
   */
  longitude?: number;
  /**
   * The name of the early vote site or drop off location. This field is not
   * populated for polling locations.
   */
  name?: string;
  /**
   * Notes about this location (e.g. accessibility ramp or entrance to use).
   */
  notes?: string;
  /**
   * A description of when this location is open.
   */
  pollingHours?: string;
  /**
   * A list of sources for this location. If multiple sources are listed the
   * data has been aggregated from those sources.
   */
  sources?: Source[];
  /**
   * The first date that this early vote site or drop off location may be used.
   * This field is not populated for polling locations.
   */
  startDate?: string;
  /**
   * The services provided by this early vote site or drop off location. This
   * field is not populated for polling locations.
   */
  voterServices?: string;
}

export interface Precinct {
  /**
   * ID of the AdministrationRegion message for this precinct. Corresponds to
   * LocalityId xml tag.
   */
  administrationRegionId?: string;
  /**
   * ID(s) of the Contest message(s) for this precinct.
   */
  contestId?: string[];
  /**
   * Required. Dataset ID. What datasets our Precincts come from.
   */
  datasetId?: bigint;
  /**
   * ID(s) of the PollingLocation message(s) for this precinct.
   */
  earlyVoteSiteId?: string[];
  /**
   * ID(s) of the ElectoralDistrict message(s) for this precinct.
   */
  electoralDistrictId?: string[];
  /**
   * Required. A unique identifier for this precinct.
   */
  id?: string;
  /**
   * Specifies if the precinct runs mail-only elections.
   */
  mailOnly?: boolean;
  /**
   * Required. The name of the precinct.
   */
  name?: string;
  /**
   * The number of the precinct.
   */
  number?: string;
  /**
   * Encouraged. The OCD ID of the precinct
   */
  ocdId?: string[];
  /**
   * ID(s) of the PollingLocation message(s) for this precinct.
   */
  pollingLocationId?: string[];
  /**
   * ID(s) of the SpatialBoundary message(s) for this precinct. Used to specify
   * a geometrical boundary of the precinct.
   */
  spatialBoundaryId?: string[];
  /**
   * If present, this proto corresponds to one portion of split precinct. Other
   * portions of this precinct are guaranteed to have the same `name`. If not
   * present, this proto represents a full precicnt.
   */
  splitName?: string;
  /**
   * Specifies the ward the precinct is contained within.
   */
  ward?: string;
}

function serializePrecinct(data: any): Precinct {
  return {
    ...data,
    datasetId: data["datasetId"] !== undefined ? String(data["datasetId"]) : undefined,
  };
}

function deserializePrecinct(data: any): Precinct {
  return {
    ...data,
    datasetId: data["datasetId"] !== undefined ? BigInt(data["datasetId"]) : undefined,
  };
}

export interface RepresentativeInfoData {
  /**
   * A map of political geographic divisions that contain the requested
   * address, keyed by the unique Open Civic Data identifier for this division.
   */
  divisions?: {
    [key: string]: GeographicDivision
  };
  /**
   * Elected offices referenced by the divisions listed above. Will only be
   * present if includeOffices was true in the request.
   */
  offices?: Office[];
  /**
   * Officials holding the offices listed above. Will only be present if
   * includeOffices was true in the request.
   */
  officials?: Official[];
}

function serializeRepresentativeInfoData(data: any): RepresentativeInfoData {
  return {
    ...data,
    officials: data["officials"] !== undefined ? data["officials"].map((item: any) => (serializeOfficial(item))) : undefined,
  };
}

function deserializeRepresentativeInfoData(data: any): RepresentativeInfoData {
  return {
    ...data,
    officials: data["officials"] !== undefined ? data["officials"].map((item: any) => (deserializeOfficial(item))) : undefined,
  };
}

/**
 * The result of a representative info lookup query.
 */
export interface RepresentativeInfoResponse {
  /**
   * A map of political geographic divisions that contain the requested
   * address, keyed by the unique Open Civic Data identifier for this division.
   */
  divisions?: {
    [key: string]: GeographicDivision
  };
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "civicinfo#representativeInfoResponse".
   */
  kind?: string;
  /**
   * The normalized version of the requested address
   */
  normalizedInput?: SimpleAddressType;
  /**
   * Elected offices referenced by the divisions listed above. Will only be
   * present if includeOffices was true in the request.
   */
  offices?: Office[];
  /**
   * Officials holding the offices listed above. Will only be present if
   * includeOffices was true in the request.
   */
  officials?: Official[];
}

function serializeRepresentativeInfoResponse(data: any): RepresentativeInfoResponse {
  return {
    ...data,
    officials: data["officials"] !== undefined ? data["officials"].map((item: any) => (serializeOfficial(item))) : undefined,
  };
}

function deserializeRepresentativeInfoResponse(data: any): RepresentativeInfoResponse {
  return {
    ...data,
    officials: data["officials"] !== undefined ? data["officials"].map((item: any) => (deserializeOfficial(item))) : undefined,
  };
}

/**
 * Additional options for Civicinfo#representativesRepresentativeInfoByAddress.
 */
export interface RepresentativesRepresentativeInfoByAddressOptions {
  /**
   * The address to look up. May only be specified if the field ocdId is not
   * given in the URL
   */
  address?: string;
  /**
   * Whether to return information about offices and officials. If false, only
   * the top-level district information will be returned.
   */
  includeOffices?: boolean;
  /**
   * A list of office levels to filter by. Only offices that serve at least one
   * of these levels will be returned. Divisions that don't contain a matching
   * office will not be returned.
   */
  levels?:  | "international" | "country" | "administrativeArea1" | "regional" | "administrativeArea2" | "locality" | "subLocality1" | "subLocality2" | "special";
  /**
   * A list of office roles to filter by. Only offices fulfilling one of these
   * roles will be returned. Divisions that don't contain a matching office will
   * not be returned.
   */
  roles?:  | "headOfState" | "headOfGovernment" | "deputyHeadOfGovernment" | "governmentOfficer" | "executiveCouncil" | "legislatorUpperBody" | "legislatorLowerBody" | "highestCourtJudge" | "judge" | "schoolBoard" | "specialPurposeOfficer" | "otherRole";
}

/**
 * Additional options for
 * Civicinfo#representativesRepresentativeInfoByDivision.
 */
export interface RepresentativesRepresentativeInfoByDivisionOptions {
  /**
   * A list of office levels to filter by. Only offices that serve at least one
   * of these levels will be returned. Divisions that don't contain a matching
   * office will not be returned.
   */
  levels?:  | "international" | "country" | "administrativeArea1" | "regional" | "administrativeArea2" | "locality" | "subLocality1" | "subLocality2" | "special";
  /**
   * If true, information about all divisions contained in the division
   * requested will be included as well. For example, if querying
   * ocd-division/country:us/district:dc, this would also return all DC's wards
   * and ANCs.
   */
  recursive?: boolean;
  /**
   * A list of office roles to filter by. Only offices fulfilling one of these
   * roles will be returned. Divisions that don't contain a matching office will
   * not be returned.
   */
  roles?:  | "headOfState" | "headOfGovernment" | "deputyHeadOfGovernment" | "governmentOfficer" | "executiveCouncil" | "legislatorUpperBody" | "legislatorLowerBody" | "highestCourtJudge" | "judge" | "schoolBoard" | "specialPurposeOfficer" | "otherRole";
}

/**
 * A simple representation of an address.
 */
export interface SimpleAddressType {
  /**
   * The city or town for the address.
   */
  city?: string;
  /**
   * The street name and number of this address.
   */
  line1?: string;
  /**
   * The second line the address, if needed.
   */
  line2?: string;
  /**
   * The third line of the address, if needed.
   */
  line3?: string;
  /**
   * The name of the location.
   */
  locationName?: string;
  /**
   * The US two letter state abbreviation of the address.
   */
  state?: string;
  /**
   * The US Postal Zip Code of the address.
   */
  zip?: string;
}

/**
 * Contains information about the data source for the element containing it.
 */
export interface Source {
  /**
   * The name of the data source.
   */
  name?: string;
  /**
   * Whether this data comes from an official government source.
   */
  official?: boolean;
}

/**
 * The result of a voter info lookup query.
 */
export interface VoterInfoResponse {
  /**
   * Contests that will appear on the voter's ballot.
   */
  contests?: Contest[];
  /**
   * Locations where a voter is eligible to drop off a completed ballot. The
   * voter must have received and completed a ballot prior to arriving at the
   * location. The location may not have ballots available on the premises.
   * These locations could be open on or before election day as indicated in the
   * pollingHours field.
   */
  dropOffLocations?: PollingLocation[];
  /**
   * Locations where the voter is eligible to vote early, prior to election
   * day.
   */
  earlyVoteSites?: PollingLocation[];
  /**
   * The election that was queried.
   */
  election?: Election;
  /**
   * Identifies what kind of resource this is. Value: the fixed string
   * "civicinfo#voterInfoResponse".
   */
  kind?: string;
  /**
   * Specifies whether voters in the precinct vote only by mailing their
   * ballots (with the possible option of dropping off their ballots as well).
   */
  mailOnly?: boolean;
  /**
   * The normalized version of the requested address
   */
  normalizedInput?: SimpleAddressType;
  /**
   * When there are multiple elections for a voter address, the otherElections
   * field is populated in the API response and there are two possibilities: 1.
   * If the earliest election is not the intended election, specify the election
   * ID of the desired election in a second API request using the electionId
   * field. 2. If these elections occur on the same day, the API doesn?t return
   * any polling location, contest, or election official information to ensure
   * that an additional query is made. For user-facing applications, we
   * recommend displaying these elections to the user to disambiguate. A second
   * API request using the electionId field should be made for the election that
   * is relevant to the user.
   */
  otherElections?: Election[];
  /**
   * Locations where the voter is eligible to vote on election day.
   */
  pollingLocations?: PollingLocation[];
  precinctId?: string;
  /**
   * The precincts that match this voter's address. Will only be returned for
   * project IDs which have been whitelisted as "partner projects".
   */
  precincts?: Precinct[];
  /**
   * Local Election Information for the state that the voter votes in. For the
   * US, there will only be one element in this array.
   */
  state?: AdministrationRegion[];
}

function serializeVoterInfoResponse(data: any): VoterInfoResponse {
  return {
    ...data,
    contests: data["contests"] !== undefined ? data["contests"].map((item: any) => (serializeContest(item))) : undefined,
    election: data["election"] !== undefined ? serializeElection(data["election"]) : undefined,
    otherElections: data["otherElections"] !== undefined ? data["otherElections"].map((item: any) => (serializeElection(item))) : undefined,
    precincts: data["precincts"] !== undefined ? data["precincts"].map((item: any) => (serializePrecinct(item))) : undefined,
  };
}

function deserializeVoterInfoResponse(data: any): VoterInfoResponse {
  return {
    ...data,
    contests: data["contests"] !== undefined ? data["contests"].map((item: any) => (deserializeContest(item))) : undefined,
    election: data["election"] !== undefined ? deserializeElection(data["election"]) : undefined,
    otherElections: data["otherElections"] !== undefined ? data["otherElections"].map((item: any) => (deserializeElection(item))) : undefined,
    precincts: data["precincts"] !== undefined ? data["precincts"].map((item: any) => (deserializePrecinct(item))) : undefined,
  };
}