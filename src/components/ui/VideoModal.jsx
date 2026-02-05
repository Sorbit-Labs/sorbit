import React, { useEffect, useRef } from 'react';
import './VideoModal.css';

/**
 * VideoModal Component
 * 
 * A sleek, animated modal for displaying videos with controls
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Callback function when modal closes
 * @param {string} props.videoUrl - URL of the video to display (YouTube, Vimeo, or direct video file)
 * @param {string} props.title - Optional title for the video
 * @param {boolean} props.autoPlay - Whether to auto-play the video when modal opens (default: true)
 * @param {boolean} props.showControls - Whether to show video controls (default: true)
 * 
 * USAGE EXAMPLES:
 * 
 * 1. YouTube Video:
 *    <VideoModal 
 *      isOpen={isModalOpen}
 *      onClose={() => setIsModalOpen(false)}
 *      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
 *      title="Demo Video"
 *    />
 * 
 * 2. Vimeo Video:
 *    <VideoModal 
 *      isOpen={isModalOpen}
 *      onClose={() => setIsModalOpen(false)}
 *      videoUrl="https://player.vimeo.com/video/123456789"
 *    />
 * 
 * 3. Direct Video File:
 *    <VideoModal 
 *      isOpen={isModalOpen}
 *      onClose={() => setIsModalOpen(false)}
 *      videoUrl="/videos/demo.mp4"
 *      autoPlay={false}
 *    />
 */
const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title = '',
  autoPlay = true,
  showControls = true 
}) => {
  const modalRef = useRef(null);
  const videoRef = useRef(null);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Stop video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      // For native HTML5 video
      if (videoRef.current.pause) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  // Determine video type and render appropriate player
  const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  const isVimeo = videoUrl?.includes('vimeo.com');
  const isDirectVideo = !isYouTube && !isVimeo;

  // Format YouTube URL for embedding
  const getYouTubeEmbedUrl = (url) => {
    if (url.includes('embed/')) return url;
    
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0`;
  };

  // Format Vimeo URL for embedding
  const getVimeoEmbedUrl = (url) => {
    if (url.includes('player.vimeo.com')) return `${url}?autoplay=${autoPlay ? 1 : 0}`;
    
    const videoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}`;
  };

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={handleBackdropClick}>
      <div className="video-modal" ref={modalRef}>
        {/* Close Button */}
        <button 
          className="video-modal__close"
          onClick={onClose}
          aria-label="Close video modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Video Title */}
        {title && (
          <div className="video-modal__header">
            <h3 className="video-modal__title">{title}</h3>
          </div>
        )}

        {/* Video Container */}
        <div className="video-modal__content">
          {isYouTube && (
            <iframe
              className="video-modal__iframe"
              src={getYouTubeEmbedUrl(videoUrl)}
              title={title || 'YouTube Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {isVimeo && (
            <iframe
              className="video-modal__iframe"
              src={getVimeoEmbedUrl(videoUrl)}
              title={title || 'Vimeo Video'}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}

          {isDirectVideo && (
            <video
              ref={videoRef}
              className="video-modal__video"
              src={videoUrl}
              controls={showControls}
              autoPlay={autoPlay}
              controlsList="nodownload"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Video Info/Description (Optional) */}
        <div className="video-modal__footer">
          <div className="video-modal__controls-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4m0-4h.01" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Press ESC to close or click outside the video</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;