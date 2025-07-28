import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const RecentAssets = () => {
  const recentAssets = [
    {
      id: "AST-2024-001",
      name: "Dell Laptop XPS 13",
      type: "Physical",
      location: "CS Lab 101",
      faculty: "Dr. Smith",
      status: "Active",
      addedDate: "2024-01-15"
    },
    {
      id: "AST-2024-002",
      name: "Microsoft Office 365",
      type: "Digital",
      location: "Cloud",
      faculty: "Prof. Johnson",
      status: "Active",
      addedDate: "2024-01-14"
    },
    {
      id: "AST-2024-003",
      name: "Printer Cartridges",
      type: "Consumable",
      location: "Storage Room",
      faculty: "Admin Team",
      status: "In Stock",
      addedDate: "2024-01-13"
    },
    {
      id: "AST-2024-004",
      name: "Projector EPSON",
      type: "Physical",
      location: "Conference Room A",
      faculty: "Dr. Wilson",
      status: "Maintenance",
      addedDate: "2024-01-12"
    },
    {
      id: "AST-2024-005",
      name: "Adobe Creative Suite",
      type: "Digital",
      location: "Design Lab",
      faculty: "Prof. Davis",
      status: "Active",
      addedDate: "2024-01-11"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-accent text-accent-foreground";
      case "Maintenance":
        return "bg-warning text-warning-foreground";
      case "In Stock":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Physical":
        return "bg-primary/10 text-primary border-primary/20";
      case "Digital":
        return "bg-accent/10 text-accent border-accent/20";
      case "Consumable":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-foreground">{asset.name}</h4>
                  <Badge className={getTypeColor(asset.type)} variant="outline">
                    {asset.type}
                  </Badge>
                  <Badge className={getStatusColor(asset.status)}>
                    {asset.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>ID: {asset.id}</span>
                  <span>Location: {asset.location}</span>
                  <span>Faculty: {asset.faculty}</span>
                  <span>Added: {asset.addedDate}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Asset
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Asset
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};