import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import { getAccounts } from '../services/api';
import { formatNumber, formatDate } from '../utils/formatNumber';
import './Accounts.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      // Mock social media accounts
      const mockAccounts = [
        {
          id: 1,
          name: 'My Facebook Page',
          type: 'Facebook',
          status: 'active',
          followers: 45200,
          lastActivity: new Date('2026-02-01'),
          posts: 142,
          engagement: 4.8,
          color: '#1877F2',
        },
        {
          id: 2,
          name: '@myinstagram',
          type: 'Instagram',
          status: 'active',
          followers: 128500,
          lastActivity: new Date('2026-02-02'),
          posts: 328,
          engagement: 7.2,
          color: '#E4405F',
        },
        {
          id: 3,
          name: '@mytwitter',
          type: 'Twitter',
          status: 'active',
          followers: 32100,
          lastActivity: new Date('2026-02-01'),
          posts: 856,
          engagement: 3.5,
          color: '#1DA1F2',
        },
        {
          id: 4,
          name: 'My LinkedIn Profile',
          type: 'LinkedIn',
          status: 'paused',
          followers: 12800,
          lastActivity: new Date('2026-01-28'),
          posts: 89,
          engagement: 5.1,
          color: '#0A66C2',
        },
        {
          id: 5,
          name: '@mytiktok',
          type: 'TikTok',
          status: 'active',
          followers: 95300,
          lastActivity: new Date('2026-02-02'),
          posts: 234,
          engagement: 9.8,
          color: '#000000',
        },
        {
          id: 6,
          name: 'My YouTube Channel',
          type: 'YouTube',
          status: 'inactive',
          followers: 8400,
          lastActivity: new Date('2026-01-15'),
          posts: 45,
          engagement: 2.1,
          color: '#FF0000',
        },
      ];
      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPlatformIcon = (type) => {
    switch (type) {
      case 'Facebook':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'Instagram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
          </svg>
        );
      case 'Twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'LinkedIn':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'TikTok':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      case 'YouTube':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="accounts">
      {/* Header */}
      <div className="accounts__header">
        <div>
          <h1 className="accounts__title">Connected Accounts</h1>
          <p className="accounts__subtitle">Manage your social media connections</p>
        </div>
        <Button variant="primary" className="accounts__connect-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Connect New Account
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="accounts__overview">
        <div className="accounts__overview-card">
          <div className="accounts__overview-icon" style={{ backgroundColor: '#1877F215', color: '#1877F2' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="accounts__overview-info">
            <span className="accounts__overview-value">{formatNumber(322300)}</span>
            <span className="accounts__overview-label">Total Followers</span>
          </div>
        </div>

        <div className="accounts__overview-card">
          <div className="accounts__overview-icon" style={{ backgroundColor: '#22C55E15', color: '#22C55E' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="accounts__overview-info">
            <span className="accounts__overview-value">5.9%</span>
            <span className="accounts__overview-label">Avg. Engagement</span>
          </div>
        </div>

        <div className="accounts__overview-card">
          <div className="accounts__overview-icon" style={{ backgroundColor: '#F59E0B15', color: '#F59E0B' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="accounts__overview-info">
            <span className="accounts__overview-value">{formatNumber(1694)}</span>
            <span className="accounts__overview-label">Total Posts</span>
          </div>
        </div>

        <div className="accounts__overview-card">
          <div className="accounts__overview-icon" style={{ backgroundColor: '#8B5CF615', color: '#8B5CF6' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 4 12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="accounts__overview-info">
            <span className="accounts__overview-value">5</span>
            <span className="accounts__overview-label">Active Accounts</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="accounts__filters">
          <Input
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />

          <div className="accounts__filter-buttons">
            <Button
              variant={filterStatus === 'all' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setFilterStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'paused' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setFilterStatus('paused')}
            >
              Paused
            </Button>
            <Button
              variant={filterStatus === 'inactive' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setFilterStatus('inactive')}
            >
              Inactive
            </Button>
          </div>
        </div>
      </Card>

      {/* Accounts List */}
      <div className="accounts__list">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
            <Loader size="large" text="Loading accounts..." />
          </div>
        ) : filteredAccounts.length === 0 ? (
          <Card>
            <div className="accounts__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>No accounts found</p>
              <Button variant="primary">Connect Your First Account</Button>
            </div>
          </Card>
        ) : (
          filteredAccounts.map((account) => (
            <Card key={account.id} hoverable className="accounts__card card-3d">
              <div className="accounts__card-header">
                <div 
                  className="accounts__card-platform"
                  style={{ backgroundColor: `${account.color}15`, color: account.color }}
                >
                  {getPlatformIcon(account.type)}
                </div>
                <div className="accounts__card-info">
                  <h3 className="accounts__card-name">{account.name}</h3>
                  <p className="accounts__card-type">{account.type}</p>
                </div>
                <Badge variant={getStatusVariant(account.status)}>
                  {account.status}
                </Badge>
              </div>

              <div className="accounts__card-stats">
                <div className="accounts__card-stat">
                  <span className="accounts__card-stat-label">Followers</span>
                  <span className="accounts__card-stat-value">
                    {formatNumber(account.followers)}
                  </span>
                </div>
                <div className="accounts__card-stat">
                  <span className="accounts__card-stat-label">Posts</span>
                  <span className="accounts__card-stat-value">{account.posts}</span>
                </div>
                <div className="accounts__card-stat">
                  <span className="accounts__card-stat-label">Engagement</span>
                  <span className="accounts__card-stat-value">{account.engagement}%</span>
                </div>
                <div className="accounts__card-stat">
                  <span className="accounts__card-stat-label">Last Active</span>
                  <span className="accounts__card-stat-value">
                    {formatDate(account.lastActivity)}
                  </span>
                </div>
              </div>

              <div className="accounts__card-actions">
                <Button variant="primary" size="small" fullWidth>
                  View Analytics
                </Button>
                <Button variant="secondary" size="small" fullWidth>
                  Manage
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Accounts;