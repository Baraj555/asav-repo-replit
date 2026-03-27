import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminStats } from "@workspace/api-client-react";
import { Users, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats({ query: { retry: false } });

  const mockChartData = [
    { month: 'Jan', enrollments: 65 },
    { month: 'Feb', enrollments: 85 },
    { month: 'Mar', enrollments: 120 },
    { month: 'Apr', enrollments: 90 },
    { month: 'May', enrollments: 150 },
    { month: 'Jun', enrollments: 200 },
  ];

  const displayStats = stats || {
    totalStudents: 1250,
    totalTrainers: 24,
    totalCourses: 5,
    placedStudents: 480
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display mb-2">Admin Overview</h1>
        <p className="text-muted-foreground">Institute analytics and management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Students", value: displayStats.totalStudents, icon: Users, color: "text-blue-500" },
          { title: "Total Trainers", value: displayStats.totalTrainers, icon: GraduationCap, color: "text-purple-500" },
          { title: "Active Courses", value: displayStats.totalCourses, icon: BookOpen, color: "text-green-500" },
          { title: "Placed Students", value: displayStats.placedStudents, icon: Briefcase, color: "text-primary" },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-bold font-display mb-6">Enrollment Trends</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area type="monotone" dataKey="enrollments" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorEnroll)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-bold font-display mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-xl border border-border/50 hover:border-primary/50 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <h3 className="font-semibold text-white">Add User</h3>
              <p className="text-xs text-muted-foreground mt-1">Register new student/trainer</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border/50 hover:border-primary/50 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                <BookOpen size={20} />
              </div>
              <h3 className="font-semibold text-white">Add Course</h3>
              <p className="text-xs text-muted-foreground mt-1">Create new program</p>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border/50 hover:border-primary/50 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                <Briefcase size={20} />
              </div>
              <h3 className="font-semibold text-white">Placement Drive</h3>
              <p className="text-xs text-muted-foreground mt-1">Schedule interviews</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
