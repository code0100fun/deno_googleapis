// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud SQL Admin API Client for Deno
 * ===================================
 * 
 * API for Cloud SQL database instance management
 * 
 * Docs: https://developers.google.com/cloud-sql/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * API for Cloud SQL database instance management
 */
export class SQLAdmin {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://sqladmin.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes the backup taken by a backup run.
   *
   * @param id The ID of the backup run to delete. To find a backup run ID, use the [list](https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1/backupRuns/list) method.
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async backupRunsDelete(id: bigint, instance: string, project: string): Promise<Operation> {
    id = String(id);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/backupRuns/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeOperation(data);
  }

  /**
   * Retrieves a resource containing information about a backup run.
   *
   * @param id The ID of this backup run.
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async backupRunsGet(id: bigint, instance: string, project: string): Promise<BackupRun> {
    id = String(id);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/backupRuns/${ id }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBackupRun(data);
  }

  /**
   * Creates a new backup run on demand.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async backupRunsInsert(instance: string, project: string, req: BackupRun): Promise<Operation> {
    req = serializeBackupRun(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/backupRuns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Lists all backup runs associated with the project or a given instance and
   * configuration in the reverse chronological order of the backup initiation
   * time.
   *
   * @param instance Cloud SQL instance ID, or "-" for all instances. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async backupRunsList(instance: string, project: string, opts: BackupRunsListOptions = {}): Promise<BackupRunsListResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/backupRuns`);
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
    return deserializeBackupRunsListResponse(data);
  }

  /**
   * Generates a short-lived X509 certificate containing the provided public
   * key and signed by a private key specific to the target instance. Users may
   * use the certificate to authenticate as themselves when connecting to the
   * database.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async connectGenerateEphemeralCert(instance: string, project: string, req: GenerateEphemeralCertRequest): Promise<GenerateEphemeralCertResponse> {
    req = serializeGenerateEphemeralCertRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }:generateEphemeralCert`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGenerateEphemeralCertResponse(data);
  }

  /**
   * Retrieves connect settings about a Cloud SQL instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async connectGet(instance: string, project: string, opts: ConnectGetOptions = {}): Promise<ConnectSettings> {
    opts = serializeConnectGetOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/connectSettings`);
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConnectSettings(data);
  }

  /**
   * Deletes a database from a Cloud SQL instance.
   *
   * @param database Name of the database to be deleted in the instance.
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async databasesDelete(database: string, instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/databases/${ database }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeOperation(data);
  }

  /**
   * Retrieves a resource containing information about a database inside a
   * Cloud SQL instance.
   *
   * @param database Name of the database in the instance.
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async databasesGet(database: string, instance: string, project: string): Promise<Database> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/databases/${ database }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Database;
  }

  /**
   * Inserts a resource containing information about a database inside a Cloud
   * SQL instance.
   *
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async databasesInsert(instance: string, project: string, req: Database): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/databases`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Lists databases in the specified Cloud SQL instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async databasesList(instance: string, project: string): Promise<DatabasesListResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/databases`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DatabasesListResponse;
  }

  /**
   * Partially updates a resource containing information about a database
   * inside a Cloud SQL instance. This method supports patch semantics.
   *
   * @param database Name of the database to be updated in the instance.
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async databasesPatch(database: string, instance: string, project: string, req: Database): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/databases/${ database }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Updates a resource containing information about a database inside a Cloud
   * SQL instance.
   *
   * @param database Name of the database to be updated in the instance.
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async databasesUpdate(database: string, instance: string, project: string, req: Database): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/databases/${ database }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Lists all available database flags for Cloud SQL instances.
   *
   */
  async flagsList(opts: FlagsListOptions = {}): Promise<FlagsListResponse> {
    const url = new URL(`${this.#baseUrl}v1/flags`);
    if (opts.databaseVersion !== undefined) {
      url.searchParams.append("databaseVersion", String(opts.databaseVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFlagsListResponse(data);
  }

  /**
   * Adds a new trusted Certificate Authority (CA) version for the specified
   * instance. Required to prepare for a certificate rotation. If a CA version
   * was previously added but never used in a certificate rotation, this
   * operation replaces that version. There cannot be more than one CA version
   * waiting to be rotated in.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesAddServerCa(instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/addServerCa`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeOperation(data);
  }

  /**
   * Creates a Cloud SQL instance as a clone of the source instance. Using this
   * operation might cause your instance to restart.
   *
   * @param instance The ID of the Cloud SQL instance to be cloned (source). This does not include the project ID.
   * @param project Project ID of the source as well as the clone Cloud SQL instance.
   */
  async instancesClone(instance: string, project: string, req: InstancesCloneRequest): Promise<Operation> {
    req = serializeInstancesCloneRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/clone`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Deletes a Cloud SQL instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance to be deleted.
   */
  async instancesDelete(instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeOperation(data);
  }

  /**
   * Demotes the stand-alone instance to be a Cloud SQL read replica for an
   * external database server.
   *
   * @param instance Cloud SQL instance name.
   * @param project ID of the project that contains the instance.
   */
  async instancesDemoteMaster(instance: string, project: string, req: InstancesDemoteMasterRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/demoteMaster`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Exports data from a Cloud SQL instance to a Cloud Storage bucket as a SQL
   * dump or CSV file.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance to be exported.
   */
  async instancesExport(instance: string, project: string, req: InstancesExportRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Initiates a manual failover of a high availability (HA) primary instance
   * to a standby instance, which becomes the primary instance. Users are then
   * rerouted to the new primary. For more information, see the [Overview of
   * high
   * availability](https://cloud.google.com/sql/docs/mysql/high-availability)
   * page in the Cloud SQL documentation. If using Legacy HA (MySQL only), this
   * causes the instance to failover to its failover replica instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project ID of the project that contains the read replica.
   */
  async instancesFailover(instance: string, project: string, req: InstancesFailoverRequest): Promise<Operation> {
    req = serializeInstancesFailoverRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/failover`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Retrieves a resource containing information about a Cloud SQL instance.
   *
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesGet(instance: string, project: string): Promise<DatabaseInstance> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDatabaseInstance(data);
  }

  /**
   * Imports data into a Cloud SQL instance from a SQL dump or CSV file in
   * Cloud Storage.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesImport(instance: string, project: string, req: InstancesImportRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Creates a new Cloud SQL instance.
   *
   * @param project Project ID of the project to which the newly created Cloud SQL instances should belong.
   */
  async instancesInsert(project: string, req: DatabaseInstance): Promise<Operation> {
    req = serializeDatabaseInstance(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Lists instances under a given project.
   *
   * @param project Project ID of the project for which to list Cloud SQL instances.
   */
  async instancesList(project: string, opts: InstancesListOptions = {}): Promise<InstancesListResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
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
    return deserializeInstancesListResponse(data);
  }

  /**
   * Lists all of the trusted Certificate Authorities (CAs) for the specified
   * instance. There can be up to three CAs listed: the CA that was used to sign
   * the certificate that is currently in use, a CA that has been added but not
   * yet used to sign a certificate, and a CA used to sign a certificate that
   * has previously rotated out.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesListServerCas(instance: string, project: string): Promise<InstancesListServerCasResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/listServerCas`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInstancesListServerCasResponse(data);
  }

  /**
   * Partially updates settings of a Cloud SQL instance by merging the request
   * with the current configuration. This method supports patch semantics.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesPatch(instance: string, project: string, req: DatabaseInstance): Promise<Operation> {
    req = serializeDatabaseInstance(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Promotes the read replica instance to be a stand-alone Cloud SQL instance.
   * Using this operation might cause your instance to restart.
   *
   * @param instance Cloud SQL read replica instance name.
   * @param project ID of the project that contains the read replica.
   */
  async instancesPromoteReplica(instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/promoteReplica`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeOperation(data);
  }

  /**
   * Deletes all client certificates and generates a new server SSL certificate
   * for the instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesResetSslConfig(instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/resetSslConfig`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeOperation(data);
  }

  /**
   * Restarts a Cloud SQL instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance to be restarted.
   */
  async instancesRestart(instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/restart`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeOperation(data);
  }

  /**
   * Restores a backup of a Cloud SQL instance. Using this operation might
   * cause your instance to restart.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesRestoreBackup(instance: string, project: string, req: InstancesRestoreBackupRequest): Promise<Operation> {
    req = serializeInstancesRestoreBackupRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/restoreBackup`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Rotates the server certificate to one signed by the Certificate Authority
   * (CA) version previously added with the addServerCA method.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesRotateServerCa(instance: string, project: string, req: InstancesRotateServerCaRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/rotateServerCa`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Starts the replication in the read replica instance.
   *
   * @param instance Cloud SQL read replica instance name.
   * @param project ID of the project that contains the read replica.
   */
  async instancesStartReplica(instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/startReplica`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeOperation(data);
  }

  /**
   * Stops the replication in the read replica instance.
   *
   * @param instance Cloud SQL read replica instance name.
   * @param project ID of the project that contains the read replica.
   */
  async instancesStopReplica(instance: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/stopReplica`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeOperation(data);
  }

  /**
   * Truncate MySQL general and slow query log tables MySQL only.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the Cloud SQL project.
   */
  async instancesTruncateLog(instance: string, project: string, req: InstancesTruncateLogRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/truncateLog`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Updates settings of a Cloud SQL instance. Using this operation might cause
   * your instance to restart.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async instancesUpdate(instance: string, project: string, req: DatabaseInstance): Promise<Operation> {
    req = serializeDatabaseInstance(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Retrieves an instance operation that has been performed on an instance.
   *
   * @param operation Instance operation ID.
   * @param project Project ID of the project that contains the instance.
   */
  async operationsGet(operation: string, project: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/operations/${ operation }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperation(data);
  }

  /**
   * Lists all instance operations that have been performed on the given Cloud
   * SQL instance in the reverse chronological order of the start time.
   *
   * @param project Project ID of the project that contains the instance.
   */
  async operationsList(project: string, opts: OperationsListOptions = {}): Promise<OperationsListResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/operations`);
    if (opts.instance !== undefined) {
      url.searchParams.append("instance", String(opts.instance));
    }
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
    return deserializeOperationsListResponse(data);
  }

  /**
   * Get Disk Shrink Config for a given instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async projectsInstancesGetDiskShrinkConfig(instance: string, project: string): Promise<SqlInstancesGetDiskShrinkConfigResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/getDiskShrinkConfig`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSqlInstancesGetDiskShrinkConfigResponse(data);
  }

  /**
   * Perform Disk Shrink on primary instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async projectsInstancesPerformDiskShrink(instance: string, project: string, req: PerformDiskShrinkContext): Promise<Operation> {
    req = serializePerformDiskShrinkContext(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/performDiskShrink`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Reschedules the maintenance on the given instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project ID of the project that contains the instance.
   */
  async projectsInstancesRescheduleMaintenance(instance: string, project: string, req: SqlInstancesRescheduleMaintenanceRequestBody): Promise<Operation> {
    req = serializeSqlInstancesRescheduleMaintenanceRequestBody(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/rescheduleMaintenance`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Reset Replica Size to primary instance disk size.
   *
   * @param instance Cloud SQL read replica instance name.
   * @param project ID of the project that contains the read replica.
   */
  async projectsInstancesResetReplicaSize(instance: string, project: string, req: SqlInstancesResetReplicaSizeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/resetReplicaSize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Start External primary instance migration.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project ID of the project that contains the instance.
   */
  async projectsInstancesStartExternalSync(instance: string, project: string, req: SqlInstancesStartExternalSyncRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/startExternalSync`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Verify External primary instance external sync settings.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async projectsInstancesVerifyExternalSyncSettings(instance: string, project: string, req: SqlInstancesVerifyExternalSyncSettingsRequest): Promise<SqlInstancesVerifyExternalSyncSettingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/verifyExternalSyncSettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SqlInstancesVerifyExternalSyncSettingsResponse;
  }

  /**
   * Generates a short-lived X509 certificate containing the provided public
   * key and signed by a private key specific to the target instance. Users may
   * use the certificate to authenticate as themselves when connecting to the
   * database.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the Cloud SQL project.
   */
  async sslCertsCreateEphemeral(instance: string, project: string, req: SslCertsCreateEphemeralRequest): Promise<SslCert> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/createEphemeral`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSslCert(data);
  }

  /**
   * Deletes the SSL certificate. For First Generation instances, the
   * certificate remains valid until the instance is restarted.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   * @param sha1Fingerprint Sha1 FingerPrint.
   */
  async sslCertsDelete(instance: string, project: string, sha1Fingerprint: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/sslCerts/${ sha1Fingerprint }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeOperation(data);
  }

  /**
   * Retrieves a particular SSL certificate. Does not include the private key
   * (required for usage). The private key must be saved from the response to
   * initial creation.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   * @param sha1Fingerprint Sha1 FingerPrint.
   */
  async sslCertsGet(instance: string, project: string, sha1Fingerprint: string): Promise<SslCert> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/sslCerts/${ sha1Fingerprint }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSslCert(data);
  }

  /**
   * Creates an SSL certificate and returns it along with the private key and
   * server certificate authority. The new certificate will not be usable until
   * the instance is restarted.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async sslCertsInsert(instance: string, project: string, req: SslCertsInsertRequest): Promise<SslCertsInsertResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/sslCerts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSslCertsInsertResponse(data);
  }

  /**
   * Lists all of the current SSL certificates for the instance.
   *
   * @param instance Cloud SQL instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async sslCertsList(instance: string, project: string): Promise<SslCertsListResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/sslCerts`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSslCertsListResponse(data);
  }

  /**
   * Lists all available machine types (tiers) for Cloud SQL, for example,
   * `db-custom-1-3840`. For more information, see
   * https://cloud.google.com/sql/pricing.
   *
   * @param project Project ID of the project for which to list tiers.
   */
  async tiersList(project: string): Promise<TiersListResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/tiers`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTiersListResponse(data);
  }

  /**
   * Deletes a user from a Cloud SQL instance.
   *
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async usersDelete(instance: string, project: string, opts: UsersDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/users`);
    if (opts.host !== undefined) {
      url.searchParams.append("host", String(opts.host));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeOperation(data);
  }

  /**
   * Retrieves a resource containing information about a user.
   *
   * @param instance Database instance ID. This does not include the project ID.
   * @param name User of the instance.
   * @param project Project ID of the project that contains the instance.
   */
  async usersGet(instance: string, name: string, project: string, opts: UsersGetOptions = {}): Promise<User> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/users/${ name }`);
    if (opts.host !== undefined) {
      url.searchParams.append("host", String(opts.host));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUser(data);
  }

  /**
   * Creates a new user in a Cloud SQL instance.
   *
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async usersInsert(instance: string, project: string, req: User): Promise<Operation> {
    req = serializeUser(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/users`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Lists users in the specified Cloud SQL instance.
   *
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async usersList(instance: string, project: string): Promise<UsersListResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/users`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUsersListResponse(data);
  }

  /**
   * Updates an existing user in a Cloud SQL instance.
   *
   * @param instance Database instance ID. This does not include the project ID.
   * @param project Project ID of the project that contains the instance.
   */
  async usersUpdate(instance: string, project: string, req: User, opts: UsersUpdateOptions = {}): Promise<Operation> {
    req = serializeUser(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ project }/instances/${ instance }/users`);
    if (opts.host !== undefined) {
      url.searchParams.append("host", String(opts.host));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeOperation(data);
  }
}

/**
 * An entry for an Access Control list.
 */
export interface AclEntry {
  /**
   * The time when this access control entry expires in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  expirationTime?: Date;
  /**
   * This is always `sql#aclEntry`.
   */
  kind?: string;
  /**
   * Optional. A label to identify this entry.
   */
  name?: string;
  /**
   * The allowlisted value for the access control list.
   */
  value?: string;
}

function serializeAclEntry(data: any): AclEntry {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
  };
}

function deserializeAclEntry(data: any): AclEntry {
  return {
    ...data,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
  };
}

/**
 * An Admin API warning message.
 */
export interface ApiWarning {
  /**
   * Code to uniquely identify the warning type.
   */
  code?:  | "SQL_API_WARNING_CODE_UNSPECIFIED" | "REGION_UNREACHABLE" | "MAX_RESULTS_EXCEEDS_LIMIT";
  /**
   * The warning message.
   */
  message?: string;
  /**
   * The region name for REGION_UNREACHABLE warning.
   */
  region?: string;
}

/**
 * Database instance backup configuration.
 */
export interface BackupConfiguration {
  /**
   * Backup retention settings.
   */
  backupRetentionSettings?: BackupRetentionSettings;
  /**
   * (MySQL only) Whether binary log is enabled. If backup configuration is
   * disabled, binarylog must be disabled as well.
   */
  binaryLogEnabled?: boolean;
  /**
   * Whether this configuration is enabled.
   */
  enabled?: boolean;
  /**
   * This is always `sql#backupConfiguration`.
   */
  kind?: string;
  /**
   * Location of the backup
   */
  location?: string;
  /**
   * (Postgres only) Whether point in time recovery is enabled.
   */
  pointInTimeRecoveryEnabled?: boolean;
  /**
   * Reserved for future use.
   */
  replicationLogArchivingEnabled?: boolean;
  /**
   * Start time for the daily backup configuration in UTC timezone in the 24
   * hour format - `HH:MM`.
   */
  startTime?: string;
  /**
   * The number of days of transaction logs we retain for point in time
   * restore, from 1-7.
   */
  transactionLogRetentionDays?: number;
}

/**
 * Backup context.
 */
export interface BackupContext {
  /**
   * The identifier of the backup.
   */
  backupId?: bigint;
  /**
   * This is always `sql#backupContext`.
   */
  kind?: string;
}

function serializeBackupContext(data: any): BackupContext {
  return {
    ...data,
    backupId: data["backupId"] !== undefined ? String(data["backupId"]) : undefined,
  };
}

function deserializeBackupContext(data: any): BackupContext {
  return {
    ...data,
    backupId: data["backupId"] !== undefined ? BigInt(data["backupId"]) : undefined,
  };
}

/**
 * We currently only support backup retention by specifying the number of
 * backups we will retain.
 */
export interface BackupRetentionSettings {
  /**
   * Depending on the value of retention_unit, this is used to determine if a
   * backup needs to be deleted. If retention_unit is 'COUNT', we will retain
   * this many backups.
   */
  retainedBackups?: number;
  /**
   * The unit that 'retained_backups' represents.
   */
  retentionUnit?:  | "RETENTION_UNIT_UNSPECIFIED" | "COUNT";
}

/**
 * A BackupRun resource.
 */
export interface BackupRun {
  /**
   * Specifies the kind of backup, PHYSICAL or DEFAULT_SNAPSHOT.
   */
  backupKind?:  | "SQL_BACKUP_KIND_UNSPECIFIED" | "SNAPSHOT" | "PHYSICAL";
  /**
   * The description of this run, only applicable to on-demand backups.
   */
  description?: string;
  /**
   * Encryption configuration specific to a backup.
   */
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  /**
   * Encryption status specific to a backup.
   */
  diskEncryptionStatus?: DiskEncryptionStatus;
  /**
   * The time the backup operation completed in UTC timezone in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  endTime?: Date;
  /**
   * The time the run was enqueued in UTC timezone in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  enqueuedTime?: Date;
  /**
   * Information about why the backup operation failed. This is only present if
   * the run has the FAILED status.
   */
  error?: OperationError;
  /**
   * The identifier for this backup run. Unique only for a specific Cloud SQL
   * instance.
   */
  id?: bigint;
  /**
   * Name of the database instance.
   */
  instance?: string;
  /**
   * This is always `sql#backupRun`.
   */
  kind?: string;
  /**
   * Location of the backups.
   */
  location?: string;
  /**
   * The URI of this resource.
   */
  selfLink?: string;
  /**
   * The time the backup operation actually started in UTC timezone in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  startTime?: Date;
  /**
   * The status of this run.
   */
  status?:  | "SQL_BACKUP_RUN_STATUS_UNSPECIFIED" | "ENQUEUED" | "OVERDUE" | "RUNNING" | "FAILED" | "SUCCESSFUL" | "SKIPPED" | "DELETION_PENDING" | "DELETION_FAILED" | "DELETED";
  /**
   * Backup time zone to prevent restores to an instance with a different time
   * zone. Now relevant only for SQL Server.
   */
  timeZone?: string;
  /**
   * The type of this run; can be either "AUTOMATED" or "ON_DEMAND" or "FINAL".
   * This field defaults to "ON_DEMAND" and is ignored, when specified for
   * insert requests.
   */
  type?:  | "SQL_BACKUP_RUN_TYPE_UNSPECIFIED" | "AUTOMATED" | "ON_DEMAND";
  /**
   * The start time of the backup window during which this the backup was
   * attempted in [RFC 3339](https://tools.ietf.org/html/rfc3339) format, for
   * example `2012-11-15T16:19:00.094Z`.
   */
  windowStartTime?: Date;
}

function serializeBackupRun(data: any): BackupRun {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    enqueuedTime: data["enqueuedTime"] !== undefined ? data["enqueuedTime"].toISOString() : undefined,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    windowStartTime: data["windowStartTime"] !== undefined ? data["windowStartTime"].toISOString() : undefined,
  };
}

function deserializeBackupRun(data: any): BackupRun {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    enqueuedTime: data["enqueuedTime"] !== undefined ? new Date(data["enqueuedTime"]) : undefined,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    windowStartTime: data["windowStartTime"] !== undefined ? new Date(data["windowStartTime"]) : undefined,
  };
}

/**
 * Additional options for SQLAdmin#backupRunsList.
 */
export interface BackupRunsListOptions {
  /**
   * Maximum number of backup runs per response.
   */
  maxResults?: number;
  /**
   * A previously-returned page token representing part of the larger set of
   * results to view.
   */
  pageToken?: string;
}

/**
 * Backup run list results.
 */
export interface BackupRunsListResponse {
  /**
   * A list of backup runs in reverse chronological order of the enqueued time.
   */
  items?: BackupRun[];
  /**
   * This is always `sql#backupRunsList`.
   */
  kind?: string;
  /**
   * The continuation token, used to page through large result sets. Provide
   * this value in a subsequent request to return the next page of results.
   */
  nextPageToken?: string;
}

function serializeBackupRunsListResponse(data: any): BackupRunsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeBackupRun(item))) : undefined,
  };
}

function deserializeBackupRunsListResponse(data: any): BackupRunsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeBackupRun(item))) : undefined,
  };
}

/**
 * Binary log coordinates.
 */
export interface BinLogCoordinates {
  /**
   * Name of the binary log file for a Cloud SQL instance.
   */
  binLogFileName?: string;
  /**
   * Position (offset) within the binary log file.
   */
  binLogPosition?: bigint;
  /**
   * This is always `sql#binLogCoordinates`.
   */
  kind?: string;
}

function serializeBinLogCoordinates(data: any): BinLogCoordinates {
  return {
    ...data,
    binLogPosition: data["binLogPosition"] !== undefined ? String(data["binLogPosition"]) : undefined,
  };
}

function deserializeBinLogCoordinates(data: any): BinLogCoordinates {
  return {
    ...data,
    binLogPosition: data["binLogPosition"] !== undefined ? BigInt(data["binLogPosition"]) : undefined,
  };
}

/**
 * Database instance clone context.
 */
export interface CloneContext {
  /**
   * The name of the allocated ip range for the private ip Cloud SQL instance.
   * For example: "google-managed-services-default". If set, the cloned instance
   * ip will be created in the allocated range. The range name must comply with
   * [RFC 1035](https://tools.ietf.org/html/rfc1035). Specifically, the name
   * must be 1-63 characters long and match the regular expression
   * [a-z]([-a-z0-9]*[a-z0-9])?. Reserved for future use.
   */
  allocatedIpRange?: string;
  /**
   * Binary log coordinates, if specified, identify the position up to which
   * the source instance is cloned. If not specified, the source instance is
   * cloned up to the most recent binary log coordinates.
   */
  binLogCoordinates?: BinLogCoordinates;
  /**
   * (SQL Server only) Clone only the specified databases from the source
   * instance. Clone all databases if empty.
   */
  databaseNames?: string[];
  /**
   * Name of the Cloud SQL instance to be created as a clone.
   */
  destinationInstanceName?: string;
  /**
   * This is always `sql#cloneContext`.
   */
  kind?: string;
  /**
   * Reserved for future use.
   */
  pitrTimestampMs?: bigint;
  /**
   * Timestamp, if specified, identifies the time to which the source instance
   * is cloned.
   */
  pointInTime?: Date;
}

function serializeCloneContext(data: any): CloneContext {
  return {
    ...data,
    binLogCoordinates: data["binLogCoordinates"] !== undefined ? serializeBinLogCoordinates(data["binLogCoordinates"]) : undefined,
    pitrTimestampMs: data["pitrTimestampMs"] !== undefined ? String(data["pitrTimestampMs"]) : undefined,
    pointInTime: data["pointInTime"] !== undefined ? data["pointInTime"].toISOString() : undefined,
  };
}

function deserializeCloneContext(data: any): CloneContext {
  return {
    ...data,
    binLogCoordinates: data["binLogCoordinates"] !== undefined ? deserializeBinLogCoordinates(data["binLogCoordinates"]) : undefined,
    pitrTimestampMs: data["pitrTimestampMs"] !== undefined ? BigInt(data["pitrTimestampMs"]) : undefined,
    pointInTime: data["pointInTime"] !== undefined ? new Date(data["pointInTime"]) : undefined,
  };
}

/**
 * Additional options for SQLAdmin#connectGet.
 */
export interface ConnectGetOptions {
  /**
   * Optional. Optional snapshot read timestamp to trade freshness for
   * performance.
   */
  readTime?: Date;
}

function serializeConnectGetOptions(data: any): ConnectGetOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeConnectGetOptions(data: any): ConnectGetOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Connect settings retrieval response.
 */
export interface ConnectSettings {
  /**
   * `SECOND_GEN`: Cloud SQL database instance. `EXTERNAL`: A database server
   * that is not managed by Google. This property is read-only; use the `tier`
   * property in the `settings` object to determine the database type.
   */
  backendType?:  | "SQL_BACKEND_TYPE_UNSPECIFIED" | "FIRST_GEN" | "SECOND_GEN" | "EXTERNAL";
  /**
   * The database engine type and version. The `databaseVersion` field cannot
   * be changed after instance creation. MySQL instances: `MYSQL_8_0`,
   * `MYSQL_5_7` (default), or `MYSQL_5_6`. PostgreSQL instances:
   * `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12` (default),
   * `POSTGRES_13`, or `POSTGRES_14`. SQL Server instances:
   * `SQLSERVER_2017_STANDARD` (default), `SQLSERVER_2017_ENTERPRISE`,
   * `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `SQLSERVER_2019_STANDARD`,
   * `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, or
   * `SQLSERVER_2019_WEB`.
   */
  databaseVersion?:  | "SQL_DATABASE_VERSION_UNSPECIFIED" | "MYSQL_5_1" | "MYSQL_5_5" | "MYSQL_5_6" | "MYSQL_5_7" | "SQLSERVER_2017_STANDARD" | "SQLSERVER_2017_ENTERPRISE" | "SQLSERVER_2017_EXPRESS" | "SQLSERVER_2017_WEB" | "POSTGRES_9_6" | "POSTGRES_10" | "POSTGRES_11" | "POSTGRES_12" | "POSTGRES_13" | "POSTGRES_14" | "MYSQL_8_0" | "MYSQL_8_0_18" | "MYSQL_8_0_26" | "MYSQL_8_0_27" | "MYSQL_8_0_28" | "MYSQL_8_0_29" | "MYSQL_8_0_30" | "MYSQL_8_0_31" | "MYSQL_8_0_32" | "SQLSERVER_2019_STANDARD" | "SQLSERVER_2019_ENTERPRISE" | "SQLSERVER_2019_EXPRESS" | "SQLSERVER_2019_WEB";
  /**
   * The assigned IP addresses for the instance.
   */
  ipAddresses?: IpMapping[];
  /**
   * This is always `sql#connectSettings`.
   */
  kind?: string;
  /**
   * The cloud region for the instance. For example, `us-central1`,
   * `europe-west1`. The region cannot be changed after instance creation.
   */
  region?: string;
  /**
   * SSL configuration.
   */
  serverCaCert?: SslCert;
}

function serializeConnectSettings(data: any): ConnectSettings {
  return {
    ...data,
    ipAddresses: data["ipAddresses"] !== undefined ? data["ipAddresses"].map((item: any) => (serializeIpMapping(item))) : undefined,
    serverCaCert: data["serverCaCert"] !== undefined ? serializeSslCert(data["serverCaCert"]) : undefined,
  };
}

function deserializeConnectSettings(data: any): ConnectSettings {
  return {
    ...data,
    ipAddresses: data["ipAddresses"] !== undefined ? data["ipAddresses"].map((item: any) => (deserializeIpMapping(item))) : undefined,
    serverCaCert: data["serverCaCert"] !== undefined ? deserializeSslCert(data["serverCaCert"]) : undefined,
  };
}

/**
 * Represents a SQL database on the Cloud SQL instance.
 */
export interface Database {
  /**
   * The Cloud SQL charset value.
   */
  charset?: string;
  /**
   * The Cloud SQL collation value.
   */
  collation?: string;
  /**
   * This field is deprecated and will be removed from a future version of the
   * API.
   */
  etag?: string;
  /**
   * The name of the Cloud SQL instance. This does not include the project ID.
   */
  instance?: string;
  /**
   * This is always `sql#database`.
   */
  kind?: string;
  /**
   * The name of the database in the Cloud SQL instance. This does not include
   * the project ID or instance name.
   */
  name?: string;
  /**
   * The project ID of the project containing the Cloud SQL database. The
   * Google apps domain is prefixed if applicable.
   */
  project?: string;
  /**
   * The URI of this resource.
   */
  selfLink?: string;
  sqlserverDatabaseDetails?: SqlServerDatabaseDetails;
}

/**
 * Database flags for Cloud SQL instances.
 */
export interface DatabaseFlags {
  /**
   * The name of the flag. These flags are passed at instance startup, so
   * include both server options and system variables. Flags are specified with
   * underscores, not hyphens. For more information, see [Configuring Database
   * Flags](https://cloud.google.com/sql/docs/mysql/flags) in the Cloud SQL
   * documentation.
   */
  name?: string;
  /**
   * The value of the flag. Boolean flags are set to `on` for true and `off`
   * for false. This field must be omitted if the flag doesn't take a value.
   */
  value?: string;
}

/**
 * A Cloud SQL instance resource.
 */
export interface DatabaseInstance {
  /**
   * List all maintenance versions applicable on the instance
   */
  availableMaintenanceVersions?: string[];
  /**
   * The backend type. `SECOND_GEN`: Cloud SQL database instance. `EXTERNAL`: A
   * database server that is not managed by Google. This property is read-only;
   * use the `tier` property in the `settings` object to determine the database
   * type.
   */
  backendType?:  | "SQL_BACKEND_TYPE_UNSPECIFIED" | "FIRST_GEN" | "SECOND_GEN" | "EXTERNAL";
  /**
   * Connection name of the Cloud SQL instance used in connection strings.
   */
  connectionName?: string;
  /**
   * Output only. The time when the instance was created in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  readonly createTime?: Date;
  /**
   * The current disk usage of the instance in bytes. This property has been
   * deprecated. Use the "cloudsql.googleapis.com/database/disk/bytes_used"
   * metric in Cloud Monitoring API instead. Please see [this
   * announcement](https://groups.google.com/d/msg/google-cloud-sql-announce/I_7-F9EBhT0/BtvFtdFeAgAJ)
   * for details.
   */
  currentDiskSize?: bigint;
  /**
   * Output only. Stores the current database version running on the instance
   * including minor version such as `MYSQL_8_0_18`.
   */
  readonly databaseInstalledVersion?: string;
  /**
   * The database engine type and version. The `databaseVersion` field cannot
   * be changed after instance creation.
   */
  databaseVersion?:  | "SQL_DATABASE_VERSION_UNSPECIFIED" | "MYSQL_5_1" | "MYSQL_5_5" | "MYSQL_5_6" | "MYSQL_5_7" | "SQLSERVER_2017_STANDARD" | "SQLSERVER_2017_ENTERPRISE" | "SQLSERVER_2017_EXPRESS" | "SQLSERVER_2017_WEB" | "POSTGRES_9_6" | "POSTGRES_10" | "POSTGRES_11" | "POSTGRES_12" | "POSTGRES_13" | "POSTGRES_14" | "MYSQL_8_0" | "MYSQL_8_0_18" | "MYSQL_8_0_26" | "MYSQL_8_0_27" | "MYSQL_8_0_28" | "MYSQL_8_0_29" | "MYSQL_8_0_30" | "MYSQL_8_0_31" | "MYSQL_8_0_32" | "SQLSERVER_2019_STANDARD" | "SQLSERVER_2019_ENTERPRISE" | "SQLSERVER_2019_EXPRESS" | "SQLSERVER_2019_WEB";
  /**
   * Disk encryption configuration specific to an instance.
   */
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  /**
   * Disk encryption status specific to an instance.
   */
  diskEncryptionStatus?: DiskEncryptionStatus;
  /**
   * This field is deprecated and will be removed from a future version of the
   * API. Use the `settings.settingsVersion` field instead.
   */
  etag?: string;
  /**
   * The name and status of the failover replica.
   */
  failoverReplica?: {
    available?: boolean;
    name?: string;
  };
  /**
   * The Compute Engine zone that the instance is currently serving from. This
   * value could be different from the zone that was specified when the instance
   * was created if the instance has failed over to its secondary zone. WARNING:
   * Changing this might restart the instance.
   */
  gceZone?: string;
  /**
   * The instance type.
   */
  instanceType?:  | "SQL_INSTANCE_TYPE_UNSPECIFIED" | "CLOUD_SQL_INSTANCE" | "ON_PREMISES_INSTANCE" | "READ_REPLICA_INSTANCE";
  /**
   * The assigned IP addresses for the instance.
   */
  ipAddresses?: IpMapping[];
  /**
   * The IPv6 address assigned to the instance. (Deprecated) This property was
   * applicable only to First Generation instances.
   */
  ipv6Address?: string;
  /**
   * This is always `sql#instance`.
   */
  kind?: string;
  /**
   * The current software version on the instance.
   */
  maintenanceVersion?: string;
  /**
   * The name of the instance which will act as primary in the replication
   * setup.
   */
  masterInstanceName?: string;
  /**
   * The maximum disk size of the instance in bytes.
   */
  maxDiskSize?: bigint;
  /**
   * Name of the Cloud SQL instance. This does not include the project ID.
   */
  name?: string;
  /**
   * Configuration specific to on-premises instances.
   */
  onPremisesConfiguration?: OnPremisesConfiguration;
  /**
   * This field represents the report generated by the proactive database
   * wellness job for OutOfDisk issues. * Writers: * the proactive database
   * wellness job for OOD. * Readers: * the proactive database wellness job
   */
  outOfDiskReport?: SqlOutOfDiskReport;
  /**
   * The project ID of the project containing the Cloud SQL instance. The
   * Google apps domain is prefixed if applicable.
   */
  project?: string;
  /**
   * The geographical region. Can be: * `us-central` (`FIRST_GEN` instances
   * only) * `us-central1` (`SECOND_GEN` instances only) * `asia-east1` or
   * `europe-west1`. Defaults to `us-central` or `us-central1` depending on the
   * instance type. The region cannot be changed after instance creation.
   */
  region?: string;
  /**
   * Configuration specific to failover replicas and read replicas.
   */
  replicaConfiguration?: ReplicaConfiguration;
  /**
   * The replicas of the instance.
   */
  replicaNames?: string[];
  /**
   * Initial root password. Use only on creation. You must set root passwords
   * before you can connect to PostgreSQL instances.
   */
  rootPassword?: string;
  /**
   * The status indicating if instance satisfiesPzs. Reserved for future use.
   */
  satisfiesPzs?: boolean;
  /**
   * The start time of any upcoming scheduled maintenance for this instance.
   */
  scheduledMaintenance?: SqlScheduledMaintenance;
  /**
   * The Compute Engine zone that the failover instance is currently serving
   * from for a regional instance. This value could be different from the zone
   * that was specified when the instance was created if the instance has failed
   * over to its secondary/failover zone.
   */
  secondaryGceZone?: string;
  /**
   * The URI of this resource.
   */
  selfLink?: string;
  /**
   * SSL configuration.
   */
  serverCaCert?: SslCert;
  /**
   * The service account email address assigned to the instance.\This property
   * is read-only.
   */
  serviceAccountEmailAddress?: string;
  /**
   * The user settings.
   */
  settings?: Settings;
  /**
   * The current serving state of the Cloud SQL instance.
   */
  state?:  | "SQL_INSTANCE_STATE_UNSPECIFIED" | "RUNNABLE" | "SUSPENDED" | "PENDING_DELETE" | "PENDING_CREATE" | "MAINTENANCE" | "FAILED" | "ONLINE_MAINTENANCE";
  /**
   * If the instance state is SUSPENDED, the reason for the suspension.
   */
  suspensionReason?:  | "SQL_SUSPENSION_REASON_UNSPECIFIED" | "BILLING_ISSUE" | "LEGAL_ISSUE" | "OPERATIONAL_ISSUE" | "KMS_KEY_ISSUE"[];
}

function serializeDatabaseInstance(data: any): DatabaseInstance {
  return {
    ...data,
    currentDiskSize: data["currentDiskSize"] !== undefined ? String(data["currentDiskSize"]) : undefined,
    ipAddresses: data["ipAddresses"] !== undefined ? data["ipAddresses"].map((item: any) => (serializeIpMapping(item))) : undefined,
    maxDiskSize: data["maxDiskSize"] !== undefined ? String(data["maxDiskSize"]) : undefined,
    replicaConfiguration: data["replicaConfiguration"] !== undefined ? serializeReplicaConfiguration(data["replicaConfiguration"]) : undefined,
    scheduledMaintenance: data["scheduledMaintenance"] !== undefined ? serializeSqlScheduledMaintenance(data["scheduledMaintenance"]) : undefined,
    serverCaCert: data["serverCaCert"] !== undefined ? serializeSslCert(data["serverCaCert"]) : undefined,
    settings: data["settings"] !== undefined ? serializeSettings(data["settings"]) : undefined,
  };
}

function deserializeDatabaseInstance(data: any): DatabaseInstance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    currentDiskSize: data["currentDiskSize"] !== undefined ? BigInt(data["currentDiskSize"]) : undefined,
    ipAddresses: data["ipAddresses"] !== undefined ? data["ipAddresses"].map((item: any) => (deserializeIpMapping(item))) : undefined,
    maxDiskSize: data["maxDiskSize"] !== undefined ? BigInt(data["maxDiskSize"]) : undefined,
    replicaConfiguration: data["replicaConfiguration"] !== undefined ? deserializeReplicaConfiguration(data["replicaConfiguration"]) : undefined,
    scheduledMaintenance: data["scheduledMaintenance"] !== undefined ? deserializeSqlScheduledMaintenance(data["scheduledMaintenance"]) : undefined,
    serverCaCert: data["serverCaCert"] !== undefined ? deserializeSslCert(data["serverCaCert"]) : undefined,
    settings: data["settings"] !== undefined ? deserializeSettings(data["settings"]) : undefined,
  };
}

/**
 * Database list response.
 */
export interface DatabasesListResponse {
  /**
   * List of database resources in the instance.
   */
  items?: Database[];
  /**
   * This is always `sql#databasesList`.
   */
  kind?: string;
}

/**
 * Read-replica configuration for connecting to the on-premises primary
 * instance.
 */
export interface DemoteMasterConfiguration {
  /**
   * This is always `sql#demoteMasterConfiguration`.
   */
  kind?: string;
  /**
   * MySQL specific configuration when replicating from a MySQL on-premises
   * primary instance. Replication configuration information such as the
   * username, password, certificates, and keys are not stored in the instance
   * metadata. The configuration information is used only to set up the
   * replication connection and is stored by MySQL in a file named `master.info`
   * in the data directory.
   */
  mysqlReplicaConfiguration?: DemoteMasterMySqlReplicaConfiguration;
}

/**
 * Database instance demote primary instance context.
 */
export interface DemoteMasterContext {
  /**
   * This is always `sql#demoteMasterContext`.
   */
  kind?: string;
  /**
   * The name of the instance which will act as on-premises primary instance in
   * the replication setup.
   */
  masterInstanceName?: string;
  /**
   * Configuration specific to read-replicas replicating from the on-premises
   * primary instance.
   */
  replicaConfiguration?: DemoteMasterConfiguration;
  /**
   * Flag to skip replication setup on the instance.
   */
  skipReplicationSetup?: boolean;
  /**
   * Verify the GTID consistency for demote operation. Default value: `True`.
   * Setting this flag to `false` enables you to bypass the GTID consistency
   * check between on-premises primary instance and Cloud SQL instance during
   * the demotion operation but also exposes you to the risk of future
   * replication failures. Change the value only if you know the reason for the
   * GTID divergence and are confident that doing so will not cause any
   * replication issues.
   */
  verifyGtidConsistency?: boolean;
}

/**
 * Read-replica configuration specific to MySQL databases.
 */
export interface DemoteMasterMySqlReplicaConfiguration {
  /**
   * PEM representation of the trusted CA's x509 certificate.
   */
  caCertificate?: string;
  /**
   * PEM representation of the replica's x509 certificate.
   */
  clientCertificate?: string;
  /**
   * PEM representation of the replica's private key. The corresponsing public
   * key is encoded in the client's certificate. The format of the replica's
   * private key can be either PKCS #1 or PKCS #8.
   */
  clientKey?: string;
  /**
   * This is always `sql#demoteMasterMysqlReplicaConfiguration`.
   */
  kind?: string;
  /**
   * The password for the replication connection.
   */
  password?: string;
  /**
   * The username for the replication connection.
   */
  username?: string;
}

/**
 * Deny maintenance Periods. This specifies a date range during when all CSA
 * rollout will be denied.
 */
export interface DenyMaintenancePeriod {
  /**
   * "deny maintenance period" end date. If the year of the end date is empty,
   * the year of the start date also must be empty. In this case, it means the
   * no maintenance interval recurs every year. The date is in format yyyy-mm-dd
   * i.e., 2020-11-01, or mm-dd, i.e., 11-01
   */
  endDate?: string;
  /**
   * "deny maintenance period" start date. If the year of the start date is
   * empty, the year of the end date also must be empty. In this case, it means
   * the deny maintenance period recurs every year. The date is in format
   * yyyy-mm-dd i.e., 2020-11-01, or mm-dd, i.e., 11-01
   */
  startDate?: string;
  /**
   * Time in UTC when the "deny maintenance period" starts on start_date and
   * ends on end_date. The time is in format: HH:mm:SS, i.e., 00:00:00
   */
  time?: string;
}

/**
 * Disk encryption configuration for an instance.
 */
export interface DiskEncryptionConfiguration {
  /**
   * This is always `sql#diskEncryptionConfiguration`.
   */
  kind?: string;
  /**
   * Resource name of KMS key for disk encryption
   */
  kmsKeyName?: string;
}

/**
 * Disk encryption status for an instance.
 */
export interface DiskEncryptionStatus {
  /**
   * This is always `sql#diskEncryptionStatus`.
   */
  kind?: string;
  /**
   * KMS key version used to encrypt the Cloud SQL instance resource
   */
  kmsKeyVersionName?: string;
}

/**
 * Database instance export context.
 */
export interface ExportContext {
  /**
   * Options for exporting BAK files (SQL Server-only)
   */
  bakExportOptions?: {
    stripeCount?: number;
    striped?: boolean;
  };
  /**
   * Options for exporting data as CSV. `MySQL` and `PostgreSQL` instances
   * only.
   */
  csvExportOptions?: {
    escapeCharacter?: string;
    fieldsTerminatedBy?: string;
    linesTerminatedBy?: string;
    quoteCharacter?: string;
    selectQuery?: string;
  };
  /**
   * Databases to be exported. `MySQL instances:` If `fileType` is `SQL` and no
   * database is specified, all databases are exported, except for the `mysql`
   * system database. If `fileType` is `CSV`, you can specify one database,
   * either by using this property or by using the
   * `csvExportOptions.selectQuery` property, which takes precedence over this
   * property. `PostgreSQL instances:` You must specify one database to be
   * exported. If `fileType` is `CSV`, this database must match the one
   * specified in the `csvExportOptions.selectQuery` property. `SQL Server
   * instances:` You must specify one database to be exported, and the
   * `fileType` must be `BAK`.
   */
  databases?: string[];
  /**
   * The file type for the specified uri.
   */
  fileType?:  | "SQL_FILE_TYPE_UNSPECIFIED" | "SQL" | "CSV" | "BAK";
  /**
   * This is always `sql#exportContext`.
   */
  kind?: string;
  /**
   * Option for export offload.
   */
  offload?: boolean;
  /**
   * Options for exporting data as SQL statements.
   */
  sqlExportOptions?: {
    mysqlExportOptions?: {
      masterData?: number;
    };
    schemaOnly?: boolean;
    tables?: string[];
  };
  /**
   * The path to the file in Google Cloud Storage where the export will be
   * stored. The URI is in the form `gs://bucketName/fileName`. If the file
   * already exists, the request succeeds, but the operation fails. If
   * `fileType` is `SQL` and the filename ends with .gz, the contents are
   * compressed.
   */
  uri?: string;
}

/**
 * Database instance failover context.
 */
export interface FailoverContext {
  /**
   * This is always `sql#failoverContext`.
   */
  kind?: string;
  /**
   * The current settings version of this instance. Request will be rejected if
   * this version doesn't match the current settings version.
   */
  settingsVersion?: bigint;
}

function serializeFailoverContext(data: any): FailoverContext {
  return {
    ...data,
    settingsVersion: data["settingsVersion"] !== undefined ? String(data["settingsVersion"]) : undefined,
  };
}

function deserializeFailoverContext(data: any): FailoverContext {
  return {
    ...data,
    settingsVersion: data["settingsVersion"] !== undefined ? BigInt(data["settingsVersion"]) : undefined,
  };
}

/**
 * A flag resource.
 */
export interface Flag {
  /**
   * Use this field if only certain integers are accepted. Can be combined with
   * min_value and max_value to add additional values.
   */
  allowedIntValues?: bigint[];
  /**
   * For `STRING` flags, a list of strings that the value can be set to.
   */
  allowedStringValues?: string[];
  /**
   * The database version this flag applies to. Can be MySQL instances:
   * `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_5_7`, or `MYSQL_5_6`.
   * PostgreSQL instances: `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11` or
   * `POSTGRES_12`. SQL Server instances: `SQLSERVER_2017_STANDARD`,
   * `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`,
   * `SQLSERVER_2017_WEB`, `SQLSERVER_2019_STANDARD`,
   * `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, or
   * `SQLSERVER_2019_WEB`. See [the complete
   * list](/sql/docs/mysql/admin-api/rest/v1/SqlDatabaseVersion).
   */
  appliesTo?:  | "SQL_DATABASE_VERSION_UNSPECIFIED" | "MYSQL_5_1" | "MYSQL_5_5" | "MYSQL_5_6" | "MYSQL_5_7" | "SQLSERVER_2017_STANDARD" | "SQLSERVER_2017_ENTERPRISE" | "SQLSERVER_2017_EXPRESS" | "SQLSERVER_2017_WEB" | "POSTGRES_9_6" | "POSTGRES_10" | "POSTGRES_11" | "POSTGRES_12" | "POSTGRES_13" | "POSTGRES_14" | "MYSQL_8_0" | "MYSQL_8_0_18" | "MYSQL_8_0_26" | "MYSQL_8_0_27" | "MYSQL_8_0_28" | "MYSQL_8_0_29" | "MYSQL_8_0_30" | "MYSQL_8_0_31" | "MYSQL_8_0_32" | "SQLSERVER_2019_STANDARD" | "SQLSERVER_2019_ENTERPRISE" | "SQLSERVER_2019_EXPRESS" | "SQLSERVER_2019_WEB"[];
  /**
   * Whether or not the flag is considered in beta.
   */
  inBeta?: boolean;
  /**
   * This is always `sql#flag`.
   */
  kind?: string;
  /**
   * For `INTEGER` flags, the maximum allowed value.
   */
  maxValue?: bigint;
  /**
   * For `INTEGER` flags, the minimum allowed value.
   */
  minValue?: bigint;
  /**
   * This is the name of the flag. Flag names always use underscores, not
   * hyphens, for example: `max_allowed_packet`
   */
  name?: string;
  /**
   * Indicates whether changing this flag will trigger a database restart. Only
   * applicable to Second Generation instances.
   */
  requiresRestart?: boolean;
  /**
   * The type of the flag. Flags are typed to being `BOOLEAN`, `STRING`,
   * `INTEGER` or `NONE`. `NONE` is used for flags that do not take a value,
   * such as `skip_grant_tables`.
   */
  type?:  | "SQL_FLAG_TYPE_UNSPECIFIED" | "BOOLEAN" | "STRING" | "INTEGER" | "NONE" | "MYSQL_TIMEZONE_OFFSET" | "FLOAT" | "REPEATED_STRING";
}

function serializeFlag(data: any): Flag {
  return {
    ...data,
    allowedIntValues: data["allowedIntValues"] !== undefined ? data["allowedIntValues"].map((item: any) => (String(item))) : undefined,
    maxValue: data["maxValue"] !== undefined ? String(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? String(data["minValue"]) : undefined,
  };
}

function deserializeFlag(data: any): Flag {
  return {
    ...data,
    allowedIntValues: data["allowedIntValues"] !== undefined ? data["allowedIntValues"].map((item: any) => (BigInt(item))) : undefined,
    maxValue: data["maxValue"] !== undefined ? BigInt(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? BigInt(data["minValue"]) : undefined,
  };
}

/**
 * Additional options for SQLAdmin#flagsList.
 */
export interface FlagsListOptions {
  /**
   * Database type and version you want to retrieve flags for. By default, this
   * method returns flags for all database types and versions.
   */
  databaseVersion?: string;
}

/**
 * Flags list response.
 */
export interface FlagsListResponse {
  /**
   * List of flags.
   */
  items?: Flag[];
  /**
   * This is always `sql#flagsList`.
   */
  kind?: string;
}

function serializeFlagsListResponse(data: any): FlagsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeFlag(item))) : undefined,
  };
}

function deserializeFlagsListResponse(data: any): FlagsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeFlag(item))) : undefined,
  };
}

/**
 * Ephemeral certificate creation request.
 */
export interface GenerateEphemeralCertRequest {
  /**
   * Optional. Access token to include in the signed certificate.
   */
  access_token?: string;
  /**
   * PEM encoded public key to include in the signed certificate.
   */
  public_key?: string;
  /**
   * Optional. Optional snapshot read timestamp to trade freshness for
   * performance.
   */
  readTime?: Date;
  /**
   * Optional. If set, it will contain the cert valid duration.
   */
  validDuration?: number /* Duration */;
}

function serializeGenerateEphemeralCertRequest(data: any): GenerateEphemeralCertRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    validDuration: data["validDuration"] !== undefined ? data["validDuration"] : undefined,
  };
}

function deserializeGenerateEphemeralCertRequest(data: any): GenerateEphemeralCertRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    validDuration: data["validDuration"] !== undefined ? data["validDuration"] : undefined,
  };
}

/**
 * Ephemeral certificate creation request.
 */
export interface GenerateEphemeralCertResponse {
  /**
   * Generated cert
   */
  ephemeralCert?: SslCert;
}

function serializeGenerateEphemeralCertResponse(data: any): GenerateEphemeralCertResponse {
  return {
    ...data,
    ephemeralCert: data["ephemeralCert"] !== undefined ? serializeSslCert(data["ephemeralCert"]) : undefined,
  };
}

function deserializeGenerateEphemeralCertResponse(data: any): GenerateEphemeralCertResponse {
  return {
    ...data,
    ephemeralCert: data["ephemeralCert"] !== undefined ? deserializeSslCert(data["ephemeralCert"]) : undefined,
  };
}

/**
 * Database instance import context.
 */
export interface ImportContext {
  /**
   * Import parameters specific to SQL Server .BAK files
   */
  bakImportOptions?: {
    encryptionOptions?: {
      certPath?: string;
      pvkPassword?: string;
      pvkPath?: string;
    };
    striped?: boolean;
  };
  /**
   * Options for importing data as CSV.
   */
  csvImportOptions?: {
    columns?: string[];
    escapeCharacter?: string;
    fieldsTerminatedBy?: string;
    linesTerminatedBy?: string;
    quoteCharacter?: string;
    table?: string;
  };
  /**
   * The target database for the import. If `fileType` is `SQL`, this field is
   * required only if the import file does not specify a database, and is
   * overridden by any database specification in the import file. If `fileType`
   * is `CSV`, one database must be specified.
   */
  database?: string;
  /**
   * The file type for the specified uri.\`SQL`: The file contains SQL
   * statements. \`CSV`: The file contains CSV data.
   */
  fileType?:  | "SQL_FILE_TYPE_UNSPECIFIED" | "SQL" | "CSV" | "BAK";
  /**
   * The PostgreSQL user for this import operation. PostgreSQL instances only.
   */
  importUser?: string;
  /**
   * This is always `sql#importContext`.
   */
  kind?: string;
  /**
   * Path to the import file in Cloud Storage, in the form
   * `gs://bucketName/fileName`. Compressed gzip files (.gz) are supported when
   * `fileType` is `SQL`. The instance must have write permissions to the bucket
   * and read access to the file.
   */
  uri?: string;
}

/**
 * Insights configuration. This specifies when Cloud SQL Insights feature is
 * enabled and optional configuration.
 */
export interface InsightsConfig {
  /**
   * Whether Query Insights feature is enabled.
   */
  queryInsightsEnabled?: boolean;
  /**
   * Number of query execution plans captured by Insights per minute for all
   * queries combined. Default is 5.
   */
  queryPlansPerMinute?: number;
  /**
   * Maximum query length stored in bytes. Default value: 1024 bytes. Range:
   * 256-4500 bytes. Query length more than this field value will be truncated
   * to this value. When unset, query length will be the default value. Changing
   * query length will restart the database.
   */
  queryStringLength?: number;
  /**
   * Whether Query Insights will record application tags from query when
   * enabled.
   */
  recordApplicationTags?: boolean;
  /**
   * Whether Query Insights will record client address when enabled.
   */
  recordClientAddress?: boolean;
}

/**
 * Reference to another Cloud SQL instance.
 */
export interface InstanceReference {
  /**
   * The name of the Cloud SQL instance being referenced. This does not include
   * the project ID.
   */
  name?: string;
  /**
   * The project ID of the Cloud SQL instance being referenced. The default is
   * the same project ID as the instance references it.
   */
  project?: string;
  /**
   * The region of the Cloud SQL instance being referenced.
   */
  region?: string;
}

/**
 * Database instance clone request.
 */
export interface InstancesCloneRequest {
  /**
   * Contains details about the clone operation.
   */
  cloneContext?: CloneContext;
}

function serializeInstancesCloneRequest(data: any): InstancesCloneRequest {
  return {
    ...data,
    cloneContext: data["cloneContext"] !== undefined ? serializeCloneContext(data["cloneContext"]) : undefined,
  };
}

function deserializeInstancesCloneRequest(data: any): InstancesCloneRequest {
  return {
    ...data,
    cloneContext: data["cloneContext"] !== undefined ? deserializeCloneContext(data["cloneContext"]) : undefined,
  };
}

/**
 * Database demote primary instance request.
 */
export interface InstancesDemoteMasterRequest {
  /**
   * Contains details about the demoteMaster operation.
   */
  demoteMasterContext?: DemoteMasterContext;
}

/**
 * Database instance export request.
 */
export interface InstancesExportRequest {
  /**
   * Contains details about the export operation.
   */
  exportContext?: ExportContext;
}

/**
 * Instance failover request.
 */
export interface InstancesFailoverRequest {
  /**
   * Failover Context.
   */
  failoverContext?: FailoverContext;
}

function serializeInstancesFailoverRequest(data: any): InstancesFailoverRequest {
  return {
    ...data,
    failoverContext: data["failoverContext"] !== undefined ? serializeFailoverContext(data["failoverContext"]) : undefined,
  };
}

function deserializeInstancesFailoverRequest(data: any): InstancesFailoverRequest {
  return {
    ...data,
    failoverContext: data["failoverContext"] !== undefined ? deserializeFailoverContext(data["failoverContext"]) : undefined,
  };
}

/**
 * Database instance import request.
 */
export interface InstancesImportRequest {
  /**
   * Contains details about the import operation.
   */
  importContext?: ImportContext;
}

/**
 * Additional options for SQLAdmin#instancesList.
 */
export interface InstancesListOptions {
  /**
   * A filter expression that filters resources listed in the response. The
   * expression is in the form of field:value. For example,
   * 'instanceType:CLOUD_SQL_INSTANCE'. Fields can be nested as needed as per
   * their JSON representation, such as 'settings.userLabels.auto_start:true'.
   * Multiple filter queries are space-separated. For example. 'state:RUNNABLE
   * instanceType:CLOUD_SQL_INSTANCE'. By default, each expression is an AND
   * expression. However, you can include AND and OR expressions explicitly.
   */
  filter?: string;
  /**
   * The maximum number of instances to return. The service may return fewer
   * than this value. If unspecified, at most 500 instances are returned. The
   * maximum value is 1000; values above 1000 are coerced to 1000.
   */
  maxResults?: number;
  /**
   * A previously-returned page token representing part of the larger set of
   * results to view.
   */
  pageToken?: string;
}

/**
 * Database instances list response.
 */
export interface InstancesListResponse {
  /**
   * List of database instance resources.
   */
  items?: DatabaseInstance[];
  /**
   * This is always `sql#instancesList`.
   */
  kind?: string;
  /**
   * The continuation token, used to page through large result sets. Provide
   * this value in a subsequent request to return the next page of results.
   */
  nextPageToken?: string;
  /**
   * List of warnings that occurred while handling the request.
   */
  warnings?: ApiWarning[];
}

function serializeInstancesListResponse(data: any): InstancesListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeDatabaseInstance(item))) : undefined,
  };
}

function deserializeInstancesListResponse(data: any): InstancesListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeDatabaseInstance(item))) : undefined,
  };
}

/**
 * Instances ListServerCas response.
 */
export interface InstancesListServerCasResponse {
  activeVersion?: string;
  /**
   * List of server CA certificates for the instance.
   */
  certs?: SslCert[];
  /**
   * This is always `sql#instancesListServerCas`.
   */
  kind?: string;
}

function serializeInstancesListServerCasResponse(data: any): InstancesListServerCasResponse {
  return {
    ...data,
    certs: data["certs"] !== undefined ? data["certs"].map((item: any) => (serializeSslCert(item))) : undefined,
  };
}

function deserializeInstancesListServerCasResponse(data: any): InstancesListServerCasResponse {
  return {
    ...data,
    certs: data["certs"] !== undefined ? data["certs"].map((item: any) => (deserializeSslCert(item))) : undefined,
  };
}

/**
 * Database instance restore backup request.
 */
export interface InstancesRestoreBackupRequest {
  /**
   * Parameters required to perform the restore backup operation.
   */
  restoreBackupContext?: RestoreBackupContext;
}

function serializeInstancesRestoreBackupRequest(data: any): InstancesRestoreBackupRequest {
  return {
    ...data,
    restoreBackupContext: data["restoreBackupContext"] !== undefined ? serializeRestoreBackupContext(data["restoreBackupContext"]) : undefined,
  };
}

function deserializeInstancesRestoreBackupRequest(data: any): InstancesRestoreBackupRequest {
  return {
    ...data,
    restoreBackupContext: data["restoreBackupContext"] !== undefined ? deserializeRestoreBackupContext(data["restoreBackupContext"]) : undefined,
  };
}

/**
 * Rotate server CA request.
 */
export interface InstancesRotateServerCaRequest {
  /**
   * Contains details about the rotate server CA operation.
   */
  rotateServerCaContext?: RotateServerCaContext;
}

/**
 * Instance truncate log request.
 */
export interface InstancesTruncateLogRequest {
  /**
   * Contains details about the truncate log operation.
   */
  truncateLogContext?: TruncateLogContext;
}

/**
 * IP Management configuration.
 */
export interface IpConfiguration {
  /**
   * The name of the allocated ip range for the private ip Cloud SQL instance.
   * For example: "google-managed-services-default". If set, the instance ip
   * will be created in the allocated range. The range name must comply with
   * [RFC 1035](https://tools.ietf.org/html/rfc1035). Specifically, the name
   * must be 1-63 characters long and match the regular expression
   * `[a-z]([-a-z0-9]*[a-z0-9])?.`
   */
  allocatedIpRange?: string;
  /**
   * The list of external networks that are allowed to connect to the instance
   * using the IP. In 'CIDR' notation, also known as 'slash' notation (for
   * example: `157.197.200.0/24`).
   */
  authorizedNetworks?: AclEntry[];
  /**
   * Controls connectivity to private IP instances from Google services, such
   * as BigQuery.
   */
  enablePrivatePathForGoogleCloudServices?: boolean;
  /**
   * Whether the instance is assigned a public IP address or not.
   */
  ipv4Enabled?: boolean;
  /**
   * The resource link for the VPC network from which the Cloud SQL instance is
   * accessible for private IP. For example,
   * `/projects/myProject/global/networks/default`. This setting can be updated,
   * but it cannot be removed after it is set.
   */
  privateNetwork?: string;
  /**
   * Whether SSL connections over IP are enforced or not.
   */
  requireSsl?: boolean;
}

function serializeIpConfiguration(data: any): IpConfiguration {
  return {
    ...data,
    authorizedNetworks: data["authorizedNetworks"] !== undefined ? data["authorizedNetworks"].map((item: any) => (serializeAclEntry(item))) : undefined,
  };
}

function deserializeIpConfiguration(data: any): IpConfiguration {
  return {
    ...data,
    authorizedNetworks: data["authorizedNetworks"] !== undefined ? data["authorizedNetworks"].map((item: any) => (deserializeAclEntry(item))) : undefined,
  };
}

/**
 * Database instance IP Mapping.
 */
export interface IpMapping {
  /**
   * The IP address assigned.
   */
  ipAddress?: string;
  /**
   * The due time for this IP to be retired in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`. This field is only available when the IP is
   * scheduled to be retired.
   */
  timeToRetire?: Date;
  /**
   * The type of this IP address. A `PRIMARY` address is a public address that
   * can accept incoming connections. A `PRIVATE` address is a private address
   * that can accept incoming connections. An `OUTGOING` address is the source
   * address of connections originating from the instance, if supported.
   */
  type?:  | "SQL_IP_ADDRESS_TYPE_UNSPECIFIED" | "PRIMARY" | "OUTGOING" | "PRIVATE" | "MIGRATED_1ST_GEN";
}

function serializeIpMapping(data: any): IpMapping {
  return {
    ...data,
    timeToRetire: data["timeToRetire"] !== undefined ? data["timeToRetire"].toISOString() : undefined,
  };
}

function deserializeIpMapping(data: any): IpMapping {
  return {
    ...data,
    timeToRetire: data["timeToRetire"] !== undefined ? new Date(data["timeToRetire"]) : undefined,
  };
}

/**
 * Preferred location. This specifies where a Cloud SQL instance is located.
 * Note that if the preferred location is not available, the instance will be
 * located as close as possible within the region. Only one location may be
 * specified.
 */
export interface LocationPreference {
  /**
   * The App Engine application to follow, it must be in the same region as the
   * Cloud SQL instance. WARNING: Changing this might restart the instance.
   */
  followGaeApplication?: string;
  /**
   * This is always `sql#locationPreference`.
   */
  kind?: string;
  /**
   * The preferred Compute Engine zone for the secondary/failover (for example:
   * us-central1-a, us-central1-b, etc.).
   */
  secondaryZone?: string;
  /**
   * The preferred Compute Engine zone (for example: us-central1-a,
   * us-central1-b, etc.). WARNING: Changing this might restart the instance.
   */
  zone?: string;
}

/**
 * Maintenance window. This specifies when a Cloud SQL instance is restarted
 * for system maintenance purposes.
 */
export interface MaintenanceWindow {
  /**
   * day of week (1-7), starting on Monday.
   */
  day?: number;
  /**
   * hour of day - 0 to 23.
   */
  hour?: number;
  /**
   * This is always `sql#maintenanceWindow`.
   */
  kind?: string;
  /**
   * Maintenance timing setting: `canary` (Earlier) or `stable` (Later). [Learn
   * more](https://cloud.google.com/sql/docs/mysql/instance-settings#maintenance-timing-2ndgen).
   */
  updateTrack?:  | "SQL_UPDATE_TRACK_UNSPECIFIED" | "canary" | "stable";
}

/**
 * Read-replica configuration specific to MySQL databases.
 */
export interface MySqlReplicaConfiguration {
  /**
   * PEM representation of the trusted CA's x509 certificate.
   */
  caCertificate?: string;
  /**
   * PEM representation of the replica's x509 certificate.
   */
  clientCertificate?: string;
  /**
   * PEM representation of the replica's private key. The corresponsing public
   * key is encoded in the client's certificate.
   */
  clientKey?: string;
  /**
   * Seconds to wait between connect retries. MySQL's default is 60 seconds.
   */
  connectRetryInterval?: number;
  /**
   * Path to a SQL dump file in Google Cloud Storage from which the replica
   * instance is to be created. The URI is in the form gs://bucketName/fileName.
   * Compressed gzip files (.gz) are also supported. Dumps have the binlog
   * co-ordinates from which replication begins. This can be accomplished by
   * setting --master-data to 1 when using mysqldump.
   */
  dumpFilePath?: string;
  /**
   * This is always `sql#mysqlReplicaConfiguration`.
   */
  kind?: string;
  /**
   * Interval in milliseconds between replication heartbeats.
   */
  masterHeartbeatPeriod?: bigint;
  /**
   * The password for the replication connection.
   */
  password?: string;
  /**
   * A list of permissible ciphers to use for SSL encryption.
   */
  sslCipher?: string;
  /**
   * The username for the replication connection.
   */
  username?: string;
  /**
   * Whether or not to check the primary instance's Common Name value in the
   * certificate that it sends during the SSL handshake.
   */
  verifyServerCertificate?: boolean;
}

function serializeMySqlReplicaConfiguration(data: any): MySqlReplicaConfiguration {
  return {
    ...data,
    masterHeartbeatPeriod: data["masterHeartbeatPeriod"] !== undefined ? String(data["masterHeartbeatPeriod"]) : undefined,
  };
}

function deserializeMySqlReplicaConfiguration(data: any): MySqlReplicaConfiguration {
  return {
    ...data,
    masterHeartbeatPeriod: data["masterHeartbeatPeriod"] !== undefined ? BigInt(data["masterHeartbeatPeriod"]) : undefined,
  };
}

/**
 * MySQL-specific external server sync settings.
 */
export interface MySqlSyncConfig {
  /**
   * Flags to use for the initial dump.
   */
  initialSyncFlags?: SyncFlags[];
}

/**
 * On-premises instance configuration.
 */
export interface OnPremisesConfiguration {
  /**
   * PEM representation of the trusted CA's x509 certificate.
   */
  caCertificate?: string;
  /**
   * PEM representation of the replica's x509 certificate.
   */
  clientCertificate?: string;
  /**
   * PEM representation of the replica's private key. The corresponsing public
   * key is encoded in the client's certificate.
   */
  clientKey?: string;
  /**
   * The dump file to create the Cloud SQL replica.
   */
  dumpFilePath?: string;
  /**
   * The host and port of the on-premises instance in host:port format
   */
  hostPort?: string;
  /**
   * This is always `sql#onPremisesConfiguration`.
   */
  kind?: string;
  /**
   * The password for connecting to on-premises instance.
   */
  password?: string;
  /**
   * The reference to Cloud SQL instance if the source is Cloud SQL.
   */
  sourceInstance?: InstanceReference;
  /**
   * The username for connecting to on-premises instance.
   */
  username?: string;
}

/**
 * An Operation resource. For successful operations that return an Operation
 * resource, only the fields relevant to the operation are populated in the
 * resource.
 */
export interface Operation {
  /**
   * The context for backup operation, if applicable.
   */
  backupContext?: BackupContext;
  /**
   * The time this operation finished in UTC timezone in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  endTime?: Date;
  /**
   * If errors occurred during processing of this operation, this field will be
   * populated.
   */
  error?: OperationErrors;
  /**
   * The context for export operation, if applicable.
   */
  exportContext?: ExportContext;
  /**
   * The context for import operation, if applicable.
   */
  importContext?: ImportContext;
  /**
   * The time this operation was enqueued in UTC timezone in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  insertTime?: Date;
  /**
   * This is always `sql#operation`.
   */
  kind?: string;
  /**
   * An identifier that uniquely identifies the operation. You can use this
   * identifier to retrieve the Operations resource that has information about
   * the operation.
   */
  name?: string;
  /**
   * The type of the operation. Valid values are: * `CREATE` * `DELETE` *
   * `UPDATE` * `RESTART` * `IMPORT` * `EXPORT` * `BACKUP_VOLUME` *
   * `RESTORE_VOLUME` * `CREATE_USER` * `DELETE_USER` * `CREATE_DATABASE` *
   * `DELETE_DATABASE`
   */
  operationType?:  | "SQL_OPERATION_TYPE_UNSPECIFIED" | "IMPORT" | "EXPORT" | "CREATE" | "UPDATE" | "DELETE" | "RESTART" | "BACKUP" | "SNAPSHOT" | "BACKUP_VOLUME" | "DELETE_VOLUME" | "RESTORE_VOLUME" | "INJECT_USER" | "CLONE" | "STOP_REPLICA" | "START_REPLICA" | "PROMOTE_REPLICA" | "CREATE_REPLICA" | "CREATE_USER" | "DELETE_USER" | "UPDATE_USER" | "CREATE_DATABASE" | "DELETE_DATABASE" | "UPDATE_DATABASE" | "FAILOVER" | "DELETE_BACKUP" | "RECREATE_REPLICA" | "TRUNCATE_LOG" | "DEMOTE_MASTER" | "MAINTENANCE" | "ENABLE_PRIVATE_IP" | "DEFER_MAINTENANCE" | "CREATE_CLONE" | "RESCHEDULE_MAINTENANCE" | "START_EXTERNAL_SYNC" | "LOG_CLEANUP" | "AUTO_RESTART" | "REENCRYPT";
  /**
   * The URI of this resource.
   */
  selfLink?: string;
  /**
   * The time this operation actually started in UTC timezone in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  startTime?: Date;
  /**
   * The status of an operation.
   */
  status?:  | "SQL_OPERATION_STATUS_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE";
  /**
   * Name of the database instance related to this operation.
   */
  targetId?: string;
  targetLink?: string;
  /**
   * The project ID of the target instance related to this operation.
   */
  targetProject?: string;
  /**
   * The email address of the user who initiated this operation.
   */
  user?: string;
}

function serializeOperation(data: any): Operation {
  return {
    ...data,
    backupContext: data["backupContext"] !== undefined ? serializeBackupContext(data["backupContext"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    insertTime: data["insertTime"] !== undefined ? data["insertTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeOperation(data: any): Operation {
  return {
    ...data,
    backupContext: data["backupContext"] !== undefined ? deserializeBackupContext(data["backupContext"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    insertTime: data["insertTime"] !== undefined ? new Date(data["insertTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Database instance operation error.
 */
export interface OperationError {
  /**
   * Identifies the specific error that occurred.
   */
  code?: string;
  /**
   * This is always `sql#operationError`.
   */
  kind?: string;
  /**
   * Additional information about the error encountered.
   */
  message?: string;
}

/**
 * Database instance operation errors list wrapper.
 */
export interface OperationErrors {
  /**
   * The list of errors encountered while processing this operation.
   */
  errors?: OperationError[];
  /**
   * This is always `sql#operationErrors`.
   */
  kind?: string;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have been cancelled successfully have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly cancelRequested?: boolean;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusDetail?: string;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Additional options for SQLAdmin#operationsList.
 */
export interface OperationsListOptions {
  /**
   * Cloud SQL instance ID. This does not include the project ID.
   */
  instance?: string;
  /**
   * Maximum number of operations per response.
   */
  maxResults?: number;
  /**
   * A previously-returned page token representing part of the larger set of
   * results to view.
   */
  pageToken?: string;
}

/**
 * Operations list response.
 */
export interface OperationsListResponse {
  /**
   * List of operation resources.
   */
  items?: Operation[];
  /**
   * This is always `sql#operationsList`.
   */
  kind?: string;
  /**
   * The continuation token, used to page through large result sets. Provide
   * this value in a subsequent request to return the next page of results.
   */
  nextPageToken?: string;
}

function serializeOperationsListResponse(data: any): OperationsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeOperation(item))) : undefined,
  };
}

function deserializeOperationsListResponse(data: any): OperationsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeOperation(item))) : undefined,
  };
}

/**
 * Read-only password status.
 */
export interface PasswordStatus {
  /**
   * If true, user does not have login privileges.
   */
  locked?: boolean;
  /**
   * The expiration time of the current password.
   */
  passwordExpirationTime?: Date;
}

function serializePasswordStatus(data: any): PasswordStatus {
  return {
    ...data,
    passwordExpirationTime: data["passwordExpirationTime"] !== undefined ? data["passwordExpirationTime"].toISOString() : undefined,
  };
}

function deserializePasswordStatus(data: any): PasswordStatus {
  return {
    ...data,
    passwordExpirationTime: data["passwordExpirationTime"] !== undefined ? new Date(data["passwordExpirationTime"]) : undefined,
  };
}

/**
 * Database instance local user password validation policy
 */
export interface PasswordValidationPolicy {
  /**
   * The complexity of the password.
   */
  complexity?:  | "COMPLEXITY_UNSPECIFIED" | "COMPLEXITY_DEFAULT";
  /**
   * Disallow username as a part of the password.
   */
  disallowUsernameSubstring?: boolean;
  /**
   * Whether the password policy is enabled or not.
   */
  enablePasswordPolicy?: boolean;
  /**
   * Minimum number of characters allowed.
   */
  minLength?: number;
  /**
   * Minimum interval after which the password can be changed. This flag is
   * only supported for PostgreSQL.
   */
  passwordChangeInterval?: number /* Duration */;
  /**
   * Number of previous passwords that cannot be reused.
   */
  reuseInterval?: number;
}

function serializePasswordValidationPolicy(data: any): PasswordValidationPolicy {
  return {
    ...data,
    passwordChangeInterval: data["passwordChangeInterval"] !== undefined ? data["passwordChangeInterval"] : undefined,
  };
}

function deserializePasswordValidationPolicy(data: any): PasswordValidationPolicy {
  return {
    ...data,
    passwordChangeInterval: data["passwordChangeInterval"] !== undefined ? data["passwordChangeInterval"] : undefined,
  };
}

/**
 * Perform disk shrink context.
 */
export interface PerformDiskShrinkContext {
  /**
   * The target disk shrink size in GigaBytes.
   */
  targetSizeGb?: bigint;
}

function serializePerformDiskShrinkContext(data: any): PerformDiskShrinkContext {
  return {
    ...data,
    targetSizeGb: data["targetSizeGb"] !== undefined ? String(data["targetSizeGb"]) : undefined,
  };
}

function deserializePerformDiskShrinkContext(data: any): PerformDiskShrinkContext {
  return {
    ...data,
    targetSizeGb: data["targetSizeGb"] !== undefined ? BigInt(data["targetSizeGb"]) : undefined,
  };
}

/**
 * Read-replica configuration for connecting to the primary instance.
 */
export interface ReplicaConfiguration {
  /**
   * Specifies if the replica is the failover target. If the field is set to
   * `true`, the replica will be designated as a failover replica. In case the
   * primary instance fails, the replica instance will be promoted as the new
   * primary instance. Only one replica can be specified as failover target, and
   * the replica has to be in different zone with the primary instance.
   */
  failoverTarget?: boolean;
  /**
   * This is always `sql#replicaConfiguration`.
   */
  kind?: string;
  /**
   * MySQL specific configuration when replicating from a MySQL on-premises
   * primary instance. Replication configuration information such as the
   * username, password, certificates, and keys are not stored in the instance
   * metadata. The configuration information is used only to set up the
   * replication connection and is stored by MySQL in a file named `master.info`
   * in the data directory.
   */
  mysqlReplicaConfiguration?: MySqlReplicaConfiguration;
}

function serializeReplicaConfiguration(data: any): ReplicaConfiguration {
  return {
    ...data,
    mysqlReplicaConfiguration: data["mysqlReplicaConfiguration"] !== undefined ? serializeMySqlReplicaConfiguration(data["mysqlReplicaConfiguration"]) : undefined,
  };
}

function deserializeReplicaConfiguration(data: any): ReplicaConfiguration {
  return {
    ...data,
    mysqlReplicaConfiguration: data["mysqlReplicaConfiguration"] !== undefined ? deserializeMySqlReplicaConfiguration(data["mysqlReplicaConfiguration"]) : undefined,
  };
}

export interface Reschedule {
  /**
   * Required. The type of the reschedule.
   */
  rescheduleType?:  | "RESCHEDULE_TYPE_UNSPECIFIED" | "IMMEDIATE" | "NEXT_AVAILABLE_WINDOW" | "SPECIFIC_TIME";
  /**
   * Optional. Timestamp when the maintenance shall be rescheduled to if
   * reschedule_type=SPECIFIC_TIME, in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  scheduleTime?: Date;
}

function serializeReschedule(data: any): Reschedule {
  return {
    ...data,
    scheduleTime: data["scheduleTime"] !== undefined ? data["scheduleTime"].toISOString() : undefined,
  };
}

function deserializeReschedule(data: any): Reschedule {
  return {
    ...data,
    scheduleTime: data["scheduleTime"] !== undefined ? new Date(data["scheduleTime"]) : undefined,
  };
}

/**
 * Database instance restore from backup context. Backup context contains
 * source instance id and project id.
 */
export interface RestoreBackupContext {
  /**
   * The ID of the backup run to restore from.
   */
  backupRunId?: bigint;
  /**
   * The ID of the instance that the backup was taken from.
   */
  instanceId?: string;
  /**
   * This is always `sql#restoreBackupContext`.
   */
  kind?: string;
  /**
   * The full project ID of the source instance.
   */
  project?: string;
}

function serializeRestoreBackupContext(data: any): RestoreBackupContext {
  return {
    ...data,
    backupRunId: data["backupRunId"] !== undefined ? String(data["backupRunId"]) : undefined,
  };
}

function deserializeRestoreBackupContext(data: any): RestoreBackupContext {
  return {
    ...data,
    backupRunId: data["backupRunId"] !== undefined ? BigInt(data["backupRunId"]) : undefined,
  };
}

/**
 * Instance rotate server CA context.
 */
export interface RotateServerCaContext {
  /**
   * This is always `sql#rotateServerCaContext`.
   */
  kind?: string;
  /**
   * The fingerprint of the next version to be rotated to. If left unspecified,
   * will be rotated to the most recently added server CA version.
   */
  nextVersion?: string;
}

/**
 * Database instance settings.
 */
export interface Settings {
  /**
   * The activation policy specifies when the instance is activated; it is
   * applicable only when the instance state is RUNNABLE. Valid values: *
   * `ALWAYS`: The instance is on, and remains so even in the absence of
   * connection requests. * `NEVER`: The instance is off; it is not activated,
   * even if a connection request arrives.
   */
  activationPolicy?:  | "SQL_ACTIVATION_POLICY_UNSPECIFIED" | "ALWAYS" | "NEVER" | "ON_DEMAND";
  /**
   * Active Directory configuration, relevant only for Cloud SQL for SQL
   * Server.
   */
  activeDirectoryConfig?: SqlActiveDirectoryConfig;
  /**
   * The App Engine app IDs that can access this instance. (Deprecated) Applied
   * to First Generation instances only.
   */
  authorizedGaeApplications?: string[];
  /**
   * Availability type. Potential values: * `ZONAL`: The instance serves data
   * from only one zone. Outages in that zone affect data accessibility. *
   * `REGIONAL`: The instance can serve data from more than one zone in a region
   * (it is highly available)./ For more information, see [Overview of the High
   * Availability
   * Configuration](https://cloud.google.com/sql/docs/mysql/high-availability).
   */
  availabilityType?:  | "SQL_AVAILABILITY_TYPE_UNSPECIFIED" | "ZONAL" | "REGIONAL";
  /**
   * The daily backup configuration for the instance.
   */
  backupConfiguration?: BackupConfiguration;
  /**
   * The name of server Instance collation.
   */
  collation?: string;
  /**
   * Specifies if connections must use Cloud SQL connectors. Option values
   * include the following: `NOT_REQUIRED` (Cloud SQL instances can be connected
   * without Cloud SQL Connectors) and `REQUIRED` (Only allow connections that
   * use Cloud SQL Connectors). Note that using REQUIRED disables all existing
   * authorized networks. If this field is not specified when creating a new
   * instance, NOT_REQUIRED is used. If this field is not specified when
   * patching or updating an existing instance, it is left unchanged in the
   * instance.
   */
  connectorEnforcement?:  | "CONNECTOR_ENFORCEMENT_UNSPECIFIED" | "NOT_REQUIRED" | "REQUIRED";
  /**
   * Configuration specific to read replica instances. Indicates whether
   * database flags for crash-safe replication are enabled. This property was
   * only applicable to First Generation instances.
   */
  crashSafeReplicationEnabled?: boolean;
  /**
   * The database flags passed to the instance at startup.
   */
  databaseFlags?: DatabaseFlags[];
  /**
   * Configuration specific to read replica instances. Indicates whether
   * replication is enabled or not. WARNING: Changing this restarts the
   * instance.
   */
  databaseReplicationEnabled?: boolean;
  /**
   * The size of data disk, in GB. The data disk size minimum is 10GB.
   */
  dataDiskSizeGb?: bigint;
  /**
   * The type of data disk: `PD_SSD` (default) or `PD_HDD`. Not used for First
   * Generation instances.
   */
  dataDiskType?:  | "SQL_DATA_DISK_TYPE_UNSPECIFIED" | "PD_SSD" | "PD_HDD" | "OBSOLETE_LOCAL_SSD";
  /**
   * Configuration to protect against accidental instance deletion.
   */
  deletionProtectionEnabled?: boolean;
  /**
   * Deny maintenance periods
   */
  denyMaintenancePeriods?: DenyMaintenancePeriod[];
  /**
   * Insights configuration, for now relevant only for Postgres.
   */
  insightsConfig?: InsightsConfig;
  /**
   * The settings for IP Management. This allows to enable or disable the
   * instance IP and manage which external networks can connect to the instance.
   * The IPv4 address cannot be disabled for Second Generation instances.
   */
  ipConfiguration?: IpConfiguration;
  /**
   * This is always `sql#settings`.
   */
  kind?: string;
  /**
   * The location preference settings. This allows the instance to be located
   * as near as possible to either an App Engine app or Compute Engine zone for
   * better performance. App Engine co-location was only applicable to First
   * Generation instances.
   */
  locationPreference?: LocationPreference;
  /**
   * The maintenance window for this instance. This specifies when the instance
   * can be restarted for maintenance purposes.
   */
  maintenanceWindow?: MaintenanceWindow;
  /**
   * The local user password validation policy of the instance.
   */
  passwordValidationPolicy?: PasswordValidationPolicy;
  /**
   * The pricing plan for this instance. This can be either `PER_USE` or
   * `PACKAGE`. Only `PER_USE` is supported for Second Generation instances.
   */
  pricingPlan?:  | "SQL_PRICING_PLAN_UNSPECIFIED" | "PACKAGE" | "PER_USE";
  /**
   * The type of replication this instance uses. This can be either
   * `ASYNCHRONOUS` or `SYNCHRONOUS`. (Deprecated) This property was only
   * applicable to First Generation instances.
   */
  replicationType?:  | "SQL_REPLICATION_TYPE_UNSPECIFIED" | "SYNCHRONOUS" | "ASYNCHRONOUS";
  /**
   * The version of instance settings. This is a required field for update
   * method to make sure concurrent updates are handled properly. During update,
   * use the most recent settingsVersion value for this instance and do not try
   * to update this value.
   */
  settingsVersion?: bigint;
  /**
   * SQL Server specific audit configuration.
   */
  sqlServerAuditConfig?: SqlServerAuditConfig;
  /**
   * Configuration to increase storage size automatically. The default value is
   * true.
   */
  storageAutoResize?: boolean;
  /**
   * The maximum size to which storage capacity can be automatically increased.
   * The default value is 0, which specifies that there is no limit.
   */
  storageAutoResizeLimit?: bigint;
  /**
   * The tier (or machine type) for this instance, for example
   * `db-custom-1-3840`. WARNING: Changing this restarts the instance.
   */
  tier?: string;
  /**
   * Server timezone, relevant only for Cloud SQL for SQL Server.
   */
  timeZone?: string;
  /**
   * User-provided labels, represented as a dictionary where each label is a
   * single key value pair.
   */
  userLabels?: {
    [key: string]: string
  };
}

function serializeSettings(data: any): Settings {
  return {
    ...data,
    dataDiskSizeGb: data["dataDiskSizeGb"] !== undefined ? String(data["dataDiskSizeGb"]) : undefined,
    ipConfiguration: data["ipConfiguration"] !== undefined ? serializeIpConfiguration(data["ipConfiguration"]) : undefined,
    passwordValidationPolicy: data["passwordValidationPolicy"] !== undefined ? serializePasswordValidationPolicy(data["passwordValidationPolicy"]) : undefined,
    settingsVersion: data["settingsVersion"] !== undefined ? String(data["settingsVersion"]) : undefined,
    sqlServerAuditConfig: data["sqlServerAuditConfig"] !== undefined ? serializeSqlServerAuditConfig(data["sqlServerAuditConfig"]) : undefined,
    storageAutoResizeLimit: data["storageAutoResizeLimit"] !== undefined ? String(data["storageAutoResizeLimit"]) : undefined,
  };
}

function deserializeSettings(data: any): Settings {
  return {
    ...data,
    dataDiskSizeGb: data["dataDiskSizeGb"] !== undefined ? BigInt(data["dataDiskSizeGb"]) : undefined,
    ipConfiguration: data["ipConfiguration"] !== undefined ? deserializeIpConfiguration(data["ipConfiguration"]) : undefined,
    passwordValidationPolicy: data["passwordValidationPolicy"] !== undefined ? deserializePasswordValidationPolicy(data["passwordValidationPolicy"]) : undefined,
    settingsVersion: data["settingsVersion"] !== undefined ? BigInt(data["settingsVersion"]) : undefined,
    sqlServerAuditConfig: data["sqlServerAuditConfig"] !== undefined ? deserializeSqlServerAuditConfig(data["sqlServerAuditConfig"]) : undefined,
    storageAutoResizeLimit: data["storageAutoResizeLimit"] !== undefined ? BigInt(data["storageAutoResizeLimit"]) : undefined,
  };
}

/**
 * Active Directory configuration, relevant only for Cloud SQL for SQL Server.
 */
export interface SqlActiveDirectoryConfig {
  /**
   * The name of the domain (e.g., mydomain.com).
   */
  domain?: string;
  /**
   * This is always sql#activeDirectoryConfig.
   */
  kind?: string;
}

/**
 * External primary instance migration setting error/warning.
 */
export interface SqlExternalSyncSettingError {
  /**
   * Additional information about the error encountered.
   */
  detail?: string;
  /**
   * Can be `sql#externalSyncSettingError` or `sql#externalSyncSettingWarning`.
   */
  kind?: string;
  /**
   * Identifies the specific error that occurred.
   */
  type?:  | "SQL_EXTERNAL_SYNC_SETTING_ERROR_TYPE_UNSPECIFIED" | "CONNECTION_FAILURE" | "BINLOG_NOT_ENABLED" | "INCOMPATIBLE_DATABASE_VERSION" | "REPLICA_ALREADY_SETUP" | "INSUFFICIENT_PRIVILEGE" | "UNSUPPORTED_MIGRATION_TYPE" | "NO_PGLOGICAL_INSTALLED" | "PGLOGICAL_NODE_ALREADY_EXISTS" | "INVALID_WAL_LEVEL" | "INVALID_SHARED_PRELOAD_LIBRARY" | "INSUFFICIENT_MAX_REPLICATION_SLOTS" | "INSUFFICIENT_MAX_WAL_SENDERS" | "INSUFFICIENT_MAX_WORKER_PROCESSES" | "UNSUPPORTED_EXTENSIONS" | "INVALID_RDS_LOGICAL_REPLICATION" | "INVALID_LOGGING_SETUP" | "INVALID_DB_PARAM" | "UNSUPPORTED_GTID_MODE" | "SQLSERVER_AGENT_NOT_RUNNING" | "UNSUPPORTED_TABLE_DEFINITION" | "UNSUPPORTED_DEFINER" | "SQLSERVER_SERVERNAME_MISMATCH" | "PRIMARY_ALREADY_SETUP" | "UNSUPPORTED_BINLOG_FORMAT" | "BINLOG_RETENTION_SETTING" | "UNSUPPORTED_STORAGE_ENGINE" | "LIMITED_SUPPORT_TABLES" | "EXISTING_DATA_IN_REPLICA";
}

/**
 * Instance get disk shrink config response.
 */
export interface SqlInstancesGetDiskShrinkConfigResponse {
  /**
   * This is always `sql#getDiskShrinkConfig`.
   */
  kind?: string;
  /**
   * The minimum size to which a disk can be shrunk in GigaBytes.
   */
  minimalTargetSizeGb?: bigint;
}

function serializeSqlInstancesGetDiskShrinkConfigResponse(data: any): SqlInstancesGetDiskShrinkConfigResponse {
  return {
    ...data,
    minimalTargetSizeGb: data["minimalTargetSizeGb"] !== undefined ? String(data["minimalTargetSizeGb"]) : undefined,
  };
}

function deserializeSqlInstancesGetDiskShrinkConfigResponse(data: any): SqlInstancesGetDiskShrinkConfigResponse {
  return {
    ...data,
    minimalTargetSizeGb: data["minimalTargetSizeGb"] !== undefined ? BigInt(data["minimalTargetSizeGb"]) : undefined,
  };
}

/**
 * Reschedule options for maintenance windows.
 */
export interface SqlInstancesRescheduleMaintenanceRequestBody {
  /**
   * Required. The type of the reschedule the user wants.
   */
  reschedule?: Reschedule;
}

function serializeSqlInstancesRescheduleMaintenanceRequestBody(data: any): SqlInstancesRescheduleMaintenanceRequestBody {
  return {
    ...data,
    reschedule: data["reschedule"] !== undefined ? serializeReschedule(data["reschedule"]) : undefined,
  };
}

function deserializeSqlInstancesRescheduleMaintenanceRequestBody(data: any): SqlInstancesRescheduleMaintenanceRequestBody {
  return {
    ...data,
    reschedule: data["reschedule"] !== undefined ? deserializeReschedule(data["reschedule"]) : undefined,
  };
}

/**
 * Instance reset replica size request.
 */
export interface SqlInstancesResetReplicaSizeRequest {
}

/**
 * Instance start external sync request.
 */
export interface SqlInstancesStartExternalSyncRequest {
  /**
   * MySQL-specific settings for start external sync.
   */
  mysqlSyncConfig?: MySqlSyncConfig;
  /**
   * Whether to skip the verification step (VESS).
   */
  skipVerification?: boolean;
  /**
   * External sync mode.
   */
  syncMode?:  | "EXTERNAL_SYNC_MODE_UNSPECIFIED" | "ONLINE" | "OFFLINE";
}

/**
 * Instance verify external sync settings request.
 */
export interface SqlInstancesVerifyExternalSyncSettingsRequest {
  /**
   * Optional. MySQL-specific settings for start external sync.
   */
  mysqlSyncConfig?: MySqlSyncConfig;
  /**
   * External sync mode
   */
  syncMode?:  | "EXTERNAL_SYNC_MODE_UNSPECIFIED" | "ONLINE" | "OFFLINE";
  /**
   * Flag to enable verifying connection only
   */
  verifyConnectionOnly?: boolean;
  /**
   * Optional. Flag to verify settings required by replication setup only
   */
  verifyReplicationOnly?: boolean;
}

/**
 * Instance verify external sync settings response.
 */
export interface SqlInstancesVerifyExternalSyncSettingsResponse {
  /**
   * List of migration violations.
   */
  errors?: SqlExternalSyncSettingError[];
  /**
   * This is always `sql#migrationSettingErrorList`.
   */
  kind?: string;
  /**
   * List of migration warnings.
   */
  warnings?: SqlExternalSyncSettingError[];
}

/**
 * This message wraps up the information written by out-of-disk detection job.
 */
export interface SqlOutOfDiskReport {
  /**
   * The minimum recommended increase size in GigaBytes This field is consumed
   * by the frontend * Writers: * the proactive database wellness job for OOD. *
   * Readers:
   */
  sqlMinRecommendedIncreaseSizeGb?: number;
  /**
   * This field represents the state generated by the proactive database
   * wellness job for OutOfDisk issues. * Writers: * the proactive database
   * wellness job for OOD. * Readers: * the proactive database wellness job
   */
  sqlOutOfDiskState?:  | "SQL_OUT_OF_DISK_STATE_UNSPECIFIED" | "NORMAL" | "SOFT_SHUTDOWN";
}

/**
 * Any scheduled maintenance for this instance.
 */
export interface SqlScheduledMaintenance {
  canDefer?: boolean;
  /**
   * If the scheduled maintenance can be rescheduled.
   */
  canReschedule?: boolean;
  /**
   * Maintenance cannot be rescheduled to start beyond this deadline.
   */
  scheduleDeadlineTime?: Date;
  /**
   * The start time of any upcoming scheduled maintenance for this instance.
   */
  startTime?: Date;
}

function serializeSqlScheduledMaintenance(data: any): SqlScheduledMaintenance {
  return {
    ...data,
    scheduleDeadlineTime: data["scheduleDeadlineTime"] !== undefined ? data["scheduleDeadlineTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeSqlScheduledMaintenance(data: any): SqlScheduledMaintenance {
  return {
    ...data,
    scheduleDeadlineTime: data["scheduleDeadlineTime"] !== undefined ? new Date(data["scheduleDeadlineTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * SQL Server specific audit configuration.
 */
export interface SqlServerAuditConfig {
  /**
   * The name of the destination bucket (e.g., gs://mybucket).
   */
  bucket?: string;
  /**
   * This is always sql#sqlServerAuditConfig
   */
  kind?: string;
  /**
   * How long to keep generated audit files.
   */
  retentionInterval?: number /* Duration */;
  /**
   * How often to upload generated audit files.
   */
  uploadInterval?: number /* Duration */;
}

function serializeSqlServerAuditConfig(data: any): SqlServerAuditConfig {
  return {
    ...data,
    retentionInterval: data["retentionInterval"] !== undefined ? data["retentionInterval"] : undefined,
    uploadInterval: data["uploadInterval"] !== undefined ? data["uploadInterval"] : undefined,
  };
}

function deserializeSqlServerAuditConfig(data: any): SqlServerAuditConfig {
  return {
    ...data,
    retentionInterval: data["retentionInterval"] !== undefined ? data["retentionInterval"] : undefined,
    uploadInterval: data["uploadInterval"] !== undefined ? data["uploadInterval"] : undefined,
  };
}

/**
 * Represents a Sql Server database on the Cloud SQL instance.
 */
export interface SqlServerDatabaseDetails {
  /**
   * The version of SQL Server with which the database is to be made compatible
   */
  compatibilityLevel?: number;
  /**
   * The recovery model of a SQL Server database
   */
  recoveryModel?: string;
}

/**
 * Represents a Sql Server user on the Cloud SQL instance.
 */
export interface SqlServerUserDetails {
  /**
   * If the user has been disabled
   */
  disabled?: boolean;
  /**
   * The server roles for this user
   */
  serverRoles?: string[];
}

/**
 * SslCerts Resource
 */
export interface SslCert {
  /**
   * PEM representation.
   */
  cert?: string;
  /**
   * Serial number, as extracted from the certificate.
   */
  certSerialNumber?: string;
  /**
   * User supplied name. Constrained to [a-zA-Z.-_ ]+.
   */
  commonName?: string;
  /**
   * The time when the certificate was created in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`
   */
  createTime?: Date;
  /**
   * The time when the certificate expires in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example
   * `2012-11-15T16:19:00.094Z`.
   */
  expirationTime?: Date;
  /**
   * Name of the database instance.
   */
  instance?: string;
  /**
   * This is always `sql#sslCert`.
   */
  kind?: string;
  /**
   * The URI of this resource.
   */
  selfLink?: string;
  /**
   * Sha1 Fingerprint.
   */
  sha1Fingerprint?: string;
}

function serializeSslCert(data: any): SslCert {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    expirationTime: data["expirationTime"] !== undefined ? data["expirationTime"].toISOString() : undefined,
  };
}

function deserializeSslCert(data: any): SslCert {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    expirationTime: data["expirationTime"] !== undefined ? new Date(data["expirationTime"]) : undefined,
  };
}

/**
 * SslCertDetail.
 */
export interface SslCertDetail {
  /**
   * The public information about the cert.
   */
  certInfo?: SslCert;
  /**
   * The private key for the client cert, in pem format. Keep private in order
   * to protect your security.
   */
  certPrivateKey?: string;
}

function serializeSslCertDetail(data: any): SslCertDetail {
  return {
    ...data,
    certInfo: data["certInfo"] !== undefined ? serializeSslCert(data["certInfo"]) : undefined,
  };
}

function deserializeSslCertDetail(data: any): SslCertDetail {
  return {
    ...data,
    certInfo: data["certInfo"] !== undefined ? deserializeSslCert(data["certInfo"]) : undefined,
  };
}

/**
 * SslCerts create ephemeral certificate request.
 */
export interface SslCertsCreateEphemeralRequest {
  /**
   * Access token to include in the signed certificate.
   */
  access_token?: string;
  /**
   * PEM encoded public key to include in the signed certificate.
   */
  public_key?: string;
}

/**
 * SslCerts insert request.
 */
export interface SslCertsInsertRequest {
  /**
   * User supplied name. Must be a distinct name from the other certificates
   * for this instance.
   */
  commonName?: string;
}

/**
 * SslCert insert response.
 */
export interface SslCertsInsertResponse {
  /**
   * The new client certificate and private key.
   */
  clientCert?: SslCertDetail;
  /**
   * This is always `sql#sslCertsInsert`.
   */
  kind?: string;
  /**
   * The operation to track the ssl certs insert request.
   */
  operation?: Operation;
  /**
   * The server Certificate Authority's certificate. If this is missing you can
   * force a new one to be generated by calling resetSslConfig method on
   * instances resource.
   */
  serverCaCert?: SslCert;
}

function serializeSslCertsInsertResponse(data: any): SslCertsInsertResponse {
  return {
    ...data,
    clientCert: data["clientCert"] !== undefined ? serializeSslCertDetail(data["clientCert"]) : undefined,
    operation: data["operation"] !== undefined ? serializeOperation(data["operation"]) : undefined,
    serverCaCert: data["serverCaCert"] !== undefined ? serializeSslCert(data["serverCaCert"]) : undefined,
  };
}

function deserializeSslCertsInsertResponse(data: any): SslCertsInsertResponse {
  return {
    ...data,
    clientCert: data["clientCert"] !== undefined ? deserializeSslCertDetail(data["clientCert"]) : undefined,
    operation: data["operation"] !== undefined ? deserializeOperation(data["operation"]) : undefined,
    serverCaCert: data["serverCaCert"] !== undefined ? deserializeSslCert(data["serverCaCert"]) : undefined,
  };
}

/**
 * SslCerts list response.
 */
export interface SslCertsListResponse {
  /**
   * List of client certificates for the instance.
   */
  items?: SslCert[];
  /**
   * This is always `sql#sslCertsList`.
   */
  kind?: string;
}

function serializeSslCertsListResponse(data: any): SslCertsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeSslCert(item))) : undefined,
  };
}

function deserializeSslCertsListResponse(data: any): SslCertsListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeSslCert(item))) : undefined,
  };
}

/**
 * Initial sync flags for certain Cloud SQL APIs. Currently used for the MySQL
 * external server initial dump.
 */
export interface SyncFlags {
  /**
   * The name of the flag.
   */
  name?: string;
  /**
   * The value of the flag. This field must be omitted if the flag doesn't take
   * a value.
   */
  value?: string;
}

/**
 * A Google Cloud SQL service tier resource.
 */
export interface Tier {
  /**
   * The maximum disk size of this tier in bytes.
   */
  DiskQuota?: bigint;
  /**
   * This is always `sql#tier`.
   */
  kind?: string;
  /**
   * The maximum RAM usage of this tier in bytes.
   */
  RAM?: bigint;
  /**
   * The applicable regions for this tier.
   */
  region?: string[];
  /**
   * An identifier for the machine type, for example, `db-custom-1-3840`. For
   * related information, see [Pricing](/sql/pricing).
   */
  tier?: string;
}

function serializeTier(data: any): Tier {
  return {
    ...data,
    DiskQuota: data["DiskQuota"] !== undefined ? String(data["DiskQuota"]) : undefined,
    RAM: data["RAM"] !== undefined ? String(data["RAM"]) : undefined,
  };
}

function deserializeTier(data: any): Tier {
  return {
    ...data,
    DiskQuota: data["DiskQuota"] !== undefined ? BigInt(data["DiskQuota"]) : undefined,
    RAM: data["RAM"] !== undefined ? BigInt(data["RAM"]) : undefined,
  };
}

/**
 * Tiers list response.
 */
export interface TiersListResponse {
  /**
   * List of tiers.
   */
  items?: Tier[];
  /**
   * This is always `sql#tiersList`.
   */
  kind?: string;
}

function serializeTiersListResponse(data: any): TiersListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeTier(item))) : undefined,
  };
}

function deserializeTiersListResponse(data: any): TiersListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeTier(item))) : undefined,
  };
}

/**
 * Database Instance truncate log context.
 */
export interface TruncateLogContext {
  /**
   * This is always `sql#truncateLogContext`.
   */
  kind?: string;
  /**
   * The type of log to truncate. Valid values are `MYSQL_GENERAL_TABLE` and
   * `MYSQL_SLOW_TABLE`.
   */
  logType?: string;
}

/**
 * A Cloud SQL user resource.
 */
export interface User {
  /**
   * Dual password status for the user.
   */
  dualPasswordType?:  | "DUAL_PASSWORD_TYPE_UNSPECIFIED" | "NO_MODIFY_DUAL_PASSWORD" | "NO_DUAL_PASSWORD" | "DUAL_PASSWORD";
  /**
   * This field is deprecated and will be removed from a future version of the
   * API.
   */
  etag?: string;
  /**
   * Optional. The host from which the user can connect. For `insert`
   * operations, host defaults to an empty string. For `update` operations, host
   * is specified as part of the request URL. The host name cannot be updated
   * after insertion. For a MySQL instance, it's required; for a PostgreSQL or
   * SQL Server instance, it's optional.
   */
  host?: string;
  /**
   * The name of the Cloud SQL instance. This does not include the project ID.
   * Can be omitted for `update` because it is already specified on the URL.
   */
  instance?: string;
  /**
   * This is always `sql#user`.
   */
  kind?: string;
  /**
   * The name of the user in the Cloud SQL instance. Can be omitted for
   * `update` because it is already specified in the URL.
   */
  name?: string;
  /**
   * The password for the user.
   */
  password?: string;
  /**
   * User level password validation policy.
   */
  passwordPolicy?: UserPasswordValidationPolicy;
  /**
   * The project ID of the project containing the Cloud SQL database. The
   * Google apps domain is prefixed if applicable. Can be omitted for `update`
   * because it is already specified on the URL.
   */
  project?: string;
  sqlserverUserDetails?: SqlServerUserDetails;
  /**
   * The user type. It determines the method to authenticate the user during
   * login. The default is the database's built-in user type.
   */
  type?:  | "BUILT_IN" | "CLOUD_IAM_USER" | "CLOUD_IAM_SERVICE_ACCOUNT";
}

function serializeUser(data: any): User {
  return {
    ...data,
    passwordPolicy: data["passwordPolicy"] !== undefined ? serializeUserPasswordValidationPolicy(data["passwordPolicy"]) : undefined,
  };
}

function deserializeUser(data: any): User {
  return {
    ...data,
    passwordPolicy: data["passwordPolicy"] !== undefined ? deserializeUserPasswordValidationPolicy(data["passwordPolicy"]) : undefined,
  };
}

/**
 * User level password validation policy.
 */
export interface UserPasswordValidationPolicy {
  /**
   * Number of failed login attempts allowed before user get locked.
   */
  allowedFailedAttempts?: number;
  /**
   * If true, failed login attempts check will be enabled.
   */
  enableFailedAttemptsCheck?: boolean;
  /**
   * If true, the user must specify the current password before changing the
   * password. This flag is supported only for MySQL.
   */
  enablePasswordVerification?: boolean;
  /**
   * Expiration duration after password is updated.
   */
  passwordExpirationDuration?: number /* Duration */;
  /**
   * Output only. Read-only password status.
   */
  readonly status?: PasswordStatus;
}

function serializeUserPasswordValidationPolicy(data: any): UserPasswordValidationPolicy {
  return {
    ...data,
    passwordExpirationDuration: data["passwordExpirationDuration"] !== undefined ? data["passwordExpirationDuration"] : undefined,
  };
}

function deserializeUserPasswordValidationPolicy(data: any): UserPasswordValidationPolicy {
  return {
    ...data,
    passwordExpirationDuration: data["passwordExpirationDuration"] !== undefined ? data["passwordExpirationDuration"] : undefined,
    status: data["status"] !== undefined ? deserializePasswordStatus(data["status"]) : undefined,
  };
}

/**
 * Additional options for SQLAdmin#usersDelete.
 */
export interface UsersDeleteOptions {
  /**
   * Host of the user in the instance.
   */
  host?: string;
  /**
   * Name of the user in the instance.
   */
  name?: string;
}

/**
 * Additional options for SQLAdmin#usersGet.
 */
export interface UsersGetOptions {
  /**
   * Host of a user of the instance.
   */
  host?: string;
}

/**
 * User list response.
 */
export interface UsersListResponse {
  /**
   * List of user resources in the instance.
   */
  items?: User[];
  /**
   * This is always `sql#usersList`.
   */
  kind?: string;
  /**
   * Unused.
   */
  nextPageToken?: string;
}

function serializeUsersListResponse(data: any): UsersListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeUser(item))) : undefined,
  };
}

function deserializeUsersListResponse(data: any): UsersListResponse {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeUser(item))) : undefined,
  };
}

/**
 * Additional options for SQLAdmin#usersUpdate.
 */
export interface UsersUpdateOptions {
  /**
   * Optional. Host of the user in the instance.
   */
  host?: string;
  /**
   * Name of the user in the instance.
   */
  name?: string;
}