import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// ════════════════════════════════════════════════════════
//  3D AVATAR — built entirely with Three.js primitives
//  No external model needed. Runs in-browser.
// ════════════════════════════════════════════════════════
function Avatar3D({ isSpeaking, isListening }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ speaking: false, listening: false });

  useEffect(() => {
    stateRef.current.speaking = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    stateRef.current.listening = isListening;
  }, [isListening]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 1.3, 4.8);
    camera.lookAt(0, 1.2, 0);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xaabbff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(2, 5, 4); key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4488ff, 0.6);
    fill.position.set(-3, 2, 3); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffd700, 0.5);
    rim.position.set(0, 4, -5); scene.add(rim);

    // ── Materials ──
    const mat = (color, shine = 30, opts = {}) =>
      new THREE.MeshPhongMaterial({ color, shininess: shine, ...opts });
    const skinM    = mat(0xd4956a, 30);
    const darkSkin = mat(0xb87848, 20);
    const hairM    = mat(0x180800, 10);
    const uniformM = mat(0x0d2d52, 50);
    const goldM    = mat(0xc5a028, 150);
    const whiteM   = mat(0xffffff, 10);
    const eyeM     = mat(0x100500, 200);
    const eyeWM    = mat(0xf8f4ee, 20);
    const lipM     = mat(0x8b3a3a, 60);
    const teethM   = mat(0xfffae0, 20);
    const glassM   = mat(0x88aacc, 200, { transparent: true, opacity: 0.45 });
    const glassFrM = mat(0x1a1a1a, 120);

    const add = (geo, material, parent, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => {
      const m = new THREE.Mesh(geo, material);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      m.scale.set(sx, sy, sz);
      m.castShadow = true;
      parent.add(m);
      return m;
    };

    const root = new THREE.Group();
    scene.add(root);

    // ═══ TORSO ═══
    add(new THREE.CylinderGeometry(0.40, 0.34, 1.15, 20), uniformM, root, 0, 0.1, 0);
    // White shirt collar
    add(new THREE.CylinderGeometry(0.14, 0.14, 0.30, 16), whiteM, root, 0, 0.74, 0.06);
    // Tie
    add(new THREE.BoxGeometry(0.07, 0.54, 0.05), mat(0xbb1111, 40), root, 0, 0.38, 0.30);
    // Buttons
    for (let i = 0; i < 3; i++) {
      add(new THREE.SphereGeometry(0.018, 8, 8), goldM, root, 0, 0.6 - i * 0.15, 0.31);
    }
    // Badge
    add(new THREE.BoxGeometry(0.19, 0.11, 0.03), goldM, root, -0.19, 0.44, 0.32);

    // Medals
    [-0.08, 0.04, 0.16].forEach((x, i) => {
      add(new THREE.CylinderGeometry(0.033, 0.033, 0.016, 16), goldM, root, 0.16 + x, 0.50 - i * 0.05, 0.31);
    });

    // Arms
    [-1, 1].forEach((s) => {
      add(new THREE.SphereGeometry(0.19, 12, 12), uniformM, root, s * 0.48, 0.64, 0);
      const uarm = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.58, 12), uniformM);
      uarm.position.set(s * 0.54, 0.28, 0);
      uarm.rotation.z = s * 0.22;
      root.add(uarm);
      add(new THREE.CylinderGeometry(0.10, 0.09, 0.52, 12), skinM, root, s * 0.59, -0.14, 0.10);
      add(new THREE.SphereGeometry(0.11, 12, 12), skinM, root, s * 0.60, -0.43, 0.12);
      // Epaulette
      add(new THREE.BoxGeometry(0.21, 0.045, 0.19), goldM, root, s * 0.47, 0.77, 0);
    });

    // ═══ NECK ═══
    add(new THREE.CylinderGeometry(0.11, 0.14, 0.24, 16), skinM, root, 0, 0.87, 0);

    // ═══ HEAD GROUP ═══
    const headG = new THREE.Group();
    headG.position.set(0, 1.08, 0);
    root.add(headG);

    // Head
    const headMesh = add(new THREE.SphereGeometry(0.43, 32, 32), skinM, headG, 0, 0, 0, 0, 0, 0, 1, 1.13, 0.96);

    // Ears
    [-1, 1].forEach((s) => {
      add(new THREE.SphereGeometry(0.09, 16, 16), darkSkin, headG, s * 0.43, -0.02, 0, 0, 0, 0, 0.6, 1.0, 0.6);
    });

    // ── Hair ──
    add(new THREE.SphereGeometry(0.45, 32, 32), hairM, headG, 0, 0.14, -0.05, 0, 0, 0, 1, 0.68, 1);
    [-1, 1].forEach((s) => {
      add(new THREE.SphereGeometry(0.30, 16, 16), hairM, headG, s * 0.36, 0.0, 0, 0, 0, 0, 0.48, 0.92, 0.8);
    });
    // Sideburns
    [-1, 1].forEach((s) => {
      add(new THREE.BoxGeometry(0.08, 0.25, 0.05), hairM, headG, s * 0.42, -0.18, 0.25);
    });

    // ── Eyebrows ──
    [-1, 1].forEach((s) => {
      add(new THREE.BoxGeometry(0.19, 0.028, 0.045), hairM, headG, s * 0.17, 0.20, 0.38, 0, 0, s * -0.08);
    });

    // ── Eyes ──
    const eyes = [];
    [-0.17, 0.17].forEach((x) => {
      const eg = new THREE.Group();
      eg.position.set(x, 0.09, 0.37);
      add(new THREE.SphereGeometry(0.095, 16, 16), eyeWM, eg, 0, 0, 0, 0, 0, 0, 1, 0.72, 0.72);
      add(new THREE.SphereGeometry(0.058, 16, 16), eyeM, eg, 0, 0, 0.06);
      add(new THREE.SphereGeometry(0.022, 8, 8), whiteM, eg, 0.022, 0.022, 0.11);
      headG.add(eg);
      eyes.push(eg);
    });

    // ── Nose ──
    add(new THREE.SphereGeometry(0.075, 12, 12), darkSkin, headG, 0, -0.05, 0.42, 0, 0, 0, 0.82, 0.72, 0.92);
    [-1, 1].forEach((s) => {
      add(new THREE.SphereGeometry(0.032, 8, 8), mat(0x8b5e3c, 10), headG, s * 0.058, -0.10, 0.41);
    });

    // ── Mouth group ──
    const mouthG = new THREE.Group();
    mouthG.position.set(0, -0.175, 0.40);
    headG.add(mouthG);
    const upperLip = add(new THREE.SphereGeometry(0.10, 16, 8), lipM, mouthG, 0, 0.020, 0, 0, 0, 0, 1.12, 0.42, 0.52);
    const lowerLip = add(new THREE.SphereGeometry(0.10, 16, 8), lipM, mouthG, 0, -0.024, 0, 0, 0, 0, 1.22, 0.46, 0.56);
    const teeth    = add(new THREE.BoxGeometry(0.14, 0.04, 0.03), teethM, mouthG, 0, 0, 0.04);
    teeth.visible = false;

    // ── Glasses ──
    [-0.17, 0.17].forEach((x) => {
      const torus = new THREE.TorusGeometry(0.105, 0.013, 8, 40);
      const fr = new THREE.Mesh(torus, glassFrM);
      fr.position.set(x, 0.09, 0.39);
      fr.scale.set(1, 0.76, 0.42);
      headG.add(fr);
      add(new THREE.CircleGeometry(0.10, 32), glassM, headG, x, 0.09, 0.392, 0, 0, 0, 1, 0.76, 1);
    });
    // Bridge
    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.1, 8), glassFrM);
    bridge.position.set(0, 0.09, 0.392); bridge.rotation.z = Math.PI / 2;
    headG.add(bridge);

    // ── Cap ──
    add(new THREE.CylinderGeometry(0.54, 0.54, 0.045, 40), uniformM, headG, 0, 0.36, 0);
    add(new THREE.CylinderGeometry(0.37, 0.45, 0.30, 40), uniformM, headG, 0, 0.49, 0);
    add(new THREE.CylinderGeometry(0.452, 0.452, 0.052, 40), goldM, headG, 0, 0.36, 0);
    // Cap emblem star
    add(new THREE.SphereGeometry(0.072, 16, 16), goldM, headG, 0, 0.37, 0.45, 0, 0, 0, 1, 0.52, 0.32);

    // ═══ PLATFORM ═══
    add(new THREE.CylinderGeometry(0.65, 0.75, 0.065, 40), mat(0x0a2a4a, 200, { transparent: true, opacity: 0.75 }), root, 0, -0.95, 0);
    const pRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.027, 8, 80), goldM);
    pRing.position.y = -0.92; pRing.rotation.x = Math.PI / 2;
    root.add(pRing);

    // ═══ HOLOGRAPHIC RINGS ═══
    const holoRings = [];
    [[0.90, 0x00aaff, Math.PI / 2, 0],
     [1.10, 0xc5a028, Math.PI / 3, 1],
     [1.36, 0x00ff88, Math.PI / 4, 2]].forEach(([r, col, rx, i]) => {
      const rg = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.009, 6, 90),
        mat(col, 200, { transparent: true, opacity: 0.55 })
      );
      rg.rotation.x = rx; scene.add(rg);
      holoRings.push(rg);
    });

    // ═══ PARTICLES ═══
    const PCOUNT = 140;
    const pPos = new Float32Array(PCOUNT * 3);
    const pSpd = [];
    for (let i = 0; i < PCOUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.25 + Math.random() * 1.3;
      pPos[i * 3] = Math.cos(a) * r;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pPos[i * 3 + 2] = Math.sin(a) * r;
      pSpd.push(0.002 + Math.random() * 0.005);
    }
    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0x4488ff, size: 0.028, transparent: true, opacity: 0.75 }));
    scene.add(particles);

    // ═══ ANIMATE ═══
    let t = 0, animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.016;

      const { speaking, listening } = stateRef.current;

      // Body idle sway
      root.rotation.y = Math.sin(t * 0.38) * 0.07;
      root.position.y = Math.sin(t * 0.65) * 0.032;

      // Head subtle movement
      headG.rotation.y = Math.sin(t * 0.28) * 0.09;
      headG.rotation.x = Math.sin(t * 0.48) * 0.05;

      // Blink
      const bv = Math.sin(t * 0.85);
      const blinkScale = bv > 0.965 ? Math.max(0.05, 1 - (bv - 0.965) / 0.035) : 1;
      eyes.forEach((e) => { e.scale.y = blinkScale; });

      // Talking mouth
      if (speaking) {
        const open = Math.abs(Math.sin(t * 13)) * 0.5 + Math.abs(Math.sin(t * 8.7)) * 0.3;
        upperLip.position.y = 0.020 + open * 0.045;
        lowerLip.position.y = -0.024 - open * 0.075;
        teeth.visible = open > 0.18;
        root.position.y += Math.sin(t * 16) * 0.005;
      } else {
        upperLip.position.y = 0.020;
        lowerLip.position.y = -0.024;
        teeth.visible = false;
      }

      // Listening pulse
      root.scale.setScalar(listening ? 1 + Math.sin(t * 8) * 0.012 : 1);

      // Holo rings
      holoRings.forEach((r, i) => {
        r.rotation.z += [0.009, -0.006, 0.007][i];
        r.rotation.y += [0.003, 0.008, -0.005][i];
        r.material.opacity = 0.4 + Math.sin(t * 2 + i * 1.5) * 0.22;
        if (speaking) r.material.opacity = Math.min(1, r.material.opacity + 0.25);
      });

      // Particles orbit
      const pa = pgeo.attributes.position;
      for (let i = 0; i < PCOUNT; i++) {
        const angle = Math.atan2(pPos[i * 3 + 2], pPos[i * 3]) + pSpd[i];
        const rad = Math.sqrt(pPos[i * 3] ** 2 + pPos[i * 3 + 2] ** 2);
        pPos[i * 3] = Math.cos(angle) * rad;
        pPos[i * 3 + 2] = Math.sin(angle) * rad;
        pPos[i * 3 + 1] += 0.006;
        if (pPos[i * 3 + 1] > 2.8) pPos[i * 3 + 1] = -1.8;
      }
      pa.array.set(pPos);
      pa.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const W2 = container.clientWidth, H2 = container.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", borderRadius: 20 }} />;
}

// ════════════════════════════════════════════════════════
//  WAVEFORM
// ════════════════════════════════════════════════════════
function Waveform({ active, color = "#00aaff" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 36, justifyContent: "center" }}>
      {Array.from({ length: 26 }).map((_, i) => (
        <div key={i} style={{
          width: 3.5, borderRadius: 2,
          background: `linear-gradient(to top, ${color}44, ${color})`,
          height: active ? undefined : 4,
          animation: active ? `waveBar ${0.4 + (i % 6) * 0.1}s ease-in-out infinite alternate` : "none",
          minHeight: 4, maxHeight: 30,
        }} />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  MAIN APP
// ════════════════════════════════════════════════════════
export default function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([{
    sender: "bot",
    text: "Namaste! 🙏 I am your AI Digital Government Officer. I can help you with scholarships, pensions, ration cards, land records, birth certificates, employment schemes, and all e-governance services. How may I assist you today?",
  }]);
  const [language, setLanguage] = useState("en-IN");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("ready");
  const msgEndRef = useRef(null);

  useEffect(() => { msgEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const speak = useCallback((msg) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(msg);
    u.lang = language; u.rate = 0.92; u.pitch = 1.0;
    setIsSpeaking(true); setStatus("speaking");
    u.onend = () => { setIsSpeaking(false); setStatus("ready"); };
    u.onerror = () => { setIsSpeaking(false); setStatus("ready"); };
    window.speechSynthesis.speak(u);
  }, [language]);

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Speech recognition not supported. Please use Chrome.");
    const rec = new SR();
    rec.lang = language; rec.start();
    setIsListening(true); setStatus("listening");
    rec.onresult = (e) => {
      const v = e.results[0][0].transcript;
      setIsListening(false);
      setText(v);
      handleSend(v);
    };
    rec.onerror = () => { setIsListening(false); setStatus("ready"); };
    rec.onend = () => setIsListening(false);
  };

  const handleSend = useCallback(async (custom) => {
    const msg = (custom || text).trim();
    if (!msg) return;
    setText("");
    setMessages((p) => [...p, { sender: "user", text: msg }]);
    setIsLoading(true); setStatus("thinking");
    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { sender: "bot", text: data.reply }]);
      speak(data.reply);
    } catch {
      const err = "Unable to connect. Please ensure the server is running at localhost:5000.";
      setMessages((p) => [...p, { sender: "bot", text: err }]);
      speak(err);
    }
    setIsLoading(false);
  }, [text, speak]);

  const quickQ = [
    "📚 Scholarship apply",
    "🧓 Pension status",
    "🪪 Ration card",
    "📄 Birth certificate",
    "🏠 Land records",
    "💼 MGNREGA scheme",
  ];

  const sc = {
    ready:     { color: "#4A90D9", text: "Ready to assist" },
    speaking:  { color: "#00FF88", text: "Officer speaking..." },
    listening: { color: "#FF6B35", text: "Listening..." },
    thinking:  { color: "#C5A028", text: "Processing query..." },
  }[status];

  return (
    <>
      <style>{CSS}</style>
      <div className="root">
        <div className="bg-grid" />
        <div className="bg-glow g1" /><div className="bg-glow g2" /><div className="bg-glow g3" />

        {/* HEADER */}
        <header className="header">
          <div className="hl">
            <span className="flag">🇮🇳</span>
            <div>
              <div className="site-title">AI DIGITAL OFFICER</div>
              <div className="site-sub">e-Governance Portal · Digital India · MeitY</div>
            </div>
          </div>
          <div className="hr">
            <div className="live-badge"><span className="live-dot" />LIVE SESSION</div>
            <select className="lang-sel" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en-IN">🇬🇧 English</option>
              <option value="hi-IN">🇮🇳 हिंदी</option>
              <option value="ta-IN">தமிழ்</option>
              <option value="te-IN">తెలుగు</option>
              <option value="bn-IN">বাংলা</option>
              <option value="mr-IN">मराठी</option>
            </select>
          </div>
        </header>

        {/* MAIN */}
        <main className="main">

          {/* LEFT — 3D Avatar */}
          <section className="av-panel">
            <div className="av-frame" style={{ boxShadow: `0 0 40px ${sc.color}33, inset 0 0 20px rgba(0,0,0,0.6)` }}>
              <Avatar3D isSpeaking={isSpeaking} isListening={isListening} />
            </div>

            <div className="nameplate">
              <div className="np-title">OFFICER RAJIV SHARMA IAS</div>
              <div className="np-sub">Senior Digital Officer · e-Governance Division</div>
            </div>

            <div className="status-row">
              <div className="s-dot" style={{ background: sc.color, boxShadow: `0 0 8px ${sc.color}` }} />
              <span className="s-txt">{sc.text}</span>
            </div>

            <Waveform active={isSpeaking || isListening} color={sc.color} />

            <div className="quick-wrap">
              <div className="quick-lbl">QUICK QUERIES</div>
              <div className="quick-grid">
                {quickQ.map((q) => (
                  <button key={q} className="qbtn" onClick={() => handleSend(q.slice(2))}>{q}</button>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT — Chat */}
          <section className="chat-panel">
            <div className="chat-hdr">
              <div>
                <div className="chat-title">Conversation</div>
                <div className="chat-sub">Ask anything about government services</div>
              </div>
              <button className="clear-btn" onClick={() => setMessages([])}>✕ Clear</button>
            </div>

            <div className="msgs">
              {messages.map((m, i) => (
                <div key={i} className={`row ${m.sender}`}>
                  {m.sender === "bot" && <div className="av-icon">🤖</div>}
                  <div className={`bubble ${m.sender}`}>{m.text}</div>
                  {m.sender === "user" && <div className="av-icon user">👤</div>}
                </div>
              ))}
              {isLoading && (
                <div className="row bot">
                  <div className="av-icon">🤖</div>
                  <div className="bubble bot">
                    <span className="d" /><span className="d" /><span className="d" />
                  </div>
                </div>
              )}
              <div ref={msgEndRef} />
            </div>

            <div className="inp-area">
              <input
                className="inp"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your query or press 🎤 to speak..."
              />
              <button
                className={`ibtn mic ${isListening ? "on" : ""}`}
                onClick={startListening}
                title="Voice Input"
              >🎤</button>
              <button className="ibtn send" onClick={() => handleSend()} title="Send">➤</button>
            </div>
          </section>
        </main>

        <footer className="foot">
          <span>© 2025 Government of India · Ministry of Electronics &amp; Information Technology</span>
          <span style={{ opacity: 0.4 }}>Powered by AI · Digital India</span>
        </footer>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════
//  CSS
// ════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#030B18;overflow:hidden;}

.root{
  height:100vh;min-height:100vh;background:#030B18;color:#dde8f8;
  font-family:'Rajdhani','Trebuchet MS',sans-serif;
  display:flex;flex-direction:column;overflow:hidden;position:relative;
}

/* BG */
.bg-grid{
  position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    linear-gradient(rgba(0,120,255,0.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,120,255,0.05) 1px,transparent 1px);
  background-size:48px 48px;
}
.bg-glow{position:fixed;border-radius:50%;pointer-events:none;z-index:0;animation:gp 7s ease-in-out infinite alternate;}
.g1{width:700px;height:700px;top:-250px;left:-200px;background:radial-gradient(circle,rgba(0,80,200,0.15) 0%,transparent 70%);}
.g2{width:600px;height:600px;bottom:-200px;right:-150px;background:radial-gradient(circle,rgba(197,160,40,0.11) 0%,transparent 70%);animation-delay:2.5s;}
.g3{width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(0,200,150,0.06) 0%,transparent 70%);animation-delay:5s;}

/* HEADER */
.header{
  display:flex;justify-content:space-between;align-items:center;
  padding:11px 28px;border-bottom:1px solid rgba(0,100,200,0.22);
  background:rgba(3,11,24,0.92);backdrop-filter:blur(16px);
  position:relative;z-index:20;
}
.hl{display:flex;align-items:center;gap:14px;}
.flag{font-size:30px;}
.site-title{font-family:'Orbitron',monospace;font-size:15px;font-weight:700;letter-spacing:3px;color:#C5A028;}
.site-sub{font-size:10.5px;color:#3A5A7A;letter-spacing:1px;margin-top:2px;}
.hr{display:flex;align-items:center;gap:14px;}
.live-badge{
  display:flex;align-items:center;gap:7px;border:1px solid rgba(0,255,136,0.35);
  border-radius:20px;padding:5px 14px;font-size:11px;letter-spacing:2px;color:#00FF88;
  font-family:'Orbitron',monospace;
}
.live-dot{width:8px;height:8px;background:#00FF88;border-radius:50%;animation:lp 1.3s infinite;box-shadow:0 0 6px #00FF88;}
.lang-sel{
  background:rgba(10,30,60,0.85);border:1px solid rgba(197,160,40,0.4);
  color:#dde8f8;padding:7px 12px;border-radius:8px;font-size:13px;
  cursor:pointer;outline:none;font-family:'Rajdhani',sans-serif;
}

/* MAIN */
.main{
  flex:1;display:flex;gap:0;overflow:hidden;
  padding:18px 26px;position:relative;z-index:5;
  max-width:1400px;margin:0 auto;width:100%;
}

/* AVATAR PANEL */
.av-panel{
  width:295px;min-width:275px;display:flex;flex-direction:column;
  align-items:center;gap:11px;padding-right:22px;
  border-right:1px solid rgba(0,80,180,0.2);
}
.av-frame{
  width:262px;height:306px;border-radius:20px;overflow:hidden;
  background:rgba(5,15,35,0.65);border:1px solid rgba(0,100,200,0.28);
  transition:box-shadow 0.5s;
}
.nameplate{
  text-align:center;width:100%;
  background:linear-gradient(135deg,rgba(0,80,160,0.28),rgba(197,160,40,0.1));
  border:1px solid rgba(197,160,40,0.28);border-radius:10px;padding:9px 14px;
}
.np-title{font-family:'Orbitron',monospace;font-size:10.5px;color:#C5A028;letter-spacing:2px;}
.np-sub{font-size:10.5px;color:#3A5A7A;margin-top:3px;letter-spacing:0.8px;}
.status-row{display:flex;align-items:center;gap:8px;}
.s-dot{width:10px;height:10px;border-radius:50%;transition:all 0.4s;}
.s-txt{font-size:12.5px;color:#6A8AB0;letter-spacing:1px;}

.quick-wrap{width:100%;}
.quick-lbl{font-size:9.5px;letter-spacing:2px;color:#2A4A6A;margin-bottom:7px;font-family:'Orbitron',monospace;}
.quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.qbtn{
  background:rgba(0,60,140,0.18);border:1px solid rgba(0,80,160,0.32);
  color:#7AAAC8;padding:8px 9px;border-radius:8px;cursor:pointer;
  font-size:11px;text-align:left;transition:all 0.2s;
  font-family:'Rajdhani',sans-serif;letter-spacing:0.2px;
}
.qbtn:hover{background:rgba(0,80,160,0.32);color:#C0D8F0;border-color:rgba(197,160,40,0.4);}

/* CHAT */
.chat-panel{flex:1;display:flex;flex-direction:column;padding-left:22px;gap:0;overflow:hidden;}
.chat-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:13px;}
.chat-title{font-family:'Orbitron',monospace;font-size:14px;color:#5A88C0;letter-spacing:2px;}
.chat-sub{font-size:11.5px;color:#2A4A6A;margin-top:3px;}
.clear-btn{
  background:rgba(200,30,30,0.14);border:1px solid rgba(200,30,30,0.3);
  color:#ff6060;padding:6px 13px;border-radius:8px;cursor:pointer;
  font-size:12px;font-family:'Rajdhani',sans-serif;letter-spacing:1px;
}
.clear-btn:hover{background:rgba(200,30,30,0.28);}

.msgs{
  flex:1;overflow-y:auto;display:flex;flex-direction:column;
  gap:13px;padding-right:6px;margin-bottom:15px;
}
.msgs::-webkit-scrollbar{width:4px;}
.msgs::-webkit-scrollbar-track{background:rgba(5,15,35,0.5);}
.msgs::-webkit-scrollbar-thumb{background:rgba(0,80,160,0.4);border-radius:2px;}

.row{display:flex;align-items:flex-start;gap:10px;}
.row.user{justify-content:flex-end;}
.av-icon{
  width:33px;height:33px;border-radius:50%;flex-shrink:0;
  background:rgba(0,70,140,0.5);border:1px solid rgba(197,160,40,0.32);
  display:flex;align-items:center;justify-content:center;font-size:15px;
}
.av-icon.user{background:rgba(30,50,80,0.6);border-color:rgba(80,120,200,0.28);}

.bubble{
  padding:11px 15px;max-width:76%;font-size:14px;line-height:1.65;
  box-shadow:0 4px 18px rgba(0,0,0,0.35);
}
.bubble.bot{
  background:linear-gradient(135deg,rgba(0,70,140,0.28),rgba(3,20,50,0.72));
  border:1px solid rgba(0,100,200,0.32);color:#B8D0F0;
  border-radius:4px 16px 16px 16px;
}
.bubble.user{
  background:linear-gradient(135deg,rgba(197,160,40,0.18),rgba(30,50,80,0.62));
  border:1px solid rgba(197,160,40,0.28);color:#E8DFA0;
  border-radius:16px 4px 16px 16px;
}
.d{
  display:inline-block;width:8px;height:8px;border-radius:50%;
  background:#4488ff;margin:0 3px;
  animation:tb 1s ease-in-out infinite;
}
.d:nth-child(2){animation-delay:0.2s;}
.d:nth-child(3){animation-delay:0.4s;}

/* INPUT */
.inp-area{display:flex;gap:10px;padding-top:13px;border-top:1px solid rgba(0,80,160,0.18);}
.inp{
  flex:1;background:rgba(5,20,50,0.82);border:1px solid rgba(0,100,200,0.38);
  color:#dde8f8;padding:12px 17px;border-radius:10px;font-size:14px;
  outline:none;font-family:'Rajdhani',sans-serif;transition:border-color 0.2s;
}
.inp:focus{border-color:rgba(197,160,40,0.58);}
.inp::placeholder{color:#2A4A6A;}
.ibtn{
  width:48px;height:48px;border-radius:10px;border:none;cursor:pointer;
  font-size:18px;display:flex;align-items:center;justify-content:center;
  transition:all 0.2s;flex-shrink:0;
}
.ibtn.mic{background:rgba(0,60,140,0.72);border:1px solid rgba(0,100,200,0.4);color:white;}
.ibtn.mic.on{background:rgba(255,80,30,0.85);animation:mp 0.7s infinite alternate;}
.ibtn.send{background:linear-gradient(135deg,#0a4fa2,#062a58);border:1px solid rgba(197,160,40,0.35);color:#C5A028;}
.ibtn:hover{filter:brightness(1.25);transform:scale(1.05);}

/* FOOTER */
.foot{
  display:flex;justify-content:space-between;padding:9px 28px;
  border-top:1px solid rgba(0,80,160,0.13);font-size:11px;
  color:#1E3A5A;letter-spacing:0.5px;position:relative;z-index:10;
}

/* KEYFRAMES */
@keyframes gp{0%{opacity:0.55;}100%{opacity:1;}}
@keyframes lp{0%,100%{opacity:1;}50%{opacity:0.25;}}
@keyframes waveBar{0%{height:4px;}100%{height:28px;}}
@keyframes tb{0%,80%,100%{transform:translateY(0);opacity:0.4;}40%{transform:translateY(-8px);opacity:1;}}
@keyframes mp{0%{box-shadow:0 0 0 0 rgba(255,80,30,0.7);}100%{box-shadow:0 0 0 12px rgba(255,80,30,0);}}
`;