import * as fsExtra from "fs-extra";
import * as path from "node:path";

// Detect controllers dynamically
export async function initControllersAndGateways({ dir }: { dir: string }) {
  const files = await fsExtra.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fsExtra.stat(filePath);
    if (stat.isDirectory()) {
      initControllersAndGateways({ dir: filePath });
    } else {
      const isController = isPathTheComponent(filePath, "controller");
      const isSocketGateway = isPathTheComponent(filePath, "gateway");

      if (isController) console.log({ controller: filePath });

      if (isSocketGateway) console.log({ gateway: filePath });

      if (isController || isSocketGateway) await import(filePath);
    }
  }
}

function isPathTheComponent(path: string, component: string) {
  const pathSplitted = path.split(".");

  if (pathSplitted[pathSplitted.length - 2] === component) return true;

  return false;
}
