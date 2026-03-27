import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, Star, Video } from "lucide-react";
import { DEFAULT_COURSES } from "@/lib/constants";

export default function TrainerDashboard() {
  const mockStudents = [
    { name: "Rahul Verma", course: "DevOps Engineer", progress: 85, status: "Excellent" },
    { name: "Anjali Desai", course: "Data Engineer", progress: 45, status: "Good" },
    { name: "Karan Singh", course: "DevOps Engineer", progress: 20, status: "Needs Attention" },
    { name: "Pooja Reddy", course: "Full Stack", progress: 95, status: "Excellent" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display mb-2">Trainer Portal</h1>
        <p className="text-muted-foreground">Manage your classes and monitor student progress.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Students", value: "142", icon: Users, color: "text-blue-500" },
          { title: "Active Batches", value: "3", icon: BookOpen, color: "text-green-500" },
          { title: "Average Rating", value: "4.8/5", icon: Star, color: "text-primary" },
          { title: "Live Sessions", value: "12/wk", icon: Video, color: "text-purple-500" },
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
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold font-display mb-4">Student Performance</h2>
          <div className="glass-panel rounded-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-card/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Student Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map((s, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-medium text-white">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.course}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-1.5 max-w-[100px]">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${s.progress}%` }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{s.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        s.status === 'Excellent' ? 'bg-green-500/20 text-green-400' : 
                        s.status === 'Needs Attention' ? 'bg-destructive/20 text-destructive' : 
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {s.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display mb-4">My Assigned Courses</h2>
          <div className="space-y-4">
            {DEFAULT_COURSES.slice(0,2).map(c => (
              <div key={c.id} className="glass-panel p-4 rounded-xl flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img src={c.thumbnail} className="w-full h-full object-cover" alt="Course" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white line-clamp-1">{c.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{c.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
