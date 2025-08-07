import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Bell, Package, CheckCircle, Clock, FileText, AlertTriangle, User, Wrench, Plus } from "lucide-react";
import { toast } from "sonner";

const HODDashboard = () => {
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [auditFormData, setAuditFormData] = useState<any>({});
  const [auditStatus, setAuditStatus] = useState("pending");
  const [auditComments, setAuditComments] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data for HOD assigned assets
  const assignedAssets = [
    {
      id: "AST001",
      name: "Dell Laptop",
      type: "Digital",
      location: "Room 101",
      department: "Computer Science",
      assignedDate: "2024-01-15",
      status: "Active",
      lastMaintenance: "2024-01-10"
    },
    {
      id: "AST002", 
      name: "3D Printer",
      type: "Physical",
      location: "Lab 203",
      department: "Computer Science",
      assignedDate: "2024-02-01",
      status: "Active",
      lastMaintenance: "2024-02-28"
    },
    {
      id: "AST003",
      name: "Whiteboard Markers",
      type: "Consumable",
      location: "Office 105",
      department: "Computer Science", 
      assignedDate: "2024-03-01",
      status: "Low Stock",
      lastMaintenance: null
    }
  ];

  // Mock data for audit assignments
  const auditAssignments = [
    {
      id: "AUD001",
      assetId: "AST002",
      assetName: "3D Printer",
      assetType: "Physical",
      assignedBy: "Principal",
      assignedDate: "2024-03-15",
      dueDate: "2024-03-25",
      status: "Pending",
      auditFields: {
        maintenance: false,
        functionality: false,
        safety: false,
        documentation: false,
        calibration: false
      }
    },
    {
      id: "AUD002", 
      assetId: "AST001",
      assetName: "Dell Laptop",
      assetType: "Digital",
      assignedBy: "Principal",
      assignedDate: "2024-03-10",
      dueDate: "2024-03-20",
      status: "In Progress",
      auditFields: {
        software_license: false,
        security_updates: false,
        performance: false,
        backup_status: false,
        warranty: false
      }
    }
  ];

  // Mock notification data
  const notifications = [
    {
      id: "NOT001",
      type: "New Asset Assignment",
      title: "New Asset Assigned",
      message: "You have been assigned to oversee the new Microscope (AST004) in Lab 205.",
      icon: User,
      timestamp: "2 hours ago",
      isRead: false
    },
    {
      id: "NOT002", 
      type: "Audit Assignment",
      title: "Audit Assignment from Principal",
      message: "You have been assigned to audit the 3D Printer (AST002) by March 25, 2024.",
      icon: FileText,
      timestamp: "1 day ago",
      isRead: false
    },
    {
      id: "NOT003",
      type: "Maintenance Alert",
      title: "Maintenance Due Soon",
      message: "Dell Laptop (AST001) maintenance is due on March 30, 2024.",
      icon: Wrench,
      timestamp: "3 days ago",
      isRead: true
    },
    {
      id: "NOT004",
      type: "Asset Status Update",
      title: "Asset Status Changed",
      message: "Whiteboard Markers (AST003) status updated to Low Stock.",
      icon: AlertTriangle,
      timestamp: "1 week ago",
      isRead: true
    },
    {
      id: "NOT005",
      type: "Purchase Request",
      title: "Purchase Request Notification",
      message: "You have received a notification regarding purchase request PR001 for High-End Workstation.",
      icon: FileText,
      timestamp: "5 hours ago",
      isRead: false
    }
  ];

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const getAuditFieldsForAssetType = (assetType: string) => {
    switch (assetType) {
      case "Physical":
        return [
          { key: "maintenance", label: "Maintenance Status", description: "Check if maintenance is up to date" },
          { key: "functionality", label: "Functionality Check", description: "Verify equipment is working properly" },
          { key: "safety", label: "Safety Compliance", description: "Ensure safety protocols are followed" },
          { key: "documentation", label: "Documentation", description: "Check if manuals and docs are available" },
          { key: "calibration", label: "Calibration", description: "Verify calibration is current" }
        ];
      case "Digital":
        return [
          { key: "software_license", label: "Software License", description: "Check license validity and expiry" },
          { key: "security_updates", label: "Security Updates", description: "Verify latest security patches" },
          { key: "performance", label: "Performance Check", description: "Test system performance" },
          { key: "backup_status", label: "Backup Status", description: "Verify data backup procedures" },
          { key: "warranty", label: "Warranty Status", description: "Check warranty validity" }
        ];
      case "Consumable":
        return [
          { key: "stock_level", label: "Stock Level", description: "Check current inventory levels" },
          { key: "expiry_date", label: "Expiry Date", description: "Verify expiration dates" },
          { key: "quality", label: "Quality Check", description: "Inspect item quality" },
          { key: "storage", label: "Storage Conditions", description: "Check storage environment" },
          { key: "usage_tracking", label: "Usage Tracking", description: "Monitor consumption rate" }
        ];
      default:
        return [];
    }
  };

  const handleAuditFieldChange = (fieldKey: string, checked: boolean) => {
    setAuditFormData(prev => ({
      ...prev,
      [fieldKey]: checked
    }));
  };

  const handleSubmitAudit = () => {
    const auditFields = getAuditFieldsForAssetType(selectedAudit.assetType);
    const completedFields = auditFields.filter(field => auditFormData[field.key]).length;
    const totalFields = auditFields.length;
    
    if (completedFields === totalFields && auditStatus === "completed") {
      toast.success(`Audit completed for ${selectedAudit.assetName}. Principal has been notified.`);
      setSelectedAudit(null);
      setAuditFormData({});
      setAuditStatus("pending");
      setAuditComments("");
    } else {
      toast.error("Please complete all audit fields and set status to completed before submitting.");
    }
  };


  const pendingAudits = auditAssignments.filter(audit => audit.status === "Pending").length;
  const inProgressAudits = auditAssignments.filter(audit => audit.status === "In Progress").length;
  const completedAudits = auditAssignments.filter(audit => audit.status === "Completed").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">HOD Dashboard</h1>
              <p className="text-muted-foreground">Computer Science Department</p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {unreadNotifications > 0 && (
                  <Badge variant="destructive" className="ml-2">{unreadNotifications}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Assets</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedAssets.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Audits</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingAudits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{inProgressAudits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedAudits}</div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Assets */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Assigned Assets</CardTitle>
            <CardDescription>Assets under your supervision</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{asset.type}</Badge>
                    </TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>
                      <Badge variant={asset.status === "Active" ? "default" : "destructive"}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.lastMaintenance || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Audit Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Assignments</CardTitle>
            <CardDescription>Assets assigned for audit by the Principal</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditAssignments.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.assetId}</TableCell>
                    <TableCell>{audit.assetName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{audit.assetType}</Badge>
                    </TableCell>
                    <TableCell>{audit.assignedDate}</TableCell>
                    <TableCell>{audit.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={
                        audit.status === "Completed" ? "default" :
                        audit.status === "In Progress" ? "secondary" : "destructive"
                      }>
                        {audit.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedAudit(audit)}
                        disabled={audit.status === "Completed"}
                      >
                        Start Audit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notifications Dialog */}
        <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </DialogTitle>
              <DialogDescription>
                Recent notifications and alerts
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No notifications</p>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${!notification.isRead ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${!notification.isRead ? 'bg-primary/10' : 'bg-muted'}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            {!notification.isRead && (
                              <Badge variant="destructive" className="text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                            <Badge variant="outline" className="text-xs">{notification.type}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setShowNotifications(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>


        {/* Audit Form Dialog */}
        <Dialog open={!!selectedAudit} onOpenChange={() => setSelectedAudit(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Audit: {selectedAudit?.assetName}</DialogTitle>
              <DialogDescription>
                Complete the audit checklist for this {selectedAudit?.assetType} asset
              </DialogDescription>
            </DialogHeader>
            
            {selectedAudit && (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Asset Details</h3>
                  <p><strong>Asset ID:</strong> {selectedAudit.assetId}</p>
                  <p><strong>Name:</strong> {selectedAudit.assetName}</p>
                  <p><strong>Type:</strong> {selectedAudit.assetType}</p>
                  <p><strong>Due Date:</strong> {selectedAudit.dueDate}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Audit Checklist</h3>
                  <div className="space-y-4">
                    {getAuditFieldsForAssetType(selectedAudit.assetType).map((field) => (
                      <div key={field.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={field.key}
                          checked={auditFormData[field.key] || false}
                          onCheckedChange={(checked) => handleAuditFieldChange(field.key, checked as boolean)}
                        />
                        <div className="flex-1">
                          <label htmlFor={field.key} className="font-medium cursor-pointer">
                            {field.label}
                          </label>
                          <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Audit Status</label>
                  <Select value={auditStatus} onValueChange={setAuditStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Comments (Optional)</label>
                  <Textarea
                    value={auditComments}
                    onChange={(e) => setAuditComments(e.target.value)}
                    placeholder="Add any additional comments about the audit..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSubmitAudit} className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Audit Report
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedAudit(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default HODDashboard;