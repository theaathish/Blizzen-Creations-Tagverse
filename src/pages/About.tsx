import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { Target, Eye, Heart, Award, Loader2 } from "lucide-react";

interface AboutData {
  _id: string;
  title: string;
  heroImage?: string;
  heroDescription: string;
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  valuesTitle: string;
  values: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  achievements: Array<{
    label: string;
    value: string;
  }>;
  team?: Array<{
    name: string;
    position: string;
    bio: string;
    image?: string;
  }>;
}

const About = () => {
  const { toast } = useToast();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAboutInfo();
      if (data.success) {
        console.log('✓ About data fetched:', data.data);
        console.log('✓ Hero Image:', data.data.heroImage ? 'Present' : 'Missing');
        setAboutData(data.data);
      }
    } catch (error: any) {
      console.error('✗ Fetch error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch about content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
          <p className="text-muted-foreground">About page content is not available</p>
        </div>
      </div>
    );
  }

  const iconMap: Record<string, any> = {
    Target,
    Eye,
    Heart,
    Award
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">{aboutData.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {aboutData.heroDescription}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-3xl font-bold">Empowering IT Careers Through Excellence</h2>
              <p className="text-muted-foreground leading-relaxed">
                Blizzen Creations is a premier IT training and placement institute dedicated to 
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
              {aboutData.heroImage && aboutData.heroImage.trim() ? (
                <div className="rounded-lg shadow-lg overflow-hidden bg-muted">
                  <img 
                    src={aboutData.heroImage} 
                    alt="About Blizzen Creations"
                    className="w-full h-64 object-cover"
                    onLoad={() => console.log('✓ Hero image loaded successfully')}
                    onError={(e) => {
                      console.error('✗ Image failed to load:', e);
                      // Fallback if image fails to load
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-64 flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600">
                            Blizzen Creations
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg w-full h-64 flex items-center justify-center text-white text-4xl font-bold">
                  Blizzen Creations
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutData.achievements.map((achievement, index) => (
              <div key={index} className="text-center text-white animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl font-bold mb-2">{achievement.value}</div>
                <div className="text-white/80">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="hover:shadow-lg transition-shadow border-primary/20 animate-slide-up">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{aboutData.missionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{aboutData.missionDescription}</p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="hover:shadow-lg transition-shadow border-primary/20 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{aboutData.visionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{aboutData.visionDescription}</p>
              </CardContent>
            </Card>

            {/* Values */}
            {aboutData.values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-primary/20 animate-slide-up" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
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
