import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, User, Building, FileText, Camera, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AssetQRData } from '@/utils/qrCode';
import { getCurrentUser } from '@/utils/testUser';

interface ScanHandoverFormProps {
  isOpen: boolean;
  onClose: () => void;
  assetData: AssetQRData;
}

export const ScanHandoverForm: React.FC<ScanHandoverFormProps> = ({
  isOpen,
  onClose,
  assetData,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    personName: '',
    department: '',
    purpose: '',
    condition: '',
    customPurpose: '',
    customCondition: '',
    coordinates: '',
    assetPicture: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined options
  const purposeOptions = [
    'Teaching',
    'Research',
    'Administrative Work',
    'Lab Experiment',
    'Student Project',
    'Maintenance',
    'Other'
  ];

  const conditionOptions = [
    'Excellent - Like new',
    'Good - Minor wear',
    'Fair - Some wear visible',
    'Poor - Significant wear',
    'Damaged - Needs repair',
    'Other'
  ];

  // Auto-fill user information and get coordinates
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        personName: currentUser.name || '',
        department: currentUser.department || '',
      }));
    }

    // Get user coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.log('Location access denied:', error);
          setFormData(prev => ({
            ...prev,
            coordinates: 'Location not available'
          }));
        }
      );
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, assetPicture: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to submit handover request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create handover request object
      const handoverRequest = {
        id: `HO-${Date.now()}`,
        assetData,
        personName: formData.personName,
        department: formData.department,
        purpose: formData.purpose,
        condition: formData.condition,
        assetPicture: formData.assetPicture?.name || null,
        requestDate: new Date().toISOString(),
        status: 'pending_faculty_review',
        requestedBy: 'Scanner User', // In real app, get from auth
        type: 'scanned_request'
      };

      // Store in localStorage for faculty review first
      const existingRequests = JSON.parse(localStorage.getItem('scanHandoverRequests') || '[]');
      existingRequests.push(handoverRequest);
      localStorage.setItem('scanHandoverRequests', JSON.stringify(existingRequests));

      toast({
        title: "Handover Request Submitted",
        description: "Your handover request has been sent to faculty for review.",
      });

      // Reset form and close
      setFormData({
        personName: '',
        department: '',
        purpose: '',
        condition: '',
        customPurpose: '',
        customCondition: '',
        coordinates: '',
        assetPicture: null,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit handover request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.personName && 
    formData.department && 
    formData.purpose && 
    formData.condition &&
    (formData.purpose !== 'Other' || formData.customPurpose.trim()) &&
    (formData.condition !== 'Other' || formData.customCondition.trim());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create Handover Request
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asset Info Summary */}
          <Card>
            <CardContent className="pt-4">
              <div className="text-sm">
                <p className="font-medium">{assetData.assetName}</p>
                <p className="text-muted-foreground">ID: {assetData.assetId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Person Name */}
          <div className="space-y-2">
            <Label htmlFor="personName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Person Name
            </Label>
            <Input
              id="personName"
              name="personName"
              value={formData.personName}
              onChange={handleInputChange}
              placeholder="Enter person name"
              required
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Department
            </Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter department"
              required
              disabled
            />
          </div>

          {/* Coordinates */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Coordinates
            </Label>
            <Input
              value={formData.coordinates}
              placeholder="Getting location..."
              disabled
            />
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Select 
              value={formData.purpose} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                {purposeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.purpose === 'Other' && (
              <Textarea
                placeholder="Please specify purpose"
                value={formData.customPurpose}
                onChange={(e) => setFormData(prev => ({ ...prev, customPurpose: e.target.value }))}
                rows={2}
              />
            )}
          </div>

          {/* Condition Before Handover */}
          <div className="space-y-2">
            <Label htmlFor="condition">Condition Before Hand-over</Label>
            <Select 
              value={formData.condition} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditionOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.condition === 'Other' && (
              <Textarea
                placeholder="Please describe condition"
                value={formData.customCondition}
                onChange={(e) => setFormData(prev => ({ ...prev, customCondition: e.target.value }))}
                rows={2}
              />
            )}
          </div>

          {/* Asset Picture Upload */}
          <div className="space-y-2">
            <Label htmlFor="assetPicture" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Asset Picture
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="assetPicture"
                name="assetPicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('assetPicture')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {formData.assetPicture ? formData.assetPicture.name : 'Upload Picture'}
              </Button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};