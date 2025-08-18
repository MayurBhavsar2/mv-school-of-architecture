import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { QRScanOptions } from './qr-scan-options';
import { parseAssetQRData, AssetQRData } from '@/utils/qrCode';
import { toast } from 'sonner';
import { Camera, X, MapPin } from 'lucide-react';

interface EnhancedQRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onHandoverRequest: (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => void;
  onAuditRequest: (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => void;
  onError?: (error: string) => void;
}

interface ScanActivity {
  id: string;
  assetId: string;
  assetName: string;
  scanTime: Date;
  location?: { latitude: number; longitude: number };
  action?: 'handover' | 'audit' | 'view';
}

export const EnhancedQRScanner: React.FC<EnhancedQRScannerProps> = ({
  isOpen,
  onClose,
  onHandoverRequest,
  onAuditRequest,
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [scannedAsset, setScannedAsset] = useState<AssetQRData | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [scanLocation, setScanLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Add method to simulate scan from external trigger
  const simulateScan = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    setScannedAsset(assetData);
    setShowOptions(true);
    setScanLocation(location);
    
    // Record scan activity
    recordScanActivity(assetData, location);
    
    // Stop scanner if running
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
  };

  // Get user's current location
  const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsGettingLocation(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setIsGettingLocation(false);
          console.warn('Could not get location:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  };

  // Record scan activity
  const recordScanActivity = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    const activity: ScanActivity = {
      id: `scan-${Date.now()}`,
      assetId: assetData.assetId,
      assetName: assetData.assetName,
      scanTime: new Date(),
      location,
    };

    // Store in localStorage (in real app, this would go to backend)
    const existingActivities = JSON.parse(localStorage.getItem('scanActivities') || '[]');
    existingActivities.push(activity);
    localStorage.setItem('scanActivities', JSON.stringify(existingActivities));
    
    console.log('Scan activity recorded:', activity);
  };

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Check if camera is available
      QrScanner.hasCamera().then(setHasCamera);

      if (hasCamera) {
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          async (result) => {
            try {
              // Get location first
              let location: { latitude: number; longitude: number } | undefined;
              try {
                location = await getCurrentLocation();
                setScanLocation(location);
              } catch (locationError) {
                console.warn('Could not get location:', locationError);
                // Continue without location
              }

              // Parse QR data
              const assetData = parseAssetQRData(result.data);
              if (assetData) {
                setScannedAsset(assetData);
                setShowOptions(true);
                
                // Record scan activity
                recordScanActivity(assetData, location);
                
                // Stop scanner
                if (qrScannerRef.current) {
                  qrScannerRef.current.stop();
                }
              } else {
                toast.error('Invalid QR code format');
                onError?.('Invalid QR code format');
              }
            } catch (error) {
              console.error('Error processing QR scan:', error);
              toast.error('Error processing QR code');
              onError?.('Error processing QR code');
            }
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
  }, [isOpen, hasCamera, onError]);

  const handleClose = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
    setScannedAsset(null);
    setShowOptions(false);
    setScanLocation(undefined);
    onClose();
  };

  const handleHandoverRequest = () => {
    if (scannedAsset) {
      // Update scan activity with action
      const activities = JSON.parse(localStorage.getItem('scanActivities') || '[]');
      const lastActivity = activities[activities.length - 1];
      if (lastActivity) {
        lastActivity.action = 'handover';
        localStorage.setItem('scanActivities', JSON.stringify(activities));
      }
      
      onHandoverRequest(scannedAsset, scanLocation);
      handleClose();
    }
  };

  const handleAuditRequest = () => {
    if (scannedAsset) {
      // Update scan activity with action
      const activities = JSON.parse(localStorage.getItem('scanActivities') || '[]');
      const lastActivity = activities[activities.length - 1];
      if (lastActivity) {
        lastActivity.action = 'audit';
        localStorage.setItem('scanActivities', JSON.stringify(activities));
      }
      
      onAuditRequest(scannedAsset, scanLocation);
      handleClose();
    }
  };

  const handleOptionsClose = () => {
    setShowOptions(false);
    setScannedAsset(null);
    setScanLocation(undefined);
    
    // Restart scanner
    if (qrScannerRef.current && isOpen) {
      qrScannerRef.current.start().catch((error) => {
        console.error('Error restarting QR scanner:', error);
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showOptions} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Scan Asset QR Code
              {isGettingLocation && (
                <MapPin className="h-4 w-4 animate-pulse text-primary" />
              )}
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
                {isGettingLocation && (
                  <div className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs">
                    Getting location...
                  </div>
                )}
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

      {scannedAsset && (
        <QRScanOptions
          isOpen={showOptions}
          onClose={handleOptionsClose}
          assetData={scannedAsset}
          scanLocation={scanLocation}
          onHandoverRequest={handleHandoverRequest}
          onAuditRequest={handleAuditRequest}
        />
      )}
    </>
  );
};