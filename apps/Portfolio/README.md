# DevOps Portfolio - Alalzor

Professional portfolio for ASIR Technician specialized in DevOps and Systems Administration.

## 🚀 Tech Stack

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS  
- **Deployment**: Docker + Nginx (optional)
- **Language**: TypeScript

## 📦 Features

- ✅ Responsive and professional design
- ✅ Optimized for production
- ✅ Ultra-fast static pages
- ✅ Easy to customize
- ✅ SEO optimized
- ✅ Real GitHub projects integration
- ✅ Docker ready

## 🛠️ Local Development

### Requirements

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

Site will be available at `http://localhost:4321`

## 📁 Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   │   ├── home/    # Home page specific components
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── Skills.astro
│   │   └── Certifications.astro
│   ├── layouts/     # Page layouts
│   ├── pages/       # Routes (file-based routing)
│   └── env.d.ts
├── Dockerfile       # Docker configuration
├── docker-compose.yml
├── nginx.conf       # Nginx server config
└── package.json
```

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t alejandro-portfolio:latest .
```

### Run Container

```bash
docker run -d -p 8080:80 --name portfolio alejandro-portfolio:latest
```

### Using Docker Compose

```bash
docker-compose up -d
```

## 🌐 Deploy Options

### Option 1: Static Hosting (Recommended)

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### Option 2: Kubernetes

Deploy to your Kubernetes cluster using the included manifests.

## 📝 Customization

### Personal Data

Update your information in these files:
- `src/components/home/Hero.astro` - Name and title
- `src/components/Contact.astro` - Contact information
- `src/components/Experience.astro` - Work experience
- `src/components/Projects.astro` - GitHub projects
- `src/components/Skills.astro` - Technical skills
- `src/components/Certifications.astro` - Certifications

### Colors & Themes

Tailwind configuration: `tailwind.config.mjs`

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 👤 Author

**Alalzor**
- GitHub: [@Alalzor](https://github.com/Alalzor)
- LinkedIn: [alex-almagro](https://www.linkedin.com/in/alex-almagro-dislex4a)
- Email: aalmtor@upvnet.upv.es
# Rebuild at 01/20/2026 13:29:23
