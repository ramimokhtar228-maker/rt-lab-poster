import { PosterImage, MedicalTest, TestPackage, SocialCaption } from '../types';
import squarePoster from '../assets/images/rt_poster_square_1791310264774.jpg';
import storyPoster from '../assets/images/rt_poster_story_1791310277019.jpg';
import widePoster from '../assets/images/rt_poster_wide_1791310287882.jpg';

export const POSTER_IMAGES: PosterImage[] = [
  {
    id: 'poster-square',
    title: 'بوستر مربع رئيسي (1:1) - سوشيال ميديا',
    aspectRatio: '1:1',
    formatName: 'Square Post',
    dimensions: '1080 × 1080 px',
    recommendedFor: 'منشورات إنستغرام، فيسبوك، واتساب، وحالات ستوري المربعة',
    imagePath: squarePoster,
    description: 'تصميم جرافيكي متميز بهوية معامل RT للتحاليل الطبية مع بادج خصم 70% البارز وعرض اليوم الواحد مع عناصر مختبرية وثلاثية الأبعاد نقية.',
    tags: ['سوشيال ميديا', 'إنستغرام', 'فيسبوك', 'عرض اليوم الواحد', 'خصم 70%']
  },
  {
    id: 'poster-story',
    title: 'بوستر ستوري وفلاير رأسي (9:16) - قصص ورول أب',
    aspectRatio: '9:16',
    formatName: 'Vertical Story / Flyer',
    dimensions: '1080 × 1920 px',
    recommendedFor: 'قصص Instagram Stories، تيك توك، WhatsApp Status، ستاند رول أب العيادات',
    imagePath: storyPoster,
    description: 'بوستر رأسي احترافي جذاب يبرز تفاصيل العرض مع لافتات الخصم الفوري ووجود كادر طبي في بيئة معملية متطورة للغاية.',
    tags: ['ستوري', 'تيك توك', 'رول أب', 'فلاير طبي', 'عرض اليوم الواحد']
  },
  {
    id: 'poster-wide',
    title: 'بانر عريض (16:9) - غلاف فيسبوك وبانر شاشات',
    aspectRatio: '16:9',
    formatName: 'Widescreen Banner',
    dimensions: '1920 × 1080 px',
    recommendedFor: 'غلاف صفحة فيسبوك، بانر الموقع الإلكتروني، شاشات العرض الرقمية بالمعامل',
    imagePath: widePoster,
    description: 'بانر إعلاني عريض بأعلى جودة يظهر أحدث أجهزة التحاليل المؤتمتة وشعارات معامل RT مع إبراز خصم 70% وعرض اليوم الواحد.',
    tags: ['غلاف فيسبوك', 'بانر موقع', 'شاشات المعمل', 'إعلانات الويب']
  }
];

export const MEDICAL_TESTS: MedicalTest[] = [
  {
    id: 'cbc',
    nameAr: 'صورة دم كاملة (CBC)',
    nameEn: 'Complete Blood Count',
    category: 'أمراض الدم',
    originalPrice: 200,
    discountedPrice: 60,
    fastingHours: 'لا يشترط صيام',
    turnaroundTime: 'ساعتان',
    popular: true
  },
  {
    id: 'hba1c',
    nameAr: 'السكر التراكمي (HbA1c)',
    nameEn: 'Glycated Hemoglobin',
    category: 'مرض السكري',
    originalPrice: 220,
    discountedPrice: 66,
    fastingHours: 'لا يشترط صيام',
    turnaroundTime: 'ساعتان',
    popular: true
  },
  {
    id: 'fbs',
    nameAr: 'سكر صائم في الدم (FBS)',
    nameEn: 'Fasting Blood Sugar',
    category: 'مرض السكري',
    originalPrice: 90,
    discountedPrice: 27,
    fastingHours: 'صيام 8 ساعات',
    turnaroundTime: 'خلال ساعة'
  },
  {
    id: 'vit-d',
    nameAr: 'تحليل فيتامين د (Vitamin D - 25 OH)',
    nameEn: 'Vitamin D Total',
    category: 'الفيتامينات والمعادن',
    originalPrice: 550,
    discountedPrice: 165,
    fastingHours: 'لا يشترط صيام',
    turnaroundTime: 'خلال نفس اليوم',
    popular: true
  },
  {
    id: 'ferritin',
    nameAr: 'مخزون الحديد في الدم (Ferritin)',
    nameEn: 'Serum Ferritin',
    category: 'أمراض الدم والمناعة',
    originalPrice: 280,
    discountedPrice: 84,
    fastingHours: 'صيام 6 ساعات يفضل',
    turnaroundTime: 'ساعتان'
  },
  {
    id: 'liver-full',
    nameAr: 'وظائف الكبد الكاملة (SGOT, SGPT, Bilirubin, Albumin)',
    nameEn: 'Liver Function Tests (LFT)',
    category: 'الكبد والجهاز الهضمي',
    originalPrice: 380,
    discountedPrice: 114,
    fastingHours: 'صيام 8 ساعات',
    turnaroundTime: '3 ساعات',
    popular: true
  },
  {
    id: 'kidney-full',
    nameAr: 'وظائف الكلى الكاملة (Creatinine, Urea, Uric Acid)',
    nameEn: 'Kidney Function Tests (KFT)',
    category: 'الكلى والمسالك',
    originalPrice: 300,
    discountedPrice: 90,
    fastingHours: 'لا يشترط صيام',
    turnaroundTime: 'ساعتان',
    popular: true
  },
  {
    id: 'lipid-profile',
    nameAr: 'دهون الدم الكاملة والكوليسترول (Lipid Profile)',
    nameEn: 'Total Lipid Profile (Cholesterol, TG, HDL, LDL)',
    category: 'القلب والأوعية الدموية',
    originalPrice: 360,
    discountedPrice: 108,
    fastingHours: 'صيام 12 ساعة',
    turnaroundTime: 'ساعتان',
    popular: true
  },
  {
    id: 'tsh',
    nameAr: 'هرمون الغدة الدرقية (TSH)',
    nameEn: 'Thyroid Stimulating Hormone',
    category: 'الهرمونات والغدد',
    originalPrice: 230,
    discountedPrice: 69,
    fastingHours: 'لا يشترط صيام',
    turnaroundTime: 'نفس اليوم',
    popular: true
  },
  {
    id: 'urine-stool',
    nameAr: 'فحص البول والبراز الكامل',
    nameEn: 'Urine & Stool Routine Analysis',
    category: 'فحوصات روتينية',
    originalPrice: 160,
    discountedPrice: 48,
    fastingHours: 'لا يشترط',
    turnaroundTime: 'ساعة واحدة'
  }
];

export const TEST_PACKAGES: TestPackage[] = [
  {
    id: 'pkg-comprehensive',
    titleAr: 'باقة الفحص الشامل الماسي (14 تحليلاً)',
    titleEn: 'Diamond Full Body Health Checkup',
    testsCount: 14,
    originalPrice: 1450,
    discountedPrice: 435,
    badge: 'الأكثر طلباً',
    popular: true,
    testsIncluded: [
      'صورة دم كاملة CBC',
      'وظائف كبد (SGPT / SGOT)',
      'وظائف كلى (Creatinine / Urea)',
      'سكر صائم وسكر تراكمي HbA1c',
      'دهون وكوليسترول الدم Lipid Profile',
      'حمض اليوريك Uric Acid (النقرس)',
      'تحليل بول كامل Routine Urine Analysis'
    ]
  },
  {
    id: 'pkg-vitality',
    titleAr: 'باقة النشاط ومقاومة الإرهاق وتساقط الشعر',
    titleEn: 'Vitality & Hair Care Profile',
    testsCount: 6,
    originalPrice: 1100,
    discountedPrice: 330,
    badge: 'عرض خاص',
    popular: false,
    testsIncluded: [
      'فيتامين د (Vitamin D Total)',
      'صورة دم كاملة CBC',
      'مخزون الحديد (Serum Ferritin)',
      'هرمون الغدة الدرقية (TSH)',
      'الكالسيوم الكلي (Total Calcium)',
      'الزنك في الدم (Serum Zinc)'
    ]
  },
  {
    id: 'pkg-wellness',
    titleAr: 'باقة كبار السن وصحة القلب والشرايين',
    titleEn: 'Cardiac & Senior Wellness Package',
    testsCount: 10,
    originalPrice: 1250,
    discountedPrice: 375,
    badge: 'خصم اليوم الواحد 70%',
    popular: false,
    testsIncluded: [
      'دهون الدم الكاملة Lipid Profile',
      'السكر التراكمي HbA1c',
      'وظائف الكلى كاملة',
      'وظائف الكبد',
      'رسم كهربية القلب / تحاليل الإنزيمات',
      'صورة دم كاملة CBC'
    ]
  }
];

export const SOCIAL_CAPTIONS: SocialCaption[] = [
  {
    platform: 'facebook',
    platformName: 'فيسبوك (Facebook Post)',
    icon: 'Share2',
    title: 'منشور فيسبوك تشويقي رسمي',
    text: `🚨 مفاجأة لا تتكرر من معامل RT للتحاليل الطبية! 🚨
💥 عرض اليوم الواحد فقط | خصم 70% على جميع التحاليل والفحوصات الطبية! 💥

صحتك وصحة أسرتك هي أولويتنا الأولى! اغتنم الفرصة اليوم واطمئن على صحتك بأحدث وأدق الأجهزة المعملية المؤتمتة عالمياً وبإشراف نخبة من أساتذة التحاليل الطبية.

🌟 مميزات معامل RT في عرض اليوم الواحد:
✅ خصم فوري 70% على كافة التحاليل وباقات الفحص الشامل.
✅ نتائج سريعة ودقيقة ومعتمدة دولياً وموثقة بـ QR Code.
✅ خدمة سحب العينات مجاناً من باب المنزل لراحتكم وسلامة أهاليكم.
✅ إرسال نتائج الفحوصات مباشرة عبر الواتساب وبسرية تامة.

⏰ العرض سارٍ اليوم فقط حتى منتصف الليل!
📲 للحجز والاستفسار وطلب سحب العينات منزلياً:
تواصل معنا عبر الواتساب أو الاتصال على: 01000000000
أو تفضل بزيارة أقرب فرع من فروع معامل RT.
معامل RT.. دقة تثق بها، لرعاية تستحقها! 🩺✨`
  },
  {
    platform: 'instagram',
    platformName: 'إنستغرام (Instagram Post & Reels)',
    icon: 'Instagram',
    title: 'كابشن إنستغرام عصري بالهاشتاجات',
    text: `🔥 عرض اليوم الواحد من معامل RT للتحاليل الطبية 🔥
خصم 70% على جميع التحاليل الطبية والفحوصات الشاملة 🧬🩺

اطمئن على صحتك اليوم بأعلى معايير الدقة والسرية!
سحب عينات من المنزل مجاناً 🚗💉
نتائج معتمدة تصلك على الواتساب 📱

📍 احجز موعدك الآن عبر رابط البايو أو أرسل رسالة على الخاص (DM)
📞 الخط الساخن والواتساب: 01000000000

#معامل_RT #تحاليل_طبية #عرض_اليوم_الواحد #خصم_70 #صحتك_تهمنا #فحص_شامل #فيتامين_د #سكر_تراكمي #سحب_عينات_منزلي #مختبرات_طبية #عروض_طبية #RT_Labs`
  },
  {
    platform: 'whatsapp',
    platformName: 'واتساب (WhatsApp Broadcast / Status)',
    icon: 'MessageSquare',
    title: 'رسالة جماعية وحالات واتساب سريعة',
    text: `🩺 *عرض اليوم الواحد من معامل RT للتحاليل الطبية* 🩺

🎉 *خصم 70% على جميع التحاليل الطبية وباقات الفحص الشامل!*

✨ يشمل:
• باقة الفحص الشامل
• وظائف الكبد والكلى
• السكر التراكمي وصورة الدم CBC
• فيتامين د والغدة الدرقية والدهون

🚗 *خدمة سحب العينات من المنزل مجاناً!*
📲 للحجز الفوري ومعرفة التفاصيل اضغط للرد على هذه الرسالة أو اتصل بنا مباشرة: 01000000000
⏰ العرض متاح اليوم فقط!`
  }
];

export const RT_BRANCHES = [
  { name: 'الفرع الرئيسي', address: 'شارع التحرير، وسط البلد', phone: '01000000001' },
  { name: 'فرع مصر الجديدة', address: 'شارع الأهرام، روكسي', phone: '01000000002' },
  { name: 'فرع مدينة نصر', address: 'شارع عباس العقاد', phone: '01000000003' },
  { name: 'فرع المعادي', address: 'شارع النصر، المعادي الجديدة', phone: '01000000004' },
  { name: 'فرع الجيزة والدقي', address: 'شارع مصدق، الدقي', phone: '01000000005' },
  { name: 'فرع الإسكندرية', address: 'طريق الحرية، سيدي جابر', phone: '01000000006' }
];

export const LAB_ADVANTAGES = [
  {
    title: 'دقة معملية فائقة',
    desc: 'أحدث أجهزة التحليل الآلي المؤتمتة بالكامل بمطابقة معايير ISO و FDA الأمريكية.'
  },
  {
    title: 'سحب منزلي مجاني',
    desc: 'فريق تمريض متخصص ومعقم لسحب العينات من منزلك أو مكتبك بكل راحة وأمان.'
  },
  {
    title: 'نتائج فورية وموثقة',
    desc: 'استلام النتائج عبر رابط آمن على الواتساب مع كود QR للتحقق الرسمي.'
  },
  {
    title: 'نخبة استشاريين',
    desc: 'إشراف وتدقيق من نخبة من أساتذة واستشاريي الباثولوجيا الإكلينيكية والتحاليل.'
  }
];
