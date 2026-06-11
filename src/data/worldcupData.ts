export interface Team {
  id: string;
  name: string;
  code: string;
  flag: string;
  group: string;
  fifaRank: number;
  coach: string;
  keyPlayer: string;
  description: string;
}

export interface GroupStanding {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Match {
  id: string;
  group: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  stadium: string;
  status: 'scheduled' | 'played';
}

export const teams: Team[] = [
  // Group A
  { id: 'usa', name: 'ABD', code: 'USA', flag: '🇺🇸', group: 'A', fifaRank: 11, coach: 'Mauricio Pochettino', keyPlayer: 'Christian Pulisic', description: 'Kuzey Amerika\'nın ev sahibi devi, genç ve dinamik kadrosuyla turnuvada derin bir yürüyüş hedefliyor.' },
  { id: 'mexico', name: 'Meksika', code: 'MEX', flag: '🇲🇽', group: 'A', fifaRank: 15, coach: 'Javier Aguirre', keyPlayer: 'Santiago Giménez', description: 'Ortak ev sahiplerinden Meksika, ateşli taraftarı önünde turnuvada tarih yazmak istiyor.' },
  { id: 'canada', name: 'Kanada', code: 'CAN', flag: '🇨🇦', group: 'A', fifaRank: 35, coach: 'Jesse Marsch', keyPlayer: 'Alphonso Davies', description: 'Tarihindeki en yetenekli jenerasyonla ev sahibi unvanını sonuna kadar kullanacaklar.' },
  { id: 'new-zealand', name: 'Yeni Zelanda', code: 'NZL', flag: '🇳🇿', group: 'A', fifaRank: 84, coach: 'Darren Bazeley', keyPlayer: 'Chris Wood', description: 'Okyanusya kıtasının temsilcisi, fizik gücü ve disiplinli oyunuyla sürpriz arayacak.' },

  // Group B
  { id: 'argentina', name: 'Arjantin', code: 'ARG', flag: '🇦🇷', group: 'B', fifaRank: 1, coach: 'Lionel Scaloni', keyPlayer: 'Lionel Messi', description: 'Son dünya şampiyonu, kupayı korumak ve efsane kadrosunu taçlandırmak için sahada.' },
  { id: 'ecuador', name: 'Ekvador', code: 'ECU', flag: '🇪🇨', group: 'B', fifaRank: 27, coach: 'Sebastián Beccacece', keyPlayer: 'Piero Hincapié', description: 'Güney Amerika elemelerinde yüksek rakım avantajı dışındaki maçlarda da kalitesini kanıtladı.' },
  { id: 'paraguay', name: 'Paraguay', code: 'PAR', flag: '🇵🇾', group: 'B', fifaRank: 55, coach: 'Gustavo Alfaro', keyPlayer: 'Miguel Almirón', description: 'Karakteristik sert savunması ve kontra atak tehditleriyle her takıma zor anlar yaşatabilirler.' },
  { id: 'jamaica', name: 'Jamaika', code: 'JAM', flag: '🇯🇲', group: 'B', fifaRank: 61, coach: 'Steve McClaren', keyPlayer: 'Leon Bailey', description: 'Hızlı kanat oyuncuları ve atletik yapılarıyla turnuvanın en heyecan verici takımlarından biri.' },

  // Group C
  { id: 'france', name: 'Fransa', code: 'FRA', flag: '🇫🇷', group: 'C', fifaRank: 2, coach: 'Didier Deschamps', keyPlayer: 'Kylian Mbappé', description: 'Dünyanın en derin oyuncu havuzuna sahip ekolü, her turnuvanın doğal şampiyonluk adayı.' },
  { id: 'turkey', name: 'Türkiye', code: 'TUR', flag: '🇹🇷', group: 'C', fifaRank: 26, coach: 'Vincenzo Montella', keyPlayer: 'Arda Güler', description: 'Bizim Çocuklar, yetenekli genç yıldızları ve muazzam tribün desteğiyle kupanın gizli favorisi.' },
  { id: 'cameroon', name: 'Kamerun', code: 'CMR', flag: '🇨🇲', group: 'C', fifaRank: 53, coach: 'Marc Brys', keyPlayer: 'Bryan Mbeumo', description: 'Afrika futbolunun efsanevi "Sönmez Aslanları", fiziksel üstünlükleri ve tecrübeleriyle gruptan çıkmak istiyor.' },
  { id: 'australia', name: 'Avustralya', code: 'AUS', flag: '🇦🇺', group: 'C', fifaRank: 24, coach: 'Tony Popovic', keyPlayer: 'Harry Souttar', description: 'Asya elemelerinden gelen Kangurular, takım ruhu ve yüksek mücadele gücüyle biliniyor.' },

  // Group D
  { id: 'brazil', name: 'Brezilya', code: 'BRA', flag: '🇧🇷', group: 'D', fifaRank: 5, coach: 'Dorival Júnior', keyPlayer: 'Vinícius Júnior', description: 'Samba Rüzgarı, 6. yıldızı göğsüne takmak için genç ve süper yetenekli hücum hattına güveniyor.' },
  { id: 'colombia', name: 'Kolombiya', code: 'COL', flag: '🇨🇴', group: 'D', fifaRank: 9, coach: 'Néstor Lorenzo', keyPlayer: 'Luis Díaz', description: 'Son dönemdeki harika form grafiğiyle rakiplerine korku salan Güney Amerika ekibi.' },
  { id: 'morocco', name: 'Fas', code: 'MAR', flag: '🇲🇦', group: 'D', fifaRank: 13, coach: 'Walid Regragui', keyPlayer: 'Achraf Hakimi', description: '2022\'nin yarı finalist Atlas Aslanları, aynı savunma disiplini ve tutkuyla yine zirveyi hedefliyor.' },
  { id: 'japan', name: 'Japonya', code: 'JPN', flag: '🇯🇵', group: 'D', fifaRank: 16, coach: 'Hajime Moriyasu', keyPlayer: 'Kaoru Mitoma', description: 'Disiplinli, taktiksel açıdan kusursuz ve çok hızlı geçiş hücumları yapan Asya devi.' },

  // Group E
  { id: 'england', name: 'İngiltere', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'E', fifaRank: 4, coach: 'Thomas Tuchel', keyPlayer: 'Jude Bellingham', description: 'Futbolun beşiği İngiltere, altın jenerasyonuyla yarım asırlık kupa hasretine son vermek istiyor.' },
  { id: 'senegal', name: 'Senegal', code: 'SEN', flag: '🇸🇳', group: 'E', fifaRank: 20, coach: 'Pape Thiaw', keyPlayer: 'Sadio Mané', description: 'Afrika\'nın en dengeli kadrosuna sahip olan Senegal, Teranga Aslanları ruhuyla sahada.' },
  { id: 'costa-rica', name: 'Kosta Rika', code: 'CRC', flag: '🇨🇷', group: 'E', fifaRank: 50, coach: 'Claudio Vivas', keyPlayer: 'Joel Campbell', description: 'Dünya Kupası turnuvalarında devleri devirmesiyle ünlü, savunma ağırlıklı dirençli ekip.' },
  { id: 'uzbekistan', name: 'Özbekistan', code: 'UZB', flag: '🇺🇿', group: 'E', fifaRank: 60, coach: 'Srečko Katanec', keyPlayer: 'Eldor Shomurodov', description: 'Tarihinde ilk kez Dünya Kupası\'na katılan Orta Asya temsilcisi, turnuvaya renk katacak.' },

  // Group F
  { id: 'spain', name: 'İspanya', code: 'ESP', flag: '🇪🇸', group: 'F', fifaRank: 3, coach: 'Luis de la Fuente', keyPlayer: 'Lamine Yamal', description: 'Euro 2024 Şampiyonu, pas futbolunu genç kanat oyuncularının dinamizmiyle birleştirerek zirveyi hedefliyor.' },
  { id: 'belgium', name: 'Belçika', code: 'BEL', flag: '🇧🇪', group: 'F', fifaRank: 6, coach: 'Domenico Tedesco', keyPlayer: 'Kevin De Bruyne', description: 'Altın jenerasyonun son temsilcileriyle genç yeteneklerin harmanlandığı geçiş kadrosu.' },
  { id: 'south-korea', name: 'Güney Kore', code: 'KOR', flag: '🇰🇷', group: 'F', fifaRank: 22, coach: 'Hong Myung-bo', keyPlayer: 'Son Heung-min', description: 'Kaptan Son liderliğindeki Güney Kore, bitmek bilmeyen enerjisi ve hızıyla gruptan çıkmayı amaçlıyor.' },
  { id: 'egypt', name: 'Mısır', code: 'EGY', flag: '🇪🇬', group: 'F', fifaRank: 30, coach: 'Hossam Hassan', keyPlayer: 'Mohamed Salah', description: 'Afrika Kupası\'nın rekortmeni, dünya sahnesinde Mo Salah önderliğinde başarı arıyor.' },

  // Group G
  { id: 'germany', name: 'Almanya', code: 'GER', flag: '🇩🇪', group: 'G', fifaRank: 10, coach: 'Julian Nagelsmann', keyPlayer: 'Florian Wirtz', description: 'Turnuva takımı panzerler, Nagelsmann yönetiminde göze hoş gelen hücum oyunuyla yeniden zirvede.' },
  { id: 'netherlands', name: 'Hollanda', code: 'NED', flag: '🇳🇱', group: 'G', fifaRank: 7, coach: 'Ronald Koeman', keyPlayer: 'Virgil van Dijk', description: 'Portakallar, turnuva tarihinde hep zirveyi zorlayan ancak mutlu sona ulaşamayan kaderini değiştirmek istiyor.' },
  { id: 'chile', name: 'Şili', code: 'CHI', flag: '🇨🇱', group: 'G', fifaRank: 40, coach: 'Ricardo Gareca', keyPlayer: 'Alexis Sánchez', description: 'Agresif ve pres odaklı Şili futbolu, bu zor grupta fizik gücünü konuşturacak.' },
  { id: 'saudi-arabia', name: 'Suudi Arabistan', code: 'KSA', flag: '🇸🇦', group: 'G', fifaRank: 56, coach: 'Hervé Renard', keyPlayer: 'Salem Al-Dawsari', description: '2022\'de Arjantin\'i yenen tek takım olan Körfez ekibi, yine büyük sürpriz peşinde.' },

  // Group H
  { id: 'portugal', name: 'Portekiz', code: 'POR', flag: '🇵🇹', group: 'H', fifaRank: 8, coach: 'Roberto Martínez', keyPlayer: 'Cristiano Ronaldo', description: 'Ronaldo\'nun büyük olasılıkla son Dünya Kupası turnuvası. Muhteşem bir kadro derinliğine sahipler.' },
  { id: 'italy', name: 'İtalya', code: 'ITA', flag: '🇮🇹', group: 'H', fifaRank: 12, coach: 'Luciano Spalletti', keyPlayer: 'Nicolò Barella', description: 'Savunma taktiği ustası Gök Mavililer, turnuvada yeniden kendilerini kanıtlama aşamasında.' },
  { id: 'uruguay', name: 'Uruguay', code: 'URU', flag: '🇺🇾', group: 'H', fifaRank: 14, coach: 'Marcelo Bielsa', keyPlayer: 'Federico Valverde', description: 'Bielsa\'nın yüksek yoğunluklu pres futboluyla rakiplerine nefes aldırmayan savaşçı ekip.' },
  { id: 'nigeria', name: 'Nijerya', code: 'NGA', flag: '🇳🇬', group: 'H', fifaRank: 36, coach: 'Augustine Eguavoen', keyPlayer: 'Victor Osimhen', description: 'Hücum hattındaki Osimhen liderliğindeki "Süper Kartallar", grubun en tehlikeli fizik gücü.' },

  // Group I
  { id: 'croatia', name: 'Hırvatistan', code: 'CRO', flag: '🇭🇷', group: 'I', fifaRank: 9, coach: 'Zlatko Dalić', keyPlayer: 'Luka Modrić', description: 'Dünya kupalarının tecrübeli ve pes etmeyen ekibi, orta sahasının dinamizmiyle parlıyor.' },
  { id: 'denmark', name: 'Danimarka', code: 'DEN', flag: '🇩🇰', group: 'I', fifaRank: 21, coach: 'Lars Knudsen', keyPlayer: 'Christian Eriksen', description: 'İskandinav disiplini ve kompakt takım savunmasını mükemmel uygulayan Kuzey Avrupa temsilcisi.' },
  { id: 'algeria', name: 'Cezayir', code: 'ALG', flag: '🇩🇿', group: 'I', fifaRank: 41, coach: 'Vladimir Petković', keyPlayer: 'Riyad Mahrez', description: 'Kuzey Afrika ekibi teknik yetenekleri ve mücadeleci orta sahasıyla biliniyor.' },
  { id: 'iran', name: 'İran', code: 'IRN', flag: '🇮🇷', group: 'I', fifaRank: 19, coach: 'Amir Ghalenoei', keyPlayer: 'Mehdi Taremi', description: 'Defansif direnci yüksek olan Asya ekibi, hızlı hücumlarla gol arayacak.' },

  // Group J
  { id: 'switzerland', name: 'İsviçre', code: 'SUI', flag: '🇨🇭', group: 'J', fifaRank: 17, coach: 'Murat Yakın', keyPlayer: 'Granit Xhaka', description: 'İstikrar abidesi İsviçre, taktiksel disiplini ve tecrübeli omurgasıyla her devin baş belası.' },
  { id: 'peru', name: 'Peru', code: 'PER', flag: '🇵🇪', group: 'J', fifaRank: 43, coach: 'Jorge Fossati', keyPlayer: 'Gianluca Lapadula', description: 'Güney Amerika\'nın tutkulu takımı, tribünlerinin müthiş desteğini arkasına alacak.' },
  { id: 'tunisia', name: 'Tunus', code: 'TUN', flag: '🇹🇳', group: 'J', fifaRank: 47, coach: 'Kais Yaâkoubi', keyPlayer: 'Ellyes Skhiri', description: 'Katı savunma anlayışı ve orta saha direnciyle grupta gedik açmaya çalışacaklar.' },
  { id: 'iraq', name: 'Irak', code: 'IRQ', flag: '🇮🇶', group: 'J', fifaRank: 58, coach: 'Jesús Casas', keyPlayer: 'Aymen Hussein', description: 'Asya elemelerinde müthiş bir çıkış yakalayan takım, turnuvanın sürpriz adaylarından.' },

  // Group K
  { id: 'ukraine', name: 'Ukrayna', code: 'UKR', flag: '🇺🇦', group: 'K', fifaRank: 25, coach: 'Serhiy Rebrov', keyPlayer: 'Artem Dovbyk', description: 'Zorlu şartlarda gelen bu katılımı, sahada büyük bir karakter ve mücadele ile taçlandırmak istiyorlar.' },
  { id: 'poland', name: 'Polonya', code: 'POL', flag: '🇵🇱', group: 'K', fifaRank: 31, coach: 'Michał Probierz', keyPlayer: 'Robert Lewandowski', description: 'Lewandowski\'nin muhtemelen son büyük şansı. Bitiriciliğiyle takımı taşımaya hazır.' },
  { id: 'mali', name: 'Mali', code: 'MLI', flag: '🇲🇱', group: 'K', fifaRank: 44, coach: 'Tom Saintfiet', keyPlayer: 'Yves Bissouma', description: 'Orta sahada fizik üstünlüğü ve atletizmi üst düzeyde olan tehlikeli bir Afrika ekibi.' },
  { id: 'qatar', name: 'Katar', code: 'QAT', flag: '🇶🇦', group: 'K', fifaRank: 46, coach: 'Tintín Márquez', keyPlayer: 'Akram Afif', description: 'Son Asya Kupası Şampiyonu, kendilerini küresel arenada bir kez daha kanıtlamak istiyor.' },

  // Group L
  { id: 'austria', name: 'Avusturya', code: 'AUT', flag: '🇦🇹', group: 'L', fifaRank: 23, coach: 'Ralf Rangnick', keyPlayer: 'Marcel Sabitzer', description: 'Rangnick\'in meşhur "Gegenpressing" sistemini harika uygulayan, tempolu ve modern takım.' },
  { id: 'scotland', name: 'İskoçya', code: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'L', fifaRank: 51, coach: 'Steve Clarke', keyPlayer: 'Scott McTominay', description: 'Tartan Ordusu, yüksek savaşçı ruhu, duran top gücü ve ateşli taraftarlarıyla grupta.' },
  { id: 'ghana', name: 'Gana', code: 'GHA', flag: '🇬🇭', group: 'L', fifaRank: 64, coach: 'Otto Addo', keyPlayer: 'Mohammed Kudus', description: 'Yaratıcı hücum yetenekleriyle donatılmış "Siyah Yıldızlar", gruptan çıkmayı gözüne kestirdi.' },
  { id: 'uae', name: 'B.A.E.', code: 'UAE', flag: '🇦🇪', group: 'L', fifaRank: 68, coach: 'Paulo Bento', keyPlayer: 'Fábio Lima', description: 'Bento önderliğinde organize ve pas odaklı bir kimlik kazanan Körfez temsilcisi.' }
];

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// Pre-calculated standings based on simulated results for a complete world cup feel!
export const initialStandings: Record<string, GroupStanding[]> = {
  A: [
    { teamId: 'usa', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 7 },
    { teamId: 'mexico', played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 5 },
    { teamId: 'canada', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 4 },
    { teamId: 'new-zealand', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0 }
  ],
  B: [
    { teamId: 'argentina', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 1, goalDifference: 7, points: 9 },
    { teamId: 'ecuador', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, goalDifference: 2, points: 6 },
    { teamId: 'paraguay', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 1 },
    { teamId: 'jamaica', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 7, goalDifference: -5, points: 1 }
  ],
  C: [
    { teamId: 'france', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, goalDifference: 5, points: 7 },
    { teamId: 'turkey', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 4, goalDifference: 2, points: 6 },
    { teamId: 'australia', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 4 },
    { teamId: 'cameroon', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 8, goalDifference: -6, points: 0 }
  ],
  D: [
    { teamId: 'brazil', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 7 },
    { teamId: 'morocco', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 6 },
    { teamId: 'colombia', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 4 },
    { teamId: 'japan', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0 }
  ],
  E: [
    { teamId: 'england', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDifference: 4, points: 7 },
    { teamId: 'senegal', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 6 },
    { teamId: 'costa-rica', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 5, goalDifference: -3, points: 3 },
    { teamId: 'uzbekistan', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1 }
  ],
  F: [
    { teamId: 'spain', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 2, goalDifference: 7, points: 9 },
    { teamId: 'belgium', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, goalDifference: 0, points: 4 },
    { teamId: 'south-korea', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 4 },
    { teamId: 'egypt', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0 }
  ],
  G: [
    { teamId: 'germany', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 3, goalDifference: 4, points: 7 },
    { teamId: 'netherlands', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 3, goalDifference: 3, points: 6 },
    { teamId: 'saudi-arabia', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 6, goalDifference: -3, points: 3 },
    { teamId: 'chile', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, goalDifference: -4, points: 1 }
  ],
  H: [
    { teamId: 'portugal', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 7 },
    { teamId: 'uruguay', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, goalDifference: 2, points: 6 },
    { teamId: 'italy', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 4 },
    { teamId: 'nigeria', played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 7, goalDifference: -6, points: 0 }
  ],
  I: [
    { teamId: 'croatia', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, goalDifference: 3, points: 7 },
    { teamId: 'denmark', played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 5 },
    { teamId: 'iran', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3 },
    { teamId: 'algeria', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 1 }
  ],
  J: [
    { teamId: 'switzerland', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, goalDifference: 3, points: 7 },
    { teamId: 'iraq', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, goalDifference: 0, points: 4 },
    { teamId: 'peru', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3 },
    { teamId: 'tunisia', played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 2 }
  ],
  K: [
    { teamId: 'ukraine', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 3, goalDifference: 3, points: 7 },
    { teamId: 'poland', played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 5 },
    { teamId: 'mali', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3 },
    { teamId: 'qatar', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 1 }
  ],
  L: [
    { teamId: 'austria', played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 7 },
    { teamId: 'scotland', played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 5 },
    { teamId: 'ghana', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3 },
    { teamId: 'uae', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 1 }
  ]
};

// Fixtures for each group
export const initialMatches: Match[] = [
  // Group A Matches
  { id: 'a1', group: 'A', homeTeamId: 'usa', awayTeamId: 'new-zealand', homeScore: 3, awayScore: 0, date: '11 Haziran 2026', time: '20:00', stadium: 'Estadio Azteca, Mexico City', status: 'played' },
  { id: 'a2', group: 'A', homeTeamId: 'mexico', awayTeamId: 'canada', homeScore: 1, awayScore: 1, date: '12 Haziran 2026', time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'played' },
  { id: 'a3', group: 'A', homeTeamId: 'usa', awayTeamId: 'mexico', homeScore: 2, awayScore: 2, date: '17 Haziran 2026', time: '21:00', stadium: 'MetLife Stadium, New York', status: 'played' },
  { id: 'a4', group: 'A', homeTeamId: 'canada', awayTeamId: 'new-zealand', homeScore: 2, awayScore: 1, date: '18 Haziran 2026', time: '17:00', stadium: 'BC Place, Vancouver', status: 'played' },
  { id: 'a5', group: 'A', homeTeamId: 'canada', awayTeamId: 'usa', homeScore: 0, awayScore: 1, date: '23 Haziran 2026', time: '20:00', stadium: 'Lumen Field, Seattle', status: 'played' },
  { id: 'a6', group: 'A', homeTeamId: 'new-zealand', awayTeamId: 'mexico', homeScore: 0, awayScore: 1, date: '23 Haziran 2026', time: '20:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'played' },

  // Group B Matches
  { id: 'b1', group: 'B', homeTeamId: 'argentina', awayTeamId: 'jamaica', homeScore: 4, awayScore: 0, date: '13 Haziran 2026', time: '15:00', stadium: 'Gillette Stadium, Boston', status: 'played' },
  { id: 'b2', group: 'B', homeTeamId: 'ecuador', awayTeamId: 'paraguay', homeScore: 2, awayScore: 0, date: '13 Haziran 2026', time: '19:00', stadium: 'Hard Rock Stadium, Miami', status: 'played' },
  { id: 'b3', group: 'B', homeTeamId: 'argentina', awayTeamId: 'ecuador', homeScore: 2, awayScore: 1, date: '19 Haziran 2026', time: '20:00', stadium: 'AT&T Stadium, Dallas', status: 'played' },
  { id: 'b4', group: 'B', homeTeamId: 'paraguay', awayTeamId: 'jamaica', homeScore: 1, awayScore: 1, date: '19 Haziran 2026', time: '16:00', stadium: 'NRG Stadium, Houston', status: 'played' },
  { id: 'b5', group: 'B', homeTeamId: 'paraguay', awayTeamId: 'argentina', homeScore: 0, awayScore: 2, date: '24 Haziran 2026', time: '21:00', stadium: 'Lincoln Financial Field, Philadelphia', status: 'played' },
  { id: 'b6', group: 'B', homeTeamId: 'jamaica', awayTeamId: 'ecuador', homeScore: 1, awayScore: 2, date: '24 Haziran 2026', time: '21:00', stadium: 'Levi\'s Stadium, San Francisco', status: 'played' },

  // Group C Matches
  { id: 'c1', group: 'C', homeTeamId: 'france', awayTeamId: 'australia', homeScore: 2, awayScore: 0, date: '14 Haziran 2026', time: '18:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'played' },
  { id: 'c2', group: 'C', homeTeamId: 'turkey', awayTeamId: 'cameroon', homeScore: 3, awayScore: 1, date: '14 Haziran 2026', time: '21:00', stadium: 'BMO Field, Toronto', status: 'played' },
  { id: 'c3', group: 'C', homeTeamId: 'france', awayTeamId: 'turkey', homeScore: 3, awayScore: 1, date: '20 Haziran 2026', time: '17:00', stadium: 'Estadio BBVA, Monterrey', status: 'played' },
  { id: 'c4', group: 'C', homeTeamId: 'cameroon', awayTeamId: 'australia', homeScore: 1, awayScore: 2, date: '20 Haziran 2026', time: '20:00', stadium: 'Estadio Akron, Guadalajara', status: 'played' },
  { id: 'c5', group: 'C', homeTeamId: 'cameroon', awayTeamId: 'france', homeScore: 0, awayScore: 2, date: '25 Haziran 2026', time: '18:00', stadium: 'Hard Rock Stadium, Miami', status: 'played' },
  { id: 'c6', group: 'C', homeTeamId: 'australia', awayTeamId: 'turkey', homeScore: 1, awayScore: 2, date: '25 Haziran 2026', time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'played' },

  // Group D Matches
  { id: 'd1', group: 'D', homeTeamId: 'brazil', awayTeamId: 'japan', homeScore: 2, awayScore: 0, date: '15 Haziran 2026', time: '15:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'played' },
  { id: 'd2', group: 'D', homeTeamId: 'colombia', awayTeamId: 'morocco', homeScore: 0, awayScore: 1, date: '15 Haziran 2026', time: '18:00', stadium: 'MetLife Stadium, New York', status: 'played' },
  { id: 'd3', group: 'D', homeTeamId: 'brazil', awayTeamId: 'colombia', homeScore: 1, awayScore: 1, date: '21 Haziran 2026', time: '21:00', stadium: 'SoFi Stadium, Los Angeles', status: 'played' },
  { id: 'd4', group: 'D', homeTeamId: 'morocco', awayTeamId: 'japan', homeScore: 2, awayScore: 0, date: '21 Haziran 2026', time: '19:00', stadium: 'BC Place, Vancouver', status: 'played' },
  { id: 'd5', group: 'D', homeTeamId: 'morocco', awayTeamId: 'brazil', homeScore: 1, awayScore: 3, date: '26 Haziran 2026', time: '17:00', stadium: 'AT&T Stadium, Dallas', status: 'played' },
  { id: 'd6', group: 'D', homeTeamId: 'japan', awayTeamId: 'colombia', homeScore: 1, awayScore: 2, date: '26 Haziran 2026', time: '17:00', stadium: 'NRG Stadium, Houston', status: 'played' },

  // Group E Matches
  { id: 'e1', group: 'E', homeTeamId: 'england', awayTeamId: 'uzbekistan', homeScore: 2, awayScore: 0, date: '16 Haziran 2026', time: '14:00', stadium: 'Gillette Stadium, Boston', status: 'played' },
  { id: 'e2', group: 'E', homeTeamId: 'senegal', awayTeamId: 'costa-rica', homeScore: 2, awayScore: 0, date: '16 Haziran 2026', time: '17:00', stadium: 'Lincoln Financial Field, Philadelphia', status: 'played' },
  { id: 'e3', group: 'E', homeTeamId: 'england', awayTeamId: 'senegal', homeScore: 2, awayScore: 0, date: '22 Haziran 2026', time: '20:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'played' },
  { id: 'e4', group: 'E', homeTeamId: 'costa-rica', awayTeamId: 'uzbekistan', homeScore: 1, awayScore: 1, date: '22 Haziran 2026', time: '16:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'played' },
  { id: 'e5', group: 'E', homeTeamId: 'costa-rica', awayTeamId: 'england', homeScore: 1, awayScore: 1, date: '27 Haziran 2026', time: '19:00', stadium: 'MetLife Stadium, New York', status: 'played' },
  { id: 'e6', group: 'E', homeTeamId: 'uzbekistan', awayTeamId: 'senegal', homeScore: 0, awayScore: 2, date: '27 Haziran 2026', time: '19:00', stadium: 'Levi\'s Stadium, San Francisco', status: 'played' },

  // Group F Matches
  { id: 'f1', group: 'F', homeTeamId: 'spain', awayTeamId: 'egypt', homeScore: 3, awayScore: 0, date: '17 Haziran 2026', time: '16:00', stadium: 'SoFi Stadium, Los Angeles', status: 'played' },
  { id: 'f2', group: 'F', homeTeamId: 'belgium', awayTeamId: 'south-korea', homeScore: 1, awayScore: 1, date: '17 Haziran 2026', time: '19:00', stadium: 'Lumen Field, Seattle', status: 'played' },
  { id: 'f3', group: 'F', homeTeamId: 'spain', awayTeamId: 'belgium', homeScore: 3, awayScore: 1, date: '23 Haziran 2026', time: '18:00', stadium: 'Estadio Azteca, Mexico City', status: 'played' },
  { id: 'f4', group: 'F', homeTeamId: 'south-korea', awayTeamId: 'egypt', homeScore: 1, awayScore: 1, date: '23 Haziran 2026', time: '21:00', stadium: 'Estadio Akron, Guadalajara', status: 'played' },
  { id: 'f5', group: 'F', homeTeamId: 'south-korea', awayTeamId: 'spain', homeScore: 1, awayScore: 3, date: '28 Haziran 2026', time: '20:00', stadium: 'BC Place, Vancouver', status: 'played' },
  { id: 'f6', group: 'F', homeTeamId: 'egypt', awayTeamId: 'belgium', homeScore: 0, awayScore: 2, date: '28 Haziran 2026', time: '20:00', stadium: 'BMO Field, Toronto', status: 'played' },

  // Group G Matches
  { id: 'g1', group: 'G', homeTeamId: 'germany', awayTeamId: 'saudi-arabia', homeScore: 3, awayScore: 1, date: '18 Haziran 2026', time: '15:00', stadium: 'NRG Stadium, Houston', status: 'played' },
  { id: 'g2', group: 'G', homeTeamId: 'netherlands', awayTeamId: 'chile', homeScore: 3, awayScore: 1, date: '18 Haziran 2026', time: '18:00', stadium: 'Levi\'s Stadium, San Francisco', status: 'played' },
  { id: 'g3', group: 'G', homeTeamId: 'germany', awayTeamId: 'netherlands', homeScore: 2, awayScore: 1, date: '24 Haziran 2026', time: '20:00', stadium: 'MetLife Stadium, New York', status: 'played' },
  { id: 'g4', group: 'G', homeTeamId: 'chile', awayTeamId: 'saudi-arabia', homeScore: 1, awayScore: 2, date: '24 Haziran 2026', time: '17:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'played' },
  { id: 'g5', group: 'G', homeTeamId: 'chile', awayTeamId: 'germany', homeScore: 0, awayScore: 2, date: '29 Haziran 2026', time: '18:00', stadium: 'Hard Rock Stadium, Miami', status: 'played' },
  { id: 'g6', group: 'G', homeTeamId: 'saudi-arabia', awayTeamId: 'netherlands', homeScore: 0, awayScore: 2, date: '29 Haziran 2026', time: '18:00', stadium: 'Gillette Stadium, Boston', status: 'played' },

  // Group H Matches
  { id: 'h1', group: 'H', homeTeamId: 'portugal', awayTeamId: 'nigeria', homeScore: 2, awayScore: 0, date: '19 Haziran 2026', time: '14:00', stadium: 'Lumen Field, Seattle', status: 'played' },
  { id: 'h2', group: 'H', homeTeamId: 'italy', awayTeamId: 'uruguay', homeScore: 1, awayScore: 2, date: '19 Haziran 2026', time: '17:00', stadium: 'Estadio BBVA, Monterrey', status: 'played' },
  { id: 'h3', group: 'H', homeTeamId: 'portugal', awayTeamId: 'italy', homeScore: 1, awayScore: 1, date: '25 Haziran 2026', time: '21:00', stadium: 'SoFi Stadium, Los Angeles', status: 'played' },
  { id: 'h4', group: 'H', homeTeamId: 'uruguay', awayTeamId: 'nigeria', homeScore: 2, awayScore: 1, date: '25 Haziran 2026', time: '19:00', stadium: 'Lincoln Financial Field, Philadelphia', status: 'played' },
  { id: 'h5', group: 'H', homeTeamId: 'uruguay', awayTeamId: 'portugal', homeScore: 1, awayScore: 3, date: '30 Haziran 2026', time: '17:00', stadium: 'AT&T Stadium, Dallas', status: 'played' },
  { id: 'h6', group: 'H', homeTeamId: 'nigeria', awayTeamId: 'italy', homeScore: 0, awayScore: 1, date: '30 Haziran 2026', time: '17:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'played' },

  // Group I Matches
  { id: 'i1', group: 'I', homeTeamId: 'croatia', awayTeamId: 'iran', homeScore: 2, awayScore: 1, date: '20 Haziran 2026', time: '15:00', stadium: 'Hard Rock Stadium, Miami', status: 'played' },
  { id: 'i2', group: 'I', homeTeamId: 'denmark', awayTeamId: 'algeria', homeScore: 1, awayScore: 1, date: '20 Haziran 2026', time: '18:00', stadium: 'Gillette Stadium, Boston', status: 'played' },
  { id: 'i3', group: 'I', homeTeamId: 'croatia', awayTeamId: 'denmark', homeScore: 1, awayScore: 1, date: '26 Haziran 2026', time: '20:00', stadium: 'MetLife Stadium, New York', status: 'played' },
  { id: 'i4', group: 'I', homeTeamId: 'algeria', awayTeamId: 'iran', homeScore: 1, awayScore: 2, date: '26 Haziran 2026', time: '16:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'played' },
  { id: 'i5', group: 'I', homeTeamId: 'algeria', awayTeamId: 'croatia', homeScore: 0, awayScore: 2, date: '1 Temmuz 2026', time: '19:00', stadium: 'SoFi Stadium, Los Angeles', status: 'played' },
  { id: 'i6', group: 'I', homeTeamId: 'iran', awayTeamId: 'denmark', homeScore: 0, awayScore: 2, date: '1 Temmuz 2026', time: '19:00', stadium: 'BC Place, Vancouver', status: 'played' },

  // Group J Matches
  { id: 'j1', group: 'J', homeTeamId: 'switzerland', awayTeamId: 'iraq', homeScore: 2, awayScore: 1, date: '21 Haziran 2026', time: '14:00', stadium: 'NRG Stadium, Houston', status: 'played' },
  { id: 'j2', group: 'J', homeTeamId: 'peru', awayTeamId: 'tunisia', homeScore: 2, awayScore: 1, date: '21 Haziran 2026', time: '17:00', stadium: 'Levi\'s Stadium, San Francisco', status: 'played' },
  { id: 'j3', group: 'J', homeTeamId: 'switzerland', awayTeamId: 'peru', homeScore: 2, awayScore: 0, date: '27 Haziran 2026', time: '21:00', stadium: 'AT&T Stadium, Dallas', status: 'played' },
  { id: 'j4', group: 'J', homeTeamId: 'tunisia', awayTeamId: 'iraq', homeScore: 1, awayScore: 1, date: '27 Haziran 2026', time: '19:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'played' },
  { id: 'j5', group: 'J', homeTeamId: 'tunisia', awayTeamId: 'switzerland', homeScore: 0, awayScore: 1, date: '2 Temmuz 2026', time: '17:00', stadium: 'Lumen Field, Seattle', status: 'played' },
  { id: 'j6', group: 'J', homeTeamId: 'iraq', awayTeamId: 'peru', homeScore: 2, awayScore: 1, date: '2 Temmuz 2026', time: '17:00', stadium: 'BMO Field, Toronto', status: 'played' },

  // Group K Matches
  { id: 'k1', group: 'K', homeTeamId: 'ukraine', awayTeamId: 'qatar', homeScore: 2, awayScore: 1, date: '22 Haziran 2026', time: '15:00', stadium: 'Lincoln Financial Field, Philadelphia', status: 'played' },
  { id: 'k2', group: 'K', homeTeamId: 'poland', awayTeamId: 'mali', homeScore: 2, awayScore: 1, date: '22 Haziran 2026', time: '18:00', stadium: 'Estadio BBVA, Monterrey', status: 'played' },
  { id: 'k3', group: 'K', homeTeamId: 'ukraine', awayTeamId: 'poland', homeScore: 2, awayScore: 2, date: '28 Haziran 2026', time: '20:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'played' },
  { id: 'k4', group: 'K', homeTeamId: 'mali', awayTeamId: 'qatar', homeScore: 2, awayScore: 1, date: '28 Haziran 2026', time: '16:00', stadium: 'Estadio Akron, Guadalajara', status: 'played' },
  { id: 'k5', group: 'K', homeTeamId: 'mali', awayTeamId: 'ukraine', homeScore: 0, awayScore: 2, date: '3 Temmuz 2026', time: '19:00', stadium: 'Gillette Stadium, Boston', status: 'played' },
  { id: 'k6', group: 'K', homeTeamId: 'qatar', awayTeamId: 'poland', homeScore: 0, awayScore: 0, date: '3 Temmuz 2026', time: '19:00', stadium: 'Hard Rock Stadium, Miami', status: 'played' },

  // Group L Matches
  { id: 'l1', group: 'L', homeTeamId: 'austria', awayTeamId: 'uae', homeScore: 2, awayScore: 0, date: '23 Haziran 2026', time: '14:00', stadium: 'SoFi Stadium, Los Angeles', status: 'played' },
  { id: 'l2', group: 'L', homeTeamId: 'scotland', awayTeamId: 'ghana', homeScore: 2, awayScore: 1, date: '23 Haziran 2026', time: '17:00', stadium: 'BC Place, Vancouver', status: 'played' },
  { id: 'l3', group: 'L', homeTeamId: 'austria', awayTeamId: 'scotland', homeScore: 1, awayScore: 1, date: '29 Haziran 2026', time: '21:00', stadium: 'MetLife Stadium, New York', status: 'played' },
  { id: 'l4', group: 'L', homeTeamId: 'ghana', awayTeamId: 'uae', homeScore: 2, awayScore: 1, date: '29 Haziran 2026', time: '19:00', stadium: 'Lumen Field, Seattle', status: 'played' },
  { id: 'l5', group: 'L', homeTeamId: 'ghana', awayTeamId: 'austria', homeScore: 0, awayScore: 3, date: '4 Temmuz 2026', time: '17:00', stadium: 'NRG Stadium, Houston', status: 'played' },
  { id: 'l6', group: 'L', homeTeamId: 'uae', awayTeamId: 'scotland', homeScore: 0, awayScore: 1, date: '4 Temmuz 2026', time: '17:00', stadium: 'Levi\'s Stadium, San Francisco', status: 'played' }
];

export const getTeamById = (id: string): Team | undefined => {
  return teams.find(t => t.id === id);
};

export const getTeamsByGroup = (group: string): Team[] => {
  return teams.filter(t => t.group === group);
};

export const getMatchesByGroup = (group: string): Match[] => {
  return initialMatches.filter(m => m.group === group);
};

export const getStandingsByGroup = (group: string): GroupStanding[] => {
  return initialStandings[group] || [];
};

// Seeding standard distribution for poll votes
export const initialVotes: Record<string, number> = {
  argentina: 4820,
  brazil: 4530,
  france: 4120,
  spain: 3950,
  germany: 2840,
  turkey: 5890, // We have a very patriotic voting crowd!
  england: 2420,
  portugal: 2310,
  netherlands: 1540,
  italy: 1320,
  morocco: 980,
  usa: 750,
  croatia: 640,
  uruguay: 550,
  colombia: 490,
  belgium: 410
};
