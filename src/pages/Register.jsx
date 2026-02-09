import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiAlertCircle,
  FiArrowRight,
  FiBarChart2,
  FiCalendar,
  FiEye,
  FiEyeOff,
  FiLayers,
  FiLock,
  FiMail,
  FiMoon,
  FiSun,
  FiUser,
} from 'react-icons/fi';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import './Register.css';

/**
 * Register Page Component
 * 
 * Provides user registration interface with:
 * - Full name, email, password registration form
 * - Password strength indicator
 * - Social media registration options (Google, Facebook, Twitter)
 * - Terms and conditions acceptance
 * - Link to login page
 * - Theme toggle support
 * - Form validation
 */
const Register = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const { register } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
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
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the terms and conditions';
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
      await register(formData.fullName.trim(), formData.email, formData.password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrors({ submit: error?.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle social registration
  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
    // Implement social registration logic here
  };

  // Get password strength label and color
  const getPasswordStrengthInfo = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { label: 'Weak', color: '#EF4444', width: '20%' };
      case 2:
        return { label: 'Fair', color: '#F59E0B', width: '40%' };
      case 3:
        return { label: 'Good', color: '#3B82F6', width: '60%' };
      case 4:
        return { label: 'Strong', color: '#10B981', width: '80%' };
      case 5:
        return { label: 'Very Strong', color: '#22C55E', width: '100%' };
      default:
        return { label: '', color: '', width: '0%' };
    }
  };

  const strengthInfo = getPasswordStrengthInfo();

  return (
    <div className="register-page" data-theme={theme}>
      {/* Theme Toggle */}
      <button 
        className="register-page__theme-toggle"
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
      <div className="register-page__background">
        <div className="register-page__shape register-page__shape--1"></div>
        <div className="register-page__shape register-page__shape--2"></div>
        <div className="register-page__shape register-page__shape--3"></div>
      </div>

      <div className="register-page__container">
        {/* Left Side - Branding */}
        <div className="register-page__branding">
          <div className="register-page__logo-wrapper">
            <img 
              src="/logo.png" 
              alt="SorBit Logo" 
              className="register-page__logo"
              onClick={() => navigate('/')}
            />
          </div>
          
          <h1 className="register-page__branding-title">
            Join <span className="gradient-text">SorBit</span> Today
          </h1>
          
          <p className="register-page__branding-description">
            Create your account and start managing all your social media platforms 
            from one powerful dashboard. It's free to get started!
          </p>

          <div className="register-page__benefits">
            <div className="register-page__benefit">
              <div className="register-page__benefit-icon">
                <FiLayers />
              </div>
              <div className="register-page__benefit-content">
                <h3>Multi-Platform Support</h3>
                <p>Connect unlimited social media accounts</p>
              </div>
            </div>

            <div className="register-page__benefit">
              <div className="register-page__benefit-icon">
                <FiBarChart2 />
              </div>
              <div className="register-page__benefit-content">
                <h3>Advanced Analytics</h3>
                <p>Track performance with detailed insights</p>
              </div>
            </div>

            <div className="register-page__benefit">
              <div className="register-page__benefit-icon">
                <FiCalendar />
              </div>
              <div className="register-page__benefit-content">
                <h3>Smart Scheduling</h3>
                <p>Plan and automate your content strategy</p>
              </div>
            </div>
          </div>

          <div className="register-page__stats">
            <div className="register-page__stat">
              <span className="register-page__stat-value">50K+</span>
              <span className="register-page__stat-label">Active Users</span>
            </div>
            <div className="register-page__stat">
              <span className="register-page__stat-value">1M+</span>
              <span className="register-page__stat-label">Posts Managed</span>
            </div>
            <div className="register-page__stat">
              <span className="register-page__stat-value">99.9%</span>
              <span className="register-page__stat-label">Uptime</span>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="register-page__form-container">
          <div className="register-page__form-card">
            <div className="register-page__form-header">
              <h2 className="register-page__form-title">Create Account</h2>
              <p className="register-page__form-subtitle">
                Fill in your details to get started
              </p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="register-page__error-banner">
                <FiAlertCircle />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="register-page__form">
              {/* Full Name Input */}
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.fullName}
                autoComplete="name"
                icon={
                  <FiUser />
                }
                fullWidth
              />

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
              <div className="register-page__password-field">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.password}
                  autoComplete="new-password"
                  icon={
                    <FiLock />
                  }
                  fullWidth
                />
                <button
                  type="button"
                  className="register-page__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="register-page__password-strength">
                    <div className="register-page__strength-bar">
                      <div 
                        className="register-page__strength-fill"
                        style={{ 
                          width: strengthInfo.width, 
                          backgroundColor: strengthInfo.color 
                        }}
                      ></div>
                    </div>
                    <span 
                      className="register-page__strength-label"
                      style={{ color: strengthInfo.color }}
                    >
                      {strengthInfo.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="register-page__password-field">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  icon={
                    <FiLock />
                  }
                  fullWidth
                />
                <button
                  type="button"
                  className="register-page__password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Terms and Conditions */}
              <div className="register-page__terms">
                <label className="register-page__checkbox">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span className="register-page__checkbox-label">
                    I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <span className="register-page__error-text">{errors.agreeToTerms}</span>
                )}
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
                    Create Account
                    <FiArrowRight />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="register-page__divider">
              <span>Or register with</span>
            </div>

            {/* Social Registration */}
            <div className="register-page__social">
              <button 
                className="register-page__social-btn register-page__social-btn--google"
                onClick={() => handleSocialRegister('Google')}
              >
                <FaGoogle className="register-page__social-icon register-page__social-icon--google" />
                <span>Google</span>
              </button>

              <button 
                className="register-page__social-btn register-page__social-btn--facebook"
                onClick={() => handleSocialRegister('Facebook')}
              >
                <FaFacebookF className="register-page__social-icon register-page__social-icon--facebook" />
                <span>Facebook</span>
              </button>

              <button 
                className="register-page__social-btn register-page__social-btn--twitter"
                onClick={() => handleSocialRegister('Twitter')}
              >
                <FaTwitter className="register-page__social-icon register-page__social-icon--twitter" />
                <span>Twitter</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="register-page__login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
