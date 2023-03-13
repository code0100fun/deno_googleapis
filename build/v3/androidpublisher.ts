// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Play Android Developer API Client for Deno
 * =================================================
 * 
 * Lets Android application developers access their Google Play accounts. At a high level, the expected workflow is to "insert" an Edit, make changes as necessary, and then "commit" it. 
 * 
 * Docs: https://developers.google.com/android-publisher
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Lets Android application developers access their Google Play accounts. At a
 * high level, the expected workflow is to "insert" an Edit, make changes as
 * necessary, and then "commit" it.
 */
export class Androidpublisher {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://androidpublisher.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new device tier config for an app.
   *
   * @param packageName Package name of the app.
   */
  async applicationsDeviceTierConfigsCreate(packageName: string, req: DeviceTierConfig, opts: ApplicationsDeviceTierConfigsCreateOptions = {}): Promise<DeviceTierConfig> {
    req = serializeDeviceTierConfig(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/deviceTierConfigs`);
    if (opts.allowUnknownDevices !== undefined) {
      url.searchParams.append("allowUnknownDevices", String(opts.allowUnknownDevices));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDeviceTierConfig(data);
  }

  /**
   * Returns a particular device tier config.
   *
   * @param deviceTierConfigId Required. Id of an existing device tier config.
   * @param packageName Package name of the app.
   */
  async applicationsDeviceTierConfigsGet(deviceTierConfigId: bigint, packageName: string): Promise<DeviceTierConfig> {
    deviceTierConfigId = String(deviceTierConfigId);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/deviceTierConfigs/${ deviceTierConfigId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDeviceTierConfig(data);
  }

  /**
   * Returns created device tier configs, ordered by descending creation time.
   *
   * @param packageName Package name of the app.
   */
  async applicationsDeviceTierConfigsList(packageName: string, opts: ApplicationsDeviceTierConfigsListOptions = {}): Promise<ListDeviceTierConfigsResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/deviceTierConfigs`);
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
    return deserializeListDeviceTierConfigsResponse(data);
  }

  /**
   * Creates a new APK without uploading the APK itself to Google Play, instead
   * hosting the APK at a specified URL. This function is only available to
   * organizations using Managed Play whose application is configured to
   * restrict distribution to the organizations.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsApksAddexternallyhosted(editId: string, packageName: string, req: ApksAddExternallyHostedRequest): Promise<ApksAddExternallyHostedResponse> {
    req = serializeApksAddExternallyHostedRequest(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks/externallyHosted`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApksAddExternallyHostedResponse(data);
  }

  /**
   * Lists all current APKs of the app and edit.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsApksList(editId: string, packageName: string): Promise<ApksListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApksListResponse;
  }

  /**
   * Uploads an APK and adds to the current edit.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsApksUpload(editId: string, packageName: string): Promise<Apk> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Apk;
  }

  /**
   * Lists all current Android App Bundles of the app and edit.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsBundlesList(editId: string, packageName: string): Promise<BundlesListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/bundles`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BundlesListResponse;
  }

  /**
   * Uploads a new Android App Bundle to this edit. If you are using the Google
   * API client libraries, please increase the timeout of the http request
   * before calling this endpoint (a timeout of 2 minutes is recommended). See
   * [Timeouts and
   * Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors)
   * for an example in java.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsBundlesUpload(editId: string, packageName: string, opts: EditsBundlesUploadOptions = {}): Promise<Bundle> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/bundles`);
    if (opts.ackBundleInstallationWarning !== undefined) {
      url.searchParams.append("ackBundleInstallationWarning", String(opts.ackBundleInstallationWarning));
    }
    if (opts.deviceTierConfigId !== undefined) {
      url.searchParams.append("deviceTierConfigId", String(opts.deviceTierConfigId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Bundle;
  }

  /**
   * Commits an app edit.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsCommit(editId: string, packageName: string, opts: EditsCommitOptions = {}): Promise<AppEdit> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }:commit`);
    if (opts.changesNotSentForReview !== undefined) {
      url.searchParams.append("changesNotSentForReview", String(opts.changesNotSentForReview));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AppEdit;
  }

  /**
   * Gets country availability.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   * @param track The track to read from.
   */
  async editsCountryavailabilityGet(editId: string, packageName: string, track: string): Promise<TrackCountryAvailability> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/countryAvailability/${ track }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TrackCountryAvailability;
  }

  /**
   * Deletes an app edit.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsDelete(editId: string, packageName: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Uploads a new deobfuscation file and attaches to the specified APK.
   *
   * @param apkVersionCode The version code of the APK whose Deobfuscation File is being uploaded.
   * @param deobfuscationFileType The type of the deobfuscation file.
   * @param editId Unique identifier for this edit.
   * @param packageName Unique identifier for the Android app.
   */
  async editsDeobfuscationfilesUpload(apkVersionCode: number, deobfuscationFileType:  | "deobfuscationFileTypeUnspecified" | "proguard" | "nativeCode", editId: string, packageName: string): Promise<DeobfuscationFilesUploadResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks/${ apkVersionCode }/deobfuscationFiles/${ deobfuscationFileType }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as DeobfuscationFilesUploadResponse;
  }

  /**
   * Gets details of an app.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsDetailsGet(editId: string, packageName: string): Promise<AppDetails> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/details`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AppDetails;
  }

  /**
   * Patches details of an app.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsDetailsPatch(editId: string, packageName: string, req: AppDetails): Promise<AppDetails> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/details`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as AppDetails;
  }

  /**
   * Updates details of an app.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsDetailsUpdate(editId: string, packageName: string, req: AppDetails): Promise<AppDetails> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/details`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as AppDetails;
  }

  /**
   * Fetches the expansion file configuration for the specified APK.
   *
   * @param apkVersionCode The version code of the APK whose expansion file configuration is being read or modified.
   * @param editId Identifier of the edit.
   * @param expansionFileType The file type of the file configuration which is being read or modified.
   * @param packageName Package name of the app.
   */
  async editsExpansionfilesGet(apkVersionCode: number, editId: string, expansionFileType:  | "expansionFileTypeUnspecified" | "main" | "patch", packageName: string): Promise<ExpansionFile> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks/${ apkVersionCode }/expansionFiles/${ expansionFileType }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeExpansionFile(data);
  }

  /**
   * Patches the APK's expansion file configuration to reference another APK's
   * expansion file. To add a new expansion file use the Upload method.
   *
   * @param apkVersionCode The version code of the APK whose expansion file configuration is being read or modified.
   * @param editId Identifier of the edit.
   * @param expansionFileType The file type of the expansion file configuration which is being updated.
   * @param packageName Package name of the app.
   */
  async editsExpansionfilesPatch(apkVersionCode: number, editId: string, expansionFileType:  | "expansionFileTypeUnspecified" | "main" | "patch", packageName: string, req: ExpansionFile): Promise<ExpansionFile> {
    req = serializeExpansionFile(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks/${ apkVersionCode }/expansionFiles/${ expansionFileType }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeExpansionFile(data);
  }

  /**
   * Updates the APK's expansion file configuration to reference another APK's
   * expansion file. To add a new expansion file use the Upload method.
   *
   * @param apkVersionCode The version code of the APK whose expansion file configuration is being read or modified.
   * @param editId Identifier of the edit.
   * @param expansionFileType The file type of the file configuration which is being read or modified.
   * @param packageName Package name of the app.
   */
  async editsExpansionfilesUpdate(apkVersionCode: number, editId: string, expansionFileType:  | "expansionFileTypeUnspecified" | "main" | "patch", packageName: string, req: ExpansionFile): Promise<ExpansionFile> {
    req = serializeExpansionFile(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks/${ apkVersionCode }/expansionFiles/${ expansionFileType }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeExpansionFile(data);
  }

  /**
   * Uploads a new expansion file and attaches to the specified APK.
   *
   * @param apkVersionCode The version code of the APK whose expansion file configuration is being read or modified.
   * @param editId Identifier of the edit.
   * @param expansionFileType The file type of the expansion file configuration which is being updated.
   * @param packageName Package name of the app.
   */
  async editsExpansionfilesUpload(apkVersionCode: number, editId: string, expansionFileType:  | "expansionFileTypeUnspecified" | "main" | "patch", packageName: string): Promise<ExpansionFilesUploadResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/apks/${ apkVersionCode }/expansionFiles/${ expansionFileType }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeExpansionFilesUploadResponse(data);
  }

  /**
   * Gets an app edit.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsGet(editId: string, packageName: string): Promise<AppEdit> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AppEdit;
  }

  /**
   * Deletes the image (specified by id) from the edit.
   *
   * @param editId Identifier of the edit.
   * @param imageId Unique identifier an image within the set of images attached to this edit.
   * @param imageType Type of the Image.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).
   * @param packageName Package name of the app.
   */
  async editsImagesDelete(editId: string, imageId: string, imageType:  | "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner", language: string, packageName: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }/${ imageType }/${ imageId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Deletes all images for the specified language and image type. Returns an
   * empty response if no images are found.
   *
   * @param editId Identifier of the edit.
   * @param imageType Type of the Image. Providing an image type that refers to no images is a no-op.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). Providing a language that is not supported by the App is a no-op.
   * @param packageName Package name of the app.
   */
  async editsImagesDeleteall(editId: string, imageType:  | "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner", language: string, packageName: string): Promise<ImagesDeleteAllResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }/${ imageType }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as ImagesDeleteAllResponse;
  }

  /**
   * Lists all images. The response may be empty.
   *
   * @param editId Identifier of the edit.
   * @param imageType Type of the Image. Providing an image type that refers to no images will return an empty response.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). There must be a store listing for the specified language.
   * @param packageName Package name of the app.
   */
  async editsImagesList(editId: string, imageType:  | "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner", language: string, packageName: string): Promise<ImagesListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }/${ imageType }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ImagesListResponse;
  }

  /**
   * Uploads an image of the specified language and image type, and adds to the
   * edit.
   *
   * @param editId Identifier of the edit.
   * @param imageType Type of the Image.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German). Providing a language that is not supported by the App is a no-op.
   * @param packageName Package name of the app.
   */
  async editsImagesUpload(editId: string, imageType:  | "appImageTypeUnspecified" | "phoneScreenshots" | "sevenInchScreenshots" | "tenInchScreenshots" | "tvScreenshots" | "wearScreenshots" | "icon" | "featureGraphic" | "tvBanner", language: string, packageName: string): Promise<ImagesUploadResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }/${ imageType }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as ImagesUploadResponse;
  }

  /**
   * Creates a new edit for an app.
   *
   * @param packageName Package name of the app.
   */
  async editsInsert(packageName: string, req: AppEdit): Promise<AppEdit> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AppEdit;
  }

  /**
   * Deletes a localized store listing.
   *
   * @param editId Identifier of the edit.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).
   * @param packageName Package name of the app.
   */
  async editsListingsDelete(editId: string, language: string, packageName: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Deletes all store listings.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsListingsDeleteall(editId: string, packageName: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a localized store listing.
   *
   * @param editId Identifier of the edit.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).
   * @param packageName Package name of the app.
   */
  async editsListingsGet(editId: string, language: string, packageName: string): Promise<Listing> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Listing;
  }

  /**
   * Lists all localized store listings.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsListingsList(editId: string, packageName: string): Promise<ListingsListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListingsListResponse;
  }

  /**
   * Patches a localized store listing.
   *
   * @param editId Identifier of the edit.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).
   * @param packageName Package name of the app.
   */
  async editsListingsPatch(editId: string, language: string, packageName: string, req: Listing): Promise<Listing> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Listing;
  }

  /**
   * Creates or updates a localized store listing.
   *
   * @param editId Identifier of the edit.
   * @param language Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).
   * @param packageName Package name of the app.
   */
  async editsListingsUpdate(editId: string, language: string, packageName: string, req: Listing): Promise<Listing> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/listings/${ language }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Listing;
  }

  /**
   * Gets testers. Note: Testers resource does not support email lists.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   * @param track The track to read from.
   */
  async editsTestersGet(editId: string, packageName: string, track: string): Promise<Testers> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/testers/${ track }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Testers;
  }

  /**
   * Patches testers. Note: Testers resource does not support email lists.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   * @param track The track to update.
   */
  async editsTestersPatch(editId: string, packageName: string, track: string, req: Testers): Promise<Testers> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/testers/${ track }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Testers;
  }

  /**
   * Updates testers. Note: Testers resource does not support email lists.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   * @param track The track to update.
   */
  async editsTestersUpdate(editId: string, packageName: string, track: string, req: Testers): Promise<Testers> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/testers/${ track }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Testers;
  }

  /**
   * Gets a track.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   * @param track Identifier of the track.
   */
  async editsTracksGet(editId: string, packageName: string, track: string): Promise<Track> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/tracks/${ track }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTrack(data);
  }

  /**
   * Lists all tracks.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsTracksList(editId: string, packageName: string): Promise<TracksListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/tracks`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTracksListResponse(data);
  }

  /**
   * Patches a track.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   * @param track Identifier of the track.
   */
  async editsTracksPatch(editId: string, packageName: string, track: string, req: Track): Promise<Track> {
    req = serializeTrack(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/tracks/${ track }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTrack(data);
  }

  /**
   * Updates a track.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   * @param track Identifier of the track.
   */
  async editsTracksUpdate(editId: string, packageName: string, track: string, req: Track): Promise<Track> {
    req = serializeTrack(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }/tracks/${ track }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeTrack(data);
  }

  /**
   * Validates an app edit.
   *
   * @param editId Identifier of the edit.
   * @param packageName Package name of the app.
   */
  async editsValidate(editId: string, packageName: string): Promise<AppEdit> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/edits/${ editId }:validate`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AppEdit;
  }

  /**
   * Downloads a single signed APK generated from an app bundle.
   *
   * @param downloadId Download ID, which uniquely identifies the APK to download. Can be obtained from the response of `generatedapks.list` method.
   * @param packageName Package name of the app.
   * @param versionCode Version code of the app bundle.
   */
  async generatedapksDownload(downloadId: string, packageName: string, versionCode: number): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/generatedApks/${ versionCode }/downloads/${ downloadId }:download`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
  }

  /**
   * Returns download metadata for all APKs that were generated from a given
   * app bundle.
   *
   * @param packageName Package name of the app.
   * @param versionCode Version code of the app bundle.
   */
  async generatedapksList(packageName: string, versionCode: number): Promise<GeneratedApksListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/generatedApks/${ versionCode }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGeneratedApksListResponse(data);
  }

  /**
   * Grant access for a user to the given package.
   *
   * @param parent Required. The user which needs permission. Format: developers/{developer}/users/{user}
   */
  async grantsCreate(parent: string, req: Grant): Promise<Grant> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/${ parent }/grants`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Grant;
  }

  /**
   * Removes all access for the user to the given package or developer account.
   *
   * @param name Required. The name of the grant to delete. Format: developers/{developer}/users/{email}/grants/{package_name}
   */
  async grantsDelete(name: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Updates access for the user to the given package.
   *
   * @param name Required. Resource name for this grant, following the pattern "developers/{developer}/users/{email}/grants/{package_name}". If this grant is for a draft app, the app ID will be used in this resource name instead of the package name.
   */
  async grantsPatch(name: string, req: Grant, opts: GrantsPatchOptions = {}): Promise<Grant> {
    opts = serializeGrantsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Grant;
  }

  /**
   * Deletes an in-app product (i.e. a managed product or a subscriptions).
   *
   * @param packageName Package name of the app.
   * @param sku Unique identifier for the in-app product.
   */
  async inappproductsDelete(packageName: string, sku: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/inappproducts/${ sku }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets an in-app product, which can be a managed product or a subscription.
   *
   * @param packageName Package name of the app.
   * @param sku Unique identifier for the in-app product.
   */
  async inappproductsGet(packageName: string, sku: string): Promise<InAppProduct> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/inappproducts/${ sku }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InAppProduct;
  }

  /**
   * Creates an in-app product (i.e. a managed product or a subscriptions).
   *
   * @param packageName Package name of the app.
   */
  async inappproductsInsert(packageName: string, req: InAppProduct, opts: InappproductsInsertOptions = {}): Promise<InAppProduct> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/inappproducts`);
    if (opts.autoConvertMissingPrices !== undefined) {
      url.searchParams.append("autoConvertMissingPrices", String(opts.autoConvertMissingPrices));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as InAppProduct;
  }

  /**
   * Lists all in-app products - both managed products and subscriptions. If an
   * app has a large number of in-app products, the response may be paginated.
   * In this case the response field `tokenPagination.nextPageToken` will be set
   * and the caller should provide its value as a `token` request parameter to
   * retrieve the next page.
   *
   * @param packageName Package name of the app.
   */
  async inappproductsList(packageName: string, opts: InappproductsListOptions = {}): Promise<InappproductsListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/inappproducts`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    if (opts.token !== undefined) {
      url.searchParams.append("token", String(opts.token));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InappproductsListResponse;
  }

  /**
   * Patches an in-app product (i.e. a managed product or a subscriptions).
   *
   * @param packageName Package name of the app.
   * @param sku Unique identifier for the in-app product.
   */
  async inappproductsPatch(packageName: string, sku: string, req: InAppProduct, opts: InappproductsPatchOptions = {}): Promise<InAppProduct> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/inappproducts/${ sku }`);
    if (opts.autoConvertMissingPrices !== undefined) {
      url.searchParams.append("autoConvertMissingPrices", String(opts.autoConvertMissingPrices));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as InAppProduct;
  }

  /**
   * Updates an in-app product (i.e. a managed product or a subscriptions).
   *
   * @param packageName Package name of the app.
   * @param sku Unique identifier for the in-app product.
   */
  async inappproductsUpdate(packageName: string, sku: string, req: InAppProduct, opts: InappproductsUpdateOptions = {}): Promise<InAppProduct> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/inappproducts/${ sku }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.autoConvertMissingPrices !== undefined) {
      url.searchParams.append("autoConvertMissingPrices", String(opts.autoConvertMissingPrices));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as InAppProduct;
  }

  /**
   * Uploads an APK to internal app sharing. If you are using the Google API
   * client libraries, please increase the timeout of the http request before
   * calling this endpoint (a timeout of 2 minutes is recommended). See
   * [Timeouts and
   * Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors)
   * for an example in java.
   *
   * @param packageName Package name of the app.
   */
  async internalappsharingartifactsUploadapk(packageName: string): Promise<InternalAppSharingArtifact> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/internalappsharing/${ packageName }/artifacts/apk`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as InternalAppSharingArtifact;
  }

  /**
   * Uploads an app bundle to internal app sharing. If you are using the Google
   * API client libraries, please increase the timeout of the http request
   * before calling this endpoint (a timeout of 2 minutes is recommended). See
   * [Timeouts and
   * Errors](https://developers.google.com/api-client-library/java/google-api-java-client/errors)
   * for an example in java.
   *
   * @param packageName Package name of the app.
   */
  async internalappsharingartifactsUploadbundle(packageName: string): Promise<InternalAppSharingArtifact> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/internalappsharing/${ packageName }/artifacts/bundle`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as InternalAppSharingArtifact;
  }

  /**
   * Calculates the region prices, using today's exchange rate and
   * country-specific pricing patterns, based on the price in the request for a
   * set of regions.
   *
   * @param packageName Required. The app package name.
   */
  async monetizationConvertRegionPrices(packageName: string, req: ConvertRegionPricesRequest): Promise<ConvertRegionPricesResponse> {
    req = serializeConvertRegionPricesRequest(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/pricing:convertRegionPrices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeConvertRegionPricesResponse(data);
  }

  /**
   * Archives a subscription. Can only be done if at least one base plan was
   * active in the past, and no base plan is available for new or existing
   * subscribers currently. This action is irreversible, and the subscription ID
   * will remain reserved.
   *
   * @param packageName Required. The parent app (package name) of the app of the subscription to delete.
   * @param productId Required. The unique product ID of the subscription to delete.
   */
  async monetizationSubscriptionsArchive(packageName: string, productId: string, req: ArchiveSubscriptionRequest): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }:archive`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Activates a base plan. Once activated, base plans will be available to new
   * subscribers.
   *
   * @param basePlanId Required. The unique base plan ID of the base plan to activate.
   * @param packageName Required. The parent app (package name) of the base plan to activate.
   * @param productId Required. The parent subscription (ID) of the base plan to activate.
   */
  async monetizationSubscriptionsBasePlansActivate(basePlanId: string, packageName: string, productId: string, req: ActivateBasePlanRequest): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Deactivates a base plan. Once deactivated, the base plan will become
   * unavailable to new subscribers, but existing subscribers will maintain
   * their subscription
   *
   * @param basePlanId Required. The unique base plan ID of the base plan to deactivate.
   * @param packageName Required. The parent app (package name) of the base plan to deactivate.
   * @param productId Required. The parent subscription (ID) of the base plan to deactivate.
   */
  async monetizationSubscriptionsBasePlansDeactivate(basePlanId: string, packageName: string, productId: string, req: DeactivateBasePlanRequest): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }:deactivate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Deletes a base plan. Can only be done for draft base plans. This action is
   * irreversible.
   *
   * @param basePlanId Required. The unique offer ID of the base plan to delete.
   * @param packageName Required. The parent app (package name) of the base plan to delete.
   * @param productId Required. The parent subscription (ID) of the base plan to delete.
   */
  async monetizationSubscriptionsBasePlansDelete(basePlanId: string, packageName: string, productId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Migrates subscribers who are receiving an historical subscription price to
   * the currently-offered price for the specified region. Requests will cause
   * price change notifications to be sent to users who are currently receiving
   * an historical price older than the supplied timestamp. Subscribers who do
   * not agree to the new price will have their subscription ended at the next
   * renewal.
   *
   * @param basePlanId Required. The unique base plan ID of the base plan to update prices on.
   * @param packageName Required. Package name of the parent app. Must be equal to the package_name field on the Subscription resource.
   * @param productId Required. The ID of the subscription to update. Must be equal to the product_id field on the Subscription resource.
   */
  async monetizationSubscriptionsBasePlansMigratePrices(basePlanId: string, packageName: string, productId: string, req: MigrateBasePlanPricesRequest): Promise<MigrateBasePlanPricesResponse> {
    req = serializeMigrateBasePlanPricesRequest(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }:migratePrices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as MigrateBasePlanPricesResponse;
  }

  /**
   * Activates a subscription offer. Once activated, subscription offers will
   * be available to new subscribers.
   *
   * @param basePlanId Required. The parent base plan (ID) of the offer to activate.
   * @param offerId Required. The unique offer ID of the offer to activate.
   * @param packageName Required. The parent app (package name) of the offer to activate.
   * @param productId Required. The parent subscription (ID) of the offer to activate.
   */
  async monetizationSubscriptionsBasePlansOffersActivate(basePlanId: string, offerId: string, packageName: string, productId: string, req: ActivateSubscriptionOfferRequest): Promise<SubscriptionOffer> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }/offers/${ offerId }:activate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscriptionOffer(data);
  }

  /**
   * Creates a new subscription offer. Only auto-renewing base plans can have
   * subscription offers. The offer state will be DRAFT until it is activated.
   *
   * @param basePlanId Required. The parent base plan (ID) for which the offer should be created. Must be equal to the base_plan_id field on the SubscriptionOffer resource.
   * @param packageName Required. The parent app (package name) for which the offer should be created. Must be equal to the package_name field on the Subscription resource.
   * @param productId Required. The parent subscription (ID) for which the offer should be created. Must be equal to the product_id field on the SubscriptionOffer resource.
   */
  async monetizationSubscriptionsBasePlansOffersCreate(basePlanId: string, packageName: string, productId: string, req: SubscriptionOffer, opts: MonetizationSubscriptionsBasePlansOffersCreateOptions = {}): Promise<SubscriptionOffer> {
    req = serializeSubscriptionOffer(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }/offers`);
    if (opts.offerId !== undefined) {
      url.searchParams.append("offerId", String(opts.offerId));
    }
    if (opts["regionsVersion.version"] !== undefined) {
      url.searchParams.append("regionsVersion.version", String(opts["regionsVersion.version"]));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscriptionOffer(data);
  }

  /**
   * Deactivates a subscription offer. Once deactivated, existing subscribers
   * will maintain their subscription, but the offer will become unavailable to
   * new subscribers.
   *
   * @param basePlanId Required. The parent base plan (ID) of the offer to deactivate.
   * @param offerId Required. The unique offer ID of the offer to deactivate.
   * @param packageName Required. The parent app (package name) of the offer to deactivate.
   * @param productId Required. The parent subscription (ID) of the offer to deactivate.
   */
  async monetizationSubscriptionsBasePlansOffersDeactivate(basePlanId: string, offerId: string, packageName: string, productId: string, req: DeactivateSubscriptionOfferRequest): Promise<SubscriptionOffer> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }/offers/${ offerId }:deactivate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscriptionOffer(data);
  }

  /**
   * Deletes a subscription offer. Can only be done for draft offers. This
   * action is irreversible.
   *
   * @param basePlanId Required. The parent base plan (ID) of the offer to delete.
   * @param offerId Required. The unique offer ID of the offer to delete.
   * @param packageName Required. The parent app (package name) of the offer to delete.
   * @param productId Required. The parent subscription (ID) of the offer to delete.
   */
  async monetizationSubscriptionsBasePlansOffersDelete(basePlanId: string, offerId: string, packageName: string, productId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }/offers/${ offerId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Reads a single offer
   *
   * @param basePlanId Required. The parent base plan (ID) of the offer to get.
   * @param offerId Required. The unique offer ID of the offer to get.
   * @param packageName Required. The parent app (package name) of the offer to get.
   * @param productId Required. The parent subscription (ID) of the offer to get.
   */
  async monetizationSubscriptionsBasePlansOffersGet(basePlanId: string, offerId: string, packageName: string, productId: string): Promise<SubscriptionOffer> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }/offers/${ offerId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubscriptionOffer(data);
  }

  /**
   * Lists all offers under a given subscription.
   *
   * @param basePlanId Required. The parent base plan (ID) for which the offers should be read. May be specified as '-' to read all offers under a subscription.
   * @param packageName Required. The parent app (package name) for which the subscriptions should be read.
   * @param productId Required. The parent subscription (ID) for which the offers should be read.
   */
  async monetizationSubscriptionsBasePlansOffersList(basePlanId: string, packageName: string, productId: string, opts: MonetizationSubscriptionsBasePlansOffersListOptions = {}): Promise<ListSubscriptionOffersResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }/offers`);
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
    return deserializeListSubscriptionOffersResponse(data);
  }

  /**
   * Updates an existing subscription offer.
   *
   * @param basePlanId Required. Immutable. The ID of the base plan to which this offer is an extension.
   * @param offerId Required. Immutable. Unique ID of this subscription offer. Must be unique within the base plan.
   * @param packageName Required. Immutable. The package name of the app the parent subscription belongs to.
   * @param productId Required. Immutable. The ID of the parent subscription this offer belongs to.
   */
  async monetizationSubscriptionsBasePlansOffersPatch(basePlanId: string, offerId: string, packageName: string, productId: string, req: SubscriptionOffer, opts: MonetizationSubscriptionsBasePlansOffersPatchOptions = {}): Promise<SubscriptionOffer> {
    req = serializeSubscriptionOffer(req);
    opts = serializeMonetizationSubscriptionsBasePlansOffersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }/basePlans/${ basePlanId }/offers/${ offerId }`);
    if (opts["regionsVersion.version"] !== undefined) {
      url.searchParams.append("regionsVersion.version", String(opts["regionsVersion.version"]));
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
    return deserializeSubscriptionOffer(data);
  }

  /**
   * Creates a new subscription. Newly added base plans will remain in draft
   * state until activated.
   *
   * @param packageName Required. The parent app (package name) for which the subscription should be created. Must be equal to the package_name field on the Subscription resource.
   */
  async monetizationSubscriptionsCreate(packageName: string, req: Subscription, opts: MonetizationSubscriptionsCreateOptions = {}): Promise<Subscription> {
    req = serializeSubscription(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions`);
    if (opts.productId !== undefined) {
      url.searchParams.append("productId", String(opts.productId));
    }
    if (opts["regionsVersion.version"] !== undefined) {
      url.searchParams.append("regionsVersion.version", String(opts["regionsVersion.version"]));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscription(data);
  }

  /**
   * Deletes a subscription. A subscription can only be deleted if it has never
   * had a base plan published.
   *
   * @param packageName Required. The parent app (package name) of the app of the subscription to delete.
   * @param productId Required. The unique product ID of the subscription to delete.
   */
  async monetizationSubscriptionsDelete(packageName: string, productId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Reads a single subscription.
   *
   * @param packageName Required. The parent app (package name) of the subscription to get.
   * @param productId Required. The unique product ID of the subscription to get.
   */
  async monetizationSubscriptionsGet(packageName: string, productId: string): Promise<Subscription> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubscription(data);
  }

  /**
   * Lists all subscriptions under a given app.
   *
   * @param packageName Required. The parent app (package name) for which the subscriptions should be read.
   */
  async monetizationSubscriptionsList(packageName: string, opts: MonetizationSubscriptionsListOptions = {}): Promise<ListSubscriptionsResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showArchived !== undefined) {
      url.searchParams.append("showArchived", String(opts.showArchived));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListSubscriptionsResponse(data);
  }

  /**
   * Updates an existing subscription.
   *
   * @param packageName Immutable. Package name of the parent app.
   * @param productId Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must be composed of lower-case letters (a-z), numbers (0-9), underscores (_) and dots (.). It must start with a lower-case letter or number, and be between 1 and 40 (inclusive) characters in length.
   */
  async monetizationSubscriptionsPatch(packageName: string, productId: string, req: Subscription, opts: MonetizationSubscriptionsPatchOptions = {}): Promise<Subscription> {
    req = serializeSubscription(req);
    opts = serializeMonetizationSubscriptionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/subscriptions/${ productId }`);
    if (opts["regionsVersion.version"] !== undefined) {
      url.searchParams.append("regionsVersion.version", String(opts["regionsVersion.version"]));
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
    return deserializeSubscription(data);
  }

  /**
   * Refunds a user's subscription or in-app purchase order. Orders older than
   * 1 year cannot be refunded.
   *
   * @param orderId The order ID provided to the user when the subscription or in-app order was purchased.
   * @param packageName The package name of the application for which this subscription or in-app item was purchased (for example, 'com.some.thing').
   */
  async ordersRefund(orderId: string, packageName: string, opts: OrdersRefundOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/orders/${ orderId }:refund`);
    if (opts.revoke !== undefined) {
      url.searchParams.append("revoke", String(opts.revoke));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Acknowledges a purchase of an inapp item.
   *
   * @param packageName The package name of the application the inapp product was sold in (for example, 'com.some.thing').
   * @param productId The inapp product SKU (for example, 'com.some.thing.inapp1').
   * @param token The token provided to the user's device when the inapp product was purchased.
   */
  async purchasesProductsAcknowledge(packageName: string, productId: string, token: string, req: ProductPurchasesAcknowledgeRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/products/${ productId }/tokens/${ token }:acknowledge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Consumes a purchase for an inapp item.
   *
   * @param packageName The package name of the application the inapp product was sold in (for example, 'com.some.thing').
   * @param productId The inapp product SKU (for example, 'com.some.thing.inapp1').
   * @param token The token provided to the user's device when the inapp product was purchased.
   */
  async purchasesProductsConsume(packageName: string, productId: string, token: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/products/${ productId }/tokens/${ token }:consume`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Checks the purchase and consumption status of an inapp item.
   *
   * @param packageName The package name of the application the inapp product was sold in (for example, 'com.some.thing').
   * @param productId The inapp product SKU (for example, 'com.some.thing.inapp1').
   * @param token The token provided to the user's device when the inapp product was purchased.
   */
  async purchasesProductsGet(packageName: string, productId: string, token: string): Promise<ProductPurchase> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/products/${ productId }/tokens/${ token }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProductPurchase(data);
  }

  /**
   * Acknowledges a subscription purchase.
   *
   * @param packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
   * @param subscriptionId The purchased subscription ID (for example, 'monthly001').
   * @param token The token provided to the user's device when the subscription was purchased.
   */
  async purchasesSubscriptionsAcknowledge(packageName: string, subscriptionId: string, token: string, req: SubscriptionPurchasesAcknowledgeRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/subscriptions/${ subscriptionId }/tokens/${ token }:acknowledge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Cancels a user's subscription purchase. The subscription remains valid
   * until its expiration time.
   *
   * @param packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
   * @param subscriptionId The purchased subscription ID (for example, 'monthly001').
   * @param token The token provided to the user's device when the subscription was purchased.
   */
  async purchasesSubscriptionsCancel(packageName: string, subscriptionId: string, token: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/subscriptions/${ subscriptionId }/tokens/${ token }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Defers a user's subscription purchase until a specified future expiration
   * time.
   *
   * @param packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
   * @param subscriptionId The purchased subscription ID (for example, 'monthly001').
   * @param token The token provided to the user's device when the subscription was purchased.
   */
  async purchasesSubscriptionsDefer(packageName: string, subscriptionId: string, token: string, req: SubscriptionPurchasesDeferRequest): Promise<SubscriptionPurchasesDeferResponse> {
    req = serializeSubscriptionPurchasesDeferRequest(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/subscriptions/${ subscriptionId }/tokens/${ token }:defer`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSubscriptionPurchasesDeferResponse(data);
  }

  /**
   * Checks whether a user's subscription purchase is valid and returns its
   * expiry time.
   *
   * @param packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
   * @param subscriptionId The purchased subscription ID (for example, 'monthly001').
   * @param token The token provided to the user's device when the subscription was purchased.
   */
  async purchasesSubscriptionsGet(packageName: string, subscriptionId: string, token: string): Promise<SubscriptionPurchase> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/subscriptions/${ subscriptionId }/tokens/${ token }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubscriptionPurchase(data);
  }

  /**
   * Refunds a user's subscription purchase, but the subscription remains valid
   * until its expiration time and it will continue to recur.
   *
   * @param packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
   * @param subscriptionId "The purchased subscription ID (for example, 'monthly001').
   * @param token The token provided to the user's device when the subscription was purchased.
   */
  async purchasesSubscriptionsRefund(packageName: string, subscriptionId: string, token: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/subscriptions/${ subscriptionId }/tokens/${ token }:refund`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Refunds and immediately revokes a user's subscription purchase. Access to
   * the subscription will be terminated immediately and it will stop recurring.
   *
   * @param packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
   * @param subscriptionId The purchased subscription ID (for example, 'monthly001').
   * @param token The token provided to the user's device when the subscription was purchased.
   */
  async purchasesSubscriptionsRevoke(packageName: string, subscriptionId: string, token: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/subscriptions/${ subscriptionId }/tokens/${ token }:revoke`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Get metadata about a subscription
   *
   * @param packageName The package of the application for which this subscription was purchased (for example, 'com.some.thing').
   * @param token Required. The token provided to the user's device when the subscription was purchased.
   */
  async purchasesSubscriptionsv2Get(packageName: string, token: string): Promise<SubscriptionPurchaseV2> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/subscriptionsv2/tokens/${ token }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSubscriptionPurchaseV2(data);
  }

  /**
   * Lists the purchases that were canceled, refunded or charged-back.
   *
   * @param packageName The package name of the application for which voided purchases need to be returned (for example, 'com.some.thing').
   */
  async purchasesVoidedpurchasesList(packageName: string, opts: PurchasesVoidedpurchasesListOptions = {}): Promise<VoidedPurchasesListResponse> {
    opts = serializePurchasesVoidedpurchasesListOptions(opts);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/purchases/voidedpurchases`);
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    if (opts.token !== undefined) {
      url.searchParams.append("token", String(opts.token));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVoidedPurchasesListResponse(data);
  }

  /**
   * Gets a single review.
   *
   * @param packageName Package name of the app.
   * @param reviewId Unique identifier for a review.
   */
  async reviewsGet(packageName: string, reviewId: string, opts: ReviewsGetOptions = {}): Promise<Review> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/reviews/${ reviewId }`);
    if (opts.translationLanguage !== undefined) {
      url.searchParams.append("translationLanguage", String(opts.translationLanguage));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReview(data);
  }

  /**
   * Lists all reviews.
   *
   * @param packageName Package name of the app.
   */
  async reviewsList(packageName: string, opts: ReviewsListOptions = {}): Promise<ReviewsListResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/reviews`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    if (opts.token !== undefined) {
      url.searchParams.append("token", String(opts.token));
    }
    if (opts.translationLanguage !== undefined) {
      url.searchParams.append("translationLanguage", String(opts.translationLanguage));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReviewsListResponse(data);
  }

  /**
   * Replies to a single review, or updates an existing reply.
   *
   * @param packageName Package name of the app.
   * @param reviewId Unique identifier for a review.
   */
  async reviewsReply(packageName: string, reviewId: string, req: ReviewsReplyRequest): Promise<ReviewsReplyResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/reviews/${ reviewId }:reply`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReviewsReplyResponse(data);
  }

  /**
   * Creates an APK which is suitable for inclusion in a system image from an
   * already uploaded Android App Bundle.
   *
   * @param packageName Package name of the app.
   * @param versionCode The version code of the App Bundle.
   */
  async systemapksVariantsCreate(packageName: string, versionCode: bigint, req: Variant): Promise<Variant> {
    versionCode = String(versionCode);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/systemApks/${ versionCode }/variants`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Variant;
  }

  /**
   * Downloads a previously created system APK which is suitable for inclusion
   * in a system image.
   *
   * @param packageName Package name of the app.
   * @param variantId The ID of a previously created system APK variant.
   * @param versionCode The version code of the App Bundle.
   */
  async systemapksVariantsDownload(packageName: string, variantId: number, versionCode: bigint): Promise<void> {
    versionCode = String(versionCode);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/systemApks/${ versionCode }/variants/${ variantId }:download`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
  }

  /**
   * Returns a previously created system APK variant.
   *
   * @param packageName Package name of the app.
   * @param variantId The ID of a previously created system APK variant.
   * @param versionCode The version code of the App Bundle.
   */
  async systemapksVariantsGet(packageName: string, variantId: number, versionCode: bigint): Promise<Variant> {
    versionCode = String(versionCode);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/systemApks/${ versionCode }/variants/${ variantId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Variant;
  }

  /**
   * Returns the list of previously created system APK variants.
   *
   * @param packageName Package name of the app.
   * @param versionCode The version code of the App Bundle.
   */
  async systemapksVariantsList(packageName: string, versionCode: bigint): Promise<SystemApksListResponse> {
    versionCode = String(versionCode);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/applications/${ packageName }/systemApks/${ versionCode }/variants`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SystemApksListResponse;
  }

  /**
   * Grant access for a user to the given developer account.
   *
   * @param parent Required. The developer account to add the user to. Format: developers/{developer}
   */
  async usersCreate(parent: string, req: User): Promise<User> {
    req = serializeUser(req);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/${ parent }/users`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeUser(data);
  }

  /**
   * Removes all access for the user to the given developer account.
   *
   * @param name Required. The name of the user to delete. Format: developers/{developer}/users/{email}
   */
  async usersDelete(name: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Lists all users with access to a developer account.
   *
   * @param parent Required. The developer account to fetch users from. Format: developers/{developer}
   */
  async usersList(parent: string, opts: UsersListOptions = {}): Promise<ListUsersResponse> {
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/${ parent }/users`);
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
    return deserializeListUsersResponse(data);
  }

  /**
   * Updates access for the user to the developer account.
   *
   * @param name Required. Resource name for this user, following the pattern "developers/{developer}/users/{email}".
   */
  async usersPatch(name: string, req: User, opts: UsersPatchOptions = {}): Promise<User> {
    req = serializeUser(req);
    opts = serializeUsersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}androidpublisher/v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeUser(data);
  }
}

/**
 * Represents a targeting rule of the form: User never had {scope} before.
 */
export interface AcquisitionTargetingRule {
  /**
   * Required. The scope of subscriptions this rule considers. Only allows
   * "this subscription" and "any subscription in app".
   */
  scope?: TargetingRuleScope;
}

/**
 * Request message for ActivateBasePlan.
 */
export interface ActivateBasePlanRequest {
}

/**
 * Request message for ActivateSubscriptionOffer.
 */
export interface ActivateSubscriptionOfferRequest {
}

/**
 * Information about an APK. The resource for ApksService.
 */
export interface Apk {
  /**
   * Information about the binary payload of this APK.
   */
  binary?: ApkBinary;
  /**
   * The version code of the APK, as specified in the manifest file.
   */
  versionCode?: number;
}

/**
 * Represents the binary payload of an APK.
 */
export interface ApkBinary {
  /**
   * A sha1 hash of the APK payload, encoded as a hex string and matching the
   * output of the sha1sum command.
   */
  sha1?: string;
  /**
   * A sha256 hash of the APK payload, encoded as a hex string and matching the
   * output of the sha256sum command.
   */
  sha256?: string;
}

/**
 * Request to create a new externally hosted APK.
 */
export interface ApksAddExternallyHostedRequest {
  /**
   * The definition of the externally-hosted APK and where it is located.
   */
  externallyHostedApk?: ExternallyHostedApk;
}

function serializeApksAddExternallyHostedRequest(data: any): ApksAddExternallyHostedRequest {
  return {
    ...data,
    externallyHostedApk: data["externallyHostedApk"] !== undefined ? serializeExternallyHostedApk(data["externallyHostedApk"]) : undefined,
  };
}

function deserializeApksAddExternallyHostedRequest(data: any): ApksAddExternallyHostedRequest {
  return {
    ...data,
    externallyHostedApk: data["externallyHostedApk"] !== undefined ? deserializeExternallyHostedApk(data["externallyHostedApk"]) : undefined,
  };
}

/**
 * Response for creating a new externally hosted APK.
 */
export interface ApksAddExternallyHostedResponse {
  /**
   * The definition of the externally-hosted APK and where it is located.
   */
  externallyHostedApk?: ExternallyHostedApk;
}

function serializeApksAddExternallyHostedResponse(data: any): ApksAddExternallyHostedResponse {
  return {
    ...data,
    externallyHostedApk: data["externallyHostedApk"] !== undefined ? serializeExternallyHostedApk(data["externallyHostedApk"]) : undefined,
  };
}

function deserializeApksAddExternallyHostedResponse(data: any): ApksAddExternallyHostedResponse {
  return {
    ...data,
    externallyHostedApk: data["externallyHostedApk"] !== undefined ? deserializeExternallyHostedApk(data["externallyHostedApk"]) : undefined,
  };
}

/**
 * Response listing all APKs.
 */
export interface ApksListResponse {
  /**
   * All APKs.
   */
  apks?: Apk[];
  /**
   * The kind of this response ("androidpublisher#apksListResponse").
   */
  kind?: string;
}

/**
 * The app details. The resource for DetailsService.
 */
export interface AppDetails {
  /**
   * The user-visible support email for this app.
   */
  contactEmail?: string;
  /**
   * The user-visible support telephone number for this app.
   */
  contactPhone?: string;
  /**
   * The user-visible website for this app.
   */
  contactWebsite?: string;
  /**
   * Default language code, in BCP 47 format (eg "en-US").
   */
  defaultLanguage?: string;
}

/**
 * An app edit. The resource for EditsService.
 */
export interface AppEdit {
  /**
   * Output only. The time (as seconds since Epoch) at which the edit will
   * expire and will be no longer valid for use.
   */
  readonly expiryTimeSeconds?: string;
  /**
   * Output only. Identifier of the edit. Can be used in subsequent API calls.
   */
  readonly id?: string;
}

/**
 * Additional options for Androidpublisher#applicationsDeviceTierConfigsCreate.
 */
export interface ApplicationsDeviceTierConfigsCreateOptions {
  /**
   * Whether the service should accept device IDs that are unknown to Play's
   * device catalog.
   */
  allowUnknownDevices?: boolean;
}

/**
 * Additional options for Androidpublisher#applicationsDeviceTierConfigsList.
 */
export interface ApplicationsDeviceTierConfigsListOptions {
  /**
   * The maximum number of device tier configs to return. The service may
   * return fewer than this value. If unspecified, at most 10 device tier
   * configs will be returned. The maximum value for this field is 100; values
   * above 100 will be coerced to 100. Device tier configs will be ordered by
   * descending creation time.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListDeviceTierConfigs` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Request message for ArchiveSubscription.
 */
export interface ArchiveSubscriptionRequest {
}

/**
 * Represents a base plan that automatically renews at the end of its
 * subscription period.
 */
export interface AutoRenewingBasePlanType {
  /**
   * Required. Subscription period, specified in ISO 8601 format. For a list of
   * acceptable billing periods, refer to the help center.
   */
  billingPeriodDuration?: string;
  /**
   * Grace period of the subscription, specified in ISO 8601 format. Acceptable
   * values are P0D (zero days), P3D (3 days), P7D (7 days), P14D (14 days), and
   * P30D (30 days). If not specified, a default value will be used based on the
   * recurring period duration.
   */
  gracePeriodDuration?: string;
  /**
   * Whether the renewing base plan is backward compatible. The backward
   * compatible base plan is returned by the Google Play Billing Library
   * deprecated method querySkuDetailsAsync(). Only one renewing base plan can
   * be marked as legacy compatible for a given subscription.
   */
  legacyCompatible?: boolean;
  /**
   * Subscription offer id which is legacy compatible. The backward compatible
   * subscription offer is returned by the Google Play Billing Library
   * deprecated method querySkuDetailsAsync(). Only one subscription offer can
   * be marked as legacy compatible for a given renewing base plan. To have no
   * Subscription offer as legacy compatible set this field as empty string.
   */
  legacyCompatibleSubscriptionOfferId?: string;
  /**
   * The proration mode for the base plan determines what happens when a user
   * switches to this plan from another base plan. If unspecified, defaults to
   * CHARGE_ON_NEXT_BILLING_DATE.
   */
  prorationMode?:  | "SUBSCRIPTION_PRORATION_MODE_UNSPECIFIED" | "SUBSCRIPTION_PRORATION_MODE_CHARGE_ON_NEXT_BILLING_DATE" | "SUBSCRIPTION_PRORATION_MODE_CHARGE_FULL_PRICE_IMMEDIATELY";
  /**
   * Whether users should be able to resubscribe to this base plan in Google
   * Play surfaces. Defaults to RESUBSCRIBE_STATE_ACTIVE if not specified.
   */
  resubscribeState?:  | "RESUBSCRIBE_STATE_UNSPECIFIED" | "RESUBSCRIBE_STATE_ACTIVE" | "RESUBSCRIBE_STATE_INACTIVE";
}

/**
 * Information related to an auto renewing plan.
 */
export interface AutoRenewingPlan {
  /**
   * If the subscription is currently set to auto-renew, e.g. the user has not
   * canceled the subscription
   */
  autoRenewEnabled?: boolean;
  /**
   * The information of the last price change for the item since subscription
   * signup.
   */
  priceChangeDetails?: SubscriptionItemPriceChangeDetails;
}

function serializeAutoRenewingPlan(data: any): AutoRenewingPlan {
  return {
    ...data,
    priceChangeDetails: data["priceChangeDetails"] !== undefined ? serializeSubscriptionItemPriceChangeDetails(data["priceChangeDetails"]) : undefined,
  };
}

function deserializeAutoRenewingPlan(data: any): AutoRenewingPlan {
  return {
    ...data,
    priceChangeDetails: data["priceChangeDetails"] !== undefined ? deserializeSubscriptionItemPriceChangeDetails(data["priceChangeDetails"]) : undefined,
  };
}

/**
 * A single base plan for a subscription.
 */
export interface BasePlan {
  /**
   * Set when the base plan automatically renews at a regular interval.
   */
  autoRenewingBasePlanType?: AutoRenewingBasePlanType;
  /**
   * Required. Immutable. The unique identifier of this base plan. Must be
   * unique within the subscription, and conform with RFC-1034. That is, this ID
   * can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-),
   * and be at most 63 characters.
   */
  basePlanId?: string;
  /**
   * List of up to 20 custom tags specified for this base plan, and returned to
   * the app through the billing library. Subscription offers for this base plan
   * will also receive these offer tags in the billing library.
   */
  offerTags?: OfferTag[];
  /**
   * Pricing information for any new locations Play may launch in the future.
   * If omitted, the BasePlan will not be automatically available any new
   * locations Play may launch in the future.
   */
  otherRegionsConfig?: OtherRegionsBasePlanConfig;
  /**
   * Set when the base plan does not automatically renew at the end of the
   * billing period.
   */
  prepaidBasePlanType?: PrepaidBasePlanType;
  /**
   * Region-specific information for this base plan.
   */
  regionalConfigs?: RegionalBasePlanConfig[];
  /**
   * Output only. The state of the base plan, i.e. whether it's active. Draft
   * and inactive base plans can be activated or deleted. Active base plans can
   * be made inactive. Inactive base plans can be canceled. This field cannot be
   * changed by updating the resource. Use the dedicated endpoints instead.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "INACTIVE";
}

function serializeBasePlan(data: any): BasePlan {
  return {
    ...data,
    otherRegionsConfig: data["otherRegionsConfig"] !== undefined ? serializeOtherRegionsBasePlanConfig(data["otherRegionsConfig"]) : undefined,
    regionalConfigs: data["regionalConfigs"] !== undefined ? data["regionalConfigs"].map((item: any) => (serializeRegionalBasePlanConfig(item))) : undefined,
  };
}

function deserializeBasePlan(data: any): BasePlan {
  return {
    ...data,
    otherRegionsConfig: data["otherRegionsConfig"] !== undefined ? deserializeOtherRegionsBasePlanConfig(data["otherRegionsConfig"]) : undefined,
    regionalConfigs: data["regionalConfigs"] !== undefined ? data["regionalConfigs"].map((item: any) => (deserializeRegionalBasePlanConfig(item))) : undefined,
  };
}

/**
 * Information about an app bundle. The resource for BundlesService.
 */
export interface Bundle {
  /**
   * A sha1 hash of the upload payload, encoded as a hex string and matching
   * the output of the sha1sum command.
   */
  sha1?: string;
  /**
   * A sha256 hash of the upload payload, encoded as a hex string and matching
   * the output of the sha256sum command.
   */
  sha256?: string;
  /**
   * The version code of the Android App Bundle, as specified in the Android
   * App Bundle's base module APK manifest file.
   */
  versionCode?: number;
}

/**
 * Response listing all app bundles.
 */
export interface BundlesListResponse {
  /**
   * All app bundles.
   */
  bundles?: Bundle[];
  /**
   * The kind of this response ("androidpublisher#bundlesListResponse").
   */
  kind?: string;
}

/**
 * Information specific to a subscription in canceled state.
 */
export interface CanceledStateContext {
  /**
   * Subscription was canceled by the developer.
   */
  developerInitiatedCancellation?: DeveloperInitiatedCancellation;
  /**
   * Subscription was replaced by a new subscription.
   */
  replacementCancellation?: ReplacementCancellation;
  /**
   * Subscription was canceled by the system, for example because of a billing
   * problem.
   */
  systemInitiatedCancellation?: SystemInitiatedCancellation;
  /**
   * Subscription was canceled by user.
   */
  userInitiatedCancellation?: UserInitiatedCancellation;
}

function serializeCanceledStateContext(data: any): CanceledStateContext {
  return {
    ...data,
    userInitiatedCancellation: data["userInitiatedCancellation"] !== undefined ? serializeUserInitiatedCancellation(data["userInitiatedCancellation"]) : undefined,
  };
}

function deserializeCanceledStateContext(data: any): CanceledStateContext {
  return {
    ...data,
    userInitiatedCancellation: data["userInitiatedCancellation"] !== undefined ? deserializeUserInitiatedCancellation(data["userInitiatedCancellation"]) : undefined,
  };
}

/**
 * Result of the cancel survey when the subscription was canceled by the user.
 */
export interface CancelSurveyResult {
  /**
   * The reason the user selected in the cancel survey.
   */
  reason?:  | "CANCEL_SURVEY_REASON_UNSPECIFIED" | "CANCEL_SURVEY_REASON_NOT_ENOUGH_USAGE" | "CANCEL_SURVEY_REASON_TECHNICAL_ISSUES" | "CANCEL_SURVEY_REASON_COST_RELATED" | "CANCEL_SURVEY_REASON_FOUND_BETTER_APP" | "CANCEL_SURVEY_REASON_OTHERS";
  /**
   * Only set for CANCEL_SURVEY_REASON_OTHERS. This is the user's freeform
   * response to the survey.
   */
  reasonUserInput?: string;
}

/**
 * An entry of conversation between user and developer.
 */
export interface Comment {
  /**
   * A comment from a developer.
   */
  developerComment?: DeveloperComment;
  /**
   * A comment from a user.
   */
  userComment?: UserComment;
}

function serializeComment(data: any): Comment {
  return {
    ...data,
    developerComment: data["developerComment"] !== undefined ? serializeDeveloperComment(data["developerComment"]) : undefined,
    userComment: data["userComment"] !== undefined ? serializeUserComment(data["userComment"]) : undefined,
  };
}

function deserializeComment(data: any): Comment {
  return {
    ...data,
    developerComment: data["developerComment"] !== undefined ? deserializeDeveloperComment(data["developerComment"]) : undefined,
    userComment: data["userComment"] !== undefined ? deserializeUserComment(data["userComment"]) : undefined,
  };
}

/**
 * Converted other regions prices.
 */
export interface ConvertedOtherRegionsPrice {
  /**
   * Price in EUR to use for the "Other regions" location exclusive of taxes.
   */
  eurPrice?: Money;
  /**
   * Price in USD to use for the "Other regions" location exclusive of taxes.
   */
  usdPrice?: Money;
}

function serializeConvertedOtherRegionsPrice(data: any): ConvertedOtherRegionsPrice {
  return {
    ...data,
    eurPrice: data["eurPrice"] !== undefined ? serializeMoney(data["eurPrice"]) : undefined,
    usdPrice: data["usdPrice"] !== undefined ? serializeMoney(data["usdPrice"]) : undefined,
  };
}

function deserializeConvertedOtherRegionsPrice(data: any): ConvertedOtherRegionsPrice {
  return {
    ...data,
    eurPrice: data["eurPrice"] !== undefined ? deserializeMoney(data["eurPrice"]) : undefined,
    usdPrice: data["usdPrice"] !== undefined ? deserializeMoney(data["usdPrice"]) : undefined,
  };
}

/**
 * A converted region price.
 */
export interface ConvertedRegionPrice {
  /**
   * The converted price tax inclusive.
   */
  price?: Money;
  /**
   * The region code of the region.
   */
  regionCode?: string;
  /**
   * The tax amount of the converted price.
   */
  taxAmount?: Money;
}

function serializeConvertedRegionPrice(data: any): ConvertedRegionPrice {
  return {
    ...data,
    price: data["price"] !== undefined ? serializeMoney(data["price"]) : undefined,
    taxAmount: data["taxAmount"] !== undefined ? serializeMoney(data["taxAmount"]) : undefined,
  };
}

function deserializeConvertedRegionPrice(data: any): ConvertedRegionPrice {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializeMoney(data["price"]) : undefined,
    taxAmount: data["taxAmount"] !== undefined ? deserializeMoney(data["taxAmount"]) : undefined,
  };
}

/**
 * Request message for ConvertRegionPrices.
 */
export interface ConvertRegionPricesRequest {
  /**
   * The intital price to convert other regions from. Tax exclusive.
   */
  price?: Money;
}

function serializeConvertRegionPricesRequest(data: any): ConvertRegionPricesRequest {
  return {
    ...data,
    price: data["price"] !== undefined ? serializeMoney(data["price"]) : undefined,
  };
}

function deserializeConvertRegionPricesRequest(data: any): ConvertRegionPricesRequest {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializeMoney(data["price"]) : undefined,
  };
}

/**
 * Response message for ConvertRegionPrices.
 */
export interface ConvertRegionPricesResponse {
  /**
   * Converted other regions prices in USD and EUR, to use for countries where
   * Play doesn't support a country's local currency.
   */
  convertedOtherRegionsPrice?: ConvertedOtherRegionsPrice;
  /**
   * Map from region code to converted region price.
   */
  convertedRegionPrices?: {
    [key: string]: ConvertedRegionPrice
  };
}

function serializeConvertRegionPricesResponse(data: any): ConvertRegionPricesResponse {
  return {
    ...data,
    convertedOtherRegionsPrice: data["convertedOtherRegionsPrice"] !== undefined ? serializeConvertedOtherRegionsPrice(data["convertedOtherRegionsPrice"]) : undefined,
    convertedRegionPrices: data["convertedRegionPrices"] !== undefined ? Object.fromEntries(Object.entries(data["convertedRegionPrices"]).map(([k, v]: [string, any]) => ([k, serializeConvertedRegionPrice(v)]))) : undefined,
  };
}

function deserializeConvertRegionPricesResponse(data: any): ConvertRegionPricesResponse {
  return {
    ...data,
    convertedOtherRegionsPrice: data["convertedOtherRegionsPrice"] !== undefined ? deserializeConvertedOtherRegionsPrice(data["convertedOtherRegionsPrice"]) : undefined,
    convertedRegionPrices: data["convertedRegionPrices"] !== undefined ? Object.fromEntries(Object.entries(data["convertedRegionPrices"]).map(([k, v]: [string, any]) => ([k, deserializeConvertedRegionPrice(v)]))) : undefined,
  };
}

/**
 * Country targeting specification.
 */
export interface CountryTargeting {
  /**
   * Countries to target, specified as two letter [CLDR
   * codes](https://unicode.org/cldr/charts/latest/supplemental/territory_containment_un_m_49.html).
   */
  countries?: string[];
  /**
   * Include "rest of world" as well as explicitly targeted countries.
   */
  includeRestOfWorld?: boolean;
}

/**
 * Request message for DeactivateBasePlan.
 */
export interface DeactivateBasePlanRequest {
}

/**
 * Request message for DeactivateSubscriptionOffer.
 */
export interface DeactivateSubscriptionOfferRequest {
}

/**
 * Represents a deobfuscation file.
 */
export interface DeobfuscationFile {
  /**
   * The type of the deobfuscation file.
   */
  symbolType?:  | "deobfuscationFileTypeUnspecified" | "proguard" | "nativeCode";
}

/**
 * Responses for the upload.
 */
export interface DeobfuscationFilesUploadResponse {
  /**
   * The uploaded Deobfuscation File configuration.
   */
  deobfuscationFile?: DeobfuscationFile;
}

/**
 * Developer entry from conversation between user and developer.
 */
export interface DeveloperComment {
  /**
   * The last time at which this comment was updated.
   */
  lastModified?: Timestamp;
  /**
   * The content of the comment, i.e. reply body.
   */
  text?: string;
}

function serializeDeveloperComment(data: any): DeveloperComment {
  return {
    ...data,
    lastModified: data["lastModified"] !== undefined ? serializeTimestamp(data["lastModified"]) : undefined,
  };
}

function deserializeDeveloperComment(data: any): DeveloperComment {
  return {
    ...data,
    lastModified: data["lastModified"] !== undefined ? deserializeTimestamp(data["lastModified"]) : undefined,
  };
}

/**
 * Information specific to cancellations initiated by developers.
 */
export interface DeveloperInitiatedCancellation {
}

/**
 * A group of devices. A group is defined by a set of device selectors. A
 * device belongs to the group if it matches any selector (logical OR).
 */
export interface DeviceGroup {
  /**
   * Device selectors for this group. A device matching any of the selectors is
   * included in this group.
   */
  deviceSelectors?: DeviceSelector[];
  /**
   * The name of the group.
   */
  name?: string;
}

function serializeDeviceGroup(data: any): DeviceGroup {
  return {
    ...data,
    deviceSelectors: data["deviceSelectors"] !== undefined ? data["deviceSelectors"].map((item: any) => (serializeDeviceSelector(item))) : undefined,
  };
}

function deserializeDeviceGroup(data: any): DeviceGroup {
  return {
    ...data,
    deviceSelectors: data["deviceSelectors"] !== undefined ? data["deviceSelectors"].map((item: any) => (deserializeDeviceSelector(item))) : undefined,
  };
}

/**
 * Identifier of a device.
 */
export interface DeviceId {
  /**
   * Value of Build.BRAND.
   */
  buildBrand?: string;
  /**
   * Value of Build.DEVICE.
   */
  buildDevice?: string;
}

/**
 * Characteristics of the user's device.
 */
export interface DeviceMetadata {
  /**
   * Device CPU make, e.g. "Qualcomm"
   */
  cpuMake?: string;
  /**
   * Device CPU model, e.g. "MSM8974"
   */
  cpuModel?: string;
  /**
   * Device class (e.g. tablet)
   */
  deviceClass?: string;
  /**
   * OpenGL version
   */
  glEsVersion?: number;
  /**
   * Device manufacturer (e.g. Motorola)
   */
  manufacturer?: string;
  /**
   * Comma separated list of native platforms (e.g. "arm", "arm7")
   */
  nativePlatform?: string;
  /**
   * Device model name (e.g. Droid)
   */
  productName?: string;
  /**
   * Device RAM in Megabytes, e.g. "2048"
   */
  ramMb?: number;
  /**
   * Screen density in DPI
   */
  screenDensityDpi?: number;
  /**
   * Screen height in pixels
   */
  screenHeightPx?: number;
  /**
   * Screen width in pixels
   */
  screenWidthPx?: number;
}

/**
 * Conditions about a device's RAM capabilities.
 */
export interface DeviceRam {
  /**
   * Maximum RAM in bytes (bound excluded).
   */
  maxBytes?: bigint;
  /**
   * Minimum RAM in bytes (bound included).
   */
  minBytes?: bigint;
}

function serializeDeviceRam(data: any): DeviceRam {
  return {
    ...data,
    maxBytes: data["maxBytes"] !== undefined ? String(data["maxBytes"]) : undefined,
    minBytes: data["minBytes"] !== undefined ? String(data["minBytes"]) : undefined,
  };
}

function deserializeDeviceRam(data: any): DeviceRam {
  return {
    ...data,
    maxBytes: data["maxBytes"] !== undefined ? BigInt(data["maxBytes"]) : undefined,
    minBytes: data["minBytes"] !== undefined ? BigInt(data["minBytes"]) : undefined,
  };
}

/**
 * Selector for a device group. A selector consists of a set of conditions on
 * the device that should all match (logical AND) to determine a device group
 * eligibility. For instance, if a selector specifies RAM conditions, device
 * model inclusion and device model exclusion, a device is considered to match
 * if: device matches RAM conditions AND device matches one of the included
 * device models AND device doesn't match excluded device models
 */
export interface DeviceSelector {
  /**
   * Conditions on the device's RAM.
   */
  deviceRam?: DeviceRam;
  /**
   * Device models excluded by this selector, even if they match all other
   * conditions.
   */
  excludedDeviceIds?: DeviceId[];
  /**
   * A device that has any of these system features is excluded by this
   * selector, even if it matches all other conditions.
   */
  forbiddenSystemFeatures?: SystemFeature[];
  /**
   * Device models included by this selector.
   */
  includedDeviceIds?: DeviceId[];
  /**
   * A device needs to have all these system features to be included by the
   * selector.
   */
  requiredSystemFeatures?: SystemFeature[];
}

function serializeDeviceSelector(data: any): DeviceSelector {
  return {
    ...data,
    deviceRam: data["deviceRam"] !== undefined ? serializeDeviceRam(data["deviceRam"]) : undefined,
  };
}

function deserializeDeviceSelector(data: any): DeviceSelector {
  return {
    ...data,
    deviceRam: data["deviceRam"] !== undefined ? deserializeDeviceRam(data["deviceRam"]) : undefined,
  };
}

/**
 * The device spec used to generate a system APK.
 */
export interface DeviceSpec {
  /**
   * Screen dpi.
   */
  screenDensity?: number;
  /**
   * Supported ABI architectures in the order of preference. The values should
   * be the string as reported by the platform, e.g. "armeabi-v7a", "x86_64".
   */
  supportedAbis?: string[];
  /**
   * All installed locales represented as BCP-47 strings, e.g. "en-US".
   */
  supportedLocales?: string[];
}

/**
 * A single device tier. Devices matching any of the device groups in
 * device_group_names are considered to match the tier.
 */
export interface DeviceTier {
  /**
   * Groups of devices included in this tier. These groups must be defined
   * explicitly under device_groups in this configuration.
   */
  deviceGroupNames?: string[];
  /**
   * The priority level of the tier. Tiers are evaluated in descending order of
   * level: the highest level tier has the highest priority. The highest tier
   * matching a given device is selected for that device. You should use a
   * contiguous range of levels for your tiers in a tier set; tier levels in a
   * tier set must be unique. For instance, if your tier set has 4 tiers
   * (including the global fallback), you should define tiers 1, 2 and 3 in this
   * configuration. Note: tier 0 is implicitly defined as a global fallback and
   * selected for devices that don't match any of the tiers explicitly defined
   * here. You mustn't define level 0 explicitly in this configuration.
   */
  level?: number;
}

/**
 * Configuration describing device targeting criteria for the content of an
 * app.
 */
export interface DeviceTierConfig {
  /**
   * Definition of device groups for the app.
   */
  deviceGroups?: DeviceGroup[];
  /**
   * Output only. The device tier config ID.
   */
  readonly deviceTierConfigId?: bigint;
  /**
   * Definition of the set of device tiers for the app.
   */
  deviceTierSet?: DeviceTierSet;
  /**
   * Definition of user country sets for the app.
   */
  userCountrySets?: UserCountrySet[];
}

function serializeDeviceTierConfig(data: any): DeviceTierConfig {
  return {
    ...data,
    deviceGroups: data["deviceGroups"] !== undefined ? data["deviceGroups"].map((item: any) => (serializeDeviceGroup(item))) : undefined,
  };
}

function deserializeDeviceTierConfig(data: any): DeviceTierConfig {
  return {
    ...data,
    deviceGroups: data["deviceGroups"] !== undefined ? data["deviceGroups"].map((item: any) => (deserializeDeviceGroup(item))) : undefined,
    deviceTierConfigId: data["deviceTierConfigId"] !== undefined ? BigInt(data["deviceTierConfigId"]) : undefined,
  };
}

/**
 * A set of device tiers. A tier set determines what variation of app content
 * gets served to a specific device, for device-targeted content. You should
 * assign a priority level to each tier, which determines the ordering by which
 * they are evaluated by Play. See the documentation of DeviceTier.level for
 * more details.
 */
export interface DeviceTierSet {
  /**
   * Device tiers belonging to the set.
   */
  deviceTiers?: DeviceTier[];
}

/**
 * Additional options for Androidpublisher#editsBundlesUpload.
 */
export interface EditsBundlesUploadOptions {
  /**
   * Must be set to true if the app bundle installation may trigger a warning
   * on user devices (for example, if installation size may be over a threshold,
   * typically 100 MB).
   */
  ackBundleInstallationWarning?: boolean;
  /**
   * Device tier config (DTC) to be used for generating deliverables (APKs).
   * Contains id of the DTC or "LATEST" for last uploaded DTC.
   */
  deviceTierConfigId?: string;
}

/**
 * Additional options for Androidpublisher#editsCommit.
 */
export interface EditsCommitOptions {
  /**
   * Indicates that the changes in this edit will not be reviewed until they
   * are explicitly sent for review from the Google Play Console UI. These
   * changes will be added to any other changes that are not yet sent for
   * review.
   */
  changesNotSentForReview?: boolean;
}

/**
 * An expansion file. The resource for ExpansionFilesService.
 */
export interface ExpansionFile {
  /**
   * If set, this field indicates that this APK has an expansion file uploaded
   * to it: this APK does not reference another APK's expansion file. The
   * field's value is the size of the uploaded expansion file in bytes.
   */
  fileSize?: bigint;
  /**
   * If set, this APK's expansion file references another APK's expansion file.
   * The file_size field will not be set.
   */
  referencesVersion?: number;
}

function serializeExpansionFile(data: any): ExpansionFile {
  return {
    ...data,
    fileSize: data["fileSize"] !== undefined ? String(data["fileSize"]) : undefined,
  };
}

function deserializeExpansionFile(data: any): ExpansionFile {
  return {
    ...data,
    fileSize: data["fileSize"] !== undefined ? BigInt(data["fileSize"]) : undefined,
  };
}

/**
 * Response for uploading an expansion file.
 */
export interface ExpansionFilesUploadResponse {
  /**
   * The uploaded expansion file configuration.
   */
  expansionFile?: ExpansionFile;
}

function serializeExpansionFilesUploadResponse(data: any): ExpansionFilesUploadResponse {
  return {
    ...data,
    expansionFile: data["expansionFile"] !== undefined ? serializeExpansionFile(data["expansionFile"]) : undefined,
  };
}

function deserializeExpansionFilesUploadResponse(data: any): ExpansionFilesUploadResponse {
  return {
    ...data,
    expansionFile: data["expansionFile"] !== undefined ? deserializeExpansionFile(data["expansionFile"]) : undefined,
  };
}

/**
 * User account identifier in the third-party service.
 */
export interface ExternalAccountIdentifiers {
  /**
   * User account identifier in the third-party service. Only present if
   * account linking happened as part of the subscription purchase flow.
   */
  externalAccountId?: string;
  /**
   * An obfuscated version of the id that is uniquely associated with the
   * user's account in your app. Present for the following purchases: * If
   * account linking happened as part of the subscription purchase flow. * It
   * was specified using
   * https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid
   * when the purchase was made.
   */
  obfuscatedExternalAccountId?: string;
  /**
   * An obfuscated version of the id that is uniquely associated with the
   * user's profile in your app. Only present if specified using
   * https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid
   * when the purchase was made.
   */
  obfuscatedExternalProfileId?: string;
}

/**
 * Defines an APK available for this application that is hosted externally and
 * not uploaded to Google Play. This function is only available to organizations
 * using Managed Play whose application is configured to restrict distribution
 * to the organizations.
 */
export interface ExternallyHostedApk {
  /**
   * The application label.
   */
  applicationLabel?: string;
  /**
   * A certificate (or array of certificates if a certificate-chain is used)
   * used to sign this APK, represented as a base64 encoded byte array.
   */
  certificateBase64s?: string[];
  /**
   * The URL at which the APK is hosted. This must be an https URL.
   */
  externallyHostedUrl?: string;
  /**
   * The sha1 checksum of this APK, represented as a base64 encoded byte array.
   */
  fileSha1Base64?: string;
  /**
   * The sha256 checksum of this APK, represented as a base64 encoded byte
   * array.
   */
  fileSha256Base64?: string;
  /**
   * The file size in bytes of this APK.
   */
  fileSize?: bigint;
  /**
   * The icon image from the APK, as a base64 encoded byte array.
   */
  iconBase64?: string;
  /**
   * The maximum SDK supported by this APK (optional).
   */
  maximumSdk?: number;
  /**
   * The minimum SDK targeted by this APK.
   */
  minimumSdk?: number;
  /**
   * The native code environments supported by this APK (optional).
   */
  nativeCodes?: string[];
  /**
   * The package name.
   */
  packageName?: string;
  /**
   * The features required by this APK (optional).
   */
  usesFeatures?: string[];
  /**
   * The permissions requested by this APK.
   */
  usesPermissions?: UsesPermission[];
  /**
   * The version code of this APK.
   */
  versionCode?: number;
  /**
   * The version name of this APK.
   */
  versionName?: string;
}

function serializeExternallyHostedApk(data: any): ExternallyHostedApk {
  return {
    ...data,
    fileSize: data["fileSize"] !== undefined ? String(data["fileSize"]) : undefined,
  };
}

function deserializeExternallyHostedApk(data: any): ExternallyHostedApk {
  return {
    ...data,
    fileSize: data["fileSize"] !== undefined ? BigInt(data["fileSize"]) : undefined,
  };
}

/**
 * Response to list generated APKs.
 */
export interface GeneratedApksListResponse {
  /**
   * All generated APKs, grouped by the APK signing key.
   */
  generatedApks?: GeneratedApksPerSigningKey[];
}

function serializeGeneratedApksListResponse(data: any): GeneratedApksListResponse {
  return {
    ...data,
    generatedApks: data["generatedApks"] !== undefined ? data["generatedApks"].map((item: any) => (serializeGeneratedApksPerSigningKey(item))) : undefined,
  };
}

function deserializeGeneratedApksListResponse(data: any): GeneratedApksListResponse {
  return {
    ...data,
    generatedApks: data["generatedApks"] !== undefined ? data["generatedApks"].map((item: any) => (deserializeGeneratedApksPerSigningKey(item))) : undefined,
  };
}

/**
 * Download metadata for split, standalone and universal APKs, as well as asset
 * pack slices, signed with a given key.
 */
export interface GeneratedApksPerSigningKey {
  /**
   * SHA256 hash of the APK signing public key certificate.
   */
  certificateSha256Hash?: string;
  /**
   * List of asset pack slices which will be served for this app bundle, signed
   * with a key corresponding to certificate_sha256_hash.
   */
  generatedAssetPackSlices?: GeneratedAssetPackSlice[];
  /**
   * List of generated split APKs, signed with a key corresponding to
   * certificate_sha256_hash.
   */
  generatedSplitApks?: GeneratedSplitApk[];
  /**
   * List of generated standalone APKs, signed with a key corresponding to
   * certificate_sha256_hash.
   */
  generatedStandaloneApks?: GeneratedStandaloneApk[];
  /**
   * Generated universal APK, signed with a key corresponding to
   * certificate_sha256_hash. This field is not set if no universal APK was
   * generated for this signing key.
   */
  generatedUniversalApk?: GeneratedUniversalApk;
}

function serializeGeneratedApksPerSigningKey(data: any): GeneratedApksPerSigningKey {
  return {
    ...data,
    generatedAssetPackSlices: data["generatedAssetPackSlices"] !== undefined ? data["generatedAssetPackSlices"].map((item: any) => (serializeGeneratedAssetPackSlice(item))) : undefined,
  };
}

function deserializeGeneratedApksPerSigningKey(data: any): GeneratedApksPerSigningKey {
  return {
    ...data,
    generatedAssetPackSlices: data["generatedAssetPackSlices"] !== undefined ? data["generatedAssetPackSlices"].map((item: any) => (deserializeGeneratedAssetPackSlice(item))) : undefined,
  };
}

/**
 * Download metadata for an asset pack slice.
 */
export interface GeneratedAssetPackSlice {
  /**
   * Download ID, which uniquely identifies the APK to download. Should be
   * supplied to `generatedapks.download` method.
   */
  downloadId?: string;
  /**
   * Name of the module that this asset slice belongs to.
   */
  moduleName?: string;
  /**
   * Asset slice ID.
   */
  sliceId?: string;
  /**
   * Asset module version.
   */
  version?: bigint;
}

function serializeGeneratedAssetPackSlice(data: any): GeneratedAssetPackSlice {
  return {
    ...data,
    version: data["version"] !== undefined ? String(data["version"]) : undefined,
  };
}

function deserializeGeneratedAssetPackSlice(data: any): GeneratedAssetPackSlice {
  return {
    ...data,
    version: data["version"] !== undefined ? BigInt(data["version"]) : undefined,
  };
}

/**
 * Download metadata for a split APK.
 */
export interface GeneratedSplitApk {
  /**
   * Download ID, which uniquely identifies the APK to download. Should be
   * supplied to `generatedapks.download` method.
   */
  downloadId?: string;
  /**
   * Name of the module that this APK belongs to.
   */
  moduleName?: string;
  /**
   * Split ID. Empty for the main split of the base module.
   */
  splitId?: string;
  /**
   * ID of the generated variant.
   */
  variantId?: number;
}

/**
 * Download metadata for a standalone APK.
 */
export interface GeneratedStandaloneApk {
  /**
   * Download ID, which uniquely identifies the APK to download. Should be
   * supplied to `generatedapks.download` method.
   */
  downloadId?: string;
  /**
   * ID of the generated variant.
   */
  variantId?: number;
}

/**
 * Download metadata for a universal APK.
 */
export interface GeneratedUniversalApk {
  /**
   * Download ID, which uniquely identifies the APK to download. Should be
   * supplied to `generatedapks.download` method.
   */
  downloadId?: string;
}

/**
 * An access grant resource.
 */
export interface Grant {
  /**
   * The permissions granted to the user for this app.
   */
  appLevelPermissions?:  | "APP_LEVEL_PERMISSION_UNSPECIFIED" | "CAN_ACCESS_APP" | "CAN_VIEW_FINANCIAL_DATA" | "CAN_MANAGE_PERMISSIONS" | "CAN_REPLY_TO_REVIEWS" | "CAN_MANAGE_PUBLIC_APKS" | "CAN_MANAGE_TRACK_APKS" | "CAN_MANAGE_TRACK_USERS" | "CAN_MANAGE_PUBLIC_LISTING" | "CAN_MANAGE_DRAFT_APPS" | "CAN_MANAGE_ORDERS"[];
  /**
   * Required. Resource name for this grant, following the pattern
   * "developers/{developer}/users/{email}/grants/{package_name}". If this grant
   * is for a draft app, the app ID will be used in this resource name instead
   * of the package name.
   */
  name?: string;
  /**
   * Immutable. The package name of the app. This will be empty for draft apps.
   */
  packageName?: string;
}

/**
 * Additional options for Androidpublisher#grantsPatch.
 */
export interface GrantsPatchOptions {
  /**
   * Optional. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGrantsPatchOptions(data: any): GrantsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGrantsPatchOptions(data: any): GrantsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * An uploaded image. The resource for ImagesService.
 */
export interface Image {
  /**
   * A unique id representing this image.
   */
  id?: string;
  /**
   * A sha1 hash of the image.
   */
  sha1?: string;
  /**
   * A sha256 hash of the image.
   */
  sha256?: string;
  /**
   * A URL that will serve a preview of the image.
   */
  url?: string;
}

/**
 * Response for deleting all images.
 */
export interface ImagesDeleteAllResponse {
  /**
   * The deleted images.
   */
  deleted?: Image[];
}

/**
 * Response listing all images.
 */
export interface ImagesListResponse {
  /**
   * All listed Images.
   */
  images?: Image[];
}

/**
 * Response for uploading an image.
 */
export interface ImagesUploadResponse {
  /**
   * The uploaded image.
   */
  image?: Image;
}

/**
 * An in-app product. The resource for InappproductsService.
 */
export interface InAppProduct {
  /**
   * Default language of the localized data, as defined by BCP-47. e.g.
   * "en-US".
   */
  defaultLanguage?: string;
  /**
   * Default price. Cannot be zero, as in-app products are never free. Always
   * in the developer's Checkout merchant currency.
   */
  defaultPrice?: Price;
  /**
   * Grace period of the subscription, specified in ISO 8601 format. Allows
   * developers to give their subscribers a grace period when the payment for
   * the new recurrence period is declined. Acceptable values are P0D (zero
   * days), P3D (three days), P7D (seven days), P14D (14 days), and P30D (30
   * days).
   */
  gracePeriod?: string;
  /**
   * List of localized title and description data. Map key is the language of
   * the localized data, as defined by BCP-47, e.g. "en-US".
   */
  listings?: {
    [key: string]: InAppProductListing
  };
  /**
   * Details about taxes and legal compliance. Only applicable to managed
   * products.
   */
  managedProductTaxesAndComplianceSettings?: ManagedProductTaxAndComplianceSettings;
  /**
   * Package name of the parent app.
   */
  packageName?: string;
  /**
   * Prices per buyer region. None of these can be zero, as in-app products are
   * never free. Map key is region code, as defined by ISO 3166-2.
   */
  prices?: {
    [key: string]: Price
  };
  /**
   * The type of the product, e.g. a recurring subscription.
   */
  purchaseType?:  | "purchaseTypeUnspecified" | "managedUser" | "subscription";
  /**
   * Stock-keeping-unit (SKU) of the product, unique within an app.
   */
  sku?: string;
  /**
   * The status of the product, e.g. whether it's active.
   */
  status?:  | "statusUnspecified" | "active" | "inactive";
  /**
   * Subscription period, specified in ISO 8601 format. Acceptable values are
   * P1W (one week), P1M (one month), P3M (three months), P6M (six months), and
   * P1Y (one year).
   */
  subscriptionPeriod?: string;
  /**
   * Details about taxes and legal compliance. Only applicable to subscription
   * products.
   */
  subscriptionTaxesAndComplianceSettings?: SubscriptionTaxAndComplianceSettings;
  /**
   * Trial period, specified in ISO 8601 format. Acceptable values are anything
   * between P7D (seven days) and P999D (999 days).
   */
  trialPeriod?: string;
}

/**
 * Store listing of a single in-app product.
 */
export interface InAppProductListing {
  /**
   * Localized entitlement benefits for a subscription.
   */
  benefits?: string[];
  /**
   * Description for the store listing.
   */
  description?: string;
  /**
   * Title for the store listing.
   */
  title?: string;
}

/**
 * Additional options for Androidpublisher#inappproductsInsert.
 */
export interface InappproductsInsertOptions {
  /**
   * If true the prices for all regions targeted by the parent app that don't
   * have a price specified for this in-app product will be auto converted to
   * the target currency based on the default price. Defaults to false.
   */
  autoConvertMissingPrices?: boolean;
}

/**
 * Additional options for Androidpublisher#inappproductsList.
 */
export interface InappproductsListOptions {
  /**
   * Deprecated and ignored. The page size is determined by the server.
   */
  maxResults?: number;
  /**
   * Deprecated and ignored. Set the `token` parameter to rertieve the next
   * page.
   */
  startIndex?: number;
  /**
   * Pagination token. If empty, list starts at the first product.
   */
  token?: string;
}

/**
 * Response listing all in-app products.
 */
export interface InappproductsListResponse {
  /**
   * All in-app products.
   */
  inappproduct?: InAppProduct[];
  /**
   * The kind of this response ("androidpublisher#inappproductsListResponse").
   */
  kind?: string;
  /**
   * Deprecated and unset.
   */
  pageInfo?: PageInfo;
  /**
   * Pagination token, to handle a number of products that is over one page.
   */
  tokenPagination?: TokenPagination;
}

/**
 * Additional options for Androidpublisher#inappproductsPatch.
 */
export interface InappproductsPatchOptions {
  /**
   * If true the prices for all regions targeted by the parent app that don't
   * have a price specified for this in-app product will be auto converted to
   * the target currency based on the default price. Defaults to false.
   */
  autoConvertMissingPrices?: boolean;
}

/**
 * Additional options for Androidpublisher#inappproductsUpdate.
 */
export interface InappproductsUpdateOptions {
  /**
   * If set to true, and the in-app product with the given package_name and sku
   * doesn't exist, the in-app product will be created.
   */
  allowMissing?: boolean;
  /**
   * If true the prices for all regions targeted by the parent app that don't
   * have a price specified for this in-app product will be auto converted to
   * the target currency based on the default price. Defaults to false.
   */
  autoConvertMissingPrices?: boolean;
}

/**
 * An artifact resource which gets created when uploading an APK or Android App
 * Bundle through internal app sharing.
 */
export interface InternalAppSharingArtifact {
  /**
   * The sha256 fingerprint of the certificate used to sign the generated
   * artifact.
   */
  certificateFingerprint?: string;
  /**
   * The download URL generated for the uploaded artifact. Users that are
   * authorized to download can follow the link to the Play Store app to install
   * it.
   */
  downloadUrl?: string;
  /**
   * The sha256 hash of the artifact represented as a lowercase hexadecimal
   * number, matching the output of the sha256sum command.
   */
  sha256?: string;
}

/**
 * Contains the introductory price information for a subscription.
 */
export interface IntroductoryPriceInfo {
  /**
   * Introductory price of the subscription, not including tax. The currency is
   * the same as price_currency_code. Price is expressed in micro-units, where
   * 1,000,000 micro-units represents one unit of the currency. For example, if
   * the subscription price is €1.99, price_amount_micros is 1990000.
   */
  introductoryPriceAmountMicros?: bigint;
  /**
   * ISO 4217 currency code for the introductory subscription price. For
   * example, if the price is specified in British pounds sterling,
   * price_currency_code is "GBP".
   */
  introductoryPriceCurrencyCode?: string;
  /**
   * The number of billing period to offer introductory pricing.
   */
  introductoryPriceCycles?: number;
  /**
   * Introductory price period, specified in ISO 8601 format. Common values are
   * (but not limited to) "P1W" (one week), "P1M" (one month), "P3M" (three
   * months), "P6M" (six months), and "P1Y" (one year).
   */
  introductoryPricePeriod?: string;
}

function serializeIntroductoryPriceInfo(data: any): IntroductoryPriceInfo {
  return {
    ...data,
    introductoryPriceAmountMicros: data["introductoryPriceAmountMicros"] !== undefined ? String(data["introductoryPriceAmountMicros"]) : undefined,
  };
}

function deserializeIntroductoryPriceInfo(data: any): IntroductoryPriceInfo {
  return {
    ...data,
    introductoryPriceAmountMicros: data["introductoryPriceAmountMicros"] !== undefined ? BigInt(data["introductoryPriceAmountMicros"]) : undefined,
  };
}

/**
 * Response listing existing device tier configs.
 */
export interface ListDeviceTierConfigsResponse {
  /**
   * Device tier configs created by the developer.
   */
  deviceTierConfigs?: DeviceTierConfig[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListDeviceTierConfigsResponse(data: any): ListDeviceTierConfigsResponse {
  return {
    ...data,
    deviceTierConfigs: data["deviceTierConfigs"] !== undefined ? data["deviceTierConfigs"].map((item: any) => (serializeDeviceTierConfig(item))) : undefined,
  };
}

function deserializeListDeviceTierConfigsResponse(data: any): ListDeviceTierConfigsResponse {
  return {
    ...data,
    deviceTierConfigs: data["deviceTierConfigs"] !== undefined ? data["deviceTierConfigs"].map((item: any) => (deserializeDeviceTierConfig(item))) : undefined,
  };
}

/**
 * A localized store listing. The resource for ListingsService.
 */
export interface Listing {
  /**
   * Full description of the app.
   */
  fullDescription?: string;
  /**
   * Language localization code (a BCP-47 language tag; for example, "de-AT"
   * for Austrian German).
   */
  language?: string;
  /**
   * Short description of the app.
   */
  shortDescription?: string;
  /**
   * Localized title of the app.
   */
  title?: string;
  /**
   * URL of a promotional YouTube video for the app.
   */
  video?: string;
}

/**
 * Response listing all localized listings.
 */
export interface ListingsListResponse {
  /**
   * The kind of this response ("androidpublisher#listingsListResponse").
   */
  kind?: string;
  /**
   * All localized listings.
   */
  listings?: Listing[];
}

/**
 * Response message for ListSubscriptionOffers.
 */
export interface ListSubscriptionOffersResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The subscription offers from the specified subscription.
   */
  subscriptionOffers?: SubscriptionOffer[];
}

function serializeListSubscriptionOffersResponse(data: any): ListSubscriptionOffersResponse {
  return {
    ...data,
    subscriptionOffers: data["subscriptionOffers"] !== undefined ? data["subscriptionOffers"].map((item: any) => (serializeSubscriptionOffer(item))) : undefined,
  };
}

function deserializeListSubscriptionOffersResponse(data: any): ListSubscriptionOffersResponse {
  return {
    ...data,
    subscriptionOffers: data["subscriptionOffers"] !== undefined ? data["subscriptionOffers"].map((item: any) => (deserializeSubscriptionOffer(item))) : undefined,
  };
}

/**
 * Response message for ListSubscriptions.
 */
export interface ListSubscriptionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The subscriptions from the specified app.
   */
  subscriptions?: Subscription[];
}

function serializeListSubscriptionsResponse(data: any): ListSubscriptionsResponse {
  return {
    ...data,
    subscriptions: data["subscriptions"] !== undefined ? data["subscriptions"].map((item: any) => (serializeSubscription(item))) : undefined,
  };
}

function deserializeListSubscriptionsResponse(data: any): ListSubscriptionsResponse {
  return {
    ...data,
    subscriptions: data["subscriptions"] !== undefined ? data["subscriptions"].map((item: any) => (deserializeSubscription(item))) : undefined,
  };
}

/**
 * A response containing one or more users with access to an account.
 */
export interface ListUsersResponse {
  /**
   * A token to pass to subsequent calls in order to retrieve subsequent
   * results. This will not be set if there are no more results to return.
   */
  nextPageToken?: string;
  /**
   * The resulting users.
   */
  users?: User[];
}

function serializeListUsersResponse(data: any): ListUsersResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (serializeUser(item))) : undefined,
  };
}

function deserializeListUsersResponse(data: any): ListUsersResponse {
  return {
    ...data,
    users: data["users"] !== undefined ? data["users"].map((item: any) => (deserializeUser(item))) : undefined,
  };
}

/**
 * Localized text in given language.
 */
export interface LocalizedText {
  /**
   * Language localization code (a BCP-47 language tag; for example, "de-AT"
   * for Austrian German).
   */
  language?: string;
  /**
   * The text in the given language.
   */
  text?: string;
}

/**
 * Details about taxation and legal compliance for managed products.
 */
export interface ManagedProductTaxAndComplianceSettings {
  /**
   * Digital content or service classification for products distributed to
   * users in the European Economic Area (EEA). The withdrawal regime under EEA
   * consumer laws depends on this classification. Refer to the [Help Center
   * article](https://support.google.com/googleplay/android-developer/answer/10463498)
   * for more information.
   */
  eeaWithdrawalRightType?:  | "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED" | "WITHDRAWAL_RIGHT_DIGITAL_CONTENT" | "WITHDRAWAL_RIGHT_SERVICE";
  /**
   * A mapping from region code to tax rate details. The keys are region codes
   * as defined by Unicode's "CLDR".
   */
  taxRateInfoByRegionCode?: {
    [key: string]: RegionalTaxRateInfo
  };
}

/**
 * Request message for MigrateBasePlanPrices.
 */
export interface MigrateBasePlanPricesRequest {
  /**
   * Required. The regional prices to update.
   */
  regionalPriceMigrations?: RegionalPriceMigrationConfig[];
  /**
   * Required. The version of the available regions being used for the
   * regional_price_migrations.
   */
  regionsVersion?: RegionsVersion;
}

function serializeMigrateBasePlanPricesRequest(data: any): MigrateBasePlanPricesRequest {
  return {
    ...data,
    regionalPriceMigrations: data["regionalPriceMigrations"] !== undefined ? data["regionalPriceMigrations"].map((item: any) => (serializeRegionalPriceMigrationConfig(item))) : undefined,
  };
}

function deserializeMigrateBasePlanPricesRequest(data: any): MigrateBasePlanPricesRequest {
  return {
    ...data,
    regionalPriceMigrations: data["regionalPriceMigrations"] !== undefined ? data["regionalPriceMigrations"].map((item: any) => (deserializeRegionalPriceMigrationConfig(item))) : undefined,
  };
}

/**
 * Response message for MigrateBasePlanPrices.
 */
export interface MigrateBasePlanPricesResponse {
}

/**
 * Additional options for
 * Androidpublisher#monetizationSubscriptionsBasePlansOffersCreate.
 */
export interface MonetizationSubscriptionsBasePlansOffersCreateOptions {
  /**
   * Required. The ID to use for the offer. For the requirements on this
   * format, see the documentation of the offer_id field on the
   * SubscriptionOffer resource.
   */
  offerId?: string;
  /**
   * Required. A string representing version of the available regions being
   * used for the specified resource. The current version is 2022/02.
   */
  ["regionsVersion.version"]?: string;
}

/**
 * Additional options for
 * Androidpublisher#monetizationSubscriptionsBasePlansOffersList.
 */
export interface MonetizationSubscriptionsBasePlansOffersListOptions {
  /**
   * The maximum number of subscriptions to return. The service may return
   * fewer than this value. If unspecified, at most 50 subscriptions will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListSubscriptionsOffers` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListSubscriptionOffers` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Androidpublisher#monetizationSubscriptionsBasePlansOffersPatch.
 */
export interface MonetizationSubscriptionsBasePlansOffersPatchOptions {
  /**
   * Required. A string representing version of the available regions being
   * used for the specified resource. The current version is 2022/02.
   */
  ["regionsVersion.version"]?: string;
  /**
   * Required. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeMonetizationSubscriptionsBasePlansOffersPatchOptions(data: any): MonetizationSubscriptionsBasePlansOffersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeMonetizationSubscriptionsBasePlansOffersPatchOptions(data: any): MonetizationSubscriptionsBasePlansOffersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Androidpublisher#monetizationSubscriptionsCreate.
 */
export interface MonetizationSubscriptionsCreateOptions {
  /**
   * Required. The ID to use for the subscription. For the requirements on this
   * format, see the documentation of the product_id field on the Subscription
   * resource.
   */
  productId?: string;
  /**
   * Required. A string representing version of the available regions being
   * used for the specified resource. The current version is 2022/02.
   */
  ["regionsVersion.version"]?: string;
}

/**
 * Additional options for Androidpublisher#monetizationSubscriptionsList.
 */
export interface MonetizationSubscriptionsListOptions {
  /**
   * The maximum number of subscriptions to return. The service may return
   * fewer than this value. If unspecified, at most 50 subscriptions will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListSubscriptions` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListSubscriptions` must match the call that provided the page
   * token.
   */
  pageToken?: string;
  /**
   * Whether archived subscriptions should be included in the response.
   * Defaults to false.
   */
  showArchived?: boolean;
}

/**
 * Additional options for Androidpublisher#monetizationSubscriptionsPatch.
 */
export interface MonetizationSubscriptionsPatchOptions {
  /**
   * Required. A string representing version of the available regions being
   * used for the specified resource. The current version is 2022/02.
   */
  ["regionsVersion.version"]?: string;
  /**
   * Required. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeMonetizationSubscriptionsPatchOptions(data: any): MonetizationSubscriptionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeMonetizationSubscriptionsPatchOptions(data: any): MonetizationSubscriptionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Represents an amount of money with its currency type.
 */
export interface Money {
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

function serializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Offer details information related to a purchase line item.
 */
export interface OfferDetails {
  /**
   * The base plan ID. Present for all base plan and offers.
   */
  basePlanId?: string;
  /**
   * The offer ID. Only present for discounted offers.
   */
  offerId?: string;
  /**
   * The latest offer tags associated with the offer. It includes tags
   * inherited from the base plan.
   */
  offerTags?: string[];
}

/**
 * Represents a custom tag specified for base plans and subscription offers.
 */
export interface OfferTag {
  /**
   * Must conform with RFC-1034. That is, this string can only contain
   * lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20
   * characters.
   */
  tag?: string;
}

/**
 * Additional options for Androidpublisher#ordersRefund.
 */
export interface OrdersRefundOptions {
  /**
   * Whether to revoke the purchased item. If set to true, access to the
   * subscription or in-app item will be terminated immediately. If the item is
   * a recurring subscription, all future payments will also be terminated.
   * Consumed in-app items need to be handled by developer's app. (optional).
   */
  revoke?: boolean;
}

/**
 * Pricing information for any new locations Play may launch in.
 */
export interface OtherRegionsBasePlanConfig {
  /**
   * Required. Price in EUR to use for any new locations Play may launch in.
   */
  eurPrice?: Money;
  /**
   * Whether the base plan is available for new subscribers in any new
   * locations Play may launch in. If not specified, this will default to false.
   */
  newSubscriberAvailability?: boolean;
  /**
   * Required. Price in USD to use for any new locations Play may launch in.
   */
  usdPrice?: Money;
}

function serializeOtherRegionsBasePlanConfig(data: any): OtherRegionsBasePlanConfig {
  return {
    ...data,
    eurPrice: data["eurPrice"] !== undefined ? serializeMoney(data["eurPrice"]) : undefined,
    usdPrice: data["usdPrice"] !== undefined ? serializeMoney(data["usdPrice"]) : undefined,
  };
}

function deserializeOtherRegionsBasePlanConfig(data: any): OtherRegionsBasePlanConfig {
  return {
    ...data,
    eurPrice: data["eurPrice"] !== undefined ? deserializeMoney(data["eurPrice"]) : undefined,
    usdPrice: data["usdPrice"] !== undefined ? deserializeMoney(data["usdPrice"]) : undefined,
  };
}

/**
 * Configuration for any new locations Play may launch in specified on a
 * subscription offer.
 */
export interface OtherRegionsSubscriptionOfferConfig {
  /**
   * Whether the subscription offer in any new locations Play may launch in the
   * future. If not specified, this will default to false.
   */
  otherRegionsNewSubscriberAvailability?: boolean;
}

/**
 * Configuration for any new locations Play may launch in for a single offer
 * phase.
 */
export interface OtherRegionsSubscriptionOfferPhaseConfig {
  /**
   * The absolute amount of money subtracted from the base plan price prorated
   * over the phase duration that the user pays for this offer phase. For
   * example, if the base plan price for this region is $12 for a period of 1
   * year, then a $1 absolute discount for a phase of a duration of 3 months
   * would correspond to a price of $2. The resulting price may not be smaller
   * than the minimum price allowed for any new locations Play may launch in.
   */
  absoluteDiscounts?: OtherRegionsSubscriptionOfferPhasePrices;
  /**
   * The absolute price the user pays for this offer phase. The price must not
   * be smaller than the minimum price allowed for any new locations Play may
   * launch in.
   */
  otherRegionsPrices?: OtherRegionsSubscriptionOfferPhasePrices;
  /**
   * The fraction of the base plan price prorated over the phase duration that
   * the user pays for this offer phase. For example, if the base plan price for
   * this region is $12 for a period of 1 year, then a 50% discount for a phase
   * of a duration of 3 months would correspond to a price of $1.50. The
   * discount must be specified as a fraction strictly larger than 0 and
   * strictly smaller than 1. The resulting price will be rounded to the nearest
   * billable unit (e.g. cents for USD). The relative discount is considered
   * invalid if the discounted price ends up being smaller than the minimum
   * price allowed in any new locations Play may launch in.
   */
  relativeDiscount?: number;
}

function serializeOtherRegionsSubscriptionOfferPhaseConfig(data: any): OtherRegionsSubscriptionOfferPhaseConfig {
  return {
    ...data,
    absoluteDiscounts: data["absoluteDiscounts"] !== undefined ? serializeOtherRegionsSubscriptionOfferPhasePrices(data["absoluteDiscounts"]) : undefined,
    otherRegionsPrices: data["otherRegionsPrices"] !== undefined ? serializeOtherRegionsSubscriptionOfferPhasePrices(data["otherRegionsPrices"]) : undefined,
  };
}

function deserializeOtherRegionsSubscriptionOfferPhaseConfig(data: any): OtherRegionsSubscriptionOfferPhaseConfig {
  return {
    ...data,
    absoluteDiscounts: data["absoluteDiscounts"] !== undefined ? deserializeOtherRegionsSubscriptionOfferPhasePrices(data["absoluteDiscounts"]) : undefined,
    otherRegionsPrices: data["otherRegionsPrices"] !== undefined ? deserializeOtherRegionsSubscriptionOfferPhasePrices(data["otherRegionsPrices"]) : undefined,
  };
}

/**
 * Pricing information for any new locations Play may launch in.
 */
export interface OtherRegionsSubscriptionOfferPhasePrices {
  /**
   * Required. Price in EUR to use for any new locations Play may launch in.
   */
  eurPrice?: Money;
  /**
   * Required. Price in USD to use for any new locations Play may launch in.
   */
  usdPrice?: Money;
}

function serializeOtherRegionsSubscriptionOfferPhasePrices(data: any): OtherRegionsSubscriptionOfferPhasePrices {
  return {
    ...data,
    eurPrice: data["eurPrice"] !== undefined ? serializeMoney(data["eurPrice"]) : undefined,
    usdPrice: data["usdPrice"] !== undefined ? serializeMoney(data["usdPrice"]) : undefined,
  };
}

function deserializeOtherRegionsSubscriptionOfferPhasePrices(data: any): OtherRegionsSubscriptionOfferPhasePrices {
  return {
    ...data,
    eurPrice: data["eurPrice"] !== undefined ? deserializeMoney(data["eurPrice"]) : undefined,
    usdPrice: data["usdPrice"] !== undefined ? deserializeMoney(data["usdPrice"]) : undefined,
  };
}

/**
 * Information about the current page. List operations that supports paging
 * return only one "page" of results. This protocol buffer message describes the
 * page that has been returned.
 */
export interface PageInfo {
  /**
   * Maximum number of results returned in one page. ! The number of results
   * included in the API response.
   */
  resultPerPage?: number;
  /**
   * Index of the first result returned in the current page.
   */
  startIndex?: number;
  /**
   * Total number of results available on the backend ! The total number of
   * results in the result set.
   */
  totalResults?: number;
}

/**
 * Information specific to a subscription in paused state.
 */
export interface PausedStateContext {
  /**
   * Time at which the subscription will be automatically resumed.
   */
  autoResumeTime?: Date;
}

function serializePausedStateContext(data: any): PausedStateContext {
  return {
    ...data,
    autoResumeTime: data["autoResumeTime"] !== undefined ? data["autoResumeTime"].toISOString() : undefined,
  };
}

function deserializePausedStateContext(data: any): PausedStateContext {
  return {
    ...data,
    autoResumeTime: data["autoResumeTime"] !== undefined ? new Date(data["autoResumeTime"]) : undefined,
  };
}

/**
 * Represents a base plan that does not automatically renew at the end of the
 * base plan, and must be manually renewed by the user.
 */
export interface PrepaidBasePlanType {
  /**
   * Required. Subscription period, specified in ISO 8601 format. For a list of
   * acceptable billing periods, refer to the help center.
   */
  billingPeriodDuration?: string;
  /**
   * Whether users should be able to extend this prepaid base plan in Google
   * Play surfaces. Defaults to TIME_EXTENSION_ACTIVE if not specified.
   */
  timeExtension?:  | "TIME_EXTENSION_UNSPECIFIED" | "TIME_EXTENSION_ACTIVE" | "TIME_EXTENSION_INACTIVE";
}

/**
 * Information related to a prepaid plan.
 */
export interface PrepaidPlan {
  /**
   * If present, this is the time after which top up purchases are allowed for
   * the prepaid plan. Will not be present for expired prepaid plans.
   */
  allowExtendAfterTime?: Date;
}

function serializePrepaidPlan(data: any): PrepaidPlan {
  return {
    ...data,
    allowExtendAfterTime: data["allowExtendAfterTime"] !== undefined ? data["allowExtendAfterTime"].toISOString() : undefined,
  };
}

function deserializePrepaidPlan(data: any): PrepaidPlan {
  return {
    ...data,
    allowExtendAfterTime: data["allowExtendAfterTime"] !== undefined ? new Date(data["allowExtendAfterTime"]) : undefined,
  };
}

/**
 * Definition of a price, i.e. currency and units.
 */
export interface Price {
  /**
   * 3 letter Currency code, as defined by ISO 4217. See
   * java/com/google/common/money/CurrencyCode.java
   */
  currency?: string;
  /**
   * Price in 1/million of the currency base unit, represented as a string.
   */
  priceMicros?: string;
}

/**
 * A ProductPurchase resource indicates the status of a user's inapp product
 * purchase.
 */
export interface ProductPurchase {
  /**
   * The acknowledgement state of the inapp product. Possible values are: 0.
   * Yet to be acknowledged 1. Acknowledged
   */
  acknowledgementState?: number;
  /**
   * The consumption state of the inapp product. Possible values are: 0. Yet to
   * be consumed 1. Consumed
   */
  consumptionState?: number;
  /**
   * A developer-specified string that contains supplemental information about
   * an order.
   */
  developerPayload?: string;
  /**
   * This kind represents an inappPurchase object in the androidpublisher
   * service.
   */
  kind?: string;
  /**
   * An obfuscated version of the id that is uniquely associated with the
   * user's account in your app. Only present if specified using
   * https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid
   * when the purchase was made.
   */
  obfuscatedExternalAccountId?: string;
  /**
   * An obfuscated version of the id that is uniquely associated with the
   * user's profile in your app. Only present if specified using
   * https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid
   * when the purchase was made.
   */
  obfuscatedExternalProfileId?: string;
  /**
   * The order id associated with the purchase of the inapp product.
   */
  orderId?: string;
  /**
   * The inapp product SKU. May not be present.
   */
  productId?: string;
  /**
   * The purchase state of the order. Possible values are: 0. Purchased 1.
   * Canceled 2. Pending
   */
  purchaseState?: number;
  /**
   * The time the product was purchased, in milliseconds since the epoch (Jan
   * 1, 1970).
   */
  purchaseTimeMillis?: bigint;
  /**
   * The purchase token generated to identify this purchase. May not be
   * present.
   */
  purchaseToken?: string;
  /**
   * The type of purchase of the inapp product. This field is only set if this
   * purchase was not made using the standard in-app billing flow. Possible
   * values are: 0. Test (i.e. purchased from a license testing account) 1.
   * Promo (i.e. purchased using a promo code) 2. Rewarded (i.e. from watching a
   * video ad instead of paying)
   */
  purchaseType?: number;
  /**
   * The quantity associated with the purchase of the inapp product. If not
   * present, the quantity is 1.
   */
  quantity?: number;
  /**
   * ISO 3166-1 alpha-2 billing region code of the user at the time the product
   * was granted.
   */
  regionCode?: string;
}

function serializeProductPurchase(data: any): ProductPurchase {
  return {
    ...data,
    purchaseTimeMillis: data["purchaseTimeMillis"] !== undefined ? String(data["purchaseTimeMillis"]) : undefined,
  };
}

function deserializeProductPurchase(data: any): ProductPurchase {
  return {
    ...data,
    purchaseTimeMillis: data["purchaseTimeMillis"] !== undefined ? BigInt(data["purchaseTimeMillis"]) : undefined,
  };
}

/**
 * Request for the product.purchases.acknowledge API.
 */
export interface ProductPurchasesAcknowledgeRequest {
  /**
   * Payload to attach to the purchase.
   */
  developerPayload?: string;
}

/**
 * Additional options for Androidpublisher#purchasesVoidedpurchasesList.
 */
export interface PurchasesVoidedpurchasesListOptions {
  /**
   * The time, in milliseconds since the Epoch, of the newest voided purchase
   * that you want to see in the response. The value of this parameter cannot be
   * greater than the current time and is ignored if a pagination token is set.
   * Default value is current time. Note: This filter is applied on the time at
   * which the record is seen as voided by our systems and not the actual voided
   * time returned in the response.
   */
  endTime?: bigint;
  /**
   * Defines how many results the list operation should return. The default
   * number depends on the resource collection.
   */
  maxResults?: number;
  /**
   * Defines the index of the first element to return. This can only be used if
   * indexed paging is enabled.
   */
  startIndex?: number;
  /**
   * The time, in milliseconds since the Epoch, of the oldest voided purchase
   * that you want to see in the response. The value of this parameter cannot be
   * older than 30 days and is ignored if a pagination token is set. Default
   * value is current time minus 30 days. Note: This filter is applied on the
   * time at which the record is seen as voided by our systems and not the
   * actual voided time returned in the response.
   */
  startTime?: bigint;
  /**
   * Defines the token of the page to return, usually taken from
   * TokenPagination. This can only be used if token paging is enabled.
   */
  token?: string;
  /**
   * The type of voided purchases that you want to see in the response.
   * Possible values are: 0. Only voided in-app product purchases will be
   * returned in the response. This is the default value. 1. Both voided in-app
   * purchases and voided subscription purchases will be returned in the
   * response. Note: Before requesting to receive voided subscription purchases,
   * you must switch to use orderId in the response which uniquely identifies
   * one-time purchases and subscriptions. Otherwise, you will receive multiple
   * subscription orders with the same PurchaseToken, because subscription
   * renewal orders share the same PurchaseToken.
   */
  type?: number;
}

function serializePurchasesVoidedpurchasesListOptions(data: any): PurchasesVoidedpurchasesListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? String(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? String(data["startTime"]) : undefined,
  };
}

function deserializePurchasesVoidedpurchasesListOptions(data: any): PurchasesVoidedpurchasesListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? BigInt(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? BigInt(data["startTime"]) : undefined,
  };
}

/**
 * Configuration for a base plan specific to a region.
 */
export interface RegionalBasePlanConfig {
  /**
   * Whether the base plan in the specified region is available for new
   * subscribers. Existing subscribers will not have their subscription canceled
   * if this value is set to false. If not specified, this will default to
   * false.
   */
  newSubscriberAvailability?: boolean;
  /**
   * The price of the base plan in the specified region. Must be set if the
   * base plan is available to new subscribers. Must be set in the currency that
   * is linked to the specified region.
   */
  price?: Money;
  /**
   * Required. Region code this configuration applies to, as defined by ISO
   * 3166-2, e.g. "US".
   */
  regionCode?: string;
}

function serializeRegionalBasePlanConfig(data: any): RegionalBasePlanConfig {
  return {
    ...data,
    price: data["price"] !== undefined ? serializeMoney(data["price"]) : undefined,
  };
}

function deserializeRegionalBasePlanConfig(data: any): RegionalBasePlanConfig {
  return {
    ...data,
    price: data["price"] !== undefined ? deserializeMoney(data["price"]) : undefined,
  };
}

/**
 * Configuration for a price migration.
 */
export interface RegionalPriceMigrationConfig {
  /**
   * Required. The cutoff time for historical prices that subscribers can
   * remain paying. Subscribers who are on a price that was created before this
   * cutoff time will be migrated to the currently-offered price. These
   * subscribers will receive a notification that they will be paying a
   * different price. Subscribers who do not agree to the new price will have
   * their subscription ended at the next renewal.
   */
  oldestAllowedPriceVersionTime?: Date;
  /**
   * Required. Region code this configuration applies to, as defined by ISO
   * 3166-2, e.g. "US".
   */
  regionCode?: string;
}

function serializeRegionalPriceMigrationConfig(data: any): RegionalPriceMigrationConfig {
  return {
    ...data,
    oldestAllowedPriceVersionTime: data["oldestAllowedPriceVersionTime"] !== undefined ? data["oldestAllowedPriceVersionTime"].toISOString() : undefined,
  };
}

function deserializeRegionalPriceMigrationConfig(data: any): RegionalPriceMigrationConfig {
  return {
    ...data,
    oldestAllowedPriceVersionTime: data["oldestAllowedPriceVersionTime"] !== undefined ? new Date(data["oldestAllowedPriceVersionTime"]) : undefined,
  };
}

/**
 * Configuration for a subscription offer in a single region.
 */
export interface RegionalSubscriptionOfferConfig {
  /**
   * Whether the subscription offer in the specified region is available for
   * new subscribers. Existing subscribers will not have their subscription
   * cancelled if this value is set to false. If not specified, this will
   * default to false.
   */
  newSubscriberAvailability?: boolean;
  /**
   * Required. Immutable. Region code this configuration applies to, as defined
   * by ISO 3166-2, e.g. "US".
   */
  regionCode?: string;
}

/**
 * Configuration for a single phase of a subscription offer in a single region.
 */
export interface RegionalSubscriptionOfferPhaseConfig {
  /**
   * The absolute amount of money subtracted from the base plan price prorated
   * over the phase duration that the user pays for this offer phase. For
   * example, if the base plan price for this region is $12 for a period of 1
   * year, then a $1 absolute discount for a phase of a duration of 3 months
   * would correspond to a price of $2. The resulting price may not be smaller
   * than the minimum price allowed for this region.
   */
  absoluteDiscount?: Money;
  /**
   * The absolute price the user pays for this offer phase. The price must not
   * be smaller than the minimum price allowed for this region.
   */
  price?: Money;
  /**
   * Required. Immutable. The region to which this config applies.
   */
  regionCode?: string;
  /**
   * The fraction of the base plan price prorated over the phase duration that
   * the user pays for this offer phase. For example, if the base plan price for
   * this region is $12 for a period of 1 year, then a 50% discount for a phase
   * of a duration of 3 months would correspond to a price of $1.50. The
   * discount must be specified as a fraction strictly larger than 0 and
   * strictly smaller than 1. The resulting price will be rounded to the nearest
   * billable unit (e.g. cents for USD). The relative discount is considered
   * invalid if the discounted price ends up being smaller than the minimum
   * price allowed in this region.
   */
  relativeDiscount?: number;
}

function serializeRegionalSubscriptionOfferPhaseConfig(data: any): RegionalSubscriptionOfferPhaseConfig {
  return {
    ...data,
    absoluteDiscount: data["absoluteDiscount"] !== undefined ? serializeMoney(data["absoluteDiscount"]) : undefined,
    price: data["price"] !== undefined ? serializeMoney(data["price"]) : undefined,
  };
}

function deserializeRegionalSubscriptionOfferPhaseConfig(data: any): RegionalSubscriptionOfferPhaseConfig {
  return {
    ...data,
    absoluteDiscount: data["absoluteDiscount"] !== undefined ? deserializeMoney(data["absoluteDiscount"]) : undefined,
    price: data["price"] !== undefined ? deserializeMoney(data["price"]) : undefined,
  };
}

/**
 * Specified details about taxation in a given geographical region.
 */
export interface RegionalTaxRateInfo {
  /**
   * You must tell us if your app contains streaming products to correctly
   * charge US state and local sales tax. Field only supported in United States.
   */
  eligibleForStreamingServiceTaxRate?: boolean;
  /**
   * To collect communications or amusement taxes in the United States, choose
   * the appropriate tax category. [Learn
   * more](https://support.google.com/googleplay/android-developer/answer/10463498#streaming_tax).
   */
  streamingTaxType?:  | "STREAMING_TAX_TYPE_UNSPECIFIED" | "STREAMING_TAX_TYPE_TELCO_VIDEO_RENTAL" | "STREAMING_TAX_TYPE_TELCO_VIDEO_SALES" | "STREAMING_TAX_TYPE_TELCO_VIDEO_MULTI_CHANNEL" | "STREAMING_TAX_TYPE_TELCO_AUDIO_RENTAL" | "STREAMING_TAX_TYPE_TELCO_AUDIO_SALES" | "STREAMING_TAX_TYPE_TELCO_AUDIO_MULTI_CHANNEL";
  /**
   * Tax tier to specify reduced tax rate. Developers who sell digital news,
   * magazines, newspapers, books, or audiobooks in various regions may be
   * eligible for reduced tax rates. [Learn
   * more](https://support.google.com/googleplay/android-developer/answer/10463498).
   */
  taxTier?:  | "TAX_TIER_UNSPECIFIED" | "TAX_TIER_BOOKS_1" | "TAX_TIER_NEWS_1" | "TAX_TIER_NEWS_2" | "TAX_TIER_MUSIC_OR_AUDIO_1" | "TAX_TIER_LIVE_OR_BROADCAST_1";
}

/**
 * The version of the available regions being used for the specified resource.
 */
export interface RegionsVersion {
  /**
   * Required. A string representing version of the available regions being
   * used for the specified resource. The current version is 2022/02.
   */
  version?: string;
}

/**
 * Information specific to cancellations caused by subscription replacement.
 */
export interface ReplacementCancellation {
}

/**
 * An Android app review.
 */
export interface Review {
  /**
   * The name of the user who wrote the review.
   */
  authorName?: string;
  /**
   * A repeated field containing comments for the review.
   */
  comments?: Comment[];
  /**
   * Unique identifier for this review.
   */
  reviewId?: string;
}

function serializeReview(data: any): Review {
  return {
    ...data,
    comments: data["comments"] !== undefined ? data["comments"].map((item: any) => (serializeComment(item))) : undefined,
  };
}

function deserializeReview(data: any): Review {
  return {
    ...data,
    comments: data["comments"] !== undefined ? data["comments"].map((item: any) => (deserializeComment(item))) : undefined,
  };
}

/**
 * The result of replying/updating a reply to review.
 */
export interface ReviewReplyResult {
  /**
   * The time at which the reply took effect.
   */
  lastEdited?: Timestamp;
  /**
   * The reply text that was applied.
   */
  replyText?: string;
}

function serializeReviewReplyResult(data: any): ReviewReplyResult {
  return {
    ...data,
    lastEdited: data["lastEdited"] !== undefined ? serializeTimestamp(data["lastEdited"]) : undefined,
  };
}

function deserializeReviewReplyResult(data: any): ReviewReplyResult {
  return {
    ...data,
    lastEdited: data["lastEdited"] !== undefined ? deserializeTimestamp(data["lastEdited"]) : undefined,
  };
}

/**
 * Additional options for Androidpublisher#reviewsGet.
 */
export interface ReviewsGetOptions {
  /**
   * Language localization code.
   */
  translationLanguage?: string;
}

/**
 * Additional options for Androidpublisher#reviewsList.
 */
export interface ReviewsListOptions {
  /**
   * How many results the list operation should return.
   */
  maxResults?: number;
  /**
   * The index of the first element to return.
   */
  startIndex?: number;
  /**
   * Pagination token. If empty, list starts at the first review.
   */
  token?: string;
  /**
   * Language localization code.
   */
  translationLanguage?: string;
}

/**
 * Response listing reviews.
 */
export interface ReviewsListResponse {
  /**
   * Information about the current page.
   */
  pageInfo?: PageInfo;
  /**
   * List of reviews.
   */
  reviews?: Review[];
  /**
   * Pagination token, to handle a number of products that is over one page.
   */
  tokenPagination?: TokenPagination;
}

function serializeReviewsListResponse(data: any): ReviewsListResponse {
  return {
    ...data,
    reviews: data["reviews"] !== undefined ? data["reviews"].map((item: any) => (serializeReview(item))) : undefined,
  };
}

function deserializeReviewsListResponse(data: any): ReviewsListResponse {
  return {
    ...data,
    reviews: data["reviews"] !== undefined ? data["reviews"].map((item: any) => (deserializeReview(item))) : undefined,
  };
}

/**
 * Request to reply to review or update existing reply.
 */
export interface ReviewsReplyRequest {
  /**
   * The text to set as the reply. Replies of more than approximately 350
   * characters will be rejected. HTML tags will be stripped.
   */
  replyText?: string;
}

/**
 * Response on status of replying to a review.
 */
export interface ReviewsReplyResponse {
  /**
   * The result of replying/updating a reply to review.
   */
  result?: ReviewReplyResult;
}

function serializeReviewsReplyResponse(data: any): ReviewsReplyResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? serializeReviewReplyResult(data["result"]) : undefined,
  };
}

function deserializeReviewsReplyResponse(data: any): ReviewsReplyResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? deserializeReviewReplyResult(data["result"]) : undefined,
  };
}

/**
 * Information associated with purchases made with 'Subscribe with Google'.
 */
export interface SubscribeWithGoogleInfo {
  /**
   * The email address of the user when the subscription was purchased.
   */
  emailAddress?: string;
  /**
   * The family name of the user when the subscription was purchased.
   */
  familyName?: string;
  /**
   * The given name of the user when the subscription was purchased.
   */
  givenName?: string;
  /**
   * The Google profile id of the user when the subscription was purchased.
   */
  profileId?: string;
  /**
   * The profile name of the user when the subscription was purchased.
   */
  profileName?: string;
}

/**
 * A single subscription for an app.
 */
export interface Subscription {
  /**
   * Output only. Whether this subscription is archived. Archived subscriptions
   * are not available to any subscriber any longer, cannot be updated, and are
   * not returned in list requests unless the show archived flag is passed in.
   */
  readonly archived?: boolean;
  /**
   * The set of base plans for this subscription. Represents the prices and
   * duration of the subscription if no other offers apply.
   */
  basePlans?: BasePlan[];
  /**
   * Required. List of localized listings for this subscription. Must contain
   * at least an entry for the default language of the parent app.
   */
  listings?: SubscriptionListing[];
  /**
   * Immutable. Package name of the parent app.
   */
  packageName?: string;
  /**
   * Immutable. Unique product ID of the product. Unique within the parent app.
   * Product IDs must be composed of lower-case letters (a-z), numbers (0-9),
   * underscores (_) and dots (.). It must start with a lower-case letter or
   * number, and be between 1 and 40 (inclusive) characters in length.
   */
  productId?: string;
  /**
   * Details about taxes and legal compliance.
   */
  taxAndComplianceSettings?: SubscriptionTaxAndComplianceSettings;
}

function serializeSubscription(data: any): Subscription {
  return {
    ...data,
    basePlans: data["basePlans"] !== undefined ? data["basePlans"].map((item: any) => (serializeBasePlan(item))) : undefined,
  };
}

function deserializeSubscription(data: any): Subscription {
  return {
    ...data,
    basePlans: data["basePlans"] !== undefined ? data["basePlans"].map((item: any) => (deserializeBasePlan(item))) : undefined,
  };
}

/**
 * Information provided by the user when they complete the subscription
 * cancellation flow (cancellation reason survey).
 */
export interface SubscriptionCancelSurveyResult {
  /**
   * The cancellation reason the user chose in the survey. Possible values are:
   * 0. Other 1. I don't use this service enough 2. Technical issues 3.
   * Cost-related reasons 4. I found a better app
   */
  cancelSurveyReason?: number;
  /**
   * The customized input cancel reason from the user. Only present when
   * cancelReason is 0.
   */
  userInputCancelReason?: string;
}

/**
 * A SubscriptionDeferralInfo contains the data needed to defer a subscription
 * purchase to a future expiry time.
 */
export interface SubscriptionDeferralInfo {
  /**
   * The desired next expiry time to assign to the subscription, in
   * milliseconds since the Epoch. The given time must be later/greater than the
   * current expiry time for the subscription.
   */
  desiredExpiryTimeMillis?: bigint;
  /**
   * The expected expiry time for the subscription. If the current expiry time
   * for the subscription is not the value specified here, the deferral will not
   * occur.
   */
  expectedExpiryTimeMillis?: bigint;
}

function serializeSubscriptionDeferralInfo(data: any): SubscriptionDeferralInfo {
  return {
    ...data,
    desiredExpiryTimeMillis: data["desiredExpiryTimeMillis"] !== undefined ? String(data["desiredExpiryTimeMillis"]) : undefined,
    expectedExpiryTimeMillis: data["expectedExpiryTimeMillis"] !== undefined ? String(data["expectedExpiryTimeMillis"]) : undefined,
  };
}

function deserializeSubscriptionDeferralInfo(data: any): SubscriptionDeferralInfo {
  return {
    ...data,
    desiredExpiryTimeMillis: data["desiredExpiryTimeMillis"] !== undefined ? BigInt(data["desiredExpiryTimeMillis"]) : undefined,
    expectedExpiryTimeMillis: data["expectedExpiryTimeMillis"] !== undefined ? BigInt(data["expectedExpiryTimeMillis"]) : undefined,
  };
}

/**
 * Price change related information of a subscription item.
 */
export interface SubscriptionItemPriceChangeDetails {
  /**
   * The renewal time at which the price change will become effective for the
   * user. This is subject to change(to a future time) due to cases where the
   * renewal time shifts like pause.
   */
  expectedNewPriceChargeTime?: Date;
  /**
   * New recurring price for the subscription item.
   */
  newPrice?: Money;
  /**
   * Price change mode specifies how the subscription item price is changing.
   */
  priceChangeMode?:  | "PRICE_CHANGE_MODE_UNSPECIFIED" | "PRICE_DECREASE" | "PRICE_INCREASE";
  /**
   * State the price change is currently in.
   */
  priceChangeState?:  | "PRICE_CHANGE_STATE_UNSPECIFIED" | "OUTSTANDING" | "CONFIRMED" | "APPLIED";
}

function serializeSubscriptionItemPriceChangeDetails(data: any): SubscriptionItemPriceChangeDetails {
  return {
    ...data,
    expectedNewPriceChargeTime: data["expectedNewPriceChargeTime"] !== undefined ? data["expectedNewPriceChargeTime"].toISOString() : undefined,
    newPrice: data["newPrice"] !== undefined ? serializeMoney(data["newPrice"]) : undefined,
  };
}

function deserializeSubscriptionItemPriceChangeDetails(data: any): SubscriptionItemPriceChangeDetails {
  return {
    ...data,
    expectedNewPriceChargeTime: data["expectedNewPriceChargeTime"] !== undefined ? new Date(data["expectedNewPriceChargeTime"]) : undefined,
    newPrice: data["newPrice"] !== undefined ? deserializeMoney(data["newPrice"]) : undefined,
  };
}

/**
 * The consumer-visible metadata of a subscription.
 */
export interface SubscriptionListing {
  /**
   * A list of benefits shown to the user on platforms such as the Play Store
   * and in restoration flows in the language of this listing. Plain text.
   * Ordered list of at most four benefits.
   */
  benefits?: string[];
  /**
   * The description of this subscription in the language of this listing.
   * Maximum length - 80 characters. Plain text.
   */
  description?: string;
  /**
   * Required. The language of this listing, as defined by BCP-47, e.g.
   * "en-US".
   */
  languageCode?: string;
  /**
   * Required. The title of this subscription in the language of this listing.
   * Plain text.
   */
  title?: string;
}

/**
 * A single, temporary offer
 */
export interface SubscriptionOffer {
  /**
   * Required. Immutable. The ID of the base plan to which this offer is an
   * extension.
   */
  basePlanId?: string;
  /**
   * Required. Immutable. Unique ID of this subscription offer. Must be unique
   * within the base plan.
   */
  offerId?: string;
  /**
   * List of up to 20 custom tags specified for this offer, and returned to the
   * app through the billing library.
   */
  offerTags?: OfferTag[];
  /**
   * The configuration for any new locations Play may launch in the future.
   */
  otherRegionsConfig?: OtherRegionsSubscriptionOfferConfig;
  /**
   * Required. Immutable. The package name of the app the parent subscription
   * belongs to.
   */
  packageName?: string;
  /**
   * Required. The phases of this subscription offer. Must contain at least one
   * entry, and may contain at most five. Users will always receive all these
   * phases in the specified order. Phases may not be added, removed, or
   * reordered after initial creation.
   */
  phases?: SubscriptionOfferPhase[];
  /**
   * Required. Immutable. The ID of the parent subscription this offer belongs
   * to.
   */
  productId?: string;
  /**
   * Required. The region-specific configuration of this offer. Must contain at
   * least one entry.
   */
  regionalConfigs?: RegionalSubscriptionOfferConfig[];
  /**
   * Output only. The current state of this offer. Can be changed using
   * Activate and Deactivate actions. NB: the base plan state supersedes this
   * state, so an active offer may not be available if the base plan is not
   * active.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "ACTIVE" | "INACTIVE";
  /**
   * The requirements that users need to fulfil to be eligible for this offer.
   * Represents the requirements that Play will evaluate to decide whether an
   * offer should be returned. Developers may further filter these offers
   * themselves.
   */
  targeting?: SubscriptionOfferTargeting;
}

function serializeSubscriptionOffer(data: any): SubscriptionOffer {
  return {
    ...data,
    phases: data["phases"] !== undefined ? data["phases"].map((item: any) => (serializeSubscriptionOfferPhase(item))) : undefined,
  };
}

function deserializeSubscriptionOffer(data: any): SubscriptionOffer {
  return {
    ...data,
    phases: data["phases"] !== undefined ? data["phases"].map((item: any) => (deserializeSubscriptionOfferPhase(item))) : undefined,
  };
}

/**
 * A single phase of a subscription offer.
 */
export interface SubscriptionOfferPhase {
  /**
   * Required. The duration of a single recurrence of this phase. Specified in
   * ISO 8601 format.
   */
  duration?: string;
  /**
   * Pricing information for any new locations Play may launch in.
   */
  otherRegionsConfig?: OtherRegionsSubscriptionOfferPhaseConfig;
  /**
   * Required. The number of times this phase repeats. If this offer phase is
   * not free, each recurrence charges the user the price of this offer phase.
   */
  recurrenceCount?: number;
  /**
   * Required. The region-specific configuration of this offer phase. This list
   * must contain exactly one entry for each region for which the subscription
   * offer has a regional config.
   */
  regionalConfigs?: RegionalSubscriptionOfferPhaseConfig[];
}

function serializeSubscriptionOfferPhase(data: any): SubscriptionOfferPhase {
  return {
    ...data,
    otherRegionsConfig: data["otherRegionsConfig"] !== undefined ? serializeOtherRegionsSubscriptionOfferPhaseConfig(data["otherRegionsConfig"]) : undefined,
    regionalConfigs: data["regionalConfigs"] !== undefined ? data["regionalConfigs"].map((item: any) => (serializeRegionalSubscriptionOfferPhaseConfig(item))) : undefined,
  };
}

function deserializeSubscriptionOfferPhase(data: any): SubscriptionOfferPhase {
  return {
    ...data,
    otherRegionsConfig: data["otherRegionsConfig"] !== undefined ? deserializeOtherRegionsSubscriptionOfferPhaseConfig(data["otherRegionsConfig"]) : undefined,
    regionalConfigs: data["regionalConfigs"] !== undefined ? data["regionalConfigs"].map((item: any) => (deserializeRegionalSubscriptionOfferPhaseConfig(item))) : undefined,
  };
}

/**
 * Defines the rule a user needs to satisfy to receive this offer.
 */
export interface SubscriptionOfferTargeting {
  /**
   * Offer targeting rule for new user acquisition.
   */
  acquisitionRule?: AcquisitionTargetingRule;
  /**
   * Offer targeting rule for upgrading users' existing plans.
   */
  upgradeRule?: UpgradeTargetingRule;
}

/**
 * Contains the price change information for a subscription that can be used to
 * control the user journey for the price change in the app. This can be in the
 * form of seeking confirmation from the user or tailoring the experience for a
 * successful conversion.
 */
export interface SubscriptionPriceChange {
  /**
   * The new price the subscription will renew with if the price change is
   * accepted by the user.
   */
  newPrice?: Price;
  /**
   * The current state of the price change. Possible values are: 0.
   * Outstanding: State for a pending price change waiting for the user to
   * agree. In this state, you can optionally seek confirmation from the user
   * using the In-App API. 1. Accepted: State for an accepted price change that
   * the subscription will renew with unless it's canceled. The price change
   * takes effect on a future date when the subscription renews. Note that the
   * change might not occur when the subscription is renewed next.
   */
  state?: number;
}

/**
 * A SubscriptionPurchase resource indicates the status of a user's
 * subscription purchase.
 */
export interface SubscriptionPurchase {
  /**
   * The acknowledgement state of the subscription product. Possible values
   * are: 0. Yet to be acknowledged 1. Acknowledged
   */
  acknowledgementState?: number;
  /**
   * Whether the subscription will automatically be renewed when it reaches its
   * current expiry time.
   */
  autoRenewing?: boolean;
  /**
   * Time at which the subscription will be automatically resumed, in
   * milliseconds since the Epoch. Only present if the user has requested to
   * pause the subscription.
   */
  autoResumeTimeMillis?: bigint;
  /**
   * The reason why a subscription was canceled or is not auto-renewing.
   * Possible values are: 0. User canceled the subscription 1. Subscription was
   * canceled by the system, for example because of a billing problem 2.
   * Subscription was replaced with a new subscription 3. Subscription was
   * canceled by the developer
   */
  cancelReason?: number;
  /**
   * Information provided by the user when they complete the subscription
   * cancellation flow (cancellation reason survey).
   */
  cancelSurveyResult?: SubscriptionCancelSurveyResult;
  /**
   * ISO 3166-1 alpha-2 billing country/region code of the user at the time the
   * subscription was granted.
   */
  countryCode?: string;
  /**
   * A developer-specified string that contains supplemental information about
   * an order.
   */
  developerPayload?: string;
  /**
   * The email address of the user when the subscription was purchased. Only
   * present for purchases made with 'Subscribe with Google'.
   */
  emailAddress?: string;
  /**
   * Time at which the subscription will expire, in milliseconds since the
   * Epoch.
   */
  expiryTimeMillis?: bigint;
  /**
   * User account identifier in the third-party service. Only present if
   * account linking happened as part of the subscription purchase flow.
   */
  externalAccountId?: string;
  /**
   * The family name of the user when the subscription was purchased. Only
   * present for purchases made with 'Subscribe with Google'.
   */
  familyName?: string;
  /**
   * The given name of the user when the subscription was purchased. Only
   * present for purchases made with 'Subscribe with Google'.
   */
  givenName?: string;
  /**
   * Introductory price information of the subscription. This is only present
   * when the subscription was purchased with an introductory price. This field
   * does not indicate the subscription is currently in introductory price
   * period.
   */
  introductoryPriceInfo?: IntroductoryPriceInfo;
  /**
   * This kind represents a subscriptionPurchase object in the androidpublisher
   * service.
   */
  kind?: string;
  /**
   * The purchase token of the originating purchase if this subscription is one
   * of the following: 0. Re-signup of a canceled but non-lapsed subscription 1.
   * Upgrade/downgrade from a previous subscription For example, suppose a user
   * originally signs up and you receive purchase token X, then the user cancels
   * and goes through the resignup flow (before their subscription lapses) and
   * you receive purchase token Y, and finally the user upgrades their
   * subscription and you receive purchase token Z. If you call this API with
   * purchase token Z, this field will be set to Y. If you call this API with
   * purchase token Y, this field will be set to X. If you call this API with
   * purchase token X, this field will not be set.
   */
  linkedPurchaseToken?: string;
  /**
   * An obfuscated version of the id that is uniquely associated with the
   * user's account in your app. Present for the following purchases: * If
   * account linking happened as part of the subscription purchase flow. * It
   * was specified using
   * https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedaccountid
   * when the purchase was made.
   */
  obfuscatedExternalAccountId?: string;
  /**
   * An obfuscated version of the id that is uniquely associated with the
   * user's profile in your app. Only present if specified using
   * https://developer.android.com/reference/com/android/billingclient/api/BillingFlowParams.Builder#setobfuscatedprofileid
   * when the purchase was made.
   */
  obfuscatedExternalProfileId?: string;
  /**
   * The order id of the latest recurring order associated with the purchase of
   * the subscription. If the subscription was canceled because payment was
   * declined, this will be the order id from the payment declined order.
   */
  orderId?: string;
  /**
   * The payment state of the subscription. Possible values are: 0. Payment
   * pending 1. Payment received 2. Free trial 3. Pending deferred
   * upgrade/downgrade Not present for canceled, expired subscriptions.
   */
  paymentState?: number;
  /**
   * Price of the subscription, For tax exclusive countries, the price doesn't
   * include tax. For tax inclusive countries, the price includes tax. Price is
   * expressed in micro-units, where 1,000,000 micro-units represents one unit
   * of the currency. For example, if the subscription price is €1.99,
   * price_amount_micros is 1990000.
   */
  priceAmountMicros?: bigint;
  /**
   * The latest price change information available. This is present only when
   * there is an upcoming price change for the subscription yet to be applied.
   * Once the subscription renews with the new price or the subscription is
   * canceled, no price change information will be returned.
   */
  priceChange?: SubscriptionPriceChange;
  /**
   * ISO 4217 currency code for the subscription price. For example, if the
   * price is specified in British pounds sterling, price_currency_code is
   * "GBP".
   */
  priceCurrencyCode?: string;
  /**
   * The Google profile id of the user when the subscription was purchased.
   * Only present for purchases made with 'Subscribe with Google'.
   */
  profileId?: string;
  /**
   * The profile name of the user when the subscription was purchased. Only
   * present for purchases made with 'Subscribe with Google'.
   */
  profileName?: string;
  /**
   * The promotion code applied on this purchase. This field is only set if a
   * vanity code promotion is applied when the subscription was purchased.
   */
  promotionCode?: string;
  /**
   * The type of promotion applied on this purchase. This field is only set if
   * a promotion is applied when the subscription was purchased. Possible values
   * are: 0. One time code 1. Vanity code
   */
  promotionType?: number;
  /**
   * The type of purchase of the subscription. This field is only set if this
   * purchase was not made using the standard in-app billing flow. Possible
   * values are: 0. Test (i.e. purchased from a license testing account) 1.
   * Promo (i.e. purchased using a promo code)
   */
  purchaseType?: number;
  /**
   * Time at which the subscription was granted, in milliseconds since the
   * Epoch.
   */
  startTimeMillis?: bigint;
  /**
   * The time at which the subscription was canceled by the user, in
   * milliseconds since the epoch. Only present if cancelReason is 0.
   */
  userCancellationTimeMillis?: bigint;
}

function serializeSubscriptionPurchase(data: any): SubscriptionPurchase {
  return {
    ...data,
    autoResumeTimeMillis: data["autoResumeTimeMillis"] !== undefined ? String(data["autoResumeTimeMillis"]) : undefined,
    expiryTimeMillis: data["expiryTimeMillis"] !== undefined ? String(data["expiryTimeMillis"]) : undefined,
    introductoryPriceInfo: data["introductoryPriceInfo"] !== undefined ? serializeIntroductoryPriceInfo(data["introductoryPriceInfo"]) : undefined,
    priceAmountMicros: data["priceAmountMicros"] !== undefined ? String(data["priceAmountMicros"]) : undefined,
    startTimeMillis: data["startTimeMillis"] !== undefined ? String(data["startTimeMillis"]) : undefined,
    userCancellationTimeMillis: data["userCancellationTimeMillis"] !== undefined ? String(data["userCancellationTimeMillis"]) : undefined,
  };
}

function deserializeSubscriptionPurchase(data: any): SubscriptionPurchase {
  return {
    ...data,
    autoResumeTimeMillis: data["autoResumeTimeMillis"] !== undefined ? BigInt(data["autoResumeTimeMillis"]) : undefined,
    expiryTimeMillis: data["expiryTimeMillis"] !== undefined ? BigInt(data["expiryTimeMillis"]) : undefined,
    introductoryPriceInfo: data["introductoryPriceInfo"] !== undefined ? deserializeIntroductoryPriceInfo(data["introductoryPriceInfo"]) : undefined,
    priceAmountMicros: data["priceAmountMicros"] !== undefined ? BigInt(data["priceAmountMicros"]) : undefined,
    startTimeMillis: data["startTimeMillis"] !== undefined ? BigInt(data["startTimeMillis"]) : undefined,
    userCancellationTimeMillis: data["userCancellationTimeMillis"] !== undefined ? BigInt(data["userCancellationTimeMillis"]) : undefined,
  };
}

/**
 * Item-level info for a subscription purchase.
 */
export interface SubscriptionPurchaseLineItem {
  /**
   * The item is auto renewing.
   */
  autoRenewingPlan?: AutoRenewingPlan;
  /**
   * Time at which the subscription expired or will expire unless the access is
   * extended (ex. renews).
   */
  expiryTime?: Date;
  /**
   * The offer details for this item.
   */
  offerDetails?: OfferDetails;
  /**
   * The item is prepaid.
   */
  prepaidPlan?: PrepaidPlan;
  /**
   * The purchased product ID (for example, 'monthly001').
   */
  productId?: string;
}

function serializeSubscriptionPurchaseLineItem(data: any): SubscriptionPurchaseLineItem {
  return {
    ...data,
    autoRenewingPlan: data["autoRenewingPlan"] !== undefined ? serializeAutoRenewingPlan(data["autoRenewingPlan"]) : undefined,
    expiryTime: data["expiryTime"] !== undefined ? data["expiryTime"].toISOString() : undefined,
    prepaidPlan: data["prepaidPlan"] !== undefined ? serializePrepaidPlan(data["prepaidPlan"]) : undefined,
  };
}

function deserializeSubscriptionPurchaseLineItem(data: any): SubscriptionPurchaseLineItem {
  return {
    ...data,
    autoRenewingPlan: data["autoRenewingPlan"] !== undefined ? deserializeAutoRenewingPlan(data["autoRenewingPlan"]) : undefined,
    expiryTime: data["expiryTime"] !== undefined ? new Date(data["expiryTime"]) : undefined,
    prepaidPlan: data["prepaidPlan"] !== undefined ? deserializePrepaidPlan(data["prepaidPlan"]) : undefined,
  };
}

/**
 * Request for the purchases.subscriptions.acknowledge API.
 */
export interface SubscriptionPurchasesAcknowledgeRequest {
  /**
   * Payload to attach to the purchase.
   */
  developerPayload?: string;
}

/**
 * Request for the purchases.subscriptions.defer API.
 */
export interface SubscriptionPurchasesDeferRequest {
  /**
   * The information about the new desired expiry time for the subscription.
   */
  deferralInfo?: SubscriptionDeferralInfo;
}

function serializeSubscriptionPurchasesDeferRequest(data: any): SubscriptionPurchasesDeferRequest {
  return {
    ...data,
    deferralInfo: data["deferralInfo"] !== undefined ? serializeSubscriptionDeferralInfo(data["deferralInfo"]) : undefined,
  };
}

function deserializeSubscriptionPurchasesDeferRequest(data: any): SubscriptionPurchasesDeferRequest {
  return {
    ...data,
    deferralInfo: data["deferralInfo"] !== undefined ? deserializeSubscriptionDeferralInfo(data["deferralInfo"]) : undefined,
  };
}

/**
 * Response for the purchases.subscriptions.defer API.
 */
export interface SubscriptionPurchasesDeferResponse {
  /**
   * The new expiry time for the subscription in milliseconds since the Epoch.
   */
  newExpiryTimeMillis?: bigint;
}

function serializeSubscriptionPurchasesDeferResponse(data: any): SubscriptionPurchasesDeferResponse {
  return {
    ...data,
    newExpiryTimeMillis: data["newExpiryTimeMillis"] !== undefined ? String(data["newExpiryTimeMillis"]) : undefined,
  };
}

function deserializeSubscriptionPurchasesDeferResponse(data: any): SubscriptionPurchasesDeferResponse {
  return {
    ...data,
    newExpiryTimeMillis: data["newExpiryTimeMillis"] !== undefined ? BigInt(data["newExpiryTimeMillis"]) : undefined,
  };
}

/**
 * Indicates the status of a user's subscription purchase.
 */
export interface SubscriptionPurchaseV2 {
  /**
   * The acknowledgement state of the subscription.
   */
  acknowledgementState?:  | "ACKNOWLEDGEMENT_STATE_UNSPECIFIED" | "ACKNOWLEDGEMENT_STATE_PENDING" | "ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED";
  /**
   * Additional context around canceled subscriptions. Only present if the
   * subscription currently has subscription_state SUBSCRIPTION_STATE_CANCELED.
   */
  canceledStateContext?: CanceledStateContext;
  /**
   * User account identifier in the third-party service.
   */
  externalAccountIdentifiers?: ExternalAccountIdentifiers;
  /**
   * This kind represents a SubscriptionPurchaseV2 object in the
   * androidpublisher service.
   */
  kind?: string;
  /**
   * The order id of the latest order associated with the purchase of the
   * subscription. For autoRenewing subscription, this is the order id of signup
   * order if it is not renewed yet, or the last recurring order id (success,
   * pending, or declined order). For prepaid subscription, this is the order id
   * associated with the queried purchase token.
   */
  latestOrderId?: string;
  /**
   * Item-level info for a subscription purchase. The items in the same
   * purchase should be either all with AutoRenewingPlan or all with
   * PrepaidPlan.
   */
  lineItems?: SubscriptionPurchaseLineItem[];
  /**
   * The purchase token of the old subscription if this subscription is one of
   * the following: * Re-signup of a canceled but non-lapsed subscription *
   * Upgrade/downgrade from a previous subscription. * Convert from prepaid to
   * auto renewing subscription. * Convert from an auto renewing subscription to
   * prepaid. * Topup a prepaid subscription.
   */
  linkedPurchaseToken?: string;
  /**
   * Additional context around paused subscriptions. Only present if the
   * subscription currently has subscription_state SUBSCRIPTION_STATE_PAUSED.
   */
  pausedStateContext?: PausedStateContext;
  /**
   * ISO 3166-1 alpha-2 billing country/region code of the user at the time the
   * subscription was granted.
   */
  regionCode?: string;
  /**
   * Time at which the subscription was granted. Not set for pending
   * subscriptions (subscription was created but awaiting payment during
   * signup).
   */
  startTime?: Date;
  /**
   * User profile associated with purchases made with 'Subscribe with Google'.
   */
  subscribeWithGoogleInfo?: SubscribeWithGoogleInfo;
  /**
   * The current state of the subscription.
   */
  subscriptionState?:  | "SUBSCRIPTION_STATE_UNSPECIFIED" | "SUBSCRIPTION_STATE_PENDING" | "SUBSCRIPTION_STATE_ACTIVE" | "SUBSCRIPTION_STATE_PAUSED" | "SUBSCRIPTION_STATE_IN_GRACE_PERIOD" | "SUBSCRIPTION_STATE_ON_HOLD" | "SUBSCRIPTION_STATE_CANCELED" | "SUBSCRIPTION_STATE_EXPIRED";
  /**
   * Only present if this subscription purchase is a test purchase.
   */
  testPurchase?: TestPurchase;
}

function serializeSubscriptionPurchaseV2(data: any): SubscriptionPurchaseV2 {
  return {
    ...data,
    canceledStateContext: data["canceledStateContext"] !== undefined ? serializeCanceledStateContext(data["canceledStateContext"]) : undefined,
    lineItems: data["lineItems"] !== undefined ? data["lineItems"].map((item: any) => (serializeSubscriptionPurchaseLineItem(item))) : undefined,
    pausedStateContext: data["pausedStateContext"] !== undefined ? serializePausedStateContext(data["pausedStateContext"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeSubscriptionPurchaseV2(data: any): SubscriptionPurchaseV2 {
  return {
    ...data,
    canceledStateContext: data["canceledStateContext"] !== undefined ? deserializeCanceledStateContext(data["canceledStateContext"]) : undefined,
    lineItems: data["lineItems"] !== undefined ? data["lineItems"].map((item: any) => (deserializeSubscriptionPurchaseLineItem(item))) : undefined,
    pausedStateContext: data["pausedStateContext"] !== undefined ? deserializePausedStateContext(data["pausedStateContext"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Details about taxation, Google Play policy and legal compliance for
 * subscription products.
 */
export interface SubscriptionTaxAndComplianceSettings {
  /**
   * Digital content or service classification for products distributed to
   * users in the European Economic Area (EEA). The withdrawal regime under EEA
   * consumer laws depends on this classification. Refer to the [Help Center
   * article](https://support.google.com/googleplay/android-developer/answer/10463498)
   * for more information.
   */
  eeaWithdrawalRightType?:  | "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED" | "WITHDRAWAL_RIGHT_DIGITAL_CONTENT" | "WITHDRAWAL_RIGHT_SERVICE";
  /**
   * A mapping from region code to tax rate details. The keys are region codes
   * as defined by Unicode's "CLDR".
   */
  taxRateInfoByRegionCode?: {
    [key: string]: RegionalTaxRateInfo
  };
}

/**
 * Response to list previously created system APK variants.
 */
export interface SystemApksListResponse {
  /**
   * All system APK variants created.
   */
  variants?: Variant[];
}

/**
 * Representation of a system feature.
 */
export interface SystemFeature {
  /**
   * The name of the feature.
   */
  name?: string;
}

/**
 * Information specific to cancellations initiated by Google system.
 */
export interface SystemInitiatedCancellation {
}

/**
 * Defines the scope of subscriptions which a targeting rule can match to
 * target offers to users based on past or current entitlement.
 */
export interface TargetingRuleScope {
  /**
   * The scope of the current targeting rule is the subscription with the
   * specified subscription ID. Must be a subscription within the same parent
   * app.
   */
  specificSubscriptionInApp?: string;
}

/**
 * The testers of an app. The resource for TestersService. Note: while it is
 * possible in the Play Console UI to add testers via email lists, email lists
 * are not supported by this resource.
 */
export interface Testers {
  /**
   * All testing Google Groups, as email addresses.
   */
  googleGroups?: string[];
}

/**
 * Whether this subscription purchase is a test purchase.
 */
export interface TestPurchase {
}

/**
 * A Timestamp represents a point in time independent of any time zone or local
 * calendar, encoded as a count of seconds and fractions of seconds at
 * nanosecond resolution. The count is relative to an epoch at UTC midnight on
 * January 1, 1970.
 */
export interface Timestamp {
  /**
   * Non-negative fractions of a second at nanosecond resolution. Must be from
   * 0 to 999,999,999 inclusive.
   */
  nanos?: number;
  /**
   * Represents seconds of UTC time since Unix epoch.
   */
  seconds?: bigint;
}

function serializeTimestamp(data: any): Timestamp {
  return {
    ...data,
    seconds: data["seconds"] !== undefined ? String(data["seconds"]) : undefined,
  };
}

function deserializeTimestamp(data: any): Timestamp {
  return {
    ...data,
    seconds: data["seconds"] !== undefined ? BigInt(data["seconds"]) : undefined,
  };
}

/**
 * Pagination information returned by a List operation when token pagination is
 * enabled. List operations that supports paging return only one "page" of
 * results. This protocol buffer message describes the page that has been
 * returned. When using token pagination, clients should use the next/previous
 * token to get another page of the result. The presence or absence of
 * next/previous token indicates whether a next/previous page is available and
 * provides a mean of accessing this page. ListRequest.page_token should be set
 * to either next_page_token or previous_page_token to access another page.
 */
export interface TokenPagination {
  /**
   * Tokens to pass to the standard list field 'page_token'. Whenever
   * available, tokens are preferred over manipulating start_index.
   */
  nextPageToken?: string;
  previousPageToken?: string;
}

/**
 * A track configuration. The resource for TracksService.
 */
export interface Track {
  /**
   * In a read request, represents all active releases in the track. In an
   * update request, represents desired changes.
   */
  releases?: TrackRelease[];
  /**
   * Identifier of the track.
   */
  track?: string;
}

function serializeTrack(data: any): Track {
  return {
    ...data,
    releases: data["releases"] !== undefined ? data["releases"].map((item: any) => (serializeTrackRelease(item))) : undefined,
  };
}

function deserializeTrack(data: any): Track {
  return {
    ...data,
    releases: data["releases"] !== undefined ? data["releases"].map((item: any) => (deserializeTrackRelease(item))) : undefined,
  };
}

/**
 * Resource for per-track country availability information.
 */
export interface TrackCountryAvailability {
  /**
   * A list of one or more countries where artifacts in this track are
   * available. This list includes all countries that are targeted by the track,
   * even if only specific carriers are targeted in that country.
   */
  countries?: TrackTargetedCountry[];
  /**
   * Whether artifacts in this track are available to "rest of the world"
   * countries.
   */
  restOfWorld?: boolean;
  /**
   * Whether this track's availability is synced with the default production
   * track. See
   * https://support.google.com/googleplay/android-developer/answer/7550024 for
   * more information on syncing country availability with production. Note that
   * if this is true, the returned "countries" and "rest_of_world" fields will
   * reflect the values for the default production track.
   */
  syncWithProduction?: boolean;
}

/**
 * A release within a track.
 */
export interface TrackRelease {
  /**
   * Restricts a release to a specific set of countries.
   */
  countryTargeting?: CountryTargeting;
  /**
   * In-app update priority of the release. All newly added APKs in the release
   * will be considered at this priority. Can take values in the range [0, 5],
   * with 5 the highest priority. Defaults to 0. in_app_update_priority can not
   * be updated once the release is rolled out. See
   * https://developer.android.com/guide/playcore/in-app-updates.
   */
  inAppUpdatePriority?: number;
  /**
   * The release name. Not required to be unique. If not set, the name is
   * generated from the APK's version_name. If the release contains multiple
   * APKs, the name is generated from the date.
   */
  name?: string;
  /**
   * A description of what is new in this release.
   */
  releaseNotes?: LocalizedText[];
  /**
   * The status of the release.
   */
  status?:  | "statusUnspecified" | "draft" | "inProgress" | "halted" | "completed";
  /**
   * Fraction of users who are eligible for a staged release. 0 < fraction < 1.
   * Can only be set when status is "inProgress" or "halted".
   */
  userFraction?: number;
  /**
   * Version codes of all APKs in the release. Must include version codes to
   * retain from previous releases.
   */
  versionCodes?: bigint[];
}

function serializeTrackRelease(data: any): TrackRelease {
  return {
    ...data,
    versionCodes: data["versionCodes"] !== undefined ? data["versionCodes"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeTrackRelease(data: any): TrackRelease {
  return {
    ...data,
    versionCodes: data["versionCodes"] !== undefined ? data["versionCodes"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Response listing all tracks.
 */
export interface TracksListResponse {
  /**
   * The kind of this response ("androidpublisher#tracksListResponse").
   */
  kind?: string;
  /**
   * All tracks.
   */
  tracks?: Track[];
}

function serializeTracksListResponse(data: any): TracksListResponse {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeTrack(item))) : undefined,
  };
}

function deserializeTracksListResponse(data: any): TracksListResponse {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeTrack(item))) : undefined,
  };
}

/**
 * Representation of a single country where the contents of a track are
 * available.
 */
export interface TrackTargetedCountry {
  /**
   * The country to target, as a two-letter CLDR code.
   */
  countryCode?: string;
}

/**
 * Represents a targeting rule of the form: User currently has {scope} [with
 * billing period {billing_period}].
 */
export interface UpgradeTargetingRule {
  /**
   * The specific billing period duration, specified in ISO 8601 format, that a
   * user must be currently subscribed to to be eligible for this rule. If not
   * specified, users subscribed to any billing period are matched.
   */
  billingPeriodDuration?: string;
  /**
   * Limit this offer to only once per user. If set to true, a user can never
   * be eligible for this offer again if they ever subscribed to this offer.
   */
  oncePerUser?: boolean;
  /**
   * Required. The scope of subscriptions this rule considers. Only allows
   * "this subscription" and "specific subscription in app".
   */
  scope?: TargetingRuleScope;
}

/**
 * A user resource.
 */
export interface User {
  /**
   * Output only. The state of the user's access to the Play Console.
   */
  readonly accessState?:  | "ACCESS_STATE_UNSPECIFIED" | "INVITED" | "INVITATION_EXPIRED" | "ACCESS_GRANTED" | "ACCESS_EXPIRED";
  /**
   * Permissions for the user which apply across the developer account.
   */
  developerAccountPermissions?:  | "DEVELOPER_LEVEL_PERMISSION_UNSPECIFIED" | "CAN_SEE_ALL_APPS" | "CAN_VIEW_FINANCIAL_DATA_GLOBAL" | "CAN_MANAGE_PERMISSIONS_GLOBAL" | "CAN_EDIT_GAMES_GLOBAL" | "CAN_PUBLISH_GAMES_GLOBAL" | "CAN_REPLY_TO_REVIEWS_GLOBAL" | "CAN_MANAGE_PUBLIC_APKS_GLOBAL" | "CAN_MANAGE_TRACK_APKS_GLOBAL" | "CAN_MANAGE_TRACK_USERS_GLOBAL" | "CAN_MANAGE_PUBLIC_LISTING_GLOBAL" | "CAN_MANAGE_DRAFT_APPS_GLOBAL" | "CAN_CREATE_MANAGED_PLAY_APPS_GLOBAL" | "CAN_CHANGE_MANAGED_PLAY_SETTING_GLOBAL" | "CAN_MANAGE_ORDERS_GLOBAL"[];
  /**
   * Immutable. The user's email address.
   */
  email?: string;
  /**
   * The time at which the user's access expires, if set. When setting this
   * value, it must always be in the future.
   */
  expirationTime?: Date;
  /**
   * Output only. Per-app permissions for the user.
   */
  readonly grants?: Grant[];
  /**
   * Required. Resource name for this user, following the pattern
   * "developers/{developer}/users/{email}".
   */
  name?: string;
  /**
   * Output only. Whether there are more permissions for the user that are not
   * represented here. This can happen if the caller does not have permission to
   * manage all apps in the account. This is also `true` if this user is the
   * account owner. If this field is `true`, it should be taken as a signal that
   * this user cannot be fully managed via the API. That is, the API caller is
   * not be able to manage all of the permissions this user holds, either
   * because it doesn't know about them or because the user is the account
   * owner.
   */
  readonly partial?: boolean;
}

function serializeUser(data: any): User {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
  };
}

function deserializeUser(data: any): User {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
  };
}

/**
 * User entry from conversation between user and developer.
 */
export interface UserComment {
  /**
   * Integer Android SDK version of the user's device at the time the review
   * was written, e.g. 23 is Marshmallow. May be absent.
   */
  androidOsVersion?: number;
  /**
   * Integer version code of the app as installed at the time the review was
   * written. May be absent.
   */
  appVersionCode?: number;
  /**
   * String version name of the app as installed at the time the review was
   * written. May be absent.
   */
  appVersionName?: string;
  /**
   * Codename for the reviewer's device, e.g. klte, flounder. May be absent.
   */
  device?: string;
  /**
   * Information about the characteristics of the user's device.
   */
  deviceMetadata?: DeviceMetadata;
  /**
   * The last time at which this comment was updated.
   */
  lastModified?: Timestamp;
  /**
   * Untranslated text of the review, where the review was translated. If the
   * review was not translated this is left blank.
   */
  originalText?: string;
  /**
   * Language code for the reviewer. This is taken from the device settings so
   * is not guaranteed to match the language the review is written in. May be
   * absent.
   */
  reviewerLanguage?: string;
  /**
   * The star rating associated with the review, from 1 to 5.
   */
  starRating?: number;
  /**
   * The content of the comment, i.e. review body. In some cases users have
   * been able to write a review with separate title and body; in those cases
   * the title and body are concatenated and separated by a tab character.
   */
  text?: string;
  /**
   * Number of users who have given this review a thumbs down.
   */
  thumbsDownCount?: number;
  /**
   * Number of users who have given this review a thumbs up.
   */
  thumbsUpCount?: number;
}

function serializeUserComment(data: any): UserComment {
  return {
    ...data,
    lastModified: data["lastModified"] !== undefined ? serializeTimestamp(data["lastModified"]) : undefined,
  };
}

function deserializeUserComment(data: any): UserComment {
  return {
    ...data,
    lastModified: data["lastModified"] !== undefined ? deserializeTimestamp(data["lastModified"]) : undefined,
  };
}

/**
 * A set of user countries. A country set determines what variation of app
 * content gets served to a specific location.
 */
export interface UserCountrySet {
  /**
   * List of country codes representing countries. A Country code is
   * represented in ISO 3166 alpha-2 format. For Example:- "IT" for Italy, "GE"
   * for Georgia.
   */
  countryCodes?: string[];
  /**
   * Country set name.
   */
  name?: string;
}

/**
 * Information specific to cancellations initiated by users.
 */
export interface UserInitiatedCancellation {
  /**
   * Information provided by the user when they complete the subscription
   * cancellation flow (cancellation reason survey).
   */
  cancelSurveyResult?: CancelSurveyResult;
  /**
   * The time at which the subscription was canceled by the user. The user
   * might still have access to the subscription after this time. Use
   * line_items.expiry_time to determine if a user still has access.
   */
  cancelTime?: Date;
}

function serializeUserInitiatedCancellation(data: any): UserInitiatedCancellation {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? data["cancelTime"].toISOString() : undefined,
  };
}

function deserializeUserInitiatedCancellation(data: any): UserInitiatedCancellation {
  return {
    ...data,
    cancelTime: data["cancelTime"] !== undefined ? new Date(data["cancelTime"]) : undefined,
  };
}

/**
 * Additional options for Androidpublisher#usersList.
 */
export interface UsersListOptions {
  /**
   * The maximum number of results to return. This must be set to -1 to disable
   * pagination.
   */
  pageSize?: number;
  /**
   * A token received from a previous call to this method, in order to retrieve
   * further results.
   */
  pageToken?: string;
}

/**
 * Additional options for Androidpublisher#usersPatch.
 */
export interface UsersPatchOptions {
  /**
   * Optional. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUsersPatchOptions(data: any): UsersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUsersPatchOptions(data: any): UsersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A permission used by this APK.
 */
export interface UsesPermission {
  /**
   * Optionally, the maximum SDK version for which the permission is required.
   */
  maxSdkVersion?: number;
  /**
   * The name of the permission requested.
   */
  name?: string;
}

/**
 * APK that is suitable for inclusion in a system image. The resource of
 * SystemApksService.
 */
export interface Variant {
  /**
   * The device spec used to generate the APK.
   */
  deviceSpec?: DeviceSpec;
  /**
   * Output only. The ID of a previously created system APK variant.
   */
  readonly variantId?: number;
}

/**
 * A VoidedPurchase resource indicates a purchase that was either
 * canceled/refunded/charged-back.
 */
export interface VoidedPurchase {
  /**
   * This kind represents a voided purchase object in the androidpublisher
   * service.
   */
  kind?: string;
  /**
   * The order id which uniquely identifies a one-time purchase, subscription
   * purchase, or subscription renewal.
   */
  orderId?: string;
  /**
   * The time at which the purchase was made, in milliseconds since the epoch
   * (Jan 1, 1970).
   */
  purchaseTimeMillis?: bigint;
  /**
   * The token which uniquely identifies a one-time purchase or subscription.
   * To uniquely identify subscription renewals use order_id (available starting
   * from version 3 of the API).
   */
  purchaseToken?: string;
  /**
   * The reason why the purchase was voided, possible values are: 0. Other 1.
   * Remorse 2. Not_received 3. Defective 4. Accidental_purchase 5. Fraud 6.
   * Friendly_fraud 7. Chargeback
   */
  voidedReason?: number;
  /**
   * The initiator of voided purchase, possible values are: 0. User 1.
   * Developer 2. Google
   */
  voidedSource?: number;
  /**
   * The time at which the purchase was canceled/refunded/charged-back, in
   * milliseconds since the epoch (Jan 1, 1970).
   */
  voidedTimeMillis?: bigint;
}

function serializeVoidedPurchase(data: any): VoidedPurchase {
  return {
    ...data,
    purchaseTimeMillis: data["purchaseTimeMillis"] !== undefined ? String(data["purchaseTimeMillis"]) : undefined,
    voidedTimeMillis: data["voidedTimeMillis"] !== undefined ? String(data["voidedTimeMillis"]) : undefined,
  };
}

function deserializeVoidedPurchase(data: any): VoidedPurchase {
  return {
    ...data,
    purchaseTimeMillis: data["purchaseTimeMillis"] !== undefined ? BigInt(data["purchaseTimeMillis"]) : undefined,
    voidedTimeMillis: data["voidedTimeMillis"] !== undefined ? BigInt(data["voidedTimeMillis"]) : undefined,
  };
}

/**
 * Response for the voidedpurchases.list API.
 */
export interface VoidedPurchasesListResponse {
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * Pagination information for token pagination.
   */
  tokenPagination?: TokenPagination;
  voidedPurchases?: VoidedPurchase[];
}

function serializeVoidedPurchasesListResponse(data: any): VoidedPurchasesListResponse {
  return {
    ...data,
    voidedPurchases: data["voidedPurchases"] !== undefined ? data["voidedPurchases"].map((item: any) => (serializeVoidedPurchase(item))) : undefined,
  };
}

function deserializeVoidedPurchasesListResponse(data: any): VoidedPurchasesListResponse {
  return {
    ...data,
    voidedPurchases: data["voidedPurchases"] !== undefined ? data["voidedPurchases"].map((item: any) => (deserializeVoidedPurchase(item))) : undefined,
  };
}