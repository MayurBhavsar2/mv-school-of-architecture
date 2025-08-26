import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Eye, Clock, User, Building, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HandoverRequest {
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
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  approvedBy?: string;
  approvalDate?: string;
  remarks?: string;
}

export const HandoverRequestsTable: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<HandoverRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<HandoverRequest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    // Load handover requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem('handoverRequests') || '[]');
    setRequests(storedRequests);
  }, []);

  const handleViewRequest = (request: HandoverRequest) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const handleApprovalAction = (request: HandoverRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setIsApprovalModalOpen(true);
    setRemarks('');
  };

  const submitApproval = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          status: (approvalAction === 'approve' ? 'approved' : 'rejected') as 'pending' | 'approved' | 'rejected',
          approvedBy: 'Faculty User', // In real app, get from auth
          approvalDate: new Date().toISOString(),
          remarks: remarks || undefined,
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    localStorage.setItem('handoverRequests', JSON.stringify(updatedRequests));

    toast({
      title: `Request ${approvalAction === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `Handover request for ${selectedRequest.assetData.assetName} has been ${approvalAction}d.`,
    });

    setIsApprovalModalOpen(false);
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="flex items-center gap-1 bg-green-600"><CheckCircle className="h-3 w-3" />Approved</Badge>;
      case 'rejected':
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
            Handover Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No handover requests found
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
                          {request.status === 'pending' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleApprovalAction(request, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleApprovalAction(request, 'reject')}
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
            <DialogTitle>Handover Request Details</DialogTitle>
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
                  {selectedRequest.remarks && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Approval Remarks</Label>
                      <p className="mt-1 p-3 bg-muted rounded-md">{selectedRequest.remarks}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {approvalAction === 'approve' ? 'Approve' : 'Reject'} Handover Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={`Add ${approvalAction === 'approve' ? 'approval' : 'rejection'} remarks...`}
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={submitApproval}
                variant={approvalAction === 'approve' ? 'default' : 'destructive'}
                className={approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {approvalAction === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};