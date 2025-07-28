import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { X } from "lucide-react";

interface ConsumableAssetFormProps {
  onClose: () => void;
}

export const ConsumableAssetForm = ({ onClose }: ConsumableAssetFormProps) => {
  const [assetId] = useState(`CON${Date.now().toString().slice(-6)}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Consumable asset added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add Consumable Asset</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Asset Name *</Label>
                <Input id="name" placeholder="Enter asset name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" value="Consumable" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Asset ID</Label>
                <Input id="id" value={assetId} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitType">Unit Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="pack">Pack</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="bottle">Bottle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personnel Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personnel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty">Faculty in Charge *</Label>
                  <Input id="faculty" placeholder="Enter faculty name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hod">HOD in Charge *</Label>
                  <Input id="hod" placeholder="Enter HOD name" required />
                </div>
              </div>
            </div>

            {/* Quantity and Stock Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Stock Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnQuantity">Return Quantity</Label>
                  <Input id="returnQuantity" type="number" placeholder="Return quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input id="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alertThreshold">Alert Threshold *</Label>
                  <Input id="alertThreshold" type="number" placeholder="Min stock level" required />
                </div>
              </div>
            </div>

            {/* Supplier Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Supplier Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Input id="supplier" placeholder="Enter supplier name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" type="date" />
                </div>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vendor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor Organization *</Label>
                  <Input id="vendor" placeholder="Enter vendor organization" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendorContact">Vendor Contact *</Label>
                  <Input id="vendorContact" placeholder="Enter contact number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendorEmail">Vendor Email *</Label>
                  <Input id="vendorEmail" type="email" placeholder="Enter vendor email" required />
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Documentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="picture">Picture of Asset</Label>
                  <Input id="picture" type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice">Invoice</Label>
                  <Input id="invoice" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Asset</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};