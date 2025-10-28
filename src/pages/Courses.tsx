import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { 
  Code, 
  Database, 
  Brain, 
  Cloud, 
  Shield, 
  Palette, 
  TrendingUp, 
  Globe,
  Loader2,
  ArrowRight
} from "lucide-react";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  highlights: string[];
}

const Courses = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All"];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCourses();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch courses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Our Courses</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Industry-leading programs designed to launch your tech career with hands-on projects and expert mentorship
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No courses available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <Card 
                  key={course._id} 
                  className="hover-lift border-primary/20 animate-scale-in group overflow-hidden bg-gradient-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="relative">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex gap-2 flex-wrap mt-2">
                        <Badge variant="secondary" className="animate-fade-in">{course.duration}</Badge>
                        <Badge variant="outline" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>{course.level}</Badge>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">{course.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Modules:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.highlights.slice(0, 4).map((highlight, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs hover:bg-primary hover:text-white transition-colors duration-300"
                          >
                            {highlight}
                          </Badge>
                        ))}
                        {course.highlights.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.highlights.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Link to={`/courses/${course.slug}`} className="block">
                      <Button className="w-full bg-gradient-primary hover-glow transition-all duration-300 transform group-hover:scale-105">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What You'll Get</h2>
            <p className="text-muted-foreground text-lg">Every course includes</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-semibold mb-2">Comprehensive Materials</h3>
                <p className="text-sm text-muted-foreground">Study guides, code samples, and resources</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-semibold mb-2">Live Projects</h3>
                <p className="text-sm text-muted-foreground">Build real-world applications</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="font-semibold mb-2">Certification</h3>
                <p className="text-sm text-muted-foreground">Industry-recognized certificates</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-semibold mb-2">Placement Support</h3>
                <p className="text-sm text-muted-foreground">Job assistance and interview prep</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
