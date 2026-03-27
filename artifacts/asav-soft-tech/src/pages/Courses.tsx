import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Award, User, ChevronRight, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGetCourses } from "@workspace/api-client-react";
import { DEFAULT_COURSES } from "@/lib/constants";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  const { data: serverCourses, isLoading } = useGetCourses(undefined, { 
    query: { retry: false } 
  });

  const displayCourses = (serverCourses && serverCourses.length > 0) 
    ? serverCourses 
    : DEFAULT_COURSES;

  const filters = ["All", "DevOps", "Data", "Web Development", "Healthcare", "Professional Development"];

  const filteredCourses = displayCourses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || c.category.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">Explore Our <span className="text-primary text-glow">Programs</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Transform your career with our specialized, project-driven IT training courses tailored for industry demands.</p>
          </div>

          <div className="max-w-2xl mx-auto mb-10 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              type="text" 
              placeholder="Search by course name or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-card/50 backdrop-blur-sm border-border/50 focus-visible:ring-primary focus-visible:ring-2 text-lg shadow-xl"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeFilter === filter 
                    ? "bg-primary text-primary-foreground border-primary box-glow" 
                    : "bg-card/50 text-muted-foreground border-border/50 hover:bg-card hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-[450px] rounded-2xl bg-card animate-pulse border border-border/50"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, i) => {
                const levelColors = {
                  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
                  intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
                  advanced: "bg-orange-500/20 text-orange-400 border-orange-500/30"
                };

                const isPopular = course.id === 3; // Full Stack Developer example

                return (
                  <motion.div 
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel rounded-2xl overflow-hidden group flex flex-col card-hover relative"
                  >
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary to-secondary z-30"></div>
                    
                    <div className="h-52 overflow-hidden relative">
                      <img src={course.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-80"></div>
                      
                      {isPopular && (
                        <div className="absolute top-4 left-4 z-20 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide box-glow flex items-center gap-1">
                          <Star size={12} fill="currentColor" /> Most Popular
                        </div>
                      )}

                      <div className={`absolute top-4 right-4 z-20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${levelColors[course.level as keyof typeof levelColors]}`}>
                        {course.level}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col relative z-20 bg-card/20">
                      <div className="text-secondary text-xs font-bold uppercase tracking-wider mb-2">{course.category}</div>
                      <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-2">{course.description}</p>
                      
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary shrink-0" /> <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-primary shrink-0" /> <span className="truncate font-medium text-foreground">{course.trainerName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-amber-400 mt-1 pl-6">
                            <Star size={12} fill="currentColor" /> 4.8 <span className="text-muted-foreground">(142 enrolled)</span>
                          </div>
                        </div>
                        {course.hasCertification && (
                          <div className="flex items-center gap-2 col-span-2 text-green-400 bg-green-500/10 w-fit px-3 py-1 rounded-md">
                            <Award size={16} className="shrink-0" /> Certification Included
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Fee</span>
                          <span className="font-bold text-foreground">Ask for Price</span>
                        </div>
                        <Link href={`/courses/${course.id}`}>
                          <Button className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground group-hover:box-glow transition-all rounded-xl h-11 px-6 font-semibold">
                            View Details <ChevronRight size={18} className="ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
              
              {filteredCourses.length === 0 && (
                <div className="col-span-full py-20 text-center glass-panel rounded-2xl">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-lg text-foreground font-medium">No courses found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                  <Button variant="outline" className="mt-6 rounded-xl" onClick={() => {setSearch(""); setActiveFilter("All")}}>
                    Clear Filters
                  </Button>
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
