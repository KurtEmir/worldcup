import React, { useEffect } from 'react';
import { teams, getTeamsByGroup, getMatchesByGroup, getStandingsByGroup, Team } from '../data/worldcupData';
import { Shield, MapPin, Calendar, Clock, ChevronLeft } from 'lucide-react';

interface GroupsProps {
  selectedGroup: string | null;
  setSelectedGroup: (group: string | null) => void;
}

export const Groups: React.FC<GroupsProps> = ({ selectedGroup, setSelectedGroup }) => {
  const allGroups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  // Scroll to top when group is changed
  useEffect(() => {
    if (selectedGroup) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedGroup]);

  // If no group is selected, show grid of all groups
  if (!selectedGroup) {
    return (
      <section className="animate-fade-in" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Grup Aşaması Puan Durumu
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
            48 takımın kıyasıya mücadele ettiği 12 grubu inceleyin. Puan durumlarını, oynanan maçları ve fikstürü görmek için bir grubun üzerine tıklayın.
          </p>
        </div>

        {/* Groups Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {allGroups.map(groupName => {
            const groupTeams = getTeamsByGroup(groupName);
            // Sort by rank in initialStandings
            const standings = getStandingsByGroup(groupName);
            const sortedTeams = [...groupTeams].sort((a, b) => {
              const standingA = standings.find(s => s.teamId === a.id);
              const standingB = standings.find(s => s.teamId === b.id);
              return (standingB?.points || 0) - (standingA?.points || 0);
            });

            return (
              <div
                key={groupName}
                className="glass-panel"
                onClick={() => setSelectedGroup(groupName)}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  border: '1px solid rgba(15, 169, 88, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingBottom: '0.5rem'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                    {groupName} GRUBU
                  </h3>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#0fa958',
                    fontWeight: 600
                  }}>
                    İncele & Fikstür &rarr;
                  </span>
                </div>

                {/* Team List (Mini Standings) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {sortedTeams.map((team, idx) => {
                    const standing = standings.find(s => s.teamId === team.id);
                    return (
                      <div
                        key={team.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.9rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: idx < 2 ? 'rgba(15, 169, 88, 0.2)' : 'rgba(255,255,255,0.05)',
                            color: idx < 2 ? '#0fa958' : '#9ca3af',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {idx + 1}
                          </span>
                          <span style={{ fontSize: '1.1rem' }}>{team.flag}</span>
                          <span style={{ fontWeight: 500, color: '#d1d5db' }}>{team.name}</span>
                        </div>
                        <span style={{
                          fontWeight: 700,
                          color: idx < 2 ? '#ffffff' : '#9ca3af'
                        }}>
                          {standing?.points || 0} P
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Group Detail View
  const standings = getStandingsByGroup(selectedGroup);
  const matches = getMatchesByGroup(selectedGroup);

  // Sort teams based on standings data
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return (
    <section className="animate-fade-in" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      {/* Navigation & Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '1rem'
      }}>
        <button
          onClick={() => setSelectedGroup(null)}
          className="btn-secondary"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <ChevronLeft size={16} />
          Tüm Gruplar
        </button>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
          {selectedGroup} GRUBU DETAYLARI
        </h2>

        {/* Quick Group Switcher */}
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          style={{
            background: '#0d1813',
            color: '#ffffff',
            border: '1px solid var(--card-border)',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {allGroups.map(g => (
            <option key={g} value={g}>{g} Grubu</option>
          ))}
        </select>
      </div>

      {/* Main Grid: Standings on Left, Matches on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }} className="group-detail-grid">
        <style>{`
          @media (min-width: 992px) {
            .group-detail-grid {
              grid-template-columns: 1.2fr 0.8fr;
            }
          }
        `}</style>

        {/* Puan Durumu (Standings) */}
        <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Shield size={18} color="#0fa958" />
            Puan Durumu
          </h3>

          <table className="standings-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>Sıra</th>
                <th>Takım</th>
                <th style={{ textAlign: 'center' }}>O</th>
                <th style={{ textAlign: 'center' }}>G</th>
                <th style={{ textAlign: 'center' }}>B</th>
                <th style={{ textAlign: 'center' }}>M</th>
                <th style={{ textAlign: 'center' }}>AG</th>
                <th style={{ textAlign: 'center' }}>YG</th>
                <th style={{ textAlign: 'center' }}>Av</th>
                <th style={{ textAlign: 'center', fontWeight: 800 }}>Puan</th>
              </tr>
            </thead>
            <tbody>
              {sortedStandings.map((standing, index) => {
                const team = teams.find(t => t.id === standing.teamId) as Team;
                const isQualifying = index < 2; // Top 2 qualify
                return (
                  <tr key={standing.teamId} className={isQualifying ? 'qualify-zone' : ''}>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: isQualifying ? '#0fa958' : '#9ca3af' }}>
                      {index + 1}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.3rem' }}>{team.flag}</span>
                        <div>
                          <p style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.95rem' }}>{team.name}</p>
                          <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Sıralama: #{team.fifaRank}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>{standing.played}</td>
                    <td style={{ textAlign: 'center' }}>{standing.won}</td>
                    <td style={{ textAlign: 'center' }}>{standing.drawn}</td>
                    <td style={{ textAlign: 'center' }}>{standing.lost}</td>
                    <td style={{ textAlign: 'center' }}>{standing.goalsFor}</td>
                    <td style={{ textAlign: 'center' }}>{standing.goalsAgainst}</td>
                    <td style={{ textAlign: 'center', color: standing.goalDifference > 0 ? '#0fa958' : standing.goalDifference < 0 ? '#ef4444' : '#9ca3af' }}>
                      {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 800, color: isQualifying ? '#0fa958' : '#ffffff', fontSize: '1.05rem' }}>
                      {standing.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '4px', background: '#0fa958', borderRadius: '2px' }}></span>
              <span>İlk 2 Sıra (Son 32 Turuna Yükselir)</span>
            </div>
          </div>
        </div>

        {/* Fikstür ve Sonuçlar (Fixtures) */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
            <Calendar size={18} color="#dfa324" />
            Grup Maçları ve Sonuçlar
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {matches.map(match => {
              const homeTeam = teams.find(t => t.id === match.homeTeamId) as Team;
              const awayTeam = teams.find(t => t.id === match.awayTeamId) as Team;

              return (
                <div
                  key={match.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  {/* Match Meta (Date & Stadium) */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: '#9ca3af'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} />
                      <span>{match.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={12} />
                      <span style={{
                        maxWidth: '150px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }} title={match.stadium}>
                        {match.stadium}
                      </span>
                    </div>
                  </div>

                  {/* Match Scoreline */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.25rem 0'
                  }}>
                    {/* Home Team */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '40%',
                      justifyContent: 'flex-end',
                      textAlign: 'right'
                    }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>
                        {homeTeam.name}
                      </span>
                      <span style={{ fontSize: '1.5rem' }}>{homeTeam.flag}</span>
                    </div>

                    {/* Score Panel */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(15, 169, 88, 0.15)',
                      border: '1px solid rgba(15, 169, 88, 0.25)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      minWidth: '60px',
                      textAlign: 'center',
                      letterSpacing: '2px'
                    }}>
                      {match.status === 'played' ? (
                        <span>{match.homeScore}-{match.awayScore}</span>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: '#0fa958' }}>
                          <Clock size={12} />
                          <span>{match.time}</span>
                        </div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '40%',
                      justifyContent: 'flex-start',
                      textAlign: 'left'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{awayTeam.flag}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>
                        {awayTeam.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
