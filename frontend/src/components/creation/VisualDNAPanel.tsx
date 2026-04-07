import { useState } from "react";
import { VisualDNA } from "../../types/creation";

interface Props {
  dna: VisualDNA | undefined;
  onAnalyze: (imageFile?: File) => Promise<void>;
  isAnalyzing: boolean;
}

const DNA_FIELDS: { key: keyof VisualDNA; label: string; icon: string }[] = [
  { key: "mood", label: "Mood", icon: "M" },
  { key: "lighting", label: "Lighting", icon: "L" },
  { key: "colorPalette", label: "Color Palette", icon: "C" },
  { key: "lensChoice", label: "Lens Choice", icon: "LN" },
  { key: "texture", label: "Texture", icon: "TX" },
];

export function VisualDNAPanel({ dna, onAnalyze, isAnalyzing }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onAnalyze(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAnalyze(file);
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
        <span>DNA</span> Visual DNA
      </div>
      <label
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={"border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer block " + (dragging ? "border-blue-500 bg-blue-950/30" : "border-gray-700 hover:border-gray-500")}>
        <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
        {dna?.referenceImageUrl
          ? <img src={dna.referenceImageUrl} alt="Style reference" className="w-full h-24 object-cover rounded-md mb-2" />
          : <div className="py-4"><div className="text-2xl mb-1">IMG</div><div className="text-xs text-gray-500">Drop reference image or click to analyze</div></div>}
        {isAnalyzing && <div className="text-xs text-blue-400 mt-1 animate-pulse">Extracting Visual DNA...</div>}
      </label>
      {dna && (
        <div className="flex flex-col gap-2">
          {DNA_FIELDS.map(({ key, label, icon }) =>
            dna[key] ? (
              <div key={key} className="bg-gray-900 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500 mb-0.5">[{icon}] {label}</div>
                <div className="text-xs text-white font-medium">{dna[key] as string}</div>
              </div>
            ) : null
          )}
        </div>
      )}
      {!dna && !isAnalyzing && (
        <div className="text-xs text-gray-600 text-center">
          Upload a reference image to lock in mood, lighting, palette, lens choice, and texture across all scenes.
        </div>
      )}
    </div>
  );
  }
