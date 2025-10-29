import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Star, Loader2 } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { apiService } from "@/services/api";

interface HomeContent {
  _id: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  featuredCourses: string[];
  testimonials: Array<{
    name: string;
    role: string;
    message: string;
    image?: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
  }>;
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
  };
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: string;
  level: string;
  instructor: string;
  image?: string;
  highlights: string[];
}

const Home = () => {
  const { toast } = useToast();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      // Use optimized API service with caching and parallel requests
      const [homeData, coursesData] = await Promise.all([
        apiService.getHomeContent(),
        apiService.getCourses()
      ]);

      if (homeData.success) {
        setHomeContent(homeData.data);
      }
      if (coursesData.success) {
        // Get first 3 courses as featured
        setFeaturedCourses(coursesData.data.slice(0, 3));
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!homeContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
          <p className="text-muted-foreground">Home page content is not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-hero relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-glow"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-right">
              <h1 className="text-responsive-xl font-bold text-white leading-tight">
                {homeContent.heroTitle}
              </h1>
              <p className="text-responsive-md text-white/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {homeContent.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <Link to="/courses">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover-glow transition-all duration-300 transform hover:scale-105">
                    Explore Courses
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white text-gray hover:bg-white hover:text-primary hover-glow transition-all duration-300">
                    Get Free Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="glass rounded-2xl p-2 border border-white/20 hover-lift">
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={heroImage}
                    alt="Blizzen Creations"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="aspect-video bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-2xl">
                            <div class="text-center">
                              <div class="mb-2">🚀</div>
                              <div>Launch Your Career</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {homeContent.stats.map((stat, index) => (
              <div key={index} className="text-center text-white animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground text-lg">Start your journey with our most popular programs</p>
          </div>
          {featuredCourses.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <Card key={course._id} className="hover-lift border-primary/20 animate-scale-in group overflow-hidden bg-gradient-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="relative">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📚</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="flex gap-2 flex-wrap mt-2">
                        <Badge variant="secondary" className="animate-fade-in">{course.duration}</Badge>
                        <Badge variant="outline" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>{course.level}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {course.shortDescription || course.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Modules:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.highlights && course.highlights.slice(0, 4).map((highlight, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs hover:bg-primary hover:text-white transition-colors duration-300"
                          >
                            {highlight}
                          </Badge>
                        ))}
                        {course.highlights && course.highlights.length > 4 && (
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
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground">Loading featured courses...</div>
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" className="bg-gradient-primary hover-glow">
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Student Testimonials</h2>
            <p className="text-muted-foreground text-lg">Hear from our successful students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {homeContent.testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.message}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{homeContent.callToAction.title}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {homeContent.callToAction.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                {homeContent.callToAction.buttonText}
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-gray hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
