import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Eye, Clock, User, Building, FileText, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScanHandoverRequest {
  id: string;
  assetData: {
    assetId: string;
    assetName: string;
    assetType: string;
    category: string;
    registrationDate: string;
  };
  personName: string;
  department: string;
  purpose: string;
  condition: string;
  assetPicture: string | null;
  requestDate: string;
  status: 'pending_faculty_review' | 'approved_by_faculty' | 'rejected_by_faculty';
  requestedBy: string;
  type: 'scanned_request';
  facultyRemarks?: string;
  facultyApprovedBy?: string;
  facultyApprovalDate?: string;
}

export const ScanHandoverRequestsTable: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ScanHandoverRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ScanHandoverRequest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    // Load scan handover requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem('scanHandoverRequests') || '[]');
    
    // Add dummy data if no requests exist
    if (storedRequests.length === 0) {
      const dummyRequests: ScanHandoverRequest[] = [
        {
          id: 'HO-1732627800001',
          assetData: {
            assetId: 'LAP-CS-001',
            assetName: 'Dell Inspiron 15 3000',
            assetType: 'Physical',
            category: 'Laptops',
            registrationDate: '2024-01-15'
          },
          personName: 'Dr. Sarah Johnson',
          department: 'Computer Science',
          purpose: 'Research project on machine learning algorithms for final year students. Need laptop for data processing and model training.',
          condition: 'Excellent condition, all ports working, battery life 6-8 hours, no physical damage observed.',
          assetPicture: 'laptop_cs_001.jpg',
          requestDate: '2024-11-26T10:30:00.000Z',
          status: 'pending_faculty_review',
          requestedBy: 'Scanner User',
          type: 'scanned_request'
        },
        {
          id: 'HO-1732627800002',
          assetData: {
            assetId: 'PROJ-EE-005',
            assetName: 'Epson EB-X41 Projector',
            assetType: 'Physical',
            category: 'Audio/Visual',
            registrationDate: '2024-02-20'
          },
          personName: 'Prof. Michael Chen',
          department: 'Electrical Engineering',
          purpose: 'Department seminar on renewable energy technologies. Required for presentation to 150+ attendees in main auditorium.',
          condition: 'Good working condition, brightness level optimal, all cables included, minor scratch on casing but does not affect functionality.',
          assetPicture: 'projector_ee_005.jpg',
          requestDate: '2024-11-25T14:15:00.000Z',
          status: 'approved_by_faculty',
          requestedBy: 'Scanner User',
          type: 'scanned_request',
          facultyRemarks: 'Approved for academic seminar. Please ensure proper handling.',
          facultyApprovedBy: 'Faculty User',
          facultyApprovalDate: '2024-11-26T09:00:00.000Z'
        },
        {
          id: 'HO-1732627800003',
          assetData: {
            assetId: 'CAM-MEDIA-012',
            assetName: 'Canon EOS 2000D DSLR Camera',
            assetType: 'Physical',
            category: 'Photography',
            registrationDate: '2024-03-10'
          },
          personName: 'Ms. Emily Rodriguez',
          department: 'Mass Communication',
          purpose: 'Student documentary project on campus sustainability initiatives. Part of final semester assignment.',
          condition: 'Very good condition, lens clear, battery charged, memory card included, carrying case provided.',
          assetPicture: 'camera_media_012.jpg',
          requestDate: '2024-11-24T16:45:00.000Z',
          status: 'rejected_by_faculty',
          requestedBy: 'Scanner User',
          type: 'scanned_request',
          facultyRemarks: 'Equipment not available for student projects during exam period. Please request after December 15th.',
          facultyApprovedBy: 'Faculty User',
          facultyApprovalDate: '2024-11-25T11:30:00.000Z'
        }
      ];
      
      localStorage.setItem('scanHandoverRequests', JSON.stringify(dummyRequests));
      setRequests(dummyRequests);
    } else {
      setRequests(storedRequests);
    }
  }, []);

  const handleViewRequest = (request: ScanHandoverRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const handleActionRequest = (request: ScanHandoverRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setIsActionModalOpen(true);
    setRemarks('');
  };

  const submitAction = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        const updatedReq = {
          ...req,
          status: (actionType === 'approve' ? 'approved_by_faculty' : 'rejected_by_faculty') as ScanHandoverRequest['status'],
          facultyApprovedBy: 'Faculty User', // In real app, get from auth
          facultyApprovalDate: new Date().toISOString(),
          facultyRemarks: remarks || undefined,
        };

        // If approved by faculty, move to normal handover flow
        if (actionType === 'approve') {
          const handoverRequest = {
            id: req.id,
            assetData: req.assetData,
            personName: req.personName,
            department: req.department,
            purpose: req.purpose,
            condition: req.condition,
            assetPicture: req.assetPicture,
            requestDate: req.requestDate,
            status: 'pending' as const,
            requestedBy: req.requestedBy,
            approvedBy: undefined,
            approvalDate: undefined,
            remarks: undefined,
          };

          // Add to regular handover requests for HOD/Principal approval
          const existingHandoverRequests = JSON.parse(localStorage.getItem('handoverRequests') || '[]');
          existingHandoverRequests.push(handoverRequest);
          localStorage.setItem('handoverRequests', JSON.stringify(existingHandoverRequests));
        }

        return updatedReq;
      }
      return req;
    });

    setRequests(updatedRequests);
    localStorage.setItem('scanHandoverRequests', JSON.stringify(updatedRequests));

    toast({
      title: `Request ${actionType === 'approve' ? 'Approved' : 'Rejected'}`,
      description: actionType === 'approve' 
        ? `Request approved and forwarded to HOD/Principal for final approval.`
        : `Scan handover request for ${selectedRequest.assetData.assetName} has been rejected.`,
    });

    setIsActionModalOpen(false);
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_faculty_review':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending Review</Badge>;
      case 'approved_by_faculty':
        return <Badge variant="default" className="flex items-center gap-1 bg-green-600"><CheckCircle className="h-3 w-3" />Approved</Badge>;
      case 'rejected_by_faculty':
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Scanned Handover Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No scanned handover requests found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Requestor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.assetData.assetName}</p>
                          <p className="text-sm text-muted-foreground">{request.assetData.assetId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{request.personName}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{request.purpose}</TableCell>
                      <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === 'pending_faculty_review' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleActionRequest(request, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleActionRequest(request, 'reject')}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Request Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Scanned Handover Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Asset Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Asset Name</Label>
                      <p>{selectedRequest.assetData.assetName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Asset ID</Label>
                      <p className="font-mono text-sm">{selectedRequest.assetData.assetId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                      <Badge variant="secondary">{selectedRequest.assetData.assetType}</Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                      <Badge variant="outline">{selectedRequest.assetData.category}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Requestor Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                      <p>{selectedRequest.personName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                      <p className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {selectedRequest.department}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Request Date</Label>
                      <p>{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                      <div>{getStatusBadge(selectedRequest.status)}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Purpose</Label>
                    <p className="mt-1 p-3 bg-muted rounded-md">{selectedRequest.purpose}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Condition Before Handover</Label>
                    <p className="mt-1 p-3 bg-muted rounded-md">{selectedRequest.condition}</p>
                  </div>
                  {selectedRequest.assetPicture && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Asset Picture</Label>
                      <p className="text-sm text-blue-600">{selectedRequest.assetPicture}</p>
                    </div>
                  )}
                  {selectedRequest.facultyRemarks && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Faculty Remarks</Label>
                      <p className="mt-1 p-3 bg-muted rounded-md">{selectedRequest.facultyRemarks}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Modal */}
      <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve & Forward' : 'Reject'} Handover Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {actionType === 'approve' 
                ? 'Approving will forward this request to HOD/Principal for final approval.'
                : 'This request will be rejected and not forwarded.'}
            </p>
            <div>
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={`Add ${actionType === 'approve' ? 'approval' : 'rejection'} remarks...`}
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsActionModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={submitAction}
                variant={actionType === 'approve' ? 'default' : 'destructive'}
                className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {actionType === 'approve' ? 'Approve & Forward' : 'Reject'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};