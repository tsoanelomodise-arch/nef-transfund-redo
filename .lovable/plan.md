

# Add Sector Icons to Market Segments Priority Sectors

## Overview
Add the 6 uploaded icons to their matching priority sector cards, and generate a similar-style icon for "Manufacturing". Each icon will be placed at the top of its card, replacing the current black bar divider, sized consistently to fit the established card design.

## Icon-to-sector mapping
| Icon file | Sector card |
|-----------|-------------|
| RenewableEnergy.gif | Renewable energy |
| Mining_services.png | Mining services |
| Agro-processing.png | Agro-processing |
| Information_communication_technology.png | Information & communication technology |
| Infrastructure.png | Infrastructure |
| (generate SVG inline) | Manufacturing |
| Services_and_business_process_outsourcing.png | Services and business process outsourcing |

## Manufacturing icon
Since no icon was provided for "Manufacturing", a simple black silhouette SVG will be generated inline -- a gear/cog motif consistent with the industrial, black-on-white style of the other icons.

## Technical changes

### 1. Copy icon assets to `public/images/sectors/`
- `RenewableEnergy.gif` -> `public/images/sectors/renewable-energy.gif`
- `Mining_services.png` -> `public/images/sectors/mining-services.png`
- `Agro-processing.png` -> `public/images/sectors/agro-processing.png`
- `Information_communication_technology.png` -> `public/images/sectors/ict.png`
- `Infrastructure.png` -> `public/images/sectors/infrastructure.png`
- `Services_and_business_process_outsourcing.png` -> `public/images/sectors/services-bpo.png`

### 2. Update `src/components/path-to-funding/MarketSegmentsContent.tsx`
- Add an `icon` field to each sector object in the `sectors` array -- either an image path string or inline SVG markup for Manufacturing
- In the card rendering, replace the `<div className="w-10 h-1 bg-black mb-5" />` bar with an `<img>` (or inline SVG for Manufacturing) sized at approximately `w-12 h-12` (48x48px), with `object-contain` to maintain aspect ratio
- Keep the black bar as a fallback if no icon is present (though all 7 will have icons)
- No other card styling, typography, spacing, or layout changes

### What stays unchanged
- All card dimensions, padding, hover effects, typography
- Foundations section, intro section, hero section
- Navbar, Footer, and all other pages

