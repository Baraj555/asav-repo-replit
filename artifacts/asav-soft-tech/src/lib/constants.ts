import { Course } from "@workspace/api-client-react";

const base = import.meta.env.BASE_URL;

export const DEFAULT_COURSES: Course[] = [
  {
    id: 1,
    title: "DevOps Engineer",
    description: "Master CI/CD, Docker, Kubernetes, Jenkins, and AWS. Build scalable and resilient infrastructure with 5 real-time projects. Land roles at top tech companies with our industry-first curriculum.",
    duration: "6 months",
    level: "advanced",
    category: "Cloud & DevOps",
    trainerName: "Rajesh Kumar",
    hasCertification: true,
    thumbnail: `${base}images/course-devops.png`,
    topics: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform", "Linux", "GitHub Actions"]
  },
  {
    id: 2,
    title: "Data Engineer",
    description: "Learn Python, SQL, Apache Spark, Airflow, and Snowflake. Build robust data pipelines for enterprise analytics. Work on real datasets from Fortune 500 companies.",
    duration: "5 months",
    level: "intermediate",
    category: "Data & AI",
    trainerName: "Priya Sharma",
    hasCertification: true,
    thumbnail: `${base}images/course-data.png`,
    topics: ["Python", "SQL", "Spark", "Airflow", "Snowflake", "dbt", "Kafka"]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    description: "Master React, Node.js, MongoDB, and REST APIs. Build complete web applications from scratch and deploy to AWS. The most in-demand skill set in 2024.",
    duration: "4 months",
    level: "beginner",
    category: "Software Development",
    trainerName: "Amit Patel",
    hasCertification: true,
    thumbnail: `${base}images/course-fullstack.png`,
    topics: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "AWS", "Git"]
  },
  {
    id: 4,
    title: "Medical Coding",
    description: "Learn ICD-10, CPT, HCPCS, and Medical terminology. Get ready for a lucrative career in healthcare revenue cycle management — no prior medical degree required.",
    duration: "3 months",
    level: "beginner",
    category: "Healthcare",
    trainerName: "Dr. Sneha Reddy",
    hasCertification: true,
    thumbnail: `${base}images/course-medical.png`,
    topics: ["ICD-10", "CPT", "HCPCS", "Medical Terminology", "AAPC Prep", "Anatomy"]
  },
  {
    id: 5,
    title: "Soft Skills & Communication",
    description: "Enhance your presentation, leadership, and interview skills. Transform from a technically strong candidate to a complete professional — the secret weapon in every placement.",
    duration: "2 months",
    level: "beginner",
    category: "Career Prep",
    trainerName: "Vikram Singh",
    hasCertification: true,
    thumbnail: `${base}images/student-success.png`,
    topics: ["Public Speaking", "Interview Prep", "Leadership", "Resume Building", "Body Language", "Group Discussion"]
  }
];
