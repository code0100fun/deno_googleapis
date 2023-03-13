// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Library Agent API Client for Deno
 * =================================
 * 
 * A simple Google Example Library API.
 * 
 * Docs: https://cloud.google.com/docs/quota
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * A simple Google Example Library API.
 */
export class LibraryAgent {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://libraryagent.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Borrow a book from the library. Returns the book if it is borrowed
   * successfully. Returns NOT_FOUND if the book does not exist in the library.
   * Returns quota exceeded error if the amount of books borrowed exceeds
   * allocation quota in any dimensions.
   *
   * @param name Required. The name of the book to borrow.
   */
  async shelvesBooksBorrow(name: string): Promise<GoogleExampleLibraryagentV1Book> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:borrow`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleExampleLibraryagentV1Book;
  }

  /**
   * Gets a book. Returns NOT_FOUND if the book does not exist.
   *
   * @param name Required. The name of the book to retrieve.
   */
  async shelvesBooksGet(name: string): Promise<GoogleExampleLibraryagentV1Book> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleExampleLibraryagentV1Book;
  }

  /**
   * Lists books in a shelf. The order is unspecified but deterministic. Newly
   * created books will not necessarily be added to the end of this list.
   * Returns NOT_FOUND if the shelf does not exist.
   *
   * @param parent Required. The name of the shelf whose books we'd like to list.
   */
  async shelvesBooksList(parent: string, opts: ShelvesBooksListOptions = {}): Promise<GoogleExampleLibraryagentV1ListBooksResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/books`);
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
    return data as GoogleExampleLibraryagentV1ListBooksResponse;
  }

  /**
   * Return a book to the library. Returns the book if it is returned to the
   * library successfully. Returns error if the book does not belong to the
   * library or the users didn't borrow before.
   *
   * @param name Required. The name of the book to return.
   */
  async shelvesBooksReturn(name: string): Promise<GoogleExampleLibraryagentV1Book> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:return`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleExampleLibraryagentV1Book;
  }

  /**
   * Gets a shelf. Returns NOT_FOUND if the shelf does not exist.
   *
   * @param name Required. The name of the shelf to retrieve.
   */
  async shelvesGet(name: string): Promise<GoogleExampleLibraryagentV1Shelf> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleExampleLibraryagentV1Shelf;
  }

  /**
   * Lists shelves. The order is unspecified but deterministic. Newly created
   * shelves will not necessarily be added to the end of this list.
   *
   */
  async shelvesList(opts: ShelvesListOptions = {}): Promise<GoogleExampleLibraryagentV1ListShelvesResponse> {
    const url = new URL(`${this.#baseUrl}v1/shelves`);
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
    return data as GoogleExampleLibraryagentV1ListShelvesResponse;
  }
}

/**
 * A single book in the library.
 */
export interface GoogleExampleLibraryagentV1Book {
  /**
   * The name of the book author.
   */
  author?: string;
  /**
   * The resource name of the book. Book names have the form
   * `shelves/{shelf_id}/books/{book_id}`. The name is ignored when creating a
   * book.
   */
  name?: string;
  /**
   * Value indicating whether the book has been read.
   */
  read?: boolean;
  /**
   * The title of the book.
   */
  title?: string;
}

/**
 * Response message for LibraryAgent.ListBooks.
 */
export interface GoogleExampleLibraryagentV1ListBooksResponse {
  /**
   * The list of books.
   */
  books?: GoogleExampleLibraryagentV1Book[];
  /**
   * A token to retrieve next page of results. Pass this value in the
   * ListBooksRequest.page_token field in the subsequent call to `ListBooks`
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for LibraryAgent.ListShelves.
 */
export interface GoogleExampleLibraryagentV1ListShelvesResponse {
  /**
   * A token to retrieve next page of results. Pass this value in the
   * ListShelvesRequest.page_token field in the subsequent call to `ListShelves`
   * method to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of shelves.
   */
  shelves?: GoogleExampleLibraryagentV1Shelf[];
}

/**
 * A Shelf contains a collection of books with a theme.
 */
export interface GoogleExampleLibraryagentV1Shelf {
  /**
   * Output only. The resource name of the shelf. Shelf names have the form
   * `shelves/{shelf_id}`. The name is ignored when creating a shelf.
   */
  name?: string;
  /**
   * The theme of the shelf
   */
  theme?: string;
}

/**
 * Additional options for LibraryAgent#shelvesBooksList.
 */
export interface ShelvesBooksListOptions {
  /**
   * Requested page size. Server may return fewer books than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListBooksResponse.next_page_token. returned from the
   * previous call to `ListBooks` method.
   */
  pageToken?: string;
}

/**
 * Additional options for LibraryAgent#shelvesList.
 */
export interface ShelvesListOptions {
  /**
   * Requested page size. Server may return fewer shelves than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return. Typically,
   * this is the value of ListShelvesResponse.next_page_token returned from the
   * previous call to `ListShelves` method.
   */
  pageToken?: string;
}