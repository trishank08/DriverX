const footerLinks = {
  Models:  ['Lamborghini', 'Ghost', 'Wraith', 'Dawn', 'OBSIDIAN', 'Cullinan'],
  Company: ['About DriveX', 'Bespoke Team', 'Ownership', 'Boutique', 'Careers'],
  Legal:   ['Privacy Policy', 'Cookie Policy', 'Terms of Use', 'Accessibility'],
};

const Footer = () => (
  <footer style={{
    background:  '#030303',
    borderTop:   '0.5px solid rgba(255,255,255,0.05)',
    padding:     '5rem 3rem 2rem',
  }}>
    <div style={{
      display:             'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap:                 '4rem',
      marginBottom:        '4rem',
    }}>
      {/* Brand */}
      <div>
        <p style={{
          fontFamily:    'Playfair Display, serif',
          fontSize:      '1.2rem',
          letterSpacing: '0.25em',
          color:         '#fff',
          marginBottom:  '1rem',
        }}>
          DriveX
        </p>
        <p style={{
          fontSize:   '0.72rem',
          fontWeight: 300,
          color:      'rgba(255,255,255,0.2)',
          lineHeight: 2,
          maxWidth:   '28ch',
        }}>
          Dedicated to those who appreciate that a motor car can be more than the sum of its parts.
        </p>
      </div>

      {/* Link Columns */}
      {Object.entries(footerLinks).map(([heading, links]) => (
        <div key={heading}>
          <p style={{
            fontSize:      '0.6rem',
            letterSpacing: '0.35em',
            color:         'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginBottom:  '1.5rem',
          }}>
            {heading}
          </p>
          {links.map(link => (
            <a key={link} style={{
              display:       'block',
              fontSize:      '0.75rem',
              fontWeight:    300,
              color:         'rgba(255,255,255,0.3)',
              marginBottom:  '0.85rem',
              cursor:        'pointer',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition:    'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
            >
              {link}
            </a>
          ))}
        </div>
      ))}
    </div>

    {/* Bottom Bar */}
    <div style={{
      borderTop:     '0.5px solid rgba(255,255,255,0.04)',
      paddingTop:    '2rem',
      display:       'flex',
      justifyContent: 'space-between',
      alignItems:    'center',
    }}>
      <p style={{
        fontSize:      '0.62rem',
        color:         'rgba(255,255,255,0.15)',
        letterSpacing: '0.08em',
        fontWeight:    300,
      }}>
        © 2025 DriveX Motorcars Limited. All rights reserved.
      </p>

      {/* Social Icons */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {['IG', 'TW', 'YT', 'LI'].map(icon => (
          <div key={icon} style={{
            width:          '32px',
            height:         '32px',
            border:         '0.5px solid rgba(255,255,255,0.12)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            cursor:         'pointer',
            fontSize:       '0.55rem',
            letterSpacing:  '0.05em',
            color:          'rgba(255,255,255,0.3)',
            transition:     'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
          }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;