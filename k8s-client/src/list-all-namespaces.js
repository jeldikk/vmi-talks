const k8s = require("@kubernetes/client-node");
const fs = require("fs/promises");
const path = require("path");

// import * as k8s from "@kubernetes/client-node";

const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();
console.log({ defaultConfig: kubeConfig });

const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);

async function main() {
  const namespaceList = [];
  try {
    const res = await k8sApi.listNamespace();

    console.log({ res });
    res.items.forEach((namespace) => {
      namespaceList.push(JSON.parse(JSON.stringify(namespace)));
    });
    // console.log(namespaceList);
    await fs.writeFile(
      path.resolve(__dirname, "./namespacelist.json"),
      JSON.stringify(namespaceList)
    );
    console.log("Written data to file");
  } catch (err) {
    console.error(err);
  }
}

main();
