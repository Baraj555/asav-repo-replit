import { db } from "@workspace/db";
import { usersTable, coursesTable, enrollmentsTable, certificatesTable, placementsTable, announcementsTable } from "@workspace/db/schema";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "asav_salt_2024").digest("hex");
}

async function seed() {
  console.log("Seeding database...");

  // Create demo users
  const existingAdmin = await db.select().from(usersTable).limit(1);
  if (existingAdmin.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  const [admin] = await db.insert(usersTable).values({
    name: "Admin User",
    email: "admin@asavsofttech.com",
    passwordHash: hashPassword("admin123"),
    role: "admin",
    phone: "+91 9535035171",
  }).returning();

  const [trainer1] = await db.insert(usersTable).values({
    name: "Rajesh Kumar",
    email: "trainer@asavsofttech.com",
    passwordHash: hashPassword("trainer123"),
    role: "trainer",
    phone: "+91 9876543210",
  }).returning();

  const [trainer2] = await db.insert(usersTable).values({
    name: "Priya Sharma",
    email: "priya@asavsofttech.com",
    passwordHash: hashPassword("trainer123"),
    role: "trainer",
    phone: "+91 9876543211",
  }).returning();

  const [student1] = await db.insert(usersTable).values({
    name: "Arjun Patel",
    email: "student@asavsofttech.com",
    passwordHash: hashPassword("student123"),
    role: "student",
    phone: "+91 9123456789",
  }).returning();

  const [student2] = await db.insert(usersTable).values({
    name: "Kavya Reddy",
    email: "kavya@asavsofttech.com",
    passwordHash: hashPassword("student123"),
    role: "student",
    phone: "+91 9123456788",
  }).returning();

  const [student3] = await db.insert(usersTable).values({
    name: "Amit Singh",
    email: "amit@asavsofttech.com",
    passwordHash: hashPassword("student123"),
    role: "student",
    phone: "+91 9123456787",
  }).returning();

  console.log("Users created");

  // Create courses
  const [devops] = await db.insert(coursesTable).values({
    title: "DevOps Engineer",
    description: "Master the art of DevOps with industry-leading tools and practices. Learn CI/CD pipelines, containerization, orchestration, and cloud infrastructure automation to become a highly sought-after DevOps professional.",
    duration: "6 Months",
    level: "advanced",
    category: "DevOps",
    trainerName: "Rajesh Kumar",
    trainerBio: "10+ years experience in DevOps and Cloud Architecture. Certified AWS Solutions Architect and Kubernetes Administrator. Has deployed infrastructure for 50+ enterprise clients.",
    realTimeProjects: 5,
    hasCertification: true,
    price: 45000,
    topics: ["Linux Fundamentals", "Git & Version Control", "Docker & Containerization", "Kubernetes Orchestration", "Jenkins CI/CD", "AWS Cloud", "Terraform", "Ansible", "Monitoring with Prometheus & Grafana", "Security Best Practices"],
    prerequisites: ["Basic programming knowledge", "Linux command line basics"],
    enrolledCount: 142,
    rating: 4.8,
    status: "active",
  }).returning();

  const [dataEng] = await db.insert(coursesTable).values({
    title: "Data Engineer",
    description: "Build robust data pipelines and infrastructure. Master Python, SQL, Apache Spark, and modern cloud data tools to transform raw data into business insights at scale.",
    duration: "5 Months",
    level: "intermediate",
    category: "Data",
    trainerName: "Priya Sharma",
    trainerBio: "8+ years in Data Engineering and Analytics. Worked with Fortune 500 companies on big data solutions. Expert in Apache ecosystem and cloud data warehouses.",
    realTimeProjects: 4,
    hasCertification: true,
    price: 40000,
    topics: ["Python for Data Engineering", "SQL & NoSQL Databases", "Apache Spark", "Apache Kafka", "Airflow", "Snowflake", "dbt", "AWS Data Services", "Data Modeling", "ETL/ELT Patterns"],
    prerequisites: ["Basic Python knowledge", "Understanding of databases"],
    enrolledCount: 98,
    rating: 4.7,
    status: "active",
  }).returning();

  const [fullstack] = await db.insert(coursesTable).values({
    title: "Full Stack Developer",
    description: "Become a complete Full Stack Developer proficient in modern web technologies. Build end-to-end web applications with React, Node.js, and cloud deployments.",
    duration: "4 Months",
    level: "beginner",
    category: "Web Development",
    trainerName: "Rajesh Kumar",
    trainerBio: "Full Stack developer with 7+ years experience. Built 100+ production web applications. Passionate about clean code and modern web standards.",
    realTimeProjects: 6,
    hasCertification: true,
    price: 35000,
    topics: ["HTML, CSS & JavaScript", "React.js", "Node.js & Express", "MongoDB", "REST API Design", "Authentication & Security", "Redux State Management", "Deployment on AWS/Vercel", "Performance Optimization"],
    prerequisites: ["No prior coding experience required"],
    enrolledCount: 215,
    rating: 4.9,
    status: "active",
  }).returning();

  const [medCoding] = await db.insert(coursesTable).values({
    title: "Medical Coding",
    description: "Master medical coding systems and healthcare documentation. Gain expertise in ICD-10, CPT, and HCPCS coding to build a rewarding career in healthcare IT.",
    duration: "3 Months",
    level: "beginner",
    category: "Healthcare IT",
    trainerName: "Priya Sharma",
    trainerBio: "Certified Professional Coder (CPC) with 6+ years experience in healthcare IT. Expert in medical terminology and coding compliance.",
    realTimeProjects: 2,
    hasCertification: true,
    price: 25000,
    topics: ["Medical Terminology", "Anatomy & Physiology Basics", "ICD-10-CM Coding", "CPT Coding", "HCPCS Level II", "Coding Guidelines", "Healthcare Compliance", "Medical Billing"],
    prerequisites: ["No prior medical knowledge required"],
    enrolledCount: 87,
    rating: 4.6,
    status: "active",
  }).returning();

  const [softSkills] = await db.insert(coursesTable).values({
    title: "Soft Skills & Communication",
    description: "Develop essential soft skills for professional success. Master communication, leadership, teamwork, and interview skills to stand out in the competitive job market.",
    duration: "2 Months",
    level: "beginner",
    category: "Professional Development",
    trainerName: "Priya Sharma",
    trainerBio: "Corporate trainer and communication expert with 9+ years experience. Has trained 2000+ professionals across top IT companies.",
    realTimeProjects: 0,
    hasCertification: true,
    price: 15000,
    topics: ["Business Communication", "Presentation Skills", "Leadership & Teamwork", "Interview Preparation", "Resume Building", "Email Etiquette", "Public Speaking", "Conflict Resolution"],
    prerequisites: ["Basic English knowledge"],
    enrolledCount: 163,
    rating: 4.7,
    status: "active",
  }).returning();

  console.log("Courses created");

  // Create enrollments
  await db.insert(enrollmentsTable).values([
    { userId: student1.id, courseId: devops.id, progress: 65, status: "active", lastAccessedAt: new Date() },
    { userId: student1.id, courseId: softSkills.id, progress: 100, status: "completed", completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), lastAccessedAt: new Date() },
    { userId: student2.id, courseId: fullstack.id, progress: 40, status: "active", lastAccessedAt: new Date() },
    { userId: student2.id, courseId: dataEng.id, progress: 20, status: "active", lastAccessedAt: new Date() },
    { userId: student3.id, courseId: medCoding.id, progress: 80, status: "active", lastAccessedAt: new Date() },
    { userId: student3.id, courseId: devops.id, progress: 100, status: "completed", completedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), lastAccessedAt: new Date() },
  ]);

  console.log("Enrollments created");

  // Create certificates
  await db.insert(certificatesTable).values([
    { userId: student1.id, courseId: softSkills.id, courseName: "Soft Skills & Communication", studentName: student1.name, certificateNumber: "ASAV-2024-001-SSC", downloadUrl: "/api/certificates/ASAV-2024-001-SSC/download" },
    { userId: student3.id, courseId: devops.id, courseName: "DevOps Engineer", studentName: student3.name, certificateNumber: "ASAV-2024-002-DEV", downloadUrl: "/api/certificates/ASAV-2024-002-DEV/download" },
  ]);

  console.log("Certificates created");

  // Create placements
  await db.insert(placementsTable).values([
    { userId: student3.id, studentName: student3.name, companyName: "TCS", role: "DevOps Engineer", package: "8 LPA", status: "placed", interviewDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { userId: student1.id, studentName: student1.name, companyName: "Infosys", role: "Cloud Engineer", package: "7.5 LPA", status: "offer_received", interviewDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
    { userId: student2.id, studentName: student2.name, companyName: "Wipro", role: "Full Stack Developer", package: "6 LPA", status: "in_progress", interviewDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
  ]);

  console.log("Placements created");

  // Create announcements
  await db.insert(announcementsTable).values([
    { title: "New Batch Starting - DevOps Engineer", content: "A new batch for DevOps Engineer course is starting on 1st April 2026. Register now to secure your seat. Limited seats available!", type: "info", targetRole: "all", createdBy: "Admin" },
    { title: "Holiday Notice - Holi", content: "Classes will be on holiday on March 29th, 2026 for Holi festival. Classes will resume from March 30th.", type: "warning", targetRole: "all", createdBy: "Admin" },
    { title: "Placement Drive - TCS", content: "TCS is conducting a placement drive on April 5th, 2026. All eligible students with 70% completion are invited to participate.", type: "success", targetRole: "student", createdBy: "Admin" },
    { title: "Live Class Schedule Updated", content: "The live class schedule for Full Stack Developer has been updated. Please check your dashboard for the new timings.", type: "info", targetRole: "student", createdBy: "Admin" },
  ]);

  console.log("Announcements created");
  console.log("\n✅ Seeding complete!");
  console.log("\nDemo accounts:");
  console.log("  Admin: admin@asavsofttech.com / admin123");
  console.log("  Trainer: trainer@asavsofttech.com / trainer123");
  console.log("  Student: student@asavsofttech.com / student123");
}

seed().catch(console.error).finally(() => process.exit(0));
