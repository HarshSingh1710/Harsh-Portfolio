export const HARSH = {
  name: "Harsh Singh",
  title: "Senior Software Developer",
  email: "harsh171019@gmail.com",
  phone: "+91 73908 31706",
  linkedin: "https://www.linkedin.com/in/harsh-singh-rajput-aa800520b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  github: "https://github.com/HarshSingh1710",
  resumeUrl: "/Resume_harsh.pdf",
  summary:
    "Senior Software Developer with 4+ years of experience designing scalable enterprise applications in Manufacturing Execution Systems (MES), Warehouse Management Systems (WMS), Process Automation, Traceability Systems and AI-powered backend platforms.",
};

export const ROLES = [
  "Senior Software Developer",
  "FastAPI Expert",
  "Python Developer",
  "Microservices Architect",
  "Backend Engineer",
  "AI Engineer",
  "OpenAI Developer",
  "RAG Developer",
  "Manufacturing Software Expert",
];

export const SKILLS = [
  { name: "Python", level: 95, group: "Language", desc: "Core language. Async, typing, performance." },
  { name: "FastAPI", level: 95, group: "Framework", desc: "High-perf async APIs, OpenAPI, DI." },
  { name: "Django", level: 88, group: "Framework", desc: "DRF, ORM, admin, monoliths." },
  { name: "Flask", level: 82, group: "Framework", desc: "Lightweight microservices." },
  { name: "Ms SQL Server", level: 92, group: "Database", desc: "Schema design, indexing, tuning." },
  { name: "MySQL", level: 80, group: "Database", desc: "OLTP, replication." },
  { name: "MongoDB", level: 78, group: "Database", desc: "Document modeling." },
  { name: "Redis", level: 88, group: "Cache", desc: "Caching, pub/sub, queues." },
  { name: "RabbitMQ", level: 85, group: "Queue", desc: "AMQP, workers, retries." },
  { name: "Kafka", level: 80, group: "Stream", desc: "Event streaming pipelines." },
  { name: "Docker", level: 92, group: "DevOps", desc: "Containers, compose, multi-stage." },
  { name: "Kubernetes", level: 78, group: "DevOps", desc: "Deployments, scaling." },
  { name: "AWS", level: 86, group: "Cloud", desc: "EC2, S3, RDS, Lambda, ECS." },
  { name: "GitHub Actions", level: 88, group: "CI/CD", desc: "Pipelines, releases." },
  { name: "Jenkins", level: 78, group: "CI/CD", desc: "Build automation." },
  { name: "OpenAI", level: 90, group: "AI", desc: "GPT, embeddings, tools." },
  { name: "LangChain", level: 85, group: "AI", desc: "Agents, chains, memory." },
  { name: "RAG", level: 88, group: "AI", desc: "Vector search, retrievers." },
  { name: "Microservices", level: 90, group: "Architecture", desc: "Service design, contracts." },
  { name: "REST APIs", level: 95, group: "API", desc: "Design, versioning, docs." },
  { name: "JWT", level: 90, group: "Security", desc: "AuthN/AuthZ." },
  { name: "Swagger", level: 92, group: "API", desc: "OpenAPI specs." },
  { name: "Linux", level: 88, group: "OS", desc: "Shell, systemd, perf." },
  { name: "Git", level: 95, group: "VCS", desc: "Workflows, rebase, hooks." },
];

export const EXPERIENCE = [
  {
    company: "Uno Minda Ltd",
    role: "Senior Software Developer",
    period: "2025 — Present",
    summary: "Leading backend for MES, WMS and AI platforms across manufacturing plants.",
    projects: [
      {
        name: "Manufacturing Execution System",
        overview: "Real-time shop-floor execution platform across production lines.",
        tech: ["FastAPI", "PostgreSQL", "Redis", "RabbitMQ", "Docker"],
        challenges: "Sub-second telemetry ingestion, fault-tolerant workers.",
        achievements: "Reduced downtime by 28% and unified 12 plants on one API.",
      },
      {
        name: "Warehouse Management System",
        overview: "Inventory, picking, and dispatch automation for distribution centers.",
        tech: ["Django", "PostgreSQL", "Celery", "AWS"],
        challenges: "Concurrency on stock movements, audit-grade traceability.",
        achievements: "3x throughput in picking, 99.99% inventory accuracy.",
      },
    ],
  },
  {
    company: "Uno Minda Ltd",
    role: "Software Developer",
    period: "2022 — 2025",
    summary: "Built process automation, interlocking and traceability microservices.",
    projects: [
      {
        name: "Traceability System",
        overview: "End-to-end genealogy of every produced unit.",
        tech: ["FastAPI", "Kafka", "PostgreSQL"],
        challenges: "High-throughput event ingest, partitioning.",
        achievements: "Achieved 100% lot-level traceability for regulated lines.",
      },
      {
        name: "Manufacturing Interlocking",
        overview: "Safety-critical PLC ↔ backend interlock service.",
        tech: ["Python", "MQTT", "Redis"],
        challenges: "Deterministic latency under load.",
        achievements: "reduced safety incidents by 15% with real-time interlocks.",
      },
      {
        name: "Process Automation Platform",
        overview: "Configurable workflow engine for plant processes.",
        tech: ["Django", "RabbitMQ"],
        challenges: "Dynamic process modeling.",
        achievements: "Save 40% of manual intervention in plant operations with automated workflows.",
      },
    ],
  },
];

export const PROJECTS = [
  {
    id: "mes",
    name: "Manufacturing Execution System",
    tag: "Industrial · Real-time",
    blurb: "Unified shop-floor execution across 12 plants with sub-second telemetry.",
    tech: ["FastAPI", "PostgreSQL", "Redis", "RabbitMQ", "Docker"],
    color: "from-[#d4d7dd] to-[#6b7079]",
  },
  {
    id: "wms",
    name: "Warehouse Management System",
    tag: "Logistics · Automation",
    blurb: "Inventory, picking and dispatch automation with audit-grade traceability.",
    tech: ["Django", "PostgreSQL", "Celery", "AWS"],
    color: "from-[#ffffff] to-[#d4d7dd]",
  },
  {
    id: "traceability",
    name: "Traceability System",
    tag: "Compliance · Events",
    blurb: "End-to-end genealogy of every unit for regulated production.",
    tech: ["FastAPI", "Kafka", "PostgreSQL"],
    color: "from-[#6b7079] to-[#ffffff]",
  },
  {
    id: "interlocking",
    name: "Manufacturing Interlocking",
    tag: "Safety · OT/IT",
    blurb: "Deterministic safety interlocks between PLCs and backend.",
    tech: ["Python", "MQTT", "Redis"],
    color: "from-[#d4d7dd] to-[#ffffff]",
  },
  {
    id: "process-automation",
    name: "Process Automation Platform",
    tag: "Workflow · Engine",
    blurb: "Configurable engine to model and run plant processes.",
    tech: ["Django", "RabbitMQ", "PostgreSQL"],
    color: "from-[#ffffff] to-[#6b7079]",
  },
  {
    id: "packaging",
    name: "Packaging Solution",
    tag: "Packaging · Throughput",
    blurb: "Smart packaging orchestration with weight & barcode validation.",
    tech: ["FastAPI", "Redis", "PostgreSQL"],
    color: "from-[#6b7079] to-[#d4d7dd]",
  },
  {
    id: "ai-assistant",
    name: "AI Manufacturing Knowledge Assistant",
    tag: "AI · RAG",
    blurb: "RAG assistant over SOPs, manuals and incident reports.",
    tech: ["OpenAI", "LangChain", "FastAPI", "PGVector"],
    color: "from-[#ffffff] to-[#d4d7dd]",
  },
  {
    id: "api-platform",
    name: "Enterprise API Integration Platform",
    tag: "Integration · Gateway",
    blurb: "Unified gateway across ERP, MES and 3rd-party systems.",
    tech: ["FastAPI", "Kafka", "Docker", "AWS"],
    color: "from-[#d4d7dd] to-[#6b7079]",
  },
];

export const ACHIEVEMENTS = [
  { value: 100, suffix: "+", label: "REST APIs shipped" },
  { value: 4, suffix: "+", label: "Years of experience" },
  { value: 12, suffix: "", label: "Enterprise systems" },
  { value: 99.99, suffix: "%", label: "Inventory accuracy" },
];
