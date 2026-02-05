import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './MobileLayout.css';

/**
 * MobileLayout Component
 * 
 * Mobile-first layout with bottom navigation
 * Optimized for African users with varying tech literacy
 * 
 * Features:
 * - Bottom tab navigation (thumb-friendly)
 * - Clean header with essentials only
 * - No sidebar complexity
 * - Large touch targets (minimum 48px)
 * - Clear visual hierarchy
 */
const MobileLayout = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  // Bottom navigation items
  const navItems = [
    {
      id: 'home',
      path: '/dashboard',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'post',
      path: '/post',
      label: 'Post',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8m-4-4h8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      isAction: true // Special styling for primary action
    },
    {
      id: 'analytics',
      path: '/analytics',
      label: 'Stats',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 17V9m-5 8V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'accounts',
      path: '/accounts',
      label: 'Accounts',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'settings',
      path: '/settings',
      label: 'More',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"/>
          <circle cx="12" cy="5" r="1"/>
          <circle cx="12" cy="19" r="1"/>
        </svg>
      )
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <div className="mobile-layout" data-theme={theme}>
      {/* Top Header */}
      <header className="mobile-layout__header">
        <div className="mobile-layout__header-content">
          {/* Logo */}
          <div className="mobile-layout__logo">
            <img src="/logo.png" alt="SorBit" />
            <span>SorBit</span>
          </div>

          {/* Header Actions */}
          <div className="mobile-layout__header-actions">
            {/* Notifications */}
            <button 
              className="mobile-layout__icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="mobile-layout__badge">3</span>
            </button>

            {/* Theme Toggle */}
            <button 
              className="mobile-layout__icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72 1.42-1.42" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            {/* User Avatar */}
            <button className="mobile-layout__avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="mobile-layout__avatar-placeholder">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mobile-layout__main">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="mobile-layout__bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-layout__nav-item ${
              isActive(item.path) ? 'mobile-layout__nav-item--active' : ''
            } ${item.isAction ? 'mobile-layout__nav-item--action' : ''}`}
            onClick={() => handleNavClick(item.path)}
            aria-label={item.label}
          >
            <div className="mobile-layout__nav-icon">
              {item.icon}
            </div>
            <span className="mobile-layout__nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Notifications Dropdown (Simple) */}
      {showNotifications && (
        <div className="mobile-layout__notifications-overlay" onClick={() => setShowNotifications(false)}>
          <div className="mobile-layout__notifications-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-layout__notifications-header">
              <h3>Notifications</h3>
              <button onClick={() => setShowNotifications(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="mobile-layout__notifications-list">
              {/* Notification items */}
              <div className="mobile-layout__notification-item">
                <div className="mobile-layout__notification-icon">📈</div>
                <div className="mobile-layout__notification-content">
                  <p className="mobile-layout__notification-title">Post performing well!</p>
                  <p className="mobile-layout__notification-text">Your latest post has 50+ likes</p>
                  <span className="mobile-layout__notification-time">2h ago</span>
                </div>
              </div>
              <div className="mobile-layout__notification-item">
                <div className="mobile-layout__notification-icon">🔗</div>
                <div className="mobile-layout__notification-content">
                  <p className="mobile-layout__notification-title">Account connected</p>
                  <p className="mobile-layout__notification-text">Instagram linked successfully</p>
                  <span className="mobile-layout__notification-time">5h ago</span>
                </div>
              </div>
              <div className="mobile-layout__notification-item">
                <div className="mobile-layout__notification-icon">⚠️</div>
                <div className="mobile-layout__notification-content">
                  <p className="mobile-layout__notification-title">Reconnect needed</p>
                  <p className="mobile-layout__notification-text">Facebook auth expired</p>
                  <span className="mobile-layout__notification-time">1d ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLayout;