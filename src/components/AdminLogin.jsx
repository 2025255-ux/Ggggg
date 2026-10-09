import React, { useState } from "react";
import { Lock, X, ShieldCheck } from "lucide-react";

const ADMIN_ID = "2025255@mita-is.ed.jp";
const ADMIN_PASSWORD = "gag";

export default function AdminLogin({ open, onClose, onSuccess }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim() === ADMIN_ID && password === ADMIN_PASSWORD) {
      setError("");
      onSuccess();
      setId("");
      setPassword("");
    } else {
      setError("IDまたはパスワードが正しくありません");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-cyan-400/20 bg-[#05070A]/95 p-8 shadow-[0_0_60px_-10px_rgba(0,240,255,0.3)]">
        <button onClick={onClose} aria-label="閉じる" className="absolute top-4 right-4 p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"><X className="w-5 h-5" /></button>
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mb-4"><Lock className="w-6 h-6 text-cyan-300" /></div>
          <h2 className="text-xl font-bold text-white">管理者アクセス</h2>
          <p className="text-sm text-white/50 mt-1">編集にはIDとパスワードが必要です</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300/70 mb-1.5">ID</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/60 px-4 py-2.5 text-white font-mono text-sm outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all" placeholder="IDを入力" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300/70 mb-1.5">パスワード</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400/60 px-4 py-2.5 text-white font-mono text-sm outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all" placeholder="パスワードを入力" />
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400/90 hover:bg-cyan-300 text-[#05070A] font-semibold py-2.5 transition-colors"><ShieldCheck className="w-4 h-4" />ロック解除</button>
        </form>
      </div>
    </div>
  );
}
