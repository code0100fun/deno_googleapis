// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Android Device Provisioning Partner API Client for Deno
 * =======================================================
 * 
 * Automates Android zero-touch enrollment for device resellers, customers, and EMMs.
 * 
 * Docs: https://developers.google.com/zero-touch/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Automates Android zero-touch enrollment for device resellers, customers, and
 * EMMs.
 */
export class AndroidDeviceProvisioning {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://androiddeviceprovisioning.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new configuration. Once created, a customer can apply the
   * configuration to devices.
   *
   * @param parent Required. The customer that manages the configuration. An API resource name in the format `customers/[CUSTOMER_ID]`. This field has custom validation in CreateConfigurationRequestValidator
   */
  async customersConfigurationsCreate(parent: string, req: Configuration): Promise<Configuration> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/configurations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Configuration;
  }

  /**
   * Deletes an unused configuration. The API call fails if the customer has
   * devices with the configuration applied.
   *
   * @param name Required. The configuration to delete. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. If the configuration is applied to any devices, the API call fails.
   */
  async customersConfigurationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the details of a configuration.
   *
   * @param name Required. The configuration to get. An API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`.
   */
  async customersConfigurationsGet(name: string): Promise<Configuration> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Configuration;
  }

  /**
   * Lists a customer's configurations.
   *
   * @param parent Required. The customer that manages the listed configurations. An API resource name in the format `customers/[CUSTOMER_ID]`.
   */
  async customersConfigurationsList(parent: string): Promise<CustomerListConfigurationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/configurations`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomerListConfigurationsResponse;
  }

  /**
   * Updates a configuration's field values.
   *
   * @param name Output only. The API resource name in the format `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. Assigned by the server.
   */
  async customersConfigurationsPatch(name: string, req: Configuration, opts: CustomersConfigurationsPatchOptions = {}): Promise<Configuration> {
    opts = serializeCustomersConfigurationsPatchOptions(opts);
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
    return data as Configuration;
  }

  /**
   * Applies a Configuration to the device to register the device for
   * zero-touch enrollment. After applying a configuration to a device, the
   * device automatically provisions itself on first boot, or next factory
   * reset.
   *
   * @param parent Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`.
   */
  async customersDevicesApplyConfiguration(parent: string, req: CustomerApplyConfigurationRequest): Promise<Empty> {
    req = serializeCustomerApplyConfigurationRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices:applyConfiguration`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Gets the details of a device.
   *
   * @param name Required. The device to get. An API resource name in the format `customers/[CUSTOMER_ID]/devices/[DEVICE_ID]`.
   */
  async customersDevicesGet(name: string): Promise<Device> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Device;
  }

  /**
   * Lists a customer's devices.
   *
   * @param parent Required. The customer managing the devices. An API resource name in the format `customers/[CUSTOMER_ID]`.
   */
  async customersDevicesList(parent: string, opts: CustomersDevicesListOptions = {}): Promise<CustomerListDevicesResponse> {
    opts = serializeCustomersDevicesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices`);
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
    return data as CustomerListDevicesResponse;
  }

  /**
   * Removes a configuration from device.
   *
   * @param parent Required. The customer managing the device in the format `customers/[CUSTOMER_ID]`.
   */
  async customersDevicesRemoveConfiguration(parent: string, req: CustomerRemoveConfigurationRequest): Promise<Empty> {
    req = serializeCustomerRemoveConfigurationRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices:removeConfiguration`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Unclaims a device from a customer and removes it from zero-touch
   * enrollment. After removing a device, a customer must contact their reseller
   * to register the device into zero-touch enrollment again.
   *
   * @param parent Required. The customer managing the device. An API resource name in the format `customers/[CUSTOMER_ID]`.
   */
  async customersDevicesUnclaim(parent: string, req: CustomerUnclaimDeviceRequest): Promise<Empty> {
    req = serializeCustomerUnclaimDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices:unclaim`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Lists the DPCs (device policy controllers) that support zero-touch
   * enrollment.
   *
   * @param parent Required. The customer that can use the DPCs in configurations. An API resource name in the format `customers/[CUSTOMER_ID]`.
   */
  async customersDpcsList(parent: string): Promise<CustomerListDpcsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dpcs`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomerListDpcsResponse;
  }

  /**
   * Lists the user's customer accounts.
   *
   */
  async customersList(opts: CustomersListOptions = {}): Promise<CustomerListCustomersResponse> {
    const url = new URL(`${this.#baseUrl}v1/customers`);
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
    return data as CustomerListCustomersResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Creates a customer for zero-touch enrollment. After the method returns
   * successfully, admin and owner roles can manage devices and EMM configs by
   * calling API methods or using their zero-touch enrollment portal. The
   * customer receives an email that welcomes them to zero-touch enrollment and
   * explains how to sign into the portal.
   *
   * @param parent Required. The parent resource ID in the format `partners/[PARTNER_ID]` that identifies the reseller.
   */
  async partnersCustomersCreate(parent: string, req: CreateCustomerRequest): Promise<Company> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Company;
  }

  /**
   * Lists the customers that are enrolled to the reseller identified by the
   * `partnerId` argument. This list includes customers that the reseller
   * created and customers that enrolled themselves using the portal.
   *
   * @param partnerId Required. The ID of the reseller partner.
   */
  async partnersCustomersList(partnerId: bigint, opts: PartnersCustomersListOptions = {}): Promise<ListCustomersResponse> {
    partnerId = String(partnerId);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/customers`);
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
    return data as ListCustomersResponse;
  }

  /**
   * Claims a device for a customer and adds it to zero-touch enrollment. If
   * the device is already claimed by another customer, the call returns an
   * error.
   *
   * @param partnerId Required. The ID of the reseller partner.
   */
  async partnersDevicesClaim(partnerId: bigint, req: ClaimDeviceRequest): Promise<ClaimDeviceResponse> {
    partnerId = String(partnerId);
    req = serializeClaimDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/devices:claim`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeClaimDeviceResponse(data);
  }

  /**
   * Claims a batch of devices for a customer asynchronously. Adds the devices
   * to zero-touch enrollment. To learn more, read [Long‑running batch
   * operations](/zero-touch/guides/how-it-works#operations).
   *
   * @param partnerId Required. The ID of the reseller partner.
   */
  async partnersDevicesClaimAsync(partnerId: bigint, req: ClaimDevicesRequest): Promise<Operation> {
    partnerId = String(partnerId);
    req = serializeClaimDevicesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/devices:claimAsync`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Finds devices by hardware identifiers, such as IMEI.
   *
   * @param partnerId Required. The ID of the reseller partner.
   */
  async partnersDevicesFindByIdentifier(partnerId: bigint, req: FindDevicesByDeviceIdentifierRequest): Promise<FindDevicesByDeviceIdentifierResponse> {
    partnerId = String(partnerId);
    req = serializeFindDevicesByDeviceIdentifierRequest(req);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/devices:findByIdentifier`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as FindDevicesByDeviceIdentifierResponse;
  }

  /**
   * Finds devices claimed for customers. The results only contain devices
   * registered to the reseller that's identified by the `partnerId` argument.
   * The customer's devices purchased from other resellers don't appear in the
   * results.
   *
   * @param partnerId Required. The ID of the reseller partner.
   */
  async partnersDevicesFindByOwner(partnerId: bigint, req: FindDevicesByOwnerRequest): Promise<FindDevicesByOwnerResponse> {
    partnerId = String(partnerId);
    req = serializeFindDevicesByOwnerRequest(req);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/devices:findByOwner`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as FindDevicesByOwnerResponse;
  }

  /**
   * Gets a device.
   *
   * @param name Required. The device API resource name in the format `partners/[PARTNER_ID]/devices/[DEVICE_ID]`.
   */
  async partnersDevicesGet(name: string): Promise<Device> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Device;
  }

  /**
   * Updates reseller metadata associated with the device. Android devices
   * only.
   *
   * @param deviceId Required. The ID of the device.
   * @param metadataOwnerId Required. The owner of the newly set metadata. Set this to the partner ID.
   */
  async partnersDevicesMetadata(deviceId: bigint, metadataOwnerId: bigint, req: UpdateDeviceMetadataRequest): Promise<DeviceMetadata> {
    deviceId = String(deviceId);
    metadataOwnerId = String(metadataOwnerId);
    const url = new URL(`${this.#baseUrl}v1/partners/${ metadataOwnerId }/devices/${ deviceId }/metadata`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DeviceMetadata;
  }

  /**
   * Unclaims a device from a customer and removes it from zero-touch
   * enrollment.
   *
   * @param partnerId Required. The ID of the reseller partner.
   */
  async partnersDevicesUnclaim(partnerId: bigint, req: UnclaimDeviceRequest): Promise<Empty> {
    partnerId = String(partnerId);
    req = serializeUnclaimDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/devices:unclaim`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Unclaims a batch of devices for a customer asynchronously. Removes the
   * devices from zero-touch enrollment. To learn more, read [Long‑running batch
   * operations](/zero-touch/guides/how-it-works#operations).
   *
   * @param partnerId Required. The reseller partner ID.
   */
  async partnersDevicesUnclaimAsync(partnerId: bigint, req: UnclaimDevicesRequest): Promise<Operation> {
    partnerId = String(partnerId);
    req = serializeUnclaimDevicesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/devices:unclaimAsync`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the reseller metadata attached to a batch of devices. This method
   * updates devices asynchronously and returns an `Operation` that can be used
   * to track progress. Read [Long‑running batch
   * operations](/zero-touch/guides/how-it-works#operations). Android Devices
   * only.
   *
   * @param partnerId Required. The reseller partner ID.
   */
  async partnersDevicesUpdateMetadataAsync(partnerId: bigint, req: UpdateDeviceMetadataInBatchRequest): Promise<Operation> {
    partnerId = String(partnerId);
    req = serializeUpdateDeviceMetadataInBatchRequest(req);
    const url = new URL(`${this.#baseUrl}v1/partners/${ partnerId }/devices:updateMetadataAsync`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists the customers of the vendor.
   *
   * @param parent Required. The resource name in the format `partners/[PARTNER_ID]/vendors/[VENDOR_ID]`.
   */
  async partnersVendorsCustomersList(parent: string, opts: PartnersVendorsCustomersListOptions = {}): Promise<ListVendorCustomersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customers`);
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
    return data as ListVendorCustomersResponse;
  }

  /**
   * Lists the vendors of the partner.
   *
   * @param parent Required. The resource name in the format `partners/[PARTNER_ID]`.
   */
  async partnersVendorsList(parent: string, opts: PartnersVendorsListOptions = {}): Promise<ListVendorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/vendors`);
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
    return data as ListVendorsResponse;
  }
}

/**
 * Request message to claim a device on behalf of a customer.
 */
export interface ClaimDeviceRequest {
  /**
   * The ID of the customer for whom the device is being claimed.
   */
  customerId?: bigint;
  /**
   * Required. Required. The device identifier of the device to claim.
   */
  deviceIdentifier?: DeviceIdentifier;
  /**
   * Optional. The metadata to attach to the device.
   */
  deviceMetadata?: DeviceMetadata;
  /**
   * The Google Workspace customer ID.
   */
  googleWorkspaceCustomerId?: string;
  /**
   * Optional. Must and can only be set for Chrome OS devices.
   */
  preProvisioningToken?: string;
  /**
   * Required. The section type of the device's provisioning record.
   */
  sectionType?:  | "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH";
  /**
   * Optional. Must and can only be set when DeviceProvisioningSectionType is
   * SECTION_TYPE_SIM_LOCK. The unique identifier of the SimLock profile.
   */
  simlockProfileId?: bigint;
}

function serializeClaimDeviceRequest(data: any): ClaimDeviceRequest {
  return {
    ...data,
    customerId: data["customerId"] !== undefined ? String(data["customerId"]) : undefined,
    simlockProfileId: data["simlockProfileId"] !== undefined ? String(data["simlockProfileId"]) : undefined,
  };
}

function deserializeClaimDeviceRequest(data: any): ClaimDeviceRequest {
  return {
    ...data,
    customerId: data["customerId"] !== undefined ? BigInt(data["customerId"]) : undefined,
    simlockProfileId: data["simlockProfileId"] !== undefined ? BigInt(data["simlockProfileId"]) : undefined,
  };
}

/**
 * Response message containing device id of the claim.
 */
export interface ClaimDeviceResponse {
  /**
   * The device ID of the claimed device.
   */
  deviceId?: bigint;
  /**
   * The resource name of the device in the format
   * `partners/[PARTNER_ID]/devices/[DEVICE_ID]`.
   */
  deviceName?: string;
}

function serializeClaimDeviceResponse(data: any): ClaimDeviceResponse {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? String(data["deviceId"]) : undefined,
  };
}

function deserializeClaimDeviceResponse(data: any): ClaimDeviceResponse {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? BigInt(data["deviceId"]) : undefined,
  };
}

/**
 * Request to claim devices asynchronously in batch. Claiming a device adds the
 * device to zero-touch enrollment and shows the device in the customer's view
 * of the portal.
 */
export interface ClaimDevicesRequest {
  /**
   * Required. A list of device claims.
   */
  claims?: PartnerClaim[];
}

function serializeClaimDevicesRequest(data: any): ClaimDevicesRequest {
  return {
    ...data,
    claims: data["claims"] !== undefined ? data["claims"].map((item: any) => (serializePartnerClaim(item))) : undefined,
  };
}

function deserializeClaimDevicesRequest(data: any): ClaimDevicesRequest {
  return {
    ...data,
    claims: data["claims"] !== undefined ? data["claims"].map((item: any) => (deserializePartnerClaim(item))) : undefined,
  };
}

/**
 * A reseller, vendor, or customer in the zero-touch reseller and customer
 * APIs.
 */
export interface Company {
  /**
   * Optional. Email address of customer's users in the admin role. Each email
   * address must be associated with a Google Account.
   */
  adminEmails?: string[];
  /**
   * Output only. The ID of the company. Assigned by the server.
   */
  readonly companyId?: bigint;
  /**
   * Required. The name of the company. For example _XYZ Corp_. Displayed to
   * the company's employees in the zero-touch enrollment portal.
   */
  companyName?: string;
  /**
   * Output only. The Google Workspace account associated with this customer.
   * Only used for customer Companies.
   */
  readonly googleWorkspaceAccount?: GoogleWorkspaceAccount;
  /**
   * Input only. The preferred locale of the customer represented as a BCP47
   * language code. This field is validated on input and requests containing
   * unsupported language codes will be rejected. Supported language codes:
   * Arabic (ar) Chinese (Hong Kong) (zh-HK) Chinese (Simplified) (zh-CN)
   * Chinese (Traditional) (zh-TW) Czech (cs) Danish (da) Dutch (nl) English
   * (UK) (en-GB) English (US) (en-US) Filipino (fil) Finnish (fi) French (fr)
   * German (de) Hebrew (iw) Hindi (hi) Hungarian (hu) Indonesian (id) Italian
   * (it) Japanese (ja) Korean (ko) Norwegian (Bokmal) (no) Polish (pl)
   * Portuguese (Brazil) (pt-BR) Portuguese (Portugal) (pt-PT) Russian (ru)
   * Spanish (es) Spanish (Latin America) (es-419) Swedish (sv) Thai (th)
   * Turkish (tr) Ukrainian (uk) Vietnamese (vi)
   */
  languageCode?: string;
  /**
   * Output only. The API resource name of the company. The resource name is
   * one of the following formats: *
   * `partners/[PARTNER_ID]/customers/[CUSTOMER_ID]` *
   * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]` *
   * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]/customers/[CUSTOMER_ID]`
   * Assigned by the server.
   */
  readonly name?: string;
  /**
   * Required. Input only. Email address of customer's users in the owner role.
   * At least one `owner_email` is required. Owners share the same access as
   * admins but can also add, delete, and edit your organization's portal users.
   */
  ownerEmails?: string[];
  /**
   * Input only. If set to true, welcome email will not be sent to the
   * customer. It is recommended to skip the welcome email if devices will be
   * claimed with additional DEVICE_PROTECTION service, as the customer will
   * receive separate emails at device claim time. This field is ignored if this
   * is not a Zero-touch customer.
   */
  skipWelcomeEmail?: boolean;
  /**
   * Output only. Whether any user from the company has accepted the latest
   * Terms of Service (ToS). See TermsStatus.
   */
  readonly termsStatus?:  | "TERMS_STATUS_UNSPECIFIED" | "TERMS_STATUS_NOT_ACCEPTED" | "TERMS_STATUS_ACCEPTED" | "TERMS_STATUS_STALE";
}

/**
 * A configuration collects the provisioning options for Android devices. Each
 * configuration combines the following: * The EMM device policy controller
 * (DPC) installed on the devices. * EMM policies enforced on the devices. *
 * Metadata displayed on the device to help users during setup. Customers can
 * add as many configurations as they need. However, zero-touch enrollment works
 * best when a customer sets a default configuration that's applied to any new
 * devices the organization purchases.
 */
export interface Configuration {
  /**
   * Required. The name of the organization. Zero-touch enrollment shows this
   * organization name to device users during device provisioning.
   */
  companyName?: string;
  /**
   * Output only. The ID of the configuration. Assigned by the server.
   */
  readonly configurationId?: bigint;
  /**
   * Required. A short name that describes the configuration's purpose. For
   * example, _Sales team_ or _Temporary employees_. The zero-touch enrollment
   * portal displays this name to IT admins.
   */
  configurationName?: string;
  /**
   * Required. The email address that device users can contact to get help.
   * Zero-touch enrollment shows this email address to device users before
   * device provisioning. The value is validated on input.
   */
  contactEmail?: string;
  /**
   * Required. The telephone number that device users can call, using another
   * device, to get help. Zero-touch enrollment shows this number to device
   * users before device provisioning. Accepts numerals, spaces, the plus sign,
   * hyphens, and parentheses.
   */
  contactPhone?: string;
  /**
   * A message, containing one or two sentences, to help device users get help
   * or give them more details about what’s happening to their device.
   * Zero-touch enrollment shows this message before the device is provisioned.
   */
  customMessage?: string;
  /**
   * The JSON-formatted EMM provisioning extras that are passed to the DPC.
   */
  dpcExtras?: string;
  /**
   * Required. The resource name of the selected DPC (device policy controller)
   * in the format `customers/[CUSTOMER_ID]/dpcs/*`. To list the supported DPCs,
   * call `customers.dpcs.list`.
   */
  dpcResourcePath?: string;
  /**
   * Required. Whether this is the default configuration that zero-touch
   * enrollment applies to any new devices the organization purchases in the
   * future. Only one customer configuration can be the default. Setting this
   * value to `true`, changes the previous default configuration's `isDefault`
   * value to `false`.
   */
  isDefault?: boolean;
  /**
   * Output only. The API resource name in the format
   * `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`. Assigned by
   * the server.
   */
  readonly name?: string;
}

/**
 * Request message to create a customer.
 */
export interface CreateCustomerRequest {
  /**
   * Required. The company data to populate the new customer. Must contain a
   * value for `companyName` and at least one `owner_email` that's associated
   * with a Google Account. The values for `companyId` and `name` must be empty.
   */
  customer?: Company;
}

/**
 * Request message for customer to assign a configuration to device.
 */
export interface CustomerApplyConfigurationRequest {
  /**
   * Required. The configuration applied to the device in the format
   * `customers/[CUSTOMER_ID]/configurations/[CONFIGURATION_ID]`.
   */
  configuration?: string;
  /**
   * Required. The device the configuration is applied to. There are custom
   * validations in ApplyConfigurationRequestValidator
   */
  device?: DeviceReference;
}

function serializeCustomerApplyConfigurationRequest(data: any): CustomerApplyConfigurationRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? serializeDeviceReference(data["device"]) : undefined,
  };
}

function deserializeCustomerApplyConfigurationRequest(data: any): CustomerApplyConfigurationRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? deserializeDeviceReference(data["device"]) : undefined,
  };
}

/**
 * Response message of customer's listing configuration.
 */
export interface CustomerListConfigurationsResponse {
  /**
   * The configurations.
   */
  configurations?: Configuration[];
}

/**
 * Response message for listing my customers.
 */
export interface CustomerListCustomersResponse {
  /**
   * The customer accounts the calling user is a member of.
   */
  customers?: Company[];
  /**
   * A token used to access the next page of results. Omitted if no further
   * results are available.
   */
  nextPageToken?: string;
}

/**
 * Response message of customer's liting devices.
 */
export interface CustomerListDevicesResponse {
  /**
   * The customer's devices.
   */
  devices?: Device[];
  /**
   * A token used to access the next page of results. Omitted if no further
   * results are available.
   */
  nextPageToken?: string;
}

/**
 * Response message of customer's listing DPCs.
 */
export interface CustomerListDpcsResponse {
  /**
   * The list of DPCs available to the customer that support zero-touch
   * enrollment.
   */
  dpcs?: Dpc[];
}

/**
 * Request message for customer to remove the configuration from device.
 */
export interface CustomerRemoveConfigurationRequest {
  /**
   * Required. The device to remove the configuration from. There are custom
   * validations in RemoveConfigurationRequestValidator
   */
  device?: DeviceReference;
}

function serializeCustomerRemoveConfigurationRequest(data: any): CustomerRemoveConfigurationRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? serializeDeviceReference(data["device"]) : undefined,
  };
}

function deserializeCustomerRemoveConfigurationRequest(data: any): CustomerRemoveConfigurationRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? deserializeDeviceReference(data["device"]) : undefined,
  };
}

/**
 * Additional options for
 * AndroidDeviceProvisioning#customersConfigurationsPatch.
 */
export interface CustomersConfigurationsPatchOptions {
  /**
   * Required. The field mask applied to the target `Configuration` before
   * updating the fields. To learn more about using field masks, read
   * [FieldMask](/protocol-buffers/docs/reference/google.protobuf#fieldmask) in
   * the Protocol Buffers documentation.
   */
  updateMask?: string /* FieldMask */;
}

function serializeCustomersConfigurationsPatchOptions(data: any): CustomersConfigurationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCustomersConfigurationsPatchOptions(data: any): CustomersConfigurationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AndroidDeviceProvisioning#customersDevicesList.
 */
export interface CustomersDevicesListOptions {
  /**
   * The maximum number of devices to show in a page of results. Must be
   * between 1 and 100 inclusive.
   */
  pageSize?: bigint;
  /**
   * A token specifying which result page to return.
   */
  pageToken?: string;
}

function serializeCustomersDevicesListOptions(data: any): CustomersDevicesListOptions {
  return {
    ...data,
    pageSize: data["pageSize"] !== undefined ? String(data["pageSize"]) : undefined,
  };
}

function deserializeCustomersDevicesListOptions(data: any): CustomersDevicesListOptions {
  return {
    ...data,
    pageSize: data["pageSize"] !== undefined ? BigInt(data["pageSize"]) : undefined,
  };
}

/**
 * Additional options for AndroidDeviceProvisioning#customersList.
 */
export interface CustomersListOptions {
  /**
   * The maximum number of customers to show in a page of results. A number
   * between 1 and 100 (inclusive).
   */
  pageSize?: number;
  /**
   * A token specifying which result page to return. This field has custom
   * validations in ListCustomersRequestValidator
   */
  pageToken?: string;
}

/**
 * Request message for customer to unclaim a device.
 */
export interface CustomerUnclaimDeviceRequest {
  /**
   * Required. The device to unclaim. There are custom validations in
   * UnclaimDeviceRequestValidator.
   */
  device?: DeviceReference;
}

function serializeCustomerUnclaimDeviceRequest(data: any): CustomerUnclaimDeviceRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? serializeDeviceReference(data["device"]) : undefined,
  };
}

function deserializeCustomerUnclaimDeviceRequest(data: any): CustomerUnclaimDeviceRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? deserializeDeviceReference(data["device"]) : undefined,
  };
}

/**
 * An Android or Chrome OS device registered for zero-touch enrollment.
 */
export interface Device {
  /**
   * Output only. The provisioning claims for a device. Devices claimed for
   * zero-touch enrollment have a claim with the type `SECTION_TYPE_ZERO_TOUCH`.
   * Call `partners.devices.unclaim` or `partners.devices.unclaimAsync` to
   * remove the device from zero-touch enrollment.
   */
  readonly claims?: DeviceClaim[];
  /**
   * Not available to resellers.
   */
  configuration?: string;
  /**
   * Output only. The ID of the device. Assigned by the server.
   */
  readonly deviceId?: bigint;
  /**
   * The hardware IDs that identify a manufactured device. To learn more, read
   * [Identifiers](https://developers.google.com/zero-touch/guides/identifiers).
   */
  deviceIdentifier?: DeviceIdentifier;
  /**
   * The metadata attached to the device. Structured as key-value pairs. To
   * learn more, read [Device
   * metadata](https://developers.google.com/zero-touch/guides/metadata).
   */
  deviceMetadata?: DeviceMetadata;
  /**
   * Output only. The API resource name in the format
   * `partners/[PARTNER_ID]/devices/[DEVICE_ID]`. Assigned by the server.
   */
  readonly name?: string;
}

/**
 * A record of a device claimed by a reseller for a customer. Devices claimed
 * for zero-touch enrollment have a claim with the type
 * `SECTION_TYPE_ZERO_TOUCH`. To learn more, read [Claim devices for
 * customers](/zero-touch/guides/how-it-works#claim).
 */
export interface DeviceClaim {
  /**
   * The Additional service registered for the device.
   */
  additionalService?:  | "ADDITIONAL_SERVICE_UNSPECIFIED" | "DEVICE_PROTECTION";
  /**
   * The ID of the Google Workspace account that owns the Chrome OS device.
   */
  googleWorkspaceCustomerId?: string;
  /**
   * The ID of the Customer that purchased the device.
   */
  ownerCompanyId?: bigint;
  /**
   * The ID of the reseller that claimed the device.
   */
  resellerId?: bigint;
  /**
   * Output only. The type of claim made on the device.
   */
  readonly sectionType?:  | "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH";
  /**
   * The timestamp when the device will exit ‘vacation mode’. This value is
   * present iff the device is in 'vacation mode'.
   */
  vacationModeExpireTime?: Date;
  /**
   * The timestamp when the device was put into ‘vacation mode’. This value is
   * present iff the device is in 'vacation mode'.
   */
  vacationModeStartTime?: Date;
}

function serializeDeviceClaim(data: any): DeviceClaim {
  return {
    ...data,
    ownerCompanyId: data["ownerCompanyId"] !== undefined ? String(data["ownerCompanyId"]) : undefined,
    resellerId: data["resellerId"] !== undefined ? String(data["resellerId"]) : undefined,
    vacationModeExpireTime: data["vacationModeExpireTime"] !== undefined ? data["vacationModeExpireTime"].toISOString() : undefined,
    vacationModeStartTime: data["vacationModeStartTime"] !== undefined ? data["vacationModeStartTime"].toISOString() : undefined,
  };
}

function deserializeDeviceClaim(data: any): DeviceClaim {
  return {
    ...data,
    ownerCompanyId: data["ownerCompanyId"] !== undefined ? BigInt(data["ownerCompanyId"]) : undefined,
    resellerId: data["resellerId"] !== undefined ? BigInt(data["resellerId"]) : undefined,
    vacationModeExpireTime: data["vacationModeExpireTime"] !== undefined ? new Date(data["vacationModeExpireTime"]) : undefined,
    vacationModeStartTime: data["vacationModeStartTime"] !== undefined ? new Date(data["vacationModeStartTime"]) : undefined,
  };
}

/**
 * Encapsulates hardware and product IDs to identify a manufactured device. To
 * understand requirements on identifier sets, read
 * [Identifiers](https://developers.google.com/zero-touch/guides/identifiers).
 */
export interface DeviceIdentifier {
  /**
   * An identifier provided by OEMs, carried through the production and sales
   * process. Only applicable to Chrome OS devices.
   */
  chromeOsAttestedDeviceId?: string;
  /**
   * The type of the device
   */
  deviceType?:  | "DEVICE_TYPE_UNSPECIFIED" | "DEVICE_TYPE_ANDROID" | "DEVICE_TYPE_CHROME_OS";
  /**
   * The device’s IMEI number. Validated on input.
   */
  imei?: string;
  /**
   * The device manufacturer’s name. Matches the device's built-in value
   * returned from `android.os.Build.MANUFACTURER`. Allowed values are listed in
   * [Android
   * manufacturers](/zero-touch/resources/manufacturer-names#manufacturers-names).
   */
  manufacturer?: string;
  /**
   * The device’s MEID number.
   */
  meid?: string;
  /**
   * The device model's name. Allowed values are listed in [Android
   * models](/zero-touch/resources/manufacturer-names#model-names) and [Chrome
   * OS
   * models](https://support.google.com/chrome/a/answer/10130175#identify_compatible).
   */
  model?: string;
  /**
   * The manufacturer's serial number for the device. This value might not be
   * unique across different device models.
   */
  serialNumber?: string;
}

/**
 * Metadata entries that can be attached to a `Device`. To learn more, read
 * [Device metadata](https://developers.google.com/zero-touch/guides/metadata).
 */
export interface DeviceMetadata {
  /**
   * Metadata entries recorded as key-value pairs.
   */
  entries?: {
    [key: string]: string
  };
}

/**
 * A `DeviceReference` is an API abstraction that lets you supply a _device_
 * argument to a method using one of the following identifier types: * A numeric
 * API resource ID. * Real-world hardware IDs, such as IMEI number, belonging to
 * the manufactured device. Methods that operate on devices take a
 * `DeviceReference` as a parameter type because it's more flexible for the
 * caller. To learn more about device identifiers, read
 * [Identifiers](https://developers.google.com/zero-touch/guides/identifiers).
 */
export interface DeviceReference {
  /**
   * The ID of the device.
   */
  deviceId?: bigint;
  /**
   * The hardware IDs of the device.
   */
  deviceIdentifier?: DeviceIdentifier;
}

function serializeDeviceReference(data: any): DeviceReference {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? String(data["deviceId"]) : undefined,
  };
}

function deserializeDeviceReference(data: any): DeviceReference {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? BigInt(data["deviceId"]) : undefined,
  };
}

/**
 * Tracks the status of a long-running operation to asynchronously update a
 * batch of reseller metadata attached to devices. To learn more, read
 * [Long‑running batch operations](/zero-touch/guides/how-it-works#operations).
 */
export interface DevicesLongRunningOperationMetadata {
  /**
   * The number of metadata updates in the operation. This might be different
   * from the number of updates in the request if the API can't parse some of
   * the updates.
   */
  devicesCount?: number;
  /**
   * The processing status of the operation.
   */
  processingStatus?:  | "BATCH_PROCESS_STATUS_UNSPECIFIED" | "BATCH_PROCESS_PENDING" | "BATCH_PROCESS_IN_PROGRESS" | "BATCH_PROCESS_PROCESSED";
  /**
   * The processing progress of the operation. Measured as a number from 0 to
   * 100. A value of 10O doesn't always mean the operation completed—check for
   * the inclusion of a `done` field.
   */
  progress?: number;
}

/**
 * Tracks the status of a long-running operation to claim, unclaim, or attach
 * metadata to devices. To learn more, read [Long‑running batch
 * operations](/zero-touch/guides/how-it-works#operations).
 */
export interface DevicesLongRunningOperationResponse {
  /**
   * The processing status for each device in the operation. One
   * `PerDeviceStatus` per device. The list order matches the items in the
   * original request.
   */
  perDeviceStatus?: OperationPerDevice[];
  /**
   * A summary of how many items in the operation the server processed
   * successfully. Updated as the operation progresses.
   */
  successCount?: number;
}

function serializeDevicesLongRunningOperationResponse(data: any): DevicesLongRunningOperationResponse {
  return {
    ...data,
    perDeviceStatus: data["perDeviceStatus"] !== undefined ? data["perDeviceStatus"].map((item: any) => (serializeOperationPerDevice(item))) : undefined,
  };
}

function deserializeDevicesLongRunningOperationResponse(data: any): DevicesLongRunningOperationResponse {
  return {
    ...data,
    perDeviceStatus: data["perDeviceStatus"] !== undefined ? data["perDeviceStatus"].map((item: any) => (deserializeOperationPerDevice(item))) : undefined,
  };
}

/**
 * An EMM's DPC ([device policy
 * controller](http://developer.android.com/work/dpc/build-dpc.html)).
 * Zero-touch enrollment installs a DPC (listed in the `Configuration`) on a
 * device to maintain the customer's mobile policies. All the DPCs listed by the
 * API support zero-touch enrollment and are available in Google Play.
 */
export interface Dpc {
  /**
   * Output only. The title of the DPC app in Google Play. For example, _Google
   * Apps Device Policy_. Useful in an application's user interface.
   */
  readonly dpcName?: string;
  /**
   * Output only. The API resource name in the format
   * `customers/[CUSTOMER_ID]/dpcs/[DPC_ID]`. Assigned by the server. To
   * maintain a reference to a DPC across customer accounts, persist and match
   * the last path component (`DPC_ID`).
   */
  readonly name?: string;
  /**
   * Output only. The DPC's Android application ID that looks like a Java
   * package name. Zero-touch enrollment installs the DPC app onto a device
   * using this identifier.
   */
  readonly packageName?: string;
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
 * Request to find devices.
 */
export interface FindDevicesByDeviceIdentifierRequest {
  /**
   * Required. Required. The device identifier to search for.
   */
  deviceIdentifier?: DeviceIdentifier;
  /**
   * Required. The maximum number of devices to show in a page of results. Must
   * be between 1 and 100 inclusive.
   */
  limit?: bigint;
  /**
   * A token specifying which result page to return.
   */
  pageToken?: string;
}

function serializeFindDevicesByDeviceIdentifierRequest(data: any): FindDevicesByDeviceIdentifierRequest {
  return {
    ...data,
    limit: data["limit"] !== undefined ? String(data["limit"]) : undefined,
  };
}

function deserializeFindDevicesByDeviceIdentifierRequest(data: any): FindDevicesByDeviceIdentifierRequest {
  return {
    ...data,
    limit: data["limit"] !== undefined ? BigInt(data["limit"]) : undefined,
  };
}

/**
 * Response containing found devices.
 */
export interface FindDevicesByDeviceIdentifierResponse {
  /**
   * Found devices.
   */
  devices?: Device[];
  /**
   * A token used to access the next page of results. Omitted if no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * The total count of items in the list irrespective of pagination.
   */
  totalSize?: number;
}

/**
 * Request to find devices by customers.
 */
export interface FindDevicesByOwnerRequest {
  /**
   * The list of customer IDs to search for.
   */
  customerId?: bigint[];
  /**
   * The list of IDs of Google Workspace accounts to search for.
   */
  googleWorkspaceCustomerId?: string[];
  /**
   * Required. The maximum number of devices to show in a page of results. Must
   * be between 1 and 100 inclusive.
   */
  limit?: bigint;
  /**
   * A token specifying which result page to return.
   */
  pageToken?: string;
  /**
   * Required. The section type of the device's provisioning record.
   */
  sectionType?:  | "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH";
}

function serializeFindDevicesByOwnerRequest(data: any): FindDevicesByOwnerRequest {
  return {
    ...data,
    customerId: data["customerId"] !== undefined ? data["customerId"].map((item: any) => (String(item))) : undefined,
    limit: data["limit"] !== undefined ? String(data["limit"]) : undefined,
  };
}

function deserializeFindDevicesByOwnerRequest(data: any): FindDevicesByOwnerRequest {
  return {
    ...data,
    customerId: data["customerId"] !== undefined ? data["customerId"].map((item: any) => (BigInt(item))) : undefined,
    limit: data["limit"] !== undefined ? BigInt(data["limit"]) : undefined,
  };
}

/**
 * Response containing found devices.
 */
export interface FindDevicesByOwnerResponse {
  /**
   * The customer's devices.
   */
  devices?: Device[];
  /**
   * A token used to access the next page of results. Omitted if no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * The total count of items in the list irrespective of pagination.
   */
  totalSize?: number;
}

/**
 * A Google Workspace customer.
 */
export interface GoogleWorkspaceAccount {
  /**
   * Required. The customer ID.
   */
  customerId?: string;
  /**
   * Output only. The pre-provisioning tokens previously used to claim devices.
   */
  readonly preProvisioningTokens?: string[];
}

/**
 * Response message of all customers related to this partner.
 */
export interface ListCustomersResponse {
  /**
   * List of customers related to this reseller partner.
   */
  customers?: Company[];
  /**
   * A token to retrieve the next page of results. Omitted if no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * The total count of items in the list irrespective of pagination.
   */
  totalSize?: number;
}

/**
 * Response message to list customers of the vendor.
 */
export interface ListVendorCustomersResponse {
  /**
   * List of customers of the vendor.
   */
  customers?: Company[];
  /**
   * A token to retrieve the next page of results. Omitted if no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * The total count of items in the list irrespective of pagination.
   */
  totalSize?: number;
}

/**
 * Response message to list vendors of the partner.
 */
export interface ListVendorsResponse {
  /**
   * A token to retrieve the next page of results. Omitted if no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * The total count of items in the list irrespective of pagination.
   */
  totalSize?: number;
  /**
   * List of vendors of the reseller partner. Fields `name`, `companyId` and
   * `companyName` are populated to the Company object.
   */
  vendors?: Company[];
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
   * This field will always be not set if the operation is created by
   * `claimAsync`, `unclaimAsync`, or `updateMetadataAsync`. In this case, error
   * information for each device is set in
   * `response.perDeviceStatus.result.status`.
   */
  error?: Status;
  /**
   * This field will contain a `DevicesLongRunningOperationMetadata` object if
   * the operation is created by `claimAsync`, `unclaimAsync`, or
   * `updateMetadataAsync`.
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
   * This field will contain a `DevicesLongRunningOperationResponse` object if
   * the operation is created by `claimAsync`, `unclaimAsync`, or
   * `updateMetadataAsync`.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * A task for each device in the operation. Corresponds to each device change
 * in the request.
 */
export interface OperationPerDevice {
  /**
   * A copy of the original device-claim request received by the server.
   */
  claim?: PartnerClaim;
  /**
   * The processing result for each device.
   */
  result?: PerDeviceStatusInBatch;
  /**
   * A copy of the original device-unclaim request received by the server.
   */
  unclaim?: PartnerUnclaim;
  /**
   * A copy of the original metadata-update request received by the server.
   */
  updateMetadata?: UpdateMetadataArguments;
}

function serializeOperationPerDevice(data: any): OperationPerDevice {
  return {
    ...data,
    claim: data["claim"] !== undefined ? serializePartnerClaim(data["claim"]) : undefined,
    result: data["result"] !== undefined ? serializePerDeviceStatusInBatch(data["result"]) : undefined,
    unclaim: data["unclaim"] !== undefined ? serializePartnerUnclaim(data["unclaim"]) : undefined,
    updateMetadata: data["updateMetadata"] !== undefined ? serializeUpdateMetadataArguments(data["updateMetadata"]) : undefined,
  };
}

function deserializeOperationPerDevice(data: any): OperationPerDevice {
  return {
    ...data,
    claim: data["claim"] !== undefined ? deserializePartnerClaim(data["claim"]) : undefined,
    result: data["result"] !== undefined ? deserializePerDeviceStatusInBatch(data["result"]) : undefined,
    unclaim: data["unclaim"] !== undefined ? deserializePartnerUnclaim(data["unclaim"]) : undefined,
    updateMetadata: data["updateMetadata"] !== undefined ? deserializeUpdateMetadataArguments(data["updateMetadata"]) : undefined,
  };
}

/**
 * Identifies one claim request.
 */
export interface PartnerClaim {
  /**
   * The ID of the customer for whom the device is being claimed.
   */
  customerId?: bigint;
  /**
   * Required. Required. Device identifier of the device.
   */
  deviceIdentifier?: DeviceIdentifier;
  /**
   * Required. The metadata to attach to the device at claim.
   */
  deviceMetadata?: DeviceMetadata;
  /**
   * The Google Workspace customer ID.
   */
  googleWorkspaceCustomerId?: string;
  /**
   * Optional. Must and can only be set for Chrome OS devices.
   */
  preProvisioningToken?: string;
  /**
   * Required. The section type of the device's provisioning record.
   */
  sectionType?:  | "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH";
  /**
   * Optional. Must and can only be set when DeviceProvisioningSectionType is
   * SECTION_TYPE_SIM_LOCK. The unique identifier of the SimLock profile.
   */
  simlockProfileId?: bigint;
}

function serializePartnerClaim(data: any): PartnerClaim {
  return {
    ...data,
    customerId: data["customerId"] !== undefined ? String(data["customerId"]) : undefined,
    simlockProfileId: data["simlockProfileId"] !== undefined ? String(data["simlockProfileId"]) : undefined,
  };
}

function deserializePartnerClaim(data: any): PartnerClaim {
  return {
    ...data,
    customerId: data["customerId"] !== undefined ? BigInt(data["customerId"]) : undefined,
    simlockProfileId: data["simlockProfileId"] !== undefined ? BigInt(data["simlockProfileId"]) : undefined,
  };
}

/**
 * Additional options for AndroidDeviceProvisioning#partnersCustomersList.
 */
export interface PartnersCustomersListOptions {
  /**
   * The maximum number of results to be returned. If not specified or 0, all
   * the records are returned.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AndroidDeviceProvisioning#partnersVendorsCustomersList.
 */
export interface PartnersVendorsCustomersListOptions {
  /**
   * The maximum number of results to be returned.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
}

/**
 * Additional options for AndroidDeviceProvisioning#partnersVendorsList.
 */
export interface PartnersVendorsListOptions {
  /**
   * The maximum number of results to be returned.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results returned by the server.
   */
  pageToken?: string;
}

/**
 * Identifies one unclaim request.
 */
export interface PartnerUnclaim {
  /**
   * Required. Device ID of the device.
   */
  deviceId?: bigint;
  /**
   * Required. Device identifier of the device.
   */
  deviceIdentifier?: DeviceIdentifier;
  /**
   * Required. The section type of the device's provisioning record.
   */
  sectionType?:  | "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH";
  /**
   * Optional. The duration of the vacation unlock starting from when the
   * request is processed. (1 day is treated as 24 hours)
   */
  vacationModeDays?: number;
  /**
   * Optional. The expiration time of the vacation unlock.
   */
  vacationModeExpireTime?: Date;
}

function serializePartnerUnclaim(data: any): PartnerUnclaim {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? String(data["deviceId"]) : undefined,
    vacationModeExpireTime: data["vacationModeExpireTime"] !== undefined ? data["vacationModeExpireTime"].toISOString() : undefined,
  };
}

function deserializePartnerUnclaim(data: any): PartnerUnclaim {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? BigInt(data["deviceId"]) : undefined,
    vacationModeExpireTime: data["vacationModeExpireTime"] !== undefined ? new Date(data["vacationModeExpireTime"]) : undefined,
  };
}

/**
 * Captures the processing status for each device in the operation.
 */
export interface PerDeviceStatusInBatch {
  /**
   * If processing succeeds, the device ID of the device.
   */
  deviceId?: bigint;
  /**
   * If processing fails, the error type.
   */
  errorIdentifier?: string;
  /**
   * If processing fails, a developer message explaining what went wrong.
   */
  errorMessage?: string;
  /**
   * The result status of the device after processing.
   */
  status?:  | "SINGLE_DEVICE_STATUS_UNSPECIFIED" | "SINGLE_DEVICE_STATUS_UNKNOWN_ERROR" | "SINGLE_DEVICE_STATUS_OTHER_ERROR" | "SINGLE_DEVICE_STATUS_SUCCESS" | "SINGLE_DEVICE_STATUS_PERMISSION_DENIED" | "SINGLE_DEVICE_STATUS_INVALID_DEVICE_IDENTIFIER" | "SINGLE_DEVICE_STATUS_INVALID_SECTION_TYPE" | "SINGLE_DEVICE_STATUS_SECTION_NOT_YOURS" | "SINGLE_DEVICE_STATUS_INVALID_TOKEN" | "SINGLE_DEVICE_STATUS_REVOKED_TOKEN";
}

function serializePerDeviceStatusInBatch(data: any): PerDeviceStatusInBatch {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? String(data["deviceId"]) : undefined,
  };
}

function deserializePerDeviceStatusInBatch(data: any): PerDeviceStatusInBatch {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? BigInt(data["deviceId"]) : undefined,
  };
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
 * Request message to unclaim a device.
 */
export interface UnclaimDeviceRequest {
  /**
   * Required. The device ID returned by `ClaimDevice`.
   */
  deviceId?: bigint;
  /**
   * Required. The device identifier you used when you claimed this device.
   */
  deviceIdentifier?: DeviceIdentifier;
  /**
   * Required. The section type of the device's provisioning record.
   */
  sectionType?:  | "SECTION_TYPE_UNSPECIFIED" | "SECTION_TYPE_SIM_LOCK" | "SECTION_TYPE_ZERO_TOUCH";
  /**
   * The duration of the vacation unlock starting from when the request is
   * processed. (1 day is treated as 24 hours)
   */
  vacationModeDays?: number;
  /**
   * The expiration time of the vacation unlock.
   */
  vacationModeExpireTime?: Date;
}

function serializeUnclaimDeviceRequest(data: any): UnclaimDeviceRequest {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? String(data["deviceId"]) : undefined,
    vacationModeExpireTime: data["vacationModeExpireTime"] !== undefined ? data["vacationModeExpireTime"].toISOString() : undefined,
  };
}

function deserializeUnclaimDeviceRequest(data: any): UnclaimDeviceRequest {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? BigInt(data["deviceId"]) : undefined,
    vacationModeExpireTime: data["vacationModeExpireTime"] !== undefined ? new Date(data["vacationModeExpireTime"]) : undefined,
  };
}

/**
 * Request to unclaim devices asynchronously in batch.
 */
export interface UnclaimDevicesRequest {
  /**
   * Required. The list of devices to unclaim.
   */
  unclaims?: PartnerUnclaim[];
}

function serializeUnclaimDevicesRequest(data: any): UnclaimDevicesRequest {
  return {
    ...data,
    unclaims: data["unclaims"] !== undefined ? data["unclaims"].map((item: any) => (serializePartnerUnclaim(item))) : undefined,
  };
}

function deserializeUnclaimDevicesRequest(data: any): UnclaimDevicesRequest {
  return {
    ...data,
    unclaims: data["unclaims"] !== undefined ? data["unclaims"].map((item: any) => (deserializePartnerUnclaim(item))) : undefined,
  };
}

/**
 * Request to update device metadata in batch.
 */
export interface UpdateDeviceMetadataInBatchRequest {
  /**
   * Required. The list of metadata updates.
   */
  updates?: UpdateMetadataArguments[];
}

function serializeUpdateDeviceMetadataInBatchRequest(data: any): UpdateDeviceMetadataInBatchRequest {
  return {
    ...data,
    updates: data["updates"] !== undefined ? data["updates"].map((item: any) => (serializeUpdateMetadataArguments(item))) : undefined,
  };
}

function deserializeUpdateDeviceMetadataInBatchRequest(data: any): UpdateDeviceMetadataInBatchRequest {
  return {
    ...data,
    updates: data["updates"] !== undefined ? data["updates"].map((item: any) => (deserializeUpdateMetadataArguments(item))) : undefined,
  };
}

/**
 * Request to set metadata for a device.
 */
export interface UpdateDeviceMetadataRequest {
  /**
   * Required. The metadata to attach to the device.
   */
  deviceMetadata?: DeviceMetadata;
}

/**
 * Identifies metadata updates to one device.
 */
export interface UpdateMetadataArguments {
  /**
   * Required. Device ID of the device.
   */
  deviceId?: bigint;
  /**
   * Required. Device identifier.
   */
  deviceIdentifier?: DeviceIdentifier;
  /**
   * Required. The metadata to update.
   */
  deviceMetadata?: DeviceMetadata;
}

function serializeUpdateMetadataArguments(data: any): UpdateMetadataArguments {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? String(data["deviceId"]) : undefined,
  };
}

function deserializeUpdateMetadataArguments(data: any): UpdateMetadataArguments {
  return {
    ...data,
    deviceId: data["deviceId"] !== undefined ? BigInt(data["deviceId"]) : undefined,
  };
}