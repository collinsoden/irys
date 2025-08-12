"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Float, Stars } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useState } from "react";
import { Card, CardContent, Button, Input, Container } from "@/components/ui";
import { Layout } from "@/components/layout"
import Link from "next/link";
import SearchPanel from "@/components/layout/Search";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Get data from upload endpoint
async function fetchData() {
// Get last 7 days to now
  const from = Math.floor(Date.now() / 1000) - (24 * 7) * 60 * 60;
  const to = Math.floor(Date.now() / 1000);

  const response = await fetch(`${baseUrl}/api/upload?from=${from}&to=${to}`);
  const data = await response.json();
  return data;
}

// Generate positions for data items
function generateSpherePositions(count: number, radius = 10) {
  const positions: [number, number, number][] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const y = ((i * offset) - 1) + (offset / 2);
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    positions.push([x * radius, y * radius, z * radius]);
  }
  return positions;
}

const dateNow = Date.now();
const sampleData = [
  {
    node: {
      id: "1",
      address: "0x1",
      size: 2000,
      timestamp: dateNow,
      position: [0, 0, 0],
      tags: [{ name: "Content-Type", value: "image/png" }]
    }
  },
  {
    node: {
      id: "2",
      address: "0x2",
      size: 3000,
      timestamp: dateNow,
      position: [10, 5, -5],
      tags: [{ name: "Content-Type", value: "image/jpeg" }]
    }
  },
  {
    node: {
      id: "3",
      address: "0x3",
      size: 1500,
      timestamp: dateNow,
      position: [-12, -7, 8],
      tags: [{ name: "Content-Type", value: "image/gif" }]
    }
  }
];

const fetchedData = await fetchData();
// Log only tags
console.log("Fetched data tags:", fetchedData?.transactions?.edges.map((edge: any) => edge.node.tags));
// Set positions and timestamp to localtime for readability
const fetched = fetchedData?.transactions?.edges || sampleData;
const positions = generateSpherePositions(fetched.length, 12);
const irysData = fetched.map((item: any, idx: any) => ({
  ...item,
  node: {
    ...item.node,
    position: positions[idx]
  }
}));

function DataNode({ position = [0, 0, 0], info }: { position?: [number, number, number] | any, info: {
  id: string,
  address: string,
  tags: [{ name: string, value: string }],
  size: number,
  signature: string,
  timestamp: Date,
} }) {
  // if tags[index].name === "Content-Type" && tags[index].value === "image/png", then use the image as background instead of the sphere
  const contentTypeTag = info.tags.find((tag) => tag.name === "Content-Type");
  const contentType = contentTypeTag?.value || "";
  let imageUrl = null;

  if (contentType.includes("image/")) {
    // Priority 1: load image directly
    imageUrl = useLoader(
      THREE.TextureLoader,
      `https://gateway.irys.xyz/${info.id}`
    );
  } else if (contentType.includes("game") || contentType.includes("Irys-Arcade")) {
    // Priority 2: game icon
    imageUrl = useLoader(THREE.TextureLoader, "/assets/icons/game.png");
  } else if (contentType === "application/json") {
    // Priority 3: JSON icon
    imageUrl = useLoader(THREE.TextureLoader, "/assets/icons/json.png");
  } else {
    // Fallback image icon if nothing matches
    imageUrl = useLoader(THREE.TextureLoader, "/assets/icons/image.png");
  }

  return (
   <Float speed={2} rotationIntensity={1} floatIntensity={2}>
  <mesh position={position} scale={[1.2, 1.2, 1.2]}>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial
      map={imageUrl || null}
      color={imageUrl ? "white" : "#00FFD1"}
      emissive={imageUrl ? "#000" : "#0ff"}
      emissiveIntensity={0.4}
    />
    <Html distanceFactor={5} position={position}>
      <Link
        href={`https://testnet-explorer.irys.xyz/address/${info.address}`}
        target="_blank"
      >
        <div
          className="
            bg-gradient-to-br from-theme/80 via-[#003E3A]/80 to-[#001E1C]/90
            backdrop-blur-md border border-[#00FFD1]/30
            text-white px-4 py-2 rounded-xl
            shadow-lg shadow-[#00FFD1]/30
            space-y-1 min-w-[180px]
            transition-all duration-300
            hover:scale-300 hover:shadow-[#00FFD1]/60
          "
        >
          <div className="truncate">
            <span className="font-semibold text-[#00FFD1]">Owner:</span>{" "}
            {info.address}
          </div>
          <div>
            <span className="font-semibold text-[#00FFD1]">Size:</span>{" "}
            {(info.size / 1024).toFixed(2)} mb
          </div>
          <div>
            <span className="font-semibold text-[#00FFD1]">Upload Date:</span>{" "}
            {info.timestamp instanceof Date
              ? info.timestamp.toLocaleString()
              : new Date(info.timestamp).toLocaleString()}
          </div>
          {/* On hover, show a table mapping all content type in a tabular form: Name | Value */}
            <div className="relative">
            <div className="absolute left-0 top-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
              <table className="mt-2 text-sm border border-theme rounded-lg shadow-lg min-w-[180px] max-w-xs break-words table-fixed">
              <tbody>
                {info.tags.map((tag, index) => (
                <tr key={index}>
                  <td className="font-semibold text-theme border border-theme p-1 align-top break-words max-w-[80px]">{tag.name}</td>
                  <td className="text-gray-300 border border-theme p-1 break-words max-w-[120px]">{tag.value}</td>
                </tr>
                ))}
              </tbody>
              </table>
            </div>
            </div>
          <p className="text-xs text-theme hover:underline mt-1">
            Click to view upload details.
          </p>
        </div>
      </Link>
    </Html>
  </mesh>
</Float>
  );
}

function IrysCanvas() {
  return (
   <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <Stars radius={100} depth={50} count={5000} factor={4} fade speed={2} />
    {irysData.map((d: any) => (
      <DataNode key={d.node.id} position={d.node.position} info={d.node} />
    ))}
    <OrbitControls enableZoom enablePan enableRotate enableDamping dampingFactor={0.25} />
  </Canvas>
  );
}

export default function Explorer3DPage() {
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <div className="p-8 space-y-10 bg-theme-black px-12 text-center align-middle justify-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-theme">Iryz Explorer 3D</h1>
          <p className="text-lg text-muted-foreground">
            Explore Irys-powered uploads and transactions in an immersive 3D environment.
            Learn by doing, seeing, and interacting with real Irys data.
            <br />
            Only data uploaded within the last 7 days is shown here.
          </p>
        </div>

        {/* Search Panel */}
        <SearchPanel onSearch={setSearch} />

           {/* 3D Portal */}
              <section className="py-24 mt-8">
                <Container className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1.3 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold text-theme mb-4">Step Into the Data Metaverse</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-10">
                      Our 3D interface lets you zoom into uploads, follow data trails, and visualize the Irys network like never before.
                    </p>
                    <div className="aspect-video w-full max-w-5xl mx-auto bg-theme/10 rounded-xl border border-theme shadow-md flex items-center justify-center">
                        <IrysCanvas />
                    </div>
                  </motion.div>
                </Container>
              </section>

        {/* Activity Feed */}
        <div className="max-w-7xl mx-auto space-y-4 mt-8">
          <h2 className="text-2xl font-semibold text-theme">🔄 Live Upload Feed</h2>
            <table className="bg-background border rounded-md divide-y min-w-full text-left">
              <thead>
              <tr className="bg-muted text-theme">
                <th className="px-4 py-2">Wallet</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Time Uploaded</th>
              </tr>
              </thead>
              <tbody>
                {irysData.map((data: any) => (
                    <tr key={data.node.id} className="hover:bg-muted transition-colors">
                      <td className="px-4 py-2">
                        <Link href={`/explore/${data.node.id}`} className="hover:bg-muted transition-colors cursor-pointer">
                          {data.node.address}
                        </Link>
                      </td>
                      <td className="px-4 py-2"> {data.node.tags.map((tag: any, idx: number) => (
                          <span key={idx + "_" + data.node.id} className="inline-block bg-muted text-theme rounded-full px-2 py-1 text-xs font-semibold mr-2">
                            {tag.value} {idx < data.node.tags.length - 1 && ","}
                          </span>
                        ))} </td>
                      <td className="px-4 py-2"> {(data.node.size / 1024).toFixed(2)} mb </td>
                      <td className="px-4 py-2">
                        <Link href={`/explore/${data.node.id}`} className="hover:bg-muted transition-colors cursor-pointer">
                        {data.node.timestamp instanceof Date
                        ? data.node.timestamp.toLocaleString()
                        : new Date(data.node.timestamp).toLocaleString()}
                        </Link>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>

        {/* Try Irys Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2 text-theme">🧪 Try Irys</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">Simulate uploading a file to Irys testnet</p>
              <Input type="file" />
              <Button>Upload (Test Only)</Button>
            </CardContent>
          </Card>
        </div>

        {/* Learning Prompts */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold text-theme">📦 What happens when you upload?</h3>
              <p className="text-muted-foreground">
                The data is permanently stored, anchored to a transaction hash, and accessible via a permanent URL.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold text-theme">🔗 Explore real TXs</h3>
              <p className="text-muted-foreground">
                Click on any node in the 3D view to reveal the wallet, file type, and permanent links.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
