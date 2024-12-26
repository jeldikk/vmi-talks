// const k8s = require("@kubernetes/client-node");
// const fs = require("fs/promises");
// const path = require("path");

import * as k8s from "@kubernetes/client-node";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const dirname = path.dirname(filePath);

const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();
//kubeConfig.setCurrentContext("); // you can set the context after loading from default

// console.log({ defaultConfig: kubeConfig });
const contexts = kubeConfig.getContexts();
console.log("Contexts Found :");
console.log(JSON.stringify(contexts, null, 2));
console.log("======================================");
console.log(
  "The current context we are looking at :",
  kubeConfig.getCurrentContext()
);

const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);

async function main() {
  const namespaceList = [];
  try {
    const res = await k8sApi.listNamespace();

    res.items.forEach((namespace) => {
      namespaceList.push(JSON.parse(JSON.stringify(namespace)));
    });
    // console.log(namespaceList);
    await fs.writeFile(
      path.resolve(dirname, "./namespacelist.json"),
      JSON.stringify(namespaceList, null, 2)
    );
    console.log("Written data to file");
  } catch (err) {
    console.error(err);
  }
}

main();
