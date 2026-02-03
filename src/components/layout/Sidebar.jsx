import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, navigationItems }) => {
  const sidebarClasses = [
    'sidebar',
    isOpen && 'sidebar--open',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <aside className={sidebarClasses}>
        {/* Logo Section */}
        <div className="sidebar__logo">
          <img 
            src="/logo.png" 
            alt="SorBit Logo" 
            className="sidebar__logo-image"
          />
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <ul className="sidebar__menu">
            {navigationItems.map((item) => (
              <li key={item.path} className="sidebar__menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  onClick={onClose}
                >
                  <span className="sidebar__link-icon">{item.icon}</span>
                  <span className="sidebar__link-text">{item.label}</span>
                  {item.badge && (
                    <span className="sidebar__link-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar__footer">
          <div className="sidebar__footer-content">
            <p className="sidebar__footer-text">SorBit Dashboard</p>
            <p className="sidebar__footer-version">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;