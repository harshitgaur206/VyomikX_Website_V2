export const site = {
  name: "VyomikX",
  tagline: "Bringing Technology & Robotics Education to Every Student",
  subtitle:
    "A student-led movement at ZHCET, AMU. We share tools, mentorship, and equipment so curious minds from all backgrounds can build real technology.",
  email: "vyomikx@gmail.com",
  phone: "+91 897890",
  location: "ZHCET, Aligarh Muslim University, Aligarh, India",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/vyomikx/" },
    { label: "Instagram", href: "https://www.instagram.com/vyomik.x/" },
    { label: "YouTube", href: "https://youtube.com/@vyomikx?si=Iq4YVAQbLOX9FYvu" },
  ],
  stats: [
    { value: "100%", label: "Free Resources" },
    { value: "9", label: "School Visits" },
    { value: "7", label: "Members" },
  ],
}

export const communityLinks = [
  {
    title: "Free Learning Guides",
    description: "Download step-by-step assembly guides for our projects — completely free.",
    href: "/projects",
    cta: "Browse Guides",
  },
  {
    title: "Borrow Equipment",
    description: "Need a microcontroller, sensor, or motor for your project? Borrow from our shared inventory.",
    href: "/contact?topic=borrow",
    cta: "Borrow Equipment",
  },
  {
    title: "Donate Spare Parts",
    description: "Have unused components sitting in a drawer? Help a student build their first robot.",
    href: "/contact?topic=donate",
    cta: "Donate Parts",
  },
  {
    title: "Mentor a Student",
    description: "Share your skills — even an hour a month can change a student's path in technology.",
    href: "/contact?topic=mentor",
    cta: "Become a Mentor",
  },
]

export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Future Vision", href: "/future" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
]

export type GalleryItem = {
  id: string
  title: string
  category: "Workshops" | "School Visits" | "Projects" | "Community"
  image: string
  date: string
  location: string
  description: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Robotics & Electronics Workshop",
    category: "School Visits",
    image: "/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (22).jpg",
    date: "Jul 2026",
    location: "Heeralal Barahseeni Inter College, Aligarh",
    description: "Hands-on robotics, sensor calibration, and electronics assembly session with school students.",
  },
  {
    id: "g2",
    title: "Circuit Assembly & Microcontroller Mentoring",
    category: "Workshops",
    image: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (26).jpg",
    date: "Jul 2026",
    location: "Gopiram Paliwal Inter College, Aligarh",
    description: "Guiding students through breadboard circuit assembly, microcontrollers, and relay automation.",
  },
  {
    id: "g3",
    title: "STEM Outreach & Practical Hardware Demo",
    category: "School Visits",
    image: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (16).jpg",
    date: "Jul 2026",
    location: "Raghuveer Sahay Inter College, Aligarh",
    description: "Demonstrating open-hardware robotics, autonomous rovers, and sensor feedback logic.",
  },
  {
    id: "g4",
    title: "Student Electronics & Motor Driver Session",
    category: "Workshops",
    image: "/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (2).jpg",
    date: "Jul 2026",
    location: "Raghuveer Sahay Inter College, Aligarh",
    description: "Interactive mentoring on H-bridge motor drivers, PWM speed control, and chassis assembly.",
  },
  {
    id: "g5",
    title: "Hands-On Robotics Build & Teamwork",
    category: "Workshops",
    image: "/Workshops/Gopiram_Paliwal_Inter_College/Photos/workshop (14).jpg",
    date: "Jul 2026",
    location: "Gopiram Paliwal Inter College, Aligarh",
    description: "Students collaborating on robotic arm joint servos, sensor arrays, and wiring harnesses.",
  },
  {
    id: "g6",
    title: "School Outreach & Sensor Calibration",
    category: "School Visits",
    image: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (21).jpg",
    date: "Jul 2026",
    location: "Raghuveer Sahay Inter College, Aligarh",
    description: "Calibrating ultrasonic rangefinders and IR sensors for obstacle avoidance and line tracking.",
  },
  {
    id: "g7",
    title: "Interactive Classroom Demonstration",
    category: "School Visits",
    image: "/Workshops/Heeralal_Barahseeni_Inter_College/Photos/workshop (4).jpg",
    date: "Jul 2026",
    location: "Gopiram Paliwal Inter College, Aligarh",
    description: "Live demonstration of microcontroller firmware uploading and real-time sensor telemetry output.",
  },
  {
    id: "g8",
    title: "Microcontroller & Sensor Hardware Lab",
    category: "Workshops",
    image: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (25).jpg",
    date: "Jul 2026",
    location: "Gopiram Paliwal Inter College, Aligarh",
    description: "Practical experimentation with light sensors, thermistors, and motor control circuits.",
  },
  {
    id: "g10",
    title: "Hands-On Student Circuit Experimentation",
    category: "Workshops",
    image: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (24).jpg",
    date: "Jul 2026",
    location: "Heeralal Barahseeni Inter College, Aligarh",
    description: "Students wiring components, LEDs, and relays on breadboards under team mentorship.",
  },
  {
    id: "g11",
    title: "Hardware Demonstration & Q&A Session",
    category: "School Visits",
    image: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop_2.jpg",
    date: "Jul 2026",
    location: "Raghuveer Sahay Inter College, Aligarh",
    description: "Engaging students in Q&A regarding robotics, engineering pathways, and open-source technology.",
  },
  {
    id: "g12",
    title: "STEM Education & Practical Learning Lab",
    category: "Community",
    image: "/Workshops/Raghuveer_sahay_Inter_College/Photos/workshop (23).jpg",
    date: "Jul 2026",
    location: "Gopiram Paliwal Inter College, Aligarh",
    description: "Providing free hardware access, learning kits, and step-by-step guides for young minds.",
  },
]

export type MediaSlideItem = {
  src: string
  title: string
  caption?: string
  category?: string
  type?: "image" | "video"
}

export const galleryMediaSlides: MediaSlideItem[] = [
  {
    src: "/Workshops/Heeralal_Barahseeni_Inter_College/Videos/workshop (1).mp4",
    title: "Robotics & Electronics Workshop Reel",
    caption: "Live action from Heeralal Barahseeni Inter College, Aligarh.",
    category: "Workshops",
    type: "video",
  },
  {
    src: "/Workshops/Gopiram_Paliwal_Inter_College/Videos/workshop (1).mp4",
    title: "Hands-On Circuit & Automation Session",
    caption: "Students building and testing circuits at Gopiram Paliwal Inter College.",
    category: "Workshops",
    type: "video",
  },
  {
    src: "/Workshops/Raghuveer_sahay_Inter_College/Videos/workshop (4).mp4",
    title: "STEM & Autonomous Systems Demonstration",
    caption: "Outreach robotics session at Raghuveer Sahay Inter College.",
    category: "School Visits",
    type: "video",
  },
  {
    src: "/Workshops/Heeralal_Barahseeni_Inter_College/Videos/workshop (4).mp4",
    title: "Interactive School Outreach Session",
    caption: "Students exploring sensors, microcontrollers, and motor drivers.",
    category: "School Visits",
    type: "video",
  },
  {
    src: "/Workshops/Heeralal_Barahseeni_Inter_College/Videos/workshop (6).mp4",
    title: "Circuit Assembly & Mentorship",
    caption: "Guiding curious students through breadboard circuit assembly.",
    category: "Workshops",
    type: "video",
  },
  {
    src: "/Workshops/Raghuveer_sahay_Inter_College/Videos/workshop (7).mp4",
    title: "Practical Hardware Demonstration",
    caption: "Demonstrating open-hardware rovers and sensor control.",
    category: "School Visits",
    type: "video",
  },
  {
    src: "/Workshops/Gopiram_Paliwal_Inter_College/Videos/workshop (3).mp4",
    title: "Practical Learning",
    caption: "Demonstrating and explaining Basic Electronics Components.",
    category: "School Visits",
    type: "video",
  }
]

export type ProjectSpec = { label: string; value: string }
export type Project = {
  slug: string
  title: string
  category: string
  year: string
  status: "Completed" | "In Progress" | "Prototype"
  summary: string
  image: string
  whyWeBuilt: string
  guideAvailable: boolean
  guideUrl?: string
  overview: string
  highlights: string[]
  challenge: string
  outcome: string
  specs: ProjectSpec[]
  tech: string[]
  gallery: { src: string; caption: string }[]
}

export const projects: Project[] = [
  {
    slug: "line-follower",
    title: "Autonomous 5-Channel IR Line Follower Robot",
    category: "Autonomous Systems",
    year: "2026",
    status: "Completed",
    summary:
      "An autonomous line follower robot with a 5-channel TCRT5000 IR sensor array, L298N differential drive, and PID weighted error logic for smooth trajectory execution.",
    image: "/projects/line-follower/line-follower-1.jpeg",
    whyWeBuilt:
      "Standard 2-IR followers produce harsh, jerky turns. We engineered this 5-IR system so students could master proportional-derivative (PID) feedback control on affordable hardware.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1qokB_2IjsfAask3CRe4zHgAGszOq_b0b/view?usp=drive_link",
    overview:
      "This autonomous line follower employs a 5-sensor IR array (Far Left, Near Left, Center, Near Right, Far Right) paired with an L298N dual H-bridge motor driver. By calculating weighted spatial errors across the array (-4 to +4), the robot dynamically computes smooth differential motor speeds using a PID algorithm (BaseSpeed ± Kp×Error + Kd×ΔError). If the line is momentarily lost, an error-memory recovery loop executes sharp pivot recovery.",
    highlights: [
      "5-Channel TCRT5000 IR sensor array with weighted error scale",
      "Proportional-Integral-Derivative (PID) dynamic motor control",
      "L298N Dual H-Bridge motor driver with PWM speed regulation",
      "Last-error tracking for automatic off-track pivot recovery",
    ],
    challenge:
      "Eliminating mechanical jerks on sharp 90-degree track curves required fine-tuning the proportional (Kp=25.0) and derivative (Kd=15.0) gain parameters.",
    outcome:
      "Achieved smooth, high-speed line tracking with zero oscillation on sharp bends, serving as a core hands-on control theory model.",
    specs: [
      { label: "Microcontroller", value: "Arduino Uno / Nano" },
      { label: "Sensor Array", value: "5-Channel TCRT5000 IR Array" },
      { label: "Motor Driver", value: "L298N Dual H-Bridge" },
      { label: "Actuators", value: "2x DC Gear Motors" },
      { label: "Algorithm", value: "Weighted PID (Kp=25, Kd=15)" },
      { label: "Power Source", value: "7.4V - 11.1V LiPo Battery" },
    ],
    tech: ["Arduino C++", "PID Control", "IR Sensing", "Differential Drive"],
    gallery: [
      { src: "/projects/line-follower/line-follower-1.jpeg", caption: "5-Channel IR sensor array & L298N chassis layout" },
      { src: "/projects/line-follower/line-follower-2.jpeg", caption: "Microcontroller wiring & motor driver test bench" },
      { src: "/projects/line-follower/line-follower-3.jpeg", caption: "Sensor array reflection calibration" },
      { src: "/projects/line-follower/line-follower-4.jpeg", caption: "High-speed line follower track execution" },
    ],
  },
  {
    slug: "robotic-arm",
    title: "6-DOF CyberDeck & 5-DOF Teach-Repeat Robotic Arm",
    category: "Human-Machine Interface",
    year: "2026",
    status: "Completed",
    summary:
      "Industrial-grade 6-DOF & 5-DOF robotic manipulation systems featuring OpenCV AI vision hand tracking, Flask-SocketIO web control, and teach-repeat trajectory playback.",
    image: "/projects/robotic-arm/robotic-arm-5.jpeg",
    whyWeBuilt:
      "Industrial robot arms are typically locked behind proprietary software; we designed an open hardware ecosystem combining AI computer vision, web dashboards, and manual potentiometer teach modes.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1QhYbKPfhWFW38AebFMHhFrR2Sf5OUiHN/view?usp=drive_link",
    overview:
      "Our robotic arm platform integrates two advanced control architectures: a 6-DOF OpenCV MediaPipe hand gesture tracking controller communicating via Flask-SocketIO to a PCA9685 I2C PWM driver, and a 5-DOF Teach & Repeat system. The software incorporates cubic Hermite polynomial (Smoothstep) trajectory interpolation and Exponential Moving Average (EMA) noise filtering to deliver fluid, jerk-free mechanical arm movement.",
    highlights: [
      "Real-time OpenCV + MediaPipe 6-DOF hand tracking controller",
      "Flask-SocketIO web dashboard with interactive joint matrix sliders",
      "PCA9685 16-channel 12-bit PWM I2C servo driver abstraction",
      "Teach & Repeat RAM waypoint recording with Smoothstep Hermite interpolation",
    ],
    challenge:
      "Fitting 100 5-DOF spatial waypoints into the constrained 2KB SRAM of the ATmega328P was solved by optimizing joint structures into compact uint8_t byte arrays.",
    outcome:
      "Delivered a fluid, multi-modal robotic manipulator capable of vision-controlled sorting and automated pick-and-place playback.",
    specs: [
      { label: "Controller MCU", value: "Arduino Uno + Flask Server" },
      { label: "PWM Driver", value: "PCA9685 12-bit I2C Module" },
      { label: "Actuators", value: "6x Standard High-Torque Servos" },
      { label: "Vision Engine", value: "OpenCV + MediaPipe AI" },
      { label: "Interpolation", value: "Cubic Hermite (Ease-in/out)" },
      { label: "External Power", value: "5V-6V High-Current Supply" },
    ],
    tech: ["Python", "Flask-SocketIO", "OpenCV", "MediaPipe", "Arduino C++", "I2C Bus"],
    gallery: [
      { src: "/projects/robotic-arm/robotic-arm-1.jpeg", caption: "6-DOF CyberDeck robotic manipulator assembly" },
      { src: "/projects/robotic-arm/robotic-arm-2.jpeg", caption: "Servo motor joint wiring & base turret mount" },
      { src: "/projects/robotic-arm/robotic-arm-3.jpeg", caption: "End-effector precision claw testing " },
      { src: "/projects/robotic-arm/robotic-arm-4.jpeg", caption: "Robotic arm joint potentiometer calibration" },
      { src: "/projects/robotic-arm/robotic-arm-5.jpeg", caption: "Base rotation turret servo linkage" },
      { src: "/projects/robotic-arm/robotic-arm-8.jpeg", caption: "PCA9685 16-channel servo driver wiring" },
      { src: "/projects/robotic-arm/robotic-arm-7.jpeg", caption: "Teach-and-repeat joint playback testing" },
    ],
  },
  {
    slug: "solar-tracker-robot",
    title: "Dual-Axis Solar Tracking & Energy Management System",
    category: "Renewable Energy Systems",
    year: "2026",
    status: "Completed",
    summary:
      "A dual-axis (Yaw & Pitch) photovoltaic tracking system equipped with high-side INA219 I2C current/voltage telemetry, DHT22 climate sensors, and closed-loop battery charging.",
    image: "/projects/solar-tracker-robot/solar-tracker-2.jpeg",
    whyWeBuilt:
      "Stationary solar panels suffer significant efficiency drops; we built an intelligent dual-axis tracker that maximizes energy capture while monitoring real-time power metrics.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1EF63EKnPWSFRuM2M8p3RN0KvBSVENVmY/view?usp=drive_link",
    overview:
      "This system dynamically tracks the sun's trajectory across two degrees of freedom using a cross-axis quadrant of 4 LDR photoresistors and MG996R high-torque metal-gear servos. Integrated INA219 high-side instrumentation logs open-circuit voltage, load current, and instantaneous power, while a DHT22 logs ambient temperature and humidity.",
    highlights: [
      "Dual-Axis (Horizontal Yaw & Vertical Pitch) quadrant LDR tracking",
      "High-precision INA219 I2C bus current & voltage power logging",
      "DHT22 ambient temperature and relative humidity microclimate telemetry",
      "LM2596 buck regulation with common system ground protection",
    ],
    challenge:
      "Preventing micro-controller brownouts under heavy inductive servo loads required dedicated high-current rails and common signal reference grounding.",
    outcome:
      "Demonstrated measurable photovoltaic power harvest gains over static panels while providing real-time telemetry logging.",
    specs: [
      { label: "Microcontroller", value: "Arduino Uno R3" },
      { label: "Light Sensing", value: "4x 10kΩ LDRs (Quadrant Setup)" },
      { label: "Actuators", value: "2x MG996R High-Torque Servos" },
      { label: "Power Monitor", value: "Adafruit INA219 (12-bit ADC)" },
      { label: "Climate Sensor", value: "DHT22 Digital Temp/Humidity" },
      { label: "Battery Charger", value: "TP4056 + 2S LiPo / 18650" },
    ],
    tech: ["Arduino C++", "Photovoltaics", "I2C Instrumentation", "Power Management"],
    gallery: [
      { src: "/projects/solar-tracker-robot/solar-tracker-1.jpeg", caption: "Dual-axis solar tracking mechanical frame" },
      { src: "/projects/solar-tracker-robot/solar-tracker-2.jpeg", caption: "LDR sensor cross-shield & servo pitch/yaw joints" },
      { src: "/projects/solar-tracker-robot/solar-tracker-3.jpeg", caption: "Photovoltaic panel voltage & current telemetry test" },
    ],
  },
  {
    slug: "smart-home-automation",
    title: "Smart Home Automation & IoT Energy Hub",
    category: "IoT & Embedded Systems",
    year: "2026",
    status: "Completed",
    summary:
      "A modular ESP32-powered home automation controller supporting multi-channel relay switching, MQTT telemetry, local web dashboard, and physical wall switch overrides.",
    image: "/projects/smart-home-automation/Home-Automation.jpeg",
    whyWeBuilt:
      "Modern home automation proprietary hubs are expensive; we engineered a low-cost, open-hardware controller with fallback physical wall switches.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1At4yY-0zSontfj6icrsMnTSlqPod8SBB/view?usp=drive_link",
    overview:
      "Our Smart Home Automation Controller integrates Wi-Fi and Bluetooth connectivity with optocoupler-isolated relay modules, current sensors, and a real-time MQTT dashboard. Built around the ESP32 dual-core microcontroller, it enables voice, app, and local web-based control of appliances while retaining physical switch synchronization.",
    highlights: [
      "Optocoupler-isolated 4-channel 250V relay switching",
      "Real-time MQTT telemetry & local WebServer control",
      "Dual-way physical wall switch synchronization",
      "Current monitoring with overload auto-cutoff",
    ],
    challenge:
      "Maintaining instantaneous physical switch state updates over WebSocket while managing non-blocking MQTT reconnection loops.",
    outcome:
      "Deployed in community workshops as our primary IoT learning kit, teaching students full-stack embedded development from relay wiring to web dashboards.",
    specs: [
      { label: "Microcontroller", value: "ESP32-WROOM-32" },
      { label: "Relay Module", value: "4-Channel Optocoupler" },
      { label: "Protocol", value: "MQTT / HTTP / WebSocket" },
      { label: "Sensor", value: "ACS712 Current Sensor" },
      { label: "Power", value: "5V 2A SMPS Supply" },
      { label: "Safety", value: "Fuse + Varistor Protection" },
    ],
    tech: ["Arduino", "IoT", "MQTT", "WebSockets", "Relays", "Embedded C++"],
    gallery: [
      { src: "/projects/smart-home-automation/Home-Automation.jpeg", caption: "Arduino 4-Channel optocoupler relay hub" },
    ],
  },
  {
    slug: "battle-bot",
    title: "High-Impact Combat BattleBot",
    category: "Competitive Robotics",
    year: "2026",
    status: "Completed",
    summary:
      "A heavy-duty combat robot with an armor-plated chassis, high-torque dual H-bridge differential drive, and high-RPM active kinetic weapon spinner.",
    image: "/projects/battle-bot/battle-bot-1.jpeg",
    whyWeBuilt:
      "Combat robotics teaches extreme mechanical stress tolerance, impact dynamics, and high-current electrical safety under competition conditions.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/16_Ax0Zn2i6b0SzMYo4yQu-x1O3zjSujR/view?usp=drive_link",
    overview:
      "Engineered for inter-collegiate robotics combat, this BattleBot features a steel-reinforced aluminum chassis, shock-isolated motor mounts, and a 2.4GHz wireless control link. Powered by 3S/4S LiPo batteries and high-current ESCs, it withstands high-G collisions while maintaining rapid maneuverability.",
    highlights: [
      "Steel-reinforced shock-isolated armor chassis",
      "High-torque 4WD DC motor differential drive train",
      "High-RPM active kinetic weapon motor subsystem",
      "2.4GHz low-latency wireless remote control receiver",
    ],
    challenge:
      "Preventing internal battery connection disconnects during high-velocity collisions required custom TPU rubber shock dampeners.",
    outcome:
      "Successfully competed in regional robotics arena matches, demonstrating zero power losses during heavy impacts.",
    specs: [
      { label: "Controller", value: "Arduino / 2.4GHz Radio Rx" },
      { label: "Drivetrain", value: "4x High-Torque Geared DC Motors" },
      { label: "Motor Driver", value: "Dual High-Current H-Bridge ESCs" },
      { label: "Chassis", value: "Steel Reinforced Aluminum Alloy" },
      { label: "Power Source", value: "11.1V - 14.8V High-C LiPo Pack" },
      { label: "Safety", value: "Removable Weapon Power Key" },
    ],
    tech: ["Combat Engineering", "Radio Control", "Metal Fabrication", "High Current ESC"],
    gallery: [
      { src: "/projects/battle-bot/battle-bot-1.jpeg", caption: "BattleBot combat chassis & drive motor assembly" },
      { src: "/projects/battle-bot/battle-bot-2.jpeg", caption: "High-torque wheel drive and internal battery harness" },
      { src: "/projects/battle-bot/battle-bot-3.jpeg", caption: "Completed armor-plated BattleBot ready for arena match" },
    ],
  },
  {
    slug: "bionic-hand",
    title: "Articulated Bionic Robotic Hand",
    category: "Bionic Robotics",
    year: "2026",
    status: "Completed",
    summary:
      "A 5-finger bio-inspired articulated robotic hand driven by tendon cable lines and micro servos for dexterous grasping and tactile sensor experimentation.",
    image: "/projects/bionic-hand/bionic-hand-2.jpeg",
    whyWeBuilt:
      "Commercial prosthetic research hands cost thousands of dollars; we created a fully 3D-printable bionic hand so students can explore prosthetic control and bio-mechanics.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/15moe6OYRlR4RZxJqVF3oVAJx_EKFc3l8/view?usp=drive_link",
    overview:
      "Featuring 5 independently articulated fingers controlled by high-tensile tendon lines and dedicated micro servos, this bionic hand mimics natural human hand kinematics. Integrated flex sensors allow the controller to execute delicate grasping routines.",
    highlights: [
      "5-Finger independent tendon-driven articulation",
      "Bio-inspired flexible finger joint mechanics",
      "Haptic force & pressure sensor integration",
      "Palm-integrated compact servo actuator array",
    ],
    challenge:
      "Eliminating tendon binding and friction during multi-finger flexion required designing custom 3D-printed internal cable guide channels.",
    outcome:
      "Successfully grips complex objects from fragile items to soft spheres.",
    specs: [
      { label: "Microcontroller", value: "Arduino / ESP32" },
      { label: "Actuators", value: "5x Micro High-Torque Servos" },
      { label: "Drive Mechanism", value: "High-Tensile Tendon Cables" },
      { label: "Sensors", value: "Flex & Tactile Pressure Sensors" },
      { label: "Structure", value: "3D Printed PLA + TPU Joints" },
      { label: "Power Supply", value: "5V 4A Regulated Supply" },
    ],
    tech: ["Bionic Robotics", "Tendon Mechanics", "Servo Control", "3D Printing"],
    gallery: [
      { src: "/projects/bionic-hand/bionic-hand-1.jpeg", caption: "5-finger tendon-driven prosthetic hand assembly" },
      { src: "/projects/bionic-hand/bionic-hand-2.jpeg", caption: "Finger segment hinge pin alignment" },
      { src: "/projects/bionic-hand/bionic-hand-3.jpeg", caption: "Palmar servo mounting block" },
      { src: "/projects/bionic-hand/bionic-hand-4.jpeg", caption: "Micro servo wire routing in wrist" },
      { src: "/projects/bionic-hand/bionic-hand-5.jpeg", caption: "Tendon line tensioning test" },
      { src: "/projects/bionic-hand/bionic-hand-6.jpeg", caption: "Articulated grasp trajectory validation" },
    ],
  },
  {
    slug: "booster-converter",
    title: "DC to DC Booster Converter",
    category: "Power Electronics",
    year: "2026",
    status: "Completed",
    summary:
      "A high-efficiency DC-DC step-up boost converter engineered for stable voltage stepping, closed-loop PWM regulation, and reliable power delivery in mobile robotic systems.",
    image: "/projects/booster-converter/booster-converter-3.jpeg",
    whyWeBuilt:
      "Voltage sag and brownouts frequently reset student microcontrollers during heavy motor loads; we engineered an affordable, robust DC boost converter module.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/drive/folders/1vyomikx_dc_booster_guide",
    overview:
      "Engineered to step up variable battery input voltages (e.g. 3.7V - 7.4V) to a rock-solid high-voltage rail (12V - 24V), this boost converter utilizes a high-frequency switching transistor, power inductor, fast Schottky diode, and closed-loop feedback monitoring.",
    highlights: [
      "Closed-loop PWM voltage regulation for tight output stability",
      "High-frequency switching topology for minimal ripple voltage",
      "Integrated over-current and thermal protection safeguard",
      "Compact modular footprint designed for robotics chassis mounting",
    ],
    challenge:
      "Minimizing switching noise and output voltage ripple during rapid load transitions required optimizing the LC output filter and copper thermal pours.",
    outcome:
      "Delivered over 90% peak efficiency under load, cleanly eliminating microcontroller brownouts in multi-actuator robots.",
    specs: [
      { label: "Topology", value: "Closed-Loop Step-Up Boost" },
      { label: "Input Range", value: "3.7V - 7.4V DC" },
      { label: "Output Rail", value: "12V - 24V DC Adjustable" },
      { label: "Peak Efficiency", value: "> 90%" },
      { label: "Max Current", value: "3.0 A Continuous" },
      { label: "Protection", value: "Over-current & Thermal Cut-off" },
    ],
    tech: ["Power Electronics", "PWM Switching", "DC-DC Conversion", "PCB Design"],
    gallery: [
      { src: "/projects/booster-converter/booster-converter-1.jpeg", caption: "500W Boost Converter circuit & MOSFET heatsink" },
      { src: "/projects/booster-converter/booster-converter-2.jpeg", caption: "High-power switching inductor & capacitor array" },
      { src: "/projects/booster-converter/booster-converter-3.jpeg", caption: "PCB power rail soldering and thermal inspection" },
      { src: "/projects/booster-converter/booster-converter-4.jpeg", caption: "Booster circuit" },
    ],
  },
  {
    slug: "robo-soccer",
    title: "RoboSoccer Bot",
    category: "Competitive Robotics",
    year: "2026",
    status: "Completed",
    summary:
      "A fast, agile wireless robot built for robot-soccer matches — designed to push, dribble, and score.",
    image: "/projects/robo-soccer/robo-soccer-4.jpeg",
    whyWeBuilt:
      "Competition robots often cost thousands — we designed this bot with common parts so any student club can afford to compete.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1CtVDIVsSehjjlAK1OlCAHSMg0OTxJ8Uc/view?usp=drive_link",
    overview:
      "Built for inter-college robo-soccer competitions, this bot pairs a low, aggressive chassis with high-torque geared motors and responsive wireless control.",
    highlights: [
      "High-torque geared drive for quick bursts",
      "Low centre of gravity for stability in tackles",
      "Sub-100ms wireless response",
      "Reinforced front scoop for ball control",
    ],
    challenge:
      "Balancing speed against control meant iterating on wheel choice, weight distribution, and motor gearing.",
    outcome:
      "Competed in campus robo-soccer events and held its own against heavier, more expensive builds.",
    specs: [
      { label: "Controller", value: "Arduino Uno" },
      { label: "Drive", value: "4x Geared DC Motors" },
      { label: "Driver", value: "L298N x2" },
      { label: "Control", value: "2.4GHz Wireless" },
      { label: "Chassis", value: "Aluminium" },
      { label: "Battery", value: "3S LiPo" },
    ],
    tech: ["Arduino", "Motor Control", "Wireless", "Mechanical Design"],
    gallery: [
      { src: "/projects/robo-soccer/robo-soccer-1.jpeg", caption: "Dual-motor soccer bot chassis & dribbler mechanism" },
      { src: "/projects/robo-soccer/robo-soccer-7.jpeg", caption: "High-torque N20 motor drive & wireless module" },
      { src: "/projects/robo-soccer/robo-soccer-3.jpeg", caption: "RoboSoccer team assembly & receiver calibration" },
      { src: "/projects/robo-soccer/robo-soccer-4.jpeg", caption: "Arena dribbler test and ball control" },
    ],
  },
  {
    slug: "spider-robot",
    title: "Hexapod Spider Robot",
    category: "Legged Robotics",
    year: "2026",
    status: "Completed",
    summary:
      "A hexapod-style walking robot with articulated legs that crawls, turns, and adapts its gait over uneven ground.",
    image: "/projects/spider-robot/spider-robot-3.jpeg",
    whyWeBuilt:
      "We built this with low-cost 3D-printed parts and affordable servos so local schools could replicate multi-legged robotics without expensive machinery.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1GuOEySb79H_8KnzZ5WkBweLpzlu8Ov15/view?usp=drive_link",
    overview:
      "Our spider robot uses multiple servo-driven legs coordinated by an inverse-kinematics gait engine. Each leg has multiple degrees of freedom, letting the robot walk, strafe, and rotate in place.",
    highlights: [
      "Multi-legged gait with coordinated servo control",
      "Walks, turns, and strafes in any direction",
      "Wireless control from a custom remote",
      "Fully 3D-printed, student-designed chassis",
    ],
    challenge:
      "Synchronising many servos into a smooth, stable gait without the robot toppling took careful timing and leg-sequence tuning.",
    outcome:
      "The finished spider walks reliably across flat and mildly uneven surfaces and is a crowd favourite at demos.",
    specs: [
      { label: "Controller", value: "Arduino Mega" },
      { label: "Actuators", value: "12x SG90 Servos" },
      { label: "Legs", value: "6 Articulated" },
      { label: "Control", value: "Bluetooth Remote" },
      { label: "Body", value: "3D Printed PLA" },
      { label: "Power", value: "2S LiPo Battery" },
    ],
    tech: ["Arduino", "Servo Control", "Inverse Kinematics", "3D Printing"],
    gallery: [
      { src: "/projects/spider-robot/spider-robot-1.jpeg", caption: "12-DOF hexapod spider robot 3D printed frame" },
      { src: "/projects/spider-robot/spider-robot-2.jpeg", caption: "PCA9685 16-channel servo driver & battery harness" },
      { src: "/projects/spider-robot/spider-robot-3.jpeg", caption: "Leg joint servo calibration and leg alignment" },
      { src: "/projects/spider-robot/spider-robot-4.jpeg", caption: "Walking tripod gait test on laboratory surface" },
    ],
  },
  {
    slug: "rc-plane",
    title: "RC Plane",
    category: "Aerial Robotics",
    year: "2026",
    status: "Completed",
    summary:
      "A hand-built fixed-wing RC aircraft designed, balanced, and flown by the team.",
    image: "/projects/rc-plane/rc-plane-2.jpeg",
    whyWeBuilt:
      "Aeromodelling kits are expensive; we used foam board and locally sourced motors so flight becomes accessible to every curious student.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1vN5-w0UIGGsxlzzNoG0wYZ0CJnFkksuH/view?usp=drive_link",
    overview:
      "Our RC plane project covered the full journey of flight: airfoil selection, control-surface design, centre-of-gravity balancing, and maiden-flight trimming.",
    highlights: [
      "Foam-board airframe with reinforced spar",
      "Three-channel control: throttle, elevator, rudder",
      "Carefully balanced centre of gravity",
      "Successful maiden flight and landing",
    ],
    challenge:
      "Achieving a stable, trimmed flight demanded precise CG placement and control-throw tuning before the first launch.",
    outcome:
      "Completed multiple controlled flights, giving the team its first taste of aeromodelling.",
    specs: [
      { label: "Wingspan", value: "~1 m" },
      { label: "Motor", value: "Brushless 1000KV" },
      { label: "Radio", value: "2.4GHz 6-Ch" },
      { label: "Servos", value: "3x 9g" },
      { label: "Airframe", value: "Foam Board" },
      { label: "Battery", value: "3S LiPo" },
    ],
    tech: ["Aerodynamics", "RC Systems", "Brushless", "Flight Testing"],
    gallery: [
      { src: "/projects/rc-plane/rc-plane-1.jpeg", caption: "Depron foam RC plane wing profile & motor assembly" },
      { src: "/projects/rc-plane/rc-plane-2.jpeg", caption: "Brushless motor, ESC & 2.4GHz receiver layout" },
      { src: "/projects/rc-plane/rc-plane-3.jpeg", caption: "Aileron control horn linkage and servo mount" },
      { src: "/projects/rc-plane/rc-plane-3.jpeg", caption: "RC plane" },
    ],
  },
  {
    slug: "tesla-coil",
    title: "Tesla Coil",
    category: "Electronics",
    year: "2026",
    status: "Completed",
    summary:
      "A slayer-exciter Tesla coil that produces visible high-voltage arcs and wirelessly lights bulbs.",
    image: "/projects/tesla-coil/tesla-coil-1.jpeg",
    whyWeBuilt:
      "High-voltage demos inspire curiosity; we designed ours with safety cut-offs so we can bring electromagnetism to any classroom.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1gcoAbqF5Vo8p10v7fSRLqg4jn9t_Pkic/view?usp=drive_link",
    overview:
      "A deep dive into high-voltage electronics and resonance, our Tesla coil steps a low DC input up to tens of kilovolts, producing crackling arcs and wirelessly powering nearby fluorescent tubes.",
    highlights: [
      "Resonant high-voltage step-up circuit",
      "Wireless lighting of fluorescent tubes",
      "Hand-wound secondary coil",
      "Built-in safety cut-off",
    ],
    challenge:
      "Winding a clean secondary coil and tuning resonance safely demanded patience and strict safety practice.",
    outcome:
      "Produces reliable arcs and has become a highlight demo for explaining resonance and induction.",
    specs: [
      { label: "Type", value: "Slayer Exciter" },
      { label: "Input", value: "12-24V DC" },
      { label: "Output", value: "Tens of kV" },
      { label: "Transistor", value: "High-Power NPN" },
      { label: "Secondary", value: "Hand-Wound" },
      { label: "Safety", value: "Cut-off Switch" },
    ],
    tech: ["High Voltage", "Resonance", "Electronics", "Coil Winding"],
    gallery: [
      { src: "/projects/tesla-coil/tesla-coil-1.jpeg", caption: "Slayer exciter Tesla coil arcing demonstration" },
      { src: "/projects/tesla-coil/tesla-coil-2.jpeg", caption: "Resonant secondary coil winding & wireless tube discharge" },
    ],
  },
  {
    slug: "obstacle-avoider",
    title: "Object Collision-Avoiding Robot",
    category: "Autonomous Systems",
    year: "2026",
    status: "Completed",
    summary:
      "An autonomous rover that sweeps an ultrasonic sensor to detect obstacles and steer around them.",
    image: "/projects/obstacle-avoider/obstacle-avoider-3.jpeg",
    whyWeBuilt:
      "Autonomy made simple: our clean, commented code lets beginners understand every line and extend the robot themselves.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1YXZajWVljqESrWNjgBx2UM1-QtY5dysW/view?usp=drive_link",
    overview:
      "A teaching platform for autonomy, this rover sweeps a servo-mounted ultrasonic sensor, measures clearances, and picks the freest heading to avoid collisions.",
    highlights: [
      "Servo-swept ultrasonic scanning",
      "Clear, beginner-friendly state machine",
      "All-terrain four-wheel drive",
      "Modular, hackable codebase",
    ],
    challenge:
      "Keeping the logic simple for beginners while staying robust meant a clean, well-commented control loop.",
    outcome:
      "Navigates cluttered spaces without collisions and is a core kit in our intro workshops.",
    specs: [
      { label: "Controller", value: "Arduino Uno" },
      { label: "Sensor", value: "HC-SR04 on Servo" },
      { label: "Drive", value: "4x DC Gear Motors" },
      { label: "Range", value: "2 - 400 cm" },
      { label: "Chassis", value: "Acrylic 4WD" },
      { label: "Battery", value: "18650 x2" },
    ],
    tech: ["Arduino", "C++", "Ultrasonic", "Robotics"],
    gallery: [
      { src: "/projects/obstacle-avoider/obstacle-avoider-1.jpeg", caption: "Ultrasonic sensor on servo scanning forward" },
      { src: "/projects/obstacle-avoider/obstacle-avoider-2.jpeg", caption: "Chassis motor mounting and distance sensor wiring" },
      { src: "/projects/obstacle-avoider/obstacle-avoider-3.jpeg", caption: "Obstacle-avoider" },
    ],
  },
  {
    slug: "self-balancing-robot",
    title: "Self-Balancing Robot",
    category: "Control Systems",
    year: "2026",
    status: "In Progress",
    summary:
      "A two-wheeled robot that stays upright in real time using an IMU and a PID balance controller.",
    image: "/projects/self-balancing-robot/self-balancing-robot-6.jpeg",
    whyWeBuilt:
      "Control theory on a budget — we're building this so students can experiment with PID tuning without industrial equipment.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1tm9rOT1X_rpgvpfZKZohNDgzBG9q4lOJ/view?usp=drive_link",
    overview:
      "An inverted-pendulum challenge, this two-wheeled robot reads tilt from an IMU and drives its motors to constantly correct its balance.",
    highlights: [
      "MPU6050 IMU with complementary filter",
      "Real-time PID balance loop",
      "Recovers from small pushes",
      "Tunable gains for experimentation",
    ],
    challenge:
      "Fusing accelerometer and gyro data into a stable tilt estimate, then tuning the PID for fast recovery.",
    outcome:
      "The robot balances and self-corrects; work continues on smoother motion.",
    specs: [
      { label: "Controller", value: "Arduino Nano" },
      { label: "Sensor", value: "MPU6050 IMU" },
      { label: "Drive", value: "2x NEMA / Geared" },
      { label: "Control", value: "PID + Filter" },
      { label: "Axis", value: "Single (Pitch)" },
      { label: "Battery", value: "2S LiPo" },
    ],
    tech: ["Arduino", "Sensor Fusion", "PID Control", "Control Theory"],
    gallery: [
      { src: "/projects/self-balancing-robot/self-balancing-robot-4.jpeg", caption: "Two-wheeled PID inverted pendulum balancing" },
      { src: "/projects/self-balancing-robot/self-balancing-robot-3.jpeg", caption: "MPU6050 IMU mounting and pitch angle calibration" },
      { src: "/projects/self-balancing-robot/self-balancing-robot-5.jpeg", caption: "Stepping motor current driver tuning" },
      { src: "/projects/self-balancing-robot/self-balancing-robot-6.jpeg", caption: "Balncing by self" },
    ],
  },
  {
    slug: "water-rocket",
    title: "Water Rocket",
    category: "Aerospace",
    year: "2026",
    status: "Completed",
    summary:
      "A pressurised water-and-air rocket engineered for maximum altitude and a clean recovery.",
    image: "/projects/water-rocket/water-rocket-1.jpeg",
    whyWeBuilt:
      "A zero-cost intro to physics and engineering using recycled bottles — perfect for school outreach demos where budgets are tight.",
    guideAvailable: true,
    guideUrl: "https://drive.google.com/file/d/1xEnWc6NDx49qtG21EMC3Vd5sAq77yy9e/view?usp=drive_link",
    overview:
      "A hands-on introduction to thrust, pressure, and aerodynamics, our water rocket uses compressed air to expel water and launch skyward.",
    highlights: [
      "Optimised water-to-air pressure ratio",
      "Aerodynamic fins for a straight ascent",
      "Reinforced pressure bottle",
      "Reusable launch pad with remote release",
    ],
    challenge:
      "Maximising altitude while keeping the flight straight required tuning fin placement.",
    outcome:
      "Reached impressive heights in test launches and became a staple demo for younger students.",
    specs: [
      { label: "Propellant", value: "Water + Air" },
      { label: "Pressure", value: "~60 psi" },
      { label: "Body", value: "2L PET Bottle" },
      { label: "Fins", value: "3x Custom" },
      { label: "Launch", value: "Remote Release" },
      { label: "Recovery", value: "Ballistic" },
    ],
    tech: ["Aerodynamics", "Pressure Systems", "Prototyping"],
    gallery: [
      { src: "/projects/water-rocket/water-rocket-1.jpeg", caption: "Water rocket on the launch pad" },
    ],
  },
]

export type ValueItem = { title: string; description: string }

export const values: ValueItem[] = [
  {
    title: "100% Free Resources",
    description: "Every workshop, guide, and equipment loan is free — zero paywalls or hidden fees.",
  },
  {
    title: "Shared Knowledge",
    description: "Use microcontrollers, sensors, and tools so financial barriers don't stop your ideas.",
  },
  {
    title: "Student-to-Student Mentorship",
    description: "Learn directly from senior builders who walked the same path and built real systems.",
  },
  {
    title: "Community Outreach",
    description: "We bring mobile robotics kits and hands-on demonstrations directly into local schools.",
  },
]

export type FutureVisionItem = {
  title: string
  description: string
  timeframe: "Near Term" | "Mid Term" | "Long Term"
}

export const futureVision: FutureVisionItem[] = [
    {
    title: "More Students Reached",
    timeframe: "Near Term",
    description:
      "Expanding our workshops, learning resources, and outreach programs to help more students discover technology through practical and accessible learning.",
  },
  {
    title: "Mobile STEM Workshops",
    timeframe: "Near Term",
    description: "Equipping a mobile kit to bring hands-on robotics sessions to multiple schools across the district.",
  },
  {
    title: "Open Tech Library",
    timeframe: "Mid Term",
    description: "Publishing complete schematics, CAD files, and firmware for all VyomikX builds online.",
  },
  {
    title: "Inter-College Robotics Exchange",
    timeframe: "Mid Term",
    description: "Partnering with neighboring student clubs of different colleges to host Tech camps over over India .",
  },
  {
    title: "Regional Student Innovation Hub",
    timeframe: "Long Term",
    description: "Building a permanent, student-run research & prototyping lab for low-cost technology solutions.",
  },
  {  title: "A Wider Impact Through Technology",
    timeframe: "Long Term",
    description:
      "Growing VyomikX into a wider student-led initiative that helps make technology learning more accessible, practical, and inspiring for young learners.",
  },
]

export type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
  focus: string[]
}

export const team: TeamMember[] = [
  {
    name: "Nigam Chaudhary",
    role: "Team Coordinator",
    image: "/team/nigam.jpeg",
    bio: "Coordinates the team's projects and direction, keeping builds on track and mentoring members through every stage.",
    focus: ["Leadership", "Coordination","Electronics"],
  },
  {
    name: "Himanshu",
    role: "Team Coordinator",
    image: "/team/himanshu.jpeg",
    bio: "Drives planning and execution across the team, connecting ideas with the resources and people needed to build them.",
    focus: ["Planning", "Systems","Embedded"],
  },
  {
    name: "Harshit Gaur",
    role: "Software & Web Lead",
    image: "/team/harshit.jpg",
    bio: "Leads software development, web architecture, and full-stack integration for the team's platforms and projects.",
    focus: ["Software", "Web Architecture", "Full-Stack"],
  },
  {
    name: "Mayank Saini",
    role: "Team Member",
    image: "/team/mayank.jpeg",
    bio: "Focuses on mechanical design and fabrication, turning concepts into sturdy, working hardware.",
    focus: ["Mechanical", "Fabrication","Electronics"],
  },
  {
    name: "Suryansh Jindal",
    role: "Team Member",
    image: "/team/suryansh.jpeg",
    bio: "Works on Simulations , bringing the team's machines and ideas to life through simulations .",
    focus: ["Testing", "Control","Simulations"],
  },
  {
    name: "Rishabh Chaudhary",
    role: "Team Member",
    image: "/team/rishabh.jpeg",
    bio: "Contributes to electronics assembly, circuit troubleshooting, hardware testing and softwares across projects.",
    focus: ["Electronics", "Testing","Software"],
  },
  {
    name: "Aditya Raghav",
    role: "Team Member",
    image: "/team/aditya.jpeg",
    bio: "Assists with project builds, workshop logistics, and mentoring new students during school visits.",
    focus: ["Outreach", "Hands-On","Management"],
  },
]
