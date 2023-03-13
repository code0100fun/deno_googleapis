// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Identity API Client for Deno
 * ==================================
 * 
 * API for provisioning and managing identity resources.
 * 
 * Docs: https://cloud.google.com/identity/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * API for provisioning and managing identity resources.
 */
export class CloudIdentity {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudidentity.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Cancels a UserInvitation that was already sent.
   *
   * @param name Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}`
   */
  async customersUserinvitationsCancel(name: string, req: CancelUserInvitationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Retrieves a UserInvitation resource. **Note:** New consumer accounts with
   * the customer's verified domain created within the previous 48 hours will
   * not appear in the result. This delay also applies to newly-verified
   * domains.
   *
   * @param name Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}`
   */
  async customersUserinvitationsGet(name: string): Promise<UserInvitation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUserInvitation(data);
  }

  /**
   * Verifies whether a user account is eligible to receive a UserInvitation
   * (is an unmanaged account). Eligibility is based on the following criteria:
   * * the email address is a consumer account and it's the primary email
   * address of the account, and * the domain of the email address matches an
   * existing verified Google Workspace or Cloud Identity domain If both
   * conditions are met, the user is eligible. **Note:** This method is not
   * supported for Workspace Essentials customers.
   *
   * @param name Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}`
   */
  async customersUserinvitationsIsInvitableUser(name: string): Promise<IsInvitableUserResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:isInvitableUser`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as IsInvitableUserResponse;
  }

  /**
   * Retrieves a list of UserInvitation resources. **Note:** New consumer
   * accounts with the customer's verified domain created within the previous 48
   * hours will not appear in the result. This delay also applies to
   * newly-verified domains.
   *
   * @param parent Required. The customer ID of the Google Workspace or Cloud Identity account the UserInvitation resources are associated with.
   */
  async customersUserinvitationsList(parent: string, opts: CustomersUserinvitationsListOptions = {}): Promise<ListUserInvitationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/userinvitations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return deserializeListUserInvitationsResponse(data);
  }

  /**
   * Sends a UserInvitation to email. If the `UserInvitation` does not exist
   * for this request and it is a valid request, the request creates a
   * `UserInvitation`. **Note:** The `get` and `list` methods have a 48-hour
   * delay where newly-created consumer accounts will not appear in the results.
   * You can still send a `UserInvitation` to those accounts if you know the
   * unmanaged email address and IsInvitableUser==True.
   *
   * @param name Required. `UserInvitation` name in the format `customers/{customer}/userinvitations/{user_email_address}`
   */
  async customersUserinvitationsSend(name: string, req: SendUserInvitationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:send`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Cancels an unfinished device wipe. This operation can be used to cancel
   * device wipe in the gap between the wipe operation returning success and the
   * device being wiped. This operation is possible when the device is in a
   * "pending wipe" state. The device enters the "pending wipe" state when a
   * wipe device command is issued, but has not yet been sent to the device. The
   * cancel wipe will fail if the wipe command has already been issued to the
   * device.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}`, where device is the unique ID assigned to the Device.
   */
  async devicesCancelWipe(name: string, req: GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancelWipe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a device. Only company-owned device may be created. **Note**: This
   * method is available only to customers who have one of the following SKUs:
   * Enterprise Standard, Enterprise Plus, Enterprise for Education, and Cloud
   * Identity Premium
   *
   */
  async devicesCreate(req: GoogleAppsCloudidentityDevicesV1Device, opts: DevicesCreateOptions = {}): Promise<Operation> {
    req = serializeGoogleAppsCloudidentityDevicesV1Device(req);
    const url = new URL(`${this.#baseUrl}v1/devices`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
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
   * Deletes the specified device.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}`, where device is the unique ID assigned to the Device.
   */
  async devicesDelete(name: string, opts: DevicesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Approves device to access user data.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User.
   */
  async devicesDeviceUsersApprove(name: string, req: GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Blocks device from accessing user data
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User.
   */
  async devicesDeviceUsersBlock(name: string, req: GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:block`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Cancels an unfinished user account wipe. This operation can be used to
   * cancel device wipe in the gap between the wipe operation returning success
   * and the device being wiped.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User.
   */
  async devicesDeviceUsersCancelWipe(name: string, req: GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancelWipe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the client state for the device user
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientStates/{partner}`, where `device` is the unique ID assigned to the Device, `device_user` is the unique ID assigned to the User and `partner` identifies the partner storing the data. To get the client state for devices belonging to your own organization, the `partnerId` is in the format: `customerId-*anystring*`. Where the `customerId` is your organization's customer ID and `anystring` is any suffix. This suffix is used in setting up Custom Access Levels in Context-Aware Access. You may use `my_customer` instead of the customer ID for devices managed by your own organization. You may specify `-` in place of the `{device}`, so the ClientState resource name can be: `devices/-/deviceUsers/{device_user_resource}/clientStates/{partner}`.
   */
  async devicesDeviceUsersClientStatesGet(name: string, opts: DevicesDeviceUsersClientStatesGetOptions = {}): Promise<GoogleAppsCloudidentityDevicesV1ClientState> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAppsCloudidentityDevicesV1ClientState;
  }

  /**
   * Lists the client states for the given search query.
   *
   * @param parent Required. To list all ClientStates, set this to "devices/-/deviceUsers/-". To list all ClientStates owned by a DeviceUser, set this to the resource name of the DeviceUser. Format: devices/{device}/deviceUsers/{deviceUser}
   */
  async devicesDeviceUsersClientStatesList(parent: string, opts: DevicesDeviceUsersClientStatesListOptions = {}): Promise<GoogleAppsCloudidentityDevicesV1ListClientStatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clientStates`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAppsCloudidentityDevicesV1ListClientStatesResponse;
  }

  /**
   * Updates the client state for the device user **Note**: This method is
   * available only to customers who have one of the following SKUs: Enterprise
   * Standard, Enterprise Plus, Enterprise for Education, and Cloud Identity
   * Premium
   *
   * @param name Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where partner corresponds to the partner storing the data. For partners belonging to the "BeyondCorp Alliance", this is the partner ID specified to you by Google. For all other callers, this is a string of the form: `{customer}-suffix`, where `customer` is your customer ID. The *suffix* is any string the caller specifies. This string will be displayed verbatim in the administration console. This suffix is used in setting up Custom Access Levels in Context-Aware Access. Your organization's customer ID can be obtained from the URL: `GET https://www.googleapis.com/admin/directory/v1/customers/my_customer` The `id` field in the response contains the customer ID starting with the letter 'C'. The customer ID to be used in this API is the string after the letter 'C' (not including 'C')
   */
  async devicesDeviceUsersClientStatesPatch(name: string, req: GoogleAppsCloudidentityDevicesV1ClientState, opts: DevicesDeviceUsersClientStatesPatchOptions = {}): Promise<Operation> {
    opts = serializeDevicesDeviceUsersClientStatesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
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
   * Deletes the specified DeviceUser. This also revokes the user's access to
   * device data.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User.
   */
  async devicesDeviceUsersDelete(name: string, opts: DevicesDeviceUsersDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves the specified DeviceUser
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User.
   */
  async devicesDeviceUsersGet(name: string, opts: DevicesDeviceUsersGetOptions = {}): Promise<GoogleAppsCloudidentityDevicesV1DeviceUser> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAppsCloudidentityDevicesV1DeviceUser(data);
  }

  /**
   * Lists/Searches DeviceUsers.
   *
   * @param parent Required. To list all DeviceUsers, set this to "devices/-". To list all DeviceUsers owned by a device, set this to the resource name of the device. Format: devices/{device}
   */
  async devicesDeviceUsersList(parent: string, opts: DevicesDeviceUsersListOptions = {}): Promise<GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deviceUsers`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return deserializeGoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse(data);
  }

  /**
   * Looks up resource names of the DeviceUsers associated with the caller's
   * credentials, as well as the properties provided in the request. This method
   * must be called with end-user credentials with the scope:
   * https://www.googleapis.com/auth/cloud-identity.devices.lookup If multiple
   * properties are provided, only DeviceUsers having all of these properties
   * are considered as matches - i.e. the query behaves like an AND. Different
   * platforms require different amounts of information from the caller to
   * ensure that the DeviceUser is uniquely identified. - iOS: No properties
   * need to be passed, the caller's credentials are sufficient to identify the
   * corresponding DeviceUser. - Android: Specifying the 'android_id' field is
   * required. - Desktop: Specifying the 'raw_resource_id' field is required.
   *
   * @param parent Must be set to "devices/-/deviceUsers" to search across all DeviceUser belonging to the user.
   */
  async devicesDeviceUsersLookup(parent: string, opts: DevicesDeviceUsersLookupOptions = {}): Promise<GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:lookup`);
    if (opts.androidId !== undefined) {
      url.searchParams.append("androidId", String(opts.androidId));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.rawResourceId !== undefined) {
      url.searchParams.append("rawResourceId", String(opts.rawResourceId));
    }
    if (opts.userId !== undefined) {
      url.searchParams.append("userId", String(opts.userId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse;
  }

  /**
   * Wipes the user's account on a device. Other data on the device that is not
   * associated with the user's work account is not affected. For example, if a
   * Gmail app is installed on a device that is used for personal and work
   * purposes, and the user is logged in to the Gmail app with their personal
   * account as well as their work account, wiping the "deviceUser" by their
   * work administrator will not affect their personal account within Gmail or
   * other apps such as Photos.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User.
   */
  async devicesDeviceUsersWipe(name: string, req: GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:wipe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Retrieves the specified device.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in the format: `devices/{device}`, where device is the unique ID assigned to the Device.
   */
  async devicesGet(name: string, opts: DevicesGetOptions = {}): Promise<GoogleAppsCloudidentityDevicesV1Device> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAppsCloudidentityDevicesV1Device(data);
  }

  /**
   * Lists/Searches devices.
   *
   */
  async devicesList(opts: DevicesListOptions = {}): Promise<GoogleAppsCloudidentityDevicesV1ListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/devices`);
    if (opts.customer !== undefined) {
      url.searchParams.append("customer", String(opts.customer));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleAppsCloudidentityDevicesV1ListDevicesResponse(data);
  }

  /**
   * Wipes all data on the specified device.
   *
   * @param name Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}/deviceUsers/{device_user}`, where device is the unique ID assigned to the Device, and device_user is the unique ID assigned to the User.
   */
  async devicesWipe(name: string, req: GoogleAppsCloudidentityDevicesV1WipeDeviceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:wipe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a Group.
   *
   */
  async groupsCreate(req: Group, opts: GroupsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/groups`);
    if (opts.initialGroupConfig !== undefined) {
      url.searchParams.append("initialGroupConfig", String(opts.initialGroupConfig));
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
   * Deletes a `Group`.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group` to retrieve. Must be of the form `groups/{group}`.
   */
  async groupsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves a `Group`.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group` to retrieve. Must be of the form `groups/{group}`.
   */
  async groupsGet(name: string): Promise<Group> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Group;
  }

  /**
   * Get Security Settings
   *
   * @param name Required. The security settings to retrieve. Format: `groups/{group_id}/securitySettings`
   */
  async groupsGetSecuritySettings(name: string, opts: GroupsGetSecuritySettingsOptions = {}): Promise<SecuritySettings> {
    opts = serializeGroupsGetSecuritySettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SecuritySettings;
  }

  /**
   * Lists the `Group` resources under a customer or namespace.
   *
   */
  async groupsList(opts: GroupsListOptions = {}): Promise<ListGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/groups`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListGroupsResponse;
  }

  /**
   * Looks up the [resource
   * name](https://cloud.google.com/apis/design/resource_names) of a `Group` by
   * its `EntityKey`.
   *
   */
  async groupsLookup(opts: GroupsLookupOptions = {}): Promise<LookupGroupNameResponse> {
    const url = new URL(`${this.#baseUrl}v1/groups:lookup`);
    if (opts["groupKey.id"] !== undefined) {
      url.searchParams.append("groupKey.id", String(opts["groupKey.id"]));
    }
    if (opts["groupKey.namespace"] !== undefined) {
      url.searchParams.append("groupKey.namespace", String(opts["groupKey.namespace"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LookupGroupNameResponse;
  }

  /**
   * Check a potential member for membership in a group. **Note:** This feature
   * is only available to Google Workspace Enterprise Standard, Enterprise Plus,
   * and Enterprise for Education; and Cloud Identity Premium accounts. If the
   * account of the member is not one of these, a 403 (PERMISSION_DENIED) HTTP
   * status code will be returned. A member has membership to a group as long as
   * there is a single viewable transitive membership between the group and the
   * member. The actor must have view permissions to at least one transitive
   * membership between the member and group.
   *
   * @param parent [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to check the transitive membership in. Format: `groups/{group}`, where `group` is the unique id assigned to the Group to which the Membership belongs to.
   */
  async groupsMembershipsCheckTransitiveMembership(parent: string, opts: GroupsMembershipsCheckTransitiveMembershipOptions = {}): Promise<CheckTransitiveMembershipResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships:checkTransitiveMembership`);
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CheckTransitiveMembershipResponse;
  }

  /**
   * Creates a `Membership`.
   *
   * @param parent Required. The parent `Group` resource under which to create the `Membership`. Must be of the form `groups/{group}`.
   */
  async groupsMembershipsCreate(parent: string, req: Membership): Promise<Operation> {
    req = serializeMembership(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a `Membership`.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` to delete. Must be of the form `groups/{group}/memberships/{membership}`
   */
  async groupsMembershipsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves a `Membership`.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` to retrieve. Must be of the form `groups/{group}/memberships/{membership}`.
   */
  async groupsMembershipsGet(name: string): Promise<Membership> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMembership(data);
  }

  /**
   * Get a membership graph of just a member or both a member and a group.
   * **Note:** This feature is only available to Google Workspace Enterprise
   * Standard, Enterprise Plus, and Enterprise for Education; and Cloud Identity
   * Premium accounts. If the account of the member is not one of these, a 403
   * (PERMISSION_DENIED) HTTP status code will be returned. Given a member, the
   * response will contain all membership paths from the member. Given both a
   * group and a member, the response will contain all membership paths between
   * the group and the member.
   *
   * @param parent Required. [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group}`, where `group` is the unique ID assigned to the Group to which the Membership belongs to. group can be a wildcard collection id "-". When a group is specified, the membership graph will be constrained to paths between the member (defined in the query) and the parent. If a wildcard collection is provided, all membership paths connected to the member will be returned.
   */
  async groupsMembershipsGetMembershipGraph(parent: string, opts: GroupsMembershipsGetMembershipGraphOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships:getMembershipGraph`);
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists the `Membership`s within a `Group`.
   *
   * @param parent Required. The parent `Group` resource under which to lookup the `Membership` name. Must be of the form `groups/{group}`.
   */
  async groupsMembershipsList(parent: string, opts: GroupsMembershipsListOptions = {}): Promise<ListMembershipsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships`);
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
    return deserializeListMembershipsResponse(data);
  }

  /**
   * Looks up the [resource
   * name](https://cloud.google.com/apis/design/resource_names) of a
   * `Membership` by its `EntityKey`.
   *
   * @param parent Required. The parent `Group` resource under which to lookup the `Membership` name. Must be of the form `groups/{group}`.
   */
  async groupsMembershipsLookup(parent: string, opts: GroupsMembershipsLookupOptions = {}): Promise<LookupMembershipNameResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships:lookup`);
    if (opts["memberKey.id"] !== undefined) {
      url.searchParams.append("memberKey.id", String(opts["memberKey.id"]));
    }
    if (opts["memberKey.namespace"] !== undefined) {
      url.searchParams.append("memberKey.namespace", String(opts["memberKey.namespace"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LookupMembershipNameResponse;
  }

  /**
   * Modifies the `MembershipRole`s of a `Membership`.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Membership` whose roles are to be modified. Must be of the form `groups/{group}/memberships/{membership}`.
   */
  async groupsMembershipsModifyMembershipRoles(name: string, req: ModifyMembershipRolesRequest): Promise<ModifyMembershipRolesResponse> {
    req = serializeModifyMembershipRolesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:modifyMembershipRoles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeModifyMembershipRolesResponse(data);
  }

  /**
   * Search transitive groups of a member. **Note:** This feature is only
   * available to Google Workspace Enterprise Standard, Enterprise Plus, and
   * Enterprise for Education; and Cloud Identity Premium accounts. If the
   * account of the member is not one of these, a 403 (PERMISSION_DENIED) HTTP
   * status code will be returned. A transitive group is any group that has a
   * direct or indirect membership to the member. Actor must have view
   * permissions all transitive groups.
   *
   * @param parent [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group}`, where `group` is always '-' as this API will search across all groups for a given member.
   */
  async groupsMembershipsSearchTransitiveGroups(parent: string, opts: GroupsMembershipsSearchTransitiveGroupsOptions = {}): Promise<SearchTransitiveGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships:searchTransitiveGroups`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchTransitiveGroupsResponse;
  }

  /**
   * Search transitive memberships of a group. **Note:** This feature is only
   * available to Google Workspace Enterprise Standard, Enterprise Plus, and
   * Enterprise for Education; and Cloud Identity Premium accounts. If the
   * account of the group is not one of these, a 403 (PERMISSION_DENIED) HTTP
   * status code will be returned. A transitive membership is any direct or
   * indirect membership of a group. Actor must have view permissions to all
   * transitive memberships.
   *
   * @param parent [Resource name](https://cloud.google.com/apis/design/resource_names) of the group to search transitive memberships in. Format: `groups/{group}`, where `group` is the unique ID assigned to the Group.
   */
  async groupsMembershipsSearchTransitiveMemberships(parent: string, opts: GroupsMembershipsSearchTransitiveMembershipsOptions = {}): Promise<SearchTransitiveMembershipsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/memberships:searchTransitiveMemberships`);
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
    return data as SearchTransitiveMembershipsResponse;
  }

  /**
   * Updates a `Group`.
   *
   * @param name Output only. The [resource name](https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group}`.
   */
  async groupsPatch(name: string, req: Group, opts: GroupsPatchOptions = {}): Promise<Operation> {
    opts = serializeGroupsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Searches for `Group` resources matching a specified query.
   *
   */
  async groupsSearch(opts: GroupsSearchOptions = {}): Promise<SearchGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/groups:search`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchGroupsResponse;
  }

  /**
   * Update Security Settings
   *
   * @param name Output only. The resource name of the security settings. Shall be of the form `groups/{group_id}/securitySettings`.
   */
  async groupsUpdateSecuritySettings(name: string, req: SecuritySettings, opts: GroupsUpdateSecuritySettingsOptions = {}): Promise<Operation> {
    opts = serializeGroupsUpdateSecuritySettingsOptions(opts);
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
    return data as Operation;
  }

  /**
   * Creates an InboundSamlSsoProfile for a customer.
   *
   */
  async inboundSamlSsoProfilesCreate(req: InboundSamlSsoProfile): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/inboundSamlSsoProfiles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an InboundSamlSsoProfile.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSamlSsoProfile to delete. Format: `inboundSamlSsoProfiles/{sso_profile_id}`
   */
  async inboundSamlSsoProfilesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets an InboundSamlSsoProfile.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSamlSsoProfile to get. Format: `inboundSamlSsoProfiles/{sso_profile_id}`
   */
  async inboundSamlSsoProfilesGet(name: string): Promise<InboundSamlSsoProfile> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InboundSamlSsoProfile;
  }

  /**
   * Adds an IdpCredential. Up to 2 credentials are allowed.
   *
   * @param parent Required. The InboundSamlSsoProfile that owns the IdpCredential. Format: `inboundSamlSsoProfiles/{sso_profile_id}`
   */
  async inboundSamlSsoProfilesIdpCredentialsAdd(parent: string, req: AddIdpCredentialRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/idpCredentials:add`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an IdpCredential.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the IdpCredential to delete. Format: `inboundSamlSsoProfiles/{sso_profile_id}/idpCredentials/{idp_credential_id}`
   */
  async inboundSamlSsoProfilesIdpCredentialsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets an IdpCredential.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the IdpCredential to retrieve. Format: `inboundSamlSsoProfiles/{sso_profile_id}/idpCredentials/{idp_credential_id}`
   */
  async inboundSamlSsoProfilesIdpCredentialsGet(name: string): Promise<IdpCredential> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as IdpCredential;
  }

  /**
   * Returns a list of IdpCredentials in an InboundSamlSsoProfile.
   *
   * @param parent Required. The parent, which owns this collection of `IdpCredential`s. Format: `inboundSamlSsoProfiles/{sso_profile_id}`
   */
  async inboundSamlSsoProfilesIdpCredentialsList(parent: string, opts: InboundSamlSsoProfilesIdpCredentialsListOptions = {}): Promise<ListIdpCredentialsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/idpCredentials`);
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
    return data as ListIdpCredentialsResponse;
  }

  /**
   * Lists InboundSamlSsoProfiles for a customer.
   *
   */
  async inboundSamlSsoProfilesList(opts: InboundSamlSsoProfilesListOptions = {}): Promise<ListInboundSamlSsoProfilesResponse> {
    const url = new URL(`${this.#baseUrl}v1/inboundSamlSsoProfiles`);
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
    return data as ListInboundSamlSsoProfilesResponse;
  }

  /**
   * Updates an InboundSamlSsoProfile.
   *
   * @param name Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the SAML SSO profile.
   */
  async inboundSamlSsoProfilesPatch(name: string, req: InboundSamlSsoProfile, opts: InboundSamlSsoProfilesPatchOptions = {}): Promise<Operation> {
    opts = serializeInboundSamlSsoProfilesPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Creates an InboundSsoAssignment for users and devices in a `Customer`
   * under a given `Group` or `OrgUnit`.
   *
   */
  async inboundSsoAssignmentsCreate(req: InboundSsoAssignment): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/inboundSsoAssignments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an InboundSsoAssignment. To disable SSO, Create (or Update) an
   * assignment that has `sso_mode` == `SSO_OFF`.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSsoAssignment to delete. Format: `inboundSsoAssignments/{assignment}`
   */
  async inboundSsoAssignmentsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets an InboundSsoAssignment.
   *
   * @param name Required. The [resource name](https://cloud.google.com/apis/design/resource_names) of the InboundSsoAssignment to fetch. Format: `inboundSsoAssignments/{assignment}`
   */
  async inboundSsoAssignmentsGet(name: string): Promise<InboundSsoAssignment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as InboundSsoAssignment;
  }

  /**
   * Lists the InboundSsoAssignments for a `Customer`.
   *
   */
  async inboundSsoAssignmentsList(opts: InboundSsoAssignmentsListOptions = {}): Promise<ListInboundSsoAssignmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/inboundSsoAssignments`);
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
    return data as ListInboundSsoAssignmentsResponse;
  }

  /**
   * Updates an InboundSsoAssignment. The body of this request is the
   * `inbound_sso_assignment` field and the `update_mask` is relative to that.
   * For example: a PATCH to
   * `/v1/inboundSsoAssignments/0abcdefg1234567&update_mask=rank` with a body of
   * `{ "rank": 1 }` moves that (presumably group-targeted) SSO assignment to
   * the highest priority and shifts any other group-targeted assignments down
   * in priority.
   *
   * @param name Output only. [Resource name](https://cloud.google.com/apis/design/resource_names) of the Inbound SSO Assignment.
   */
  async inboundSsoAssignmentsPatch(name: string, req: InboundSsoAssignment, opts: InboundSsoAssignmentsPatchOptions = {}): Promise<Operation> {
    opts = serializeInboundSsoAssignmentsPatchOptions(opts);
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
    return data as Operation;
  }
}

/**
 * LRO response metadata for InboundSamlSsoProfilesService.AddIdpCredential.
 */
export interface AddIdpCredentialOperationMetadata {
}

/**
 * The request for creating an IdpCredential with its associated payload. An
 * InboundSamlSsoProfile can own up to 2 credentials.
 */
export interface AddIdpCredentialRequest {
  /**
   * PEM encoded x509 certificate containing the public key for verifying IdP
   * signatures.
   */
  pemData?: string;
}

/**
 * Request to cancel sent invitation for target email in UserInvitation.
 */
export interface CancelUserInvitationRequest {
}

/**
 * The response message for MembershipsService.CheckTransitiveMembership.
 */
export interface CheckTransitiveMembershipResponse {
  /**
   * Response does not include the possible roles of a member since the
   * behavior of this rpc is not all-or-nothing unlike the other rpcs. So, it
   * may not be possible to list all the roles definitively, due to possible
   * lack of authorization in some of the paths.
   */
  hasMembership?: boolean;
}

/**
 * Metadata for CreateGroup LRO.
 */
export interface CreateGroupMetadata {
}

/**
 * LRO response metadata for
 * InboundSamlSsoProfilesService.CreateInboundSamlSsoProfile.
 */
export interface CreateInboundSamlSsoProfileOperationMetadata {
}

/**
 * LRO response metadata for
 * InboundSsoAssignmentsService.CreateInboundSsoAssignment.
 */
export interface CreateInboundSsoAssignmentOperationMetadata {
}

/**
 * Metadata for CreateMembership LRO.
 */
export interface CreateMembershipMetadata {
}

/**
 * Additional options for CloudIdentity#customersUserinvitationsList.
 */
export interface CustomersUserinvitationsListOptions {
  /**
   * Optional. A query string for filtering `UserInvitation` results by their
   * current state, in the format: `"state=='invited'"`.
   */
  filter?: string;
  /**
   * Optional. The sort order of the list results. You can sort the results in
   * descending order based on either email or last update timestamp but not
   * both, using `order_by="email desc"`. Currently, sorting is supported for
   * `update_time asc`, `update_time desc`, `email asc`, and `email desc`. If
   * not specified, results will be returned based on `email asc` order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of UserInvitation resources to return. If
   * unspecified, at most 100 resources will be returned. The maximum value is
   * 200; values above 200 will be set to 200.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListUserInvitations`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListBooks` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Metadata for DeleteGroup LRO.
 */
export interface DeleteGroupMetadata {
}

/**
 * LRO response metadata for InboundSamlSsoProfilesService.DeleteIdpCredential.
 */
export interface DeleteIdpCredentialOperationMetadata {
}

/**
 * LRO response metadata for
 * InboundSamlSsoProfilesService.DeleteInboundSamlSsoProfile.
 */
export interface DeleteInboundSamlSsoProfileOperationMetadata {
}

/**
 * LRO response metadata for
 * InboundSsoAssignmentsService.DeleteInboundSsoAssignment.
 */
export interface DeleteInboundSsoAssignmentOperationMetadata {
}

/**
 * Metadata for DeleteMembership LRO.
 */
export interface DeleteMembershipMetadata {
}

/**
 * Additional options for CloudIdentity#devicesCreate.
 */
export interface DevicesCreateOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Additional options for CloudIdentity#devicesDelete.
 */
export interface DevicesDeleteOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Additional options for CloudIdentity#devicesDeviceUsersClientStatesGet.
 */
export interface DevicesDeviceUsersClientStatesGetOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Additional options for CloudIdentity#devicesDeviceUsersClientStatesList.
 */
export interface DevicesDeviceUsersClientStatesListOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
  /**
   * Optional. Additional restrictions when fetching list of client states.
   */
  filter?: string;
  /**
   * Optional. Order specification for client states in the response.
   */
  orderBy?: string;
  /**
   * Optional. A page token, received from a previous `ListClientStates` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListClientStates` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudIdentity#devicesDeviceUsersClientStatesPatch.
 */
export interface DevicesDeviceUsersClientStatesPatchOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
  /**
   * Optional. Comma-separated list of fully qualified names of fields to be
   * updated. If not specified, all updatable fields in ClientState are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeDevicesDeviceUsersClientStatesPatchOptions(data: any): DevicesDeviceUsersClientStatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeDevicesDeviceUsersClientStatesPatchOptions(data: any): DevicesDeviceUsersClientStatesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudIdentity#devicesDeviceUsersDelete.
 */
export interface DevicesDeviceUsersDeleteOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Additional options for CloudIdentity#devicesDeviceUsersGet.
 */
export interface DevicesDeviceUsersGetOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Additional options for CloudIdentity#devicesDeviceUsersList.
 */
export interface DevicesDeviceUsersListOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
  /**
   * Optional. Additional restrictions when fetching list of devices. For a
   * list of search fields, refer to [Mobile device search
   * fields](https://developers.google.com/admin-sdk/directory/v1/search-operators).
   * Multiple search fields are separated by the space character.
   */
  filter?: string;
  /**
   * Optional. Order specification for devices in the response.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of DeviceUsers to return. If unspecified, at
   * most 5 DeviceUsers will be returned. The maximum value is 20; values above
   * 20 will be coerced to 20.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListDeviceUsers` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListBooks` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudIdentity#devicesDeviceUsersLookup.
 */
export interface DevicesDeviceUsersLookupOptions {
  /**
   * Android Id returned by
   * [Settings.Secure#ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID).
   */
  androidId?: string;
  /**
   * The maximum number of DeviceUsers to return. If unspecified, at most 20
   * DeviceUsers will be returned. The maximum value is 20; values above 20 will
   * be coerced to 20.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `LookupDeviceUsers` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `LookupDeviceUsers` must match the call that provided the page
   * token.
   */
  pageToken?: string;
  /**
   * Raw Resource Id used by Google Endpoint Verification. If the user is
   * enrolled into Google Endpoint Verification, this id will be saved as the
   * 'device_resource_id' field in the following platform dependent files. Mac:
   * ~/.secureConnect/context_aware_config.json Windows:
   * C:\Users\%USERPROFILE%\.secureConnect\context_aware_config.json Linux:
   * ~/.secureConnect/context_aware_config.json
   */
  rawResourceId?: string;
  /**
   * The user whose DeviceUser's resource name will be fetched. Must be set to
   * 'me' to fetch the DeviceUser's resource name for the calling user.
   */
  userId?: string;
}

/**
 * Additional options for CloudIdentity#devicesGet.
 */
export interface DevicesGetOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the Customer
   * in the format: `customers/{customer}`, where customer is the customer to
   * whom the device belongs. If you're using this API for your own
   * organization, use `customers/my_customer`. If you're using this API to
   * manage another organization, use `customers/{customer}`, where customer is
   * the customer to whom the device belongs.
   */
  customer?: string;
}

/**
 * Additional options for CloudIdentity#devicesList.
 */
export interface DevicesListOptions {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer
   * in the format: `customers/{customer}`, where customer is the customer to
   * whom the device belongs. If you're using this API for your own
   * organization, use `customers/my_customer`. If you're using this API to
   * manage another organization, use `customers/{customer}`, where customer is
   * the customer to whom the device belongs.
   */
  customer?: string;
  /**
   * Optional. Additional restrictions when fetching list of devices. For a
   * list of search fields, refer to [Mobile device search
   * fields](https://developers.google.com/admin-sdk/directory/v1/search-operators).
   * Multiple search fields are separated by the space character.
   */
  filter?: string;
  /**
   * Optional. Order specification for devices in the response. Only one of the
   * following field names may be used to specify the order: `create_time`,
   * `last_sync_time`, `model`, `os_version`, `device_type` and `serial_number`.
   * `desc` may be specified optionally at the end to specify results to be
   * sorted in descending order. Default order is ascending.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of Devices to return. If unspecified, at most
   * 20 Devices will be returned. The maximum value is 100; values above 100
   * will be coerced to 100.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListDevices` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListDevices` must match the call that provided the
   * page token.
   */
  pageToken?: string;
  /**
   * Optional. The view to use for the List request.
   */
  view?:  | "VIEW_UNSPECIFIED" | "COMPANY_INVENTORY" | "USER_ASSIGNED_DEVICES";
}

/**
 * Information of a DSA public key.
 */
export interface DsaPublicKeyInfo {
  /**
   * Key size in bits (size of parameter P).
   */
  keySize?: number;
}

/**
 * Dynamic group metadata like queries and status.
 */
export interface DynamicGroupMetadata {
  /**
   * Memberships will be the union of all queries. Only one entry with USER
   * resource is currently supported. Customers can create up to 100 dynamic
   * groups.
   */
  queries?: DynamicGroupQuery[];
  /**
   * Output only. Status of the dynamic group.
   */
  readonly status?: DynamicGroupStatus;
}

/**
 * Defines a query on a resource.
 */
export interface DynamicGroupQuery {
  /**
   * Query that determines the memberships of the dynamic group. Examples: All
   * users with at least one `organizations.department` of engineering.
   * `user.organizations.exists(org, org.department=='engineering')` All users
   * with at least one location that has `area` of `foo` and `building_id` of
   * `bar`. `user.locations.exists(loc, loc.area=='foo' &&
   * loc.building_id=='bar')` All users with any variation of the name John Doe
   * (case-insensitive queries add `equalsIgnoreCase()` to the value being
   * queried). `user.name.value.equalsIgnoreCase('jOhn DoE')`
   */
  query?: string;
  /**
   * Resource type for the Dynamic Group Query
   */
  resourceType?:  | "RESOURCE_TYPE_UNSPECIFIED" | "USER";
}

/**
 * The current status of a dynamic group along with timestamp.
 */
export interface DynamicGroupStatus {
  /**
   * Status of the dynamic group.
   */
  status?:  | "STATUS_UNSPECIFIED" | "UP_TO_DATE" | "UPDATING_MEMBERSHIPS" | "INVALID_QUERY";
  /**
   * The latest time at which the dynamic group is guaranteed to be in the
   * given status. If status is `UP_TO_DATE`, the latest time at which the
   * dynamic group was confirmed to be up-to-date. If status is
   * `UPDATING_MEMBERSHIPS`, the time at which dynamic group was created.
   */
  statusTime?: Date;
}

function serializeDynamicGroupStatus(data: any): DynamicGroupStatus {
  return {
    ...data,
    statusTime: data["statusTime"] !== undefined ? data["statusTime"].toISOString() : undefined,
  };
}

function deserializeDynamicGroupStatus(data: any): DynamicGroupStatus {
  return {
    ...data,
    statusTime: data["statusTime"] !== undefined ? new Date(data["statusTime"]) : undefined,
  };
}

/**
 * A unique identifier for an entity in the Cloud Identity Groups API. An
 * entity can represent either a group with an optional `namespace` or a user
 * without a `namespace`. The combination of `id` and `namespace` must be
 * unique; however, the same `id` can be used with different `namespace`s.
 */
export interface EntityKey {
  /**
   * The ID of the entity. For Google-managed entities, the `id` should be the
   * email address of an existing group or user. For external-identity-mapped
   * entities, the `id` must be a string conforming to the Identity Source's
   * requirements. Must be unique within a `namespace`.
   */
  id?: string;
  /**
   * The namespace in which the entity exists. If not specified, the
   * `EntityKey` represents a Google-managed entity such as a Google user or a
   * Google Group. If specified, the `EntityKey` represents an
   * external-identity-mapped group. The namespace must correspond to an
   * identity source created in Admin Console and must be in the form of
   * `identitysources/{identity_source}`.
   */
  namespace?: string;
}

/**
 * The `MembershipRole` expiry details.
 */
export interface ExpiryDetail {
  /**
   * The time at which the `MembershipRole` will expire.
   */
  expireTime?: Date;
}

function serializeExpiryDetail(data: any): ExpiryDetail {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeExpiryDetail(data: any): ExpiryDetail {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * Metadata of GetMembershipGraphResponse LRO. This is currently empty to
 * permit future extensibility.
 */
export interface GetMembershipGraphMetadata {
}

/**
 * The response message for MembershipsService.GetMembershipGraph.
 */
export interface GetMembershipGraphResponse {
  /**
   * The membership graph's path information represented as an adjacency list.
   */
  adjacencyList?: MembershipAdjacencyList[];
  /**
   * The resources representing each group in the adjacency list. Each group in
   * this list can be correlated to a 'group' of the MembershipAdjacencyList
   * using the 'name' of the Group resource.
   */
  groups?: Group[];
}

function serializeGetMembershipGraphResponse(data: any): GetMembershipGraphResponse {
  return {
    ...data,
    adjacencyList: data["adjacencyList"] !== undefined ? data["adjacencyList"].map((item: any) => (serializeMembershipAdjacencyList(item))) : undefined,
  };
}

function deserializeGetMembershipGraphResponse(data: any): GetMembershipGraphResponse {
  return {
    ...data,
    adjacencyList: data["adjacencyList"] !== undefined ? data["adjacencyList"].map((item: any) => (deserializeMembershipAdjacencyList(item))) : undefined,
  };
}

/**
 * Resource representing the Android specific attributes of a Device.
 */
export interface GoogleAppsCloudidentityDevicesV1AndroidAttributes {
  /**
   * Whether applications from unknown sources can be installed on device.
   */
  enabledUnknownSources?: boolean;
  /**
   * Whether this account is on an owner/primary profile. For phones, only true
   * for owner profiles. Android 4+ devices can have secondary or restricted
   * user profiles.
   */
  ownerProfileAccount?: boolean;
  /**
   * Ownership privileges on device.
   */
  ownershipPrivilege?:  | "OWNERSHIP_PRIVILEGE_UNSPECIFIED" | "DEVICE_ADMINISTRATOR" | "PROFILE_OWNER" | "DEVICE_OWNER";
  /**
   * Whether device supports Android work profiles. If false, this service will
   * not block access to corp data even if an administrator turns on the
   * "Enforce Work Profile" policy.
   */
  supportsWorkProfile?: boolean;
}

/**
 * Metadata for ApproveDeviceUser LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata {
}

/**
 * Request message for approving the device to access user data.
 */
export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Response message for approving the device to access user data.
 */
export interface GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse {
  /**
   * Resultant DeviceUser object for the action.
   */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

function serializeGoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? serializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? deserializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

/**
 * Metadata for BlockDeviceUser LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata {
}

/**
 * Request message for blocking account on device.
 */
export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Response message for blocking the device from accessing user data.
 */
export interface GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse {
  /**
   * Resultant DeviceUser object for the action.
   */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

function serializeGoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? serializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? deserializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

/**
 * Metadata for CancelWipeDevice LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata {
}

/**
 * Request message for cancelling an unfinished device wipe.
 */
export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Response message for cancelling an unfinished device wipe.
 */
export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse {
  /**
   * Resultant Device object for the action. Note that asset tags will not be
   * returned in the device object.
   */
  device?: GoogleAppsCloudidentityDevicesV1Device;
}

function serializeGoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse(data: any): GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse {
  return {
    ...data,
    device: data["device"] !== undefined ? serializeGoogleAppsCloudidentityDevicesV1Device(data["device"]) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse(data: any): GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse {
  return {
    ...data,
    device: data["device"] !== undefined ? deserializeGoogleAppsCloudidentityDevicesV1Device(data["device"]) : undefined,
  };
}

/**
 * Metadata for CancelWipeDeviceUser LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata {
}

/**
 * Request message for cancelling an unfinished user account wipe.
 */
export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Response message for cancelling an unfinished user account wipe.
 */
export interface GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse {
  /**
   * Resultant DeviceUser object for the action.
   */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

function serializeGoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? serializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? deserializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

/**
 * Represents the state associated with an API client calling the Devices API.
 * Resource representing ClientState and supports updates from API users
 */
export interface GoogleAppsCloudidentityDevicesV1ClientState {
  /**
   * The caller can specify asset tags for this resource
   */
  assetTags?: string[];
  /**
   * The compliance state of the resource as specified by the API client.
   */
  complianceState?:  | "COMPLIANCE_STATE_UNSPECIFIED" | "COMPLIANT" | "NON_COMPLIANT";
  /**
   * Output only. The time the client state data was created.
   */
  readonly createTime?: Date;
  /**
   * This field may be used to store a unique identifier for the API resource
   * within which these CustomAttributes are a field.
   */
  customId?: string;
  /**
   * The token that needs to be passed back for concurrency control in updates.
   * Token needs to be passed back in UpdateRequest
   */
  etag?: string;
  /**
   * The Health score of the resource. The Health score is the callers
   * specification of the condition of the device from a usability point of
   * view. For example, a third-party device management provider may specify a
   * health score based on its compliance with organizational policies.
   */
  healthScore?:  | "HEALTH_SCORE_UNSPECIFIED" | "VERY_POOR" | "POOR" | "NEUTRAL" | "GOOD" | "VERY_GOOD";
  /**
   * The map of key-value attributes stored by callers specific to a device.
   * The total serialized length of this map may not exceed 10KB. No limit is
   * placed on the number of attributes in a map.
   */
  keyValuePairs?: {
    [key: string]: GoogleAppsCloudidentityDevicesV1CustomAttributeValue
  };
  /**
   * Output only. The time the client state data was last updated.
   */
  readonly lastUpdateTime?: Date;
  /**
   * The management state of the resource as specified by the API client.
   */
  managed?:  | "MANAGED_STATE_UNSPECIFIED" | "MANAGED" | "UNMANAGED";
  /**
   * Output only. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the
   * ClientState in format:
   * `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where
   * partner corresponds to the partner storing the data. For partners belonging
   * to the "BeyondCorp Alliance", this is the partner ID specified to you by
   * Google. For all other callers, this is a string of the form:
   * `{customer}-suffix`, where `customer` is your customer ID. The *suffix* is
   * any string the caller specifies. This string will be displayed verbatim in
   * the administration console. This suffix is used in setting up Custom Access
   * Levels in Context-Aware Access. Your organization's customer ID can be
   * obtained from the URL: `GET
   * https://www.googleapis.com/admin/directory/v1/customers/my_customer` The
   * `id` field in the response contains the customer ID starting with the
   * letter 'C'. The customer ID to be used in this API is the string after the
   * letter 'C' (not including 'C')
   */
  readonly name?: string;
  /**
   * Output only. The owner of the ClientState
   */
  readonly ownerType?:  | "OWNER_TYPE_UNSPECIFIED" | "OWNER_TYPE_CUSTOMER" | "OWNER_TYPE_PARTNER";
  /**
   * A descriptive cause of the health score.
   */
  scoreReason?: string;
}

/**
 * Metadata for CreateDevice LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata {
}

/**
 * Additional custom attribute values may be one of these types
 */
export interface GoogleAppsCloudidentityDevicesV1CustomAttributeValue {
  /**
   * Represents a boolean value.
   */
  boolValue?: boolean;
  /**
   * Represents a double value.
   */
  numberValue?: number;
  /**
   * Represents a string value.
   */
  stringValue?: string;
}

/**
 * Metadata for DeleteDevice LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata {
}

/**
 * Metadata for DeleteDeviceUser LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata {
}

/**
 * A Device within the Cloud Identity Devices API. Represents a Device known
 * to Google Cloud, independent of the device ownership, type, and whether it is
 * assigned or in use by a user.
 */
export interface GoogleAppsCloudidentityDevicesV1Device {
  /**
   * Output only. Attributes specific to Android devices.
   */
  readonly androidSpecificAttributes?: GoogleAppsCloudidentityDevicesV1AndroidAttributes;
  /**
   * Asset tag of the device.
   */
  assetTag?: string;
  /**
   * Output only. Baseband version of the device.
   */
  readonly basebandVersion?: string;
  /**
   * Output only. Device bootloader version. Example: 0.6.7.
   */
  readonly bootloaderVersion?: string;
  /**
   * Output only. Device brand. Example: Samsung.
   */
  readonly brand?: string;
  /**
   * Output only. Build number of the device.
   */
  readonly buildNumber?: string;
  /**
   * Output only. Represents whether the Device is compromised.
   */
  readonly compromisedState?:  | "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "UNCOMPROMISED";
  /**
   * Output only. When the Company-Owned device was imported. This field is
   * empty for BYOD devices.
   */
  readonly createTime?: Date;
  /**
   * Unique identifier for the device.
   */
  deviceId?: string;
  /**
   * Output only. Type of device.
   */
  readonly deviceType?:  | "DEVICE_TYPE_UNSPECIFIED" | "ANDROID" | "IOS" | "GOOGLE_SYNC" | "WINDOWS" | "MAC_OS" | "LINUX" | "CHROME_OS";
  /**
   * Output only. Whether developer options is enabled on device.
   */
  readonly enabledDeveloperOptions?: boolean;
  /**
   * Output only. Whether USB debugging is enabled on device.
   */
  readonly enabledUsbDebugging?: boolean;
  /**
   * Output only. Device encryption state.
   */
  readonly encryptionState?:  | "ENCRYPTION_STATE_UNSPECIFIED" | "UNSUPPORTED_BY_DEVICE" | "ENCRYPTED" | "NOT_ENCRYPTED";
  /**
   * Output only. IMEI number of device if GSM device; empty otherwise.
   */
  readonly imei?: string;
  /**
   * Output only. Kernel version of the device.
   */
  readonly kernelVersion?: string;
  /**
   * Most recent time when device synced with this service.
   */
  lastSyncTime?: Date;
  /**
   * Output only. Management state of the device
   */
  readonly managementState?:  | "MANAGEMENT_STATE_UNSPECIFIED" | "APPROVED" | "BLOCKED" | "PENDING" | "UNPROVISIONED" | "WIPING" | "WIPED";
  /**
   * Output only. Device manufacturer. Example: Motorola.
   */
  readonly manufacturer?: string;
  /**
   * Output only. MEID number of device if CDMA device; empty otherwise.
   */
  readonly meid?: string;
  /**
   * Output only. Model name of device. Example: Pixel 3.
   */
  readonly model?: string;
  /**
   * Output only. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the Device in
   * format: `devices/{device}`, where device is the unique id assigned to the
   * Device.
   */
  readonly name?: string;
  /**
   * Output only. Mobile or network operator of device, if available.
   */
  readonly networkOperator?: string;
  /**
   * Output only. OS version of the device. Example: Android 8.1.0.
   */
  readonly osVersion?: string;
  /**
   * Output only. Domain name for Google accounts on device. Type for other
   * accounts on device. On Android, will only be populated if
   * |ownership_privilege| is |PROFILE_OWNER| or |DEVICE_OWNER|. Does not
   * include the account signed in to the device policy app if that account's
   * domain has only one account. Examples: "com.example", "xyz.com".
   */
  readonly otherAccounts?: string[];
  /**
   * Output only. Whether the device is owned by the company or an individual
   */
  readonly ownerType?:  | "DEVICE_OWNERSHIP_UNSPECIFIED" | "COMPANY" | "BYOD";
  /**
   * Output only. OS release version. Example: 6.0.
   */
  readonly releaseVersion?: string;
  /**
   * Output only. OS security patch update time on device.
   */
  readonly securityPatchTime?: Date;
  /**
   * Serial Number of device. Example: HT82V1A01076.
   */
  serialNumber?: string;
  /**
   * WiFi MAC addresses of device.
   */
  wifiMacAddresses?: string[];
}

function serializeGoogleAppsCloudidentityDevicesV1Device(data: any): GoogleAppsCloudidentityDevicesV1Device {
  return {
    ...data,
    lastSyncTime: data["lastSyncTime"] !== undefined ? data["lastSyncTime"].toISOString() : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1Device(data: any): GoogleAppsCloudidentityDevicesV1Device {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lastSyncTime: data["lastSyncTime"] !== undefined ? new Date(data["lastSyncTime"]) : undefined,
    securityPatchTime: data["securityPatchTime"] !== undefined ? new Date(data["securityPatchTime"]) : undefined,
  };
}

/**
 * Represents a user's use of a Device in the Cloud Identity Devices API. A
 * DeviceUser is a resource representing a user's use of a Device
 */
export interface GoogleAppsCloudidentityDevicesV1DeviceUser {
  /**
   * Compromised State of the DeviceUser object
   */
  compromisedState?:  | "COMPROMISED_STATE_UNSPECIFIED" | "COMPROMISED" | "NOT_COMPROMISED";
  /**
   * When the user first signed in to the device
   */
  createTime?: Date;
  /**
   * Output only. Most recent time when user registered with this service.
   */
  readonly firstSyncTime?: Date;
  /**
   * Output only. Default locale used on device, in IETF BCP-47 format.
   */
  readonly languageCode?: string;
  /**
   * Output only. Last time when user synced with policies.
   */
  readonly lastSyncTime?: Date;
  /**
   * Output only. Management state of the user on the device.
   */
  readonly managementState?:  | "MANAGEMENT_STATE_UNSPECIFIED" | "WIPING" | "WIPED" | "APPROVED" | "BLOCKED" | "PENDING_APPROVAL" | "UNENROLLED";
  /**
   * Output only. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the
   * DeviceUser in format: `devices/{device}/deviceUsers/{device_user}`, where
   * `device_user` uniquely identifies a user's use of a device.
   */
  readonly name?: string;
  /**
   * Password state of the DeviceUser object
   */
  passwordState?:  | "PASSWORD_STATE_UNSPECIFIED" | "PASSWORD_SET" | "PASSWORD_NOT_SET";
  /**
   * Output only. User agent on the device for this specific user
   */
  readonly userAgent?: string;
  /**
   * Email address of the user registered on the device.
   */
  userEmail?: string;
}

function serializeGoogleAppsCloudidentityDevicesV1DeviceUser(data: any): GoogleAppsCloudidentityDevicesV1DeviceUser {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1DeviceUser(data: any): GoogleAppsCloudidentityDevicesV1DeviceUser {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    firstSyncTime: data["firstSyncTime"] !== undefined ? new Date(data["firstSyncTime"]) : undefined,
    lastSyncTime: data["lastSyncTime"] !== undefined ? new Date(data["lastSyncTime"]) : undefined,
  };
}

/**
 * Response message that is returned in ListClientStates.
 */
export interface GoogleAppsCloudidentityDevicesV1ListClientStatesResponse {
  /**
   * Client states meeting the list restrictions.
   */
  clientStates?: GoogleAppsCloudidentityDevicesV1ClientState[];
  /**
   * Token to retrieve the next page of results. Empty if there are no more
   * results.
   */
  nextPageToken?: string;
}

/**
 * Response message that is returned from the ListDevices method.
 */
export interface GoogleAppsCloudidentityDevicesV1ListDevicesResponse {
  /**
   * Devices meeting the list restrictions.
   */
  devices?: GoogleAppsCloudidentityDevicesV1Device[];
  /**
   * Token to retrieve the next page of results. Empty if there are no more
   * results.
   */
  nextPageToken?: string;
}

function serializeGoogleAppsCloudidentityDevicesV1ListDevicesResponse(data: any): GoogleAppsCloudidentityDevicesV1ListDevicesResponse {
  return {
    ...data,
    devices: data["devices"] !== undefined ? data["devices"].map((item: any) => (serializeGoogleAppsCloudidentityDevicesV1Device(item))) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1ListDevicesResponse(data: any): GoogleAppsCloudidentityDevicesV1ListDevicesResponse {
  return {
    ...data,
    devices: data["devices"] !== undefined ? data["devices"].map((item: any) => (deserializeGoogleAppsCloudidentityDevicesV1Device(item))) : undefined,
  };
}

/**
 * Response message that is returned from the ListDeviceUsers method.
 */
export interface GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse {
  /**
   * Devices meeting the list restrictions.
   */
  deviceUsers?: GoogleAppsCloudidentityDevicesV1DeviceUser[];
  /**
   * Token to retrieve the next page of results. Empty if there are no more
   * results.
   */
  nextPageToken?: string;
}

function serializeGoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse(data: any): GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse {
  return {
    ...data,
    deviceUsers: data["deviceUsers"] !== undefined ? data["deviceUsers"].map((item: any) => (serializeGoogleAppsCloudidentityDevicesV1DeviceUser(item))) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse(data: any): GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse {
  return {
    ...data,
    deviceUsers: data["deviceUsers"] !== undefined ? data["deviceUsers"].map((item: any) => (deserializeGoogleAppsCloudidentityDevicesV1DeviceUser(item))) : undefined,
  };
}

/**
 * Metadata for ListEndpointApps LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata {
}

/**
 * Response containing resource names of the DeviceUsers associated with the
 * caller's credentials.
 */
export interface GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse {
  /**
   * The customer resource name that may be passed back to other Devices API
   * methods such as List, Get, etc.
   */
  customer?: string;
  /**
   * [Resource names](https://cloud.google.com/apis/design/resource_names) of
   * the DeviceUsers in the format:
   * `devices/{device}/deviceUsers/{user_resource}`, where device is the unique
   * ID assigned to a Device and user_resource is the unique user ID
   */
  names?: string[];
  /**
   * Token to retrieve the next page of results. Empty if there are no more
   * results.
   */
  nextPageToken?: string;
}

/**
 * Metadata for SignoutDeviceUser LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata {
}

/**
 * Metadata for UpdateClientState LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata {
}

/**
 * Metadata for UpdateDevice LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata {
}

/**
 * Metadata for WipeDevice LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata {
}

/**
 * Request message for wiping all data on the device.
 */
export interface GoogleAppsCloudidentityDevicesV1WipeDeviceRequest {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
  /**
   * Optional. Specifies if a user is able to factory reset a device after a
   * Device Wipe. On iOS, this is called "Activation Lock", while on Android,
   * this is known as "Factory Reset Protection". If true, this protection will
   * be removed from the device, so that a user can successfully factory reset.
   * If false, the setting is untouched on the device.
   */
  removeResetLock?: boolean;
}

/**
 * Response message for wiping all data on the device.
 */
export interface GoogleAppsCloudidentityDevicesV1WipeDeviceResponse {
  /**
   * Resultant Device object for the action. Note that asset tags will not be
   * returned in the device object.
   */
  device?: GoogleAppsCloudidentityDevicesV1Device;
}

function serializeGoogleAppsCloudidentityDevicesV1WipeDeviceResponse(data: any): GoogleAppsCloudidentityDevicesV1WipeDeviceResponse {
  return {
    ...data,
    device: data["device"] !== undefined ? serializeGoogleAppsCloudidentityDevicesV1Device(data["device"]) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1WipeDeviceResponse(data: any): GoogleAppsCloudidentityDevicesV1WipeDeviceResponse {
  return {
    ...data,
    device: data["device"] !== undefined ? deserializeGoogleAppsCloudidentityDevicesV1Device(data["device"]) : undefined,
  };
}

/**
 * Metadata for WipeDeviceUser LRO.
 */
export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata {
}

/**
 * Request message for starting an account wipe on device.
 */
export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest {
  /**
   * Optional. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the customer.
   * If you're using this API for your own organization, use
   * `customers/my_customer` If you're using this API to manage another
   * organization, use `customers/{customer}`, where customer is the customer to
   * whom the device belongs.
   */
  customer?: string;
}

/**
 * Response message for wiping the user's account from the device.
 */
export interface GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse {
  /**
   * Resultant DeviceUser object for the action.
   */
  deviceUser?: GoogleAppsCloudidentityDevicesV1DeviceUser;
}

function serializeGoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? serializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

function deserializeGoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse(data: any): GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse {
  return {
    ...data,
    deviceUser: data["deviceUser"] !== undefined ? deserializeGoogleAppsCloudidentityDevicesV1DeviceUser(data["deviceUser"]) : undefined,
  };
}

/**
 * A group within the Cloud Identity Groups API. A `Group` is a collection of
 * entities, where each entity is either a user, another group, or a service
 * account.
 */
export interface Group {
  /**
   * Output only. Additional group keys associated with the Group.
   */
  readonly additionalGroupKeys?: EntityKey[];
  /**
   * Output only. The time when the `Group` was created.
   */
  readonly createTime?: Date;
  /**
   * An extended description to help users determine the purpose of a `Group`.
   * Must not be longer than 4,096 characters.
   */
  description?: string;
  /**
   * The display name of the `Group`.
   */
  displayName?: string;
  /**
   * Optional. Dynamic group metadata like queries and status.
   */
  dynamicGroupMetadata?: DynamicGroupMetadata;
  /**
   * Required. The `EntityKey` of the `Group`.
   */
  groupKey?: EntityKey;
  /**
   * Required. One or more label entries that apply to the Group. Currently
   * supported labels contain a key with an empty value. Google Groups are the
   * default type of group and have a label with a key of
   * `cloudidentity.googleapis.com/groups.discussion_forum` and an empty value.
   * Existing Google Groups can have an additional label with a key of
   * `cloudidentity.googleapis.com/groups.security` and an empty value added to
   * them. **This is an immutable change and the security label cannot be
   * removed once added.** Dynamic groups have a label with a key of
   * `cloudidentity.googleapis.com/groups.dynamic`. Identity-mapped groups for
   * Cloud Search have a label with a key of `system/groups/external` and an
   * empty value.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The [resource
   * name](https://cloud.google.com/apis/design/resource_names) of the `Group`.
   * Shall be of the form `groups/{group}`.
   */
  readonly name?: string;
  /**
   * Required. Immutable. The resource name of the entity under which this
   * `Group` resides in the Cloud Identity resource hierarchy. Must be of the
   * form `identitysources/{identity_source}` for external [identity-mapped
   * groups](https://support.google.com/a/answer/9039510) or
   * `customers/{customer_id}` for Google Groups. The `customer_id` must begin
   * with "C" (for example, 'C046psxkn'). [Find your customer ID.]
   * (https://support.google.com/cloudidentity/answer/10070793)
   */
  parent?: string;
  /**
   * Output only. The time when the `Group` was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Message representing a transitive group of a user or a group.
 */
export interface GroupRelation {
  /**
   * Display name for this group.
   */
  displayName?: string;
  /**
   * Resource name for this group.
   */
  group?: string;
  /**
   * Entity key has an id and a namespace. In case of discussion forums, the id
   * will be an email address without a namespace.
   */
  groupKey?: EntityKey;
  /**
   * Labels for Group resource.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The relation between the member and the transitive group.
   */
  relationType?:  | "RELATION_TYPE_UNSPECIFIED" | "DIRECT" | "INDIRECT" | "DIRECT_AND_INDIRECT";
  /**
   * Membership roles of the member for the group.
   */
  roles?: TransitiveMembershipRole[];
}

/**
 * Additional options for CloudIdentity#groupsCreate.
 */
export interface GroupsCreateOptions {
  /**
   * Optional. The initial configuration option for the `Group`.
   */
  initialGroupConfig?:  | "INITIAL_GROUP_CONFIG_UNSPECIFIED" | "WITH_INITIAL_OWNER" | "EMPTY";
}

/**
 * Additional options for CloudIdentity#groupsGetSecuritySettings.
 */
export interface GroupsGetSecuritySettingsOptions {
  /**
   * Field-level read mask of which fields to return. "*" returns all fields.
   * If not specified, all fields will be returned. May only contain the
   * following field: `member_restriction`.
   */
  readMask?: string /* FieldMask */;
}

function serializeGroupsGetSecuritySettingsOptions(data: any): GroupsGetSecuritySettingsOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeGroupsGetSecuritySettingsOptions(data: any): GroupsGetSecuritySettingsOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for CloudIdentity#groupsList.
 */
export interface GroupsListOptions {
  /**
   * The maximum number of results to return. Note that the number of results
   * returned may be less than this value even if there are more available
   * results. To fetch all results, clients must continue calling this method
   * repeatedly until the response no longer contains a `next_page_token`. If
   * unspecified, defaults to 200 for `View.BASIC` and to 50 for `View.FULL`.
   * Must not be greater than 1000 for `View.BASIC` or 500 for `View.FULL`.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous list request, if any.
   */
  pageToken?: string;
  /**
   * Required. The parent resource under which to list all `Group` resources.
   * Must be of the form `identitysources/{identity_source}` for external-
   * identity-mapped groups or `customers/{customer_id}` for Google Groups. The
   * `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your
   * customer ID.] (https://support.google.com/cloudidentity/answer/10070793)
   */
  parent?: string;
  /**
   * The level of detail to be returned. If unspecified, defaults to
   * `View.BASIC`.
   */
  view?:  | "VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for CloudIdentity#groupsLookup.
 */
export interface GroupsLookupOptions {
  /**
   * The ID of the entity. For Google-managed entities, the `id` should be the
   * email address of an existing group or user. For external-identity-mapped
   * entities, the `id` must be a string conforming to the Identity Source's
   * requirements. Must be unique within a `namespace`.
   */
  ["groupKey.id"]?: string;
  /**
   * The namespace in which the entity exists. If not specified, the
   * `EntityKey` represents a Google-managed entity such as a Google user or a
   * Google Group. If specified, the `EntityKey` represents an
   * external-identity-mapped group. The namespace must correspond to an
   * identity source created in Admin Console and must be in the form of
   * `identitysources/{identity_source}`.
   */
  ["groupKey.namespace"]?: string;
}

/**
 * Additional options for
 * CloudIdentity#groupsMembershipsCheckTransitiveMembership.
 */
export interface GroupsMembershipsCheckTransitiveMembershipOptions {
  /**
   * Required. A CEL expression that MUST include member specification. This is
   * a `required` field. Certain groups are uniquely identified by both a
   * 'member_key_id' and a 'member_key_namespace', which requires an additional
   * query input: 'member_key_namespace'. Example query: `member_key_id ==
   * 'member_key_id_value'`
   */
  query?: string;
}

/**
 * Additional options for CloudIdentity#groupsMembershipsGetMembershipGraph.
 */
export interface GroupsMembershipsGetMembershipGraphOptions {
  /**
   * Required. A CEL expression that MUST include member specification AND
   * label(s). Certain groups are uniquely identified by both a 'member_key_id'
   * and a 'member_key_namespace', which requires an additional query input:
   * 'member_key_namespace'. Example query: `member_key_id ==
   * 'member_key_id_value' && in labels`
   */
  query?: string;
}

/**
 * Additional options for CloudIdentity#groupsMembershipsList.
 */
export interface GroupsMembershipsListOptions {
  /**
   * The maximum number of results to return. Note that the number of results
   * returned may be less than this value even if there are more available
   * results. To fetch all results, clients must continue calling this method
   * repeatedly until the response no longer contains a `next_page_token`. If
   * unspecified, defaults to 200 for `GroupView.BASIC` and to 50 for
   * `GroupView.FULL`. Must not be greater than 1000 for `GroupView.BASIC` or
   * 500 for `GroupView.FULL`.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous search request, if
   * any.
   */
  pageToken?: string;
  /**
   * The level of detail to be returned. If unspecified, defaults to
   * `View.BASIC`.
   */
  view?:  | "VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for CloudIdentity#groupsMembershipsLookup.
 */
export interface GroupsMembershipsLookupOptions {
  /**
   * The ID of the entity. For Google-managed entities, the `id` should be the
   * email address of an existing group or user. For external-identity-mapped
   * entities, the `id` must be a string conforming to the Identity Source's
   * requirements. Must be unique within a `namespace`.
   */
  ["memberKey.id"]?: string;
  /**
   * The namespace in which the entity exists. If not specified, the
   * `EntityKey` represents a Google-managed entity such as a Google user or a
   * Google Group. If specified, the `EntityKey` represents an
   * external-identity-mapped group. The namespace must correspond to an
   * identity source created in Admin Console and must be in the form of
   * `identitysources/{identity_source}`.
   */
  ["memberKey.namespace"]?: string;
}

/**
 * Additional options for
 * CloudIdentity#groupsMembershipsSearchTransitiveGroups.
 */
export interface GroupsMembershipsSearchTransitiveGroupsOptions {
  /**
   * The default page size is 200 (max 1000).
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
  /**
   * Required. A CEL expression that MUST include member specification AND
   * label(s). This is a `required` field. Users can search on label attributes
   * of groups. CONTAINS match ('in') is supported on labels. Identity-mapped
   * groups are uniquely identified by both a `member_key_id` and a
   * `member_key_namespace`, which requires an additional query input:
   * `member_key_namespace`. Example query: `member_key_id ==
   * 'member_key_id_value' && in labels` Query may optionally contain equality
   * operators on the parent of the group restricting the search within a
   * particular customer, e.g. `parent == 'customers/{customer_id}'`. The
   * `customer_id` must begin with "C" (for example, 'C046psxkn'). This
   * filtering is only supported for Admins with groups read permissons on the
   * input customer. Example query: `member_key_id == 'member_key_id_value' &&
   * in labels && parent == 'customers/C046psxkn'`
   */
  query?: string;
}

/**
 * Additional options for
 * CloudIdentity#groupsMembershipsSearchTransitiveMemberships.
 */
export interface GroupsMembershipsSearchTransitiveMembershipsOptions {
  /**
   * The default page size is 200 (max 1000).
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudIdentity#groupsPatch.
 */
export interface GroupsPatchOptions {
  /**
   * Required. The names of fields to update. May only contain the following
   * field names: `display_name`, `description`, `labels`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGroupsPatchOptions(data: any): GroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGroupsPatchOptions(data: any): GroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudIdentity#groupsSearch.
 */
export interface GroupsSearchOptions {
  /**
   * The maximum number of results to return. Note that the number of results
   * returned may be less than this value even if there are more available
   * results. To fetch all results, clients must continue calling this method
   * repeatedly until the response no longer contains a `next_page_token`. If
   * unspecified, defaults to 200 for `GroupView.BASIC` and 50 for
   * `GroupView.FULL`. Must not be greater than 1000 for `GroupView.BASIC` or
   * 500 for `GroupView.FULL`.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous search request, if
   * any.
   */
  pageToken?: string;
  /**
   * Required. The search query. * Must be specified in [Common Expression
   * Language](https://opensource.google/projects/cel). * Must contain equality
   * operators on the parent, e.g. `parent == 'customers/{customer_id}'`. The
   * `customer_id` must begin with "C" (for example, 'C046psxkn'). [Find your
   * customer ID.] (https://support.google.com/cloudidentity/answer/10070793) *
   * Can contain optional inclusion operators on `labels` such as
   * `'cloudidentity.googleapis.com/groups.discussion_forum' in labels`). * Can
   * contain an optional equality operator on `domain_name`. e.g. `domain_name
   * == 'abc.com'` * Can contain optional `startsWith/contains/equality`
   * operators on `group_key`, e.g. `group_key.startsWith('dev')`,
   * `group_key.contains('dev'), group_key == 'dev@abc.com'` * Can contain
   * optional `startsWith/contains/equality` operators on `display_name`, such
   * as `display_name.startsWith('dev')` , `display_name.contains('dev')`,
   * `display_name == 'dev'`
   */
  query?: string;
  /**
   * The level of detail to be returned. If unspecified, defaults to
   * `View.BASIC`.
   */
  view?:  | "VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for CloudIdentity#groupsUpdateSecuritySettings.
 */
export interface GroupsUpdateSecuritySettingsOptions {
  /**
   * Required. The fully-qualified names of fields to update. May only contain
   * the following field: `member_restriction.query`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGroupsUpdateSecuritySettingsOptions(data: any): GroupsUpdateSecuritySettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGroupsUpdateSecuritySettingsOptions(data: any): GroupsUpdateSecuritySettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Credential for verifying signatures produced by the Identity Provider.
 */
export interface IdpCredential {
  /**
   * Output only. Information of a DSA public key.
   */
  readonly dsaKeyInfo?: DsaPublicKeyInfo;
  /**
   * Output only. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the
   * credential.
   */
  readonly name?: string;
  /**
   * Output only. Information of a RSA public key.
   */
  readonly rsaKeyInfo?: RsaPublicKeyInfo;
  /**
   * Output only. Time when the `IdpCredential` was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * A [SAML 2.0](https://www.oasis-open.org/standards#samlv2.0) federation
 * between a Google enterprise customer and a SAML identity provider.
 */
export interface InboundSamlSsoProfile {
  /**
   * Immutable. The customer. For example: `customers/C0123abc`.
   */
  customer?: string;
  /**
   * Human-readable name of the SAML SSO profile.
   */
  displayName?: string;
  /**
   * SAML identity provider configuration.
   */
  idpConfig?: SamlIdpConfig;
  /**
   * Output only. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the SAML SSO
   * profile.
   */
  readonly name?: string;
  /**
   * SAML service provider configuration for this SAML SSO profile. These are
   * the service provider details provided by Google that should be configured
   * on the corresponding identity provider.
   */
  spConfig?: SamlSpConfig;
}

/**
 * Additional options for
 * CloudIdentity#inboundSamlSsoProfilesIdpCredentialsList.
 */
export interface InboundSamlSsoProfilesIdpCredentialsListOptions {
  /**
   * The maximum number of `IdpCredential`s to return. The service may return
   * fewer than this value.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListIdpCredentials` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListIdpCredentials` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudIdentity#inboundSamlSsoProfilesList.
 */
export interface InboundSamlSsoProfilesListOptions {
  /**
   * A [Common Expression Language](https://github.com/google/cel-spec)
   * expression to filter the results. The only supported filter is filtering by
   * customer. For example: `customer=="customers/C0123abc"`. Omitting the
   * filter or specifying a filter of `customer=="customers/my_customer"` will
   * return the profiles for the customer that the caller (authenticated user)
   * belongs to.
   */
  filter?: string;
  /**
   * The maximum number of InboundSamlSsoProfiles to return. The service may
   * return fewer than this value. If omitted (or defaulted to zero) the server
   * will use a sensible default. This default may change over time. The maximum
   * allowed value is 100. Requests with page_size greater than that will be
   * silently interpreted as having this maximum value.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListInboundSamlSsoProfiles` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListInboundSamlSsoProfiles` must match the call
   * that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudIdentity#inboundSamlSsoProfilesPatch.
 */
export interface InboundSamlSsoProfilesPatchOptions {
  /**
   * Required. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeInboundSamlSsoProfilesPatchOptions(data: any): InboundSamlSsoProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeInboundSamlSsoProfilesPatchOptions(data: any): InboundSamlSsoProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Targets with "set" SSO assignments and their respective assignments.
 */
export interface InboundSsoAssignment {
  /**
   * Immutable. The customer. For example: `customers/C0123abc`.
   */
  customer?: string;
  /**
   * Output only. [Resource
   * name](https://cloud.google.com/apis/design/resource_names) of the Inbound
   * SSO Assignment.
   */
  readonly name?: string;
  /**
   * Must be zero (which is the default value so it can be omitted) for
   * assignments with `target_org_unit` set and must be greater-than-or-equal-to
   * one for assignments with `target_group` set.
   */
  rank?: number;
  /**
   * SAML SSO details. Must be set if and only if `sso_mode` is set to
   * `SAML_SSO`.
   */
  samlSsoInfo?: SamlSsoInfo;
  /**
   * Assertions about users assigned to an IdP will always be accepted from
   * that IdP. This controls whether/when Google should redirect a user to the
   * IdP. Unset (defaults) is the recommended configuration.
   */
  signInBehavior?: SignInBehavior;
  /**
   * Inbound SSO behavior.
   */
  ssoMode?:  | "SSO_MODE_UNSPECIFIED" | "SSO_OFF" | "SAML_SSO" | "DOMAIN_WIDE_SAML_IF_ENABLED";
  /**
   * Immutable. Must be of the form `groups/{group}`.
   */
  targetGroup?: string;
  /**
   * Immutable. Must be of the form `orgUnits/{org_unit}`.
   */
  targetOrgUnit?: string;
}

/**
 * Additional options for CloudIdentity#inboundSsoAssignmentsList.
 */
export interface InboundSsoAssignmentsListOptions {
  /**
   * A CEL expression to filter the results. The only supported filter is
   * filtering by customer. For example: `customer==customers/C0123abc`.
   * Omitting the filter or specifying a filter of
   * `customer==customers/my_customer` will return the assignments for the
   * customer that the caller (authenticated user) belongs to.
   */
  filter?: string;
  /**
   * The maximum number of assignments to return. The service may return fewer
   * than this value. If omitted (or defaulted to zero) the server will use a
   * sensible default. This default may change over time. The maximum allowed
   * value is 100, though requests with page_size greater than that will be
   * silently interpreted as having this maximum value. This may increase in the
   * futue.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListInboundSsoAssignments` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListInboundSsoAssignments` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudIdentity#inboundSsoAssignmentsPatch.
 */
export interface InboundSsoAssignmentsPatchOptions {
  /**
   * Required. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeInboundSsoAssignmentsPatchOptions(data: any): InboundSsoAssignmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeInboundSsoAssignmentsPatchOptions(data: any): InboundSsoAssignmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response for IsInvitableUser RPC.
 */
export interface IsInvitableUserResponse {
  /**
   * Returns true if the email address is invitable.
   */
  isInvitableUser?: boolean;
}

/**
 * Response message for ListGroups operation.
 */
export interface ListGroupsResponse {
  /**
   * Groups returned in response to list request. The results are not sorted.
   */
  groups?: Group[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results available for listing.
   */
  nextPageToken?: string;
}

/**
 * Response of the InboundSamlSsoProfilesService.ListIdpCredentials method.
 */
export interface ListIdpCredentialsResponse {
  /**
   * The IdpCredentials from the specified InboundSamlSsoProfile.
   */
  idpCredentials?: IdpCredential[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response of the InboundSamlSsoProfilesService.ListInboundSamlSsoProfiles
 * method.
 */
export interface ListInboundSamlSsoProfilesResponse {
  /**
   * List of InboundSamlSsoProfiles.
   */
  inboundSamlSsoProfiles?: InboundSamlSsoProfile[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response of the InboundSsoAssignmentsService.ListInboundSsoAssignments
 * method.
 */
export interface ListInboundSsoAssignmentsResponse {
  /**
   * The assignments.
   */
  inboundSsoAssignments?: InboundSsoAssignment[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * The response message for MembershipsService.ListMemberships.
 */
export interface ListMembershipsResponse {
  /**
   * The `Membership`s under the specified `parent`.
   */
  memberships?: Membership[];
  /**
   * A continuation token to retrieve the next page of results, or empty if
   * there are no more results available.
   */
  nextPageToken?: string;
}

function serializeListMembershipsResponse(data: any): ListMembershipsResponse {
  return {
    ...data,
    memberships: data["memberships"] !== undefined ? data["memberships"].map((item: any) => (serializeMembership(item))) : undefined,
  };
}

function deserializeListMembershipsResponse(data: any): ListMembershipsResponse {
  return {
    ...data,
    memberships: data["memberships"] !== undefined ? data["memberships"].map((item: any) => (deserializeMembership(item))) : undefined,
  };
}

/**
 * Response message for UserInvitation listing request.
 */
export interface ListUserInvitationsResponse {
  /**
   * The token for the next page. If not empty, indicates that there may be
   * more `UserInvitation` resources that match the listing request; this value
   * can be used in a subsequent ListUserInvitationsRequest to get continued
   * results with the current list call.
   */
  nextPageToken?: string;
  /**
   * The list of UserInvitation resources.
   */
  userInvitations?: UserInvitation[];
}

function serializeListUserInvitationsResponse(data: any): ListUserInvitationsResponse {
  return {
    ...data,
    userInvitations: data["userInvitations"] !== undefined ? data["userInvitations"].map((item: any) => (serializeUserInvitation(item))) : undefined,
  };
}

function deserializeListUserInvitationsResponse(data: any): ListUserInvitationsResponse {
  return {
    ...data,
    userInvitations: data["userInvitations"] !== undefined ? data["userInvitations"].map((item: any) => (deserializeUserInvitation(item))) : undefined,
  };
}

/**
 * The response message for GroupsService.LookupGroupName.
 */
export interface LookupGroupNameResponse {
  /**
   * The [resource name](https://cloud.google.com/apis/design/resource_names)
   * of the looked-up `Group`.
   */
  name?: string;
}

/**
 * The response message for MembershipsService.LookupMembershipName.
 */
export interface LookupMembershipNameResponse {
  /**
   * The [resource name](https://cloud.google.com/apis/design/resource_names)
   * of the looked-up `Membership`. Must be of the form
   * `groups/{group}/memberships/{membership}`.
   */
  name?: string;
}

/**
 * Message representing a transitive membership of a group.
 */
export interface MemberRelation {
  /**
   * Resource name for this member.
   */
  member?: string;
  /**
   * Entity key has an id and a namespace. In case of discussion forums, the id
   * will be an email address without a namespace.
   */
  preferredMemberKey?: EntityKey[];
  /**
   * The relation between the group and the transitive member.
   */
  relationType?:  | "RELATION_TYPE_UNSPECIFIED" | "DIRECT" | "INDIRECT" | "DIRECT_AND_INDIRECT";
  /**
   * The membership role details (i.e name of role and expiry time).
   */
  roles?: TransitiveMembershipRole[];
}

/**
 * The definition of MemberRestriction
 */
export interface MemberRestriction {
  /**
   * The evaluated state of this restriction on a group.
   */
  evaluation?: RestrictionEvaluation;
  /**
   * Member Restriction as defined by CEL expression. Supported restrictions
   * are: `member.customer_id` and `member.type`. Valid values for `member.type`
   * are `1`, `2` and `3`. They correspond to USER, SERVICE_ACCOUNT, and GROUP
   * respectively. The value for `member.customer_id` only supports
   * `groupCustomerId()` currently which means the customer id of the group will
   * be used for restriction. Supported operators are `&&`, `||` and `==`,
   * corresponding to AND, OR, and EQUAL. Examples: Allow only service accounts
   * of given customer to be members. `member.type == 2 && member.customer_id ==
   * groupCustomerId()` Allow only users or groups to be members. `member.type
   * == 1 || member.type == 3`
   */
  query?: string;
}

/**
 * A membership within the Cloud Identity Groups API. A `Membership` defines a
 * relationship between a `Group` and an entity belonging to that `Group`,
 * referred to as a "member".
 */
export interface Membership {
  /**
   * Output only. The time when the `Membership` was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The [resource
   * name](https://cloud.google.com/apis/design/resource_names) of the
   * `Membership`. Shall be of the form
   * `groups/{group}/memberships/{membership}`.
   */
  readonly name?: string;
  /**
   * Required. Immutable. The `EntityKey` of the member.
   */
  preferredMemberKey?: EntityKey;
  /**
   * The `MembershipRole`s that apply to the `Membership`. If unspecified,
   * defaults to a single `MembershipRole` with `name` `MEMBER`. Must not
   * contain duplicate `MembershipRole`s with the same `name`.
   */
  roles?: MembershipRole[];
  /**
   * Output only. The type of the membership.
   */
  readonly type?:  | "TYPE_UNSPECIFIED" | "USER" | "SERVICE_ACCOUNT" | "GROUP" | "SHARED_DRIVE" | "OTHER";
  /**
   * Output only. The time when the `Membership` was last updated.
   */
  readonly updateTime?: Date;
}

function serializeMembership(data: any): Membership {
  return {
    ...data,
    roles: data["roles"] !== undefined ? data["roles"].map((item: any) => (serializeMembershipRole(item))) : undefined,
  };
}

function deserializeMembership(data: any): Membership {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    roles: data["roles"] !== undefined ? data["roles"].map((item: any) => (deserializeMembershipRole(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Membership graph's path information as an adjacency list.
 */
export interface MembershipAdjacencyList {
  /**
   * Each edge contains information about the member that belongs to this
   * group. Note: Fields returned here will help identify the specific
   * Membership resource (e.g name, preferred_member_key and role), but may not
   * be a comprehensive list of all fields.
   */
  edges?: Membership[];
  /**
   * Resource name of the group that the members belong to.
   */
  group?: string;
}

function serializeMembershipAdjacencyList(data: any): MembershipAdjacencyList {
  return {
    ...data,
    edges: data["edges"] !== undefined ? data["edges"].map((item: any) => (serializeMembership(item))) : undefined,
  };
}

function deserializeMembershipAdjacencyList(data: any): MembershipAdjacencyList {
  return {
    ...data,
    edges: data["edges"] !== undefined ? data["edges"].map((item: any) => (deserializeMembership(item))) : undefined,
  };
}

/**
 * A membership role within the Cloud Identity Groups API. A `MembershipRole`
 * defines the privileges granted to a `Membership`.
 */
export interface MembershipRole {
  /**
   * The expiry details of the `MembershipRole`. Expiry details are only
   * supported for `MEMBER` `MembershipRoles`. May be set if `name` is `MEMBER`.
   * Must not be set if `name` is any other value.
   */
  expiryDetail?: ExpiryDetail;
  /**
   * The name of the `MembershipRole`. Must be one of `OWNER`, `MANAGER`,
   * `MEMBER`.
   */
  name?: string;
  /**
   * Evaluations of restrictions applied to parent group on this membership.
   */
  restrictionEvaluations?: RestrictionEvaluations;
}

function serializeMembershipRole(data: any): MembershipRole {
  return {
    ...data,
    expiryDetail: data["expiryDetail"] !== undefined ? serializeExpiryDetail(data["expiryDetail"]) : undefined,
  };
}

function deserializeMembershipRole(data: any): MembershipRole {
  return {
    ...data,
    expiryDetail: data["expiryDetail"] !== undefined ? deserializeExpiryDetail(data["expiryDetail"]) : undefined,
  };
}

/**
 * The evaluated state of this restriction.
 */
export interface MembershipRoleRestrictionEvaluation {
  /**
   * Output only. The current state of the restriction
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "COMPLIANT" | "FORWARD_COMPLIANT" | "NON_COMPLIANT" | "EVALUATING";
}

/**
 * The request message for MembershipsService.ModifyMembershipRoles.
 */
export interface ModifyMembershipRolesRequest {
  /**
   * The `MembershipRole`s to be added. Adding or removing roles in the same
   * request as updating roles is not supported. Must not be set if
   * `update_roles_params` is set.
   */
  addRoles?: MembershipRole[];
  /**
   * The `name`s of the `MembershipRole`s to be removed. Adding or removing
   * roles in the same request as updating roles is not supported. It is not
   * possible to remove the `MEMBER` `MembershipRole`. If you wish to delete a
   * `Membership`, call MembershipsService.DeleteMembership instead. Must not
   * contain `MEMBER`. Must not be set if `update_roles_params` is set.
   */
  removeRoles?: string[];
  /**
   * The `MembershipRole`s to be updated. Updating roles in the same request as
   * adding or removing roles is not supported. Must not be set if either
   * `add_roles` or `remove_roles` is set.
   */
  updateRolesParams?: UpdateMembershipRolesParams[];
}

function serializeModifyMembershipRolesRequest(data: any): ModifyMembershipRolesRequest {
  return {
    ...data,
    addRoles: data["addRoles"] !== undefined ? data["addRoles"].map((item: any) => (serializeMembershipRole(item))) : undefined,
    updateRolesParams: data["updateRolesParams"] !== undefined ? data["updateRolesParams"].map((item: any) => (serializeUpdateMembershipRolesParams(item))) : undefined,
  };
}

function deserializeModifyMembershipRolesRequest(data: any): ModifyMembershipRolesRequest {
  return {
    ...data,
    addRoles: data["addRoles"] !== undefined ? data["addRoles"].map((item: any) => (deserializeMembershipRole(item))) : undefined,
    updateRolesParams: data["updateRolesParams"] !== undefined ? data["updateRolesParams"].map((item: any) => (deserializeUpdateMembershipRolesParams(item))) : undefined,
  };
}

/**
 * The response message for MembershipsService.ModifyMembershipRoles.
 */
export interface ModifyMembershipRolesResponse {
  /**
   * The `Membership` resource after modifying its `MembershipRole`s.
   */
  membership?: Membership;
}

function serializeModifyMembershipRolesResponse(data: any): ModifyMembershipRolesResponse {
  return {
    ...data,
    membership: data["membership"] !== undefined ? serializeMembership(data["membership"]) : undefined,
  };
}

function deserializeModifyMembershipRolesResponse(data: any): ModifyMembershipRolesResponse {
  return {
    ...data,
    membership: data["membership"] !== undefined ? deserializeMembership(data["membership"]) : undefined,
  };
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
 * The evaluated state of this restriction.
 */
export interface RestrictionEvaluation {
  /**
   * Output only. The current state of the restriction
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "EVALUATING" | "COMPLIANT" | "FORWARD_COMPLIANT" | "NON_COMPLIANT";
}

/**
 * Evaluations of restrictions applied to parent group on this membership.
 */
export interface RestrictionEvaluations {
  /**
   * Evaluation of the member restriction applied to this membership. Empty if
   * the user lacks permission to view the restriction evaluation.
   */
  memberRestrictionEvaluation?: MembershipRoleRestrictionEvaluation;
}

/**
 * Information of a RSA public key.
 */
export interface RsaPublicKeyInfo {
  /**
   * Key size in bits (size of the modulus).
   */
  keySize?: number;
}

/**
 * SAML IDP (identity provider) configuration.
 */
export interface SamlIdpConfig {
  /**
   * The **Change Password URL** of the identity provider. Users will be sent
   * to this URL when changing their passwords at `myaccount.google.com`. This
   * takes precedence over the change password URL configured at customer-level.
   * Must use `HTTPS`.
   */
  changePasswordUri?: string;
  /**
   * Required. The SAML **Entity ID** of the identity provider.
   */
  entityId?: string;
  /**
   * The **Logout Redirect URL** (sign-out page URL) of the identity provider.
   * When a user clicks the sign-out link on a Google page, they will be
   * redirected to this URL. This is a pure redirect with no attached SAML
   * `LogoutRequest` i.e. SAML single logout is not supported. Must use `HTTPS`.
   */
  logoutRedirectUri?: string;
  /**
   * Required. The `SingleSignOnService` endpoint location (sign-in page URL)
   * of the identity provider. This is the URL where the `AuthnRequest` will be
   * sent. Must use `HTTPS`. Assumed to accept the `HTTP-Redirect` binding.
   */
  singleSignOnServiceUri?: string;
}

/**
 * SAML SP (service provider) configuration.
 */
export interface SamlSpConfig {
  /**
   * Output only. The SAML **Assertion Consumer Service (ACS) URL** to be used
   * for the IDP-initiated login. Assumed to accept response messages via the
   * `HTTP-POST` binding.
   */
  readonly assertionConsumerServiceUri?: string;
  /**
   * Output only. The SAML **Entity ID** for this service provider.
   */
  readonly entityId?: string;
}

/**
 * Details that are applicable when `sso_mode` == `SAML_SSO`.
 */
export interface SamlSsoInfo {
  /**
   * Required. Name of the `InboundSamlSsoProfile` to use. Must be of the form
   * `inboundSamlSsoProfiles/{inbound_saml_sso_profile}`.
   */
  inboundSamlSsoProfile?: string;
}

/**
 * The response message for GroupsService.SearchGroups.
 */
export interface SearchGroupsResponse {
  /**
   * The `Group` resources that match the search query.
   */
  groups?: Group[];
  /**
   * A continuation token to retrieve the next page of results, or empty if
   * there are no more results available.
   */
  nextPageToken?: string;
}

/**
 * The response message for MembershipsService.SearchTransitiveGroups.
 */
export interface SearchTransitiveGroupsResponse {
  /**
   * List of transitive groups satisfying the query.
   */
  memberships?: GroupRelation[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results available for listing.
   */
  nextPageToken?: string;
}

/**
 * The response message for MembershipsService.SearchTransitiveMemberships.
 */
export interface SearchTransitiveMembershipsResponse {
  /**
   * List of transitive members satisfying the query.
   */
  memberships?: MemberRelation[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results.
   */
  nextPageToken?: string;
}

/**
 * The definition of security settings.
 */
export interface SecuritySettings {
  /**
   * The Member Restriction value
   */
  memberRestriction?: MemberRestriction;
  /**
   * Output only. The resource name of the security settings. Shall be of the
   * form `groups/{group_id}/securitySettings`.
   */
  readonly name?: string;
}

/**
 * A request to send email for inviting target user corresponding to the
 * UserInvitation.
 */
export interface SendUserInvitationRequest {
}

/**
 * Controls sign-in behavior.
 */
export interface SignInBehavior {
  /**
   * When to redirect sign-ins to the IdP.
   */
  redirectCondition?:  | "REDIRECT_CONDITION_UNSPECIFIED" | "NEVER";
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
 * Message representing the role of a TransitiveMembership.
 */
export interface TransitiveMembershipRole {
  /**
   * TransitiveMembershipRole in string format. Currently supported
   * TransitiveMembershipRoles: `"MEMBER"`, `"OWNER"`, and `"MANAGER"`.
   */
  role?: string;
}

/**
 * Metadata for UpdateGroup LRO.
 */
export interface UpdateGroupMetadata {
}

/**
 * LRO response metadata for
 * InboundSamlSsoProfilesService.UpdateInboundSamlSsoProfile.
 */
export interface UpdateInboundSamlSsoProfileOperationMetadata {
}

/**
 * LRO response metadata for
 * InboundSsoAssignmentsService.UpdateInboundSsoAssignment.
 */
export interface UpdateInboundSsoAssignmentOperationMetadata {
}

/**
 * Metadata for UpdateMembership LRO.
 */
export interface UpdateMembershipMetadata {
}

/**
 * The details of an update to a `MembershipRole`.
 */
export interface UpdateMembershipRolesParams {
  /**
   * The fully-qualified names of fields to update. May only contain the field
   * `expiry_detail.expire_time`.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * The `MembershipRole`s to be updated. Only `MEMBER` `MembershipRole` can
   * currently be updated.
   */
  membershipRole?: MembershipRole;
}

function serializeUpdateMembershipRolesParams(data: any): UpdateMembershipRolesParams {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    membershipRole: data["membershipRole"] !== undefined ? serializeMembershipRole(data["membershipRole"]) : undefined,
  };
}

function deserializeUpdateMembershipRolesParams(data: any): UpdateMembershipRolesParams {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    membershipRole: data["membershipRole"] !== undefined ? deserializeMembershipRole(data["membershipRole"]) : undefined,
  };
}

/**
 * The `UserInvitation` resource represents an email that can be sent to an
 * unmanaged user account inviting them to join the customer's Google Workspace
 * or Cloud Identity account. An unmanaged account shares an email address
 * domain with the Google Workspace or Cloud Identity account but is not managed
 * by it yet. If the user accepts the `UserInvitation`, the user account will
 * become managed.
 */
export interface UserInvitation {
  /**
   * Number of invitation emails sent to the user.
   */
  mailsSentCount?: bigint;
  /**
   * Shall be of the form
   * `customers/{customer}/userinvitations/{user_email_address}`.
   */
  name?: string;
  /**
   * State of the `UserInvitation`.
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_YET_SENT" | "INVITED" | "ACCEPTED" | "DECLINED";
  /**
   * Time when the `UserInvitation` was last updated.
   */
  updateTime?: Date;
}

function serializeUserInvitation(data: any): UserInvitation {
  return {
    ...data,
    mailsSentCount: data["mailsSentCount"] !== undefined ? String(data["mailsSentCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeUserInvitation(data: any): UserInvitation {
  return {
    ...data,
    mailsSentCount: data["mailsSentCount"] !== undefined ? BigInt(data["mailsSentCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}