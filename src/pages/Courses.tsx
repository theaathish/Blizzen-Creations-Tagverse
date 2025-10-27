import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Code, 
  Database, 
  Brain, 
  Cloud, 
  Shield, 
  Palette, 
  TrendingUp, 
  Globe 
} from "lucide-react";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Development",
    "Data Science",
    "AI/ML",
    "Cloud",
    "Security",
    "Design",
    "Marketing"
  ];

  const courses = [
    {
      icon: Code,
      title: "Python Full Stack Development",
      category: "Development",
      duration: "6 Months",
      level: "Beginner to Advanced",
      description: "Master full-stack development with Python, Django, React, databases, and cloud deployment. Build real-world applications from scratch.",
      modules: ["Python Programming", "Front-End (React)", "Back-End (Django)", "Databases", "Deployment"],
      path: "/courses/python"
    },
    {
      icon: Globe,
      title: "Web Development",
      category: "Development",
      duration: "5 Months",
      level: "Beginner",
      description: "Learn HTML, CSS, JavaScript, React, Node.js, and build responsive, modern websites and web applications.",
      modules: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"],
      path: "/courses"
    },
    {
      icon: Brain,
      title: "Artificial Intelligence & Machine Learning",
      category: "AI/ML",
      duration: "5 Months",
      level: "Intermediate",
      description: "Deep dive into AI/ML algorithms, neural networks, deep learning, and practical AI applications.",
      modules: ["Python for ML", "Machine Learning", "Deep Learning", "Neural Networks", "AI Projects"],
      path: "/courses"
    },
    {
      icon: Database,
      title: "Data Science & Analytics",
      category: "Data Science",
      duration: "5 Months",
      level: "Beginner to Advanced",
      description: "Learn data analysis, visualization, statistics, predictive modeling, and big data technologies.",
      modules: ["Python/R", "Data Analysis", "Visualization", "Statistics", "Big Data"],
      path: "/courses"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      category: "Marketing",
      duration: "3 Months",
      level: "Beginner",
      description: "Master SEO, social media marketing, Google Ads, content marketing, and analytics for digital success.",
      modules: ["SEO", "Social Media", "Google Ads", "Content Marketing", "Analytics"],
      path: "/courses"
    },
    {
      icon: Cloud,
      title: "Cloud Computing & DevOps",
      category: "Cloud",
      duration: "4 Months",
      level: "Intermediate",
      description: "Master AWS, Azure, Docker, Kubernetes, CI/CD pipelines, and cloud architecture best practices.",
      modules: ["AWS/Azure", "Docker", "Kubernetes", "CI/CD", "Cloud Architecture"],
      path: "/courses"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      category: "Security",
      duration: "4 Months",
      level: "Intermediate",
      description: "Learn ethical hacking, network security, penetration testing, and cybersecurity best practices.",
      modules: ["Network Security", "Ethical Hacking", "Penetration Testing", "Security Tools", "Compliance"],
      path: "/courses"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      category: "Design",
      duration: "4 Months",
      level: "Beginner",
      description: "Master user interface and user experience design, prototyping, design thinking, and industry tools.",
      modules: ["Design Principles", "Figma/Adobe XD", "User Research", "Prototyping", "Design Systems"],
      path: "/courses"
    }
  ];

  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg hover:scale-105 transition-all border-primary/20 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <course.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex gap-2 flex-wrap mt-2">
                      <Badge variant="secondary">{course.duration}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{course.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Modules:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.modules.map((module, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link to={course.path} className="block">
                    <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
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
