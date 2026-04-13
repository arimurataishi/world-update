import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Rocket, Globe, Zap, Heart, Droplets, ShoppingCart, TreeDeciduous, Baby, 
  Star, Volume2, VolumeX, Sun, Utensils, Waves, CloudRain, Milestone, 
  Smartphone, Mail, Search, Camera, Coffee, Flame, Wind, PenTool, 
  Lightbulb, Truck, Apple, Fish, BookOpen, Users, Gem, Battery, Anchor, 
  Compass, Activity, Thermometer, Microscope, Infinity, Mountain
} from 'lucide-react';

// ==========================================
// 音声ファイルを直接インポート（これが一番確実です）
// ==========================================
import worldBGM from './world-update_M.wav';

const AUDIO_CONFIG = {
  bgmSource: worldBGM, 
  bgmVolume: 0.5
};

const FACTS = [
  { text: "世界中で約88万kWhの電力が新たに発電されました。", icon: (s) => <Zap size={s} /> },
  { text: "天の川銀河が宇宙空間を約600km移動しました。", icon: (s) => <Infinity size={s} /> },
  { text: "地球の自転により赤道上の地点が約460メートル移動しました。", icon: (s) => <Globe size={s} /> },
  { text: "ハワイが日本に約2.5ナノメートル近づきました。", icon: (s) => <Mountain size={s} /> },
  { text: "南極の氷が新たに約4,800トン溶けて海に流れ出しました。", icon: (s) => <Droplets size={s} /> },
  { text: "宇宙の空間が新たに約67km膨張しました。", icon: (s) => <Rocket size={s} /> },
  { text: "地球が太陽の周りを約30km移動しました。", icon: (s) => <Globe size={s} /> },
  { text: "地球に約1,700兆ジュールの太陽光が届きました。", icon: (s) => <Sun size={s} /> },
  { text: "宇宙で約6,000個の星が誕生しました。", icon: (s) => <Star size={s} /> },
  { text: "太陽から約10億kgのプラズマが放出されました。", icon: (s) => <Zap size={s} /> },
  { text: "月が地球から約1.2ナノメートル遠ざかりました。", icon: (s) => <Milestone size={s} /> },
  { text: "1京個の素粒子が宇宙から地球へ降り注ぎました。", icon: (s) => <Activity size={s} /> },
  { text: "太陽で6億トンの水素がヘリウムに変わりました。", icon: (s) => <Flame size={s} /> },
  { text: "宇宙を漂う彗星が約15kmの距離を旅しました。", icon: (s) => <Rocket size={s} /> },
  { text: "10個の新しい星系が宇宙のどこかで形成されました。", icon: (s) => <Star size={s} /> },
  { text: "アンドロメダ銀河が110km地球に近づきました。", icon: (s) => <Milestone size={s} /> },
  { text: "世界の海から約1,600万トンの水が蒸発しました。", icon: (s) => <Droplets size={s} /> },
  { text: "地球上のどこかで約100回の落雷が発生しました。", icon: (s) => <Zap size={s} /> },
  { text: "世界の植物が約1,000トンの酸素を放出しました。", icon: (s) => <TreeDeciduous size={s} /> },
  { text: "世界の川から海へ100万立米の水が流れました。", icon: (s) => <Waves size={s} /> },
  { text: "地球全体で1,000兆個の雨粒が地面に届きました。", icon: (s) => <CloudRain size={s} /> },
  { text: "太平洋のプレートが2ナノメートル移動しました。", icon: (s) => <Mountain size={s} /> },
  { text: "地球全体で約1,200トンの雨が降り注ぎました。", icon: (s) => <CloudRain size={s} /> },
  { text: "世界の樹木が2,000トンの二酸化炭素材を吸いました。", icon: (s) => <TreeDeciduous size={s} /> },
  { text: "砂漠の砂が風に乗って約20トン移動しました。", icon: (s) => <Wind size={s} /> },
  { text: "地球の大気が300兆kcalの熱を運びました。", icon: (s) => <Thermometer size={s} /> },
  { text: "深海で10トンの熱水が地底から噴き出しました。", icon: (s) => <Activity size={s} /> },
  { text: "火山から1,000kgの火山ガスが噴出しました。", icon: (s) => <Flame size={s} /> },
  { text: "世界中で4.3人の新しい命が誕生しました。", icon: (s) => <Baby size={s} /> },
  { text: "ヒトの体内で約200万個の赤血球が作られました。", icon: (s) => <Heart size={s} /> },
  { text: "世界中の鶏が合計で1.5万個の卵を産みました。", icon: (s) => <Utensils size={s} /> },
  { text: "世界中で約2万杯のコーヒーが淹れられました。", icon: (s) => <Coffee size={s} /> },
  { text: "SNSで約100万件の「いいね」が押されました。", icon: (s) => <Heart size={s} /> },
  { text: "Googleで10万件の検索が新しく行われました。", icon: (s) => <Search size={s} /> }
];

const SYSTEM_LOGS = ["DATA_RANDOMIZING", "PLANETARY_SYNC", "LIFE_SCAN_ACTIVE", "ORBITAL_VELOCITY_OK", "EVOLUTION_LOG", "SPACE_METRICS"];

const SevenSegmentDigit = ({ value }) => {
  const segments = {
    0: [1, 1, 1, 1, 1, 1, 0], 1: [0, 1, 1, 0, 0, 0, 0], 2: [1, 1, 0, 1, 1, 0, 1], 3: [1, 1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 0, 0, 1, 1], 5: [1, 0, 1, 1, 0, 1, 1], 6: [1, 0, 1, 1, 1, 1, 1], 7: [1, 1, 1, 0, 0, 1, 0],
    8: [1, 1, 1, 1, 1, 1, 1], 9: [1, 1, 1, 1, 0, 1, 1],
  };
  const active = segments[value] || [0, 0, 0, 0, 0, 0, 0];
  const classes = [
    "top-0 left-[10%] right-[10%] h-[10%]", "top-[6%] right-0 w-[18%] bottom-[52%]",
    "top-[52%] right-0 w-[18%] bottom-[6%]", "bottom-0 left-[10%] right-[10%] h-[10%]",
    "top-[52%] left-0 w-[18%] bottom-[6%]", "top-[6%] left-0 w-[18%] bottom-[52%]",
    "top-[45%] left-[10%] right-[10%] h-[10%]"
  ];
  return (
    <div className="relative w-[12.5%] h-10 md:h-16 filter drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]">
      {classes.map((c, i) => (
        <div key={i} className={`absolute rounded-sm transition-colors duration-200 ${c} ${active[i] ? "bg-white" : "bg-white/5"}`} />
      ))}
    </div>
  );
};

const DOT_MAP = ["00000000000000000000000000000000000000000000000000000000000000000000000000000000","00000000000000000000000000000011111111111111111000000000000000000000000000000000","00000000000000000000000000011111111111111111111110000000000000000000000000000000","00000000000000000001111111111111111111111111111111111111111111100000000000000000","00000000000000001111111111111111111111111111111111111111111111111000000000000000","00000000000001111111111111111111111111111111111111111111111111111110000000000000","00000000000111111111111111111111111111111111111111111111111111111111000000000000","00000000111111111111111111111111111111111111111111111111111111111111100000000000","00000001111111111111111111111111111111111111111111111111111111111111110000000000","00000001111111111111111111111111111111111111111111111111111111111111111000000000","00000000111111111111111111111111111111111111111111111111111111111111111000000000","00000000011111111111111111111111111111111111111111111111111111111111110000000000","00000000000111111111111110011111111111111111111111111111111111111111100000000000","00000000000011111111110000111111111111111111111111111111111111111111000000000000","00000000000001111111000000011111111111111111111111111111111111111110000000000000","00000000000000111100000000011111111111111111111111111111111111111100000000000000","00000000000000011100000000001111111111111111111111111111111111111000000000000000","00000000000000011100000000000111111111111111111111111111111111111000000000000000","00000000000000011000000000000111111111111111111111111111111111000000000000000000","00000000000000011000000000000011111111111111111111111111111111100000000000000000","00000000000000011000000000000001111111111111111111111111111110000000000000000000","00000000000000111000000000000000111111111111111111111111111000000000000000000000","00000000000000110000000000000000011111111111111111111111100000000000000100000000","00000000000000110000000000000000001111111111111111111110000000000000011100000000","00000000000000110000000000000000000111111111111111111110000000000000011110000000","00000000000000100000000000000000000011111111111111111110000000000000011111100000","00000000000000100000000000000000000001111111111111111000000000000001111111100000","00000000000000000000000000000000000000011111111111100000000000000011111111100000","00000000000000000000000000000000000000000111111111100000000000000011111111100000","00000000000000000000000000000000000000000011111111000000000000000001111111100000","00000000000000000000000000000000000000000000111110000000000000000001111110000000","00000000000000000000000000000000000000000000001100000000000000000000011110000000","00000000000000000000000000000000000000000000000000000000000000000000000011000000","00000000000000000000000000000000000000000000000000000000000000000000000000000000"];

export default function App() {
  const [time, setTime] = useState(new Date());
  const [fact, setFact] = useState(FACTS[0]);
  const [msProgress, setMsProgress] = useState(0);
  const [systemLog, setSystemLog] = useState("");
  const [isAudioActive, setIsAudioActive] = useState(false);
  
  const lastLogRef = useRef(0); // システムログ更新用の参照
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const bgmRef = useRef(null);

  const toggleAudio = () => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio(AUDIO_CONFIG.bgmSource);
      bgmRef.current.loop = true;
      bgmRef.current.volume = AUDIO_CONFIG.bgmVolume;
    }

    if (!isAudioActive) {
      bgmRef.current.play().catch(e => console.error("Play failed:", e));
      setIsAudioActive(true);
    } else {
      bgmRef.current.pause();
      setIsAudioActive(false);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => {
      if (!canvasRef.current || !window.THREE) return;
      const THREE = window.THREE;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      const draw = () => {
        while(globeGroup.children.length > 0) globeGroup.remove(globeGroup.children[0]);
        const r = window.innerWidth < 768 ? 2.2 : 3.5;
        const pos = [];
        for (let i = 0; i < DOT_MAP.length; i++) {
          const phi = (i / DOT_MAP.length) * Math.PI;
          for (let j = 0; j < DOT_MAP[0].length; j++) {
            if (DOT_MAP[i][j] === "1") {
              const theta = (j / DOT_MAP[0].length) * 2 * Math.PI - Math.PI;
              pos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
            }
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        globeGroup.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending })));
        globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(r * 0.99, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.12 })));
      };
      draw();
      camera.position.z = 10;
      const anim = () => {
        requestAnimationFrame(anim);
        globeGroup.rotation.y += 0.003;
        globeGroup.rotation.x += (mousePos.current.y * 0.12 - globeGroup.rotation.x) * 0.05;
        globeGroup.rotation.z += (mousePos.current.x * 0.12 - globeGroup.rotation.z) * 0.05;
        renderer.render(scene, camera);
      };
      anim();
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        draw();
      });
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    let lastSec = -1;
    const update = (ts) => {
      const now = new Date(), ms = now.getMilliseconds(), sec = now.getSeconds();
      setTime(now); setMsProgress(ms);
      
      // システムログを一定間隔でランダム更新
      if (ts - lastLogRef.current > 120) {
        lastLogRef.current = ts;
        setSystemLog(`${SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)]} >> [${Math.random().toString(16).slice(2, 6).toUpperCase()}]`);
      }

      if (sec !== lastSec) {
        lastSec = sec;
        setFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
      }
      requestAnimationFrame(update);
    };
    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const timeStr = useMemo(() => `${time.getHours().toString().padStart(2, '0')}${time.getMinutes().toString().padStart(2, '0')}${time.getSeconds().toString().padStart(2, '0')}`, [time]);
  const dots = useMemo(() => Array.from({ length: 12 }).map((_, i) => <circle key={i} cx={50 + 42 * Math.cos((-i * 30 - 90) * (Math.PI / 180))} cy={50 + 42 * Math.sin((-i * 30 - 90) * (Math.PI / 180))} r={[4.5, 3.8, 3.2, 2.6, 2.1, 1.7, 1.4, 1.1, 0.9, 0.7, 0.5, 0.4][i]} className="fill-white" style={{ opacity: [0.6, 0.45, 0.3, 0.2, 0.12, 0.08, 0.05, 0.04, 0.03, 0.02, 0.01, 0.01][i] }} />), []);
  const bar = useMemo(() => Array.from({ length: 30 }).map((_, i) => <div key={i} className={`h-3 md:h-4 flex-1 ${i < Math.floor((msProgress / 1000) * 30) ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'bg-white/10'}`} style={{ marginRight: i === 29 ? 0 : '1px' }} />), [msProgress]);

  return (
    <div className="min-h-screen bg-[#1a5296] text-white font-sans flex items-center justify-center p-4 overflow-hidden relative" onMouseMove={(e) => mousePos.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 }}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />
      
      <button onClick={toggleAudio} className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 border border-white/10">
        {isAudioActive ? <Volume2 size={20} /> : <VolumeX size={20} className="opacity-40" />}
      </button>

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <svg className="w-[90vw] h-[90vw] max-w-[650px] max-h-[650px] filter drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" viewBox="0 0 100 100" style={{ transform: `rotate(${Math.floor((msProgress / 1000) * 12) * 30}deg)` }}>{dots}</svg>
      </div>
      <div className="relative z-20 flex flex-col items-center w-full max-w-[95vw] md:max-w-[850px] mx-auto overflow-visible text-center">
        <header className="mb-0 w-full flex flex-col items-center">
          <h1 className="text-[2.1rem] md:text-[3.05rem] font-black italic leading-none glow-text uppercase">World Update</h1>
          <p className="text-[7.5px] md:text-[10px] font-bold tracking-[0.25em] text-white glow-text-sub">ー 1秒間にこの世界で起きていること ー</p>
        </header>
        <div className="relative w-full py-1.5 md:py-3 flex flex-col items-center overflow-visible">
          <div className="w-[240px] md:w-[350px] flex justify-between items-center opacity-[0.4] select-none">
            <SevenSegmentDigit value={timeStr[0]} /><SevenSegmentDigit value={timeStr[1]} />
            <div className="flex flex-col gap-4 md:gap-5 px-1"><div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-sm shadow-[0_0_5px_white]" /><div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-sm shadow-[0_0_5px_white]" /></div>
            <SevenSegmentDigit value={timeStr[2]} /><SevenSegmentDigit value={timeStr[3]} />
            <div className="flex flex-col gap-4 md:gap-5 px-1"><div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-sm shadow-[0_0_5px_white]" /><div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-sm shadow-[0_0_5px_white]" /></div>
            <SevenSegmentDigit value={timeStr[4]} /><SevenSegmentDigit value={timeStr[5]} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
            <div key={fact.text} className="flex flex-row items-center justify-center animate-slide-up px-4 w-full max-w-full">
              <div className="shrink-0 text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mr-2 md:mr-4">
                {fact.icon(window.innerWidth < 768 ? 22 : 36)}
              </div>
              <p className="text-[14px] sm:text-[18px] md:text-[1.85rem] font-extralight tracking-wider leading-tight glow-fact break-words sm:whitespace-nowrap text-center">
                {fact.text}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[240px] md:w-[350px] mt-0.5 md:mt-1">
          <div className="border-[1.5px] border-white/80 p-[1px] md:p-[1.5px] flex justify-between bg-white/5 backdrop-blur-[2px] shadow-[0_0_10px_rgba(255,255,255,0.1)]">{bar}</div>
          <div className="mt-1 md:mt-1.5 flex justify-between px-0.5 opacity-60 font-mono text-[6px] md:text-[8.5px] tracking-widest uppercase text-white">
            <span>{systemLog}</span><span>LIV_DATA_STREAM</span>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-up { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } } 
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; } 
        .glow-text { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2); } 
        .glow-text-sub { text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.4); } 
        .glow-fact { text-shadow: 0 0 12px rgba(255, 255, 255, 0.7), 0 0 25px rgba(255, 255, 255, 0.3); }
      `}} />
    </div>
  );
}