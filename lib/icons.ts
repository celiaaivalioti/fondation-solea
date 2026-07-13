import {
  Anchor,
  Bird,
  BookOpen,
  Brain,
  Compass,
  Ear,
  Feather,
  Flower2,
  Handshake,
  Heart,
  HeartHandshake,
  Home,
  Leaf,
  Moon,
  Mountain,
  Music,
  Shield,
  Smile,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Sunrise,
  TreePine,
  Users,
  Waves,
  Wind
} from "lucide-react";

// Shared icon set for CMS-selectable section icons (values, approach pillars).
// Keep in sync with the icon options in sanity/schemaTypes.ts.
export const sectionIcons = {
  heartHandshake: HeartHandshake,
  ear: Ear,
  feather: Feather,
  compass: Compass,
  handshake: Handshake,
  mountain: Mountain,
  leaf: Leaf,
  brain: Brain,
  heart: Heart,
  sparkles: Sparkles,
  sun: Sun,
  sunrise: Sunrise,
  moon: Moon,
  flower: Flower2,
  sprout: Sprout,
  tree: TreePine,
  waves: Waves,
  wind: Wind,
  bird: Bird,
  star: Star,
  shield: Shield,
  home: Home,
  users: Users,
  smile: Smile,
  music: Music,
  book: BookOpen,
  anchor: Anchor
} as const;

export type SectionIconName = keyof typeof sectionIcons;

// Unknown values (e.g. added in the CMS before the frontend knows them)
// fall back to a neutral icon instead of crashing the page.
export function getSectionIcon(name: string) {
  return sectionIcons[name as SectionIconName] ?? Sparkles;
}
