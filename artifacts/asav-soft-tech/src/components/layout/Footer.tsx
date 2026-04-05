import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded overflow-hidden bg-card p-0.5">
                <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo" className="w-full h-full object-cover rounded-sm" />
              </div>
              <h2 className="font-display font-bold text-lg text-glow">ASAV Soft Tech</h2>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Empowering careers through industry-leading IT training in DevOps, Data Engineering, Full Stack, and more. 100% placement assistance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"><Linkedin size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"><Twitter size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"><Instagram size={16} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-6 font-display">Quick Links</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Student Login</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Trainer Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-6 font-display">Top Courses</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/courses" className="hover:text-primary transition-colors">DevOps Engineer</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Data Engineering</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Full Stack Web Dev</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">Medical Coding</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-6 font-display">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary shrink-0 mt-0.5" />
                <span>+91 9535035171</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                <span>asavsofttech@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Tech Park, Cyber City<br/>Hyderabad, India</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ASAV Soft Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
