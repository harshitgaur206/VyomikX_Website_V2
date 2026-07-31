const fs = require('fs');
const path = require('path');

const workshopsDir = path.join(__dirname, '..', 'public', 'Workshops');

function explore(dir) {
  if (!fs.existsSync(dir)) return {};
  const result = {};
  const list = fs.readdirSync(dir);
  list.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      result[item] = explore(itemPath);
    } else {
      if (!result._files) result._files = [];
      result._files.push(item);
    }
  });
  return result;
}

console.log(JSON.stringify(explore(workshopsDir), null, 2));
