import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegister } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone is required"),
  role: z.enum(["student", "trainer"]).default("student")
});

export default function Register() {
  const [, setLocation] = useLocation();
  const { setAuth } = useAuth();
  const { toast } = useToast();
  const registerMutation = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", phone: "", role: "student" },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    registerMutation.mutate({ data }, {
      onSuccess: (res) => {
        setAuth(res.user, res.token);
        toast({ title: "Registration successful!" });
        setLocation(`/dashboard/${res.user.role}`);
      },
      onError: (err) => {
        toast({ 
          title: "Registration failed", 
          description: err.response?.data?.message || "Something went wrong", 
          variant: "destructive" 
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="hidden md:block w-1/2 relative bg-card overflow-hidden border-r border-white/5">
        <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="Decor" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-l from-background to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
          <div className="glass-panel p-10 rounded-2xl max-w-md">
            <h2 className="text-3xl font-bold font-display text-white mb-4">Start Your Journey</h2>
            <p className="text-muted-foreground leading-relaxed">
              Create an account to browse courses, enroll in programs, and access world-class IT training materials.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="absolute top-8 right-8">
          <Link href="/" className="text-muted-foreground hover:text-white flex items-center gap-2">
            Home <ArrowLeft className="rotate-180" size={16} />
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold font-display mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join ASAV Soft Tech today</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <Input {...form.register("name")} className="h-12 bg-card border-border" placeholder="John Doe" />
              {form.formState.errors.name && <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input {...form.register("email")} type="email" className="h-12 bg-card border-border" placeholder="john@example.com" />
              {form.formState.errors.email && <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <Input {...form.register("phone")} className="h-12 bg-card border-border" placeholder="+91 9876543210" />
              {form.formState.errors.phone && <p className="text-destructive text-xs mt-1">{form.formState.errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input type="password" {...form.register("password")} className="h-12 bg-card border-border" placeholder="••••••••" />
              {form.formState.errors.password && <p className="text-destructive text-xs mt-1">{form.formState.errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">I am a...</label>
              <Select onValueChange={(val) => form.setValue("role", val as "student"|"trainer")} defaultValue="student">
                <SelectTrigger className="h-12 bg-card border-border">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="trainer">Trainer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-md font-semibold box-glow mt-2"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
