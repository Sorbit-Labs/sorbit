import React from 'react';
import './Topbar.css';

const Topbar = ({ 
  onMenuClick, 
  onThemeToggle, 
  isDarkMode,
  user 
}) => {
  return (
    <header className="topbar">
      <div className="topbar__left">
        {/* Mobile Menu Button */}
        <button 
          className="topbar__menu-btn" 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Logo - Mobile/Tablet */}
        <div className="topbar__logo">
          <img 
            src="/src/assets/images/logo.png" 
            alt="SorBit" 
            className="topbar__logo-image"
          />
        </div>
      </div>

      <div className="topbar__right">
        {/* Search */}
        <div className="topbar__search">
          <svg className="topbar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            className="topbar__search-input" 
            placeholder="Search..."
          />
        </div>

        {/* Theme Toggle */}
        <button 
          className="topbar__icon-btn" 
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
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

        {/* Notifications */}
        <button className="topbar__icon-btn topbar__notification-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="topbar__notification-badge">3</span>
        </button>

        {/* User Profile */}
        <div className="topbar__profile">
          <div className="topbar__profile-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span className="topbar__profile-initial">
                {user?.name?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div className="topbar__profile-info">
            <span className="topbar__profile-name">{user?.name || 'User'}</span>
            <span className="topbar__profile-role">{user?.role || 'Admin'}</span>
          </div>
          <svg className="topbar__profile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Topbar;