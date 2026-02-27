import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, RoundedBox } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";

// ===== 颜色常量（与设计系统统一）=====
const COLORS = {
  desk: "#5c4033",       // 深木色桌面
  deskLeg: "#4a3428",    // 桌腿
  monitor: "#2a2a44",    // 显示器外壳
  screen: "#4ecdc4",     // 显示器屏幕（青绿光）
  keyboard: "#1e2a4a",   // 键盘
  keycap: "#2a2a44",     // 键帽
  mouse: "#2a2a44",      // 鼠标
  cup: "#eee8d5",        // 咖啡杯（暖白）
  coffee: "#5c3317",     // 咖啡液面
  book1: "#e2a63d",      // 书1（琥珀金）
  book2: "#f97068",      // 书2（珊瑚红）
  book3: "#4ecdc4",      // 书3（青绿）
  gamepad: "#3a3a5c",    // 手柄
  gamepadBtn: "#f97068", // 手柄按钮
  camera: "#4a4a6a",     // 摄像机
  cameraLens: "#1a1a2e", // 镜头
  plant: "#4ecdc4",      // 植物
  pot: "#e2a63d",        // 花盆
  lamp: "#e2a63d",       // 台灯（琥珀金）
  lampShade: "#f5d89a",  // 灯罩
  pencil: "#f97068",     // 铅笔
  paper: "#eee8d5",      // 纸
  floor: "#141425",      // 地面
};

// ===== 可悬停物品组件 =====
function HoverItem({ children, name, position, onHover }: {
  children: React.ReactNode;
  name: string;
  position: [number, number, number];
  onHover: (name: string | null) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(name); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); onHover(null); document.body.style.cursor = "auto"; }}
      scale={hovered ? 1.05 : 1}
    >
      {children}
      {/* 悬停发光底圈 */}
      {hovered && (
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.5, 32]} />
          <meshBasicMaterial color={COLORS.lamp} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

// ===== 桌面 =====
function Desk() {
  return (
    <group position={[0, 0, 0]}>
      {/* 桌面板 */}
      <RoundedBox args={[4, 0.12, 2.2]} radius={0.03} position={[0, 1, 0]}>
        <meshStandardMaterial color={COLORS.desk} roughness={0.7} />
      </RoundedBox>
      {/* 四条桌腿 */}
      {[[-1.8, 0.5, -0.9], [1.8, 0.5, -0.9], [-1.8, 0.5, 0.9], [1.8, 0.5, 0.9]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color={COLORS.deskLeg} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ===== 显示器 (前端开发) =====
function Monitor() {
  return (
    <group>
      {/* 屏幕 */}
      <RoundedBox args={[1.4, 0.9, 0.06]} radius={0.02} position={[0, 0.55, 0]}>
        <meshStandardMaterial color={COLORS.monitor} roughness={0.3} />
      </RoundedBox>
      {/* 屏幕发光面 */}
      <mesh position={[0, 0.55, 0.035]}>
        <planeGeometry args={[1.25, 0.75]} />
        <meshStandardMaterial color={COLORS.screen} emissive={COLORS.screen} emissiveIntensity={0.4} roughness={0.1} />
      </mesh>
      {/* 代码行条纹装饰 */}
      {[0.2, 0.08, -0.04, -0.16, -0.28].map((y, i) => (
        <mesh key={i} position={[-0.15 + i * 0.03, 0.55 + y, 0.038]}>
          <planeGeometry args={[0.5 + Math.random() * 0.4, 0.04]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#e2a63d" : "#4ecdc4"} emissive={i % 2 === 0 ? "#e2a63d" : "#4ecdc4"} emissiveIntensity={0.2} transparent opacity={0.6} />
        </mesh>
      ))}
      {/* 支架 */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
        <meshStandardMaterial color={COLORS.monitor} roughness={0.3} />
      </mesh>
      {/* 底座 */}
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
      {/* 简化键帽行 */}
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
    <group>
      <mesh>
        <capsuleGeometry args={[0.04, 0.06, 4, 8]} />
        <meshStandardMaterial color={COLORS.mouse} roughness={0.4} />
      </mesh>
    </group>
  );
}

// ===== 咖啡杯 =====
function CoffeeCup() {
  return (
    <group>
      {/* 杯身 */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.06, 0.16, 16]} />
        <meshStandardMaterial color={COLORS.cup} roughness={0.3} />
      </mesh>
      {/* 咖啡液面 */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.01, 16]} />
        <meshStandardMaterial color={COLORS.coffee} roughness={0.2} />
      </mesh>
      {/* 把手 */}
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

// ===== 游戏手柄 (UE/游戏开发) =====
function Gamepad() {
  return (
    <group rotation={[0.1, 0.3, 0]}>
      {/* 手柄主体 */}
      <RoundedBox args={[0.3, 0.06, 0.2]} radius={0.03}>
        <meshStandardMaterial color={COLORS.gamepad} roughness={0.5} />
      </RoundedBox>
      {/* 左右握把 */}
      <mesh position={[-0.12, -0.02, 0.06]} rotation={[0.3, 0, -0.2]}>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={COLORS.gamepad} roughness={0.5} />
      </mesh>
      <mesh position={[0.12, -0.02, 0.06]} rotation={[0.3, 0, 0.2]}>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={COLORS.gamepad} roughness={0.5} />
      </mesh>
      {/* 按钮 */}
      {[[0.08, 0.04, -0.02], [0.11, 0.04, -0.05], [0.05, 0.04, -0.05], [0.08, 0.04, -0.08]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={[COLORS.gamepadBtn, COLORS.lamp, COLORS.screen, COLORS.book1][i]} emissive={[COLORS.gamepadBtn, COLORS.lamp, COLORS.screen, COLORS.book1][i]} emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 摇杆 */}
      <mesh position={[-0.06, 0.05, -0.04]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
      </mesh>
    </group>
  );
}

// ===== 小摄像机 (视频创作) =====
function Camera() {
  return (
    <group rotation={[0, -0.4, 0]}>
      {/* 机身 */}
      <RoundedBox args={[0.2, 0.14, 0.12]} radius={0.02}>
        <meshStandardMaterial color={COLORS.camera} roughness={0.4} />
      </RoundedBox>
      {/* 镜头 */}
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.04, 0.05, 0.08, 16]} />
        <meshStandardMaterial color={COLORS.cameraLens} roughness={0.2} metalness={0.5} />
      </mesh>
      {/* 镜头玻璃 */}
      <mesh position={[0, 0, 0.145]}>
        <circleGeometry args={[0.035, 16]} />
        <meshStandardMaterial color="#6688aa" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* 录制灯 */}
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
      {/* 底座 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.04, 16]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* 灯杆 */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* 灯杆弯折 */}
      <mesh position={[0.08, 0.48, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color={COLORS.lamp} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* 灯罩 */}
      <mesh position={[0.15, 0.52, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.1, 0.12, 16, 1, true]} />
        <meshStandardMaterial color={COLORS.lampShade} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* 暖光 */}
      <pointLight position={[0.15, 0.46, 0]} color="#ffd89b" intensity={2} distance={3} decay={2} />
    </group>
  );
}

// ===== 小盆栽 =====
function Plant() {
  return (
    <group>
      {/* 花盆 */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.05, 0.1, 8]} />
        <meshStandardMaterial color={COLORS.pot} roughness={0.7} />
      </mesh>
      {/* 叶子 */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.03, 0.08 + i * 0.01, Math.sin(angle) * 0.03]} rotation={[0.3 * Math.cos(angle), angle, 0.3 * Math.sin(angle)]}>
          <sphereGeometry args={[0.04, 6, 4]} />
          <meshStandardMaterial color={COLORS.plant} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ===== 纸和铅笔 (设计) =====
function PaperAndPencil() {
  return (
    <group>
      {/* 纸 */}
      <mesh rotation={[-Math.PI / 2, 0, 0.1]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial color={COLORS.paper} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* 铅笔 */}
      <mesh position={[0.1, 0.02, 0.05]} rotation={[0, 0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 6]} />
        <meshStandardMaterial color={COLORS.pencil} roughness={0.6} />
      </mesh>
      {/* 铅笔尖 */}
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

// ===== 悬停提示标签 =====
function HoverLabel({ name }: { name: string | null }) {
  if (!name) return null;
  const labels: Record<string, string> = {
    monitor: "前端开发",
    gamepad: "游戏开发",
    camera: "视频创作",
    sketch: "设计 & 创意",
    books: "持续学习",
    coffee: "燃料供给 ☕",
  };
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
      <div className="rounded-xl bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-accent-gold)] shadow-lg border border-[var(--color-border-default)]">
        {labels[name] || name}
      </div>
    </div>
  );
}

// ===== 完整场景 =====
function Scene({ onHover }: { onHover: (name: string | null) => void }) {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} color="#b8c4d0" />
      {/* 主方向光 (月光) */}
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#8899bb" />
      {/* 环境贴图 */}
      <Environment preset="night" />

      <Floor />

      {/* 桌子 */}
      <Desk />

      {/* 桌面物品 */}
      <group position={[0, 1.06, 0]}>
        {/* 显示器 — 后方居中 */}
        <HoverItem name="monitor" position={[0, 0, -0.6]} onHover={onHover}>
          <Monitor />
        </HoverItem>

        {/* 键盘和鼠标 — 前方 */}
        <group position={[0, 0, 0.15]}>
          <Keyboard />
        </group>
        <group position={[0.65, 0, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <Mouse />
        </group>

        {/* 台灯 — 左后 */}
        <group position={[-1.5, 0, -0.5]}>
          <DeskLamp />
        </group>

        {/* 游戏手柄 — 右前 */}
        <HoverItem name="gamepad" position={[1.2, 0, 0.5]} onHover={onHover}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
            <Gamepad />
          </Float>
        </HoverItem>

        {/* 摄像机 — 左前 */}
        <HoverItem name="camera" position={[-1.2, 0, 0.6]} onHover={onHover}>
          <Camera />
        </HoverItem>

        {/* 书堆 — 最左 */}
        <HoverItem name="books" position={[-1.6, 0, 0.3]} onHover={onHover}>
          <Books />
        </HoverItem>

        {/* 纸和铅笔 — 右侧 */}
        <HoverItem name="sketch" position={[1.4, 0.01, -0.3]} onHover={onHover}>
          <PaperAndPencil />
        </HoverItem>

        {/* 咖啡杯 — 右后 */}
        <HoverItem name="coffee" position={[1.6, 0, -0.6]} onHover={onHover}>
          <CoffeeCup />
        </HoverItem>

        {/* 小盆栽 — 最右后 */}
        <group position={[1.7, 0, -0.85]}>
          <Float speed={1.5} rotationIntensity={0} floatIntensity={0.05}>
            <Plant />
          </Float>
        </group>
      </group>

      {/* 相机控制 */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// ===== 加载占位 =====
function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent-gold)] border-t-transparent" />
        <span className="text-sm text-[var(--color-text-muted)]">加载 3D 场景...</span>
      </div>
    </div>
  );
}

// ===== 主导出组件 =====
export default function DeskScene() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [3, 3, 3], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene onHover={setHoveredItem} />
        </Canvas>
      </Suspense>
      <HoverLabel name={hoveredItem} />
    </div>
  );
}
