// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * BigQuery Reservation API Client for Deno
 * ========================================
 * 
 * A service to modify your BigQuery flat-rate reservations.
 * 
 * Docs: https://cloud.google.com/bigquery/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * A service to modify your BigQuery flat-rate reservations.
 */
export class BigQueryReservation {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://bigqueryreservation.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new capacity commitment resource.
   *
   * @param parent Required. Resource name of the parent reservation. E.g., `projects/myproject/locations/US`
   */
  async projectsLocationsCapacityCommitmentsCreate(parent: string, req: CapacityCommitment, opts: ProjectsLocationsCapacityCommitmentsCreateOptions = {}): Promise<CapacityCommitment> {
    req = serializeCapacityCommitment(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/capacityCommitments`);
    if (opts.capacityCommitmentId !== undefined) {
      url.searchParams.append("capacityCommitmentId", String(opts.capacityCommitmentId));
    }
    if (opts.enforceSingleAdminProjectPerOrg !== undefined) {
      url.searchParams.append("enforceSingleAdminProjectPerOrg", String(opts.enforceSingleAdminProjectPerOrg));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCapacityCommitment(data);
  }

  /**
   * Deletes a capacity commitment. Attempting to delete capacity commitment
   * before its commitment_end_time will fail with the error code
   * `google.rpc.Code.FAILED_PRECONDITION`.
   *
   * @param name Required. Resource name of the capacity commitment to delete. E.g., `projects/myproject/locations/US/capacityCommitments/123`
   */
  async projectsLocationsCapacityCommitmentsDelete(name: string, opts: ProjectsLocationsCapacityCommitmentsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about the capacity commitment.
   *
   * @param name Required. Resource name of the capacity commitment to retrieve. E.g., `projects/myproject/locations/US/capacityCommitments/123`
   */
  async projectsLocationsCapacityCommitmentsGet(name: string): Promise<CapacityCommitment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCapacityCommitment(data);
  }

  /**
   * Lists all the capacity commitments for the admin project.
   *
   * @param parent Required. Resource name of the parent reservation. E.g., `projects/myproject/locations/US`
   */
  async projectsLocationsCapacityCommitmentsList(parent: string, opts: ProjectsLocationsCapacityCommitmentsListOptions = {}): Promise<ListCapacityCommitmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/capacityCommitments`);
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
    return deserializeListCapacityCommitmentsResponse(data);
  }

  /**
   * Merges capacity commitments of the same plan into a single commitment. The
   * resulting capacity commitment has the greater commitment_end_time out of
   * the to-be-merged capacity commitments. Attempting to merge capacity
   * commitments of different plan will fail with the error code
   * `google.rpc.Code.FAILED_PRECONDITION`.
   *
   * @param parent Parent resource that identifies admin project and location e.g., `projects/myproject/locations/us`
   */
  async projectsLocationsCapacityCommitmentsMerge(parent: string, req: MergeCapacityCommitmentsRequest): Promise<CapacityCommitment> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/capacityCommitments:merge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCapacityCommitment(data);
  }

  /**
   * Updates an existing capacity commitment. Only `plan` and `renewal_plan`
   * fields can be updated. Plan can only be changed to a plan of a longer
   * commitment period. Attempting to change to a plan with shorter commitment
   * period will fail with the error code `google.rpc.Code.FAILED_PRECONDITION`.
   *
   * @param name Output only. The resource name of the capacity commitment, e.g., `projects/myproject/locations/US/capacityCommitments/123` The commitment_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters.
   */
  async projectsLocationsCapacityCommitmentsPatch(name: string, req: CapacityCommitment, opts: ProjectsLocationsCapacityCommitmentsPatchOptions = {}): Promise<CapacityCommitment> {
    req = serializeCapacityCommitment(req);
    opts = serializeProjectsLocationsCapacityCommitmentsPatchOptions(opts);
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
    return deserializeCapacityCommitment(data);
  }

  /**
   * Splits capacity commitment to two commitments of the same plan and
   * `commitment_end_time`. A common use case is to enable downgrading
   * commitments. For example, in order to downgrade from 10000 slots to 8000,
   * you might split a 10000 capacity commitment into commitments of 2000 and
   * 8000. Then, you delete the first one after the commitment end time passes.
   *
   * @param name Required. The resource name e.g.,: `projects/myproject/locations/US/capacityCommitments/123`
   */
  async projectsLocationsCapacityCommitmentsSplit(name: string, req: SplitCapacityCommitmentRequest): Promise<SplitCapacityCommitmentResponse> {
    req = serializeSplitCapacityCommitmentRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:split`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSplitCapacityCommitmentResponse(data);
  }

  /**
   * Retrieves a BI reservation.
   *
   * @param name Required. Name of the requested reservation, for example: `projects/{project_id}/locations/{location_id}/biReservation`
   */
  async projectsLocationsGetBiReservation(name: string): Promise<BiReservation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBiReservation(data);
  }

  /**
   * Creates an assignment object which allows the given project to submit jobs
   * of a certain type using slots from the specified reservation. Currently a
   * resource (project, folder, organization) can only have one assignment per
   * each (job_type, location) combination, and that reservation will be used
   * for all jobs of the matching type. Different assignments can be created on
   * different levels of the projects, folders or organization hierarchy. During
   * query execution, the assignment is looked up at the project, folder and
   * organization levels in that order. The first assignment found is applied to
   * the query. When creating assignments, it does not matter if other
   * assignments exist at higher levels. Example: * The organization
   * `organizationA` contains two projects, `project1` and `project2`. *
   * Assignments for all three entities (`organizationA`, `project1`, and
   * `project2`) could all be created and mapped to the same or different
   * reservations. "None" assignments represent an absence of the assignment.
   * Projects assigned to None use on-demand pricing. To create a "None"
   * assignment, use "none" as a reservation_id in the parent. Example parent:
   * `projects/myproject/locations/US/reservations/none`. Returns
   * `google.rpc.Code.PERMISSION_DENIED` if user does not have 'bigquery.admin'
   * permissions on the project using the reservation and the project that owns
   * this reservation. Returns `google.rpc.Code.INVALID_ARGUMENT` when location
   * of the assignment does not match location of the reservation.
   *
   * @param parent Required. The parent resource name of the assignment E.g. `projects/myproject/locations/US/reservations/team1-prod`
   */
  async projectsLocationsReservationsAssignmentsCreate(parent: string, req: Assignment, opts: ProjectsLocationsReservationsAssignmentsCreateOptions = {}): Promise<Assignment> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assignments`);
    if (opts.assignmentId !== undefined) {
      url.searchParams.append("assignmentId", String(opts.assignmentId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Assignment;
  }

  /**
   * Deletes a assignment. No expansion will happen. Example: * Organization
   * `organizationA` contains two projects, `project1` and `project2`. *
   * Reservation `res1` exists and was created previously. * CreateAssignment
   * was used previously to define the following associations between entities
   * and reservations: `` and `` In this example, deletion of the `` assignment
   * won't affect the other assignment ``. After said deletion, queries from
   * `project1` will still use `res1` while queries from `project2` will switch
   * to use on-demand mode.
   *
   * @param name Required. Name of the resource, e.g. `projects/myproject/locations/US/reservations/team1-prod/assignments/123`
   */
  async projectsLocationsReservationsAssignmentsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists assignments. Only explicitly created assignments will be returned.
   * Example: * Organization `organizationA` contains two projects, `project1`
   * and `project2`. * Reservation `res1` exists and was created previously. *
   * CreateAssignment was used previously to define the following associations
   * between entities and reservations: `` and `` In this example,
   * ListAssignments will just return the above two assignments for reservation
   * `res1`, and no expansion/merge will happen. The wildcard "-" can be used
   * for reservations in the request. In that case all assignments belongs to
   * the specified project and location will be listed. **Note** "-" cannot be
   * used for projects nor locations.
   *
   * @param parent Required. The parent resource name e.g.: `projects/myproject/locations/US/reservations/team1-prod` Or: `projects/myproject/locations/US/reservations/-`
   */
  async projectsLocationsReservationsAssignmentsList(parent: string, opts: ProjectsLocationsReservationsAssignmentsListOptions = {}): Promise<ListAssignmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assignments`);
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
    return data as ListAssignmentsResponse;
  }

  /**
   * Moves an assignment under a new reservation. This differs from removing an
   * existing assignment and recreating a new one by providing a transactional
   * change that ensures an assignee always has an associated reservation.
   *
   * @param name Required. The resource name of the assignment, e.g. `projects/myproject/locations/US/reservations/team1-prod/assignments/123`
   */
  async projectsLocationsReservationsAssignmentsMove(name: string, req: MoveAssignmentRequest): Promise<Assignment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Assignment;
  }

  /**
   * Updates an existing assignment. Only the `priority` field can be updated.
   *
   * @param name Output only. Name of the resource. E.g.: `projects/myproject/locations/US/reservations/team1-prod/assignments/123`. The assignment_id must only contain lower case alphanumeric characters or dashes and the max length is 64 characters.
   */
  async projectsLocationsReservationsAssignmentsPatch(name: string, req: Assignment, opts: ProjectsLocationsReservationsAssignmentsPatchOptions = {}): Promise<Assignment> {
    opts = serializeProjectsLocationsReservationsAssignmentsPatchOptions(opts);
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
    return data as Assignment;
  }

  /**
   * Creates a new reservation resource.
   *
   * @param parent Required. Project, location. E.g., `projects/myproject/locations/US`
   */
  async projectsLocationsReservationsCreate(parent: string, req: Reservation, opts: ProjectsLocationsReservationsCreateOptions = {}): Promise<Reservation> {
    req = serializeReservation(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/reservations`);
    if (opts.reservationId !== undefined) {
      url.searchParams.append("reservationId", String(opts.reservationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReservation(data);
  }

  /**
   * Deletes a reservation. Returns `google.rpc.Code.FAILED_PRECONDITION` when
   * reservation has assignments.
   *
   * @param name Required. Resource name of the reservation to retrieve. E.g., `projects/myproject/locations/US/reservations/team1-prod`
   */
  async projectsLocationsReservationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about the reservation.
   *
   * @param name Required. Resource name of the reservation to retrieve. E.g., `projects/myproject/locations/US/reservations/team1-prod`
   */
  async projectsLocationsReservationsGet(name: string): Promise<Reservation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReservation(data);
  }

  /**
   * Lists all the reservations for the project in the specified location.
   *
   * @param parent Required. The parent resource name containing project and location, e.g.: `projects/myproject/locations/US`
   */
  async projectsLocationsReservationsList(parent: string, opts: ProjectsLocationsReservationsListOptions = {}): Promise<ListReservationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/reservations`);
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
    return deserializeListReservationsResponse(data);
  }

  /**
   * Updates an existing reservation resource.
   *
   * @param name The resource name of the reservation, e.g., `projects/*\/locations/*\/reservations/team1-prod`. The reservation_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters.
   */
  async projectsLocationsReservationsPatch(name: string, req: Reservation, opts: ProjectsLocationsReservationsPatchOptions = {}): Promise<Reservation> {
    req = serializeReservation(req);
    opts = serializeProjectsLocationsReservationsPatchOptions(opts);
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
    return deserializeReservation(data);
  }

  /**
   * Looks up assignments for a specified resource for a particular region. If
   * the request is about a project: 1. Assignments created on the project will
   * be returned if they exist. 2. Otherwise assignments created on the closest
   * ancestor will be returned. 3. Assignments for different JobTypes will all
   * be returned. The same logic applies if the request is about a folder. If
   * the request is about an organization, then assignments created on the
   * organization will be returned (organization doesn't have ancestors).
   * Comparing to ListAssignments, there are some behavior differences: 1.
   * permission on the assignee will be verified in this API. 2. Hierarchy
   * lookup (project->folder->organization) happens in this API. 3. Parent here
   * is `projects/*\/locations/*`, instead of
   * `projects/*\/locations/*reservations/*`.
   *
   * @param parent Required. The resource name with location (project name could be the wildcard '-'), e.g.: `projects/-/locations/US`.
   */
  async projectsLocationsSearchAllAssignments(parent: string, opts: ProjectsLocationsSearchAllAssignmentsOptions = {}): Promise<SearchAllAssignmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:searchAllAssignments`);
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
    return data as SearchAllAssignmentsResponse;
  }

  /**
   * Deprecated: Looks up assignments for a specified resource for a particular
   * region. If the request is about a project: 1. Assignments created on the
   * project will be returned if they exist. 2. Otherwise assignments created on
   * the closest ancestor will be returned. 3. Assignments for different
   * JobTypes will all be returned. The same logic applies if the request is
   * about a folder. If the request is about an organization, then assignments
   * created on the organization will be returned (organization doesn't have
   * ancestors). Comparing to ListAssignments, there are some behavior
   * differences: 1. permission on the assignee will be verified in this API. 2.
   * Hierarchy lookup (project->folder->organization) happens in this API. 3.
   * Parent here is `projects/*\/locations/*`, instead of
   * `projects/*\/locations/*reservations/*`. **Note** "-" cannot be used for
   * projects nor locations.
   *
   * @param parent Required. The resource name of the admin project(containing project and location), e.g.: `projects/myproject/locations/US`.
   */
  async projectsLocationsSearchAssignments(parent: string, opts: ProjectsLocationsSearchAssignmentsOptions = {}): Promise<SearchAssignmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:searchAssignments`);
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
    return data as SearchAssignmentsResponse;
  }

  /**
   * Updates a BI reservation. Only fields specified in the `field_mask` are
   * updated. A singleton BI reservation always exists with default size 0. In
   * order to reserve BI capacity it needs to be updated to an amount greater
   * than 0. In order to release BI capacity reservation size must be set to 0.
   *
   * @param name The resource name of the singleton BI reservation. Reservation names have the form `projects/{project_id}/locations/{location_id}/biReservation`.
   */
  async projectsLocationsUpdateBiReservation(name: string, req: BiReservation, opts: ProjectsLocationsUpdateBiReservationOptions = {}): Promise<BiReservation> {
    req = serializeBiReservation(req);
    opts = serializeProjectsLocationsUpdateBiReservationOptions(opts);
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
    return deserializeBiReservation(data);
  }
}

/**
 * An assignment allows a project to submit jobs of a certain type using slots
 * from the specified reservation.
 */
export interface Assignment {
  /**
   * The resource which will use the reservation. E.g. `projects/myproject`,
   * `folders/123`, or `organizations/456`.
   */
  assignee?: string;
  /**
   * Which type of jobs will use the reservation.
   */
  jobType?:  | "JOB_TYPE_UNSPECIFIED" | "PIPELINE" | "QUERY" | "ML_EXTERNAL" | "BACKGROUND";
  /**
   * Output only. Name of the resource. E.g.:
   * `projects/myproject/locations/US/reservations/team1-prod/assignments/123`.
   * The assignment_id must only contain lower case alphanumeric characters or
   * dashes and the max length is 64 characters.
   */
  readonly name?: string;
  /**
   * Output only. State of the assignment.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "ACTIVE";
}

/**
 * Auto scaling settings.
 */
export interface Autoscale {
  /**
   * Output only. The slot capacity added to this reservation when autoscale
   * happens. Will be between [0, max_slots].
   */
  readonly currentSlots?: bigint;
  /**
   * Number of slots to be scaled when needed.
   */
  maxSlots?: bigint;
}

function serializeAutoscale(data: any): Autoscale {
  return {
    ...data,
    maxSlots: data["maxSlots"] !== undefined ? String(data["maxSlots"]) : undefined,
  };
}

function deserializeAutoscale(data: any): Autoscale {
  return {
    ...data,
    currentSlots: data["currentSlots"] !== undefined ? BigInt(data["currentSlots"]) : undefined,
    maxSlots: data["maxSlots"] !== undefined ? BigInt(data["maxSlots"]) : undefined,
  };
}

/**
 * Represents a BI Reservation.
 */
export interface BiReservation {
  /**
   * The resource name of the singleton BI reservation. Reservation names have
   * the form `projects/{project_id}/locations/{location_id}/biReservation`.
   */
  name?: string;
  /**
   * Preferred tables to use BI capacity for.
   */
  preferredTables?: TableReference[];
  /**
   * Size of a reservation, in bytes.
   */
  size?: bigint;
  /**
   * Output only. The last update timestamp of a reservation.
   */
  readonly updateTime?: Date;
}

function serializeBiReservation(data: any): BiReservation {
  return {
    ...data,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
  };
}

function deserializeBiReservation(data: any): BiReservation {
  return {
    ...data,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Capacity commitment is a way to purchase compute capacity for BigQuery jobs
 * (in the form of slots) with some committed period of usage. Annual
 * commitments renew by default. Commitments can be removed after their
 * commitment end time passes. In order to remove annual commitment, its plan
 * needs to be changed to monthly or flex first. A capacity commitment resource
 * exists as a child resource of the admin project.
 */
export interface CapacityCommitment {
  /**
   * Output only. The end of the current commitment period. It is applicable
   * only for ACTIVE capacity commitments.
   */
  readonly commitmentEndTime?: Date;
  /**
   * Output only. The start of the current commitment period. It is applicable
   * only for ACTIVE capacity commitments.
   */
  readonly commitmentStartTime?: Date;
  /**
   * Do not use.
   */
  edition?:  | "EDITION_UNSPECIFIED" | "ENTERPRISE";
  /**
   * Output only. For FAILED commitment plan, provides the reason of failure.
   */
  readonly failureStatus?: Status;
  /**
   * Applicable only for commitments located within one of the BigQuery
   * multi-regions (US or EU). If set to true, this commitment is placed in the
   * organization's secondary region which is designated for disaster recovery
   * purposes. If false, this commitment is placed in the organization's default
   * region.
   */
  multiRegionAuxiliary?: boolean;
  /**
   * Output only. The resource name of the capacity commitment, e.g.,
   * `projects/myproject/locations/US/capacityCommitments/123` The commitment_id
   * must only contain lower case alphanumeric characters or dashes. It must
   * start with a letter and must not end with a dash. Its maximum length is 64
   * characters.
   */
  readonly name?: string;
  /**
   * Capacity commitment commitment plan.
   */
  plan?:  | "COMMITMENT_PLAN_UNSPECIFIED" | "FLEX" | "TRIAL" | "MONTHLY" | "ANNUAL" | "NONE";
  /**
   * The plan this capacity commitment is converted to after
   * commitment_end_time passes. Once the plan is changed, committed period is
   * extended according to commitment plan. Only applicable for ANNUAL and TRIAL
   * commitments.
   */
  renewalPlan?:  | "COMMITMENT_PLAN_UNSPECIFIED" | "FLEX" | "TRIAL" | "MONTHLY" | "ANNUAL" | "NONE";
  /**
   * Number of slots in this commitment.
   */
  slotCount?: bigint;
  /**
   * Output only. State of the commitment.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "ACTIVE" | "FAILED";
}

function serializeCapacityCommitment(data: any): CapacityCommitment {
  return {
    ...data,
    slotCount: data["slotCount"] !== undefined ? String(data["slotCount"]) : undefined,
  };
}

function deserializeCapacityCommitment(data: any): CapacityCommitment {
  return {
    ...data,
    commitmentEndTime: data["commitmentEndTime"] !== undefined ? new Date(data["commitmentEndTime"]) : undefined,
    commitmentStartTime: data["commitmentStartTime"] !== undefined ? new Date(data["commitmentStartTime"]) : undefined,
    slotCount: data["slotCount"] !== undefined ? BigInt(data["slotCount"]) : undefined,
  };
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
 * The response for ReservationService.ListAssignments.
 */
export interface ListAssignmentsResponse {
  /**
   * List of assignments visible to the user.
   */
  assignments?: Assignment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response for ReservationService.ListCapacityCommitments.
 */
export interface ListCapacityCommitmentsResponse {
  /**
   * List of capacity commitments visible to the user.
   */
  capacityCommitments?: CapacityCommitment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListCapacityCommitmentsResponse(data: any): ListCapacityCommitmentsResponse {
  return {
    ...data,
    capacityCommitments: data["capacityCommitments"] !== undefined ? data["capacityCommitments"].map((item: any) => (serializeCapacityCommitment(item))) : undefined,
  };
}

function deserializeListCapacityCommitmentsResponse(data: any): ListCapacityCommitmentsResponse {
  return {
    ...data,
    capacityCommitments: data["capacityCommitments"] !== undefined ? data["capacityCommitments"].map((item: any) => (deserializeCapacityCommitment(item))) : undefined,
  };
}

/**
 * The response for ReservationService.ListReservations.
 */
export interface ListReservationsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * List of reservations visible to the user.
   */
  reservations?: Reservation[];
}

function serializeListReservationsResponse(data: any): ListReservationsResponse {
  return {
    ...data,
    reservations: data["reservations"] !== undefined ? data["reservations"].map((item: any) => (serializeReservation(item))) : undefined,
  };
}

function deserializeListReservationsResponse(data: any): ListReservationsResponse {
  return {
    ...data,
    reservations: data["reservations"] !== undefined ? data["reservations"].map((item: any) => (deserializeReservation(item))) : undefined,
  };
}

/**
 * The request for ReservationService.MergeCapacityCommitments.
 */
export interface MergeCapacityCommitmentsRequest {
  /**
   * Ids of capacity commitments to merge. These capacity commitments must
   * exist under admin project and location specified in the parent. ID is the
   * last portion of capacity commitment name e.g., 'abc' for
   * projects/myproject/locations/US/capacityCommitments/abc
   */
  capacityCommitmentIds?: string[];
}

/**
 * The request for ReservationService.MoveAssignment. **Note**:
 * "bigquery.reservationAssignments.create" permission is required on the
 * destination_id. **Note**: "bigquery.reservationAssignments.create" and
 * "bigquery.reservationAssignments.delete" permission are required on the
 * related assignee.
 */
export interface MoveAssignmentRequest {
  /**
   * The new reservation ID, e.g.:
   * `projects/myotherproject/locations/US/reservations/team2-prod`
   */
  destinationId?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsCapacityCommitmentsCreate.
 */
export interface ProjectsLocationsCapacityCommitmentsCreateOptions {
  /**
   * The optional capacity commitment ID. Capacity commitment name will be
   * generated automatically if this field is empty. This field must only
   * contain lower case alphanumeric characters or dashes. The first and last
   * character cannot be a dash. Max length is 64 characters. NOTE: this ID
   * won't be kept if the capacity commitment is split or merged.
   */
  capacityCommitmentId?: string;
  /**
   * If true, fail the request if another project in the organization has a
   * capacity commitment.
   */
  enforceSingleAdminProjectPerOrg?: boolean;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsCapacityCommitmentsDelete.
 */
export interface ProjectsLocationsCapacityCommitmentsDeleteOptions {
  /**
   * Can be used to force delete commitments even if assignments exist.
   * Deleting commitments with assignments may cause queries to fail if they no
   * longer have access to slots.
   */
  force?: boolean;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsCapacityCommitmentsList.
 */
export interface ProjectsLocationsCapacityCommitmentsListOptions {
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsCapacityCommitmentsPatch.
 */
export interface ProjectsLocationsCapacityCommitmentsPatchOptions {
  /**
   * Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCapacityCommitmentsPatchOptions(data: any): ProjectsLocationsCapacityCommitmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCapacityCommitmentsPatchOptions(data: any): ProjectsLocationsCapacityCommitmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsReservationsAssignmentsCreate.
 */
export interface ProjectsLocationsReservationsAssignmentsCreateOptions {
  /**
   * The optional assignment ID. Assignment name will be generated
   * automatically if this field is empty. This field must only contain lower
   * case alphanumeric characters or dashes. Max length is 64 characters.
   */
  assignmentId?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsReservationsAssignmentsList.
 */
export interface ProjectsLocationsReservationsAssignmentsListOptions {
  /**
   * The maximum number of items to return per page.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsReservationsAssignmentsPatch.
 */
export interface ProjectsLocationsReservationsAssignmentsPatchOptions {
  /**
   * Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsReservationsAssignmentsPatchOptions(data: any): ProjectsLocationsReservationsAssignmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsReservationsAssignmentsPatchOptions(data: any): ProjectsLocationsReservationsAssignmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsReservationsCreate.
 */
export interface ProjectsLocationsReservationsCreateOptions {
  /**
   * The reservation ID. It must only contain lower case alphanumeric
   * characters or dashes. It must start with a letter and must not end with a
   * dash. Its maximum length is 64 characters.
   */
  reservationId?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsReservationsList.
 */
export interface ProjectsLocationsReservationsListOptions {
  /**
   * The maximum number of items to return per page.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsReservationsPatch.
 */
export interface ProjectsLocationsReservationsPatchOptions {
  /**
   * Standard field mask for the set of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsReservationsPatchOptions(data: any): ProjectsLocationsReservationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsReservationsPatchOptions(data: any): ProjectsLocationsReservationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsSearchAllAssignments.
 */
export interface ProjectsLocationsSearchAllAssignmentsOptions {
  /**
   * The maximum number of items to return per page.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
  /**
   * Please specify resource name as assignee in the query. Examples: *
   * `assignee=projects/myproject` * `assignee=folders/123` *
   * `assignee=organizations/456`
   */
  query?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsSearchAssignments.
 */
export interface ProjectsLocationsSearchAssignmentsOptions {
  /**
   * The maximum number of items to return per page.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
  /**
   * Please specify resource name as assignee in the query. Examples: *
   * `assignee=projects/myproject` * `assignee=folders/123` *
   * `assignee=organizations/456`
   */
  query?: string;
}

/**
 * Additional options for
 * BigQueryReservation#projectsLocationsUpdateBiReservation.
 */
export interface ProjectsLocationsUpdateBiReservationOptions {
  /**
   * A list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsUpdateBiReservationOptions(data: any): ProjectsLocationsUpdateBiReservationOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsUpdateBiReservationOptions(data: any): ProjectsLocationsUpdateBiReservationOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A reservation is a mechanism used to guarantee slots to users.
 */
export interface Reservation {
  /**
   * The configuration parameters for the auto scaling feature. Note this is an
   * alpha feature.
   */
  autoscale?: Autoscale;
  /**
   * Job concurrency target which sets a soft upper bound on the number of jobs
   * that can run concurrently in this reservation. This is a soft target due to
   * asynchronous nature of the system and various optimizations for small
   * queries. Default value is 0 which means that concurrency target will be
   * automatically computed by the system. NOTE: this field is exposed as
   * `target_job_concurrency` in the Information Schema, DDL and BQ CLI.
   */
  concurrency?: bigint;
  /**
   * Output only. Creation time of the reservation.
   */
  readonly creationTime?: Date;
  /**
   * Do not use.
   */
  edition?:  | "EDITION_UNSPECIFIED" | "ENTERPRISE";
  /**
   * If false, any query or pipeline job using this reservation will use idle
   * slots from other reservations within the same admin project. If true, a
   * query or pipeline job using this reservation will execute with the slot
   * capacity specified in the slot_capacity field at most.
   */
  ignoreIdleSlots?: boolean;
  /**
   * Applicable only for reservations located within one of the BigQuery
   * multi-regions (US or EU). If set to true, this reservation is placed in the
   * organization's secondary region which is designated for disaster recovery
   * purposes. If false, this reservation is placed in the organization's
   * default region.
   */
  multiRegionAuxiliary?: boolean;
  /**
   * The resource name of the reservation, e.g.,
   * `projects/*\/locations/*\/reservations/team1-prod`. The reservation_id must
   * only contain lower case alphanumeric characters or dashes. It must start
   * with a letter and must not end with a dash. Its maximum length is 64
   * characters.
   */
  name?: string;
  /**
   * Minimum slots available to this reservation. A slot is a unit of
   * computational power in BigQuery, and serves as the unit of parallelism.
   * Queries using this reservation might use more slots during runtime if
   * ignore_idle_slots is set to false. If total slot_capacity of the
   * reservation and its siblings exceeds the total slot_count of all capacity
   * commitments, the request will fail with
   * `google.rpc.Code.RESOURCE_EXHAUSTED`. NOTE: for reservations in US or EU
   * multi-regions, slot capacity constraints are checked separately for default
   * and auxiliary regions. See multi_region_auxiliary flag for more details.
   */
  slotCapacity?: bigint;
  /**
   * Output only. Last update time of the reservation.
   */
  readonly updateTime?: Date;
}

function serializeReservation(data: any): Reservation {
  return {
    ...data,
    autoscale: data["autoscale"] !== undefined ? serializeAutoscale(data["autoscale"]) : undefined,
    concurrency: data["concurrency"] !== undefined ? String(data["concurrency"]) : undefined,
    slotCapacity: data["slotCapacity"] !== undefined ? String(data["slotCapacity"]) : undefined,
  };
}

function deserializeReservation(data: any): Reservation {
  return {
    ...data,
    autoscale: data["autoscale"] !== undefined ? deserializeAutoscale(data["autoscale"]) : undefined,
    concurrency: data["concurrency"] !== undefined ? BigInt(data["concurrency"]) : undefined,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    slotCapacity: data["slotCapacity"] !== undefined ? BigInt(data["slotCapacity"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The response for ReservationService.SearchAllAssignments.
 */
export interface SearchAllAssignmentsResponse {
  /**
   * List of assignments visible to the user.
   */
  assignments?: Assignment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response for ReservationService.SearchAssignments.
 */
export interface SearchAssignmentsResponse {
  /**
   * List of assignments visible to the user.
   */
  assignments?: Assignment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The request for ReservationService.SplitCapacityCommitment.
 */
export interface SplitCapacityCommitmentRequest {
  /**
   * Number of slots in the capacity commitment after the split.
   */
  slotCount?: bigint;
}

function serializeSplitCapacityCommitmentRequest(data: any): SplitCapacityCommitmentRequest {
  return {
    ...data,
    slotCount: data["slotCount"] !== undefined ? String(data["slotCount"]) : undefined,
  };
}

function deserializeSplitCapacityCommitmentRequest(data: any): SplitCapacityCommitmentRequest {
  return {
    ...data,
    slotCount: data["slotCount"] !== undefined ? BigInt(data["slotCount"]) : undefined,
  };
}

/**
 * The response for ReservationService.SplitCapacityCommitment.
 */
export interface SplitCapacityCommitmentResponse {
  /**
   * First capacity commitment, result of a split.
   */
  first?: CapacityCommitment;
  /**
   * Second capacity commitment, result of a split.
   */
  second?: CapacityCommitment;
}

function serializeSplitCapacityCommitmentResponse(data: any): SplitCapacityCommitmentResponse {
  return {
    ...data,
    first: data["first"] !== undefined ? serializeCapacityCommitment(data["first"]) : undefined,
    second: data["second"] !== undefined ? serializeCapacityCommitment(data["second"]) : undefined,
  };
}

function deserializeSplitCapacityCommitmentResponse(data: any): SplitCapacityCommitmentResponse {
  return {
    ...data,
    first: data["first"] !== undefined ? deserializeCapacityCommitment(data["first"]) : undefined,
    second: data["second"] !== undefined ? deserializeCapacityCommitment(data["second"]) : undefined,
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
 * Fully qualified reference to BigQuery table. Internally stored as
 * google.cloud.bi.v1.BqTableReference.
 */
export interface TableReference {
  /**
   * The ID of the dataset in the above project.
   */
  datasetId?: string;
  /**
   * The assigned project ID of the project.
   */
  projectId?: string;
  /**
   * The ID of the table in the above dataset.
   */
  tableId?: string;
}