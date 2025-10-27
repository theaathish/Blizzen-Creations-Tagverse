import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Award } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower aspiring IT professionals with cutting-edge skills and knowledge, bridging the gap between education and industry demands."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become India's leading IT training academy, recognized for excellence in education, placement success, and industry partnerships."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Excellence, Innovation, Integrity, Student Success, and Continuous Learning drive everything we do at Blizzen Creations."
    },
    {
      icon: Award,
      title: "Our Promise",
      description: "We guarantee hands-on training, industry exposure, dedicated placement support, and career guidance throughout your learning journey."
    }
  ];

  const stats = [
    { number: "5000+", label: "Students Trained" },
    { number: "95%", label: "Placement Rate" },
    { number: "200+", label: "Hiring Partners" },
    { number: "50+", label: "Expert Trainers" }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">About Blizzen Creations</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leading the way in IT education and career transformation since our inception
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-3xl font-bold">Empowering IT Careers Through Excellence</h2>
              <p className="text-muted-foreground leading-relaxed">
                Blizzen Creations Academy is a premier IT training and placement institute dedicated to 
                transforming aspiring professionals into industry-ready experts. We combine theoretical 
                knowledge with practical, hands-on experience to ensure our students are fully prepared 
                for the demands of the modern tech industry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our comprehensive programs cover the latest technologies and industry best practices, 
                taught by experienced professionals who bring real-world insights into the classroom. 
                With a focus on project-based learning and personalized mentorship, we've successfully 
                launched thousands of careers in IT.
              </p>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src={aboutImage} 
                alt="Blizzen Creations Academy" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-primary/20 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Blizzen Creations?</h2>
            <p className="text-muted-foreground text-lg">What sets us apart from the rest</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Industry-Aligned Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our courses are constantly updated to reflect the latest industry trends and requirements, 
                  ensuring you learn what employers are looking for.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Experienced Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn from industry experts with years of hands-on experience who bring real-world 
                  projects and case studies into the classroom.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Dedicated Placement Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our placement team works tirelessly to connect you with top companies, providing 
                  interview preparation, resume building, and career guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
