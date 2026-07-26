export type PortfolioLang = 'en' | 'id';

export type LocalizedString = Record<PortfolioLang, string>;

export type PortfolioCategory = 'product' | 'agency' | 'in-house';

export interface PortfolioProject {
  slug: string;
  cat: PortfolioCategory;
  years: string;
  domain: string;
  name: string;
  img?: string;
  role: LocalizedString;
  summary: LocalizedString;
  detail: LocalizedString;
  figures: { value: string; label: LocalizedString }[];
  points: Record<PortfolioLang, string[]>;
  stack: string[];
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = ['product', 'agency', 'in-house'];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'paper-id-platform',
    cat: 'product',
    years: '2019 — 2025',
    domain: 'paper.id',
    name: 'Paper.id Platform',
    role: { en: 'Technical Lead', id: 'Technical Lead' },
    summary: {
      en: 'Invoicing and receivables platform for Indonesian SMEs. Led the platform architecture and the team behind 10M+ transactions a month.',
      id: 'Platform invoicing dan piutang untuk UKM Indonesia. Memimpin arsitektur platform dan tim di balik 10 juta+ transaksi per bulan.',
    },
    detail: {
      en: 'Six years across three roles on the same product — from building REST APIs to leading a cross-functional team of 15+ engineers across Backend, Frontend and QA. Owned the technical roadmap, the microservices migration and the engineering standards the team ships against.',
      id: 'Enam tahun melewati tiga peran di produk yang sama — dari membangun REST API sampai memimpin tim lintas fungsi 15+ engineer di Backend, Frontend, dan QA. Memegang roadmap teknis, migrasi microservices, dan standar engineering yang dipakai tim.',
    },
    figures: [
      { value: '10M+', label: { en: 'transactions / month', id: 'transaksi / bulan' } },
      { value: '15+', label: { en: 'engineers led', id: 'engineer dipimpin' } },
      { value: '40%', label: { en: 'faster deployments', id: 'deployment lebih cepat' } },
    ],
    points: {
      en: [
        'Architected a microservices platform handling 10M+ transactions monthly.',
        'Cut deployment time by 40% through CI/CD pipeline optimisation.',
        'Hired 8 senior engineers, raising team capability by 30%.',
        'Established coding standards and review processes, cutting bugs by 35%.',
      ],
      id: [
        'Merancang platform microservices yang menangani 10 juta+ transaksi per bulan.',
        'Memangkas waktu deployment 40% lewat optimasi pipeline CI/CD.',
        'Merekrut 8 senior engineer, menaikkan kapabilitas tim 30%.',
        'Menyusun coding standard dan proses review, menurunkan bug 35%.',
      ],
    },
    stack: ['Go', 'PHP', 'RabbitMQ', 'MySQL', 'Redis', 'Vue.js', 'CI/CD'],
  },
  {
    slug: 'paper-payment-gateway',
    cat: 'product',
    years: '2022 — 2023',
    domain: 'payments.paper.id',
    name: 'Payment Gateway Integration',
    role: { en: 'Senior Backend Engineer', id: 'Senior Backend Engineer' },
    summary: {
      en: 'Payment rails processing $2M+ in daily transactions, built for uptime first and migrated off the monolith without downtime.',
      id: 'Jalur pembayaran yang memproses $2 juta+ transaksi harian, dibangun dengan uptime sebagai prioritas dan dimigrasikan dari monolith tanpa downtime.',
    },
    detail: {
      en: 'Designed and integrated the payment gateway layer for a platform where every minute of downtime is money. The same effort carried the monolith-to-microservices migration and a round of query work that took critical pages from five seconds to a fraction of one.',
      id: 'Merancang dan mengintegrasikan lapisan payment gateway untuk platform di mana tiap menit downtime berarti uang. Pekerjaan yang sama membawa migrasi monolith ke microservices dan optimasi query yang memangkas halaman kritis dari lima detik jadi sepersekian detik.',
    },
    figures: [
      { value: '$2M+', label: { en: 'daily transactions', id: 'transaksi harian' } },
      { value: '99.9%', label: { en: 'uptime', id: 'uptime' } },
      { value: '60%', label: { en: 'faster response', id: 'respons lebih cepat' } },
    ],
    points: {
      en: [
        'Designed payment gateway integration processing $2M+ in daily transactions.',
        'Led the monolith-to-microservices migration, improving response time by 60%.',
        'Optimised database queries, cutting load time from 5s to 300ms.',
        'Maintained 99.9% uptime for critical payment services.',
      ],
      id: [
        'Merancang integrasi payment gateway yang memproses $2 juta+ transaksi harian.',
        'Memimpin migrasi monolith ke microservices, mempercepat response time 60%.',
        'Mengoptimasi query database, memangkas load time dari 5 detik ke 300ms.',
        'Menjaga uptime 99,9% untuk layanan pembayaran kritikal.',
      ],
    },
    stack: ['Go', 'MySQL', 'Redis', 'REST', 'RabbitMQ'],
  },
  {
    slug: 'sobat-bisnis',
    cat: 'product',
    years: '2026 — now',
    domain: 'sobatbisnis.group',
    name: 'Sobat Bisnis Group',
    role: { en: 'Senior Full Stack Developer', id: 'Senior Full Stack Developer' },
    summary: {
      en: 'Current work: full-stack product features in Java and AngularJS, shipped end to end from backend services to the UI.',
      id: 'Pekerjaan sekarang: fitur produk full-stack dengan Java dan AngularJS, dikerjakan end to end dari layanan backend sampai UI.',
    },
    detail: {
      en: 'A hybrid full-time role in Jakarta, building and shipping end-to-end web experiences across backend services and a modern UI layer, with delivery held to client standards.',
      id: 'Peran full-time hybrid di Jakarta, membangun dan merilis pengalaman web end-to-end di layanan backend maupun lapisan UI modern, dengan kualitas rilis sesuai standar klien.',
    },
    figures: [
      { value: 'Java', label: { en: 'primary backend', id: 'backend utama' } },
      { value: 'AngularJS', label: { en: 'frontend', id: 'frontend' } },
      { value: 'Hybrid', label: { en: 'jakarta, id', id: 'jakarta, id' } },
    ],
    points: {
      en: [
        'Building full-stack product features with Java and AngularJS.',
        'Shipping end-to-end web experiences across backend services and modern UI.',
        'Delivering maintainable code that meets client standards and expectations.',
      ],
      id: [
        'Membangun fitur produk full-stack dengan Java dan AngularJS.',
        'Merilis pengalaman web end-to-end dari layanan backend sampai UI modern.',
        'Menulis kode maintainable sesuai standar dan ekspektasi klien.',
      ],
    },
    stack: ['Java', 'AngularJS', 'REST', 'MySQL'],
  },
  {
    slug: 'bandingin',
    cat: 'in-house',
    years: '2018 — 2019',
    domain: 'bandingin.com',
    name: 'Bandingin.com',
    img: 'https://i.imgur.com/FAfriKi.png',
    role: { en: 'Full Stack Developer', id: 'Full Stack Developer' },
    summary: {
      en: 'Insurance comparison platform — led end-to-end development, from quote engine to the public-facing site.',
      id: 'Platform perbandingan asuransi — memimpin pengembangan end-to-end, dari mesin kuotasi sampai situs publiknya.',
    },
    detail: {
      en: 'An in-house product that turns a slow, broker-mediated buying process into a self-serve comparison. Responsibility ran the whole width of the stack: data model, quote logic, integrations and the interface people actually buy through.',
      id: 'Produk in-house yang mengubah proses beli asuransi lewat broker yang lambat jadi perbandingan self-serve. Tanggung jawabnya menyeluruh: model data, logika kuotasi, integrasi, sampai antarmuka tempat orang benar-benar membeli.',
    },
    figures: [
      { value: 'E2E', label: { en: 'ownership', id: 'kepemilikan' } },
      { value: '1 yr', label: { en: 'build to launch', id: 'bangun ke rilis' } },
      { value: 'Web', label: { en: 'platform', id: 'platform' } },
    ],
    points: {
      en: [
        'Led end-to-end development for an insurance comparison platform.',
        'Built the comparison and quote flow across backend and frontend.',
        'Owned releases as the sole full-stack developer on the product.',
      ],
      id: [
        'Memimpin pengembangan end-to-end platform perbandingan asuransi.',
        'Membangun alur perbandingan dan kuotasi di sisi backend maupun frontend.',
        'Memegang rilis sebagai satu-satunya full-stack developer di produk ini.',
      ],
    },
    stack: ['PHP', 'MySQL', 'JavaScript', 'REST'],
  },
  {
    slug: 'indowebdeveloper',
    cat: 'agency',
    years: '2017 — 2018',
    domain: 'indowebdeveloper.com',
    name: 'Indowebdeveloper',
    img: 'https://i.imgur.com/wCIAxrk.png',
    role: { en: 'Full Stack Web Developer', id: 'Full Stack Web Developer' },
    summary: {
      en: 'Agency delivery work: pixel-perfect UI implementation plus the query optimisation that took page loads from 5s to 300ms.',
      id: 'Kerja agensi: implementasi UI pixel-perfect plus optimasi query yang memangkas load halaman dari 5 detik ke 300ms.',
    },
    detail: {
      en: 'Client sites delivered on agency timelines — design handoff to production build — with a parallel effort on performance: indexing, query tuning and caching on the sites that had grown slow.',
      id: 'Situs klien yang dikerjakan dengan tenggat agensi — dari handoff desain sampai build produksi — dengan upaya paralel di sisi performa: indexing, tuning query, dan caching pada situs yang mulai lambat.',
    },
    figures: [
      { value: '5s → 300ms', label: { en: 'page load', id: 'load halaman' } },
      { value: '70%', label: { en: 'less db load', id: 'beban db turun' } },
      { value: 'Pixel', label: { en: 'perfect handoff', id: 'handoff presisi' } },
    ],
    points: {
      en: [
        'Delivered PSD-to-HTML slicing and pixel-perfect UI implementation.',
        'Optimised critical queries, reducing page load from 5s to 300ms.',
        'Implemented caching strategies that cut database load by 70%.',
      ],
      id: [
        'Mengerjakan slicing PSD-to-HTML dan implementasi UI pixel-perfect.',
        'Mengoptimasi query kritikal, memangkas load halaman dari 5 detik ke 300ms.',
        'Menerapkan strategi caching yang menurunkan beban database 70%.',
      ],
    },
    stack: ['PHP', 'MySQL', 'HTML/CSS', 'jQuery'],
  },
  {
    slug: 'outpost-interactive',
    cat: 'agency',
    years: '2016',
    domain: 'outpostinteractive.com',
    name: 'Outpost Interactive',
    img: 'https://i.imgur.com/mjGlkKP.png',
    role: { en: 'Full Stack Engineer', id: 'Full Stack Engineer' },
    summary: {
      en: 'Digital agency work — websites taken from concept to launch, with a hand in the system architecture behind them.',
      id: 'Kerja agensi digital — situs dibawa dari konsep sampai rilis, sekaligus ikut menyusun arsitektur sistem di baliknya.',
    },
    detail: {
      en: 'Full-stack feature work across client engagements, from concept through launch, plus contributions to the architecture the agency reused between projects.',
      id: 'Pekerjaan fitur full-stack di berbagai engagement klien, dari konsep sampai rilis, plus kontribusi pada arsitektur yang dipakai ulang antar proyek agensi.',
    },
    figures: [
      { value: 'Multi', label: { en: 'client sites', id: 'situs klien' } },
      { value: 'Full', label: { en: 'stack scope', id: 'cakupan stack' } },
      { value: '2016', label: { en: 'engagement', id: 'engagement' } },
    ],
    points: {
      en: [
        'Built full-stack features and contributed to system architecture.',
        'Took client websites from concept to launch.',
        'Delivered engaging user experiences on agency timelines.',
      ],
      id: [
        'Membangun fitur full-stack dan berkontribusi pada arsitektur sistem.',
        'Membawa situs klien dari konsep sampai rilis.',
        'Menghasilkan pengalaman pengguna yang menarik dengan tenggat agensi.',
      ],
    },
    stack: ['PHP', 'MySQL', 'JavaScript'],
  },
  {
    slug: 'pesanlab',
    cat: 'in-house',
    years: '2016',
    domain: 'pesanlab.com',
    name: 'Pesanlab.com',
    img: 'https://i.imgur.com/79ze4Yy.png',
    role: { en: 'Frontend Web Developer', id: 'Frontend Web Developer' },
    summary: {
      en: 'Lab-test booking site — the front end of a service where a confused user simply does not complete the booking.',
      id: 'Situs pemesanan tes lab — sisi front end dari layanan di mana pengguna yang bingung tidak akan menyelesaikan pemesanan.',
    },
    detail: {
      en: 'Frontend development for a healthcare booking product: turning clinical catalogues and scheduling rules into an interface an ordinary patient can get through in one sitting.',
      id: 'Pengembangan frontend untuk produk pemesanan layanan kesehatan: menerjemahkan katalog klinis dan aturan penjadwalan jadi antarmuka yang bisa diselesaikan pasien awam dalam sekali duduk.',
    },
    figures: [
      { value: 'Health', label: { en: 'sector', id: 'sektor' } },
      { value: 'Web', label: { en: 'platform', id: 'platform' } },
      { value: '2016', label: { en: 'shipped', id: 'dirilis' } },
    ],
    points: {
      en: [
        'Developed the Pesanlab.com booking front end.',
        'Implemented responsive layouts across the catalogue and checkout flow.',
        'Worked directly with product to simplify the booking path.',
      ],
      id: [
        'Mengembangkan front end pemesanan Pesanlab.com.',
        'Mengimplementasi layout responsif di katalog dan alur checkout.',
        'Bekerja langsung dengan tim produk untuk menyederhanakan alur pemesanan.',
      ],
    },
    stack: ['HTML/CSS', 'JavaScript', 'Responsive'],
  },
  {
    slug: 'homecare-id',
    cat: 'in-house',
    years: '2016',
    domain: 'homecare.id',
    name: 'Homecare.id',
    img: 'https://i.imgur.com/cxpHhNN.png',
    role: { en: 'Frontend Web Developer', id: 'Frontend Web Developer' },
    summary: {
      en: 'Healthcare platform front end — home-visit services presented clearly enough to be trusted with a family member.',
      id: 'Front end platform kesehatan — layanan kunjungan rumah disajikan cukup jelas untuk dipercaya mengurus anggota keluarga.',
    },
    detail: {
      en: 'Frontend build for a home healthcare platform, covering the service catalogue, the request flow and the responsive behaviour that carries most of its traffic on phones.',
      id: 'Pembangunan frontend untuk platform layanan kesehatan rumahan, mencakup katalog layanan, alur permintaan, dan perilaku responsif yang menopang mayoritas trafik dari ponsel.',
    },
    figures: [
      { value: 'Health', label: { en: 'sector', id: 'sektor' } },
      { value: 'Mobile', label: { en: 'first traffic', id: 'trafik utama' } },
      { value: '2016', label: { en: 'shipped', id: 'dirilis' } },
    ],
    points: {
      en: [
        'Developed the Homecare.id healthcare platform website.',
        'Built the service catalogue and request flow in the browser layer.',
        'Ensured the experience held up on the mobile traffic it mostly serves.',
      ],
      id: [
        'Mengembangkan situs platform kesehatan Homecare.id.',
        'Membangun katalog layanan dan alur permintaan di lapisan browser.',
        'Memastikan pengalamannya tetap baik di trafik mobile yang mendominasi.',
      ],
    },
    stack: ['HTML/CSS', 'JavaScript', 'Responsive'],
  },
];

export const PORTFOLIO_COPY = {
  en: {
    kicker: '// selected works',
    title: 'Systems, platforms and sites I have shipped.',
    lede: 'Eight years of professional work — from agency websites delivered to a deadline, to a payments platform carrying $2M a day. Each entry lists the role I actually held, the stack, and what changed because the work shipped.',
    ctaMail: 'send an email',
    ctaLinkedin: 'view linkedin',
    readMore: 'read case →',
    highlights: '// highlights',
    stack: '// stack',
    askAbout: 'ask about this project',
    close: 'close',
    ctaKicker: '// always building',
    ctaTitle: 'Have a complex problem?',
    ctaBody:
      "I bring eight years of engineering depth and leadership experience. Let's talk about how I can help your team ship faster and build better.",
    location: 'jakarta, indonesia · open to remote',
    all: 'all',
    count: (n: number) => `${n} projects`,
  },
  id: {
    kicker: '// karya terpilih',
    title: 'Sistem, platform, dan situs yang sudah saya rilis.',
    lede: 'Delapan tahun kerja profesional — dari situs agensi dengan tenggat ketat sampai platform pembayaran yang memproses $2 juta per hari. Tiap entri memuat peran yang benar-benar saya pegang, stack-nya, dan apa yang berubah setelah rilis.',
    ctaMail: 'kirim email',
    ctaLinkedin: 'lihat linkedin',
    readMore: 'baca studi kasus →',
    highlights: '// sorotan',
    stack: '// stack',
    askAbout: 'tanya soal proyek ini',
    close: 'tutup',
    ctaKicker: '// selalu membangun',
    ctaTitle: 'Punya masalah teknis yang rumit?',
    ctaBody:
      'Saya membawa delapan tahun kedalaman engineering dan pengalaman memimpin tim. Mari bicara soal bagaimana saya bisa membantu tim Anda rilis lebih cepat dan membangun lebih baik.',
    location: 'jakarta, indonesia · terbuka untuk remote',
    all: 'semua',
    count: (n: number) => `${n} proyek`,
  },
} as const;

export const PORTFOLIO_METRICS = {
  en: [
    { value: '8+', label: 'years professional' },
    { value: '20+', label: 'projects delivered' },
    { value: '10M+', label: 'transactions / month' },
    { value: '15+', label: 'engineers led' },
  ],
  id: [
    { value: '8+', label: 'tahun profesional' },
    { value: '20+', label: 'proyek dirilis' },
    { value: '10M+', label: 'transaksi / bulan' },
    { value: '15+', label: 'engineer dipimpin' },
  ],
} as const;

export const PORTFOLIO_EMAIL = 'yuko.pangestu@gmail.com';
