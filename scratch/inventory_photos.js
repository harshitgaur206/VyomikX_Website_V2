const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'public', 'projects');
const dirs = fs.readdirSync(projectsDir);

const inventory = {};

for (const d of dirs) {
  const p = path.join(projectsDir, d);
  if (fs.statSync(p).isDirectory()) {
    const files = fs.readdirSync(p).filter(f => !f.startsWith('.'));
    inventory[d] = files;
  }
}

console.log(JSON.stringify(inventory, null, 2));
