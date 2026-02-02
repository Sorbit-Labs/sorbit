// API Base URL - Replace with your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Get token from localStorage if available
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * GET request
 */
export const get = (endpoint) => {
  return fetchAPI(endpoint, {
    method: 'GET',
  });
};

/**
 * POST request
 */
export const post = (endpoint, data) => {
  return fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT request
 */
export const put = (endpoint, data) => {
  return fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * PATCH request
 */
export const patch = (endpoint, data) => {
  return fetchAPI(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request
 */
export const del = (endpoint) => {
  return fetchAPI(endpoint, {
    method: 'DELETE',
  });
};

// ==================== MOCK DATA FOR DEMO ====================

/**
 * Get dashboard statistics (MOCK)
 */
export const getDashboardStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    totalRevenue: 45231.89,
    totalAccounts: 2350,
    activeUsers: 1842,
    conversionRate: 3.24,
    revenueChange: 12.5,
    accountsChange: 8.2,
    usersChange: -2.4,
    conversionChange: 5.1,
  };
};

/**
 * Get accounts list (MOCK)
 */
export const getAccounts = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: 1,
      name: 'Facebook Ads Account',
      type: 'Facebook',
      status: 'active',
      balance: 15420.50,
      lastActivity: new Date('2026-02-01'),
      campaigns: 12,
      performance: 85,
    },
    {
      id: 2,
      name: 'Google Ads Primary',
      type: 'Google',
      status: 'active',
      balance: 28950.75,
      lastActivity: new Date('2026-02-02'),
      campaigns: 18,
      performance: 92,
    },
    {
      id: 3,
      name: 'Instagram Campaign',
      type: 'Facebook',
      status: 'paused',
      balance: 5620.00,
      lastActivity: new Date('2026-01-28'),
      campaigns: 5,
      performance: 68,
    },
    {
      id: 4,
      name: 'LinkedIn B2B',
      type: 'LinkedIn',
      status: 'active',
      balance: 12340.25,
      lastActivity: new Date('2026-02-01'),
      campaigns: 8,
      performance: 78,
    },
    {
      id: 5,
      name: 'Twitter Promotions',
      type: 'Twitter',
      status: 'inactive',
      balance: 0,
      lastActivity: new Date('2026-01-15'),
      campaigns: 0,
      performance: 0,
    },
  ];
};

/**
 * Get analytics data (MOCK)
 */
export const getAnalyticsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return {
    chartData: [
      { date: '2026-01-26', revenue: 4200, clicks: 1250, impressions: 45000 },
      { date: '2026-01-27', revenue: 3800, clicks: 1180, impressions: 42000 },
      { date: '2026-01-28', revenue: 5100, clicks: 1520, impressions: 52000 },
      { date: '2026-01-29', revenue: 4600, clicks: 1350, impressions: 48000 },
      { date: '2026-01-30', revenue: 5800, clicks: 1680, impressions: 58000 },
      { date: '2026-01-31', revenue: 6200, clicks: 1820, impressions: 62000 },
      { date: '2026-02-01', revenue: 5500, clicks: 1590, impressions: 55000 },
    ],
    topCampaigns: [
      { id: 1, name: 'Summer Sale 2026', platform: 'Facebook', revenue: 8420, roi: 245 },
      { id: 2, name: 'Product Launch', platform: 'Google', revenue: 12340, roi: 312 },
      { id: 3, name: 'Brand Awareness', platform: 'LinkedIn', revenue: 5620, roi: 189 },
      { id: 4, name: 'Retargeting Campaign', platform: 'Facebook', revenue: 9850, roi: 278 },
    ],
    platformBreakdown: [
      { platform: 'Facebook', percentage: 35, revenue: 15820 },
      { platform: 'Google', percentage: 42, revenue: 19010 },
      { platform: 'LinkedIn', percentage: 15, revenue: 6780 },
      { platform: 'Twitter', percentage: 8, revenue: 3621 },
    ],
  };
};

/**
 * Get user settings (MOCK)
 */
export const getUserSettings = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: null,
      role: 'Admin',
      company: 'SorBit Inc.',
    },
    preferences: {
      theme: 'light',
      notifications: true,
      emailAlerts: true,
      currency: 'USD',
      language: 'en',
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: new Date('2025-12-15'),
    },
  };
};

/**
 * Update user settings (MOCK)
 */
export const updateUserSettings = async (settings) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('Settings updated:', settings);
  return { success: true, message: 'Settings updated successfully' };
};

/**
 * Login (MOCK)
 */
export const login = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock validation
  if (email && password) {
    const mockToken = 'mock_jwt_token_' + Date.now();
    localStorage.setItem('authToken', mockToken);
    return {
      success: true,
      token: mockToken,
      user: {
        id: 1,
        name: 'John Doe',
        email: email,
      },
    };
  }
  
  throw new Error('Invalid credentials');
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  return { success: true };
};

export default {
  get,
  post,
  put,
  patch,
  del,
  getDashboardStats,
  getAccounts,
  getAnalyticsData,
  getUserSettings,
  updateUserSettings,
  login,
  logout,
};