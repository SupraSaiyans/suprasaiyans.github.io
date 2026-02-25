# Spotlight & NFT Gallery Unification Documentation

## Overview
This document describes the structural unification of the Spotlight and NFT Gallery sections to share common markup, styling, and class hooks while preserving their unique layouts.

## Implementation Date
October 19, 2025

## Objectives Achieved

### 1. Standardized Structure
Both Spotlight and NFT Gallery now share the same semantic HTML structure and CSS class architecture:

- **Section headers:** Use `.section-title`, `.section-subtitle` classes
- **Featured tiles:** Share `.gallery-featured-tile` class
- **Card grids:** Use `.gallery-grid` container class
- **Individual cards:** Share `.gallery-card` styling
- **History lists:** Use common `.history-list`, `.history-item` classes

### 2. Layout Differences Preserved

**Spotlight Section:**
- 1 large featured tile
- 3 smaller cards in a single row
- History list below
- Grid: `repeat(auto-fit, minmax(250px, 1fr))`

**NFT Gallery Section:**
- 1 large featured tile  
- 15 cards in 5×3 grid layout
- History list below
- Grid: `repeat(5, 1fr)` with responsive breakpoints

### 3. Shared CSS Classes

#### Container Classes
- `.gallery-loading` - Loading state indicators
- `.gallery-grid` - Card grid container
- `.section-header` - Section header wrapper

#### Featured Tile Classes
- `.gallery-featured-tile` - Main featured container
- `.gallery-featured-image` - Image wrapper
- `.gallery-featured-content` - Content panel
- `.gallery-featured-actions` - Button container
- `.gallery-featured-action` - Individual action button
- `.gallery-number` - Number badge (e.g., "Spotlight #5")

#### Card Classes
- `.gallery-card` - Card container
- `.gallery-card-caption` - Caption overlay
- `.gallery-card-actions` - Card action buttons
- `.gallery-card-action` - Individual card action

#### History Classes
- `.history-heading` - History section title
- `.history-list` - History list container
- `.history-item` - Individual history item
- `.history-thumbnail` - Item thumbnail
- `.history-info` - Item text content
- `.history-actions` - History item actions
- `.history-action` - Individual history action

### 4. CSS Variable Tokens

```css
/* Shared spacing */
--thumb-title-gap: 30px;  /* Default thumbnail-to-title spacing */

/* Shared colors */
--nft-title-color: var(--text-gold);  /* Title color */
--text-secondary: #e0e0e0;  /* Subtitle/description color */
--accent-teal-light: #4a9fb8;  /* Number badge color */
```

### 5. Typography Consistency

Both sections use identical typography:

**Section Headers:**
- Title (h1): `.section-title` - Gradient text with drop-shadow
- Subtitle (h2): `.section-subtitle` - White text, 0.9 opacity
- Description: 1.2em font-size, 1.6 line-height

**Featured Tiles:**
- Title (h3): 2em, Bebas Neue, `--nft-title-color`
- Number badge: 0.7em, `--accent-teal-light`
- Description: 1.1em, `--text-secondary`

**Cards:**
- Title (h4): 1.1em (Spotlight), 1em (NFT), Bebas Neue
- Description: 0.9em, `--text-secondary`

**History Lists:**
- Heading (h3): `.history-heading`, 1.3em (desktop), 1.4em (mobile)
- Item title (h4): 0.95em, `--nft-title-color`

### 6. Mobile Optimizations

#### Responsive Breakpoints
```css
/* Tablet (≤768px) */
- Featured tiles: Stack image above content
- Cards: Single column layout
- History: Wrap actions below item info

/* Mobile (≤480px) */  
- Reduced thumbnail-title gap: 25px
- Larger tap targets: 44×44px minimum
- Enhanced font sizes for readability
- Featured actions: Stack vertically
```

#### Mobile Improvements
- History heading: 1.4em (increased from 1.3em)
- History title: 0.95em (increased from 0.85em)
- Action buttons: 8px×16px padding, 44px minimum size
- Thumbnail-title gap: 25px (reduced from 30px)

### 7. JavaScript Integration

Both sections use shared class names in their rendering functions:

**Spotlight JavaScript:**
```javascript
function createFeaturedTile(item) {
  tile.className = 'spotlight-featured-tile gallery-featured-tile';
  // Uses .gallery-featured-image, .gallery-featured-content, etc.
}

function createSpotlightCard(item) {
  card.className = 'spotlight-card gallery-card';
  // Uses .gallery-card-caption, .gallery-card-actions, etc.
}
```

**NFT Gallery JavaScript:**
```javascript
function createNFTFeaturedTile(item) {
  tile.className = 'nft-featured-tile gallery-featured-tile';
  // Same shared classes as Spotlight
}

function createNFTCard(item) {
  card.className = 'nft-card gallery-card';
  // Same shared classes as Spotlight
}
```

### 8. Performance Characteristics

- ✅ GPU-accelerated animations (transform/opacity only)
- ✅ No `backdrop-filter` (prevents frame drops)
- ✅ CSS containment: `contain: layout style paint`
- ✅ Will-change optimization on hover
- ✅ Images with explicit dimensions (prevents CLS)
- ✅ Lazy loading for non-featured images
- ✅ Passive event listeners

### 9. Accessibility Features

- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (h1→h2→h3→h4)
- ✅ WCAG AA contrast ratios
- ✅ Keyboard navigation support
- ✅ Focus indicators visible
- ✅ Touch targets ≥44×44px on mobile
- ✅ Respects `prefers-reduced-motion`
- ✅ Alt text on all images

## File Locations

### HTML Structure
- **Spotlight:** Lines 4087-4335
- **NFT Gallery:** Lines 4338-4433

### CSS Styles
- **Shared variables:** Lines 121-133 (`:root`)
- **Section headers:** Lines 1840-1886
- **Gallery components:** Lines 1922-2239
- **History lists:** Lines 2241-2377
- **Responsive styles:** Lines 2721-2819
- **NFT Gallery specific:** Lines 2393-2720

### JavaScript
- **Spotlight:** Lines 5860-6149
- **NFT Gallery:** Lines 6152-6458

## Maintenance Guide

### Modifying Shared Styles
To update styling for both sections simultaneously:

1. **Adjust section headers:** Edit `.section-title`, `.section-subtitle` (lines 1844-1874)
2. **Change featured tiles:** Edit `.gallery-featured-tile` and related classes (lines 1928-2086)
3. **Update cards:** Edit `.gallery-card` and related classes (lines 2088-2239)
4. **Modify history:** Edit `.history-*` classes (lines 2241-2377)
5. **Adjust spacing:** Update CSS variables in `:root` (lines 121-133)

### Section-Specific Overrides
To customize individual sections:

1. **Spotlight-specific:** Use `.spotlight-*` classes (lines 1922-2087)
2. **NFT Gallery-specific:** Use `.nft-*` classes (lines 2393-2720)
3. **Grid layout:** Override `#spotlight-cards-grid` or `#nft-cards-grid`

### Adding New Shared Features
When adding features that should apply to both sections:

1. Create new `.gallery-*` or `.history-*` classes
2. Apply to both Spotlight and NFT Gallery rendering functions
3. Add to both hover optimization functions
4. Test on desktop and mobile breakpoints

## Testing Checklist

- [x] Desktop layout (1920×1080)
- [x] Mobile layout (375×667)
- [x] Spotlight: 1 large + 3 small tiles displayed
- [x] NFT Gallery: 1 large + 15 small cards displayed
- [x] History lists render correctly
- [x] Typography matches between sections
- [x] Colors consistent (titles, subtitles, descriptions)
- [x] Hover effects work
- [x] Touch targets ≥44×44px on mobile
- [x] Images load with proper dimensions
- [x] Responsive breakpoints function correctly
- [x] Performance: 60 FPS scrolling maintained
- [x] Accessibility: Keyboard navigation works

## Known Limitations

1. **Grid differences:** Spotlight uses `auto-fit` while NFT Gallery uses explicit column counts. This is intentional for their different content volumes.

2. **Mobile grid:** Both stack to single column on mobile, which is optimal for touch interaction.

3. **Class duplication:** Some elements have both specific (`.spotlight-card`) and shared (`.gallery-card`) classes for backward compatibility and specificity control.

## Future Enhancements

Potential improvements for future iterations:

1. **Dynamic grid:** Consider making NFT Gallery grid more flexible based on item count
2. **Animation refinement:** Add subtle entry animations for cards
3. **Skeleton loaders:** Replace text loading indicators with skeleton screens
4. **Image optimization:** Add WebP with PNG fallback support
5. **Lazy hydration:** Defer non-visible card rendering until scroll

## References

- Original issue: Standardize Spotlight to NFT Gallery structure
- Related docs:
  - `PERFORMANCE_OPTIMIZATIONS.md`
  - `UI_HARMONIZATION_SUMMARY.md`
  - `.github/copilot-instructions.md`
