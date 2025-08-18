import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Eye, MapPin } from "lucide-react";
import { EnhancedQRScanner } from "@/components/ui/enhanced-qr-scanner";
import { AssetQRData } from "@/utils/qrCode";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PrincipalAssetsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Same mock data as faculty but without edit capabilities
  const allAssets = [
    { 
      id: "AST001", name: "Microsoft Office 365", type: "Digital", licenseKey: "ABC123-DEF456", 
      faculty: "Dr. Smith", hod: "Prof. Computer Science", status: "Active", 
      activationDate: "2023-01-15", expiryDate: "2024-01-15", quantity: 50,
      vendor: "Microsoft Corp", vendorContact: "+1-800-642-7676", vendorEmail: "support@microsoft.com",
      picture: "office365_license.jpg", invoice: "INV001.pdf"
    },
    { 
      id: "AST002", name: "Projector", type: "Physical", gpsDeviceId: "GPS001", 
      faculty: "Prof. Johnson", hod: "Dr. Physics Head", status: "Active",
      location: "Room 101", vendor: "Epson", vendorContact: "+91-9876543210", 
      vendorEmail: "support@epson.com", maintenanceType: "Annual", maintenanceFrequency: "12 months",
      picture: "projector.jpg", invoice: "INV002.pdf"
    },
    { 
      id: "AST003", name: "AutoCAD License", type: "Digital", licenseKey: "XYZ789-QWE012", 
      faculty: "IT Faculty", hod: "Dr. IT Head", status: "Active",
      activationDate: "2023-06-01", expiryDate: "2024-06-01", quantity: 25,
      vendor: "Autodesk", vendorContact: "+1-415-507-5000", vendorEmail: "support@autodesk.com",
      picture: "autocad_license.jpg", invoice: "INV003.pdf"
    },
    { 
      id: "AST004", name: "Printer Paper", type: "Consumable", supplier: "Office Supplies Co.", 
      faculty: "Faculty", hod: "Faculty Head", status: "Low Stock", unitType: "Box",
      quantity: 5, returnQuantity: 0, alertThreshold: 10, expiryDate: "2025-12-31",
      vendor: "Office Supplies Co.", vendorContact: "+91-9988776655", vendorEmail: "sales@officesupplies.com",
      picture: "printer_paper.jpg", invoice: "INV004.pdf"
    },
    { 
      id: "AST005", name: "Whiteboard", type: "Physical", gpsDeviceId: "GPS002", 
      faculty: "Dr. Brown", hod: "Dr. Math Head", status: "Active",
      location: "Room 205", vendor: "Board Solutions", vendorContact: "+91-9876543211",
      vendorEmail: "info@boardsolutions.com", maintenanceType: "Cleaning", maintenanceFrequency: "6 months",
      picture: "whiteboard.jpg", invoice: "INV005.pdf"
    },
    { 
      id: "AST006", name: "Microscope", type: "Physical", gpsDeviceId: "GPS003", 
      faculty: "Dr. Wilson", hod: "Dr. Biology Head", status: "Maintenance Due",
      location: "Lab B", vendor: "Scientific Instruments", vendorContact: "+91-9876543212",
      vendorEmail: "service@scientific.com", maintenanceType: "Calibration", maintenanceFrequency: "6 months",
      picture: "microscope.jpg", invoice: "INV006.pdf"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'maintenance due': return 'destructive';
      case 'low stock': return 'secondary';
      case 'out of stock': return 'destructive';
      default: return 'default';
    }
  };

  const filteredData = allAssets.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = assetFilter === "all" || item.type.toLowerCase() === assetFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleHandoverFromQR = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    toast.success(`Demo: Handover request for ${assetData.assetName}!`);
    console.log("Demo handover request:", assetData, "at location:", location);
  };

  const handleAuditFromQR = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    toast.success(`Demo: Audit request for ${assetData.assetName}!`);
    console.log("Demo audit request:", assetData, "at location:", location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/principal')}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">All Assets</h1>
              <p className="text-muted-foreground">View all institute assets</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={assetFilter} onValueChange={setAssetFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="physical">Physical Assets</SelectItem>
                  <SelectItem value="digital">Digital Assets</SelectItem>
                  <SelectItem value="consumable">Consumables</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Assets Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{allAssets.length}</div>
                <div className="text-sm text-muted-foreground">Total Assets</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{allAssets.filter(a => a.type === "Physical").length}</div>
                <div className="text-sm text-muted-foreground">Physical</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{allAssets.filter(a => a.type === "Digital").length}</div>
                <div className="text-sm text-muted-foreground">Digital</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{allAssets.filter(a => a.type === "Consumable").length}</div>
                <div className="text-sm text-muted-foreground">Consumables</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Assets ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>HOD</TableHead>
                  <TableHead>Location/License</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Vendor</TableHead>
                   <TableHead>Picture</TableHead>
                   <TableHead>QR Code</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item: any) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.faculty}</TableCell>
                    <TableCell>{item.hod}</TableCell>
                    <TableCell>{item.location || item.licenseKey || item.unitType || 'N/A'}</TableCell>
                    <TableCell>{item.quantity || 'N/A'}</TableCell>
                    <TableCell>{item.vendor}</TableCell>
                     <TableCell>
                       {item.picture ? (
                         <Button 
                           variant="outline" 
                           size="sm"
                           onClick={() => setSelectedImage(item.picture)}
                         >
                           <Eye className="h-3 w-3 mr-1" />
                           View
                         </Button>
                       ) : (
                         "No picture"
                       )}
                     </TableCell>
                     <TableCell>
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => setShowQRScanner(true)}
                         className="gap-1"
                       >
                         <Eye className="h-3 w-3" />
                         Demo QR
                       </Button>
                     </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.type === 'Physical' && item.gpsDeviceId && (
                        <Button size="sm" variant="outline" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          Track
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Picture Dialog */}
      {selectedImage && (
        <Dialog open={true} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Asset Picture</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img 
                src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop`}
                alt="Asset"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <EnhancedQRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onHandoverRequest={handleHandoverFromQR}
        onAuditRequest={handleAuditFromQR}
        onError={(error) => toast.error(error)}
      />
    </div>
  );
};

export default PrincipalAssetsPage;