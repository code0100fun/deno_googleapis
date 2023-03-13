// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Testing API Client for Deno
 * =================================
 * 
 * Allows developers to run automated tests for their mobile applications on Google infrastructure.
 * 
 * Docs: https://developers.google.com/cloud-test-lab/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Allows developers to run automated tests for their mobile applications on
 * Google infrastructure.
 */
export class Testing {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://testing.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the details of an Android application APK.
   *
   */
  async applicationDetailServiceGetApkDetails(req: FileReference): Promise<GetApkDetailsResponse> {
    const url = new URL(`${this.#baseUrl}v1/applicationDetailService/getApkDetails`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGetApkDetailsResponse(data);
  }

  /**
   * Cancels unfinished test executions in a test matrix. This call returns
   * immediately and cancellation proceeds asynchronously. If the matrix is
   * already final, this operation will have no effect. May return any of the
   * following canonical error codes: - PERMISSION_DENIED - if the user is not
   * authorized to read project - INVALID_ARGUMENT - if the request is malformed
   * - NOT_FOUND - if the Test Matrix does not exist
   *
   * @param projectId Cloud project that owns the test.
   * @param testMatrixId Test matrix that will be canceled.
   */
  async projectsTestMatricesCancel(projectId: string, testMatrixId: string): Promise<CancelTestMatrixResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/testMatrices/${ testMatrixId }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as CancelTestMatrixResponse;
  }

  /**
   * Creates and runs a matrix of tests according to the given specifications.
   * Unsupported environments will be returned in the state UNSUPPORTED. A test
   * matrix is limited to use at most 2000 devices in parallel. May return any
   * of the following canonical error codes: - PERMISSION_DENIED - if the user
   * is not authorized to write to project - INVALID_ARGUMENT - if the request
   * is malformed or if the matrix tries to use too many simultaneous devices.
   *
   * @param projectId The GCE project under which this job will run.
   */
  async projectsTestMatricesCreate(projectId: string, req: TestMatrix, opts: ProjectsTestMatricesCreateOptions = {}): Promise<TestMatrix> {
    req = serializeTestMatrix(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/testMatrices`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTestMatrix(data);
  }

  /**
   * Checks the status of a test matrix. May return any of the following
   * canonical error codes: - PERMISSION_DENIED - if the user is not authorized
   * to read project - INVALID_ARGUMENT - if the request is malformed -
   * NOT_FOUND - if the Test Matrix does not exist
   *
   * @param projectId Cloud project that owns the test matrix.
   * @param testMatrixId Unique test matrix id which was assigned by the service.
   */
  async projectsTestMatricesGet(projectId: string, testMatrixId: string): Promise<TestMatrix> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/testMatrices/${ testMatrixId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTestMatrix(data);
  }

  /**
   * Gets the catalog of supported test environments. May return any of the
   * following canonical error codes: - INVALID_ARGUMENT - if the request is
   * malformed - NOT_FOUND - if the environment type does not exist - INTERNAL -
   * if an internal error occurred
   *
   * @param environmentType Required. The type of environment that should be listed.
   */
  async testEnvironmentCatalogGet(environmentType:  | "ENVIRONMENT_TYPE_UNSPECIFIED" | "ANDROID" | "IOS" | "NETWORK_CONFIGURATION" | "PROVIDED_SOFTWARE" | "DEVICE_IP_BLOCKS", opts: TestEnvironmentCatalogGetOptions = {}): Promise<TestEnvironmentCatalog> {
    const url = new URL(`${this.#baseUrl}v1/testEnvironmentCatalog/${ environmentType }`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTestEnvironmentCatalog(data);
  }
}

/**
 * Identifies an account and how to log into it.
 */
export interface Account {
  /**
   * An automatic google login account.
   */
  googleAuto?: GoogleAuto;
}

/**
 * A single Android device.
 */
export interface AndroidDevice {
  /**
   * Required. The id of the Android device to be used. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  androidModelId?: string;
  /**
   * Required. The id of the Android OS version to be used. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  androidVersionId?: string;
  /**
   * Required. The locale the test device used for testing. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  locale?: string;
  /**
   * Required. How the device is oriented during the test. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  orientation?: string;
}

/**
 * The currently supported Android devices.
 */
export interface AndroidDeviceCatalog {
  /**
   * The set of supported Android device models.
   */
  models?: AndroidModel[];
  /**
   * The set of supported runtime configurations.
   */
  runtimeConfiguration?: AndroidRuntimeConfiguration;
  /**
   * The set of supported Android OS versions.
   */
  versions?: AndroidVersion[];
}

function serializeAndroidDeviceCatalog(data: any): AndroidDeviceCatalog {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (serializeAndroidVersion(item))) : undefined,
  };
}

function deserializeAndroidDeviceCatalog(data: any): AndroidDeviceCatalog {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (deserializeAndroidVersion(item))) : undefined,
  };
}

/**
 * A list of Android device configurations in which the test is to be executed.
 */
export interface AndroidDeviceList {
  /**
   * Required. A list of Android devices.
   */
  androidDevices?: AndroidDevice[];
}

/**
 * A test of an Android application that can control an Android component
 * independently of its normal lifecycle. Android instrumentation tests run an
 * application APK and test APK inside the same process on a virtual or physical
 * AndroidDevice. They also specify a test runner class, such as
 * com.google.GoogleTestRunner, which can vary on the specific instrumentation
 * framework chosen. See for more information on types of Android tests.
 */
export interface AndroidInstrumentationTest {
  /**
   * The APK for the application under test.
   */
  appApk?: FileReference;
  /**
   * A multi-apk app bundle for the application under test.
   */
  appBundle?: AppBundle;
  /**
   * The java package for the application under test. The default value is
   * determined by examining the application's manifest.
   */
  appPackageId?: string;
  /**
   * The option of whether running each test within its own invocation of
   * instrumentation with Android Test Orchestrator or not. ** Orchestrator is
   * only compatible with AndroidJUnitRunner version 1.1 or higher! **
   * Orchestrator offers the following benefits: - No shared state - Crashes are
   * isolated - Logs are scoped per test See for more information about Android
   * Test Orchestrator. If not set, the test will be run without the
   * orchestrator.
   */
  orchestratorOption?:  | "ORCHESTRATOR_OPTION_UNSPECIFIED" | "USE_ORCHESTRATOR" | "DO_NOT_USE_ORCHESTRATOR";
  /**
   * The option to run tests in multiple shards in parallel.
   */
  shardingOption?: ShardingOption;
  /**
   * Required. The APK containing the test code to be executed.
   */
  testApk?: FileReference;
  /**
   * The java package for the test to be executed. The default value is
   * determined by examining the application's manifest.
   */
  testPackageId?: string;
  /**
   * The InstrumentationTestRunner class. The default value is determined by
   * examining the application's manifest.
   */
  testRunnerClass?: string;
  /**
   * Each target must be fully qualified with the package name or class name,
   * in one of these formats: - "package package_name" - "class
   * package_name.class_name" - "class package_name.class_name#method_name" If
   * empty, all targets in the module will be run.
   */
  testTargets?: string[];
}

/**
 * A set of Android device configuration permutations is defined by the the
 * cross-product of the given axes. Internally, the given AndroidMatrix will be
 * expanded into a set of AndroidDevices. Only supported permutations will be
 * instantiated. Invalid permutations (e.g., incompatible models/versions) are
 * ignored.
 */
export interface AndroidMatrix {
  /**
   * Required. The ids of the set of Android device to be used. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  androidModelIds?: string[];
  /**
   * Required. The ids of the set of Android OS version to be used. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  androidVersionIds?: string[];
  /**
   * Required. The set of locales the test device will enable for testing. Use
   * the TestEnvironmentDiscoveryService to get supported options.
   */
  locales?: string[];
  /**
   * Required. The set of orientations to test with. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  orientations?: string[];
}

/**
 * A description of an Android device tests may be run on.
 */
export interface AndroidModel {
  /**
   * The company that this device is branded with. Example: "Google",
   * "Samsung".
   */
  brand?: string;
  /**
   * The name of the industrial design. This corresponds to
   * android.os.Build.DEVICE.
   */
  codename?: string;
  /**
   * Whether this device is virtual or physical.
   */
  form?:  | "DEVICE_FORM_UNSPECIFIED" | "VIRTUAL" | "PHYSICAL" | "EMULATOR";
  /**
   * Whether this device is a phone, tablet, wearable, etc.
   */
  formFactor?:  | "DEVICE_FORM_FACTOR_UNSPECIFIED" | "PHONE" | "TABLET" | "WEARABLE";
  /**
   * The unique opaque id for this model. Use this for invoking the
   * TestExecutionService.
   */
  id?: string;
  /**
   * True if and only if tests with this model are recorded by stitching
   * together screenshots. See use_low_spec_video_recording in device config.
   */
  lowFpsVideoRecording?: boolean;
  /**
   * The manufacturer of this device.
   */
  manufacturer?: string;
  /**
   * The human-readable marketing name for this device model. Examples: "Nexus
   * 5", "Galaxy S5".
   */
  name?: string;
  /**
   * Version-specific information of an Android model.
   */
  perVersionInfo?: PerAndroidVersionInfo[];
  /**
   * Screen density in DPI. This corresponds to ro.sf.lcd_density
   */
  screenDensity?: number;
  /**
   * Screen size in the horizontal (X) dimension measured in pixels.
   */
  screenX?: number;
  /**
   * Screen size in the vertical (Y) dimension measured in pixels.
   */
  screenY?: number;
  /**
   * The list of supported ABIs for this device. This corresponds to either
   * android.os.Build.SUPPORTED_ABIS (for API level 21 and above) or
   * android.os.Build.CPU_ABI/CPU_ABI2. The most preferred ABI is the first
   * element in the list. Elements are optionally prefixed by "version_id:"
   * (where version_id is the id of an AndroidVersion), denoting an ABI that is
   * supported only on a particular version.
   */
  supportedAbis?: string[];
  /**
   * The set of Android versions this device supports.
   */
  supportedVersionIds?: string[];
  /**
   * Tags for this dimension. Examples: "default", "preview", "deprecated".
   */
  tags?: string[];
  /**
   * URL of a thumbnail image (photo) of the device.
   */
  thumbnailUrl?: string;
}

/**
 * A test of an android application that explores the application on a virtual
 * or physical Android Device, finding culprits and crashes as it goes.
 */
export interface AndroidRoboTest {
  /**
   * The APK for the application under test.
   */
  appApk?: FileReference;
  /**
   * A multi-apk app bundle for the application under test.
   */
  appBundle?: AppBundle;
  /**
   * The initial activity that should be used to start the app.
   */
  appInitialActivity?: string;
  /**
   * The java package for the application under test. The default value is
   * determined by examining the application's manifest.
   */
  appPackageId?: string;
  /**
   * The max depth of the traversal stack Robo can explore. Needs to be at
   * least 2 to make Robo explore the app beyond the first activity. Default is
   * 50.
   */
  maxDepth?: number;
  /**
   * The max number of steps Robo can execute. Default is no limit.
   */
  maxSteps?: number;
  /**
   * A set of directives Robo should apply during the crawl. This allows users
   * to customize the crawl. For example, the username and password for a test
   * account can be provided.
   */
  roboDirectives?: RoboDirective[];
  /**
   * The mode in which Robo should run. Most clients should allow the server to
   * populate this field automatically.
   */
  roboMode?:  | "ROBO_MODE_UNSPECIFIED" | "ROBO_VERSION_1" | "ROBO_VERSION_2";
  /**
   * A JSON file with a sequence of actions Robo should perform as a prologue
   * for the crawl.
   */
  roboScript?: FileReference;
  /**
   * The intents used to launch the app for the crawl. If none are provided,
   * then the main launcher activity is launched. If some are provided, then
   * only those provided are launched (the main launcher activity must be
   * provided explicitly).
   */
  startingIntents?: RoboStartingIntent[];
}

function serializeAndroidRoboTest(data: any): AndroidRoboTest {
  return {
    ...data,
    startingIntents: data["startingIntents"] !== undefined ? data["startingIntents"].map((item: any) => (serializeRoboStartingIntent(item))) : undefined,
  };
}

function deserializeAndroidRoboTest(data: any): AndroidRoboTest {
  return {
    ...data,
    startingIntents: data["startingIntents"] !== undefined ? data["startingIntents"].map((item: any) => (deserializeRoboStartingIntent(item))) : undefined,
  };
}

/**
 * Android configuration that can be selected at the time a test is run.
 */
export interface AndroidRuntimeConfiguration {
  /**
   * The set of available locales.
   */
  locales?: Locale[];
  /**
   * The set of available orientations.
   */
  orientations?: Orientation[];
}

/**
 * A test of an Android Application with a Test Loop. The intent \ will be
 * implicitly added, since Games is the only user of this api, for the time
 * being.
 */
export interface AndroidTestLoop {
  /**
   * The APK for the application under test.
   */
  appApk?: FileReference;
  /**
   * A multi-apk app bundle for the application under test.
   */
  appBundle?: AppBundle;
  /**
   * The java package for the application under test. The default is determined
   * by examining the application's manifest.
   */
  appPackageId?: string;
  /**
   * The list of scenario labels that should be run during the test. The
   * scenario labels should map to labels defined in the application's manifest.
   * For example, player_experience and com.google.test.loops.player_experience
   * add all of the loops labeled in the manifest with the
   * com.google.test.loops.player_experience name to the execution. Scenarios
   * can also be specified in the scenarios field.
   */
  scenarioLabels?: string[];
  /**
   * The list of scenarios that should be run during the test. The default is
   * all test loops, derived from the application's manifest.
   */
  scenarios?: number[];
}

/**
 * A version of the Android OS.
 */
export interface AndroidVersion {
  /**
   * The API level for this Android version. Examples: 18, 19.
   */
  apiLevel?: number;
  /**
   * The code name for this Android version. Examples: "JellyBean", "KitKat".
   */
  codeName?: string;
  /**
   * Market share for this version.
   */
  distribution?: Distribution;
  /**
   * An opaque id for this Android version. Use this id to invoke the
   * TestExecutionService.
   */
  id?: string;
  /**
   * The date this Android version became available in the market.
   */
  releaseDate?: Date;
  /**
   * Tags for this dimension. Examples: "default", "preview", "deprecated".
   */
  tags?: string[];
  /**
   * A string representing this version of the Android OS. Examples: "4.3",
   * "4.4".
   */
  versionString?: string;
}

function serializeAndroidVersion(data: any): AndroidVersion {
  return {
    ...data,
    distribution: data["distribution"] !== undefined ? serializeDistribution(data["distribution"]) : undefined,
  };
}

function deserializeAndroidVersion(data: any): AndroidVersion {
  return {
    ...data,
    distribution: data["distribution"] !== undefined ? deserializeDistribution(data["distribution"]) : undefined,
  };
}

/**
 * An Android package file to install.
 */
export interface Apk {
  /**
   * The path to an APK to be installed on the device before the test begins.
   */
  location?: FileReference;
  /**
   * The java package for the APK to be installed. Value is determined by
   * examining the application's manifest.
   */
  packageName?: string;
}

/**
 * Android application details based on application manifest and apk archive
 * contents.
 */
export interface ApkDetail {
  apkManifest?: ApkManifest;
}

function serializeApkDetail(data: any): ApkDetail {
  return {
    ...data,
    apkManifest: data["apkManifest"] !== undefined ? serializeApkManifest(data["apkManifest"]) : undefined,
  };
}

function deserializeApkDetail(data: any): ApkDetail {
  return {
    ...data,
    apkManifest: data["apkManifest"] !== undefined ? deserializeApkManifest(data["apkManifest"]) : undefined,
  };
}

/**
 * An Android app manifest. See
 * http://developer.android.com/guide/topics/manifest/manifest-intro.html
 */
export interface ApkManifest {
  /**
   * User-readable name for the application.
   */
  applicationLabel?: string;
  intentFilters?: IntentFilter[];
  /**
   * Maximum API level on which the application is designed to run.
   */
  maxSdkVersion?: number;
  /**
   * Meta-data tags defined in the manifest.
   */
  metadata?: Metadata[];
  /**
   * Minimum API level required for the application to run.
   */
  minSdkVersion?: number;
  /**
   * Full Java-style package name for this application, e.g. "com.example.foo".
   */
  packageName?: string;
  /**
   * Specifies the API Level on which the application is designed to run.
   */
  targetSdkVersion?: number;
  /**
   * Feature usage tags defined in the manifest.
   */
  usesFeature?: UsesFeature[];
  /**
   * Permissions declared to be used by the application
   */
  usesPermission?: string[];
  /**
   * Version number used internally by the app.
   */
  versionCode?: bigint;
  /**
   * Version number shown to users.
   */
  versionName?: string;
}

function serializeApkManifest(data: any): ApkManifest {
  return {
    ...data,
    versionCode: data["versionCode"] !== undefined ? String(data["versionCode"]) : undefined,
  };
}

function deserializeApkManifest(data: any): ApkManifest {
  return {
    ...data,
    versionCode: data["versionCode"] !== undefined ? BigInt(data["versionCode"]) : undefined,
  };
}

/**
 * An Android App Bundle file format, containing a BundleConfig.pb file, a base
 * module directory, zero or more dynamic feature module directories. See
 * https://developer.android.com/guide/app-bundle/build for guidance on building
 * App Bundles.
 */
export interface AppBundle {
  /**
   * .aab file representing the app bundle under test.
   */
  bundleLocation?: FileReference;
}

/**
 * Response containing the current state of the specified test matrix.
 */
export interface CancelTestMatrixResponse {
  /**
   * The current rolled-up state of the test matrix. If this state is already
   * final, then the cancelation request will have no effect.
   */
  testState?:  | "TEST_STATE_UNSPECIFIED" | "VALIDATING" | "PENDING" | "RUNNING" | "FINISHED" | "ERROR" | "UNSUPPORTED_ENVIRONMENT" | "INCOMPATIBLE_ENVIRONMENT" | "INCOMPATIBLE_ARCHITECTURE" | "CANCELLED" | "INVALID";
}

/**
 * Information about the client which invoked the test.
 */
export interface ClientInfo {
  /**
   * The list of detailed information about client.
   */
  clientInfoDetails?: ClientInfoDetail[];
  /**
   * Required. Client name, such as gcloud.
   */
  name?: string;
}

/**
 * Key-value pair of detailed information about the client which invoked the
 * test. Examples: {'Version', '1.0'}, {'Release Track', 'BETA'}.
 */
export interface ClientInfoDetail {
  /**
   * Required. The key of detailed client information.
   */
  key?: string;
  /**
   * Required. The value of detailed client information.
   */
  value?: string;
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
 * A single device file description.
 */
export interface DeviceFile {
  /**
   * A reference to an opaque binary blob file.
   */
  obbFile?: ObbFile;
  /**
   * A reference to a regular file.
   */
  regularFile?: RegularFile;
}

/**
 * A single device IP block
 */
export interface DeviceIpBlock {
  /**
   * The date this block was added to Firebase Test Lab
   */
  addedDate?: Date;
  /**
   * An IP address block in CIDR notation eg: 34.68.194.64/29
   */
  block?: string;
  /**
   * Whether this block is used by physical or virtual devices
   */
  form?:  | "DEVICE_FORM_UNSPECIFIED" | "VIRTUAL" | "PHYSICAL" | "EMULATOR";
}

/**
 * List of IP blocks used by the Firebase Test Lab
 */
export interface DeviceIpBlockCatalog {
  /**
   * The device IP blocks used by Firebase Test Lab
   */
  ipBlocks?: DeviceIpBlock[];
}

/**
 * Data about the relative number of devices running a given configuration of
 * the Android platform.
 */
export interface Distribution {
  /**
   * Output only. The estimated fraction (0-1) of the total market with this
   * configuration.
   */
  marketShare?: number;
  /**
   * Output only. The time this distribution was measured.
   */
  measurementTime?: Date;
}

function serializeDistribution(data: any): Distribution {
  return {
    ...data,
    measurementTime: data["measurementTime"] !== undefined ? data["measurementTime"].toISOString() : undefined,
  };
}

function deserializeDistribution(data: any): Distribution {
  return {
    ...data,
    measurementTime: data["measurementTime"] !== undefined ? new Date(data["measurementTime"]) : undefined,
  };
}

/**
 * The environment in which the test is run.
 */
export interface Environment {
  /**
   * An Android device which must be used with an Android test.
   */
  androidDevice?: AndroidDevice;
  /**
   * An iOS device which must be used with an iOS test.
   */
  iosDevice?: IosDevice;
}

/**
 * The matrix of environments in which the test is to be executed.
 */
export interface EnvironmentMatrix {
  /**
   * A list of Android devices; the test will be run only on the specified
   * devices.
   */
  androidDeviceList?: AndroidDeviceList;
  /**
   * A matrix of Android devices.
   */
  androidMatrix?: AndroidMatrix;
  /**
   * A list of iOS devices.
   */
  iosDeviceList?: IosDeviceList;
}

/**
 * A key-value pair passed as an environment variable to the test.
 */
export interface EnvironmentVariable {
  /**
   * Key for the environment variable.
   */
  key?: string;
  /**
   * Value for the environment variable.
   */
  value?: string;
}

/**
 * A reference to a file, used for user inputs.
 */
export interface FileReference {
  /**
   * A path to a file in Google Cloud Storage. Example:
   * gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are
   * expected to be url encoded (percent encoding)
   */
  gcsPath?: string;
}

/**
 * Response containing the details of the specified Android application APK.
 */
export interface GetApkDetailsResponse {
  /**
   * Details of the Android APK.
   */
  apkDetail?: ApkDetail;
}

function serializeGetApkDetailsResponse(data: any): GetApkDetailsResponse {
  return {
    ...data,
    apkDetail: data["apkDetail"] !== undefined ? serializeApkDetail(data["apkDetail"]) : undefined,
  };
}

function deserializeGetApkDetailsResponse(data: any): GetApkDetailsResponse {
  return {
    ...data,
    apkDetail: data["apkDetail"] !== undefined ? deserializeApkDetail(data["apkDetail"]) : undefined,
  };
}

/**
 * Enables automatic Google account login. If set, the service automatically
 * generates a Google test account and adds it to the device, before executing
 * the test. Note that test accounts might be reused. Many applications show
 * their full set of functionalities when an account is present on the device.
 * Logging into the device with these generated accounts allows testing more
 * functionalities.
 */
export interface GoogleAuto {
}

/**
 * A storage location within Google cloud storage (GCS).
 */
export interface GoogleCloudStorage {
  /**
   * Required. The path to a directory in GCS that will eventually contain the
   * results for this test. The requesting user must have write access on the
   * bucket in the supplied path.
   */
  gcsPath?: string;
}

/**
 * The section of an tag.
 * https://developer.android.com/guide/topics/manifest/intent-filter-element.html
 */
export interface IntentFilter {
  /**
   * The android:name value of the tag.
   */
  actionNames?: string[];
  /**
   * The android:name value of the tag.
   */
  categoryNames?: string[];
  /**
   * The android:mimeType value of the tag.
   */
  mimeType?: string;
}

/**
 * A single iOS device.
 */
export interface IosDevice {
  /**
   * Required. The id of the iOS device to be used. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  iosModelId?: string;
  /**
   * Required. The id of the iOS major software version to be used. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  iosVersionId?: string;
  /**
   * Required. The locale the test device used for testing. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  locale?: string;
  /**
   * Required. How the device is oriented during the test. Use the
   * TestEnvironmentDiscoveryService to get supported options.
   */
  orientation?: string;
}

/**
 * The currently supported iOS devices.
 */
export interface IosDeviceCatalog {
  /**
   * The set of supported iOS device models.
   */
  models?: IosModel[];
  /**
   * The set of supported runtime configurations.
   */
  runtimeConfiguration?: IosRuntimeConfiguration;
  /**
   * The set of supported iOS software versions.
   */
  versions?: IosVersion[];
  /**
   * The set of supported Xcode versions.
   */
  xcodeVersions?: XcodeVersion[];
}

/**
 * A file or directory to install on the device before the test starts.
 */
export interface IosDeviceFile {
  /**
   * The bundle id of the app where this file lives. iOS apps sandbox their own
   * filesystem, so app files must specify which app installed on the device.
   */
  bundleId?: string;
  /**
   * The source file
   */
  content?: FileReference;
  /**
   * Location of the file on the device, inside the app's sandboxed filesystem
   */
  devicePath?: string;
}

/**
 * A list of iOS device configurations in which the test is to be executed.
 */
export interface IosDeviceList {
  /**
   * Required. A list of iOS devices.
   */
  iosDevices?: IosDevice[];
}

/**
 * A description of an iOS device tests may be run on.
 */
export interface IosModel {
  /**
   * Device capabilities. Copied from
   * https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html
   */
  deviceCapabilities?: string[];
  /**
   * Whether this device is a phone, tablet, wearable, etc.
   */
  formFactor?:  | "DEVICE_FORM_FACTOR_UNSPECIFIED" | "PHONE" | "TABLET" | "WEARABLE";
  /**
   * The unique opaque id for this model. Use this for invoking the
   * TestExecutionService.
   */
  id?: string;
  /**
   * The human-readable name for this device model. Examples: "iPhone 4s",
   * "iPad Mini 2".
   */
  name?: string;
  /**
   * Version-specific information of an iOS model.
   */
  perVersionInfo?: PerIosVersionInfo[];
  /**
   * Screen density in DPI.
   */
  screenDensity?: number;
  /**
   * Screen size in the horizontal (X) dimension measured in pixels.
   */
  screenX?: number;
  /**
   * Screen size in the vertical (Y) dimension measured in pixels.
   */
  screenY?: number;
  /**
   * The set of iOS major software versions this device supports.
   */
  supportedVersionIds?: string[];
  /**
   * Tags for this dimension. Examples: "default", "preview", "deprecated".
   */
  tags?: string[];
}

/**
 * iOS configuration that can be selected at the time a test is run.
 */
export interface IosRuntimeConfiguration {
  /**
   * The set of available locales.
   */
  locales?: Locale[];
  /**
   * The set of available orientations.
   */
  orientations?: Orientation[];
}

/**
 * A test of an iOS application that implements one or more game loop
 * scenarios. This test type accepts an archived application (.ipa file) and a
 * list of integer scenarios that will be executed on the app sequentially.
 */
export interface IosTestLoop {
  /**
   * Output only. The bundle id for the application under test.
   */
  appBundleId?: string;
  /**
   * Required. The .ipa of the application to test.
   */
  appIpa?: FileReference;
  /**
   * The list of scenarios that should be run during the test. Defaults to the
   * single scenario 0 if unspecified.
   */
  scenarios?: number[];
}

/**
 * A description of how to set up an iOS device prior to running the test.
 */
export interface IosTestSetup {
  /**
   * iOS apps to install in addition to those being directly tested.
   */
  additionalIpas?: FileReference[];
  /**
   * The network traffic profile used for running the test. Available network
   * profiles can be queried by using the NETWORK_CONFIGURATION environment type
   * when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog.
   */
  networkProfile?: string;
  /**
   * List of directories on the device to upload to Cloud Storage at the end of
   * the test. Directories should either be in a shared directory (such as
   * /private/var/mobile/Media) or within an accessible directory inside the
   * app's filesystem (such as /Documents) by specifying the bundle ID.
   */
  pullDirectories?: IosDeviceFile[];
  /**
   * List of files to push to the device before starting the test.
   */
  pushFiles?: IosDeviceFile[];
}

/**
 * An iOS version.
 */
export interface IosVersion {
  /**
   * An opaque id for this iOS version. Use this id to invoke the
   * TestExecutionService.
   */
  id?: string;
  /**
   * An integer representing the major iOS version. Examples: "8", "9".
   */
  majorVersion?: number;
  /**
   * An integer representing the minor iOS version. Examples: "1", "2".
   */
  minorVersion?: number;
  /**
   * The available Xcode versions for this version.
   */
  supportedXcodeVersionIds?: string[];
  /**
   * Tags for this dimension. Examples: "default", "preview", "deprecated".
   */
  tags?: string[];
}

/**
 * A test of an iOS application that uses the XCTest framework. Xcode supports
 * the option to "build for testing", which generates an .xctestrun file that
 * contains a test specification (arguments, test methods, etc). This test type
 * accepts a zip file containing the .xctestrun file and the corresponding
 * contents of the Build/Products directory that contains all the binaries
 * needed to run the tests.
 */
export interface IosXcTest {
  /**
   * Output only. The bundle id for the application under test.
   */
  appBundleId?: string;
  /**
   * The option to test special app entitlements. Setting this would re-sign
   * the app having special entitlements with an explicit
   * application-identifier. Currently supports testing aps-environment
   * entitlement.
   */
  testSpecialEntitlements?: boolean;
  /**
   * Required. The .zip containing the .xctestrun file and the contents of the
   * DerivedData/Build/Products directory. The .xctestrun file in this zip is
   * ignored if the xctestrun field is specified.
   */
  testsZip?: FileReference;
  /**
   * The Xcode version that should be used for the test. Use the
   * TestEnvironmentDiscoveryService to get supported options. Defaults to the
   * latest Xcode version Firebase Test Lab supports.
   */
  xcodeVersion?: string;
  /**
   * An .xctestrun file that will override the .xctestrun file in the tests
   * zip. Because the .xctestrun file contains environment variables along with
   * test methods to run and/or ignore, this can be useful for sharding tests.
   * Default is taken from the tests zip.
   */
  xctestrun?: FileReference;
}

/**
 * Specifies an intent that starts the main launcher activity.
 */
export interface LauncherActivityIntent {
}

/**
 * A location/region designation for language.
 */
export interface Locale {
  /**
   * The id for this locale. Example: "en_US".
   */
  id?: string;
  /**
   * A human-friendly name for this language/locale. Example: "English".
   */
  name?: string;
  /**
   * A human-friendly string representing the region for this locale. Example:
   * "United States". Not present for every locale.
   */
  region?: string;
  /**
   * Tags for this dimension. Example: "default".
   */
  tags?: string[];
}

/**
 * Shards test cases into the specified groups of packages, classes, and/or
 * methods. With manual sharding enabled, specifying test targets via
 * environment_variables or in InstrumentationTest is invalid.
 */
export interface ManualSharding {
  /**
   * Required. Group of packages, classes, and/or test methods to be run for
   * each manually-created shard. You must specify at least one shard if this
   * field is present. When you select one or more physical devices, the number
   * of repeated test_targets_for_shard must be <= 50. When you select one or
   * more ARM virtual devices, it must be <= 100. When you select only x86
   * virtual devices, it must be <= 500.
   */
  testTargetsForShard?: TestTargetsForShard[];
}

/**
 * A tag within a manifest.
 * https://developer.android.com/guide/topics/manifest/meta-data-element.html
 */
export interface Metadata {
  /**
   * The android:name value
   */
  name?: string;
  /**
   * The android:value value
   */
  value?: string;
}

export interface NetworkConfiguration {
  /**
   * The emulation rule applying to the download traffic.
   */
  downRule?: TrafficRule;
  /**
   * The unique opaque id for this network traffic configuration.
   */
  id?: string;
  /**
   * The emulation rule applying to the upload traffic.
   */
  upRule?: TrafficRule;
}

function serializeNetworkConfiguration(data: any): NetworkConfiguration {
  return {
    ...data,
    downRule: data["downRule"] !== undefined ? serializeTrafficRule(data["downRule"]) : undefined,
    upRule: data["upRule"] !== undefined ? serializeTrafficRule(data["upRule"]) : undefined,
  };
}

function deserializeNetworkConfiguration(data: any): NetworkConfiguration {
  return {
    ...data,
    downRule: data["downRule"] !== undefined ? deserializeTrafficRule(data["downRule"]) : undefined,
    upRule: data["upRule"] !== undefined ? deserializeTrafficRule(data["upRule"]) : undefined,
  };
}

export interface NetworkConfigurationCatalog {
  configurations?: NetworkConfiguration[];
}

function serializeNetworkConfigurationCatalog(data: any): NetworkConfigurationCatalog {
  return {
    ...data,
    configurations: data["configurations"] !== undefined ? data["configurations"].map((item: any) => (serializeNetworkConfiguration(item))) : undefined,
  };
}

function deserializeNetworkConfigurationCatalog(data: any): NetworkConfigurationCatalog {
  return {
    ...data,
    configurations: data["configurations"] !== undefined ? data["configurations"].map((item: any) => (deserializeNetworkConfiguration(item))) : undefined,
  };
}

/**
 * An opaque binary blob file to install on the device before the test starts.
 */
export interface ObbFile {
  /**
   * Required. Opaque Binary Blob (OBB) file(s) to install on the device.
   */
  obb?: FileReference;
  /**
   * Required. OBB file name which must conform to the format as specified by
   * Android e.g. [main|patch].0300110.com.example.android.obb which will be
   * installed into \/Android/obb/\/ on the device.
   */
  obbFileName?: string;
}

/**
 * Screen orientation of the device.
 */
export interface Orientation {
  /**
   * The id for this orientation. Example: "portrait".
   */
  id?: string;
  /**
   * A human-friendly name for this orientation. Example: "portrait".
   */
  name?: string;
  /**
   * Tags for this dimension. Example: "default".
   */
  tags?: string[];
}

/**
 * A version-specific information of an Android model.
 */
export interface PerAndroidVersionInfo {
  /**
   * The number of online devices for an Android version.
   */
  deviceCapacity?:  | "DEVICE_CAPACITY_UNSPECIFIED" | "DEVICE_CAPACITY_HIGH" | "DEVICE_CAPACITY_MEDIUM" | "DEVICE_CAPACITY_LOW" | "DEVICE_CAPACITY_NONE";
  /**
   * An Android version.
   */
  versionId?: string;
}

/**
 * A version-specific information of an iOS model.
 */
export interface PerIosVersionInfo {
  /**
   * The number of online devices for an iOS version.
   */
  deviceCapacity?:  | "DEVICE_CAPACITY_UNSPECIFIED" | "DEVICE_CAPACITY_HIGH" | "DEVICE_CAPACITY_MEDIUM" | "DEVICE_CAPACITY_LOW" | "DEVICE_CAPACITY_NONE";
  /**
   * An iOS version.
   */
  versionId?: string;
}

/**
 * Additional options for Testing#projectsTestMatricesCreate.
 */
export interface ProjectsTestMatricesCreateOptions {
  /**
   * A string id used to detect duplicated requests. Ids are automatically
   * scoped to a project, so users should ensure the ID is unique per-project. A
   * UUID is recommended. Optional, but strongly recommended.
   */
  requestId?: string;
}

/**
 * The currently provided software environment on the devices under test.
 */
export interface ProvidedSoftwareCatalog {
  /**
   * A string representing the current version of AndroidX Test Orchestrator
   * that is used in the environment. The package is available at
   * https://maven.google.com/web/index.html#androidx.test:orchestrator.
   */
  androidxOrchestratorVersion?: string;
  /**
   * Deprecated: Use AndroidX Test Orchestrator going forward. A string
   * representing the current version of Android Test Orchestrator that is used
   * in the environment. The package is available at
   * https://maven.google.com/web/index.html#com.android.support.test:orchestrator.
   */
  orchestratorVersion?: string;
}

/**
 * A file or directory to install on the device before the test starts.
 */
export interface RegularFile {
  /**
   * Required. The source file.
   */
  content?: FileReference;
  /**
   * Required. Where to put the content on the device. Must be an absolute,
   * allowlisted path. If the file exists, it will be replaced. The following
   * device-side directories and any of their subdirectories are allowlisted:
   * ${EXTERNAL_STORAGE}, /sdcard, or /storage ${ANDROID_DATA}/local/tmp, or
   * /data/local/tmp Specifying a path outside of these directory trees is
   * invalid. The paths /sdcard and /data will be made available and treated as
   * implicit path substitutions. E.g. if /sdcard on a particular device does
   * not map to external storage, the system will replace it with the external
   * storage path prefix for that device and copy the file there. It is strongly
   * advised to use the Environment API in app and test code to access files on
   * the device in a portable way.
   */
  devicePath?: string;
}

/**
 * Locations where the results of running the test are stored.
 */
export interface ResultStorage {
  /**
   * Required.
   */
  googleCloudStorage?: GoogleCloudStorage;
  /**
   * Output only. URL to the results in the Firebase Web Console.
   */
  resultsUrl?: string;
  /**
   * Output only. The tool results execution that results are written to.
   */
  toolResultsExecution?: ToolResultsExecution;
  /**
   * The tool results history that contains the tool results execution that
   * results are written to. If not provided, the service will choose an
   * appropriate value.
   */
  toolResultsHistory?: ToolResultsHistory;
}

/**
 * Directs Robo to interact with a specific UI element if it is encountered
 * during the crawl. Currently, Robo can perform text entry or element click.
 */
export interface RoboDirective {
  /**
   * Required. The type of action that Robo should perform on the specified
   * element.
   */
  actionType?:  | "ACTION_TYPE_UNSPECIFIED" | "SINGLE_CLICK" | "ENTER_TEXT" | "IGNORE";
  /**
   * The text that Robo is directed to set. If left empty, the directive will
   * be treated as a CLICK on the element matching the resource_name.
   */
  inputText?: string;
  /**
   * Required. The android resource name of the target UI element. For example,
   * in Java: R.string.foo in xml: @string/foo Only the "foo" part is needed.
   * Reference doc:
   * https://developer.android.com/guide/topics/resources/accessing-resources.html
   */
  resourceName?: string;
}

/**
 * Message for specifying the start activities to crawl.
 */
export interface RoboStartingIntent {
  /**
   * An intent that starts the main launcher activity.
   */
  launcherActivity?: LauncherActivityIntent;
  /**
   * An intent that starts an activity with specific details.
   */
  startActivity?: StartActivityIntent;
  /**
   * Timeout in seconds for each intent.
   */
  timeout?: number /* Duration */;
}

function serializeRoboStartingIntent(data: any): RoboStartingIntent {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeRoboStartingIntent(data: any): RoboStartingIntent {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Output only. Details about the shard.
 */
export interface Shard {
  /**
   * Output only. The total number of shards.
   */
  numShards?: number;
  /**
   * Output only. The index of the shard among all the shards.
   */
  shardIndex?: number;
  /**
   * Output only. Test targets for each shard. Only set for manual sharding.
   */
  testTargetsForShard?: TestTargetsForShard;
}

/**
 * Options for enabling sharding.
 */
export interface ShardingOption {
  /**
   * Shards test cases into the specified groups of packages, classes, and/or
   * methods.
   */
  manualSharding?: ManualSharding;
  /**
   * Uniformly shards test cases given a total number of shards.
   */
  uniformSharding?: UniformSharding;
}

/**
 * A starting intent specified by an action, uri, and categories.
 */
export interface StartActivityIntent {
  /**
   * Action name. Required for START_ACTIVITY.
   */
  action?: string;
  /**
   * Intent categories to set on the intent.
   */
  categories?: string[];
  /**
   * URI for the action.
   */
  uri?: string;
}

export interface SystraceSetup {
  /**
   * Systrace duration in seconds. Should be between 1 and 30 seconds. 0
   * disables systrace.
   */
  durationSeconds?: number;
}

/**
 * Additional details about the progress of the running test.
 */
export interface TestDetails {
  /**
   * Output only. If the TestState is ERROR, then this string will contain
   * human-readable details about the error.
   */
  errorMessage?: string;
  /**
   * Output only. Human-readable, detailed descriptions of the test's progress.
   * For example: "Provisioning a device", "Starting Test". During the course of
   * execution new data may be appended to the end of progress_messages.
   */
  progressMessages?: string[];
}

/**
 * A description of a test environment.
 */
export interface TestEnvironmentCatalog {
  /**
   * Supported Android devices.
   */
  androidDeviceCatalog?: AndroidDeviceCatalog;
  /**
   * The IP blocks used by devices in the test environment.
   */
  deviceIpBlockCatalog?: DeviceIpBlockCatalog;
  /**
   * Supported iOS devices.
   */
  iosDeviceCatalog?: IosDeviceCatalog;
  /**
   * Supported network configurations.
   */
  networkConfigurationCatalog?: NetworkConfigurationCatalog;
  /**
   * The software test environment provided by TestExecutionService.
   */
  softwareCatalog?: ProvidedSoftwareCatalog;
}

function serializeTestEnvironmentCatalog(data: any): TestEnvironmentCatalog {
  return {
    ...data,
    androidDeviceCatalog: data["androidDeviceCatalog"] !== undefined ? serializeAndroidDeviceCatalog(data["androidDeviceCatalog"]) : undefined,
    networkConfigurationCatalog: data["networkConfigurationCatalog"] !== undefined ? serializeNetworkConfigurationCatalog(data["networkConfigurationCatalog"]) : undefined,
  };
}

function deserializeTestEnvironmentCatalog(data: any): TestEnvironmentCatalog {
  return {
    ...data,
    androidDeviceCatalog: data["androidDeviceCatalog"] !== undefined ? deserializeAndroidDeviceCatalog(data["androidDeviceCatalog"]) : undefined,
    networkConfigurationCatalog: data["networkConfigurationCatalog"] !== undefined ? deserializeNetworkConfigurationCatalog(data["networkConfigurationCatalog"]) : undefined,
  };
}

/**
 * Additional options for Testing#testEnvironmentCatalogGet.
 */
export interface TestEnvironmentCatalogGetOptions {
  /**
   * For authorization, the cloud project requesting the
   * TestEnvironmentCatalog.
   */
  projectId?: string;
}

/**
 * A single test executed in a single environment.
 */
export interface TestExecution {
  /**
   * Output only. How the host machine(s) are configured.
   */
  environment?: Environment;
  /**
   * Output only. Unique id set by the service.
   */
  id?: string;
  /**
   * Output only. Id of the containing TestMatrix.
   */
  matrixId?: string;
  /**
   * Output only. The cloud project that owns the test execution.
   */
  projectId?: string;
  /**
   * Output only. Details about the shard.
   */
  shard?: Shard;
  /**
   * Output only. Indicates the current progress of the test execution (e.g.,
   * FINISHED).
   */
  state?:  | "TEST_STATE_UNSPECIFIED" | "VALIDATING" | "PENDING" | "RUNNING" | "FINISHED" | "ERROR" | "UNSUPPORTED_ENVIRONMENT" | "INCOMPATIBLE_ENVIRONMENT" | "INCOMPATIBLE_ARCHITECTURE" | "CANCELLED" | "INVALID";
  /**
   * Output only. Additional details about the running test.
   */
  testDetails?: TestDetails;
  /**
   * Output only. How to run the test.
   */
  testSpecification?: TestSpecification;
  /**
   * Output only. The time this test execution was initially created.
   */
  timestamp?: Date;
  /**
   * Output only. Where the results for this execution are written.
   */
  toolResultsStep?: ToolResultsStep;
}

function serializeTestExecution(data: any): TestExecution {
  return {
    ...data,
    testSpecification: data["testSpecification"] !== undefined ? serializeTestSpecification(data["testSpecification"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeTestExecution(data: any): TestExecution {
  return {
    ...data,
    testSpecification: data["testSpecification"] !== undefined ? deserializeTestSpecification(data["testSpecification"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * TestMatrix captures all details about a test. It contains the environment
 * configuration, test specification, test executions and overall state and
 * outcome.
 */
export interface TestMatrix {
  /**
   * Information about the client which invoked the test.
   */
  clientInfo?: ClientInfo;
  /**
   * Required. The devices the tests are being executed on.
   */
  environmentMatrix?: EnvironmentMatrix;
  /**
   * If true, only a single attempt at most will be made to run each
   * execution/shard in the matrix. Flaky test attempts are not affected.
   * Normally, 2 or more attempts are made if a potential infrastructure issue
   * is detected. This feature is for latency sensitive workloads. The incidence
   * of execution failures may be significantly greater for fail-fast matrices
   * and support is more limited because of that expectation.
   */
  failFast?: boolean;
  /**
   * The number of times a TestExecution should be re-attempted if one or more
   * of its test cases fail for any reason. The maximum number of reruns allowed
   * is 10. Default is 0, which implies no reruns.
   */
  flakyTestAttempts?: number;
  /**
   * Output only. Describes why the matrix is considered invalid. Only useful
   * for matrices in the INVALID state.
   */
  invalidMatrixDetails?:  | "INVALID_MATRIX_DETAILS_UNSPECIFIED" | "DETAILS_UNAVAILABLE" | "MALFORMED_APK" | "MALFORMED_TEST_APK" | "NO_MANIFEST" | "NO_PACKAGE_NAME" | "INVALID_PACKAGE_NAME" | "TEST_SAME_AS_APP" | "NO_INSTRUMENTATION" | "NO_SIGNATURE" | "INSTRUMENTATION_ORCHESTRATOR_INCOMPATIBLE" | "NO_TEST_RUNNER_CLASS" | "NO_LAUNCHER_ACTIVITY" | "FORBIDDEN_PERMISSIONS" | "INVALID_ROBO_DIRECTIVES" | "INVALID_RESOURCE_NAME" | "INVALID_DIRECTIVE_ACTION" | "TEST_LOOP_INTENT_FILTER_NOT_FOUND" | "SCENARIO_LABEL_NOT_DECLARED" | "SCENARIO_LABEL_MALFORMED" | "SCENARIO_NOT_DECLARED" | "DEVICE_ADMIN_RECEIVER" | "MALFORMED_XC_TEST_ZIP" | "BUILT_FOR_IOS_SIMULATOR" | "NO_TESTS_IN_XC_TEST_ZIP" | "USE_DESTINATION_ARTIFACTS" | "TEST_NOT_APP_HOSTED" | "PLIST_CANNOT_BE_PARSED" | "TEST_ONLY_APK" | "MALFORMED_IPA" | "MISSING_URL_SCHEME" | "MALFORMED_APP_BUNDLE" | "NO_CODE_APK" | "INVALID_INPUT_APK" | "INVALID_APK_PREVIEW_SDK" | "MATRIX_TOO_LARGE" | "TEST_QUOTA_EXCEEDED" | "SERVICE_NOT_ACTIVATED" | "UNKNOWN_PERMISSION_ERROR";
  /**
   * Output Only. The overall outcome of the test. Only set when the test
   * matrix state is FINISHED.
   */
  outcomeSummary?:  | "OUTCOME_SUMMARY_UNSPECIFIED" | "SUCCESS" | "FAILURE" | "INCONCLUSIVE" | "SKIPPED";
  /**
   * The cloud project that owns the test matrix.
   */
  projectId?: string;
  /**
   * Required. Where the results for the matrix are written.
   */
  resultStorage?: ResultStorage;
  /**
   * Output only. Indicates the current progress of the test matrix.
   */
  state?:  | "TEST_STATE_UNSPECIFIED" | "VALIDATING" | "PENDING" | "RUNNING" | "FINISHED" | "ERROR" | "UNSUPPORTED_ENVIRONMENT" | "INCOMPATIBLE_ENVIRONMENT" | "INCOMPATIBLE_ARCHITECTURE" | "CANCELLED" | "INVALID";
  /**
   * Output only. The list of test executions that the service creates for this
   * matrix.
   */
  testExecutions?: TestExecution[];
  /**
   * Output only. Unique id set by the service.
   */
  testMatrixId?: string;
  /**
   * Required. How to run the test.
   */
  testSpecification?: TestSpecification;
  /**
   * Output only. The time this test matrix was initially created.
   */
  timestamp?: Date;
}

function serializeTestMatrix(data: any): TestMatrix {
  return {
    ...data,
    testExecutions: data["testExecutions"] !== undefined ? data["testExecutions"].map((item: any) => (serializeTestExecution(item))) : undefined,
    testSpecification: data["testSpecification"] !== undefined ? serializeTestSpecification(data["testSpecification"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeTestMatrix(data: any): TestMatrix {
  return {
    ...data,
    testExecutions: data["testExecutions"] !== undefined ? data["testExecutions"].map((item: any) => (deserializeTestExecution(item))) : undefined,
    testSpecification: data["testSpecification"] !== undefined ? deserializeTestSpecification(data["testSpecification"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * A description of how to set up the Android device prior to running the test.
 */
export interface TestSetup {
  /**
   * The device will be logged in on this account for the duration of the test.
   */
  account?: Account;
  /**
   * APKs to install in addition to those being directly tested. Currently
   * capped at 100.
   */
  additionalApks?: Apk[];
  /**
   * List of directories on the device to upload to GCS at the end of the test;
   * they must be absolute paths under /sdcard, /storage or /data/local/tmp.
   * Path names are restricted to characters a-z A-Z 0-9 _ - . + and / Note: The
   * paths /sdcard and /data will be made available and treated as implicit path
   * substitutions. E.g. if /sdcard on a particular device does not map to
   * external storage, the system will replace it with the external storage path
   * prefix for that device.
   */
  directoriesToPull?: string[];
  /**
   * Whether to prevent all runtime permissions to be granted at app install
   */
  dontAutograntPermissions?: boolean;
  /**
   * Environment variables to set for the test (only applicable for
   * instrumentation tests).
   */
  environmentVariables?: EnvironmentVariable[];
  /**
   * List of files to push to the device before starting the test.
   */
  filesToPush?: DeviceFile[];
  /**
   * The network traffic profile used for running the test. Available network
   * profiles can be queried by using the NETWORK_CONFIGURATION environment type
   * when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog.
   */
  networkProfile?: string;
  /**
   * Deprecated: Systrace uses Python 2 which has been sunset 2020-01-01.
   * Support of Systrace may stop at any time, at which point no Systrace file
   * will be provided in the results. Systrace configuration for the run. If set
   * a systrace will be taken, starting on test start and lasting for the
   * configured duration. The systrace file thus obtained is put in the results
   * bucket together with the other artifacts from the run.
   */
  systrace?: SystraceSetup;
}

/**
 * A description of how to run the test.
 */
export interface TestSpecification {
  /**
   * An Android instrumentation test.
   */
  androidInstrumentationTest?: AndroidInstrumentationTest;
  /**
   * An Android robo test.
   */
  androidRoboTest?: AndroidRoboTest;
  /**
   * An Android Application with a Test Loop.
   */
  androidTestLoop?: AndroidTestLoop;
  /**
   * Disables performance metrics recording. May reduce test latency.
   */
  disablePerformanceMetrics?: boolean;
  /**
   * Disables video recording. May reduce test latency.
   */
  disableVideoRecording?: boolean;
  /**
   * An iOS application with a test loop.
   */
  iosTestLoop?: IosTestLoop;
  /**
   * Test setup requirements for iOS.
   */
  iosTestSetup?: IosTestSetup;
  /**
   * An iOS XCTest, via an .xctestrun file.
   */
  iosXcTest?: IosXcTest;
  /**
   * Test setup requirements for Android e.g. files to install, bootstrap
   * scripts.
   */
  testSetup?: TestSetup;
  /**
   * Max time a test execution is allowed to run before it is automatically
   * cancelled. The default value is 5 min.
   */
  testTimeout?: number /* Duration */;
}

function serializeTestSpecification(data: any): TestSpecification {
  return {
    ...data,
    androidRoboTest: data["androidRoboTest"] !== undefined ? serializeAndroidRoboTest(data["androidRoboTest"]) : undefined,
    testTimeout: data["testTimeout"] !== undefined ? data["testTimeout"] : undefined,
  };
}

function deserializeTestSpecification(data: any): TestSpecification {
  return {
    ...data,
    androidRoboTest: data["androidRoboTest"] !== undefined ? deserializeAndroidRoboTest(data["androidRoboTest"]) : undefined,
    testTimeout: data["testTimeout"] !== undefined ? data["testTimeout"] : undefined,
  };
}

/**
 * Test targets for a shard.
 */
export interface TestTargetsForShard {
  /**
   * Group of packages, classes, and/or test methods to be run for each shard.
   * The targets need to be specified in AndroidJUnitRunner argument format. For
   * example, "package com.my.packages" "class com.my.package.MyClass". The
   * number of test_targets must be greater than 0.
   */
  testTargets?: string[];
}

/**
 * Represents a tool results execution resource. This has the results of a
 * TestMatrix.
 */
export interface ToolResultsExecution {
  /**
   * Output only. A tool results execution ID.
   */
  executionId?: string;
  /**
   * Output only. A tool results history ID.
   */
  historyId?: string;
  /**
   * Output only. The cloud project that owns the tool results execution.
   */
  projectId?: string;
}

/**
 * Represents a tool results history resource.
 */
export interface ToolResultsHistory {
  /**
   * Required. A tool results history ID.
   */
  historyId?: string;
  /**
   * Required. The cloud project that owns the tool results history.
   */
  projectId?: string;
}

/**
 * Represents a tool results step resource. This has the results of a
 * TestExecution.
 */
export interface ToolResultsStep {
  /**
   * Output only. A tool results execution ID.
   */
  executionId?: string;
  /**
   * Output only. A tool results history ID.
   */
  historyId?: string;
  /**
   * Output only. The cloud project that owns the tool results step.
   */
  projectId?: string;
  /**
   * Output only. A tool results step ID.
   */
  stepId?: string;
}

/**
 * Network emulation parameters.
 */
export interface TrafficRule {
  /**
   * Bandwidth in kbits/second.
   */
  bandwidth?: number;
  /**
   * Burst size in kbits.
   */
  burst?: number;
  /**
   * Packet delay, must be >= 0.
   */
  delay?: number /* Duration */;
  /**
   * Packet duplication ratio (0.0 - 1.0).
   */
  packetDuplicationRatio?: number;
  /**
   * Packet loss ratio (0.0 - 1.0).
   */
  packetLossRatio?: number;
}

function serializeTrafficRule(data: any): TrafficRule {
  return {
    ...data,
    delay: data["delay"] !== undefined ? data["delay"] : undefined,
  };
}

function deserializeTrafficRule(data: any): TrafficRule {
  return {
    ...data,
    delay: data["delay"] !== undefined ? data["delay"] : undefined,
  };
}

/**
 * Uniformly shards test cases given a total number of shards. For
 * instrumentation tests, it will be translated to "-e numShard" and "-e
 * shardIndex" AndroidJUnitRunner arguments. With uniform sharding enabled,
 * specifying either of these sharding arguments via `environment_variables` is
 * invalid. Based on the sharding mechanism AndroidJUnitRunner uses, there is no
 * guarantee that test cases will be distributed uniformly across all shards.
 */
export interface UniformSharding {
  /**
   * Required. The total number of shards to create. This must always be a
   * positive number that is no greater than the total number of test cases.
   * When you select one or more physical devices, the number of shards must be
   * <= 50. When you select one or more ARM virtual devices, it must be <= 100.
   * When you select only x86 virtual devices, it must be <= 500.
   */
  numShards?: number;
}

/**
 * A tag within a manifest.
 * https://developer.android.com/guide/topics/manifest/uses-feature-element.html
 */
export interface UsesFeature {
  /**
   * The android:required value
   */
  isRequired?: boolean;
  /**
   * The android:name value
   */
  name?: string;
}

/**
 * An Xcode version that an iOS version is compatible with.
 */
export interface XcodeVersion {
  /**
   * Tags for this Xcode version. Example: "default".
   */
  tags?: string[];
  /**
   * The id for this version. Example: "9.2".
   */
  version?: string;
}