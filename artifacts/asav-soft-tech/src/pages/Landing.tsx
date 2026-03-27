import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Server, Stethoscope, Users, CheckCircle, Briefcase, Award, Play, Star, GraduationCap, Video, MessageSquare } from "lucide-react";
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

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-primary/50 p-1 bg-card/50 mx-auto mb-8 box-glow flex items-center justify-center overflow-hidden backdrop-blur-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="ASAV Logo" className="w-full h-full object-cover rounded-full" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-primary">India's #1 IT Training Institute</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold font-display tracking-tight mb-6">
              Empower Your <span className="text-glow text-primary">Career</span><br className="hidden md:block"/> With Us
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
              Master cutting-edge technologies with ASAV Soft Tech. Learn DevOps, Data Engineering, Full Stack, and more from industry experts with real-world projects.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 box-glow rounded-xl font-semibold">
                  Explore Courses <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 hover:bg-white/5 rounded-xl font-semibold backdrop-blur-sm">
                  Join Demo Session
                </Button>
              </Link>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto h-14 px-6 text-lg hover:bg-transparent hover:text-primary text-foreground font-semibold flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center pl-1 text-primary">
                  <Play size={18} />
                </div>
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10 border-y border-white/5 bg-gradient-to-b from-card/40 to-background backdrop-blur-sm before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/30 before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-primary/30 after:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Students Placed", value: "500+", subtitle: "In top MNCs", icon: GraduationCap },
              { label: "Success Rate", value: "100%", subtitle: "Placement assistance", icon: Briefcase },
              { label: "Expert Trainers", value: "20+", subtitle: "With industry experience", icon: Users },
              { label: "Hiring Partners", value: "50+", subtitle: "Across the globe", icon: CheckCircle },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 flex flex-col items-center justify-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-card/50 border border-white/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                  <stat.icon size={28} />
                </div>
                <div className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-foreground text-sm uppercase tracking-wider font-semibold mb-1">{stat.label}</div>
                <div className="text-muted-foreground text-xs">{stat.subtitle}</div>
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
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Industry-aligned curriculum designed to make you job-ready from day one.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEFAULT_COURSES.slice(0, 3).map((course, i) => {
              const levelColors = {
                beginner: "bg-green-500/20 text-green-400 border-green-500/30",
                intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
                advanced: "bg-orange-500/20 text-orange-400 border-orange-500/30"
              };
              
              return (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel rounded-2xl overflow-hidden group flex flex-col relative card-hover"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary to-secondary z-30"></div>
                  <div className="h-52 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-4 right-4 z-20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${levelColors[course.level as keyof typeof levelColors]}`}>
                      {course.level}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative z-20 bg-card/40">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-secondary text-xs font-bold uppercase tracking-wider">{course.category}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Star size={14} fill="currentColor" /> 4.8 <span className="text-muted-foreground ml-1">(120+ enrolled)</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{course.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="text-sm font-medium text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span> {course.duration}
                      </div>
                      <Link href={`/courses`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 rounded-lg">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/courses">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary h-12 px-8 rounded-xl font-semibold transition-all">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Placement Success Stories */}
      <section className="py-24 bg-card/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Placement <span className="text-primary text-glow">Success Stories</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Hear from our alumni who transformed their careers with ASAV Soft Tech.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Arjun Patel", company: "TCS", role: "DevOps Engineer", package: "8 LPA", course: "DevOps Engineer", avatar: "AP", color: "from-blue-500 to-indigo-600" },
              { name: "Kavya Reddy", company: "Infosys", role: "Data Analyst", package: "7.5 LPA", course: "Data Engineer", avatar: "KR", color: "from-pink-500 to-rose-600" },
              { name: "Ravi Kumar", company: "Accenture", role: "Full Stack Dev", package: "9 LPA", course: "Full Stack Developer", avatar: "RK", color: "from-amber-500 to-orange-600" }
            ].map((student, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl relative gradient-border card-hover flex flex-col"
              >
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-muted-foreground text-sm mb-6 flex-1 italic">"The {student.course} training at ASAV Soft Tech was a game-changer. The hands-on projects and interview prep helped me crack {student.company} with a great package!"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${student.color}`}>
                    {student.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground font-display">{student.name}</h4>
                    <p className="text-xs text-muted-foreground">{student.role} @ <span className="text-secondary font-medium">{student.company}</span></p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Package</div>
                    <div className="font-bold text-primary">{student.package}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Why Choose <span className="text-primary text-glow">ASAV Soft Tech?</span></h2>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">We don't just teach technology; we build careers. Our unique approach focuses on practical skills that top employers demand.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Briefcase, title: "100% Placement Support", desc: "Dedicated placement cell & mock interviews." },
                  { icon: Award, title: "Real-time Projects", desc: "Build a strong portfolio with live projects." },
                  { icon: Users, title: "Expert Trainers", desc: "Learn from 10+ years experienced pros." },
                  { icon: Video, title: "Live Zoom Classes", desc: "Interactive online sessions with recordings." },
                  { icon: CheckCircle, title: "Industry Certificate", desc: "Recognized by top tech companies globally." },
                  { icon: MessageSquare, title: "24/7 AI Support", desc: "Get your doubts resolved anytime instantly." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground mb-1 font-display">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Side */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
              <div className="relative glass-panel rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold font-display mb-2">Request a Callback</h3>
                  <p className="text-sm text-muted-foreground">Fill out the form and our career counselor will contact you.</p>
                </div>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full h-12 px-4 rounded-xl bg-background border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full h-12 px-4 rounded-xl bg-background border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground ml-1">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" className="w-full h-12 px-4 rounded-xl bg-background border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50" />
                  </div>
                  <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg rounded-xl mt-6 font-semibold box-glow">Submit Request</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Logos Section */}
      <section className="py-16 bg-card/30 border-y border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">Our Alumni Work At</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {["TCS", "Infosys", "Wipro", "Accenture", "HCL", "Amazon"].map((company) => (
              <div key={company} className="text-xl md:text-3xl font-bold font-display grayscale hover:grayscale-0 hover:text-primary transition-all duration-300 cursor-default select-none">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
