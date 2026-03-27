import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/30 backdrop-blur-2xl bg-background/80 after:absolute after:h-[1px] after:bottom-0 after:left-0 after:right-0 after:bg-gradient-to-r after:from-transparent after:via-primary/40 after:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden box-glow bg-card p-1">
              <img 
                src={`${import.meta.env.BASE_URL}logo.jpeg`} 
                alt="ASAV Soft Tech" 
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground text-glow group-hover:text-primary transition-colors">ASAV Soft Tech</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">Empower Your Career</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary text-glow" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 border-l border-border/50 pl-8">
              {user ? (
                <>
                  <Link href={`/dashboard/${user.role}`}>
                    <Button variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10 rounded-xl">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={logout} className="text-muted-foreground hover:text-destructive">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-muted-foreground hover:text-white">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow rounded-xl font-semibold">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/5"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-primary p-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border/50 my-2" />
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link href={`/dashboard/${user.role}`} onClick={() => setIsOpen(false)}>
                    <Button className="w-full rounded-xl">Dashboard</Button>
                  </Link>
                  <Button variant="outline" onClick={() => { logout(); setIsOpen(false); }} className="w-full rounded-xl">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl">Sign In</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground rounded-xl">Get Started Free</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
