import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Vote, FileText, Zap, X, Key, AlertCircle, ExternalLink, Lock, CheckCircle, RefreshCw } from 'lucide-react';
import { syncWithOpenFootball, syncWithAPIFootball, getAPICooldownRemaining } from '../services/apiService';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'api-sports' | 'openfootball'>('api-sports');
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('wc2026_apisports_key') || '');
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  // Keep track of the live cooldown countdown
  useEffect(() => {
    if (!isSyncModalOpen) return;
    
    setCooldownRemaining(getAPICooldownRemaining());

    const timer = setInterval(() => {
      const remaining = getAPICooldownRemaining();
      setCooldownRemaining(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSyncModalOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSync = async () => {
    setSyncStatus('syncing');
    setSyncMessage('Veriler indiriliyor ve yerel veritabanı güncelleniyor. Lütfen bekleyin...');
    
    if (selectedProvider === 'api-sports') {
      const result = await syncWithAPIFootball(apiKeyInput);
      if (result.success) {
        setSyncStatus('success');
        setSyncMessage(result.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setSyncStatus('error');
        setSyncMessage(result.message);
      }
    } else {
      const success = await syncWithOpenFootball();
      if (success) {
        setSyncStatus('success');
        setSyncMessage('Tebrikler! 2026 Dünya Kupası resmi grupları ve güncel maç skorları OpenFootball API üzerinden canlı olarak çekildi ve başarıyla işlendi.');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setSyncStatus('error');
        setSyncMessage('OpenFootball verileri çekilirken bir hata oluştu. Lütfen bağlantınızı kontrol edin.');
      }
    }
  };

  const isKeyChanged = apiKeyInput !== (localStorage.getItem('wc2026_apisports_key') || '');
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
          gap: '0.5rem',
          alignItems: 'center',
          flexWrap: 'wrap'
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

          <button
            onClick={() => setActiveTab('coupons')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: '1px solid transparent',
              background: activeTab === 'coupons' ? 'rgba(15, 169, 88, 0.15)' : 'transparent',
              color: activeTab === 'coupons' ? '#0fa958' : '#9ca3af',
              borderColor: activeTab === 'coupons' ? 'rgba(15, 169, 88, 0.3)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FileText size={16} />
            Kuponlarım
          </button>

          <button
            onClick={() => {
              setSyncStatus('idle');
              setSyncMessage('');
              setIsSyncModalOpen(true);
            }}
            className="btn-gold animate-pulse-gold"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              animation: 'pulse-gold 2s infinite',
              marginLeft: '0.5rem'
            }}
          >
            <Zap size={16} />
            Canlı Veriyi Çek (API)
          </button>
        </nav>
      </div>

      {/* Custom Sync Modal */}
      {isSyncModalOpen && (
        <div className="modal-overlay" onClick={() => {
          if (syncStatus !== 'syncing') setIsSyncModalOpen(false);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={18} color="#dfa324" />
                Canlı Verileri Eşitle
              </h3>
              <button 
                onClick={() => setIsSyncModalOpen(false)}
                disabled={syncStatus === 'syncing'}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Provider Tabs */}
            <div className="modal-tabs">
              <button 
                className={`modal-tab-btn ${selectedProvider === 'api-sports' ? 'active' : ''}`}
                onClick={() => {
                  if (syncStatus !== 'syncing') {
                    setSelectedProvider('api-sports');
                    setSyncStatus('idle');
                    setSyncMessage('');
                  }
                }}
              >
                API-Sports (API-Football)
              </button>
              <button 
                className={`modal-tab-btn ${selectedProvider === 'openfootball' ? 'active' : ''}`}
                onClick={() => {
                  if (syncStatus !== 'syncing') {
                    setSelectedProvider('openfootball');
                    setSyncStatus('idle');
                    setSyncMessage('');
                  }
                }}
              >
                OpenFootball (Ücretsiz)
              </button>
            </div>

            {/* Tab Body */}
            {selectedProvider === 'api-sports' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.5' }}>
                  API-Sports, 2026 Dünya Kupası canlı skorlarını, anlık maç olaylarını (gol, kart, oyuncu değişikliği) ve kadro bilgilerini sağlar.
                </p>

                {/* Key Input Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Key size={14} color="#0fa958" />
                    API Anahtarınız (x-apisports-key)
                  </label>
                  <input 
                    type="password"
                    placeholder="API Anahtarınızı girin..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    disabled={syncStatus === 'syncing'}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(15, 169, 88, 0.2)',
                      background: 'rgba(5, 8, 7, 0.8)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>

                {/* Cooldown Display */}
                {cooldownRemaining > 0 && !isKeyChanged && (
                  <div style={{
                    background: 'rgba(223, 163, 36, 0.08)',
                    border: '1px solid rgba(223, 163, 36, 0.25)',
                    borderRadius: '12px',
                    padding: '0.8rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#dfa324', fontWeight: 600 }}>
                      <Lock size={14} />
                      <span>Kota Koruma Kilidi Aktif</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: '1.4' }}>
                      Ücretsiz paket limitinizi korumak için (saatte en fazla 2 istek) 30 dakikalık kota bekleme süresi uygulanır.
                    </p>
                    <div style={{ fontSize: '0.85rem', color: '#dfa324', fontWeight: 700, marginTop: '0.2rem' }}>
                      Kalan Süre: <span style={{ fontFamily: 'monospace', fontSize: '1rem' }}>{formatTime(cooldownRemaining)}</span>
                    </div>
                  </div>
                )}

                {/* Info and Registration Link */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                  <span style={{ color: '#9ca3af' }}>Hesabınız yok mu?</span>
                  <a 
                    href="https://dashboard.api-football.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#0fa958', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}
                  >
                    Ücretsiz Kayıt Ol & Key Al
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.5' }}>
                  OpenFootball entegrasyonu tamamen ücretsiz ve anahtarsızdır. GitHub veritabanından grupları ve tamamlanmış maç skorlarını sisteme aktarır.
                </p>
                <div style={{
                  background: 'rgba(15, 169, 88, 0.05)',
                  border: '1px solid rgba(15, 169, 88, 0.15)',
                  borderRadius: '12px',
                  padding: '0.8rem 1rem',
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  lineHeight: '1.4'
                }}>
                  <strong>Avantajı:</strong> Hızlıdır, kota sınırı veya anahtar gereksinimi yoktur.<br/>
                  <strong>Dezavantajı:</strong> Canlı anlık gol bildirimleri veya kadrolar sunmaz.
                </div>
              </div>
            )}

            {/* Sync Messages */}
            {syncMessage && (
              <div style={{
                marginTop: '1.25rem',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                background: syncStatus === 'success' ? 'rgba(15, 169, 88, 0.08)' : syncStatus === 'error' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${syncStatus === 'success' ? 'rgba(15, 169, 88, 0.2)' : syncStatus === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
                color: syncStatus === 'success' ? '#0fa958' : syncStatus === 'error' ? '#ef4444' : '#f3f4f6',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                lineHeight: '1.4'
              }}>
                {syncStatus === 'success' ? (
                  <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#0fa958' }} />
                ) : (
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px', color: syncStatus === 'error' ? '#ef4444' : '#dfa324' }} />
                )}
                <span>{syncMessage}</span>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button
                className="btn-secondary"
                onClick={() => setIsSyncModalOpen(false)}
                disabled={syncStatus === 'syncing'}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Kapat
              </button>

              <button
                className="btn-primary"
                onClick={handleSync}
                disabled={
                  syncStatus === 'syncing' || 
                  (selectedProvider === 'api-sports' && (!apiKeyInput || (cooldownRemaining > 0 && !isKeyChanged)))
                }
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  opacity: (syncStatus === 'syncing' || (selectedProvider === 'api-sports' && (!apiKeyInput || (cooldownRemaining > 0 && !isKeyChanged)))) ? 0.5 : 1,
                  cursor: (syncStatus === 'syncing' || (selectedProvider === 'api-sports' && (!apiKeyInput || (cooldownRemaining > 0 && !isKeyChanged)))) ? 'not-allowed' : 'pointer'
                }}
              >
                {syncStatus === 'syncing' && <RefreshCw size={14} className="animate-spin" style={{ animation: 'spin 1.5s linear infinite' }} />}
                {syncStatus === 'syncing' ? 'Eşitleniyor...' : 'Şimdi Eşitle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
