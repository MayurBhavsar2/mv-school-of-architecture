import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EnhancedQRScanner } from "@/components/ui/enhanced-qr-scanner";
import { parseAssetQRData, AssetQRData } from "@/utils/qrCode";
import { toast } from "sonner";
import { X, Scan } from "lucide-react";

interface HandOverFormData {
  assetName: string;
  assetType: string;
  assetId: string;
  date: string;
  assignedTo: string;
  quantity: number;
  expectedReturnDate: string;
  conditionBeforeIssue: string;
  picture: FileList;
  purpose: string;
}

interface HandOverFormProps {
  onClose: () => void;
}

export const HandOverForm = ({ onClose }: HandOverFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<HandOverFormData>();

  const handleHandoverFromQR = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    setValue("assetId", assetData.assetId);
    setValue("assetName", assetData.assetName);
    setValue("assetType", assetData.assetType);
    
    // Auto-fill current date and generate pre-filled data
    const today = new Date().toISOString().split('T')[0];
    setValue("date", today);
    
    toast.success("Asset details filled from QR code!");
    console.log("QR scan location:", location);
  };

  const handleAuditFromQR = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    // This would open an audit form - for now just show message
    toast.info("Audit functionality will be available soon!");
    console.log("Audit request for:", assetData, "at location:", location);
  };

  const onSubmit = async (data: HandOverFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log("Hand-over data:", data);
      toast.success("Asset hand-over recorded successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to record hand-over. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Asset Hand-Over Form
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end mb-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowQRScanner(true)}
                  className="gap-2"
                >
                  <Scan className="h-4 w-4" />
                  Scan QR Code
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetName">Asset Name *</Label>
                  <Input
                    id="assetName"
                    {...register("assetName", { required: "Asset name is required" })}
                    placeholder="Enter asset name"
                  />
                  {errors.assetName && (
                    <p className="text-sm text-destructive">{errors.assetName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assetType">Asset Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Physical Asset</SelectItem>
                      <SelectItem value="digital">Digital Asset</SelectItem>
                      <SelectItem value="consumable">Consumable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assetId">Asset ID *</Label>
                  <Input
                    id="assetId"
                    {...register("assetId", { required: "Asset ID is required" })}
                    placeholder="Enter asset ID"
                  />
                  {errors.assetId && (
                    <p className="text-sm text-destructive">{errors.assetId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...register("quantity", { required: "Quantity is required", min: 1 })}
                    placeholder="Enter quantity"
                  />
                  {errors.quantity && (
                    <p className="text-sm text-destructive">{errors.quantity.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hand-Over Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    {...register("date", { required: "Date is required" })}
                  />
                  {errors.date && (
                    <p className="text-sm text-destructive">{errors.date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedReturnDate">Expected Return Date *</Label>
                  <Input
                    id="expectedReturnDate"
                    type="date"
                    {...register("expectedReturnDate", { required: "Expected return date is required" })}
                  />
                  {errors.expectedReturnDate && (
                    <p className="text-sm text-destructive">{errors.expectedReturnDate.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="assignedTo">Assigned To *</Label>
                  <Input
                    id="assignedTo"
                    {...register("assignedTo", { required: "Assigned to is required" })}
                    placeholder="Enter person/department name"
                  />
                  {errors.assignedTo && (
                    <p className="text-sm text-destructive">{errors.assignedTo.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="purpose">Purpose *</Label>
                  <Textarea
                    id="purpose"
                    {...register("purpose", { required: "Purpose is required" })}
                    placeholder="Enter purpose of hand-over"
                    rows={3}
                  />
                  {errors.purpose && (
                    <p className="text-sm text-destructive">{errors.purpose.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="conditionBeforeIssue">Condition Before Issue *</Label>
                  <Textarea
                    id="conditionBeforeIssue"
                    {...register("conditionBeforeIssue", { required: "Condition description is required" })}
                    placeholder="Describe the condition of asset before issuing"
                    rows={3}
                  />
                  {errors.conditionBeforeIssue && (
                    <p className="text-sm text-destructive">{errors.conditionBeforeIssue.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="picture">Picture at Time of Issue</Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    {...register("picture")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Recording..." : "Record Hand-Over"}
            </Button>
          </div>
        </form>
      </DialogContent>
      
      <EnhancedQRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onHandoverRequest={handleHandoverFromQR}
        onAuditRequest={handleAuditFromQR}
        onError={(error) => toast.error(error)}
      />
    </Dialog>
  );
};