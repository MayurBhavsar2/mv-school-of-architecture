import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { X, Plus, Trash2 } from "lucide-react";

interface PhysicalAssetFormProps {
  onClose: () => void;
}

export const PhysicalAssetForm = ({ onClose }: PhysicalAssetFormProps) => {
  const [assetId] = useState(`PHY${Date.now().toString().slice(-6)}`);
  const [quantity, setQuantity] = useState(1);
  const [gpsDeviceIds, setGpsDeviceIds] = useState<string[]>([""]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    const currentIds = [...gpsDeviceIds];
    
    if (newQuantity > currentIds.length) {
      // Add more GPS device ID fields
      const additionalIds = Array(newQuantity - currentIds.length).fill("");
      setGpsDeviceIds([...currentIds, ...additionalIds]);
    } else if (newQuantity < currentIds.length) {
      // Remove excess GPS device ID fields
      setGpsDeviceIds(currentIds.slice(0, newQuantity));
    }
  };

  const handleGpsIdChange = (index: number, value: string) => {
    const updatedIds = [...gpsDeviceIds];
    updatedIds[index] = value;
    setGpsDeviceIds(updatedIds);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Physical asset added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add Physical Asset</CardTitle>
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
                <Input id="type" value="Physical" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Asset ID</Label>
                <Input id="id" value={assetId} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  placeholder="Enter quantity" 
                  required 
                />
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

            {/* Vendor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vendor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor Organization *</Label>
                  <Input id="vendor" placeholder="Enter vendor organization" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representative">Representative Contact *</Label>
                  <Input id="representative" placeholder="Enter contact number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email ID *</Label>
                  <Input id="email" type="email" placeholder="Enter email address" required />
                </div>
              </div>
            </div>

            {/* GPS Device IDs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">GPS Device Information</h3>
              <p className="text-sm text-muted-foreground">Enter unique GPS device ID for each asset</p>
              <div className="space-y-3">
                {gpsDeviceIds.map((gpsId, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Label className="min-w-[120px]">GPS ID {index + 1} *</Label>
                    <Input
                      value={gpsId}
                      onChange={(e) => handleGpsIdChange(index, e.target.value)}
                      placeholder={`Enter GPS device ID for asset ${index + 1}`}
                      required
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Maintenance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenance">Maintenance Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select maintenance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency (Days)</Label>
                  <Input id="frequency" type="number" placeholder="Enter frequency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold">Alert Threshold (Days)</Label>
                  <Input id="threshold" type="number" placeholder="Enter threshold" />
                </div>
              </div>
            </div>

            {/* Returns Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Returns Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="returnQuantity">Return Quantity</Label>
                  <Input id="returnQuantity" type="number" min="0" placeholder="Enter return quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnReason">Return Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select return reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="damaged">Damaged</SelectItem>
                      <SelectItem value="defective">Defective</SelectItem>
                      <SelectItem value="wrong-specification">Wrong Specification</SelectItem>
                      <SelectItem value="excess-quantity">Excess Quantity</SelectItem>
                      <SelectItem value="quality-issue">Quality Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnPolicy">Return Policy</Label>
                  <Textarea id="returnPolicy" placeholder="Enter return policy details" />
                </div>
              </div>
            </div>

            {/* Asset Documentation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Asset Documentation</h3>
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