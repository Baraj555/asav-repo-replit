import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, BookOpen, Award, Briefcase, 
  Users, Settings, LogOut, FileText, Bell 
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

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/5 md:h-screen md:sticky top-0 z-40 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-card p-0.5">
            <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo" className="w-full h-full rounded-sm" />
          </div>
          <span className="font-display font-bold text-glow text-lg">ASAV Soft Tech</span>
        </div>
        
        <div className="px-6 py-4 border-b border-border/50 mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Logged in as</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">{user.name}</p>
              <p className="text-xs text-secondary capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                  active 
                    ? "bg-primary/10 text-primary box-glow" 
                    : "text-muted-foreground hover:bg-card hover:text-white"
                }`}
              >
                <Icon size={18} className={active ? "text-primary" : ""} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-border/50">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
