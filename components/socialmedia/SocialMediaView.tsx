"use client";

import { useState } from "react";

const PLATFORM_TEMPLATES = [
  {
    id: 1,
    name: "Instagram Post",
    platform: "instagram",
    size: "1080x1080",
    ratio: "1:1",
    bg: "from-purple-500 to-pink-500",
    icon: "📸",
    desc: "Square post for feed",
  },
  {
    id: 2,
    name: "Instagram Story",
    platform: "instagram",
    size: "1080x1920",
    ratio: "9:16",
    bg: "from-pink-500 to-orange-400",
    icon: "📱",
    desc: "Vertical story format",
  },
  {
    id: 3,
    name: "Facebook Post",
    platform: "facebook",
    size: "1200x630",
    ratio: "1.91:1",
    bg: "from-blue-600 to-blue-400",
    icon: "👍",
    desc: "Landscape feed post",
  },
  {
    id: 4,
    name: "Twitter/X Post",
    platform: "twitter",
    size: "1600x900",
    ratio: "16:9",
    bg: "from-sky-500 to-cyan-400",
    icon: "🐦",
    desc: "Wide format tweet card",
  },
  {
    id: 5,
    name: "LinkedIn Post",
    platform: "linkedin",
    size: "1200x627",
    ratio: "1.91:1",
    bg: "from-blue-700 to-blue-500",
    icon: "💼",
    desc: "Professional network post",
  },
  {
    id: 6,
    name: "YouTube Thumbnail",
    platform: "youtube",
    size: "1280x720",
    ratio: "16:9",
    bg: "from-red-600 to-red-400",
    icon: "▶️",
    desc: "Video thumbnail",
  },
  {
    id: 7,
    name: "Pinterest Pin",
    platform: "pinterest",
    size: "1000x1500",
    ratio: "2:3",
    bg: "from-red-500 to-rose-400",
    icon: "📌",
    desc: "Tall vertical pin",
  },
  {
    id: 8,
    name: "TikTok Cover",
    platform: "tiktok",
    size: "1080x1920",
    ratio: "9:16",
    bg: "from-gray-900 to-gray-700",
    icon: "🎵",
    desc: "Vertical video cover",
  },
  {
    id: 9,
    name: "WhatsApp Status",
    platform: "whatsapp",
    size: "1080x1920",
    ratio: "9:16",
    bg: "from-green-500 to-emerald-400",
    icon: "💬",
    desc: "Status card format",
  },
  {
    id: 10,
    name: "Snapchat Story",
    platform: "snapchat",
    size: "1080x1920",
    ratio: "9:16",
    bg: "from-yellow-400 to-yellow-300",
    icon: "👻",
    desc: "Vertical snap story",
  },
];

interface CanvasElement {
  id: string;
  type: "text" | "shape" | "emoji";
  content: string;
  x: number;
  y: number;
  fontSize?: number;
  color?: string;
  bold?: boolean;
}

export default function SocialMediaView({ databaseId }: { databaseId: string }) {
  const [selectedTemplate, setSelectedTemplate] = useState(PLATFORM_TEMPLATES[0]);
  const [elements, setElements] = useState<CanvasElement[]>([
    { id: "1", type: "text", content: "Your headline here", x: 50, y: 40, fontSize: 28, color: "#ffffff", bold: true },
    { id: "2", type: "text", content: "Add your subtitle text", x: 50, y: 55, fontSize: 16, color: "#ffffff", bold: false },
  ]);
  const [selectedEl, setSelectedEl] = useState<string | null>(null);
  const [editingEl, setEditingEl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"templates" | "canvas">("canvas");

  const selectedElData = elements.find((e) => e.id === selectedEl);

  const addText = () => {
    const el: CanvasElement = {
      id: Date.now().toString(),
      type: "text",
      content: "New text",
      x: 30,
      y: 50,
      fontSize: 18,
      color: "#ffffff",
      bold: false,
    };
    setElements((prev) => [...prev, el]);
    setSelectedEl(el.id);
  };

  const addEmoji = (emoji: string) => {
    const el: CanvasElement = {
      id: Date.now().toString(),
      type: "emoji",
      content: emoji,
      x: 40,
      y: 40,
      fontSize: 48,
    };
    setElements((prev) => [...prev, el]);
  };

  const deleteSelected = () => {
    setElements((prev) => prev.filter((e) => e.id !== selectedEl));
    setSelectedEl(null);
  };

  const updateEl = (id: string, updates: Partial<CanvasElement>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const handleDownload = () => {
    alert(`Download ${selectedTemplate.name} — ${selectedTemplate.size}px`);
  };

  const EMOJIS = ["🔥", "✨", "💯", "🎉", "❤️", "🚀", "⭐", "💪", "🌟", "🎯"];

  return (
    <div className="flex h-full bg-[#0f0f13] text-white overflow-hidden rounded-xl">

      {/* ── Left Panel ── */}
      <div className="w-64 shrink-0 bg-[#141418] border-r border-white/[0.07] flex flex-col">

        {/* Tabs */}
        <div className="flex border-b border-white/[0.07]">
          {(["templates", "canvas"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[11px] font-semibold capitalize transition ${
                activeTab === tab
                  ? "text-white border-b-2 border-violet-500"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-2">

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div className="space-y-1">
              {PLATFORM_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition ${
                    selectedTemplate.id === t.id
                      ? "bg-violet-600/20 border border-violet-500/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.bg} flex items-center justify-center text-base shrink-0`}>
                    {t.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-white truncate">{t.name}</p>
                    <p className="text-[10px] text-gray-500">{t.size}px · {t.ratio}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Canvas Tab */}
          {activeTab === "canvas" && (
            <div className="space-y-3 p-1">

              {/* Add elements */}
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Add</p>
                <button onClick={addText}
                  className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium transition text-left px-3">
                  + Text
                </button>
              </div>

              {/* Emojis */}
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Emojis</p>
                <div className="grid grid-cols-5 gap-1">
                  {EMOJIS.map((e) => (
                    <button key={e} onClick={() => addEmoji(e)}
                      className="h-8 rounded-lg bg-white/5 hover:bg-white/10 text-base transition">
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected element properties */}
              {selectedElData && selectedElData.type === "text" && (
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Text Style</p>
                  <div className="space-y-2">
                    <input
                      type="color"
                      value={selectedElData.color || "#ffffff"}
                      onChange={(e) => updateEl(selectedElData.id, { color: e.target.value })}
                      className="w-full h-8 rounded-lg cursor-pointer bg-transparent border border-white/10"
                      title="Text color"
                    />
                    <input
                      type="range" min={10} max={72}
                      value={selectedElData.fontSize || 18}
                      onChange={(e) => updateEl(selectedElData.id, { fontSize: Number(e.target.value) })}
                      className="w-full h-1 accent-violet-500"
                    />
                    <p className="text-[10px] text-gray-500 text-center">Size: {selectedElData.fontSize}px</p>
                    <button
                      onClick={() => updateEl(selectedElData.id, { bold: !selectedElData.bold })}
                      className={`w-full py-1.5 rounded-lg text-xs font-bold transition ${
                        selectedElData.bold ? "bg-violet-600 text-white" : "bg-white/5 hover:bg-white/10 text-gray-300"
                      }`}
                    >
                      Bold
                    </button>
                    <button onClick={deleteSelected}
                      className="w-full py-1.5 rounded-lg text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 transition">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Main Canvas Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#141418] border-b border-white/[0.07] shrink-0">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded bg-gradient-to-br ${selectedTemplate.bg} flex items-center justify-center text-[10px]`}>
              {selectedTemplate.icon}
            </div>
            <span className="text-xs font-semibold">{selectedTemplate.name}</span>
            <span className="text-[10px] text-gray-500">{selectedTemplate.size}px</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition">
              Export
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[#0f0f13]">
          <div
            className="relative shadow-2xl overflow-hidden"
            style={{
              width: "400px",
              height: selectedTemplate.ratio === "1:1" ? "400px"
                : selectedTemplate.ratio === "9:16" ? "711px"
                : selectedTemplate.ratio === "2:3" ? "600px"
                : "225px",
            }}
            onClick={() => setSelectedEl(null)}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedTemplate.bg}`} />

            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12" />

            {/* Platform watermark */}
            <div className="absolute top-3 right-3 text-white/30 text-xs font-bold uppercase tracking-widest">
              {selectedTemplate.platform}
            </div>

            {/* Canvas elements */}
            {elements.map((el) => (
              <div
                key={el.id}
                className={`absolute cursor-pointer select-none ${
                  selectedEl === el.id ? "ring-2 ring-white/60 ring-offset-1 ring-offset-transparent rounded" : ""
                }`}
                style={{ left: `${el.x}%`, top: `${el.y}%`, transform: "translate(-50%, -50%)" }}
                onClick={(e) => { e.stopPropagation(); setSelectedEl(el.id); }}
                onDoubleClick={() => setEditingEl(el.id)}
              >
                {editingEl === el.id ? (
                  <input
                    autoFocus
                    value={el.content}
                    onChange={(e) => updateEl(el.id, { content: e.target.value })}
                    onBlur={() => setEditingEl(null)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingEl(null)}
                    className="bg-transparent outline-none border-b border-white/50 text-white text-center min-w-[100px]"
                    style={{
                      fontSize: el.fontSize,
                      color: el.color,
                      fontWeight: el.bold ? "bold" : "normal",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: el.fontSize,
                      color: el.color,
                      fontWeight: el.bold ? "bold" : "normal",
                      textShadow: el.type === "text" ? "0 2px 8px rgba(0,0,0,0.4)" : undefined,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {el.content}
                  </span>
                )}
              </div>
            ))}

            {/* Hint */}
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">
                Click "+ Text" to add content
              </div>
            )}
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#141418] border-t border-white/[0.07] shrink-0">
          <span className="text-[10px] text-gray-600">Double-click to edit text · Click to select</span>
          <span className="text-[10px] text-gray-600">{selectedTemplate.size}px · {selectedTemplate.ratio}</span>
        </div>
      </div>
    </div>
  );
}