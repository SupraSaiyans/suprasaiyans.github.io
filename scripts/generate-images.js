#!/usr/bin/env node

/**
 * Generate responsive image variants for SupraSaiyans website
 * 
 * Creates AVIF, WebP, and JPG variants at multiple widths for responsive picture elements.
 * 
 * Usage:
 *   node scripts/generate-images.js --basename=<name> --outDir=<dir> [--force]
 *   node scripts/generate-images.js --all [--force]
 * 
 * Options:
 *   --basename    Base name of the source image (without extension)
 *   --outDir      Output directory for generated images (default: assets/images)
 *   --force       Overwrite existing generated files
 *   --all         Process all images from data JSON files
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const WIDTHS = [400, 800, 1200, 1600];
const FORMATS = ['avif', 'webp', 'jpeg'];
const QUALITY = {
  avif: 80,
  webp: 85,
  jpeg: 90
};

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    basename: null,
    outDir: 'assets/images',
    force: false,
    all: false
  };

  for (const arg of args) {
    if (arg.startsWith('--basename=')) {
      const value = arg.split('=')[1];
      if (value) options.basename = value;
    } else if (arg.startsWith('--outDir=')) {
      const value = arg.split('=')[1];
      if (value) options.outDir = value;
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--all') {
      options.all = true;
    }
  }

  return options;
}

/**
 * Find source image file by basename
 * Checks both /images and root directory with various extensions
 */
function findSourceImage(basename) {
  const possibleExtensions = ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG'];
  const possibleDirs = ['images', '.'];
  
  for (const dir of possibleDirs) {
    for (const ext of possibleExtensions) {
      const filePath = path.join(dir, basename + ext);
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }
  }
  
  return null;
}

/**
 * Generate responsive image variants
 */
async function generateVariants(sourcePath, basename, outDir, force = false) {
  // Ensure output directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Processing: ${sourcePath}`);

  // Get image metadata
  const metadata = await sharp(sourcePath).metadata();
  console.log(`  Original: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

  let generated = 0;
  let skipped = 0;

  for (const width of WIDTHS) {
    // Skip if width is larger than original
    if (width > metadata.width) {
      console.log(`  Skipping ${width}w (larger than original ${metadata.width}w)`);
      continue;
    }

    for (const format of FORMATS) {
      const outputFile = path.join(outDir, `${basename}-${width}w.${format === 'jpeg' ? 'jpg' : format}`);
      
      // Skip if file exists and not forcing
      if (fs.existsSync(outputFile) && !force) {
        skipped++;
        continue;
      }

      // Generate image variant
      try {
        let pipeline = sharp(sourcePath).resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });

        // Apply format-specific options
        if (format === 'avif') {
          pipeline = pipeline.avif({ quality: QUALITY.avif });
        } else if (format === 'webp') {
          pipeline = pipeline.webp({ quality: QUALITY.webp });
        } else if (format === 'jpeg') {
          pipeline = pipeline.jpeg({ quality: QUALITY.jpeg, progressive: true });
        }

        await pipeline.toFile(outputFile);
        console.log(`  ✓ Generated: ${outputFile}`);
        generated++;
      } catch (error) {
        console.error(`  ✗ Failed to generate ${outputFile}: ${error.message}`);
      }
    }
  }

  console.log(`  Summary: ${generated} generated, ${skipped} skipped\n`);
  return { generated, skipped };
}

/**
 * Extract image basenames from data JSON files
 */
function extractImagesFromDataFiles() {
  const dataFiles = [
    'assets/data/spotlight.json',
    'assets/data/nft-gallery.json'
  ];

  const images = new Set();

  for (const dataFile of dataFiles) {
    if (!fs.existsSync(dataFile)) {
      console.warn(`Warning: ${dataFile} not found`);
      continue;
    }

    try {
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
      if (data.items && Array.isArray(data.items)) {
        for (const item of data.items) {
          if (item.image) {
            // Extract basename from image path
            // Handle paths like "images/FILE.PNG" or just "FILE.png"
            const imagePath = item.image;
            const basename = path.basename(imagePath, path.extname(imagePath));
            images.add(basename);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading ${dataFile}: ${error.message}`);
    }
  }

  return Array.from(images);
}

/**
 * Main execution
 */
async function main() {
  const options = parseArgs();

  console.log('SupraSaiyans Responsive Image Generator\n');
  console.log('Configuration:');
  console.log(`  Output directory: ${options.outDir}`);
  console.log(`  Force overwrite: ${options.force}`);
  console.log(`  Widths: ${WIDTHS.join(', ')}`);
  console.log(`  Formats: ${FORMATS.join(', ')}\n`);

  let totalGenerated = 0;
  let totalSkipped = 0;
  let processed = 0;
  let failed = 0;

  if (options.all) {
    // Process all images from data files
    console.log('Processing all images from data files...\n');
    const basenames = extractImagesFromDataFiles();
    console.log(`Found ${basenames.length} unique images to process\n`);

    for (const basename of basenames) {
      const sourcePath = findSourceImage(basename);
      if (!sourcePath) {
        console.warn(`⚠ Source image not found for: ${basename}`);
        failed++;
        continue;
      }

      const result = await generateVariants(sourcePath, basename, options.outDir, options.force);
      totalGenerated += result.generated;
      totalSkipped += result.skipped;
      processed++;
    }
  } else if (options.basename) {
    // Process single image
    const sourcePath = findSourceImage(options.basename);
    if (!sourcePath) {
      console.error(`Error: Source image not found for basename: ${options.basename}`);
      console.error('Checked extensions: .png, .PNG, .jpg, .JPG, .jpeg, .JPEG');
      console.error('Checked directories: images/, ./');
      process.exit(1);
    }

    const result = await generateVariants(sourcePath, options.basename, options.outDir, options.force);
    totalGenerated += result.generated;
    totalSkipped += result.skipped;
    processed++;
  } else {
    console.error('Error: Please specify --basename or --all');
    console.error('');
    console.error('Examples:');
    console.error('  node scripts/generate-images.js --basename=DRAGONBALLSCOLLECTIONIMAGE --outDir=assets/images');
    console.error('  node scripts/generate-images.js --all');
    process.exit(1);
  }

  // Final summary
  console.log('═'.repeat(60));
  console.log('FINAL SUMMARY');
  console.log('═'.repeat(60));
  console.log(`Total processed: ${processed}`);
  console.log(`Total generated: ${totalGenerated}`);
  console.log(`Total skipped: ${totalSkipped}`);
  console.log(`Total failed: ${failed}`);
  console.log('');

  if (totalGenerated > 0) {
    console.log('✓ Image generation complete!');
  } else if (totalSkipped > 0 && totalGenerated === 0) {
    console.log('ℹ All files already exist. Use --force to regenerate.');
  }
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
