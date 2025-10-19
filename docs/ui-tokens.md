# UI Tokens Documentation

## Overview

This document describes the CSS custom properties (tokens) used throughout the SupraSaiyans website for maintaining consistent design system values. These tokens enable easy tuning of spacing, colors, and layout parameters while preserving visual harmony.

## Shared Section Header Classes

Both **Spotlight** and **NFT Gallery** sections now use a unified set of CSS classes for consistent header styling and easier maintenance. The shared header classes are:

- `.section-header` - Wrapper for section headers (applied to `.section-content`)
- `.section-title` - Section title (h1) with golden gradient styling
- `.section-subtitle` - Section subtitle (h2) with clean, readable styling
- `.history-heading` - History section heading (h3) with gold color and consistent spacing

### Shared Header Styling

All section titles (h1) use the same golden gradient:
```css
.section-title,
.spotlight-fractal h1,
#nft-gallery h1 {
    background: linear-gradient(135deg, 
        #e8b86d 0%,      /* Warm golden */
        #06566d 35%,     /* Teal light */
        #f4a460 65%,     /* Sandy brown/copper */
        #4a9fb8 100%);   /* Lighter teal */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 2px 8px rgba(232, 184, 109, 0.4))
            drop-shadow(0 0 12px rgba(6, 86, 109, 0.3));
}
```

All section subtitles (h2) use the same clean styling:
```css
.section-subtitle,
.spotlight-fractal h2,
#nft-gallery h2 {
    color: var(--text-primary);
    opacity: 0.9;
    text-shadow: none;
    filter: none;
}
```

All history headings (h3) use the same gold styling:
```css
.history-heading,
#spotlight-history h3,
#nft-history h3 {
    font-size: 1.3em;
    color: var(--text-gold);
    margin: 0 0 20px 0;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
}
```

**Note**: Any changes to these shared styles will automatically apply to both Spotlight and NFT Gallery sections, ensuring visual harmony.

## History Section Tokens

### Shared History Classes

Both **Spotlight History** and **NFT Gallery History** sections now use a unified set of CSS classes for consistent styling and easier maintenance. The shared classes are:

- `.history-list` - Container for history items
- `.history-item` - Individual history item row
- `.history-thumbnail` - Thumbnail image container
- `.history-info` - Text content area
- `.history-actions` - Action buttons container
- `.history-action` - Individual action button

Each section also maintains section-specific classes (`.spotlight-history-*`, `.nft-history-*`) as fallbacks for backward compatibility.

### --thumb-title-gap

**Purpose**: Controls the spacing between thumbnail and title in history list items.

**Default**: `30px`

**Range**: 25-35px (recommended)

**Responsive Behavior**:
- `< 480px`: Thumbnails reduce to 50x50px with maintained gap
- `≥ 480px`: Thumbnails are 60x60px with default 30px gap

**Usage**:
```css
.history-item,
.spotlight-history-item,
.nft-history-item {
    gap: var(--thumb-title-gap);
}
```

**Tuning Guidance**:
- Increase for more breathing room (better for accessibility)
- Decrease for denser layouts (better for limited viewport height)
- Consider line-height and font-size when adjusting
- This token is shared between Spotlight and NFT Gallery for consistent left-alignment

### --history-title-color

**Purpose**: Legacy token that references --nft-title-color for backward compatibility.

**Default**: `var(--text-gold)`

**Note**: Direct use of `--nft-title-color` is preferred in new code.

### --nft-title-color

**Purpose**: The canonical color token for NFT and history item titles.

**Default**: `var(--text-gold)` → `#E5B457`

**Usage**:
```css
.history-info h4,
.spotlight-history-info h4,
.nft-history-info h4,
.nft-card-caption h4 {
    color: var(--nft-title-color);
}
```

**Contrast**: Ensures ≥4.5:1 contrast ratio against dark backgrounds for WCAG AA compliance.

### History Header Styles

Both sections use identical h3 styling for their history headers:

```css
#spotlight-history h3,
#nft-history h3 {
    font-size: 1.3em;
    color: var(--text-gold);
    margin: 0 0 20px 0;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
}
```

**Note**: Any changes to history header styles will automatically apply to both sections.

## Menu Tokens (Silk-Cut Ripple Buttons)

### --menu-radius

**Purpose**: Base border radius for navigation menu buttons.

**Default**: `16px`

**Usage**: Applied to `.nav-link` elements before CSS mask is applied.

**Fallback**: When CSS mask is unsupported, radius is doubled (`calc(var(--menu-radius) * 2)`) for a graceful pill shape.

### --menu-cut-depth

**Purpose**: Controls the depth of the curvy cutouts in the Silk-Cut Ripple button silhouette.

**Default**: `10px`

**Range**: 8-15px (recommended)

**Usage**: Applied in radial-gradient masks at 20% and 80% width positions.

**Tuning Guidance**:
- Increase for more pronounced cutouts (more organic look)
- Decrease for subtler silhouette (more conventional look)
- Test at various viewport sizes to ensure consistent appearance

### --menu-accent

**Purpose**: Primary accent color for menu buttons (focus rings, hover highlights).

**Default**: `var(--nft-title-color)` → `#E5B457`

**Usage**:
```css
.nav-link:focus {
    outline: 2px solid var(--menu-accent);
}
```

**Accessibility**: Must maintain ≥3:1 contrast with button background for visibility.

### --menu-accent-rim

**Purpose**: Semi-transparent iridescent rim color along top-left edge of buttons.

**Default**: `color-mix(in oklab, var(--menu-accent) 25%, transparent)`

**Browser Support**: Requires CSS `color-mix()` support (modern browsers). Falls back gracefully to no rim.

**Usage**:
```css
.nav-link {
    border-top: 1px solid var(--menu-accent-rim);
    border-left: 1px solid var(--menu-accent-rim);
}
```

### --menu-bg

**Purpose**: Soft satin gradient background for menu buttons.

**Default**: `linear-gradient(180deg, color-mix(in oklab, var(--glass-bg) 85%, var(--menu-accent) 15%), var(--glass-bg))`

**Visual Effect**: Subtle top-to-bottom gradient with slight accent tint at top.

**Browser Support**: Requires CSS `color-mix()` support. Falls back to `var(--glass-bg)` in older browsers.

### --header-grid-offset

**Purpose**: Anchors button layout with header composition and background arcs.

**Default**: `0px`

**Usage**: Currently reserved for future layout refinements. Can be used to adjust horizontal positioning of the navigation menu.

**Tuning Guidance**:
- Adjust in small increments (1-2px) to fine-tune alignment
- Test with fixed background to ensure visual harmony with background arcs
- Consider viewport width variations

## Token Categories

### Color Tokens
- `--nft-title-color`: NFT and history titles
- `--menu-accent`: Menu highlights and focus states
- `--menu-accent-rim`: Subtle iridescent rims
- `--history-title-color`: Legacy (use --nft-title-color instead)

### Spacing Tokens
- `--history-gap`: History item internal spacing (responsive)

### Dimension Tokens
- `--menu-radius`: Button corner rounding
- `--menu-cut-depth`: Silhouette cutout depth
- `--header-grid-offset`: Layout alignment offset

### Gradient Tokens
- `--menu-bg`: Button background gradient

## Best Practices

### Token Usage
1. **Always use tokens** instead of hardcoded values for design system properties
2. **Test responsive behavior** when adjusting spacing tokens
3. **Verify accessibility** when changing color tokens (contrast ratios)
4. **Check browser support** for advanced features like `color-mix()`

### Adding New Tokens
1. Define in `:root` selector with clear name and comment
2. Document default value, range, and usage
3. Add responsive adjustments if needed in `@media` queries
4. Update this documentation file

### Tuning Tokens
1. Test changes across multiple viewport sizes
2. Verify no regressions to existing layout
3. Ensure accessibility standards are maintained (WCAG AA)
4. Consider reduced-motion preferences

## Browser Support Notes

### CSS color-mix()
- **Supported**: Chrome 111+, Firefox 113+, Safari 16.2+
- **Fallback**: Tokens gracefully degrade to base colors without mixing

### CSS mask-image
- **Supported**: All modern browsers with prefixes
- **Fallback**: Pill shape (doubled border-radius) for Silk-Cut Ripple buttons

### CSS Custom Properties
- **Supported**: All modern browsers (IE11 requires polyfill or static fallbacks)

## Unified History Structure

### Making Layout Changes

To modify the layout of both Spotlight History and NFT Gallery History sections simultaneously, edit the shared `.history-*` classes in the CSS. The specific classes are:

1. **Container styles**: `.history-list` (flex layout, gap between items)
2. **Item styles**: `.history-item` (flex layout, padding, background, borders)
3. **Thumbnail styles**: `.history-thumbnail` (size, borders, clip-path)
4. **Info styles**: `.history-info` (flex grow, typography)
5. **Actions styles**: `.history-actions` (flex layout, button spacing)
6. **Action button styles**: `.history-action` (padding, colors, hover effects)

### Example: Adjusting History Item Spacing

To change the gap between history items in both sections:

```css
.history-list,
.spotlight-history-list,
.nft-history-list {
    gap: 20px; /* Changed from 15px to 20px */
}
```

This single change will affect both Spotlight and NFT Gallery history lists.

### Maintaining Section-Specific Styles

If you need section-specific styling (e.g., different colors for Spotlight vs NFT Gallery), add specific rules after the shared rules:

```css
/* Shared styles apply to both */
.history-item { ... }

/* Section-specific override */
.spotlight-history-item {
    border-color: #special-spotlight-color;
}
```

## Related Documentation

- [Menu Component](./menu.md) - Silk-Cut Ripple button implementation
- [Spotlight Base Model](./spotlight-base-model.md) - History list patterns
- [PERFORMANCE_OPTIMIZATIONS.md](../PERFORMANCE_OPTIMIZATIONS.md) - Performance considerations

---

*Last updated: 2025-10-19 - Added unified history structure documentation*
