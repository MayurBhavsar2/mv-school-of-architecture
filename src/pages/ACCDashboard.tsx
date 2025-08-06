import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Users, 
  FileText, 
  Eye,
  Settings,
  Plus,
  ShoppingCart
} from "lucide-react";

const ACCDashboard = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);

  // Mock data for pending approvals from Principal
  const pendingApprovals = [
    {
      id: 1,
      type: "Hand-over Request",
      description: "Equipment Transfer to Civil Dept",
      requestedBy: "Prof. Sharma",
      approvedBy: "Principal",
      items: "5 items",
      date: "2024-01-14",
      status: "Waiting for ACC Approval"
    }
  ];

  // Mock data for quotation approvals from faculty
  const [quotationApprovals, setQuotationApprovals] = useState([
    {
      id: "PR002",
      assetName: "AutoCAD Licenses",
      assetType: "Digital",
      department: "Mechanical",
      approxCosting: "₹2,00,000",
      requestedBy: "Faculty",
      quotations: [
        { vendor: "Autodesk Direct", email: "sales@autodesk.com", contact: "+91 98765 43210", cost: "₹1,95,000", deliveryTime: "5 days", specifications: "50 user licenses, 1-year subscription" },
        { vendor: "Software Solutions Inc", email: "info@softwaresolutions.com", contact: "+91 98765 43211", cost: "₹2,10,000", deliveryTime: "3 days", specifications: "50 user licenses, 1-year subscription + training" },
        { vendor: "Tech Distributors", email: "contact@techdist.com", contact: "+91 98765 43212", cost: "₹1,85,000", deliveryTime: "7 days", specifications: "50 user licenses, 1-year subscription" }
      ],
      date: "2024-01-15",
      status: "pending_acc_approval"
    }
  ]);

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Assets",
      value: "1,234",
      change: "+12%",
      icon: Package,
      color: "text-blue-600",
      route: "/assets"
    },
    {
      title: "Maintenance Due",
      value: "23",
      change: "+5%",
      icon: AlertTriangle,
      color: "text-orange-600",
      route: "/maintenance"
    },
    {
      title: "Low Stocks",
      value: "8",
      change: "-2%",
      icon: TrendingDown,
      color: "text-red-600",
      route: "/low-stocks"
    },
    {
      title: "Pending Approvals",
      value: (pendingApprovals.length + quotationApprovals.filter(q => q.status === "pending_acc_approval").length).toString(),
      change: "+8%",
      icon: Clock,
      color: "text-purple-600",
      route: "#pending-approvals"
    }
  ];

  // Mock data for asset assignments
  const assetAssignments = [
    {
      id: 1,
      assetName: "Dell Laptop",
      assetCode: "DL-001",
      assignedTo: "Prof. Kumar",
      department: "Computer Science",
      assignedDate: "2024-01-10",
      status: "Active"
    },
    {
      id: 2,
      assetName: "Projector",
      assetCode: "PR-005",
      assignedTo: "Dr. Patel",
      department: "Electronics",
      assignedDate: "2024-01-08",
      status: "Active"
    }
  ];

  // Mock data for detailed sections
  const totalAssets = [
    { id: 1, name: "Dell Laptop", code: "DL-001", category: "IT Equipment", value: "₹45,000", status: "Active", location: "Computer Lab" },
    { id: 2, name: "HP Projector", code: "HP-002", category: "AV Equipment", value: "₹25,000", status: "Active", location: "Lecture Hall 1" },
    { id: 3, name: "Office Chair", code: "OC-003", category: "Furniture", value: "₹8,000", status: "Active", location: "Faculty Room" },
    { id: 4, name: "Whiteboard", code: "WB-004", category: "Teaching Aid", value: "₹3,000", status: "Active", location: "Classroom A" },
    { id: 5, name: "Air Conditioner", code: "AC-005", category: "HVAC", value: "₹35,000", status: "Active", location: "Conference Room" }
  ];

  const maintenanceDue = [
    { id: 1, asset: "HP Projector", code: "HP-002", lastMaintenance: "2023-11-15", nextDue: "2024-02-15", type: "Scheduled", priority: "Medium" },
    { id: 2, asset: "Air Conditioner", code: "AC-005", lastMaintenance: "2023-10-20", nextDue: "2024-01-20", type: "Urgent", priority: "High" },
    { id: 3, asset: "Generator", code: "GN-006", lastMaintenance: "2023-12-01", nextDue: "2024-03-01", type: "Scheduled", priority: "Low" }
  ];

  const lowStocks = [
    { id: 1, item: "Printer Cartridges", currentStock: 2, minStock: 10, category: "Consumables", supplier: "Office Supplies Co." },
    { id: 2, item: "Whiteboard Markers", currentStock: 5, minStock: 20, category: "Stationery", supplier: "Stationery World" },
    { id: 3, item: "A4 Paper", currentStock: 15, minStock: 50, category: "Paper", supplier: "Paper Plus" }
  ];

  const finalApprovedRequests = [
    {
      id: 1,
      type: "Purchase Request",
      description: "Desktop Computers for Lab",
      requestedBy: "HOD Computer Science",
      amount: "₹2,50,000",
      approvedDate: "2024-01-12",
      status: "Approved by ACC"
    },
    {
      id: 2,
      type: "Hand-over Request",
      description: "Transfer of Equipment to Mechanical Dept",
      requestedBy: "Prof. Mehta",
      items: "3 items",
      approvedDate: "2024-01-10",
      status: "Approved by ACC"
    },
    {
      id: 3,
      type: "Quotation Approval",
      description: "Laboratory Equipment Purchase",
      requestedBy: "Faculty",
      amount: "₹3,75,000",
      vendor: "SciTech Solutions",
      approvedDate: "2024-01-08",
      status: "Approved by ACC"
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Purchase Request Approval",
      message: "Purchase request for Laptop approved by Principal",
      time: "2 hours ago",
      type: "approval"
    },
    {
      id: 2,
      title: "Maintenance Due Alert",
      message: "5 assets require maintenance this week",
      time: "4 hours ago",
      type: "maintenance"
    },
    {
      id: 3,
      title: "Low Stock Alert",
      message: "Printer cartridges running low",
      time: "1 day ago",
      type: "stock"
    },
    {
      id: 4,
      title: "Audit Report Ready",
      message: "Monthly audit report has been completed",
      time: "2 days ago",
      type: "audit"
    }
  ];

  const handleApprove = (requestId: number, type: string) => {
    toast({
      title: "Request Approved",
      description: `${type} has been approved successfully.`,
    });
    setIsDialogOpen(false);
  };

  const handleReject = (requestId: number, type: string) => {
    toast({
      title: "Request Rejected",
      description: `${type} has been rejected.`,
      variant: "destructive",
    });
    setIsDialogOpen(false);
  };

  const handleQuotationApproval = (requestId: string, vendorIndex: number) => {
    const request = quotationApprovals.find(q => q.id === requestId);
    if (!request) return;

    const selectedVendor = request.quotations[vendorIndex];
    
    // Update the quotation approval status
    const updatedQuotations = quotationApprovals.map(q => 
      q.id === requestId ? { ...q, status: "approved_by_acc", selectedVendor } : q
    );
    
    setQuotationApprovals(updatedQuotations);

    toast({
      title: "Vendor Approved",
      description: `${selectedVendor.vendor} approved for ${request.assetName}. Purchase order sent back to Faculty.`,
    });
  };

  const openRequestDialog = (request: any) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const openSectionDialog = (sectionName: string) => {
    setSelectedSection(sectionName);
    setIsSectionDialogOpen(true);
  };

  const getSectionData = (sectionName: string) => {
    switch (sectionName) {
      case "Total Assets":
        return totalAssets;
      case "Maintenance Due":
        return maintenanceDue;
      case "Low Stocks":
        return lowStocks;
      default:
        return [];
    }
  };

  const renderSectionTable = (sectionName: string) => {
    const data = getSectionData(sectionName);
    
    if (sectionName === "Total Assets") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell><Badge variant="default">{item.status}</Badge></TableCell>
                <TableCell>{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (sectionName === "Maintenance Due") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Next Due</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.asset}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.lastMaintenance}</TableCell>
                <TableCell>{item.nextDue}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Badge variant={item.priority === "High" ? "destructive" : item.priority === "Medium" ? "outline" : "secondary"}>
                    {item.priority}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (sectionName === "Low Stocks") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Minimum Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Supplier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{item.currentStock}</Badge>
                </TableCell>
                <TableCell>{item.minStock}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">ACC Dashboard</h1>
              <p className="text-muted-foreground">MV School of Architecture - Executive Overview</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/principal'}>
                <Settings className="h-4 w-4 mr-2" />
                Principal Dashboard
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
                <Settings className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications ({notifications.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Recent Notifications</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Bell className="h-5 w-5 mt-0.5 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        <Badge variant={notification.type === "approval" ? "default" : "secondary"}>
                          {notification.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  if (stat.title === "Pending Approvals") {
                    document.getElementById("pending-approvals")?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    openSectionDialog(stat.title);
                  }
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quotation Approvals Section */}
        {quotationApprovals.filter(q => q.status === "pending_acc_approval").length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Quotation Approvals from Admin
              </CardTitle>
              <CardDescription>
                Quotations collected by Faculty awaiting your final approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quotationApprovals.filter(q => q.status === "pending_acc_approval").map((request) => (
                  <div key={request.id} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{request.assetName}</h3>
                          <Badge variant="outline">{request.assetType}</Badge>
                          <Badge variant="secondary">Pending ACC Approval</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p><strong>Request ID:</strong> {request.id}</p>
                          <p><strong>Department:</strong> {request.department}</p>
                          <p><strong>Approximate Cost:</strong> {request.approxCosting}</p>
                          <p><strong>Requested by:</strong> {request.requestedBy}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-4">Select Vendor to Approve:</h4>
                      <div className="grid gap-4">
                        {request.quotations.map((quotation, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{quotation.vendor}</h5>
                                  <Badge variant="outline" className="text-green-600 border-green-600">
                                    {quotation.cost}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p><strong>Email:</strong> {quotation.email}</p>
                                  <p><strong>Contact:</strong> {quotation.contact}</p>
                                  <p><strong>Delivery Time:</strong> {quotation.deliveryTime}</p>
                                  <p><strong>Specifications:</strong> {quotation.specifications}</p>
                                </div>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => handleQuotationApproval(request.id, index)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve Vendor
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Approvals Section */}
        <Card className="mb-8" id="pending-approvals">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Approvals from Principal
            </CardTitle>
            <CardDescription>
              Hand-over requests approved by Principal waiting for your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{request.type}</h3>
                        <Badge variant="outline">{request.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Requested by: {request.requestedBy}</span>
                        <span>Approved by: {request.approvedBy}</span>
                        <span>Date: {request.date}</span>
                        {request.items && <span>Items: {request.items}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openRequestDialog(request)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final Approved Requests */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Final Approved Requests
            </CardTitle>
            <CardDescription>
              Requests that have been approved by the Chairman
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {finalApprovedRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{request.type}</h3>
                        <Badge variant="default" className="bg-green-600">
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Requested by: {request.requestedBy}</span>
                        <span>Approved on: {request.approvedDate}</span>
                        {request.amount && <span>Amount: {request.amount}</span>}
                        {request.vendor && <span>Vendor: {request.vendor}</span>}
                      </div>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Asset Assignments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Asset Assignments to Staff
            </CardTitle>
            <CardDescription>
              Current asset assignments across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Asset Code</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assetAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.assetName}</TableCell>
                    <TableCell>{assignment.assetCode}</TableCell>
                    <TableCell>{assignment.assignedTo}</TableCell>
                    <TableCell>{assignment.department}</TableCell>
                    <TableCell>{assignment.assignedDate}</TableCell>
                    <TableCell>
                      <Badge variant={assignment.status === "Active" ? "default" : "secondary"}>
                        {assignment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Audit Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Audit Reports
            </CardTitle>
            <CardDescription>
              Completed audit reports and compliance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Monthly Asset Audit - January 2024</h3>
                    <p className="text-sm text-muted-foreground">Completed on January 15, 2024</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Quarterly Compliance Report - Q4 2023</h3>
                    <p className="text-sm text-muted-foreground">Completed on December 31, 2023</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Request Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review {selectedRequest?.type}</DialogTitle>
            <DialogDescription>
              Review the details and approve or reject this request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Request Type</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Requested By</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.requestedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Approved By</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.approvedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.date}</p>
                </div>
                {selectedRequest.amount && (
                  <div>
                    <label className="text-sm font-medium">Amount</label>
                    <p className="text-sm text-muted-foreground">{selectedRequest.amount}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
              </div>
              {selectedRequest.vendor && (
                <div>
                  <label className="text-sm font-medium">Selected Vendor</label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.vendor}</p>
                </div>
              )}
              <Separator />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleReject(selectedRequest.id, selectedRequest.type)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  onClick={() => handleApprove(selectedRequest.id, selectedRequest.type)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Section Details Dialog */}
      <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSection}</DialogTitle>
            <DialogDescription>
              Detailed view of {selectedSection.toLowerCase()} data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {renderSectionTable(selectedSection)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ACCDashboard;