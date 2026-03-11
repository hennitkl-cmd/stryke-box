import { useRef, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import logoTexture from "@/assets/logo-stryke.png";
import { ArrowDown } from "lucide-react";

const WristSleeve = ({ rotationY }: {rotationY: number;}) => {
  const groupRef = useRef<THREE.Group>(null);
  const logo = useTexture(logoTexture);

  // Make logo texture transparent-friendly
  useMemo(() => {
    logo.colorSpace = THREE.SRGBColorSpace;
  }, [logo]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
      // Gentle idle float
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
    }
  });

  // Create sleeve shape using LatheGeometry for realistic tapered cylinder
  const sleeveGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const segments = 40;
    const height = 3.2;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = t * height - height / 2;
      // Slight taper: wider at top (wrist), narrower at bottom (forearm)
      let radius = 1.0 + Math.sin(t * Math.PI) * 0.08;
      // Taper effect
      radius *= 1.0 - t * 0.06;
      points.push(new THREE.Vector2(radius, y));
    }
    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Fabric material - matte black compression fabric look
  const fabricMaterial = useMemo(
    () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color("hsl(0, 0%, 8%)"),
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide
    }),
    []
  );

  // Red accent material for stitching lines
  const redAccentMaterial = useMemo(
    () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color("hsl(0, 100%, 40%)"),
      roughness: 0.5,
      metalness: 0.2,
      emissive: new THREE.Color("hsl(0, 100%, 30%)"),
      emissiveIntensity: 0.5
    }),
    []
  );

  // Sensor material - dark grey tech look
  const sensorMaterial = useMemo(
    () =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color("hsl(0, 0%, 20%)"),
      roughness: 0.3,
      metalness: 0.6
    }),
    []
  );

  // Logo material using the Stryke logo as a texture on a plane
  const logoMaterial = useMemo(
    () =>
    new THREE.MeshStandardMaterial({
      map: logo,
      transparent: true,
      roughness: 0.4,
      metalness: 0.3,
      emissive: new THREE.Color("hsl(0, 100%, 35%)"),
      emissiveIntensity: 0.3
    }),
    [logo]
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.3}>
      {/* Main sleeve body */}
      <mesh geometry={sleeveGeometry} material={fabricMaterial} />

      {/* Red accent line - top edge */}
      <mesh position={[0, 1.55, 0]}>
        <torusGeometry args={[1.0, 0.025, 8, 64]} />
        <primitive object={redAccentMaterial} attach="material" />
      </mesh>

      {/* Red accent line - bottom edge */}
      <mesh position={[0, -1.55, 0]}>
        
        <primitive object={redAccentMaterial} attach="material" />
      </mesh>

      {/* Red accent line - middle */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[1.01, 0.015, 8, 64]} />
        <primitive object={redAccentMaterial} attach="material" />
      </mesh>

      {/* Logo on front */}
      <mesh position={[0, 0.2, 1.05]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.9, 0.9]} />
        <primitive object={logoMaterial} attach="material" />
      </mesh>

      {/* Sensor pad on the inside/back */}
      <mesh position={[0, -0.3, -1.03]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.8, 1.2]} />
        <primitive object={sensorMaterial} attach="material" />
      </mesh>

      {/* Small sensor dots */}
      {[-0.2, 0, 0.2].map((x, i) =>
      <mesh key={i} position={[x, -0.3, -1.06]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.06, 16]} />
          <primitive
          object={
          new THREE.MeshStandardMaterial({
            color: new THREE.Color("hsl(0, 100%, 40%)"),
            emissive: new THREE.Color("hsl(0, 100%, 40%)"),
            emissiveIntensity: 0.8,
            roughness: 0.2
          })
          }
          attach="material" />
        
        </mesh>
      )}

      {/* Vertical stitch lines */}
      {[0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map((angle, i) =>
      <mesh key={`stitch-${i}`} position={[Math.sin(angle) * 1.01, 0, Math.cos(angle) * 1.01]} rotation={[0, angle, 0]}>
          <boxGeometry args={[0.008, 3.0, 0.008]} />
          <primitive object={redAccentMaterial.clone()} attach="material" />
        </mesh>
      )}
    </group>);

};

// Wrapper that receives scroll progress and passes to Three.js
const Scene = ({ progress }: {progress: number;}) => {
  const rotationY = progress * Math.PI * 2;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <spotLight
        position={[-3, 2, 4]}
        intensity={1.5}
        color="hsl(0, 100%, 40%)"
        angle={0.6}
        penumbra={0.8}
        distance={15} />
      
      <spotLight
        position={[3, -2, -4]}
        intensity={0.8}
        color="hsl(0, 100%, 50%)"
        angle={0.5}
        penumbra={1}
        distance={12} />
      
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#ffffff" />
      <WristSleeve rotationY={rotationY} />
    </>);

};

// RoundedRect helper - simple fallback since drei's might not be available as geometry
// We'll use a regular plane instead for the sensor area

const ProductHero3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [webGLSupported] = useState(() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
    } catch {
      return false;
    }
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.95]);

  // Track progress as a number for Three.js
  const [currentProgress, setCurrentProgress] = useState(0);
  progress.on("change", (v) => setCurrentProgress(v));

  return (
    <section ref={sectionRef} className="relative h-[200vh]" id="product-3d">
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(0 100% 40% / 0.4) 0%, transparent 70%)"
            }} />
          
        </div>

        {/* 3D Canvas */}
        <div className="relative w-full h-[60vh] md:h-[70vh] max-w-4xl mx-auto">
          {webGLSupported ?
          <Suspense
            fallback={
            <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }>
            
              <Canvas
              gl={{ alpha: true, antialias: true }}
              camera={{ position: [0, 0, 5.5], fov: 45 }}
              style={{ background: "transparent" }}>
              
                <Scene progress={currentProgress} />
              </Canvas>
            </Suspense> :

          <div className="w-full h-full flex items-center justify-center">
              <img
              src="/product-reference.jpeg"
              alt="STRYKE Sensor Sleeve"
              className="max-h-full object-contain" />
            
            </div>
          }
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-4 md:mt-8 px-4">
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            STRYKE <span className="text-gradient-red">Sensor</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Compression Wrist Sleeve mit integrierter Sensortechnik
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 flex flex-col items-center gap-2">
          
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}>
            
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>);

};

export default ProductHero3D;