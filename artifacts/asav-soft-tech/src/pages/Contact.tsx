import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Phone, Mail, MapPin, Clock, Send, MessageCircle,
  CheckCircle, ArrowRight, Linkedin, Instagram, Youtube, Facebook
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us Directly",
    value: "+91 9535035171",
    desc: "Mon–Sat, 9 AM – 7 PM IST",
    href: "tel:+919535035171",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "asavsofttech@gmail.com",
    desc: "We reply within 24 hours",
    href: "mailto:asavsofttech@gmail.com",
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: MapPin,
    title: "Visit Our Center",
    value: "Tech Park, Cyber City",
    desc: "Bangalore, Karnataka, India",
    href: "#",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon – Saturday",
    desc: "9:00 AM – 7:00 PM IST",
    href: "#",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
  },
];

const faqs = [
  {
    q: "Do you offer a free demo class?",
    a: "Yes! Every course has a free introductory demo session. Register on our platform and enroll in any course to access your free demo.",
  },
  {
    q: "Are classes online or offline?",
    a: "We offer both live online classes via Zoom and in-person sessions at our Bangalore center. Recordings are available for all live sessions.",
  },
  {
    q: "What is the placement support like?",
    a: "We provide 100% placement assistance — resume building, mock interviews, company connections, and dedicated follow-up until you land your role.",
  },
  {
    q: "Can working professionals join?",
    a: "Absolutely. We have weekend batches and evening batches designed specifically for working professionals who want to upskill.",
  },
  {
    q: "What certifications will I receive?",
    a: "Upon course completion, you receive an ASAV Soft Tech Industry Certificate plus guidance and preparation for globally recognized certifications (AWS, CPC, etc.).",
  },
  {
    q: "Is EMI available for course fees?",
    a: "Yes, we offer flexible EMI options. Contact our admissions team for a customized payment plan that works for your budget.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", course: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/contact-hero.png`}
            alt="Contact ASAV Soft Tech"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <MessageCircle size={14} className="text-primary" />
              <span className="text-sm font-semibold text-primary">We're Here to Help</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
              Let's Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">
                Journey
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Whether you have questions about a course, need career guidance, or want to schedule 
              a free demo — our team is ready to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT CARDS ─── */}
      <section className="py-20 relative z-10 border-y border-border/30 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border/50 p-7 hover:border-primary/30 bg-card/30 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 block relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} border border-border/30 flex items-center justify-center mb-5`}>
                    <item.icon size={22} className={item.iconColor} />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">{item.title}</p>
                  <p className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM + MAP ─── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Form */}
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Send size={13} className="text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Send a Message</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
                Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Touch</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Fill out the form and one of our career counselors will reach out to you within 24 hours.
              </p>

              {submitted ? (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. Our team will contact you within 24 hours on{" "}
                    <strong className="text-foreground">{formData.phone || formData.email}</strong>.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Arjun Patel"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-card/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-card/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="arjun@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full h-12 px-4 rounded-xl bg-card/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Course of Interest</label>
                    <select
                      value={formData.course}
                      onChange={e => setFormData({...formData, course: e.target.value})}
                      className="w-full h-12 px-4 rounded-xl bg-card/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground appearance-none"
                    >
                      <option value="" className="bg-background">Select a course...</option>
                      <option value="devops" className="bg-background">DevOps Engineer</option>
                      <option value="data" className="bg-background">Data Engineer</option>
                      <option value="fullstack" className="bg-background">Full Stack Developer</option>
                      <option value="medical" className="bg-background">Medical Coding</option>
                      <option value="softskills" className="bg-background">Soft Skills & Communication</option>
                      <option value="other" className="bg-background">General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your background, goals, or any questions..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-semibold shadow-lg shadow-primary/20">
                    Send Message <ArrowRight size={18} className="ml-2" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to be contacted by our team. We respect your privacy.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Info Panel */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-8">
              {/* Quick CTA */}
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/team-photo.png`}
                  alt="ASAV Soft Tech Team"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Our Expert Team</p>
                  <h3 className="text-2xl font-bold text-foreground">Ready to guide your career journey</h3>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <MessageCircle size={28} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground text-lg mb-1">Chat on WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Get instant replies — usually within minutes.</p>
                </div>
                <a href="https://wa.me/919535035171" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl shrink-0">
                    Chat Now
                  </Button>
                </a>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-border/50 bg-card/30 p-6">
                <h4 className="font-bold text-foreground mb-5">Follow Us on Social Media</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn", sub: "Connect professionally", color: "hover:border-blue-500/50 hover:bg-blue-500/10", iconColor: "text-blue-400" },
                    { icon: Instagram, label: "Instagram", sub: "Student life & updates", color: "hover:border-pink-500/50 hover:bg-pink-500/10", iconColor: "text-pink-400" },
                    { icon: Youtube, label: "YouTube", sub: "Free training tutorials", color: "hover:border-red-500/50 hover:bg-red-500/10", iconColor: "text-red-400" },
                    { icon: Facebook, label: "Facebook", sub: "Community & events", color: "hover:border-blue-400/50 hover:bg-blue-400/10", iconColor: "text-blue-300" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href="#"
                      className={`flex items-center gap-3 p-3 rounded-xl border border-border/40 transition-all duration-200 group ${s.color}`}
                    >
                      <s.icon size={20} className={`${s.iconColor} shrink-0`} />
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-foreground">{s.label}</p>
                        <p className="text-xs text-muted-foreground leading-tight">{s.sub}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-card/20 border-y border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 mb-5">
              <MessageCircle size={13} className="text-secondary" />
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Common Questions</span>
            </div>
            <h2 className="text-4xl font-bold font-display mb-4">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-300">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">Quick answers to the questions we hear most often.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card/30 p-6 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Q
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2 text-lg">{faq.q}</h4>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-card to-secondary/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold font-display mb-4">
              Still Have{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Questions?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our admissions team is just one call away. Reach us at{" "}
              <a href="tel:+919535035171" className="text-primary font-semibold hover:underline">+91 9535035171</a>{" "}
              or drop an email at{" "}
              <a href="mailto:asavsofttech@gmail.com" className="text-primary font-semibold hover:underline">asavsofttech@gmail.com</a>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+919535035171">
                <Button size="lg" className="h-13 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold">
                  <Phone size={18} className="mr-2" /> Call Now
                </Button>
              </a>
              <a href="mailto:asavsofttech@gmail.com">
                <Button size="lg" variant="outline" className="h-13 px-8 border-white/20 hover:bg-white/5 rounded-xl">
                  <Mail size={18} className="mr-2" /> Send Email
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
