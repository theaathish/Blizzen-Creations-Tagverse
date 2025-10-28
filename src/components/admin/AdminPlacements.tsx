import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import ImageUpload from "../ImageUpload";

interface Placement {
  _id: string;
  studentName: string;
  company: string;
  position: string;
  salary: string;
  course: string;
}

const AdminPlacements = () => {
  const { toast } = useToast();
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    company: "",
    position: "",
    salary: "",
    testimonial: "",
    image: "",
    placementDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/placements`);
      if (response.data.success) {
        setPlacements(response.data.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch placements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        const response = await axios.put(`${API_BASE_URL}/api/placements/${editingId}`, formData);
        if (response.data.success) {
          toast({ title: "Success", description: "Placement updated successfully" });
          fetchPlacements();
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/placements`, formData);
        if (response.data.success) {
          toast({ title: "Success", description: "Placement created successfully" });
          fetchPlacements();
        }
      }
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save placement",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this placement?")) return;
    try {
      setLoading(true);
      const response = await axios.delete(`${API_BASE_URL}/api/placements/${id}`);
      if (response.data.success) {
        toast({ title: "Success", description: "Placement deleted successfully" });
        fetchPlacements();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete placement",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (placement: Placement) => {
    setEditingId(placement._id);
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/placements/${placement._id}`);
      if (response.data.success) {
        const data = response.data.data;
        setFormData({
          studentName: data.studentName || "",
          course: data.course || "",
          company: data.company || "",
          position: data.position || "",
          salary: data.salary || "",
          testimonial: data.testimonial || "",
          image: data.image || "",
          placementDate: data.placementDate ? new Date(data.placementDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch placement data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      studentName: "",
      course: "",
      company: "",
      position: "",
      salary: "",
      testimonial: "",
      image: "",
      placementDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Placement" : "Add New Placement"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Student Name"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                required
              />
              <Input
                placeholder="Course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
              <Input
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
            </div>
            <Input
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              required
            />
            <Textarea
              placeholder="Testimonial (optional)"
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
            />
            <Input
              type="date"
              placeholder="Placement Date"
              value={formData.placementDate}
              onChange={(e) => setFormData({ ...formData, placementDate: e.target.value })}
              required
            />
            <ImageUpload
              onUpload={(url) => setFormData({ ...formData, image: url })}
              label="Upload Student Photo"
              preview={formData.image}
              onRemove={() => setFormData({ ...formData, image: "" })}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                {editingId ? "Update Placement" : "Add Placement"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Placements List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : placements.length === 0 ? (
            <p className="text-muted-foreground">No placements found</p>
          ) : (
            <div className="space-y-2">
              {placements.map((placement) => (
                <div key={placement._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{placement.studentName}</h3>
                    <p className="text-sm text-muted-foreground">{placement.company} • {placement.position}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(placement)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(placement._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPlacements;
