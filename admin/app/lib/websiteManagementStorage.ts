export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  primaryButton: string;
  primaryLink: string;
  secondaryButton: string;
  secondaryLink: string;
}

export interface HomeFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HomeCategoryPreview {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface HomeQualityHighlight {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface CustomPageSection {
  id: string;
  sectionTitle: string;
  badgeTagline: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface HomeSectionData {
  heroSlides: HeroSlide[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: HomeFeature[];
  introTitle: string;
  introDescription: string;
  introImage: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  categories: HomeCategoryPreview[];
  qualityTitle: string;
  qualityDescription: string;
  qualityImage: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  ctaImage: string;
  customSections: CustomPageSection[];
}

export interface AboutSectionData {
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyImage: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  customSections: CustomPageSection[];
}

export interface ContactPageData {
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;
  officeAddress: string;
  email: string;
  phone: string;
  workingHours: string;
  bannerImage: string;
  customSections: CustomPageSection[];
}

export interface CareerPageData {
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;
  whyWorkTitle: string;
  whyWorkDescription: string;
  hrEmail: string;
  bannerImage: string;
  customSections: CustomPageSection[];
}

export interface WebsiteManagementData {
  homeData: HomeSectionData;
  aboutData: AboutSectionData;
  contactData: ContactPageData;
  careerData: CareerPageData;
  announcementBar: string;
  showAnnouncementBar: boolean;
}

const STORAGE_KEY = "aurevia_website_management_data";

export const initialWebsiteData: WebsiteManagementData = {
  announcementBar: "⚡ Premier WHO-GMP Certified Pharmaceutical Manufacturer & Global Exporter",
  showAnnouncementBar: true,
  homeData: {
    heroSlides: [
      {
        id: "slide-1",
        eyebrow: "AUREVIA HEALTHCARE",
        title: "Pharmaceutical Manufacturing Built for Healthcare Businesses",
        description: "Reliable pharmaceutical solutions for healthcare companies, distributors and brand owners.",
        image: "/hero/slide1.png",
        alt: "Aurevia Healthcare pharmaceutical manufacturing",
        primaryButton: "Explore Products",
        primaryLink: "/products#explore",
        secondaryButton: "About Aurevia",
        secondaryLink: "/about",
      },
      {
        id: "slide-2",
        eyebrow: "MANUFACTURING EXCELLENCE",
        title: "Consistent Production. Controlled Processes.",
        description: "Efficient manufacturing focused on consistency, precision and dependable quality.",
        image: "/hero/slide2.png",
        alt: "Aurevia Healthcare manufacturing facility",
        primaryButton: "Explore Industries",
        primaryLink: "/industries#industry-segments",
        secondaryButton: "Explore Products",
        secondaryLink: "/products#explore",
      },
      {
        id: "slide-3",
        eyebrow: "QUALITY & RELIABILITY",
        title: "Quality Built Into Every Batch",
        description: "Strict quality practices ensure consistent and reliable pharmaceutical products.",
        image: "/hero/slide3.png",
        alt: "Aurevia Healthcare quality control",
        primaryButton: "Quality & Certifications",
        primaryLink: "/about#quality-certifications",
        secondaryButton: "Learn More",
        secondaryLink: "/about",
      },
      {
        id: "slide-4",
        eyebrow: "YOUR PHARMACEUTICAL PARTNER",
        title: "Your Partner in Pharmaceutical Manufacturing",
        description: "Flexible solutions designed to support growing healthcare businesses.",
        image: "/hero/slide4.png",
        alt: "Aurevia Healthcare pharmaceutical partnership",
        primaryButton: "Get a Quote",
        primaryLink: "/contact#contact-form",
        secondaryButton: "Contact Us",
        secondaryLink: "/contact#contact-form",
      },
    ],
    featuresTitle: "Why Partner With Aurevia Healthcare",
    featuresSubtitle: "Delivering WHO-GMP certified quality, global export capabilities, and end-to-end contract manufacturing.",
    features: [
      {
        id: "feat-1",
        title: "WHO-GMP Certified",
        description: "State-of-the-art facilities compliant with international regulatory authorities.",
        icon: "ShieldCheck",
      },
      {
        id: "feat-2",
        title: "Global Export Reach",
        description: "Supplying trusted healthcare formulations across 30+ countries worldwide.",
        icon: "Globe",
      },
      {
        id: "feat-3",
        title: "Contract Manufacturing",
        description: "Tailored formulation, private labeling, and scalable batch production.",
        icon: "Factory",
      },
      {
        id: "feat-4",
        title: "Quality Assurance",
        description: "Rigorously tested batches ensuring zero defect rate and therapeutic efficacy.",
        icon: "CheckCircle",
      },
    ],
    introTitle: "Pioneering Modern Healthcare & Pharmaceutical Excellence",
    introDescription: "At Aurevia Healthcare, we specialize in high-capacity contract manufacturing, commercial formulations, and international pharmaceutical trade. Our mission is to democratize access to affordable, high-grade therapeutic solutions across tablets, capsules, injectables, and nutraceuticals.",
    introImage: "/hero/slide1.png",
    categoriesTitle: "Comprehensive Therapeutic Portfolio",
    categoriesSubtitle: "Explore our wide range of WHO-GMP certified pharmaceutical formulations.",
    categories: [
      {
        id: "cat-1",
        name: "Tablets & Capsules",
        description: "Oral solid dosage forms including film-coated, sustained release, and dispersible formulations.",
        image: "/hero/slide2.png",
      },
      {
        id: "cat-2",
        name: "Injectables & Parenterals",
        description: "Sterile liquid vials, ampoules, and lyophilized powder injectables.",
        image: "/hero/slide3.png",
      },
      {
        id: "cat-3",
        name: "Syrups & Oral Liquids",
        description: "Palatable pediatric and adult liquid formulations in bottles and sachets.",
        image: "/hero/slide4.png",
      },
      {
        id: "cat-4",
        name: "Nutraceuticals & Wellness",
        description: "Dietary supplements, multivitamins, and health-enhancing formulations.",
        image: "/hero/slide1.png",
      },
    ],
    qualityTitle: "WHO-GMP Compliant & Stringent Quality Standards",
    qualityDescription: "Every batch undergoes multi-tiered chemical and microbiological assay testing in our advanced Quality Control labs before global dispatch.",
    qualityImage: "/hero/slide3.png",
    ctaTitle: "Ready to Start Your Manufacturing Partnership?",
    ctaDescription: "Get customized quotes for contract manufacturing, third-party production, or international distribution.",
    ctaButtonText: "Request Commercial Quote",
    ctaButtonLink: "/contact",
    ctaImage: "/hero/slide4.png",
    customSections: [],
  },
  aboutData: {
    heroTagline: "ABOUT AUREVIA HEALTHCARE",
    heroTitle: "Pioneering Excellence in Pharmaceutical Manufacturing",
    heroDescription: "Driven by innovation, stringent quality controls, and a commitment to global health. We provide world-class healthcare formulations engineered to make quality healthcare accessible to every community.",
    storyTitle: "Our Journey & Commitment to Quality",
    storyParagraph1: "Founded with a clear vision to bridge global healthcare gaps, Aurevia Healthcare has grown into a leading force in pharmaceutical manufacturing. Our facilities operate strictly under international regulatory guidelines, delivering consistent, dependable formulations to partners worldwide.",
    storyParagraph2: "Through continuous research and state-of-the-art machinery, we ensure that every batch of medicine produced meets rigorous quality, purity, and safety benchmarks.",
    storyImage: "/hero/About-us.png",
    missionTitle: "Our Mission",
    missionText: "To enhance human lives globally by engineering high-quality, accessible, and compliant pharmaceutical formulations using innovative technology and ethical business practices.",
    visionTitle: "Our Vision",
    visionText: "To be recognized globally as the most trusted pharmaceutical partner for innovation, manufacturing excellence, and unyielding quality commitment.",
    customSections: [],
  },
  contactData: {
    heroTagline: "GET IN TOUCH",
    heroTitle: "We are Here to Support Your Pharmaceutical Needs",
    heroDescription: "Have a business inquiry, contract manufacturing requirement, or product question? Connect with our dedicated healthcare support team today.",
    officeAddress: "Plot No. 42, Pharmaceutical Zone, GIDC Industrial Estate, Gujarat, India - 390010",
    email: "info@aureviahealthcare.com",
    phone: "+91 98765 43210",
    workingHours: "Monday - Saturday: 9:00 AM - 6:00 PM IST",
    bannerImage: "/hero/slide4.png",
    customSections: [],
  },
  careerData: {
    heroTagline: "CAREERS AT AUREVIA",
    heroTitle: "Build Your Career in Pharmaceutical Innovation",
    heroDescription: "Join a passionate team of scientists, engineers, quality specialists, and business leaders dedicated to transforming global healthcare.",
    whyWorkTitle: "Why Work With Us?",
    whyWorkDescription: "We offer an empowering workplace culture, continuous learning opportunities, competitive benefits, and a mission-driven environment focused on saving lives.",
    hrEmail: "careers@aureviahealthcare.com",
    bannerImage: "/hero/slide1.png",
    customSections: [],
  },
};

export function getWebsiteManagementData(): WebsiteManagementData {
  if (typeof window === "undefined") return initialWebsiteData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialWebsiteData;
    const parsed = JSON.parse(stored);
    return {
      announcementBar: parsed.announcementBar ?? initialWebsiteData.announcementBar,
      showAnnouncementBar: parsed.showAnnouncementBar ?? initialWebsiteData.showAnnouncementBar,
      homeData: {
        ...initialWebsiteData.homeData,
        ...(parsed.homeData || {}),
        customSections: Array.isArray(parsed.homeData?.customSections)
          ? parsed.homeData.customSections
          : [],
      },
      aboutData: {
        ...initialWebsiteData.aboutData,
        ...(parsed.aboutData || {}),
        customSections: Array.isArray(parsed.aboutData?.customSections)
          ? parsed.aboutData.customSections
          : [],
      },
      contactData: {
        ...initialWebsiteData.contactData,
        ...(parsed.contactData || {}),
        customSections: Array.isArray(parsed.contactData?.customSections)
          ? parsed.contactData.customSections
          : [],
      },
      careerData: {
        ...initialWebsiteData.careerData,
        ...(parsed.careerData || {}),
        customSections: Array.isArray(parsed.careerData?.customSections)
          ? parsed.careerData.customSections
          : [],
      },
    };
  } catch {
    return initialWebsiteData;
  }
}

export function saveWebsiteManagementData(data: WebsiteManagementData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving website management data:", err);
  }
}

