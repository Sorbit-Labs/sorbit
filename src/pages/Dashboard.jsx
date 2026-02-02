import React, { useState, useEffect } from 'react';
import StatCard from '../components/cards/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
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

  return (
    <div className="dashboard">
      {/* Page Header */}
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <Button variant="primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="dashboard__stats">
        <StatCard
          title="Total Revenue"
          value={loading ? '...' : formatCurrency(stats?.totalRevenue)}
          change={stats?.revenueChange}
          trend="up"
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <StatCard
          title="Total Accounts"
          value={loading ? '...' : formatNumber(stats?.totalAccounts)}
          change={stats?.accountsChange}
          trend="up"
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <StatCard
          title="Active Users"
          value={loading ? '...' : formatNumber(stats?.activeUsers)}
          change={stats?.usersChange}
          trend="up"
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8.5" cy="7" r="4"/>
              <path d="M20 8v6m3-3h-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />

        <StatCard
          title="Conversion Rate"
          value={loading ? '...' : formatPercentage(stats?.conversionRate)}
          change={stats?.conversionChange}
          trend="up"
          loading={loading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="dashboard__charts">
        <Card 
          title="Revenue Overview"
          subtitle="Monthly revenue for the past 6 months"
        >
          <div className="dashboard__chart-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m19 9-5 5-4-4-5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Chart visualization would go here</p>
          </div>
        </Card>

        <Card 
          title="Recent Activity"
          subtitle="Latest updates from your accounts"
        >
          <div className="dashboard__activity">
            <div className="dashboard__activity-item">
              <div className="dashboard__activity-icon dashboard__activity-icon--success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dashboard__activity-content">
                <p className="dashboard__activity-title">Campaign launched successfully</p>
                <p className="dashboard__activity-time">2 hours ago</p>
              </div>
            </div>

            <div className="dashboard__activity-item">
              <div className="dashboard__activity-icon dashboard__activity-icon--info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4m0-4h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dashboard__activity-content">
                <p className="dashboard__activity-title">New account connected</p>
                <p className="dashboard__activity-time">5 hours ago</p>
              </div>
            </div>

            <div className="dashboard__activity-item">
              <div className="dashboard__activity-icon dashboard__activity-icon--warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 9v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="dashboard__activity-content">
                <p className="dashboard__activity-title">Budget threshold reached</p>
                <p className="dashboard__activity-time">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="dashboard__quick-actions">
          <Button variant="outline" fullWidth>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8m8 6H8m2-3H8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Generate Report
          </Button>

          <Button variant="outline" fullWidth>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Get Support
          </Button>

          <Button variant="outline" fullWidth>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;