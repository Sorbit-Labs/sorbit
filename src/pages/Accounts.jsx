import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { getAccounts } from '../services/api';
import { formatCurrency, formatDate } from '../utils/formatNumber';
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
      const data = await getAccounts();
      setAccounts(data);
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
      case 'Google':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        );
      case 'LinkedIn':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'Twitter':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
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
          <h1 className="accounts__title">Accounts</h1>
          <p className="accounts__subtitle">Manage your advertising accounts</p>
        </div>
        <Button variant="primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Account
        </Button>
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
          <Card>
            <div className="accounts__loading">Loading accounts...</div>
          </Card>
        ) : filteredAccounts.length === 0 ? (
          <Card>
            <div className="accounts__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>No accounts found</p>
            </div>
          </Card>
        ) : (
          filteredAccounts.map((account) => (
            <Card key={account.id} hoverable className="accounts__card">
              <div className="accounts__card-content">
                <div className="accounts__card-main">
                  <div className="accounts__card-platform">
                    {getPlatformIcon(account.type)}
                  </div>
                  <div className="accounts__card-info">
                    <h3 className="accounts__card-name">{account.name}</h3>
                    <p className="accounts__card-type">{account.type}</p>
                  </div>
                </div>

                <div className="accounts__card-stats">
                  <div className="accounts__card-stat">
                    <span className="accounts__card-stat-label">Balance</span>
                    <span className="accounts__card-stat-value">
                      {formatCurrency(account.balance)}
                    </span>
                  </div>
                  <div className="accounts__card-stat">
                    <span className="accounts__card-stat-label">Campaigns</span>
                    <span className="accounts__card-stat-value">{account.campaigns}</span>
                  </div>
                  <div className="accounts__card-stat">
                    <span className="accounts__card-stat-label">Performance</span>
                    <span className="accounts__card-stat-value">{account.performance}%</span>
                  </div>
                  <div className="accounts__card-stat">
                    <span className="accounts__card-stat-label">Last Active</span>
                    <span className="accounts__card-stat-value">
                      {formatDate(account.lastActivity)}
                    </span>
                  </div>
                </div>

                <div className="accounts__card-actions">
                  <Badge variant={getStatusVariant(account.status)}>
                    {account.status}
                  </Badge>
                  <Button variant="ghost" size="small">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Accounts;