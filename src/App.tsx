import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeOrbit } from './components/HomeOrbit';
import { Groups } from './components/Groups';
import { PredictionGame } from './components/PredictionGame';
import { Trophy, Globe } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeOrbit 
            onSelectGroup={setSelectedGroup} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'groups':
        return (
          <Groups 
            selectedGroup={selectedGroup} 
            setSelectedGroup={setSelectedGroup} 
          />
        );
      case 'predictions':
        return <PredictionGame />;
      default:
        return (
          <HomeOrbit 
            onSelectGroup={setSelectedGroup} 
            setActiveTab={setActiveTab} 
          />
        );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Sticky Top Header & Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Content */}
      <main style={{
        flex: 1,
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(5, 8, 7, 0.9)',
        borderTop: '1px solid rgba(15, 169, 88, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem 1rem',
        marginTop: '4rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          {/* Logo & Slogan */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={18} color="#dfa324" />
            <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.95rem', letterSpacing: '1px' }}>
              FIFA DÜNYA KUPASI 2026
            </span>
          </div>

          <p style={{
            fontSize: '0.8rem',
            color: '#9ca3af',
            maxWidth: '500px',
            lineHeight: 1.6
          }}>
            Bu web sitesi 2026 FIFA Dünya Kupası heyecanını taraftarlarla buluşturmak için tasarlanmış bağımsız bir interaktif rehberdir. Tüm ülke logoları, bayrakları ve marka hakları sahiplerine aittir.
          </p>

          <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.05)', width: '100%', maxWidth: '300px' }} />

          {/* Copyright & Social */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#9ca3af'
          }}>
            <span>Tasarım ve Geliştirme © {new Date().getFullYear()}</span>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="#github" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#9ca3af', textDecoration: 'none' }}>
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
              <a href="#fifa" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#9ca3af', textDecoration: 'none' }}>
                <Globe size={12} />
                <span>FIFA Resmi Sitesi</span>
              </a>
            </div>
            <span>Antigravity AI tarafından pair programming ile geliştirilmiştir.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
