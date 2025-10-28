import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { Award, TrendingUp, Users, Briefcase, Loader2 } from "lucide-react";

interface Placement {
  _id: string;
  studentName: string;
  course: string;
  company: string;
  position: string;
  salary: string;
  testimonial: string;
  image?: string;
}

const Placements = () => {
  const { toast } = useToast();
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { icon: TrendingUp, number: "95%", label: "Placement Rate" },
    { icon: Users, number: "5000+", label: "Students Placed" },
    { icon: Briefcase, number: "50+", label: "Hiring Partners" },
    { icon: Award, number: "₹6.5 LPA", label: "Average Package" }
  ];

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPlacements();
      if (data.success) {
        setPlacements(data.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch placements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Our Placements</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Join thousands of successful students placed in top companies across India
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Success Stories</h2>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : placements.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No placements available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {placements.map((placement, index) => (
                <Card 
                  key={placement._id}
                  className="hover:shadow-lg transition-all animate-scale-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {placement.image && (
                    <div className="w-full h-48 overflow-hidden bg-muted">
                      <img 
                        src={placement.image} 
                        alt={placement.studentName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{placement.studentName}</CardTitle>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <Badge variant="secondary">{placement.course}</Badge>
                      <Badge variant="outline">{placement.company}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-semibold">{placement.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Salary</p>
                      <p className="font-semibold text-primary">{placement.salary}</p>
                    </div>
                    {placement.testimonial && (
                      <div>
                        <p className="text-sm text-muted-foreground italic">"{placement.testimonial}"</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Be Our Next Success Story</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our comprehensive training programs and launch your career with top companies
          </p>
        </div>
      </section>
    </div>
  );
};

export default Placements;
