// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Tag Manager API Client for Deno
 * ===============================
 * 
 * This API allows clients to access and modify container and tag configuration.
 * 
 * Docs: https://developers.google.com/tag-manager
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * This API allows clients to access and modify container and tag
 * configuration.
 */
export class TagManager {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://tagmanager.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Combines Containers.
   *
   * @param path GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersCombine(path: string, opts: AccountsContainersCombineOptions = {}): Promise<Container> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:combine`);
    if (opts.allowUserPermissionFeatureUpdate !== undefined) {
      url.searchParams.append("allowUserPermissionFeatureUpdate", String(opts.allowUserPermissionFeatureUpdate));
    }
    if (opts.containerId !== undefined) {
      url.searchParams.append("containerId", String(opts.containerId));
    }
    if (opts.settingSource !== undefined) {
      url.searchParams.append("settingSource", String(opts.settingSource));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Container;
  }

  /**
   * Creates a Container.
   *
   * @param parent GTM Account's API relative path. Example: accounts/{account_id}.
   */
  async accountsContainersCreate(parent: string, req: Container): Promise<Container> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/containers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Container;
  }

  /**
   * Deletes a Container.
   *
   * @param path GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a Destination.
   *
   * @param path Google Tag Destination's API relative path. Example: accounts/{account_id}/containers/{container_id}/destinations/{destination_link_id}
   */
  async accountsContainersDestinationsGet(path: string): Promise<Destination> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Destination;
  }

  /**
   * Adds a Destination to this Container and removes it from the Container to
   * which it is currently linked.
   *
   * @param parent GTM parent Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersDestinationsLink(parent: string, opts: AccountsContainersDestinationsLinkOptions = {}): Promise<Destination> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/destinations:link`);
    if (opts.allowUserPermissionFeatureUpdate !== undefined) {
      url.searchParams.append("allowUserPermissionFeatureUpdate", String(opts.allowUserPermissionFeatureUpdate));
    }
    if (opts.destinationId !== undefined) {
      url.searchParams.append("destinationId", String(opts.destinationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Destination;
  }

  /**
   * Lists all Destinations linked to a GTM Container.
   *
   * @param parent GTM parent Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersDestinationsList(parent: string): Promise<ListDestinationsResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/destinations`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListDestinationsResponse;
  }

  /**
   * Creates a GTM Environment.
   *
   * @param parent GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersEnvironmentsCreate(parent: string, req: Environment): Promise<Environment> {
    req = serializeEnvironment(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/environments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEnvironment(data);
  }

  /**
   * Deletes a GTM Environment.
   *
   * @param path GTM Environment's API relative path. Example: accounts/{account_id}/containers/{container_id}/environments/{environment_id}
   */
  async accountsContainersEnvironmentsDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a GTM Environment.
   *
   * @param path GTM Environment's API relative path. Example: accounts/{account_id}/containers/{container_id}/environments/{environment_id}
   */
  async accountsContainersEnvironmentsGet(path: string): Promise<Environment> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEnvironment(data);
  }

  /**
   * Lists all GTM Environments of a GTM Container.
   *
   * @param parent GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersEnvironmentsList(parent: string, opts: AccountsContainersEnvironmentsListOptions = {}): Promise<ListEnvironmentsResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/environments`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListEnvironmentsResponse(data);
  }

  /**
   * Re-generates the authorization code for a GTM Environment.
   *
   * @param path GTM Environment's API relative path. Example: accounts/{account_id}/containers/{container_id}/environments/{environment_id}
   */
  async accountsContainersEnvironmentsReauthorize(path: string, req: Environment): Promise<Environment> {
    req = serializeEnvironment(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:reauthorize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeEnvironment(data);
  }

  /**
   * Updates a GTM Environment.
   *
   * @param path GTM Environment's API relative path. Example: accounts/{account_id}/containers/{container_id}/environments/{environment_id}
   */
  async accountsContainersEnvironmentsUpdate(path: string, req: Environment, opts: AccountsContainersEnvironmentsUpdateOptions = {}): Promise<Environment> {
    req = serializeEnvironment(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeEnvironment(data);
  }

  /**
   * Gets a Container.
   *
   * @param path GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersGet(path: string): Promise<Container> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Container;
  }

  /**
   * Lists all Containers that belongs to a GTM Account.
   *
   * @param parent GTM Account's API relative path. Example: accounts/{account_id}.
   */
  async accountsContainersList(parent: string, opts: AccountsContainersListOptions = {}): Promise<ListContainersResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/containers`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListContainersResponse;
  }

  /**
   * Looks up a Container by destination ID.
   *
   */
  async accountsContainersLookup(opts: AccountsContainersLookupOptions = {}): Promise<Container> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/accounts/containers:lookup`);
    if (opts.destinationId !== undefined) {
      url.searchParams.append("destinationId", String(opts.destinationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Container;
  }

  /**
   * Move Tag ID out of a Container.
   *
   * @param path GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersMove_tag_id(path: string, opts: AccountsContainersMove_tag_idOptions = {}): Promise<Container> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:move_tag_id`);
    if (opts.allowUserPermissionFeatureUpdate !== undefined) {
      url.searchParams.append("allowUserPermissionFeatureUpdate", String(opts.allowUserPermissionFeatureUpdate));
    }
    if (opts.copySettings !== undefined) {
      url.searchParams.append("copySettings", String(opts.copySettings));
    }
    if (opts.copyTermsOfService !== undefined) {
      url.searchParams.append("copyTermsOfService", String(opts.copyTermsOfService));
    }
    if (opts.copyUsers !== undefined) {
      url.searchParams.append("copyUsers", String(opts.copyUsers));
    }
    if (opts.tagId !== undefined) {
      url.searchParams.append("tagId", String(opts.tagId));
    }
    if (opts.tagName !== undefined) {
      url.searchParams.append("tagName", String(opts.tagName));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Container;
  }

  /**
   * Gets the tagging snippet for a Container.
   *
   * @param path Container snippet's API relative path. Example: accounts/{account_id}/containers/{container_id}:snippet
   */
  async accountsContainersSnippet(path: string): Promise<GetContainerSnippetResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:snippet`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GetContainerSnippetResponse;
  }

  /**
   * Updates a Container.
   *
   * @param path GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersUpdate(path: string, req: Container, opts: AccountsContainersUpdateOptions = {}): Promise<Container> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Container;
  }

  /**
   * Gets the latest container version header
   *
   * @param parent GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersVersion_headersLatest(parent: string): Promise<ContainerVersionHeader> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/version_headers:latest`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ContainerVersionHeader;
  }

  /**
   * Lists all Container Versions of a GTM Container.
   *
   * @param parent GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersVersion_headersList(parent: string, opts: AccountsContainersVersion_headersListOptions = {}): Promise<ListContainerVersionsResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/version_headers`);
    if (opts.includeDeleted !== undefined) {
      url.searchParams.append("includeDeleted", String(opts.includeDeleted));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListContainerVersionsResponse;
  }

  /**
   * Deletes a Container Version.
   *
   * @param path GTM ContainerVersion's API relative path. Example: accounts/{account_id}/containers/{container_id}/versions/{version_id}
   */
  async accountsContainersVersionsDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a Container Version.
   *
   * @param path GTM ContainerVersion's API relative path. Example: accounts/{account_id}/containers/{container_id}/versions/{version_id}
   */
  async accountsContainersVersionsGet(path: string, opts: AccountsContainersVersionsGetOptions = {}): Promise<ContainerVersion> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.containerVersionId !== undefined) {
      url.searchParams.append("containerVersionId", String(opts.containerVersionId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeContainerVersion(data);
  }

  /**
   * Gets the live (i.e. published) container version
   *
   * @param parent GTM Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersVersionsLive(parent: string): Promise<ContainerVersion> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/versions:live`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeContainerVersion(data);
  }

  /**
   * Publishes a Container Version.
   *
   * @param path GTM ContainerVersion's API relative path. Example: accounts/{account_id}/containers/{container_id}/versions/{version_id}
   */
  async accountsContainersVersionsPublish(path: string, opts: AccountsContainersVersionsPublishOptions = {}): Promise<PublishContainerVersionResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:publish`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializePublishContainerVersionResponse(data);
  }

  /**
   * Sets the latest version used for synchronization of workspaces when
   * detecting conflicts and errors.
   *
   * @param path GTM ContainerVersion's API relative path. Example: accounts/{account_id}/containers/{container_id}/versions/{version_id}
   */
  async accountsContainersVersionsSet_latest(path: string): Promise<ContainerVersion> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:set_latest`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeContainerVersion(data);
  }

  /**
   * Undeletes a Container Version.
   *
   * @param path GTM ContainerVersion's API relative path. Example: accounts/{account_id}/containers/{container_id}/versions/{version_id}
   */
  async accountsContainersVersionsUndelete(path: string): Promise<ContainerVersion> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:undelete`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeContainerVersion(data);
  }

  /**
   * Updates a Container Version.
   *
   * @param path GTM ContainerVersion's API relative path. Example: accounts/{account_id}/containers/{container_id}/versions/{version_id}
   */
  async accountsContainersVersionsUpdate(path: string, req: ContainerVersion, opts: AccountsContainersVersionsUpdateOptions = {}): Promise<ContainerVersion> {
    req = serializeContainerVersion(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeContainerVersion(data);
  }

  /**
   * Creates one or more GTM Built-In Variables.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesBuilt_in_variablesCreate(parent: string, opts: AccountsContainersWorkspacesBuilt_in_variablesCreateOptions = {}): Promise<CreateBuiltInVariableResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/built_in_variables`);
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as CreateBuiltInVariableResponse;
  }

  /**
   * Deletes one or more GTM Built-In Variables.
   *
   * @param path GTM BuiltInVariable's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/built_in_variables
   */
  async accountsContainersWorkspacesBuilt_in_variablesDelete(path: string, opts: AccountsContainersWorkspacesBuilt_in_variablesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Lists all the enabled Built-In Variables of a GTM Container.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesBuilt_in_variablesList(parent: string, opts: AccountsContainersWorkspacesBuilt_in_variablesListOptions = {}): Promise<ListEnabledBuiltInVariablesResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/built_in_variables`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListEnabledBuiltInVariablesResponse;
  }

  /**
   * Reverts changes to a GTM Built-In Variables in a GTM Workspace.
   *
   * @param path GTM BuiltInVariable's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/built_in_variables
   */
  async accountsContainersWorkspacesBuilt_in_variablesRevert(path: string, opts: AccountsContainersWorkspacesBuilt_in_variablesRevertOptions = {}): Promise<RevertBuiltInVariableResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }/built_in_variables:revert`);
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as RevertBuiltInVariableResponse;
  }

  /**
   * Creates a GTM Client.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesClientsCreate(parent: string, req: Client): Promise<Client> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/clients`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Client;
  }

  /**
   * Deletes a GTM Client.
   *
   * @param path GTM Client's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/clients/{client_id}
   */
  async accountsContainersWorkspacesClientsDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a GTM Client.
   *
   * @param path GTM Client's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/clients/{client_id}
   */
  async accountsContainersWorkspacesClientsGet(path: string): Promise<Client> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Client;
  }

  /**
   * Lists all GTM Clients of a GTM container workspace.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesClientsList(parent: string, opts: AccountsContainersWorkspacesClientsListOptions = {}): Promise<ListClientsResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/clients`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListClientsResponse;
  }

  /**
   * Reverts changes to a GTM Client in a GTM Workspace.
   *
   * @param path GTM Client's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/clients/{client_id}
   */
  async accountsContainersWorkspacesClientsRevert(path: string, opts: AccountsContainersWorkspacesClientsRevertOptions = {}): Promise<RevertClientResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:revert`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as RevertClientResponse;
  }

  /**
   * Updates a GTM Client.
   *
   * @param path GTM Client's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/clients/{client_id}
   */
  async accountsContainersWorkspacesClientsUpdate(path: string, req: Client, opts: AccountsContainersWorkspacesClientsUpdateOptions = {}): Promise<Client> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Client;
  }

  /**
   * Creates a Workspace.
   *
   * @param parent GTM parent Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersWorkspacesCreate(parent: string, req: Workspace): Promise<Workspace> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/workspaces`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Workspace;
  }

  /**
   * Creates a Container Version from the entities present in the workspace,
   * deletes the workspace, and sets the base container version to the newly
   * created version.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesCreate_version(path: string, req: CreateContainerVersionRequestVersionOptions): Promise<CreateContainerVersionResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:create_version`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCreateContainerVersionResponse(data);
  }

  /**
   * Deletes a Workspace.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Creates a GTM Folder.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesFoldersCreate(parent: string, req: Folder): Promise<Folder> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/folders`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Folder;
  }

  /**
   * Deletes a GTM Folder.
   *
   * @param path GTM Folder's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/folders/{folder_id}
   */
  async accountsContainersWorkspacesFoldersDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * List all entities in a GTM Folder.
   *
   * @param path GTM Folder's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/folders/{folder_id}
   */
  async accountsContainersWorkspacesFoldersEntities(path: string, opts: AccountsContainersWorkspacesFoldersEntitiesOptions = {}): Promise<FolderEntities> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:entities`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeFolderEntities(data);
  }

  /**
   * Gets a GTM Folder.
   *
   * @param path GTM Folder's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/folders/{folder_id}
   */
  async accountsContainersWorkspacesFoldersGet(path: string): Promise<Folder> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Folder;
  }

  /**
   * Lists all GTM Folders of a Container.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesFoldersList(parent: string, opts: AccountsContainersWorkspacesFoldersListOptions = {}): Promise<ListFoldersResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/folders`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListFoldersResponse;
  }

  /**
   * Moves entities to a GTM Folder.
   *
   * @param path GTM Folder's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/folders/{folder_id}
   */
  async accountsContainersWorkspacesFoldersMove_entities_to_folder(path: string, req: Folder, opts: AccountsContainersWorkspacesFoldersMove_entities_to_folderOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:move_entities_to_folder`);
    if (opts.tagId !== undefined) {
      url.searchParams.append("tagId", String(opts.tagId));
    }
    if (opts.triggerId !== undefined) {
      url.searchParams.append("triggerId", String(opts.triggerId));
    }
    if (opts.variableId !== undefined) {
      url.searchParams.append("variableId", String(opts.variableId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Reverts changes to a GTM Folder in a GTM Workspace.
   *
   * @param path GTM Folder's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/folders/{folder_id}
   */
  async accountsContainersWorkspacesFoldersRevert(path: string, opts: AccountsContainersWorkspacesFoldersRevertOptions = {}): Promise<RevertFolderResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:revert`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as RevertFolderResponse;
  }

  /**
   * Updates a GTM Folder.
   *
   * @param path GTM Folder's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/folders/{folder_id}
   */
  async accountsContainersWorkspacesFoldersUpdate(path: string, req: Folder, opts: AccountsContainersWorkspacesFoldersUpdateOptions = {}): Promise<Folder> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Folder;
  }

  /**
   * Gets a Workspace.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesGet(path: string): Promise<Workspace> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Workspace;
  }

  /**
   * Finds conflicting and modified entities in the workspace.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesGetStatus(path: string): Promise<GetWorkspaceStatusResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }/status`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetWorkspaceStatusResponse(data);
  }

  /**
   * Creates a Google tag config.
   *
   * @param parent Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesGtag_configCreate(parent: string, req: GtagConfig): Promise<GtagConfig> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/gtag_config`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GtagConfig;
  }

  /**
   * Deletes a Google tag config.
   *
   * @param path Google tag config's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/gtag_config/{gtag_config_id}
   */
  async accountsContainersWorkspacesGtag_configDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a Google tag config.
   *
   * @param path Google tag config's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/gtag_config/{gtag_config_id}
   */
  async accountsContainersWorkspacesGtag_configGet(path: string): Promise<GtagConfig> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GtagConfig;
  }

  /**
   * Lists all Google tag configs in a Container.
   *
   * @param parent Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesGtag_configList(parent: string, opts: AccountsContainersWorkspacesGtag_configListOptions = {}): Promise<ListGtagConfigResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/gtag_config`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListGtagConfigResponse;
  }

  /**
   * Updates a Google tag config.
   *
   * @param path Google tag config's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/gtag_config/{gtag_config_id}
   */
  async accountsContainersWorkspacesGtag_configUpdate(path: string, req: GtagConfig, opts: AccountsContainersWorkspacesGtag_configUpdateOptions = {}): Promise<GtagConfig> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GtagConfig;
  }

  /**
   * Lists all Workspaces that belong to a GTM Container.
   *
   * @param parent GTM parent Container's API relative path. Example: accounts/{account_id}/containers/{container_id}
   */
  async accountsContainersWorkspacesList(parent: string, opts: AccountsContainersWorkspacesListOptions = {}): Promise<ListWorkspacesResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/workspaces`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListWorkspacesResponse;
  }

  /**
   * Quick previews a workspace by creating a fake container version from all
   * entities in the provided workspace.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesQuick_preview(path: string): Promise<QuickPreviewResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:quick_preview`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeQuickPreviewResponse(data);
  }

  /**
   * Resolves a merge conflict for a workspace entity by updating it to the
   * resolved entity passed in the request.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesResolve_conflict(path: string, req: Entity, opts: AccountsContainersWorkspacesResolve_conflictOptions = {}): Promise<void> {
    req = serializeEntity(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:resolve_conflict`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Syncs a workspace to the latest container version by updating all
   * unmodified workspace entities and displaying conflicts for modified
   * entities.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesSync(path: string): Promise<SyncWorkspaceResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:sync`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeSyncWorkspaceResponse(data);
  }

  /**
   * Creates a GTM Tag.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesTagsCreate(parent: string, req: Tag): Promise<Tag> {
    req = serializeTag(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/tags`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTag(data);
  }

  /**
   * Deletes a GTM Tag.
   *
   * @param path GTM Tag's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/tags/{tag_id}
   */
  async accountsContainersWorkspacesTagsDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a GTM Tag.
   *
   * @param path GTM Tag's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/tags/{tag_id}
   */
  async accountsContainersWorkspacesTagsGet(path: string): Promise<Tag> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTag(data);
  }

  /**
   * Lists all GTM Tags of a Container.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesTagsList(parent: string, opts: AccountsContainersWorkspacesTagsListOptions = {}): Promise<ListTagsResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/tags`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListTagsResponse(data);
  }

  /**
   * Reverts changes to a GTM Tag in a GTM Workspace.
   *
   * @param path GTM Tag's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/tags/{tag_id}
   */
  async accountsContainersWorkspacesTagsRevert(path: string, opts: AccountsContainersWorkspacesTagsRevertOptions = {}): Promise<RevertTagResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:revert`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeRevertTagResponse(data);
  }

  /**
   * Updates a GTM Tag.
   *
   * @param path GTM Tag's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/tags/{tag_id}
   */
  async accountsContainersWorkspacesTagsUpdate(path: string, req: Tag, opts: AccountsContainersWorkspacesTagsUpdateOptions = {}): Promise<Tag> {
    req = serializeTag(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeTag(data);
  }

  /**
   * Creates a GTM Custom Template.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesTemplatesCreate(parent: string, req: CustomTemplate): Promise<CustomTemplate> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/templates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomTemplate;
  }

  /**
   * Deletes a GTM Template.
   *
   * @param path GTM Custom Template's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/templates/{template_id}
   */
  async accountsContainersWorkspacesTemplatesDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a GTM Template.
   *
   * @param path GTM Custom Template's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/templates/{template_id}
   */
  async accountsContainersWorkspacesTemplatesGet(path: string): Promise<CustomTemplate> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomTemplate;
  }

  /**
   * Lists all GTM Templates of a GTM container workspace.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesTemplatesList(parent: string, opts: AccountsContainersWorkspacesTemplatesListOptions = {}): Promise<ListTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/templates`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListTemplatesResponse;
  }

  /**
   * Reverts changes to a GTM Template in a GTM Workspace.
   *
   * @param path GTM Custom Template's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/templates/{template_id}
   */
  async accountsContainersWorkspacesTemplatesRevert(path: string, opts: AccountsContainersWorkspacesTemplatesRevertOptions = {}): Promise<RevertTemplateResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:revert`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as RevertTemplateResponse;
  }

  /**
   * Updates a GTM Template.
   *
   * @param path GTM Custom Template's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/templates/{template_id}
   */
  async accountsContainersWorkspacesTemplatesUpdate(path: string, req: CustomTemplate, opts: AccountsContainersWorkspacesTemplatesUpdateOptions = {}): Promise<CustomTemplate> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as CustomTemplate;
  }

  /**
   * Creates a GTM Trigger.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesTriggersCreate(parent: string, req: Trigger): Promise<Trigger> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/triggers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Trigger;
  }

  /**
   * Deletes a GTM Trigger.
   *
   * @param path GTM Trigger's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/triggers/{trigger_id}
   */
  async accountsContainersWorkspacesTriggersDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a GTM Trigger.
   *
   * @param path GTM Trigger's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/triggers/{trigger_id}
   */
  async accountsContainersWorkspacesTriggersGet(path: string): Promise<Trigger> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Trigger;
  }

  /**
   * Lists all GTM Triggers of a Container.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesTriggersList(parent: string, opts: AccountsContainersWorkspacesTriggersListOptions = {}): Promise<ListTriggersResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/triggers`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListTriggersResponse;
  }

  /**
   * Reverts changes to a GTM Trigger in a GTM Workspace.
   *
   * @param path GTM Trigger's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/triggers/{trigger_id}
   */
  async accountsContainersWorkspacesTriggersRevert(path: string, opts: AccountsContainersWorkspacesTriggersRevertOptions = {}): Promise<RevertTriggerResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:revert`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as RevertTriggerResponse;
  }

  /**
   * Updates a GTM Trigger.
   *
   * @param path GTM Trigger's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/triggers/{trigger_id}
   */
  async accountsContainersWorkspacesTriggersUpdate(path: string, req: Trigger, opts: AccountsContainersWorkspacesTriggersUpdateOptions = {}): Promise<Trigger> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Trigger;
  }

  /**
   * Updates a Workspace.
   *
   * @param path GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesUpdate(path: string, req: Workspace, opts: AccountsContainersWorkspacesUpdateOptions = {}): Promise<Workspace> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Workspace;
  }

  /**
   * Creates a GTM Variable.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesVariablesCreate(parent: string, req: Variable): Promise<Variable> {
    req = serializeVariable(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/variables`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVariable(data);
  }

  /**
   * Deletes a GTM Variable.
   *
   * @param path GTM Variable's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/variables/{variable_id}
   */
  async accountsContainersWorkspacesVariablesDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a GTM Variable.
   *
   * @param path GTM Variable's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/variables/{variable_id}
   */
  async accountsContainersWorkspacesVariablesGet(path: string): Promise<Variable> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVariable(data);
  }

  /**
   * Lists all GTM Variables of a Container.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesVariablesList(parent: string, opts: AccountsContainersWorkspacesVariablesListOptions = {}): Promise<ListVariablesResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/variables`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListVariablesResponse(data);
  }

  /**
   * Reverts changes to a GTM Variable in a GTM Workspace.
   *
   * @param path GTM Variable's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/variables/{variable_id}
   */
  async accountsContainersWorkspacesVariablesRevert(path: string, opts: AccountsContainersWorkspacesVariablesRevertOptions = {}): Promise<RevertVariableResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:revert`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeRevertVariableResponse(data);
  }

  /**
   * Updates a GTM Variable.
   *
   * @param path GTM Variable's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/variables/{variable_id}
   */
  async accountsContainersWorkspacesVariablesUpdate(path: string, req: Variable, opts: AccountsContainersWorkspacesVariablesUpdateOptions = {}): Promise<Variable> {
    req = serializeVariable(req);
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeVariable(data);
  }

  /**
   * Creates a GTM Zone.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesZonesCreate(parent: string, req: Zone): Promise<Zone> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/zones`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Zone;
  }

  /**
   * Deletes a GTM Zone.
   *
   * @param path GTM Zone's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/zones/{zone_id}
   */
  async accountsContainersWorkspacesZonesDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a GTM Zone.
   *
   * @param path GTM Zone's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/zones/{zone_id}
   */
  async accountsContainersWorkspacesZonesGet(path: string): Promise<Zone> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Zone;
  }

  /**
   * Lists all GTM Zones of a GTM container workspace.
   *
   * @param parent GTM Workspace's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
   */
  async accountsContainersWorkspacesZonesList(parent: string, opts: AccountsContainersWorkspacesZonesListOptions = {}): Promise<ListZonesResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/zones`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListZonesResponse;
  }

  /**
   * Reverts changes to a GTM Zone in a GTM Workspace.
   *
   * @param path GTM Zone's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/zones/{zone_id}
   */
  async accountsContainersWorkspacesZonesRevert(path: string, opts: AccountsContainersWorkspacesZonesRevertOptions = {}): Promise<RevertZoneResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }:revert`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as RevertZoneResponse;
  }

  /**
   * Updates a GTM Zone.
   *
   * @param path GTM Zone's API relative path. Example: accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/zones/{zone_id}
   */
  async accountsContainersWorkspacesZonesUpdate(path: string, req: Zone, opts: AccountsContainersWorkspacesZonesUpdateOptions = {}): Promise<Zone> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Zone;
  }

  /**
   * Gets a GTM Account.
   *
   * @param path GTM Account's API relative path. Example: accounts/{account_id}
   */
  async accountsGet(path: string): Promise<Account> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Account;
  }

  /**
   * Lists all GTM Accounts that a user has access to.
   *
   */
  async accountsList(opts: AccountsListOptions = {}): Promise<ListAccountsResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/accounts`);
    if (opts.includeGoogleTags !== undefined) {
      url.searchParams.append("includeGoogleTags", String(opts.includeGoogleTags));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAccountsResponse;
  }

  /**
   * Updates a GTM Account.
   *
   * @param path GTM Account's API relative path. Example: accounts/{account_id}
   */
  async accountsUpdate(path: string, req: Account, opts: AccountsUpdateOptions = {}): Promise<Account> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    if (opts.fingerprint !== undefined) {
      url.searchParams.append("fingerprint", String(opts.fingerprint));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Account;
  }

  /**
   * Creates a user's Account & Container access.
   *
   * @param parent GTM Account's API relative path. Example: accounts/{account_id}
   */
  async accountsUser_permissionsCreate(parent: string, req: UserPermission): Promise<UserPermission> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/user_permissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UserPermission;
  }

  /**
   * Removes a user from the account, revoking access to it and all of its
   * containers.
   *
   * @param path GTM UserPermission's API relative path. Example: accounts/{account_id}/user_permissions/{user_permission_id}
   */
  async accountsUser_permissionsDelete(path: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a user's Account & Container access.
   *
   * @param path GTM UserPermission's API relative path. Example: accounts/{account_id}/user_permissions/{user_permission_id}
   */
  async accountsUser_permissionsGet(path: string): Promise<UserPermission> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UserPermission;
  }

  /**
   * List all users that have access to the account along with Account and
   * Container user access granted to each of them.
   *
   * @param parent GTM Account's API relative path. Example: accounts/{account_id}
   */
  async accountsUser_permissionsList(parent: string, opts: AccountsUser_permissionsListOptions = {}): Promise<ListUserPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ parent }/user_permissions`);
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListUserPermissionsResponse;
  }

  /**
   * Updates a user's Account & Container access.
   *
   * @param path GTM UserPermission's API relative path. Example: accounts/{account_id}/user_permissions/{user_permission_id}
   */
  async accountsUser_permissionsUpdate(path: string, req: UserPermission): Promise<UserPermission> {
    const url = new URL(`${this.#baseUrl}tagmanager/v2/${ path }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as UserPermission;
  }
}

/**
 * Represents a Google Tag Manager Account.
 */
export interface Account {
  /**
   * The Account ID uniquely identifies the GTM Account.
   */
  accountId?: string;
  /**
   * Read-only Account feature set
   */
  features?: AccountFeatures;
  /**
   * The fingerprint of the GTM Account as computed at storage time. This value
   * is recomputed whenever the account is modified.
   */
  fingerprint?: string;
  /**
   * Account display name. @mutable tagmanager.accounts.create @mutable
   * tagmanager.accounts.update
   */
  name?: string;
  /**
   * GTM Account's API relative path.
   */
  path?: string;
  /**
   * Whether the account shares data anonymously with Google and others. This
   * flag enables benchmarking by sharing your data in an anonymous form. Google
   * will remove all identifiable information about your website, combine the
   * data with hundreds of other anonymous sites and report aggregate trends in
   * the benchmarking service. @mutable tagmanager.accounts.create @mutable
   * tagmanager.accounts.update
   */
  shareData?: boolean;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
}

/**
 * Defines the Google Tag Manager Account access permissions.
 */
export interface AccountAccess {
  /**
   * Whether the user has no access, user access, or admin access to an
   * account. @mutable tagmanager.accounts.permissions.create @mutable
   * tagmanager.accounts.permissions.update
   */
  permission?:  | "accountPermissionUnspecified" | "noAccess" | "user" | "admin";
}

export interface AccountFeatures {
  /**
   * Whether this Account supports multiple Containers.
   */
  supportMultipleContainers?: boolean;
  /**
   * Whether this Account supports user permissions managed by GTM.
   */
  supportUserPermissions?: boolean;
}

/**
 * Additional options for TagManager#accountsContainersCombine.
 */
export interface AccountsContainersCombineOptions {
  /**
   * Must be set to true to allow features.user_permissions to change from
   * false to true. If this operation causes an update but this bit is false,
   * the operation will fail.
   */
  allowUserPermissionFeatureUpdate?: boolean;
  /**
   * ID of container that will be merged into the current container.
   */
  containerId?: string;
  /**
   * Specify the source of config setting after combine
   */
  settingSource?:  | "settingSourceUnspecified" | "current" | "other";
}

/**
 * Additional options for TagManager#accountsContainersDestinationsLink.
 */
export interface AccountsContainersDestinationsLinkOptions {
  /**
   * Must be set to true to allow features.user_permissions to change from
   * false to true. If this operation causes an update but this bit is false,
   * the operation will fail.
   */
  allowUserPermissionFeatureUpdate?: boolean;
  /**
   * Destination ID to be linked to the current container.
   */
  destinationId?: string;
}

/**
 * Additional options for TagManager#accountsContainersEnvironmentsList.
 */
export interface AccountsContainersEnvironmentsListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsContainersEnvironmentsUpdate.
 */
export interface AccountsContainersEnvironmentsUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the
   * environment in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersList.
 */
export interface AccountsContainersListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsContainersLookup.
 */
export interface AccountsContainersLookupOptions {
  /**
   * Destination ID linked to a GTM Container, e.g. AW-123456789. Example:
   * accounts/containers:lookup?destination_id={destination_id}.
   */
  destinationId?: string;
}

/**
 * Additional options for TagManager#accountsContainersMove_tag_id.
 */
export interface AccountsContainersMove_tag_idOptions {
  /**
   * Must be set to true to allow features.user_permissions to change from
   * false to true. If this operation causes an update but this bit is false,
   * the operation will fail.
   */
  allowUserPermissionFeatureUpdate?: boolean;
  /**
   * Whether or not to copy tag settings from this tag to the new tag.
   */
  copySettings?: boolean;
  /**
   * Must be set to true to accept all terms of service agreements copied from
   * the current tag to the newly created tag. If this bit is false, the
   * operation will fail.
   */
  copyTermsOfService?: boolean;
  /**
   * Whether or not to copy users from this tag to the new tag.
   */
  copyUsers?: boolean;
  /**
   * Tag ID to be removed from the current Container.
   */
  tagId?: string;
  /**
   * The name for the newly created tag.
   */
  tagName?: string;
}

/**
 * Additional options for TagManager#accountsContainersUpdate.
 */
export interface AccountsContainersUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the
   * container in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersVersion_headersList.
 */
export interface AccountsContainersVersion_headersListOptions {
  /**
   * Also retrieve deleted (archived) versions when true.
   */
  includeDeleted?: boolean;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsContainersVersionsGet.
 */
export interface AccountsContainersVersionsGetOptions {
  /**
   * The GTM ContainerVersion ID. Specify published to retrieve the currently
   * published version.
   */
  containerVersionId?: string;
}

/**
 * Additional options for TagManager#accountsContainersVersionsPublish.
 */
export interface AccountsContainersVersionsPublishOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the
   * container version in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersVersionsUpdate.
 */
export interface AccountsContainersVersionsUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the
   * container version in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesBuilt_in_variablesCreate.
 */
export interface AccountsContainersWorkspacesBuilt_in_variablesCreateOptions {
  /**
   * The types of built-in variables to enable.
   */
  type?:  | "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion";
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesBuilt_in_variablesDelete.
 */
export interface AccountsContainersWorkspacesBuilt_in_variablesDeleteOptions {
  /**
   * The types of built-in variables to delete.
   */
  type?:  | "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion";
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesBuilt_in_variablesList.
 */
export interface AccountsContainersWorkspacesBuilt_in_variablesListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesBuilt_in_variablesRevert.
 */
export interface AccountsContainersWorkspacesBuilt_in_variablesRevertOptions {
  /**
   * The type of built-in variable to revert.
   */
  type?:  | "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion";
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesClientsList.
 */
export interface AccountsContainersWorkspacesClientsListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesClientsRevert.
 */
export interface AccountsContainersWorkspacesClientsRevertOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the client
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesClientsUpdate.
 */
export interface AccountsContainersWorkspacesClientsUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the client
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesFoldersEntities.
 */
export interface AccountsContainersWorkspacesFoldersEntitiesOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesFoldersList.
 */
export interface AccountsContainersWorkspacesFoldersListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesFoldersMove_entities_to_folder.
 */
export interface AccountsContainersWorkspacesFoldersMove_entities_to_folderOptions {
  /**
   * The tags to be moved to the folder.
   */
  tagId?: string;
  /**
   * The triggers to be moved to the folder.
   */
  triggerId?: string;
  /**
   * The variables to be moved to the folder.
   */
  variableId?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesFoldersRevert.
 */
export interface AccountsContainersWorkspacesFoldersRevertOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the tag in
   * storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesFoldersUpdate.
 */
export interface AccountsContainersWorkspacesFoldersUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the folder
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesGtag_configList.
 */
export interface AccountsContainersWorkspacesGtag_configListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesGtag_configUpdate.
 */
export interface AccountsContainersWorkspacesGtag_configUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the config
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesList.
 */
export interface AccountsContainersWorkspacesListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesResolve_conflict.
 */
export interface AccountsContainersWorkspacesResolve_conflictOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the
   * entity_in_workspace in the merge conflict.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesTagsList.
 */
export interface AccountsContainersWorkspacesTagsListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesTagsRevert.
 */
export interface AccountsContainersWorkspacesTagsRevertOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of thetag in
   * storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesTagsUpdate.
 */
export interface AccountsContainersWorkspacesTagsUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the tag in
   * storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesTemplatesList.
 */
export interface AccountsContainersWorkspacesTemplatesListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesTemplatesRevert.
 */
export interface AccountsContainersWorkspacesTemplatesRevertOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the template
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesTemplatesUpdate.
 */
export interface AccountsContainersWorkspacesTemplatesUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the
   * templates in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesTriggersList.
 */
export interface AccountsContainersWorkspacesTriggersListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesTriggersRevert.
 */
export interface AccountsContainersWorkspacesTriggersRevertOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the trigger
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesTriggersUpdate.
 */
export interface AccountsContainersWorkspacesTriggersUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the trigger
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesUpdate.
 */
export interface AccountsContainersWorkspacesUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the
   * workspace in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesVariablesList.
 */
export interface AccountsContainersWorkspacesVariablesListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesVariablesRevert.
 */
export interface AccountsContainersWorkspacesVariablesRevertOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the variable
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for
 * TagManager#accountsContainersWorkspacesVariablesUpdate.
 */
export interface AccountsContainersWorkspacesVariablesUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the variable
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesZonesList.
 */
export interface AccountsContainersWorkspacesZonesListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesZonesRevert.
 */
export interface AccountsContainersWorkspacesZonesRevertOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the zone in
   * storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsContainersWorkspacesZonesUpdate.
 */
export interface AccountsContainersWorkspacesZonesUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the zone in
   * storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsList.
 */
export interface AccountsListOptions {
  /**
   * Also retrieve accounts associated with Google Tag when true.
   */
  includeGoogleTags?: boolean;
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for TagManager#accountsUpdate.
 */
export interface AccountsUpdateOptions {
  /**
   * When provided, this fingerprint must match the fingerprint of the account
   * in storage.
   */
  fingerprint?: string;
}

/**
 * Additional options for TagManager#accountsUser_permissionsList.
 */
export interface AccountsUser_permissionsListOptions {
  /**
   * Continuation token for fetching the next page of results.
   */
  pageToken?: string;
}

/**
 * Built-in variables are a special category of variables that are pre-created
 * and non-customizable. They provide common functionality like accessing
 * properties of the gtm data layer, monitoring clicks, or accessing elements of
 * a page URL.
 */
export interface BuiltInVariable {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * Name of the built-in variable to be used to refer to the built-in
   * variable.
   */
  name?: string;
  /**
   * GTM BuiltInVariable's API relative path.
   */
  path?: string;
  /**
   * Type of built-in variable.
   * @required.tagmanager.accounts.containers.workspaces.built_in_variable.update
   * @mutable tagmanager.accounts.containers.workspaces.built_in_variable.update
   */
  type?:  | "builtInVariableTypeUnspecified" | "pageUrl" | "pageHostname" | "pagePath" | "referrer" | "event" | "clickElement" | "clickClasses" | "clickId" | "clickTarget" | "clickUrl" | "clickText" | "firstPartyServingUrl" | "formElement" | "formClasses" | "formId" | "formTarget" | "formUrl" | "formText" | "errorMessage" | "errorUrl" | "errorLine" | "newHistoryUrl" | "oldHistoryUrl" | "newHistoryFragment" | "oldHistoryFragment" | "newHistoryState" | "oldHistoryState" | "historySource" | "containerVersion" | "debugMode" | "randomNumber" | "containerId" | "appId" | "appName" | "appVersionCode" | "appVersionName" | "language" | "osVersion" | "platform" | "sdkVersion" | "deviceName" | "resolution" | "advertiserId" | "advertisingTrackingEnabled" | "htmlId" | "environmentName" | "ampBrowserLanguage" | "ampCanonicalPath" | "ampCanonicalUrl" | "ampCanonicalHost" | "ampReferrer" | "ampTitle" | "ampClientId" | "ampClientTimezone" | "ampClientTimestamp" | "ampClientScreenWidth" | "ampClientScreenHeight" | "ampClientScrollX" | "ampClientScrollY" | "ampClientMaxScrollX" | "ampClientMaxScrollY" | "ampTotalEngagedTime" | "ampPageViewId" | "ampPageLoadTime" | "ampPageDownloadTime" | "ampGtmEvent" | "eventName" | "firebaseEventParameterCampaign" | "firebaseEventParameterCampaignAclid" | "firebaseEventParameterCampaignAnid" | "firebaseEventParameterCampaignClickTimestamp" | "firebaseEventParameterCampaignContent" | "firebaseEventParameterCampaignCp1" | "firebaseEventParameterCampaignGclid" | "firebaseEventParameterCampaignSource" | "firebaseEventParameterCampaignTerm" | "firebaseEventParameterCurrency" | "firebaseEventParameterDynamicLinkAcceptTime" | "firebaseEventParameterDynamicLinkLinkid" | "firebaseEventParameterNotificationMessageDeviceTime" | "firebaseEventParameterNotificationMessageId" | "firebaseEventParameterNotificationMessageName" | "firebaseEventParameterNotificationMessageTime" | "firebaseEventParameterNotificationTopic" | "firebaseEventParameterPreviousAppVersion" | "firebaseEventParameterPreviousOsVersion" | "firebaseEventParameterPrice" | "firebaseEventParameterProductId" | "firebaseEventParameterQuantity" | "firebaseEventParameterValue" | "videoProvider" | "videoUrl" | "videoTitle" | "videoDuration" | "videoPercent" | "videoVisible" | "videoStatus" | "videoCurrentTime" | "scrollDepthThreshold" | "scrollDepthUnits" | "scrollDepthDirection" | "elementVisibilityRatio" | "elementVisibilityTime" | "elementVisibilityFirstTime" | "elementVisibilityRecentTime" | "requestPath" | "requestMethod" | "clientName" | "queryString" | "serverPageLocationUrl" | "serverPageLocationPath" | "serverPageLocationHostname" | "visitorRegion";
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
}

export interface Client {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * The Client ID uniquely identifies the GTM client.
   */
  clientId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * The fingerprint of the GTM Client as computed at storage time. This value
   * is recomputed whenever the client is modified.
   */
  fingerprint?: string;
  /**
   * Client display name. @mutable
   * tagmanager.accounts.containers.workspaces.clients.create @mutable
   * tagmanager.accounts.containers.workspaces.clients.update
   */
  name?: string;
  /**
   * User notes on how to apply this tag in the container. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  notes?: string;
  /**
   * The client's parameters. @mutable
   * tagmanager.accounts.containers.workspaces.clients.create @mutable
   * tagmanager.accounts.containers.workspaces.clients.update
   */
  parameter?: Parameter[];
  /**
   * Parent folder id.
   */
  parentFolderId?: string;
  /**
   * GTM client's API relative path.
   */
  path?: string;
  /**
   * Priority determines relative firing order. @mutable
   * tagmanager.accounts.containers.workspaces.clients.create @mutable
   * tagmanager.accounts.containers.workspaces.clients.update
   */
  priority?: number;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * Client type. @mutable
   * tagmanager.accounts.containers.workspaces.clients.create @mutable
   * tagmanager.accounts.containers.workspaces.clients.update
   */
  type?: string;
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
}

/**
 * Represents a predicate.
 */
export interface Condition {
  /**
   * A list of named parameters (key/value), depending on the condition's type.
   * Notes: - For binary operators, include parameters named arg0 and arg1 for
   * specifying the left and right operands, respectively. - At this time, the
   * left operand (arg0) must be a reference to a variable. - For
   * case-insensitive Regex matching, include a boolean parameter named
   * ignore_case that is set to true. If not specified or set to any other
   * value, the matching will be case sensitive. - To negate an operator,
   * include a boolean parameter named negate boolean parameter that is set to
   * true. @mutable tagmanager.accounts.containers.workspaces.triggers.create
   * @mutable tagmanager.accounts.containers.workspaces.triggers.update
   */
  parameter?: Parameter[];
  /**
   * The type of operator for this condition. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  type?:  | "conditionTypeUnspecified" | "equals" | "contains" | "startsWith" | "endsWith" | "matchRegex" | "greater" | "greaterOrEquals" | "less" | "lessOrEquals" | "cssSelector" | "urlMatches";
}

/**
 * Represents a Google Tag Manager Container, which specifies the platform tags
 * will run on, manages workspaces, and retains container versions.
 */
export interface Container {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * The Container ID uniquely identifies the GTM Container.
   */
  containerId?: string;
  /**
   * List of domain names associated with the Container. @mutable
   * tagmanager.accounts.containers.create @mutable
   * tagmanager.accounts.containers.update
   */
  domainName?: string[];
  /**
   * Read-only Container feature set.
   */
  features?: ContainerFeatures;
  /**
   * The fingerprint of the GTM Container as computed at storage time. This
   * value is recomputed whenever the account is modified.
   */
  fingerprint?: string;
  /**
   * Container display name. @mutable tagmanager.accounts.containers.create
   * @mutable tagmanager.accounts.containers.update
   */
  name?: string;
  /**
   * Container Notes. @mutable tagmanager.accounts.containers.create @mutable
   * tagmanager.accounts.containers.update
   */
  notes?: string;
  /**
   * GTM Container's API relative path.
   */
  path?: string;
  /**
   * Container Public ID.
   */
  publicId?: string;
  /**
   * List of server-side container URLs for the Container. If multiple URLs are
   * provided, all URL paths must match. @mutable
   * tagmanager.accounts.containers.create @mutable
   * tagmanager.accounts.containers.update
   */
  taggingServerUrls?: string[];
  /**
   * All Tag IDs that refer to this Container.
   */
  tagIds?: string[];
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * List of Usage Contexts for the Container. Valid values include: web,
   * android, or ios. @mutable tagmanager.accounts.containers.create @mutable
   * tagmanager.accounts.containers.update
   */
  usageContext?:  | "usageContextUnspecified" | "web" | "android" | "ios" | "androidSdk5" | "iosSdk5" | "amp" | "server"[];
}

/**
 * Defines the Google Tag Manager Container access permissions.
 */
export interface ContainerAccess {
  /**
   * GTM Container ID. @mutable tagmanager.accounts.permissions.create @mutable
   * tagmanager.accounts.permissions.update
   */
  containerId?: string;
  /**
   * List of Container permissions. @mutable
   * tagmanager.accounts.permissions.create @mutable
   * tagmanager.accounts.permissions.update
   */
  permission?:  | "containerPermissionUnspecified" | "noAccess" | "read" | "edit" | "approve" | "publish";
}

export interface ContainerFeatures {
  /**
   * Whether this Container supports built-in variables
   */
  supportBuiltInVariables?: boolean;
  /**
   * Whether this Container supports clients.
   */
  supportClients?: boolean;
  /**
   * Whether this Container supports environments.
   */
  supportEnvironments?: boolean;
  /**
   * Whether this Container supports folders.
   */
  supportFolders?: boolean;
  /**
   * Whether this Container supports Google tag config.
   */
  supportGtagConfigs?: boolean;
  /**
   * Whether this Container supports tags.
   */
  supportTags?: boolean;
  /**
   * Whether this Container supports templates.
   */
  supportTemplates?: boolean;
  /**
   * Whether this Container supports triggers.
   */
  supportTriggers?: boolean;
  /**
   * Whether this Container supports user permissions managed by GTM.
   */
  supportUserPermissions?: boolean;
  /**
   * Whether this Container supports variables.
   */
  supportVariables?: boolean;
  /**
   * Whether this Container supports Container versions.
   */
  supportVersions?: boolean;
  /**
   * Whether this Container supports workspaces.
   */
  supportWorkspaces?: boolean;
  /**
   * Whether this Container supports zones.
   */
  supportZones?: boolean;
}

/**
 * Represents a Google Tag Manager Container Version.
 */
export interface ContainerVersion {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * The built-in variables in the container that this version was taken from.
   */
  builtInVariable?: BuiltInVariable[];
  /**
   * The clients in the container that this version was taken from.
   */
  client?: Client[];
  /**
   * The container that this version was taken from.
   */
  container?: Container;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * The Container Version ID uniquely identifies the GTM Container Version.
   */
  containerVersionId?: string;
  /**
   * The custom templates in the container that this version was taken from.
   */
  customTemplate?: CustomTemplate[];
  /**
   * A value of true indicates this container version has been deleted.
   */
  deleted?: boolean;
  /**
   * Container version description. @mutable
   * tagmanager.accounts.containers.versions.update
   */
  description?: string;
  /**
   * The fingerprint of the GTM Container Version as computed at storage time.
   * This value is recomputed whenever the container version is modified.
   */
  fingerprint?: string;
  /**
   * The folders in the container that this version was taken from.
   */
  folder?: Folder[];
  /**
   * The Google tag configs in the container that this version was taken from.
   */
  gtagConfig?: GtagConfig[];
  /**
   * Container version display name. @mutable
   * tagmanager.accounts.containers.versions.update
   */
  name?: string;
  /**
   * GTM Container Version's API relative path.
   */
  path?: string;
  /**
   * The tags in the container that this version was taken from.
   */
  tag?: Tag[];
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * The triggers in the container that this version was taken from.
   */
  trigger?: Trigger[];
  /**
   * The variables in the container that this version was taken from.
   */
  variable?: Variable[];
  /**
   * The zones in the container that this version was taken from.
   */
  zone?: Zone[];
}

function serializeContainerVersion(data: any): ContainerVersion {
  return {
    ...data,
    tag: data["tag"] !== undefined ? data["tag"].map((item: any) => (serializeTag(item))) : undefined,
    variable: data["variable"] !== undefined ? data["variable"].map((item: any) => (serializeVariable(item))) : undefined,
  };
}

function deserializeContainerVersion(data: any): ContainerVersion {
  return {
    ...data,
    tag: data["tag"] !== undefined ? data["tag"].map((item: any) => (deserializeTag(item))) : undefined,
    variable: data["variable"] !== undefined ? data["variable"].map((item: any) => (deserializeVariable(item))) : undefined,
  };
}

/**
 * Represents a Google Tag Manager Container Version Header.
 */
export interface ContainerVersionHeader {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * The Container Version ID uniquely identifies the GTM Container Version.
   */
  containerVersionId?: string;
  /**
   * A value of true indicates this container version has been deleted.
   */
  deleted?: boolean;
  /**
   * Container version display name.
   */
  name?: string;
  /**
   * Number of clients in the container version.
   */
  numClients?: string;
  /**
   * Number of custom templates in the container version.
   */
  numCustomTemplates?: string;
  /**
   * Number of Google tag configs in the container version.
   */
  numGtagConfigs?: string;
  /**
   * Number of macros in the container version.
   */
  numMacros?: string;
  /**
   * Number of rules in the container version.
   */
  numRules?: string;
  /**
   * Number of tags in the container version.
   */
  numTags?: string;
  /**
   * Number of triggers in the container version.
   */
  numTriggers?: string;
  /**
   * Number of variables in the container version.
   */
  numVariables?: string;
  /**
   * Number of zones in the container version.
   */
  numZones?: string;
  /**
   * GTM Container Version's API relative path.
   */
  path?: string;
}

export interface CreateBuiltInVariableResponse {
  /**
   * List of created built-in variables.
   */
  builtInVariable?: BuiltInVariable[];
}

/**
 * Options for new container versions.
 */
export interface CreateContainerVersionRequestVersionOptions {
  /**
   * The name of the container version to be created.
   */
  name?: string;
  /**
   * The notes of the container version to be created.
   */
  notes?: string;
}

/**
 * Create container versions response.
 */
export interface CreateContainerVersionResponse {
  /**
   * Compiler errors or not.
   */
  compilerError?: boolean;
  /**
   * The container version created.
   */
  containerVersion?: ContainerVersion;
  /**
   * Auto generated workspace path created as a result of version creation.
   * This field should only be populated if the created version was not a quick
   * preview.
   */
  newWorkspacePath?: string;
  /**
   * Whether version creation failed when syncing the workspace to the latest
   * container version.
   */
  syncStatus?: SyncStatus;
}

function serializeCreateContainerVersionResponse(data: any): CreateContainerVersionResponse {
  return {
    ...data,
    containerVersion: data["containerVersion"] !== undefined ? serializeContainerVersion(data["containerVersion"]) : undefined,
  };
}

function deserializeCreateContainerVersionResponse(data: any): CreateContainerVersionResponse {
  return {
    ...data,
    containerVersion: data["containerVersion"] !== undefined ? deserializeContainerVersion(data["containerVersion"]) : undefined,
  };
}

/**
 * Represents a Google Tag Manager Custom Template's contents.
 */
export interface CustomTemplate {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * The fingerprint of the GTM Custom Template as computed at storage time.
   * This value is recomputed whenever the template is modified.
   */
  fingerprint?: string;
  /**
   * A reference to the Community Template Gallery entry.
   */
  galleryReference?: GalleryReference;
  /**
   * Custom Template display name.
   */
  name?: string;
  /**
   * GTM Custom Template's API relative path.
   */
  path?: string;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * The custom template in text format.
   */
  templateData?: string;
  /**
   * The Custom Template ID uniquely identifies the GTM custom template.
   */
  templateId?: string;
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
}

/**
 * Represents a Google Tag Destination.
 */
export interface Destination {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * Destination ID.
   */
  destinationId?: string;
  /**
   * The Destination link ID uniquely identifies the Destination.
   */
  destinationLinkId?: string;
  /**
   * The fingerprint of the Google Tag Destination as computed at storage time.
   * This value is recomputed whenever the destination is modified.
   */
  fingerprint?: string;
  /**
   * Destination display name.
   */
  name?: string;
  /**
   * Destination's API relative path.
   */
  path?: string;
  /**
   * Auto generated link to the tag manager UI.
   */
  tagManagerUrl?: string;
}

/**
 * A workspace entity that may represent a tag, trigger, variable, or folder in
 * addition to its status in the workspace.
 */
export interface Entity {
  /**
   * Represents how the entity has been changed in the workspace.
   */
  changeStatus?:  | "changeStatusUnspecified" | "none" | "added" | "deleted" | "updated";
  /**
   * The client being represented by the entity.
   */
  client?: Client;
  /**
   * The folder being represented by the entity.
   */
  folder?: Folder;
  /**
   * The tag being represented by the entity.
   */
  tag?: Tag;
  /**
   * The trigger being represented by the entity.
   */
  trigger?: Trigger;
  /**
   * The variable being represented by the entity.
   */
  variable?: Variable;
}

function serializeEntity(data: any): Entity {
  return {
    ...data,
    tag: data["tag"] !== undefined ? serializeTag(data["tag"]) : undefined,
    variable: data["variable"] !== undefined ? serializeVariable(data["variable"]) : undefined,
  };
}

function deserializeEntity(data: any): Entity {
  return {
    ...data,
    tag: data["tag"] !== undefined ? deserializeTag(data["tag"]) : undefined,
    variable: data["variable"] !== undefined ? deserializeVariable(data["variable"]) : undefined,
  };
}

/**
 * Represents a Google Tag Manager Environment. Note that a user can create,
 * delete and update environments of type USER, but can only update the
 * enable_debug and url fields of environments of other types.
 */
export interface Environment {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * The environment authorization code.
   */
  authorizationCode?: string;
  /**
   * The last update time-stamp for the authorization code.
   */
  authorizationTimestamp?: Date;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * Represents a link to a container version.
   */
  containerVersionId?: string;
  /**
   * The environment description. Can be set or changed only on USER type
   * environments. @mutable tagmanager.accounts.containers.environments.create
   * @mutable tagmanager.accounts.containers.environments.update
   */
  description?: string;
  /**
   * Whether or not to enable debug by default for the environment. @mutable
   * tagmanager.accounts.containers.environments.create @mutable
   * tagmanager.accounts.containers.environments.update
   */
  enableDebug?: boolean;
  /**
   * GTM Environment ID uniquely identifies the GTM Environment.
   */
  environmentId?: string;
  /**
   * The fingerprint of the GTM environment as computed at storage time. This
   * value is recomputed whenever the environment is modified.
   */
  fingerprint?: string;
  /**
   * The environment display name. Can be set or changed only on USER type
   * environments. @mutable tagmanager.accounts.containers.environments.create
   * @mutable tagmanager.accounts.containers.environments.update
   */
  name?: string;
  /**
   * GTM Environment's API relative path.
   */
  path?: string;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * The type of this environment.
   */
  type?:  | "user" | "live" | "latest" | "workspace";
  /**
   * Default preview page url for the environment. @mutable
   * tagmanager.accounts.containers.environments.create @mutable
   * tagmanager.accounts.containers.environments.update
   */
  url?: string;
  /**
   * Represents a link to a quick preview of a workspace.
   */
  workspaceId?: string;
}

function serializeEnvironment(data: any): Environment {
  return {
    ...data,
    authorizationTimestamp: data["authorizationTimestamp"] !== undefined ? data["authorizationTimestamp"].toISOString() : undefined,
  };
}

function deserializeEnvironment(data: any): Environment {
  return {
    ...data,
    authorizationTimestamp: data["authorizationTimestamp"] !== undefined ? new Date(data["authorizationTimestamp"]) : undefined,
  };
}

/**
 * Represents a Google Tag Manager Folder.
 */
export interface Folder {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * The fingerprint of the GTM Folder as computed at storage time. This value
   * is recomputed whenever the folder is modified.
   */
  fingerprint?: string;
  /**
   * The Folder ID uniquely identifies the GTM Folder.
   */
  folderId?: string;
  /**
   * Folder display name. @mutable
   * tagmanager.accounts.containers.workspaces.folders.create @mutable
   * tagmanager.accounts.containers.workspaces.folders.update
   */
  name?: string;
  /**
   * User notes on how to apply this folder in the container. @mutable
   * tagmanager.accounts.containers.workspaces.folders.create @mutable
   * tagmanager.accounts.containers.workspaces.folders.update
   */
  notes?: string;
  /**
   * GTM Folder's API relative path.
   */
  path?: string;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
}

/**
 * Represents a Google Tag Manager Folder's contents.
 */
export interface FolderEntities {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of tags inside the folder.
   */
  tag?: Tag[];
  /**
   * The list of triggers inside the folder.
   */
  trigger?: Trigger[];
  /**
   * The list of variables inside the folder.
   */
  variable?: Variable[];
}

function serializeFolderEntities(data: any): FolderEntities {
  return {
    ...data,
    tag: data["tag"] !== undefined ? data["tag"].map((item: any) => (serializeTag(item))) : undefined,
    variable: data["variable"] !== undefined ? data["variable"].map((item: any) => (serializeVariable(item))) : undefined,
  };
}

function deserializeFolderEntities(data: any): FolderEntities {
  return {
    ...data,
    tag: data["tag"] !== undefined ? data["tag"].map((item: any) => (deserializeTag(item))) : undefined,
    variable: data["variable"] !== undefined ? data["variable"].map((item: any) => (deserializeVariable(item))) : undefined,
  };
}

/**
 * Represents the link between a custom template and an entry on the Community
 * Template Gallery site.
 */
export interface GalleryReference {
  /**
   * The name of the host for the community gallery template.
   */
  host?: string;
  /**
   * If a user has manually edited the community gallery template.
   */
  isModified?: boolean;
  /**
   * The name of the owner for the community gallery template.
   */
  owner?: string;
  /**
   * The name of the repository for the community gallery template.
   */
  repository?: string;
  /**
   * The signature of the community gallery template as computed at import
   * time. This value is recomputed whenever the template is updated from the
   * gallery.
   */
  signature?: string;
  /**
   * The version of the community gallery template.
   */
  version?: string;
}

export interface GetContainerSnippetResponse {
  /**
   * Tagging snippet for a Container.
   */
  snippet?: string;
}

/**
 * The changes that have occurred in the workspace since the base container
 * version.
 */
export interface GetWorkspaceStatusResponse {
  /**
   * The merge conflict after sync.
   */
  mergeConflict?: MergeConflict[];
  /**
   * Entities that have been changed in the workspace.
   */
  workspaceChange?: Entity[];
}

function serializeGetWorkspaceStatusResponse(data: any): GetWorkspaceStatusResponse {
  return {
    ...data,
    mergeConflict: data["mergeConflict"] !== undefined ? data["mergeConflict"].map((item: any) => (serializeMergeConflict(item))) : undefined,
    workspaceChange: data["workspaceChange"] !== undefined ? data["workspaceChange"].map((item: any) => (serializeEntity(item))) : undefined,
  };
}

function deserializeGetWorkspaceStatusResponse(data: any): GetWorkspaceStatusResponse {
  return {
    ...data,
    mergeConflict: data["mergeConflict"] !== undefined ? data["mergeConflict"].map((item: any) => (deserializeMergeConflict(item))) : undefined,
    workspaceChange: data["workspaceChange"] !== undefined ? data["workspaceChange"].map((item: any) => (deserializeEntity(item))) : undefined,
  };
}

/**
 * Represents a Google tag configuration.
 */
export interface GtagConfig {
  /**
   * Google tag account ID.
   */
  accountId?: string;
  /**
   * Google tag container ID.
   */
  containerId?: string;
  /**
   * The fingerprint of the Google tag config as computed at storage time. This
   * value is recomputed whenever the config is modified.
   */
  fingerprint?: string;
  /**
   * The ID uniquely identifies the Google tag config.
   */
  gtagConfigId?: string;
  /**
   * The Google tag config's parameters. @mutable
   * tagmanager.accounts.containers.workspaces.gtag_config.create @mutable
   * tagmanager.accounts.containers.workspaces.gtag_config.update
   */
  parameter?: Parameter[];
  /**
   * Google tag config's API relative path.
   */
  path?: string;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * Google tag config type. @required
   * tagmanager.accounts.containers.workspaces.gtag_config.create @required
   * tagmanager.accounts.containers.workspaces.gtag_config.update @mutable
   * tagmanager.accounts.containers.workspaces.gtag_config.create @mutable
   * tagmanager.accounts.containers.workspaces.gtag_config.update
   */
  type?: string;
  /**
   * Google tag workspace ID. Only used by GTM containers. Set to 0 otherwise.
   */
  workspaceId?: string;
}

/**
 * List Accounts Response.
 */
export interface ListAccountsResponse {
  /**
   * List of GTM Accounts that a user has access to.
   */
  account?: Account[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

export interface ListClientsResponse {
  /**
   * All GTM Clients of a GTM Container.
   */
  client?: Client[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * List Containers Response.
 */
export interface ListContainersResponse {
  /**
   * All Containers of a GTM Account.
   */
  container?: Container[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * List container versions response.
 */
export interface ListContainerVersionsResponse {
  /**
   * All container version headers of a GTM Container.
   */
  containerVersionHeader?: ContainerVersionHeader[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

export interface ListDestinationsResponse {
  /**
   * All Destinations linked to a GTM Container.
   */
  destination?: Destination[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * A list of enabled built-in variables.
 */
export interface ListEnabledBuiltInVariablesResponse {
  /**
   * All GTM BuiltInVariables of a GTM container.
   */
  builtInVariable?: BuiltInVariable[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * List Environments Response.
 */
export interface ListEnvironmentsResponse {
  /**
   * All Environments of a GTM Container.
   */
  environment?: Environment[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

function serializeListEnvironmentsResponse(data: any): ListEnvironmentsResponse {
  return {
    ...data,
    environment: data["environment"] !== undefined ? data["environment"].map((item: any) => (serializeEnvironment(item))) : undefined,
  };
}

function deserializeListEnvironmentsResponse(data: any): ListEnvironmentsResponse {
  return {
    ...data,
    environment: data["environment"] !== undefined ? data["environment"].map((item: any) => (deserializeEnvironment(item))) : undefined,
  };
}

/**
 * List Folders Response.
 */
export interface ListFoldersResponse {
  /**
   * All GTM Folders of a GTM Container.
   */
  folder?: Folder[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

export interface ListGtagConfigResponse {
  /**
   * All Google tag configs in a Container.
   */
  gtagConfig?: GtagConfig[];
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
}

/**
 * List Tags Response.
 */
export interface ListTagsResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * All GTM Tags of a GTM Container.
   */
  tag?: Tag[];
}

function serializeListTagsResponse(data: any): ListTagsResponse {
  return {
    ...data,
    tag: data["tag"] !== undefined ? data["tag"].map((item: any) => (serializeTag(item))) : undefined,
  };
}

function deserializeListTagsResponse(data: any): ListTagsResponse {
  return {
    ...data,
    tag: data["tag"] !== undefined ? data["tag"].map((item: any) => (deserializeTag(item))) : undefined,
  };
}

export interface ListTemplatesResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * All GTM Custom Templates of a GTM Container.
   */
  template?: CustomTemplate[];
}

/**
 * List triggers response.
 */
export interface ListTriggersResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * All GTM Triggers of a GTM Container.
   */
  trigger?: Trigger[];
}

/**
 * List user permissions response.
 */
export interface ListUserPermissionsResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * All GTM UserPermissions of a GTM Account.
   */
  userPermission?: UserPermission[];
}

/**
 * List Variables Response.
 */
export interface ListVariablesResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * All GTM Variables of a GTM Container.
   */
  variable?: Variable[];
}

function serializeListVariablesResponse(data: any): ListVariablesResponse {
  return {
    ...data,
    variable: data["variable"] !== undefined ? data["variable"].map((item: any) => (serializeVariable(item))) : undefined,
  };
}

function deserializeListVariablesResponse(data: any): ListVariablesResponse {
  return {
    ...data,
    variable: data["variable"] !== undefined ? data["variable"].map((item: any) => (deserializeVariable(item))) : undefined,
  };
}

/**
 * A list of workspaces in a container.
 */
export interface ListWorkspacesResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * All Workspaces of a GTM Container.
   */
  workspace?: Workspace[];
}

export interface ListZonesResponse {
  /**
   * Continuation token for fetching the next page of results.
   */
  nextPageToken?: string;
  /**
   * All GTM Zones of a GTM Container.
   */
  zone?: Zone[];
}

/**
 * Represents a merge conflict.
 */
export interface MergeConflict {
  /**
   * The base version entity (since the latest sync operation) that has
   * conflicting changes compared to the workspace. If this field is missing, it
   * means the workspace entity is deleted from the base version.
   */
  entityInBaseVersion?: Entity;
  /**
   * The workspace entity that has conflicting changes compared to the base
   * version. If an entity is deleted in a workspace, it will still appear with
   * a deleted change status.
   */
  entityInWorkspace?: Entity;
}

function serializeMergeConflict(data: any): MergeConflict {
  return {
    ...data,
    entityInBaseVersion: data["entityInBaseVersion"] !== undefined ? serializeEntity(data["entityInBaseVersion"]) : undefined,
    entityInWorkspace: data["entityInWorkspace"] !== undefined ? serializeEntity(data["entityInWorkspace"]) : undefined,
  };
}

function deserializeMergeConflict(data: any): MergeConflict {
  return {
    ...data,
    entityInBaseVersion: data["entityInBaseVersion"] !== undefined ? deserializeEntity(data["entityInBaseVersion"]) : undefined,
    entityInWorkspace: data["entityInWorkspace"] !== undefined ? deserializeEntity(data["entityInWorkspace"]) : undefined,
  };
}

/**
 * Represents a Google Tag Manager Parameter.
 */
export interface Parameter {
  /**
   * The named key that uniquely identifies a parameter. Required for top-level
   * parameters, as well as map values. Ignored for list values. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  key?: string;
  /**
   * This list parameter's parameters (keys will be ignored). @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  list?: Parameter[];
  /**
   * This map parameter's parameters (must have keys; keys must be unique).
   * @mutable tagmanager.accounts.containers.workspaces.variables.create
   * @mutable tagmanager.accounts.containers.workspaces.variables.update
   * @mutable tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  map?: Parameter[];
  /**
   * The parameter type. Valid values are: - boolean: The value represents a
   * boolean, represented as 'true' or 'false' - integer: The value represents a
   * 64-bit signed integer value, in base 10 - list: A list of parameters should
   * be specified - map: A map of parameters should be specified - template: The
   * value represents any text; this can include variable references (even
   * variable references that might return non-string types) -
   * trigger_reference: The value represents a trigger, represented as the
   * trigger id - tag_reference: The value represents a tag, represented as the
   * tag name @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  type?:  | "typeUnspecified" | "template" | "integer" | "boolean" | "list" | "map" | "triggerReference" | "tagReference";
  /**
   * A parameter's value (may contain variable references such as
   * "{{myVariable}}") as appropriate to the specified type. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  value?: string;
}

/**
 * Publish container version response.
 */
export interface PublishContainerVersionResponse {
  /**
   * Compiler errors or not.
   */
  compilerError?: boolean;
  /**
   * The container version created.
   */
  containerVersion?: ContainerVersion;
}

function serializePublishContainerVersionResponse(data: any): PublishContainerVersionResponse {
  return {
    ...data,
    containerVersion: data["containerVersion"] !== undefined ? serializeContainerVersion(data["containerVersion"]) : undefined,
  };
}

function deserializePublishContainerVersionResponse(data: any): PublishContainerVersionResponse {
  return {
    ...data,
    containerVersion: data["containerVersion"] !== undefined ? deserializeContainerVersion(data["containerVersion"]) : undefined,
  };
}

/**
 * Response to quick previewing a workspace.
 */
export interface QuickPreviewResponse {
  /**
   * Were there compiler errors or not.
   */
  compilerError?: boolean;
  /**
   * The quick previewed container version.
   */
  containerVersion?: ContainerVersion;
  /**
   * Whether quick previewing failed when syncing the workspace to the latest
   * container version.
   */
  syncStatus?: SyncStatus;
}

function serializeQuickPreviewResponse(data: any): QuickPreviewResponse {
  return {
    ...data,
    containerVersion: data["containerVersion"] !== undefined ? serializeContainerVersion(data["containerVersion"]) : undefined,
  };
}

function deserializeQuickPreviewResponse(data: any): QuickPreviewResponse {
  return {
    ...data,
    containerVersion: data["containerVersion"] !== undefined ? deserializeContainerVersion(data["containerVersion"]) : undefined,
  };
}

/**
 * The result of reverting a built-in variable in a workspace.
 */
export interface RevertBuiltInVariableResponse {
  /**
   * Whether the built-in variable is enabled after reversion.
   */
  enabled?: boolean;
}

/**
 * The result of reverting a client in a workspace.
 */
export interface RevertClientResponse {
  /**
   * Client as it appears in the latest container version since the last
   * workspace synchronization operation. If no client is present, that means
   * the client was deleted in the latest container version.
   */
  client?: Client;
}

/**
 * The result of reverting folder changes in a workspace.
 */
export interface RevertFolderResponse {
  /**
   * Folder as it appears in the latest container version since the last
   * workspace synchronization operation. If no folder is present, that means
   * the folder was deleted in the latest container version.
   */
  folder?: Folder;
}

/**
 * The result of reverting a tag in a workspace.
 */
export interface RevertTagResponse {
  /**
   * Tag as it appears in the latest container version since the last workspace
   * synchronization operation. If no tag is present, that means the tag was
   * deleted in the latest container version.
   */
  tag?: Tag;
}

function serializeRevertTagResponse(data: any): RevertTagResponse {
  return {
    ...data,
    tag: data["tag"] !== undefined ? serializeTag(data["tag"]) : undefined,
  };
}

function deserializeRevertTagResponse(data: any): RevertTagResponse {
  return {
    ...data,
    tag: data["tag"] !== undefined ? deserializeTag(data["tag"]) : undefined,
  };
}

/**
 * The result of reverting a template in a workspace.
 */
export interface RevertTemplateResponse {
  /**
   * Template as it appears in the latest container version since the last
   * workspace synchronization operation. If no template is present, that means
   * the template was deleted in the latest container version.
   */
  template?: CustomTemplate;
}

/**
 * The result of reverting a trigger in a workspace.
 */
export interface RevertTriggerResponse {
  /**
   * Trigger as it appears in the latest container version since the last
   * workspace synchronization operation. If no trigger is present, that means
   * the trigger was deleted in the latest container version.
   */
  trigger?: Trigger;
}

/**
 * The result of reverting a variable in a workspace.
 */
export interface RevertVariableResponse {
  /**
   * Variable as it appears in the latest container version since the last
   * workspace synchronization operation. If no variable is present, that means
   * the variable was deleted in the latest container version.
   */
  variable?: Variable;
}

function serializeRevertVariableResponse(data: any): RevertVariableResponse {
  return {
    ...data,
    variable: data["variable"] !== undefined ? serializeVariable(data["variable"]) : undefined,
  };
}

function deserializeRevertVariableResponse(data: any): RevertVariableResponse {
  return {
    ...data,
    variable: data["variable"] !== undefined ? deserializeVariable(data["variable"]) : undefined,
  };
}

/**
 * The result of reverting a zone in a workspace.
 */
export interface RevertZoneResponse {
  /**
   * Zone as it appears in the latest container version since the last
   * workspace synchronization operation. If no zone is present, that means the
   * zone was deleted in the latest container version.
   */
  zone?: Zone;
}

/**
 * Represents a reference to atag that fires before another tag in order to set
 * up dependencies.
 */
export interface SetupTag {
  /**
   * If true, fire the main tag if and only if the setup tag fires
   * successfully. If false, fire the main tag regardless of setup tag firing
   * status.
   */
  stopOnSetupFailure?: boolean;
  /**
   * The name of the setup tag.
   */
  tagName?: string;
}

/**
 * The status of a workspace after synchronization.
 */
export interface SyncStatus {
  /**
   * Synchornization operation detected a merge conflict.
   */
  mergeConflict?: boolean;
  /**
   * An error occurred during the synchronization operation.
   */
  syncError?: boolean;
}

/**
 * A response after synchronizing the workspace to the latest container
 * version.
 */
export interface SyncWorkspaceResponse {
  /**
   * The merge conflict after sync. If this field is not empty, the sync is
   * still treated as successful. But a version cannot be created until all
   * conflicts are resolved.
   */
  mergeConflict?: MergeConflict[];
  /**
   * Indicates whether synchronization caused a merge conflict or sync error.
   */
  syncStatus?: SyncStatus;
}

function serializeSyncWorkspaceResponse(data: any): SyncWorkspaceResponse {
  return {
    ...data,
    mergeConflict: data["mergeConflict"] !== undefined ? data["mergeConflict"].map((item: any) => (serializeMergeConflict(item))) : undefined,
  };
}

function deserializeSyncWorkspaceResponse(data: any): SyncWorkspaceResponse {
  return {
    ...data,
    mergeConflict: data["mergeConflict"] !== undefined ? data["mergeConflict"].map((item: any) => (deserializeMergeConflict(item))) : undefined,
  };
}

/**
 * Represents a Google Tag Manager Tag.
 */
export interface Tag {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * Blocking rule IDs. If any of the listed rules evaluate to true, the tag
   * will not fire. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  blockingRuleId?: string[];
  /**
   * Blocking trigger IDs. If any of the listed triggers evaluate to true, the
   * tag will not fire. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  blockingTriggerId?: string[];
  /**
   * Consent settings of a tag. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  consentSettings?: TagConsentSetting;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * The fingerprint of the GTM Tag as computed at storage time. This value is
   * recomputed whenever the tag is modified.
   */
  fingerprint?: string;
  /**
   * Firing rule IDs. A tag will fire when any of the listed rules are true and
   * all of its blockingRuleIds (if any specified) are false. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  firingRuleId?: string[];
  /**
   * Firing trigger IDs. A tag will fire when any of the listed triggers are
   * true and all of its blockingTriggerIds (if any specified) are false.
   * @mutable tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  firingTriggerId?: string[];
  /**
   * If set to true, this tag will only fire in the live environment (e.g. not
   * in preview or debug mode). @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  liveOnly?: boolean;
  /**
   * A map of key-value pairs of tag metadata to be included in the event data
   * for tag monitoring. Notes: - This parameter must be type MAP. - Each
   * parameter in the map are type TEMPLATE, however cannot contain variable
   * references. @mutable tagmanager.accounts.containers.workspaces.tags.create
   * @mutable tagmanager.accounts.containers.workspaces.tags.update
   */
  monitoringMetadata?: Parameter;
  /**
   * If non-empty, then the tag display name will be included in the monitoring
   * metadata map using the key specified. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  monitoringMetadataTagNameKey?: string;
  /**
   * Tag display name. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  name?: string;
  /**
   * User notes on how to apply this tag in the container. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  notes?: string;
  /**
   * The tag's parameters. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  parameter?: Parameter[];
  /**
   * Parent folder id.
   */
  parentFolderId?: string;
  /**
   * GTM Tag's API relative path.
   */
  path?: string;
  /**
   * Indicates whether the tag is paused, which prevents the tag from firing.
   * @mutable tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  paused?: boolean;
  /**
   * User defined numeric priority of the tag. Tags are fired asynchronously in
   * order of priority. Tags with higher numeric value fire first. A tag's
   * priority can be a positive or negative value. The default value is 0.
   * @mutable tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  priority?: Parameter;
  /**
   * The end timestamp in milliseconds to schedule a tag. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  scheduleEndMs?: bigint;
  /**
   * The start timestamp in milliseconds to schedule a tag. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  scheduleStartMs?: bigint;
  /**
   * The list of setup tags. Currently we only allow one.
   */
  setupTag?: SetupTag[];
  /**
   * Option to fire this tag.
   */
  tagFiringOption?:  | "tagFiringOptionUnspecified" | "unlimited" | "oncePerEvent" | "oncePerLoad";
  /**
   * The Tag ID uniquely identifies the GTM Tag.
   */
  tagId?: string;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * The list of teardown tags. Currently we only allow one.
   */
  teardownTag?: TeardownTag[];
  /**
   * GTM Tag Type. @mutable
   * tagmanager.accounts.containers.workspaces.tags.create @mutable
   * tagmanager.accounts.containers.workspaces.tags.update
   */
  type?: string;
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
}

function serializeTag(data: any): Tag {
  return {
    ...data,
    scheduleEndMs: data["scheduleEndMs"] !== undefined ? String(data["scheduleEndMs"]) : undefined,
    scheduleStartMs: data["scheduleStartMs"] !== undefined ? String(data["scheduleStartMs"]) : undefined,
  };
}

function deserializeTag(data: any): Tag {
  return {
    ...data,
    scheduleEndMs: data["scheduleEndMs"] !== undefined ? BigInt(data["scheduleEndMs"]) : undefined,
    scheduleStartMs: data["scheduleStartMs"] !== undefined ? BigInt(data["scheduleStartMs"]) : undefined,
  };
}

export interface TagConsentSetting {
  /**
   * The tag's consent status. If set to NEEDED, the runtime will check that
   * the consent types specified by the consent_type field have been granted.
   */
  consentStatus?:  | "notSet" | "notNeeded" | "needed";
  /**
   * The type of consents to check for during tag firing if in the consent
   * NEEDED state. This parameter must be of type LIST where each list item is
   * of type STRING.
   */
  consentType?: Parameter;
}

/**
 * Represents a tag that fires after another tag in order to tear down
 * dependencies.
 */
export interface TeardownTag {
  /**
   * If true, fire the teardown tag if and only if the main tag fires
   * successfully. If false, fire the teardown tag regardless of main tag firing
   * status.
   */
  stopTeardownOnFailure?: boolean;
  /**
   * The name of the teardown tag.
   */
  tagName?: string;
}

/**
 * Represents a Google Tag Manager Trigger
 */
export interface Trigger {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * Used in the case of auto event tracking. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  autoEventFilter?: Condition[];
  /**
   * Whether or not we should only fire tags if the form submit or link click
   * event is not cancelled by some other event handler (e.g. because of
   * validation). Only valid for Form Submission and Link Click triggers.
   * @mutable tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  checkValidation?: Parameter;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * A visibility trigger minimum continuous visible time (in milliseconds).
   * Only valid for AMP Visibility trigger. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  continuousTimeMinMilliseconds?: Parameter;
  /**
   * Used in the case of custom event, which is fired iff all Conditions are
   * true. @mutable tagmanager.accounts.containers.workspaces.triggers.create
   * @mutable tagmanager.accounts.containers.workspaces.triggers.update
   */
  customEventFilter?: Condition[];
  /**
   * Name of the GTM event that is fired. Only valid for Timer triggers.
   * @mutable tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  eventName?: Parameter;
  /**
   * The trigger will only fire iff all Conditions are true. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  filter?: Condition[];
  /**
   * The fingerprint of the GTM Trigger as computed at storage time. This value
   * is recomputed whenever the trigger is modified.
   */
  fingerprint?: string;
  /**
   * List of integer percentage values for scroll triggers. The trigger will
   * fire when each percentage is reached when the view is scrolled
   * horizontally. Only valid for AMP scroll triggers. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  horizontalScrollPercentageList?: Parameter;
  /**
   * Time between triggering recurring Timer Events (in milliseconds). Only
   * valid for Timer triggers. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  interval?: Parameter;
  /**
   * Time between Timer Events to fire (in seconds). Only valid for AMP Timer
   * trigger. @mutable tagmanager.accounts.containers.workspaces.triggers.create
   * @mutable tagmanager.accounts.containers.workspaces.triggers.update
   */
  intervalSeconds?: Parameter;
  /**
   * Limit of the number of GTM events this Timer Trigger will fire. If no
   * limit is set, we will continue to fire GTM events until the user leaves the
   * page. Only valid for Timer triggers. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  limit?: Parameter;
  /**
   * Max time to fire Timer Events (in seconds). Only valid for AMP Timer
   * trigger. @mutable tagmanager.accounts.containers.workspaces.triggers.create
   * @mutable tagmanager.accounts.containers.workspaces.triggers.update
   */
  maxTimerLengthSeconds?: Parameter;
  /**
   * Trigger display name. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  name?: string;
  /**
   * User notes on how to apply this trigger in the container. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  notes?: string;
  /**
   * Additional parameters. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  parameter?: Parameter[];
  /**
   * Parent folder id.
   */
  parentFolderId?: string;
  /**
   * GTM Trigger's API relative path.
   */
  path?: string;
  /**
   * A click trigger CSS selector (i.e. "a", "button" etc.). Only valid for AMP
   * Click trigger. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  selector?: Parameter;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * A visibility trigger minimum total visible time (in milliseconds). Only
   * valid for AMP Visibility trigger. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  totalTimeMinMilliseconds?: Parameter;
  /**
   * The Trigger ID uniquely identifies the GTM Trigger.
   */
  triggerId?: string;
  /**
   * Defines the data layer event that causes this trigger. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  type?:  | "eventTypeUnspecified" | "pageview" | "domReady" | "windowLoaded" | "customEvent" | "triggerGroup" | "init" | "consentInit" | "serverPageview" | "always" | "firebaseAppException" | "firebaseAppUpdate" | "firebaseCampaign" | "firebaseFirstOpen" | "firebaseInAppPurchase" | "firebaseNotificationDismiss" | "firebaseNotificationForeground" | "firebaseNotificationOpen" | "firebaseNotificationReceive" | "firebaseOsUpdate" | "firebaseSessionStart" | "firebaseUserEngagement" | "formSubmission" | "click" | "linkClick" | "jsError" | "historyChange" | "timer" | "ampClick" | "ampTimer" | "ampScroll" | "ampVisibility" | "youTubeVideo" | "scrollDepth" | "elementVisibility";
  /**
   * Globally unique id of the trigger that auto-generates this (a Form Submit,
   * Link Click or Timer listener) if any. Used to make incompatible auto-events
   * work together with trigger filtering based on trigger ids. This value is
   * populated during output generation since the tags implied by triggers don't
   * exist until then. Only valid for Form Submit, Link Click and Timer
   * triggers. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  uniqueTriggerId?: Parameter;
  /**
   * List of integer percentage values for scroll triggers. The trigger will
   * fire when each percentage is reached when the view is scrolled vertically.
   * Only valid for AMP scroll triggers. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  verticalScrollPercentageList?: Parameter;
  /**
   * A visibility trigger CSS selector (i.e. "#id"). Only valid for AMP
   * Visibility trigger. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  visibilitySelector?: Parameter;
  /**
   * A visibility trigger maximum percent visibility. Only valid for AMP
   * Visibility trigger. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  visiblePercentageMax?: Parameter;
  /**
   * A visibility trigger minimum percent visibility. Only valid for AMP
   * Visibility trigger. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  visiblePercentageMin?: Parameter;
  /**
   * Whether or not we should delay the form submissions or link opening until
   * all of the tags have fired (by preventing the default action and later
   * simulating the default action). Only valid for Form Submission and Link
   * Click triggers. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  waitForTags?: Parameter;
  /**
   * How long to wait (in milliseconds) for tags to fire when 'waits_for_tags'
   * above evaluates to true. Only valid for Form Submission and Link Click
   * triggers. @mutable
   * tagmanager.accounts.containers.workspaces.triggers.create @mutable
   * tagmanager.accounts.containers.workspaces.triggers.update
   */
  waitForTagsTimeout?: Parameter;
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
}

/**
 * Represents a user's permissions to an account and its container.
 */
export interface UserPermission {
  /**
   * GTM Account access permissions. @mutable
   * tagmanager.accounts.permissions.create @mutable
   * tagmanager.accounts.permissions.update
   */
  accountAccess?: AccountAccess;
  /**
   * The Account ID uniquely identifies the GTM Account.
   */
  accountId?: string;
  /**
   * GTM Container access permissions. @mutable
   * tagmanager.accounts.permissions.create @mutable
   * tagmanager.accounts.permissions.update
   */
  containerAccess?: ContainerAccess[];
  /**
   * User's email address. @mutable tagmanager.accounts.permissions.create
   */
  emailAddress?: string;
  /**
   * GTM UserPermission's API relative path.
   */
  path?: string;
}

/**
 * Represents a Google Tag Manager Variable.
 */
export interface Variable {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * For mobile containers only: A list of trigger IDs for disabling
   * conditional variables; the variable is enabled if one of the enabling
   * trigger is true while all the disabling trigger are false. Treated as an
   * unordered set. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update
   */
  disablingTriggerId?: string[];
  /**
   * For mobile containers only: A list of trigger IDs for enabling conditional
   * variables; the variable is enabled if one of the enabling triggers is true
   * while all the disabling triggers are false. Treated as an unordered set.
   * @mutable tagmanager.accounts.containers.workspaces.variables.create
   * @mutable tagmanager.accounts.containers.workspaces.variables.update
   */
  enablingTriggerId?: string[];
  /**
   * The fingerprint of the GTM Variable as computed at storage time. This
   * value is recomputed whenever the variable is modified.
   */
  fingerprint?: string;
  /**
   * Option to convert a variable value to other value.
   */
  formatValue?: VariableFormatValue;
  /**
   * Variable display name. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update
   */
  name?: string;
  /**
   * User notes on how to apply this variable in the container. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update
   */
  notes?: string;
  /**
   * The variable's parameters. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update
   */
  parameter?: Parameter[];
  /**
   * Parent folder id.
   */
  parentFolderId?: string;
  /**
   * GTM Variable's API relative path.
   */
  path?: string;
  /**
   * The end timestamp in milliseconds to schedule a variable. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update
   */
  scheduleEndMs?: bigint;
  /**
   * The start timestamp in milliseconds to schedule a variable. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update
   */
  scheduleStartMs?: bigint;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * GTM Variable Type. @mutable
   * tagmanager.accounts.containers.workspaces.variables.create @mutable
   * tagmanager.accounts.containers.workspaces.variables.update
   */
  type?: string;
  /**
   * The Variable ID uniquely identifies the GTM Variable.
   */
  variableId?: string;
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
}

function serializeVariable(data: any): Variable {
  return {
    ...data,
    scheduleEndMs: data["scheduleEndMs"] !== undefined ? String(data["scheduleEndMs"]) : undefined,
    scheduleStartMs: data["scheduleStartMs"] !== undefined ? String(data["scheduleStartMs"]) : undefined,
  };
}

function deserializeVariable(data: any): Variable {
  return {
    ...data,
    scheduleEndMs: data["scheduleEndMs"] !== undefined ? BigInt(data["scheduleEndMs"]) : undefined,
    scheduleStartMs: data["scheduleStartMs"] !== undefined ? BigInt(data["scheduleStartMs"]) : undefined,
  };
}

export interface VariableFormatValue {
  /**
   * The option to convert a string-type variable value to either lowercase or
   * uppercase.
   */
  caseConversionType?:  | "none" | "lowercase" | "uppercase";
  /**
   * The value to convert if a variable value is false.
   */
  convertFalseToValue?: Parameter;
  /**
   * The value to convert if a variable value is null.
   */
  convertNullToValue?: Parameter;
  /**
   * The value to convert if a variable value is true.
   */
  convertTrueToValue?: Parameter;
  /**
   * The value to convert if a variable value is undefined.
   */
  convertUndefinedToValue?: Parameter;
}

/**
 * Represents a Google Tag Manager Container Workspace.
 */
export interface Workspace {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * Workspace description. @mutable
   * tagmanager.accounts.containers.workspaces.create @mutable
   * tagmanager.accounts.containers.workspaces.update
   */
  description?: string;
  /**
   * The fingerprint of the GTM Workspace as computed at storage time. This
   * value is recomputed whenever the workspace is modified.
   */
  fingerprint?: string;
  /**
   * Workspace display name. @mutable
   * tagmanager.accounts.containers.workspaces.create @mutable
   * tagmanager.accounts.containers.workspaces.update
   */
  name?: string;
  /**
   * GTM Workspace's API relative path.
   */
  path?: string;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * The Workspace ID uniquely identifies the GTM Workspace.
   */
  workspaceId?: string;
}

/**
 * Represents a Google Tag Manager Zone's contents.
 */
export interface Zone {
  /**
   * GTM Account ID.
   */
  accountId?: string;
  /**
   * This Zone's boundary.
   */
  boundary?: ZoneBoundary;
  /**
   * Containers that are children of this Zone.
   */
  childContainer?: ZoneChildContainer[];
  /**
   * GTM Container ID.
   */
  containerId?: string;
  /**
   * The fingerprint of the GTM Zone as computed at storage time. This value is
   * recomputed whenever the zone is modified.
   */
  fingerprint?: string;
  /**
   * Zone display name.
   */
  name?: string;
  /**
   * User notes on how to apply this zone in the container.
   */
  notes?: string;
  /**
   * GTM Zone's API relative path.
   */
  path?: string;
  /**
   * Auto generated link to the tag manager UI
   */
  tagManagerUrl?: string;
  /**
   * This Zone's type restrictions.
   */
  typeRestriction?: ZoneTypeRestriction;
  /**
   * GTM Workspace ID.
   */
  workspaceId?: string;
  /**
   * The Zone ID uniquely identifies the GTM Zone.
   */
  zoneId?: string;
}

/**
 * Represents a Zone's boundaries.
 */
export interface ZoneBoundary {
  /**
   * The conditions that, when conjoined, make up the boundary.
   */
  condition?: Condition[];
  /**
   * Custom evaluation trigger IDs. A zone will evaluate its boundary
   * conditions when any of the listed triggers are true.
   */
  customEvaluationTriggerId?: string[];
}

/**
 * Represents a child container of a Zone.
 */
export interface ZoneChildContainer {
  /**
   * The zone's nickname for the child container.
   */
  nickname?: string;
  /**
   * The child container's public id.
   */
  publicId?: string;
}

/**
 * Represents a Zone's type restrictions.
 */
export interface ZoneTypeRestriction {
  /**
   * True if type restrictions have been enabled for this Zone.
   */
  enable?: boolean;
  /**
   * List of type public ids that have been whitelisted for use in this Zone.
   */
  whitelistedTypeId?: string[];
}