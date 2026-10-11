import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(numImages, 4);

  const entries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((img) => img.buffer)]);
}

async function main() {
  const logoPath = path.resolve('public/logo/logo.jpg');
  
  // 1. Crop out the bottom artifact line (585x585)
  const cleanBase = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: 585, height: 585 })
    .png()
    .toBuffer();

  // 2. Trim whitespace to get the pure logo mark
  const trimmed = await sharp(cleanBase).trim().png().toBuffer();
  const trimmedMeta = await sharp(trimmed).metadata();

  console.log('Trimmed mark size:', trimmedMeta.width, 'x', trimmedMeta.height);

  // 3. Create high-res 512x512 rounded icon
  const S = 512;
  const markTargetWidth = Math.round(S * 0.76); // ~389px
  const markTargetHeight = Math.round(markTargetWidth * (trimmedMeta.height / trimmedMeta.width)); // ~294px
  
  const resizedMark = await sharp(trimmed)
    .resize(markTargetWidth, markTargetHeight, { fit: 'contain' })
    .toBuffer();

  const cornerRadius = Math.round(S * 0.22); // ~112px
  // SVG background with rounded rectangle
  const roundedBgSvg = Buffer.from(`
    <svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${S}" height="${S}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#ffffff"/>
    </svg>
  `);

  const icon512 = await sharp({
    create: {
      width: S,
      height: S,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: roundedBgSvg, top: 0, left: 0 },
      {
        input: resizedMark,
        top: Math.round((S - markTargetHeight) / 2),
        left: Math.round((S - markTargetWidth) / 2),
      },
    ])
    .png()
    .toBuffer();

  // Save 512x512
  await sharp(icon512).toFile('public/icon-512.png');
  await sharp(icon512).toFile('public/icon.png');
  await sharp(icon512).toFile('app/icon.png');

  // 192x192
  await sharp(icon512).resize(192, 192).toFile('public/icon-192.png');

  // 180x180 (Apple touch icon)
  await sharp(icon512).resize(180, 180).toFile('public/apple-icon.png');
  await sharp(icon512).resize(180, 180).toFile('app/apple-icon.png');

  // 32x32 & 48x48 & 16x16
  const buf32 = await sharp(icon512).resize(32, 32).png().toBuffer();
  const buf16 = await sharp(icon512).resize(16, 16).png().toBuffer();
  const buf48 = await sharp(icon512).resize(48, 48).png().toBuffer();

  await sharp(buf32).toFile('public/icon-light-32x32.png');
  await sharp(buf32).toFile('public/icon-dark-32x32.png');

  // Pack multi-size favicon.ico
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
    { width: 48, height: 48, buffer: buf48 },
  ]);

  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('app/favicon.ico', icoBuffer);

  // Also create public/icon.svg embedding the mark for SVG favicon
  const markBase64 = resizedMark.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
  <rect width="${S}" height="${S}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#ffffff"/>
  <image href="data:image/png;base64,${markBase64}" x="${Math.round((S - markTargetWidth) / 2)}" y="${Math.round((S - markTargetHeight) / 2)}" width="${markTargetWidth}" height="${markTargetHeight}"/>
</svg>`;
  fs.writeFileSync('public/icon.svg', svgContent, 'utf-8');

  console.log('Successfully generated all icons!');
}

main().catch(console.error);

