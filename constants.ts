import { Experience, Project, SkillCategory, Achievement, Certification, Education } from './types';

export const RESUME_DATA = {
  personal: {
    name: "Satnam Singh",
    email: "sohalsatnam792@gmail.com",
    phone: "+1-548-255-3223",
    location: "Mississauga, Ontario, Canada",
    role: "Software Engineer | Data Analytics & Security",
    summary: "Software Engineer with 3+ years of experience building and supporting enterprise applications, now bringing that technical foundation into data analytics studies at Sheridan College. Experienced in Python, SQL, production troubleshooting, and working through complex technical problems. Particularly interested in using data to uncover patterns, understand business challenges, and turn findings into practical insights. Through Sheridan Datathon 2026, applied data preparation, statistical modelling, machine learning, and visualization to a financial-resilience platform analysing 4,500 accounts. Seeking a Data Analytics Co-op where technical experience, curiosity, and a collaborative approach can contribute to data-informed decisions.",
    links: {
      linkedin: "https://www.linkedin.com/in/satnams/",
      github: "https://github.com/ProbotisOP",
      resumePdf: "Satnam_ResumeCO-OP.pdf"
    }
  },
  experience: [
    {
      company: "Hughes Systique Corporation (HSC) — Adobe Client",
      role: "Engineer | AEM Screens Engineering",
      period: "June 2022 – April 2026",
      command: "ps -aux | grep aem-screens",
      highlights: [
        "Worked on Adobe's AEM Screens platform as part of the client engineering team, contributing to development, release, reliability, security, and production support across 5+ enterprise customers and 1,000+ active production devices.",
        "Led cross-platform delivery of AEM Screens Player across Tizen, Windows, ChromeOS, and Android, owning feature delivery, release validation, production issue resolution, and customer deployments.",
        "Delivered Android and Windows player builds for SG Pools and WMATA, supporting contracts valued at $3M+ while achieving 100% of committed delivery milestones.",
        "Owned production incidents from detection through root-cause analysis, remediation, validation, and hotfix release, coordinating with engineering and customer teams within SLA windows.",
        "Built an AI-driven agentic workflow integrated with MCP servers to automate Jira security-ticket generation, reducing vulnerability triage time from 2–3 days to under 10 minutes, a 95%+ reduction.",
        "Resolved high-frequency blank-screen failures and stability issues, reducing incident reports by 40% and enabling 2x device scaling for existing customers.",
        "Implemented shared modules and automated testing across multiple player platforms, reducing platform-specific defects by 30%.",
        "Designed and maintained Jenkins and Docker CI/CD pipelines for AEM-based builds, increasing release frequency from weekly releases to multiple deployments per week.",
        "Identified and remediated security vulnerabilities across AEM on-premises and AEM as a Cloud Service environments, supporting client security audits and improving deployment security.",
        "Partnered with Adobe engineering groups, product managers, and customer IT teams to troubleshoot production issues, validate deployments, and drive releases to completion.",
        "Performed end-to-end QA and release validation, identifying critical defects and security vulnerabilities before production."
      ]
    },
    {
      company: "Genpact",
      role: "Senior Associate",
      period: "November 2021 – June 2022",
      command: "history | grep genpact",
      highlights: [
        "Developed 3+ production-ready Spring Boot and microservices applications within the first 3 months of onboarding.",
        "Built RESTful microservices supporting 10K+ monthly API requests within a distributed enterprise system.",
        "Collaborated with a 6-member Agile team on API design, unit testing, defect resolution, and sprint delivery.",
        "Contributed to AWS and CI/CD workflows for automated build and deployment processes, improving build and deployment consistency across development environments.",
        "Participated in code reviews, debugging, integration testing, and production support activities while working within Agile sprint cycles."
      ]
    }
  ] as Experience[],
  projects: [
    {
      name: "Sheridan Datathon 2026 – Resilience Rewired",
      description: "Financial resilience and analytics platform analysing 4,500 customer accounts. Engineered predictive machine learning models, interactive dashboards, and financial stress simulations with 0.977 ROC-AUC.",
      tech: ["Python", "SQL", "Snowflake", "XGBoost", "Streamlit", "Pandas", "NumPy"],
      metric: "0.977 ROC-AUC | 4,500 Customer Accounts",
      github: "https://github.com/ProbotisOP"
    },
    {
      name: "AI Agentic Security Triage Workflow",
      description: "AI-driven autonomous agentic workflow integrated with MCP servers to automate Jira security-ticket generation and triage for enterprise environments.",
      tech: ["Python", "MCP", "AI Agents", "Docker", "Jira API"],
      metric: "95%+ reduction in triage time (2-3 days to <10 mins)",
      github: "https://github.com/ProbotisOP"
    },
    {
      name: "AEM Screens Cross-Platform Engine",
      description: "Enterprise digital signage client player deployed across 1,000+ active devices for tier-1 enterprise clients (SG Pools & WMATA), cutting platform defects by 30%.",
      tech: ["Java", "Android", "Windows", "ChromeOS", "Tizen", "Jenkins", "Docker"],
      metric: "$3M+ Enterprise Contracts Supported",
      github: "https://github.com/ProbotisOP"
    }
  ] as Project[],
  skills: [
    {
      category: "Data & Analytics",
      items: ["Data Analytics", "Data Visualization", "SQL", "Power Query", "Snowflake", "Pandas", "NumPy", "XGBoost", "Streamlit"]
    },
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript", "SQL", "React", "Node.js"]
    },
    {
      category: "Backend & Frameworks",
      items: ["Spring Boot", "REST APIs", "Microservices"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS (EC2, S3, Lambda)", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Linux"]
    },
    {
      category: "Security & Testing",
      items: ["Burp Suite", "OWASP ZAP", "Metasploit", "Nessus", "Ghidra", "Automated Testing", "Vulnerability Management"]
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB"]
    }
  ] as SkillCategory[],
  security: {
    hallOfFame: [
      "Cisco Vulnerability Disclosure Program",
      "Lacework Vulnerability Disclosure Program",
      "5+ E-Commerce Platforms Responsible Disclosure"
    ],
    achievements: [
      {
        title: "Critical Payment Bypass Vulnerability Disclosure",
        description: "Awarded Letter of Appreciation from CaratLane (a Tanishq Partnership) for identifying and responsibly disclosing a critical payment bypass vulnerability."
      },
      {
        title: "Sheridan Datathon 2026 Winner / Competitor",
        description: "Built financial analytics platform analysing 4,500 customer accounts with an XGBoost predictive model achieving 0.977 ROC-AUC."
      },
      {
        title: "Published Author",
        description: "Published 'Approach to Real World Hacking' (2020), a practical guide covering fundamental cyberattacks and penetration testing."
      },
      {
        title: "Technical Competitions Medalist",
        description: "College-level medalist in technical competitions, including first-place finishes in C programming, coding challenges, and design contests."
      },
      {
        title: "Athletics & Leadership",
        description: "Inter-school basketball champion, demonstrating teamwork, discipline, and leadership."
      }
    ] as Achievement[],
    certifications: [
      {
        name: "CompTIA Security+ CE Certification",
        issuer: "CompTIA"
      },
      {
        name: "Cyber Attack Countermeasures",
        issuer: "New York University (NYU)"
      }
    ] as Certification[]
  },
  education: [
    {
      degree: "Applied Data Analytics and Visualization",
      school: "Sheridan College, Mississauga, Ontario, Canada",
      year: "2026 – Present",
      gpa: "In Progress",
      details: "Sheridan Datathon 2026 – Resilience Rewired: Developed a financial analytics platform analysing 4,500 customer accounts using Python, SQL, Snowflake, XGBoost, and Streamlit. Built predictive models, interactive dashboards, and financial stress simulations. Achieved 0.977 ROC-AUC."
    },
    {
      degree: "Bachelor of Computer Applications",
      school: "Sant Baba Bhag Singh University, Jalandhar",
      year: "Sep 2021",
      gpa: "8.7",
      details: "Published 'Approach to Real World Hacking' (2020), a practical guide covering fundamental cyberattacks and penetration testing."
    },
    {
      degree: "High School",
      school: "Jawahar Navodaya Vidyalaya, Hoshiarpur",
      year: "Jul 2018",
      gpa: "8.0",
      details: "Mathematics and Science focus with competitive leadership and athletics."
    }
  ] as Education[]
};
