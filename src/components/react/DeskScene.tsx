import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, RoundedBox } from "@react-three/drei";
import { Suspense, useState, useRef, useCallback } from "react";
import * as THREE from "three";

// ===== 明亮卡通配色 =====
const C = {
  // 房间
  floor: "#F5DEB3",
  floorBoard: "#E8CFA0",
  wall: "#FFF8F0",
  wallSide: "#FFF0E5",
  baseboard: "#E8D5C0",
  windowFrame: "#FFFFFF",
  windowSill: "#F0E0D0",
  sky: "#87CEEB",
  cloud: "#FFFFFF",
  rug: "#B8D4E3",
  rugBorder: "#9CC4D8",

  // 家具
  desk: "#C4915A",
  deskLeg: "#A67B4B",

  // 桌面物品
  monitor: "#4A4A6E",
  screen: "#7DD3C8",
  screenCode1: "#FFB347",
  screenCode2: "#87CEEB",
  keyboard: "#E8E8F0",
  keycap: "#D0D0E0",
  keycapAccent: "#FFD700",
  mouse: "#E8E8F0",
  cup: "#FFFFFF",
  coffee: "#8B5E3C",
  book1: "#FFB347",
  book2: "#FF6B6B",
  book3: "#4ECDC4",
  gamepad: "#8080B0",
  gamepadBtn: "#FF6B6B",
  camera: "#8888AA",
  cameraLens: "#3A3A50",
  cameraRec: "#FF4444",
  plant: "#66CC77",
  plantDark: "#4AAA5A",
  pot: "#FFB347",
  lamp: "#FFD700",
  lampShade: "#FFF5CC",
  pencil: "#FF6B6B",
  paper: "#FFFFFF",

  // 墙面装饰
  frame: "#C4915A",
  poster: "#FFE4B5",
  clock: "#FFFFFF",
  clockHand: "#4A4A6E",
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

// ===== 可交互物品 =====
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
      {hovered && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={999}>
          <ringGeometry args={[0.15, 0.4, 32]} />
          <meshBasicMaterial color={C.lamp} transparent opacity={0.5} depthTest={false} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

// ===== 房间结构 =====
function Room() {
  return (
    <group>
      {/* 地板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.5]} receiveShadow>
        <planeGeometry args={[8, 7]} />
        <meshStandardMaterial color={C.floor} roughness={0.8} />
      </mesh>
      {/* 地板条纹装饰 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`fb${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-3.5 + i, 0.001, 0.5]}>
          <planeGeometry args={[0.02, 7]} />
          <meshStandardMaterial color={C.floorBoard} roughness={0.9} />
        </mesh>
      ))}

      {/* 后墙 */}
      <mesh position={[0, 2, -3]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </mesh>

      {/* 左墙 */}
      <mesh position={[-4, 2, 0.5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[7, 4]} />
        <meshStandardMaterial color={C.wallSide} roughness={0.9} />
      </mesh>

      {/* 后墙踢脚线 */}
      <mesh position={[0, 0.1, -2.98]}>
        <boxGeometry args={[8, 0.2, 0.06]} />
        <meshStandardMaterial color={C.baseboard} roughness={0.7} />
      </mesh>
      {/* 左墙踢脚线 */}
      <mesh position={[-3.97, 0.1, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[7, 0.2, 0.06]} />
        <meshStandardMaterial color={C.baseboard} roughness={0.7} />
      </mesh>

      {/* 地毯 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 1]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshStandardMaterial color={C.rug} roughness={0.95} />
      </mesh>
      {/* 地毯边框 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 1]}>
        <planeGeometry args={[3.8, 2.8]} />
        <meshStandardMaterial color={C.rugBorder} roughness={0.95} />
      </mesh>
    </group>
  );
}

// ===== 窗户 =====
function Window() {
  return (
    <group position={[1.5, 2.6, -2.97]}>
      {/* 天空 */}
      <mesh>
        <planeGeometry args={[1.6, 1.3]} />
        <meshBasicMaterial color={C.sky} />
      </mesh>
      {/* 云朵装饰 */}
      <mesh position={[-0.3, 0.3, 0.01]}>
        <planeGeometry args={[0.5, 0.15]} />
        <meshBasicMaterial color={C.cloud} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.4, 0.15, 0.01]}>
        <planeGeometry args={[0.35, 0.1]} />
        <meshBasicMaterial color={C.cloud} transparent opacity={0.6} />
      </mesh>
      {/* 窗框 - 上下左右 */}
      <mesh position={[0, 0.7, 0.02]}>
        <boxGeometry args={[1.8, 0.1, 0.06]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.7, 0.02]}>
        <boxGeometry args={[1.8, 0.1, 0.06]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.3} />
      </mesh>
      <mesh position={[-0.85, 0, 0.02]}>
        <boxGeometry args={[0.1, 1.3, 0.06]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.3} />
      </mesh>
      <mesh position={[0.85, 0, 0.02]}>
        <boxGeometry args={[0.1, 1.3, 0.06]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.3} />
      </mesh>
      {/* 十字窗棂 */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[1.6, 0.05, 0.04]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.05, 1.3, 0.04]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.3} />
      </mesh>
      {/* 窗台 */}
      <mesh position={[0, -0.75, 0.12]}>
        <boxGeometry args={[1.9, 0.06, 0.25]} />
        <meshStandardMaterial color={C.windowSill} roughness={0.5} />
      </mesh>
    </group>
  );
}

// ===== 墙面装饰：画框 =====
function WallFrame() {
  return (
    <group position={[-3.95, 2.5, -1]}>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1, 0.8, 0.05]} />
        <meshStandardMaterial color={C.frame} roughness={0.6} />
      </mesh>
      <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color={C.poster} roughness={0.9} />
      </mesh>
      {/* 简单的山水画装饰 */}
      <mesh position={[0.035, -0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial color="#88BB88" roughness={0.9} />
      </mesh>
      <mesh position={[0.035, 0.15, 0.15]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#FFD700" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ===== 墙面装饰：时钟 =====
function WallClock() {
  return (
    <group position={[-3.95, 3, 1.5]}>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 24]} />
        <meshStandardMaterial color={C.clock} roughness={0.3} />
      </mesh>
      {/* 时针 */}
      <mesh position={[0.025, 0.03, 0.02]} rotation={[0, Math.PI / 2, 0.5]}>
        <boxGeometry args={[0.12, 0.02, 0.01]} />
        <meshStandardMaterial color={C.clockHand} />
      </mesh>
      {/* 分针 */}
      <mesh position={[0.025, -0.02, 0.05]} rotation={[0, Math.PI / 2, -0.8]}>
        <boxGeometry args={[0.16, 0.015, 0.01]} />
        <meshStandardMaterial color={C.clockHand} />
      </mesh>
      {/* 中心点 */}
      <mesh position={[0.025, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[0.02, 8]} />
        <meshStandardMaterial color={C.cameraRec} />
      </mesh>
    </group>
  );
}

// ===== 桌面 =====
function Desk() {
  return (
    <group position={[0, 0, -1.2]}>
      <RoundedBox args={[4, 0.12, 2]} radius={0.03} position={[0, 1, 0]}>
        <meshStandardMaterial color={C.desk} roughness={0.6} />
      </RoundedBox>
      {[[-1.8, 0.5, -0.85], [1.8, 0.5, -0.85], [-1.8, 0.5, 0.85], [1.8, 0.5, 0.85]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.06, 0.06, 1, 8]} />
          <meshStandardMaterial color={C.deskLeg} roughness={0.7} />
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
        <meshStandardMaterial color={C.monitor} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.55, 0.035]}>
        <planeGeometry args={[1.25, 0.75]} />
        <meshStandardMaterial color={C.screen} emissive={C.screen} emissiveIntensity={0.15} roughness={0.1} />
      </mesh>
      {[0.2, 0.08, -0.04, -0.16, -0.28].map((y, i) => (
        <mesh key={i} position={[-0.15 + i * 0.03, 0.55 + y, 0.038]}>
          <planeGeometry args={[0.5 + Math.random() * 0.4, 0.04]} />
          <meshStandardMaterial color={i % 2 === 0 ? C.screenCode1 : C.screenCode2} emissive={i % 2 === 0 ? C.screenCode1 : C.screenCode2} emissiveIntensity={0.1} transparent opacity={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
        <meshStandardMaterial color={C.monitor} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.04, 16]} />
        <meshStandardMaterial color={C.monitor} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ===== 键盘 =====
function Keyboard() {
  return (
    <group>
      <RoundedBox args={[1, 0.05, 0.4]} radius={0.02}>
        <meshStandardMaterial color={C.keyboard} roughness={0.5} />
      </RoundedBox>
      {[-0.12, -0.04, 0.04, 0.12].map((z, row) => (
        Array.from({ length: 10 }).map((_, col) => (
          <mesh key={`${row}-${col}`} position={[-0.36 + col * 0.08, 0.035, z]}>
            <boxGeometry args={[0.06, 0.02, 0.06]} />
            <meshStandardMaterial color={row === 1 && col === 4 ? C.keycapAccent : C.keycap} roughness={0.4} />
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
      <meshStandardMaterial color={C.mouse} roughness={0.3} />
    </mesh>
  );
}

// ===== 咖啡杯 =====
function CoffeeCup() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.08, 0.06, 0.16, 16]} />
        <meshStandardMaterial color={C.cup} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.01, 16]} />
        <meshStandardMaterial color={C.coffee} roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.04, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color={C.cup} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ===== 书堆 =====
function Books() {
  return (
    <group>
      <RoundedBox args={[0.35, 0.06, 0.25]} radius={0.01} position={[0, 0, 0]}>
        <meshStandardMaterial color={C.book1} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.32, 0.05, 0.25]} radius={0.01} position={[0.01, 0.055, 0]}>
        <meshStandardMaterial color={C.book2} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.3, 0.04, 0.22]} radius={0.01} position={[-0.01, 0.1, 0]}>
        <meshStandardMaterial color={C.book3} roughness={0.7} />
      </RoundedBox>
    </group>
  );
}

// ===== 游戏手柄 =====
function Gamepad() {
  return (
    <group rotation={[0.1, 0.3, 0]}>
      <RoundedBox args={[0.3, 0.06, 0.2]} radius={0.03}>
        <meshStandardMaterial color={C.gamepad} roughness={0.4} />
      </RoundedBox>
      <mesh position={[-0.12, -0.02, 0.06]} rotation={[0.3, 0, -0.2]}>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={C.gamepad} roughness={0.4} />
      </mesh>
      <mesh position={[0.12, -0.02, 0.06]} rotation={[0.3, 0, 0.2]}>
        <capsuleGeometry args={[0.03, 0.08, 4, 8]} />
        <meshStandardMaterial color={C.gamepad} roughness={0.4} />
      </mesh>
      {[[0.08, 0.04, -0.02], [0.11, 0.04, -0.05], [0.05, 0.04, -0.05], [0.08, 0.04, -0.08]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            color={[C.gamepadBtn, C.lamp, C.screen, C.book1][i]}
            emissive={[C.gamepadBtn, C.lamp, C.screen, C.book1][i]}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      <mesh position={[-0.06, 0.05, -0.04]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 8]} />
        <meshStandardMaterial color="#3A3A50" roughness={0.3} />
      </mesh>
    </group>
  );
}

// ===== 小摄像机 =====
function Camera() {
  return (
    <group rotation={[0, -0.4, 0]}>
      <RoundedBox args={[0.2, 0.14, 0.12]} radius={0.02}>
        <meshStandardMaterial color={C.camera} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.04, 0.05, 0.08, 16]} />
        <meshStandardMaterial color={C.cameraLens} roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.145]}>
        <circleGeometry args={[0.035, 16]} />
        <meshStandardMaterial color="#8899BB" roughness={0.1} metalness={0.6} />
      </mesh>
      <mesh position={[0.08, 0.06, 0.04]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color={C.cameraRec} emissive={C.cameraRec} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// ===== 台灯 =====
function DeskLamp() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.1, 0.12, 0.04, 16]} />
        <meshStandardMaterial color={C.lamp} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color={C.lamp} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0.08, 0.48, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color={C.lamp} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0.15, 0.52, 0]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.1, 0.12, 16, 1, true]} />
        <meshStandardMaterial color={C.lampShade} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0.15, 0.46, 0]} color="#FFF5CC" intensity={1.5} distance={3} decay={2} />
    </group>
  );
}

// ===== 小盆栽 =====
function Plant() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.06, 0.05, 0.1, 8]} />
        <meshStandardMaterial color={C.pot} roughness={0.6} />
      </mesh>
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.03, 0.08 + i * 0.01, Math.sin(angle) * 0.03]} rotation={[0.3 * Math.cos(angle), angle, 0.3 * Math.sin(angle)]}>
          <sphereGeometry args={[0.04, 6, 4]} />
          <meshStandardMaterial color={i % 2 === 0 ? C.plant : C.plantDark} roughness={0.8} />
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
        <meshStandardMaterial color={C.paper} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.1, 0.02, 0.05]} rotation={[0, 0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 6]} />
        <meshStandardMaterial color={C.pencil} roughness={0.5} />
      </mesh>
      <mesh position={[0.21, 0.02, 0.01]} rotation={[0, 0.5, Math.PI / 2]}>
        <coneGeometry args={[0.008, 0.03, 6]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.5} />
      </mesh>
    </group>
  );
}

// ===== 悬停提示 UI =====
function HoverTooltip({ name }: { name: string | null }) {
  if (!name || !ITEM_CONFIG[name]) return null;
  const config = ITEM_CONFIG[name];
  return (
    <div className="pointer-events-none absolute left-1/2 bottom-20 z-20 -translate-x-1/2 animate-[fadeIn_0.2s_ease]">
      <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/80 px-5 py-3 shadow-xl backdrop-blur-md">
        <span className="text-base font-semibold text-gray-800">{config.label}</span>
        <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-700">
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
      {/* 明亮光照 */}
      <ambientLight intensity={0.7} color="#FFF8F0" />
      {/* 窗户阳光 */}
      <directionalLight
        position={[2, 6, 4]}
        intensity={1.2}
        color="#FFF5E0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* 补光 */}
      <directionalLight position={[-3, 4, 2]} intensity={0.3} color="#E0E8FF" />
      {/* 环境 */}
      <Environment preset="apartment" />

      {/* 房间 */}
      <Room />
      <Window />
      <WallFrame />
      <WallClock />

      {/* 桌子 */}
      <Desk />

      {/* 桌面物品 — 相对于桌子位置 */}
      <group position={[0, 1.06, -1.2]}>
        <InteractiveItem name="monitor" position={[0, 0, -0.5]} onHover={onHover} onClick={onItemClick}>
          <Monitor />
        </InteractiveItem>

        <group position={[0, 0, 0.2]}>
          <Keyboard />
        </group>
        <group position={[0.65, 0, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <Mouse />
        </group>

        <group position={[-1.5, 0, -0.4]}>
          <DeskLamp />
        </group>

        <InteractiveItem name="gamepad" position={[1.2, 0, 0.5]} onHover={onHover} onClick={onItemClick}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.08}>
            <Gamepad />
          </Float>
        </InteractiveItem>

        <InteractiveItem name="camera" position={[-1.2, 0, 0.6]} onHover={onHover} onClick={onItemClick}>
          <Camera />
        </InteractiveItem>

        <InteractiveItem name="books" position={[-1.6, 0, 0.2]} onHover={onHover} onClick={onItemClick}>
          <Books />
        </InteractiveItem>

        <InteractiveItem name="sketch" position={[1.4, 0.01, -0.2]} onHover={onHover} onClick={onItemClick}>
          <PaperAndPencil />
        </InteractiveItem>

        <InteractiveItem name="coffee" position={[1.6, 0, -0.5]} onHover={onHover} onClick={onItemClick}>
          <CoffeeCup />
        </InteractiveItem>

        <group position={[1.7, 0, -0.75]}>
          <Float speed={1.5} rotationIntensity={0} floatIntensity={0.05}>
            <Plant />
          </Float>
        </group>
      </group>

      <OrbitControls
        target={[0, 1.5, -0.5]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.5}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

// ===== 加载占位 =====
function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center bg-[#FFF8F0]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-amber-400 border-t-transparent" />
        <span className="text-sm text-gray-400">加载工作台...</span>
      </div>
    </div>
  );
}

// ===== 主导出 =====
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
          camera={{ position: [5, 4.5, 5], fov: 38 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          style={{ background: "#E8F4FD" }}
          shadows
        >
          <Scene onHover={setHoveredItem} onItemClick={handleItemClick} />
        </Canvas>
      </Suspense>
      <HoverTooltip name={hoveredItem} />
    </div>
  );
}
