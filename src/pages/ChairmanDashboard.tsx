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
  Plus
} from "lucide-react";

const ChairmanDashboard = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      value: "15",
      change: "+8%",
      icon: Clock,
      color: "text-purple-600",
      route: "#pending-approvals"
    }
  ];

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: 1,
      type: "Purchase Request",
      description: "Laptop for Computer Lab",
      requestedBy: "HOD Computer Science",
      approvedBy: "Principal",
      amount: "₹85,000",
      vendor: "TechCorp Solutions",
      date: "2024-01-15",
      status: "Waiting for Chairman Approval"
    },
    {
      id: 2,
      type: "Hand-over Request",
      description: "Equipment Transfer to Civil Dept",
      requestedBy: "Prof. Sharma",
      approvedBy: "Principal",
      items: "5 items",
      date: "2024-01-14",
      status: "Waiting for Chairman Approval"
    },
    {
      id: 3,
      type: "Quotation Approval",
      description: "Furniture for New Classroom",
      requestedBy: "Admin",
      approvedBy: "Principal",
      amount: "₹1,25,000",
      vendor: "Furniture Plus",
      date: "2024-01-13",
      status: "Waiting for Chairman Approval"
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

  const openRequestDialog = (request: any) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chairman Dashboard</h1>
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
                  if (stat.route.startsWith('#')) {
                    document.getElementById(stat.route.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = stat.route;
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

        {/* Pending Approvals Section */}
        <Card className="mb-8" id="pending-approvals">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Approvals from Principal
            </CardTitle>
            <CardDescription>
              Requests approved by Principal waiting for your approval
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
                        {request.amount && <span>Amount: {request.amount}</span>}
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
    </div>
  );
};

export default ChairmanDashboard;