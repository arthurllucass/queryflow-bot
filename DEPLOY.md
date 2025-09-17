# 🚀 Guia de Deploy - WhatsApp RAG

## Deploy no Google Cloud Platform (GCP)

### ✅ Pré-requisitos

1. **Conta GCP** ativa com billing habilitado
2. **gcloud CLI** instalado ([Download](https://cloud.google.com/sdk/docs/install))
3. **Docker** instalado (opcional, para testes locais)

### 🛠️ Configuração Inicial

```bash
# 1. Faça login no GCP
gcloud auth login

# 2. Crie ou selecione um projeto
gcloud projects create SEU-PROJECT-ID
gcloud config set project SEU-PROJECT-ID

# 3. Habilite APIs necessárias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 🚀 Deploy Automático (Recomendado)

```bash
# Clone o repositório
git clone <seu-repositorio>
cd whatsapp-rag

# Torne o script executável
chmod +x deploy-gcp.sh

# Execute o deploy
./deploy-gcp.sh SEU-PROJECT-ID
```

### 📋 Deploy Manual

#### Método 1: Cloud Build + Cloud Run

```bash
# Build e deploy em uma etapa
gcloud builds submit --config cloudbuild.yaml

# Verificar status
gcloud run services list
```

#### Método 2: Docker + Cloud Run

```bash
# Build da imagem
docker build -t gcr.io/SEU-PROJECT-ID/whatsapp-rag .

# Push para Container Registry
docker push gcr.io/SEU-PROJECT-ID/whatsapp-rag

# Deploy no Cloud Run
gcloud run deploy whatsapp-rag \
  --image gcr.io/SEU-PROJECT-ID/whatsapp-rag \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1000m \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production
```

### 🌐 Configuração de Domínio

#### Domínio Personalizado

```bash
# Mapeie seu domínio
gcloud run domain-mappings create \
  --service whatsapp-rag \
  --domain yourdomain.com \
  --region us-central1

# Verifique o status
gcloud run domain-mappings list
```

#### SSL Automático

O Cloud Run configura SSL automaticamente para domínios personalizados.

### ⚙️ Configurações de Produção

#### 1. Variáveis de Ambiente

No console do GCP ou via CLI:

```bash
gcloud run services update whatsapp-rag \
  --set-env-vars NODE_ENV=production \
  --region us-central1
```

#### 2. Configurações do Supabase

**⚠️ IMPORTANTE**: Configure no Supabase Dashboard:

1. **Site URL**: `https://yourdomain.com` ou URL do Cloud Run
2. **Redirect URLs**: 
   - `https://yourdomain.com/auth`
   - `https://your-cloudrun-url.run.app/auth`
3. **CORS Origins**: Mesmo que acima

#### 3. Scaling e Performance

```bash
# Configuração de escala
gcloud run services update whatsapp-rag \
  --min-instances 0 \
  --max-instances 10 \
  --cpu 1000m \
  --memory 512Mi \
  --concurrency 100 \
  --region us-central1
```

### 📊 Monitoramento

#### Logs

```bash
# Ver logs em tempo real
gcloud run services logs tail whatsapp-rag --region us-central1

# Logs específicos
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=whatsapp-rag" --limit 50
```

#### Métricas

- **Console**: https://console.cloud.google.com/run
- **Monitoring**: https://console.cloud.google.com/monitoring

### 🔧 Troubleshooting

#### Erro comum: "Service not found"
```bash
# Verifique a região
gcloud run services list

# Deploy na região correta
gcloud run deploy whatsapp-rag --region us-central1
```

#### Erro: "Permission denied"
```bash
# Configure as permissões
gcloud projects add-iam-policy-binding SEU-PROJECT-ID \
  --member="user:seu-email@gmail.com" \
  --role="roles/run.admin"
```

#### Erro de build
```bash
# Verifique os logs do Cloud Build
gcloud builds log BUILD-ID
```

### 🔒 Segurança

#### IAM e Permissões

```bash
# Criar service account específica
gcloud iam service-accounts create whatsapp-rag-sa

# Atribuir permissões mínimas
gcloud projects add-iam-policy-binding SEU-PROJECT-ID \
  --member="serviceAccount:whatsapp-rag-sa@SEU-PROJECT-ID.iam.gserviceaccount.com" \
  --role="roles/run.invoker"
```

#### Firewall e Rede

Cloud Run já vem com configurações seguras por padrão.

### 💰 Otimização de Custos

```bash
# Configuração econômica
gcloud run services update whatsapp-rag \
  --min-instances 0 \
  --max-instances 3 \
  --cpu 1000m \
  --memory 256Mi \
  --region us-central1
```

### 🎯 Checklist Final

- [ ] APIs habilitadas
- [ ] Billing configurado
- [ ] Build funcionando
- [ ] Deploy realizado
- [ ] Domínio configurado (opcional)
- [ ] Supabase configurado
- [ ] SSL ativo
- [ ] Logs funcionando
- [ ] Monitoramento ativo

### 📞 Suporte

- **GCP Support**: Console do Google Cloud
- **Issues**: GitHub do projeto
- **Docs**: Este arquivo

---

**⚡ Deploy completo em ~5 minutos!**