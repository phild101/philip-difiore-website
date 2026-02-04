/**
 * Image Migration Script
 * Downloads images from WordPress and uploads them to Supabase Storage
 * Then updates the projects table with new URLs
 *
 * Usage: node migrate-images.js
 */

const https = require('https');
const http = require('http');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://gjvvbofpkxuicrpshxun.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdnZib2Zwa3h1aWNycHNoeHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNzY1NzcsImV4cCI6MjA4NTc1MjU3N30.igGl_64MuqL-0VsLE4NibmMq1hPxnZ_WusRrM043n5M';
const BUCKET_NAME = 'project-images';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Download an image from a URL and return it as a Buffer
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Extract filename from URL
 */
function getFilenameFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

/**
 * Get content type from filename
 */
function getContentType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const types = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
  };
  return types[ext] || 'image/jpeg';
}

/**
 * Upload image to Supabase Storage
 */
async function uploadToSupabase(buffer, filename) {
  const contentType = getContentType(filename);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, buffer, {
      contentType,
      upsert: true, // Overwrite if exists
    });

  if (error) {
    throw new Error(`Failed to upload ${filename}: ${error.message}`);
  }

  // Return the public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);

  return urlData.publicUrl;
}

/**
 * Update project in database with new image URL
 */
async function updateProjectImage(projectId, newUrl) {
  const { error } = await supabase
    .from('projects')
    .update({ featured_image: newUrl })
    .eq('id', projectId);

  if (error) {
    throw new Error(`Failed to update project ${projectId}: ${error.message}`);
  }
}

/**
 * Main migration function
 */
async function migrateImages() {
  console.log('Starting image migration...\n');

  // Fetch all projects with images
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, featured_image')
    .not('featured_image', 'is', null)
    .order('id');

  if (error) {
    console.error('Failed to fetch projects:', error.message);
    process.exit(1);
  }

  console.log(`Found ${projects.length} projects with images to migrate.\n`);

  let successCount = 0;
  let failCount = 0;

  for (const project of projects) {
    const oldUrl = project.featured_image;

    // Skip if already migrated to Supabase
    if (oldUrl.includes('supabase.co')) {
      console.log(`[SKIP] ${project.title} - Already migrated`);
      continue;
    }

    const filename = getFilenameFromUrl(oldUrl);

    try {
      console.log(`[DOWNLOAD] ${project.title}`);
      console.log(`  From: ${oldUrl}`);

      const imageBuffer = await downloadImage(oldUrl);
      console.log(`  Downloaded: ${(imageBuffer.length / 1024).toFixed(1)} KB`);

      console.log(`[UPLOAD] Uploading to Supabase Storage...`);
      const newUrl = await uploadToSupabase(imageBuffer, filename);
      console.log(`  New URL: ${newUrl}`);

      console.log(`[UPDATE] Updating database...`);
      await updateProjectImage(project.id, newUrl);

      console.log(`[SUCCESS] ${project.title}\n`);
      successCount++;

    } catch (err) {
      console.error(`[FAILED] ${project.title}: ${err.message}\n`);
      failCount++;
    }
  }

  console.log('\n========================================');
  console.log(`Migration complete!`);
  console.log(`  Succeeded: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
  console.log('========================================\n');
}

// Run the migration
migrateImages().catch(console.error);
