import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Award,
  Code,
  Database,
  Brain,
  Cloud,
  Shield,
  Palette,
  TrendingUp,
  Globe
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const highlights = [
    {
      icon: Briefcase,
      title: "100% Placement Assistance",
      description: "Dedicated placement support with top tech companies"
    },
    {
      icon: Users,
      title: "Expert Trainers",
      description: "Learn from industry professionals with real experience"
    },
    {
      icon: GraduationCap,
      title: "Live Projects",
      description: "Build real-world applications and portfolios"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Industry-recognized certificates upon completion"
    }
  ];

  const courses = [
    {
      icon: Code,
      title: "Python Full Stack Development",
      duration: "6 Months",
      level: "Beginner to Advanced",
      description: "Master full-stack development with Python, Django, React, and cloud deployment",
      path: "/courses/python"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      duration: "5 Months",
      level: "Intermediate",
      description: "Deep dive into AI, ML algorithms, neural networks, and practical applications",
      path: "/courses"
    },
    {
      icon: Database,
      title: "Data Science & Analytics",
      duration: "5 Months",
      level: "Beginner to Advanced",
      description: "Learn data analysis, visualization, statistics, and predictive modeling",
      path: "/courses"
    },
    {
      icon: Cloud,
      title: "Cloud Computing & DevOps",
      duration: "4 Months",
      level: "Intermediate",
      description: "Master AWS, Docker, Kubernetes, CI/CD pipelines, and cloud architecture",
      path: "/courses"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      duration: "4 Months",
      level: "Intermediate",
      description: "Learn ethical hacking, network security, and cybersecurity best practices",
      path: "/courses"
    },
    {
      icon: Globe,
      title: "Web Development",
      duration: "5 Months",
      level: "Beginner",
      description: "Build modern websites with HTML, CSS, JavaScript, React, and Node.js",
      path: "/courses"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Developer at TCS",
      text: "Blizzen Creations transformed my career. The hands-on training and placement support helped me land my dream job!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Data Scientist at Infosys",
      text: "The instructors are incredibly knowledgeable and supportive. The real-world projects prepared me perfectly for the industry.",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Full Stack Developer at Wipro",
      text: "Best decision I made for my career. The curriculum is up-to-date with industry standards and the placement team is excellent.",
      rating: 5
    }
  ];

  const partners = [
    "TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Tech Mahindra", "Accenture", "IBM"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90 z-0" />
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Empowering Careers in IT
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow">
            Learn. Build. Get Placed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8">
                Explore Courses
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8">
                Book Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-primary/20 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Industry-leading programs designed to launch your tech career
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Link key={index} to={course.path}>
                <Card className="h-full hover:shadow-lg hover:scale-105 transition-all border-primary/20 cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                      <course.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>
                      <span className="inline-block mr-3">📅 {course.duration}</span>
                      <span className="inline-block">📊 {course.level}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-muted-foreground text-lg">Hear from our successful graduates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Hiring Partners</h2>
            <p className="text-muted-foreground text-lg">Trusted by leading tech companies</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="text-2xl font-semibold text-muted-foreground hover:text-primary transition-colors">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your IT Career?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students and transform your future today
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8">
              Book a Free Demo Class
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
