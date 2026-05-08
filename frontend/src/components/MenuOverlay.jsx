import { motion, AnimatePresence } from 'framer-motion';

const menuItems = ['Models', 'Bespoke', 'Ownership', 'Boutique'];

const MenuOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
          style={{
            position:   'fixed',
            inset:      0,
            zIndex:     999,
            background: 'rgba(3,3,3,0.92)',
            backdropFilter: 'blur(30px)',
          }}
        >
          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position:   'absolute',
              left:       0,
              top:        0,
              height:     '100%',
              width:      'min(500px, 85vw)',
              background: 'rgba(12,12,12,0.95)',
              borderRight: '0.5px solid rgba(255,255,255,0.07)',
              display:    'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding:    '6rem 4rem',
            }}
          >
            <p style={{
              fontSize:      '0.6rem',
              letterSpacing: '0.4em',
              color:         'rgba(255,255,255,0.3)',
              fontWeight:    300,
              marginBottom:  '3rem',
              textTransform: 'uppercase',
            }}>
              Navigation
            </p>

            {/* Menu Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1em' }}>
              {menuItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  onClick={onClose}
                  style={{
                    fontFamily:    'Playfair Display, serif',
                    fontSize:      'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight:    400,
                    color:         'rgba(255,255,255,0.2)',
                    cursor:        'pointer',
                    letterSpacing: '0.02em',
                    lineHeight:    1.2,
                    transition:    'color 0.3s',
                    width:         'fit-content',
                  }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.2)'}
                >
                  {item}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              marginTop:     'auto',
              paddingTop:    '3rem',
              borderTop:     '0.5px solid rgba(255,255,255,0.06)',
              fontSize:      '0.6rem',
              letterSpacing: '0.2em',
              color:         'rgba(255,255,255,0.2)',
              fontWeight:    300,
              lineHeight:    2,
            }}>
              <p>REGULUS Motorcars — House of Excellence</p>
              <p>+44 (0) 800 269 9999</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;