// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Drive Activity API Client for Deno
 * ==================================
 * 
 * Provides a historical view of activity in Google Drive.
 * 
 * Docs: https://developers.google.com/drive/activity/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides a historical view of activity in Google Drive.
 */
export class DriveActivity {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://driveactivity.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Query past activity in Google Drive.
   *
   */
  async activityQuery(req: QueryDriveActivityRequest): Promise<QueryDriveActivityResponse> {
    const url = new URL(`${this.#baseUrl}v2/activity:query`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeQueryDriveActivityResponse(data);
  }
}

/**
 * Information about the action.
 */
export interface Action {
  /**
   * The actor responsible for this action (or empty if all actors are
   * responsible).
   */
  actor?: Actor;
  /**
   * The type and detailed information about the action.
   */
  detail?: ActionDetail;
  /**
   * The target this action affects (or empty if affecting all targets). This
   * represents the state of the target immediately after this action occurred.
   */
  target?: Target;
  /**
   * The action occurred over this time range.
   */
  timeRange?: TimeRange;
  /**
   * The action occurred at this specific time.
   */
  timestamp?: Date;
}

function serializeAction(data: any): Action {
  return {
    ...data,
    detail: data["detail"] !== undefined ? serializeActionDetail(data["detail"]) : undefined,
    timeRange: data["timeRange"] !== undefined ? serializeTimeRange(data["timeRange"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeAction(data: any): Action {
  return {
    ...data,
    detail: data["detail"] !== undefined ? deserializeActionDetail(data["detail"]) : undefined,
    timeRange: data["timeRange"] !== undefined ? deserializeTimeRange(data["timeRange"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Data describing the type and additional information of an action.
 */
export interface ActionDetail {
  /**
   * Label was changed.
   */
  appliedLabelChange?: AppliedLabelChange;
  /**
   * A change about comments was made.
   */
  comment?: Comment;
  /**
   * An object was created.
   */
  create?: Create;
  /**
   * An object was deleted.
   */
  delete?: Delete;
  /**
   * A change happened in data leak prevention status.
   */
  dlpChange?: DataLeakPreventionChange;
  /**
   * An object was edited.
   */
  edit?: Edit;
  /**
   * An object was moved.
   */
  move?: Move;
  /**
   * The permission on an object was changed.
   */
  permissionChange?: PermissionChange;
  /**
   * An object was referenced in an application outside of Drive/Docs.
   */
  reference?: ApplicationReference;
  /**
   * An object was renamed.
   */
  rename?: Rename;
  /**
   * A deleted object was restored.
   */
  restore?: Restore;
  /**
   * Settings were changed.
   */
  settingsChange?: SettingsChange;
}

function serializeActionDetail(data: any): ActionDetail {
  return {
    ...data,
    appliedLabelChange: data["appliedLabelChange"] !== undefined ? serializeAppliedLabelChange(data["appliedLabelChange"]) : undefined,
  };
}

function deserializeActionDetail(data: any): ActionDetail {
  return {
    ...data,
    appliedLabelChange: data["appliedLabelChange"] !== undefined ? deserializeAppliedLabelChange(data["appliedLabelChange"]) : undefined,
  };
}

/**
 * The actor of a Drive activity.
 */
export interface Actor {
  /**
   * An administrator.
   */
  administrator?: Administrator;
  /**
   * An anonymous user.
   */
  anonymous?: AnonymousUser;
  /**
   * An account acting on behalf of another.
   */
  impersonation?: Impersonation;
  /**
   * A non-user actor (i.e. system triggered).
   */
  system?: SystemEvent;
  /**
   * An end user.
   */
  user?: User;
}

/**
 * Empty message representing an administrator.
 */
export interface Administrator {
}

/**
 * Empty message representing an anonymous user or indicating the authenticated
 * user should be anonymized.
 */
export interface AnonymousUser {
}

/**
 * Represents any user (including a logged out user).
 */
export interface Anyone {
}

/**
 * Activity in applications other than Drive.
 */
export interface ApplicationReference {
  /**
   * The reference type corresponding to this event.
   */
  type?:  | "UNSPECIFIED_REFERENCE_TYPE" | "LINK" | "DISCUSS";
}

/**
 * Label changes that were made on the Target.
 */
export interface AppliedLabelChange {
  /**
   * Changes that were made to the Label on the Target.
   */
  changes?: AppliedLabelChangeDetail[];
}

function serializeAppliedLabelChange(data: any): AppliedLabelChange {
  return {
    ...data,
    changes: data["changes"] !== undefined ? data["changes"].map((item: any) => (serializeAppliedLabelChangeDetail(item))) : undefined,
  };
}

function deserializeAppliedLabelChange(data: any): AppliedLabelChange {
  return {
    ...data,
    changes: data["changes"] !== undefined ? data["changes"].map((item: any) => (deserializeAppliedLabelChangeDetail(item))) : undefined,
  };
}

/**
 * A change made to a Label on the Target.
 */
export interface AppliedLabelChangeDetail {
  /**
   * Field Changes. Only present if `types` contains
   * `LABEL_FIELD_VALUE_CHANGED`.
   */
  fieldChanges?: FieldValueChange[];
  /**
   * The Label name representing the Label that changed. This name always
   * contains the revision of the Label that was used when this Action occurred.
   * The format is `labels/id@revision`.
   */
  label?: string;
  /**
   * The human-readable title of the label that changed.
   */
  title?: string;
  /**
   * The types of changes made to the Label on the Target.
   */
  types?:  | "TYPE_UNSPECIFIED" | "LABEL_ADDED" | "LABEL_REMOVED" | "LABEL_FIELD_VALUE_CHANGED" | "LABEL_APPLIED_BY_ITEM_CREATE"[];
}

function serializeAppliedLabelChangeDetail(data: any): AppliedLabelChangeDetail {
  return {
    ...data,
    fieldChanges: data["fieldChanges"] !== undefined ? data["fieldChanges"].map((item: any) => (serializeFieldValueChange(item))) : undefined,
  };
}

function deserializeAppliedLabelChangeDetail(data: any): AppliedLabelChangeDetail {
  return {
    ...data,
    fieldChanges: data["fieldChanges"] !== undefined ? data["fieldChanges"].map((item: any) => (deserializeFieldValueChange(item))) : undefined,
  };
}

/**
 * A comment with an assignment.
 */
export interface Assignment {
  /**
   * The user to whom the comment was assigned.
   */
  assignedUser?: User;
  /**
   * The sub-type of this event.
   */
  subtype?:  | "SUBTYPE_UNSPECIFIED" | "ADDED" | "DELETED" | "REPLY_ADDED" | "REPLY_DELETED" | "RESOLVED" | "REOPENED" | "REASSIGNED";
}

/**
 * A change about comments on an object.
 */
export interface Comment {
  /**
   * A change on an assignment.
   */
  assignment?: Assignment;
  /**
   * Users who are mentioned in this comment.
   */
  mentionedUsers?: User[];
  /**
   * A change on a regular posted comment.
   */
  post?: Post;
  /**
   * A change on a suggestion.
   */
  suggestion?: Suggestion;
}

/**
 * How the individual activities are consolidated. If a set of activities is
 * related they can be consolidated into one combined activity, such as one
 * actor performing the same action on multiple targets, or multiple actors
 * performing the same action on a single target. The strategy defines the rules
 * for which activities are related.
 */
export interface ConsolidationStrategy {
  /**
   * The individual activities are consolidated using the legacy strategy.
   */
  legacy?: Legacy;
  /**
   * The individual activities are not consolidated.
   */
  none?: NoConsolidation;
}

/**
 * An object was created by copying an existing object.
 */
export interface Copy {
  /**
   * The original object.
   */
  originalObject?: TargetReference;
}

/**
 * An object was created.
 */
export interface Create {
  /**
   * If present, indicates the object was created by copying an existing Drive
   * object.
   */
  copy?: Copy;
  /**
   * If present, indicates the object was newly created (e.g. as a blank
   * document), not derived from a Drive object or external object.
   */
  new?: New;
  /**
   * If present, indicates the object originated externally and was uploaded to
   * Drive.
   */
  upload?: Upload;
}

/**
 * A change in the object's data leak prevention status.
 */
export interface DataLeakPreventionChange {
  /**
   * The type of Data Leak Prevention (DLP) change.
   */
  type?:  | "TYPE_UNSPECIFIED" | "FLAGGED" | "CLEARED";
}

/**
 * Wrapper for Date Field value.
 */
export interface Date {
  /**
   * Date value.
   */
  value?: Date;
}

function serializeDate(data: any): Date {
  return {
    ...data,
    value: data["value"] !== undefined ? data["value"].toISOString() : undefined,
  };
}

function deserializeDate(data: any): Date {
  return {
    ...data,
    value: data["value"] !== undefined ? new Date(data["value"]) : undefined,
  };
}

/**
 * An object was deleted.
 */
export interface Delete {
  /**
   * The type of delete action taken.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TRASH" | "PERMANENT_DELETE";
}

/**
 * A user whose account has since been deleted.
 */
export interface DeletedUser {
}

/**
 * Information about a domain.
 */
export interface Domain {
  /**
   * An opaque string used to identify this domain.
   */
  legacyId?: string;
  /**
   * The name of the domain, e.g. `google.com`.
   */
  name?: string;
}

/**
 * Information about a shared drive.
 */
export interface Drive {
  /**
   * The resource name of the shared drive. The format is
   * `COLLECTION_ID/DRIVE_ID`. Clients should not assume a specific collection
   * ID for this resource name.
   */
  name?: string;
  /**
   * The root of this shared drive.
   */
  root?: DriveItem;
  /**
   * The title of the shared drive.
   */
  title?: string;
}

/**
 * A single Drive activity comprising one or more Actions by one or more Actors
 * on one or more Targets. Some Action groupings occur spontaneously, such as
 * moving an item into a shared folder triggering a permission change. Other
 * groupings of related Actions, such as multiple Actors editing one item or
 * moving multiple files into a new folder, are controlled by the selection of a
 * ConsolidationStrategy in the QueryDriveActivityRequest.
 */
export interface DriveActivity {
  /**
   * Details on all actions in this activity.
   */
  actions?: Action[];
  /**
   * All actor(s) responsible for the activity.
   */
  actors?: Actor[];
  /**
   * Key information about the primary action for this activity. This is either
   * representative, or the most important, of all actions in the activity,
   * according to the ConsolidationStrategy in the request.
   */
  primaryActionDetail?: ActionDetail;
  /**
   * All Google Drive objects this activity is about (e.g. file, folder,
   * drive). This represents the state of the target immediately after the
   * actions occurred.
   */
  targets?: Target[];
  /**
   * The activity occurred over this time range.
   */
  timeRange?: TimeRange;
  /**
   * The activity occurred at this specific time.
   */
  timestamp?: Date;
}

function serializeDriveActivity(data: any): DriveActivity {
  return {
    ...data,
    actions: data["actions"] !== undefined ? data["actions"].map((item: any) => (serializeAction(item))) : undefined,
    primaryActionDetail: data["primaryActionDetail"] !== undefined ? serializeActionDetail(data["primaryActionDetail"]) : undefined,
    timeRange: data["timeRange"] !== undefined ? serializeTimeRange(data["timeRange"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeDriveActivity(data: any): DriveActivity {
  return {
    ...data,
    actions: data["actions"] !== undefined ? data["actions"].map((item: any) => (deserializeAction(item))) : undefined,
    primaryActionDetail: data["primaryActionDetail"] !== undefined ? deserializeActionDetail(data["primaryActionDetail"]) : undefined,
    timeRange: data["timeRange"] !== undefined ? deserializeTimeRange(data["timeRange"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * A Drive item which is a file.
 */
export interface DriveFile {
}

/**
 * A Drive item which is a folder.
 */
export interface DriveFolder {
  /**
   * The type of Drive folder.
   */
  type?:  | "TYPE_UNSPECIFIED" | "MY_DRIVE_ROOT" | "SHARED_DRIVE_ROOT" | "STANDARD_FOLDER";
}

/**
 * A Drive item, such as a file or folder.
 */
export interface DriveItem {
  /**
   * The Drive item is a file.
   */
  driveFile?: DriveFile;
  /**
   * The Drive item is a folder. Includes information about the type of folder.
   */
  driveFolder?: DriveFolder;
  /**
   * This field is deprecated; please use the `driveFile` field instead.
   */
  file?: File;
  /**
   * This field is deprecated; please use the `driveFolder` field instead.
   */
  folder?: Folder;
  /**
   * The MIME type of the Drive item. See
   * https://developers.google.com/drive/v3/web/mime-types.
   */
  mimeType?: string;
  /**
   * The target Drive item. The format is `items/ITEM_ID`.
   */
  name?: string;
  /**
   * Information about the owner of this Drive item.
   */
  owner?: Owner;
  /**
   * The title of the Drive item.
   */
  title?: string;
}

/**
 * A lightweight reference to a Drive item, such as a file or folder.
 */
export interface DriveItemReference {
  /**
   * The Drive item is a file.
   */
  driveFile?: DriveFile;
  /**
   * The Drive item is a folder. Includes information about the type of folder.
   */
  driveFolder?: DriveFolder;
  /**
   * This field is deprecated; please use the `driveFile` field instead.
   */
  file?: File;
  /**
   * This field is deprecated; please use the `driveFolder` field instead.
   */
  folder?: Folder;
  /**
   * The target Drive item. The format is `items/ITEM_ID`.
   */
  name?: string;
  /**
   * The title of the Drive item.
   */
  title?: string;
}

/**
 * A lightweight reference to a shared drive.
 */
export interface DriveReference {
  /**
   * The resource name of the shared drive. The format is
   * `COLLECTION_ID/DRIVE_ID`. Clients should not assume a specific collection
   * ID for this resource name.
   */
  name?: string;
  /**
   * The title of the shared drive.
   */
  title?: string;
}

/**
 * An empty message indicating an object was edited.
 */
export interface Edit {
}

/**
 * Contains a value of a Field.
 */
export interface FieldValue {
  /**
   * Date Field value.
   */
  date?: Date;
  /**
   * Integer Field value.
   */
  integer?: Integer;
  /**
   * Selection Field value.
   */
  selection?: Selection;
  /**
   * Selection List Field value.
   */
  selectionList?: SelectionList;
  /**
   * Text Field value.
   */
  text?: Text;
  /**
   * Text List Field value.
   */
  textList?: TextList;
  /**
   * User Field value.
   */
  user?: SingleUser;
  /**
   * User List Field value.
   */
  userList?: UserList;
}

function serializeFieldValue(data: any): FieldValue {
  return {
    ...data,
    date: data["date"] !== undefined ? serializeDate(data["date"]) : undefined,
    integer: data["integer"] !== undefined ? serializeInteger(data["integer"]) : undefined,
  };
}

function deserializeFieldValue(data: any): FieldValue {
  return {
    ...data,
    date: data["date"] !== undefined ? deserializeDate(data["date"]) : undefined,
    integer: data["integer"] !== undefined ? deserializeInteger(data["integer"]) : undefined,
  };
}

/**
 * Change to a Field value.
 */
export interface FieldValueChange {
  /**
   * The human-readable display name for this field.
   */
  displayName?: string;
  /**
   * The ID of this field. Field IDs are unique within a Label.
   */
  fieldId?: string;
  /**
   * The value that is now set on the field. If not present, the field was
   * cleared. At least one of {old_value|new_value} is always set.
   */
  newValue?: FieldValue;
  /**
   * The value that was previously set on the field. If not present, the field
   * was newly set. At least one of {old_value|new_value} is always set.
   */
  oldValue?: FieldValue;
}

function serializeFieldValueChange(data: any): FieldValueChange {
  return {
    ...data,
    newValue: data["newValue"] !== undefined ? serializeFieldValue(data["newValue"]) : undefined,
    oldValue: data["oldValue"] !== undefined ? serializeFieldValue(data["oldValue"]) : undefined,
  };
}

function deserializeFieldValueChange(data: any): FieldValueChange {
  return {
    ...data,
    newValue: data["newValue"] !== undefined ? deserializeFieldValue(data["newValue"]) : undefined,
    oldValue: data["oldValue"] !== undefined ? deserializeFieldValue(data["oldValue"]) : undefined,
  };
}

/**
 * This item is deprecated; please see `DriveFile` instead.
 */
export interface File {
}

/**
 * A comment on a file.
 */
export interface FileComment {
  /**
   * The comment in the discussion thread. This identifier is an opaque string
   * compatible with the Drive API; see
   * https://developers.google.com/drive/v3/reference/comments/get
   */
  legacyCommentId?: string;
  /**
   * The discussion thread to which the comment was added. This identifier is
   * an opaque string compatible with the Drive API and references the first
   * comment in a discussion; see
   * https://developers.google.com/drive/v3/reference/comments/get
   */
  legacyDiscussionId?: string;
  /**
   * The link to the discussion thread containing this comment, for example,
   * `https://docs.google.com/DOCUMENT_ID/edit?disco=THREAD_ID`.
   */
  linkToDiscussion?: string;
  /**
   * The Drive item containing this comment.
   */
  parent?: DriveItem;
}

/**
 * This item is deprecated; please see `DriveFolder` instead.
 */
export interface Folder {
  /**
   * This field is deprecated; please see `DriveFolder.type` instead.
   */
  type?:  | "TYPE_UNSPECIFIED" | "MY_DRIVE_ROOT" | "TEAM_DRIVE_ROOT" | "STANDARD_FOLDER";
}

/**
 * Information about a group.
 */
export interface Group {
  /**
   * The email address of the group.
   */
  email?: string;
  /**
   * The title of the group.
   */
  title?: string;
}

/**
 * Information about an impersonation, where an admin acts on behalf of an end
 * user. Information about the acting admin is not currently available.
 */
export interface Impersonation {
  /**
   * The impersonated user.
   */
  impersonatedUser?: User;
}

/**
 * Wrapper for Integer Field value.
 */
export interface Integer {
  /**
   * Integer value.
   */
  value?: bigint;
}

function serializeInteger(data: any): Integer {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeInteger(data: any): Integer {
  return {
    ...data,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * A known user.
 */
export interface KnownUser {
  /**
   * True if this is the user making the request.
   */
  isCurrentUser?: boolean;
  /**
   * The identifier for this user that can be used with the People API to get
   * more information. The format is `people/ACCOUNT_ID`. See
   * https://developers.google.com/people/.
   */
  personName?: string;
}

/**
 * A strategy that consolidates activities using the grouping rules from the
 * legacy V1 Activity API. Similar actions occurring within a window of time can
 * be grouped across multiple targets (such as moving a set of files at once) or
 * multiple actors (such as several users editing the same item). Grouping rules
 * for this strategy are specific to each type of action.
 */
export interface Legacy {
}

/**
 * An object was moved.
 */
export interface Move {
  /**
   * The added parent object(s).
   */
  addedParents?: TargetReference[];
  /**
   * The removed parent object(s).
   */
  removedParents?: TargetReference[];
}

/**
 * An object was created from scratch.
 */
export interface New {
}

/**
 * A strategy that does no consolidation of individual activities.
 */
export interface NoConsolidation {
}

/**
 * Information about the owner of a Drive item.
 */
export interface Owner {
  /**
   * The domain of the Drive item owner.
   */
  domain?: Domain;
  /**
   * The drive that owns the item.
   */
  drive?: DriveReference;
  /**
   * This field is deprecated; please use the `drive` field instead.
   */
  teamDrive?: TeamDriveReference;
  /**
   * The user that owns the Drive item.
   */
  user?: User;
}

/**
 * The permission setting of an object.
 */
export interface Permission {
  /**
   * If true, the item can be discovered (e.g. in the user's "Shared with me"
   * collection) without needing a link to the item.
   */
  allowDiscovery?: boolean;
  /**
   * If set, this permission applies to anyone, even logged out users.
   */
  anyone?: Anyone;
  /**
   * The domain to whom this permission applies.
   */
  domain?: Domain;
  /**
   * The group to whom this permission applies.
   */
  group?: Group;
  /**
   * Indicates the [Google Drive permissions
   * role](https://developers.google.com/drive/web/manage-sharing#roles). The
   * role determines a user's ability to read, write, and comment on items.
   */
  role?:  | "ROLE_UNSPECIFIED" | "OWNER" | "ORGANIZER" | "FILE_ORGANIZER" | "EDITOR" | "COMMENTER" | "VIEWER" | "PUBLISHED_VIEWER";
  /**
   * The user to whom this permission applies.
   */
  user?: User;
}

/**
 * A change of the permission setting on an item.
 */
export interface PermissionChange {
  /**
   * The set of permissions added by this change.
   */
  addedPermissions?: Permission[];
  /**
   * The set of permissions removed by this change.
   */
  removedPermissions?: Permission[];
}

/**
 * A regular posted comment.
 */
export interface Post {
  /**
   * The sub-type of this event.
   */
  subtype?:  | "SUBTYPE_UNSPECIFIED" | "ADDED" | "DELETED" | "REPLY_ADDED" | "REPLY_DELETED" | "RESOLVED" | "REOPENED";
}

/**
 * The request message for querying Drive activity.
 */
export interface QueryDriveActivityRequest {
  /**
   * Return activities for this Drive folder, plus all children and
   * descendants. The format is `items/ITEM_ID`.
   */
  ancestorName?: string;
  /**
   * Details on how to consolidate related actions that make up the activity.
   * If not set, then related actions aren't consolidated.
   */
  consolidationStrategy?: ConsolidationStrategy;
  /**
   * The filtering for items returned from this query request. The format of
   * the filter string is a sequence of expressions, joined by an optional
   * "AND", where each expression is of the form "field operator value".
   * Supported fields: - `time`: Uses numerical operators on date values either
   * in terms of milliseconds since Jan 1, 1970 or in RFC 3339 format. Examples:
   * - `time > 1452409200000 AND time <= 1492812924310` - `time >=
   * "2016-01-10T01:02:03-05:00"` - `detail.action_detail_case`: Uses the "has"
   * operator (:) and either a singular value or a list of allowed action types
   * enclosed in parentheses, separated by a space. To exclude a result from the
   * response, prepend a hyphen (`-`) to the beginning of the filter string.
   * Examples: - `detail.action_detail_case:RENAME` -
   * `detail.action_detail_case:(CREATE RESTORE)` -
   * `-detail.action_detail_case:MOVE`
   */
  filter?: string;
  /**
   * Return activities for this Drive item. The format is `items/ITEM_ID`.
   */
  itemName?: string;
  /**
   * The minimum number of activities desired in the response; the server
   * attempts to return at least this quantity. The server may also return fewer
   * activities if it has a partial response ready before the request times out.
   * If not set, a default value is used.
   */
  pageSize?: number;
  /**
   * The token identifies which page of results to return. Set this to the
   * next_page_token value returned from a previous query to obtain the
   * following page of results. If not set, the first page of results is
   * returned.
   */
  pageToken?: string;
}

/**
 * Response message for querying Drive activity.
 */
export interface QueryDriveActivityResponse {
  /**
   * List of activity requested.
   */
  activities?: DriveActivity[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeQueryDriveActivityResponse(data: any): QueryDriveActivityResponse {
  return {
    ...data,
    activities: data["activities"] !== undefined ? data["activities"].map((item: any) => (serializeDriveActivity(item))) : undefined,
  };
}

function deserializeQueryDriveActivityResponse(data: any): QueryDriveActivityResponse {
  return {
    ...data,
    activities: data["activities"] !== undefined ? data["activities"].map((item: any) => (deserializeDriveActivity(item))) : undefined,
  };
}

/**
 * An object was renamed.
 */
export interface Rename {
  /**
   * The new title of the drive object.
   */
  newTitle?: string;
  /**
   * The previous title of the drive object.
   */
  oldTitle?: string;
}

/**
 * A deleted object was restored.
 */
export interface Restore {
  /**
   * The type of restore action taken.
   */
  type?:  | "TYPE_UNSPECIFIED" | "UNTRASH";
}

/**
 * Information about restriction policy changes to a feature.
 */
export interface RestrictionChange {
  /**
   * The feature which had a change in restriction policy.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "SHARING_OUTSIDE_DOMAIN" | "DIRECT_SHARING" | "ITEM_DUPLICATION" | "DRIVE_FILE_STREAM" | "FILE_ORGANIZER_CAN_SHARE_FOLDERS";
  /**
   * The restriction in place after the change.
   */
  newRestriction?:  | "RESTRICTION_UNSPECIFIED" | "UNRESTRICTED" | "FULLY_RESTRICTED";
}

/**
 * Wrapper for Selection Field value as combined value/display_name pair for
 * selected choice.
 */
export interface Selection {
  /**
   * Selection value as human-readable display string.
   */
  displayName?: string;
  /**
   * Selection value as Field Choice ID.
   */
  value?: string;
}

/**
 * Wrapper for SelectionList Field value.
 */
export interface SelectionList {
  /**
   * Selection values.
   */
  values?: Selection[];
}

/**
 * Information about settings changes.
 */
export interface SettingsChange {
  /**
   * The set of changes made to restrictions.
   */
  restrictionChanges?: RestrictionChange[];
}

/**
 * Wrapper for User Field value.
 */
export interface SingleUser {
  /**
   * User value as email.
   */
  value?: string;
}

/**
 * A suggestion.
 */
export interface Suggestion {
  /**
   * The sub-type of this event.
   */
  subtype?:  | "SUBTYPE_UNSPECIFIED" | "ADDED" | "DELETED" | "REPLY_ADDED" | "REPLY_DELETED" | "ACCEPTED" | "REJECTED" | "ACCEPT_DELETED" | "REJECT_DELETED";
}

/**
 * Event triggered by system operations instead of end users.
 */
export interface SystemEvent {
  /**
   * The type of the system event that may triggered activity.
   */
  type?:  | "TYPE_UNSPECIFIED" | "USER_DELETION" | "TRASH_AUTO_PURGE";
}

/**
 * Information about the target of activity. For more information on how
 * activity history is shared with users, see [Activity history
 * visibility](https://developers.google.com/drive/activity/v2#activityhistory).
 */
export interface Target {
  /**
   * The target is a shared drive.
   */
  drive?: Drive;
  /**
   * The target is a Drive item.
   */
  driveItem?: DriveItem;
  /**
   * The target is a comment on a Drive file.
   */
  fileComment?: FileComment;
  /**
   * This field is deprecated; please use the `drive` field instead.
   */
  teamDrive?: TeamDrive;
}

/**
 * A lightweight reference to the target of activity.
 */
export interface TargetReference {
  /**
   * The target is a shared drive.
   */
  drive?: DriveReference;
  /**
   * The target is a Drive item.
   */
  driveItem?: DriveItemReference;
  /**
   * This field is deprecated; please use the `drive` field instead.
   */
  teamDrive?: TeamDriveReference;
}

/**
 * This item is deprecated; please see `Drive` instead.
 */
export interface TeamDrive {
  /**
   * This field is deprecated; please see `Drive.name` instead.
   */
  name?: string;
  /**
   * This field is deprecated; please see `Drive.root` instead.
   */
  root?: DriveItem;
  /**
   * This field is deprecated; please see `Drive.title` instead.
   */
  title?: string;
}

/**
 * This item is deprecated; please see `DriveReference` instead.
 */
export interface TeamDriveReference {
  /**
   * This field is deprecated; please see `DriveReference.name` instead.
   */
  name?: string;
  /**
   * This field is deprecated; please see `DriveReference.title` instead.
   */
  title?: string;
}

/**
 * Wrapper for Text Field value.
 */
export interface Text {
  /**
   * Value of Text Field.
   */
  value?: string;
}

/**
 * Wrapper for Text List Field value.
 */
export interface TextList {
  /**
   * Text values.
   */
  values?: Text[];
}

/**
 * Information about time ranges.
 */
export interface TimeRange {
  /**
   * The end of the time range.
   */
  endTime?: Date;
  /**
   * The start of the time range.
   */
  startTime?: Date;
}

function serializeTimeRange(data: any): TimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeRange(data: any): TimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A user about whom nothing is currently known.
 */
export interface UnknownUser {
}

/**
 * An object was uploaded into Drive.
 */
export interface Upload {
}

/**
 * Information about an end user.
 */
export interface User {
  /**
   * A user whose account has since been deleted.
   */
  deletedUser?: DeletedUser;
  /**
   * A known user.
   */
  knownUser?: KnownUser;
  /**
   * A user about whom nothing is currently known.
   */
  unknownUser?: UnknownUser;
}

/**
 * Wrapper for UserList Field value.
 */
export interface UserList {
  /**
   * User values.
   */
  values?: SingleUser[];
}