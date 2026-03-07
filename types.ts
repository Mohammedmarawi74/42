export interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  highlight?: string; // E.g., "Best Value"
  image?: string | null;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  fontFamily: string;
}

export interface AppState {
  logo: string | null; // URL or base64
  slides: SlideData[];
  activeSlideIndex: number;
  theme: ThemeConfig;
  customCSS: string;
}

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#10b981', // Emerald 500
  secondaryColor: '#34d399', // Emerald 400
  backgroundColor: '#000000', // Deep black
  textColor: '#ffffff',
  cardBackground: 'rgba(255, 255, 255, 0.05)',
  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
};

export interface PresetTheme {
  id: string;
  name: string;
  colors: ThemeConfig;
}

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: 'default',
    name: 'الزمرد الرقمي',
    colors: DEFAULT_THEME
  },
  {
    id: 'ocean',
    name: 'المحيط العميق',
    colors: {
      primaryColor: '#0ea5e9', // Sky 500
      secondaryColor: '#38bdf8', // Sky 400
      backgroundColor: '#0f172a', // Slate 900
      textColor: '#ffffff',
      cardBackground: 'rgba(30, 41, 59, 0.7)',
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    }
  },
  {
    id: 'luxury',
    name: 'الذهب الأسود',
    colors: {
      primaryColor: '#d4af37', // Gold
      secondaryColor: '#fcd34d', // Amber 300
      backgroundColor: '#0a0a0a', // Almost black
      textColor: '#ffffff',
      cardBackground: 'rgba(20, 20, 20, 0.9)',
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    }
  },
  {
    id: 'purple',
    name: 'المستقبل البنفسجي',
    colors: {
      primaryColor: '#8b5cf6', // Violet 500
      secondaryColor: '#a78bfa', // Violet 400
      backgroundColor: '#2e1065', // Violet 950
      textColor: '#ffffff',
      cardBackground: 'rgba(139, 92, 246, 0.1)',
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    }
  },
  {
    id: 'sunset',
    name: 'غروب الاستثمار',
    colors: {
      primaryColor: '#f97316', // Orange 500
      secondaryColor: '#fb923c', // Orange 400
      backgroundColor: '#431407', // Brown 950
      textColor: '#ffffff',
      cardBackground: 'rgba(255, 255, 255, 0.05)',
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    }
  },
  {
    id: 'minimal',
    name: 'الرمادي الحديث',
    colors: {
      primaryColor: '#ffffff', // White
      secondaryColor: '#9ca3af', // Gray 400
      backgroundColor: '#111827', // Gray 900
      textColor: '#ffffff',
      cardBackground: 'rgba(31, 41, 55, 0.8)',
      fontFamily: "'IBM Plex Sans Arabic', sans-serif",
    }
  }
];

export const INITIAL_SLIDES: SlideData[] = [
  {
    id: '1',
    title: 'خطة النمو المتسارع',
    subtitle: 'للشركات الناشئة',
    description: 'تحليل شامل للبيانات المالية مع توصيات ذكية تعتمد على الذكاء الاصطناعي لتحسين العائد على الاستثمار.',
    ctaText: 'ابدأ التجربة المجانية',
    highlight: 'الأكثر طلباً',
    image: 'https://picsum.photos/400/400?random=1'
  },
  {
    id: '2',
    title: 'المحفظة الاستثمارية',
    subtitle: 'للمستثمرين الأفراد',
    description: 'أدوات تتبع متقدمة للأسهم والعملات الرقمية مع تنبيهات لحظية لفرص الشراء والبيع.',
    ctaText: 'اعرف المزيد',
    highlight: 'جديد',
    image: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: '3',
    title: 'الاستشارات المالية',
    subtitle: 'خدمة VIP',
    description: 'جلسات استشارية خاصة مع كبار المحللين الماليين لبناء استراتيجية ثروة طويلة الأمد.',
    ctaText: 'احجز موعد',
    highlight: '',
    image: 'https://picsum.photos/400/400?random=3'
  }
];