# WhatsApp RAG - Dashboard de Chatbot Inteligente

Sistema completo de dashboard para gestão de chatbot WhatsApp com tecnologia RAG (Retrieval-Augmented Generation) e integração OpenAI.

## 🚀 Características

- **Autenticação JWT** com Supabase
- **Dashboard responsivo** com tema preto/branco/vermelho
- **Gestão de perfis** de usuários
- **Interface moderna** com shadcn/ui
- **Proteção de rotas** automática
- **Design system** consistente
- **SEO otimizado** para produção

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Autenticação**: Supabase Auth (JWT)
- **Database**: PostgreSQL (Supabase)
- **Roteamento**: React Router DOM
- **Estado**: TanStack Query
- **Build**: Vite + SWC

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd whatsapp-rag

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# Execute em desenvolvimento
npm run dev
```

## 🌐 Deploy no Google Cloud Platform (GCP)

### Opção 1: Cloud Run (Recomendado)

1. **Prepare o ambiente**:
```bash
# Autentique no GCP
gcloud auth login
gcloud config set project SEU-PROJECT-ID

# Habilite APIs necessárias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
```

2. **Deploy automatizado**:
```bash
# Build e deploy em uma única etapa
gcloud builds submit --config cloudbuild.yaml
```

3. **Deploy manual**:
```bash
# Build da imagem
gcloud builds submit --tag gcr.io/SEU-PROJECT-ID/whatsapp-rag

# Deploy no Cloud Run
gcloud run deploy whatsapp-rag \
  --image gcr.io/SEU-PROJECT-ID/whatsapp-rag \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1
```

### Opção 2: App Engine

1. **Crie app.yaml**:
```yaml
runtime: nodejs18
env_variables:
  NODE_ENV: production
handlers:
- url: /static
  static_dir: dist/assets
- url: /.*
  static_files: dist/index.html
  upload: dist/index.html
```

2. **Deploy**:
```bash
npm run build
gcloud app deploy
```

### Opção 3: Firebase Hosting

```bash
# Instale Firebase CLI
npm install -g firebase-tools

# Faça login e inicialize
firebase login
firebase init hosting

# Build e deploy
npm run build
firebase deploy
```

## 🔧 Configuração de Produção

### 1. Variáveis de Ambiente
Substitua no Supabase ou nas configurações do GCP:
- `VITE_SUPABASE_URL`: Sua URL do Supabase
- `VITE_SUPABASE_ANON_KEY`: Sua chave anônima do Supabase

### 2. Configurações do Supabase
1. **Site URL**: Configure para seu domínio de produção
2. **Redirect URLs**: Adicione seu domínio + `/auth`
3. **CORS**: Configure para seu domínio

### 3. Domínio Personalizado (Cloud Run)
```bash
gcloud run domain-mappings create \
  --service whatsapp-rag \
  --domain yourdomain.com \
  --region us-central1
```

## 🔐 Segurança

- ✅ JWT com refresh automático
- ✅ Row Level Security (RLS) no Supabase
- ✅ Headers de segurança configurados
- ✅ CSP (Content Security Policy)
- ✅ Proteção CSRF automática
- ✅ Sanitização de inputs

## 🎨 Design System

### Cores Principais
- **Primary**: Preto (#000000)
- **Secondary**: Branco (#FFFFFF)  
- **Accent**: Vermelho (#DC2626)

### Estrutura
- `src/index.css` - Tokens de design
- `tailwind.config.ts` - Configurações
- `src/components/ui/` - Componentes base

## 📊 Performance

- ✅ Lazy loading automático
- ✅ Code splitting por rota
- ✅ Compressão gzip/brotli
- ✅ Cache otimizado
- ✅ Preconnect para APIs
- ✅ Lighthouse Score 90+

## 🚀 Deploy Rápido

**Para deploy imediato no GCP:**

```bash
# 1. Clone e configure
git clone <repo>
cd whatsapp-rag
npm install

# 2. Configure GCP
gcloud auth login
gcloud config set project SEU-PROJECT-ID

# 3. Deploy automático
gcloud builds submit --config cloudbuild.yaml

# 4. Configure domínio (opcional)
gcloud run domain-mappings create \
  --service whatsapp-rag \
  --domain yourdomain.com \
  --region us-central1
```

## 📱 Mobile & PWA

- ✅ Responsivo completo
- ✅ Touch-friendly
- ✅ PWA-ready
- ✅ Offline fallback

## 🆘 Suporte

- **Issues**: GitHub Issues
- **Docs**: Documentação completa no README
- **Deploy**: Configurações prontas para GCP

---

**🎯 Status**: ✅ Pronto para produção
**🌟 Última atualização**: Janeiro 2025