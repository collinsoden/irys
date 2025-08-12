// data/navigation.ts
import { MenuItem } from "@/types/navigation";

export const mainNavigation: MenuItem[] = [
  {
    id: "3d",
    label: "3D View",
    href: "/3d", // IrysExplorer 3D
  },
  {
  id: "upload",
  label: "Upload",
  href: "/upload", // interactive upload UI
  },
  {
    id: "explorer",
    label: "Explorer",
    href: "/explorer", // real-time or indexed upload feed
  },
  {
    id: "learn",
    label: "Learn Irys",
    href: "/learn", // tutorials, guides, quests
  },
  {
    id: "about",
    label: "About",
    href: "/about",
  },
];

export const highlightedNavigation: MenuItem = {
  id: "start-quest",
  label: "Start Quest",
  href: "/quest",
  isHighlighted: true,
};

export const socialLinks: MenuItem[] = [
  {
    id: "twitter",
    label: "Twitter",
    href: "https://x.com/intent/user?screen_name=__serverless",
    isExternal: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/irys-xyz",
    isExternal: true,
  },
  {
    id: "docs",
    label: "Docs",
    href: "https://docs.irys.xyz/",
    isExternal: true,
  },
];