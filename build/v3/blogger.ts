// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Blogger API Client for Deno
 * ===========================
 * 
 * The Blogger API provides access to posts, comments and pages of a Blogger blog.
 * 
 * Docs: https://developers.google.com/blogger/docs/3.0/getting_started
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Blogger API provides access to posts, comments and pages of a Blogger
 * blog.
 */
export class Blogger {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://blogger.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets a blog by id.
   *
   */
  async blogsGet(blogId: string, opts: BlogsGetOptions = {}): Promise<Blog> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }`);
    if (opts.maxPosts !== undefined) {
      url.searchParams.append("maxPosts", String(opts.maxPosts));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBlog(data);
  }

  /**
   * Gets a blog by url.
   *
   */
  async blogsGetByUrl(opts: BlogsGetByUrlOptions = {}): Promise<Blog> {
    const url = new URL(`${this.#baseUrl}v3/blogs/byurl`);
    if (opts.url !== undefined) {
      url.searchParams.append("url", String(opts.url));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBlog(data);
  }

  /**
   * Lists blogs by user.
   *
   */
  async blogsListByUser(userId: string, opts: BlogsListByUserOptions = {}): Promise<BlogList> {
    const url = new URL(`${this.#baseUrl}v3/users/${ userId }/blogs`);
    if (opts.fetchUserInfo !== undefined) {
      url.searchParams.append("fetchUserInfo", String(opts.fetchUserInfo));
    }
    if (opts.role !== undefined) {
      url.searchParams.append("role", String(opts.role));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBlogList(data);
  }

  /**
   * Gets one blog and user info pair by blog id and user id.
   *
   */
  async blogUserInfosGet(blogId: string, userId: string, opts: BlogUserInfosGetOptions = {}): Promise<BlogUserInfo> {
    const url = new URL(`${this.#baseUrl}v3/users/${ userId }/blogs/${ blogId }`);
    if (opts.maxPosts !== undefined) {
      url.searchParams.append("maxPosts", String(opts.maxPosts));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBlogUserInfo(data);
  }

  /**
   * Marks a comment as not spam by blog id, post id and comment id.
   *
   */
  async commentsApprove(blogId: string, commentId: string, postId: string): Promise<Comment> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/comments/${ commentId }/approve`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Comment;
  }

  /**
   * Deletes a comment by blog id, post id and comment id.
   *
   */
  async commentsDelete(blogId: string, commentId: string, postId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/comments/${ commentId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a comment by id.
   *
   */
  async commentsGet(blogId: string, commentId: string, postId: string, opts: CommentsGetOptions = {}): Promise<Comment> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/comments/${ commentId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Comment;
  }

  /**
   * Lists comments.
   *
   */
  async commentsList(blogId: string, postId: string, opts: CommentsListOptions = {}): Promise<CommentList> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/comments`);
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.fetchBodies !== undefined) {
      url.searchParams.append("fetchBodies", String(opts.fetchBodies));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CommentList;
  }

  /**
   * Lists comments by blog.
   *
   */
  async commentsListByBlog(blogId: string, opts: CommentsListByBlogOptions = {}): Promise<CommentList> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/comments`);
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.fetchBodies !== undefined) {
      url.searchParams.append("fetchBodies", String(opts.fetchBodies));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CommentList;
  }

  /**
   * Marks a comment as spam by blog id, post id and comment id.
   *
   */
  async commentsMarkAsSpam(blogId: string, commentId: string, postId: string): Promise<Comment> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/comments/${ commentId }/spam`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Comment;
  }

  /**
   * Removes the content of a comment by blog id, post id and comment id.
   *
   */
  async commentsRemoveContent(blogId: string, commentId: string, postId: string): Promise<Comment> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/comments/${ commentId }/removecontent`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Comment;
  }

  /**
   * Deletes a page by blog id and page id.
   *
   */
  async pagesDelete(blogId: string, pageId: string, opts: PagesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages/${ pageId }`);
    if (opts.useTrash !== undefined) {
      url.searchParams.append("useTrash", String(opts.useTrash));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a page by blog id and page id.
   *
   */
  async pagesGet(blogId: string, pageId: string, opts: PagesGetOptions = {}): Promise<Page> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages/${ pageId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Page;
  }

  /**
   * Inserts a page.
   *
   */
  async pagesInsert(blogId: string, req: Page, opts: PagesInsertOptions = {}): Promise<Page> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages`);
    if (opts.isDraft !== undefined) {
      url.searchParams.append("isDraft", String(opts.isDraft));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Page;
  }

  /**
   * Lists pages.
   *
   */
  async pagesList(blogId: string, opts: PagesListOptions = {}): Promise<PageList> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages`);
    if (opts.fetchBodies !== undefined) {
      url.searchParams.append("fetchBodies", String(opts.fetchBodies));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PageList;
  }

  /**
   * Patches a page.
   *
   */
  async pagesPatch(blogId: string, pageId: string, req: Page, opts: PagesPatchOptions = {}): Promise<Page> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages/${ pageId }`);
    if (opts.publish !== undefined) {
      url.searchParams.append("publish", String(opts.publish));
    }
    if (opts.revert !== undefined) {
      url.searchParams.append("revert", String(opts.revert));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Page;
  }

  /**
   * Publishes a page.
   *
   */
  async pagesPublish(blogId: string, pageId: string): Promise<Page> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages/${ pageId }/publish`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Page;
  }

  /**
   * Reverts a published or scheduled page to draft state.
   *
   */
  async pagesRevert(blogId: string, pageId: string): Promise<Page> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages/${ pageId }/revert`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Page;
  }

  /**
   * Updates a page by blog id and page id.
   *
   */
  async pagesUpdate(blogId: string, pageId: string, req: Page, opts: PagesUpdateOptions = {}): Promise<Page> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pages/${ pageId }`);
    if (opts.publish !== undefined) {
      url.searchParams.append("publish", String(opts.publish));
    }
    if (opts.revert !== undefined) {
      url.searchParams.append("revert", String(opts.revert));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Page;
  }

  /**
   * Gets page views by blog id.
   *
   */
  async pageViewsGet(blogId: string, opts: PageViewsGetOptions = {}): Promise<Pageviews> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/pageviews`);
    if (opts.range !== undefined) {
      url.searchParams.append("range", String(opts.range));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePageviews(data);
  }

  /**
   * Deletes a post by blog id and post id.
   *
   */
  async postsDelete(blogId: string, postId: string, opts: PostsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }`);
    if (opts.useTrash !== undefined) {
      url.searchParams.append("useTrash", String(opts.useTrash));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a post by blog id and post id
   *
   */
  async postsGet(blogId: string, postId: string, opts: PostsGetOptions = {}): Promise<Post> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }`);
    if (opts.fetchBody !== undefined) {
      url.searchParams.append("fetchBody", String(opts.fetchBody));
    }
    if (opts.fetchImages !== undefined) {
      url.searchParams.append("fetchImages", String(opts.fetchImages));
    }
    if (opts.maxComments !== undefined) {
      url.searchParams.append("maxComments", String(opts.maxComments));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePost(data);
  }

  /**
   * Gets a post by path.
   *
   */
  async postsGetByPath(blogId: string, opts: PostsGetByPathOptions = {}): Promise<Post> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/bypath`);
    if (opts.maxComments !== undefined) {
      url.searchParams.append("maxComments", String(opts.maxComments));
    }
    if (opts.path !== undefined) {
      url.searchParams.append("path", String(opts.path));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePost(data);
  }

  /**
   * Inserts a post.
   *
   */
  async postsInsert(blogId: string, req: Post, opts: PostsInsertOptions = {}): Promise<Post> {
    req = serializePost(req);
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts`);
    if (opts.fetchBody !== undefined) {
      url.searchParams.append("fetchBody", String(opts.fetchBody));
    }
    if (opts.fetchImages !== undefined) {
      url.searchParams.append("fetchImages", String(opts.fetchImages));
    }
    if (opts.isDraft !== undefined) {
      url.searchParams.append("isDraft", String(opts.isDraft));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePost(data);
  }

  /**
   * Lists posts.
   *
   */
  async postsList(blogId: string, opts: PostsListOptions = {}): Promise<PostList> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts`);
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.fetchBodies !== undefined) {
      url.searchParams.append("fetchBodies", String(opts.fetchBodies));
    }
    if (opts.fetchImages !== undefined) {
      url.searchParams.append("fetchImages", String(opts.fetchImages));
    }
    if (opts.labels !== undefined) {
      url.searchParams.append("labels", String(opts.labels));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.sortOption !== undefined) {
      url.searchParams.append("sortOption", String(opts.sortOption));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePostList(data);
  }

  /**
   * Patches a post.
   *
   */
  async postsPatch(blogId: string, postId: string, req: Post, opts: PostsPatchOptions = {}): Promise<Post> {
    req = serializePost(req);
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }`);
    if (opts.fetchBody !== undefined) {
      url.searchParams.append("fetchBody", String(opts.fetchBody));
    }
    if (opts.fetchImages !== undefined) {
      url.searchParams.append("fetchImages", String(opts.fetchImages));
    }
    if (opts.maxComments !== undefined) {
      url.searchParams.append("maxComments", String(opts.maxComments));
    }
    if (opts.publish !== undefined) {
      url.searchParams.append("publish", String(opts.publish));
    }
    if (opts.revert !== undefined) {
      url.searchParams.append("revert", String(opts.revert));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializePost(data);
  }

  /**
   * Publishes a post.
   *
   */
  async postsPublish(blogId: string, postId: string, opts: PostsPublishOptions = {}): Promise<Post> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/publish`);
    if (opts.publishDate !== undefined) {
      url.searchParams.append("publishDate", String(opts.publishDate));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializePost(data);
  }

  /**
   * Reverts a published or scheduled post to draft state.
   *
   */
  async postsRevert(blogId: string, postId: string): Promise<Post> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }/revert`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializePost(data);
  }

  /**
   * Searches for posts matching given query terms in the specified blog.
   *
   */
  async postsSearch(blogId: string, opts: PostsSearchOptions = {}): Promise<PostList> {
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/search`);
    if (opts.fetchBodies !== undefined) {
      url.searchParams.append("fetchBodies", String(opts.fetchBodies));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.q !== undefined) {
      url.searchParams.append("q", String(opts.q));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePostList(data);
  }

  /**
   * Updates a post by blog id and post id.
   *
   */
  async postsUpdate(blogId: string, postId: string, req: Post, opts: PostsUpdateOptions = {}): Promise<Post> {
    req = serializePost(req);
    const url = new URL(`${this.#baseUrl}v3/blogs/${ blogId }/posts/${ postId }`);
    if (opts.fetchBody !== undefined) {
      url.searchParams.append("fetchBody", String(opts.fetchBody));
    }
    if (opts.fetchImages !== undefined) {
      url.searchParams.append("fetchImages", String(opts.fetchImages));
    }
    if (opts.maxComments !== undefined) {
      url.searchParams.append("maxComments", String(opts.maxComments));
    }
    if (opts.publish !== undefined) {
      url.searchParams.append("publish", String(opts.publish));
    }
    if (opts.revert !== undefined) {
      url.searchParams.append("revert", String(opts.revert));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePost(data);
  }

  /**
   * Gets one post and user info pair, by post_id and user_id.
   *
   */
  async postUserInfosGet(blogId: string, postId: string, userId: string, opts: PostUserInfosGetOptions = {}): Promise<PostUserInfo> {
    const url = new URL(`${this.#baseUrl}v3/users/${ userId }/blogs/${ blogId }/posts/${ postId }`);
    if (opts.maxComments !== undefined) {
      url.searchParams.append("maxComments", String(opts.maxComments));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePostUserInfo(data);
  }

  /**
   * Lists post and user info pairs.
   *
   */
  async postUserInfosList(blogId: string, userId: string, opts: PostUserInfosListOptions = {}): Promise<PostUserInfosList> {
    const url = new URL(`${this.#baseUrl}v3/users/${ userId }/blogs/${ blogId }/posts`);
    if (opts.endDate !== undefined) {
      url.searchParams.append("endDate", String(opts.endDate));
    }
    if (opts.fetchBodies !== undefined) {
      url.searchParams.append("fetchBodies", String(opts.fetchBodies));
    }
    if (opts.labels !== undefined) {
      url.searchParams.append("labels", String(opts.labels));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startDate !== undefined) {
      url.searchParams.append("startDate", String(opts.startDate));
    }
    if (opts.status !== undefined) {
      url.searchParams.append("status", String(opts.status));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePostUserInfosList(data);
  }

  /**
   * Gets one user by user_id.
   *
   */
  async usersGet(userId: string): Promise<User> {
    const url = new URL(`${this.#baseUrl}v3/users/${ userId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as User;
  }
}

export interface Blog {
  /**
   * The JSON custom meta-data for the Blog.
   */
  customMetaData?: string;
  /**
   * The description of this blog. This is displayed underneath the title.
   */
  description?: string;
  /**
   * The identifier for this resource.
   */
  id?: string;
  /**
   * The kind of this entry. Always blogger#blog.
   */
  kind?: string;
  /**
   * The locale this Blog is set to.
   */
  locale?: {
    country?: string;
    language?: string;
    variant?: string;
  };
  /**
   * The name of this blog. This is displayed as the title.
   */
  name?: string;
  /**
   * The container of pages in this blog.
   */
  pages?: {
    selfLink?: string;
    totalItems?: number;
  };
  /**
   * The container of posts in this blog.
   */
  posts?: {
    items?: Post[];
    selfLink?: string;
    totalItems?: number;
  };
  /**
   * RFC 3339 date-time when this blog was published.
   */
  published?: string;
  /**
   * The API REST URL to fetch this resource from.
   */
  selfLink?: string;
  /**
   * The status of the blog.
   */
  status?:  | "LIVE" | "DELETED";
  /**
   * RFC 3339 date-time when this blog was last updated.
   */
  updated?: string;
  /**
   * The URL where this blog is published.
   */
  url?: string;
}

function serializeBlog(data: any): Blog {
  return {
    ...data,
    posts: data["posts"] !== undefined ? {
      ...data["posts"],
      items: data["posts"]["items"] !== undefined ? data["posts"]["items"].map((item: any) => (serializePost(item))) : undefined,
    } : undefined,
  };
}

function deserializeBlog(data: any): Blog {
  return {
    ...data,
    posts: data["posts"] !== undefined ? {
      ...data["posts"],
      items: data["posts"]["items"] !== undefined ? data["posts"]["items"].map((item: any) => (deserializePost(item))) : undefined,
    } : undefined,
  };
}

export interface BlogList {
  /**
   * Admin level list of blog per-user information.
   */
  blogUserInfos?: BlogUserInfo[];
  /**
   * The list of Blogs this user has Authorship or Admin rights over.
   */
  items?: Blog[];
  /**
   * The kind of this entity. Always blogger#blogList.
   */
  kind?: string;
}

function serializeBlogList(data: any): BlogList {
  return {
    ...data,
    blogUserInfos: data["blogUserInfos"] !== undefined ? data["blogUserInfos"].map((item: any) => (serializeBlogUserInfo(item))) : undefined,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeBlog(item))) : undefined,
  };
}

function deserializeBlogList(data: any): BlogList {
  return {
    ...data,
    blogUserInfos: data["blogUserInfos"] !== undefined ? data["blogUserInfos"].map((item: any) => (deserializeBlogUserInfo(item))) : undefined,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeBlog(item))) : undefined,
  };
}

export interface BlogPerUserInfo {
  /**
   * ID of the Blog resource.
   */
  blogId?: string;
  /**
   * True if the user has Admin level access to the blog.
   */
  hasAdminAccess?: boolean;
  /**
   * The kind of this entity. Always blogger#blogPerUserInfo.
   */
  kind?: string;
  /**
   * The Photo Album Key for the user when adding photos to the blog.
   */
  photosAlbumKey?: string;
  /**
   * Access permissions that the user has for the blog (ADMIN, AUTHOR, or
   * READER).
   */
  role?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
  /**
   * ID of the User.
   */
  userId?: string;
}

/**
 * Additional options for Blogger#blogsGetByUrl.
 */
export interface BlogsGetByUrlOptions {
  url: string;
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#blogsGet.
 */
export interface BlogsGetOptions {
  maxPosts?: number;
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#blogsListByUser.
 */
export interface BlogsListByUserOptions {
  fetchUserInfo?: boolean;
  role?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
  /**
   * Default value of status is LIVE.
   */
  status?:  | "LIVE" | "DELETED";
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

export interface BlogUserInfo {
  /**
   * The Blog resource.
   */
  blog?: Blog;
  /**
   * Information about a User for the Blog.
   */
  blog_user_info?: BlogPerUserInfo;
  /**
   * The kind of this entity. Always blogger#blogUserInfo.
   */
  kind?: string;
}

function serializeBlogUserInfo(data: any): BlogUserInfo {
  return {
    ...data,
    blog: data["blog"] !== undefined ? serializeBlog(data["blog"]) : undefined,
  };
}

function deserializeBlogUserInfo(data: any): BlogUserInfo {
  return {
    ...data,
    blog: data["blog"] !== undefined ? deserializeBlog(data["blog"]) : undefined,
  };
}

/**
 * Additional options for Blogger#blogUserInfosGet.
 */
export interface BlogUserInfosGetOptions {
  maxPosts?: number;
}

export interface Comment {
  /**
   * The author of this Comment.
   */
  author?: {
    displayName?: string;
    id?: string;
    image?: {
      url?: string;
    };
    url?: string;
  };
  /**
   * Data about the blog containing this comment.
   */
  blog?: {
    id?: string;
  };
  /**
   * The actual content of the comment. May include HTML markup.
   */
  content?: string;
  /**
   * The identifier for this resource.
   */
  id?: string;
  /**
   * Data about the comment this is in reply to.
   */
  inReplyTo?: {
    id?: string;
  };
  /**
   * The kind of this entry. Always blogger#comment.
   */
  kind?: string;
  /**
   * Data about the post containing this comment.
   */
  post?: {
    id?: string;
  };
  /**
   * RFC 3339 date-time when this comment was published.
   */
  published?: string;
  /**
   * The API REST URL to fetch this resource from.
   */
  selfLink?: string;
  /**
   * The status of the comment (only populated for admin users).
   */
  status?:  | "LIVE" | "EMPTIED" | "PENDING" | "SPAM";
  /**
   * RFC 3339 date-time when this comment was last updated.
   */
  updated?: string;
}

export interface CommentList {
  /**
   * Etag of the response.
   */
  etag?: string;
  /**
   * The List of Comments for a Post.
   */
  items?: Comment[];
  /**
   * The kind of this entry. Always blogger#commentList.
   */
  kind?: string;
  /**
   * Pagination token to fetch the next page, if one exists.
   */
  nextPageToken?: string;
  /**
   * Pagination token to fetch the previous page, if one exists.
   */
  prevPageToken?: string;
}

/**
 * Additional options for Blogger#commentsGet.
 */
export interface CommentsGetOptions {
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#commentsListByBlog.
 */
export interface CommentsListByBlogOptions {
  endDate?: string;
  fetchBodies?: boolean;
  maxResults?: number;
  pageToken?: string;
  startDate?: string;
  status?:  | "LIVE" | "EMPTIED" | "PENDING" | "SPAM";
}

/**
 * Additional options for Blogger#commentsList.
 */
export interface CommentsListOptions {
  endDate?: string;
  fetchBodies?: boolean;
  maxResults?: number;
  pageToken?: string;
  startDate?: string;
  status?:  | "LIVE" | "EMPTIED" | "PENDING" | "SPAM";
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

export interface Page {
  /**
   * The author of this Page.
   */
  author?: {
    displayName?: string;
    id?: string;
    image?: {
      url?: string;
    };
    url?: string;
  };
  /**
   * Data about the blog containing this Page.
   */
  blog?: {
    id?: string;
  };
  /**
   * The body content of this Page, in HTML.
   */
  content?: string;
  /**
   * Etag of the resource.
   */
  etag?: string;
  /**
   * The identifier for this resource.
   */
  id?: string;
  /**
   * The kind of this entity. Always blogger#page.
   */
  kind?: string;
  /**
   * RFC 3339 date-time when this Page was published.
   */
  published?: string;
  /**
   * The API REST URL to fetch this resource from.
   */
  selfLink?: string;
  /**
   * The status of the page for admin resources (either LIVE or DRAFT).
   */
  status?:  | "LIVE" | "DRAFT" | "SOFT_TRASHED";
  /**
   * The title of this entity. This is the name displayed in the Admin user
   * interface.
   */
  title?: string;
  /**
   * RFC 3339 date-time when this Page was trashed.
   */
  trashed?: string;
  /**
   * RFC 3339 date-time when this Page was last updated.
   */
  updated?: string;
  /**
   * The URL that this Page is displayed at.
   */
  url?: string;
}

export interface PageList {
  /**
   * Etag of the response.
   */
  etag?: string;
  /**
   * The list of Pages for a Blog.
   */
  items?: Page[];
  /**
   * The kind of this entity. Always blogger#pageList.
   */
  kind?: string;
  /**
   * Pagination token to fetch the next page, if one exists.
   */
  nextPageToken?: string;
}

/**
 * Additional options for Blogger#pagesDelete.
 */
export interface PagesDeleteOptions {
  /**
   * Move to Trash if possible
   */
  useTrash?: boolean;
}

/**
 * Additional options for Blogger#pagesGet.
 */
export interface PagesGetOptions {
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#pagesInsert.
 */
export interface PagesInsertOptions {
  isDraft?: boolean;
}

/**
 * Additional options for Blogger#pagesList.
 */
export interface PagesListOptions {
  fetchBodies?: boolean;
  maxResults?: number;
  pageToken?: string;
  status?:  | "LIVE" | "DRAFT" | "SOFT_TRASHED";
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#pagesPatch.
 */
export interface PagesPatchOptions {
  publish?: boolean;
  revert?: boolean;
}

/**
 * Additional options for Blogger#pagesUpdate.
 */
export interface PagesUpdateOptions {
  publish?: boolean;
  revert?: boolean;
}

export interface Pageviews {
  /**
   * Blog Id.
   */
  blogId?: string;
  /**
   * The container of posts in this blog.
   */
  counts?: {
    count?: bigint;
    timeRange?:  | "ALL_TIME" | "THIRTY_DAYS" | "SEVEN_DAYS";
  }[];
  /**
   * The kind of this entry. Always blogger#page_views.
   */
  kind?: string;
}

function serializePageviews(data: any): Pageviews {
  return {
    ...data,
    counts: data["counts"] !== undefined ? data["counts"].map((item: any) => ({
      ...item,
      count: item["count"] !== undefined ? String(item["count"]) : undefined,
    })) : undefined,
  };
}

function deserializePageviews(data: any): Pageviews {
  return {
    ...data,
    counts: data["counts"] !== undefined ? data["counts"].map((item: any) => ({
      ...item,
      count: item["count"] !== undefined ? BigInt(item["count"]) : undefined,
    })) : undefined,
  };
}

/**
 * Additional options for Blogger#pageViewsGet.
 */
export interface PageViewsGetOptions {
  range?:  | "all" | "30DAYS" | "7DAYS";
}

export interface Post {
  /**
   * The author of this Post.
   */
  author?: {
    displayName?: string;
    id?: string;
    image?: {
      url?: string;
    };
    url?: string;
  };
  /**
   * Data about the blog containing this Post.
   */
  blog?: {
    id?: string;
  };
  /**
   * The content of the Post. May contain HTML markup.
   */
  content?: string;
  /**
   * The JSON meta-data for the Post.
   */
  customMetaData?: string;
  /**
   * Etag of the resource.
   */
  etag?: string;
  /**
   * The identifier of this Post.
   */
  id?: string;
  /**
   * Display image for the Post.
   */
  images?: {
    url?: string;
  }[];
  /**
   * The kind of this entity. Always blogger#post.
   */
  kind?: string;
  /**
   * The list of labels this Post was tagged with.
   */
  labels?: string[];
  /**
   * The location for geotagged posts.
   */
  location?: {
    lat?: number;
    lng?: number;
    name?: string;
    span?: string;
  };
  /**
   * RFC 3339 date-time when this Post was published.
   */
  published?: string;
  /**
   * Comment control and display setting for readers of this post.
   */
  readerComments?:  | "ALLOW" | "DONT_ALLOW_SHOW_EXISTING" | "DONT_ALLOW_HIDE_EXISTING";
  /**
   * The container of comments on this Post.
   */
  replies?: {
    items?: Comment[];
    selfLink?: string;
    totalItems?: bigint;
  };
  /**
   * The API REST URL to fetch this resource from.
   */
  selfLink?: string;
  /**
   * Status of the post. Only set for admin-level requests.
   */
  status?:  | "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED";
  /**
   * The title of the Post.
   */
  title?: string;
  /**
   * The title link URL, similar to atom's related link.
   */
  titleLink?: string;
  /**
   * RFC 3339 date-time when this Post was last trashed.
   */
  trashed?: string;
  /**
   * RFC 3339 date-time when this Post was last updated.
   */
  updated?: string;
  /**
   * The URL where this Post is displayed.
   */
  url?: string;
}

function serializePost(data: any): Post {
  return {
    ...data,
    replies: data["replies"] !== undefined ? {
      ...data["replies"],
      totalItems: data["replies"]["totalItems"] !== undefined ? String(data["replies"]["totalItems"]) : undefined,
    } : undefined,
  };
}

function deserializePost(data: any): Post {
  return {
    ...data,
    replies: data["replies"] !== undefined ? {
      ...data["replies"],
      totalItems: data["replies"]["totalItems"] !== undefined ? BigInt(data["replies"]["totalItems"]) : undefined,
    } : undefined,
  };
}

export interface PostList {
  /**
   * Etag of the response.
   */
  etag?: string;
  /**
   * The list of Posts for this Blog.
   */
  items?: Post[];
  /**
   * The kind of this entity. Always blogger#postList.
   */
  kind?: string;
  /**
   * Pagination token to fetch the next page, if one exists.
   */
  nextPageToken?: string;
  /**
   * Pagination token to fetch the previous page, if one exists.
   */
  prevPageToken?: string;
}

function serializePostList(data: any): PostList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePost(item))) : undefined,
  };
}

function deserializePostList(data: any): PostList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePost(item))) : undefined,
  };
}

export interface PostPerUserInfo {
  /**
   * ID of the Blog that the post resource belongs to.
   */
  blogId?: string;
  /**
   * True if the user has Author level access to the post.
   */
  hasEditAccess?: boolean;
  /**
   * The kind of this entity. Always blogger#postPerUserInfo.
   */
  kind?: string;
  /**
   * ID of the Post resource.
   */
  postId?: string;
  /**
   * ID of the User.
   */
  userId?: string;
}

/**
 * Additional options for Blogger#postsDelete.
 */
export interface PostsDeleteOptions {
  /**
   * Move to Trash if possible
   */
  useTrash?: boolean;
}

/**
 * Additional options for Blogger#postsGetByPath.
 */
export interface PostsGetByPathOptions {
  maxComments?: number;
  path: string;
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#postsGet.
 */
export interface PostsGetOptions {
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#postsInsert.
 */
export interface PostsInsertOptions {
  fetchBody?: boolean;
  fetchImages?: boolean;
  isDraft?: boolean;
}

/**
 * Additional options for Blogger#postsList.
 */
export interface PostsListOptions {
  endDate?: string;
  fetchBodies?: boolean;
  fetchImages?: boolean;
  labels?: string;
  maxResults?: number;
  orderBy?:  | "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED";
  pageToken?: string;
  /**
   * Sort direction applied to post list.
   */
  sortOption?:  | "SORT_OPTION_UNSPECIFIED" | "DESCENDING" | "ASCENDING";
  startDate?: string;
  status?:  | "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED";
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

/**
 * Additional options for Blogger#postsPatch.
 */
export interface PostsPatchOptions {
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  publish?: boolean;
  revert?: boolean;
}

/**
 * Additional options for Blogger#postsPublish.
 */
export interface PostsPublishOptions {
  publishDate?: string;
}

/**
 * Additional options for Blogger#postsSearch.
 */
export interface PostsSearchOptions {
  fetchBodies?: boolean;
  orderBy?:  | "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED";
  q: string;
}

/**
 * Additional options for Blogger#postsUpdate.
 */
export interface PostsUpdateOptions {
  fetchBody?: boolean;
  fetchImages?: boolean;
  maxComments?: number;
  publish?: boolean;
  revert?: boolean;
}

export interface PostUserInfo {
  /**
   * The kind of this entity. Always blogger#postUserInfo.
   */
  kind?: string;
  /**
   * The Post resource.
   */
  post?: Post;
  /**
   * Information about a User for the Post.
   */
  post_user_info?: PostPerUserInfo;
}

function serializePostUserInfo(data: any): PostUserInfo {
  return {
    ...data,
    post: data["post"] !== undefined ? serializePost(data["post"]) : undefined,
  };
}

function deserializePostUserInfo(data: any): PostUserInfo {
  return {
    ...data,
    post: data["post"] !== undefined ? deserializePost(data["post"]) : undefined,
  };
}

/**
 * Additional options for Blogger#postUserInfosGet.
 */
export interface PostUserInfosGetOptions {
  maxComments?: number;
}

export interface PostUserInfosList {
  /**
   * The list of Posts with User information for the post, for this Blog.
   */
  items?: PostUserInfo[];
  /**
   * The kind of this entity. Always blogger#postList.
   */
  kind?: string;
  /**
   * Pagination token to fetch the next page, if one exists.
   */
  nextPageToken?: string;
}

function serializePostUserInfosList(data: any): PostUserInfosList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializePostUserInfo(item))) : undefined,
  };
}

function deserializePostUserInfosList(data: any): PostUserInfosList {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializePostUserInfo(item))) : undefined,
  };
}

/**
 * Additional options for Blogger#postUserInfosList.
 */
export interface PostUserInfosListOptions {
  endDate?: string;
  fetchBodies?: boolean;
  labels?: string;
  maxResults?: number;
  orderBy?:  | "ORDER_BY_UNSPECIFIED" | "PUBLISHED" | "UPDATED";
  pageToken?: string;
  startDate?: string;
  status?:  | "LIVE" | "DRAFT" | "SCHEDULED" | "SOFT_TRASHED";
  view?:  | "VIEW_TYPE_UNSPECIFIED" | "READER" | "AUTHOR" | "ADMIN";
}

export interface User {
  /**
   * Profile summary information.
   */
  about?: string;
  /**
   * The container of blogs for this user.
   */
  blogs?: {
    selfLink?: string;
  };
  /**
   * The timestamp of when this profile was created, in seconds since epoch.
   */
  created?: string;
  /**
   * The display name.
   */
  displayName?: string;
  /**
   * The identifier for this User.
   */
  id?: string;
  /**
   * The kind of this entity. Always blogger#user.
   */
  kind?: string;
  /**
   * This user's locale
   */
  locale?: {
    country?: string;
    language?: string;
    variant?: string;
  };
  /**
   * The API REST URL to fetch this resource from.
   */
  selfLink?: string;
  /**
   * The user's profile page.
   */
  url?: string;
}