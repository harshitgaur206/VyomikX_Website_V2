import fs from 'node:fs';
import path from 'node:path';

const itemsByWorkshop = {
  'AMU Workshop': [
    {
      id: 'ws-amu-1',
      title: 'Electronic Components & Hardware Presentation',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG20260926104322.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'VyomikX speaker explaining essential electronic components, sensors, and circuitry on the digital screen in the AMU lecture hall.'
    },
    {
      id: 'ws-amu-2',
      title: 'L298N Motor Driver Technical Lecture',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG20260926105217.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'Interactive session detailing the H-bridge L298N motor driver, ESP32 signal control, and power distribution for robotics rovers.'
    },
    {
      id: 'ws-amu-3',
      title: 'One-on-One Motor Driver Mentoring',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG20260926110727.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'VyomikX mentor guiding students closely as they examine motor driver pins, terminal blocks, and circuit wiring.'
    },
    {
      id: 'ws-amu-4',
      title: 'Hands-On Group Circuit Mentoring',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG20260926110958.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'Mentor explaining motor driver connections and circuit schematics to an eager group of students taking notes.'
    },
    {
      id: 'ws-amu-5',
      title: 'Robot Chassis & Motor Assembly',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG20260926131925.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'Students collaborating with a VyomikX mentor to wire DC gear motors, test batteries, and code motor rotation on the laptop.'
    },
    {
      id: 'ws-amu-6',
      title: 'Girls in STEM Robotics Lab',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG20260926133507.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'Female mentor guiding girls through hands-on battery pack wiring, gear motors, and digital multimeter testing.'
    },
    {
      id: 'ws-amu-7',
      title: 'VyomikX Mentor Team at AMU',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG_20260926_160721.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'Group portrait of the dedicated VyomikX student mentors and organizers following the RC Car workshop at AMU.'
    },
    {
      id: 'ws-amu-8',
      title: 'VyomikX Organizing Team in Uniform',
      category: 'AMU Workshop',
      image: '/Workshops/AMU_Workshop/IMG_20260926_160910.jpg',
      date: 'Sep 2026',
      location: 'ZHCET, AMU',
      description: 'VyomikX mentors displaying the team emblem and RC Car Workshop chalkboard at the end of the AMU session.'
    }
  ],
  'Agrasen Inter College': [
    {
      id: 'ws-agrasen-1',
      title: 'Smart Automation & Robotics Demonstration',
      category: 'Agrasen Inter College',
      image: '/Workshops/Agrasen_Inter_College/IMG_20260822_110337.jpg',
      date: 'Aug 2026',
      location: 'Agrasen Inter College, Aligarh',
      description: 'VyomikX mentor explaining microcontrollers, IoT automation, and robot rover circuitry to attentive students at Agrasen Inter College.'
    },
    {
      id: 'ws-agrasen-2',
      title: 'Workbench Electronics & Rover Assembly',
      category: 'Agrasen Inter College',
      image: '/Workshops/Agrasen_Inter_College/IMG20260822105825.jpg',
      date: 'Aug 2026',
      location: 'Agrasen Inter College, Aligarh',
      description: 'Close-up of the hands-on workbench featuring multimeters, breadboards, relay switching circuits, and a four-wheeled robot chassis.'
    },
    {
      id: 'ws-agrasen-3',
      title: 'Agrasen Inter College Workshop Group',
      category: 'Agrasen Inter College',
      image: '/Workshops/Agrasen_Inter_College/IMG20260822121122.jpg',
      date: 'Aug 2026',
      location: 'Agrasen Inter College, Aligarh',
      description: 'Group photo of participating students, school faculty, and VyomikX mentors in the science laboratory after completing the session.'
    },
    {
      id: 'ws-agrasen-4',
      title: 'VyomikX Outreach Mentors Team',
      category: 'Agrasen Inter College',
      image: '/Workshops/Agrasen_Inter_College/IMG20260822122025.jpg',
      date: 'Aug 2026',
      location: 'Agrasen Inter College, Aligarh',
      description: 'VyomikX mentors and team members at Agrasen Inter College alongside the assembled rovers and project display.'
    }
  ],
  'Babulal Jain Inter College': [
    {
      id: 'ws-babulal-1',
      title: 'Obstacle Avoider Rover Calibration',
      category: 'Babulal Jain Inter College',
      image: '/Workshops/Babulal_Jain_Inter_College/IMG20260821111517.jpg',
      date: 'Aug 2026',
      location: 'Babulal Jain Inter College, Aligarh',
      description: 'Mentors calibrating ultrasonic rangefinder arrays and code on dual four-wheeled autonomous rovers before live demonstration.'
    },
    {
      id: 'ws-babulal-2',
      title: 'Circuit Voltage Testing & Student Demo',
      category: 'Babulal Jain Inter College',
      image: '/Workshops/Babulal_Jain_Inter_College/IMG20260821111647.jpg',
      date: 'Aug 2026',
      location: 'Babulal Jain Inter College, Aligarh',
      description: 'Demonstrating voltage measurements and microcontroller code to school students seated attentively at Babulal Jain Inter College.'
    },
    {
      id: 'ws-babulal-3',
      title: 'Classroom Robotics & STEM Seminar',
      category: 'Babulal Jain Inter College',
      image: '/Workshops/Babulal_Jain_Inter_College/IMG20260821112008_01.jpg',
      date: 'Aug 2026',
      location: 'Babulal Jain Inter College, Aligarh',
      description: 'VyomikX speakers introducing open technology, engineering paths, and robotics fundamentals to high school students in the assembly hall.'
    },
    {
      id: 'ws-babulal-4',
      title: 'Engaged High School Audience',
      category: 'Babulal Jain Inter College',
      image: '/Workshops/Babulal_Jain_Inter_College/IMG20260821112105.jpg',
      date: 'Aug 2026',
      location: 'Babulal Jain Inter College, Aligarh',
      description: 'Classroom of over 40 students immersed in the workshop session learning about programming, embedded systems, and sensor telemetry.'
    },
    {
      id: 'ws-babulal-5',
      title: 'Principal Meeting & Outreach Felicitation',
      category: 'Babulal Jain Inter College',
      image: '/Workshops/Babulal_Jain_Inter_College/IMG20260821130325.jpg',
      date: 'Aug 2026',
      location: 'Babulal Jain Inter College, Aligarh',
      description: 'VyomikX leadership team meeting with Principal Ambuj Jain and senior school administration after the outreach program.'
    }
  ],
  'Gopiram Paliwal Inter College': [
    {
      id: 'ws-gopiram-1',
      title: 'Robotic Arm & Rover Demonstration Setup',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (1).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'VyomikX team preparing the articulated robotic arm and autonomous rovers on the demonstration table at Gopiram Paliwal Inter College.'
    },
    {
      id: 'ws-gopiram-2',
      title: 'Live Rover & Robotic Arm Calibration',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (2).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'VyomikX mentors configuring microcontroller code and testing servo kinematics on the robotic arm alongside the four-wheeled rover.'
    },
    {
      id: 'ws-gopiram-3',
      title: 'Live Robotics Lecture & Faculty Introduction',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (6).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'VyomikX speaker addressing the session at Gopiram Paliwal Inter College alongside faculty members, presenting the rover and robotic arm.'
    },
    {
      id: 'ws-gopiram-4',
      title: 'Physics Lab Robotics Demonstration',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (10).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'VyomikX mentor explaining embedded logic and sensor navigation to high school students gathered around the demonstration table.'
    },
    {
      id: 'ws-gopiram-5',
      title: 'Interactive Hands-On Demonstration',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (14).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'High school students gathering around the testing desk as VyomikX mentors demonstrate servo movements and sensor feedback.'
    },
    {
      id: 'ws-gopiram-6',
      title: 'Faculty & Team Felicitation',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (19).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'Group portrait of school teachers and VyomikX mentors in front of the science classroom blackboard after the workshop.'
    },
    {
      id: 'ws-gopiram-7',
      title: 'Code Walkthrough & Microcontroller Programming',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (21).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'VyomikX mentors walking students through microcontroller code and algorithm design on the laptop.'
    },
    {
      id: 'ws-gopiram-8',
      title: 'Smartphone-Controlled Rover Demonstration',
      category: 'Gopiram Paliwal Inter College',
      image: '/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (23).jpg',
      date: 'Jul 2026',
      location: 'Gopiram Paliwal Inter College, Aligarh',
      description: 'Mentor demonstrating smartphone-based wireless control of the custom four-wheel rover to engaged students.'
    }
  ],
  'Heeralal Barahseeni Inter College': [
    {
      id: 'ws-heeralal-1',
      title: 'Campus-Wide STEM Assembly',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/IMG_20260728_080423.jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'Hundreds of students gathered on the school lawn at Heeralal Barahseeni Inter College for the opening outreach orientation.'
    },
    {
      id: 'ws-heeralal-2',
      title: 'Classroom Robotics Orientation',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (1).jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'VyomikX mentors introducing electronics concepts and robotics models to students in the classroom at Heeralal Barahseeni Inter College.'
    },
    {
      id: 'ws-heeralal-3',
      title: 'Faculty Address & Mentor Introduction',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (2).jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'School faculty introducing the VyomikX team to the students before kicking off the technical workshop.'
    },
    {
      id: 'ws-heeralal-4',
      title: 'VyomikX Mission & Initiative Presentation',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (4).jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'VyomikX speaker explaining the vision of hands-on STEM education and robotics in front of the whiteboard.'
    },
    {
      id: 'ws-heeralal-5',
      title: 'Audience Engagement & Robotics Lecture',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (12).jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'Dozens of high school students listening intently to robotics concepts and microcontroller logic in the lecture hall.'
    },
    {
      id: 'ws-heeralal-6',
      title: 'Curious Students Examining Autonomous Rover',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (16).jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'Students inspecting the assembled obstacle avoidance rover, ultrasonic sensor mounts, and motor drive wiring up close.'
    },
    {
      id: 'ws-heeralal-7',
      title: 'Live Hardware Demo on School Grounds',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (28).jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'VyomikX mentor addressing the outdoor gathering via microphone while demonstrating AC relay switching and sensor rovers.'
    },
    {
      id: 'ws-heeralal-8',
      title: 'Spider Robot & Articulated Arm Setup',
      category: 'Heeralal Barahseeni Inter College',
      image: '/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (50).jpg',
      date: 'Jul 2026',
      location: 'Heeralal Barahseeni Inter College, Aligarh',
      description: 'Close-up of the demonstration workbench featuring a multi-legged hexapod robot, robotic arm, LiPo power pack, and telemetry laptop.'
    }
  ],
  'Raghuveer Sahay Inter College': [
    {
      id: 'ws-raghuveer-1',
      title: 'Arduino Microcontroller Seminar',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (8).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'VyomikX speaker explaining Arduino architecture and open hardware computing to seated high school students.'
    },
    {
      id: 'ws-raghuveer-2',
      title: 'Classroom Robotics Q&A Session',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (10).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'VyomikX mentor fielding student questions on robotic rover assembly and practical engineering projects.'
    },
    {
      id: 'ws-raghuveer-3',
      title: 'Microcontroller Architecture & Pinout Demo',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (14).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'VyomikX mentor holding up a microcontroller development board, explaining GPIO pins and peripheral interfaces.'
    },
    {
      id: 'ws-raghuveer-4',
      title: 'Student Pride with Autonomous Rover',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (20).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'School students excitedly holding up the obstacle avoidance rover after completing circuit assembly.'
    },
    {
      id: 'ws-raghuveer-5',
      title: 'Hands-On Rover Exploration',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (21).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'Students holding and examining the chassis, gear motors, and wheel alignment of the robotic rover.'
    },
    {
      id: 'ws-raghuveer-6',
      title: 'Breadboard Wiring & Component Assembly',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (23).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'VyomikX mentor assembling breadboard circuitry and sensor headers as eager students observe every connection.'
    },
    {
      id: 'ws-raghuveer-7',
      title: 'Electronics Theory & Circuit Diagrams',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (24).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'VyomikX mentor teaching fundamental circuit theory, semiconductor diodes, and multimeter operation on the whiteboard.'
    },
    {
      id: 'ws-raghuveer-8',
      title: 'PWM Signal & Digital Waveform Lecture',
      category: 'Raghuveer Sahay Inter College',
      image: '/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (26).jpg',
      date: 'Jul 2026',
      location: 'Raghuveer Sahay Inter College, Aligarh',
      description: 'Explaining analog vs. digital signals and pulse-width modulation (PWM) for motor speed control on the classroom board.'
    }
  ]
};

const workshopOrder = [
  'AMU Workshop',
  'Agrasen Inter College',
  'Babulal Jain Inter College',
  'Gopiram Paliwal Inter College',
  'Heeralal Barahseeni Inter College',
  'Raghuveer Sahay Inter College'
];

// Verify all files exist
for (const [ws, list] of Object.entries(itemsByWorkshop)) {
  for (const item of list) {
    const fullPath = path.join('public', item.image);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }
  }
}

// Interleave across workshops for the "All" view
const interleavedItems = [];
const maxCount = Math.max(...workshopOrder.map(w => itemsByWorkshop[w].length));

for (let i = 0; i < maxCount; i++) {
  for (const w of workshopOrder) {
    if (i < itemsByWorkshop[w].length) {
      interleavedItems.push(itemsByWorkshop[w][i]);
    }
  }
}

console.log(`Generated ${interleavedItems.length} curated gallery items interleaved across ${workshopOrder.length} workshops.`);
fs.writeFileSync('lib/gallery-items.json', JSON.stringify(interleavedItems, null, 2), 'utf8');
console.log('Successfully written to lib/gallery-items.json');

