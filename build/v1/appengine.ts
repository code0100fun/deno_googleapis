// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * App Engine Admin API Client for Deno
 * ====================================
 * 
 * Provisions and manages developers' App Engine applications.
 * 
 * Docs: https://cloud.google.com/appengine/docs/admin-api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provisions and manages developers' App Engine applications.
 */
export class AppEngine {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://appengine.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Uploads the specified SSL certificate.
   *
   * @param appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
   */
  async appsAuthorizedCertificatesCreate(appsId: string, req: AuthorizedCertificate): Promise<AuthorizedCertificate> {
    req = serializeAuthorizedCertificate(req);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/authorizedCertificates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAuthorizedCertificate(data);
  }

  /**
   * Deletes the specified SSL certificate.
   *
   * @param appsId Part of `name`. Name of the resource to delete. Example: apps/myapp/authorizedCertificates/12345.
   * @param authorizedCertificatesId Part of `name`. See documentation of `appsId`.
   */
  async appsAuthorizedCertificatesDelete(appsId: string, authorizedCertificatesId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/authorizedCertificates/${ authorizedCertificatesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified SSL certificate.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/authorizedCertificates/12345.
   * @param authorizedCertificatesId Part of `name`. See documentation of `appsId`.
   */
  async appsAuthorizedCertificatesGet(appsId: string, authorizedCertificatesId: string, opts: AppsAuthorizedCertificatesGetOptions = {}): Promise<AuthorizedCertificate> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/authorizedCertificates/${ authorizedCertificatesId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAuthorizedCertificate(data);
  }

  /**
   * Lists all SSL certificates the user is authorized to administer.
   *
   * @param appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
   */
  async appsAuthorizedCertificatesList(appsId: string, opts: AppsAuthorizedCertificatesListOptions = {}): Promise<ListAuthorizedCertificatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/authorizedCertificates`);
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
    return deserializeListAuthorizedCertificatesResponse(data);
  }

  /**
   * Updates the specified SSL certificate. To renew a certificate and maintain
   * its existing domain mappings, update certificate_data with a new
   * certificate. The new certificate must be applicable to the same domains as
   * the original certificate. The certificate display_name may also be updated.
   *
   * @param appsId Part of `name`. Name of the resource to update. Example: apps/myapp/authorizedCertificates/12345.
   * @param authorizedCertificatesId Part of `name`. See documentation of `appsId`.
   */
  async appsAuthorizedCertificatesPatch(appsId: string, authorizedCertificatesId: string, req: AuthorizedCertificate, opts: AppsAuthorizedCertificatesPatchOptions = {}): Promise<AuthorizedCertificate> {
    req = serializeAuthorizedCertificate(req);
    opts = serializeAppsAuthorizedCertificatesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/authorizedCertificates/${ authorizedCertificatesId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAuthorizedCertificate(data);
  }

  /**
   * Lists all domains the user is authorized to administer.
   *
   * @param appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
   */
  async appsAuthorizedDomainsList(appsId: string, opts: AppsAuthorizedDomainsListOptions = {}): Promise<ListAuthorizedDomainsResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/authorizedDomains`);
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
    return data as ListAuthorizedDomainsResponse;
  }

  /**
   * Creates an App Engine application for a Google Cloud Platform project.
   * Required fields: id - The ID of the target Cloud Platform project. location
   * - The region (https://cloud.google.com/appengine/docs/locations) where you
   * want the App Engine application located.For more information about App
   * Engine applications, see Managing Projects, Applications, and Billing
   * (https://cloud.google.com/appengine/docs/standard/python/console/).
   *
   */
  async appsCreate(req: Application): Promise<Operation> {
    req = serializeApplication(req);
    const url = new URL(`${this.#baseUrl}v1/apps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Maps a domain to an application. A user must be authorized to administer a
   * domain in order to map it to an application. For a list of available
   * authorized domains, see AuthorizedDomains.ListAuthorizedDomains.
   *
   * @param appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
   */
  async appsDomainMappingsCreate(appsId: string, req: DomainMapping, opts: AppsDomainMappingsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/domainMappings`);
    if (opts.overrideStrategy !== undefined) {
      url.searchParams.append("overrideStrategy", String(opts.overrideStrategy));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the specified domain mapping. A user must be authorized to
   * administer the associated domain in order to delete a DomainMapping
   * resource.
   *
   * @param appsId Part of `name`. Name of the resource to delete. Example: apps/myapp/domainMappings/example.com.
   * @param domainMappingsId Part of `name`. See documentation of `appsId`.
   */
  async appsDomainMappingsDelete(appsId: string, domainMappingsId: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/domainMappings/${ domainMappingsId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the specified domain mapping.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/domainMappings/example.com.
   * @param domainMappingsId Part of `name`. See documentation of `appsId`.
   */
  async appsDomainMappingsGet(appsId: string, domainMappingsId: string): Promise<DomainMapping> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/domainMappings/${ domainMappingsId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DomainMapping;
  }

  /**
   * Lists the domain mappings on an application.
   *
   * @param appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
   */
  async appsDomainMappingsList(appsId: string, opts: AppsDomainMappingsListOptions = {}): Promise<ListDomainMappingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/domainMappings`);
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
    return data as ListDomainMappingsResponse;
  }

  /**
   * Updates the specified domain mapping. To map an SSL certificate to a
   * domain mapping, update certificate_id to point to an AuthorizedCertificate
   * resource. A user must be authorized to administer the associated domain in
   * order to update a DomainMapping resource.
   *
   * @param appsId Part of `name`. Name of the resource to update. Example: apps/myapp/domainMappings/example.com.
   * @param domainMappingsId Part of `name`. See documentation of `appsId`.
   */
  async appsDomainMappingsPatch(appsId: string, domainMappingsId: string, req: DomainMapping, opts: AppsDomainMappingsPatchOptions = {}): Promise<Operation> {
    opts = serializeAppsDomainMappingsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/domainMappings/${ domainMappingsId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Replaces the entire firewall ruleset in one bulk operation. This overrides
   * and replaces the rules of an existing firewall with the new rules.If the
   * final rule does not match traffic with the '*' wildcard IP range, then an
   * "allow all" rule is explicitly added to the end of the list.
   *
   * @param appsId Part of `name`. Name of the Firewall collection to set. Example: apps/myapp/firewall/ingressRules.
   */
  async appsFirewallIngressRulesBatchUpdate(appsId: string, req: BatchUpdateIngressRulesRequest): Promise<BatchUpdateIngressRulesResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/firewall/ingressRules:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchUpdateIngressRulesResponse;
  }

  /**
   * Creates a firewall rule for the application.
   *
   * @param appsId Part of `parent`. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules.
   */
  async appsFirewallIngressRulesCreate(appsId: string, req: FirewallRule): Promise<FirewallRule> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/firewall/ingressRules`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as FirewallRule;
  }

  /**
   * Deletes the specified firewall rule.
   *
   * @param appsId Part of `name`. Name of the Firewall resource to delete. Example: apps/myapp/firewall/ingressRules/100.
   * @param ingressRulesId Part of `name`. See documentation of `appsId`.
   */
  async appsFirewallIngressRulesDelete(appsId: string, ingressRulesId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/firewall/ingressRules/${ ingressRulesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the specified firewall rule.
   *
   * @param appsId Part of `name`. Name of the Firewall resource to retrieve. Example: apps/myapp/firewall/ingressRules/100.
   * @param ingressRulesId Part of `name`. See documentation of `appsId`.
   */
  async appsFirewallIngressRulesGet(appsId: string, ingressRulesId: string): Promise<FirewallRule> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/firewall/ingressRules/${ ingressRulesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FirewallRule;
  }

  /**
   * Lists the firewall rules of an application.
   *
   * @param appsId Part of `parent`. Name of the Firewall collection to retrieve. Example: apps/myapp/firewall/ingressRules.
   */
  async appsFirewallIngressRulesList(appsId: string, opts: AppsFirewallIngressRulesListOptions = {}): Promise<ListIngressRulesResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/firewall/ingressRules`);
    if (opts.matchingAddress !== undefined) {
      url.searchParams.append("matchingAddress", String(opts.matchingAddress));
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
    return data as ListIngressRulesResponse;
  }

  /**
   * Updates the specified firewall rule.
   *
   * @param appsId Part of `name`. Name of the Firewall resource to update. Example: apps/myapp/firewall/ingressRules/100.
   * @param ingressRulesId Part of `name`. See documentation of `appsId`.
   */
  async appsFirewallIngressRulesPatch(appsId: string, ingressRulesId: string, req: FirewallRule, opts: AppsFirewallIngressRulesPatchOptions = {}): Promise<FirewallRule> {
    opts = serializeAppsFirewallIngressRulesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/firewall/ingressRules/${ ingressRulesId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as FirewallRule;
  }

  /**
   * Gets information about an application.
   *
   * @param appsId Part of `name`. Name of the Application resource to get. Example: apps/myapp.
   */
  async appsGet(appsId: string): Promise<Application> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApplication(data);
  }

  /**
   * Gets information about a location.
   *
   * @param appsId Part of `name`. Resource name for the location.
   * @param locationsId Part of `name`. See documentation of `appsId`.
   */
  async appsLocationsGet(appsId: string, locationsId: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/locations/${ locationsId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param appsId Part of `name`. The resource that owns the locations collection, if applicable.
   */
  async appsLocationsList(appsId: string, opts: AppsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/locations`);
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
    return data as ListLocationsResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param appsId Part of `name`. The name of the operation resource.
   * @param operationsId Part of `name`. See documentation of `appsId`.
   */
  async appsOperationsGet(appsId: string, operationsId: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/operations/${ operationsId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.
   *
   * @param appsId Part of `name`. The name of the operation's parent resource.
   */
  async appsOperationsList(appsId: string, opts: AppsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/operations`);
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
   * Updates the specified Application resource. You can update the following
   * fields: auth_domain - Google authentication domain for controlling user
   * access to the application. default_cookie_expiration - Cookie expiration
   * policy for the application. iap - Identity-Aware Proxy properties for the
   * application.
   *
   * @param appsId Part of `name`. Name of the Application resource to update. Example: apps/myapp.
   */
  async appsPatch(appsId: string, req: Application, opts: AppsPatchOptions = {}): Promise<Operation> {
    req = serializeApplication(req);
    opts = serializeAppsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Recreates the required App Engine features for the specified App Engine
   * application, for example a Cloud Storage bucket or App Engine service
   * account. Use this method if you receive an error message about a missing
   * feature, for example, Error retrieving the App Engine service account. If
   * you have deleted your App Engine service account, this will not be able to
   * recreate it. Instead, you should attempt to use the IAM undelete API if
   * possible at
   * https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts/undelete?apix_params=%7B"name"%3A"projects%2F-%2FserviceAccounts%2Funique_id"%2C"resource"%3A%7B%7D%7D
   * . If the deletion was recent, the numeric ID can be found in the Cloud
   * Console Activity Log.
   *
   * @param appsId Part of `name`. Name of the application to repair. Example: apps/myapp
   */
  async appsRepair(appsId: string, req: RepairApplicationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }:repair`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the specified service and all enclosed versions.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesDelete(appsId: string, servicesId: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the current configuration of the specified service.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesGet(appsId: string, servicesId: string): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Service;
  }

  /**
   * Lists all the services in the application.
   *
   * @param appsId Part of `parent`. Name of the parent Application resource. Example: apps/myapp.
   */
  async appsServicesList(appsId: string, opts: AppsServicesListOptions = {}): Promise<ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services`);
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
   * Updates the configuration of the specified service.
   *
   * @param appsId Part of `name`. Name of the resource to update. Example: apps/myapp/services/default.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesPatch(appsId: string, servicesId: string, req: Service, opts: AppsServicesPatchOptions = {}): Promise<Operation> {
    opts = serializeAppsServicesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }`);
    if (opts.migrateTraffic !== undefined) {
      url.searchParams.append("migrateTraffic", String(opts.migrateTraffic));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Deploys code and resource files to a new version.
   *
   * @param appsId Part of `parent`. Name of the parent resource to create this version under. Example: apps/myapp/services/default.
   * @param servicesId Part of `parent`. See documentation of `appsId`.
   */
  async appsServicesVersionsCreate(appsId: string, servicesId: string, req: Version): Promise<Operation> {
    req = serializeVersion(req);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an existing Version resource.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   * @param versionsId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesVersionsDelete(appsId: string, servicesId: string, versionsId: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions/${ versionsId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the specified Version resource. By default, only a BASIC_VIEW will be
   * returned. Specify the FULL_VIEW parameter to get the full resource.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   * @param versionsId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesVersionsGet(appsId: string, servicesId: string, versionsId: string, opts: AppsServicesVersionsGetOptions = {}): Promise<Version> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions/${ versionsId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVersion(data);
  }

  /**
   * Enables debugging on a VM instance. This allows you to use the SSH command
   * to connect to the virtual machine where the instance lives. While in "debug
   * mode", the instance continues to serve live traffic. You should delete the
   * instance when you are done debugging and then allow the system to take over
   * and determine if another instance should be started.Only applicable for
   * instances in App Engine flexible environment.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
   * @param instancesId Part of `name`. See documentation of `appsId`.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   * @param versionsId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesVersionsInstancesDebug(appsId: string, instancesId: string, servicesId: string, versionsId: string, req: DebugInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions/${ versionsId }/instances/${ instancesId }:debug`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Stops a running instance.The instance might be automatically recreated
   * based on the scaling settings of the version. For more information, see
   * "How Instances are Managed" (standard environment
   * (https://cloud.google.com/appengine/docs/standard/python/how-instances-are-managed)
   * | flexible environment
   * (https://cloud.google.com/appengine/docs/flexible/python/how-instances-are-managed)).To
   * ensure that instances are not re-created and avoid getting billed, you can
   * stop all instances within the target version by changing the serving status
   * of the version to STOPPED with the apps.services.versions.patch
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions/patch)
   * method.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
   * @param instancesId Part of `name`. See documentation of `appsId`.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   * @param versionsId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesVersionsInstancesDelete(appsId: string, instancesId: string, servicesId: string, versionsId: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions/${ versionsId }/instances/${ instancesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets instance information.
   *
   * @param appsId Part of `name`. Name of the resource requested. Example: apps/myapp/services/default/versions/v1/instances/instance-1.
   * @param instancesId Part of `name`. See documentation of `appsId`.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   * @param versionsId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesVersionsInstancesGet(appsId: string, instancesId: string, servicesId: string, versionsId: string): Promise<Instance> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions/${ versionsId }/instances/${ instancesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Instance;
  }

  /**
   * Lists the instances of a version.Tip: To aggregate details about instances
   * over time, see the Stackdriver Monitoring API
   * (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list).
   *
   * @param appsId Part of `parent`. Name of the parent Version resource. Example: apps/myapp/services/default/versions/v1.
   * @param servicesId Part of `parent`. See documentation of `appsId`.
   * @param versionsId Part of `parent`. See documentation of `appsId`.
   */
  async appsServicesVersionsInstancesList(appsId: string, servicesId: string, versionsId: string, opts: AppsServicesVersionsInstancesListOptions = {}): Promise<ListInstancesResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions/${ versionsId }/instances`);
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
    return data as ListInstancesResponse;
  }

  /**
   * Lists the versions of a service.
   *
   * @param appsId Part of `parent`. Name of the parent Service resource. Example: apps/myapp/services/default.
   * @param servicesId Part of `parent`. See documentation of `appsId`.
   */
  async appsServicesVersionsList(appsId: string, servicesId: string, opts: AppsServicesVersionsListOptions = {}): Promise<ListVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions`);
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
    return deserializeListVersionsResponse(data);
  }

  /**
   * Updates the specified Version resource. You can specify the following
   * fields depending on the App Engine environment and type of scaling that the
   * version resource uses:Standard environment instance_class
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.instance_class)automatic
   * scaling in the standard environment: automatic_scaling.min_idle_instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)
   * automatic_scaling.max_idle_instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)
   * automaticScaling.standard_scheduler_settings.max_instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)
   * automaticScaling.standard_scheduler_settings.min_instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)
   * automaticScaling.standard_scheduler_settings.target_cpu_utilization
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)
   * automaticScaling.standard_scheduler_settings.target_throughput_utilization
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StandardSchedulerSettings)basic
   * scaling or manual scaling in the standard environment: serving_status
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)
   * manual_scaling.instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)Flexible
   * environment serving_status
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.serving_status)automatic
   * scaling in the flexible environment: automatic_scaling.min_total_instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)
   * automatic_scaling.max_total_instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)
   * automatic_scaling.cool_down_period_sec
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)
   * automatic_scaling.cpu_utilization.target_utilization
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#Version.FIELDS.automatic_scaling)manual
   * scaling in the flexible environment: manual_scaling.instances
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#manualscaling)
   *
   * @param appsId Part of `name`. Name of the resource to update. Example: apps/myapp/services/default/versions/1.
   * @param servicesId Part of `name`. See documentation of `appsId`.
   * @param versionsId Part of `name`. See documentation of `appsId`.
   */
  async appsServicesVersionsPatch(appsId: string, servicesId: string, versionsId: string, req: Version, opts: AppsServicesVersionsPatchOptions = {}): Promise<Operation> {
    req = serializeVersion(req);
    opts = serializeAppsServicesVersionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/apps/${ appsId }/services/${ servicesId }/versions/${ versionsId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets information about an application.
   *
   * @param applicationsId Part of `name`. See documentation of `projectsId`.
   * @param locationsId Part of `name`. See documentation of `projectsId`.
   * @param projectsId Part of `name`. Name of the Application resource to get. Example: apps/myapp.
   */
  async projectsLocationsApplicationsGet(applicationsId: string, locationsId: string, projectsId: string): Promise<Application> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectsId }/locations/${ locationsId }/applications/${ applicationsId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApplication(data);
  }
}

/**
 * Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration
 * for API handlers.
 */
export interface ApiConfigHandler {
  /**
   * Action to take when users access resources that require authentication.
   * Defaults to redirect.
   */
  authFailAction?:  | "AUTH_FAIL_ACTION_UNSPECIFIED" | "AUTH_FAIL_ACTION_REDIRECT" | "AUTH_FAIL_ACTION_UNAUTHORIZED";
  /**
   * Level of login required to access this resource. Defaults to optional.
   */
  login?:  | "LOGIN_UNSPECIFIED" | "LOGIN_OPTIONAL" | "LOGIN_ADMIN" | "LOGIN_REQUIRED";
  /**
   * Path to the script from the application root directory.
   */
  script?: string;
  /**
   * Security (HTTPS) enforcement for this URL.
   */
  securityLevel?:  | "SECURE_UNSPECIFIED" | "SECURE_DEFAULT" | "SECURE_NEVER" | "SECURE_OPTIONAL" | "SECURE_ALWAYS";
  /**
   * URL to serve the endpoint at.
   */
  url?: string;
}

/**
 * Uses Google Cloud Endpoints to handle requests.
 */
export interface ApiEndpointHandler {
  /**
   * Path to the script from the application root directory.
   */
  scriptPath?: string;
}

/**
 * An Application resource contains the top-level configuration of an App
 * Engine application.
 */
export interface Application {
  /**
   * Google Apps authentication domain that controls which users can access
   * this application.Defaults to open access for any Google Account.
   */
  authDomain?: string;
  /**
   * Google Cloud Storage bucket that can be used for storing files associated
   * with this application. This bucket is associated with the application and
   * can be used by the gcloud deployment commands.@OutputOnly
   */
  codeBucket?: string;
  /**
   * The type of the Cloud Firestore or Cloud Datastore database associated
   * with this application.
   */
  databaseType?:  | "DATABASE_TYPE_UNSPECIFIED" | "CLOUD_DATASTORE" | "CLOUD_FIRESTORE" | "CLOUD_DATASTORE_COMPATIBILITY";
  /**
   * Google Cloud Storage bucket that can be used by this application to store
   * content.@OutputOnly
   */
  defaultBucket?: string;
  /**
   * Cookie expiration policy for this application.
   */
  defaultCookieExpiration?: number /* Duration */;
  /**
   * Hostname used to reach this application, as resolved by App
   * Engine.@OutputOnly
   */
  defaultHostname?: string;
  /**
   * HTTP path dispatch rules for requests to the application that do not
   * explicitly target a service or version. Rules are order-dependent. Up to 20
   * dispatch rules can be supported.
   */
  dispatchRules?: UrlDispatchRule[];
  /**
   * The feature specific settings to be used in the application.
   */
  featureSettings?: FeatureSettings;
  /**
   * The Google Container Registry domain used for storing managed build docker
   * images for this application.
   */
  gcrDomain?: string;
  iap?: IdentityAwareProxy;
  /**
   * Identifier of the Application resource. This identifier is equivalent to
   * the project ID of the Google Cloud Platform project where you want to
   * deploy your application. Example: myapp.
   */
  id?: string;
  /**
   * Location from which this application runs. Application instances run out
   * of the data centers in the specified location, which is also where all of
   * the application's end user content is stored.Defaults to us-central.View
   * the list of supported locations
   * (https://cloud.google.com/appengine/docs/locations).
   */
  locationId?: string;
  /**
   * Full path to the Application resource in the API. Example:
   * apps/myapp.@OutputOnly
   */
  name?: string;
  /**
   * The service account associated with the application. This is the app-level
   * default identity. If no identity provided during create version, Admin API
   * will fallback to this one.
   */
  serviceAccount?: string;
  /**
   * Serving status of this application.
   */
  servingStatus?:  | "UNSPECIFIED" | "SERVING" | "USER_DISABLED" | "SYSTEM_DISABLED";
}

function serializeApplication(data: any): Application {
  return {
    ...data,
    defaultCookieExpiration: data["defaultCookieExpiration"] !== undefined ? data["defaultCookieExpiration"] : undefined,
  };
}

function deserializeApplication(data: any): Application {
  return {
    ...data,
    defaultCookieExpiration: data["defaultCookieExpiration"] !== undefined ? data["defaultCookieExpiration"] : undefined,
  };
}

/**
 * Additional options for AppEngine#appsAuthorizedCertificatesGet.
 */
export interface AppsAuthorizedCertificatesGetOptions {
  /**
   * Controls the set of fields returned in the GET response.
   */
  view?:  | "BASIC_CERTIFICATE" | "FULL_CERTIFICATE";
}

/**
 * Additional options for AppEngine#appsAuthorizedCertificatesList.
 */
export interface AppsAuthorizedCertificatesListOptions {
  /**
   * Maximum results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
  /**
   * Controls the set of fields returned in the LIST response.
   */
  view?:  | "BASIC_CERTIFICATE" | "FULL_CERTIFICATE";
}

/**
 * Additional options for AppEngine#appsAuthorizedCertificatesPatch.
 */
export interface AppsAuthorizedCertificatesPatchOptions {
  /**
   * Standard field mask for the set of fields to be updated. Updates are only
   * supported on the certificate_raw_data and display_name fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAppsAuthorizedCertificatesPatchOptions(data: any): AppsAuthorizedCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAppsAuthorizedCertificatesPatchOptions(data: any): AppsAuthorizedCertificatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AppEngine#appsAuthorizedDomainsList.
 */
export interface AppsAuthorizedDomainsListOptions {
  /**
   * Maximum results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for AppEngine#appsDomainMappingsCreate.
 */
export interface AppsDomainMappingsCreateOptions {
  /**
   * Whether the domain creation should override any existing mappings for this
   * domain. By default, overrides are rejected.
   */
  overrideStrategy?:  | "UNSPECIFIED_DOMAIN_OVERRIDE_STRATEGY" | "STRICT" | "OVERRIDE";
}

/**
 * Additional options for AppEngine#appsDomainMappingsList.
 */
export interface AppsDomainMappingsListOptions {
  /**
   * Maximum results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for AppEngine#appsDomainMappingsPatch.
 */
export interface AppsDomainMappingsPatchOptions {
  /**
   * Required. Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAppsDomainMappingsPatchOptions(data: any): AppsDomainMappingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAppsDomainMappingsPatchOptions(data: any): AppsDomainMappingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AppEngine#appsFirewallIngressRulesList.
 */
export interface AppsFirewallIngressRulesListOptions {
  /**
   * A valid IP Address. If set, only rules matching this address will be
   * returned. The first returned rule will be the rule that fires on requests
   * from this IP.
   */
  matchingAddress?: string;
  /**
   * Maximum results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for AppEngine#appsFirewallIngressRulesPatch.
 */
export interface AppsFirewallIngressRulesPatchOptions {
  /**
   * Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAppsFirewallIngressRulesPatchOptions(data: any): AppsFirewallIngressRulesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAppsFirewallIngressRulesPatchOptions(data: any): AppsFirewallIngressRulesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AppEngine#appsLocationsList.
 */
export interface AppsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like "displayName=tokyo", and is documented in
   * more detail in AIP-160 (https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the next_page_token field in the response. Send
   * that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for AppEngine#appsOperationsList.
 */
export interface AppsOperationsListOptions {
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
 * Additional options for AppEngine#appsPatch.
 */
export interface AppsPatchOptions {
  /**
   * Required. Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAppsPatchOptions(data: any): AppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAppsPatchOptions(data: any): AppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AppEngine#appsServicesList.
 */
export interface AppsServicesListOptions {
  /**
   * Maximum results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for AppEngine#appsServicesPatch.
 */
export interface AppsServicesPatchOptions {
  /**
   * Set to true to gradually shift traffic to one or more versions that you
   * specify. By default, traffic is shifted immediately. For gradual traffic
   * migration, the target versions must be located within instances that are
   * configured for both warmup requests
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#InboundServiceType)
   * and automatic scaling
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#AutomaticScaling).
   * You must specify the shardBy
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services#ShardBy)
   * field in the Service resource. Gradual traffic migration is not supported
   * in the App Engine flexible environment. For examples, see Migrating and
   * Splitting Traffic
   * (https://cloud.google.com/appengine/docs/admin-api/migrating-splitting-traffic).
   */
  migrateTraffic?: boolean;
  /**
   * Required. Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAppsServicesPatchOptions(data: any): AppsServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAppsServicesPatchOptions(data: any): AppsServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AppEngine#appsServicesVersionsGet.
 */
export interface AppsServicesVersionsGetOptions {
  /**
   * Controls the set of fields returned in the Get response.
   */
  view?:  | "BASIC" | "FULL";
}

/**
 * Additional options for AppEngine#appsServicesVersionsInstancesList.
 */
export interface AppsServicesVersionsInstancesListOptions {
  /**
   * Maximum results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for AppEngine#appsServicesVersionsList.
 */
export interface AppsServicesVersionsListOptions {
  /**
   * Maximum results to return per page.
   */
  pageSize?: number;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
  /**
   * Controls the set of fields returned in the List response.
   */
  view?:  | "BASIC" | "FULL";
}

/**
 * Additional options for AppEngine#appsServicesVersionsPatch.
 */
export interface AppsServicesVersionsPatchOptions {
  /**
   * Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeAppsServicesVersionsPatchOptions(data: any): AppsServicesVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeAppsServicesVersionsPatchOptions(data: any): AppsServicesVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * An SSL certificate that a user has been authorized to administer. A user is
 * authorized to administer any certificate that applies to one of their
 * authorized domains.
 */
export interface AuthorizedCertificate {
  /**
   * The SSL certificate serving the AuthorizedCertificate resource. This must
   * be obtained independently from a certificate authority.
   */
  certificateRawData?: CertificateRawData;
  /**
   * The user-specified display name of the certificate. This is not guaranteed
   * to be unique. Example: My Certificate.
   */
  displayName?: string;
  /**
   * Aggregate count of the domain mappings with this certificate mapped. This
   * count includes domain mappings on applications for which the user does not
   * have VIEWER permissions.Only returned by GET or LIST requests when
   * specifically requested by the view=FULL_CERTIFICATE option.@OutputOnly
   */
  domainMappingsCount?: number;
  /**
   * Topmost applicable domains of this certificate. This certificate applies
   * to these domains and their subdomains. Example: example.com.@OutputOnly
   */
  domainNames?: string[];
  /**
   * The time when this certificate expires. To update the renewal time on this
   * certificate, upload an SSL certificate with a different expiration time
   * using AuthorizedCertificates.UpdateAuthorizedCertificate.@OutputOnly
   */
  expireTime?: Date;
  /**
   * Relative name of the certificate. This is a unique value autogenerated on
   * AuthorizedCertificate resource creation. Example: 12345.@OutputOnly
   */
  id?: string;
  /**
   * Only applicable if this certificate is managed by App Engine. Managed
   * certificates are tied to the lifecycle of a DomainMapping and cannot be
   * updated or deleted via the AuthorizedCertificates API. If this certificate
   * is manually administered by the user, this field will be empty.@OutputOnly
   */
  managedCertificate?: ManagedCertificate;
  /**
   * Full path to the AuthorizedCertificate resource in the API. Example:
   * apps/myapp/authorizedCertificates/12345.@OutputOnly
   */
  name?: string;
  /**
   * The full paths to user visible Domain Mapping resources that have this
   * certificate mapped. Example: apps/myapp/domainMappings/example.com.This may
   * not represent the full list of mapped domain mappings if the user does not
   * have VIEWER permissions on all of the applications that have this
   * certificate mapped. See domain_mappings_count for a complete count.Only
   * returned by GET or LIST requests when specifically requested by the
   * view=FULL_CERTIFICATE option.@OutputOnly
   */
  visibleDomainMappings?: string[];
}

function serializeAuthorizedCertificate(data: any): AuthorizedCertificate {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    managedCertificate: data["managedCertificate"] !== undefined ? serializeManagedCertificate(data["managedCertificate"]) : undefined,
  };
}

function deserializeAuthorizedCertificate(data: any): AuthorizedCertificate {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    managedCertificate: data["managedCertificate"] !== undefined ? deserializeManagedCertificate(data["managedCertificate"]) : undefined,
  };
}

/**
 * A domain that a user has been authorized to administer. To authorize use of
 * a domain, verify ownership via Webmaster Central
 * (https://www.google.com/webmasters/verification/home).
 */
export interface AuthorizedDomain {
  /**
   * Fully qualified domain name of the domain authorized for use. Example:
   * example.com.
   */
  id?: string;
  /**
   * Full path to the AuthorizedDomain resource in the API. Example:
   * apps/myapp/authorizedDomains/example.com.@OutputOnly
   */
  name?: string;
}

/**
 * Automatic scaling is based on request rate, response latencies, and other
 * application metrics.
 */
export interface AutomaticScaling {
  /**
   * The time period that the Autoscaler
   * (https://cloud.google.com/compute/docs/autoscaler/) should wait before it
   * starts collecting information from a new instance. This prevents the
   * autoscaler from collecting information when the instance is initializing,
   * during which the collected usage would not be reliable. Only applicable in
   * the App Engine flexible environment.
   */
  coolDownPeriod?: number /* Duration */;
  /**
   * Target scaling by CPU usage.
   */
  cpuUtilization?: CpuUtilization;
  /**
   * Target scaling by disk usage.
   */
  diskUtilization?: DiskUtilization;
  /**
   * Number of concurrent requests an automatic scaling instance can accept
   * before the scheduler spawns a new instance.Defaults to a runtime-specific
   * value.
   */
  maxConcurrentRequests?: number;
  /**
   * Maximum number of idle instances that should be maintained for this
   * version.
   */
  maxIdleInstances?: number;
  /**
   * Maximum amount of time that a request should wait in the pending queue
   * before starting a new instance to handle it.
   */
  maxPendingLatency?: number /* Duration */;
  /**
   * Maximum number of instances that should be started to handle requests for
   * this version.
   */
  maxTotalInstances?: number;
  /**
   * Minimum number of idle instances that should be maintained for this
   * version. Only applicable for the default version of a service.
   */
  minIdleInstances?: number;
  /**
   * Minimum amount of time a request should wait in the pending queue before
   * starting a new instance to handle it.
   */
  minPendingLatency?: number /* Duration */;
  /**
   * Minimum number of running instances that should be maintained for this
   * version.
   */
  minTotalInstances?: number;
  /**
   * Target scaling by network usage.
   */
  networkUtilization?: NetworkUtilization;
  /**
   * Target scaling by request utilization.
   */
  requestUtilization?: RequestUtilization;
  /**
   * Scheduler settings for standard environment.
   */
  standardSchedulerSettings?: StandardSchedulerSettings;
}

function serializeAutomaticScaling(data: any): AutomaticScaling {
  return {
    ...data,
    coolDownPeriod: data["coolDownPeriod"] !== undefined ? data["coolDownPeriod"] : undefined,
    cpuUtilization: data["cpuUtilization"] !== undefined ? serializeCpuUtilization(data["cpuUtilization"]) : undefined,
    maxPendingLatency: data["maxPendingLatency"] !== undefined ? data["maxPendingLatency"] : undefined,
    minPendingLatency: data["minPendingLatency"] !== undefined ? data["minPendingLatency"] : undefined,
  };
}

function deserializeAutomaticScaling(data: any): AutomaticScaling {
  return {
    ...data,
    coolDownPeriod: data["coolDownPeriod"] !== undefined ? data["coolDownPeriod"] : undefined,
    cpuUtilization: data["cpuUtilization"] !== undefined ? deserializeCpuUtilization(data["cpuUtilization"]) : undefined,
    maxPendingLatency: data["maxPendingLatency"] !== undefined ? data["maxPendingLatency"] : undefined,
    minPendingLatency: data["minPendingLatency"] !== undefined ? data["minPendingLatency"] : undefined,
  };
}

/**
 * A service with basic scaling will create an instance when the application
 * receives a request. The instance will be turned down when the app becomes
 * idle. Basic scaling is ideal for work that is intermittent or driven by user
 * activity.
 */
export interface BasicScaling {
  /**
   * Duration of time after the last request that an instance must wait before
   * the instance is shut down.
   */
  idleTimeout?: number /* Duration */;
  /**
   * Maximum number of instances to create for this version.
   */
  maxInstances?: number;
}

function serializeBasicScaling(data: any): BasicScaling {
  return {
    ...data,
    idleTimeout: data["idleTimeout"] !== undefined ? data["idleTimeout"] : undefined,
  };
}

function deserializeBasicScaling(data: any): BasicScaling {
  return {
    ...data,
    idleTimeout: data["idleTimeout"] !== undefined ? data["idleTimeout"] : undefined,
  };
}

/**
 * Request message for Firewall.BatchUpdateIngressRules.
 */
export interface BatchUpdateIngressRulesRequest {
  /**
   * A list of FirewallRules to replace the existing set.
   */
  ingressRules?: FirewallRule[];
}

/**
 * Response message for Firewall.UpdateAllIngressRules.
 */
export interface BatchUpdateIngressRulesResponse {
  /**
   * The full list of ingress FirewallRules for this application.
   */
  ingressRules?: FirewallRule[];
}

/**
 * An SSL certificate obtained from a certificate authority.
 */
export interface CertificateRawData {
  /**
   * Unencrypted PEM encoded RSA private key. This field is set once on
   * certificate creation and then encrypted. The key size must be 2048 bits or
   * fewer. Must include the header and footer. Example: -----BEGIN RSA PRIVATE
   * KEY----- -----END RSA PRIVATE KEY----- @InputOnly
   */
  privateKey?: string;
  /**
   * PEM encoded x.509 public key certificate. This field is set once on
   * certificate creation. Must include the header and footer. Example:
   * -----BEGIN CERTIFICATE----- -----END CERTIFICATE-----
   */
  publicCertificate?: string;
}

/**
 * Options for the build operations performed as a part of the version
 * deployment. Only applicable for App Engine flexible environment when creating
 * a version using source code directly.
 */
export interface CloudBuildOptions {
  /**
   * Path to the yaml file used in deployment, used to determine runtime
   * configuration details.Required for flexible environment builds.See
   * https://cloud.google.com/appengine/docs/standard/python/config/appref for
   * more details.
   */
  appYamlPath?: string;
  /**
   * The Cloud Build timeout used as part of any dependent builds performed by
   * version creation. Defaults to 10 minutes.
   */
  cloudBuildTimeout?: number /* Duration */;
}

function serializeCloudBuildOptions(data: any): CloudBuildOptions {
  return {
    ...data,
    cloudBuildTimeout: data["cloudBuildTimeout"] !== undefined ? data["cloudBuildTimeout"] : undefined,
  };
}

function deserializeCloudBuildOptions(data: any): CloudBuildOptions {
  return {
    ...data,
    cloudBuildTimeout: data["cloudBuildTimeout"] !== undefined ? data["cloudBuildTimeout"] : undefined,
  };
}

/**
 * Docker image that is used to create a container and start a VM instance for
 * the version that you deploy. Only applicable for instances running in the App
 * Engine flexible environment.
 */
export interface ContainerInfo {
  /**
   * URI to the hosted container image in Google Container Registry. The URI
   * must be fully qualified and include a tag or digest. Examples:
   * "gcr.io/my-project/image:tag" or "gcr.io/my-project/image@digest"
   */
  image?: string;
}

/**
 * Target scaling by CPU usage.
 */
export interface CpuUtilization {
  /**
   * Period of time over which CPU utilization is calculated.
   */
  aggregationWindowLength?: number /* Duration */;
  /**
   * Target CPU utilization ratio to maintain when scaling. Must be between 0
   * and 1.
   */
  targetUtilization?: number;
}

function serializeCpuUtilization(data: any): CpuUtilization {
  return {
    ...data,
    aggregationWindowLength: data["aggregationWindowLength"] !== undefined ? data["aggregationWindowLength"] : undefined,
  };
}

function deserializeCpuUtilization(data: any): CpuUtilization {
  return {
    ...data,
    aggregationWindowLength: data["aggregationWindowLength"] !== undefined ? data["aggregationWindowLength"] : undefined,
  };
}

/**
 * Metadata for the given google.longrunning.Operation during a
 * google.appengine.v1.CreateVersionRequest.
 */
export interface CreateVersionMetadataV1 {
  /**
   * The Cloud Build ID if one was created as part of the version create.
   * @OutputOnly
   */
  cloudBuildId?: string;
}

/**
 * Metadata for the given google.longrunning.Operation during a
 * google.appengine.v1alpha.CreateVersionRequest.
 */
export interface CreateVersionMetadataV1Alpha {
  /**
   * The Cloud Build ID if one was created as part of the version create.
   * @OutputOnly
   */
  cloudBuildId?: string;
}

/**
 * Metadata for the given google.longrunning.Operation during a
 * google.appengine.v1beta.CreateVersionRequest.
 */
export interface CreateVersionMetadataV1Beta {
  /**
   * The Cloud Build ID if one was created as part of the version create.
   * @OutputOnly
   */
  cloudBuildId?: string;
}

/**
 * Request message for Instances.DebugInstance.
 */
export interface DebugInstanceRequest {
  /**
   * Public SSH key to add to the instance. Examples: [USERNAME]:ssh-rsa
   * [KEY_VALUE] [USERNAME] [USERNAME]:ssh-rsa [KEY_VALUE] google-ssh
   * {"userName":"[USERNAME]","expireOn":"[EXPIRE_TIME]"}For more information,
   * see Adding and Removing SSH Keys
   * (https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys).
   */
  sshKey?: string;
}

/**
 * Code and application artifacts used to deploy a version to App Engine.
 */
export interface Deployment {
  /**
   * Options for any Google Cloud Build builds created as a part of this
   * deployment.These options will only be used if a new build is created, such
   * as when deploying to the App Engine flexible environment using files or
   * zip.
   */
  cloudBuildOptions?: CloudBuildOptions;
  /**
   * The Docker image for the container that runs the version. Only applicable
   * for instances running in the App Engine flexible environment.
   */
  container?: ContainerInfo;
  /**
   * Manifest of the files stored in Google Cloud Storage that are included as
   * part of this version. All files must be readable using the credentials
   * supplied with this call.
   */
  files?: {
    [key: string]: FileInfo
  };
  /**
   * The zip file for this deployment, if this is a zip deployment.
   */
  zip?: ZipInfo;
}

function serializeDeployment(data: any): Deployment {
  return {
    ...data,
    cloudBuildOptions: data["cloudBuildOptions"] !== undefined ? serializeCloudBuildOptions(data["cloudBuildOptions"]) : undefined,
  };
}

function deserializeDeployment(data: any): Deployment {
  return {
    ...data,
    cloudBuildOptions: data["cloudBuildOptions"] !== undefined ? deserializeCloudBuildOptions(data["cloudBuildOptions"]) : undefined,
  };
}

/**
 * Target scaling by disk usage. Only applicable in the App Engine flexible
 * environment.
 */
export interface DiskUtilization {
  /**
   * Target bytes read per second.
   */
  targetReadBytesPerSecond?: number;
  /**
   * Target ops read per seconds.
   */
  targetReadOpsPerSecond?: number;
  /**
   * Target bytes written per second.
   */
  targetWriteBytesPerSecond?: number;
  /**
   * Target ops written per second.
   */
  targetWriteOpsPerSecond?: number;
}

/**
 * A domain serving an App Engine application.
 */
export interface DomainMapping {
  /**
   * Relative name of the domain serving the application. Example: example.com.
   */
  id?: string;
  /**
   * Full path to the DomainMapping resource in the API. Example:
   * apps/myapp/domainMapping/example.com.@OutputOnly
   */
  name?: string;
  /**
   * The resource records required to configure this domain mapping. These
   * records must be added to the domain's DNS configuration in order to serve
   * the application via this domain mapping.@OutputOnly
   */
  resourceRecords?: ResourceRecord[];
  /**
   * SSL configuration for this domain. If unconfigured, this domain will not
   * serve with SSL.
   */
  sslSettings?: SslSettings;
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
 * Google Cloud Endpoints (https://cloud.google.com/endpoints) configuration.
 * The Endpoints API Service provides tooling for serving Open API and gRPC
 * endpoints via an NGINX proxy. Only valid for App Engine Flexible environment
 * deployments.The fields here refer to the name and configuration ID of a
 * "service" resource in the Service Management API
 * (https://cloud.google.com/service-management/overview).
 */
export interface EndpointsApiService {
  /**
   * Endpoints service configuration ID as specified by the Service Management
   * API. For example "2016-09-19r1".By default, the rollout strategy for
   * Endpoints is RolloutStrategy.FIXED. This means that Endpoints starts up
   * with a particular configuration ID. When a new configuration is rolled out,
   * Endpoints must be given the new configuration ID. The config_id field is
   * used to give the configuration ID and is required in this case.Endpoints
   * also has a rollout strategy called RolloutStrategy.MANAGED. When using
   * this, Endpoints fetches the latest configuration and does not need the
   * configuration ID. In this case, config_id must be omitted.
   */
  configId?: string;
  /**
   * Enable or disable trace sampling. By default, this is set to false for
   * enabled.
   */
  disableTraceSampling?: boolean;
  /**
   * Endpoints service name which is the name of the "service" resource in the
   * Service Management API. For example "myapi.endpoints.myproject.cloud.goog"
   */
  name?: string;
  /**
   * Endpoints rollout strategy. If FIXED, config_id must be specified. If
   * MANAGED, config_id must be omitted.
   */
  rolloutStrategy?:  | "UNSPECIFIED_ROLLOUT_STRATEGY" | "FIXED" | "MANAGED";
}

/**
 * The entrypoint for the application.
 */
export interface Entrypoint {
  /**
   * The format should be a shell command that can be fed to bash -c.
   */
  shell?: string;
}

/**
 * Custom static error page to be served when an error occurs.
 */
export interface ErrorHandler {
  /**
   * Error condition this handler applies to.
   */
  errorCode?:  | "ERROR_CODE_UNSPECIFIED" | "ERROR_CODE_DEFAULT" | "ERROR_CODE_OVER_QUOTA" | "ERROR_CODE_DOS_API_DENIAL" | "ERROR_CODE_TIMEOUT";
  /**
   * MIME type of file. Defaults to text/html.
   */
  mimeType?: string;
  /**
   * Static file content to be served for this error.
   */
  staticFile?: string;
}

/**
 * The feature specific settings to be used in the application. These define
 * behaviors that are user configurable.
 */
export interface FeatureSettings {
  /**
   * Boolean value indicating if split health checks should be used instead of
   * the legacy health checks. At an app.yaml level, this means defaulting to
   * 'readiness_check' and 'liveness_check' values instead of 'health_check'
   * ones. Once the legacy 'health_check' behavior is deprecated, and this value
   * is always true, this setting can be removed.
   */
  splitHealthChecks?: boolean;
  /**
   * If true, use Container-Optimized OS
   * (https://cloud.google.com/container-optimized-os/) base image for VMs,
   * rather than a base Debian image.
   */
  useContainerOptimizedOs?: boolean;
}

/**
 * Single source file that is part of the version to be deployed. Each source
 * file that is deployed must be specified separately.
 */
export interface FileInfo {
  /**
   * The MIME type of the file.Defaults to the value from Google Cloud Storage.
   */
  mimeType?: string;
  /**
   * The SHA1 hash of the file, in hex.
   */
  sha1Sum?: string;
  /**
   * URL source to use to fetch this file. Must be a URL to a resource in
   * Google Cloud Storage in the form 'http(s)://storage.googleapis.com//'.
   */
  sourceUrl?: string;
}

/**
 * A single firewall rule that is evaluated against incoming traffic and
 * provides an action to take on matched requests.
 */
export interface FirewallRule {
  /**
   * The action to take on matched requests.
   */
  action?:  | "UNSPECIFIED_ACTION" | "ALLOW" | "DENY";
  /**
   * An optional string description of this rule. This field has a maximum
   * length of 400 characters.
   */
  description?: string;
  /**
   * A positive integer between 1, Int32.MaxValue-1 that defines the order of
   * rule evaluation. Rules with the lowest priority are evaluated first.A
   * default rule at priority Int32.MaxValue matches all IPv4 and IPv6 traffic
   * when no previous rule matches. Only the action of this rule can be modified
   * by the user.
   */
  priority?: number;
  /**
   * IP address or range, defined using CIDR notation, of requests that this
   * rule applies to. You can use the wildcard character "*" to match all IPs
   * equivalent to "0/0" and "::/0" together. Examples: 192.168.1.1 or
   * 192.168.0.0/16 or 2001:db8::/32 or 2001:0db8:0000:0042:0000:8a2e:0370:7334.
   * Truncation will be silently performed on addresses which are not properly
   * truncated. For example, 1.2.3.4/24 is accepted as the same address as
   * 1.2.3.0/24. Similarly, for IPv6, 2001:db8::1/32 is accepted as the same
   * address as 2001:db8::/32.
   */
  sourceRange?: string;
}

/**
 * Runtime settings for the App Engine flexible environment.
 */
export interface FlexibleRuntimeSettings {
  /**
   * The operating system of the application runtime.
   */
  operatingSystem?: string;
  /**
   * The runtime version of an App Engine flexible application.
   */
  runtimeVersion?: string;
}

/**
 * Metadata for the given google.cloud.location.Location.
 */
export interface GoogleAppengineV1betaLocationMetadata {
  /**
   * App Engine flexible environment is available in the given
   * location.@OutputOnly
   */
  flexibleEnvironmentAvailable?: boolean;
  /**
   * Output only. Search API
   * (https://cloud.google.com/appengine/docs/standard/python/search) is
   * available in the given location.
   */
  readonly searchApiAvailable?: boolean;
  /**
   * App Engine standard environment is available in the given
   * location.@OutputOnly
   */
  standardEnvironmentAvailable?: boolean;
}

/**
 * Health checking configuration for VM instances. Unhealthy instances are
 * killed and replaced with new instances. Only applicable for instances in App
 * Engine flexible environment.
 */
export interface HealthCheck {
  /**
   * Interval between health checks.
   */
  checkInterval?: number /* Duration */;
  /**
   * Whether to explicitly disable health checks for this instance.
   */
  disableHealthCheck?: boolean;
  /**
   * Number of consecutive successful health checks required before receiving
   * traffic.
   */
  healthyThreshold?: number;
  /**
   * Host header to send when performing an HTTP health check. Example:
   * "myapp.appspot.com"
   */
  host?: string;
  /**
   * Number of consecutive failed health checks required before an instance is
   * restarted.
   */
  restartThreshold?: number;
  /**
   * Time before the health check is considered failed.
   */
  timeout?: number /* Duration */;
  /**
   * Number of consecutive failed health checks required before removing
   * traffic.
   */
  unhealthyThreshold?: number;
}

function serializeHealthCheck(data: any): HealthCheck {
  return {
    ...data,
    checkInterval: data["checkInterval"] !== undefined ? data["checkInterval"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeHealthCheck(data: any): HealthCheck {
  return {
    ...data,
    checkInterval: data["checkInterval"] !== undefined ? data["checkInterval"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Identity-Aware Proxy
 */
export interface IdentityAwareProxy {
  /**
   * Whether the serving infrastructure will authenticate and authorize all
   * incoming requests.If true, the oauth2_client_id and oauth2_client_secret
   * fields must be non-empty.
   */
  enabled?: boolean;
  /**
   * OAuth2 client ID to use for the authentication flow.
   */
  oauth2ClientId?: string;
  /**
   * OAuth2 client secret to use for the authentication flow.For security
   * reasons, this value cannot be retrieved via the API. Instead, the SHA-256
   * hash of the value is returned in the oauth2_client_secret_sha256
   * field.@InputOnly
   */
  oauth2ClientSecret?: string;
  /**
   * Hex-encoded SHA-256 hash of the client secret.@OutputOnly
   */
  oauth2ClientSecretSha256?: string;
}

/**
 * An Instance resource is the computing unit that App Engine uses to
 * automatically scale an application.
 */
export interface Instance {
  /**
   * Output only. App Engine release this instance is running on.
   */
  readonly appEngineRelease?: string;
  /**
   * Output only. Availability of the instance.
   */
  readonly availability?:  | "UNSPECIFIED" | "RESIDENT" | "DYNAMIC";
  /**
   * Output only. Average latency (ms) over the last minute.
   */
  readonly averageLatency?: number;
  /**
   * Output only. Number of errors since this instance was started.
   */
  readonly errors?: number;
  /**
   * Output only. Relative name of the instance within the version. Example:
   * instance-1.
   */
  readonly id?: string;
  /**
   * Output only. Total memory in use (bytes).
   */
  readonly memoryUsage?: bigint;
  /**
   * Output only. Full path to the Instance resource in the API. Example:
   * apps/myapp/services/default/versions/v1/instances/instance-1.
   */
  readonly name?: string;
  /**
   * Output only. Average queries per second (QPS) over the last minute.
   */
  readonly qps?: number;
  /**
   * Output only. Number of requests since this instance was started.
   */
  readonly requests?: number;
  /**
   * Output only. Time that this instance was started.@OutputOnly
   */
  readonly startTime?: Date;
  /**
   * Output only. Whether this instance is in debug mode. Only applicable for
   * instances in App Engine flexible environment.
   */
  readonly vmDebugEnabled?: boolean;
  /**
   * Output only. Virtual machine ID of this instance. Only applicable for
   * instances in App Engine flexible environment.
   */
  readonly vmId?: string;
  /**
   * Output only. The IP address of this instance. Only applicable for
   * instances in App Engine flexible environment.
   */
  readonly vmIp?: string;
  /**
   * Output only. The liveness health check of this instance. Only applicable
   * for instances in App Engine flexible environment.
   */
  readonly vmLiveness?:  | "LIVENESS_STATE_UNSPECIFIED" | "UNKNOWN" | "HEALTHY" | "UNHEALTHY" | "DRAINING" | "TIMEOUT";
  /**
   * Output only. Name of the virtual machine where this instance lives. Only
   * applicable for instances in App Engine flexible environment.
   */
  readonly vmName?: string;
  /**
   * Output only. Status of the virtual machine where this instance lives. Only
   * applicable for instances in App Engine flexible environment.
   */
  readonly vmStatus?: string;
  /**
   * Output only. Zone where the virtual machine is located. Only applicable
   * for instances in App Engine flexible environment.
   */
  readonly vmZoneName?: string;
}

/**
 * Third-party Python runtime library that is required by the application.
 */
export interface Library {
  /**
   * Name of the library. Example: "django".
   */
  name?: string;
  /**
   * Version of the library to select, or "latest".
   */
  version?: string;
}

/**
 * Response message for AuthorizedCertificates.ListAuthorizedCertificates.
 */
export interface ListAuthorizedCertificatesResponse {
  /**
   * The SSL certificates the user is authorized to administer.
   */
  certificates?: AuthorizedCertificate[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

function serializeListAuthorizedCertificatesResponse(data: any): ListAuthorizedCertificatesResponse {
  return {
    ...data,
    certificates: data["certificates"] !== undefined ? data["certificates"].map((item: any) => (serializeAuthorizedCertificate(item))) : undefined,
  };
}

function deserializeListAuthorizedCertificatesResponse(data: any): ListAuthorizedCertificatesResponse {
  return {
    ...data,
    certificates: data["certificates"] !== undefined ? data["certificates"].map((item: any) => (deserializeAuthorizedCertificate(item))) : undefined,
  };
}

/**
 * Response message for AuthorizedDomains.ListAuthorizedDomains.
 */
export interface ListAuthorizedDomainsResponse {
  /**
   * The authorized domains belonging to the user.
   */
  domains?: AuthorizedDomain[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for DomainMappings.ListDomainMappings.
 */
export interface ListDomainMappingsResponse {
  /**
   * The domain mappings for the application.
   */
  domainMappings?: DomainMapping[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for Firewall.ListIngressRules.
 */
export interface ListIngressRulesResponse {
  /**
   * The ingress FirewallRules for this application.
   */
  ingressRules?: FirewallRule[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for Instances.ListInstances.
 */
export interface ListInstancesResponse {
  /**
   * The instances belonging to the requested version.
   */
  instances?: Instance[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * The response message for Locations.ListLocations.
 */
export interface ListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: Location[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
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
 * Response message for Services.ListServices.
 */
export interface ListServicesResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * The services belonging to the requested application.
   */
  services?: Service[];
}

/**
 * Response message for Versions.ListVersions.
 */
export interface ListVersionsResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * The versions belonging to the requested service.
   */
  versions?: Version[];
}

function serializeListVersionsResponse(data: any): ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (serializeVersion(item))) : undefined,
  };
}

function deserializeListVersionsResponse(data: any): ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (deserializeVersion(item))) : undefined,
  };
}

/**
 * Health checking configuration for VM instances. Unhealthy instances are
 * killed and replaced with new instances.
 */
export interface LivenessCheck {
  /**
   * Interval between health checks.
   */
  checkInterval?: number /* Duration */;
  /**
   * Number of consecutive failed checks required before considering the VM
   * unhealthy.
   */
  failureThreshold?: number;
  /**
   * Host header to send when performing a HTTP Liveness check. Example:
   * "myapp.appspot.com"
   */
  host?: string;
  /**
   * The initial delay before starting to execute the checks.
   */
  initialDelay?: number /* Duration */;
  /**
   * The request path.
   */
  path?: string;
  /**
   * Number of consecutive successful checks required before considering the VM
   * healthy.
   */
  successThreshold?: number;
  /**
   * Time before the check is considered failed.
   */
  timeout?: number /* Duration */;
}

function serializeLivenessCheck(data: any): LivenessCheck {
  return {
    ...data,
    checkInterval: data["checkInterval"] !== undefined ? data["checkInterval"] : undefined,
    initialDelay: data["initialDelay"] !== undefined ? data["initialDelay"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeLivenessCheck(data: any): LivenessCheck {
  return {
    ...data,
    checkInterval: data["checkInterval"] !== undefined ? data["checkInterval"] : undefined,
    initialDelay: data["initialDelay"] !== undefined ? data["initialDelay"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface Location {
  /**
   * The friendly name for this location, typically a nearby city name. For
   * example, "Tokyo".
   */
  displayName?: string;
  /**
   * Cross-service attributes for the location. For example
   * {"cloud.googleapis.com/region": "us-east1"}
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The canonical id for this location. For example: "us-east1".
   */
  locationId?: string;
  /**
   * Service-specific metadata. For example the available capacity at the given
   * location.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Resource name for the location, which may vary between implementations.
   * For example: "projects/example-project/locations/us-east1"
   */
  name?: string;
}

/**
 * Metadata for the given google.cloud.location.Location.
 */
export interface LocationMetadata {
  /**
   * App Engine flexible environment is available in the given
   * location.@OutputOnly
   */
  flexibleEnvironmentAvailable?: boolean;
  /**
   * Output only. Search API
   * (https://cloud.google.com/appengine/docs/standard/python/search) is
   * available in the given location.
   */
  readonly searchApiAvailable?: boolean;
  /**
   * App Engine standard environment is available in the given
   * location.@OutputOnly
   */
  standardEnvironmentAvailable?: boolean;
}

/**
 * A certificate managed by App Engine.
 */
export interface ManagedCertificate {
  /**
   * Time at which the certificate was last renewed. The renewal process is
   * fully managed. Certificate renewal will automatically occur before the
   * certificate expires. Renewal errors can be tracked via
   * ManagementStatus.@OutputOnly
   */
  lastRenewalTime?: Date;
  /**
   * Status of certificate management. Refers to the most recent certificate
   * acquisition or renewal attempt.@OutputOnly
   */
  status?:  | "MANAGEMENT_STATUS_UNSPECIFIED" | "OK" | "PENDING" | "FAILED_RETRYING_NOT_VISIBLE" | "FAILED_PERMANENT" | "FAILED_RETRYING_CAA_FORBIDDEN" | "FAILED_RETRYING_CAA_CHECKING";
}

function serializeManagedCertificate(data: any): ManagedCertificate {
  return {
    ...data,
    lastRenewalTime: data["lastRenewalTime"] !== undefined ? data["lastRenewalTime"].toISOString() : undefined,
  };
}

function deserializeManagedCertificate(data: any): ManagedCertificate {
  return {
    ...data,
    lastRenewalTime: data["lastRenewalTime"] !== undefined ? new Date(data["lastRenewalTime"]) : undefined,
  };
}

/**
 * A service with manual scaling runs continuously, allowing you to perform
 * complex initialization and rely on the state of its memory over time.
 */
export interface ManualScaling {
  /**
   * Number of instances to assign to the service at the start. This number can
   * later be altered by using the Modules API
   * (https://cloud.google.com/appengine/docs/python/modules/functions)
   * set_num_instances() function.
   */
  instances?: number;
}

/**
 * Extra network settings. Only applicable in the App Engine flexible
 * environment.
 */
export interface Network {
  /**
   * List of ports, or port pairs, to forward from the virtual machine to the
   * application container. Only applicable in the App Engine flexible
   * environment.
   */
  forwardedPorts?: string[];
  /**
   * The IP mode for instances. Only applicable in the App Engine flexible
   * environment.
   */
  instanceIpMode?:  | "INSTANCE_IP_MODE_UNSPECIFIED" | "EXTERNAL" | "INTERNAL";
  /**
   * Tag to apply to the instance during creation. Only applicable in the App
   * Engine flexible environment.
   */
  instanceTag?: string;
  /**
   * Google Compute Engine network where the virtual machines are created.
   * Specify the short name, not the resource path.Defaults to default.
   */
  name?: string;
  /**
   * Enable session affinity. Only applicable in the App Engine flexible
   * environment.
   */
  sessionAffinity?: boolean;
  /**
   * Google Cloud Platform sub-network where the virtual machines are created.
   * Specify the short name, not the resource path.If a subnetwork name is
   * specified, a network name will also be required unless it is for the
   * default network. If the network that the instance is being created in is a
   * Legacy network, then the IP address is allocated from the IPv4Range. If the
   * network that the instance is being created in is an auto Subnet Mode
   * Network, then only network name should be specified (not the
   * subnetwork_name) and the IP address is created from the IPCidrRange of the
   * subnetwork that exists in that zone for that network. If the network that
   * the instance is being created in is a custom Subnet Mode Network, then the
   * subnetwork_name must be specified and the IP address is created from the
   * IPCidrRange of the subnetwork.If specified, the subnetwork must exist in
   * the same region as the App Engine flexible environment application.
   */
  subnetworkName?: string;
}

/**
 * A NetworkSettings resource is a container for ingress settings for a version
 * or service.
 */
export interface NetworkSettings {
  /**
   * The ingress settings for version or service.
   */
  ingressTrafficAllowed?:  | "INGRESS_TRAFFIC_ALLOWED_UNSPECIFIED" | "INGRESS_TRAFFIC_ALLOWED_ALL" | "INGRESS_TRAFFIC_ALLOWED_INTERNAL_ONLY" | "INGRESS_TRAFFIC_ALLOWED_INTERNAL_AND_LB";
}

/**
 * Target scaling by network usage. Only applicable in the App Engine flexible
 * environment.
 */
export interface NetworkUtilization {
  /**
   * Target bytes received per second.
   */
  targetReceivedBytesPerSecond?: number;
  /**
   * Target packets received per second.
   */
  targetReceivedPacketsPerSecond?: number;
  /**
   * Target bytes sent per second.
   */
  targetSentBytesPerSecond?: number;
  /**
   * Target packets sent per second.
   */
  targetSentPacketsPerSecond?: number;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is false, it means the operation is still in progress. If
   * true, the operation is completed, and either error or response is
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
   * that originally returns it. If you use the default HTTP mapping, the name
   * should be a resource name ending with operations/{unique_id}.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as Delete, the response is
   * google.protobuf.Empty. If the original method is standard
   * Get/Create/Update, the response should be the resource. For other methods,
   * the response should have the type XxxResponse, where Xxx is the original
   * method name. For example, if the original method name is TakeSnapshot(),
   * the inferred response type is TakeSnapshotResponse.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Metadata for the given google.longrunning.Operation.
 */
export interface OperationMetadataV1 {
  createVersionMetadata?: CreateVersionMetadataV1;
  /**
   * Time that this operation completed.@OutputOnly
   */
  endTime?: Date;
  /**
   * Ephemeral message that may change every time the operation is polled.
   * @OutputOnly
   */
  ephemeralMessage?: string;
  /**
   * Time that this operation was created.@OutputOnly
   */
  insertTime?: Date;
  /**
   * API method that initiated this operation. Example:
   * google.appengine.v1.Versions.CreateVersion.@OutputOnly
   */
  method?: string;
  /**
   * Name of the resource that this operation is acting on. Example:
   * apps/myapp/services/default.@OutputOnly
   */
  target?: string;
  /**
   * User who requested this operation.@OutputOnly
   */
  user?: string;
  /**
   * Durable messages that persist on every operation poll. @OutputOnly
   */
  warning?: string[];
}

function serializeOperationMetadataV1(data: any): OperationMetadataV1 {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    insertTime: data["insertTime"] !== undefined ? data["insertTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadataV1(data: any): OperationMetadataV1 {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    insertTime: data["insertTime"] !== undefined ? new Date(data["insertTime"]) : undefined,
  };
}

/**
 * Metadata for the given google.longrunning.Operation.
 */
export interface OperationMetadataV1Alpha {
  createVersionMetadata?: CreateVersionMetadataV1Alpha;
  /**
   * Time that this operation completed.@OutputOnly
   */
  endTime?: Date;
  /**
   * Ephemeral message that may change every time the operation is polled.
   * @OutputOnly
   */
  ephemeralMessage?: string;
  /**
   * Time that this operation was created.@OutputOnly
   */
  insertTime?: Date;
  /**
   * API method that initiated this operation. Example:
   * google.appengine.v1alpha.Versions.CreateVersion.@OutputOnly
   */
  method?: string;
  /**
   * Name of the resource that this operation is acting on. Example:
   * apps/myapp/services/default.@OutputOnly
   */
  target?: string;
  /**
   * User who requested this operation.@OutputOnly
   */
  user?: string;
  /**
   * Durable messages that persist on every operation poll. @OutputOnly
   */
  warning?: string[];
}

function serializeOperationMetadataV1Alpha(data: any): OperationMetadataV1Alpha {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    insertTime: data["insertTime"] !== undefined ? data["insertTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadataV1Alpha(data: any): OperationMetadataV1Alpha {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    insertTime: data["insertTime"] !== undefined ? new Date(data["insertTime"]) : undefined,
  };
}

/**
 * Metadata for the given google.longrunning.Operation.
 */
export interface OperationMetadataV1Beta {
  createVersionMetadata?: CreateVersionMetadataV1Beta;
  /**
   * Time that this operation completed.@OutputOnly
   */
  endTime?: Date;
  /**
   * Ephemeral message that may change every time the operation is polled.
   * @OutputOnly
   */
  ephemeralMessage?: string;
  /**
   * Time that this operation was created.@OutputOnly
   */
  insertTime?: Date;
  /**
   * API method that initiated this operation. Example:
   * google.appengine.v1beta.Versions.CreateVersion.@OutputOnly
   */
  method?: string;
  /**
   * Name of the resource that this operation is acting on. Example:
   * apps/myapp/services/default.@OutputOnly
   */
  target?: string;
  /**
   * User who requested this operation.@OutputOnly
   */
  user?: string;
  /**
   * Durable messages that persist on every operation poll. @OutputOnly
   */
  warning?: string[];
}

function serializeOperationMetadataV1Beta(data: any): OperationMetadataV1Beta {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    insertTime: data["insertTime"] !== undefined ? data["insertTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadataV1Beta(data: any): OperationMetadataV1Beta {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    insertTime: data["insertTime"] !== undefined ? new Date(data["insertTime"]) : undefined,
  };
}

/**
 * The request sent to CLHs during project events.
 */
export interface ProjectEvent {
  /**
   * The unique ID for this project event. CLHs can use this value to dedup
   * repeated calls. required
   */
  eventId?: string;
  phase?:  | "UNKNOWN" | "BEFORE_RESOURCE_HANDLING" | "AFTER_RESOURCE_HANDLING";
  /**
   * The projects metadata for this project. required
   */
  projectMetadata?: ProjectsMetadata;
  /**
   * The state of the project that led to this event.
   */
  state?: ProjectState;
}

function serializeProjectEvent(data: any): ProjectEvent {
  return {
    ...data,
    projectMetadata: data["projectMetadata"] !== undefined ? serializeProjectsMetadata(data["projectMetadata"]) : undefined,
  };
}

function deserializeProjectEvent(data: any): ProjectEvent {
  return {
    ...data,
    projectMetadata: data["projectMetadata"] !== undefined ? deserializeProjectsMetadata(data["projectMetadata"]) : undefined,
  };
}

/**
 * ProjectsMetadata is the metadata CCFE stores about the all the relevant
 * projects (tenant, consumer, producer).
 */
export interface ProjectsMetadata {
  /**
   * The consumer project id.
   */
  consumerProjectId?: string;
  /**
   * The consumer project number.
   */
  consumerProjectNumber?: bigint;
  /**
   * The CCFE state of the consumer project. It is the same state that is
   * communicated to the CLH during project events. Notice that this field is
   * not set in the DB, it is only set in this proto when communicated to CLH in
   * the side channel.
   */
  consumerProjectState?:  | "UNKNOWN_STATE" | "ON" | "OFF" | "DELETED";
  /**
   * The service account authorized to operate on the consumer project. Note:
   * CCFE only propagates P4SA with default tag to CLH.
   */
  p4ServiceAccount?: string;
  /**
   * The producer project id.
   */
  producerProjectId?: string;
  /**
   * The producer project number.
   */
  producerProjectNumber?: bigint;
  /**
   * The tenant project id.
   */
  tenantProjectId?: string;
  /**
   * The tenant project number.
   */
  tenantProjectNumber?: bigint;
}

function serializeProjectsMetadata(data: any): ProjectsMetadata {
  return {
    ...data,
    consumerProjectNumber: data["consumerProjectNumber"] !== undefined ? String(data["consumerProjectNumber"]) : undefined,
    producerProjectNumber: data["producerProjectNumber"] !== undefined ? String(data["producerProjectNumber"]) : undefined,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? String(data["tenantProjectNumber"]) : undefined,
  };
}

function deserializeProjectsMetadata(data: any): ProjectsMetadata {
  return {
    ...data,
    consumerProjectNumber: data["consumerProjectNumber"] !== undefined ? BigInt(data["consumerProjectNumber"]) : undefined,
    producerProjectNumber: data["producerProjectNumber"] !== undefined ? BigInt(data["producerProjectNumber"]) : undefined,
    tenantProjectNumber: data["tenantProjectNumber"] !== undefined ? BigInt(data["tenantProjectNumber"]) : undefined,
  };
}

/**
 * ProjectState contains the externally-visible project state that is used to
 * communicate the state and reasoning for that state to the CLH. This data is
 * not persisted by CCFE, but is instead derived from CCFE's internal
 * representation of the project state.
 */
export interface ProjectState {
  currentReasons?: Reasons;
  /**
   * The previous and current reasons for a project state will be sent for a
   * project event. CLHs that need to know the signal that caused the project
   * event to trigger (edges) as opposed to just knowing the state can act upon
   * differences in the previous and current reasons.Reasons will be provided
   * for every system: service management, data governance, abuse, and
   * billing.If this is a CCFE-triggered event used for reconciliation then the
   * current reasons will be set to their *_CONTROL_PLANE_SYNC state. The
   * previous reasons will contain the last known set of non-unknown
   * non-control_plane_sync reasons for the state.Reasons fields are deprecated.
   * New tenants should only use the state field. If you must know the reason(s)
   * behind a specific state, please consult with CCFE team first
   * (cloud-ccfe-discuss@google.com).
   */
  previousReasons?: Reasons;
  /**
   * The current state of the project. This state is the culmination of all of
   * the opinions from external systems that CCFE knows about of the project.
   */
  state?:  | "UNKNOWN_STATE" | "ON" | "OFF" | "DELETED";
}

/**
 * Readiness checking configuration for VM instances. Unhealthy instances are
 * removed from traffic rotation.
 */
export interface ReadinessCheck {
  /**
   * A maximum time limit on application initialization, measured from moment
   * the application successfully replies to a healthcheck until it is ready to
   * serve traffic.
   */
  appStartTimeout?: number /* Duration */;
  /**
   * Interval between health checks.
   */
  checkInterval?: number /* Duration */;
  /**
   * Number of consecutive failed checks required before removing traffic.
   */
  failureThreshold?: number;
  /**
   * Host header to send when performing a HTTP Readiness check. Example:
   * "myapp.appspot.com"
   */
  host?: string;
  /**
   * The request path.
   */
  path?: string;
  /**
   * Number of consecutive successful checks required before receiving traffic.
   */
  successThreshold?: number;
  /**
   * Time before the check is considered failed.
   */
  timeout?: number /* Duration */;
}

function serializeReadinessCheck(data: any): ReadinessCheck {
  return {
    ...data,
    appStartTimeout: data["appStartTimeout"] !== undefined ? data["appStartTimeout"] : undefined,
    checkInterval: data["checkInterval"] !== undefined ? data["checkInterval"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeReadinessCheck(data: any): ReadinessCheck {
  return {
    ...data,
    appStartTimeout: data["appStartTimeout"] !== undefined ? data["appStartTimeout"] : undefined,
    checkInterval: data["checkInterval"] !== undefined ? data["checkInterval"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Projects transition between and within states based on reasons sent from
 * various systems. CCFE will provide the CLH with reasons for the current state
 * per system.The current systems that CCFE supports are: Service Management
 * (Inception) Data Governance (Wipeout) Abuse (Ares) Billing (Internal Cloud
 * Billing API)
 */
export interface Reasons {
  abuse?:  | "ABUSE_UNKNOWN_REASON" | "ABUSE_CONTROL_PLANE_SYNC" | "SUSPEND" | "REINSTATE";
  billing?:  | "BILLING_UNKNOWN_REASON" | "BILLING_CONTROL_PLANE_SYNC" | "PROBATION" | "CLOSE" | "OPEN";
  dataGovernance?:  | "DATA_GOVERNANCE_UNKNOWN_REASON" | "DATA_GOVERNANCE_CONTROL_PLANE_SYNC" | "HIDE" | "UNHIDE" | "PURGE";
  serviceManagement?:  | "SERVICE_MANAGEMENT_UNKNOWN_REASON" | "SERVICE_MANAGEMENT_CONTROL_PLANE_SYNC" | "ACTIVATION" | "PREPARE_DEACTIVATION" | "ABORT_DEACTIVATION" | "COMMIT_DEACTIVATION";
}

/**
 * Request message for 'Applications.RepairApplication'.
 */
export interface RepairApplicationRequest {
}

/**
 * Target scaling by request utilization. Only applicable in the App Engine
 * flexible environment.
 */
export interface RequestUtilization {
  /**
   * Target number of concurrent requests.
   */
  targetConcurrentRequests?: number;
  /**
   * Target requests per second.
   */
  targetRequestCountPerSecond?: number;
}

/**
 * A DNS resource record.
 */
export interface ResourceRecord {
  /**
   * Relative name of the object affected by this record. Only applicable for
   * CNAME records. Example: 'www'.
   */
  name?: string;
  /**
   * Data for this record. Values vary by record type, as defined in RFC 1035
   * (section 5) and RFC 1034 (section 3.6.1).
   */
  rrdata?: string;
  /**
   * Resource record type. Example: AAAA.
   */
  type?:  | "RECORD_TYPE_UNSPECIFIED" | "A" | "AAAA" | "CNAME";
}

/**
 * Machine resources for a version.
 */
export interface Resources {
  /**
   * Number of CPU cores needed.
   */
  cpu?: number;
  /**
   * Disk size (GB) needed.
   */
  diskGb?: number;
  /**
   * The name of the encryption key that is stored in Google Cloud KMS. Only
   * should be used by Cloud Composer to encrypt the vm disk
   */
  kmsKeyReference?: string;
  /**
   * Memory (GB) needed.
   */
  memoryGb?: number;
  /**
   * User specified volumes.
   */
  volumes?: Volume[];
}

/**
 * Executes a script to handle the request that matches the URL pattern.
 */
export interface ScriptHandler {
  /**
   * Path to the script from the application root directory.
   */
  scriptPath?: string;
}

/**
 * A Service resource is a logical component of an application that can share
 * state and communicate in a secure fashion with other services. For example,
 * an application that handles customer requests might include separate services
 * to handle tasks such as backend data analysis or API requests from mobile
 * devices. Each service has a collection of versions that define a specific set
 * of code used to implement the functionality of that service.
 */
export interface Service {
  /**
   * Relative name of the service within the application. Example:
   * default.@OutputOnly
   */
  id?: string;
  /**
   * A set of labels to apply to this service. Labels are key/value pairs that
   * describe the service and all resources that belong to it (e.g., versions).
   * The labels can be used to search and group resources, and are propagated to
   * the usage and billing reports, enabling fine-grain analysis of costs. An
   * example of using labels is to tag resources belonging to different
   * environments (e.g., "env=prod", "env=qa"). Label keys and values can be no
   * longer than 63 characters and can only contain lowercase letters, numeric
   * characters, underscores, dashes, and international characters. Label keys
   * must start with a lowercase letter or an international character. Each
   * service can have at most 32 labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Full path to the Service resource in the API. Example:
   * apps/myapp/services/default.@OutputOnly
   */
  name?: string;
  /**
   * Ingress settings for this service. Will apply to all versions.
   */
  networkSettings?: NetworkSettings;
  /**
   * Mapping that defines fractional HTTP traffic diversion to different
   * versions within the service.
   */
  split?: TrafficSplit;
}

/**
 * SSL configuration for a DomainMapping resource.
 */
export interface SslSettings {
  /**
   * ID of the AuthorizedCertificate resource configuring SSL for the
   * application. Clearing this field will remove SSL support.By default, a
   * managed certificate is automatically created for every domain mapping. To
   * omit SSL support or to configure SSL manually, specify
   * SslManagementType.MANUAL on a CREATE or UPDATE request. You must be
   * authorized to administer the AuthorizedCertificate resource to manually map
   * it to a DomainMapping resource. Example: 12345.
   */
  certificateId?: string;
  /**
   * ID of the managed AuthorizedCertificate resource currently being
   * provisioned, if applicable. Until the new managed certificate has been
   * successfully provisioned, the previous SSL state will be preserved. Once
   * the provisioning process completes, the certificate_id field will reflect
   * the new managed certificate and this field will be left empty. To remove
   * SSL support while there is still a pending managed certificate, clear the
   * certificate_id field with an UpdateDomainMappingRequest.@OutputOnly
   */
  pendingManagedCertificateId?: string;
  /**
   * SSL management type for this domain. If AUTOMATIC, a managed certificate
   * is automatically provisioned. If MANUAL, certificate_id must be manually
   * specified in order to configure SSL for this domain.
   */
  sslManagementType?:  | "SSL_MANAGEMENT_TYPE_UNSPECIFIED" | "AUTOMATIC" | "MANUAL";
}

/**
 * Scheduler settings for standard environment.
 */
export interface StandardSchedulerSettings {
  /**
   * Maximum number of instances to run for this version. Set to zero to
   * disable max_instances configuration.
   */
  maxInstances?: number;
  /**
   * Minimum number of instances to run for this version. Set to zero to
   * disable min_instances configuration.
   */
  minInstances?: number;
  /**
   * Target CPU utilization ratio to maintain when scaling.
   */
  targetCpuUtilization?: number;
  /**
   * Target throughput utilization ratio to maintain when scaling
   */
  targetThroughputUtilization?: number;
}

/**
 * Files served directly to the user for a given URL, such as images, CSS
 * stylesheets, or JavaScript source files. Static file handlers describe which
 * files in the application directory are static files, and which URLs serve
 * them.
 */
export interface StaticFilesHandler {
  /**
   * Whether files should also be uploaded as code data. By default, files
   * declared in static file handlers are uploaded as static data and are only
   * served to end users; they cannot be read by the application. If enabled,
   * uploads are charged against both your code and static data storage resource
   * quotas.
   */
  applicationReadable?: boolean;
  /**
   * Time a static file served by this handler should be cached by web proxies
   * and browsers.
   */
  expiration?: number /* Duration */;
  /**
   * HTTP headers to use for all responses from these URLs.
   */
  httpHeaders?: {
    [key: string]: string
  };
  /**
   * MIME type used to serve all files served by this handler.Defaults to
   * file-specific MIME types, which are derived from each file's filename
   * extension.
   */
  mimeType?: string;
  /**
   * Path to the static files matched by the URL pattern, from the application
   * root directory. The path can refer to text matched in groupings in the URL
   * pattern.
   */
  path?: string;
  /**
   * Whether this handler should match the request if the file referenced by
   * the handler does not exist.
   */
  requireMatchingFile?: boolean;
  /**
   * Regular expression that matches the file paths for all files that should
   * be referenced by this handler.
   */
  uploadPathRegex?: string;
}

function serializeStaticFilesHandler(data: any): StaticFilesHandler {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? data["expiration"] : undefined,
  };
}

function deserializeStaticFilesHandler(data: any): StaticFilesHandler {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? data["expiration"] : undefined,
  };
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
 * Traffic routing configuration for versions within a single service. Traffic
 * splits define how traffic directed to the service is assigned to versions.
 */
export interface TrafficSplit {
  /**
   * Mapping from version IDs within the service to fractional (0.000, 1]
   * allocations of traffic for that version. Each version can be specified only
   * once, but some versions in the service may not have any traffic allocation.
   * Services that have traffic allocated cannot be deleted until either the
   * service is deleted or their traffic allocation is removed. Allocations must
   * sum to 1. Up to two decimal place precision is supported for IP-based
   * splits and up to three decimal places is supported for cookie-based splits.
   */
  allocations?: {
    [key: string]: number
  };
  /**
   * Mechanism used to determine which version a request is sent to. The
   * traffic selection algorithm will be stable for either type until
   * allocations are changed.
   */
  shardBy?:  | "UNSPECIFIED" | "COOKIE" | "IP" | "RANDOM";
}

/**
 * Rules to match an HTTP request and dispatch that request to a service.
 */
export interface UrlDispatchRule {
  /**
   * Domain name to match against. The wildcard "*" is supported if specified
   * before a period: "*.".Defaults to matching all domains: "*".
   */
  domain?: string;
  /**
   * Pathname within the host. Must start with a "/". A single "*" can be
   * included at the end of the path.The sum of the lengths of the domain and
   * path may not exceed 100 characters.
   */
  path?: string;
  /**
   * Resource ID of a service in this application that should serve the matched
   * request. The service must already exist. Example: default.
   */
  service?: string;
}

/**
 * URL pattern and description of how the URL should be handled. App Engine can
 * handle URLs by executing application code or by serving static files uploaded
 * with the version, such as images, CSS, or JavaScript.
 */
export interface UrlMap {
  /**
   * Uses API Endpoints to handle requests.
   */
  apiEndpoint?: ApiEndpointHandler;
  /**
   * Action to take when users access resources that require authentication.
   * Defaults to redirect.
   */
  authFailAction?:  | "AUTH_FAIL_ACTION_UNSPECIFIED" | "AUTH_FAIL_ACTION_REDIRECT" | "AUTH_FAIL_ACTION_UNAUTHORIZED";
  /**
   * Level of login required to access this resource. Not supported for Node.js
   * in the App Engine standard environment.
   */
  login?:  | "LOGIN_UNSPECIFIED" | "LOGIN_OPTIONAL" | "LOGIN_ADMIN" | "LOGIN_REQUIRED";
  /**
   * 30x code to use when performing redirects for the secure field. Defaults
   * to 302.
   */
  redirectHttpResponseCode?:  | "REDIRECT_HTTP_RESPONSE_CODE_UNSPECIFIED" | "REDIRECT_HTTP_RESPONSE_CODE_301" | "REDIRECT_HTTP_RESPONSE_CODE_302" | "REDIRECT_HTTP_RESPONSE_CODE_303" | "REDIRECT_HTTP_RESPONSE_CODE_307";
  /**
   * Executes a script to handle the requests that match this URL pattern. Only
   * the auto value is supported for Node.js in the App Engine standard
   * environment, for example "script": "auto".
   */
  script?: ScriptHandler;
  /**
   * Security (HTTPS) enforcement for this URL.
   */
  securityLevel?:  | "SECURE_UNSPECIFIED" | "SECURE_DEFAULT" | "SECURE_NEVER" | "SECURE_OPTIONAL" | "SECURE_ALWAYS";
  /**
   * Returns the contents of a file, such as an image, as the response.
   */
  staticFiles?: StaticFilesHandler;
  /**
   * URL prefix. Uses regular expression syntax, which means regexp special
   * characters must be escaped, but should not contain groupings. All URLs that
   * begin with this prefix are handled by this handler, using the portion of
   * the URL after the prefix as part of the file path.
   */
  urlRegex?: string;
}

function serializeUrlMap(data: any): UrlMap {
  return {
    ...data,
    staticFiles: data["staticFiles"] !== undefined ? serializeStaticFilesHandler(data["staticFiles"]) : undefined,
  };
}

function deserializeUrlMap(data: any): UrlMap {
  return {
    ...data,
    staticFiles: data["staticFiles"] !== undefined ? deserializeStaticFilesHandler(data["staticFiles"]) : undefined,
  };
}

/**
 * A Version resource is a specific set of source code and configuration files
 * that are deployed into a service.
 */
export interface Version {
  /**
   * Serving configuration for Google Cloud Endpoints
   * (https://cloud.google.com/endpoints).Only returned in GET requests if
   * view=FULL is set.
   */
  apiConfig?: ApiConfigHandler;
  /**
   * Allows App Engine second generation runtimes to access the legacy bundled
   * services.
   */
  appEngineApis?: boolean;
  /**
   * Automatic scaling is based on request rate, response latencies, and other
   * application metrics. Instances are dynamically created and destroyed as
   * needed in order to handle traffic.
   */
  automaticScaling?: AutomaticScaling;
  /**
   * A service with basic scaling will create an instance when the application
   * receives a request. The instance will be turned down when the app becomes
   * idle. Basic scaling is ideal for work that is intermittent or driven by
   * user activity.
   */
  basicScaling?: BasicScaling;
  /**
   * Metadata settings that are supplied to this version to enable beta runtime
   * features.
   */
  betaSettings?: {
    [key: string]: string
  };
  /**
   * Environment variables available to the build environment.Only returned in
   * GET requests if view=FULL is set.
   */
  buildEnvVariables?: {
    [key: string]: string
  };
  /**
   * Email address of the user who created this version.@OutputOnly
   */
  createdBy?: string;
  /**
   * Time that this version was created.@OutputOnly
   */
  createTime?: Date;
  /**
   * Duration that static files should be cached by web proxies and browsers.
   * Only applicable if the corresponding StaticFilesHandler
   * (https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions#StaticFilesHandler)
   * does not specify its own expiration time.Only returned in GET requests if
   * view=FULL is set.
   */
  defaultExpiration?: number /* Duration */;
  /**
   * Code and application artifacts that make up this version.Only returned in
   * GET requests if view=FULL is set.
   */
  deployment?: Deployment;
  /**
   * Total size in bytes of all the files that are included in this version and
   * currently hosted on the App Engine disk.@OutputOnly
   */
  diskUsageBytes?: bigint;
  /**
   * Cloud Endpoints configuration.If endpoints_api_service is set, the Cloud
   * Endpoints Extensible Service Proxy will be provided to serve the API
   * implemented by the app.
   */
  endpointsApiService?: EndpointsApiService;
  /**
   * The entrypoint for the application.
   */
  entrypoint?: Entrypoint;
  /**
   * App Engine execution environment for this version.Defaults to standard.
   */
  env?: string;
  /**
   * Environment variables available to the application.Only returned in GET
   * requests if view=FULL is set.
   */
  envVariables?: {
    [key: string]: string
  };
  /**
   * Custom static error pages. Limited to 10KB per page.Only returned in GET
   * requests if view=FULL is set.
   */
  errorHandlers?: ErrorHandler[];
  /**
   * Settings for App Engine flexible runtimes.
   */
  flexibleRuntimeSettings?: FlexibleRuntimeSettings;
  /**
   * An ordered list of URL-matching patterns that should be applied to
   * incoming requests. The first matching URL handles the request and other
   * request handlers are not attempted.Only returned in GET requests if
   * view=FULL is set.
   */
  handlers?: UrlMap[];
  /**
   * Configures health checking for instances. Unhealthy instances are stopped
   * and replaced with new instances. Only applicable in the App Engine flexible
   * environment.Only returned in GET requests if view=FULL is set.
   */
  healthCheck?: HealthCheck;
  /**
   * Relative name of the version within the service. Example: v1. Version
   * names can contain only lowercase letters, numbers, or hyphens. Reserved
   * names: "default", "latest", and any name with the prefix "ah-".
   */
  id?: string;
  /**
   * Before an application can receive email or XMPP messages, the application
   * must be configured to enable the service.
   */
  inboundServices?:  | "INBOUND_SERVICE_UNSPECIFIED" | "INBOUND_SERVICE_MAIL" | "INBOUND_SERVICE_MAIL_BOUNCE" | "INBOUND_SERVICE_XMPP_ERROR" | "INBOUND_SERVICE_XMPP_MESSAGE" | "INBOUND_SERVICE_XMPP_SUBSCRIBE" | "INBOUND_SERVICE_XMPP_PRESENCE" | "INBOUND_SERVICE_CHANNEL_PRESENCE" | "INBOUND_SERVICE_WARMUP"[];
  /**
   * Instance class that is used to run this version. Valid values are:
   * AutomaticScaling: F1, F2, F4, F4_1G ManualScaling or BasicScaling: B1, B2,
   * B4, B8, B4_1GDefaults to F1 for AutomaticScaling and B1 for ManualScaling
   * or BasicScaling.
   */
  instanceClass?: string;
  /**
   * Configuration for third-party Python runtime libraries that are required
   * by the application.Only returned in GET requests if view=FULL is set.
   */
  libraries?: Library[];
  /**
   * Configures liveness health checking for instances. Unhealthy instances are
   * stopped and replaced with new instancesOnly returned in GET requests if
   * view=FULL is set.
   */
  livenessCheck?: LivenessCheck;
  /**
   * A service with manual scaling runs continuously, allowing you to perform
   * complex initialization and rely on the state of its memory over time.
   * Manually scaled versions are sometimes referred to as "backends".
   */
  manualScaling?: ManualScaling;
  /**
   * Full path to the Version resource in the API. Example:
   * apps/myapp/services/default/versions/v1.@OutputOnly
   */
  name?: string;
  /**
   * Extra network settings. Only applicable in the App Engine flexible
   * environment.
   */
  network?: Network;
  /**
   * Files that match this pattern will not be built into this version. Only
   * applicable for Go runtimes.Only returned in GET requests if view=FULL is
   * set.
   */
  nobuildFilesRegex?: string;
  /**
   * Configures readiness health checking for instances. Unhealthy instances
   * are not put into the backend traffic rotation.Only returned in GET requests
   * if view=FULL is set.
   */
  readinessCheck?: ReadinessCheck;
  /**
   * Machine resources for this version. Only applicable in the App Engine
   * flexible environment.
   */
  resources?: Resources;
  /**
   * Desired runtime. Example: python27.
   */
  runtime?: string;
  /**
   * The version of the API in the given runtime environment. Please see the
   * app.yaml reference for valid values at
   * https://cloud.google.com/appengine/docs/standard//config/appref
   */
  runtimeApiVersion?: string;
  /**
   * The channel of the runtime to use. Only available for some runtimes.
   * Defaults to the default channel.
   */
  runtimeChannel?: string;
  /**
   * The path or name of the app's main executable.
   */
  runtimeMainExecutablePath?: string;
  /**
   * The identity that the deployed version will run as. Admin API will use the
   * App Engine Appspot service account as default if this field is neither
   * provided in app.yaml file nor through CLI flag.
   */
  serviceAccount?: string;
  /**
   * Current serving status of this version. Only the versions with a SERVING
   * status create instances and can be billed.SERVING_STATUS_UNSPECIFIED is an
   * invalid value. Defaults to SERVING.
   */
  servingStatus?:  | "SERVING_STATUS_UNSPECIFIED" | "SERVING" | "STOPPED";
  /**
   * Whether multiple requests can be dispatched to this version at once.
   */
  threadsafe?: boolean;
  /**
   * Serving URL for this version. Example:
   * "https://myversion-dot-myservice-dot-myapp.appspot.com"@OutputOnly
   */
  versionUrl?: string;
  /**
   * Whether to deploy this version in a container on a virtual machine.
   */
  vm?: boolean;
  /**
   * Enables VPC connectivity for standard apps.
   */
  vpcAccessConnector?: VpcAccessConnector;
  /**
   * The Google Compute Engine zones that are supported by this version in the
   * App Engine flexible environment. Deprecated.
   */
  zones?: string[];
}

function serializeVersion(data: any): Version {
  return {
    ...data,
    automaticScaling: data["automaticScaling"] !== undefined ? serializeAutomaticScaling(data["automaticScaling"]) : undefined,
    basicScaling: data["basicScaling"] !== undefined ? serializeBasicScaling(data["basicScaling"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    defaultExpiration: data["defaultExpiration"] !== undefined ? data["defaultExpiration"] : undefined,
    deployment: data["deployment"] !== undefined ? serializeDeployment(data["deployment"]) : undefined,
    diskUsageBytes: data["diskUsageBytes"] !== undefined ? String(data["diskUsageBytes"]) : undefined,
    handlers: data["handlers"] !== undefined ? data["handlers"].map((item: any) => (serializeUrlMap(item))) : undefined,
    healthCheck: data["healthCheck"] !== undefined ? serializeHealthCheck(data["healthCheck"]) : undefined,
    livenessCheck: data["livenessCheck"] !== undefined ? serializeLivenessCheck(data["livenessCheck"]) : undefined,
    readinessCheck: data["readinessCheck"] !== undefined ? serializeReadinessCheck(data["readinessCheck"]) : undefined,
  };
}

function deserializeVersion(data: any): Version {
  return {
    ...data,
    automaticScaling: data["automaticScaling"] !== undefined ? deserializeAutomaticScaling(data["automaticScaling"]) : undefined,
    basicScaling: data["basicScaling"] !== undefined ? deserializeBasicScaling(data["basicScaling"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    defaultExpiration: data["defaultExpiration"] !== undefined ? data["defaultExpiration"] : undefined,
    deployment: data["deployment"] !== undefined ? deserializeDeployment(data["deployment"]) : undefined,
    diskUsageBytes: data["diskUsageBytes"] !== undefined ? BigInt(data["diskUsageBytes"]) : undefined,
    handlers: data["handlers"] !== undefined ? data["handlers"].map((item: any) => (deserializeUrlMap(item))) : undefined,
    healthCheck: data["healthCheck"] !== undefined ? deserializeHealthCheck(data["healthCheck"]) : undefined,
    livenessCheck: data["livenessCheck"] !== undefined ? deserializeLivenessCheck(data["livenessCheck"]) : undefined,
    readinessCheck: data["readinessCheck"] !== undefined ? deserializeReadinessCheck(data["readinessCheck"]) : undefined,
  };
}

/**
 * Volumes mounted within the app container. Only applicable in the App Engine
 * flexible environment.
 */
export interface Volume {
  /**
   * Unique name for the volume.
   */
  name?: string;
  /**
   * Volume size in gigabytes.
   */
  sizeGb?: number;
  /**
   * Underlying volume type, e.g. 'tmpfs'.
   */
  volumeType?: string;
}

/**
 * VPC access connector specification.
 */
export interface VpcAccessConnector {
  /**
   * The egress setting for the connector, controlling what traffic is diverted
   * through it.
   */
  egressSetting?:  | "EGRESS_SETTING_UNSPECIFIED" | "ALL_TRAFFIC" | "PRIVATE_IP_RANGES";
  /**
   * Full Serverless VPC Access Connector name e.g.
   * /projects/my-project/locations/us-central1/connectors/c1.
   */
  name?: string;
}

/**
 * The zip file information for a zip deployment.
 */
export interface ZipInfo {
  /**
   * An estimate of the number of files in a zip for a zip deployment. If set,
   * must be greater than or equal to the actual number of files. Used for
   * optimizing performance; if not provided, deployment may be slow.
   */
  filesCount?: number;
  /**
   * URL of the zip file to deploy from. Must be a URL to a resource in Google
   * Cloud Storage in the form 'http(s)://storage.googleapis.com//'.
   */
  sourceUrl?: string;
}