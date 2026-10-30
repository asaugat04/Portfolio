import type { Portfolio } from "../../src/schemas/content";

export const seedContent = {
  about: [
    {
      id: "about",
      section: "about",
      position: 0,
      visible: true,
      data: {
        greeting: "Welcome to my Portfolio Website!",
        name: "Saugat Adhikari",
        role: "Software Engineer",
        description:
          "I'm a Software Engineer with 3+ years of experience turning complex problems into fast, accessible web applications using React, Next.js, and TypeScript. I care as much about clean architecture and performance as I do about the pixels on screen, and I'm equally comfortable across the stack with NestJS, PostgreSQL, and TypeORM, shipping features end to end rather than just the frontend half of them.",
        image: "/images/undraw/undraw_software_engineer_lvl5.svg",
      },
    },
  ],
  projects: [
    {
      id: "projects-1",
      section: "projects",
      position: 0,
      visible: true,
      data: {
        title: "Jobscater",
        subtitle: "Recruitment Platform",
        tags: ["React.js", "Next.js", "TypeScript", "RTK Query", "REST API"],
        highlights: [
          "Built responsive dashboards, authentication flows, and job listing interfaces",
          "Developed CV generation interfaces and AI-assisted recruitment features",
          "Integrated REST APIs with reusable state management patterns",
          "Implemented production ready recruitment workflows across multiple user roles",
        ],
        image: "",
      },
    },
    {
      id: "projects-2",
      section: "projects",
      position: 1,
      visible: true,
      data: {
        title: "HamroRestro",
        subtitle: "Multi-Tenant Restaurant Management System",
        tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
        highlights: [
          "Built key frontend modules for a multi-tenant SaaS supporting isolated subdomains",
          "Developed Order Management, Accounts, and Supplier Management modules",
          "Integrated business workflows for orders, accounting, and inventory",
          "Contributed to a scalable SaaS architecture supporting tenant-based management",
        ],
        image: "",
      },
    },
    {
      id: "projects-3",
      section: "projects",
      position: 2,
      visible: true,
      data: {
        title: "Online Notes Nepal",
        subtitle: "Digital Learning Platform",
        tags: ["Next.js", "React.js", "TypeScript", "NestJS", "MySQL"],
        highlights: [
          "Led frontend development for the public website and administrative CMS",
          "Collaborated on backend development using NestJS and MySQL for CMS functionality",
          "Improved SEO and Core Web Vitals through SSR, metadata automation, and XML sitemaps",
          "Solved large-scale dynamic sitemap and mathematical content rendering challenges",
        ],
        image: "",
      },
    },
    {
      id: "projects-4",
      section: "projects",
      position: 3,
      visible: true,
      data: {
        title: "Vatsalya",
        subtitle: "Healthcare Platform",
        tags: ["Next.js", "React.js", "TypeScript", "CMS"],
        highlights: [
          "Led frontend development for an IVF, IUI, and fertility treatment platform",
          "Built responsive service pages, doctor profiles, and inquiry forms",
          "Implemented CMS-driven content management features",
          "Improved SEO, accessibility, and page performance across the platform",
        ],
        image: "",
      },
    },
    {
      id: "projects-5",
      section: "projects",
      position: 4,
      visible: true,
      data: {
        title: "Kheldrishya CMS",
        subtitle: "Sports News CMS",
        tags: ["React.js", "Next.js", "NestJS", "PostgreSQL", "TypeORM"],
        highlights: [
          "Built a fully customizable CMS with drag-and-drop page sections",
          "Developed the complete frontend while contributing to NestJS/PostgreSQL backend",
          "Implemented reusable content components for non-technical editors",
          "Collaborated on API design and CMS architecture for scalable content management",
        ],
        image: "",
      },
    },
  ],
  certifications: [
    {
      id: "certifications-1",
      section: "certifications",
      position: 0,
      visible: true,
      data: {
        title: "React.js and GitHub",
        description:
          "30-hour workshop on React.js and GitHub, hosted by Mechi Multiple Campus in 2023.",
        image: "/images/certifications/project-image02.jpg",
      },
    },
    {
      id: "certifications-2",
      section: "certifications",
      position: 1,
      visible: true,
      data: {
        title: "Cyber Security",
        description:
          "33-hour workshop on Cyber Security and Ethical Hacking, hosted by Mechi Multiple Campus in 2022.",
        image: "/images/certifications/project-image01.jpeg",
      },
    },
  ],
  experience: [
    {
      id: "experience-1",
      section: "experience",
      position: 0,
      visible: true,
      data: {
        year: "2025",
        title: "Software Engineer",
        organization: "Online Notes Nepal",
        description:
          "Led development of the web platform, delivering production-ready features across the public website, student dashboard, and admin CMS with Next.js, React, and TypeScript. Built a customizable CMS with drag-and-drop page management, contributed to backend using NestJS, PostgreSQL/MySQL, and TypeORM, and improved SEO and Core Web Vitals through SSR and metadata automation.",
      },
    },
    {
      id: "experience-2",
      section: "experience",
      position: 1,
      visible: true,
      data: {
        year: "2024",
        title: "Frontend Engineer",
        organization: "Dome Infosys",
        description:
          "Delivered production-ready web applications across recruitment, healthcare, CMS, and SaaS platforms using React, Next.js, and TypeScript. Built responsive, reusable UIs, admin dashboards, and authentication flows, integrating REST APIs and scalable client-side state management for complex business workflows.",
      },
    },
    {
      id: "experience-3",
      section: "experience",
      position: 2,
      visible: true,
      data: {
        year: "2022",
        title: "Frontend Developer and Instructor",
        organization: "Smart Computer",
        description:
          "Modernized the organization's website using React and Tailwind CSS. Prepared lesson plans and delivered interactive coding classes on C, C++, and JavaScript fundamentals, teaching batches of 10–20 students with hands-on sessions.",
      },
    },
    {
      id: "experience-4",
      section: "experience",
      position: 3,
      visible: true,
      data: {
        year: "2022",
        title: "Programming Instructor",
        organization: "Center for Information Technology (CIT)",
        description:
          "Taught C, C++, and JavaScript with emphasis on problem-solving and object-oriented programming. Designed coding exercises, assignments, and projects while evaluating student progress through practical assessments.",
      },
    },
  ],
  education: [
    {
      id: "education-1",
      section: "education",
      position: 0,
      visible: true,
      data: {
        year: "2019",
        title: "Higher Secondary Education (+2 Science)",
        organization: "Laxmi Secondary School",
        lineBreak: false,
      },
    },
    {
      id: "education-2",
      section: "education",
      position: 1,
      visible: true,
      data: {
        year: "2024",
        title:
          "Bachelor of Science in Computer Science and Information Technology (BSc. CSIT)",
        organization: "Mechi Multiple Campus",
        lineBreak: true,
      },
    },
  ],
  skills: [
    {
      id: "skills-1",
      section: "skills",
      position: 0,
      visible: true,
      data: {
        title: "Languages:",
        description: "TypeScript, JavaScript (ES6+), Python, C, C++.",
      },
    },
    {
      id: "skills-2",
      section: "skills",
      position: 1,
      visible: true,
      data: {
        title: "Frontend:",
        description:
          "React, Next.js, React Native, Redux (RTK Query), TanStack Query, Tailwind CSS, HTML5, CSS3, React Hook Form, Zod.",
      },
    },
    {
      id: "skills-3",
      section: "skills",
      position: 2,
      visible: true,
      data: {
        title: "Backend & Database:",
        description: "NestJS, Express.js, Node.js, TypeORM, PostgreSQL.",
      },
    },
    {
      id: "skills-4",
      section: "skills",
      position: 3,
      visible: true,
      data: {
        title: "DevOps / Tools:",
        description: "Docker, Git, Turborepo, Figma.",
      },
    },
  ],
  "social-links": [
    {
      id: "social-links-1",
      section: "social-links",
      position: 0,
      visible: true,
      data: {
        title: "Facebook",
        url: "https://www.facebook.com/asaugat04",
        icon: "facebook",
      },
    },
    {
      id: "social-links-2",
      section: "social-links",
      position: 1,
      visible: true,
      data: {
        title: "Instagram",
        url: "https://www.instagram.com/asaugat04",
        icon: "instagram",
      },
    },
    {
      id: "social-links-3",
      section: "social-links",
      position: 2,
      visible: true,
      data: {
        title: "Github",
        url: "https://www.github.com/asaugat04",
        icon: "github",
      },
    },
    {
      id: "social-links-4",
      section: "social-links",
      position: 3,
      visible: true,
      data: {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/asaugat04/",
        icon: "linkedin",
      },
    },
  ],
  resume: [
    {
      id: "resume",
      section: "resume",
      position: 0,
      visible: true,
      data: {
        url: "/assets/resume.pdf",
        filename: "Saugat resume.pdf",
      },
    },
  ],
  "contact-details": [
    {
      id: "contact-details",
      section: "contact-details",
      position: 0,
      visible: true,
      data: {
        name: "Saugat Adhikari",
        email: "asaugat04@gmail.com",
        phone: "+977-9814057843",
        location: "Kathmandu, Nepal",
        image: "/images/myimage.png",
      },
    },
  ],
} satisfies Portfolio;
