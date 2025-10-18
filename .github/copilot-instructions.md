# GitHub Copilot Instructions for SupraSaiyans

## Project Overview

This is a static HTML landing page for SupraSaiyans, hosted on GitHub Pages. The site features:
- A visually striking single-page design with fractal art and globe-themed background
- SVG-based navigation with artifact icons
- Performance-optimized CSS animations and transitions
- Cookie consent management
- Responsive design for desktop and mobile

## Project Structure

```
/
├── .github/                    # GitHub configuration
│   └── PULL_REQUEST_TEMPLATE.md
├── index.html                  # Main landing page (4979 lines)
├── images/                     # Image assets
├── *.svg                       # SVG icons and artifacts
├── *.png, *.jpg               # Image assets
└── *.md                       # Documentation files
```

### Key Files
- **index.html**: Single-page application containing all HTML, CSS, and JavaScript
- **Documentation**: 
  - `PERFORMANCE_OPTIMIZATIONS.md`: Performance best practices and optimizations applied
  - `SECURITY_SUMMARY.md`: Security analysis and guidelines
  - `BACKGROUND_EFFECTS_AUDIT.md`: Visual effects documentation
  - `NAV_OPTIMIZATION_SUMMARY.md`: Navigation performance details
  - `OVERLAY_OPTIMIZATION_SUMMARY.md`: Overlay system documentation

## Technologies Used

### Core Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties (CSS variables), flexbox, grid, gradients, transforms
- **Vanilla JavaScript**: No frameworks - pure DOM manipulation
- **SVG**: Icon system and decorative elements

### External Dependencies
- **Google Fonts**: Bebas Neue font family
- **No build tools**: Static site with no compilation step
- **No package managers**: No npm, webpack, or bundlers

## Development Guidelines

### HTML Modifications

1. **Structure**: All content is in a single `index.html` file
2. **Sections**: Use semantic HTML5 tags (`<section>`, `<nav>`, `<header>`)
3. **Accessibility**: 
   - Include `aria-label` attributes for icon-only buttons
   - Maintain proper heading hierarchy (h1, h2, h3)
   - Ensure keyboard navigation works
   - Test with screen readers when possible

4. **SVG Usage**:
   - SVG files are referenced via `<img>` tags or background images
   - Inline SVGs used for icons that need CSS styling
   - External SVG files for better caching (e.g., corner ornaments)

### CSS Best Practices

#### Color Palette
Use CSS custom properties defined in `:root`:
```css
--primary-dark: #06222e
--primary-dark-alt: #061e2a
--accent-teal: #003d52
--accent-warm: #7a3013
--text-primary: #ffffff
--text-secondary: #e0e0e0
```

#### Performance Optimizations (Critical)
⚠️ **Always prioritize performance** - this site has been heavily optimized:

1. **Avoid Expensive Properties**:
   - ❌ DON'T use `backdrop-filter: blur()` - causes severe frame drops
   - ❌ DON'T use multiple `drop-shadow` filters
   - ❌ DON'T animate `filter`, `box-shadow`, or `border`
   - ✅ DO use `transform` and `opacity` for animations (GPU-accelerated)

2. **Use CSS Containment**:
   ```css
   .element {
       contain: layout style paint;
   }
   ```

3. **Optimize Will-Change**:
   - Only apply `will-change` before animations
   - Remove it after animations complete (via JavaScript)
   - Never leave it permanently on elements

4. **Background Images**:
   - Use `position: fixed` for backgrounds to avoid repaint on scroll
   - Preload critical LCP (Largest Contentful Paint) images
   - Use `will-change: transform` on fixed backgrounds

5. **Gradients**:
   - CSS gradients are preferred over images for better performance
   - Use `radial-gradient` for vignettes and glow effects

#### Responsive Design
- Mobile-first approach with `@media` queries
- Target breakpoint: `@media (max-width: 768px)`
- Test on various screen sizes
- Adjust spacing with CSS variables:
  ```css
  --section-spacing-desktop: 60px
  --section-spacing-mobile: 80px
  ```

### JavaScript Guidelines

1. **No External Libraries**: Keep the site dependency-free
2. **Modern ES6+**: Use arrow functions, const/let, template literals
3. **Performance**:
   - Use `passive: true` for scroll event listeners
   - Debounce/throttle expensive operations
   - Clean up event listeners when no longer needed

4. **Cookie Consent**:
   - Existing implementation in place
   - Essential cookies only by default
   - LocalStorage-based consent tracking

5. **Navigation**:
   - Smooth scroll behavior implemented
   - Will-change optimization for hover states
   - Touch-friendly for mobile

### Accessibility Requirements

1. **Color Contrast**: Maintain WCAG AA standards (4.5:1 for normal text)
2. **Motion**: Respect `prefers-reduced-motion` media query
   ```css
   @media (prefers-reduced-motion: reduce) {
       * {
           animation-duration: 0.01ms !important;
           transition-duration: 0.01ms !important;
       }
   }
   ```
3. **Keyboard Navigation**: All interactive elements must be keyboard accessible
4. **Focus Indicators**: Visible focus states for all interactive elements
5. **Alt Text**: All images must have descriptive alt text

### Security Best Practices

1. **No eval()**: Never use `eval()` or `Function()` constructor
2. **XSS Prevention**: 
   - Sanitize user input (though site has minimal user input)
   - Use `textContent` instead of `innerHTML` when possible
3. **Content Security Policy**: Compatible with strict CSP
4. **External Resources**: 
   - Only load from trusted CDNs (currently just Google Fonts)
   - Use `crossorigin` attribute for external resources
5. **No Inline Event Handlers**: Use `addEventListener()` instead

### Testing Approach for Static Site

Since this is a static site with no build process:

1. **Manual Testing**:
   - Open `index.html` in multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test responsive design with browser DevTools device emulation
   - Test on actual mobile devices when possible
   - Verify all links work
   - Test navigation menu functionality

2. **Performance Testing**:
   - Use Chrome DevTools Performance tab
   - Target: 60 FPS during scrolling
   - Target: < 3MB initial page load
   - Check Lighthouse scores (Performance, Accessibility, Best Practices, SEO)

3. **Accessibility Testing**:
   - Use browser's built-in accessibility inspector
   - Test keyboard navigation (Tab, Enter, Escape keys)
   - Test with screen reader (NVDA, JAWS, VoiceOver)
   - Validate with WAVE or axe DevTools

4. **Visual Testing**:
   - Ensure visual effects render correctly
   - Check corner ornaments display properly
   - Verify fractal artifacts load and display
   - Test cookie consent banner appearance

5. **Cross-Browser Testing**:
   - Desktop: Chrome, Firefox, Safari, Edge
   - Mobile: Chrome Mobile, Safari iOS
   - Test on different screen sizes and orientations

### Git Workflow

1. **Branching**: Use descriptive branch names (e.g., `copilot/add-new-feature`)
2. **Commits**: Clear, concise commit messages
3. **Pull Requests**: Use the PR template in `.github/PULL_REQUEST_TEMPLATE.md`
4. **Reviews**: Ensure visual changes are reviewed for performance impact

## Common Tasks

### Adding a New Section
1. Copy an existing section structure
2. Update content and IDs
3. Add navigation link if needed
4. Test responsive behavior
5. Verify performance (60 FPS scrolling)

### Modifying SVG Icons
1. Edit SVG files directly or use vector editor
2. Optimize SVG with SVGO if adding new files
3. Ensure icons work with current CSS styling
4. Test icon loading and caching

### Updating Styles
1. Use existing CSS variables when possible
2. Add new variables to `:root` for consistency
3. Follow performance guidelines (avoid expensive properties)
4. Test in all breakpoints
5. Verify with Lighthouse performance score

### Performance Optimization
1. Review `PERFORMANCE_OPTIMIZATIONS.md` before making changes
2. Profile with Chrome DevTools before and after changes
3. Maintain 60 FPS scrolling on desktop
4. Keep page size under 3MB
5. Optimize images (use WebP with PNG fallback where appropriate)

## AI Instructions

When working on this repository:
- **Prioritize performance**: This site has been heavily optimized - maintain those optimizations
- **Visual fidelity**: Preserve the epic, fractal-art aesthetic
- **Simplicity**: No build tools, no frameworks - keep it simple
- **Accessibility**: Always consider users with disabilities
- **Cross-browser compatibility**: Test on major browsers
- **Mobile-first**: Ensure excellent mobile experience
- **Security**: Follow security best practices even for static content
- **Documentation**: Update relevant .md files when making significant changes

### Design Philosophy
- Embrace subtle chaos and fractal art elements
- Use nuanced color schemes (teals, dark blues, warm accents)
- Smooth, GPU-accelerated animations
- Glass morphism without backdrop-filter (use semi-transparent backgrounds instead)
- Respect user preferences (motion, cookies, accessibility)

## Resources

- [Performance Optimizations](../PERFORMANCE_OPTIMIZATIONS.md)
- [Security Summary](../SECURITY_SUMMARY.md)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Web Performance Best Practices](https://web.dev/vitals/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*These instructions help GitHub Copilot understand the project structure and best practices for this repository.*
