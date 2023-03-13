// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud OS Login API Client for Deno
 * ==================================
 * 
 * You can use OS Login to manage access to your VM instances using IAM roles.
 * 
 * Docs: https://cloud.google.com/compute/docs/oslogin/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * You can use OS Login to manage access to your VM instances using IAM roles.
 */
export class OSLogin {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://oslogin.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieves the profile information used for logging in to a virtual machine
   * on Google Compute Engine.
   *
   * @param name Required. The unique ID for the user in format `users/{user}`.
   */
  async usersGetLoginProfile(name: string, opts: UsersGetLoginProfileOptions = {}): Promise<LoginProfile> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/loginProfile`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.systemId !== undefined) {
      url.searchParams.append("systemId", String(opts.systemId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLoginProfile(data);
  }

  /**
   * Adds an SSH public key and returns the profile information. Default POSIX
   * account information is set when no username and UID exist as part of the
   * login profile.
   *
   * @param parent Required. The unique ID for the user in format `users/{user}`.
   */
  async usersImportSshPublicKey(parent: string, req: SshPublicKey, opts: UsersImportSshPublicKeyOptions = {}): Promise<ImportSshPublicKeyResponse> {
    req = serializeSshPublicKey(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:importSshPublicKey`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeImportSshPublicKeyResponse(data);
  }

  /**
   * Deletes a POSIX account.
   *
   * @param name Required. A reference to the POSIX account to update. POSIX accounts are identified by the project ID they are associated with. A reference to the POSIX account is in format `users/{user}/projects/{project}`.
   */
  async usersProjectsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Create an SSH public key
   *
   * @param parent Required. The unique ID for the user in format `users/{user}`.
   */
  async usersSshPublicKeysCreate(parent: string, req: SshPublicKey): Promise<SshPublicKey> {
    req = serializeSshPublicKey(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sshPublicKeys`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSshPublicKey(data);
  }

  /**
   * Deletes an SSH public key.
   *
   * @param name Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
   */
  async usersSshPublicKeysDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves an SSH public key.
   *
   * @param name Required. The fingerprint of the public key to retrieve. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
   */
  async usersSshPublicKeysGet(name: string): Promise<SshPublicKey> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSshPublicKey(data);
  }

  /**
   * Updates an SSH public key and returns the profile information. This method
   * supports patch semantics.
   *
   * @param name Required. The fingerprint of the public key to update. Public keys are identified by their SHA-256 fingerprint. The fingerprint of the public key is in format `users/{user}/sshPublicKeys/{fingerprint}`.
   */
  async usersSshPublicKeysPatch(name: string, req: SshPublicKey, opts: UsersSshPublicKeysPatchOptions = {}): Promise<SshPublicKey> {
    req = serializeSshPublicKey(req);
    opts = serializeUsersSshPublicKeysPatchOptions(opts);
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
    return deserializeSshPublicKey(data);
  }
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
 * A response message for importing an SSH public key.
 */
export interface ImportSshPublicKeyResponse {
  /**
   * Detailed information about import results.
   */
  details?: string;
  /**
   * The login profile information for the user.
   */
  loginProfile?: LoginProfile;
}

function serializeImportSshPublicKeyResponse(data: any): ImportSshPublicKeyResponse {
  return {
    ...data,
    loginProfile: data["loginProfile"] !== undefined ? serializeLoginProfile(data["loginProfile"]) : undefined,
  };
}

function deserializeImportSshPublicKeyResponse(data: any): ImportSshPublicKeyResponse {
  return {
    ...data,
    loginProfile: data["loginProfile"] !== undefined ? deserializeLoginProfile(data["loginProfile"]) : undefined,
  };
}

/**
 * The user profile information used for logging in to a virtual machine on
 * Google Compute Engine.
 */
export interface LoginProfile {
  /**
   * Required. A unique user ID.
   */
  name?: string;
  /**
   * The list of POSIX accounts associated with the user.
   */
  posixAccounts?: PosixAccount[];
  /**
   * A map from SSH public key fingerprint to the associated key object.
   */
  sshPublicKeys?: {
    [key: string]: SshPublicKey
  };
}

function serializeLoginProfile(data: any): LoginProfile {
  return {
    ...data,
    posixAccounts: data["posixAccounts"] !== undefined ? data["posixAccounts"].map((item: any) => (serializePosixAccount(item))) : undefined,
    sshPublicKeys: data["sshPublicKeys"] !== undefined ? Object.fromEntries(Object.entries(data["sshPublicKeys"]).map(([k, v]: [string, any]) => ([k, serializeSshPublicKey(v)]))) : undefined,
  };
}

function deserializeLoginProfile(data: any): LoginProfile {
  return {
    ...data,
    posixAccounts: data["posixAccounts"] !== undefined ? data["posixAccounts"].map((item: any) => (deserializePosixAccount(item))) : undefined,
    sshPublicKeys: data["sshPublicKeys"] !== undefined ? Object.fromEntries(Object.entries(data["sshPublicKeys"]).map(([k, v]: [string, any]) => ([k, deserializeSshPublicKey(v)]))) : undefined,
  };
}

/**
 * The POSIX account information associated with a Google account.
 */
export interface PosixAccount {
  /**
   * Output only. A POSIX account identifier.
   */
  readonly accountId?: string;
  /**
   * The GECOS (user information) entry for this account.
   */
  gecos?: string;
  /**
   * The default group ID.
   */
  gid?: bigint;
  /**
   * The path to the home directory for this account.
   */
  homeDirectory?: string;
  /**
   * Output only. The canonical resource name.
   */
  readonly name?: string;
  /**
   * The operating system type where this account applies.
   */
  operatingSystemType?:  | "OPERATING_SYSTEM_TYPE_UNSPECIFIED" | "LINUX" | "WINDOWS";
  /**
   * Only one POSIX account can be marked as primary.
   */
  primary?: boolean;
  /**
   * The path to the logic shell for this account.
   */
  shell?: string;
  /**
   * System identifier for which account the username or uid applies to. By
   * default, the empty value is used.
   */
  systemId?: string;
  /**
   * The user ID.
   */
  uid?: bigint;
  /**
   * The username of the POSIX account.
   */
  username?: string;
}

function serializePosixAccount(data: any): PosixAccount {
  return {
    ...data,
    gid: data["gid"] !== undefined ? String(data["gid"]) : undefined,
    uid: data["uid"] !== undefined ? String(data["uid"]) : undefined,
  };
}

function deserializePosixAccount(data: any): PosixAccount {
  return {
    ...data,
    gid: data["gid"] !== undefined ? BigInt(data["gid"]) : undefined,
    uid: data["uid"] !== undefined ? BigInt(data["uid"]) : undefined,
  };
}

/**
 * The SSH public key information associated with a Google account.
 */
export interface SshPublicKey {
  /**
   * An expiration time in microseconds since epoch.
   */
  expirationTimeUsec?: bigint;
  /**
   * Output only. The SHA-256 fingerprint of the SSH public key.
   */
  readonly fingerprint?: string;
  /**
   * Public key text in SSH format, defined by RFC4253 section 6.6.
   */
  key?: string;
  /**
   * Output only. The canonical resource name.
   */
  readonly name?: string;
}

function serializeSshPublicKey(data: any): SshPublicKey {
  return {
    ...data,
    expirationTimeUsec: data["expirationTimeUsec"] !== undefined ? String(data["expirationTimeUsec"]) : undefined,
  };
}

function deserializeSshPublicKey(data: any): SshPublicKey {
  return {
    ...data,
    expirationTimeUsec: data["expirationTimeUsec"] !== undefined ? BigInt(data["expirationTimeUsec"]) : undefined,
  };
}

/**
 * Additional options for OSLogin#usersGetLoginProfile.
 */
export interface UsersGetLoginProfileOptions {
  /**
   * The project ID of the Google Cloud Platform project.
   */
  projectId?: string;
  /**
   * A system ID for filtering the results of the request.
   */
  systemId?: string;
}

/**
 * Additional options for OSLogin#usersImportSshPublicKey.
 */
export interface UsersImportSshPublicKeyOptions {
  /**
   * The project ID of the Google Cloud Platform project.
   */
  projectId?: string;
}

/**
 * Additional options for OSLogin#usersSshPublicKeysPatch.
 */
export interface UsersSshPublicKeysPatchOptions {
  /**
   * Mask to control which fields get updated. Updates all if not present.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUsersSshPublicKeysPatchOptions(data: any): UsersSshPublicKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUsersSshPublicKeysPatchOptions(data: any): UsersSshPublicKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}