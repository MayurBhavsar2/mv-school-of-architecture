import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Badge } from './badge';
import { AssetQRData, generateAssetQRCode } from '@/utils/qrCode';
import { ArrowRightLeft, Info, ClipboardCheck, MapPin, Calendar, Tag, QrCode, Download } from 'lucide-react';

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
                onClick={onHandoverRequest}
                className="flex items-center gap-2 h-12"
                variant="default"
              >
                <ArrowRightLeft className="h-5 w-5" />
                Create Hand-over Request
              </Button>
              
              <Button 
                onClick={onAuditRequest}
                className="flex items-center gap-2 h-12"
                variant="outline"
              >
                <ClipboardCheck className="h-5 w-5" />
                Start Asset Audit
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};