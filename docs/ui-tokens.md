# UI Tokens Documentation

## Overview

This document describes the CSS custom properties (tokens) used throughout the SupraSaiyans website for maintaining consistent design system values. These tokens enable easy tuning of spacing, colors, and layout parameters while preserving visual harmony.

## History Section Tokens

### --history-gap

**Purpose**: Controls the spacing between thumbnail and title in history list items.

**Default**: `24px`

**Range**: 20-30px (recommended)

**Responsive Behavior**:
- `< 480px`: `20px` (tighter spacing on narrow screens)
- `≥ 480px`: `24px` (default spacing)

**Usage**:
```css
.spotlight-history-item,
.nft-history-item {
    gap: var(--history-gap);
}
```

**Tuning Guidance**:
- Increase for more breathing room (better for accessibility)
- Decrease for denser layouts (better for limited viewport height)
- Consider line-height and font-size when adjusting

### --history-title-color

**Purpose**: Legacy token that references --nft-title-color for backward compatibility.

**Default**: `var(--text-gold)`

**Note**: Direct use of `--nft-title-color` is preferred in new code.

### --nft-title-color

**Purpose**: The canonical color token for NFT and history item titles.

**Default**: `var(--text-gold)` → `#E5B457`

**Usage**:
```css
.spotlight-history-info h4,
.nft-history-info h4,
.nft-card-caption h4 {
    color: var(--nft-title-color);
}
```

**Contrast**: Ensures ≥4.5:1 contrast ratio against dark backgrounds for WCAG AA compliance.

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

## Related Documentation

- [Menu Component](./menu.md) - Silk-Cut Ripple button implementation
- [Spotlight Base Model](./spotlight-base-model.md) - History list patterns
- [PERFORMANCE_OPTIMIZATIONS.md](../PERFORMANCE_OPTIMIZATIONS.md) - Performance considerations

---

*Last updated: 2025-10-19*
