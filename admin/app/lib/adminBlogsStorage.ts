export interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl?: string;
  schema?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  seo?: BlogSEO;
}

const STORAGE_KEY = "aurevia_admin_blogs_data";

export const initialBlogsData: BlogArticle[] = [
  {
    id: "blog-1",
    title: "Understanding Modern Pharmaceutical Manufacturing Processes",
    slug: "understanding-modern-pharmaceutical-manufacturing-processes",
    category: "Pharmaceutical Manufacturing",
    image: "/blogs/blog-pharmaceutical-manufacturing.jpg",
    excerpt: "Explore technological advancements, automated dosage systems, and stringent quality protocols driving modern pharmaceutical manufacturing excellence.",
    content: "Pharmaceutical manufacturing has evolved dramatically over the last decade, transitioning from batch-centric operations to automated, continuous processing systems. Modern production encompasses cleanroom HVAC engineering, dosage containment, precise analytical testing, and environmental monitoring controls.",
    authorName: "Dr. Rajesh Sharma",
    authorRole: "Head of Technical Operations & QA",
    date: "September 16, 2026",
    readTime: "6 min read",
    tags: ["Manufacturing", "Pharma Tech", "WHO-GMP", "Quality Assurance"],
    featured: true,
    published: true,
    seo: {
      metaTitle: "Understanding Modern Pharmaceutical Manufacturing Processes | Aurevia Healthcare",
      metaDescription: "In-depth insights into modern pharmaceutical manufacturing workflows, continuous processing, cleanroom engineering, and quality controls.",
      metaKeywords: "pharmaceutical manufacturing, pharma tech, cGMP manufacturing, tablet production, cleanroom technology",
      canonicalUrl: "https://aureviahealthcare.com/blog/understanding-modern-pharmaceutical-manufacturing-processes",
    },
  },
  {
    id: "blog-2",
    title: "Why Quality Control Matters in Pharmaceutical Manufacturing",
    slug: "why-quality-control-matters-in-pharmaceutical-manufacturing",
    category: "Quality & Compliance",
    image: "/blogs/blog-quality-control.jpg",
    excerpt: "Quality control is the bedrock of safe medication production. Learn how analytical testing and WHO-GMP compliance safeguard global healthcare outcomes.",
    content: "In the pharmaceutical industry, product quality directly affects patient health and therapy efficacy. Quality must be built into every single batch through systematic Quality Control (QC) and Quality Assurance (QA) protocols.",
    authorName: "Ananya Verma",
    authorRole: "Quality Control & Compliance Director",
    date: "September 14, 2026",
    readTime: "5 min read",
    tags: ["Quality Control", "Analytical Testing", "GMP", "Compliance"],
    featured: false,
    published: true,
    seo: {
      metaTitle: "Why Quality Control Matters in Pharmaceutical Manufacturing | Aurevia Healthcare",
      metaDescription: "Explore the critical role of Quality Control (QC) in pharmaceutical formulation, HPLC analysis, microbial testing, and international compliance.",
      metaKeywords: "pharmaceutical quality control, QC testing, HPLC analysis, WHO-GMP compliance, pharmaceutical testing",
      canonicalUrl: "https://aureviahealthcare.com/blog/why-quality-control-matters-in-pharmaceutical-manufacturing",
    },
  },
  {
    id: "blog-3",
    title: "The Role of R&D in Pharmaceutical Formulation Development",
    slug: "role-of-rd-in-pharmaceutical-formulation-development",
    category: "Research & Development",
    image: "/blogs/blog-pharmaceutical-rd.jpg",
    excerpt: "Discover how scientific research, stability studies, and bio-equivalence testing transform active pharmaceutical ingredients into optimized commercial formulations.",
    content: "Research and Development (R&D) is the strategic backbone of formulation innovation in pharmaceutical manufacturing. Transforming a raw active ingredient into a stable, bio-available dosage form requires deep scientific expertise.",
    authorName: "Dr. Vikram Mehta",
    authorRole: "Lead Formulation Scientist",
    date: "September 10, 2026",
    readTime: "7 min read",
    tags: ["Research & Development", "Formulation", "Bioequivalence", "Pharma R&D"],
    featured: false,
    published: true,
    seo: {
      metaTitle: "The Role of R&D in Pharmaceutical Formulation Development | Aurevia Healthcare",
      metaDescription: "Learn how pharmaceutical R&D drives formulation development, pre-formulation studies, bio-equivalence optimization, and drug stability.",
      metaKeywords: "pharmaceutical R&D, formulation development, bioequivalence, drug delivery, pre-formulation",
      canonicalUrl: "https://aureviahealthcare.com/blog/role-of-rd-in-pharmaceutical-formulation-development",
    },
  },
  {
    id: "blog-4",
    title: "Choosing the Right Pharmaceutical Manufacturing Partner",
    slug: "choosing-the-right-pharmaceutical-manufacturing-partner",
    category: "Industry Insights",
    image: "/blogs/blog-manufacturing-partner.jpg",
    excerpt: "Key criteria for evaluating contract manufacturing organizations (CMOs)—from technical infrastructure to regulatory compliance and supply chain reliability.",
    content: "Selecting the right Contract Development and Manufacturing Organization (CDMO / CMO) is one of the most critical decisions a healthcare brand or pharmaceutical distributor can make.",
    authorName: "Siddharth Patel",
    authorRole: "VP of Commercial Partnerships",
    date: "September 05, 2026",
    readTime: "6 min read",
    tags: ["Contract Manufacturing", "CMO Selection", "Supply Chain", "B2B Partnership"],
    featured: false,
    published: true,
    seo: {
      metaTitle: "Choosing the Right Pharmaceutical Manufacturing Partner | Aurevia Insights",
      metaDescription: "A strategic guide for healthcare companies on evaluating contract pharmaceutical manufacturers, WHO-GMP standards, technical audits, and scale capability.",
      metaKeywords: "contract manufacturing, pharma partner selection, CMO pharma, third party manufacturing, Aurevia B2B",
      canonicalUrl: "https://aureviahealthcare.com/blog/choosing-the-right-pharmaceutical-manufacturing-partner",
    },
  },
  {
    id: "blog-5",
    title: "Importance of GMP Practices in Pharmaceutical Manufacturing",
    slug: "importance-of-gmp-practices-in-pharmaceutical-manufacturing",
    category: "Quality & Compliance",
    image: "/blogs/blog-gmp-practices.jpg",
    excerpt: "Good Manufacturing Practices (GMP) ensure consistency, safety, and purity in pharmaceutical production. Understand the core principles behind cGMP compliance.",
    content: "Good Manufacturing Practice (GMP) is a system for ensuring that pharmaceutical products are consistently produced and controlled according to strict quality standards. It covers all aspects of production from the starting raw materials, premises, and equipment to personnel hygiene.",
    authorName: "Ananya Verma",
    authorRole: "Quality Control & Compliance Director",
    date: "August 28, 2026",
    readTime: "5 min read",
    tags: ["GMP", "cGMP Compliance", "Quality Assurance", "Pharma Standards"],
    featured: false,
    published: true,
    seo: {
      metaTitle: "Importance of GMP Practices in Pharmaceutical Manufacturing | Aurevia Healthcare",
      metaDescription: "Understand Good Manufacturing Practices (GMP), cGMP standards, cleanroom maintenance, and data integrity in pharmaceutical production.",
      metaKeywords: "GMP practices, cGMP pharma, pharmaceutical guidelines, cleanroom standards, WHO-GMP",
      canonicalUrl: "https://aureviahealthcare.com/blog/importance-of-gmp-practices-in-pharmaceutical-manufacturing",
    },
  },
  {
    id: "blog-6",
    title: "How Technology Is Shaping Pharmaceutical Manufacturing",
    slug: "how-technology-is-shaping-pharmaceutical-manufacturing",
    category: "Industry Insights",
    image: "/blogs/blog-pharma-technology.jpg",
    excerpt: "From AI-driven batch inspection to automated packaging robotics, explore how modern technology is reshaping speed, accuracy, and compliance in pharma production.",
    content: "The global pharmaceutical manufacturing landscape is undergoing a digital transformation. Driven by Industry 4.0 technological advances, pharmaceutical companies are integrating automated robotics, IoT sensors, artificial intelligence, and Process Analytical Technology (PAT) into commercial production lines.",
    authorName: "Dr. Rajesh Sharma",
    authorRole: "Head of Technical Operations & QA",
    date: "August 20, 2026",
    readTime: "6 min read",
    tags: ["Pharma Tech", "Automation", "Industry 4.0", "Smart Manufacturing"],
    featured: false,
    published: true,
    seo: {
      metaTitle: "How Technology Is Shaping Pharmaceutical Manufacturing | Aurevia Insights",
      metaDescription: "Explore Industry 4.0 innovations in pharmaceutical manufacturing: automated visual inspection, smart sensors, PAT, and digital data integrity.",
      metaKeywords: "pharmaceutical technology, smart manufacturing pharma, AI in pharma, automated batch inspection, Industry 4.0 pharma",
      canonicalUrl: "https://aureviahealthcare.com/blog/how-technology-is-shaping-pharmaceutical-manufacturing",
    },
  },
];

export function getAdminBlogs(): BlogArticle[] {
  if (typeof window === "undefined") return initialBlogsData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      saveAdminBlogs(initialBlogsData);
      return initialBlogsData;
    }
    const parsed: BlogArticle[] = JSON.parse(stored);
    // Ensure all parsed items have valid images, otherwise reset to initial
    const hasMissingImages = parsed.some((item) => !item.image || item.image.trim() === "");
    if (hasMissingImages || parsed.length < initialBlogsData.length) {
      saveAdminBlogs(initialBlogsData);
      return initialBlogsData;
    }
    return parsed;
  } catch {
    return initialBlogsData;
  }
}

export function saveAdminBlogs(blogs: BlogArticle[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  } catch (err) {
    console.error("Error saving admin blogs data:", err);
  }
}
