import { useState } from "react";
import { StyleMixingConsole } from "./StyleMixingConsole";
import { StyleMixItem, AspectRatio } from "../../types/creation";

interface Props {
  onCreated: (projectName: string) => void;
  onClose: () => void;
}

type InputMode = "text" | "url" | "file" | "voice";
type MediaSource = "genai" | "stock";

export function TheHopper({ onCreated, onClose }: Props) {
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [styleMix, setStyleMix] = useState<StyleMixItem[]>([]);
  const [mediaSource, setMediaSource] = useState<MediaSource>("genai");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.LANDSCAPE);
  const [projectName, setProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!projectName.trim()) { setError("Project name is required"); return; }
    setIsCreating(true);
    setError("");
    try {
      const token = localStorage.getItem("auth_token") || "";
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({
          name: projectName.trim(),
          creation_meta: { styleMix, mediaSource, aspectRatio, initialContent: content, inputMode, sourceUrl: url },
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      onCreated(projectName.trim());
    } catch (e: any) {
      setError(e.message || "Failed to create project");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-lg">*</span>
              <h2 className="text-white font-bold text-lg">The Hopper</h2>
            </div>
            <p className="text-gray-500 text-sm mt-0.5">Drop your story here to initialize project</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMediaSource("genai")} className={"px-3 py-1.5 rounded-lg text-sm font-medium transition-colors " + (mediaSource === "genai" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400")}>GenAI</button>
            <button onClick={() => setMediaSource("stock")} className={"px-3 py-1.5 rounded-lg text-sm font-medium transition-colors " + (mediaSource === "stock" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-400")}>Stock</button>
            <button onClick={onClose} className="text-gray-600 hover:text-white ml-2">X</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0 divide-x divide-gray-800">
          <div className="p-6">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">* Content Input</div>
            <div className="flex gap-1 mb-4">
              {(["text", "url", "file", "voice"] as InputMode[]).map(mode => (
                <button key={mode} onClick={() => setInputMode(mode)} className={"flex-1 py-1.5 rounded text-xs font-medium transition-colors capitalize " + (inputMode === mode ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700")}>
                  {mode}
                </button>
              ))}
            </div>
            <div className="mb-3">
              <label className="text-xs text-gray-500 mb-1 block">Project Name</label>
              <input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="My Epic Story" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="text-xs text-gray-500 mb-1">Story Content</div>
            {inputMode === "text" && <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your script or story here..." rows={8} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 resize-none" />}
            {inputMode === "url" && <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://article-url.com..." className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />}
            {inputMode === "file" && <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center text-gray-600 text-sm">Drop PDF, MD, or TXT file here</div>}
            {inputMode === "voice" && <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center text-gray-600 text-sm">Click to record</div>}
            <div className="mt-3">
              <label className="text-xs text-gray-500 mb-1 block">Aspect Ratio</label>
              <div className="flex gap-2">
                {Object.values(AspectRatio).map(ar => (
                  <button key={ar} onClick={() => setAspectRatio(ar)} className={"flex-1 py-1.5 rounded text-xs font-medium transition-colors " + (aspectRatio === ar ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400")}>
                    {ar}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Visual Style</div>
            <StyleMixingConsole value={styleMix} onChange={setStyleMix} maxItems={4} />
          </div>
          <div className="p-6">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">My Presets</div>
            <div className="text-xs text-gray-600 mb-4">No saved presets yet</div>
            {styleMix.length > 0 && (
              <div className="mt-4 border-t border-gray-800 pt-4">
                <div className="text-xs text-gray-500 mb-1">Target Style</div>
                <div className="text-sm font-semibold text-white">{styleMix.map(s => s.preset).join(" + ")}</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-gray-800">
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div className="ml-auto flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button onClick={handleCreate} disabled={isCreating} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors">
              {isCreating ? "Initializing..." : "Initialize Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }
