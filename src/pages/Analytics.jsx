import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Loader from '../components/ui/Loader';
import { getAnalyticsData } from '../services/api';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatNumber';
import './Analytics.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalyticsData();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const periods = [
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: '90days', label: '90 Days' },
    { value: 'year', label: 'Year' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
        <Loader size="large" text="Loading analytics..." />
      </div>
    );
  }

  return (
    <div className="analytics">
      {/* Header */}
      <div className="analytics__header">
        <div>
          <h1 className="analytics__title">Analytics</h1>
          <p className="analytics__subtitle">Performance insights and metrics</p>
        </div>
        <div className="analytics__header-actions">
          <div className="analytics__period-selector">
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
          <Button variant="outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7 0-4M7 10V6M12 14V2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export
          </Button>
        </div>
      </div>

      {/* Main Chart */}
      <Card title="Performance Overview" subtitle="Revenue, clicks, and impressions over time">
        <div className="analytics__main-chart">
          <div className="analytics__chart-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 17V9m-5 8V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Interactive chart visualization would go here</p>
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="analytics__overview">
        <Card>
          <div className="analytics__overview-stat">
            <div className="analytics__overview-icon analytics__overview-icon--primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="analytics__overview-content">
              <span className="analytics__overview-label">Total Revenue</span>
              <span className="analytics__overview-value">{formatCurrency(35820)}</span>
              <span className="analytics__overview-change analytics__overview-change--positive">
                +12.5% vs last period
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="analytics__overview-stat">
            <div className="analytics__overview-icon analytics__overview-icon--success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="analytics__overview-content">
              <span className="analytics__overview-label">Total Clicks</span>
              <span className="analytics__overview-value">{formatNumber(10390)}</span>
              <span className="analytics__overview-change analytics__overview-change--positive">
                +8.2% vs last period
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="analytics__overview-stat">
            <div className="analytics__overview-icon analytics__overview-icon--info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div className="analytics__overview-content">
              <span className="analytics__overview-label">Impressions</span>
              <span className="analytics__overview-value">{formatNumber(362000)}</span>
              <span className="analytics__overview-change analytics__overview-change--positive">
                +15.3% vs last period
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="analytics__overview-stat">
            <div className="analytics__overview-icon analytics__overview-icon--warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="analytics__overview-content">
              <span className="analytics__overview-label">Avg. CTR</span>
              <span className="analytics__overview-value">{formatPercentage(2.87)}</span>
              <span className="analytics__overview-change analytics__overview-change--negative">
                -0.3% vs last period
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="analytics__grid">
        {/* Top Campaigns */}
        <Card title="Top Performing Campaigns" subtitle="Best campaigns by revenue">
          <div className="analytics__campaigns">
            {analytics?.topCampaigns?.map((campaign, index) => (
              <div key={campaign.id} className="analytics__campaign-item">
                <div className="analytics__campaign-rank">#{index + 1}</div>
                <div className="analytics__campaign-info">
                  <span className="analytics__campaign-name">{campaign.name}</span>
                  <span className="analytics__campaign-platform">
                    <Badge variant="default" size="small">{campaign.platform}</Badge>
                  </span>
                </div>
                <div className="analytics__campaign-stats">
                  <span className="analytics__campaign-revenue">
                    {formatCurrency(campaign.revenue)}
                  </span>
                  <span className="analytics__campaign-roi">
                    ROI: {formatPercentage(campaign.roi)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Platform Breakdown */}
        <Card title="Platform Breakdown" subtitle="Revenue by advertising platform">
          <div className="analytics__platforms">
            {analytics?.platformBreakdown?.map((platform) => (
              <div key={platform.platform} className="analytics__platform-item">
                <div className="analytics__platform-header">
                  <span className="analytics__platform-name">{platform.platform}</span>
                  <span className="analytics__platform-percentage">
                    {formatPercentage(platform.percentage)}
                  </span>
                </div>
                <div className="analytics__platform-bar">
                  <div
                    className="analytics__platform-fill"
                    style={{ width: `${platform.percentage}%` }}
                  ></div>
                </div>
                <span className="analytics__platform-revenue">
                  {formatCurrency(platform.revenue)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" subtitle="Latest performance updates">
        <div className="analytics__activity">
          <div className="analytics__activity-item">
            <div className="analytics__activity-icon analytics__activity-icon--success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="analytics__activity-content">
              <p className="analytics__activity-title">Campaign "Summer Sale" exceeded target by 25%</p>
              <p className="analytics__activity-time">2 hours ago</p>
            </div>
          </div>

          <div className="analytics__activity-item">
            <div className="analytics__activity-icon analytics__activity-icon--warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="analytics__activity-content">
              <p className="analytics__activity-title">Budget threshold reached for Google Ads</p>
              <p className="analytics__activity-time">5 hours ago</p>
            </div>
          </div>

          <div className="analytics__activity-item">
            <div className="analytics__activity-icon analytics__activity-icon--info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4m0-4h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="analytics__activity-content">
              <p className="analytics__activity-title">New optimization suggestion available</p>
              <p className="analytics__activity-time">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;