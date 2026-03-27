import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Code, Database, Server, Stethoscope, Users,
  CheckCircle, Briefcase, Award, Star, GraduationCap, Video,
  MessageSquare, ChevronRight, Zap, Shield, Globe, TrendingUp, Play
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEFAULT_COURSES } from "@/lib/constants";

const base = import.meta.env.BASE_URL;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const courseIcons: Record<number, React.ElementType> = {
  1: Server,
  2: Database,
  3: Code,
  4: Stethoscope,
  5: Users,
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${base}images/hero-bg-new.png`}
            alt="Tech Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </div>

        {/* Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[130px] animate-pulse delay-1000 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
            {/* Logo */}
            <div className="w-28 h-28 rounded-full border-2 border-primary/60 p-1.5 bg-card/60 mx-auto mb-8 flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-2xl shadow-primary/20">
              <img src={`${base}logo.jpeg`} alt="ASAV Soft Tech Logo" className="w-full h-full object-cover rounded-full" />
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/40 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">India's #1 IT Training Institute</span>
              <Star size={13} className="text-primary fill-primary ml-1" />
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-6 leading-[1.05]">
              Empower Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-300 to-primary">
                Career
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-cyan-300 to-secondary">
                With Us
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Master cutting-edge technologies. Get placed in top MNCs.
              <br className="hidden md:block" />
              <span className="text-foreground/80 font-medium">500+ students placed. 100% placement assistance.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/courses">
                <Button size="lg" className="h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold shadow-xl shadow-primary/25">
                  Explore Courses <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 hover:bg-white/5 rounded-xl font-semibold backdrop-blur-sm">
                  Book Free Demo
                </Button>
              </Link>
              <Button size="lg" variant="ghost" className="h-14 px-6 text-lg hover:bg-transparent hover:text-primary font-semibold flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center pl-1 text-primary border border-primary/30">
                  <Play size={18} />
                </div>
                Watch Demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {[
                { icon: CheckCircle, text: "No experience required" },
                { icon: Shield, text: "100% placement guarantee" },
                { icon: Zap, text: "Live online & offline" },
                { icon: Globe, text: "Globally recognized certs" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <b.icon size={16} className="text-primary" />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 relative z-10 border-y border-white/5 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Students Placed", value: "500+", subtitle: "In top MNCs globally", icon: GraduationCap, color: "text-primary" },
              { label: "Placement Rate", value: "100%", subtitle: "Dedicated career support", icon: Briefcase, color: "text-green-400" },
              { label: "Expert Trainers", value: "20+", subtitle: "Industry practitioners", icon: Users, color: "text-secondary" },
              { label: "Hiring Partners", value: "50+", subtitle: "Across India & abroad", icon: TrendingUp, color: "text-purple-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 flex flex-col items-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-card/70 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={26} className={stat.color} />
                </div>
                <div className={`text-4xl md:text-5xl font-bold font-display mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-foreground text-xs uppercase tracking-wider font-semibold mb-1">{stat.label}</div>
                <div className="text-muted-foreground text-xs">{stat.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COURSES PREVIEW ─── */}
      <section className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Zap size={14} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Industry-Aligned Programs</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-5">
              Our Premium{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Courses</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
              5 high-demand programs designed to make you job-ready from day one — with real projects, live mentoring, and placement support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEFAULT_COURSES.slice(0, 3).map((course, i) => {
              const CourseIcon = courseIcons[course.id] || Code;
              const levelColors: Record<string, string> = {
                beginner: "bg-green-500/20 text-green-400 border-green-500/30",
                intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
                advanced: "bg-orange-500/20 text-orange-400 border-orange-500/30",
              };
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="glass-panel rounded-2xl overflow-hidden group flex flex-col relative card-hover"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary to-secondary z-30" />
                  <div className="h-52 overflow-hidden relative">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
                    <div className={`absolute top-4 right-4 z-20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${levelColors[course.level]}`}>
                      {course.level}
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 w-10 h-10 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-primary">
                      <CourseIcon size={20} />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative z-20 bg-card/40">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-secondary text-xs font-bold uppercase tracking-wider">{course.category}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-400">
                        <Star size={12} fill="currentColor" /> 4.8
                      </div>
                    </div>
                    <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {course.topics?.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 bg-muted/40 border border-border/40 text-muted-foreground rounded-lg">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        {course.duration}
                      </div>
                      <Link href="/courses">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 rounded-xl px-4">
                          View Details <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* All 5 courses mini list */}
          <motion.div {...fadeUp} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DEFAULT_COURSES.map((course, i) => {
              const CourseIcon = courseIcons[course.id] || Code;
              return (
                <Link key={course.id} href="/courses">
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/40 bg-card/30 hover:bg-card/60 transition-all group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                      <CourseIcon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">{course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>

          <div className="mt-10 text-center">
            <Link href="/courses">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground h-13 px-10 rounded-xl font-semibold text-base transition-all">
                View All Courses <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-24 border-y border-white/5 relative z-10 bg-card/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image + Floating stats */}
            <motion.div {...fadeUp} className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-15 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img src={`${base}images/team-photo.png`} alt="ASAV Soft Tech Team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl px-5 py-3 shadow-xl">
                <p className="text-xs text-muted-foreground mb-1">Students Placed</p>
                <p className="text-3xl font-bold text-primary font-display">500+</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl px-5 py-3 shadow-xl">
                <p className="text-xs text-muted-foreground mb-1">Placement Rate</p>
                <p className="text-3xl font-bold text-green-400 font-display">100%</p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 mb-6">
                <Shield size={13} className="text-secondary" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Why ASAV?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-5">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">ASAV Soft Tech?</span>
              </h2>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                We don't just teach technology — we build complete professionals ready to excel from day one at their dream company.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Briefcase, title: "100% Placement Support", desc: "Dedicated placement cell, mock interviews, and company referrals." },
                  { icon: Award, title: "Real-time Projects", desc: "Build a strong portfolio with 5+ live industry projects." },
                  { icon: Users, title: "Expert Trainers", desc: "Learn from professionals with 8-12 years of industry experience." },
                  { icon: Video, title: "Live Zoom Classes", desc: "Interactive online sessions with recordings always available." },
                  { icon: CheckCircle, title: "Industry Certificates", desc: "Globally recognized certifications valued by top recruiters." },
                  { icon: MessageSquare, title: "24/7 AI Support", desc: "Get instant doubt resolution anytime, anywhere." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <feature.icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-1 font-display">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">Real Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-5">
              Placement{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Success Stories</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xl">Hear from our alumni who transformed their careers with ASAV Soft Tech.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Arjun Patel", company: "TCS", role: "DevOps Engineer", package: "8 LPA", course: "DevOps Engineer", avatar: "AP", color: "from-blue-600 to-indigo-500", review: "The hands-on Docker & Kubernetes labs were exactly what TCS tested in their interview. ASAV's mock sessions made me fully confident." },
              { name: "Kavya Reddy", company: "Infosys", role: "Data Analyst", package: "7.5 LPA", course: "Data Engineer", avatar: "KR", color: "from-pink-600 to-rose-500", review: "Priya ma'am's Python & Spark sessions were incredible. Within 2 months of completing the course, I got placed at Infosys." },
              { name: "Ravi Kumar", company: "Accenture", role: "Full Stack Dev", package: "9 LPA", course: "Full Stack Developer", avatar: "RK", color: "from-amber-500 to-orange-600", review: "The full-stack curriculum was perfectly aligned with what Accenture wanted. The live project portfolio made all the difference in my interview." },
            ].map((student, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-panel p-7 rounded-2xl relative card-hover flex flex-col overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary to-secondary" />
                <div className="flex gap-1 mb-5 text-amber-400">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-foreground/80 text-base mb-7 flex-1 leading-relaxed">"{student.review}"</p>
                <div className="flex items-center gap-4 pt-5 border-t border-border/50">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${student.color} shadow-lg`}>
                    {student.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground font-display">{student.name}</h4>
                    <p className="text-xs text-muted-foreground">{student.role} @ <span className="text-secondary font-semibold">{student.company}</span></p>
                    <p className="text-xs text-muted-foreground mt-0.5">via {student.course}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Package</div>
                    <div className="font-bold text-primary text-lg">{student.package}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALLBACK FORM ─── */}
      <section className="py-24 bg-card/20 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Zap size={13} className="text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Free Consultation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Start Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">IT Career</span>
                <br />Today
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Not sure which course is right for you? Our career counselors will assess your background, goals, and recommend the perfect path.
              </p>
              <div className="space-y-5">
                {[
                  { icon: CheckCircle, text: "Free personalized career assessment" },
                  { icon: CheckCircle, text: "Course roadmap tailored to your goals" },
                  { icon: CheckCircle, text: "Salary expectations and job market insights" },
                  { icon: CheckCircle, text: "Fee structure and EMI options explained" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={20} className="text-primary shrink-0" />
                    <span className="text-foreground/90 text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20" />
                <div className="relative glass-panel rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold font-display mb-2">Request a Free Callback</h3>
                    <p className="text-sm text-muted-foreground">Our counselor will call you within 2 hours.</p>
                  </div>
                  <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <input type="text" placeholder="Your full name" className="w-full h-12 px-4 rounded-xl bg-background/80 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210" className="w-full h-12 px-4 rounded-xl bg-background/80 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Course Interested In</label>
                      <select className="w-full h-12 px-4 rounded-xl bg-background/80 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none">
                        <option value="" className="bg-background">Select a course...</option>
                        <option className="bg-background">DevOps Engineer</option>
                        <option className="bg-background">Data Engineer</option>
                        <option className="bg-background">Full Stack Developer</option>
                        <option className="bg-background">Medical Coding</option>
                        <option className="bg-background">Soft Skills & Communication</option>
                      </select>
                    </div>
                    <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-base rounded-xl font-semibold shadow-lg shadow-primary/25">
                      Request Callback <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ALUMNI LOGOS ─── */}
      <section className="py-16 bg-card/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-10">
            Our Alumni Are Thriving At
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {["TCS", "Infosys", "Wipro", "Accenture", "HCL", "Amazon", "Cognizant", "Tech Mahindra"].map((company) => (
              <div key={company} className="text-xl md:text-2xl font-extrabold font-display text-muted-foreground/40 hover:text-primary transition-all duration-300 cursor-default select-none">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-card to-secondary/10" />
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <div className="w-20 h-20 rounded-full border-2 border-primary/40 p-1 mx-auto mb-8">
              <img src={`${base}logo.jpeg`} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Ready to Transform{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Your Future?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
              Join 500+ graduates who chose ASAV Soft Tech and landed careers at India's top IT companies.
            </p>
            <p className="text-muted-foreground mb-10">
              📞 <a href="tel:+919535035171" className="text-primary font-semibold hover:underline">+91 9535035171</a>{" "}
              &nbsp;|&nbsp; ✉️{" "}
              <a href="mailto:asavsofttech@gmail.com" className="text-primary font-semibold hover:underline">asavsofttech@gmail.com</a>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-semibold shadow-xl shadow-primary/20">
                  Start Learning Now <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-10 border-white/20 hover:bg-white/5 rounded-xl text-base">
                  Talk to Counselor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
