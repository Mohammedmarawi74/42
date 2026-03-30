import React, { forwardRef } from 'react';
import { AppState, SlideData } from '../types';
import { Icons } from './ui/Icons';

interface CanvasPreviewProps {
  slide: SlideData;
  appState: AppState;
  totalSlides: number;
  currentIndex: number;
}

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(({
  slide,
  appState,
  totalSlides,
  currentIndex
}, ref) => {
  const { theme, logo, customCSS } = appState;

  // Inline style for custom CSS injection
  const cssStyle = customCSS ? <style>{customCSS}</style> : null;

  return (
    <div 
      ref={ref}
      id="canvas-preview-root"
      dir="rtl"
      lang="ar"
      className="canvas-root custom-slide-wrapper transition-all duration-300"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily,
        textRendering: 'geometricPrecision',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {cssStyle}

      {/* Background Ambience (Glow effects) */}
      <div 
        className="canvas-glow canvas-glow-tl"
        style={{ backgroundColor: theme.primaryColor }}
      />
      <div 
        className="canvas-glow canvas-glow-br"
        style={{ backgroundColor: theme.secondaryColor }}
      />

      {/* Header Area */}
      <div className="canvas-header">
        {/* Left Side: Brand Name (always visible) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.primaryColor, flexShrink: 0 }}>
            <Icons.MonitorPlay size={24} style={{ color: '#000' }} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.025em', whiteSpace: 'nowrap' }}>منصة المستثمر</span>
        </div>

        {/* Right Side: Selected Logo OR default tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          {logo ? (
            <img src={logo} alt="Brand Logo" style={{ height: '3.5rem', maxWidth: '160px', objectFit: 'contain' }} />
          ) : (
            <>
              <span style={{ fontSize: '0.875rem', fontWeight: 300, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>توصيات ذكية</span>
              <div style={{ height: '0.25rem', width: '3rem', borderRadius: '9999px', marginTop: '0.5rem', backgroundColor: theme.primaryColor }}></div>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="canvas-body">
        
        {/* Main Card Container */}
        <div 
            className="main-card"
            style={{ 
                backgroundColor: theme.cardBackground,
            }}
        >
            {/* Highlight Badge */}
            {slide.highlight && (
                <div 
                    className="card-badge"
                    style={{ backgroundColor: theme.secondaryColor }}
                >
                    {slide.highlight}
                </div>
            )}

            {/* Text Content Side */}
            <div className="card-content">
                <h3 
                    style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 500, opacity: 0.8, color: theme.secondaryColor }}
                >
                    {slide.subtitle}
                </h3>
                <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '2rem' }}>
                    {slide.title}
                </h1>
                <p style={{ fontSize: '1.25rem', lineHeight: 1.6, opacity: 0.7, marginBottom: '2.5rem' }}>
                    {slide.description}
                </p>

                <button 
                    className="card-cta-btn"
                    style={{ 
                        backgroundColor: theme.primaryColor,
                        color: '#000000',
                        boxShadow: `0 10px 30px -10px ${theme.primaryColor}66`
                    }}
                >
                    <span>{slide.ctaText}</span>
                    <Icons.ChevronLeft size={24} />
                </button>
                
                {/* Decorative Element */}
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8rem', height: '8rem', opacity: 0.05 }}>
                   <Icons.Layers size={128} />
                </div>
            </div>

            {/* Image Side */}
            <div className="card-image-wrapper">
                <div className="card-image-gradient"></div>
                {slide.image ? (
                    <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="card-img"
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icons.Image size={64} style={{ opacity: 0.2 }} />
                    </div>
                )}
            </div>
        </div>

      </div>

      {/* Footer Area */}
      <div className="canvas-footer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        </div>

        {/* Pagination Dots in Design */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            {Array.from({ length: totalSlides }).map((_, idx) => (
                <div 
                    key={idx}
                    className="transition-all duration-300"
                    style={{ 
                        height: '0.5rem', 
                        borderRadius: '9999px',
                        width: idx === currentIndex ? '3rem' : '0.5rem',
                        opacity: idx === currentIndex ? 1 : 0.3,
                        backgroundColor: idx === currentIndex ? theme.primaryColor : '#ffffff' 
                    }}
                />
            ))}
        </div>
      </div>

      {/* 5px Brand Footer Stripe and Labels Wrapper */}
      <div className="design-brand-footer-bar" style={{ backgroundColor: theme.primaryColor }} />
      <div className="design-brand-footer-labels" style={{ color: theme.textColor }}>
        <span className="footer-text-left">al-investor.com</span>
        <span className="footer-text-right" dir="rtl">منصة المستثمر الاقتصادية</span>
      </div>

    </div>
  );
});

CanvasPreview.displayName = "CanvasPreview";