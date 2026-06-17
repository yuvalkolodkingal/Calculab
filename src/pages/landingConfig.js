// Landing Page Configuration
// Enable/disable sections easily by setting enabled to true/false

export const landingConfig = {
  header: {
    enabled: true,
    sticky: true,
    logo: "Calculab",
    navLinks: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact Us", href: "#contact" }
    ]
  },
  
  hero: {
    enabled: true,
    headline: "Accurate Lab<br class='mobile-break' /> Calculations, Fast",
    subheadline: "39 verified calculators for molecular biology and biochemistry. Runs in your browser, works offline at the bench.",
    primaryCTA: "Get Started",
    secondaryCTA: "Explore Calculators",
    trustRow: {
      items: [
        { label: "39+ Calculators", icon: "Calculator" },
        { label: "Free to Use", icon: "Sparkles" },
        { label: "Secure", icon: "Lock" }
      ]
    },
    decorations: []  // Decorative floating icons disabled
  },
  
  betaDisclaimer: {
    enabled: false,
    icon: "AlertCircle",
    title: "Beta Version",
    message: "CalcuLab is currently in beta. While we strive for accuracy, please verify critical calculations independently. We welcome your feedback to help us improve!"
  },
  
  features: {
    enabled: true,
    title: "Built for Daily Bench Work",
    items: [
      {
        icon: "Droplet",
        title: "Solution & Dilutions",
        description: "Molarity, percent solutions, C1V1 dilutions, and serial dilution calculators for precise solution preparation."
      },
      {
        icon: "BarChart3",
        title: "Spectrophotometry",
        description: "Beer-Lambert law, nucleic acid quantification, protein A280, and Bradford assay calculators."
      },
      {
        icon: "Dna",
        title: "PCR & qPCR Tools",
        description: "ΔCt, ΔΔCt, fold change, Pfaffl ratio, copy number, and amplification efficiency calculators."
      },
      {
        icon: "Bug",
        title: "Cell Culture",
        description: "Hemocytometer counting, CFU calculations, cell seeding, and split ratio calculators."
      },
      {
        icon: "FlaskConical",
        title: "Enzyme Kinetics",
        description: "Enzyme activity, Michaelis-Menten kinetics, and Lineweaver-Burk plot calculations."
      },
      {
        icon: "TrendingUp",
        title: "Statistics",
        description: "Mean, standard deviation, standard error, and basic statistical analysis tools."
      }
    ]
  },
  
  howItWorks: {
    enabled: true,
    title: "How It Works",
    steps: [
      {
        number: 1,
        icon: "Search",
        title: "Choose Calculator",
        description: "Select from 30+ specialized calculators organized by category."
      },
      {
        number: 2,
        icon: "Keyboard",
        title: "Enter Values",
        description: "Input your experimental parameters with helpful guidance."
      },
      {
        number: 3,
        icon: "CheckCircle",
        title: "Get Validated Results",
        description: "Receive accurate calculations instantly with clear explanations."
      }
    ]
  },
  
  testimonials: {
    enabled: false,
    title: "Trusted by Researchers Worldwide",
    quotes: [
      {
        text: "Calculab has streamlined our lab workflows. The interface is intuitive and the calculations are always accurate.",
        name: "Dr. Sarah Chen",
        role: "Postdoctoral Researcher",
        institution: "Stanford University"
      },
      {
        text: "An essential tool for our molecular biology lab. It saves us hours of manual calculations every week.",
        name: "Dr. Michael Rodriguez",
        role: "Assistant Professor",
        institution: "MIT"
      },
      {
        text: "The PCR and qPCR calculators are incredibly helpful. This is now our go-to resource for gene expression analysis.",
        name: "Dr. Emily Watson",
        role: "Lab Manager",
        institution: "Harvard Medical School"
      }
    ],
    institutions: [
      { name: "Stanford", logo: "GraduationCap" },
      { name: "MIT", logo: "GraduationCap" },
      { name: "Harvard", logo: "GraduationCap" },
      { name: "UC Berkeley", logo: "GraduationCap" },
      { name: "Caltech", logo: "GraduationCap" }
    ]
  },
  
  calculators: {
    enabled: true,  // Enabled to showcase the full index of 30+ tools
    title: "Explore Our Calculators",
    categories: [
      {
        name: "Solution Preparation",
        count: 11,
        icon: "Droplet",
        tools: ["Molarity Calculator", "Percent Solution", "C1V1 Dilution", "Serial Dilution"],
        color: "hsl(210, 100%, 50%)"
      },
      {
        name: "Spectrophotometry",
        count: 5,
        icon: "BarChart3",
        tools: ["Beer-Lambert Law", "NA Quantification", "Protein A280", "Bradford Assay"],
        color: "hsl(195, 100%, 45%)"
      },
      {
        name: "PCR & qPCR",
        count: 11,
        icon: "Dna",
        tools: ["ΔCt Calculator", "ΔΔCt Calculator", "Fold Change", "Copy Number"],
        color: "hsl(270, 100%, 60%)"
      },
      {
        name: "Cell Culture",
        count: 5,
        icon: "Bug",
        tools: ["Hemocytometer", "CFU Calculator", "Cell Seeding", "Split Ratio"],
        color: "hsl(150, 100%, 40%)"
      },
      {
        name: "Enzyme Kinetics",
        count: 2,
        icon: "FlaskConical",
        tools: ["Enzyme Activity", "Michaelis-Menten"],
        color: "hsl(30, 100%, 50%)"
      },
      {
        name: "Statistics & More",
        count: 9,
        icon: "TrendingUp",
        tools: ["Basic Statistics", "Unit Conversions", "DNA Tools", "Batch Calculator"],
        color: "hsl(330, 100%, 50%)"
      }
    ]
  },
  
  faq: {
    enabled: true,
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is CalcuLab and who is it for?",
        answer: "CalcuLab is a client-side suite of 39 molecular biology and biochemistry calculators designed for researchers, lab technicians, and students. It helps automate daily lab mathematics like dilution factors, molarity adjustments, qPCR analysis, and cell seeding."
      },
      {
        question: "How does CalcuLab ensure calculation correctness?",
        answer: "All calculators on CalcuLab are built using peer-reviewed standard scientific equations (including the Beer-Lambert law, Michaelis-Menten kinetics, and Henderson-Hasselbalch equation) and cross-validated against reliable benchmark Excel sheets, peer tools, and academic reference materials.",
        references: [
          { label: "Beer–Lambert law", url: "https://en.wikipedia.org/wiki/Beer%E2%80%93Lambert_law" },
          { label: "Michaelis–Menten kinetics", url: "https://en.wikipedia.org/wiki/Michaelis%E2%80%93Menten_kinetics" },
          { label: "Henderson–Hasselbalch equation", url: "https://en.wikipedia.org/wiki/Henderson%E2%80%93Hasselbalch_equation" }
        ]
      },
      {
        question: "Are my input values and experimental data secure?",
        answer: "Yes, 100%. CalcuLab performs all computations entirely client-side inside your browser. No data, numbers, or experimental inputs are sent to any external server or database, offering complete privacy and proprietary protection for your experimental designs."
      },
      {
        question: "Does CalcuLab work offline in the laboratory?",
        answer: "Yes. CalcuLab is built as a Progressive Web App (PWA) with complete offline caching capabilities via Service Workers. Once you load the application, you can run all 39 calculators offline on your laboratory workbench, even without an internet connection."
      }
    ]
  },
  
  contact: {
    enabled: true,
    badge: "",
    title: "Report a bug or request a calculator",
    description: "Found an error or need a tool we do not have yet? Tell us. Every report goes straight to the team.",
    feedbackLink: "https://forms.gle/pdPBKBYUNTwHTjR9A",
    email: "calculab.help@proton.me"
  },
  
  footer: {
    enabled: true,
    logo: "Calculab",
    credits: "Made by Yuval Kolodkin-Gal & Avichay Nahami",
    lastUpdated: "Last Updated: June 17, 2026",
    copyright: "© 2026 Calculab.Bio, All rights reserved.",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact Us", href: "#contact" }
    ]
  }
};
