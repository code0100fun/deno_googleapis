// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * My Business Lodging API Client for Deno
 * =======================================
 * 
 * The My Business Lodging API enables managing lodging business information on Google. Note - If you have a quota of 0 after enabling the API, please request for GBP API access.
 * 
 * Docs: https://developers.google.com/my-business/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The My Business Lodging API enables managing lodging business information on
 * Google. Note - If you have a quota of 0 after enabling the API, please
 * request for GBP API access.
 */
export class MyBusinessLodging {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://mybusinesslodging.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns the Lodging of a specific location.
   *
   * @param name Required. Google identifier for this location in the form: `locations/{location_id}/lodging`
   */
  async locationsGetLodging(name: string, opts: LocationsGetLodgingOptions = {}): Promise<Lodging> {
    opts = serializeLocationsGetLodgingOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLodging(data);
  }

  /**
   * Returns the Google updated Lodging of a specific location.
   *
   * @param name Required. Google identifier for this location in the form: `locations/{location_id}/lodging`
   */
  async locationsLodgingGetGoogleUpdated(name: string, opts: LocationsLodgingGetGoogleUpdatedOptions = {}): Promise<GetGoogleUpdatedLodgingResponse> {
    opts = serializeLocationsLodgingGetGoogleUpdatedOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }:getGoogleUpdated`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetGoogleUpdatedLodgingResponse(data);
  }

  /**
   * Updates the Lodging of a specific location.
   *
   * @param name Required. Google identifier for this location in the form: `locations/{location_id}/lodging`
   */
  async locationsUpdateLodging(name: string, req: Lodging, opts: LocationsUpdateLodgingOptions = {}): Promise<Lodging> {
    req = serializeLodging(req);
    opts = serializeLocationsUpdateLodgingOptions(opts);
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
    return deserializeLodging(data);
  }
}

/**
 * Physical adaptations made to the property in consideration of varying levels
 * of human physical ability.
 */
export interface Accessibility {
  /**
   * Mobility accessible. Throughout the property there are physical
   * adaptations to ease the stay of a person in a wheelchair, such as
   * auto-opening doors, wide elevators, wide bathrooms or ramps.
   */
  mobilityAccessible?: boolean;
  /**
   * Mobility accessible elevator. A lift that transports people from one level
   * to another and is built to accommodate a wheelchair-using passenger owing
   * to the width of its doors and placement of call buttons.
   */
  mobilityAccessibleElevator?: boolean;
  /**
   * Mobility accessible elevator exception.
   */
  mobilityAccessibleElevatorException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobility accessible exception.
   */
  mobilityAccessibleException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobility accessible parking. The presence of a marked, designated area of
   * prescribed size in which only registered, labeled vehicles transporting a
   * person with physical challenges may park.
   */
  mobilityAccessibleParking?: boolean;
  /**
   * Mobility accessible parking exception.
   */
  mobilityAccessibleParkingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobility accessible pool. A swimming pool equipped with a mechanical chair
   * that can be lowered and raised for the purpose of moving physically
   * challenged guests into and out of the pool. May be powered by electricity
   * or water. Also known as pool lift.
   */
  mobilityAccessiblePool?: boolean;
  /**
   * Mobility accessible pool exception.
   */
  mobilityAccessiblePoolException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Amenities and features related to leisure and play.
 */
export interface Activities {
  /**
   * Beach access. The hotel property is in close proximity to a beach and
   * offers a way to get to that beach. This can include a route to the beach
   * such as stairs down if hotel is on a bluff, or a short trail. Not the same
   * as beachfront (with beach access, the hotel's proximity is close to but not
   * right on the beach).
   */
  beachAccess?: boolean;
  /**
   * Beach access exception.
   */
  beachAccessException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Breach front. The hotel property is physically located on the beach
   * alongside an ocean, sea, gulf, or bay. It is not on a lake, river, stream,
   * or pond. The hotel is not separated from the beach by a public road
   * allowing vehicular, pedestrian, or bicycle traffic.
   */
  beachFront?: boolean;
  /**
   * Beach front exception.
   */
  beachFrontException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Bicycle rental. The hotel owns bicycles that it permits guests to borrow
   * and use. Can be free or for a fee.
   */
  bicycleRental?: boolean;
  /**
   * Bicycle rental exception.
   */
  bicycleRentalException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Boutique stores. There are stores selling clothing, jewelry, art and decor
   * either on hotel premises or very close by. Does not refer to the hotel gift
   * shop or convenience store.
   */
  boutiqueStores?: boolean;
  /**
   * Boutique stores exception.
   */
  boutiqueStoresException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Casino. A space designated for gambling and gaming featuring croupier-run
   * table and card games, as well as electronic slot machines. May be on hotel
   * premises or located nearby.
   */
  casino?: boolean;
  /**
   * Casino exception.
   */
  casinoException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free bicycle rental. The hotel owns bicycles that it permits guests to
   * borrow and use for free.
   */
  freeBicycleRental?: boolean;
  /**
   * Free bicycle rental exception.
   */
  freeBicycleRentalException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free watercraft rental. The hotel owns watercraft that it permits guests
   * to borrow and use for free.
   */
  freeWatercraftRental?: boolean;
  /**
   * Free Watercraft rental exception.
   */
  freeWatercraftRentalException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Game room. There is a room at the hotel containing electronic machines for
   * play such as pinball, prize machines, driving simulators, and other items
   * commonly found at a family fun center or arcade. May also include
   * non-electronic games like pool, foosball, darts, and more. May or may not
   * be designed for children. Also known as arcade, fun room, or family fun
   * center.
   */
  gameRoom?: boolean;
  /**
   * Game room exception.
   */
  gameRoomException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Golf. There is a golf course on hotel grounds or there is a nearby,
   * independently run golf course that allows use by hotel guests. Can be free
   * or for a fee.
   */
  golf?: boolean;
  /**
   * Golf exception.
   */
  golfException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Horseback riding. The hotel has a horse barn onsite or an affiliation with
   * a nearby barn to allow for guests to sit astride a horse and direct it to
   * walk, trot, cantor, gallop and/or jump. Can be in a riding ring, on
   * designated paths, or in the wilderness. May or may not involve instruction.
   */
  horsebackRiding?: boolean;
  /**
   * Horseback riding exception.
   */
  horsebackRidingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Nightclub. There is a room at the hotel with a bar, a dance floor, and
   * seating where designated staffers play dance music. There may also be a
   * designated area for the performance of live music, singing and comedy acts.
   */
  nightclub?: boolean;
  /**
   * Nightclub exception.
   */
  nightclubException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Private beach. The beach which is in close proximity to the hotel is open
   * only to guests.
   */
  privateBeach?: boolean;
  /**
   * Private beach exception.
   */
  privateBeachException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Scuba. The provision for guests to dive under naturally occurring water
   * fitted with a self-contained underwater breathing apparatus (SCUBA) for the
   * purpose of exploring underwater life. Apparatus consists of a tank
   * providing oxygen to the diver through a mask. Requires certification of the
   * diver and supervision. The hotel may have the activity at its own
   * waterfront or have an affiliation with a nearby facility. Required
   * equipment is most often supplied to guests. Can be free or for a fee. Not
   * snorkeling. Not done in a swimming pool.
   */
  scuba?: boolean;
  /**
   * Scuba exception.
   */
  scubaException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Snorkeling. The provision for guests to participate in a recreational
   * water activity in which swimmers wear a diving mask, a simple, shaped
   * breathing tube and flippers/swim fins for the purpose of exploring below
   * the surface of an ocean, gulf or lake. Does not usually require user
   * certification or professional supervision. Equipment may or may not be
   * available for rent or purchase. Not scuba diving.
   */
  snorkeling?: boolean;
  /**
   * Snorkeling exception.
   */
  snorkelingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Tennis. The hotel has the requisite court(s) on site or has an affiliation
   * with a nearby facility for the purpose of providing guests with the
   * opportunity to play a two-sided court-based game in which players use a
   * stringed racquet to hit a ball across a net to the side of the opposing
   * player. The court can be indoors or outdoors. Instructors, racquets and
   * balls may or may not be provided.
   */
  tennis?: boolean;
  /**
   * Tennis exception.
   */
  tennisException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Watercraft rental. The hotel owns water vessels that it permits guests to
   * borrow and use. Can be free or for a fee. Watercraft may include boats,
   * pedal boats, rowboats, sailboats, powerboats, canoes, kayaks, or personal
   * watercraft (such as a Jet Ski).
   */
  watercraftRental?: boolean;
  /**
   * Watercraft rental exception.
   */
  watercraftRentalException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Water skiing. The provision of giving guests the opportunity to be pulled
   * across naturally occurring water while standing on skis and holding a tow
   * rope attached to a motorboat. Can occur on hotel premises or at a nearby
   * waterfront. Most often performed in a lake or ocean.
   */
  waterSkiing?: boolean;
  /**
   * Water skiing exception.
   */
  waterSkiingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Features of the property of specific interest to the business traveler.
 */
export interface Business {
  /**
   * Business center. A designated room at the hotel with one or more desks and
   * equipped with guest-use computers, printers, fax machines and/or
   * photocopiers. May or may not be open 24/7. May or may not require a key to
   * access. Not a meeting room or conference room.
   */
  businessCenter?: boolean;
  /**
   * Business center exception.
   */
  businessCenterException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Meeting rooms. Rooms at the hotel designated for business-related
   * gatherings. Rooms are usually equipped with tables or desks, office chairs
   * and audio/visual facilities to allow for presentations and conference
   * calls. Also known as conference rooms.
   */
  meetingRooms?: boolean;
  /**
   * Meeting rooms count. The number of meeting rooms at the property.
   */
  meetingRoomsCount?: number;
  /**
   * Meeting rooms count exception.
   */
  meetingRoomsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Meeting rooms exception.
   */
  meetingRoomsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * The ways in which the property provides guests with the ability to access
 * the internet.
 */
export interface Connectivity {
  /**
   * Free wifi. The hotel offers guests wifi for free.
   */
  freeWifi?: boolean;
  /**
   * Free wifi exception.
   */
  freeWifiException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Public area wifi available. Guests have the ability to wirelessly connect
   * to the internet in the areas of the hotel accessible to anyone. Can be free
   * or for a fee.
   */
  publicAreaWifiAvailable?: boolean;
  /**
   * Public area wifi available exception.
   */
  publicAreaWifiAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Public internet terminal. An area of the hotel supplied with computers and
   * designated for the purpose of providing guests with the ability to access
   * the internet.
   */
  publicInternetTerminal?: boolean;
  /**
   * Public internet terminal exception.
   */
  publicInternetTerminalException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Wifi available. The hotel provides the ability for guests to wirelessly
   * connect to the internet. Can be in the public areas of the hotel and/or in
   * the guest rooms. Can be free or for a fee.
   */
  wifiAvailable?: boolean;
  /**
   * Wifi available exception.
   */
  wifiAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * An eco certificate awarded to the hotel.
 */
export interface EcoCertification {
  /**
   * Whether the eco certificate was awarded or not.
   */
  awarded?: boolean;
  /**
   * Awarded exception.
   */
  awardedException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Required. The eco certificate.
   */
  ecoCertificate?:  | "ECO_CERTIFICATE_UNSPECIFIED" | "ISO14001" | "ISO50001" | "ASIAN_ECOTOURISM" | "BIOSPHERE_RESPOSNIBLE_TOURISM" | "BUREAU_VERITAS" | "CONTROL_UNION" | "EARTHCHECK" | "ECO_CERTIFICATION_MALTA" | "ECOTOURISM_AUSTRALIAS_ECO" | "GREAT_GREEN_DEAL" | "GREEN_GLOBE" | "GREEN_GROWTH2050" | "GREEN_KEY" | "GREEN_KEY_ECO_RATING" | "GREEN_SEAL" | "GREEN_STAR" | "GREEN_TOURISM_ACTIVE" | "HILTON_LIGHTSTAY" | "HOSTELLING_INTERNATIONALS_QUALITY_AND_SUSTAINABILITY" | "HOTELES_MAS_VERDES" | "NORDIC_SWAN_ECOLABEL" | "PREFERRED_BY_NATURE_SUSTAINABLE_TOURISM" | "SUSTAINABLE_TRAVEL_IRELAND" | "TOF_TIGERS_INITITIVES_PUG" | "TRAVELIFE" | "UNITED_CERTIFICATION_SYSTEMS_LIMITED" | "VIREO_SRL";
}

/**
 * Energy efficiency practices implemented at the hotel.
 */
export interface EnergyEfficiency {
  /**
   * Carbon free energy sources. Property sources carbon-free electricity via
   * at least one of the following methods: on-site clean energy generation,
   * power purchase agreement(s) with clean energy generators, green power
   * provided by electricity supplier, or purchases of Energy Attribute
   * Certificates (such as Renewable Energy Certificates or Guarantees of
   * Origin).
   */
  carbonFreeEnergySources?: boolean;
  /**
   * Carbon free energy sources exception.
   */
  carbonFreeEnergySourcesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Energy conservation program. The property tracks corporate-level Scope 1
   * and 2 GHG emissions, and Scope 3 emissions if available. The property has a
   * commitment to implement initiatives that reduce GHG emissions year over
   * year. The property has shown an absolute reduction in emissions for at
   * least 2 years. Emissions are either verfied by a third-party and/or
   * published in external communications.
   */
  energyConservationProgram?: boolean;
  /**
   * Energy conservation program exception.
   */
  energyConservationProgramException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Energy efficient heating and cooling systems. The property doesn't use
   * chlorofluorocarbon (CFC)-based refrigerants in heating, ventilating, and
   * air-conditioning systems unless a third-party audit shows it's not
   * economically feasible. The CFC-based refrigerants which are used should
   * have a Global Warming Potential (GWP) ≤ 10. The property uses occupancy
   * sensors on HVAC systems in back-of-house spaces, meeting rooms, and other
   * low-traffic areas.
   */
  energyEfficientHeatingAndCoolingSystems?: boolean;
  /**
   * Energy efficient heating and cooling systems exception.
   */
  energyEfficientHeatingAndCoolingSystemsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Energy efficient lighting. At least 75% of the property's lighting is
   * energy efficient, using lighting that is more than 45 lumens per watt –
   * typically LED or CFL lightbulbs.
   */
  energyEfficientLighting?: boolean;
  /**
   * Energy efficient lighting exception.
   */
  energyEfficientLightingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Energy saving thermostats. The property installed energy-saving
   * thermostats throughout the building to conserve energy when rooms or areas
   * are not in use. Energy-saving thermostats are devices that control
   * heating/cooling in the building by learning temperature preferences and
   * automatically adjusting to energy-saving temperatures as the default. The
   * thermostats are automatically set to a temperature between 68-78 degrees F
   * (20-26 °C), depending on seasonality. In the winter, set the thermostat to
   * 68°F (20°C) when the room is occupied, lowering room temperature when
   * unoccupied. In the summer, set the thermostat to 78°F (26°C) when the room
   * is occupied.
   */
  energySavingThermostats?: boolean;
  /**
   * Energy saving thermostats exception.
   */
  energySavingThermostatsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Output only. Green building design. True if BREEAM-* or LEED-* certified.
   */
  readonly greenBuildingDesign?: boolean;
  /**
   * Output only. Green building design exception.
   */
  readonly greenBuildingDesignException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Independent organization audits energy use. The property conducts an
   * energy audit at least every 5 years, the results of which are either
   * verified by a third-party and/or published in external communications. An
   * energy audit is a detailed assessment of the facility which provides
   * recommendations to existing operations and procedures to improve energy
   * efficiency, available incentives or rebates,and opportunities for
   * improvements through renovations or upgrades. Examples of organizations
   * that conduct credible third party audits include: Engie Impact, DNV GL
   * (EU), Dexma, and local utility providers (they often provide energy and
   * water audits).
   */
  independentOrganizationAuditsEnergyUse?: boolean;
  /**
   * Independent organization audits energy use exception.
   */
  independentOrganizationAuditsEnergyUseException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Enhanced cleaning measures implemented by the hotel during COVID-19.
 */
export interface EnhancedCleaning {
  /**
   * Commercial-grade disinfectant used to clean the property.
   */
  commercialGradeDisinfectantCleaning?: boolean;
  /**
   * Commercial grade disinfectant cleaning exception.
   */
  commercialGradeDisinfectantCleaningException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Enhanced cleaning of common areas.
   */
  commonAreasEnhancedCleaning?: boolean;
  /**
   * Common areas enhanced cleaning exception.
   */
  commonAreasEnhancedCleaningException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Employees trained in COVID-19 cleaning procedures.
   */
  employeesTrainedCleaningProcedures?: boolean;
  /**
   * Employees trained cleaning procedures exception.
   */
  employeesTrainedCleaningProceduresException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Employees trained in thorough hand-washing.
   */
  employeesTrainedThoroughHandWashing?: boolean;
  /**
   * Employees trained thorough hand washing exception.
   */
  employeesTrainedThoroughHandWashingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Employees wear masks, face shields, and/or gloves.
   */
  employeesWearProtectiveEquipment?: boolean;
  /**
   * Employees wear protective equipment exception.
   */
  employeesWearProtectiveEquipmentException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Enhanced cleaning of guest rooms.
   */
  guestRoomsEnhancedCleaning?: boolean;
  /**
   * Guest rooms enhanced cleaning exception.
   */
  guestRoomsEnhancedCleaningException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Services and amenities for families and young guests.
 */
export interface Families {
  /**
   * Babysitting. Child care that is offered by hotel staffers or coordinated
   * by hotel staffers with local child care professionals. Can be free or for a
   * fee.
   */
  babysitting?: boolean;
  /**
   * Babysitting exception.
   */
  babysittingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Kids activities. Recreational options such as sports, films, crafts and
   * games designed for the enjoyment of children and offered at the hotel. May
   * or may not be supervised. May or may not be at a designated time or place.
   * Cab be free or for a fee.
   */
  kidsActivities?: boolean;
  /**
   * Kids activities exception.
   */
  kidsActivitiesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Kids club. An organized program of group activities held at the hotel and
   * designed for the enjoyment of children. Facilitated by hotel staff (or
   * staff procured by the hotel) in an area(s) designated for the purpose of
   * entertaining children without their parents. May include games, outings,
   * water sports, team sports, arts and crafts, and films. Usually has set
   * hours. Can be free or for a fee. Also known as Kids Camp or Kids program.
   */
  kidsClub?: boolean;
  /**
   * Kids club exception.
   */
  kidsClubException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Kids friendly. The hotel has one or more special features for families
   * with children, such as reduced rates, child-sized beds, kids' club,
   * babysitting service, or suitable place to play on premises.
   */
  kidsFriendly?: boolean;
  /**
   * Kids friendly exception.
   */
  kidsFriendlyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Meals, snacks, and beverages available at the property.
 */
export interface FoodAndDrink {
  /**
   * Bar. A designated room, lounge or area of an on-site restaurant with
   * seating at a counter behind which a hotel staffer takes the guest's order
   * and provides the requested alcoholic drink. Can be indoors or outdoors.
   * Also known as Pub.
   */
  bar?: boolean;
  /**
   * Bar exception.
   */
  barException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Breakfast available. The morning meal is offered to all guests. Can be
   * free or for a fee.
   */
  breakfastAvailable?: boolean;
  /**
   * Breakfast available exception.
   */
  breakfastAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Breakfast buffet. Breakfast meal service where guests serve themselves
   * from a variety of dishes/foods that are put out on a table.
   */
  breakfastBuffet?: boolean;
  /**
   * Breakfast buffet exception.
   */
  breakfastBuffetException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Buffet. A type of meal where guests serve themselves from a variety of
   * dishes/foods that are put out on a table. Includes lunch and/or dinner
   * meals. A breakfast-only buffet is not sufficient.
   */
  buffet?: boolean;
  /**
   * Buffet exception.
   */
  buffetException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Dinner buffet. Dinner meal service where guests serve themselves from a
   * variety of dishes/foods that are put out on a table.
   */
  dinnerBuffet?: boolean;
  /**
   * Dinner buffet exception.
   */
  dinnerBuffetException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free breakfast. Breakfast is offered for free to all guests. Does not
   * apply if limited to certain room packages.
   */
  freeBreakfast?: boolean;
  /**
   * Free breakfast exception.
   */
  freeBreakfastException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Restaurant. A business onsite at the hotel that is open to the public as
   * well as guests, and offers meals and beverages to consume at tables or
   * counters. May or may not include table service. Also known as cafe, buffet,
   * eatery. A "breakfast room" where the hotel serves breakfast only to guests
   * (not the general public) does not count as a restaurant.
   */
  restaurant?: boolean;
  /**
   * Restaurant exception.
   */
  restaurantException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Restaurants count. The number of restaurants at the hotel.
   */
  restaurantsCount?: number;
  /**
   * Restaurants count exception.
   */
  restaurantsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Room service. A hotel staffer delivers meals prepared onsite to a guest's
   * room as per their request. May or may not be available during specific
   * hours. Services should be available to all guests (not based on rate/room
   * booked/reward program, etc).
   */
  roomService?: boolean;
  /**
   * Room service exception.
   */
  roomServiceException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Table service. A restaurant in which a staff member is assigned to a
   * guest's table to take their order, deliver and clear away food, and deliver
   * the bill, if applicable. Also known as sit-down restaurant.
   */
  tableService?: boolean;
  /**
   * Table service exception.
   */
  tableServiceException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * 24hr room service. Room service is available 24 hours a day.
   */
  twentyFourHourRoomService?: boolean;
  /**
   * 24hr room service exception.
   */
  twentyFourHourRoomServiceException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Vending machine. A glass-fronted mechanized cabinet displaying and
   * dispensing snacks and beverages for purchase by coins, paper money and/or
   * credit cards.
   */
  vendingMachine?: boolean;
  /**
   * Vending machine exception.
   */
  vendingMachineException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Response message for LodgingService.GetGoogleUpdatedLodging
 */
export interface GetGoogleUpdatedLodgingResponse {
  /**
   * Required. The fields in the Lodging that have been updated by Google.
   * Repeated field items are not individually specified.
   */
  diffMask?: string /* FieldMask */;
  /**
   * Required. The Google updated Lodging.
   */
  lodging?: Lodging;
}

function serializeGetGoogleUpdatedLodgingResponse(data: any): GetGoogleUpdatedLodgingResponse {
  return {
    ...data,
    diffMask: data["diffMask"] !== undefined ? data["diffMask"] : undefined,
    lodging: data["lodging"] !== undefined ? serializeLodging(data["lodging"]) : undefined,
  };
}

function deserializeGetGoogleUpdatedLodgingResponse(data: any): GetGoogleUpdatedLodgingResponse {
  return {
    ...data,
    diffMask: data["diffMask"] !== undefined ? data["diffMask"] : undefined,
    lodging: data["lodging"] !== undefined ? deserializeLodging(data["lodging"]) : undefined,
  };
}

/**
 * Features and available amenities in the guest unit.
 */
export interface GuestUnitFeatures {
  /**
   * Bungalow or villa. An independent structure that is part of a hotel or
   * resort that is rented to one party for a vacation stay. The hotel or resort
   * may be completely comprised of bungalows or villas, or they may be one of
   * several guestroom options. Guests in the bungalows or villas most often
   * have the same, if not more, amenities and services offered to guests in
   * other guestroom types.
   */
  bungalowOrVilla?: boolean;
  /**
   * Bungalow or villa exception.
   */
  bungalowOrVillaException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Connecting unit available. A guestroom type that features access to an
   * adjacent guestroom for the purpose of booking both rooms. Most often used
   * by families who need more than one room to accommodate the number of people
   * in their group.
   */
  connectingUnitAvailable?: boolean;
  /**
   * Connecting unit available exception.
   */
  connectingUnitAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Executive floor. A floor of the hotel where the guestrooms are only
   * bookable by members of the hotel's frequent guest membership program.
   * Benefits of this room class include access to a designated lounge which may
   * or may not feature free breakfast, cocktails or other perks specific to
   * members of the program.
   */
  executiveFloor?: boolean;
  /**
   * Executive floor exception.
   */
  executiveFloorException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Max adult occupants count. The total number of adult guests allowed to
   * stay overnight in the guestroom.
   */
  maxAdultOccupantsCount?: number;
  /**
   * Max adult occupants count exception.
   */
  maxAdultOccupantsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Max child occupants count. The total number of children allowed to stay
   * overnight in the room.
   */
  maxChildOccupantsCount?: number;
  /**
   * Max child occupants count exception.
   */
  maxChildOccupantsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Max occupants count. The total number of guests allowed to stay overnight
   * in the guestroom.
   */
  maxOccupantsCount?: number;
  /**
   * Max occupants count exception.
   */
  maxOccupantsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Private home. A privately owned home (house, townhouse, apartment, cabin,
   * bungalow etc) that may or not serve as the owner's residence, but is rented
   * out in its entirety or by the room(s) to paying guest(s) for vacation
   * stays. Not for lease-based, long-term residency.
   */
  privateHome?: boolean;
  /**
   * Private home exception.
   */
  privateHomeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Suite. A guestroom category that implies both a bedroom area and a
   * separate living area. There may or may not be full walls and doors
   * separating the two areas, but regardless, they are very distinct. Does not
   * mean a couch or chair in a bedroom.
   */
  suite?: boolean;
  /**
   * Suite exception.
   */
  suiteException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Tier. Classification of the unit based on available features/amenities. A
   * non-standard tier is only permitted if at least one other unit type falls
   * under the standard tier.
   */
  tier?:  | "UNIT_TIER_UNSPECIFIED" | "STANDARD_UNIT" | "DELUXE_UNIT";
  /**
   * Tier exception.
   */
  tierException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Features available in the living areas in the guest unit.
   */
  totalLivingAreas?: LivingArea;
  /**
   * Views available from the guest unit itself.
   */
  views?: ViewsFromUnit;
}

/**
 * A specific type of unit primarily defined by its features.
 */
export interface GuestUnitType {
  /**
   * Required. Unit or room code identifiers for a single GuestUnitType. Each
   * code must be unique within a Lodging instance.
   */
  codes?: string[];
  /**
   * Features and available amenities of the GuestUnitType.
   */
  features?: GuestUnitFeatures;
  /**
   * Required. Short, English label or name of the GuestUnitType. Target <50
   * chars.
   */
  label?: string;
}

/**
 * Health and safety measures implemented by the hotel during COVID-19.
 */
export interface HealthAndSafety {
  /**
   * Enhanced cleaning measures implemented by the hotel during COVID-19.
   */
  enhancedCleaning?: EnhancedCleaning;
  /**
   * Increased food safety measures implemented by the hotel during COVID-19.
   */
  increasedFoodSafety?: IncreasedFoodSafety;
  /**
   * Minimized contact measures implemented by the hotel during COVID-19.
   */
  minimizedContact?: MinimizedContact;
  /**
   * Personal protection measures implemented by the hotel during COVID-19.
   */
  personalProtection?: PersonalProtection;
  /**
   * Physical distancing measures implemented by the hotel during COVID-19.
   */
  physicalDistancing?: PhysicalDistancing;
}

/**
 * Conveniences provided in guest units to facilitate an easier, more
 * comfortable stay.
 */
export interface Housekeeping {
  /**
   * Daily housekeeping. Guest units are cleaned by hotel staff daily during
   * guest's stay.
   */
  dailyHousekeeping?: boolean;
  /**
   * Daily housekeeping exception.
   */
  dailyHousekeepingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Housekeeping available. Guest units are cleaned by hotel staff during
   * guest's stay. Schedule may vary from daily, weekly, or specific days of the
   * week.
   */
  housekeepingAvailable?: boolean;
  /**
   * Housekeeping available exception.
   */
  housekeepingAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Turndown service. Hotel staff enters guest units to prepare the bed for
   * sleep use. May or may not include some light housekeeping. May or may not
   * include an evening snack or candy. Also known as evening service.
   */
  turndownService?: boolean;
  /**
   * Turndown service exception.
   */
  turndownServiceException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Increased food safety measures implemented by the hotel during COVID-19.
 */
export interface IncreasedFoodSafety {
  /**
   * Additional sanitation in dining areas.
   */
  diningAreasAdditionalSanitation?: boolean;
  /**
   * Dining areas additional sanitation exception.
   */
  diningAreasAdditionalSanitationException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Disposable flatware.
   */
  disposableFlatware?: boolean;
  /**
   * Disposable flatware exception.
   */
  disposableFlatwareException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Additional safety measures during food prep and serving.
   */
  foodPreparationAndServingAdditionalSafety?: boolean;
  /**
   * Food preparation and serving additional safety exception.
   */
  foodPreparationAndServingAdditionalSafetyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Individually-packaged meals.
   */
  individualPackagedMeals?: boolean;
  /**
   * Individual packaged meals exception.
   */
  individualPackagedMealsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Single-use menus.
   */
  singleUseFoodMenus?: boolean;
  /**
   * Single use food menus exception.
   */
  singleUseFoodMenusException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Language spoken by at least one staff member.
 */
export interface LanguageSpoken {
  /**
   * Required. The BCP-47 language code for the spoken language. Currently
   * accepted codes: ar, de, en, es, fil, fr, hi, id, it, ja, ko, nl, pt, ru,
   * vi, yue, zh.
   */
  languageCode?: string;
  /**
   * At least one member of the staff can speak the language.
   */
  spoken?: boolean;
  /**
   * Spoken exception.
   */
  spokenException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * An individual room, such as kitchen, bathroom, bedroom, within a bookable
 * guest unit.
 */
export interface LivingArea {
  /**
   * Accessibility features of the living area.
   */
  accessibility?: LivingAreaAccessibility;
  /**
   * Information about eating features in the living area.
   */
  eating?: LivingAreaEating;
  /**
   * Features in the living area.
   */
  features?: LivingAreaFeatures;
  /**
   * Information about the layout of the living area.
   */
  layout?: LivingAreaLayout;
  /**
   * Information about sleeping features in the living area.
   */
  sleeping?: LivingAreaSleeping;
}

/**
 * Accessibility features of the living area.
 */
export interface LivingAreaAccessibility {
  /**
   * ADA compliant unit. A guestroom designed to accommodate the physical
   * challenges of a guest with mobility and/or auditory and/or visual issues,
   * as determined by legislative policy. Usually features enlarged doorways,
   * roll-in showers with seats, bathroom grab bars, and communication equipment
   * for the hearing and sight challenged.
   */
  adaCompliantUnit?: boolean;
  /**
   * ADA compliant unit exception.
   */
  adaCompliantUnitException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Hearing-accessible doorbell. A visual indicator(s) of a knock or ring at
   * the door.
   */
  hearingAccessibleDoorbell?: boolean;
  /**
   * Hearing-accessible doorbell exception.
   */
  hearingAccessibleDoorbellException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Hearing-accessible fire alarm. A device that gives warning of a fire
   * through flashing lights.
   */
  hearingAccessibleFireAlarm?: boolean;
  /**
   * Hearing-accessible fire alarm exception.
   */
  hearingAccessibleFireAlarmException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Hearing-accessible unit. A guestroom designed to accommodate the physical
   * challenges of a guest with auditory issues.
   */
  hearingAccessibleUnit?: boolean;
  /**
   * Hearing-accessible unit exception.
   */
  hearingAccessibleUnitException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobility-accessible bathtub. A bathtub that accomodates the physically
   * challenged with additional railings or hand grips, a transfer seat or lift,
   * and/or a door to enable walking into the tub.
   */
  mobilityAccessibleBathtub?: boolean;
  /**
   * Mobility-accessible bathtub exception.
   */
  mobilityAccessibleBathtubException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobility-accessible shower. A shower with an enlarged door or access point
   * to accommodate a wheelchair or a waterproof seat for the physically
   * challenged.
   */
  mobilityAccessibleShower?: boolean;
  /**
   * Mobility-accessible shower exception.
   */
  mobilityAccessibleShowerException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobility-accessible toilet. A toilet with a higher seat, grab bars, and/or
   * a larger area around it to accommodate the physically challenged.
   */
  mobilityAccessibleToilet?: boolean;
  /**
   * Mobility-accessible toilet exception.
   */
  mobilityAccessibleToiletException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobility-accessible unit. A guestroom designed to accommodate the physical
   * challenges of a guest with mobility and/or auditory and/or visual issues.
   * Usually features enlarged doorways, roll-in showers with seats, bathroom
   * grab bars, and communication equipment for the hearing and sight
   * challenged.
   */
  mobilityAccessibleUnit?: boolean;
  /**
   * Mobility-accessible unit exception.
   */
  mobilityAccessibleUnitException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Information about eating features in the living area.
 */
export interface LivingAreaEating {
  /**
   * Coffee maker. An electric appliance that brews coffee by heating and
   * forcing water through ground coffee.
   */
  coffeeMaker?: boolean;
  /**
   * Coffee maker exception.
   */
  coffeeMakerException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Cookware. Kitchen pots, pans and utensils used in connection with the
   * preparation of food.
   */
  cookware?: boolean;
  /**
   * Cookware exception.
   */
  cookwareException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Dishwasher. A counter-height electrical cabinet containing racks for dirty
   * dishware, cookware and cutlery, and a dispenser for soap built into the
   * pull-down door. The cabinet is attached to the plumbing system to
   * facilitate the automatic cleaning of its contents.
   */
  dishwasher?: boolean;
  /**
   * Dishwasher exception.
   */
  dishwasherException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Indoor grill. Metal grates built into an indoor cooktop on which food is
   * cooked over an open flame or electric heat source.
   */
  indoorGrill?: boolean;
  /**
   * Indoor grill exception.
   */
  indoorGrillException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Kettle. A covered container with a handle and a spout used for boiling
   * water.
   */
  kettle?: boolean;
  /**
   * Kettle exception.
   */
  kettleException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Kitchen available. An area of the guestroom designated for the preparation
   * and storage of food via the presence of a refrigerator, cook top, oven and
   * sink, as well as cutlery, dishes and cookware. Usually includes small
   * appliances such a coffee maker and a microwave. May or may not include an
   * automatic dishwasher.
   */
  kitchenAvailable?: boolean;
  /**
   * Kitchen available exception.
   */
  kitchenAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Microwave. An electric oven that quickly cooks and heats food by microwave
   * energy. Smaller than a standing or wall mounted oven. Usually placed on a
   * kitchen counter, a shelf or tabletop or mounted above a cooktop.
   */
  microwave?: boolean;
  /**
   * Microwave exception.
   */
  microwaveException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Minibar. A small refrigerated cabinet in the guestroom containing
   * bottles/cans of soft drinks, mini bottles of alcohol, and snacks. The items
   * are most commonly available for a fee.
   */
  minibar?: boolean;
  /**
   * Minibar exception.
   */
  minibarException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Outdoor grill. Metal grates on which food is cooked over an open flame or
   * electric heat source. Part of an outdoor apparatus that supports the
   * grates. Also known as barbecue grill or barbecue.
   */
  outdoorGrill?: boolean;
  /**
   * Outdoor grill exception.
   */
  outdoorGrillException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Oven. A temperature controlled, heated metal cabinet powered by gas or
   * electricity in which food is placed for the purpose of cooking or
   * reheating.
   */
  oven?: boolean;
  /**
   * Oven exception.
   */
  ovenException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Refrigerator. A large, climate-controlled electrical cabinet with vertical
   * doors. Built for the purpose of chilling and storing perishable foods.
   */
  refrigerator?: boolean;
  /**
   * Refrigerator exception.
   */
  refrigeratorException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Sink. A basin with a faucet attached to a water source and used for the
   * purpose of washing and rinsing.
   */
  sink?: boolean;
  /**
   * Sink exception.
   */
  sinkException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Snackbar. A small cabinet in the guestroom containing snacks. The items
   * are most commonly available for a fee.
   */
  snackbar?: boolean;
  /**
   * Snackbar exception.
   */
  snackbarException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Stove. A kitchen appliance powered by gas or electricity for the purpose
   * of creating a flame or hot surface on which pots of food can be cooked.
   * Also known as cooktop or hob.
   */
  stove?: boolean;
  /**
   * Stove exception.
   */
  stoveException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Tea station. A small area with the supplies needed to heat water and make
   * tea.
   */
  teaStation?: boolean;
  /**
   * Tea station exception.
   */
  teaStationException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Toaster. A small, temperature controlled electric appliance with
   * rectangular slots at the top that are lined with heated coils for the
   * purpose of browning slices of bread products.
   */
  toaster?: boolean;
  /**
   * Toaster exception.
   */
  toasterException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Features in the living area.
 */
export interface LivingAreaFeatures {
  /**
   * Air conditioning. An electrical machine used to cool the temperature of
   * the guestroom.
   */
  airConditioning?: boolean;
  /**
   * Air conditioning exception.
   */
  airConditioningException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Bathtub. A fixed plumbing feature set on the floor and consisting of a
   * large container that accommodates the body of an adult for the purpose of
   * seated bathing. Includes knobs or fixtures to control the temperature of
   * the water, a faucet through which the water flows, and a drain that can be
   * closed for filling and opened for draining.
   */
  bathtub?: boolean;
  /**
   * Bathtub exception.
   */
  bathtubException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Bidet. A plumbing fixture attached to a toilet or a low, fixed sink
   * designed for the purpose of washing after toilet use.
   */
  bidet?: boolean;
  /**
   * Bidet exception.
   */
  bidetException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Dryer. An electrical machine designed to dry clothing.
   */
  dryer?: boolean;
  /**
   * Dryer exception.
   */
  dryerException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Electronic room key. A card coded by the check-in computer that is read by
   * the lock on the hotel guestroom door to allow for entry.
   */
  electronicRoomKey?: boolean;
  /**
   * Electronic room key exception.
   */
  electronicRoomKeyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Fireplace. A framed opening (aka hearth) at the base of a chimney in which
   * logs or an electrical fire feature are burned to provide a relaxing
   * ambiance or to heat the room. Often made of bricks or stone.
   */
  fireplace?: boolean;
  /**
   * Fireplace exception.
   */
  fireplaceException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Hairdryer. A handheld electric appliance that blows temperature-controlled
   * air for the purpose of drying wet hair. Can be mounted to a bathroom wall
   * or a freestanding device stored in the guestroom's bathroom or closet.
   */
  hairdryer?: boolean;
  /**
   * Hairdryer exception.
   */
  hairdryerException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Heating. An electrical machine used to warm the temperature of the
   * guestroom.
   */
  heating?: boolean;
  /**
   * Heating exception.
   */
  heatingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * In-unit safe. A strong fireproof cabinet with a programmable lock, used
   * for the protected storage of valuables in a guestroom. Often built into a
   * closet.
   */
  inunitSafe?: boolean;
  /**
   * In-unit safe exception.
   */
  inunitSafeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * In-unit Wifi available. Guests can wirelessly connect to the Internet in
   * the guestroom. Can be free or for a fee.
   */
  inunitWifiAvailable?: boolean;
  /**
   * In-unit Wifi available exception.
   */
  inunitWifiAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Ironing equipment. A device, usually with a flat metal base, that is
   * heated to smooth, finish, or press clothes and a flat, padded,
   * cloth-covered surface on which the clothes are worked.
   */
  ironingEquipment?: boolean;
  /**
   * Ironing equipment exception.
   */
  ironingEquipmentException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Pay per view movies. Televisions with channels that offer films that can
   * be viewed for a fee, and have an interface to allow the viewer to accept
   * the terms and approve payment.
   */
  payPerViewMovies?: boolean;
  /**
   * Pay per view movies exception.
   */
  payPerViewMoviesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Private bathroom. A bathroom designated for the express use of the guests
   * staying in a specific guestroom.
   */
  privateBathroom?: boolean;
  /**
   * Private bathroom exception.
   */
  privateBathroomException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Shower. A fixed plumbing fixture for standing bathing that features a tall
   * spray spout or faucet through which water flows, a knob or knobs that
   * control the water's temperature, and a drain in the floor.
   */
  shower?: boolean;
  /**
   * Shower exception.
   */
  showerException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Toilet. A fixed bathroom feature connected to a sewer or septic system and
   * consisting of a water-flushed bowl with a seat, as well as a device that
   * elicites the water-flushing action. Used for the process and disposal of
   * human waste.
   */
  toilet?: boolean;
  /**
   * Toilet exception.
   */
  toiletException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * TV. A television is available in the guestroom.
   */
  tv?: boolean;
  /**
   * TV casting. A television equipped with a device through which the video
   * entertainment accessed on a personal computer, phone or tablet can be
   * wirelessly delivered to and viewed on the guestroom's television.
   */
  tvCasting?: boolean;
  /**
   * TV exception.
   */
  tvCastingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * TV exception.
   */
  tvException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * TV streaming. Televisions that embed a range of web-based apps to allow
   * for watching media from those apps.
   */
  tvStreaming?: boolean;
  /**
   * TV streaming exception.
   */
  tvStreamingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Universal power adapters. A power supply for electronic devices which
   * plugs into a wall for the purpose of converting AC to a single DC voltage.
   * Also know as AC adapter or charger.
   */
  universalPowerAdapters?: boolean;
  /**
   * Universal power adapters exception.
   */
  universalPowerAdaptersException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Washer. An electrical machine connected to a running water source designed
   * to launder clothing.
   */
  washer?: boolean;
  /**
   * Washer exception.
   */
  washerException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Information about the layout of the living area.
 */
export interface LivingAreaLayout {
  /**
   * Balcony. An outdoor platform attached to a building and surrounded by a
   * short wall, fence or other safety railing. The balcony is accessed through
   * a door in a guestroom or suite and is for use by the guest staying in that
   * room. May or may not include seating or outdoor furniture. Is not located
   * on the ground floor. Also lanai.
   */
  balcony?: boolean;
  /**
   * Balcony exception.
   */
  balconyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Living area sq meters. The measurement in meters of the area of a
   * guestroom's living space.
   */
  livingAreaSqMeters?: number;
  /**
   * Living area sq meters exception.
   */
  livingAreaSqMetersException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Loft. A three-walled upper area accessed by stairs or a ladder that
   * overlooks the lower area of a room.
   */
  loft?: boolean;
  /**
   * Loft exception.
   */
  loftException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Non smoking. A guestroom in which the smoking of cigarettes, cigars and
   * pipes is prohibited.
   */
  nonSmoking?: boolean;
  /**
   * Non smoking exception.
   */
  nonSmokingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Patio. A paved, outdoor area with seating attached to and accessed through
   * a ground-floor guestroom for use by the occupants of the guestroom.
   */
  patio?: boolean;
  /**
   * Patio exception.
   */
  patioException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Stairs. There are steps leading from one level or story to another in the
   * unit.
   */
  stairs?: boolean;
  /**
   * Stairs exception.
   */
  stairsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Information about sleeping features in the living area.
 */
export interface LivingAreaSleeping {
  /**
   * Beds count. The number of permanent beds present in a guestroom. Does not
   * include rollaway beds, cribs or sofabeds.
   */
  bedsCount?: number;
  /**
   * Beds count exception.
   */
  bedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Bunk beds count. The number of furniture pieces in which one framed
   * mattress is fixed directly above another by means of a physical frame. This
   * allows one person(s) to sleep in the bottom bunk and one person(s) to sleep
   * in the top bunk. Also known as double decker bed.
   */
  bunkBedsCount?: number;
  /**
   * Bunk beds count exception.
   */
  bunkBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Cribs count. The number of small beds for an infant or toddler that the
   * guestroom can obtain. The bed is surrounded by a high railing to prevent
   * the child from falling or climbing out of the bed
   */
  cribsCount?: number;
  /**
   * Cribs count exception.
   */
  cribsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Double beds count. The number of medium beds measuring 53"W x 75"L (135cm
   * x 191cm). Also known as full size bed.
   */
  doubleBedsCount?: number;
  /**
   * Double beds count exception.
   */
  doubleBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Feather pillows. The option for guests to obtain bed pillows that are
   * stuffed with the feathers and down of ducks or geese.
   */
  featherPillows?: boolean;
  /**
   * Feather pillows exception.
   */
  featherPillowsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Hypoallergenic bedding. Bedding such as linens, pillows, mattress covers
   * and/or mattresses that are made of materials known to be resistant to
   * allergens such as mold, dust and dander.
   */
  hypoallergenicBedding?: boolean;
  /**
   * Hypoallergenic bedding exception.
   */
  hypoallergenicBeddingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * King beds count. The number of large beds measuring 76"W x 80"L (193cm x
   * 102cm). Most often meant to accompany two people. Includes California king
   * and super king.
   */
  kingBedsCount?: number;
  /**
   * King beds count exception.
   */
  kingBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Memory foam pillows. The option for guests to obtain bed pillows that are
   * stuffed with a man-made foam that responds to body heat by conforming to
   * the body closely, and then recovers its shape when the pillow cools down.
   */
  memoryFoamPillows?: boolean;
  /**
   * Memory foam pillows exception.
   */
  memoryFoamPillowsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Other beds count. The number of beds that are not standard mattress and
   * boxspring setups such as Japanese tatami mats, trundle beds, air mattresses
   * and cots.
   */
  otherBedsCount?: number;
  /**
   * Other beds count exception.
   */
  otherBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Queen beds count. The number of medium-large beds measuring 60"W x 80"L
   * (152cm x 102cm).
   */
  queenBedsCount?: number;
  /**
   * Queen beds count exception.
   */
  queenBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Roll away beds count. The number of mattresses on wheeled frames that can
   * be folded in half and rolled away for easy storage that the guestroom can
   * obtain upon request.
   */
  rollAwayBedsCount?: number;
  /**
   * Roll away beds count exception.
   */
  rollAwayBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Single or twin count beds. The number of smaller beds measuring 38"W x
   * 75"L (97cm x 191cm) that can accommodate one adult.
   */
  singleOrTwinBedsCount?: number;
  /**
   * Single or twin beds count exception.
   */
  singleOrTwinBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Sofa beds count. The number of specially designed sofas that can be made
   * to serve as a bed by lowering its hinged upholstered back to horizontal
   * position or by pulling out a concealed mattress.
   */
  sofaBedsCount?: number;
  /**
   * Sofa beds count exception.
   */
  sofaBedsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Synthetic pillows. The option for guests to obtain bed pillows stuffed
   * with polyester material crafted to reproduce the feel of a pillow stuffed
   * with down and feathers.
   */
  syntheticPillows?: boolean;
  /**
   * Synthetic pillows exception.
   */
  syntheticPillowsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Additional options for MyBusinessLodging#locationsGetLodging.
 */
export interface LocationsGetLodgingOptions {
  /**
   * Required. The specific fields to return. Use "*" to include all fields.
   * Repeated field items cannot be individually specified.
   */
  readMask?: string /* FieldMask */;
}

function serializeLocationsGetLodgingOptions(data: any): LocationsGetLodgingOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeLocationsGetLodgingOptions(data: any): LocationsGetLodgingOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for MyBusinessLodging#locationsLodgingGetGoogleUpdated.
 */
export interface LocationsLodgingGetGoogleUpdatedOptions {
  /**
   * Required. The specific fields to return. Use "*" to include all fields.
   * Repeated field items cannot be individually specified.
   */
  readMask?: string /* FieldMask */;
}

function serializeLocationsLodgingGetGoogleUpdatedOptions(data: any): LocationsLodgingGetGoogleUpdatedOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeLocationsLodgingGetGoogleUpdatedOptions(data: any): LocationsLodgingGetGoogleUpdatedOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for MyBusinessLodging#locationsUpdateLodging.
 */
export interface LocationsUpdateLodgingOptions {
  /**
   * Required. The specific fields to update. Use "*" to update all fields,
   * which may include unsetting empty fields in the request. Repeated field
   * items cannot be individually updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsUpdateLodgingOptions(data: any): LocationsUpdateLodgingOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsUpdateLodgingOptions(data: any): LocationsUpdateLodgingOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Lodging of a location that provides accomodations.
 */
export interface Lodging {
  /**
   * Physical adaptations made to the property in consideration of varying
   * levels of human physical ability.
   */
  accessibility?: Accessibility;
  /**
   * Amenities and features related to leisure and play.
   */
  activities?: Activities;
  /**
   * Output only. All units on the property have at least these attributes.
   */
  readonly allUnits?: GuestUnitFeatures;
  /**
   * Features of the property of specific interest to the business traveler.
   */
  business?: Business;
  /**
   * Features of the shared living areas available in this Lodging.
   */
  commonLivingArea?: LivingArea;
  /**
   * The ways in which the property provides guests with the ability to access
   * the internet.
   */
  connectivity?: Connectivity;
  /**
   * Services and amenities for families and young guests.
   */
  families?: Families;
  /**
   * Meals, snacks, and beverages available at the property.
   */
  foodAndDrink?: FoodAndDrink;
  /**
   * Individual GuestUnitTypes that are available in this Lodging.
   */
  guestUnits?: GuestUnitType[];
  /**
   * Health and safety measures implemented by the hotel during COVID-19.
   */
  healthAndSafety?: HealthAndSafety;
  /**
   * Conveniences provided in guest units to facilitate an easier, more
   * comfortable stay.
   */
  housekeeping?: Housekeeping;
  /**
   * Required. Metadata for the lodging.
   */
  metadata?: LodgingMetadata;
  /**
   * Required. Google identifier for this location in the form:
   * `locations/{location_id}/lodging`
   */
  name?: string;
  /**
   * Parking options at the property.
   */
  parking?: Parking;
  /**
   * Policies regarding guest-owned animals.
   */
  pets?: Pets;
  /**
   * Property rules that impact guests.
   */
  policies?: Policies;
  /**
   * Swimming pool or recreational water facilities available at the hotel.
   */
  pools?: Pools;
  /**
   * General factual information about the property's physical structure and
   * important dates.
   */
  property?: Property;
  /**
   * Conveniences or help provided by the property to facilitate an easier,
   * more comfortable stay.
   */
  services?: Services;
  /**
   * Output only. Some units on the property have as much as these attributes.
   */
  readonly someUnits?: GuestUnitFeatures;
  /**
   * Sustainability practices implemented at the hotel.
   */
  sustainability?: Sustainability;
  /**
   * Vehicles or vehicular services facilitated or owned by the property.
   */
  transportation?: Transportation;
  /**
   * Guest facilities at the property to promote or maintain health, beauty,
   * and fitness.
   */
  wellness?: Wellness;
}

function serializeLodging(data: any): Lodging {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeLodgingMetadata(data["metadata"]) : undefined,
  };
}

function deserializeLodging(data: any): Lodging {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeLodgingMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Metadata for the Lodging.
 */
export interface LodgingMetadata {
  /**
   * Required. The latest time at which the Lodging data is asserted to be true
   * in the real world. This is not necessarily the time at which the request is
   * made.
   */
  updateTime?: Date;
}

function serializeLodgingMetadata(data: any): LodgingMetadata {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeLodgingMetadata(data: any): LodgingMetadata {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Minimized contact measures implemented by the hotel during COVID-19.
 */
export interface MinimizedContact {
  /**
   * No-contact check-in and check-out.
   */
  contactlessCheckinCheckout?: boolean;
  /**
   * Contactless check-in check-out exception.
   */
  contactlessCheckinCheckoutException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Keyless mobile entry to guest rooms.
   */
  digitalGuestRoomKeys?: boolean;
  /**
   * Digital guest room keys exception.
   */
  digitalGuestRoomKeysException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Housekeeping scheduled by request only.
   */
  housekeepingScheduledRequestOnly?: boolean;
  /**
   * Housekeeping scheduled request only exception.
   */
  housekeepingScheduledRequestOnlyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * High-touch items, such as magazines, removed from common areas.
   */
  noHighTouchItemsCommonAreas?: boolean;
  /**
   * No high touch items common areas exception.
   */
  noHighTouchItemsCommonAreasException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * High-touch items, such as decorative pillows, removed from guest rooms.
   */
  noHighTouchItemsGuestRooms?: boolean;
  /**
   * No high touch items guest rooms exception.
   */
  noHighTouchItemsGuestRoomsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Plastic key cards are disinfected or discarded.
   */
  plasticKeycardsDisinfected?: boolean;
  /**
   * Plastic keycards disinfected exception.
   */
  plasticKeycardsDisinfectedException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Buffer maintained between room bookings.
   */
  roomBookingsBuffer?: boolean;
  /**
   * Room bookings buffer exception.
   */
  roomBookingsBufferException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Parking options at the property.
 */
export interface Parking {
  /**
   * Electric car charging stations. Electric power stations, usually located
   * outdoors, into which guests plug their electric cars to receive a charge.
   */
  electricCarChargingStations?: boolean;
  /**
   * Electric car charging stations exception.
   */
  electricCarChargingStationsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free parking. The hotel allows the cars of guests to be parked for free.
   * Parking facility may be an outdoor lot or an indoor garage, but must be
   * onsite. Nearby parking does not apply. Parking may be performed by the
   * guest or by hotel staff. Free parking must be available to all guests
   * (limited conditions does not apply).
   */
  freeParking?: boolean;
  /**
   * Free parking exception.
   */
  freeParkingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free self parking. Guests park their own cars for free. Parking facility
   * may be an outdoor lot or an indoor garage, but must be onsite. Nearby
   * parking does not apply.
   */
  freeSelfParking?: boolean;
  /**
   * Free self parking exception.
   */
  freeSelfParkingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free valet parking. Hotel staff member parks the cars of guests. Parking
   * with this service is free.
   */
  freeValetParking?: boolean;
  /**
   * Free valet parking exception.
   */
  freeValetParkingException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Parking available. The hotel allows the cars of guests to be parked. Can
   * be free or for a fee. Parking facility may be an outdoor lot or an indoor
   * garage, but must be onsite. Nearby parking does not apply. Parking may be
   * performed by the guest or by hotel staff.
   */
  parkingAvailable?: boolean;
  /**
   * Parking available exception.
   */
  parkingAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Self parking available. Guests park their own cars. Parking facility may
   * be an outdoor lot or an indoor garage, but must be onsite. Nearby parking
   * does not apply. Can be free or for a fee.
   */
  selfParkingAvailable?: boolean;
  /**
   * Self parking available exception.
   */
  selfParkingAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Valet parking available. Hotel staff member parks the cars of guests.
   * Parking with this service can be free or for a fee.
   */
  valetParkingAvailable?: boolean;
  /**
   * Valet parking available exception.
   */
  valetParkingAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Forms of payment accepted at the property.
 */
export interface PaymentOptions {
  /**
   * Cash. The hotel accepts payment by paper/coin currency.
   */
  cash?: boolean;
  /**
   * Cash exception.
   */
  cashException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Cheque. The hotel accepts a printed document issued by the guest's bank in
   * the guest's name as a form of payment.
   */
  cheque?: boolean;
  /**
   * Cheque exception.
   */
  chequeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Credit card. The hotel accepts payment by a card issued by a bank or
   * credit card company. Also known as charge card, debit card, bank card, or
   * charge plate.
   */
  creditCard?: boolean;
  /**
   * Credit card exception.
   */
  creditCardException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Debit card. The hotel accepts a bank-issued card that immediately deducts
   * the charged funds from the guest's bank account upon processing.
   */
  debitCard?: boolean;
  /**
   * Debit card exception.
   */
  debitCardException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Mobile nfc. The hotel has the compatible computer hardware terminal that
   * reads and charges a payment app on the guest's smartphone without requiring
   * the two devices to make physical contact. Also known as Apple Pay, Google
   * Pay, Samsung Pay.
   */
  mobileNfc?: boolean;
  /**
   * Mobile nfc exception.
   */
  mobileNfcException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Personal protection measures implemented by the hotel during COVID-19.
 */
export interface PersonalProtection {
  /**
   * Hand-sanitizer and/or sanitizing wipes are offered in common areas.
   */
  commonAreasOfferSanitizingItems?: boolean;
  /**
   * Common areas offer sanitizing items exception.
   */
  commonAreasOfferSanitizingItemsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Masks required on the property.
   */
  faceMaskRequired?: boolean;
  /**
   * Face mask required exception.
   */
  faceMaskRequiredException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * In-room hygiene kits with masks, hand sanitizer, and/or antibacterial
   * wipes.
   */
  guestRoomHygieneKitsAvailable?: boolean;
  /**
   * Guest room hygiene kits available exception.
   */
  guestRoomHygieneKitsAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Masks and/or gloves available for guests.
   */
  protectiveEquipmentAvailable?: boolean;
  /**
   * Protective equipment available exception.
   */
  protectiveEquipmentAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Policies regarding guest-owned animals.
 */
export interface Pets {
  /**
   * Cats allowed. Domesticated felines are permitted at the property and
   * allowed to stay in the guest room of their owner. May or may not require a
   * fee.
   */
  catsAllowed?: boolean;
  /**
   * Cats allowed exception.
   */
  catsAllowedException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Dogs allowed. Domesticated canines are permitted at the property and
   * allowed to stay in the guest room of their owner. May or may not require a
   * fee.
   */
  dogsAllowed?: boolean;
  /**
   * Dogs allowed exception.
   */
  dogsAllowedException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Pets allowed. Household animals are allowed at the property and in the
   * specific guest room of their owner. May or may not include dogs, cats,
   * reptiles and/or fish. May or may not require a fee. Service animals are not
   * considered to be pets, so not governed by this policy.
   */
  petsAllowed?: boolean;
  /**
   * Pets allowed exception.
   */
  petsAllowedException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Pets allowed free. Household animals are allowed at the property and in
   * the specific guest room of their owner for free. May or may not include
   * dogs, cats, reptiles, and/or fish.
   */
  petsAllowedFree?: boolean;
  /**
   * Pets allowed free exception.
   */
  petsAllowedFreeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Physical distancing measures implemented by the hotel during COVID-19.
 */
export interface PhysicalDistancing {
  /**
   * Common areas arranged to maintain physical distancing.
   */
  commonAreasPhysicalDistancingArranged?: boolean;
  /**
   * Common areas physical distancing arranged exception.
   */
  commonAreasPhysicalDistancingArrangedException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Physical distancing required.
   */
  physicalDistancingRequired?: boolean;
  /**
   * Physical distancing required exception.
   */
  physicalDistancingRequiredException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Safety dividers at front desk and other locations.
   */
  safetyDividers?: boolean;
  /**
   * Safety dividers exception.
   */
  safetyDividersException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Guest occupancy limited within shared facilities.
   */
  sharedAreasLimitedOccupancy?: boolean;
  /**
   * Shared areas limited occupancy exception.
   */
  sharedAreasLimitedOccupancyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Private spaces designated in spa and wellness areas.
   */
  wellnessAreasHavePrivateSpaces?: boolean;
  /**
   * Wellness areas have private spaces exception.
   */
  wellnessAreasHavePrivateSpacesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Property rules that impact guests.
 */
export interface Policies {
  /**
   * All inclusive available. The hotel offers a rate option that includes the
   * cost of the room, meals, activities, and other amenities that might
   * otherwise be charged separately.
   */
  allInclusiveAvailable?: boolean;
  /**
   * All inclusive available exception.
   */
  allInclusiveAvailableException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * All inclusive only. The only rate option offered by the hotel is a rate
   * that includes the cost of the room, meals, activities and other amenities
   * that might otherwise be charged separately.
   */
  allInclusiveOnly?: boolean;
  /**
   * All inclusive only exception.
   */
  allInclusiveOnlyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Check-in time. The time of the day at which the hotel begins providing
   * guests access to their unit at the beginning of their stay.
   */
  checkinTime?: TimeOfDay;
  /**
   * Check-in time exception.
   */
  checkinTimeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Check-out time. The time of the day on the last day of a guest's reserved
   * stay at which the guest must vacate their room and settle their bill. Some
   * hotels may offer late or early check out for a fee.
   */
  checkoutTime?: TimeOfDay;
  /**
   * Check-out time exception.
   */
  checkoutTimeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Kids stay free. The children of guests are allowed to stay in the
   * room/suite of a parent or adult without an additional fee. The policy may
   * or may not stipulate a limit of the child's age or the overall number of
   * children allowed.
   */
  kidsStayFree?: boolean;
  /**
   * Kids stay free exception.
   */
  kidsStayFreeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Max child age. The hotel allows children up to a certain age to stay in
   * the room/suite of a parent or adult without an additional fee.
   */
  maxChildAge?: number;
  /**
   * Max child age exception.
   */
  maxChildAgeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Max kids stay free count. The hotel allows a specific, defined number of
   * children to stay in the room/suite of a parent or adult without an
   * additional fee.
   */
  maxKidsStayFreeCount?: number;
  /**
   * Max kids stay free count exception.
   */
  maxKidsStayFreeCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Forms of payment accepted at the property.
   */
  paymentOptions?: PaymentOptions;
  /**
   * Smoke free property. Smoking is not allowed inside the building, on
   * balconies, or in outside spaces. Hotels that offer a designated area for
   * guests to smoke are not considered smoke-free properties.
   */
  smokeFreeProperty?: boolean;
  /**
   * Smoke free property exception.
   */
  smokeFreePropertyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Swimming pool or recreational water facilities available at the hotel.
 */
export interface Pools {
  /**
   * Adult pool. A pool restricted for use by adults only. Can be indoors or
   * outdoors.
   */
  adultPool?: boolean;
  /**
   * Adult pool exception.
   */
  adultPoolException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Hot tub. A man-made pool containing bubbling water maintained at a higher
   * temperature and circulated by aerating jets for the purpose of soaking,
   * relaxation and hydrotherapy. Can be indoors or outdoors. Not used for
   * active swimming. Also known as Jacuzzi. Hot tub must be in a common area
   * where all guests can access it. Does not apply to room-specific hot tubs
   * that are only accessible to guest occupying that room.
   */
  hotTub?: boolean;
  /**
   * Hot tub exception.
   */
  hotTubException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Indoor pool. A pool located inside the hotel and available for guests to
   * use for swimming and/or soaking. Use may or may not be restricted to adults
   * and/or children.
   */
  indoorPool?: boolean;
  /**
   * Indoor pool exception.
   */
  indoorPoolException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Indoor pools count. The sum of all indoor pools at the hotel.
   */
  indoorPoolsCount?: number;
  /**
   * Indoor pools count exception.
   */
  indoorPoolsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Lazy river. A man-made pool or several interconnected recreational pools
   * built to mimic the shape and current of a winding river where guests float
   * in the water on inflated rubber tubes. Can be indoors or outdoors.
   */
  lazyRiver?: boolean;
  /**
   * Lazy river exception.
   */
  lazyRiverException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Lifeguard. A trained member of the hotel staff stationed by the hotel's
   * indoor or outdoor swimming area and responsible for the safety of swimming
   * guests.
   */
  lifeguard?: boolean;
  /**
   * Lifeguard exception.
   */
  lifeguardException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Outdoor pool. A pool located outside on the grounds of the hotel and
   * available for guests to use for swimming, soaking or recreation. Use may or
   * may not be restricted to adults and/or children.
   */
  outdoorPool?: boolean;
  /**
   * Outdoor pool exception.
   */
  outdoorPoolException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Outdoor pools count. The sum of all outdoor pools at the hotel.
   */
  outdoorPoolsCount?: number;
  /**
   * Outdoor pools count exception.
   */
  outdoorPoolsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Pool. The presence of a pool, either indoors or outdoors, for guests to
   * use for swimming and/or soaking. Use may or may not be restricted to adults
   * and/or children.
   */
  pool?: boolean;
  /**
   * Pool exception.
   */
  poolException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Pools count. The sum of all pools at the hotel.
   */
  poolsCount?: number;
  /**
   * Pools count exception.
   */
  poolsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Wading pool. A shallow pool designed for small children to play in. Can be
   * indoors or outdoors. Also known as kiddie pool.
   */
  wadingPool?: boolean;
  /**
   * Wading pool exception.
   */
  wadingPoolException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Water park. An aquatic recreation area with a large pool or series of
   * pools that has features such as a water slide or tube, wavepool, fountains,
   * rope swings, and/or obstacle course. Can be indoors or outdoors. Also known
   * as adventure pool.
   */
  waterPark?: boolean;
  /**
   * Water park exception.
   */
  waterParkException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Waterslide. A continuously wetted chute positioned by an indoor or outdoor
   * pool which people slide down into the water.
   */
  waterslide?: boolean;
  /**
   * Waterslide exception.
   */
  waterslideException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Wave pool. A large indoor or outdoor pool with a machine that produces
   * water currents to mimic the ocean's crests.
   */
  wavePool?: boolean;
  /**
   * Wave pool exception.
   */
  wavePoolException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * General factual information about the property's physical structure and
 * important dates.
 */
export interface Property {
  /**
   * Built year. The year that construction of the property was completed.
   */
  builtYear?: number;
  /**
   * Built year exception.
   */
  builtYearException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Floors count. The number of stories the building has from the ground floor
   * to the top floor that are accessible to guests.
   */
  floorsCount?: number;
  /**
   * Floors count exception.
   */
  floorsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Last renovated year. The year when the most recent renovation of the
   * property was completed. Renovation may include all or any combination of
   * the following: the units, the public spaces, the exterior, or the interior.
   */
  lastRenovatedYear?: number;
  /**
   * Last renovated year exception.
   */
  lastRenovatedYearException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Rooms count. The total number of rooms and suites bookable by guests for
   * an overnight stay. Does not include event space, public spaces, conference
   * rooms, fitness rooms, business centers, spa, salon, restaurants/bars, or
   * shops.
   */
  roomsCount?: number;
  /**
   * Rooms count exception.
   */
  roomsCountException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Conveniences or help provided by the property to facilitate an easier, more
 * comfortable stay.
 */
export interface Services {
  /**
   * Baggage storage. A provision for guests to leave their bags at the hotel
   * when they arrive for their stay before the official check-in time. May or
   * may not apply for guests who wish to leave their bags after check-out and
   * before departing the locale. Also known as bag dropoff.
   */
  baggageStorage?: boolean;
  /**
   * Baggage storage exception.
   */
  baggageStorageException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Concierge. Hotel staff member(s) responsible for facilitating an easy,
   * comfortable stay through making reservations for meals, sourcing theater
   * tickets, arranging tours, finding a doctor, making recommendations, and
   * answering questions.
   */
  concierge?: boolean;
  /**
   * Concierge exception.
   */
  conciergeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Convenience store. A shop at the hotel primarily selling snacks, drinks,
   * non-prescription medicines, health and beauty aids, magazines and
   * newspapers.
   */
  convenienceStore?: boolean;
  /**
   * Convenience store exception.
   */
  convenienceStoreException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Currency exchange. A staff member or automated machine tasked with the
   * transaction of providing the native currency of the hotel's locale in
   * exchange for the foreign currency provided by a guest.
   */
  currencyExchange?: boolean;
  /**
   * Currency exchange exception.
   */
  currencyExchangeException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Elevator. A passenger elevator that transports guests from one story to
   * another. Also known as lift.
   */
  elevator?: boolean;
  /**
   * Elevator exception.
   */
  elevatorException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Front desk. A counter or desk in the lobby or the immediate interior of
   * the hotel where a member of the staff greets guests and processes the
   * information related to their stay (including check-in and check-out). May
   * or may not be manned and open 24/7.
   */
  frontDesk?: boolean;
  /**
   * Front desk exception.
   */
  frontDeskException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Full service laundry. Laundry and dry cleaning facilitated and handled by
   * the hotel on behalf of the guest. Does not include the provision for guests
   * to do their own laundry in on-site machines.
   */
  fullServiceLaundry?: boolean;
  /**
   * Full service laundry exception.
   */
  fullServiceLaundryException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Gift shop. An on-site store primarily selling souvenirs, mementos and
   * other gift items. May or may not also sell sundries, magazines and
   * newspapers, clothing, or snacks.
   */
  giftShop?: boolean;
  /**
   * Gift shop exception.
   */
  giftShopException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Languages spoken by at least one staff member.
   */
  languagesSpoken?: LanguageSpoken[];
  /**
   * Self service laundry. On-site clothes washers and dryers accessible to
   * guests for the purpose of washing and drying their own clothes. May or may
   * not require payment to use the machines.
   */
  selfServiceLaundry?: boolean;
  /**
   * Self service laundry exception.
   */
  selfServiceLaundryException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Social hour. A reception with complimentary soft drinks, tea, coffee, wine
   * and/or cocktails in the afternoon or evening. Can be hosted by hotel staff
   * or guests may serve themselves. Also known as wine hour. The availability
   * of coffee/tea in the lobby throughout the day does not constitute a social
   * or wine hour.
   */
  socialHour?: boolean;
  /**
   * Social hour exception.
   */
  socialHourException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * 24hr front desk. Front desk is staffed 24 hours a day.
   */
  twentyFourHourFrontDesk?: boolean;
  /**
   * 24hr front desk exception.
   */
  twentyFourHourFrontDeskException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Wake up calls. By direction of the guest, a hotel staff member will phone
   * the guest unit at the requested hour. Also known as morning call.
   */
  wakeUpCalls?: boolean;
  /**
   * Wake up calls exception.
   */
  wakeUpCallsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Sustainability practices implemented at the hotel.
 */
export interface Sustainability {
  /**
   * Energy efficiency practices implemented at the hotel.
   */
  energyEfficiency?: EnergyEfficiency;
  /**
   * Sustainability certifications the hotel has been awarded.
   */
  sustainabilityCertifications?: SustainabilityCertifications;
  /**
   * Sustainable sourcing practices implemented at the hotel.
   */
  sustainableSourcing?: SustainableSourcing;
  /**
   * Waste reduction practices implemented at the hotel.
   */
  wasteReduction?: WasteReduction;
  /**
   * Water conservation practices implemented at the hotel.
   */
  waterConservation?: WaterConservation;
}

/**
 * Sustainability certifications the hotel has been awarded.
 */
export interface SustainabilityCertifications {
  /**
   * BREEAM certification.
   */
  breeamCertification?:  | "BREEAM_CERTIFICATION_UNSPECIFIED" | "NO_BREEAM_CERTIFICATION" | "BREEAM_PASS" | "BREEAM_GOOD" | "BREEAM_VERY_GOOD" | "BREEAM_EXCELLENT" | "BREEAM_OUTSTANDING";
  /**
   * BREEAM certification exception.
   */
  breeamCertificationException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * The eco certificates awarded to the hotel.
   */
  ecoCertifications?: EcoCertification[];
  /**
   * LEED certification. Deprecated: this field is no longer populated. LEED
   * certification status is now provided directly by USGBC.
   */
  leedCertification?:  | "LEED_CERTIFICATION_UNSPECIFIED" | "NO_LEED_CERTIFICATION" | "LEED_CERTIFIED" | "LEED_SILVER" | "LEED_GOLD" | "LEED_PLATINUM";
  /**
   * LEED certification exception. Deprecated: this field is no longer
   * populated. LEED certification status is now provided directly by USGBC.
   */
  leedCertificationException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Sustainable sourcing practices implemented at the hotel.
 */
export interface SustainableSourcing {
  /**
   * Eco friendly toiletries. Soap, shampoo, lotion, and other toiletries
   * provided for guests have a nationally or internationally recognized
   * sustainability certification, such as USDA Organic, EU Organic, or
   * cruelty-free.
   */
  ecoFriendlyToiletries?: boolean;
  /**
   * Eco friendly toiletries exception.
   */
  ecoFriendlyToiletriesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Locally sourced food and beverages. Property sources locally in order to
   * lower the environmental footprint from reduced transportation and to
   * stimulate the local economy. Products produced less than 62 miles from the
   * establishment are normally considered as locally produced.
   */
  locallySourcedFoodAndBeverages?: boolean;
  /**
   * Locally sourced food and beverages exception.
   */
  locallySourcedFoodAndBeveragesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Organic cage free eggs. The property sources 100% certified organic and
   * cage-free eggs (shell, liquid, and egg products). Cage-free means hens are
   * able to walk, spread their wings and lay their eggs in nests).
   */
  organicCageFreeEggs?: boolean;
  /**
   * Organic cage free eggs exception.
   */
  organicCageFreeEggsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Organic food and beverages. At least 25% of food and beverages, by spend,
   * are certified organic. Organic means products that are certified to one of
   * the organic standard listed in the IFOAM family of standards. Qualifying
   * certifications include USDA Organic and EU Organic, among others.
   */
  organicFoodAndBeverages?: boolean;
  /**
   * Organic food and beverages exception.
   */
  organicFoodAndBeveragesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Responsible purchasing policy. The property has a responsible procurement
   * policy in place. Responsible means integration of social, ethical, and/or
   * environmental performance factors into the procurement process when
   * selecting suppliers.
   */
  responsiblePurchasingPolicy?: boolean;
  /**
   * Responsible purchasing policy exception.
   */
  responsiblePurchasingPolicyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Responsibly sources seafood. The property does not source seafood from the
   * Monterey Bay Aquarium Seafood Watch "avoid" list, and must sustainably
   * source seafood listed as "good alternative," "eco-certified," and "best
   * choice". The property has a policy outlining a commitment to source Marine
   * Stewardship Council (MSC) and/or Aquaculture Stewardship Council (ASC)
   * Chain of Custody certified seafood.
   */
  responsiblySourcesSeafood?: boolean;
  /**
   * Responsibly sources seafood exception.
   */
  responsiblySourcesSeafoodException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Vegan meals. The property provides vegan menu options for guests. Vegan
   * food does not contain animal products or byproducts.
   */
  veganMeals?: boolean;
  /**
   * Vegan meals exception.
   */
  veganMealsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Vegetarian meals. The property provides vegetarian menu options for
   * guests. Vegetarian food does not contain meat, poultry, fish, or seafood.
   */
  vegetarianMeals?: boolean;
  /**
   * Vegetarian meals exception.
   */
  vegetarianMealsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * Vehicles or vehicular services facilitated or owned by the property.
 */
export interface Transportation {
  /**
   * Airport shuttle. The hotel provides guests with a chauffeured van or bus
   * to and from the airport. Can be free or for a fee. Guests may share the
   * vehicle with other guests unknown to them. Applies if the hotel has a
   * third-party shuttle service (office/desk etc.) within the hotel. As long as
   * hotel provides this service, it doesn't matter if it's directly with them
   * or a third party they work with. Does not apply if guest has to coordinate
   * with an entity outside/other than the hotel.
   */
  airportShuttle?: boolean;
  /**
   * Airport shuttle exception.
   */
  airportShuttleException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Car rental on property. A branch of a rental car company with a processing
   * desk in the hotel. Available cars for rent may be awaiting at the hotel or
   * in a nearby lot.
   */
  carRentalOnProperty?: boolean;
  /**
   * Car rental on property exception.
   */
  carRentalOnPropertyException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free airport shuttle. Airport shuttle is free to guests. Must be free to
   * all guests without any conditions.
   */
  freeAirportShuttle?: boolean;
  /**
   * Free airport shuttle exception.
   */
  freeAirportShuttleException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free private car service. Private chauffeured car service is free to
   * guests.
   */
  freePrivateCarService?: boolean;
  /**
   * Free private car service exception.
   */
  freePrivateCarServiceException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Local shuttle. A car, van or bus provided by the hotel to transport guests
   * to destinations within a specified range of distance around the hotel.
   * Usually shopping and/or convention centers, downtown districts, or beaches.
   * Can be free or for a fee.
   */
  localShuttle?: boolean;
  /**
   * Local shuttle exception.
   */
  localShuttleException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Private car service. Hotel provides a private chauffeured car to transport
   * guests to destinations. Passengers in the car are either alone or are known
   * to one another and have requested the car together. Service can be free or
   * for a fee and travel distance is usually limited to a specific range. Not a
   * taxi.
   */
  privateCarService?: boolean;
  /**
   * Private car service exception.
   */
  privateCarServiceException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Transfer. Hotel provides a shuttle service or car service to take guests
   * to and from the nearest airport or train station. Can be free or for a fee.
   * Guests may share the vehicle with other guests unknown to them.
   */
  transfer?: boolean;
  /**
   * Transfer exception.
   */
  transferException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Views available from the guest unit itself.
 */
export interface ViewsFromUnit {
  /**
   * Beach view. A guestroom that features a window through which guests can
   * see the beach.
   */
  beachView?: boolean;
  /**
   * Beach view exception.
   */
  beachViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * City view. A guestroom that features a window through which guests can see
   * the buildings, parks and/or streets of the city.
   */
  cityView?: boolean;
  /**
   * City view exception.
   */
  cityViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Garden view. A guestroom that features a window through which guests can
   * see a garden.
   */
  gardenView?: boolean;
  /**
   * Garden view exception.
   */
  gardenViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Lake view.
   */
  lakeView?: boolean;
  /**
   * Lake view exception.
   */
  lakeViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Landmark view. A guestroom that features a window through which guests can
   * see a landmark such as the countryside, a golf course, the forest, a park,
   * a rain forst, a mountain or a slope.
   */
  landmarkView?: boolean;
  /**
   * Landmark view exception.
   */
  landmarkViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Ocean view. A guestroom that features a window through which guests can
   * see the ocean.
   */
  oceanView?: boolean;
  /**
   * Ocean view exception.
   */
  oceanViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Pool view. A guestroom that features a window through which guests can see
   * the hotel's swimming pool.
   */
  poolView?: boolean;
  /**
   * Pool view exception.
   */
  poolViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Valley view. A guestroom that features a window through which guests can
   * see over a valley.
   */
  valleyView?: boolean;
  /**
   * Valley view exception.
   */
  valleyViewException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Waste reduction practices implemented at the hotel.
 */
export interface WasteReduction {
  /**
   * Compostable food containers and cutlery. 100% of food service containers
   * and to-go cutlery are compostable, and reusable utensils are offered
   * wherever possible. Compostable materials are capable of undergoing
   * biological decomposition in a compost site, such that material is not
   * visually distinguishable and breaks down into carbon dioxide, water,
   * inorganic compounds, and biomass.
   */
  compostableFoodContainersAndCutlery?: boolean;
  /**
   * Compostable food containers and cutlery exception.
   */
  compostableFoodContainersAndCutleryException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Composts excess food. The property has a program and/or policy for
   * diverting waste from landfill by composting food and yard waste, either
   * through compost collection and off-site processing or on-site compost
   * processing.
   */
  compostsExcessFood?: boolean;
  /**
   * Composts excess food exception.
   */
  compostsExcessFoodException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Donates excess food. The property has a program and/or policy for
   * diverting waste from landfill that may include efforts to donate for human
   * consumption or divert food for animal feed.
   */
  donatesExcessFood?: boolean;
  /**
   * Donates excess food exception.
   */
  donatesExcessFoodException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Food waste reduction program. The property has established a food waste
   * reduction and donation program, aiming to reduce food waste by half. These
   * programs typically use tools such as the Hotel Kitchen Toolkit and others
   * to track waste and measure progress.
   */
  foodWasteReductionProgram?: boolean;
  /**
   * Food waste reduction program exception.
   */
  foodWasteReductionProgramException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * No single use plastic straws. The property bans single-use plastic straws.
   */
  noSingleUsePlasticStraws?: boolean;
  /**
   * No single use plastic straws exception.
   */
  noSingleUsePlasticStrawsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * No single use plastic water bottles. The property bans single-use plastic
   * water bottles.
   */
  noSingleUsePlasticWaterBottles?: boolean;
  /**
   * No single use plastic water bottles exception.
   */
  noSingleUsePlasticWaterBottlesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * No styrofoam food containers. The property eliminates the use of Styrofoam
   * in disposable food service items.
   */
  noStyrofoamFoodContainers?: boolean;
  /**
   * No styrofoam food containers exception.
   */
  noStyrofoamFoodContainersException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Recycling program. The property has a recycling program, aligned with LEED
   * waste requirements, and a policy outlining efforts to send less than 50% of
   * waste to landfill. The recycling program includes storage locations for
   * recyclable materials, including mixed paper, corrugated cardboard, glass,
   * plastics, and metals.
   */
  recyclingProgram?: boolean;
  /**
   * Recycling program exception.
   */
  recyclingProgramException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Refillable toiletry containers. The property has replaced miniature
   * individual containers with refillable amenity dispensers for shampoo,
   * conditioner, soap, and lotion.
   */
  refillableToiletryContainers?: boolean;
  /**
   * Refillable toiletry containers exception.
   */
  refillableToiletryContainersException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Safely disposes batteries. The property safely stores and disposes
   * batteries.
   */
  safelyDisposesBatteries?: boolean;
  /**
   * Safely disposes batteries exception.
   */
  safelyDisposesBatteriesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Safely disposes electronics. The property has a reputable recycling
   * program that keeps hazardous electronic parts and chemical compounds out of
   * landfills, dumps and other unauthorized abandonment sites, and
   * recycles/reuses applicable materials. (e.g. certified electronics
   * recyclers).
   */
  safelyDisposesElectronics?: boolean;
  /**
   * Safely disposes electronics exception.
   */
  safelyDisposesElectronicsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Safely disposes lightbulbs. The property safely stores and disposes
   * lightbulbs.
   */
  safelyDisposesLightbulbs?: boolean;
  /**
   * Safely disposes lightbulbs exception.
   */
  safelyDisposesLightbulbsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Safely handles hazardous substances. The property has a hazardous waste
   * management program aligned wit GreenSeal and LEED requirements, and meets
   * all regulatory requirements for hazardous waste disposal and recycling.
   * Hazardous means substances that are classified as "hazardous" by an
   * authoritative body (such as OSHA or DOT), are labeled with signal words
   * such as "Danger," "Caution," "Warning," or are flammable, corrosive, or
   * ignitable. Requirements include: - The property shall maintain records of
   * the efforts it has made to replace the hazardous substances it uses with
   * less hazardous alternatives. - An inventory of the hazardous materials
   * stored on-site. - Products intended for cleaning, dishwashing, laundry, and
   * pool maintenance shall be stored in clearly labeled containers. These
   * containers shall be checked regularly for leaks, and replaced a necessary.
   * - Spill containment devices shall be installed to collect spills, drips, or
   * leaching of chemicals.
   */
  safelyHandlesHazardousSubstances?: boolean;
  /**
   * Safely handles hazardous substances exception.
   */
  safelyHandlesHazardousSubstancesException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Soap donation program. The property participates in a soap donation
   * program such as Clean the World or something similar.
   */
  soapDonationProgram?: boolean;
  /**
   * Soap donation program exception.
   */
  soapDonationProgramException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Toiletry donation program. The property participates in a toiletry
   * donation program such as Clean the World or something similar.
   */
  toiletryDonationProgram?: boolean;
  /**
   * Toiletry donation program exception.
   */
  toiletryDonationProgramException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Water bottle filling stations. The property offers water stations
   * throughout the building for guest use.
   */
  waterBottleFillingStations?: boolean;
  /**
   * Water bottle filling stations exception.
   */
  waterBottleFillingStationsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Water conservation practices implemented at the hotel.
 */
export interface WaterConservation {
  /**
   * Independent organization audits water use. The property conducts a water
   * conservation audit every 5 years, the results of which are either verified
   * by a third-party and/or published in external communications. A water
   * conservation audit is a detailed assessment of the facility, providing
   * recommendations to existing operations and procedures to improve water
   * efficiency, available incentives or rebates, and opportunities for
   * improvements through renovations or upgrades. Examples of organizations who
   * conduct credible third party audits include: Engie Impact, and local
   * utility providers (they often provide energy and water audits).
   */
  independentOrganizationAuditsWaterUse?: boolean;
  /**
   * Independent organization audits water use exception.
   */
  independentOrganizationAuditsWaterUseException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Linen reuse program. The property offers a linen reuse program.
   */
  linenReuseProgram?: boolean;
  /**
   * Linen reuse program exception.
   */
  linenReuseProgramException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Towel reuse program. The property offers a towel reuse program.
   */
  towelReuseProgram?: boolean;
  /**
   * Towel reuse program exception.
   */
  towelReuseProgramException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Water saving showers. All of the property's guest rooms have shower heads
   * that use no more than 2.0 gallons per minute (gpm).
   */
  waterSavingShowers?: boolean;
  /**
   * Water saving showers exception.
   */
  waterSavingShowersException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Water saving sinks. All of the property's guest rooms have bathroom
   * faucets that use a maximum of 1.5 gallons per minute (gpm), public restroom
   * faucets do not exceed 0.5 gpm, and kitchen faucets (excluding faucets used
   * exclusively for filling operations) do not exceed 2.2 gpm.
   */
  waterSavingSinks?: boolean;
  /**
   * Water saving sinks exception.
   */
  waterSavingSinksException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Water saving toilets. All of the property's toilets use 1.6 gallons per
   * flush, or less.
   */
  waterSavingToilets?: boolean;
  /**
   * Water saving toilets exception.
   */
  waterSavingToiletsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}

/**
 * Guest facilities at the property to promote or maintain health, beauty, and
 * fitness.
 */
export interface Wellness {
  /**
   * Doctor on call. The hotel has a contract with a medical professional who
   * provides services to hotel guests should they fall ill during their stay.
   * The doctor may or may not have an on-site office or be at the hotel at all
   * times.
   */
  doctorOnCall?: boolean;
  /**
   * Doctor on call exception.
   */
  doctorOnCallException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Elliptical machine. An electric, stationary fitness machine with pedals
   * that simulates climbing, walking or running and provides a user-controlled
   * range of speeds and tensions. May not have arm-controlled levers to work
   * out the upper body as well. Commonly found in a gym, fitness room, health
   * center, or health club.
   */
  ellipticalMachine?: boolean;
  /**
   * Elliptical machine exception.
   */
  ellipticalMachineException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Fitness center. A room or building at the hotel containing equipment to
   * promote physical activity, such as treadmills, elliptical machines,
   * stationary bikes, weight machines, free weights, and/or stretching mats.
   * Use of the fitness center can be free or for a fee. May or may not be
   * staffed. May or may not offer instructor-led classes in various styles of
   * physical conditioning. May or may not be open 24/7. May or may not include
   * locker rooms and showers. Also known as health club, gym, fitness room,
   * health center.
   */
  fitnessCenter?: boolean;
  /**
   * Fitness center exception.
   */
  fitnessCenterException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free fitness center. Guests may use the fitness center for free.
   */
  freeFitnessCenter?: boolean;
  /**
   * Free fitness center exception.
   */
  freeFitnessCenterException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Free weights. Individual handheld fitness equipment of varied weights used
   * for upper body strength training or bodybuilding. Also known as barbells,
   * dumbbells, or kettlebells. Often stored on a rack with the weights arranged
   * from light to heavy. Commonly found in a gym, fitness room, health center,
   * or health club.
   */
  freeWeights?: boolean;
  /**
   * Free weights exception.
   */
  freeWeightsException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Massage. A service provided by a trained massage therapist involving the
   * physical manipulation of a guest's muscles in order to achieve relaxation
   * or pain relief.
   */
  massage?: boolean;
  /**
   * Massage exception.
   */
  massageException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Salon. A room at the hotel where professionals provide hair styling
   * services such as shampooing, blow drying, hair dos, hair cutting and hair
   * coloring. Also known as hairdresser or beauty salon.
   */
  salon?: boolean;
  /**
   * Salon exception.
   */
  salonException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Sauna. A wood-paneled room heated to a high temperature where guests sit
   * on built-in wood benches for the purpose of perspiring and relaxing their
   * muscles. Can be dry or slightly wet heat. Not a steam room.
   */
  sauna?: boolean;
  /**
   * Sauna exception.
   */
  saunaException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Spa. A designated area, room or building at the hotel offering health and
   * beauty treatment through such means as steam baths, exercise equipment, and
   * massage. May also offer facials, nail care, and hair care. Services are
   * usually available by appointment and for an additional fee. Does not apply
   * if hotel only offers a steam room; must offer other beauty and/or health
   * treatments as well.
   */
  spa?: boolean;
  /**
   * Spa exception.
   */
  spaException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Treadmill. An electric stationary fitness machine that simulates a moving
   * path to promote walking or running within a range of user-controlled speeds
   * and inclines. Also known as running machine. Commonly found in a gym,
   * fitness room, health center, or health club.
   */
  treadmill?: boolean;
  /**
   * Treadmill exception.
   */
  treadmillException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
  /**
   * Weight machine. Non-electronic fitness equipment designed for the user to
   * target the exertion of different muscles. Usually incorporates a padded
   * seat, a stack of flat weights and various bars and pulleys. May be designed
   * for toning a specific part of the body or may involve different
   * user-controlled settings, hardware and pulleys so as to provide an overall
   * workout in one machine. Commonly found in a gym, fitness center, fitness
   * room, or health club.
   */
  weightMachine?: boolean;
  /**
   * Weight machine exception.
   */
  weightMachineException?:  | "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK";
}