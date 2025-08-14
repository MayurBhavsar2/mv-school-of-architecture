import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Camera, X } from 'lucide-react';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (data: string) => void;
  onError?: (error: string) => void;
}

export const QRScannerComponent: React.FC<QRScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Check if camera is available
      QrScanner.hasCamera().then(setHasCamera);

      if (hasCamera) {
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            onScanSuccess(result.data);
            handleClose();
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );

        qrScannerRef.current.start().catch((error) => {
          console.error('Error starting QR scanner:', error);
          onError?.('Failed to start camera');
        });
      }
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
  }, [isOpen, hasCamera, onScanSuccess, onError]);

  const handleClose = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Scan Asset QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {hasCamera ? (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 bg-muted rounded-lg"
                autoPlay
                playsInline
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Camera not available or permission denied
              </p>
            </div>
          )}
          
          <p className="text-sm text-muted-foreground text-center">
            Position the QR code within the camera view to scan
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};