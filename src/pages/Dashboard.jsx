import React, { useState, useEffect } from 'react';
import StatCard from '../components/cards/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Loader from '../components/ui/Loader';
import { getDashboardStats } from '../services/api';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatNumber';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectedAccounts = [
    { platform: 'Facebook', status: 'active', color: '#1877F2', followers: '45.2K', engagement: '4.8%' },
    { platform: 'Instagram', status: 'active', color: '#E4405F', followers: '128.5K', engagement: '7.2%' },
    { platform: 'Twitter', status: 'active', color: '#1DA1F2', followers: '32.1K', engagement: '3.5%' },
    { platform: 'LinkedIn', status: 'paused', color: '#0A66C2', followers: '12.8K', engagement: '5.1%' },
  ];

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="dashboard__welcome">
        <div className="dashboard__welcome-content">
          <h1 className="dashboard__title">Welcome back, John! 👋</h1>
          <p className="dashboard__subtitle">Here's what's happening with your social media today</p>
        </div>
        <Button variant="primary" className="dashboard__connect-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Connect New Account
        </Button>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader size="medium" text="Loading dashboard..." />
        </div>
      ) : (
        <>
          <div className="dashboard__stats">
            <StatCard
              title="Total Followers"
              value={formatNumber(218600)}
              change={12.5}
              trend="up"
              loading={false}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <StatCard
              title="Total Engagement"
              value={formatNumber(45231)}
              change={8.2}
              trend="up"
              loading={false}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <StatCard
              title="Posts This Month"
              value={formatNumber(142)}
              change={5.1}
              trend="up"
              loading={false}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />

            <StatCard
              title="Avg. Engagement Rate"
              value={formatPercentage(5.4)}
              change={2.3}
              trend="up"
              loading={false}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </div>

          {/* Connected Accounts */}
          <Card 
            title="Connected Social Media Accounts"
            subtitle="Your connected platforms and their performance"
          >
            <div className="dashboard__accounts-grid">
              {connectedAccounts.map((account) => (
                <div key={account.platform} className="dashboard__account-card">
                  <div className="dashboard__account-header">
                    <div 
                      className="dashboard__account-icon"
                      style={{ backgroundColor: `${account.color}15`, color: account.color }}
                    >
                      {account.platform.charAt(0)}
                    </div>
                    <Badge 
                      variant={account.status === 'active' ? 'success' : 'warning'}
                      size="small"
                    >
                      {account.status}
                    </Badge>
                  </div>
                  <h3 className="dashboard__account-name">{account.platform}</h3>
                  <div className="dashboard__account-stats">
                    <div className="dashboard__account-stat">
                      <span className="dashboard__account-stat-value">{account.followers}</span>
                      <span className="dashboard__account-stat-label">Followers</span>
                    </div>
                    <div className="dashboard__account-stat">
                      <span className="dashboard__account-stat-value">{account.engagement}</span>
                      <span className="dashboard__account-stat-label">Engagement</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="small" fullWidth>
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity & Performance */}
          <div className="dashboard__grid">
            <Card 
              title="Recent Posts Performance"
              subtitle="Your top performing posts this week"
            >
              <div className="dashboard__posts">
                <div className="dashboard__post-item">
                  <div className="dashboard__post-platform" style={{ backgroundColor: '#1877F215', color: '#1877F2' }}>
                    FB
                  </div>
                  <div className="dashboard__post-content">
                    <p className="dashboard__post-text">Product launch announcement - New feature reveal</p>
                    <div className="dashboard__post-meta">
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        2.4K
                      </span>
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        328
                      </span>
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 1l4 4-4 4"/>
                          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                          <path d="M7 23l-4-4 4-4"/>
                          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                        </svg>
                        156
                      </span>
                    </div>
                  </div>
                  <Badge variant="success">8.2%</Badge>
                </div>

                <div className="dashboard__post-item">
                  <div className="dashboard__post-platform" style={{ backgroundColor: '#E4405F15', color: '#E4405F' }}>
                    IG
                  </div>
                  <div className="dashboard__post-content">
                    <p className="dashboard__post-text">Behind the scenes - Team collaboration photo</p>
                    <div className="dashboard__post-meta">
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        5.8K
                      </span>
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        892
                      </span>
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 1l4 4-4 4"/>
                          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                          <path d="M7 23l-4-4 4-4"/>
                          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                        </svg>
                        423
                      </span>
                    </div>
                  </div>
                  <Badge variant="success">12.5%</Badge>
                </div>

                <div className="dashboard__post-item">
                  <div className="dashboard__post-platform" style={{ backgroundColor: '#1DA1F215', color: '#1DA1F2' }}>
                    TW
                  </div>
                  <div className="dashboard__post-content">
                    <p className="dashboard__post-text">Quick tip thread on productivity hacks</p>
                    <div className="dashboard__post-meta">
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        1.2K
                      </span>
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        245
                      </span>
                      <span className="dashboard__post-metric">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 1l4 4-4 4"/>
                          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                          <path d="M7 23l-4-4 4-4"/>
                          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                        </svg>
                        89
                      </span>
                    </div>
                  </div>
                  <Badge variant="success">6.8%</Badge>
                </div>
              </div>
            </Card>

            <Card 
              title="Quick Actions"
              subtitle="Manage your social media"
            >
              <div className="dashboard__quick-actions-list">
                <button className="dashboard__quick-action">
                  <div className="dashboard__quick-action-icon" style={{ backgroundColor: '#1877F215', color: '#1877F2' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="dashboard__quick-action-content">
                    <span className="dashboard__quick-action-title">Create New Post</span>
                    <span className="dashboard__quick-action-description">Share across all platforms</span>
                  </div>
                </button>

                <button className="dashboard__quick-action">
                  <div className="dashboard__quick-action-icon" style={{ backgroundColor: '#22C55E15', color: '#22C55E' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <div className="dashboard__quick-action-content">
                    <span className="dashboard__quick-action-title">Schedule Post</span>
                    <span className="dashboard__quick-action-description">Plan your content calendar</span>
                  </div>
                </button>

                <button className="dashboard__quick-action">
                  <div className="dashboard__quick-action-icon" style={{ backgroundColor: '#F59E0B15', color: '#F59E0B' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 17V9m-5 8V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="dashboard__quick-action-content">
                    <span className="dashboard__quick-action-title">View Analytics</span>
                    <span className="dashboard__quick-action-description">Deep dive into metrics</span>
                  </div>
                </button>

                <button className="dashboard__quick-action">
                  <div className="dashboard__quick-action-icon" style={{ backgroundColor: '#8B5CF615', color: '#8B5CF6' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="dashboard__quick-action-content">
                    <span className="dashboard__quick-action-title">Respond to Comments</span>
                    <span className="dashboard__quick-action-description">12 new comments</span>
                  </div>
                  <Badge variant="error" size="small">12</Badge>
                </button>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;