import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetEnrollments } from "@workspace/api-client-react";
import { BookOpen, Award, TrendingUp, Calendar } from "lucide-react";
import { Link } from "wouter";
import { DEFAULT_COURSES } from "@/lib/constants";

export default function StudentDashboard() {
  const { data: enrollments, isLoading } = useGetEnrollments({ query: { retry: false } });

  // Mock data if api fails/empty
  const mockEnrollments = [
    { id: 1, userId: 1, courseId: 1, course: DEFAULT_COURSES[0], progress: 65, status: 'active', enrolledAt: '2023-10-01' },
    { id: 2, userId: 1, courseId: 5, course: DEFAULT_COURSES[4], progress: 20, status: 'active', enrolledAt: '2023-10-15' }
  ];

  const activeEnrollments = (enrollments && enrollments.length > 0) ? enrollments : mockEnrollments;
  
  if (isLoading) return <DashboardLayout><div className="animate-pulse flex gap-4"><div className="w-full h-32 bg-card rounded-xl"></div></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">Track your progress and continue learning.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Active Courses", value: activeEnrollments.length, icon: BookOpen, color: "text-blue-500" },
          { title: "Completed", value: "0", icon: Award, color: "text-green-500" },
          { title: "Overall Progress", value: "42%", icon: TrendingUp, color: "text-primary" },
          { title: "Upcoming Classes", value: "2 Today", icon: Calendar, color: "text-purple-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground font-display">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrollments List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold font-display flex items-center gap-2">
            <BookOpen className="text-primary" size={20}/> My Enrollments
          </h2>
          
          {activeEnrollments.map((enr) => (
            <div key={enr.id} className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                <img src={enr.course?.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400"} alt="Course" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{enr.course?.title || "Course Name"}</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-primary/20 text-primary rounded-full uppercase">
                    {enr.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{enr.course?.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-bold text-primary">{enr.progress}%</span>
                  </div>
                  <Progress value={enr.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}

          {activeEnrollments.length === 0 && (
            <div className="text-center py-12 glass-panel rounded-2xl">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
              <Link href="/courses" className="text-primary hover:underline">Explore Courses</Link>
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-2 border-primary pl-4 py-1">
                <p className="text-sm font-medium">Mock Interviews Scheduled</p>
                <p className="text-xs text-muted-foreground mt-1">Tomorrow, 10:00 AM</p>
              </div>
              <div className="border-l-2 border-secondary pl-4 py-1">
                <p className="text-sm font-medium">New AWS Project Added</p>
                <p className="text-xs text-muted-foreground mt-1">Check DevOps module</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><Award size={100} /></div>
            <CardHeader>
              <CardTitle className="text-lg text-primary text-glow">Get Certified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Complete your courses to 100% to generate your verified certificate.</p>
              <Link href="/certificates" className="text-sm font-medium hover:underline text-white">View Certificates &rarr;</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
