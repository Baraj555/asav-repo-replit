import { Course } from "@workspace/api-client-react";

export const DEFAULT_COURSES: Course[] = [
  {
    id: 1,
    title: "DevOps Engineer",
    description: "Master CI/CD, Docker, Kubernetes, Jenkins, and AWS. Build scalable and resilient infrastructure with 5 real-time projects.",
    duration: "6 months",
    level: "advanced",
    category: "Cloud & DevOps",
    trainerName: "Rajesh Kumar",
    hasCertification: true,
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    topics: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"]
  },
  {
    id: 2,
    title: "Data Engineer",
    description: "Learn Python, SQL, Apache Spark, Airflow, and Snowflake. Build robust data pipelines for enterprise analytics.",
    duration: "5 months",
    level: "intermediate",
    category: "Data & AI",
    trainerName: "Priya Sharma",
    hasCertification: true,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    topics: ["Python", "SQL", "Spark", "Airflow", "Snowflake"]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    description: "Master React, Node.js, MongoDB, and REST APIs. Build complete web applications from scratch.",
    duration: "4 months",
    level: "beginner",
    category: "Software Development",
    trainerName: "Amit Patel",
    hasCertification: true,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    topics: ["React", "Node.js", "Express", "MongoDB", "TypeScript"]
  },
  {
    id: 4,
    title: "Medical Coding",
    description: "Learn ICD-10, CPT, HCPCS, and Medical terminology. Get ready for a career in healthcare administration.",
    duration: "3 months",
    level: "beginner",
    category: "Healthcare",
    trainerName: "Dr. Sneha Reddy",
    hasCertification: true,
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    topics: ["ICD-10", "CPT", "HCPCS", "Anatomy"]
  },
  {
    id: 5,
    title: "Soft Skills & Communication",
    description: "Enhance your presentation, leadership, and interview skills to secure your dream job.",
    duration: "2 months",
    level: "beginner",
    category: "Career Prep",
    trainerName: "Vikram Singh",
    hasCertification: true,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    topics: ["Public Speaking", "Interview Prep", "Leadership", "Resume Building"]
  }
];
