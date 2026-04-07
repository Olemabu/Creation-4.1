// stylePresets.ts — Creation 4.0 cinematic style preset library
import { CinematicPreset, StyleCategory } from "../types/creation";

export const STYLE_PRESETS: CinematicPreset[] = [
  // CINEMATIC
  { id: "blade-runner", name: "Blade Runner 2049", description: "Orange/teal neo-noir, vast empty spaces, god rays", promptFragment: "cinematic neo-noir, orange and teal color grading, god rays through smog, vast dystopian architecture, Roger Deakins cinematography, anamorphic lens flare", category: StyleCategory.CINEMATIC, thumbnailColor: "#e8722a" },
  { id: "wes-anderson", name: "Wes Anderson", description: "Symmetrical compositions, pastel palette, deadpan whimsy", promptFragment: "Wes Anderson style, perfectly symmetrical framing, pastel color palette, quirky deadpan aesthetic, flat graphic composition, warm film grain", category: StyleCategory.CINEMATIC, thumbnailColor: "#f4c2a1" },
  { id: "euphoria-glow", name: "Euphoria Glow", description: "Glitter, neon, emotional close-ups", promptFragment: "Euphoria HBO aesthetic, bokeh glitter particles, saturated neon skin tones, extreme emotional close-up, dreamy haze, Marcell Rev cinematography", category: StyleCategory.CINEMATIC, thumbnailColor: "#c084fc" },
  { id: "john-wick-neon", name: "John Wick Neon", description: "Rain-slicked streets, neon reflections, high contrast action", promptFragment: "John Wick action aesthetic, rain-slicked surfaces, neon light reflections, high contrast noir, tactical precision, kinetic action choreography", category: StyleCategory.CINEMATIC, thumbnailColor: "#3b82f6" },
  { id: "godfather", name: "The Godfather", description: "Chiaroscuro shadows, warm amber, Gordon Willis darkness", promptFragment: "Godfather cinematography, deep chiaroscuro shadows, warm amber candlelight, Gordon Willis Prince of Darkness style, 1970s film grain, intimate menace", category: StyleCategory.CINEMATIC, thumbnailColor: "#92400e" },
  { id: "2001-space", name: "2001: A Space Odyssey", description: "Clinical white, cosmic vastness, Kubrick symmetry", promptFragment: "Kubrick 2001 style, clinical sterile white interiors, infinite cosmic black, perfect one-point perspective, HAL red glow", category: StyleCategory.CINEMATIC, thumbnailColor: "#e5e7eb" },
  { id: "apocalypse-now", name: "Apocalypse Now", description: "Jungle heat haze, Vittorio Storaro color", promptFragment: "Apocalypse Now cinematography, dense jungle heat haze, Vittorio Storaro golden hour, napalm orange sky, war-torn surrealism, 35mm grain", category: StyleCategory.CINEMATIC, thumbnailColor: "#f97316" },
  { id: "moonlight", name: "Moonlight", description: "Blue-tinted night, intimate handheld", promptFragment: "Moonlight film aesthetic, deep blue nocturnal palette, intimate handheld cinematography, James Laxton warm skin tones against cool backgrounds, lyrical poetry", category: StyleCategory.CINEMATIC, thumbnailColor: "#1e40af" },
  // DOCUMENTARY
  { id: "vox-style", name: "Vox Explainer", description: "Clean motion graphics, bold colors, educational clarity", promptFragment: "Vox media explainer style, clean bold typography, bright primary colors, motion graphic infographics, clear educational visual language", category: StyleCategory.DOCUMENTARY, thumbnailColor: "#f59e0b" },
  { id: "true-crime", name: "True Crime", description: "Desaturated, archival footage feel, ominous shadows", promptFragment: "true crime documentary aesthetic, desaturated color grade, archival photo texture, dramatic shadow play, tense atmospheric lighting, handheld urgency", category: StyleCategory.DOCUMENTARY, thumbnailColor: "#374151" },
  { id: "historical-archive", name: "Historical Archive", description: "Sepia, aged paper, 1940s newsreel texture", promptFragment: "historical archive documentary style, sepia toning, aged film grain, 1940s newsreel texture, vignette edges, period-accurate visual language", category: StyleCategory.DOCUMENTARY, thumbnailColor: "#d97706" },
  { id: "nature-doc", name: "Nature Documentary", description: "BBC Planet Earth, macro lens, pristine color", promptFragment: "BBC Planet Earth cinematography, 8K ultra HD nature photography, macro lens detail, pristine color science, golden hour wildlife", category: StyleCategory.DOCUMENTARY, thumbnailColor: "#16a34a" },
  // SOCIAL MEDIA
  { id: "mrbeast", name: "MrBeast Hyper-Retention", description: "Extreme color, bold text, kinetic energy", promptFragment: "MrBeast YouTube style, extreme color saturation, bold impact typography, high kinetic energy, viral thumbnail aesthetic, shock and awe visual hooks", category: StyleCategory.SOCIAL_MEDIA, thumbnailColor: "#eab308" },
  { id: "hormozi", name: "Alex Hormozi Captions", description: "Dark background, gold text, authority business", promptFragment: "Alex Hormozi content style, dark high-contrast background, bold gold typography, authority business aesthetic, direct-to-camera confidence", category: StyleCategory.SOCIAL_MEDIA, thumbnailColor: "#ca8a04" },
  { id: "lofi-chillhop", name: "Lo-Fi Chillhop", description: "Anime study aesthetic, rain window, warm lamp", promptFragment: "lo-fi chillhop aesthetic, anime study atmosphere, rain on window, warm desk lamp, cozy nostalgic atmosphere, soft grain, muted pastel colors", category: StyleCategory.SOCIAL_MEDIA, thumbnailColor: "#7c3aed" },
  { id: "tiktok-viral", name: "TikTok Viral", description: "Vertical, punchy cuts, bright skin tones", promptFragment: "TikTok viral video aesthetic, vertical 9:16 framing, punchy saturated skin tones, ultra-fast pacing, trend-native visual language", category: StyleCategory.SOCIAL_MEDIA, thumbnailColor: "#ec4899" },
  // ANIMATION
  { id: "studio-ghibli", name: "Studio Ghibli", description: "Soft watercolor, whimsical nature, Miyazaki warmth", promptFragment: "Studio Ghibli animation style, soft watercolor backgrounds, lush organic environments, Hayao Miyazaki character design, warm nostalgic lighting, gentle whimsy", category: StyleCategory.ANIMATION, thumbnailColor: "#65a30d" },
  { id: "spider-verse", name: "Spider-Verse Glitch", description: "Ben-Day dots, halftone, comic panel energy, RGB split", promptFragment: "Spider-Man Into the Spider-Verse animation style, Ben-Day dots halftone texture, comic book panel energy, RGB chromatic aberration split, bold ink outlines", category: StyleCategory.ANIMATION, thumbnailColor: "#dc2626" },
  { id: "pixar-3d", name: "Pixar 3D", description: "Subsurface skin, global illumination, emotional realism", promptFragment: "Pixar 3D animation style, subsurface scattering skin, global illumination warmth, expressive character faces, rich textural detail, emotional storytelling realism", category: StyleCategory.ANIMATION, thumbnailColor: "#2563eb" },
  { id: "pixel-art", name: "Pixel Art", description: "8-bit retro, limited palette, chunky pixels", promptFragment: "pixel art style, 8-bit retro aesthetic, limited color palette, chunky pixel blocks, nostalgic video game visual language", category: StyleCategory.ANIMATION, thumbnailColor: "#7c3aed" },
  { id: "rotoscope", name: "Rotoscope", description: "A Scanner Darkly, traced over live action", promptFragment: "rotoscope animation style, A Scanner Darkly aesthetic, traced over live action footage, loose painterly line work, surreal color fills", category: StyleCategory.ANIMATION, thumbnailColor: "#0891b2" },
  { id: "anime-classic", name: "Anime Classic", description: "90s cel-shaded, expressive eyes, speed lines", promptFragment: "classic anime style, 90s cel-shading, large expressive eyes, speed motion lines, dramatic reaction shots, vibrant action sequences", category: StyleCategory.ANIMATION, thumbnailColor: "#f43f5e" },
  { id: "classic-disney-2d", name: "Classic Disney 2D", description: "Golden age hand-drawn, fluid curves, warm nostalgia", promptFragment: "classic Disney 2D animation, golden age hand-drawn style, fluid organic curves, warm saturated colors, expressive characters, fairy tale visual language", category: StyleCategory.ANIMATION, thumbnailColor: "#f59e0b" },
  // REALISM
  { id: "photorealism", name: "Photorealism", description: "Indistinguishable from photography, 8K detail", promptFragment: "photorealistic, indistinguishable from photography, 8K resolution, perfect lighting physics, micro-detail textures, physically based rendering", category: StyleCategory.REALISM, thumbnailColor: "#6b7280" },
  { id: "golden-hour", name: "Golden Hour", description: "Magic hour warmth, long shadows, cinematic glow", promptFragment: "golden hour photography, warm amber sunlight, long dramatic shadows, cinematic lens glow, film photography texture, magical hour warmth", category: StyleCategory.REALISM, thumbnailColor: "#f59e0b" },
  { id: "street-photo", name: "Street Photography", description: "Vivian Maier grain, decisive moment, monochrome truth", promptFragment: "street photography style, Vivian Maier black and white, decisive moment composition, 35mm film grain, urban human truth, Cartier-Bresson geometry", category: StyleCategory.REALISM, thumbnailColor: "#374151" },
  // DIGITAL & NICHE
  { id: "cyberpunk", name: "Cyberpunk", description: "Neon rain, chrome implants, dystopian megacity", promptFragment: "cyberpunk aesthetic, neon-drenched rain-soaked megacity, chrome cybernetic implants, holographic advertisements, purple and cyan color palette, dystopian overcrowding", category: StyleCategory.DIGITAL, thumbnailColor: "#a855f7" },
  { id: "vaporwave", name: "Vaporwave", description: "Pink/purple gradient, 80s grid, glitch nostalgia", promptFragment: "vaporwave aesthetic, pink and purple gradient sky, 80s perspective grid, Greek statue glitch art, retro computer terminal, nostalgia distortion", category: StyleCategory.DIGITAL, thumbnailColor: "#ec4899" },
  { id: "synthwave", name: "Synthwave", description: "Outrun retro future, neon grid horizon, chrome typography", promptFragment: "synthwave retro-futurism, Outrun neon grid horizon, chrome speed lines, 80s retrowave sunset, laser grid perspective", category: StyleCategory.DIGITAL, thumbnailColor: "#f43f5e" },
  { id: "darkcore", name: "Dark Academia", description: "Candlelit libraries, aged leather, gothic scholarship", promptFragment: "dark academia aesthetic, candlelit library atmosphere, aged leather-bound books, gothic stone architecture, warm sepia tones, scholarly melancholy", category: StyleCategory.DIGITAL, thumbnailColor: "#78350f" },
  { id: "cottagecore", name: "Cottagecore", description: "Soft meadows, wildflowers, pastoral innocence", promptFragment: "cottagecore aesthetic, soft natural meadows, wildflower abundance, linen textures, pastoral innocence, dappled sunlight through leaves", category: StyleCategory.DIGITAL, thumbnailColor: "#84cc16" },
];

export function getPresetsByCategory(cat: StyleCategory): CinematicPreset[] {
  return STYLE_PRESETS.filter((p) => p.category === cat);
}

export const ALL_CATEGORIES = Object.values(StyleCategory);

export function buildStylePrompt(mix: { preset: string; weight: number }[]): string {
  if (!mix || mix.length === 0) return "";
  const sorted = [...mix].sort((a, b) => b.weight - a.weight);
  return sorted.map((item) => {
    const preset = STYLE_PRESETS.find((p) => p.id === item.preset);
    if (!preset) return "";
    const emphasis = item.weight >= 70 ? "primarily " : item.weight >= 40 ? "" : "subtly ";
    return emphasis + preset.promptFragment;
  }).filter(Boolean).join(", blended with ");
   }
