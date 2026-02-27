import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, RoundedBox } from "@react-three/drei";
import { Suspense, useState, useRef, useCallback } from "react";
import * as THREE from "three";

// ===== 温馨暖色调 =====
const C = {
  // 房间
  floor: "#D4A574",
  floorLine: "#C89860",
  wall: "#FFF5E8",
  wallSide: "#FFF0E0",
  baseboard: "#D4A574",
  ceiling: "#FFF8F2",

  // 窗户
  windowFrame: "#E8D5C0",
  windowSill: "#D4A574",

  // 窗外风景
  skyTop: "#FF9E6C",
  skyMid: "#FFD4A8",
  skyBottom: "#FFF0D0",
  sun: "#FFE4A0",
  sunGlow: "#FFCC66",
  mountain1: "#8B7EC8",
  mountain2: "#A594D6",
  mountain3: "#BEB0E0",
  hill: "#6AAF6A",
  hillDark: "#5A9A5A",
  tree: "#4A8A4A",
  treeDark: "#3A7A3A",

  // 家具
  desk: "#B8834A",
  deskLeg: "#9A6B3A",

  // 桌面物品
  monitor: "#3D3D5C",
  screen: "#7DD3C8",
  screenCode1: "#FFB347",
  screenCode2: "#87CEEB",
  keyboard: "#E8E8F0",
  keycap: "#D0D0E0",
  keycapAccent: "#FFD700",
  mouse: "#E8E8F0",
  cup: "#FFFAF5",
  coffee: "#8B5E3C",
  book1: "#FFB347",
  book2: "#FF6B6B",
  book3: "#4ECDC4",
  gamepad: "#7070A0",
  gamepadBtn: "#FF6B6B",
  camera: "#7A7AA0",
  cameraLens: "#2A2A3E",
  cameraRec: "#FF4444",
  plant: "#66BB66",
  plantDark: "#4A9A4A",
  pot: "#D4915A",
  lamp: "#FFD700",
  lampShade: "#FFF5CC",
  pencil: "#FF6B6B",
  paper: "#FFFAF5",
  frame: "#B8834A",
  poster: "#FFE8D0",
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

// ===== 窗外风景（远景，在墙后面很远处）=====
function Scenery() {
  return (
    <group position={[0.5, 0, -14]}>
      {/* 天空 — 大背景 */}
      <mesh position={[0, 8, -2]}>
        <planeGeometry args={[40, 10]} />
        <meshBasicMaterial color={C.skyTop} />
      </mesh>
      <mesh position={[0, 4, -2]}>
        <planeGeometry args={[40, 6]} />
        <meshBasicMaterial color={C.skyMid} />
      </mesh>
      <mesh position={[0, 1.5, -2]}>
        <planeGeometry args={[40, 4]} />
        <meshBasicMaterial color={C.skyBottom} />
      </mesh>

      {/* 太阳 */}
      <mesh position={[3, 6, -1]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color={C.sun} />
      </mesh>
      <mesh position={[3, 6, -1.1]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color={C.sunGlow} transparent opacity={0.3} />
      </mesh>

      {/* 远山 */}
      {[[-8, 1.2], [-4, 2], [0, 1.5], [4, 1.8], [8, 1.3]].map(([x, h], i) => (
        <mesh key={`m3-${i}`} position={[x, h / 2, 0]}>
          <coneGeometry args={[3.5, h * 2, 3]} />
          <meshBasicMaterial color={C.mountain3} />
        </mesh>
      ))}
      {/* 中山 */}
      {[[-6, 2], [-2, 2.8], [2, 2.2], [6, 2.5]].map(([x, h], i) => (
        <mesh key={`m2-${i}`} position={[x, h / 2 - 0.3, 1]}>
          <coneGeometry args={[3, h * 2, 3]} />
          <meshBasicMaterial color={C.mountain2} />
        </mesh>
      ))}
      {/* 近山 */}
      {[[-7, 2.5], [-3, 3.2], [1, 2.8], [5, 3], [9, 2.6]].map(([x, h], i) => (
        <mesh key={`m1-${i}`} position={[x, h / 2 - 1, 2]}>
          <coneGeometry args={[3, h * 2, 3]} />
          <meshBasicMaterial color={C.mountain1} />
        </mesh>
      ))}

      {/* 绿色丘陵 */}
      <mesh position={[0, -0.5, 3]}>
        <planeGeometry args={[40, 4]} />
        <meshBasicMaterial color={C.hill} />
      </mesh>

      {/* 树木 */}
      {[-9, -7, -5, -3, -1, 1, 3, 5, 7, 9].map((x, i) => {
        const h = 1 + (i % 3) * 0.5;
        const color = i % 2 === 0 ? C.tree : C.treeDark;
        return (
          <group key={`t-${i}`} position={[x, -0.5, 4]}>
            <mesh position={[0, h * 0.4, 0]}><coneGeometry args={[0.5, h, 6]} /><meshBasicMaterial color={color} /></mesh>
            <mesh position={[0, h * 0.9, 0]}><coneGeometry args={[0.4, h * 0.6, 6]} /><meshBasicMaterial color={color} /></mesh>
          </group>
        );
      })}
    </group>
  );
}

// ===== 房间 =====
function Room() {
  return (
    <group>
      {/* 地板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color={C.floor} roughness={0.7} />
      </mesh>
      {/* 地板条纹 */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`fl${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-4.5 + i, 0.001, 0]}>
          <planeGeometry args={[0.02, 8]} />
          <meshStandardMaterial color={C.floorLine} />
        </mesh>
      ))}

      {/* 后墙 — 窗户处挖空，分四块 */}
      {/* 左段 */}
      <mesh position={[-3.4, 2.5, -4]}>
        <planeGeometry args={[3.2, 5]} />
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </mesh>
      {/* 右段 */}
      <mesh position={[3.9, 2.5, -4]}>
        <planeGeometry args={[2.2, 5]} />
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </mesh>
      {/* 上段（窗户上方）*/}
      <mesh position={[0.5, 4.5, -4]}>
        <planeGeometry args={[4.6, 1]} />
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </mesh>
      {/* 下段（窗户下方）*/}
      <mesh position={[0.5, 0.6, -4]}>
        <planeGeometry args={[4.6, 1.2]} />
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </mesh>

      {/* 后墙踢脚线 */}
      <mesh position={[0, 0.12, -3.97]}>
        <boxGeometry args={[10, 0.25, 0.08]} />
        <meshStandardMaterial color={C.baseboard} roughness={0.6} />
      </mesh>

      {/* 左墙 (部分可见) */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color={C.wallSide} roughness={0.9} />
      </mesh>
      {/* 右墙 (部分可见) */}
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color={C.wallSide} roughness={0.9} />
      </mesh>

      {/* 地毯 */}
      <group position={[0, 0.003, 0.5]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 2.8]} />
          <meshStandardMaterial color="#C4A882" roughness={0.95} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.001]}>
          <planeGeometry args={[3.4, 2.4]} />
          <meshStandardMaterial color="#D4B892" roughness={0.95} />
        </mesh>
      </group>
    </group>
  );
}

// ===== 大窗户 =====
function BigWindow() {
  const frameW = 4.5;
  const frameH = 2.8;
  const bar = 0.1;

  return (
    <group position={[0.5, 2.6, -3.96]}>
      {/* 窗框 — 外框 */}
      {/* 上 */}
      <mesh position={[0, frameH / 2 + bar / 2, 0.02]}>
        <boxGeometry args={[frameW + bar * 2, bar, 0.08]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.4} />
      </mesh>
      {/* 下 */}
      <mesh position={[0, -frameH / 2 - bar / 2, 0.02]}>
        <boxGeometry args={[frameW + bar * 2, bar, 0.08]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.4} />
      </mesh>
      {/* 左 */}
      <mesh position={[-frameW / 2 - bar / 2, 0, 0.02]}>
        <boxGeometry args={[bar, frameH, 0.08]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.4} />
      </mesh>
      {/* 右 */}
      <mesh position={[frameW / 2 + bar / 2, 0, 0.02]}>
        <boxGeometry args={[bar, frameH, 0.08]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.4} />
      </mesh>
      {/* 中间竖棂 */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.06, frameH, 0.06]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.4} />
      </mesh>
      {/* 中间横棂 */}
      <mesh position={[0, 0.2, 0.02]}>
        <boxGeometry args={[frameW, 0.06, 0.06]} />
        <meshStandardMaterial color={C.windowFrame} roughness={0.4} />
      </mesh>

      {/* 窗台 */}
      <mesh position={[0, -frameH / 2 - bar, 0.15]}>
        <boxGeometry args={[frameW + 0.4, 0.08, 0.3]} />
        <meshStandardMaterial color={C.windowSill} roughness={0.5} />
      </mesh>
      {/* 窗台上的小盆栽 */}
      <group position={[1.6, -frameH / 2 - bar + 0.12, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.04, 0.08, 8]} />
          <meshStandardMaterial color={C.pot} roughness={0.6} />
        </mesh>
        {[0, 1.5, 3, 4.5].map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 0.02, 0.06 + i * 0.008, Math.sin(a) * 0.02]}>
            <sphereGeometry args={[0.03, 5, 4]} />
            <meshStandardMaterial color={i % 2 === 0 ? C.plant : C.plantDark} roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ===== 墙面画框 =====
function WallArt() {
  return (
    <group position={[-3.2, 2.8, -3.94]}>
      {/* 画框 */}
      <mesh>
        <boxGeometry args={[0.9, 0.7, 0.04]} />
        <meshStandardMaterial color={C.frame} roughness={0.5} />
      </mesh>
      {/* 画布 */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshStandardMaterial color={C.poster} roughness={0.9} />
      </mesh>
      {/* 简笔画 — 小山 */}
      <mesh position={[-0.1, -0.08, 0.03]}>
        <coneGeometry args={[0.15, 0.2, 3]} />
        <meshBasicMaterial color="#88BB88" />
      </mesh>
      <mesh position={[0.12, -0.05, 0.03]}>
        <coneGeometry args={[0.1, 0.15, 3]} />
        <meshBasicMaterial color="#99CC99" />
      </mesh>
      {/* 小太阳 */}
      <mesh position={[0.2, 0.12, 0.03]}>
        <circleGeometry args={[0.05, 12]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

// ===== 桌面 =====
function Desk() {
  return (
    <group position={[0, 0, -1.5]}>
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
        <meshStandardMaterial color={C.screen} emissive={C.screen} emissiveIntensity={0.12} roughness={0.1} />
      </mesh>
      {[0.2, 0.08, -0.04, -0.16, -0.28].map((y, i) => (
        <mesh key={i} position={[-0.15 + i * 0.03, 0.55 + y, 0.038]}>
          <planeGeometry args={[0.5 + Math.random() * 0.4, 0.04]} />
          <meshStandardMaterial color={i % 2 === 0 ? C.screenCode1 : C.screenCode2} emissive={i % 2 === 0 ? C.screenCode1 : C.screenCode2} emissiveIntensity={0.08} transparent opacity={0.7} />
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

function Keyboard() {
  return (
    <group>
      <RoundedBox args={[1, 0.05, 0.4]} radius={0.02}>
        <meshStandardMaterial color={C.keyboard} roughness={0.5} />
      </RoundedBox>
      {[-0.12, -0.04, 0.04, 0.12].map((z, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <mesh key={`${row}-${col}`} position={[-0.36 + col * 0.08, 0.035, z]}>
            <boxGeometry args={[0.06, 0.02, 0.06]} />
            <meshStandardMaterial color={row === 1 && col === 4 ? C.keycapAccent : C.keycap} roughness={0.4} />
          </mesh>
        ))
      )}
    </group>
  );
}

function Mouse() {
  return (
    <mesh>
      <capsuleGeometry args={[0.04, 0.06, 4, 8]} />
      <meshStandardMaterial color={C.mouse} roughness={0.3} />
    </mesh>
  );
}

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

function Books() {
  return (
    <group>
      <RoundedBox args={[0.35, 0.06, 0.25]} radius={0.01}><meshStandardMaterial color={C.book1} roughness={0.7} /></RoundedBox>
      <RoundedBox args={[0.32, 0.05, 0.25]} radius={0.01} position={[0.01, 0.055, 0]}><meshStandardMaterial color={C.book2} roughness={0.7} /></RoundedBox>
      <RoundedBox args={[0.3, 0.04, 0.22]} radius={0.01} position={[-0.01, 0.1, 0]}><meshStandardMaterial color={C.book3} roughness={0.7} /></RoundedBox>
    </group>
  );
}

function Gamepad() {
  return (
    <group rotation={[0.1, 0.3, 0]}>
      <RoundedBox args={[0.3, 0.06, 0.2]} radius={0.03}><meshStandardMaterial color={C.gamepad} roughness={0.4} /></RoundedBox>
      <mesh position={[-0.12, -0.02, 0.06]} rotation={[0.3, 0, -0.2]}><capsuleGeometry args={[0.03, 0.08, 4, 8]} /><meshStandardMaterial color={C.gamepad} roughness={0.4} /></mesh>
      <mesh position={[0.12, -0.02, 0.06]} rotation={[0.3, 0, 0.2]}><capsuleGeometry args={[0.03, 0.08, 4, 8]} /><meshStandardMaterial color={C.gamepad} roughness={0.4} /></mesh>
      {[[0.08, 0.04, -0.02], [0.11, 0.04, -0.05], [0.05, 0.04, -0.05], [0.08, 0.04, -0.08]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}><sphereGeometry args={[0.015, 8, 8]} /><meshStandardMaterial color={[C.gamepadBtn, C.lamp, C.screen, C.book1][i]} emissive={[C.gamepadBtn, C.lamp, C.screen, C.book1][i]} emissiveIntensity={0.2} /></mesh>
      ))}
      <mesh position={[-0.06, 0.05, -0.04]}><cylinderGeometry args={[0.025, 0.025, 0.03, 8]} /><meshStandardMaterial color="#3A3A50" roughness={0.3} /></mesh>
    </group>
  );
}

function Camera() {
  return (
    <group rotation={[0, -0.4, 0]}>
      <RoundedBox args={[0.2, 0.14, 0.12]} radius={0.02}><meshStandardMaterial color={C.camera} roughness={0.4} /></RoundedBox>
      <mesh position={[0, 0, 0.1]}><cylinderGeometry args={[0.04, 0.05, 0.08, 16]} /><meshStandardMaterial color={C.cameraLens} roughness={0.2} metalness={0.5} /></mesh>
      <mesh position={[0, 0, 0.145]}><circleGeometry args={[0.035, 16]} /><meshStandardMaterial color="#8899BB" roughness={0.1} metalness={0.6} /></mesh>
      <mesh position={[0.08, 0.06, 0.04]}><sphereGeometry args={[0.012, 8, 8]} /><meshStandardMaterial color={C.cameraRec} emissive={C.cameraRec} emissiveIntensity={0.8} /></mesh>
    </group>
  );
}

function DeskLamp() {
  return (
    <group>
      <mesh><cylinderGeometry args={[0.1, 0.12, 0.04, 16]} /><meshStandardMaterial color={C.lamp} roughness={0.3} metalness={0.3} /></mesh>
      <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.015, 0.015, 0.5, 8]} /><meshStandardMaterial color={C.lamp} roughness={0.3} metalness={0.3} /></mesh>
      <mesh position={[0.08, 0.48, 0]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.015, 0.015, 0.2, 8]} /><meshStandardMaterial color={C.lamp} roughness={0.3} metalness={0.3} /></mesh>
      <mesh position={[0.15, 0.52, 0]} rotation={[0, 0, -0.3]}><coneGeometry args={[0.1, 0.12, 16, 1, true]} /><meshStandardMaterial color={C.lampShade} roughness={0.5} side={THREE.DoubleSide} /></mesh>
      <pointLight position={[0.15, 0.46, 0]} color="#FFF0CC" intensity={1.5} distance={3} decay={2} />
    </group>
  );
}

function Plant() {
  return (
    <group>
      <mesh><cylinderGeometry args={[0.06, 0.05, 0.1, 8]} /><meshStandardMaterial color={C.pot} roughness={0.6} /></mesh>
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.03, 0.08 + i * 0.01, Math.sin(angle) * 0.03]} rotation={[0.3 * Math.cos(angle), angle, 0.3 * Math.sin(angle)]}>
          <sphereGeometry args={[0.04, 6, 4]} />
          <meshStandardMaterial color={i % 2 === 0 ? C.plant : C.plantDark} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function PaperAndPencil() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0.1]}><planeGeometry args={[0.3, 0.4]} /><meshStandardMaterial color={C.paper} roughness={0.9} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0.1, 0.02, 0.05]} rotation={[0, 0.5, Math.PI / 2]}><cylinderGeometry args={[0.008, 0.008, 0.25, 6]} /><meshStandardMaterial color={C.pencil} roughness={0.5} /></mesh>
      <mesh position={[0.21, 0.02, 0.01]} rotation={[0, 0.5, Math.PI / 2]}><coneGeometry args={[0.008, 0.03, 6]} /><meshStandardMaterial color="#F5DEB3" roughness={0.5} /></mesh>
    </group>
  );
}

// ===== 悬停提示 =====
function HoverTooltip({ name }: { name: string | null }) {
  if (!name || !ITEM_CONFIG[name]) return null;
  const config = ITEM_CONFIG[name];
  return (
    <div className="pointer-events-none absolute left-1/2 bottom-20 z-20 -translate-x-1/2 animate-[fadeIn_0.2s_ease]">
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200/50 bg-white/85 px-5 py-3 shadow-xl backdrop-blur-md">
        <span className="text-base font-semibold text-gray-800">{config.label}</span>
        <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-700">
          {config.hint}
        </span>
      </div>
    </div>
  );
}

// ===== 场景 =====
function Scene({ onHover, onItemClick }: { onHover: (name: string | null) => void; onItemClick: (name: string) => void }) {
  return (
    <>
      {/* 温暖光照 */}
      <ambientLight intensity={0.5} color="#FFF5E8" />
      {/* 窗户暖阳 */}
      <directionalLight position={[1, 5, 3]} intensity={1.0} color="#FFE8C0" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      {/* 侧面补光 */}
      <directionalLight position={[-3, 3, 1]} intensity={0.25} color="#E8E0FF" />
      <Environment preset="apartment" />

      {/* 窗外风景（在墙后面）*/}
      <Scenery />

      {/* 房间 */}
      <Room />
      <BigWindow />
      <WallArt />

      {/* 桌子 */}
      <Desk />

      {/* 桌面物品 */}
      <group position={[0, 1.06, -1.5]}>
        <InteractiveItem name="monitor" position={[0, 0, -0.5]} onHover={onHover} onClick={onItemClick}>
          <Monitor />
        </InteractiveItem>

        <group position={[0, 0, 0.2]}><Keyboard /></group>
        <group position={[0.65, 0, 0.2]} rotation={[-Math.PI / 2, 0, 0]}><Mouse /></group>
        <group position={[-1.5, 0, -0.4]}><DeskLamp /></group>

        <InteractiveItem name="gamepad" position={[1.2, 0, 0.5]} onHover={onHover} onClick={onItemClick}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.08}><Gamepad /></Float>
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
          <Float speed={1.5} rotationIntensity={0} floatIntensity={0.05}><Plant /></Float>
        </group>
      </group>

      <OrbitControls
        target={[0, 1.5, -1]}
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

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center" style={{ background: "linear-gradient(to bottom, #FFE8C0, #FFF5E8)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-amber-400 border-t-transparent" />
        <span className="text-sm text-amber-400/60">加载中...</span>
      </div>
    </div>
  );
}

export default function DeskScene() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = useCallback((name: string) => {
    const config = ITEM_CONFIG[name];
    if (config) window.location.href = config.href;
  }, []);

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 3.8, 4], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          style={{ background: "linear-gradient(to bottom, #FFE0B0, #FFF5E8)" }}
          shadows
        >
          <Scene onHover={setHoveredItem} onItemClick={handleItemClick} />
        </Canvas>
      </Suspense>
      <HoverTooltip name={hoveredItem} />
    </div>
  );
}
