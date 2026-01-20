# Moon Light Events - React Project Files Index

## 📌 START HERE

If you're new to this project, start with these files in this order:

1. **[QUICKSTART.md](./QUICKSTART.md)** ← Start here! Quick 3-step setup
2. **[README.md](./README.md)** ← Full feature overview
3. **[REACT_SETUP.md](./REACT_SETUP.md)** ← Detailed technical guide

---

## 📂 Project File Organization

### 🚀 Getting Started
- `QUICKSTART.md` - Quick start in 3 steps
- `CONVERSION_SUMMARY.md` - Complete conversion details
- `setup-guide.js` - Interactive setup guide
- `.env.example` - Environment variables template

### 📚 Documentation
- `README.md` - Full project documentation
- `REACT_SETUP.md` - Detailed React architecture guide
- `CHANGELOG.md` - Version history
- `FILES_INDEX.md` - This file

### 🎬 Quick Start Scripts
- `start.bat` - Windows quick start (double-click)
- `start.sh` - Mac/Linux quick start (bash start.sh)

### ⚙️ Configuration
- `package.json` - Dependencies and npm scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.gitignore` - Git ignore rules

### 📁 React Source Code
- `src/index.js` - React entry point
- `src/index.css` - Global styles
- `src/App.js` - Root component with routing

#### Components (`src/components/`)
- `Layout.js` - Main layout wrapper
- `Sidebar.js` - Navigation sidebar
- `Header.js` - Top header bar
- `ProtectedRoute.js` - Auth guard

#### Pages (`src/pages/`)
- `Login.js` - Login page
- `Register.js` - Registration page
- `ForgotPassword.js` - Password reset
- `Dashboard.js` - Main dashboard
- `Inventory.js` - Inventory management
- `Orders.js` - Orders management
- `Quotations.js` - Quotations management

#### Services (`src/services/`)
- `api.js` - Axios API client with interceptors

#### Utilities (`src/utils/`)
- `helpers.js` - Helper functions (format, validate, etc.)

#### Hooks (`src/hooks/`)
- `useCustom.js` - Custom React hooks (useAuth, useDarkMode)

#### Constants (`src/constants/`)
- `index.js` - App constants (routes, endpoints, etc.)

### 📁 Static Files
- `public/index.html` - HTML entry point
- `public/images/` - Logo and assets

---

## 🎯 Common Tasks

### Starting the Project
```bash
# Option 1: Use quick start script
start.bat          # Windows
bash start.sh      # Mac/Linux

# Option 2: Manual
npm install
npm start
```

### Development
```bash
npm start          # Start dev server
npm test           # Run tests
npm run build      # Production build
```

### Configuration
```bash
cp .env.example .env    # Create env file
# Edit .env with your settings
```

### Adding Features
1. Create component in `src/pages/` or `src/components/`
2. Add route to `src/App.js`
3. Add sidebar link in `src/components/Sidebar.js`

---

## 📊 File Statistics

| Category | Count | Details |
|----------|-------|---------|
| React Components | 11 | 4 shared, 7 pages |
| Configuration Files | 5 | Package, Tailwind, PostCSS, env, gitignore |
| Documentation | 4 | README, QUICKSTART, SETUP, CHANGELOG |
| Service Files | 4 | API, hooks, utils, constants |
| Asset Files | Variable | Images in public/images/ |

---

## 🔐 Important Files

### DO NOT MODIFY (These are auto-generated/dependencies)
- `node_modules/` - Dependencies (created by npm install)
- `package-lock.json` - Dependency lock file (auto-generated)
- `build/` - Production build (created by npm run build)
- `.git/` - Git repository (if initialized)

### SHOULD MODIFY
- `src/App.js` - Add/remove routes
- `src/components/Sidebar.js` - Update navigation
- `.env` - Set API endpoints and configuration
- `tailwind.config.js` - Customize colors and theme

### CAN DELETE
These are legacy files from the HTML project:
- `admin-register.html`
- `dashbord.html`
- `forgot-password.html`
- `inventory.html`
- `orders.html`
- `Quotations.html`
- `user-login.html`
- `sidebar.html`
- `app.js` (old)
- `style.css` (old)

---

## 🚀 Installation Path

```
1. Read QUICKSTART.md
   ↓
2. Run: npm install
   ↓
3. Run: npm start
   ↓
4. Login with demo credentials
   ↓
5. Read README.md for features
   ↓
6. Read REACT_SETUP.md for technical details
   ↓
7. Start customizing!
```

---

## 📖 Documentation Guide

| Document | Best For | Time |
|----------|----------|------|
| QUICKSTART.md | Getting started ASAP | 5 min |
| README.md | Understanding features | 10 min |
| REACT_SETUP.md | Technical details | 15 min |
| CONVERSION_SUMMARY.md | Full overview | 20 min |

---

## 🎓 Learning Path

### Beginner
1. Read QUICKSTART.md
2. Follow installation steps
3. Explore the application
4. Look at Dashboard.js to understand component structure

### Intermediate
1. Read REACT_SETUP.md
2. Study src/App.js routing structure
3. Examine page components
4. Understand component props and state

### Advanced
1. Study services/api.js
2. Examine hooks in hooks/useCustom.js
3. Understand Tailwind CSS customization
4. Integrate with backend API

---

## ✅ Verification Checklist

- [ ] Read QUICKSTART.md
- [ ] Node.js v14+ installed
- [ ] `npm install` completed successfully
- [ ] `npm start` launches without errors
- [ ] App opens at http://localhost:3000
- [ ] Can login with demo credentials
- [ ] All pages accessible from sidebar
- [ ] Dark mode toggle works
- [ ] Responsive design works on mobile

---

## 🆘 Troubleshooting

**Problem**: npm install fails
**Solution**: 
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

**Problem**: Port 3000 already in use
**Solution**:
```bash
npm start -- --port 3001
```

**Problem**: Dark mode not working
**Solution**: Check browser console for errors, clear cache

**Problem**: Images not showing
**Solution**: Verify `/public/images/` folder exists with files

---

## 📞 Support Resources

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- React Router: https://reactrouter.com
- Axios: https://axios-http.com

---

## 🎉 Ready to Get Started?

1. Open this file's parent directory
2. Run: `npm install`
3. Run: `npm start`
4. Read: QUICKSTART.md

**That's it! Happy coding! 🚀**

---

**Created**: January 17, 2026
**Project**: Moon Light Events
**Framework**: React 18 + Tailwind CSS
**Status**: Production Ready
