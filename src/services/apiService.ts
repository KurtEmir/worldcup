import { getStoredTeams, initialMatches, Match, GroupStanding, Team } from '../data/worldcupData';

const MATCHES_STORAGE_KEY = 'wc2026_live_matches';
const STANDINGS_STORAGE_KEY = 'wc2026_live_standings';
const LAST_FETCH_KEY = 'wc2026_api_football_last_fetch';

// Flags Dictionary for all 48 teams in World Cup 2026
const flags: Record<string, string> = {
  "Algeria": "🇩🇿", "Argentina": "🇦🇷", "Australia": "🇦🇺", "Austria": "🇦🇹", 
  "Belgium": "🇧🇪", "Bosnia & Herzegovina": "🇧🇦", "Brazil": "🇧🇷", "Canada": "🇨🇦", 
  "Cape Verde": "🇨🇻", "Colombia": "🇨🇴", "Croatia": "🇭🇷", "Curaçao": "🇨🇼", 
  "Czech Republic": "🇨🇿", "DR Congo": "🇨🇩", "Ecuador": "🇪🇨", "Egypt": "🇪🇬", 
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "France": "🇫🇷", "Germany": "🇩🇪", "Ghana": "🇬🇭", 
  "Haiti": "🇭🇹", "Iran": "🇮🇷", "Iraq": "🇮🇶", "Ivory Coast": "🇨🇮", 
  "Japan": "🇯🇵", "Jordan": "🇯🇴", "Mexico": "🇲🇽", "Morocco": "🇲🇦", 
  "Netherlands": "🇳🇱", "New Zealand": "🇳🇿", "Norway": "🇳🇴", "Panama": "🇵🇦", 
  "Paraguay": "🇵🇾", "Portugal": "🇵🇹", "Qatar": "🇶🇦", "Saudi Arabia": "🇸🇦", 
  "Scotland": "🏴", "Senegal": "🇸🇳", "South Africa": "🇿🇦", 
  "South Korea": "🇰🇷", "Spain": "🇪🇸", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", 
  "Tunisia": "🇹🇳", "Turkey": "🇹🇷", "USA": "🇺🇸", "Uruguay": "🇺🇾", "Uzbekistan": "🇺🇿"
};

// Turkish translations dictionary for team names
const translateTeamName = (name: string): string => {
  const dict: Record<string, string> = {
    "Algeria": "Cezayir", "Argentina": "Arjantin", "Australia": "Avustralya", "Austria": "Avusturya",
    "Belgium": "Belçika", "Bosnia & Herzegovina": "Bosna Hersek", "Brazil": "Brezilya", "Canada": "Kanada",
    "Cape Verde": "Yeşil Burun", "Colombia": "Kolombiya", "Croatia": "Hırvatistan", "Curaçao": "Curaçao",
    "Czech Republic": "Çekya", "DR Congo": "DK Kongo", "Ecuador": "Ekvador", "Egypt": "Mısır",
    "England": "İngiltere", "France": "Fransa", "Germany": "Almanya", "Ghana": "Gana",
    "Haiti": "Haiti", "Iran": "İran", "Iraq": "Irak", "Ivory Coast": "Fildişi Sahili",
    "Japan": "Japonya", "Jordan": "Ürdün", "Mexico": "Meksika", "Morocco": "Fas",
    "Netherlands": "Hollanda", "New Zealand": "Yeni Zelanda", "Norway": "Norveç", "Panama": "Panama",
    "Paraguay": "Paraguay", "Portugal": "Portekiz", "Qatar": "Katar", "Saudi Arabia": "Suudi Arabistan",
    "Scotland": "İskoçya", "Senegal": "Senegal", "South Africa": "Güney Afrika", "South Korea": "Güney Kore",
    "Spain": "İspanya", "Sweden": "İsveç", "Switzerland": "İsviçre", "Tunisia": "Tunus",
    "Turkey": "Türkiye", "USA": "ABD", "Uruguay": "Uruguay", "Uzbekistan": "Özbekistan"
  };
  return dict[name] || name;
};

// Real-world FIFA Rank lookup for 2026 teams
const getFifaRank = (name: string): number => {
  const ranks: Record<string, number> = {
    "Argentina": 1, "France": 2, "Spain": 3, "England": 4, "Brazil": 5, "Belgium": 6, 
    "Netherlands": 7, "Portugal": 8, "Colombia": 9, "Italy": 10, "Croatia": 11, "Germany": 12,
    "Morocco": 13, "Uruguay": 14, "Switzerland": 15, "USA": 16, "Mexico": 17, "Japan": 18, 
    "Iran": 19, "Denmark": 20, "Senegal": 21, "South Korea": 22, "Austria": 23, "Australia": 24, 
    "Ukraine": 25, "Turkey": 26, "Ecuador": 27, "Egypt": 30, "Poland": 32, "Tunisia": 33, 
    "Algeria": 34, "Canada": 35, "Norway": 36, "Panama": 38, "Paraguay": 39, "Uzbekistan": 41, 
    "Mali": 42, "Qatar": 44, "Haiti": 45, "Saudi Arabia": 46, "South Africa": 47, "Iraq": 48,
    "Jordan": 49, "DR Congo": 50, "Ghana": 51, "Cape Verde": 52, "Ivory Coast": 53, "Curaçao": 75,
    "Bosnia & Herzegovina": 78
  };
  return ranks[name] || 50;
};

// Real-world coaches lookup
const getCoach = (name: string): string => {
  const coaches: Record<string, string> = {
    "Argentina": "Lionel Scaloni", "France": "Didier Deschamps", "Spain": "Luis de la Fuente",
    "England": "Thomas Tuchel", "Brazil": "Dorival Júnior", "Portugal": "Roberto Martínez",
    "Turkey": "Vincenzo Montella", "USA": "Mauricio Pochettino", "Germany": "Julian Nagelsmann",
    "Netherlands": "Ronald Koeman", "Italy": "Luciano Spalletti", "Canada": "Jesse Marsch",
    "Algeria": "Vladimir Petković", "Belgium": "Domenico Tedesco", "South Korea": "Hong Myung-bo",
    "Austria": "Ralf Rangnick", "Croatia": "Zlatko Dalić", "Uruguay": "Marcelo Bielsa"
  };
  return coaches[name] || "Bilinmiyor";
};

// Key players lookup
const getKeyPlayer = (name: string): string => {
  const keyPlayers: Record<string, string> = {
    "Argentina": "Lionel Messi", "France": "Kylian Mbappé", "Spain": "Lamine Yamal", "England": "Jude Bellingham",
    "Brazil": "Vinícius Júnior", "Portugal": "Cristiano Ronaldo", "Netherlands": "Virgil van Dijk", "Colombia": "Luis Díaz",
    "Germany": "Florian Wirtz", "USA": "Christian Pulisic", "Mexico": "Santiago Giménez", "Canada": "Alphonso Davies",
    "Turkey": "Arda Güler", "Norway": "Erling Haaland", "Egypt": "Mohamed Salah", "Belgium": "Kevin De Bruyne",
    "South Korea": "Son Heung-min", "Algeria": "Riyad Mahrez", "Senegal": "Sadio Mané", "Poland": "Robert Lewandowski",
    "Japan": "Kaoru Mitoma", "Saudi Arabia": "Salem Al-Dawsari", "Austria": "Marcel Sabitzer", "Scotland": "Scott McTominay",
    "Bosnia & Herzegovina": "Edin Džeko", "Croatia": "Luka Modrić", "Uruguay": "Federico Valverde"
  };
  return keyPlayers[name] || "Bilinmiyor";
};

// Turkish date parser
const formatDate = (dateStr: string): string => {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const day = parseInt(parts[2]);
  const monthNum = parseInt(parts[1]);
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  return `${day} ${months[monthNum - 1]} ${parts[0]}`;
};

// Helper to calculate standings dynamically based on match results
export const calculateStandings = (matches: Match[]): Record<string, GroupStanding[]> => {
  const standings: Record<string, Record<string, GroupStanding>> = {};

  // Initialize for all qualified teams
  getStoredTeams().forEach(team => {
    if (!standings[team.group]) {
      standings[team.group] = {};
    }
    standings[team.group][team.id] = {
      teamId: team.id,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    };
  });

  // Tally matches that have scores (played or live)
  matches.forEach(match => {
    if (match.status === 'played' || (match.status === 'scheduled' && match.homeScore !== undefined && match.awayScore !== undefined)) {
      const { group, homeTeamId, awayTeamId, homeScore, awayScore } = match;
      
      if (homeScore === undefined || awayScore === undefined) return;

      const groupStandings = standings[group];
      if (!groupStandings || !groupStandings[homeTeamId] || !groupStandings[awayTeamId]) return;

      const home = groupStandings[homeTeamId];
      const away = groupStandings[awayTeamId];

      home.played += 1;
      away.played += 1;
      home.goalsFor += homeScore;
      home.goalsAgainst += awayScore;
      away.goalsFor += awayScore;
      away.goalsAgainst += homeScore;

      if (homeScore > awayScore) {
        home.won += 1;
        home.points += 3;
        away.lost += 1;
      } else if (homeScore < awayScore) {
        away.won += 1;
        away.points += 3;
        home.lost += 1;
      } else {
        home.drawn += 1;
        home.points += 1;
        away.drawn += 1;
        away.points += 1;
      }

      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;
    }
  });

  // Convert to sorted lists
  const sortedStandings: Record<string, GroupStanding[]> = {};
  Object.keys(standings).forEach(group => {
    sortedStandings[group] = Object.values(standings[group]).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  });

  return sortedStandings;
};

// Initialize matches in localStorage
export const getStoredMatches = (): Match[] => {
  const stored = localStorage.getItem(MATCHES_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored matches', e);
    }
  }
  
  // If not in storage, write initialMatches
  localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(initialMatches));
  return initialMatches;
};

// Initialize standings in localStorage
export const getStoredStandings = (): Record<string, GroupStanding[]> => {
  const matches = getStoredMatches();
  const calculated = calculateStandings(matches);
  localStorage.setItem(STANDINGS_STORAGE_KEY, JSON.stringify(calculated));
  return calculated;
};

// Get remaining cooldown in seconds (30 minutes limit = 1800 seconds)
export const getAPICooldownRemaining = (): number => {
  const lastFetch = localStorage.getItem(LAST_FETCH_KEY);
  if (!lastFetch) return 0;
  const elapsedSeconds = (Date.now() - parseInt(lastFetch)) / 1000;
  const remainingSeconds = 1800 - elapsedSeconds;
  return remainingSeconds > 0 ? Math.ceil(remainingSeconds) : 0;
};

// Get last fetch timestamp
export const getAPILastFetchTime = (): number => {
  const lastFetch = localStorage.getItem(LAST_FETCH_KEY);
  return lastFetch ? parseInt(lastFetch) : 0;
};

// Sync with API-Football (API-Sports) under 30 minute cache limit (2 calls per hour)
export const syncWithAPIFootball = async (userKey?: string): Promise<{ success: boolean; message: string; rateLimited?: boolean }> => {
  const apiKey = userKey || localStorage.getItem('wc2026_apisports_key') || '';
  
  if (!apiKey) {
    return { 
      success: false, 
      message: 'API-Football (API-Sports) anahtarı bulunamadı. Lütfen geçerli bir anahtar girin.' 
    };
  }

  const oldKey = localStorage.getItem('wc2026_apisports_key') || '';
  const keyChanged = oldKey !== apiKey;

  // Enforce 30 minutes cache/rate limiting locally to stay within free tier (unless they change API Key)
  const lastFetch = localStorage.getItem(LAST_FETCH_KEY);
  const now = Date.now();
  if (lastFetch && !keyChanged) {
    const elapsedMinutes = (now - parseInt(lastFetch)) / (1000 * 60);
    if (elapsedMinutes < 30) {
      const remainingMinutes = Math.ceil(30 - elapsedMinutes);
      return {
        success: false,
        rateLimited: true,
        message: `API kotanızı (saatte en fazla 2 istek) korumak amacıyla istek engellendi. Canlı skorlar en son ${Math.floor(elapsedMinutes)} dakika önce çekilmiş. Yeni istek için ${remainingMinutes} dakika beklemeniz gerekir.`
      };
    }
  }

  try {
    // API-Football League ID for World Cup is 1, Season is 2026
    const response = await fetch('https://v3.football.api-sports.io/fixtures?league=1&season=2026', {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Hata Kodu: ${response.status}`);
    }

    const data = await response.json();
    if (data.errors && Object.keys(data.errors).length > 0) {
      const errorMsg = data.errors.token || data.errors.requests || 'API Hatası';
      throw new Error(errorMsg);
    }

    if (!data.response || !Array.isArray(data.response) || data.response.length === 0) {
      throw new Error('API-Sports boş yanıt döndürdü veya 2026 sezonu maç verileri bulunamadı.');
    }

    const fixturesList = data.response;

    // Filter only Group Stage matches to construct standings
    const groupStageFixtures = fixturesList.filter((f: any) => 
      f.league.round && f.league.round.toLowerCase().includes('group')
    );

    // Extract unique teams
    const teamNames = new Set<string>();
    groupStageFixtures.forEach((f: any) => {
      if (f.teams.home.name) teamNames.add(f.teams.home.name);
      if (f.teams.away.name) teamNames.add(f.teams.away.name);
    });

    const parsedTeams: Team[] = Array.from(teamNames).map(name => {
      const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const teamFixture = groupStageFixtures.find((f: any) => f.teams.home.name === name || f.teams.away.name === name);
      
      let groupLetter = 'A';
      if (teamFixture && teamFixture.league.round) {
        const groupMatch = teamFixture.league.round.match(/Group ([A-L])/i);
        if (groupMatch) groupLetter = groupMatch[1];
      }

      return {
        id,
        name: translateTeamName(name),
        code: name.slice(0, 3).toUpperCase(),
        flag: flags[name] || '⚽',
        group: groupLetter,
        fifaRank: getFifaRank(name),
        coach: getCoach(name),
        keyPlayer: getKeyPlayer(name),
        description: `${translateTeamName(name)} milli takımı 2026 Dünya Kupası grup aşamasında mücadele ediyor.`
      };
    });

    // Map matches
    const parsedMatches: Match[] = groupStageFixtures.map((item: any, idx: number) => {
      const homeName = item.teams.home.name;
      const awayName = item.teams.away.name;
      
      const homeId = homeName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const awayId = awayName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      
      let groupLetter = 'A';
      if (item.league.round) {
        const groupMatch = item.league.round.match(/Group ([A-L])/i);
        if (groupMatch) groupLetter = groupMatch[1];
      }

      const dateRaw = item.fixture.date.split('T')[0];
      const dateFormatted = formatDate(dateRaw);
      const timeRaw = item.fixture.date.split('T')[1].substring(0, 5);

      return {
        id: `apif_${item.fixture.id || idx}`,
        group: groupLetter,
        homeTeamId: homeId,
        awayTeamId: awayId,
        homeScore: item.goals.home !== null ? item.goals.home : undefined,
        awayScore: item.goals.away !== null ? item.goals.away : undefined,
        date: dateFormatted,
        time: timeRaw,
        stadium: item.fixture.venue.name || '',
        status: item.fixture.status.short === 'FT' ? 'played' : 'scheduled'
      };
    });

    // Save to localStorage
    localStorage.setItem('wc2026_live_teams', JSON.stringify(parsedTeams));
    localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(parsedMatches));
    localStorage.setItem(LAST_FETCH_KEY, now.toString());
    localStorage.setItem('wc2026_apisports_key', apiKey);

    // Recalculate standings
    const calculatedStandings = calculateStandings(parsedMatches);
    localStorage.setItem(STANDINGS_STORAGE_KEY, JSON.stringify(calculatedStandings));

    return { 
      success: true, 
      message: 'Tebrikler! 2026 Dünya Kupası resmi fikstürleri ve canlı skorları API-Sports (API-Football) üzerinden başarıyla çekildi ve sisteme işlendi.' 
    };
  } catch (error: any) {
    console.error('API-Sports sync error:', error);
    return { 
      success: false, 
      message: `API bağlantı hatası: ${error.message}. Lütfen API anahtarınızı kontrol edin.` 
    };
  }
};

// Fetch from OpenFootball raw JSON
export const syncWithOpenFootball = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json');
    if (!response.ok) throw new Error('API fetch failed');
    
    const data = await response.json();
    if (!data.matches || !Array.isArray(data.matches)) {
      throw new Error('Invalid match data structure');
    }
    
    const apiMatches = data.matches.filter((m: any) => m.group && m.group.startsWith('Group'));
    
    const teamNames = new Set<string>();
    apiMatches.forEach((m: any) => {
      teamNames.add(m.team1);
      teamNames.add(m.team2);
    });

    const parsedTeams: Team[] = Array.from(teamNames).map(name => {
      const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const groupLetter = apiMatches.find((m: any) => m.team1 === name || m.team2 === name)?.group.replace('Group ', '') || 'A';
      
      return {
        id,
        name: translateTeamName(name),
        code: name.slice(0, 3).toUpperCase(),
        flag: flags[name] || '⚽',
        group: groupLetter,
        fifaRank: getFifaRank(name),
        coach: getCoach(name),
        keyPlayer: getKeyPlayer(name),
        description: `${translateTeamName(name)} milli takımı 2026 Dünya Kupası grup aşamasında mücadele ediyor.`
      };
    });

    const parsedMatches: Match[] = apiMatches.map((m: any, idx: number) => {
      const homeId = m.team1.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const awayId = m.team2.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const groupLetter = m.group.replace('Group ', '');
      const dateFormatted = formatDate(m.date);
      
      return {
        id: `api_${idx}`,
        group: groupLetter,
        homeTeamId: homeId,
        awayTeamId: awayId,
        homeScore: m.score1 !== undefined ? m.score1 : undefined,
        awayScore: m.score2 !== undefined ? m.score2 : undefined,
        date: dateFormatted,
        time: m.time || '',
        stadium: m.ground || '',
        status: m.score1 !== undefined ? 'played' : 'scheduled'
      };
    });

    localStorage.setItem('wc2026_live_teams', JSON.stringify(parsedTeams));
    localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(parsedMatches));
    
    const calculatedStandings = calculateStandings(parsedMatches);
    localStorage.setItem(STANDINGS_STORAGE_KEY, JSON.stringify(calculatedStandings));

    return true;
  } catch (error) {
    console.error('Error syncing with OpenFootball API:', error);
    return false;
  }
};

// Fetch live data (fallback)
export const fetchLiveMatches = async (): Promise<Match[]> => {
  return getStoredMatches();
};

// Start a background live simulation loop
// Updates scheduled matches to 'played' with randomized outcomes
export const simulateLiveScoreUpdate = (onUpdate: (matches: Match[]) => void): () => void => {
  const interval = setInterval(() => {
    const matches = getStoredMatches();
    
    // Find a scheduled match or simulate a result change
    const scheduledMatches = matches.filter(m => m.status === 'scheduled');
    
    if (scheduledMatches.length > 0) {
      const randomIndex = Math.floor(Math.random() * scheduledMatches.length);
      const targetMatch = scheduledMatches[randomIndex];
      
      const homeScore = Math.floor(Math.random() * 4);
      const awayScore = Math.floor(Math.random() * 3);
      
      const updatedMatches = matches.map(m => {
        if (m.id === targetMatch.id) {
          return {
            ...m,
            homeScore,
            awayScore,
            status: 'played' as const
          };
        }
        return m;
      });
      
      localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(updatedMatches));
      
      const calculated = calculateStandings(updatedMatches);
      localStorage.setItem(STANDINGS_STORAGE_KEY, JSON.stringify(calculated));
      
      onUpdate(updatedMatches);
    }
  }, 10000);

  return () => clearInterval(interval);
};

// Reset all live matches back to initial state
export const resetLiveMatches = (): Match[] => {
  localStorage.removeItem('wc2026_live_teams');
  localStorage.removeItem(LAST_FETCH_KEY);
  localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(initialMatches));
  const calculated = calculateStandings(initialMatches);
  localStorage.setItem(STANDINGS_STORAGE_KEY, JSON.stringify(calculated));
  return initialMatches;
};
