// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Traffic Director API Client for Deno
 * ====================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/traffic-director
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class TrafficDirector {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://trafficdirector.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  async discoveryClient_status(req: ClientStatusRequest): Promise<ClientStatusResponse> {
    const url = new URL(`${this.#baseUrl}v2/discovery:client_status`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeClientStatusResponse(data);
  }
}

/**
 * Addresses specify either a logical or physical address and port, which are
 * used to tell Envoy where to bind/listen, connect to upstream and find
 * management servers.
 */
export interface Address {
  pipe?: Pipe;
  socketAddress?: SocketAddress;
}

/**
 * BuildVersion combines SemVer version of extension with free-form build
 * information (i.e. 'alpha', 'private-build') as a set of strings.
 */
export interface BuildVersion {
  /**
   * Free-form build information. Envoy defines several well known keys in the
   * source/common/version/version.h file
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * SemVer version of extension.
   */
  version?: SemanticVersion;
}

/**
 * All xds configs for a particular client.
 */
export interface ClientConfig {
  /**
   * Node for a particular client.
   */
  node?: Node;
  xdsConfig?: PerXdsConfig[];
}

function serializeClientConfig(data: any): ClientConfig {
  return {
    ...data,
    xdsConfig: data["xdsConfig"] !== undefined ? data["xdsConfig"].map((item: any) => (serializePerXdsConfig(item))) : undefined,
  };
}

function deserializeClientConfig(data: any): ClientConfig {
  return {
    ...data,
    xdsConfig: data["xdsConfig"] !== undefined ? data["xdsConfig"].map((item: any) => (deserializePerXdsConfig(item))) : undefined,
  };
}

/**
 * Request for client status of clients identified by a list of NodeMatchers.
 */
export interface ClientStatusRequest {
  /**
   * Management server can use these match criteria to identify clients. The
   * match follows OR semantics.
   */
  nodeMatchers?: NodeMatcher[];
}

export interface ClientStatusResponse {
  /**
   * Client configs for the clients specified in the ClientStatusRequest.
   */
  config?: ClientConfig[];
}

function serializeClientStatusResponse(data: any): ClientStatusResponse {
  return {
    ...data,
    config: data["config"] !== undefined ? data["config"].map((item: any) => (serializeClientConfig(item))) : undefined,
  };
}

function deserializeClientStatusResponse(data: any): ClientStatusResponse {
  return {
    ...data,
    config: data["config"] !== undefined ? data["config"].map((item: any) => (deserializeClientConfig(item))) : undefined,
  };
}

/**
 * Envoy's cluster manager fills this message with all currently known
 * clusters. Cluster configuration information can be used to recreate an Envoy
 * configuration by populating all clusters as static clusters or by returning
 * them in a CDS response.
 */
export interface ClustersConfigDump {
  /**
   * The dynamically loaded active clusters. These are clusters that are
   * available to service data plane traffic.
   */
  dynamicActiveClusters?: DynamicCluster[];
  /**
   * The dynamically loaded warming clusters. These are clusters that are
   * currently undergoing warming in preparation to service data plane traffic.
   * Note that if attempting to recreate an Envoy configuration from a
   * configuration dump, the warming clusters should generally be discarded.
   */
  dynamicWarmingClusters?: DynamicCluster[];
  /**
   * The statically loaded cluster configs.
   */
  staticClusters?: StaticCluster[];
  /**
   * This is the :ref:`version_info ` in the last processed CDS discovery
   * response. If there are only static bootstrap clusters, this field will be
   * "".
   */
  versionInfo?: string;
}

function serializeClustersConfigDump(data: any): ClustersConfigDump {
  return {
    ...data,
    dynamicActiveClusters: data["dynamicActiveClusters"] !== undefined ? data["dynamicActiveClusters"].map((item: any) => (serializeDynamicCluster(item))) : undefined,
    dynamicWarmingClusters: data["dynamicWarmingClusters"] !== undefined ? data["dynamicWarmingClusters"].map((item: any) => (serializeDynamicCluster(item))) : undefined,
    staticClusters: data["staticClusters"] !== undefined ? data["staticClusters"].map((item: any) => (serializeStaticCluster(item))) : undefined,
  };
}

function deserializeClustersConfigDump(data: any): ClustersConfigDump {
  return {
    ...data,
    dynamicActiveClusters: data["dynamicActiveClusters"] !== undefined ? data["dynamicActiveClusters"].map((item: any) => (deserializeDynamicCluster(item))) : undefined,
    dynamicWarmingClusters: data["dynamicWarmingClusters"] !== undefined ? data["dynamicWarmingClusters"].map((item: any) => (deserializeDynamicCluster(item))) : undefined,
    staticClusters: data["staticClusters"] !== undefined ? data["staticClusters"].map((item: any) => (deserializeStaticCluster(item))) : undefined,
  };
}

/**
 * Specifies the way to match a double value.
 */
export interface DoubleMatcher {
  /**
   * If specified, the input double value must be equal to the value specified
   * here.
   */
  exact?: number;
  /**
   * If specified, the input double value must be in the range specified here.
   * Note: The range is using half-open interval semantics [start, end).
   */
  range?: DoubleRange;
}

/**
 * Specifies the double start and end of the range using half-open interval
 * semantics [start, end).
 */
export interface DoubleRange {
  /**
   * end of the range (exclusive)
   */
  end?: number;
  /**
   * start of the range (inclusive)
   */
  start?: number;
}

/**
 * Describes a dynamically loaded cluster via the CDS API.
 */
export interface DynamicCluster {
  /**
   * The cluster config.
   */
  cluster?: {
    [key: string]: any
  };
  /**
   * The timestamp when the Cluster was last updated.
   */
  lastUpdated?: Date;
  /**
   * This is the per-resource version information. This version is currently
   * taken from the :ref:`version_info ` field at the time that the cluster was
   * loaded. In the future, discrete per-cluster versions may be supported by
   * the API.
   */
  versionInfo?: string;
}

function serializeDynamicCluster(data: any): DynamicCluster {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeDynamicCluster(data: any): DynamicCluster {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

/**
 * Describes a dynamically loaded listener via the LDS API. [#next-free-field:
 * 6]
 */
export interface DynamicListener {
  /**
   * The listener state for any active listener by this name. These are
   * listeners that are available to service data plane traffic.
   */
  activeState?: DynamicListenerState;
  /**
   * The listener state for any draining listener by this name. These are
   * listeners that are currently undergoing draining in preparation to stop
   * servicing data plane traffic. Note that if attempting to recreate an Envoy
   * configuration from a configuration dump, the draining listeners should
   * generally be discarded.
   */
  drainingState?: DynamicListenerState;
  /**
   * Set if the last update failed, cleared after the next successful update.
   */
  errorState?: UpdateFailureState;
  /**
   * The name or unique id of this listener, pulled from the
   * DynamicListenerState config.
   */
  name?: string;
  /**
   * The listener state for any warming listener by this name. These are
   * listeners that are currently undergoing warming in preparation to service
   * data plane traffic. Note that if attempting to recreate an Envoy
   * configuration from a configuration dump, the warming listeners should
   * generally be discarded.
   */
  warmingState?: DynamicListenerState;
}

function serializeDynamicListener(data: any): DynamicListener {
  return {
    ...data,
    activeState: data["activeState"] !== undefined ? serializeDynamicListenerState(data["activeState"]) : undefined,
    drainingState: data["drainingState"] !== undefined ? serializeDynamicListenerState(data["drainingState"]) : undefined,
    errorState: data["errorState"] !== undefined ? serializeUpdateFailureState(data["errorState"]) : undefined,
    warmingState: data["warmingState"] !== undefined ? serializeDynamicListenerState(data["warmingState"]) : undefined,
  };
}

function deserializeDynamicListener(data: any): DynamicListener {
  return {
    ...data,
    activeState: data["activeState"] !== undefined ? deserializeDynamicListenerState(data["activeState"]) : undefined,
    drainingState: data["drainingState"] !== undefined ? deserializeDynamicListenerState(data["drainingState"]) : undefined,
    errorState: data["errorState"] !== undefined ? deserializeUpdateFailureState(data["errorState"]) : undefined,
    warmingState: data["warmingState"] !== undefined ? deserializeDynamicListenerState(data["warmingState"]) : undefined,
  };
}

export interface DynamicListenerState {
  /**
   * The timestamp when the Listener was last successfully updated.
   */
  lastUpdated?: Date;
  /**
   * The listener config.
   */
  listener?: {
    [key: string]: any
  };
  /**
   * This is the per-resource version information. This version is currently
   * taken from the :ref:`version_info ` field at the time that the listener was
   * loaded. In the future, discrete per-listener versions may be supported by
   * the API.
   */
  versionInfo?: string;
}

function serializeDynamicListenerState(data: any): DynamicListenerState {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeDynamicListenerState(data: any): DynamicListenerState {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

export interface DynamicRouteConfig {
  /**
   * The timestamp when the Route was last updated.
   */
  lastUpdated?: Date;
  /**
   * The route config.
   */
  routeConfig?: {
    [key: string]: any
  };
  /**
   * This is the per-resource version information. This version is currently
   * taken from the :ref:`version_info ` field at the time that the route
   * configuration was loaded.
   */
  versionInfo?: string;
}

function serializeDynamicRouteConfig(data: any): DynamicRouteConfig {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeDynamicRouteConfig(data: any): DynamicRouteConfig {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

export interface DynamicScopedRouteConfigs {
  /**
   * The timestamp when the scoped route config set was last updated.
   */
  lastUpdated?: Date;
  /**
   * The name assigned to the scoped route configurations.
   */
  name?: string;
  /**
   * The scoped route configurations.
   */
  scopedRouteConfigs?: {
    [key: string]: any
  }[];
  /**
   * This is the per-resource version information. This version is currently
   * taken from the :ref:`version_info ` field at the time that the scoped
   * routes configuration was loaded.
   */
  versionInfo?: string;
}

function serializeDynamicScopedRouteConfigs(data: any): DynamicScopedRouteConfigs {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeDynamicScopedRouteConfigs(data: any): DynamicScopedRouteConfigs {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

/**
 * Version and identification for an Envoy extension. [#next-free-field: 6]
 */
export interface Extension {
  /**
   * Category of the extension. Extension category names use reverse DNS
   * notation. For instance "envoy.filters.listener" for Envoy's built-in
   * listener filters or "com.acme.filters.http" for HTTP filters from acme.com
   * vendor. [#comment:
   */
  category?: string;
  /**
   * Indicates that the extension is present but was disabled via dynamic
   * configuration.
   */
  disabled?: boolean;
  /**
   * This is the name of the Envoy filter as specified in the Envoy
   * configuration, e.g. envoy.filters.http.router, com.acme.widget.
   */
  name?: string;
  /**
   * [#not-implemented-hide:] Type descriptor of extension configuration proto.
   * [#comment:
   */
  typeDescriptor?: string;
  /**
   * The version is a property of the extension and maintained independently of
   * other extensions and the Envoy API. This field is not set when extension
   * did not provide version information.
   */
  version?: BuildVersion;
}

/**
 * Google's `RE2 `_ regex engine. The regex string must adhere to the
 * documented `syntax `_. The engine is designed to complete execution in linear
 * time as well as limit the amount of memory used. Envoy supports program size
 * checking via runtime. The runtime keys ``re2.max_program_size.error_level``
 * and ``re2.max_program_size.warn_level`` can be set to integers as the maximum
 * program size or complexity that a compiled regex can have before an exception
 * is thrown or a warning is logged, respectively.
 * ``re2.max_program_size.error_level`` defaults to 100, and
 * ``re2.max_program_size.warn_level`` has no default if unset (will not
 * check/log a warning). Envoy emits two stats for tracking the program size of
 * regexes: the histogram `re2.program_size`, which records the program size,
 * and the counter `re2.exceeded_warn_level`, which is incremented each time the
 * program size exceeds the warn level threshold.
 */
export interface GoogleRE2 {
  /**
   * This field controls the RE2 "program size" which is a rough estimate of
   * how complex a compiled regex is to evaluate. A regex that has a program
   * size greater than the configured value will fail to compile. In this case,
   * the configured max program size can be increased or the regex can be
   * simplified. If not specified, the default is 100. This field is deprecated;
   * regexp validation should be performed on the management server instead of
   * being done by each individual client.
   */
  maxProgramSize?: number;
}

export interface InlineScopedRouteConfigs {
  /**
   * The timestamp when the scoped route config set was last updated.
   */
  lastUpdated?: Date;
  /**
   * The name assigned to the scoped route configurations.
   */
  name?: string;
  /**
   * The scoped route configurations.
   */
  scopedRouteConfigs?: {
    [key: string]: any
  }[];
}

function serializeInlineScopedRouteConfigs(data: any): InlineScopedRouteConfigs {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeInlineScopedRouteConfigs(data: any): InlineScopedRouteConfigs {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

/**
 * Envoy's listener manager fills this message with all currently known
 * listeners. Listener configuration information can be used to recreate an
 * Envoy configuration by populating all listeners as static listeners or by
 * returning them in a LDS response.
 */
export interface ListenersConfigDump {
  /**
   * State for any warming, active, or draining listeners.
   */
  dynamicListeners?: DynamicListener[];
  /**
   * The statically loaded listener configs.
   */
  staticListeners?: StaticListener[];
  /**
   * This is the :ref:`version_info ` in the last processed LDS discovery
   * response. If there are only static bootstrap listeners, this field will be
   * "".
   */
  versionInfo?: string;
}

function serializeListenersConfigDump(data: any): ListenersConfigDump {
  return {
    ...data,
    dynamicListeners: data["dynamicListeners"] !== undefined ? data["dynamicListeners"].map((item: any) => (serializeDynamicListener(item))) : undefined,
    staticListeners: data["staticListeners"] !== undefined ? data["staticListeners"].map((item: any) => (serializeStaticListener(item))) : undefined,
  };
}

function deserializeListenersConfigDump(data: any): ListenersConfigDump {
  return {
    ...data,
    dynamicListeners: data["dynamicListeners"] !== undefined ? data["dynamicListeners"].map((item: any) => (deserializeDynamicListener(item))) : undefined,
    staticListeners: data["staticListeners"] !== undefined ? data["staticListeners"].map((item: any) => (deserializeStaticListener(item))) : undefined,
  };
}

/**
 * Specifies the way to match a list value.
 */
export interface ListMatcher {
  /**
   * If specified, at least one of the values in the list must match the value
   * specified.
   */
  oneOf?: ValueMatcher;
}

/**
 * Identifies location of where either Envoy runs or where upstream hosts run.
 */
export interface Locality {
  /**
   * Region this :ref:`zone ` belongs to.
   */
  region?: string;
  /**
   * When used for locality of upstream hosts, this field further splits zone
   * into smaller chunks of sub-zones so they can be load balanced
   * independently.
   */
  subZone?: string;
  /**
   * Defines the local service zone where Envoy is running. Though optional, it
   * should be set if discovery service routing is used and the discovery
   * service exposes :ref:`zone data `, either in this message or via
   * :option:`--service-zone`. The meaning of zone is context dependent, e.g.
   * `Availability Zone (AZ) `_ on AWS, `Zone `_ on GCP, etc.
   */
  zone?: string;
}

/**
 * Identifies a specific Envoy instance. The node identifier is presented to
 * the management server, which may use this identifier to distinguish per Envoy
 * configuration for serving. [#next-free-field: 12]
 */
export interface Node {
  /**
   * This is motivated by informing a management server during canary which
   * version of Envoy is being tested in a heterogeneous fleet. This will be set
   * by Envoy in management server RPCs. This field is deprecated in favor of
   * the user_agent_name and user_agent_version values.
   */
  buildVersion?: string;
  /**
   * Client feature support list. These are well known features described in
   * the Envoy API repository for a given major version of an API. Client
   * features use reverse DNS naming scheme, for example `com.acme.feature`. See
   * :ref:`the list of features ` that xDS client may support.
   */
  clientFeatures?: string[];
  /**
   * Defines the local service cluster name where Envoy is running. Though
   * optional, it should be set if any of the following features are used:
   * :ref:`statsd `, :ref:`health check cluster verification `, :ref:`runtime
   * override directory `, :ref:`user agent addition `, :ref:`HTTP global rate
   * limiting `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this message
   * or via :option:`--service-cluster`.
   */
  cluster?: string;
  /**
   * List of extensions and their versions supported by the node.
   */
  extensions?: Extension[];
  /**
   * An opaque node identifier for the Envoy node. This also provides the local
   * service node name. It should be set if any of the following features are
   * used: :ref:`statsd `, :ref:`CDS `, and :ref:`HTTP tracing `, either in this
   * message or via :option:`--service-node`.
   */
  id?: string;
  /**
   * Known listening ports on the node as a generic hint to the management
   * server for filtering :ref:`listeners ` to be returned. For example, if
   * there is a listener bound to port 80, the list can optionally contain the
   * SocketAddress `(0.0.0.0,80)`. The field is optional and just a hint.
   */
  listeningAddresses?: Address[];
  /**
   * Locality specifying where the Envoy instance is running.
   */
  locality?: Locality;
  /**
   * Opaque metadata extending the node identifier. Envoy will pass this
   * directly to the management server.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Structured version of the entity requesting config.
   */
  userAgentBuildVersion?: BuildVersion;
  /**
   * Free-form string that identifies the entity requesting config. E.g.
   * "envoy" or "grpc"
   */
  userAgentName?: string;
  /**
   * Free-form string that identifies the version of the entity requesting
   * config. E.g. "1.12.2" or "abcd1234", or "SpecialEnvoyBuild"
   */
  userAgentVersion?: string;
}

/**
 * Specifies the way to match a Node. The match follows AND semantics.
 */
export interface NodeMatcher {
  /**
   * Specifies match criteria on the node id.
   */
  nodeId?: StringMatcher;
  /**
   * Specifies match criteria on the node metadata.
   */
  nodeMetadatas?: StructMatcher[];
}

/**
 * NullMatch is an empty message to specify a null value.
 */
export interface NullMatch {
}

/**
 * Specifies the segment in a path to retrieve value from Struct.
 */
export interface PathSegment {
  /**
   * If specified, use the key to retrieve the value in a Struct.
   */
  key?: string;
}

/**
 * Detailed config (per xDS) with status. [#next-free-field: 6]
 */
export interface PerXdsConfig {
  clusterConfig?: ClustersConfigDump;
  listenerConfig?: ListenersConfigDump;
  routeConfig?: RoutesConfigDump;
  scopedRouteConfig?: ScopedRoutesConfigDump;
  status?:  | "UNKNOWN" | "SYNCED" | "NOT_SENT" | "STALE" | "ERROR";
}

function serializePerXdsConfig(data: any): PerXdsConfig {
  return {
    ...data,
    clusterConfig: data["clusterConfig"] !== undefined ? serializeClustersConfigDump(data["clusterConfig"]) : undefined,
    listenerConfig: data["listenerConfig"] !== undefined ? serializeListenersConfigDump(data["listenerConfig"]) : undefined,
    routeConfig: data["routeConfig"] !== undefined ? serializeRoutesConfigDump(data["routeConfig"]) : undefined,
    scopedRouteConfig: data["scopedRouteConfig"] !== undefined ? serializeScopedRoutesConfigDump(data["scopedRouteConfig"]) : undefined,
  };
}

function deserializePerXdsConfig(data: any): PerXdsConfig {
  return {
    ...data,
    clusterConfig: data["clusterConfig"] !== undefined ? deserializeClustersConfigDump(data["clusterConfig"]) : undefined,
    listenerConfig: data["listenerConfig"] !== undefined ? deserializeListenersConfigDump(data["listenerConfig"]) : undefined,
    routeConfig: data["routeConfig"] !== undefined ? deserializeRoutesConfigDump(data["routeConfig"]) : undefined,
    scopedRouteConfig: data["scopedRouteConfig"] !== undefined ? deserializeScopedRoutesConfigDump(data["scopedRouteConfig"]) : undefined,
  };
}

export interface Pipe {
  /**
   * The mode for the Pipe. Not applicable for abstract sockets.
   */
  mode?: number;
  /**
   * Unix Domain Socket path. On Linux, paths starting with '@' will use the
   * abstract namespace. The starting '@' is replaced by a null byte by Envoy.
   * Paths starting with '@' will result in an error in environments other than
   * Linux.
   */
  path?: string;
}

/**
 * A regex matcher designed for safety when used with untrusted input.
 */
export interface RegexMatcher {
  /**
   * Google's RE2 regex engine.
   */
  googleRe2?: GoogleRE2;
  /**
   * The regex match string. The string must be supported by the configured
   * engine.
   */
  regex?: string;
}

/**
 * Envoy's RDS implementation fills this message with all currently loaded
 * routes, as described by their RouteConfiguration objects. Static routes that
 * are either defined in the bootstrap configuration or defined inline while
 * configuring listeners are separated from those configured dynamically via
 * RDS. Route configuration information can be used to recreate an Envoy
 * configuration by populating all routes as static routes or by returning them
 * in RDS responses.
 */
export interface RoutesConfigDump {
  /**
   * The dynamically loaded route configs.
   */
  dynamicRouteConfigs?: DynamicRouteConfig[];
  /**
   * The statically loaded route configs.
   */
  staticRouteConfigs?: StaticRouteConfig[];
}

function serializeRoutesConfigDump(data: any): RoutesConfigDump {
  return {
    ...data,
    dynamicRouteConfigs: data["dynamicRouteConfigs"] !== undefined ? data["dynamicRouteConfigs"].map((item: any) => (serializeDynamicRouteConfig(item))) : undefined,
    staticRouteConfigs: data["staticRouteConfigs"] !== undefined ? data["staticRouteConfigs"].map((item: any) => (serializeStaticRouteConfig(item))) : undefined,
  };
}

function deserializeRoutesConfigDump(data: any): RoutesConfigDump {
  return {
    ...data,
    dynamicRouteConfigs: data["dynamicRouteConfigs"] !== undefined ? data["dynamicRouteConfigs"].map((item: any) => (deserializeDynamicRouteConfig(item))) : undefined,
    staticRouteConfigs: data["staticRouteConfigs"] !== undefined ? data["staticRouteConfigs"].map((item: any) => (deserializeStaticRouteConfig(item))) : undefined,
  };
}

/**
 * Envoy's scoped RDS implementation fills this message with all currently
 * loaded route configuration scopes (defined via ScopedRouteConfigurationsSet
 * protos). This message lists both the scopes defined inline with the higher
 * order object (i.e., the HttpConnectionManager) and the dynamically obtained
 * scopes via the SRDS API.
 */
export interface ScopedRoutesConfigDump {
  /**
   * The dynamically loaded scoped route configs.
   */
  dynamicScopedRouteConfigs?: DynamicScopedRouteConfigs[];
  /**
   * The statically loaded scoped route configs.
   */
  inlineScopedRouteConfigs?: InlineScopedRouteConfigs[];
}

function serializeScopedRoutesConfigDump(data: any): ScopedRoutesConfigDump {
  return {
    ...data,
    dynamicScopedRouteConfigs: data["dynamicScopedRouteConfigs"] !== undefined ? data["dynamicScopedRouteConfigs"].map((item: any) => (serializeDynamicScopedRouteConfigs(item))) : undefined,
    inlineScopedRouteConfigs: data["inlineScopedRouteConfigs"] !== undefined ? data["inlineScopedRouteConfigs"].map((item: any) => (serializeInlineScopedRouteConfigs(item))) : undefined,
  };
}

function deserializeScopedRoutesConfigDump(data: any): ScopedRoutesConfigDump {
  return {
    ...data,
    dynamicScopedRouteConfigs: data["dynamicScopedRouteConfigs"] !== undefined ? data["dynamicScopedRouteConfigs"].map((item: any) => (deserializeDynamicScopedRouteConfigs(item))) : undefined,
    inlineScopedRouteConfigs: data["inlineScopedRouteConfigs"] !== undefined ? data["inlineScopedRouteConfigs"].map((item: any) => (deserializeInlineScopedRouteConfigs(item))) : undefined,
  };
}

/**
 * Envoy uses SemVer (https://semver.org/). Major/minor versions indicate
 * expected behaviors and APIs, the patch version field is used only for
 * security fixes and can be generally ignored.
 */
export interface SemanticVersion {
  majorNumber?: number;
  minorNumber?: number;
  patch?: number;
}

/**
 * [#next-free-field: 7]
 */
export interface SocketAddress {
  /**
   * The address for this socket. :ref:`Listeners ` will bind to the address.
   * An empty address is not allowed. Specify ``0.0.0.0`` or ``::`` to bind to
   * any address. [#comment:TODO(zuercher) reinstate when implemented: It is
   * possible to distinguish a Listener address via the prefix/suffix matching
   * in :ref:`FilterChainMatch `.] When used within an upstream :ref:`BindConfig
   * `, the address controls the source address of outbound connections. For
   * :ref:`clusters `, the cluster type determines whether the address must be
   * an IP (*STATIC* or *EDS* clusters) or a hostname resolved by DNS
   * (*STRICT_DNS* or *LOGICAL_DNS* clusters). Address resolution can be
   * customized via :ref:`resolver_name `.
   */
  address?: string;
  /**
   * When binding to an IPv6 address above, this enables `IPv4 compatibility
   * `_. Binding to ``::`` will allow both IPv4 and IPv6 connections, with peer
   * IPv4 addresses mapped into IPv6 space as ``::FFFF:``.
   */
  ipv4Compat?: boolean;
  /**
   * This is only valid if :ref:`resolver_name ` is specified below and the
   * named resolver is capable of named port resolution.
   */
  namedPort?: string;
  portValue?: number;
  protocol?:  | "TCP" | "UDP";
  /**
   * The name of the custom resolver. This must have been registered with
   * Envoy. If this is empty, a context dependent default applies. If the
   * address is a concrete IP address, no resolution will occur. If address is a
   * hostname this should be set for resolution other than DNS. Specifying a
   * custom resolver with *STRICT_DNS* or *LOGICAL_DNS* will generate an error
   * at runtime.
   */
  resolverName?: string;
}

/**
 * Describes a statically loaded cluster.
 */
export interface StaticCluster {
  /**
   * The cluster config.
   */
  cluster?: {
    [key: string]: any
  };
  /**
   * The timestamp when the Cluster was last updated.
   */
  lastUpdated?: Date;
}

function serializeStaticCluster(data: any): StaticCluster {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeStaticCluster(data: any): StaticCluster {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

/**
 * Describes a statically loaded listener.
 */
export interface StaticListener {
  /**
   * The timestamp when the Listener was last successfully updated.
   */
  lastUpdated?: Date;
  /**
   * The listener config.
   */
  listener?: {
    [key: string]: any
  };
}

function serializeStaticListener(data: any): StaticListener {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeStaticListener(data: any): StaticListener {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

export interface StaticRouteConfig {
  /**
   * The timestamp when the Route was last updated.
   */
  lastUpdated?: Date;
  /**
   * The route config.
   */
  routeConfig?: {
    [key: string]: any
  };
}

function serializeStaticRouteConfig(data: any): StaticRouteConfig {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? data["lastUpdated"].toISOString() : undefined,
  };
}

function deserializeStaticRouteConfig(data: any): StaticRouteConfig {
  return {
    ...data,
    lastUpdated: data["lastUpdated"] !== undefined ? new Date(data["lastUpdated"]) : undefined,
  };
}

/**
 * Specifies the way to match a string. [#next-free-field: 7]
 */
export interface StringMatcher {
  /**
   * The input string must match exactly the string specified here. Examples: *
   * *abc* only matches the value *abc*.
   */
  exact?: string;
  /**
   * If true, indicates the exact/prefix/suffix matching should be case
   * insensitive. This has no effect for the safe_regex match. For example, the
   * matcher *data* will match both input string *Data* and *data* if set to
   * true.
   */
  ignoreCase?: boolean;
  /**
   * The input string must have the prefix specified here. Note: empty prefix
   * is not allowed, please use regex instead. Examples: * *abc* matches the
   * value *abc.xyz*
   */
  prefix?: string;
  /**
   * The input string must match the regular expression specified here. The
   * regex grammar is defined `here `_. Examples: * The regex ``\d{3}`` matches
   * the value *123* * The regex ``\d{3}`` does not match the value *1234* * The
   * regex ``\d{3}`` does not match the value *123.456* .. attention:: This
   * field has been deprecated in favor of `safe_regex` as it is not safe for
   * use with untrusted input in all cases.
   */
  regex?: string;
  /**
   * The input string must match the regular expression specified here.
   */
  safeRegex?: RegexMatcher;
  /**
   * The input string must have the suffix specified here. Note: empty prefix
   * is not allowed, please use regex instead. Examples: * *abc* matches the
   * value *xyz.abc*
   */
  suffix?: string;
}

/**
 * StructMatcher provides a general interface to check if a given value is
 * matched in google.protobuf.Struct. It uses `path` to retrieve the value from
 * the struct and then check if it's matched to the specified value. For
 * example, for the following Struct: .. code-block:: yaml fields: a:
 * struct_value: fields: b: struct_value: fields: c: string_value: pro t:
 * list_value: values: - string_value: m - string_value: n The following
 * MetadataMatcher is matched as the path [a, b, c] will retrieve a string value
 * "pro" from the Metadata which is matched to the specified prefix match. ..
 * code-block:: yaml path: - key: a - key: b - key: c value: string_match:
 * prefix: pr The following StructMatcher is matched as the code will match one
 * of the string values in the list at the path [a, t]. .. code-block:: yaml
 * path: - key: a - key: t value: list_match: one_of: string_match: exact: m An
 * example use of StructMatcher is to match metadata in envoy.v*.core.Node.
 */
export interface StructMatcher {
  /**
   * The path to retrieve the Value from the Struct.
   */
  path?: PathSegment[];
  /**
   * The StructMatcher is matched if the value retrieved by path is matched to
   * this value.
   */
  value?: ValueMatcher;
}

export interface UpdateFailureState {
  /**
   * Details about the last failed update attempt.
   */
  details?: string;
  /**
   * What the component configuration would have been if the update had
   * succeeded.
   */
  failedConfiguration?: {
    [key: string]: any
  };
  /**
   * Time of the latest failed update attempt.
   */
  lastUpdateAttempt?: Date;
}

function serializeUpdateFailureState(data: any): UpdateFailureState {
  return {
    ...data,
    lastUpdateAttempt: data["lastUpdateAttempt"] !== undefined ? data["lastUpdateAttempt"].toISOString() : undefined,
  };
}

function deserializeUpdateFailureState(data: any): UpdateFailureState {
  return {
    ...data,
    lastUpdateAttempt: data["lastUpdateAttempt"] !== undefined ? new Date(data["lastUpdateAttempt"]) : undefined,
  };
}

/**
 * Specifies the way to match a ProtobufWkt::Value. Primitive values and
 * ListValue are supported. StructValue is not supported and is always not
 * matched. [#next-free-field: 7]
 */
export interface ValueMatcher {
  /**
   * If specified, a match occurs if and only if the target value is a bool
   * value and is equal to this field.
   */
  boolMatch?: boolean;
  /**
   * If specified, a match occurs if and only if the target value is a double
   * value and is matched to this field.
   */
  doubleMatch?: DoubleMatcher;
  /**
   * If specified, a match occurs if and only if the target value is a list
   * value and is matched to this field.
   */
  listMatch?: ListMatcher;
  /**
   * If specified, a match occurs if and only if the target value is a
   * NullValue.
   */
  nullMatch?: NullMatch;
  /**
   * If specified, value match will be performed based on whether the path is
   * referring to a valid primitive value in the metadata. If the path is
   * referring to a non-primitive value, the result is always not matched.
   */
  presentMatch?: boolean;
  /**
   * If specified, a match occurs if and only if the target value is a string
   * value and is matched to this field.
   */
  stringMatch?: StringMatcher;
}