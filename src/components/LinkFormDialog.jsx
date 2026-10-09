import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function LinkFormDialog({ open, onClose, onSubmit, editingLink }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("その他");

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title || "");
      setUrl(editingLink.url || "");
      setDescription(editingLink.description || "");
      setCategory(editingLink.category || "その他");
    } else {
      setTitle(""); setUrl(""); setDescription(""); setCategory("その他");
    }
  }, [editingLink, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) finalUrl = "https://" + finalUrl;
    onSubmit({ title: title.trim(), url: finalUrl, description: description.trim(), category });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-violet-400/20 bg-[#05070A]/95 p-8 shadow-[0_0_60px_-10px_rgba(112,0,255,0.3)]">
        <button onClick={onClose} aria-label="閉じる" className="absolute top-4 right-4 p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"><X className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold text-white mb-6">{editingLink ? "リンクを編集" : "リンクを追加"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-violet-300/70 mb-1.5">タイトル</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-violet-400/60 px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-violet-400/20 transition-all" placeholder="例: Minecraft" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-violet-300/70 mb-1.5">URL</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-violet-400/60 px-4 py-2.5 text-white font-mono text-sm outline-none focus:ring-2 focus:ring-violet-400/20 transition-all" placeholder="https://example.com" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-violet-300/70 mb-1.5">説明</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-violet-400/60 px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-violet-400/20 transition-all resize-none" placeholder="簡単な説明（任意）" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-violet-300/70 mb-1.5">カテゴリ</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-violet-400/60 px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-violet-400/20 transition-all">
              <option value="ゲーム" className="bg-[#05070A]">ゲーム</option>
              <option value="サービス" className="bg-[#05070A]">サービス</option>
              <option value="ツール" className="bg-[#05070A]">ツール</option>
              <option value="その他" className="bg-[#05070A]">その他</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 font-medium py-2.5 transition-colors">キャンセル</button>
            <button type="submit" className="flex-1 rounded-lg bg-violet-500/90 hover:bg-violet-400 text-white font-semibold py-2.5 transition-colors">{editingLink ? "更新" : "追加"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
