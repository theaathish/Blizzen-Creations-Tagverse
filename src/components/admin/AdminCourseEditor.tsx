import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";

interface CourseEditorProps {
  courseId: string;
  onClose: () => void;
  onSave: () => void;
}

interface Module {
  module: string;
  topics: string[];
}

const AdminCourseEditor = ({ courseId, onClose, onSave }: CourseEditorProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    duration: "",
    level: "Beginner",
    instructor: "",
    price: 0,
    syllabus: "",
    highlights: [] as string[],
    curriculum: [] as Module[],
    prerequisites: [] as string[]
  });

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setFetchingData(true);
      const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}`);
      if (response.data.success) {
        const course = response.data.data;
        setFormData({
          title: course.title || "",
          slug: course.slug || "",
          description: course.description || "",
          shortDescription: course.shortDescription || "",
          duration: course.duration || "",
          level: course.level || "Beginner",
          instructor: course.instructor || "",
          price: course.price || 0,
          syllabus: course.syllabus || "",
          highlights: course.highlights || [],
          curriculum: course.curriculum || [],
          prerequisites: course.prerequisites || []
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch course data",
        variant: "destructive"
      });
    } finally {
      setFetchingData(false);
    }
  };

  const handleAddHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, ""]
    });
  };

  const handleUpdateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index)
    });
  };

  const handleAddModule = () => {
    setFormData({
      ...formData,
      curriculum: [...formData.curriculum, { module: "", topics: [] }]
    });
  };

  const handleUpdateModule = (index: number, field: string, value: any) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[index] = { ...newCurriculum[index], [field]: value };
    setFormData({ ...formData, curriculum: newCurriculum });
  };

  const handleAddTopic = (moduleIndex: number) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[moduleIndex].topics.push("");
    setFormData({ ...formData, curriculum: newCurriculum });
  };

  const handleUpdateTopic = (moduleIndex: number, topicIndex: number, value: string) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[moduleIndex].topics[topicIndex] = value;
    setFormData({ ...formData, curriculum: newCurriculum });
  };

  const handleRemoveTopic = (moduleIndex: number, topicIndex: number) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[moduleIndex].topics.splice(topicIndex, 1);
    setFormData({ ...formData, curriculum: newCurriculum });
  };

  const handleRemoveModule = (index: number) => {
    setFormData({
      ...formData,
      curriculum: formData.curriculum.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/api/courses/${courseId}`, formData);
      if (response.data.success) {
        toast({ title: "Success", description: "Course updated successfully" });
        onSave();
        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update course",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span>Loading course data...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-background border-b">
          <CardTitle>Edit Course</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Basic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="Slug (URL-friendly)"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>
              <Textarea
                placeholder="Full Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
              <div className="grid md:grid-cols-4 gap-4">
                <Input
                  placeholder="Duration (e.g., 6 Months)"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
                <Input
                  placeholder="Instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <Input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
              </div>
              
              {/* Syllabus Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Syllabus PDF</label>
                <FileUpload
                  onUpload={(url) => setFormData({ ...formData, syllabus: url })}
                  label="Upload Syllabus PDF"
                  currentFile={formData.syllabus}
                  onRemove={() => setFormData({ ...formData, syllabus: "" })}
                  acceptedTypes=".pdf"
                  maxSize={10}
                />
                <p className="text-xs text-muted-foreground">
                  Upload a PDF file (max 10MB) containing the course syllabus
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Key Highlights</h3>
                <Button type="button" size="sm" onClick={handleAddHighlight}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      placeholder="Highlight"
                      value={highlight}
                      onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveHighlight(idx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Curriculum Modules</h3>
                <Button type="button" size="sm" onClick={handleAddModule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>
              <div className="space-y-4">
                {formData.curriculum.map((mod, modIdx) => (
                  <Card key={modIdx} className="p-4">
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Module Name"
                          value={mod.module}
                          onChange={(e) => handleUpdateModule(modIdx, "module", e.target.value)}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveModule(modIdx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2 pl-4">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Topics</label>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddTopic(modIdx)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Topic
                          </Button>
                        </div>
                        {mod.topics.map((topic, topicIdx) => (
                          <div key={topicIdx} className="flex gap-2">
                            <Input
                              placeholder="Topic"
                              value={topic}
                              onChange={(e) => handleUpdateTopic(modIdx, topicIdx, e.target.value)}
                              size={1}
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveTopic(modIdx, topicIdx)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sticky bottom-0 bg-background pt-4 border-t">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourseEditor;
