import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['rgba(220, 20, 60, 0.8)', 'rgba(10, 10, 10, 0.9)']}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>THE DRINKERS</Text>
        <Text style={styles.heroSubtitle}>Slovenian Booze Rock Band</Text>
        <Text style={styles.heroDescription}>Est. 1993 in Litija. Pijemo ga radi! 🍺</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Tour')}
          >
            <Text style={styles.buttonText}>🎫 VSTOPNICE</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => navigation.navigate('Music')}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>🎵 POSLUŠAJ</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Latest News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📰 ZADNJE NOVICE</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nova Turneja 2026</Text>
          <Text style={styles.cardDescription}>
            Objavili smo datume za našo največjo turnejo doslej! 
            Obiščemo 15 mest po Sloveniji in sosednjih državah.
          </Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>PREBERI VEČ →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ HITRI LINKI</Text>
        <View style={styles.grid}>
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('Tour')}
          >
            <Text style={styles.gridIcon}>🎸</Text>
            <Text style={styles.gridText}>Koncerti</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('Music')}
          >
            <Text style={styles.gridIcon}>💿</Text>
            <Text style={styles.gridText}>Albumi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('Merch')}
          >
            <Text style={styles.gridIcon}>👕</Text>
            <Text style={styles.gridText}>Merch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.gridIcon}>🍺</Text>
            <Text style={styles.gridText}>Fan Club</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 SLEDI NAM</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>📷 Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>📘 Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>🎵 TikTok</Text>
          </TouchableOpacity>
        </View>
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
  hero: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#ffffff',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    marginBottom: 15,
  },
  linkButton: {
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#dc143c',
    fontWeight: 'bold',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  gridItem: {
    width: '45%',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  gridIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  gridText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  socialText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
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
