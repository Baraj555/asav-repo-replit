import { useParams, Link } from "wouter";
import { useGetCourse, useCreateEnrollment } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { DEFAULT_COURSES } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, Award, User, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || "1", 10);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: serverCourse, isLoading } = useGetCourse(courseId, { 
    query: { retry: false, enabled: !!courseId } 
  });
  
  const enrollMutation = useCreateEnrollment();

  const course = serverCourse || DEFAULT_COURSES.find(c => c.id === courseId) || DEFAULT_COURSES[0];

  const handleEnroll = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    
    enrollMutation.mutate({ data: { courseId: course.id } }, {
      onSuccess: () => {
        toast({
          title: "Successfully enrolled!",
          description: `You are now enrolled in ${course.title}.`,
        });
        setTimeout(() => window.location.href = "/dashboard/student", 1500);
      },
      onError: () => {
        // Fallback for mock demo
        toast({
          title: "Demo Mode Enrollment",
          description: "Simulated enrollment success since backend is unavailable.",
        });
        setTimeout(() => window.location.href = "/dashboard/student", 1500);
      }
    });
  };

  if (isLoading && !serverCourse) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24">
        {/* Header Hero */}
        <div className="relative border-b border-border/50 bg-card">
          <div className="absolute inset-0 z-0">
            <img src={course.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"} alt={course.title} className="w-full h-full object-cover opacity-20 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-background/50"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary border border-secondary/30 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              {course.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 text-glow">{course.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border border-border/50">
                <Clock className="text-primary" size={18} />
                <span className="font-medium text-foreground">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border border-border/50">
                <User className="text-primary" size={18} />
                <span className="font-medium text-foreground">Trainer: {course.trainerName}</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-lg border border-border/50 uppercase">
                <Award className="text-primary" size={18} />
                <span className="font-medium text-foreground">{course.level} Level</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold font-display mb-6 border-b border-border/50 pb-2">What you'll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(course.topics?.length ? course.topics : ["Industry standard tools", "Real-time project implementation", "Best practices & patterns", "Interview preparation"]).map((topic, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="text-muted-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display mb-6 border-b border-border/50 pb-2">Prerequisites</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                {course.prerequisites?.length ? course.prerequisites.map((req, i) => <li key={i}>{req}</li>) : (
                  <>
                    <li>Basic understanding of computers and internet</li>
                    <li>Willingness to learn and practice daily</li>
                    <li>No prior coding experience required for beginner courses</li>
                  </>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display mb-6 border-b border-border/50 pb-2">About the Trainer</h2>
              <div className="glass-panel p-6 rounded-2xl flex gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold shrink-0">
                  {course.trainerName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{course.trainerName}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.trainerBio || `${course.trainerName} is an industry veteran with over 10 years of experience in ${course.category}. They have successfully trained and placed hundreds of students in top MNCs.`}
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Sticky Sidebar */}
          <div className="relative">
            <div className="sticky top-32 glass-panel p-8 rounded-2xl border-t-4 border-t-primary">
              <div className="text-3xl font-bold font-display mb-2">₹{course.price || "14,999"}</div>
              <p className="text-sm text-muted-foreground mb-6 line-through">₹25,000 (40% OFF)</p>
              
              <Button 
                onClick={handleEnroll} 
                disabled={enrollMutation.isPending}
                className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 box-glow mb-6"
              >
                {enrollMutation.isPending ? "Processing..." : "Enroll Now"}
              </Button>
              
              <ul className="space-y-4 text-sm text-muted-foreground mb-6">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><BookOpen size={16}/> Real Projects</span>
                  <span className="font-semibold text-foreground">{course.realTimeProjects || 4}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Award size={16}/> Certificate</span>
                  <span className="font-semibold text-foreground">Yes</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Briefcase size={16}/> Placement</span>
                  <span className="font-semibold text-foreground">100% Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
