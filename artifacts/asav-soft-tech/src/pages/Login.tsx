import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, User, GraduationCap, ShieldCheck, CheckCircle2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { setAuth } = useAuth();
  const { toast } = useToast();
  const loginMutation = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ data }, {
      onSuccess: (res) => {
        setAuth(res.user, res.token);
        toast({ title: "Welcome back!" });
        setLocation(`/dashboard/${res.user.role}`);
      },
      onError: (err) => {
        toast({ 
          title: "Login failed", 
          description: err.response?.data?.message || "Invalid credentials", 
          variant: "destructive" 
        });
      }
    });
  };

  // Demo fallback
  const handleDemoLogin = (role: 'student' | 'trainer' | 'admin') => {
    setAuth({
      id: Math.floor(Math.random() * 1000),
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `${role}@asav.com`,
      role: role
    }, "dummy_token");
    toast({ title: `Logged in as Demo ${role}` });
    setLocation(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative bg-card/30">
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-muted-foreground hover:text-primary flex items-center gap-2 font-medium transition-colors">
            <div className="p-2 bg-card rounded-lg border border-border/50"><ArrowLeft size={16} /></div> Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto mt-12 md:mt-0">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-bold font-display mb-3 text-glow">Welcome Back</h1>
            <p className="text-muted-foreground text-lg">Sign in to your ASAV Soft Tech account</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground ml-1">Email Address</label>
              <Input 
                {...form.register("email")} 
                className="h-14 bg-background border-border/60 focus-visible:ring-primary rounded-xl text-base px-4" 
                placeholder="you@example.com" 
              />
              {form.formState.errors.email && <p className="text-destructive text-xs mt-1 ml-1 font-medium">{form.formState.errors.email.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground ml-1">Password</label>
              <Input 
                type="password" 
                {...form.register("password")} 
                className="h-14 bg-background border-border/60 focus-visible:ring-primary rounded-xl text-base px-4" 
                placeholder="••••••••" 
              />
              {form.formState.errors.password && <p className="text-destructive text-xs mt-1 ml-1 font-medium">{form.formState.errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border/60 bg-background text-primary focus:ring-primary" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold box-glow rounded-xl mt-4"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground font-medium">
            Don't have an account? <Link href="/register" className="text-primary hover:underline font-bold">Register here</Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground mb-6 uppercase tracking-widest font-bold">Quick Access (Demo)</p>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 rounded-xl hover:border-green-500/50 hover:bg-green-500/10 group" onClick={() => handleDemoLogin('student')}>
                <User size={20} className="text-muted-foreground group-hover:text-green-400" />
                <span className="text-xs font-semibold">Student</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/10 group" onClick={() => handleDemoLogin('trainer')}>
                <GraduationCap size={20} className="text-muted-foreground group-hover:text-blue-400" />
                <span className="text-xs font-semibold">Trainer</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex flex-col gap-2 rounded-xl hover:border-red-500/50 hover:bg-red-500/10 group" onClick={() => handleDemoLogin('admin')}>
                <ShieldCheck size={20} className="text-muted-foreground group-hover:text-red-400" />
                <span className="text-xs font-semibold">Admin</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 relative bg-card overflow-hidden items-center justify-center p-12">
        <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="Decor" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-primary/20"></div>
        
        {/* Animated decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] mix-blend-screen animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700 pointer-events-none"></div>

        <div className="relative z-10 glass-panel p-10 rounded-3xl max-w-lg w-full gradient-border shadow-2xl">
          <div className="w-20 h-20 mx-auto bg-card rounded-2xl mb-8 box-glow flex items-center justify-center overflow-hidden border-2 border-primary/30 p-1">
            <img src={`${import.meta.env.BASE_URL}logo.jpeg`} className="w-full h-full object-cover rounded-xl" alt="ASAV"/>
          </div>
          <h2 className="text-3xl font-bold font-display text-white mb-4 text-center">Empower Your Career</h2>
          <p className="text-muted-foreground text-center mb-8 text-lg leading-relaxed">Join thousands of students who have transformed their careers with our industry-leading IT training programs.</p>
          
          <div className="space-y-4">
            {[
              { text: "500+ Students Placed in MNCs" },
              { text: "Premium Certification Programs" },
              { text: "100% Placement Assistance Guarantee" },
              { text: "Real-time Industry Projects" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-background/50 p-3 rounded-xl border border-white/5">
                <div className="p-1 rounded-full bg-primary/20 text-primary">
                  <CheckCircle2 size={18} />
                </div>
                <span className="font-medium text-sm text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
