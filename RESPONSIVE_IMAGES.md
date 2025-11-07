# Responsive Image Generation System

## Overview

This system automatically generates optimized, responsive image variants for the SupraSaiyans website. It creates AVIF, WebP, and JPEG versions of images at multiple widths to ensure fast loading and optimal display across all devices and browsers.

## Quick Start

### For Developers

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate all images from data files:**
   ```bash
   npm run generate-images -- --all
   ```

3. **Generate images for a specific file:**
   ```bash
   npm run generate-images -- --basename=DRAGONBALLSCOLLECTIONIMAGE --outDir=assets/images
   ```

### For Contributors

When adding a new collection image:

1. **Add your image to `/images` directory** (PNG or JPG, at least 1600px wide recommended)

2. **Use the helper script:**
   ```bash
   npm run add-gallery-item -- --type=spotlight --interactive --generate
   ```
   
   This will:
   - Prompt you for collection details
   - Add the item to the appropriate JSON file
   - Automatically generate responsive variants

3. **Or manually:** Add your item to `assets/data/spotlight.json` or `assets/data/nft-gallery.json`, then run:
   ```bash
   npm run generate-images -- --basename=YOUR_IMAGE_NAME
   ```

## How It Works

### Image Generation

The `scripts/generate-images.js` script uses [Sharp](https://sharp.pixelplumbing.com/) to create optimized variants:

**Formats:**
- **AVIF** (80% quality) - Best compression, modern browsers
- **WebP** (85% quality) - Good compression, wide support
- **JPEG** (90% quality, progressive) - Universal fallback

**Widths:**
- 400w - Mobile portrait
- 800w - Mobile landscape, small tablets
- 1200w - Tablets, small desktops
- 1600w - Large desktops, retina displays

**Example:** For `DRAGONBALLSCOLLECTIONIMAGE.PNG`, generates:
```
assets/images/DRAGONBALLSCOLLECTIONIMAGE-400w.avif
assets/images/DRAGONBALLSCOLLECTIONIMAGE-400w.webp
assets/images/DRAGONBALLSCOLLECTIONIMAGE-400w.jpg
assets/images/DRAGONBALLSCOLLECTIONIMAGE-800w.avif
... (12 files total if source is 1600px+)
```

### Browser Selection

The website uses `<picture>` elements with multiple `<source>` tags:

```html
<picture>
  <source srcset="assets/images/IMAGE-400w.avif 400w, ..." type="image/avif">
  <source srcset="assets/images/IMAGE-400w.webp 400w, ..." type="image/webp">
  <source srcset="assets/images/IMAGE-400w.jpg 400w, ..." type="image/jpeg">
  <source srcset="images/IMAGE.webp" type="image/webp">
  <img src="images/IMAGE.PNG" alt="...">
</picture>
```

Browsers automatically:
1. Choose the best format they support (AVIF > WebP > JPEG)
2. Select the appropriate width based on viewport size
3. Fall back to original image if variants don't exist

### CI/CD Automation

The GitHub Actions workflow (`.github/workflows/generate-images.yml`) automates image generation:

**Triggers:**
- **Manual:** Click "Run workflow" on GitHub Actions tab
  - Optional: Enable "force" to regenerate existing files
- **Automatic:** Push to `feature/add-generated-images` branch
- **Automatic:** Pull request targeting `feature/add-generated-images`

**What it does:**
1. Parses `assets/data/spotlight.json` and `assets/data/nft-gallery.json`
2. Extracts all image paths
3. Finds source images in `/images` or root directory
4. Generates responsive variants for each image
5. Commits generated files back to the branch with `[skip ci]` tag

**Usage:**
```bash
# Create feature branch
git checkout -b feature/add-generated-images

# Add new images and update JSON files
# ... make your changes ...

# Push to trigger workflow
git push origin feature/add-generated-images

# Workflow runs automatically and commits generated images
```

## File Structure

```
suprasaiyans.github.io/
├── .github/
│   └── workflows/
│       └── generate-images.yml    # CI workflow
├── assets/
│   ├── data/
│   │   ├── spotlight.json         # Spotlight items
│   │   └── nft-gallery.json       # NFT Gallery items
│   └── images/                    # Generated responsive variants
│       ├── IMAGE-400w.avif
│       ├── IMAGE-400w.webp
│       ├── IMAGE-400w.jpg
│       └── ...
├── images/                        # Source images
│   ├── COLLECTION1.PNG
│   ├── COLLECTION2.png
│   └── ...
├── scripts/
│   ├── generate-images.js         # Image generation CLI
│   ├── add-gallery-item.js        # Gallery management CLI
│   └── README.md                  # Script documentation
├── package.json                   # Dependencies
└── index.html                     # Website (includes responsive picture logic)
```

## Performance Benefits

### Before (Original PNGs)
- Single format (PNG)
- Single size (often 2400x2400 or larger)
- File sizes: 200KB - 7MB per image
- No format optimization

### After (Responsive Variants)
- Multiple formats (AVIF/WebP/JPEG)
- Multiple sizes (400w, 800w, 1200w, 1600w)
- File sizes: 10KB - 200KB depending on viewport
- Automatic browser optimization

**Example Savings:**
- Desktop (1200px): 2.4MB PNG → 165KB AVIF (93% reduction)
- Mobile (400px): 2.4MB PNG → 58KB AVIF (97% reduction)

## Browser Support

| Format | Browsers | Savings vs PNG |
|--------|----------|----------------|
| AVIF   | Chrome 85+, Edge 85+, Firefox 93+, Opera 71+ | ~70-85% |
| WebP   | Chrome 23+, Edge 18+, Firefox 65+, Safari 14+, Opera 12.1+ | ~50-70% |
| JPEG   | All browsers | ~30-50% |

Older browsers automatically fall back to JPEG or original PNG.

## Scripts Reference

### generate-images.js

**Synopsis:**
```bash
node scripts/generate-images.js [OPTIONS]
```

**Options:**
- `--basename=NAME` - Base name of source image (without extension)
- `--outDir=DIR` - Output directory (default: `assets/images`)
- `--force` - Overwrite existing files
- `--all` - Process all images from data files

**Examples:**
```bash
# Generate variants for one image
node scripts/generate-images.js --basename=DRAGONBALLSCOLLECTIONIMAGE

# Generate all images
node scripts/generate-images.js --all

# Force regeneration
node scripts/generate-images.js --all --force

# Custom output directory
node scripts/generate-images.js --basename=IMAGE --outDir=custom/path
```

### add-gallery-item.js

**Synopsis:**
```bash
node scripts/add-gallery-item.js [OPTIONS]
```

**Options:**
- `--type=TYPE` - Gallery type: `spotlight` or `nft`
- `--interactive` - Interactive mode (prompts for input)
- `--data=JSON` - JSON string with item data
- `--generate` - Auto-generate images after adding

**Examples:**
```bash
# Interactive mode
node scripts/add-gallery-item.js --type=spotlight --interactive

# Interactive with auto-generation
node scripts/add-gallery-item.js --type=nft --interactive --generate

# With JSON data
node scripts/add-gallery-item.js --type=spotlight --data='{"id":"spotlight-008",...}'
```

## Troubleshooting

### Images not loading

**Problem:** Images show as broken
**Solution:** 
1. Check if generated variants exist in `assets/images/`
2. Run `npm run generate-images -- --all`
3. Verify source images exist in `/images` directory

### Workflow fails

**Problem:** GitHub Actions workflow fails
**Solution:**
1. Check workflow logs for specific error
2. Ensure source images referenced in JSON actually exist
3. Verify image filenames match exactly (case-sensitive)

### Large file sizes

**Problem:** Generated images are still large
**Solution:**
1. Check source image dimensions (should be ~1600-2400px)
2. Verify source image isn't overly complex
3. Consider manually optimizing source before generation

### Missing variants for small images

**Problem:** Only some widths generated
**Solution:** This is expected! Script skips widths larger than source:
- Source 1080px → Generates only 400w, 800w (skips 1200w, 1600w)
- Source 2400px → Generates all widths

## Best Practices

### Source Images
1. **Resolution:** Minimum 1600px width (2400px recommended)
2. **Format:** PNG or JPEG (PNG preferred for graphics)
3. **Naming:** Use descriptive UPPERCASE names with no spaces
4. **Location:** Place in `/images` directory

### Adding Collections
1. Use `add-gallery-item.js --interactive --generate` for easiest workflow
2. Always generate images before committing
3. Test locally before pushing

### Workflow Usage
1. Use `workflow_dispatch` for bulk regeneration
2. Use feature branch for automatic processing
3. Enable `force` flag only when needed (e.g., quality improvements)

## Technical Details

### Dependencies
- **sharp**: ^0.33.0 - High-performance image processing

### Security
- ✅ CodeQL security scanning
- ✅ Dependency vulnerability scanning
- ✅ No known vulnerabilities

### Quality Settings
```javascript
QUALITY = {
  avif: 80,   // 80% - Best quality/size ratio for AVIF
  webp: 85,   // 85% - Good quality, smaller than PNG
  jpeg: 90    // 90% - High quality fallback
}
```

### Sizes Configuration
```javascript
WIDTHS = [400, 800, 1200, 1600]
```

Customizable in `scripts/generate-images.js` if needed.

## Contributing

When contributing new features or images:

1. **Test locally** with `npm run generate-images -- --all`
2. **Verify output** in `assets/images/`
3. **Check file sizes** are reasonable
4. **Update documentation** if changing behavior
5. **Run security checks** before submitting PR

## License

Part of the SupraSaiyans website project.

---

**Questions?** Check `scripts/README.md` for more detailed script documentation.
