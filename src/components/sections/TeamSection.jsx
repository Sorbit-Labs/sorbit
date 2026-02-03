import React from 'react';
import TeamMember from '../ui/TeamMember';
import './TeamSection.css';

/**
 * TeamSection Component
 * 
 * Displays the "Meet the Team" section with team member cards
 * Shows 4 team members with their roles and social links
 */
const TeamSection = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      // 📸 IMAGE LINK: Replace null with your image URL
      // Example: imageUrl: 'https://example.com/sarah.jpg'
      // Or use local: imageUrl: '/images/team/sarah.jpg'
      imageUrl: null,
      bio: 'Visionary leader with 10+ years in social media marketing',
      social: {
        twitter: 'https://twitter.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        github: null
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      // 📸 IMAGE LINK: Replace null with your image URL
      imageUrl: null,
      bio: 'Tech expert specializing in scalable social media platforms',
      social: {
        twitter: 'https://twitter.com/michaelchen',
        linkedin: 'https://linkedin.com/in/michaelchen',
        github: 'https://github.com/michaelchen'
      }
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      // 📸 IMAGE LINK: Replace null with your image URL
      imageUrl: null,
      bio: 'Creative designer crafting beautiful user experiences',
      social: {
        twitter: 'https://twitter.com/emilyrodriguez',
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        github: null
      }
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Head of Analytics',
      // 📸 IMAGE LINK: Replace null with your image URL
      imageUrl: null,
      bio: 'Data scientist turning insights into actionable strategies',
      social: {
        twitter: 'https://twitter.com/davidkim',
        linkedin: 'https://linkedin.com/in/davidkim',
        github: 'https://github.com/davidkim'
      }
    }
  ];

  return (
    <section className="team-section">
      {/* Section Header */}
      <div className="team-section__header">
        <h2 className="team-section__title">Meet the Team</h2>
        <p className="team-section__subtitle">
          The brilliant minds behind SorBit's success
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="team-section__grid">
        {teamMembers.map((member) => (
          <TeamMember key={member.id} {...member} />
        ))}
      </div>

      {/* Join Team CTA */}
      <div className="team-section__cta">
        <h3 className="team-section__cta-title">Want to Join Our Team?</h3>
        <p className="team-section__cta-text">
          We're always looking for talented individuals to join our mission
        </p>
        <button className="team-section__cta-button">
          View Open Positions
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default TeamSection;