import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, BookOpen, Award, Briefcase, 
  Users, Settings, LogOut, FileText, Bell, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  if (!user) return null;

  const role = user.role;

  const navItems = {
    student: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/student" },
      { icon: BookOpen, label: "My Courses", href: "/courses" },
      { icon: Award, label: "Certificates", href: "/certificates" },
      { icon: Briefcase, label: "Placements", href: "/placements" },
    ],
    trainer: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/trainer" },
      { icon: BookOpen, label: "My Classes", href: "/courses" },
      { icon: Users, label: "Students", href: "#" },
      { icon: FileText, label: "Materials", href: "#" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
      { icon: Users, label: "Students", href: "#" },
      { icon: Users, label: "Trainers", href: "#" },
      { icon: BookOpen, label: "Courses", href: "/courses" },
      { icon: Briefcase, label: "Placements", href: "/placements" },
      { icon: Bell, label: "Announcements", href: "#" },
    ]
  };

  const items = navItems[role] || [];

  const roleColors = {
    admin: "bg-red-500/20 text-red-400 border-red-500/30",
    trainer: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    student: "bg-green-500/20 text-green-400 border-green-500/30"
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 glass-panel border-r border-white/5 md:h-screen md:sticky top-0 z-40 flex flex-col shadow-2xl">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/30 p-0.5 bg-card">
            <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <span className="font-display font-bold text-glow text-xl tracking-tight">ASAV Soft Tech</span>
        </div>
        
        <div className="px-6 py-5 border-y border-border/50 bg-card/20 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold text-base text-foreground truncate">{user.name}</p>
              <div className={`inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-bold uppercase tracking-wider border ${roleColors[role as keyof typeof roleColors]}`}>
                {role}
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active 
                    ? "bg-primary/10 text-primary border-l-2 border-primary box-glow" 
                    : "text-muted-foreground hover:bg-card hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                <Icon size={20} className={active ? "text-primary" : "opacity-70"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto bg-gradient-to-t from-card/80 to-transparent pt-6 pb-4 px-4 border-t border-border/50">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-card hover:text-foreground transition-all">
            <HelpCircle size={20} className="opacity-70" />
            Help & Support
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 rounded-xl font-semibold px-4"
            onClick={logout}
          >
            <LogOut size={20} className="mr-3 opacity-70" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto w-full relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
