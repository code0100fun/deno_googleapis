// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Tasks API Client for Deno
 * =========================
 * 
 * The Google Tasks API lets you manage your tasks and task lists.
 * 
 * Docs: https://developers.google.com/tasks/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Google Tasks API lets you manage your tasks and task lists.
 */
export class Tasks {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://tasks.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes the authenticated user's specified task list.
   *
   * @param tasklist Task list identifier.
   */
  async tasklistsDelete(tasklist: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tasks/v1/users/@me/lists/${ tasklist }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns the authenticated user's specified task list.
   *
   * @param tasklist Task list identifier.
   */
  async tasklistsGet(tasklist: string): Promise<TaskList> {
    const url = new URL(`${this.#baseUrl}tasks/v1/users/@me/lists/${ tasklist }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TaskList;
  }

  /**
   * Creates a new task list and adds it to the authenticated user's task
   * lists.
   *
   */
  async tasklistsInsert(req: TaskList): Promise<TaskList> {
    const url = new URL(`${this.#baseUrl}tasks/v1/users/@me/lists`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TaskList;
  }

  /**
   * Returns all the authenticated user's task lists.
   *
   */
  async tasklistsList(opts: TasklistsListOptions = {}): Promise<TaskLists> {
    const url = new URL(`${this.#baseUrl}tasks/v1/users/@me/lists`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TaskLists;
  }

  /**
   * Updates the authenticated user's specified task list. This method supports
   * patch semantics.
   *
   * @param tasklist Task list identifier.
   */
  async tasklistsPatch(tasklist: string, req: TaskList): Promise<TaskList> {
    const url = new URL(`${this.#baseUrl}tasks/v1/users/@me/lists/${ tasklist }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as TaskList;
  }

  /**
   * Updates the authenticated user's specified task list.
   *
   * @param tasklist Task list identifier.
   */
  async tasklistsUpdate(tasklist: string, req: TaskList): Promise<TaskList> {
    const url = new URL(`${this.#baseUrl}tasks/v1/users/@me/lists/${ tasklist }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as TaskList;
  }

  /**
   * Clears all completed tasks from the specified task list. The affected
   * tasks will be marked as 'hidden' and no longer be returned by default when
   * retrieving all tasks for a task list.
   *
   * @param tasklist Task list identifier.
   */
  async tasksClear(tasklist: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/clear`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
  }

  /**
   * Deletes the specified task from the task list.
   *
   * @param task Task identifier.
   * @param tasklist Task list identifier.
   */
  async tasksDelete(task: string, tasklist: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/tasks/${ task }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns the specified task.
   *
   * @param task Task identifier.
   * @param tasklist Task list identifier.
   */
  async tasksGet(task: string, tasklist: string): Promise<Task> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/tasks/${ task }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Task;
  }

  /**
   * Creates a new task on the specified task list.
   *
   * @param tasklist Task list identifier.
   */
  async tasksInsert(tasklist: string, req: Task, opts: TasksInsertOptions = {}): Promise<Task> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/tasks`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    if (opts.previous !== undefined) {
      url.searchParams.append("previous", String(opts.previous));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Task;
  }

  /**
   * Returns all tasks in the specified task list.
   *
   * @param tasklist Task list identifier.
   */
  async tasksList(tasklist: string, opts: TasksListOptions = {}): Promise<Tasks> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/tasks`);
    if (opts.completedMax !== undefined) {
      url.searchParams.append("completedMax", String(opts.completedMax));
    }
    if (opts.completedMin !== undefined) {
      url.searchParams.append("completedMin", String(opts.completedMin));
    }
    if (opts.dueMax !== undefined) {
      url.searchParams.append("dueMax", String(opts.dueMax));
    }
    if (opts.dueMin !== undefined) {
      url.searchParams.append("dueMin", String(opts.dueMin));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showCompleted !== undefined) {
      url.searchParams.append("showCompleted", String(opts.showCompleted));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    if (opts.showHidden !== undefined) {
      url.searchParams.append("showHidden", String(opts.showHidden));
    }
    if (opts.updatedMin !== undefined) {
      url.searchParams.append("updatedMin", String(opts.updatedMin));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Tasks;
  }

  /**
   * Moves the specified task to another position in the task list. This can
   * include putting it as a child task under a new parent and/or move it to a
   * different position among its sibling tasks.
   *
   * @param task Task identifier.
   * @param tasklist Task list identifier.
   */
  async tasksMove(task: string, tasklist: string, opts: TasksMoveOptions = {}): Promise<Task> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/tasks/${ task }/move`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    if (opts.previous !== undefined) {
      url.searchParams.append("previous", String(opts.previous));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Task;
  }

  /**
   * Updates the specified task. This method supports patch semantics.
   *
   * @param task Task identifier.
   * @param tasklist Task list identifier.
   */
  async tasksPatch(task: string, tasklist: string, req: Task): Promise<Task> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/tasks/${ task }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Task;
  }

  /**
   * Updates the specified task.
   *
   * @param task Task identifier.
   * @param tasklist Task list identifier.
   */
  async tasksUpdate(task: string, tasklist: string, req: Task): Promise<Task> {
    const url = new URL(`${this.#baseUrl}tasks/v1/lists/${ tasklist }/tasks/${ task }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Task;
  }
}

export interface Task {
  /**
   * Completion date of the task (as a RFC 3339 timestamp). This field is
   * omitted if the task has not been completed.
   */
  completed?: string;
  /**
   * Flag indicating whether the task has been deleted. The default is False.
   */
  deleted?: boolean;
  /**
   * Due date of the task (as a RFC 3339 timestamp). Optional. The due date
   * only records date information; the time portion of the timestamp is
   * discarded when setting the due date. It isn't possible to read or write the
   * time that a task is due via the API.
   */
  due?: string;
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Flag indicating whether the task is hidden. This is the case if the task
   * had been marked completed when the task list was last cleared. The default
   * is False. This field is read-only.
   */
  hidden?: boolean;
  /**
   * Task identifier.
   */
  id?: string;
  /**
   * Type of the resource. This is always "tasks#task".
   */
  kind?: string;
  /**
   * Collection of links. This collection is read-only.
   */
  links?: {
    description?: string;
    link?: string;
    type?: string;
  }[];
  /**
   * Notes describing the task. Optional.
   */
  notes?: string;
  /**
   * Parent task identifier. This field is omitted if it is a top-level task.
   * This field is read-only. Use the "move" method to move the task under a
   * different parent or to the top level.
   */
  parent?: string;
  /**
   * String indicating the position of the task among its sibling tasks under
   * the same parent task or at the top level. If this string is greater than
   * another task's corresponding position string according to lexicographical
   * ordering, the task is positioned after the other task under the same parent
   * task (or at the top level). This field is read-only. Use the "move" method
   * to move the task to another position.
   */
  position?: string;
  /**
   * URL pointing to this task. Used to retrieve, update, or delete this task.
   */
  selfLink?: string;
  /**
   * Status of the task. This is either "needsAction" or "completed".
   */
  status?: string;
  /**
   * Title of the task.
   */
  title?: string;
  /**
   * Last modification time of the task (as a RFC 3339 timestamp).
   */
  updated?: string;
}

export interface TaskList {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Task list identifier.
   */
  id?: string;
  /**
   * Type of the resource. This is always "tasks#taskList".
   */
  kind?: string;
  /**
   * URL pointing to this task list. Used to retrieve, update, or delete this
   * task list.
   */
  selfLink?: string;
  /**
   * Title of the task list.
   */
  title?: string;
  /**
   * Last modification time of the task list (as a RFC 3339 timestamp).
   */
  updated?: string;
}

export interface TaskLists {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Collection of task lists.
   */
  items?: TaskList[];
  /**
   * Type of the resource. This is always "tasks#taskLists".
   */
  kind?: string;
  /**
   * Token that can be used to request the next page of this result.
   */
  nextPageToken?: string;
}

/**
 * Additional options for Tasks#tasklistsList.
 */
export interface TasklistsListOptions {
  /**
   * Maximum number of task lists returned on one page. Optional. The default
   * is 20 (max allowed: 100).
   */
  maxResults?: number;
  /**
   * Token specifying the result page to return. Optional.
   */
  pageToken?: string;
}

export interface Tasks {
  /**
   * ETag of the resource.
   */
  etag?: string;
  /**
   * Collection of tasks.
   */
  items?: Task[];
  /**
   * Type of the resource. This is always "tasks#tasks".
   */
  kind?: string;
  /**
   * Token used to access the next page of this result.
   */
  nextPageToken?: string;
}

/**
 * Additional options for Tasks#tasksInsert.
 */
export interface TasksInsertOptions {
  /**
   * Parent task identifier. If the task is created at the top level, this
   * parameter is omitted. Optional.
   */
  parent?: string;
  /**
   * Previous sibling task identifier. If the task is created at the first
   * position among its siblings, this parameter is omitted. Optional.
   */
  previous?: string;
}

/**
 * Additional options for Tasks#tasksList.
 */
export interface TasksListOptions {
  /**
   * Upper bound for a task's completion date (as a RFC 3339 timestamp) to
   * filter by. Optional. The default is not to filter by completion date.
   */
  completedMax?: string;
  /**
   * Lower bound for a task's completion date (as a RFC 3339 timestamp) to
   * filter by. Optional. The default is not to filter by completion date.
   */
  completedMin?: string;
  /**
   * Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by.
   * Optional. The default is not to filter by due date.
   */
  dueMax?: string;
  /**
   * Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by.
   * Optional. The default is not to filter by due date.
   */
  dueMin?: string;
  /**
   * Maximum number of task lists returned on one page. Optional. The default
   * is 20 (max allowed: 100).
   */
  maxResults?: number;
  /**
   * Token specifying the result page to return. Optional.
   */
  pageToken?: string;
  /**
   * Flag indicating whether completed tasks are returned in the result.
   * Optional. The default is True. Note that showHidden must also be True to
   * show tasks completed in first party clients, such as the web UI and
   * Google's mobile apps.
   */
  showCompleted?: boolean;
  /**
   * Flag indicating whether deleted tasks are returned in the result.
   * Optional. The default is False.
   */
  showDeleted?: boolean;
  /**
   * Flag indicating whether hidden tasks are returned in the result. Optional.
   * The default is False.
   */
  showHidden?: boolean;
  /**
   * Lower bound for a task's last modification time (as a RFC 3339 timestamp)
   * to filter by. Optional. The default is not to filter by last modification
   * time.
   */
  updatedMin?: string;
}

/**
 * Additional options for Tasks#tasksMove.
 */
export interface TasksMoveOptions {
  /**
   * New parent task identifier. If the task is moved to the top level, this
   * parameter is omitted. Optional.
   */
  parent?: string;
  /**
   * New previous sibling task identifier. If the task is moved to the first
   * position among its siblings, this parameter is omitted. Optional.
   */
  previous?: string;
}