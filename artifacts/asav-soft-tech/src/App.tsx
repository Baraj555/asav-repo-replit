import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import StudentDashboard from "@/pages/StudentDashboard";
import TrainerDashboard from "@/pages/TrainerDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Certificates from "@/pages/Certificates";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import { AuthProvider, useAuth } from "@/lib/auth";
import Chatbot from "@/components/ui/chatbot";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function ProtectedRoute({ component: Component, roles }: { component: React.ComponentType; roles?: string[] }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (roles && !roles.includes(user.role)) {
    if (user.role === "student") setLocation("/dashboard/student");
    else if (user.role === "trainer") setLocation("/dashboard/trainer");
    else if (user.role === "admin") setLocation("/dashboard/admin");
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/dashboard/student">
        {() => <ProtectedRoute component={StudentDashboard} roles={["student"]} />}
      </Route>
      <Route path="/dashboard/trainer">
        {() => <ProtectedRoute component={TrainerDashboard} roles={["trainer"]} />}
      </Route>
      <Route path="/dashboard/admin">
        {() => <ProtectedRoute component={AdminDashboard} roles={["admin"]} />}
      </Route>
      <Route path="/certificates">
        {() => <ProtectedRoute component={Certificates} roles={["student"]} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
            <Chatbot />
            <Toaster />
          </AuthProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
