// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Books API Client for Deno
 * =========================
 * 
 * The Google Books API allows clients to access the Google Books repository.
 * 
 * Docs: https://code.google.com/apis/books/docs/v1/getting_started.html
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Books API allows clients to access the Google Books repository.
 */
export class Books {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://books.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieves metadata for a specific bookshelf for the specified user.
   *
   * @param shelf ID of bookshelf to retrieve.
   * @param userId ID of user for whom to retrieve bookshelves.
   */
  async bookshelvesGet(shelf: string, userId: string, opts: BookshelvesGetOptions = {}): Promise<Bookshelf> {
    const url = new URL(`${this.#baseUrl}books/v1/users/${ userId }/bookshelves/${ shelf }`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Bookshelf;
  }

  /**
   * Retrieves a list of public bookshelves for the specified user.
   *
   * @param userId ID of user for whom to retrieve bookshelves.
   */
  async bookshelvesList(userId: string, opts: BookshelvesListOptions = {}): Promise<Bookshelves> {
    const url = new URL(`${this.#baseUrl}books/v1/users/${ userId }/bookshelves`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Bookshelves;
  }

  /**
   * Retrieves volumes in a specific bookshelf for the specified user.
   *
   * @param shelf ID of bookshelf to retrieve volumes.
   * @param userId ID of user for whom to retrieve bookshelf volumes.
   */
  async bookshelvesVolumesList(shelf: string, userId: string, opts: BookshelvesVolumesListOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/users/${ userId }/bookshelves/${ shelf }/volumes`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.showPreorders !== undefined) {
      url.searchParams.append("showPreorders", String(opts.showPreorders));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolumes(data);
  }

  /**
   * Add a user-upload volume and triggers processing.
   *
   */
  async cloudloadingAddBook(opts: CloudloadingAddBookOptions = {}): Promise<BooksCloudloadingResource> {
    const url = new URL(`${this.#baseUrl}books/v1/cloudloading/addBook`);
    if (opts.drive_document_id !== undefined) {
      url.searchParams.append("drive_document_id", String(opts.drive_document_id));
    }
    if (opts.mime_type !== undefined) {
      url.searchParams.append("mime_type", String(opts.mime_type));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.upload_client_token !== undefined) {
      url.searchParams.append("upload_client_token", String(opts.upload_client_token));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as BooksCloudloadingResource;
  }

  /**
   * Remove the book and its contents
   *
   */
  async cloudloadingDeleteBook(opts: CloudloadingDeleteBookOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/cloudloading/deleteBook`);
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Updates a user-upload volume.
   *
   */
  async cloudloadingUpdateBook(req: BooksCloudloadingResource): Promise<BooksCloudloadingResource> {
    const url = new URL(`${this.#baseUrl}books/v1/cloudloading/updateBook`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BooksCloudloadingResource;
  }

  /**
   * Returns a list of offline dictionary metadata available
   *
   */
  async dictionaryListOfflineMetadata(opts: DictionaryListOfflineMetadataOptions = {}): Promise<Metadata> {
    const url = new URL(`${this.#baseUrl}books/v1/dictionary/listOfflineMetadata`);
    if (opts.cpksver !== undefined) {
      url.searchParams.append("cpksver", String(opts.cpksver));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMetadata(data);
  }

  /**
   * Gets information regarding the family that the user is part of.
   *
   */
  async familysharingGetFamilyInfo(opts: FamilysharingGetFamilyInfoOptions = {}): Promise<FamilyInfo> {
    const url = new URL(`${this.#baseUrl}books/v1/familysharing/getFamilyInfo`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FamilyInfo;
  }

  /**
   * Initiates sharing of the content with the user's family. Empty response
   * indicates success.
   *
   */
  async familysharingShare(opts: FamilysharingShareOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/familysharing/share`);
    if (opts.docId !== undefined) {
      url.searchParams.append("docId", String(opts.docId));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Initiates revoking content that has already been shared with the user's
   * family. Empty response indicates success.
   *
   */
  async familysharingUnshare(opts: FamilysharingUnshareOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/familysharing/unshare`);
    if (opts.docId !== undefined) {
      url.searchParams.append("docId", String(opts.docId));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Gets the annotation data.
   *
   * @param annotationDataId The ID of the annotation data to retrieve.
   * @param layerId The ID for the layer to get the annotations.
   * @param volumeId The volume to retrieve annotations for.
   */
  async layersAnnotationDataGet(annotationDataId: string, layerId: string, volumeId: string, opts: LayersAnnotationDataGetOptions = {}): Promise<DictionaryAnnotationdata> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }/layers/${ layerId }/data/${ annotationDataId }`);
    if (opts.allowWebDefinitions !== undefined) {
      url.searchParams.append("allowWebDefinitions", String(opts.allowWebDefinitions));
    }
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.h !== undefined) {
      url.searchParams.append("h", String(opts.h));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.scale !== undefined) {
      url.searchParams.append("scale", String(opts.scale));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.w !== undefined) {
      url.searchParams.append("w", String(opts.w));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDictionaryAnnotationdata(data);
  }

  /**
   * Gets the annotation data for a volume and layer.
   *
   * @param layerId The ID for the layer to get the annotation data.
   * @param volumeId The volume to retrieve annotation data for.
   */
  async layersAnnotationDataList(layerId: string, volumeId: string, opts: LayersAnnotationDataListOptions = {}): Promise<Annotationsdata> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }/layers/${ layerId }/data`);
    if (opts.annotationDataId !== undefined) {
      url.searchParams.append("annotationDataId", String(opts.annotationDataId));
    }
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.h !== undefined) {
      url.searchParams.append("h", String(opts.h));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.scale !== undefined) {
      url.searchParams.append("scale", String(opts.scale));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.updatedMax !== undefined) {
      url.searchParams.append("updatedMax", String(opts.updatedMax));
    }
    if (opts.updatedMin !== undefined) {
      url.searchParams.append("updatedMin", String(opts.updatedMin));
    }
    if (opts.w !== undefined) {
      url.searchParams.append("w", String(opts.w));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAnnotationsdata(data);
  }

  /**
   * Gets the layer summary for a volume.
   *
   * @param summaryId The ID for the layer to get the summary for.
   * @param volumeId The volume to retrieve layers for.
   */
  async layersGet(summaryId: string, volumeId: string, opts: LayersGetOptions = {}): Promise<Layersummary> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }/layersummary/${ summaryId }`);
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Layersummary;
  }

  /**
   * List the layer summaries for a volume.
   *
   * @param volumeId The volume to retrieve layers for.
   */
  async layersList(volumeId: string, opts: LayersListOptions = {}): Promise<Layersummaries> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }/layersummary`);
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Layersummaries;
  }

  /**
   * Gets the volume annotation.
   *
   * @param annotationId The ID of the volume annotation to retrieve.
   * @param layerId The ID for the layer to get the annotations.
   * @param volumeId The volume to retrieve annotations for.
   */
  async layersVolumeAnnotationsGet(annotationId: string, layerId: string, volumeId: string, opts: LayersVolumeAnnotationsGetOptions = {}): Promise<Volumeannotation> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }/layers/${ layerId }/annotations/${ annotationId }`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Volumeannotation;
  }

  /**
   * Gets the volume annotations for a volume and layer.
   *
   * @param layerId The ID for the layer to get the annotations.
   * @param volumeId The volume to retrieve annotations for.
   */
  async layersVolumeAnnotationsList(layerId: string, volumeId: string, opts: LayersVolumeAnnotationsListOptions = {}): Promise<Volumeannotations> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }/layers/${ layerId }`);
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.endOffset !== undefined) {
      url.searchParams.append("endOffset", String(opts.endOffset));
    }
    if (opts.endPosition !== undefined) {
      url.searchParams.append("endPosition", String(opts.endPosition));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.startOffset !== undefined) {
      url.searchParams.append("startOffset", String(opts.startOffset));
    }
    if (opts.startPosition !== undefined) {
      url.searchParams.append("startPosition", String(opts.startPosition));
    }
    if (opts.updatedMax !== undefined) {
      url.searchParams.append("updatedMax", String(opts.updatedMax));
    }
    if (opts.updatedMin !== undefined) {
      url.searchParams.append("updatedMin", String(opts.updatedMin));
    }
    if (opts.volumeAnnotationsVersion !== undefined) {
      url.searchParams.append("volumeAnnotationsVersion", String(opts.volumeAnnotationsVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Volumeannotations;
  }

  /**
   * Gets the current settings for the user.
   *
   */
  async myconfigGetUserSettings(opts: MyconfigGetUserSettingsOptions = {}): Promise<Usersettings> {
    const url = new URL(`${this.#baseUrl}books/v1/myconfig/getUserSettings`);
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Usersettings;
  }

  /**
   * Release downloaded content access restriction.
   *
   */
  async myconfigReleaseDownloadAccess(opts: MyconfigReleaseDownloadAccessOptions = {}): Promise<DownloadAccesses> {
    const url = new URL(`${this.#baseUrl}books/v1/myconfig/releaseDownloadAccess`);
    if (opts.cpksver !== undefined) {
      url.searchParams.append("cpksver", String(opts.cpksver));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeIds !== undefined) {
      url.searchParams.append("volumeIds", String(opts.volumeIds));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as DownloadAccesses;
  }

  /**
   * Request concurrent and download access restrictions.
   *
   */
  async myconfigRequestAccess(opts: MyconfigRequestAccessOptions = {}): Promise<RequestAccessData> {
    const url = new URL(`${this.#baseUrl}books/v1/myconfig/requestAccess`);
    if (opts.cpksver !== undefined) {
      url.searchParams.append("cpksver", String(opts.cpksver));
    }
    if (opts.licenseTypes !== undefined) {
      url.searchParams.append("licenseTypes", String(opts.licenseTypes));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.nonce !== undefined) {
      url.searchParams.append("nonce", String(opts.nonce));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as RequestAccessData;
  }

  /**
   * Request downloaded content access for specified volumes on the My eBooks
   * shelf.
   *
   */
  async myconfigSyncVolumeLicenses(opts: MyconfigSyncVolumeLicensesOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/myconfig/syncVolumeLicenses`);
    if (opts.cpksver !== undefined) {
      url.searchParams.append("cpksver", String(opts.cpksver));
    }
    if (opts.features !== undefined) {
      url.searchParams.append("features", String(opts.features));
    }
    if (opts.includeNonComicsSeries !== undefined) {
      url.searchParams.append("includeNonComicsSeries", String(opts.includeNonComicsSeries));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.nonce !== undefined) {
      url.searchParams.append("nonce", String(opts.nonce));
    }
    if (opts.showPreorders !== undefined) {
      url.searchParams.append("showPreorders", String(opts.showPreorders));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeIds !== undefined) {
      url.searchParams.append("volumeIds", String(opts.volumeIds));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeVolumes(data);
  }

  /**
   * Sets the settings for the user. If a sub-object is specified, it will
   * overwrite the existing sub-object stored in the server. Unspecified
   * sub-objects will retain the existing value.
   *
   */
  async myconfigUpdateUserSettings(req: Usersettings): Promise<Usersettings> {
    const url = new URL(`${this.#baseUrl}books/v1/myconfig/updateUserSettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Usersettings;
  }

  /**
   * Deletes an annotation.
   *
   * @param annotationId The ID for the annotation to delete.
   */
  async mylibraryAnnotationsDelete(annotationId: string, opts: MylibraryAnnotationsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/annotations/${ annotationId }`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Inserts a new annotation.
   *
   */
  async mylibraryAnnotationsInsert(req: Annotation, opts: MylibraryAnnotationsInsertOptions = {}): Promise<Annotation> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/annotations`);
    if (opts.annotationId !== undefined) {
      url.searchParams.append("annotationId", String(opts.annotationId));
    }
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    if (opts.showOnlySummaryInResponse !== undefined) {
      url.searchParams.append("showOnlySummaryInResponse", String(opts.showOnlySummaryInResponse));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Annotation;
  }

  /**
   * Retrieves a list of annotations, possibly filtered.
   *
   */
  async mylibraryAnnotationsList(opts: MylibraryAnnotationsListOptions = {}): Promise<Annotations> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/annotations`);
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.layerId !== undefined) {
      url.searchParams.append("layerId", String(opts.layerId));
    }
    if (opts.layerIds !== undefined) {
      url.searchParams.append("layerIds", String(opts.layerIds));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.updatedMax !== undefined) {
      url.searchParams.append("updatedMax", String(opts.updatedMax));
    }
    if (opts.updatedMin !== undefined) {
      url.searchParams.append("updatedMin", String(opts.updatedMin));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Annotations;
  }

  /**
   * Gets the summary of specified layers.
   *
   */
  async mylibraryAnnotationsSummary(opts: MylibraryAnnotationsSummaryOptions = {}): Promise<AnnotationsSummary> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/annotations/summary`);
    if (opts.layerIds !== undefined) {
      url.searchParams.append("layerIds", String(opts.layerIds));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as AnnotationsSummary;
  }

  /**
   * Updates an existing annotation.
   *
   * @param annotationId The ID for the annotation to update.
   */
  async mylibraryAnnotationsUpdate(annotationId: string, req: Annotation, opts: MylibraryAnnotationsUpdateOptions = {}): Promise<Annotation> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/annotations/${ annotationId }`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Annotation;
  }

  /**
   * Adds a volume to a bookshelf.
   *
   * @param shelf ID of bookshelf to which to add a volume.
   */
  async mylibraryBookshelvesAddVolume(shelf: string, opts: MylibraryBookshelvesAddVolumeOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/bookshelves/${ shelf }/addVolume`);
    if (opts.reason !== undefined) {
      url.searchParams.append("reason", String(opts.reason));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Clears all volumes from a bookshelf.
   *
   * @param shelf ID of bookshelf from which to remove a volume.
   */
  async mylibraryBookshelvesClearVolumes(shelf: string, opts: MylibraryBookshelvesClearVolumesOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/bookshelves/${ shelf }/clearVolumes`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Retrieves metadata for a specific bookshelf belonging to the authenticated
   * user.
   *
   * @param shelf ID of bookshelf to retrieve.
   */
  async mylibraryBookshelvesGet(shelf: string, opts: MylibraryBookshelvesGetOptions = {}): Promise<Bookshelf> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/bookshelves/${ shelf }`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Bookshelf;
  }

  /**
   * Retrieves a list of bookshelves belonging to the authenticated user.
   *
   */
  async mylibraryBookshelvesList(opts: MylibraryBookshelvesListOptions = {}): Promise<Bookshelves> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/bookshelves`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Bookshelves;
  }

  /**
   * Moves a volume within a bookshelf.
   *
   * @param shelf ID of bookshelf with the volume.
   */
  async mylibraryBookshelvesMoveVolume(shelf: string, opts: MylibraryBookshelvesMoveVolumeOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/bookshelves/${ shelf }/moveVolume`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    if (opts.volumePosition !== undefined) {
      url.searchParams.append("volumePosition", String(opts.volumePosition));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Removes a volume from a bookshelf.
   *
   * @param shelf ID of bookshelf from which to remove a volume.
   */
  async mylibraryBookshelvesRemoveVolume(shelf: string, opts: MylibraryBookshelvesRemoveVolumeOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/bookshelves/${ shelf }/removeVolume`);
    if (opts.reason !== undefined) {
      url.searchParams.append("reason", String(opts.reason));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Gets volume information for volumes on a bookshelf.
   *
   * @param shelf The bookshelf ID or name retrieve volumes for.
   */
  async mylibraryBookshelvesVolumesList(shelf: string, opts: MylibraryBookshelvesVolumesListOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/bookshelves/${ shelf }/volumes`);
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.showPreorders !== undefined) {
      url.searchParams.append("showPreorders", String(opts.showPreorders));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolumes(data);
  }

  /**
   * Retrieves my reading position information for a volume.
   *
   * @param volumeId ID of volume for which to retrieve a reading position.
   */
  async mylibraryReadingpositionsGet(volumeId: string, opts: MylibraryReadingpositionsGetOptions = {}): Promise<ReadingPosition> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/readingpositions/${ volumeId }`);
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ReadingPosition;
  }

  /**
   * Sets my reading position information for a volume.
   *
   * @param volumeId ID of volume for which to update the reading position.
   */
  async mylibraryReadingpositionsSetPosition(volumeId: string, opts: MylibraryReadingpositionsSetPositionOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/mylibrary/readingpositions/${ volumeId }/setPosition`);
    if (opts.action !== undefined) {
      url.searchParams.append("action", String(opts.action));
    }
    if (opts.contentVersion !== undefined) {
      url.searchParams.append("contentVersion", String(opts.contentVersion));
    }
    if (opts.deviceCookie !== undefined) {
      url.searchParams.append("deviceCookie", String(opts.deviceCookie));
    }
    if (opts.position !== undefined) {
      url.searchParams.append("position", String(opts.position));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.timestamp !== undefined) {
      url.searchParams.append("timestamp", String(opts.timestamp));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Returns notification details for a given notification id.
   *
   */
  async notificationGet(opts: NotificationGetOptions = {}): Promise<Notification> {
    const url = new URL(`${this.#baseUrl}books/v1/notification/get`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.notification_id !== undefined) {
      url.searchParams.append("notification_id", String(opts.notification_id));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNotification(data);
  }

  /**
   * List categories for onboarding experience.
   *
   */
  async onboardingListCategories(opts: OnboardingListCategoriesOptions = {}): Promise<Category> {
    const url = new URL(`${this.#baseUrl}books/v1/onboarding/listCategories`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Category;
  }

  /**
   * List available volumes under categories for onboarding experience.
   *
   */
  async onboardingListCategoryVolumes(opts: OnboardingListCategoryVolumesOptions = {}): Promise<Volume2> {
    const url = new URL(`${this.#baseUrl}books/v1/onboarding/listCategoryVolumes`);
    if (opts.categoryId !== undefined) {
      url.searchParams.append("categoryId", String(opts.categoryId));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxAllowedMaturityRating !== undefined) {
      url.searchParams.append("maxAllowedMaturityRating", String(opts.maxAllowedMaturityRating));
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
    return deserializeVolume2(data);
  }

  /**
   * Returns a stream of personalized book clusters
   *
   */
  async personalizedstreamGet(opts: PersonalizedstreamGetOptions = {}): Promise<Discoveryclusters> {
    const url = new URL(`${this.#baseUrl}books/v1/personalizedstream/get`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxAllowedMaturityRating !== undefined) {
      url.searchParams.append("maxAllowedMaturityRating", String(opts.maxAllowedMaturityRating));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDiscoveryclusters(data);
  }

  /**
   * Accepts the promo offer.
   *
   */
  async promoofferAccept(opts: PromoofferAcceptOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/promooffer/accept`);
    if (opts.androidId !== undefined) {
      url.searchParams.append("androidId", String(opts.androidId));
    }
    if (opts.device !== undefined) {
      url.searchParams.append("device", String(opts.device));
    }
    if (opts.manufacturer !== undefined) {
      url.searchParams.append("manufacturer", String(opts.manufacturer));
    }
    if (opts.model !== undefined) {
      url.searchParams.append("model", String(opts.model));
    }
    if (opts.offerId !== undefined) {
      url.searchParams.append("offerId", String(opts.offerId));
    }
    if (opts.product !== undefined) {
      url.searchParams.append("product", String(opts.product));
    }
    if (opts.serial !== undefined) {
      url.searchParams.append("serial", String(opts.serial));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Marks the promo offer as dismissed.
   *
   */
  async promoofferDismiss(opts: PromoofferDismissOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}books/v1/promooffer/dismiss`);
    if (opts.androidId !== undefined) {
      url.searchParams.append("androidId", String(opts.androidId));
    }
    if (opts.device !== undefined) {
      url.searchParams.append("device", String(opts.device));
    }
    if (opts.manufacturer !== undefined) {
      url.searchParams.append("manufacturer", String(opts.manufacturer));
    }
    if (opts.model !== undefined) {
      url.searchParams.append("model", String(opts.model));
    }
    if (opts.offerId !== undefined) {
      url.searchParams.append("offerId", String(opts.offerId));
    }
    if (opts.product !== undefined) {
      url.searchParams.append("product", String(opts.product));
    }
    if (opts.serial !== undefined) {
      url.searchParams.append("serial", String(opts.serial));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Returns a list of promo offers available to the user
   *
   */
  async promoofferGet(opts: PromoofferGetOptions = {}): Promise<Offers> {
    const url = new URL(`${this.#baseUrl}books/v1/promooffer/get`);
    if (opts.androidId !== undefined) {
      url.searchParams.append("androidId", String(opts.androidId));
    }
    if (opts.device !== undefined) {
      url.searchParams.append("device", String(opts.device));
    }
    if (opts.manufacturer !== undefined) {
      url.searchParams.append("manufacturer", String(opts.manufacturer));
    }
    if (opts.model !== undefined) {
      url.searchParams.append("model", String(opts.model));
    }
    if (opts.product !== undefined) {
      url.searchParams.append("product", String(opts.product));
    }
    if (opts.serial !== undefined) {
      url.searchParams.append("serial", String(opts.serial));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Offers;
  }

  /**
   * Returns Series metadata for the given series ids.
   *
   */
  async seriesGet(opts: SeriesGetOptions = {}): Promise<Series> {
    const url = new URL(`${this.#baseUrl}books/v1/series/get`);
    if (opts.series_id !== undefined) {
      url.searchParams.append("series_id", String(opts.series_id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Series;
  }

  /**
   * Returns Series membership data given the series id.
   *
   */
  async seriesMembershipGet(opts: SeriesMembershipGetOptions = {}): Promise<Seriesmembership> {
    const url = new URL(`${this.#baseUrl}books/v1/series/membership/get`);
    if (opts.page_size !== undefined) {
      url.searchParams.append("page_size", String(opts.page_size));
    }
    if (opts.page_token !== undefined) {
      url.searchParams.append("page_token", String(opts.page_token));
    }
    if (opts.series_id !== undefined) {
      url.searchParams.append("series_id", String(opts.series_id));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSeriesmembership(data);
  }

  /**
   * Return a list of associated books.
   *
   * @param volumeId ID of the source volume.
   */
  async volumesAssociatedList(volumeId: string, opts: VolumesAssociatedListOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }/associated`);
    if (opts.association !== undefined) {
      url.searchParams.append("association", String(opts.association));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxAllowedMaturityRating !== undefined) {
      url.searchParams.append("maxAllowedMaturityRating", String(opts.maxAllowedMaturityRating));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolumes(data);
  }

  /**
   * Gets volume information for a single volume.
   *
   * @param volumeId ID of volume to retrieve.
   */
  async volumesGet(volumeId: string, opts: VolumesGetOptions = {}): Promise<Volume> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/${ volumeId }`);
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    if (opts.includeNonComicsSeries !== undefined) {
      url.searchParams.append("includeNonComicsSeries", String(opts.includeNonComicsSeries));
    }
    if (opts.partner !== undefined) {
      url.searchParams.append("partner", String(opts.partner));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.user_library_consistent_read !== undefined) {
      url.searchParams.append("user_library_consistent_read", String(opts.user_library_consistent_read));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolume(data);
  }

  /**
   * Performs a book search.
   *
   */
  async volumesList(opts: VolumesListOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes`);
    if (opts.download !== undefined) {
      url.searchParams.append("download", String(opts.download));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.langRestrict !== undefined) {
      url.searchParams.append("langRestrict", String(opts.langRestrict));
    }
    if (opts.libraryRestrict !== undefined) {
      url.searchParams.append("libraryRestrict", String(opts.libraryRestrict));
    }
    if (opts.maxAllowedMaturityRating !== undefined) {
      url.searchParams.append("maxAllowedMaturityRating", String(opts.maxAllowedMaturityRating));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.partner !== undefined) {
      url.searchParams.append("partner", String(opts.partner));
    }
    if (opts.printType !== undefined) {
      url.searchParams.append("printType", String(opts.printType));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    if (opts.showPreorders !== undefined) {
      url.searchParams.append("showPreorders", String(opts.showPreorders));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolumes(data);
  }

  /**
   * Return a list of books in My Library.
   *
   */
  async volumesMybooksList(opts: VolumesMybooksListOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/mybooks`);
    if (opts.acquireMethod !== undefined) {
      url.searchParams.append("acquireMethod", String(opts.acquireMethod));
    }
    if (opts.country !== undefined) {
      url.searchParams.append("country", String(opts.country));
    }
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.processingState !== undefined) {
      url.searchParams.append("processingState", String(opts.processingState));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolumes(data);
  }

  /**
   * Return a list of recommended books for the current user.
   *
   */
  async volumesRecommendedList(opts: VolumesRecommendedListOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/recommended`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxAllowedMaturityRating !== undefined) {
      url.searchParams.append("maxAllowedMaturityRating", String(opts.maxAllowedMaturityRating));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolumes(data);
  }

  /**
   * Rate a recommended book for the current user.
   *
   */
  async volumesRecommendedRate(opts: VolumesRecommendedRateOptions = {}): Promise<BooksVolumesRecommendedRateResponse> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/recommended/rate`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.rating !== undefined) {
      url.searchParams.append("rating", String(opts.rating));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as BooksVolumesRecommendedRateResponse;
  }

  /**
   * Return a list of books uploaded by the current user.
   *
   */
  async volumesUseruploadedList(opts: VolumesUseruploadedListOptions = {}): Promise<Volumes> {
    const url = new URL(`${this.#baseUrl}books/v1/volumes/useruploaded`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.processingState !== undefined) {
      url.searchParams.append("processingState", String(opts.processingState));
    }
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    if (opts.startIndex !== undefined) {
      url.searchParams.append("startIndex", String(opts.startIndex));
    }
    if (opts.volumeId !== undefined) {
      url.searchParams.append("volumeId", String(opts.volumeId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolumes(data);
  }
}

export interface Annotation {
  /**
   * Anchor text after excerpt. For requests, if the user bookmarked a screen
   * that has no flowing text on it, then this field should be empty.
   */
  afterSelectedText?: string;
  /**
   * Anchor text before excerpt. For requests, if the user bookmarked a screen
   * that has no flowing text on it, then this field should be empty.
   */
  beforeSelectedText?: string;
  /**
   * Selection ranges sent from the client.
   */
  clientVersionRanges?: {
    cfiRange?: BooksAnnotationsRange;
    contentVersion?: string;
    gbImageRange?: BooksAnnotationsRange;
    gbTextRange?: BooksAnnotationsRange;
    imageCfiRange?: BooksAnnotationsRange;
  };
  /**
   * Timestamp for the created time of this annotation.
   */
  created?: string;
  /**
   * Selection ranges for the most recent content version.
   */
  currentVersionRanges?: {
    cfiRange?: BooksAnnotationsRange;
    contentVersion?: string;
    gbImageRange?: BooksAnnotationsRange;
    gbTextRange?: BooksAnnotationsRange;
    imageCfiRange?: BooksAnnotationsRange;
  };
  /**
   * User-created data for this annotation.
   */
  data?: string;
  /**
   * Indicates that this annotation is deleted.
   */
  deleted?: boolean;
  /**
   * The highlight style for this annotation.
   */
  highlightStyle?: string;
  /**
   * Id of this annotation, in the form of a GUID.
   */
  id?: string;
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * The layer this annotation is for.
   */
  layerId?: string;
  layerSummary?: {
    allowedCharacterCount?: number;
    limitType?: string;
    remainingCharacterCount?: number;
  };
  /**
   * Pages that this annotation spans.
   */
  pageIds?: string[];
  /**
   * Excerpt from the volume.
   */
  selectedText?: string;
  /**
   * URL to this resource.
   */
  selfLink?: string;
  /**
   * Timestamp for the last time this annotation was modified.
   */
  updated?: string;
  /**
   * The volume that this annotation belongs to.
   */
  volumeId?: string;
}

export interface Annotations {
  /**
   * A list of annotations.
   */
  items?: Annotation[];
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * Token to pass in for pagination for the next page. This will not be
   * present if this request does not have more results.
   */
  nextPageToken?: string;
  /**
   * Total number of annotations found. This may be greater than the number of
   * notes returned in this response if results have been paginated.
   */
  totalItems?: number;
}

export interface Annotationsdata {
  /**
   * A list of Annotation Data.
   */
  items?: GeoAnnotationdata[];
  /**
   * Resource type
   */
  kind?: string;
  /**
   * Token to pass in for pagination for the next page. This will not be
   * present if this request does not have more results.
   */
  nextPageToken?: string;
  /**
   * The total number of volume annotations found.
   */
  totalItems?: number;
}

function serializeAnnotationsdata(data: any): Annotationsdata {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeGeoAnnotationdata(item))) : undefined,
  };
}

function deserializeAnnotationsdata(data: any): Annotationsdata {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeGeoAnnotationdata(item))) : undefined,
  };
}

export interface AnnotationsSummary {
  kind?: string;
  layers?: {
    allowedCharacterCount?: number;
    layerId?: string;
    limitType?: string;
    remainingCharacterCount?: number;
    updated?: string;
  }[];
}

export interface BooksAnnotationsRange {
  /**
   * The offset from the ending position.
   */
  endOffset?: string;
  /**
   * The ending position for the range.
   */
  endPosition?: string;
  /**
   * The offset from the starting position.
   */
  startOffset?: string;
  /**
   * The starting position for the range.
   */
  startPosition?: string;
}

export interface BooksCloudloadingResource {
  author?: string;
  processingState?: string;
  title?: string;
  volumeId?: string;
}

export interface Bookshelf {
  /**
   * Whether this bookshelf is PUBLIC or PRIVATE.
   */
  access?: string;
  /**
   * Created time for this bookshelf (formatted UTC timestamp with millisecond
   * resolution).
   */
  created?: string;
  /**
   * Description of this bookshelf.
   */
  description?: string;
  /**
   * Id of this bookshelf, only unique by user.
   */
  id?: number;
  /**
   * Resource type for bookshelf metadata.
   */
  kind?: string;
  /**
   * URL to this resource.
   */
  selfLink?: string;
  /**
   * Title of this bookshelf.
   */
  title?: string;
  /**
   * Last modified time of this bookshelf (formatted UTC timestamp with
   * millisecond resolution).
   */
  updated?: string;
  /**
   * Number of volumes in this bookshelf.
   */
  volumeCount?: number;
  /**
   * Last time a volume was added or removed from this bookshelf (formatted UTC
   * timestamp with millisecond resolution).
   */
  volumesLastUpdated?: string;
}

export interface Bookshelves {
  /**
   * A list of bookshelves.
   */
  items?: Bookshelf[];
  /**
   * Resource type.
   */
  kind?: string;
}

/**
 * Additional options for Books#bookshelvesGet.
 */
export interface BookshelvesGetOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#bookshelvesList.
 */
export interface BookshelvesListOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#bookshelvesVolumesList.
 */
export interface BookshelvesVolumesListOptions {
  /**
   * Maximum number of results to return
   */
  maxResults?: number;
  /**
   * Set to true to show pre-ordered books. Defaults to false.
   */
  showPreorders?: boolean;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * Index of the first element to return (starts at 0)
   */
  startIndex?: number;
}

export interface BooksVolumesRecommendedRateResponse {
  consistency_token?: string;
}

export interface Category {
  /**
   * A list of onboarding categories.
   */
  items?: {
    badgeUrl?: string;
    categoryId?: string;
    name?: string;
  }[];
  /**
   * Resource type.
   */
  kind?: string;
}

/**
 * Additional options for Books#cloudloadingAddBook.
 */
export interface CloudloadingAddBookOptions {
  /**
   * A drive document id. The upload_client_token must not be set.
   */
  drive_document_id?: string;
  /**
   * The document MIME type. It can be set only if the drive_document_id is
   * set.
   */
  mime_type?: string;
  /**
   * The document name. It can be set only if the drive_document_id is set.
   */
  name?: string;
  /**
   * Scotty upload token.
   */
  upload_client_token?: string;
}

/**
 * Additional options for Books#cloudloadingDeleteBook.
 */
export interface CloudloadingDeleteBookOptions {
  /**
   * The id of the book to be removed.
   */
  volumeId: string;
}

export interface ConcurrentAccessRestriction {
  /**
   * Whether access is granted for this (user, device, volume).
   */
  deviceAllowed?: boolean;
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * The maximum number of concurrent access licenses for this volume.
   */
  maxConcurrentDevices?: number;
  /**
   * Error/warning message.
   */
  message?: string;
  /**
   * Client nonce for verification. Download access and client-validation only.
   */
  nonce?: string;
  /**
   * Error/warning reason code.
   */
  reasonCode?: string;
  /**
   * Whether this volume has any concurrent access restrictions.
   */
  restricted?: boolean;
  /**
   * Response signature.
   */
  signature?: string;
  /**
   * Client app identifier for verification. Download access and
   * client-validation only.
   */
  source?: string;
  /**
   * Time in seconds for license auto-expiration.
   */
  timeWindowSeconds?: number;
  /**
   * Identifies the volume for which this entry applies.
   */
  volumeId?: string;
}

export interface DictionaryAnnotationdata {
  /**
   * The type of annotation this data is for.
   */
  annotationType?: string;
  /**
   * JSON encoded data for this dictionary annotation data. Emitted with name
   * 'data' in JSON output. Either this or geo_data will be populated.
   */
  data?: Dictlayerdata;
  /**
   * Base64 encoded data for this annotation data.
   */
  encodedData?: Uint8Array;
  /**
   * Unique id for this annotation data.
   */
  id?: string;
  /**
   * Resource Type
   */
  kind?: string;
  /**
   * The Layer id for this data. *
   */
  layerId?: string;
  /**
   * URL for this resource. *
   */
  selfLink?: string;
  /**
   * Timestamp for the last time this data was updated. (RFC 3339 UTC date-time
   * format).
   */
  updated?: string;
  /**
   * The volume id for this data. *
   */
  volumeId?: string;
}

function serializeDictionaryAnnotationdata(data: any): DictionaryAnnotationdata {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? encodeBase64(data["encodedData"]) : undefined,
  };
}

function deserializeDictionaryAnnotationdata(data: any): DictionaryAnnotationdata {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? decodeBase64(data["encodedData"] as string) : undefined,
  };
}

/**
 * Additional options for Books#dictionaryListOfflineMetadata.
 */
export interface DictionaryListOfflineMetadataOptions {
  /**
   * The device/version ID from which to request the data.
   */
  cpksver: string;
}

export interface Dictlayerdata {
  common?: {
    title?: string;
  };
  dict?: {
    source?: {
      attribution?: string;
      url?: string;
    };
    words?: {
      derivatives?: {
        source?: {
          attribution?: string;
          url?: string;
        };
        text?: string;
      }[];
      examples?: {
        source?: {
          attribution?: string;
          url?: string;
        };
        text?: string;
      }[];
      senses?: {
        conjugations?: {
          type?: string;
          value?: string;
        }[];
        definitions?: {
          definition?: string;
          examples?: {
            source?: {
              attribution?: string;
              url?: string;
            };
            text?: string;
          }[];
        }[];
        partOfSpeech?: string;
        pronunciation?: string;
        pronunciationUrl?: string;
        source?: {
          attribution?: string;
          url?: string;
        };
        syllabification?: string;
        synonyms?: {
          source?: {
            attribution?: string;
            url?: string;
          };
          text?: string;
        }[];
      }[];
      source?: {
        attribution?: string;
        url?: string;
      };
    }[];
  };
  kind?: string;
}

export interface Discoveryclusters {
  clusters?: {
    banner_with_content_container?: {
      fillColorArgb?: string;
      imageUrl?: string;
      maskColorArgb?: string;
      moreButtonText?: string;
      moreButtonUrl?: string;
      textColorArgb?: string;
    };
    subTitle?: string;
    title?: string;
    totalVolumes?: number;
    uid?: string;
    volumes?: Volume[];
  }[];
  /**
   * Resorce type.
   */
  kind?: string;
  totalClusters?: number;
}

function serializeDiscoveryclusters(data: any): Discoveryclusters {
  return {
    ...data,
    clusters: data["clusters"] !== undefined ? data["clusters"].map((item: any) => ({
      ...item,
      volumes: item["volumes"] !== undefined ? item["volumes"].map((item: any) => (serializeVolume(item))) : undefined,
    })) : undefined,
  };
}

function deserializeDiscoveryclusters(data: any): Discoveryclusters {
  return {
    ...data,
    clusters: data["clusters"] !== undefined ? data["clusters"].map((item: any) => ({
      ...item,
      volumes: item["volumes"] !== undefined ? item["volumes"].map((item: any) => (deserializeVolume(item))) : undefined,
    })) : undefined,
  };
}

export interface DownloadAccesses {
  /**
   * A list of download access responses.
   */
  downloadAccessList?: DownloadAccessRestriction[];
  /**
   * Resource type.
   */
  kind?: string;
}

export interface DownloadAccessRestriction {
  /**
   * If restricted, whether access is granted for this (user, device, volume).
   */
  deviceAllowed?: boolean;
  /**
   * If restricted, the number of content download licenses already acquired
   * (including the requesting client, if licensed).
   */
  downloadsAcquired?: number;
  /**
   * If deviceAllowed, whether access was just acquired with this request.
   */
  justAcquired?: boolean;
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * If restricted, the maximum number of content download licenses for this
   * volume.
   */
  maxDownloadDevices?: number;
  /**
   * Error/warning message.
   */
  message?: string;
  /**
   * Client nonce for verification. Download access and client-validation only.
   */
  nonce?: string;
  /**
   * Error/warning reason code. Additional codes may be added in the future. 0
   * OK 100 ACCESS_DENIED_PUBLISHER_LIMIT 101 ACCESS_DENIED_LIMIT 200
   * WARNING_USED_LAST_ACCESS
   */
  reasonCode?: string;
  /**
   * Whether this volume has any download access restrictions.
   */
  restricted?: boolean;
  /**
   * Response signature.
   */
  signature?: string;
  /**
   * Client app identifier for verification. Download access and
   * client-validation only.
   */
  source?: string;
  /**
   * Identifies the volume for which this entry applies.
   */
  volumeId?: string;
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

export interface FamilyInfo {
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * Family membership info of the user that made the request.
   */
  membership?: {
    acquirePermission?: string;
    ageGroup?: string;
    allowedMaturityRating?: string;
    isInFamily?: boolean;
    role?: string;
  };
}

/**
 * Additional options for Books#familysharingGetFamilyInfo.
 */
export interface FamilysharingGetFamilyInfoOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#familysharingShare.
 */
export interface FamilysharingShareOptions {
  /**
   * The docid to share.
   */
  docId?: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * The volume to share.
   */
  volumeId?: string;
}

/**
 * Additional options for Books#familysharingUnshare.
 */
export interface FamilysharingUnshareOptions {
  /**
   * The docid to unshare.
   */
  docId?: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * The volume to unshare.
   */
  volumeId?: string;
}

export interface GeoAnnotationdata {
  /**
   * The type of annotation this data is for.
   */
  annotationType?: string;
  /**
   * JSON encoded data for this geo annotation data. Emitted with name 'data'
   * in JSON output. Either this or dict_data will be populated.
   */
  data?: Geolayerdata;
  /**
   * Base64 encoded data for this annotation data.
   */
  encodedData?: Uint8Array;
  /**
   * Unique id for this annotation data.
   */
  id?: string;
  /**
   * Resource Type
   */
  kind?: string;
  /**
   * The Layer id for this data. *
   */
  layerId?: string;
  /**
   * URL for this resource. *
   */
  selfLink?: string;
  /**
   * Timestamp for the last time this data was updated. (RFC 3339 UTC date-time
   * format).
   */
  updated?: string;
  /**
   * The volume id for this data. *
   */
  volumeId?: string;
}

function serializeGeoAnnotationdata(data: any): GeoAnnotationdata {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? encodeBase64(data["encodedData"]) : undefined,
  };
}

function deserializeGeoAnnotationdata(data: any): GeoAnnotationdata {
  return {
    ...data,
    encodedData: data["encodedData"] !== undefined ? decodeBase64(data["encodedData"] as string) : undefined,
  };
}

export interface Geolayerdata {
  common?: {
    lang?: string;
    previewImageUrl?: string;
    snippet?: string;
    snippetUrl?: string;
    title?: string;
  };
  geo?: {
    boundary?: string[];
    cachePolicy?: string;
    countryCode?: string;
    latitude?: number;
    longitude?: number;
    mapType?: string;
    viewport?: {
      hi?: {
        latitude?: number;
        longitude?: number;
      };
      lo?: {
        latitude?: number;
        longitude?: number;
      };
    };
    zoom?: number;
  };
  kind?: string;
}

/**
 * Additional options for Books#layersAnnotationDataGet.
 */
export interface LayersAnnotationDataGetOptions {
  /**
   * For the dictionary layer. Whether or not to allow web definitions.
   */
  allowWebDefinitions?: boolean;
  /**
   * The content version for the volume you are trying to retrieve.
   */
  contentVersion: string;
  /**
   * The requested pixel height for any images. If height is provided width
   * must also be provided.
   */
  h?: number;
  /**
   * The locale information for the data. ISO-639-1 language and ISO-3166-1
   * country code. Ex: 'en_US'.
   */
  locale?: string;
  /**
   * The requested scale for the image.
   */
  scale?: number;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * The requested pixel width for any images. If width is provided height must
   * also be provided.
   */
  w?: number;
}

/**
 * Additional options for Books#layersAnnotationDataList.
 */
export interface LayersAnnotationDataListOptions {
  /**
   * The list of Annotation Data Ids to retrieve. Pagination is ignored if this
   * is set.
   */
  annotationDataId?: string;
  /**
   * The content version for the requested volume.
   */
  contentVersion: string;
  /**
   * The requested pixel height for any images. If height is provided width
   * must also be provided.
   */
  h?: number;
  /**
   * The locale information for the data. ISO-639-1 language and ISO-3166-1
   * country code. Ex: 'en_US'.
   */
  locale?: string;
  /**
   * Maximum number of results to return
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous page.
   */
  pageToken?: string;
  /**
   * The requested scale for the image.
   */
  scale?: number;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * RFC 3339 timestamp to restrict to items updated prior to this timestamp
   * (exclusive).
   */
  updatedMax?: string;
  /**
   * RFC 3339 timestamp to restrict to items updated since this timestamp
   * (inclusive).
   */
  updatedMin?: string;
  /**
   * The requested pixel width for any images. If width is provided height must
   * also be provided.
   */
  w?: number;
}

/**
 * Additional options for Books#layersGet.
 */
export interface LayersGetOptions {
  /**
   * The content version for the requested volume.
   */
  contentVersion?: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#layersList.
 */
export interface LayersListOptions {
  /**
   * The content version for the requested volume.
   */
  contentVersion?: string;
  /**
   * Maximum number of results to return
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous page.
   */
  pageToken?: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

export interface Layersummaries {
  /**
   * A list of layer summary items.
   */
  items?: Layersummary[];
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * The total number of layer summaries found.
   */
  totalItems?: number;
}

export interface Layersummary {
  /**
   * The number of annotations for this layer.
   */
  annotationCount?: number;
  /**
   * Link to get data for this annotation.
   */
  annotationsDataLink?: string;
  /**
   * The link to get the annotations for this layer.
   */
  annotationsLink?: string;
  /**
   * The list of annotation types contained for this layer.
   */
  annotationTypes?: string[];
  /**
   * The content version this resource is for.
   */
  contentVersion?: string;
  /**
   * The number of data items for this layer.
   */
  dataCount?: number;
  /**
   * Unique id of this layer summary.
   */
  id?: string;
  /**
   * Resource Type
   */
  kind?: string;
  /**
   * The layer id for this summary.
   */
  layerId?: string;
  /**
   * URL to this resource.
   */
  selfLink?: string;
  /**
   * Timestamp for the last time an item in this layer was updated. (RFC 3339
   * UTC date-time format).
   */
  updated?: string;
  /**
   * The current version of this layer's volume annotations. Note that this
   * version applies only to the data in the books.layers.volumeAnnotations.*
   * responses. The actual annotation data is versioned separately.
   */
  volumeAnnotationsVersion?: string;
  /**
   * The volume id this resource is for.
   */
  volumeId?: string;
}

/**
 * Additional options for Books#layersVolumeAnnotationsGet.
 */
export interface LayersVolumeAnnotationsGetOptions {
  /**
   * The locale information for the data. ISO-639-1 language and ISO-3166-1
   * country code. Ex: 'en_US'.
   */
  locale?: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#layersVolumeAnnotationsList.
 */
export interface LayersVolumeAnnotationsListOptions {
  /**
   * The content version for the requested volume.
   */
  contentVersion: string;
  /**
   * The end offset to end retrieving data from.
   */
  endOffset?: string;
  /**
   * The end position to end retrieving data from.
   */
  endPosition?: string;
  /**
   * The locale information for the data. ISO-639-1 language and ISO-3166-1
   * country code. Ex: 'en_US'.
   */
  locale?: string;
  /**
   * Maximum number of results to return
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous page.
   */
  pageToken?: string;
  /**
   * Set to true to return deleted annotations. updatedMin must be in the
   * request to use this. Defaults to false.
   */
  showDeleted?: boolean;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * The start offset to start retrieving data from.
   */
  startOffset?: string;
  /**
   * The start position to start retrieving data from.
   */
  startPosition?: string;
  /**
   * RFC 3339 timestamp to restrict to items updated prior to this timestamp
   * (exclusive).
   */
  updatedMax?: string;
  /**
   * RFC 3339 timestamp to restrict to items updated since this timestamp
   * (inclusive).
   */
  updatedMin?: string;
  /**
   * The version of the volume annotations that you are requesting.
   */
  volumeAnnotationsVersion?: string;
}

export interface Metadata {
  /**
   * A list of offline dictionary metadata.
   */
  items?: {
    download_url?: string;
    encrypted_key?: string;
    language?: string;
    size?: bigint;
    version?: bigint;
  }[];
  /**
   * Resource type.
   */
  kind?: string;
}

function serializeMetadata(data: any): Metadata {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => ({
      ...item,
      size: item["size"] !== undefined ? String(item["size"]) : undefined,
      version: item["version"] !== undefined ? String(item["version"]) : undefined,
    })) : undefined,
  };
}

function deserializeMetadata(data: any): Metadata {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => ({
      ...item,
      size: item["size"] !== undefined ? BigInt(item["size"]) : undefined,
      version: item["version"] !== undefined ? BigInt(item["version"]) : undefined,
    })) : undefined,
  };
}

/**
 * Additional options for Books#myconfigGetUserSettings.
 */
export interface MyconfigGetUserSettingsOptions {
  /**
   * Unused. Added only to workaround TEX mandatory request template
   * requirement
   */
  country?: string;
}

/**
 * Additional options for Books#myconfigReleaseDownloadAccess.
 */
export interface MyconfigReleaseDownloadAccessOptions {
  /**
   * The device/version ID from which to release the restriction.
   */
  cpksver: string;
  /**
   * ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.
   */
  locale?: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * The volume(s) to release restrictions for.
   */
  volumeIds: string;
}

/**
 * Additional options for Books#myconfigRequestAccess.
 */
export interface MyconfigRequestAccessOptions {
  /**
   * The device/version ID from which to request the restrictions.
   */
  cpksver: string;
  /**
   * The type of access license to request. If not specified, the default is
   * BOTH.
   */
  licenseTypes?:  | "LICENSE_TYPES_UNDEFINED" | "BOTH" | "CONCURRENT" | "DOWNLOAD";
  /**
   * ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.
   */
  locale?: string;
  /**
   * The client nonce value.
   */
  nonce: string;
  /**
   * String to identify the originator of this request.
   */
  source: string;
  /**
   * The volume to request concurrent/download restrictions for.
   */
  volumeId: string;
}

/**
 * Additional options for Books#myconfigSyncVolumeLicenses.
 */
export interface MyconfigSyncVolumeLicensesOptions {
  /**
   * The device/version ID from which to release the restriction.
   */
  cpksver: string;
  /**
   * List of features supported by the client, i.e., 'RENTALS'
   */
  features?:  | "FEATURES_UNDEFINED" | "RENTALS";
  /**
   * Set to true to include non-comics series. Defaults to false.
   */
  includeNonComicsSeries?: boolean;
  /**
   * ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.
   */
  locale?: string;
  /**
   * The client nonce value.
   */
  nonce: string;
  /**
   * Set to true to show pre-ordered books. Defaults to false.
   */
  showPreorders?: boolean;
  /**
   * String to identify the originator of this request.
   */
  source: string;
  /**
   * The volume(s) to request download restrictions for.
   */
  volumeIds?: string;
}

/**
 * Additional options for Books#mylibraryAnnotationsDelete.
 */
export interface MylibraryAnnotationsDeleteOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#mylibraryAnnotationsInsert.
 */
export interface MylibraryAnnotationsInsertOptions {
  /**
   * The ID for the annotation to insert.
   */
  annotationId?: string;
  /**
   * ISO-3166-1 code to override the IP-based location.
   */
  country?: string;
  /**
   * Requests that only the summary of the specified layer be provided in the
   * response.
   */
  showOnlySummaryInResponse?: boolean;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#mylibraryAnnotationsList.
 */
export interface MylibraryAnnotationsListOptions {
  /**
   * The content version for the requested volume.
   */
  contentVersion?: string;
  /**
   * The layer ID to limit annotation by.
   */
  layerId?: string;
  /**
   * The layer ID(s) to limit annotation by.
   */
  layerIds?: string;
  /**
   * Maximum number of results to return
   */
  maxResults?: number;
  /**
   * The value of the nextToken from the previous page.
   */
  pageToken?: string;
  /**
   * Set to true to return deleted annotations. updatedMin must be in the
   * request to use this. Defaults to false.
   */
  showDeleted?: boolean;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * RFC 3339 timestamp to restrict to items updated prior to this timestamp
   * (exclusive).
   */
  updatedMax?: string;
  /**
   * RFC 3339 timestamp to restrict to items updated since this timestamp
   * (inclusive).
   */
  updatedMin?: string;
  /**
   * The volume to restrict annotations to.
   */
  volumeId?: string;
}

/**
 * Additional options for Books#mylibraryAnnotationsSummary.
 */
export interface MylibraryAnnotationsSummaryOptions {
  /**
   * Array of layer IDs to get the summary for.
   */
  layerIds: string;
  /**
   * Volume id to get the summary for.
   */
  volumeId: string;
}

/**
 * Additional options for Books#mylibraryAnnotationsUpdate.
 */
export interface MylibraryAnnotationsUpdateOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#mylibraryBookshelvesAddVolume.
 */
export interface MylibraryBookshelvesAddVolumeOptions {
  /**
   * The reason for which the book is added to the library.
   */
  reason?:  | "REASON_UNDEFINED" | "IOS_PREX" | "IOS_SEARCH" | "ONBOARDING";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * ID of volume to add.
   */
  volumeId: string;
}

/**
 * Additional options for Books#mylibraryBookshelvesClearVolumes.
 */
export interface MylibraryBookshelvesClearVolumesOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#mylibraryBookshelvesGet.
 */
export interface MylibraryBookshelvesGetOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#mylibraryBookshelvesList.
 */
export interface MylibraryBookshelvesListOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#mylibraryBookshelvesMoveVolume.
 */
export interface MylibraryBookshelvesMoveVolumeOptions {
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * ID of volume to move.
   */
  volumeId: string;
  /**
   * Position on shelf to move the item (0 puts the item before the current
   * first item, 1 puts it between the first and the second and so on.)
   */
  volumePosition: number;
}

/**
 * Additional options for Books#mylibraryBookshelvesRemoveVolume.
 */
export interface MylibraryBookshelvesRemoveVolumeOptions {
  /**
   * The reason for which the book is removed from the library.
   */
  reason?:  | "REASON_UNDEFINED" | "ONBOARDING";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * ID of volume to remove.
   */
  volumeId: string;
}

/**
 * Additional options for Books#mylibraryBookshelvesVolumesList.
 */
export interface MylibraryBookshelvesVolumesListOptions {
  /**
   * ISO-3166-1 code to override the IP-based location.
   */
  country?: string;
  /**
   * Maximum number of results to return
   */
  maxResults?: number;
  /**
   * Restrict information returned to a set of selected fields.
   */
  projection?:  | "PROJECTION_UNDEFINED" | "FULL" | "LITE";
  /**
   * Full-text search query string in this bookshelf.
   */
  q?: string;
  /**
   * Set to true to show pre-ordered books. Defaults to false.
   */
  showPreorders?: boolean;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * Index of the first element to return (starts at 0)
   */
  startIndex?: number;
}

/**
 * Additional options for Books#mylibraryReadingpositionsGet.
 */
export interface MylibraryReadingpositionsGetOptions {
  /**
   * Volume content version for which this reading position is requested.
   */
  contentVersion?: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#mylibraryReadingpositionsSetPosition.
 */
export interface MylibraryReadingpositionsSetPositionOptions {
  /**
   * Action that caused this reading position to be set.
   */
  action?:  | "ACTION_UNDEFINED" | "bookmark" | "chapter" | "next-page" | "prev-page" | "scroll" | "search";
  /**
   * Volume content version for which this reading position applies.
   */
  contentVersion?: string;
  /**
   * Random persistent device cookie optional on set position.
   */
  deviceCookie?: string;
  /**
   * Position string for the new volume reading position.
   */
  position: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * RFC 3339 UTC format timestamp associated with this reading position.
   */
  timestamp: string;
}

export interface Notification {
  body?: string;
  /**
   * The list of crm experiment ids.
   */
  crmExperimentIds?: bigint[];
  doc_id?: string;
  doc_type?: string;
  dont_show_notification?: boolean;
  iconUrl?: string;
  is_document_mature?: boolean;
  /**
   * Resource type.
   */
  kind?: string;
  notification_type?: string;
  notificationGroup?: string;
  pcampaign_id?: string;
  reason?: string;
  show_notification_settings_action?: boolean;
  targetUrl?: string;
  timeToExpireMs?: bigint;
  title?: string;
}

function serializeNotification(data: any): Notification {
  return {
    ...data,
    crmExperimentIds: data["crmExperimentIds"] !== undefined ? data["crmExperimentIds"].map((item: any) => (String(item))) : undefined,
    timeToExpireMs: data["timeToExpireMs"] !== undefined ? String(data["timeToExpireMs"]) : undefined,
  };
}

function deserializeNotification(data: any): Notification {
  return {
    ...data,
    crmExperimentIds: data["crmExperimentIds"] !== undefined ? data["crmExperimentIds"].map((item: any) => (BigInt(item))) : undefined,
    timeToExpireMs: data["timeToExpireMs"] !== undefined ? BigInt(data["timeToExpireMs"]) : undefined,
  };
}

/**
 * Additional options for Books#notificationGet.
 */
export interface NotificationGetOptions {
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for
   * generating notification title and body.
   */
  locale?: string;
  /**
   * String to identify the notification.
   */
  notification_id: string;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

export interface Offers {
  /**
   * A list of offers.
   */
  items?: {
    artUrl?: string;
    gservicesKey?: string;
    id?: string;
    items?: {
      author?: string;
      canonicalVolumeLink?: string;
      coverUrl?: string;
      description?: string;
      title?: string;
      volumeId?: string;
    }[];
  }[];
  /**
   * Resource type.
   */
  kind?: string;
}

/**
 * Additional options for Books#onboardingListCategories.
 */
export interface OnboardingListCategoriesOptions {
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset.
   */
  locale?: string;
}

/**
 * Additional options for Books#onboardingListCategoryVolumes.
 */
export interface OnboardingListCategoryVolumesOptions {
  /**
   * List of category ids requested.
   */
  categoryId?: string;
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset.
   */
  locale?: string;
  /**
   * The maximum allowed maturity rating of returned volumes. Books with a
   * higher maturity rating are filtered out.
   */
  maxAllowedMaturityRating?:  | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /**
   * Number of maximum results per page to be included in the response.
   */
  pageSize?: number;
  /**
   * The value of the nextToken from the previous page.
   */
  pageToken?: string;
}

/**
 * Additional options for Books#personalizedstreamGet.
 */
export interface PersonalizedstreamGetOptions {
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for
   * generating recommendations.
   */
  locale?: string;
  /**
   * The maximum allowed maturity rating of returned recommendations. Books
   * with a higher maturity rating are filtered out.
   */
  maxAllowedMaturityRating?:  | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#promoofferAccept.
 */
export interface PromoofferAcceptOptions {
  /**
   * device android_id
   */
  androidId?: string;
  /**
   * device device
   */
  device?: string;
  /**
   * device manufacturer
   */
  manufacturer?: string;
  /**
   * device model
   */
  model?: string;
  offerId?: string;
  /**
   * device product
   */
  product?: string;
  /**
   * device serial
   */
  serial?: string;
  /**
   * Volume id to exercise the offer
   */
  volumeId?: string;
}

/**
 * Additional options for Books#promoofferDismiss.
 */
export interface PromoofferDismissOptions {
  /**
   * device android_id
   */
  androidId?: string;
  /**
   * device device
   */
  device?: string;
  /**
   * device manufacturer
   */
  manufacturer?: string;
  /**
   * device model
   */
  model?: string;
  /**
   * Offer to dimiss
   */
  offerId?: string;
  /**
   * device product
   */
  product?: string;
  /**
   * device serial
   */
  serial?: string;
}

/**
 * Additional options for Books#promoofferGet.
 */
export interface PromoofferGetOptions {
  /**
   * device android_id
   */
  androidId?: string;
  /**
   * device device
   */
  device?: string;
  /**
   * device manufacturer
   */
  manufacturer?: string;
  /**
   * device model
   */
  model?: string;
  /**
   * device product
   */
  product?: string;
  /**
   * device serial
   */
  serial?: string;
}

export interface ReadingPosition {
  /**
   * Position in an EPUB as a CFI.
   */
  epubCfiPosition?: string;
  /**
   * Position in a volume for image-based content.
   */
  gbImagePosition?: string;
  /**
   * Position in a volume for text-based content.
   */
  gbTextPosition?: string;
  /**
   * Resource type for a reading position.
   */
  kind?: string;
  /**
   * Position in a PDF file.
   */
  pdfPosition?: string;
  /**
   * Timestamp when this reading position was last updated (formatted UTC
   * timestamp with millisecond resolution).
   */
  updated?: string;
  /**
   * Volume id associated with this reading position.
   */
  volumeId?: string;
}

export interface RequestAccessData {
  /**
   * A concurrent access response.
   */
  concurrentAccess?: ConcurrentAccessRestriction;
  /**
   * A download access response.
   */
  downloadAccess?: DownloadAccessRestriction;
  /**
   * Resource type.
   */
  kind?: string;
}

export interface Review {
  /**
   * Author of this review.
   */
  author?: {
    displayName?: string;
  };
  /**
   * Review text.
   */
  content?: string;
  /**
   * Date of this review.
   */
  date?: string;
  /**
   * URL for the full review text, for reviews gathered from the web.
   */
  fullTextUrl?: string;
  /**
   * Resource type for a review.
   */
  kind?: string;
  /**
   * Star rating for this review. Possible values are ONE, TWO, THREE, FOUR,
   * FIVE or NOT_RATED.
   */
  rating?: string;
  /**
   * Information regarding the source of this review, when the review is not
   * from a Google Books user.
   */
  source?: {
    description?: string;
    extraDescription?: string;
    url?: string;
  };
  /**
   * Title for this review.
   */
  title?: string;
  /**
   * Source type for this review. Possible values are EDITORIAL, WEB_USER or
   * GOOGLE_USER.
   */
  type?: string;
  /**
   * Volume that this review is for.
   */
  volumeId?: string;
}

export interface Series {
  /**
   * Resource type.
   */
  kind?: string;
  series?: {
    bannerImageUrl?: string;
    eligibleForSubscription?: boolean;
    imageUrl?: string;
    isComplete?: boolean;
    seriesFormatType?: string;
    seriesId?: string;
    seriesSubscriptionReleaseInfo?: {
      cancelTime?: string;
      currentReleaseInfo?: {
        amountInMicros?: number;
        currencyCode?: string;
        releaseNumber?: string;
        releaseTime?: string;
      };
      nextReleaseInfo?: {
        amountInMicros?: number;
        currencyCode?: string;
        releaseNumber?: string;
        releaseTime?: string;
      };
      seriesSubscriptionType?: string;
    };
    seriesType?: string;
    subscriptionId?: string;
    title?: string;
  }[];
}

/**
 * Additional options for Books#seriesGet.
 */
export interface SeriesGetOptions {
  /**
   * String that identifies the series
   */
  series_id: string;
}

export interface Seriesmembership {
  /**
   * Resorce type.
   */
  kind?: string;
  member?: Volume[];
  nextPageToken?: string;
}

function serializeSeriesmembership(data: any): Seriesmembership {
  return {
    ...data,
    member: data["member"] !== undefined ? data["member"].map((item: any) => (serializeVolume(item))) : undefined,
  };
}

function deserializeSeriesmembership(data: any): Seriesmembership {
  return {
    ...data,
    member: data["member"] !== undefined ? data["member"].map((item: any) => (deserializeVolume(item))) : undefined,
  };
}

/**
 * Additional options for Books#seriesMembershipGet.
 */
export interface SeriesMembershipGetOptions {
  /**
   * Number of maximum results per page to be included in the response.
   */
  page_size?: number;
  /**
   * The value of the nextToken from the previous page.
   */
  page_token?: string;
  /**
   * String that identifies the series
   */
  series_id: string;
}

export interface Usersettings {
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * User settings in sub-objects, each for different purposes.
   */
  notesExport?: {
    folderName?: string;
    isEnabled?: boolean;
  };
  notification?: {
    matchMyInterests?: {
      opted_state?: string;
    };
    moreFromAuthors?: {
      opted_state?: string;
    };
    moreFromSeries?: {
      opted_state?: string;
    };
    priceDrop?: {
      opted_state?: string;
    };
    rewardExpirations?: {
      opted_state?: string;
    };
  };
}

export interface Volume {
  /**
   * Any information about a volume related to reading or obtaining that volume
   * text. This information can depend on country (books may be public domain in
   * one country but not in another, e.g.).
   */
  accessInfo?: {
    accessViewStatus?: string;
    country?: string;
    downloadAccess?: DownloadAccessRestriction;
    driveImportedContentLink?: string;
    embeddable?: boolean;
    epub?: {
      acsTokenLink?: string;
      downloadLink?: string;
      isAvailable?: boolean;
    };
    explicitOfflineLicenseManagement?: boolean;
    pdf?: {
      acsTokenLink?: string;
      downloadLink?: string;
      isAvailable?: boolean;
    };
    publicDomain?: boolean;
    quoteSharingAllowed?: boolean;
    textToSpeechPermission?: string;
    viewability?: string;
    viewOrderUrl?: string;
    webReaderLink?: string;
  };
  /**
   * Opaque identifier for a specific version of a volume resource. (In LITE
   * projection)
   */
  etag?: string;
  /**
   * Unique identifier for a volume. (In LITE projection.)
   */
  id?: string;
  /**
   * Resource type for a volume. (In LITE projection.)
   */
  kind?: string;
  /**
   * What layers exist in this volume and high level information about them.
   */
  layerInfo?: {
    layers?: {
      layerId?: string;
      volumeAnnotationsVersion?: string;
    }[];
  };
  /**
   * Recommendation related information for this volume.
   */
  recommendedInfo?: {
    explanation?: string;
  };
  /**
   * Any information about a volume related to the eBookstore and/or
   * purchaseability. This information can depend on the country where the
   * request originates from (i.e. books may not be for sale in certain
   * countries).
   */
  saleInfo?: {
    buyLink?: string;
    country?: string;
    isEbook?: boolean;
    listPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    offers?: {
      finskyOfferType?: number;
      giftable?: boolean;
      listPrice?: {
        amountInMicros?: number;
        currencyCode?: string;
      };
      rentalDuration?: {
        count?: number;
        unit?: string;
      };
      retailPrice?: {
        amountInMicros?: number;
        currencyCode?: string;
      };
    }[];
    onSaleDate?: string;
    retailPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    saleability?: string;
  };
  /**
   * Search result information related to this volume.
   */
  searchInfo?: {
    textSnippet?: string;
  };
  /**
   * URL to this resource. (In LITE projection.)
   */
  selfLink?: string;
  /**
   * User specific information related to this volume. (e.g. page this user
   * last read or whether they purchased this book)
   */
  userInfo?: {
    acquiredTime?: string;
    acquisitionType?: number;
    copy?: {
      allowedCharacterCount?: number;
      limitType?: string;
      remainingCharacterCount?: number;
      updated?: string;
    };
    entitlementType?: number;
    familySharing?: {
      familyRole?: string;
      isSharingAllowed?: boolean;
      isSharingDisabledByFop?: boolean;
    };
    isFamilySharedFromUser?: boolean;
    isFamilySharedToUser?: boolean;
    isFamilySharingAllowed?: boolean;
    isFamilySharingDisabledByFop?: boolean;
    isInMyBooks?: boolean;
    isPreordered?: boolean;
    isPurchased?: boolean;
    isUploaded?: boolean;
    readingPosition?: ReadingPosition;
    rentalPeriod?: {
      endUtcSec?: bigint;
      startUtcSec?: bigint;
    };
    rentalState?: string;
    review?: Review;
    updated?: string;
    userUploadedVolumeInfo?: {
      processingState?: string;
    };
  };
  /**
   * General volume information.
   */
  volumeInfo?: {
    allowAnonLogging?: boolean;
    authors?: string[];
    averageRating?: number;
    canonicalVolumeLink?: string;
    categories?: string[];
    comicsContent?: boolean;
    contentVersion?: string;
    description?: string;
    dimensions?: {
      height?: string;
      thickness?: string;
      width?: string;
    };
    imageLinks?: {
      extraLarge?: string;
      large?: string;
      medium?: string;
      small?: string;
      smallThumbnail?: string;
      thumbnail?: string;
    };
    industryIdentifiers?: {
      identifier?: string;
      type?: string;
    }[];
    infoLink?: string;
    language?: string;
    mainCategory?: string;
    maturityRating?: string;
    pageCount?: number;
    panelizationSummary?: {
      containsEpubBubbles?: boolean;
      containsImageBubbles?: boolean;
      epubBubbleVersion?: string;
      imageBubbleVersion?: string;
    };
    previewLink?: string;
    printedPageCount?: number;
    printType?: string;
    publishedDate?: string;
    publisher?: string;
    ratingsCount?: number;
    readingModes?: {
      image?: boolean;
      text?: boolean;
    };
    samplePageCount?: number;
    seriesInfo?: Volumeseriesinfo;
    subtitle?: string;
    title?: string;
  };
}

function serializeVolume(data: any): Volume {
  return {
    ...data,
    userInfo: data["userInfo"] !== undefined ? {
      ...data["userInfo"],
      rentalPeriod: data["userInfo"]["rentalPeriod"] !== undefined ? {
        ...data["userInfo"]["rentalPeriod"],
        endUtcSec: data["userInfo"]["rentalPeriod"]["endUtcSec"] !== undefined ? String(data["userInfo"]["rentalPeriod"]["endUtcSec"]) : undefined,
        startUtcSec: data["userInfo"]["rentalPeriod"]["startUtcSec"] !== undefined ? String(data["userInfo"]["rentalPeriod"]["startUtcSec"]) : undefined,
      } : undefined,
    } : undefined,
  };
}

function deserializeVolume(data: any): Volume {
  return {
    ...data,
    userInfo: data["userInfo"] !== undefined ? {
      ...data["userInfo"],
      rentalPeriod: data["userInfo"]["rentalPeriod"] !== undefined ? {
        ...data["userInfo"]["rentalPeriod"],
        endUtcSec: data["userInfo"]["rentalPeriod"]["endUtcSec"] !== undefined ? BigInt(data["userInfo"]["rentalPeriod"]["endUtcSec"]) : undefined,
        startUtcSec: data["userInfo"]["rentalPeriod"]["startUtcSec"] !== undefined ? BigInt(data["userInfo"]["rentalPeriod"]["startUtcSec"]) : undefined,
      } : undefined,
    } : undefined,
  };
}

export interface Volume2 {
  /**
   * A list of volumes.
   */
  items?: Volume[];
  /**
   * Resource type.
   */
  kind?: string;
  nextPageToken?: string;
}

function serializeVolume2(data: any): Volume2 {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeVolume(item))) : undefined,
  };
}

function deserializeVolume2(data: any): Volume2 {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeVolume(item))) : undefined,
  };
}

export interface Volumeannotation {
  /**
   * The annotation data id for this volume annotation.
   */
  annotationDataId?: string;
  /**
   * Link to get data for this annotation.
   */
  annotationDataLink?: string;
  /**
   * The type of annotation this is.
   */
  annotationType?: string;
  /**
   * The content ranges to identify the selected text.
   */
  contentRanges?: {
    cfiRange?: BooksAnnotationsRange;
    contentVersion?: string;
    gbImageRange?: BooksAnnotationsRange;
    gbTextRange?: BooksAnnotationsRange;
  };
  /**
   * Data for this annotation.
   */
  data?: string;
  /**
   * Indicates that this annotation is deleted.
   */
  deleted?: boolean;
  /**
   * Unique id of this volume annotation.
   */
  id?: string;
  /**
   * Resource Type
   */
  kind?: string;
  /**
   * The Layer this annotation is for.
   */
  layerId?: string;
  /**
   * Pages the annotation spans.
   */
  pageIds?: string[];
  /**
   * Excerpt from the volume.
   */
  selectedText?: string;
  /**
   * URL to this resource.
   */
  selfLink?: string;
  /**
   * Timestamp for the last time this anntoation was updated. (RFC 3339 UTC
   * date-time format).
   */
  updated?: string;
  /**
   * The Volume this annotation is for.
   */
  volumeId?: string;
}

export interface Volumeannotations {
  /**
   * A list of volume annotations.
   */
  items?: Volumeannotation[];
  /**
   * Resource type
   */
  kind?: string;
  /**
   * Token to pass in for pagination for the next page. This will not be
   * present if this request does not have more results.
   */
  nextPageToken?: string;
  /**
   * The total number of volume annotations found.
   */
  totalItems?: number;
  /**
   * The version string for all of the volume annotations in this layer (not
   * just the ones in this response). Note: the version string doesn't apply to
   * the annotation data, just the information in this response (e.g. the
   * location of annotations in the book).
   */
  version?: string;
}

export interface Volumes {
  /**
   * A list of volumes.
   */
  items?: Volume[];
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * Total number of volumes found. This might be greater than the number of
   * volumes returned in this response if results have been paginated.
   */
  totalItems?: number;
}

function serializeVolumes(data: any): Volumes {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeVolume(item))) : undefined,
  };
}

function deserializeVolumes(data: any): Volumes {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeVolume(item))) : undefined,
  };
}

/**
 * Additional options for Books#volumesAssociatedList.
 */
export interface VolumesAssociatedListOptions {
  /**
   * Association type.
   */
  association?:  | "ASSOCIATION_UNDEFINED" | "end-of-sample" | "end-of-volume" | "related-for-play";
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for
   * generating recommendations.
   */
  locale?: string;
  /**
   * The maximum allowed maturity rating of returned recommendations. Books
   * with a higher maturity rating are filtered out.
   */
  maxAllowedMaturityRating?:  | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

export interface Volumeseriesinfo {
  /**
   * The display number string. This should be used only for display purposes
   * and the actual sequence should be inferred from the below orderNumber.
   */
  bookDisplayNumber?: string;
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * Short book title in the context of the series.
   */
  shortSeriesBookTitle?: string;
  volumeSeries?: {
    issue?: {
      issueDisplayNumber?: string;
      issueOrderNumber?: number;
    }[];
    orderNumber?: number;
    seriesBookType?: string;
    seriesId?: string;
  }[];
}

/**
 * Additional options for Books#volumesGet.
 */
export interface VolumesGetOptions {
  /**
   * ISO-3166-1 code to override the IP-based location.
   */
  country?: string;
  /**
   * Set to true to include non-comics series. Defaults to false.
   */
  includeNonComicsSeries?: boolean;
  /**
   * Brand results for partner ID.
   */
  partner?: string;
  /**
   * Restrict information returned to a set of selected fields.
   */
  projection?:  | "PROJECTION_UNDEFINED" | "FULL" | "LITE";
  /**
   * string to identify the originator of this request.
   */
  source?: string;
  user_library_consistent_read?: boolean;
}

/**
 * Additional options for Books#volumesList.
 */
export interface VolumesListOptions {
  /**
   * Restrict to volumes by download availability.
   */
  download?:  | "DOWNLOAD_UNDEFINED" | "EPUB";
  /**
   * Filter search results.
   */
  filter?:  | "FILTER_UNDEFINED" | "ebooks" | "free-ebooks" | "full" | "paid-ebooks" | "partial";
  /**
   * Restrict results to books with this language code.
   */
  langRestrict?: string;
  /**
   * Restrict search to this user's library.
   */
  libraryRestrict?:  | "LIBRARY_RESTRICT_UNDEFINED" | "my-library" | "no-restrict";
  /**
   * The maximum allowed maturity rating of returned recommendations. Books
   * with a higher maturity rating are filtered out.
   */
  maxAllowedMaturityRating?:  | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * Sort search results.
   */
  orderBy?:  | "ORDER_BY_UNDEFINED" | "newest" | "relevance";
  /**
   * Restrict and brand results for partner ID.
   */
  partner?: string;
  /**
   * Restrict to books or magazines.
   */
  printType?:  | "PRINT_TYPE_UNDEFINED" | "ALL" | "BOOKS" | "MAGAZINES";
  /**
   * Restrict information returned to a set of selected fields.
   */
  projection?:  | "PROJECTION_UNDEFINED" | "FULL" | "LITE";
  /**
   * Full-text search query string.
   */
  q: string;
  /**
   * Set to true to show books available for preorder. Defaults to false.
   */
  showPreorders?: boolean;
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * Index of the first result to return (starts at 0)
   */
  startIndex?: number;
}

/**
 * Additional options for Books#volumesMybooksList.
 */
export interface VolumesMybooksListOptions {
  /**
   * How the book was acquired
   */
  acquireMethod?:  | "ACQUIRE_METHOD_UNDEFINED" | "FAMILY_SHARED" | "PREORDERED" | "PREVIOUSLY_RENTED" | "PUBLIC_DOMAIN" | "PURCHASED" | "RENTED" | "SAMPLE" | "UPLOADED";
  /**
   * ISO-3166-1 code to override the IP-based location.
   */
  country?: string;
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for
   * generating recommendations.
   */
  locale?: string;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * The processing state of the user uploaded volumes to be returned.
   * Applicable only if the UPLOADED is specified in the acquireMethod.
   */
  processingState?:  | "PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * Index of the first result to return (starts at 0)
   */
  startIndex?: number;
}

/**
 * Additional options for Books#volumesRecommendedList.
 */
export interface VolumesRecommendedListOptions {
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for
   * generating recommendations.
   */
  locale?: string;
  /**
   * The maximum allowed maturity rating of returned recommendations. Books
   * with a higher maturity rating are filtered out.
   */
  maxAllowedMaturityRating?:  | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
}

/**
 * Additional options for Books#volumesRecommendedRate.
 */
export interface VolumesRecommendedRateOptions {
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for
   * generating recommendations.
   */
  locale?: string;
  /**
   * Rating to be given to the volume.
   */
  rating:  | "RATING_UNDEFINED" | "HAVE_IT" | "NOT_INTERESTED";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * ID of the source volume.
   */
  volumeId: string;
}

/**
 * Additional options for Books#volumesUseruploadedList.
 */
export interface VolumesUseruploadedListOptions {
  /**
   * ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for
   * generating recommendations.
   */
  locale?: string;
  /**
   * Maximum number of results to return.
   */
  maxResults?: number;
  /**
   * The processing state of the user uploaded volumes to be returned.
   */
  processingState?:  | "PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING";
  /**
   * String to identify the originator of this request.
   */
  source?: string;
  /**
   * Index of the first result to return (starts at 0)
   */
  startIndex?: number;
  /**
   * The ids of the volumes to be returned. If not specified all that match the
   * processingState are returned.
   */
  volumeId?: string;
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
