import fs from 'node:fs';
import path from 'node:path';

const base = 'public/Workshops';
const dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const summary = {};

dirs.forEach(d => {
  const p = path.join(base, d);
  function getImages(dir) {
    let res = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach(item => {
      const sub = path.join(dir, item.name);
      if (item.isDirectory()) res.push(...getImages(sub));
      else if (item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg') || item.name.toLowerCase().endsWith('.png')) {
        res.push('/' + sub.replace(/\\/g, '/').replace(/^public\//, ''));
      }
    });
    return res;
  }
  summary[d] = getImages(p);
});

console.log(JSON.stringify(Object.keys(summary).map(k => ({
  folder: k,
  count: summary[k].length,
  photos: summary[k]
})), null, 2));

