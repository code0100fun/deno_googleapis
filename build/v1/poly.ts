// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Poly API Client for Deno
 * ========================
 * 
 * The Poly API provides read access to assets hosted on poly.google.com to all, and upload access to poly.google.com for whitelisted accounts. 
 * 
 * Docs: https://developers.google.com/poly/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Poly API provides read access to assets hosted on poly.google.com to
 * all, and upload access to poly.google.com for whitelisted accounts.
 */
export class Poly {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://poly.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns detailed information about an asset given its name. PRIVATE assets
   * are returned only if the currently authenticated user (via OAuth token) is
   * the author of the asset.
   *
   * @param name Required. An asset's name in the form `assets/{ASSET_ID}`.
   */
  async assetsGet(name: string): Promise<Asset> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAsset(data);
  }

  /**
   * Lists all public, remixable assets. These are assets with an access level
   * of PUBLIC and published under the CC-By license.
   *
   */
  async assetsList(opts: AssetsListOptions = {}): Promise<ListAssetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/assets`);
    if (opts.category !== undefined) {
      url.searchParams.append("category", String(opts.category));
    }
    if (opts.curated !== undefined) {
      url.searchParams.append("curated", String(opts.curated));
    }
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
    }
    if (opts.keywords !== undefined) {
      url.searchParams.append("keywords", String(opts.keywords));
    }
    if (opts.maxComplexity !== undefined) {
      url.searchParams.append("maxComplexity", String(opts.maxComplexity));
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
    return deserializeListAssetsResponse(data);
  }

  /**
   * Lists assets authored by the given user. Only the value 'me', representing
   * the currently-authenticated user, is supported. May include assets with an
   * access level of PRIVATE or UNLISTED and assets which are All Rights
   * Reserved for the currently-authenticated user.
   *
   * @param name A valid user id. Currently, only the special value 'me', representing the currently-authenticated user is supported. To use 'me', you must pass an OAuth token with the request.
   */
  async usersAssetsList(name: string, opts: UsersAssetsListOptions = {}): Promise<ListUserAssetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/assets`);
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
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
    if (opts.visibility !== undefined) {
      url.searchParams.append("visibility", String(opts.visibility));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListUserAssetsResponse(data);
  }

  /**
   * Lists assets that the user has liked. Only the value 'me', representing
   * the currently-authenticated user, is supported. May include assets with an
   * access level of UNLISTED.
   *
   * @param name A valid user id. Currently, only the special value 'me', representing the currently-authenticated user is supported. To use 'me', you must pass an OAuth token with the request.
   */
  async usersLikedassetsList(name: string, opts: UsersLikedassetsListOptions = {}): Promise<ListLikedAssetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/likedassets`);
    if (opts.format !== undefined) {
      url.searchParams.append("format", String(opts.format));
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
    return deserializeListLikedAssetsResponse(data);
  }
}

/**
 * Represents and describes an asset in the Poly library. An asset is a 3D
 * model or scene created using [Tilt Brush](//www.tiltbrush.com),
 * [Blocks](//vr.google.com/blocks/), or any 3D program that produces a file
 * that can be upload to Poly.
 */
export interface Asset {
  /**
   * The author's publicly visible name. Use this name when giving credit to
   * the author. For more information, see
   * [Licensing](/poly/discover/licensing).
   */
  authorName?: string;
  /**
   * For published assets, the time when the asset was published. For
   * unpublished assets, the time when the asset was created.
   */
  createTime?: Date;
  /**
   * The human-readable description, set by the asset's author.
   */
  description?: string;
  /**
   * The human-readable name, set by the asset's author.
   */
  displayName?: string;
  /**
   * A list of Formats where each format describes one representation of the
   * asset.
   */
  formats?: Format[];
  /**
   * Whether this asset has been curated by the Poly team.
   */
  isCurated?: boolean;
  /**
   * The license under which the author has made the asset available for use,
   * if any.
   */
  license?:  | "UNKNOWN" | "CREATIVE_COMMONS_BY" | "ALL_RIGHTS_RESERVED";
  /**
   * Application-defined opaque metadata for this asset. This field is only
   * returned when querying for the signed-in user's own assets, not for public
   * assets. This string is limited to 1K chars. It is up to the creator of the
   * asset to define the format for this string (for example, JSON).
   */
  metadata?: string;
  /**
   * The unique identifier for the asset in the form: `assets/{ASSET_ID}`.
   */
  name?: string;
  /**
   * Hints for displaying the asset. Note that these parameters are not
   * immutable; the author of an asset may change them post-publication.
   */
  presentationParams?: PresentationParams;
  /**
   * The remix info for the asset.
   */
  remixInfo?: RemixInfo;
  /**
   * The thumbnail image for the asset.
   */
  thumbnail?: File;
  /**
   * The time when the asset was last modified. For published assets, whose
   * contents are immutable, the update time changes only when metadata
   * properties, such as visibility, are updated.
   */
  updateTime?: Date;
  /**
   * The visibility of the asset and who can access it.
   */
  visibility?:  | "VISIBILITY_UNSPECIFIED" | "PRIVATE" | "UNLISTED" | "PUBLIC";
}

function serializeAsset(data: any): Asset {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    formats: data["formats"] !== undefined ? data["formats"].map((item: any) => (serializeFormat(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeAsset(data: any): Asset {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    formats: data["formats"] !== undefined ? data["formats"].map((item: any) => (deserializeFormat(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A message generated by the asset import process.
 */
export interface AssetImportMessage {
  /**
   * The code associated with this message.
   */
  code?:  | "CODE_UNSPECIFIED" | "NO_IMPORTABLE_FILE" | "EMPTY_MODEL" | "OBJ_PARSE_ERROR" | "EXPIRED" | "IMAGE_ERROR" | "EXTRA_FILES_WITH_ARCHIVE" | "DEFAULT_MATERIALS" | "FATAL_ERROR" | "INVALID_ELEMENT_TYPE";
  /**
   * An optional file path. Only present for those error codes that specify it.
   */
  filePath?: string;
  /**
   * An optional image error. Only present for INVALID_IMAGE_FILE.
   */
  imageError?: ImageError;
  /**
   * An optional OBJ parse error. Only present for OBJ_PARSE_ERROR.
   */
  objParseError?: ObjParseError;
}

/**
 * Additional options for Poly#assetsList.
 */
export interface AssetsListOptions {
  /**
   * Filter assets based on the specified category. Supported values are:
   * `animals`, `architecture`, `art`, `food`, `nature`, `objects`, `people`,
   * `scenes`, `technology`, and `transport`.
   */
  category?: string;
  /**
   * Return only assets that have been curated by the Poly team.
   */
  curated?: boolean;
  /**
   * Return only assets with the matching format. Acceptable values are:
   * `BLOCKS`, `FBX`, `GLTF`, `GLTF2`, `OBJ`, `TILT`.
   */
  format?: string;
  /**
   * One or more search terms to be matched against all text that Poly has
   * indexed for assets, which includes display_name, description, and tags.
   * Multiple keywords should be separated by spaces.
   */
  keywords?: string;
  /**
   * Returns assets that are of the specified complexity or less. Defaults to
   * COMPLEX. For example, a request for MEDIUM assets also includes SIMPLE
   * assets.
   */
  maxComplexity?:  | "COMPLEXITY_UNSPECIFIED" | "COMPLEX" | "MEDIUM" | "SIMPLE";
  /**
   * Specifies an ordering for assets. Acceptable values are: `BEST`, `NEWEST`,
   * `OLDEST`. Defaults to `BEST`, which ranks assets based on a combination of
   * popularity and other features.
   */
  orderBy?: string;
  /**
   * The maximum number of assets to be returned. This value must be between
   * `1` and `100`. Defaults to `20`.
   */
  pageSize?: number;
  /**
   * Specifies a continuation token from a previous search whose results were
   * split into multiple pages. To get the next page, submit the same request
   * specifying the value from next_page_token.
   */
  pageToken?: string;
}

/**
 * Represents a file in Poly, which can be a root, resource, or thumbnail file.
 */
export interface File {
  /**
   * The MIME content-type, such as `image/png`. For more information, see
   * [MIME
   * types](//developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).
   */
  contentType?: string;
  /**
   * The path of the resource file relative to the root file. For root or
   * thumbnail files, this is just the filename.
   */
  relativePath?: string;
  /**
   * The URL where the file data can be retrieved.
   */
  url?: string;
}

/**
 * The same asset can be represented in different formats, for example, a
 * [WaveFront .obj](//en.wikipedia.org/wiki/Wavefront_.obj_file) file with its
 * corresponding .mtl file or a [Khronos glTF](//www.khronos.org/gltf) file with
 * its corresponding .glb binary data. A format refers to a specific
 * representation of an asset and contains all information needed to retrieve
 * and describe this representation.
 */
export interface Format {
  /**
   * Complexity stats about this representation of the asset.
   */
  formatComplexity?: FormatComplexity;
  /**
   * A short string that identifies the format type of this representation.
   * Possible values are: `FBX`, `GLTF`, `GLTF2`, `OBJ`, and `TILT`.
   */
  formatType?: string;
  /**
   * A list of dependencies of the root element. May include, but is not
   * limited to, materials, textures, and shader programs.
   */
  resources?: File[];
  /**
   * The root of the file hierarchy. This will always be populated. For some
   * format_types - such as `TILT`, which are self-contained - this is all of
   * the data. Other types - such as `OBJ` - often reference other data
   * elements. These are contained in the resources field.
   */
  root?: File;
}

function serializeFormat(data: any): Format {
  return {
    ...data,
    formatComplexity: data["formatComplexity"] !== undefined ? serializeFormatComplexity(data["formatComplexity"]) : undefined,
  };
}

function deserializeFormat(data: any): Format {
  return {
    ...data,
    formatComplexity: data["formatComplexity"] !== undefined ? deserializeFormatComplexity(data["formatComplexity"]) : undefined,
  };
}

/**
 * Information on the complexity of this Format.
 */
export interface FormatComplexity {
  /**
   * A non-negative integer that represents the level of detail (LOD) of this
   * format relative to other formats of the same asset with the same
   * format_type. This hint allows you to sort formats from the most-detailed
   * (0) to least-detailed (integers greater than 0).
   */
  lodHint?: number;
  /**
   * The estimated number of triangles.
   */
  triangleCount?: bigint;
}

function serializeFormatComplexity(data: any): FormatComplexity {
  return {
    ...data,
    triangleCount: data["triangleCount"] !== undefined ? String(data["triangleCount"]) : undefined,
  };
}

function deserializeFormatComplexity(data: any): FormatComplexity {
  return {
    ...data,
    triangleCount: data["triangleCount"] !== undefined ? BigInt(data["triangleCount"]) : undefined,
  };
}

/**
 * A message resulting from reading an image file.
 */
export interface ImageError {
  /**
   * The type of image error encountered. Optional for older image errors.
   */
  code?:  | "CODE_UNSPECIFIED" | "INVALID_IMAGE" | "IMAGE_TOO_BIG" | "WRONG_IMAGE_TYPE";
  /**
   * The file path in the import of the image that was rejected.
   */
  filePath?: string;
}

/**
 * A response message from a request to list.
 */
export interface ListAssetsResponse {
  /**
   * A list of assets that match the criteria specified in the request.
   */
  assets?: Asset[];
  /**
   * The continuation token for retrieving the next page. If empty, indicates
   * that there are no more pages. To get the next page, submit the same request
   * specifying this value as the page_token.
   */
  nextPageToken?: string;
  /**
   * The total number of assets in the list, without pagination.
   */
  totalSize?: number;
}

function serializeListAssetsResponse(data: any): ListAssetsResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (serializeAsset(item))) : undefined,
  };
}

function deserializeListAssetsResponse(data: any): ListAssetsResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (deserializeAsset(item))) : undefined,
  };
}

/**
 * A response message from a request to list.
 */
export interface ListLikedAssetsResponse {
  /**
   * A list of assets that match the criteria specified in the request.
   */
  assets?: Asset[];
  /**
   * The continuation token for retrieving the next page. If empty, indicates
   * that there are no more pages. To get the next page, submit the same request
   * specifying this value as the page_token.
   */
  nextPageToken?: string;
  /**
   * The total number of assets in the list, without pagination.
   */
  totalSize?: number;
}

function serializeListLikedAssetsResponse(data: any): ListLikedAssetsResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (serializeAsset(item))) : undefined,
  };
}

function deserializeListLikedAssetsResponse(data: any): ListLikedAssetsResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (deserializeAsset(item))) : undefined,
  };
}

/**
 * A response message from a request to list.
 */
export interface ListUserAssetsResponse {
  /**
   * The continuation token for retrieving the next page. If empty, indicates
   * that there are no more pages. To get the next page, submit the same request
   * specifying this value as the page_token.
   */
  nextPageToken?: string;
  /**
   * The total number of assets in the list, without pagination.
   */
  totalSize?: number;
  /**
   * A list of UserAssets matching the request.
   */
  userAssets?: UserAsset[];
}

function serializeListUserAssetsResponse(data: any): ListUserAssetsResponse {
  return {
    ...data,
    userAssets: data["userAssets"] !== undefined ? data["userAssets"].map((item: any) => (serializeUserAsset(item))) : undefined,
  };
}

function deserializeListUserAssetsResponse(data: any): ListUserAssetsResponse {
  return {
    ...data,
    userAssets: data["userAssets"] !== undefined ? data["userAssets"].map((item: any) => (deserializeUserAsset(item))) : undefined,
  };
}

/**
 * Details of an error resulting from parsing an OBJ file
 */
export interface ObjParseError {
  /**
   * The type of problem found (required).
   */
  code?:  | "CODE_UNSPECIFIED" | "INCONSISTENT_VERTEX_REFS" | "INVALID_COMMAND" | "INVALID_NUMBER" | "INVALID_VERTEX_REF" | "MISSING_GEOMETRIC_VERTEX" | "MISSING_TOKEN" | "TOO_FEW_DIMENSIONS" | "TOO_FEW_VERTICES" | "TOO_MANY_DIMENSIONS" | "UNSUPPORTED_COMMAND" | "UNUSED_TOKENS" | "VERTEX_NOT_FOUND" | "NUMBER_OUT_OF_RANGE" | "INVALID_VALUE" | "INVALID_TEXTURE_OPTION" | "TOO_MANY_PROBLEMS" | "MISSING_FILE_NAME" | "FILE_NOT_FOUND" | "UNKNOWN_MATERIAL" | "NO_MATERIAL_DEFINED" | "INVALID_SMOOTHING_GROUP" | "MISSING_VERTEX_COLORS" | "FILE_SUBSTITUTION" | "LINE_TOO_LONG" | "INVALID_FILE_PATH";
  /**
   * The ending character index at which the problem was found.
   */
  endIndex?: number;
  /**
   * The file path in which the problem was found.
   */
  filePath?: string;
  /**
   * The text of the line. Note that this may be truncated if the line was very
   * long. This may not include the error if it occurs after line truncation.
   */
  line?: string;
  /**
   * Line number at which the problem was found.
   */
  lineNumber?: number;
  /**
   * The starting character index at which the problem was found.
   */
  startIndex?: number;
}

/**
 * Hints for displaying the asset, based on information available when the
 * asset was uploaded.
 */
export interface PresentationParams {
  /**
   * A background color which could be used for displaying the 3D asset in a
   * 'thumbnail' or 'palette' style view. Authors have the option to set this
   * background color when publishing or editing their asset. This is
   * represented as a six-digit hexademical triplet specifying the RGB
   * components of the background color, e.g. #FF0000 for Red.
   */
  backgroundColor?: string;
  /**
   * The materials' diffuse/albedo color. This does not apply to vertex colors
   * or texture maps.
   */
  colorSpace?:  | "UNKNOWN" | "LINEAR" | "GAMMA";
  /**
   * A rotation that should be applied to the object root to make it upright.
   * More precisely, this quaternion transforms from "object space" (the space
   * in which the object is defined) to "presentation space", a coordinate
   * system where +Y is up, +X is right, -Z is forward. For example, if the
   * object is the Eiffel Tower, in its local coordinate system the object might
   * be laid out such that the base of the tower is on the YZ plane and the tip
   * of the tower is towards positive X. In this case this quaternion would
   * specify a rotation (of 90 degrees about the Z axis) such that in the
   * presentation space the base of the tower is aligned with the XZ plane, and
   * the tip of the tower lies towards +Y. This rotation is unrelated to the
   * object's pose in the web preview, which is just a camera position setting
   * and is *not* reflected in this rotation. Please note: this is applicable
   * only to the gLTF.
   */
  orientingRotation?: Quaternion;
}

/**
 * A [Quaternion](//en.wikipedia.org/wiki/Quaternion). Please note: if in the
 * response you see "w: 1" and nothing else this is the default value of [0, 0,
 * 0, 1] where x,y, and z are 0.
 */
export interface Quaternion {
  /**
   * The scalar component.
   */
  w?: number;
  /**
   * The x component.
   */
  x?: number;
  /**
   * The y component.
   */
  y?: number;
  /**
   * The z component.
   */
  z?: number;
}

/**
 * Info about the sources of this asset (i.e. assets that were remixed to
 * create this asset).
 */
export interface RemixInfo {
  /**
   * Resource ids for the sources of this remix, of the form:
   * `assets/{ASSET_ID}`
   */
  sourceAsset?: string[];
}

/**
 * A response message from a request to startImport. This is returned in the
 * response field of the Operation.
 */
export interface StartAssetImportResponse {
  /**
   * The id of newly created asset. If this is empty when the operation is
   * complete it means the import failed. Please refer to the
   * assetImportMessages field to understand what went wrong.
   */
  assetId?: string;
  /**
   * The id of the asset import.
   */
  assetImportId?: string;
  /**
   * The message from the asset import. This will contain any warnings (or - in
   * the case of failure - errors) that occurred during import.
   */
  assetImportMessages?: AssetImportMessage[];
  /**
   * The publish URL for the asset.
   */
  publishUrl?: string;
}

/**
 * Data about the user's asset.
 */
export interface UserAsset {
  /**
   * An Asset.
   */
  asset?: Asset;
}

function serializeUserAsset(data: any): UserAsset {
  return {
    ...data,
    asset: data["asset"] !== undefined ? serializeAsset(data["asset"]) : undefined,
  };
}

function deserializeUserAsset(data: any): UserAsset {
  return {
    ...data,
    asset: data["asset"] !== undefined ? deserializeAsset(data["asset"]) : undefined,
  };
}

/**
 * Additional options for Poly#usersAssetsList.
 */
export interface UsersAssetsListOptions {
  /**
   * Return only assets with the matching format. Acceptable values are:
   * `BLOCKS`, `FBX`, `GLTF`, `GLTF2`, `OBJ`, and `TILT`.
   */
  format?: string;
  /**
   * Specifies an ordering for assets. Acceptable values are: `BEST`, `NEWEST`,
   * `OLDEST`. Defaults to `BEST`, which ranks assets based on a combination of
   * popularity and other features.
   */
  orderBy?: string;
  /**
   * The maximum number of assets to be returned. This value must be between
   * `1` and `100`. Defaults to `20`.
   */
  pageSize?: number;
  /**
   * Specifies a continuation token from a previous search whose results were
   * split into multiple pages. To get the next page, submit the same request
   * specifying the value from next_page_token.
   */
  pageToken?: string;
  /**
   * The visibility of the assets to be returned. Defaults to
   * VISIBILITY_UNSPECIFIED which returns all assets.
   */
  visibility?:  | "VISIBILITY_UNSPECIFIED" | "PUBLISHED" | "PRIVATE";
}

/**
 * Additional options for Poly#usersLikedassetsList.
 */
export interface UsersLikedassetsListOptions {
  /**
   * Return only assets with the matching format. Acceptable values are:
   * `BLOCKS`, `FBX`, `GLTF`, `GLTF2`, `OBJ`, `TILT`.
   */
  format?: string;
  /**
   * Specifies an ordering for assets. Acceptable values are: `BEST`, `NEWEST`,
   * `OLDEST`, 'LIKED_TIME'. Defaults to `LIKED_TIME`, which ranks assets based
   * on how recently they were liked.
   */
  orderBy?: string;
  /**
   * The maximum number of assets to be returned. This value must be between
   * `1` and `100`. Defaults to `20`.
   */
  pageSize?: number;
  /**
   * Specifies a continuation token from a previous search whose results were
   * split into multiple pages. To get the next page, submit the same request
   * specifying the value from next_page_token.
   */
  pageToken?: string;
}