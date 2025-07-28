import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X } from "lucide-react";

interface DigitalAssetFormProps {
  onClose: () => void;
}

export const DigitalAssetForm = ({ onClose }: DigitalAssetFormProps) => {
  const [assetId] = useState(`DIG${Date.now().toString().slice(-6)}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Digital asset added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add Digital Asset (Software License)</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Software Name *</Label>
                <Input id="name" placeholder="Enter software name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" value="Digital" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Asset ID</Label>
                <Input id="id" value={assetId} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseKey">License Key *</Label>
                <Input id="licenseKey" placeholder="Enter license key" required />
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

            {/* License Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">License Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input id="quantity" type="number" placeholder="Number of licenses" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activationDate">Activation Date *</Label>
                  <Input id="activationDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input id="expiryDate" type="date" required />
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
                  <Label htmlFor="licenseKeyPicture">License Key Picture</Label>
                  <Input id="licenseKeyPicture" type="file" accept="image/*" />
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