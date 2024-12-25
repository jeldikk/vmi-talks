// const k8s = require("@kubernetes/client-node");

import * as k8s from "@kubernetes/client-node";

const k8sConfig = new k8s.KubeConfig();
k8sConfig.loadFromDefault();

const k8sApi = k8sConfig.makeApiClient(k8s.CoreV1Api);

const namespace = {
  body: {
    metadata: {
      name: "test-kamal",
    },
  },
};

const main = async () => {
  try {
    const createNamespaceRes = await k8sApi.createNamespace(namespace);
    console.log("New namespace created :", createNamespaceRes.metadata.name);

    const readNamespaceRes = await k8sApi.readNamespace(
      namespace.body.metadata
    );
    console.log("Namespace :", readNamespaceRes.body);

    // await k8sApi.deleteName
  } catch (err) {
    console.error(err);
  }
};

main();
