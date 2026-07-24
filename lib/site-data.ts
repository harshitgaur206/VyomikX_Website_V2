export const site = {
  name: "VyomikX",
  tagline: "Bringing Technology & Robotics Education to Every Student",
  subtitle:
    "A student-led movement at ZHCET, AMU. We share tools, mentorship, and equipment so curious minds from all backgrounds can build real technology.",
  email: "vyomikx@gmail.com",
  phone:"897890",
  location: "ZHCET, Aligarh Muslim University, Aligarh, India",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/vyomikx/" },
    { label: "Instagram", href: "https://www.instagram.com/vyomik.x/" },
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
    title: "School Visit & Hands-On Robotics Workshop",
    category: "School Visits",
    image: "/outreach/workshop-girls-solar.jpg",
    date: "Jul 2026",
    location: "Primary School Outreach, Aligarh",
    description: "Young students exploring light sensors and solar tracker mechanisms during our community robotics visit.",
  },
  {
    id: "g2",
    title: "Mentorship & Spider Robot Build",
    category: "Workshops",
    image: "/outreach/workshop-spider-robot.jpg",
    date: "Jun 2026",
    location: "ZHCET Maker Session, AMU",
    description: "Team members demonstrating hexapod spider robot gait control and multi-servo calibration to school children.",
  },
  {
    id: "g3",
    title: "Hands-On Laptop & Circuit Session",
    category: "Workshops",
    image: "/outreach/workshop-hands-on.jpg",
    date: "May 2026",
    location: "Community Tech Lab, Aligarh",
    description: "Students collaborating on laptop software logic, robotic arm joint control, and breadboard circuit assembly.",
  },
  {
    id: "g4",
    title: "Solar Tracker Demonstration",
    category: "School Visits",
    image: "/outreach/workshop-mentoring.jpg",
    date: "Apr 2026",
    location: "Local School Outreach",
    description: "Demonstrating dual-axis light tracking and renewable energy concepts using low-cost LDR sensors.",
  },
  {
    id: "g5",
    title: "6-DOF CyberDeck Robotic Arm Setup",
    category: "Projects",
    image: "/projects/robotic-arm.png",
    date: "Mar 2026",
    location: "ZHCET Robotics Lab",
    description: "In-house built 6-DOF robotic manipulator running OpenCV hand gesture tracking and SocketIO control.",
  },
  {
    id: "g6",
    title: "Outdoor Autonomous Navigation Test",
    category: "Community",
    image: "/outreach/students-outdoor.webp",
    date: "Feb 2026",
    location: "ZHCET Campus Quad",
    description: "Students testing wireless obstacle avoidance and outdoor navigation algorithms.",
  },
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
    image: "/projects/line-follower/line-follower.png",
    whyWeBuilt:
      "Standard 2-IR followers produce harsh, jerky turns. We engineered this 5-IR system so students could master proportional-derivative (PID) feedback control on affordable hardware.",
    guideAvailable: true,
    guideUrl: "/guides/line-follower.pdf",
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
      { src: "/projects/line-follower/line-follower.png", caption: "5-Channel IR sensor array & L298N chassis layout" },
      { src: "/projects/line-follower/line-follower.jpeg", caption: "Track calibration & sensor threshold tuning during workshop" },
      { src: "/outreach/students-outdoor.webp", caption: "Outdoor track speed optimization test" },
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
    image: "/projects/robotic-arm/robotic-arm.png",
    whyWeBuilt:
      "Industrial robot arms are typically locked behind proprietary software; we designed an open hardware ecosystem combining AI computer vision, web dashboards, and manual potentiometer teach modes.",
    guideAvailable: true,
    guideUrl: "/guides/robotic-arm.pdf",
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
      { src: "/projects/robotic-arm/robotic-arm.png", caption: "6-DOF CyberDeck robotic manipulator assembly" },
      { src: "/projects/robotic-arm/robotic-arm.jpeg", caption: "Servo motor joint wiring & base turret mount" },
      { src: "/projects/robotic-arm/robotic-arm-gripper.jpeg", caption: "End-effector precision claw testing on ZHCET test bench" },
      { src: "/outreach/workshop-hands-on.jpg", caption: "Students configuring OpenCV hand tracking dashboard" },
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
    image: "/projects/solar-tracker-robot/solar-tracker.png",
    whyWeBuilt:
      "Stationary solar panels suffer significant efficiency drops; we built an intelligent dual-axis tracker that maximizes energy capture while monitoring real-time power metrics.",
    guideAvailable: true,
    guideUrl: "/guides/solar-tracker.pdf",
    overview:
      "This system dynamically tracks the sun's trajectory across two degrees of freedom using a cross-axis quadrant of 4 LDR photoresistors and MG996R high-torque metal-gear servos. Integrated INA219 high-side instrumentation logs open-circuit voltage, load current, and instantaneous power, while a DHT22 logs ambient temperature and humidity. An LM2596 buck regulator and TP4056 linear charger manage safe battery power distribution.",
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
      { src: "/projects/solar-tracker-robot/solar-tracker.png", caption: "Dual-axis solar tracking mechanical frame" },
      { src: "/projects/solar-tracker-robot/solar-tracker.jpeg", caption: "LDR sensor cross-shield & servo pitch/yaw joints" },
      { src: "/outreach/workshop-girls-solar.jpg", caption: "School visit students experimenting with light alignment" },
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
    image: "/projects/spider-robot/spider-robot.png",
    whyWeBuilt:
      "We built this with low-cost 3D-printed parts and affordable servos so local schools could replicate multi-legged robotics without expensive machinery.",
    guideAvailable: true,
    overview:
      "Our spider robot uses multiple servo-driven legs coordinated by an inverse-kinematics gait engine. Each leg has multiple degrees of freedom, letting the robot walk, strafe, and rotate in place. It is a favourite build for teaching students about coordinated multi-actuator control.",
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
      { src: "/projects/spider-robot/spider-robot.png", caption: "12-DOF hexapod spider robot 3D printed frame" },
      { src: "/projects/spider-robot/spider-robot.jpeg", caption: "PCA9685 16-channel servo driver & battery harness" },
      { src: "/outreach/workshop-spider-robot.jpg", caption: "Live gait demonstration for school children" },
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
    tech: ["ESP32", "IoT", "MQTT", "WebSockets", "Relays", "Embedded C++"],
    gallery: [
      { src: "/projects/smart-home-automation/Home-Automation.jpeg", caption: "ESP32 4-Channel optocoupler relay hub" },
      { src: "/outreach/workshop-hands-on.jpg", caption: "Students configuring ESP32 web server logic" },
      { src: "/outreach/workshop-mentoring.jpg", caption: "Relay wiring & optocoupler safety demonstration" },
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
    image: "/projects/rc-plane/rc-plane.png",
    whyWeBuilt:
      "Aeromodelling kits are expensive; we used foam board and locally sourced motors so flight becomes accessible to every curious student.",
    guideAvailable: true,
    overview:
      "Our RC plane project covered the full journey of flight: airfoil selection, control-surface design, centre-of-gravity balancing, and maiden-flight trimming. It gave members hands-on experience with aerodynamics and the discipline of flight testing.",
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
      { src: "/projects/rc-plane/rc-plane.png", caption: "Depron foam RC plane wing profile & motor assembly" },
      { src: "/projects/rc-plane/rc-plane.jpeg", caption: "Brushless motor, ESC & 2.4GHz receiver layout" },
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
    image: "/projects/bionic-hand/robotic-hand.jpeg",
    whyWeBuilt:
      "Commercial prosthetic research hands cost thousands of dollars; we created a fully 3D-printable bionic hand so students can explore prosthetic control and bio-mechanics.",
    guideAvailable: true,
    overview:
      "Featuring 5 independently articulated fingers controlled by high-tensile tendon lines and dedicated micro servos, this bionic hand mimics natural human hand kinematics. Integrated flex sensors and pressure-sensitive tactile pads allow the controller to execute delicate grasping routines on objects of various shapes and textures.",
    highlights: [
      "5-Finger independent tendon-driven articulation",
      "Bio-inspired flexible finger joint mechanics",
      "Haptic force & pressure sensor integration",
      "Palm-integrated compact servo actuator array",
    ],
    challenge:
      "Eliminating tendon binding and friction during multi-finger flexion required designing custom 3D-printed internal cable guide channels and tensioners.",
    outcome:
      "Successfully grips complex objects from fragile eggs to soft spheres, serving as an accessible platform for prosthetic control research.",
    specs: [
      { label: "Microcontroller", value: "Arduino / ESP32" },
      { label: "Actuators", value: "5x Micro High-Torque Servos" },
      { label: "Drive Mechanism", value: "High-Tensile Tendon Cables" },
      { label: "Sensors", value: "Flex & Tactile Pressure Sensor Array" },
      { label: "Structure", value: "3D Printed PLA + TPU Joints" },
      { label: "Power Supply", value: "5V 4A Regulated Supply" },
    ],
    tech: ["Bionic Robotics", "Tendon Mechanics", "Servo Control", "3D Printing"],
    gallery: [
      { src: "/projects/bionic-hand/robotic-hand.jpeg", caption: "5-finger tendon-driven prosthetic hand assembly" },
      { src: "/projects/robotic-arm/robotic-arm.png", caption: "Servo motor array & tension wire routing" },
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
    image: "/projects/booster-converter/dc-booster.png",
    whyWeBuilt:
      "Voltage sag and brownouts frequently reset student microcontrollers during heavy motor loads; we engineered an affordable, robust DC boost converter module using accessible components.",
    guideAvailable: true,
    overview:
      "Engineered to step up variable battery input voltages (e.g. 3.7V - 7.4V) to a rock-solid high-voltage rail (12V - 24V), this boost converter utilizes a high-frequency switching transistor, power inductor, fast Schottky diode, and closed-loop feedback monitoring. It ensures uninterrupted power delivery for inductive motor drivers and logic controllers alike.",
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
      { src: "/projects/booster-converter/dc-booster.png", caption: "500W Boost Converter circuit & MOSFET heatsink" },
      { src: "/projects/smart-home-automation/Home-Automation.jpeg", caption: "High-power switching electronics test bench" },
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
    image: "/projects/robo-soccer/robosoccer.png",
    whyWeBuilt:
      "Competition robots often cost thousands — we designed this bot with common parts so any student club can afford to compete.",
    guideAvailable: true,
    overview:
      "Built for inter-college robo-soccer competitions, this bot pairs a low, aggressive chassis with high-torque geared motors and responsive wireless control. The drivetrain is tuned for quick acceleration and tight turning so it can out-manoeuvre opponents on the field.",
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
      { src: "/projects/robo-soccer/robosoccer.png", caption: "Dual-motor soccer bot chassis & dribbler mechanism" },
      { src: "/projects/robo-soccer/Robo-soccer.jpeg", caption: "High-torque N20 motor drive & wireless module" },
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
    image: "/projects/tesla-coil/tesla-coil.png",
    whyWeBuilt:
      "High-voltage demos inspire curiosity; we designed ours with safety cut-offs so we can bring electromagnetism to any classroom.",
    guideAvailable: true,
    overview:
      "A deep dive into high-voltage electronics and resonance, our Tesla coil steps a low DC input up to tens of kilovolts, producing crackling arcs and wirelessly powering nearby fluorescent tubes. It is one of our most memorable public demonstrations of electromagnetism.",
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
      { src: "/projects/tesla-coil/tesla-coil.png", caption: "Slayer exciter Tesla coil arcing demonstration" },
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
    image: "/projects/obstacle-avoider/obstacle-avoider.png",
    whyWeBuilt:
      "Autonomy made simple: our clean, commented code lets beginners understand every line and extend the robot themselves.",
    guideAvailable: true,
    overview:
      "A teaching platform for autonomy, this rover sweeps a servo-mounted ultrasonic sensor, measures clearances, and picks the freest heading to avoid collisions. Its clean state machine makes it easy for beginners to read and extend.",
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
      { src: "/projects/obstacle-avoider/obstacle-avoider.png", caption: "Ultrasonic sensor on servo scanning forward" },
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
    image: "/projects/self-balancing-robot/self-balancing.png",
    whyWeBuilt:
      "Control theory on a budget — we're building this so students can experiment with PID tuning without industrial equipment.",
    guideAvailable: false,
    overview:
      "An inverted-pendulum challenge, this two-wheeled robot reads tilt from an IMU and drives its motors to constantly correct its balance. It is our deepest dive yet into real-time control theory and sensor fusion.",
    highlights: [
      "MPU6050 IMU with complementary filter",
      "Real-time PID balance loop",
      "Recovers from small pushes",
      "Tunable gains for experimentation",
    ],
    challenge:
      "Fusing accelerometer and gyro data into a stable tilt estimate, then tuning the PID for fast recovery, is an ongoing refinement.",
    outcome:
      "The robot balances and self-corrects; work continues on smoother motion and remote drive-while-balancing.",
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
      { src: "/projects/self-balancing-robot/self-balancing.png", caption: "Two-wheeled PID inverted pendulum balancing" },
    ],
  },
  {
    slug: "agri-drone",
    title: "Agricultural Drone",
    category: "Aerial Robotics",
    year: "2026",
    status: "Completed",
    summary:
      "A quadcopter platform engineered for autonomous field mapping and crop health inspection.",
    image: "/projects/agri-drone/agri-drone.png",
    whyWeBuilt:
      "Commercial agricultural drones are prohibitively expensive; we created an open hardware quadcopter platform for student research in aerial surveying.",
    guideAvailable: true,
    overview:
      "Built on a durable carbon-fiber frame with Pixhawk flight controller telemetry, this agricultural quadcopter executes autonomous waypoint navigation and aerial multispectral mapping.",
    highlights: [
      "Autonomous GPS waypoint mission planning",
      "Pixhawk flight controller telemetry feedback",
      "High-efficiency brushless ESC drivetrain",
      "Failsafe auto-return home protection",
    ],
    challenge:
      "Calibrating compass interference and PID flight stabilization during windy field conditions.",
    outcome:
      "Completed autonomous waypoint flight missions and aerial image surveying tests.",
    specs: [
      { label: "Flight Controller", value: "Pixhawk 2.4.8" },
      { label: "Frame", value: "Carbon Fiber Quad" },
      { label: "Motors", value: "4x 920KV Brushless" },
      { label: "ESC", value: "30A Opto ESC" },
      { label: "GPS", value: "M8N High-Precision GPS" },
      { label: "Battery", value: "4S 5000mAh LiPo" },
    ],
    tech: ["Pixhawk", "ArduPilot", "GPS Navigation", "Quadcopter"],
    gallery: [
      { src: "/projects/agri-drone/agri-drone.png", caption: "Quadcopter frame with Pixhawk flight controller" },
    ],
  },
  {
    slug: "mars-rover",
    title: "Rocker-Bogie Mars Rover Prototype",
    category: "Autonomous Systems",
    year: "2026",
    status: "Completed",
    summary:
      "A 6-wheeled planetary rover featuring rocker-bogie passive suspension for navigating rough terrain and obstacles.",
    image: "/projects/mars-rover/rover.png",
    whyWeBuilt:
      "Rocker-bogie suspension is the gold standard for space exploration; we built this prototype to study passive terrain adaptation.",
    guideAvailable: true,
    overview:
      "This rover prototype utilizes a 6-wheel rocker-bogie mechanism to maintain equal wheel payload distribution over extreme terrain, climbing rocks without springs or hydraulics.",
    highlights: [
      "Passive 6-wheel rocker-bogie suspension geometry",
      "Independent high-torque wheel hub motors",
      "Ultrasonic & camera telemetry payload",
      "Wireless ground station telemetry dashboard",
    ],
    challenge:
      "Engineering durable 3D-printed pivot joints to sustain high torsional loads over rocks.",
    outcome:
      "Successfully traversed 15cm obstacles with zero chassis tilt instabilities.",
    specs: [
      { label: "Suspension", value: "6-Wheel Rocker-Bogie" },
      { label: "Controller", value: "Arduino Mega / ESP32" },
      { label: "Drive", value: "6x High-Torque Metal Gear Motors" },
      { label: "Chassis", value: "Aluminium & 3D Printed PETG" },
      { label: "Power", value: "3S LiPo Power Station" },
    ],
    tech: ["Rocker-Bogie", "Kinematics", "Robotics", "3D Printing"],
    gallery: [
      { src: "/projects/mars-rover/rover.png", caption: "Rocker-bogie suspension mars rover prototype" },
    ],
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
    focus: ["Leadership", "Coordination"],
  },
  {
    name: "Himanshu",
    role: "Team Coordinator",
    image: "/team/himanshu.jpeg",
    bio: "Drives planning and execution across the team, connecting ideas with the resources and people needed to build them.",
    focus: ["Planning", "Systems"],
  },
  {
    name: "Harshit Gaur",
    role: "Team Member",
    image: "/team/harshit.jpg",
    bio: "Hands-on builder working across electronics and embedded control for the team's robotics projects.",
    focus: ["Electronics", "Embedded"],
  },
  {
    name: "Mayank Saini",
    role: "Team Member",
    image: "/team/mayank.jpeg",
    bio: "Focuses on mechanical design and fabrication, turning concepts into sturdy, working hardware.",
    focus: ["Mechanical", "Fabrication"],
  },
  {
    name: "Suryansh Jindal",
    role: "Team Member",
    image: "/team/suryansh.png",
    bio: "Works on programming and control logic, bringing the team's machines to life through code.",
    focus: ["Programming", "Control"],
  },
  {
    name: "Rishabh Chaudhary",
    role: "Team Member",
    image: "/team/rishabh.jpeg",
    bio: "Contributes to circuit design and testing, making sure every build is reliable and safe.",
    focus: ["Circuits", "Testing"],
  },
  {
    name: "Aditya Raghav",
    role: "Team Member",
    image: "/team/aditya.jpeg",
    bio: "Supports prototyping and assembly, helping ideas move quickly from sketch to working model.",
    focus: ["Prototyping", "Assembly"],
  },
]

export type FutureItem = {
  title: string
  description: string
  timeframe: string
}

export const futureVision: FutureItem[] = [
  {
    title: "Open Maker Space",
    timeframe: "Near Term",
    description:
      "Setting up a welcoming community lab where any student can walk in, borrow components, and build without financial stress.",
  },
  {
    title: "School Visits & Workshops",
    timeframe: "Near Term",
    description:
      "Conducting hands-on robotics workshops and school visits across Aligarh to inspire the next generation of engineers.",
  },
  {
    title: "Open Project Documentation",
    timeframe: "Mid Term",
    description:
      "Publishing comprehensive open-source technical schematics, code registries, and assembly guides for all completed projects.",
  },
  {
    title: "National Robotics Competitions",
    timeframe: "Mid Term",
    description:
      "Representing ZHCET in national robotics championships and engineering challenges to showcase student innovation.",
  },
  {
    title: "Empowered Student Community",
    timeframe: "Long Term",
    description:
      "Establishing a self-sustaining network of student mentors who pay forward technical knowledge to incoming generations.",
  },
]

export const values = [
  {
    title: "Equal Access to Tools",
    description:
      "Providing microcontrollers, sensors, and development equipment to students who don't have their own.",
  },
  {
    title: "Free Open Mentorship",
    description:
      "Publishing every circuit schematic, source code line, and assembly guide freely for all students.",
  },
  {
    title: "Community First",
    description:
      "Guiding beginners step-by-step through hands-on build sessions — ensuring no curious student gets left behind.",
  },
  {
    title: "Practical Skill Building",
    description:
      "Teaching real-world hardware design, embedded programming, and system troubleshooting for future tech careers.",
  },
]
