import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeNewsletter } from '../services/api';
import { PremiumButton } from './Hero';

const Newsletter = () => {
  const [email,   setEmail]   = useState('');
  const [name,    setName]    = useState('');
  const [status,  setStatus]  = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await subscribeNewsletter(email, name);
      setStatus('success');
      setMessage(res.message);
      setEmail('');
      setName('');
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  const inputStyle = {
    background:    'transparent',
    border:        '0.5px solid rgba(255,255,255,0.15)',
    padding:       '14px 20px',
    color:         '#fff',
    fontSize:      '0.78rem',
    fontFamily:    'Montserrat, sans-serif',
    letterSpacing: '0.08em',
    fontWeight:    300,
    outline:       'none',
    width:         '100%',
  };

  return (
    <section style={{ background: '#070707', padding: '7rem 3rem', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '560px' }}>
        <p className="section-label">Stay Informed</p>
        <div className="deco-line" />
        <h2 className="section-title">The DriveX<br /><em style={{ fontStyle: 'italic' }}>Communiqué</em></h2>
        <p className="section-body" style={{ marginBottom: '3rem' }}>
          Receive news of new motor car introductions, events, and exclusive bespoke commissions.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="First Name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <PremiumButton onClick={handleSubmit}>
              {status === 'loading' ? '...' : 'Subscribe'}
            </PremiumButton>
          </div>
        </form>

        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop:     '1.2rem',
                fontSize:      '0.72rem',
                letterSpacing: '0.08em',
                color: status === 'success' ? 'rgba(100,220,150,0.8)' : 'rgba(220,100,100,0.8)',
              }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Newsletter;