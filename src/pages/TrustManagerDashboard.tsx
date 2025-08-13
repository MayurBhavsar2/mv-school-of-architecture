import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Filter, FileCheck, AlertTriangle, Package, Wrench, TrendingDown, Users, Calendar, ExternalLink, UserCheck, RefreshCw, ShoppingCart, CheckCircle, Clock, Shield, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const TrustManagerDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFinalApprovals, setShowFinalApprovals] = useState(false);
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);
  const [selectedQuotationHistory, setSelectedQuotationHistory] = useState<any>(null);
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false);
  const [showLowStockDetails, setShowLowStockDetails] = useState(false);
  const [showAssetAssignments, setShowAssetAssignments] = useState(false);
  
  const { toast } = useToast();

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "secretary_approved",
      message: "Quotation for Laboratory Equipment Set approved by Secretary - awaiting final approval",
      timestamp: "2024-01-30 04:15 PM",
      status: "unread"
    },
    {
      id: 2,
      type: "secretary_approved", 
      message: "Quotation for AutoCAD Licenses approved by Secretary - awaiting final approval",
      timestamp: "2024-01-30 04:00 PM",
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
      message: "Laboratory equipment maintenance scheduled",
      timestamp: "2024-01-29 02:45 PM",
      status: "read"
    }
  ];

  // Mock final approval quotations from Secretary
  const finalApprovals = [
    {
      id: 1,
      item: "Laboratory Equipment Set",
      department: "Chemistry",
      requestedBy: "Dr. Singh",
      totalAmount: "₹2,50,000",
      quotationCount: 3,
      recommendedVendor: "Scientific Instruments Ltd",
      vendorContact: "contact@scientificinstruments.com",
      vendorPhone: "+91-9876543210",
      status: "pending_trust_manager_approval",
      approvalHistory: [
        {
          level: "Faculty Request",
          approvedBy: "Dr. Singh",
          approvalDate: "2024-01-28",
          comments: "Required for new laboratory setup"
        },
        {
          level: "ACC Approval",
          approvedBy: "Mr. Sharma (ACC)",
          approvalDate: "2024-01-29",
          comments: "Budget approved, quotations verified"
        },
        {
          level: "Secretary Approval",
          approvedBy: "Mrs. Gupta (Secretary)",
          approvalDate: "2024-01-30",
          comments: "Final verification completed, ready for procurement"
        }
      ]
    },
    {
      id: 2,
      item: "AutoCAD Licenses (10 units)",
      department: "Civil Engineering",
      requestedBy: "Dr. Kumar",
      totalAmount: "₹85,000",
      quotationCount: 3,
      recommendedVendor: "TechSoft Solutions",
      vendorContact: "sales@techsoft.com",
      vendorPhone: "+91-9876543211",
      status: "pending_trust_manager_approval",
      approvalHistory: [
        {
          level: "Faculty Request",
          approvedBy: "Dr. Kumar",
          approvalDate: "2024-01-29",
          comments: "Software licenses for student lab"
        },
        {
          level: "ACC Approval",
          approvedBy: "Mr. Sharma (ACC)",
          approvalDate: "2024-01-30",
          comments: "Budget allocation confirmed"
        },
        {
          level: "Secretary Approval",
          approvedBy: "Mrs. Gupta (Secretary)",
          approvalDate: "2024-01-30",
          comments: "Approved for immediate procurement"
        }
      ]
    },
    {
      id: 3,
      item: "High-End Workstation",
      department: "Computer Science",
      requestedBy: "Prof. Patel",
      totalAmount: "₹1,25,000",
      quotationCount: 3,
      recommendedVendor: "Dell Technologies",
      vendorContact: "enterprise@dell.com",
      vendorPhone: "+91-9876543212",
      status: "approved_by_trust_manager",
      approvalHistory: [
        {
          level: "Faculty Request",
          approvedBy: "Prof. Patel",
          approvalDate: "2024-01-27",
          comments: "High-performance workstation for research"
        },
        {
          level: "ACC Approval",
          approvedBy: "Mr. Sharma (ACC)",
          approvalDate: "2024-01-28",
          comments: "Budget verified and approved"
        },
        {
          level: "Secretary Approval",
          approvedBy: "Mrs. Gupta (Secretary)",
          approvalDate: "2024-01-29",
          comments: "All documentation complete"
        },
        {
          level: "Trust Manager Final Approval",
          approvedBy: "Mr. Rajesh (Trust Manager)",
          approvalDate: "2024-01-30",
          comments: "Final approval granted, vendor notification sent"
        }
      ]
    }
  ];

  // Mock asset data
  const assetStats = [
    { label: "Total Assets", value: "1,247", change: "+8.2%", color: "text-blue-600" },
    { label: "Active Assets", value: "1,156", change: "+2.1%", color: "text-green-600" },
    { label: "Maintenance Due", value: "23", change: "-5.3%", color: "text-orange-600" },
    { label: "Low Stock Items", value: "8", change: "+12.5%", color: "text-red-600" },
  ];

  const handleFinalApprove = (quotationId: number) => {
    const quotation = finalApprovals.find(q => q.id === quotationId);
    if (quotation) {
      // Send notification to vendor
      toast({
        title: "Final Approval Granted",
        description: `Quotation approved. Email and SMS sent to ${quotation.recommendedVendor}`,
      });
      
      // Notify all dashboards
      setTimeout(() => {
        toast({
          title: "System Notification",
          description: "All dashboards notified of Trust Manager approval",
        });
      }, 1000);
    }
  };

  const handleRejectQuotation = (quotationId: number) => {
    toast({
      title: "Quotation Rejected",
      description: "The quotation has been rejected and returned to Secretary.",
      variant: "destructive",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "secretary_approved": return <Shield className="h-4 w-4 text-green-500" />;
      case "new_asset": return <Package className="h-4 w-4 text-blue-500" />;
      case "low_stock": return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case "maintenance": return <Wrench className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const viewApprovalHistory = (quotation: any) => {
    setSelectedQuotationHistory(quotation);
    setShowApprovalHistory(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Trust Manager Dashboard</h1>
              <p className="text-muted-foreground">Final Approval Authority & Asset Oversight</p>
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
          {/* Final Approval Required */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowFinalApprovals(true)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Final Approval Required</CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {finalApprovals.filter(q => q.status === 'pending_trust_manager_approval').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Approved by Secretary - Awaiting Final Decision
              </p>
              <Badge variant="outline" className="mt-2">
                High Priority
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

          {/* Approved Purchases */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Purchases</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {finalApprovals.filter(q => q.status === 'approved_by_trust_manager').length}
              </div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
              <Badge variant="outline" className="mt-2">
                Completed
              </Badge>
            </CardContent>
          </Card>

          {/* Institute Overview */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Institute Overview</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">
                Active departments
              </p>
              <Badge variant="outline" className="mt-2">
                All Systems
              </Badge>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Final Approvals Dialog */}
      <Dialog open={showFinalApprovals} onOpenChange={setShowFinalApprovals}>
        <DialogContent className="max-w-7xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Final Approval Required - Trust Manager Decision</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Recommended Vendor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>History</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalApprovals.map((quotation) => (
                  <TableRow key={quotation.id}>
                    <TableCell className="font-medium">{quotation.item}</TableCell>
                    <TableCell>{quotation.department}</TableCell>
                    <TableCell>{quotation.requestedBy}</TableCell>
                    <TableCell className="font-semibold">{quotation.totalAmount}</TableCell>
                    <TableCell>{quotation.recommendedVendor}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span className="text-xs">{quotation.vendorContact}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">{quotation.vendorPhone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={quotation.status === 'pending_trust_manager_approval' ? 'default' : 'secondary'}
                      >
                        {quotation.status === 'pending_trust_manager_approval' ? 'Awaiting Decision' : 'Approved'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => viewApprovalHistory(quotation)}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        View History
                      </Button>
                    </TableCell>
                    <TableCell>
                      {quotation.status === 'pending_trust_manager_approval' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleFinalApprove(quotation.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Final Approve
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
                      {quotation.status === 'approved_by_trust_manager' && (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval History Dialog */}
      <Dialog open={showApprovalHistory} onOpenChange={setShowApprovalHistory}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Approval History - {selectedQuotationHistory?.item}</DialogTitle>
          </DialogHeader>
          {selectedQuotationHistory && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Purchase Request Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Department:</span> {selectedQuotationHistory.department}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Requested By:</span> {selectedQuotationHistory.requestedBy}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Amount:</span> {selectedQuotationHistory.totalAmount}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recommended Vendor:</span> {selectedQuotationHistory.recommendedVendor}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Approval Workflow</h3>
                {selectedQuotationHistory.approvalHistory.map((approval: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{approval.level}</h4>
                        <Badge variant="outline">{approval.approvalDate}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Approved by: {approval.approvedBy}
                      </p>
                      <p className="text-sm mt-2">{approval.comments}</p>
                    </div>
                  </div>
                ))}
                
                {selectedQuotationHistory.status === 'pending_trust_manager_approval' && (
                  <div className="flex items-start gap-4 p-4 border rounded-lg border-dashed">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Trust Manager Final Approval</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Awaiting decision from Trust Manager
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          onClick={() => {
                            handleFinalApprove(selectedQuotationHistory.id);
                            setShowApprovalHistory(false);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Grant Final Approval
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => {
                            handleRejectQuotation(selectedQuotationHistory.id);
                            setShowApprovalHistory(false);
                          }}
                        >
                          Reject Request
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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

      {/* Other dialog components would go here - similar to Secretary Dashboard */}
      {/* Maintenance Details Dialog, Low Stock Details Dialog, Asset Assignments Dialog */}
    </div>
  );
};

export default TrustManagerDashboard;
