// components/sidebar.tsx
"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadAvatar } from "@/lib/avatar";
import {
  Trophy,
  LayoutDashboard,
  Users,
  Calendar,
  BarChart2,
  Settings,
  Plus,
  Goal,
  Menu,
  CircleAlert,
  X,
  Bell,
  Medal,
  ChevronLeft,
  Clock as ClockIcon,
  CreditCard,
  ArrowRightLeft,
  User,
  Moon,
  LogOut,
  Pencil,
} from "lucide-react";
import { useSidebar } from "@/components/sidebar-context";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard",         icon: LayoutDashboard,  href: "/" },
  { label: "Campeonatos",       icon: Trophy,           href: "/campeonatos" },
  { label: "Times",             icon: Users,            href: "/times" },
  { label: "Jogadores",         icon: User,             href: "/jogadores" },
  { label: "Partidas",          icon: Calendar,         href: "/partidas" },
  { label: "Histórico",         icon: ClockIcon,        href: "/historico" },
  { label: "Classificação",     icon: Medal,            href: "/classificacao" },
  { label: "Artilheiros",       icon: Goal,             href: "/artilheiros" },
  { label: "Pendências",        icon: CircleAlert,      href: "/pendencias" },
  { label: "Carteirinha",       icon: CreditCard,       href: "/carteirinhas" },
  { label: "Transferência",     icon: ArrowRightLeft,   href: "/transferencias" },
];

function SidebarContent({
  currentPath,
  userName,
  userEmail,
  avatarUrl,
  collapsed,
  onClose,
}: {
  currentPath: string;
  userName: string;
  userEmail: string;
  avatarUrl?: string;
  collapsed: boolean;
  onClose?: () => void;
}) {
  const initial = userName.charAt(0).toUpperCase();
  const router = useRouter();
  const supabase = createClient();

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(avatarUrl);
  const [enviandoAvatar, setEnviandoAvatar] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setEnviandoAvatar(true);
    try {
      const url = await uploadAvatar(file);
      setAvatarPreview(url);
      router.refresh();
    } catch (err) {
      console.error("Erro ao enviar avatar:", err);
    } finally {
      setEnviandoAvatar(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      <style jsx global>{`
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(37, 99, 235, 0.5) transparent;
        }
        .sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #2563eb, #06b6d4);
          border-radius: 999px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #3b82f6, #22d3ee);
        }
      `}</style>
      {/* Cabeçalho / marca */}
      <div className="flex items-center gap-3 px-4 py-5 shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] shrink-0">
          <Trophy size={16} color="#FFFFFF" />
        </div>
        <div
          className={`flex flex-col overflow-hidden transition-all duration-300 ${
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          <span className="text-white font-semibold text-sm leading-tight whitespace-nowrap">
            ChampionSystem
          </span>
          <span className="text-[#94A3B8] text-[11px] leading-tight whitespace-nowrap">
            Gestão de Campeonatos
          </span>
        </div>
      </div>

      <div className="h-px bg-white/10 mx-4 shrink-0" />

      {/* Cartão do usuário */}
      <div className="flex flex-col items-center px-2 py-5 shrink-0">
        <div className="relative w-14 h-14 shrink-0">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt={userName}
              className="w-14 h-14 rounded-full object-cover ring-4 ring-[#2563EB]/25"
            />
          ) : (
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#2563EB] ring-4 ring-[#2563EB]/25">
              <span className="text-white font-semibold text-lg">{initial}</span>
            </div>
          )}

          <label
            htmlFor="avatar-upload"
            title="Alterar foto"
            className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-[#2563EB] border-2 border-[#0B1120] cursor-pointer hover:bg-[#3B82F6] transition-colors"
          >
            {enviandoAvatar ? (
              <span className="w-2.5 h-2.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <Pencil size={10} color="#FFFFFF" />
            )}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={enviandoAvatar}
            className="hidden"
          />
        </div>

        <div
          className={`flex flex-col items-center overflow-hidden transition-all duration-300 ${
            collapsed ? "h-0 opacity-0" : "h-auto opacity-100 mt-2"
          }`}
        >
          <span className="text-[#94A3B8] text-[11px] whitespace-nowrap">
            Bem-vindo de volta
          </span>
          <span className="mt-1 text-[#BFDBFE] bg-[#2563EB]/25 text-[11px] font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
            {userName}
          </span>
        </div>
      </div>

      {/* Navegação */}
      <nav className="sidebar-scroll flex-1 min-h-0 px-2 overflow-y-auto overflow-x-hidden">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            const linkClass = [
              "flex items-center rounded-lg text-sm font-medium transition-colors",
              collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5",
              isActive
                ? "bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)]"
                : "text-[#94A3B8] hover:bg-white/5 hover:text-white",
            ].join(" ");

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={linkClass}
                  onClick={onClose}
                >
                  <Icon
                    size={16}
                    className={`shrink-0 ${isActive ? "text-white" : "text-[#94A3B8]"}`}
                  />
                  {!collapsed && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Ações Rápidas */}
        {!collapsed && (
          <p className="text-[#94A3B8] font-semibold text-[10px] tracking-[0.08em] uppercase mt-8 mb-1 px-2 whitespace-nowrap">
            Ações Rápidas
          </p>
        )}
        {collapsed && <div className="mt-8" />}

        <button
          title={collapsed ? "Novo Campeonato" : undefined}
          className={[
            "flex items-center w-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:opacity-90 text-white text-sm font-medium rounded-lg transition-opacity",
            collapsed ? "justify-center px-2 py-2.5" : "gap-2 px-3 py-2.5",
          ].join(" ")}
        >
          <Plus size={16} className="shrink-0" />
          {!collapsed && (
            <span className="whitespace-nowrap">Novo Campeonato</span>
          )}
        </button>
      </nav>

      {/* Rodapé */}
      <div className="border-t border-white/10 px-2 py-4 shrink-0">
        <div
          className={[
            "flex items-center",
            collapsed ? "flex-col gap-2 justify-center" : "gap-2 justify-center",
          ].join(" ")}
        >
          <button
            title="Tema"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
          >
            <Moon size={16} />
          </button>
          <button
            title="Configurações"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
          >
            <Settings size={16} />
          </button>
          <button
            title="Sair"
            onClick={handleLogout}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  userName = "Admin",
  userEmail = "admin@championsystem.com",
  avatarUrl,
}: SidebarProps) {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const currentPath = usePathname();

  const currentPageLabel =
    navItems.find((item) => item.href === currentPath)?.label ?? "Dashboard";

  return (
    <div>
      {/* ── DESKTOP ─────────────────────────────────────────────── */}
      <aside
        style={{ height: "100dvh" }}
        className={[
          "hidden lg:flex flex-col fixed left-0 top-0 bg-gradient-to-b from-[#0B1120] via-[#111827] to-[#0B1120] border-r border-white/10 z-40 transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64",
        ].join(" ")}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#2563EB] shadow-md flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <ChevronLeft
            size={14}
            color="#FFFFFF"
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <SidebarContent
          currentPath={currentPath}
          userName={userName}
          userEmail={userEmail}
          avatarUrl={avatarUrl}
          collapsed={collapsed}
        />
      </aside>

      {/* ── MOBILE ──────────────────────────────────────────────── */}
      <div className="lg:hidden">
        {/* Header fixo */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-[#0B1120] border-b border-white/10 flex items-center justify-between px-4 z-40">
          <button
            onPointerDown={(e) => {
              e.stopPropagation();
              setMobileOpen(true);
            }}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-md hover:bg-white/5 active:bg-white/5 transition-colors"
            aria-label="Abrir menu"
            type="button"
          >
            <Menu size={22} color="#FFFFFF" />
          </button>

          <span className="text-white font-semibold text-base">
            {currentPageLabel}
          </span>

          <button
            className="flex items-center justify-center w-10 h-10 -mr-2 rounded-md hover:bg-white/5 active:bg-white/5 transition-colors"
            aria-label="Notificações"
            type="button"
          >
            <Bell size={22} color="#FFFFFF" />
          </button>
        </header>

        {/* Overlay — sempre no DOM, animado com opacity */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-300"
          style={{
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "auto" : "none",
          }}
          onPointerDown={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <aside
          className="fixed top-0 left-0 w-64 bg-gradient-to-b from-[#0B1120] via-[#111827] to-[#0B1120] flex flex-col transition-transform duration-300 ease-in-out z-[60]"
          style={{
            height: "100dvh",
            transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
            pointerEvents: mobileOpen ? "auto" : "none",
          }}
        >
          <button
            onPointerDown={() => setMobileOpen(false)}
            className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-md hover:bg-white/5 active:bg-white/5 transition-colors"
            aria-label="Fechar menu"
            type="button"
          >
            <X size={18} color="#94A3B8" />
          </button>

          <SidebarContent
            currentPath={currentPath}
            userName={userName}
            userEmail={userEmail}
            avatarUrl={avatarUrl}
            collapsed={false}
            onClose={() => setMobileOpen(false)}
          />
        </aside>
      </div>
    </div>
  );
}