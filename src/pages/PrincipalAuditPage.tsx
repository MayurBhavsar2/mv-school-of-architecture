import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Calendar, Users, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PrincipalAuditPage = () => {
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [showAuditDetails, setShowAuditDetails] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      type: "",
      assetType: "",
      auditorName: "",
      auditorEmail: "",
      auditorPhone: "",
      auditDate: "",
      auditRangeStart: "",
      auditRangeEnd: "",
      assetDetails: null,
      maintenance: "",
      notes: ""
    }
  });

  // Mock audit assignments data
  const auditAssignments = [
    {
      id: "AUD001",
      type: "Internal",
      auditorName: "Dr. Rajesh Kumar",
      auditorEmail: "rajesh.kumar@mvarch.edu",
      auditDate: "2024-02-15",
      auditRange: "2024-02-15 to 2024-02-20",
      status: "In Progress",
      assetsCount: 25,
      completedCount: 8
    },
    {
      id: "AUD002",
      type: "External",
      auditorName: "CA Priya Sharma",
      auditorEmail: "priya.sharma@audit.com",
      auditDate: "2024-02-10",
      auditRange: "2024-02-10 to 2024-02-12",
      status: "Completed",
      assetsCount: 15,
      completedCount: 15
    },
    {
      id: "AUD003",
      type: "Internal",
      auditorName: "Prof. Amit Singh",
      auditorEmail: "amit.singh@mvarch.edu",
      auditDate: "2024-02-20",
      auditRange: "2024-02-20 to 2024-02-25",
      status: "Pending",
      assetsCount: 30,
      completedCount: 0
    }
  ];

  const handleAssignAuditor = (data: any) => {
    console.log("Assigning auditor:", data);
    toast.success("Audit assignment sent to auditor successfully!");
    setShowAssignForm(false);
    form.reset();
  };

  const handleViewDetails = (audit: any) => {
    setSelectedAudit(audit);
    setShowAuditDetails(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Completed</Badge>;
      case "In Progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "Pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Audit Management</h1>
            <p className="text-muted-foreground">Manage asset audits and assign auditors</p>
          </div>
          <Button onClick={() => setShowAssignForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Assign Auditor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{auditAssignments.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {auditAssignments.filter(a => a.status === "In Progress").length}
              </div>
              <p className="text-xs text-muted-foreground">Active audits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {auditAssignments.filter(a => a.status === "Completed").length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auditors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(auditAssignments.map(a => a.auditorName)).size}
              </div>
              <p className="text-xs text-muted-foreground">Active auditors</p>
            </CardContent>
          </Card>
        </div>

        {/* Audit Assignments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Audit ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Auditor Name</TableHead>
                  <TableHead>Audit Date</TableHead>
                  <TableHead>Audit Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditAssignments.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.id}</TableCell>
                    <TableCell>
                      <Badge variant={audit.type === "Internal" ? "secondary" : "outline"}>
                        {audit.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{audit.auditorName}</TableCell>
                    <TableCell>{audit.auditDate}</TableCell>
                    <TableCell>{audit.auditRange}</TableCell>
                    <TableCell>{getStatusBadge(audit.status)}</TableCell>
                    <TableCell>
                      {audit.completedCount}/{audit.assetsCount} assets
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(audit)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Assign Auditor Dialog */}
      {showAssignForm && (
        <Dialog open={true} onOpenChange={() => setShowAssignForm(false)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assign Auditor</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAssignAuditor)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auditor Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select auditor type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="internal">Internal (Faculty/Staff)</SelectItem>
                            <SelectItem value="external">External Auditor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="auditDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audit Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="assetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Type to Audit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select asset type to audit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="physical">Physical Assets</SelectItem>
                          <SelectItem value="digital">Digital Assets</SelectItem>
                          <SelectItem value="consumable">Consumable Assets</SelectItem>
                          <SelectItem value="all">All Asset Types</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="auditorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auditor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter auditor name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="auditorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auditor Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="auditorPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="auditRangeStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audit Range Start</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="auditRangeEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audit Range End</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="assetDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Details (PDF)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".pdf"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance Instructions</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter specific maintenance instructions for audit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional instructions or notes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-4">
                  <Button type="submit">Assign Auditor</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAssignForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}

      {/* Audit Details Dialog */}
      {showAuditDetails && selectedAudit && (
        <Dialog open={true} onOpenChange={() => setShowAuditDetails(false)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Audit Details - {selectedAudit.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Auditor Information</h4>
                  <p className="font-medium">{selectedAudit.auditorName}</p>
                  <p className="text-sm text-muted-foreground">{selectedAudit.auditorEmail}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
                  {getStatusBadge(selectedAudit.status)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Audit Period</h4>
                  <p>{selectedAudit.auditRange}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Progress</h4>
                  <p>{selectedAudit.completedCount}/{selectedAudit.assetsCount} assets completed</p>
                </div>
              </div>

              {selectedAudit.status === "Completed" && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Audit Report</h4>
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <p className="text-sm">Audit completed successfully. All assets verified and maintenance requirements documented.</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PrincipalAuditPage;