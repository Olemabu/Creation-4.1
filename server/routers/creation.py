# server/routers/creation.py
# Creation 4.0 API extensions — style injection, Visual DNA, preset library

from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional
import base64
import json
import re

from server.deps import get_current_user
from server.creation_style_injector import enhance_scene_prompt, build_style_prompt, STYLE_FRAGMENTS

router = APIRouter(prefix="/api/v1/creation", tags=["creation"])


class StyleMixItem(BaseModel):
    preset: str
    weight: int


class VisualDNA(BaseModel):
    mood: str = ""
    lighting: str = ""
    colorPalette: str = ""
    lensChoice: str = ""
    texture: str = ""
    referenceImageUrl: Optional[str] = None
    rawAnalysis: Optional[str] = None


class SceneCinematography(BaseModel):
    shotType: str = "wide"
    cameraMovement: str = "static"


class EnhancePromptRequest(BaseModel):
    base_prompt: str
    style_mix: list[StyleMixItem] = []
    visual_dna: Optional[VisualDNA] = None
    cinematography: Optional[SceneCinematography] = None


class EnhancePromptResponse(BaseModel):
    enhanced_prompt: str
    style_fragment: str


class AnalyzeDNAResponse(BaseModel):
    visual_dna: VisualDNA


@router.post("/enhance-prompt", response_model=EnhancePromptResponse)
async def enhance_prompt(req: EnhancePromptRequest, user=Depends(get_current_user)):
    """Enhance an ArcReel scene prompt with Creation style + cinematography."""
    creation_meta = {
        "styleMix": [m.model_dump() for m in req.style_mix],
        "visualDNA": req.visual_dna.model_dump() if req.visual_dna else None,
    }
    scene_cine = req.cinematography.model_dump() if req.cinematography else None
    enhanced = enhance_scene_prompt(
        base_prompt=req.base_prompt,
        creation_meta=creation_meta,
        scene_cinematography=scene_cine,
    )
    style_fragment = build_style_prompt(
        style_mix=[m.model_dump() for m in req.style_mix],
        visual_dna=req.visual_dna.model_dump() if req.visual_dna else None,
    )
    return EnhancePromptResponse(enhanced_prompt=enhanced, style_fragment=style_fragment)


@router.post("/analyze-dna", response_model=AnalyzeDNAResponse)
async def analyze_visual_dna(file: UploadFile = File(...), user=Depends(get_current_user)):
    """Upload a reference image and extract its Visual DNA via the text backend."""
    from server.lib.text_backend_manager import get_text_backend_manager

    contents = await file.read()
    b64 = base64.b64encode(contents).decode()

    prompt = """Analyze this reference image and extract its cinematic Visual DNA.
Return a JSON object with these exact keys:
{
  "mood": "one sentence describing the emotional atmosphere",
  "lighting": "describe the lighting setup and quality",
  "colorPalette": "list the dominant colors and their relationships",
  "lensChoice": "describe the apparent lens choice and focal length",
  "texture": "describe the visual texture and film grain quality"
}
Be specific and cinematic. This will be used to maintain visual consistency across a video project."""

    try:
        manager = get_text_backend_manager()
        response = await manager.generate(
            prompt=prompt,
            images=[{"data": b64, "mime_type": file.content_type or "image/jpeg"}],
        )
        match = re.search(r'\{[\s\S]*\}', response)
        if match:
            data = json.loads(match.group())
            return AnalyzeDNAResponse(visual_dna=VisualDNA(**data))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DNA analysis failed: {str(e)}")

    raise HTTPException(status_code=422, detail="Could not parse Visual DNA from image")


@router.get("/style-presets")
async def get_style_presets():
    """Return the full Creation 4.0 style preset library."""
    return {"presets": list(STYLE_FRAGMENTS.keys()), "count": len(STYLE_FRAGMENTS)}
