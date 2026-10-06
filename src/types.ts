export interface PosterImage {
  id: string;
  title: string;
  aspectRatio: string;
  formatName: string;
  dimensions: string;
  recommendedFor: string;
  imagePath: string;
  description: string;
  tags: string[];
}

export interface MedicalTest {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  fastingHours?: string;
  turnaroundTime: string;
  popular?: boolean;
}

export interface TestPackage {
  id: string;
  titleAr: string;
  titleEn: string;
  testsCount: number;
  originalPrice: number;
  discountedPrice: number;
  testsIncluded: string[];
  badge?: string;
  popular?: boolean;
}

export interface SocialCaption {
  platform: 'facebook' | 'instagram' | 'whatsapp' | 'twitter';
  platformName: string;
  icon: string;
  title: string;
  text: string;
}

export interface PosterCustomConfig {
  labName: string;
  subTitle: string;
  discountPercent: number;
  headline: string;
  offerTag: string;
  hotline: string;
  whatsapp: string;
  branches: string;
  theme: 'cyan' | 'navy' | 'emerald' | 'gold';
  includeHomeService: boolean;
  selectedTestsText: string;
  notes: string;
}
