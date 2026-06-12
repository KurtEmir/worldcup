import React, { useState, useEffect } from 'react';
import { Match, Team, getStoredTeams } from '../data/worldcupData';
import { getStoredMatches } from '../services/apiService';
import { Check, Copy, Share2, Trash2, Users, FileText, CheckCircle, XCircle } from 'lucide-react';

interface CouponBuilderProps {
  compareCode: string | null;
  onClearCompareCode: () => void;
}

export const CouponBuilder: React.FC<CouponBuilderProps> = ({ compareCode, onClearCompareCode }) => {
  const teams = getStoredTeams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Record<string, string>>({}); // { matchId: '1' | 'X' | '2' }
  const [friendPredictions, setFriendPredictions] = useState<Record<string, string> | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedMatches = getStoredMatches();
    setMatches(storedMatches);

    // Load saved predictions
    const saved = localStorage.getItem('wc2026_coupon_predictions');
    if (saved) {
      setPredictions(JSON.parse(saved));
    }

    // Process comparison code if present
    if (compareCode) {
      try {
        const decoded = JSON.parse(atob(compareCode));
        setFriendPredictions(decoded);
      } catch (e) {
        console.error('Invalid comparison code', e);
        alert('Geçersiz karşılaştırma kodu!');
        onClearCompareCode();
      }
    } else {
      setFriendPredictions(null);
    }
  }, [compareCode]);

  // Handle prediction choice
  const handlePredict = (matchId: string, choice: string) => {
    setPredictions(prev => {
      const updated = { ...prev };
      if (updated[matchId] === choice) {
        delete updated[matchId]; // Deselect
      } else {
        updated[matchId] = choice;
      }
      localStorage.setItem('wc2026_coupon_predictions', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClear = () => {
    if (window.confirm('Kuponunuzdaki tüm tahminleri temizlemek istiyor musunuz?')) {
      setPredictions({});
      localStorage.removeItem('wc2026_coupon_predictions');
    }
  };

  const handleGenerateShareLink = () => {
    if (Object.keys(predictions).length === 0) {
      alert('Paylaşmak için en az bir tahmin yapmalısınız!');
      return;
    }
    const code = btoa(JSON.stringify(predictions));
    const url = `${window.location.origin}${window.location.pathname}?compare=${code}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Match outcome checker helper
  const getMatchOutcome = (match: Match): string => {
    if (match.status !== 'played' || match.homeScore === undefined || match.awayScore === undefined) {
      return '';
    }
    if (match.homeScore > match.awayScore) return '1';
    if (match.homeScore < match.awayScore) return '2';
    return 'X';
  };

  // Calculate scores
  const getScoreSummary = () => {
    let myCorrect = 0;
    let friendCorrect = 0;
    let myTotalGuessedMatches = 0;
    let friendTotalGuessedMatches = 0;
    let playedCount = 0;

    matches.forEach(match => {
      const outcome = getMatchOutcome(match);
      if (outcome) {
        playedCount += 1;
        if (predictions[match.id]) {
          myTotalGuessedMatches += 1;
          if (predictions[match.id] === outcome) myCorrect += 1;
        }
        if (friendPredictions && friendPredictions[match.id]) {
          friendTotalGuessedMatches += 1;
          if (friendPredictions[match.id] === outcome) friendCorrect += 1;
        }
      }
    });

    return { myCorrect, friendCorrect, myTotalGuessedMatches, friendTotalGuessedMatches, playedCount };
  };

  const scores = getScoreSummary();
  const sortedMatches = [...matches].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <section className="animate-fade-in" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
          {friendPredictions ? 'Kupon Karşılaştırma Modu' : 'Tahmin Kuponu Oluştur'}
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          {friendPredictions 
            ? 'Arkadaşınızın kupon tahminleri ile kendi tahminlerinizi canlı maç sonuçlarına göre kıyaslayın.' 
            : 'Turnuvadaki grup aşaması maçlarının sonuçlarını tahmin edin, kuponunuzu kaydedin ve arkadaşlarınızla paylaşın!'
          }
        </p>
      </div>

      {/* Comparison Scoreboard Header */}
      {friendPredictions && (
        <div className="glass-panel" style={{
          padding: '2rem',
          border: '2px solid var(--gold-glow)',
          background: 'rgba(223, 163, 36, 0.08)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          animation: 'pulse-gold 4s infinite'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Users size={22} color="#dfa324" />
            DOĞRULUK SKOR TABLOSU
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'center',
            marginTop: '0.5rem'
          }}>
            <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>SİZİN TAHMİNLERİNİZ</p>
              <h4 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0fa958', marginTop: '0.25rem' }}>
                {scores.myCorrect} <span style={{ fontSize: '1.25rem', color: '#9ca3af', fontWeight: 500 }}>/ {scores.playedCount}</span>
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{Object.keys(predictions).length} maç tahmin edildi</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>ARKADAŞINIZIN TAHMİNLERİ</p>
              <h4 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#dfa324', marginTop: '0.25rem' }}>
                {scores.friendCorrect} <span style={{ fontSize: '1.25rem', color: '#9ca3af', fontWeight: 500 }}>/ {scores.playedCount}</span>
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{Object.keys(friendPredictions).length} maç tahmin edildi</p>
            </div>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <button 
              onClick={onClearCompareCode} 
              className="btn-secondary"
              style={{ padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem' }}
            >
              Karşılaştırma Modundan Çık
            </button>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2.5rem'
      }} className="coupon-main-grid">
        <style>{`
          @media (min-width: 992px) {
            .coupon-main-grid {
              grid-template-columns: 1.3fr 0.7fr;
            }
          }
          .prediction-btn {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: #9ca3af;
            font-weight: 700;
            font-size: 0.85rem;
            width: 44px;
            height: 38px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .prediction-btn:hover {
            border-color: rgba(15, 169, 88, 0.5);
            color: #ffffff;
            background: rgba(15, 169, 88, 0.1);
          }
          .prediction-btn.active-predict {
            background: #0fa958 !important;
            border-color: #0fa958 !important;
            color: #ffffff !important;
            box-shadow: 0 0 10px rgba(15, 169, 88, 0.4);
          }
          .comparison-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border-radius: 6px;
            font-weight: 800;
            font-size: 0.8rem;
          }
          .badge-mine {
            background: rgba(15, 169, 88, 0.15);
            border: 1px solid rgba(15, 169, 88, 0.3);
            color: #0fa958;
          }
          .badge-friend {
            background: rgba(223, 163, 36, 0.15);
            border: 1px solid rgba(223, 163, 36, 0.3);
            color: #dfa324;
          }
          .badge-match {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #ffffff;
          }
        `}</style>

        {/* Prediction Fikstür / Match List (Left) */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            paddingBottom: '0.5rem'
          }}>
            <FileText size={18} color="#0fa958" />
            Maç Tahminleri
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            maxHeight: '600px',
            overflowY: 'auto',
            paddingRight: '0.25rem'
          }}>
            {sortedMatches.map(match => {
              const homeTeam = teams.find(t => t.id === match.homeTeamId) as Team;
              const awayTeam = teams.find(t => t.id === match.awayTeamId) as Team;
              
              const myPrediction = predictions[match.id];
              const friendPrediction = friendPredictions ? friendPredictions[match.id] : null;
              const outcome = getMatchOutcome(match);

              return (
                <div
                  key={match.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  {/* Left Column: Match Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', width: '320px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 500 }}>
                      Grup {match.group} | {match.date}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{homeTeam.flag}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>{homeTeam.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>vs</span>
                      <span style={{ fontSize: '1.25rem' }}>{awayTeam.flag}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>{awayTeam.name}</span>
                    </div>
                  </div>

                  {/* Middle Column: Comparison Results (if active) */}
                  {friendPredictions ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      {/* My guess */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                        <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>Siz</span>
                        <div className={`comparison-badge badge-mine ${myPrediction === outcome && outcome !== '' ? 'active-badge' : ''}`} style={{
                          background: myPrediction ? undefined : 'transparent',
                          borderColor: myPrediction ? undefined : 'rgba(255,255,255,0.05)',
                          color: myPrediction ? undefined : '#4b5563'
                        }}>
                          {myPrediction || '-'}
                        </div>
                      </div>

                      {/* Friend's guess */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                        <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>Arkadaş</span>
                        <div className="comparison-badge badge-friend" style={{
                          background: friendPrediction ? undefined : 'transparent',
                          borderColor: friendPrediction ? undefined : 'rgba(255,255,255,0.05)',
                          color: friendPrediction ? undefined : '#4b5563'
                        }}>
                          {friendPrediction || '-'}
                        </div>
                      </div>

                      {/* Score Result */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                        <span style={{ fontSize: '0.6rem', color: '#9ca3af' }}>Sonuç</span>
                        <div className="comparison-badge badge-match">
                          {match.status === 'played' ? `${match.homeScore}-${match.awayScore}` : '-'}
                        </div>
                      </div>

                      {/* Compare Mark */}
                      <div>
                        {match.status === 'played' ? (
                          <div style={{ display: 'flex', gap: '0.2rem' }}>
                            {myPrediction && (myPrediction === outcome ? <CheckCircle size={18} color="#0fa958" /> : <XCircle size={18} color="#ef4444" />)}
                            {friendPrediction && (friendPrediction === outcome ? <CheckCircle size={18} color="#dfa324" /> : <XCircle size={18} color="#ef4444" />)}
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Bekliyor</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* 1-X-2 Predictions Picker (Normal Mode) */
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => handlePredict(match.id, '1')}
                        className={`prediction-btn ${myPrediction === '1' ? 'active-predict' : ''}`}
                      >
                        1
                      </button>
                      <button
                        onClick={() => handlePredict(match.id, 'X')}
                        className={`prediction-btn ${myPrediction === 'X' ? 'active-predict' : ''}`}
                      >
                        X
                      </button>
                      <button
                        onClick={() => handlePredict(match.id, '2')}
                        className={`prediction-btn ${myPrediction === '2' ? 'active-predict' : ''}`}
                      >
                        2
                      </button>

                      {/* Real Played Result Indicator */}
                      {match.status === 'played' && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '0.5rem',
                          background: 'rgba(255,255,255,0.05)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontSize: '0.8rem',
                          fontWeight: 700
                        }}>
                          <span>Skor: {match.homeScore}-{match.awayScore}</span>
                          <span style={{
                            marginLeft: '0.5rem',
                            color: myPrediction === outcome ? '#0fa958' : '#ef4444',
                            fontWeight: 900
                          }}>
                            {myPrediction ? (myPrediction === outcome ? '✓' : '✗') : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Coupon Info & Actions (Right) */}
        {!friendPredictions && (
          <div className="glass-panel" style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            height: 'fit-content'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              paddingBottom: '0.5rem'
            }}>
              <Share2 size={18} color="#dfa324" />
              Kupon Özeti
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#9ca3af' }}>Toplam Tahmin Edilen Maç:</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>
                  {Object.keys(predictions).length} Maç
                </span>
              </div>
            </div>

            <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.05)' }} />

            {/* Sharing Code */}
            {shareUrl ? (
              <div style={{
                background: 'rgba(15, 169, 88, 0.1)',
                border: '1px solid rgba(15, 169, 88, 0.25)',
                padding: '0.85rem',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <p style={{ fontSize: '0.75rem', color: '#0fa958', fontWeight: 700 }}>PAYLAŞIM LİNKİNİZ HAZIR</p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '6px',
                  padding: '0.4rem',
                  overflow: 'hidden'
                }}>
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      width: '100%',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#0fa958',
                      cursor: 'pointer',
                      padding: '0.2rem'
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <p style={{ fontSize: '0.65rem', color: '#9ca3af' }}>
                  Bu linki kopyalayıp arkadaşlarınıza göndererek tahminlerinizi karşılaştırabilirsiniz!
                </p>
              </div>
            ) : null}

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={handleGenerateShareLink}
                className="btn-gold"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  fontSize: '0.95rem'
                }}
              >
                <Share2 size={16} />
                {copied ? 'Link Kopyalandı!' : 'Kuponu Paylaş & Karşılaştır'}
              </button>

              <button
                onClick={handleClear}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#ef4444'
                }}
              >
                <Trash2 size={16} />
                Kuponu Temizle
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
