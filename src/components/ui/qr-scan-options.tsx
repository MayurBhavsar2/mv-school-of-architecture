import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Badge } from './badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { AssetQRData, generateAssetQRCode } from '@/utils/qrCode';
import { ScanHandoverForm } from '@/components/forms/ScanHandoverForm';
import { AuditForm } from '@/components/forms/AuditForm';
import { setupTestAuditor, setupRegularUser, getCurrentUser } from '@/utils/testUser';
import { ArrowRightLeft, Info, ClipboardCheck, MapPin, Calendar, Tag, QrCode, Download, Settings, FileSearch, UserCheck } from 'lucide-react';

interface QRScanOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  assetData: AssetQRData;
  scanLocation?: { latitude: number; longitude: number };
  onHandoverRequest: () => void;
  onAuditRequest: () => void;
}

export const QRScanOptions: React.FC<QRScanOptionsProps> = ({
  isOpen,
  onClose,
  assetData,
  scanLocation,
  onHandoverRequest,
  onAuditRequest,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [showHandoverForm, setShowHandoverForm] = useState<boolean>(false);
  const [showAuditForm, setShowAuditForm] = useState<boolean>(false);
  const [assetStatus, setAssetStatus] = useState<string>('');
  
  // Check if current user is an auditor (this should come from your auth context)
  const currentUser = getCurrentUser() || {};
  const isAuditor = currentUser.role === 'auditor' || currentUser.isAuditor;

  useEffect(() => {
    if (isOpen && assetData) {
      setQrLoading(true);
      generateAssetQRCode(assetData)
        .then(setQrCodeUrl)
        .catch(console.error)
        .finally(() => setQrLoading(false));
    }
  }, [isOpen, assetData]);

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `${assetData.assetId}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleStatusUpdate = (status: string) => {
    setAssetStatus(status);
    // Save status to localStorage or send to backend
    const statusUpdate = {
      assetId: assetData.assetId,
      status: status,
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser.name || 'Unknown User'
    };
    
    const existingStatuses = JSON.parse(localStorage.getItem('assetStatuses') || '[]');
    const updatedStatuses = existingStatuses.filter((s: any) => s.assetId !== assetData.assetId);
    updatedStatuses.push(statusUpdate);
    localStorage.setItem('assetStatuses', JSON.stringify(updatedStatuses));
    
    console.log('Asset status updated:', statusUpdate);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Asset QR Code Scanned
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Asset Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-4">
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
                  <div>
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Registration Date
                    </p>
                    <p className="text-sm">{new Date(assetData.registrationDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {scanLocation && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Scan Location
                    </p>
                    <p className="text-xs font-mono">
                      {scanLocation.latitude.toFixed(6)}, {scanLocation.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* QR Code Display Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  {qrLoading ? (
                    <div className="w-48 h-48 bg-muted animate-pulse rounded-lg flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ) : qrCodeUrl ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="Asset QR Code" 
                      className="w-48 h-48 border rounded-lg"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground text-center text-sm">Failed to generate QR code</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={downloadQRCode} 
                  disabled={!qrCodeUrl} 
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <h4 className="font-medium">Available Actions:</h4>
            
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => setShowHandoverForm(true)}
                className="flex items-center gap-2 h-12"
                variant="default"
              >
                <ArrowRightLeft className="h-5 w-5" />
                Create Hand-over Request
              </Button>

              {/* Status of Asset Button */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status of Asset:</label>
                <Select value={assetStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      <SelectValue placeholder="Select asset status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="not-available">Not Available</SelectItem>
                    <SelectItem value="need-to-purchase">Need to Purchase</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Audit Button - Only visible to auditors */}
              {isAuditor && (
                <Button 
                  onClick={() => setShowAuditForm(true)}
                  className="flex items-center gap-2 h-12"
                  variant="secondary"
                >
                  <FileSearch className="h-5 w-5" />
                  Start Asset Audit
                </Button>
              )}
            </div>

            {/* Demo User Controls */}
            <div className="pt-4 border-t space-y-2">
              <p className="text-xs text-muted-foreground">Demo Controls:</p>
              <div className="flex gap-2">
                <Button 
                  onClick={setupTestAuditor}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  Switch to Auditor
                </Button>
                <Button 
                  onClick={setupRegularUser}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Switch to Faculty
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Current user: {currentUser.name || 'Not set'} ({currentUser.role || 'No role'})
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>

      <ScanHandoverForm
        isOpen={showHandoverForm}
        onClose={() => setShowHandoverForm(false)}
        assetData={assetData}
      />

      {showAuditForm && (
        <AuditForm
          onClose={() => setShowAuditForm(false)}
          assetData={assetData}
          scanLocation={scanLocation}
        />
      )}
    </Dialog>
  );
};