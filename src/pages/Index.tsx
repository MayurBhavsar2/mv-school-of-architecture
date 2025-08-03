import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AssetChart } from "@/components/dashboard/AssetChart";
import { RecentAssets } from "@/components/dashboard/RecentAssets";
import { AssetTypeSelector } from "@/components/forms/AssetTypeSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showPurchaseRequests, setShowPurchaseRequests] = useState(false);
  
  // Mock approved purchase requests data
  const [approvedPurchaseRequests, setApprovedPurchaseRequests] = useState([
    {
      id: "PR001",
      assetName: "High-End Workstation",
      assetType: "Physical",
      department: "Computer Science",
      hodName: "Dr. Smith",
      estimatedCost: "₹1,50,000",
      priority: "High",
      requestDate: "2024-03-15",
      approvedDate: "2024-03-16",
      justification: "Required for advanced computing research and student projects",
      status: "approved",
      description: "Intel i9 processor, 32GB RAM, RTX 4090 GPU",
      vendor: "Dell Technologies",
      purchaseStatus: "pending"
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
      approvedDate: "2024-03-15",
      justification: "Software licenses for 50 students in mechanical design course",
      status: "approved",
      description: "Annual subscription for 50 users",
      vendor: "Autodesk",
      purchaseStatus: "pending"
    }
  ]);

  const handlePurchaseAction = (id: string, action: "purchase" | "reject") => {
    const updatedRequests = approvedPurchaseRequests.map(request => {
      if (request.id === id) {
        return { ...request, purchaseStatus: action === "purchase" ? "purchased" : "rejected" };
      }
      return request;
    });
    
    setApprovedPurchaseRequests(updatedRequests);
    
    const request = approvedPurchaseRequests.find(r => r.id === id);
    if (action === "purchase") {
      toast.success(`Purchase initiated for ${request?.assetName}. Asset will be registered upon delivery.`);
    } else {
      toast.error(`Purchase request for ${request?.assetName} has been rejected.`);
    }
  };

  return (
    <>
      <DashboardLayout onAddAsset={() => setShowAssetForm(true)}>
        <div className="space-y-8">
          <DashboardStats />
          
          {/* Purchase Requests Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowPurchaseRequests(true)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Purchase Requests from Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {approvedPurchaseRequests.filter(r => r.purchaseStatus === "pending").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Approved requests awaiting purchase</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {approvedPurchaseRequests.filter(r => r.purchaseStatus === "purchased").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <AssetChart />
          <RecentAssets />
        </div>
      </DashboardLayout>
      
      {showAssetForm && (
        <AssetTypeSelector onClose={() => setShowAssetForm(false)} />
      )}

      {/* Purchase Requests Dialog */}
      <Dialog open={showPurchaseRequests} onOpenChange={setShowPurchaseRequests}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Approved Purchase Requests
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {approvedPurchaseRequests.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No purchase requests</p>
            ) : (
              approvedPurchaseRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{request.assetName}</h3>
                        <Badge variant="outline">{request.assetType}</Badge>
                        <Badge variant={
                          request.priority === "Urgent" ? "destructive" :
                          request.priority === "High" ? "destructive" :
                          request.priority === "Medium" ? "secondary" : "outline"
                        }>
                          {request.priority}
                        </Badge>
                        <Badge variant="default">Approved by Principal</Badge>
                        <Badge variant={
                          request.purchaseStatus === "purchased" ? "default" :
                          request.purchaseStatus === "rejected" ? "destructive" : "secondary"
                        }>
                          {request.purchaseStatus}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p><strong>Request ID:</strong> {request.id}</p>
                          <p><strong>Department:</strong> {request.department}</p>
                          <p><strong>Requested by:</strong> {request.hodName}</p>
                        </div>
                        <div>
                          <p><strong>Request Date:</strong> {request.requestDate}</p>
                          <p><strong>Approved Date:</strong> {request.approvedDate}</p>
                          <p><strong>Estimated Cost:</strong> {request.estimatedCost}</p>
                        </div>
                        <div>
                          <p><strong>Vendor:</strong> {request.vendor}</p>
                          <p><strong>Status:</strong> 
                            <span className={`ml-1 ${
                              request.purchaseStatus === "purchased" ? "text-green-600" :
                              request.purchaseStatus === "rejected" ? "text-red-600" : "text-blue-600"
                            }`}>
                              {request.purchaseStatus}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p><strong>Description:</strong> {request.description}</p>
                        <p><strong>Justification:</strong> {request.justification}</p>
                      </div>
                    </div>
                  </div>
                  {request.purchaseStatus === "pending" && (
                    <div className="flex gap-2 pt-4 border-t">
                      <Button 
                        size="sm" 
                        onClick={() => handlePurchaseAction(request.id, "purchase")}
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Proceed with Purchase
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handlePurchaseAction(request.id, "reject")}
                        className="flex items-center gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject Purchase
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
