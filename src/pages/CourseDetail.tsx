import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  BarChart, 
  Award, 
  Briefcase, 
  Download,
  CheckCircle2 
} from "lucide-react";

const CourseDetail = () => {
  const modules = [
    {
      title: "Python Programming (Basics to Advanced)",
      topics: [
        "Python syntax and fundamentals",
        "Data structures and algorithms",
        "Object-oriented programming",
        "Advanced Python concepts",
        "Python libraries and frameworks"
      ]
    },
    {
      title: "Front-End Development",
      topics: [
        "HTML5 and CSS3 mastery",
        "JavaScript ES6+ fundamentals",
        "React.js and component architecture",
        "State management and hooks",
        "Responsive design and UI/UX"
      ]
    },
    {
      title: "Back-End Development",
      topics: [
        "Django framework fundamentals",
        "RESTful API development",
        "Database design and SQL",
        "Authentication and authorization",
        "API testing and documentation"
      ]
    },
    {
      title: "Database Management",
      topics: [
        "SQL and PostgreSQL",
        "Database design principles",
        "ORM with Django",
        "Query optimization",
        "NoSQL databases (MongoDB)"
      ]
    },
    {
      title: "Deployment & DevOps",
      topics: [
        "Git version control",
        "Docker containerization",
        "AWS cloud deployment",
        "CI/CD pipelines",
        "Production best practices"
      ]
    },
    {
      title: "Capstone Project & Interview Prep",
      topics: [
        "Full-stack application development",
        "Portfolio building",
        "Resume preparation",
        "Mock interviews",
        "Technical problem solving"
      ]
    }
  ];

  const features = [
    "Live instructor-led sessions",
    "Hands-on coding exercises",
    "Real-world project experience",
    "Industry expert mentorship",
    "24/7 learning support",
    "Job placement assistance",
    "Industry-recognized certification",
    "Lifetime access to materials"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-white text-center animate-fade-in">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Full Stack Development</Badge>
            <h1 className="text-5xl font-bold mb-6">Python Full Stack Development</h1>
            <p className="text-xl mb-8 text-white/90">
              Master full-stack web development from front-end to back-end, databases to deployment
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>6 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Weekend Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                <span>Beginner to Advanced</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                  Apply Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Download className="w-4 h-4 mr-2" />
                Download Syllabus
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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
            
            <div className="space-y-6">
              {modules.map((module, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold">
                        {index + 1}
                      </span>
                      {module.title}
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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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
