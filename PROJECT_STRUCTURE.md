# SorBit - Complete Project Structure

## 📂 Full Directory Tree
```
sorbit/
├── public/
│   └── logo.png                    # Your logo file (YOU NEED TO ADD THIS)
│
├── src/
│   ├── assets/
│   │   ├── icons/                  # Future icon files
│   │   └── images/
│   │       └── logo.png            # Optional: Copy of logo
│   │
│   ├── components/
│   │   ├── cards/
│   │   │   ├── StatCard.jsx        # Stat card component with animations
│   │   │   └── StatCard.css        # Stat card styles
│   │   │
│   │   ├── layout/
│   │   │   ├── Hero.jsx            # Landing page hero section
│   │   │   ├── Hero.css            # Hero section styles
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   ├── Layout.css          # Layout styles
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   ├── Sidebar.css         # Sidebar styles
│   │   │   ├── Topbar.jsx          # Top navigation bar
│   │   │   └── Topbar.css          # Topbar styles
│   │   │
│   │   └── ui/
│   │       ├── Badge.jsx           # Badge component
│   │       ├── Badge.css           # Badge styles
│   │       ├── Button.jsx          # Button component
│   │       ├── Button.css          # Button styles
│   │       ├── Card.jsx            # Card component
│   │       ├── Card.css            # Card styles
│   │       ├── Input.jsx           # Input component
│   │       └── Input.css           # Input styles
│   │
│   ├── hooks/
│   │   └── useTheme.js             # Theme toggle hook
│   │
│   ├── pages/
│   │   ├── Accounts.jsx            # Connected accounts page
│   │   ├── Accounts.css            # Accounts page styles
│   │   ├── Analytics.jsx           # Analytics page
│   │   ├── Analytics.css           # Analytics page styles
│   │   ├── Dashboard.jsx           # Main dashboard page
│   │   ├── Dashboard.css           # Dashboard page styles
│   │   ├── Settings.jsx            # Settings page
│   │   └── Settings.css            # Settings page styles
│   │
│   ├── services/
│   │   └── api.js                  # API service with mock data
│   │
│   ├── styles/
│   │   ├── global.css              # Global styles and utilities
│   │   └── theme.css               # Theme variables and colors
│   │
│   ├── utils/
│   │   └── formatNumber.js         # Number formatting utilities
│   │
│   ├── App.jsx                     # Main app component with routing
│   └── main.jsx                    # App entry point
│
├── .gitignore                      # Git ignore rules
├── FEATURES.md                     # Features checklist
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── PROJECT_STRUCTURE.md            # This file
├── README.md                       # Main documentation
├── SETUP.md                        # Setup instructions
└── vite.config.js                  # Vite configuration
```

## 📝 File Counts

- **Total Files**: 45+
- **React Components**: 13
- **CSS Files**: 13
- **Utility Files**: 3
- **Configuration Files**: 5
- **Documentation Files**: 4

## 🔍 File Purposes

### Root Level
| File | Purpose |
|------|---------|
| `index.html` | HTML entry point, loads React app |
| `package.json` | Project dependencies and npm scripts |
| `vite.config.js` | Vite build configuration |
| `.gitignore` | Files to ignore in git |
| `README.md` | Main project documentation |
| `SETUP.md` | Quick setup guide |
| `FEATURES.md` | Complete features list |
| `PROJECT_STRUCTURE.md` | This file - project structure |

### Source Files (`src/`)

#### Main App Files
| File | Purpose |
|------|---------|
| `main.jsx` | Entry point, renders App |
| `App.jsx` | Main component, defines routes |

#### Styles (`src/styles/`)
| File | Purpose |
|------|---------|
| `theme.css` | CSS variables, colors, design tokens |
| `global.css` | Global styles, utilities, animations |

#### Components (`src/components/`)

**Layout Components:**
| File | Purpose |
|------|---------|
| `Hero.jsx/css` | Landing page with hero section |
| `Layout.jsx/css` | Main app layout wrapper |
| `Sidebar.jsx/css` | Navigation sidebar |
| `Topbar.jsx/css` | Top navigation bar |

**UI Components:**
| File | Purpose |
|------|---------|
| `Button.jsx/css` | Reusable button component |
| `Input.jsx/css` | Reusable input component |
| `Card.jsx/css` | Reusable card component |
| `Badge.jsx/css` | Reusable badge component |

**Card Components:**
| File | Purpose |
|------|---------|
| `StatCard.jsx/css` | Statistics card with animations |

#### Pages (`src/pages/`)
| File | Purpose |
|------|---------|
| `Dashboard.jsx/css` | Main dashboard overview |
| `Accounts.jsx/css` | Social media accounts management |
| `Analytics.jsx/css` | Performance analytics |
| `Settings.jsx/css` | User settings and preferences |

#### Utilities (`src/`)
| File | Purpose |
|------|---------|
| `hooks/useTheme.js` | Theme toggle functionality |
| `services/api.js` | API calls with mock data |
| `utils/formatNumber.js` | Number formatting utilities |

## 🎨 Design System Files

### Color System
- **File**: `src/styles/theme.css`
- **Contains**: Primary, secondary, accent colors, light/dark themes

### Typography
- **File**: `src/styles/theme.css`
- **Contains**: Font sizes, weights, line heights

### Spacing
- **File**: `src/styles/theme.css`
- **Contains**: Spacing scale (xs to 3xl)

### Components
- **Location**: `src/components/ui/`
- **Contains**: Button, Input, Card, Badge

## 🔧 Configuration Files

### Vite Config (`vite.config.js`)
```javascript
- React plugin
- Dev server (port 3000)
- Build configuration
- Path aliases
```

### Package.json Scripts
```json
{
  "dev": "Start development server",
  "build": "Build for production",
  "preview": "Preview production build",
  "lint": "Run ESLint"
}
```

## 📦 Dependencies

### Core Dependencies
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `@types/react` - TypeScript types for React
- `@types/react-dom` - TypeScript types for React DOM

## 🚀 Quick Reference

### Start Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### File to Add
```
public/logo.png  ← ADD YOUR LOGO HERE
```

### Key Entry Points
1. **Hero Page**: `http://localhost:3000/` → `src/components/layout/Hero.jsx`
2. **Dashboard**: `http://localhost:3000/dashboard` → `src/pages/Dashboard.jsx`
3. **Theme Toggle**: Topbar → `src/hooks/useTheme.js`

## ✅ Verification Checklist

Before running the app, verify these files exist:

- [ ] `public/logo.png` - YOUR LOGO
- [ ] `src/main.jsx` - Entry point
- [ ] `src/App.jsx` - Main app
- [ ] `src/styles/theme.css` - Theme variables
- [ ] `src/styles/global.css` - Global styles
- [ ] `src/components/layout/Hero.jsx` - Landing page
- [ ] `src/components/layout/Layout.jsx` - App layout
- [ ] `src/components/layout/Sidebar.jsx` - Navigation
- [ ] `src/components/layout/Topbar.jsx` - Top bar
- [ ] `src/pages/Dashboard.jsx` - Dashboard page
- [ ] `src/hooks/useTheme.js` - Theme hook
- [ ] `package.json` - Dependencies
- [ ] `vite.config.js` - Vite config

## 🎯 Next Steps

1. **Add your logo**: Place `logo.png` in `public/` folder
2. **Install dependencies**: Run `npm install`
3. **Start dev server**: Run `npm run dev`
4. **Open browser**: Go to `http://localhost:3000`
5. **Test navigation**: Click "Get Started" → Dashboard
6. **Test theme**: Click theme toggle in topbar
7. **Test back button**: Click back arrow to return to hero

---

📌 **Important**: Make sure `public/logo.png` exists before running the app!

Last Updated: February 2026