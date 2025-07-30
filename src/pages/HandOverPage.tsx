import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HandOverForm } from "@/components/forms/HandOverForm";
import { ReturnAssetForm } from "@/components/forms/ReturnAssetForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Plus, RotateCcw, Edit } from "lucide-react";

interface HandOverRecord {
  id: string;
  assetName: string;
  assetType: string;
  assetId: string;
  date: string;
  assignedTo: string;
  quantity: number;
  expectedReturnDate: string;
  conditionBeforeIssue: string;
  picture: string;
  purpose: string;
  status: "Active" | "Returned" | "Overdue";
}

const mockHandOverData: HandOverRecord[] = [
  {
    id: "HO001",
    assetName: "MacBook Pro 16",
    assetType: "Physical Asset",
    assetId: "PA001",
    date: "2024-01-15",
    assignedTo: "Dr. Sarah Johnson - Civil Engineering",
    quantity: 1,
    expectedReturnDate: "2024-03-15",
    conditionBeforeIssue: "Excellent condition, no visible damage, all ports working",
    picture: "macbook_handover.jpg",
    purpose: "Research project on sustainable architecture designs",
    status: "Active"
  },
  {
    id: "HO002",
    assetName: "AutoCAD License",
    assetType: "Digital Asset",
    assetId: "DA003",
    date: "2024-01-20",
    assignedTo: "Architecture Department",
    quantity: 5,
    expectedReturnDate: "2024-12-31",
    conditionBeforeIssue: "Full license package with all modules",
    picture: "autocad_license.jpg",
    purpose: "Student design projects and coursework",
    status: "Active"
  },
  {
    id: "HO003",
    assetName: "Drawing Paper Pack",
    assetType: "Consumable",
    assetId: "CA002",
    date: "2024-01-10",
    assignedTo: "Prof. Mike Wilson - Urban Planning",
    quantity: 50,
    expectedReturnDate: "2024-02-10",
    conditionBeforeIssue: "New sealed packages, A1 size",
    picture: "drawing_paper.jpg",
    purpose: "Final year thesis presentations",
    status: "Returned"
  }
];

const HandOverPage = () => {
  const [showHandOverForm, setShowHandOverForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HandOverRecord | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default">Active</Badge>;
      case "Returned":
        return <Badge variant="secondary">Returned</Badge>;
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <DashboardLayout onAddAsset={() => setShowHandOverForm(true)}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Asset Hand-Over Management</h1>
              <p className="text-muted-foreground mt-2">
                Track and manage asset hand-overs across departments
              </p>
            </div>
            <Button onClick={() => setShowHandOverForm(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Hand-Over
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hand-Over Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hand-Over ID</TableHead>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Asset Type</TableHead>
                      <TableHead>Asset ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Expected Return</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Picture</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockHandOverData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.assetName}</TableCell>
                        <TableCell>{record.assetType}</TableCell>
                        <TableCell>{record.assetId}</TableCell>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-48">
                          <div className="truncate" title={record.assignedTo}>
                            {record.assignedTo}
                          </div>
                        </TableCell>
                        <TableCell>{record.quantity}</TableCell>
                        <TableCell>{new Date(record.expectedReturnDate).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-48">
                          <div className="truncate" title={record.conditionBeforeIssue}>
                            {record.conditionBeforeIssue}
                          </div>
                        </TableCell>
                        <TableCell>
                          {record.picture && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedImage(record.picture)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="max-w-48">
                          <div className="truncate" title={record.purpose}>
                            {record.purpose}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {record.status === "Active" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedRecord(record);
                                  setShowReturnForm(true);
                                }}
                              >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Return
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowHandOverForm(true)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Update
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>

      {showHandOverForm && (
        <HandOverForm onClose={() => setShowHandOverForm(false)} />
      )}

      {showReturnForm && selectedRecord && (
        <ReturnAssetForm 
          onClose={() => {
            setShowReturnForm(false);
            setSelectedRecord(null);
          }}
          assetName={selectedRecord.assetName}
          handOverId={selectedRecord.id}
        />
      )}

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
    </>
  );
};

export default HandOverPage;