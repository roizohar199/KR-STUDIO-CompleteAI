import React, { useState, useRef, useEffect, useContext } from 'react';
import { Database, Search, Music, TrendingUp, Users, Globe, BarChart3, Filter } from 'lucide-react';
import { LanguageContext } from '../App';
import { useTranslation } from '../lib/translations';

const MusicDatabase = () => {
  const { language } = useContext(LanguageContext);
  const t = useTranslation();
  
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedKey, setSelectedKey] = useState('all');
  const [selectedBPM, setSelectedBPM] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [isLoading, setIsLoading] = useState(false);
  const [databaseStats, setDatabaseStats] = useState(null);
  const [similarityAnalysis, setSimilarityAnalysis] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // נתונים מדומים של שירים (כמו Spotify API)
  const mockSongs = [
    {
      id: 1,
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      genre: 'Rock',
      key: 'Bb Major',
      bpm: 72,
      energy: 0.85,
      valence: 0.65,
      danceability: 0.45,
      popularity: 95,
      releaseYear: 1975,
      duration: 354,
      spotifyId: '3z8h0TU7ReDPLIbEnYhWZb',
      camelot: '6B',
      acousticness: 0.12,
      instrumentalness: 0.08,
      liveness: 0.15,
      loudness: -8.2,
      speechiness: 0.03,
      tempo: 72.4,
      timeSignature: 4,
      mode: 1,
      explicit: false,
      country: 'UK',
      language: 'English'
    },
    {
      id: 2,
      title: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      genre: 'Rock',
      key: 'B Minor',
      bpm: 75,
      energy: 0.78,
      valence: 0.42,
      danceability: 0.52,
      popularity: 92,
      releaseYear: 1976,
      duration: 391,
      spotifyId: '40riOy7x9W7udXy6SA5vLA',
      camelot: '10A',
      acousticness: 0.18,
      instrumentalness: 0.25,
      liveness: 0.12,
      loudness: -7.8,
      speechiness: 0.04,
      tempo: 75.2,
      timeSignature: 4,
      mode: 0,
      explicit: false,
      country: 'USA',
      language: 'English'
    },
    {
      id: 3,
      title: 'Imagine',
      artist: 'John Lennon',
      album: 'Imagine',
      genre: 'Pop',
      key: 'C Major',
      bpm: 76,
      energy: 0.45,
      valence: 0.78,
      danceability: 0.38,
      popularity: 88,
      releaseYear: 1971,
      duration: 183,
      spotifyId: '7pKfPomDEeI4TPT6EOYjn9',
      camelot: '8B',
      acousticness: 0.85,
      instrumentalness: 0.02,
      liveness: 0.08,
      loudness: -12.5,
      speechiness: 0.03,
      tempo: 76.1,
      timeSignature: 4,
      mode: 1,
      explicit: false,
      country: 'UK',
      language: 'English'
    },
    {
      id: 4,
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      genre: 'Rock',
      key: 'A Minor',
      bpm: 63,
      energy: 0.92,
      valence: 0.35,
      danceability: 0.28,
      popularity: 94,
      releaseYear: 1971,
      duration: 482,
      spotifyId: '5CQ30WqJwcep0pYcV4AMNc',
      camelot: '8A',
      acousticness: 0.05,
      instrumentalness: 0.45,
      liveness: 0.22,
      loudness: -6.8,
      speechiness: 0.02,
      tempo: 63.3,
      timeSignature: 4,
      mode: 0,
      explicit: false,
      country: 'UK',
      language: 'English'
    },
    {
      id: 5,
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      album: 'Thriller',
      genre: 'Pop',
      key: 'F# Minor',
      bpm: 117,
      energy: 0.88,
      valence: 0.72,
      danceability: 0.95,
      popularity: 96,
      releaseYear: 1982,
      duration: 294,
      spotifyId: '5ChkMS8OtdzJNyy4T0HhTv',
      camelot: '11A',
      acousticness: 0.08,
      instrumentalness: 0.12,
      liveness: 0.15,
      loudness: -5.2,
      speechiness: 0.06,
      tempo: 117.2,
      timeSignature: 4,
      mode: 0,
      explicit: false,
      country: 'USA',
      language: 'English'
    }
  ];

  // אתחול בסיס הנתונים
  useEffect(() => {
    const initializeDatabase = () => {
      setSongs(mockSongs);
      setFilteredSongs(mockSongs);
      calculateDatabaseStats();
    };

    initializeDatabase();
  }, []);

  // חישוב סטטיסטיקות בסיס הנתונים
  const calculateDatabaseStats = () => {
    const stats = {
      totalSongs: songs.length,
      genres: [...new Set(songs.map(song => song.genre))],
      keys: [...new Set(songs.map(song => song.key))],
      averageBPM: songs.reduce((sum, song) => sum + song.bpm, 0) / songs.length,
      averageEnergy: songs.reduce((sum, song) => sum + song.energy, 0) / songs.length,
      averageValence: songs.reduce((sum, song) => sum + song.valence, 0) / songs.length,
      averageDanceability: songs.reduce((sum, song) => sum + song.danceability, 0) / songs.length,
      mostPopularSong: songs.reduce((max, song) => song.popularity > max.popularity ? song : max),
      newestSong: songs.reduce((newest, song) => song.releaseYear > newest.releaseYear ? song : newest),
      oldestSong: songs.reduce((oldest, song) => song.releaseYear < oldest.releaseYear ? song : oldest)
    };
    
    setDatabaseStats(stats);
  };

  // חיפוש וסינון
  useEffect(() => {
    let filtered = songs;

    // חיפוש טקסט
    if (searchQuery) {
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // סינון לפי ז'אנר
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(song => song.genre === selectedGenre);
    }

    // סינון לפי מפתח
    if (selectedKey !== 'all') {
      filtered = filtered.filter(song => song.key === selectedKey);
    }

    // סינון לפי BPM
    if (selectedBPM !== 'all') {
      const [minBPM, maxBPM] = selectedBPM.split('-').map(Number);
      filtered = filtered.filter(song => song.bpm >= minBPM && song.bpm <= maxBPM);
    }

    // מיון
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'bpm':
          return a.bpm - b.bpm;
        case 'energy':
          return b.energy - a.energy;
        case 'valence':
          return b.valence - a.valence;
        case 'danceability':
          return b.danceability - a.danceability;
        case 'releaseYear':
          return b.releaseYear - a.releaseYear;
        default:
          return 0;
      }
    });

    setFilteredSongs(filtered);
  }, [songs, searchQuery, selectedGenre, selectedKey, selectedBPM, sortBy]);

  // ניתוח דמיון לשיר נבחר
  const analyzeSimilarity = (selectedSong) => {
    if (!selectedSong) return;

    const similarities = songs
      .filter(song => song.id !== selectedSong.id)
      .map(song => {
        const similarity = calculateSimilarityScore(selectedSong, song);
        return { ...song, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    setSimilarityAnalysis({
      selectedSong,
      similarSongs: similarities,
      analysis: {
        genreSimilarity: calculateGenreSimilarity(selectedSong, similarities),
        keyCompatibility: calculateKeyCompatibility(selectedSong, similarities),
        tempoCompatibility: calculateTempoCompatibility(selectedSong, similarities),
        moodCompatibility: calculateMoodCompatibility(selectedSong, similarities)
      }
    });
  };

  // חישוב ציון דמיון
  const calculateSimilarityScore = (song1, song2) => {
    const weights = {
      genre: 0.3,
      key: 0.2,
      bpm: 0.15,
      energy: 0.15,
      valence: 0.1,
      danceability: 0.1
    };

    const genreScore = song1.genre === song2.genre ? 1 : 0;
    const keyScore = song1.key === song2.key ? 1 : 0.5;
    const bpmScore = 1 - Math.abs(song1.bpm - song2.bpm) / 200;
    const energyScore = 1 - Math.abs(song1.energy - song2.energy);
    const valenceScore = 1 - Math.abs(song1.valence - song2.valence);
    const danceabilityScore = 1 - Math.abs(song1.danceability - song2.danceability);

    return (
      genreScore * weights.genre +
      keyScore * weights.key +
      bpmScore * weights.bpm +
      energyScore * weights.energy +
      valenceScore * weights.valence +
      danceabilityScore * weights.danceability
    );
  };

  // חישוב דמיון ז'אנר
  const calculateGenreSimilarity = (selectedSong, similarSongs) => {
    const genreCount = {};
    similarSongs.forEach(song => {
      genreCount[song.genre] = (genreCount[song.genre] || 0) + 1;
    });
    
    const mostCommonGenre = Object.keys(genreCount).reduce((a, b) => 
      genreCount[a] > genreCount[b] ? a : b
    );
    
    return {
      mostCommonGenre,
      genreDistribution: genreCount,
      primaryGenreMatch: selectedSong.genre === mostCommonGenre
    };
  };

  // חישוב תאימות מפתח
  const calculateKeyCompatibility = (selectedSong, similarSongs) => {
    const keyCount = {};
    similarSongs.forEach(song => {
      keyCount[song.key] = (keyCount[song.key] || 0) + 1;
    });
    
    const mostCommonKey = Object.keys(keyCount).reduce((a, b) => 
      keyCount[a] > keyCount[b] ? a : b
    );
    
    return {
      mostCommonKey,
      keyDistribution: keyCount,
      keyCompatibility: isKeyCompatible(selectedSong.key, mostCommonKey)
    };
  };

  // בדיקת תאימות מפתח
  const isKeyCompatible = (key1, key2) => {
    const compatibleKeys = {
      'C Major': ['G Major', 'F Major', 'A Minor'],
      'G Major': ['C Major', 'D Major', 'E Minor'],
      'D Major': ['G Major', 'A Major', 'B Minor'],
      'A Major': ['D Major', 'E Major', 'F# Minor'],
      'E Major': ['A Major', 'B Major', 'C# Minor'],
      'B Major': ['E Major', 'F# Major', 'G# Minor'],
      'F Major': ['C Major', 'Bb Major', 'D Minor'],
      'Bb Major': ['F Major', 'Eb Major', 'G Minor'],
      'Eb Major': ['Bb Major', 'Ab Major', 'C Minor'],
      'Ab Major': ['Eb Major', 'Db Major', 'F Minor']
    };
    
    return compatibleKeys[key1]?.includes(key2) || key1 === key2;
  };

  // חישוב תאימות קצב
  const calculateTempoCompatibility = (selectedSong, similarSongs) => {
    const avgBPM = similarSongs.reduce((sum, song) => sum + song.bpm, 0) / similarSongs.length;
    const bpmDifference = Math.abs(selectedSong.bpm - avgBPM);
    
    return {
      averageBPM: avgBPM,
      bpmDifference,
      tempoCompatibility: bpmDifference < 20 ? 'מתאים' : bpmDifference < 40 ? 'בינוני' : 'לא מתאים'
    };
  };

  // חישוב תאימות מצב רוח
  const calculateMoodCompatibility = (selectedSong, similarSongs) => {
    const avgEnergy = similarSongs.reduce((sum, song) => sum + song.energy, 0) / similarSongs.length;
    const avgValence = similarSongs.reduce((sum, song) => sum + song.valence, 0) / similarSongs.length;
    
    const energyDifference = Math.abs(selectedSong.energy - avgEnergy);
    const valenceDifference = Math.abs(selectedSong.valence - avgValence);
    
    return {
      averageEnergy: avgEnergy,
      averageValence: avgValence,
      energyDifference,
      valenceDifference,
      moodCompatibility: (energyDifference + valenceDifference) / 2 < 0.3 ? 'מתאים' : 'לא מתאים'
    };
  };

  // יצירת נתונים מדומים נוספים
  const generateMockData = () => {
    const genres = ['Rock', 'Pop', 'Jazz', 'Blues', 'Country', 'Electronic', 'Hip Hop', 'Classical'];
    const keys = ['C Major', 'G Major', 'D Major', 'A Major', 'E Major', 'B Major', 'F Major', 'Bb Major'];
    const artists = ['The Beatles', 'Pink Floyd', 'David Bowie', 'Bob Dylan', 'Nirvana', 'Radiohead', 'U2', 'Coldplay'];
    
    const newSongs = [];
    for (let i = 6; i <= 50; i++) {
      newSongs.push({
        id: i,
        title: `Song ${i}`,
        artist: artists[Math.floor(Math.random() * artists.length)],
        album: `Album ${Math.floor(Math.random() * 10) + 1}`,
        genre: genres[Math.floor(Math.random() * genres.length)],
        key: keys[Math.floor(Math.random() * keys.length)],
        bpm: Math.floor(Math.random() * 140) + 60,
        energy: Math.random(),
        valence: Math.random(),
        danceability: Math.random(),
        popularity: Math.floor(Math.random() * 100),
        releaseYear: Math.floor(Math.random() * 50) + 1970,
        duration: Math.floor(Math.random() * 300) + 120,
        spotifyId: `spotify:track:${Math.random().toString(36).substr(2, 22)}`,
        camelot: `${Math.floor(Math.random() * 12) + 1}${Math.random() > 0.5 ? 'B' : 'A'}`,
        acousticness: Math.random(),
        instrumentalness: Math.random(),
        liveness: Math.random(),
        loudness: Math.random() * -20 - 10,
        speechiness: Math.random(),
        tempo: Math.floor(Math.random() * 140) + 60,
        timeSignature: Math.floor(Math.random() * 4) + 3,
        mode: Math.floor(Math.random() * 2),
        explicit: Math.random() > 0.8,
        country: Math.random() > 0.5 ? 'USA' : 'UK',
        language: 'English'
      });
    }
    
    setSongs([...mockSongs, ...newSongs]);
  };

  // ייצוא נתונים
  const exportData = (format = 'json') => {
    const data = {
      songs: filteredSongs,
      stats: databaseStats,
      exportDate: new Date().toISOString(),
      totalSongs: filteredSongs.length
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'music-database.json';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const csvContent = convertToCSV(filteredSongs);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'music-database.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // המרה ל-CSV
  const convertToCSV = (songs) => {
    const headers = ['Title', 'Artist', 'Album', 'Genre', 'Key', 'BPM', 'Energy', 'Valence', 'Danceability', 'Popularity'];
    const csvRows = [headers.join(',')];
    
    songs.forEach(song => {
      const row = [
        song.title,
        song.artist,
        song.album,
        song.genre,
        song.key,
        song.bpm,
        song.energy,
        song.valence,
        song.danceability,
        song.popularity
      ].map(field => `"${field}"`).join(',');
      csvRows.push(row);
    });
    
    return csvRows.join('\n');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Database className="w-8 h-8 text-blue-400" />
            בסיס נתוני מוזיקה מתקדם
          </h1>
          <p className="text-xl text-gray-300">
            ניתוח מתקדם של שירים עם נתונים מ-Spotify API וניתוח דמיון
          </p>
        </div>

        {/* סטטיסטיקות בסיס הנתונים */}
        {databaseStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Music className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">סה"כ שירים</h3>
              </div>
              <p className="text-3xl font-bold">{databaseStats.totalSongs}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold">ז'אנרים</h3>
              </div>
              <p className="text-3xl font-bold">{databaseStats.genres.length}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold">BPM ממוצע</h3>
              </div>
              <p className="text-3xl font-bold">{databaseStats.averageBPM.toFixed(0)}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold">פופולריות ממוצעת</h3>
              </div>
              <p className="text-3xl font-bold">
                {(songs.reduce((sum, song) => sum + song.popularity, 0) / songs.length).toFixed(0)}
              </p>
            </div>
          </div>
        )}

        {/* חיפוש וסינון */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">חיפוש</label>
              <input
                type="text"
                placeholder="חיפוש שירים, אמנים, אלבומים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:border-blue-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">ז'אנר</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:border-blue-400"
              >
                <option value="all">כל הז'אנרים</option>
                {databaseStats?.genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">מפתח</label>
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:border-blue-400"
              >
                <option value="all">כל המפתחות</option>
                {databaseStats?.keys.map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">מיון</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:border-blue-400"
              >
                <option value="popularity">פופולריות</option>
                <option value="title">כותרת</option>
                <option value="artist">אמן</option>
                <option value="bpm">BPM</option>
                <option value="energy">אנרגיה</option>
                <option value="valence">Valence</option>
                <option value="danceability">Danceability</option>
                <option value="releaseYear">שנת יציאה</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              סינון מתקדם
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={() => exportData('json')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                ייצוא JSON
              </button>
              <button
                onClick={() => exportData('csv')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg"
              >
                ייצוא CSV
              </button>
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">טווח BPM</label>
                <select
                  value={selectedBPM}
                  onChange={(e) => setSelectedBPM(e.target.value)}
                  className="w-full px-4 py-2 bg-white/20 rounded-lg border border-white/30"
                >
                  <option value="all">כל הטווחים</option>
                  <option value="60-80">60-80 (איטי)</option>
                  <option value="80-100">80-100 (בינוני)</option>
                  <option value="100-120">100-120 (מהיר)</option>
                  <option value="120-140">120-140 (מאוד מהיר)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* רשימת השירים */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">שירים ({filteredSongs.length})</h2>
            <button
              onClick={generateMockData}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              הוסף נתונים מדומים
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-right p-3">שיר</th>
                  <th className="text-right p-3">אמן</th>
                  <th className="text-right p-3">ז'אנר</th>
                  <th className="text-right p-3">מפתח</th>
                  <th className="text-right p-3">BPM</th>
                  <th className="text-right p-3">אנרגיה</th>
                  <th className="text-right p-3">Valence</th>
                  <th className="text-right p-3">Danceability</th>
                  <th className="text-right p-3">פופולריות</th>
                  <th className="text-right p-3">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map(song => (
                  <tr key={song.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-3">
                      <div>
                        <div className="font-semibold">{song.title}</div>
                        <div className="text-sm text-gray-300">{song.album}</div>
                      </div>
                    </td>
                    <td className="p-3">{song.artist}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-600/30 rounded text-sm">
                        {song.genre}
                      </span>
                    </td>
                    <td className="p-3">{song.key}</td>
                    <td className="p-3">{song.bpm}</td>
                    <td className="p-3">{(song.energy * 100).toFixed(0)}%</td>
                    <td className="p-3">{(song.valence * 100).toFixed(0)}%</td>
                    <td className="p-3">{(song.danceability * 100).toFixed(0)}%</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full" 
                            style={{ width: `${song.popularity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{song.popularity}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedSong(song);
                          analyzeSimilarity(song);
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        ניתוח דמיון
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ניתוח דמיון */}
        {similarityAnalysis && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">
              ניתוח דמיון: {similarityAnalysis.selectedSong.title}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* שירים דומים */}
              <div>
                <h3 className="text-xl font-semibold mb-4">שירים דומים</h3>
                <div className="space-y-3">
                  {similarityAnalysis.similarSongs.slice(0, 5).map((song, index) => (
                    <div key={song.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="font-semibold">{song.title}</div>
                        <div className="text-sm text-gray-300">{song.artist}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{(song.similarity * 100).toFixed(1)}%</div>
                        <div className="text-sm text-gray-300">{song.genre}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ניתוח מפורט */}
              <div>
                <h3 className="text-xl font-semibold mb-4">ניתוח מפורט</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">ז'אנר דומיננטי</h4>
                    <p className="text-gray-300">
                      {similarityAnalysis.analysis.genreSimilarity.mostCommonGenre}
                      {similarityAnalysis.analysis.genreSimilarity.primaryGenreMatch && 
                        <span className="text-green-400 ml-2">✓ תואם</span>
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">תאימות מפתח</h4>
                    <p className="text-gray-300">
                      {similarityAnalysis.analysis.keyCompatibility.mostCommonKey}
                      {similarityAnalysis.analysis.keyCompatibility.keyCompatibility && 
                        <span className="text-green-400 ml-2">✓ תואם</span>
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">תאימות קצב</h4>
                    <p className="text-gray-300">
                      BPM ממוצע: {similarityAnalysis.analysis.tempoCompatibility.averageBPM.toFixed(0)}
                      <br />
                      הבדל: {similarityAnalysis.analysis.tempoCompatibility.bpmDifference.toFixed(0)} BPM
                      <br />
                      תאימות: {similarityAnalysis.analysis.tempoCompatibility.tempoCompatibility}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">תאימות מצב רוח</h4>
                    <p className="text-gray-300">
                      אנרגיה ממוצעת: {(similarityAnalysis.analysis.moodCompatibility.averageEnergy * 100).toFixed(0)}%
                      <br />
                      Valence ממוצע: {(similarityAnalysis.analysis.moodCompatibility.averageValence * 100).toFixed(0)}%
                      <br />
                      תאימות: {similarityAnalysis.analysis.moodCompatibility.moodCompatibility}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicDatabase; 