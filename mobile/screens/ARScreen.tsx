import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';

interface Song {
  id: string;
  title: string;
  album: string;
  year: number;
  lyrics: string;
  story: string;
  spotifyUrl: string;
  duration: string;
}

const songDatabase: Song[] = [
  {
    id: 'song-1',
    title: 'Pijemo ga radi',
    album: 'Lepi in trezni',
    year: 1995,
    duration: '3:45',
    lyrics: `[Kitica 1]
Pijemo ga radi, to vsi vemo
Zaradi tega se imamo radi
Ko pride petek, vsi vemo kam
V Orto bar, kjer je naš dom

[Refren]
Pijemo ga radi, pijemo ga vsi
Zaradi tega smo najboljši fani
The Drinkers, The Drinkers
To je naš bend!

[Kitica 2]
Ko pridejo naši, vsi vemo kaj
Bo rock'n'roll, do jutra dan
Zaradi tega se imamo radi
The Drinkers, za vedno mladi`,
    story: `Ta pesem je postala himna The Drinkers. Nastala je leta 1995, ko so se člani benda vsak petek dobivali v Orto Baru. "Pijemo ga radi" ni samo o pijači - gre za prijateljstvo, skupnost in ljubezen do glasbe. Pesem je postala tako priljubljena, da so jo morali dodati na setlisto vsakega koncerta.`,
    spotifyUrl: 'https://open.spotify.com/track/xxx',
  },
  {
    id: 'song-2',
    title: 'Deset majhnih jagrov',
    album: 'Lepi in trezni',
    year: 1995,
    duration: '4:05',
    lyrics: `[Kitica 1]
Deset majhnih jagrov, na mizi stoji
Vsak po vrsti pride, vsak te razveseli
Prvi je za srečo, drugi je za zdravje
Tretji je za ljubico, ki te rada ima

[Refren]
Deset majhnih jagrov, to je naša pot
Deset majhnih jagrov, do jutra bo dolg noč
Deset majhnih jagrov, The Drinkers igrajo
Deset majhnih jagrov, vsi skupaj pojemo`,
    story: `Inspirirana ob tradicionalni slovenski zdravici. Avtor besedila je opisal večer, ko so se zbrali s prijatelji in vsak jager predstavil drugo željo. Pesem je postala obvezna na porokah in rojstnodnevnih zabavah po vsej Sloveniji.`,
    spotifyUrl: 'https://open.spotify.com/track/xxx',
  },
  {
    id: 'song-3',
    title: 'Rjava podmornica',
    album: 'Pivolucija',
    year: 1999,
    duration: '4:38',
    lyrics: `[Kitica 1]
Rjava podmornica, pluje po mizi
Kapitan jo krmi, z zlatim tekočinam
Potaplja se globoko, v naše grlo
Prinaša srečo, vsem na mizi

[Refren]
Rjava podmornica, to je naše pivo
Rjava podmornica, pijemo ga živo
Rjava podmornica, The Drinkers pojejo
Rjava podmornica, vsi skupaj pijejo`,
    story: `Metafora za pivo kot "rjava podmornica" je nastala med turnejo po Hrvaški. Kitarist Simon je opazil, kako pivo "potone" v grlu kot podmornica. Pesem je postala eden največjih hitov benda in se redno izvaja na vsakem koncertu.`,
    spotifyUrl: 'https://open.spotify.com/track/xxx',
  },
];

export default function ARScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [recognizedSong, setRecognizedSong] = useState<Song | null>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function startListening() {
    setIsListening(true);
    setScanProgress(0);
    
    // Simulate audio recognition progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          recognizeSong();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  }

  function recognizeSong() {
    // In production: Use audio fingerprinting API
    // For demo: Randomly select a song
    const randomSong = songDatabase[Math.floor(Math.random() * songDatabase.length)];
    setRecognizedSong(randomSong);
    setIsListening(false);
    setIsARActive(true);
    
    // Haptic feedback
    Alert.alert(
      '🎵 Pesem Prepoznana!',
      `${randomSong.title} - ${randomSong.album} (${randomSong.year})`,
      [
        { text: 'Besedilo', onPress: () => setShowLyrics(true) },
        { text: 'Zgodba', onPress: () => setShowStory(true) },
        { text: 'V redu', style: 'cancel' }
      ]
    );
  }

  function stopListening() {
    setIsListening(false);
    setScanProgress(0);
  }

  function openSpotify() {
    if (recognizedSong?.spotifyUrl) {
      Linking.openURL(recognizedSong.spotifyUrl);
    }
  }

  function shareToInstagram() {
    Alert.alert('Share to Instagram', 'Opening Instagram Stories...');
    // In production: Use Instagram sharing API
  }

  function speakLyrics() {
    if (recognizedSong) {
      Speech.speak(recognizedSong.lyrics.substring(0, 200), {
        language: 'sl-SI',
        pitch: 1.0,
        rate: 0.9,
      });
    }
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={() => Alert.alert('Enable camera in settings')}>
          <Text style={styles.permissionButtonText}>Enable Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <Camera style={styles.camera} type="back" ref={cameraRef} />
      
      {/* AR Overlay */}
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎵 AR Experience</Text>
          <TouchableOpacity onPress={() => Alert.alert('Help', 'Point your camera at the stage to recognize songs!')}>
            <Ionicons name="help-circle-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Listening Indicator */}
        {isListening && (
          <View style={styles.listeningIndicator}>
            <View style={styles.progressRing}>
              <Text style={styles.progressText}>{scanProgress}%</Text>
            </View>
            <Text style={styles.listeningText}>Poslušam...</Text>
            <Text style={styles.listeningSubtext}>Uperi telefon v oder</Text>
          </View>
        )}

        {/* Recognized Song Overlay */}
        {isARActive && recognizedSong && (
          <View style={styles.songOverlay}>
            <View style={styles.songCard}>
              <View style={styles.songHeader}>
                <View style={styles.nowPlayingBadge}>
                  <Ionicons name="musical-notes" size={16} color="#ffffff" />
                  <Text style={styles.nowPlayingText}>NOW PLAYING</Text>
                </View>
                <TouchableOpacity onPress={() => { setIsARActive(false); setRecognizedSong(null); }}>
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.songTitle}>{recognizedSong.title}</Text>
              <Text style={styles.songAlbum}>{recognizedSong.album} • {recognizedSong.year}</Text>
              <Text style={styles.songDuration}>⏱ {recognizedSong.duration}</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton} onPress={() => setShowLyrics(true)}>
                  <Ionicons name="document-text" size={24} color="#ffffff" />
                  <Text style={styles.actionButtonText}>Besedilo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={() => setShowStory(true)}>
                  <Ionicons name="book" size={24} color="#ffffff" />
                  <Text style={styles.actionButtonText}>Zgodba</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={openSpotify}>
                  <Ionicons name="logo-spotify" size={24} color="#ffffff" />
                  <Text style={styles.actionButtonText}>Spotify</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={shareToInstagram}>
                  <Ionicons name="share-social" size={24} color="#ffffff" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Listen Button */}
        {!isARActive && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.listenButton, isListening && styles.listenButtonActive]}
              onPress={isListening ? stopListening : startListening}
            >
              <Ionicons 
                name={isListening ? 'stop-circle' : 'mic-circle'} 
                size={60} 
                color="#ffffff" 
              />
            </TouchableOpacity>
            <Text style={styles.listenButtonText}>
              {isListening ? 'Tap to Stop' : 'Tap to Listen'}
            </Text>
            <Text style={styles.listenButtonSubtext}>
              Point camera at stage to recognize song
            </Text>
          </View>
        )}

        {/* Manual Song Selection (Fallback) */}
        <View style={styles.manualSelection}>
          <Text style={styles.manualText}>Or select manually:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {songDatabase.map((song) => (
              <TouchableOpacity
                key={song.id}
                style={styles.manualSongChip}
                onPress={() => {
                  setRecognizedSong(song);
                  setIsARActive(true);
                }}
              >
                <Text style={styles.manualSongText}>{song.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Lyrics Modal */}
      <Modal visible={showLyrics} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📝 {recognizedSong?.title}</Text>
              <TouchableOpacity onPress={() => setShowLyrics(false)}>
                <Ionicons name="close" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.lyricsScroll}>
              <Text style={styles.lyricsText}>{recognizedSong?.lyrics}</Text>
            </ScrollView>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalActionButton} onPress={speakLyrics}>
                <Ionicons name="volume-high" size={20} color="#ffffff" />
                <Text style={styles.modalActionText}>Poslušaj</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalActionButton} onPress={shareToInstagram}>
                <Ionicons name="share-social" size={20} color="#ffffff" />
                <Text style={styles.modalActionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Story Modal */}
      <Modal visible={showStory} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📖 Zgodba Pesmi</Text>
              <TouchableOpacity onPress={() => setShowStory(false)}>
                <Ionicons name="close" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.storyScroll}>
              <Text style={styles.storyText}>{recognizedSong?.story}</Text>
            </ScrollView>
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalActionButton} onPress={() => setShowStory(false)}>
                <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                <Text style={styles.modalActionText}>V redu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 18,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  listeningIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    alignItems: 'center',
  },
  progressRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#dc143c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  listeningText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  listeningSubtext: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 5,
  },
  songOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  songCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#dc143c',
  },
  songHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  nowPlayingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc143c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 6,
  },
  nowPlayingText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  songTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  songAlbum: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },
  songDuration: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  listenButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(220, 20, 60, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  listenButtonActive: {
    backgroundColor: 'rgba(220, 20, 60, 0.5)',
    borderColor: '#dc143c',
  },
  listenButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  listenButtonSubtext: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 5,
  },
  manualSelection: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  manualText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  manualSongChip: {
    backgroundColor: 'rgba(220, 20, 60, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  manualSongText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lyricsScroll: {
    maxHeight: 400,
  },
  lyricsText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 28,
    fontFamily: 'monospace',
  },
  storyScroll: {
    maxHeight: 400,
  },
  storyText: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 26,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    gap: 10,
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#dc143c',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  modalActionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  permissionButton: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
