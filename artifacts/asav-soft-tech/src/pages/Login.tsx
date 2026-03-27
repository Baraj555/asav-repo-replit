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
import { ArrowLeft } from "lucide-react";

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
      name: `Demo ${role}`,
      email: `${role}@asav.com`,
      role: role
    }, "dummy_token");
    toast({ title: `Logged in as Demo ${role}` });
    setLocation(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-muted-foreground hover:text-white flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold font-display mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your ASAV Soft Tech account</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input 
                {...form.register("email")} 
                className="h-12 bg-card border-border focus-visible:ring-primary" 
                placeholder="you@example.com" 
              />
              {form.formState.errors.email && <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input 
                type="password" 
                {...form.register("password")} 
                className="h-12 bg-card border-border focus-visible:ring-primary" 
                placeholder="••••••••" 
              />
              {form.formState.errors.password && <p className="text-destructive text-xs mt-1">{form.formState.errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-md font-semibold box-glow"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account? <Link href="/register" className="text-primary hover:underline">Register here</Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground mb-4 uppercase tracking-wider">Demo Accounts</p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('student')}>Student</Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('trainer')}>Trainer</Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin')}>Admin</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 relative bg-card overflow-hidden">
        <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="Decor" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
          <div className="glass-panel p-10 rounded-2xl max-w-md">
            <div className="w-16 h-16 mx-auto bg-primary rounded-xl mb-6 box-glow flex items-center justify-center overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}logo.jpeg`} className="w-full h-full object-cover" alt="ASAV"/>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mb-4">Empower Your Career</h2>
            <p className="text-muted-foreground">Join thousands of students who have transformed their careers with our industry-leading IT training programs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
