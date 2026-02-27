import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, RoundedBox } from "@react-three/drei";
import { Suspense, useState, useRef, useCallback } from "react";
import * as THREE from "three";

// ===== 颜色常量（与设计系统统一）=====
const COLORS = {
  desk: "#5c4033",
  deskLeg: "#4a3428",
  monitor: "#2a2a44",
  screen: "#4ecdc4",
  keyboard: "#1e2a4a",
  keycap: "#2a2a44",
  mouse: "#2a2a44",
  cup: "#eee8d5",
  coffee: "#5c3317",
  book1: "#e2a63d",
  book2: "#f97068",
  book3: "#4ecdc4",
  gamepad: "#3a3a5c",
  gamepadBtn: "#f97068",
  camera: "#4a4a6a",
  cameraLens: "#1a1a2e",
  plant: "#4ecdc4",
  pot: "#e2a63d",
  lamp: "#e2a63d",
  lampShade: "#f5d89a",
  pencil: "#f97068",
  paper: "#eee8d5",
  floor: "#141425",
};

// ===== 物品 → 页面映射 =====
const ITEM_CONFIG: Record<string, { label: string; href: string; hint: string }> = {
  monitor: { label: "项目作品", href: "/projects", hint: "点击查看" },
  gamepad: { label: "游戏开发", href: "/projects", hint: "点击查看" },
  camera: { label: "视频作品", href: "/videos", hint: "点击进入" },
  books: { label: "技术博客", href: "/blog", hint: "点击阅读" },
  sketch: { label: "关于我", href: "/about", hint: "点击了解" },
  coffee: { label: "联系我", href: "/contact", hint: "点击联系" },
};

// ===== 可交互物品组件 =====
function InteractiveItem({ children, name, position, onHover, onClick }: {
  children: React.ReactNode;
  name: string;
  position: [number, number, number];
  onHover: (name: string | null) => void;
  onClick: (name: string) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(name); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); onHover(null); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onClick(name); }}
      scale={hovered ? 1.08 : 1}
    >
      {children}
      {/* 悬停发光底圈 */}
      {hovered && (
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.45, 32]} />
          <meshBasicMaterial color={COLORS.lamp} transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
}

// ===== 桌面 =====
function Desk() {
  return (
    <group position={[0, 0, 0]}>
      <RoundedBox args={[4, 0.12, 2.2]} radius={0.03} position={[0, 1, 0]}>
        <meshStandardMaterial color={COLORS.desk} roughness={0.7} />
      </RoundedBox>
      {[[-1.8, 0.5, -0.9], [1.8, 0.5, -0.9], [-1.8, 0.5, 0.9], [1.8, 0.5, 0.9]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color={COLORS.deskLeg} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ===== 显示器 =====
function Monitor() {
  return (
    <group>
      <RoundedBox args={[1.4, 0.9, 0.06]} radius={0.02} position={[0, 0.55, 0]}>
        <meshStandardMaterial color={COLORS.monitor} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.55, 0.035]}>
        <planeGeometry args={[1.25, 0.75]} />
        <meshStandardMaterial color={COLORS.screen} emissive={COLORS.screen} emissiveIntensity={0.4} roughness={0.1} />
      </mesh>
      {[0.2, 0.08, -0.04, -0.16, -0.28].map((y, i) => (
        <mesh key={i} position={[-0.15 + i * 0.03, 0.55 + y, 0.038]}>
          <planeGeometry args={[0.5 + Math.random() * 0.4, 0.04]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#e2a63d" : "#4ecdc4"} emissive={i % 2 === 0 ? "#e2a63d" : "#4ecdc4"} emissiveIntensity={0.2} transparent opacity={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
        <meshStandardMaterial color={COLORS.monitor} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.04, 16]} />
        <meshStandardMaterial color={COLORS.monitor} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ===== 键盘 =====
function Keyboard() {
  return (
    <group>
      <RoundedBox args={[1, 0.05, 0.4]} radius={0.02}>
        <meshStandardMaterial color={COLORS.keyboard} roughness={0.6} />
      </RoundedBox>
      {[-0.12, -0.04, 0.04, 0.12].map((z, row) => (
        Array.from({ length: 10 }).map((_, col) => (
          <mesh key={`${row}-${col}`} position={[-0.36 + col * 0.08, 0.035, z]}>
            <boxGeometry args={[0.06, 0.02, 0.06]} />
            <meshStandardMaterial color={row === 1 && col === 4 ? COLORS.lamp : COLORS.keycap} roughness={0.5} />
          </mesh>
        ))
      ))}
    </group>
  );
}

// ===== 鼠标 =====
function Mouse() {
  return (
    <mesh>
      <capsuleGeometry args={[0.04, 0.06, 4, 8]} />
      <meshStandardMaterial color={COLORS.mouse} roughness={0.4} />
    </mesh>
  );
}

// ===== 咖啡杯 =====
function CoffeeCup() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.08, 0.06, 0.16, 16]} />
        <meshStandardMaterial color={COLORS.cup} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.01, 16]} />
        <meshStandardMaterial color={COLORS.coffee} roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.04, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color={COLORS.cup} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ===== 书堆 =====
function Books() {
  return (
    <group>
      <RoundedBox args={[0.35, 0.06, 0.25]} radius={0.01} position={[0, 0, 0]}>
        <meshStandardMaterial color={COLORS.book1} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.32, 0.05, 0.25]} radius={0.01} position={[0.01, 0.055, 0]}>
        <meshStandardMaterial color={COLORS.book2} roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.3, 0.04, 0.22]} radius={0.01} position={[-0.01, 0.1, 0]}>
        <meshStandardMaterial color={COLORS.book3} roughness={0.8} />
      </RoundedBox>
    </group>
  );
}

// ===== 游戏手柄 =====
function Gamepad() {
  return (
    <group rotation={[0.1, 0.3, 0]}>
      <RoundedBox args={[0.3, 0.06, 0.2]} radius={0.03}>
        <meshStandardMaterial color={COLORS.gamepad} roughness={0.5} />
      </RoundedBox>
      <mesh position={[-0.12, -0.02, 0.06]} rotation={[0.3, 0, -0.2]}>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={COLORS.gamepad} roughness={0.5} />
      </mesh>
      <mesh position={[0.12, -0.02, 0.06]} rotation={[0.3, 0, 0.2]}>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={COLORS.gamepad} roughness={0.5} />
      </mesh>
      {[[0.08, 0.04, -0.02], [0.11, 0.04, -0.05], [0.05, 0.04, -0.05], [0.08, 0.04, -0.08]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={[COLORS.gamepadBtn, COLORS.lamp, COLORS.screen, COLORS.book1][i]} emissive={[COLORS.gamepadBtn, COLORS.lamp, COLORS.screen, COLORS.book1][i]} emissiveIntensity={0.3} />
        </mesh>
      ))}
      <mesh position={[-0.06, 0.05, -0.04]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
      </mesh>
    </group>
  );
}

// ===== 小摄像机 =====
function Camera() {
  return (
    <group rotation={[0, -0.4, 0]}>
      <RoundedBox args={[0.2, 0.14, 0.12]} radius={0.02}>
        <meshStandardMaterial color={COLORS.camera} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.04, 0.05, 0.08, 16]} />
        <meshStandardMaterial color={COLORS.cameraLens} roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.145]}>
        <circleGeometry args={[0.035, 16]} />
        <meshStandardMaterial color="#6688aa" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.06, 0.04]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color={COLORS.gamepadBtn} emissive={COLORS.gamepadBtn} emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// ===== 台灯 =====
function DeskLamp() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.04, 16]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.08, 0.48, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.15, 0.52, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.1, 0.12, 16, 1, true]} />
        <meshStandardMaterial color={COLORS.lampShade} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0.15, 0.46, 0]} color="#ffd89b" intensity={2} distance={3} decay={2} />
    </group>
  );
}

// ===== 小盆栽 =====
function Plant() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.06, 0.05, 0.1, 8]} />
        <meshStandardMaterial color={COLORS.pot} roughness={0.7} />
      </mesh>
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.03, 0.08 + i * 0.01, Math.sin(angle) * 0.03]} rotation={[0.3 * Math.cos(angle), angle, 0.3 * Math.sin(angle)]}>
          <sphereGeometry args={[0.04, 6, 4]} />
          <meshStandardMaterial color={COLORS.plant} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ===== 纸和铅笔 =====
function PaperAndPencil() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0.1]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial color={COLORS.paper} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.1, 0.02, 0.05]} rotation={[0, 0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 6]} />
        <meshStandardMaterial color={COLORS.pencil} roughness={0.6} />
      </mesh>
      <mesh position={[0.21, 0.02, 0.01]} rotation={[0, 0.5, Math.PI / 2]}>
        <coneGeometry args={[0.008, 0.03, 6]} />
        <meshStandardMaterial color="#eee8d5" roughness={0.5} />
      </mesh>
    </group>
  );
}

// ===== 地面 =====
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color={COLORS.floor} roughness={0.9} />
    </mesh>
  );
}

// ===== 悬停提示 UI =====
function HoverTooltip({ name }: { name: string | null }) {
  if (!name || !ITEM_CONFIG[name]) return null;
  const config = ITEM_CONFIG[name];
  return (
    <div className="pointer-events-none absolute left-1/2 bottom-24 z-20 -translate-x-1/2 animate-[fadeIn_0.2s_ease]">
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border-hover)] bg-[var(--color-bg-secondary)]/90 px-5 py-3 shadow-2xl backdrop-blur-md">
        <span className="text-base font-semibold text-[var(--color-text-primary)]">{config.label}</span>
        <span className="rounded-full bg-[var(--color-accent-gold)]/20 px-3 py-0.5 text-xs font-medium text-[var(--color-accent-gold)]">
          {config.hint}
        </span>
      </div>
    </div>
  );
}

// ===== 完整场景 =====
function Scene({ onHover, onItemClick }: { onHover: (name: string | null) => void; onItemClick: (name: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} color="#b8c4d0" />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#8899bb" />
      <Environment preset="night" />

      <Floor />
      <Desk />

      {/* 桌面物品 */}
      <group position={[0, 1.06, 0]}>
        {/* 显示器 — 后方居中 */}
        <InteractiveItem name="monitor" position={[0, 0, -0.6]} onHover={onHover} onClick={onItemClick}>
          <Monitor />
        </InteractiveItem>

        {/* 键盘和鼠标 — 装饰 */}
        <group position={[0, 0, 0.15]}>
          <Keyboard />
        </group>
        <group position={[0.65, 0, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <Mouse />
        </group>

        {/* 台灯 — 装饰 */}
        <group position={[-1.5, 0, -0.5]}>
          <DeskLamp />
        </group>

        {/* 游戏手柄 — 右前 */}
        <InteractiveItem name="gamepad" position={[1.2, 0, 0.5]} onHover={onHover} onClick={onItemClick}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
            <Gamepad />
          </Float>
        </InteractiveItem>

        {/* 摄像机 — 左前 */}
        <InteractiveItem name="camera" position={[-1.2, 0, 0.6]} onHover={onHover} onClick={onItemClick}>
          <Camera />
        </InteractiveItem>

        {/* 书堆 — 最左 */}
        <InteractiveItem name="books" position={[-1.6, 0, 0.3]} onHover={onHover} onClick={onItemClick}>
          <Books />
        </InteractiveItem>

        {/* 纸和铅笔 — 右侧 */}
        <InteractiveItem name="sketch" position={[1.4, 0.01, -0.3]} onHover={onHover} onClick={onItemClick}>
          <PaperAndPencil />
        </InteractiveItem>

        {/* 咖啡杯 — 右后 */}
        <InteractiveItem name="coffee" position={[1.6, 0, -0.6]} onHover={onHover} onClick={onItemClick}>
          <CoffeeCup />
        </InteractiveItem>

        {/* 小盆栽 — 装饰 */}
        <group position={[1.7, 0, -0.85]}>
          <Float speed={1.5} rotationIntensity={0} floatIntensity={0.05}>
            <Plant />
          </Float>
        </group>
      </group>

      <OrbitControls
        target={[0, 1.2, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

// ===== 加载占位 =====
function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-accent-gold)] border-t-transparent" />
        <span className="text-sm text-[var(--color-text-muted)]">加载工作台...</span>
      </div>
    </div>
  );
}

// ===== 主导出组件 =====
export default function DeskScene() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = useCallback((name: string) => {
    const config = ITEM_CONFIG[name];
    if (config) {
      window.location.href = config.href;
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 3.8, 3.8], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene onHover={setHoveredItem} onItemClick={handleItemClick} />
        </Canvas>
      </Suspense>
      <HoverTooltip name={hoveredItem} />
    </div>
  );
}
