# Design System — Guida di Replicazione

> Documento di riferimento per replicare l'interfaccia e l'esperienza utente del Nexus (Squadd CRM) su un progetto simile.
> Generato: 2026-03-14

---

## Indice

1. [Filosofia di Design](#1-filosofia-di-design)
2. [Stack Tecnologico](#2-stack-tecnologico)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing & Layout](#5-spacing--layout)
6. [Glass Effect System](#6-glass-effect-system)
7. [Animation System](#7-animation-system)
8. [Component Library](#8-component-library)
9. [Sidebar & Navigation](#9-sidebar--navigation)
10. [Page Shell & Layout](#10-page-shell--layout)
11. [Tables](#11-tables)
12. [Forms](#12-forms)
13. [Dialogs & Modals](#13-dialogs--modals)
14. [Tooltips & Popovers](#14-tooltips--popovers)
15. [Toast Notifications](#15-toast-notifications)
16. [Badges & Status Indicators](#16-badges--status-indicators)
17. [Loading & Skeleton States](#17-loading--skeleton-states)
18. [Empty & Error States](#18-empty--error-states)
19. [Icon System](#19-icon-system)
20. [Responsive Design](#20-responsive-design)
21. [Accessibility](#21-accessibility)
22. [Scrollbar & Scroll Behavior](#22-scrollbar--scroll-behavior)
23. [Keyboard Shortcuts](#23-keyboard-shortcuts)
24. [State Persistence](#24-state-persistence)
25. [Data Fetching Patterns](#25-data-fetching-patterns)
26. [Framer Motion Constants](#26-framer-motion-constants)
27. [CSS Custom Properties — Riferimento Completo](#27-css-custom-properties--riferimento-completo)
28. [Tailwind Config — Riferimento Completo](#28-tailwind-config--riferimento-completo)
29. [File da Creare per Primo](#29-file-da-creare-per-primo)

---

## 1. Filosofia di Design

**Estetica**: Dark theme, minimale, corporate. Zero elementi giocosi.

### Principi Guida

| Principio | Regola |
|-----------|--------|
| **Superfici** | Piatte con trasparenze bianche a bassissima opacita (glass effect senza blur) |
| **Colori** | Desaturati e semantici. Nessun colore saturo fuori dal brand green |
| **Brand Color** | Verde primario `hsl(73 100% 53%)` SOLO per CTA principali e accenti |
| **Animazioni** | 150ms per transizioni interattive, spring curves per ingressi. MAI bounce |
| **Typography** | Light weight di default (300), bold solo per enfasi. Uppercase per label |
| **Spaziatura** | Consistente e prevedibile. Grid gap 16px, card padding 16px |
| **Bordi** | Sottilissimi, semi-trasparenti (`border-white/[0.06]`). Mai netti |
| **Lingua UI** | Italiano per tutto il testo visibile all'utente |
| **Tema** | Solo dark mode. Nessun light mode |

### Mood

- Professionale, pulito, strumenti da "control room"
- Densita informativa alta ma non caotica
- Feedback immediato ma non appariscente
- Nessun effetto "wow" — eleganza attraverso la moderazione

---

## 2. Stack Tecnologico

### Core

| Tecnologia | Versione | Ruolo |
|------------|---------|-------|
| **Vite** | 5.x | Build tool + dev server |
| **React** | 18.x | UI framework |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Utility-first CSS |
| **shadcn/ui** | latest | Componenti base (Radix UI + Tailwind) |
| **TanStack Query** | 5.x | Server state management |
| **Framer Motion** | 12.x | Animazioni programmatiche |
| **Sonner** | 1.x | Toast notifications |
| **Lucide React** | latest | Icone |

### Config shadcn/ui

```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Plugin Tailwind

- `tailwindcss-animate` v1.0.7

---

## 3. Color System

### 3.1 Core Palette (HSL — variabili CSS)

| Token | HSL | Hex approssimativo | Uso |
|-------|-----|---------------------|-----|
| `--background` | `0 0% 3.5%` | `#090909` | Sfondo pagina |
| `--foreground` | `0 0% 96%` | `#f5f5f5` | Testo principale |
| `--card` | `0 0% 12%` | `#1f1f1f` | Background card |
| `--card-foreground` | `0 0% 96%` | `#f5f5f5` | Testo su card |
| `--popover` | `0 0% 8.5%` | `#161616` | Background dropdown/menu |
| `--popover-foreground` | `0 0% 96%` | `#f5f5f5` | Testo popover |
| `--primary` | `73 100% 53%` | `#b8ff00` | Brand green (solo CTA) |
| `--primary-foreground` | `0 0% 5%` | `#0d0d0d` | Testo su primary |
| `--secondary` | `0 0% 10%` | `#1a1a1a` | Background secondario |
| `--secondary-foreground` | `0 0% 90%` | `#e5e5e5` | Testo secondario |
| `--muted` | `0 0% 12%` | `#1f1f1f` | Container muted |
| `--muted-foreground` | `0 0% 65%` | `#a6a6a6` | Testo secondario |
| `--accent` | `0 0% 15%` | `#262626` | Background accent |
| `--accent-foreground` | `73 100% 53%` | `#b8ff00` | Testo accent (verde) |
| `--destructive` | `0 65% 55%` | `#d64545` | Rosso errori/pericolo |
| `--destructive-foreground` | `0 0% 100%` | `#ffffff` | Testo su destructive |
| `--success` | `73 100% 53%` | `#b8ff00` | Uguale a primary |
| `--success-foreground` | `0 0% 5%` | `#0d0d0d` | Testo su success |
| `--warning` | `38 92% 55%` | `#e8944a` | Arancione avvisi |
| `--warning-foreground` | `0 0% 5%` | `#0d0d0d` | Testo su warning |
| `--border` | `0 0% 13%` | `#212121` | Bordi sottili |
| `--input` | `0 0% 8%` | `#141414` | Background input |
| `--ring` | `73 50% 35%` | — | Ring focus (verde scuro) |
| `--radius` | `0.5rem` | 8px | Border radius base |

### 3.2 Opacity Scale

| Variabile | Valore | Uso |
|-----------|--------|-----|
| `--opacity-subtle` | `0.04` | Overlay appena percettibile |
| `--opacity-light` | `0.06` | Background leggero |
| `--opacity-medium` | `0.1` | Background moderato |
| `--opacity-strong` | `0.15` | Overlay prominente |

### 3.3 Glass Effect (White-on-Black)

| Classe Tailwind | Opacita | Uso |
|-----------------|---------|-----|
| `bg-white/[0.02]` | 2% | Molto sottile (table header, panel) |
| `bg-white/[0.03]` | 3% | Card default |
| `bg-white/[0.04]` | 4% | Card elevata, icon box |
| `bg-white/[0.05]` | 5% | Hover card |
| `bg-white/[0.06]` | 6% | Card selezionata, dropdown |
| `bg-white/[0.08]` | 8% | Nav item hover/active |
| `bg-white/[0.10]` | 10% | Nav item active press |
| `border-white/[0.04]` | 4% | Bordo riga tabella |
| `border-white/[0.06]` | 6% | Bordo card, divisori sottili |
| `border-white/[0.08]` | 8% | Divisori sezione |
| `border-white/[0.10]` | 10% | Bordo hover |
| `border-white/[0.12]` | 12% | Bordo selezionato |

### 3.4 Semantic Badge Colors

```typescript
const BADGE_COLORS = {
  success: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  info:    "bg-blue-400/10 text-blue-400 border-blue-400/20",
  warning: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  error:   "bg-red-400/10 text-red-400 border-red-400/20",
  purple:  "bg-purple-400/10 text-purple-400 border-purple-400/20",
  violet:  "bg-violet-400/10 text-violet-400 border-violet-400/20",
  green:   "bg-green-400/10 text-green-400 border-green-400/20",
  muted:   "bg-white/[0.04] text-muted-foreground border-white/[0.06]",
}
```

**Pattern colore badge**: Sempre `{colore}-400` al `10%` per background, `{colore}-400` pieno per testo, `{colore}-400` al `20%` per bordo.

### 3.5 Sidebar Colors

| Token | HSL | Uso |
|-------|-----|-----|
| `--sidebar-background` | `0 0% 3%` | Sfondo sidebar |
| `--sidebar-foreground` | `0 0% 90%` | Testo sidebar |
| `--sidebar-primary` | `73 100% 53%` | Accent verde |
| `--sidebar-primary-foreground` | `0 0% 5%` | Testo su accent |
| `--sidebar-accent` | `0 0% 10%` | Background secondario |
| `--sidebar-accent-foreground` | `0 0% 96%` | Testo su accent |
| `--sidebar-border` | `0 0% 12%` | Bordo destro |
| `--sidebar-ring` | `73 100% 53%` | Focus ring |

### 3.6 Gerarchia Colore Testo

| Livello | Classe | Opacita effettiva |
|---------|--------|-------------------|
| Primario | `text-foreground` | 96% bianco |
| Secondario | `text-muted-foreground` | 65% grigio |
| Terziario | `text-muted-foreground/[0.5]` | ~32% grigio |
| Sottile | `text-muted-foreground/[0.1]` | ~6.5% grigio |

---

## 4. Typography

### 4.1 Font Stack

| Ruolo | Font | Pesi caricati | Fallback |
|-------|------|--------------|----------|
| **Sans (default)** | Albert Sans | 300, 400, 500, 600, 700 | system-ui, sans-serif |
| **Display/Headers** | Inter | 400, 500, 600, 700 | system-ui, sans-serif |
| **Monospace** | JetBrains Mono | 400, 500, 600, 700 | ui-monospace, SFMono-Regular, monospace |

**Google Fonts import**:
```html
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 4.2 Tailwind Font Family Config

```typescript
fontFamily: {
  sans: ['Albert Sans', 'system-ui', 'sans-serif'],
  display: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
}
```

### 4.3 Scale Tipografico

| Livello | Classe Tailwind | Pixel | Peso | Tracking | Line-height |
|---------|----------------|-------|------|----------|-------------|
| H1 (Titolo pagina) | `text-lg` | 18px | `font-semibold` (600) | `tracking-tight` | `leading-tight` |
| H2 (Titolo sezione) | `text-sm` | 14px | `font-semibold` (600) | `tracking-wider` | normal |
| H3 (Titolo card) | `text-sm` | 14px | `font-semibold` (600) | `tracking-tight` | `leading-tight` |
| Body | `text-sm` | 14px | `font-light` (300) | normal | normal |
| Nav item | `text-[13px]` | 13px | normal (400) | normal | normal |
| Label | `text-sm` | 14px | `font-medium` (500) | normal | `leading-none` |
| Small/Caption | `text-xs` | 12px | normal (400) | normal | normal |
| Table header | `text-[11px]` | 11px | `font-medium` (500) | `tracking-wider` | normal |
| Badge counter | `text-[10px]` | 10px | normal | normal | normal |
| Sidebar group | `text-[10px]` | 10px | `font-medium` (500) | `tracking-widest` | normal |

### 4.4 Classi Speciali

- **`tabular-nums`** + `font-mono`: Per TUTTI i valori numerici, valute, percentuali, contatori
- **`font-mono`**: Per ID tecnici, codici, hash
- **`uppercase tracking-wider`**: Per titoli di sezione (H2)
- **`uppercase tracking-widest`**: Per label gruppi sidebar (`text-white/20`)

### 4.5 Body Default

```css
body {
  font-family: 'Albert Sans', system-ui, sans-serif;
  font-weight: 300; /* light */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 4.6 Text Selection

```css
::selection {
  background: hsl(73 100% 53% / 0.3); /* brand green 30% */
  color: hsl(220 3% 96%);
}
```

---

## 5. Spacing & Layout

### 5.1 Scale di Spaziatura

| Tailwind | Pixel | Uso tipico |
|----------|-------|------------|
| `gap-1` / `space-y-1` | 4px | Micro-spaziatura |
| `gap-1.5` | 6px | Button group, badge |
| `gap-2` / `space-y-2` | 8px | Toolbar, filtri |
| `gap-2.5` | 10px | Nav item icon-to-text |
| `gap-3` / `space-y-3` | 12px | Spaziatura sezione |
| `gap-4` / `space-y-4` | 16px | Grid card, sezioni pagina |
| `gap-6` / `space-y-6` | 24px | Grande sezione |

### 5.2 Padding Pagina

| Contesto | Classe | Pixel |
|----------|--------|-------|
| Default (mobile) | `p-6` | 24px |
| Default (desktop) | `lg:p-8` | 32px |
| Fullscreen | `p-2` | 8px |
| Custom layout | `h-full` | Nessun padding |

### 5.3 Max-Width

- **Default**: `max-w-7xl mx-auto` = max 1280px, centrato
- **Fullscreen**: Nessun max-width
- **Custom layout**: `h-full` (riempie viewport)

### 5.4 Border Radius System

```css
--radius:    0.5rem;   /* 8px — default */
--radius-sm: 0.5rem;   /* 8px */
--radius-md: 0.625rem; /* 10px */
--radius-lg: 0.875rem; /* 14px */
--radius-xl: 1rem;     /* 16px */
```

| Componente | Radius |
|------------|--------|
| Card, Button, Input | `rounded-md` (8px) |
| GlassCard, Dialog | `rounded-lg` (8px) |
| Badge | `rounded-full` (pill) |
| Toast | `rounded-xl` (16px) |

---

## 6. Glass Effect System

Il linguaggio visivo principale e il "glassmorphism senza blur": trasparenze bianche su sfondo scuro.

### 6.1 GlassCard

```typescript
interface GlassCardProps {
  variant?: "default" | "elevated" | "selected" | "interactive";
}
```

| Variante | Background | Bordo | Extra |
|----------|------------|-------|-------|
| `default` | `bg-white/[0.03]` | `border-white/[0.06]` | — |
| `elevated` | `bg-white/[0.04]` | `border-white/[0.06]` | — |
| `selected` | `bg-white/[0.06]` | `border-white/[0.12]` | — |
| `interactive` | `bg-white/[0.03]` | `border-white/[0.06]` | `hover:bg-white/[0.05] hover:border-white/[0.10] cursor-pointer` |

**Base classes**: `border rounded-lg transition-colors duration-150`

### 6.2 GlassPanel

Container piu largo, ancora piu sottile:
```
bg-white/[0.02] border border-white/[0.04] rounded-lg
```

### 6.3 GlassIconBox

```typescript
interface GlassIconBoxProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";    // 32px, 40px, 48px
  variant?: "default" | "primary" | "muted";
}
```

| Variante | Classes |
|----------|---------|
| `default` | `bg-white/[0.04] text-muted-foreground` |
| `primary` | `bg-white/[0.06] text-foreground/70` |
| `muted` | `bg-white/[0.03] text-muted-foreground/70` |

### 6.4 GlassButtonCard

Card selezionabile:
```
min-h-[120px] p-4
// Selected: checkmark top-right, bg-white/[0.06] border-white/[0.12]
// Unselected: bg-white/[0.03] border-white/[0.06]
```

### 6.5 PageHeader

```tsx
<div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
  <GlassIconBox icon={Icon} />
  <div>
    <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
    <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
  </div>
</div>
```

### 6.6 SectionHeader

```tsx
<div className="mb-6">
  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
    {title}
  </h2>
  {description && <p className="text-muted-foreground text-xs mt-1">{description}</p>}
</div>
```

---

## 7. Animation System

### 7.1 Architettura a 2 Layer

| Layer | Scopo | Easing | Durata |
|-------|-------|--------|--------|
| **Layer 1: Transizioni** | Hover, stato, feedback interattivo | `cubic-bezier(0.22, 1, 0.36, 1)` | 150-300ms |
| **Layer 2: Ingressi** | Entrata elementi in pagina | Spring `linear()` curves | 800ms CSS (200-350ms percepiti) |

### 7.2 Easing — La Curva Principale

```css
--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
```

- Decelerazione aggressiva, zero bounce
- Inizio rapido, fine morbida
- Usata **OVUNQUE** per transizioni interattive

### 7.3 Spring Curves (Layer 2 — Ingressi)

Tre velocita di ingresso, tutte a 800ms CSS con percezione diversa:

```css
/* ~200ms percepiti — sezioni pagina, righe veloci */
--spring-quick: linear(0, 0.0497, 0.1647, 0.3069, 0.4517, 0.5848, 0.6991, 0.7923,
                       0.8647, 0.9186, 0.9571, 0.9831, 0.9996, 1.0091, 1.0137, 1.0151,
                       1.0146, 1.0129, 1.0108, 1.0086, 1.0066, 1.0048, 1.0033, 1.0022,
                       1.0013, 1.0007, 1);

/* ~300ms percepiti — stat card, contenuto medio */
--spring-normal: linear(0, 0.0598, 0.1983, 0.3679, 0.5372, 0.6877, 0.8106, 0.9038,
                        0.9692, 1.0111, 1.0346, 1.0446, 1.0456, 1.0411, 1.034, 1.0261,
                        1.0186, 1.0121, 1.0069, 1.0032, 1.0006, 0.999, 0.9982, 0.9979,
                        0.998, 0.9982, 1);

/* ~350ms percepiti — card fondo pagina, hero */
--spring-smooth: linear(0, 0.0667, 0.2211, 0.4086, 0.5928, 0.7524, 0.8778, 0.9674,
                        1.0247, 1.0557, 1.0674, 1.066, 1.0571, 1.0448, 1.0319, 1.0204,
                        1.011, 1.0041, 0.9995, 0.9968, 0.9956, 0.9954, 0.9959, 0.9966,
                        0.9975, 0.9984, 1);

--spring-dur: 800ms;
```

### 7.4 Durate Standard

| Durata | Uso |
|--------|-----|
| **50ms** | Active/press feedback (scale) |
| **80ms** | Sidebar text fade, exit rapido |
| **150ms** | Hover, focus, transizioni minime (la durata piu usata) |
| **200ms** | Tab switch, color transitions, fade-in elementi |
| **250ms** | Indicator slide, sidebar submenu items |
| **300ms** | Collapse/expand, progress bar, tab indicator position |
| **500ms** | Progress bar fill |
| **800ms** | Spring entrance (durata CSS reale) |
| **1500-2000ms** | Shimmer skeleton loop |

### 7.5 Stagger Delays

| Contesto | Intervallo | Max totale |
|----------|------------|------------|
| Righe tabella | 20ms | 200ms (cap 10 righe) |
| Quick access items | 30ms | 90ms |
| Card KPI / stat | 40ms | ~160ms |
| Sezioni pagina | 50ms | ~250ms |
| Sidebar sub-items | 50ms | 370ms (base 120ms) |
| Skeleton loading | 60ms | ~480ms |

### 7.6 Timeline Plateau (Ingresso Pagina)

```
0ms     → Hero/header (spring-quick)
50ms    → Status briefing (spring-quick)
100ms   → KPI stats (spring-normal)
150ms   → Charts/main content (spring-normal)
200ms   → Tables (spring-normal)
280ms+  → Bottom cards (spring-smooth)
~500ms  → Contenuto leggibile
~800ms  → Tutte le animazioni completate
```

### 7.7 Hover & Press Feedback

```css
/* Hover standard */
transition-colors duration-150

/* Hover card */
translateY(-1px) + ombra soft

/* Active/Press button */
active:brightness-90
/* oppure */
scale(0.93) duration-50ms  /* snappy */

/* Active icon-button */
scale(0.95)
```

### 7.8 Page Transitions

```css
/* Direzione calcolata dal "route depth" */
/* depth 0 = /dashboard, depth 1 = /clienti, depth 2 = /clienti/:id */

/* Drill down (depth aumenta) */
@keyframes pageEnterForward {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Going back (depth diminuisce) */
@keyframes pageEnterBackward {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Sibling nav (stesso depth) */
@keyframes pageEnterLateral {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Tutte: 150ms var(--ease-smooth) */
```

### 7.9 Tab Transitions

```css
/* Tab indicator bar */
.tab-indicator {
  transition: left 300ms var(--ease-smooth),
              width 300ms var(--ease-smooth);
}

/* Tab content: direzione basata sull'indice */
.cd-tab-enter-right  /* Tab index aumenta: slide da destra */
.cd-tab-enter-left   /* Tab index diminuisce: slide da sinistra */
.cd-tab-enter-fade   /* Stesso tab reload: solo fade */
/* Durata: 200ms ease-smooth */
```

### 7.10 Keyframes Fondamentali (da copiare nel CSS)

```css
/* Spring entrance — il pattern piu usato */
@keyframes springEnter {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Spring card entrance — con scale */
@keyframes springCardEnter {
  from { opacity: 0; transform: translateY(6px) scale(0.99); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Spring stat card — scale piu evidente */
@keyframes springStatEnter {
  from { opacity: 0; transform: translateY(6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Fade semplice */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Fade veloce con slide */
@keyframes fadeInFast {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Sidebar submenu stagger */
@keyframes sidebarSubEnter {
  from { opacity: 0; transform: translateX(-3px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Shimmer per skeleton */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Badge pop */
@keyframes badgePop {
  from { transform: scale(0.8); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* Accordion */
@keyframes accordionDown {
  from { height: 0; }
  to   { height: var(--radix-accordion-content-height); }
}
@keyframes accordionUp {
  from { height: var(--radix-accordion-content-height); }
  to   { height: 0; }
}

/* Widget appear */
@keyframes widgetAppear {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* Pulse soft */
@keyframes pulseSoft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.65; }
}

/* Float (empty state icon) */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Shake (error) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

/* Success pulse */
@keyframes successPulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 hsl(73 100% 53% / 0.4); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); box-shadow: 0 0 0 8px hsl(73 100% 53% / 0); }
}
```

### 7.11 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Component Library

### 8.1 Button

```typescript
buttonVariants = {
  variant: {
    default:     "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:     "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]",
    secondary:   "bg-white/[0.04] text-secondary-foreground hover:bg-white/[0.06]",
    ghost:       "hover:bg-white/[0.06] hover:text-accent-foreground",
    link:        "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-9 px-4 py-2",       // 36px
    sm:      "h-8 px-3 text-xs",     // 32px
    lg:      "h-10 px-6",            // 40px
    icon:    "h-9 w-9",              // 36x36px square
  },
}
```

**Base**: `inline-flex items-center justify-center gap-2 rounded-md font-semibold text-sm`
**Transitions**: `transition-colors duration-150 active:brightness-90`
**Disabled**: `disabled:pointer-events-none disabled:opacity-50`
**Icone interne**: `[&_svg]:h-4 [&_svg]:w-4`

### 8.2 Card (shadcn)

```
Card:            bg-white/[0.03] border border-white/[0.06] rounded-lg transition-colors duration-150
Card interactive: + hover:bg-white/[0.05] hover:border-white/[0.10] cursor-pointer
CardHeader:      p-4 space-y-1.5
CardTitle:       text-sm font-semibold leading-tight tracking-tight
CardDescription: text-xs text-muted-foreground
CardContent:     p-4 pt-0
CardFooter:      p-4 pt-0, flex row
```

### 8.3 Input

```
h-9 rounded-md px-3 py-2 text-sm
bg-white/[0.03] border border-white/[0.06]
placeholder: text-muted-foreground/50
hover: bg-white/[0.05] border-white/[0.10]
focus: border-white/[0.20] ring-1 ring-primary/15
```

**Stati speciali**:
- Success: `border-emerald-400/50`
- Error: `border-destructive/50`
- Numeri: Blocca scroll wheel

### 8.4 Select

```
Trigger:    come input, h-9 con chevron
Content:    bg-popover border-white/[0.08]
Item:       py-2 pl-8 pr-3 text-sm, hover bg-white/[0.06]
Check icon: h-4 w-4 text-primary
```

### 8.5 Checkbox

```
Size:    h-4 w-4
Border:  border-white/[0.15], hover border-white/[0.25]
Checked: bg-primary border-primary text-primary-foreground
Anim:    animate-in zoom-in-50 fade-in-0
```

### 8.6 Switch

```
Size:      h-5 w-9
Checked:   bg-primary
Unchecked: bg-input
Thumb:     h-4 w-4 rounded-full bg-background
Anim:      translate-x-4 da unchecked a checked
```

### 8.7 Tabs

```
TabsList:    h-10 bg-muted/50 border-border/50 p-1 gap-0.5
TabsTrigger: h-8 px-3 text-sm transition-colors duration-150
  Active:   bg-background text-foreground shadow-sm
  Inactive: text-muted-foreground hover:text-foreground
```

### 8.8 Alert

```typescript
alertVariants = {
  default:     "bg-white/[0.03] border-white/[0.06] text-foreground",
  destructive: "bg-red-400/5 border-red-400/20 text-red-400",
}
// rounded-lg border p-4 transition-colors duration-150
```

### 8.9 Progress Bar

```
Track: h-4 w-full bg-secondary rounded-full
Fill:  bg-primary transition-all duration-500
```

### 8.10 Premium Stat Card

```typescript
interface PremiumStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string; direction: "up" | "down" };
  variant?: "default" | "success" | "warning" | "error" | "info";
}
// bg-white/[0.03] border border-white/[0.06] p-4 rounded-lg
// Trend arrow: rotates 180deg on "down"
// Value: tabular-nums per allineamento
```

### 8.11 Premium Progress

```typescript
interface PremiumProgressProps {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";  // h-1, h-2, h-3
}
// Track: bg-white/[0.06]
// Fill:  bg-primary | bg-emerald-400 | bg-amber-400 | bg-red-400
// Anim:  transition-all duration-500
```

---

## 9. Sidebar & Navigation

### 9.1 Struttura

```
SidebarProvider (defaultOpen={true})
  └─ Sidebar (collapsible="icon")
      ├─ SidebarHeader
      │   ├─ Logo
      │   └─ Action buttons (search, notifications, quick action)
      ├─ SidebarContent (scrollabile)
      │   └─ Navigation groups (collapsibili)
      └─ SidebarFooter
          ├─ Email utente
          ├─ Logout
          └─ Collapse toggle
```

### 9.2 Dimensioni

| Stato | Larghezza | CSS Property |
|-------|-----------|--------------|
| **Espansa** | 220px (13.75rem) | `--sidebar-width` |
| **Collassata** | 48px (3rem) | `--sidebar-width-icon` |
| **Mobile** | 256px (16rem) | `--sidebar-width-mobile` |

### 9.3 Animazione Collasso

```css
/* Width transition */
transition: width 150ms cubic-bezier(0.22, 1, 0.36, 1);

/* Text fade (.sb-text-fade) */
transition: opacity 80ms, transform 80ms;

/* Collapsed: testo sparisce subito */
[data-state="collapsed"] .sb-text-fade {
  opacity: 0; transform: translateX(-4px);
  pointer-events: none; transition-delay: 0ms;
}

/* Expanded: testo riappare con delay */
[data-state="expanded"] .sb-text-fade {
  transition-delay: 60ms;
}
```

### 9.4 Dimensioni Icone

| Contesto | Pixel | Classe |
|----------|-------|--------|
| Nav principale | 18x18 | `h-[18px] w-[18px]` |
| Sub-item | 16x16 | `h-[16px] w-[16px]` |
| Chevron | 12x12 | `h-3 w-3` |
| Footer | 14x14 | `h-3.5 w-3.5` |

### 9.5 Dimensioni Testo

| Contesto | Classe |
|----------|--------|
| Nav item | `text-[13px]` |
| Sub-item | `text-[13px]` o `text-[12px]` |
| Group header | `text-[10px] uppercase tracking-widest text-white/20` |
| Badge counter | `text-[10px] tabular-nums text-white/50` |
| Footer email | `text-[11px] text-muted-foreground/50` |

### 9.6 Stati Hover/Active/Selected

**Nav item principale**:
```
Base:     text-sidebar-foreground/70
Hover:    bg-white/[0.08] text-foreground
Active:   bg-white/[0.10]
Selected: bg-white/[0.08] text-foreground
Focus:    ring-1 ring-primary/15
```

**Sub-item**:
```
Base:     text-sidebar-foreground/55
Hover:    bg-white/[0.08] text-foreground
Selected: bg-white/[0.08] text-foreground
```

### 9.7 Submenu Tree

```
ml-[15px]                          /* 15px margine sinistro */
pl-2.5                             /* 10px padding sinistro */
border-l border-white/[0.06]       /* Linea verticale */
mt-px space-y-px                   /* 1px gap tra items */
```

### 9.8 Accordion Submenu

```css
.sb-accordion-grid {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 500ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 350ms cubic-bezier(0.22, 1, 0.36, 1);
}
[data-state="open"] > .sb-accordion-grid {
  grid-template-rows: 1fr;
  opacity: 1;
}

/* Stagger sub-items: 280ms animation, 50ms intervals starting at 120ms */
```

### 9.9 Background

- Colore: `bg-sidebar` = `hsl(0 0% 3%)` (#0a0a0a)
- Pattern opzionale: SVG grid blueprint 240x240px, z-0
- Bordo destro: `border-r border-sidebar-border`
- Nessun blur

### 9.10 Mobile

- **Breakpoint**: `md` (768px)
- **Sotto 768px**: Sheet overlay (off-canvas)
- **Sopra 768px**: Fissa, collassabile a icon-only
- **Chiusura mobile**: Tap fuori, Escape

---

## 10. Page Shell & Layout

### 10.1 Struttura DashboardLayout

```tsx
<SidebarProvider defaultOpen={true}>
  <div className="h-screen flex w-full relative overflow-hidden">
    <AppSidebar />
    <main className="flex-1 relative z-10 min-w-0 overflow-x-hidden bg-background">
      <div className={layoutClasses}>
        {children}
      </div>
    </main>
  </div>
</SidebarProvider>
```

### 10.2 Layout Variants

| Route Type | Classes | Overflow |
|------------|---------|----------|
| Standard | `p-6 lg:p-8 max-w-7xl mx-auto` | `overflow-y-auto` |
| Fullscreen (calendario) | `p-2` | `overflow-hidden` |
| Custom (email, mindmap, AI) | `h-full` | `overflow-hidden` |

### 10.3 Route Protection

```
ProtectedRoute > RoleBasedRoute > DashboardLayout > ErrorBoundary > Suspense > Page
```

### 10.4 Page Header Standard

```tsx
<div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
  <div>
    <h1 className="text-lg font-semibold text-foreground leading-tight tracking-tight">
      Titolo Pagina
    </h1>
    <p className="text-muted-foreground text-sm mt-0.5">Sottotitolo</p>
  </div>
  <span className="text-sm text-muted-foreground tabular-nums">
    Conteggio
  </span>
</div>
```

### 10.5 Content Structure

```tsx
<div className="space-y-4">
  {/* Header */}
  {/* Toolbar/Filtri: flex gap-2 flex-wrap */}
  {/* Grid Card: grid md:grid-cols-2 lg:grid-cols-3 gap-4 */}
  {/* Table */}
</div>
```

---

## 11. Tables

### 11.1 Struttura

```tsx
<div className="border border-white/[0.06] rounded-lg overflow-hidden">
  <div className="overflow-x-auto overflow-y-auto max-h-[calc(100dvh-260px)]">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>...</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell>...</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</div>
```

### 11.2 Stili

| Elemento | Classes |
|----------|---------|
| Container | `border border-white/[0.06] rounded-lg overflow-hidden` |
| Scroll area | `max-h-[calc(100dvh-260px)] overflow-x-auto overflow-y-auto` |
| Header bg | `bg-white/[0.02]` |
| Header cella | `h-9 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground` |
| Header sticky | `sticky top-0 z-20 bg-[hsl(220,5%,11%)]` |
| Riga body | `border-b border-white/[0.04] transition-colors duration-150` |
| Riga hover | `hover:bg-white/[0.03]` |
| Riga selezionata | `bg-primary/10 hover:bg-primary/15` |
| Cella | `py-2 px-3 align-middle` |

### 11.3 ClickableTableRow

- Prop `href` per navigazione
- Varianti: `"default" | "warning" | "success" | "muted"`
- Focus: `ring-primary/15`
- Keyboard: Enter/Space per attivare

### 11.4 Pagination

```
flex justify-between px-4 py-2.5 border-t border-white/[0.04]
```

### 11.5 Row Stagger Animation

```css
/* Intervallo 20ms, cap a 10 righe */
.row-stagger-1  { animation: springEnter 200ms var(--ease-smooth) 20ms forwards; }
.row-stagger-2  { animation: springEnter 200ms var(--ease-smooth) 40ms forwards; }
/* ... fino a -10 (200ms) */
.row-stagger-rest { animation: springEnter 200ms var(--ease-smooth) 220ms forwards; }
```

---

## 12. Forms

### 12.1 Layout

- Stacking verticale: label sopra input
- `FormItem` contiene label + input + errore
- Spaziatura: `space-y-2` per FormItem

### 12.2 Componenti

```
FormItem:        space-y-2
FormLabel:       text-sm font-medium, diventa rosso su errore
FormControl:     wrapper per input
FormDescription: text-sm text-muted-foreground
FormMessage:     text-destructive, animazione fade-in + slide-in-from-top-1 duration-150
```

### 12.3 Altezze Standard

| Componente | Altezza |
|------------|---------|
| Input | h-9 (36px) |
| Select trigger | h-9 (36px) |
| Button | h-9 (36px) |
| Button sm | h-8 (32px) |

### 12.4 Multi-Step Wizard

- `FormStepWrapper` per ogni step
- Auto-focus primo input al mount (150ms delay)
- Animazioni direzionali (forward: slide right, backward: slide left)
- Spring animations 600ms durata, stagger 50-180ms

---

## 13. Dialogs & Modals

### 13.1 Overlay

```
bg-black/80 backdrop-blur-sm
Fade animation: duration-150
```

### 13.2 Content Box

```
Centered: fixed left-50% top-50% translate(-50%, -50%)
Max width: max-w-lg (variabili: sm, md, lg, xl, 2xl, 3xl, 4xl)
Padding: p-6 gap-4
Border: border-white/[0.08]
Background: bg-card
Border-radius: rounded-lg
```

### 13.3 Animazioni

- Overlay: fade in/out `duration-150`
- Content: `zoom-in-95 + slide-in-from-top-[52%]`
- Framer Motion variant: `{ opacity: 0, y: 12, scale: 0.97 }`

### 13.4 Close Button

```
Posizione: top-right
Size: p-1.5, icona h-4 w-4
Hover: bg-white/[0.06]
Aria-label: "Chiudi"
```

### 13.5 Sheet (Side Panel)

```
Lati: left | right | top | bottom
Larghezza: w-3/4 sm:max-w-sm
Slide in/out basato sul lato, duration-150
```

---

## 14. Tooltips & Popovers

### 14.1 Tooltip

```
SideOffset: 4px
Background: bg-popover border-white/[0.08] shadow-md
Animazione: fade + zoom, duration-150
```

### 14.2 Popover

```
Larghezza: w-72
Stile: rounded-lg border-white/[0.08] bg-popover p-4
Animazione: zoom + slide, duration-150
```

---

## 15. Toast Notifications

### 15.1 Configurazione (Sonner)

| Proprieta | Valore |
|-----------|--------|
| Posizione | bottom-right |
| Durata | 2000ms |
| Max visibili | 4 |
| Styling | `bg-card border-white/[0.1] rounded-xl shadow-lg` |
| Dismiss | Auto-dismiss 2s + close button |

### 15.2 Varianti

- `success` — Verde
- `error` — Rosso
- `info` — Blu
- `warning` — Ambra
- `loading` — Con spinner

### 15.3 Pattern Async

```typescript
// Toast loading per operazioni async
const toastId = toast.loading("Salvataggio in corso...");
try {
  await saveData();
  toast.success("Salvato!", { id: toastId });
} catch {
  toast.error("Errore nel salvataggio", { id: toastId });
}
```

---

## 16. Badges & Status Indicators

### 16.1 Badge Component

```
Forma:     rounded-full (pill)
Padding:   px-2.5 py-0.5
Font:      text-xs font-semibold
Transition: transition-colors duration-150
Animazione: badgePop 150ms cubic-bezier(0.22, 1, 0.36, 1)
```

### 16.2 Varianti

| Variante | Background | Testo | Bordo |
|----------|------------|-------|-------|
| `default` | `bg-primary/10` | `text-primary` | — |
| `secondary` | `bg-white/[0.06]` | `text-secondary-foreground` | — |
| `destructive` | `bg-red-400/10` | `text-red-400` | — |
| `warning` | `bg-amber-400/10` | `text-amber-400` | — |
| `success` | `bg-emerald-400/10` | `text-emerald-400` | — |
| `outline` | `bg-white/[0.03]` | `text-foreground` | `border-white/[0.08]` |

### 16.3 Pattern Status Colori

Per qualsiasi status mapping (pagamenti, abbonamenti, fatture, etc.):

```typescript
const STATUS_COLORS: Record<string, string> = {
  attivo:    BADGE_COLORS.success,
  pending:   BADGE_COLORS.warning,
  cancellato: BADGE_COLORS.error,
  sospeso:   BADGE_COLORS.muted,
  // etc.
}
```

---

## 17. Loading & Skeleton States

### 17.1 Shimmer CSS

```css
.shimmer {
  background: linear-gradient(90deg,
    hsl(220 5% 100% / 0.02) 0%,
    hsl(220 5% 100% / 0.06) 50%,
    hsl(220 5% 100% / 0.02) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

### 17.2 Skeleton Base

```
rounded-md bg-white/[0.04] + classe .shimmer
```

### 17.3 Spinner

```
Sizes: sm (16px), md (24px), lg (32px), xl (40px)
animate-spin, transition-all duration-150
```

### 17.4 LoadingOverlay

```
fixed inset-0 z-50 backdrop-blur-sm, fade-in 150ms
```

### 17.5 Page Loading Skeleton (Code Splitting)

```
min-h-[60vh] centrato flex
Spinner: h-8 w-8 text-primary/60
Glow: bg-primary/20 blur-xl animate-pulse
Testo: "Caricamento..."
```

### 17.6 Stagger Skeleton

```css
/* 60ms intervals */
.skeleton-1 { animation-delay: 0ms; }
.skeleton-2 { animation-delay: 60ms; }
.skeleton-3 { animation-delay: 120ms; }
/* ... */
```

---

## 18. Empty & Error States

### 18.1 Empty State Minimale

```
Icona: h-8 w-8, opacita 40%
Animazione: fade-in + zoom-in duration-150
Uso: righe tabella vuote, sezione senza dati
```

### 18.2 Empty State Completo

```
Icona container: w-24 h-24, bordo glassmorphism
Glow: bg-primary/20 blur-xl animate-pulse (doppio anello)
Animazione: fade-in
Uso: prima vista, dialog modali
```

### 18.3 Error State

| Variante | Colore | Icona | Uso |
|----------|--------|-------|-----|
| `destructive` | Rosso | `XCircle` | Query fallite |
| `warning` | Ambra | `AlertTriangle` | Validazione |
| `info` | Blu | `AlertCircle` | Informativo |
| `offline` | Slate | `WifiOff` | Errori rete |

### 18.4 Animazioni Ingresso Error

```
Icona:     animate-in zoom-in-50 duration-150
Testo:     slide-in-from-top-1 duration-150 delay-75
Azioni:    slide-in-from-bottom-2 duration-150 delay-150
Dettagli:  collapse/expand 300ms
```

### 18.5 Pattern Retry

```tsx
<Button onClick={() => refetch()} variant="outline" size="sm">
  <RefreshCw className="h-3 w-3" />
  Riprova
</Button>
```

---

## 19. Icon System

### 19.1 Libreria

**Lucide React** per tutte le icone.

### 19.2 Dimensioni Standard

| Contesto | Pixel | Classe |
|----------|-------|--------|
| Header/hero | 24x24 | `h-6 w-6` |
| Tabella/button | 16x16 | `h-4 w-4` |
| Button small | 14x14 | `h-3.5 w-3.5` |
| Empty state | 32x32 | `h-8 w-8` |
| Nav principale | 18x18 | `h-[18px] w-[18px]` |
| Nav sub-item | 16x16 | `h-[16px] w-[16px]` |
| Chevron | 12x12 | `h-3 w-3` |

### 19.3 Pattern Standard

```tsx
<Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
```

- Sempre `shrink-0` per impedire restringimento in flex
- `aria-hidden="true"` quando decorativa
- Colore via `text-*` class

---

## 20. Responsive Design

### 20.1 Breakpoints

| Breakpoint | Min-width | Uso |
|------------|-----------|-----|
| `sm` | 640px | Raramente usato |
| `md` | 768px | Grid 2 col, sidebar mobile |
| `lg` | 1024px | Grid 3 col, padding p-8 |
| `xl` | 1280px | Raro |

### 20.2 Pattern Comuni

| Pattern | Classes |
|---------|---------|
| Padding pagina | `p-6 lg:p-8` |
| Grid card | `grid md:grid-cols-2 lg:grid-cols-3 gap-4` |
| Visibilita | `hidden sm:inline` |
| Flex direction | `flex-col md:flex-row` |
| Form width | `w-full md:w-1/2` |

### 20.3 Comportamento

**Mobile (< 768px)**:
- Sidebar: Sheet overlay
- Padding: 24px
- Tabelle: scroll orizzontale
- Single-column
- Bottoni: solo icona

**Tablet (768px - 1023px)**:
- Sidebar toggleable
- Grid 2 colonne

**Desktop (1024px+)**:
- Sidebar sempre visibile
- Padding: 32px
- Grid 3 colonne
- Max-width 1280px centrato

---

## 21. Accessibility

### 21.1 Focus Indicators

```
focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/15
```

### 21.2 Keyboard Navigation

- Tab: navigazione focus
- Arrow Up/Down: sidebar items
- Enter/Space: attivare link e bottoni
- Escape: chiudere dialog/sheet/popover
- Cmd/Ctrl + B: toggle sidebar

### 21.3 ARIA

- `aria-label` su tutti i bottoni senza testo
- `aria-expanded` su collassabili
- `aria-current="page"` su nav item attivo
- `aria-haspopup="menu"` su trigger popover
- `role="navigation"` sulla sidebar
- `aria-live="polite"` per notifiche

### 21.4 Semantic HTML

- `<nav>` per navigazione
- `<ul>/<li>` per menu items
- `<button>` per azioni, `<a>` per navigazione
- `<table>` con `<thead>/<tbody>` per dati tabulari
- Headings gerarchici h1 > h2 > h3

---

## 22. Scrollbar & Scroll Behavior

```css
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: hsl(220 4% 25%);
  background-clip: padding-box;
  border: 2px solid transparent;
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(220 4% 30%);
}
::-webkit-scrollbar-thumb:active {
  background: hsl(73 100% 53% / 0.5); /* brand green */
}
```

- **Invisibile di default**: Appare su hover/scroll
- **Smooth scroll**: `scroll-behavior: smooth` su `<html>`
- **Scroll-to-top**: Su ogni cambio route

---

## 23. Keyboard Shortcuts

| Shortcut | Azione |
|----------|--------|
| `Cmd/Ctrl + B` | Toggle sidebar |
| `Cmd/Ctrl + J` | Toggle AI chat panel |
| `Arrow Up/Down` | Navigare sidebar |
| `Enter/Space` | Attivare item |
| `Escape` | Chiudere overlay |
| `Tab` | Navigazione focus |

---

## 24. State Persistence

### 24.1 Session Storage

| Key | Contenuto | Scopo |
|-----|-----------|-------|
| `sidebar-open-group` | ID gruppo aperto | Ricordare accordion aperto |

### 24.2 Cookie

| Cookie | Valore | Durata |
|--------|--------|--------|
| `sidebar:state` | `true`/`false` | 7 giorni |

---

## 25. Data Fetching Patterns

### 25.1 TanStack Query Defaults

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minuti
      refetchOnWindowFocus: false,
    },
  },
});
```

### 25.2 Pattern Loading

```typescript
// Prima volta: skeleton completo
if (isLoading) return <SkeletonTable />;

// Refetch: dati cached + spinner piccolo
if (isFetching && !isLoading) return <DataWithSpinner />;

// Errore con retry
if (isError) return <ErrorState onRetry={() => refetch()} />;
```

### 25.3 Placeholder Data

```typescript
placeholderData: (previousData) => previousData
// Mostra dati cached durante refetch — niente flicker
```

---

## 26. Framer Motion Constants

```typescript
// Easing
const EASE_OUT: Easing = [0.22, 1, 0.36, 1];

// Durate
const duration = {
  fast: 0.15,
  normal: 0.2,
  transition: 0.2,
  slow: 0.25,
};

// Stagger
const stagger = {
  tight: 0.03,
  normal: 0.06,
  wide: 0.05,
};

// Offset (translateY in px)
const offset = {
  subtle: 8,
  medium: 12,
  large: 16,
};

// Cap massimo stagger
const STAGGER_CAP = 0.24;

// Tab spring
const TAB_SPRING = {
  type: "tween",
  duration: 0.3,
  ease: EASE_OUT,
};

// Page transition
const PAGE_TRANSITION_DURATION = 0.18;

// Dialog variants
const dialogVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15, ease: EASE_OUT } },
};
```

---

## 27. CSS Custom Properties — Riferimento Completo

```css
:root {
  /* Motion easing */
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);

  /* Spring curves */
  --spring-quick: linear(...);   /* vedi sezione 7.3 */
  --spring-normal: linear(...);
  --spring-smooth: linear(...);
  --spring-dur: 800ms;

  /* Colors (HSL senza hsl() wrapper — usati con hsl()) */
  --background: 0 0% 3.5%;
  --foreground: 0 0% 96%;
  --card: 0 0% 12%;
  --card-foreground: 0 0% 96%;
  --popover: 0 0% 8.5%;
  --popover-foreground: 0 0% 96%;
  --primary: 73 100% 53%;
  --primary-foreground: 0 0% 5%;
  --secondary: 0 0% 10%;
  --secondary-foreground: 0 0% 90%;
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 65%;
  --accent: 0 0% 15%;
  --accent-foreground: 73 100% 53%;
  --destructive: 0 65% 55%;
  --destructive-foreground: 0 0% 100%;
  --success: 73 100% 53%;
  --success-foreground: 0 0% 5%;
  --warning: 38 92% 55%;
  --warning-foreground: 0 0% 5%;
  --border: 0 0% 13%;
  --input: 0 0% 8%;
  --ring: 73 50% 35%;

  /* Border radius */
  --radius: 0.5rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1rem;

  /* Sidebar */
  --sidebar-background: 0 0% 3%;
  --sidebar-foreground: 0 0% 90%;
  --sidebar-primary: 73 100% 53%;
  --sidebar-primary-foreground: 0 0% 5%;
  --sidebar-accent: 0 0% 10%;
  --sidebar-accent-foreground: 0 0% 96%;
  --sidebar-border: 0 0% 12%;
  --sidebar-ring: 73 100% 53%;

  /* Opacity tokens */
  --opacity-subtle: 0.04;
  --opacity-light: 0.06;
  --opacity-medium: 0.1;
  --opacity-strong: 0.15;
}
```

---

## 28. Tailwind Config — Riferimento Completo

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['Albert Sans', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        "widget-appear": {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "badge-pop": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        shake: "shake 0.3s ease-in-out",
        "widget-appear": "widget-appear 0.3s ease-out",
        "badge-pop": "badge-pop 150ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## 29. File da Creare per Primo

Quando si avvia un nuovo progetto con questo design system, creare in quest'ordine:

### 29.1 Setup Iniziale

1. **`tailwind.config.ts`** — Config completa (sezione 28)
2. **`src/index.css`** — Variabili CSS (sezione 27) + keyframes (sezione 7.10) + base styles + scrollbar + reduced motion
3. **`index.html`** — Google Fonts link (sezione 4.1)
4. **`components.json`** — Config shadcn (sezione 2)

### 29.2 Componenti Fondamentali

5. **`src/components/ui/button.tsx`** — shadcn button (sezione 8.1)
6. **`src/components/ui/card.tsx`** — shadcn card (sezione 8.2)
7. **`src/components/ui/glass-card.tsx`** — GlassCard + GlassPanel + GlassIconBox + PageHeader + SectionHeader (sezione 6)
8. **`src/components/ui/badge.tsx`** — Badge con varianti (sezione 16)
9. **`src/components/ui/input.tsx`** — Input (sezione 8.3)
10. **`src/components/ui/table.tsx`** — Table components (sezione 11)
11. **`src/components/ui/skeleton.tsx`** — Shimmer skeleton (sezione 17)
12. **`src/components/ui/loading-state.tsx`** — Spinner, LoadingOverlay, LoadingContainer
13. **`src/components/ui/error-state.tsx`** — ErrorState, InlineError, ErrorBoundaryFallback

### 29.3 Utilities

14. **`src/lib/formatters.ts`** — formatCurrency, formatDate, BADGE_COLORS
15. **`src/lib/constants/ui.ts`** — UI_CONSTANTS, SKELETON_DELAYS, ICON_SIZES
16. **`src/lib/animation.ts`** — EASE_OUT, duration, stagger, offset, Framer Motion constants

### 29.4 Layout

17. **`src/components/layout/DashboardLayout.tsx`** — Shell principale
18. **`src/components/layout/AppSidebar.tsx`** — Sidebar con navigazione
19. **`src/components/ui/sidebar.tsx`** — shadcn sidebar primitives

### 29.5 Pacchetti NPM Necessari

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "@tanstack/react-query": "^5",
    "framer-motion": "^12",
    "sonner": "^1",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-dropdown-menu": "latest",
    "@radix-ui/react-popover": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-tabs": "latest",
    "@radix-ui/react-tooltip": "latest",
    "@radix-ui/react-checkbox": "latest",
    "@radix-ui/react-switch": "latest",
    "@radix-ui/react-slot": "latest"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react-swc": "latest",
    "typescript": "^5",
    "tailwindcss": "^3",
    "tailwindcss-animate": "^1",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}
```

---

> Questo documento e autosufficiente per replicare l'intero design system su un nuovo progetto React + Tailwind + shadcn/ui.
> Per dettagli specifici su singole pagine o componenti avanzati, consultare il codice sorgente del progetto Nexus.
