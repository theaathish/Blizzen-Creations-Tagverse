import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";
import {
  Calendar,
  Clock,
  BarChart,
  Award,
  Briefcase,
  Download,
  CheckCircle2,
  Loader2,
  ArrowLeft
} from "lucide-react";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  instructor: string;
  syllabus?: string;
  highlights: string[];
  curriculum: Array<{
    module: string;
    topics: string[];
  }>;
  prerequisites: string[];
}

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/courses`);
      if (response.data.success) {
        const foundCourse = response.data.data.find((c: Course) => c.slug === slug);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          toast({
            title: "Error",
            description: "Course not found",
            variant: "destructive"
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch course",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSyllabus = () => {
    if (course?.syllabus) {
      try {
        // Create a temporary link element and trigger download
        const link = document.createElement('a');
        link.href = course.syllabus;
        link.download = `${course.title}-Syllabus.pdf`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download Started",
          description: "Syllabus download has been initiated"
        });
      } catch (error) {
        toast({
          title: "Download Failed",
          description: "Failed to download syllabus. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Syllabus Not Available",
        description: "Syllabus for this course is not available yet",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const modules = course.curriculum && course.curriculum.length > 0 ? course.curriculum : [];

  const features = course.highlights && course.highlights.length > 0 ? course.highlights : [
    "Comprehensive curriculum",
    "Expert instruction",
    "Hands-on projects",
    "Industry certification",
    "Placement support"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="pt-20 pb-4">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-white text-center animate-fade-in">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">{course.level}</Badge>
            <h1 className="text-5xl font-bold mb-6">{course.title}</h1>
            <p className="text-xl mb-8 text-white/90">
              {course.description}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Expert Mentorship</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                <span>{course.level}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                  Apply Now
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-black hover:bg-white hover:text-primary"
                onClick={handleDownloadSyllabus}
                disabled={!course?.syllabus}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Syllabus
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-primary">
                  Get Free Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Course Overview</h2>
            <div className="prose max-w-none text-muted-foreground mb-8">
              <p className="text-lg leading-relaxed">
                Our Python Full Stack Development course is designed to take you from a complete beginner
                to a job-ready full-stack developer. You'll learn to build modern, scalable web applications
                using industry-standard tools and frameworks.
              </p>
              <p className="text-lg leading-relaxed">
                Through hands-on projects and real-world scenarios, you'll master both front-end and back-end
                development, database management, API creation, and cloud deployment. By the end of this course,
                you'll have a professional portfolio showcasing multiple full-stack applications.
              </p>
            </div>

            {/* What You'll Learn */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Modules */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Course Modules</h2>

            {modules.length > 0 ? (
              <div className="space-y-6">
                {modules.map((module, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        {module.module}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Course curriculum will be updated soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Course Features</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>Certification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Receive an industry-recognized certificate upon successful completion
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>Placement Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    100% job placement assistance with interview preparation
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle>Live Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Build 5+ real-world projects for your professional portfolio
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students and launch your full-stack development career today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                Enroll Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-primary">
                Book Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
