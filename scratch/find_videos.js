const fs = require('fs');
const path = require('path');

function findVideos(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findVideos(filePath));
    } else {
      if (/\.(mp4|webm|mov|avi|m4v)$/i.test(file)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const publicDir = path.join(__dirname, '..', 'public');
console.log('Videos found:', findVideos(publicDir));
