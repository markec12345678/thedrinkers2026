import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  albumArt: string;
  audioUrl?: string;
  isPreview: boolean;
}

interface Album {
  id: string;
  title: string;
  year: number;
  coverArt: string;
  tracks: Track[];
}

const albums: Album[] = [
  {
    id: 'album-1',
    title: 'Lepi in trezni',
    year: 1995,
    coverArt: 'https://via.placeholder.com/300x300/dc143c/ffffff?text=Lepi+in+trezni',
    tracks: [
      {
        id: 'track-1',
        title: 'Pijemo ga radi',
        album: 'Lepi in trezni',
        duration: '3:45',
        albumArt: 'https://via.placeholder.com/150x150/dc143c/ffffff?text=PGR',
        isPreview: true,
      },
      {
        id: 'track-2',
        title: 'Alkohol je moj idol',
        album: 'Lepi in trezni',
        duration: '2:24',
        albumArt: 'https://via.placeholder.com/150x150/dc143c/ffffff?text=AJMI',
        isPreview: true,
      },
      {
        id: 'track-3',
        title: 'Rjava podmornica',
        album: 'Lepi in trezni',
        duration: '4:38',
        albumArt: 'https://via.placeholder.com/150x150/dc143c/ffffff?text=RP',
        isPreview: true,
      },
    ],
  },
  {
    id: 'album-2',
    title: 'Žeja',
    year: 1997,
    coverArt: 'https://via.placeholder.com/300x300/b91030/ffffff?text=Žeja',
    tracks: [
      {
        id: 'track-4',
        title: 'Deset majhnih jagrov',
        album: 'Žeja',
        duration: '4:05',
        albumArt: 'https://via.placeholder.com/150x150/b91030/ffffff?text=DMJ',
        isPreview: true,
      },
      {
        id: 'track-5',
        title: 'Lit\'r vina',
        album: 'Žeja',
        duration: '3:37',
        albumArt: 'https://via.placeholder.com/150x150/b91030/ffffff?text=LV',
        isPreview: true,
      },
    ],
  },
  {
    id: 'album-3',
    title: 'Recidiv',
    year: 2014,
    coverArt: 'https://via.placeholder.com/300x300/ff3333/ffffff?text=Recidiv',
    tracks: [
      {
        id: 'track-6',
        title: 'Trboule',
        album: 'Recidiv',
        duration: '3:20',
        albumArt: 'https://via.placeholder.com/150x150/ff3333/ffffff?text=T',
        isPreview: true,
      },
      {
        id: 'track-7',
        title: 'Huda baba',
        album: 'Recidiv',
        duration: '3:45',
        albumArt: 'https://via.placeholder.com/150x150/ff3333/ffffff?text=HB',
        isPreview: true,
      },
    ],
  },
];

export default function MusicScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  async function playTrack(track: Track) {
    try {
      // Stop current track
      if (sound) {
        await sound.unloadAsync();
        setIsPlaying(false);
      }

      // If it's the same track, toggle pause/play
      if (currentTrack?.id === track.id && isPlaying) {
        setCurrentTrack(null);
        return;
      }

      // For demo, we'll simulate playback
      // In production, use: await Audio.Sound.createAsync({ uri: track.audioUrl })
      
      setCurrentTrack(track);
      setIsPlaying(true);
      
      // Simulate playback (remove this in production)
      console.log('🎵 Now playing:', track.title);
      
    } catch (error) {
      console.error('Failed to play track:', error);
    }
  }

  async function togglePlayPause() {
    if (!currentTrack) return;

    if (isPlaying) {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  function toggleAlbum(albumId: string) {
    if (expandedAlbum === albumId) {
      setExpandedAlbum(null);
    } else {
      setExpandedAlbum(albumId);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎵 GLASBA</Text>
        <Text style={styles.headerSubtitle}>The Drinkers Diskografija</Text>
      </View>

      {/* Now Playing Bar */}
      {currentTrack && (
        <LinearGradient
          colors={['rgba(220, 20, 60, 0.9)', 'rgba(10, 10, 10, 0.95)']}
          style={styles.nowPlaying}
        >
          <Image source={{ uri: currentTrack.albumArt }} style={styles.nowPlayingArt} />
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingTitle}>{currentTrack.title}</Text>
            <Text style={styles.nowPlayingAlbum}>{currentTrack.album}</Text>
          </View>
          <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={32} 
              color="#ffffff" 
            />
          </TouchableOpacity>
        </LinearGradient>
      )}

      {/* Albums List */}
      <View style={styles.albumsSection}>
        <Text style={styles.sectionTitle}>💿 ALBUMI</Text>
        
        {albums.map((album) => (
          <View key={album.id} style={styles.albumCard}>
            {/* Album Header */}
            <TouchableOpacity 
              style={styles.albumHeader}
              onPress={() => toggleAlbum(album.id)}
            >
              <Image source={{ uri: album.coverArt }} style={styles.albumCover} />
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumYear}>{album.year}</Text>
                <Text style={styles.albumTracks}>{album.tracks.length} skladb</Text>
              </View>
              <Ionicons 
                name={expandedAlbum === album.id ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color="#dc143c" 
              />
            </TouchableOpacity>

            {/* Track List (Expanded) */}
            {expandedAlbum === album.id && (
              <View style={styles.trackList}>
                {album.tracks.map((track, index) => (
                  <TouchableOpacity
                    key={track.id}
                    style={[
                      styles.trackItem,
                      currentTrack?.id === track.id && styles.trackItemActive
                    ]}
                    onPress={() => playTrack(track)}
                  >
                    <View style={styles.trackNumber}>{index + 1}</View>
                    <Image source={{ uri: track.albumArt }} style={styles.trackArt} />
                    <View style={styles.trackInfo}>
                      <Text style={[
                        styles.trackTitle,
                        currentTrack?.id === track.id && styles.trackTitleActive
                      ]}>
                        {track.title}
                      </Text>
                      <Text style={styles.trackDuration}>{track.duration}</Text>
                    </View>
                    <Ionicons 
                      name={currentTrack?.id === track.id && isPlaying ? 'volume-high' : 'musical-note'} 
                      size={20} 
                      color={currentTrack?.id === track.id ? '#dc143c' : '#666666'} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Spotify Integration */}
      <View style={styles.spotifySection}>
        <Text style={styles.sectionTitle}>🎧 POSLUŠAJ NA SPOTIFY</Text>
        <TouchableOpacity style={styles.spotifyButton}>
          <Ionicons name="logo-spotify" size={24} color="#1DB954" />
          <Text style={styles.spotifyButtonText}>Odpri na Spotify</Text>
        </TouchableOpacity>
      </View>

      {/* YouTube Videos */}
      <View style={styles.videosSection}>
        <Text style={styles.sectionTitle}>🎬 VIDEOSPOTI</Text>
        <TouchableOpacity style={styles.videoCard}>
          <Image 
            source={{ uri: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' }} 
            style={styles.videoThumbnail} 
          />
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>Pijemo ga radi (Official Video)</Text>
            <Text style={styles.videoViews}>1.2M ogledov</Text>
          </View>
          <Ionicons name="play-circle" size={50} color="#dc143c" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 The Drinkers</Text>
        <Text style={styles.footerText}>Vse pravice pridržane 🍺</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0a0a0a',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cccccc',
  },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#dc143c',
  },
  nowPlayingArt: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  nowPlayingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nowPlayingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  nowPlayingAlbum: {
    fontSize: 14,
    color: '#cccccc',
  },
  playPauseButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  albumCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  albumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  albumCover: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  albumInfo: {
    flex: 1,
    marginLeft: 15,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  albumYear: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },
  albumTracks: {
    fontSize: 14,
    color: '#666666',
  },
  trackList: {
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  trackItemActive: {
    backgroundColor: 'rgba(220, 20, 60, 0.1)',
  },
  trackNumber: {
    width: 30,
    fontSize: 16,
    color: '#666666',
    fontWeight: 'bold',
  },
  trackArt: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 3,
  },
  trackTitleActive: {
    color: '#dc143c',
  },
  trackDuration: {
    fontSize: 14,
    color: '#666666',
  },
  spotifySection: {
    padding: 20,
  },
  spotifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  spotifyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  videosSection: {
    padding: 20,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  videoThumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  videoViews: {
    fontSize: 14,
    color: '#666666',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 5,
  },
});
