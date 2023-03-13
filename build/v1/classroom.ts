// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Classroom API Client for Deno
 * ====================================
 * 
 * Manages classes, rosters, and invitations in Google Classroom.
 * 
 * Docs: https://developers.google.com/classroom/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages classes, rosters, and invitations in Google Classroom.
 */
export class Classroom {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://classroom.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates an alias for a course. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * create the alias or for access errors. * `NOT_FOUND` if the course does not
   * exist. * `ALREADY_EXISTS` if the alias already exists. *
   * `FAILED_PRECONDITION` if the alias requested does not make sense for the
   * requesting user or course (for example, if a user not in a domain attempts
   * to access a domain-scoped alias).
   *
   * @param courseId Identifier of the course to alias. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesAliasesCreate(courseId: string, req: CourseAlias): Promise<CourseAlias> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/aliases`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CourseAlias;
  }

  /**
   * Deletes an alias of a course. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * remove the alias or for access errors. * `NOT_FOUND` if the alias does not
   * exist. * `FAILED_PRECONDITION` if the alias requested does not make sense
   * for the requesting user or course (for example, if a user not in a domain
   * attempts to delete a domain-scoped alias).
   *
   * @param alias Alias to delete. This may not be the Classroom-assigned identifier.
   * @param courseId Identifier of the course whose alias should be deleted. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesAliasesDelete(alias: string, courseId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/aliases/${ alias }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a list of aliases for a course. This method returns the following
   * error codes: * `PERMISSION_DENIED` if the requesting user is not permitted
   * to access the course or for access errors. * `NOT_FOUND` if the course does
   * not exist.
   *
   * @param courseId The identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesAliasesList(courseId: string, opts: CoursesAliasesListOptions = {}): Promise<ListCourseAliasesResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/aliases`);
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
    return data as ListCourseAliasesResponse;
  }

  /**
   * Creates an announcement. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course, create announcements in the requested course, share a
   * Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request
   * is malformed. * `NOT_FOUND` if the requested course does not exist. *
   * `FAILED_PRECONDITION` for the following request error: *
   * AttachmentNotVisible
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesAnnouncementsCreate(courseId: string, req: Announcement): Promise<Announcement> {
    req = serializeAnnouncement(req);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/announcements`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAnnouncement(data);
  }

  /**
   * Deletes an announcement. This request must be made by the Developer
   * Console project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding announcement item. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting developer project did not
   * create the corresponding announcement, if the requesting user is not
   * permitted to delete the requested course or for access errors. *
   * `FAILED_PRECONDITION` if the requested announcement has already been
   * deleted. * `NOT_FOUND` if no course exists with the requested ID.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the announcement to delete. This identifier is a Classroom-assigned identifier.
   */
  async coursesAnnouncementsDelete(courseId: string, id: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/announcements/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns an announcement. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course or announcement, or for access errors. *
   * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the
   * requested course or announcement does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the announcement.
   */
  async coursesAnnouncementsGet(courseId: string, id: string): Promise<Announcement> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/announcements/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAnnouncement(data);
  }

  /**
   * Returns a list of announcements that the requester is permitted to view.
   * Course students may only view `PUBLISHED` announcements. Course teachers
   * and domain administrators may view all announcements. This method returns
   * the following error codes: * `PERMISSION_DENIED` if the requesting user is
   * not permitted to access the requested course or for access errors. *
   * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the
   * requested course does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesAnnouncementsList(courseId: string, opts: CoursesAnnouncementsListOptions = {}): Promise<ListAnnouncementsResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/announcements`);
    if (opts.announcementStates !== undefined) {
      url.searchParams.append("announcementStates", String(opts.announcementStates));
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
    return deserializeListAnnouncementsResponse(data);
  }

  /**
   * Modifies assignee mode and options of an announcement. Only a teacher of
   * the course that contains the announcement may call this method. This method
   * returns the following error codes: * `PERMISSION_DENIED` if the requesting
   * user is not permitted to access the requested course or course work or for
   * access errors. * `INVALID_ARGUMENT` if the request is malformed. *
   * `NOT_FOUND` if the requested course or course work does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the announcement.
   */
  async coursesAnnouncementsModifyAssignees(courseId: string, id: string, req: ModifyAnnouncementAssigneesRequest): Promise<Announcement> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/announcements/${ id }:modifyAssignees`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAnnouncement(data);
  }

  /**
   * Updates one or more fields of an announcement. This method returns the
   * following error codes: * `PERMISSION_DENIED` if the requesting developer
   * project did not create the corresponding announcement or for access errors.
   * * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION`
   * if the requested announcement has already been deleted. * `NOT_FOUND` if
   * the requested course or announcement does not exist
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the announcement.
   */
  async coursesAnnouncementsPatch(courseId: string, id: string, req: Announcement, opts: CoursesAnnouncementsPatchOptions = {}): Promise<Announcement> {
    req = serializeAnnouncement(req);
    opts = serializeCoursesAnnouncementsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/announcements/${ id }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeAnnouncement(data);
  }

  /**
   * Creates course work. The resulting course work (and corresponding student
   * submissions) are associated with the Developer Console project of the
   * [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to
   * make the request. Classroom API requests to modify course work and student
   * submissions must be made with an OAuth client ID from the associated
   * Developer Console project. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course, create course work in the requested course, share a Drive
   * attachment, or for access errors. * `INVALID_ARGUMENT` if the request is
   * malformed. * `NOT_FOUND` if the requested course does not exist. *
   * `FAILED_PRECONDITION` for the following request error: *
   * AttachmentNotVisible
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesCourseWorkCreate(courseId: string, req: CourseWork): Promise<CourseWork> {
    req = serializeCourseWork(req);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCourseWork(data);
  }

  /**
   * Deletes a course work. This request must be made by the Developer Console
   * project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding course work item. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting developer project did not
   * create the corresponding course work, if the requesting user is not
   * permitted to delete the requested course or for access errors. *
   * `FAILED_PRECONDITION` if the requested course work has already been
   * deleted. * `NOT_FOUND` if no course exists with the requested ID.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the course work to delete. This identifier is a Classroom-assigned identifier.
   */
  async coursesCourseWorkDelete(courseId: string, id: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns course work. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course or course work, or for access errors. * `INVALID_ARGUMENT`
   * if the request is malformed. * `NOT_FOUND` if the requested course or
   * course work does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the course work.
   */
  async coursesCourseWorkGet(courseId: string, id: string): Promise<CourseWork> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCourseWork(data);
  }

  /**
   * Returns a list of course work that the requester is permitted to view.
   * Course students may only view `PUBLISHED` course work. Course teachers and
   * domain administrators may view all course work. This method returns the
   * following error codes: * `PERMISSION_DENIED` if the requesting user is not
   * permitted to access the requested course or for access errors. *
   * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the
   * requested course does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesCourseWorkList(courseId: string, opts: CoursesCourseWorkListOptions = {}): Promise<ListCourseWorkResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork`);
    if (opts.courseWorkStates !== undefined) {
      url.searchParams.append("courseWorkStates", String(opts.courseWorkStates));
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
    return deserializeListCourseWorkResponse(data);
  }

  /**
   * Creates a course work material. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * access the requested course, create course work material in the requested
   * course, share a Drive attachment, or for access errors. *
   * `INVALID_ARGUMENT` if the request is malformed or if more than 20 *
   * materials are provided. * `NOT_FOUND` if the requested course does not
   * exist. * `FAILED_PRECONDITION` for the following request error: *
   * AttachmentNotVisible
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesCourseWorkMaterialsCreate(courseId: string, req: CourseWorkMaterial): Promise<CourseWorkMaterial> {
    req = serializeCourseWorkMaterial(req);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWorkMaterials`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCourseWorkMaterial(data);
  }

  /**
   * Deletes a course work material. This request must be made by the Developer
   * Console project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding course work material item. This method returns the following
   * error codes: * `PERMISSION_DENIED` if the requesting developer project did
   * not create the corresponding course work material, if the requesting user
   * is not permitted to delete the requested course or for access errors. *
   * `FAILED_PRECONDITION` if the requested course work material has already
   * been deleted. * `NOT_FOUND` if no course exists with the requested ID.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the course work material to delete. This identifier is a Classroom-assigned identifier.
   */
  async coursesCourseWorkMaterialsDelete(courseId: string, id: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWorkMaterials/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a course work material. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * access the requested course or course work material, or for access errors.
   * * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the
   * requested course or course work material does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the course work material.
   */
  async coursesCourseWorkMaterialsGet(courseId: string, id: string): Promise<CourseWorkMaterial> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWorkMaterials/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCourseWorkMaterial(data);
  }

  /**
   * Returns a list of course work material that the requester is permitted to
   * view. Course students may only view `PUBLISHED` course work material.
   * Course teachers and domain administrators may view all course work
   * material. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course or for access errors. * `INVALID_ARGUMENT` if the request
   * is malformed. * `NOT_FOUND` if the requested course does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesCourseWorkMaterialsList(courseId: string, opts: CoursesCourseWorkMaterialsListOptions = {}): Promise<ListCourseWorkMaterialResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWorkMaterials`);
    if (opts.courseWorkMaterialStates !== undefined) {
      url.searchParams.append("courseWorkMaterialStates", String(opts.courseWorkMaterialStates));
    }
    if (opts.materialDriveId !== undefined) {
      url.searchParams.append("materialDriveId", String(opts.materialDriveId));
    }
    if (opts.materialLink !== undefined) {
      url.searchParams.append("materialLink", String(opts.materialLink));
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
    return deserializeListCourseWorkMaterialResponse(data);
  }

  /**
   * Updates one or more fields of a course work material. This method returns
   * the following error codes: * `PERMISSION_DENIED` if the requesting
   * developer project for access errors. * `INVALID_ARGUMENT` if the request is
   * malformed. * `FAILED_PRECONDITION` if the requested course work material
   * has already been deleted. * `NOT_FOUND` if the requested course or course
   * work material does not exist
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the course work material.
   */
  async coursesCourseWorkMaterialsPatch(courseId: string, id: string, req: CourseWorkMaterial, opts: CoursesCourseWorkMaterialsPatchOptions = {}): Promise<CourseWorkMaterial> {
    req = serializeCourseWorkMaterial(req);
    opts = serializeCoursesCourseWorkMaterialsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWorkMaterials/${ id }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCourseWorkMaterial(data);
  }

  /**
   * Modifies assignee mode and options of a coursework. Only a teacher of the
   * course that contains the coursework may call this method. This method
   * returns the following error codes: * `PERMISSION_DENIED` if the requesting
   * user is not permitted to access the requested course or course work or for
   * access errors. * `INVALID_ARGUMENT` if the request is malformed. *
   * `NOT_FOUND` if the requested course or course work does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the coursework.
   */
  async coursesCourseWorkModifyAssignees(courseId: string, id: string, req: ModifyCourseWorkAssigneesRequest): Promise<CourseWork> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ id }:modifyAssignees`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCourseWork(data);
  }

  /**
   * Updates one or more fields of a course work. See
   * google.classroom.v1.CourseWork for details of which fields may be updated
   * and who may change them. This request must be made by the Developer Console
   * project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding course work item. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting developer project did not
   * create the corresponding course work, if the user is not permitted to make
   * the requested modification to the student submission, or for access errors.
   * * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION`
   * if the requested course work has already been deleted. * `NOT_FOUND` if the
   * requested course, course work, or student submission does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the course work.
   */
  async coursesCourseWorkPatch(courseId: string, id: string, req: CourseWork, opts: CoursesCourseWorkPatchOptions = {}): Promise<CourseWork> {
    req = serializeCourseWork(req);
    opts = serializeCoursesCourseWorkPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ id }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCourseWork(data);
  }

  /**
   * Returns a student submission. * `PERMISSION_DENIED` if the requesting user
   * is not permitted to access the requested course, course work, or student
   * submission or for access errors. * `INVALID_ARGUMENT` if the request is
   * malformed. * `NOT_FOUND` if the requested course, course work, or student
   * submission does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param courseWorkId Identifier of the course work.
   * @param id Identifier of the student submission.
   */
  async coursesCourseWorkStudentSubmissionsGet(courseId: string, courseWorkId: string, id: string): Promise<StudentSubmission> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ courseWorkId }/studentSubmissions/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeStudentSubmission(data);
  }

  /**
   * Returns a list of student submissions that the requester is permitted to
   * view, factoring in the OAuth scopes of the request. `-` may be specified as
   * the `course_work_id` to include student submissions for multiple course
   * work items. Course students may only view their own work. Course teachers
   * and domain administrators may view all student submissions. This method
   * returns the following error codes: * `PERMISSION_DENIED` if the requesting
   * user is not permitted to access the requested course or course work, or for
   * access errors. * `INVALID_ARGUMENT` if the request is malformed. *
   * `NOT_FOUND` if the requested course does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param courseWorkId Identifier of the student work to request. This may be set to the string literal `"-"` to request student work for all course work in the specified course.
   */
  async coursesCourseWorkStudentSubmissionsList(courseId: string, courseWorkId: string, opts: CoursesCourseWorkStudentSubmissionsListOptions = {}): Promise<ListStudentSubmissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ courseWorkId }/studentSubmissions`);
    if (opts.late !== undefined) {
      url.searchParams.append("late", String(opts.late));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.states !== undefined) {
      url.searchParams.append("states", String(opts.states));
    }
    if (opts.userId !== undefined) {
      url.searchParams.append("userId", String(opts.userId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListStudentSubmissionsResponse(data);
  }

  /**
   * Modifies attachments of student submission. Attachments may only be added
   * to student submissions belonging to course work objects with a `workType`
   * of `ASSIGNMENT`. This request must be made by the Developer Console project
   * of the [OAuth client ID](https://support.google.com/cloud/answer/6158849)
   * used to create the corresponding course work item. This method returns the
   * following error codes: * `PERMISSION_DENIED` if the requesting user is not
   * permitted to access the requested course or course work, if the user is not
   * permitted to modify attachments on the requested student submission, or for
   * access errors. * `INVALID_ARGUMENT` if the request is malformed. *
   * `NOT_FOUND` if the requested course, course work, or student submission
   * does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param courseWorkId Identifier of the course work.
   * @param id Identifier of the student submission.
   */
  async coursesCourseWorkStudentSubmissionsModifyAttachments(courseId: string, courseWorkId: string, id: string, req: ModifyAttachmentsRequest): Promise<StudentSubmission> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ courseWorkId }/studentSubmissions/${ id }:modifyAttachments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeStudentSubmission(data);
  }

  /**
   * Updates one or more fields of a student submission. See
   * google.classroom.v1.StudentSubmission for details of which fields may be
   * updated and who may change them. This request must be made by the Developer
   * Console project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding course work item. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting developer project did not
   * create the corresponding course work, if the user is not permitted to make
   * the requested modification to the student submission, or for access errors.
   * * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the
   * requested course, course work, or student submission does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param courseWorkId Identifier of the course work.
   * @param id Identifier of the student submission.
   */
  async coursesCourseWorkStudentSubmissionsPatch(courseId: string, courseWorkId: string, id: string, req: StudentSubmission, opts: CoursesCourseWorkStudentSubmissionsPatchOptions = {}): Promise<StudentSubmission> {
    req = serializeStudentSubmission(req);
    opts = serializeCoursesCourseWorkStudentSubmissionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ courseWorkId }/studentSubmissions/${ id }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeStudentSubmission(data);
  }

  /**
   * Reclaims a student submission on behalf of the student that owns it.
   * Reclaiming a student submission transfers ownership of attached Drive files
   * to the student and updates the submission state. Only the student that owns
   * the requested student submission may call this method, and only for a
   * student submission that has been turned in. This request must be made by
   * the Developer Console project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding course work item. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * access the requested course or course work, unsubmit the requested student
   * submission, or for access errors. * `FAILED_PRECONDITION` if the student
   * submission has not been turned in. * `INVALID_ARGUMENT` if the request is
   * malformed. * `NOT_FOUND` if the requested course, course work, or student
   * submission does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param courseWorkId Identifier of the course work.
   * @param id Identifier of the student submission.
   */
  async coursesCourseWorkStudentSubmissionsReclaim(courseId: string, courseWorkId: string, id: string, req: ReclaimStudentSubmissionRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ courseWorkId }/studentSubmissions/${ id }:reclaim`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Returns a student submission. Returning a student submission transfers
   * ownership of attached Drive files to the student and may also update the
   * submission state. Unlike the Classroom application, returning a student
   * submission does not set assignedGrade to the draftGrade value. Only a
   * teacher of the course that contains the requested student submission may
   * call this method. This request must be made by the Developer Console
   * project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding course work item. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * access the requested course or course work, return the requested student
   * submission, or for access errors. * `INVALID_ARGUMENT` if the request is
   * malformed. * `NOT_FOUND` if the requested course, course work, or student
   * submission does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param courseWorkId Identifier of the course work.
   * @param id Identifier of the student submission.
   */
  async coursesCourseWorkStudentSubmissionsReturn(courseId: string, courseWorkId: string, id: string, req: ReturnStudentSubmissionRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ courseWorkId }/studentSubmissions/${ id }:return`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Turns in a student submission. Turning in a student submission transfers
   * ownership of attached Drive files to the teacher and may also update the
   * submission state. This may only be called by the student that owns the
   * specified student submission. This request must be made by the Developer
   * Console project of the [OAuth client
   * ID](https://support.google.com/cloud/answer/6158849) used to create the
   * corresponding course work item. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * access the requested course or course work, turn in the requested student
   * submission, or for access errors. * `INVALID_ARGUMENT` if the request is
   * malformed. * `NOT_FOUND` if the requested course, course work, or student
   * submission does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param courseWorkId Identifier of the course work.
   * @param id Identifier of the student submission.
   */
  async coursesCourseWorkStudentSubmissionsTurnIn(courseId: string, courseWorkId: string, id: string, req: TurnInStudentSubmissionRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/courseWork/${ courseWorkId }/studentSubmissions/${ id }:turnIn`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Creates a course. The user specified in `ownerId` is the owner of the
   * created course and added as a teacher. A non-admin requesting user can only
   * create a course with themselves as the owner. Domain admins can create
   * courses owned by any user within their domain. This method returns the
   * following error codes: * `PERMISSION_DENIED` if the requesting user is not
   * permitted to create courses or for access errors. * `NOT_FOUND` if the
   * primary teacher is not a valid user. * `FAILED_PRECONDITION` if the course
   * owner's account is disabled or for the following request errors: *
   * UserCannotOwnCourse * UserGroupsMembershipLimitReached * `ALREADY_EXISTS`
   * if an alias was specified in the `id` and already exists.
   *
   */
  async coursesCreate(req: Course): Promise<Course> {
    req = serializeCourse(req);
    const url = new URL(`${this.#baseUrl}v1/courses`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCourse(data);
  }

  /**
   * Deletes a course. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to delete the
   * requested course or for access errors. * `NOT_FOUND` if no course exists
   * with the requested ID.
   *
   * @param id Identifier of the course to delete. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesDelete(id: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a course. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course or for access errors. * `NOT_FOUND` if no course exists
   * with the requested ID.
   *
   * @param id Identifier of the course to return. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesGet(id: string): Promise<Course> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCourse(data);
  }

  /**
   * Returns a list of courses that the requesting user is permitted to view,
   * restricted to those that match the request. Returned courses are ordered by
   * creation time, with the most recently created coming first. This method
   * returns the following error codes: * `PERMISSION_DENIED` for access errors.
   * * `INVALID_ARGUMENT` if the query argument is malformed. * `NOT_FOUND` if
   * any users specified in the query arguments do not exist.
   *
   */
  async coursesList(opts: CoursesListOptions = {}): Promise<ListCoursesResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses`);
    if (opts.courseStates !== undefined) {
      url.searchParams.append("courseStates", String(opts.courseStates));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.studentId !== undefined) {
      url.searchParams.append("studentId", String(opts.studentId));
    }
    if (opts.teacherId !== undefined) {
      url.searchParams.append("teacherId", String(opts.teacherId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListCoursesResponse(data);
  }

  /**
   * Updates one or more fields in a course. This method returns the following
   * error codes: * `PERMISSION_DENIED` if the requesting user is not permitted
   * to modify the requested course or for access errors. * `NOT_FOUND` if no
   * course exists with the requested ID. * `INVALID_ARGUMENT` if invalid fields
   * are specified in the update mask or if no update mask is supplied. *
   * `FAILED_PRECONDITION` for the following request errors: *
   * CourseNotModifiable * InactiveCourseOwner * IneligibleOwner
   *
   * @param id Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesPatch(id: string, req: Course, opts: CoursesPatchOptions = {}): Promise<Course> {
    req = serializeCourse(req);
    opts = serializeCoursesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/courses/${ id }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeCourse(data);
  }

  /**
   * Adds a user as a student of a course. Domain administrators are permitted
   * to [directly
   * add](https://developers.google.com/classroom/guides/manage-users) users
   * within their domain as students to courses within their domain. Students
   * are permitted to add themselves to a course using an enrollment code. This
   * method returns the following error codes: * `PERMISSION_DENIED` if the
   * requesting user is not permitted to create students in this course or for
   * access errors. * `NOT_FOUND` if the requested course ID does not exist. *
   * `FAILED_PRECONDITION` if the requested user's account is disabled, for the
   * following request errors: * CourseMemberLimitReached * CourseNotModifiable
   * * UserGroupsMembershipLimitReached * InactiveCourseOwner * `ALREADY_EXISTS`
   * if the user is already a student or teacher in the course.
   *
   * @param courseId Identifier of the course to create the student in. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesStudentsCreate(courseId: string, req: Student, opts: CoursesStudentsCreateOptions = {}): Promise<Student> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/students`);
    if (opts.enrollmentCode !== undefined) {
      url.searchParams.append("enrollmentCode", String(opts.enrollmentCode));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Student;
  }

  /**
   * Deletes a student of a course. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * delete students of this course or for access errors. * `NOT_FOUND` if no
   * student of this course has the requested ID or if the course does not
   * exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param userId Identifier of the student to delete. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
   */
  async coursesStudentsDelete(courseId: string, userId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/students/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a student of a course. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * view students of this course or for access errors. * `NOT_FOUND` if no
   * student of this course has the requested ID or if the course does not
   * exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param userId Identifier of the student to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
   */
  async coursesStudentsGet(courseId: string, userId: string): Promise<Student> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/students/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Student;
  }

  /**
   * Returns a list of students of this course that the requester is permitted
   * to view. This method returns the following error codes: * `NOT_FOUND` if
   * the course does not exist. * `PERMISSION_DENIED` for access errors.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesStudentsList(courseId: string, opts: CoursesStudentsListOptions = {}): Promise<ListStudentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/students`);
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
    return data as ListStudentsResponse;
  }

  /**
   * Creates a teacher of a course. Domain administrators are permitted to
   * [directly add](https://developers.google.com/classroom/guides/manage-users)
   * users within their domain as teachers to courses within their domain.
   * Non-admin users should send an Invitation instead. This method returns the
   * following error codes: * `PERMISSION_DENIED` if the requesting user is not
   * permitted to create teachers in this course or for access errors. *
   * `NOT_FOUND` if the requested course ID does not exist. *
   * `FAILED_PRECONDITION` if the requested user's account is disabled, for the
   * following request errors: * CourseMemberLimitReached * CourseNotModifiable
   * * CourseTeacherLimitReached * UserGroupsMembershipLimitReached *
   * InactiveCourseOwner * `ALREADY_EXISTS` if the user is already a teacher or
   * student in the course.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesTeachersCreate(courseId: string, req: Teacher): Promise<Teacher> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/teachers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Teacher;
  }

  /**
   * Removes the specified teacher from the specified course. This method
   * returns the following error codes: * `PERMISSION_DENIED` if the requesting
   * user is not permitted to delete teachers of this course or for access
   * errors. * `NOT_FOUND` if no teacher of this course has the requested ID or
   * if the course does not exist. * `FAILED_PRECONDITION` if the requested ID
   * belongs to the primary teacher of this course. * `FAILED_PRECONDITION` if
   * the requested ID belongs to the owner of the course Drive folder. *
   * `FAILED_PRECONDITION` if the course no longer has an active owner.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param userId Identifier of the teacher to delete. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
   */
  async coursesTeachersDelete(courseId: string, userId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/teachers/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a teacher of a course. This method returns the following error
   * codes: * `PERMISSION_DENIED` if the requesting user is not permitted to
   * view teachers of this course or for access errors. * `NOT_FOUND` if no
   * teacher of this course has the requested ID or if the course does not
   * exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param userId Identifier of the teacher to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
   */
  async coursesTeachersGet(courseId: string, userId: string): Promise<Teacher> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/teachers/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Teacher;
  }

  /**
   * Returns a list of teachers of this course that the requester is permitted
   * to view. This method returns the following error codes: * `NOT_FOUND` if
   * the course does not exist. * `PERMISSION_DENIED` for access errors.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesTeachersList(courseId: string, opts: CoursesTeachersListOptions = {}): Promise<ListTeachersResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/teachers`);
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
    return data as ListTeachersResponse;
  }

  /**
   * Creates a topic. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course, create a topic in the requested course, or for access
   * errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if
   * the requested course does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesTopicsCreate(courseId: string, req: Topic): Promise<Topic> {
    req = serializeTopic(req);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/topics`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTopic(data);
  }

  /**
   * Deletes a topic. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not allowed to delete the
   * requested topic or for access errors. * `FAILED_PRECONDITION` if the
   * requested topic has already been deleted. * `NOT_FOUND` if no course or
   * topic exists with the requested ID.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the topic to delete.
   */
  async coursesTopicsDelete(courseId: string, id: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/topics/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a topic. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access the
   * requested course or topic, or for access errors. * `INVALID_ARGUMENT` if
   * the request is malformed. * `NOT_FOUND` if the requested course or topic
   * does not exist.
   *
   * @param courseId Identifier of the course.
   * @param id Identifier of the topic.
   */
  async coursesTopicsGet(courseId: string, id: string): Promise<Topic> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/topics/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTopic(data);
  }

  /**
   * Returns the list of topics that the requester is permitted to view. This
   * method returns the following error codes: * `PERMISSION_DENIED` if the
   * requesting user is not permitted to access the requested course or for
   * access errors. * `INVALID_ARGUMENT` if the request is malformed. *
   * `NOT_FOUND` if the requested course does not exist.
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesTopicsList(courseId: string, opts: CoursesTopicsListOptions = {}): Promise<ListTopicResponse> {
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/topics`);
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
    return deserializeListTopicResponse(data);
  }

  /**
   * Updates one or more fields of a topic. This method returns the following
   * error codes: * `PERMISSION_DENIED` if the requesting developer project did
   * not create the corresponding topic or for access errors. *
   * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the
   * requested course or topic does not exist
   *
   * @param courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
   * @param id Identifier of the topic.
   */
  async coursesTopicsPatch(courseId: string, id: string, req: Topic, opts: CoursesTopicsPatchOptions = {}): Promise<Topic> {
    req = serializeTopic(req);
    opts = serializeCoursesTopicsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/courses/${ courseId }/topics/${ id }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTopic(data);
  }

  /**
   * Updates a course. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to modify the
   * requested course or for access errors. * `NOT_FOUND` if no course exists
   * with the requested ID. * `FAILED_PRECONDITION` for the following request
   * errors: * CourseNotModifiable
   *
   * @param id Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias.
   */
  async coursesUpdate(id: string, req: Course): Promise<Course> {
    req = serializeCourse(req);
    const url = new URL(`${this.#baseUrl}v1/courses/${ id }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeCourse(data);
  }

  /**
   * Accepts an invitation, removing it and adding the invited user to the
   * teachers or students (as appropriate) of the specified course. Only the
   * invited user may accept an invitation. This method returns the following
   * error codes: * `PERMISSION_DENIED` if the requesting user is not permitted
   * to accept the requested invitation or for access errors. *
   * `FAILED_PRECONDITION` for the following request errors: *
   * CourseMemberLimitReached * CourseNotModifiable * CourseTeacherLimitReached
   * * UserGroupsMembershipLimitReached * `NOT_FOUND` if no invitation exists
   * with the requested ID.
   *
   * @param id Identifier of the invitation to accept.
   */
  async invitationsAccept(id: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/invitations/${ id }:accept`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Creates an invitation. Only one invitation for a user and course may exist
   * at a time. Delete and re-create an invitation to make changes. This method
   * returns the following error codes: * `PERMISSION_DENIED` if the requesting
   * user is not permitted to create invitations for this course or for access
   * errors. * `NOT_FOUND` if the course or the user does not exist. *
   * `FAILED_PRECONDITION`: * if the requested user's account is disabled. * if
   * the user already has this role or a role with greater permissions. * for
   * the following request errors: * IneligibleOwner * `ALREADY_EXISTS` if an
   * invitation for the specified user and course already exists.
   *
   */
  async invitationsCreate(req: Invitation): Promise<Invitation> {
    const url = new URL(`${this.#baseUrl}v1/invitations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Invitation;
  }

  /**
   * Deletes an invitation. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to delete the
   * requested invitation or for access errors. * `NOT_FOUND` if no invitation
   * exists with the requested ID.
   *
   * @param id Identifier of the invitation to delete.
   */
  async invitationsDelete(id: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/invitations/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns an invitation. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to view the
   * requested invitation or for access errors. * `NOT_FOUND` if no invitation
   * exists with the requested ID.
   *
   * @param id Identifier of the invitation to return.
   */
  async invitationsGet(id: string): Promise<Invitation> {
    const url = new URL(`${this.#baseUrl}v1/invitations/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Invitation;
  }

  /**
   * Returns a list of invitations that the requesting user is permitted to
   * view, restricted to those that match the list request. *Note:* At least one
   * of `user_id` or `course_id` must be supplied. Both fields can be supplied.
   * This method returns the following error codes: * `PERMISSION_DENIED` for
   * access errors.
   *
   */
  async invitationsList(opts: InvitationsListOptions = {}): Promise<ListInvitationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/invitations`);
    if (opts.courseId !== undefined) {
      url.searchParams.append("courseId", String(opts.courseId));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.userId !== undefined) {
      url.searchParams.append("userId", String(opts.userId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListInvitationsResponse;
  }

  /**
   * Creates a `Registration`, causing Classroom to start sending notifications
   * from the provided `feed` to the destination provided in `cloudPubSubTopic`.
   * Returns the created `Registration`. Currently, this will be the same as the
   * argument, but with server-assigned fields such as `expiry_time` and `id`
   * filled in. Note that any value specified for the `expiry_time` or `id`
   * fields will be ignored. While Classroom may validate the `cloudPubSubTopic`
   * and return errors on a best effort basis, it is the caller's responsibility
   * to ensure that it exists and that Classroom has permission to publish to
   * it. This method may return the following error codes: * `PERMISSION_DENIED`
   * if: * the authenticated user does not have permission to receive
   * notifications from the requested field; or * the current user has not
   * granted access to the current Cloud project with the appropriate scope for
   * the requested feed. Note that domain-wide delegation of authority is not
   * currently supported for this purpose. If the request has the appropriate
   * scope, but no grant exists, a Request Errors is returned. * another access
   * error is encountered. * `INVALID_ARGUMENT` if: * no `cloudPubsubTopic` is
   * specified, or the specified `cloudPubsubTopic` is not valid; or * no `feed`
   * is specified, or the specified `feed` is not valid. * `NOT_FOUND` if: * the
   * specified `feed` cannot be located, or the requesting user does not have
   * permission to determine whether or not it exists; or * the specified
   * `cloudPubsubTopic` cannot be located, or Classroom has not been granted
   * permission to publish to it.
   *
   */
  async registrationsCreate(req: Registration): Promise<Registration> {
    req = serializeRegistration(req);
    const url = new URL(`${this.#baseUrl}v1/registrations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRegistration(data);
  }

  /**
   * Deletes a `Registration`, causing Classroom to stop sending notifications
   * for that `Registration`.
   *
   * @param registrationId The `registration_id` of the `Registration` to be deleted.
   */
  async registrationsDelete(registrationId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/registrations/${ registrationId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a user profile. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the requesting user is not permitted to access this
   * user profile, if no profile exists with the requested ID, or for access
   * errors.
   *
   * @param userId Identifier of the profile to return. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
   */
  async userProfilesGet(userId: string): Promise<UserProfile> {
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UserProfile;
  }

  /**
   * Creates a guardian invitation, and sends an email to the guardian asking
   * them to confirm that they are the student's guardian. Once the guardian
   * accepts the invitation, their `state` will change to `COMPLETED` and they
   * will start receiving guardian notifications. A `Guardian` resource will
   * also be created to represent the active guardian. The request object must
   * have the `student_id` and `invited_email_address` fields set. Failing to
   * set these fields, or setting any other fields in the request, will result
   * in an error. This method returns the following error codes: *
   * `PERMISSION_DENIED` if the current user does not have permission to manage
   * guardians, if the guardian in question has already rejected too many
   * requests for that student, if guardians are not enabled for the domain in
   * question, or for other access errors. * `RESOURCE_EXHAUSTED` if the student
   * or guardian has exceeded the guardian link limit. * `INVALID_ARGUMENT` if
   * the guardian email address is not valid (for example, if it is too long),
   * or if the format of the student ID provided cannot be recognized (it is not
   * an email address, nor a `user_id` from this API). This error will also be
   * returned if read-only fields are set, or if the `state` field is set to to
   * a value other than `PENDING`. * `NOT_FOUND` if the student ID provided is a
   * valid student ID, but Classroom has no record of that student. *
   * `ALREADY_EXISTS` if there is already a pending guardian invitation for the
   * student and `invited_email_address` provided, or if the provided
   * `invited_email_address` matches the Google account of an existing
   * `Guardian` for this user.
   *
   * @param studentId ID of the student (in standard format)
   */
  async userProfilesGuardianInvitationsCreate(studentId: string, req: GuardianInvitation): Promise<GuardianInvitation> {
    req = serializeGuardianInvitation(req);
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ studentId }/guardianInvitations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGuardianInvitation(data);
  }

  /**
   * Returns a specific guardian invitation. This method returns the following
   * error codes: * `PERMISSION_DENIED` if the requesting user is not permitted
   * to view guardian invitations for the student identified by the
   * `student_id`, if guardians are not enabled for the domain in question, or
   * for other access errors. * `INVALID_ARGUMENT` if a `student_id` is
   * specified, but its format cannot be recognized (it is not an email address,
   * nor a `student_id` from the API, nor the literal string `me`). *
   * `NOT_FOUND` if Classroom cannot find any record of the given student or
   * `invitation_id`. May also be returned if the student exists, but the
   * requesting user does not have access to see that student.
   *
   * @param invitationId The `id` field of the `GuardianInvitation` being requested.
   * @param studentId The ID of the student whose guardian invitation is being requested.
   */
  async userProfilesGuardianInvitationsGet(invitationId: string, studentId: string): Promise<GuardianInvitation> {
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ studentId }/guardianInvitations/${ invitationId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGuardianInvitation(data);
  }

  /**
   * Returns a list of guardian invitations that the requesting user is
   * permitted to view, filtered by the parameters provided. This method returns
   * the following error codes: * `PERMISSION_DENIED` if a `student_id` is
   * specified, and the requesting user is not permitted to view guardian
   * invitations for that student, if `"-"` is specified as the `student_id` and
   * the user is not a domain administrator, if guardians are not enabled for
   * the domain in question, or for other access errors. * `INVALID_ARGUMENT` if
   * a `student_id` is specified, but its format cannot be recognized (it is not
   * an email address, nor a `student_id` from the API, nor the literal string
   * `me`). May also be returned if an invalid `page_token` or `state` is
   * provided. * `NOT_FOUND` if a `student_id` is specified, and its format can
   * be recognized, but Classroom has no record of that student.
   *
   * @param studentId The ID of the student whose guardian invitations are to be returned. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for all students that the requesting user is permitted to view guardian invitations.
   */
  async userProfilesGuardianInvitationsList(studentId: string, opts: UserProfilesGuardianInvitationsListOptions = {}): Promise<ListGuardianInvitationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ studentId }/guardianInvitations`);
    if (opts.invitedEmailAddress !== undefined) {
      url.searchParams.append("invitedEmailAddress", String(opts.invitedEmailAddress));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.states !== undefined) {
      url.searchParams.append("states", String(opts.states));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListGuardianInvitationsResponse(data);
  }

  /**
   * Modifies a guardian invitation. Currently, the only valid modification is
   * to change the `state` from `PENDING` to `COMPLETE`. This has the effect of
   * withdrawing the invitation. This method returns the following error codes:
   * * `PERMISSION_DENIED` if the current user does not have permission to
   * manage guardians, if guardians are not enabled for the domain in question
   * or for other access errors. * `FAILED_PRECONDITION` if the guardian link is
   * not in the `PENDING` state. * `INVALID_ARGUMENT` if the format of the
   * student ID provided cannot be recognized (it is not an email address, nor a
   * `user_id` from this API), or if the passed `GuardianInvitation` has a
   * `state` other than `COMPLETE`, or if it modifies fields other than `state`.
   * * `NOT_FOUND` if the student ID provided is a valid student ID, but
   * Classroom has no record of that student, or if the `id` field does not
   * refer to a guardian invitation known to Classroom.
   *
   * @param invitationId The `id` field of the `GuardianInvitation` to be modified.
   * @param studentId The ID of the student whose guardian invitation is to be modified.
   */
  async userProfilesGuardianInvitationsPatch(invitationId: string, studentId: string, req: GuardianInvitation, opts: UserProfilesGuardianInvitationsPatchOptions = {}): Promise<GuardianInvitation> {
    req = serializeGuardianInvitation(req);
    opts = serializeUserProfilesGuardianInvitationsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ studentId }/guardianInvitations/${ invitationId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGuardianInvitation(data);
  }

  /**
   * Deletes a guardian. The guardian will no longer receive guardian
   * notifications and the guardian will no longer be accessible via the API.
   * This method returns the following error codes: * `PERMISSION_DENIED` if no
   * user that matches the provided `student_id` is visible to the requesting
   * user, if the requesting user is not permitted to manage guardians for the
   * student identified by the `student_id`, if guardians are not enabled for
   * the domain in question, or for other access errors. * `INVALID_ARGUMENT` if
   * a `student_id` is specified, but its format cannot be recognized (it is not
   * an email address, nor a `student_id` from the API). * `NOT_FOUND` if the
   * requesting user is permitted to modify guardians for the requested
   * `student_id`, but no `Guardian` record exists for that student with the
   * provided `guardian_id`.
   *
   * @param guardianId The `id` field from a `Guardian`.
   * @param studentId The student whose guardian is to be deleted. One of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
   */
  async userProfilesGuardiansDelete(guardianId: string, studentId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ studentId }/guardians/${ guardianId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a specific guardian. This method returns the following error
   * codes: * `PERMISSION_DENIED` if no user that matches the provided
   * `student_id` is visible to the requesting user, if the requesting user is
   * not permitted to view guardian information for the student identified by
   * the `student_id`, if guardians are not enabled for the domain in question,
   * or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is
   * specified, but its format cannot be recognized (it is not an email address,
   * nor a `student_id` from the API, nor the literal string `me`). *
   * `NOT_FOUND` if the requesting user is permitted to view guardians for the
   * requested `student_id`, but no `Guardian` record exists for that student
   * that matches the provided `guardian_id`.
   *
   * @param guardianId The `id` field from a `Guardian`.
   * @param studentId The student whose guardian is being requested. One of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
   */
  async userProfilesGuardiansGet(guardianId: string, studentId: string): Promise<Guardian> {
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ studentId }/guardians/${ guardianId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Guardian;
  }

  /**
   * Returns a list of guardians that the requesting user is permitted to view,
   * restricted to those that match the request. To list guardians for any
   * student that the requesting user may view guardians for, use the literal
   * character `-` for the student ID. This method returns the following error
   * codes: * `PERMISSION_DENIED` if a `student_id` is specified, and the
   * requesting user is not permitted to view guardian information for that
   * student, if `"-"` is specified as the `student_id` and the user is not a
   * domain administrator, if guardians are not enabled for the domain in
   * question, if the `invited_email_address` filter is set by a user who is not
   * a domain administrator, or for other access errors. * `INVALID_ARGUMENT` if
   * a `student_id` is specified, but its format cannot be recognized (it is not
   * an email address, nor a `student_id` from the API, nor the literal string
   * `me`). May also be returned if an invalid `page_token` is provided. *
   * `NOT_FOUND` if a `student_id` is specified, and its format can be
   * recognized, but Classroom has no record of that student.
   *
   * @param studentId Filter results by the student who the guardian is linked to. The identifier can be one of the following: * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for all students that the requesting user has access to view.
   */
  async userProfilesGuardiansList(studentId: string, opts: UserProfilesGuardiansListOptions = {}): Promise<ListGuardiansResponse> {
    const url = new URL(`${this.#baseUrl}v1/userProfiles/${ studentId }/guardians`);
    if (opts.invitedEmailAddress !== undefined) {
      url.searchParams.append("invitedEmailAddress", String(opts.invitedEmailAddress));
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
    return data as ListGuardiansResponse;
  }
}

/**
 * Announcement created by a teacher for students of the course
 */
export interface Announcement {
  /**
   * Absolute link to this announcement in the Classroom web UI. This is only
   * populated if `state` is `PUBLISHED`. Read-only.
   */
  alternateLink?: string;
  /**
   * Assignee mode of the announcement. If unspecified, the default value is
   * `ALL_STUDENTS`.
   */
  assigneeMode?:  | "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS";
  /**
   * Identifier of the course. Read-only.
   */
  courseId?: string;
  /**
   * Timestamp when this announcement was created. Read-only.
   */
  creationTime?: Date;
  /**
   * Identifier for the user that created the announcement. Read-only.
   */
  creatorUserId?: string;
  /**
   * Classroom-assigned identifier of this announcement, unique per course.
   * Read-only.
   */
  id?: string;
  /**
   * Identifiers of students with access to the announcement. This field is set
   * only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is
   * `INDIVIDUAL_STUDENTS`, then only students specified in this field can see
   * the announcement.
   */
  individualStudentsOptions?: IndividualStudentsOptions;
  /**
   * Additional materials. Announcements must have no more than 20 material
   * items.
   */
  materials?: Material[];
  /**
   * Optional timestamp when this announcement is scheduled to be published.
   */
  scheduledTime?: Date;
  /**
   * Status of this announcement. If unspecified, the default state is `DRAFT`.
   */
  state?:  | "ANNOUNCEMENT_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED";
  /**
   * Description of this announcement. The text must be a valid UTF-8 string
   * containing no more than 30,000 characters.
   */
  text?: string;
  /**
   * Timestamp of the most recent change to this announcement. Read-only.
   */
  updateTime?: Date;
}

function serializeAnnouncement(data: any): Announcement {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? data["scheduledTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeAnnouncement(data: any): Announcement {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? new Date(data["scheduledTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional details for assignments.
 */
export interface Assignment {
  /**
   * Drive folder where attachments from student submissions are placed. This
   * is only populated for course teachers and administrators.
   */
  studentWorkFolder?: DriveFolder;
}

/**
 * Student work for an assignment.
 */
export interface AssignmentSubmission {
  /**
   * Attachments added by the student. Drive files that correspond to materials
   * with a share mode of STUDENT_COPY may not exist yet if the student has not
   * accessed the assignment in Classroom. Some attachment metadata is only
   * populated if the requesting user has permission to access it. Identifier
   * and alternate_link fields are always available, but others (for example,
   * title) may not be.
   */
  attachments?: Attachment[];
}

/**
 * Attachment added to student assignment work. When creating attachments,
 * setting the `form` field is not supported.
 */
export interface Attachment {
  /**
   * Google Drive file attachment.
   */
  driveFile?: DriveFile;
  /**
   * Google Forms attachment.
   */
  form?: Form;
  /**
   * Link attachment.
   */
  link?: Link;
  /**
   * Youtube video attachment.
   */
  youTubeVideo?: YouTubeVideo;
}

/**
 * A reference to a Cloud Pub/Sub topic. To register for notifications, the
 * owner of the topic must grant
 * `classroom-notifications@system.gserviceaccount.com` the
 * `projects.topics.publish` permission.
 */
export interface CloudPubsubTopic {
  /**
   * The `name` field of a Cloud Pub/Sub
   * [Topic](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#Topic).
   */
  topicName?: string;
}

/**
 * A Course in Classroom.
 */
export interface Course {
  /**
   * Absolute link to this course in the Classroom web UI. Read-only.
   */
  alternateLink?: string;
  /**
   * The Calendar ID for a calendar that all course members can see, to which
   * Classroom adds events for course work and announcements in the course.
   * Read-only.
   */
  calendarId?: string;
  /**
   * The email address of a Google group containing all members of the course.
   * This group does not accept email and can only be used for permissions.
   * Read-only.
   */
  courseGroupEmail?: string;
  /**
   * Sets of materials that appear on the "about" page of this course.
   * Read-only.
   */
  courseMaterialSets?: CourseMaterialSet[];
  /**
   * State of the course. If unspecified, the default state is `PROVISIONED`.
   */
  courseState?:  | "COURSE_STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "PROVISIONED" | "DECLINED" | "SUSPENDED";
  /**
   * Creation time of the course. Specifying this field in a course update mask
   * results in an error. Read-only.
   */
  creationTime?: Date;
  /**
   * Optional description. For example, "We'll be learning about the structure
   * of living creatures from a combination of textbooks, guest lectures, and
   * lab work. Expect to be excited!" If set, this field must be a valid UTF-8
   * string and no longer than 30,000 characters.
   */
  description?: string;
  /**
   * Optional heading for the description. For example, "Welcome to 10th Grade
   * Biology." If set, this field must be a valid UTF-8 string and no longer
   * than 3600 characters.
   */
  descriptionHeading?: string;
  /**
   * Enrollment code to use when joining this course. Specifying this field in
   * a course update mask results in an error. Read-only.
   */
  enrollmentCode?: string;
  /**
   * The gradebook settings that specify how a student's overall grade for the
   * course will be calculated and who it will be displayed to. Read-only
   */
  gradebookSettings?: GradebookSettings;
  /**
   * Whether or not guardian notifications are enabled for this course.
   * Read-only.
   */
  guardiansEnabled?: boolean;
  /**
   * Identifier for this course assigned by Classroom. When creating a course,
   * you may optionally set this identifier to an alias string in the request to
   * create a corresponding alias. The `id` is still assigned by Classroom and
   * cannot be updated after the course is created. Specifying this field in a
   * course update mask results in an error.
   */
  id?: string;
  /**
   * Name of the course. For example, "10th Grade Biology". The name is
   * required. It must be between 1 and 750 characters and a valid UTF-8 string.
   */
  name?: string;
  /**
   * The identifier of the owner of a course. When specified as a parameter of
   * a create course request, this field is required. The identifier can be one
   * of the following: * the numeric identifier for the user * the email address
   * of the user * the string literal `"me"`, indicating the requesting user
   * This must be set in a create request. Admins can also specify this field in
   * a patch course request to transfer ownership. In other contexts, it is
   * read-only.
   */
  ownerId?: string;
  /**
   * Optional room location. For example, "301". If set, this field must be a
   * valid UTF-8 string and no longer than 650 characters.
   */
  room?: string;
  /**
   * Section of the course. For example, "Period 2". If set, this field must be
   * a valid UTF-8 string and no longer than 2800 characters.
   */
  section?: string;
  /**
   * Information about a Drive Folder that is shared with all teachers of the
   * course. This field will only be set for teachers of the course and domain
   * administrators. Read-only.
   */
  teacherFolder?: DriveFolder;
  /**
   * The email address of a Google group containing all teachers of the course.
   * This group does not accept email and can only be used for permissions.
   * Read-only.
   */
  teacherGroupEmail?: string;
  /**
   * Time of the most recent update to this course. Specifying this field in a
   * course update mask results in an error. Read-only.
   */
  updateTime?: Date;
}

function serializeCourse(data: any): Course {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeCourse(data: any): Course {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Alternative identifier for a course. An alias uniquely identifies a course.
 * It must be unique within one of the following scopes: * domain: A
 * domain-scoped alias is visible to all users within the alias creator's domain
 * and can be created only by a domain admin. A domain-scoped alias is often
 * used when a course has an identifier external to Classroom. * project: A
 * project-scoped alias is visible to any request from an application using the
 * Developer Console project ID that created the alias and can be created by any
 * project. A project-scoped alias is often used when an application has
 * alternative identifiers. A random value can also be used to avoid duplicate
 * courses in the event of transmission failures, as retrying a request will
 * return `ALREADY_EXISTS` if a previous one has succeeded.
 */
export interface CourseAlias {
  /**
   * Alias string. The format of the string indicates the desired alias
   * scoping. * `d:` indicates a domain-scoped alias. Example: `d:math_101` *
   * `p:` indicates a project-scoped alias. Example: `p:abc123` This field has a
   * maximum length of 256 characters.
   */
  alias?: string;
}

/**
 * A material attached to a course as part of a material set.
 */
export interface CourseMaterial {
  /**
   * Google Drive file attachment.
   */
  driveFile?: DriveFile;
  /**
   * Google Forms attachment.
   */
  form?: Form;
  /**
   * Link atatchment.
   */
  link?: Link;
  /**
   * Youtube video attachment.
   */
  youTubeVideo?: YouTubeVideo;
}

/**
 * A set of materials that appears on the "About" page of the course. These
 * materials might include a syllabus, schedule, or other background information
 * relating to the course as a whole.
 */
export interface CourseMaterialSet {
  /**
   * Materials attached to this set.
   */
  materials?: CourseMaterial[];
  /**
   * Title for this set.
   */
  title?: string;
}

/**
 * Information about a `Feed` with a `feed_type` of `COURSE_ROSTER_CHANGES`.
 */
export interface CourseRosterChangesInfo {
  /**
   * The `course_id` of the course to subscribe to roster changes for.
   */
  courseId?: string;
}

/**
 * Additional options for Classroom#coursesAliasesList.
 */
export interface CoursesAliasesListOptions {
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * Additional options for Classroom#coursesAnnouncementsList.
 */
export interface CoursesAnnouncementsListOptions {
  /**
   * Restriction on the `state` of announcements returned. If this argument is
   * left unspecified, the default value is `PUBLISHED`.
   */
  announcementStates?:  | "ANNOUNCEMENT_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED";
  /**
   * Optional sort ordering for results. A comma-separated list of fields with
   * an optional sort direction keyword. Supported field is `updateTime`.
   * Supported direction keywords are `asc` and `desc`. If not specified,
   * `updateTime desc` is the default behavior. Examples: `updateTime asc`,
   * `updateTime`
   */
  orderBy?: string;
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * Additional options for Classroom#coursesAnnouncementsPatch.
 */
export interface CoursesAnnouncementsPatchOptions {
  /**
   * Mask that identifies which fields on the announcement to update. This
   * field is required to do an update. The update fails if invalid fields are
   * specified. If a field supports empty values, it can be cleared by
   * specifying it in the update mask and not in the Announcement object. If a
   * field that does not support empty values is included in the update mask and
   * not set in the Announcement object, an `INVALID_ARGUMENT` error is
   * returned. The following fields may be specified by teachers: * `text` *
   * `state` * `scheduled_time`
   */
  updateMask?: string /* FieldMask */;
}

function serializeCoursesAnnouncementsPatchOptions(data: any): CoursesAnnouncementsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCoursesAnnouncementsPatchOptions(data: any): CoursesAnnouncementsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Classroom#coursesCourseWorkList.
 */
export interface CoursesCourseWorkListOptions {
  /**
   * Restriction on the work status to return. Only courseWork that matches is
   * returned. If unspecified, items with a work status of `PUBLISHED` is
   * returned.
   */
  courseWorkStates?:  | "COURSE_WORK_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED";
  /**
   * Optional sort ordering for results. A comma-separated list of fields with
   * an optional sort direction keyword. Supported fields are `updateTime` and
   * `dueDate`. Supported direction keywords are `asc` and `desc`. If not
   * specified, `updateTime desc` is the default behavior. Examples: `dueDate
   * asc,updateTime desc`, `updateTime,dueDate desc`
   */
  orderBy?: string;
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * Additional options for Classroom#coursesCourseWorkMaterialsList.
 */
export interface CoursesCourseWorkMaterialsListOptions {
  /**
   * Restriction on the work status to return. Only course work material that
   * matches is returned. If unspecified, items with a work status of
   * `PUBLISHED` is returned.
   */
  courseWorkMaterialStates?:  | "COURSEWORK_MATERIAL_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED";
  /**
   * Optional filtering for course work material with at least one Drive
   * material whose ID matches the provided string. If `material_link` is also
   * specified, course work material must have materials matching both filters.
   */
  materialDriveId?: string;
  /**
   * Optional filtering for course work material with at least one link
   * material whose URL partially matches the provided string.
   */
  materialLink?: string;
  /**
   * Optional sort ordering for results. A comma-separated list of fields with
   * an optional sort direction keyword. Supported field is `updateTime`.
   * Supported direction keywords are `asc` and `desc`. If not specified,
   * `updateTime desc` is the default behavior. Examples: `updateTime asc`,
   * `updateTime`
   */
  orderBy?: string;
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * Additional options for Classroom#coursesCourseWorkMaterialsPatch.
 */
export interface CoursesCourseWorkMaterialsPatchOptions {
  /**
   * Mask that identifies which fields on the course work material to update.
   * This field is required to do an update. The update fails if invalid fields
   * are specified. If a field supports empty values, it can be cleared by
   * specifying it in the update mask and not in the course work material
   * object. If a field that does not support empty values is included in the
   * update mask and not set in the course work material object, an
   * `INVALID_ARGUMENT` error is returned. The following fields may be specified
   * by teachers: * `title` * `description` * `state` * `scheduled_time` *
   * `topic_id`
   */
  updateMask?: string /* FieldMask */;
}

function serializeCoursesCourseWorkMaterialsPatchOptions(data: any): CoursesCourseWorkMaterialsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCoursesCourseWorkMaterialsPatchOptions(data: any): CoursesCourseWorkMaterialsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Classroom#coursesCourseWorkPatch.
 */
export interface CoursesCourseWorkPatchOptions {
  /**
   * Mask that identifies which fields on the course work to update. This field
   * is required to do an update. The update fails if invalid fields are
   * specified. If a field supports empty values, it can be cleared by
   * specifying it in the update mask and not in the CourseWork object. If a
   * field that does not support empty values is included in the update mask and
   * not set in the CourseWork object, an `INVALID_ARGUMENT` error is returned.
   * The following fields may be specified by teachers: * `title` *
   * `description` * `state` * `due_date` * `due_time` * `max_points` *
   * `scheduled_time` * `submission_modification_mode` * `topic_id`
   */
  updateMask?: string /* FieldMask */;
}

function serializeCoursesCourseWorkPatchOptions(data: any): CoursesCourseWorkPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCoursesCourseWorkPatchOptions(data: any): CoursesCourseWorkPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Classroom#coursesCourseWorkStudentSubmissionsList.
 */
export interface CoursesCourseWorkStudentSubmissionsListOptions {
  /**
   * Requested lateness value. If specified, returned student submissions are
   * restricted by the requested value. If unspecified, submissions are returned
   * regardless of `late` value.
   */
  late?:  | "LATE_VALUES_UNSPECIFIED" | "LATE_ONLY" | "NOT_LATE_ONLY";
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
  /**
   * Requested submission states. If specified, returned student submissions
   * match one of the specified submission states.
   */
  states?:  | "SUBMISSION_STATE_UNSPECIFIED" | "NEW" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT";
  /**
   * Optional argument to restrict returned student work to those owned by the
   * student with the specified identifier. The identifier can be one of the
   * following: * the numeric identifier for the user * the email address of the
   * user * the string literal `"me"`, indicating the requesting user
   */
  userId?: string;
}

/**
 * Additional options for Classroom#coursesCourseWorkStudentSubmissionsPatch.
 */
export interface CoursesCourseWorkStudentSubmissionsPatchOptions {
  /**
   * Mask that identifies which fields on the student submission to update.
   * This field is required to do an update. The update fails if invalid fields
   * are specified. The following fields may be specified by teachers: *
   * `draft_grade` * `assigned_grade`
   */
  updateMask?: string /* FieldMask */;
}

function serializeCoursesCourseWorkStudentSubmissionsPatchOptions(data: any): CoursesCourseWorkStudentSubmissionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCoursesCourseWorkStudentSubmissionsPatchOptions(data: any): CoursesCourseWorkStudentSubmissionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Classroom#coursesList.
 */
export interface CoursesListOptions {
  /**
   * Restricts returned courses to those in one of the specified states The
   * default value is ACTIVE, ARCHIVED, PROVISIONED, DECLINED.
   */
  courseStates?:  | "COURSE_STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "PROVISIONED" | "DECLINED" | "SUSPENDED";
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
  /**
   * Restricts returned courses to those having a student with the specified
   * identifier. The identifier can be one of the following: * the numeric
   * identifier for the user * the email address of the user * the string
   * literal `"me"`, indicating the requesting user
   */
  studentId?: string;
  /**
   * Restricts returned courses to those having a teacher with the specified
   * identifier. The identifier can be one of the following: * the numeric
   * identifier for the user * the email address of the user * the string
   * literal `"me"`, indicating the requesting user
   */
  teacherId?: string;
}

/**
 * Additional options for Classroom#coursesPatch.
 */
export interface CoursesPatchOptions {
  /**
   * Mask that identifies which fields on the course to update. This field is
   * required to do an update. The update will fail if invalid fields are
   * specified. The following fields are valid: * `name` * `section` *
   * `descriptionHeading` * `description` * `room` * `courseState` * `ownerId`
   * Note: patches to ownerId are treated as being effective immediately, but in
   * practice it may take some time for the ownership transfer of all affected
   * resources to complete. When set in a query parameter, this field should be
   * specified as `updateMask=,,...`
   */
  updateMask?: string /* FieldMask */;
}

function serializeCoursesPatchOptions(data: any): CoursesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCoursesPatchOptions(data: any): CoursesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Classroom#coursesStudentsCreate.
 */
export interface CoursesStudentsCreateOptions {
  /**
   * Enrollment code of the course to create the student in. This code is
   * required if userId corresponds to the requesting user; it may be omitted if
   * the requesting user has administrative permissions to create students for
   * any user.
   */
  enrollmentCode?: string;
}

/**
 * Additional options for Classroom#coursesStudentsList.
 */
export interface CoursesStudentsListOptions {
  /**
   * Maximum number of items to return. The default is 30 if unspecified or
   * `0`. The server may return fewer than the specified number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * Additional options for Classroom#coursesTeachersList.
 */
export interface CoursesTeachersListOptions {
  /**
   * Maximum number of items to return. The default is 30 if unspecified or
   * `0`. The server may return fewer than the specified number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * Additional options for Classroom#coursesTopicsList.
 */
export interface CoursesTopicsListOptions {
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * Additional options for Classroom#coursesTopicsPatch.
 */
export interface CoursesTopicsPatchOptions {
  /**
   * Mask that identifies which fields on the topic to update. This field is
   * required to do an update. The update fails if invalid fields are specified.
   * If a field supports empty values, it can be cleared by specifying it in the
   * update mask and not in the Topic object. If a field that does not support
   * empty values is included in the update mask and not set in the Topic
   * object, an `INVALID_ARGUMENT` error is returned. The following fields may
   * be specified: * `name`
   */
  updateMask?: string /* FieldMask */;
}

function serializeCoursesTopicsPatchOptions(data: any): CoursesTopicsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCoursesTopicsPatchOptions(data: any): CoursesTopicsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Course work created by a teacher for students of the course.
 */
export interface CourseWork {
  /**
   * Absolute link to this course work in the Classroom web UI. This is only
   * populated if `state` is `PUBLISHED`. Read-only.
   */
  alternateLink?: string;
  /**
   * Assignee mode of the coursework. If unspecified, the default value is
   * `ALL_STUDENTS`.
   */
  assigneeMode?:  | "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS";
  /**
   * Assignment details. This is populated only when `work_type` is
   * `ASSIGNMENT`. Read-only.
   */
  assignment?: Assignment;
  /**
   * Whether this course work item is associated with the Developer Console
   * project making the request. See CreateCourseWork for more details.
   * Read-only.
   */
  associatedWithDeveloper?: boolean;
  /**
   * Identifier of the course. Read-only.
   */
  courseId?: string;
  /**
   * Timestamp when this course work was created. Read-only.
   */
  creationTime?: Date;
  /**
   * Identifier for the user that created the coursework. Read-only.
   */
  creatorUserId?: string;
  /**
   * Optional description of this course work. If set, the description must be
   * a valid UTF-8 string containing no more than 30,000 characters.
   */
  description?: string;
  /**
   * Optional date, in UTC, that submissions for this course work are due. This
   * must be specified if `due_time` is specified.
   */
  dueDate?: Date;
  /**
   * Optional time of day, in UTC, that submissions for this course work are
   * due. This must be specified if `due_date` is specified.
   */
  dueTime?: TimeOfDay;
  /**
   * The category that this coursework's grade contributes to. Present only
   * when a category has been chosen for the coursework. May be used in
   * calculating the overall grade. Read-only.
   */
  gradeCategory?: GradeCategory;
  /**
   * Classroom-assigned identifier of this course work, unique per course.
   * Read-only.
   */
  id?: string;
  /**
   * Identifiers of students with access to the coursework. This field is set
   * only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is
   * `INDIVIDUAL_STUDENTS`, then only students specified in this field are
   * assigned the coursework.
   */
  individualStudentsOptions?: IndividualStudentsOptions;
  /**
   * Additional materials. CourseWork must have no more than 20 material items.
   */
  materials?: Material[];
  /**
   * Maximum grade for this course work. If zero or unspecified, this
   * assignment is considered ungraded. This must be a non-negative integer
   * value.
   */
  maxPoints?: number;
  /**
   * Multiple choice question details. For read operations, this field is
   * populated only when `work_type` is `MULTIPLE_CHOICE_QUESTION`. For write
   * operations, this field must be specified when creating course work with a
   * `work_type` of `MULTIPLE_CHOICE_QUESTION`, and it must not be set
   * otherwise.
   */
  multipleChoiceQuestion?: MultipleChoiceQuestion;
  /**
   * Optional timestamp when this course work is scheduled to be published.
   */
  scheduledTime?: Date;
  /**
   * Status of this course work. If unspecified, the default state is `DRAFT`.
   */
  state?:  | "COURSE_WORK_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED";
  /**
   * Setting to determine when students are allowed to modify submissions. If
   * unspecified, the default value is `MODIFIABLE_UNTIL_TURNED_IN`.
   */
  submissionModificationMode?:  | "SUBMISSION_MODIFICATION_MODE_UNSPECIFIED" | "MODIFIABLE_UNTIL_TURNED_IN" | "MODIFIABLE";
  /**
   * Title of this course work. The title must be a valid UTF-8 string
   * containing between 1 and 3000 characters.
   */
  title?: string;
  /**
   * Identifier for the topic that this coursework is associated with. Must
   * match an existing topic in the course.
   */
  topicId?: string;
  /**
   * Timestamp of the most recent change to this course work. Read-only.
   */
  updateTime?: Date;
  /**
   * Type of this course work. The type is set when the course work is created
   * and cannot be changed.
   */
  workType?:  | "COURSE_WORK_TYPE_UNSPECIFIED" | "ASSIGNMENT" | "SHORT_ANSWER_QUESTION" | "MULTIPLE_CHOICE_QUESTION";
}

function serializeCourseWork(data: any): CourseWork {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? data["scheduledTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeCourseWork(data: any): CourseWork {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? new Date(data["scheduledTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Information about a `Feed` with a `feed_type` of `COURSE_WORK_CHANGES`.
 */
export interface CourseWorkChangesInfo {
  /**
   * The `course_id` of the course to subscribe to work changes for.
   */
  courseId?: string;
}

/**
 * Course work material created by a teacher for students of the course
 */
export interface CourseWorkMaterial {
  /**
   * Absolute link to this course work material in the Classroom web UI. This
   * is only populated if `state` is `PUBLISHED`. Read-only.
   */
  alternateLink?: string;
  /**
   * Assignee mode of the course work material. If unspecified, the default
   * value is `ALL_STUDENTS`.
   */
  assigneeMode?:  | "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS";
  /**
   * Identifier of the course. Read-only.
   */
  courseId?: string;
  /**
   * Timestamp when this course work material was created. Read-only.
   */
  creationTime?: Date;
  /**
   * Identifier for the user that created the course work material. Read-only.
   */
  creatorUserId?: string;
  /**
   * Optional description of this course work material. The text must be a
   * valid UTF-8 string containing no more than 30,000 characters.
   */
  description?: string;
  /**
   * Classroom-assigned identifier of this course work material, unique per
   * course. Read-only.
   */
  id?: string;
  /**
   * Identifiers of students with access to the course work material. This
   * field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the
   * `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in
   * this field can see the course work material.
   */
  individualStudentsOptions?: IndividualStudentsOptions;
  /**
   * Additional materials. A course work material must have no more than 20
   * material items.
   */
  materials?: Material[];
  /**
   * Optional timestamp when this course work material is scheduled to be
   * published.
   */
  scheduledTime?: Date;
  /**
   * Status of this course work material. If unspecified, the default state is
   * `DRAFT`.
   */
  state?:  | "COURSEWORK_MATERIAL_STATE_UNSPECIFIED" | "PUBLISHED" | "DRAFT" | "DELETED";
  /**
   * Title of this course work material. The title must be a valid UTF-8 string
   * containing between 1 and 3000 characters.
   */
  title?: string;
  /**
   * Identifier for the topic that this course work material is associated
   * with. Must match an existing topic in the course.
   */
  topicId?: string;
  /**
   * Timestamp of the most recent change to this course work material.
   * Read-only.
   */
  updateTime?: Date;
}

function serializeCourseWorkMaterial(data: any): CourseWorkMaterial {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? data["scheduledTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeCourseWorkMaterial(data: any): CourseWorkMaterial {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    scheduledTime: data["scheduledTime"] !== undefined ? new Date(data["scheduledTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
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
export interface Date {
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
 * Representation of a Google Drive file.
 */
export interface DriveFile {
  /**
   * URL that can be used to access the Drive item. Read-only.
   */
  alternateLink?: string;
  /**
   * Drive API resource ID.
   */
  id?: string;
  /**
   * URL of a thumbnail image of the Drive item. Read-only.
   */
  thumbnailUrl?: string;
  /**
   * Title of the Drive item. Read-only.
   */
  title?: string;
}

/**
 * Representation of a Google Drive folder.
 */
export interface DriveFolder {
  /**
   * URL that can be used to access the Drive folder. Read-only.
   */
  alternateLink?: string;
  /**
   * Drive API resource ID.
   */
  id?: string;
  /**
   * Title of the Drive folder. Read-only.
   */
  title?: string;
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
 * A class of notifications that an application can register to receive. For
 * example: "all roster changes for a domain".
 */
export interface Feed {
  /**
   * Information about a `Feed` with a `feed_type` of `COURSE_ROSTER_CHANGES`.
   * This field must be specified if `feed_type` is `COURSE_ROSTER_CHANGES`.
   */
  courseRosterChangesInfo?: CourseRosterChangesInfo;
  /**
   * Information about a `Feed` with a `feed_type` of `COURSE_WORK_CHANGES`.
   * This field must be specified if `feed_type` is `COURSE_WORK_CHANGES`.
   */
  courseWorkChangesInfo?: CourseWorkChangesInfo;
  /**
   * The type of feed.
   */
  feedType?:  | "FEED_TYPE_UNSPECIFIED" | "DOMAIN_ROSTER_CHANGES" | "COURSE_ROSTER_CHANGES" | "COURSE_WORK_CHANGES";
}

/**
 * Google Forms item.
 */
export interface Form {
  /**
   * URL of the form.
   */
  formUrl?: string;
  /**
   * URL of the form responses document. Only set if respsonses have been
   * recorded and only when the requesting user is an editor of the form.
   * Read-only.
   */
  responseUrl?: string;
  /**
   * URL of a thumbnail image of the Form. Read-only.
   */
  thumbnailUrl?: string;
  /**
   * Title of the Form. Read-only.
   */
  title?: string;
}

/**
 * Global user permission description.
 */
export interface GlobalPermission {
  /**
   * Permission value.
   */
  permission?:  | "PERMISSION_UNSPECIFIED" | "CREATE_COURSE";
}

/**
 * The gradebook settings for a course. See the [help center
 * article](https://support.google.com/edu/classroom/answer/9184995) for
 * details.
 */
export interface GradebookSettings {
  /**
   * Indicates how the overall grade is calculated.
   */
  calculationType?:  | "CALCULATION_TYPE_UNSPECIFIED" | "TOTAL_POINTS" | "WEIGHTED_CATEGORIES";
  /**
   * Indicates who can see the overall grade..
   */
  displaySetting?:  | "DISPLAY_SETTING_UNSPECIFIED" | "SHOW_OVERALL_GRADE" | "HIDE_OVERALL_GRADE" | "SHOW_TEACHERS_ONLY";
  /**
   * Grade categories that are available for coursework in the course.
   */
  gradeCategories?: GradeCategory[];
}

/**
 * Details for a grade category in a course. Coursework may have zero or one
 * grade category, and the category may be used in computing the overall grade.
 * See the [help center
 * article](https://support.google.com/edu/classroom/answer/9184995) for
 * details.
 */
export interface GradeCategory {
  /**
   * Default value of denominator. Only applicable when grade calculation type
   * is TOTAL_POINTS.
   */
  defaultGradeDenominator?: number;
  /**
   * ID of the grade category.
   */
  id?: string;
  /**
   * Name of the grade category.
   */
  name?: string;
  /**
   * The weight of the category average as part of overall average. A weight of
   * 12.34% is represented as 123400 (100% is 1,000,000). The last two digits
   * should always be zero since we use two decimal precision. Only applicable
   * when grade calculation type is WEIGHTED_CATEGORIES.
   */
  weight?: number;
}

/**
 * The history of each grade on this submission.
 */
export interface GradeHistory {
  /**
   * The teacher who made the grade change.
   */
  actorUserId?: string;
  /**
   * The type of grade change at this time in the submission grade history.
   */
  gradeChangeType?:  | "UNKNOWN_GRADE_CHANGE_TYPE" | "DRAFT_GRADE_POINTS_EARNED_CHANGE" | "ASSIGNED_GRADE_POINTS_EARNED_CHANGE" | "MAX_POINTS_CHANGE";
  /**
   * When the grade of the submission was changed.
   */
  gradeTimestamp?: Date;
  /**
   * The denominator of the grade at this time in the submission grade history.
   */
  maxPoints?: number;
  /**
   * The numerator of the grade at this time in the submission grade history.
   */
  pointsEarned?: number;
}

function serializeGradeHistory(data: any): GradeHistory {
  return {
    ...data,
    gradeTimestamp: data["gradeTimestamp"] !== undefined ? data["gradeTimestamp"].toISOString() : undefined,
  };
}

function deserializeGradeHistory(data: any): GradeHistory {
  return {
    ...data,
    gradeTimestamp: data["gradeTimestamp"] !== undefined ? new Date(data["gradeTimestamp"]) : undefined,
  };
}

/**
 * Association between a student and a guardian of that student. The guardian
 * may receive information about the student's course work.
 */
export interface Guardian {
  /**
   * Identifier for the guardian.
   */
  guardianId?: string;
  /**
   * User profile for the guardian.
   */
  guardianProfile?: UserProfile;
  /**
   * The email address to which the initial guardian invitation was sent. This
   * field is only visible to domain administrators.
   */
  invitedEmailAddress?: string;
  /**
   * Identifier for the student to whom the guardian relationship applies.
   */
  studentId?: string;
}

/**
 * An invitation to become the guardian of a specified user, sent to a
 * specified email address.
 */
export interface GuardianInvitation {
  /**
   * The time that this invitation was created. Read-only.
   */
  creationTime?: Date;
  /**
   * Unique identifier for this invitation. Read-only.
   */
  invitationId?: string;
  /**
   * Email address that the invitation was sent to. This field is only visible
   * to domain administrators.
   */
  invitedEmailAddress?: string;
  /**
   * The state that this invitation is in.
   */
  state?:  | "GUARDIAN_INVITATION_STATE_UNSPECIFIED" | "PENDING" | "COMPLETE";
  /**
   * ID of the student (in standard format)
   */
  studentId?: string;
}

function serializeGuardianInvitation(data: any): GuardianInvitation {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
  };
}

function deserializeGuardianInvitation(data: any): GuardianInvitation {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
  };
}

/**
 * Assignee details about a coursework/announcement. This field is set if and
 * only if `assigneeMode` is `INDIVIDUAL_STUDENTS`.
 */
export interface IndividualStudentsOptions {
  /**
   * Identifiers for the students that have access to the
   * coursework/announcement.
   */
  studentIds?: string[];
}

/**
 * An invitation to join a course.
 */
export interface Invitation {
  /**
   * Identifier of the course to invite the user to.
   */
  courseId?: string;
  /**
   * Identifier assigned by Classroom. Read-only.
   */
  id?: string;
  /**
   * Role to invite the user to have. Must not be `COURSE_ROLE_UNSPECIFIED`.
   */
  role?:  | "COURSE_ROLE_UNSPECIFIED" | "STUDENT" | "TEACHER" | "OWNER";
  /**
   * Identifier of the invited user. When specified as a parameter of a
   * request, this identifier can be set to one of the following: * the numeric
   * identifier for the user * the email address of the user * the string
   * literal `"me"`, indicating the requesting user
   */
  userId?: string;
}

/**
 * Additional options for Classroom#invitationsList.
 */
export interface InvitationsListOptions {
  /**
   * Restricts returned invitations to those for a course with the specified
   * identifier.
   */
  courseId?: string;
  /**
   * Maximum number of items to return. The default is 500 if unspecified or
   * `0`. The server may return fewer than the specified number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
  /**
   * Restricts returned invitations to those for a specific user. The
   * identifier can be one of the following: * the numeric identifier for the
   * user * the email address of the user * the string literal `"me"`,
   * indicating the requesting user
   */
  userId?: string;
}

/**
 * URL item.
 */
export interface Link {
  /**
   * URL of a thumbnail image of the target URL. Read-only.
   */
  thumbnailUrl?: string;
  /**
   * Title of the target of the URL. Read-only.
   */
  title?: string;
  /**
   * URL to link to. This must be a valid UTF-8 string containing between 1 and
   * 2024 characters.
   */
  url?: string;
}

/**
 * Response when listing course work.
 */
export interface ListAnnouncementsResponse {
  /**
   * Announcement items that match the request.
   */
  announcements?: Announcement[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

function serializeListAnnouncementsResponse(data: any): ListAnnouncementsResponse {
  return {
    ...data,
    announcements: data["announcements"] !== undefined ? data["announcements"].map((item: any) => (serializeAnnouncement(item))) : undefined,
  };
}

function deserializeListAnnouncementsResponse(data: any): ListAnnouncementsResponse {
  return {
    ...data,
    announcements: data["announcements"] !== undefined ? data["announcements"].map((item: any) => (deserializeAnnouncement(item))) : undefined,
  };
}

/**
 * Response when listing course aliases.
 */
export interface ListCourseAliasesResponse {
  /**
   * The course aliases.
   */
  aliases?: CourseAlias[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

/**
 * Response when listing courses.
 */
export interface ListCoursesResponse {
  /**
   * Courses that match the list request.
   */
  courses?: Course[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

function serializeListCoursesResponse(data: any): ListCoursesResponse {
  return {
    ...data,
    courses: data["courses"] !== undefined ? data["courses"].map((item: any) => (serializeCourse(item))) : undefined,
  };
}

function deserializeListCoursesResponse(data: any): ListCoursesResponse {
  return {
    ...data,
    courses: data["courses"] !== undefined ? data["courses"].map((item: any) => (deserializeCourse(item))) : undefined,
  };
}

/**
 * Response when listing course work material.
 */
export interface ListCourseWorkMaterialResponse {
  /**
   * Course work material items that match the request.
   */
  courseWorkMaterial?: CourseWorkMaterial[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

function serializeListCourseWorkMaterialResponse(data: any): ListCourseWorkMaterialResponse {
  return {
    ...data,
    courseWorkMaterial: data["courseWorkMaterial"] !== undefined ? data["courseWorkMaterial"].map((item: any) => (serializeCourseWorkMaterial(item))) : undefined,
  };
}

function deserializeListCourseWorkMaterialResponse(data: any): ListCourseWorkMaterialResponse {
  return {
    ...data,
    courseWorkMaterial: data["courseWorkMaterial"] !== undefined ? data["courseWorkMaterial"].map((item: any) => (deserializeCourseWorkMaterial(item))) : undefined,
  };
}

/**
 * Response when listing course work.
 */
export interface ListCourseWorkResponse {
  /**
   * Course work items that match the request.
   */
  courseWork?: CourseWork[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

function serializeListCourseWorkResponse(data: any): ListCourseWorkResponse {
  return {
    ...data,
    courseWork: data["courseWork"] !== undefined ? data["courseWork"].map((item: any) => (serializeCourseWork(item))) : undefined,
  };
}

function deserializeListCourseWorkResponse(data: any): ListCourseWorkResponse {
  return {
    ...data,
    courseWork: data["courseWork"] !== undefined ? data["courseWork"].map((item: any) => (deserializeCourseWork(item))) : undefined,
  };
}

/**
 * Response when listing guardian invitations.
 */
export interface ListGuardianInvitationsResponse {
  /**
   * Guardian invitations that matched the list request.
   */
  guardianInvitations?: GuardianInvitation[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

function serializeListGuardianInvitationsResponse(data: any): ListGuardianInvitationsResponse {
  return {
    ...data,
    guardianInvitations: data["guardianInvitations"] !== undefined ? data["guardianInvitations"].map((item: any) => (serializeGuardianInvitation(item))) : undefined,
  };
}

function deserializeListGuardianInvitationsResponse(data: any): ListGuardianInvitationsResponse {
  return {
    ...data,
    guardianInvitations: data["guardianInvitations"] !== undefined ? data["guardianInvitations"].map((item: any) => (deserializeGuardianInvitation(item))) : undefined,
  };
}

/**
 * Response when listing guardians.
 */
export interface ListGuardiansResponse {
  /**
   * Guardians on this page of results that met the criteria specified in the
   * request.
   */
  guardians?: Guardian[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

/**
 * Response when listing invitations.
 */
export interface ListInvitationsResponse {
  /**
   * Invitations that match the list request.
   */
  invitations?: Invitation[];
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
}

/**
 * Response when listing students.
 */
export interface ListStudentsResponse {
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * Students who match the list request.
   */
  students?: Student[];
}

/**
 * Response when listing student submissions.
 */
export interface ListStudentSubmissionsResponse {
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * Student work that matches the request.
   */
  studentSubmissions?: StudentSubmission[];
}

function serializeListStudentSubmissionsResponse(data: any): ListStudentSubmissionsResponse {
  return {
    ...data,
    studentSubmissions: data["studentSubmissions"] !== undefined ? data["studentSubmissions"].map((item: any) => (serializeStudentSubmission(item))) : undefined,
  };
}

function deserializeListStudentSubmissionsResponse(data: any): ListStudentSubmissionsResponse {
  return {
    ...data,
    studentSubmissions: data["studentSubmissions"] !== undefined ? data["studentSubmissions"].map((item: any) => (deserializeStudentSubmission(item))) : undefined,
  };
}

/**
 * Response when listing teachers.
 */
export interface ListTeachersResponse {
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * Teachers who match the list request.
   */
  teachers?: Teacher[];
}

/**
 * Response when listing topics.
 */
export interface ListTopicResponse {
  /**
   * Token identifying the next page of results to return. If empty, no further
   * results are available.
   */
  nextPageToken?: string;
  /**
   * Topic items that match the request.
   */
  topic?: Topic[];
}

function serializeListTopicResponse(data: any): ListTopicResponse {
  return {
    ...data,
    topic: data["topic"] !== undefined ? data["topic"].map((item: any) => (serializeTopic(item))) : undefined,
  };
}

function deserializeListTopicResponse(data: any): ListTopicResponse {
  return {
    ...data,
    topic: data["topic"] !== undefined ? data["topic"].map((item: any) => (deserializeTopic(item))) : undefined,
  };
}

/**
 * Material attached to course work. When creating attachments, setting the
 * `form` field is not supported.
 */
export interface Material {
  /**
   * Google Drive file material.
   */
  driveFile?: SharedDriveFile;
  /**
   * Google Forms material.
   */
  form?: Form;
  /**
   * Link material. On creation, this is upgraded to a more appropriate type if
   * possible, and this is reflected in the response.
   */
  link?: Link;
  /**
   * YouTube video material.
   */
  youtubeVideo?: YouTubeVideo;
}

/**
 * Request to modify assignee mode and options of an announcement.
 */
export interface ModifyAnnouncementAssigneesRequest {
  /**
   * Mode of the announcement describing whether it is accessible by all
   * students or specified individual students.
   */
  assigneeMode?:  | "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS";
  /**
   * Set which students can view or cannot view the announcement. Must be
   * specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`.
   */
  modifyIndividualStudentsOptions?: ModifyIndividualStudentsOptions;
}

/**
 * Request to modify the attachments of a student submission.
 */
export interface ModifyAttachmentsRequest {
  /**
   * Attachments to add. A student submission may not have more than 20
   * attachments. Form attachments are not supported.
   */
  addAttachments?: Attachment[];
}

/**
 * Request to modify assignee mode and options of a coursework.
 */
export interface ModifyCourseWorkAssigneesRequest {
  /**
   * Mode of the coursework describing whether it will be assigned to all
   * students or specified individual students.
   */
  assigneeMode?:  | "ASSIGNEE_MODE_UNSPECIFIED" | "ALL_STUDENTS" | "INDIVIDUAL_STUDENTS";
  /**
   * Set which students are assigned or not assigned to the coursework. Must be
   * specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`.
   */
  modifyIndividualStudentsOptions?: ModifyIndividualStudentsOptions;
}

/**
 * Contains fields to add or remove students from a course work or announcement
 * where the `assigneeMode` is set to `INDIVIDUAL_STUDENTS`.
 */
export interface ModifyIndividualStudentsOptions {
  /**
   * IDs of students to be added as having access to this
   * coursework/announcement.
   */
  addStudentIds?: string[];
  /**
   * IDs of students to be removed from having access to this
   * coursework/announcement.
   */
  removeStudentIds?: string[];
}

/**
 * Additional details for multiple-choice questions.
 */
export interface MultipleChoiceQuestion {
  /**
   * Possible choices.
   */
  choices?: string[];
}

/**
 * Student work for a multiple-choice question.
 */
export interface MultipleChoiceSubmission {
  /**
   * Student's select choice.
   */
  answer?: string;
}

/**
 * Details of the user's name.
 */
export interface Name {
  /**
   * The user's last name. Read-only.
   */
  familyName?: string;
  /**
   * The user's full name formed by concatenating the first and last name
   * values. Read-only.
   */
  fullName?: string;
  /**
   * The user's first name. Read-only.
   */
  givenName?: string;
}

/**
 * Request to reclaim a student submission.
 */
export interface ReclaimStudentSubmissionRequest {
}

/**
 * An instruction to Classroom to send notifications from the `feed` to the
 * provided destination.
 */
export interface Registration {
  /**
   * The Cloud Pub/Sub topic that notifications are to be sent to.
   */
  cloudPubsubTopic?: CloudPubsubTopic;
  /**
   * The time until which the `Registration` is effective. This is a read-only
   * field assigned by the server.
   */
  expiryTime?: Date;
  /**
   * Specification for the class of notifications that Classroom should deliver
   * to the destination.
   */
  feed?: Feed;
  /**
   * A server-generated unique identifier for this `Registration`. Read-only.
   */
  registrationId?: string;
}

function serializeRegistration(data: any): Registration {
  return {
    ...data,
    expiryTime: data["expiryTime"] !== undefined ? data["expiryTime"].toISOString() : undefined,
  };
}

function deserializeRegistration(data: any): Registration {
  return {
    ...data,
    expiryTime: data["expiryTime"] !== undefined ? new Date(data["expiryTime"]) : undefined,
  };
}

/**
 * Request to return a student submission.
 */
export interface ReturnStudentSubmissionRequest {
}

/**
 * Drive file that is used as material for course work.
 */
export interface SharedDriveFile {
  /**
   * Drive file details.
   */
  driveFile?: DriveFile;
  /**
   * Mechanism by which students access the Drive item.
   */
  shareMode?:  | "UNKNOWN_SHARE_MODE" | "VIEW" | "EDIT" | "STUDENT_COPY";
}

/**
 * Student work for a short answer question.
 */
export interface ShortAnswerSubmission {
  /**
   * Student response to a short-answer question.
   */
  answer?: string;
}

/**
 * The history of each state this submission has been in.
 */
export interface StateHistory {
  /**
   * The teacher or student who made the change.
   */
  actorUserId?: string;
  /**
   * The workflow pipeline stage.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT" | "STUDENT_EDITED_AFTER_TURN_IN";
  /**
   * When the submission entered this state.
   */
  stateTimestamp?: Date;
}

function serializeStateHistory(data: any): StateHistory {
  return {
    ...data,
    stateTimestamp: data["stateTimestamp"] !== undefined ? data["stateTimestamp"].toISOString() : undefined,
  };
}

function deserializeStateHistory(data: any): StateHistory {
  return {
    ...data,
    stateTimestamp: data["stateTimestamp"] !== undefined ? new Date(data["stateTimestamp"]) : undefined,
  };
}

/**
 * Student in a course.
 */
export interface Student {
  /**
   * Identifier of the course. Read-only.
   */
  courseId?: string;
  /**
   * Global user information for the student. Read-only.
   */
  profile?: UserProfile;
  /**
   * Information about a Drive Folder for this student's work in this course.
   * Only visible to the student and domain administrators. Read-only.
   */
  studentWorkFolder?: DriveFolder;
  /**
   * Identifier of the user. When specified as a parameter of a request, this
   * identifier can be one of the following: * the numeric identifier for the
   * user * the email address of the user * the string literal `"me"`,
   * indicating the requesting user
   */
  userId?: string;
}

/**
 * Student submission for course work. StudentSubmission items are generated
 * when a CourseWork item is created. StudentSubmissions that have never been
 * accessed (i.e. with `state` = NEW) may not have a creation time or update
 * time.
 */
export interface StudentSubmission {
  /**
   * Absolute link to the submission in the Classroom web UI. Read-only.
   */
  alternateLink?: string;
  /**
   * Optional grade. If unset, no grade was set. This value must be
   * non-negative. Decimal (that is, non-integer) values are allowed, but are
   * rounded to two decimal places. This may be modified only by course
   * teachers.
   */
  assignedGrade?: number;
  /**
   * Submission content when course_work_type is ASSIGNMENT. Students can
   * modify this content using ModifyAttachments.
   */
  assignmentSubmission?: AssignmentSubmission;
  /**
   * Whether this student submission is associated with the Developer Console
   * project making the request. See CreateCourseWork for more details.
   * Read-only.
   */
  associatedWithDeveloper?: boolean;
  /**
   * Identifier of the course. Read-only.
   */
  courseId?: string;
  /**
   * Identifier for the course work this corresponds to. Read-only.
   */
  courseWorkId?: string;
  /**
   * Type of course work this submission is for. Read-only.
   */
  courseWorkType?:  | "COURSE_WORK_TYPE_UNSPECIFIED" | "ASSIGNMENT" | "SHORT_ANSWER_QUESTION" | "MULTIPLE_CHOICE_QUESTION";
  /**
   * Creation time of this submission. This may be unset if the student has not
   * accessed this item. Read-only.
   */
  creationTime?: Date;
  /**
   * Optional pending grade. If unset, no grade was set. This value must be
   * non-negative. Decimal (that is, non-integer) values are allowed, but are
   * rounded to two decimal places. This is only visible to and modifiable by
   * course teachers.
   */
  draftGrade?: number;
  /**
   * Classroom-assigned Identifier for the student submission. This is unique
   * among submissions for the relevant course work. Read-only.
   */
  id?: string;
  /**
   * Whether this submission is late. Read-only.
   */
  late?: boolean;
  /**
   * Submission content when course_work_type is MULTIPLE_CHOICE_QUESTION.
   */
  multipleChoiceSubmission?: MultipleChoiceSubmission;
  /**
   * Submission content when course_work_type is SHORT_ANSWER_QUESTION.
   */
  shortAnswerSubmission?: ShortAnswerSubmission;
  /**
   * State of this submission. Read-only.
   */
  state?:  | "SUBMISSION_STATE_UNSPECIFIED" | "NEW" | "CREATED" | "TURNED_IN" | "RETURNED" | "RECLAIMED_BY_STUDENT";
  /**
   * The history of the submission (includes state and grade histories).
   * Read-only.
   */
  submissionHistory?: SubmissionHistory[];
  /**
   * Last update time of this submission. This may be unset if the student has
   * not accessed this item. Read-only.
   */
  updateTime?: Date;
  /**
   * Identifier for the student that owns this submission. Read-only.
   */
  userId?: string;
}

function serializeStudentSubmission(data: any): StudentSubmission {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    submissionHistory: data["submissionHistory"] !== undefined ? data["submissionHistory"].map((item: any) => (serializeSubmissionHistory(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeStudentSubmission(data: any): StudentSubmission {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    submissionHistory: data["submissionHistory"] !== undefined ? data["submissionHistory"].map((item: any) => (deserializeSubmissionHistory(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The history of the submission. This currently includes state and grade
 * histories.
 */
export interface SubmissionHistory {
  /**
   * The grade history information of the submission, if present.
   */
  gradeHistory?: GradeHistory;
  /**
   * The state history information of the submission, if present.
   */
  stateHistory?: StateHistory;
}

function serializeSubmissionHistory(data: any): SubmissionHistory {
  return {
    ...data,
    gradeHistory: data["gradeHistory"] !== undefined ? serializeGradeHistory(data["gradeHistory"]) : undefined,
    stateHistory: data["stateHistory"] !== undefined ? serializeStateHistory(data["stateHistory"]) : undefined,
  };
}

function deserializeSubmissionHistory(data: any): SubmissionHistory {
  return {
    ...data,
    gradeHistory: data["gradeHistory"] !== undefined ? deserializeGradeHistory(data["gradeHistory"]) : undefined,
    stateHistory: data["stateHistory"] !== undefined ? deserializeStateHistory(data["stateHistory"]) : undefined,
  };
}

/**
 * Teacher of a course.
 */
export interface Teacher {
  /**
   * Identifier of the course. Read-only.
   */
  courseId?: string;
  /**
   * Global user information for the teacher. Read-only.
   */
  profile?: UserProfile;
  /**
   * Identifier of the user. When specified as a parameter of a request, this
   * identifier can be one of the following: * the numeric identifier for the
   * user * the email address of the user * the string literal `"me"`,
   * indicating the requesting user
   */
  userId?: string;
}

/**
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * Topic created by a teacher for the course
 */
export interface Topic {
  /**
   * Identifier of the course. Read-only.
   */
  courseId?: string;
  /**
   * The name of the topic, generated by the user. Leading and trailing
   * whitespaces, if any, are trimmed. Also, multiple consecutive whitespaces
   * are collapsed into one inside the name. The result must be a non-empty
   * string. Topic names are case sensitive, and must be no longer than 100
   * characters.
   */
  name?: string;
  /**
   * Unique identifier for the topic. Read-only.
   */
  topicId?: string;
  /**
   * The time the topic was last updated by the system. Read-only.
   */
  updateTime?: Date;
}

function serializeTopic(data: any): Topic {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeTopic(data: any): Topic {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Request to turn in a student submission.
 */
export interface TurnInStudentSubmissionRequest {
}

/**
 * Global information for a user.
 */
export interface UserProfile {
  /**
   * Email address of the user. Must request
   * `https://www.googleapis.com/auth/classroom.profile.emails` scope for this
   * field to be populated in a response body. Read-only.
   */
  emailAddress?: string;
  /**
   * Identifier of the user. Read-only.
   */
  id?: string;
  /**
   * Name of the user. Read-only.
   */
  name?: Name;
  /**
   * Global permissions of the user. Read-only.
   */
  permissions?: GlobalPermission[];
  /**
   * URL of user's profile photo. Must request
   * `https://www.googleapis.com/auth/classroom.profile.photos` scope for this
   * field to be populated in a response body. Read-only.
   */
  photoUrl?: string;
  /**
   * Represents whether a Google Workspace for Education user's domain
   * administrator has explicitly verified them as being a teacher. This field
   * is always false if the user is not a member of a Google Workspace for
   * Education domain. Read-only
   */
  verifiedTeacher?: boolean;
}

/**
 * Additional options for Classroom#userProfilesGuardianInvitationsList.
 */
export interface UserProfilesGuardianInvitationsListOptions {
  /**
   * If specified, only results with the specified `invited_email_address` are
   * returned.
   */
  invitedEmailAddress?: string;
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
  /**
   * If specified, only results with the specified `state` values are returned.
   * Otherwise, results with a `state` of `PENDING` are returned.
   */
  states?:  | "GUARDIAN_INVITATION_STATE_UNSPECIFIED" | "PENDING" | "COMPLETE";
}

/**
 * Additional options for Classroom#userProfilesGuardianInvitationsPatch.
 */
export interface UserProfilesGuardianInvitationsPatchOptions {
  /**
   * Mask that identifies which fields on the course to update. This field is
   * required to do an update. The update fails if invalid fields are specified.
   * The following fields are valid: * `state` When set in a query parameter,
   * this field should be specified as `updateMask=,,...`
   */
  updateMask?: string /* FieldMask */;
}

function serializeUserProfilesGuardianInvitationsPatchOptions(data: any): UserProfilesGuardianInvitationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUserProfilesGuardianInvitationsPatchOptions(data: any): UserProfilesGuardianInvitationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Classroom#userProfilesGuardiansList.
 */
export interface UserProfilesGuardiansListOptions {
  /**
   * Filter results by the email address that the original invitation was sent
   * to, resulting in this guardian link. This filter can only be used by domain
   * administrators.
   */
  invitedEmailAddress?: string;
  /**
   * Maximum number of items to return. Zero or unspecified indicates that the
   * server may assign a maximum. The server may return fewer than the specified
   * number of results.
   */
  pageSize?: number;
  /**
   * nextPageToken value returned from a previous list call, indicating that
   * the subsequent page of results should be returned. The list request must be
   * otherwise identical to the one that resulted in this token.
   */
  pageToken?: string;
}

/**
 * YouTube video item.
 */
export interface YouTubeVideo {
  /**
   * URL that can be used to view the YouTube video. Read-only.
   */
  alternateLink?: string;
  /**
   * YouTube API resource ID.
   */
  id?: string;
  /**
   * URL of a thumbnail image of the YouTube video. Read-only.
   */
  thumbnailUrl?: string;
  /**
   * Title of the YouTube video. Read-only.
   */
  title?: string;
}