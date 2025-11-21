import { Experience, SkillCategory, Achievement, Certification } from './types';

export const RESUME_DATA = {
  personal: {
    name: "Satnam Singh",
    email: "sohalsatnam792@gmail.com",
    role: "Senior Backend & Security Engineer",
    summary: "Developer with 3+ years of experience in backend development, DevOps, and scalable system design. Specializing in Java, Spring Boot, and Python. Deep expertise in Adobe AEM and Security (Pentesting, Vulnerability Research). Enthusiastic about AI-driven workflows.",
    links: {
      linkedin: "https://www.linkedin.com/in/satnam-singh-sohal/",
      github: "https://github.com/ProbotisOP"
    }
  },
  experience: [
    {
      company: "Adobe (Client Side)",
      role: "Software Developer",
      period: "Jan 2023 – Dec 2025",
      command: "ps -aux | grep adobe",
      highlights: [
        "Led cross-platform delivery of AEM Screens Player for 5+ major customers.",
        "Shipped builds for SG Pools & WMATA, securing deals worth >$3M.",
        "Deployed AI agentic workflow with MCP servers: Reduced security triage from 2-3 days to <10 mins (95% reduction).",
        "Achieved 2x scaling for existing customers & reduced blank screen events.",
        "Engineered functionalities for Tizen, Windows, ChromeOS, and Android."
      ]
    },
    {
      company: "Hughes Systique Corp (HSC)",
      role: "Engineer Java Developer",
      period: "Jun 2022 – Dec 2022",
      command: "cat /var/log/hsc.log",
      highlights: [
        "Architected CRUD APIs using Spring Boot.",
        "Optimized server configs for High Availability (HA) & Fault Tolerance.",
        "Designed CI/CD pipeline reducing deployment times by 60%.",
        "Enhanced UI responsiveness with ReactJS."
      ]
    },
    {
      company: "Genpact",
      role: "Senior Associate",
      period: "Nov 2021 – Jun 2022",
      command: "history | grep genpact",
      highlights: [
        "Developed RESTful microservices for enterprise projects.",
        "Collaborated on API design and testing under agile workflows.",
        "Gained exposure to Cloud platforms and CI/CD pipelines."
      ]
    }
  ] as Experience[],
  skills: [
    {
      category: "Languages",
      items: ["Java", "JavaScript", "Python", "React", "Node.js", "HTML5"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS (S3, EC2, Lambda)", "Docker", "Kubernetes", "Jenkins", "CI/CD"]
    },
    {
      category: "Security Tools",
      items: ["Burp Suite", "OWASP ZAP", "Metasploit", "Nessus", "Ghidra"]
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB"]
    }
  ] as SkillCategory[],
  security: {
    hallOfFame: [
      "Cisco Vulnerability Disclosure Program",
      "Lacework Vulnerability Disclosure Program"
    ],
    achievements: [
      {
        title: "Vulnerability Disclosure",
        description: "Identified critical payment bypass vulnerability at CaratLane (Tanishq Partnership)."
      },
      {
        title: "Published Author",
        description: "Published book: 'Approach to Real World Hacking' (2020)."
      },
      {
        title: "Competitive Coding",
        description: "College-Level Medalist in C programming & coding challenges."
      }
    ] as Achievement[],
    certifications: [
      {
        name: "CompTIA Security+ ce",
        issuer: "CompTIA"
      },
      {
        name: "Cyber Attack Countermeasures",
        issuer: "NYU"
      }
    ] as Certification[]
  },
  education: [
    {
      degree: "Bachelor of Computer Applications",
      school: "Sant Baba Bhag Singh University",
      year: "Sep 2021",
      gpa: "8.7"
    }
  ]
};