import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title,
  subtitle,
  headerAction,
  noPadding = false,
  hoverable = false,
  onClick,
  className = '',
  ...props 
}) => {
  const cardClasses = [
    'card',
    hoverable && 'card--hoverable',
    onClick && 'card--clickable',
    className,
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'card__content',
    noPadding && 'card__content--no-padding',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {(title || subtitle || headerAction) && (
        <div className="card__header">
          <div className="card__header-content">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {headerAction && (
            <div className="card__header-action">{headerAction}</div>
          )}
        </div>
      )}
      
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
};

export default Card;