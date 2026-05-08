import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedModels } from '../services/api';

const Hero = () => {
  const [heroModel, setHeroModel] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const bgRef = useRef(null);

  useEffect(() => {
    getFeaturedModels()
      .then(res => {
        if (res.data?.length > 0) setHeroModel(res.data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current && window.scrollY < window.innerHeight) {
        bgRef.current.style.transform =
          `scale(1.08) translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroTitle    = heroModel?.name    || 'OBSIDIAN';
  const heroSubtitle = heroModel?.tagline || 'Where silence becomes a statement';
  const heroBgUrl    = heroModel?.images?.find(i => i.isPrimary)?.url
    || heroModel?.images?.[0]?.url
    || 'https://wallpapercave.com/wp/wp8703088.jpg';

  return (
    <section style={{
      position:       'relative',
      height:         '100vh',
      width:          '100%',
      overflow:       'hidden',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    }}>
      {/* Background */}
      <div ref={bgRef} style={{
        position:          'absolute',
        inset:             0,
        backgroundImage:   `url('${heroBgUrl}')`,
        backgroundSize:    'cover',
        backgroundPosition: 'center',
        animation:         'heroZoom 20s ease-in-out infinite alternate',
      }} />

      {/* Overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Content */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'relative', textAlign: 'center' }}
        >
          <p style={{
            fontSize:      '0.62rem',
            fontWeight:    300,
            letterSpacing: '0.5em',
            color:         'rgba(255,255,255,0.5)',
            marginBottom:  '1.5rem',
            textTransform: 'uppercase',
          }}>
            {heroModel?.category === 'electric' ? 'Beyond Generation' : 'The New Generation'}
          </p>

          <h1 style={{
            fontFamily:    'Playfair Display, serif',
            fontSize:      'clamp(4rem, 12vw, 9rem)',
            fontWeight:    700,
            letterSpacing: '0.1em',
            lineHeight:    0.9,
            color:         '#fff',
            marginBottom:  '1rem',
          }}>
            {heroTitle}
          </h1>

          <p style={{
            fontFamily:    'Cormorant Garamond, serif',
            fontSize:      'clamp(1rem, 2vw, 1.4rem)',
            fontWeight:    300,
            letterSpacing: '0.15em',
            color:         'rgba(255,255,255,0.55)',
            marginBottom:  '3rem',
            fontStyle:     'italic',
          }}>
            {heroSubtitle}
          </p>

          {heroModel?.price?.base && (
            <p style={{
              fontSize:      '0.7rem',
              letterSpacing: '0.3em',
              color:         'rgba(255,255,255,0.3)',
              marginBottom:  '2rem',
              fontWeight:    300,
            }}>
              From £{heroModel.price.base.toLocaleString()}
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <PremiumButton>Discover Now</PremiumButton>
            <PremiumButton outline>Configure</PremiumButton>
          </div>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <div style={{
        position:       'absolute',
        bottom:         '2.5rem',
        left:           '50%',
        transform:      'translateX(-50%)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '8px',
        opacity:        0.35,
      }}>
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.35em', fontWeight: 300 }}>
          SCROLL
        </span>
        <div style={{
          width:      '0.5px',
          height:     '40px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
          animation:  'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes heroZoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50%      { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
};

// Reusable Premium Button
export const PremiumButton = ({ children, outline, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:      'relative',
        overflow:      'hidden',
        fontFamily:    'Montserrat, sans-serif',
        fontSize:      '0.65rem',
        fontWeight:    500,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color:         outline ? '#fff' : '#111',
        background:    outline ? 'transparent' : '#fff',
        border:        outline ? '0.5px solid rgba(255,255,255,0.4)' : 'none',
        padding:       '16px 44px',
        cursor:        'pointer',
        borderRadius:  '50px',
        transform:     hovered ? 'scale(1.04)' : 'scale(1)',
        boxShadow:     hovered && !outline ? '0 0 40px rgba(255,255,255,0.2)' : 'none',
        transition:    'all 0.3s ease',
      }}
    >
      {/* Shimmer sweep */}
      <span style={{
        position:   'absolute',
        left:       hovered ? '100%' : '-100%',
        top:        0,
        width:      '100%',
        height:     '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        transition: 'left 0.5s ease',
        borderRadius: '50px',
      }} />
      {children}
    </button>
  );
};

export default Hero;