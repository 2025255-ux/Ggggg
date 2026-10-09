import React from "react";
import { ExternalLink, Pencil, Trash2, Gamepad2, Wrench, Sparkles, Folder } from "lucide-react";

const categoryConfig = {
  "ゲーム": { icon: Gamepad2, color: "text-cyan-300", glow: "shadow-[0_0_20px_-5px_rgba(0,240,255,0.5)]", border: "hover:border-cyan-400/60" },
  "サービス": { icon: Wrench, color: "text-violet-300", glow: "shadow-[0_0_20px_-5px_rgba(112,0,255,0.5)]", border: "hover:border-violet-400/60" },
  "ツール": { icon: Sparkles, color: "text-fuchsia-300", glow: "shadow-[0_0_20px_-5px_rgba(255,0,200,0.5)]", border: "hover:border-fuchsia-400/60" },
  "その他": { icon: Folder, color: "text-sky-300", glow: "shadow-[0_0_20px_-5px_rgba(125,211,252,0.5)]", border: "hover:border-sky-400/60" },
};

export default function LinkCard({ link, isAdmin, onEdit, onDelete }) {
  const cfg = categoryConfig[link.category] || categoryConfig["その他"];
  const Icon = cfg.icon;
  return (
    <article className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 transition-all duration-300 ${cfg.border} ${cfg.glow} hover:-translate-y-1`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`shrink-0 w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center ${cfg.color}`}><Icon className="w-5 h-5" /></div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate text-lg">{link.title}</h3>
            <span className={`text-xs font-mono uppercase tracking-wider ${cfg.color}`}>{link.category}</span>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(link)} aria-label="編集" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"><Pencil className="w-4 h-4" /></button>
            <button onClick={() => onDelete(link)} aria-label="削除" className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        )}
      </div>
      {link.description && <p className="mt-3 text-sm text-white/60 leading-relaxed line-clamp-2">{link.description}</p>}
      <a href__={link.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-cyan-300 transition-colors">アクセス <ExternalLink className="w-3.5 h-3.5" /></a>
    </article>
  );
}
