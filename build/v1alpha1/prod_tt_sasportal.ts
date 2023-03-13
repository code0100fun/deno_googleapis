// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * SAS Portal API (Testing) Client for Deno
 * ========================================
 * 
 * 
 * 
 * Docs: https://developers.google.com/spectrum-access-system/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class prod_tt_SASPortal {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://prod-tt-sasportal.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new deployment.
   *
   * @param parent Required. The parent resource name where the deployment is to be created.
   */
  async customersDeploymentsCreate(parent: string, req: SasPortalDeployment): Promise<SasPortalDeployment> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/deployments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalDeployment;
  }

  /**
   * Deletes a deployment.
   *
   * @param name Required. The name of the deployment.
   */
  async customersDeploymentsDelete(name: string): Promise<SasPortalEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as SasPortalEmpty;
  }

  /**
   * Creates a device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersDeploymentsDevicesCreate(parent: string, req: SasPortalDevice): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Creates a signed device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersDeploymentsDevicesCreateSigned(parent: string, req: SasPortalCreateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalCreateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices:createSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Lists devices under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersDeploymentsDevicesList(parent: string, opts: CustomersDeploymentsDevicesListOptions = {}): Promise<SasPortalListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
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
    return deserializeSasPortalListDevicesResponse(data);
  }

  /**
   * Returns a requested deployment.
   *
   * @param name Required. The name of the deployment.
   */
  async customersDeploymentsGet(name: string): Promise<SasPortalDeployment> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SasPortalDeployment;
  }

  /**
   * Lists deployments.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2.
   */
  async customersDeploymentsList(parent: string, opts: CustomersDeploymentsListOptions = {}): Promise<SasPortalListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/deployments`);
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
    return data as SasPortalListDeploymentsResponse;
  }

  /**
   * Moves a deployment under another node or customer.
   *
   * @param name Required. The name of the deployment to move.
   */
  async customersDeploymentsMove(name: string, req: SasPortalMoveDeploymentRequest): Promise<SasPortalOperation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalOperation;
  }

  /**
   * Updates an existing deployment.
   *
   * @param name Output only. Resource name.
   */
  async customersDeploymentsPatch(name: string, req: SasPortalDeployment, opts: CustomersDeploymentsPatchOptions = {}): Promise<SasPortalDeployment> {
    opts = serializeCustomersDeploymentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SasPortalDeployment;
  }

  /**
   * Creates a device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersDevicesCreate(parent: string, req: SasPortalDevice): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Creates a signed device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersDevicesCreateSigned(parent: string, req: SasPortalCreateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalCreateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices:createSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Deletes a device.
   *
   * @param name Required. The name of the device.
   */
  async customersDevicesDelete(name: string): Promise<SasPortalEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as SasPortalEmpty;
  }

  /**
   * Gets details about a device.
   *
   * @param name Required. The name of the device.
   */
  async customersDevicesGet(name: string): Promise<SasPortalDevice> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Lists devices under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersDevicesList(parent: string, opts: CustomersDevicesListOptions = {}): Promise<SasPortalListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
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
    return deserializeSasPortalListDevicesResponse(data);
  }

  /**
   * Moves a device under another node or customer.
   *
   * @param name Required. The name of the device to move.
   */
  async customersDevicesMove(name: string, req: SasPortalMoveDeviceRequest): Promise<SasPortalOperation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalOperation;
  }

  /**
   * Updates a device.
   *
   * @param name Output only. The resource path name.
   */
  async customersDevicesPatch(name: string, req: SasPortalDevice, opts: CustomersDevicesPatchOptions = {}): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    opts = serializeCustomersDevicesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Signs a device.
   *
   * @param name Output only. The resource path name.
   */
  async customersDevicesSignDevice(name: string, req: SasPortalSignDeviceRequest): Promise<SasPortalEmpty> {
    req = serializeSasPortalSignDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:signDevice`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalEmpty;
  }

  /**
   * Updates a signed device.
   *
   * @param name Required. The name of the device to update.
   */
  async customersDevicesUpdateSigned(name: string, req: SasPortalUpdateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalUpdateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:updateSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Returns a requested customer.
   *
   * @param name Required. The name of the customer.
   */
  async customersGet(name: string): Promise<SasPortalCustomer> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SasPortalCustomer;
  }

  /**
   * Returns a list of requested customers.
   *
   */
  async customersList(opts: CustomersListOptions = {}): Promise<SasPortalListCustomersResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/customers`);
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
    return data as SasPortalListCustomersResponse;
  }

  /**
   * Creates a new node.
   *
   * @param parent Required. The parent resource name where the node is to be created.
   */
  async customersNodesCreate(parent: string, req: SasPortalNode): Promise<SasPortalNode> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalNode;
  }

  /**
   * Deletes a node.
   *
   * @param name Required. The name of the node.
   */
  async customersNodesDelete(name: string): Promise<SasPortalEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as SasPortalEmpty;
  }

  /**
   * Creates a new deployment.
   *
   * @param parent Required. The parent resource name where the deployment is to be created.
   */
  async customersNodesDeploymentsCreate(parent: string, req: SasPortalDeployment): Promise<SasPortalDeployment> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/deployments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalDeployment;
  }

  /**
   * Lists deployments.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2.
   */
  async customersNodesDeploymentsList(parent: string, opts: CustomersNodesDeploymentsListOptions = {}): Promise<SasPortalListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/deployments`);
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
    return data as SasPortalListDeploymentsResponse;
  }

  /**
   * Creates a device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersNodesDevicesCreate(parent: string, req: SasPortalDevice): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Creates a signed device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersNodesDevicesCreateSigned(parent: string, req: SasPortalCreateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalCreateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices:createSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Lists devices under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async customersNodesDevicesList(parent: string, opts: CustomersNodesDevicesListOptions = {}): Promise<SasPortalListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
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
    return deserializeSasPortalListDevicesResponse(data);
  }

  /**
   * Returns a requested node.
   *
   * @param name Required. The name of the node.
   */
  async customersNodesGet(name: string): Promise<SasPortalNode> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SasPortalNode;
  }

  /**
   * Lists nodes.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1".
   */
  async customersNodesList(parent: string, opts: CustomersNodesListOptions = {}): Promise<SasPortalListNodesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
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
    return data as SasPortalListNodesResponse;
  }

  /**
   * Moves a node under another node or customer.
   *
   * @param name Required. The name of the node to move.
   */
  async customersNodesMove(name: string, req: SasPortalMoveNodeRequest): Promise<SasPortalOperation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalOperation;
  }

  /**
   * Creates a new node.
   *
   * @param parent Required. The parent resource name where the node is to be created.
   */
  async customersNodesNodesCreate(parent: string, req: SasPortalNode): Promise<SasPortalNode> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalNode;
  }

  /**
   * Lists nodes.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1".
   */
  async customersNodesNodesList(parent: string, opts: CustomersNodesNodesListOptions = {}): Promise<SasPortalListNodesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
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
    return data as SasPortalListNodesResponse;
  }

  /**
   * Updates an existing node.
   *
   * @param name Output only. Resource name.
   */
  async customersNodesPatch(name: string, req: SasPortalNode, opts: CustomersNodesPatchOptions = {}): Promise<SasPortalNode> {
    opts = serializeCustomersNodesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SasPortalNode;
  }

  /**
   * Updates an existing customer.
   *
   * @param name Output only. Resource name of the customer.
   */
  async customersPatch(name: string, req: SasPortalCustomer, opts: CustomersPatchOptions = {}): Promise<SasPortalCustomer> {
    opts = serializeCustomersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SasPortalCustomer;
  }

  /**
   * Creates a new SAS deployment through the GCP workflow. Creates a SAS
   * organization if an organization match is not found.
   *
   */
  async customersProvisionDeployment(req: SasPortalProvisionDeploymentRequest): Promise<SasPortalProvisionDeploymentResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/customers:provisionDeployment`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalProvisionDeploymentResponse;
  }

  /**
   * Deletes a device.
   *
   * @param name Required. The name of the device.
   */
  async deploymentsDevicesDelete(name: string): Promise<SasPortalEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as SasPortalEmpty;
  }

  /**
   * Gets details about a device.
   *
   * @param name Required. The name of the device.
   */
  async deploymentsDevicesGet(name: string): Promise<SasPortalDevice> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Moves a device under another node or customer.
   *
   * @param name Required. The name of the device to move.
   */
  async deploymentsDevicesMove(name: string, req: SasPortalMoveDeviceRequest): Promise<SasPortalOperation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalOperation;
  }

  /**
   * Updates a device.
   *
   * @param name Output only. The resource path name.
   */
  async deploymentsDevicesPatch(name: string, req: SasPortalDevice, opts: DeploymentsDevicesPatchOptions = {}): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    opts = serializeDeploymentsDevicesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Signs a device.
   *
   * @param name Output only. The resource path name.
   */
  async deploymentsDevicesSignDevice(name: string, req: SasPortalSignDeviceRequest): Promise<SasPortalEmpty> {
    req = serializeSasPortalSignDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:signDevice`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalEmpty;
  }

  /**
   * Updates a signed device.
   *
   * @param name Required. The name of the device to update.
   */
  async deploymentsDevicesUpdateSigned(name: string, req: SasPortalUpdateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalUpdateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:updateSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Returns a requested deployment.
   *
   * @param name Required. The name of the deployment.
   */
  async deploymentsGet(name: string): Promise<SasPortalDeployment> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SasPortalDeployment;
  }

  /**
   * Generates a secret to be used with the ValidateInstaller.
   *
   */
  async installerGenerateSecret(req: SasPortalGenerateSecretRequest): Promise<SasPortalGenerateSecretResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/installer:generateSecret`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalGenerateSecretResponse;
  }

  /**
   * Validates the identity of a Certified Professional Installer (CPI).
   *
   */
  async installerValidate(req: SasPortalValidateInstallerRequest): Promise<SasPortalValidateInstallerResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/installer:validate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalValidateInstallerResponse;
  }

  /**
   * Deletes a deployment.
   *
   * @param name Required. The name of the deployment.
   */
  async nodesDeploymentsDelete(name: string): Promise<SasPortalEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as SasPortalEmpty;
  }

  /**
   * Creates a device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesDeploymentsDevicesCreate(parent: string, req: SasPortalDevice): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Creates a signed device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesDeploymentsDevicesCreateSigned(parent: string, req: SasPortalCreateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalCreateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices:createSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Lists devices under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesDeploymentsDevicesList(parent: string, opts: NodesDeploymentsDevicesListOptions = {}): Promise<SasPortalListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
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
    return deserializeSasPortalListDevicesResponse(data);
  }

  /**
   * Returns a requested deployment.
   *
   * @param name Required. The name of the deployment.
   */
  async nodesDeploymentsGet(name: string): Promise<SasPortalDeployment> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SasPortalDeployment;
  }

  /**
   * Lists deployments.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2.
   */
  async nodesDeploymentsList(parent: string, opts: NodesDeploymentsListOptions = {}): Promise<SasPortalListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/deployments`);
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
    return data as SasPortalListDeploymentsResponse;
  }

  /**
   * Moves a deployment under another node or customer.
   *
   * @param name Required. The name of the deployment to move.
   */
  async nodesDeploymentsMove(name: string, req: SasPortalMoveDeploymentRequest): Promise<SasPortalOperation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalOperation;
  }

  /**
   * Updates an existing deployment.
   *
   * @param name Output only. Resource name.
   */
  async nodesDeploymentsPatch(name: string, req: SasPortalDeployment, opts: NodesDeploymentsPatchOptions = {}): Promise<SasPortalDeployment> {
    opts = serializeNodesDeploymentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SasPortalDeployment;
  }

  /**
   * Creates a device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesDevicesCreate(parent: string, req: SasPortalDevice): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Creates a signed device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesDevicesCreateSigned(parent: string, req: SasPortalCreateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalCreateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices:createSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Deletes a device.
   *
   * @param name Required. The name of the device.
   */
  async nodesDevicesDelete(name: string): Promise<SasPortalEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as SasPortalEmpty;
  }

  /**
   * Gets details about a device.
   *
   * @param name Required. The name of the device.
   */
  async nodesDevicesGet(name: string): Promise<SasPortalDevice> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Lists devices under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesDevicesList(parent: string, opts: NodesDevicesListOptions = {}): Promise<SasPortalListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
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
    return deserializeSasPortalListDevicesResponse(data);
  }

  /**
   * Moves a device under another node or customer.
   *
   * @param name Required. The name of the device to move.
   */
  async nodesDevicesMove(name: string, req: SasPortalMoveDeviceRequest): Promise<SasPortalOperation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalOperation;
  }

  /**
   * Updates a device.
   *
   * @param name Output only. The resource path name.
   */
  async nodesDevicesPatch(name: string, req: SasPortalDevice, opts: NodesDevicesPatchOptions = {}): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    opts = serializeNodesDevicesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Signs a device.
   *
   * @param name Output only. The resource path name.
   */
  async nodesDevicesSignDevice(name: string, req: SasPortalSignDeviceRequest): Promise<SasPortalEmpty> {
    req = serializeSasPortalSignDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:signDevice`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalEmpty;
  }

  /**
   * Updates a signed device.
   *
   * @param name Required. The name of the device to update.
   */
  async nodesDevicesUpdateSigned(name: string, req: SasPortalUpdateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalUpdateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:updateSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Returns a requested node.
   *
   * @param name Required. The name of the node.
   */
  async nodesGet(name: string): Promise<SasPortalNode> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SasPortalNode;
  }

  /**
   * Creates a new node.
   *
   * @param parent Required. The parent resource name where the node is to be created.
   */
  async nodesNodesCreate(parent: string, req: SasPortalNode): Promise<SasPortalNode> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalNode;
  }

  /**
   * Deletes a node.
   *
   * @param name Required. The name of the node.
   */
  async nodesNodesDelete(name: string): Promise<SasPortalEmpty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as SasPortalEmpty;
  }

  /**
   * Creates a new deployment.
   *
   * @param parent Required. The parent resource name where the deployment is to be created.
   */
  async nodesNodesDeploymentsCreate(parent: string, req: SasPortalDeployment): Promise<SasPortalDeployment> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/deployments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalDeployment;
  }

  /**
   * Lists deployments.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1", customer/1/nodes/2.
   */
  async nodesNodesDeploymentsList(parent: string, opts: NodesNodesDeploymentsListOptions = {}): Promise<SasPortalListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/deployments`);
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
    return data as SasPortalListDeploymentsResponse;
  }

  /**
   * Creates a device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesNodesDevicesCreate(parent: string, req: SasPortalDevice): Promise<SasPortalDevice> {
    req = serializeSasPortalDevice(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Creates a signed device under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesNodesDevicesCreateSigned(parent: string, req: SasPortalCreateSignedDeviceRequest): Promise<SasPortalDevice> {
    req = serializeSasPortalCreateSignedDeviceRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices:createSigned`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalDevice(data);
  }

  /**
   * Lists devices under a node or customer.
   *
   * @param parent Required. The name of the parent resource.
   */
  async nodesNodesDevicesList(parent: string, opts: NodesNodesDevicesListOptions = {}): Promise<SasPortalListDevicesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/devices`);
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
    return deserializeSasPortalListDevicesResponse(data);
  }

  /**
   * Returns a requested node.
   *
   * @param name Required. The name of the node.
   */
  async nodesNodesGet(name: string): Promise<SasPortalNode> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SasPortalNode;
  }

  /**
   * Lists nodes.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1".
   */
  async nodesNodesList(parent: string, opts: NodesNodesListOptions = {}): Promise<SasPortalListNodesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
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
    return data as SasPortalListNodesResponse;
  }

  /**
   * Moves a node under another node or customer.
   *
   * @param name Required. The name of the node to move.
   */
  async nodesNodesMove(name: string, req: SasPortalMoveNodeRequest): Promise<SasPortalOperation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalOperation;
  }

  /**
   * Creates a new node.
   *
   * @param parent Required. The parent resource name where the node is to be created.
   */
  async nodesNodesNodesCreate(parent: string, req: SasPortalNode): Promise<SasPortalNode> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalNode;
  }

  /**
   * Lists nodes.
   *
   * @param parent Required. The parent resource name, for example, "nodes/1".
   */
  async nodesNodesNodesList(parent: string, opts: NodesNodesNodesListOptions = {}): Promise<SasPortalListNodesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/nodes`);
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
    return data as SasPortalListNodesResponse;
  }

  /**
   * Updates an existing node.
   *
   * @param name Output only. Resource name.
   */
  async nodesNodesPatch(name: string, req: SasPortalNode, opts: NodesNodesPatchOptions = {}): Promise<SasPortalNode> {
    opts = serializeNodesNodesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as SasPortalNode;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   */
  async policiesGet(req: SasPortalGetPolicyRequest): Promise<SasPortalPolicy> {
    const url = new URL(`${this.#baseUrl}v1alpha1/policies:get`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalPolicy(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.
   *
   */
  async policiesSet(req: SasPortalSetPolicyRequest): Promise<SasPortalPolicy> {
    req = serializeSasPortalSetPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/policies:set`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSasPortalPolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource.
   *
   */
  async policiesTest(req: SasPortalTestPermissionsRequest): Promise<SasPortalTestPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/policies:test`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SasPortalTestPermissionsResponse;
  }
}

/**
 * Additional options for prod_tt_SASPortal#customersDeploymentsDevicesList.
 */
export interface CustomersDeploymentsDevicesListOptions {
  /**
   * The filter expression. The filter should have one of the following
   * formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial
   * number of the device. The filter is case insensitive.
   */
  filter?: string;
  /**
   * The maximum number of devices to return in the response. If empty or zero,
   * all devices will be listed. Must be in the range [0, 1000].
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDevices that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersDeploymentsList.
 */
export interface CustomersDeploymentsListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no deployments are filtered.
   */
  filter?: string;
  /**
   * The maximum number of deployments to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDeployments that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersDeploymentsPatch.
 */
export interface CustomersDeploymentsPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeCustomersDeploymentsPatchOptions(data: any): CustomersDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCustomersDeploymentsPatchOptions(data: any): CustomersDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for prod_tt_SASPortal#customersDevicesList.
 */
export interface CustomersDevicesListOptions {
  /**
   * The filter expression. The filter should have one of the following
   * formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial
   * number of the device. The filter is case insensitive.
   */
  filter?: string;
  /**
   * The maximum number of devices to return in the response. If empty or zero,
   * all devices will be listed. Must be in the range [0, 1000].
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDevices that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersDevicesPatch.
 */
export interface CustomersDevicesPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeCustomersDevicesPatchOptions(data: any): CustomersDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCustomersDevicesPatchOptions(data: any): CustomersDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for prod_tt_SASPortal#customersList.
 */
export interface CustomersListOptions {
  /**
   * The maximum number of customers to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListCustomers that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersNodesDeploymentsList.
 */
export interface CustomersNodesDeploymentsListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no deployments are filtered.
   */
  filter?: string;
  /**
   * The maximum number of deployments to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDeployments that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersNodesDevicesList.
 */
export interface CustomersNodesDevicesListOptions {
  /**
   * The filter expression. The filter should have one of the following
   * formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial
   * number of the device. The filter is case insensitive.
   */
  filter?: string;
  /**
   * The maximum number of devices to return in the response. If empty or zero,
   * all devices will be listed. Must be in the range [0, 1000].
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDevices that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersNodesList.
 */
export interface CustomersNodesListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no nodes are filtered.
   */
  filter?: string;
  /**
   * The maximum number of nodes to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListNodes that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersNodesNodesList.
 */
export interface CustomersNodesNodesListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no nodes are filtered.
   */
  filter?: string;
  /**
   * The maximum number of nodes to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListNodes that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#customersNodesPatch.
 */
export interface CustomersNodesPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeCustomersNodesPatchOptions(data: any): CustomersNodesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCustomersNodesPatchOptions(data: any): CustomersNodesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for prod_tt_SASPortal#customersPatch.
 */
export interface CustomersPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeCustomersPatchOptions(data: any): CustomersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeCustomersPatchOptions(data: any): CustomersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for prod_tt_SASPortal#deploymentsDevicesPatch.
 */
export interface DeploymentsDevicesPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeDeploymentsDevicesPatchOptions(data: any): DeploymentsDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeDeploymentsDevicesPatchOptions(data: any): DeploymentsDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for prod_tt_SASPortal#nodesDeploymentsDevicesList.
 */
export interface NodesDeploymentsDevicesListOptions {
  /**
   * The filter expression. The filter should have one of the following
   * formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial
   * number of the device. The filter is case insensitive.
   */
  filter?: string;
  /**
   * The maximum number of devices to return in the response. If empty or zero,
   * all devices will be listed. Must be in the range [0, 1000].
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDevices that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#nodesDeploymentsList.
 */
export interface NodesDeploymentsListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no deployments are filtered.
   */
  filter?: string;
  /**
   * The maximum number of deployments to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDeployments that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#nodesDeploymentsPatch.
 */
export interface NodesDeploymentsPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeNodesDeploymentsPatchOptions(data: any): NodesDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeNodesDeploymentsPatchOptions(data: any): NodesDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for prod_tt_SASPortal#nodesDevicesList.
 */
export interface NodesDevicesListOptions {
  /**
   * The filter expression. The filter should have one of the following
   * formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial
   * number of the device. The filter is case insensitive.
   */
  filter?: string;
  /**
   * The maximum number of devices to return in the response. If empty or zero,
   * all devices will be listed. Must be in the range [0, 1000].
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDevices that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#nodesDevicesPatch.
 */
export interface NodesDevicesPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeNodesDevicesPatchOptions(data: any): NodesDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeNodesDevicesPatchOptions(data: any): NodesDevicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for prod_tt_SASPortal#nodesNodesDeploymentsList.
 */
export interface NodesNodesDeploymentsListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no deployments are filtered.
   */
  filter?: string;
  /**
   * The maximum number of deployments to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDeployments that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#nodesNodesDevicesList.
 */
export interface NodesNodesDevicesListOptions {
  /**
   * The filter expression. The filter should have one of the following
   * formats: "sn=123454" or "display_name=MyDevice". sn corresponds to serial
   * number of the device. The filter is case insensitive.
   */
  filter?: string;
  /**
   * The maximum number of devices to return in the response. If empty or zero,
   * all devices will be listed. Must be in the range [0, 1000].
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListDevices that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#nodesNodesList.
 */
export interface NodesNodesListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no nodes are filtered.
   */
  filter?: string;
  /**
   * The maximum number of nodes to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListNodes that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#nodesNodesNodesList.
 */
export interface NodesNodesNodesListOptions {
  /**
   * The filter expression. The filter should have the following format:
   * "DIRECT_CHILDREN" or format: "direct_children". The filter is case
   * insensitive. If empty, then no nodes are filtered.
   */
  filter?: string;
  /**
   * The maximum number of nodes to return in the response.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to ListNodes that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for prod_tt_SASPortal#nodesNodesPatch.
 */
export interface NodesNodesPatchOptions {
  /**
   * Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeNodesNodesPatchOptions(data: any): NodesNodesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeNodesNodesPatchOptions(data: any): NodesNodesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Associates `members` with a `role`.
 */
export interface SasPortalAssignment {
  /**
   * The identities the role is assigned to. It can have the following values:
   * * `{user_email}`: An email address that represents a specific Google
   * account. For example: `alice@gmail.com`. * `{group_email}`: An email
   * address that represents a Google group. For example, `viewers@gmail.com`.
   */
  members?: string[];
  /**
   * Required. Role that is assigned to `members`.
   */
  role?: string;
}

/**
 * The channel with score.
 */
export interface SasPortalChannelWithScore {
  /**
   * The frequency range of the channel.
   */
  frequencyRange?: SasPortalFrequencyRange;
  /**
   * The channel score, normalized to be in the range [0,100].
   */
  score?: number;
}

/**
 * Request for CreateSignedDevice.
 */
export interface SasPortalCreateSignedDeviceRequest {
  /**
   * Required. JSON Web Token signed using a CPI private key. Payload must be
   * the JSON encoding of the device. The user_id field must be set.
   */
  encodedDevice?: Uint8Array;
  /**
   * Required. Unique installer id (CPI ID) from the Certified Professional
   * Installers database.
   */
  installerId?: string;
}

function serializeSasPortalCreateSignedDeviceRequest(data: any): SasPortalCreateSignedDeviceRequest {
  return {
    ...data,
    encodedDevice: data["encodedDevice"] !== undefined ? encodeBase64(data["encodedDevice"]) : undefined,
  };
}

function deserializeSasPortalCreateSignedDeviceRequest(data: any): SasPortalCreateSignedDeviceRequest {
  return {
    ...data,
    encodedDevice: data["encodedDevice"] !== undefined ? decodeBase64(data["encodedDevice"] as string) : undefined,
  };
}

/**
 * Entity representing a SAS customer.
 */
export interface SasPortalCustomer {
  /**
   * Required. Name of the organization that the customer entity represents.
   */
  displayName?: string;
  /**
   * Output only. Resource name of the customer.
   */
  name?: string;
  /**
   * User IDs used by the devices belonging to this customer.
   */
  sasUserIds?: string[];
}

/**
 * The Deployment.
 */
export interface SasPortalDeployment {
  /**
   * The deployment's display name.
   */
  displayName?: string;
  /**
   * Output only. The FCC Registration Numbers (FRNs) copied from its direct
   * parent.
   */
  readonly frns?: string[];
  /**
   * Output only. Resource name.
   */
  readonly name?: string;
  /**
   * User ID used by the devices belonging to this deployment. Each deployment
   * should be associated with one unique user ID.
   */
  sasUserIds?: string[];
}

export interface SasPortalDevice {
  /**
   * Output only. Current configuration of the device as registered to the SAS.
   */
  activeConfig?: SasPortalDeviceConfig;
  /**
   * Output only. Current channels with scores.
   */
  readonly currentChannels?: SasPortalChannelWithScore[];
  /**
   * Device parameters that can be overridden by both SAS Portal and SAS
   * registration requests.
   */
  deviceMetadata?: SasPortalDeviceMetadata;
  /**
   * Device display name.
   */
  displayName?: string;
  /**
   * The FCC identifier of the device.
   */
  fccId?: string;
  /**
   * Only ranges that are within the allowlists are available for new grants.
   */
  grantRangeAllowlists?: SasPortalFrequencyRange[];
  /**
   * Output only. Grants held by the device.
   */
  grants?: SasPortalDeviceGrant[];
  /**
   * Output only. The resource path name.
   */
  name?: string;
  /**
   * Configuration of the device, as specified via SAS Portal API.
   */
  preloadedConfig?: SasPortalDeviceConfig;
  /**
   * A serial number assigned to the device by the device manufacturer.
   */
  serialNumber?: string;
  /**
   * Output only. Device state.
   */
  state?:  | "DEVICE_STATE_UNSPECIFIED" | "RESERVED" | "REGISTERED" | "DEREGISTERED";
}

function serializeSasPortalDevice(data: any): SasPortalDevice {
  return {
    ...data,
    activeConfig: data["activeConfig"] !== undefined ? serializeSasPortalDeviceConfig(data["activeConfig"]) : undefined,
    grants: data["grants"] !== undefined ? data["grants"].map((item: any) => (serializeSasPortalDeviceGrant(item))) : undefined,
    preloadedConfig: data["preloadedConfig"] !== undefined ? serializeSasPortalDeviceConfig(data["preloadedConfig"]) : undefined,
  };
}

function deserializeSasPortalDevice(data: any): SasPortalDevice {
  return {
    ...data,
    activeConfig: data["activeConfig"] !== undefined ? deserializeSasPortalDeviceConfig(data["activeConfig"]) : undefined,
    grants: data["grants"] !== undefined ? data["grants"].map((item: any) => (deserializeSasPortalDeviceGrant(item))) : undefined,
    preloadedConfig: data["preloadedConfig"] !== undefined ? deserializeSasPortalDeviceConfig(data["preloadedConfig"]) : undefined,
  };
}

/**
 * Information about the device's air interface.
 */
export interface SasPortalDeviceAirInterface {
  /**
   * Conditional. This field specifies the radio access technology that is used
   * for the CBSD.
   */
  radioTechnology?:  | "RADIO_TECHNOLOGY_UNSPECIFIED" | "E_UTRA" | "CAMBIUM_NETWORKS" | "FOUR_G_BBW_SAA_1" | "NR" | "DOODLE_CBRS" | "CW" | "REDLINE" | "TARANA_WIRELESS";
  /**
   * Optional. This field is related to the `radioTechnology` and provides the
   * air interface specification that the CBSD is compliant with at the time of
   * registration.
   */
  supportedSpec?: string;
}

/**
 * Information about the device configuration.
 */
export interface SasPortalDeviceConfig {
  /**
   * Information about this device's air interface.
   */
  airInterface?: SasPortalDeviceAirInterface;
  /**
   * The call sign of the device operator.
   */
  callSign?: string;
  /**
   * FCC category of the device.
   */
  category?:  | "DEVICE_CATEGORY_UNSPECIFIED" | "DEVICE_CATEGORY_A" | "DEVICE_CATEGORY_B";
  /**
   * Installation parameters for the device.
   */
  installationParams?: SasPortalInstallationParams;
  /**
   * Output only. Whether the configuration has been signed by a CPI.
   */
  isSigned?: boolean;
  /**
   * Measurement reporting capabilities of the device.
   */
  measurementCapabilities?:  | "MEASUREMENT_CAPABILITY_UNSPECIFIED" | "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITH_GRANT" | "MEASUREMENT_CAPABILITY_RECEIVED_POWER_WITHOUT_GRANT"[];
  /**
   * Information about this device model.
   */
  model?: SasPortalDeviceModel;
  /**
   * State of the configuration.
   */
  state?:  | "DEVICE_CONFIG_STATE_UNSPECIFIED" | "DRAFT" | "FINAL";
  /**
   * Output only. The last time the device configuration was edited.
   */
  updateTime?: Date;
  /**
   * The identifier of a device user.
   */
  userId?: string;
}

function serializeSasPortalDeviceConfig(data: any): SasPortalDeviceConfig {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeSasPortalDeviceConfig(data: any): SasPortalDeviceConfig {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Device grant. It is an authorization provided by the Spectrum Access System
 * to a device to transmit using specified operating parameters after a
 * successful heartbeat by the device.
 */
export interface SasPortalDeviceGrant {
  /**
   * Type of channel used.
   */
  channelType?:  | "CHANNEL_TYPE_UNSPECIFIED" | "CHANNEL_TYPE_GAA" | "CHANNEL_TYPE_PAL";
  /**
   * The expiration time of the grant.
   */
  expireTime?: Date;
  /**
   * The transmission frequency range.
   */
  frequencyRange?: SasPortalFrequencyRange;
  /**
   * Grant Id.
   */
  grantId?: string;
  /**
   * The transmit expiration time of the last heartbeat.
   */
  lastHeartbeatTransmitExpireTime?: Date;
  /**
   * Maximum Equivalent Isotropically Radiated Power (EIRP) permitted by the
   * grant. The maximum EIRP is in units of dBm/MHz. The value of `maxEirp`
   * represents the average (RMS) EIRP that would be measured by the procedure
   * defined in FCC part 96.41(e)(3).
   */
  maxEirp?: number;
  /**
   * The DPA move lists on which this grant appears.
   */
  moveList?: SasPortalDpaMoveList[];
  /**
   * State of the grant.
   */
  state?:  | "GRANT_STATE_UNSPECIFIED" | "GRANT_STATE_GRANTED" | "GRANT_STATE_TERMINATED" | "GRANT_STATE_SUSPENDED" | "GRANT_STATE_AUTHORIZED" | "GRANT_STATE_EXPIRED";
  /**
   * If the grant is suspended, the reason(s) for suspension.
   */
  suspensionReason?: string[];
}

function serializeSasPortalDeviceGrant(data: any): SasPortalDeviceGrant {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    lastHeartbeatTransmitExpireTime: data["lastHeartbeatTransmitExpireTime"] !== undefined ? data["lastHeartbeatTransmitExpireTime"].toISOString() : undefined,
  };
}

function deserializeSasPortalDeviceGrant(data: any): SasPortalDeviceGrant {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    lastHeartbeatTransmitExpireTime: data["lastHeartbeatTransmitExpireTime"] !== undefined ? new Date(data["lastHeartbeatTransmitExpireTime"]) : undefined,
  };
}

/**
 * Device data overridable by both SAS Portal and registration requests.
 */
export interface SasPortalDeviceMetadata {
  /**
   * If populated, the Antenna Model Pattern to use. Format is:
   * `RecordCreatorId:PatternId`
   */
  antennaModel?: string;
  /**
   * Common Channel Group (CCG). A group of CBSDs in the same ICG requesting a
   * common primary channel assignment. For more details, see [CBRSA-TS-2001
   * V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf).
   */
  commonChannelGroup?: string;
  /**
   * Interference Coordination Group (ICG). A group of CBSDs that manage their
   * own interference with the group. For more details, see [CBRSA-TS-2001
   * V3.0.0](https://ongoalliance.org/wp-content/uploads/2020/02/CBRSA-TS-2001-V3.0.0_Approved-for-publication.pdf).
   */
  interferenceCoordinationGroup?: string;
  /**
   * Output only. Set to `true` if a CPI has validated that they have
   * coordinated with the National Quiet Zone office.
   */
  readonly nrqzValidated?: boolean;
  /**
   * Output only. National Radio Quiet Zone validation info.
   */
  readonly nrqzValidation?: SasPortalNrqzValidation;
}

/**
 * Information about the model of the device.
 */
export interface SasPortalDeviceModel {
  /**
   * The firmware version of the device.
   */
  firmwareVersion?: string;
  /**
   * The hardware version of the device.
   */
  hardwareVersion?: string;
  /**
   * The name of the device model.
   */
  name?: string;
  /**
   * The software version of the device.
   */
  softwareVersion?: string;
  /**
   * The name of the device vendor.
   */
  vendor?: string;
}

/**
 * An entry in a DPA's move list.
 */
export interface SasPortalDpaMoveList {
  /**
   * The ID of the DPA.
   */
  dpaId?: string;
  /**
   * The frequency range that the move list affects.
   */
  frequencyRange?: SasPortalFrequencyRange;
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface SasPortalEmpty {
}

/**
 * Frequency range from `low_frequency` to `high_frequency`.
 */
export interface SasPortalFrequencyRange {
  /**
   * The highest frequency of the frequency range in MHz.
   */
  highFrequencyMhz?: number;
  /**
   * The lowest frequency of the frequency range in MHz.
   */
  lowFrequencyMhz?: number;
}

/**
 * Request for GenerateSecret.
 */
export interface SasPortalGenerateSecretRequest {
}

/**
 * Response for GenerateSecret.
 */
export interface SasPortalGenerateSecretResponse {
  /**
   * The secret generated by the string and used by ValidateInstaller.
   */
  secret?: string;
}

/**
 * Request message for `GetPolicy` method.
 */
export interface SasPortalGetPolicyRequest {
  /**
   * Required. The resource for which the policy is being requested.
   */
  resource?: string;
}

/**
 * Information about the device installation parameters.
 */
export interface SasPortalInstallationParams {
  /**
   * Boresight direction of the horizontal plane of the antenna in degrees with
   * respect to true north. The value of this parameter is an integer with a
   * value between 0 and 359 inclusive. A value of 0 degrees means true north; a
   * value of 90 degrees means east. This parameter is optional for Category A
   * devices and conditional for Category B devices.
   */
  antennaAzimuth?: number;
  /**
   * 3-dB antenna beamwidth of the antenna in the horizontal-plane in degrees.
   * This parameter is an unsigned integer having a value between 0 and 360
   * (degrees) inclusive; it is optional for Category A devices and conditional
   * for Category B devices.
   */
  antennaBeamwidth?: number;
  /**
   * Antenna downtilt in degrees and is an integer with a value between -90 and
   * +90 inclusive; a negative value means the antenna is tilted up (above
   * horizontal). This parameter is optional for Category A devices and
   * conditional for Category B devices.
   */
  antennaDowntilt?: number;
  /**
   * Peak antenna gain in dBi. This parameter is an integer with a value
   * between -127 and +128 (dBi) inclusive.
   */
  antennaGain?: number;
  /**
   * As above, but as a DoubleValue.
   */
  antennaGainNewField?: number;
  /**
   * If an external antenna is used, the antenna model is optionally provided
   * in this field. The string has a maximum length of 128 octets.
   */
  antennaModel?: string;
  /**
   * If present, this parameter specifies whether the CBSD is a CPE-CBSD or
   * not.
   */
  cpeCbsdIndication?: boolean;
  /**
   * This parameter is the maximum device EIRP in units of dBm/10MHz and is an
   * integer with a value between -127 and +47 (dBm/10 MHz) inclusive. If not
   * included, SAS interprets it as maximum allowable EIRP in units of dBm/10MHz
   * for device category.
   */
  eirpCapability?: number;
  /**
   * As above, but as a DoubleValue.
   */
  eirpCapabilityNewField?: number;
  /**
   * Device antenna height in meters. When the `heightType` parameter value is
   * "AGL", the antenna height should be given relative to ground level. When
   * the `heightType` parameter value is "AMSL", it is given with respect to
   * WGS84 datum.
   */
  height?: number;
  /**
   * Specifies how the height is measured.
   */
  heightType?:  | "HEIGHT_TYPE_UNSPECIFIED" | "HEIGHT_TYPE_AGL" | "HEIGHT_TYPE_AMSL";
  /**
   * A positive number in meters to indicate accuracy of the device antenna
   * horizontal location. This optional parameter should only be present if its
   * value is less than the FCC requirement of 50 meters.
   */
  horizontalAccuracy?: number;
  /**
   * Whether the device antenna is indoor or not. `true`: indoor. `false`:
   * outdoor.
   */
  indoorDeployment?: boolean;
  /**
   * Latitude of the device antenna location in degrees relative to the WGS 84
   * datum. The allowed range is from -90.000000 to +90.000000. Positive values
   * represent latitudes north of the equator; negative values south of the
   * equator.
   */
  latitude?: number;
  /**
   * Longitude of the device antenna location in degrees relative to the WGS 84
   * datum. The allowed range is from -180.000000 to +180.000000. Positive
   * values represent longitudes east of the prime meridian; negative values
   * west of the prime meridian.
   */
  longitude?: number;
  /**
   * A positive number in meters to indicate accuracy of the device antenna
   * vertical location. This optional parameter should only be present if its
   * value is less than the FCC requirement of 3 meters.
   */
  verticalAccuracy?: number;
}

/**
 * Response for `ListCustomers`.
 */
export interface SasPortalListCustomersResponse {
  /**
   * The list of customers that match the request.
   */
  customers?: SasPortalCustomer[];
  /**
   * A pagination token returned from a previous call to ListCustomers that
   * indicates from where listing should continue. If the field is missing or
   * empty, it means there are no more customers.
   */
  nextPageToken?: string;
}

/**
 * Response for ListDeployments.
 */
export interface SasPortalListDeploymentsResponse {
  /**
   * The deployments that match the request.
   */
  deployments?: SasPortalDeployment[];
  /**
   * A pagination token returned from a previous call to ListDeployments that
   * indicates from where listing should continue. If the field is missing or
   * empty, it means there are no more deployments.
   */
  nextPageToken?: string;
}

/**
 * Response for ListDevices.
 */
export interface SasPortalListDevicesResponse {
  /**
   * The devices that match the request.
   */
  devices?: SasPortalDevice[];
  /**
   * A pagination token returned from a previous call to ListDevices that
   * indicates from where listing should continue. If the field is missing or
   * empty, it means there is no more devices.
   */
  nextPageToken?: string;
}

function serializeSasPortalListDevicesResponse(data: any): SasPortalListDevicesResponse {
  return {
    ...data,
    devices: data["devices"] !== undefined ? data["devices"].map((item: any) => (serializeSasPortalDevice(item))) : undefined,
  };
}

function deserializeSasPortalListDevicesResponse(data: any): SasPortalListDevicesResponse {
  return {
    ...data,
    devices: data["devices"] !== undefined ? data["devices"].map((item: any) => (deserializeSasPortalDevice(item))) : undefined,
  };
}

/**
 * Response for ListNodes.
 */
export interface SasPortalListNodesResponse {
  /**
   * A pagination token returned from a previous call to ListNodes that
   * indicates from where listing should continue. If the field is missing or
   * empty, it means there is no more nodes.
   */
  nextPageToken?: string;
  /**
   * The nodes that match the request.
   */
  nodes?: SasPortalNode[];
}

/**
 * Request for MoveDeployment.
 */
export interface SasPortalMoveDeploymentRequest {
  /**
   * Required. The name of the new parent resource node or customer to reparent
   * the deployment under.
   */
  destination?: string;
}

/**
 * Request for MoveDevice.
 */
export interface SasPortalMoveDeviceRequest {
  /**
   * Required. The name of the new parent resource node or customer to reparent
   * the device under.
   */
  destination?: string;
}

/**
 * Request for MoveNode.
 */
export interface SasPortalMoveNodeRequest {
  /**
   * Required. The name of the new parent resource node or customer to reparent
   * the node under.
   */
  destination?: string;
}

/**
 * The Node.
 */
export interface SasPortalNode {
  /**
   * The node's display name.
   */
  displayName?: string;
  /**
   * Output only. Resource name.
   */
  name?: string;
  /**
   * User ids used by the devices belonging to this node.
   */
  sasUserIds?: string[];
}

/**
 * Information about National Radio Quiet Zone validation.
 */
export interface SasPortalNrqzValidation {
  /**
   * Validation case ID.
   */
  caseId?: string;
  /**
   * CPI who signed the validation.
   */
  cpiId?: string;
  /**
   * Device latitude that's associated with the validation.
   */
  latitude?: number;
  /**
   * Device longitude that's associated with the validation.
   */
  longitude?: number;
  /**
   * State of the NRQZ validation info.
   */
  state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "FINAL";
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface SasPortalOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: SasPortalStatus;
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
 * Defines an access control policy to the resources.
 */
export interface SasPortalPolicy {
  /**
   * List of assignments
   */
  assignments?: SasPortalAssignment[];
  /**
   * The etag is used for optimistic concurrency control as a way to help
   * prevent simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the etag in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An etag is returned in the response to GetPolicy, and systems
   * are expected to put that etag in the request to SetPolicy to ensure that
   * their change will be applied to the same version of the policy. If no etag
   * is provided in the call to GetPolicy, then the existing policy is
   * overwritten blindly.
   */
  etag?: Uint8Array;
}

function serializeSasPortalPolicy(data: any): SasPortalPolicy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeSasPortalPolicy(data: any): SasPortalPolicy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Request for [ProvisionDeployment].
 * [spectrum.sas.portal.v1alpha1.Provisioning.ProvisionDeployment]. GCP Project,
 * Organization Info, and caller’s GAIA ID should be retrieved from the RPC
 * handler, and used as inputs to create a new SAS organization (if not exists)
 * and a new SAS deployment.
 */
export interface SasPortalProvisionDeploymentRequest {
  /**
   * Optional. If this field is set, and a new SAS Portal Deployment needs to
   * be created, its display name will be set to the value of this field.
   */
  newDeploymentDisplayName?: string;
  /**
   * Optional. If this field is set, and a new SAS Portal Organization needs to
   * be created, its display name will be set to the value of this field.
   */
  newOrganizationDisplayName?: string;
}

/**
 * Response for [ProvisionDeployment].
 * [spectrum.sas.portal.v1alpha1.Provisioning.ProvisionDeployment].
 */
export interface SasPortalProvisionDeploymentResponse {
  /**
   * Optional. Optional error message if the provisioning request is not
   * successful.
   */
  errorMessage?: string;
}

/**
 * Request message for `SetPolicy` method.
 */
export interface SasPortalSetPolicyRequest {
  /**
   * Optional. Set the field as `true` to disable the onboarding notification.
   */
  disableNotification?: boolean;
  /**
   * Required. The policy to be applied to the `resource`.
   */
  policy?: SasPortalPolicy;
  /**
   * Required. The resource for which the policy is being specified. This
   * policy replaces any existing policy.
   */
  resource?: string;
}

function serializeSasPortalSetPolicyRequest(data: any): SasPortalSetPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeSasPortalPolicy(data["policy"]) : undefined,
  };
}

function deserializeSasPortalSetPolicyRequest(data: any): SasPortalSetPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeSasPortalPolicy(data["policy"]) : undefined,
  };
}

/**
 * Request for SignDevice.
 */
export interface SasPortalSignDeviceRequest {
  /**
   * Required. The device to sign. The device fields name, fcc_id and
   * serial_number must be set. The user_id field must be set.
   */
  device?: SasPortalDevice;
}

function serializeSasPortalSignDeviceRequest(data: any): SasPortalSignDeviceRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? serializeSasPortalDevice(data["device"]) : undefined,
  };
}

function deserializeSasPortalSignDeviceRequest(data: any): SasPortalSignDeviceRequest {
  return {
    ...data,
    device: data["device"] !== undefined ? deserializeSasPortalDevice(data["device"]) : undefined,
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
export interface SasPortalStatus {
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
 * Request message for `TestPermissions` method.
 */
export interface SasPortalTestPermissionsRequest {
  /**
   * The set of permissions to check for the `resource`.
   */
  permissions?: string[];
  /**
   * Required. The resource for which the permissions are being requested.
   */
  resource?: string;
}

/**
 * Response message for `TestPermissions` method.
 */
export interface SasPortalTestPermissionsResponse {
  /**
   * A set of permissions that the caller is allowed.
   */
  permissions?: string[];
}

/**
 * Request for UpdateSignedDevice.
 */
export interface SasPortalUpdateSignedDeviceRequest {
  /**
   * Required. The JSON Web Token signed using a CPI private key. Payload must
   * be the JSON encoding of the device. The user_id field must be set.
   */
  encodedDevice?: Uint8Array;
  /**
   * Required. Unique installer ID (CPI ID) from the Certified Professional
   * Installers database.
   */
  installerId?: string;
}

function serializeSasPortalUpdateSignedDeviceRequest(data: any): SasPortalUpdateSignedDeviceRequest {
  return {
    ...data,
    encodedDevice: data["encodedDevice"] !== undefined ? encodeBase64(data["encodedDevice"]) : undefined,
  };
}

function deserializeSasPortalUpdateSignedDeviceRequest(data: any): SasPortalUpdateSignedDeviceRequest {
  return {
    ...data,
    encodedDevice: data["encodedDevice"] !== undefined ? decodeBase64(data["encodedDevice"] as string) : undefined,
  };
}

/**
 * Request for ValidateInstaller.
 */
export interface SasPortalValidateInstallerRequest {
  /**
   * Required. JSON Web Token signed using a CPI private key. Payload must
   * include a "secret" claim whose value is the secret.
   */
  encodedSecret?: string;
  /**
   * Required. Unique installer id (CPI ID) from the Certified Professional
   * Installers database.
   */
  installerId?: string;
  /**
   * Required. Secret returned by the GenerateSecret.
   */
  secret?: string;
}

/**
 * Response for ValidateInstaller.
 */
export interface SasPortalValidateInstallerResponse {
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
