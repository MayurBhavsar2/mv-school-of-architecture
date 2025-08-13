import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Filter, FileCheck, AlertTriangle, Package, Wrench, TrendingDown, Users, Calendar, ExternalLink, UserCheck, RefreshCw, ShoppingCart, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SecretaryDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuotationApprovals, setShowQuotationApprovals] = useState(false);
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false);
  const [showLowStockDetails, setShowLowStockDetails] = useState(false);
  const [showAssetAssignments, setShowAssetAssignments] = useState(false);
  const [showRecentActivities, setShowRecentActivities] = useState(false);
  const [showDepartmentOverview, setShowDepartmentOverview] = useState(false);
  
  const [assetFilter, setAssetFilter] = useState("all");
  const { toast } = useToast();

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "quotation_approved",
      message: "Quotation for AutoCAD Licenses approved by ACC - awaiting final approval",
      timestamp: "2024-01-30 03:45 PM",
      status: "unread"
    },
    {
      id: 2,
      type: "quotation_approved", 
      message: "Quotation for High-End Workstation approved by ACC - awaiting final approval",
      timestamp: "2024-01-30 02:30 PM",
      status: "unread"
    },
    {
      id: 3,
      type: "low_stock",
      message: "Printer Paper is running low (5 units remaining)",
      timestamp: "2024-01-30 09:15 AM",
      status: "unread"
    },
    {
      id: 4,
      type: "maintenance",
      message: "Microscope maintenance due on 2024-02-15",
      timestamp: "2024-01-29 02:45 PM",
      status: "read"
    },
    {
      id: 5,
      type: "new_asset",
      message: "New Projector (AST011) registered by Faculty",
      timestamp: "2024-01-29 11:20 AM",
      status: "read"
    }
  ];

  // Mock quotation approvals from ACC
  const quotationApprovals = [
    {
      id: 1,
      item: "AutoCAD Licenses (10 units)",
      department: "Civil Engineering",
      requestedBy: "Dr. Kumar",
      totalAmount: "₹85,000",
      accApprovalDate: "2024-01-30",
      accApprovedBy: "Mr. Sharma (ACC)",
      quotationCount: 3,
      recommendedVendor: "TechSoft Solutions",
      status: "pending_secretary_approval"
    },
    {
      id: 2,
      item: "High-End Workstation",
      department: "Computer Science",
      requestedBy: "Prof. Patel",
      totalAmount: "₹1,25,000",
      accApprovalDate: "2024-01-30",
      accApprovedBy: "Mr. Sharma (ACC)",
      quotationCount: 3,
      recommendedVendor: "Dell Technologies",
      status: "pending_secretary_approval"
    },
    {
      id: 3,
      item: "Laboratory Equipment Set",
      department: "Chemistry",
      requestedBy: "Dr. Singh",
      totalAmount: "₹2,50,000",
      accApprovalDate: "2024-01-29",
      accApprovedBy: "Mr. Sharma (ACC)",
      quotationCount: 3,
      recommendedVendor: "Scientific Instruments Ltd",
      status: "approved_by_secretary"
    }
  ];

  // Mock asset data
  const assetStats = [
    { label: "Total Assets", value: "1,247", change: "+8.2%", color: "text-blue-600" },
    { label: "Active Assets", value: "1,156", change: "+2.1%", color: "text-green-600" },
    { label: "Maintenance Due", value: "23", change: "-5.3%", color: "text-orange-600" },
    { label: "Low Stock Items", value: "8", change: "+12.5%", color: "text-red-600" },
  ];

  const handleApproveQuotation = (quotationId: number) => {
    toast({
      title: "Quotation Approved",
      description: "The quotation has been approved and forwarded for procurement.",
    });
  };

  const handleRejectQuotation = (quotationId: number) => {
    toast({
      title: "Quotation Rejected",
      description: "The quotation has been rejected and returned to ACC.",
      variant: "destructive",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "quotation_approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "new_asset": return <Package className="h-4 w-4 text-blue-500" />;
      case "low_stock": return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case "maintenance": return <Wrench className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Secretary Dashboard</h1>
              <p className="text-muted-foreground">Institute Administration & Final Approvals</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/alerts')}>
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/handover')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Hand-Over
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Main Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications ({notifications.filter(n => n.status === 'unread').length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assetStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-xs ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className="p-3 bg-muted rounded-full">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quotation Approvals from ACC */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowQuotationApprovals(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quotation Approvals</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {quotationApprovals.filter(q => q.status === 'pending_secretary_approval').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Approved by ACC - Awaiting Final Approval
              </p>
              <Badge variant="outline" className="mt-2">
                From ACC
              </Badge>
            </CardContent>
          </Card>

          {/* Maintenance Due */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowMaintenanceDetails(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
              <Wrench className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-xs text-muted-foreground">
                Assets requiring maintenance
              </p>
              <Badge variant="outline" className="mt-2">
                Review Required
              </Badge>
            </CardContent>
          </Card>

          {/* Low Stock Items */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowLowStockDetails(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-muted-foreground">
                Items below minimum threshold
              </p>
              <Badge variant="destructive" className="mt-2">
                Action Needed
              </Badge>
            </CardContent>
          </Card>

          {/* Asset Assignments */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowAssetAssignments(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asset Assignments</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,156</div>
              <p className="text-xs text-muted-foreground">
                Currently assigned assets
              </p>
              <Badge variant="outline" className="mt-2">
                View All
              </Badge>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowRecentActivities(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-xs text-muted-foreground">
                Actions today
              </p>
              <Badge variant="outline" className="mt-2">
                All Departments
              </Badge>
            </CardContent>
          </Card>

          {/* Department Overview */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowDepartmentOverview(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Department Overview</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">
                Active departments
              </p>
              <Badge variant="outline" className="mt-2">
                Institute Wide
              </Badge>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Quotation Approvals Dialog */}
      <Dialog open={showQuotationApprovals} onOpenChange={setShowQuotationApprovals}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quotation Approvals from ACC</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>ACC Approved By</TableHead>
                  <TableHead>Recommended Vendor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotationApprovals.map((quotation) => (
                  <TableRow key={quotation.id}>
                    <TableCell className="font-medium">{quotation.item}</TableCell>
                    <TableCell>{quotation.department}</TableCell>
                    <TableCell>{quotation.requestedBy}</TableCell>
                    <TableCell>{quotation.totalAmount}</TableCell>
                    <TableCell>{quotation.accApprovedBy}</TableCell>
                    <TableCell>{quotation.recommendedVendor}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={quotation.status === 'pending_secretary_approval' ? 'default' : 'secondary'}
                      >
                        {quotation.status === 'pending_secretary_approval' ? 'Pending' : 'Approved'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {quotation.status === 'pending_secretary_approval' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveQuotation(quotation.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectQuotation(quotation.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Recent Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border ${notification.status === 'unread' ? 'bg-muted/50' : ''}`}>
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>
                  {notification.status === 'unread' && (
                    <Badge variant="default" className="text-xs">New</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Maintenance Details Dialog */}
      <Dialog open={showMaintenanceDetails} onOpenChange={setShowMaintenanceDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Assets Due for Maintenance</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Asset Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>AST003</TableCell>
                <TableCell>Microscope</TableCell>
                <TableCell>Biology</TableCell>
                <TableCell>2023-08-15</TableCell>
                <TableCell>2024-02-15</TableCell>
                <TableCell><Badge variant="destructive">High</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>AST007</TableCell>
                <TableCell>Projector</TableCell>
                <TableCell>Computer Science</TableCell>
                <TableCell>2023-11-20</TableCell>
                <TableCell>2024-02-20</TableCell>
                <TableCell><Badge variant="default">Medium</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Low Stock Details Dialog */}
      <Dialog open={showLowStockDetails} onOpenChange={setShowLowStockDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Low Stock Items</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Minimum Threshold</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Printer Paper</TableCell>
                <TableCell>5 units</TableCell>
                <TableCell>20 units</TableCell>
                <TableCell>Administration</TableCell>
                <TableCell><Badge variant="destructive">Critical</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lab Chemicals</TableCell>
                <TableCell>8 units</TableCell>
                <TableCell>15 units</TableCell>
                <TableCell>Chemistry</TableCell>
                <TableCell><Badge variant="default">Medium</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Asset Assignments Dialog */}
      <Dialog open={showAssetAssignments} onOpenChange={setShowAssetAssignments}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Asset Assignments Overview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Select value={assetFilter} onValueChange={setAssetFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="civil">Civil Engineering</SelectItem>
                  <SelectItem value="mechanical">Mechanical</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assignment Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>AST001</TableCell>
                  <TableCell>Laptop</TableCell>
                  <TableCell>Prof. Kumar</TableCell>
                  <TableCell>Computer Science</TableCell>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AST002</TableCell>
                  <TableCell>Projector</TableCell>
                  <TableCell>Dr. Sharma</TableCell>
                  <TableCell>Civil Engineering</TableCell>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recent Activities Dialog */}
      <Dialog open={showRecentActivities} onOpenChange={setShowRecentActivities}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Recent Activities</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Asset/Item</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2024-01-30 04:15 PM</TableCell>
                <TableCell>Asset Assignment</TableCell>
                <TableCell>Prof. Kumar</TableCell>
                <TableCell>Computer Science</TableCell>
                <TableCell>Laptop (AST001)</TableCell>
                <TableCell><Badge variant="secondary">Completed</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-30 03:45 PM</TableCell>
                <TableCell>Quotation Approval</TableCell>
                <TableCell>Mr. Sharma (ACC)</TableCell>
                <TableCell>Civil Engineering</TableCell>
                <TableCell>AutoCAD Licenses</TableCell>
                <TableCell><Badge variant="default">Pending Secretary</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-30 02:30 PM</TableCell>
                <TableCell>Asset Registration</TableCell>
                <TableCell>Dr. Patel</TableCell>
                <TableCell>Chemistry</TableCell>
                <TableCell>Microscope (AST012)</TableCell>
                <TableCell><Badge variant="secondary">Completed</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-30 01:15 PM</TableCell>
                <TableCell>Maintenance Request</TableCell>
                <TableCell>Prof. Singh</TableCell>
                <TableCell>Mechanical</TableCell>
                <TableCell>3D Printer (AST008)</TableCell>
                <TableCell><Badge variant="destructive">Urgent</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-30 11:30 AM</TableCell>
                <TableCell>Stock Update</TableCell>
                <TableCell>Admin Staff</TableCell>
                <TableCell>Administration</TableCell>
                <TableCell>Printer Paper</TableCell>
                <TableCell><Badge variant="default">Low Stock</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Department Overview Dialog */}
      <Dialog open={showDepartmentOverview} onOpenChange={setShowDepartmentOverview}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Department Overview</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Total Assets</TableHead>
                <TableHead>Active Assets</TableHead>
                <TableHead>Maintenance Due</TableHead>
                <TableHead>HOD</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Computer Science</TableCell>
                <TableCell>145</TableCell>
                <TableCell>132</TableCell>
                <TableCell>3</TableCell>
                <TableCell>Prof. Kumar</TableCell>
                <TableCell>2024-01-30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Civil Engineering</TableCell>
                <TableCell>98</TableCell>
                <TableCell>89</TableCell>
                <TableCell>5</TableCell>
                <TableCell>Dr. Sharma</TableCell>
                <TableCell>2024-01-30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mechanical Engineering</TableCell>
                <TableCell>167</TableCell>
                <TableCell>154</TableCell>
                <TableCell>8</TableCell>
                <TableCell>Prof. Singh</TableCell>
                <TableCell>2024-01-29</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Electrical Engineering</TableCell>
                <TableCell>123</TableCell>
                <TableCell>118</TableCell>
                <TableCell>2</TableCell>
                <TableCell>Dr. Patel</TableCell>
                <TableCell>2024-01-30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Chemistry</TableCell>
                <TableCell>89</TableCell>
                <TableCell>85</TableCell>
                <TableCell>4</TableCell>
                <TableCell>Prof. Gupta</TableCell>
                <TableCell>2024-01-30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Physics</TableCell>
                <TableCell>76</TableCell>
                <TableCell>71</TableCell>
                <TableCell>1</TableCell>
                <TableCell>Dr. Verma</TableCell>
                <TableCell>2024-01-29</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecretaryDashboard;