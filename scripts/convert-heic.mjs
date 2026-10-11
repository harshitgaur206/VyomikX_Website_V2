import fs from 'node:fs';
import path from 'node:path';
import convert from 'heic-convert';
import sharp from 'sharp';

const folders = ['Agrasen_Inter_College', 'Babulal_Jain_Inter_College'];

async function processFolder(folder) {
  const dir = path.join('public', 'Workshops', folder);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.heic')) {
      const baseName = path.parse(file).name;
      const targetJpg = path.join(dir, `${baseName}.jpg`);
      if (fs.existsSync(targetJpg)) {
        console.log(`Skipping already converted: ${targetJpg}`);
        continue;
      }
      console.log(`Converting ${file}...`);
      const inputBuffer = fs.readFileSync(path.join(dir, file));
      const rawJpg = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.88 });
      // Apply sharp rotation & resize if gigantic
      const optimized = await sharp(rawJpg)
        .rotate()
        .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(targetJpg, optimized);
      console.log(`Saved ${targetJpg} (${optimized.length} bytes)`);
    }
  }
}

async function main() {
  for (const folder of folders) {
    await processFolder(folder);
  }
  console.log('All HEIC files successfully converted to JPEG!');
}

main().catch(console.error);

