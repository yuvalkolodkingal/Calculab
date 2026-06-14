# Landing Page Configuration Guide

## Overview
The Calculab landing page is designed to be highly customizable. You can easily enable/disable sections and modify content through the `landingConfig.js` file.

## Quick Start

### Enabling/Disabling Sections
Each section has an `enabled` property that controls its visibility:

```javascript
export const landingConfig = {
  header: {
    enabled: true,  // Set to false to hide the header
    // ... other config
  },
  hero: {
    enabled: true,  // Set to false to hide the hero section
    // ... other config
  },
  // ... other sections
};
```

## Available Sections

### 1. Header (Sticky Navigation)
**Location:** `landingConfig.header`
- **enabled**: Show/hide the sticky header
- **sticky**: Make the header stick to top on scroll
- **logo**: Brand name text
- **navLinks**: Array of navigation links

**Example:**
```javascript
header: {
  enabled: true,
  sticky: true,
  logo: "Calculab",
  navLinks: [
    { label: "Features", href: "#features" },
    { label: "Calculators", href: "#calculators" }
  ]
}
```

### 2. Hero Section
**Location:** `landingConfig.hero`
- **enabled**: Show/hide hero section
- **betaBadge**: Text for beta badge
- **headline**: Main heading text
- **subheadline**: Supporting text
- **primaryCTA**: Primary button text
- **secondaryCTA**: Secondary button text
- **trustRow**: Trust indicators with icons
- **decorations**: Array of emoji decorations

**Example:**
```javascript
hero: {
  enabled: true,
  betaBadge: "BETA",
  headline: "Get Accurate Lab Calculations — Fast",
  trustRow: {
    items: [
      { label: "30+ Calculators", icon: "🧮" },
      { label: "Free to Use", icon: "✨" }
    ]
  }
}
```

### 3. Features Section
**Location:** `landingConfig.features`
- **enabled**: Show/hide features section
- **title**: Section heading
- **items**: Array of feature cards (icon, title, description)

**Example:**
```javascript
features: {
  enabled: true,
  title: "Everything You Need for Lab Calculations",
  items: [
    {
      icon: "💧",
      title: "Solution & Dilutions",
      description: "Molarity, percent solutions, C1V1 dilutions..."
    }
  ]
}
```

### 4. How It Works Section
**Location:** `landingConfig.howItWorks`
- **enabled**: Show/hide how it works section
- **title**: Section heading
- **steps**: Array of steps (number, icon, title, description)

**Example:**
```javascript
howItWorks: {
  enabled: true,
  title: "How It Works",
  steps: [
    {
      number: 1,
      icon: "🔍",
      title: "Choose Calculator",
      description: "Select from 30+ specialized calculators..."
    }
  ]
}
```

### 5. Testimonials Section
**Location:** `landingConfig.testimonials`
- **enabled**: Show/hide testimonials section
- **title**: Section heading
- **quotes**: Array of testimonials (text, name, role, institution)
- **institutions**: Array of institution logos

**Example:**
```javascript
testimonials: {
  enabled: true,
  title: "Trusted by Researchers Worldwide",
  quotes: [
    {
      text: "Calculab has streamlined our lab workflows...",
      name: "Dr. Sarah Chen",
      role: "Postdoctoral Researcher",
      institution: "Stanford University"
    }
  ],
  institutions: [
    { name: "Stanford", logo: "🎓" }
  ]
}
```

### 6. Calculators Section
**Location:** `landingConfig.calculators`
- **enabled**: Show/hide calculators section
- **title**: Section heading
- **categories**: Array of calculator categories (name, count, icon, tools, color)

**Example:**
```javascript
calculators: {
  enabled: true,
  title: "Explore Our Calculators",
  categories: [
    {
      name: "Solution Preparation",
      count: 8,
      icon: "💧",
      tools: ["Molarity Calculator", "Percent Solution"],
      color: "hsl(210, 100%, 50%)"
    }
  ]
}
```

### 7. Contact Section
**Location:** `landingConfig.contact`
- **enabled**: Show/hide contact section
- **badge**: Badge text
- **title**: Section heading
- **description**: Description text
- **feedbackLink**: Google Form URL
- **email**: Contact email

**Example:**
```javascript
contact: {
  enabled: true,
  badge: "Help Us Improve",
  title: "We'd Love Your Feedback",
  feedbackLink: "https://forms.gle/pdPBKBYUNTwHTjR9A",
  email: "calculab.help@proton.me"
}
```

### 8. Footer
**Location:** `landingConfig.footer`
- **enabled**: Show/hide footer
- **tagline**: Brand tagline
- **columns**: Array of link columns (title, links)
- **social**: Array of social links
- **copyright**: Copyright text
- **disclaimer**: Disclaimer text

**Example:**
```javascript
footer: {
  enabled: true,
  tagline: "Accurate calculations for modern lab research",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" }
      ]
    }
  ],
  social: [
    { name: "GitHub", icon: "💻", href: "#" }
  ]
}
```

## Common Use Cases

### Disable a Section Temporarily
```javascript
// In landingConfig.js
testimonials: {
  enabled: false,  // Hides the entire testimonials section
  // ... rest of config stays the same
}
```

### Change CTA Button Text
```javascript
hero: {
  enabled: true,
  primaryCTA: "Start Calculating",  // Changed from "Get Started"
  secondaryCTA: "View All Tools"    // Changed from "Explore Calculators"
}
```

### Add New Trust Indicator
```javascript
trustRow: {
  items: [
    { label: "30+ Calculators", icon: "🧮" },
    { label: "Free to Use", icon: "✨" },
    { label: "No Sign-up Required", icon: "🚀" }  // New item
  ]
}
```

### Update Institution Logos
```javascript
institutions: [
  { name: "Stanford", logo: "🎓" },
  { name: "MIT", logo: "🎓" },
  { name: "Your University", logo: "🏛️" }  // Add your institution
]
```

## Design Tokens

The landing page uses HSL color tokens for easy theming. You can modify these in `LandingPage.css`:

```css
:root {
  --primary-h: 211;     /* Hue (0-360) */
  --primary-s: 100%;    /* Saturation */
  --primary-l: 50%;     /* Lightness */
}
```

## Tips

1. **Keep sections enabled by default** - Only disable if you're removing them permanently
2. **Test mobile responsive** - The layout adapts automatically but test your content
3. **Use emojis consistently** - They add personality but should match your brand
4. **Update contact info** - Make sure feedback links and emails are correct
5. **Social proof matters** - Testimonials and trust indicators increase conversions

## Support

For questions or issues, contact:
- Email: calculab.help@proton.me
- Feedback Form: https://forms.gle/pdPBKBYUNTwHTjR9A
