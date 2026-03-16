"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus, Trash2, Download, Volume2, VolumeX, Maximize,
  Copy, Type, Scissors, RotateCcw, RotateCw, FastForward,
  Rewind, ZoomIn, ZoomOut, Music, Film, Palette, Sliders,
  Play, Pause, SkipBack, SkipForward, Layers,
} from "lucide-react";

interface TextOverlay {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  x: number; y: number;
  fontSize: number;
  color: string;
  bgColor: string;
  bold: boolean;
  italic: boolean;
  fontFamily: string;
}

interface Clip {
  id: string;
  title: string;
  url: string;
  startTrim: number;
  endTrim: number | null;
  volume: number;
  playbackRate: number;
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  sepia: number;
  grayscale: number;
  flipH: boolean;
  flipV: boolean;
  opacity: number;
  textOverlays: TextOverlay[];
  addedAt: string;
}

const makeClip = (overrides: Partial<Clip> & { url: string; title: string }): Clip => ({
  id: Date.now().toString(),
  startTrim: 0,
  endTrim: null,
  volume: 1,
  playbackRate: 1,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hue: 0,
  blur: 0,
  sepia: 0,
  grayscale: 0,
  flipH: false,
  flipV: false,
  opacity: 100,
  textOverlays: [],
  addedAt: new Date().toISOString(),
  ...overrides,
});

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];
const FILTERS_PRESETS = [
  { name: "None",       brightness:100, contrast:100, saturation:100, hue:0, sepia:0, grayscale:0 },
  { name: "Vivid",      brightness:110, contrast:120, saturation:150, hue:0, sepia:0, grayscale:0 },
  { name: "Muted",      brightness:95,  contrast:90,  saturation:60,  hue:0, sepia:0, grayscale:0 },
  { name: "Vintage",    brightness:100, contrast:90,  saturation:80,  hue:0, sepia:40,grayscale:0 },
  { name: "B&W",        brightness:100, contrast:110, saturation:0,   hue:0, sepia:0, grayscale:100},
  { name: "Warm",       brightness:105, contrast:100, saturation:110, hue:10,sepia:20,grayscale:0 },
  { name: "Cool",       brightness:100, contrast:100, saturation:100, hue:180,sepia:0,grayscale:0 },
  { name: "Dramatic",   brightness:90,  contrast:150, saturation:80,  hue:0, sepia:0, grayscale:0 },
];
const FONTS = ["Arial","Georgia","Impact","Courier New","Trebuchet MS","Comic Sans MS","Verdana"];
const SAMPLE_VIDEOS: Partial<Clip>[] = [
  { title: "Sample Video 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export default function VideoView({ databaseId, templateName = "blank" }: { databaseId: string; templateName?: string }) {
  const [clips, setClips] = useState<Clip[]>([makeClip({ title: "Sample Video", url: "https://www.w3schools.com/html/mov_bbb.mp4" })]);
  const [selectedClip, setSelectedClip] = useState<Clip>(clips[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activePanel, setActivePanel] = useState<"clips"|"filter"|"text"|"adjust"|"audio"|"speed">("clips");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [urlError, setUrlError] = useState("");
  const [overlayText, setOverlayText] = useState("");
  const [overlayColor, setOverlayColor] = useState("#ffffff");
  const [overlayBg, setOverlayBg] = useState("transparent");
  const [overlayFontSize, setOverlayFontSize] = useState(24);
  const [overlayFont, setOverlayFont] = useState("Arial");
  const [overlayBold, setOverlayBold] = useState(false);
  const [overlayItalic, setOverlayItalic] = useState(false);
  const [editingOverlay, setEditingOverlay] = useState<string|null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string|null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sel = selectedClip;

  const updateClip = useCallback((updates: Partial<Clip>) => {
    setClips(prev => prev.map(c => c.id === sel.id ? { ...c, ...updates } : c));
    setSelectedClip(prev => ({ ...prev, ...updates }));
  }, [sel.id]);

  // Sync video settings
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = sel.volume;
    v.playbackRate = sel.playbackRate;
  }, [sel.volume, sel.playbackRate, selectedClip.id]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const t = v.currentTime;
    setCurrentTime(t);
    setProgress((t / v.duration) * 100 || 0);
    if (sel.endTrim && t >= sel.endTrim) { v.pause(); setIsPlaying(false); }
  };

  const handleLoaded = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    if (sel.startTrim > 0) v.currentTime = sel.startTrim;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) v.pause(); else v.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const t = (Number(e.target.value) / 100) * duration;
    v.currentTime = t;
    setProgress(Number(e.target.value));
  };

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;

  const getFilter = (c: Clip) =>
    `brightness(${c.brightness}%) contrast(${c.contrast}%) saturate(${c.saturation}%) hue-rotate(${c.hue}deg) blur(${c.blur}px) sepia(${c.sepia}%) grayscale(${c.grayscale}%)`;

  const getTransform = (c: Clip) =>
    `scaleX(${c.flipH ? -1 : 1}) scaleY(${c.flipV ? -1 : 1})`;

  const addTextOverlay = () => {
    if (!overlayText.trim()) return;
    const ov: TextOverlay = {
      id: Date.now().toString(),
      text: overlayText,
      startTime: currentTime,
      endTime: currentTime + 5,
      x: 50, y: 80,
      fontSize: overlayFontSize,
      color: overlayColor,
      bgColor: overlayBg,
      bold: overlayBold,
      italic: overlayItalic,
      fontFamily: overlayFont,
    };
    updateClip({ textOverlays: [...sel.textOverlays, ov] });
    setOverlayText("");
  };

  const removeOverlay = (id: string) => updateClip({ textOverlays: sel.textOverlays.filter(o => o.id !== id) });

  const applyFilterPreset = (preset: typeof FILTERS_PRESETS[0]) => {
    updateClip({ brightness:preset.brightness, contrast:preset.contrast, saturation:preset.saturation, hue:preset.hue, sepia:preset.sepia, grayscale:preset.grayscale });
  };

  const addClip = () => {
    if (!newUrl.trim()) { setUrlError("Enter a URL"); return; }
    const c = makeClip({ title: newTitle||"Untitled", url: newUrl });
    setClips(p=>[...p,c]);
    setSelectedClip(c);
    setNewUrl(""); setNewTitle(""); setUrlError(""); setShowAddModal(false);
  };

  const deleteClip = (id: string) => {
    const remaining = clips.filter(c=>c.id!==id);
    setClips(remaining);
    if (selectedClip.id===id && remaining.length>0) setSelectedClip(remaining[0]);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = sel.url; a.download = sel.title; a.click();
  };

  // Auto-save
  useEffect(() => {
    const t = setTimeout(async () => {
      if (!databaseId) return;
      setSaving(true);
      try {
        await fetch(`/api/databases/${databaseId}/video`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clips }),
        });
        setSavedAt(new Date().toLocaleTimeString());
      } catch {}
      finally { setSaving(false); }
    }, 3000);
    return () => clearTimeout(t);
  }, [clips, databaseId]);

  // Active text overlays at current time
  const activeOverlays = sel.textOverlays.filter(o => currentTime >= o.startTime && currentTime <= o.endTime);

  const PanelBtn = ({ id, icon, label }: { id: typeof activePanel; icon: React.ReactNode; label: string }) => (
    <button onClick={()=>setActivePanel(id)}
      className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[9px] font-medium transition ${activePanel===id?"bg-indigo-600 text-white":"text-gray-400 hover:bg-gray-700 hover:text-white"}`}>
      {icon}
      {label}
    </button>
  );

  const Slider = ({ label, value, min, max, step=1, onChange, unit="" }: { label:string; value:number; min:number; max:number; step?:number; onChange:(v:number)=>void; unit?:string }) => (
    <div className="flex items-center gap-2">
      <span className="text-[9px] text-gray-400 w-16 shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(Number(e.target.value))}
        className="flex-1 h-1 accent-indigo-500 cursor-pointer"/>
      <span className="text-[9px] text-gray-400 w-10 text-right">{value}{unit}</span>
      <button onClick={()=>onChange(min+(max-min)/2||1)} className="text-[8px] text-gray-600 hover:text-gray-400">↺</button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white overflow-hidden rounded-2xl">

      {/* ══ TOP BAR ══ */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">🎥 Video Editor</span>
          {saving && <span className="text-[9px] text-amber-400 animate-pulse">● Saving</span>}
          {!saving && savedAt && <span className="text-[9px] text-emerald-400">✓ {savedAt}</span>}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleDownload} className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition">
            <Download size={12}/> Export
          </button>
          <button onClick={()=>setShowAddModal(true)} className="flex items-center gap-1 px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg transition">
            <Plus size={12}/> Add Clip
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: Clip list */}
        <div className="w-44 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
          <div className="px-3 py-2 border-b border-gray-800">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Clips</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {clips.map((c,i) => (
              <div key={c.id} onClick={()=>setSelectedClip(c)}
                className={`flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-800 transition border-b border-gray-800 group ${selectedClip.id===c.id?"bg-gray-800 border-l-2 border-l-indigo-500":""}`}>
                <div className="w-10 h-8 bg-gray-700 rounded flex items-center justify-center text-sm shrink-0">🎬</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium truncate">{c.title}</p>
                  <p className="text-[9px] text-gray-500">{fmt(c.startTrim)} → {c.endTrim?fmt(c.endTrim):"end"}</p>
                </div>
                <button onClick={e=>{e.stopPropagation();deleteClip(c.id);}}
                  className="opacity-0 group-hover:opacity-100 p-0.5 bg-red-600 rounded text-white transition"><Trash2 size={9}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: Preview */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Video preview */}
          <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
            <video
              ref={videoRef}
              src={sel.url}
              className="max-h-full max-w-full"
              style={{
                filter: getFilter(sel),
                transform: getTransform(sel),
                opacity: sel.opacity / 100,
              }}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoaded}
              onEnded={()=>setIsPlaying(false)}
              onClick={togglePlay}
            />

            {/* Text overlays */}
            {activeOverlays.map(o=>(
              <div key={o.id}
                className="absolute pointer-events-none px-2 py-1 rounded"
                style={{
                  left:`${o.x}%`, top:`${o.y}%`,
                  transform:"translate(-50%,-50%)",
                  fontSize:o.fontSize, color:o.color,
                  backgroundColor:o.bgColor==="transparent"?"rgba(0,0,0,0)":o.bgColor,
                  fontFamily:o.fontFamily,
                  fontWeight:o.bold?"bold":"normal",
                  fontStyle:o.italic?"italic":"normal",
                  textShadow:"0 1px 4px rgba(0,0,0,0.8)",
                }}>
                {o.text}
              </div>
            ))}

            {/* Play overlay */}
            {!isPlaying && (
              <div onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer">
                <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition">
                  <Play size={24} className="ml-1"/>
                </div>
              </div>
            )}
          </div>

          {/* Timeline / Controls */}
          <div className="bg-gray-900 border-t border-gray-800 px-4 py-2 shrink-0">

            {/* Trim markers + progress */}
            <div className="relative mb-2">
              {/* Trim start/end markers */}
              <div className="relative h-6 bg-gray-800 rounded overflow-hidden">
                {/* Trim zone */}
                <div className="absolute h-full bg-indigo-900/50 border-x border-indigo-500"
                  style={{
                    left:`${(sel.startTrim/duration)*100||0}%`,
                    right:`${100-((sel.endTrim||duration)/duration)*100||0}%`,
                  }}/>
                {/* Playhead */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-white/80"
                  style={{ left:`${progress}%` }}/>
                <input type="range" min={0} max={100} step={0.1} value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"/>
              </div>
              <div className="flex justify-between text-[9px] text-gray-500 mt-0.5">
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={()=>{if(videoRef.current)videoRef.current.currentTime=sel.startTrim;}}
                  className="text-gray-400 hover:text-white transition"><SkipBack size={14}/></button>
                <button onClick={()=>{if(videoRef.current)videoRef.current.currentTime=Math.max(0,currentTime-5);}}
                  className="text-gray-400 hover:text-white transition"><Rewind size={14}/></button>
                <button onClick={togglePlay}
                  className="w-8 h-8 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center transition">
                  {isPlaying?<Pause size={14}/>:<Play size={14} className="ml-0.5"/>}
                </button>
                <button onClick={()=>{if(videoRef.current)videoRef.current.currentTime=Math.min(duration,currentTime+5);}}
                  className="text-gray-400 hover:text-white transition"><FastForward size={14}/></button>
                <button onClick={()=>{if(videoRef.current){videoRef.current.currentTime=sel.endTrim||duration;}}}
                  className="text-gray-400 hover:text-white transition"><SkipForward size={14}/></button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <button onClick={()=>updateClip({volume:sel.volume>0?0:1})}
                  className="text-gray-400 hover:text-white transition">
                  {sel.volume===0?<VolumeX size={14}/>:<Volume2 size={14}/>}
                </button>
                <input type="range" min={0} max={1} step={0.05} value={sel.volume}
                  onChange={e=>updateClip({volume:Number(e.target.value)})}
                  className="w-20 h-1 accent-indigo-500 cursor-pointer"/>
                <span className="text-[9px] text-gray-400 w-8">{Math.round(sel.volume*100)}%</span>

                {/* Speed */}
                <select value={sel.playbackRate}
                  onChange={e=>updateClip({playbackRate:Number(e.target.value)})}
                  className="h-5 text-[9px] bg-gray-800 border border-gray-700 text-white rounded px-1 focus:outline-none">
                  {PLAYBACK_RATES.map(r=><option key={r} value={r}>{r}x</option>)}
                </select>

                <button onClick={()=>videoRef.current?.requestFullscreen()}
                  className="text-gray-400 hover:text-white transition"><Maximize size={14}/></button>
              </div>
            </div>
          </div>

          {/* Tool panels selector */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 border-t border-gray-800 shrink-0 overflow-x-auto">
            <PanelBtn id="clips" icon={<Film size={12}/>} label="Clips"/>
            <PanelBtn id="filter" icon={<Palette size={12}/>} label="Filter"/>
            <PanelBtn id="adjust" icon={<Sliders size={12}/>} label="Adjust"/>
            <PanelBtn id="text" icon={<Type size={12}/>} label="Text"/>
            <PanelBtn id="audio" icon={<Music size={12}/>} label="Audio"/>
            <PanelBtn id="speed" icon={<FastForward size={12}/>} label="Speed"/>
          </div>
        </div>

        {/* RIGHT: Tool panel content */}
        <div className="w-60 bg-gray-900 border-l border-gray-800 overflow-y-auto shrink-0 p-3">

          {/* CLIPS PANEL */}
          {activePanel === "clips" && (
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Clip Settings</p>

              {/* Trim */}
              <div>
                <p className="text-[9px] text-gray-500 mb-1.5">Trim</p>
                <Slider label="Start" value={sel.startTrim} min={0} max={duration} step={0.1}
                  onChange={v=>{ updateClip({startTrim:v}); if(videoRef.current) videoRef.current.currentTime=v; }} unit="s"/>
                <Slider label="End" value={sel.endTrim||duration} min={0} max={duration} step={0.1}
                  onChange={v=>updateClip({endTrim:v})} unit="s"/>
              </div>

              {/* Flip */}
              <div>
                <p className="text-[9px] text-gray-500 mb-1.5">Flip</p>
                <div className="flex gap-2">
                  <button onClick={()=>updateClip({flipH:!sel.flipH})}
                    className={`flex-1 py-1 rounded text-[9px] font-medium transition ${sel.flipH?"bg-indigo-600 text-white":"bg-gray-700 text-gray-400 hover:text-white"}`}>
                    ↔ Horizontal
                  </button>
                  <button onClick={()=>updateClip({flipV:!sel.flipV})}
                    className={`flex-1 py-1 rounded text-[9px] font-medium transition ${sel.flipV?"bg-indigo-600 text-white":"bg-gray-700 text-gray-400 hover:text-white"}`}>
                    ↕ Vertical
                  </button>
                </div>
              </div>

              {/* Opacity */}
              <Slider label="Opacity" value={sel.opacity} min={0} max={100}
                onChange={v=>updateClip({opacity:v})} unit="%"/>
            </div>
          )}

          {/* FILTER PANEL */}
          {activePanel === "filter" && (
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Filter Presets</p>
              <div className="grid grid-cols-2 gap-1.5">
                {FILTERS_PRESETS.map(f=>(
                  <button key={f.name} onClick={()=>applyFilterPreset(f)}
                    className="flex flex-col items-center py-2 px-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition border border-gray-700 hover:border-indigo-500">
                    <div className="w-full h-10 rounded bg-gray-700 mb-1 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"
                        style={{filter:`brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%) sepia(${f.sepia}%) grayscale(${f.grayscale}%)`}}/>
                    </div>
                    <span className="text-[9px] text-gray-300">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ADJUST PANEL */}
          {activePanel === "adjust" && (
            <div className="space-y-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Adjustments</p>
              <Slider label="Brightness" value={sel.brightness} min={0} max={200} onChange={v=>updateClip({brightness:v})} unit="%"/>
              <Slider label="Contrast"   value={sel.contrast}   min={0} max={200} onChange={v=>updateClip({contrast:v})}   unit="%"/>
              <Slider label="Saturation" value={sel.saturation} min={0} max={200} onChange={v=>updateClip({saturation:v})} unit="%"/>
              <Slider label="Hue"        value={sel.hue}        min={0} max={360} onChange={v=>updateClip({hue:v})}        unit="°"/>
              <Slider label="Blur"       value={sel.blur}       min={0} max={20}  step={0.5} onChange={v=>updateClip({blur:v})} unit="px"/>
              <Slider label="Sepia"      value={sel.sepia}      min={0} max={100} onChange={v=>updateClip({sepia:v})}      unit="%"/>
              <Slider label="Grayscale"  value={sel.grayscale}  min={0} max={100} onChange={v=>updateClip({grayscale:v})} unit="%"/>
              <button onClick={()=>updateClip({brightness:100,contrast:100,saturation:100,hue:0,blur:0,sepia:0,grayscale:0})}
                className="w-full py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-[9px] rounded transition flex items-center justify-center gap-1">
                <RotateCcw size={10}/> Reset All
              </button>
            </div>
          )}

          {/* TEXT PANEL */}
          {activePanel === "text" && (
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Text Overlays</p>

              {/* Add new */}
              <div className="space-y-2">
                <textarea value={overlayText} onChange={e=>setOverlayText(e.target.value)} rows={2}
                  placeholder="Overlay text..."
                  className="w-full bg-gray-800 border border-gray-700 text-white text-xs rounded px-2 py-1.5 resize-none focus:outline-none focus:border-indigo-500"/>
                <div className="flex gap-1.5">
                  <select value={overlayFont} onChange={e=>setOverlayFont(e.target.value)}
                    className="flex-1 h-6 text-[9px] bg-gray-800 border border-gray-700 text-white rounded px-1 focus:outline-none">
                    {FONTS.map(f=><option key={f} value={f}>{f}</option>)}
                  </select>
                  <input type="number" value={overlayFontSize} onChange={e=>setOverlayFontSize(Number(e.target.value))}
                    className="w-12 h-6 text-[9px] bg-gray-800 border border-gray-700 text-white rounded px-1 focus:outline-none"/>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500">Color</span>
                  <input type="color" value={overlayColor} onChange={e=>setOverlayColor(e.target.value)}
                    className="w-6 h-6 rounded border border-gray-700 cursor-pointer bg-transparent"/>
                  <span className="text-[9px] text-gray-500">BG</span>
                  <input type="color" value={overlayBg==="transparent"?"#000000":overlayBg}
                    onChange={e=>setOverlayBg(e.target.value)}
                    className="w-6 h-6 rounded border border-gray-700 cursor-pointer bg-transparent"/>
                  <button onClick={()=>setOverlayBg("transparent")}
                    className="text-[8px] text-red-400 hover:text-red-300">None</button>
                </div>
                <div className="flex gap-1">
                  <button onClick={()=>setOverlayBold(!overlayBold)}
                    className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold transition ${overlayBold?"bg-indigo-600 text-white":"bg-gray-700 text-gray-400"}`}>B</button>
                  <button onClick={()=>setOverlayItalic(!overlayItalic)}
                    className={`w-6 h-6 flex items-center justify-center rounded text-xs italic transition ${overlayItalic?"bg-indigo-600 text-white":"bg-gray-700 text-gray-400"}`}>I</button>
                </div>
                <p className="text-[9px] text-gray-500">Appears at: {fmt(currentTime)} → {fmt(currentTime+5)}</p>
                <button onClick={addTextOverlay}
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg transition">
                  + Add at Current Time
                </button>
              </div>

              {/* Existing overlays */}
              {sel.textOverlays.length > 0 && (
                <div>
                  <p className="text-[9px] text-gray-500 mb-1.5">Added overlays</p>
                  <div className="space-y-1">
                    {sel.textOverlays.map(o=>(
                      <div key={o.id} className="flex items-center justify-between bg-gray-800 rounded px-2 py-1.5 group">
                        <div className="min-w-0">
                          <p className="text-[9px] text-white truncate">{o.text}</p>
                          <p className="text-[8px] text-gray-500">{fmt(o.startTime)} → {fmt(o.endTime)}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 shrink-0">
                          <button onClick={()=>{if(videoRef.current)videoRef.current.currentTime=o.startTime;}}
                            className="text-[8px] text-gray-400 hover:text-white p-0.5"><Play size={9}/></button>
                          <button onClick={()=>removeOverlay(o.id)}
                            className="text-[8px] text-red-400 p-0.5"><Trash2 size={9}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AUDIO PANEL */}
          {activePanel === "audio" && (
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Audio</p>
              <Slider label="Volume" value={Math.round(sel.volume*100)} min={0} max={150}
                onChange={v=>updateClip({volume:v/100})} unit="%"/>
              <div>
                <p className="text-[9px] text-gray-500 mb-1.5">Quick presets</p>
                <div className="grid grid-cols-3 gap-1">
                  {[{label:"Mute",v:0},{label:"50%",v:50},{label:"100%",v:100},{label:"120%",v:120},{label:"150%",v:150}].map(p=>(
                    <button key={p.label} onClick={()=>updateClip({volume:p.v/100})}
                      className={`py-1 text-[9px] rounded transition ${Math.round(sel.volume*100)===p.v?"bg-indigo-600 text-white":"bg-gray-700 text-gray-400 hover:text-white"}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SPEED PANEL */}
          {activePanel === "speed" && (
            <div className="space-y-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Playback Speed</p>
              <div className="grid grid-cols-2 gap-1.5">
                {PLAYBACK_RATES.map(r=>(
                  <button key={r} onClick={()=>updateClip({playbackRate:r})}
                    className={`py-2 rounded text-xs font-medium transition ${sel.playbackRate===r?"bg-indigo-600 text-white":"bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"}`}>
                    {r}x
                  </button>
                ))}
              </div>
              <div className="bg-gray-800 rounded-lg p-2 text-[9px] text-gray-400 space-y-1">
                <p>🐢 0.25x — 0.5x: Slow motion</p>
                <p>⚡ 1x: Normal speed</p>
                <p>🚀 1.5x — 4x: Time-lapse</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ADD CLIP MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={()=>setShowAddModal(false)}>
          <div className="bg-gray-900 rounded-2xl p-5 w-80 border border-gray-700 shadow-2xl"
            onClick={e=>e.stopPropagation()}>
            <h2 className="text-sm font-bold mb-3">Add Video Clip</h2>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-400 mb-1 block">Title</label>
                <input value={newTitle} onChange={e=>setNewTitle(e.target.value)}
                  placeholder="Video title..." autoFocus
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition text-white"/>
              </div>
              <div>
                <label className="text-[10px] text-gray-400 mb-1 block">Video URL (.mp4)</label>
                <input value={newUrl} onChange={e=>{setNewUrl(e.target.value);setUrlError("");}}
                  onKeyDown={e=>e.key==="Enter"&&addClip()}
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 transition text-white"/>
                {urlError&&<p className="text-red-400 text-[10px] mt-1">{urlError}</p>}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={addClip} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-semibold transition">Add Clip</button>
              <button onClick={()=>setShowAddModal(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-xs transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}