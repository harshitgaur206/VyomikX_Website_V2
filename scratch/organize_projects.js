const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'projects');

const projectFolderMap = {
  'robotic-arm': ['robotic-arm.png', 'robotic-arm.jpeg', 'robotic-arm-gripper.jpeg'],
  'smart-home-automation': ['Home-Automation.jpeg'],
  'solar-tracker-robot': ['solar-tracker.png', 'solar-tracker.jpeg'],
  'line-follower': ['line-follower.png', 'line-follower.jpeg'],
  'spider-robot': ['spider-robot.png', 'spider-robot.jpeg'],
  'rc-plane': ['rc-plane.png', 'rc-plane.jpeg'],
  'bionic-hand': ['robotic-hand.jpeg'],
  'booster-converter': ['dc-booster.png'],
  'agri-drone': ['agri-drone.png'],
  'tesla-coil': ['tesla-coil.png'],
  'robo-soccer': ['robosoccer.png', 'Robo-soccer.jpeg'],
  'obstacle-avoider': ['obstacle-avoider.png'],
  'self-balancing-robot': ['self-balancing.png'],
  'maze-solver': ['maze-solver.png'],
  'rc-car': ['rc-car.png'],
  'waste-segregator': ['waste-segregator.png'],
  'water-rocket': ['water-rocket.png'],
  'mars-rover': ['rover.png'],
};

for (const [folder, files] of Object.entries(projectFolderMap)) {
  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  for (const file of files) {
    const srcPath = path.join(baseDir, file);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(folderPath, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} -> ${folder}/${file}`);
    }
  }
}

console.log('Project folders organized successfully!');
