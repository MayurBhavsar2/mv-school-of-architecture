import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AlertsPage = () => {
  const navigate = useNavigate();

  const alerts = [
    {
      id: "ALT001",
      type: "Maintenance Due",
      asset: "Microscope",
      assetId: "AST006",
      message: "Maintenance due for Microscope in Lab B",
      dueDate: "2024-02-15",
      priority: "high",
      faculty: "Dr. Wilson"
    },
    {
      id: "ALT002", 
      type: "Maintenance Due",
      asset: "Air Conditioner",
      assetId: "AST010",
      message: "Maintenance due for Air Conditioner in Room 201",
      dueDate: "2024-02-10",
      priority: "urgent",
      faculty: "Maintenance"
    },
    {
      id: "ALT003",
      type: "Low Stock Alert",
      asset: "Printer Paper",
      assetId: "AST004",
      message: "Printer Paper stock below threshold (5 remaining)",
      threshold: "5",
      priority: "medium",
      faculty: "Admin"
    },
    {
      id: "ALT004",
      type: "Out of Stock",
      asset: "Toner Cartridge", 
      assetId: "AST009",
      message: "Toner Cartridge is out of stock",
      priority: "high",
      faculty: "Admin"
    }
  ];

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Maintenance Due': return Clock;
      case 'Low Stock Alert': return AlertTriangle;
      case 'Out of Stock': return Package;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/')}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Monitor system alerts and maintenance schedules</p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = getIcon(alert.type);
            return (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        alert.priority === 'urgent' ? 'bg-destructive/10' :
                        alert.priority === 'high' ? 'bg-destructive/10' :
                        'bg-warning/10'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          alert.priority === 'urgent' ? 'text-destructive' :
                          alert.priority === 'high' ? 'text-destructive' :
                          'text-warning'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{alert.asset}</h3>
                          <Badge variant="outline">{alert.assetId}</Badge>
                          <Badge variant={getPriorityVariant(alert.priority)}>
                            {alert.priority}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Type: {alert.type}</span>
                          <span>Faculty: {alert.faculty}</span>
                          {alert.dueDate && <span>Due: {alert.dueDate}</span>}
                          {alert.threshold && <span>Threshold: {alert.threshold}</span>}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Asset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;