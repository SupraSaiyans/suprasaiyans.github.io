# SupraSaiyans Static Website

SupraSaiyans is a static HTML/CSS/JavaScript website for a cryptocurrency and NFT project built on the Supra Network. This is a single-page application hosted on GitHub Pages with a custom domain (suprasaiyans.com).

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Test the Repository
- No build process required - this is a static website served directly by GitHub Pages
- Test locally using Python HTTP server:
  - `cd /home/runner/work/suprasaiyans.github.io/suprasaiyans.github.io`
  - `python3 -m http.server 8000 --bind 127.0.0.1`
  - Open http://127.0.0.1:8000/ in browser to test
- TIMING: Server starts instantly (<1 second), site loads in <2 seconds

### Repository Structure
```
/
├── index.html              # Main single-page application (27KB)
├── CNAME                   # GitHub Pages custom domain config
├── README.md               # Minimal project description  
├── logo.png               # Main logo (actually JPEG format)
├── Logo.png               # Duplicate logo file
├── background1.png        # Background image (actually JPEG format)
├── DREAMINGDRAGONSWOW*.jpg # NFT collection images
└── .git/                  # Git repository
```

### Making Changes
- Edit `index.html` directly - all HTML, CSS, and JavaScript is in this single file
- Test changes immediately by refreshing browser (no build step needed)
- All styling is embedded in `<style>` tags in the HTML head
- Images are referenced directly and load from the same directory

## Validation

### CRITICAL: Always Manually Test Changes
After making any changes to the website:

1. **Start Local Server**: `python3 -m http.server 8000 --bind 127.0.0.1`
2. **Browser Testing**: Navigate to http://127.0.0.1:8000/
3. **Navigation Test**: Click all navigation links (Home, Roadmap, NFT Gallery, Stakonomics, Lore, Blog, Community)
4. **Link Validation**: Verify anchor navigation works (URLs change to #section-name)
5. **Image Loading**: Confirm all images display correctly (logo, background, NFT images)
6. **External Links**: Test that external links open correctly:
   - Telegram: https://t.me/suprasaiyans
   - Discord: https://discord.gg/HsVHCXCR
   - X (Twitter): https://x.com/suprasaiyans
   - Pumpit trading: https://www.pumpit.pro/token/...
   - NFT marketplace: https://crystara.trade/marketplace/dreamingdragons

### Visual Validation Scenarios
- **Layout**: Verify the site maintains its dark theme with blue/teal accents
- **Logo**: SupraSaiyans logo displays prominently in the hero section
- **Background**: Animated border effects and background image load correctly
- **Responsive**: Test basic responsive behavior if making CSS changes
- **Typography**: Text remains readable with proper contrast

### Common File Issues
- Image files have `.png` extensions but are actually JPEG format - this is normal
- `Logo.png` and `logo.png` are duplicate files (case sensitivity on some systems)
- Background image is referenced as `background1.png` in CSS

## Development Workflow

### Standard Change Process
1. **Edit**: Modify `index.html` directly with your changes
2. **Test**: Start HTTP server and validate in browser
3. **Validate**: Run through complete user scenarios
4. **Deploy**: Commit and push to trigger GitHub Pages deployment

### No Build Tools Needed
- **No package.json** - this is not a Node.js project
- **No npm commands** - no dependencies to install
- **No build scripts** - files are served as-is
- **No bundling** - single HTML file with embedded CSS/JS
- **No transpilation** - standard HTML/CSS/JavaScript only

### GitHub Pages Deployment
- **Automatic**: Pushes to main branch automatically deploy to GitHub Pages
- **Custom Domain**: Site is available at suprasaiyans.com (configured via CNAME)
- **TIMING**: Deployment typically takes 1-2 minutes after push
- **No CI/CD**: No GitHub Actions or build workflows configured

## Key Project Areas

### Main Sections (All in index.html)
- **Navigation**: Fixed header with anchor links to sections
- **Hero Section**: Main logo, social links, and primary CTA button
- **Roadmap**: Four-phase development plan display
- **NFT Gallery**: Dreaming Dragons collection showcase
- **Stakonomics**: Token economics and staking information
- **Lore**: Project background and storytelling
- **Blog**: Educational content and market insights (placeholder links)
- **Community**: Social media and platform links

### External Integrations
- **Supra Network**: Blockchain platform for the project
- **Pumpit**: Token trading platform integration
- **Crystara**: NFT marketplace for Dreaming Dragons
- **Social Platforms**: Telegram, Discord, X (Twitter) for community

### Color Palette (CSS Variables)
```css
--primary-dark: #06222e
--accent-teal: #003d52
--accent-warm: #7a3013
--text-primary: #ffffff
--text-secondary: #e0e0e0
```

## Troubleshooting

### Common Issues
- **Images not loading**: Check file paths are correct and files exist
- **Navigation not working**: Verify anchor links match section IDs
- **Styling broken**: Check CSS syntax in embedded `<style>` tags
- **External links failing**: Verify URLs are correct and accessible

### File Format Notes
- Logo and background files have `.png` extensions but are JPEG format
- This is intentional and works correctly in browsers
- Do not convert to actual PNG unless specifically required

### Testing Best Practices
- Always test locally before committing changes
- Verify all interactive elements work as expected
- Check external links periodically for availability
- Test on different screen sizes for responsive behavior

## Quick Reference Commands

### Development Server
```bash
cd /home/runner/work/suprasaiyans.github.io/suprasaiyans.github.io
python3 -m http.server 8000 --bind 127.0.0.1
```

### File Validation
```bash
ls -la                     # List all files
file *.png *.jpg          # Check image file formats
wc -l index.html          # Check HTML file size (~748 lines)
```

### Git Operations
```bash
git status                # Check working directory status
git add .                 # Stage changes
git commit -m "message"   # Commit changes
git push origin main      # Deploy to GitHub Pages
```