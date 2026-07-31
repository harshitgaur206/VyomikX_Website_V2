const fs = require('fs');
const path = require('path');

function findImages(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file.startsWith('.') || file === 'node_modules' || file === '.next') return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findImages(filePath));
    } else {
      if (/\.(jpg|jpeg|png|webp|avif|mp4|webm)$/i.test(file)) {
        results.push({
          path: filePath.replace(path.join(__dirname, '..'), ''),
          name: file,
          size: stat.size,
          mtime: stat.mtime
        });
      }
    }
  });
  return results;
}

const projectDir = path.join(__dirname, '..');
const images = findImages(projectDir);
// Sort by mtime descending
images.sort((a, b) => b.mtime - a.mtime);
console.log('Total media files found:', images.length);
console.log('Most recent 30 media files:');
console.log(JSON.stringify(images.slice(0, 30), null, 2));
