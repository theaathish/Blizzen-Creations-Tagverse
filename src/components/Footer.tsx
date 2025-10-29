import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { apiService } from "@/services/api";
import logo from "@/assets/logo.png";

interface ContactInfo {
  companyName: string;
  address: string;
  city: string;
  state: string;
  phone: Array<{ label: string; number: string }>;
  email: Array<{ label: string; address: string }>;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
}

const Footer = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      // Use optimized API service with caching
      const [contactData, coursesData] = await Promise.all([
        apiService.getContactInfo(),
        apiService.getCourses()
      ]);

      if (contactData.success) {
        setContactInfo(contactData.data);
      }
      if (coursesData.success) {
        setCourses(coursesData.data.slice(0, 4)); // Get first 4 courses
      }
    } catch (error) {
      console.error('Failed to fetch footer data:', error);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-accent/5 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Blizzen Creations"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Transforming careers through comprehensive IT training, hands-on projects, and guaranteed placement support in Chennai, Tamil Nadu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Our Courses</Link></li>
              <li><Link to="/placements" className="text-muted-foreground hover:text-primary transition-colors">Placements</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Popular Courses</h4>
            <ul className="space-y-2 text-sm">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <li key={course._id}>
                    <Link 
                      to={`/courses/${course.slug}`} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {course.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Python Full Stack Development</Link></li>
                  <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Data Science & Analytics</Link></li>
                  <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">AI & Machine Learning</Link></li>
                  <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>
                  {contactInfo ? 
                    `${contactInfo.city}, ${contactInfo.state}` : 
                    "Chennai, Tamil Nadu, India"
                  }
                </span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone size={16} />
                <span>
                  {contactInfo?.phone?.[0]?.number || "+91 XXXXX XXXXX"}
                </span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail size={16} />
                <span>
                  {contactInfo?.email?.[0]?.address || "info@blizzencreations.com"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {contactInfo?.companyName || "Blizzen Creations"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
