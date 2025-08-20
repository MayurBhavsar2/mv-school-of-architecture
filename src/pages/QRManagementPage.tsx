import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { EnhancedQRScanner } from '@/components/ui/enhanced-qr-scanner';
import { HandOverForm } from '@/components/forms/HandOverForm';
import { AuditForm } from '@/components/forms/AuditForm';
import { ScanActivityTracker } from '@/components/dashboard/ScanActivityTracker';
import { AssetQRData } from '@/utils/qrCode';
import { QrCode, Scan } from 'lucide-react';
import { toast } from 'sonner';

export default function QRManagementPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [showHandoverForm, setShowHandoverForm] = useState(false);
  const [showAuditForm, setShowAuditForm] = useState(false);
  const [selectedAssetData, setSelectedAssetData] = useState<AssetQRData | null>(null);
  const [scanLocation, setScanLocation] = useState<{ latitude: number; longitude: number } | undefined>();

  const handleHandoverRequest = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    setSelectedAssetData(assetData);
    setScanLocation(location);
    setShowHandoverForm(true);
    toast.success(`Hand-over form opened for ${assetData.assetName}`);
  };

  const handleAuditRequest = (assetData: AssetQRData, location?: { latitude: number; longitude: number }) => {
    setSelectedAssetData(assetData);
    setScanLocation(location);
    setShowAuditForm(true);
    toast.success(`Audit form opened for ${assetData.assetName}`);
  };

  const handleCloseHandoverForm = () => {
    setShowHandoverForm(false);
    setSelectedAssetData(null);
    setScanLocation(undefined);
  };

  const handleCloseAuditForm = () => {
    setShowAuditForm(false);
    setSelectedAssetData(null);
    setScanLocation(undefined);
  };

  return (
    <DashboardLayout onAddAsset={() => setShowScanner(true)}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Code Management</h1>
          <p className="text-muted-foreground">
            Scan asset QR codes for hand-over requests and audits
          </p>
        </div>
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-2"
            size="lg"
          >
            <Scan className="h-5 w-5" />
            Scan Asset QR Code
          </Button>
        </div>

        {/* QR Code Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <QrCode className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Asset Identification</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Scan any asset QR code to instantly access asset details, location tracking, and action options.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <Scan className="h-8 w-8 text-secondary" />
              <h3 className="font-semibold">Smart Hand-over</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Auto-fill hand-over forms with asset details from QR codes. GPS location is automatically captured.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <QrCode className="h-8 w-8 text-accent" />
              <h3 className="font-semibold">Digital Audit</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Conduct comprehensive asset audits with location tracking and condition assessment.
            </p>
          </div>
        </div>

        {/* Scan Activity Tracker */}
        <ScanActivityTracker />
      </div>

      {/* QR Scanner */}
      <EnhancedQRScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onHandoverRequest={handleHandoverRequest}
        onAuditRequest={handleAuditRequest}
        onError={(error) => toast.error(error)}
      />

      {/* Hand-over Form */}
      {showHandoverForm && (
        <HandOverForm onClose={handleCloseHandoverForm} />
      )}

      {/* Audit Form */}
      {showAuditForm && selectedAssetData && (
        <AuditForm 
          onClose={handleCloseAuditForm}
          assetData={selectedAssetData}
          scanLocation={scanLocation}
        />
      )}
    </DashboardLayout>
  );
}