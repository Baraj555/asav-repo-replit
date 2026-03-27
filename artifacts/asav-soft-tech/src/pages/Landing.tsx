import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Server, Stethoscope, Users, CheckCircle, Briefcase, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/chatbot";
import { DEFAULT_COURSES } from "@/lib/constants";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Futuristic Tech Background" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-primary">100% Placement Assistance</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6">
              Empower Your <span className="text-glow text-primary">Career</span><br className="hidden md:block"/> With Us
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Master cutting-edge technologies with ASAV Soft Tech. Learn DevOps, Data Engineering, Full Stack, and more from industry experts.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 box-glow rounded-xl">
                  Explore Courses <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 hover:bg-white/5 rounded-xl">
                  Join Demo Session
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-card/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Students Placed", value: "500+" },
              { label: "Success Rate", value: "100%" },
              { label: "Expert Trainers", value: "20+" },
              { label: "Hiring Partners", value: "50+" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4"
              >
                <div className="text-4xl font-bold font-display text-secondary text-glow-secondary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Our Premium <span className="text-primary text-glow">Courses</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Industry-aligned curriculum designed to make you job-ready from day one.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEFAULT_COURSES.slice(0, 3).map((course, i) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 z-20 bg-primary/20 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30 uppercase tracking-wide">
                    {course.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold font-display mb-2 group-hover:text-secondary transition-colors">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="text-sm font-medium text-foreground">{course.duration}</div>
                    <Link href={`/courses`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">View Details</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 h-12 px-8 rounded-xl">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/20 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Why Choose <span className="text-primary">ASAV Soft Tech?</span></h2>
              <p className="text-muted-foreground mb-8 text-lg">We don't just teach technology; we build careers. Our unique approach focuses on practical skills that top employers demand.</p>
              
              <div className="space-y-6">
                {[
                  { icon: Briefcase, title: "100% Placement Support", desc: "Dedicated placement cell, resume building, and mock interviews." },
                  { icon: Award, title: "Real-time Projects", desc: "Work on live industry projects to build a strong portfolio." },
                  { icon: Users, title: "Expert Trainers", desc: "Learn from professionals with 10+ years of industry experience." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
              <div className="relative glass-panel rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 font-display text-center">Request a Callback</h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Your Name" className="w-full h-12 px-4 rounded-xl bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <input type="email" placeholder="Email Address" className="w-full h-12 px-4 rounded-xl bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <input type="tel" placeholder="Phone Number" className="w-full h-12 px-4 rounded-xl bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg rounded-xl mt-4">Submit Request</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
