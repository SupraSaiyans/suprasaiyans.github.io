# Lao Shifu Fractal Frame Implementation

## Overview

The Lao Shifu hero logo now features a **fractal clipPath** that wraps the logo image itself, creating an organic, curvy silhouette that replaces the previous square appearance. This implementation includes both a decorative outline frame and a clipPath mask applied directly to the logo image.

## Visual Changes

**Before:** Logo had square edges with an external decorative frame rotating around it.

**After:** Logo has organic, wavy edges created by an SVG clipPath, with a harmonizing decorative frame that complements the fractal aesthetic.

![Hero Section with Fractal Frame](https://github.com/user-attachments/assets/247fd1e0-f0bb-42b9-98c4-f58135a6e2fe)

## Implementation Details

### 1. Fractal ClipPath Applied to Logo

The logo image now uses an SVG clipPath (`#lao-fractal-clip`) that creates smooth, organic curved edges:

```html
<!-- SVG clipPath definition in index.html -->
<svg width="0" height="0" style="position: absolute;">
    <defs>
        <clipPath id="lao-fractal-clip">
            <!-- Organic path with wavy edges -->
        </clipPath>
    </defs>
</svg>
```

Applied via CSS:
```css
.laoshi-logo {
    clip-path: url(#lao-fractal-clip);
    -webkit-clip-path: url(#lao-fractal-clip);
}
```

### 2. Decorative Fractal Frame

A new decorative SVG frame (`lao-fractal-frame.svg`) wraps around the logo:
- Location: `assets/hero/lao-shifu/lao-fractal-frame.svg`
- Features: Multi-gradient curved paths matching site palette
- Animation: Slow 80s rotation for subtle motion
- Size: 680x680px (optimized, ~6.5KB)

### 3. CSS Variables for Customization

New CSS custom properties for fine-tuning:

```css
/* Fractal frame colors */
--lao-frame-primary: #06566d;    /* Teal blue */
--lao-frame-accent: #e2aa42;     /* Golden accent */
--lao-frame-warm: #7a3013;       /* Warm brown */

/* Frame appearance */
--lao-frame-stroke-width: 3;     /* Outline thickness */
--lao-frame-outline-opacity: 0.85;  /* Main outline visibility */
--lao-frame-detail-opacity: 0.6;    /* Detail layer visibility */
--lao-halo-opacity: 0.15;        /* Halo glow intensity */
```

## Customization Guide

### Adjusting Frame Colors

To change the frame color scheme, update the CSS variables in the `:root` section:

```css
:root {
    --lao-frame-primary: #0a7ea4;  /* Change primary color */
    --lao-frame-accent: #ff6b35;   /* Change accent color */
}
```

The decorative frame SVG uses `var()` references, so colors update automatically.

### Adjusting Frame Thickness

```css
:root {
    --lao-frame-stroke-width: 4;  /* Thicker lines */
    --lao-frame-outline-opacity: 1;  /* More visible */
}
```

### Adjusting Halo Glow

```css
:root {
    --lao-halo-opacity: 0.25;  /* Stronger glow */
}
```

### Switching Between Frame Variants

Two frame variants are available:

**1. Multi-gradient frame (default):** `assets/hero/lao-shifu/lao-fractal-frame.svg`
- Animated color gradients
- Rich, dynamic appearance

**2. Mask-based variant:** `assets/hero/lao-shifu/lao-fractal-mask.svg`
- Can be used with CSS mask property for alternative effects
- Simpler, lighter weight

To switch frames, update the HTML:
```html
<img src="assets/hero/lao-shifu/lao-fractal-mask.svg" alt="" class="laoshi-frame">
```

## Performance Optimizations

### GPU-Accelerated Animations

All animations use transform and opacity only (GPU-accelerated):
```css
.laoshi-frame {
    animation: frameRotateSlow 80s linear infinite;
    /* Only animates transform, not position or size */
}

.laoshi-logo {
    animation: logoFloat 6s ease-in-out infinite;
    /* Only uses transform: translateY() */
}
```

### Conditional will-change

`will-change` is only applied during hover/interaction:
```css
.laoshi-centerpiece:hover .laoshi-frame {
    will-change: transform;
}
```

Not permanently set to avoid memory overhead.

### CSS Containment

Layout containment prevents unnecessary repaints:
```css
.laoshi-centerpiece {
    contain: layout style paint;
}
```

### Drop Shadow Instead of Box Shadow

Using `filter: drop-shadow()` for performance:
```css
.laoshi-logo {
    filter: drop-shadow(0 0 30px rgba(6, 86, 109, 0.7))
            drop-shadow(0 0 50px rgba(226, 170, 66, 0.4));
}
```

## Browser Compatibility

### ClipPath Support

- ✅ Chrome 55+
- ✅ Firefox 54+
- ✅ Safari 9.1+
- ✅ Edge 79+

### Graceful Fallback

For browsers without clipPath support:
```css
@supports not (clip-path: url(#lao-fractal-clip)) {
    .laoshi-logo {
        border-radius: 50%;  /* Circular fallback */
        box-shadow: 0 0 30px rgba(6, 86, 109, 0.7),
                    0 0 50px rgba(226, 170, 66, 0.4);
    }
}
```

## Responsive Design

Frame and logo scale appropriately across breakpoints:

| Breakpoint | Frame Size | Logo Size |
|------------|------------|-----------|
| Desktop (>768px) | 680px | 380px |
| Tablet (≤768px) | 450px | 260px |
| Mobile (≤480px) | 360px | 200px |

Responsive adjustments are automatic via media queries.

## Accessibility

### Semantic HTML
- Logo wrapped in `<picture>` with WebP/PNG sources
- Descriptive `alt` text: "Lǎo Shīfu - SupraSaiyans"
- Decorative frame marked `aria-hidden="true"`

### Keyboard Navigation
- Logo link fully keyboard accessible
- Visible focus state with golden outline
- Focus offset for clarity

### Motion Sensitivity
All animations respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
    .laoshi-frame,
    .laoshi-logo {
        animation: none;
    }
}
```

### Image Optimization
- Proper `width` and `height` attributes prevent CLS
- `fetchpriority="high"` for above-fold logo
- `decoding="async"` for non-blocking decode
- WebP format with PNG fallback

## Asset Files

### New Files Added

```
assets/hero/lao-shifu/
├── lao-fractal-frame.svg    (~6.5KB) - Decorative outline frame
└── lao-fractal-mask.svg     (~4.4KB) - Alternative mask variant
```

### SVG Optimization

Both SVGs are hand-optimized:
- Minimal path complexity
- Clean viewBox definitions
- No heavy filters (lightweight blur only)
- CSS variable integration for theming

## Testing Checklist

- [x] Visual: Logo has organic, curvy fractal edges (no boxy appearance)
- [x] Performance: Smooth 60 FPS during scroll and hover
- [x] Animations: Transform/opacity-only (GPU-accelerated)
- [x] Accessibility: Alt text, focus states, keyboard navigation preserved
- [x] Responsive: Proper scaling at 1280/1440/1920px and mobile
- [x] Fallback: Circular logo when clipPath unsupported
- [x] Assets: Optimized SVGs under 10KB each
- [x] CLS: No layout shift from logo loading
- [x] Motion: Respects prefers-reduced-motion

## Troubleshooting

### ClipPath Not Visible

1. Check browser support (Chrome 55+, Firefox 54+, Safari 9.1+)
2. Verify the SVG `<clipPath>` is in the DOM
3. Ensure `clip-path: url(#lao-fractal-clip)` is applied
4. Check for conflicting CSS (overflow, z-index issues)

### Performance Issues

1. Disable frame rotation: Set `animation: none` on `.laoshi-frame`
2. Reduce halo blur: Lower `--logo-halo-blur` value
3. Use monochrome frame variant (lighter weight)
4. Check for other heavy animations running simultaneously

### Frame Not Displaying

1. Verify file path: `assets/hero/lao-shifu/lao-fractal-frame.svg`
2. Check that SVG file exists and is not corrupted
3. Inspect network tab for 404 errors
4. Ensure server is serving .svg files correctly

## Future Enhancements

Possible future improvements:
- Interactive hover effects on frame (glow intensity)
- Animated fractal particles around logo
- Theme-aware frame colors (light/dark mode)
- Multiple clipPath variants (user selectable)
- Parallax depth layers for 3D effect

## Credits

Frame design inspired by fractal art, organic growth patterns, and the existing globe/fractal background aesthetic of the SupraSaiyans landing page.

---

**Implementation Date:** October 2025  
**Performance Target:** 60 FPS, <3MB page load  
**Browser Support:** Modern browsers (2018+)
