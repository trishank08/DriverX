import { useState } from 'react';
import Navbar      from './components/Navbar';
import MenuOverlay from './components/MenuOverlay';
import Hero        from './components/Hero';
import ModelsGrid  from './components/ModelsGrid';
import Newsletter  from './components/Newsletter';
import Footer      from './components/Footer';
import './index.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        onMenuClick={() => setMenuOpen(prev => !prev)}
        menuOpen={menuOpen}
      />

      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main>
        <Hero />
        <ModelsGrid />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}

export default App;