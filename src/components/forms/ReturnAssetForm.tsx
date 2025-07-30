import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { X } from "lucide-react";

interface ReturnAssetFormData {
  conditionAfterReturn: string;
  remark: string;
  pictureAtReturn: FileList;
}

interface ReturnAssetFormProps {
  onClose: () => void;
  assetName: string;
  handOverId: string;
}

export const ReturnAssetForm = ({ onClose, assetName, handOverId }: ReturnAssetFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReturnAssetFormData>();

  const onSubmit = async (data: ReturnAssetFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log("Return data:", { handOverId, ...data });
      toast.success("Asset return recorded successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to record asset return. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Asset Return Form
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Return Details for: {assetName}</CardTitle>
              <p className="text-sm text-muted-foreground">Hand-Over ID: {handOverId}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="conditionAfterReturn">Condition After Return *</Label>
                <Textarea
                  id="conditionAfterReturn"
                  {...register("conditionAfterReturn", { required: "Condition description is required" })}
                  placeholder="Describe the condition of asset after return"
                  rows={4}
                />
                {errors.conditionAfterReturn && (
                  <p className="text-sm text-destructive">{errors.conditionAfterReturn.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="remark">Remark</Label>
                <Textarea
                  id="remark"
                  {...register("remark")}
                  placeholder="Any additional remarks or notes"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pictureAtReturn">Picture at Time of Return</Label>
                <Input
                  id="pictureAtReturn"
                  type="file"
                  accept="image/*"
                  {...register("pictureAtReturn")}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Recording..." : "Record Return"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};