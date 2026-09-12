// عدّل البيانات هنا فقط، وستنعكس تلقائيًا على كل أقسام الموقع.

export const site = {
  name: "معهد بنين شنبارة الميمونة الأزهري",
  tagline: "(الابتدائي / الإعدادي)",
  heroImage: "/assets/hero.jpg", // ضع صورة المعهد هنا بنفس الاسم داخل مجلد public/assets
  address: "شنبارة الميمونة",
  phone: "01000000000",
};

export const vision = {
  title: "رؤيتنا",
  text: "أن نكون صرحًا أزهريًا رائدًا في تحفيظ القرآن الكريم وتعليم العلوم الشرعية والحديثة معًا، يخرّج جيلًا متزنًا يجمع بين أصالة الأزهر الشريف ومتطلبات العصر.",
};

export const mission = {
  title: "رسالتنا",
  text: "تقديم تعليم أزهري متكامل قائم على القرآن الكريم والسنة النبوية، ورعاية طلابنا فكريًا وسلوكيًا ووجدانيًا، بأساليب تربوية حديثة وبيئة آمنة ومحفزة على التميز.",
};

export const gallery = [
  { src: "/assets/gallery-1.jpg", alt: "مبنى المعهد", size: "wide" },
  { src: "/assets/gallery-2.jpg", alt: "حصة تحفيظ القرآن الكريم", size: "tall" },
  { src: "/assets/gallery-3.jpg", alt: "فناء المعهد", size: "normal" },
  { src: "/assets/gallery-4.jpg", alt: "حصة دراسية", size: "normal" },
  { src: "/assets/gallery-5.jpg", alt: "أنشطة الطلاب", size: "wide" },
] as const;

export const classes = [
  { id: 1, label: "الصف الأول", stage: "ابتدائي" },
  { id: 2, label: "الصف الثاني", stage: "ابتدائي" },
  { id: 3, label: "الصف الثالث", stage: "ابتدائي" },
  { id: 4, label: "الصف الرابع", stage: "ابتدائي" },
  { id: 5, label: "الصف الخامس", stage: "ابتدائي" },
  { id: 6, label: "الصف السادس", stage: "ابتدائي" },
  { id: 7, label: "الأول الإعدادي", stage: "إعدادي" },
  { id: 8, label: "الثاني الإعدادي", stage: "إعدادي" },
  { id: 9, label: "الثالث الإعدادي", stage: "إعدادي" },
] as const;
