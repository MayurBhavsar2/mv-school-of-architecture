import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Filter, FileCheck, AlertTriangle, Package, Wrench, TrendingDown, Users, Calendar, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PrincipalDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPendingApprovals, setShowPendingApprovals] = useState(false);
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false);
  const [showLowStockDetails, setShowLowStockDetails] = useState(false);
  const [assetFilter, setAssetFilter] = useState("all");

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "new_asset",
      message: "New Projector (AST011) registered by Admin",
      timestamp: "2024-01-30 10:30 AM",
      status: "unread"
    },
    {
      id: 2,
      type: "low_stock",
      message: "Printer Paper is running low (5 units remaining)",
      timestamp: "2024-01-30 09:15 AM",
      status: "unread"
    },
    {
      id: 3,
      type: "maintenance",
      message: "Microscope maintenance due on 2024-02-15",
      timestamp: "2024-01-29 02:45 PM",
      status: "read"
    },
    {
      id: 4,
      type: "approval",
      message: "Hand-over request for Projector to Physics Department",
      timestamp: "2024-01-29 11:20 AM",
      status: "unread"
    }
  ];

  // Mock pending approvals data
  const pendingApprovals = [
    {
      id: "HO001",
      assetName: "Projector",
      assetId: "AST002",
      assignedTo: "Physics Department",
      requestDate: "2024-01-29",
      expectedReturn: "2024-02-15",
      purpose: "Lab demonstration",
      status: "pending"
    },
    {
      id: "HO002",
      assetName: "AutoCAD License",
      assetId: "AST003",
      assignedTo: "Engineering College",
      requestDate: "2024-01-28",
      expectedReturn: "2024-06-30",
      purpose: "Student training program",
      status: "pending"
    }
  ];

  // Mock maintenance due data
  const maintenanceDue = [
    {
      id: "AST001",
      name: "Microscope",
      type: "Physical",
      department: "Biology Lab",
      dueDate: "2024-02-15",
      overdue: false,
      priority: "High"
    },
    {
      id: "AST004",
      name: "Server Rack",
      type: "Digital",
      department: "IT Department",
      dueDate: "2024-02-10",
      overdue: true,
      priority: "Critical"
    },
    {
      id: "AST005",
      name: "Air Conditioning Unit",
      type: "Physical",
      department: "Main Building",
      dueDate: "2024-02-20",
      overdue: false,
      priority: "Medium"
    }
  ];

  // Mock low stock data
  const lowStockItems = [
    {
      id: "AST020",
      name: "Printer Paper",
      currentStock: 5,
      threshold: 10,
      type: "Consumable",
      department: "General Office",
      urgency: "Medium"
    },
    {
      id: "AST021",
      name: "Whiteboard Markers",
      currentStock: 2,
      threshold: 15,
      type: "Consumable",
      department: "All Classrooms",
      urgency: "High"
    },
    {
      id: "AST022",
      name: "Network Cables",
      currentStock: 3,
      threshold: 20,
      type: "Physical",
      department: "IT Department",
      urgency: "High"
    }
  ];

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_asset": return <Package className="h-4 w-4 text-blue-500" />;
      case "low_stock": return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case "maintenance": return <Wrench className="h-4 w-4 text-yellow-500" />;
      case "approval": return <FileCheck className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleApproval = (id: string, action: "approve" | "reject") => {
    // Handle approval logic here
    console.log(`${action} approval for ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Principal Dashboard</h1>
            <p className="text-muted-foreground">MV School of Architecture - Asset Management Overview</p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="gap-2 relative"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-4 w-4" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <Button onClick={() => navigate('/')} variant="outline">
              Admin Dashboard
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/principal/assets')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">All registered assets</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowMaintenanceDetails(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maintenanceDue.length}</div>
              <p className="text-xs text-muted-foreground">Assets requiring maintenance</p>
              <div className="text-xs text-red-500 mt-1">
                {maintenanceDue.filter(item => item.overdue).length} overdue
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowLowStockDetails(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockItems.length}</div>
              <p className="text-xs text-muted-foreground">Items below threshold</p>
              <div className="text-xs text-orange-500 mt-1">
                {lowStockItems.filter(item => item.urgency === "High").length} urgent
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowPendingApprovals(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApprovals.length}</div>
              <p className="text-xs text-muted-foreground">Hand-over requests</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/principal/audit')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audit</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Items to audit</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 4).map((notification) => (
                <div key={notification.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                  {notification.status === "unread" && (
                    <Badge variant="destructive" className="h-2 w-2 p-0"></Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Dialog */}
      {showNotifications && (
        <Dialog open={true} onOpenChange={() => setShowNotifications(false)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                    </div>
                    {notification.status === "unread" && (
                      <Badge variant="destructive">New</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Pending Approvals Dialog */}
      {showPendingApprovals && (
        <Dialog open={true} onOpenChange={() => setShowPendingApprovals(false)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Pending Approvals</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell className="font-medium">{approval.id}</TableCell>
                      <TableCell>{approval.assetName}</TableCell>
                      <TableCell>{approval.assetId}</TableCell>
                      <TableCell>{approval.assignedTo}</TableCell>
                      <TableCell>{approval.requestDate}</TableCell>
                      <TableCell>{approval.expectedReturn}</TableCell>
                      <TableCell>{approval.purpose}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleApproval(approval.id, "approve")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleApproval(approval.id, "reject")}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Maintenance Details Dialog */}
      {showMaintenanceDetails && (
        <Dialog open={true} onOpenChange={() => setShowMaintenanceDetails(false)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Maintenance Due Assets</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceDue.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {item.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.priority === "Critical" ? "destructive" : 
                                 item.priority === "High" ? "default" : "secondary"}
                        >
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.overdue ? (
                          <Badge variant="destructive">Overdue</Badge>
                        ) : (
                          <Badge variant="outline">Due Soon</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Low Stock Details Dialog */}
      {showLowStockDetails && (
        <Dialog open={true} onOpenChange={() => setShowLowStockDetails(false)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Low Stock Items</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Urgency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>
                        <span className="font-medium text-red-500">{item.currentStock}</span>
                      </TableCell>
                      <TableCell>{item.threshold}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.urgency === "High" ? "destructive" : "default"}
                        >
                          {item.urgency}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PrincipalDashboard;