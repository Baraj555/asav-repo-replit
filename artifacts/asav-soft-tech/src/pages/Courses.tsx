import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Award, User, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGetCourses } from "@workspace/api-client-react";
import { DEFAULT_COURSES } from "@/lib/constants";

export default function Courses() {
  const [search, setSearch] = useState("");
  
  // In a real app, query parameters could be wired to state. 
  // We'll fetch all and filter locally for simplicity, or rely on the endpoint.
  const { data: serverCourses, isLoading } = useGetCourses(undefined, { 
    query: { retry: false } 
  });

  const displayCourses = (serverCourses && serverCourses.length > 0) 
    ? serverCourses 
    : DEFAULT_COURSES;

  const filteredCourses = displayCourses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Explore Our <span className="text-primary text-glow">Programs</span></h1>
            <p className="text-lg text-muted-foreground">Transform your career with our specialized, project-driven IT training courses.</p>
          </div>

          <div className="max-w-xl mx-auto mb-12 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              type="text" 
              placeholder="Search by course name or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border-border/50 focus-visible:ring-primary text-lg"
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-card animate-pulse border border-border/50"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, i) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={course.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wide">
                      {course.level}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-secondary text-sm font-semibold mb-2">{course.category}</div>
                    <h3 className="text-xl font-bold font-display mb-3">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary" /> {course.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-primary" /> {course.trainerName}
                      </div>
                      {course.hasCertification && (
                        <div className="flex items-center gap-2 col-span-2">
                          <Award size={16} className="text-primary" /> Certification Included
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/courses/${course.id}`}>
                      <Button className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground group-hover:box-glow transition-all rounded-xl h-12">
                        View Details <ChevronRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
              
              {filteredCourses.length === 0 && (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                  No courses found matching your search.
                </div>
              )}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
