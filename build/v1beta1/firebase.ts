// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Firebase Management API Client for Deno
 * =======================================
 * 
 * The Firebase Management API enables programmatic setup and management of Firebase projects, including a project's Firebase resources and Firebase apps.
 * 
 * Docs: https://firebase.google.com
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Firebase Management API enables programmatic setup and management of
 * Firebase projects, including a project's Firebase resources and Firebase
 * apps.
 */
export class Firebase {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://firebase.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists each [Google Cloud Platform (GCP) `Project`]
   * (https://cloud.google.com/resource-manager/reference/rest/v1/projects) that
   * can have Firebase resources added to it. A Project will only be listed if:
   * - The caller has sufficient [Google IAM](https://cloud.google.com/iam)
   * permissions to call AddFirebase. - The Project is not already a
   * FirebaseProject. - The Project is not in an Organization which has policies
   * that prevent Firebase resources from being added.
   *
   */
  async availableProjectsList(opts: AvailableProjectsListOptions = {}): Promise<ListAvailableProjectsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/availableProjects`);
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
    return data as ListAvailableProjectsResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Adds Firebase resources to the specified existing [Google Cloud Platform
   * (GCP) `Project`]
   * (https://cloud.google.com/resource-manager/reference/rest/v1/projects).
   * Since a FirebaseProject is actually also a GCP `Project`, a
   * `FirebaseProject` has the same underlying GCP identifiers (`projectNumber`
   * and `projectId`). This allows for easy interop with Google APIs. The result
   * of this call is an [`Operation`](../../v1beta1/operations). Poll the
   * `Operation` to track the provisioning process by calling GetOperation until
   * [`done`](../../v1beta1/operations#Operation.FIELDS.done) is `true`. When
   * `done` is `true`, the `Operation` has either succeeded or failed. If the
   * `Operation` succeeded, its
   * [`response`](../../v1beta1/operations#Operation.FIELDS.response) is set to
   * a FirebaseProject; if the `Operation` failed, its
   * [`error`](../../v1beta1/operations#Operation.FIELDS.error) is set to a
   * google.rpc.Status. The `Operation` is automatically deleted after
   * completion, so there is no need to call DeleteOperation. This method does
   * not modify any billing account information on the underlying GCP `Project`.
   * To call `AddFirebase`, a project member or service account must have the
   * following permissions (the IAM roles of Editor and Owner contain these
   * permissions): `firebase.projects.update`, `resourcemanager.projects.get`,
   * `serviceusage.services.enable`, and `serviceusage.services.get`.
   *
   * @param project The resource name of the GCP `Project` to which Firebase resources will be added, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. After calling `AddFirebase`, the unique Project identifiers ( [`projectNumber`](https://cloud.google.com/resource-manager/reference/rest/v1/projects#Project.FIELDS.project_number) and [`projectId`](https://cloud.google.com/resource-manager/reference/rest/v1/projects#Project.FIELDS.project_id)) of the underlying GCP `Project` are also the identifiers of the FirebaseProject.
   */
  async projectsAddFirebase(project: string, req: AddFirebaseRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ project }:addFirebase`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Links the specified FirebaseProject with an existing [Google Analytics
   * account](http://www.google.com/analytics/). Using this call, you can
   * either: - Specify an `analyticsAccountId` to provision a new Google
   * Analytics property within the specified account and associate the new
   * property with the `FirebaseProject`. - Specify an existing
   * `analyticsPropertyId` to associate the property with the `FirebaseProject`.
   * Note that when you call `AddGoogleAnalytics`: 1. The first check determines
   * if any existing data streams in the Google Analytics property correspond to
   * any existing Firebase Apps in the `FirebaseProject` (based on the
   * `packageName` or `bundleId` associated with the data stream). Then, as
   * applicable, the data streams and apps are linked. Note that this
   * auto-linking only applies to `AndroidApps` and `IosApps`. 2. If no
   * corresponding data streams are found for the Firebase Apps, new data
   * streams are provisioned in the Google Analytics property for each of the
   * Firebase Apps. Note that a new data stream is always provisioned for a Web
   * App even if it was previously associated with a data stream in the
   * Analytics property. Learn more about the hierarchy and structure of Google
   * Analytics accounts in the [Analytics
   * documentation](https://support.google.com/analytics/answer/9303323). The
   * result of this call is an [`Operation`](../../v1beta1/operations). Poll the
   * `Operation` to track the provisioning process by calling GetOperation until
   * [`done`](../../v1beta1/operations#Operation.FIELDS.done) is `true`. When
   * `done` is `true`, the `Operation` has either succeeded or failed. If the
   * `Operation` succeeded, its
   * [`response`](../../v1beta1/operations#Operation.FIELDS.response) is set to
   * an AnalyticsDetails; if the `Operation` failed, its
   * [`error`](../../v1beta1/operations#Operation.FIELDS.error) is set to a
   * google.rpc.Status. To call `AddGoogleAnalytics`, a project member must be
   * an Owner for the existing `FirebaseProject` and have the [`Edit`
   * permission](https://support.google.com/analytics/answer/2884495) for the
   * Google Analytics account. If the `FirebaseProject` already has Google
   * Analytics enabled, and you call `AddGoogleAnalytics` using an
   * `analyticsPropertyId` that's different from the currently associated
   * property, then the call will fail. Analytics may have already been enabled
   * in the Firebase console or by specifying `timeZone` and `regionCode` in the
   * call to [`AddFirebase`](../../v1beta1/projects/addFirebase).
   *
   * @param parent The resource name of the FirebaseProject to link to an existing Google Analytics account, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsAddGoogleAnalytics(parent: string, req: AddGoogleAnalyticsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }:addGoogleAnalytics`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Requests the creation of a new AndroidApp in the specified
   * FirebaseProject. The result of this call is an `Operation` which can be
   * used to track the provisioning process. The `Operation` is automatically
   * deleted after completion, so there is no need to call `DeleteOperation`.
   *
   * @param parent The resource name of the parent FirebaseProject in which to create an AndroidApp, in the format: projects/PROJECT_IDENTIFIER/androidApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsAndroidAppsCreate(parent: string, req: AndroidApp): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/androidApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the specified AndroidApp.
   *
   * @param name The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsAndroidAppsGet(name: string): Promise<AndroidApp> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AndroidApp;
  }

  /**
   * Gets the configuration artifact associated with the specified AndroidApp.
   *
   * @param name The resource name of the AndroidApp configuration to download, in the format: projects/PROJECT_IDENTIFIER/androidApps/APP_ID/config Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsAndroidAppsGetConfig(name: string): Promise<AndroidAppConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAndroidAppConfig(data);
  }

  /**
   * Lists each AndroidApp associated with the specified FirebaseProject. The
   * elements are returned in no particular order, but will be a consistent view
   * of the Apps when additional requests are made with a `pageToken`.
   *
   * @param parent The resource name of the parent FirebaseProject for which to list each associated AndroidApp, in the format: projects/PROJECT_IDENTIFIER /androidApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsAndroidAppsList(parent: string, opts: ProjectsAndroidAppsListOptions = {}): Promise<ListAndroidAppsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/androidApps`);
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
    return data as ListAndroidAppsResponse;
  }

  /**
   * Updates the attributes of the specified AndroidApp.
   *
   * @param name The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.androidApps#AndroidApp.FIELDS.app_id)).
   */
  async projectsAndroidAppsPatch(name: string, req: AndroidApp, opts: ProjectsAndroidAppsPatchOptions = {}): Promise<AndroidApp> {
    opts = serializeProjectsAndroidAppsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as AndroidApp;
  }

  /**
   * Removes the specified AndroidApp from the FirebaseProject.
   *
   * @param name Required. The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the AndroidApp [name](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsAndroidAppsRemove(name: string, req: RemoveAndroidAppRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:remove`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Adds a ShaCertificate to the specified AndroidApp.
   *
   * @param parent The resource name of the parent AndroidApp to which to add a ShaCertificate, in the format: projects/PROJECT_IDENTIFIER/androidApps/ APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsAndroidAppsShaCreate(parent: string, req: ShaCertificate): Promise<ShaCertificate> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/sha`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ShaCertificate;
  }

  /**
   * Removes a ShaCertificate from the specified AndroidApp.
   *
   * @param name The resource name of the ShaCertificate to remove from the parent AndroidApp, in the format: projects/PROJECT_IDENTIFIER/androidApps/APP_ID /sha/SHA_HASH Refer to the `ShaCertificate` [`name`](../projects.androidApps.sha#ShaCertificate.FIELDS.name) field for details about PROJECT_IDENTIFIER, APP_ID, and SHA_HASH values. You can obtain the full resource name of the `ShaCertificate` from the response of [`ListShaCertificates`](../projects.androidApps.sha/list) or the original [`CreateShaCertificate`](../projects.androidApps.sha/create).
   */
  async projectsAndroidAppsShaDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the SHA-1 and SHA-256 certificates for the specified AndroidApp.
   *
   * @param parent The resource name of the parent AndroidApp for which to list each associated ShaCertificate, in the format: projects/PROJECT_IDENTIFIER /androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the `AndroidApp` [`name`](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsAndroidAppsShaList(parent: string): Promise<ListShaCertificatesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/sha`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListShaCertificatesResponse;
  }

  /**
   * Restores the specified AndroidApp to the FirebaseProject.
   *
   * @param name Required. The resource name of the AndroidApp, in the format: projects/ PROJECT_IDENTIFIER/androidApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/androidApps/APP_ID Refer to the AndroidApp [name](../projects.androidApps#AndroidApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsAndroidAppsUndelete(name: string, req: UndeleteAndroidAppRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists the valid Google Cloud Platform (GCP) resource locations for the
   * specified Project (including a FirebaseProject). One of these locations can
   * be selected as the Project's [_default_ GCP resource
   * location](https://firebase.google.com/docs/projects/locations), which is
   * the geographical location where the Project's resources, such as Cloud
   * Firestore, will be provisioned by default. However, if the default GCP
   * resource location has already been set for the Project, then this setting
   * cannot be changed. This call checks for any possible [location
   * restrictions](https://cloud.google.com/resource-manager/docs/organization-policy/defining-locations)
   * for the specified Project and, thus, might return a subset of all possible
   * GCP resource locations. To list all GCP resource locations (regardless of
   * any restrictions), call the endpoint without specifying a unique project
   * identifier (that is,
   * `/v1beta1/{parent=projects/-}/listAvailableLocations`). To call
   * `ListAvailableLocations` with a specified project, a member must be at
   * minimum a Viewer of the Project. Calls without a specified project do not
   * require any specific project permissions.
   *
   * @param parent The FirebaseProject for which to list GCP resource locations, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values. If no unique project identifier is specified (that is, `projects/-`), the returned list does not take into account org-specific or project-specific location restrictions.
   */
  async projectsAvailableLocationsList(parent: string, opts: ProjectsAvailableLocationsListOptions = {}): Promise<ListAvailableLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/availableLocations`);
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
    return data as ListAvailableLocationsResponse;
  }

  /**
   * Sets the default Google Cloud Platform (GCP) resource location for the
   * specified FirebaseProject. This method creates an App Engine application
   * with a [default Cloud Storage
   * bucket](https://cloud.google.com/appengine/docs/standard/python/googlecloudstorageclient/setting-up-cloud-storage#activating_a_cloud_storage_bucket),
   * located in the specified
   * [`locationId`](#body.request_body.FIELDS.location_id). This location must
   * be one of the available [GCP resource
   * locations](https://firebase.google.com/docs/projects/locations). After the
   * default GCP resource location is finalized, or if it was already set, it
   * cannot be changed. The default GCP resource location for the specified
   * `FirebaseProject` might already be set because either the underlying GCP
   * `Project` already has an App Engine application or
   * `FinalizeDefaultLocation` was previously called with a specified
   * `locationId`. Any new calls to `FinalizeDefaultLocation` with a *different*
   * specified `locationId` will return a 409 error. The result of this call is
   * an [`Operation`](../../v1beta1/operations), which can be used to track the
   * provisioning process. The
   * [`response`](../../v1beta1/operations#Operation.FIELDS.response) type of
   * the `Operation` is google.protobuf.Empty. The `Operation` can be polled by
   * its `name` using GetOperation until `done` is true. When `done` is true,
   * the `Operation` has either succeeded or failed. If the `Operation` has
   * succeeded, its
   * [`response`](../../v1beta1/operations#Operation.FIELDS.response) will be
   * set to a google.protobuf.Empty; if the `Operation` has failed, its `error`
   * will be set to a google.rpc.Status. The `Operation` is automatically
   * deleted after completion, so there is no need to call DeleteOperation. All
   * fields listed in the [request body](#request-body) are required. To call
   * `FinalizeDefaultLocation`, a member must be an Owner of the Project.
   *
   * @param parent The resource name of the FirebaseProject for which the default GCP resource location will be set, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsDefaultLocationFinalize(parent: string, req: FinalizeDefaultLocationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/defaultLocation:finalize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the specified FirebaseProject.
   *
   * @param name The resource name of the FirebaseProject, in the format: projects/ PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsGet(name: string): Promise<FirebaseProject> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FirebaseProject;
  }

  /**
   * Gets the configuration artifact associated with the specified
   * FirebaseProject, which can be used by servers to simplify initialization.
   * Typically, this configuration is used with the Firebase Admin SDK
   * [initializeApp](https://firebase.google.com/docs/admin/setup#initialize_the_sdk)
   * command.
   *
   * @param name The resource name of the FirebaseProject, in the format: projects/ PROJECT_IDENTIFIER/adminSdkConfig Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsGetAdminSdkConfig(name: string): Promise<AdminSdkConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AdminSdkConfig;
  }

  /**
   * Gets the Google Analytics details currently associated with the specified
   * FirebaseProject. If the `FirebaseProject` is not yet linked to Google
   * Analytics, then the response to `GetAnalyticsDetails` is `NOT_FOUND`.
   *
   * @param name The resource name of the FirebaseProject, in the format: projects/ PROJECT_IDENTIFIER/analyticsDetails Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsGetAnalyticsDetails(name: string): Promise<AnalyticsDetails> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAnalyticsDetails(data);
  }

  /**
   * Requests the creation of a new IosApp in the specified FirebaseProject.
   * The result of this call is an `Operation` which can be used to track the
   * provisioning process. The `Operation` is automatically deleted after
   * completion, so there is no need to call `DeleteOperation`.
   *
   * @param parent The resource name of the parent FirebaseProject in which to create an IosApp, in the format: projects/PROJECT_IDENTIFIER/iosApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsIosAppsCreate(parent: string, req: IosApp): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/iosApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the specified IosApp.
   *
   * @param name The resource name of the IosApp, in the format: projects/PROJECT_IDENTIFIER /iosApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the `IosApp` [`name`](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsIosAppsGet(name: string): Promise<IosApp> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as IosApp;
  }

  /**
   * Gets the configuration artifact associated with the specified IosApp.
   *
   * @param name The resource name of the App configuration to download, in the format: projects/PROJECT_IDENTIFIER/iosApps/APP_ID/config Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the `IosApp` [`name`](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsIosAppsGetConfig(name: string): Promise<IosAppConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeIosAppConfig(data);
  }

  /**
   * Lists each IosApp associated with the specified FirebaseProject. The
   * elements are returned in no particular order, but will be a consistent view
   * of the Apps when additional requests are made with a `pageToken`.
   *
   * @param parent The resource name of the parent FirebaseProject for which to list each associated IosApp, in the format: projects/PROJECT_IDENTIFIER/iosApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsIosAppsList(parent: string, opts: ProjectsIosAppsListOptions = {}): Promise<ListIosAppsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/iosApps`);
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
    return data as ListIosAppsResponse;
  }

  /**
   * Updates the attributes of the specified IosApp.
   *
   * @param name The resource name of the IosApp, in the format: projects/PROJECT_IDENTIFIER /iosApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.iosApps#IosApp.FIELDS.app_id)).
   */
  async projectsIosAppsPatch(name: string, req: IosApp, opts: ProjectsIosAppsPatchOptions = {}): Promise<IosApp> {
    opts = serializeProjectsIosAppsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as IosApp;
  }

  /**
   * Removes the specified IosApp from the FirebaseProject.
   *
   * @param name Required. The resource name of the IosApp, in the format: projects/ PROJECT_IDENTIFIER/iosApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the IosApp [name](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsIosAppsRemove(name: string, req: RemoveIosAppRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:remove`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Restores the specified IosApp to the FirebaseProject.
   *
   * @param name Required. The resource name of the IosApp, in the format: projects/ PROJECT_IDENTIFIER/iosApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/iosApps/APP_ID Refer to the IosApp [name](../projects.iosApps#IosApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsIosAppsUndelete(name: string, req: UndeleteIosAppRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists each FirebaseProject accessible to the caller. The elements are
   * returned in no particular order, but they will be a consistent view of the
   * Projects when additional requests are made with a `pageToken`. This method
   * is eventually consistent with Project mutations, which means newly
   * provisioned Projects and recent modifications to existing Projects might
   * not be reflected in the set of Projects. The list will include only ACTIVE
   * Projects. Use GetFirebaseProject for consistent reads as well as for
   * additional Project details.
   *
   */
  async projectsList(opts: ProjectsListOptions = {}): Promise<ListFirebaseProjectsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/projects`);
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
    return data as ListFirebaseProjectsResponse;
  }

  /**
   * Updates the attributes of the specified FirebaseProject. All [query
   * parameters](#query-parameters) are required.
   *
   * @param name The resource name of the Project, in the format: projects/PROJECT_IDENTIFIER PROJECT_IDENTIFIER: the Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`.
   */
  async projectsPatch(name: string, req: FirebaseProject, opts: ProjectsPatchOptions = {}): Promise<FirebaseProject> {
    opts = serializeProjectsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as FirebaseProject;
  }

  /**
   * Unlinks the specified FirebaseProject from its Google Analytics account.
   * This call removes the association of the specified `FirebaseProject` with
   * its current Google Analytics property. However, this call does not delete
   * the Google Analytics resources, such as the Google Analytics property or
   * any data streams. These resources may be re-associated later to the
   * `FirebaseProject` by calling
   * [`AddGoogleAnalytics`](../../v1beta1/projects/addGoogleAnalytics) and
   * specifying the same `analyticsPropertyId`. For Android Apps and iOS Apps,
   * this call re-links data streams with their corresponding apps. However, for
   * Web Apps, this call provisions a *new* data stream for each Web App. To
   * call `RemoveAnalytics`, a project member must be an Owner for the
   * `FirebaseProject`.
   *
   * @param parent The resource name of the FirebaseProject to unlink from its Google Analytics account, in the format: projects/PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsRemoveAnalytics(parent: string, req: RemoveAnalyticsRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }:removeAnalytics`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Lists all available Apps for the specified FirebaseProject. This is a
   * convenience method. Typically, interaction with an App should be done using
   * the platform-specific service, but some tool use-cases require a summary of
   * all known Apps (such as for App selector interfaces).
   *
   * @param parent The parent FirebaseProject for which to list Apps, in the format: projects/ PROJECT_IDENTIFIER Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsSearchApps(parent: string, opts: ProjectsSearchAppsOptions = {}): Promise<SearchFirebaseAppsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }:searchApps`);
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
    return data as SearchFirebaseAppsResponse;
  }

  /**
   * Requests the creation of a new WebApp in the specified FirebaseProject.
   * The result of this call is an `Operation` which can be used to track the
   * provisioning process. The `Operation` is automatically deleted after
   * completion, so there is no need to call `DeleteOperation`.
   *
   * @param parent The resource name of the parent FirebaseProject in which to create a WebApp, in the format: projects/PROJECT_IDENTIFIER/webApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsWebAppsCreate(parent: string, req: WebApp): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/webApps`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the specified WebApp.
   *
   * @param name The resource name of the WebApp, in the format: projects/PROJECT_IDENTIFIER /webApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the `WebApp` [`name`](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsWebAppsGet(name: string): Promise<WebApp> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as WebApp;
  }

  /**
   * Gets the configuration artifact associated with the specified WebApp.
   *
   * @param name The resource name of the WebApp configuration to download, in the format: projects/PROJECT_IDENTIFIER/webApps/APP_ID/config Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the `WebApp` [`name`](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsWebAppsGetConfig(name: string): Promise<WebAppConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as WebAppConfig;
  }

  /**
   * Lists each WebApp associated with the specified FirebaseProject. The
   * elements are returned in no particular order, but will be a consistent view
   * of the Apps when additional requests are made with a `pageToken`.
   *
   * @param parent The resource name of the parent FirebaseProject for which to list each associated WebApp, in the format: projects/PROJECT_IDENTIFIER/webApps Refer to the `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field for details about PROJECT_IDENTIFIER values.
   */
  async projectsWebAppsList(parent: string, opts: ProjectsWebAppsListOptions = {}): Promise<ListWebAppsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/webApps`);
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
    return data as ListWebAppsResponse;
  }

  /**
   * Updates the attributes of the specified WebApp.
   *
   * @param name The resource name of the WebApp, in the format: projects/PROJECT_IDENTIFIER /webApps/APP_ID * PROJECT_IDENTIFIER: the parent Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID: the globally unique, Firebase-assigned identifier for the App (see [`appId`](../projects.webApps#WebApp.FIELDS.app_id)).
   */
  async projectsWebAppsPatch(name: string, req: WebApp, opts: ProjectsWebAppsPatchOptions = {}): Promise<WebApp> {
    opts = serializeProjectsWebAppsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as WebApp;
  }

  /**
   * Removes the specified WebApp from the FirebaseProject.
   *
   * @param name Required. The resource name of the WebApp, in the format: projects/ PROJECT_IDENTIFIER/webApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the WebApp [name](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsWebAppsRemove(name: string, req: RemoveWebAppRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:remove`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Restores the specified WebApp to the FirebaseProject.
   *
   * @param name Required. The resource name of the WebApp, in the format: projects/ PROJECT_IDENTIFIER/webApps/APP_ID Since an APP_ID is a unique identifier, the Unique Resource from Sub-Collection access pattern may be used here, in the format: projects/-/webApps/APP_ID Refer to the WebApp [name](../projects.webApps#WebApp.FIELDS.name) field for details about PROJECT_IDENTIFIER and APP_ID values.
   */
  async projectsWebAppsUndelete(name: string, req: UndeleteWebAppRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }
}

/**
 * All fields are required.
 */
export interface AddFirebaseRequest {
  /**
   * Deprecated. Instead, to set a Project's default GCP resource location,
   * call [`FinalizeDefaultLocation`](../projects.defaultLocation/finalize)
   * after you add Firebase resources to the GCP `Project`. The ID of the
   * Project's default GCP resource location. The location must be one of the
   * available [GCP resource
   * locations](https://firebase.google.com/docs/projects/locations).
   */
  locationId?: string;
}

export interface AddGoogleAnalyticsRequest {
  /**
   * The ID for the existing [Google Analytics
   * account](http://www.google.com/analytics/) that you want to link with the
   * `FirebaseProject`. Specifying this field will provision a new Google
   * Analytics property in your Google Analytics account and associate the new
   * property with the `FirebaseProject`.
   */
  analyticsAccountId?: string;
  /**
   * The ID for the existing Google Analytics property that you want to
   * associate with the `FirebaseProject`.
   */
  analyticsPropertyId?: string;
}

export interface AdminSdkConfig {
  /**
   * The default Firebase Realtime Database URL.
   */
  databaseURL?: string;
  /**
   * The ID of the Project's default GCP resource location. The location is one
   * of the available [GCP resource
   * locations](https://firebase.google.com/docs/projects/locations). This field
   * is omitted if the default GCP resource location has not been finalized yet.
   * To set a Project's default GCP resource location, call
   * [`FinalizeDefaultLocation`](../projects.defaultLocation/finalize) after you
   * add Firebase resources to the Project.
   */
  locationId?: string;
  /**
   * Immutable. A user-assigned unique identifier for the `FirebaseProject`.
   * This identifier may appear in URLs or names for some Firebase resources
   * associated with the Project, but it should generally be treated as a
   * convenience alias to reference the Project.
   */
  projectId?: string;
  /**
   * The default Cloud Storage for Firebase storage bucket name.
   */
  storageBucket?: string;
}

export interface AnalyticsDetails {
  /**
   * The Analytics Property object associated with the specified
   * `FirebaseProject`. This object contains the details of the Google Analytics
   * property associated with the Project.
   */
  analyticsProperty?: AnalyticsProperty;
  /**
   * - For `AndroidApps` and `IosApps`: a map of `app` to `streamId` for each
   * Firebase App in the specified `FirebaseProject`. Each `app` and `streamId`
   * appears only once. - For `WebApps`: a map of `app` to `streamId` and
   * `measurementId` for each `WebApp` in the specified `FirebaseProject`. Each
   * `app`, `streamId`, and `measurementId` appears only once.
   */
  streamMappings?: StreamMapping[];
}

function serializeAnalyticsDetails(data: any): AnalyticsDetails {
  return {
    ...data,
    streamMappings: data["streamMappings"] !== undefined ? data["streamMappings"].map((item: any) => (serializeStreamMapping(item))) : undefined,
  };
}

function deserializeAnalyticsDetails(data: any): AnalyticsDetails {
  return {
    ...data,
    streamMappings: data["streamMappings"] !== undefined ? data["streamMappings"].map((item: any) => (deserializeStreamMapping(item))) : undefined,
  };
}

/**
 * Details of a Google Analytics property
 */
export interface AnalyticsProperty {
  /**
   * Output only. The ID of the [Google Analytics
   * account](https://www.google.com/analytics/) for the Google Analytics
   * property associated with the specified FirebaseProject.
   */
  readonly analyticsAccountId?: string;
  /**
   * The display name of the Google Analytics property associated with the
   * specified `FirebaseProject`.
   */
  displayName?: string;
  /**
   * The globally unique, Google-assigned identifier of the Google Analytics
   * property associated with the specified `FirebaseProject`. If you called
   * [`AddGoogleAnalytics`](../../v1beta1/projects/addGoogleAnalytics) to link
   * the `FirebaseProject` with a Google Analytics account, the value in this
   * `id` field is the same as the ID of the property either specified or
   * provisioned with that call to `AddGoogleAnalytics`.
   */
  id?: string;
}

/**
 * Details of a Firebase App for Android.
 */
export interface AndroidApp {
  /**
   * The globally unique, Google-assigned identifier (UID) for the Firebase API
   * key associated with the `AndroidApp`. Be aware that this value is the UID
   * of the API key, _not_ the
   * [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string)
   * of the API key. The `keyString` is the value that can be found in the App's
   * [configuration
   * artifact](../../rest/v1beta1/projects.androidApps/getConfig). If
   * `api_key_id` is not set in requests to
   * [`androidApps.Create`](../../rest/v1beta1/projects.androidApps/create),
   * then Firebase automatically associates an `api_key_id` with the
   * `AndroidApp`. This auto-associated key may be an existing valid key or, if
   * no valid key exists, a new one will be provisioned. In patch requests,
   * `api_key_id` cannot be set to an empty value, and the new UID must have no
   * restrictions or only have restrictions that are valid for the associated
   * `AndroidApp`. We recommend using the [Google Cloud
   * Console](https://console.cloud.google.com/apis/credentials) to manage API
   * keys.
   */
  apiKeyId?: string;
  /**
   * Output only. Immutable. The globally unique, Firebase-assigned identifier
   * for the `AndroidApp`. This identifier should be treated as an opaque token,
   * as the data format is not specified.
   */
  readonly appId?: string;
  /**
   * The user-assigned display name for the `AndroidApp`.
   */
  displayName?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and it may be sent with update requests to ensure the client has an
   * up-to-date value before proceeding. Learn more about `etag` in Google's
   * [AIP-154
   * standard](https://google.aip.dev/154#declarative-friendly-resources). This
   * etag is strongly validated.
   */
  etag?: string;
  /**
   * Output only. Timestamp of when the App will be considered expired and
   * cannot be undeleted. This value is only provided if the App is in the
   * `DELETED` state.
   */
  readonly expireTime?: Date;
  /**
   * The resource name of the AndroidApp, in the format: projects/
   * PROJECT_IDENTIFIER/androidApps/APP_ID * PROJECT_IDENTIFIER: the parent
   * Project's
   * [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number)
   * ***(recommended)*** or its
   * [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more
   * about using project identifiers in Google's [AIP 2510
   * standard](https://google.aip.dev/cloud/2510). Note that the value for
   * PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID:
   * the globally unique, Firebase-assigned identifier for the App (see
   * [`appId`](../projects.androidApps#AndroidApp.FIELDS.app_id)).
   */
  name?: string;
  /**
   * Immutable. The canonical package name of the Android app as would appear
   * in the Google Play Developer Console.
   */
  packageName?: string;
  /**
   * Output only. Immutable. A user-assigned unique identifier of the parent
   * FirebaseProject for the `AndroidApp`.
   */
  readonly projectId?: string;
  /**
   * The SHA1 certificate hashes for the AndroidApp.
   */
  sha1Hashes?: string[];
  /**
   * The SHA256 certificate hashes for the AndroidApp.
   */
  sha256Hashes?: string[];
  /**
   * Output only. The lifecycle state of the App.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED";
}

/**
 * Configuration metadata of a single Firebase App for Android.
 */
export interface AndroidAppConfig {
  /**
   * The contents of the JSON configuration file.
   */
  configFileContents?: Uint8Array;
  /**
   * The filename that the configuration artifact for the `AndroidApp` is
   * typically saved as. For example: `google-services.json`
   */
  configFilename?: string;
}

function serializeAndroidAppConfig(data: any): AndroidAppConfig {
  return {
    ...data,
    configFileContents: data["configFileContents"] !== undefined ? encodeBase64(data["configFileContents"]) : undefined,
  };
}

function deserializeAndroidAppConfig(data: any): AndroidAppConfig {
  return {
    ...data,
    configFileContents: data["configFileContents"] !== undefined ? decodeBase64(data["configFileContents"] as string) : undefined,
  };
}

/**
 * Additional options for Firebase#availableProjectsList.
 */
export interface AvailableProjectsListOptions {
  /**
   * The maximum number of Projects to return in the response. The server may
   * return fewer than this value at its discretion. If no value is specified
   * (or too large a value is specified), the server will impose its own limit.
   * This value cannot be negative.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `ListAvailableProjects` indicating
   * where in the set of Projects to resume listing.
   */
  pageToken?: string;
}

/**
 * The default resources associated with the Project.
 */
export interface DefaultResources {
  /**
   * Output only. The default Firebase Hosting site name, in the format:
   * PROJECT_ID Though rare, your `projectId` might already be used as the name
   * for an existing Hosting site in another project (learn more about creating
   * non-default, [additional
   * sites](https://firebase.google.com/docs/hosting/multisites)). In these
   * cases, your `projectId` is appended with a hyphen then five alphanumeric
   * characters to create your default Hosting site name. For example, if your
   * `projectId` is `myproject123`, your default Hosting site name might be:
   * `myproject123-a5c16`
   */
  readonly hostingSite?: string;
  /**
   * Output only. The ID of the Project's default GCP resource location. The
   * location is one of the available [GCP resource
   * locations](https://firebase.google.com/docs/projects/locations). This field
   * is omitted if the default GCP resource location has not been finalized yet.
   * To set a Project's default GCP resource location, call
   * [`FinalizeDefaultLocation`](../projects.defaultLocation/finalize) after you
   * add Firebase resources to the Project.
   */
  readonly locationId?: string;
  /**
   * Output only. The default Firebase Realtime Database instance name, in the
   * format: PROJECT_ID Though rare, your `projectId` might already be used as
   * the name for an existing Realtime Database instance in another project
   * (learn more about [database
   * sharding](https://firebase.google.com/docs/database/usage/sharding)). In
   * these cases, your `projectId` is appended with a hyphen then five
   * alphanumeric characters to create your default Realtime Database instance
   * name. For example, if your `projectId` is `myproject123`, your default
   * database instance name might be: `myproject123-a5c16`
   */
  readonly realtimeDatabaseInstance?: string;
  /**
   * Output only. The default Cloud Storage for Firebase storage bucket, in the
   * format: PROJECT_ID.appspot.com
   */
  readonly storageBucket?: string;
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

export interface FinalizeDefaultLocationRequest {
  /**
   * The ID of the Project's default GCP resource location. The location must
   * be one of the available [GCP resource
   * locations](https://firebase.google.com/docs/projects/locations).
   */
  locationId?: string;
}

/**
 * A high-level summary of an App.
 */
export interface FirebaseAppInfo {
  /**
   * The globally unique, Google-assigned identifier (UID) for the Firebase API
   * key associated with the App. Be aware that this value is the UID of the API
   * key, _not_ the
   * [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string)
   * of the API key. The `keyString` is the value that can be found in the App's
   * configuration artifact
   * ([`AndroidApp`](../../rest/v1beta1/projects.androidApps/getConfig) |
   * [`IosApp`](../../rest/v1beta1/projects.iosApps/getConfig) |
   * [`WebApp`](../../rest/v1beta1/projects.webApps/getConfig)). If `api_key_id`
   * is not set in requests to create the App
   * ([`AndroidApp`](../../rest/v1beta1/projects.androidApps/create) |
   * [`IosApp`](../../rest/v1beta1/projects.iosApps/create) |
   * [`WebApp`](../../rest/v1beta1/projects.webApps/create)), then Firebase
   * automatically associates an `api_key_id` with the App. This auto-associated
   * key may be an existing valid key or, if no valid key exists, a new one will
   * be provisioned.
   */
  apiKeyId?: string;
  /**
   * Output only. Immutable. The globally unique, Firebase-assigned identifier
   * for the `WebApp`. This identifier should be treated as an opaque token, as
   * the data format is not specified.
   */
  readonly appId?: string;
  /**
   * The user-assigned display name of the Firebase App.
   */
  displayName?: string;
  /**
   * Output only. Timestamp of when the App will be considered expired and
   * cannot be undeleted. This value is only provided if the App is in the
   * `DELETED` state.
   */
  readonly expireTime?: Date;
  /**
   * The resource name of the Firebase App, in the format: projects/PROJECT_ID
   * /iosApps/APP_ID or projects/PROJECT_ID/androidApps/APP_ID or projects/
   * PROJECT_ID/webApps/APP_ID
   */
  name?: string;
  /**
   * Output only. Immutable. The platform-specific identifier of the App.
   * *Note:* For most use cases, use `appId`, which is the canonical, globally
   * unique identifier for referencing an App. This string is derived from a
   * native identifier for each platform: `packageName` for an `AndroidApp`,
   * `bundleId` for an `IosApp`, and `webId` for a `WebApp`. Its contents should
   * be treated as opaque, as the native identifier format may change as
   * platforms evolve. This string is only unique within a `FirebaseProject` and
   * its associated Apps.
   */
  readonly namespace?: string;
  /**
   * The platform of the Firebase App.
   */
  platform?:  | "PLATFORM_UNSPECIFIED" | "IOS" | "ANDROID" | "WEB";
  /**
   * Output only. The lifecycle state of the App.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED";
}

/**
 * A `FirebaseProject` is the top-level Firebase entity. It is the container
 * for Firebase Apps, Firebase Hosting sites, storage systems (Firebase Realtime
 * Database, Cloud Firestore, Cloud Storage buckets), and other Firebase and
 * Google Cloud Platform (GCP) resources. You create a `FirebaseProject` by
 * calling AddFirebase and specifying an *existing* [GCP
 * `Project`](https://cloud.google.com/resource-manager/reference/rest/v1/projects).
 * This adds Firebase resources to the existing GCP `Project`. Since a
 * FirebaseProject is actually also a GCP `Project`, a `FirebaseProject` has the
 * same underlying GCP identifiers (`projectNumber` and `projectId`). This
 * allows for easy interop with Google APIs.
 */
export interface FirebaseProject {
  /**
   * A set of user-defined annotations for the FirebaseProject. Learn more
   * about annotations in Google's [AIP-128
   * standard](https://google.aip.dev/128#annotations). These annotations are
   * intended solely for developers and client-side tools. Firebase services
   * will not mutate this annotations set.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * The user-assigned display name of the Project.
   */
  displayName?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and it may be sent with update requests to ensure the client has an
   * up-to-date value before proceeding. Learn more about `etag` in Google's
   * [AIP-154
   * standard](https://google.aip.dev/154#declarative-friendly-resources). This
   * etag is strongly validated.
   */
  etag?: string;
  /**
   * The resource name of the Project, in the format:
   * projects/PROJECT_IDENTIFIER PROJECT_IDENTIFIER: the Project's
   * [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number)
   * ***(recommended)*** or its
   * [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more
   * about using project identifiers in Google's [AIP 2510
   * standard](https://google.aip.dev/cloud/2510). Note that the value for
   * PROJECT_IDENTIFIER in any response body will be the `ProjectId`.
   */
  name?: string;
  /**
   * Output only. Immutable. A user-assigned unique identifier for the Project.
   * This identifier may appear in URLs or names for some Firebase resources
   * associated with the Project, but it should generally be treated as a
   * convenience alias to reference the Project.
   */
  readonly projectId?: string;
  /**
   * Output only. Immutable. The globally unique, Google-assigned canonical
   * identifier for the Project. Use this identifier when configuring
   * integrations and/or making API calls to Firebase or third-party services.
   */
  readonly projectNumber?: bigint;
  /**
   * Output only. The default Firebase resources associated with the Project.
   */
  readonly resources?: DefaultResources;
  /**
   * Output only. The lifecycle state of the Project.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED";
}

/**
 * Details of a Firebase App for iOS.
 */
export interface IosApp {
  /**
   * The globally unique, Google-assigned identifier (UID) for the Firebase API
   * key associated with the `IosApp`. Be aware that this value is the UID of
   * the API key, _not_ the
   * [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string)
   * of the API key. The `keyString` is the value that can be found in the App's
   * [configuration artifact](../../rest/v1beta1/projects.iosApps/getConfig). If
   * `api_key_id` is not set in requests to
   * [`iosApps.Create`](../../rest/v1beta1/projects.iosApps/create), then
   * Firebase automatically associates an `api_key_id` with the `IosApp`. This
   * auto-associated key may be an existing valid key or, if no valid key
   * exists, a new one will be provisioned. In patch requests, `api_key_id`
   * cannot be set to an empty value, and the new UID must have no restrictions
   * or only have restrictions that are valid for the associated `IosApp`. We
   * recommend using the [Google Cloud
   * Console](https://console.cloud.google.com/apis/credentials) to manage API
   * keys.
   */
  apiKeyId?: string;
  /**
   * Output only. Immutable. The globally unique, Firebase-assigned identifier
   * for the `IosApp`. This identifier should be treated as an opaque token, as
   * the data format is not specified.
   */
  readonly appId?: string;
  /**
   * The automatically generated Apple ID assigned to the iOS app by Apple in
   * the iOS App Store.
   */
  appStoreId?: string;
  /**
   * Immutable. The canonical bundle ID of the iOS app as it would appear in
   * the iOS AppStore.
   */
  bundleId?: string;
  /**
   * The user-assigned display name for the `IosApp`.
   */
  displayName?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and it may be sent with update requests to ensure the client has an
   * up-to-date value before proceeding. Learn more about `etag` in Google's
   * [AIP-154
   * standard](https://google.aip.dev/154#declarative-friendly-resources). This
   * etag is strongly validated.
   */
  etag?: string;
  /**
   * Output only. Timestamp of when the App will be considered expired and
   * cannot be undeleted. This value is only provided if the App is in the
   * `DELETED` state.
   */
  readonly expireTime?: Date;
  /**
   * The resource name of the IosApp, in the format:
   * projects/PROJECT_IDENTIFIER /iosApps/APP_ID * PROJECT_IDENTIFIER: the
   * parent Project's
   * [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number)
   * ***(recommended)*** or its
   * [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more
   * about using project identifiers in Google's [AIP 2510
   * standard](https://google.aip.dev/cloud/2510). Note that the value for
   * PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID:
   * the globally unique, Firebase-assigned identifier for the App (see
   * [`appId`](../projects.iosApps#IosApp.FIELDS.app_id)).
   */
  name?: string;
  /**
   * Output only. Immutable. A user-assigned unique identifier of the parent
   * FirebaseProject for the `IosApp`.
   */
  readonly projectId?: string;
  /**
   * Output only. The lifecycle state of the App.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED";
  /**
   * The Apple Developer Team ID associated with the App in the App Store.
   */
  teamId?: string;
}

/**
 * Configuration metadata of a single Firebase App for iOS.
 */
export interface IosAppConfig {
  /**
   * The content of the XML configuration file.
   */
  configFileContents?: Uint8Array;
  /**
   * The filename that the configuration artifact for the `IosApp` is typically
   * saved as. For example: `GoogleService-Info.plist`
   */
  configFilename?: string;
}

function serializeIosAppConfig(data: any): IosAppConfig {
  return {
    ...data,
    configFileContents: data["configFileContents"] !== undefined ? encodeBase64(data["configFileContents"]) : undefined,
  };
}

function deserializeIosAppConfig(data: any): IosAppConfig {
  return {
    ...data,
    configFileContents: data["configFileContents"] !== undefined ? decodeBase64(data["configFileContents"] as string) : undefined,
  };
}

export interface ListAndroidAppsResponse {
  /**
   * List of each `AndroidApp` associated with the specified `FirebaseProject`.
   */
  apps?: AndroidApp[];
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty, then this response is the last page of
   * results. This token can be used in a subsequent call to `ListAndroidApps`
   * to find the next group of Apps. Page tokens are short-lived and should not
   * be persisted.
   */
  nextPageToken?: string;
}

export interface ListAvailableLocationsResponse {
  /**
   * One page of results from a call to `ListAvailableLocations`.
   */
  locations?: Location[];
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty, then this response is the last page of
   * results and all available locations have been listed. This token can be
   * used in a subsequent call to `ListAvailableLocations` to find more
   * locations. Page tokens are short-lived and should not be persisted.
   */
  nextPageToken?: string;
}

export interface ListAvailableProjectsResponse {
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty, then this response is the last page of
   * results. This token can be used in a subsequent calls to
   * `ListAvailableProjects` to find the next group of Projects. Page tokens are
   * short-lived and should not be persisted.
   */
  nextPageToken?: string;
  /**
   * The list of GCP `Projects` which can have Firebase resources added to
   * them.
   */
  projectInfo?: ProjectInfo[];
}

export interface ListFirebaseProjectsResponse {
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty, then this response is the last page of
   * results. This token can be used in a subsequent calls to
   * `ListFirebaseProjects` to find the next group of Projects. Page tokens are
   * short-lived and should not be persisted.
   */
  nextPageToken?: string;
  /**
   * One page of the list of Projects that are accessible to the caller.
   */
  results?: FirebaseProject[];
}

export interface ListIosAppsResponse {
  /**
   * List of each `IosApp` associated with the specified `FirebaseProject`.
   */
  apps?: IosApp[];
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty, then this response is the last page of
   * results. This token can be used in a subsequent call to `ListIosApps` to
   * find the next group of Apps. Page tokens are short-lived and should not be
   * persisted.
   */
  nextPageToken?: string;
}

export interface ListShaCertificatesResponse {
  /**
   * The list of each `ShaCertificate` associated with the `AndroidApp`.
   */
  certificates?: ShaCertificate[];
}

export interface ListWebAppsResponse {
  /**
   * List of each `WebApp` associated with the specified `FirebaseProject`.
   */
  apps?: WebApp[];
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty, then this response is the last page of
   * results. This token can be used in a subsequent call to `ListWebApps` to
   * find the next group of Apps. Page tokens are short-lived and should not be
   * persisted.
   */
  nextPageToken?: string;
}

/**
 * A GCP resource location that can be selected for a FirebaseProject.
 */
export interface Location {
  /**
   * Products and services that are available in the GCP resource location.
   */
  features?:  | "LOCATION_FEATURE_UNSPECIFIED" | "FIRESTORE" | "DEFAULT_STORAGE" | "FUNCTIONS"[];
  /**
   * The ID of the GCP resource location. It will be one of the available [GCP
   * resource
   * locations](https://firebase.google.com/docs/projects/locations#types).
   */
  locationId?: string;
  /**
   * Indicates whether the GCP resource location is a [regional or
   * multi-regional
   * location](https://firebase.google.com/docs/projects/locations#types) for
   * data replication.
   */
  type?:  | "LOCATION_TYPE_UNSPECIFIED" | "REGIONAL" | "MULTI_REGIONAL";
}

/**
 * This is proto2's version of MessageSet.
 */
export interface MessageSet {
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
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
   * that originally returns it. If you use the default HTTP mapping, the `name`
   * should be a resource name ending with `operations/{unique_id}`.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as `Delete`, the response is
   * `google.protobuf.Empty`. If the original method is standard
   * `Get`/`Create`/`Update`, the response should be the resource. For other
   * methods, the response should have the type `XxxResponse`, where `Xxx` is
   * the original method name. For example, if the original method name is
   * `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Metadata about a long-running Product operation.
 */
export interface ProductMetadata {
  /**
   * List of warnings related to the associated operation.
   */
  warningMessages?: string[];
}

/**
 * A reference to a Google Cloud Platform (GCP) `Project`.
 */
export interface ProjectInfo {
  /**
   * The user-assigned display name of the GCP `Project`, for example: `My App`
   */
  displayName?: string;
  /**
   * The ID of the Project's default GCP resource location. The location is one
   * of the available [GCP resource
   * locations](https://firebase.google.com/docs/projects/locations). Not all
   * Projects will have this field populated. If it is not populated, it means
   * that the Project does not yet have a default GCP resource location. To set
   * a Project's default GCP resource location, call
   * [`FinalizeDefaultLocation`](../projects.defaultLocation/finalize) after you
   * add Firebase resources to the Project.
   */
  locationId?: string;
  /**
   * The resource name of the GCP `Project` to which Firebase resources can be
   * added, in the format: projects/PROJECT_IDENTIFIER Refer to the
   * `FirebaseProject` [`name`](../projects#FirebaseProject.FIELDS.name) field
   * for details about PROJECT_IDENTIFIER values.
   */
  project?: string;
}

/**
 * Additional options for Firebase#projectsAndroidAppsList.
 */
export interface ProjectsAndroidAppsListOptions {
  /**
   * The maximum number of Apps to return in the response. The server may
   * return fewer than this at its discretion. If no value is specified (or too
   * large a value is specified), then the server will impose its own limit.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `ListAndroidApps` indicating where
   * in the set of Apps to resume listing.
   */
  pageToken?: string;
  /**
   * Controls whether Apps in the DELETED state should be returned in the
   * response. If not specified, only `ACTIVE` Apps will be returned.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Firebase#projectsAndroidAppsPatch.
 */
export interface ProjectsAndroidAppsPatchOptions {
  /**
   * Specifies which fields of the AndroidApp to update. Note that the
   * following fields are immutable: `name`, `app_id`, `project_id`, and
   * `package_name`. To update `state`, use any of the following endpoints:
   * RemoveAndroidApp or UndeleteAndroidApp.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAndroidAppsPatchOptions(data: any): ProjectsAndroidAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAndroidAppsPatchOptions(data: any): ProjectsAndroidAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Firebase#projectsAvailableLocationsList.
 */
export interface ProjectsAvailableLocationsListOptions {
  /**
   * The maximum number of locations to return in the response. The server may
   * return fewer than this value at its discretion. If no value is specified
   * (or too large a value is specified), then the server will impose its own
   * limit. This value cannot be negative.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `ListAvailableLocations` indicating
   * where in the list of locations to resume listing.
   */
  pageToken?: string;
}

/**
 * Additional options for Firebase#projectsIosAppsList.
 */
export interface ProjectsIosAppsListOptions {
  /**
   * The maximum number of Apps to return in the response. The server may
   * return fewer than this at its discretion. If no value is specified (or too
   * large a value is specified), the server will impose its own limit.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `ListIosApps` indicating where in
   * the set of Apps to resume listing.
   */
  pageToken?: string;
  /**
   * Controls whether Apps in the DELETED state should be returned in the
   * response. If not specified, only `ACTIVE` Apps will be returned.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Firebase#projectsIosAppsPatch.
 */
export interface ProjectsIosAppsPatchOptions {
  /**
   * Specifies which fields of the IosApp to update. Note that the following
   * fields are immutable: `name`, `app_id`, `project_id`, and `bundle_id`. To
   * update `state`, use any of the following endpoints: RemoveIosApp or
   * UndeleteIosApp.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsIosAppsPatchOptions(data: any): ProjectsIosAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsIosAppsPatchOptions(data: any): ProjectsIosAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Firebase#projectsList.
 */
export interface ProjectsListOptions {
  /**
   * The maximum number of Projects to return in the response. The server may
   * return fewer than this at its discretion. If no value is specified (or too
   * large a value is specified), the server will impose its own limit. This
   * value cannot be negative.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `ListFirebaseProjects` indicating
   * where in the set of Projects to resume listing.
   */
  pageToken?: string;
  /**
   * Optional. Controls whether Projects in the DELETED state should be
   * returned in the response. If not specified, only `ACTIVE` Projects will be
   * returned.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Firebase#projectsPatch.
 */
export interface ProjectsPatchOptions {
  /**
   * Specifies which fields of the FirebaseProject to update. Note that the
   * following fields are immutable: `name`, `project_id`, and `project_number`.
   * To update `state`, use any of the following Google Cloud endpoints:
   * [`projects.delete`](https://cloud.google.com/resource-manager/reference/rest/v1/projects/delete)
   * or
   * [`projects.undelete`](https://cloud.google.com/resource-manager/reference/rest/v1/projects/undelete)
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsPatchOptions(data: any): ProjectsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsPatchOptions(data: any): ProjectsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Firebase#projectsSearchApps.
 */
export interface ProjectsSearchAppsOptions {
  /**
   * A query string compatible with Google's [AIP-160
   * standard](https://google.aip.dev/160). Use any of the following fields in a
   * query: * [`app_id`](../projects/searchApps#FirebaseAppInfo.FIELDS.app_id) *
   * [`namespace`](../projects/searchApps#FirebaseAppInfo.FIELDS.namespace) *
   * [`platform`](../projects/searchApps#FirebaseAppInfo.FIELDS.platform) This
   * query also supports the following "virtual" fields. These are fields which
   * are not actually part of the returned resource object, but they can be
   * queried as if they are pre-populated with specific values. * `sha1_hash` or
   * `sha1_hashes`: This field is considered to be a _repeated_ `string` field,
   * populated with the list of all SHA-1 certificate fingerprints registered
   * with the AndroidApp. This list is empty if the App is not an `AndroidApp`.
   * * `sha256_hash` or `sha256_hashes`: This field is considered to be a
   * _repeated_ `string` field, populated with the list of all SHA-256
   * certificate fingerprints registered with the AndroidApp. This list is empty
   * if the App is not an `AndroidApp`. * `app_store_id`: This field is
   * considered to be a _singular_ `string` field, populated with the Apple App
   * Store ID registered with the IosApp. This field is empty if the App is not
   * an `IosApp`. * `team_id`: This field is considered to be a _singular_
   * `string` field, populated with the Apple team ID registered with the
   * IosApp. This field is empty if the App is not an `IosApp`.
   */
  filter?: string;
  /**
   * The maximum number of Apps to return in the response. The server may
   * return fewer than this value at its discretion. If no value is specified
   * (or too large a value is specified), then the server will impose its own
   * limit. This value cannot be negative.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `SearchFirebaseApps` indicating
   * where in the set of Apps to resume listing.
   */
  pageToken?: string;
  /**
   * Controls whether Apps in the DELETED state should be returned. If not
   * specified, only `ACTIVE` Apps will be returned.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Firebase#projectsWebAppsList.
 */
export interface ProjectsWebAppsListOptions {
  /**
   * The maximum number of Apps to return in the response. The server may
   * return fewer than this value at its discretion. If no value is specified
   * (or too large a value is specified), then the server will impose its own
   * limit.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `ListWebApps` indicating where in
   * the set of Apps to resume listing.
   */
  pageToken?: string;
  /**
   * Controls whether Apps in the DELETED state should be returned in the
   * response. If not specified, only `ACTIVE` Apps will be returned.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Firebase#projectsWebAppsPatch.
 */
export interface ProjectsWebAppsPatchOptions {
  /**
   * Specifies which fields of the WebApp to update. Note that the following
   * fields are immutable: `name`, `app_id`, and `project_id`. To update
   * `state`, use any of the following endpoints: RemoveWebApp or
   * UndeleteWebApp.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsWebAppsPatchOptions(data: any): ProjectsWebAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsWebAppsPatchOptions(data: any): ProjectsWebAppsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

export interface RemoveAnalyticsRequest {
  /**
   * Optional. The ID of the Google Analytics property associated with the
   * specified `FirebaseProject`. - If not set, then the Google Analytics
   * property that is currently associated with the specified `FirebaseProject`
   * is removed. - If set, and the specified `FirebaseProject` is currently
   * associated with a *different* Google Analytics property, then the response
   * is a `412 Precondition Failed` error.
   */
  analyticsPropertyId?: string;
}

export interface RemoveAndroidAppRequest {
  /**
   * If set to true, and the App is not found, the request will succeed but no
   * action will be taken on the server.
   */
  allowMissing?: boolean;
  /**
   * Checksum provided in the AndroidApp resource. If provided, this checksum
   * ensures that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Determines whether to _immediately_ delete the AndroidApp. If set to true,
   * the App is immediately deleted from the Project and cannot be restored to
   * the Project. If not set, defaults to false, which means the App will be set
   * to expire in 30 days. Within the 30 days, the App may be restored to the
   * Project using UndeleteAndroidApp.
   */
  immediate?: boolean;
  /**
   * If set to true, the request is only validated. The App will _not_ be
   * removed.
   */
  validateOnly?: boolean;
}

export interface RemoveIosAppRequest {
  /**
   * If set to true, and the App is not found, the request will succeed but no
   * action will be taken on the server.
   */
  allowMissing?: boolean;
  /**
   * Checksum provided in the IosApp resource. If provided, this checksum
   * ensures that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Determines whether to _immediately_ delete the IosApp. If set to true, the
   * App is immediately deleted from the Project and cannot be restored to the
   * Project. If not set, defaults to false, which means the App will be set to
   * expire in 30 days. Within the 30 days, the App may be restored to the
   * Project using UndeleteIosApp
   */
  immediate?: boolean;
  /**
   * If set to true, the request is only validated. The App will _not_ be
   * removed.
   */
  validateOnly?: boolean;
}

export interface RemoveWebAppRequest {
  /**
   * If set to true, and the App is not found, the request will succeed but no
   * action will be taken on the server.
   */
  allowMissing?: boolean;
  /**
   * Checksum provided in the WebApp resource. If provided, this checksum
   * ensures that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Determines whether to _immediately_ delete the WebApp. If set to true, the
   * App is immediately deleted from the Project and cannot be restored to the
   * Project. If not set, defaults to false, which means the App will be set to
   * expire in 30 days. Within the 30 days, the App may be restored to the
   * Project using UndeleteWebApp
   */
  immediate?: boolean;
  /**
   * If set to true, the request is only validated. The App will _not_ be
   * removed.
   */
  validateOnly?: boolean;
}

export interface SearchFirebaseAppsResponse {
  /**
   * One page of results from a call to `SearchFirebaseApps`.
   */
  apps?: FirebaseAppInfo[];
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. This token can be used in a subsequent calls to
   * `SearchFirebaseApps` to find the next group of Apps. Page tokens are
   * short-lived and should not be persisted.
   */
  nextPageToken?: string;
}

/**
 * A SHA-1 or SHA-256 certificate associated with the AndroidApp.
 */
export interface ShaCertificate {
  /**
   * The type of SHA certificate encoded in the hash.
   */
  certType?:  | "SHA_CERTIFICATE_TYPE_UNSPECIFIED" | "SHA_1" | "SHA_256";
  /**
   * The resource name of the ShaCertificate for the AndroidApp, in the format:
   * projects/PROJECT_IDENTIFIER/androidApps/APP_ID/sha/SHA_HASH *
   * PROJECT_IDENTIFIER: the parent Project's
   * [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number)
   * ***(recommended)*** or its
   * [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more
   * about using project identifiers in Google's [AIP 2510
   * standard](https://google.aip.dev/cloud/2510). Note that the value for
   * PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID:
   * the globally unique, Firebase-assigned identifier for the App (see
   * [`appId`](../projects.androidApps#AndroidApp.FIELDS.app_id)). * SHA_HASH:
   * the certificate hash for the App (see
   * [`shaHash`](../projects.androidApps.sha#ShaCertificate.FIELDS.sha_hash)).
   */
  name?: string;
  /**
   * The certificate hash for the `AndroidApp`.
   */
  shaHash?: string;
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
 * Wire-format for a Status object
 */
export interface StatusProto {
  /**
   * The canonical error code (see codes.proto) that most closely corresponds
   * to this status. May be missing.
   */
  canonicalCode?: number;
  /**
   * Numeric code drawn from the space specified below. Often, this is the
   * canonical error space, and code is drawn from google3/util/task/codes.proto
   */
  code?: number;
  /**
   * Detail message
   */
  message?: string;
  /**
   * message_set associates an arbitrary proto message with the status.
   */
  messageSet?: MessageSet;
  /**
   * The following are usually only present when code != 0 Space to which this
   * status belongs
   */
  space?: string;
}

/**
 * A mapping of a Firebase App to a Google Analytics data stream
 */
export interface StreamMapping {
  /**
   * The resource name of the Firebase App associated with the Google Analytics
   * data stream, in the format: projects/PROJECT_IDENTIFIER/androidApps/APP_ID
   * or projects/PROJECT_IDENTIFIER/iosApps/APP_ID or
   * projects/PROJECT_IDENTIFIER /webApps/APP_ID Refer to the `FirebaseProject`
   * [`name`](../projects#FirebaseProject.FIELDS.name) field for details about
   * PROJECT_IDENTIFIER values.
   */
  app?: string;
  /**
   * Applicable for Firebase Web Apps only. The unique Google-assigned
   * identifier of the Google Analytics web stream associated with the Firebase
   * Web App. Firebase SDKs use this ID to interact with Google Analytics APIs.
   * Learn more about this ID and Google Analytics web streams in the [Analytics
   * documentation](https://support.google.com/analytics/answer/9304153).
   */
  measurementId?: string;
  /**
   * The unique Google-assigned identifier of the Google Analytics data stream
   * associated with the Firebase App. Learn more about Google Analytics data
   * streams in the [Analytics
   * documentation](https://support.google.com/analytics/answer/9303323).
   */
  streamId?: bigint;
}

function serializeStreamMapping(data: any): StreamMapping {
  return {
    ...data,
    streamId: data["streamId"] !== undefined ? String(data["streamId"]) : undefined,
  };
}

function deserializeStreamMapping(data: any): StreamMapping {
  return {
    ...data,
    streamId: data["streamId"] !== undefined ? BigInt(data["streamId"]) : undefined,
  };
}

export interface UndeleteAndroidAppRequest {
  /**
   * Checksum provided in the AndroidApp resource. If provided, this checksum
   * ensures that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * If set to true, the request is only validated. The App will _not_ be
   * undeleted.
   */
  validateOnly?: boolean;
}

export interface UndeleteIosAppRequest {
  /**
   * Checksum provided in the IosApp resource. If provided, this checksum
   * ensures that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * If set to true, the request is only validated. The App will _not_ be
   * undeleted.
   */
  validateOnly?: boolean;
}

export interface UndeleteWebAppRequest {
  /**
   * Checksum provided in the WebApp resource. If provided, this checksum
   * ensures that the client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * If set to true, the request is only validated. The App will _not_ be
   * undeleted.
   */
  validateOnly?: boolean;
}

/**
 * Details of a Firebase App for the web.
 */
export interface WebApp {
  /**
   * The globally unique, Google-assigned identifier (UID) for the Firebase API
   * key associated with the `WebApp`. Be aware that this value is the UID of
   * the API key, _not_ the
   * [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string)
   * of the API key. The `keyString` is the value that can be found in the App's
   * [configuration artifact](../../rest/v1beta1/projects.webApps/getConfig). If
   * `api_key_id` is not set in requests to
   * [`webApps.Create`](../../rest/v1beta1/projects.webApps/create), then
   * Firebase automatically associates an `api_key_id` with the `WebApp`. This
   * auto-associated key may be an existing valid key or, if no valid key
   * exists, a new one will be provisioned. In patch requests, `api_key_id`
   * cannot be set to an empty value, and the new UID must have no restrictions
   * or only have restrictions that are valid for the associated `WebApp`. We
   * recommend using the [Google Cloud
   * Console](https://console.cloud.google.com/apis/credentials) to manage API
   * keys.
   */
  apiKeyId?: string;
  /**
   * Output only. Immutable. The globally unique, Firebase-assigned identifier
   * for the `WebApp`. This identifier should be treated as an opaque token, as
   * the data format is not specified.
   */
  readonly appId?: string;
  /**
   * The URLs where the `WebApp` is hosted.
   */
  appUrls?: string[];
  /**
   * The user-assigned display name for the `WebApp`.
   */
  displayName?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and it may be sent with update requests to ensure the client has an
   * up-to-date value before proceeding. Learn more about `etag` in Google's
   * [AIP-154
   * standard](https://google.aip.dev/154#declarative-friendly-resources). This
   * etag is strongly validated.
   */
  etag?: string;
  /**
   * Output only. Timestamp of when the App will be considered expired and
   * cannot be undeleted. This value is only provided if the App is in the
   * `DELETED` state.
   */
  readonly expireTime?: Date;
  /**
   * The resource name of the WebApp, in the format:
   * projects/PROJECT_IDENTIFIER /webApps/APP_ID * PROJECT_IDENTIFIER: the
   * parent Project's
   * [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number)
   * ***(recommended)*** or its
   * [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more
   * about using project identifiers in Google's [AIP 2510
   * standard](https://google.aip.dev/cloud/2510). Note that the value for
   * PROJECT_IDENTIFIER in any response body will be the `ProjectId`. * APP_ID:
   * the globally unique, Firebase-assigned identifier for the App (see
   * [`appId`](../projects.webApps#WebApp.FIELDS.app_id)).
   */
  name?: string;
  /**
   * Output only. Immutable. A user-assigned unique identifier of the parent
   * FirebaseProject for the `WebApp`.
   */
  readonly projectId?: string;
  /**
   * Output only. The lifecycle state of the App.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED";
  /**
   * Output only. Immutable. A unique, Firebase-assigned identifier for the
   * `WebApp`. This identifier is only used to populate the `namespace` value
   * for the `WebApp`. For most use cases, use `appId` to identify or reference
   * the App. The `webId` value is only unique within a `FirebaseProject` and
   * its associated Apps.
   */
  readonly webId?: string;
}

/**
 * Configuration metadata of a single Firebase App for the web.
 */
export interface WebAppConfig {
  /**
   * The
   * [`keyString`](https://cloud.google.com/api-keys/docs/reference/rest/v2/projects.locations.keys#Key.FIELDS.key_string)
   * of the API key associated with the `WebApp`. Note that this value is _not_
   * the [`apiKeyId`](../projects.webApps#WebApp.FIELDS.api_key_id) (the UID) of
   * the API key associated with the `WebApp`.
   */
  apiKey?: string;
  /**
   * Immutable. The globally unique, Firebase-assigned identifier for the
   * `WebApp`.
   */
  appId?: string;
  /**
   * The domain Firebase Auth configures for OAuth redirects, in the format:
   * PROJECT_ID.firebaseapp.com
   */
  authDomain?: string;
  /**
   * The default Firebase Realtime Database URL.
   */
  databaseURL?: string;
  /**
   * The ID of the Project's default GCP resource location. The location is one
   * of the available [GCP resource
   * locations](https://firebase.google.com/docs/projects/locations). This field
   * is omitted if the default GCP resource location has not been finalized yet.
   * To set a Project's default GCP resource location, call
   * [`FinalizeDefaultLocation`](../projects.defaultLocation/finalize) after you
   * add Firebase resources to the Project.
   */
  locationId?: string;
  /**
   * The unique Google-assigned identifier of the Google Analytics web stream
   * associated with the `WebApp`. Firebase SDKs use this ID to interact with
   * Google Analytics APIs. This field is only present if the `WebApp` is linked
   * to a web stream in a Google Analytics App + Web property. Learn more about
   * this ID and Google Analytics web streams in the [Analytics
   * documentation](https://support.google.com/analytics/answer/9304153). To
   * generate a `measurementId` and link the `WebApp` with a Google Analytics
   * web stream, call
   * [`AddGoogleAnalytics`](../../v1beta1/projects/addGoogleAnalytics). For apps
   * using the Firebase JavaScript SDK v7.20.0 and later, Firebase dynamically
   * fetches the `measurementId` when your app initializes Analytics. Having
   * this ID in your config object is optional, but it does serve as a fallback
   * in the rare case that the dynamic fetch fails.
   */
  measurementId?: string;
  /**
   * The sender ID for use with Firebase Cloud Messaging.
   */
  messagingSenderId?: string;
  /**
   * Immutable. A user-assigned unique identifier for the `FirebaseProject`.
   */
  projectId?: string;
  /**
   * The default Cloud Storage for Firebase storage bucket name.
   */
  storageBucket?: string;
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
