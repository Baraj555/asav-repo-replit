import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Target, Eye, Heart, Award, Users, TrendingUp, Zap, Shield,
  Star, CheckCircle, ArrowRight, BookOpen, Briefcase, Globe, Lightbulb
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stats = [
  { value: "500+", label: "Students Placed", icon: Briefcase, color: "text-primary" },
  { value: "100%", label: "Placement Rate", icon: TrendingUp, color: "text-green-400" },
  { value: "20+", label: "Expert Trainers", icon: Users, color: "text-secondary" },
  { value: "5+", label: "Years of Excellence", icon: Award, color: "text-purple-400" },
];

const values = [
  {
    icon: Target,
    title: "Result-Driven Learning",
    desc: "Every course module is crafted with a single focus — your employability. We don't teach for exams; we train for real-world excellence.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Eye,
    title: "Industry-First Vision",
    desc: "Our curriculum is co-designed with hiring managers at top IT companies so you're always learning what the market demands — not yesterday's skills.",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Heart,
    title: "Student-First Culture",
    desc: "We believe in zero-student left behind. From doubt-clearing sessions to emotional support during job searches, we walk every step with you.",
    color: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-400",
  },
  {
    icon: Zap,
    title: "Speed of Innovation",
    desc: "Technology changes fast. Our content is updated quarterly to include the hottest tools, certifications, and frameworks employers seek right now.",
    color: "from-yellow-500/20 to-yellow-500/5",
    iconColor: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Integrity & Trust",
    desc: "No false promises. We tell you exactly what to expect — timelines, outcomes, effort — and then we deliver. Our 500+ placements speak louder than words.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: Globe,
    title: "Global Certifications",
    desc: "All our programs award internationally recognized certifications — from AWS and Kubernetes to PMP — valued by recruiters across India and abroad.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
  },
];

const team = [
  {
    name: "Vasu Deva",
    role: "Lead DevOps Trainer",
    exp: "7+ Years",
    specialty: "Cloud, Kubernetes, CI/CD",
    initial: "B",
    gradient: "from-blue-600 to-cyan-400",
  },
  {
    name: "Raghu",
    role: "Data Engineering Expert",
    exp: "8+ Years",
    specialty: "Python, SQL, Spark, Snowflake",
    initial: "PS",
    gradient: "from-purple-600 to-pink-400",
  },
  {
    name: "Amit Verma",
    role: "Full Stack Architect",
    exp: "9+ Years",
    specialty: "React, Node.js, MongoDB",
    initial: "AV",
    gradient: "from-primary to-amber-300",
  },
  {
    name: "Venkatesh Gouda",
    role: "Medical Coding Lead",
    exp: "5+ Years",
    specialty: "ICD-10, CPT, HCPCS",
    initial: "VG",
    gradient: "from-emerald-600 to-green-400",
  },
];

const milestones = [
  { year: "2019", event: "ASAV Soft Tech Founded", desc: "Started with a vision to democratize quality IT education in India." },
  { year: "2020", event: "100 Placements Milestone", desc: "Crossed 100 successful placements within the first year, proving our model works." },
  { year: "2021", event: "Expanded to 5 Courses", desc: "Launched Data Engineering and Medical Coding programs to meet rising demand." },
  { year: "2022", event: "Best IT Institute Award", desc: "Recognized by the Indian IT Education Council as a top emerging training institute." },
  { year: "2023", event: "300+ Placements", desc: "Our alumni now work at TCS, Infosys, Wipro, Accenture, HCL, and Amazon." },
  { year: "2024", event: "Digital Platform Launch", desc: "Launched this full-featured digital learning platform with live classes and AI support." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/about-hero.png`}
            alt="ASAV Soft Tech Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Star size={14} className="text-primary fill-primary" />
                <span className="text-sm font-semibold text-primary">India's Premier IT Training Institute</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
                We Don't Just{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">
                  Teach
                </span>
                <br />
                We Build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-300">
                  Careers
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Since 2019, ASAV Soft Tech has been transforming ambitious individuals into
                high-performing IT professionals — with industry-first training, 100% placement
                support, and mentorship that never stops at graduation.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button size="lg" className="h-13 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-semibold">
                    Explore Courses <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="h-13 px-8 border-white/20 hover:bg-white/5 rounded-xl text-base">
                    Join Free Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative z-10 border-y border-border/30 bg-card/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className={`flex justify-center mb-3`}>
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <s.icon size={22} className={s.color} />
                  </div>
                </div>
                <div className={`text-4xl font-bold font-display mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div {...fadeUp} className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur opacity-20 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-mission.png`}
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl px-5 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Lightbulb size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Founded on</p>
                    <p className="text-sm font-bold text-foreground">Passion & Excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Story Text */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 mb-6">
                <BookOpen size={14} className="text-secondary" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Our Story</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                Born From a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">
                  Mission
                </span>
              </h2>

              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <span className="text-foreground font-semibold">ASAV Soft Tech</span> was born
                  out of a simple, powerful observation: thousands of talented individuals in India
                  had the potential to be world-class tech professionals — but lacked the right
                  guidance, structure, and industry exposure.
                </p>
                <p>
                  Founded in 2019, we set out to fix that. Not with theoretical lectures and
                  outdated textbooks — but with hands-on, project-based learning built around what
                  real employers actually look for. Every course we design starts with one question:
                  <span className="text-primary font-medium"> "Will this get our student hired?"</span>
                </p>
                <p>
                  Today, our alumni are thriving at companies like TCS, Infosys, Wipro, Accenture,
                  Amazon, and HCL. They didn't just get jobs — they got <em>careers</em>. And that
                  distinction is everything to us.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                {[
                  "Industry-aligned curriculum updated every quarter",
                  "Personal mentorship from working professionals",
                  "100% placement assistance — guaranteed",
                  "Live project experience before graduation",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PROMOTIONAL QUOTE ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-card/50 to-secondary/8" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="text-7xl text-primary/20 font-serif leading-none mb-4">"</div>
            <blockquote className="text-3xl md:text-4xl font-bold font-display leading-snug text-foreground mb-6">
              Your potential is our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">
                responsibility.
              </span>{" "}
              Your success is our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-300">
                greatest achievement.
              </span>
            </blockquote>
            <p className="text-muted-foreground text-lg">
              — The ASAV Soft Tech Founding Team
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── OUR VALUES ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-5">
              <Heart size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">What Drives Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Our Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Values</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Six principles that define how we teach, support, and celebrate every student who walks through our doors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/50 p-7 hover:border-border transition-all duration-300 hover:-translate-y-1 bg-card/30 backdrop-blur-sm overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} border border-border/30 flex items-center justify-center mb-5`}>
                    <val.icon size={22} className={val.iconColor} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOURNEY TIMELINE ─── */}
      <section className="py-24 bg-card/20 border-y border-border/30 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 mb-5">
              <TrendingUp size={14} className="text-secondary" />
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              5 Years of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-300">
                Excellence
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">Milestones that mark our relentless pursuit of student success.</p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 items-start"
                >
                  {/* Year bubble */}
                  <div className="shrink-0 w-16 h-16 rounded-full border-2 border-primary/50 bg-card flex items-center justify-center relative z-10 hidden md:flex">
                    <span className="text-xs font-bold text-primary">{m.year}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-2xl bg-card/40 border border-border/40 p-6 hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md md:hidden">{m.year}</span>
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{m.event}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRAINERS ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-5">
              <Users size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Meet Our Experts</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Learn From{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">
                The Best
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every trainer at ASAV Soft Tech is an active industry practitioner — not just a teacher, but a working professional who lives and breathes the technology they teach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border/50 p-6 hover:border-primary/30 bg-card/30 backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 text-center"
              >
                {/* Avatar */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {member.initial}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-1">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-3">{member.exp} Experience</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {member.specialty.split(", ").map((tag, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-full border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-card to-secondary/15" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="w-20 h-20 rounded-full border-2 border-primary/40 p-1 mx-auto mb-8 bg-card/50 backdrop-blur-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Your Future Starts{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Today</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
              Don't wait for the "right time." The best time to invest in your career is <strong className="text-foreground">right now</strong>. 
              Join 500+ graduates who chose ASAV Soft Tech and never looked back.
            </p>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Call us at <a href="tel:+919535035171" className="text-primary font-semibold hover:underline">+91 9535035171</a> or 
              email <a href="mailto:asavsofttech@gmail.com" className="text-primary font-semibold hover:underline">asavsofttech@gmail.com</a>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-semibold shadow-lg shadow-primary/20">
                  Browse All Courses <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="h-14 px-10 border-white/20 hover:bg-white/5 rounded-xl text-base">
                  Book Free Demo Class
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
