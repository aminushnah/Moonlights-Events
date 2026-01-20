# React Project Setup Guide

This document provides a comprehensive guide to the React conversion of the Moon Light Events Rental Management System.

## Project Conversion Summary

### What Changed

1. **Architecture**: Converted from vanilla HTML/CSS/JS to React with component-based architecture
2. **Routing**: Implemented React Router v6 for navigation instead of direct HTML links
3. **State Management**: Uses React hooks (useState, useEffect) for state and side effects
4. **Styling**: Tailwind CSS with dark mode support (CSS classes to theme configuration)
5. **Build Tool**: Using Create React App (react-scripts) for development and production builds

## File Structure

```
retal mannagment/
├── public/
│   ├── index.html              # HTML entry point
│   └── images/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Header.js           # Top navigation bar
│   │   ├── Layout.js           # Main layout wrapper
│   │   ├── ProtectedRoute.js   # Route protection logic
│   │   └── Sidebar.js          # Navigation sidebar
│   ├── constants/
│   │   └── index.js            # Application constants
│   ├── hooks/
│   │   └── useCustom.js        # Custom React hooks
│   ├── pages/
│   │   ├── Dashboard.js        # Dashboard page
│   │   ├── ForgotPassword.js   # Password reset page
│   │   ├── Inventory.js        # Inventory management
│   │   ├── Login.js            # Login page
│   │   ├── Orders.js           # Orders management
│   │   ├── Quotations.js       # Quotations management
│   │   └── Register.js         # Registration page
│   ├── services/
│   │   └── api.js              # API client and interceptors
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.js                  # Root component
│   ├── index.css               # Global styles
│   └── index.js                # React entry point
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Steps

1. **Navigate to project directory**
   ```bash
   cd "retal mannagment"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   Application opens at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

## Key Features Implemented

### Authentication
- Login page with email/password validation
- Registration with password confirmation
- Forgot password functionality
- Protected routes that require authentication
- Logout functionality
- Session persistence using localStorage

### Dashboard
- Overview statistics cards
- Recent orders table
- Responsive grid layout
- Dark mode support

### Inventory Management
- Search and filter inventory
- Table view with status indicators
- Add/Edit/Delete actions
- Low stock alerts
- Category organization

### Orders & Rentals
- Order list with filtering
- Status tracking (Pending, Completed, In Transit)
- Client information
- Order date and amount
- Action buttons for management

### Quotations
- Quotation tracking
- Expiration date management
- Status management (Pending, Accepted, Rejected)
- Quote value tracking
- Summary statistics

### Theme System
- Dark mode toggle
- Persistent theme preference
- System-wide color variables
- Tailwind CSS dark mode support

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18.2.0 | UI Framework |
| React Router | ^6.20.0 | Client-side routing |
| React DOM | ^18.2.0 | React rendering |
| Tailwind CSS | ^3.3.6 | Utility-first CSS |
| Axios | ^1.6.0 | HTTP client |
| React Scripts | 5.0.1 | Build and dev tools |

## Component Hierarchy

```
App
├── Router
│   ├── Routes
│   │   ├── /login → Login
│   │   ├── /register → Register
│   │   ├── /forgot-password → ForgotPassword
│   │   └── Layout (Protected)
│   │       ├── Sidebar
│   │       ├── Header
│   │       └── Outlet (Dynamic Page)
│   │           ├── Dashboard
│   │           ├── Inventory
│   │           ├── Orders
│   │           └── Quotations
```

## Available Scripts

### Development
```bash
npm start
```
Runs the app in development mode with hot reload.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Testing
```bash
npm test
```
Launches the test runner.

### Eject
```bash
npm eject
```
Removes the build tool and configuration (irreversible).

## Default Test Credentials

- **Email**: user@gmail.com
- **Password**: 123456

## API Integration

The project includes an Axios instance with:
- Request/response interceptors
- Automatic token handling
- Centralized error handling
- Base URL configuration via environment variables

To use the API service:

```javascript
import api from './services/api';

// Make requests
api.get('/endpoint')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Routing Structure

| Route | Component | Protected | Purpose |
|-------|-----------|-----------|---------|
| / | Redirect to /dashboard | No | Home redirect |
| /login | Login | No | User authentication |
| /register | Register | No | User registration |
| /forgot-password | ForgotPassword | No | Password recovery |
| /dashboard | Dashboard | Yes | Main dashboard |
| /inventory | Inventory | Yes | Inventory management |
| /orders | Orders | Yes | Orders management |
| /quotations | Quotations | Yes | Quotations management |

## Security

- Protected routes require authentication
- LocalStorage is used for session persistence
- API interceptors handle token management
- CORS support (if backend is separate)

## Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#111111",
  secondary: "#6B7280",
  // ... more colors
}
```

### Fonts
Edit `tailwind.config.js`:
```javascript
fontFamily: {
  display: ["Inter", "sans-serif"],
}
```

### Add New Routes
1. Create a new page component in `src/pages/`
2. Add route in `App.js`
3. Add sidebar link in `Sidebar.js`

## Debugging

### Development Tools
- React DevTools browser extension
- Redux DevTools (if Redux is added)
- Browser DevTools for Tailwind CSS classes

### Common Issues

**Port Already in Use**
```bash
npm start -- --port 3001
```

**Clear Cache**
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

**Dark Mode Not Working**
Check that `document.documentElement` has the `dark` class.

## Performance Optimization

- Code splitting via React Router lazy loading (can be added)
- Image optimization via Next.js (if migrating)
- CSS purging with Tailwind
- Minification in production build

## Future Enhancements

1. Add Redux for complex state management
2. Implement API integration
3. Add form validation library (React Hook Form)
4. Add data tables library (React Table)
5. Implement user profile management
6. Add notification system
7. Implement export functionality
8. Add analytics

## Migration Notes

### From HTML to React
- HTML files (`*.html`) → React components (`*.js`)
- Inline styles → Tailwind CSS classes
- `onclick` handlers → React event handlers
- `localStorage` → React state with localStorage sync
- Page navigation → React Router navigation
- Form validation → React form handling

### Bootstrap to Tailwind
- All styling uses Tailwind utility classes
- Custom components use Tailwind's component patterns
- Dark mode uses Tailwind's dark mode feature
- No Bootstrap dependencies needed

## Dependencies

All dependencies are listed in `package.json` with specific versions. Update carefully:

```bash
npm update              # Update all
npm update <package>   # Update specific package
```

## Support & Resources

- React Docs: https://react.dev
- Tailwind CSS Docs: https://tailwindcss.com
- React Router Docs: https://reactrouter.com
- Axios Docs: https://axios-http.com

## Next Steps

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Test with demo credentials
4. Integrate with your backend API
5. Deploy to production

---

**Project Created**: January 17, 2026
**Framework**: React 18
**Status**: Ready for Development
