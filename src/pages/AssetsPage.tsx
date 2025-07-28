import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const AssetsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for different categories
  const mockData = {
    total: [
      { id: "AST001", name: "Microsoft Office 365", type: "Digital", licenseKey: "ABC123-DEF456", faculty: "Dr. Smith", status: "Active" },
      { id: "AST002", name: "Projector", type: "Physical", gpsDeviceId: "GPS001", faculty: "Prof. Johnson", status: "Active" },
      { id: "AST003", name: "AutoCAD License", type: "Digital", licenseKey: "XYZ789-QWE012", faculty: "IT Admin", status: "Active" },
      { id: "AST004", name: "Printer Paper", type: "Consumable", supplier: "Office Supplies Co.", faculty: "Admin", status: "Low Stock" },
    ],
    physical: [
      { id: "AST002", name: "Projector", type: "Physical", gpsDeviceId: "GPS001", faculty: "Prof. Johnson", status: "Active" },
      { id: "AST005", name: "Whiteboard", type: "Physical", gpsDeviceId: "GPS002", faculty: "Dr. Brown", status: "Active" },
      { id: "AST006", name: "Microscope", type: "Physical", gpsDeviceId: "GPS003", faculty: "Dr. Wilson", status: "Maintenance Due" },
    ],
    digital: [
      { id: "AST001", name: "Microsoft Office 365", type: "Digital", licenseKey: "ABC123-DEF456", faculty: "Dr. Smith", status: "Active" },
      { id: "AST003", name: "AutoCAD License", type: "Digital", licenseKey: "XYZ789-QWE012", faculty: "IT Admin", status: "Active" },
      { id: "AST007", name: "Adobe Creative Suite", type: "Digital", licenseKey: "ADB456-SUI789", faculty: "Prof. Design", status: "Active" },
    ],
    consumables: [
      { id: "AST004", name: "Printer Paper", type: "Consumable", supplier: "Office Supplies Co.", faculty: "Admin", status: "Low Stock" },
      { id: "AST008", name: "Markers", type: "Consumable", supplier: "Stationery Plus", faculty: "Admin", status: "In Stock" },
      { id: "AST009", name: "Toner Cartridge", type: "Consumable", supplier: "Print Solutions", faculty: "Admin", status: "Out of Stock" },
    ],
    maintenance: [
      { id: "AST006", name: "Microscope", type: "Physical", location: "Lab B", faculty: "Dr. Wilson", status: "Maintenance Due", dueDate: "2024-02-15" },
      { id: "AST010", name: "Air Conditioner", type: "Physical", location: "Room 201", faculty: "Maintenance", status: "Maintenance Due", dueDate: "2024-02-10" },
    ],
    users: [
      { id: "U001", name: "Dr. Smith", role: "Faculty", department: "Computer Science", assets: 5, lastActive: "2024-01-28" },
      { id: "U002", name: "Prof. Johnson", role: "Faculty", department: "Physics", assets: 3, lastActive: "2024-01-27" },
      { id: "U003", name: "Dr. Brown", role: "HOD", department: "Mathematics", assets: 8, lastActive: "2024-01-28" },
    ]
  };

  const getTitle = () => {
    switch (category) {
      case 'total': return 'All Assets';
      case 'physical': return 'Physical Assets';
      case 'digital': return 'Digital Assets';
      case 'consumables': return 'Consumables';
      case 'maintenance': return 'Maintenance Due';
      case 'users': return 'Active Users';
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
                  {category !== 'users' && <TableHead>Type</TableHead>}
                  <TableHead>
                    {category === 'users' ? 'Department' : 
                     category === 'physical' ? 'GPS Device ID' :
                     category === 'digital' ? 'License Key' : 
                     category === 'consumables' ? 'Supplier' : 'Info'}
                  </TableHead>
                  <TableHead>{category === 'users' ? 'Assets Count' : 'Assigned To'}</TableHead>
                  <TableHead>Status</TableHead>
                  {category === 'maintenance' && <TableHead>Due Date</TableHead>}
                  {category === 'users' && <TableHead>Last Active</TableHead>}
                  {category === 'physical' && <TableHead>Action</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item: any) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    {category !== 'users' && <TableCell>{item.type}</TableCell>}
                    <TableCell>
                      {category === 'users' ? item.department : 
                       category === 'physical' ? item.gpsDeviceId :
                       category === 'digital' ? item.licenseKey : 
                       category === 'consumables' ? item.supplier : item.location}
                    </TableCell>
                    <TableCell>{category === 'users' ? item.assets : item.faculty}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    {category === 'maintenance' && <TableCell>{item.dueDate}</TableCell>}
                    {category === 'users' && <TableCell>{item.lastActive}</TableCell>}
                    {category === 'physical' && (
                      <TableCell>
                        <Button size="sm" variant="outline" className="gap-2">
                          <MapPin className="h-4 w-4" />
                          Track Location
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetsPage;