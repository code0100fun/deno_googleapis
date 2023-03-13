// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Policy Simulator API Client for Deno
 * ====================================
 * 
 *  Policy Simulator is a collection of endpoints for creating, running, and viewing a Replay. A `Replay` is a type of simulation that lets you see how your members' access to resources might change if you changed your IAM policy. During a `Replay`, Policy Simulator re-evaluates, or replays, past access attempts under both the current policy and your proposed policy, and compares those results to determine how your members' access might change under the proposed policy.
 * 
 * Docs: https://cloud.google.com/iam/docs/simulating-access
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Policy Simulator is a collection of endpoints for creating, running, and
 * viewing a Replay. A `Replay` is a type of simulation that lets you see how
 * your members' access to resources might change if you changed your IAM
 * policy. During a `Replay`, Policy Simulator re-evaluates, or replays, past
 * access attempts under both the current policy and your proposed policy, and
 * compares those results to determine how your members' access might change
 * under the proposed policy.
 */
export class PolicySimulator {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://policysimulator.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates and starts a Replay using the given ReplayConfig.
   *
   * @param parent Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global`
   */
  async foldersLocationsReplaysCreate(parent: string, req: GoogleCloudPolicysimulatorV1Replay): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudPolicysimulatorV1Replay(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/replays`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the specified Replay. Each `Replay` is available for at least 7 days.
   *
   * @param name Required. The name of the Replay to retrieve, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36`
   */
  async foldersLocationsReplaysGet(name: string): Promise<GoogleCloudPolicysimulatorV1Replay> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudPolicysimulatorV1Replay(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async foldersLocationsReplaysOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async foldersLocationsReplaysOperationsList(name: string, opts: FoldersLocationsReplaysOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Lists the results of running a Replay.
   *
   * @param parent Required. The Replay whose results are listed, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36`
   */
  async foldersLocationsReplaysResultsList(parent: string, opts: FoldersLocationsReplaysResultsListOptions = {}): Promise<GoogleCloudPolicysimulatorV1ListReplayResultsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/results`);
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
    return deserializeGoogleCloudPolicysimulatorV1ListReplayResultsResponse(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async operationsList(name: string, opts: OperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Creates and starts a Replay using the given ReplayConfig.
   *
   * @param parent Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global`
   */
  async organizationsLocationsReplaysCreate(parent: string, req: GoogleCloudPolicysimulatorV1Replay): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudPolicysimulatorV1Replay(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/replays`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the specified Replay. Each `Replay` is available for at least 7 days.
   *
   * @param name Required. The name of the Replay to retrieve, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36`
   */
  async organizationsLocationsReplaysGet(name: string): Promise<GoogleCloudPolicysimulatorV1Replay> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudPolicysimulatorV1Replay(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async organizationsLocationsReplaysOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async organizationsLocationsReplaysOperationsList(name: string, opts: OrganizationsLocationsReplaysOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Lists the results of running a Replay.
   *
   * @param parent Required. The Replay whose results are listed, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36`
   */
  async organizationsLocationsReplaysResultsList(parent: string, opts: OrganizationsLocationsReplaysResultsListOptions = {}): Promise<GoogleCloudPolicysimulatorV1ListReplayResultsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/results`);
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
    return deserializeGoogleCloudPolicysimulatorV1ListReplayResultsResponse(data);
  }

  /**
   * Creates and starts a Replay using the given ReplayConfig.
   *
   * @param parent Required. The parent resource where this Replay will be created. This resource must be a project, folder, or organization with a location. Example: `projects/my-example-project/locations/global`
   */
  async projectsLocationsReplaysCreate(parent: string, req: GoogleCloudPolicysimulatorV1Replay): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudPolicysimulatorV1Replay(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/replays`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the specified Replay. Each `Replay` is available for at least 7 days.
   *
   * @param name Required. The name of the Replay to retrieve, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`, where `{resource-id}` is the ID of the project, folder, or organization that owns the `Replay`. Example: `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36`
   */
  async projectsLocationsReplaysGet(name: string): Promise<GoogleCloudPolicysimulatorV1Replay> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudPolicysimulatorV1Replay(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsReplaysOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsReplaysOperationsList(name: string, opts: ProjectsLocationsReplaysOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Lists the results of running a Replay.
   *
   * @param parent Required. The Replay whose results are listed, in the following format: `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}` Example: `projects/my-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36`
   */
  async projectsLocationsReplaysResultsList(parent: string, opts: ProjectsLocationsReplaysResultsListOptions = {}): Promise<GoogleCloudPolicysimulatorV1ListReplayResultsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/results`);
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
    return deserializeGoogleCloudPolicysimulatorV1ListReplayResultsResponse(data);
  }
}

/**
 * Additional options for
 * PolicySimulator#foldersLocationsReplaysOperationsList.
 */
export interface FoldersLocationsReplaysOperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * Additional options for PolicySimulator#foldersLocationsReplaysResultsList.
 */
export interface FoldersLocationsReplaysResultsListOptions {
  /**
   * The maximum number of ReplayResult objects to return. Defaults to 5000.
   * The maximum value is 5000; values above 5000 are rounded down to 5000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous Simulator.ListReplayResults call.
   * Provide this token to retrieve the next page of results. When paginating,
   * all other parameters provided to [Simulator.ListReplayResults[] must match
   * the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * A summary and comparison of the principal's access under the current
 * (baseline) policies and the proposed (simulated) policies for a single access
 * tuple.
 */
export interface GoogleCloudPolicysimulatorV1AccessStateDiff {
  /**
   * How the principal's access, specified in the AccessState field, changed
   * between the current (baseline) policies and proposed (simulated) policies.
   */
  accessChange?:  | "ACCESS_CHANGE_TYPE_UNSPECIFIED" | "NO_CHANGE" | "UNKNOWN_CHANGE" | "ACCESS_REVOKED" | "ACCESS_GAINED" | "ACCESS_MAYBE_REVOKED" | "ACCESS_MAYBE_GAINED";
  /**
   * The results of evaluating the access tuple under the current (baseline)
   * policies. If the AccessState couldn't be fully evaluated, this field
   * explains why.
   */
  baseline?: GoogleCloudPolicysimulatorV1ExplainedAccess;
  /**
   * The results of evaluating the access tuple under the proposed (simulated)
   * policies. If the AccessState couldn't be fully evaluated, this field
   * explains why.
   */
  simulated?: GoogleCloudPolicysimulatorV1ExplainedAccess;
}

function serializeGoogleCloudPolicysimulatorV1AccessStateDiff(data: any): GoogleCloudPolicysimulatorV1AccessStateDiff {
  return {
    ...data,
    baseline: data["baseline"] !== undefined ? serializeGoogleCloudPolicysimulatorV1ExplainedAccess(data["baseline"]) : undefined,
    simulated: data["simulated"] !== undefined ? serializeGoogleCloudPolicysimulatorV1ExplainedAccess(data["simulated"]) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1AccessStateDiff(data: any): GoogleCloudPolicysimulatorV1AccessStateDiff {
  return {
    ...data,
    baseline: data["baseline"] !== undefined ? deserializeGoogleCloudPolicysimulatorV1ExplainedAccess(data["baseline"]) : undefined,
    simulated: data["simulated"] !== undefined ? deserializeGoogleCloudPolicysimulatorV1ExplainedAccess(data["simulated"]) : undefined,
  };
}

/**
 * Information about the principal, resource, and permission to check.
 */
export interface GoogleCloudPolicysimulatorV1AccessTuple {
  /**
   * Required. The full resource name that identifies the resource. For
   * example,
   * `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`.
   * For examples of full resource names for Google Cloud services, see
   * https://cloud.google.com/iam/help/troubleshooter/full-resource-names.
   */
  fullResourceName?: string;
  /**
   * Required. The IAM permission to check for the specified principal and
   * resource. For a complete list of IAM permissions, see
   * https://cloud.google.com/iam/help/permissions/reference. For a complete
   * list of predefined IAM roles and the permissions in each role, see
   * https://cloud.google.com/iam/help/roles/reference.
   */
  permission?: string;
  /**
   * Required. The principal whose access you want to check, in the form of the
   * email address that represents that principal. For example,
   * `alice@example.com` or
   * `my-service-account@my-project.iam.gserviceaccount.com`. The principal must
   * be a Google Account or a service account. Other types of principals are not
   * supported.
   */
  principal?: string;
}

/**
 * Details about how a binding in a policy affects a principal's ability to use
 * a permission.
 */
export interface GoogleCloudPolicysimulatorV1BindingExplanation {
  /**
   * Required. Indicates whether _this binding_ provides the specified
   * permission to the specified principal for the specified resource. This
   * field does _not_ indicate whether the principal actually has the permission
   * for the resource. There might be another binding that overrides this
   * binding. To determine whether the principal actually has the permission,
   * use the `access` field in the TroubleshootIamPolicyResponse.
   */
  access?:  | "ACCESS_STATE_UNSPECIFIED" | "GRANTED" | "NOT_GRANTED" | "UNKNOWN_CONDITIONAL" | "UNKNOWN_INFO_DENIED";
  /**
   * A condition expression that prevents this binding from granting access
   * unless the expression evaluates to `true`. To learn about IAM Conditions,
   * see https://cloud.google.com/iam/docs/conditions-overview.
   */
  condition?: GoogleTypeExpr;
  /**
   * Indicates whether each principal in the binding includes the principal
   * specified in the request, either directly or indirectly. Each key
   * identifies a principal in the binding, and each value indicates whether the
   * principal in the binding includes the principal in the request. For
   * example, suppose that a binding includes the following principals: *
   * `user:alice@example.com` * `group:product-eng@example.com` The principal in
   * the replayed access tuple is `user:bob@example.com`. This user is a
   * principal of the group `group:product-eng@example.com`. For the first
   * principal in the binding, the key is `user:alice@example.com`, and the
   * `membership` field in the value is set to `MEMBERSHIP_NOT_INCLUDED`. For
   * the second principal in the binding, the key is
   * `group:product-eng@example.com`, and the `membership` field in the value is
   * set to `MEMBERSHIP_INCLUDED`.
   */
  memberships?: {
    [key: string]: GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership
  };
  /**
   * The relevance of this binding to the overall determination for the entire
   * policy.
   */
  relevance?:  | "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH";
  /**
   * The role that this binding grants. For example,
   * `roles/compute.serviceAgent`. For a complete list of predefined IAM roles,
   * as well as the permissions in each role, see
   * https://cloud.google.com/iam/help/roles/reference.
   */
  role?: string;
  /**
   * Indicates whether the role granted by this binding contains the specified
   * permission.
   */
  rolePermission?:  | "ROLE_PERMISSION_UNSPECIFIED" | "ROLE_PERMISSION_INCLUDED" | "ROLE_PERMISSION_NOT_INCLUDED" | "ROLE_PERMISSION_UNKNOWN_INFO_DENIED";
  /**
   * The relevance of the permission's existence, or nonexistence, in the role
   * to the overall determination for the entire policy.
   */
  rolePermissionRelevance?:  | "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH";
}

/**
 * Details about whether the binding includes the principal.
 */
export interface GoogleCloudPolicysimulatorV1BindingExplanationAnnotatedMembership {
  /**
   * Indicates whether the binding includes the principal.
   */
  membership?:  | "MEMBERSHIP_UNSPECIFIED" | "MEMBERSHIP_INCLUDED" | "MEMBERSHIP_NOT_INCLUDED" | "MEMBERSHIP_UNKNOWN_INFO_DENIED" | "MEMBERSHIP_UNKNOWN_UNSUPPORTED";
  /**
   * The relevance of the principal's status to the overall determination for
   * the binding.
   */
  relevance?:  | "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH";
}

/**
 * Details about how a set of policies, listed in ExplainedPolicy, resulted in
 * a certain AccessState when replaying an access tuple.
 */
export interface GoogleCloudPolicysimulatorV1ExplainedAccess {
  /**
   * Whether the principal in the access tuple has permission to access the
   * resource in the access tuple under the given policies.
   */
  accessState?:  | "ACCESS_STATE_UNSPECIFIED" | "GRANTED" | "NOT_GRANTED" | "UNKNOWN_CONDITIONAL" | "UNKNOWN_INFO_DENIED";
  /**
   * If the AccessState is `UNKNOWN`, this field contains a list of errors
   * explaining why the result is `UNKNOWN`. If the `AccessState` is `GRANTED`
   * or `NOT_GRANTED`, this field is omitted.
   */
  errors?: GoogleRpcStatus[];
  /**
   * If the AccessState is `UNKNOWN`, this field contains the policies that led
   * to that result. If the `AccessState` is `GRANTED` or `NOT_GRANTED`, this
   * field is omitted.
   */
  policies?: GoogleCloudPolicysimulatorV1ExplainedPolicy[];
}

function serializeGoogleCloudPolicysimulatorV1ExplainedAccess(data: any): GoogleCloudPolicysimulatorV1ExplainedAccess {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (serializeGoogleCloudPolicysimulatorV1ExplainedPolicy(item))) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1ExplainedAccess(data: any): GoogleCloudPolicysimulatorV1ExplainedAccess {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (deserializeGoogleCloudPolicysimulatorV1ExplainedPolicy(item))) : undefined,
  };
}

/**
 * Details about how a specific IAM Policy contributed to the access check.
 */
export interface GoogleCloudPolicysimulatorV1ExplainedPolicy {
  /**
   * Indicates whether _this policy_ provides the specified permission to the
   * specified principal for the specified resource. This field does _not_
   * indicate whether the principal actually has the permission for the
   * resource. There might be another policy that overrides this policy. To
   * determine whether the principal actually has the permission, use the
   * `access` field in the TroubleshootIamPolicyResponse.
   */
  access?:  | "ACCESS_STATE_UNSPECIFIED" | "GRANTED" | "NOT_GRANTED" | "UNKNOWN_CONDITIONAL" | "UNKNOWN_INFO_DENIED";
  /**
   * Details about how each binding in the policy affects the principal's
   * ability, or inability, to use the permission for the resource. If the user
   * who created the Replay does not have access to the policy, this field is
   * omitted.
   */
  bindingExplanations?: GoogleCloudPolicysimulatorV1BindingExplanation[];
  /**
   * The full resource name that identifies the resource. For example,
   * `//compute.googleapis.com/projects/my-project/zones/us-central1-a/instances/my-instance`.
   * If the user who created the Replay does not have access to the policy, this
   * field is omitted. For examples of full resource names for Google Cloud
   * services, see
   * https://cloud.google.com/iam/help/troubleshooter/full-resource-names.
   */
  fullResourceName?: string;
  /**
   * The IAM policy attached to the resource. If the user who created the
   * Replay does not have access to the policy, this field is empty.
   */
  policy?: GoogleIamV1Policy;
  /**
   * The relevance of this policy to the overall determination in the
   * TroubleshootIamPolicyResponse. If the user who created the Replay does not
   * have access to the policy, this field is omitted.
   */
  relevance?:  | "HEURISTIC_RELEVANCE_UNSPECIFIED" | "NORMAL" | "HIGH";
}

function serializeGoogleCloudPolicysimulatorV1ExplainedPolicy(data: any): GoogleCloudPolicysimulatorV1ExplainedPolicy {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeGoogleIamV1Policy(data["policy"]) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1ExplainedPolicy(data: any): GoogleCloudPolicysimulatorV1ExplainedPolicy {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeGoogleIamV1Policy(data["policy"]) : undefined,
  };
}

/**
 * Response message for Simulator.ListReplayResults.
 */
export interface GoogleCloudPolicysimulatorV1ListReplayResultsResponse {
  /**
   * A token that you can use to retrieve the next page of ReplayResult
   * objects. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The results of running a Replay.
   */
  replayResults?: GoogleCloudPolicysimulatorV1ReplayResult[];
}

function serializeGoogleCloudPolicysimulatorV1ListReplayResultsResponse(data: any): GoogleCloudPolicysimulatorV1ListReplayResultsResponse {
  return {
    ...data,
    replayResults: data["replayResults"] !== undefined ? data["replayResults"].map((item: any) => (serializeGoogleCloudPolicysimulatorV1ReplayResult(item))) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1ListReplayResultsResponse(data: any): GoogleCloudPolicysimulatorV1ListReplayResultsResponse {
  return {
    ...data,
    replayResults: data["replayResults"] !== undefined ? data["replayResults"].map((item: any) => (deserializeGoogleCloudPolicysimulatorV1ReplayResult(item))) : undefined,
  };
}

/**
 * A resource describing a `Replay`, or simulation.
 */
export interface GoogleCloudPolicysimulatorV1Replay {
  /**
   * Required. The configuration used for the `Replay`.
   */
  config?: GoogleCloudPolicysimulatorV1ReplayConfig;
  /**
   * Output only. The resource name of the `Replay`, which has the following
   * format:
   * `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}`,
   * where `{resource-id}` is the ID of the project, folder, or organization
   * that owns the Replay. Example:
   * `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36`
   */
  readonly name?: string;
  /**
   * Output only. Summary statistics about the replayed log entries.
   */
  readonly resultsSummary?: GoogleCloudPolicysimulatorV1ReplayResultsSummary;
  /**
   * Output only. The current state of the `Replay`.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED";
}

function serializeGoogleCloudPolicysimulatorV1Replay(data: any): GoogleCloudPolicysimulatorV1Replay {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeGoogleCloudPolicysimulatorV1ReplayConfig(data["config"]) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1Replay(data: any): GoogleCloudPolicysimulatorV1Replay {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeGoogleCloudPolicysimulatorV1ReplayConfig(data["config"]) : undefined,
  };
}

/**
 * The configuration used for a Replay.
 */
export interface GoogleCloudPolicysimulatorV1ReplayConfig {
  /**
   * The logs to use as input for the Replay.
   */
  logSource?:  | "LOG_SOURCE_UNSPECIFIED" | "RECENT_ACCESSES";
  /**
   * A mapping of the resources that you want to simulate policies for and the
   * policies that you want to simulate. Keys are the full resource names for
   * the resources. For example,
   * `//cloudresourcemanager.googleapis.com/projects/my-project`. For examples
   * of full resource names for Google Cloud services, see
   * https://cloud.google.com/iam/help/troubleshooter/full-resource-names.
   * Values are Policy objects representing the policies that you want to
   * simulate. Replays automatically take into account any IAM policies
   * inherited through the resource hierarchy, and any policies set on
   * descendant resources. You do not need to include these policies in the
   * policy overlay.
   */
  policyOverlay?: {
    [key: string]: GoogleIamV1Policy
  };
}

function serializeGoogleCloudPolicysimulatorV1ReplayConfig(data: any): GoogleCloudPolicysimulatorV1ReplayConfig {
  return {
    ...data,
    policyOverlay: data["policyOverlay"] !== undefined ? Object.fromEntries(Object.entries(data["policyOverlay"]).map(([k, v]: [string, any]) => ([k, serializeGoogleIamV1Policy(v)]))) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1ReplayConfig(data: any): GoogleCloudPolicysimulatorV1ReplayConfig {
  return {
    ...data,
    policyOverlay: data["policyOverlay"] !== undefined ? Object.fromEntries(Object.entries(data["policyOverlay"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleIamV1Policy(v)]))) : undefined,
  };
}

/**
 * The difference between the results of evaluating an access tuple under the
 * current (baseline) policies and under the proposed (simulated) policies. This
 * difference explains how a principal's access could change if the proposed
 * policies were applied.
 */
export interface GoogleCloudPolicysimulatorV1ReplayDiff {
  /**
   * A summary and comparison of the principal's access under the current
   * (baseline) policies and the proposed (simulated) policies for a single
   * access tuple. The evaluation of the principal's access is reported in the
   * AccessState field.
   */
  accessDiff?: GoogleCloudPolicysimulatorV1AccessStateDiff;
}

function serializeGoogleCloudPolicysimulatorV1ReplayDiff(data: any): GoogleCloudPolicysimulatorV1ReplayDiff {
  return {
    ...data,
    accessDiff: data["accessDiff"] !== undefined ? serializeGoogleCloudPolicysimulatorV1AccessStateDiff(data["accessDiff"]) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1ReplayDiff(data: any): GoogleCloudPolicysimulatorV1ReplayDiff {
  return {
    ...data,
    accessDiff: data["accessDiff"] !== undefined ? deserializeGoogleCloudPolicysimulatorV1AccessStateDiff(data["accessDiff"]) : undefined,
  };
}

/**
 * Metadata about a Replay operation.
 */
export interface GoogleCloudPolicysimulatorV1ReplayOperationMetadata {
  /**
   * Time when the request was received.
   */
  startTime?: Date;
}

function serializeGoogleCloudPolicysimulatorV1ReplayOperationMetadata(data: any): GoogleCloudPolicysimulatorV1ReplayOperationMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1ReplayOperationMetadata(data: any): GoogleCloudPolicysimulatorV1ReplayOperationMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The result of replaying a single access tuple against a simulated state.
 */
export interface GoogleCloudPolicysimulatorV1ReplayResult {
  /**
   * The access tuple that was replayed. This field includes information about
   * the principal, resource, and permission that were involved in the access
   * attempt.
   */
  accessTuple?: GoogleCloudPolicysimulatorV1AccessTuple;
  /**
   * The difference between the principal's access under the current (baseline)
   * policies and the principal's access under the proposed (simulated)
   * policies. This field is only included for access tuples that were
   * successfully replayed and had different results under the current policies
   * and the proposed policies.
   */
  diff?: GoogleCloudPolicysimulatorV1ReplayDiff;
  /**
   * The error that caused the access tuple replay to fail. This field is only
   * included for access tuples that were not replayed successfully.
   */
  error?: GoogleRpcStatus;
  /**
   * The latest date this access tuple was seen in the logs.
   */
  lastSeenDate?: GoogleTypeDate;
  /**
   * The resource name of the `ReplayResult`, in the following format:
   * `{projects|folders|organizations}/{resource-id}/locations/global/replays/{replay-id}/results/{replay-result-id}`,
   * where `{resource-id}` is the ID of the project, folder, or organization
   * that owns the Replay. Example:
   * `projects/my-example-project/locations/global/replays/506a5f7f-38ce-4d7d-8e03-479ce1833c36/results/1234`
   */
  name?: string;
  /**
   * The Replay that the access tuple was included in.
   */
  parent?: string;
}

function serializeGoogleCloudPolicysimulatorV1ReplayResult(data: any): GoogleCloudPolicysimulatorV1ReplayResult {
  return {
    ...data,
    diff: data["diff"] !== undefined ? serializeGoogleCloudPolicysimulatorV1ReplayDiff(data["diff"]) : undefined,
  };
}

function deserializeGoogleCloudPolicysimulatorV1ReplayResult(data: any): GoogleCloudPolicysimulatorV1ReplayResult {
  return {
    ...data,
    diff: data["diff"] !== undefined ? deserializeGoogleCloudPolicysimulatorV1ReplayDiff(data["diff"]) : undefined,
  };
}

/**
 * Summary statistics about the replayed log entries.
 */
export interface GoogleCloudPolicysimulatorV1ReplayResultsSummary {
  /**
   * The number of replayed log entries with a difference between baseline and
   * simulated policies.
   */
  differenceCount?: number;
  /**
   * The number of log entries that could not be replayed.
   */
  errorCount?: number;
  /**
   * The total number of log entries replayed.
   */
  logCount?: number;
  /**
   * The date of the newest log entry replayed.
   */
  newestDate?: GoogleTypeDate;
  /**
   * The date of the oldest log entry replayed.
   */
  oldestDate?: GoogleTypeDate;
  /**
   * The number of replayed log entries with no difference between baseline and
   * simulated policies.
   */
  unchangedCount?: number;
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface GoogleIamV1AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: GoogleIamV1AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
   */
  service?: string;
}

/**
 * Provides the configuration for logging a type of permissions. Example: {
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables
 * 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from
 * DATA_READ logging.
 */
export interface GoogleIamV1AuditLogConfig {
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission. Follows the same format of Binding.members.
   */
  exemptedMembers?: string[];
  /**
   * The log type that this config enables.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface GoogleIamV1Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: GoogleTypeExpr;
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
export interface GoogleIamV1Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: GoogleIamV1AuditConfig[];
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
  bindings?: GoogleIamV1Binding[];
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

function serializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunningListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunningOperation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunningOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpcStatus;
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
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
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
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface GoogleTypeDate {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
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
export interface GoogleTypeExpr {
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
 * Additional options for PolicySimulator#operationsList.
 */
export interface OperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * PolicySimulator#organizationsLocationsReplaysOperationsList.
 */
export interface OrganizationsLocationsReplaysOperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * PolicySimulator#organizationsLocationsReplaysResultsList.
 */
export interface OrganizationsLocationsReplaysResultsListOptions {
  /**
   * The maximum number of ReplayResult objects to return. Defaults to 5000.
   * The maximum value is 5000; values above 5000 are rounded down to 5000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous Simulator.ListReplayResults call.
   * Provide this token to retrieve the next page of results. When paginating,
   * all other parameters provided to [Simulator.ListReplayResults[] must match
   * the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * PolicySimulator#projectsLocationsReplaysOperationsList.
 */
export interface ProjectsLocationsReplaysOperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The standard list page size.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * Additional options for PolicySimulator#projectsLocationsReplaysResultsList.
 */
export interface ProjectsLocationsReplaysResultsListOptions {
  /**
   * The maximum number of ReplayResult objects to return. Defaults to 5000.
   * The maximum value is 5000; values above 5000 are rounded down to 5000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous Simulator.ListReplayResults call.
   * Provide this token to retrieve the next page of results. When paginating,
   * all other parameters provided to [Simulator.ListReplayResults[] must match
   * the call that provided the page token.
   */
  pageToken?: string;
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