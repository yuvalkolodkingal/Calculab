# Landing Page Images

This directory should contain the mockup images used in the landing page hero section.

## Required Images

Place the following images in the `/public` directory:

### 1. `hero-mockup.png`
**Purpose:** Main browser mockup image shown in the hero section  
**Recommended Dimensions:** 800x600px or similar 4:3 ratio  
**Description:** Screenshot or mockup of the calculator interface in a browser window  
**Usage:** Displayed in the large browser mockup frame in the hero section

### 2. `mobile-mockup.png`
**Purpose:** Mobile device mockup shown floating over the browser mockup  
**Recommended Dimensions:** 375x812px (iPhone size) or similar mobile ratio  
**Description:** Screenshot or mockup of the calculator interface on a mobile device  
**Usage:** Displayed in the smaller floating mobile frame in the hero section

## Image Guidelines

- **Format:** PNG with transparent background preferred, or JPG
- **Quality:** High resolution for crisp display on retina screens
- **Size:** Optimize file size while maintaining quality (use tools like TinyPNG)
- **Content:** Should show the calculator interface in use with realistic data
- **Branding:** Maintain consistent colors matching the primary blue (#007bff)

## Fallback Behavior

If images are not found, the mockup frames will show:
- A gradient background for the browser mockup
- An empty white frame for the mobile mockup

## Example Structure

```
public/
├── logo.svg
├── hero-mockup.png       ← Browser mockup (required)
├── mobile-mockup.png     ← Mobile mockup (required)
└── README_IMAGES.md      ← This file
```

## Testing

After adding images, verify they display correctly by:
1. Starting the dev server: `npm run dev`
2. Navigating to the landing page
3. Checking that both mockups display properly
4. Verifying images are crisp and properly sized
