import { Discovery, RestDescription } from "./discovery:v1.gen.ts";
import { primaryName, generate } from "./generator.ts";
import { assert } from "./deps.ts";
import { request } from "../base/mod.ts";

const discovery = new Discovery();
const list = await discovery.apisList({ preferred: true });

export function indexHtml(origin: string): string {
    // const origin = new URL(req.url).origin;
    const html = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Google APIs for Deno</title>
        </head>
        <body>
            <h1>Google APIs for Deno</h1>
            <p>
            This service provides auto-generated Google API clients for Deno.
            </p>
            <h2>Example</h2>
            <pre><code>// Import the client
        import { ServiceAccount, Spanner } from "${origin}/v1/spanner:v1.ts";

        // Read the service account key.
        const file = Deno.readTextFileSync("service-account.json");
        const auth = ServiceAccount.fromJson(JSON.parse(file));

        // Instantiate the client.
        const spanner = new Spanner(auth);

        // List Spanner instances.
        const instances = await spanner.listInstances("projects/my-project");
        console.log(instances);
            </code></pre>
            <h2>Services</h2>
            <table>
            <thead>
                <tr>
                <th>Service</th>
                <th>Usage</th>
                <th>Docs</th>
                </tr>
            </thead>
            <tbody>
        ${
            list.items!.map((service) => {
                const url = `${origin}/raw/latest/build/${service.version}/${service.name}.ts`;
                assert(service.name);
                assert(service.title);
                const name = primaryName(service.name!, service.title?.split(" "));
                return `
                    <tr>
                    <td><a href="${url}">${service.title}</a></td>
                    <td><pre>import { ${name} } from "${url}";</pre></td>
                    <td><a href="https://doc.deno.land/${url}">Docs</a></td>
                    </tr>`;
            }).join("\n")
        }
        </body>
    </html>`;

    return html;
}

export interface CodeModule {
    dir: string
    filename: string
    source: string
}

interface DiscoveryResponse {
    restDescription: RestDescription | undefined
    error: Error | undefined
}

export async function apiModules(origin: string): Promise<CodeModule[]> {
    assert(list.items);
    const restDescriptions = await Promise.all(list.items!.map<Promise<DiscoveryResponse>>((item) => {
        return request(item?.discoveryRestUrl!, {
            client: undefined,
            method: "GET",
        }).then((restDescription) => {
            return {
                restDescription,
                error: undefined,
            }
        }).catch((reason) => {
            console.log(reason)
            return {
                restDescription: undefined,
                error: Error(reason)
            }
        })
    }))
    const modules: CodeModule[] = []
    restDescriptions.forEach((response) => {
        const service = response.restDescription
        if (service) {
            try {
                const dir = service.version!;
                const filename = `${service.name}.ts`;
                const source = generate(service, origin);
                modules.push({
                    dir,
                    filename,
                    source
                });
            } catch (e) {
                console.error(`Failed to generate ${service.version} ${service.name}: ${e}`)
            }
        }
    })
    return modules;
  }