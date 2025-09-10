import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  FileText, 
  RefreshCw, 
  Upload,
  CheckCircle,
  AlertCircle 
} from "lucide-react";

export function KnowledgeBaseStatus() {
  const knowledgeStats = {
    totalDocuments: 156,
    processedDocuments: 152,
    failedDocuments: 4,
    lastUpdate: "15 min atrás",
    processingProgress: 97
  };

  const recentDocuments = [
    {
      name: "FAQ Atendimento 2024.pdf",
      status: "processed",
      size: "2.3 MB",
      timestamp: "10 min atrás"
    },
    {
      name: "Manual Produtos.docx", 
      status: "processing",
      size: "1.8 MB",
      timestamp: "12 min atrás"
    },
    {
      name: "Políticas Empresa.pdf",
      status: "failed",
      size: "3.1 MB",
      timestamp: "15 min atrás"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-warning animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge variant="secondary" className="bg-success/10 text-success">Processado</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Processando</Badge>;
      case 'failed':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive">Falhou</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-primary" />
          <span>Base de Conhecimento</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Adicionar Docs
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Documentos Totais</p>
            <p className="text-2xl font-bold text-primary">{knowledgeStats.totalDocuments}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Taxa de Sucesso</p>
            <p className="text-2xl font-bold text-success">{knowledgeStats.processingProgress}%</p>
          </div>
        </div>

        {/* Processing Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso do Processamento</span>
            <span className="text-foreground">{knowledgeStats.processedDocuments}/{knowledgeStats.totalDocuments}</span>
          </div>
          <Progress value={knowledgeStats.processingProgress} className="h-2" />
        </div>

        {/* Recent Documents */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Documentos Recentes</h4>
          <div className="space-y-3">
            {recentDocuments.map((doc, index) => (
              <div 
                key={doc.name}
                className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[180px]">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} • {doc.timestamp}
                    </p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Última atualização: {knowledgeStats.lastUpdate}
          </p>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}