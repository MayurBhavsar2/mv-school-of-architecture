import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Download, QrCode } from 'lucide-react';
import { generateAssetQRCode, AssetQRData } from '@/utils/qrCode';

interface QRDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  assetData: AssetQRData;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({
  isOpen,
  onClose,
  assetData
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && assetData) {
      setLoading(true);
      generateAssetQRCode(assetData)
        .then(setQrCodeUrl)
        .catch(console.error)
        .finally(() => setLoading(false));
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Asset QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">{assetData.assetName}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium">Asset ID:</span> {assetData.assetId}</p>
              <p><span className="font-medium">Type:</span> {assetData.assetType}</p>
              <p><span className="font-medium">Category:</span> {assetData.category}</p>
              <p><span className="font-medium">Registered:</span> {assetData.registrationDate}</p>
            </div>
          </div>

          <div className="flex justify-center">
            {loading ? (
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
                <p className="text-muted-foreground">Failed to generate QR code</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={downloadQRCode} disabled={!qrCodeUrl} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};