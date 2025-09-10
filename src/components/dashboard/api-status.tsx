import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Zap, 
  Settings, 
  Activity,
  DollarSign,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

export function ApiStatus() {
  const apiStats = {
    openaiStatus: "active",
    whatsappStatus: "active", 
    monthlyUsage: "$47.30",
    budgetLimit: "$100.00",
    requestsToday: 1234,
    requestsLimit: 5000,
    lastCheck: "30 seg atrás"
  };

  const usagePercentage = (47.30 / 100) * 100;
  const requestsPercentage = (1234 / 5000) * 100;

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>Status das APIs</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Configurar
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium">OpenAI</span>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium">WhatsApp</span>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Gasto Mensal
              </span>
              <span className="text-sm text-muted-foreground">
                {apiStats.monthlyUsage} / {apiStats.budgetLimit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500" 
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                Requests Hoje
              </span>
              <span className="text-sm text-muted-foreground">
                {apiStats.requestsToday.toLocaleString()} / {apiStats.requestsLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500" 
                style={{ width: `${requestsPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Budget Alert */}
        {usagePercentage > 80 && (
          <Alert className="border-warning/50 bg-warning/5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning">
              Você usou {usagePercentage.toFixed(0)}% do seu orçamento mensal. 
              Considere ajustar os limites.
            </AlertDescription>
          </Alert>
        )}

        {/* Last Check */}
        <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
          <span>Última verificação: {apiStats.lastCheck}</span>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Activity className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}