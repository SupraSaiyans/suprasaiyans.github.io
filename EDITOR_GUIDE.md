# Editor's Guide: Adding Spotlight and NFT Gallery Items

This guide explains how to add new items to the Spotlight and NFT Gallery sections with minimal effort.

## Quick Start

To add a new item, you need to:
1. Add your image file to the `images/` directory
2. (Optional) Create a WebP version for better performance
3. Add a JSON entry to the appropriate data file
4. The website will automatically display your new item!

---

## Adding a New Spotlight Item

### Step 1: Prepare Your Image

1. **Add your image** to the `images/` directory
   - Recommended size: 600x600 pixels or larger
   - Supported formats: PNG, JPG, JPEG
   - Example: `images/MY_NEW_COLLECTION.png`

2. **Optional: Create a WebP version** for better performance
   - Convert your image to WebP format
   - Save with the same filename but `.webp` extension
   - Example: `images/MY_NEW_COLLECTION.webp`
   - The site will automatically use WebP when available

### Step 2: Add JSON Entry

Open `assets/data/spotlight.json` and add your new item to the `items` array:

```json
{
  "id": "spotlight-008",
  "number": 8,
  "title": "Your Collection Name",
  "description": "A brief description of your collection",
  "image": "images/MY_NEW_COLLECTION.png",
  "datePublished": "2025-11-15",
  "mintUrl": "https://crystara.trade/marketplace/your-collection",
  "tradeUrl": "https://crystara.trade/trade/your-collection"
}
```

### Field Descriptions

- **id**: Unique identifier (format: `spotlight-###`)
- **number**: Sequential number (increment from the last item)
- **title**: Collection name (displayed prominently)
- **description**: Short description (1-2 sentences)
- **image**: Path to your image file (relative to root)
- **datePublished**: ISO date format (YYYY-MM-DD) - determines display order (newest first)
- **mintUrl**: (Optional) Link to mint page
- **tradeUrl**: (Optional) Link to trade page

### Example: Complete Entry

```json
{
  "items": [
    {
      "id": "spotlight-008",
      "number": 8,
      "title": "Cosmic Warriors",
      "description": "The ultimate battle for the universe begins",
      "image": "images/COSMICWARRIORSCOLLECTIONIMAGE.png",
      "datePublished": "2025-11-15",
      "mintUrl": "https://crystara.trade/marketplace/cosmicwarriors",
      "tradeUrl": "https://crystara.trade/trade/cosmicwarriors"
    },
    // ... existing items ...
  ]
}
```

---

## Adding a New NFT Gallery Item

The process is identical to Spotlight, but uses `assets/data/nft-gallery.json`:

### Step 1: Prepare Your Image
(Same as Spotlight - see above)

### Step 2: Add JSON Entry

Open `assets/data/nft-gallery.json` and add your item:

```json
{
  "id": "nft-020",
  "number": 20,
  "title": "Your NFT Collection",
  "description": "Description of your NFT",
  "image": "images/YOUR_NFT_IMAGE.png",
  "datePublished": "2025-11-15",
  "mintUrl": "https://crystara.trade/marketplace/your-nft",
  "tradeUrl": "https://crystara.trade/trade/your-nft"
}
```

### Note on Display Order

Items are automatically sorted by `datePublished` (newest first):
- **Featured**: The newest item (most recent date) displays as the large featured tile
- **Cards**: The next 3 items (Spotlight) or 15 items (NFT Gallery) display as cards
- **History**: Older items appear in the compact history list

---

## Image Optimization Best Practices

### WebP Format (Recommended)

WebP images are **30-50% smaller** than PNG/JPG with the same quality:

1. **Convert your images to WebP**:
   - Online: Use [Squoosh.app](https://squoosh.app/)
   - CLI: `cwebp input.png -o output.webp`
   - Photoshop: Save for Web > WebP

2. **Save both formats**:
   ```
   images/MY_COLLECTION.png    (fallback)
   images/MY_COLLECTION.webp   (optimized)
   ```

3. The website automatically uses WebP when available, falling back to PNG/JPG for older browsers.

### Image Size Guidelines

- **Featured items**: 600x600px minimum (displayed large on desktop)
- **Card items**: 300x300px minimum
- **History thumbnails**: 60x60px (automatically scaled from main image)

### File Naming Convention

- Use UPPERCASE for consistency with existing files
- Use descriptive names: `COLLECTIONNAMECOLLECTIONIMAGE.png`
- Avoid spaces (use underscores or no separators)

---

## Responsive Images (How It Works)

The site automatically generates responsive `<picture>` elements that:
- Serve WebP format to supported browsers
- Fall back to PNG/JPG for older browsers
- Include `srcset` for different screen sizes
- Use lazy loading for better performance
- Include width/height to prevent layout shift

You don't need to do anything special - just provide the images and JSON!

---

## Testing Your Changes

After adding a new item:

1. **Open the website** in a browser
2. **Navigate to** the Spotlight or NFT Gallery section
3. **Verify**:
   - Your image displays correctly
   - Title and description appear
   - Links work (Mint/Trade buttons)
   - Item appears in the correct order based on date

### Local Testing

If testing locally:
```bash
# Simple HTTP server with Python
python3 -m http.server 8000

# Or with Node.js
npx http-server
```

Then open `http://localhost:8000` in your browser.

---

## Troubleshooting

### Image Not Displaying?

- ✅ Check file path in JSON matches actual file location
- ✅ Ensure image file exists in `images/` directory
- ✅ Check for typos in filename (case-sensitive)
- ✅ Verify image format is PNG, JPG, or JPEG

### Wrong Display Order?

- ✅ Check `datePublished` field (ISO format: YYYY-MM-DD)
- ✅ Newer dates appear first (e.g., 2025-11-15 before 2025-11-01)

### JSON Syntax Error?

- ✅ Validate JSON at [JSONLint.com](https://jsonlint.com/)
- ✅ Check for missing commas between items
- ✅ Ensure proper quote marks (double quotes, not single)
- ✅ Make sure the last item in array doesn't have a trailing comma

### WebP Not Loading?

- ✅ WebP filename must match original (e.g., `image.png` → `image.webp`)
- ✅ WebP is optional - site works fine with PNG/JPG only
- ✅ Browsers automatically use PNG/JPG if WebP not available

---

## Advanced: Batch Adding Multiple Items

To add multiple items at once:

1. **Prepare all images** and place in `images/` directory
2. **Edit the JSON file** and add all entries in one go
3. **Validate JSON** to catch any syntax errors
4. **Test** to ensure all items display correctly

Example of adding multiple items:

```json
{
  "items": [
    {
      "id": "spotlight-008",
      "number": 8,
      "title": "Collection A",
      "description": "First new collection",
      "image": "images/COLLECTIONA.png",
      "datePublished": "2025-11-15",
      "mintUrl": "...",
      "tradeUrl": "..."
    },
    {
      "id": "spotlight-009",
      "number": 9,
      "title": "Collection B",
      "description": "Second new collection",
      "image": "images/COLLECTIONB.png",
      "datePublished": "2025-11-16",
      "mintUrl": "...",
      "tradeUrl": "..."
    },
    // ... existing items ...
  ]
}
```

---

## Summary Checklist

- [ ] Image added to `images/` directory
- [ ] (Optional) WebP version created
- [ ] JSON entry added with correct format
- [ ] All required fields filled in
- [ ] `datePublished` set correctly
- [ ] JSON validated (no syntax errors)
- [ ] Changes tested in browser
- [ ] Links (Mint/Trade) verified

---

## Questions or Issues?

If you encounter any problems:
1. Check this guide's troubleshooting section
2. Validate your JSON syntax
3. Verify image paths and filenames
4. Contact the development team for assistance

---

**That's it!** The website handles all the responsive image generation, lazy loading, and display logic automatically. Just add your images and JSON, and you're done! 🎉
