import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Filter, MapPin, Edit, Eye, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRDisplay } from "@/components/ui/qr-display";
import { EnhancedQRScanner } from "@/components/ui/enhanced-qr-scanner";
import { AssetTypeSelector } from "@/components/forms/AssetTypeSelector";
import { AssetQRData, generateAssetId, parseAssetQRData } from "@/utils/qrCode";
import { toast } from "sonner";
import { useState } from "react";

const AssetsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedAssetForQR, setSelectedAssetForQR] = useState<AssetQRData | null>(null);

  // Mock data for different categories
  const mockData = {
    total: [
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
        vendor: "Autodesk", vendorContact: "+1-415-507-5000", vendorEmail: "support@autodesk.com"
      },
      { 
        id: "AST004", name: "Printer Paper", type: "Consumable", supplier: "Office Supplies Co.", 
        faculty: "Faculty", hod: "Faculty Head", status: "Low Stock", unitType: "Box",
        quantity: 5, returnQuantity: 0, alertThreshold: 10, expiryDate: "2025-12-31",
        vendor: "Office Supplies Co.", vendorContact: "+91-9988776655", vendorEmail: "sales@officesupplies.com"
      },
    ],
    physical: [
      { 
        id: "AST002", name: "Projector", type: "Physical", gpsDeviceId: "GPS001", 
        faculty: "Prof. Johnson", hod: "Dr. Physics Head", status: "Active",
        location: "Room 101", vendor: "Epson", vendorContact: "+91-9876543210", 
        vendorEmail: "support@epson.com", maintenanceType: "Annual", maintenanceFrequency: "12 months"
      },
      { 
        id: "AST005", name: "Whiteboard", type: "Physical", gpsDeviceId: "GPS002", 
        faculty: "Dr. Brown", hod: "Dr. Math Head", status: "Active",
        location: "Room 205", vendor: "Board Solutions", vendorContact: "+91-9876543211",
        vendorEmail: "info@boardsolutions.com", maintenanceType: "Cleaning", maintenanceFrequency: "6 months"
      },
      { 
        id: "AST006", name: "Microscope", type: "Physical", gpsDeviceId: "GPS003", 
        faculty: "Dr. Wilson", hod: "Dr. Biology Head", status: "Maintenance Due",
        location: "Lab B", vendor: "Scientific Instruments", vendorContact: "+91-9876543212",
        vendorEmail: "service@scientific.com", maintenanceType: "Calibration", maintenanceFrequency: "6 months"
      },
    ],
    digital: [
      { 
        id: "AST001", name: "Microsoft Office 365", type: "Digital", licenseKey: "ABC123-DEF456", 
        faculty: "Dr. Smith", hod: "Prof. Computer Science", status: "Active", 
        activationDate: "2023-01-15", expiryDate: "2024-01-15", quantity: 50,
        vendor: "Microsoft Corp", vendorContact: "+1-800-642-7676", vendorEmail: "support@microsoft.com"
      },
      { 
        id: "AST003", name: "AutoCAD License", type: "Digital", licenseKey: "XYZ789-QWE012", 
        faculty: "IT Faculty", hod: "Dr. IT Head", status: "Active",
        activationDate: "2023-06-01", expiryDate: "2024-06-01", quantity: 25,
        vendor: "Autodesk", vendorContact: "+1-415-507-5000", vendorEmail: "support@autodesk.com"
      },
      { 
        id: "AST007", name: "Adobe Creative Suite", type: "Digital", licenseKey: "ADB456-SUI789", 
        faculty: "Prof. Design", hod: "Dr. Design Head", status: "Active",
        activationDate: "2023-03-01", expiryDate: "2024-03-01", quantity: 15,
        vendor: "Adobe Inc", vendorContact: "+1-408-536-6000", vendorEmail: "support@adobe.com"
      },
    ],
    consumables: [
      { 
        id: "AST004", name: "Printer Paper", type: "Consumable", supplier: "Office Supplies Co.", 
        faculty: "Faculty", hod: "Faculty Head", status: "Low Stock", unitType: "Box",
        quantity: 5, returnQuantity: 0, alertThreshold: 10, expiryDate: "2025-12-31",
        vendor: "Office Supplies Co.", vendorContact: "+91-9988776655", vendorEmail: "sales@officesupplies.com"
      },
      { 
        id: "AST008", name: "Markers", type: "Consumable", supplier: "Stationery Plus", 
        faculty: "Faculty", hod: "Faculty Head", status: "In Stock", unitType: "Pack",
        quantity: 25, returnQuantity: 2, alertThreshold: 5, expiryDate: "2025-06-30",
        vendor: "Stationery Plus", vendorContact: "+91-9988776656", vendorEmail: "sales@stationeryplus.com"
      },
      { 
        id: "AST009", name: "Toner Cartridge", type: "Consumable", supplier: "Print Solutions", 
        faculty: "Faculty", hod: "Faculty Head", status: "Out of Stock", unitType: "Piece",
        quantity: 0, returnQuantity: 0, alertThreshold: 3, expiryDate: "2025-12-31",
        vendor: "Print Solutions", vendorContact: "+91-9988776657", vendorEmail: "sales@printsolutions.com"
      },
    ],
    maintenance: [
      { 
        id: "AST006", name: "Microscope", type: "Physical", location: "Lab B", 
        faculty: "Dr. Wilson", hod: "Dr. Biology Head", status: "Maintenance Due", dueDate: "2024-02-15",
        gpsDeviceId: "GPS003", maintenanceType: "Calibration", maintenanceFrequency: "6 months"
      },
      { 
        id: "AST010", name: "Air Conditioner", type: "Physical", location: "Room 201", 
        faculty: "Maintenance", hod: "Facility Head", status: "Maintenance Due", dueDate: "2024-02-10",
        gpsDeviceId: "GPS004", maintenanceType: "Service", maintenanceFrequency: "3 months"
      },
    ]
  };

  const getTitle = () => {
    switch (category) {
      case 'total': return 'All Assets';
      case 'physical': return 'Physical Assets';
      case 'digital': return 'Digital Assets';
      case 'consumables': return 'Consumables';
      case 'maintenance': return 'Maintenance Due';
      default: return 'Assets';
    }
  };

  const getData = () => {
    return mockData[category as keyof typeof mockData] || [];
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'maintenance due': return 'destructive';
      case 'low stock': return 'secondary';
      case 'out of stock': return 'destructive';
      default: return 'default';
    }
  };

  const filteredData = getData().filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowQR = (asset: any) => {
    const qrData: AssetQRData = {
      assetId: asset.id,
      assetName: asset.name,
      assetType: asset.type,
      category: category || 'total',
      registrationDate: new Date().toLocaleDateString()
    };
    setSelectedAssetForQR(qrData);
    setShowQRCode(true);
  };

  const handleHandoverFromQR = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    toast.success(`Handover request for ${assetData.assetName}!`);
    console.log("Handover request:", assetData, "at location:", location);
  };

  const handleAuditFromQR = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    toast.success(`Audit request for ${assetData.assetName}!`);
    console.log("Audit request:", assetData, "at location:", location);
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
              onClick={() => navigate('/')}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{getTitle()}</h1>
              <p className="text-muted-foreground">Manage and track your assets</p>
            </div>
          </div>
          <Button onClick={() => navigate('/')} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Asset
          </Button>
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
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>{getTitle()} ({filteredData.length})</CardTitle>
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
                  {category === 'physical' && <TableHead>GPS Device ID</TableHead>}
                  {category === 'digital' && <TableHead>License Key</TableHead>}
                  {category === 'consumables' && <TableHead>Unit Type</TableHead>}
                  <TableHead>Quantity</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Picture</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Status</TableHead>
                  {category === 'maintenance' && <TableHead>Due Date</TableHead>}
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
                    {category === 'physical' && <TableCell>{item.gpsDeviceId}</TableCell>}
                    {category === 'digital' && <TableCell>{item.licenseKey}</TableCell>}
                    {category === 'consumables' && <TableCell>{item.unitType}</TableCell>}
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
                         <QrCode className="h-3 w-3" />
                         Scan QR
                       </Button>
                     </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    {category === 'maintenance' && <TableCell>{item.dueDate}</TableCell>}
                    <TableCell>
                      <div className="flex gap-2">
                        {category === 'physical' && (
                          <Button size="sm" variant="outline" className="gap-1">
                            <MapPin className="h-3 w-3" />
                            Track
                          </Button>
                        )}
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="gap-1"
                           onClick={() => setShowAssetForm(true)}
                         >
                           <Edit className="h-3 w-3" />
                           Update
                         </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

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

      {showAssetForm && (
        <AssetTypeSelector onClose={() => setShowAssetForm(false)} />
      )}

      {showQRCode && selectedAssetForQR && (
        <QRDisplay
          isOpen={showQRCode}
          onClose={() => {
            setShowQRCode(false);
            setSelectedAssetForQR(null);
          }}
          assetData={selectedAssetForQR}
        />
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

export default AssetsPage;