import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetEnrollments } from "@workspace/api-client-react";
import { BookOpen, Award, TrendingUp, Calendar, Clock, ChevronRight, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Link } from "wouter";
import { DEFAULT_COURSES } from "@/lib/constants";
import { useAuth } from "@/lib/auth";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: enrollments, isLoading } = useGetEnrollments({ query: { retry: false } });

  // Mock data if api fails/empty
  const mockEnrollments = [
    { id: 1, userId: 1, courseId: 1, course: DEFAULT_COURSES[0], progress: 65, status: 'active', enrolledAt: '2023-10-01', lastAccessed: '2 hours ago' },
    { id: 2, userId: 1, courseId: 5, course: DEFAULT_COURSES[4], progress: 20, status: 'active', enrolledAt: '2023-10-15', lastAccessed: '1 day ago' }
  ];

  const activeEnrollments = (enrollments && enrollments.length > 0) ? enrollments : mockEnrollments;
  
  if (isLoading) return <DashboardLayout><div className="animate-pulse flex gap-4"><div className="w-full h-32 bg-card rounded-xl"></div></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-display mb-3">Welcome back, <span className="text-primary text-glow">{user?.name}</span>!</h1>
        <p className="text-muted-foreground text-lg">Here's an overview of your learning progress and upcoming activities.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Active Courses", value: activeEnrollments.length, icon: BookOpen, color: "text-blue-400", bgClass: "bg-gradient-to-br from-blue-950/50 to-card", borderClass: "border-t-blue-500" },
          { title: "Completed", value: "0", icon: Award, color: "text-green-400", bgClass: "bg-gradient-to-br from-green-950/50 to-card", borderClass: "border-t-green-500" },
          { title: "Overall Progress", value: "42%", icon: TrendingUp, color: "text-amber-400", bgClass: "bg-gradient-to-br from-amber-950/50 to-card", borderClass: "border-t-amber-500" },
          { title: "Upcoming Classes", value: "2 Today", icon: Calendar, color: "text-purple-400", bgClass: "bg-gradient-to-br from-purple-950/50 to-card", borderClass: "border-t-purple-500" },
        ].map((stat, i) => (
          <Card key={i} className={`border-t-2 border-x-border/50 border-b-border/50 ${stat.borderClass} ${stat.bgClass} shadow-lg relative overflow-hidden group`}>
            <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full bg-current opacity-[0.03] ${stat.color} group-hover:scale-150 transition-transform duration-500`}></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-background/50 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold text-foreground font-display tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrollments List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold font-display flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg text-primary"><BookOpen size={24}/></div>
              My Enrollments
            </h2>
            <Link href="/courses" className="text-sm font-semibold text-primary hover:underline flex items-center">
              Browse More <ChevronRight size={16} />
            </Link>
          </div>
          
          {activeEnrollments.map((enr: any) => (
            <div key={enr.id} className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center card-hover relative overflow-hidden">
              {enr.progress > 0 && enr.progress < 100 && (
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary" style={{ width: `${enr.progress}%` }}></div>
              )}
              
              <div className="w-full sm:w-56 h-36 rounded-xl overflow-hidden shrink-0 relative group">
                <img src={enr.course?.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400"} alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Clock size={14} className="text-primary"/> {enr.lastAccessed || 'Started recently'}
                </div>
              </div>
              
              <div className="flex-1 w-full flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl font-display">{enr.course?.title || "Course Name"}</h3>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-primary/20 text-primary rounded-md uppercase tracking-wider border border-primary/20">
                      {enr.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{enr.course?.description}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm items-end">
                    <span className="font-medium">Progress</span>
                    <span className="font-bold text-primary text-lg">{enr.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-background rounded-full overflow-hidden border border-border/50">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative" 
                      style={{ width: `${enr.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg px-6">
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeEnrollments.length === 0 && (
            <div className="text-center py-16 glass-panel rounded-2xl border-dashed">
              <div className="w-20 h-20 mx-auto bg-card rounded-full flex items-center justify-center mb-6 box-glow">
                <BookOpen className="h-10 w-10 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-xl font-bold font-display mb-2">No Active Enrollments</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">You haven't enrolled in any courses yet. Start your learning journey today by exploring our premium programs.</p>
              <Link href="/courses">
                <Button className="font-semibold rounded-xl px-8 box-glow">Explore Courses</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8 pt-2">
          <Card className="glass-panel border-border/50 shadow-xl">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Bell size={20} className="text-primary"/> Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="border-l-4 border-blue-500 bg-blue-500/5 rounded-r-xl p-4 relative overflow-hidden">
                <Info size={16} className="absolute top-4 right-4 text-blue-500/50" />
                <p className="text-sm font-bold text-foreground">Mock Interviews Scheduled</p>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5"><Clock size={12}/> Tomorrow, 10:00 AM</p>
              </div>
              <div className="border-l-4 border-green-500 bg-green-500/5 rounded-r-xl p-4 relative overflow-hidden">
                <CheckCircle2 size={16} className="absolute top-4 right-4 text-green-500/50" />
                <p className="text-sm font-bold text-foreground">New AWS Project Added</p>
                <p className="text-xs text-muted-foreground mt-1.5">Check DevOps module in your course</p>
              </div>
              <div className="border-l-4 border-amber-500 bg-amber-500/5 rounded-r-xl p-4 relative overflow-hidden">
                <AlertCircle size={16} className="absolute top-4 right-4 text-amber-500/50" />
                <p className="text-sm font-bold text-foreground">Resume Review Deadline</p>
                <p className="text-xs text-muted-foreground mt-1.5">Submit by Friday EOD</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card via-card to-primary/20 border border-primary/30 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-8 -bottom-8 text-primary opacity-[0.15] transform rotate-12 pointer-events-none">
              <Award size={140} />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-display text-primary text-glow flex items-center gap-2">
                <Award size={24}/> Get Certified
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Complete your courses to 100% to generate your industry-recognized verified certificate and boost your resume.</p>
              <Link href="/certificates">
                <Button variant="outline" className="w-full bg-background/50 border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl">
                  View Certificates <ChevronRight size={16} className="ml-1"/>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
