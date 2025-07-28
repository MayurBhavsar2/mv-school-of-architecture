import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, FileImage, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssetFormProps {
  onClose: () => void;
}

export const AssetForm = ({ onClose }: AssetFormProps) => {
  const { toast } = useToast();
  const [assetId, setAssetId] = useState(`AST-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(3, '0')}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Asset Added Successfully",
      description: `Asset ${assetId} has been added to the system.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-card border shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Add New Asset</CardTitle>
            <p className="text-muted-foreground">Enter asset details for inventory management</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="assetName">Asset Name *</Label>
                <Input id="assetName" placeholder="Enter asset name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assetType">Asset Type *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                          Physical
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="digital">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-accent/10 text-accent border-accent/20" variant="outline">
                          Digital
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="consumable">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">
                          Consumable
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset ID</Label>
                <Input id="assetId" value={assetId} onChange={(e) => setAssetId(e.target.value)} />
                <p className="text-xs text-muted-foreground">Auto-generated, can be modified</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location / GPS Device ID *</Label>
                <Input id="location" placeholder="Enter location or GPS device ID" required />
              </div>
            </div>

            {/* Personnel Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Personnel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="faculty">Faculty in Charge *</Label>
                  <Input id="faculty" placeholder="Enter faculty member name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hod">HOD in Charge *</Label>
                  <Input id="hod" placeholder="Enter HOD name" required />
                </div>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Vendor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor Organization *</Label>
                  <Input id="vendor" placeholder="Enter vendor organization name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Representative Contact No. *</Label>
                  <Input id="contact" type="tel" placeholder="Enter contact number" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email ID *</Label>
                <Input id="email" type="email" placeholder="Enter email address" required />
              </div>
            </div>

            {/* Maintenance Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Maintenance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maintenance">Maintenance Required</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select maintenance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Maintenance Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="as-needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold">Alert Threshold</Label>
                  <Input id="threshold" type="number" placeholder="Enter threshold value" />
                </div>
              </div>
            </div>

            {/* Quantity and Returns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input id="quantity" type="number" placeholder="Enter quantity" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="return">Return Policy</Label>
                <Textarea id="return" placeholder="Enter return policy details" rows={3} />
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Asset Documentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Asset Picture</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <FileImage className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop image here or click to browse
                    </p>
                    <Button variant="outline" size="sm" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Invoice Document</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop invoice here or click to browse
                    </p>
                    <Button variant="outline" size="sm" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Add Asset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};