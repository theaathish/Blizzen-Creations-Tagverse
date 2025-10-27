import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Award, TrendingUp, Users, Briefcase } from "lucide-react";

const Placements = () => {
  const stats = [
    { icon: TrendingUp, number: "95%", label: "Placement Rate" },
    { icon: Users, number: "5000+", label: "Students Placed" },
    { icon: Briefcase, number: "200+", label: "Hiring Partners" },
    { icon: Award, number: "₹6.5 LPA", label: "Average Package" }
  ];

  const companies = [
    "TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Tech Mahindra",
    "Accenture", "IBM", "Capgemini", "DXC Technology", "Mindtree",
    "Mphasis", "L&T Infotech", "Zensar", "Persistent Systems", "Hexaware"
  ];

  const successStories = [
    {
      name: "Priya Sharma",
      course: "Python Full Stack Development",
      company: "TCS",
      package: "₹6.2 LPA",
      image: "👩‍💻",
      testimonial: "The training at Blizzen Creations was exceptional. The hands-on projects and placement support helped me secure my dream job at TCS!"
    },
    {
      name: "Rahul Kumar",
      course: "Data Science & Analytics",
      company: "Infosys",
      package: "₹7.5 LPA",
      image: "👨‍💻",
      testimonial: "The instructors were incredibly supportive, and the curriculum was perfectly aligned with industry needs. Highly recommended!"
    },
    {
      name: "Anita Patel",
      course: "Full Stack Development",
      company: "Wipro",
      package: "₹6.0 LPA",
      image: "👩‍💼",
      testimonial: "From learning basics to landing a job, Blizzen Creations guided me every step of the way. The placement team was amazing!"
    },
    {
      name: "Amit Singh",
      course: "Cloud Computing & DevOps",
      company: "Cognizant",
      package: "₹8.0 LPA",
      image: "👨‍💼",
      testimonial: "The live projects and real-world scenarios prepared me perfectly for interviews. I'm now working at Cognizant thanks to Blizzen!"
    },
    {
      name: "Sneha Reddy",
      course: "AI & Machine Learning",
      company: "HCL",
      package: "₹7.8 LPA",
      image: "👩‍🔬",
      testimonial: "The AI/ML course exceeded my expectations. The mentorship and placement support were outstanding!"
    },
    {
      name: "Vikram Mehta",
      course: "Cybersecurity",
      company: "Tech Mahindra",
      package: "₹6.8 LPA",
      image: "👨‍🔧",
      testimonial: "Best decision I made for my career. The practical approach and industry connections made all the difference!"
    }
  ];

  const placementProcess = [
    {
      step: "1",
      title: "Resume Building",
      description: "Professional resume creation with industry-standard formats and keywords"
    },
    {
      step: "2",
      title: "Mock Interviews",
      description: "Multiple rounds of technical and HR mock interviews with expert feedback"
    },
    {
      step: "3",
      title: "Profile Marketing",
      description: "Your profile is shared with 200+ hiring partners across India"
    },
    {
      step: "4",
      title: "Interview Scheduling",
      description: "We coordinate and schedule interviews with multiple companies"
    },
    {
      step: "5",
      title: "Offer Negotiation",
      description: "Guidance on salary negotiation and offer letter evaluation"
    },
    {
      step: "6",
      title: "Onboarding Support",
      description: "Continued support even after placement for smooth career transition"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">100% Placement Support</h1>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in">
            Get Trained. Get Hired. Build Your IT Career with Confidence.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-primary/20 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold mb-2 text-primary">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Placement Process</h2>
            <p className="text-muted-foreground text-lg">A systematic approach to ensure your career success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {placementProcess.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                      {item.step}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground text-lg">Meet our successful graduates</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{story.image}</div>
                  <CardTitle className="text-center">{story.name}</CardTitle>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge>{story.company}</Badge>
                    <Badge variant="outline">{story.package}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{story.course}</p>
                  <p className="text-muted-foreground italic">"{story.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Hiring Partners</h2>
            <p className="text-muted-foreground text-lg">Trusted by leading companies across India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {companies.map((company, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow hover:scale-105">
                <CardContent className="py-8">
                  <p className="font-semibold text-lg text-muted-foreground hover:text-primary transition-colors">
                    {company}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-primary text-white border-0">
            <CardContent className="py-12 text-center">
              <Award className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">100% Placement Support Guarantee</h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                We are committed to your success. Every student receives dedicated placement support 
                until they secure their desired position in the IT industry.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                  Start Your Journey Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Placements;
