// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Data Loss Prevention (DLP) API Client for Deno
 * ====================================================
 * 
 * Provides methods for detection, risk analysis, and de-identification of privacy-sensitive fragments in text, images, and Google Cloud Platform storage repositories.
 * 
 * Docs: https://cloud.google.com/dlp/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides methods for detection, risk analysis, and de-identification of
 * privacy-sensitive fragments in text, images, and Google Cloud Platform
 * storage repositories.
 */
export class dlp {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dlp.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns a list of the sensitive information types that DLP API supports.
   * See https://cloud.google.com/dlp/docs/infotypes-reference to learn more.
   *
   */
  async infoTypesList(opts: InfoTypesListOptions = {}): Promise<GooglePrivacyDlpV2ListInfoTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/infoTypes`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GooglePrivacyDlpV2ListInfoTypesResponse;
  }

  /**
   * Returns a list of the sensitive information types that DLP API supports.
   * See https://cloud.google.com/dlp/docs/infotypes-reference to learn more.
   *
   * @param parent The parent resource name. The format of this value is as follows: locations/ LOCATION_ID
   */
  async locationsInfoTypesList(parent: string, opts: LocationsInfoTypesListOptions = {}): Promise<GooglePrivacyDlpV2ListInfoTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/infoTypes`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GooglePrivacyDlpV2ListInfoTypesResponse;
  }

  /**
   * Creates a DeidentifyTemplate for reusing frequently used configuration for
   * de-identifying content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsDeidentifyTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2CreateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Deletes a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async organizationsDeidentifyTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async organizationsDeidentifyTemplatesGet(name: string): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Lists DeidentifyTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsDeidentifyTemplatesList(parent: string, opts: OrganizationsDeidentifyTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListDeidentifyTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListDeidentifyTemplatesResponse(data);
  }

  /**
   * Updates the DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async organizationsDeidentifyTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Creates an InspectTemplate for reusing frequently used configuration for
   * inspecting content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsInspectTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2CreateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Deletes an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async organizationsInspectTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async organizationsInspectTemplatesGet(name: string): Promise<GooglePrivacyDlpV2InspectTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Lists InspectTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsInspectTemplatesList(parent: string, opts: OrganizationsInspectTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListInspectTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListInspectTemplatesResponse(data);
  }

  /**
   * Updates the InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async organizationsInspectTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Creates a DeidentifyTemplate for reusing frequently used configuration for
   * de-identifying content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsDeidentifyTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2CreateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Deletes a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async organizationsLocationsDeidentifyTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async organizationsLocationsDeidentifyTemplatesGet(name: string): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Lists DeidentifyTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsDeidentifyTemplatesList(parent: string, opts: OrganizationsLocationsDeidentifyTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListDeidentifyTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListDeidentifyTemplatesResponse(data);
  }

  /**
   * Updates the DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async organizationsLocationsDeidentifyTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Lists DlpJobs that match the specified filter in the request. See
   * https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsDlpJobsList(parent: string, opts: OrganizationsLocationsDlpJobsListOptions = {}): Promise<GooglePrivacyDlpV2ListDlpJobsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/dlpJobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2ListDlpJobsResponse(data);
  }

  /**
   * Creates an InspectTemplate for reusing frequently used configuration for
   * inspecting content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsInspectTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2CreateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Deletes an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async organizationsLocationsInspectTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async organizationsLocationsInspectTemplatesGet(name: string): Promise<GooglePrivacyDlpV2InspectTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Lists InspectTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsInspectTemplatesList(parent: string, opts: OrganizationsLocationsInspectTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListInspectTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListInspectTemplatesResponse(data);
  }

  /**
   * Updates the InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async organizationsLocationsInspectTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Creates a job trigger to run DLP actions such as scanning storage for
   * sensitive information on a set schedule. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsJobTriggersCreate(parent: string, req: GooglePrivacyDlpV2CreateJobTriggerRequest): Promise<GooglePrivacyDlpV2JobTrigger> {
    req = serializeGooglePrivacyDlpV2CreateJobTriggerRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobTriggers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Deletes a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async organizationsLocationsJobTriggersDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async organizationsLocationsJobTriggersGet(name: string): Promise<GooglePrivacyDlpV2JobTrigger> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Lists job triggers. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsJobTriggersList(parent: string, opts: OrganizationsLocationsJobTriggersListOptions = {}): Promise<GooglePrivacyDlpV2ListJobTriggersResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobTriggers`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2ListJobTriggersResponse(data);
  }

  /**
   * Updates a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async organizationsLocationsJobTriggersPatch(name: string, req: GooglePrivacyDlpV2UpdateJobTriggerRequest): Promise<GooglePrivacyDlpV2JobTrigger> {
    req = serializeGooglePrivacyDlpV2UpdateJobTriggerRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Creates a pre-built stored infoType to be used for inspection. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsStoredInfoTypesCreate(parent: string, req: GooglePrivacyDlpV2CreateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Deletes a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async organizationsLocationsStoredInfoTypesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async organizationsLocationsStoredInfoTypesGet(name: string): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Lists stored infoTypes. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsLocationsStoredInfoTypesList(parent: string, opts: OrganizationsLocationsStoredInfoTypesListOptions = {}): Promise<GooglePrivacyDlpV2ListStoredInfoTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListStoredInfoTypesResponse(data);
  }

  /**
   * Updates the stored infoType by creating a new version. The existing
   * version will continue to be used until the new version is ready. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async organizationsLocationsStoredInfoTypesPatch(name: string, req: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    req = serializeGooglePrivacyDlpV2UpdateStoredInfoTypeRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Creates a pre-built stored infoType to be used for inspection. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsStoredInfoTypesCreate(parent: string, req: GooglePrivacyDlpV2CreateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Deletes a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async organizationsStoredInfoTypesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async organizationsStoredInfoTypesGet(name: string): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Lists stored infoTypes. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async organizationsStoredInfoTypesList(parent: string, opts: OrganizationsStoredInfoTypesListOptions = {}): Promise<GooglePrivacyDlpV2ListStoredInfoTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListStoredInfoTypesResponse(data);
  }

  /**
   * Updates the stored infoType by creating a new version. The existing
   * version will continue to be used until the new version is ready. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async organizationsStoredInfoTypesPatch(name: string, req: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    req = serializeGooglePrivacyDlpV2UpdateStoredInfoTypeRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * De-identifies potentially sensitive info from a ContentItem. This method
   * has limits on input size and output size. See
   * https://cloud.google.com/dlp/docs/deidentify-sensitive-data to learn more.
   * When no InfoTypes or CustomInfoTypes are specified in this request, the
   * system will automatically choose what detectors to run. By default this may
   * be all types, but may change over time as detectors are updated.
   *
   * @param parent Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsContentDeidentify(parent: string, req: GooglePrivacyDlpV2DeidentifyContentRequest): Promise<GooglePrivacyDlpV2DeidentifyContentResponse> {
    req = serializeGooglePrivacyDlpV2DeidentifyContentRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/content:deidentify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyContentResponse(data);
  }

  /**
   * Finds potentially sensitive info in content. This method has limits on
   * input size, processing time, and output size. When no InfoTypes or
   * CustomInfoTypes are specified in this request, the system will
   * automatically choose what detectors to run. By default this may be all
   * types, but may change over time as detectors are updated. For how to
   * guides, see https://cloud.google.com/dlp/docs/inspecting-images and
   * https://cloud.google.com/dlp/docs/inspecting-text,
   *
   * @param parent Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsContentInspect(parent: string, req: GooglePrivacyDlpV2InspectContentRequest): Promise<GooglePrivacyDlpV2InspectContentResponse> {
    req = serializeGooglePrivacyDlpV2InspectContentRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/content:inspect`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectContentResponse(data);
  }

  /**
   * Re-identifies content that has been de-identified. See
   * https://cloud.google.com/dlp/docs/pseudonymization#re-identification_in_free_text_code_example
   * to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsContentReidentify(parent: string, req: GooglePrivacyDlpV2ReidentifyContentRequest): Promise<GooglePrivacyDlpV2ReidentifyContentResponse> {
    req = serializeGooglePrivacyDlpV2ReidentifyContentRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/content:reidentify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2ReidentifyContentResponse(data);
  }

  /**
   * Creates a DeidentifyTemplate for reusing frequently used configuration for
   * de-identifying content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsDeidentifyTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2CreateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Deletes a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async projectsDeidentifyTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async projectsDeidentifyTemplatesGet(name: string): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Lists DeidentifyTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsDeidentifyTemplatesList(parent: string, opts: ProjectsDeidentifyTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListDeidentifyTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListDeidentifyTemplatesResponse(data);
  }

  /**
   * Updates the DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async projectsDeidentifyTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Starts asynchronous cancellation on a long-running DlpJob. The server
   * makes a best effort to cancel the DlpJob, but success is not guaranteed.
   * See https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param name Required. The name of the DlpJob resource to be cancelled.
   */
  async projectsDlpJobsCancel(name: string, req: GooglePrivacyDlpV2CancelDlpJobRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a new job to inspect storage or calculate risk metrics. See
   * https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more. When
   * no InfoTypes or CustomInfoTypes are specified in inspect jobs, the system
   * will automatically choose what detectors to run. By default this may be all
   * types, but may change over time as detectors are updated.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsDlpJobsCreate(parent: string, req: GooglePrivacyDlpV2CreateDlpJobRequest): Promise<GooglePrivacyDlpV2DlpJob> {
    req = serializeGooglePrivacyDlpV2CreateDlpJobRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/dlpJobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DlpJob(data);
  }

  /**
   * Deletes a long-running DlpJob. This method indicates that the client is no
   * longer interested in the DlpJob result. The job will be canceled if
   * possible. See https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param name Required. The name of the DlpJob resource to be deleted.
   */
  async projectsDlpJobsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the latest state of a long-running DlpJob. See
   * https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param name Required. The name of the DlpJob resource.
   */
  async projectsDlpJobsGet(name: string): Promise<GooglePrivacyDlpV2DlpJob> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2DlpJob(data);
  }

  /**
   * Lists DlpJobs that match the specified filter in the request. See
   * https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsDlpJobsList(parent: string, opts: ProjectsDlpJobsListOptions = {}): Promise<GooglePrivacyDlpV2ListDlpJobsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/dlpJobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2ListDlpJobsResponse(data);
  }

  /**
   * Redacts potentially sensitive info from an image. This method has limits
   * on input size, processing time, and output size. See
   * https://cloud.google.com/dlp/docs/redacting-sensitive-data-images to learn
   * more. When no InfoTypes or CustomInfoTypes are specified in this request,
   * the system will automatically choose what detectors to run. By default this
   * may be all types, but may change over time as detectors are updated.
   *
   * @param parent Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsImageRedact(parent: string, req: GooglePrivacyDlpV2RedactImageRequest): Promise<GooglePrivacyDlpV2RedactImageResponse> {
    req = serializeGooglePrivacyDlpV2RedactImageRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/image:redact`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2RedactImageResponse(data);
  }

  /**
   * Creates an InspectTemplate for reusing frequently used configuration for
   * inspecting content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsInspectTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2CreateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Deletes an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async projectsInspectTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async projectsInspectTemplatesGet(name: string): Promise<GooglePrivacyDlpV2InspectTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Lists InspectTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsInspectTemplatesList(parent: string, opts: ProjectsInspectTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListInspectTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListInspectTemplatesResponse(data);
  }

  /**
   * Updates the InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async projectsInspectTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Activate a job trigger. Causes the immediate execute of a trigger instead
   * of waiting on the trigger event to occur.
   *
   * @param name Required. Resource name of the trigger to activate, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsJobTriggersActivate(name: string, req: GooglePrivacyDlpV2ActivateJobTriggerRequest): Promise<GooglePrivacyDlpV2DlpJob> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DlpJob(data);
  }

  /**
   * Creates a job trigger to run DLP actions such as scanning storage for
   * sensitive information on a set schedule. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsJobTriggersCreate(parent: string, req: GooglePrivacyDlpV2CreateJobTriggerRequest): Promise<GooglePrivacyDlpV2JobTrigger> {
    req = serializeGooglePrivacyDlpV2CreateJobTriggerRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobTriggers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Deletes a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsJobTriggersDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsJobTriggersGet(name: string): Promise<GooglePrivacyDlpV2JobTrigger> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Lists job triggers. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsJobTriggersList(parent: string, opts: ProjectsJobTriggersListOptions = {}): Promise<GooglePrivacyDlpV2ListJobTriggersResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobTriggers`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2ListJobTriggersResponse(data);
  }

  /**
   * Updates a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsJobTriggersPatch(name: string, req: GooglePrivacyDlpV2UpdateJobTriggerRequest): Promise<GooglePrivacyDlpV2JobTrigger> {
    req = serializeGooglePrivacyDlpV2UpdateJobTriggerRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * De-identifies potentially sensitive info from a ContentItem. This method
   * has limits on input size and output size. See
   * https://cloud.google.com/dlp/docs/deidentify-sensitive-data to learn more.
   * When no InfoTypes or CustomInfoTypes are specified in this request, the
   * system will automatically choose what detectors to run. By default this may
   * be all types, but may change over time as detectors are updated.
   *
   * @param parent Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsContentDeidentify(parent: string, req: GooglePrivacyDlpV2DeidentifyContentRequest): Promise<GooglePrivacyDlpV2DeidentifyContentResponse> {
    req = serializeGooglePrivacyDlpV2DeidentifyContentRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/content:deidentify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyContentResponse(data);
  }

  /**
   * Finds potentially sensitive info in content. This method has limits on
   * input size, processing time, and output size. When no InfoTypes or
   * CustomInfoTypes are specified in this request, the system will
   * automatically choose what detectors to run. By default this may be all
   * types, but may change over time as detectors are updated. For how to
   * guides, see https://cloud.google.com/dlp/docs/inspecting-images and
   * https://cloud.google.com/dlp/docs/inspecting-text,
   *
   * @param parent Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsContentInspect(parent: string, req: GooglePrivacyDlpV2InspectContentRequest): Promise<GooglePrivacyDlpV2InspectContentResponse> {
    req = serializeGooglePrivacyDlpV2InspectContentRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/content:inspect`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectContentResponse(data);
  }

  /**
   * Re-identifies content that has been de-identified. See
   * https://cloud.google.com/dlp/docs/pseudonymization#re-identification_in_free_text_code_example
   * to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsContentReidentify(parent: string, req: GooglePrivacyDlpV2ReidentifyContentRequest): Promise<GooglePrivacyDlpV2ReidentifyContentResponse> {
    req = serializeGooglePrivacyDlpV2ReidentifyContentRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/content:reidentify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2ReidentifyContentResponse(data);
  }

  /**
   * Creates a DeidentifyTemplate for reusing frequently used configuration for
   * de-identifying content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsDeidentifyTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2CreateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Deletes a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be deleted, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async projectsLocationsDeidentifyTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of the organization and deidentify template to be read, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async projectsLocationsDeidentifyTemplatesGet(name: string): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Lists DeidentifyTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsDeidentifyTemplatesList(parent: string, opts: ProjectsLocationsDeidentifyTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListDeidentifyTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/deidentifyTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListDeidentifyTemplatesResponse(data);
  }

  /**
   * Updates the DeidentifyTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates-deid to learn more.
   *
   * @param name Required. Resource name of organization and deidentify template to be updated, for example `organizations/433245324/deidentifyTemplates/432452342` or projects/project-id/deidentifyTemplates/432452342.
   */
  async projectsLocationsDeidentifyTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest): Promise<GooglePrivacyDlpV2DeidentifyTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateDeidentifyTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2DeidentifyTemplate(data);
  }

  /**
   * Starts asynchronous cancellation on a long-running DlpJob. The server
   * makes a best effort to cancel the DlpJob, but success is not guaranteed.
   * See https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param name Required. The name of the DlpJob resource to be cancelled.
   */
  async projectsLocationsDlpJobsCancel(name: string, req: GooglePrivacyDlpV2CancelDlpJobRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a new job to inspect storage or calculate risk metrics. See
   * https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more. When
   * no InfoTypes or CustomInfoTypes are specified in inspect jobs, the system
   * will automatically choose what detectors to run. By default this may be all
   * types, but may change over time as detectors are updated.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsDlpJobsCreate(parent: string, req: GooglePrivacyDlpV2CreateDlpJobRequest): Promise<GooglePrivacyDlpV2DlpJob> {
    req = serializeGooglePrivacyDlpV2CreateDlpJobRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/dlpJobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DlpJob(data);
  }

  /**
   * Deletes a long-running DlpJob. This method indicates that the client is no
   * longer interested in the DlpJob result. The job will be canceled if
   * possible. See https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param name Required. The name of the DlpJob resource to be deleted.
   */
  async projectsLocationsDlpJobsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Finish a running hybrid DlpJob. Triggers the finalization steps and
   * running of any enabled actions that have not yet run.
   *
   * @param name Required. The name of the DlpJob resource to be cancelled.
   */
  async projectsLocationsDlpJobsFinish(name: string, req: GooglePrivacyDlpV2FinishDlpJobRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:finish`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the latest state of a long-running DlpJob. See
   * https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param name Required. The name of the DlpJob resource.
   */
  async projectsLocationsDlpJobsGet(name: string): Promise<GooglePrivacyDlpV2DlpJob> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2DlpJob(data);
  }

  /**
   * Inspect hybrid content and store findings to a job. To review the
   * findings, inspect the job. Inspection will occur asynchronously.
   *
   * @param name Required. Resource name of the job to execute a hybrid inspect on, for example `projects/dlp-test-project/dlpJob/53234423`.
   */
  async projectsLocationsDlpJobsHybridInspect(name: string, req: GooglePrivacyDlpV2HybridInspectDlpJobRequest): Promise<GooglePrivacyDlpV2HybridInspectResponse> {
    req = serializeGooglePrivacyDlpV2HybridInspectDlpJobRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:hybridInspect`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GooglePrivacyDlpV2HybridInspectResponse;
  }

  /**
   * Lists DlpJobs that match the specified filter in the request. See
   * https://cloud.google.com/dlp/docs/inspecting-storage and
   * https://cloud.google.com/dlp/docs/compute-risk-analysis to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsDlpJobsList(parent: string, opts: ProjectsLocationsDlpJobsListOptions = {}): Promise<GooglePrivacyDlpV2ListDlpJobsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/dlpJobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2ListDlpJobsResponse(data);
  }

  /**
   * Redacts potentially sensitive info from an image. This method has limits
   * on input size, processing time, and output size. See
   * https://cloud.google.com/dlp/docs/redacting-sensitive-data-images to learn
   * more. When no InfoTypes or CustomInfoTypes are specified in this request,
   * the system will automatically choose what detectors to run. By default this
   * may be all types, but may change over time as detectors are updated.
   *
   * @param parent Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsImageRedact(parent: string, req: GooglePrivacyDlpV2RedactImageRequest): Promise<GooglePrivacyDlpV2RedactImageResponse> {
    req = serializeGooglePrivacyDlpV2RedactImageRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/image:redact`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2RedactImageResponse(data);
  }

  /**
   * Creates an InspectTemplate for reusing frequently used configuration for
   * inspecting content, images, and storage. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsInspectTemplatesCreate(parent: string, req: GooglePrivacyDlpV2CreateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2CreateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Deletes an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be deleted, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async projectsLocationsInspectTemplatesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of the organization and inspectTemplate to be read, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async projectsLocationsInspectTemplatesGet(name: string): Promise<GooglePrivacyDlpV2InspectTemplate> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Lists InspectTemplates. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsInspectTemplatesList(parent: string, opts: ProjectsLocationsInspectTemplatesListOptions = {}): Promise<GooglePrivacyDlpV2ListInspectTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/inspectTemplates`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListInspectTemplatesResponse(data);
  }

  /**
   * Updates the InspectTemplate. See
   * https://cloud.google.com/dlp/docs/creating-templates to learn more.
   *
   * @param name Required. Resource name of organization and inspectTemplate to be updated, for example `organizations/433245324/inspectTemplates/432452342` or projects/project-id/inspectTemplates/432452342.
   */
  async projectsLocationsInspectTemplatesPatch(name: string, req: GooglePrivacyDlpV2UpdateInspectTemplateRequest): Promise<GooglePrivacyDlpV2InspectTemplate> {
    req = serializeGooglePrivacyDlpV2UpdateInspectTemplateRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2InspectTemplate(data);
  }

  /**
   * Activate a job trigger. Causes the immediate execute of a trigger instead
   * of waiting on the trigger event to occur.
   *
   * @param name Required. Resource name of the trigger to activate, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsLocationsJobTriggersActivate(name: string, req: GooglePrivacyDlpV2ActivateJobTriggerRequest): Promise<GooglePrivacyDlpV2DlpJob> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2DlpJob(data);
  }

  /**
   * Creates a job trigger to run DLP actions such as scanning storage for
   * sensitive information on a set schedule. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsJobTriggersCreate(parent: string, req: GooglePrivacyDlpV2CreateJobTriggerRequest): Promise<GooglePrivacyDlpV2JobTrigger> {
    req = serializeGooglePrivacyDlpV2CreateJobTriggerRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobTriggers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Deletes a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsLocationsJobTriggersDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsLocationsJobTriggersGet(name: string): Promise<GooglePrivacyDlpV2JobTrigger> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Inspect hybrid content and store findings to a trigger. The inspection
   * will be processed asynchronously. To review the findings monitor the jobs
   * within the trigger.
   *
   * @param name Required. Resource name of the trigger to execute a hybrid inspect on, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsLocationsJobTriggersHybridInspect(name: string, req: GooglePrivacyDlpV2HybridInspectJobTriggerRequest): Promise<GooglePrivacyDlpV2HybridInspectResponse> {
    req = serializeGooglePrivacyDlpV2HybridInspectJobTriggerRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:hybridInspect`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GooglePrivacyDlpV2HybridInspectResponse;
  }

  /**
   * Lists job triggers. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsJobTriggersList(parent: string, opts: ProjectsLocationsJobTriggersListOptions = {}): Promise<GooglePrivacyDlpV2ListJobTriggersResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobTriggers`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2ListJobTriggersResponse(data);
  }

  /**
   * Updates a job trigger. See
   * https://cloud.google.com/dlp/docs/creating-job-triggers to learn more.
   *
   * @param name Required. Resource name of the project and the triggeredJob, for example `projects/dlp-test-project/jobTriggers/53234423`.
   */
  async projectsLocationsJobTriggersPatch(name: string, req: GooglePrivacyDlpV2UpdateJobTriggerRequest): Promise<GooglePrivacyDlpV2JobTrigger> {
    req = serializeGooglePrivacyDlpV2UpdateJobTriggerRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2JobTrigger(data);
  }

  /**
   * Creates a pre-built stored infoType to be used for inspection. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsStoredInfoTypesCreate(parent: string, req: GooglePrivacyDlpV2CreateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Deletes a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async projectsLocationsStoredInfoTypesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async projectsLocationsStoredInfoTypesGet(name: string): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Lists stored infoTypes. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsLocationsStoredInfoTypesList(parent: string, opts: ProjectsLocationsStoredInfoTypesListOptions = {}): Promise<GooglePrivacyDlpV2ListStoredInfoTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListStoredInfoTypesResponse(data);
  }

  /**
   * Updates the stored infoType by creating a new version. The existing
   * version will continue to be used until the new version is ready. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async projectsLocationsStoredInfoTypesPatch(name: string, req: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    req = serializeGooglePrivacyDlpV2UpdateStoredInfoTypeRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Creates a pre-built stored infoType to be used for inspection. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID + Organizations scope, location specified: `organizations/`ORG_ID`/locations/`LOCATION_ID + Organizations scope, no location specified (defaults to global): `organizations/`ORG_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsStoredInfoTypesCreate(parent: string, req: GooglePrivacyDlpV2CreateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Deletes a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be deleted, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async projectsStoredInfoTypesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a stored infoType. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of the organization and storedInfoType to be read, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async projectsStoredInfoTypesGet(name: string): Promise<GooglePrivacyDlpV2StoredInfoType> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }

  /**
   * Lists stored infoTypes. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param parent Required. Parent resource name. The format of this value varies depending on the scope of the request (project or organization) and whether you have [specified a processing location](https://cloud.google.com/dlp/docs/specifying-location): + Projects scope, location specified: `projects/`PROJECT_ID`/locations/`LOCATION_ID + Projects scope, no location specified (defaults to global): `projects/`PROJECT_ID The following example `parent` string specifies a parent project with the identifier `example-project`, and specifies the `europe-west3` location for processing data: parent=projects/example-project/locations/europe-west3
   */
  async projectsStoredInfoTypesList(parent: string, opts: ProjectsStoredInfoTypesListOptions = {}): Promise<GooglePrivacyDlpV2ListStoredInfoTypesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/storedInfoTypes`);
    if (opts.locationId !== undefined) {
      url.searchParams.append("locationId", String(opts.locationId));
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
    return deserializeGooglePrivacyDlpV2ListStoredInfoTypesResponse(data);
  }

  /**
   * Updates the stored infoType by creating a new version. The existing
   * version will continue to be used until the new version is ready. See
   * https://cloud.google.com/dlp/docs/creating-stored-infotypes to learn more.
   *
   * @param name Required. Resource name of organization and storedInfoType to be updated, for example `organizations/433245324/storedInfoTypes/432452342` or projects/project-id/storedInfoTypes/432452342.
   */
  async projectsStoredInfoTypesPatch(name: string, req: GooglePrivacyDlpV2UpdateStoredInfoTypeRequest): Promise<GooglePrivacyDlpV2StoredInfoType> {
    req = serializeGooglePrivacyDlpV2UpdateStoredInfoTypeRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGooglePrivacyDlpV2StoredInfoType(data);
  }
}

/**
 * A task to execute on the completion of a job. See
 * https://cloud.google.com/dlp/docs/concepts-actions to learn more.
 */
export interface GooglePrivacyDlpV2Action {
  /**
   * Create a de-identified copy of the input data.
   */
  deidentify?: GooglePrivacyDlpV2Deidentify;
  /**
   * Sends an email when the job completes. The email goes to IAM project
   * owners and technical [Essential
   * Contacts](https://cloud.google.com/resource-manager/docs/managing-notification-contacts).
   */
  jobNotificationEmails?: GooglePrivacyDlpV2JobNotificationEmails;
  /**
   * Publish findings to Cloud Datahub.
   */
  publishFindingsToCloudDataCatalog?: GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog;
  /**
   * Publish summary to Cloud Security Command Center (Alpha).
   */
  publishSummaryToCscc?: GooglePrivacyDlpV2PublishSummaryToCscc;
  /**
   * Enable Stackdriver metric dlp.googleapis.com/finding_count.
   */
  publishToStackdriver?: GooglePrivacyDlpV2PublishToStackdriver;
  /**
   * Publish a notification to a Pub/Sub topic.
   */
  pubSub?: GooglePrivacyDlpV2PublishToPubSub;
  /**
   * Save resulting findings in a provided location.
   */
  saveFindings?: GooglePrivacyDlpV2SaveFindings;
}

/**
 * Request message for ActivateJobTrigger.
 */
export interface GooglePrivacyDlpV2ActivateJobTriggerRequest {
}

/**
 * Apply transformation to all findings.
 */
export interface GooglePrivacyDlpV2AllInfoTypes {
}

/**
 * Apply to all text.
 */
export interface GooglePrivacyDlpV2AllText {
}

/**
 * Result of a risk analysis operation request.
 */
export interface GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails {
  /**
   * Categorical stats result
   */
  categoricalStatsResult?: GooglePrivacyDlpV2CategoricalStatsResult;
  /**
   * Delta-presence result
   */
  deltaPresenceEstimationResult?: GooglePrivacyDlpV2DeltaPresenceEstimationResult;
  /**
   * K-anonymity result
   */
  kAnonymityResult?: GooglePrivacyDlpV2KAnonymityResult;
  /**
   * K-map result
   */
  kMapEstimationResult?: GooglePrivacyDlpV2KMapEstimationResult;
  /**
   * L-divesity result
   */
  lDiversityResult?: GooglePrivacyDlpV2LDiversityResult;
  /**
   * Numerical stats result
   */
  numericalStatsResult?: GooglePrivacyDlpV2NumericalStatsResult;
  /**
   * The configuration used for this job.
   */
  requestedOptions?: GooglePrivacyDlpV2RequestedRiskAnalysisOptions;
  /**
   * Privacy metric to compute.
   */
  requestedPrivacyMetric?: GooglePrivacyDlpV2PrivacyMetric;
  /**
   * Input dataset to compute metrics over.
   */
  requestedSourceTable?: GooglePrivacyDlpV2BigQueryTable;
}

function serializeGooglePrivacyDlpV2AnalyzeDataSourceRiskDetails(data: any): GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails {
  return {
    ...data,
    categoricalStatsResult: data["categoricalStatsResult"] !== undefined ? serializeGooglePrivacyDlpV2CategoricalStatsResult(data["categoricalStatsResult"]) : undefined,
    deltaPresenceEstimationResult: data["deltaPresenceEstimationResult"] !== undefined ? serializeGooglePrivacyDlpV2DeltaPresenceEstimationResult(data["deltaPresenceEstimationResult"]) : undefined,
    kAnonymityResult: data["kAnonymityResult"] !== undefined ? serializeGooglePrivacyDlpV2KAnonymityResult(data["kAnonymityResult"]) : undefined,
    kMapEstimationResult: data["kMapEstimationResult"] !== undefined ? serializeGooglePrivacyDlpV2KMapEstimationResult(data["kMapEstimationResult"]) : undefined,
    lDiversityResult: data["lDiversityResult"] !== undefined ? serializeGooglePrivacyDlpV2LDiversityResult(data["lDiversityResult"]) : undefined,
    numericalStatsResult: data["numericalStatsResult"] !== undefined ? serializeGooglePrivacyDlpV2NumericalStatsResult(data["numericalStatsResult"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2AnalyzeDataSourceRiskDetails(data: any): GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails {
  return {
    ...data,
    categoricalStatsResult: data["categoricalStatsResult"] !== undefined ? deserializeGooglePrivacyDlpV2CategoricalStatsResult(data["categoricalStatsResult"]) : undefined,
    deltaPresenceEstimationResult: data["deltaPresenceEstimationResult"] !== undefined ? deserializeGooglePrivacyDlpV2DeltaPresenceEstimationResult(data["deltaPresenceEstimationResult"]) : undefined,
    kAnonymityResult: data["kAnonymityResult"] !== undefined ? deserializeGooglePrivacyDlpV2KAnonymityResult(data["kAnonymityResult"]) : undefined,
    kMapEstimationResult: data["kMapEstimationResult"] !== undefined ? deserializeGooglePrivacyDlpV2KMapEstimationResult(data["kMapEstimationResult"]) : undefined,
    lDiversityResult: data["lDiversityResult"] !== undefined ? deserializeGooglePrivacyDlpV2LDiversityResult(data["lDiversityResult"]) : undefined,
    numericalStatsResult: data["numericalStatsResult"] !== undefined ? deserializeGooglePrivacyDlpV2NumericalStatsResult(data["numericalStatsResult"]) : undefined,
  };
}

/**
 * An auxiliary table contains statistical information on the relative
 * frequency of different quasi-identifiers values. It has one or several
 * quasi-identifiers columns, and one column that indicates the relative
 * frequency of each quasi-identifier tuple. If a tuple is present in the data
 * but not in the auxiliary table, the corresponding relative frequency is
 * assumed to be zero (and thus, the tuple is highly reidentifiable).
 */
export interface GooglePrivacyDlpV2AuxiliaryTable {
  /**
   * Required. Quasi-identifier columns.
   */
  quasiIds?: GooglePrivacyDlpV2QuasiIdField[];
  /**
   * Required. The relative frequency column must contain a floating-point
   * number between 0 and 1 (inclusive). Null values are assumed to be zero.
   */
  relativeFrequency?: GooglePrivacyDlpV2FieldId;
  /**
   * Required. Auxiliary table location.
   */
  table?: GooglePrivacyDlpV2BigQueryTable;
}

/**
 * Message defining a field of a BigQuery table.
 */
export interface GooglePrivacyDlpV2BigQueryField {
  /**
   * Designated field in the BigQuery table.
   */
  field?: GooglePrivacyDlpV2FieldId;
  /**
   * Source table of the field.
   */
  table?: GooglePrivacyDlpV2BigQueryTable;
}

/**
 * Row key for identifying a record in BigQuery table.
 */
export interface GooglePrivacyDlpV2BigQueryKey {
  /**
   * Row number inferred at the time the table was scanned. This value is
   * nondeterministic, cannot be queried, and may be null for inspection jobs.
   * To locate findings within a table, specify
   * `inspect_job.storage_config.big_query_options.identifying_fields` in
   * `CreateDlpJobRequest`.
   */
  rowNumber?: bigint;
  /**
   * Complete BigQuery table reference.
   */
  tableReference?: GooglePrivacyDlpV2BigQueryTable;
}

function serializeGooglePrivacyDlpV2BigQueryKey(data: any): GooglePrivacyDlpV2BigQueryKey {
  return {
    ...data,
    rowNumber: data["rowNumber"] !== undefined ? String(data["rowNumber"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2BigQueryKey(data: any): GooglePrivacyDlpV2BigQueryKey {
  return {
    ...data,
    rowNumber: data["rowNumber"] !== undefined ? BigInt(data["rowNumber"]) : undefined,
  };
}

/**
 * Options defining BigQuery table and row identifiers.
 */
export interface GooglePrivacyDlpV2BigQueryOptions {
  /**
   * References to fields excluded from scanning. This allows you to skip
   * inspection of entire columns which you know have no findings.
   */
  excludedFields?: GooglePrivacyDlpV2FieldId[];
  /**
   * Table fields that may uniquely identify a row within the table. When
   * `actions.saveFindings.outputConfig.table` is specified, the values of
   * columns specified here are available in the output table under
   * `location.content_locations.record_location.record_key.id_values`. Nested
   * fields such as `person.birthdate.year` are allowed.
   */
  identifyingFields?: GooglePrivacyDlpV2FieldId[];
  /**
   * Limit scanning only to these fields.
   */
  includedFields?: GooglePrivacyDlpV2FieldId[];
  /**
   * Max number of rows to scan. If the table has more rows than this value,
   * the rest of the rows are omitted. If not set, or if set to 0, all rows will
   * be scanned. Only one of rows_limit and rows_limit_percent can be specified.
   * Cannot be used in conjunction with TimespanConfig.
   */
  rowsLimit?: bigint;
  /**
   * Max percentage of rows to scan. The rest are omitted. The number of rows
   * scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and
   * 100 means no limit. Defaults to 0. Only one of rows_limit and
   * rows_limit_percent can be specified. Cannot be used in conjunction with
   * TimespanConfig.
   */
  rowsLimitPercent?: number;
  sampleMethod?:  | "SAMPLE_METHOD_UNSPECIFIED" | "TOP" | "RANDOM_START";
  /**
   * Complete BigQuery table reference.
   */
  tableReference?: GooglePrivacyDlpV2BigQueryTable;
}

function serializeGooglePrivacyDlpV2BigQueryOptions(data: any): GooglePrivacyDlpV2BigQueryOptions {
  return {
    ...data,
    rowsLimit: data["rowsLimit"] !== undefined ? String(data["rowsLimit"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2BigQueryOptions(data: any): GooglePrivacyDlpV2BigQueryOptions {
  return {
    ...data,
    rowsLimit: data["rowsLimit"] !== undefined ? BigInt(data["rowsLimit"]) : undefined,
  };
}

/**
 * Message defining the location of a BigQuery table. A table is uniquely
 * identified by its project_id, dataset_id, and table_name. Within a query a
 * table is often referenced with a string in the format of: `:.` or `..`.
 */
export interface GooglePrivacyDlpV2BigQueryTable {
  /**
   * Dataset ID of the table.
   */
  datasetId?: string;
  /**
   * The Google Cloud Platform project ID of the project containing the table.
   * If omitted, project ID is inferred from the API call.
   */
  projectId?: string;
  /**
   * Name of the table.
   */
  tableId?: string;
}

/**
 * Bounding box encompassing detected text within an image.
 */
export interface GooglePrivacyDlpV2BoundingBox {
  /**
   * Height of the bounding box in pixels.
   */
  height?: number;
  /**
   * Left coordinate of the bounding box. (0,0) is upper left.
   */
  left?: number;
  /**
   * Top coordinate of the bounding box. (0,0) is upper left.
   */
  top?: number;
  /**
   * Width of the bounding box in pixels.
   */
  width?: number;
}

/**
 * Bucket is represented as a range, along with replacement values.
 */
export interface GooglePrivacyDlpV2Bucket {
  /**
   * Upper bound of the range, exclusive; type must match min.
   */
  max?: GooglePrivacyDlpV2Value;
  /**
   * Lower bound of the range, inclusive. Type should be the same as max if
   * used.
   */
  min?: GooglePrivacyDlpV2Value;
  /**
   * Required. Replacement value for this bucket.
   */
  replacementValue?: GooglePrivacyDlpV2Value;
}

function serializeGooglePrivacyDlpV2Bucket(data: any): GooglePrivacyDlpV2Bucket {
  return {
    ...data,
    max: data["max"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["max"]) : undefined,
    min: data["min"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["min"]) : undefined,
    replacementValue: data["replacementValue"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["replacementValue"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Bucket(data: any): GooglePrivacyDlpV2Bucket {
  return {
    ...data,
    max: data["max"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["max"]) : undefined,
    min: data["min"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["min"]) : undefined,
    replacementValue: data["replacementValue"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["replacementValue"]) : undefined,
  };
}

/**
 * Generalization function that buckets values based on ranges. The ranges and
 * replacement values are dynamically provided by the user for custom behavior,
 * such as 1-30 -> LOW 31-65 -> MEDIUM 66-100 -> HIGH This can be used on data
 * of type: number, long, string, timestamp. If the bound `Value` type differs
 * from the type of data being transformed, we will first attempt converting the
 * type of the data to be transformed to match the type of the bound before
 * comparing. See https://cloud.google.com/dlp/docs/concepts-bucketing to learn
 * more.
 */
export interface GooglePrivacyDlpV2BucketingConfig {
  /**
   * Set of buckets. Ranges must be non-overlapping.
   */
  buckets?: GooglePrivacyDlpV2Bucket[];
}

function serializeGooglePrivacyDlpV2BucketingConfig(data: any): GooglePrivacyDlpV2BucketingConfig {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (serializeGooglePrivacyDlpV2Bucket(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2BucketingConfig(data: any): GooglePrivacyDlpV2BucketingConfig {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (deserializeGooglePrivacyDlpV2Bucket(item))) : undefined,
  };
}

/**
 * Container for bytes to inspect or redact.
 */
export interface GooglePrivacyDlpV2ByteContentItem {
  /**
   * Content data to inspect or redact.
   */
  data?: Uint8Array;
  /**
   * The type of data stored in the bytes string. Default will be TEXT_UTF8.
   */
  type?:  | "BYTES_TYPE_UNSPECIFIED" | "IMAGE" | "IMAGE_JPEG" | "IMAGE_BMP" | "IMAGE_PNG" | "IMAGE_SVG" | "TEXT_UTF8" | "WORD_DOCUMENT" | "PDF" | "POWERPOINT_DOCUMENT" | "EXCEL_DOCUMENT" | "AVRO" | "CSV" | "TSV";
}

function serializeGooglePrivacyDlpV2ByteContentItem(data: any): GooglePrivacyDlpV2ByteContentItem {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ByteContentItem(data: any): GooglePrivacyDlpV2ByteContentItem {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * The request message for canceling a DLP job.
 */
export interface GooglePrivacyDlpV2CancelDlpJobRequest {
}

/**
 * Compute numerical stats over an individual column, including number of
 * distinct values and value count distribution.
 */
export interface GooglePrivacyDlpV2CategoricalStatsConfig {
  /**
   * Field to compute categorical stats on. All column types are supported
   * except for arrays and structs. However, it may be more informative to use
   * NumericalStats when the field type is supported, depending on the data.
   */
  field?: GooglePrivacyDlpV2FieldId;
}

/**
 * Histogram of value frequencies in the column.
 */
export interface GooglePrivacyDlpV2CategoricalStatsHistogramBucket {
  /**
   * Total number of values in this bucket.
   */
  bucketSize?: bigint;
  /**
   * Total number of distinct values in this bucket.
   */
  bucketValueCount?: bigint;
  /**
   * Sample of value frequencies in this bucket. The total number of values
   * returned per bucket is capped at 20.
   */
  bucketValues?: GooglePrivacyDlpV2ValueFrequency[];
  /**
   * Lower bound on the value frequency of the values in this bucket.
   */
  valueFrequencyLowerBound?: bigint;
  /**
   * Upper bound on the value frequency of the values in this bucket.
   */
  valueFrequencyUpperBound?: bigint;
}

function serializeGooglePrivacyDlpV2CategoricalStatsHistogramBucket(data: any): GooglePrivacyDlpV2CategoricalStatsHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? String(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? String(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (serializeGooglePrivacyDlpV2ValueFrequency(item))) : undefined,
    valueFrequencyLowerBound: data["valueFrequencyLowerBound"] !== undefined ? String(data["valueFrequencyLowerBound"]) : undefined,
    valueFrequencyUpperBound: data["valueFrequencyUpperBound"] !== undefined ? String(data["valueFrequencyUpperBound"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CategoricalStatsHistogramBucket(data: any): GooglePrivacyDlpV2CategoricalStatsHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? BigInt(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? BigInt(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (deserializeGooglePrivacyDlpV2ValueFrequency(item))) : undefined,
    valueFrequencyLowerBound: data["valueFrequencyLowerBound"] !== undefined ? BigInt(data["valueFrequencyLowerBound"]) : undefined,
    valueFrequencyUpperBound: data["valueFrequencyUpperBound"] !== undefined ? BigInt(data["valueFrequencyUpperBound"]) : undefined,
  };
}

/**
 * Result of the categorical stats computation.
 */
export interface GooglePrivacyDlpV2CategoricalStatsResult {
  /**
   * Histogram of value frequencies in the column.
   */
  valueFrequencyHistogramBuckets?: GooglePrivacyDlpV2CategoricalStatsHistogramBucket[];
}

function serializeGooglePrivacyDlpV2CategoricalStatsResult(data: any): GooglePrivacyDlpV2CategoricalStatsResult {
  return {
    ...data,
    valueFrequencyHistogramBuckets: data["valueFrequencyHistogramBuckets"] !== undefined ? data["valueFrequencyHistogramBuckets"].map((item: any) => (serializeGooglePrivacyDlpV2CategoricalStatsHistogramBucket(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CategoricalStatsResult(data: any): GooglePrivacyDlpV2CategoricalStatsResult {
  return {
    ...data,
    valueFrequencyHistogramBuckets: data["valueFrequencyHistogramBuckets"] !== undefined ? data["valueFrequencyHistogramBuckets"].map((item: any) => (deserializeGooglePrivacyDlpV2CategoricalStatsHistogramBucket(item))) : undefined,
  };
}

/**
 * Partially mask a string by replacing a given number of characters with a
 * fixed character. Masking can start from the beginning or end of the string.
 * This can be used on data of any type (numbers, longs, and so on) and when
 * de-identifying structured data we'll attempt to preserve the original data's
 * type. (This allows you to take a long like 123 and modify it to a string like
 * **3.
 */
export interface GooglePrivacyDlpV2CharacterMaskConfig {
  /**
   * When masking a string, items in this list will be skipped when replacing
   * characters. For example, if the input string is `555-555-5555` and you
   * instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP
   * returns `***-**5-5555`.
   */
  charactersToIgnore?: GooglePrivacyDlpV2CharsToIgnore[];
  /**
   * Character to use to mask the sensitive values—for example, `*` for an
   * alphabetic string such as a name, or `0` for a numeric string such as ZIP
   * code or credit card number. This string must have a length of 1. If not
   * supplied, this value defaults to `*` for strings, and `0` for digits.
   */
  maskingCharacter?: string;
  /**
   * Number of characters to mask. If not set, all matching chars will be
   * masked. Skipped characters do not count towards this tally. If
   * `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks
   * all but a number of characters. For example, suppose you have the following
   * values: - `masking_character` is `*` - `number_to_mask` is `-4` -
   * `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is
   * `1234-5678-9012-3456` The resulting de-identified string is
   * `****-****-****-3456`. Cloud DLP masks all but the last four characters. If
   * `reverse_order` is `true`, all but the first four characters are masked as
   * `1234-****-****-****`.
   */
  numberToMask?: number;
  /**
   * Mask characters in reverse order. For example, if `masking_character` is
   * `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the
   * input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If
   * `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is
   * `true`, then the string `12345` is masked as `12***`.
   */
  reverseOrder?: boolean;
}

/**
 * Characters to skip when doing deidentification of a value. These will be
 * left alone and skipped.
 */
export interface GooglePrivacyDlpV2CharsToIgnore {
  /**
   * Characters to not transform when masking.
   */
  charactersToSkip?: string;
  /**
   * Common characters to not transform when masking. Useful to avoid removing
   * punctuation.
   */
  commonCharactersToIgnore?:  | "COMMON_CHARS_TO_IGNORE_UNSPECIFIED" | "NUMERIC" | "ALPHA_UPPER_CASE" | "ALPHA_LOWER_CASE" | "PUNCTUATION" | "WHITESPACE";
}

/**
 * Message representing a set of files in Cloud Storage.
 */
export interface GooglePrivacyDlpV2CloudStorageFileSet {
  /**
   * The url, in the format `gs:///`. Trailing wildcard in the path is allowed.
   */
  url?: string;
}

/**
 * Options defining a file or a set of files within a Cloud Storage bucket.
 */
export interface GooglePrivacyDlpV2CloudStorageOptions {
  /**
   * Max number of bytes to scan from a file. If a scanned file's size is
   * bigger than this value then the rest of the bytes are omitted. Only one of
   * bytes_limit_per_file and bytes_limit_per_file_percent can be specified.
   * Cannot be set if de-identification is requested.
   */
  bytesLimitPerFile?: bigint;
  /**
   * Max percentage of bytes to scan from a file. The rest are omitted. The
   * number of bytes scanned is rounded down. Must be between 0 and 100,
   * inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of
   * bytes_limit_per_file and bytes_limit_per_file_percent can be specified.
   * Cannot be set if de-identification is requested.
   */
  bytesLimitPerFilePercent?: number;
  /**
   * The set of one or more files to scan.
   */
  fileSet?: GooglePrivacyDlpV2FileSet;
  /**
   * Limits the number of files to scan to this percentage of the input
   * FileSet. Number of files scanned is rounded down. Must be between 0 and
   * 100, inclusively. Both 0 and 100 means no limit. Defaults to 0.
   */
  filesLimitPercent?: number;
  /**
   * List of file type groups to include in the scan. If empty, all files are
   * scanned and available data format processors are applied. In addition, the
   * binary content of the selected files is always scanned as well. Images are
   * scanned only as binary if the specified region does not support image
   * inspection and no file_types were specified. Image inspection is restricted
   * to 'global', 'us', 'asia', and 'europe'.
   */
  fileTypes?:  | "FILE_TYPE_UNSPECIFIED" | "BINARY_FILE" | "TEXT_FILE" | "IMAGE" | "WORD" | "PDF" | "AVRO" | "CSV" | "TSV" | "POWERPOINT" | "EXCEL"[];
  sampleMethod?:  | "SAMPLE_METHOD_UNSPECIFIED" | "TOP" | "RANDOM_START";
}

function serializeGooglePrivacyDlpV2CloudStorageOptions(data: any): GooglePrivacyDlpV2CloudStorageOptions {
  return {
    ...data,
    bytesLimitPerFile: data["bytesLimitPerFile"] !== undefined ? String(data["bytesLimitPerFile"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CloudStorageOptions(data: any): GooglePrivacyDlpV2CloudStorageOptions {
  return {
    ...data,
    bytesLimitPerFile: data["bytesLimitPerFile"] !== undefined ? BigInt(data["bytesLimitPerFile"]) : undefined,
  };
}

/**
 * Message representing a single file or path in Cloud Storage.
 */
export interface GooglePrivacyDlpV2CloudStoragePath {
  /**
   * A url representing a file or path (no wildcards) in Cloud Storage.
   * Example: gs://[BUCKET_NAME]/dictionary.txt
   */
  path?: string;
}

/**
 * Message representing a set of files in a Cloud Storage bucket. Regular
 * expressions are used to allow fine-grained control over which files in the
 * bucket to include. Included files are those that match at least one item in
 * `include_regex` and do not match any items in `exclude_regex`. Note that a
 * file that matches items from both lists will _not_ be included. For a match
 * to occur, the entire file path (i.e., everything in the url after the bucket
 * name) must match the regular expression. For example, given the input
 * `{bucket_name: "mybucket", include_regex: ["directory1/.*"], exclude_regex:
 * ["directory1/excluded.*"]}`: * `gs://mybucket/directory1/myfile` will be
 * included * `gs://mybucket/directory1/directory2/myfile` will be included
 * (`.*` matches across `/`) * `gs://mybucket/directory0/directory1/myfile` will
 * _not_ be included (the full path doesn't match any items in `include_regex`)
 * * `gs://mybucket/directory1/excludedfile` will _not_ be included (the path
 * matches an item in `exclude_regex`) If `include_regex` is left empty, it will
 * match all files by default (this is equivalent to setting `include_regex:
 * [".*"]`). Some other common use cases: * `{bucket_name: "mybucket",
 * exclude_regex: [".*\.pdf"]}` will include all files in `mybucket` except for
 * .pdf files * `{bucket_name: "mybucket", include_regex: ["directory/[^/]+"]}`
 * will include all files directly under `gs://mybucket/directory/`, without
 * matching across `/`
 */
export interface GooglePrivacyDlpV2CloudStorageRegexFileSet {
  /**
   * The name of a Cloud Storage bucket. Required.
   */
  bucketName?: string;
  /**
   * A list of regular expressions matching file paths to exclude. All files in
   * the bucket that match at least one of these regular expressions will be
   * excluded from the scan. Regular expressions use RE2
   * [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be found
   * under the google/re2 repository on GitHub.
   */
  excludeRegex?: string[];
  /**
   * A list of regular expressions matching file paths to include. All files in
   * the bucket that match at least one of these regular expressions will be
   * included in the set of files, except for those that also match an item in
   * `exclude_regex`. Leaving this field empty will match all files by default
   * (this is equivalent to including `.*` in the list). Regular expressions use
   * RE2 [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be
   * found under the google/re2 repository on GitHub.
   */
  includeRegex?: string[];
}

/**
 * Represents a color in the RGB color space.
 */
export interface GooglePrivacyDlpV2Color {
  /**
   * The amount of blue in the color as a value in the interval [0, 1].
   */
  blue?: number;
  /**
   * The amount of green in the color as a value in the interval [0, 1].
   */
  green?: number;
  /**
   * The amount of red in the color as a value in the interval [0, 1].
   */
  red?: number;
}

/**
 * The field type of `value` and `field` do not need to match to be considered
 * equal, but not all comparisons are possible. EQUAL_TO and NOT_EQUAL_TO
 * attempt to compare even with incompatible types, but all other comparisons
 * are invalid with incompatible types. A `value` of type: - `string` can be
 * compared against all other types - `boolean` can only be compared against
 * other booleans - `integer` can be compared against doubles or a string if the
 * string value can be parsed as an integer. - `double` can be compared against
 * integers or a string if the string can be parsed as a double. - `Timestamp`
 * can be compared against strings in RFC 3339 date string format. - `TimeOfDay`
 * can be compared against timestamps and strings in the format of 'HH:mm:ss'.
 * If we fail to compare do to type mismatch, a warning will be given and the
 * condition will evaluate to false.
 */
export interface GooglePrivacyDlpV2Condition {
  /**
   * Required. Field within the record this condition is evaluated against.
   */
  field?: GooglePrivacyDlpV2FieldId;
  /**
   * Required. Operator used to compare the field or infoType to the value.
   */
  operator?:  | "RELATIONAL_OPERATOR_UNSPECIFIED" | "EQUAL_TO" | "NOT_EQUAL_TO" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUALS" | "LESS_THAN_OR_EQUALS" | "EXISTS";
  /**
   * Value to compare against. [Mandatory, except for `EXISTS` tests.]
   */
  value?: GooglePrivacyDlpV2Value;
}

function serializeGooglePrivacyDlpV2Condition(data: any): GooglePrivacyDlpV2Condition {
  return {
    ...data,
    value: data["value"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["value"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Condition(data: any): GooglePrivacyDlpV2Condition {
  return {
    ...data,
    value: data["value"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["value"]) : undefined,
  };
}

/**
 * A collection of conditions.
 */
export interface GooglePrivacyDlpV2Conditions {
  /**
   * A collection of conditions.
   */
  conditions?: GooglePrivacyDlpV2Condition[];
}

function serializeGooglePrivacyDlpV2Conditions(data: any): GooglePrivacyDlpV2Conditions {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (serializeGooglePrivacyDlpV2Condition(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Conditions(data: any): GooglePrivacyDlpV2Conditions {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeGooglePrivacyDlpV2Condition(item))) : undefined,
  };
}

/**
 * Represents a container that may contain DLP findings. Examples of a
 * container include a file, table, or database record.
 */
export interface GooglePrivacyDlpV2Container {
  /**
   * A string representation of the full container name. Examples: - BigQuery:
   * 'Project:DataSetId.TableId' - Cloud Storage:
   * 'gs://Bucket/folders/filename.txt'
   */
  fullPath?: string;
  /**
   * Project where the finding was found. Can be different from the project
   * that owns the finding.
   */
  projectId?: string;
  /**
   * The rest of the path after the root. Examples: - For BigQuery table
   * `project_id:dataset_id.table_id`, the relative path is `table_id` - For
   * Cloud Storage file `gs://bucket/folder/filename.txt`, the relative path is
   * `folder/filename.txt`
   */
  relativePath?: string;
  /**
   * The root of the container. Examples: - For BigQuery table
   * `project_id:dataset_id.table_id`, the root is `dataset_id` - For Cloud
   * Storage file `gs://bucket/folder/filename.txt`, the root is `gs://bucket`
   */
  rootPath?: string;
  /**
   * Container type, for example BigQuery or Cloud Storage.
   */
  type?: string;
  /**
   * Findings container modification timestamp, if applicable. For Cloud
   * Storage, this field contains the last file modification timestamp. For a
   * BigQuery table, this field contains the last_modified_time property. For
   * Datastore, this field isn't populated.
   */
  updateTime?: Date;
  /**
   * Findings container version, if available ("generation" for Cloud Storage).
   */
  version?: string;
}

function serializeGooglePrivacyDlpV2Container(data: any): GooglePrivacyDlpV2Container {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Container(data: any): GooglePrivacyDlpV2Container {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

export interface GooglePrivacyDlpV2ContentItem {
  /**
   * Content data to inspect or redact. Replaces `type` and `data`.
   */
  byteItem?: GooglePrivacyDlpV2ByteContentItem;
  /**
   * Structured content for inspection. See
   * https://cloud.google.com/dlp/docs/inspecting-text#inspecting_a_table to
   * learn more.
   */
  table?: GooglePrivacyDlpV2Table;
  /**
   * String data to inspect or redact.
   */
  value?: string;
}

function serializeGooglePrivacyDlpV2ContentItem(data: any): GooglePrivacyDlpV2ContentItem {
  return {
    ...data,
    byteItem: data["byteItem"] !== undefined ? serializeGooglePrivacyDlpV2ByteContentItem(data["byteItem"]) : undefined,
    table: data["table"] !== undefined ? serializeGooglePrivacyDlpV2Table(data["table"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ContentItem(data: any): GooglePrivacyDlpV2ContentItem {
  return {
    ...data,
    byteItem: data["byteItem"] !== undefined ? deserializeGooglePrivacyDlpV2ByteContentItem(data["byteItem"]) : undefined,
    table: data["table"] !== undefined ? deserializeGooglePrivacyDlpV2Table(data["table"]) : undefined,
  };
}

/**
 * Precise location of the finding within a document, record, image, or
 * metadata container.
 */
export interface GooglePrivacyDlpV2ContentLocation {
  /**
   * Name of the container where the finding is located. The top level name is
   * the source file name or table name. Names of some common storage containers
   * are formatted as follows: * BigQuery tables:
   * `{project_id}:{dataset_id}.{table_id}` * Cloud Storage files:
   * `gs://{bucket}/{path}` * Datastore namespace: {namespace} Nested names
   * could be absent if the embedded object has no string identifier (for
   * example, an image contained within a document).
   */
  containerName?: string;
  /**
   * Finding container modification timestamp, if applicable. For Cloud
   * Storage, this field contains the last file modification timestamp. For a
   * BigQuery table, this field contains the last_modified_time property. For
   * Datastore, this field isn't populated.
   */
  containerTimestamp?: Date;
  /**
   * Finding container version, if available ("generation" for Cloud Storage).
   */
  containerVersion?: string;
  /**
   * Location data for document files.
   */
  documentLocation?: GooglePrivacyDlpV2DocumentLocation;
  /**
   * Location within an image's pixels.
   */
  imageLocation?: GooglePrivacyDlpV2ImageLocation;
  /**
   * Location within the metadata for inspected content.
   */
  metadataLocation?: GooglePrivacyDlpV2MetadataLocation;
  /**
   * Location within a row or record of a database table.
   */
  recordLocation?: GooglePrivacyDlpV2RecordLocation;
}

function serializeGooglePrivacyDlpV2ContentLocation(data: any): GooglePrivacyDlpV2ContentLocation {
  return {
    ...data,
    containerTimestamp: data["containerTimestamp"] !== undefined ? data["containerTimestamp"].toISOString() : undefined,
    documentLocation: data["documentLocation"] !== undefined ? serializeGooglePrivacyDlpV2DocumentLocation(data["documentLocation"]) : undefined,
    recordLocation: data["recordLocation"] !== undefined ? serializeGooglePrivacyDlpV2RecordLocation(data["recordLocation"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ContentLocation(data: any): GooglePrivacyDlpV2ContentLocation {
  return {
    ...data,
    containerTimestamp: data["containerTimestamp"] !== undefined ? new Date(data["containerTimestamp"]) : undefined,
    documentLocation: data["documentLocation"] !== undefined ? deserializeGooglePrivacyDlpV2DocumentLocation(data["documentLocation"]) : undefined,
    recordLocation: data["recordLocation"] !== undefined ? deserializeGooglePrivacyDlpV2RecordLocation(data["recordLocation"]) : undefined,
  };
}

/**
 * Request message for CreateDeidentifyTemplate.
 */
export interface GooglePrivacyDlpV2CreateDeidentifyTemplateRequest {
  /**
   * Required. The DeidentifyTemplate to create.
   */
  deidentifyTemplate?: GooglePrivacyDlpV2DeidentifyTemplate;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * The template id can contain uppercase and lowercase letters, numbers, and
   * hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`.
   * The maximum length is 100 characters. Can be empty to allow the system to
   * generate one.
   */
  templateId?: string;
}

function serializeGooglePrivacyDlpV2CreateDeidentifyTemplateRequest(data: any): GooglePrivacyDlpV2CreateDeidentifyTemplateRequest {
  return {
    ...data,
    deidentifyTemplate: data["deidentifyTemplate"] !== undefined ? serializeGooglePrivacyDlpV2DeidentifyTemplate(data["deidentifyTemplate"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CreateDeidentifyTemplateRequest(data: any): GooglePrivacyDlpV2CreateDeidentifyTemplateRequest {
  return {
    ...data,
    deidentifyTemplate: data["deidentifyTemplate"] !== undefined ? deserializeGooglePrivacyDlpV2DeidentifyTemplate(data["deidentifyTemplate"]) : undefined,
  };
}

/**
 * Request message for CreateDlpJobRequest. Used to initiate long running jobs
 * such as calculating risk metrics or inspecting Google Cloud Storage.
 */
export interface GooglePrivacyDlpV2CreateDlpJobRequest {
  /**
   * An inspection job scans a storage repository for InfoTypes.
   */
  inspectJob?: GooglePrivacyDlpV2InspectJobConfig;
  /**
   * The job id can contain uppercase and lowercase letters, numbers, and
   * hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`.
   * The maximum length is 100 characters. Can be empty to allow the system to
   * generate one.
   */
  jobId?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * A risk analysis job calculates re-identification risk metrics for a
   * BigQuery table.
   */
  riskJob?: GooglePrivacyDlpV2RiskAnalysisJobConfig;
}

function serializeGooglePrivacyDlpV2CreateDlpJobRequest(data: any): GooglePrivacyDlpV2CreateDlpJobRequest {
  return {
    ...data,
    inspectJob: data["inspectJob"] !== undefined ? serializeGooglePrivacyDlpV2InspectJobConfig(data["inspectJob"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CreateDlpJobRequest(data: any): GooglePrivacyDlpV2CreateDlpJobRequest {
  return {
    ...data,
    inspectJob: data["inspectJob"] !== undefined ? deserializeGooglePrivacyDlpV2InspectJobConfig(data["inspectJob"]) : undefined,
  };
}

/**
 * Request message for CreateInspectTemplate.
 */
export interface GooglePrivacyDlpV2CreateInspectTemplateRequest {
  /**
   * Required. The InspectTemplate to create.
   */
  inspectTemplate?: GooglePrivacyDlpV2InspectTemplate;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * The template id can contain uppercase and lowercase letters, numbers, and
   * hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`.
   * The maximum length is 100 characters. Can be empty to allow the system to
   * generate one.
   */
  templateId?: string;
}

function serializeGooglePrivacyDlpV2CreateInspectTemplateRequest(data: any): GooglePrivacyDlpV2CreateInspectTemplateRequest {
  return {
    ...data,
    inspectTemplate: data["inspectTemplate"] !== undefined ? serializeGooglePrivacyDlpV2InspectTemplate(data["inspectTemplate"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CreateInspectTemplateRequest(data: any): GooglePrivacyDlpV2CreateInspectTemplateRequest {
  return {
    ...data,
    inspectTemplate: data["inspectTemplate"] !== undefined ? deserializeGooglePrivacyDlpV2InspectTemplate(data["inspectTemplate"]) : undefined,
  };
}

/**
 * Request message for CreateJobTrigger.
 */
export interface GooglePrivacyDlpV2CreateJobTriggerRequest {
  /**
   * Required. The JobTrigger to create.
   */
  jobTrigger?: GooglePrivacyDlpV2JobTrigger;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * The trigger id can contain uppercase and lowercase letters, numbers, and
   * hyphens; that is, it must match the regular expression: `[a-zA-Z\d-_]+`.
   * The maximum length is 100 characters. Can be empty to allow the system to
   * generate one.
   */
  triggerId?: string;
}

function serializeGooglePrivacyDlpV2CreateJobTriggerRequest(data: any): GooglePrivacyDlpV2CreateJobTriggerRequest {
  return {
    ...data,
    jobTrigger: data["jobTrigger"] !== undefined ? serializeGooglePrivacyDlpV2JobTrigger(data["jobTrigger"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CreateJobTriggerRequest(data: any): GooglePrivacyDlpV2CreateJobTriggerRequest {
  return {
    ...data,
    jobTrigger: data["jobTrigger"] !== undefined ? deserializeGooglePrivacyDlpV2JobTrigger(data["jobTrigger"]) : undefined,
  };
}

/**
 * Request message for CreateStoredInfoType.
 */
export interface GooglePrivacyDlpV2CreateStoredInfoTypeRequest {
  /**
   * Required. Configuration of the storedInfoType to create.
   */
  config?: GooglePrivacyDlpV2StoredInfoTypeConfig;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * The storedInfoType ID can contain uppercase and lowercase letters,
   * numbers, and hyphens; that is, it must match the regular expression:
   * `[a-zA-Z\d-_]+`. The maximum length is 100 characters. Can be empty to
   * allow the system to generate one.
   */
  storedInfoTypeId?: string;
}

/**
 * Pseudonymization method that generates deterministic encryption for the
 * given input. Outputs a base64 encoded representation of the encrypted output.
 * Uses AES-SIV based on the RFC https://tools.ietf.org/html/rfc5297.
 */
export interface GooglePrivacyDlpV2CryptoDeterministicConfig {
  /**
   * A context may be used for higher security and maintaining referential
   * integrity such that the same identifier in two different contexts will be
   * given a distinct surrogate. The context is appended to plaintext value
   * being encrypted. On decryption the provided context is validated against
   * the value used during encryption. If a context was provided during
   * encryption, same context must be provided during decryption as well. If the
   * context is not set, plaintext would be used as is for encryption. If the
   * context is set but: 1. there is no record present when transforming a given
   * value or 2. the field is not present when transforming a given value,
   * plaintext would be used as is for encryption. Note that case (1) is
   * expected when an `InfoTypeTransformation` is applied to both structured and
   * unstructured `ContentItem`s.
   */
  context?: GooglePrivacyDlpV2FieldId;
  /**
   * The key used by the encryption function. For deterministic encryption
   * using AES-SIV, the provided key is internally expanded to 64 bytes prior to
   * use.
   */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
  /**
   * The custom info type to annotate the surrogate with. This annotation will
   * be applied to the surrogate by prefixing it with the name of the custom
   * info type followed by the number of characters comprising the surrogate.
   * The following scheme defines the format: {info type name}({surrogate
   * character count}):{surrogate} For example, if the name of custom info type
   * is 'MY_TOKEN_INFO_TYPE' and the surrogate is 'abc', the full replacement
   * value will be: 'MY_TOKEN_INFO_TYPE(3):abc' This annotation identifies the
   * surrogate when inspecting content using the custom info type 'Surrogate'.
   * This facilitates reversal of the surrogate when it occurs in free text.
   * Note: For record transformations where the entire cell in a table is being
   * transformed, surrogates are not mandatory. Surrogates are used to denote
   * the location of the token and are necessary for re-identification in free
   * form text. In order for inspection to work properly, the name of this info
   * type must not occur naturally anywhere in your data; otherwise, inspection
   * may either - reverse a surrogate that does not correspond to an actual
   * identifier - be unable to parse the surrogate and result in an error
   * Therefore, choose your custom info type name carefully after considering
   * what your data looks like. One way to select a name that has a high chance
   * of yielding reliable detection is to include one or more unicode characters
   * that are highly improbable to exist in your data. For example, assuming
   * your data is entered from a regular ASCII keyboard, the symbol with the hex
   * code point 29DD might be used like so: ⧝MY_TOKEN_TYPE.
   */
  surrogateInfoType?: GooglePrivacyDlpV2InfoType;
}

function serializeGooglePrivacyDlpV2CryptoDeterministicConfig(data: any): GooglePrivacyDlpV2CryptoDeterministicConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? serializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CryptoDeterministicConfig(data: any): GooglePrivacyDlpV2CryptoDeterministicConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? deserializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

/**
 * Pseudonymization method that generates surrogates via cryptographic hashing.
 * Uses SHA-256. The key size must be either 32 or 64 bytes. Outputs a base64
 * encoded representation of the hashed output (for example,
 * L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=). Currently, only string and
 * integer values can be hashed. See
 * https://cloud.google.com/dlp/docs/pseudonymization to learn more.
 */
export interface GooglePrivacyDlpV2CryptoHashConfig {
  /**
   * The key used by the hash function.
   */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
}

function serializeGooglePrivacyDlpV2CryptoHashConfig(data: any): GooglePrivacyDlpV2CryptoHashConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? serializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CryptoHashConfig(data: any): GooglePrivacyDlpV2CryptoHashConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? deserializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

/**
 * This is a data encryption key (DEK) (as opposed to a key encryption key
 * (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud
 * KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the
 * KEK to ensure an attacker cannot unwrap the DEK.
 */
export interface GooglePrivacyDlpV2CryptoKey {
  /**
   * Key wrapped using Cloud KMS
   */
  kmsWrapped?: GooglePrivacyDlpV2KmsWrappedCryptoKey;
  /**
   * Transient crypto key
   */
  transient?: GooglePrivacyDlpV2TransientCryptoKey;
  /**
   * Unwrapped crypto key
   */
  unwrapped?: GooglePrivacyDlpV2UnwrappedCryptoKey;
}

function serializeGooglePrivacyDlpV2CryptoKey(data: any): GooglePrivacyDlpV2CryptoKey {
  return {
    ...data,
    kmsWrapped: data["kmsWrapped"] !== undefined ? serializeGooglePrivacyDlpV2KmsWrappedCryptoKey(data["kmsWrapped"]) : undefined,
    unwrapped: data["unwrapped"] !== undefined ? serializeGooglePrivacyDlpV2UnwrappedCryptoKey(data["unwrapped"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CryptoKey(data: any): GooglePrivacyDlpV2CryptoKey {
  return {
    ...data,
    kmsWrapped: data["kmsWrapped"] !== undefined ? deserializeGooglePrivacyDlpV2KmsWrappedCryptoKey(data["kmsWrapped"]) : undefined,
    unwrapped: data["unwrapped"] !== undefined ? deserializeGooglePrivacyDlpV2UnwrappedCryptoKey(data["unwrapped"]) : undefined,
  };
}

/**
 * Replaces an identifier with a surrogate using Format Preserving Encryption
 * (FPE) with the FFX mode of operation; however when used in the
 * `ReidentifyContent` API method, it serves the opposite function by reversing
 * the surrogate back into the original identifier. The identifier must be
 * encoded as ASCII. For a given crypto key and context, the same identifier
 * will be replaced with the same surrogate. Identifiers must be at least two
 * characters long. In the case that the identifier is the empty string, it will
 * be skipped. See https://cloud.google.com/dlp/docs/pseudonymization to learn
 * more. Note: We recommend using CryptoDeterministicConfig for all use cases
 * which do not require preserving the input alphabet space and size, plus
 * warrant referential integrity.
 */
export interface GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig {
  /**
   * Common alphabets.
   */
  commonAlphabet?:  | "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED" | "NUMERIC" | "HEXADECIMAL" | "UPPER_CASE_ALPHA_NUMERIC" | "ALPHA_NUMERIC";
  /**
   * The 'tweak', a context may be used for higher security since the same
   * identifier in two different contexts won't be given the same surrogate. If
   * the context is not set, a default tweak will be used. If the context is set
   * but: 1. there is no record present when transforming a given value or 1.
   * the field is not present when transforming a given value, a default tweak
   * will be used. Note that case (1) is expected when an
   * `InfoTypeTransformation` is applied to both structured and unstructured
   * `ContentItem`s. Currently, the referenced field may be of value type
   * integer or string. The tweak is constructed as a sequence of bytes in big
   * endian byte order such that: - a 64 bit integer is encoded followed by a
   * single byte of value 1 - a string is encoded in UTF-8 format followed by a
   * single byte of value 2
   */
  context?: GooglePrivacyDlpV2FieldId;
  /**
   * Required. The key used by the encryption algorithm.
   */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
  /**
   * This is supported by mapping these to the alphanumeric characters that the
   * FFX mode natively supports. This happens before/after
   * encryption/decryption. Each character listed must appear only once. Number
   * of characters must be in the range [2, 95]. This must be encoded as ASCII.
   * The order of characters does not matter. The full list of allowed
   * characters is:
   * 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
   * ~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/
   */
  customAlphabet?: string;
  /**
   * The native way to select the alphabet. Must be in the range [2, 95].
   */
  radix?: number;
  /**
   * The custom infoType to annotate the surrogate with. This annotation will
   * be applied to the surrogate by prefixing it with the name of the custom
   * infoType followed by the number of characters comprising the surrogate. The
   * following scheme defines the format:
   * info_type_name(surrogate_character_count):surrogate For example, if the
   * name of custom infoType is 'MY_TOKEN_INFO_TYPE' and the surrogate is 'abc',
   * the full replacement value will be: 'MY_TOKEN_INFO_TYPE(3):abc' This
   * annotation identifies the surrogate when inspecting content using the
   * custom infoType
   * [`SurrogateType`](https://cloud.google.com/dlp/docs/reference/rest/v2/InspectConfig#surrogatetype).
   * This facilitates reversal of the surrogate when it occurs in free text. In
   * order for inspection to work properly, the name of this infoType must not
   * occur naturally anywhere in your data; otherwise, inspection may find a
   * surrogate that does not correspond to an actual identifier. Therefore,
   * choose your custom infoType name carefully after considering what your data
   * looks like. One way to select a name that has a high chance of yielding
   * reliable detection is to include one or more unicode characters that are
   * highly improbable to exist in your data. For example, assuming your data is
   * entered from a regular ASCII keyboard, the symbol with the hex code point
   * 29DD might be used like so: ⧝MY_TOKEN_TYPE
   */
  surrogateInfoType?: GooglePrivacyDlpV2InfoType;
}

function serializeGooglePrivacyDlpV2CryptoReplaceFfxFpeConfig(data: any): GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? serializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CryptoReplaceFfxFpeConfig(data: any): GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? deserializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

/**
 * Custom information type provided by the user. Used to find domain-specific
 * sensitive information configurable to the data in question.
 */
export interface GooglePrivacyDlpV2CustomInfoType {
  /**
   * Set of detection rules to apply to all findings of this CustomInfoType.
   * Rules are applied in order that they are specified. Not supported for the
   * `surrogate_type` CustomInfoType.
   */
  detectionRules?: GooglePrivacyDlpV2DetectionRule[];
  /**
   * A list of phrases to detect as a CustomInfoType.
   */
  dictionary?: GooglePrivacyDlpV2Dictionary;
  /**
   * If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to
   * be returned. It still can be used for rules matching.
   */
  exclusionType?:  | "EXCLUSION_TYPE_UNSPECIFIED" | "EXCLUSION_TYPE_EXCLUDE";
  /**
   * CustomInfoType can either be a new infoType, or an extension of built-in
   * infoType, when the name matches one of existing infoTypes and that infoType
   * is specified in `InspectContent.info_types` field. Specifying the latter
   * adds findings to the one detected by the system. If built-in info type is
   * not specified in `InspectContent.info_types` list then the name is treated
   * as a custom info type.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
  /**
   * Likelihood to return for this CustomInfoType. This base value can be
   * altered by a detection rule if the finding meets the criteria specified by
   * the rule. Defaults to `VERY_LIKELY` if not specified.
   */
  likelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Regular expression based CustomInfoType.
   */
  regex?: GooglePrivacyDlpV2Regex;
  /**
   * Load an existing `StoredInfoType` resource for use in `InspectDataSource`.
   * Not currently supported in `InspectContent`.
   */
  storedType?: GooglePrivacyDlpV2StoredType;
  /**
   * Message for detecting output from deidentification transformations that
   * support reversing.
   */
  surrogateType?: GooglePrivacyDlpV2SurrogateType;
}

function serializeGooglePrivacyDlpV2CustomInfoType(data: any): GooglePrivacyDlpV2CustomInfoType {
  return {
    ...data,
    storedType: data["storedType"] !== undefined ? serializeGooglePrivacyDlpV2StoredType(data["storedType"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2CustomInfoType(data: any): GooglePrivacyDlpV2CustomInfoType {
  return {
    ...data,
    storedType: data["storedType"] !== undefined ? deserializeGooglePrivacyDlpV2StoredType(data["storedType"]) : undefined,
  };
}

/**
 * A task to execute when a data profile has been generated.
 */
export interface GooglePrivacyDlpV2DataProfileAction {
  /**
   * Export data profiles into a provided location.
   */
  exportData?: GooglePrivacyDlpV2Export;
  /**
   * Publish a message into the Pub/Sub topic.
   */
  pubSubNotification?: GooglePrivacyDlpV2PubSubNotification;
}

/**
 * Snapshot of the configurations used to generate the profile.
 */
export interface GooglePrivacyDlpV2DataProfileConfigSnapshot {
  /**
   * A copy of the configuration used to generate this profile.
   */
  dataProfileJob?: GooglePrivacyDlpV2DataProfileJobConfig;
  /**
   * A copy of the inspection config used to generate this profile. This is a
   * copy of the inspect_template specified in `DataProfileJobConfig`.
   */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
}

function serializeGooglePrivacyDlpV2DataProfileConfigSnapshot(data: any): GooglePrivacyDlpV2DataProfileConfigSnapshot {
  return {
    ...data,
    dataProfileJob: data["dataProfileJob"] !== undefined ? serializeGooglePrivacyDlpV2DataProfileJobConfig(data["dataProfileJob"]) : undefined,
    inspectConfig: data["inspectConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DataProfileConfigSnapshot(data: any): GooglePrivacyDlpV2DataProfileConfigSnapshot {
  return {
    ...data,
    dataProfileJob: data["dataProfileJob"] !== undefined ? deserializeGooglePrivacyDlpV2DataProfileJobConfig(data["dataProfileJob"]) : undefined,
    inspectConfig: data["inspectConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
  };
}

/**
 * Configuration for setting up a job to scan resources for profile generation.
 * Only one data profile configuration may exist per organization, folder, or
 * project. The generated data profiles are retained according to the [data
 * retention policy]
 * (https://cloud.google.com/dlp/docs/data-profiles#retention).
 */
export interface GooglePrivacyDlpV2DataProfileJobConfig {
  /**
   * Actions to execute at the completion of the job.
   */
  dataProfileActions?: GooglePrivacyDlpV2DataProfileAction[];
  /**
   * Detection logic for profile generation. Not all template features are used
   * by profiles. FindingLimits, include_quote and exclude_info_types have no
   * impact on data profiling. Multiple templates may be provided if there is
   * data in multiple regions. At most one template must be specified per-region
   * (including "global"). Each region is scanned using the applicable template.
   * If no region-specific template is specified, but a "global" template is
   * specified, it will be copied to that region and used instead. If no global
   * or region-specific template is provided for a region with data, that
   * region's data will not be scanned. For more information, see
   * https://cloud.google.com/dlp/docs/data-profiles#data_residency.
   */
  inspectTemplates?: string[];
  /**
   * The data to scan.
   */
  location?: GooglePrivacyDlpV2DataProfileLocation;
  /**
   * The project that will run the scan. The DLP service account that exists
   * within this project must have access to all resources that are profiled,
   * and the Cloud DLP API must be enabled.
   */
  projectId?: string;
}

function serializeGooglePrivacyDlpV2DataProfileJobConfig(data: any): GooglePrivacyDlpV2DataProfileJobConfig {
  return {
    ...data,
    location: data["location"] !== undefined ? serializeGooglePrivacyDlpV2DataProfileLocation(data["location"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DataProfileJobConfig(data: any): GooglePrivacyDlpV2DataProfileJobConfig {
  return {
    ...data,
    location: data["location"] !== undefined ? deserializeGooglePrivacyDlpV2DataProfileLocation(data["location"]) : undefined,
  };
}

/**
 * The data that will be profiled.
 */
export interface GooglePrivacyDlpV2DataProfileLocation {
  /**
   * The ID of the Folder within an organization to scan.
   */
  folderId?: bigint;
  /**
   * The ID of an organization to scan.
   */
  organizationId?: bigint;
}

function serializeGooglePrivacyDlpV2DataProfileLocation(data: any): GooglePrivacyDlpV2DataProfileLocation {
  return {
    ...data,
    folderId: data["folderId"] !== undefined ? String(data["folderId"]) : undefined,
    organizationId: data["organizationId"] !== undefined ? String(data["organizationId"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DataProfileLocation(data: any): GooglePrivacyDlpV2DataProfileLocation {
  return {
    ...data,
    folderId: data["folderId"] !== undefined ? BigInt(data["folderId"]) : undefined,
    organizationId: data["organizationId"] !== undefined ? BigInt(data["organizationId"]) : undefined,
  };
}

/**
 * A condition for determining whether a Pub/Sub should be triggered.
 */
export interface GooglePrivacyDlpV2DataProfilePubSubCondition {
  /**
   * An expression.
   */
  expressions?: GooglePrivacyDlpV2PubSubExpressions;
}

/**
 * Pub/Sub topic message for a DataProfileAction.PubSubNotification event. To
 * receive a message of protocol buffer schema type, convert the message data to
 * an object of this proto class.
 */
export interface GooglePrivacyDlpV2DataProfilePubSubMessage {
  /**
   * The event that caused the Pub/Sub message to be sent.
   */
  event?:  | "EVENT_TYPE_UNSPECIFIED" | "NEW_PROFILE" | "CHANGED_PROFILE" | "SCORE_INCREASED" | "ERROR_CHANGED";
  /**
   * If `DetailLevel` is `TABLE_PROFILE` this will be fully populated.
   * Otherwise, if `DetailLevel` is `RESOURCE_NAME`, then only `name` and
   * `full_resource` will be populated.
   */
  profile?: GooglePrivacyDlpV2TableDataProfile;
}

function serializeGooglePrivacyDlpV2DataProfilePubSubMessage(data: any): GooglePrivacyDlpV2DataProfilePubSubMessage {
  return {
    ...data,
    profile: data["profile"] !== undefined ? serializeGooglePrivacyDlpV2TableDataProfile(data["profile"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DataProfilePubSubMessage(data: any): GooglePrivacyDlpV2DataProfilePubSubMessage {
  return {
    ...data,
    profile: data["profile"] !== undefined ? deserializeGooglePrivacyDlpV2TableDataProfile(data["profile"]) : undefined,
  };
}

/**
 * Score is a summary of all elements in the data profile. A higher number
 * means more risk.
 */
export interface GooglePrivacyDlpV2DataRiskLevel {
  /**
   * The score applied to the resource.
   */
  score?:  | "RISK_SCORE_UNSPECIFIED" | "RISK_LOW" | "RISK_MODERATE" | "RISK_HIGH";
}

/**
 * Record key for a finding in Cloud Datastore.
 */
export interface GooglePrivacyDlpV2DatastoreKey {
  /**
   * Datastore entity key.
   */
  entityKey?: GooglePrivacyDlpV2Key;
}

function serializeGooglePrivacyDlpV2DatastoreKey(data: any): GooglePrivacyDlpV2DatastoreKey {
  return {
    ...data,
    entityKey: data["entityKey"] !== undefined ? serializeGooglePrivacyDlpV2Key(data["entityKey"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DatastoreKey(data: any): GooglePrivacyDlpV2DatastoreKey {
  return {
    ...data,
    entityKey: data["entityKey"] !== undefined ? deserializeGooglePrivacyDlpV2Key(data["entityKey"]) : undefined,
  };
}

/**
 * Options defining a data set within Google Cloud Datastore.
 */
export interface GooglePrivacyDlpV2DatastoreOptions {
  /**
   * The kind to process.
   */
  kind?: GooglePrivacyDlpV2KindExpression;
  /**
   * A partition ID identifies a grouping of entities. The grouping is always
   * by project and namespace, however the namespace ID may be empty.
   */
  partitionId?: GooglePrivacyDlpV2PartitionId;
}

/**
 * Shifts dates by random number of days, with option to be consistent for the
 * same context. See https://cloud.google.com/dlp/docs/concepts-date-shifting to
 * learn more.
 */
export interface GooglePrivacyDlpV2DateShiftConfig {
  /**
   * Points to the field that contains the context, for example, an entity id.
   * If set, must also set cryptoKey. If set, shift will be consistent for the
   * given context.
   */
  context?: GooglePrivacyDlpV2FieldId;
  /**
   * Causes the shift to be computed based on this key and the context. This
   * results in the same shift for the same context and crypto_key. If set, must
   * also set context. Can only be applied to table items.
   */
  cryptoKey?: GooglePrivacyDlpV2CryptoKey;
  /**
   * Required. For example, -5 means shift date to at most 5 days back in the
   * past.
   */
  lowerBoundDays?: number;
  /**
   * Required. Range of shift in days. Actual shift will be selected at random
   * within this range (inclusive ends). Negative means shift to earlier in
   * time. Must not be more than 365250 days (1000 years) each direction. For
   * example, 3 means shift date to at most 3 days into the future.
   */
  upperBoundDays?: number;
}

function serializeGooglePrivacyDlpV2DateShiftConfig(data: any): GooglePrivacyDlpV2DateShiftConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? serializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DateShiftConfig(data: any): GooglePrivacyDlpV2DateShiftConfig {
  return {
    ...data,
    cryptoKey: data["cryptoKey"] !== undefined ? deserializeGooglePrivacyDlpV2CryptoKey(data["cryptoKey"]) : undefined,
  };
}

/**
 * Message for a date time object. e.g. 2018-01-01, 5th August.
 */
export interface GooglePrivacyDlpV2DateTime {
  /**
   * One or more of the following must be set. Must be a valid date or time
   * value.
   */
  date?: GoogleTypeDate;
  /**
   * Day of week
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Time of day
   */
  time?: GoogleTypeTimeOfDay;
  /**
   * Time zone
   */
  timeZone?: GooglePrivacyDlpV2TimeZone;
}

/**
 * Create a de-identified copy of the requested table or files. A
 * TransformationDetail will be created for each transformation. If any rows in
 * BigQuery are skipped during de-identification (transformation errors or row
 * size exceeds BigQuery insert API limits) they are placed in the failure
 * output table. If the original row exceeds the BigQuery insert API limit it
 * will be truncated when written to the failure output table. The failure
 * output table can be set in the
 * action.deidentify.output.big_query_output.deidentified_failure_output_table
 * field, if no table is set, a table will be automatically created in the same
 * project and dataset as the original table. Compatible with: Inspect
 */
export interface GooglePrivacyDlpV2Deidentify {
  /**
   * Required. User settable Cloud Storage bucket and folders to store
   * de-identified files. This field must be set for cloud storage
   * deidentification. The output Cloud Storage bucket must be different from
   * the input bucket. De-identified files will overwrite files in the output
   * path. Form of: gs://bucket/folder/ or gs://bucket
   */
  cloudStorageOutput?: string;
  /**
   * List of user-specified file type groups to transform. If specified, only
   * the files with these filetypes will be transformed. If empty, all supported
   * files will be transformed. Supported types may be automatically added over
   * time. If a file type is set in this field that isn't supported by the
   * Deidentify action then the job will fail and will not be successfully
   * created/started. Currently the only filetypes supported are: IMAGES,
   * TEXT_FILES, CSV, TSV.
   */
  fileTypesToTransform?:  | "FILE_TYPE_UNSPECIFIED" | "BINARY_FILE" | "TEXT_FILE" | "IMAGE" | "WORD" | "PDF" | "AVRO" | "CSV" | "TSV" | "POWERPOINT" | "EXCEL"[];
  /**
   * User specified deidentify templates and configs for structured,
   * unstructured, and image files.
   */
  transformationConfig?: GooglePrivacyDlpV2TransformationConfig;
  /**
   * Config for storing transformation details. This is separate from the
   * de-identified content, and contains metadata about the successful
   * transformations and/or failures that occurred while de-identifying. This
   * needs to be set in order for users to access information about the status
   * of each transformation (see TransformationDetails message for more
   * information about what is noted).
   */
  transformationDetailsStorageConfig?: GooglePrivacyDlpV2TransformationDetailsStorageConfig;
}

/**
 * The configuration that controls how the data will change.
 */
export interface GooglePrivacyDlpV2DeidentifyConfig {
  /**
   * Treat the dataset as an image and redact.
   */
  imageTransformations?: GooglePrivacyDlpV2ImageTransformations;
  /**
   * Treat the dataset as free-form text and apply the same free text
   * transformation everywhere.
   */
  infoTypeTransformations?: GooglePrivacyDlpV2InfoTypeTransformations;
  /**
   * Treat the dataset as structured. Transformations can be applied to
   * specific locations within structured datasets, such as transforming a
   * column within a table.
   */
  recordTransformations?: GooglePrivacyDlpV2RecordTransformations;
  /**
   * Mode for handling transformation errors. If left unspecified, the default
   * mode is `TransformationErrorHandling.ThrowError`.
   */
  transformationErrorHandling?: GooglePrivacyDlpV2TransformationErrorHandling;
}

function serializeGooglePrivacyDlpV2DeidentifyConfig(data: any): GooglePrivacyDlpV2DeidentifyConfig {
  return {
    ...data,
    infoTypeTransformations: data["infoTypeTransformations"] !== undefined ? serializeGooglePrivacyDlpV2InfoTypeTransformations(data["infoTypeTransformations"]) : undefined,
    recordTransformations: data["recordTransformations"] !== undefined ? serializeGooglePrivacyDlpV2RecordTransformations(data["recordTransformations"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DeidentifyConfig(data: any): GooglePrivacyDlpV2DeidentifyConfig {
  return {
    ...data,
    infoTypeTransformations: data["infoTypeTransformations"] !== undefined ? deserializeGooglePrivacyDlpV2InfoTypeTransformations(data["infoTypeTransformations"]) : undefined,
    recordTransformations: data["recordTransformations"] !== undefined ? deserializeGooglePrivacyDlpV2RecordTransformations(data["recordTransformations"]) : undefined,
  };
}

/**
 * Request to de-identify a ContentItem.
 */
export interface GooglePrivacyDlpV2DeidentifyContentRequest {
  /**
   * Configuration for the de-identification of the content item. Items
   * specified here will override the template referenced by the
   * deidentify_template_name argument.
   */
  deidentifyConfig?: GooglePrivacyDlpV2DeidentifyConfig;
  /**
   * Template to use. Any configuration directly specified in deidentify_config
   * will override those set in the template. Singular fields that are set in
   * this request will replace their corresponding fields in the template.
   * Repeated fields are appended. Singular sub-messages and groups are
   * recursively merged.
   */
  deidentifyTemplateName?: string;
  /**
   * Configuration for the inspector. Items specified here will override the
   * template referenced by the inspect_template_name argument.
   */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /**
   * Template to use. Any configuration directly specified in inspect_config
   * will override those set in the template. Singular fields that are set in
   * this request will replace their corresponding fields in the template.
   * Repeated fields are appended. Singular sub-messages and groups are
   * recursively merged.
   */
  inspectTemplateName?: string;
  /**
   * The item to de-identify. Will be treated as text. This value must be of
   * type Table if your deidentify_config is a RecordTransformations object.
   */
  item?: GooglePrivacyDlpV2ContentItem;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
}

function serializeGooglePrivacyDlpV2DeidentifyContentRequest(data: any): GooglePrivacyDlpV2DeidentifyContentRequest {
  return {
    ...data,
    deidentifyConfig: data["deidentifyConfig"] !== undefined ? serializeGooglePrivacyDlpV2DeidentifyConfig(data["deidentifyConfig"]) : undefined,
    inspectConfig: data["inspectConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    item: data["item"] !== undefined ? serializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DeidentifyContentRequest(data: any): GooglePrivacyDlpV2DeidentifyContentRequest {
  return {
    ...data,
    deidentifyConfig: data["deidentifyConfig"] !== undefined ? deserializeGooglePrivacyDlpV2DeidentifyConfig(data["deidentifyConfig"]) : undefined,
    inspectConfig: data["inspectConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    item: data["item"] !== undefined ? deserializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
  };
}

/**
 * Results of de-identifying a ContentItem.
 */
export interface GooglePrivacyDlpV2DeidentifyContentResponse {
  /**
   * The de-identified item.
   */
  item?: GooglePrivacyDlpV2ContentItem;
  /**
   * An overview of the changes that were made on the `item`.
   */
  overview?: GooglePrivacyDlpV2TransformationOverview;
}

function serializeGooglePrivacyDlpV2DeidentifyContentResponse(data: any): GooglePrivacyDlpV2DeidentifyContentResponse {
  return {
    ...data,
    item: data["item"] !== undefined ? serializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
    overview: data["overview"] !== undefined ? serializeGooglePrivacyDlpV2TransformationOverview(data["overview"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DeidentifyContentResponse(data: any): GooglePrivacyDlpV2DeidentifyContentResponse {
  return {
    ...data,
    item: data["item"] !== undefined ? deserializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
    overview: data["overview"] !== undefined ? deserializeGooglePrivacyDlpV2TransformationOverview(data["overview"]) : undefined,
  };
}

/**
 * DeidentifyTemplates contains instructions on how to de-identify content. See
 * https://cloud.google.com/dlp/docs/concepts-templates to learn more.
 */
export interface GooglePrivacyDlpV2DeidentifyTemplate {
  /**
   * Output only. The creation timestamp of an inspectTemplate.
   */
  readonly createTime?: Date;
  /**
   * The core content of the template.
   */
  deidentifyConfig?: GooglePrivacyDlpV2DeidentifyConfig;
  /**
   * Short description (max 256 chars).
   */
  description?: string;
  /**
   * Display name (max 256 chars).
   */
  displayName?: string;
  /**
   * Output only. The template name. The template will have one of the
   * following formats: `projects/PROJECT_ID/deidentifyTemplates/TEMPLATE_ID` OR
   * `organizations/ORGANIZATION_ID/deidentifyTemplates/TEMPLATE_ID`
   */
  readonly name?: string;
  /**
   * Output only. The last update timestamp of an inspectTemplate.
   */
  readonly updateTime?: Date;
}

function serializeGooglePrivacyDlpV2DeidentifyTemplate(data: any): GooglePrivacyDlpV2DeidentifyTemplate {
  return {
    ...data,
    deidentifyConfig: data["deidentifyConfig"] !== undefined ? serializeGooglePrivacyDlpV2DeidentifyConfig(data["deidentifyConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DeidentifyTemplate(data: any): GooglePrivacyDlpV2DeidentifyTemplate {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deidentifyConfig: data["deidentifyConfig"] !== undefined ? deserializeGooglePrivacyDlpV2DeidentifyConfig(data["deidentifyConfig"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * δ-presence metric, used to estimate how likely it is for an attacker to
 * figure out that one given individual appears in a de-identified dataset.
 * Similarly to the k-map metric, we cannot compute δ-presence exactly without
 * knowing the attack dataset, so we use a statistical model instead.
 */
export interface GooglePrivacyDlpV2DeltaPresenceEstimationConfig {
  /**
   * Several auxiliary tables can be used in the analysis. Each custom_tag used
   * to tag a quasi-identifiers field must appear in exactly one field of one
   * auxiliary table.
   */
  auxiliaryTables?: GooglePrivacyDlpV2StatisticalTable[];
  /**
   * Required. Fields considered to be quasi-identifiers. No two fields can
   * have the same tag.
   */
  quasiIds?: GooglePrivacyDlpV2QuasiId[];
  /**
   * ISO 3166-1 alpha-2 region code to use in the statistical modeling. Set if
   * no column is tagged with a region-specific InfoType (like US_ZIP_5) or a
   * region code.
   */
  regionCode?: string;
}

/**
 * A DeltaPresenceEstimationHistogramBucket message with the following values:
 * min_probability: 0.1 max_probability: 0.2 frequency: 42 means that there are
 * 42 records for which δ is in [0.1, 0.2). An important particular case is when
 * min_probability = max_probability = 1: then, every individual who shares this
 * quasi-identifier combination is in the dataset.
 */
export interface GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket {
  /**
   * Number of records within these probability bounds.
   */
  bucketSize?: bigint;
  /**
   * Total number of distinct quasi-identifier tuple values in this bucket.
   */
  bucketValueCount?: bigint;
  /**
   * Sample of quasi-identifier tuple values in this bucket. The total number
   * of classes returned per bucket is capped at 20.
   */
  bucketValues?: GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues[];
  /**
   * Always greater than or equal to min_probability.
   */
  maxProbability?: number;
  /**
   * Between 0 and 1.
   */
  minProbability?: number;
}

function serializeGooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket(data: any): GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? String(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? String(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (serializeGooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket(data: any): GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? BigInt(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? BigInt(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (deserializeGooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues(item))) : undefined,
  };
}

/**
 * A tuple of values for the quasi-identifier columns.
 */
export interface GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues {
  /**
   * The estimated probability that a given individual sharing these
   * quasi-identifier values is in the dataset. This value, typically called δ,
   * is the ratio between the number of records in the dataset with these
   * quasi-identifier values, and the total number of individuals (inside *and*
   * outside the dataset) with these quasi-identifier values. For example, if
   * there are 15 individuals in the dataset who share the same quasi-identifier
   * values, and an estimated 100 people in the entire population with these
   * values, then δ is 0.15.
   */
  estimatedProbability?: number;
  /**
   * The quasi-identifier values.
   */
  quasiIdsValues?: GooglePrivacyDlpV2Value[];
}

function serializeGooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues(data: any): GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues {
  return {
    ...data,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (serializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues(data: any): GooglePrivacyDlpV2DeltaPresenceEstimationQuasiIdValues {
  return {
    ...data,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (deserializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

/**
 * Result of the δ-presence computation. Note that these results are an
 * estimation, not exact values.
 */
export interface GooglePrivacyDlpV2DeltaPresenceEstimationResult {
  /**
   * The intervals [min_probability, max_probability) do not overlap. If a
   * value doesn't correspond to any such interval, the associated frequency is
   * zero. For example, the following records: {min_probability: 0,
   * max_probability: 0.1, frequency: 17} {min_probability: 0.2,
   * max_probability: 0.3, frequency: 42} {min_probability: 0.3,
   * max_probability: 0.4, frequency: 99} mean that there are no record with an
   * estimated probability in [0.1, 0.2) nor larger or equal to 0.4.
   */
  deltaPresenceEstimationHistogram?: GooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket[];
}

function serializeGooglePrivacyDlpV2DeltaPresenceEstimationResult(data: any): GooglePrivacyDlpV2DeltaPresenceEstimationResult {
  return {
    ...data,
    deltaPresenceEstimationHistogram: data["deltaPresenceEstimationHistogram"] !== undefined ? data["deltaPresenceEstimationHistogram"].map((item: any) => (serializeGooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DeltaPresenceEstimationResult(data: any): GooglePrivacyDlpV2DeltaPresenceEstimationResult {
  return {
    ...data,
    deltaPresenceEstimationHistogram: data["deltaPresenceEstimationHistogram"] !== undefined ? data["deltaPresenceEstimationHistogram"].map((item: any) => (deserializeGooglePrivacyDlpV2DeltaPresenceEstimationHistogramBucket(item))) : undefined,
  };
}

/**
 * Deprecated; use `InspectionRuleSet` instead. Rule for modifying a
 * `CustomInfoType` to alter behavior under certain circumstances, depending on
 * the specific details of the rule. Not supported for the `surrogate_type`
 * custom infoType.
 */
export interface GooglePrivacyDlpV2DetectionRule {
  /**
   * Hotword-based detection rule.
   */
  hotwordRule?: GooglePrivacyDlpV2HotwordRule;
}

/**
 * Custom information type based on a dictionary of words or phrases. This can
 * be used to match sensitive information specific to the data, such as a list
 * of employee IDs or job titles. Dictionary words are case-insensitive and all
 * characters other than letters and digits in the unicode [Basic Multilingual
 * Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane)
 * will be replaced with whitespace when scanning for matches, so the dictionary
 * phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam,
 * Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any
 * match must be of a different type than the adjacent characters within the
 * word, so letters must be next to non-letters and digits next to non-digits.
 * For example, the dictionary word "jen" will match the first three letters of
 * the text "jen123" but will return no matches for "jennifer". Dictionary words
 * containing a large number of characters that are not letters or digits may
 * result in unexpected findings because such characters are treated as
 * whitespace. The [limits](https://cloud.google.com/dlp/limits) page contains
 * details about the size limits of dictionaries. For dictionaries that do not
 * fit within these constraints, consider using `LargeCustomDictionaryConfig` in
 * the `StoredInfoType` API.
 */
export interface GooglePrivacyDlpV2Dictionary {
  /**
   * Newline-delimited file of words in Cloud Storage. Only a single file is
   * accepted.
   */
  cloudStoragePath?: GooglePrivacyDlpV2CloudStoragePath;
  /**
   * List of words or phrases to search for.
   */
  wordList?: GooglePrivacyDlpV2WordList;
}

/**
 * Combines all of the information about a DLP job.
 */
export interface GooglePrivacyDlpV2DlpJob {
  /**
   * Time when the job was created.
   */
  createTime?: Date;
  /**
   * Time when the job finished.
   */
  endTime?: Date;
  /**
   * A stream of errors encountered running the job.
   */
  errors?: GooglePrivacyDlpV2Error[];
  /**
   * Results from inspecting a data source.
   */
  inspectDetails?: GooglePrivacyDlpV2InspectDataSourceDetails;
  /**
   * If created by a job trigger, the resource name of the trigger that
   * instantiated the job.
   */
  jobTriggerName?: string;
  /**
   * The server-assigned name.
   */
  name?: string;
  /**
   * Results from analyzing risk of a data source.
   */
  riskDetails?: GooglePrivacyDlpV2AnalyzeDataSourceRiskDetails;
  /**
   * Time when the job started.
   */
  startTime?: Date;
  /**
   * State of a job.
   */
  state?:  | "JOB_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | "CANCELED" | "FAILED" | "ACTIVE";
  /**
   * The type of job.
   */
  type?:  | "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB";
}

function serializeGooglePrivacyDlpV2DlpJob(data: any): GooglePrivacyDlpV2DlpJob {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGooglePrivacyDlpV2Error(item))) : undefined,
    inspectDetails: data["inspectDetails"] !== undefined ? serializeGooglePrivacyDlpV2InspectDataSourceDetails(data["inspectDetails"]) : undefined,
    riskDetails: data["riskDetails"] !== undefined ? serializeGooglePrivacyDlpV2AnalyzeDataSourceRiskDetails(data["riskDetails"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DlpJob(data: any): GooglePrivacyDlpV2DlpJob {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGooglePrivacyDlpV2Error(item))) : undefined,
    inspectDetails: data["inspectDetails"] !== undefined ? deserializeGooglePrivacyDlpV2InspectDataSourceDetails(data["inspectDetails"]) : undefined,
    riskDetails: data["riskDetails"] !== undefined ? deserializeGooglePrivacyDlpV2AnalyzeDataSourceRiskDetails(data["riskDetails"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Location of a finding within a document.
 */
export interface GooglePrivacyDlpV2DocumentLocation {
  /**
   * Offset of the line, from the beginning of the file, where the finding is
   * located.
   */
  fileOffset?: bigint;
}

function serializeGooglePrivacyDlpV2DocumentLocation(data: any): GooglePrivacyDlpV2DocumentLocation {
  return {
    ...data,
    fileOffset: data["fileOffset"] !== undefined ? String(data["fileOffset"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2DocumentLocation(data: any): GooglePrivacyDlpV2DocumentLocation {
  return {
    ...data,
    fileOffset: data["fileOffset"] !== undefined ? BigInt(data["fileOffset"]) : undefined,
  };
}

/**
 * An entity in a dataset is a field or set of fields that correspond to a
 * single person. For example, in medical records the `EntityId` might be a
 * patient identifier, or for financial records it might be an account
 * identifier. This message is used when generalizations or analysis must take
 * into account that multiple rows correspond to the same entity.
 */
export interface GooglePrivacyDlpV2EntityId {
  /**
   * Composite key indicating which field contains the entity identifier.
   */
  field?: GooglePrivacyDlpV2FieldId;
}

/**
 * Details information about an error encountered during job execution or the
 * results of an unsuccessful activation of the JobTrigger.
 */
export interface GooglePrivacyDlpV2Error {
  /**
   * Detailed error codes and messages.
   */
  details?: GoogleRpcStatus;
  /**
   * The times the error occurred.
   */
  timestamps?: Date[];
}

function serializeGooglePrivacyDlpV2Error(data: any): GooglePrivacyDlpV2Error {
  return {
    ...data,
    timestamps: data["timestamps"] !== undefined ? data["timestamps"].map((item: any) => (item.toISOString())) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Error(data: any): GooglePrivacyDlpV2Error {
  return {
    ...data,
    timestamps: data["timestamps"] !== undefined ? data["timestamps"].map((item: any) => (new Date(item))) : undefined,
  };
}

/**
 * The rule to exclude findings based on a hotword. For record inspection of
 * tables, column names are considered hotwords. An example of this is to
 * exclude a finding if it belongs to a BigQuery column that matches a specific
 * pattern.
 */
export interface GooglePrivacyDlpV2ExcludeByHotword {
  /**
   * Regular expression pattern defining what qualifies as a hotword.
   */
  hotwordRegex?: GooglePrivacyDlpV2Regex;
  /**
   * Range of characters within which the entire hotword must reside. The total
   * length of the window cannot exceed 1000 characters. The windowBefore
   * property in proximity should be set to 1 if the hotword needs to be
   * included in a column header.
   */
  proximity?: GooglePrivacyDlpV2Proximity;
}

/**
 * List of excluded infoTypes.
 */
export interface GooglePrivacyDlpV2ExcludeInfoTypes {
  /**
   * InfoType list in ExclusionRule rule drops a finding when it overlaps or
   * contained within with a finding of an infoType from this list. For example,
   * for `InspectionRuleSet.info_types` containing "PHONE_NUMBER"` and
   * `exclusion_rule` containing `exclude_info_types.info_types` with
   * "EMAIL_ADDRESS" the phone number findings are dropped if they overlap with
   * EMAIL_ADDRESS finding. That leads to "555-222-2222@example.org" to generate
   * only a single finding, namely email address.
   */
  infoTypes?: GooglePrivacyDlpV2InfoType[];
}

/**
 * The rule that specifies conditions when findings of infoTypes specified in
 * `InspectionRuleSet` are removed from results.
 */
export interface GooglePrivacyDlpV2ExclusionRule {
  /**
   * Dictionary which defines the rule.
   */
  dictionary?: GooglePrivacyDlpV2Dictionary;
  /**
   * Drop if the hotword rule is contained in the proximate context. For
   * tabular data, the context includes the column name.
   */
  excludeByHotword?: GooglePrivacyDlpV2ExcludeByHotword;
  /**
   * Set of infoTypes for which findings would affect this rule.
   */
  excludeInfoTypes?: GooglePrivacyDlpV2ExcludeInfoTypes;
  /**
   * How the rule is applied, see MatchingType documentation for details.
   */
  matchingType?:  | "MATCHING_TYPE_UNSPECIFIED" | "MATCHING_TYPE_FULL_MATCH" | "MATCHING_TYPE_PARTIAL_MATCH" | "MATCHING_TYPE_INVERSE_MATCH";
  /**
   * Regular expression which defines the rule.
   */
  regex?: GooglePrivacyDlpV2Regex;
}

/**
 * If set, the detailed data profiles will be persisted to the location of your
 * choice whenever updated.
 */
export interface GooglePrivacyDlpV2Export {
  /**
   * Store all table and column profiles in an existing table or a new table in
   * an existing dataset. Each re-generation will result in a new row in
   * BigQuery.
   */
  profileTable?: GooglePrivacyDlpV2BigQueryTable;
}

/**
 * An expression, consisting of an operator and conditions.
 */
export interface GooglePrivacyDlpV2Expressions {
  /**
   * Conditions to apply to the expression.
   */
  conditions?: GooglePrivacyDlpV2Conditions;
  /**
   * The operator to apply to the result of conditions. Default and currently
   * only supported value is `AND`.
   */
  logicalOperator?:  | "LOGICAL_OPERATOR_UNSPECIFIED" | "AND";
}

function serializeGooglePrivacyDlpV2Expressions(data: any): GooglePrivacyDlpV2Expressions {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? serializeGooglePrivacyDlpV2Conditions(data["conditions"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Expressions(data: any): GooglePrivacyDlpV2Expressions {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? deserializeGooglePrivacyDlpV2Conditions(data["conditions"]) : undefined,
  };
}

/**
 * General identifier of a data field in a storage service.
 */
export interface GooglePrivacyDlpV2FieldId {
  /**
   * Name describing the field.
   */
  name?: string;
}

/**
 * The transformation to apply to the field.
 */
export interface GooglePrivacyDlpV2FieldTransformation {
  /**
   * Only apply the transformation if the condition evaluates to true for the
   * given `RecordCondition`. The conditions are allowed to reference fields
   * that are not used in the actual transformation. Example Use Cases: - Apply
   * a different bucket transformation to an age column if the zip code column
   * for the same record is within a specific range. - Redact a field if the
   * date of birth field is greater than 85.
   */
  condition?: GooglePrivacyDlpV2RecordCondition;
  /**
   * Required. Input field(s) to apply the transformation to. When you have
   * columns that reference their position within a list, omit the index from
   * the FieldId. FieldId name matching ignores the index. For example, instead
   * of "contact.nums[0].type", use "contact.nums.type".
   */
  fields?: GooglePrivacyDlpV2FieldId[];
  /**
   * Treat the contents of the field as free text, and selectively transform
   * content that matches an `InfoType`.
   */
  infoTypeTransformations?: GooglePrivacyDlpV2InfoTypeTransformations;
  /**
   * Apply the transformation to the entire field.
   */
  primitiveTransformation?: GooglePrivacyDlpV2PrimitiveTransformation;
}

function serializeGooglePrivacyDlpV2FieldTransformation(data: any): GooglePrivacyDlpV2FieldTransformation {
  return {
    ...data,
    condition: data["condition"] !== undefined ? serializeGooglePrivacyDlpV2RecordCondition(data["condition"]) : undefined,
    infoTypeTransformations: data["infoTypeTransformations"] !== undefined ? serializeGooglePrivacyDlpV2InfoTypeTransformations(data["infoTypeTransformations"]) : undefined,
    primitiveTransformation: data["primitiveTransformation"] !== undefined ? serializeGooglePrivacyDlpV2PrimitiveTransformation(data["primitiveTransformation"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2FieldTransformation(data: any): GooglePrivacyDlpV2FieldTransformation {
  return {
    ...data,
    condition: data["condition"] !== undefined ? deserializeGooglePrivacyDlpV2RecordCondition(data["condition"]) : undefined,
    infoTypeTransformations: data["infoTypeTransformations"] !== undefined ? deserializeGooglePrivacyDlpV2InfoTypeTransformations(data["infoTypeTransformations"]) : undefined,
    primitiveTransformation: data["primitiveTransformation"] !== undefined ? deserializeGooglePrivacyDlpV2PrimitiveTransformation(data["primitiveTransformation"]) : undefined,
  };
}

/**
 * Set of files to scan.
 */
export interface GooglePrivacyDlpV2FileSet {
  /**
   * The regex-filtered set of files to scan. Exactly one of `url` or
   * `regex_file_set` must be set.
   */
  regexFileSet?: GooglePrivacyDlpV2CloudStorageRegexFileSet;
  /**
   * The Cloud Storage url of the file(s) to scan, in the format `gs:///`.
   * Trailing wildcard in the path is allowed. If the url ends in a trailing
   * slash, the bucket or directory represented by the url will be scanned
   * non-recursively (content in sub-directories will not be scanned). This
   * means that `gs://mybucket/` is equivalent to `gs://mybucket/*`, and
   * `gs://mybucket/directory/` is equivalent to `gs://mybucket/directory/*`.
   * Exactly one of `url` or `regex_file_set` must be set.
   */
  url?: string;
}

/**
 * Represents a piece of potentially sensitive content.
 */
export interface GooglePrivacyDlpV2Finding {
  /**
   * Timestamp when finding was detected.
   */
  createTime?: Date;
  /**
   * The unique finding id.
   */
  findingId?: string;
  /**
   * The type of content that might have been found. Provided if
   * `excluded_types` is false.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
  /**
   * Time the job started that produced this finding.
   */
  jobCreateTime?: Date;
  /**
   * The job that stored the finding.
   */
  jobName?: string;
  /**
   * The labels associated with this `Finding`. Label keys must be between 1
   * and 63 characters long and must conform to the following regular
   * expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0
   * and 63 characters long and must conform to the regular expression
   * `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated
   * with a given finding. Examples: * `"environment" : "production"` *
   * `"pipeline" : "etl"`
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Confidence of how likely it is that the `info_type` is correct.
   */
  likelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Where the content was found.
   */
  location?: GooglePrivacyDlpV2Location;
  /**
   * Resource name in format
   * projects/{project}/locations/{location}/findings/{finding} Populated only
   * when viewing persisted findings.
   */
  name?: string;
  /**
   * The content that was found. Even if the content is not textual, it may be
   * converted to a textual representation here. Provided if `include_quote` is
   * true and the finding is less than or equal to 4096 bytes long. If the
   * finding exceeds 4096 bytes in length, the quote may be omitted.
   */
  quote?: string;
  /**
   * Contains data parsed from quotes. Only populated if include_quote was set
   * to true and a supported infoType was requested. Currently supported
   * infoTypes: DATE, DATE_OF_BIRTH and TIME.
   */
  quoteInfo?: GooglePrivacyDlpV2QuoteInfo;
  /**
   * The job that stored the finding.
   */
  resourceName?: string;
  /**
   * Job trigger name, if applicable, for this finding.
   */
  triggerName?: string;
}

function serializeGooglePrivacyDlpV2Finding(data: any): GooglePrivacyDlpV2Finding {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    jobCreateTime: data["jobCreateTime"] !== undefined ? data["jobCreateTime"].toISOString() : undefined,
    location: data["location"] !== undefined ? serializeGooglePrivacyDlpV2Location(data["location"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Finding(data: any): GooglePrivacyDlpV2Finding {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    jobCreateTime: data["jobCreateTime"] !== undefined ? new Date(data["jobCreateTime"]) : undefined,
    location: data["location"] !== undefined ? deserializeGooglePrivacyDlpV2Location(data["location"]) : undefined,
  };
}

/**
 * Configuration to control the number of findings returned for inspection.
 * This is not used for de-identification or data profiling. When redacting
 * sensitive data from images, finding limits don't apply. They can cause
 * unexpected or inconsistent results, where only some data is redacted. Don't
 * include finding limits in RedactImage requests. Otherwise, Cloud DLP returns
 * an error.
 */
export interface GooglePrivacyDlpV2FindingLimits {
  /**
   * Configuration of findings limit given for specified infoTypes.
   */
  maxFindingsPerInfoType?: GooglePrivacyDlpV2InfoTypeLimit[];
  /**
   * Max number of findings that will be returned for each item scanned. When
   * set within `InspectJobConfig`, the maximum returned is 2000 regardless if
   * this is set higher. When set within `InspectContentRequest`, this field is
   * ignored.
   */
  maxFindingsPerItem?: number;
  /**
   * Max number of findings that will be returned per request/job. When set
   * within `InspectContentRequest`, the maximum returned is 2000 regardless if
   * this is set higher.
   */
  maxFindingsPerRequest?: number;
}

/**
 * The request message for finishing a DLP hybrid job.
 */
export interface GooglePrivacyDlpV2FinishDlpJobRequest {
}

/**
 * Buckets values based on fixed size ranges. The Bucketing transformation can
 * provide all of this functionality, but requires more configuration. This
 * message is provided as a convenience to the user for simple bucketing
 * strategies. The transformed value will be a hyphenated string of
 * {lower_bound}-{upper_bound}. For example, if lower_bound = 10 and upper_bound
 * = 20, all values that are within this bucket will be replaced with "10-20".
 * This can be used on data of type: double, long. If the bound Value type
 * differs from the type of data being transformed, we will first attempt
 * converting the type of the data to be transformed to match the type of the
 * bound before comparing. See
 * https://cloud.google.com/dlp/docs/concepts-bucketing to learn more.
 */
export interface GooglePrivacyDlpV2FixedSizeBucketingConfig {
  /**
   * Required. Size of each bucket (except for minimum and maximum buckets). So
   * if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the
   * following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60,
   * 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works.
   */
  bucketSize?: number;
  /**
   * Required. Lower bound value of buckets. All values less than `lower_bound`
   * are grouped together into a single bucket; for example if `lower_bound` =
   * 10, then all values less than 10 are replaced with the value "-10".
   */
  lowerBound?: GooglePrivacyDlpV2Value;
  /**
   * Required. Upper bound value of buckets. All values greater than
   * upper_bound are grouped together into a single bucket; for example if
   * `upper_bound` = 89, then all values greater than 89 are replaced with the
   * value "89+".
   */
  upperBound?: GooglePrivacyDlpV2Value;
}

function serializeGooglePrivacyDlpV2FixedSizeBucketingConfig(data: any): GooglePrivacyDlpV2FixedSizeBucketingConfig {
  return {
    ...data,
    lowerBound: data["lowerBound"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["lowerBound"]) : undefined,
    upperBound: data["upperBound"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["upperBound"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2FixedSizeBucketingConfig(data: any): GooglePrivacyDlpV2FixedSizeBucketingConfig {
  return {
    ...data,
    lowerBound: data["lowerBound"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["lowerBound"]) : undefined,
    upperBound: data["upperBound"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["upperBound"]) : undefined,
  };
}

/**
 * The rule that adjusts the likelihood of findings within a certain proximity
 * of hotwords.
 */
export interface GooglePrivacyDlpV2HotwordRule {
  /**
   * Regular expression pattern defining what qualifies as a hotword.
   */
  hotwordRegex?: GooglePrivacyDlpV2Regex;
  /**
   * Likelihood adjustment to apply to all matching findings.
   */
  likelihoodAdjustment?: GooglePrivacyDlpV2LikelihoodAdjustment;
  /**
   * Range of characters within which the entire hotword must reside. The total
   * length of the window cannot exceed 1000 characters. The finding itself will
   * be included in the window, so that hotwords can be used to match substrings
   * of the finding itself. Suppose you want Cloud DLP to promote the likelihood
   * of the phone number regex "\(\d{3}\) \d{3}-\d{4}" if the area code is known
   * to be the area code of a company's office. In this case, use the hotword
   * regex "\(xxx\)", where "xxx" is the area code in question. For tabular
   * data, if you want to modify the likelihood of an entire column of findngs,
   * see [Hotword example: Set the match likelihood of a table column]
   * (https://cloud.google.com/dlp/docs/creating-custom-infotypes-likelihood#match-column-values).
   */
  proximity?: GooglePrivacyDlpV2Proximity;
}

/**
 * An individual hybrid item to inspect. Will be stored temporarily during
 * processing.
 */
export interface GooglePrivacyDlpV2HybridContentItem {
  /**
   * Supplementary information that will be added to each finding.
   */
  findingDetails?: GooglePrivacyDlpV2HybridFindingDetails;
  /**
   * The item to inspect.
   */
  item?: GooglePrivacyDlpV2ContentItem;
}

function serializeGooglePrivacyDlpV2HybridContentItem(data: any): GooglePrivacyDlpV2HybridContentItem {
  return {
    ...data,
    findingDetails: data["findingDetails"] !== undefined ? serializeGooglePrivacyDlpV2HybridFindingDetails(data["findingDetails"]) : undefined,
    item: data["item"] !== undefined ? serializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2HybridContentItem(data: any): GooglePrivacyDlpV2HybridContentItem {
  return {
    ...data,
    findingDetails: data["findingDetails"] !== undefined ? deserializeGooglePrivacyDlpV2HybridFindingDetails(data["findingDetails"]) : undefined,
    item: data["item"] !== undefined ? deserializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
  };
}

/**
 * Populate to associate additional data with each finding.
 */
export interface GooglePrivacyDlpV2HybridFindingDetails {
  /**
   * Details about the container where the content being inspected is from.
   */
  containerDetails?: GooglePrivacyDlpV2Container;
  /**
   * Offset in bytes of the line, from the beginning of the file, where the
   * finding is located. Populate if the item being scanned is only part of a
   * bigger item, such as a shard of a file and you want to track the absolute
   * position of the finding.
   */
  fileOffset?: bigint;
  /**
   * Labels to represent user provided metadata about the data being inspected.
   * If configured by the job, some key values may be required. The labels
   * associated with `Finding`'s produced by hybrid inspection. Label keys must
   * be between 1 and 63 characters long and must conform to the following
   * regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be
   * between 0 and 63 characters long and must conform to the regular expression
   * `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated
   * with a given finding. Examples: * `"environment" : "production"` *
   * `"pipeline" : "etl"`
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Offset of the row for tables. Populate if the row(s) being scanned are
   * part of a bigger dataset and you want to keep track of their absolute
   * position.
   */
  rowOffset?: bigint;
  /**
   * If the container is a table, additional information to make findings
   * meaningful such as the columns that are primary keys. If not known ahead of
   * time, can also be set within each inspect hybrid call and the two will be
   * merged. Note that identifying_fields will only be stored to BigQuery, and
   * only if the BigQuery action has been included.
   */
  tableOptions?: GooglePrivacyDlpV2TableOptions;
}

function serializeGooglePrivacyDlpV2HybridFindingDetails(data: any): GooglePrivacyDlpV2HybridFindingDetails {
  return {
    ...data,
    containerDetails: data["containerDetails"] !== undefined ? serializeGooglePrivacyDlpV2Container(data["containerDetails"]) : undefined,
    fileOffset: data["fileOffset"] !== undefined ? String(data["fileOffset"]) : undefined,
    rowOffset: data["rowOffset"] !== undefined ? String(data["rowOffset"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2HybridFindingDetails(data: any): GooglePrivacyDlpV2HybridFindingDetails {
  return {
    ...data,
    containerDetails: data["containerDetails"] !== undefined ? deserializeGooglePrivacyDlpV2Container(data["containerDetails"]) : undefined,
    fileOffset: data["fileOffset"] !== undefined ? BigInt(data["fileOffset"]) : undefined,
    rowOffset: data["rowOffset"] !== undefined ? BigInt(data["rowOffset"]) : undefined,
  };
}

/**
 * Request to search for potentially sensitive info in a custom location.
 */
export interface GooglePrivacyDlpV2HybridInspectDlpJobRequest {
  /**
   * The item to inspect.
   */
  hybridItem?: GooglePrivacyDlpV2HybridContentItem;
}

function serializeGooglePrivacyDlpV2HybridInspectDlpJobRequest(data: any): GooglePrivacyDlpV2HybridInspectDlpJobRequest {
  return {
    ...data,
    hybridItem: data["hybridItem"] !== undefined ? serializeGooglePrivacyDlpV2HybridContentItem(data["hybridItem"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2HybridInspectDlpJobRequest(data: any): GooglePrivacyDlpV2HybridInspectDlpJobRequest {
  return {
    ...data,
    hybridItem: data["hybridItem"] !== undefined ? deserializeGooglePrivacyDlpV2HybridContentItem(data["hybridItem"]) : undefined,
  };
}

/**
 * Request to search for potentially sensitive info in a custom location.
 */
export interface GooglePrivacyDlpV2HybridInspectJobTriggerRequest {
  /**
   * The item to inspect.
   */
  hybridItem?: GooglePrivacyDlpV2HybridContentItem;
}

function serializeGooglePrivacyDlpV2HybridInspectJobTriggerRequest(data: any): GooglePrivacyDlpV2HybridInspectJobTriggerRequest {
  return {
    ...data,
    hybridItem: data["hybridItem"] !== undefined ? serializeGooglePrivacyDlpV2HybridContentItem(data["hybridItem"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2HybridInspectJobTriggerRequest(data: any): GooglePrivacyDlpV2HybridInspectJobTriggerRequest {
  return {
    ...data,
    hybridItem: data["hybridItem"] !== undefined ? deserializeGooglePrivacyDlpV2HybridContentItem(data["hybridItem"]) : undefined,
  };
}

/**
 * Quota exceeded errors will be thrown once quota has been met.
 */
export interface GooglePrivacyDlpV2HybridInspectResponse {
}

/**
 * Statistics related to processing hybrid inspect requests.
 */
export interface GooglePrivacyDlpV2HybridInspectStatistics {
  /**
   * The number of hybrid inspection requests aborted because the job ran out
   * of quota or was ended before they could be processed.
   */
  abortedCount?: bigint;
  /**
   * The number of hybrid requests currently being processed. Only populated
   * when called via method `getDlpJob`. A burst of traffic may cause hybrid
   * inspect requests to be enqueued. Processing will take place as quickly as
   * possible, but resource limitations may impact how long a request is
   * enqueued for.
   */
  pendingCount?: bigint;
  /**
   * The number of hybrid inspection requests processed within this job.
   */
  processedCount?: bigint;
}

function serializeGooglePrivacyDlpV2HybridInspectStatistics(data: any): GooglePrivacyDlpV2HybridInspectStatistics {
  return {
    ...data,
    abortedCount: data["abortedCount"] !== undefined ? String(data["abortedCount"]) : undefined,
    pendingCount: data["pendingCount"] !== undefined ? String(data["pendingCount"]) : undefined,
    processedCount: data["processedCount"] !== undefined ? String(data["processedCount"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2HybridInspectStatistics(data: any): GooglePrivacyDlpV2HybridInspectStatistics {
  return {
    ...data,
    abortedCount: data["abortedCount"] !== undefined ? BigInt(data["abortedCount"]) : undefined,
    pendingCount: data["pendingCount"] !== undefined ? BigInt(data["pendingCount"]) : undefined,
    processedCount: data["processedCount"] !== undefined ? BigInt(data["processedCount"]) : undefined,
  };
}

/**
 * Configuration to control jobs where the content being inspected is outside
 * of Google Cloud Platform.
 */
export interface GooglePrivacyDlpV2HybridOptions {
  /**
   * A short description of where the data is coming from. Will be stored once
   * in the job. 256 max length.
   */
  description?: string;
  /**
   * To organize findings, these labels will be added to each finding. Label
   * keys must be between 1 and 63 characters long and must conform to the
   * following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values
   * must be between 0 and 63 characters long and must conform to the regular
   * expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be
   * associated with a given finding. Examples: * `"environment" : "production"`
   * * `"pipeline" : "etl"`
   */
  labels?: {
    [key: string]: string
  };
  /**
   * These are labels that each inspection request must include within their
   * 'finding_labels' map. Request may contain others, but any missing one of
   * these will be rejected. Label keys must be between 1 and 63 characters long
   * and must conform to the following regular expression:
   * `[a-z]([-a-z0-9]*[a-z0-9])?`. No more than 10 keys can be required.
   */
  requiredFindingLabelKeys?: string[];
  /**
   * If the container is a table, additional information to make findings
   * meaningful such as the columns that are primary keys.
   */
  tableOptions?: GooglePrivacyDlpV2TableOptions;
}

/**
 * Location of the finding within an image.
 */
export interface GooglePrivacyDlpV2ImageLocation {
  /**
   * Bounding boxes locating the pixels within the image containing the
   * finding.
   */
  boundingBoxes?: GooglePrivacyDlpV2BoundingBox[];
}

/**
 * Configuration for determining how redaction of images should occur.
 */
export interface GooglePrivacyDlpV2ImageRedactionConfig {
  /**
   * Only one per info_type should be provided per request. If not specified,
   * and redact_all_text is false, the DLP API will redact all text that it
   * matches against all info_types that are found, but not specified in another
   * ImageRedactionConfig.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
  /**
   * If true, all text found in the image, regardless whether it matches an
   * info_type, is redacted. Only one should be provided.
   */
  redactAllText?: boolean;
  /**
   * The color to use when redacting content from an image. If not specified,
   * the default is black.
   */
  redactionColor?: GooglePrivacyDlpV2Color;
}

/**
 * Configuration for determining how redaction of images should occur.
 */
export interface GooglePrivacyDlpV2ImageTransformation {
  /**
   * Apply transformation to all findings not specified in other
   * ImageTransformation's selected_info_types. Only one instance is allowed
   * within the ImageTransformations message.
   */
  allInfoTypes?: GooglePrivacyDlpV2AllInfoTypes;
  /**
   * Apply transformation to all text that doesn't match an infoType. Only one
   * instance is allowed within the ImageTransformations message.
   */
  allText?: GooglePrivacyDlpV2AllText;
  /**
   * The color to use when redacting content from an image. If not specified,
   * the default is black.
   */
  redactionColor?: GooglePrivacyDlpV2Color;
  /**
   * Apply transformation to the selected info_types.
   */
  selectedInfoTypes?: GooglePrivacyDlpV2SelectedInfoTypes;
}

/**
 * A type of transformation that is applied over images.
 */
export interface GooglePrivacyDlpV2ImageTransformations {
  transforms?: GooglePrivacyDlpV2ImageTransformation[];
}

/**
 * Type of information detected by the API.
 */
export interface GooglePrivacyDlpV2InfoType {
  /**
   * Name of the information type. Either a name of your choosing when creating
   * a CustomInfoType, or one of the names listed at
   * https://cloud.google.com/dlp/docs/infotypes-reference when specifying a
   * built-in type. When sending Cloud DLP results to Data Catalog, infoType
   * names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.
   */
  name?: string;
  /**
   * Optional version name for this InfoType.
   */
  version?: string;
}

/**
 * Classification of infoTypes to organize them according to geographic
 * location, industry, and data type.
 */
export interface GooglePrivacyDlpV2InfoTypeCategory {
  /**
   * The group of relevant businesses where this infoType is commonly used
   */
  industryCategory?:  | "INDUSTRY_UNSPECIFIED" | "FINANCE" | "HEALTH" | "TELECOMMUNICATIONS";
  /**
   * The region or country that issued the ID or document represented by the
   * infoType.
   */
  locationCategory?:  | "LOCATION_UNSPECIFIED" | "GLOBAL" | "ARGENTINA" | "AUSTRALIA" | "BELGIUM" | "BRAZIL" | "CANADA" | "CHILE" | "CHINA" | "COLOMBIA" | "CROATIA" | "DENMARK" | "FRANCE" | "FINLAND" | "GERMANY" | "HONG_KONG" | "INDIA" | "INDONESIA" | "IRELAND" | "ISRAEL" | "ITALY" | "JAPAN" | "KOREA" | "MEXICO" | "NEW_ZEALAND" | "THE_NETHERLANDS" | "NORWAY" | "PARAGUAY" | "PERU" | "POLAND" | "PORTUGAL" | "SINGAPORE" | "SOUTH_AFRICA" | "SPAIN" | "SWEDEN" | "TAIWAN" | "THAILAND" | "TURKEY" | "UNITED_KINGDOM" | "UNITED_STATES" | "URUGUAY" | "VENEZUELA" | "INTERNAL";
  /**
   * The class of identifiers where this infoType belongs
   */
  typeCategory?:  | "TYPE_UNSPECIFIED" | "PII" | "SPII" | "DEMOGRAPHIC" | "CREDENTIAL" | "GOVERNMENT_ID" | "DOCUMENT" | "CONTEXTUAL_INFORMATION";
}

/**
 * InfoType description.
 */
export interface GooglePrivacyDlpV2InfoTypeDescription {
  /**
   * The category of the infoType.
   */
  categories?: GooglePrivacyDlpV2InfoTypeCategory[];
  /**
   * Description of the infotype. Translated when language is provided in the
   * request.
   */
  description?: string;
  /**
   * Human readable form of the infoType name.
   */
  displayName?: string;
  /**
   * Internal name of the infoType.
   */
  name?: string;
  /**
   * The default sensitivity of the infoType.
   */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /**
   * Which parts of the API supports this InfoType.
   */
  supportedBy?:  | "ENUM_TYPE_UNSPECIFIED" | "INSPECT" | "RISK_ANALYSIS"[];
  /**
   * A list of available versions for the infotype.
   */
  versions?: GooglePrivacyDlpV2VersionDescription[];
}

/**
 * Max findings configuration per infoType, per content item or long running
 * DlpJob.
 */
export interface GooglePrivacyDlpV2InfoTypeLimit {
  /**
   * Type of information the findings limit applies to. Only one limit per
   * info_type should be provided. If InfoTypeLimit does not have an info_type,
   * the DLP API applies the limit against all info_types that are found but not
   * specified in another InfoTypeLimit.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
  /**
   * Max findings limit for the given infoType.
   */
  maxFindings?: number;
}

/**
 * Statistics regarding a specific InfoType.
 */
export interface GooglePrivacyDlpV2InfoTypeStats {
  /**
   * Number of findings for this infoType.
   */
  count?: bigint;
  /**
   * The type of finding this stat is for.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
}

function serializeGooglePrivacyDlpV2InfoTypeStats(data: any): GooglePrivacyDlpV2InfoTypeStats {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InfoTypeStats(data: any): GooglePrivacyDlpV2InfoTypeStats {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * The infoType details for this column.
 */
export interface GooglePrivacyDlpV2InfoTypeSummary {
  /**
   * Not populated for predicted infotypes.
   */
  estimatedPrevalence?: number;
  /**
   * The infoType.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
}

/**
 * A transformation to apply to text that is identified as a specific
 * info_type.
 */
export interface GooglePrivacyDlpV2InfoTypeTransformation {
  /**
   * InfoTypes to apply the transformation to. An empty list will cause this
   * transformation to apply to all findings that correspond to infoTypes that
   * were requested in `InspectConfig`.
   */
  infoTypes?: GooglePrivacyDlpV2InfoType[];
  /**
   * Required. Primitive transformation to apply to the infoType.
   */
  primitiveTransformation?: GooglePrivacyDlpV2PrimitiveTransformation;
}

function serializeGooglePrivacyDlpV2InfoTypeTransformation(data: any): GooglePrivacyDlpV2InfoTypeTransformation {
  return {
    ...data,
    primitiveTransformation: data["primitiveTransformation"] !== undefined ? serializeGooglePrivacyDlpV2PrimitiveTransformation(data["primitiveTransformation"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InfoTypeTransformation(data: any): GooglePrivacyDlpV2InfoTypeTransformation {
  return {
    ...data,
    primitiveTransformation: data["primitiveTransformation"] !== undefined ? deserializeGooglePrivacyDlpV2PrimitiveTransformation(data["primitiveTransformation"]) : undefined,
  };
}

/**
 * A type of transformation that will scan unstructured text and apply various
 * `PrimitiveTransformation`s to each finding, where the transformation is
 * applied to only values that were identified as a specific info_type.
 */
export interface GooglePrivacyDlpV2InfoTypeTransformations {
  /**
   * Required. Transformation for each infoType. Cannot specify more than one
   * for a given infoType.
   */
  transformations?: GooglePrivacyDlpV2InfoTypeTransformation[];
}

function serializeGooglePrivacyDlpV2InfoTypeTransformations(data: any): GooglePrivacyDlpV2InfoTypeTransformations {
  return {
    ...data,
    transformations: data["transformations"] !== undefined ? data["transformations"].map((item: any) => (serializeGooglePrivacyDlpV2InfoTypeTransformation(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InfoTypeTransformations(data: any): GooglePrivacyDlpV2InfoTypeTransformations {
  return {
    ...data,
    transformations: data["transformations"] !== undefined ? data["transformations"].map((item: any) => (deserializeGooglePrivacyDlpV2InfoTypeTransformation(item))) : undefined,
  };
}

/**
 * Configuration description of the scanning process. When used with
 * redactContent only info_types and min_likelihood are currently used.
 */
export interface GooglePrivacyDlpV2InspectConfig {
  /**
   * Deprecated and unused.
   */
  contentOptions?:  | "CONTENT_UNSPECIFIED" | "CONTENT_TEXT" | "CONTENT_IMAGE"[];
  /**
   * CustomInfoTypes provided by the user. See
   * https://cloud.google.com/dlp/docs/creating-custom-infotypes to learn more.
   */
  customInfoTypes?: GooglePrivacyDlpV2CustomInfoType[];
  /**
   * When true, excludes type information of the findings. This is not used for
   * data profiling.
   */
  excludeInfoTypes?: boolean;
  /**
   * When true, a contextual quote from the data that triggered a finding is
   * included in the response; see Finding.quote. This is not used for data
   * profiling.
   */
  includeQuote?: boolean;
  /**
   * Restricts what info_types to look for. The values must correspond to
   * InfoType values returned by ListInfoTypes or listed at
   * https://cloud.google.com/dlp/docs/infotypes-reference. When no InfoTypes or
   * CustomInfoTypes are specified in a request, the system may automatically
   * choose what detectors to run. By default this may be all types, but may
   * change over time as detectors are updated. If you need precise control and
   * predictability as to what detectors are run you should specify specific
   * InfoTypes listed in the reference, otherwise a default list will be used,
   * which may change over time.
   */
  infoTypes?: GooglePrivacyDlpV2InfoType[];
  /**
   * Configuration to control the number of findings returned. This is not used
   * for data profiling. When redacting sensitive data from images, finding
   * limits don't apply. They can cause unexpected or inconsistent results,
   * where only some data is redacted. Don't include finding limits in
   * RedactImage requests. Otherwise, Cloud DLP returns an error. When set
   * within `InspectJobConfig`, the specified maximum values aren't hard limits.
   * If an inspection job reaches these limits, the job ends gradually, not
   * abruptly. Therefore, the actual number of findings that Cloud DLP returns
   * can be multiple times higher than these maximum values.
   */
  limits?: GooglePrivacyDlpV2FindingLimits;
  /**
   * Only returns findings equal or above this threshold. The default is
   * POSSIBLE. See https://cloud.google.com/dlp/docs/likelihood to learn more.
   */
  minLikelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Set of rules to apply to the findings for this InspectConfig. Exclusion
   * rules, contained in the set are executed in the end, other rules are
   * executed in the order they are specified for each info type.
   */
  ruleSet?: GooglePrivacyDlpV2InspectionRuleSet[];
}

function serializeGooglePrivacyDlpV2InspectConfig(data: any): GooglePrivacyDlpV2InspectConfig {
  return {
    ...data,
    customInfoTypes: data["customInfoTypes"] !== undefined ? data["customInfoTypes"].map((item: any) => (serializeGooglePrivacyDlpV2CustomInfoType(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InspectConfig(data: any): GooglePrivacyDlpV2InspectConfig {
  return {
    ...data,
    customInfoTypes: data["customInfoTypes"] !== undefined ? data["customInfoTypes"].map((item: any) => (deserializeGooglePrivacyDlpV2CustomInfoType(item))) : undefined,
  };
}

/**
 * Request to search for potentially sensitive info in a ContentItem.
 */
export interface GooglePrivacyDlpV2InspectContentRequest {
  /**
   * Configuration for the inspector. What specified here will override the
   * template referenced by the inspect_template_name argument.
   */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /**
   * Template to use. Any configuration directly specified in inspect_config
   * will override those set in the template. Singular fields that are set in
   * this request will replace their corresponding fields in the template.
   * Repeated fields are appended. Singular sub-messages and groups are
   * recursively merged.
   */
  inspectTemplateName?: string;
  /**
   * The item to inspect.
   */
  item?: GooglePrivacyDlpV2ContentItem;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
}

function serializeGooglePrivacyDlpV2InspectContentRequest(data: any): GooglePrivacyDlpV2InspectContentRequest {
  return {
    ...data,
    inspectConfig: data["inspectConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    item: data["item"] !== undefined ? serializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InspectContentRequest(data: any): GooglePrivacyDlpV2InspectContentRequest {
  return {
    ...data,
    inspectConfig: data["inspectConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    item: data["item"] !== undefined ? deserializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
  };
}

/**
 * Results of inspecting an item.
 */
export interface GooglePrivacyDlpV2InspectContentResponse {
  /**
   * The findings.
   */
  result?: GooglePrivacyDlpV2InspectResult;
}

function serializeGooglePrivacyDlpV2InspectContentResponse(data: any): GooglePrivacyDlpV2InspectContentResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? serializeGooglePrivacyDlpV2InspectResult(data["result"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InspectContentResponse(data: any): GooglePrivacyDlpV2InspectContentResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? deserializeGooglePrivacyDlpV2InspectResult(data["result"]) : undefined,
  };
}

/**
 * The results of an inspect DataSource job.
 */
export interface GooglePrivacyDlpV2InspectDataSourceDetails {
  /**
   * The configuration used for this job.
   */
  requestedOptions?: GooglePrivacyDlpV2RequestedOptions;
  /**
   * A summary of the outcome of this inspection job.
   */
  result?: GooglePrivacyDlpV2Result;
}

function serializeGooglePrivacyDlpV2InspectDataSourceDetails(data: any): GooglePrivacyDlpV2InspectDataSourceDetails {
  return {
    ...data,
    requestedOptions: data["requestedOptions"] !== undefined ? serializeGooglePrivacyDlpV2RequestedOptions(data["requestedOptions"]) : undefined,
    result: data["result"] !== undefined ? serializeGooglePrivacyDlpV2Result(data["result"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InspectDataSourceDetails(data: any): GooglePrivacyDlpV2InspectDataSourceDetails {
  return {
    ...data,
    requestedOptions: data["requestedOptions"] !== undefined ? deserializeGooglePrivacyDlpV2RequestedOptions(data["requestedOptions"]) : undefined,
    result: data["result"] !== undefined ? deserializeGooglePrivacyDlpV2Result(data["result"]) : undefined,
  };
}

/**
 * A single inspection rule to be applied to infoTypes, specified in
 * `InspectionRuleSet`.
 */
export interface GooglePrivacyDlpV2InspectionRule {
  /**
   * Exclusion rule.
   */
  exclusionRule?: GooglePrivacyDlpV2ExclusionRule;
  /**
   * Hotword-based detection rule.
   */
  hotwordRule?: GooglePrivacyDlpV2HotwordRule;
}

/**
 * Rule set for modifying a set of infoTypes to alter behavior under certain
 * circumstances, depending on the specific details of the rules within the set.
 */
export interface GooglePrivacyDlpV2InspectionRuleSet {
  /**
   * List of infoTypes this rule set is applied to.
   */
  infoTypes?: GooglePrivacyDlpV2InfoType[];
  /**
   * Set of rules to be applied to infoTypes. The rules are applied in order.
   */
  rules?: GooglePrivacyDlpV2InspectionRule[];
}

/**
 * Controls what and how to inspect for findings.
 */
export interface GooglePrivacyDlpV2InspectJobConfig {
  /**
   * Actions to execute at the completion of the job.
   */
  actions?: GooglePrivacyDlpV2Action[];
  /**
   * How and what to scan for.
   */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /**
   * If provided, will be used as the default for all values in InspectConfig.
   * `inspect_config` will be merged into the values persisted as part of the
   * template.
   */
  inspectTemplateName?: string;
  /**
   * The data to scan.
   */
  storageConfig?: GooglePrivacyDlpV2StorageConfig;
}

function serializeGooglePrivacyDlpV2InspectJobConfig(data: any): GooglePrivacyDlpV2InspectJobConfig {
  return {
    ...data,
    inspectConfig: data["inspectConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    storageConfig: data["storageConfig"] !== undefined ? serializeGooglePrivacyDlpV2StorageConfig(data["storageConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InspectJobConfig(data: any): GooglePrivacyDlpV2InspectJobConfig {
  return {
    ...data,
    inspectConfig: data["inspectConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    storageConfig: data["storageConfig"] !== undefined ? deserializeGooglePrivacyDlpV2StorageConfig(data["storageConfig"]) : undefined,
  };
}

/**
 * All the findings for a single scanned item.
 */
export interface GooglePrivacyDlpV2InspectResult {
  /**
   * List of findings for an item.
   */
  findings?: GooglePrivacyDlpV2Finding[];
  /**
   * If true, then this item might have more findings than were returned, and
   * the findings returned are an arbitrary subset of all findings. The findings
   * list might be truncated because the input items were too large, or because
   * the server reached the maximum amount of resources allowed for a single API
   * call. For best results, divide the input into smaller batches.
   */
  findingsTruncated?: boolean;
}

function serializeGooglePrivacyDlpV2InspectResult(data: any): GooglePrivacyDlpV2InspectResult {
  return {
    ...data,
    findings: data["findings"] !== undefined ? data["findings"].map((item: any) => (serializeGooglePrivacyDlpV2Finding(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InspectResult(data: any): GooglePrivacyDlpV2InspectResult {
  return {
    ...data,
    findings: data["findings"] !== undefined ? data["findings"].map((item: any) => (deserializeGooglePrivacyDlpV2Finding(item))) : undefined,
  };
}

/**
 * The inspectTemplate contains a configuration (set of types of sensitive data
 * to be detected) to be used anywhere you otherwise would normally specify
 * InspectConfig. See https://cloud.google.com/dlp/docs/concepts-templates to
 * learn more.
 */
export interface GooglePrivacyDlpV2InspectTemplate {
  /**
   * Output only. The creation timestamp of an inspectTemplate.
   */
  readonly createTime?: Date;
  /**
   * Short description (max 256 chars).
   */
  description?: string;
  /**
   * Display name (max 256 chars).
   */
  displayName?: string;
  /**
   * The core content of the template. Configuration of the scanning process.
   */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /**
   * Output only. The template name. The template will have one of the
   * following formats: `projects/PROJECT_ID/inspectTemplates/TEMPLATE_ID` OR
   * `organizations/ORGANIZATION_ID/inspectTemplates/TEMPLATE_ID`;
   */
  readonly name?: string;
  /**
   * Output only. The last update timestamp of an inspectTemplate.
   */
  readonly updateTime?: Date;
}

function serializeGooglePrivacyDlpV2InspectTemplate(data: any): GooglePrivacyDlpV2InspectTemplate {
  return {
    ...data,
    inspectConfig: data["inspectConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2InspectTemplate(data: any): GooglePrivacyDlpV2InspectTemplate {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    inspectConfig: data["inspectConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Sends an email when the job completes. The email goes to IAM project owners
 * and technical [Essential
 * Contacts](https://cloud.google.com/resource-manager/docs/managing-notification-contacts).
 */
export interface GooglePrivacyDlpV2JobNotificationEmails {
}

/**
 * Contains a configuration to make dlp api calls on a repeating basis. See
 * https://cloud.google.com/dlp/docs/concepts-job-triggers to learn more.
 */
export interface GooglePrivacyDlpV2JobTrigger {
  /**
   * Output only. The creation timestamp of a triggeredJob.
   */
  readonly createTime?: Date;
  /**
   * User provided description (max 256 chars)
   */
  description?: string;
  /**
   * Display name (max 100 chars)
   */
  displayName?: string;
  /**
   * Output only. A stream of errors encountered when the trigger was
   * activated. Repeated errors may result in the JobTrigger automatically being
   * paused. Will return the last 100 errors. Whenever the JobTrigger is
   * modified this list will be cleared.
   */
  readonly errors?: GooglePrivacyDlpV2Error[];
  /**
   * For inspect jobs, a snapshot of the configuration.
   */
  inspectJob?: GooglePrivacyDlpV2InspectJobConfig;
  /**
   * Output only. The timestamp of the last time this trigger executed.
   */
  readonly lastRunTime?: Date;
  /**
   * Unique resource name for the triggeredJob, assigned by the service when
   * the triggeredJob is created, for example
   * `projects/dlp-test-project/jobTriggers/53234423`.
   */
  name?: string;
  /**
   * Required. A status for this trigger.
   */
  status?:  | "STATUS_UNSPECIFIED" | "HEALTHY" | "PAUSED" | "CANCELLED";
  /**
   * A list of triggers which will be OR'ed together. Only one in the list
   * needs to trigger for a job to be started. The list may contain only a
   * single Schedule trigger and must have at least one object.
   */
  triggers?: GooglePrivacyDlpV2Trigger[];
  /**
   * Output only. The last update timestamp of a triggeredJob.
   */
  readonly updateTime?: Date;
}

function serializeGooglePrivacyDlpV2JobTrigger(data: any): GooglePrivacyDlpV2JobTrigger {
  return {
    ...data,
    inspectJob: data["inspectJob"] !== undefined ? serializeGooglePrivacyDlpV2InspectJobConfig(data["inspectJob"]) : undefined,
    triggers: data["triggers"] !== undefined ? data["triggers"].map((item: any) => (serializeGooglePrivacyDlpV2Trigger(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2JobTrigger(data: any): GooglePrivacyDlpV2JobTrigger {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGooglePrivacyDlpV2Error(item))) : undefined,
    inspectJob: data["inspectJob"] !== undefined ? deserializeGooglePrivacyDlpV2InspectJobConfig(data["inspectJob"]) : undefined,
    lastRunTime: data["lastRunTime"] !== undefined ? new Date(data["lastRunTime"]) : undefined,
    triggers: data["triggers"] !== undefined ? data["triggers"].map((item: any) => (deserializeGooglePrivacyDlpV2Trigger(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * k-anonymity metric, used for analysis of reidentification risk.
 */
export interface GooglePrivacyDlpV2KAnonymityConfig {
  /**
   * Message indicating that multiple rows might be associated to a single
   * individual. If the same entity_id is associated to multiple
   * quasi-identifier tuples over distinct rows, we consider the entire
   * collection of tuples as the composite quasi-identifier. This collection is
   * a multiset: the order in which the different tuples appear in the dataset
   * is ignored, but their frequency is taken into account. Important note: a
   * maximum of 1000 rows can be associated to a single entity ID. If more rows
   * are associated with the same entity ID, some might be ignored.
   */
  entityId?: GooglePrivacyDlpV2EntityId;
  /**
   * Set of fields to compute k-anonymity over. When multiple fields are
   * specified, they are considered a single composite key. Structs and repeated
   * data types are not supported; however, nested fields are supported so long
   * as they are not structs themselves or nested within a repeated field.
   */
  quasiIds?: GooglePrivacyDlpV2FieldId[];
}

/**
 * The set of columns' values that share the same ldiversity value
 */
export interface GooglePrivacyDlpV2KAnonymityEquivalenceClass {
  /**
   * Size of the equivalence class, for example number of rows with the above
   * set of values.
   */
  equivalenceClassSize?: bigint;
  /**
   * Set of values defining the equivalence class. One value per
   * quasi-identifier column in the original KAnonymity metric message. The
   * order is always the same as the original request.
   */
  quasiIdsValues?: GooglePrivacyDlpV2Value[];
}

function serializeGooglePrivacyDlpV2KAnonymityEquivalenceClass(data: any): GooglePrivacyDlpV2KAnonymityEquivalenceClass {
  return {
    ...data,
    equivalenceClassSize: data["equivalenceClassSize"] !== undefined ? String(data["equivalenceClassSize"]) : undefined,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (serializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2KAnonymityEquivalenceClass(data: any): GooglePrivacyDlpV2KAnonymityEquivalenceClass {
  return {
    ...data,
    equivalenceClassSize: data["equivalenceClassSize"] !== undefined ? BigInt(data["equivalenceClassSize"]) : undefined,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (deserializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

/**
 * Histogram of k-anonymity equivalence classes.
 */
export interface GooglePrivacyDlpV2KAnonymityHistogramBucket {
  /**
   * Total number of equivalence classes in this bucket.
   */
  bucketSize?: bigint;
  /**
   * Total number of distinct equivalence classes in this bucket.
   */
  bucketValueCount?: bigint;
  /**
   * Sample of equivalence classes in this bucket. The total number of classes
   * returned per bucket is capped at 20.
   */
  bucketValues?: GooglePrivacyDlpV2KAnonymityEquivalenceClass[];
  /**
   * Lower bound on the size of the equivalence classes in this bucket.
   */
  equivalenceClassSizeLowerBound?: bigint;
  /**
   * Upper bound on the size of the equivalence classes in this bucket.
   */
  equivalenceClassSizeUpperBound?: bigint;
}

function serializeGooglePrivacyDlpV2KAnonymityHistogramBucket(data: any): GooglePrivacyDlpV2KAnonymityHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? String(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? String(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (serializeGooglePrivacyDlpV2KAnonymityEquivalenceClass(item))) : undefined,
    equivalenceClassSizeLowerBound: data["equivalenceClassSizeLowerBound"] !== undefined ? String(data["equivalenceClassSizeLowerBound"]) : undefined,
    equivalenceClassSizeUpperBound: data["equivalenceClassSizeUpperBound"] !== undefined ? String(data["equivalenceClassSizeUpperBound"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2KAnonymityHistogramBucket(data: any): GooglePrivacyDlpV2KAnonymityHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? BigInt(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? BigInt(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (deserializeGooglePrivacyDlpV2KAnonymityEquivalenceClass(item))) : undefined,
    equivalenceClassSizeLowerBound: data["equivalenceClassSizeLowerBound"] !== undefined ? BigInt(data["equivalenceClassSizeLowerBound"]) : undefined,
    equivalenceClassSizeUpperBound: data["equivalenceClassSizeUpperBound"] !== undefined ? BigInt(data["equivalenceClassSizeUpperBound"]) : undefined,
  };
}

/**
 * Result of the k-anonymity computation.
 */
export interface GooglePrivacyDlpV2KAnonymityResult {
  /**
   * Histogram of k-anonymity equivalence classes.
   */
  equivalenceClassHistogramBuckets?: GooglePrivacyDlpV2KAnonymityHistogramBucket[];
}

function serializeGooglePrivacyDlpV2KAnonymityResult(data: any): GooglePrivacyDlpV2KAnonymityResult {
  return {
    ...data,
    equivalenceClassHistogramBuckets: data["equivalenceClassHistogramBuckets"] !== undefined ? data["equivalenceClassHistogramBuckets"].map((item: any) => (serializeGooglePrivacyDlpV2KAnonymityHistogramBucket(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2KAnonymityResult(data: any): GooglePrivacyDlpV2KAnonymityResult {
  return {
    ...data,
    equivalenceClassHistogramBuckets: data["equivalenceClassHistogramBuckets"] !== undefined ? data["equivalenceClassHistogramBuckets"].map((item: any) => (deserializeGooglePrivacyDlpV2KAnonymityHistogramBucket(item))) : undefined,
  };
}

/**
 * A unique identifier for a Datastore entity. If a key's partition ID or any
 * of its path kinds or names are reserved/read-only, the key is
 * reserved/read-only. A reserved/read-only key is forbidden in certain
 * documented contexts.
 */
export interface GooglePrivacyDlpV2Key {
  /**
   * Entities are partitioned into subsets, currently identified by a project
   * ID and namespace ID. Queries are scoped to a single partition.
   */
  partitionId?: GooglePrivacyDlpV2PartitionId;
  /**
   * The entity path. An entity path consists of one or more elements composed
   * of a kind and a string or numerical identifier, which identify entities.
   * The first element identifies a _root entity_, the second element identifies
   * a _child_ of the root entity, the third element identifies a child of the
   * second entity, and so forth. The entities identified by all prefixes of the
   * path are called the element's _ancestors_. A path can never be empty, and a
   * path can have at most 100 elements.
   */
  path?: GooglePrivacyDlpV2PathElement[];
}

function serializeGooglePrivacyDlpV2Key(data: any): GooglePrivacyDlpV2Key {
  return {
    ...data,
    path: data["path"] !== undefined ? data["path"].map((item: any) => (serializeGooglePrivacyDlpV2PathElement(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Key(data: any): GooglePrivacyDlpV2Key {
  return {
    ...data,
    path: data["path"] !== undefined ? data["path"].map((item: any) => (deserializeGooglePrivacyDlpV2PathElement(item))) : undefined,
  };
}

/**
 * A representation of a Datastore kind.
 */
export interface GooglePrivacyDlpV2KindExpression {
  /**
   * The name of the kind.
   */
  name?: string;
}

/**
 * Reidentifiability metric. This corresponds to a risk model similar to what
 * is called "journalist risk" in the literature, except the attack dataset is
 * statistically modeled instead of being perfectly known. This can be done
 * using publicly available data (like the US Census), or using a custom
 * statistical model (indicated as one or several BigQuery tables), or by
 * extrapolating from the distribution of values in the input dataset.
 */
export interface GooglePrivacyDlpV2KMapEstimationConfig {
  /**
   * Several auxiliary tables can be used in the analysis. Each custom_tag used
   * to tag a quasi-identifiers column must appear in exactly one column of one
   * auxiliary table.
   */
  auxiliaryTables?: GooglePrivacyDlpV2AuxiliaryTable[];
  /**
   * Required. Fields considered to be quasi-identifiers. No two columns can
   * have the same tag.
   */
  quasiIds?: GooglePrivacyDlpV2TaggedField[];
  /**
   * ISO 3166-1 alpha-2 region code to use in the statistical modeling. Set if
   * no column is tagged with a region-specific InfoType (like US_ZIP_5) or a
   * region code.
   */
  regionCode?: string;
}

/**
 * A KMapEstimationHistogramBucket message with the following values:
 * min_anonymity: 3 max_anonymity: 5 frequency: 42 means that there are 42
 * records whose quasi-identifier values correspond to 3, 4 or 5 people in the
 * overlying population. An important particular case is when min_anonymity =
 * max_anonymity = 1: the frequency field then corresponds to the number of
 * uniquely identifiable records.
 */
export interface GooglePrivacyDlpV2KMapEstimationHistogramBucket {
  /**
   * Number of records within these anonymity bounds.
   */
  bucketSize?: bigint;
  /**
   * Total number of distinct quasi-identifier tuple values in this bucket.
   */
  bucketValueCount?: bigint;
  /**
   * Sample of quasi-identifier tuple values in this bucket. The total number
   * of classes returned per bucket is capped at 20.
   */
  bucketValues?: GooglePrivacyDlpV2KMapEstimationQuasiIdValues[];
  /**
   * Always greater than or equal to min_anonymity.
   */
  maxAnonymity?: bigint;
  /**
   * Always positive.
   */
  minAnonymity?: bigint;
}

function serializeGooglePrivacyDlpV2KMapEstimationHistogramBucket(data: any): GooglePrivacyDlpV2KMapEstimationHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? String(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? String(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (serializeGooglePrivacyDlpV2KMapEstimationQuasiIdValues(item))) : undefined,
    maxAnonymity: data["maxAnonymity"] !== undefined ? String(data["maxAnonymity"]) : undefined,
    minAnonymity: data["minAnonymity"] !== undefined ? String(data["minAnonymity"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2KMapEstimationHistogramBucket(data: any): GooglePrivacyDlpV2KMapEstimationHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? BigInt(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? BigInt(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (deserializeGooglePrivacyDlpV2KMapEstimationQuasiIdValues(item))) : undefined,
    maxAnonymity: data["maxAnonymity"] !== undefined ? BigInt(data["maxAnonymity"]) : undefined,
    minAnonymity: data["minAnonymity"] !== undefined ? BigInt(data["minAnonymity"]) : undefined,
  };
}

/**
 * A tuple of values for the quasi-identifier columns.
 */
export interface GooglePrivacyDlpV2KMapEstimationQuasiIdValues {
  /**
   * The estimated anonymity for these quasi-identifier values.
   */
  estimatedAnonymity?: bigint;
  /**
   * The quasi-identifier values.
   */
  quasiIdsValues?: GooglePrivacyDlpV2Value[];
}

function serializeGooglePrivacyDlpV2KMapEstimationQuasiIdValues(data: any): GooglePrivacyDlpV2KMapEstimationQuasiIdValues {
  return {
    ...data,
    estimatedAnonymity: data["estimatedAnonymity"] !== undefined ? String(data["estimatedAnonymity"]) : undefined,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (serializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2KMapEstimationQuasiIdValues(data: any): GooglePrivacyDlpV2KMapEstimationQuasiIdValues {
  return {
    ...data,
    estimatedAnonymity: data["estimatedAnonymity"] !== undefined ? BigInt(data["estimatedAnonymity"]) : undefined,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (deserializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

/**
 * Result of the reidentifiability analysis. Note that these results are an
 * estimation, not exact values.
 */
export interface GooglePrivacyDlpV2KMapEstimationResult {
  /**
   * The intervals [min_anonymity, max_anonymity] do not overlap. If a value
   * doesn't correspond to any such interval, the associated frequency is zero.
   * For example, the following records: {min_anonymity: 1, max_anonymity: 1,
   * frequency: 17} {min_anonymity: 2, max_anonymity: 3, frequency: 42}
   * {min_anonymity: 5, max_anonymity: 10, frequency: 99} mean that there are no
   * record with an estimated anonymity of 4, 5, or larger than 10.
   */
  kMapEstimationHistogram?: GooglePrivacyDlpV2KMapEstimationHistogramBucket[];
}

function serializeGooglePrivacyDlpV2KMapEstimationResult(data: any): GooglePrivacyDlpV2KMapEstimationResult {
  return {
    ...data,
    kMapEstimationHistogram: data["kMapEstimationHistogram"] !== undefined ? data["kMapEstimationHistogram"].map((item: any) => (serializeGooglePrivacyDlpV2KMapEstimationHistogramBucket(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2KMapEstimationResult(data: any): GooglePrivacyDlpV2KMapEstimationResult {
  return {
    ...data,
    kMapEstimationHistogram: data["kMapEstimationHistogram"] !== undefined ? data["kMapEstimationHistogram"].map((item: any) => (deserializeGooglePrivacyDlpV2KMapEstimationHistogramBucket(item))) : undefined,
  };
}

/**
 * Include to use an existing data crypto key wrapped by KMS. The wrapped key
 * must be a 128-, 192-, or 256-bit key. Authorization requires the following
 * IAM permissions when sending a request to perform a crypto transformation
 * using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see
 * [Creating a wrapped key]
 * (https://cloud.google.com/dlp/docs/create-wrapped-key). Note: When you use
 * Cloud KMS for cryptographic operations, [charges
 * apply](https://cloud.google.com/kms/pricing).
 */
export interface GooglePrivacyDlpV2KmsWrappedCryptoKey {
  /**
   * Required. The resource name of the KMS CryptoKey to use for unwrapping.
   */
  cryptoKeyName?: string;
  /**
   * Required. The wrapped data crypto key.
   */
  wrappedKey?: Uint8Array;
}

function serializeGooglePrivacyDlpV2KmsWrappedCryptoKey(data: any): GooglePrivacyDlpV2KmsWrappedCryptoKey {
  return {
    ...data,
    wrappedKey: data["wrappedKey"] !== undefined ? encodeBase64(data["wrappedKey"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2KmsWrappedCryptoKey(data: any): GooglePrivacyDlpV2KmsWrappedCryptoKey {
  return {
    ...data,
    wrappedKey: data["wrappedKey"] !== undefined ? decodeBase64(data["wrappedKey"] as string) : undefined,
  };
}

/**
 * Configuration for a custom dictionary created from a data source of any size
 * up to the maximum size defined in the
 * [limits](https://cloud.google.com/dlp/limits) page. The artifacts of
 * dictionary creation are stored in the specified Cloud Storage location.
 * Consider using `CustomInfoType.Dictionary` for smaller dictionaries that
 * satisfy the size requirements.
 */
export interface GooglePrivacyDlpV2LargeCustomDictionaryConfig {
  /**
   * Field in a BigQuery table where each cell represents a dictionary phrase.
   */
  bigQueryField?: GooglePrivacyDlpV2BigQueryField;
  /**
   * Set of files containing newline-delimited lists of dictionary phrases.
   */
  cloudStorageFileSet?: GooglePrivacyDlpV2CloudStorageFileSet;
  /**
   * Location to store dictionary artifacts in Cloud Storage. These files will
   * only be accessible by project owners and the DLP API. If any of these
   * artifacts are modified, the dictionary is considered invalid and can no
   * longer be used.
   */
  outputPath?: GooglePrivacyDlpV2CloudStoragePath;
}

/**
 * Summary statistics of a custom dictionary.
 */
export interface GooglePrivacyDlpV2LargeCustomDictionaryStats {
  /**
   * Approximate number of distinct phrases in the dictionary.
   */
  approxNumPhrases?: bigint;
}

function serializeGooglePrivacyDlpV2LargeCustomDictionaryStats(data: any): GooglePrivacyDlpV2LargeCustomDictionaryStats {
  return {
    ...data,
    approxNumPhrases: data["approxNumPhrases"] !== undefined ? String(data["approxNumPhrases"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2LargeCustomDictionaryStats(data: any): GooglePrivacyDlpV2LargeCustomDictionaryStats {
  return {
    ...data,
    approxNumPhrases: data["approxNumPhrases"] !== undefined ? BigInt(data["approxNumPhrases"]) : undefined,
  };
}

/**
 * l-diversity metric, used for analysis of reidentification risk.
 */
export interface GooglePrivacyDlpV2LDiversityConfig {
  /**
   * Set of quasi-identifiers indicating how equivalence classes are defined
   * for the l-diversity computation. When multiple fields are specified, they
   * are considered a single composite key.
   */
  quasiIds?: GooglePrivacyDlpV2FieldId[];
  /**
   * Sensitive field for computing the l-value.
   */
  sensitiveAttribute?: GooglePrivacyDlpV2FieldId;
}

/**
 * The set of columns' values that share the same ldiversity value.
 */
export interface GooglePrivacyDlpV2LDiversityEquivalenceClass {
  /**
   * Size of the k-anonymity equivalence class.
   */
  equivalenceClassSize?: bigint;
  /**
   * Number of distinct sensitive values in this equivalence class.
   */
  numDistinctSensitiveValues?: bigint;
  /**
   * Quasi-identifier values defining the k-anonymity equivalence class. The
   * order is always the same as the original request.
   */
  quasiIdsValues?: GooglePrivacyDlpV2Value[];
  /**
   * Estimated frequencies of top sensitive values.
   */
  topSensitiveValues?: GooglePrivacyDlpV2ValueFrequency[];
}

function serializeGooglePrivacyDlpV2LDiversityEquivalenceClass(data: any): GooglePrivacyDlpV2LDiversityEquivalenceClass {
  return {
    ...data,
    equivalenceClassSize: data["equivalenceClassSize"] !== undefined ? String(data["equivalenceClassSize"]) : undefined,
    numDistinctSensitiveValues: data["numDistinctSensitiveValues"] !== undefined ? String(data["numDistinctSensitiveValues"]) : undefined,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (serializeGooglePrivacyDlpV2Value(item))) : undefined,
    topSensitiveValues: data["topSensitiveValues"] !== undefined ? data["topSensitiveValues"].map((item: any) => (serializeGooglePrivacyDlpV2ValueFrequency(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2LDiversityEquivalenceClass(data: any): GooglePrivacyDlpV2LDiversityEquivalenceClass {
  return {
    ...data,
    equivalenceClassSize: data["equivalenceClassSize"] !== undefined ? BigInt(data["equivalenceClassSize"]) : undefined,
    numDistinctSensitiveValues: data["numDistinctSensitiveValues"] !== undefined ? BigInt(data["numDistinctSensitiveValues"]) : undefined,
    quasiIdsValues: data["quasiIdsValues"] !== undefined ? data["quasiIdsValues"].map((item: any) => (deserializeGooglePrivacyDlpV2Value(item))) : undefined,
    topSensitiveValues: data["topSensitiveValues"] !== undefined ? data["topSensitiveValues"].map((item: any) => (deserializeGooglePrivacyDlpV2ValueFrequency(item))) : undefined,
  };
}

/**
 * Histogram of l-diversity equivalence class sensitive value frequencies.
 */
export interface GooglePrivacyDlpV2LDiversityHistogramBucket {
  /**
   * Total number of equivalence classes in this bucket.
   */
  bucketSize?: bigint;
  /**
   * Total number of distinct equivalence classes in this bucket.
   */
  bucketValueCount?: bigint;
  /**
   * Sample of equivalence classes in this bucket. The total number of classes
   * returned per bucket is capped at 20.
   */
  bucketValues?: GooglePrivacyDlpV2LDiversityEquivalenceClass[];
  /**
   * Lower bound on the sensitive value frequencies of the equivalence classes
   * in this bucket.
   */
  sensitiveValueFrequencyLowerBound?: bigint;
  /**
   * Upper bound on the sensitive value frequencies of the equivalence classes
   * in this bucket.
   */
  sensitiveValueFrequencyUpperBound?: bigint;
}

function serializeGooglePrivacyDlpV2LDiversityHistogramBucket(data: any): GooglePrivacyDlpV2LDiversityHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? String(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? String(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (serializeGooglePrivacyDlpV2LDiversityEquivalenceClass(item))) : undefined,
    sensitiveValueFrequencyLowerBound: data["sensitiveValueFrequencyLowerBound"] !== undefined ? String(data["sensitiveValueFrequencyLowerBound"]) : undefined,
    sensitiveValueFrequencyUpperBound: data["sensitiveValueFrequencyUpperBound"] !== undefined ? String(data["sensitiveValueFrequencyUpperBound"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2LDiversityHistogramBucket(data: any): GooglePrivacyDlpV2LDiversityHistogramBucket {
  return {
    ...data,
    bucketSize: data["bucketSize"] !== undefined ? BigInt(data["bucketSize"]) : undefined,
    bucketValueCount: data["bucketValueCount"] !== undefined ? BigInt(data["bucketValueCount"]) : undefined,
    bucketValues: data["bucketValues"] !== undefined ? data["bucketValues"].map((item: any) => (deserializeGooglePrivacyDlpV2LDiversityEquivalenceClass(item))) : undefined,
    sensitiveValueFrequencyLowerBound: data["sensitiveValueFrequencyLowerBound"] !== undefined ? BigInt(data["sensitiveValueFrequencyLowerBound"]) : undefined,
    sensitiveValueFrequencyUpperBound: data["sensitiveValueFrequencyUpperBound"] !== undefined ? BigInt(data["sensitiveValueFrequencyUpperBound"]) : undefined,
  };
}

/**
 * Result of the l-diversity computation.
 */
export interface GooglePrivacyDlpV2LDiversityResult {
  /**
   * Histogram of l-diversity equivalence class sensitive value frequencies.
   */
  sensitiveValueFrequencyHistogramBuckets?: GooglePrivacyDlpV2LDiversityHistogramBucket[];
}

function serializeGooglePrivacyDlpV2LDiversityResult(data: any): GooglePrivacyDlpV2LDiversityResult {
  return {
    ...data,
    sensitiveValueFrequencyHistogramBuckets: data["sensitiveValueFrequencyHistogramBuckets"] !== undefined ? data["sensitiveValueFrequencyHistogramBuckets"].map((item: any) => (serializeGooglePrivacyDlpV2LDiversityHistogramBucket(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2LDiversityResult(data: any): GooglePrivacyDlpV2LDiversityResult {
  return {
    ...data,
    sensitiveValueFrequencyHistogramBuckets: data["sensitiveValueFrequencyHistogramBuckets"] !== undefined ? data["sensitiveValueFrequencyHistogramBuckets"].map((item: any) => (deserializeGooglePrivacyDlpV2LDiversityHistogramBucket(item))) : undefined,
  };
}

/**
 * Skips the data without modifying it if the requested transformation would
 * cause an error. For example, if a `DateShift` transformation were applied an
 * an IP address, this mode would leave the IP address unchanged in the
 * response.
 */
export interface GooglePrivacyDlpV2LeaveUntransformed {
}

/**
 * Message for specifying an adjustment to the likelihood of a finding as part
 * of a detection rule.
 */
export interface GooglePrivacyDlpV2LikelihoodAdjustment {
  /**
   * Set the likelihood of a finding to a fixed value.
   */
  fixedLikelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Increase or decrease the likelihood by the specified number of levels. For
   * example, if a finding would be `POSSIBLE` without the detection rule and
   * `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value
   * of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below
   * `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1
   * followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will
   * result in a final likelihood of `LIKELY`.
   */
  relativeLikelihood?: number;
}

/**
 * Response message for ListDeidentifyTemplates.
 */
export interface GooglePrivacyDlpV2ListDeidentifyTemplatesResponse {
  /**
   * List of deidentify templates, up to page_size in
   * ListDeidentifyTemplatesRequest.
   */
  deidentifyTemplates?: GooglePrivacyDlpV2DeidentifyTemplate[];
  /**
   * If the next page is available then the next page token to be used in
   * following ListDeidentifyTemplates request.
   */
  nextPageToken?: string;
}

function serializeGooglePrivacyDlpV2ListDeidentifyTemplatesResponse(data: any): GooglePrivacyDlpV2ListDeidentifyTemplatesResponse {
  return {
    ...data,
    deidentifyTemplates: data["deidentifyTemplates"] !== undefined ? data["deidentifyTemplates"].map((item: any) => (serializeGooglePrivacyDlpV2DeidentifyTemplate(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ListDeidentifyTemplatesResponse(data: any): GooglePrivacyDlpV2ListDeidentifyTemplatesResponse {
  return {
    ...data,
    deidentifyTemplates: data["deidentifyTemplates"] !== undefined ? data["deidentifyTemplates"].map((item: any) => (deserializeGooglePrivacyDlpV2DeidentifyTemplate(item))) : undefined,
  };
}

/**
 * The response message for listing DLP jobs.
 */
export interface GooglePrivacyDlpV2ListDlpJobsResponse {
  /**
   * A list of DlpJobs that matches the specified filter in the request.
   */
  jobs?: GooglePrivacyDlpV2DlpJob[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

function serializeGooglePrivacyDlpV2ListDlpJobsResponse(data: any): GooglePrivacyDlpV2ListDlpJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeGooglePrivacyDlpV2DlpJob(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ListDlpJobsResponse(data: any): GooglePrivacyDlpV2ListDlpJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeGooglePrivacyDlpV2DlpJob(item))) : undefined,
  };
}

/**
 * Response to the ListInfoTypes request.
 */
export interface GooglePrivacyDlpV2ListInfoTypesResponse {
  /**
   * Set of sensitive infoTypes.
   */
  infoTypes?: GooglePrivacyDlpV2InfoTypeDescription[];
}

/**
 * Response message for ListInspectTemplates.
 */
export interface GooglePrivacyDlpV2ListInspectTemplatesResponse {
  /**
   * List of inspectTemplates, up to page_size in ListInspectTemplatesRequest.
   */
  inspectTemplates?: GooglePrivacyDlpV2InspectTemplate[];
  /**
   * If the next page is available then the next page token to be used in
   * following ListInspectTemplates request.
   */
  nextPageToken?: string;
}

function serializeGooglePrivacyDlpV2ListInspectTemplatesResponse(data: any): GooglePrivacyDlpV2ListInspectTemplatesResponse {
  return {
    ...data,
    inspectTemplates: data["inspectTemplates"] !== undefined ? data["inspectTemplates"].map((item: any) => (serializeGooglePrivacyDlpV2InspectTemplate(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ListInspectTemplatesResponse(data: any): GooglePrivacyDlpV2ListInspectTemplatesResponse {
  return {
    ...data,
    inspectTemplates: data["inspectTemplates"] !== undefined ? data["inspectTemplates"].map((item: any) => (deserializeGooglePrivacyDlpV2InspectTemplate(item))) : undefined,
  };
}

/**
 * Response message for ListJobTriggers.
 */
export interface GooglePrivacyDlpV2ListJobTriggersResponse {
  /**
   * List of triggeredJobs, up to page_size in ListJobTriggersRequest.
   */
  jobTriggers?: GooglePrivacyDlpV2JobTrigger[];
  /**
   * If the next page is available then the next page token to be used in
   * following ListJobTriggers request.
   */
  nextPageToken?: string;
}

function serializeGooglePrivacyDlpV2ListJobTriggersResponse(data: any): GooglePrivacyDlpV2ListJobTriggersResponse {
  return {
    ...data,
    jobTriggers: data["jobTriggers"] !== undefined ? data["jobTriggers"].map((item: any) => (serializeGooglePrivacyDlpV2JobTrigger(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ListJobTriggersResponse(data: any): GooglePrivacyDlpV2ListJobTriggersResponse {
  return {
    ...data,
    jobTriggers: data["jobTriggers"] !== undefined ? data["jobTriggers"].map((item: any) => (deserializeGooglePrivacyDlpV2JobTrigger(item))) : undefined,
  };
}

/**
 * Response message for ListStoredInfoTypes.
 */
export interface GooglePrivacyDlpV2ListStoredInfoTypesResponse {
  /**
   * If the next page is available then the next page token to be used in
   * following ListStoredInfoTypes request.
   */
  nextPageToken?: string;
  /**
   * List of storedInfoTypes, up to page_size in ListStoredInfoTypesRequest.
   */
  storedInfoTypes?: GooglePrivacyDlpV2StoredInfoType[];
}

function serializeGooglePrivacyDlpV2ListStoredInfoTypesResponse(data: any): GooglePrivacyDlpV2ListStoredInfoTypesResponse {
  return {
    ...data,
    storedInfoTypes: data["storedInfoTypes"] !== undefined ? data["storedInfoTypes"].map((item: any) => (serializeGooglePrivacyDlpV2StoredInfoType(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ListStoredInfoTypesResponse(data: any): GooglePrivacyDlpV2ListStoredInfoTypesResponse {
  return {
    ...data,
    storedInfoTypes: data["storedInfoTypes"] !== undefined ? data["storedInfoTypes"].map((item: any) => (deserializeGooglePrivacyDlpV2StoredInfoType(item))) : undefined,
  };
}

/**
 * Specifies the location of the finding.
 */
export interface GooglePrivacyDlpV2Location {
  /**
   * Zero-based byte offsets delimiting the finding. These are relative to the
   * finding's containing element. Note that when the content is not textual,
   * this references the UTF-8 encoded textual representation of the content.
   * Omitted if content is an image.
   */
  byteRange?: GooglePrivacyDlpV2Range;
  /**
   * Unicode character offsets delimiting the finding. These are relative to
   * the finding's containing element. Provided when the content is text.
   */
  codepointRange?: GooglePrivacyDlpV2Range;
  /**
   * Information about the container where this finding occurred, if available.
   */
  container?: GooglePrivacyDlpV2Container;
  /**
   * List of nested objects pointing to the precise location of the finding
   * within the file or record.
   */
  contentLocations?: GooglePrivacyDlpV2ContentLocation[];
}

function serializeGooglePrivacyDlpV2Location(data: any): GooglePrivacyDlpV2Location {
  return {
    ...data,
    byteRange: data["byteRange"] !== undefined ? serializeGooglePrivacyDlpV2Range(data["byteRange"]) : undefined,
    codepointRange: data["codepointRange"] !== undefined ? serializeGooglePrivacyDlpV2Range(data["codepointRange"]) : undefined,
    container: data["container"] !== undefined ? serializeGooglePrivacyDlpV2Container(data["container"]) : undefined,
    contentLocations: data["contentLocations"] !== undefined ? data["contentLocations"].map((item: any) => (serializeGooglePrivacyDlpV2ContentLocation(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Location(data: any): GooglePrivacyDlpV2Location {
  return {
    ...data,
    byteRange: data["byteRange"] !== undefined ? deserializeGooglePrivacyDlpV2Range(data["byteRange"]) : undefined,
    codepointRange: data["codepointRange"] !== undefined ? deserializeGooglePrivacyDlpV2Range(data["codepointRange"]) : undefined,
    container: data["container"] !== undefined ? deserializeGooglePrivacyDlpV2Container(data["container"]) : undefined,
    contentLocations: data["contentLocations"] !== undefined ? data["contentLocations"].map((item: any) => (deserializeGooglePrivacyDlpV2ContentLocation(item))) : undefined,
  };
}

/**
 * Job trigger option for hybrid jobs. Jobs must be manually created and
 * finished.
 */
export interface GooglePrivacyDlpV2Manual {
}

/**
 * Metadata Location
 */
export interface GooglePrivacyDlpV2MetadataLocation {
  /**
   * Storage metadata.
   */
  storageLabel?: GooglePrivacyDlpV2StorageMetadataLabel;
  /**
   * Type of metadata containing the finding.
   */
  type?:  | "METADATATYPE_UNSPECIFIED" | "STORAGE_METADATA";
}

/**
 * Compute numerical stats over an individual column, including min, max, and
 * quantiles.
 */
export interface GooglePrivacyDlpV2NumericalStatsConfig {
  /**
   * Field to compute numerical stats on. Supported types are integer, float,
   * date, datetime, timestamp, time.
   */
  field?: GooglePrivacyDlpV2FieldId;
}

/**
 * Result of the numerical stats computation.
 */
export interface GooglePrivacyDlpV2NumericalStatsResult {
  /**
   * Maximum value appearing in the column.
   */
  maxValue?: GooglePrivacyDlpV2Value;
  /**
   * Minimum value appearing in the column.
   */
  minValue?: GooglePrivacyDlpV2Value;
  /**
   * List of 99 values that partition the set of field values into 100 equal
   * sized buckets.
   */
  quantileValues?: GooglePrivacyDlpV2Value[];
}

function serializeGooglePrivacyDlpV2NumericalStatsResult(data: any): GooglePrivacyDlpV2NumericalStatsResult {
  return {
    ...data,
    maxValue: data["maxValue"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["minValue"]) : undefined,
    quantileValues: data["quantileValues"] !== undefined ? data["quantileValues"].map((item: any) => (serializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2NumericalStatsResult(data: any): GooglePrivacyDlpV2NumericalStatsResult {
  return {
    ...data,
    maxValue: data["maxValue"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["minValue"]) : undefined,
    quantileValues: data["quantileValues"] !== undefined ? data["quantileValues"].map((item: any) => (deserializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

/**
 * Infotype details for other infoTypes found within a column.
 */
export interface GooglePrivacyDlpV2OtherInfoTypeSummary {
  /**
   * Approximate percentage of non-null rows that contained data detected by
   * this infotype.
   */
  estimatedPrevalence?: number;
  /**
   * The other infoType.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
}

/**
 * Cloud repository for storing output.
 */
export interface GooglePrivacyDlpV2OutputStorageConfig {
  /**
   * Schema used for writing the findings for Inspect jobs. This field is only
   * used for Inspect and must be unspecified for Risk jobs. Columns are derived
   * from the `Finding` object. If appending to an existing table, any columns
   * from the predefined schema that are missing will be added. No columns in
   * the existing table will be deleted. If unspecified, then all available
   * columns will be used for a new table or an (existing) table with no schema,
   * and no changes will be made to an existing table that has a schema. Only
   * for use with external storage.
   */
  outputSchema?:  | "OUTPUT_SCHEMA_UNSPECIFIED" | "BASIC_COLUMNS" | "GCS_COLUMNS" | "DATASTORE_COLUMNS" | "BIG_QUERY_COLUMNS" | "ALL_COLUMNS";
  /**
   * Store findings in an existing table or a new table in an existing dataset.
   * If table_id is not set a new one will be generated for you with the
   * following format: dlp_googleapis_yyyy_mm_dd_[dlp_job_id]. Pacific time zone
   * will be used for generating the date details. For Inspect, each column in
   * an existing output table must have the same name, type, and mode of a field
   * in the `Finding` object. For Risk, an existing output table should be the
   * output of a previous Risk analysis job run on the same source table, with
   * the same privacy metric and quasi-identifiers. Risk jobs that analyze the
   * same table but compute a different privacy metric, or use different sets of
   * quasi-identifiers, cannot store their results in the same table.
   */
  table?: GooglePrivacyDlpV2BigQueryTable;
}

/**
 * Datastore partition ID. A partition ID identifies a grouping of entities.
 * The grouping is always by project and namespace, however the namespace ID may
 * be empty. A partition ID contains several dimensions: project ID and
 * namespace ID.
 */
export interface GooglePrivacyDlpV2PartitionId {
  /**
   * If not empty, the ID of the namespace to which the entities belong.
   */
  namespaceId?: string;
  /**
   * The ID of the project to which the entities belong.
   */
  projectId?: string;
}

/**
 * A (kind, ID/name) pair used to construct a key path. If either name or ID is
 * set, the element is complete. If neither is set, the element is incomplete.
 */
export interface GooglePrivacyDlpV2PathElement {
  /**
   * The auto-allocated ID of the entity. Never equal to zero. Values less than
   * zero are discouraged and may not be supported in the future.
   */
  id?: bigint;
  /**
   * The kind of the entity. A kind matching regex `__.*__` is
   * reserved/read-only. A kind must not contain more than 1500 bytes when UTF-8
   * encoded. Cannot be `""`.
   */
  kind?: string;
  /**
   * The name of the entity. A name matching regex `__.*__` is
   * reserved/read-only. A name must not be more than 1500 bytes when UTF-8
   * encoded. Cannot be `""`.
   */
  name?: string;
}

function serializeGooglePrivacyDlpV2PathElement(data: any): GooglePrivacyDlpV2PathElement {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2PathElement(data: any): GooglePrivacyDlpV2PathElement {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * A rule for transforming a value.
 */
export interface GooglePrivacyDlpV2PrimitiveTransformation {
  /**
   * Bucketing
   */
  bucketingConfig?: GooglePrivacyDlpV2BucketingConfig;
  /**
   * Mask
   */
  characterMaskConfig?: GooglePrivacyDlpV2CharacterMaskConfig;
  /**
   * Deterministic Crypto
   */
  cryptoDeterministicConfig?: GooglePrivacyDlpV2CryptoDeterministicConfig;
  /**
   * Crypto
   */
  cryptoHashConfig?: GooglePrivacyDlpV2CryptoHashConfig;
  /**
   * Ffx-Fpe
   */
  cryptoReplaceFfxFpeConfig?: GooglePrivacyDlpV2CryptoReplaceFfxFpeConfig;
  /**
   * Date Shift
   */
  dateShiftConfig?: GooglePrivacyDlpV2DateShiftConfig;
  /**
   * Fixed size bucketing
   */
  fixedSizeBucketingConfig?: GooglePrivacyDlpV2FixedSizeBucketingConfig;
  /**
   * Redact
   */
  redactConfig?: GooglePrivacyDlpV2RedactConfig;
  /**
   * Replace with a specified value.
   */
  replaceConfig?: GooglePrivacyDlpV2ReplaceValueConfig;
  /**
   * Replace with a value randomly drawn (with replacement) from a dictionary.
   */
  replaceDictionaryConfig?: GooglePrivacyDlpV2ReplaceDictionaryConfig;
  /**
   * Replace with infotype
   */
  replaceWithInfoTypeConfig?: GooglePrivacyDlpV2ReplaceWithInfoTypeConfig;
  /**
   * Time extraction
   */
  timePartConfig?: GooglePrivacyDlpV2TimePartConfig;
}

function serializeGooglePrivacyDlpV2PrimitiveTransformation(data: any): GooglePrivacyDlpV2PrimitiveTransformation {
  return {
    ...data,
    bucketingConfig: data["bucketingConfig"] !== undefined ? serializeGooglePrivacyDlpV2BucketingConfig(data["bucketingConfig"]) : undefined,
    cryptoDeterministicConfig: data["cryptoDeterministicConfig"] !== undefined ? serializeGooglePrivacyDlpV2CryptoDeterministicConfig(data["cryptoDeterministicConfig"]) : undefined,
    cryptoHashConfig: data["cryptoHashConfig"] !== undefined ? serializeGooglePrivacyDlpV2CryptoHashConfig(data["cryptoHashConfig"]) : undefined,
    cryptoReplaceFfxFpeConfig: data["cryptoReplaceFfxFpeConfig"] !== undefined ? serializeGooglePrivacyDlpV2CryptoReplaceFfxFpeConfig(data["cryptoReplaceFfxFpeConfig"]) : undefined,
    dateShiftConfig: data["dateShiftConfig"] !== undefined ? serializeGooglePrivacyDlpV2DateShiftConfig(data["dateShiftConfig"]) : undefined,
    fixedSizeBucketingConfig: data["fixedSizeBucketingConfig"] !== undefined ? serializeGooglePrivacyDlpV2FixedSizeBucketingConfig(data["fixedSizeBucketingConfig"]) : undefined,
    replaceConfig: data["replaceConfig"] !== undefined ? serializeGooglePrivacyDlpV2ReplaceValueConfig(data["replaceConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2PrimitiveTransformation(data: any): GooglePrivacyDlpV2PrimitiveTransformation {
  return {
    ...data,
    bucketingConfig: data["bucketingConfig"] !== undefined ? deserializeGooglePrivacyDlpV2BucketingConfig(data["bucketingConfig"]) : undefined,
    cryptoDeterministicConfig: data["cryptoDeterministicConfig"] !== undefined ? deserializeGooglePrivacyDlpV2CryptoDeterministicConfig(data["cryptoDeterministicConfig"]) : undefined,
    cryptoHashConfig: data["cryptoHashConfig"] !== undefined ? deserializeGooglePrivacyDlpV2CryptoHashConfig(data["cryptoHashConfig"]) : undefined,
    cryptoReplaceFfxFpeConfig: data["cryptoReplaceFfxFpeConfig"] !== undefined ? deserializeGooglePrivacyDlpV2CryptoReplaceFfxFpeConfig(data["cryptoReplaceFfxFpeConfig"]) : undefined,
    dateShiftConfig: data["dateShiftConfig"] !== undefined ? deserializeGooglePrivacyDlpV2DateShiftConfig(data["dateShiftConfig"]) : undefined,
    fixedSizeBucketingConfig: data["fixedSizeBucketingConfig"] !== undefined ? deserializeGooglePrivacyDlpV2FixedSizeBucketingConfig(data["fixedSizeBucketingConfig"]) : undefined,
    replaceConfig: data["replaceConfig"] !== undefined ? deserializeGooglePrivacyDlpV2ReplaceValueConfig(data["replaceConfig"]) : undefined,
  };
}

/**
 * Privacy metric to compute for reidentification risk analysis.
 */
export interface GooglePrivacyDlpV2PrivacyMetric {
  /**
   * Categorical stats
   */
  categoricalStatsConfig?: GooglePrivacyDlpV2CategoricalStatsConfig;
  /**
   * delta-presence
   */
  deltaPresenceEstimationConfig?: GooglePrivacyDlpV2DeltaPresenceEstimationConfig;
  /**
   * K-anonymity
   */
  kAnonymityConfig?: GooglePrivacyDlpV2KAnonymityConfig;
  /**
   * k-map
   */
  kMapEstimationConfig?: GooglePrivacyDlpV2KMapEstimationConfig;
  /**
   * l-diversity
   */
  lDiversityConfig?: GooglePrivacyDlpV2LDiversityConfig;
  /**
   * Numerical stats
   */
  numericalStatsConfig?: GooglePrivacyDlpV2NumericalStatsConfig;
}

export interface GooglePrivacyDlpV2ProfileStatus {
  /**
   * Profiling status code and optional message
   */
  status?: GoogleRpcStatus;
  /**
   * Time when the profile generation status was updated
   */
  timestamp?: Date;
}

function serializeGooglePrivacyDlpV2ProfileStatus(data: any): GooglePrivacyDlpV2ProfileStatus {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ProfileStatus(data: any): GooglePrivacyDlpV2ProfileStatus {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Message for specifying a window around a finding to apply a detection rule.
 */
export interface GooglePrivacyDlpV2Proximity {
  /**
   * Number of characters after the finding to consider.
   */
  windowAfter?: number;
  /**
   * Number of characters before the finding to consider. For tabular data, if
   * you want to modify the likelihood of an entire column of findngs, set this
   * to 1. For more information, see [Hotword example: Set the match likelihood
   * of a table column]
   * (https://cloud.google.com/dlp/docs/creating-custom-infotypes-likelihood#match-column-values).
   */
  windowBefore?: number;
}

/**
 * Publish findings of a DlpJob to Data Catalog. In Data Catalog, tag templates
 * are applied to the resource that Cloud DLP scanned. Data Catalog tag
 * templates are stored in the same project and region where the BigQuery table
 * exists. For Cloud DLP to create and apply the tag template, the Cloud DLP
 * service agent must have the `roles/datacatalog.tagTemplateOwner` permission
 * on the project. The tag template contains fields summarizing the results of
 * the DlpJob. Any field values previously written by another DlpJob are
 * deleted. InfoType naming patterns are strictly enforced when using this
 * feature. Findings are persisted in Data Catalog storage and are governed by
 * service-specific policies for Data Catalog. For more information, see
 * [Service Specific Terms](https://cloud.google.com/terms/service-terms). Only
 * a single instance of this action can be specified. This action is allowed
 * only if all resources being scanned are BigQuery tables. Compatible with:
 * Inspect
 */
export interface GooglePrivacyDlpV2PublishFindingsToCloudDataCatalog {
}

/**
 * Publish the result summary of a DlpJob to [Security Command
 * Center](https://cloud.google.com/security-command-center). This action is
 * available for only projects that belong to an organization. This action
 * publishes the count of finding instances and their infoTypes. The summary of
 * findings are persisted in Security Command Center and are governed by
 * [service-specific policies for Security Command
 * Center](https://cloud.google.com/terms/service-terms). Only a single instance
 * of this action can be specified. Compatible with: Inspect
 */
export interface GooglePrivacyDlpV2PublishSummaryToCscc {
}

/**
 * Publish a message into a given Pub/Sub topic when DlpJob has completed. The
 * message contains a single field, `DlpJobName`, which is equal to the finished
 * job's
 * [`DlpJob.name`](https://cloud.google.com/dlp/docs/reference/rest/v2/projects.dlpJobs#DlpJob).
 * Compatible with: Inspect, Risk
 */
export interface GooglePrivacyDlpV2PublishToPubSub {
  /**
   * Cloud Pub/Sub topic to send notifications to. The topic must have given
   * publishing access rights to the DLP API service account executing the long
   * running DlpJob sending the notifications. Format is
   * projects/{project}/topics/{topic}.
   */
  topic?: string;
}

/**
 * Enable Stackdriver metric dlp.googleapis.com/finding_count. This will
 * publish a metric to stack driver on each infotype requested and how many
 * findings were found for it. CustomDetectors will be bucketed as 'Custom'
 * under the Stackdriver label 'info_type'.
 */
export interface GooglePrivacyDlpV2PublishToStackdriver {
}

/**
 * A condition consisting of a value.
 */
export interface GooglePrivacyDlpV2PubSubCondition {
  /**
   * The minimum data risk score that triggers the condition.
   */
  minimumRiskScore?:  | "PROFILE_SCORE_BUCKET_UNSPECIFIED" | "HIGH" | "MEDIUM_OR_HIGH";
  /**
   * The minimum sensitivity level that triggers the condition.
   */
  minimumSensitivityScore?:  | "PROFILE_SCORE_BUCKET_UNSPECIFIED" | "HIGH" | "MEDIUM_OR_HIGH";
}

/**
 * An expression, consisting of an operator and conditions.
 */
export interface GooglePrivacyDlpV2PubSubExpressions {
  /**
   * Conditions to apply to the expression.
   */
  conditions?: GooglePrivacyDlpV2PubSubCondition[];
  /**
   * The operator to apply to the collection of conditions.
   */
  logicalOperator?:  | "LOGICAL_OPERATOR_UNSPECIFIED" | "OR" | "AND";
}

/**
 * Send a Pub/Sub message into the given Pub/Sub topic to connect other systems
 * to data profile generation. The message payload data will be the byte
 * serialization of `DataProfilePubSubMessage`.
 */
export interface GooglePrivacyDlpV2PubSubNotification {
  /**
   * How much data to include in the Pub/Sub message. If the user wishes to
   * limit the size of the message, they can use resource_name and fetch the
   * profile fields they wish to. Per table profile (not per column).
   */
  detailOfMessage?:  | "DETAIL_LEVEL_UNSPECIFIED" | "TABLE_PROFILE" | "RESOURCE_NAME";
  /**
   * The type of event that triggers a Pub/Sub. At most one
   * `PubSubNotification` per EventType is permitted.
   */
  event?:  | "EVENT_TYPE_UNSPECIFIED" | "NEW_PROFILE" | "CHANGED_PROFILE" | "SCORE_INCREASED" | "ERROR_CHANGED";
  /**
   * Conditions (e.g., data risk or sensitivity level) for triggering a
   * Pub/Sub.
   */
  pubsubCondition?: GooglePrivacyDlpV2DataProfilePubSubCondition;
  /**
   * Cloud Pub/Sub topic to send notifications to. Format is
   * projects/{project}/topics/{topic}.
   */
  topic?: string;
}

/**
 * A column with a semantic tag attached.
 */
export interface GooglePrivacyDlpV2QuasiId {
  /**
   * A column can be tagged with a custom tag. In this case, the user must
   * indicate an auxiliary table that contains statistical information on the
   * possible values of this column (below).
   */
  customTag?: string;
  /**
   * Required. Identifies the column.
   */
  field?: GooglePrivacyDlpV2FieldId;
  /**
   * If no semantic tag is indicated, we infer the statistical model from the
   * distribution of values in the input data
   */
  inferred?: GoogleProtobufEmpty;
  /**
   * A column can be tagged with a InfoType to use the relevant public dataset
   * as a statistical model of population, if available. We currently support US
   * ZIP codes, region codes, ages and genders. To programmatically obtain the
   * list of supported InfoTypes, use ListInfoTypes with the
   * supported_by=RISK_ANALYSIS filter.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
}

/**
 * A quasi-identifier column has a custom_tag, used to know which column in the
 * data corresponds to which column in the statistical model.
 */
export interface GooglePrivacyDlpV2QuasiIdentifierField {
  /**
   * A column can be tagged with a custom tag. In this case, the user must
   * indicate an auxiliary table that contains statistical information on the
   * possible values of this column (below).
   */
  customTag?: string;
  /**
   * Identifies the column.
   */
  field?: GooglePrivacyDlpV2FieldId;
}

/**
 * A quasi-identifier column has a custom_tag, used to know which column in the
 * data corresponds to which column in the statistical model.
 */
export interface GooglePrivacyDlpV2QuasiIdField {
  /**
   * A auxiliary field.
   */
  customTag?: string;
  /**
   * Identifies the column.
   */
  field?: GooglePrivacyDlpV2FieldId;
}

/**
 * Message for infoType-dependent details parsed from quote.
 */
export interface GooglePrivacyDlpV2QuoteInfo {
  /**
   * The date time indicated by the quote.
   */
  dateTime?: GooglePrivacyDlpV2DateTime;
}

/**
 * Generic half-open interval [start, end)
 */
export interface GooglePrivacyDlpV2Range {
  /**
   * Index of the last character of the range (exclusive).
   */
  end?: bigint;
  /**
   * Index of the first character of the range (inclusive).
   */
  start?: bigint;
}

function serializeGooglePrivacyDlpV2Range(data: any): GooglePrivacyDlpV2Range {
  return {
    ...data,
    end: data["end"] !== undefined ? String(data["end"]) : undefined,
    start: data["start"] !== undefined ? String(data["start"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Range(data: any): GooglePrivacyDlpV2Range {
  return {
    ...data,
    end: data["end"] !== undefined ? BigInt(data["end"]) : undefined,
    start: data["start"] !== undefined ? BigInt(data["start"]) : undefined,
  };
}

/**
 * A condition for determining whether a transformation should be applied to a
 * field.
 */
export interface GooglePrivacyDlpV2RecordCondition {
  /**
   * An expression.
   */
  expressions?: GooglePrivacyDlpV2Expressions;
}

function serializeGooglePrivacyDlpV2RecordCondition(data: any): GooglePrivacyDlpV2RecordCondition {
  return {
    ...data,
    expressions: data["expressions"] !== undefined ? serializeGooglePrivacyDlpV2Expressions(data["expressions"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RecordCondition(data: any): GooglePrivacyDlpV2RecordCondition {
  return {
    ...data,
    expressions: data["expressions"] !== undefined ? deserializeGooglePrivacyDlpV2Expressions(data["expressions"]) : undefined,
  };
}

/**
 * Message for a unique key indicating a record that contains a finding.
 */
export interface GooglePrivacyDlpV2RecordKey {
  bigQueryKey?: GooglePrivacyDlpV2BigQueryKey;
  datastoreKey?: GooglePrivacyDlpV2DatastoreKey;
  /**
   * Values of identifying columns in the given row. Order of values matches
   * the order of `identifying_fields` specified in the scanning request.
   */
  idValues?: string[];
}

function serializeGooglePrivacyDlpV2RecordKey(data: any): GooglePrivacyDlpV2RecordKey {
  return {
    ...data,
    bigQueryKey: data["bigQueryKey"] !== undefined ? serializeGooglePrivacyDlpV2BigQueryKey(data["bigQueryKey"]) : undefined,
    datastoreKey: data["datastoreKey"] !== undefined ? serializeGooglePrivacyDlpV2DatastoreKey(data["datastoreKey"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RecordKey(data: any): GooglePrivacyDlpV2RecordKey {
  return {
    ...data,
    bigQueryKey: data["bigQueryKey"] !== undefined ? deserializeGooglePrivacyDlpV2BigQueryKey(data["bigQueryKey"]) : undefined,
    datastoreKey: data["datastoreKey"] !== undefined ? deserializeGooglePrivacyDlpV2DatastoreKey(data["datastoreKey"]) : undefined,
  };
}

/**
 * Location of a finding within a row or record.
 */
export interface GooglePrivacyDlpV2RecordLocation {
  /**
   * Field id of the field containing the finding.
   */
  fieldId?: GooglePrivacyDlpV2FieldId;
  /**
   * Key of the finding.
   */
  recordKey?: GooglePrivacyDlpV2RecordKey;
  /**
   * Location within a `ContentItem.Table`.
   */
  tableLocation?: GooglePrivacyDlpV2TableLocation;
}

function serializeGooglePrivacyDlpV2RecordLocation(data: any): GooglePrivacyDlpV2RecordLocation {
  return {
    ...data,
    recordKey: data["recordKey"] !== undefined ? serializeGooglePrivacyDlpV2RecordKey(data["recordKey"]) : undefined,
    tableLocation: data["tableLocation"] !== undefined ? serializeGooglePrivacyDlpV2TableLocation(data["tableLocation"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RecordLocation(data: any): GooglePrivacyDlpV2RecordLocation {
  return {
    ...data,
    recordKey: data["recordKey"] !== undefined ? deserializeGooglePrivacyDlpV2RecordKey(data["recordKey"]) : undefined,
    tableLocation: data["tableLocation"] !== undefined ? deserializeGooglePrivacyDlpV2TableLocation(data["tableLocation"]) : undefined,
  };
}

/**
 * Configuration to suppress records whose suppression conditions evaluate to
 * true.
 */
export interface GooglePrivacyDlpV2RecordSuppression {
  /**
   * A condition that when it evaluates to true will result in the record being
   * evaluated to be suppressed from the transformed content.
   */
  condition?: GooglePrivacyDlpV2RecordCondition;
}

function serializeGooglePrivacyDlpV2RecordSuppression(data: any): GooglePrivacyDlpV2RecordSuppression {
  return {
    ...data,
    condition: data["condition"] !== undefined ? serializeGooglePrivacyDlpV2RecordCondition(data["condition"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RecordSuppression(data: any): GooglePrivacyDlpV2RecordSuppression {
  return {
    ...data,
    condition: data["condition"] !== undefined ? deserializeGooglePrivacyDlpV2RecordCondition(data["condition"]) : undefined,
  };
}

export interface GooglePrivacyDlpV2RecordTransformation {
  /**
   * Findings container modification timestamp, if applicable.
   */
  containerTimestamp?: Date;
  /**
   * Container version, if available ("generation" for Cloud Storage).
   */
  containerVersion?: string;
  /**
   * For record transformations, provide a field.
   */
  fieldId?: GooglePrivacyDlpV2FieldId;
}

function serializeGooglePrivacyDlpV2RecordTransformation(data: any): GooglePrivacyDlpV2RecordTransformation {
  return {
    ...data,
    containerTimestamp: data["containerTimestamp"] !== undefined ? data["containerTimestamp"].toISOString() : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RecordTransformation(data: any): GooglePrivacyDlpV2RecordTransformation {
  return {
    ...data,
    containerTimestamp: data["containerTimestamp"] !== undefined ? new Date(data["containerTimestamp"]) : undefined,
  };
}

/**
 * A type of transformation that is applied over structured data such as a
 * table.
 */
export interface GooglePrivacyDlpV2RecordTransformations {
  /**
   * Transform the record by applying various field transformations.
   */
  fieldTransformations?: GooglePrivacyDlpV2FieldTransformation[];
  /**
   * Configuration defining which records get suppressed entirely. Records that
   * match any suppression rule are omitted from the output.
   */
  recordSuppressions?: GooglePrivacyDlpV2RecordSuppression[];
}

function serializeGooglePrivacyDlpV2RecordTransformations(data: any): GooglePrivacyDlpV2RecordTransformations {
  return {
    ...data,
    fieldTransformations: data["fieldTransformations"] !== undefined ? data["fieldTransformations"].map((item: any) => (serializeGooglePrivacyDlpV2FieldTransformation(item))) : undefined,
    recordSuppressions: data["recordSuppressions"] !== undefined ? data["recordSuppressions"].map((item: any) => (serializeGooglePrivacyDlpV2RecordSuppression(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RecordTransformations(data: any): GooglePrivacyDlpV2RecordTransformations {
  return {
    ...data,
    fieldTransformations: data["fieldTransformations"] !== undefined ? data["fieldTransformations"].map((item: any) => (deserializeGooglePrivacyDlpV2FieldTransformation(item))) : undefined,
    recordSuppressions: data["recordSuppressions"] !== undefined ? data["recordSuppressions"].map((item: any) => (deserializeGooglePrivacyDlpV2RecordSuppression(item))) : undefined,
  };
}

/**
 * Redact a given value. For example, if used with an `InfoTypeTransformation`
 * transforming PHONE_NUMBER, and input 'My phone number is 206-555-0123', the
 * output would be 'My phone number is '.
 */
export interface GooglePrivacyDlpV2RedactConfig {
}

/**
 * Request to search for potentially sensitive info in an image and redact it
 * by covering it with a colored rectangle.
 */
export interface GooglePrivacyDlpV2RedactImageRequest {
  /**
   * The content must be PNG, JPEG, SVG or BMP.
   */
  byteItem?: GooglePrivacyDlpV2ByteContentItem;
  /**
   * The configuration for specifying what content to redact from images.
   */
  imageRedactionConfigs?: GooglePrivacyDlpV2ImageRedactionConfig[];
  /**
   * Whether the response should include findings along with the redacted
   * image.
   */
  includeFindings?: boolean;
  /**
   * Configuration for the inspector.
   */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
}

function serializeGooglePrivacyDlpV2RedactImageRequest(data: any): GooglePrivacyDlpV2RedactImageRequest {
  return {
    ...data,
    byteItem: data["byteItem"] !== undefined ? serializeGooglePrivacyDlpV2ByteContentItem(data["byteItem"]) : undefined,
    inspectConfig: data["inspectConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RedactImageRequest(data: any): GooglePrivacyDlpV2RedactImageRequest {
  return {
    ...data,
    byteItem: data["byteItem"] !== undefined ? deserializeGooglePrivacyDlpV2ByteContentItem(data["byteItem"]) : undefined,
    inspectConfig: data["inspectConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
  };
}

/**
 * Results of redacting an image.
 */
export interface GooglePrivacyDlpV2RedactImageResponse {
  /**
   * If an image was being inspected and the InspectConfig's include_quote was
   * set to true, then this field will include all text, if any, that was found
   * in the image.
   */
  extractedText?: string;
  /**
   * The findings. Populated when include_findings in the request is true.
   */
  inspectResult?: GooglePrivacyDlpV2InspectResult;
  /**
   * The redacted image. The type will be the same as the original image.
   */
  redactedImage?: Uint8Array;
}

function serializeGooglePrivacyDlpV2RedactImageResponse(data: any): GooglePrivacyDlpV2RedactImageResponse {
  return {
    ...data,
    inspectResult: data["inspectResult"] !== undefined ? serializeGooglePrivacyDlpV2InspectResult(data["inspectResult"]) : undefined,
    redactedImage: data["redactedImage"] !== undefined ? encodeBase64(data["redactedImage"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RedactImageResponse(data: any): GooglePrivacyDlpV2RedactImageResponse {
  return {
    ...data,
    inspectResult: data["inspectResult"] !== undefined ? deserializeGooglePrivacyDlpV2InspectResult(data["inspectResult"]) : undefined,
    redactedImage: data["redactedImage"] !== undefined ? decodeBase64(data["redactedImage"] as string) : undefined,
  };
}

/**
 * Message defining a custom regular expression.
 */
export interface GooglePrivacyDlpV2Regex {
  /**
   * The index of the submatch to extract as findings. When not specified, the
   * entire match is returned. No more than 3 may be included.
   */
  groupIndexes?: number[];
  /**
   * Pattern defining the regular expression. Its syntax
   * (https://github.com/google/re2/wiki/Syntax) can be found under the
   * google/re2 repository on GitHub.
   */
  pattern?: string;
}

/**
 * Request to re-identify an item.
 */
export interface GooglePrivacyDlpV2ReidentifyContentRequest {
  /**
   * Configuration for the inspector.
   */
  inspectConfig?: GooglePrivacyDlpV2InspectConfig;
  /**
   * Template to use. Any configuration directly specified in `inspect_config`
   * will override those set in the template. Singular fields that are set in
   * this request will replace their corresponding fields in the template.
   * Repeated fields are appended. Singular sub-messages and groups are
   * recursively merged.
   */
  inspectTemplateName?: string;
  /**
   * The item to re-identify. Will be treated as text.
   */
  item?: GooglePrivacyDlpV2ContentItem;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Configuration for the re-identification of the content item. This field
   * shares the same proto message type that is used for de-identification,
   * however its usage here is for the reversal of the previous
   * de-identification. Re-identification is performed by examining the
   * transformations used to de-identify the items and executing the reverse.
   * This requires that only reversible transformations be provided here. The
   * reversible transformations are: - `CryptoDeterministicConfig` -
   * `CryptoReplaceFfxFpeConfig`
   */
  reidentifyConfig?: GooglePrivacyDlpV2DeidentifyConfig;
  /**
   * Template to use. References an instance of `DeidentifyTemplate`. Any
   * configuration directly specified in `reidentify_config` or `inspect_config`
   * will override those set in the template. The `DeidentifyTemplate` used must
   * include only reversible transformations. Singular fields that are set in
   * this request will replace their corresponding fields in the template.
   * Repeated fields are appended. Singular sub-messages and groups are
   * recursively merged.
   */
  reidentifyTemplateName?: string;
}

function serializeGooglePrivacyDlpV2ReidentifyContentRequest(data: any): GooglePrivacyDlpV2ReidentifyContentRequest {
  return {
    ...data,
    inspectConfig: data["inspectConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    item: data["item"] !== undefined ? serializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
    reidentifyConfig: data["reidentifyConfig"] !== undefined ? serializeGooglePrivacyDlpV2DeidentifyConfig(data["reidentifyConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ReidentifyContentRequest(data: any): GooglePrivacyDlpV2ReidentifyContentRequest {
  return {
    ...data,
    inspectConfig: data["inspectConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectConfig(data["inspectConfig"]) : undefined,
    item: data["item"] !== undefined ? deserializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
    reidentifyConfig: data["reidentifyConfig"] !== undefined ? deserializeGooglePrivacyDlpV2DeidentifyConfig(data["reidentifyConfig"]) : undefined,
  };
}

/**
 * Results of re-identifying an item.
 */
export interface GooglePrivacyDlpV2ReidentifyContentResponse {
  /**
   * The re-identified item.
   */
  item?: GooglePrivacyDlpV2ContentItem;
  /**
   * An overview of the changes that were made to the `item`.
   */
  overview?: GooglePrivacyDlpV2TransformationOverview;
}

function serializeGooglePrivacyDlpV2ReidentifyContentResponse(data: any): GooglePrivacyDlpV2ReidentifyContentResponse {
  return {
    ...data,
    item: data["item"] !== undefined ? serializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
    overview: data["overview"] !== undefined ? serializeGooglePrivacyDlpV2TransformationOverview(data["overview"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ReidentifyContentResponse(data: any): GooglePrivacyDlpV2ReidentifyContentResponse {
  return {
    ...data,
    item: data["item"] !== undefined ? deserializeGooglePrivacyDlpV2ContentItem(data["item"]) : undefined,
    overview: data["overview"] !== undefined ? deserializeGooglePrivacyDlpV2TransformationOverview(data["overview"]) : undefined,
  };
}

/**
 * Replace each input value with a value randomly selected from the dictionary.
 */
export interface GooglePrivacyDlpV2ReplaceDictionaryConfig {
  /**
   * A list of words to select from for random replacement. The
   * [limits](https://cloud.google.com/dlp/limits) page contains details about
   * the size limits of dictionaries.
   */
  wordList?: GooglePrivacyDlpV2WordList;
}

/**
 * Replace each input value with a given `Value`.
 */
export interface GooglePrivacyDlpV2ReplaceValueConfig {
  /**
   * Value to replace it with.
   */
  newValue?: GooglePrivacyDlpV2Value;
}

function serializeGooglePrivacyDlpV2ReplaceValueConfig(data: any): GooglePrivacyDlpV2ReplaceValueConfig {
  return {
    ...data,
    newValue: data["newValue"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["newValue"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ReplaceValueConfig(data: any): GooglePrivacyDlpV2ReplaceValueConfig {
  return {
    ...data,
    newValue: data["newValue"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["newValue"]) : undefined,
  };
}

/**
 * Replace each matching finding with the name of the info_type.
 */
export interface GooglePrivacyDlpV2ReplaceWithInfoTypeConfig {
}

/**
 * Snapshot of the inspection configuration.
 */
export interface GooglePrivacyDlpV2RequestedOptions {
  /**
   * Inspect config.
   */
  jobConfig?: GooglePrivacyDlpV2InspectJobConfig;
  /**
   * If run with an InspectTemplate, a snapshot of its state at the time of
   * this run.
   */
  snapshotInspectTemplate?: GooglePrivacyDlpV2InspectTemplate;
}

function serializeGooglePrivacyDlpV2RequestedOptions(data: any): GooglePrivacyDlpV2RequestedOptions {
  return {
    ...data,
    jobConfig: data["jobConfig"] !== undefined ? serializeGooglePrivacyDlpV2InspectJobConfig(data["jobConfig"]) : undefined,
    snapshotInspectTemplate: data["snapshotInspectTemplate"] !== undefined ? serializeGooglePrivacyDlpV2InspectTemplate(data["snapshotInspectTemplate"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2RequestedOptions(data: any): GooglePrivacyDlpV2RequestedOptions {
  return {
    ...data,
    jobConfig: data["jobConfig"] !== undefined ? deserializeGooglePrivacyDlpV2InspectJobConfig(data["jobConfig"]) : undefined,
    snapshotInspectTemplate: data["snapshotInspectTemplate"] !== undefined ? deserializeGooglePrivacyDlpV2InspectTemplate(data["snapshotInspectTemplate"]) : undefined,
  };
}

/**
 * Risk analysis options.
 */
export interface GooglePrivacyDlpV2RequestedRiskAnalysisOptions {
  /**
   * The job config for the risk job.
   */
  jobConfig?: GooglePrivacyDlpV2RiskAnalysisJobConfig;
}

/**
 * All result fields mentioned below are updated while the job is processing.
 */
export interface GooglePrivacyDlpV2Result {
  /**
   * Statistics related to the processing of hybrid inspect.
   */
  hybridStats?: GooglePrivacyDlpV2HybridInspectStatistics;
  /**
   * Statistics of how many instances of each info type were found during
   * inspect job.
   */
  infoTypeStats?: GooglePrivacyDlpV2InfoTypeStats[];
  /**
   * Total size in bytes that were processed.
   */
  processedBytes?: bigint;
  /**
   * Estimate of the number of bytes to process.
   */
  totalEstimatedBytes?: bigint;
}

function serializeGooglePrivacyDlpV2Result(data: any): GooglePrivacyDlpV2Result {
  return {
    ...data,
    hybridStats: data["hybridStats"] !== undefined ? serializeGooglePrivacyDlpV2HybridInspectStatistics(data["hybridStats"]) : undefined,
    infoTypeStats: data["infoTypeStats"] !== undefined ? data["infoTypeStats"].map((item: any) => (serializeGooglePrivacyDlpV2InfoTypeStats(item))) : undefined,
    processedBytes: data["processedBytes"] !== undefined ? String(data["processedBytes"]) : undefined,
    totalEstimatedBytes: data["totalEstimatedBytes"] !== undefined ? String(data["totalEstimatedBytes"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Result(data: any): GooglePrivacyDlpV2Result {
  return {
    ...data,
    hybridStats: data["hybridStats"] !== undefined ? deserializeGooglePrivacyDlpV2HybridInspectStatistics(data["hybridStats"]) : undefined,
    infoTypeStats: data["infoTypeStats"] !== undefined ? data["infoTypeStats"].map((item: any) => (deserializeGooglePrivacyDlpV2InfoTypeStats(item))) : undefined,
    processedBytes: data["processedBytes"] !== undefined ? BigInt(data["processedBytes"]) : undefined,
    totalEstimatedBytes: data["totalEstimatedBytes"] !== undefined ? BigInt(data["totalEstimatedBytes"]) : undefined,
  };
}

/**
 * Configuration for a risk analysis job. See
 * https://cloud.google.com/dlp/docs/concepts-risk-analysis to learn more.
 */
export interface GooglePrivacyDlpV2RiskAnalysisJobConfig {
  /**
   * Actions to execute at the completion of the job. Are executed in the order
   * provided.
   */
  actions?: GooglePrivacyDlpV2Action[];
  /**
   * Privacy metric to compute.
   */
  privacyMetric?: GooglePrivacyDlpV2PrivacyMetric;
  /**
   * Input dataset to compute metrics over.
   */
  sourceTable?: GooglePrivacyDlpV2BigQueryTable;
}

/**
 * Values of the row.
 */
export interface GooglePrivacyDlpV2Row {
  /**
   * Individual cells.
   */
  values?: GooglePrivacyDlpV2Value[];
}

function serializeGooglePrivacyDlpV2Row(data: any): GooglePrivacyDlpV2Row {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Row(data: any): GooglePrivacyDlpV2Row {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeGooglePrivacyDlpV2Value(item))) : undefined,
  };
}

/**
 * If set, the detailed findings will be persisted to the specified
 * OutputStorageConfig. Only a single instance of this action can be specified.
 * Compatible with: Inspect, Risk
 */
export interface GooglePrivacyDlpV2SaveFindings {
  /**
   * Location to store findings outside of DLP.
   */
  outputConfig?: GooglePrivacyDlpV2OutputStorageConfig;
}

/**
 * Schedule for inspect job triggers.
 */
export interface GooglePrivacyDlpV2Schedule {
  /**
   * With this option a job is started on a regular periodic basis. For
   * example: every day (86400 seconds). A scheduled start time will be skipped
   * if the previous execution has not ended when its scheduled time occurs.
   * This value must be set to a time duration greater than or equal to 1 day
   * and can be no longer than 60 days.
   */
  recurrencePeriodDuration?: number /* Duration */;
}

function serializeGooglePrivacyDlpV2Schedule(data: any): GooglePrivacyDlpV2Schedule {
  return {
    ...data,
    recurrencePeriodDuration: data["recurrencePeriodDuration"] !== undefined ? data["recurrencePeriodDuration"] : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Schedule(data: any): GooglePrivacyDlpV2Schedule {
  return {
    ...data,
    recurrencePeriodDuration: data["recurrencePeriodDuration"] !== undefined ? data["recurrencePeriodDuration"] : undefined,
  };
}

/**
 * Apply transformation to the selected info_types.
 */
export interface GooglePrivacyDlpV2SelectedInfoTypes {
  /**
   * Required. InfoTypes to apply the transformation to. Required. Provided
   * InfoType must be unique within the ImageTransformations message.
   */
  infoTypes?: GooglePrivacyDlpV2InfoType[];
}

/**
 * Score is a summary of all elements in the data profile. A higher number
 * means more sensitive.
 */
export interface GooglePrivacyDlpV2SensitivityScore {
  /**
   * The score applied to the resource.
   */
  score?:  | "SENSITIVITY_SCORE_UNSPECIFIED" | "SENSITIVITY_LOW" | "SENSITIVITY_MODERATE" | "SENSITIVITY_HIGH";
}

/**
 * An auxiliary table containing statistical information on the relative
 * frequency of different quasi-identifiers values. It has one or several
 * quasi-identifiers columns, and one column that indicates the relative
 * frequency of each quasi-identifier tuple. If a tuple is present in the data
 * but not in the auxiliary table, the corresponding relative frequency is
 * assumed to be zero (and thus, the tuple is highly reidentifiable).
 */
export interface GooglePrivacyDlpV2StatisticalTable {
  /**
   * Required. Quasi-identifier columns.
   */
  quasiIds?: GooglePrivacyDlpV2QuasiIdentifierField[];
  /**
   * Required. The relative frequency column must contain a floating-point
   * number between 0 and 1 (inclusive). Null values are assumed to be zero.
   */
  relativeFrequency?: GooglePrivacyDlpV2FieldId;
  /**
   * Required. Auxiliary table location.
   */
  table?: GooglePrivacyDlpV2BigQueryTable;
}

/**
 * Shared message indicating Cloud storage type.
 */
export interface GooglePrivacyDlpV2StorageConfig {
  /**
   * BigQuery options.
   */
  bigQueryOptions?: GooglePrivacyDlpV2BigQueryOptions;
  /**
   * Cloud Storage options.
   */
  cloudStorageOptions?: GooglePrivacyDlpV2CloudStorageOptions;
  /**
   * Google Cloud Datastore options.
   */
  datastoreOptions?: GooglePrivacyDlpV2DatastoreOptions;
  /**
   * Hybrid inspection options.
   */
  hybridOptions?: GooglePrivacyDlpV2HybridOptions;
  timespanConfig?: GooglePrivacyDlpV2TimespanConfig;
}

function serializeGooglePrivacyDlpV2StorageConfig(data: any): GooglePrivacyDlpV2StorageConfig {
  return {
    ...data,
    bigQueryOptions: data["bigQueryOptions"] !== undefined ? serializeGooglePrivacyDlpV2BigQueryOptions(data["bigQueryOptions"]) : undefined,
    cloudStorageOptions: data["cloudStorageOptions"] !== undefined ? serializeGooglePrivacyDlpV2CloudStorageOptions(data["cloudStorageOptions"]) : undefined,
    timespanConfig: data["timespanConfig"] !== undefined ? serializeGooglePrivacyDlpV2TimespanConfig(data["timespanConfig"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2StorageConfig(data: any): GooglePrivacyDlpV2StorageConfig {
  return {
    ...data,
    bigQueryOptions: data["bigQueryOptions"] !== undefined ? deserializeGooglePrivacyDlpV2BigQueryOptions(data["bigQueryOptions"]) : undefined,
    cloudStorageOptions: data["cloudStorageOptions"] !== undefined ? deserializeGooglePrivacyDlpV2CloudStorageOptions(data["cloudStorageOptions"]) : undefined,
    timespanConfig: data["timespanConfig"] !== undefined ? deserializeGooglePrivacyDlpV2TimespanConfig(data["timespanConfig"]) : undefined,
  };
}

/**
 * Storage metadata label to indicate which metadata entry contains findings.
 */
export interface GooglePrivacyDlpV2StorageMetadataLabel {
  key?: string;
}

/**
 * StoredInfoType resource message that contains information about the current
 * version and any pending updates.
 */
export interface GooglePrivacyDlpV2StoredInfoType {
  /**
   * Current version of the stored info type.
   */
  currentVersion?: GooglePrivacyDlpV2StoredInfoTypeVersion;
  /**
   * Resource name.
   */
  name?: string;
  /**
   * Pending versions of the stored info type. Empty if no versions are
   * pending.
   */
  pendingVersions?: GooglePrivacyDlpV2StoredInfoTypeVersion[];
}

function serializeGooglePrivacyDlpV2StoredInfoType(data: any): GooglePrivacyDlpV2StoredInfoType {
  return {
    ...data,
    currentVersion: data["currentVersion"] !== undefined ? serializeGooglePrivacyDlpV2StoredInfoTypeVersion(data["currentVersion"]) : undefined,
    pendingVersions: data["pendingVersions"] !== undefined ? data["pendingVersions"].map((item: any) => (serializeGooglePrivacyDlpV2StoredInfoTypeVersion(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2StoredInfoType(data: any): GooglePrivacyDlpV2StoredInfoType {
  return {
    ...data,
    currentVersion: data["currentVersion"] !== undefined ? deserializeGooglePrivacyDlpV2StoredInfoTypeVersion(data["currentVersion"]) : undefined,
    pendingVersions: data["pendingVersions"] !== undefined ? data["pendingVersions"].map((item: any) => (deserializeGooglePrivacyDlpV2StoredInfoTypeVersion(item))) : undefined,
  };
}

/**
 * Configuration for stored infoTypes. All fields and subfield are provided by
 * the user. For more information, see
 * https://cloud.google.com/dlp/docs/creating-custom-infotypes.
 */
export interface GooglePrivacyDlpV2StoredInfoTypeConfig {
  /**
   * Description of the StoredInfoType (max 256 characters).
   */
  description?: string;
  /**
   * Store dictionary-based CustomInfoType.
   */
  dictionary?: GooglePrivacyDlpV2Dictionary;
  /**
   * Display name of the StoredInfoType (max 256 characters).
   */
  displayName?: string;
  /**
   * StoredInfoType where findings are defined by a dictionary of phrases.
   */
  largeCustomDictionary?: GooglePrivacyDlpV2LargeCustomDictionaryConfig;
  /**
   * Store regular expression-based StoredInfoType.
   */
  regex?: GooglePrivacyDlpV2Regex;
}

/**
 * Statistics for a StoredInfoType.
 */
export interface GooglePrivacyDlpV2StoredInfoTypeStats {
  /**
   * StoredInfoType where findings are defined by a dictionary of phrases.
   */
  largeCustomDictionary?: GooglePrivacyDlpV2LargeCustomDictionaryStats;
}

function serializeGooglePrivacyDlpV2StoredInfoTypeStats(data: any): GooglePrivacyDlpV2StoredInfoTypeStats {
  return {
    ...data,
    largeCustomDictionary: data["largeCustomDictionary"] !== undefined ? serializeGooglePrivacyDlpV2LargeCustomDictionaryStats(data["largeCustomDictionary"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2StoredInfoTypeStats(data: any): GooglePrivacyDlpV2StoredInfoTypeStats {
  return {
    ...data,
    largeCustomDictionary: data["largeCustomDictionary"] !== undefined ? deserializeGooglePrivacyDlpV2LargeCustomDictionaryStats(data["largeCustomDictionary"]) : undefined,
  };
}

/**
 * Version of a StoredInfoType, including the configuration used to build it,
 * create timestamp, and current state.
 */
export interface GooglePrivacyDlpV2StoredInfoTypeVersion {
  /**
   * StoredInfoType configuration.
   */
  config?: GooglePrivacyDlpV2StoredInfoTypeConfig;
  /**
   * Create timestamp of the version. Read-only, determined by the system when
   * the version is created.
   */
  createTime?: Date;
  /**
   * Errors that occurred when creating this storedInfoType version, or
   * anomalies detected in the storedInfoType data that render it unusable. Only
   * the five most recent errors will be displayed, with the most recent error
   * appearing first. For example, some of the data for stored custom
   * dictionaries is put in the user's Cloud Storage bucket, and if this data is
   * modified or deleted by the user or another system, the dictionary becomes
   * invalid. If any errors occur, fix the problem indicated by the error
   * message and use the UpdateStoredInfoType API method to create another
   * version of the storedInfoType to continue using it, reusing the same
   * `config` if it was not the source of the error.
   */
  errors?: GooglePrivacyDlpV2Error[];
  /**
   * Stored info type version state. Read-only, updated by the system during
   * dictionary creation.
   */
  state?:  | "STORED_INFO_TYPE_STATE_UNSPECIFIED" | "PENDING" | "READY" | "FAILED" | "INVALID";
  /**
   * Statistics about this storedInfoType version.
   */
  stats?: GooglePrivacyDlpV2StoredInfoTypeStats;
}

function serializeGooglePrivacyDlpV2StoredInfoTypeVersion(data: any): GooglePrivacyDlpV2StoredInfoTypeVersion {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGooglePrivacyDlpV2Error(item))) : undefined,
    stats: data["stats"] !== undefined ? serializeGooglePrivacyDlpV2StoredInfoTypeStats(data["stats"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2StoredInfoTypeVersion(data: any): GooglePrivacyDlpV2StoredInfoTypeVersion {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGooglePrivacyDlpV2Error(item))) : undefined,
    stats: data["stats"] !== undefined ? deserializeGooglePrivacyDlpV2StoredInfoTypeStats(data["stats"]) : undefined,
  };
}

/**
 * A reference to a StoredInfoType to use with scanning.
 */
export interface GooglePrivacyDlpV2StoredType {
  /**
   * Timestamp indicating when the version of the `StoredInfoType` used for
   * inspection was created. Output-only field, populated by the system.
   */
  createTime?: Date;
  /**
   * Resource name of the requested `StoredInfoType`, for example
   * `organizations/433245324/storedInfoTypes/432452342` or
   * `projects/project-id/storedInfoTypes/432452342`.
   */
  name?: string;
}

function serializeGooglePrivacyDlpV2StoredType(data: any): GooglePrivacyDlpV2StoredType {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGooglePrivacyDlpV2StoredType(data: any): GooglePrivacyDlpV2StoredType {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * A collection that informs the user the number of times a particular
 * `TransformationResultCode` and error details occurred.
 */
export interface GooglePrivacyDlpV2SummaryResult {
  /**
   * Outcome of the transformation.
   */
  code?:  | "TRANSFORMATION_RESULT_CODE_UNSPECIFIED" | "SUCCESS" | "ERROR";
  /**
   * Number of transformations counted by this result.
   */
  count?: bigint;
  /**
   * A place for warnings or errors to show up if a transformation didn't work
   * as expected.
   */
  details?: string;
}

function serializeGooglePrivacyDlpV2SummaryResult(data: any): GooglePrivacyDlpV2SummaryResult {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2SummaryResult(data: any): GooglePrivacyDlpV2SummaryResult {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Message for detecting output from deidentification transformations such as
 * [`CryptoReplaceFfxFpeConfig`](https://cloud.google.com/dlp/docs/reference/rest/v2/organizations.deidentifyTemplates#cryptoreplaceffxfpeconfig).
 * These types of transformations are those that perform pseudonymization,
 * thereby producing a "surrogate" as output. This should be used in conjunction
 * with a field on the transformation such as `surrogate_info_type`. This
 * CustomInfoType does not support the use of `detection_rules`.
 */
export interface GooglePrivacyDlpV2SurrogateType {
}

/**
 * Structured content to inspect. Up to 50,000 `Value`s per request allowed.
 * See
 * https://cloud.google.com/dlp/docs/inspecting-structured-text#inspecting_a_table
 * to learn more.
 */
export interface GooglePrivacyDlpV2Table {
  /**
   * Headers of the table.
   */
  headers?: GooglePrivacyDlpV2FieldId[];
  /**
   * Rows of the table.
   */
  rows?: GooglePrivacyDlpV2Row[];
}

function serializeGooglePrivacyDlpV2Table(data: any): GooglePrivacyDlpV2Table {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (serializeGooglePrivacyDlpV2Row(item))) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Table(data: any): GooglePrivacyDlpV2Table {
  return {
    ...data,
    rows: data["rows"] !== undefined ? data["rows"].map((item: any) => (deserializeGooglePrivacyDlpV2Row(item))) : undefined,
  };
}

/**
 * The profile for a scanned table.
 */
export interface GooglePrivacyDlpV2TableDataProfile {
  /**
   * The snapshot of the configurations used to generate the profile.
   */
  configSnapshot?: GooglePrivacyDlpV2DataProfileConfigSnapshot;
  /**
   * The time at which the table was created.
   */
  createTime?: Date;
  /**
   * The data risk level of this table.
   */
  dataRiskLevel?: GooglePrivacyDlpV2DataRiskLevel;
  /**
   * The BigQuery dataset ID.
   */
  datasetId?: string;
  /**
   * The BigQuery location where the dataset's data is stored. See
   * https://cloud.google.com/bigquery/docs/locations for supported locations.
   */
  datasetLocation?: string;
  /**
   * The GCP project ID that owns the BigQuery dataset.
   */
  datasetProjectId?: string;
  /**
   * How the table is encrypted.
   */
  encryptionStatus?:  | "ENCRYPTION_STATUS_UNSPECIFIED" | "ENCRYPTION_GOOGLE_MANAGED" | "ENCRYPTION_CUSTOMER_MANAGED";
  /**
   * Optional. The time when this table expires.
   */
  expirationTime?: Date;
  /**
   * The number of columns skipped in the table because of an error.
   */
  failedColumnCount?: bigint;
  /**
   * The resource name of the table.
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   */
  fullResource?: string;
  /**
   * The time when this table was last modified
   */
  lastModifiedTime?: Date;
  /**
   * The name of the profile.
   */
  name?: string;
  /**
   * Other infoTypes found in this table's data.
   */
  otherInfoTypes?: GooglePrivacyDlpV2OtherInfoTypeSummary[];
  /**
   * The infoTypes predicted from this table's data.
   */
  predictedInfoTypes?: GooglePrivacyDlpV2InfoTypeSummary[];
  /**
   * The last time the profile was generated.
   */
  profileLastGenerated?: Date;
  /**
   * Success or error status from the most recent profile generation attempt.
   * May be empty if the profile is still being generated.
   */
  profileStatus?: GooglePrivacyDlpV2ProfileStatus;
  /**
   * The resource name to the project data profile for this table.
   */
  projectDataProfile?: string;
  /**
   * The labels applied to the resource at the time the profile was generated.
   */
  resourceLabels?: {
    [key: string]: string
  };
  /**
   * How broadly a resource has been shared.
   */
  resourceVisibility?:  | "RESOURCE_VISIBILITY_UNSPECIFIED" | "RESOURCE_VISIBILITY_PUBLIC" | "RESOURCE_VISIBILITY_RESTRICTED";
  /**
   * Number of rows in the table when the profile was generated. This will not
   * be populated for BigLake tables.
   */
  rowCount?: bigint;
  /**
   * The number of columns profiled in the table.
   */
  scannedColumnCount?: bigint;
  /**
   * The sensitivity score of this table.
   */
  sensitivityScore?: GooglePrivacyDlpV2SensitivityScore;
  /**
   * State of a profile.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "DONE";
  /**
   * The BigQuery table ID.
   */
  tableId?: string;
  /**
   * The size of the table when the profile was generated.
   */
  tableSizeBytes?: bigint;
}

function serializeGooglePrivacyDlpV2TableDataProfile(data: any): GooglePrivacyDlpV2TableDataProfile {
  return {
    ...data,
    configSnapshot: data["configSnapshot"] !== undefined ? serializeGooglePrivacyDlpV2DataProfileConfigSnapshot(data["configSnapshot"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
    failedColumnCount: data["failedColumnCount"] !== undefined ? String(data["failedColumnCount"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? data["lastModifiedTime"].toISOString() : undefined,
    profileLastGenerated: data["profileLastGenerated"] !== undefined ? data["profileLastGenerated"].toISOString() : undefined,
    profileStatus: data["profileStatus"] !== undefined ? serializeGooglePrivacyDlpV2ProfileStatus(data["profileStatus"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
    scannedColumnCount: data["scannedColumnCount"] !== undefined ? String(data["scannedColumnCount"]) : undefined,
    tableSizeBytes: data["tableSizeBytes"] !== undefined ? String(data["tableSizeBytes"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2TableDataProfile(data: any): GooglePrivacyDlpV2TableDataProfile {
  return {
    ...data,
    configSnapshot: data["configSnapshot"] !== undefined ? deserializeGooglePrivacyDlpV2DataProfileConfigSnapshot(data["configSnapshot"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
    failedColumnCount: data["failedColumnCount"] !== undefined ? BigInt(data["failedColumnCount"]) : undefined,
    lastModifiedTime: data["lastModifiedTime"] !== undefined ? new Date(data["lastModifiedTime"]) : undefined,
    profileLastGenerated: data["profileLastGenerated"] !== undefined ? new Date(data["profileLastGenerated"]) : undefined,
    profileStatus: data["profileStatus"] !== undefined ? deserializeGooglePrivacyDlpV2ProfileStatus(data["profileStatus"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
    scannedColumnCount: data["scannedColumnCount"] !== undefined ? BigInt(data["scannedColumnCount"]) : undefined,
    tableSizeBytes: data["tableSizeBytes"] !== undefined ? BigInt(data["tableSizeBytes"]) : undefined,
  };
}

/**
 * Location of a finding within a table.
 */
export interface GooglePrivacyDlpV2TableLocation {
  /**
   * The zero-based index of the row where the finding is located. Only
   * populated for resources that have a natural ordering, not BigQuery. In
   * BigQuery, to identify the row a finding came from, populate
   * BigQueryOptions.identifying_fields with your primary key column names and
   * when you store the findings the value of those columns will be stored
   * inside of Finding.
   */
  rowIndex?: bigint;
}

function serializeGooglePrivacyDlpV2TableLocation(data: any): GooglePrivacyDlpV2TableLocation {
  return {
    ...data,
    rowIndex: data["rowIndex"] !== undefined ? String(data["rowIndex"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2TableLocation(data: any): GooglePrivacyDlpV2TableLocation {
  return {
    ...data,
    rowIndex: data["rowIndex"] !== undefined ? BigInt(data["rowIndex"]) : undefined,
  };
}

/**
 * Instructions regarding the table content being inspected.
 */
export interface GooglePrivacyDlpV2TableOptions {
  /**
   * The columns that are the primary keys for table objects included in
   * ContentItem. A copy of this cell's value will stored alongside alongside
   * each finding so that the finding can be traced to the specific row it came
   * from. No more than 3 may be provided.
   */
  identifyingFields?: GooglePrivacyDlpV2FieldId[];
}

/**
 * A column with a semantic tag attached.
 */
export interface GooglePrivacyDlpV2TaggedField {
  /**
   * A column can be tagged with a custom tag. In this case, the user must
   * indicate an auxiliary table that contains statistical information on the
   * possible values of this column (below).
   */
  customTag?: string;
  /**
   * Required. Identifies the column.
   */
  field?: GooglePrivacyDlpV2FieldId;
  /**
   * If no semantic tag is indicated, we infer the statistical model from the
   * distribution of values in the input data
   */
  inferred?: GoogleProtobufEmpty;
  /**
   * A column can be tagged with a InfoType to use the relevant public dataset
   * as a statistical model of population, if available. We currently support US
   * ZIP codes, region codes, ages and genders. To programmatically obtain the
   * list of supported InfoTypes, use ListInfoTypes with the
   * supported_by=RISK_ANALYSIS filter.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
}

/**
 * Throw an error and fail the request when a transformation error occurs.
 */
export interface GooglePrivacyDlpV2ThrowError {
}

/**
 * For use with `Date`, `Timestamp`, and `TimeOfDay`, extract or preserve a
 * portion of the value.
 */
export interface GooglePrivacyDlpV2TimePartConfig {
  /**
   * The part of the time to keep.
   */
  partToExtract?:  | "TIME_PART_UNSPECIFIED" | "YEAR" | "MONTH" | "DAY_OF_MONTH" | "DAY_OF_WEEK" | "WEEK_OF_YEAR" | "HOUR_OF_DAY";
}

/**
 * Configuration of the timespan of the items to include in scanning. Currently
 * only supported when inspecting Cloud Storage and BigQuery.
 */
export interface GooglePrivacyDlpV2TimespanConfig {
  /**
   * When the job is started by a JobTrigger we will automatically figure out a
   * valid start_time to avoid scanning files that have not been modified since
   * the last time the JobTrigger executed. This will be based on the time of
   * the execution of the last run of the JobTrigger or the timespan end_time
   * used in the last run of the JobTrigger.
   */
  enableAutoPopulationOfTimespanConfig?: boolean;
  /**
   * Exclude files, tables, or rows newer than this value. If not set, no upper
   * time limit is applied.
   */
  endTime?: Date;
  /**
   * Exclude files, tables, or rows older than this value. If not set, no lower
   * time limit is applied.
   */
  startTime?: Date;
  /**
   * Specification of the field containing the timestamp of scanned items. Used
   * for data sources like Datastore and BigQuery. *For BigQuery* If this value
   * is not specified and the table was modified between the given start and end
   * times, the entire table will be scanned. If this value is specified, then
   * rows are filtered based on the given start and end times. Rows with a
   * `NULL` value in the provided BigQuery column are skipped. Valid data types
   * of the provided BigQuery column are: `INTEGER`, `DATE`, `TIMESTAMP`, and
   * `DATETIME`. If your BigQuery table is [partitioned at ingestion
   * time](https://cloud.google.com/bigquery/docs/partitioned-tables#ingestion_time),
   * you can use any of the following pseudo-columns as your timestamp field.
   * When used with Cloud DLP, these pseudo-column names are case sensitive. -
   * _PARTITIONTIME - _PARTITIONDATE - _PARTITION_LOAD_TIME *For Datastore* If
   * this value is specified, then entities are filtered based on the given
   * start and end times. If an entity does not contain the provided timestamp
   * property or contains empty or invalid values, then it is included. Valid
   * data types of the provided timestamp property are: `TIMESTAMP`. See the
   * [known issue](https://cloud.google.com/dlp/docs/known-issues#bq-timespan)
   * related to this operation.
   */
  timestampField?: GooglePrivacyDlpV2FieldId;
}

function serializeGooglePrivacyDlpV2TimespanConfig(data: any): GooglePrivacyDlpV2TimespanConfig {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGooglePrivacyDlpV2TimespanConfig(data: any): GooglePrivacyDlpV2TimespanConfig {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Time zone of the date time object.
 */
export interface GooglePrivacyDlpV2TimeZone {
  /**
   * Set only if the offset can be determined. Positive for time ahead of UTC.
   * E.g. For "UTC-9", this value is -540.
   */
  offsetMinutes?: number;
}

/**
 * User specified templates and configs for how to deidentify structured,
 * unstructures, and image files. User must provide either a unstructured
 * deidentify template or at least one redact image config.
 */
export interface GooglePrivacyDlpV2TransformationConfig {
  /**
   * De-identify template. If this template is specified, it will serve as the
   * default de-identify template. This template cannot contain
   * `record_transformations` since it can be used for unstructured content such
   * as free-form text files. If this template is not set, a default
   * `ReplaceWithInfoTypeConfig` will be used to de-identify unstructured
   * content.
   */
  deidentifyTemplate?: string;
  /**
   * Image redact template. If this template is specified, it will serve as the
   * de-identify template for images. If this template is not set, all findings
   * in the image will be redacted with a black box.
   */
  imageRedactTemplate?: string;
  /**
   * Structured de-identify template. If this template is specified, it will
   * serve as the de-identify template for structured content such as delimited
   * files and tables. If this template is not set but the `deidentify_template`
   * is set, then `deidentify_template` will also apply to the structured
   * content. If neither template is set, a default `ReplaceWithInfoTypeConfig`
   * will be used to de-identify structured content.
   */
  structuredDeidentifyTemplate?: string;
}

/**
 * A flattened description of a `PrimitiveTransformation` or
 * `RecordSuppression`.
 */
export interface GooglePrivacyDlpV2TransformationDescription {
  /**
   * A human-readable string representation of the `RecordCondition`
   * corresponding to this transformation. Set if a `RecordCondition` was used
   * to determine whether or not to apply this transformation. Examples: *
   * (age_field > 85) * (age_field <= 18) * (zip_field exists) * (zip_field ==
   * 01234) && (city_field != "Springville") * (zip_field == 01234) &&
   * (age_field <= 18) && (city_field exists)
   */
  condition?: string;
  /**
   * A description of the transformation. This is empty for a
   * RECORD_SUPPRESSION, or is the output of calling toString() on the
   * `PrimitiveTransformation` protocol buffer message for any other type of
   * transformation.
   */
  description?: string;
  /**
   * Set if the transformation was limited to a specific `InfoType`.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
  /**
   * The transformation type.
   */
  type?:  | "TRANSFORMATION_TYPE_UNSPECIFIED" | "RECORD_SUPPRESSION" | "REPLACE_VALUE" | "REPLACE_DICTIONARY" | "REDACT" | "CHARACTER_MASK" | "CRYPTO_REPLACE_FFX_FPE" | "FIXED_SIZE_BUCKETING" | "BUCKETING" | "REPLACE_WITH_INFO_TYPE" | "TIME_PART" | "CRYPTO_HASH" | "DATE_SHIFT" | "CRYPTO_DETERMINISTIC_CONFIG" | "REDACT_IMAGE";
}

/**
 * Details about a single transformation. This object contains a description of
 * the transformation, information about whether the transformation was
 * successfully applied, and the precise location where the transformation
 * occurred. These details are stored in a user-specified BigQuery table.
 */
export interface GooglePrivacyDlpV2TransformationDetails {
  /**
   * The top level name of the container where the transformation is located
   * (this will be the source file name or table name).
   */
  containerName?: string;
  /**
   * The name of the job that completed the transformation.
   */
  resourceName?: string;
  /**
   * Status of the transformation, if transformation was not successful, this
   * will specify what caused it to fail, otherwise it will show that the
   * transformation was successful.
   */
  statusDetails?: GooglePrivacyDlpV2TransformationResultStatus;
  /**
   * Description of transformation. This would only contain more than one
   * element if there were multiple matching transformations and which one to
   * apply was ambiguous. Not set for states that contain no transformation,
   * currently only state that contains no transformation is
   * TransformationResultStateType.METADATA_UNRETRIEVABLE.
   */
  transformation?: GooglePrivacyDlpV2TransformationDescription[];
  /**
   * The precise location of the transformed content in the original container.
   */
  transformationLocation?: GooglePrivacyDlpV2TransformationLocation;
  /**
   * The number of bytes that were transformed. If transformation was
   * unsuccessful or did not take place because there was no content to
   * transform, this will be zero.
   */
  transformedBytes?: bigint;
}

function serializeGooglePrivacyDlpV2TransformationDetails(data: any): GooglePrivacyDlpV2TransformationDetails {
  return {
    ...data,
    transformationLocation: data["transformationLocation"] !== undefined ? serializeGooglePrivacyDlpV2TransformationLocation(data["transformationLocation"]) : undefined,
    transformedBytes: data["transformedBytes"] !== undefined ? String(data["transformedBytes"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2TransformationDetails(data: any): GooglePrivacyDlpV2TransformationDetails {
  return {
    ...data,
    transformationLocation: data["transformationLocation"] !== undefined ? deserializeGooglePrivacyDlpV2TransformationLocation(data["transformationLocation"]) : undefined,
    transformedBytes: data["transformedBytes"] !== undefined ? BigInt(data["transformedBytes"]) : undefined,
  };
}

/**
 * Config for storing transformation details.
 */
export interface GooglePrivacyDlpV2TransformationDetailsStorageConfig {
  /**
   * The BigQuery table in which to store the output. This may be an existing
   * table or in a new table in an existing dataset. If table_id is not set a
   * new one will be generated for you with the following format:
   * dlp_googleapis_transformation_details_yyyy_mm_dd_[dlp_job_id]. Pacific time
   * zone will be used for generating the date details.
   */
  table?: GooglePrivacyDlpV2BigQueryTable;
}

/**
 * How to handle transformation errors during de-identification. A
 * transformation error occurs when the requested transformation is incompatible
 * with the data. For example, trying to de-identify an IP address using a
 * `DateShift` transformation would result in a transformation error, since date
 * info cannot be extracted from an IP address. Information about any
 * incompatible transformations, and how they were handled, is returned in the
 * response as part of the `TransformationOverviews`.
 */
export interface GooglePrivacyDlpV2TransformationErrorHandling {
  /**
   * Ignore errors
   */
  leaveUntransformed?: GooglePrivacyDlpV2LeaveUntransformed;
  /**
   * Throw an error
   */
  throwError?: GooglePrivacyDlpV2ThrowError;
}

/**
 * Specifies the location of a transformation.
 */
export interface GooglePrivacyDlpV2TransformationLocation {
  /**
   * Information about the functionality of the container where this finding
   * occurred, if available.
   */
  containerType?:  | "TRANSFORM_UNKNOWN_CONTAINER" | "TRANSFORM_BODY" | "TRANSFORM_METADATA" | "TRANSFORM_TABLE";
  /**
   * For infotype transformations, link to the corresponding findings ID so
   * that location information does not need to be duplicated. Each findings ID
   * correlates to an entry in the findings output table, this table only gets
   * created when users specify to save findings (add the save findings action
   * to the request).
   */
  findingId?: string;
  /**
   * For record transformations, provide a field and container information.
   */
  recordTransformation?: GooglePrivacyDlpV2RecordTransformation;
}

function serializeGooglePrivacyDlpV2TransformationLocation(data: any): GooglePrivacyDlpV2TransformationLocation {
  return {
    ...data,
    recordTransformation: data["recordTransformation"] !== undefined ? serializeGooglePrivacyDlpV2RecordTransformation(data["recordTransformation"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2TransformationLocation(data: any): GooglePrivacyDlpV2TransformationLocation {
  return {
    ...data,
    recordTransformation: data["recordTransformation"] !== undefined ? deserializeGooglePrivacyDlpV2RecordTransformation(data["recordTransformation"]) : undefined,
  };
}

/**
 * Overview of the modifications that occurred.
 */
export interface GooglePrivacyDlpV2TransformationOverview {
  /**
   * Transformations applied to the dataset.
   */
  transformationSummaries?: GooglePrivacyDlpV2TransformationSummary[];
  /**
   * Total size in bytes that were transformed in some way.
   */
  transformedBytes?: bigint;
}

function serializeGooglePrivacyDlpV2TransformationOverview(data: any): GooglePrivacyDlpV2TransformationOverview {
  return {
    ...data,
    transformationSummaries: data["transformationSummaries"] !== undefined ? data["transformationSummaries"].map((item: any) => (serializeGooglePrivacyDlpV2TransformationSummary(item))) : undefined,
    transformedBytes: data["transformedBytes"] !== undefined ? String(data["transformedBytes"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2TransformationOverview(data: any): GooglePrivacyDlpV2TransformationOverview {
  return {
    ...data,
    transformationSummaries: data["transformationSummaries"] !== undefined ? data["transformationSummaries"].map((item: any) => (deserializeGooglePrivacyDlpV2TransformationSummary(item))) : undefined,
    transformedBytes: data["transformedBytes"] !== undefined ? BigInt(data["transformedBytes"]) : undefined,
  };
}

export interface GooglePrivacyDlpV2TransformationResultStatus {
  /**
   * Detailed error codes and messages
   */
  details?: GoogleRpcStatus;
  /**
   * Transformation result status type, this will be either SUCCESS, or it will
   * be the reason for why the transformation was not completely successful.
   */
  resultStatusType?:  | "STATE_TYPE_UNSPECIFIED" | "INVALID_TRANSFORM" | "BIGQUERY_MAX_ROW_SIZE_EXCEEDED" | "METADATA_UNRETRIEVABLE" | "SUCCESS";
}

/**
 * Summary of a single transformation. Only one of 'transformation',
 * 'field_transformation', or 'record_suppress' will be set.
 */
export interface GooglePrivacyDlpV2TransformationSummary {
  /**
   * Set if the transformation was limited to a specific FieldId.
   */
  field?: GooglePrivacyDlpV2FieldId;
  /**
   * The field transformation that was applied. If multiple field
   * transformations are requested for a single field, this list will contain
   * all of them; otherwise, only one is supplied.
   */
  fieldTransformations?: GooglePrivacyDlpV2FieldTransformation[];
  /**
   * Set if the transformation was limited to a specific InfoType.
   */
  infoType?: GooglePrivacyDlpV2InfoType;
  /**
   * The specific suppression option these stats apply to.
   */
  recordSuppress?: GooglePrivacyDlpV2RecordSuppression;
  /**
   * Collection of all transformations that took place or had an error.
   */
  results?: GooglePrivacyDlpV2SummaryResult[];
  /**
   * The specific transformation these stats apply to.
   */
  transformation?: GooglePrivacyDlpV2PrimitiveTransformation;
  /**
   * Total size in bytes that were transformed in some way.
   */
  transformedBytes?: bigint;
}

function serializeGooglePrivacyDlpV2TransformationSummary(data: any): GooglePrivacyDlpV2TransformationSummary {
  return {
    ...data,
    fieldTransformations: data["fieldTransformations"] !== undefined ? data["fieldTransformations"].map((item: any) => (serializeGooglePrivacyDlpV2FieldTransformation(item))) : undefined,
    recordSuppress: data["recordSuppress"] !== undefined ? serializeGooglePrivacyDlpV2RecordSuppression(data["recordSuppress"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeGooglePrivacyDlpV2SummaryResult(item))) : undefined,
    transformation: data["transformation"] !== undefined ? serializeGooglePrivacyDlpV2PrimitiveTransformation(data["transformation"]) : undefined,
    transformedBytes: data["transformedBytes"] !== undefined ? String(data["transformedBytes"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2TransformationSummary(data: any): GooglePrivacyDlpV2TransformationSummary {
  return {
    ...data,
    fieldTransformations: data["fieldTransformations"] !== undefined ? data["fieldTransformations"].map((item: any) => (deserializeGooglePrivacyDlpV2FieldTransformation(item))) : undefined,
    recordSuppress: data["recordSuppress"] !== undefined ? deserializeGooglePrivacyDlpV2RecordSuppression(data["recordSuppress"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeGooglePrivacyDlpV2SummaryResult(item))) : undefined,
    transformation: data["transformation"] !== undefined ? deserializeGooglePrivacyDlpV2PrimitiveTransformation(data["transformation"]) : undefined,
    transformedBytes: data["transformedBytes"] !== undefined ? BigInt(data["transformedBytes"]) : undefined,
  };
}

/**
 * Use this to have a random data crypto key generated. It will be discarded
 * after the request finishes.
 */
export interface GooglePrivacyDlpV2TransientCryptoKey {
  /**
   * Required. Name of the key. This is an arbitrary string used to
   * differentiate different keys. A unique key is generated per name: two
   * separate `TransientCryptoKey` protos share the same generated key if their
   * names are the same. When the data crypto key is generated, this name is not
   * used in any way (repeating the api call will result in a different key
   * being generated).
   */
  name?: string;
}

/**
 * What event needs to occur for a new job to be started.
 */
export interface GooglePrivacyDlpV2Trigger {
  /**
   * For use with hybrid jobs. Jobs must be manually created and finished.
   */
  manual?: GooglePrivacyDlpV2Manual;
  /**
   * Create a job on a repeating basis based on the elapse of time.
   */
  schedule?: GooglePrivacyDlpV2Schedule;
}

function serializeGooglePrivacyDlpV2Trigger(data: any): GooglePrivacyDlpV2Trigger {
  return {
    ...data,
    schedule: data["schedule"] !== undefined ? serializeGooglePrivacyDlpV2Schedule(data["schedule"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Trigger(data: any): GooglePrivacyDlpV2Trigger {
  return {
    ...data,
    schedule: data["schedule"] !== undefined ? deserializeGooglePrivacyDlpV2Schedule(data["schedule"]) : undefined,
  };
}

/**
 * Using raw keys is prone to security risks due to accidentally leaking the
 * key. Choose another type of key if possible.
 */
export interface GooglePrivacyDlpV2UnwrappedCryptoKey {
  /**
   * Required. A 128/192/256 bit key.
   */
  key?: Uint8Array;
}

function serializeGooglePrivacyDlpV2UnwrappedCryptoKey(data: any): GooglePrivacyDlpV2UnwrappedCryptoKey {
  return {
    ...data,
    key: data["key"] !== undefined ? encodeBase64(data["key"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2UnwrappedCryptoKey(data: any): GooglePrivacyDlpV2UnwrappedCryptoKey {
  return {
    ...data,
    key: data["key"] !== undefined ? decodeBase64(data["key"] as string) : undefined,
  };
}

/**
 * Request message for UpdateDeidentifyTemplate.
 */
export interface GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest {
  /**
   * New DeidentifyTemplate value.
   */
  deidentifyTemplate?: GooglePrivacyDlpV2DeidentifyTemplate;
  /**
   * Mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGooglePrivacyDlpV2UpdateDeidentifyTemplateRequest(data: any): GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest {
  return {
    ...data,
    deidentifyTemplate: data["deidentifyTemplate"] !== undefined ? serializeGooglePrivacyDlpV2DeidentifyTemplate(data["deidentifyTemplate"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGooglePrivacyDlpV2UpdateDeidentifyTemplateRequest(data: any): GooglePrivacyDlpV2UpdateDeidentifyTemplateRequest {
  return {
    ...data,
    deidentifyTemplate: data["deidentifyTemplate"] !== undefined ? deserializeGooglePrivacyDlpV2DeidentifyTemplate(data["deidentifyTemplate"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for UpdateInspectTemplate.
 */
export interface GooglePrivacyDlpV2UpdateInspectTemplateRequest {
  /**
   * New InspectTemplate value.
   */
  inspectTemplate?: GooglePrivacyDlpV2InspectTemplate;
  /**
   * Mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGooglePrivacyDlpV2UpdateInspectTemplateRequest(data: any): GooglePrivacyDlpV2UpdateInspectTemplateRequest {
  return {
    ...data,
    inspectTemplate: data["inspectTemplate"] !== undefined ? serializeGooglePrivacyDlpV2InspectTemplate(data["inspectTemplate"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGooglePrivacyDlpV2UpdateInspectTemplateRequest(data: any): GooglePrivacyDlpV2UpdateInspectTemplateRequest {
  return {
    ...data,
    inspectTemplate: data["inspectTemplate"] !== undefined ? deserializeGooglePrivacyDlpV2InspectTemplate(data["inspectTemplate"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for UpdateJobTrigger.
 */
export interface GooglePrivacyDlpV2UpdateJobTriggerRequest {
  /**
   * New JobTrigger value.
   */
  jobTrigger?: GooglePrivacyDlpV2JobTrigger;
  /**
   * Mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGooglePrivacyDlpV2UpdateJobTriggerRequest(data: any): GooglePrivacyDlpV2UpdateJobTriggerRequest {
  return {
    ...data,
    jobTrigger: data["jobTrigger"] !== undefined ? serializeGooglePrivacyDlpV2JobTrigger(data["jobTrigger"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGooglePrivacyDlpV2UpdateJobTriggerRequest(data: any): GooglePrivacyDlpV2UpdateJobTriggerRequest {
  return {
    ...data,
    jobTrigger: data["jobTrigger"] !== undefined ? deserializeGooglePrivacyDlpV2JobTrigger(data["jobTrigger"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for UpdateStoredInfoType.
 */
export interface GooglePrivacyDlpV2UpdateStoredInfoTypeRequest {
  /**
   * Updated configuration for the storedInfoType. If not provided, a new
   * version of the storedInfoType will be created with the existing
   * configuration.
   */
  config?: GooglePrivacyDlpV2StoredInfoTypeConfig;
  /**
   * Mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGooglePrivacyDlpV2UpdateStoredInfoTypeRequest(data: any): GooglePrivacyDlpV2UpdateStoredInfoTypeRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGooglePrivacyDlpV2UpdateStoredInfoTypeRequest(data: any): GooglePrivacyDlpV2UpdateStoredInfoTypeRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Set of primitive values supported by the system. Note that for the purposes
 * of inspection or transformation, the number of bytes considered to comprise a
 * 'Value' is based on its representation as a UTF-8 encoded string. For
 * example, if 'integer_value' is set to 123456789, the number of bytes would be
 * counted as 9, even though an int64 only holds up to 8 bytes of data.
 */
export interface GooglePrivacyDlpV2Value {
  /**
   * boolean
   */
  booleanValue?: boolean;
  /**
   * date
   */
  dateValue?: GoogleTypeDate;
  /**
   * day of week
   */
  dayOfWeekValue?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * float
   */
  floatValue?: number;
  /**
   * integer
   */
  integerValue?: bigint;
  /**
   * string
   */
  stringValue?: string;
  /**
   * timestamp
   */
  timestampValue?: Date;
  /**
   * time of day
   */
  timeValue?: GoogleTypeTimeOfDay;
}

function serializeGooglePrivacyDlpV2Value(data: any): GooglePrivacyDlpV2Value {
  return {
    ...data,
    integerValue: data["integerValue"] !== undefined ? String(data["integerValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? data["timestampValue"].toISOString() : undefined,
  };
}

function deserializeGooglePrivacyDlpV2Value(data: any): GooglePrivacyDlpV2Value {
  return {
    ...data,
    integerValue: data["integerValue"] !== undefined ? BigInt(data["integerValue"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? new Date(data["timestampValue"]) : undefined,
  };
}

/**
 * A value of a field, including its frequency.
 */
export interface GooglePrivacyDlpV2ValueFrequency {
  /**
   * How many times the value is contained in the field.
   */
  count?: bigint;
  /**
   * A value contained in the field in question.
   */
  value?: GooglePrivacyDlpV2Value;
}

function serializeGooglePrivacyDlpV2ValueFrequency(data: any): GooglePrivacyDlpV2ValueFrequency {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
    value: data["value"] !== undefined ? serializeGooglePrivacyDlpV2Value(data["value"]) : undefined,
  };
}

function deserializeGooglePrivacyDlpV2ValueFrequency(data: any): GooglePrivacyDlpV2ValueFrequency {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
    value: data["value"] !== undefined ? deserializeGooglePrivacyDlpV2Value(data["value"]) : undefined,
  };
}

/**
 * Details about each available version for an infotype.
 */
export interface GooglePrivacyDlpV2VersionDescription {
  /**
   * Description of the version.
   */
  description?: string;
  /**
   * Name of the version
   */
  version?: string;
}

/**
 * Message defining a list of words or phrases to search for in the data.
 */
export interface GooglePrivacyDlpV2WordList {
  /**
   * Words or phrases defining the dictionary. The dictionary must contain at
   * least one phrase and every phrase must contain at least 2 characters that
   * are letters or digits. [required]
   */
  words?: string[];
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
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
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
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface GoogleTypeTimeOfDay {
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
 * Additional options for dlp#infoTypesList.
 */
export interface InfoTypesListOptions {
  /**
   * filter to only return infoTypes supported by certain parts of the API.
   * Defaults to supported_by=INSPECT.
   */
  filter?: string;
  /**
   * BCP-47 language code for localized infoType friendly names. If omitted, or
   * if localized strings are not available, en-US strings will be returned.
   */
  languageCode?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * The parent resource name. The format of this value is as follows:
   * locations/ LOCATION_ID
   */
  parent?: string;
}

/**
 * Additional options for dlp#locationsInfoTypesList.
 */
export interface LocationsInfoTypesListOptions {
  /**
   * filter to only return infoTypes supported by certain parts of the API.
   * Defaults to supported_by=INSPECT.
   */
  filter?: string;
  /**
   * BCP-47 language code for localized infoType friendly names. If omitted, or
   * if localized strings are not available, en-US strings will be returned.
   */
  languageCode?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
}

/**
 * Additional options for dlp#organizationsDeidentifyTemplatesList.
 */
export interface OrganizationsDeidentifyTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListDeidentifyTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#organizationsInspectTemplatesList.
 */
export interface OrganizationsInspectTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListInspectTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#organizationsLocationsDeidentifyTemplatesList.
 */
export interface OrganizationsLocationsDeidentifyTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListDeidentifyTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#organizationsLocationsDlpJobsList.
 */
export interface OrganizationsLocationsDlpJobsListOptions {
  /**
   * Allows filtering. Supported syntax: * Filter expressions are made up of
   * one or more restrictions. * Restrictions can be combined by `AND` or `OR`
   * logical operators. A sequence of restrictions implicitly uses `AND`. * A
   * restriction has the form of `{field} {operator} {value}`. * Supported
   * fields/values for inspect jobs: - `state` -
   * PENDING|RUNNING|CANCELED|FINISHED|FAILED - `inspected_storage` -
   * DATASTORE|CLOUD_STORAGE|BIGQUERY - `trigger_name` - The name of the trigger
   * that created the job. - 'end_time` - Corresponds to the time the job
   * finished. - 'start_time` - Corresponds to the time the job finished. *
   * Supported fields for risk analysis jobs: - `state` -
   * RUNNING|CANCELED|FINISHED|FAILED - 'end_time` - Corresponds to the time the
   * job finished. - 'start_time` - Corresponds to the time the job finished. *
   * The operator must be `=` or `!=`. Examples: * inspected_storage =
   * cloud_storage AND state = done * inspected_storage = cloud_storage OR
   * inspected_storage = bigquery * inspected_storage = cloud_storage AND (state
   * = done OR state = canceled) * end_time > \"2017-12-12T00:00:00+00:00\" The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name asc, end_time
   * asc, create_time desc` Supported fields are: - `create_time`: corresponds
   * to the time the job was created. - `end_time`: corresponds to the time the
   * job ended. - `name`: corresponds to the job's name. - `state`: corresponds
   * to `state`
   */
  orderBy?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
  /**
   * The type of job. Defaults to `DlpJobType.INSPECT`
   */
  type?:  | "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB";
}

/**
 * Additional options for dlp#organizationsLocationsInspectTemplatesList.
 */
export interface OrganizationsLocationsInspectTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListInspectTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#organizationsLocationsJobTriggersList.
 */
export interface OrganizationsLocationsJobTriggersListOptions {
  /**
   * Allows filtering. Supported syntax: * Filter expressions are made up of
   * one or more restrictions. * Restrictions can be combined by `AND` or `OR`
   * logical operators. A sequence of restrictions implicitly uses `AND`. * A
   * restriction has the form of `{field} {operator} {value}`. * Supported
   * fields/values for inspect triggers: - `status` - HEALTHY|PAUSED|CANCELLED -
   * `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - 'last_run_time` -
   * RFC 3339 formatted timestamp, surrounded by quotation marks. Nanoseconds
   * are ignored. - 'error_count' - Number of errors that have occurred while
   * running. * The operator must be `=` or `!=` for status and
   * inspected_storage. Examples: * inspected_storage = cloud_storage AND status
   * = HEALTHY * inspected_storage = cloud_storage OR inspected_storage =
   * bigquery * inspected_storage = cloud_storage AND (state = PAUSED OR state =
   * HEALTHY) * last_run_time > \"2017-12-12T00:00:00+00:00\" The length of this
   * field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of triggeredJob fields to order by, followed by `asc`
   * or `desc` postfix. This list is case-insensitive, default sorting order is
   * ascending, redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the JobTrigger was created. - `update_time`:
   * corresponds to the time the JobTrigger was last updated. - `last_run_time`:
   * corresponds to the last time the JobTrigger ran. - `name`: corresponds to
   * the JobTrigger's name. - `display_name`: corresponds to the JobTrigger's
   * display name. - `status`: corresponds to JobTrigger's status.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by a server.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * ListJobTriggers. `order_by` field must not change for subsequent calls.
   */
  pageToken?: string;
  /**
   * The type of jobs. Will use `DlpJobType.INSPECT` if not set.
   */
  type?:  | "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB";
}

/**
 * Additional options for dlp#organizationsLocationsStoredInfoTypesList.
 */
export interface OrganizationsLocationsStoredInfoTypesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name asc,
   * display_name, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the most recent version of the resource was
   * created. - `state`: corresponds to the state of the resource. - `name`:
   * corresponds to resource name. - `display_name`: corresponds to info type's
   * display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListStoredInfoTypes`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#organizationsStoredInfoTypesList.
 */
export interface OrganizationsStoredInfoTypesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name asc,
   * display_name, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the most recent version of the resource was
   * created. - `state`: corresponds to the state of the resource. - `name`:
   * corresponds to resource name. - `display_name`: corresponds to info type's
   * display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListStoredInfoTypes`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#projectsDeidentifyTemplatesList.
 */
export interface ProjectsDeidentifyTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListDeidentifyTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#projectsDlpJobsList.
 */
export interface ProjectsDlpJobsListOptions {
  /**
   * Allows filtering. Supported syntax: * Filter expressions are made up of
   * one or more restrictions. * Restrictions can be combined by `AND` or `OR`
   * logical operators. A sequence of restrictions implicitly uses `AND`. * A
   * restriction has the form of `{field} {operator} {value}`. * Supported
   * fields/values for inspect jobs: - `state` -
   * PENDING|RUNNING|CANCELED|FINISHED|FAILED - `inspected_storage` -
   * DATASTORE|CLOUD_STORAGE|BIGQUERY - `trigger_name` - The name of the trigger
   * that created the job. - 'end_time` - Corresponds to the time the job
   * finished. - 'start_time` - Corresponds to the time the job finished. *
   * Supported fields for risk analysis jobs: - `state` -
   * RUNNING|CANCELED|FINISHED|FAILED - 'end_time` - Corresponds to the time the
   * job finished. - 'start_time` - Corresponds to the time the job finished. *
   * The operator must be `=` or `!=`. Examples: * inspected_storage =
   * cloud_storage AND state = done * inspected_storage = cloud_storage OR
   * inspected_storage = bigquery * inspected_storage = cloud_storage AND (state
   * = done OR state = canceled) * end_time > \"2017-12-12T00:00:00+00:00\" The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name asc, end_time
   * asc, create_time desc` Supported fields are: - `create_time`: corresponds
   * to the time the job was created. - `end_time`: corresponds to the time the
   * job ended. - `name`: corresponds to the job's name. - `state`: corresponds
   * to `state`
   */
  orderBy?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
  /**
   * The type of job. Defaults to `DlpJobType.INSPECT`
   */
  type?:  | "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB";
}

/**
 * Additional options for dlp#projectsInspectTemplatesList.
 */
export interface ProjectsInspectTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListInspectTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#projectsJobTriggersList.
 */
export interface ProjectsJobTriggersListOptions {
  /**
   * Allows filtering. Supported syntax: * Filter expressions are made up of
   * one or more restrictions. * Restrictions can be combined by `AND` or `OR`
   * logical operators. A sequence of restrictions implicitly uses `AND`. * A
   * restriction has the form of `{field} {operator} {value}`. * Supported
   * fields/values for inspect triggers: - `status` - HEALTHY|PAUSED|CANCELLED -
   * `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - 'last_run_time` -
   * RFC 3339 formatted timestamp, surrounded by quotation marks. Nanoseconds
   * are ignored. - 'error_count' - Number of errors that have occurred while
   * running. * The operator must be `=` or `!=` for status and
   * inspected_storage. Examples: * inspected_storage = cloud_storage AND status
   * = HEALTHY * inspected_storage = cloud_storage OR inspected_storage =
   * bigquery * inspected_storage = cloud_storage AND (state = PAUSED OR state =
   * HEALTHY) * last_run_time > \"2017-12-12T00:00:00+00:00\" The length of this
   * field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of triggeredJob fields to order by, followed by `asc`
   * or `desc` postfix. This list is case-insensitive, default sorting order is
   * ascending, redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the JobTrigger was created. - `update_time`:
   * corresponds to the time the JobTrigger was last updated. - `last_run_time`:
   * corresponds to the last time the JobTrigger ran. - `name`: corresponds to
   * the JobTrigger's name. - `display_name`: corresponds to the JobTrigger's
   * display name. - `status`: corresponds to JobTrigger's status.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by a server.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * ListJobTriggers. `order_by` field must not change for subsequent calls.
   */
  pageToken?: string;
  /**
   * The type of jobs. Will use `DlpJobType.INSPECT` if not set.
   */
  type?:  | "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB";
}

/**
 * Additional options for dlp#projectsLocationsDeidentifyTemplatesList.
 */
export interface ProjectsLocationsDeidentifyTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListDeidentifyTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#projectsLocationsDlpJobsList.
 */
export interface ProjectsLocationsDlpJobsListOptions {
  /**
   * Allows filtering. Supported syntax: * Filter expressions are made up of
   * one or more restrictions. * Restrictions can be combined by `AND` or `OR`
   * logical operators. A sequence of restrictions implicitly uses `AND`. * A
   * restriction has the form of `{field} {operator} {value}`. * Supported
   * fields/values for inspect jobs: - `state` -
   * PENDING|RUNNING|CANCELED|FINISHED|FAILED - `inspected_storage` -
   * DATASTORE|CLOUD_STORAGE|BIGQUERY - `trigger_name` - The name of the trigger
   * that created the job. - 'end_time` - Corresponds to the time the job
   * finished. - 'start_time` - Corresponds to the time the job finished. *
   * Supported fields for risk analysis jobs: - `state` -
   * RUNNING|CANCELED|FINISHED|FAILED - 'end_time` - Corresponds to the time the
   * job finished. - 'start_time` - Corresponds to the time the job finished. *
   * The operator must be `=` or `!=`. Examples: * inspected_storage =
   * cloud_storage AND state = done * inspected_storage = cloud_storage OR
   * inspected_storage = bigquery * inspected_storage = cloud_storage AND (state
   * = done OR state = canceled) * end_time > \"2017-12-12T00:00:00+00:00\" The
   * length of this field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name asc, end_time
   * asc, create_time desc` Supported fields are: - `create_time`: corresponds
   * to the time the job was created. - `end_time`: corresponds to the time the
   * job ended. - `name`: corresponds to the job's name. - `state`: corresponds
   * to `state`
   */
  orderBy?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
  /**
   * The type of job. Defaults to `DlpJobType.INSPECT`
   */
  type?:  | "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB";
}

/**
 * Additional options for dlp#projectsLocationsInspectTemplatesList.
 */
export interface ProjectsLocationsInspectTemplatesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the template was created. - `update_time`:
   * corresponds to the time the template was last updated. - `name`:
   * corresponds to the template's name. - `display_name`: corresponds to the
   * template's display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListInspectTemplates`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#projectsLocationsJobTriggersList.
 */
export interface ProjectsLocationsJobTriggersListOptions {
  /**
   * Allows filtering. Supported syntax: * Filter expressions are made up of
   * one or more restrictions. * Restrictions can be combined by `AND` or `OR`
   * logical operators. A sequence of restrictions implicitly uses `AND`. * A
   * restriction has the form of `{field} {operator} {value}`. * Supported
   * fields/values for inspect triggers: - `status` - HEALTHY|PAUSED|CANCELLED -
   * `inspected_storage` - DATASTORE|CLOUD_STORAGE|BIGQUERY - 'last_run_time` -
   * RFC 3339 formatted timestamp, surrounded by quotation marks. Nanoseconds
   * are ignored. - 'error_count' - Number of errors that have occurred while
   * running. * The operator must be `=` or `!=` for status and
   * inspected_storage. Examples: * inspected_storage = cloud_storage AND status
   * = HEALTHY * inspected_storage = cloud_storage OR inspected_storage =
   * bigquery * inspected_storage = cloud_storage AND (state = PAUSED OR state =
   * HEALTHY) * last_run_time > \"2017-12-12T00:00:00+00:00\" The length of this
   * field should be no more than 500 characters.
   */
  filter?: string;
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of triggeredJob fields to order by, followed by `asc`
   * or `desc` postfix. This list is case-insensitive, default sorting order is
   * ascending, redundant space characters are insignificant. Example: `name
   * asc,update_time, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the JobTrigger was created. - `update_time`:
   * corresponds to the time the JobTrigger was last updated. - `last_run_time`:
   * corresponds to the last time the JobTrigger ran. - `name`: corresponds to
   * the JobTrigger's name. - `display_name`: corresponds to the JobTrigger's
   * display name. - `status`: corresponds to JobTrigger's status.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by a server.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * ListJobTriggers. `order_by` field must not change for subsequent calls.
   */
  pageToken?: string;
  /**
   * The type of jobs. Will use `DlpJobType.INSPECT` if not set.
   */
  type?:  | "DLP_JOB_TYPE_UNSPECIFIED" | "INSPECT_JOB" | "RISK_ANALYSIS_JOB";
}

/**
 * Additional options for dlp#projectsLocationsStoredInfoTypesList.
 */
export interface ProjectsLocationsStoredInfoTypesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name asc,
   * display_name, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the most recent version of the resource was
   * created. - `state`: corresponds to the state of the resource. - `name`:
   * corresponds to resource name. - `display_name`: corresponds to info type's
   * display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListStoredInfoTypes`.
   */
  pageToken?: string;
}

/**
 * Additional options for dlp#projectsStoredInfoTypesList.
 */
export interface ProjectsStoredInfoTypesListOptions {
  /**
   * Deprecated. This field has no effect.
   */
  locationId?: string;
  /**
   * Comma separated list of fields to order by, followed by `asc` or `desc`
   * postfix. This list is case-insensitive, default sorting order is ascending,
   * redundant space characters are insignificant. Example: `name asc,
   * display_name, create_time desc` Supported fields are: - `create_time`:
   * corresponds to the time the most recent version of the resource was
   * created. - `state`: corresponds to the state of the resource. - `name`:
   * corresponds to resource name. - `display_name`: corresponds to info type's
   * display name.
   */
  orderBy?: string;
  /**
   * Size of the page, can be limited by the server. If zero server returns a
   * page of max size 100.
   */
  pageSize?: number;
  /**
   * Page token to continue retrieval. Comes from previous call to
   * `ListStoredInfoTypes`.
   */
  pageToken?: string;
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
