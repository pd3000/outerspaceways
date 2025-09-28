# Photography Portfolio Design Guidelines

## Design Approach: Reference-Based (Visual-Rich/Experience-Focused)

Drawing inspiration from leading portfolio platforms like **Behance**, **Adobe Portfolio**, and **Squarespace** to create a visually stunning photography showcase that prioritizes image presentation and emotional engagement.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark Mode: Background 220 15% 8%, Text 220 15% 95%
- Light Mode: Background 220 15% 98%, Text 220 15% 15%
- Accent: 210 85% 65% (professional blue for CTAs and links)

**Photography Focus:**
- Minimal color interference - let images be the star
- Subtle neutral grays: 220 10% 25%, 220 8% 45%, 220 6% 75%

### B. Typography
**Primary Font:** Inter (Google Fonts) - clean, modern sans-serif
- Headings: 600-700 weight
- Body text: 400 weight
- Captions: 300 weight, smaller size

**Hierarchy:**
- Hero title: 3xl-4xl on desktop, 2xl on mobile
- Section headers: xl-2xl
- Body text: base-lg
- Image captions: sm text

### C. Layout System
**Spacing Units:** Tailwind 2, 4, 6, 8, 12, 16
- Consistent rhythm using these base units
- Generous whitespace to let photography breathe
- Mobile-first responsive approach

**Grid System:**
- Desktop: 3-4 column masonry grid
- Tablet: 2-3 columns
- Mobile: Single column with full-width images

### D. Component Library

**Navigation:**
- Minimal header with logo and hamburger menu (mobile)
- Sticky navigation with subtle backdrop blur
- Clean typography-based menu items

**Gallery Components:**
- Masonry grid layout for varied image dimensions
- Lightbox modal with swipe gestures (mobile)
- Image lazy loading with subtle fade-in animation
- Hover overlay with image metadata (desktop only)

**Image Protection:**
- Disabled right-click context menu
- CSS user-select: none
- Transparent overlay divs preventing direct image access
- Low-resolution preview with full-res loading in lightbox

**Calendar Integration:**
- Clean event cards with minimal styling
- Date prominence with event details
- Mobile-friendly touch targets

**Forms:**
- Minimal input styling with subtle borders
- Focus states using accent color
- Mobile-optimized form fields

### E. Mobile-First Considerations

**Touch Interactions:**
- Minimum 44px touch targets
- Swipe gestures for gallery navigation
- Pull-to-refresh for calendar updates

**Performance:**
- Progressive image loading
- Optimized thumbnail generation
- Minimal JavaScript for core functionality

## Images Section

**Hero Image:** Large, full-viewport hero showcasing best photography work
- Placement: Homepage header, 100vh on desktop, 60vh on mobile
- Style: High-impact, professionally shot image representing portfolio quality
- Overlay: Subtle dark gradient (bottom) with photographer name and tagline

**Gallery Images:** 
- High-quality photography samples across multiple categories
- Optimized thumbnails (400-600px width) for grid display
- Full-resolution versions (1200-2000px) for lightbox viewing
- Watermarked versions for protection

**About Section Image:**
- Professional headshot or behind-the-scenes photography shot
- Placement: Alongside bio text, 300-400px width on desktop

## Key Design Principles

1. **Image-First Design:** Every layout decision prioritizes photography display
2. **Minimal Interference:** UI elements complement, never compete with images
3. **Professional Polish:** Clean, gallery-quality presentation
4. **Mobile Excellence:** Touch-optimized for photography viewing on phones
5. **Protection-Minded:** Subtle but effective image protection measures

This approach creates a sophisticated, gallery-like experience that showcases photography professionally while maintaining modern web standards and mobile usability.