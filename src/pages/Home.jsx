import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, LogOut, LogIn, Link2, Search } from "lucide-react";
import LinkCard from "@/components/LinkCard";
import AdminLogin from "@/components/AdminLogin";
import LinkFormDialog from "@/components/LinkFormDialog";

const CATEGORIES = ["すべて", "ゲーム", "サービス", "ツール", "その他"];

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [search, setSearch] = useState("");

  const loadLinks = async () => {
    setLoading(true);
    try {
      const page = await base44.entities.Link.filter({}, { sort: "sort_order,-created_date", limit: 100 });
      setLinks(page.items || []);
    } catch (e) {
      setLinks([]);
    }
    setLoading(false);
  };

  useEffect(() => { loadLinks(); }, []);

  const filtered = useMemo(() => {
    return links.filter((l) => {
      const catOk = activeCategory === "すべて" || l.category === activeCategory;
      const s = search.trim().toLowerCase();
      const searchOk = !s || (l.title || "").toLowerCase().includes(s) || (l.description || "").toLowerCase().includes(s);
      return catOk && searchOk;
    });
  }, [links, activeCategory, search]);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setLoginOpen(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAdd = () => {
    setEditingLink(null);
    setFormOpen(true);
  };

  const handleEdit = (link) => {
    setEditingLink(link);
    setFormOpen(true);
  };

  const handleDelete = async (link) => {
    if (!window.confirm(`「${link.title}」を削除しますか？`)) return;
    try {
      await base44.entities.Link.delete(link.id);
      setLinks((prev) => prev.filter((l) => l.id !== link.id));
    } catch (e) {
      alert("削除に失敗しました");
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingLink) {
        const updated = await base44.entities.Link.update(editingLink.id, data);
        setLinks((prev) => prev.map((l) => (l.id === editingLink.id ? updated : l)));
      } else {
        const created = await base44.entities.Link.create(data);
        setLinks((prev) => [created, ...prev]);
      }
      setFormOpen(false);
      setEditingLink(null);
    } catch (e) {
      alert("保存に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative">
        <header className="border-b border-white/5 backdrop-blur-md sticky top-0 z-30 bg-[#05070A]/70">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-[#05070A]" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none">リンクポータル</h1>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-0.5">curated nexus</p>
              </div>
            </div>
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button onClick={handleAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-400/90 hover:bg-cyan-300 text-[#05070A] font-semibold text-sm px-3.5 py-2 transition-colors">
                  <Plus className="w-4 h-4" /> 追加
                </button>
                <button onClick={handleLogout} className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-sm px-3.5 py-2 transition-colors">
                  <LogOut className="w-4 h-4" /> ログアウト
                </button>
              </div>
            ) : (
              <button onClick={() => setLoginOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm px-3.5 py-2 transition-colors">
                <LogIn className="w-4 h-4" /> 管理者ログイン
              </button>
            )}
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-5 pt-16 pb-10 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            ゲームとサービスの
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">ディスカバリーポータル</span>
          </h2>
          <p className="mt-5 text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            お気に入りのゲームや便利なサービスのURLをひとつに。厳選されたリンク集から新しいデジタル体験へ。
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-5 pb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-white text-[#05070A]" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"}`}>{cat}</button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="検索..." className="w-full sm:w-64 rounded-full bg-white/5 border border-white/10 focus:border-cyan-400/40 pl-9 pr-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all" />
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-5 pb-20">
          {loading ? (
            <div className="flex justify-center py-24"><div className="w-8 h-8 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-white/40">{links.length === 0 ? "まだリンクがありません。管理者ログインから追加してください。" : "該当するリンクが見つかりません。"}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((link) => (<LinkCard key={link.id} link={link} isAdmin={isAdmin} onEdit={handleEdit} onDelete={handleDelete} />))}
            </div>
          )}
        </main>

        <footer className="border-t border-white/5 py-10">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <p className="text-[10vw] sm:text-[80px] font-extrabold leading-none text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}>2025255</p>
            <p className="mt-4 text-xs font-mono uppercase tracking-widest text-white/30">link portal · curated nexus</p>
          </div>
        </footer>
      </div>

      <AdminLogin open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={handleLoginSuccess} />
      <LinkFormDialog open={formOpen} onClose={() => { setFormOpen(false); setEditingLink(null); }} onSubmit={handleFormSubmit} editingLink={editingLink} />
    </div>
  );
}
