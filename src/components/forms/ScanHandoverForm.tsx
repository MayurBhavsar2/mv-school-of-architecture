import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { X, User, Building, Target, FileImage } from "lucide-react";
import { AssetQRData } from '@/utils/qrCode';

interface ScanHandoverFormProps {
  isOpen: boolean;
  onClose: () => void;
  assetData: AssetQRData;
  scanLocation?: { latitude: number; longitude: number };
}

export const ScanHandoverForm = ({ isOpen, onClose, assetData, scanLocation }: ScanHandoverFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    personName: "",
    department: "",
    purpose: "",
    conditionBefore: "",
    assetPicture: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      assetPicture: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to create handover request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Handover Request Created:", {
        assetData,
        scanLocation,
        requestDetails: formData,
        timestamp: new Date().toISOString(),
        status: "Pending Faculty Approval"
      });

      toast.success("Handover request sent to faculty for approval!");
      onClose();
    } catch (error) {
      toast.error("Failed to create handover request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Create Handover Request
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Asset Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Asset ID</Label>
                  <p className="font-mono">{assetData.assetId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Asset Name</Label>
                  <p className="font-medium">{assetData.assetName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p>{assetData.assetType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Category</Label>
                  <p>{assetData.category}</p>
                </div>
              </div>
              {scanLocation && (
                <div className="mt-3 p-2 bg-muted rounded text-xs">
                  <Label className="text-muted-foreground">Scan Location</Label>
                  <p className="font-mono">{scanLocation.latitude.toFixed(6)}, {scanLocation.longitude.toFixed(6)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Handover Request Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Handover Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personName" className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Name of Person *
                  </Label>
                  <Input
                    id="personName"
                    placeholder="Enter person's full name"
                    value={formData.personName}
                    onChange={(e) => handleInputChange("personName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    Department *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("department", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Purpose *
                </Label>
                <Textarea
                  id="purpose"
                  placeholder="Describe the purpose of handover (e.g., project work, lab session, personal use)"
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditionBefore">Condition Before Handover *</Label>
                <Select onValueChange={(value) => handleInputChange("conditionBefore", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Like new</SelectItem>
                    <SelectItem value="good">Good - Minor wear</SelectItem>
                    <SelectItem value="fair">Fair - Noticeable wear</SelectItem>
                    <SelectItem value="poor">Poor - Requires attention</SelectItem>
                    <SelectItem value="damaged">Damaged - Needs repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assetPicture" className="flex items-center gap-1">
                  <FileImage className="h-3 w-3" />
                  Picture of Asset Before Handover
                </Label>
                <Input
                  id="assetPicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a photo showing current condition of the asset
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Request..." : "Submit Handover Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};