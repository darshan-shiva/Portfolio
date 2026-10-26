export const profile = {
  name: 'Darshan S',
  first: 'Darshan',
  last: 'S',
  role: ['AI & Machine Learning', 'Engineer'],
  location: ['Located', 'in', 'Bangalore, India'],
  email: 'darshans31805@gmail.com',
  phone: '+91 9108232080',
  github: 'https://github.com/darshan-shiva',
  linkedin: 'https://www.linkedin.com/in/darshan-s-18577a2a7/',
  instagram: 'https://www.instagram.com/darshan._.shiva/',
  // wa.me expects the international number with no +, spaces or hyphens
  whatsapp: 'https://wa.me/919108232080',
  timezone: 'Asia/Kolkata',
  tzLabel: 'IST',
}

export const resume = { href: '/resume.pdf', filename: 'Darshan_S_Resume.pdf' }

export type SocialKey = 'linkedin' | 'instagram' | 'whatsapp' | 'github' | 'email'
export const socialLinks: { key: SocialKey; label: string; href: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', href: profile.linkedin },
  { key: 'instagram', label: 'Instagram', href: profile.instagram },
  { key: 'whatsapp', label: 'WhatsApp', href: profile.whatsapp },
  { key: 'github', label: 'GitHub', href: profile.github },
  { key: 'email', label: 'Email', href: `mailto:${profile.email}` },
]

export const loaderWords = ['Hello', 'ನಮಸ್ಕಾರ', 'नमस्ते', 'Bonjour', 'Hola', 'Ciao', 'Hello']

export type Project = {
  slug: string
  title: string
  tagline: string
  category: string
  filters: string[]
  eyebrow: string
  stack: string[]
  short: string
  points: string[]
  stat?: { value: string; label: string }
  repo: string
  hue: [string, string]
  motif: 'rag' | 'traffic' | 'health' | 'spam'
}

export const projects: Project[] = [
  {
    slug: 'cost-aware-rag',
    title: 'Cost-Aware RAG',
    tagline: 'Semantic caching & intelligent model routing',
    category: 'LLM Systems & RAG',
    filters: ['AI / ML', 'Full-Stack'],
    eyebrow: 'RETRIEVAL · CACHING · ROUTING',
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLite', 'Groq', 'Sentence Transformers'],
    short: 'Python · FastAPI',
    stat: { value: '59.2%', label: 'lower estimated inference cost across 38 requests (offline evaluation)' },
    points: [
      'Built a document-grounded RAG pipeline with PDF/TXT ingestion, page-aware chunking, vector retrieval, source citations and insufficient-evidence handling.',
      'Implemented evidence-aware semantic caching and complexity-based LLM routing, reducing estimated inference cost by 59.2% across 38 requests in offline evaluation.',
      'Created isolated temporary visitor workspaces using server-issued tokens and in-memory SQLite, with session-scoped documents, retrieval, caching and telemetry.',
    ],
    repo: 'https://github.com/darshan-shiva/Cost-Aware-RAG',
    hue: ['#0b1d4d', '#2f4fe0'],
    motif: 'rag',
  },
  {
    slug: 'smart-traffic-vehicle-counter',
    title: 'Smart Traffic Vehicle Counter',
    tagline: 'Detection, tracking & speed estimation',
    category: 'Computer Vision',
    filters: ['AI / ML'],
    eyebrow: 'DETECTION · TRACKING · COUNTING',
    stack: ['Python', 'YOLO11', 'ByteTrack', 'OpenCV', 'Streamlit'],
    short: 'YOLO11 · ByteTrack',
    points: [
      'Developed a vehicle detection, tracking, classification and counting system with direction and speed estimation.',
      'Combined YOLO11, ByteTrack, trajectory analysis and line-crossing logic in a Streamlit analytics dashboard.',
    ],
    repo: 'https://github.com/darshan-shiva/Smart-traffic-vehicle-counter',
    hue: ['#3a1d06', '#e07a1f'],
    motif: 'traffic',
  },
  {
    slug: 'ai-health-tracker',
    title: 'AI Health Tracker',
    tagline: 'Personalised AI-generated health insights',
    category: 'Full-Stack & GenAI',
    filters: ['Full-Stack'],
    eyebrow: 'HEALTH RECORDS · GENERATIVE AI',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Google Gemini API', 'JWT'],
    short: 'React · Node.js',
    points: [
      'Built a full-stack healthcare platform for health-record management and personalised AI-generated insights.',
      'Implemented JWT authentication, REST APIs, MongoDB persistence and a responsive React dashboard.',
    ],
    repo: 'https://github.com/darshan-shiva/AI-HEALTH-TRACKER',
    hue: ['#06312a', '#1fa77f'],
    motif: 'health',
  },
  {
    slug: 'spam-mail-classifier',
    title: 'Spam Mail Classifier',
    tagline: 'NLP text classification',
    category: 'NLP & Machine Learning',
    filters: ['AI / ML'],
    eyebrow: 'NLP · TF-IDF · CLASSIFICATION',
    stack: ['Python', 'Pandas', 'NumPy', 'TF-IDF', 'Logistic Regression'],
    short: 'Python · Scikit-learn',
    stat: { value: '98%', label: 'classification accuracy' },
    points: [
      'Developed an NLP-based spam classifier achieving 98% classification accuracy.',
      'Evaluated the model using precision, recall, F1-score and a confusion matrix.',
    ],
    repo: 'https://github.com/darshan-shiva/Spam-Mail-Classifier',
    hue: ['#2a0f45', '#8b4fe0'],
    motif: 'spam',
  },
]

export const experience = [
  {
    company: 'MPRO9',
    role: 'AI Intern — Project Development & Implementation',
    place: 'Mysore, India',
    period: 'Jul 2026 — Oct 2026',
    points: [
      'Built GeoVision AI for property identification and analysis using geospatial and visual data.',
      'Developed YOLO-based object detection workflows for analysing 360-degree imagery.',
      'Integrated Insta360 X4 imagery with GPS information from u-blox GPS modules.',
      'Contributed to data preprocessing, model development, testing and optimisation.',
    ],
  },
]

export const education = [
  { label: 'Degree', title: 'B.Tech, Artificial Intelligence & Machine Learning', sub: 'M S Ramaiah University of Applied Sciences', meta: 'In progress · CGPA 8.0' },
  { label: 'Pre-University', title: 'Pre-University Course, KSEAB', sub: 'Christ Junior College, Karnataka', meta: '2023 · 83.6%' },
  { label: 'School', title: '10th Boards, CISCE', sub: 'Cambridge Public School', meta: '2021 · 92.8%' },
]

export const skills: { label: string; items: string[] }[] = [
  { label: 'Programming', items: ['Python', 'JavaScript', 'Java', 'C'] },
  { label: 'Frontend', items: ['React.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { label: 'Backend', items: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs'] },
  { label: 'AI / ML', items: ['RAG', 'Semantic Caching', 'LLM Routing', 'Sentence Transformers', 'TensorFlow', 'Scikit-learn', 'YOLO', 'Computer Vision', 'NLP', 'Deep Learning', 'LangChain', 'LangGraph', 'Google Gemini API'] },
  { label: 'Databases', items: ['SQLite', 'MongoDB', 'SQL'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Jupyter Notebook', 'Pytest', 'OpenCV', 'Streamlit'] },
  { label: 'Hardware', items: ['Insta360 X4', 'u-blox GPS'] },
]

export const coursework = ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'Operating Systems', 'Computer Networks']

export const certifications = [
  { title: 'Oracle Certified: AI Vector Search Certified Professional', by: 'Oracle' },
  { title: 'AI Fluency Framework and Foundations', by: 'Anthropic' },
  { title: 'AI Literacy', by: 'IBM' },
  { title: 'AI Fundamentals with IBM SkillBuild', by: 'Cisco' },
  { title: 'Data Analytics Essentials', by: 'Cisco' },
  { title: 'Prompt Design in Vertex AI', by: 'Google' },
  { title: 'Generative AI Foundations', by: 'upGrad in collaboration with Microsoft' },
]

export const services = [
  { n: '01', title: 'Computer Vision', text: 'YOLO-based detection, tracking and analysis — from traffic counting to geospatial property analysis on 360-degree imagery.' },
  { n: '02', title: 'RAG & LLM Systems', text: 'Document-grounded retrieval with citations, semantic caching and complexity-based model routing to keep inference cost measurable.' },
  { n: '03', title: 'The full package', text: 'End-to-end applications with FastAPI or Node.js backends, React and TypeScript frontends, and clear evaluation and telemetry.' },
]
