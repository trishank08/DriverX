import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuClick, menuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        width:      '100%',
        zIndex:     1000,
        padding:    scrolled ? '1rem 3rem' : '1.5rem 3rem',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        style={{
          background: 'none', border: 'none',
          cursor: 'pointer', padding: '8px',
          display: 'flex', flexDirection: 'column', gap: '5px',
        }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block',
            width:   '24px',
            height:  '1px',
            background: '#fff',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            transformOrigin: 'left center',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(1px,-1px)'
              : i === 1 ? 'scaleX(0)'
              : 'rotate(-45deg) translate(1px,1px)'
              : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily:    'Playfair Display, serif',
          fontSize:      '1.4rem',
          fontWeight:    700,
          letterSpacing: '0.25em',
          color:         '#fff',
          lineHeight:    1.1,
        }}>
          DriveX
        </div>
        <div style={{
          fontFamily:    'Montserrat, sans-serif',
          fontSize:      '0.52rem',
          fontWeight:    200,
          letterSpacing: '0.6em',
          color:         'rgba(255,255,255,0.55)',
          marginTop:     '3px',
        }}>
          established mmxxv
        </div>
      </div>

      {/* Dealer Button */}
      <button style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '8px',
        fontFamily:    'Montserrat, sans-serif',
        fontSize:      '0.68rem',
        fontWeight:    400,
        letterSpacing: '0.18em',
        color:         'rgba(255,255,255,0.85)',
        background:    'none',
        border:        '0.5px solid rgba(255,255,255,0.3)',
        padding:       '10px 18px',
        cursor:        'pointer',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        Find a Dealer
      </button>
    </motion.nav>
  );
};

export default Navbar;