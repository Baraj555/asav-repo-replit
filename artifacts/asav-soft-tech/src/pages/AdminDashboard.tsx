import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAdminStats, useGetCourses } from "@workspace/api-client-react";
import {
  Users, BookOpen, Briefcase, GraduationCap, TrendingUp, Bell,
  Search, Plus, Edit2, Trash2, Eye, CheckCircle, XCircle, RefreshCw,
  Award, BarChart2, Settings, ChevronRight, AlertCircle
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";

type Tab = "overview" | "students" | "courses" | "announcements" | "placements";

const MOCK_STUDENTS = [
  { id: 1, name: "Arjun Patel", email: "arjun@example.com", course: "DevOps Engineer", progress: 72, status: "active", joined: "Oct 2023" },
  { id: 2, name: "Kavya Reddy", email: "kavya@example.com", course: "Data Engineer", progress: 55, status: "active", joined: "Nov 2023" },
  { id: 3, name: "Ravi Kumar", email: "ravi@example.com", course: "Full Stack Developer", progress: 90, status: "completed", joined: "Sep 2023" },
  { id: 4, name: "Sneha Singh", email: "sneha@example.com", course: "Medical Coding", progress: 40, status: "active", joined: "Dec 2023" },
  { id: 5, name: "Amit Verma", email: "amit@example.com", course: "Soft Skills", progress: 100, status: "completed", joined: "Aug 2023" },
  { id: 6, name: "Priya Nair", email: "priya@example.com", course: "DevOps Engineer", progress: 30, status: "active", joined: "Jan 2024" },
];

const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: "New Batch Starting — DevOps Engineer", content: "The next DevOps batch starts on Feb 1st, 2024. Enroll now to secure your seat.", date: "Jan 15, 2024", urgent: true },
  { id: 2, title: "Placement Drive at TCS — Jan 25th", content: "TCS is conducting a placement drive for DevOps and Full Stack graduates. Prepare your resumes.", date: "Jan 12, 2024", urgent: true },
  { id: 3, title: "Holiday Notice — Republic Day", content: "The institute will remain closed on January 26th for Republic Day. Classes resume Jan 27th.", date: "Jan 10, 2024", urgent: false },
  { id: 4, title: "Mock Interview Sessions Open", content: "Book your free mock interview slot for January. Limited seats available.", date: "Jan 8, 2024", urgent: false },
];

const PIE_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#f43f5e"];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [studentSearch, setStudentSearch] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", urgent: false });
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useGetAdminStats({ query: { retry: false } });
  const { data: courses } = useGetCourses(undefined, { query: { retry: false } });

  const displayStats = {
    totalStudents: stats?.totalStudents ?? 0,
    totalTrainers: stats?.totalTrainers ?? 0,
    totalCourses: stats?.totalCourses ?? 0,
    totalEnrollments: stats?.totalEnrollments ?? 0,
    placedStudents: stats?.placedStudents ?? 0,
    completedCourses: stats?.completedCourses ?? 0,
  };

  const chartData = stats?.monthlyEnrollments ?? [
    { month: "Jan", count: 20 }, { month: "Feb", count: 35 }, { month: "Mar", count: 28 },
    { month: "Apr", count: 45 }, { month: "May", count: 60 }, { month: "Jun", count: 52 }, { month: "Jul", count: 75 },
  ];

  const coursePieData = [
    { name: "DevOps", value: 35 }, { name: "Data Eng", value: 25 },
    { name: "Full Stack", value: 20 }, { name: "Medical", value: 12 }, { name: "Soft Skills", value: 8 },
  ];

  const filteredStudents = MOCK_STUDENTS.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.course.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const addAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    setAnnouncements(prev => [{
      id: prev.length + 1,
      ...newAnnouncement,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }, ...prev]);
    setNewAnnouncement({ title: "", content: "", urgent: false });
    setShowAnnouncementForm(false);
  };

  const deleteAnnouncement = (id: number) => setAnnouncements(prev => prev.filter(a => a.id !== id));

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "students", label: "Students", icon: Users },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "placements", label: "Placements", icon: Briefcase },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display mb-1">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, <span className="text-primary font-semibold">{user?.name}</span>. Here's your institute overview.</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-2" onClick={() => refetchStats()}>
          <RefreshCw size={15} /> Refresh Data
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── OVERVIEW TAB ─── */}
      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Total Students", value: statsLoading ? "…" : displayStats.totalStudents, icon: Users, color: "text-blue-400", border: "border-t-blue-500", bg: "from-blue-950/40" },
              { title: "Total Trainers", value: statsLoading ? "…" : displayStats.totalTrainers, icon: GraduationCap, color: "text-purple-400", border: "border-t-purple-500", bg: "from-purple-950/40" },
              { title: "Active Courses", value: statsLoading ? "…" : displayStats.totalCourses, icon: BookOpen, color: "text-green-400", border: "border-t-green-500", bg: "from-green-950/40" },
              { title: "Students Placed", value: statsLoading ? "…" : displayStats.placedStudents, icon: Briefcase, color: "text-primary", border: "border-t-primary", bg: "from-amber-950/40" },
            ].map((stat, i) => (
              <Card key={i} className={`border-t-2 border-x-border/40 border-b-border/40 ${stat.border} bg-gradient-to-br ${stat.bg} to-card shadow-md`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold font-display">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
              <h2 className="text-lg font-bold font-display mb-6 flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" /> Monthly Enrollments
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "10px" }} itemStyle={{ color: "hsl(var(--primary))" }} />
                    <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#grad1)" dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-lg font-bold font-display mb-6 flex items-center gap-2">
                <BookOpen size={18} className="text-secondary" /> Course Distribution
              </h2>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={coursePieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {coursePieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "10px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5">
                {coursePieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-bold font-display mb-5 flex items-center gap-2">
              <Settings size={18} className="text-primary" /> Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Users, label: "Manage Students", sub: "View & update records", onClick: () => setActiveTab("students"), color: "text-blue-400" },
                { icon: BookOpen, label: "Manage Courses", sub: "Add/edit programs", onClick: () => setActiveTab("courses"), color: "text-green-400" },
                { icon: Bell, label: "Announcements", sub: "Post notices", onClick: () => setActiveTab("announcements"), color: "text-amber-400" },
                { icon: Briefcase, label: "Placements", sub: "Track job placements", onClick: () => setActiveTab("placements"), color: "text-purple-400" },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className="p-5 rounded-xl border border-border/50 hover:border-primary/40 bg-card/40 hover:bg-card transition-all group text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-card border border-border/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <action.icon size={20} className={action.color} />
                  </div>
                  <p className="font-semibold text-sm text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{action.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Announcements preview */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Bell size={18} className="text-primary" /> Recent Announcements
              </h2>
              <Button size="sm" variant="ghost" className="text-primary text-xs rounded-xl" onClick={() => setActiveTab("announcements")}>
                View All <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {MOCK_ANNOUNCEMENTS.slice(0, 3).map(a => (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl border border-border/40 bg-card/30">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${a.urgent ? "bg-red-400" : "bg-green-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                  </div>
                  {a.urgent && <span className="text-xs bg-red-500/15 text-red-400 px-2 py-0.5 rounded-full font-semibold shrink-0">Urgent</span>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── STUDENTS TAB ─── */}
      {activeTab === "students" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl font-bold font-display">Student Management</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="pl-9 h-10 rounded-xl w-56 bg-card border-border/50"
                />
              </div>
              <Button size="sm" className="rounded-xl bg-primary text-primary-foreground h-10 px-4 gap-2">
                <Plus size={15} /> Add Student
              </Button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Student</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4 hidden md:table-cell">Course</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4 hidden lg:table-cell">Progress</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-card/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {student.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{student.course}</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-border/50 rounded-full overflow-hidden w-24">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-foreground w-10">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          student.status === "completed"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-blue-500/15 text-blue-400"
                        }`}>
                          {student.status === "completed" ? <CheckCircle size={11} /> : <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-secondary/10 text-secondary">
                            <Eye size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 text-primary">
                            <Edit2 size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-red-500/10 text-red-400">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredStudents.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Users size={40} className="mx-auto mb-3 opacity-20" />
                <p className="font-medium">No students found</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Enrolled", value: filteredStudents.length, color: "text-blue-400" },
              { label: "Active", value: filteredStudents.filter(s => s.status === "active").length, color: "text-primary" },
              { label: "Completed", value: filteredStudents.filter(s => s.status === "completed").length, color: "text-green-400" },
            ].map((s, i) => (
              <div key={i} className="glass-panel p-4 rounded-xl text-center">
                <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── COURSES TAB ─── */}
      {activeTab === "courses" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold font-display">Course Management</h2>
            <Button size="sm" className="rounded-xl bg-primary text-primary-foreground h-10 px-4 gap-2">
              <Plus size={15} /> Add New Course
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(courses ?? []).map((course, i) => {
              const levelColors: Record<string, string> = {
                beginner: "bg-green-500/15 text-green-400",
                intermediate: "bg-blue-500/15 text-blue-400",
                advanced: "bg-orange-500/15 text-orange-400",
              };
              return (
                <div key={course.id} className="glass-panel p-5 rounded-2xl border border-border/40 hover:border-primary/30 transition-all group">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColors[course.level] ?? "bg-muted text-muted-foreground"}`}>
                          {course.level}
                        </span>
                        <span className="text-xs text-secondary font-semibold">{course.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{course.title}</h3>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 text-primary">
                        <Edit2 size={14} />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-red-500/10 text-red-400">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-3">
                    <span>👨‍🏫 {course.trainerName}</span>
                    <span>⏱ {course.duration}</span>
                    {course.hasCertification && <span className="text-green-400 font-medium flex items-center gap-1"><Award size={11} /> Certified</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {(!courses || courses.length === 0) && (
            <div className="glass-panel rounded-2xl p-16 text-center text-muted-foreground">
              <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
              <p className="font-semibold text-lg mb-2">No courses yet</p>
              <p className="text-sm mb-6">Add your first course to get started.</p>
              <Button className="rounded-xl bg-primary text-primary-foreground gap-2"><Plus size={15} /> Add Course</Button>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── ANNOUNCEMENTS TAB ─── */}
      {activeTab === "announcements" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold font-display">Announcements</h2>
            <Button size="sm" className="rounded-xl bg-primary text-primary-foreground h-10 px-4 gap-2" onClick={() => setShowAnnouncementForm(!showAnnouncementForm)}>
              <Plus size={15} /> New Announcement
            </Button>
          </div>

          {showAnnouncementForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-2xl border border-primary/30 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2"><Plus size={16} className="text-primary" /> Create Announcement</h3>
              <Input
                placeholder="Announcement title..."
                value={newAnnouncement.title}
                onChange={e => setNewAnnouncement(p => ({ ...p, title: e.target.value }))}
                className="rounded-xl bg-background/80 border-border/60 focus-visible:ring-primary"
              />
              <textarea
                rows={3}
                placeholder="Write your announcement content here..."
                value={newAnnouncement.content}
                onChange={e => setNewAnnouncement(p => ({ ...p, content: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-background/80 border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground placeholder:text-muted-foreground/50 resize-none"
              />
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={newAnnouncement.urgent} onChange={e => setNewAnnouncement(p => ({ ...p, urgent: e.target.checked }))} className="w-4 h-4 accent-red-500" />
                  <span className="text-sm text-muted-foreground">Mark as Urgent</span>
                </label>
                <div className="flex gap-3 ml-auto">
                  <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setShowAnnouncementForm(false)}>Cancel</Button>
                  <Button size="sm" className="rounded-xl bg-primary text-primary-foreground" onClick={addAnnouncement}>Post Announcement</Button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            {announcements.map(a => (
              <div key={a.id} className={`glass-panel p-5 rounded-2xl border transition-all ${a.urgent ? "border-red-500/30" : "border-border/40"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${a.urgent ? "bg-red-500/15 text-red-400" : "bg-primary/15 text-primary"}`}>
                      {a.urgent ? <AlertCircle size={18} /> : <Bell size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-bold text-foreground">{a.title}</h4>
                        {a.urgent && <span className="text-xs bg-red-500/15 text-red-400 px-2 py-0.5 rounded-full font-semibold">Urgent</span>}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">{a.content}</p>
                      <p className="text-xs text-muted-foreground/60">{a.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 text-primary">
                      <Edit2 size={14} />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-red-500/10 text-red-400" onClick={() => deleteAnnouncement(a.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── PLACEMENTS TAB ─── */}
      {activeTab === "placements" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold font-display">Placement Tracking</h2>
            <Button size="sm" className="rounded-xl bg-primary text-primary-foreground h-10 px-4 gap-2">
              <Plus size={15} /> Add Placement
            </Button>
          </div>

          {/* Placement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Total Placed", value: "500+", color: "text-primary", icon: Briefcase },
              { label: "Active Drives", value: "3", color: "text-green-400", icon: TrendingUp },
              { label: "Avg Package", value: "7.8 LPA", color: "text-secondary", icon: Award },
              { label: "Companies", value: "50+", color: "text-purple-400", icon: GraduationCap },
            ].map((s, i) => (
              <div key={i} className="glass-panel p-5 rounded-xl text-center">
                <s.icon size={22} className={`${s.color} mx-auto mb-2`} />
                <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Placement Chart */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold font-display mb-5">Monthly Placements</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { month: "Jan", placed: 18 }, { month: "Feb", placed: 24 }, { month: "Mar", placed: 32 },
                  { month: "Apr", placed: 28 }, { month: "May", placed: 42 }, { month: "Jun", placed: 38 }, { month: "Jul", placed: 55 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "10px" }} />
                  <Bar dataKey="placed" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Placements Table */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border/40">
              <h3 className="font-bold text-lg">Recent Placements</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Student</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Company</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Package</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {[
                    { name: "Arjun Patel", company: "TCS", role: "DevOps Engineer", package: "8 LPA", status: "placed" },
                    { name: "Kavya Reddy", company: "Infosys", role: "Data Analyst", package: "7.5 LPA", status: "placed" },
                    { name: "Ravi Kumar", company: "Accenture", role: "Full Stack Dev", package: "9 LPA", status: "placed" },
                    { name: "Sneha Singh", company: "HCL", role: "Medical Coder", package: "5 LPA", status: "interviewing" },
                    { name: "Priya Nair", company: "Wipro", role: "DevOps Trainee", package: "6 LPA", status: "offer" },
                  ].map((p, i) => (
                    <tr key={i} className="hover:bg-card/30 transition-colors">
                      <td className="px-6 py-3.5">
                        <div>
                          <p className="font-semibold text-sm text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.role}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-sm font-medium text-secondary">{p.company}</span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-sm font-bold text-primary">{p.package}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          p.status === "placed" ? "bg-green-500/15 text-green-400" :
                          p.status === "offer" ? "bg-primary/15 text-primary" :
                          "bg-blue-500/15 text-blue-400"
                        }`}>
                          {p.status === "placed" ? "✓ Placed" : p.status === "offer" ? "Offer Received" : "Interviewing"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
