import React, { useState } from 'react';
import './PostComposer.css';

/**
 * PostComposer Component - Africa-Optimized
 * 
 * Simple, WhatsApp-style post composer with:
 * - Platform toggles (easy on/off switches)
 * - Character counter per platform
 * - Media preview
 * - Schedule option
 * - No complex UI - just essential features
 * 
 * Design Philosophy:
 * - One screen, all you need
 * - Clear visual feedback
 * - Mobile keyboard friendly
 */
const PostComposer = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: true,
    instagram: true,
    twitter: false,
    linkedin: false,
    tiktok: false
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // Platform configurations
  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      color: '#1877F2',
      charLimit: 63206,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      color: '#E4405F',
      charLimit: 2200,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'twitter',
      name: 'Twitter',
      color: '#1DA1F2',
      charLimit: 280,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      color: '#0A66C2',
      charLimit: 3000,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      color: '#000000',
      charLimit: 2200,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    }
  ];

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      id: Math.random().toString(36),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    setMediaFiles(prev => [...prev, ...newMedia]);
  };

  const removeMedia = (id) => {
    setMediaFiles(prev => prev.filter(media => media.id !== id));
  };

  const getLowestCharLimit = () => {
    const selectedPlatformIds = Object.keys(selectedPlatforms).filter(
      key => selectedPlatforms[key]
    );
    const limits = selectedPlatformIds.map(
      id => platforms.find(p => p.id === id)?.charLimit || 280
    );
    return Math.min(...limits);
  };

  const charLimit = getLowestCharLimit();
  const remainingChars = charLimit - postContent.length;
  const isOverLimit = remainingChars < 0;

  const handlePost = async () => {
    if (isOverLimit) return;
    
    setIsPosting(true);
    // Simulate posting
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPosting(false);
    
    // Reset form
    setPostContent('');
    setMediaFiles([]);
    setScheduleDate('');
    setIsScheduling(false);
  };

  const selectedCount = Object.values(selectedPlatforms).filter(Boolean).length;

  return (
    <div className="post-composer">
      {/* Header */}
      <div className="post-composer__header">
        <h1 className="post-composer__title">Create Post</h1>
        <p className="post-composer__subtitle">
          Share to {selectedCount} platform{selectedCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Platform Selector */}
      <div className="post-composer__platforms">
        <h3 className="post-composer__section-title">Select Platforms</h3>
        <div className="post-composer__platform-grid">
          {platforms.map(platform => (
            <button
              key={platform.id}
              className={`post-composer__platform-toggle ${
                selectedPlatforms[platform.id] ? 'post-composer__platform-toggle--active' : ''
              }`}
              onClick={() => togglePlatform(platform.id)}
              style={{
                '--platform-color': platform.color
              }}
            >
              <div className="post-composer__platform-icon">
                {platform.icon}
              </div>
              <span className="post-composer__platform-name">{platform.name}</span>
              <div className="post-composer__platform-check">
                {selectedPlatforms[platform.id] && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Composer */}
      <div className="post-composer__editor">
        <h3 className="post-composer__section-title">Write Your Post</h3>
        <div className="post-composer__textarea-wrapper">
          <textarea
            className="post-composer__textarea"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={6}
          />
          <div className={`post-composer__char-counter ${isOverLimit ? 'post-composer__char-counter--error' : ''}`}>
            <span>{remainingChars}</span>
            <span className="post-composer__char-limit">/{charLimit}</span>
          </div>
        </div>
        {isOverLimit && (
          <p className="post-composer__error-text">
            Text is too long for selected platforms
          </p>
        )}
      </div>

      {/* Media Upload */}
      <div className="post-composer__media-section">
        <h3 className="post-composer__section-title">Add Media</h3>
        
        {mediaFiles.length > 0 && (
          <div className="post-composer__media-preview">
            {mediaFiles.map(media => (
              <div key={media.id} className="post-composer__media-item">
                {media.type === 'image' ? (
                  <img src={media.preview} alt="Upload preview" />
                ) : (
                  <video src={media.preview} />
                )}
                <button
                  className="post-composer__media-remove"
                  onClick={() => removeMedia(media.id)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="post-composer__upload-btn">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleMediaUpload}
            hidden
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          <span>Add Photos or Videos</span>
        </label>
      </div>

      {/* Schedule Option */}
      <div className="post-composer__schedule">
        <div className="post-composer__schedule-toggle">
          <button
            className={`post-composer__toggle-btn ${isScheduling ? 'post-composer__toggle-btn--active' : ''}`}
            onClick={() => setIsScheduling(!isScheduling)}
          >
            <div className="post-composer__toggle-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              </svg>
            </div>
            <div className="post-composer__toggle-text">
              <span className="post-composer__toggle-label">Schedule Post</span>
              <span className="post-composer__toggle-hint">
                {isScheduling ? 'Set date & time' : 'Post later'}
              </span>
            </div>
            <div className="post-composer__switch">
              <div className="post-composer__switch-slider"></div>
            </div>
          </button>
        </div>

        {isScheduling && (
          <div className="post-composer__schedule-picker">
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="post-composer__datetime-input"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="post-composer__actions">
        <button
          className="post-composer__post-btn"
          onClick={handlePost}
          disabled={isPosting || isOverLimit || selectedCount === 0 || !postContent.trim()}
        >
          {isPosting ? (
            <>
              <div className="post-composer__spinner"></div>
              <span>Posting...</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m22 2-7 20-4-9-9-4Z"/>
                <path d="M22 2 11 13"/>
              </svg>
              <span>{isScheduling ? 'Schedule Post' : 'Post Now'}</span>
            </>
          )}
        </button>
      </div>

      {/* Helper Info */}
      <div className="post-composer__info">
        <div className="post-composer__info-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4m0-4h.01" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Your post will be published to all selected platforms</span>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;