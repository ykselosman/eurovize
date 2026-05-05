export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  country: string;
  countryFlag: string;
  type: 'tourist' | 'work' | 'student' | 'family' | 'residence' | 'citizenship' | 'business' | 'golden';
  typeName: string;
  price: string;
  duration: string;
  requirements: string[];
  process: { step: number; title: string; description: string }[];
  features: string[];
  isActive: boolean;
  order: number;
}

export interface Application {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceId: string;
  serviceTitle: string;
  country: string;
  trackingNumber: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'processing' | 'completed';
  statusName: string;
  notes: { date: string; text: string; by: string }[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    passportNumber: string;
    address: string;
  };
  additionalInfo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  service: string;
  text: string;
  rating: number;
  isActive: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  exp: string;
}

export interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  workingHours: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  companyInfo: {
    foundedYear: string;
    shortDesc: string;
    longDesc: string;
  };
  stats: {
    totalApplications: string;
    countries: string;
    successRate: string;
    supportHours: string;
    totalApplicationsNum: number;
    countriesNum: number;
    successRateNum: number;
    yearsNum: number;
  };
  team: TeamMember[];
  whyUs: {
    icon: string;
    title: string;
    desc: string;
  }[];
}

export type AdminTab = 'dashboard' | 'services' | 'applications' | 'users' | 'testimonials' | 'faq' | 'settings';
