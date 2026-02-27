"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Share2, Eye, Edit, Copy, Check, X, Trash2, ExternalLink } from "lucide-react";

interface ShareButtonProps {
  projectId: string;
  projectName: string;
}

interface ShareLink {
  token: string;
  permission: "view" | "edit";
  createdAt: string;
  expiresAt: string | null;
}

export default function ShareButton({ projectId, projectName }: ShareButtonProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [showModal, setShowModal] = useState(false);
  const [permission, setPermission] = useState<"view" | "edit">("view");
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([]);
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Load existing share links
  const loadShareLinks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/share`);
      if (res.ok) {
        const data = await res.json();
        setShareLinks(data.shareLinks || []);
      }
    } catch (error) {
      console.error("Failed to load share links:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (showModal) {
      loadShareLinks();
    }
  }, [showModal, projectId]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  // Generate share link
  const generateLink = async () => {
    setIsGenerating(true);
    console.log("🔗 Generating share link with permission:", permission);
    try {
      const res = await fetch(`/api/projects/${projectId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permission }),
      });

      console.log("📡 Share API Response:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Share link generated:", data);
        setGeneratedLink(data.shareUrl);
        await loadShareLinks();
      } else {
        const errorData = await res.json();
        console.error("❌ Share generation failed:", errorData);
        alert("Failed to generate share link");
      }
    } catch (error) {
      console.error("❌ Failed to generate link:", error);
      alert("Failed to generate share link");
    }
    setIsGenerating(false);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Delete share link
  const deleteShareLink = async (token: string) => {
    if (!confirm("Are you sure you want to delete this share link?")) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/share`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        await loadShareLinks();
        if (generatedLink.includes(token)) {
          setGeneratedLink("");
        }
      }
    } catch (error) {
      console.error("Failed to delete share link:", error);
    }
  };

  // Share via WhatsApp
  const shareViaWhatsApp = (url: string, perm: string) => {
    const message = `Check out this project: *${projectName}*\n\n${
      perm === "edit" 
        ? "✏️ You can view and edit this project" 
        : "👀 You can view this project"
    }\n\n🔗 ${url}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
          isDark
            ? "bg-blue-900/20 border-blue-700 text-blue-300 hover:bg-blue-900/30"
            : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        }`}
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {/* Share Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
              isDark ? "bg-[#1a1b1f] text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <Share2 className="w-6 h-6" />
                <h2 className="text-xl font-bold">Share Project</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Permission Selection */}
              <div>
                <label className={`text-sm font-semibold mb-3 block ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Select Permission Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPermission("view")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      permission === "view"
                        ? isDark
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-50"
                        : isDark
                        ? "border-gray-700 hover:border-gray-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Eye className={`w-5 h-5 ${permission === "view" ? "text-blue-500" : ""}`} />
                    <div className="text-left">
                      <div className="font-semibold">View Only</div>
                      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Can view but not edit
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPermission("edit")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      permission === "edit"
                        ? isDark
                          ? "border-green-500 bg-green-900/20"
                          : "border-green-500 bg-green-50"
                        : isDark
                        ? "border-gray-700 hover:border-gray-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Edit className={`w-5 h-5 ${permission === "edit" ? "text-green-500" : ""}`} />
                    <div className="text-left">
                      <div className="font-semibold">Can Edit</div>
                      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Can view and modify
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateLink}
                disabled={isGenerating}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  isGenerating
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isGenerating ? "Generating..." : "Generate Share Link"}
              </button>

              {/* Generated Link */}
              {generatedLink && (
                <div className={`p-4 rounded-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                  <label className="text-xs font-semibold mb-2 block">Generated Link:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                        isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-900"
                      } border ${isDark ? "border-gray-700" : "border-gray-300"}`}
                    />
                    <button
                      onClick={() => copyToClipboard(generatedLink, generatedLink)}
                      className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                      title="Copy link"
                    >
                      {copiedToken === generatedLink ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => shareViaWhatsApp(generatedLink, permission)}
                      className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                        isDark
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      title="Share on WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Share Links */}
              {shareLinks.length > 0 && (
                <div>
                  <h3 className={`text-sm font-semibold mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Active Share Links ({shareLinks.length})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {shareLinks.map((link) => {
                      const fullUrl = `${window.location.origin}/shared/${link.token}`;
                      return (
                        <div
                          key={link.token}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {link.permission === "edit" ? (
                              <Edit className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <Eye className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium capitalize">{link.permission} Access</div>
                              <div className={`text-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                Created {new Date(link.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => copyToClipboard(fullUrl, link.token)}
                              className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                              title="Copy link"
                            >
                              {copiedToken === link.token ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => shareViaWhatsApp(fullUrl, link.permission)}
                              className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                              title="Share on WhatsApp"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteShareLink(link.token)}
                              className={`p-2 rounded-lg ${isDark ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"}`}
                              title="Delete link"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
