// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Serverless VPC Access API Client for Deno
 * =========================================
 * 
 * API for managing VPC access connectors.
 * 
 * Docs: https://cloud.google.com/vpc/docs/configure-serverless-vpc-access
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * API for managing VPC access connectors.
 */
export class VPCAccess {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://vpcaccess.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a Serverless VPC Access connector, returns an operation.
   *
   * @param parent Required. The project and location in which the configuration should be created, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsConnectorsCreate(parent: string, req: Connector, opts: ProjectsLocationsConnectorsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectors`);
    if (opts.connectorId !== undefined) {
      url.searchParams.append("connectorId", String(opts.connectorId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a Serverless VPC Access connector. Returns NOT_FOUND if the
   * resource does not exist.
   *
   * @param name Required. Name of a Serverless VPC Access connector to delete.
   */
  async projectsLocationsConnectorsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a Serverless VPC Access connector. Returns NOT_FOUND if the resource
   * does not exist.
   *
   * @param name Required. Name of a Serverless VPC Access connector to get.
   */
  async projectsLocationsConnectorsGet(name: string): Promise<Connector> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Connector;
  }

  /**
   * Lists Serverless VPC Access connectors.
   *
   * @param parent Required. The project and location from which the routes should be listed.
   */
  async projectsLocationsConnectorsList(parent: string, opts: ProjectsLocationsConnectorsListOptions = {}): Promise<ListConnectorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectors`);
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
    return data as ListConnectorsResponse;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/locations`);
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
    return data as ListLocationsResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the
   * `name` binding allows API services to override the binding to use different
   * resource name schemes, such as `users/*\/operations`. To override the
   * binding, API services can add a binding such as
   * `"/v1/{name=users/*}/operations"` to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/operations`);
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
    return data as ListOperationsResponse;
  }
}

/**
 * Definition of a Serverless VPC Access connector.
 */
export interface Connector {
  /**
   * Output only. List of projects using the connector.
   */
  readonly connectedProjects?: string[];
  /**
   * The range of internal addresses that follows RFC 4632 notation. Example:
   * `10.132.0.0/28`.
   */
  ipCidrRange?: string;
  /**
   * Machine type of VM Instance underlying connector. Default is e2-micro
   */
  machineType?: string;
  /**
   * Maximum value of instances in autoscaling group underlying the connector.
   */
  maxInstances?: number;
  /**
   * Maximum throughput of the connector in Mbps. Default is 300, max is 1000.
   */
  maxThroughput?: number;
  /**
   * Minimum value of instances in autoscaling group underlying the connector.
   */
  minInstances?: number;
  /**
   * Minimum throughput of the connector in Mbps. Default and min is 200.
   */
  minThroughput?: number;
  /**
   * The resource name in the format `projects/*\/locations/*\/connectors/*`.
   */
  name?: string;
  /**
   * Name of a VPC network.
   */
  network?: string;
  /**
   * Output only. State of the VPC access connector.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "READY" | "CREATING" | "DELETING" | "ERROR" | "UPDATING";
  /**
   * The subnet in which to house the VPC Access Connector.
   */
  subnet?: Subnet;
}

/**
 * Response for listing Serverless VPC Access connectors.
 */
export interface ListConnectorsResponse {
  /**
   * List of Serverless VPC Access connectors.
   */
  connectors?: Connector[];
  /**
   * Continuation token.
   */
  nextPageToken?: string;
}

/**
 * The response message for Locations.ListLocations.
 */
export interface ListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: Location[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

/**
 * The response message for Operations.ListOperations.
 */
export interface ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: Operation[];
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface Location {
  /**
   * The friendly name for this location, typically a nearby city name. For
   * example, "Tokyo".
   */
  displayName?: string;
  /**
   * Cross-service attributes for the location. For example
   * {"cloud.googleapis.com/region": "us-east1"}
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The canonical id for this location. For example: `"us-east1"`.
   */
  locationId?: string;
  /**
   * Service-specific metadata. For example the available capacity at the given
   * location.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Resource name for the location, which may vary between implementations.
   * For example: `"projects/example-project/locations/us-east1"`
   */
  name?: string;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: Status;
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
 * Metadata for google.longrunning.Operation.
 */
export interface OperationMetadata {
  /**
   * Output only. Time when the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time when the operation completed.
   */
  readonly endTime?: Date;
  /**
   * Output only. Method that initiated the operation e.g.
   * google.cloud.vpcaccess.v1.Connectors.CreateConnector.
   */
  readonly method?: string;
  /**
   * Output only. Name of the resource that this operation is acting on e.g.
   * projects/my-project/locations/us-central1/connectors/v1.
   */
  readonly target?: string;
}

/**
 * Metadata for google.longrunning.Operation.
 */
export interface OperationMetadataV1Alpha1 {
  /**
   * Output only. Time when the operation completed.
   */
  readonly endTime?: Date;
  /**
   * Output only. Time when the operation was created.
   */
  readonly insertTime?: Date;
  /**
   * Output only. Method that initiated the operation e.g.
   * google.cloud.vpcaccess.v1alpha1.Connectors.CreateConnector.
   */
  readonly method?: string;
  /**
   * Output only. Name of the resource that this operation is acting on e.g.
   * projects/my-project/locations/us-central1/connectors/v1.
   */
  readonly target?: string;
}

/**
 * Metadata for google.longrunning.Operation.
 */
export interface OperationMetadataV1Beta1 {
  /**
   * Output only. Time when the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time when the operation completed.
   */
  readonly endTime?: Date;
  /**
   * Output only. Method that initiated the operation e.g.
   * google.cloud.vpcaccess.v1beta1.Connectors.CreateConnector.
   */
  readonly method?: string;
  /**
   * Output only. Name of the resource that this operation is acting on e.g.
   * projects/my-project/locations/us-central1/connectors/v1.
   */
  readonly target?: string;
}

/**
 * Additional options for VPCAccess#projectsLocationsConnectorsCreate.
 */
export interface ProjectsLocationsConnectorsCreateOptions {
  /**
   * Required. The ID to use for this connector.
   */
  connectorId?: string;
}

/**
 * Additional options for VPCAccess#projectsLocationsConnectorsList.
 */
export interface ProjectsLocationsConnectorsListOptions {
  /**
   * Maximum number of functions to return per call.
   */
  pageSize?: number;
  /**
   * Continuation token.
   */
  pageToken?: string;
}

/**
 * Additional options for VPCAccess#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like `"displayName=tokyo"`, and is documented in
   * more detail in [AIP-160](https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the `next_page_token` field in the response.
   * Send that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for VPCAccess#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
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
 * The subnet in which to house the connector
 */
export interface Subnet {
  /**
   * Subnet name (relative, not fully qualified). E.g. if the full subnet
   * selfLink is
   * https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/subnetworks/{subnetName}
   * the correct input for this field would be {subnetName}
   */
  name?: string;
  /**
   * Project in which the subnet exists. If not set, this project is assumed to
   * be the project for which the connector create request was issued.
   */
  projectId?: string;
}