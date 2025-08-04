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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, CheckCircle, XCircle, Upload } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showPurchaseRequests, setShowPurchaseRequests] = useState(false);
  const [showQuotationCollection, setShowQuotationCollection] = useState(false);
  const [selectedRequestForQuotation, setSelectedRequestForQuotation] = useState<string | null>(null);
  const [vendors, setVendors] = useState([
    { name: "", file: null },
    { name: "", file: null },
    { name: "", file: null }
  ]);
  
  // Mock approved purchase requests data
  const [approvedPurchaseRequests, setApprovedPurchaseRequests] = useState([
    {
      id: "PR001",
      assetName: "High-End Workstation",
      assetType: "Physical",
      department: "Computer Science",
      hodName: "Dr. Smith",
      approxCosting: "₹1,50,000",
      priority: "High",
      requestDate: "2024-03-15",
      approvedDate: "2024-03-16",
      purpose: "Required for advanced computing research and student projects",
      useful: "Will enhance research capabilities and provide students with industry-standard computing power",
      status: "approved",
      purchaseStatus: "pending",
      quotationStatus: "pending" // New field to track quotation collection
    },
    {
      id: "PR002",
      assetName: "AutoCAD Licenses",
      assetType: "Digital",
      department: "Mechanical",
      hodName: "Dr. Brown",
      approxCosting: "₹2,00,000",
      priority: "Medium",
      requestDate: "2024-03-14",
      approvedDate: "2024-03-15",
      purpose: "Software licenses for 50 students in mechanical design course",
      useful: "Essential for teaching CAD/CAM courses and enabling students to work on real-world design projects",
      status: "approved",
      purchaseStatus: "pending",
      quotationStatus: "collected" // Admin has collected quotations
    }
  ]);

  // Mock quotations collected by admin
  const [quotations, setQuotations] = useState([
    {
      requestId: "PR002",
      quotations: [
        { vendor: "Autodesk Direct", cost: "₹1,95,000", deliveryTime: "5 days", specifications: "50 user licenses, 1-year subscription" },
        { vendor: "Software Solutions Inc", cost: "₹2,10,000", deliveryTime: "3 days", specifications: "50 user licenses, 1-year subscription + training" },
        { vendor: "Tech Distributors", cost: "₹1,85,000", deliveryTime: "7 days", specifications: "50 user licenses, 1-year subscription" }
      ]
    }
  ]);

  const handleCollectQuotations = (id: string) => {
    setSelectedRequestForQuotation(id);
    setShowQuotationCollection(true);
    setVendors([
      { name: "", file: null },
      { name: "", file: null },
      { name: "", file: null }
    ]);
  };

  const handleVendorNameChange = (index: number, name: string) => {
    setVendors(prev => prev.map((vendor, i) => 
      i === index ? { ...vendor, name } : vendor
    ));
  };

  const handleFileUpload = (index: number, file: File | null) => {
    setVendors(prev => prev.map((vendor, i) => 
      i === index ? { ...vendor, file } : vendor
    ));
  };

  const handleSubmitQuotations = () => {
    if (!selectedRequestForQuotation) return;
    
    const incompleteVendors = vendors.filter(v => !v.name.trim() || !v.file);
    if (incompleteVendors.length > 0) {
      toast.error("Please provide vendor names and upload files for all 3 vendors");
      return;
    }

    const updatedRequests = approvedPurchaseRequests.map(request => {
      if (request.id === selectedRequestForQuotation) {
        return { ...request, quotationStatus: "collected" };
      }
      return request;
    });
    
    setApprovedPurchaseRequests(updatedRequests);
    
    // Add mock quotation data
    const newQuotations = {
      requestId: selectedRequestForQuotation,
      quotations: vendors.map((vendor, index) => ({
        vendor: vendor.name,
        cost: `₹${(150000 + Math.random() * 100000).toFixed(0)}`,
        deliveryTime: `${5 + Math.floor(Math.random() * 10)} days`,
        specifications: "As per requirements",
        file: vendor.file
      }))
    };
    
    setQuotations(prev => [...prev.filter(q => q.requestId !== selectedRequestForQuotation), newQuotations]);
    
    const request = approvedPurchaseRequests.find(r => r.id === selectedRequestForQuotation);
    toast.success(`Quotations collected for ${request?.assetName} from all 3 vendors.`);
    
    setShowQuotationCollection(false);
    setSelectedRequestForQuotation(null);
  };

  const handleSendQuotationsToPrincipal = (id: string) => {
    const updatedRequests = approvedPurchaseRequests.map(request => {
      if (request.id === id) {
        return { ...request, quotationStatus: "sent_to_principal" };
      }
      return request;
    });
    
    setApprovedPurchaseRequests(updatedRequests);
    
    const request = approvedPurchaseRequests.find(r => r.id === id);
    toast.success(`Quotations for ${request?.assetName} sent to Principal for final approval.`);
  };

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
                          <p><strong>Approximate Cost:</strong> {request.approxCosting}</p>
                        </div>
                        <div>
                          <p><strong>Quotation Status:</strong> 
                            <span className={`ml-1 ${
                              request.quotationStatus === "collected" ? "text-green-600" :
                              request.quotationStatus === "sent_to_principal" ? "text-blue-600" : "text-orange-600"
                            }`}>
                              {request.quotationStatus?.replace("_", " ") || "pending"}
                            </span>
                          </p>
                          <p><strong>Purchase Status:</strong> 
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
                        <p><strong>Purpose:</strong> {request.purpose}</p>
                        <p><strong>Usefulness:</strong> {request.useful}</p>
                      </div>

                      {/* Show quotations if collected */}
                      {request.quotationStatus === "collected" && quotations.find(q => q.requestId === request.id) && (
                        <div className="mt-4 p-3 bg-gray-50 rounded border">
                          <h4 className="font-medium mb-2">Collected Quotations:</h4>
                          <div className="space-y-2">
                            {quotations.find(q => q.requestId === request.id)?.quotations.map((quote, index) => (
                              <div key={index} className="text-sm border-l-2 border-gray-300 pl-3">
                                <p><strong>{quote.vendor}:</strong> {quote.cost} - {quote.deliveryTime}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {request.purchaseStatus === "pending" && (
                    <div className="flex gap-2 pt-4 border-t">
                      {request.quotationStatus === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleCollectQuotations(request.id)}
                          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Collect 3 Quotations
                        </Button>
                      )}
                      {request.quotationStatus === "collected" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleSendQuotationsToPrincipal(request.id)}
                          className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Send Quotations to Principal
                        </Button>
                      )}
                      {request.quotationStatus === "sent_to_principal" && (
                        <div className="text-sm text-muted-foreground italic">
                          Waiting for Principal's approval on quotations...
                        </div>
                      )}
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

      {/* Quotation Collection Dialog */}
      <Dialog open={showQuotationCollection} onOpenChange={setShowQuotationCollection}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Collect Quotations from 3 Vendors
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {vendors.map((vendor, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-lg">Vendor {index + 1}</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`vendor-name-${index}`}>Vendor Name</Label>
                    <Input
                      id={`vendor-name-${index}`}
                      placeholder="Enter vendor name"
                      value={vendor.name}
                      onChange={(e) => handleVendorNameChange(index, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`vendor-file-${index}`}>Upload Quotation File</Label>
                    <Input
                      id={`vendor-file-${index}`}
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(index, e.target.files?.[0] || null)}
                    />
                    {vendor.file && (
                      <p className="text-sm text-green-600 mt-1">
                        File uploaded: {vendor.file.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSubmitQuotations}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit All Quotations
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowQuotationCollection(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
