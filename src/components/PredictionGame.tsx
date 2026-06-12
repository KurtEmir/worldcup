import React, { useState, useEffect, useRef } from 'react';
import { getStoredTeams, initialVotes, Team } from '../data/worldcupData';
import { Vote, Search, RotateCcw, Play, Square, Award, Users } from 'lucide-react';

export const PredictionGame: React.FC = () => {
  const teams = getStoredTeams();
  const [userVote, setUserVote] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const simInterval = useRef<any>(null);

  // Initialize from LocalStorage or seeded data
  useEffect(() => {
    const savedVote = localStorage.getItem('wc2026_user_vote');
    const savedVotes = localStorage.getItem('wc2026_poll_votes');
    
    if (savedVote) {
      setUserVote(savedVote);
    }
    
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    } else {
      // Seed with initial votes, adding 0 for teams not in the seed dictionary
      const seeded: Record<string, number> = {};
      teams.forEach(team => {
        seeded[team.id] = initialVotes[team.id] || Math.floor(Math.random() * 100) + 10;
      });
      setVotes(seeded);
      localStorage.setItem('wc2026_poll_votes', JSON.stringify(seeded));
    }
  }, []);

  // Handle simulation
  useEffect(() => {
    if (isSimulating) {
      simInterval.current = setInterval(() => {
        setVotes(prevVotes => {
          const updated = { ...prevVotes };
          // Pick a random team to vote for
          // Give higher weight to popular teams for realistic growth
          const rand = Math.random();
          let chosenId = 'turkey';

          if (rand < 0.15) chosenId = 'turkey';
          else if (rand < 0.28) chosenId = 'argentina';
          else if (rand < 0.40) chosenId = 'brazil';
          else if (rand < 0.52) chosenId = 'france';
          else if (rand < 0.62) chosenId = 'spain';
          else if (rand < 0.70) chosenId = 'germany';
          else if (rand < 0.77) chosenId = 'england';
          else if (rand < 0.83) chosenId = 'portugal';
          else {
            // Pick completely random team from all 48
            const randomIndex = Math.floor(Math.random() * teams.length);
            chosenId = teams[randomIndex].id;
          }

          updated[chosenId] = (updated[chosenId] || 0) + Math.floor(Math.random() * 4) + 1;
          localStorage.setItem('wc2026_poll_votes', JSON.stringify(updated));
          return updated;
        });
      }, 150);
    } else {
      if (simInterval.current) {
        clearInterval(simInterval.current);
      }
    }

    return () => {
      if (simInterval.current) {
        clearInterval(simInterval.current);
      }
    };
  }, [isSimulating]);

  const handleVoteSubmit = (teamId: string) => {
    setUserVote(teamId);
    localStorage.setItem('wc2026_user_vote', teamId);

    setVotes(prev => {
      const updated = { ...prev };
      updated[teamId] = (updated[teamId] || 0) + 1;
      localStorage.setItem('wc2026_poll_votes', JSON.stringify(updated));
      return updated;
    });
  };

  const handleReset = () => {
    if (window.confirm('Tahmininizi sıfırlamak istediğinize emin misiniz?')) {
      setIsSimulating(false);
      localStorage.removeItem('wc2026_user_vote');
      setUserVote(null);

      // Re-seed original votes
      const seeded: Record<string, number> = {};
      teams.forEach(team => {
        seeded[team.id] = initialVotes[team.id] || Math.floor(Math.random() * 100) + 10;
      });
      setVotes(seeded);
      localStorage.setItem('wc2026_poll_votes', JSON.stringify(seeded));
    }
  };

  // Calculations
  const totalVotes = Object.values(votes).reduce((sum, val) => sum + val, 0);

  const sortedResults = Object.entries(votes)
    .map(([id, count]) => {
      const team = teams.find(t => t.id === id) as Team;
      const pct = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
      return { team, count, pct };
    })
    .sort((a, b) => b.count - a.count);

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Tahmin Oyunu
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
          Sizce 2026 yılında şampiyonluk kupasını hangi ülke kaldıracak? Oyunuzu kullanın ve dünya genelindeki oyların dağılımını canlı olarak izleyin!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }} className="prediction-grid">
        <style>{`
          @media (min-width: 992px) {
            .prediction-grid {
              grid-template-columns: ${!userVote ? '0.9fr 1.1fr' : '1fr'};
            }
          }
          .team-vote-btn {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .team-vote-btn:hover {
            background: rgba(15, 169, 88, 0.1);
            border-color: rgba(15, 169, 88, 0.4);
            transform: translateY(-2px);
          }
          .progress-bar-container {
            width: 100%;
            height: 12px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            overflow: hidden;
            margin-top: 0.5rem;
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .progress-bar-fill {
            height: 100%;
            border-radius: 6px;
            transition: width 0.8s cubic-bezier(0.1, 0.8, 0.2, 1);
          }
          .sim-indicator {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            background: rgba(239, 68, 68, 0.15);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.25);
            animation: pulse-glow-red 2s infinite;
          }
          @keyframes pulse-glow-red {
            0%, 100% { opacity: 0.8; box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
            50% { opacity: 1; box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
          }
        `}</style>

        {/* Voting Panel (Only shown if not voted yet) */}
        {!userVote && (
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Vote size={20} color="#0fa958" />
              Şampiyonluk Oyunuzu Kullanın
            </h3>

            {/* Search Box */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px' }} />
              <input
                type="text"
                placeholder="Ülke ara (örn. Türkiye, Brezilya...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0d1813',
                  border: '1px solid var(--card-border)',
                  color: '#ffffff',
                  padding: '0.8rem 1rem 0.8rem 2.5rem',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            {/* Scrollable list of teams */}
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              paddingRight: '0.25rem'
            }}>
              {filteredTeams.length > 0 ? (
                filteredTeams.map(team => (
                  <div
                    key={team.id}
                    className="team-vote-btn"
                    onClick={() => handleVoteSubmit(team.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.75rem' }}>{team.flag}</span>
                      <div>
                        <p style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.95rem' }}>{team.name}</p>
                        <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>FIFA Rank: #{team.fifaRank} | Grup {team.group}</p>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#0fa958',
                      fontWeight: 700,
                      background: 'rgba(15, 169, 88, 0.1)',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(15, 169, 88, 0.2)'
                    }}>
                      Seç ve Oy Ver
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
                  Arama kriterlerine uygun qualified takım bulunamadı.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Results Panel */}
        <div className="glass-panel" style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          gridColumn: userVote ? 'span 2' : 'auto'
        }}>
          {/* Header & Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            paddingBottom: '1rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Award size={20} color="#dfa324" />
                Güncel Oylama Sonuçları
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                Toplam kullanılan oy: <span style={{ color: '#ffffff', fontWeight: 700 }}>{totalVotes.toLocaleString()}</span>
              </p>
            </div>

            {/* Simulation controls */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {isSimulating && (
                <div className="sim-indicator">
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    display: 'inline-block'
                  }}></span>
                  CANLI AKIŞ
                </div>
              )}

              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={isSimulating ? 'btn-secondary' : 'btn-primary'}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: 'none'
                }}
              >
                {isSimulating ? <Square size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" />}
                {isSimulating ? 'Simülasyonu Durdur' : 'Oy Simüle Et'}
              </button>

              {userVote && (
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Tahmini Sıfırla"
                >
                  <RotateCcw size={16} />
                </button>
              )}
            </div>
          </div>

          {/* User's Choice Banner */}
          {userVote && (
            <div style={{
              background: 'rgba(15, 169, 88, 0.1)',
              border: '1px solid rgba(15, 169, 88, 0.25)',
              padding: '1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }} className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>
                  {teams.find(t => t.id === userVote)?.flag}
                </span>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 500 }}>TAHMİNİNİZ</p>
                  <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                    {teams.find(t => t.id === userVote)?.name} şampiyon olur!
                  </p>
                </div>
              </div>
              <div style={{
                background: '#dfa324',
                color: '#050807',
                fontWeight: 800,
                fontSize: '0.7rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '20px',
                letterSpacing: '1px'
              }}>
                KAYDEDİLDİ
              </div>
            </div>
          )}

          {/* Top 8 Results Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {sortedResults.slice(0, 8).map((result, idx) => {
              // Custom colors for ranks
              let barColor = 'linear-gradient(90deg, #dfa324 0%, #ffdf7a 100%)'; // Gold for 1st
              let glowColor = 'rgba(223, 163, 36, 0.3)';

              if (idx === 1 || idx === 2) {
                barColor = 'linear-gradient(90deg, #0fa958 0%, #00d2ff 100%)'; // Green/Blue for 2nd/3rd
                glowColor = 'rgba(15, 169, 88, 0.3)';
              } else if (idx > 2) {
                barColor = 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.4) 100%)';
                glowColor = 'rgba(255, 255, 255, 0.05)';
              }

              const isUserChoice = userVote === result.team.id;

              return (
                <div
                  key={result.team.id}
                  style={{
                    background: isUserChoice ? 'rgba(15, 169, 88, 0.04)' : 'transparent',
                    border: isUserChoice ? '1px solid rgba(15, 169, 88, 0.15)' : '1px solid transparent',
                    padding: isUserChoice ? '0.75rem 1rem' : '0',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.95rem'
                  }}>
                    {/* Country Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{
                        width: '24px',
                        fontWeight: 800,
                        color: idx === 0 ? '#dfa324' : idx < 3 ? '#0fa958' : '#9ca3af',
                        textAlign: 'center'
                      }}>
                        #{idx + 1}
                      </span>
                      <span style={{ fontSize: '1.4rem' }}>{result.team.flag}</span>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>
                        {result.team.name}
                      </span>
                      {isUserChoice && (
                        <span style={{
                          fontSize: '0.65rem',
                          background: 'rgba(15, 169, 88, 0.2)',
                          color: '#0fa958',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                          fontWeight: 700
                        }}>
                          Sizin Oyunuz
                        </span>
                      )}
                    </div>

                    {/* Vote counts & percentage */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 800, color: '#ffffff' }}>
                        %{result.pct.toFixed(1)}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginLeft: '0.5rem' }}>
                        ({result.count.toLocaleString()} oy)
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${result.pct}%`,
                        background: barColor,
                        boxShadow: `0 0 10px ${glowColor}`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <hr style={{ border: 'none', height: '1px', background: 'rgba(255, 255, 255, 0.05)', margin: '0.5rem 0' }} />

          {/* Footnote information */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#9ca3af',
            fontSize: '0.8rem',
            background: 'rgba(255,255,255,0.01)',
            padding: '0.75rem',
            borderRadius: '10px'
          }}>
            <Users size={16} color="#0fa958" />
            <span>Simülasyon modunu aktif hale getirerek, dünya çapındaki diğer taraftarların canlı veri akışıyla oylama yapmasını simüle edebilir, grafikleri canlı izleyebilirsiniz.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
