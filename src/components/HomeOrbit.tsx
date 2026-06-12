import React, { useState } from 'react';
import { getStoredTeams, Team } from '../data/worldcupData';
import { ArrowRight, Trophy, Users, X } from 'lucide-react';

interface HomeOrbitProps {
  onSelectGroup: (groupName: string) => void;
  setActiveTab: (tab: string) => void;
}

// 16 teams featured in the visual orbit
const FEATURED_TEAM_IDS = [
  'turkey', 'argentina', 'brazil', 'france',
  'spain', 'germany', 'portugal', 'england',
  'netherlands', 'italy', 'morocco', 'japan',
  'usa', 'mexico', 'canada', 'uruguay'
];

export const HomeOrbit: React.FC<HomeOrbitProps> = ({ onSelectGroup, setActiveTab }) => {
  const teams = getStoredTeams();
  const [hoveredTeam, setHoveredTeam] = useState<Team | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const featuredTeams = teams.filter(t => FEATURED_TEAM_IDS.includes(t.id));
  const activeTeam = hoveredTeam || selectedTeam;

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
    setHoveredTeam(null);
  };

  const handleGoToGroup = (groupName: string) => {
    onSelectGroup(groupName);
    setActiveTab('groups');
  };

  return (
    <section className="animate-fade-in" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem'
    }}>
      {/* Hero Header */}
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <span style={{
          color: '#dfa324',
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          FIFA Dünya Kupası 2026 Başlıyor
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          color: '#ffffff'
        }}>
          Kuzey Amerika\'da <span style={{
            background: 'linear-gradient(135deg, #0fa958 0%, #00d2ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Tarihi Heyecan</span>
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: '#9ca3af',
          lineHeight: 1.6
        }}>
          Tarihte ilk kez 48 takımın katılımıyla ABD, Kanada ve Meksika\'nın ortaklaşa düzenlediği dev turnuvanın nabzını tutun. Takımları keşfedin, grupları analiz edin ve şampiyonluk tahmininizi yapın!
        </p>
      </div>

      {/* Center Layout: Orbit + Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        alignItems: 'center',
        gap: '3rem',
        minHeight: '620px'
      }} className="orbit-main-grid">
        <style>{`
          @media (min-width: 1024px) {
            .orbit-main-grid {
              grid-template-columns: 1.2fr 0.8fr;
            }
          }
          .orbit-container-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 520px;
            width: 100%;
            overflow: visible;
          }
          .orbit-trophy-img {
            width: 180px;
            height: 180px;
            object-fit: cover;
            border-radius: 50%;
            box-shadow: 0 0 40px rgba(15, 169, 88, 0.4), 0 0 80px rgba(223, 163, 36, 0.2);
            border: 3px solid rgba(223, 163, 36, 0.6);
            transition: all 0.5s ease;
            z-index: 10;
          }
          .orbit-trophy-img:hover {
            transform: scale(1.05);
            box-shadow: 0 0 60px rgba(15, 169, 88, 0.6), 0 0 100px rgba(223, 163, 36, 0.4);
          }
          .orbit-item {
            position: absolute;
            left: 50%;
            top: 50%;
            --orbit-radius: 130px;
            transform: translate(-50%, -50%) rotate(calc(var(--angle) * 1deg)) translate(var(--orbit-radius)) rotate(calc(var(--angle) * -1deg));
            transition: all 0.3s ease;
            cursor: pointer;
            z-index: 5;
          }
          @media (min-width: 480px) {
            .orbit-item {
              --orbit-radius: 170px;
            }
            .orbit-trophy-img {
              width: 220px;
              height: 220px;
            }
            .orbit-container-wrapper {
              height: 560px;
            }
          }
          @media (min-width: 768px) {
            .orbit-item {
              --orbit-radius: 230px;
            }
            .orbit-trophy-img {
              width: 260px;
              height: 260px;
            }
            .orbit-container-wrapper {
              height: 600px;
            }
          }
          .badge-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            background: rgba(13, 24, 19, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(15, 169, 88, 0.3);
            color: #ffffff;
            font-size: 0.8rem;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
          }
          .badge-btn:hover {
            background: rgba(15, 169, 88, 0.2);
            border-color: #0fa958;
            box-shadow: 0 0 15px rgba(15, 169, 88, 0.6);
            transform: scale(1.15);
          }
          .badge-btn.active-badge {
            background: rgba(223, 163, 36, 0.2);
            border-color: #dfa324;
            box-shadow: 0 0 15px rgba(223, 163, 36, 0.6);
          }
        `}</style>

        {/* Orbit Visualization (Left on desktop) */}
        <div 
          className="orbit-container-wrapper"
        >
          {/* Central Trophy */}
          <div style={{
            position: 'absolute',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/worldcup_trophy_2026.png" 
              alt="World Cup Trophy" 
              className="orbit-trophy-img"
              style={{
                animation: 'pulse-gold 4s ease-in-out infinite'
              }}
            />
          </div>

          {/* Rotating Ring */}
          <div 
            className={`orbit-spin-clockwise ${isPaused ? 'orbit-paused' : ''}`}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {featuredTeams.map((team, index) => {
              const angle = (index * 360) / featuredTeams.length;
              const isActive = activeTeam?.id === team.id;
              return (
                <div
                  key={team.id}
                  className="orbit-item"
                  style={{ '--angle': angle } as React.CSSProperties}
                  onMouseEnter={() => {
                    setHoveredTeam(team);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredTeam(null);
                    setIsPaused(false);
                  }}
                  onClick={() => handleTeamClick(team)}
                >
                  {/* Counter-rotating badge so label remains upright */}
                  <div className={`orbit-spin-counter ${isPaused ? 'orbit-paused' : ''}`}>
                    <div className={`badge-btn ${isActive ? 'active-badge' : ''}`}>
                      <span style={{ fontSize: '1.1rem' }}>{team.flag}</span>
                      <span>{team.code}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Card (Right on desktop) */}
        <div className="glass-panel" style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '380px',
          position: 'relative'
        }}>
          {activeTeam ? (
            <div className="animate-fade-in" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              {/* Card Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>{activeTeam.flag}</span>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                      {activeTeam.name}
                    </h3>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(15, 169, 88, 0.2)',
                      border: '1px solid rgba(15, 169, 88, 0.3)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#0fa958',
                      marginTop: '0.25rem'
                    }}>
                      Grup {activeTeam.group}
                    </span>
                  </div>
                </div>
                {selectedTeam && (
                  <button 
                    onClick={() => setSelectedTeam(null)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <hr style={{ border: 'none', height: '1px', background: 'rgba(255, 255, 255, 0.1)' }} />

              {/* Card Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.04)'
                }}>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>FIFA SIRALAMASI</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dfa324' }}>#{activeTeam.fifaRank}</p>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.04)'
                }}>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>YILDIZ OYUNCU</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {activeTeam.keyPlayer}
                  </p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500, marginBottom: '0.25rem' }}>TEKNİK DİREKTÖR</p>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>{activeTeam.coach}</p>
              </div>

              <div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500, marginBottom: '0.25rem' }}>TAKIM ANALİZİ</p>
                <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: 1.5 }}>{activeTeam.description}</p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleGoToGroup(activeTeam.group)}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  marginTop: '0.5rem',
                  fontSize: '0.95rem'
                }}
              >
                Grup Detayları & Maç Takvimi
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              color: '#9ca3af',
              padding: '1.5rem'
            }}>
              <Trophy size={48} color="#dfa324" style={{ filter: 'drop-shadow(0 0 10px rgba(223,163,36,0.3))' }} />
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Takım Detayları
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.5, maxWidth: '320px' }}>
                  Detaylı analiz, yıldız oyuncular ve teknik kadro bilgilerini görmek için yörüngede dönen ülkelerin üzerine gelin veya tıklayın.
                </p>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                background: 'rgba(15, 169, 88, 0.1)',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                color: '#0fa958',
                border: '1px solid rgba(15, 169, 88, 0.2)'
              }}>
                <Users size={12} />
                <span>İpucu: Yörüngeyi durdurmak için imleci üzerinde tutun!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Button to Show All 48 Teams */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={() => setShowAllTeams(!showAllTeams)}
          className="btn-secondary"
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '12px',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {showAllTeams ? 'Katılan Takımlar Listesini Kapat' : 'Katılan Tüm Takımları Gör (48 Ülke)'}
        </button>
      </div>

      {/* 48 Teams Grid Display */}
      {showAllTeams && (
        <div className="glass-panel animate-fade-in" style={{
          padding: '2.5rem',
          marginTop: '1rem',
          border: '1px solid rgba(15, 169, 88, 0.25)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            Kupaya Katılan <span style={{ color: '#0fa958' }}>48 Ülke</span>
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '1rem'
          }}>
            {teams.map(team => (
              <div
                key={team.id}
                onClick={() => {
                  setSelectedTeam(team);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                style={{
                  background: activeTeam?.id === team.id ? 'rgba(223, 163, 36, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: activeTeam?.id === team.id ? '1px solid #dfa324' : '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={() => setHoveredTeam(team)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <span style={{ fontSize: '2rem' }}>{team.flag}</span>
                <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem' }}>{team.name}</span>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#9ca3af',
                  fontWeight: 500,
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px'
                }}>
                  Grup {team.group}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
