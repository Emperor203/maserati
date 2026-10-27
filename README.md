# Maserati Tipo 151/3 (1964) — 3D Interactive WebGL Showcase

Interactive 3D WebGL web application showcasing the legendary **Maserati Tipo 151/3 (1964)** endurance race car (Chassis #151.003, Team Maserati France, Le Mans 24 Hours).

Built with **Three.js**, vanilla JavaScript, custom PBR shaders, and the **Web Audio API**.

---

## 🌟 Key Features

- **Photorealistic 3D Model**:
  - High-detail model of the 1964 Maserati Tipo 151/3 with Drogo "Coda Tronca" (Kamm-tail) aerodynamic coachwork.
  - Realistic PBR materials (clearcoat lacquer paint, mirror chrome, crystal glass, wooden Nardi steering wheel, Borrani wire wheels).
- **Interactive Body Mechanics**:
  - 🚪 Animated opening and closing driver & passenger doors.
  - 💡 Working headlights with optical lens flares (*Lens Bloom*) and rear glowing taillights.
  - 🔄 360° Turntable Auto-Rotation mode.
  - 📷 High-Resolution 4K Snapshot capture tool (instant PNG render download).
- **Color & Finish Studio**:
  - 7 authentic historic racing finishes: *1964 Le Mans Blue (#1)*, *Rosso Corsa*, *Argento Competizione*, *Nero Notte*, *Giallo Modena*, *Bianco Polare*, *Verde Scuderia*.
  - Finish types: Gloss Lacquer, Satin Matte, Metallic Flake.
- **Atmospheric Studio Lighting**:
  - *Monza Night* (moody high-contrast dark studio)
  - *Le Mans Sunset* (warm golden hour glow)
  - *Showroom Studio* (clean neutral daylight)
  - *Cyber Neon* (neon track reflections)
- **Sound Simulator (Web Audio API)**:
  - Fully synthesized 430-hp 90° cross-plane V8 engine sound (no external MP3 needed!).
  - Ignition starter sequence, 900 RPM idle rumble, and throttle revs up to 7,500 RPM with exhaust overrun crackles.
  - Working analog SVG tachometer gauge.
- **Minimalist Zen Mode (Только авто)**:
  - One-click button (`U` key or eye icon) to hide all UI elements for an uninterrupted full-screen view.
- **Historical Heritage & Specs**:
  - Complete engineering dossier and historical narrative (Maurice Trintignant, Johnny Simone, Giulio Alfieri, Piero Drogo).
  - Multi-language support (English / Russian).

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Quick Run
1. Double-click `start.bat` on Windows, **OR** run in terminal:
```bash
npm start
```
2. Open your browser at:
```
http://localhost:3000
```

---

## 🎮 Controls & Shortcuts

| Action | Control |
|---|---|
| **Rotate 360°** | Left Mouse Button (Drag) / Touch |
| **Zoom** | Mouse Scroll / Pinch |
| **Pan** | Right Mouse Button / 2 fingers |
| **Rev Engine** | Hold `[Spacebar]` |
| **Toggle Lights** | `[L]` key |
| **Toggle Doors** | `[D]` key |
| **Auto-Rotate** | `[A]` key |
| **Zen Mode (Clean View)** | `[U]` key |
| **Take Snapshot** | `[S]` key |
| **Exit / Close** | `[Esc]` key |

---

## 🛠️ Built With
- [Three.js](https://threejs.org/) (r180)
- Vanilla JavaScript (ES Modules)
- Modern CSS with Glassmorphism
- Web Audio API (Synthesized V8 audio)
