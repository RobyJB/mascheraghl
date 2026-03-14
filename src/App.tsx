import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, GitBranch, Zap, Settings, ChevronRight,
  Search, Bell, Plus, MoreHorizontal, TrendingUp,
  TrendingDown, Filter, Download, RefreshCw,
  Building2, Activity, Target, Link2, Key,
  Shield, AlertCircle, ChevronLeft, LogOut, Eye, EyeOff, Plug,
  Clock, XCircle, Pause, BarChart3, Workflow, Calendar, User, Video
} from "lucide-react";
import type { FC, ReactNode, CSSProperties } from "react";

/* ── CSS Variables & Global Styles ── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  :root {
    --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
    --bg: #090909;
    --fg: #f5f5f5;
    --card: #1f1f1f;
    --popover: #161616;
    --primary: #b8ff00;
    --primary-fg: #0d0d0d;
    --secondary: #1a1a1a;
    --muted: #1f1f1f;
    --muted-fg: #a6a6a6;
    --accent: #262626;
    --destructive: #d64545;
    --warning: #e8944a;
    --border: #212121;
    --input: #141414;
    --sidebar-bg: #080808;
    --sidebar-border: #1f1f1f;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    font-family: 'Albert Sans', system-ui, sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    background: var(--bg);
    color: var(--fg);
  }

  ::selection {
    background: rgba(184, 255, 0, 0.3);
    color: #f5f5f5;
  }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: hsl(220, 4%, 25%);
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover { background: hsl(220, 4%, 30%); }

  @keyframes springEnter {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes springCardEnter {
    from { opacity: 0; transform: translateY(6px) scale(0.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes springStatEnter {
    from { opacity: 0; transform: translateY(6px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInFast {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .spring-enter { animation: springEnter 800ms var(--ease-smooth) both; }
  .spring-card { animation: springCardEnter 800ms var(--ease-smooth) both; }
  .spring-stat { animation: springStatEnter 800ms var(--ease-smooth) both; }
  .fade-in { animation: fadeIn 200ms var(--ease-smooth) both; }

  .stagger-0 { animation-delay: 0ms; }
  .stagger-1 { animation-delay: 40ms; }
  .stagger-2 { animation-delay: 80ms; }
  .stagger-3 { animation-delay: 120ms; }
  .stagger-4 { animation-delay: 160ms; }
  .stagger-5 { animation-delay: 200ms; }
  .stagger-6 { animation-delay: 240ms; }

  .row-stagger { opacity: 0; animation: springEnter 200ms var(--ease-smooth) both; }
  .row-0 { animation-delay: 20ms; }
  .row-1 { animation-delay: 40ms; }
  .row-2 { animation-delay: 60ms; }
  .row-3 { animation-delay: 80ms; }
  .row-4 { animation-delay: 100ms; }
  .row-5 { animation-delay: 120ms; }
  .row-6 { animation-delay: 140ms; }
  .row-7 { animation-delay: 160ms; }
  .row-8 { animation-delay: 180ms; }
  .row-9 { animation-delay: 200ms; }

  .tabular-nums { font-variant-numeric: tabular-nums; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ── Helpers ── */
type LucideIcon = FC<{ size?: number; color?: string; style?: CSSProperties; className?: string }>;

/* ── Badge Colors ── */
const BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  success: { bg: "rgba(52,211,153,0.1)", text: "#34d399", border: "rgba(52,211,153,0.2)" },
  info: { bg: "rgba(96,165,250,0.1)", text: "#60a5fa", border: "rgba(96,165,250,0.2)" },
  warning: { bg: "rgba(251,191,36,0.1)", text: "#fbbf24", border: "rgba(251,191,36,0.2)" },
  error: { bg: "rgba(248,113,113,0.1)", text: "#f87171", border: "rgba(248,113,113,0.2)" },
  purple: { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.2)" },
  muted: { bg: "rgba(255,255,255,0.04)", text: "#a6a6a6", border: "rgba(255,255,255,0.06)" },
};

/* ── Sub-components ── */

const Badge: FC<{ children: ReactNode; variant?: string; style?: CSSProperties }> = ({ children, variant = "muted", style: extraStyle }) => {
  const colors = BADGE_COLORS[variant] || BADGE_COLORS.muted;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 10px",
      borderRadius: 9999, fontSize: 12, fontWeight: 600, lineHeight: "20px",
      background: colors.bg, color: colors.text,
      border: `1px solid ${colors.border}`,
      transition: "color 150ms", ...extraStyle
    }}>
      {children}
    </span>
  );
};

const GlassCard: FC<{
  children: ReactNode;
  variant?: "default" | "elevated" | "interactive" | "selected";
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}> = ({ children, variant = "default", className, style, onClick }) => {
  const variants = {
    default: { bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.06)", hover: false },
    elevated: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.06)", hover: false },
    interactive: { bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.06)", hover: true },
    selected: { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)", hover: false },
  };
  const v = variants[variant];
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => v.hover && setHovered(true)}
      onMouseLeave={() => v.hover && setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : v.bg,
        border: `1px solid ${hovered ? "rgba(255,255,255,0.10)" : v.border}`,
        borderRadius: 8, transition: "all 150ms var(--ease-smooth)",
        cursor: v.hover ? "pointer" : "default", ...style
      }}
    >
      {children}
    </div>
  );
};

const GlassIconBox: FC<{ icon: LucideIcon; size?: "sm" | "md" | "lg"; variant?: "default" | "primary" | "muted" }> = ({ icon: Icon, size = "md", variant = "default" }) => {
  const sizes = { sm: 32, md: 40, lg: 48 };
  const iconSizes = { sm: 16, md: 18, lg: 22 };
  const variantMap = {
    default: { bg: "rgba(255,255,255,0.04)", color: "#a6a6a6" },
    primary: { bg: "rgba(255,255,255,0.06)", color: "rgba(245,245,245,0.7)" },
    muted: { bg: "rgba(255,255,255,0.03)", color: "rgba(166,166,166,0.7)" },
  };
  const vr = variantMap[variant];
  return (
    <div style={{
      width: sizes[size], height: sizes[size], borderRadius: 8,
      background: vr.bg, display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={iconSizes[size]} color={vr.color} />
    </div>
  );
};

const StatCard: FC<{
  title: string; value: string; icon: LucideIcon;
  trend?: { direction: "up" | "down"; value: number; label: string };
  delay?: number;
}> = ({ title, value, icon: Icon, trend, delay = 0 }) => {
  const trendColor = trend?.direction === "up" ? "#34d399" : "#f87171";
  return (
    <GlassCard variant="default" className={`spring-stat stagger-${delay}`}
      style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#a6a6a6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{title}</p>
          <p style={{ fontSize: 24, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }} className="tabular-nums">{value}</p>
          {trend && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
              {trend.direction === "up" ? <TrendingUp size={12} color={trendColor} /> : <TrendingDown size={12} color={trendColor} />}
              <span style={{ fontSize: 12, color: trendColor, fontWeight: 500 }} className="tabular-nums">{trend.value}%</span>
              <span style={{ fontSize: 11, color: "#a6a6a6" }}>{trend.label}</span>
            </div>
          )}
        </div>
        <GlassIconBox icon={Icon} size="md" variant="default" />
      </div>
    </GlassCard>
  );
};

const Button: FC<{
  children: ReactNode; variant?: string; size?: string;
  onClick?: () => void; style?: CSSProperties; disabled?: boolean;
}> = ({ children, variant = "default", size = "default", onClick, style: extraStyle, disabled }) => {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const variantMap: Record<string, { bg: string; color: string; hoverBg: string; border?: string }> = {
    default: { bg: "#b8ff00", color: "#0d0d0d", hoverBg: "rgba(184,255,0,0.9)" },
    outline: { bg: "rgba(255,255,255,0.03)", color: "#f5f5f5", hoverBg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.06)" },
    secondary: { bg: "rgba(255,255,255,0.04)", color: "#e5e5e5", hoverBg: "rgba(255,255,255,0.06)" },
    ghost: { bg: "transparent", color: "#a6a6a6", hoverBg: "rgba(255,255,255,0.06)" },
    destructive: { bg: "#d64545", color: "#fff", hoverBg: "rgba(214,69,69,0.9)" },
  };
  const sizeMap: Record<string, { height: number; width?: number; padding: string | number; fontSize: number }> = {
    default: { height: 36, padding: "0 16px", fontSize: 14 },
    sm: { height: 32, padding: "0 12px", fontSize: 12 },
    lg: { height: 40, padding: "0 24px", fontSize: 14 },
    icon: { height: 36, width: 36, padding: 0, fontSize: 14 },
  };
  const v = variantMap[variant] || variantMap.default;
  const s = sizeMap[size] || sizeMap.default;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        borderRadius: 6, fontWeight: 600, fontSize: s.fontSize,
        height: s.height, width: s.width, padding: s.padding,
        background: hovered ? v.hoverBg : v.bg,
        color: v.color,
        border: v.border ? `1px solid ${v.border}` : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 150ms var(--ease-smooth)",
        filter: pressed ? "brightness(0.9)" : "none",
        fontFamily: "'Albert Sans', system-ui, sans-serif",
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );
};

const Input: FC<{
  placeholder?: string; value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; icon?: LucideIcon; style?: CSSProperties;
}> = ({ placeholder, value, onChange, type = "text", icon: Icon, style: extraStyle }) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", ...extraStyle }}>
      {Icon && <Icon size={16} color="#a6a6a6" style={{ position: "absolute", left: 12, pointerEvents: "none" }} />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%", height: 36, borderRadius: 6,
          padding: Icon ? "0 12px 0 36px" : "0 12px",
          fontSize: 14, fontWeight: 300,
          background: focused ? "rgba(255,255,255,0.05)" : hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? "rgba(255,255,255,0.20)" : hovered ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)"}`,
          color: "#f5f5f5",
          outline: "none",
          transition: "all 150ms var(--ease-smooth)",
          fontFamily: "'Albert Sans', system-ui, sans-serif",
        }}
      />
    </div>
  );
};

const ToggleSwitch: FC<{ defaultOn?: boolean }> = ({ defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      style={{
        width: 36, height: 20, borderRadius: 10, padding: 2,
        background: on ? "#b8ff00" : "var(--input)",
        border: "none", cursor: "pointer",
        transition: "background 150ms var(--ease-smooth)",
        display: "flex", alignItems: "center",
        justifyContent: on ? "flex-end" : "flex-start",
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 8,
        background: "var(--bg)",
        transition: "all 150ms var(--ease-smooth)",
      }} />
    </button>
  );
};


/* ══════════════════════════════════════════════════
   PAGES
   ══════════════════════════════════════════════════ */

/* ── Dashboard ── */
const DashboardPage = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div className="spring-enter stagger-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <GlassIconBox icon={LayoutDashboard} variant="primary" />
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Dashboard</h1>
          <p style={{ fontSize: 14, color: "#a6a6a6", marginTop: 2 }}>Panoramica generale del CRM</p>
        </div>
      </div>
      <span style={{ fontSize: 14, color: "#a6a6a6" }} className="tabular-nums">
        {new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
      </span>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      <StatCard title="Contatti Totali" value="1.247" icon={Users} trend={{ value: 12, label: "vs mese prec.", direction: "up" }} delay={1} />
      <StatCard title="Trattative Attive" value="38" icon={Target} trend={{ value: 5, label: "vs mese prec.", direction: "up" }} delay={2} />
      <StatCard title="Automazioni Attive" value="12" icon={Zap} trend={{ value: 2, label: "nuove", direction: "up" }} delay={3} />
      <StatCard title="Tasso Conversione" value="24.8%" icon={BarChart3} trend={{ value: 1.3, label: "vs mese prec.", direction: "down" }} delay={4} />
    </div>

    <div className="spring-enter stagger-5">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Contatti Recenti</h2>
        <p style={{ fontSize: 12, color: "#a6a6a6", marginTop: 4 }}>Ultimi contatti aggiunti al CRM</p>
      </div>

      <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)" }}>
              {["Nome", "Email", "Telefono", "Stato", "Aggiunto"].map((h) => (
                <th key={h} style={{ height: 36, padding: "0 12px", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a6a6a6", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Marco Rossi", email: "m.rossi@example.com", phone: "+39 348 123 4567", status: "Attivo", date: "12 Mar" },
              { name: "Laura Bianchi", email: "l.bianchi@studio.it", phone: "+39 333 987 6543", status: "Nuovo", date: "11 Mar" },
              { name: "Giuseppe Verdi", email: "g.verdi@azienda.com", phone: "+39 347 555 1234", status: "In trattativa", date: "10 Mar" },
              { name: "Anna Ferrari", email: "a.ferrari@mail.com", phone: "+39 320 444 7890", status: "Attivo", date: "09 Mar" },
              { name: "Roberto Esposito", email: "r.esposito@corp.it", phone: "+39 339 222 3456", status: "Perso", date: "08 Mar" },
            ].map((c, i) => (
              <tr key={i} className={`row-stagger row-${i}`}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 150ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <td style={{ padding: "8px 12px", fontSize: 14, fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "#a6a6a6" }}>{c.email}</td>
                <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#a6a6a6" }}>{c.phone}</td>
                <td style={{ padding: "8px 12px" }}>
                  <Badge variant={c.status === "Attivo" ? "success" : c.status === "Nuovo" ? "info" : c.status === "In trattativa" ? "warning" : "error"}>
                    {c.status}
                  </Badge>
                </td>
                <td style={{ padding: "8px 12px", fontSize: 13, color: "#a6a6a6" }} className="tabular-nums">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


/* ── Contatti ── */
const ContattiPage = () => {
  const [search, setSearch] = useState("");
  const contacts = [
    { name: "Marco Rossi", company: "Tech Solutions Srl", email: "m.rossi@techsolutions.it", phone: "+39 348 123 4567", status: "Attivo", value: "€ 15.000" },
    { name: "Laura Bianchi", company: "Studio Bianchi", email: "l.bianchi@studio.it", phone: "+39 333 987 6543", status: "Nuovo", value: "€ 8.500" },
    { name: "Giuseppe Verdi", company: "Verdi & Partners", email: "g.verdi@partners.com", phone: "+39 347 555 1234", status: "In trattativa", value: "€ 32.000" },
    { name: "Anna Ferrari", company: "Ferrari Consulting", email: "a.ferrari@consulting.com", phone: "+39 320 444 7890", status: "Attivo", value: "€ 22.000" },
    { name: "Roberto Esposito", company: "Esposito Group", email: "r.esposito@group.it", phone: "+39 339 222 3456", status: "Perso", value: "€ 5.000" },
    { name: "Chiara Romano", company: "Romano Design", email: "c.romano@design.it", phone: "+39 328 666 7890", status: "Attivo", value: "€ 18.000" },
    { name: "Luca Colombo", company: "Colombo Media", email: "l.colombo@media.com", phone: "+39 345 111 2233", status: "In trattativa", value: "€ 27.500" },
    { name: "Francesca Ricci", company: "Ricci Import/Export", email: "f.ricci@import.it", phone: "+39 331 999 8877", status: "Nuovo", value: "€ 41.000" },
  ];
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="spring-enter stagger-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <GlassIconBox icon={Users} variant="primary" />
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Contatti</h1>
            <p style={{ fontSize: 14, color: "#a6a6a6", marginTop: 2 }}>Gestione anagrafica clienti e lead</p>
          </div>
        </div>
        <span style={{ fontSize: 14, color: "#a6a6a6" }} className="tabular-nums">{filtered.length} contatti</span>
      </div>

      <div className="spring-enter stagger-1" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Input placeholder="Cerca contatti..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} style={{ flex: 1, minWidth: 200 }} />
        <Button variant="outline" size="default"><Filter size={16} /> Filtri</Button>
        <Button variant="outline" size="default"><Download size={16} /> Esporta</Button>
        <Button variant="default" size="default"><Plus size={16} /> Nuovo Contatto</Button>
      </div>

      <div className="spring-enter stagger-2" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ overflowX: "auto", maxHeight: "calc(100vh - 320px)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", position: "sticky", top: 0, zIndex: 20 }}>
                {["Nome", "Azienda", "Email", "Telefono", "Stato", "Valore"].map((h) => (
                  <th key={h} style={{ height: 36, padding: "0 12px", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a6a6a6", textAlign: "left", background: "hsl(220,5%,11%)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} className={`row-stagger row-${Math.min(i, 9)}`}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 150ms", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                  <td style={{ padding: "10px 12px", fontSize: 14, fontWeight: 500 }}>{c.name}</td>
                  <td style={{ padding: "10px 12px", fontSize: 14, color: "#a6a6a6" }}>{c.company}</td>
                  <td style={{ padding: "10px 12px", fontSize: 13, color: "#a6a6a6" }}>{c.email}</td>
                  <td style={{ padding: "10px 12px", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#a6a6a6" }}>{c.phone}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <Badge variant={c.status === "Attivo" ? "success" : c.status === "Nuovo" ? "info" : c.status === "In trattativa" ? "warning" : "error"}>
                      {c.status}
                    </Badge>
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 14, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }} className="tabular-nums">{c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


/* ── Pipeline ── */
const PipelinePage = () => {
  const stages = [
    { name: "Nuovo Lead", color: "#60a5fa", count: 5, total: "€ 87.500", deals: [
      { name: "Progetto Alpha", company: "Tech Solutions", value: "€ 25.000", days: 3 },
      { name: "Restyling sito", company: "Studio Bianchi", value: "€ 8.500", days: 1 },
      { name: "Consulenza IT", company: "Verdi & Partners", value: "€ 12.000", days: 5 },
      { name: "ERP Setup", company: "Romano Design", value: "€ 35.000", days: 2 },
      { name: "Social Media", company: "Colombo Media", value: "€ 7.000", days: 4 },
    ]},
    { name: "Contattato", color: "#c084fc", count: 3, total: "€ 62.000", deals: [
      { name: "CRM Custom", company: "Ferrari Consulting", value: "€ 22.000", days: 7 },
      { name: "App Mobile", company: "Esposito Group", value: "€ 18.000", days: 12 },
      { name: "Automazioni", company: "Ricci Import", value: "€ 22.000", days: 9 },
    ]},
    { name: "Proposta Inviata", color: "#fbbf24", count: 2, total: "€ 59.000", deals: [
      { name: "Piattaforma E-commerce", company: "Tech Solutions", value: "€ 45.000", days: 15 },
      { name: "Dashboard Analytics", company: "Colombo Media", value: "€ 14.000", days: 10 },
    ]},
    { name: "Negoziazione", color: "#e8944a", count: 2, total: "€ 73.000", deals: [
      { name: "Suite Gestionale", company: "Verdi & Partners", value: "€ 55.000", days: 22 },
      { name: "Integrazione API", company: "Ferrari Consulting", value: "€ 18.000", days: 18 },
    ]},
    { name: "Chiuso Vinto", color: "#34d399", count: 4, total: "€ 98.500", deals: [
      { name: "Migrazione Cloud", company: "Romano Design", value: "€ 32.000", days: 30 },
      { name: "SEO Audit", company: "Studio Bianchi", value: "€ 6.500", days: 25 },
      { name: "Branding", company: "Esposito Group", value: "€ 15.000", days: 20 },
      { name: "Formazione", company: "Ricci Import", value: "€ 45.000", days: 35 },
    ]},
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
      <div className="spring-enter stagger-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <GlassIconBox icon={GitBranch} variant="primary" />
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Pipeline</h1>
            <p style={{ fontSize: 14, color: "#a6a6a6", marginTop: 2 }}>Gestione trattative e opportunita</p>
          </div>
        </div>
        <Button variant="default" size="default"><Plus size={16} /> Nuova Trattativa</Button>
      </div>

      <div className="spring-enter stagger-1" style={{ display: "flex", gap: 12, overflowX: "auto", flex: 1, paddingBottom: 8 }}>
        {stages.map((stage, si) => (
          <div key={si} className={`spring-card stagger-${si + 1}`}
            style={{ minWidth: 280, maxWidth: 300, flex: "0 0 280px", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "12px 0", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: stage.color }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{stage.name}</span>
                <span style={{ fontSize: 11, color: "#a6a6a6", fontFamily: "'JetBrains Mono', monospace" }} className="tabular-nums">{stage.count}</span>
              </div>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#a6a6a6" }} className="tabular-nums">{stage.total}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
              {stage.deals.map((deal, di) => (
                <GlassCard key={di} variant="interactive" style={{ padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{deal.name}</p>
                    <MoreHorizontal size={14} color="#a6a6a6" style={{ flexShrink: 0, cursor: "pointer" }} />
                  </div>
                  <p style={{ fontSize: 12, color: "#a6a6a6", marginBottom: 10 }}>{deal.company}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: stage.color }} className="tabular-nums">{deal.value}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} color="#a6a6a6" />
                      <span style={{ fontSize: 11, color: "#a6a6a6" }} className="tabular-nums">{deal.days}g</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


/* ── Automazioni ── */
const AutomazioniPage = () => {
  const automations = [
    { name: "Benvenuto Nuovo Lead", trigger: "Nuovo contatto creato", actions: 4, status: "active" as const, runs: 847, lastRun: "2 min fa" },
    { name: "Follow-up Proposta", trigger: "Proposta inviata + 3 giorni", actions: 3, status: "active" as const, runs: 234, lastRun: "1h fa" },
    { name: "Notifica Trattativa Stagnante", trigger: "Nessuna attivita + 7 giorni", actions: 2, status: "active" as const, runs: 156, lastRun: "3h fa" },
    { name: "Aggiornamento Pipeline", trigger: "Email ricevuta da contatto", actions: 5, status: "active" as const, runs: 1203, lastRun: "5 min fa" },
    { name: "Report Settimanale", trigger: "Ogni lunedi alle 09:00", actions: 3, status: "active" as const, runs: 48, lastRun: "3 giorni fa" },
    { name: "Re-engagement Lead Freddi", trigger: "Nessuna attivita + 30 giorni", actions: 6, status: "paused" as const, runs: 89, lastRun: "2 sett. fa" },
    { name: "Assegnazione Automatica", trigger: "Nuovo lead da form", actions: 3, status: "active" as const, runs: 412, lastRun: "30 min fa" },
    { name: "Sync GoHighLevel", trigger: "Contatto aggiornato", actions: 2, status: "error" as const, runs: 67, lastRun: "1h fa" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="spring-enter stagger-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <GlassIconBox icon={Zap} variant="primary" />
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Automazioni</h1>
            <p style={{ fontSize: 14, color: "#a6a6a6", marginTop: 2 }}>Workflow automatici e regole di business</p>
          </div>
        </div>
        <Button variant="default" size="default"><Plus size={16} /> Nuova Automazione</Button>
      </div>

      <div className="spring-enter stagger-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {automations.map((a, i) => (
          <GlassCard key={i} variant="interactive" className={`spring-card stagger-${Math.min(i + 1, 6)}`} style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: a.status === "active" ? "rgba(52,211,153,0.1)" : a.status === "paused" ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {a.status === "active" ? <Zap size={16} color="#34d399" /> :
                   a.status === "paused" ? <Pause size={16} color="#fbbf24" /> :
                   <XCircle size={16} color="#f87171" />}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{a.name}</p>
                  <p style={{ fontSize: 12, color: "#a6a6a6", marginTop: 2 }}>{a.trigger}</p>
                </div>
              </div>
              <Badge variant={a.status === "active" ? "success" : a.status === "paused" ? "warning" : "error"}>
                {a.status === "active" ? "Attiva" : a.status === "paused" ? "In pausa" : "Errore"}
              </Badge>
            </div>
            <div style={{ display: "flex", gap: 16, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Workflow size={12} color="#a6a6a6" />
                <span style={{ fontSize: 12, color: "#a6a6a6" }}>{a.actions} azioni</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Activity size={12} color="#a6a6a6" />
                <span style={{ fontSize: 12, color: "#a6a6a6" }} className="tabular-nums">{a.runs.toLocaleString()} esecuzioni</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                <Clock size={12} color="#a6a6a6" />
                <span style={{ fontSize: 12, color: "#a6a6a6" }}>{a.lastRun}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};


/* ── Impostazioni ── */
const ImpostazioniPage = () => {
  const [ghlKey, setGhlKey] = useState("");
  const [ghlConnected, setGhlConnected] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [subTab, setSubTab] = useState("ghl");

  const handleConnect = () => {
    if (!ghlKey.trim()) return;
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setGhlConnected(true);
    }, 1800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="spring-enter stagger-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <GlassIconBox icon={Settings} variant="primary" />
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Impostazioni</h1>
            <p style={{ fontSize: 14, color: "#a6a6a6", marginTop: 2 }}>Configurazione e integrazioni</p>
          </div>
        </div>
      </div>

      <div className="spring-enter stagger-1" style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: 4, border: "1px solid rgba(255,255,255,0.04)" }}>
        {[
          { id: "ghl", label: "Integrazioni", icon: Plug },
          { id: "account", label: "Account", icon: Shield },
          { id: "notifiche", label: "Notifiche", icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
              borderRadius: 6, fontSize: 14, fontWeight: subTab === tab.id ? 500 : 400,
              background: subTab === tab.id ? "var(--bg)" : "transparent",
              color: subTab === tab.id ? "#f5f5f5" : "#a6a6a6",
              border: "none", cursor: "pointer",
              transition: "all 150ms var(--ease-smooth)",
              fontFamily: "'Albert Sans', system-ui, sans-serif",
              boxShadow: subTab === tab.id ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === "ghl" && (
        <div className="spring-enter" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ marginBottom: 4 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Integrazioni</h2>
            <p style={{ fontSize: 12, color: "#a6a6a6", marginTop: 4 }}>Collega servizi esterni al tuo CRM</p>
          </div>

          <GlassCard variant={ghlConnected ? "selected" : "elevated"} style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: ghlConnected ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${ghlConnected ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.06)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 300ms var(--ease-smooth)"
                }}>
                  <Building2 size={24} color={ghlConnected ? "#34d399" : "#a6a6a6"} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>GoHighLevel</h3>
                    <Badge variant={ghlConnected ? "success" : "muted"}>
                      {ghlConnected ? "Connesso" : "Non connesso"}
                    </Badge>
                  </div>
                  <p style={{ fontSize: 13, color: "#a6a6a6", marginTop: 4, maxWidth: 460, lineHeight: 1.5 }}>
                    Sincronizza contatti, pipeline e automazioni con il tuo account GoHighLevel.
                  </p>
                </div>
              </div>
            </div>

            {!ghlConnected ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <label style={{ fontSize: 14, fontWeight: 500 }}>API Key GoHighLevel</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Key size={16} color="#a6a6a6" style={{ position: "absolute", left: 12, top: 10, pointerEvents: "none" }} />
                    <input
                      type={showKey ? "text" : "password"}
                      placeholder="Incolla la tua API key..."
                      value={ghlKey}
                      onChange={(e) => setGhlKey(e.target.value)}
                      style={{
                        width: "100%", height: 36, borderRadius: 6,
                        padding: "0 40px 0 36px", fontSize: 13,
                        fontFamily: "'JetBrains Mono', monospace", fontWeight: 400,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#f5f5f5", outline: "none",
                        transition: "all 150ms var(--ease-smooth)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.20)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; }}
                    />
                    <button
                      onClick={() => setShowKey(!showKey)}
                      style={{ position: "absolute", right: 8, top: 6, background: "none", border: "none", cursor: "pointer", padding: 4 }}
                    >
                      {showKey ? <EyeOff size={16} color="#a6a6a6" /> : <Eye size={16} color="#a6a6a6" />}
                    </button>
                  </div>
                  <Button variant="default" onClick={handleConnect} disabled={!ghlKey.trim() || connecting}>
                    {connecting ? <><RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> Connessione...</> : <><Link2 size={16} /> Connetti</>}
                  </Button>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 8, background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.1)" }}>
                  <AlertCircle size={16} color="#60a5fa" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: "#60a5fa", lineHeight: 1.5 }}>
                    Trovi la tua API Key in GoHighLevel → Impostazioni → Business Profile → API Key.
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { label: "Contatti sincronizzati", value: "1.247", icon: Users },
                    { label: "Ultima sincronizzazione", value: "5 min fa", icon: RefreshCw },
                    { label: "Pipeline collegate", value: "3", icon: GitBranch },
                  ].map((stat, i) => (
                    <div key={i} style={{ padding: 14, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <stat.icon size={14} color="#a6a6a6" />
                        <span style={{ fontSize: 11, color: "#a6a6a6", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{stat.label}</span>
                      </div>
                      <p style={{ fontSize: 18, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }} className="tabular-nums">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
                  <Button variant="outline" size="sm"><RefreshCw size={14} /> Forza Sync</Button>
                  <Button variant="ghost" size="sm" onClick={() => { setGhlConnected(false); setGhlKey(""); }} style={{ color: "#f87171" }}><XCircle size={14} /> Disconnetti</Button>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {subTab === "account" && (
        <div className="spring-enter" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassCard variant="default" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Dettagli Account</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: "#a6a6a6", fontWeight: 500, display: "block", marginBottom: 6 }}>Nome Completo</label>
                <Input placeholder="Il tuo nome" value="Admin SQUADD" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#a6a6a6", fontWeight: 500, display: "block", marginBottom: 6 }}>Email</label>
                <Input placeholder="email@example.com" value="admin@squadd.it" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <Button variant="default" size="sm">Salva Modifiche</Button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {subTab === "notifiche" && (
        <div className="spring-enter" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GlassCard variant="default" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Preferenze Notifiche</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Nuovo contatto aggiunto", desc: "Ricevi notifica quando un lead entra nel CRM", on: true },
                { label: "Trattativa aggiornata", desc: "Notifiche sugli avanzamenti in pipeline", on: true },
                { label: "Errori automazione", desc: "Alert immediato in caso di errore nei workflow", on: true },
                { label: "Report settimanale", desc: "Riepilogo delle performance ogni lunedi", on: false },
              ].map((pref, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: i < 3 ? 16 : 0, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{pref.label}</p>
                    <p style={{ fontSize: 12, color: "#a6a6a6", marginTop: 2 }}>{pref.desc}</p>
                  </div>
                  <ToggleSwitch defaultOn={pref.on} />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};


/* ── Calendario ── */
const MOCK_EVENTS = [
  { id: 1, title: "Call con Marco Rossi", date: "2026-03-14", time: "09:00", duration: 30, type: "call" as const, contact: "Marco Rossi", company: "Tech Solutions" },
  { id: 2, title: "Demo prodotto FinServices", date: "2026-03-14", time: "14:00", duration: 60, type: "demo" as const, contact: "Francesca Neri", company: "FinServices" },
  { id: 3, title: "Follow-up Laura Bianchi", date: "2026-03-15", time: "10:00", duration: 15, type: "follow-up" as const, contact: "Laura Bianchi", company: "Studio Bianchi" },
  { id: 4, title: "Meeting ManufactureX", date: "2026-03-15", time: "15:00", duration: 90, type: "meeting" as const, contact: "Giuseppe Verdi", company: "Verdi & Partners" },
  { id: 5, title: "Call HealthTec", date: "2026-03-18", time: "11:00", duration: 45, type: "call" as const, contact: "Elena Marchetti", company: "HealthTec" },
  { id: 6, title: "Demo MediaHub", date: "2026-03-18", time: "16:00", duration: 60, type: "demo" as const, contact: "Sofia Colombo", company: "Colombo Media" },
  { id: 7, title: "Review trimestrale", date: "2026-03-19", time: "09:00", duration: 120, type: "meeting" as const, contact: "Team interno", company: "SQUADD" },
  { id: 8, title: "Follow-up Davide Romano", date: "2026-03-20", time: "10:30", duration: 20, type: "follow-up" as const, contact: "Davide Romano", company: "Logistica IT" },
  { id: 9, title: "Onboarding nuovo cliente", date: "2026-03-21", time: "14:00", duration: 60, type: "meeting" as const, contact: "Chiara Romano", company: "Romano Design" },
  { id: 10, title: "Call settimanale team", date: "2026-03-17", time: "09:30", duration: 30, type: "call" as const, contact: "Team interno", company: "SQUADD" },
  { id: 11, title: "Proposta Ricci Import", date: "2026-03-16", time: "11:00", duration: 45, type: "demo" as const, contact: "Francesca Ricci", company: "Ricci Import" },
  { id: 12, title: "Sync con GoHighLevel", date: "2026-03-22", time: "10:00", duration: 30, type: "call" as const, contact: "Supporto GHL", company: "GoHighLevel" },
  { id: 13, title: "Follow-up Ferrari Consulting", date: "2026-03-25", time: "15:00", duration: 20, type: "follow-up" as const, contact: "Anna Ferrari", company: "Ferrari Consulting" },
  { id: 14, title: "Demo ERP per cliente", date: "2026-03-26", time: "10:00", duration: 90, type: "demo" as const, contact: "Roberto Esposito", company: "Esposito Group" },
  { id: 15, title: "Chiusura trimestre", date: "2026-03-31", time: "17:00", duration: 60, type: "meeting" as const, contact: "Team interno", company: "SQUADD" },
];

const EVENT_COLORS: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  call: { dot: "#60a5fa", bg: "rgba(96,165,250,0.08)", text: "#60a5fa", border: "rgba(96,165,250,0.2)" },
  meeting: { dot: "#34d399", bg: "rgba(52,211,153,0.08)", text: "#34d399", border: "rgba(52,211,153,0.2)" },
  "follow-up": { dot: "#fbbf24", bg: "rgba(251,191,36,0.08)", text: "#fbbf24", border: "rgba(251,191,36,0.2)" },
  demo: { dot: "#c084fc", bg: "rgba(192,132,252,0.08)", text: "#c084fc", border: "rgba(192,132,252,0.2)" },
};

const EVENT_ICONS: Record<string, LucideIcon> = {
  call: Clock,
  meeting: Users,
  "follow-up": RefreshCw,
  demo: Video,
};

const DAYS_IT = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const MONTHS_IT = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

function getDaysGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const days: (number | null)[] = Array(startOffset).fill(null);
  for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const CalendarioPage = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(
    toDateStr(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const days = getDaysGrid(year, month);
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const eventsForDate = (dateStr: string) => MOCK_EVENTS.filter(e => e.date === dateStr);
  const selectedEvents = eventsForDate(selectedDate);

  // Stats
  const monthEvents = MOCK_EVENTS.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  const callCount = monthEvents.filter(e => e.type === "call").length;
  const meetingCount = monthEvents.filter(e => e.type === "meeting").length;
  const demoCount = monthEvents.filter(e => e.type === "demo").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div className="spring-enter stagger-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <GlassIconBox icon={Calendar} variant="primary" />
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>Calendario</h1>
            <p style={{ fontSize: 14, color: "#a6a6a6", marginTop: 2 }}>Appuntamenti e scadenze</p>
          </div>
        </div>
        <Button variant="default" size="default"><Plus size={16} /> Nuovo Evento</Button>
      </div>

      {/* Stats row */}
      <div className="spring-enter stagger-1" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard title="Eventi questo mese" value={String(monthEvents.length)} icon={Calendar} delay={1} />
        <StatCard title="Chiamate" value={String(callCount)} icon={Clock} delay={2} />
        <StatCard title="Meeting" value={String(meetingCount)} icon={Users} delay={3} />
        <StatCard title="Demo" value={String(demoCount)} icon={Video} delay={4} />
      </div>

      {/* Calendar + Sidebar */}
      <div className="spring-enter stagger-2" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        {/* Calendar grid */}
        <GlassCard variant="default" style={{ padding: 0, overflow: "hidden" }}>
          {/* Month header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>
              {MONTHS_IT[month]} <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, color: "#a6a6a6" }}>{year}</span>
            </h2>
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()); setSelectedDate(todayStr); }}
                style={{ height: 28, padding: "0 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#a6a6a6", cursor: "pointer", transition: "all 150ms", fontFamily: "'Albert Sans', sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                Oggi
              </button>
              <button onClick={prevMonth} style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#a6a6a6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 150ms" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                <ChevronLeft size={14} />
              </button>
              <button onClick={nextMonth} style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#a6a6a6", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 150ms" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            {DAYS_IT.map(d => (
              <div key={d} style={{ padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a6a6a6" }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} style={{ minHeight: 80, borderBottom: "1px solid rgba(255,255,255,0.03)", borderRight: i % 7 !== 6 ? "1px solid rgba(255,255,255,0.03)" : "none" }} />;
              const dateStr = toDateStr(year, month, day);
              const dayEvents = eventsForDate(dateStr);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;
              const isHovered = dateStr === hoveredDay;
              return (
                <div
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  onMouseEnter={() => setHoveredDay(dateStr)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{
                    minHeight: 80, padding: 6, cursor: "pointer",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    borderRight: i % 7 !== 6 ? "1px solid rgba(255,255,255,0.03)" : "none",
                    background: isSelected ? "rgba(184,255,0,0.04)" : isHovered ? "rgba(255,255,255,0.02)" : "transparent",
                    transition: "background 100ms",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: 12,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: isToday ? 600 : 400,
                      fontFamily: "'JetBrains Mono', monospace",
                      background: isToday ? "#b8ff00" : "transparent",
                      color: isToday ? "#0d0d0d" : isSelected ? "#f5f5f5" : "#a6a6a6",
                    }}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span style={{ fontSize: 10, color: "#a6a6a6", fontFamily: "'JetBrains Mono', monospace" }} className="tabular-nums">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  {/* Event dots */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {dayEvents.slice(0, 3).map((ev) => {
                      const col = EVENT_COLORS[ev.type] || EVENT_COLORS.call;
                      return (
                        <div key={ev.id} style={{
                          height: 4, borderRadius: 2, background: col.dot,
                          opacity: 0.7, transition: "opacity 100ms",
                        }} />
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <span style={{ fontSize: 9, color: "#a6a6a6" }}>+{dayEvents.length - 3}</span>
                    )}
                  </div>
                  {/* Selected indicator */}
                  {isSelected && (
                    <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 2, borderRadius: 1, background: "#b8ff00" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            {Object.entries(EVENT_COLORS).map(([type, col]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: col.dot }} />
                <span style={{ fontSize: 11, color: "#a6a6a6", textTransform: "capitalize" }}>{type === "follow-up" ? "Follow-up" : type}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Event sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Selected date header */}
          <GlassCard variant="elevated" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600 }}>
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <p style={{ fontSize: 12, color: "#a6a6a6", marginTop: 2 }} className="tabular-nums">
                  {selectedEvents.length} {selectedEvents.length === 1 ? "evento" : "eventi"}
                </p>
              </div>
              <Button variant="outline" size="sm"><Plus size={14} /></Button>
            </div>
          </GlassCard>

          {/* Events list */}
          {selectedEvents.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {selectedEvents.map((ev, i) => {
                const col = EVENT_COLORS[ev.type] || EVENT_COLORS.call;
                const EvIcon = EVENT_ICONS[ev.type] || Clock;
                return (
                  <GlassCard key={ev.id} variant="interactive" className={`spring-card stagger-${Math.min(i + 1, 6)}`} style={{ padding: 0, overflow: "hidden" }}>
                    <div style={{ display: "flex" }}>
                      {/* Color bar */}
                      <div style={{ width: 3, background: col.dot, borderRadius: "8px 0 0 8px", flexShrink: 0 }} />
                      <div style={{ flex: 1, padding: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{ev.title}</p>
                          <div style={{
                            width: 24, height: 24, borderRadius: 6,
                            background: col.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 8
                          }}>
                            <EvIcon size={12} color={col.text} />
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Clock size={11} color="#a6a6a6" />
                            <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#a6a6a6" }} className="tabular-nums">
                              {ev.time} · {ev.duration}min
                            </span>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <User size={11} color="#a6a6a6" />
                          <span style={{ fontSize: 12, color: "#a6a6a6" }}>{ev.contact}</span>
                          <span style={{ fontSize: 11, color: "rgba(166,166,166,0.5)" }}>·</span>
                          <span style={{ fontSize: 11, color: "rgba(166,166,166,0.5)" }}>{ev.company}</span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          ) : (
            <GlassCard variant="default" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Calendar size={18} color="#a6a6a6" />
              </div>
              <p style={{ fontSize: 13, color: "#a6a6a6", marginBottom: 4 }}>Nessun evento</p>
              <p style={{ fontSize: 12, color: "rgba(166,166,166,0.5)" }}>Questa giornata e libera</p>
            </GlassCard>
          )}

          {/* Upcoming events */}
          <div style={{ marginTop: 4 }}>
            <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#a6a6a6", marginBottom: 8 }}>Prossimi eventi</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {MOCK_EVENTS
                .filter(e => e.date >= todayStr)
                .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                .slice(0, 4)
                .map((ev) => {
                  const col = EVENT_COLORS[ev.type] || EVENT_COLORS.call;
                  return (
                    <div key={ev.id}
                      onClick={() => setSelectedDate(ev.date)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6, cursor: "pointer", transition: "background 100ms" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: col.dot, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</p>
                      </div>
                      <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#a6a6a6", flexShrink: 0 }} className="tabular-nums">
                        {new Date(ev.date + "T00:00:00").toLocaleDateString("it-IT", { day: "2-digit", month: "short" })} {ev.time}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ══════════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════════ */

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageKey, setPageKey] = useState(0);

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "contatti", label: "Contatti", icon: Users },
    { id: "pipeline", label: "Pipeline", icon: GitBranch },
    { id: "calendario", label: "Calendario", icon: Calendar },
    { id: "automazioni", label: "Automazioni", icon: Zap },
    { id: "impostazioni", label: "Impostazioni", icon: Settings },
  ];

  const handleNav = (id: string) => {
    setPage(id);
    setPageKey(k => k + 1);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const sidebarWidth = sidebarCollapsed ? 48 : 220;

  return (
    <div style={{ height: "100vh", display: "flex", width: "100%", overflow: "hidden", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarWidth, flexShrink: 0,
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
        display: "flex", flexDirection: "column",
        transition: "width 150ms var(--ease-smooth)",
        overflow: "hidden", zIndex: 30,
      }}>
        <div style={{
          height: 56, display: "flex", alignItems: "center",
          padding: sidebarCollapsed ? "0 12px" : "0 16px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          gap: 10, overflow: "hidden", flexShrink: 0,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: "#b8ff00", display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0d0d0d", fontFamily: "'Inter', sans-serif" }}>S</span>
          </div>
          {!sidebarCollapsed && (
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.02em", fontFamily: "'Inter', system-ui, sans-serif", whiteSpace: "nowrap" }}>SQUADD</span>
          )}
        </div>

        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2, overflow: "hidden" }}>
          <p style={{
            fontSize: 10, fontWeight: 500, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)",
            padding: sidebarCollapsed ? "8px 4px" : "8px 8px",
            whiteSpace: "nowrap", overflow: "hidden",
          }}>
            {sidebarCollapsed ? "" : "Menu"}
          </p>

          {nav.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: sidebarCollapsed ? "8px 12px" : "8px 10px",
                  borderRadius: 6,
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  color: active ? "#f5f5f5" : "rgba(230,230,230,0.7)",
                  border: "none", cursor: "pointer",
                  transition: "all 150ms var(--ease-smooth)",
                  fontSize: 13, fontWeight: 400,
                  fontFamily: "'Albert Sans', system-ui, sans-serif",
                  width: "100%", textAlign: "left",
                  justifyContent: sidebarCollapsed ? "center" : "flex-start",
                  whiteSpace: "nowrap", overflow: "hidden",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = active ? "rgba(255,255,255,0.08)" : "transparent"; }}
              >
                <item.icon size={18} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div style={{
          padding: sidebarCollapsed ? "12px 8px" : "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex", flexDirection: "column", gap: 8, flexShrink: 0,
        }}>
          {!sidebarCollapsed && (
            <p style={{ fontSize: 11, color: "rgba(166,166,166,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              admin@squadd.it
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4, display: "flex", transition: "background 150ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              {sidebarCollapsed ? <ChevronRight size={14} color="#a6a6a6" /> : <ChevronLeft size={14} color="#a6a6a6" />}
            </button>
            {!sidebarCollapsed && (
              <button
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4, display: "flex", transition: "background 150ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >
                <LogOut size={14} color="#a6a6a6" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, position: "relative", minWidth: 0, overflowX: "hidden", overflowY: "auto", background: "var(--bg)" }}>
        <div key={pageKey} style={{
          padding: page === "pipeline" ? "24px" : "24px 32px",
          maxWidth: page === "pipeline" ? "none" : 1280,
          margin: page === "pipeline" ? 0 : "0 auto",
          height: page === "pipeline" ? "100%" : "auto",
          animation: "fadeInFast 150ms var(--ease-smooth) both",
        }}>
          {page === "dashboard" && <DashboardPage />}
          {page === "contatti" && <ContattiPage />}
          {page === "pipeline" && <PipelinePage />}
          {page === "calendario" && <CalendarioPage />}
          {page === "automazioni" && <AutomazioniPage />}
          {page === "impostazioni" && <ImpostazioniPage />}
        </div>
      </main>
    </div>
  );
}
