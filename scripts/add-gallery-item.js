#!/usr/bin/env node

/**
 * Add a new item to Spotlight or NFT Gallery
 * 
 * This helper script adds a new item to the appropriate JSON data file
 * and optionally generates responsive image variants.
 * 
 * Usage:
 *   node scripts/add-gallery-item.js --type=<spotlight|nft> --data=<json-string>
 *   node scripts/add-gallery-item.js --type=spotlight --interactive
 * 
 * Options:
 *   --type           Type of gallery (spotlight or nft)
 *   --data           JSON string with item data
 *   --interactive    Interactive mode (prompts for input)
 *   --generate       Auto-generate responsive images after adding
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Data file paths
const DATA_FILES = {
  spotlight: 'assets/data/spotlight.json',
  nft: 'assets/data/nft-gallery.json'
};

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    type: null,
    data: null,
    interactive: false,
    generate: false
  };

  for (const arg of args) {
    if (arg.startsWith('--type=')) {
      options.type = arg.split('=')[1];
    } else if (arg.startsWith('--data=')) {
      options.data = arg.split('=')[1];
    } else if (arg === '--interactive') {
      options.interactive = true;
    } else if (arg === '--generate') {
      options.generate = true;
    }
  }

  return options;
}

/**
 * Prompt user for input
 */
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * Interactive mode - gather item data from user
 */
async function interactiveMode(type) {
  console.log(`\nAdding new ${type} item interactively\n`);

  const id = await prompt('ID (e.g., spotlight-008, nft-020): ');
  const number = parseInt(await prompt('Number: '), 10);
  const title = await prompt('Title: ');
  const description = await prompt('Description: ');
  const image = await prompt('Image path (e.g., images/FILENAME.PNG): ');
  const datePublished = await prompt('Date Published (YYYY-MM-DD): ');
  const mintUrl = await prompt('Mint URL: ');
  const tradeUrl = await prompt('Trade URL: ');

  return {
    id,
    number,
    title,
    description,
    image,
    datePublished,
    mintUrl,
    tradeUrl
  };
}

/**
 * Validate item data
 */
function validateItem(item) {
  const required = ['id', 'number', 'title', 'description', 'image', 'datePublished', 'mintUrl', 'tradeUrl'];
  const missing = required.filter(field => !item[field]);

  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  if (typeof item.number !== 'number') {
    throw new Error('Number must be a number');
  }

  return true;
}

/**
 * Add item to data file
 */
function addItemToDataFile(type, item) {
  const dataFile = DATA_FILES[type];

  // Read existing data
  let data = { items: [] };
  if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  }

  // Check for duplicate ID
  const existingItem = data.items.find(i => i.id === item.id);
  if (existingItem) {
    throw new Error(`Item with ID ${item.id} already exists`);
  }

  // Add new item
  data.items.push(item);

  // Sort by number (descending for spotlight, can be customized)
  data.items.sort((a, b) => a.number - b.number);

  // Write back to file
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2) + '\n', 'utf-8');

  console.log(`\n✓ Added item to ${dataFile}`);
  console.log(`  ID: ${item.id}`);
  console.log(`  Title: ${item.title}`);
}

/**
 * Generate responsive images for the item
 */
async function generateImages(imagePath) {
  console.log(`\nGenerating responsive images for: ${imagePath}`);
  
  const basename = path.basename(imagePath, path.extname(imagePath));
  
  // Spawn the generate-images script
  const { spawn } = require('child_process');
  
  return new Promise((resolve, reject) => {
    const proc = spawn('node', [
      'scripts/generate-images.js',
      `--basename=${basename}`,
      '--outDir=assets/images'
    ], { stdio: 'inherit' });

    proc.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Image generation failed with code ${code}`));
      }
    });
  });
}

/**
 * Main execution
 */
async function main() {
  const options = parseArgs();

  console.log('SupraSaiyans Gallery Item Manager\n');

  // Validate type
  if (!options.type || !DATA_FILES[options.type]) {
    console.error('Error: Invalid or missing --type parameter');
    console.error('Valid types: spotlight, nft');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/add-gallery-item.js --type=spotlight --interactive');
    process.exit(1);
  }

  let item;

  if (options.interactive) {
    // Interactive mode
    item = await interactiveMode(options.type);
  } else if (options.data) {
    // Parse JSON data
    try {
      item = JSON.parse(options.data);
    } catch (error) {
      console.error('Error: Invalid JSON data');
      console.error(error.message);
      process.exit(1);
    }
  } else {
    console.error('Error: Please specify --interactive or --data');
    process.exit(1);
  }

  // Validate item
  try {
    validateItem(item);
  } catch (error) {
    console.error('Error: Validation failed');
    console.error(error.message);
    process.exit(1);
  }

  // Add item to data file
  try {
    addItemToDataFile(options.type, item);
  } catch (error) {
    console.error('Error: Failed to add item');
    console.error(error.message);
    process.exit(1);
  }

  // Generate images if requested
  if (options.generate) {
    try {
      await generateImages(item.image);
      console.log('\n✓ Responsive images generated successfully!');
    } catch (error) {
      console.error('\nWarning: Image generation failed');
      console.error(error.message);
      console.error('You can generate images manually with:');
      console.error(`  npm run generate-images -- --basename=${path.basename(item.image, path.extname(item.image))}`);
    }
  }

  console.log('\n✓ Gallery item added successfully!');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
