import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, QrCode, Calendar, Eye, RefreshCw } from 'lucide-react';

interface ScanActivity {
  id: string;
  assetId: string;
  assetName: string;
  scanTime: Date;
  location?: { latitude: number; longitude: number };
  action?: 'handover' | 'view';
}

export const ScanActivityTracker: React.FC = () => {
  const [activities, setActivities] = useState<ScanActivity[]>([]);

  const loadActivities = () => {
    const stored = localStorage.getItem('scanActivities');
    if (stored) {
      const parsed = JSON.parse(stored).map((activity: any) => ({
        ...activity,
        scanTime: new Date(activity.scanTime)
      }));
      // Sort by most recent first
      parsed.sort((a: ScanActivity, b: ScanActivity) => b.scanTime.getTime() - a.scanTime.getTime());
      setActivities(parsed);
    } else {
      // Add sample data for demonstration
      const sampleActivities: ScanActivity[] = [
        {
          id: '1',
          assetId: 'AST-2024-001',
          assetName: 'Dell Laptop XPS 15',
          scanTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          location: { latitude: 6.5244, longitude: 3.3792 },
          action: 'handover'
        },
        {
          id: '3',
          assetId: 'AST-2024-003',
          assetName: 'Office Chair Executive',
          scanTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          action: 'view'
        },
        {
          id: '4',
          assetId: 'AST-2024-004',
          assetName: 'Projector Epson EB-X41',
          scanTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          location: { latitude: 6.5180, longitude: 3.3850 },
          action: 'handover'
        }
      ];
      setActivities(sampleActivities);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const getActionBadge = (action?: string) => {
    switch (action) {
      case 'handover':
        return <Badge variant="default">Hand-over</Badge>;
      case 'view':
        return <Badge variant="outline">View</Badge>;
      default:
        return <Badge variant="outline">Scanned</Badge>;
    }
  };

  const formatLocation = (location?: { latitude: number; longitude: number }) => {
    if (!location) return 'N/A';
    return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
  };

  const openLocationInMaps = (location: { latitude: number; longitude: number }) => {
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Recent QR Code Scans
          </div>
          <Button variant="outline" size="sm" onClick={loadActivities}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <QrCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No QR code scans recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Scan Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-mono text-sm">
                      {activity.assetId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {activity.assetName}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {activity.scanTime.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getActionBadge(activity.action)}
                    </TableCell>
                    <TableCell>
                      {activity.location ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs font-mono">
                            {formatLocation(activity.location)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No location</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {activity.location && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openLocationInMaps(activity.location!)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};