// const k8s = require("@kubernetes/client-node");
import * as k8s from "@kubernetes/client-node";

const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();
console.log({ defaultConfig: kubeConfig });

const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);

async function main() {
  try {
    const res = await k8sApi.listNamespace();
    console.log({ res });
  } catch (err) {
    console.error(err);
  }
}

main();
