import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import { Loader2, Save } from "lucide-react";
import ImageUpload from "../ImageUpload";

const AdminAbout = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    heroImage: "",
    heroDescription: "",
    excellenceTitle: "",
    excellenceParagraph1: "",
    excellenceParagraph2: "",
    missionTitle: "",
    missionDescription: "",
    visionTitle: "",
    visionDescription: "",
    valuesTitle: "",
    values: [
      { title: "Quality", description: "We provide quality education" },
      { title: "Innovation", description: "We innovate constantly" },
      { title: "Excellence", description: "We strive for excellence" }
    ],
    achievements: [
      { label: "Students Trained", value: "1000+" },
      { label: "Placement Rate", value: "95%" },
      { label: "Years of Experience", value: "5+" }
    ]
  });

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/about`);
      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch about info",
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
      console.log('Saving about data...');
      console.log('Hero Image length:', formData.heroImage?.length || 0);
      console.log('Hero Image starts with:', formData.heroImage?.substring(0, 50) || 'empty');
      
      const response = await axios.put(`${API_BASE_URL}/api/about`, formData);
      if (response.data.success) {
        console.log('✓ About info saved successfully');
        toast({ title: "Success", description: "About info updated successfully" });
      }
    } catch (error: any) {
      console.error('✗ Save error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update about info",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Page Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <ImageUpload
            onUpload={(url) => setFormData({ ...formData, heroImage: url })}
            label="Upload Hero Image"
            preview={formData.heroImage}
            onRemove={() => setFormData({ ...formData, heroImage: "" })}
          />

          <Textarea
            placeholder="Hero Description"
            value={formData.heroDescription}
            onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
            rows={3}
          />

          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold text-lg">Excellence Section</h3>
            <Input
              placeholder="Excellence Title"
              value={formData.excellenceTitle || ""}
              onChange={(e) => setFormData({ ...formData, excellenceTitle: e.target.value })}
            />
            <Textarea
              placeholder="Excellence Paragraph 1"
              value={formData.excellenceParagraph1 || ""}
              onChange={(e) => setFormData({ ...formData, excellenceParagraph1: e.target.value })}
              rows={4}
            />
            <Textarea
              placeholder="Excellence Paragraph 2"
              value={formData.excellenceParagraph2 || ""}
              onChange={(e) => setFormData({ ...formData, excellenceParagraph2: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Mission</label>
            <Input
              placeholder="Mission Title"
              value={formData.missionTitle}
              onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
            />
            <Textarea
              placeholder="Mission Description"
              value={formData.missionDescription}
              onChange={(e) => setFormData({ ...formData, missionDescription: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Vision</label>
            <Input
              placeholder="Vision Title"
              value={formData.visionTitle}
              onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
            />
            <Textarea
              placeholder="Vision Description"
              value={formData.visionDescription}
              onChange={(e) => setFormData({ ...formData, visionDescription: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Core Values</label>
            {formData.values.map((value, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 p-4 border rounded">
                <Input
                  placeholder="Value Title"
                  value={value.title}
                  onChange={(e) => {
                    const newValues = [...formData.values];
                    newValues[idx].title = e.target.value;
                    setFormData({ ...formData, values: newValues });
                  }}
                />
                <Input
                  placeholder="Value Description"
                  value={value.description}
                  onChange={(e) => {
                    const newValues = [...formData.values];
                    newValues[idx].description = e.target.value;
                    setFormData({ ...formData, values: newValues });
                  }}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Achievements</label>
            {formData.achievements.map((achievement, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 p-4 border rounded">
                <Input
                  placeholder="Achievement Label"
                  value={achievement.label}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[idx].label = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                />
                <Input
                  placeholder="Achievement Value"
                  value={achievement.value}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[idx].value = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                />
              </div>
            ))}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save About Info
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminAbout;
