import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Filter, FileCheck, AlertTriangle, Package, Wrench, TrendingDown, Users, Calendar, ExternalLink, UserCheck, RefreshCw, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PrincipalDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPendingApprovals, setShowPendingApprovals] = useState(false);
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false);
  const [showLowStockDetails, setShowLowStockDetails] = useState(false);
  const [showAssetAssignments, setShowAssetAssignments] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [showPurchaseRequests, setShowPurchaseRequests] = useState(false);
  const [selectedStaffAssets, setSelectedStaffAssets] = useState<any[]>([]);
  const [selectedStaffName, setSelectedStaffName] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [assetFilter, setAssetFilter] = useState("all");
  const { toast } = useToast();

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

  // Mock purchase requests data
  const [purchaseRequests, setPurchaseRequests] = useState([
    {
      id: "PR001",
      assetName: "High-End Workstation",
      assetType: "Physical",
      department: "Computer Science",
      hodName: "Dr. Smith",
      estimatedCost: "₹1,50,000",
      priority: "High",
      requestDate: "2024-03-15",
      justification: "Required for advanced computing research and student projects",
      status: "pending",
      description: "Intel i9 processor, 32GB RAM, RTX 4090 GPU",
      vendor: "Dell Technologies"
    },
    {
      id: "PR002",
      assetName: "AutoCAD Licenses",
      assetType: "Digital",
      department: "Mechanical",
      hodName: "Dr. Brown",
      estimatedCost: "₹2,00,000",
      priority: "Medium",
      requestDate: "2024-03-14",
      justification: "Software licenses for 50 students in mechanical design course",
      status: "pending",
      description: "Annual subscription for 50 users",
      vendor: "Autodesk"
    }
  ]);

  // Mock asset assignments data
  const [assetAssignments, setAssetAssignments] = useState([
    {
      id: "AST001",
      name: "Microscope",
      type: "Physical",
      department: "Biology Lab",
      hodInCharge: "Dr. Smith",
      facultyInCharge: "Prof. Johnson",
      assignedDate: "2024-01-15"
    },
    {
      id: "AST002",
      name: "Projector",
      type: "Physical", 
      department: "Physics Lab",
      hodInCharge: "Dr. Brown",
      facultyInCharge: "Prof. Davis",
      assignedDate: "2024-01-10"
    },
    {
      id: "AST003",
      name: "AutoCAD License",
      type: "Digital",
      department: "Engineering",
      hodInCharge: "Dr. Wilson",
      facultyInCharge: "Prof. Miller",
      assignedDate: "2024-01-20"
    },
    {
      id: "AST004",
      name: "Server Rack",
      type: "Physical",
      department: "IT Department", 
      hodInCharge: "Dr. Taylor",
      facultyInCharge: "Prof. Anderson",
      assignedDate: "2024-01-05"
    },
    {
      id: "AST005",
      name: "Chemistry Equipment Set",
      type: "Physical",
      department: "Chemistry Lab",
      hodInCharge: "Dr. Smith",
      facultyInCharge: "Prof. White",
      assignedDate: "2024-01-12"
    }
  ]);

  // Get unique staff members
  const allStaff = Array.from(new Set([
    ...assetAssignments.map(a => a.hodInCharge),
    ...assetAssignments.map(a => a.facultyInCharge)
  ])).sort();

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

  const handleStaffSelection = (staffName: string) => {
    const staffAssets = assetAssignments.filter(
      asset => asset.hodInCharge === staffName || asset.facultyInCharge === staffName
    );
    setSelectedStaffAssets(staffAssets);
    setSelectedStaffName(staffName);
    setShowReassignDialog(true);
  };

  const handleReassignment = () => {
    if (!newAssignee) {
      toast({
        title: "Error",
        description: "Please select a new assignee",
        variant: "destructive"
      });
      return;
    }

    // Update assignments for the selected staff
    const updatedAssignments = assetAssignments.map(asset => {
      if (asset.hodInCharge === selectedStaffName) {
        return { ...asset, hodInCharge: newAssignee };
      }
      if (asset.facultyInCharge === selectedStaffName) {
        return { ...asset, facultyInCharge: newAssignee };
      }
      return asset;
    });

    setAssetAssignments(updatedAssignments);
    setShowReassignDialog(false);
    setNewAssignee("");
    setSelectedStaffAssets([]);
    setSelectedStaffName("");

    toast({
      title: "Success",
      description: `Assets reassigned from ${selectedStaffName} to ${newAssignee}`,
    });
  };

  const handlePurchaseApproval = (id: string, action: "approve" | "reject") => {
    const updatedRequests = purchaseRequests.map(request => {
      if (request.id === id) {
        return { ...request, status: action === "approve" ? "approved" : "rejected" };
      }
      return request;
    });
    
    setPurchaseRequests(updatedRequests);
    
    const request = purchaseRequests.find(r => r.id === id);
    if (action === "approve") {
      toast({
        title: "Purchase Request Approved",
        description: `${request?.assetName} has been approved and sent to Admin for purchase.`
      });
    } else {
      toast({
        title: "Purchase Request Rejected",
        description: `${request?.assetName} request has been rejected.`
      });
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
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

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAssetAssignments(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asset Assignments</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Staff asset assignments</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowPurchaseRequests(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Purchase Requests</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{purchaseRequests.filter(r => r.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
              <div className="text-xs text-blue-500 mt-1">
                {purchaseRequests.filter(r => r.status === "approved").length} approved
              </div>
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

        {/* Purchase Requests Dialog */}
        {showPurchaseRequests && (
          <Dialog open={true} onOpenChange={() => setShowPurchaseRequests(false)}>
            <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Purchase Requests
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {purchaseRequests.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No purchase requests</p>
                ) : (
                  purchaseRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{request.assetName}</h3>
                            <Badge variant="outline">{request.assetType}</Badge>
                            <Badge variant={
                              request.priority === "Urgent" ? "destructive" :
                              request.priority === "High" ? "destructive" :
                              request.priority === "Medium" ? "secondary" : "outline"
                            }>
                              {request.priority}
                            </Badge>
                            <Badge variant={
                              request.status === "approved" ? "default" :
                              request.status === "rejected" ? "destructive" : "secondary"
                            }>
                              {request.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <p><strong>Request ID:</strong> {request.id}</p>
                            <p><strong>Department:</strong> {request.department}</p>
                            <p><strong>HOD:</strong> {request.hodName}</p>
                            <p><strong>Request Date:</strong> {request.requestDate}</p>
                            <p><strong>Estimated Cost:</strong> {request.estimatedCost}</p>
                            <p><strong>Vendor:</strong> {request.vendor}</p>
                          </div>
                          <div className="space-y-2">
                            <p><strong>Description:</strong> {request.description}</p>
                            <p><strong>Justification:</strong> {request.justification}</p>
                          </div>
                        </div>
                      </div>
                      {request.status === "pending" && (
                        <div className="flex gap-2 pt-4 border-t">
                          <Button 
                            size="sm" 
                            onClick={() => handlePurchaseApproval(request.id, "approve")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve & Send to Admin
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handlePurchaseApproval(request.id, "reject")}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Asset Assignments Dialog */}
        {showAssetAssignments && (
        <Dialog open={true} onOpenChange={() => setShowAssetAssignments(false)}>
          <DialogContent className="max-w-6xl">
            <DialogHeader>
              <DialogTitle>Asset Assignments Management</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Staff Selection Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Staff Asset Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    Select a staff member to view their assigned assets and reassign if they're leaving:
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {allStaff.map((staff) => {
                      const staffAssetCount = assetAssignments.filter(
                        asset => asset.hodInCharge === staff || asset.facultyInCharge === staff
                      ).length;
                      
                      return (
                        <Button
                          key={staff}
                          variant="outline"
                          className="p-4 h-auto flex flex-col items-center gap-2"
                          onClick={() => handleStaffSelection(staff)}
                        >
                          <Users className="h-4 w-4" />
                          <span className="font-medium">{staff}</span>
                          <Badge variant="secondary" className="text-xs">
                            {staffAssetCount} assets
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Asset Assignments Table */}
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>HOD In Charge</TableHead>
                      <TableHead>Faculty In Charge</TableHead>
                      <TableHead>Assigned Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.id}</TableCell>
                        <TableCell>{assignment.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignment.type}</Badge>
                        </TableCell>
                        <TableCell>{assignment.department}</TableCell>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-primary"
                            onClick={() => handleStaffSelection(assignment.hodInCharge)}
                          >
                            {assignment.hodInCharge}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-primary"
                            onClick={() => handleStaffSelection(assignment.facultyInCharge)}
                          >
                            {assignment.facultyInCharge}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {assignment.assignedDate}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Reassignment Dialog */}
      {showReassignDialog && (
        <Dialog open={true} onOpenChange={() => setShowReassignDialog(false)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Reassign Assets - {selectedStaffName}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Current Assets */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assets Currently Assigned to {selectedStaffName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-64 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset ID</TableHead>
                          <TableHead>Asset Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStaffAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell className="font-medium">{asset.id}</TableCell>
                            <TableCell>{asset.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{asset.type}</Badge>
                            </TableCell>
                            <TableCell>{asset.department}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {asset.hodInCharge === selectedStaffName ? "HOD" : "Faculty"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Reassignment Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reassign to New Staff Member</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="newAssignee">Select New Assignee</Label>
                    <Select onValueChange={setNewAssignee} value={newAssignee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose staff member..." />
                      </SelectTrigger>
                      <SelectContent>
                        {allStaff
                          .filter(staff => staff !== selectedStaffName)
                          .map((staff) => (
                            <SelectItem key={staff} value={staff}>
                              {staff}
                            </SelectItem>
                          ))}
                        <SelectItem value="Dr. New Faculty">Dr. New Faculty</SelectItem>
                        <SelectItem value="Prof. Replacement">Prof. Replacement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleReassignment} className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Reassign All Assets
                    </Button>
                    <Button variant="outline" onClick={() => setShowReassignDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PrincipalDashboard;