import React from 'react';
import './FeatureCard.css';

/**
 * FeatureCard Component
 * 
 * Displays a feature card with an icon, title, and description
 * Includes 3D hover effects and animations
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.icon - SVG icon element
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 * @param {string} props.color - Accent color for the card (hex value)
 */
const FeatureCard = ({ icon, title, description, color = '#1877F2' }) => {
  return (
    <div className="feature-card card-3d">
      {/* Icon Container with Dynamic Color */}
      <div 
        className="feature-card__icon"
        style={{ 
          backgroundColor: `${color}15`,
          color: color 
        }}
      >
        {icon}
      </div>

      {/* Feature Title */}
      <h3 className="feature-card__title">{title}</h3>

      {/* Feature Description */}
      <p className="feature-card__description">{description}</p>

      {/* Decorative Accent Line */}
      <div 
        className="feature-card__accent"
        style={{ backgroundColor: color }}
      ></div>

      {/* Hover Glow Effect */}
      <div 
        className="feature-card__glow"
        style={{ backgroundColor: `${color}30` }}
      ></div>
    </div>
  );
};

export default FeatureCard;