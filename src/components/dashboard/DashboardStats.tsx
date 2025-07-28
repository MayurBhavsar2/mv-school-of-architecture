import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Cpu, Trash2, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardStats = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Assets",
      value: "1,247",
      change: "+12.5%",
      icon: Package,
      color: "text-primary",
      route: "/assets/total"
    },
    {
      title: "Physical Assets",
      value: "892",
      change: "+8.2%",
      icon: Package,
      color: "text-accent",
      route: "/assets/physical"
    },
    {
      title: "Digital Assets",
      value: "234",
      change: "+15.3%",
      icon: Cpu,
      color: "text-primary-glow",
      route: "/assets/digital"
    },
    {
      title: "Consumables",
      value: "121",
      change: "+5.1%",
      icon: Trash2,
      color: "text-warning",
      route: "/assets/consumables"
    },
    {
      title: "Maintenance Due",
      value: "23",
      change: "-2.1%",
      icon: AlertTriangle,
      color: "text-destructive",
      route: "/assets/maintenance"
    },
    {
      title: "Active Users",
      value: "89",
      change: "+3.2%",
      icon: Users,
      color: "text-accent",
      route: "/assets/users"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith('+');
        
        return (
          <Card 
            key={index} 
            className="relative overflow-hidden bg-gradient-to-br from-card to-card/80 border shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
            onClick={() => navigate(stat.route)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <Badge 
                  variant={isPositive ? "default" : "destructive"}
                  className="text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};