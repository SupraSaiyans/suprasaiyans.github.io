# SupraSaiyans Image Generation Scripts

This directory contains utility scripts for managing responsive images and gallery content.

## Scripts

### generate-images.js

Generates responsive image variants (AVIF, WebP, JPG) at multiple widths for use in responsive `<picture>` elements.

**Usage:**

```bash
# Generate variants for a single image
node scripts/generate-images.js --basename=DRAGONBALLSCOLLECTIONIMAGE --outDir=assets/images

# Generate variants for all images in data files
node scripts/generate-images.js --all

# Force regeneration of existing files
node scripts/generate-images.js --all --force

# Using npm script
npm run generate-images -- --all
```

**Options:**
- `--basename` - Base name of the source image (without extension)
- `--outDir` - Output directory (default: `assets/images`)
- `--force` - Overwrite existing generated files
- `--all` - Process all images from spotlight.json and nft-gallery.json

**Generated Files:**

For a source image like `images/DRAGONBALLSCOLLECTIONIMAGE.PNG`, the script generates:

```
assets/images/DRAGONBALLSCOLLECTIONIMAGE-400w.avif
assets/images/DRAGONBALLSCOLLECTIONIMAGE-400w.webp
assets/images/DRAGONBALLSCOLLECTIONIMAGE-400w.jpg
assets/images/DRAGONBALLSCOLLECTIONIMAGE-800w.avif
assets/images/DRAGONBALLSCOLLECTIONIMAGE-800w.webp
assets/images/DRAGONBALLSCOLLECTIONIMAGE-800w.jpg
assets/images/DRAGONBALLSCOLLECTIONIMAGE-1200w.avif
assets/images/DRAGONBALLSCOLLECTIONIMAGE-1200w.webp
assets/images/DRAGONBALLSCOLLECTIONIMAGE-1200w.jpg
assets/images/DRAGONBALLSCOLLECTIONIMAGE-1600w.avif
assets/images/DRAGONBALLSCOLLECTIONIMAGE-1600w.webp
assets/images/DRAGONBALLSCOLLECTIONIMAGE-1600w.jpg
```

### add-gallery-item.js

Add a new item to the Spotlight or NFT Gallery.

**Usage:**

```bash
# Interactive mode
node scripts/add-gallery-item.js --type=spotlight --interactive

# With JSON data
node scripts/add-gallery-item.js --type=nft --data='{"id":"nft-020","number":20,...}'

# Interactive mode with automatic image generation
node scripts/add-gallery-item.js --type=spotlight --interactive --generate

# Using npm script
npm run add-gallery-item -- --type=spotlight --interactive
```

**Options:**
- `--type` - Gallery type: `spotlight` or `nft`
- `--interactive` - Interactive mode (prompts for input)
- `--data` - JSON string with item data
- `--generate` - Automatically generate responsive images after adding

**Required Item Fields:**
- `id` - Unique identifier (e.g., "spotlight-008")
- `number` - Sequential number
- `title` - Display title
- `description` - Item description
- `image` - Image path (e.g., "images/FILENAME.PNG")
- `datePublished` - Publication date (YYYY-MM-DD)
- `mintUrl` - Minting URL
- `tradeUrl` - Trading URL

## Automated CI/CD

The GitHub Actions workflow `.github/workflows/generate-images.yml` automatically:

1. Runs on manual trigger (workflow_dispatch)
2. Runs on push to `feature/add-generated-images` branch
3. Runs on PR targeting `feature/add-generated-images` branch
4. Parses `spotlight.json` and `nft-gallery.json`
5. Generates responsive variants for all referenced images
6. Commits the generated files back to the branch

## Requirements

- Node.js 18+
- Sharp library (installed via `npm install`)

## Source Image Requirements

- Place source images in `images/` directory or repository root
- Supported formats: PNG, JPG, JPEG (case-insensitive)
- Recommended minimum width: 1600px for best quality at all sizes
- Images are automatically optimized during variant generation

## Quality Settings

- AVIF: 80% quality
- WebP: 85% quality
- JPEG: 90% quality, progressive

## Browser Support

The generated responsive images support:
- Modern browsers: AVIF (Chrome 85+, Edge 85+, Firefox 93+, Opera 71+)
- Wider support: WebP (Chrome 23+, Edge 18+, Firefox 65+, Safari 14+, Opera 12.1+)
- Universal fallback: JPEG (all browsers)

Browsers automatically select the best format they support.
