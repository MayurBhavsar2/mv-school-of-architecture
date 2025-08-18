import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AssetQRData } from "@/utils/qrCode";
import { toast } from "sonner";
import { X, ClipboardCheck, MapPin, Calendar } from "lucide-react";

interface AuditFormData {
  auditId: string;
  assetId: string;
  assetName: string;
  auditDate: string;
  auditorName: string;
  physicalCondition: string;
  functionalStatus: string;
  location: string;
  notes: string;
  discrepancies: string;
  recommendedActions: string;
  pictures: FileList;
  auditType: 'routine' | 'maintenance' | 'incident' | 'handover';
}

interface AuditFormProps {
  onClose: () => void;
  assetData?: AssetQRData;
  scanLocation?: { latitude: number; longitude: number };
}

export const AuditForm = ({ onClose, assetData, scanLocation }: AuditFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<AuditFormData>({
    defaultValues: {
      auditId: `AUD-${Date.now()}`,
      assetId: assetData?.assetId || '',
      assetName: assetData?.assetName || '',
      auditDate: new Date().toISOString().split('T')[0],
      auditType: 'routine'
    }
  });

  const watchedAuditType = watch('auditType');

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    try {
      // Add scan location if available
      const auditData = {
        ...data,
        scanLocation,
        submittedAt: new Date().toISOString(),
      };
      
      // Store audit record (in real app, this would go to backend)
      const existingAudits = JSON.parse(localStorage.getItem('auditRecords') || '[]');
      existingAudits.push(auditData);
      localStorage.setItem('auditRecords', JSON.stringify(existingAudits));
      
      console.log("Audit data:", auditData);
      toast.success("Asset audit completed successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to complete audit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Asset Audit Form
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Asset Information */}
          {assetData && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scanned Asset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Asset ID</p>
                    <p className="font-mono text-sm">{assetData.assetId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Asset Name</p>
                    <p className="font-medium">{assetData.assetName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                    <Badge variant="secondary">{assetData.assetType}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <Badge variant="outline">{assetData.category}</Badge>
                  </div>
                </div>
                
                {scanLocation && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Audit Location
                    </p>
                    <p className="text-xs font-mono">
                      {scanLocation.latitude.toFixed(6)}, {scanLocation.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Audit Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Audit Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="auditId">Audit ID</Label>
                  <Input
                    id="auditId"
                    {...register("auditId")}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auditDate">Audit Date *</Label>
                  <Input
                    id="auditDate"
                    type="date"
                    {...register("auditDate", { required: "Audit date is required" })}
                  />
                  {errors.auditDate && (
                    <p className="text-sm text-destructive">{errors.auditDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auditorName">Auditor Name *</Label>
                  <Input
                    id="auditorName"
                    {...register("auditorName", { required: "Auditor name is required" })}
                    placeholder="Enter auditor name"
                  />
                  {errors.auditorName && (
                    <p className="text-sm text-destructive">{errors.auditorName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auditType">Audit Type *</Label>
                  <Select value={watchedAuditType} onValueChange={(value) => setValue('auditType', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine Audit</SelectItem>
                      <SelectItem value="maintenance">Maintenance Audit</SelectItem>
                      <SelectItem value="incident">Incident Audit</SelectItem>
                      <SelectItem value="handover">Handover Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Current Physical Location *</Label>
                  <Input
                    id="location"
                    {...register("location", { required: "Location is required" })}
                    placeholder="Enter current location of asset"
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asset Condition */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asset Condition Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="physicalCondition">Physical Condition *</Label>
                  <Select onValueChange={(value) => setValue('physicalCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select physical condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="functionalStatus">Functional Status *</Label>
                  <Select onValueChange={(value) => setValue('functionalStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select functional status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fully-functional">Fully Functional</SelectItem>
                      <SelectItem value="partially-functional">Partially Functional</SelectItem>
                      <SelectItem value="non-functional">Non-Functional</SelectItem>
                      <SelectItem value="needs-maintenance">Needs Maintenance</SelectItem>
                      <SelectItem value="obsolete">Obsolete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="discrepancies">Discrepancies Found</Label>
                  <Textarea
                    id="discrepancies"
                    {...register("discrepancies")}
                    placeholder="Describe any discrepancies found during audit"
                    rows={3}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="recommendedActions">Recommended Actions</Label>
                  <Textarea
                    id="recommendedActions"
                    {...register("recommendedActions")}
                    placeholder="Recommend any actions needed for the asset"
                    rows={3}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    {...register("notes")}
                    placeholder="Any additional observations or notes"
                    rows={3}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pictures">Audit Pictures</Label>
                  <Input
                    id="pictures"
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("pictures")}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload pictures showing current condition of the asset
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Complete Audit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};