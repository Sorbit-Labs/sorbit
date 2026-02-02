import React from 'react';
import './Badge.css';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  dot = false,
  icon,
  className = '',
  ...props 
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    dot && 'badge--dot',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {icon && <span className="badge__icon">{icon}</span>}
      {!dot && <span className="badge__text">{children}</span>}
    </span>
  );
};

export default Badge;