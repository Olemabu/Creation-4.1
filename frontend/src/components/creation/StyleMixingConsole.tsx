import { useState, useMemo } from "react";
import { STYLE_PRESETS, ALL_CATEGORIES, getPresetsByCategory } from "../../data/stylePresets";
import { StyleCategory, StyleMixItem, CinematicPreset } from "../../types/creation";

interface Props {
  value: StyleMixItem[];
  onChange: (mix: StyleMixItem[]) => void;
  maxItems?: number;
}

export function StyleMixingConsole({ value, onChange, maxItems = 4 }: Props) {
  const [activeCategory, setActiveCategory] = useState<StyleCategory>(StyleCategory.CINEMATIC);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return search
      ? STYLE_PRESETS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
      : getPresetsByCategory(activeCategory);
  }, [activeCategory, search]);

  const isSelected = (id: string) => value.some(v => v.preset === id);

  const togglePreset = (preset: CinematicPreset) => {
    if (isSelected(preset.id)) {
      onChange(value.filter(v => v.preset !== preset.id));
    } else if (value.length < maxItems) {
      const count = value.length + 1;
      const newMix = [
        ...value.map(v => ({ ...v, weight: Math.floor(100 / count) })),
        { preset: preset.id, weight: Math.floor(100 / count) },
      ];
      onChange(newMix);
    }
  };

  const updateWeight = (id: string, weight: number) => {
    onChange(value.map(v => v.preset === id ? { ...v, weight } : v));
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      <input
        type="text"
        placeholder="Search styles..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
      {!search && (
        <div className="flex gap-2 flex-wrap">
          {ALL_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat as StyleCategory)}
              className={"px-3 py-1 rounded-full text-xs font-medium transition-colors " + (activeCategory === cat ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700")}>
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {filtered.map(preset => {
          const selected = isSelected(preset.id);
          return (
            <button key={preset.id} onClick={() => togglePreset(preset)}
              disabled={!selected && value.length >= maxItems}
              className={"relative rounded-lg p-3 text-left transition-all border " + (selected ? "border-blue-500 bg-blue-950" : value.length >= maxItems ? "border-gray-800 bg-gray-900 opacity-40 cursor-not-allowed" : "border-gray-700 bg-gray-900 hover:border-gray-500")}>
              <div className="w-4 h-4 rounded-sm mb-2" style={{ backgroundColor: preset.thumbnailColor }} />
              <div className="text-xs font-semibold text-white leading-tight">{preset.name}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight line-clamp-2">{preset.description}</div>
              {selected && <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><span className="text-white text-xs">checkmark</span></div>}
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <div className="border border-gray-700 rounded-lg p-3 bg-gray-900">
          <div className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wider">Mixing Console</div>
          <div className="flex flex-col gap-3">
            {value.map(item => {
              const preset = STYLE_PRESETS.find(p => p.id === item.preset);
              if (!preset) return null;
              return (
                <div key={item.preset} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: preset.thumbnailColor }} />
                  <div className="text-xs text-white w-28 truncate flex-shrink-0">{preset.name}</div>
                  <input type="range" min={10} max={100} value={item.weight} onChange={e => updateWeight(item.preset, parseInt(e.target.value))} className="flex-1 accent-blue-500" />
                  <div className="text-xs text-gray-400 w-8 text-right flex-shrink-0">{item.weight}%</div>
                  <button onClick={() => onChange(value.filter(v => v.preset !== item.preset))} className="text-gray-600 hover:text-red-400 text-xs flex-shrink-0">x</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {value.length === 0 && <div className="text-center text-xs text-gray-600 py-2">Select up to {maxItems} styles to mix</div>}
    </div>
  );
        }
