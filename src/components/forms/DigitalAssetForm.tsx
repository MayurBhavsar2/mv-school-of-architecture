import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X, Plus, Trash2 } from "lucide-react";

interface DigitalAssetFormProps {
  onClose: () => void;
}

export const DigitalAssetForm = ({ onClose }: DigitalAssetFormProps) => {
  const [assetId] = useState(`DIG${Date.now().toString().slice(-6)}`);
  const [quantity, setQuantity] = useState(1);
  const [licenseKeys, setLicenseKeys] = useState<string[]>([""]);
  const [licenseKeyFiles, setLicenseKeyFiles] = useState<File[]>([]);
  const [licenseActivationDates, setLicenseActivationDates] = useState<string[]>([""]);
  const [licenseExpiryDates, setLicenseExpiryDates] = useState<string[]>([""]);
  const [licenseSystemDetails, setLicenseSystemDetails] = useState<string[]>([""]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    const currentKeys = [...licenseKeys];
    const currentActivationDates = [...licenseActivationDates];
    const currentExpiryDates = [...licenseExpiryDates];
    const currentSystemDetails = [...licenseSystemDetails];
    
    if (newQuantity > currentKeys.length) {
      // Add more license key fields
      const additionalKeys = Array(newQuantity - currentKeys.length).fill("");
      const additionalActivationDates = Array(newQuantity - currentKeys.length).fill("");
      const additionalExpiryDates = Array(newQuantity - currentKeys.length).fill("");
      const additionalSystemDetails = Array(newQuantity - currentKeys.length).fill("");
      setLicenseKeys([...currentKeys, ...additionalKeys]);
      setLicenseActivationDates([...currentActivationDates, ...additionalActivationDates]);
      setLicenseExpiryDates([...currentExpiryDates, ...additionalExpiryDates]);
      setLicenseSystemDetails([...currentSystemDetails, ...additionalSystemDetails]);
    } else if (newQuantity < currentKeys.length) {
      // Remove excess license key fields
      setLicenseKeys(currentKeys.slice(0, newQuantity));
      setLicenseKeyFiles(licenseKeyFiles.slice(0, newQuantity));
      setLicenseActivationDates(currentActivationDates.slice(0, newQuantity));
      setLicenseExpiryDates(currentExpiryDates.slice(0, newQuantity));
      setLicenseSystemDetails(currentSystemDetails.slice(0, newQuantity));
    }
  };

  const handleLicenseKeyChange = (index: number, value: string) => {
    const updatedKeys = [...licenseKeys];
    updatedKeys[index] = value;
    setLicenseKeys(updatedKeys);
  };

  const handleLicenseActivationDateChange = (index: number, value: string) => {
    const updatedDates = [...licenseActivationDates];
    updatedDates[index] = value;
    setLicenseActivationDates(updatedDates);
  };

  const handleLicenseExpiryDateChange = (index: number, value: string) => {
    const updatedDates = [...licenseExpiryDates];
    updatedDates[index] = value;
    setLicenseExpiryDates(updatedDates);
  };

  const handleLicenseSystemChange = (index: number, value: string) => {
    const updatedSystems = [...licenseSystemDetails];
    updatedSystems[index] = value;
    setLicenseSystemDetails(updatedSystems);
  };

  const handleLicenseFileChange = (index: number, file: File | null) => {
    const updatedFiles = [...licenseKeyFiles];
    if (file) {
      updatedFiles[index] = file;
    }
    setLicenseKeyFiles(updatedFiles);
  };

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
                <Label htmlFor="quantity">Quantity (Licenses) *</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  placeholder="Number of licenses" 
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

            {/* License Keys */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">License Keys</h3>
              <p className="text-sm text-muted-foreground">Enter license details for each license</p>
              
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <div className="col-span-1">#</div>
                <div className="col-span-4">License Key *</div>
                <div className="col-span-2">Activation *</div>
                <div className="col-span-2">Expiry *</div>
                <div className="col-span-3">System/Computer *</div>
              </div>
              
              {/* License Rows */}
              <div className="space-y-2">
                {licenseKeys.map((licenseKey, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-center py-1">
                    <div className="col-span-1 text-sm font-medium text-center">
                      {index + 1}
                    </div>
                    <div className="col-span-4">
                      <Input
                        value={licenseKey}
                        onChange={(e) => handleLicenseKeyChange(index, e.target.value)}
                        placeholder={`License key ${index + 1}`}
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="date"
                        value={licenseActivationDates[index]}
                        onChange={(e) => handleLicenseActivationDateChange(index, e.target.value)}
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="date"
                        value={licenseExpiryDates[index]}
                        onChange={(e) => handleLicenseExpiryDateChange(index, e.target.value)}
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={licenseSystemDetails[index]}
                        onChange={(e) => handleLicenseSystemChange(index, e.target.value)}
                        placeholder={`PC-${index + 1} or System ID`}
                        required
                        className="h-9"
                      />
                    </div>
                  </div>
                ))}
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
                      <SelectItem value="defective-license">Defective License</SelectItem>
                      <SelectItem value="wrong-version">Wrong Version</SelectItem>
                      <SelectItem value="excess-quantity">Excess Quantity</SelectItem>
                      <SelectItem value="incompatible">Incompatible</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnNotes">Return Notes</Label>
                  <Textarea id="returnNotes" placeholder="Additional return details" />
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
              
              {/* License Key Pictures */}
              <div className="space-y-3">
                <Label>License Key Pictures</Label>
                <p className="text-sm text-muted-foreground">Upload picture for each license key</p>
                {licenseKeys.map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Label className="min-w-[120px]">License {index + 1} Pic</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLicenseFileChange(index, e.target.files?.[0] || null)}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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