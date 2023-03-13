// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Identity-Aware Proxy API Client for Deno
 * ==============================================
 * 
 * Controls access to cloud applications running on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/iap
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Controls access to cloud applications running on Google Cloud Platform.
 */
export class iap {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://iap.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Constructs a new OAuth brand for the project if one does not exist. The
   * created brand is "internal only", meaning that OAuth clients created under
   * it only accept requests from users who belong to the same Google Workspace
   * organization as the project. The brand is created in an un-reviewed status.
   * NOTE: The "internal only" status can be manually changed in the Google
   * Cloud Console. Requires that a brand does not already exist for the
   * project, and that the specified support email is owned by the caller.
   *
   * @param parent Required. GCP Project number/id under which the brand is to be created. In the following format: projects/{project_number/id}.
   */
  async projectsBrandsCreate(parent: string, req: Brand): Promise<Brand> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/brands`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Brand;
  }

  /**
   * Retrieves the OAuth brand of the project.
   *
   * @param name Required. Name of the brand to be fetched. In the following format: projects/{project_number/id}/brands/{brand}.
   */
  async projectsBrandsGet(name: string): Promise<Brand> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Brand;
  }

  /**
   * Creates an Identity Aware Proxy (IAP) OAuth client. The client is owned by
   * IAP. Requires that the brand for the project exists and that it is set for
   * internal-only use.
   *
   * @param parent Required. Path to create the client in. In the following format: projects/{project_number/id}/brands/{brand}. The project must belong to a G Suite account.
   */
  async projectsBrandsIdentityAwareProxyClientsCreate(parent: string, req: IdentityAwareProxyClient): Promise<IdentityAwareProxyClient> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/identityAwareProxyClients`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as IdentityAwareProxyClient;
  }

  /**
   * Deletes an Identity Aware Proxy (IAP) OAuth client. Useful for removing
   * obsolete clients, managing the number of clients in a given project, and
   * cleaning up after tests. Requires that the client is owned by IAP.
   *
   * @param name Required. Name of the Identity Aware Proxy client to be deleted. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}.
   */
  async projectsBrandsIdentityAwareProxyClientsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves an Identity Aware Proxy (IAP) OAuth client. Requires that the
   * client is owned by IAP.
   *
   * @param name Required. Name of the Identity Aware Proxy client to be fetched. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}.
   */
  async projectsBrandsIdentityAwareProxyClientsGet(name: string): Promise<IdentityAwareProxyClient> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as IdentityAwareProxyClient;
  }

  /**
   * Lists the existing clients for the brand.
   *
   * @param parent Required. Full brand path. In the following format: projects/{project_number/id}/brands/{brand}.
   */
  async projectsBrandsIdentityAwareProxyClientsList(parent: string, opts: ProjectsBrandsIdentityAwareProxyClientsListOptions = {}): Promise<ListIdentityAwareProxyClientsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/identityAwareProxyClients`);
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
    return data as ListIdentityAwareProxyClientsResponse;
  }

  /**
   * Resets an Identity Aware Proxy (IAP) OAuth client secret. Useful if the
   * secret was compromised. Requires that the client is owned by IAP.
   *
   * @param name Required. Name of the Identity Aware Proxy client to that will have its secret reset. In the following format: projects/{project_number/id}/brands/{brand}/identityAwareProxyClients/{client_id}.
   */
  async projectsBrandsIdentityAwareProxyClientsResetSecret(name: string, req: ResetIdentityAwareProxyClientSecretRequest): Promise<IdentityAwareProxyClient> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resetSecret`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as IdentityAwareProxyClient;
  }

  /**
   * Lists the existing brands for the project.
   *
   * @param parent Required. GCP Project number/id. In the following format: projects/{project_number/id}.
   */
  async projectsBrandsList(parent: string): Promise<ListBrandsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/brands`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListBrandsResponse;
  }

  /**
   * Creates a new TunnelDestGroup.
   *
   * @param parent Required. Google Cloud Project ID and location. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}`.
   */
  async projectsIap_tunnelLocationsDestGroupsCreate(parent: string, req: TunnelDestGroup, opts: ProjectsIap_tunnelLocationsDestGroupsCreateOptions = {}): Promise<TunnelDestGroup> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/destGroups`);
    if (opts.tunnelDestGroupId !== undefined) {
      url.searchParams.append("tunnelDestGroupId", String(opts.tunnelDestGroupId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TunnelDestGroup;
  }

  /**
   * Deletes a TunnelDestGroup.
   *
   * @param name Required. Name of the TunnelDestGroup to delete. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}/destGroups/{dest_group}`.
   */
  async projectsIap_tunnelLocationsDestGroupsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves an existing TunnelDestGroup.
   *
   * @param name Required. Name of the TunnelDestGroup to be fetched. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}/destGroups/{dest_group}`.
   */
  async projectsIap_tunnelLocationsDestGroupsGet(name: string): Promise<TunnelDestGroup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TunnelDestGroup;
  }

  /**
   * Lists the existing TunnelDestGroups. To group across all locations, use a
   * `-` as the location ID. For example:
   * `/v1/projects/123/iap_tunnel/locations/-/destGroups`
   *
   * @param parent Required. Google Cloud Project ID and location. In the following format: `projects/{project_number/id}/iap_tunnel/locations/{location}`. A `-` can be used for the location to group across all locations.
   */
  async projectsIap_tunnelLocationsDestGroupsList(parent: string, opts: ProjectsIap_tunnelLocationsDestGroupsListOptions = {}): Promise<ListTunnelDestGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/destGroups`);
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
    return data as ListTunnelDestGroupsResponse;
  }

  /**
   * Updates a TunnelDestGroup.
   *
   * @param name Required. Immutable. Identifier for the TunnelDestGroup. Must be unique within the project and contain only lower case letters (a-z) and dashes (-).
   */
  async projectsIap_tunnelLocationsDestGroupsPatch(name: string, req: TunnelDestGroup, opts: ProjectsIap_tunnelLocationsDestGroupsPatchOptions = {}): Promise<TunnelDestGroup> {
    opts = serializeProjectsIap_tunnelLocationsDestGroupsPatchOptions(opts);
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
    return data as TunnelDestGroup;
  }

  /**
   * Gets the access control policy for an Identity-Aware Proxy protected
   * resource. More information about managing access via IAP can be found at:
   * https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async v1GetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Gets the IAP settings on a particular IAP protected resource.
   *
   * @param name Required. The resource name for which to retrieve the settings. Authorization: Requires the `getSettings` permission for the associated resource.
   */
  async v1GetIapSettings(name: string): Promise<IapSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:iapSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeIapSettings(data);
  }

  /**
   * Sets the access control policy for an Identity-Aware Proxy protected
   * resource. Replaces any existing policy. More information about managing
   * access via IAP can be found at:
   * https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async v1SetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the Identity-Aware Proxy
   * protected resource. More information about managing access via IAP can be
   * found at:
   * https://cloud.google.com/iap/docs/managing-access#managing_access_via_the_api
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async v1TestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Updates the IAP settings on a particular IAP protected resource. It
   * replaces all fields unless the `update_mask` is set.
   *
   * @param name Required. The resource name of the IAP protected resource.
   */
  async v1UpdateIapSettings(name: string, req: IapSettings, opts: V1UpdateIapSettingsOptions = {}): Promise<IapSettings> {
    req = serializeIapSettings(req);
    opts = serializeV1UpdateIapSettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }:iapSettings`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeIapSettings(data);
  }
}

/**
 * Custom content configuration for access denied page. IAP allows customers to
 * define a custom URI to use as the error page when access is denied to users.
 * If IAP prevents access to this page, the default IAP error page will be
 * displayed instead.
 */
export interface AccessDeniedPageSettings {
  /**
   * The URI to be redirected to when access is denied.
   */
  accessDeniedPageUri?: string;
  /**
   * Whether to generate a troubleshooting URL on access denied events to this
   * application.
   */
  generateTroubleshootingUri?: boolean;
  /**
   * Whether to generate remediation token on access denied events to this
   * application.
   */
  remediationTokenGenerationEnabled?: boolean;
}

/**
 * Access related settings for IAP protected apps.
 */
export interface AccessSettings {
  /**
   * Settings to configure and enable allowed domains.
   */
  allowedDomainsSettings?: AllowedDomainsSettings;
  /**
   * Configuration to allow cross-origin requests via IAP.
   */
  corsSettings?: CorsSettings;
  /**
   * GCIP claims and endpoint configurations for 3p identity providers.
   */
  gcipSettings?: GcipSettings;
  /**
   * Settings to configure IAP's OAuth behavior.
   */
  oauthSettings?: OAuthSettings;
  /**
   * Settings to configure Policy delegation for apps hosted in tenant
   * projects. INTERNAL_ONLY.
   */
  policyDelegationSettings?: PolicyDelegationSettings;
  /**
   * Settings to configure reauthentication policies in IAP.
   */
  reauthSettings?: ReauthSettings;
}

function serializeAccessSettings(data: any): AccessSettings {
  return {
    ...data,
    reauthSettings: data["reauthSettings"] !== undefined ? serializeReauthSettings(data["reauthSettings"]) : undefined,
  };
}

function deserializeAccessSettings(data: any): AccessSettings {
  return {
    ...data,
    reauthSettings: data["reauthSettings"] !== undefined ? deserializeReauthSettings(data["reauthSettings"]) : undefined,
  };
}

/**
 * Configuration for IAP allowed domains. Lets you to restrict access to an app
 * and allow access to only the domains that you list.
 */
export interface AllowedDomainsSettings {
  /**
   * List of trusted domains.
   */
  domains?: string[];
  /**
   * Configuration for customers to opt in for the feature.
   */
  enable?: boolean;
}

/**
 * Wrapper over application specific settings for IAP.
 */
export interface ApplicationSettings {
  /**
   * Customization for Access Denied page.
   */
  accessDeniedPageSettings?: AccessDeniedPageSettings;
  /**
   * Settings to configure attribute propagation.
   */
  attributePropagationSettings?: AttributePropagationSettings;
  /**
   * The Domain value to set for cookies generated by IAP. This value is not
   * validated by the API, but will be ignored at runtime if invalid.
   */
  cookieDomain?: string;
  /**
   * Settings to configure IAP's behavior for a service mesh.
   */
  csmSettings?: CsmSettings;
}

/**
 * Configuration for propagating attributes to applications protected by IAP.
 */
export interface AttributePropagationSettings {
  /**
   * Whether the provided attribute propagation settings should be evaluated on
   * user requests. If set to true, attributes returned from the expression will
   * be propagated in the set output credentials.
   */
  enable?: boolean;
  /**
   * Raw string CEL expression. Must return a list of attributes. A maximum of
   * 45 attributes can be selected. Expressions can select different attribute
   * types from `attributes`: `attributes.saml_attributes`,
   * `attributes.iap_attributes`. The following functions are supported: -
   * filter `.filter(, )`: Returns a subset of `` where `` is true for every
   * item. - in ` in `: Returns true if `` contains ``. - selectByName
   * `.selectByName()`: Returns the attribute in `` with the given `` name,
   * otherwise returns empty. - emitAs `.emitAs()`: Sets the `` name field to
   * the given `` for propagation in selected output credentials. - strict
   * `.strict()`: Ignores the `x-goog-iap-attr-` prefix for the provided `` when
   * propagating with the `HEADER` output credential, such as request headers. -
   * append `.append()` OR `.append()`: Appends the provided `` or `` to the end
   * of ``. Example expression: `attributes.saml_attributes.filter(x, x.name in
   * ['test']).append(attributes.iap_attributes.selectByName('exact').emitAs('custom').strict())`
   */
  expression?: string;
  /**
   * Which output credentials attributes selected by the CEL expression should
   * be propagated in. All attributes will be fully duplicated in each selected
   * output credential.
   */
  outputCredentials?:  | "OUTPUT_CREDENTIALS_UNSPECIFIED" | "HEADER" | "JWT" | "RCTOKEN"[];
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values: * `allUsers`: A special identifier
   * that represents anyone who is on the internet; with or without a Google
   * account. * `allAuthenticatedUsers`: A special identifier that represents
   * anyone who is authenticated with a Google account or a service account.
   * Does not include identities that come from external identity providers
   * (IdPs) through identity federation. * `user:{emailid}`: An email address
   * that represents a specific Google account. For example, `alice@example.com`
   * . * `serviceAccount:{emailid}`: An email address that represents a Google
   * service account. For example, `my-other-app@appspot.gserviceaccount.com`. *
   * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An
   * identifier for a [Kubernetes service
   * account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. *
   * `group:{emailid}`: An email address that represents a Google group. For
   * example, `admins@example.com`. * `domain:{domain}`: The G Suite domain
   * (primary) that represents all the users of that domain. For example,
   * `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a user that has been
   * recently deleted. For example,
   * `alice@example.com?uid=123456789012345678901`. If the user is recovered,
   * this value reverts to `user:{emailid}` and the recovered user retains the
   * role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a service account
   * that has been recently deleted. For example,
   * `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If
   * the service account is undeleted, this value reverts to
   * `serviceAccount:{emailid}` and the undeleted service account retains the
   * role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email
   * address (plus unique identifier) representing a Google group that has been
   * recently deleted. For example,
   * `admins@example.com?uid=123456789012345678901`. If the group is recovered,
   * this value reverts to `group:{emailid}` and the recovered group retains the
   * role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of `members`, or principals. For
   * example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role?: string;
}

/**
 * OAuth brand data. NOTE: Only contains a portion of the data that describes a
 * brand.
 */
export interface Brand {
  /**
   * Application name displayed on OAuth consent screen.
   */
  applicationTitle?: string;
  /**
   * Output only. Identifier of the brand. NOTE: GCP project number achieves
   * the same brand identification purpose as only one brand per project can be
   * created.
   */
  readonly name?: string;
  /**
   * Output only. Whether the brand is only intended for usage inside the G
   * Suite organization only.
   */
  readonly orgInternalOnly?: boolean;
  /**
   * Support email displayed on the OAuth consent screen.
   */
  supportEmail?: string;
}

/**
 * Allows customers to configure HTTP request paths that'll allow HTTP OPTIONS
 * call to bypass authentication and authorization.
 */
export interface CorsSettings {
  /**
   * Configuration to allow HTTP OPTIONS calls to skip authorization. If
   * undefined, IAP will not apply any special logic to OPTIONS requests.
   */
  allowHttpOptions?: boolean;
}

/**
 * Configuration for RCToken generated for service mesh workloads protected by
 * IAP. RCToken are IAP generated JWTs that can be verified at the application.
 * The RCToken is primarily used for service mesh deployments, and can be scoped
 * to a single mesh by configuring the audience field accordingly.
 */
export interface CsmSettings {
  /**
   * Audience claim set in the generated RCToken. This value is not validated
   * by IAP.
   */
  rctokenAud?: string;
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
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec. Example (Comparison):
 * title: "Summary size limit" description: "Determines if a summary is less
 * than 100 chars" expression: "document.summary.size() < 100" Example
 * (Equality): title: "Requestor is owner" description: "Determines if requestor
 * is the document owner" expression: "document.owner ==
 * request.auth.claims.email" Example (Logic): title: "Public documents"
 * description: "Determine whether the document should be publicly visible"
 * expression: "document.type != 'private' && document.type != 'internal'"
 * Example (Data Manipulation): title: "Notification string" description:
 * "Create a notification string with a timestamp." expression: "'New message
 * received at ' + string(document.create_time)" The exact variables and
 * functions that may be referenced within an expression are determined by the
 * service that evaluates it. See the service documentation for additional
 * information.
 */
export interface Expr {
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description?: string;
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression?: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location?: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing its
   * purpose. This can be used e.g. in UIs which allow to enter the expression.
   */
  title?: string;
}

/**
 * Allows customers to configure tenant_id for GCIP instance per-app.
 */
export interface GcipSettings {
  /**
   * Login page URI associated with the GCIP tenants. Typically, all resources
   * within the same project share the same login page, though it could be
   * overridden at the sub resource level.
   */
  loginPageUri?: string;
  /**
   * GCIP tenant ids that are linked to the IAP resource. tenant_ids could be a
   * string beginning with a number character to indicate authenticating with
   * GCIP tenant flow, or in the format of _ to indicate authenticating with
   * GCIP agent flow. If agent flow is used, tenant_ids should only contain one
   * single element, while for tenant flow, tenant_ids can contain multiple
   * elements.
   */
  tenantIds?: string[];
}

/**
 * Request message for `GetIamPolicy` method.
 */
export interface GetIamPolicyRequest {
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GetPolicyOptions;
}

/**
 * Encapsulates settings provided to GetIamPolicy.
 */
export interface GetPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  requestedPolicyVersion?: number;
}

/**
 * The IAP configurable settings.
 */
export interface IapSettings {
  /**
   * Top level wrapper for all access related setting in IAP
   */
  accessSettings?: AccessSettings;
  /**
   * Top level wrapper for all application related settings in IAP
   */
  applicationSettings?: ApplicationSettings;
  /**
   * Required. The resource name of the IAP protected resource.
   */
  name?: string;
}

function serializeIapSettings(data: any): IapSettings {
  return {
    ...data,
    accessSettings: data["accessSettings"] !== undefined ? serializeAccessSettings(data["accessSettings"]) : undefined,
  };
}

function deserializeIapSettings(data: any): IapSettings {
  return {
    ...data,
    accessSettings: data["accessSettings"] !== undefined ? deserializeAccessSettings(data["accessSettings"]) : undefined,
  };
}

/**
 * Contains the data that describes an Identity Aware Proxy owned client.
 */
export interface IdentityAwareProxyClient {
  /**
   * Human-friendly name given to the OAuth client.
   */
  displayName?: string;
  /**
   * Output only. Unique identifier of the OAuth client.
   */
  readonly name?: string;
  /**
   * Output only. Client secret of the OAuth client.
   */
  readonly secret?: string;
}

/**
 * Response message for ListBrands.
 */
export interface ListBrandsResponse {
  /**
   * Brands existing in the project.
   */
  brands?: Brand[];
}

/**
 * Response message for ListIdentityAwareProxyClients.
 */
export interface ListIdentityAwareProxyClientsResponse {
  /**
   * Clients existing in the brand.
   */
  identityAwareProxyClients?: IdentityAwareProxyClient[];
  /**
   * A token, which can be send as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * The response from ListTunnelDestGroups.
 */
export interface ListTunnelDestGroupsResponse {
  /**
   * A token that you can send as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * TunnelDestGroup existing in the project.
   */
  tunnelDestGroups?: TunnelDestGroup[];
}

/**
 * Configuration for OAuth login&consent flow behavior as well as for OAuth
 * Credentials.
 */
export interface OAuthSettings {
  /**
   * Domain hint to send as hd=? parameter in OAuth request flow. Enables
   * redirect to primary IDP by skipping Google's login screen.
   * https://developers.google.com/identity/protocols/OpenIDConnect#hd-param
   * Note: IAP does not verify that the id token's hd claim matches this value
   * since access behavior is managed by IAM policies.
   */
  loginHint?: string;
}

/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources. A `Policy` is a collection of
 * `bindings`. A `binding` binds one or more `members`, or principals, to a
 * single `role`. Principals can be user accounts, service accounts, Google
 * groups, and domains (such as G Suite). A `role` is a named list of
 * permissions; each `role` can be an IAM predefined role or a user-created
 * custom role. For some types of Google Cloud resources, a `binding` can also
 * specify a `condition`, which is a logical expression that allows access to a
 * resource only if the expression evaluates to `true`. A condition can add
 * constraints based on attributes of the request, the resource, or both. To
 * learn which resources support conditions in their IAM policies, see the [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * **JSON example:** { "bindings": [ { "role":
 * "roles/resourcemanager.organizationAdmin", "members": [
 * "user:mike@example.com", "group:admins@example.com", "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the [IAM
 * documentation](https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal. The
   * `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of
   * these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings?: Binding[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy. Valid values are `0`, `1`, and `3`.
   * Requests that specify an invalid value are rejected. Any operation that
   * affects conditional role bindings must specify version `3`. This
   * requirement applies to the following operations: * Getting a policy that
   * includes a conditional role binding * Adding a conditional role binding to
   * a policy * Changing a conditional role binding in a policy * Removing any
   * role binding, with or without a condition, from a policy that includes
   * conditions **Important:** If you use IAM Conditions, you must include the
   * `etag` field whenever you call `setIamPolicy`. If you omit this field, then
   * IAM allows you to overwrite a version `3` policy with a version `1` policy,
   * and all of the conditions in the version `3` policy are lost. If a policy
   * does not include any conditions, operations on that policy may specify any
   * valid version or leave the field unset. To learn which resources support
   * conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  version?: number;
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * PolicyDelegationConfig allows google-internal teams to use IAP for apps
 * hosted in a tenant project. Using these settings, the app can delegate
 * permission check to happen against the linked customer project. This is only
 * ever supposed to be used by google internal teams, hence the restriction on
 * the proto.
 */
export interface PolicyDelegationSettings {
  /**
   * Permission to check in IAM.
   */
  iamPermission?: string;
  /**
   * The DNS name of the service (e.g. "resourcemanager.googleapis.com"). This
   * should be the domain name part of the full resource names (see
   * https://aip.dev/122#full-resource-names), which is usually the same as
   * IamServiceSpec.service of the service where the resource type is defined.
   */
  iamServiceName?: string;
  /**
   * Policy name to be checked
   */
  policyName?: PolicyName;
  /**
   * IAM resource to check permission on
   */
  resource?: Resource;
}

/**
 * An internal name for an IAM policy, based on the resource to which the
 * policy applies. Not to be confused with a resource's external full resource
 * name. For more information on this distinction, see
 * go/iam-full-resource-names.
 */
export interface PolicyName {
  /**
   * Identifies an instance of the type. ID format varies by type. The ID
   * format is defined in the IAM .service file that defines the type, either in
   * path_mapping or in a comment.
   */
  id?: string;
  /**
   * For Cloud IAM: The location of the Policy. Must be empty or "global" for
   * Policies owned by global IAM. Must name a region from
   * prodspec/cloud-iam-cloudspec for Regional IAM Policies, see
   * go/iam-faq#where-is-iam-currently-deployed. For Local IAM: This field
   * should be set to "local".
   */
  region?: string;
  /**
   * Resource type. Types are defined in IAM's .service files. Valid values for
   * type might be 'gce', 'gcs', 'project', 'account' etc.
   */
  type?: string;
}

/**
 * Additional options for iap#projectsBrandsIdentityAwareProxyClientsList.
 */
export interface ProjectsBrandsIdentityAwareProxyClientsListOptions {
  /**
   * The maximum number of clients to return. The service may return fewer than
   * this value. If unspecified, at most 100 clients will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListIdentityAwareProxyClients`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListIdentityAwareProxyClients` must match the
   * call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for iap#projectsIap_tunnelLocationsDestGroupsCreate.
 */
export interface ProjectsIap_tunnelLocationsDestGroupsCreateOptions {
  /**
   * Required. The ID to use for the TunnelDestGroup, which becomes the final
   * component of the resource name. This value must be 4-63 characters, and
   * valid characters are `[a-z]-`.
   */
  tunnelDestGroupId?: string;
}

/**
 * Additional options for iap#projectsIap_tunnelLocationsDestGroupsList.
 */
export interface ProjectsIap_tunnelLocationsDestGroupsListOptions {
  /**
   * The maximum number of groups to return. The service might return fewer
   * than this value. If unspecified, at most 100 groups are returned. The
   * maximum value is 1000; values above 1000 are coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListTunnelDestGroups` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListTunnelDestGroups` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for iap#projectsIap_tunnelLocationsDestGroupsPatch.
 */
export interface ProjectsIap_tunnelLocationsDestGroupsPatchOptions {
  /**
   * A field mask that specifies which IAP settings to update. If omitted, then
   * all of the settings are updated. See
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsIap_tunnelLocationsDestGroupsPatchOptions(data: any): ProjectsIap_tunnelLocationsDestGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsIap_tunnelLocationsDestGroupsPatchOptions(data: any): ProjectsIap_tunnelLocationsDestGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Configuration for IAP reauthentication policies.
 */
export interface ReauthSettings {
  /**
   * Reauth session lifetime, how long before a user has to reauthenticate
   * again.
   */
  maxAge?: number /* Duration */;
  /**
   * Reauth method requested.
   */
  method?:  | "METHOD_UNSPECIFIED" | "LOGIN" | "PASSWORD" | "SECURE_KEY" | "ENROLLED_SECOND_FACTORS";
  /**
   * How IAP determines the effective policy in cases of hierarchial policies.
   * Policies are merged from higher in the hierarchy to lower in the hierarchy.
   */
  policyType?:  | "POLICY_TYPE_UNSPECIFIED" | "MINIMUM" | "DEFAULT";
}

function serializeReauthSettings(data: any): ReauthSettings {
  return {
    ...data,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
  };
}

function deserializeReauthSettings(data: any): ReauthSettings {
  return {
    ...data,
    maxAge: data["maxAge"] !== undefined ? data["maxAge"] : undefined,
  };
}

/**
 * The request sent to ResetIdentityAwareProxyClientSecret.
 */
export interface ResetIdentityAwareProxyClientSecretRequest {
}

export interface Resource {
  /**
   * The service defined labels of the resource on which the conditions will be
   * evaluated. The semantics - including the key names - are vague to IAM. If
   * the effective condition has a reference to a `resource.labels[foo]`
   * construct, IAM consults with this map to retrieve the values associated
   * with `foo` key for Conditions evaluation. If the provided key is not found
   * in the labels map, the condition would evaluate to false. This field is in
   * limited use. If your intended use case is not expected to express
   * resource.labels attribute in IAM Conditions, leave this field empty. Before
   * planning on using this attribute please: * Read
   * go/iam-conditions-labels-comm and ensure your service can meet the data
   * availability and management requirements. * Talk to iam-conditions-eng@
   * about your use case.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Name of the resource on which conditions will be evaluated. Must use the
   * Relative Resource Name of the resource, which is the URI path of the
   * resource without the leading "/". Examples are
   * "projects/_/buckets/[BUCKET-ID]" for storage buckets or
   * "projects/[PROJECT-ID]/global/firewalls/[FIREWALL-ID]" for a firewall. This
   * field is required for evaluating conditions with rules on resource names.
   * For a `list` permission check, the resource.name value must be set to the
   * parent resource. If the parent resource is a project, this field should be
   * left unset.
   */
  name?: string;
  /**
   * The name of the service this resource belongs to. It is configured using
   * the official_service_name of the Service as defined in service
   * configurations under //configs/cloud/resourcetypes. For example, the
   * official_service_name of cloud resource manager service is set as
   * 'cloudresourcemanager.googleapis.com' according to
   * //configs/cloud/resourcetypes/google/cloud/resourcemanager/prod.yaml
   */
  service?: string;
  /**
   * The public resource type name of the resource on which conditions will be
   * evaluated. It is configured using the official_name of the ResourceType as
   * defined in service configurations under //configs/cloud/resourcetypes. For
   * example, the official_name for GCP projects is set as
   * 'cloudresourcemanager.googleapis.com/Project' according to
   * //configs/cloud/resourcetypes/google/cloud/resourcemanager/prod.yaml For
   * details see go/iam-conditions-integration-guide.
   */
  type?: string;
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: Policy;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as `*` or `storage.*`) are not allowed. For more
   * information see [IAM
   * Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * A TunnelDestGroup.
 */
export interface TunnelDestGroup {
  /**
   * Unordered list. List of CIDRs that this group applies to.
   */
  cidrs?: string[];
  /**
   * Unordered list. List of FQDNs that this group applies to.
   */
  fqdns?: string[];
  /**
   * Required. Immutable. Identifier for the TunnelDestGroup. Must be unique
   * within the project and contain only lower case letters (a-z) and dashes
   * (-).
   */
  name?: string;
}

/**
 * Additional options for iap#v1UpdateIapSettings.
 */
export interface V1UpdateIapSettingsOptions {
  /**
   * The field mask specifying which IAP settings should be updated. If
   * omitted, the all of the settings are updated. See
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeV1UpdateIapSettingsOptions(data: any): V1UpdateIapSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeV1UpdateIapSettingsOptions(data: any): V1UpdateIapSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
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
