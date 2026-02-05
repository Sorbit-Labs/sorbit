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
      name: 'WSUITS6 - Alhassan Osman Wunpini ',
      role: 'CEO & Founder',
      // 📸 IMAGE LINK: Replace null with your image URL
      // Example: imageUrl: 'https://example.com/sarah.jpg'
      // Or use local: imageUrl: '/images/team/sarah.jpg'
      imageUrl: '/team/wsuits6.png',
      bio: 'I dont Follow Paths I Burn them then I write my own in code',
      social: {
        twitter: 'https://twitter.com/wsuits6',
        linkedin: 'https://linkedin.com/in/wsuits6',
        github: 'github.com/wsuits6'
      }
    },
    {
      id: 2,
      name: null,
      role: null,
      // 📸 IMAGE LINK: Replace null with your image URL
      imageUrl: null,
      bio: null,
      social: {
        twitter: null,
        linkedin: null,
        github: null
      }
    },
    {
      id: 3,
      name: null,
      role: null,
      // 📸 IMAGE LINK: Replace null with your image URL
      imageUrl: null,
      bio: 'Creative designer crafting beautiful user experiences',
      social: {
        twitter: null,
        linkedin: null,
        github: null
      }
    },
    {
      id: 4,
      name: null,
      role: null,
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
          The brilliant minds behind SorBit.
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