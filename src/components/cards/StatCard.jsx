import React from 'react';
import Loader from '../ui/Loader';
import './StatCard.css';

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon,
  trend = 'up',
  loading = false,
  className = '',
  ...props 
}) => {
  const cardClasses = [
    'stat-card',
    loading && 'stat-card--loading',
    className,
  ].filter(Boolean).join(' ');

  const changeClasses = [
    'stat-card__change',
    trend === 'up' && change > 0 && 'stat-card__change--positive',
    trend === 'down' && change < 0 && 'stat-card__change--negative',
    change === 0 && 'stat-card__change--neutral',
  ].filter(Boolean).join(' ');

  const getTrendIcon = () => {
    if (change === 0) return '•';
    if (trend === 'up' && change > 0) return '↑';
    if (trend === 'up' && change < 0) return '↓';
    if (trend === 'down' && change > 0) return '↓';
    if (trend === 'down' && change < 0) return '↑';
    return '•';
  };

  return (
    <div className={cardClasses} {...props}>
      <div className="stat-card__header">
        <div className="stat-card__icon-wrapper">
          {icon && <div className="stat-card__icon">{icon}</div>}
        </div>
        <div className="stat-card__title">{title}</div>
      </div>

      <div className="stat-card__body">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Loader size="small" />
          </div>
        ) : (
          <>
            <div className="stat-card__value">{value}</div>
            {change !== undefined && change !== null && (
              <div className={changeClasses}>
                <span className="stat-card__trend-icon">{getTrendIcon()}</span>
                <span className="stat-card__change-value">
                  {Math.abs(change)}%
                </span>
                <span className="stat-card__change-label">vs last month</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StatCard;