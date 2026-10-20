# Kubernetes

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

57 questions · 0 favorites · [📚 Resources](#resources)

## Contents

**Basic**

- [1. What is Kubernetes and what problems does it solve?](#1-what-is-kubernetes-and-what-problems-does-it-solve)
- [2. What is the architecture of a Kubernetes cluster?](#2-what-is-the-architecture-of-a-kubernetes-cluster)
- [3. What is the declarative model and the reconciliation loop?](#3-what-is-the-declarative-model-and-the-reconciliation-loop)
- [4. What is a Pod and why is it the smallest unit?](#4-what-is-a-pod-and-why-is-it-the-smallest-unit)
- [5. What is the difference between a Deployment and a ReplicaSet?](#5-what-is-the-difference-between-a-deployment-and-a-replicaset)
- [6. What are Kubernetes Services and what are ClusterIP, NodePort and LoadBalancer?](#6-what-are-kubernetes-services-and-what-are-clusterip-nodeport-and-loadbalancer)
- [7. What are Namespaces and when should you use them?](#7-what-are-namespaces-and-when-should-you-use-them)
- [8. How do labels, selectors and annotations work?](#8-how-do-labels-selectors-and-annotations-work)
- [9. What is the difference between a ConfigMap and a Secret?](#9-what-is-the-difference-between-a-configmap-and-a-secret)
- [10. What are Volumes, PersistentVolumes, PersistentVolumeClaims and StorageClasses?](#10-what-are-volumes-persistentvolumes-persistentvolumeclaims-and-storageclasses)
- [11. What is the anatomy of a Kubernetes manifest, and which kubectl commands should you know?](#11-what-is-the-anatomy-of-a-kubernetes-manifest-and-which-kubectl-commands-should-you-know)
- [12. What are liveness, readiness and startup probes?](#12-what-are-liveness-readiness-and-startup-probes)
- [13. What are resource requests and limits?](#13-what-are-resource-requests-and-limits)
- [14. What is an Ingress and how does it differ from a Service?](#14-what-is-an-ingress-and-how-does-it-differ-from-a-service)
- [15. How is Kubernetes different from Docker, and how do images and registries fit in?](#15-how-is-kubernetes-different-from-docker-and-how-do-images-and-registries-fit-in)

**Intermediate**

- [16. \[Tech Lead\] What is your troubleshooting runbook for Pending, CrashLoopBackOff, ImagePullBackOff, OOMKilled, Evicted pods and 5xx errors through a Service?](#16-tech-lead-what-is-your-troubleshooting-runbook-for-pending-crashloopbackoff-imagepullbackoff-oomkilled-evicted-pods-and-5xx-errors-through-a-service)
- [17. \[Tech Lead\] How do you achieve zero-downtime deployments and graceful shutdown?](#17-tech-lead-how-do-you-achieve-zero-downtime-deployments-and-graceful-shutdown)
- [18. \[Tech Lead\] What is your autoscaling strategy, and how do you plan capacity?](#18-tech-lead-what-is-your-autoscaling-strategy-and-how-do-you-plan-capacity)
- [19. \[Tech Lead\] How do CPU throttling and right-sizing affect performance?](#19-tech-lead-how-do-cpu-throttling-and-right-sizing-affect-performance)
- [20. \[Tech Lead\] How do you optimise the cost of a Kubernetes cluster?](#20-tech-lead-how-do-you-optimise-the-cost-of-a-kubernetes-cluster)
- [21. \[Tech Lead\] How do you monitor Kubernetes with Datadog or Prometheus, and which alerts do you set?](#21-tech-lead-how-do-you-monitor-kubernetes-with-datadog-or-prometheus-and-which-alerts-do-you-set)
- [22. \[Tech Lead\] How do GitOps and GitLab CI/CD deploy to Kubernetes, and how do you promote between environments?](#22-tech-lead-how-do-gitops-and-gitlab-cicd-deploy-to-kubernetes-and-how-do-you-promote-between-environments)
- [23. \[Tech Lead\] How do you plan Kubernetes cluster upgrades and handle API deprecations?](#23-tech-lead-how-do-you-plan-kubernetes-cluster-upgrades-and-handle-api-deprecations)
- [24. \[Tech Lead\] Helm or Kustomize: which do you use in practice and why?](#24-tech-lead-helm-or-kustomize-which-do-you-use-in-practice-and-why)
- [25. \[Tech Lead\] How do you handle a Kubernetes production incident and run a postmortem?](#25-tech-lead-how-do-you-handle-a-kubernetes-production-incident-and-run-a-postmortem)
- [26. What is a StatefulSet and when do you use it instead of a Deployment?](#26-what-is-a-statefulset-and-when-do-you-use-it-instead-of-a-deployment)
- [27. What is a DaemonSet and what is it used for?](#27-what-is-a-daemonset-and-what-is-it-used-for)
- [28. How do Jobs and CronJobs work?](#28-how-do-jobs-and-cronjobs-work)
- [29. What are init containers and sidecars, and what are native sidecar containers?](#29-what-are-init-containers-and-sidecars-and-what-are-native-sidecar-containers)
- [30. How do rolling updates, rollbacks, canary and blue-green releases work?](#30-how-do-rolling-updates-rollbacks-canary-and-blue-green-releases-work)
- [31. How does Kubernetes scheduling work: nodeSelector, affinity, taints, tolerations and topology spread?](#31-how-does-kubernetes-scheduling-work-nodeselector-affinity-taints-tolerations-and-topology-spread)
- [32. What is a PodDisruptionBudget and why do you need one?](#32-what-is-a-poddisruptionbudget-and-why-do-you-need-one)
- [33. What are Ingress controllers and the Gateway API?](#33-what-are-ingress-controllers-and-the-gateway-api)
- [34. How do NetworkPolicies work?](#34-how-do-networkpolicies-work)
- [35. How does RBAC work in detail?](#35-how-does-rbac-work-in-detail)
- [36. How do Helm charts work: values, templates and hooks?](#36-how-do-helm-charts-work-values-templates-and-hooks)
- [37. How does dynamic storage provisioning work, and what are access modes?](#37-how-does-dynamic-storage-provisioning-work-and-what-are-access-modes)
- [38. How do DNS and service discovery work in Kubernetes?](#38-how-do-dns-and-service-discovery-work-in-kubernetes)
- [39. What are QoS classes, and how does eviction work?](#39-what-are-qos-classes-and-how-does-eviction-work)
- [40. What is the Pod lifecycle and what happens when a Pod is terminated?](#40-what-is-the-pod-lifecycle-and-what-happens-when-a-pod-is-terminated)
- [41. What are ResourceQuota and LimitRange?](#41-what-are-resourcequota-and-limitrange)
- [42. What are admission controllers, and how do OPA Gatekeeper and Kyverno enforce policy?](#42-what-are-admission-controllers-and-how-do-opa-gatekeeper-and-kyverno-enforce-policy)
- [43. What is a service mesh and when do you need one?](#43-what-is-a-service-mesh-and-when-do-you-need-one)

**Advanced**

- [44. \[Tech Lead\] How do you harden a cluster for security?](#44-tech-lead-how-do-you-harden-a-cluster-for-security)
- [45. \[Tech Lead\] How do you lay out multiple environments and multi-tenant workloads: namespaces or separate clusters?](#45-tech-lead-how-do-you-lay-out-multiple-environments-and-multi-tenant-workloads-namespaces-or-separate-clusters)
- [46. \[Tech Lead\] How do you back up Kubernetes and plan disaster recovery?](#46-tech-lead-how-do-you-back-up-kubernetes-and-plan-disaster-recovery)
- [47. \[Tech Lead\] What should you know about running on Azure AKS?](#47-tech-lead-what-should-you-know-about-running-on-azure-aks)
- [48. How does etcd work, and how do you back it up and tune it?](#48-how-does-etcd-work-and-how-do-you-back-it-up-and-tune-it)
- [49. How is the Kubernetes control plane made highly available?](#49-how-is-the-kubernetes-control-plane-made-highly-available)
- [50. How does the Kubernetes scheduler pick a node?](#50-how-does-the-kubernetes-scheduler-pick-a-node)
- [51. What are CRI, CNI and CSI, and how does the kubelet use them?](#51-what-are-cri-cni-and-csi-and-how-does-the-kubelet-use-them)
- [52. How does Kubernetes networking work in depth: kube-proxy, iptables, IPVS and eBPF?](#52-how-does-kubernetes-networking-work-in-depth-kube-proxy-iptables-ipvs-and-ebpf)
- [53. What is the API server request flow, and how do watches work?](#53-what-is-the-api-server-request-flow-and-how-do-watches-work)
- [54. How do controllers, informers and work queues work?](#54-how-do-controllers-informers-and-work-queues-work)
- [55. How do cgroups enforce requests and limits in the Linux kernel?](#55-how-do-cgroups-enforce-requests-and-limits-in-the-linux-kernel)
- [56. What happens end to end when you run `kubectl apply -f deployment.yaml`?](#56-what-happens-end-to-end-when-you-run-kubectl-apply--f-deploymentyaml)
- [57. What are CRDs and operators, and when should you build one?](#57-what-are-crds-and-operators-and-when-should-you-build-one)

## Browse by module

| Module | Questions |
| --- | --- |
| Cloud & AKS (1) | [47](#47-tech-lead-what-should-you-know-about-running-on-azure-aks) |
| Core Concepts (7) | [1](#1-what-is-kubernetes-and-what-problems-does-it-solve) · [2](#2-what-is-the-architecture-of-a-kubernetes-cluster) · [3](#3-what-is-the-declarative-model-and-the-reconciliation-loop) · [7](#7-what-are-namespaces-and-when-should-you-use-them) · [8](#8-how-do-labels-selectors-and-annotations-work) · [11](#11-what-is-the-anatomy-of-a-kubernetes-manifest-and-which-kubectl-commands-should-you-know) · [15](#15-how-is-kubernetes-different-from-docker-and-how-do-images-and-registries-fit-in) |
| Delivery & GitOps (3) | [22](#22-tech-lead-how-do-gitops-and-gitlab-cicd-deploy-to-kubernetes-and-how-do-you-promote-between-environments) · [24](#24-tech-lead-helm-or-kustomize-which-do-you-use-in-practice-and-why) · [36](#36-how-do-helm-charts-work-values-templates-and-hooks) |
| Internals (9) | [48](#48-how-does-etcd-work-and-how-do-you-back-it-up-and-tune-it) · [49](#49-how-is-the-kubernetes-control-plane-made-highly-available) · [50](#50-how-does-the-kubernetes-scheduler-pick-a-node) · [51](#51-what-are-cri-cni-and-csi-and-how-does-the-kubelet-use-them) · [53](#53-what-is-the-api-server-request-flow-and-how-do-watches-work) · [54](#54-how-do-controllers-informers-and-work-queues-work) · [55](#55-how-do-cgroups-enforce-requests-and-limits-in-the-linux-kernel) · [56](#56-what-happens-end-to-end-when-you-run-kubectl-apply--f-deploymentyaml) · [57](#57-what-are-crds-and-operators-and-when-should-you-build-one) |
| Networking (7) | [6](#6-what-are-kubernetes-services-and-what-are-clusterip-nodeport-and-loadbalancer) · [14](#14-what-is-an-ingress-and-how-does-it-differ-from-a-service) · [33](#33-what-are-ingress-controllers-and-the-gateway-api) · [34](#34-how-do-networkpolicies-work) · [38](#38-how-do-dns-and-service-discovery-work-in-kubernetes) · [43](#43-what-is-a-service-mesh-and-when-do-you-need-one) · [52](#52-how-does-kubernetes-networking-work-in-depth-kube-proxy-iptables-ipvs-and-ebpf) |
| Operations & Troubleshooting (7) | [16](#16-tech-lead-what-is-your-troubleshooting-runbook-for-pending-crashloopbackoff-imagepullbackoff-oomkilled-evicted-pods-and-5xx-errors-through-a-service) · [17](#17-tech-lead-how-do-you-achieve-zero-downtime-deployments-and-graceful-shutdown) · [21](#21-tech-lead-how-do-you-monitor-kubernetes-with-datadog-or-prometheus-and-which-alerts-do-you-set) · [23](#23-tech-lead-how-do-you-plan-kubernetes-cluster-upgrades-and-handle-api-deprecations) · [25](#25-tech-lead-how-do-you-handle-a-kubernetes-production-incident-and-run-a-postmortem) · [45](#45-tech-lead-how-do-you-lay-out-multiple-environments-and-multi-tenant-workloads-namespaces-or-separate-clusters) · [46](#46-tech-lead-how-do-you-back-up-kubernetes-and-plan-disaster-recovery) |
| Scheduling & Scaling (8) | [13](#13-what-are-resource-requests-and-limits) · [18](#18-tech-lead-what-is-your-autoscaling-strategy-and-how-do-you-plan-capacity) · [19](#19-tech-lead-how-do-cpu-throttling-and-right-sizing-affect-performance) · [20](#20-tech-lead-how-do-you-optimise-the-cost-of-a-kubernetes-cluster) · [31](#31-how-does-kubernetes-scheduling-work-nodeselector-affinity-taints-tolerations-and-topology-spread) · [32](#32-what-is-a-poddisruptionbudget-and-why-do-you-need-one) · [39](#39-what-are-qos-classes-and-how-does-eviction-work) · [41](#41-what-are-resourcequota-and-limitrange) |
| Security (3) | [35](#35-how-does-rbac-work-in-detail) · [42](#42-what-are-admission-controllers-and-how-do-opa-gatekeeper-and-kyverno-enforce-policy) · [44](#44-tech-lead-how-do-you-harden-a-cluster-for-security) |
| Storage & Config (3) | [9](#9-what-is-the-difference-between-a-configmap-and-a-secret) · [10](#10-what-are-volumes-persistentvolumes-persistentvolumeclaims-and-storageclasses) · [37](#37-how-does-dynamic-storage-provisioning-work-and-what-are-access-modes) |
| Workloads (9) | [4](#4-what-is-a-pod-and-why-is-it-the-smallest-unit) · [5](#5-what-is-the-difference-between-a-deployment-and-a-replicaset) · [12](#12-what-are-liveness-readiness-and-startup-probes) · [26](#26-what-is-a-statefulset-and-when-do-you-use-it-instead-of-a-deployment) · [27](#27-what-is-a-daemonset-and-what-is-it-used-for) · [28](#28-how-do-jobs-and-cronjobs-work) · [29](#29-what-are-init-containers-and-sidecars-and-what-are-native-sidecar-containers) · [30](#30-how-do-rolling-updates-rollbacks-canary-and-blue-green-releases-work) · [40](#40-what-is-the-pod-lifecycle-and-what-happens-when-a-pod-is-terminated) |

## Basic

### 1. What is Kubernetes and what problems does it solve?

**Short answer:** Kubernetes is an open-source system that runs and manages containers across a group of machines. You tell it what you want running, and it keeps that true: it places containers, restarts them when they fail, scales them, and rolls out new versions without downtime.

Think of it as an operations team that never sleeps. Running one container on one server is easy. Running hundreds of containers for dozens of services on many servers is not. Kubernetes handles the hard parts:

- **Scheduling:** it picks which machine (node) has room for each container.
- **Self-healing:** if a container crashes or a node dies, it starts a replacement.
- **Scaling:** it adds or removes copies based on load.
- **Service discovery and load balancing:** services get a stable name and address, even when pods come and go.
- **Rolling updates and rollbacks:** new versions replace old ones step by step.
- **Configuration and secrets:** settings are kept outside the image.
- **Storage:** volumes can follow a workload.

It is not a build tool, a CI system, or a place where your code is compiled. It also does not fix a badly designed application. It gives you a common API (YAML objects) that works the same on Azure AKS, AWS EKS, Google GKE or your own servers.

```yaml
# Smallest useful example: ask for 3 copies of an API and let Kubernetes keep them alive
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      containers:
        - name: orders-api
          image: myregistry.azurecr.io/orders-api:1.4.2
```

**When not to use it:** a single small app, a team with no one to own the platform, or a workload a managed service already runs well (Azure Container Apps, App Service). Kubernetes has a real learning and operations cost.

**Interview tip:** Do not just list features. Say the core idea: you declare the desired state and controllers keep reconciling reality to match it. Then give one example from your own services, such as a pod being replaced after a node failure.

_Module: Core Concepts · Tags: fundamentals, orchestration_

### 2. What is the architecture of a Kubernetes cluster?

**Short answer:** A cluster has a **control plane** that makes decisions and **worker nodes** that run your pods. The control plane holds the API server, etcd, the scheduler and controllers. Each node runs the kubelet, a container runtime and kube-proxy.

**Control plane**
- **kube-apiserver:** the front door. Every tool and component talks to it over REST.
- **etcd:** a consistent key-value store that holds all cluster state.
- **kube-scheduler:** chooses a node for each new pod.
- **kube-controller-manager:** runs the control loops (Deployment, Node, Job controllers and more).
- **cloud-controller-manager:** talks to the cloud for load balancers, disks and nodes.

**On every node**
- **kubelet:** the agent that makes sure the pods assigned to its node are running and healthy.
- **Container runtime:** containerd or CRI-O, which really starts the containers.
- **kube-proxy:** programs network rules so Service addresses reach pods.

```mermaid
flowchart TD
    U["kubectl / CI"] --> API["kube-apiserver"]
    subgraph CP["Control plane"]
        API --> ETCD[("etcd")]
        SCH["Scheduler"] --> API
        CM["Controller manager"] --> API
    end
    subgraph N1["Worker node"]
        K["kubelet"] --> API
        KP["kube-proxy"]
        RT["containerd"]
        P["Pods"]
        K --> RT --> P
    end
```

Read it like this: only the API server touches etcd, and every other component, including the kubelet, talks to the API server.

On managed services such as AKS, Azure runs and patches the control plane for you. You manage the node pools and the workloads.

**Gotcha:** the scheduler does not start pods. It only writes "this pod goes to node X". The kubelet on that node sees the assignment and does the work.

**Interview tip:** Be ready to trace one request: `kubectl apply` goes to the API server, is stored in etcd, a controller creates pods, the scheduler assigns them, and the kubelet starts them.

_Module: Core Concepts · Tags: architecture, control-plane_

### 3. What is the declarative model and the reconciliation loop?

**Short answer:** In Kubernetes you describe the **desired state** (for example "3 replicas of this image") and store it in the API. Controllers run a loop that compares desired state with actual state and acts to close the gap. This loop is called **reconciliation**.

An everyday analogy is a thermostat. You set 21 degrees. The thermostat does not follow a script. It keeps measuring and switches heating on or off until the room matches.

Imperative commands say how: "start a container, then another". Declarative objects say what: "I want three". The second is safer, because running it twice gives the same result, and the file can live in Git.

```mermaid
flowchart LR
    D["Desired state<br/>spec in API"] --> C["Controller"]
    A["Actual state<br/>nodes and pods"] --> C
    C -- "create or delete pods" --> A
```

The controller keeps observing, comparing and acting. It is level-based, not event-based: even if it missed an event, the next loop sees the difference and fixes it.

```bash
# Declarative: same file, run any number of times
kubectl apply -f orders-api.yaml

# Imperative: fine for quick tests, hard to repeat and review
kubectl create deployment orders-api --image=myregistry.azurecr.io/orders-api:1.4.2
kubectl scale deployment orders-api --replicas=5
```

Every object has a **spec** (what you want) and a **status** (what Kubernetes sees). You write the spec. Controllers write the status.

**Gotcha:** if you manually delete a pod that belongs to a Deployment, a new one appears. If you manually edit a live object that Argo CD or Flux owns, it will be changed back. The source of truth is the declared state, not the live cluster.

**Interview tip:** Say "level-triggered, self-healing" and mention that this is why GitOps works so well: Git holds the desired state and a controller reconciles the cluster to it.

_Module: Core Concepts · Tags: declarative, controllers_

### 4. What is a Pod and why is it the smallest unit?

**Short answer:** A Pod is the smallest thing Kubernetes schedules. It wraps one or more containers that share the same network address, ports and volumes, and always run together on the same node.

Most pods have one container. A second container makes sense when it is tightly coupled, such as a log shipper or a proxy next to the main app. Containers in a pod talk to each other on `localhost` and can share files through a volume.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: orders-api
  labels:
    app: orders-api
spec:
  containers:
    - name: api
      image: myregistry.azurecr.io/orders-api:1.4.2
      ports:
        - containerPort: 8080
      resources:
        requests:
          cpu: 100m
          memory: 128Mi
```

Key facts:
- A pod gets **one IP address**. All its containers share it.
- Pods are **ephemeral**. When one dies it is not repaired; a new pod with a new name and IP replaces it.
- A pod is never moved between nodes. It is deleted and recreated elsewhere.
- Pods have a lifecycle: Pending, Running, Succeeded, Failed.

```bash
kubectl get pods -o wide             # shows node and pod IP
kubectl describe pod orders-api      # events and container state
kubectl logs orders-api -c api       # logs of one container
```

**Common mistake:** creating bare pods in production. A bare pod is not recreated if its node fails. Use a Deployment, StatefulSet, DaemonSet or Job, which own pods and replace them.

**Interview tip:** Explain why "one process per container, related containers per pod" is the usual rule, and mention that scaling happens at the pod level, so containers that must scale independently should be in separate pods.

_Module: Workloads · Tags: pods, workloads_

### 5. What is the difference between a Deployment and a ReplicaSet?

**Short answer:** A ReplicaSet keeps a fixed number of identical pods running. A Deployment manages ReplicaSets and adds rolling updates, rollbacks and revision history. You almost always create Deployments and let them create ReplicaSets for you.

The chain is: Deployment owns ReplicaSets, and ReplicaSets own Pods. When you change the pod template (for example a new image), the Deployment creates a **new** ReplicaSet and slowly scales it up while scaling the old one down. The old ReplicaSet stays with zero replicas so you can roll back.

```mermaid
flowchart LR
    D["Deployment orders-api"] --> R1["ReplicaSet v1<br/>0 pods"]
    D --> R2["ReplicaSet v2<br/>3 pods"]
    R2 --> P1["Pod"]
    R2 --> P2["Pod"]
    R2 --> P3["Pod"]
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 3
  revisionHistoryLimit: 5      # how many old ReplicaSets to keep for rollback
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      containers:
        - name: api
          image: myregistry.azurecr.io/orders-api:1.4.3
```

```bash
kubectl rollout status deployment/orders-api
kubectl rollout history deployment/orders-api
kubectl rollout undo deployment/orders-api
```

| Object | Use it for |
| --- | --- |
| Deployment | Stateless apps with updates (APIs, web, workers) |
| ReplicaSet | Rarely directly; it is the engine under a Deployment |
| StatefulSet | Pods that need stable identity and storage |

**Gotcha:** only a change in `spec.template` creates a new rollout. Changing `replicas` does not. The `selector` is immutable after creation, so choose labels carefully.

**Interview tip:** If asked "what happens when you update the image", walk through the new ReplicaSet being scaled up while the old one scales down, controlled by `maxSurge` and `maxUnavailable`.

_Module: Workloads · Tags: deployments, replicasets_

### 6. What are Kubernetes Services and what are ClusterIP, NodePort and LoadBalancer?

**Short answer:** A Service gives a group of pods one stable virtual IP and DNS name, and load balances traffic across the healthy ones. The type decides who can reach it: ClusterIP inside the cluster, NodePort on every node's port, LoadBalancer through a cloud load balancer.

Pod IPs change all the time, so clients should never use them. A Service selects pods by **labels** and tracks only the ready ones.

| Type | Reachable from | Typical use |
| --- | --- | --- |
| `ClusterIP` (default) | Inside the cluster only | Service to service calls |
| `NodePort` | Node IP plus a port from 30000 to 32767 | Quick tests, or behind your own load balancer |
| `LoadBalancer` | A cloud public or internal IP | Exposing a service outside the cluster |
| `ExternalName` | Maps to a DNS name | Pointing to an external database |
| Headless (`clusterIP: None`) | DNS returns pod IPs directly | StatefulSets, client-side balancing |

```yaml
apiVersion: v1
kind: Service
metadata:
  name: orders-api
spec:
  type: ClusterIP
  selector:
    app: orders-api        # matches pod labels
  ports:
    - name: http
      port: 80             # port of the Service
      targetPort: 8080     # port in the container
```

Other pods can now call `http://orders-api` in the same namespace, or `http://orders-api.shop.svc.cluster.local` from anywhere.

```bash
kubectl get endpointslices -l kubernetes.io/service-name=orders-api
```

On AKS a `LoadBalancer` Service creates an Azure Load Balancer. Add the annotation `service.beta.kubernetes.io/azure-load-balancer-internal: "true"` to get a private IP instead of a public one.

**Gotcha:** if a Service has no endpoints, the selector does not match any ready pod. Check labels first, then readiness.

**Interview tip:** Say that for HTTP you normally use one LoadBalancer in front of an Ingress or Gateway, not one LoadBalancer per service, because each one costs money and a public IP.

_Module: Networking · Tags: services, networking_

### 7. What are Namespaces and when should you use them?

**Short answer:** A Namespace is a named scope inside a cluster. It groups resources so names do not clash, and it is the unit where you apply quotas, RBAC rules and network policies. It is a logical boundary, not a security wall.

Names only need to be unique within a namespace, so `orders-api` can exist in both `dev` and `prod` namespaces. Some objects are cluster scoped and have no namespace: Nodes, PersistentVolumes, StorageClasses, Namespaces and ClusterRoles.

Default namespaces: `default`, `kube-system` (cluster components), `kube-public`, `kube-node-lease`.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: shop-prod
  labels:
    team: shop
    env: prod
```

```bash
kubectl get pods -n shop-prod
kubectl config set-context --current --namespace=shop-prod   # change default
kubectl api-resources --namespaced=false                     # cluster-scoped kinds
```

What you can attach to a namespace:
- ResourceQuota and LimitRange (limit usage).
- RBAC Roles and RoleBindings (who can do what).
- NetworkPolicies (who can talk to whom).
- Pod Security Standards labels.

**Gotcha:** namespaces do **not** isolate the network by default. A pod in `dev` can call a pod in `prod` unless a NetworkPolicy blocks it. Also, deleting a namespace deletes everything inside it.

**Common uses:** one namespace per team, per environment, or per application. Use separate clusters when you need strong isolation, such as different compliance zones or prod versus non-prod.

**Interview tip:** Mention that cross-namespace calls use the full DNS name `service.namespace`, and that namespaces are a soft boundary that you harden with RBAC, quotas and NetworkPolicy.

_Module: Core Concepts · Tags: namespaces, isolation_

### 8. How do labels, selectors and annotations work?

**Short answer:** Labels are key-value tags on objects. Selectors pick objects by those labels. This loose coupling is how Services find pods, how Deployments own ReplicaSets, and how you filter with `kubectl`. Annotations are also key-value metadata, but they are not used for selection.

```yaml
metadata:
  name: orders-api
  labels:
    app.kubernetes.io/name: orders-api
    app.kubernetes.io/part-of: shop
    env: prod
    version: "1.4.2"
  annotations:
    team-contact: "shop-team@example.com"
    prometheus.io/scrape: "true"
```

Selector types:
- **Equality based:** `app=orders-api`, `env!=dev`.
- **Set based:** `env in (prod, staging)`, `tier notin (cache)`, or just `partition` (exists).

```bash
kubectl get pods -l app=orders-api,env=prod
kubectl get pods -l 'env in (prod,staging)'
kubectl label pod orders-api-abc canary=true
kubectl get pods --show-labels
```

| | Labels | Annotations |
| --- | --- | --- |
| Used for selecting | Yes | No |
| Size | Short values (63 characters) | Can be large |
| Typical content | app, env, tier, version | Build info, tool config, links |

Real uses of annotations: ingress controller settings, Datadog autodiscovery, Prometheus scrape hints, change ticket numbers.

**Gotcha:** if you change a pod's labels so they stop matching a ReplicaSet selector, the ReplicaSet stops managing it and creates a new pod. This is a handy trick to take a pod out of service for debugging. Also, a typo in a Service selector gives a Service with no endpoints.

**Interview tip:** Mention the recommended `app.kubernetes.io/*` labels and that you enforce a standard label set (team, env, service) so cost reports and Datadog tags work.

_Module: Core Concepts · Tags: labels, selectors, metadata_

### 9. What is the difference between a ConfigMap and a Secret?

**Short answer:** Both inject configuration into pods without rebuilding the image. A ConfigMap holds non-sensitive settings. A Secret holds sensitive values such as passwords and tokens. Secrets are only base64 encoded by default, not encrypted, so they need extra protection.

You can use either as environment variables or as files mounted into the container.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: orders-config
data:
  LOG_LEVEL: info
  FEATURE_X: "true"
---
apiVersion: v1
kind: Secret
metadata:
  name: orders-db
type: Opaque
stringData:                 # plain text here, stored base64 by the API
  DB_PASSWORD: change-me-example
---
apiVersion: v1
kind: Pod
metadata:
  name: orders-api
spec:
  containers:
    - name: api
      image: myregistry.azurecr.io/orders-api:1.4.2
      envFrom:
        - configMapRef:
            name: orders-config
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: orders-db
              key: DB_PASSWORD
```

Important behaviours:
- A mounted file updates after some time when the ConfigMap changes. Environment variables do **not** change until the pod restarts.
- Objects are limited to 1 MiB.
- `immutable: true` stops edits and makes the API server cheaper to run at scale.

**Protecting secrets**
- Turn on **encryption at rest** for etcd (AKS can use a KMS key).
- Limit access with RBAC. Anyone who can read Secrets in a namespace can read the values.
- Do not commit Secret YAML to Git. Use an external store such as Azure Key Vault with the CSI driver or External Secrets, or Sealed Secrets.

**Gotcha:** a config change does not roll your Deployment. Put a hash of the config in a pod annotation (Helm does this easily) or run `kubectl rollout restart`.

**Interview tip:** Say "base64 is encoding, not encryption" and then describe your secret management approach.

_Module: Storage & Config · Tags: configuration, secrets_

### 10. What are Volumes, PersistentVolumes, PersistentVolumeClaims and StorageClasses?

**Short answer:** A volume gives a pod storage that outlives a container restart. For data that must outlive the pod, you use a PersistentVolumeClaim (PVC), which is a request for storage. A PersistentVolume (PV) is the actual disk. A StorageClass describes how to create disks on demand.

Think of renting a flat. The PVC is your rental request ("10 GB, fast disk"). The PV is the actual flat. The StorageClass is the agency that finds or builds one for you.

| Object | Meaning | Who creates it |
| --- | --- | --- |
| Volume | Storage attached to a pod (emptyDir, configMap, PVC and so on) | Developer in the pod spec |
| PersistentVolume | A real piece of storage in the cluster | Admin, or automatically |
| PersistentVolumeClaim | A request for storage by a workload | Developer |
| StorageClass | Template: provisioner, disk type, reclaim policy | Platform team |

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: reports-data
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: managed-csi       # an AKS built-in class (Azure Disk)
  resources:
    requests:
      storage: 10Gi
---
apiVersion: v1
kind: Pod
metadata:
  name: report-worker
spec:
  containers:
    - name: worker
      image: myregistry.azurecr.io/report-worker:2.0.0
      volumeMounts:
        - name: data
          mountPath: /var/data
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: reports-data
```

Common volume kinds: `emptyDir` (scratch space that dies with the pod), `configMap` and `secret` (files), `persistentVolumeClaim` (durable data).

**Gotcha:** the reclaim policy decides what happens when the claim is deleted. `Delete` removes the disk and its data. `Retain` keeps it. Check it before deleting a PVC in production.

**Interview tip:** Stateless services should not need PVCs at all. Keep data in managed databases and use volumes only when a workload really needs local durable files.

_Module: Storage & Config · Tags: storage, volumes_

### 11. What is the anatomy of a Kubernetes manifest, and which kubectl commands should you know?

**Short answer:** Every manifest has four top-level fields: `apiVersion`, `kind`, `metadata` and `spec` (plus `status` which the system fills in). `kubectl` is the command line client that sends these objects to the API server and reads them back.

```yaml
apiVersion: apps/v1          # API group and version for this kind
kind: Deployment             # the type of object
metadata:                    # identity: name, namespace, labels, annotations
  name: orders-api
  namespace: shop
spec:                        # the desired state, shape depends on the kind
  replicas: 2
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      containers:
        - name: api
          image: myregistry.azurecr.io/orders-api:1.4.2
```

**Commands used every day**

```bash
kubectl get pods -n shop -o wide          # list, with node and IP
kubectl describe pod orders-api-xyz       # details and recent events
kubectl logs orders-api-xyz -f --previous # follow logs; previous = crashed container
kubectl exec -it orders-api-xyz -- sh     # shell inside the container
kubectl apply -f deploy.yaml              # create or update declaratively
kubectl diff -f deploy.yaml               # preview changes
kubectl rollout undo deploy/orders-api    # roll back
kubectl port-forward svc/orders-api 8080:80
kubectl top pods                          # CPU and memory (needs metrics-server)
kubectl get events --sort-by=.lastTimestamp
kubectl explain deployment.spec.strategy  # built-in docs for any field
kubectl auth can-i create pods -n shop    # check permissions
```

Tips for speed:
- `kubectl get pod -o yaml` and `-o jsonpath='{.status.podIP}'` for scripting.
- `kubectl apply --dry-run=client -o yaml` to render without sending.
- `kubectl explain` is the fastest way to remember a field name.

**Gotcha:** forgetting `-n` sends the command to your current namespace, often `default`. Many outages start with a command run in the wrong context, so check `kubectl config current-context` before anything destructive.

**Interview tip:** Mention `kubectl diff`, `--dry-run=server` and `explain`. They show you work safely and do not guess field names.

_Module: Core Concepts · Tags: kubectl, yaml_

### 12. What are liveness, readiness and startup probes?

**Short answer:** Probes let the kubelet check your container. **Readiness** decides if the pod receives traffic. **Liveness** decides if the container must be restarted. **Startup** gives slow-starting apps extra time before the other two begin.

| Probe | Question it answers | On failure |
| --- | --- | --- |
| `startupProbe` | Has the app finished starting? | Container is restarted if it never succeeds |
| `readinessProbe` | Can it serve requests now? | Pod is removed from Service endpoints, not restarted |
| `livenessProbe` | Is it stuck for good? | Container is restarted |

Check types: `httpGet`, `tcpSocket`, `exec`, and `grpc` (stable since Kubernetes 1.27).

```yaml
containers:
  - name: api
    image: myregistry.azurecr.io/orders-api:1.4.2
    ports:
      - containerPort: 8080
    startupProbe:
      httpGet: { path: /healthz, port: 8080 }
      periodSeconds: 5
      failureThreshold: 30        # up to 150 seconds to start
    readinessProbe:
      httpGet: { path: /ready, port: 8080 }
      periodSeconds: 5
      failureThreshold: 3
    livenessProbe:
      httpGet: { path: /healthz, port: 8080 }
      periodSeconds: 10
      failureThreshold: 3
      timeoutSeconds: 2
```

Design rules:
- **Liveness must be cheap and must not check dependencies.** If it calls the database and the database is down, every pod restarts and makes things worse.
- **Readiness may check dependencies** the pod truly needs, but be careful: if all pods go unready together, the Service has no endpoints.
- Use a startup probe instead of a long `initialDelaySeconds`.

**Gotcha:** a liveness probe with a short timeout on a busy pod can kill healthy pods during a traffic spike, causing a restart storm.

**Interview tip:** Give the example of a Go service where `/healthz` returns 200 if the process is alive, while `/ready` returns 200 only after the cache is warm and the DB pool is open.

_Module: Workloads · Tags: probes, health_

### 13. What are resource requests and limits?

**Short answer:** A **request** is the amount of CPU and memory the scheduler reserves for a container. A **limit** is the maximum it may use. Requests drive placement. Limits are enforced at runtime: going over the memory limit kills the container, and going over the CPU limit slows it down.

CPU is measured in cores (`500m` is half a core). Memory is in bytes (`256Mi`).

```yaml
containers:
  - name: api
    image: myregistry.azurecr.io/orders-api:1.4.2
    resources:
      requests:
        cpu: 250m          # scheduler reserves this
        memory: 256Mi
      limits:
        memory: 512Mi      # hard ceiling: OOMKilled above this
        # cpu limit omitted on purpose, see the CPU throttling question
```

How they behave:
- **Scheduler:** places a pod only on a node with enough unreserved requests.
- **CPU limit:** the container is throttled, not killed.
- **Memory limit:** memory cannot be taken back, so the kernel's OOM killer ends the container, and you see `OOMKilled` with exit code 137.
- **No requests:** the pod can be packed anywhere and is first to be evicted when the node is short on memory.

| Setting | Effect |
| --- | --- |
| Request too low | Node overcommitted, noisy neighbours, evictions |
| Request too high | Wasted money, pods stay Pending |
| Memory limit too low | OOMKilled restarts |
| CPU limit too low | Latency from throttling |

A sensible starting rule: set memory request equal to memory limit, set a CPU request based on measured usage, and be careful with CPU limits.

```bash
kubectl top pod -n shop
kubectl describe node aks-nodepool1-123 | grep -A8 "Allocated resources"
```

**Interview tip:** Link requests to the HPA (utilisation is a percentage of the request) and to QoS classes. That shows you understand the whole picture.

_Module: Scheduling & Scaling · Tags: resources, scheduling_

### 14. What is an Ingress and how does it differ from a Service?

**Short answer:** An Ingress is a set of HTTP and HTTPS routing rules (host and path to Service). It needs an **Ingress controller** such as NGINX, which runs in the cluster and does the actual routing. It lets many services share one public IP and one TLS setup.

A `LoadBalancer` Service works at layer 4: it forwards TCP or UDP to a service. An Ingress works at layer 7: it reads the host name and URL path, so `shop.example.com/orders` can go to one service and `/users` to another.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: shop
  namespace: shop
spec:
  ingressClassName: nginx
  tls:
    - hosts: ["shop.example.com"]
      secretName: shop-tls            # TLS cert stored as a Secret
  rules:
    - host: shop.example.com
      http:
        paths:
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: orders-api
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80
```

```mermaid
flowchart LR
    C["Client"] --> LB["Cloud load balancer"]
    LB --> IC["Ingress controller pods"]
    IC -- "/orders" --> S1["orders-api Service"]
    IC -- "/" --> S2["web Service"]
```

Read it from left to right: one load balancer feeds the controller, and the controller routes by rule.

Extras: TLS termination (often with cert-manager and Let's Encrypt), redirects, rate limits, and auth, usually through controller-specific annotations.

**Gotcha:** an Ingress object does nothing without a controller. Also, annotations are not portable between controllers. The newer **Gateway API** is the modern, more expressive replacement.

**Interview tip:** Mention that the Ingress controller is itself a Deployment behind a LoadBalancer Service, and name which one you use on AKS.

_Module: Networking · Tags: ingress, networking_

### 15. How is Kubernetes different from Docker, and how do images and registries fit in?

**Short answer:** Docker builds and runs containers on one machine. Kubernetes orchestrates containers across many machines. Kubernetes does not build images. It pulls them from a registry and runs them through a container runtime such as containerd.

| | Docker | Kubernetes |
| --- | --- | --- |
| Scope | One host | A cluster of nodes |
| Job | Build and run containers | Schedule, scale, heal and network containers |
| Config | Dockerfile, `docker run`, Compose | YAML objects |
| Unit | Container | Pod |

**Flow:** you build an image in CI, push it to a registry (Azure Container Registry, Docker Hub, GitLab Registry), and the manifest refers to it by name and tag. The kubelet on the node asks the runtime to pull and start it.

```bash
docker build -t myregistry.azurecr.io/orders-api:1.4.2 .
docker push myregistry.azurecr.io/orders-api:1.4.2
kubectl set image deployment/orders-api api=myregistry.azurecr.io/orders-api:1.4.2
```

```yaml
containers:
  - name: api
    image: myregistry.azurecr.io/orders-api@sha256:3f1c...   # digest = immutable
    imagePullPolicy: IfNotPresent
imagePullSecrets:
  - name: registry-credentials     # for private registries (AKS can use ACR attach instead)
```

Good habits:
- **Never use `latest` in production.** You cannot tell what is running, and rollbacks become guesswork. Use a version or a Git commit tag, or better, the digest.
- `imagePullPolicy` defaults to `Always` for `latest` and `IfNotPresent` otherwise.
- Keep images small (distroless or alpine for Go), run as non-root, scan them.

**Fact:** Kubernetes removed its built-in Docker integration (dockershim) in version 1.24. Images built with Docker still work, because they follow the OCI standard. Only the runtime on the node changed to containerd.

**Interview tip:** If asked "does Kubernetes still support Docker?", answer: Docker-built images, yes. The Docker Engine as a node runtime, no.

_Module: Core Concepts · Tags: docker, images, registry_

## Intermediate

### 16. [Tech Lead] What is your troubleshooting runbook for Pending, CrashLoopBackOff, ImagePullBackOff, OOMKilled, Evicted pods and 5xx errors through a Service?

**Short answer:** Start from the pod status, then read `describe` events, then logs, then compare with what changed. Each status points to a different layer: Pending is scheduling, ImagePullBackOff is registry or credentials, CrashLoopBackOff is the app, OOMKilled is memory, Evicted is node pressure, and 5xx through a Service is usually readiness or endpoints.

```mermaid
flowchart TD
    S["kubectl get pods"] --> P{"Status?"}
    P -- "Pending" --> P1["describe: events<br/>no resources, taints, PVC"]
    P -- "ImagePullBackOff" --> P2["Wrong tag, no pull secret,<br/>ACR not attached"]
    P -- "CrashLoopBackOff" --> P3["logs --previous<br/>exit code, config, probe"]
    P -- "OOMKilled" --> P4["Exit 137: raise memory<br/>or fix the leak"]
    P -- "Evicted" --> P5["Node pressure:<br/>disk or memory"]
    P -- "Running but 5xx" --> P6["Endpoints, readiness,<br/>app logs, ingress"]
```

Read it from the top: the status picks the branch.

**The first three commands, always**

```bash
kubectl get pods -n shop -o wide
kubectl describe pod orders-api-7c9d -n shop       # read the Events at the bottom
kubectl logs orders-api-7c9d -n shop --previous    # logs of the crashed container
```

**By symptom**

| Symptom | Likely causes | Check |
| --- | --- | --- |
| Pending | Not enough CPU or memory, taints, node selector, unbound PVC, quota | Events: `FailedScheduling` message |
| ImagePullBackOff | Typo in tag, missing credentials, ACR not linked, rate limit | Events: the exact pull error |
| CrashLoopBackOff | App error at start, bad config or secret, failing liveness probe | `logs --previous`, exit code |
| OOMKilled | Memory limit too low or a leak | `Last State: Terminated, Reason: OOMKilled` |
| Evicted | Node out of memory or disk | `kubectl describe node`, conditions |
| 5xx via Service | No ready endpoints, slow pods, wrong port | `get endpointslices`, probes, ingress logs |

**For 5xx, walk the path:** ingress controller logs, then the Service endpoints, then pod readiness, then app logs and Datadog traces. A quick isolation test is `kubectl port-forward` straight to one pod. If the pod is fine but the Service is not, the problem is labels, ports or endpoints.

```bash
kubectl get endpointslices -n shop -l kubernetes.io/service-name=orders-api
kubectl debug -it orders-api-7c9d -n shop --image=busybox:1.36 --target=api
```

**Lead habits:** ask "what changed?" first (deploy, config, node upgrade, traffic), mitigate before you root-cause (roll back, scale up), and write down what you saw.

**Interview tip:** Keep the order of investigation consistent. Interviewers listen for a method: status, events, logs, recent changes, then deeper tools.

_Module: Operations & Troubleshooting · Tags: tech-lead, troubleshooting, incident_

### 17. [Tech Lead] How do you achieve zero-downtime deployments and graceful shutdown?

**Short answer:** Combine a rolling update that never removes capacity, a correct readiness probe, a preStop delay so load balancers stop sending traffic, graceful shutdown handling in the app, and a PodDisruptionBudget. Missing any one of these causes dropped requests during deploys.

**Why requests get dropped:** when a pod is deleted, two things happen at the same time. The kubelet sends SIGTERM, and the endpoint is removed from Services and ingress. Removal spreads slowly, so for a few seconds traffic still arrives at a pod that is already shutting down.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0          # never drop below desired capacity
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      terminationGracePeriodSeconds: 45
      containers:
        - name: api
          image: myregistry.azurecr.io/orders-api:1.4.3
          readinessProbe:
            httpGet: { path: /ready, port: 8080 }
            periodSeconds: 3
          lifecycle:
            preStop:
              exec:
                command: ["sleep", "10"]   # keep serving while endpoints update
```

**In the application (Go example idea):** on SIGTERM, stop accepting new connections, finish in-flight requests with a timeout shorter than the grace period, close database pools, then exit. In Node, call `server.close()` on SIGTERM. Make sure PID 1 receives the signal (use exec form in the Dockerfile, not a shell wrapper).

Timeline: `preStop` sleep (10s) + app drain (up to about 30s) must fit inside `terminationGracePeriodSeconds` (45s).

**Checklist**
- Readiness probe that is truthful.
- `maxUnavailable: 0` and enough replicas.
- A PodDisruptionBudget for node drains and upgrades.
- Spread replicas across nodes and zones.
- Retries with backoff in clients, because some failures are unavoidable.
- Backwards-compatible database changes (expand, then contract).

**Verify it:** run a load test (k6, hey) during a deploy and watch for non-2xx responses.

**Interview tip:** Name the race between SIGTERM and endpoint removal. It shows you have seen this in real life.

_Module: Operations & Troubleshooting · Tags: tech-lead, deployments, reliability_

### 18. [Tech Lead] What is your autoscaling strategy, and how do you plan capacity?

**Short answer:** Use three layers. The HPA adds pods when load rises, KEDA scales on events such as queue length, and the cluster autoscaler adds nodes when pods cannot be placed. VPA or good right-sizing fixes the size of each pod. Plan capacity from load tests and real traffic, with headroom for spikes and node failures.

| Tool | Scales | Signal | Good for |
| --- | --- | --- | --- |
| HPA | Pod count | CPU, memory, custom metrics | Stateless APIs |
| KEDA | Pod count (including to zero) | Queue depth, Kafka lag, cron, HTTP | Workers and event consumers |
| VPA | Pod size | Observed usage | Recommendations, batch, single-replica apps |
| Cluster autoscaler (or Karpenter on some clouds) | Node count | Pending pods | Making room for pods |

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: orders-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: orders-api
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 65      # percent of the CPU request
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # avoid flapping
```

**Capacity planning steps**
1. Load test one pod to find its safe requests per second.
2. Divide expected peak traffic by that number, then add 30 to 50 percent headroom.
3. Make sure the cluster can survive losing a node or a zone (N+1).
4. Set `maxReplicas` and node pool max sizes so a runaway scale-up cannot bankrupt you.
5. Review monthly with Datadog data.

**Gotchas:** HPA percentage is based on the **request**, so wrong requests give wrong scaling. Do not let HPA and VPA both act on CPU for the same workload. New nodes take minutes, so scale ahead of known events or keep a small buffer of spare capacity.

**Interview tip:** Say that CPU is a weak signal for I/O-bound services. Scaling on requests per second or queue depth often reacts better.

_Module: Scheduling & Scaling · Tags: tech-lead, autoscaling, capacity_

### 19. [Tech Lead] How do CPU throttling and right-sizing affect performance?

**Short answer:** A CPU limit is enforced in short time slices. When a container uses its quota early in a slice, it is paused until the next one, even if the node is idle. This **throttling** adds latency that average CPU graphs do not show. Right-sizing means setting requests from measured usage, and being careful with CPU limits.

How it works: a limit of `500m` means 50 ms of CPU time per 100 ms period. A multi-threaded Go service can burn that in 10 ms across several cores, then wait 90 ms. The p99 latency goes up while average CPU looks low.

**Signals to watch**
- `container_cpu_cfs_throttled_periods_total` divided by total periods (Prometheus), or the Datadog metric for CPU throttling.
- p99 latency rising with CPU usage near the limit.
- Go: `GOMAXPROCS` defaults to the node's core count, not your limit. Older Go versions need the `automaxprocs` library. Go 1.25 made GOMAXPROCS aware of cgroup CPU limits.

```yaml
resources:
  requests:
    cpu: 500m          # based on observed p95 usage
    memory: 512Mi
  limits:
    memory: 512Mi      # memory limit equal to request, avoids surprises
    # no CPU limit: pod can burst when the node has spare CPU
```

**Right-sizing process**
1. Run in production or staging for a week.
2. Look at p95 and max of CPU and memory in Datadog or Prometheus.
3. Set the CPU request near p95, memory request near the peak plus 20 percent.
4. Use VPA in recommendation mode to cross-check.
5. Revisit after big releases.

| Choice | Pros | Cons |
| --- | --- | --- |
| CPU limit set | Predictable, protects neighbours | Throttling, latency |
| No CPU limit | Bursting, no throttling | Needs correct requests, one pod can take a lot |

Teams differ here. A common compromise: no CPU limits for latency-sensitive services with good requests, CPU limits for batch and untrusted workloads.

**Interview tip:** State your position and the evidence you would use (throttling ratio and p99), not just an opinion.

_Module: Scheduling & Scaling · Tags: tech-lead, performance, resources_

### 20. [Tech Lead] How do you optimise the cost of a Kubernetes cluster?

**Short answer:** Most waste comes from over-requested resources, idle nodes and always-on non-production environments. Measure first, then right-size requests, scale to demand, use cheaper capacity such as spot nodes where safe, and schedule dev and test to sleep outside working hours.

**Where the money goes:** nodes are paid for by size and time, not by what pods use. If pods request 4 CPUs and use 0.5, you pay for 4.

**Actions in order of effort**
1. **Visibility:** label every workload by team and service, and use cost tools (Azure Cost Management, OpenCost, Kubecost, Datadog Cloud Cost). You cannot cut what you cannot see.
2. **Right-size requests** using real usage (see the throttling and right-sizing question). This usually gives the biggest saving.
3. **Autoscale:** HPA, KEDA scale-to-zero for workers, cluster autoscaler with sensible minimums.
4. **Pick the right nodes:** match VM size to the pod shape, avoid many tiny underused nodes, consider ARM-based VMs when your images support them.
5. **Spot nodes** (Azure Spot node pools) for interruptible work such as batch jobs and CI runners. Use taints and PodDisruptionBudgets, never for the only replica of a critical service.
6. **Reserved instances or savings plans** for the steady baseline.
7. **Non-production sleep:** stop dev and test node pools at night and weekends, or scale deployments to zero.
8. **Housekeeping:** delete unused PVCs, old load balancers, large log volumes, and unneeded Datadog metrics or logs.

```bash
# Quick check of requested versus used, per namespace
kubectl top pods -A --sort-by=cpu | head
kubectl get nodes -o custom-columns=NAME:.metadata.name,CPU:.status.allocatable.cpu,MEM:.status.allocatable.memory
```

**Trade-offs:** tighter packing saves money but reduces headroom. Spot saves up to a large percentage but pods can be evicted at short notice. Always tie savings to reliability targets.

**Interview tip:** Quote a number if you have one, such as "we cut node count by 30 percent after right-sizing", and mention that cost review is a regular team habit, not a one-time project.

_Module: Scheduling & Scaling · Tags: tech-lead, cost, finops_

### 21. [Tech Lead] How do you monitor Kubernetes with Datadog or Prometheus, and which alerts do you set?

**Short answer:** Collect metrics, logs and traces, watch both the platform (nodes, pods, control plane) and your services (the golden signals: latency, traffic, errors, saturation). Alert on symptoms users feel, and keep a small set of cause alerts for things that need action.

**What to collect**
- **Metrics:** the Datadog Agent as a DaemonSet with the Cluster Agent, or Prometheus with kube-state-metrics and node-exporter.
- **Logs:** from container stdout, with service, env and version tags.
- **Traces:** APM with unified service tagging (`env`, `service`, `version`) so deploys are visible.
- **Events:** deploys, scaling, OOM kills.

**Unified tagging in a Deployment (Datadog style)**

```yaml
metadata:
  labels:
    tags.datadoghq.com/env: prod
    tags.datadoghq.com/service: orders-api
    tags.datadoghq.com/version: "1.4.3"
```

**Alerts worth having**

| Alert | Why |
| --- | --- |
| Service error rate and p99 latency (SLO burn rate) | What users feel |
| Pod restarts or CrashLoopBackOff rising | App or config failure |
| OOMKilled count | Memory limits wrong |
| Pending pods for more than 10 minutes | Capacity or scheduling |
| Deployment with unavailable replicas | Bad rollout |
| Node NotReady, memory or disk pressure | Infrastructure |
| CPU throttling ratio high | Hidden latency |
| PVC almost full | Data outage soon |
| Certificate expiry within 14 days | Avoidable outage |
| HPA at max replicas for a long time | Out of headroom |

```promql
# Prometheus example: restarts in the last 15 minutes
increase(kube_pod_container_status_restarts_total{namespace="shop"}[15m]) > 3
```

**Good practice:** each alert has an owner, a runbook link, and a severity. Page only for urgent, actionable issues. Review noisy alerts every sprint.

**Interview tip:** Contrast symptom alerts (users hurt) with cause alerts (CPU high). Cause alerts alone create noise.

_Module: Operations & Troubleshooting · Tags: tech-lead, observability, datadog_

### 22. [Tech Lead] How do GitOps and GitLab CI/CD deploy to Kubernetes, and how do you promote between environments?

**Short answer:** CI builds, tests and scans the image, then pushes it. CD is handled either by the pipeline running `helm upgrade` (push) or by a GitOps controller such as Argo CD or Flux that watches a Git repo and syncs the cluster (pull). Promotion means changing the image version in the next environment's folder through a reviewed merge request.

| | Push (pipeline deploys) | Pull (GitOps) |
| --- | --- | --- |
| Credentials | Pipeline needs cluster access | Cluster pulls from Git, no inbound credentials |
| Drift | Not corrected | Detected and corrected |
| Audit | Pipeline logs | Git history |
| Rollback | Re-run pipeline | `git revert` |

```mermaid
flowchart LR
    D["Developer MR"] --> CI["GitLab CI: test, build, scan"]
    CI --> R["Registry: image 1.4.3"]
    CI --> G["Config repo: bump tag in dev"]
    G --> A["Argo CD / Flux"]
    A --> K["Cluster"]
    G -. approved MR .-> P["staging then prod folders"]
```

Read it: CI never touches the cluster. It updates Git, and the controller applies the change.

**A typical repo layout**

```text
config-repo/
  apps/orders-api/base/            deployment.yaml, service.yaml
  apps/orders-api/overlays/dev/    kustomization.yaml (image tag)
  apps/orders-api/overlays/staging/
  apps/orders-api/overlays/prod/
```

**GitLab CI fragment that bumps the dev tag**

```yaml
deploy-dev:
  stage: deploy
  image: registry.example.com/tools/kustomize:5
  script:
    - git clone "https://ci-bot:${CONFIG_REPO_TOKEN}@gitlab.example.com/platform/config-repo.git"
    - cd config-repo/apps/orders-api/overlays/dev
    - kustomize edit set image orders-api=myregistry.azurecr.io/orders-api:${CI_COMMIT_SHORT_SHA}
    - git commit -am "orders-api ${CI_COMMIT_SHORT_SHA} to dev" && git push
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
```

**Promotion rules:** same image through every environment (build once, never rebuild), config differences only in overlays, automatic for dev, approval for prod, and smoke tests plus metrics checks as gates. Progressive delivery tools (Argo Rollouts, Flagger) can add canary with automatic rollback.

**Interview tip:** Stress "build once, promote the same digest". It removes a whole class of "it worked in staging" problems.

_Module: Delivery & GitOps · Tags: tech-lead, gitops, cicd_

### 23. [Tech Lead] How do you plan Kubernetes cluster upgrades and handle API deprecations?

**Short answer:** Kubernetes ships a minor version about three times a year and supports only the latest few. Upgrade one minor version at a time, on a regular schedule, test in non-production first, scan for removed APIs before you start, and use PodDisruptionBudgets so node rollouts do not cause downtime.

**Plan**
1. **Read the release notes** and the deprecation list for the target version.
2. **Find removed APIs** in your manifests and Helm charts. Tools such as `pluto` or `kubent` scan for them; the API server metric `apiserver_requested_deprecated_apis` shows what is still called.
3. **Check add-ons** (ingress controller, CSI drivers, Datadog agent, service mesh) for compatibility.
4. **Upgrade a non-prod cluster** first and run smoke and load tests.
5. **Upgrade the control plane**, then node pools.
6. **Watch** error rates and rollout progress. Keep a rollback plan: control plane upgrades usually cannot be reverted, so the safe fallback is a blue-green cluster.

Examples of past removals: `extensions/v1beta1` Ingress and PodSecurityPolicy (removed in 1.25), the in-tree cloud provider code over several versions, and the dockershim in 1.24.

```bash
az aks get-upgrades --resource-group rg-shop --name aks-shop-prod -o table
az aks upgrade --resource-group rg-shop --name aks-shop-prod --kubernetes-version 1.33.0 --control-plane-only
az aks nodepool upgrade --resource-group rg-shop --cluster-name aks-shop-prod --name apps --max-surge 33%
```

(Use a version that your region lists as available.)

**Node upgrades:** the surge setting adds extra nodes first, then cordons, drains and replaces old ones. Drains respect PodDisruptionBudgets and `terminationGracePeriodSeconds`.

**Team practice:** upgrade every quarter, never stay more than one or two versions behind the support window, and treat upgrades as normal work, not a yearly project.

**Interview tip:** Say "pre-flight scan, non-prod first, control plane, then nodes with surge". It is a short, complete plan.

_Module: Operations & Troubleshooting · Tags: tech-lead, upgrades, maintenance_

### 24. [Tech Lead] Helm or Kustomize: which do you use in practice and why?

**Short answer:** Helm is a package manager with templates, versions and releases. Kustomize patches plain YAML with overlays and has no templating language. Use Helm to install third-party software and to package apps with many options. Use Kustomize, or a small Helm chart, for your own services with simple per-environment differences. Many teams combine them.

| | Helm | Kustomize |
| --- | --- | --- |
| Model | Templates plus values | Base plus overlays (patches) |
| Release tracking | Yes (history, rollback) | No, the cluster just gets YAML |
| Learning curve | Higher (Go templates) | Lower |
| Third-party apps | Standard (charts) | Possible, less convenient |
| Readability | Templates can get messy | Plain YAML stays readable |
| Built into kubectl | No | Yes, `kubectl apply -k` |

```yaml
# Kustomize overlay: overlays/prod/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
images:
  - name: orders-api
    newName: myregistry.azurecr.io/orders-api
    newTag: 1.4.3
patches:
  - target:
      kind: Deployment
      name: orders-api
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 6
```

```bash
helm upgrade --install orders-api ./chart -n shop -f values-prod.yaml --atomic --timeout 5m
kubectl kustomize overlays/prod | kubectl diff -f -
```

**What works in practice**
- A shared **internal Helm chart** for all Go and Node services gives one place for probes, security context and labels. Teams only provide values.
- Kustomize or Argo CD values files for environment differences.
- Pin chart versions. Review rendered output (`helm template`) in merge requests.
- Keep logic out of templates. If a chart needs many `if` blocks, split it.

**Gotchas:** Helm hooks and `--atomic` can hide partial failures. Large values files become a second programming language. Kustomize patches break when the base changes shape.

**Interview tip:** Pick one default and explain it. "Helm for platform add-ons and our common service chart, Kustomize overlays per environment" is a clear answer.

_Module: Delivery & GitOps · Tags: tech-lead, helm, kustomize_

### 25. [Tech Lead] How do you handle a Kubernetes production incident and run a postmortem?

**Short answer:** In an incident, stabilise first and investigate second: declare the incident, assign roles, check what changed, mitigate (roll back, scale, fail over), communicate on a schedule, and only then dig into the root cause. Afterwards, write a blameless postmortem with a timeline, causes and tracked action items.

**During the incident**
1. **Declare and assign roles:** incident commander, an operator who runs commands, and a communicator who updates stakeholders.
2. **Scope the impact:** which services, which users, since when. Use the Datadog dashboards and SLO view.
3. **Check what changed:** recent deploys, config or secret changes, node upgrades, cert expiry, traffic spikes.
4. **Mitigate quickly:** `kubectl rollout undo`, scale replicas, cordon a bad node, fail traffic to another region, disable a feature flag.
5. **Communicate every 15 to 30 minutes**, even if the update is "no change".

```bash
kubectl rollout undo deployment/orders-api -n shop
kubectl cordon aks-apps-12345678-vmss000003
kubectl get events -A --sort-by=.lastTimestamp | tail -30
```

**Typical Kubernetes outage causes**
- A bad deploy with weak probes.
- Expired certificates.
- A node pool out of capacity, or quota exhausted.
- DNS (CoreDNS overload).
- An admission webhook that is down and blocks all pod creation.
- A full disk on a node, or etcd under pressure.
- Everything restarting at once, such as a liveness check on a shared dependency.

**Blameless postmortem outline**
- Summary and impact (duration, users, errors).
- Timeline with timestamps.
- Root cause and contributing factors (ask why five times).
- What went well and what went badly.
- Action items with an owner and a date, split into prevent, detect and mitigate.

**Culture points:** focus on systems not people, share the report widely, and follow up the actions, because a postmortem without finished actions repeats the incident.

**Interview tip:** Tell one real story in this shape: symptom, mitigation, root cause, the fix that prevents a repeat, and what you changed in alerts or process.

_Module: Operations & Troubleshooting · Tags: tech-lead, incident, postmortem_

### 26. What is a StatefulSet and when do you use it instead of a Deployment?

**Short answer:** A StatefulSet runs pods that need a stable name, a stable network identity and their own persistent disk. Pods are created in order (`db-0`, `db-1`, `db-2`) and keep their identity and volume when rescheduled. Use it for databases, brokers and clustered systems, not for ordinary stateless APIs.

A Deployment treats pods as interchangeable. A StatefulSet does not: `db-0` is always `db-0`, and it always gets back its own PVC.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pg
spec:
  clusterIP: None            # headless: gives each pod its own DNS name
  selector:
    app: pg
  ports:
    - port: 5432
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: pg
spec:
  serviceName: pg
  replicas: 3
  selector:
    matchLabels:
      app: pg
  template:
    metadata:
      labels:
        app: pg
    spec:
      containers:
        - name: postgres
          image: postgres:16
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef: { name: pg-secret, key: password }
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 20Gi
```

What you get:
- DNS names like `pg-0.pg.shop.svc.cluster.local`, one per pod.
- Ordered start and stop by default (`podManagementPolicy: OrderedReady`; use `Parallel` to skip ordering).
- One PVC per pod from `volumeClaimTemplates`.
- Updates go from the highest ordinal down.

**Gotchas:** PVCs are **not** deleted when you delete the StatefulSet (safety by design). A StatefulSet gives identity and storage only. It does not give replication, backup or failover. For that you need the database's own clustering or an operator.

**Interview tip:** A good answer ends with "for production databases I would prefer a managed service or a proven operator over a hand-written StatefulSet."

_Module: Workloads · Tags: statefulset, storage_

### 27. What is a DaemonSet and what is it used for?

**Short answer:** A DaemonSet makes sure one copy of a pod runs on every node, or on a chosen group of nodes. New nodes automatically get the pod, and removed nodes lose it. It is used for node-level agents.

Typical uses: log collectors (Fluent Bit), the Datadog Agent, node monitoring (node-exporter), CNI and CSI node plugins, and kube-proxy itself.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-agent
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: log-agent
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  template:
    metadata:
      labels:
        app: log-agent
    spec:
      tolerations:
        - operator: Exists          # also run on tainted nodes
      containers:
        - name: agent
          image: fluent/fluent-bit:3.0
          resources:
            requests:
              cpu: 50m
              memory: 64Mi
          volumeMounts:
            - name: varlog
              mountPath: /var/log
              readOnly: true
      volumes:
        - name: varlog
          hostPath:
            path: /var/log
```

Points to remember:
- Use `nodeSelector` or affinity to limit it to some nodes (for example GPU nodes only).
- Add tolerations if the agent must run on tainted nodes, or it will be missing there.
- Always set resource requests. Every node pays the cost, so a heavy agent multiplies across the cluster.
- `hostPath` and privileged access are powerful. Give DaemonSets only what they need.

**Gotcha:** DaemonSet pods on a big cluster can use a lot of resources and API server calls. Review them when you see node memory pressure.

**Interview tip:** Mention that the Datadog Agent runs as a DaemonSet, and the Cluster Agent as a normal Deployment, so you understand the difference between per-node and per-cluster work.

_Module: Workloads · Tags: daemonset, nodes_

### 28. How do Jobs and CronJobs work?

**Short answer:** A Job runs pods until a set number of them finish successfully, retrying on failure. A CronJob creates Jobs on a schedule. Use them for batch work, migrations and reports that must end, as opposed to Deployments that run forever.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-report
  namespace: shop
spec:
  schedule: "0 2 * * *"            # every day at 02:00
  timeZone: "Europe/Paris"         # field is stable since Kubernetes 1.27
  concurrencyPolicy: Forbid        # skip a run if the last one is still going
  startingDeadlineSeconds: 600
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 3
  jobTemplate:
    spec:
      backoffLimit: 3              # retries before the Job is marked Failed
      activeDeadlineSeconds: 1800  # kill if it runs longer than 30 min
      ttlSecondsAfterFinished: 86400
      template:
        spec:
          restartPolicy: OnFailure # Jobs must use OnFailure or Never
          containers:
            - name: report
              image: myregistry.azurecr.io/report-job:2.0.0
```

Useful Job fields:
- `completions` and `parallelism` for fan-out work.
- `completionMode: Indexed` gives each pod an index, handy for sharding.
- `ttlSecondsAfterFinished` cleans up finished pods so they do not pile up.

```bash
kubectl create job manual-run --from=cronjob/nightly-report -n shop
kubectl get jobs -n shop
```

**Gotchas**
- Jobs run **at least once**, so the work must be idempotent.
- With `concurrencyPolicy: Allow` (the default) slow runs can overlap.
- If the controller misses too many schedules, it stops creating Jobs. Set `startingDeadlineSeconds`.
- A pod with a sidecar proxy may never finish unless the sidecar exits. Native sidecars solve this.

**Interview tip:** Say "idempotent, deadline, TTL cleanup, no overlap". Those four settings are what make a CronJob safe.

_Module: Workloads · Tags: jobs, cronjob_

### 29. What are init containers and sidecars, and what are native sidecar containers?

**Short answer:** Init containers run one after another to completion before the main containers start. They prepare things. Sidecars run next to the main container for the whole pod life and add a function such as proxying or log shipping. Native sidecars (beta and on by default from Kubernetes 1.29, stable in 1.33) are init containers with `restartPolicy: Always`, which gives sidecars proper start and stop order.

**Init container uses:** wait for a dependency, run a database migration, fetch config, set file permissions.

**The old sidecar problem:** sidecars were plain containers, so there was no start order (the app could start before the proxy was ready), and Jobs never finished because the sidecar kept running.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: orders-api
spec:
  initContainers:
    - name: migrate                      # classic init: runs and exits
      image: myregistry.azurecr.io/orders-migrate:1.4.3
    - name: log-shipper                  # native sidecar
      image: fluent/fluent-bit:3.0
      restartPolicy: Always              # this makes it a sidecar
      volumeMounts:
        - name: logs
          mountPath: /var/log/app
  containers:
    - name: api
      image: myregistry.azurecr.io/orders-api:1.4.3
      volumeMounts:
        - name: logs
          mountPath: /var/log/app
  volumes:
    - name: logs
      emptyDir: {}
```

| Kind | Starts | Ends | Restarted |
| --- | --- | --- | --- |
| Init container | Before app, in order | Must exit successfully | On failure, retried |
| Native sidecar | Before app, in order | After app, in reverse | Yes, always |
| Regular sidecar container | Same time as the app | With the pod | Per pod policy |

**Benefits of native sidecars:** the sidecar is ready before the app starts, it keeps running while init containers after it run, it shuts down after the main container, and a Job can finish.

**Gotcha:** if your cluster is older than 1.29, the `SidecarContainers` feature gate may be off. Check the version before relying on it.

**Interview tip:** Mention service mesh proxies (Istio, Linkerd) and log agents as the real-world cases that motivated this feature.

_Module: Workloads · Tags: init-containers, sidecar, k8s-1.29_

### 30. How do rolling updates, rollbacks, canary and blue-green releases work?

**Short answer:** A rolling update replaces pods gradually, controlled by `maxSurge` (extra pods allowed) and `maxUnavailable` (pods allowed to be missing). Rollback goes back to the previous ReplicaSet. Canary and blue-green are release strategies built on top, using extra Deployments, traffic splitting or tools like Argo Rollouts.

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%          # up to 25% extra pods during the update
    maxUnavailable: 0      # keep full capacity
```

With 4 replicas and `maxSurge: 25%`, Kubernetes starts one new pod, waits until it is ready, then stops one old pod, and repeats.

```bash
kubectl set image deploy/orders-api api=myregistry.azurecr.io/orders-api:1.4.4
kubectl rollout status deploy/orders-api --timeout=120s
kubectl rollout pause deploy/orders-api      # hold the rollout half-way
kubectl rollout undo deploy/orders-api --to-revision=3
```

A rollout that cannot finish (new pods never become ready) stops by itself and old pods keep serving. `progressDeadlineSeconds` (default 600) marks it as failed.

| Strategy | How | Pros | Cons |
| --- | --- | --- | --- |
| Rolling | Gradual replace | Simple, built in | Old and new versions run together |
| Recreate | Stop all, then start | No version mixing | Downtime |
| Blue-green | Two full environments, switch the Service selector or route | Instant switch and rollback | Double capacity |
| Canary | Send a small percent to the new version, then grow | Real traffic testing, limited blast radius | Needs traffic splitting and metrics |

**Canary options:** two Deployments behind one Service (rough, split by replica count), Ingress or Gateway API weights, a service mesh, or Argo Rollouts and Flagger which also analyse metrics and roll back automatically.

**Gotchas:** old and new versions run at the same time, so APIs and database schemas must be backward compatible. `kubectl rollout undo` does not revert database changes.

**Interview tip:** Tie it to risk. Say which strategy you choose for a low-risk UI change versus a payment service change, and what metric promotes or aborts a canary.

_Module: Workloads · Tags: deployments, rollout, release_

### 31. How does Kubernetes scheduling work: nodeSelector, affinity, taints, tolerations and topology spread?

**Short answer:** The scheduler places each pod on a node that fits. You steer it with `nodeSelector` and node affinity (pods choose nodes), pod affinity and anti-affinity (pods choose other pods), taints and tolerations (nodes repel pods unless tolerated), and topology spread constraints (spread across zones or nodes).

| Tool | Direction | Use it for |
| --- | --- | --- |
| `nodeSelector` | Pod picks nodes by label | Simple "run on the ssd pool" |
| Node affinity | Pod picks nodes, with soft or hard rules | Richer rules, preferences |
| Pod anti-affinity | Pod avoids other pods | Keep replicas apart |
| Taint (on node) and toleration (on pod) | Node repels | Dedicated or special nodes (GPU, spot) |
| Topology spread | Even spread by zone or node | High availability |

```yaml
spec:
  nodeSelector:
    agentpool: apps
  tolerations:
    - key: kubernetes.azure.com/scalesetpriority
      operator: Equal
      value: spot
      effect: NoSchedule
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: kubernetes.io/arch
                operator: In
                values: ["amd64"]
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: ScheduleAnyway
      labelSelector:
        matchLabels:
          app: orders-api
```

Meaning of the long names: `required...` is a hard rule, `preferred...` is a soft hint, and `IgnoredDuringExecution` means running pods are not moved when labels change later.

Taint effects: `NoSchedule` (do not place new pods), `PreferNoSchedule` (try to avoid), `NoExecute` (also evict running pods).

```bash
kubectl taint nodes aks-gpu-123 sku=gpu:NoSchedule
kubectl cordon aks-apps-456       # no new pods
kubectl drain aks-apps-456 --ignore-daemonsets --delete-emptydir-data
```

**Gotchas:** a taint does not attract pods. It only repels, so pair it with a nodeSelector or affinity to make a pod go there. Hard anti-affinity on a big Deployment can leave pods Pending. Topology spread is usually the better tool.

**Interview tip:** Say that for HA you spread replicas across zones with topology spread, and for special hardware you taint the pool and add toleration plus node affinity.

_Module: Scheduling & Scaling · Tags: scheduling, affinity, taints_

### 32. What is a PodDisruptionBudget and why do you need one?

**Short answer:** A PodDisruptionBudget (PDB) limits how many pods of an app can be down at the same time during voluntary disruptions such as node drains and cluster upgrades. It protects availability while the platform moves pods around.

Voluntary disruptions are things you or the platform do on purpose: node upgrades, scale-down by the autoscaler, `kubectl drain`. A PDB does not protect against crashes or node failure, which are involuntary.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: orders-api
  namespace: shop
spec:
  minAvailable: 2           # or use maxUnavailable: 1
  selector:
    matchLabels:
      app: orders-api
```

When a drain tries to evict a pod through the Eviction API, the API server checks the PDB. If the eviction would break the budget, it is refused and the drain waits and retries.

```bash
kubectl get pdb -n shop
# NAME         MIN AVAILABLE   ALLOWED DISRUPTIONS
# orders-api   2               1
```

**Choosing values**
- Use `maxUnavailable: 1` for large Deployments, because it scales with replicas.
- Percentages work too (`maxUnavailable: 25%`).
- Never set `minAvailable` equal to the replica count: the budget then allows zero disruptions and **blocks every node upgrade**.
- A single-replica app with `minAvailable: 1` also blocks drains. Run at least two replicas.

**Gotcha:** an AKS upgrade can get stuck on a PDB that allows no disruptions. The fix is to scale up the app or relax the PDB, not to force delete pods.

**Interview tip:** Pair it with the upgrade question: "node surge plus PDB plus readiness probes is what makes upgrades safe."

_Module: Scheduling & Scaling · Tags: pdb, availability, upgrades_

### 33. What are Ingress controllers and the Gateway API?

**Short answer:** An Ingress controller is the component that implements Ingress rules (NGINX, Traefik, HAProxy, cloud gateways). The Gateway API is the newer, more expressive successor to Ingress. It reached general availability (v1.0) in October 2023, and it separates roles: the platform team owns the Gateway, app teams own the routes.

**Why a successor?** Ingress is small, so every controller invented its own annotations for things like header matching, retries and traffic splitting. Gateway API makes those features part of the standard.

| Resource | Owner | Purpose |
| --- | --- | --- |
| `GatewayClass` | Infrastructure provider | Which controller implementation |
| `Gateway` | Platform team | Listeners: ports, protocols, TLS |
| `HTTPRoute` (also GRPCRoute, TLSRoute) | App team | Host, path, header rules and backends |

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: shared-gw
  namespace: infra
spec:
  gatewayClassName: example-class
  listeners:
    - name: https
      protocol: HTTPS
      port: 443
      tls:
        mode: Terminate
        certificateRefs:
          - name: shop-tls
      allowedRoutes:
        namespaces:
          from: All
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: orders
  namespace: shop
spec:
  parentRefs:
    - name: shared-gw
      namespace: infra
  hostnames: ["shop.example.com"]
  rules:
    - matches:
        - path: { type: PathPrefix, value: /orders }
      backendRefs:
        - name: orders-api
          port: 80
          weight: 90
        - name: orders-api-canary
          port: 80
          weight: 10
```

The weights show built-in canary splitting without annotations.

**Practical advice:** Ingress still works and is fine for simple HTTP. For new platforms, check that your controller supports Gateway API (Application Gateway for Containers, Envoy Gateway, Istio, NGINX Gateway Fabric and others do). The Ingress-NGINX project was announced for retirement in March 2026, so plan for a migration; verify the current status before you decide.

**Interview tip:** Highlight the role split and the portable features. It shows you think about team boundaries, not just YAML.

_Module: Networking · Tags: ingress, gateway-api, k8s-1.28_

### 34. How do NetworkPolicies work?

**Short answer:** A NetworkPolicy is a firewall rule for pods, based on labels. By default all pods can talk to all pods. Once a policy selects a pod, only the traffic the policies allow reaches it. The CNI plugin must support NetworkPolicy, or the objects do nothing.

Rules are **additive allow lists**: there are no deny rules. A pod with no policy is open. A pod selected by any policy for a direction (ingress or egress) is closed for that direction except what is allowed.

**Pattern 1: default deny for a namespace**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: shop
spec:
  podSelector: {}          # all pods in the namespace
  policyTypes: ["Ingress", "Egress"]
```

**Pattern 2: allow only what is needed**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: orders-api-allow
  namespace: shop
spec:
  podSelector:
    matchLabels:
      app: orders-api
  policyTypes: ["Ingress", "Egress"]
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: web
      ports:
        - port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - port: 5432
    - to:                       # allow DNS
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: kube-system
      ports:
        - port: 53
          protocol: UDP
        - port: 53
          protocol: TCP
```

**Gotchas**
- Forgetting DNS in egress rules breaks name resolution. This is the most common mistake.
- `from` with `namespaceSelector` and `podSelector` as **separate list items** means OR. In **one item** it means AND.
- On AKS, you pick a policy engine (Azure Network Policy Manager, Calico or Cilium) when you create the cluster.
- Plain NetworkPolicy works at layer 3 and 4. It cannot filter by HTTP path or by DNS name. Cilium and service meshes add that.

**Interview tip:** Say "default deny, then allow", and mention testing with a debug pod and `curl` after you apply the policy.

_Module: Networking · Tags: networkpolicy, security_

### 35. How does RBAC work in detail?

**Short answer:** RBAC controls who can do which actions on which resources. A Role lists permissions (verbs on resources) inside a namespace, and a ClusterRole does the same cluster-wide. A RoleBinding or ClusterRoleBinding attaches the role to a user, group or ServiceAccount.

| Object | Scope | Meaning |
| --- | --- | --- |
| Role | Namespace | Permissions in one namespace |
| ClusterRole | Cluster | Cluster-wide, or reusable across namespaces, or for non-namespaced resources |
| RoleBinding | Namespace | Grants a Role or ClusterRole within that namespace |
| ClusterRoleBinding | Cluster | Grants a ClusterRole across all namespaces |

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: shop
rules:
  - apiGroups: [""]               # "" is the core API group
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: dev-team-pod-reader
  namespace: shop
subjects:
  - kind: Group
    name: shop-developers          # group from Entra ID
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**ServiceAccounts** are identities for pods. Every pod runs as one (the namespace `default` one unless set). Create one per app, give it only needed rights, and disable token mounting if the app does not call the API (`automountServiceAccountToken: false`).

```bash
kubectl auth can-i delete pods -n shop --as=jane@example.com
kubectl auth can-i --list -n shop --as=system:serviceaccount:shop:orders-api
```

**Good practice**
- Least privilege. Avoid `*` for verbs or resources.
- Bind to groups, not single users.
- Be careful with `secrets` read access, `pods/exec`, `escalate`, `bind` and `impersonate`, which can lead to privilege escalation.
- Review bindings regularly (`kubectl get clusterrolebindings -o wide`).

**Gotcha:** RBAC only has allow rules, and a permission granted anywhere adds up. A Role in namespace A does not give access to B.

**Interview tip:** Walk through a concrete setup: developers get read access in prod and edit in dev, the CI service account can deploy to one namespace only.

_Module: Security · Tags: rbac, serviceaccount, security_

### 36. How do Helm charts work: values, templates and hooks?

**Short answer:** A Helm chart is a folder of Go templates plus default values. Helm renders the templates with your values into plain manifests, applies them as a **release**, and records each version so you can upgrade and roll back.

```text
orders-api/
  Chart.yaml          name, version, appVersion
  values.yaml         defaults
  templates/
    deployment.yaml
    service.yaml
    _helpers.tpl      reusable template snippets
```

```yaml
# values.yaml
replicaCount: 3
image:
  repository: myregistry.azurecr.io/orders-api
  tag: 1.4.3
resources:
  requests:
    cpu: 250m
    memory: 256Mi
```

```text
# templates/deployment.yaml (a Go template, not plain YAML)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
      annotations:
        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}
    spec:
      containers:
        - name: api
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

The `checksum/config` annotation changes when the ConfigMap changes, so pods restart on config updates.

```bash
helm template orders ./orders-api -f values-prod.yaml     # render only
helm lint ./orders-api
helm upgrade --install orders ./orders-api -n shop -f values-prod.yaml --atomic
helm history orders -n shop
helm rollback orders 2 -n shop
```

**Hooks** are templates with an annotation such as `"helm.sh/hook": pre-upgrade`. Use them for database migrations or tests. Hooks are Jobs that Helm runs at a lifecycle point (pre-install, post-install, pre-upgrade, and so on).

**Gotchas:** hooks are not tracked as part of the release, so failed hooks can leave leftovers. Avoid deep template logic. CRDs in the `crds/` folder are installed but never upgraded by Helm.

**Interview tip:** Mention `helm template` and `--atomic` in your CI flow, and that chart versions are pinned.

_Module: Delivery & GitOps · Tags: helm, templates_

### 37. How does dynamic storage provisioning work, and what are access modes?

**Short answer:** With dynamic provisioning, a PVC that names a StorageClass makes the CSI driver create the disk automatically and a PV for it. You never create PVs by hand. Access modes say how many nodes may use the volume at once.

```mermaid
sequenceDiagram
    participant D as Developer
    participant API as API server
    participant P as CSI provisioner
    participant C as Cloud
    D->>API: create PVC with storageClassName
    API->>P: new PVC needs a volume
    P->>C: create disk
    C-->>P: disk id
    P->>API: create PV and bind to PVC
    D->>API: create Pod using the PVC
```

Read it top to bottom: the PVC triggers the disk, then the pod mounts it.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: premium-retain
provisioner: disk.csi.azure.com
parameters:
  skuName: Premium_LRS
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer   # create the disk in the zone where the pod lands
```

**Access modes**

| Mode | Meaning | Typical backend |
| --- | --- | --- |
| ReadWriteOnce (RWO) | One node reads and writes | Azure Disk |
| ReadOnlyMany (ROX) | Many nodes read | Azure Files, NFS |
| ReadWriteMany (RWX) | Many nodes read and write | Azure Files, NFS |
| ReadWriteOncePod (RWOP) | One single pod only (stable since 1.29) | CSI disks |

**Important points**
- `WaitForFirstConsumer` avoids a disk created in zone 1 while the pod is scheduled in zone 2. Zone-bound disks cannot move across zones.
- `allowVolumeExpansion: true` lets you grow a PVC by editing its size. You cannot shrink.
- Snapshots use `VolumeSnapshot` objects with a CSI driver that supports them.
- Reclaim policy: `Delete` removes data with the claim, `Retain` keeps it.

**Gotcha:** an RWO disk can only attach to one node, so a Deployment with several replicas on different nodes sharing one RWO PVC will fail. Use a StatefulSet with per-pod claims, or RWX storage.

**Interview tip:** Mention latency and cost differences between Azure Disk and Azure Files, and that databases belong on block storage.

_Module: Storage & Config · Tags: storage, csi, pvc_

### 38. How do DNS and service discovery work in Kubernetes?

**Short answer:** Every Service gets a DNS name served by CoreDNS inside the cluster. Pods find each other by name, such as `orders-api.shop.svc.cluster.local`, instead of by IP. The kubelet writes the DNS server and search domains into each pod's `/etc/resolv.conf`.

Name forms for a Service `orders-api` in namespace `shop`:
- `orders-api` works from the same namespace.
- `orders-api.shop` works from any namespace.
- `orders-api.shop.svc.cluster.local` is the full name.

Headless Services (`clusterIP: None`) return the pod IPs directly. StatefulSet pods also get names like `pg-0.pg.shop.svc.cluster.local`.

```bash
kubectl run -it --rm dns-test --image=busybox:1.36 --restart=Never -- nslookup orders-api.shop
kubectl exec orders-api-xyz -- cat /etc/resolv.conf
# search shop.svc.cluster.local svc.cluster.local cluster.local
# nameserver 10.0.0.10
# options ndots:5
```

**The `ndots:5` effect:** if a name has fewer than five dots, the resolver first tries it with each search suffix. A lookup for `api.example.com` (two dots) causes several failed queries before the real one. This increases DNS load and latency.

Ways to reduce it:
- Use a fully qualified name with a trailing dot (`api.example.com.`).
- Lower `ndots` in the pod's `dnsConfig`.
- Run NodeLocal DNSCache on busy clusters.

```yaml
spec:
  dnsConfig:
    options:
      - name: ndots
        value: "2"
```

**Troubleshooting**: check CoreDNS pods in `kube-system`, their logs, and CPU. Test from a pod, not from your laptop. A common failure is a NetworkPolicy blocking port 53.

**Gotcha:** clients that cache DNS forever (some JVM and Node setups) keep using old IPs. For Services this is fine because the ClusterIP is stable, but for headless names it matters.

**Interview tip:** The `ndots` explanation is a favourite senior question. It shows you know why a "slow DNS" problem appears in busy clusters.

_Module: Networking · Tags: dns, coredns, services_

### 39. What are QoS classes, and how does eviction work?

**Short answer:** Kubernetes labels every pod as Guaranteed, Burstable or BestEffort, based on its requests and limits. When a node runs short of memory or disk, the kubelet evicts pods to protect the node, starting with the lowest class and those exceeding their requests the most.

| QoS class | Rule | Eviction order |
| --- | --- | --- |
| Guaranteed | Every container has CPU and memory requests equal to limits | Last |
| Burstable | At least one request or limit set, but not Guaranteed | Middle |
| BestEffort | No requests or limits at all | First |

```yaml
# Guaranteed: requests equal limits for both CPU and memory
resources:
  requests: { cpu: 500m, memory: 512Mi }
  limits:   { cpu: 500m, memory: 512Mi }
```

```bash
kubectl get pod orders-api-xyz -o jsonpath='{.status.qosClass}'
```

**Two different things:**
- **Kubelet eviction** (node pressure): the kubelet watches memory, disk and PID pressure. When a threshold is crossed (for example free memory under 100Mi), it kills pods. Evicted pods show `Evicted` and the node has a `MemoryPressure` condition. Within a class, pods using the most above their request go first, then lower priority.
- **Kernel OOM kill:** if a container goes above its own memory limit, or the node really runs out of memory, the Linux kernel kills a process. The container shows `OOMKilled`. QoS also sets the OOM score, so BestEffort dies first.

**Priority:** `PriorityClass` lets important pods preempt less important ones during scheduling, and affects eviction order.

**Gotchas:** setting a CPU limit equal to the request just to get Guaranteed can cause throttling. For critical services, Guaranteed memory plus a sensible CPU request is often enough. Also, `emptyDir` and logs count towards ephemeral storage, which can cause disk-pressure evictions.

**Interview tip:** Explain that evicted pods are not restarted on the same node. The controller creates new ones that the scheduler places elsewhere.

_Module: Scheduling & Scaling · Tags: qos, eviction, resources_

### 40. What is the Pod lifecycle and what happens when a Pod is terminated?

**Short answer:** A pod moves from Pending to Running, then to Succeeded or Failed. On deletion the pod is marked Terminating, removed from Service endpoints, runs the preStop hook, gets SIGTERM, and if it does not exit within the grace period (default 30 seconds) gets SIGKILL.

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Running: containers started
    Running --> Succeeded: all exit 0
    Running --> Failed: a container fails
    Running --> Terminating: delete requested
    Terminating --> [*]: SIGTERM then SIGKILL
    Succeeded --> [*]
    Failed --> [*]
```

**Phases:** Pending (accepted, waiting for scheduling or image pull), Running, Succeeded, Failed, Unknown. Container states are Waiting (with a reason such as `ImagePullBackOff`), Running and Terminated.

**Termination sequence**
1. A delete request sets `deletionTimestamp`. The pod shows Terminating.
2. In parallel, the endpoint is removed from Services and the kubelet starts shutdown.
3. The `preStop` hook runs, if defined.
4. Containers receive **SIGTERM**.
5. After `terminationGracePeriodSeconds`, anything left gets **SIGKILL**.
6. The pod object is deleted.

```yaml
spec:
  terminationGracePeriodSeconds: 40
  containers:
    - name: api
      image: myregistry.azurecr.io/orders-api:1.4.3
      lifecycle:
        postStart:
          exec:
            command: ["sh", "-c", "echo started > /tmp/started"]
        preStop:
          exec:
            command: ["sleep", "5"]
```

`restartPolicy` (Always, OnFailure, Never) controls restarts within the pod. Restarts use a backoff of 10s, 20s, 40s up to 5 minutes, which is why you see `CrashLoopBackOff`.

**Gotchas:** the preStop time counts inside the grace period, not extra. A pod stuck in Terminating is often a finalizer or a node that went away. Apps that ignore SIGTERM always take the full 30 seconds to die.

**Interview tip:** Connect this to zero-downtime deploys: the race between SIGTERM and endpoint removal is the reason for preStop sleeps.

_Module: Workloads · Tags: lifecycle, termination, pods_

### 41. What are ResourceQuota and LimitRange?

**Short answer:** ResourceQuota caps the total resources a namespace may use. LimitRange sets default and maximum sizes for each pod or container in a namespace. Together they stop one team from consuming the whole cluster and make sure every pod has requests.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: shop-quota
  namespace: shop-dev
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.memory: 40Gi
    pods: "50"
    persistentvolumeclaims: "10"
    services.loadbalancers: "1"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: shop-defaults
  namespace: shop-dev
spec:
  limits:
    - type: Container
      defaultRequest:        # used when the pod sets no request
        cpu: 100m
        memory: 128Mi
      default:               # used when the pod sets no limit
        memory: 256Mi
      max:
        cpu: "2"
        memory: 2Gi
```

| | ResourceQuota | LimitRange |
| --- | --- | --- |
| Scope | Whole namespace total | Each container, pod or PVC |
| Controls | Sum of requests, limits, object counts | Defaults, minimum, maximum |
| Effect | Rejects new objects when exceeded | Injects defaults, rejects out-of-range |

Behaviour to know:
- If a quota covers CPU or memory, every new pod must set those values, otherwise it is rejected. A LimitRange with defaults solves this.
- Quota is checked when the object is created. Existing pods are not killed.
- You can also limit object counts (pods, services, secrets) and use `scopes` and `PriorityClass` quota.

```bash
kubectl describe quota -n shop-dev
# shows Used and Hard side by side
```

**Gotcha:** a namespace at its quota gives a Deployment that silently fails to create pods. The error is in the ReplicaSet events (`exceeded quota`), not in the pod list.

**Interview tip:** Use them for multi-tenant clusters and for non-production cost control.

_Module: Scheduling & Scaling · Tags: quota, limitrange, multi-tenancy_

### 42. What are admission controllers, and how do OPA Gatekeeper and Kyverno enforce policy?

**Short answer:** Admission controllers are steps in the API server that can change (mutating) or reject (validating) a request after authentication and before it is saved. Policy engines such as Kyverno and OPA Gatekeeper use them to enforce rules like "no latest tag", "must have resource limits" or "only our registry".

Request path: authentication, authorization (RBAC), mutating admission, schema validation, validating admission, then save to etcd.

Built-in admission plugins handle many things, for example `LimitRanger`, `ResourceQuota`, and `PodSecurity`. You can add your own through webhooks, or since Kubernetes 1.30 (stable) with `ValidatingAdmissionPolicy`, which uses CEL expressions with no extra server.

**Kyverno** policies are Kubernetes YAML:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-resource-requests
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: check-requests
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "CPU and memory requests are required."
        pattern:
          spec:
            containers:
              - resources:
                  requests:
                    cpu: "?*"
                    memory: "?*"
```

| Engine | Policy language | Notes |
| --- | --- | --- |
| Kyverno | YAML | Easy to learn, can also mutate and generate |
| OPA Gatekeeper | Rego | Powerful and general, steeper learning curve |
| ValidatingAdmissionPolicy | CEL | Built in, no webhook to run |

**Rollout advice:** start in audit or warn mode, review violations, then switch to enforce. Exclude `kube-system`.

**Gotcha:** a webhook that is down can block all creates in the cluster if its `failurePolicy` is `Fail`. Run policy engines with several replicas and exclude their own namespace.

**Interview tip:** Give examples of policies you would enforce: approved registries, no privileged pods, required labels, requests and limits.

_Module: Security · Tags: admission, policy, kyverno_

### 43. What is a service mesh and when do you need one?

**Short answer:** A service mesh adds a networking layer between your services that handles mutual TLS, retries, timeouts, traffic splitting and metrics, without changing application code. A proxy runs next to each pod (sidecar) or on each node (ambient mode). Use one only if you really need those features.

```mermaid
flowchart LR
    subgraph PA["Pod A"]
        A["orders app"] --> PX1["proxy"]
    end
    subgraph PB["Pod B"]
        PX2["proxy"] --> B["payments app"]
    end
    PX1 -- "mTLS" --> PX2
    CP["Control plane"] -. config .-> PX1
    CP -. config .-> PX2
```

The control plane pushes policy to the proxies. All service traffic flows proxy to proxy.

**What it gives you**
- **Security:** automatic mTLS and identity between services, authorisation rules.
- **Reliability:** retries, timeouts, circuit breaking, outlier detection.
- **Traffic control:** canary splits, mirroring, fault injection.
- **Observability:** uniform request metrics, traces and a service graph.

**What it costs:** extra CPU and memory per pod, added latency (small), a new component to upgrade and debug, and complexity in failures ("is it the app or the proxy?").

| Option | Notes |
| --- | --- |
| Istio | Most features, large. Has a sidecar mode and ambient mode without sidecars |
| Linkerd | Lightweight and simple, focused on mTLS and metrics |
| Cilium service mesh | eBPF based, fewer proxies |
| AKS Istio add-on | Managed Istio control plane on AKS |

**When you do not need one:** a handful of services, where Kubernetes Services, NetworkPolicy, and retries in your client library are enough.

**Decision rule:** adopt a mesh if you must have mTLS everywhere for compliance, or need fine traffic shaping across many teams. Otherwise start without it.

**Interview tip:** Show balance. A strong answer says "useful, but I would first ask which problem it solves and whether a library or the ingress already does it."

_Module: Networking · Tags: service-mesh, istio, mtls_

## Advanced

### 44. [Tech Lead] How do you harden a cluster for security?

**Short answer:** Work in layers: control who can do what (RBAC), restrict what pods may do (Pod Security Standards), restrict network paths (NetworkPolicy), trust only scanned and signed images, manage secrets outside Git, and audit everything. No single control is enough.

| Layer | What to do |
| --- | --- |
| Identity and access | Least-privilege RBAC, no cluster-admin for people day to day, SSO with Microsoft Entra ID on AKS, short-lived access |
| Pod security | Enforce the Pod Security Standards `restricted` profile where possible |
| Network | Default-deny NetworkPolicy, then allow needed flows |
| Images | Scan in CI and registry, use minimal base images, pin by digest, sign with Cosign or Notation |
| Secrets | Key Vault with CSI driver or External Secrets, encryption at rest, rotate |
| Runtime and audit | Audit logs, Defender for Containers or Falco, alerts on exec into pods |
| Supply chain | Only allow images from your registry (admission policy) |
| Platform | Private API server where possible, regular upgrades, patched nodes |

Example: enforce the restricted Pod Security Standard on a namespace using labels, then write containers that comply.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: shop-prod
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
---
apiVersion: v1
kind: Pod
metadata:
  name: orders-api
  namespace: shop-prod
spec:
  automountServiceAccountToken: false
  securityContext:
    runAsNonRoot: true
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: api
      image: myregistry.azurecr.io/orders-api:1.4.2
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
```

**Common mistakes:** running as root, mounting the Docker socket, wildcard RBAC rules, a default ServiceAccount with extra rights, secrets in environment variables printed in logs, no egress rules.

**How a lead drives it:** make the secure way the easy way with a golden Helm chart, admission policies that block unsafe manifests, and a short checklist in code review.

**Interview tip:** Mention the Pod Security Admission replaced PodSecurityPolicy, which was removed in Kubernetes 1.25.

_Module: Security · Tags: tech-lead, security, rbac_

### 45. [Tech Lead] How do you lay out multiple environments and multi-tenant workloads: namespaces or separate clusters?

**Short answer:** Use separate clusters when you need hard isolation (production versus non-production, compliance zones, very different upgrade schedules). Use namespaces inside a cluster to separate teams and services that trust each other reasonably. Most organisations end up with a few clusters and many namespaces.

| Option | Strengths | Weaknesses |
| --- | --- | --- |
| Namespace per team or app | Cheap, simple, shared tooling | Shared control plane and kernel, noisy neighbours, blast radius |
| Cluster per environment | Strong prod isolation, safe upgrade testing | More clusters to operate and pay for |
| Cluster per team | Maximum isolation | High cost and overhead, hard to govern |

**A common layout:** one non-production cluster (dev and staging as namespaces, or separate node pools) and one production cluster per region. Platform components (ingress, monitoring, policy) are installed the same way everywhere through GitOps.

**Making namespaces safe (soft multi-tenancy)**
- RBAC per team, scoped to their namespaces.
- ResourceQuota and LimitRange to stop one team using everything.
- Default-deny NetworkPolicy.
- Pod Security Standards labels.
- Dedicated node pools with taints for sensitive or heavy workloads.
- Per-namespace identities and secrets.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: shop-prod
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    pods: "100"
```

**Decision questions:** Do tenants trust each other? Are there compliance rules? How often must clusters be upgraded independently? What is the cost of a cluster (control plane, system nodes, monitoring)? Who operates it?

**Gotcha:** namespaces share the kernel. Untrusted code needs stronger isolation (separate clusters, sandboxed runtimes, or separate node pools).

**Interview tip:** Answer with a decision, for example "prod and non-prod separate, teams as namespaces with quotas", and explain what would make you change it.

_Module: Operations & Troubleshooting · Tags: tech-lead, multi-tenancy, architecture_

### 46. [Tech Lead] How do you back up Kubernetes and plan disaster recovery?

**Short answer:** Separate three things: cluster configuration (rebuilt from Git), persistent data (backed up by the database or volume snapshots), and cluster state (etcd, mostly handled by the provider on AKS). Decide your RTO and RPO first, then test restores, because an untested backup is only a hope.

**What to protect**
- **Manifests and config:** if you use GitOps, Git is your backup. Rebuilding a cluster means pointing Argo CD or Flux at the repo.
- **Persistent volumes:** use CSI volume snapshots, or Velero with snapshot support, for stateful workloads.
- **Databases:** prefer managed databases (Azure Database for PostgreSQL) with point-in-time restore and geo-replication.
- **Secrets:** the source of truth is Key Vault, not the cluster.
- **etcd:** on self-managed clusters, take regular `etcdctl snapshot save` backups. On AKS, Azure manages the control plane.

```bash
# Velero: daily backup of one namespace, kept 30 days
velero schedule create shop-daily \
  --schedule="0 2 * * *" \
  --include-namespaces shop-prod \
  --ttl 720h

velero restore create --from-backup shop-daily-20260101020000
```

**Region failure plan**
1. Keep a second cluster in a paired region, created from the same Git repo.
2. Replicate data (database geo-replication, geo-redundant storage, ACR geo-replication).
3. Use Azure Front Door or Traffic Manager to switch traffic.
4. Decide active-active versus active-passive based on cost and RTO.

| Strategy | RTO | Cost |
| --- | --- | --- |
| Backup and restore | Hours | Lowest |
| Warm standby cluster | Minutes to an hour | Medium |
| Active-active | Near zero | Highest |

**Practice:** run a game day each quarter. Restore into an empty cluster and time it. Document the steps.

**Gotcha:** Velero restores objects but app-consistent database backups need their own tool. Also, restoring into a cluster with a different Kubernetes version or storage class may need mapping.

**Interview tip:** Start with RTO and RPO from the business, then choose the cheapest design that meets them.

_Module: Operations & Troubleshooting · Tags: tech-lead, backup, disaster-recovery_

### 47. [Tech Lead] What should you know about running on Azure AKS?

**Short answer:** AKS runs and patches the control plane for you. You manage node pools, networking choice, identity, ingress, and upgrades. The important Azure-specific pieces are system and user node pools, workload identity instead of stored credentials, ACR integration, Key Vault secrets through the CSI driver, and your choice of ingress.

**Node pools:** a **system pool** runs core components. **User pools** run your apps. Use separate pools for different VM sizes, spot workloads, or GPU. Use availability zones for resilience.

**Networking:** Azure CNI gives pods VNet addresses, and Azure CNI Overlay saves addresses on large clusters. kubenet is the older, simpler option. Plan address space early because it is hard to change.

**Identity**
- **Microsoft Entra ID** for user login and Azure RBAC.
- **Workload identity** (current approach, replacing the older pod identity): a pod's Kubernetes ServiceAccount is federated with an Azure managed identity, so the pod gets tokens without any secret.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: orders-api
  namespace: shop
  annotations:
    azure.workload.identity/client-id: 00000000-0000-0000-0000-000000000000  # placeholder
---
apiVersion: v1
kind: Pod
metadata:
  name: orders-api
  namespace: shop
  labels:
    azure.workload.identity/use: "true"
spec:
  serviceAccountName: orders-api
  containers:
    - name: api
      image: myregistry.azurecr.io/orders-api:1.4.3
```

**Registry:** attach ACR to the cluster so the kubelet pulls with its managed identity: `az aks update -n aks-shop-prod -g rg-shop --attach-acr myregistry`.

**Secrets:** the **Azure Key Vault provider for the Secrets Store CSI driver** mounts secrets as files or syncs them to Kubernetes Secrets.

**Ingress options**

| Option | Notes |
| --- | --- |
| Application Routing add-on (managed NGINX) | Simple, Microsoft supported |
| Application Gateway for Containers | Azure native layer 7, Gateway API support |
| Self-managed NGINX or Traefik | Full control, you maintain it |
| Istio-based service mesh add-on | If you need a mesh |

**Other useful features:** cluster autoscaler, auto-upgrade channels, Azure Policy add-on, Defender for Containers, managed Prometheus and Grafana.

**Interview tip:** The strongest point is "no secrets in the cluster": workload identity plus Key Vault plus ACR pull through managed identity.

_Module: Cloud & AKS · Tags: tech-lead, aks, azure_

### 48. How does etcd work, and how do you back it up and tune it?

**Short answer:** etcd is a distributed key-value store that holds all Kubernetes state. It uses the Raft consensus algorithm: one leader accepts writes, replicates them to followers, and commits a write once a majority (quorum) has stored it. It is sensitive to disk speed and network latency.

**Consensus in plain words:** with 3 members, a write needs 2 acknowledgements. With 5 members, it needs 3. So 3 members tolerate 1 failure and 5 members tolerate 2. Even numbers add no safety (4 members still tolerate only 1). If quorum is lost, the cluster becomes read-only or unavailable, and Kubernetes stops accepting changes, though running pods keep running.

Kubernetes stores objects under keys such as `/registry/pods/shop/orders-api-abc`. Only the API server talks to etcd. Each change creates a new **revision**, and watches are built on revisions. Old revisions must be compacted, and the database defragmented, or it grows until it hits its size quota (2 GB by default, with an alarm that makes it read-only).

**Backup and restore (self-managed clusters)**

```bash
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-$(date +%F).db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

etcdutl snapshot status /backup/etcd-2026-01-01.db
etcdutl snapshot restore /backup/etcd-2026-01-01.db --data-dir /var/lib/etcd-restore
```

**Tuning and health**
- Use fast SSD or NVMe disks. Slow `fsync` is the most common cause of leader changes and API slowness.
- Keep etcd on dedicated disks, close in network terms, in odd numbers of members across zones.
- Watch `etcd_disk_wal_fsync_duration_seconds`, `etcd_server_leader_changes_seen_total`, and database size.
- Enable auto compaction and run defrag during quiet hours.
- Many large objects (huge ConfigMaps, thousands of Events) and heavy controllers can overload it.

**On AKS** the control plane and etcd are managed by Azure, so you do not back up etcd yourself. You back up your manifests and data (see the backup question).

**Gotcha:** an etcd snapshot restores the whole cluster state to a point in time, including objects that were deleted since. Coordinate it carefully, and restore all control plane members from the same snapshot.

**Interview tip:** Explain quorum with numbers and say why you run 3 or 5, never 2 or 4.

_Module: Internals · Tags: etcd, raft, internals_

### 49. How is the Kubernetes control plane made highly available?

**Short answer:** Run several replicas of the API server behind a load balancer, three or five etcd members, and several scheduler and controller-manager instances where only one is active at a time through leader election. Spread them across failure zones.

| Component | How it is made HA |
| --- | --- |
| kube-apiserver | Stateless, run many copies behind a load balancer, all active |
| etcd | 3 or 5 members with quorum, spread across zones |
| kube-scheduler | Several copies, **one leader** active |
| kube-controller-manager | Several copies, **one leader** active |
| cloud-controller-manager | Same leader election pattern |

**Leader election** uses a `Lease` object in the `kube-system` namespace. The active instance renews the lease every few seconds. If it stops, another instance takes over.

```bash
kubectl get lease -n kube-system
kubectl get lease kube-scheduler -n kube-system -o jsonpath='{.spec.holderIdentity}'
```

**Two topologies for self-managed clusters**
- **Stacked:** etcd runs on the same machines as the control plane. Fewer machines, but losing a node loses both an API server and an etcd member.
- **External etcd:** etcd runs on its own nodes. More machines, better isolation and tuning.

```mermaid
flowchart TD
    LB["Load balancer"] --> A1["API server 1"]
    LB --> A2["API server 2"]
    LB --> A3["API server 3"]
    A1 --> E["etcd cluster<br/>3 members"]
    A2 --> E
    A3 --> E
```

All API servers read and write the same etcd cluster. Clients only know the load balancer address.

**What an outage looks like:** if the whole control plane is down, existing pods continue to run and Services still route, but you cannot deploy, scale, or replace failed pods. That is why control plane health matters most during changes.

**Managed services:** AKS has a free tier with a managed control plane, and a Standard tier with a financially backed uptime SLA (higher with availability zones). Pick the tier by your reliability needs.

**Gotcha:** workloads can also depend on the control plane in surprising ways: operators, admission webhooks and autoscalers all call the API server continually.

**Interview tip:** Say "workloads survive a control plane outage, but self-healing and changes do not", and explain leader election.

_Module: Internals · Tags: control-plane, ha, architecture_

### 50. How does the Kubernetes scheduler pick a node?

**Short answer:** The scheduler watches for pods with no node, then runs two phases for each: **filtering** removes nodes that cannot run the pod, and **scoring** ranks the remaining nodes. The highest score wins, and the scheduler writes a binding that assigns the pod to that node.

```mermaid
flowchart LR
    Q["Pending pod in queue"] --> F["Filter: nodes that fit"]
    F --> S["Score: rank the nodes"]
    S --> B["Bind pod to best node"]
    F -- "no node fits" --> U["Unschedulable: preemption or wait"]
```

Read it left to right. If filtering leaves no node, the pod stays Pending and the scheduler may try preemption.

**Filter checks (examples):** enough unreserved CPU and memory (requests), node selector and affinity match, taints are tolerated, volume zone fits, ports are free, and topology spread constraints hold.

**Score checks (examples):** spread pods evenly, prefer nodes that already have the image, balance resource use, honour preferred affinity, prefer less loaded nodes. Each plugin gives a score and weights are added.

**Preemption:** if a high-priority pod cannot fit, the scheduler can evict lower-priority pods to make room.

**Other facts**
- The scheduler uses only **requests**, never actual usage. A node can be 90 percent full by requests and 10 percent busy by real use.
- It decides at scheduling time only. It never moves running pods. The **descheduler** project can rebalance.
- It is built from plugins in a scheduling framework (queue sort, filter, score, bind). You can run additional schedulers and select one with `schedulerName`.
- For large clusters it checks only a percentage of nodes (`percentageOfNodesToScore`) to stay fast.

```bash
kubectl describe pod orders-api-xyz | grep -A5 Events
# 0/6 nodes are available: 2 Insufficient cpu, 3 node(s) had untolerated taint, 1 node(s) didn't match pod anti-affinity rules.
```

That event message is the filter result, and it is the best debugging tool for Pending pods.

**Gotcha:** requests that are too high leave nodes "full" on paper. Requests that are too low pack too many pods together.

**Interview tip:** Say "filter then score, based on requests, at creation time only."

_Module: Internals · Tags: scheduler, filtering, scoring_

### 51. What are CRI, CNI and CSI, and how does the kubelet use them?

**Short answer:** Kubernetes does not run containers, set up networks, or manage disks itself. It defines three plugin interfaces: CRI for container runtimes, CNI for pod networking, and CSI for storage. The kubelet calls them to do the real work, so each part can be replaced.

| Interface | Meaning | Examples | Who calls it |
| --- | --- | --- | --- |
| CRI (Container Runtime Interface) | Create and manage pods and containers, pull images | containerd, CRI-O | kubelet, over gRPC |
| CNI (Container Network Interface) | Give a pod an IP and connect it to the network | Azure CNI, Calico, Cilium, Flannel | the runtime, when it creates the pod sandbox |
| CSI (Container Storage Interface) | Provision, attach and mount volumes | Azure Disk and Azure Files drivers | kubelet and controller sidecars |

**What the kubelet does:** it watches the API server for pods assigned to its node, then makes the node match. It pulls images, starts containers through CRI, runs probes, mounts volumes, reports pod and node status, and enforces restarts and evictions.

**Pod start in order**
1. The kubelet asks the runtime to create a **pod sandbox** (the shared network namespace, kept alive by a small "pause" container).
2. The runtime calls the **CNI** plugin to give the sandbox an IP and routes.
3. The kubelet and the **CSI** node plugin mount the volumes.
4. The kubelet pulls images and starts init containers, then app containers.
5. Probes start and the pod is reported Ready.

```bash
# On a node (for example via kubectl debug node/...)
crictl ps                       # containers seen by the CRI
crictl pods
ls /etc/cni/net.d/              # CNI configuration
kubectl get csidrivers
kubectl get nodes -o wide       # shows the container runtime and version
```

**Why it matters:** CNI choice decides pod IP space, policy features and performance. CSI drivers decide which disks, snapshots and resize features you get. A broken CNI shows up as pods stuck in `ContainerCreating` with a network plugin error.

**Gotcha:** the kubelet and runtime must use the same cgroup driver (systemd is the usual choice), or pods fail to start.

**Interview tip:** State the principle, "Kubernetes defines the interface, vendors implement it", and give one example of each.

_Module: Internals · Tags: kubelet, cri, cni, csi_

### 52. How does Kubernetes networking work in depth: kube-proxy, iptables, IPVS and eBPF?

**Short answer:** Kubernetes requires that every pod can reach every other pod by IP without NAT. The CNI plugin provides that. A Service IP is virtual: kube-proxy (or an eBPF replacement) programs the node so packets sent to a Service IP get rewritten to the IP of one healthy pod.

**The rules of the model**
- Every pod gets its own IP.
- Pods can talk to all other pods without NAT.
- Nodes can talk to all pods.
- Services give a stable virtual IP over a changing set of pods.

**How a Service works:** kube-proxy on each node watches Services and EndpointSlices and writes rules. When a pod calls `10.0.12.5:80` (the ClusterIP), the kernel rewrites the destination (DNAT) to a pod IP such as `10.244.2.17:8080`. There is no process listening on the ClusterIP, it only exists in rules.

| Mode | How | Characteristics |
| --- | --- | --- |
| iptables (default) | Chains of rules, random pick by probability | Simple, rule lookup is linear, slow to update at tens of thousands of Services |
| IPVS | Kernel load balancer with hash tables | Scales better, more algorithms (round robin, least connections) |
| nftables (beta in 1.31, GA in 1.33) | Newer netfilter framework | Faster rule updates than iptables |
| eBPF (Cilium) | Programs in the kernel, can replace kube-proxy | Fast, no long rule chains, richer policy and visibility |

```mermaid
sequenceDiagram
    participant A as Pod A
    participant N as Node kernel rules
    participant B as Pod B on another node
    A->>N: connect to Service IP 10.0.12.5:80
    N->>N: DNAT to pod IP 10.244.2.17:8080
    N->>B: forward over CNI network
    B-->>A: reply, source rewritten back
```

Read it top to bottom: the client sees only the Service IP. The rewrite is done by the kernel, and replies are un-rewritten via connection tracking (conntrack).

**Cross-node pod traffic:** the CNI uses either an overlay (VXLAN or IP-in-IP encapsulation) or direct routing and cloud-native networking (Azure CNI gives pods real VNet IPs).

**External traffic:** `NodePort` and `LoadBalancer` Services use the same DNAT rules. `externalTrafficPolicy: Local` keeps the client IP and avoids an extra hop, but only sends to pods on that node.

**Gotchas:** conntrack table exhaustion causes random dropped connections under load. Long-lived connections (gRPC, HTTP/2) stick to one pod because balancing happens per connection, so use client-side or L7 balancing.

**Interview tip:** Draw the path: client, Service IP, DNAT, pod. Then say where eBPF changes it.

_Module: Networking · Tags: networking, kube-proxy, ebpf_

### 53. What is the API server request flow, and how do watches work?

**Short answer:** Every request to the API server passes authentication, authorization, mutating admission, validation, validating admission, and is then stored in etcd. Components do not poll. They open a **watch**, a long-lived stream from the API server that sends events when objects change.

```mermaid
flowchart LR
    R["Request"] --> AN["Authentication"]
    AN --> AZ["Authorization: RBAC"]
    AZ --> MA["Mutating admission"]
    MA --> V["Schema validation"]
    V --> VA["Validating admission"]
    VA --> E[("etcd")]
```

Read it left to right: a failure in any stage rejects the request.

**Stages explained**
1. **Authentication:** who are you? Client certificate, bearer token, OIDC (Entra ID).
2. **Authorization:** may you do this? Usually RBAC.
3. **Mutating admission:** webhooks and plugins that change the object (inject sidecar, add defaults).
4. **Validation:** the object matches the schema.
5. **Validating admission:** policies that approve or reject.
6. **Persist:** written to etcd with a new `resourceVersion`.

**Optimistic concurrency:** every object has a `resourceVersion`. If two clients update the same object, the second gets a `409 Conflict` and must read again and retry. This avoids locks.

**Watches**

```bash
# Raw API: stream events for pods in the shop namespace
kubectl get --raw "/api/v1/namespaces/shop/pods?watch=true&allowWatchBookmarks=true" | head -c 600

# Same idea at the CLI level
kubectl get pods -n shop --watch
```

A client lists the objects once (getting a `resourceVersion`), then watches from that version and receives `ADDED`, `MODIFIED` and `DELETED` events. The API server keeps a **watch cache** in memory, so most reads and watches never touch etcd. If a client falls too far behind, it gets a "resource version too old" error and must list again.

**Other useful features**
- **Server-side apply** tracks which field manager owns each field, so tools do not overwrite each other.
- **API Priority and Fairness** protects the server from one noisy client.
- **Finalizers** stop deletion until a cleanup finishes.

**Gotcha:** a controller or operator that lists everything in a loop, or a large number of watchers, can overload the API server. Use informers with caching and label selectors.

**Interview tip:** Mention the 409 conflict and the watch cache, because they show you know why Kubernetes scales as it does.

_Module: Internals · Tags: api-server, watch, internals_

### 54. How do controllers, informers and work queues work?

**Short answer:** A controller keeps a local cache of objects, updated by watch events through an **informer**. Events do not hold data to act on. They only put the object's key into a **work queue**. Workers take keys from the queue and run the **reconcile** function, which compares desired and actual state and fixes the difference.

```mermaid
flowchart LR
    API["API server"] -- "list and watch" --> INF["Informer"]
    INF --> CACHE["Local cache"]
    INF -- "event: add key" --> Q["Work queue"]
    Q --> W["Worker: reconcile"]
    W -- "read" --> CACHE
    W -- "create or update objects" --> API
```

Read it from the left: the informer fills the cache and the queue. Workers read the cache and write changes to the API server.

**Why this design**
- **Informer and cache:** one watch per type serves all reads, so the controller does not hit the API server for every check.
- **Work queue:** it removes duplicates (ten changes to one object become one pending key), supports retries with exponential backoff, and rate limits work.
- **Level based:** reconcile gets only the object name. It looks at the current state and does whatever is needed, so a lost event does not matter. A periodic resync also re-queues everything.

A Deployment controller in plain words: it sees a Deployment key, reads the Deployment and its ReplicaSets from the cache, decides the right ReplicaSet counts, and creates or updates ReplicaSets.

**A reconcile loop in Go shape (controller-runtime style)**

```go
func (r *OrderReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	var order shopv1.Order
	if err := r.Get(ctx, req.NamespacedName, &order); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err) // deleted: nothing to do
	}
	// 1. look at the actual state
	// 2. compare with order.Spec
	// 3. create, update or delete child objects to match
	return ctrl.Result{RequeueAfter: time.Minute}, nil
}
```

**Rules for good controllers:** reconcile must be idempotent, never assume you saw every event, set owner references so children are garbage collected, use finalizers for external cleanup, and report progress in `status` conditions.

**Interview tip:** The key phrase is "level-triggered, not edge-triggered". It explains how the system recovers from missed events and restarts.

_Module: Internals · Tags: controllers, informers, client-go_

### 55. How do cgroups enforce requests and limits in the Linux kernel?

**Short answer:** The kubelet and container runtime translate requests and limits into Linux **cgroup** settings. Cgroups group processes and let the kernel control and measure their CPU, memory and other resources. Namespaces give isolation (what a container can see), and cgroups give limits (what it can use).

**CPU**
- **Request** becomes CPU **shares** (cgroup v1) or **weight** (cgroup v2). It only matters when CPUs are busy: it sets each container's fair portion. An idle CPU can still be used by anyone.
- **Limit** becomes a **CFS quota**: for example `cpu.max = 50000 100000` means 50 ms of CPU time per 100 ms period. Exceed it and the container is throttled until the next period.

**Memory**
- **Request** is used by the scheduler and for eviction ordering. It is not a hard kernel reservation.
- **Limit** becomes `memory.max`. If the container cannot free memory when it hits the limit, the kernel's OOM killer ends a process in that cgroup. The container exits with code 137 and reason `OOMKilled`.
- Page cache counts towards the limit, but the kernel reclaims it first, so high "usage" numbers are not always a problem. Watch the working set instead.

```bash
# Inside a container on a cgroup v2 node
cat /sys/fs/cgroup/cpu.max        # prints: 50000 100000
cat /sys/fs/cgroup/memory.max     # prints: 536870912
cat /sys/fs/cgroup/cpu.stat       # nr_throttled and throttled_usec
```

```yaml
resources:
  requests: { cpu: 250m, memory: 256Mi }
  limits:   { cpu: 500m, memory: 512Mi }
```

The values above produce about `cpu.max 50000 100000` and `memory.max 536870912`. In cgroup v2, memory has more detail (`memory.high`, `memory.min`) which newer Kubernetes versions use for memory QoS (still alpha).

**Cgroup v2:** the default on modern distributions and on current AKS node images, with better accounting and the base for newer features. Kubernetes supports it since 1.25 (stable).

**Related feature:** in-place pod resize lets you change a running container's requests and limits without restarting it. It was alpha in 1.27, beta and on by default in 1.33, with a `resize` subresource, so check your version.

**Gotchas:** a runtime that ignores the container limit (for example JVM or Go heap sizing) can cause OOM kills. Set `GOMEMLIMIT` for Go to slightly below the memory limit, and the Node heap size (`--max-old-space-size`) below the limit.

**Interview tip:** Explain throttling (CFS quota) versus OOM kill (memory.max) and why memory cannot be throttled.

_Module: Internals · Tags: cgroups, kernel, resources_

### 56. What happens end to end when you run `kubectl apply -f deployment.yaml`?

**Short answer:** kubectl sends the object to the API server, which authenticates, authorizes, admits and stores it in etcd. The Deployment controller creates a ReplicaSet, which creates pods. The scheduler assigns each pod to a node. The kubelet on that node starts the containers through the runtime, CNI and CSI. Probes then mark the pod Ready and the endpoint controller adds it to the Service.

```mermaid
sequenceDiagram
    participant K as kubectl
    participant A as API server
    participant E as etcd
    participant C as Controllers
    participant S as Scheduler
    participant L as Kubelet
    K->>A: PATCH/POST Deployment (server-side apply)
    A->>E: store (after auth and admission)
    C->>A: watch sees Deployment, create ReplicaSet
    C->>A: ReplicaSet controller creates Pods
    S->>A: watch sees unscheduled Pods, bind to node
    L->>A: watch sees Pod for my node
    L->>L: CRI starts containers, CNI IP, CSI volumes
    L->>A: update Pod status Ready
```

Read it top to bottom. Every arrow to the API server is a read, watch or write. Components never talk to each other directly.

**Step by step**
1. **kubectl** reads your kubeconfig, finds the cluster and credentials, validates the YAML and sends an HTTPS request (create, or a patch with `apply`).
2. **API server:** authentication, RBAC, mutating admission (for example defaults or sidecar injection), schema validation, validating admission (policies). The object is saved in **etcd**.
3. **Deployment controller** (in controller-manager) sees the new Deployment via its watch and creates a **ReplicaSet**.
4. **ReplicaSet controller** creates the requested number of **Pods** with no node.
5. **Scheduler** filters and scores nodes and writes the node name on each pod (a binding).
6. **Kubelet** on the chosen node sees the pod, asks the **runtime** to create the sandbox and pull images, **CNI** assigns an IP, **CSI** mounts volumes, containers start.
7. **Probes** pass, the pod becomes Ready. The **EndpointSlice controller** adds its IP to the Service, and **kube-proxy** or the CNI updates routing rules.
8. The Deployment controller updates `status` (available replicas), and `kubectl rollout status` reports success.

```bash
kubectl apply -f deployment.yaml -v=6        # shows the API calls
kubectl get events --sort-by=.lastTimestamp  # Scheduled, Pulling, Pulled, Created, Started
```

**Interview tip:** This is the most common "tie it all together" question. Practise saying it in under two minutes, naming each component once, and note that all communication goes through the API server.

_Module: Internals · Tags: end-to-end, apply, flow_

### 57. What are CRDs and operators, and when should you build one?

**Short answer:** A CustomResourceDefinition (CRD) adds a new object type to the Kubernetes API, such as `Postgres` or `Certificate`. An operator is a controller that watches those custom objects and manages real resources to match them, encoding the knowledge of a human operator (install, upgrade, backup, failover).

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: orderreports.shop.example.com
spec:
  group: shop.example.com
  scope: Namespaced
  names:
    plural: orderreports
    singular: orderreport
    kind: OrderReport
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              required: ["schedule"]
              properties:
                schedule:
                  type: string
                retentionDays:
                  type: integer
                  minimum: 1
---
apiVersion: shop.example.com/v1
kind: OrderReport
metadata:
  name: daily
  namespace: shop
spec:
  schedule: "0 2 * * *"
  retentionDays: 30
```

After the CRD is applied, `kubectl get orderreports` works like any built-in type, with RBAC, watches and validation. The CRD itself does nothing until a controller acts on the objects.

**Operator pattern:** custom resource (desired state) plus controller (reconcile loop). Familiar operators: cert-manager (Certificate), Prometheus Operator, Argo CD (Application), CloudNativePG and other database operators, Strimzi for Kafka.

**Building one:** use Kubebuilder or Operator SDK (Go, based on controller-runtime). Define the API types, write the reconcile function, set owner references, add status conditions, and test with envtest.

| Choose | When |
| --- | --- |
| Use an existing operator | Almost always, for databases, certificates, monitoring |
| Write your own | A repeated platform task with real state and lifecycle, such as provisioning a tenant |
| Helm or CronJob instead | Simple install or periodic work with no ongoing reconciliation |

**Gotchas:** you now own the code, its upgrades and its failure modes. A buggy operator can delete real data. Version your CRDs carefully (conversion webhooks for breaking changes), and use finalizers for cleanup of external resources.

**Interview tip:** Say "the CRD is the data, the operator is the behaviour", and mention you would use an existing operator before writing one.

_Module: Internals · Tags: crd, operators, extensibility_

---

## Resources

Where to read more at the source. Official docs and references come first.

**Official docs**

- [Kubernetes documentation](https://kubernetes.io/docs/home/) — The official docs: concepts, tasks, tutorials and reference. _(beginner)_
- [Kubernetes concepts](https://kubernetes.io/docs/concepts/) — What each object is and how it works: Pods, Services, Deployments, storage. _(beginner)_
- [Debug applications](https://kubernetes.io/docs/tasks/debug/debug-application/) — How to debug Pods, Services and failing deployments step by step. _(intermediate)_
- [Configure liveness, readiness and startup probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) — Probe types, timings and common mistakes. _(beginner)_
- [Resource management for Pods and containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) — Requests, limits, QoS classes and how the kernel enforces them. _(intermediate)_
- [Production best practices](https://kubernetes.io/docs/setup/best-practices/) — Checklists for running clusters in production. _(intermediate)_
- [Security overview](https://kubernetes.io/docs/concepts/security/) — RBAC, Pod Security Standards, network policies, secrets and supply chain. _(intermediate)_
- [Gateway API](https://gateway-api.sigs.k8s.io) — The successor to Ingress: routes, gateways and policies. _(intermediate)_
- [Helm documentation](https://helm.sh/docs/) — Charts, values, templates and releases. _(intermediate)_
- [Argo CD documentation](https://argo-cd.readthedocs.io/en/stable/) — GitOps continuous delivery to Kubernetes. _(intermediate)_
- [Azure Kubernetes Service (AKS) documentation](https://learn.microsoft.com/azure/aks/) — Node pools, identity, networking, upgrades and operations on AKS. _(intermediate)_

**Reference**

- [kubectl quick reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/) — The commands you need every day, in one page. _(beginner)_
- [Kubernetes API reference](https://kubernetes.io/docs/reference/kubernetes-api/) — Every field of every resource. _(intermediate)_

**Tutorial**

- [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/) — Interactive tutorial: create, expose, scale and update an app. _(beginner)_
- [Horizontal Pod Autoscaler walkthrough](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/) — Set up and watch HPA scale a Deployment. _(intermediate)_
- [Kubebuilder Book](https://book.kubebuilder.io) — Build operators and controllers with controller-runtime. _(advanced)_

**Article**

- [Kubernetes blog](https://kubernetes.io/blog/) — Release notes, deprecations and design explanations. _(intermediate)_

**Tool**

- [Datadog: Kubernetes monitoring](https://docs.datadoghq.com/containers/kubernetes/) — Install the agent, collect metrics, logs and traces from a cluster. _(intermediate)_

**Repository**

- [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) — Bootstrap a cluster by hand to understand every component. _(advanced)_
