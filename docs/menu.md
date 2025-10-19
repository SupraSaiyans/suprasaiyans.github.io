# Menu Component Documentation

## Overview

The navigation menu uses a **Silk-Cut Ripple** button design — a unique silhouette with subtle inward, curvy cutouts created using CSS mask techniques. This design provides an organic, fractal-inspired aesthetic that aligns with the site's visual language while maintaining high performance and accessibility.

## Design Philosophy

### Silk-Cut Ripple Buttons

The "Silk-Cut Ripple" name refers to the distinctive button shape:
- **Silk**: Soft, satin gradient background with subtle iridescence
- **Cut**: Two curvy inward cutouts at ~20% and ~80% width
- **Ripple**: Slight asymmetry and organic curves suggesting fractal patterns

### Key Visual Elements

1. **CSS Mask Silhouette**: Radial gradient masks create smooth, curvy cutouts
2. **Satin Gradient**: Vertical gradient background with accent tint
3. **Iridescent Rim**: 1-2px highlight along top-left edge
4. **No Heavy Filters**: Transform/opacity-only animations for 60 FPS performance

## Implementation

### HTML Structure

```html
<nav class="nav-menu">
    <a href="#section" class="nav-link" title="Section Name" aria-label="Navigate to Section">
        <img src="artifact-icon.svg" alt="Section Artifact" class="nav-artifact-icon">
    </a>
    <!-- More links... -->
    <div class="nav-fractal-artifact">
        <img src="fractal-artifact.svg" alt="Fractal Artifact" class="fractal-icon">
    </div>
    <!-- More links... -->
</nav>
```

### CSS Implementation

#### Base Button Styles

```css
.nav-link {
    /* Minimum hit area for accessibility */
    min-width: 40px;
    min-height: 40px;
    padding: 8px 12px;
    
    /* Background and border */
    background: var(--menu-bg);
    border-radius: var(--menu-radius);
    border-top: 1px solid var(--menu-accent-rim);
    border-left: 1px solid var(--menu-accent-rim);
    
    /* CSS Mask for Silk-Cut Ripple silhouette */
    -webkit-mask-image: 
        radial-gradient(circle at 20% 50%, transparent var(--menu-cut-depth), black calc(var(--menu-cut-depth) + 2px)),
        radial-gradient(circle at 80% 50%, transparent var(--menu-cut-depth), black calc(var(--menu-cut-depth) + 2px)),
        linear-gradient(black, black);
    -webkit-mask-composite: source-in;
    mask-image: 
        radial-gradient(circle at 20% 50%, transparent var(--menu-cut-depth), black calc(var(--menu-cut-depth) + 2px)),
        radial-gradient(circle at 80% 50%, transparent var(--menu-cut-depth), black calc(var(--menu-cut-depth) + 2px)),
        linear-gradient(black, black);
    mask-composite: intersect;
    
    /* Performance: Only animate transform and opacity */
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Interaction States

**Hover** (100-150ms):
```css
.nav-link:hover {
    transform: translateY(-1px) scale(1.02);
    opacity: 1;
}
```

**Active** (reset translate, scale 0.99):
```css
.nav-link:active {
    transform: translateY(0) scale(0.99);
    transition: transform 0.1s ease, opacity 0.1s ease;
}
```

**Focus** (visible inner ring):
```css
.nav-link:focus,
.nav-link:focus-visible {
    outline: 2px solid var(--menu-accent);
    outline-offset: -2px;
}
```

### Fallback Strategy

For browsers without CSS mask support, buttons gracefully degrade to a pill shape:

```css
@supports not (mask-image: radial-gradient(circle, black, black)) {
    .nav-link {
        border-radius: calc(var(--menu-radius) * 2);
        -webkit-mask-image: none;
        mask-image: none;
    }
}
```

**Browsers affected**: 
- IE 11 and below (EOL)
- Older mobile browsers (pre-2020)

**Visual impact**: Minimal — pill shape maintains aesthetic harmony

## Accessibility

### Keyboard Navigation

- **Tab**: Navigate between menu items
- **Enter/Space**: Activate link
- **Focus indicator**: 2px solid outline with -2px offset (clearly visible)

### Screen Readers

All links include:
- `title` attribute for tooltip
- `aria-label` for clear context
- Descriptive `alt` text on icons

### Reduced Motion

Users with `prefers-reduced-motion: reduce` experience:
- **No transform animations** (translateY, scale removed)
- **Subtle brightness/opacity shift** instead of motion
- **Immediate state changes** (no transitions)

```css
@media (prefers-reduced-motion: reduce) {
    .nav-link:hover {
        transform: none;
        filter: brightness(1.15);
        opacity: 0.95;
    }
    
    .nav-link:active {
        transform: none;
        filter: brightness(1.05);
        opacity: 0.9;
    }
}
```

### Touch Targets

- **Minimum size**: 40×40px logical pixels
- **Visual padding**: 8px horizontal, 12px vertical (comfortable for fingers)
- **Icon size**: 60px height (large enough to recognize, not overwhelming)

### Color Contrast

- **Background vs. icon**: ≥4.5:1 (WCAG AA)
- **Focus ring**: ≥3:1 against background (WCAG AA)
- **Tested against**: Dark blue (#0F2027) background

## Performance

### Animation Strategy

**✅ GPU-Accelerated Properties Only**:
- `transform` (translateY, scale)
- `opacity`

**❌ Avoided Properties**:
- `filter: blur()` (causes repainting)
- `box-shadow` (expensive)
- `border` (reflows layout)
- `background` animations (use pseudo-elements)

### Optimization Techniques

1. **CSS Containment**: `contain: layout style paint` on `.nav-menu`
2. **will-change removed**: Only added via JavaScript during active animations
3. **Short transitions**: 100-150ms (feels instant, allows GPU optimization)
4. **Cubic bezier**: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth, performant)

### Performance Targets

- **60 FPS** during hover/active states
- **< 16ms** frame time on modern hardware
- **No jank** on scroll

## Customization

### Adjusting Cutout Depth

```css
:root {
    --menu-cut-depth: 12px; /* Default: 10px, Range: 8-15px */
}
```

- Smaller values: Subtler cutouts, more conventional
- Larger values: Pronounced cutouts, more organic

### Changing Accent Color

```css
:root {
    --menu-accent: #00ff00; /* Any color with sufficient contrast */
}
```

- Test focus ring visibility (≥3:1 contrast)
- Verify iridescent rim is visible but subtle

### Adjusting Animation Speed

```css
.nav-link {
    transition: transform 0.2s ease, opacity 0.2s ease; /* Slower */
}

.nav-link:hover {
    /* Animation properties remain the same */
}
```

- Keep under 200ms for responsiveness
- Consider reduced-motion users

## Grid Layout

Navigation uses CSS Grid for perfect symmetry:

```css
.nav-menu {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    column-gap: 16px;
}
```

- **7 columns**: 3 left links, 1 center fractal, 3 right links
- **Center fractal** (grid column 4): Visual anchor point
- **Symmetry**: Equal spacing, balanced visual weight

### Background Alignment

The `--header-grid-offset` token allows fine-tuning alignment with background arcs:

```css
.nav-menu {
    transform: translateX(calc(-50% + var(--header-grid-offset)));
}
```

Currently set to `0px`, adjust in 1-2px increments for perfect alignment.

## Browser Support

### Full Experience
- Chrome 111+ (CSS mask, color-mix)
- Firefox 113+ (CSS mask, color-mix)
- Safari 16.2+ (CSS mask, color-mix)
- Edge 111+ (Chromium-based)

### Graceful Degradation
- Older browsers: Pill shape fallback
- No color-mix: Solid gradient colors
- No mask: Rounded rectangles

### Testing Checklist

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS, iOS)
- [ ] Edge (Chromium)
- [ ] Mobile Safari (iOS 15+)
- [ ] Chrome Mobile (Android)

## Maintenance

### When Updating Styles

1. **Test all interaction states**: hover, active, focus, focus-visible
2. **Verify reduced-motion**: Check alternative behaviors
3. **Check contrast**: Use browser DevTools or WAVE
4. **Test keyboard navigation**: Tab through all links
5. **Validate performance**: Chrome DevTools Performance tab (60 FPS target)

### Common Issues

**Cutouts not appearing**:
- Check browser support for CSS mask
- Verify `--menu-cut-depth` is reasonable (8-15px)
- Check `mask-composite` property support

**Focus ring invisible**:
- Increase `--menu-accent` brightness
- Adjust `outline` width (try 3px)
- Test against actual background color

**Performance issues**:
- Remove any `filter` or `backdrop-filter` properties
- Ensure only `transform` and `opacity` are animated
- Check for JavaScript that adds `will-change` permanently

## Related Documentation

- [UI Tokens](./ui-tokens.md) - Token definitions and tuning guidance
- [PERFORMANCE_OPTIMIZATIONS.md](../PERFORMANCE_OPTIMIZATIONS.md) - Site-wide performance strategies
- [Spotlight Base Model](./spotlight-base-model.md) - Related design patterns

---

*Last updated: 2025-10-19*
