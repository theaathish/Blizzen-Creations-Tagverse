import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Trash2, Loader2, Eye, CheckCircle, Clock, XCircle, Download, Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  qualification: string;
  experience: string;
  placementRequired: string;
  message: string;
  status: string;
  notes: string;
  createdAt: string;
}

const AdminEnquiries = () => {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/enquiries`);
      if (response.data.success) {
        setEnquiries(response.data.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch enquiries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Just open the confirmation dialog, don't delete immediately
    const enquiry = enquiries.find(e => e._id === id);
    if (enquiry) {
      setDeleteConfirm({ id, name: enquiry.name });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      setDeleting(true);
      const response = await axios.delete(`${API_BASE_URL}/api/enquiries/${deleteConfirm.id}`);
      if (response.data.success) {
        toast({ 
          title: "Success", 
          description: `Enquiry from ${deleteConfirm.name} has been deleted` 
        });
        fetchEnquiries();
        setDeleteConfirm(null);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      setUpdatingStatus(true);
      const response = await axios.patch(`${API_BASE_URL}/api/enquiries/${id}`, {
        status: newStatus
      });
      if (response.data.success) {
        toast({ title: "Success", description: "Status updated" });
        fetchEnquiries();
        setSelectedEnquiry(response.data.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update status",
        variant: "destructive"
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "enrolled":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "contacted":
        return <CheckCircle className="w-4 h-4" />;
      case "enrolled":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Filter enquiries
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
    const matchesCourse = courseFilter === "all" || enquiry.course === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Get unique courses
  const uniqueCourses = Array.from(new Set(enquiries.map(e => e.course)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Phone", "Course", "Qualification", "Experience", "Placement Required", "Status", "Date"];
    const data = filteredEnquiries.map(e => [
      e.name,
      e.email,
      e.phone,
      e.course,
      e.qualification,
      e.experience,
      e.placementRequired,
      e.status,
      formatDate(e.createdAt)
    ]);

    const csv = [
      headers.join(","),
      ...data.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enquiries.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{enquiries.length}</div>
            <p className="text-muted-foreground text-sm">Total Enquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-yellow-600">{enquiries.filter(e => e.status === "new").length}</div>
            <p className="text-muted-foreground text-sm">New</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{enquiries.filter(e => e.status === "enrolled").length}</div>
            <p className="text-muted-foreground text-sm">Enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">{enquiries.filter(e => e.status === "contacted").length}</div>
            <p className="text-muted-foreground text-sm">Contacted</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Name, email, or phone"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {uniqueCourses.map(course => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <Button onClick={downloadCSV} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiries ({filteredEnquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No enquiries found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-left p-3 font-semibold">Email</th>
                    <th className="text-left p-3 font-semibold">Phone</th>
                    <th className="text-left p-3 font-semibold">Course</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                    <th className="text-left p-3 font-semibold">Date</th>
                    <th className="text-left p-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((e) => (
                    <tr key={e._id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium">{e.name}</td>
                      <td className="p-3 text-muted-foreground">{e.email}</td>
                      <td className="p-3">{e.phone}</td>
                      <td className="p-3 text-xs">{e.course}</td>
                      <td className="p-3">
                        <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(e.status)}`}>
                          {getStatusIcon(e.status)}
                          {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3 text-xs text-muted-foreground">{formatDate(e.createdAt)}</td>
                      <td className="p-3 flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedEnquiry(e)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Enquiry Details</DialogTitle>
                            </DialogHeader>
                            {selectedEnquiry && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Name</p>
                                    <p className="font-medium">{selectedEnquiry.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Email</p>
                                    <p className="font-medium">{selectedEnquiry.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Phone</p>
                                    <p className="font-medium">{selectedEnquiry.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Course</p>
                                    <p className="font-medium">{selectedEnquiry.course}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Qualification</p>
                                    <p className="font-medium">{selectedEnquiry.qualification || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Experience</p>
                                    <p className="font-medium">{selectedEnquiry.experience || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Placement Required</p>
                                    <p className="font-medium">{selectedEnquiry.placementRequired || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Date</p>
                                    <p className="font-medium">{formatDate(selectedEnquiry.createdAt)}</p>
                                  </div>
                                </div>

                                {selectedEnquiry.message && (
                                  <div>
                                    <p className="text-sm font-semibold text-muted-foreground">Message</p>
                                    <p className="p-3 bg-muted rounded">{selectedEnquiry.message}</p>
                                  </div>
                                )}

                                <div className="space-y-2">
                                  <p className="text-sm font-semibold text-muted-foreground">Update Status</p>
                                  <Select 
                                    value={selectedEnquiry.status} 
                                    onValueChange={(value) => handleStatusUpdate(selectedEnquiry._id, value)}
                                    disabled={updatingStatus}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="contacted">Contacted</SelectItem>
                                      <SelectItem value="enrolled">Enrolled</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDelete(e._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Delete Enquiry
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete the enquiry from <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Enquiry
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEnquiries;
