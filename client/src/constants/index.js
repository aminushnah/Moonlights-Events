// Constants for the application

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  INVENTORY: {
    LIST: '/inventory',
    CREATE: '/inventory',
    UPDATE: '/inventory/:id',
    DELETE: '/inventory/:id',
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    UPDATE: '/orders/:id',
    DELETE: '/orders/:id',
  },
  QUOTATIONS: {
    LIST: '/quotations',
    CREATE: '/quotations',
    UPDATE: '/quotations/:id',
    DELETE: '/quotations/:id',
  },
};

export const DEMO_CREDENTIALS = {
  EMAIL: 'user@gmail.com',
  PASSWORD: '123456',
};

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  INVENTORY: '/inventory',
  ORDERS: '/orders',
  QUOTATIONS: '/quotations',
};

export const ORDER_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  IN_TRANSIT: 'In Transit',
  CANCELLED: 'Cancelled',
};

export const QUOTATION_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
};
