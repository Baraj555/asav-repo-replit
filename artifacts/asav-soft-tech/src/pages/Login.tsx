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
import { ArrowLeft, User, CheckCircle2, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { setAuth } = useAuth();
  const { toast } = useToast();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ data }, {
      onSuccess: (res) => {
        setAuth(res.user, res.token);
        toast({ title: `Welcome back, ${res.user.name}!`, description: "Logged in successfully." });
        setLocation(`/dashboard/${res.user.role}`);
      },
      onError: (err: any) => {
        toast({
          title: "Login failed",
          description: err?.response?.data?.message || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    form.setValue("email", "student@asavsofttech.com");
    form.setValue("password", "student123");
    try {
      await new Promise<void>((resolve, reject) => {
        loginMutation.mutate(
          { data: { email: "student@asavsofttech.com", password: "student123" } },
          {
            onSuccess: (res) => {
              setAuth(res.user, res.token);
              toast({ title: `Welcome, ${res.user.name}!`, description: "Logged in as Demo Student." });
              setLocation(`/dashboard/student`);
              resolve();
            },
            onError: () => {
              toast({ title: "Demo login failed", description: "Please try logging in manually.", variant: "destructive" });
              reject();
            },
          }
        );
      });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left — Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative bg-card/30">
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-muted-foreground hover:text-primary flex items-center gap-2 font-medium transition-colors">
            <div className="p-2 bg-card rounded-lg border border-border/50"><ArrowLeft size={16} /></div>
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto mt-14 md:mt-0">
          <div className="mb-10 text-center md:text-left">
            <div className="w-14 h-14 rounded-full border-2 border-primary/40 p-1 bg-card/60 mb-5 flex items-center justify-center overflow-hidden mx-auto md:mx-0">
              <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <h1 className="text-4xl font-bold font-display mb-2">Welcome Back</h1>
            <p className="text-muted-foreground text-base">Sign in to your ASAV Soft Tech account</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">Email Address</label>
              <Input
                {...form.register("email")}
                type="email"
                autoComplete="email"
                className="h-13 bg-background border-border/60 focus-visible:ring-primary rounded-xl text-base px-4"
                placeholder="admin@asavsofttech.com"
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-xs mt-1 font-medium">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...form.register("password")}
                  className="h-13 bg-background border-border/60 focus-visible:ring-primary rounded-xl text-base px-4 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-destructive text-xs mt-1 font-medium">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded border-border/60 accent-primary" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-primary hover:underline">Forgot password?</a>
            </div>

            <Button
              type="submit"
              className="w-full h-13 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold rounded-xl shadow-lg shadow-primary/20"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</span>
              ) : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-bold">Register here</Link>
          </p>

          {/* Demo Credentials Info */}
          <div className="mt-10 p-5 rounded-2xl border border-border/50 bg-card/30 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Demo Access</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Student Only</span>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 flex items-center gap-3 rounded-xl hover:border-green-500/50 hover:bg-green-500/10 group"
              onClick={handleDemoLogin}
              disabled={demoLoading || loginMutation.isPending}
            >
              {demoLoading ? (
                <span className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <User size={18} className="text-muted-foreground group-hover:text-green-400 transition-colors" />
              )}
              <span className="font-semibold text-sm">Login as Demo Student</span>
            </Button>

            <div className="pt-3 border-t border-border/40 space-y-1.5 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground/70 mb-2">Manual credentials:</p>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground/60">Admin</span>
                <code className="bg-background/60 px-2 py-0.5 rounded text-primary">admin@asavsofttech.com / admin123</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground/60">Trainer</span>
                <code className="bg-background/60 px-2 py-0.5 rounded text-secondary">trainer@asavsofttech.com / trainer123</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground/60">Student</span>
                <code className="bg-background/60 px-2 py-0.5 rounded text-green-400">student@asavsofttech.com / student123</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Visual Panel */}
      <div className="hidden md:flex w-1/2 relative bg-card overflow-hidden items-center justify-center p-12">
        <img
          src={`${import.meta.env.BASE_URL}images/about-hero.png`}
          alt="Training"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/60 to-primary/10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[80px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none" />

        <div className="relative z-10 glass-panel p-10 rounded-3xl max-w-lg w-full shadow-2xl border border-border/40">
          <div className="w-20 h-20 mx-auto bg-card rounded-full mb-6 flex items-center justify-center overflow-hidden border-2 border-primary/40 p-1">
            <img src={`${import.meta.env.BASE_URL}logo.jpeg`} className="w-full h-full object-cover rounded-full" alt="ASAV" />
          </div>
          <h2 className="text-3xl font-bold font-display text-white mb-3 text-center">Empower Your Career With Us</h2>
          <p className="text-muted-foreground text-center mb-8 leading-relaxed">
            Join thousands of students who have transformed their careers with our industry-leading IT training.
          </p>
          <div className="space-y-3">
            {[
              "500+ Students Placed in MNCs",
              "Premium Certification Programs",
              "100% Placement Assistance Guarantee",
              "Real-time Industry Projects",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-background/50 p-3 rounded-xl border border-white/5">
                <CheckCircle2 size={18} className="text-primary shrink-0" />
                <span className="font-medium text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
