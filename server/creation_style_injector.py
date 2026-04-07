# creation_style_injector.py
# Creation 4.0 — style injection engine
# Wraps every ArcReel image/video generation call with Creation's style layer

from __future__ import annotations
from typing import Optional

STYLE_FRAGMENTS: dict[str, str] = {
    "blade-runner": "cinematic neo-noir, orange and teal color grading, god rays through smog, vast dystopian architecture, Roger Deakins cinematography, anamorphic lens flare",
    "wes-anderson": "Wes Anderson style, perfectly symmetrical framing, pastel color palette, quirky deadpan aesthetic, flat graphic composition, warm film grain",
    "euphoria-glow": "Euphoria HBO aesthetic, bokeh glitter particles, saturated neon skin tones, extreme emotional close-up, dreamy haze",
    "john-wick-neon": "John Wick action aesthetic, rain-slicked surfaces, neon light reflections, high contrast noir, tactical precision, kinetic action choreography",
    "godfather": "Godfather cinematography, deep chiaroscuro shadows, warm amber candlelight, Gordon Willis Prince of Darkness style, 1970s film grain",
    "2001-space": "Kubrick 2001 style, clinical sterile white interiors, infinite cosmic black, perfect one-point perspective, HAL red glow",
    "apocalypse-now": "Apocalypse Now cinematography, dense jungle heat haze, Vittorio Storaro golden hour, napalm orange sky, war-torn surrealism",
    "moonlight": "Moonlight film aesthetic, deep blue nocturnal palette, intimate handheld cinematography, James Laxton warm skin tones",
    "vox-style": "Vox media explainer style, clean bold typography, bright primary colors, motion graphic infographics, educational visual language",
    "true-crime": "true crime documentary aesthetic, desaturated color grade, archival photo texture, dramatic shadow play, tense atmospheric lighting",
    "historical-archive": "historical archive documentary style, sepia toning, aged film grain, 1940s newsreel texture, vignette edges",
    "nature-doc": "BBC Planet Earth cinematography, 8K ultra HD nature photography, macro lens detail, pristine color science, golden hour wildlife",
    "mrbeast": "extreme color saturation, bold impact typography, high kinetic energy, viral thumbnail aesthetic, shock and awe visual hooks",
    "hormozi": "Alex Hormozi content style, dark high-contrast background, bold gold typography, authority business aesthetic, direct-to-camera confidence",
    "lofi-chillhop": "lo-fi chillhop aesthetic, anime study atmosphere, rain on window, warm desk lamp, cozy nostalgic atmosphere, soft grain",
    "tiktok-viral": "TikTok viral video aesthetic, vertical 9:16 framing, punchy saturated skin tones, ultra-fast pacing, trend-native visual language",
    "studio-ghibli": "Studio Ghibli animation style, soft watercolor backgrounds, lush organic environments, Hayao Miyazaki character design, warm nostalgic lighting",
    "spider-verse": "Spider-Man Into the Spider-Verse, Ben-Day dots halftone texture, comic book panel energy, RGB chromatic aberration split, bold ink outlines",
    "pixar-3d": "Pixar 3D animation style, subsurface scattering skin, global illumination warmth, expressive character faces, rich textural detail",
    "pixel-art": "pixel art style, 8-bit retro aesthetic, limited color palette, chunky pixel blocks, nostalgic video game visual language",
    "rotoscope": "rotoscope animation style, A Scanner Darkly aesthetic, traced over live action footage, loose painterly line work, surreal color fills",
    "anime-classic": "classic anime style, 90s cel-shading, large expressive eyes, speed motion lines, dramatic reaction shots",
    "classic-disney-2d": "classic Disney 2D animation, golden age hand-drawn style, fluid organic curves, warm saturated colors, expressive characters",
    "photorealism": "photorealistic, indistinguishable from photography, 8K resolution, perfect lighting physics, micro-detail textures, physically based rendering",
    "golden-hour": "golden hour photography, warm amber sunlight, long dramatic shadows, cinematic lens glow, film photography texture",
    "street-photo": "street photography style, Vivian Maier black and white, decisive moment composition, 35mm film grain, urban human truth",
    "cyberpunk": "cyberpunk aesthetic, neon-drenched rain-soaked megacity, chrome cybernetic implants, holographic advertisements, purple and cyan palette",
    "vaporwave": "vaporwave aesthetic, pink and purple gradient sky, 80s perspective grid, Greek statue glitch art, retro nostalgia distortion",
    "synthwave": "synthwave retro-futurism, Outrun neon grid horizon, chrome speed lines, 80s retrowave sunset, laser grid perspective",
    "darkcore": "dark academia aesthetic, candlelit library atmosphere, aged leather-bound books, gothic stone architecture, scholarly melancholy",
    "cottagecore": "cottagecore aesthetic, soft natural meadows, wildflower abundance, linen textures, pastoral innocence, dappled sunlight",
}

CAMERA_FRAGMENTS: dict[str, str] = {
    "static": "static locked-off shot",
    "zoomIn": "slow zoom in, pulling viewer into the scene",
    "zoomOut": "slow pull back zoom, revealing the wider world",
    "zoomToCenter": "zoom to center focal point",
    "panLeft": "smooth pan left, tracking movement",
    "panRight": "smooth pan right, revealing the scene",
    "panUp": "tilt up, ascending reveal",
    "panDown": "tilt down, descending gaze",
    "panUpLeft": "diagonal pan up-left",
    "panUpRight": "diagonal pan up-right, heroic reveal",
    "panDownLeft": "diagonal pan down-left",
    "panDownRight": "diagonal pan down-right",
    "tiltUp": "dramatic tilt up, towering presence",
    "tiltDown": "tilt down, descending gaze",
    "shake": "handheld shake, intense action energy, unstable urgency",
}

SHOT_FRAGMENTS: dict[str, str] = {
    "wide": "wide establishing shot, full environment visible",
    "medium": "medium shot, subject from waist up",
    "closeUp": "close-up shot, face and expression dominant",
    "extremeCloseUp": "extreme close-up, intense detail, eyes or object filling frame",
}


def build_style_prompt(style_mix: list[dict], visual_dna: Optional[dict] = None) -> str:
    if not style_mix:
        return ""
    sorted_mix = sorted(style_mix, key=lambda x: x.get("weight", 0), reverse=True)
    parts = []
    for item in sorted_mix:
        preset_id = item.get("preset", "")
        weight = item.get("weight", 50)
        fragment = STYLE_FRAGMENTS.get(preset_id, "")
        if not fragment:
            continue
        if weight >= 70:
            parts.append(fragment)
        elif weight >= 40:
            parts.append(f"with elements of {fragment}")
        else:
            parts.append(f"subtle hints of {fragment}")
    if visual_dna:
        dna_parts = []
        if visual_dna.get("mood"):
            dna_parts.append(f"mood: {visual_dna['mood']}")
        if visual_dna.get("lighting"):
            dna_parts.append(f"lighting: {visual_dna['lighting']}")
        if visual_dna.get("colorPalette"):
            dna_parts.append(f"color palette: {visual_dna['colorPalette']}")
        if visual_dna.get("lensChoice"):
            dna_parts.append(f"lens: {visual_dna['lensChoice']}")
        if dna_parts:
            parts.append(", ".join(dna_parts))
    return ", ".join(parts)


def inject_cinematography(base_prompt: str, shot_type: Optional[str] = None, camera_movement: Optional[str] = None) -> str:
    additions = []
    if shot_type and shot_type in SHOT_FRAGMENTS:
        additions.append(SHOT_FRAGMENTS[shot_type])
    if camera_movement and camera_movement in CAMERA_FRAGMENTS:
        additions.append(CAMERA_FRAGMENTS[camera_movement])
    if not additions:
        return base_prompt
    return f"{base_prompt}, {', '.join(additions)}"


def enhance_scene_prompt(
    base_prompt: str,
    creation_meta: Optional[dict] = None,
    scene_cinematography: Optional[dict] = None,
) -> str:
    """
    Master function: enhances ArcReel scene prompt with Creation 4.0 style + cinematography.
    Call this before every image/video generation dispatch.
    """
    if not creation_meta and not scene_cinematography:
        return base_prompt
    enhanced = base_prompt
    if creation_meta:
        style_prompt = build_style_prompt(
            style_mix=creation_meta.get("styleMix", []),
            visual_dna=creation_meta.get("visualDNA"),
        )
        if style_prompt:
            enhanced = f"{enhanced}, {style_prompt}"
    if scene_cinematography:
        enhanced = inject_cinematography(
            enhanced,
            shot_type=scene_cinematography.get("shotType"),
            camera_movement=scene_cinematography.get("cameraMovement"),
        )
    return enhanced
