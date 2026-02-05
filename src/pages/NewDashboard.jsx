import React, { useState, useEffect } from 'react';
import './NewDashboard.css';

/**
 * NewDashboard Component - Africa-Optimized
 * 
 * Mobile-first dashboard with:
 * - Key metrics only (no clutter)
 * - Large, readable numbers
 * - One-tap "Create Post" CTA
 * - Simple performance preview
 * - Skeleton loaders (no spinners)
 * 
 * Design Philosophy:
 * - Show what matters most
 * - Hide complexity
 * - Fast loading with progressive enhancement
 */
const NewDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  // Simulate data loading
  useEffect(() => {
    // Simulate API call with delay
    const timer = setTimeout(() => {
      setStats({
        totalFollowers: 45230,
        followersGrowth: 12.5,
        totalReach: 128400,
        reachGrowth: 8.3,
        engagement: 6.8,
        engagementGrowth: -2.1,
        postsThisWeek: 12
      });

      setRecentPosts([
        {
          id: 1,
          platform: 'instagram',
          content: 'Check out our latest product launch! 🚀',
          time: '2h ago',
          likes: 234,
          comments: 45,
          shares: 12,
          trend: 'up'
        },
        {
          id: 2,
          platform: 'facebook',
          content: 'Behind the scenes of our photoshoot',
          time: '5h ago',
          likes: 156,
          comments: 23,
          shares: 8,
          trend: 'up'
        },
        {
          id: 3,
          platform: 'twitter',
          content: 'Excited to announce our partnership with...',
          time: '1d ago',
          likes: 89,
          comments: 12,
          shares: 34,
          trend: 'down'
        }
      ]);

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/>
        </svg>
      ),
      facebook: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      twitter: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    };
    return icons[platform] || icons.instagram;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Welcome back! 👋</h1>
          <p className="dashboard__subtitle">Here's what's happening with your accounts</p>
        </div>
      </div>

      {/* Primary CTA - Create Post */}
      <div className="dashboard__cta">
        <button className="dashboard__create-btn">
          <div className="dashboard__create-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="dashboard__create-text">
            <span className="dashboard__create-label">Create New Post</span>
            <span className="dashboard__create-hint">Share to all platforms</span>
          </div>
          <svg className="dashboard__create-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Your Stats</h2>
          <button className="dashboard__view-all">
            View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="dashboard__metrics">
          {loading ? (
            <>
              <div className="dashboard__metric-card">
                <div className="skeleton skeleton-circle" style={{ width: '48px', height: '48px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '100%', marginTop: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
              </div>
              <div className="dashboard__metric-card">
                <div className="skeleton skeleton-circle" style={{ width: '48px', height: '48px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '100%', marginTop: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
              </div>
              <div className="dashboard__metric-card">
                <div className="skeleton skeleton-circle" style={{ width: '48px', height: '48px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '100%', marginTop: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
              </div>
            </>
          ) : (
            <>
              {/* Followers */}
              <div className="dashboard__metric-card">
                <div className="dashboard__metric-icon dashboard__metric-icon--followers">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="dashboard__metric-content">
                  <div className="dashboard__metric-value">{formatNumber(stats.totalFollowers)}</div>
                  <div className="dashboard__metric-label">Total Followers</div>
                  <div className={`dashboard__metric-change ${stats.followersGrowth > 0 ? 'dashboard__metric-change--up' : 'dashboard__metric-change--down'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {stats.followersGrowth > 0 ? (
                        <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                      ) : (
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                    {Math.abs(stats.followersGrowth)}% this week
                  </div>
                </div>
              </div>

              {/* Reach */}
              <div className="dashboard__metric-card">
                <div className="dashboard__metric-icon dashboard__metric-icon--reach">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    <path d="M2 12h20"/>
                  </svg>
                </div>
                <div className="dashboard__metric-content">
                  <div className="dashboard__metric-value">{formatNumber(stats.totalReach)}</div>
                  <div className="dashboard__metric-label">Total Reach</div>
                  <div className={`dashboard__metric-change ${stats.reachGrowth > 0 ? 'dashboard__metric-change--up' : 'dashboard__metric-change--down'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {stats.reachGrowth > 0 ? (
                        <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                      ) : (
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                    {Math.abs(stats.reachGrowth)}% this week
                  </div>
                </div>
              </div>

              {/* Engagement */}
              <div className="dashboard__metric-card">
                <div className="dashboard__metric-icon dashboard__metric-icon--engagement">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <div className="dashboard__metric-content">
                  <div className="dashboard__metric-value">{stats.engagement}%</div>
                  <div className="dashboard__metric-label">Engagement Rate</div>
                  <div className={`dashboard__metric-change ${stats.engagementGrowth > 0 ? 'dashboard__metric-change--up' : 'dashboard__metric-change--down'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {stats.engagementGrowth > 0 ? (
                        <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                      ) : (
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                    {Math.abs(stats.engagementGrowth)}% this week
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Posts Performance */}
      <div className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Recent Posts</h2>
          <button className="dashboard__view-all">
            View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="dashboard__posts">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="dashboard__post-card">
                  <div className="skeleton skeleton-circle" style={{ width: '40px', height: '40px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="dashboard__post-card">
                <div className={`dashboard__post-platform dashboard__post-platform--${post.platform}`}>
                  {getPlatformIcon(post.platform)}
                </div>
                <div className="dashboard__post-content">
                  <p className="dashboard__post-text">{post.content}</p>
                  <span className="dashboard__post-time">{post.time}</span>
                </div>
                <div className="dashboard__post-stats">
                  <div className="dashboard__post-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="dashboard__post-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                  <div className={`dashboard__post-trend ${post.trend === 'up' ? 'dashboard__post-trend--up' : 'dashboard__post-trend--down'}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {post.trend === 'up' ? (
                        <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                      ) : (
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      )}
                    </svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard__section">
        <h2 className="dashboard__section-title">Quick Actions</h2>
        <div className="dashboard__quick-actions">
          <button className="dashboard__action-btn">
            <div className="dashboard__action-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              </svg>
            </div>
            <span>Schedule Post</span>
          </button>

          <button className="dashboard__action-btn">
            <div className="dashboard__action-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 17V9m-5 8V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>View Analytics</span>
          </button>

          <button className="dashboard__action-btn">
            <div className="dashboard__action-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span>Connect Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;