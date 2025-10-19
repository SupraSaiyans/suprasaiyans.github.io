# Spotlight Base Model Documentation

## Overview

The Spotlight Base Model is a design system used across multiple sections of the SupraSaiyans website. It provides a consistent, frameless, fractal-accented, data-driven layout and interaction model that emphasizes visual harmony, performance, and maintainability.

## Core Principles

1. **Frameless Design**: Content takes center stage without heavy borders or containers
2. **Fractal Accents**: Subtle curved fractal ornaments in corners for visual interest
3. **Data-Driven**: JSON-based content management with automatic ordering
4. **Performance-First**: Transform/opacity-only animations, lazy loading, CSS containment
5. **Accessible**: Respects `prefers-reduced-motion`, maintains WCAG contrast standards

## Architecture

### Layout Structure

All sections following the Spotlight base model use this three-tier structure:

1. **Featured Item** (newest)
   - Large prominent display (~3× standard card area)
   - Grid layout with image and content side-by-side
   - High-priority image loading (`fetchpriority="high"`)
   - Appears first in the data-driven sort (newest `datePublished`)

2. **Standard Cards Grid** (next 15 items for NFT Gallery, 3 for Spotlight)
   - Responsive grid layout
   - Hover-revealed captions
   - Lazy-loaded images
   - Consistent aspect ratios

3. **History List** (remaining items)
   - Minimal inline presentation
   - Tiny masked thumbnails (60×60px)
   - Title and action links only
   - Fractal clip-path on thumbnails

### Data Schema

Sections using the base model follow this JSON structure:

```json
{
  "items": [
    {
      "id": "unique-identifier",
      "number": 1,
      "title": "Item Title",
      "description": "Brief description of the item",
      "image": "path/to/image.png",
      "datePublished": "YYYY-MM-DD",
      "mintUrl": "https://example.com/mint",
      "tradeUrl": "https://example.com/trade"
    }
  ]
}
```

**Required fields:**
- `id`: Unique identifier for the item
- `number`: Sequential number for display
- `title`: Item name
- `description`: Brief description
- `image`: Path to image asset
- `datePublished`: ISO date string (YYYY-MM-DD) for automatic sorting

**Optional fields:**
- `mintUrl`: Link to mint/purchase the item
- `tradeUrl`: Link to trade/marketplace

### Automatic Ordering

Items are automatically sorted by `datePublished` in descending order (newest first):

```javascript
const sortedItems = data.items.sort((a, b) => {
    return new Date(b.datePublished) - new Date(a.datePublished);
});
```

This means:
- The newest item automatically becomes the featured item
- Next N items populate the grid (15 for NFT Gallery, 3 for Spotlight)
- Older items flow to the history list
- **No manual reordering required** - just update `datePublished` dates

## CSS Tokens

The base model exposes CSS custom properties for easy customization:

```css
:root {
    /* Spotlight Base Model Tokens */
    --spotlight-heading-color: var(--text-primary);
    --spotlight-heading-opacity: 0.9;
    --spotlight-outline-intensity: 0.3;
    --spotlight-glow-intensity: 0.4;
    --spotlight-featured-grid-span: 2;
    --spotlight-card-min-width: 250px;
    --spotlight-history-thumbnail-size: 60px;
}
```

### Token Usage

- **heading-color/opacity**: Controls section title appearance
- **outline-intensity**: Adjusts border glow on hover
- **glow-intensity**: Controls fractal accent visibility
- **featured-grid-span**: How many columns/rows featured items span
- **card-min-width**: Minimum card width before grid collapses
- **history-thumbnail-size**: Size of history list thumbnails

## Typography

### Hierarchy

Following the Spotlight model:

- **Section Heading (h1)**: Large gradient text with drop-shadow
- **Subheading (h2)**: Simple, clean, high-contrast (no gradient)
- **Featured Title**: 2em, gold color (`var(--text-gold)`)
- **Card Title**: 1.1em, gold color, Bebas Neue font
- **History Title**: 0.95em, primary color, Bebas Neue font

### Consistency Rules

1. Subheadings (h2) use `--spotlight-heading-color` and `--spotlight-heading-opacity`
2. No blue/teal gradients on subheadings (removed for clarity)
3. Featured tiles keep larger font size but match card styling
4. All interactive text maintains accessible contrast ratios

## Performance Optimizations

### CSS Containment

```css
.spotlight-featured-tile,
.nft-featured-tile {
    contain: layout style paint;
}
```

### Will-Change Management

Applied only during hover, removed after animation:

```javascript
element.addEventListener('mouseenter', function() {
    this.style.willChange = 'transform, opacity';
}, { passive: true });

element.addEventListener('mouseleave', function() {
    setTimeout(() => {
        this.style.willChange = 'auto';
    }, 300);
}, { passive: true });
```

### Image Loading Strategy

- **Featured**: `fetchpriority="high"`, `decoding="async"`, `loading="eager"`
- **Cards**: `loading="lazy"`
- **History**: `loading="lazy"`, `width` and `height` attributes to prevent CLS

### Transform-Only Animations

All animations use only `transform` and `opacity` (GPU-accelerated):

```css
.spotlight-card:hover {
    transform: translateY(-8px) scale(1.02);
}
```

**Avoid:**
- `filter` animations (except static drop-shadow)
- `box-shadow` animations
- `backdrop-filter` (replaced with solid backgrounds)

## Sections Using Base Model

### 1. Spotlight (Original)
- **Featured**: 1 item
- **Grid**: 3 cards
- **History**: Remaining items
- **Data**: `assets/data/spotlight.json`

### 2. NFT Gallery
- **Featured**: 1 item
- **Grid**: 15 cards (5×3)
- **History**: Remaining items
- **Data**: `assets/data/nft-gallery.json`

### 3. Harmonized Sections
These sections adopt the base model's visual language:
- **Lore** (Medium feed)
- **Powerlevel** (static content)
- **Over 9000 Saiyans** (social links)

Visual harmonization includes:
- Matching subheading styles
- Consistent spacing rhythm
- Shared corner treatments
- Unified hover behaviors

## Responsive Behavior

### Breakpoints

```css
/* NFT Gallery example - adjust card columns */
@media (max-width: 1200px) { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 992px) { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 768px) { 
    grid-template-columns: repeat(2, 1fr);
    /* Featured switches to single column */
}
@media (max-width: 480px) { grid-template-columns: 1fr; }
```

### Mobile Adaptations

- Featured tiles switch from 2-column to single-column
- Captions always visible on mobile (no hover reveal)
- History actions wrap to full width
- Reduced padding and margins

## Accessibility

### WCAG Compliance

- **Color Contrast**: 4.5:1 minimum for normal text
- **Focus States**: Visible keyboard focus indicators
- **Screen Readers**: Semantic HTML, ARIA labels where needed

### Motion Sensitivity

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order follows visual hierarchy
- Action links clearly focusable

## Adding a New Item

To add a new item to any base model section:

1. Add entry to the appropriate JSON file:
```json
{
  "id": "new-item-001",
  "number": 19,
  "title": "New Collection",
  "description": "Description here",
  "image": "images/NewCollection.png",
  "datePublished": "2025-02-20",
  "mintUrl": "https://...",
  "tradeUrl": "https://..."
}
```

2. Ensure image exists in the specified path
3. Save JSON file - the page will automatically:
   - Sort by date
   - Feature if newest
   - Place in grid or history based on position

**No HTML changes required!**

## Extending the Model

To apply the base model to a new section:

### 1. Add HTML Structure

```html
<section id="new-section" class="section spotlight-fractal">
    <!-- Include fractal corner SVG definitions -->
    
    <div class="section-content">
        <h1>Section Title</h1>
        <h2 style="color: var(--spotlight-heading-color); opacity: var(--spotlight-heading-opacity);">
            Subtitle
        </h2>
        
        <div id="new-featured-container">
            <div class="spotlight-loading">Loading...</div>
        </div>
        
        <div id="new-cards-grid"></div>
        
        <div id="new-history"></div>
    </div>
</section>
```

### 2. Add JavaScript

```javascript
(function() {
    'use strict';
    const DATA_URL = 'assets/data/new-section.json';
    
    async function loadData() {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        
        const sorted = data.items.sort((a, b) => 
            new Date(b.datePublished) - new Date(a.datePublished)
        );
        
        // Render featured (sorted[0])
        // Render cards (sorted.slice(1, N))
        // Render history (sorted.slice(N))
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadData);
    } else {
        loadData();
    }
})();
```

### 3. Create CSS (if needed)

Most styles are inherited from base model classes. Only add section-specific overrides if necessary.

## Best Practices

1. **Always use `datePublished` for ordering** - don't rely on manual JSON order
2. **Include width/height on images** - prevents Cumulative Layout Shift
3. **Use lazy loading for non-featured images** - improves initial load time
4. **Test with `prefers-reduced-motion`** - ensure accessible experience
5. **Keep descriptions concise** - they're meant as summaries, not full content
6. **Maintain consistent image aspect ratios** - especially within a section
7. **Update dates when featuring new items** - the newest date always features
8. **Validate JSON before committing** - malformed JSON breaks the section

## Troubleshooting

### Item not appearing as featured
- Check `datePublished` - must be the newest date
- Verify date format is ISO (YYYY-MM-DD)
- Ensure JSON is valid

### Images not loading
- Verify path is correct relative to `index.html`
- Check image file exists and is committed
- Ensure proper case sensitivity (PNG vs png)

### Layout breaking on mobile
- Check responsive grid breakpoints
- Verify image aspect ratios
- Test with browser DevTools device emulation

### Performance issues
- Ensure will-change is removed after animations
- Check for expensive CSS properties (filter, box-shadow animations)
- Verify lazy loading is working for non-featured images

## References

- [PERFORMANCE_OPTIMIZATIONS.md](../PERFORMANCE_OPTIMIZATIONS.md) - Detailed performance guidelines
- [SECURITY_SUMMARY.md](../SECURITY_SUMMARY.md) - Security best practices
- [Web.dev - Optimize Cumulative Layout Shift](https://web.dev/optimize-cls/)
- [MDN - CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)

---

**Last Updated**: 2025-10-19  
**Version**: 1.0  
**Maintainer**: SupraSaiyans Dev Team
