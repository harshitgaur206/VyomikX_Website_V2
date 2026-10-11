import fs from 'node:fs';
import path from 'node:path';

const workshopsConfig = [
  {
    folder: 'AMU_Workshop',
    category: 'AMU Workshop',
    location: 'ZHCET, AMU',
    date: 'Sep 2026',
    defaultTitle: 'AMU Robotics & Technology Workshop',
    defaultDesc: 'Hands-on robotics demonstrations, circuit prototyping, and sensor logic at Aligarh Muslim University.',
  },
  {
    folder: 'Agrasen_Inter_College',
    category: 'Agrasen Inter College',
    location: 'Agrasen Inter College, Aligarh',
    date: 'Aug 2026',
    defaultTitle: 'Agrasen STEM & Robotics Outreach',
    defaultDesc: 'Hands-on robotics, sensor calibration, and electronics assembly session with school students.',
  },
  {
    folder: 'Babulal_Jain_Inter_College',
    category: 'Babulal Jain Inter College',
    location: 'Babulal Jain Inter College, Aligarh',
    date: 'Aug 2026',
    defaultTitle: 'Babulal Jain Robotics Session',
    defaultDesc: 'Introducing students to fundamental electronics, microcontrollers, and open-hardware robotics.',
  },
  {
    folder: 'Gopiram_Paliwal_Inter_College',
    category: 'Gopiram Paliwal Inter College',
    location: 'Gopiram Paliwal Inter College, Aligarh',
    date: 'Jul 2026',
    defaultTitle: 'Gopiram Paliwal Circuit & Robotics Lab',
    defaultDesc: 'Breadboard circuit assembly, microcontrollers, and relay automation with curious young minds.',
  },
  {
    folder: 'Heeralal_Barahseeni_Inter_College',
    category: 'Heeralal Barahseeni Inter College',
    location: 'Heeralal Barahseeni Inter College, Aligarh',
    date: 'Jul 2026',
    defaultTitle: 'Heeralal Barahseeni Hardware Session',
    defaultDesc: 'Hands-on robotics, sensor calibration, H-bridge motor drivers, and electronics assembly.',
  },
  {
    folder: 'Raghuveer_sahay_Inter_College',
    category: 'Raghuveer Sahay Inter College',
    location: 'Raghuveer Sahay Inter College, Aligarh',
    date: 'Jul 2026',
    defaultTitle: 'Raghuveer Sahay STEM Demonstration',
    defaultDesc: 'Demonstrating open-hardware robotics, autonomous rovers, and sensor feedback logic.',
  },
];

// Specific known titles for highlight photos
const customMetadata = {
  // AMU
  'IMG20260926102110.jpg': {
    title: 'Autonomous Rover & Sensor Calibration',
    desc: 'Demonstrating open-hardware robotics, obstacle avoidance logic, and sensor feedback at AMU.',
  },
  'IMG20260926104322.jpg': {
    title: 'Hands-On Robotics Prototyping',
    desc: 'Students assembling chassis kits, motor drivers, and microcontroller circuits.',
  },
  'IMG20260926105217.jpg': {
    title: 'Microcontroller Circuit Assembly',
    desc: 'Live firmware flashing, breadboard connections, and telemetry monitoring.',
  },
  'IMG20260926110727.jpg': {
    title: 'Interactive STEM & Robotics Q&A',
    desc: 'Discussing robotics design, embedded systems, and technology pathways with students.',
  },
  'IMG20260926110958.jpg': {
    title: 'Hardware Mentoring & Circuit Debugging',
    desc: 'VyomikX mentors assisting students with circuit debugging and sensor wiring.',
  },
  'IMG20260926131925.jpg': {
    title: 'Robotics Demonstration & Chassis Testing',
    desc: 'Testing wheeled rover navigation and motor driver performance.',
  },
  'IMG20260926133507.jpg': {
    title: 'Student Collaborative Hardware Build',
    desc: 'Team-based experimentation with microcontrollers, servos, and sensors.',
  },
  'IMG_20260926_154108.jpg': {
    title: 'Sensor Arrays & Breadboard Wiring',
    desc: 'Calibrating ultrasonic and IR sensors for autonomous tracking.',
  },
  'IMG_20260926_160721.jpg': {
    title: 'Hardware Showcase & Peer Learning',
    desc: 'Participants demonstrating their working circuits and robotics prototypes.',
  },
  'IMG_20260926_160910.jpg': {
    title: 'VyomikX AMU Workshop Group Session',
    desc: 'Celebrating student creations, open-source hardware, and future builds at AMU.',
  },

  // Agrasen
  'IMG20260822105825.jpg': {
    title: 'Robotics Outreach & Intro Session',
    desc: 'Introducing students to fundamental electronics, microcontrollers, and robotics kits.',
  },
  'IMG_20260822_110337.jpg': {
    title: 'Interactive STEM Hardware Lab',
    desc: 'Live demonstration of sensor feedback, motor control, and breadboard circuits.',
  },
  'IMG20260822121122.jpg': {
    title: 'Hands-On Circuit Prototyping',
    desc: 'Mentoring school students through hands-on component wiring and testing.',
  },
  'IMG20260822122025.jpg': {
    title: 'Classroom Technology Exploration',
    desc: 'Students collaborating on open-hardware kits, switches, and sensors.',
  },

  // Babulal Jain
  'IMG20260821111517.jpg': {
    title: 'STEM Outreach & Live Demonstration',
    desc: 'Engaging students with interactive robotics demonstrations and open-source tech.',
  },
  'IMG20260821111647.jpg': {
    title: 'Sensors & Motor Driver Exploration',
    desc: 'Demonstrating obstacle detection sensors, relays, and motor driving modules.',
  },
  'IMG20260821112008_01.jpg': {
    title: 'Hands-On Breadboard Assembly',
    desc: 'Guiding students step-by-step through circuit design and electronics basics.',
  },
  'IMG20260821112105.jpg': {
    title: 'Microcontroller Firmware & Logic',
    desc: 'Explaining conditional logic, signal routing, and sensor integration.',
  },
  'IMG20260821130325.jpg': {
    title: 'Interactive Classroom Mentoring',
    desc: 'Inspiring school students to explore technology, engineering, and robotics.',
  },
};

const titleThemes = [
  'Hands-On Breadboard Circuit Assembly',
  'Microcontroller & Sensor Mentorship',
  'Line-Follower & Obstacle Avoider Build',
  'Motor Drivers & PWM Velocity Control',
  'Sensor Calibration & Feedback Logic',
  'Student Team Prototyping & Collaboration',
  'Interactive Hardware Demonstration',
  'Robotic Arm Joint Servos & Control',
  'Chassis Assembly & Component Wiring',
  'Autonomous Rover Navigation Session',
  'Embedded Electronics Mentorship',
  'Circuit Debugging & Practical Lab',
  'STEM Education & Hardware Exploration',
  'Sensor Telemetry & Testing',
];

const descThemes = [
  'Guiding students through hands-on wiring, sensor calibration, and embedded hardware principles.',
  'Interactive mentoring on motor drivers, microcontrollers, and real-time electronic control.',
  'Students collaborating in teams to assemble robotic chassis and program sensor thresholds.',
  'Practical experimentation with ultrasonic sensors, IR arrays, and motor driver boards.',
  'Demonstrating open-hardware tools and empowering students to build functional technology.',
  'Step-by-step guidance on breadboard component routing, power regulation, and signal logic.',
];

function generateData() {
  const allItems = [];
  let idCounter = 1;

  for (const conf of workshopsConfig) {
    const fullDir = path.join('public', 'Workshops', conf.folder);
    function getPhotos(dir) {
      let res = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
          res.push(...getPhotos(p));
        } else {
          const lower = e.name.toLowerCase();
          if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) {
            res.push({
              fileName: e.name,
              relativePath: '/' + p.replace(/\\/g, '/').replace(/^public\//, ''),
            });
          }
        }
      }
      return res;
    }

    const photos = getPhotos(fullDir);
    // Sort naturally
    photos.sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true }));

    photos.forEach((photo, idx) => {
      const custom = customMetadata[photo.fileName];
      const title = custom
        ? custom.title
        : `${titleThemes[idx % titleThemes.length]} #${idx + 1}`;
      const desc = custom
        ? custom.desc
        : descThemes[idx % descThemes.length];

      allItems.push({
        id: `ws-${conf.folder.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idCounter++}`,
        title,
        category: conf.category,
        image: photo.relativePath,
        date: conf.date,
        location: conf.location,
        description: desc,
      });
    });
  }

  return allItems;
}

const items = generateData();
console.log(`Generated ${items.length} items across ${workshopsConfig.length} workshops.`);
fs.writeFileSync('scripts/gallery-items.json', JSON.stringify(items, null, 2), 'utf-8');
console.log('Saved to scripts/gallery-items.json');

