// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Smart Device Management API Client for Deno
 * ===========================================
 * 
 * Allow select enterprise partners to access, control, and manage Google and Nest devices programmatically.
 * 
 * Docs: https://developers.google.com/nest/device-access
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Allow select enterprise partners to access, control, and manage Google and
 * Nest devices programmatically.
 */
export class SmartDeviceManagement {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://smartdevicemanagement.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Executes a command to device managed by the enterprise.
   *
   * @param name The name of the device requested. For example: "enterprises/XYZ/devices/123"
   */
  async enterprisesDevicesExecuteCommand(name: string, req: GoogleHomeEnterpriseSdmV1ExecuteDeviceCommandRequest): Promise<GoogleHomeEnterpriseSdmV1ExecuteDeviceCommandResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:executeCommand`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleHomeEnterpriseSdmV1ExecuteDeviceCommandResponse;
  }

  /**
   * Gets a device managed by the enterprise.
   *
   * @param name The name of the device requested. For example: "enterprises/XYZ/devices/123"
   */
  async enterprisesDevicesGet(name: string): Promise<GoogleHomeEnterpriseSdmV1Device> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleHomeEnterpriseSdmV1Device;
  }

  /**
   * Lists devices managed by the enterprise.
   *
   * @param parent The parent enterprise to list devices under. E.g. "enterprises/XYZ".
   */
  async enterprisesDevicesList(parent: string, opts: EnterprisesDevicesListOptions = {}): Promise<GoogleHomeEnterpriseSdmV1ListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/devices`);
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
    return data as GoogleHomeEnterpriseSdmV1ListDevicesResponse;
  }

  /**
   * Gets a structure managed by the enterprise.
   *
   * @param name The name of the structure requested. For example: "enterprises/XYZ/structures/ABC".
   */
  async enterprisesStructuresGet(name: string): Promise<GoogleHomeEnterpriseSdmV1Structure> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleHomeEnterpriseSdmV1Structure;
  }

  /**
   * Lists structures managed by the enterprise.
   *
   * @param parent The parent enterprise to list structures under. E.g. "enterprises/XYZ".
   */
  async enterprisesStructuresList(parent: string, opts: EnterprisesStructuresListOptions = {}): Promise<GoogleHomeEnterpriseSdmV1ListStructuresResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/structures`);
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
    return data as GoogleHomeEnterpriseSdmV1ListStructuresResponse;
  }

  /**
   * Gets a room managed by the enterprise.
   *
   * @param name The name of the room requested. For example: "enterprises/XYZ/structures/ABC/rooms/123".
   */
  async enterprisesStructuresRoomsGet(name: string): Promise<GoogleHomeEnterpriseSdmV1Room> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleHomeEnterpriseSdmV1Room;
  }

  /**
   * Lists rooms managed by the enterprise.
   *
   * @param parent The parent resource name of the rooms requested. For example: "enterprises/XYZ/structures/ABC".
   */
  async enterprisesStructuresRoomsList(parent: string, opts: EnterprisesStructuresRoomsListOptions = {}): Promise<GoogleHomeEnterpriseSdmV1ListRoomsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/rooms`);
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
    return data as GoogleHomeEnterpriseSdmV1ListRoomsResponse;
  }
}

/**
 * Additional options for SmartDeviceManagement#enterprisesDevicesList.
 */
export interface EnterprisesDevicesListOptions {
  /**
   * Optional filter to list devices. Filters can be done on: Device custom
   * name (substring match): 'customName=wing'
   */
  filter?: string;
  /**
   * Optional requested page size. Server may return fewer devices than
   * requested. If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional token of the page to retrieve.
   */
  pageToken?: string;
}

/**
 * Additional options for SmartDeviceManagement#enterprisesStructuresList.
 */
export interface EnterprisesStructuresListOptions {
  /**
   * Optional filter to list structures.
   */
  filter?: string;
  /**
   * Requested page size. Server may return fewer structures than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * The token of the page to retrieve.
   */
  pageToken?: string;
}

/**
 * Additional options for SmartDeviceManagement#enterprisesStructuresRoomsList.
 */
export interface EnterprisesStructuresRoomsListOptions {
  /**
   * Requested page size. Server may return fewer rooms than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * The token of the page to retrieve.
   */
  pageToken?: string;
}

/**
 * Device resource represents an instance of enterprise managed device in the
 * property.
 */
export interface GoogleHomeEnterpriseSdmV1Device {
  /**
   * Required. The resource name of the device. For example:
   * "enterprises/XYZ/devices/123".
   */
  name?: string;
  /**
   * Assignee details of the device.
   */
  parentRelations?: GoogleHomeEnterpriseSdmV1ParentRelation[];
  /**
   * Output only. Device traits.
   */
  readonly traits?: {
    [key: string]: any
  };
  /**
   * Output only. Type of the device for general display purposes. For example:
   * "THERMOSTAT". The device type should not be used to deduce or infer
   * functionality of the actual device it is assigned to. Instead, use the
   * returned traits for the device.
   */
  readonly type?: string;
}

/**
 * Request message for SmartDeviceManagementService.ExecuteDeviceCommand
 */
export interface GoogleHomeEnterpriseSdmV1ExecuteDeviceCommandRequest {
  /**
   * The command name to execute, represented by the fully qualified protobuf
   * message name.
   */
  command?: string;
  /**
   * The command message to execute, represented as a Struct.
   */
  params?: {
    [key: string]: any
  };
}

/**
 * Response message for SmartDeviceManagementService.ExecuteDeviceCommand
 */
export interface GoogleHomeEnterpriseSdmV1ExecuteDeviceCommandResponse {
  /**
   * The results of executing the command.
   */
  results?: {
    [key: string]: any
  };
}

/**
 * Response message for SmartDeviceManagementService.ListDevices
 */
export interface GoogleHomeEnterpriseSdmV1ListDevicesResponse {
  /**
   * The list of devices.
   */
  devices?: GoogleHomeEnterpriseSdmV1Device[];
  /**
   * The pagination token to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for SmartDeviceManagementService.ListRooms
 */
export interface GoogleHomeEnterpriseSdmV1ListRoomsResponse {
  /**
   * The pagination token to retrieve the next page of results. If this field
   * is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of rooms.
   */
  rooms?: GoogleHomeEnterpriseSdmV1Room[];
}

/**
 * Response message for SmartDeviceManagementService.ListStructures
 */
export interface GoogleHomeEnterpriseSdmV1ListStructuresResponse {
  /**
   * The pagination token to retrieve the next page of results. If this field
   * is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of structures.
   */
  structures?: GoogleHomeEnterpriseSdmV1Structure[];
}

/**
 * Represents device relationships, for instance, structure/room to which the
 * device is assigned to.
 */
export interface GoogleHomeEnterpriseSdmV1ParentRelation {
  /**
   * Output only. The custom name of the relation -- e.g., structure/room where
   * the device is assigned to.
   */
  readonly displayName?: string;
  /**
   * Output only. The name of the relation -- e.g., structure/room where the
   * device is assigned to. For example: "enterprises/XYZ/structures/ABC" or
   * "enterprises/XYZ/structures/ABC/rooms/123"
   */
  readonly parent?: string;
}

/**
 * Room resource represents an instance of sub-space within a structure such as
 * rooms in a hotel suite or rental apartment.
 */
export interface GoogleHomeEnterpriseSdmV1Room {
  /**
   * Output only. The resource name of the room. For example:
   * "enterprises/XYZ/structures/ABC/rooms/123".
   */
  readonly name?: string;
  /**
   * Room traits.
   */
  traits?: {
    [key: string]: any
  };
}

/**
 * Structure resource represents an instance of enterprise managed home or
 * hotel room.
 */
export interface GoogleHomeEnterpriseSdmV1Structure {
  /**
   * Output only. The resource name of the structure. For example:
   * "enterprises/XYZ/structures/ABC".
   */
  readonly name?: string;
  /**
   * Structure traits.
   */
  traits?: {
    [key: string]: any
  };
}