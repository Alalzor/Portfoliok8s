# Portfolio K8s - Monorepo

> **⚠️ NOTICE: The portfolio web application has been moved to a dedicated repository**
> 
> **New Repository**: [Alalzor.github.io](https://github.com/Alalzor/Alalzor.github.io)  
> **Live Site**: [https://alalzor.github.io](https://alalzor.github.io)
> 
> This repository now contains only the Kubernetes infrastructure and monitoring configuration.

---

Kubernetes infrastructure configuration for home lab deployment.

## 📁 Estructura del Proyecto

```
portfoliok8s/
├── apps/
│   ├── Portfolio/          # Aplicación Astro del portfolio
│   │   ├── src/           # Código fuente
│   │   ├── public/        # Assets estáticos
│   │   ├── Dockerfile     # Multi-stage build (Astro + Nginx)
│   │   └── k8s/          # Manifiestos K8s del portfolio
│   ├── grafana/          # Configuración Grafana
│   └── loki/             # Configuración Loki
├── infraestructure/      # Infraestructura K8s base
│   ├── calico/
│   ├── cert-manager/
│   ├── ingress-controller/
│   ├── metalb/
│   └── namespaces/
├── certs/                # Certificados
├── scripts/              # Scripts de utilidad
└── .github/
    └── workflows/        # CI/CD pipelines
```

## 🚀 Deployment Automático

El portfolio se despliega automáticamente cuando:
- Haces push a `main` o `master`
- Modificas archivos en `apps/Portfolio/`
- O ejecutas el workflow manualmente

### Pipeline:
1. Build del proyecto Astro (`npm run build`)
2. Construcción de imagen con Podman (multi-stage)
3. Push a GitHub Container Registry con versionado SHA
4. Deploy a Kubernetes con rolling update
5. Verificación del despliegue

Cada commit genera una imagen única con tag basado en el SHA del commit, evitando problemas con `:latest`.

## ⚙️ Configuración Inicial

### 1. Crear el repositorio en GitHub

```bash
# Inicializar Git
git init
git add .
git commit -m "Initial commit: Portfolio K8s monorepo"

# Conectar con GitHub (crea el repo primero en github.com)
git remote add origin https://github.com/TU_USUARIO/portfoliok8s.git
git branch -M main
git push -u origin main
```

### 2. Configurar Self-Hosted Runner

Instala el runner en tu cluster de Kubernetes:

```bash
# Crear directorio para el runner
mkdir ~/actions-runner && cd ~/actions-runner

# Descargar el runner (versión para Linux x64)
curl -o actions-runner-linux-x64-2.321.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.321.0/actions-runner-linux-x64-2.321.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.321.0.tar.gz

# Configurar (obtén el token desde: Settings → Actions → Runners → New self-hosted runner)
./config.sh --url https://github.com/TU_USUARIO/portfoliok8s --token TU_TOKEN

# Instalar como servicio
sudo ./svc.sh install
sudo ./svc.sh start
```

### 3. Instalar Podman en el runner

```bash
sudo apt update
sudo apt install -y podman

# Configurar registries
sudo tee /etc/containers/registries.conf > /dev/null <<'EOF'
unqualified-search-registries = ["docker.io"]

[[registry]]
prefix = "docker.io"
location = "docker.io"

[[registry]]
prefix = "ghcr.io"
location = "ghcr.io"
EOF
```

### 4. Actualizar imagen en el YAML

Edita `apps/Portfolio/k8s/00-portfolio.yaml`:
```yaml
image: ghcr.io/tu_usuario/portfolio:latest  # minúsculas obligatorias
```

### 5. Push y deploy automático

```bash
git add .
git commit -m "Configure self-hosted runner"
git push
```

El workflow se ejecutará automáticamente en tu runner.

## 🔧 Desarrollo Local

```bash
cd apps/Portfolio

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build local
npm run build

# Preview del build
npm run preview
```

## 🐳 Build Local

```bash
cd apps/Portfolio

# Build con Podman
podman build -t portfolio:local .

# Run
podman run -p 8080:80 portfolio:local

# Abrir http://localhost:8080
```

O con Docker si lo tienes instalado:
```bash
docker build -t portfolio:local .
docker run -p 8080:80 portfolio:local
```

## 📝 Deploy Manual

Si necesitas deployar manualmente:

```bash
# Build y push con Podman
cd apps/Portfolio
podman build -t ghcr.io/tu_usuario/portfolio:v1.0.0 .
echo "TU_TOKEN" | podman login ghcr.io -u tu_usuario --password-stdin
podman push ghcr.io/tu_usuario/portfolio:v1.0.0

# Deploy
kubectl apply -f k8s/00-portfolio.yaml
kubectl set image deployment/portfolio nginx=ghcr.io/tu_usuario/portfolio:v1.0.0 -n portfolio

# Verificar
kubectl rollout status deployment/portfolio -n portfolio
kubectl get pods -n portfolio
```

## 🔄 Rollback

```bash
# Ver historial
kubectl rollout history deployment/portfolio -n portfolio

# Rollback a la versión anterior
kubectl rollout undo deployment/portfolio -n portfolio

# Rollback a versión específica
kubectl rollout undo deployment/portfolio --to-revision=2 -n portfolio
```

## 📊 Monitoreo

- **Grafana**: Accede a través del Ingress configurado
- **Loki**: Logs centralizados
- **Pods**: `kubectl get pods -n portfolio`
- **Logs**: `kubectl logs -f deployment/portfolio -n portfolio`

## 🛠️ Troubleshooting

### Runner no aparece como activo

```bash
# Verificar estado del servicio
sudo systemctl status actions.runner.*.service

# Ver logs
journalctl -u actions.runner.*.service -f
```

### Pipeline falla en build

Verifica que Podman esté instalado en el runner:
```bash
podman version
podman info
```

### Pods no arrancan

```bash
kubectl describe pod -n portfolio
kubectl logs -n portfolio <pod-name>
```

### Imagen no se descarga

Verifica permisos del paquete en GitHub:
- Ve a tu perfil → Packages → portfolio
- Settings → Change visibility → Public

## 📦 Tecnologías

- **Frontend**: Astro v4.0.0 + Tailwind CSS
- **Container Runtime (K8s)**: containerd
- **Build Tool**: Podman v4.9.3 (rootless)
- **Container Image**: Multi-stage (Node 20 Alpine + Nginx Alpine)
- **Orchestration**: Kubernetes v1.30.14
- **CI/CD**: GitHub Actions (self-hosted runner)
- **Registry**: GitHub Container Registry (ghcr.io)
- **Versioning**: SHA-based image tagging
- **Monitoring**: Grafana + Loki + Prometheus
- **Ingress**: Nginx Ingress Controller
- **Load Balancer**: MetalLB v0.14.9
- **Network**: Calico v3.31.1
- **Certs**: cert-manager
- **Access**: Tailscale Funnel

## 📄 Licencia

MIT
