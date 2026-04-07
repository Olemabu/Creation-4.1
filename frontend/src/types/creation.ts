// creation.ts — Creation 4.0 type extensions

export enum CameraMovement {
  STATIC = "static",
  ZOOM_IN = "zoomIn",
  ZOOM_OUT = "zoomOut",
  ZOOM_TO_CENTER = "zoomToCenter",
  PAN_LEFT = "panLeft",
  PAN_RIGHT = "panRight",
  PAN_UP = "panUp",
  PAN_DOWN = "panDown",
  PAN_UP_LEFT = "panUpLeft",
  PAN_UP_RIGHT = "panUpRight",
  PAN_DOWN_LEFT = "panDownLeft",
  PAN_DOWN_RIGHT = "panDownRight",
  TILT_UP = "tiltUp",
  TILT_DOWN = "tiltDown",
  SHAKE = "shake",
}

export enum ShotType {
  WIDE = "wide",
  MEDIUM = "medium",
  CLOSE_UP = "closeUp",
  EXTREME_CLOSE_UP = "extremeCloseUp",
}

export enum AspectRatio {
  LANDSCAPE = "16:9",
  PORTRAIT = "9:16",
  SQUARE = "1:1",
}

export enum StyleCategory {
  DOCUMENTARY = "Documentary",
  SOCIAL_MEDIA = "Social Media",
  CINEMATIC = "Cinematic",
  ANIMATION = "Animation",
  REALISM = "Realism",
  ARTISTIC = "Artistic",
  DIGITAL = "Digital & Niche",
  COMICS = "Comics",
}

export interface StyleMixItem {
  preset: string;
  weight: number;
}

export interface VisualDNA {
  mood: string;
  lighting: string;
  colorPalette: string;
  lensChoice: string;
  texture: string;
  referenceImageUrl?: string;
  rawAnalysis?: string;
}

export interface CinematicPreset {
  id: string;
  name: string;
  description: string;
  promptFragment: string;
  category: StyleCategory;
  thumbnailColor: string;
}

export interface SceneCinematography {
  shotType: ShotType;
  cameraMovement: CameraMovement;
  aspectRatio: AspectRatio;
}

export interface CreationProjectExtension {
  visualDNA?: VisualDNA;
  selectedPreset?: string;
  styleMix?: StyleMixItem[];
  voiceName?: string;
  voiceoverVolume?: number;
  backgroundMusicUrl?: string;
  backgroundMusicVolume?: number;
  aspectRatio?: AspectRatio;
  mediaSource?: "genai" | "stock";
}

export interface AudioTrack {
  url: string;
  name: string;
  duration?: number;
  volume: number;
}

export type ExportFormat = "MP4" | "MOV" | "WEBM";
