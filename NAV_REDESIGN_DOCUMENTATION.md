# Navigation Redesign Documentation

## Overview
The navigation menu has been redesigned to better match the site's curvy, fractal aesthetic while maintaining accessibility, performance, and layout consistency.

## Changes Made

### 1. Color Palette Updates
**Removed:**
- `--accent-teal-bright: #82B29D` (sage green)

**Added:**
- `--accent-teal-bright: #C4956C` (warm copper)
- `--menu-accent-warm: #E5B457` (warm gold)
- `--menu-accent-gradient: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-orange) 50%, var(--accent-warm) 100%)`

**Updated:**
- `--menu-accent` now uses `--menu-accent-warm` instead of `--nft-title-color`

### 2. Button Styling
**Previous:** Radial gradient CSS masks creating side cutouts
```css
-webkit-mask-image: 
    radial-gradient(circle at 20% 50%, transparent var(--menu-cut-depth), black calc(var(--menu-cut-depth) + 2px)),
    radial-gradient(circle at 80% 50%, transparent var(--menu-cut-depth), black calc(var(--menu-cut-depth) + 2px)),
    linear-gradient(black, black);
```

**New:** SVG-based mask for organic flowing shapes
```css
-webkit-mask-image: url('assets/svg/nav-button-mask.svg');
mask-image: url('assets/svg/nav-button-mask.svg');
```

### 3. New SVG Assets
Created three new SVG files in `assets/svg/`:

#### `nav-button-mask.svg`
- Organic, curvy button shape with subtle side indents
- Provides fractal-inspired silhouette for navigation buttons
- Maintains exact button dimensions (40x40px minimum for accessibility)

#### `nav-left-decoration.svg` (Optional/Future)
- Flowing curvy fractal shape pointing right
- Can be used as a decorative element for the left side of the nav
- Warm gradient matching site palette (gold, orange, copper)

#### `nav-right-decoration.svg` (Optional/Future)
- Mirror of left decoration, pointing left
- Can be used as a decorative element for the right side of the nav
- Warm gradient matching site palette (gold, orange, copper)

## CSS Token Reference

### Menu Accent Colors
```css
--menu-accent-warm: #E5B457        /* Primary warm gold accent */
--menu-accent-gradient: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-orange) 50%, var(--accent-warm) 100%)
--menu-accent: var(--menu-accent-warm)  /* Active menu accent */
--menu-accent-rim: color-mix(in oklab, var(--menu-accent) 25%, transparent)  /* Rim glow */
```

### Button Styling Tokens
```css
--menu-radius: 16px              /* Base border radius */
--menu-cut-depth: 10px           /* Depth of curvy cutouts (legacy) */
--menu-bg: linear-gradient(180deg, color-mix(in oklab, var(--glass-bg) 85%, var(--menu-accent) 15%), var(--glass-bg))
```

## Customization Guide

### Adjusting Button Curvature
1. Edit `assets/svg/nav-button-mask.svg`
2. Modify the path coordinates to increase/decrease organic curves
3. Keep the viewBox at `0 0 100 100` for consistent scaling
4. Test in Chrome, Firefox, and Safari

### Changing Menu Accent Color
Update the `--menu-accent-warm` token in `:root`:
```css
:root {
    --menu-accent-warm: #YOUR_COLOR_HERE;
}
```

To use a gradient instead:
```css
:root {
    --menu-accent: var(--menu-accent-gradient);
}
```

### Browser Support and Fallback
The mask uses modern CSS features with a fallback:
```css
/* Modern browsers with mask support */
.nav-link {
    mask-image: url('assets/svg/nav-button-mask.svg');
}

/* Fallback for older browsers */
@supports not (mask-image: url('assets/svg/nav-button-mask.svg')) {
    .nav-link {
        border-radius: calc(var(--menu-radius) * 1.5);
        mask-image: none;
    }
}
```

## Performance Considerations

### What We Preserved
- GPU-accelerated transforms (translateY, scale)
- CSS containment (`contain: layout style paint`)
- No backdrop-filter or expensive CSS effects
- Static box-shadow (no animation)

### What Changed
- Switched from CSS gradient masks to SVG masks
- Both perform similarly well (GPU-accelerated)
- SVG masks offer more design flexibility

## Accessibility

### Maintained Standards
- ✅ Minimum 40x40px tap targets
- ✅ Visible focus indicators (`outline: 2px solid var(--menu-accent)`)
- ✅ WCAG AA color contrast
- ✅ Keyboard navigation support
- ✅ Screen reader friendly (aria-labels preserved)

### Testing Checklist
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus indicators visible on all buttons
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Touch targets ≥ 40x40px on mobile

## Layout Verification

### Critical: No Layout Shifts
The redesign maintains:
- ✅ Exact menu bar positioning (`top: 20px`, `left: 50%`)
- ✅ Same grid structure (7 columns)
- ✅ Identical column gaps (16px)
- ✅ Same button dimensions and padding
- ✅ Middle fractal artifact unchanged

### Verification Command
Compare bounding boxes before/after:
```javascript
// In browser console
document.querySelector('.nav-link:nth-child(1)').getBoundingClientRect()
```

## Middle SVG Preservation

**IMPORTANT:** The middle fractal artifact (`fractal-artifact.svg`) was left completely unchanged:
- Same file content
- Same markup
- Same positioning
- Same styling

This ensures the centerpiece of the navigation remains visually consistent.

## Future Enhancements

### Optional Decorative Elements
The left/right decoration SVGs can be added flanking the nav menu:
```html
<nav class="nav-menu">
    <div class="nav-decoration-left">
        <img src="assets/svg/nav-left-decoration.svg" alt="">
    </div>
    <!-- nav links -->
    <div class="nav-decoration-right">
        <img src="assets/svg/nav-right-decoration.svg" alt="">
    </div>
</nav>
```

### Animation Ideas
Consider adding subtle animations to the SVG masks:
- Gentle pulse on hover
- Morphing between states
- Particle effects along the curves

⚠️ **Important:** Always profile performance before adding animations!

## Browser Compatibility

| Browser | Mask Support | Fallback Needed |
|---------|--------------|-----------------|
| Chrome 90+ | ✅ Full | No |
| Firefox 88+ | ✅ Full | No |
| Safari 14+ | ✅ Full | No |
| Edge 90+ | ✅ Full | No |
| IE 11 | ❌ None | Yes (rounded shape) |

## Troubleshooting

### Masks Not Appearing
1. Check SVG file path: `assets/svg/nav-button-mask.svg`
2. Verify SVG viewBox: `0 0 100 100`
3. Ensure white fill color in SVG path
4. Clear browser cache

### Color Not Updating
1. Check CSS variable inheritance
2. Verify `--menu-accent-warm` is defined in `:root`
3. Use browser DevTools to inspect computed values

### Performance Issues
1. Ensure no `backdrop-filter` is applied
2. Check for unnecessary `will-change` properties
3. Profile with Chrome DevTools Performance tab
4. Target: 60 FPS during scrolling

## Credits
- Fractal aesthetic inspired by site's existing artwork
- Warm palette derived from existing token system
- Button mask design: organic flowing shapes with accessibility in mind
