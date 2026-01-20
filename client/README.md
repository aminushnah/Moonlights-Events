# Moon Light Events - Rental Management System

A modern React-based admin dashboard for managing event rentals, inventory, quotations, and orders.

## Features

- **Dashboard**: Overview of orders, revenue, active rentals, and customers
- **Inventory Management**: Track and manage rental equipment and items
- **Orders & Rentals**: Manage all rental orders with status tracking
- **Quotations**: Create and track quotations with clients
- **Authentication**: Secure login and registration system
- **Dark Mode**: Full dark mode support with theme persistence
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Material Icons

## Installation

1. Navigate to the project directory:
```bash
cd "retal mannagment"
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Layout.js           # Main layout wrapper
│   ├── Sidebar.js          # Navigation sidebar
│   ├── Header.js           # Top header component
│   └── ProtectedRoute.js   # Protected route component
├── pages/
│   ├── Login.js            # Login page
│   ├── Register.js         # Registration page
│   ├── ForgotPassword.js   # Password recovery page
│   ├── Dashboard.js        # Main dashboard
│   ├── Inventory.js        # Inventory management
│   ├── Orders.js           # Orders management
│   └── Quotations.js       # Quotations management
├── App.js                  # Main app component
├── index.js                # Entry point
└── index.css               # Global styles
```

## Default Credentials

For testing the application:
- **Email**: user@gmail.com
- **Password**: 123456

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Features

### Authentication
- Login/Register pages with validation
- Protected routes that require authentication
- Secure session management with localStorage
- Forgot password functionality

### Dashboard
- Real-time statistics and metrics
- Recent orders overview
- Visual representation of business data

### Inventory Management
- Search and filter inventory items
- Add/edit/delete items
- Stock status tracking
- Categorized items display

### Orders & Rentals
- Complete order management
- Status tracking (Pending, Completed, In Transit)
- Customer information
- Order history and details

### Quotations
- Create and manage quotations
- Expiration tracking
- Status management (Pending, Accepted, Rejected)
- Quote value tracking

## Theme Customization

Colors can be customized in `tailwind.config.js`:
- Primary color: `#111111` (Black)
- Secondary color: `#6B7280` (Gray)
- Background light: `#F5F5F5`
- Background dark: `#0F0F0F`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from create-react-app (irreversible)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and belongs to Moon Light Events.

## Support

For issues or questions, please contact the development team.
