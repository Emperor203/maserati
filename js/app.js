/**
 * Maserati Tipo 151/3 (1964) - 3D Interactive Showcase
 * Three.js WebGL Application
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// --- LOCALIZATION DICTIONARY ---
const i18n = {
  ru: {
    showcase: "3D Шоурум",
    sound: "Звук V8",
    specs: "Спецификации",
    heritage: "История",
    tour: "Авто-Тур",
    paint: "ЦВЕТ КУЗОВА",
    lighting: "ОСВЕЩЕНИЕ",
    chassis: "Шасси #151.003 • Le Mans 1964",
    heroDesc: "Легендарный спортпрототип, созданный инженером Джулио Альфиери и ателье Пьеро Дрого для 24 часов Ле-Мана 1964 года. Революционный аэродинамический хвост Камма (Coda Tronca) и 430-сильный V8 с максимальной скоростью 330 км/ч.",
    specPower: "Мощность",
    specSpeed: "Макс. скорость",
    specEngine: "Двигатель",
    specWeight: "Сухой вес",
    camHero: "3/4 Ракурс",
    camProfile: "Профиль",
    camFront: "Передок",
    camRear: "Хвост",
    camInterior: "Кокпит",
    camTop: "Сверху",
    doors: "Двери",
    lights: "Фары",
    turntable: "Вращение",
    hotspots: "Точки",
    snapshot: "Снимок",
    envMonza: "Черный Шоурум",
    envSunset: "Ле-Ман Закат",
    envStudio: "Белый Шоурум",
    envCyber: "Неон Трек",
    bgWhite: "Фон: Белый",
    bgDark: "Фон: Черный",
    toastBgWhite: "Фон изменен: Белый студийный",
    toastBgDark: "Фон изменен: Черный студийный",
    engineTitle: "СИМУЛЯТОР ЗВУКА V8",
    startEngine: "ЗАВЕСТИ ДВИГАТЕЛЬ",
    stopEngine: "ЗАГЛУШИТЬ ДВИГАТЕЛЬ",
    gasPedal: "ГАЗОВАТЬ",
    throttleHint: "Зажмите кнопку 'ГАЗОВАТЬ' или клавишу [Пробел]",
    toastPaint: "Цвет изменен на ",
    toastDoorsOpen: "Двери открыты",
    toastDoorsClosed: "Двери закрыты",
    toastLightsOn: "Фары включены",
    toastLightsOff: "Фары выключены",
    toastSnapshot: "Снимок сохранен!",
    hotspotsData: {
      engine: {
        cat: "ИНЖЕНЕРИЯ ДВИГАТЕЛЯ",
        title: "5.0-Литровый Quad-Cam V8",
        desc: "Атмосферный 90-градусный V8 объемом 4941 см³ с четырьмя распредвалами (DOHC) и системой смазки с сухим картером. Питается четырьмя карбюраторами Weber 46 IDCM и выдает 430 л.с. при 7000 об/мин.",
        k1: "Мощность", v1: "430 л.с. @ 7000 об/мин",
        k2: "Карбюраторы", v2: "4 × Weber 46 IDCM"
      },
      aero: {
        cat: "АЭРОДИНАМИКА КАММА",
        title: "Хвост Камма (Coda Tronca)",
        desc: "Кузов работы ателье Carrozzeria Drogo в Модене. Резко усеченная задняя часть («хвост Камма») стабилизирует потоки воздуха на скорости более 300 км/ч на прямой Мульсанн без тяжелых антикрыльев.",
        k1: "Макс. скорость", v1: "330 км/ч (205 миль/ч)",
        k2: "Ателье", v2: "Carrozzeria Drogo"
      },
      cockpit: {
        cat: "КОКПИТ И ИНТЕРЬЕР",
        title: "Спортивный кокпит 1964 года",
        desc: "Облегченный алюминиевый кокпит гонщика с деревянным рулем Nardi, приборами Veglia-Borletti и 5-ступенчатой кулисой механической коробки Colotti. На этом автомобиле выступал легендарный Морис Трентиньян.",
        k1: "Пилот", v1: "Морис Трентиньян",
        k2: "Трансмиссия", v2: "5-ст. Colotti transaxle"
      },
      wheels: {
        cat: "ШАССИ И ТОРМОЗА",
        title: "Колеса Borrani & Тормоза Girling",
        desc: "16-дюймовые спицованные диски Ruote Borrani с центральной гайкой-бабочкой (knock-off), обутые в спортивные шины Dunlop Racing. Дисковые тормоза Girling на всех четырех колесах.",
        k1: "Диски", v1: "Borrani 16\" Wire",
        k2: "Тормоза", v2: "Дисковые Girling"
      },
      exhaust: {
        cat: "ВЫХЛОПНАЯ СИСТЕМА",
        title: "Прямоточный гоночный выхлоп",
        desc: "Двойные сдвоенные прямоточные выпускные патрубки, обеспечивающие свободный выход отработавших газов из 430-сильного V8 и создающие неповторимый оглушительный баритон Maserati.",
        k1: "Конфигурация", v1: "4-трубный свободный выхлоп",
        k2: "Звук", v2: "90° V8 Crossplane Roar"
      }
    }
  },
  en: {
    showcase: "3D Showroom",
    sound: "V8 Sound",
    specs: "Specs",
    heritage: "Heritage",
    tour: "Auto-Tour",
    paint: "BODY COLOR",
    lighting: "LIGHTING",
    chassis: "Chassis #151.003 • Le Mans 1964",
    heroDesc: "Legendary endurance race prototype engineered by Giulio Alfieri and Piero Drogo for the 1964 24 Hours of Le Mans. Featuring an aerodynamic Kamm tail (Coda Tronca) and a 430-hp V8 capable of 330 km/h (205 mph).",
    specPower: "Power",
    specSpeed: "Top Speed",
    specEngine: "Engine",
    specWeight: "Dry Weight",
    camHero: "3/4 Hero",
    camProfile: "Profile",
    camFront: "Front",
    camRear: "Tail",
    camInterior: "Cockpit",
    camTop: "Top Aero",
    doors: "Doors",
    lights: "Lights",
    turntable: "Rotate",
    hotspots: "Hotspots",
    snapshot: "Snapshot",
    envMonza: "Dark Showroom",
    envSunset: "Le Mans Sunset",
    envStudio: "White Showroom",
    envCyber: "Cyber Neon",
    bgWhite: "BG: White",
    bgDark: "BG: Dark",
    toastBgWhite: "Background: White Studio",
    toastBgDark: "Background: Dark Studio",
    engineTitle: "V8 ENGINE SIMULATOR",
    startEngine: "START ENGINE",
    stopEngine: "STOP ENGINE",
    gasPedal: "THROTTLE",
    throttleHint: "Hold 'THROTTLE' button or [Spacebar]",
    toastPaint: "Paint changed to ",
    toastDoorsOpen: "Doors opened",
    toastDoorsClosed: "Doors closed",
    toastLightsOn: "Lights turned ON",
    toastLightsOff: "Lights turned OFF",
    toastSnapshot: "Snapshot saved!",
    hotspotsData: {
      engine: {
        cat: "POWERTRAIN ENGINEERING",
        title: "5.0-Litre Quad-Cam V8",
        desc: "Naturally aspirated 90-degree 4,941 cc V8 with dual overhead camshafts per bank (DOHC) and dry-sump lubrication. Fed by four twin-choke Weber 46 IDCM carburetors, delivering 430 bhp at 7,000 RPM.",
        k1: "Output", v1: "430 bhp @ 7,000 RPM",
        k2: "Induction", v2: "4 × Weber 46 IDCM"
      },
      aero: {
        cat: "KAMM AERODYNAMICS",
        title: "Kamm Tail (Coda Tronca)",
        desc: "Handcrafted bodywork by Carrozzeria Drogo in Modena. The sharply truncated Kamm tail reduces turbulent aerodynamic drag and neutralizes high-speed rear lift down the Mulsanne straight at over 330 km/h.",
        k1: "Top Speed", v1: "330 km/h (205 mph)",
        k2: "Coachbuilder", v2: "Carrozzeria Drogo"
      },
      cockpit: {
        cat: "RACE COCKPIT",
        title: "1964 Le Mans Cockpit",
        desc: "Lightweight aluminum racing cabin featuring an authentic wood-rimmed Nardi steering wheel, Jaeger & Veglia analog gauges, and a 5-speed Colotti gated transaxle shifter, raced by Maurice Trintignant.",
        k1: "Driver", v1: "Maurice Trintignant",
        k2: "Gearbox", v2: "5-speed Colotti transaxle"
      },
      wheels: {
        cat: "CHASSIS & BRAKES",
        title: "Borrani Wire Wheels & Girling Brakes",
        desc: "16-inch center-lock knock-off Borrani wire-spoked wheels shod in vintage Dunlop Racing tires, backed by high-performance Girling disc brakes on all four corners.",
        k1: "Wheels", v1: "16\" Borrani Wire-Spoke",
        k2: "Brakes", v2: "All-round Girling Discs"
      },
      exhaust: {
        cat: "EXHAUST SYSTEM",
        title: "Twin Dual-Pipe Racing Exhaust",
        desc: "Dual twin-pipe tuned exhaust exits engineered for maximum flow and high-RPM scavenging from the 5.0L V8, producing the spine-tingling historic Maserati roar.",
        k1: "Configuration", v1: "Quad free-flow racing pipes",
        k2: "Sound", v2: "90° Crossplane V8 Roar"
      }
    }
  }
};

let currentLang = 'ru';

// --- STATE MANAGEMENT ---
const state = {
  doorsOpen: false,
  lightsOn: false,
  autoRotate: false,
  showHotspots: false, // Default: OFF for clean view
  currentColor: '#ab1313',
  currentFinish: 'gloss',
  currentEnv: 'dark-studio',
  currentBgTheme: 'black', // Default: Black Studio ("в стоке черный режим")
  cameraPreset: 'hero',
  engineRunning: false,
  throttlePressed: false,
  currentRPM: 0,
  targetRPM: 0,
  audioContext: null,
  isTouring: false,
  tourStep: 0,
  zenMode: false
};

// --- THREE.JS GLOBALS ---
let scene, camera, renderer, controls;
let carModel = null;
let bodyMaterials = [];
let chromeMaterials = [];
let glassMaterials = [];
let bulbMaterials = [];
let tailightMaterials = [];
let reflectorMaterials = [];
let doorNodes = { left: [], right: [] };
let headlightSpotlights = [];
let taillightGlow = [];
let headlightFlares = [];
let taillightFlares = [];
let podiumGroup = null;

// Lighting Rigs
let dirLight, ambientLight, rimLightL, rimLightR, floorBounce;
let groundMesh, contactShadowMesh;

// Camera Target Animation
let camTargetPos = new THREE.Vector3(3.6, 1.35, 3.4);
let camTargetLook = new THREE.Vector3(0, 0.45, 0);
let isTransitioningCamera = false;

// Hotspots Definition in 3D Space
const HOTSPOTS = {
  engine: { pos: new THREE.Vector3(0, 0.72, 1.15), el: document.getElementById('pin-engine') },
  aero: { pos: new THREE.Vector3(0, 0.85, -1.82), el: document.getElementById('pin-aero') },
  cockpit: { pos: new THREE.Vector3(0.38, 0.95, 0.05), el: document.getElementById('pin-cockpit') },
  wheels: { pos: new THREE.Vector3(0.82, 0.35, 1.25), el: document.getElementById('pin-wheels') },
  exhaust: { pos: new THREE.Vector3(0.35, 0.30, -1.95), el: document.getElementById('pin-exhaust') }
};

// Camera Angle Presets
const CAMERA_PRESETS = {
  hero: { pos: new THREE.Vector3(3.6, 1.35, 3.4), look: new THREE.Vector3(0, 0.45, 0) },
  profile: { pos: new THREE.Vector3(4.8, 0.85, -0.2), look: new THREE.Vector3(0, 0.45, 0) },
  front: { pos: new THREE.Vector3(0.0, 0.85, 4.3), look: new THREE.Vector3(0, 0.45, 0) },
  rear: { pos: new THREE.Vector3(0.0, 0.90, -4.2), look: new THREE.Vector3(0, 0.45, 0) },
  interior: { pos: new THREE.Vector3(0.35, 0.85, 0.08), look: new THREE.Vector3(0.12, 0.72, 0.65) },
  top: { pos: new THREE.Vector3(0.01, 5.8, 0.05), look: new THREE.Vector3(0, 0, 0) }
};

// --- INITIALIZE APPLICATION ---
function init() {
  const container = document.getElementById('webgl-container');
  const canvas = document.getElementById('webgl-canvas');

  // Check persisted theme preference (defaults to black)
  try {
    const savedTheme = localStorage.getItem('maserati_theme');
    if (savedTheme === 'white' || savedTheme === 'black') {
      state.currentBgTheme = savedTheme;
      state.currentEnv = (savedTheme === 'white') ? 'white-studio' : 'dark-studio';
    }
  } catch (e) {}

  const isDarkInit = (state.currentBgTheme === 'black');

  // 1. Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(isDarkInit ? 0x0a0c10 : 0xf2f3f5);
  scene.fog = null;

  // 2. Camera
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.copy(camTargetPos);

  // 3. Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
    logarithmicDepthBuffer: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = isDarkInit ? 1.15 : 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // 4. OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.95;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.minDistance = 1.8;
  controls.maxDistance = 14.0;
  controls.maxPolarAngle = Math.PI / 2 - 0.02; // Never clip beneath studio floor
  controls.target.copy(camTargetLook);

  // Stop camera transition as soon as user manually grabs or rotates
  controls.addEventListener('start', () => {
    isTransitioningCamera = false;
    if (state.isTouring) {
      state.isTouring = false;
      if (tourTimer) clearTimeout(tourTimer);
      const tourBtn = document.getElementById('nav-btn-tour');
      if (tourBtn) tourBtn.classList.remove('active');
    }
  });

  // 5. Studio Environment via RoomEnvironment (Soft, natural automotive reflections)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const roomEnv = new RoomEnvironment();
  scene.environment = pmremGenerator.fromScene(roomEnv).texture;
  pmremGenerator.dispose();
  if ('environmentIntensity' in scene) {
    scene.environmentIntensity = 0.75;
  }

  // 6. Studio Lighting
  setupLighting();

  // 7. Ground Floor & Contact Shadow
  setupGround();

  // 7b. Realistic Headlight Optics & Lens Flares
  setupHeadlightOptics();

  // 8. Load 3D GLB Model
  loadMaseratiModel();

  // 9. UI Events & Listeners
  setupUIEventListeners();

  // 10. Start Animation Render Loop
  requestAnimationFrame(animate);

  // 11. Handle Window Resize
  window.addEventListener('resize', onWindowResize);
}

// --- SETUP LIGHTING RIGS ---
function setupLighting() {
  const isDark = (state.currentBgTheme === 'black');

  // Warm ambient light to keep red paint rich, deep and saturated
  ambientLight = new THREE.AmbientLight(0xfff4f0, isDark ? 0.90 : 0.85);
  scene.add(ambientLight);

  // Key Light from top-side
  dirLight = new THREE.DirectionalLight(0xfffaf0, isDark ? 1.55 : 1.35);
  dirLight.position.set(3.5, 7.5, 3.5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 20;
  dirLight.shadow.camera.left = -3.5;
  dirLight.shadow.camera.right = 3.5;
  dirLight.shadow.camera.top = 3.5;
  dirLight.shadow.camera.bottom = -3.5;
  dirLight.shadow.bias = -0.0001;
  dirLight.shadow.normalBias = 0.02;
  scene.add(dirLight);

  // Left Softbox Fill Light
  rimLightL = new THREE.DirectionalLight(0xffffff, isDark ? 0.80 : 0.65);
  rimLightL.position.set(-6, 5, -2);
  scene.add(rimLightL);

  // Right Rear Rim Light (soft edge highlight, no front glare beam)
  rimLightR = new THREE.DirectionalLight(0xfff0ea, isDark ? 0.70 : 0.55);
  rimLightR.position.set(5, 5, -4);
  scene.add(rimLightR);

  // Headlight Spotlights (Forward pools of light on the road/podium)
  const spotL = new THREE.SpotLight(0xfffae6, 0, 24, Math.PI / 5, 0.7, 1.2);
  spotL.position.set(0.65, 0.45, 1.75);
  spotL.target.position.set(0.65, -0.05, 8.0);
  scene.add(spotL);
  scene.add(spotL.target);

  const spotR = new THREE.SpotLight(0xfffae6, 0, 24, Math.PI / 5, 0.7, 1.2);
  spotR.position.set(-0.65, 0.45, 1.75);
  spotR.target.position.set(-0.65, -0.05, 8.0);
  scene.add(spotR);
  scene.add(spotR.target);

  headlightSpotlights.push(spotL, spotR);

  // Taillight glow point lights
  const tailGlowL = new THREE.PointLight(0xff1100, 0, 3.5);
  tailGlowL.position.set(0.55, 0.55, -2.0);
  scene.add(tailGlowL);

  const tailGlowR = new THREE.PointLight(0xff1100, 0, 3.5);
  tailGlowR.position.set(-0.55, 0.55, -2.0);
  scene.add(tailGlowR);

  taillightGlow.push(tailGlowL, tailGlowR);
}

let shadowPlaneMat;
// --- SETUP GROUND & CONTACT SHADOW ---
function setupGround() {
  const isDark = (state.currentBgTheme === 'black');

  // Seamless Studio Floor Shadow Receiver (100% transparent, catches real shadows without ANY edge or horizon line)
  const groundGeo = new THREE.PlaneGeometry(120, 120);
  shadowPlaneMat = new THREE.ShadowMaterial({
    opacity: isDark ? 0.55 : 0.16,
    transparent: true,
    depthWrite: false
  });
  groundMesh = new THREE.Mesh(groundGeo, shadowPlaneMat);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = 0.001;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Soft Photorealistic Contact Shadow under tires & body (Pure black, NO white halo!)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 1024;
  shadowCanvas.height = 1024;
  const ctx = shadowCanvas.getContext('2d');

  // Pure black radial gradient (0, 0, 0) - removes any light/white tint
  const radGrad = ctx.createRadialGradient(512, 512, 40, 512, 512, 480);
  radGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
  radGrad.addColorStop(0.25, 'rgba(0, 0, 0, 0.70)');
  radGrad.addColorStop(0.55, 'rgba(0, 0, 0, 0.28)');
  radGrad.addColorStop(0.82, 'rgba(0, 0, 0, 0.06)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const contactGeo = new THREE.PlaneGeometry(3.6, 6.2);
  const contactMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: isDark ? 0.88 : 0.75,
    depthWrite: false
  });
  contactShadowMesh = new THREE.Mesh(contactGeo, contactMat);
  contactShadowMesh.rotation.x = -Math.PI / 2;
  contactShadowMesh.position.y = 0.002;
  scene.add(contactShadowMesh);
}

// Podium removed per user request (pure studio look)
function setupPodium() {
  // No podium - clean studio floor
}

// Generate High-Res 2048x2048 Podium Top Surface Texture
function createPodiumTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  const cx = 1024, cy = 1024;

  // Ultra-deep dark obsidian base
  ctx.fillStyle = '#040507';
  ctx.fillRect(0, 0, 2048, 2048);

  // Deep luxury gradient
  const radGrad = ctx.createRadialGradient(cx, cy, 100, cx, cy, 1000);
  radGrad.addColorStop(0, '#090b10');
  radGrad.addColorStop(0.7, '#050608');
  radGrad.addColorStop(1, '#020304');
  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 1000, 0, Math.PI * 2);
  ctx.fill();

  // Outer turntable groove ring (Maserati gold)
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
  ctx.beginPath();
  ctx.arc(cx, cy, 910, 0, Math.PI * 2);
  ctx.stroke();

  // Inner groove ring
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.arc(cx, cy, 640, 0, Math.PI * 2);
  ctx.stroke();

  // Perimeter ring
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(197, 160, 89, 0.65)';
  ctx.beginPath();
  ctx.arc(cx, cy, 995, 0, Math.PI * 2);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  return tex;
}

// --- SETUP REALISTIC HEADLIGHT OPTICS & FLARES ---
function setupHeadlightOptics() {
  const flareTex = createHeadlightFlareTexture();
  const redFlareTex = createTaillightFlareTexture();

  // 4 Front Headlamp Positions (Quad lights of Maserati Tipo 151/3)
  const lampPositions = [
    { pos: new THREE.Vector3(0.64, 0.42, 1.70), scale: 0.42 },   // Outer Left
    { pos: new THREE.Vector3(-0.64, 0.42, 1.70), scale: 0.42 },  // Outer Right
    { pos: new THREE.Vector3(0.44, 0.52, 1.88), scale: 0.32 },   // Inner Left
    { pos: new THREE.Vector3(-0.44, 0.52, 1.88), scale: 0.32 }   // Inner Right
  ];

  lampPositions.forEach((lamp) => {
    const mat = new THREE.SpriteMaterial({
      map: flareTex,
      color: 0xfffae0,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.copy(lamp.pos);
    sprite.scale.set(lamp.scale, lamp.scale, 1);
    sprite.visible = false;
    scene.add(sprite);
    headlightFlares.push(sprite);
  });

  // 2 Rear Taillight Glowing Flares
  const tailPositions = [
    new THREE.Vector3(0.55, 0.55, -2.00),
    new THREE.Vector3(-0.55, 0.55, -2.00)
  ];

  tailPositions.forEach((tPos) => {
    const mat = new THREE.SpriteMaterial({
      map: redFlareTex,
      color: 0xff1500,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.copy(tPos);
    sprite.scale.set(0.35, 0.35, 1);
    sprite.visible = false;
    scene.add(sprite);
    taillightFlares.push(sprite);
  });
}

// Generate Realistic Optical Lens Flare Canvas Texture
function createHeadlightFlareTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Intense white hot-spot core + golden xenon glow
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 126);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.12, 'rgba(255, 250, 220, 0.95)');
  grad.addColorStop(0.35, 'rgba(255, 205, 110, 0.55)');
  grad.addColorStop(0.65, 'rgba(255, 160, 50, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Subtle horizontal optical lens streak (anamorphic glare)
  const streak = ctx.createLinearGradient(0, 128, 256, 128);
  streak.addColorStop(0, 'rgba(255, 200, 120, 0)');
  streak.addColorStop(0.35, 'rgba(255, 235, 190, 0.3)');
  streak.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
  streak.addColorStop(0.65, 'rgba(255, 235, 190, 0.3)');
  streak.addColorStop(1, 'rgba(255, 200, 120, 0)');
  ctx.fillStyle = streak;
  ctx.fillRect(0, 124, 256, 8);

  return new THREE.CanvasTexture(canvas);
}

// Generate Taillight Red Flare Texture
function createTaillightFlareTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 62);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  grad.addColorStop(0.2, 'rgba(255, 30, 10, 0.85)');
  grad.addColorStop(0.5, 'rgba(200, 10, 0, 0.4)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  return new THREE.CanvasTexture(canvas);
}

// --- LOAD GLTF MODEL ---
function loadMaseratiModel() {
  const loader = new GLTFLoader();
  const modelUrl = './public/model/maserati_tipo_151_3.glb';

  const progressFill = document.getElementById('progress-fill');
  const loadPercentText = document.getElementById('load-percent-text');
  const loadStatusText = document.getElementById('load-status-text');

  loader.load(
    modelUrl,
    (gltf) => {
      carModel = gltf.scene;

      // 1. Compute bounding box and center model
      const box = new THREE.Box3().setFromObject(carModel);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      // Re-center so bottom of wheels touches y = 0
      carModel.position.x = -center.x;
      carModel.position.y = -box.min.y;
      carModel.position.z = -center.z;

      // 2. Traverse scene and enhance PBR materials
      let sharedBodyMat = null;
      carModel.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;

          const mat = node.material;
          if (mat) {
            const matName = (mat.name || '').toLowerCase();
            const nodeName = (node.name || '').toLowerCase();

            // Body paint materials
            if (matName.includes('body') || nodeName.includes('body') || nodeName.includes('bonnet') || nodeName.includes('booth')) {
              if (!sharedBodyMat) {
                // Vibrant, glossy Rosso Corsa lacquer: deep bright red, realistic glossy lacquer, no harsh laser beam
                sharedBodyMat = new THREE.MeshPhysicalMaterial({
                  map: mat.map,
                  normalMap: mat.normalMap,
                  color: new THREE.Color(0xffffff), // Authentic Rosso Corsa
                  roughness: 0.16,
                  metalness: 0.0,
                  clearcoat: 0.70,
                  clearcoatRoughness: 0.18,
                  ior: 1.45,
                  reflectivity: 0.5,
                  envMapIntensity: 0.55,
                });
                bodyMaterials.push(sharedBodyMat);
              }
              node.material = sharedBodyMat;
            }

            // Chrome & Polished Metal
            if (matName.includes('chrome') || matName.includes('old_chrome') || matName.includes('metal')) {
              if (!chromeMaterials.includes(mat)) {
                chromeMaterials.push(mat);
                mat.metalness = 0.92;
                mat.roughness = 0.10;
                mat.envMapIntensity = 1.2;
              }
            }

            // Glass windshield and windows
            if (matName.includes('glass') && !matName.includes('headlight')) {
              if (!glassMaterials.includes(mat)) {
                glassMaterials.push(mat);
                mat.transparent = true;
                mat.opacity = 0.35;
                mat.roughness = 0.08;
                mat.metalness = 0.05;
                mat.envMapIntensity = 1.0;
                mat.depthWrite = false;
              }
            }

            // Headlight Glass
            if (matName.includes('headlight_glass')) {
              mat.transparent = true;
              mat.opacity = 0.60;
              mat.roughness = 0.10;
              mat.metalness = 0.05;
              mat.depthWrite = false;
            }

            // Light bulbs
            if (matName.includes('bulb') || matName.includes('front_light') || matName.includes('headlight_material')) {
              if (!bulbMaterials.includes(mat)) {
                bulbMaterials.push(mat);
              }
            }

            // Headlight Reflectors
            if (matName.includes('reflector')) {
              if (!reflectorMaterials.includes(mat)) {
                reflectorMaterials.push(mat);
                mat.metalness = 0.95;
                mat.roughness = 0.08;
                mat.envMapIntensity = 1.3;
              }
            }

            // Taillights
            if (matName.includes('tail') || matName.includes('rear_light')) {
              if (!tailightMaterials.includes(mat)) {
                tailightMaterials.push(mat);
              }
            }

            // Wood steering wheel
            if (matName.includes('wood')) {
              mat.roughness = 0.28;
              mat.clearcoat = 0.8;
            }

            // Leather seats
            if (matName.includes('leather')) {
              mat.roughness = 0.68;
              mat.metalness = 0.02;
            }

            // Rims & Spoke wire wheels
            if (matName.includes('rim')) {
              mat.metalness = 0.88;
              mat.roughness = 0.18;
              mat.envMapIntensity = 1.1;
            }

            // Rubber tires
            if (matName.includes('tyre') || matName.includes('tire')) {
              mat.roughness = 0.82;
              mat.metalness = 0.02;
            }
          }
        }

        // Identify Door Pivot Nodes
        const nName = node.name || '';
        if (nName === 'DOOR_L' || nName === 'DOOR_L1') {
          doorNodes.left.push(node);
        } else if (nName === 'DOOR_R' || nName === 'DOOR_R1') {
          doorNodes.right.push(node);
        }
      });

      scene.add(carModel);

      // Hide loading screen smoothly
      setTimeout(() => {
        const loaderScreen = document.getElementById('loader-screen');
        if (loaderScreen) loaderScreen.classList.add('hidden');
      }, 500);
    },
    (xhr) => {
      const knownTotal = 28713408; // 27.4 MB exact model size
      const total = (xhr.lengthComputable && xhr.total > 0) ? xhr.total : knownTotal;
      const loaded = xhr.loaded || 0;
      const percent = Math.min(100, Math.round((loaded / total) * 100));

      if (progressFill) progressFill.style.width = `${percent}%`;
      if (loadPercentText) loadPercentText.textContent = `${percent}%`;
      const mbLoaded = (loaded / (1024 * 1024)).toFixed(1);
      const mbTotal = (total / (1024 * 1024)).toFixed(1);
      if (loadStatusText) {
        loadStatusText.textContent = currentLang === 'ru' 
          ? `Загрузка: ${mbLoaded} / ${mbTotal} МБ` 
          : `Loading: ${mbLoaded} / ${mbTotal} MB`;
      }
    },
    (err) => {
      console.error('Error loading GLTF model:', err);
      if (loadStatusText) loadStatusText.textContent = 'Ошибка загрузки модели';
    }
  );
}

// --- DOOR ANIMATION INTERPOLATION ---
let currentDoorAngle = 0;
function updateDoorAnimation(delta) {
  const targetAngle = state.doorsOpen ? 0.72 : 0;
  currentDoorAngle = THREE.MathUtils.lerp(currentDoorAngle, targetAngle, delta * 5.0);

  // Left door rotates around local Z (+ angle opens outward)
  doorNodes.left.forEach((node) => {
    node.rotation.z = currentDoorAngle;
  });

  // Right door rotates around local Z (- angle opens outward)
  doorNodes.right.forEach((node) => {
    node.rotation.z = -currentDoorAngle;
  });
}

// --- LIGHTS TOGGLE ---
function setLights(on) {
  state.lightsOn = on;

  // 1. Forward Spotlights (Ground pools)
  headlightSpotlights.forEach((spot) => {
    spot.intensity = on ? 24.0 : 0;
  });

  // 2. Optical Headlamp Flares (Lens Bloom)
  headlightFlares.forEach((flare) => {
    flare.visible = on;
    flare.material.opacity = on ? 1.0 : 0;
  });

  // 3. Rear Taillight Glow & Flares
  taillightGlow.forEach((glow) => {
    glow.intensity = on ? 4.5 : 0;
  });
  taillightFlares.forEach((flare) => {
    flare.visible = on;
    flare.material.opacity = on ? 0.95 : 0;
  });

  // 5. Bulb Filaments Emissive Core
  bulbMaterials.forEach((mat) => {
    if (on) {
      mat.emissive = new THREE.Color(0xfffae0);
      mat.emissiveIntensity = 8.0;
    } else {
      mat.emissive = new THREE.Color(0x000000);
      mat.emissiveIntensity = 0;
    }
  });

  // 6. Headlamp Reflector Bowls Emissive Highlight
  reflectorMaterials.forEach((mat) => {
    if (on) {
      mat.emissive = new THREE.Color(0xffdfaa);
      mat.emissiveIntensity = 2.5;
    } else {
      mat.emissive = new THREE.Color(0x000000);
      mat.emissiveIntensity = 0;
    }
  });

  // 7. Taillights Emissive
  tailightMaterials.forEach((mat) => {
    if (on) {
      mat.emissive = new THREE.Color(0xff1200);
      mat.emissiveIntensity = 5.0;
    } else {
      mat.emissive = new THREE.Color(0x000000);
      mat.emissiveIntensity = 0;
    }
  });

  const btn = document.getElementById('btn-toggle-lights');
  if (btn) btn.classList.toggle('active', on);
  showToast(on ? i18n[currentLang].toastLightsOn : i18n[currentLang].toastLightsOff);
}

// --- PAINT COLOR & FINISH ---
function setPaintColor(hex, name) {
  state.currentColor = hex;
  bodyMaterials.forEach((mat) => {
    if (hex === '#ab1313' || name === 'Rosso Corsa') {
      mat.color.set(0xffffff);
    } else {
      mat.color.set(hex);
    }
  });

  const label = document.getElementById('paint-name-label');
  if (label) {
    label.textContent = name;
    label.style.color = hex === '#ab1313' ? '#ff3b3b' : hex;
  }
  showToast(`${i18n[currentLang].toastPaint}${name}`);
}

function setPaintFinish(finish) {
  state.currentFinish = finish;
  bodyMaterials.forEach((mat) => {
    if (finish === 'gloss') {
      mat.roughness = 0.16;
      mat.metalness = 0.0;
      mat.clearcoat = 0.70;
      mat.clearcoatRoughness = 0.18;
      mat.ior = 1.45;
      mat.envMapIntensity = 0.55;
    } else if (finish === 'metallic') {
      mat.roughness = 0.20;
      mat.metalness = 0.55;
      mat.clearcoat = 0.70;
      mat.clearcoatRoughness = 0.18;
      mat.ior = 1.45;
      mat.envMapIntensity = 0.65;
    } else if (finish === 'satin') {
      mat.roughness = 0.48;
      mat.metalness = 0.10;
      mat.clearcoat = 0.15;
      mat.clearcoatRoughness = 0.35;
      mat.ior = 1.45;
      mat.envMapIntensity = 0.45;
    }
    mat.needsUpdate = true;
  });

  document.querySelectorAll('.finish-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.finish === finish);
  });
}

// --- BACKGROUND & THEME TOGGLE (WHITE / BLACK STUDIO) ---
function toggleBgTheme() {
  const newTheme = state.currentBgTheme === 'white' ? 'black' : 'white';
  setBgTheme(newTheme);
}

function setBgTheme(theme) {
  state.currentBgTheme = theme;
  const isWhite = (theme === 'white');

  try {
    localStorage.setItem('maserati_theme', theme);
  } catch (e) {}

  const canvasContainer = document.getElementById('webgl-container');

  if (isWhite) {
    scene.background.set(0xf2f3f5);
    if (canvasContainer) canvasContainer.style.background = '#f2f3f5';
    if (shadowPlaneMat) {
      shadowPlaneMat.opacity = 0.16;
    }
    if (contactShadowMesh) {
      contactShadowMesh.material.opacity = 0.75;
    }
    ambientLight.intensity = 0.85;
    dirLight.intensity = 1.35;
    rimLightL.intensity = 0.65;
    rimLightR.intensity = 0.55;
    if (renderer) renderer.toneMappingExposure = 1.0;
    document.body.classList.remove('dark-studio');
  } else {
    scene.background.set(0x0a0c10);
    if (canvasContainer) canvasContainer.style.background = '#0a0c10';
    if (shadowPlaneMat) {
      shadowPlaneMat.opacity = 0.55;
    }
    if (contactShadowMesh) {
      contactShadowMesh.material.opacity = 0.88;
    }
    ambientLight.intensity = 0.90;
    dirLight.intensity = 1.55;
    rimLightL.intensity = 0.80;
    rimLightR.intensity = 0.70;
    if (renderer) renderer.toneMappingExposure = 1.10;
    document.body.classList.add('dark-studio');
  }

  // Update bottom pill button label and active state
  const bgLabel = document.getElementById('label-bg-toggle');
  if (bgLabel) {
    bgLabel.textContent = isWhite
      ? (currentLang === 'ru' ? 'Фон: Белый' : 'BG: White')
      : (currentLang === 'ru' ? 'Фон: Черный' : 'BG: Dark');
  }

  const btnToggleBg = document.getElementById('btn-toggle-bg');
  if (btnToggleBg) {
    btnToggleBg.classList.toggle('active', !isWhite);
  }

  // Update header action icon button
  const btnThemeHeader = document.getElementById('btn-theme-toggle');
  if (btnThemeHeader) {
    btnThemeHeader.classList.toggle('active', !isWhite);
    btnThemeHeader.title = isWhite
      ? (currentLang === 'ru' ? 'Переключить на черный фон [B]' : 'Switch to Dark Background [B]')
      : (currentLang === 'ru' ? 'Переключить на белый фон [B]' : 'Switch to White Background [B]');
  }

  // Sync env mode buttons in lighting popover
  document.querySelectorAll('.env-mode-btn').forEach((b) => {
    if (b.dataset.env === 'white-studio' || b.dataset.env === 'studio') {
      b.classList.toggle('active', isWhite);
    } else if (b.dataset.env === 'dark-studio' || b.dataset.env === 'monza') {
      b.classList.toggle('active', !isWhite);
    } else {
      b.classList.remove('active');
    }
  });

  showToast(isWhite ? i18n[currentLang].toastBgWhite : i18n[currentLang].toastBgDark);
}

// --- ENVIRONMENT LIGHTING MODES ---
function setEnvironmentMode(mode) {
  state.currentEnv = mode;
  document.querySelectorAll('.env-mode-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.env === mode);
  });

  if (mode === 'white-studio' || mode === 'studio') {
    setBgTheme('white');
  } else if (mode === 'dark-studio' || mode === 'monza') {
    setBgTheme('black');
  } else if (mode === 'sunset') {
    state.currentBgTheme = 'sunset';
    scene.background.set(0x1a0f0d);
    const canvasContainer = document.getElementById('webgl-container');
    if (canvasContainer) canvasContainer.style.background = '#1a0f0d';
    if (shadowPlaneMat) shadowPlaneMat.opacity = 0.35;
    if (contactShadowMesh) contactShadowMesh.material.opacity = 0.90;
    dirLight.color.set(0xff9944);
    dirLight.intensity = 2.0;
    rimLightL.color.set(0xaa4466);
    rimLightR.color.set(0xffcc66);
    ambientLight.intensity = 0.65;
    document.body.classList.add('dark-studio');
    showToast(i18n[currentLang].envSunset);
  } else if (mode === 'cyber') {
    state.currentBgTheme = 'cyber';
    scene.background.set(0x05060f);
    const canvasContainer = document.getElementById('webgl-container');
    if (canvasContainer) canvasContainer.style.background = '#05060f';
    if (shadowPlaneMat) shadowPlaneMat.opacity = 0.40;
    if (contactShadowMesh) contactShadowMesh.material.opacity = 0.95;
    dirLight.color.set(0x00f0ff);
    dirLight.intensity = 1.8;
    rimLightL.color.set(0xff0066);
    rimLightR.color.set(0x00e5ff);
    ambientLight.intensity = 0.45;
    document.body.classList.add('dark-studio');
    showToast(i18n[currentLang].envCyber);
  }
}

// --- CAMERA PRESET TRANSITION ---
function setCameraPreset(presetName) {
  const preset = CAMERA_PRESETS[presetName];
  if (!preset) return;

  state.cameraPreset = presetName;
  camTargetPos.copy(preset.pos);
  camTargetLook.copy(preset.look);
  isTransitioningCamera = true;

  document.querySelectorAll('.cam-angle-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.cam === presetName);
  });
}

// --- CINEMATIC AUTO TOUR ---
const tourSequence = ['hero', 'front', 'cockpit', 'profile', 'rear', 'top'];
let tourTimer = null;
function toggleCinematicTour() {
  state.isTouring = !state.isTouring;
  const btn = document.getElementById('nav-btn-tour');
  if (btn) btn.classList.toggle('active', state.isTouring);

  if (state.isTouring) {
    state.autoRotate = true;
    runTourStep();
  } else {
    if (tourTimer) clearTimeout(tourTimer);
  }
}

function runTourStep() {
  if (!state.isTouring) return;
  const currentPreset = tourSequence[state.tourStep % tourSequence.length];
  setCameraPreset(currentPreset);
  state.tourStep++;
  tourTimer = setTimeout(runTourStep, 5000);
}

// --- 3D HOTSPOTS PROJECTION & INTERACTION ---
function updateHotspots() {
  const container = document.getElementById('hotspots-container');
  if (!container) return;

  if (!state.showHotspots) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';

  const tempV = new THREE.Vector3();
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (const [key, item] of Object.entries(HOTSPOTS)) {
    if (!item.el) continue;

    tempV.copy(item.pos);
    // Project 3D vector to normalized screen space [-1, 1]
    tempV.project(camera);

    // Behind camera check
    if (tempV.z > 1.0) {
      item.el.style.display = 'none';
      continue;
    }

    const screenX = (tempV.x * 0.5 + 0.5) * width;
    const screenY = (-(tempV.y * 0.5) + 0.5) * height;

    item.el.style.display = 'block';
    item.el.style.left = `${screenX}px`;
    item.el.style.top = `${screenY}px`;
  }
}

function openHotspotModal(target) {
  const data = i18n[currentLang].hotspotsData[target];
  if (!data) return;

  document.getElementById('modal-cat').textContent = data.cat;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('stat-k1').textContent = data.k1;
  document.getElementById('stat-v1').textContent = data.v1;
  document.getElementById('stat-k2').textContent = data.k2;
  document.getElementById('stat-v2').textContent = data.v2;

  document.getElementById('hotspot-modal').classList.add('active');

  // Move camera slightly closer to hotspot
  const hs = HOTSPOTS[target];
  if (hs) {
    camTargetLook.copy(hs.pos);
    const offset = new THREE.Vector3().subVectors(camera.position, hs.pos).normalize().multiplyScalar(2.2);
    camTargetPos.copy(hs.pos).add(offset);
    isTransitioningCamera = true;
  }
}

// --- WEB AUDIO API REALISTIC V8 ENGINE SOUND SYNTHESIZER ---
let audioCtx = null;
let engineMasterGain = null;
let engineOsc1 = null;
let engineOsc2 = null;
let engineSubOsc = null;
let engineNoiseNode = null;
let engineFilter = null;
let enginePanner = null;
let crackleTimer = null;

function initAudio() {
  if (audioCtx) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  // Master Gain
  engineMasterGain = audioCtx.createGain();
  engineMasterGain.gain.setValueAtTime(0, audioCtx.currentTime);

  // Waveshaper distortion for raw V8 race exhaust bark
  const waveShaper = audioCtx.createWaveShaper();
  waveShaper.curve = makeDistortionCurve(18);
  waveShaper.oversample = '4x';

  // Resonant Lowpass Filter (simulates exhaust piping & cylinder resonance)
  engineFilter = audioCtx.createBiquadFilter();
  engineFilter.type = 'lowpass';
  engineFilter.frequency.setValueAtTime(350, audioCtx.currentTime);
  engineFilter.Q.setValueAtTime(3.2, audioCtx.currentTime);

  // Bank 1 Oscillator (Sawtooth cylinder firing pulses)
  engineOsc1 = audioCtx.createOscillator();
  engineOsc1.type = 'sawtooth';
  engineOsc1.frequency.setValueAtTime(60, audioCtx.currentTime);

  // Bank 2 Oscillator (Triangle 90° crossplane offset)
  engineOsc2 = audioCtx.createOscillator();
  engineOsc2.type = 'triangle';
  engineOsc2.frequency.setValueAtTime(60, audioCtx.currentTime);

  // Sub Rumble Oscillator
  engineSubOsc = audioCtx.createOscillator();
  engineSubOsc.type = 'sine';
  engineSubOsc.frequency.setValueAtTime(30, audioCtx.currentTime);

  // Wire Audio Graph
  engineOsc1.connect(waveShaper);
  engineOsc2.connect(waveShaper);
  engineSubOsc.connect(waveShaper);

  waveShaper.connect(engineFilter);
  engineFilter.connect(engineMasterGain);
  engineMasterGain.connect(audioCtx.destination);

  engineOsc1.start();
  engineOsc2.start();
  engineSubOsc.start();
}

function makeDistortionCurve(amount) {
  const k = typeof amount === 'number' ? amount : 20;
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

function toggleEngine() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  state.engineRunning = !state.engineRunning;
  const btn = document.getElementById('btn-start-engine');
  const label = document.getElementById('start-engine-label');
  const throttleBtn = document.getElementById('btn-throttle');

  if (state.engineRunning) {
    btn.classList.add('engine-running');
    label.textContent = i18n[currentLang].stopEngine;
    throttleBtn.removeAttribute('disabled');

    // Starter motor cranking effect -> settle at 900 RPM idle
    state.targetRPM = 900;
    engineMasterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    engineMasterGain.gain.exponentialRampToValueAtTime(0.28, audioCtx.currentTime + 0.6);
  } else {
    btn.classList.remove('engine-running');
    label.textContent = i18n[currentLang].startEngine;
    throttleBtn.setAttribute('disabled', 'true');
    state.targetRPM = 0;

    engineMasterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
    setTimeout(() => {
      engineMasterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    }, 450);
  }
}

// Sound Synthesizer Update Loop
function updateEngineSound(delta) {
  if (!state.engineRunning && state.currentRPM <= 5) {
    state.currentRPM = 0;
    updateTachometer(0);
    return;
  }

  // Calculate target RPM based on throttle
  if (state.engineRunning) {
    state.targetRPM = state.throttlePressed ? 7400 : 920;
  } else {
    state.targetRPM = 0;
  }

  // Smooth RPM rise and fall
  const rpmSpeed = state.throttlePressed ? 6.5 : 3.8;
  state.currentRPM = THREE.MathUtils.lerp(state.currentRPM, state.targetRPM, delta * rpmSpeed);

  updateTachometer(state.currentRPM);

  if (audioCtx && engineMasterGain && state.engineRunning) {
    // 4 cylinder firings per crankshaft revolution for V8 4-stroke
    const firingFreq = (state.currentRPM / 60) * 4;
    engineOsc1.frequency.setValueAtTime(Math.max(20, firingFreq), audioCtx.currentTime);
    engineOsc2.frequency.setValueAtTime(Math.max(20, firingFreq * 1.5), audioCtx.currentTime);
    engineSubOsc.frequency.setValueAtTime(Math.max(15, firingFreq * 0.5), audioCtx.currentTime);

    // Open filter with throttle
    const filterFreq = 350 + (state.currentRPM / 8000) * 3800;
    engineFilter.frequency.setValueAtTime(filterFreq, audioCtx.currentTime);

    // Dynamic volume
    const vol = 0.22 + (state.currentRPM / 8000) * 0.45;
    engineMasterGain.gain.setValueAtTime(vol, audioCtx.currentTime);
  }
}

// Update Analog SVG Tachometer Needle & Digital Display
function updateTachometer(rpm) {
  const rpmDisplay = document.getElementById('rpm-value-display');
  if (rpmDisplay) rpmDisplay.textContent = Math.round(rpm).toLocaleString();

  const needle = document.getElementById('tacho-needle');
  if (needle) {
    // 0 RPM = 0 degrees (pointing left at angle ~ -180 deg)
    // 8000 RPM = 180 degrees (pointing right)
    const angle = (rpm / 8000) * 180;
    needle.style.transform = `rotate(${angle}deg)`;
  }
}

// --- SNAPSHOT GENERATOR ---
function captureSnapshot() {
  // Hide UI overlays temporarily for clean frame
  renderer.render(scene, camera);

  const canvas = renderer.domElement;
  const snapshotCanvas = document.createElement('canvas');
  snapshotCanvas.width = canvas.width;
  snapshotCanvas.height = canvas.height;
  const sCtx = snapshotCanvas.getContext('2d');

  // Draw 3D scene
  sCtx.drawImage(canvas, 0, 0);

  // Add luxury brand watermark
  sCtx.save();
  sCtx.font = '700 24px Cinzel, Georgia, serif';
  sCtx.fillStyle = '#ffffff';
  sCtx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  sCtx.shadowBlur = 10;
  sCtx.fillText('MASERATI TIPO 151/3 (1964)', 40, snapshotCanvas.height - 50);

  sCtx.font = '500 14px Outfit, sans-serif';
  sCtx.fillStyle = '#c5a059';
  sCtx.fillText('CHASSIS #151.003 • 24 HEURES DU MANS', 40, snapshotCanvas.height - 28);
  sCtx.restore();

  // Trigger download
  const link = document.createElement('a');
  link.download = `maserati-tipo-151-3-${Date.now()}.png`;
  link.href = snapshotCanvas.toDataURL('image/png');
  link.click();

  showToast(i18n[currentLang].toastSnapshot);
}

// --- TOAST NOTIFICATION UTILITY ---
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  const text = document.getElementById('toast-text');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.add('active');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 2400);
}

// --- LOCALIZATION & TEXT RENDERER ---
function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('lang-toggle-btn').textContent = lang.toUpperCase();

  const d = i18n[lang];
  document.querySelector('.i18n-showcase').textContent = d.showcase;
  document.querySelector('.i18n-sound').textContent = d.sound;
  document.querySelector('.i18n-specs').textContent = d.specs;
  document.querySelector('.i18n-heritage').textContent = d.heritage;
  document.querySelector('.i18n-tour').textContent = d.tour;
  document.querySelector('.i18n-paint').textContent = d.paint;
  document.querySelector('.i18n-lighting').textContent = d.lighting;
  document.querySelector('.i18n-chassis').textContent = d.chassis;
  document.querySelector('.i18n-hero-desc').textContent = d.heroDesc;
  document.querySelector('.i18n-spec-power').textContent = d.specPower;
  document.querySelector('.i18n-spec-speed').textContent = d.specSpeed;
  document.querySelector('.i18n-spec-engine').textContent = d.specEngine;
  document.querySelector('.i18n-spec-weight').textContent = d.specWeight;

  document.querySelector('.i18n-cam-hero').textContent = d.camHero;
  document.querySelector('.i18n-cam-profile').textContent = d.camProfile;
  document.querySelector('.i18n-cam-front').textContent = d.camFront;
  document.querySelector('.i18n-cam-rear').textContent = d.camRear;
  document.querySelector('.i18n-cam-interior').textContent = d.camInterior;
  document.querySelector('.i18n-cam-top').textContent = d.camTop;

  document.querySelector('.i18n-doors').textContent = d.doors;
  document.querySelector('.i18n-lights').textContent = d.lights;
  document.querySelector('.i18n-turntable').textContent = d.turntable;
  document.querySelector('.i18n-hotspots').textContent = d.hotspots;
  document.querySelector('.i18n-snapshot').textContent = d.snapshot;

  document.querySelector('.i18n-env-monza').textContent = d.envMonza;
  document.querySelector('.i18n-env-sunset').textContent = d.envSunset;
  document.querySelector('.i18n-env-studio').textContent = d.envStudio;
  document.querySelector('.i18n-env-cyber').textContent = d.envCyber;

  const bgLabel = document.getElementById('label-bg-toggle');
  if (bgLabel) {
    bgLabel.textContent = (state.currentBgTheme === 'white')
      ? (lang === 'ru' ? 'Фон: Белый' : 'BG: White')
      : (lang === 'ru' ? 'Фон: Черный' : 'BG: Dark');
  }

  const btnThemeHeader = document.getElementById('btn-theme-toggle');
  if (btnThemeHeader) {
    btnThemeHeader.title = (state.currentBgTheme === 'white')
      ? (lang === 'ru' ? 'Переключить на черный фон [B]' : 'Switch to Dark Background [B]')
      : (lang === 'ru' ? 'Переключить на белый фон [B]' : 'Switch to White Background [B]');
  }

  document.querySelector('.i18n-engine-sound-title').textContent = d.engineTitle;
  document.getElementById('start-engine-label').textContent = state.engineRunning ? d.stopEngine : d.startEngine;
  document.querySelector('.i18n-throttle-hint').textContent = d.throttleHint;

  renderSpecsDrawerContent();
}

function renderSpecsDrawerContent() {
  const container = document.getElementById('specs-content-body');
  if (!container) return;

  if (currentLang === 'ru') {
    container.innerHTML = `
      <div class="specs-section-title">ИСТОРИЧЕСКАЯ СПРАВКА</div>
      <p class="story-text">
        В 1964 году французский импортер Maserati Джонни Симоне (Team Maserati France) заказал постройку ультимативного спортпрототипа для победы в гонке «24 часа Ле-Мана». 
      </p>
      <p class="story-text">
        Главный инженер Maserati Джулио Альфиери создал пространственную трубчатую раму, а гениальный кузовщик Пьеро Дрого (Carrozzeria Sports Cars в Модене) спроектировал революционный обтекаемый алюминиевый кузов с усеченным хвостом Камма («Coda Tronca»). На тестах на легендарной прямой Мюльсанн Tipo 151/3 развивал умопомрачительные для того времени 330 км/ч.
      </p>

      <div class="specs-section-title">СИЛОВАЯ УСТАНОВКА И ДВИГАТЕЛЬ</div>
      <table class="specs-table">
        <tr><td>Тип двигателя</td><td>Tipo 151 90° V8, DOHC</td></tr>
        <tr><td>Рабочий объем</td><td>4941 см³ (301.5 cu in)</td></tr>
        <tr><td>Диаметр и ход поршня</td><td>94.0 мм × 89.0 мм</td></tr>
        <tr><td>Мощность</td><td>430 л.с. (316 кВт) при 7000 об/мин</td></tr>
        <tr><td>Крутящий момент</td><td>480 Нм при 5200 об/мин</td></tr>
        <tr><td>Система питания</td><td>4 сдвоенных карбюратора Weber 46 IDCM</td></tr>
        <tr><td>Система смазки</td><td>Сухой картер с двумя масляными радиаторами</td></tr>
      </table>

      <div class="specs-section-title">ТРАНСМИССИЯ И ШАССИ</div>
      <table class="specs-table">
        <tr><td>Коробка передач</td><td>5-ступенчатая механическая Colotti Transaxle</td></tr>
        <tr><td>Сцепление</td><td>Многодисковое сухое с гидравлическим приводом</td></tr>
        <tr><td>Рама</td><td>Пространственная ферма из овальных хром-молибденовых труб</td></tr>
        <tr><td>Кузов</td><td>Алюминиевый Drogo Superleggera, хвост Камма</td></tr>
        <tr><td>Передняя подвеска</td><td>Двойные поперечные рычаги, амортизаторы Koni</td></tr>
        <tr><td>Задняя подвеска</td><td>Ось де Дион с продольными тягами и винтовыми пружинами</td></tr>
        <tr><td>Тормоза</td><td>Вентилируемые дисковые Girling на всех колесах</td></tr>
        <tr><td>Колеса</td><td>Спицованные Ruote Borrani 16 дюймов с центральной гайкой</td></tr>
      </table>

      <div class="specs-section-title">РАЗМЕРЫ И ДИНАМИКА</div>
      <table class="specs-table">
        <tr><td>Максимальная скорость</td><td>330 км/ч (205 миль/ч)</td></tr>
        <tr><td>Разгон 0-100 км/ч</td><td>3.8 секунды</td></tr>
        <tr><td>Сухая масса</td><td>980 кг</td></tr>
        <tr><td>Длина кузова</td><td>4350 мм</td></tr>
        <tr><td>Ширина</td><td>1780 мм</td></tr>
        <tr><td>Высота</td><td>1120 мм</td></tr>
        <tr><td>Колесная база</td><td>2400 мм</td></tr>
        <tr><td>Топливный бак</td><td>120 литров (для гонок на выносливость)</td></tr>
      </table>
    `;
  } else {
    container.innerHTML = `
      <div class="specs-section-title">HISTORICAL HERITAGE</div>
      <p class="story-text">
        In 1964, Johnny Simone, head of Maserati France, commissioned the factory to build the ultimate weapon to conquer the 24 Hours of Le Mans against Ferrari 250 GTOs, Shelby Cobras, and Ford GT40s.
      </p>
      <p class="story-text">
        Chief engineer Giulio Alfieri refined the lightweight tubular chassis, while visionary coachbuilder Piero Drogo (Carrozzeria Sports Cars in Modena) developed a radical aerodynamic aluminum body featuring a severe Kamm tail ("Coda Tronca"). In speed traps on the Mulsanne straight, chassis #151.003 clocked an incredible 330 km/h (205 mph).
      </p>

      <div class="specs-section-title">POWERTRAIN & ENGINE</div>
      <table class="specs-table">
        <tr><td>Engine Architecture</td><td>Tipo 151 90° V8, Quad-Cam (DOHC)</td></tr>
        <tr><td>Displacement</td><td>4,941 cc (301.5 cu in)</td></tr>
        <tr><td>Bore × Stroke</td><td>94.0 mm × 89.0 mm</td></tr>
        <tr><td>Horsepower</td><td>430 bhp (316 kW) @ 7,000 RPM</td></tr>
        <tr><td>Torque</td><td>480 Nm (354 lb-ft) @ 5,200 RPM</td></tr>
        <tr><td>Carburetors</td><td>4 × Twin-choke Weber 46 IDCM</td></tr>
        <tr><td>Lubrication</td><td>Dry sump with twin oil coolers</td></tr>
      </table>

      <div class="specs-section-title">TRANSMISSION & CHASSIS</div>
      <table class="specs-table">
        <tr><td>Transmission</td><td>5-speed manual Colotti Transaxle</td></tr>
        <tr><td>Clutch</td><td>Multi-plate dry clutch</td></tr>
        <tr><td>Chassis</td><td>Tubular spaceframe in chrome-moly steel</td></tr>
        <tr><td>Coachwork</td><td>Drogo Superleggera aluminum Kamm-tail</td></tr>
        <tr><td>Front Suspension</td><td>Double wishbones, coil springs, Koni dampers</td></tr>
        <tr><td>Rear Suspension</td><td>De Dion axle with trailing arms and coil springs</td></tr>
        <tr><td>Brakes</td><td>Four-wheel Dunlop/Girling disc brakes</td></tr>
        <tr><td>Wheels</td><td>16-inch center-lock Borrani wire wheels</td></tr>
      </table>

      <div class="specs-section-title">PERFORMANCE & DIMENSIONS</div>
      <table class="specs-table">
        <tr><td>Top Speed</td><td>330 km/h (205 mph)</td></tr>
        <tr><td>0-100 km/h</td><td>3.8 seconds</td></tr>
        <tr><td>Dry Weight</td><td>980 kg (2,160 lbs)</td></tr>
        <tr><td>Length</td><td>4,350 mm</td></tr>
        <tr><td>Width</td><td>1,780 mm</td></tr>
        <tr><td>Height</td><td>1,120 mm</td></tr>
        <tr><td>Wheelbase</td><td>2,400 mm</td></tr>
        <tr><td>Fuel Capacity</td><td>120 Litres (Long distance Le Mans tank)</td></tr>
      </table>
    `;
  }
}

// --- SETUP UI EVENT LISTENERS ---
function setupUIEventListeners() {
  // Paint Color Swatches
  document.querySelectorAll('.color-swatch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      setPaintColor(btn.dataset.color, btn.dataset.name);
    });
  });

  // Finish Toggles
  document.querySelectorAll('.finish-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setPaintFinish(btn.dataset.finish);
    });
  });

  // Environment Lighting Modes
  document.querySelectorAll('.env-mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setEnvironmentMode(btn.dataset.env);
    });
  });

  // Camera Presets
  document.querySelectorAll('.cam-angle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setCameraPreset(btn.dataset.cam);
    });
  });

  // Toggle Background Theme (White / Black Studio)
  const btnToggleBg = document.getElementById('btn-toggle-bg');
  if (btnToggleBg) {
    btnToggleBg.addEventListener('click', toggleBgTheme);
  }

  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', toggleBgTheme);
  }

  // Toggle Doors
  const btnDoors = document.getElementById('btn-toggle-doors');
  if (btnDoors) {
    btnDoors.addEventListener('click', () => {
      state.doorsOpen = !state.doorsOpen;
      btnDoors.classList.toggle('active', state.doorsOpen);
      showToast(state.doorsOpen ? i18n[currentLang].toastDoorsOpen : i18n[currentLang].toastDoorsClosed);
    });
  }

  // Toggle Lights
  const btnLights = document.getElementById('btn-toggle-lights');
  if (btnLights) {
    btnLights.addEventListener('click', () => {
      setLights(!state.lightsOn);
    });
  }

  // Toggle Turntable
  const btnRotate = document.getElementById('btn-toggle-rotate');
  if (btnRotate) {
    btnRotate.addEventListener('click', () => {
      state.autoRotate = !state.autoRotate;
      btnRotate.classList.toggle('active', state.autoRotate);
    });
  }

  // Open Paint Popover
  const btnOpenPaint = document.getElementById('btn-open-paint');
  const popoverPaint = document.getElementById('popover-paint');
  const closePopoverPaint = document.getElementById('close-popover-paint');
  const popoverLighting = document.getElementById('popover-lighting');

  if (btnOpenPaint && popoverPaint) {
    btnOpenPaint.addEventListener('click', () => {
      const isActive = popoverPaint.classList.contains('active');
      popoverLighting?.classList.remove('active');
      popoverPaint.classList.toggle('active', !isActive);
      btnOpenPaint.classList.toggle('active', !isActive);
      document.getElementById('btn-open-lighting')?.classList.remove('active');
    });
  }

  if (closePopoverPaint && popoverPaint) {
    closePopoverPaint.addEventListener('click', () => {
      popoverPaint.classList.remove('active');
      btnOpenPaint?.classList.remove('active');
    });
  }

  // Open Lighting Popover
  const btnOpenLighting = document.getElementById('btn-open-lighting');
  const closePopoverLighting = document.getElementById('close-popover-lighting');

  if (btnOpenLighting && popoverLighting) {
    btnOpenLighting.addEventListener('click', () => {
      const isActive = popoverLighting.classList.contains('active');
      popoverPaint?.classList.remove('active');
      popoverLighting.classList.toggle('active', !isActive);
      btnOpenLighting.classList.toggle('active', !isActive);
      btnOpenPaint?.classList.remove('active');
    });
  }

  if (closePopoverLighting && popoverLighting) {
    closePopoverLighting.addEventListener('click', () => {
      popoverLighting.classList.remove('active');
      btnOpenLighting?.classList.remove('active');
    });
  }

  // Zen Mode (Чистый вид - Только автомобиль)
  const btnZenMode = document.getElementById('btn-zen-mode');
  const btnZenExit = document.getElementById('btn-zen-exit');

  const setZenMode = (active) => {
    state.zenMode = active;
    document.body.classList.toggle('zen-mode', active);
    popoverPaint?.classList.remove('active');
    popoverLighting?.classList.remove('active');
    btnOpenPaint?.classList.remove('active');
    btnOpenLighting?.classList.remove('active');
    showToast(active 
      ? (currentLang === 'ru' ? 'Режим «Только авто». Нажмите [Esc] или кнопку в углу для возврата' : 'Clean View. Press [Esc] or corner button to restore UI') 
      : (currentLang === 'ru' ? 'Интерфейс восстановлен' : 'UI restored')
    );
  };

  if (btnZenMode) {
    btnZenMode.addEventListener('click', () => setZenMode(true));
  }
  if (btnZenExit) {
    btnZenExit.addEventListener('click', () => setZenMode(false));
  }

  // Toggle Hotspots
  const btnHotspots = document.getElementById('btn-toggle-hotspots');
  if (btnHotspots) {
    btnHotspots.addEventListener('click', () => {
      state.showHotspots = !state.showHotspots;
      btnHotspots.classList.toggle('active', state.showHotspots);
    });
  }

  // Snapshot Button
  const btnSnapshot = document.getElementById('btn-snapshot');
  if (btnSnapshot) {
    btnSnapshot.addEventListener('click', captureSnapshot);
  }

  // Hotspot Pins Click
  document.querySelectorAll('.hotspot-pin').forEach((pin) => {
    pin.addEventListener('click', () => {
      openHotspotModal(pin.dataset.target);
    });
  });

  // Close Hotspot Modal
  const closeModBtn = document.getElementById('close-modal-btn');
  if (closeModBtn) {
    closeModBtn.addEventListener('click', () => {
      document.getElementById('hotspot-modal').classList.remove('active');
    });
  }

  // Engine Sound Drawer Toggle
  const navBtnSound = document.getElementById('nav-btn-sound');
  const engineDrawer = document.getElementById('engine-drawer');
  const closeEngineBtn = document.getElementById('close-engine-drawer');

  if (navBtnSound && engineDrawer) {
    navBtnSound.addEventListener('click', () => {
      engineDrawer.classList.toggle('active');
      navBtnSound.classList.toggle('active', engineDrawer.classList.contains('active'));
    });
  }

  if (closeEngineBtn && engineDrawer) {
    closeEngineBtn.addEventListener('click', () => {
      engineDrawer.classList.remove('active');
      if (navBtnSound) navBtnSound.classList.remove('active');
    });
  }

  // Engine Start/Stop Button
  const btnStartEngine = document.getElementById('btn-start-engine');
  if (btnStartEngine) {
    btnStartEngine.addEventListener('click', toggleEngine);
  }

  // Throttle Button (Press & Hold)
  const btnThrottle = document.getElementById('btn-throttle');
  if (btnThrottle) {
    const pressThrottle = () => {
      if (state.engineRunning) {
        state.throttlePressed = true;
        btnThrottle.classList.add('pressing');
      }
    };
    const releaseThrottle = () => {
      state.throttlePressed = false;
      btnThrottle.classList.remove('pressing');
    };

    btnThrottle.addEventListener('mousedown', pressThrottle);
    btnThrottle.addEventListener('mouseup', releaseThrottle);
    btnThrottle.addEventListener('mouseleave', releaseThrottle);
    btnThrottle.addEventListener('touchstart', pressThrottle);
    btnThrottle.addEventListener('touchend', releaseThrottle);
  }

  // Specs & Heritage Drawer
  const navBtnSpecs = document.getElementById('nav-btn-specs');
  const navBtnHeritage = document.getElementById('nav-btn-heritage');
  const specsDrawer = document.getElementById('specs-drawer');
  const closeSpecsBtn = document.getElementById('close-specs-drawer');

  if (navBtnSpecs && specsDrawer) {
    navBtnSpecs.addEventListener('click', () => {
      renderSpecsDrawerContent();
      specsDrawer.classList.add('active');
    });
  }

  if (navBtnHeritage && specsDrawer) {
    navBtnHeritage.addEventListener('click', () => {
      renderSpecsDrawerContent();
      specsDrawer.classList.add('active');
    });
  }

  if (closeSpecsBtn && specsDrawer) {
    closeSpecsBtn.addEventListener('click', () => {
      specsDrawer.classList.remove('active');
    });
  }

  // Auto Tour Button
  const navBtnTour = document.getElementById('nav-btn-tour');
  if (navBtnTour) {
    navBtnTour.addEventListener('click', toggleCinematicTour);
  }

  // Language Switcher
  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'ru' ? 'en' : 'ru');
    });
  }

  // Fullscreen Button
  const btnFs = document.getElementById('btn-fullscreen');
  if (btnFs) {
    btnFs.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Space: throttle
    if (e.code === 'Space' && !e.repeat) {
      if (state.engineRunning) {
        state.throttlePressed = true;
        const btnTh = document.getElementById('btn-throttle');
        if (btnTh) btnTh.classList.add('pressing');
        e.preventDefault();
      }
    }
    // L: toggle lights
    if (e.key === 'l' || e.key === 'L' || e.key === 'д' || e.key === 'Д') {
      setLights(!state.lightsOn);
    }
    // B: toggle background theme (White / Black Studio)
    if (e.key === 'b' || e.key === 'B' || e.key === 'и' || e.key === 'И') {
      toggleBgTheme();
    }
    // D: toggle doors
    if (e.key === 'd' || e.key === 'D' || e.key === 'в' || e.key === 'В') {
      if (btnDoors) btnDoors.click();
    }
    // A: toggle turntable
    if (e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф') {
      if (btnRotate) btnRotate.click();
    }
    // S: snapshot
    if (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы') {
      captureSnapshot();
    }
    // H: toggle hotspots
    if (e.key === 'h' || e.key === 'H' || e.key === 'р' || e.key === 'Р') {
      if (btnHotspots) btnHotspots.click();
    }
    // U or Z: toggle Zen Clean View
    if (e.key === 'u' || e.key === 'U' || e.key === 'z' || e.key === 'Z' || e.key === 'г' || e.key === 'Г' || e.key === 'я' || e.key === 'Я') {
      setZenMode(!state.zenMode);
    }
    // Esc: close modals or exit Zen Mode
    if (e.key === 'Escape') {
      if (state.zenMode) {
        setZenMode(false);
      }
      popoverPaint?.classList.remove('active');
      popoverLighting?.classList.remove('active');
      btnOpenPaint?.classList.remove('active');
      btnOpenLighting?.classList.remove('active');
      document.getElementById('hotspot-modal')?.classList.remove('active');
      document.getElementById('specs-drawer')?.classList.remove('active');
      document.getElementById('engine-drawer')?.classList.remove('active');
      document.getElementById('nav-btn-sound')?.classList.remove('active');
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
      state.throttlePressed = false;
      const btnTh = document.getElementById('btn-throttle');
      if (btnTh) btnTh.classList.remove('pressing');
      e.preventDefault();
    }
  });

  // Render initial specs content
  renderSpecsDrawerContent();
}

// --- WINDOW RESIZE ---
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// --- MAIN RENDER LOOP ---
let lastFrameTime = performance.now();

function animate(currentTime = performance.now()) {
  requestAnimationFrame(animate);

  const delta = Math.min((currentTime - lastFrameTime) / 1000, 0.1);
  lastFrameTime = currentTime;

  // 1. Smooth Camera Interpolation ONLY when transitioning between presets
  if (isTransitioningCamera) {
    camera.position.lerp(camTargetPos, delta * 3.8);
    controls.target.lerp(camTargetLook, delta * 3.8);

    if (camera.position.distanceTo(camTargetPos) < 0.02 && controls.target.distanceTo(camTargetLook) < 0.02) {
      camera.position.copy(camTargetPos);
      controls.target.copy(camTargetLook);
      isTransitioningCamera = false;
    }
  }

  // 2. Auto-Turntable Rotation
  if (state.autoRotate) {
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
  } else {
    controls.autoRotate = false;
  }

  controls.update();

  // 3. Smooth Doors Animation
  updateDoorAnimation(delta);

  // 3b. Dynamic Headlamp Optical Lens Flare based on Camera Angle
  if (state.lightsOn && headlightFlares.length > 0) {
    const carFwd = new THREE.Vector3(0, 0, 1);
    headlightFlares.forEach((flare) => {
      const dirToCam = new THREE.Vector3().subVectors(camera.position, flare.position).normalize();
      const dot = dirToCam.dot(carFwd); // Facing front of headlights
      if (dot > 0.05) {
        flare.visible = true;
        const glare = Math.pow(dot, 1.4);
        const scaleVal = THREE.MathUtils.lerp(0.35, 1.25, glare);
        flare.scale.set(scaleVal, scaleVal, 1);
        flare.material.opacity = Math.min(1.0, glare * 1.35);
      } else {
        flare.visible = false;
      }
    });
  }

  // 4. Update Engine Simulator & Sound
  updateEngineSound(delta);

  // 5. Update 3D Hotspot Pins Position
  updateHotspots();

  // 6. Render 3D Frame
  renderer.render(scene, camera);
}

// Boot application
init();
