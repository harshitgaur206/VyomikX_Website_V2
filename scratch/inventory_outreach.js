const fs = require('fs');
const path = require('path');

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => !f.startsWith('.'));
}

const publicDir = path.join(__dirname, '..', 'public');
console.log('public/gallery:', listFiles(path.join(publicDir, 'gallery')));
console.log('public/outreach:', listFiles(path.join(publicDir, 'outreach')));
