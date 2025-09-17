#!/bin/bash

# Deploy script para Google Cloud Platform
# Uso: ./deploy-gcp.sh [PROJECT_ID]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Verifica se gcloud está instalado
if ! command -v gcloud &> /dev/null; then
    error "gcloud CLI não está instalado. Instale em: https://cloud.google.com/sdk/docs/install"
fi

# Verifica se está logado no gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    warning "Você precisa fazer login no gcloud primeiro"
    gcloud auth login
fi

# Define o PROJECT_ID
if [ -z "$1" ]; then
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
    if [ -z "$PROJECT_ID" ]; then
        error "PROJECT_ID não encontrado. Execute: gcloud config set project SEU-PROJECT-ID"
    fi
else
    PROJECT_ID=$1
    gcloud config set project $PROJECT_ID
fi

log "🚀 Iniciando deploy para o projeto: $PROJECT_ID"

# Habilita APIs necessárias
log "📡 Habilitando APIs necessárias..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

# Verifica se existem arquivos necessários
if [ ! -f "Dockerfile" ]; then
    error "Dockerfile não encontrado no diretório atual"
fi

if [ ! -f "package.json" ]; then
    error "package.json não encontrado no diretório atual"
fi

# Build da aplicação localmente (opcional - para verificar erros)
log "🔨 Testando build local..."
npm install
npm run build

# Faz deploy usando Cloud Build
log "☁️ Fazendo deploy no Cloud Run via Cloud Build..."
gcloud builds submit --config cloudbuild.yaml --substitutions _PROJECT_ID=$PROJECT_ID

# Obtém a URL do serviço
SERVICE_URL=$(gcloud run services describe whatsapp-rag --region=us-central1 --format="value(status.url)")

log "✅ Deploy concluído com sucesso!"
log "🌐 URL do serviço: $SERVICE_URL"

# Sugere configuração de domínio customizado
warning "💡 Para configurar domínio customizado, execute:"
echo "gcloud run domain-mappings create --service whatsapp-rag --domain yourdomain.com --region us-central1"

# Sugere configuração de monitoramento
warning "📊 Para habilitar monitoramento, acesse:"
echo "https://console.cloud.google.com/run/detail/us-central1/whatsapp-rag"

log "🎉 Deploy finalizado! Acesse: $SERVICE_URL"