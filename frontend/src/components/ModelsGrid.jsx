import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllModels } from '../services/api';

const categories = ['', 'saloon', 'coupe', 'convertible', 'suv', 'electric'];

const ModelsGrid = () => {
  const [models,  setModels]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('');

  useEffect(() => {
    setLoading(true);
    getAllModels(filter)
      .then(res => setModels(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <section style={{ background: '#0a0a0a', padding: '7rem 3rem' }}>
      <p className="section-label">Our Collection</p>
      <div className="deco-line" />
      <h2 className="section-title">The Motor Cars</h2>
      <p className="section-body">
        Each motor car a unique expression — handcrafted over thousands of hours by master artisans.
      </p>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background:    filter === cat ? '#fff' : 'transparent',
              color:         filter === cat ? '#111' : 'rgba(255,255,255,0.4)',
              border:        '0.5px solid rgba(255,255,255,0.2)',
              padding:       '8px 20px',
              borderRadius:  '50px',
              fontSize:      '0.62rem',
              letterSpacing: '0.2em',
              cursor:        'pointer',
              textTransform: 'uppercase',
              fontFamily:    'Montserrat, sans-serif',
              transition:    'all 0.3s',
            }}
          >
            {cat === '' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px', marginTop: '5rem',
        }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{
              aspectRatio: '3/4',
              background: 'rgba(255,255,255,0.04)',
            }} />
          ))}
        </div>
      )}

      {/* Models Grid */}
      {!loading && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px', marginTop: '5rem',
        }}>
          {models.map((model, index) => {
            const imgUrl = model.images?.find(i => i.isPrimary)?.url
              || model.images?.[0]?.url
              || 'https://wallpaperaccess.com/full/4079873.jpg';

            return (
              <ModelCard key={model._id} model={model} imgUrl={imgUrl} index={index} />
            );
          })}

          {models.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              No models in this category.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

const ModelCard = ({ model, imgUrl, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:     'relative',
        aspectRatio:  '3/4',
        overflow:     'hidden',
        cursor:       'pointer',
      }}
    >
      <img
        src={imgUrl}
        alt={model.name}
        loading="lazy"
        style={{
          width:      '100%',
          height:     '100%',
          objectFit:  'cover',
          transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
          transform:  hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      />

      {/* Gradient Overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%)',
        display:    'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding:    '2rem',
      }}>
        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontSize:   '1.6rem',
          fontWeight: 400,
          color:      '#fff',
          marginBottom: '0.3rem',
        }}>
          {model.name}
        </p>
        <p style={{
          fontSize:      '0.6rem',
          letterSpacing: '0.3em',
          color:         'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
        }}>
          {model.tagline}
        </p>
        {model.price?.base && (
          <p style={{
            fontSize:      '0.65rem',
            letterSpacing: '0.15em',
            color:         'rgba(255,255,255,0.4)',
            marginTop:     '0.5rem',
          }}>
            From £{model.price.base.toLocaleString()}
          </p>
        )}
      </div>

      {/* Arrow Icon */}
      <div style={{
        position:   'absolute',
        top:        '1.5rem',
        right:      '1.5rem',
        width:      '36px',
        height:     '36px',
        border:     '0.5px solid rgba(255,255,255,0.2)',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:    hovered ? 1 : 0,
        transform:  hovered ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 7l10 10M17 7v10H7"/>
        </svg>
      </div>
    </motion.div>
  );
};

export default ModelsGrid;