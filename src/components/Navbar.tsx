import React from 'react';
import { Trophy, Calendar, Vote } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      padding: '1rem 2rem',
      background: 'rgba(5, 8, 7, 0.75)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(15, 169, 88, 0.15)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #dfa324 0%, #ffd700 100%)',
            padding: '0.5rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(223, 163, 36, 0.4)'
          }}>
            <Trophy size={20} color="#050807" strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #a2a8ab 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
            }}>
              DÜNYA KUPASI <span style={{ color: '#dfa324' }}>2026</span>
            </h1>
            <p style={{
              fontSize: '0.65rem',
              color: '#0fa958',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              Kuzey Amerika Serüveni
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: '1px solid transparent',
              background: activeTab === 'home' ? 'rgba(15, 169, 88, 0.15)' : 'transparent',
              color: activeTab === 'home' ? '#0fa958' : '#9ca3af',
              borderColor: activeTab === 'home' ? 'rgba(15, 169, 88, 0.3)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Trophy size={16} />
            Ana Sayfa
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: '1px solid transparent',
              background: activeTab === 'groups' ? 'rgba(15, 169, 88, 0.15)' : 'transparent',
              color: activeTab === 'groups' ? '#0fa958' : '#9ca3af',
              borderColor: activeTab === 'groups' ? 'rgba(15, 169, 88, 0.3)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Calendar size={16} />
            Grup Aşaması
          </button>

          <button
            onClick={() => setActiveTab('predictions')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: '1px solid transparent',
              background: activeTab === 'predictions' ? 'rgba(15, 169, 88, 0.15)' : 'transparent',
              color: activeTab === 'predictions' ? '#0fa958' : '#9ca3af',
              borderColor: activeTab === 'predictions' ? 'rgba(15, 169, 88, 0.3)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Vote size={16} />
            Tahmin Oyunu
          </button>
        </nav>
      </div>
    </header>
  );
};
