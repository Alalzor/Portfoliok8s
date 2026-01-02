# Portfolio K8s - Monorepo

Portfolio personal con infraestructura Kubernetes completa.

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
2. Construcción de imagen Docker multi-stage
3. Push a GitHub Container Registry (ghcr.io)
4. Deploy a Kubernetes con rolling update
5. Verificación del despliegue

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

### 2. Configurar Secrets en GitHub

Ve a: **Settings → Secrets and variables → Actions → New repository secret**

Agrega:

**`KUBE_CONFIG`** - Tu kubeconfig en base64:
```bash
# Generar el secret (en tu máquina con acceso al cluster)
cat ~/.kube/config | base64 -w 0
# Copia el output y pégalo como secret
```

### 3. Actualizar imagen en el YAML

Edita `apps/Portfolio/k8s/00-portfolio.yaml` línea 28:
```yaml
image: ghcr.io/TU_USUARIO/portfolio:latest
```

Reemplaza `TU_USUARIO` con tu usuario de GitHub.

### 4. Hacer push y ver el deploy

```bash
git add apps/Portfolio/k8s/00-portfolio.yaml
git commit -m "Update image registry"
git push
```

Ve a **Actions** en GitHub para ver el progreso.

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

## 🐳 Build Docker Local

```bash
cd apps/Portfolio

# Build
docker build -t portfolio:local .

# Run
docker run -p 8080:80 portfolio:local

# Abrir http://localhost:8080
```

## 📝 Deploy Manual

Si necesitas deployar manualmente:

```bash
# Build y push
cd apps/Portfolio
docker build -t ghcr.io/TU_USUARIO/portfolio:v1.0.0 .
docker push ghcr.io/TU_USUARIO/portfolio:v1.0.0

# Deploy
kubectl apply -f k8s/00-portfolio.yaml
kubectl set image deployment/portfolio nginx=ghcr.io/TU_USUARIO/portfolio:v1.0.0 -n portfolio

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

### Pipeline falla en kubectl

Verifica que el secret `KUBE_CONFIG` esté bien configurado:
```bash
# Regenerar
cat ~/.kube/config | base64 -w 0
```

### Pods no arrancan

```bash
kubectl describe pod -n portfolio
kubectl logs -n portfolio <pod-name>
```

### Imagen no se descarga

Verifica permisos del paquete en GitHub:
- Ve a tu perfil → Packages → portfolio
- Settings → Change visibility → Public (o configura imagePullSecrets)

## 📦 Tecnologías

- **Frontend**: Astro + Tailwind CSS
- **Container**: Docker multi-stage (Node + Nginx)
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Registry**: GitHub Container Registry (ghcr.io)
- **Monitoring**: Grafana + Loki
- **Ingress**: Nginx Ingress Controller
- **Load Balancer**: MetalLB
- **Network**: Calico
- **Certs**: cert-manager

## 📄 Licencia

MIT
