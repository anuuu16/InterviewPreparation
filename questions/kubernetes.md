# Kubernetes

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

13 questions · 0 favorites

## Contents

**Basic**

- [1. Explain the main components of a Kubernetes cluster.](#1-explain-the-main-components-of-a-kubernetes-cluster)
- [2. Pod vs Deployment vs ReplicaSet vs StatefulSet vs DaemonSet vs Job?](#2-pod-vs-deployment-vs-replicaset-vs-statefulset-vs-daemonset-vs-job)
- [3. What are Service types and how does Ingress differ?](#3-what-are-service-types-and-how-does-ingress-differ)
- [4. ConfigMap vs Secret, and how do you manage secrets safely?](#4-configmap-vs-secret-and-how-do-you-manage-secrets-safely)

**Intermediate**

- [5. Liveness vs readiness vs startup probes?](#5-liveness-vs-readiness-vs-startup-probes)
- [6. Requests vs limits, QoS classes, and what happens on OOM or CPU throttling?](#6-requests-vs-limits-qos-classes-and-what-happens-on-oom-or-cpu-throttling)
- [7. How do rolling updates work, and how do you roll back or do canary/blue-green?](#7-how-do-rolling-updates-work-and-how-do-you-roll-back-or-do-canaryblue-green)
- [8. How does autoscaling work (HPA, VPA, Cluster Autoscaler)?](#8-how-does-autoscaling-work-hpa-vpa-cluster-autoscaler)
- [9. A pod is in `CrashLoopBackOff` / `Pending` / `ImagePullBackOff`. How do you debug?](#9-a-pod-is-in-crashloopbackoff--pending--imagepullbackoff-how-do-you-debug)
- [10. What are Helm and Kustomize, and how do you handle CI/CD to Kubernetes?](#10-what-are-helm-and-kustomize-and-how-do-you-handle-cicd-to-kubernetes)

**Advanced**

- [11. Explain Kubernetes networking: pod-to-pod, CNI, DNS, and NetworkPolicy.](#11-explain-kubernetes-networking-pod-to-pod-cni-dns-and-networkpolicy)
- [12. How does RBAC work, and how do you harden a cluster?](#12-how-does-rbac-work-and-how-do-you-harden-a-cluster)
- [13. What happens when you run `kubectl apply -f deployment.yaml`?](#13-what-happens-when-you-run-kubectl-apply--f-deploymentyaml)

## Basic

### 1. Explain the main components of a Kubernetes cluster.

**Control plane:** `kube-apiserver` (front door), `etcd` (state store), `kube-scheduler` (places pods), `kube-controller-manager` (reconciliation loops), `cloud-controller-manager`. **Nodes:** `kubelet` (runs pods), `kube-proxy` (service networking), container runtime (containerd). Everything is declarative: you declare desired state; controllers continuously reconcile actual to desired.

_Tags: architecture_

### 2. Pod vs Deployment vs ReplicaSet vs StatefulSet vs DaemonSet vs Job?

- **Pod:** smallest unit, one or more containers sharing network/volumes.
- **ReplicaSet:** keeps N identical pods running.
- **Deployment:** manages ReplicaSets; rolling updates and rollbacks (for stateless apps).
- **StatefulSet:** stable identity/hostnames and per-pod persistent volumes, ordered rollout (databases).
- **DaemonSet:** one pod per node (log/monitoring agents).
- **Job/CronJob:** run-to-completion/scheduled work.

_Tags: workloads_

### 3. What are Service types and how does Ingress differ?

A Service gives pods a stable virtual IP/DNS name and load-balances.
- **ClusterIP:** internal only (default).
- **NodePort:** exposes on each node's port.
- **LoadBalancer:** provisions a cloud LB.
- **ExternalName:** DNS alias.

**Ingress** is an L7 (HTTP/S) routing layer (host/path rules, TLS) implemented by an Ingress controller (NGINX, etc.); one LB can front many services. Gateway API is the successor.

_Tags: networking_

### 4. ConfigMap vs Secret, and how do you manage secrets safely?

Both inject config as env vars or mounted files. Secrets are only base64-encoded by default, **not encrypted**. Improve with etcd encryption at rest, RBAC limits, and external managers (Azure Key Vault + CSI driver, External Secrets, Sealed Secrets). Never commit them to git.

_Tags: config, security_

## Intermediate

### 5. Liveness vs readiness vs startup probes?

- **Readiness:** is the pod ready for traffic? Failure removes it from Service endpoints (no restart).
- **Liveness:** is it stuck? Failure makes kubelet restart the container.
- **Startup:** delays the other probes for slow-starting apps.

Don't make liveness depend on downstream services, or an outage restarts everything.

_Tags: probes, reliability_

### 6. Requests vs limits, QoS classes, and what happens on OOM or CPU throttling?

**Requests** are used for scheduling (guaranteed minimum); **limits** are the cap. Exceeding the memory limit gets the container **OOMKilled**; exceeding the CPU limit gets it **throttled**. QoS: *Guaranteed* (requests = limits), *Burstable*, *BestEffort* (evicted first). Set sensible requests and be careful with CPU limits (they can cause latency). Use `LimitRange` and `ResourceQuota` per namespace.

_Tags: resources_

### 7. How do rolling updates work, and how do you roll back or do canary/blue-green?

A Deployment replaces pods gradually, governed by `maxSurge` and `maxUnavailable`, and waits for readiness. `kubectl rollout status|history|undo` handles rollback. **Blue-green:** two environments, switch the Service/Ingress selector. **Canary:** route a small traffic % to the new version (Argo Rollouts, Flagger, ingress weights, mesh). Combine with PodDisruptionBudgets and good readiness probes.

_Tags: deployments_

### 8. How does autoscaling work (HPA, VPA, Cluster Autoscaler)?

- **HPA:** scales pod replicas on CPU/memory/custom metrics (needs resource requests set).
- **VPA:** adjusts pod requests/limits.
- **Cluster Autoscaler (or Karpenter):** adds/removes nodes when pods are unschedulable or nodes idle.
- **KEDA:** event-driven scaling (queue length) including scale-to-zero.

_Tags: scaling_

### 9. A pod is in `CrashLoopBackOff` / `Pending` / `ImagePullBackOff`. How do you debug?

1. `kubectl get pod -o wide`, then `kubectl describe pod` (events are key).
2. `kubectl logs <pod> [--previous]`, and `kubectl exec`/`kubectl debug` for a shell.

- **CrashLoopBackOff:** app crash/bad config/failing probe/OOMKilled: check previous logs and exit code.
- **Pending:** insufficient resources, taints/affinity mismatch, unbound PVC.
- **ImagePullBackOff:** wrong image/tag, missing imagePullSecret, registry auth.
Also check Datadog dashboards and node conditions.

_Tags: troubleshooting_

### 10. What are Helm and Kustomize, and how do you handle CI/CD to Kubernetes?

**Helm:** package manager with templated charts and values, releases and rollbacks. **Kustomize:** template-free overlays/patches on plain YAML. Pipeline (GitLab CI): build + test, build image, scan, push to registry, then deploy either by `helm upgrade --install` or **GitOps** (Argo CD/Flux watching a config repo). Promote the same immutable image tag across dev/stage/prod with per-env values.

_Tags: helm, cicd_

## Advanced

### 11. Explain Kubernetes networking: pod-to-pod, CNI, DNS, and NetworkPolicy.

Every pod gets its own IP and can reach any other pod without NAT (flat network), implemented by a **CNI** plugin (Calico, Cilium, Azure CNI). CoreDNS resolves `svc.namespace.svc.cluster.local`. kube-proxy (iptables/IPVS) or eBPF implements Service load-balancing. By default all traffic is allowed; **NetworkPolicy** restricts it (needs a CNI that enforces it): start with default-deny then allow explicitly.

_Tags: networking, security_

### 12. How does RBAC work, and how do you harden a cluster?

RBAC: `Role`/`ClusterRole` (verbs on resources) bound to subjects via `RoleBinding`/`ClusterRoleBinding`; use least privilege and per-workload ServiceAccounts. Hardening: Pod Security Standards (non-root, read-only rootfs, drop capabilities), NetworkPolicies, image scanning/signing, private registry, secrets encryption, admission control (OPA Gatekeeper/Kyverno), keep nodes/cluster patched, and audit logs.

_Tags: security, rbac_

### 13. What happens when you run `kubectl apply -f deployment.yaml`?

kubectl sends the object to the **API server** (authN, authZ, admission controllers, validation) which persists it in **etcd**. The Deployment controller creates a ReplicaSet; the ReplicaSet controller creates Pods. The **scheduler** binds each unscheduled pod to a node (filtering + scoring). The node's **kubelet** sees the assignment, asks the runtime to pull images and start containers, sets up networking via CNI, and reports status back. Endpoints controllers add ready pods to Services.

_Tags: internals_
