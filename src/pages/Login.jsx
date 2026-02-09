import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiAlertCircle,
  FiArrowRight,
  FiBarChart2,
  FiEye,
  FiEyeOff,
  FiLayers,
  FiLock,
  FiMail,
  FiMoon,
  FiShield,
  FiSun,
} from 'react-icons/fi';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import './Login.css';

/**
 * Login Page Component
 * 
 * Provides user authentication interface with:
 * - Email/password login form
 * - Social media login options (Google, Facebook, Twitter)
 * - Remember me functionality
 * - Forgot password link
 * - Link to register page
 * - Theme toggle support
 */
const Login = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const { login } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrors({ submit: error?.message || 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="login-page" data-theme={theme}>
      {/* Theme Toggle */}
      <button 
        className="login-page__theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <FiSun />
        ) : (
          <FiMoon />
        )}
      </button>

      {/* Background Shapes */}
      <div className="login-page__background">
        <div className="login-page__shape login-page__shape--1"></div>
        <div className="login-page__shape login-page__shape--2"></div>
        <div className="login-page__shape login-page__shape--3"></div>
      </div>

      <div className="login-page__container">
        {/* Left Side - Branding */}
        <div className="login-page__branding">
          <div className="login-page__logo-wrapper">
            <img 
              src="/logo.png" 
              alt="SorBit Logo" 
              className="login-page__logo"
              onClick={() => navigate('/')}
            />
          </div>
          
          <h1 className="login-page__branding-title">
            Welcome Back to <span className="gradient-text">SorBit</span>
          </h1>
          
          <p className="login-page__branding-description">
            Manage all your social media accounts in one powerful dashboard. 
            Connect, analyze, and grow your online presence effortlessly.
          </p>

          <div className="login-page__features">
            <div className="login-page__feature">
              <div className="login-page__feature-icon">
                <FiLayers />
              </div>
              <span>Multi-platform management</span>
            </div>

            <div className="login-page__feature">
              <div className="login-page__feature-icon">
                <FiBarChart2 />
              </div>
              <span>Real-time analytics</span>
            </div>

            <div className="login-page__feature">
              <div className="login-page__feature-icon">
                <FiShield />
              </div>
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-page__form-container">
          <div className="login-page__form-card">
            <div className="login-page__form-header">
              <h2 className="login-page__form-title">Sign In</h2>
              <p className="login-page__form-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="login-page__error-banner">
                <FiAlertCircle />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-page__form">
              {/* Email Input */}
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                error={errors.email}
                autoComplete="email"
                icon={
                  <FiMail />
                }
                fullWidth
              />

              {/* Password Input */}
              <div className="login-page__password-field">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.password}
                  autoComplete="current-password"
                  icon={
                    <FiLock />
                  }
                  fullWidth
                />
                <button
                  type="button"
                  className="login-page__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="login-page__form-options">
                <label className="login-page__checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="login-page__checkbox-label">Remember me</span>
                </label>

                <Link to="/forgot-password" className="login-page__forgot-link">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <Loader size="small" />
                ) : (
                  <>
                    Sign In
                    <FiArrowRight />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="login-page__divider">
              <span>Or continue with</span>
            </div>

            {/* Social Login */}
            <div className="login-page__social">
              <button 
                className="login-page__social-btn login-page__social-btn--google"
                onClick={() => handleSocialLogin('Google')}
              >
                <FaGoogle className="login-page__social-icon login-page__social-icon--google" />
                <span>Google</span>
              </button>

              <button 
                className="login-page__social-btn login-page__social-btn--facebook"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <FaFacebookF className="login-page__social-icon login-page__social-icon--facebook" />
                <span>Facebook</span>
              </button>

              <button 
                className="login-page__social-btn login-page__social-btn--twitter"
                onClick={() => handleSocialLogin('Twitter')}
              >
                <FaTwitter className="login-page__social-icon login-page__social-icon--twitter" />
                <span>Twitter</span>
              </button>
            </div>

            {/* Register Link */}
            <div className="login-page__register-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
