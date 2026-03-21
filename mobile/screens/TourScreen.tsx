import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface TourDate {
  id: string;
  date: string;
  day: string;
  month: string;
  city: string;
  venue: string;
  country: string;
  soldOut: boolean;
  ticketUrl?: string;
  price?: string;
  coordinates: [number, number];
}

const tourDates: TourDate[] = [
  {
    id: 'tour-1',
    date: '2026-04-15',
    day: '15',
    month: 'APR',
    city: 'Ljubljana',
    venue: 'Orto Bar',
    country: 'Slovenija',
    soldOut: false,
    ticketUrl: 'https://eventim.si/the-drinkers',
    price: '15€',
    coordinates: [46.0569, 14.5058],
  },
  {
    id: 'tour-2',
    date: '2026-04-22',
    day: '22',
    month: 'APR',
    city: 'Maribor',
    venue: 'Pekarna Magdalenske mreže',
    country: 'Slovenija',
    soldOut: false,
    ticketUrl: 'https://eventim.si/the-drinkers-mb',
    price: '12€',
    coordinates: [46.5547, 15.6459],
  },
  {
    id: 'tour-3',
    date: '2026-05-03',
    day: '03',
    month: 'MAJ',
    city: 'Koper',
    venue: 'Dvorišče',
    country: 'Slovenija',
    soldOut: true,
    price: '10€',
    coordinates: [45.5481, 13.7301],
  },
  {
    id: 'tour-4',
    date: '2026-05-10',
    day: '10',
    month: 'MAJ',
    city: 'Zagreb',
    venue: 'Močvara',
    country: 'Hrvaška',
    soldOut: false,
    ticketUrl: 'https://eventim.hr/the-drinkers',
    price: '20€',
    coordinates: [45.8150, 15.9819],
  },
  {
    id: 'tour-5',
    date: '2026-05-17',
    day: '17',
    month: 'MAJ',
    city: 'Trieste',
    venue: 'Teatro Miela',
    country: 'Italija',
    soldOut: false,
    ticketUrl: 'https://ticketone.it/the-drinkers',
    price: '18€',
    coordinates: [45.6495, 13.7768],
  },
  {
    id: 'tour-6',
    date: '2026-06-01',
    day: '01',
    month: 'JUN',
    city: 'Vienna',
    venue: 'Arena',
    country: 'Avstrija',
    soldOut: false,
    ticketUrl: 'https://oeticket.com/the-drinkers',
    price: '22€',
    coordinates: [48.2082, 16.3738],
  },
];

export default function TourScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const countries = ['all', ...new Set(tourDates.map(t => t.country))];

  const filteredDates = selectedCountry === 'all'
    ? tourDates
    : tourDates.filter(t => t.country === selectedCountry);

  async function openTicketUrl(url: string) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  }

  function openMaps(coordinates: [number, number]) {
    const url = `https://www.google.com/maps?q=${coordinates[0]},${coordinates[1]}`;
    Linking.openURL(url);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(220, 20, 60, 0.9)', 'rgba(10, 10, 10, 0.95)']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🎫 KONCERTI</Text>
        <Text style={styles.headerSubtitle}>Turneja 2026</Text>
        
        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons 
              name={viewMode === 'list' ? 'list' : 'list-outline'} 
              size={20} 
              color={viewMode === 'list' ? '#ffffff' : '#cccccc'} 
            />
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>
              Seznam
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <Ionicons 
              name={viewMode === 'map' ? 'map' : 'map-outline'} 
              size={20} 
              color={viewMode === 'map' ? '#ffffff' : '#cccccc'} 
            />
            <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>
              Zemljevid
            </Text>
          </TouchableOpacity>
        </View>

        {/* Country Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {countries.map((country) => (
            <TouchableOpacity
              key={country}
              style={[
                styles.filterChip,
                selectedCountry === country && styles.filterChipActive
              ]}
              onPress={() => setSelectedCountry(country)}
            >
              <Text style={[
                styles.filterText,
                selectedCountry === country && styles.filterTextActive
              ]}>
                {country === 'all' ? 'Vsi' : country}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{tourDates.length}</Text>
          <Text style={styles.statLabel}>Koncertov</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{tourDates.filter(t => t.soldOut).length}</Text>
          <Text style={styles.statLabel}>Razprodanih</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{countries.length - 1}</Text>
          <Text style={styles.statLabel}>Držav</Text>
        </View>
      </View>

      {/* Tour Dates List */}
      {viewMode === 'list' ? (
        <View style={styles.tourList}>
          {filteredDates.map((tour) => (
            <View key={tour.id} style={[styles.tourCard, tour.soldOut && styles.tourCardSoldOut]}>
              {/* Date Badge */}
              <View style={styles.dateBadge}>
                <Text style={styles.dateDay}>{tour.day}</Text>
                <Text style={styles.dateMonth}>{tour.month}</Text>
              </View>

              {/* Tour Info */}
              <View style={styles.tourInfo}>
                <Text style={styles.tourCity}>{tour.city}</Text>
                <Text style={styles.tourVenue}>{tour.venue}</Text>
                <View style={styles.tourMeta}>
                  <Ionicons name="location" size={14} color="#dc143c" />
                  <Text style={styles.tourCountry}>{tour.country}</Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.tourActions}>
                {tour.soldOut ? (
                  <View style={styles.soldOutBadge}>
                    <Text style={styles.soldOutText}>RAZPRODANO</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.price}>{tour.price}</Text>
                    <TouchableOpacity
                      style={styles.ticketButton}
                      onPress={() => openTicketUrl(tour.ticketUrl!)}
                    >
                      <Text style={styles.ticketButtonText}>VSTOPNICE</Text>
                    </TouchableOpacity>
                  </>
                )}
                
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => openMaps(tour.coordinates)}
                >
                  <Ionicons name="navigate" size={20} color="#dc143c" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        /* Map View Placeholder */
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={64} color="#333333" />
          <Text style={styles.mapPlaceholderText}>
            Zemljevid bo na voljo kmalu
          </Text>
          <Text style={styles.mapPlaceholderSubtext}>
            {filteredDates.length} koncertov prikazanih
          </Text>
          
          {/* Quick Map Links */}
          <View style={styles.mapLinks}>
            {filteredDates.map((tour) => (
              <TouchableOpacity
                key={tour.id}
                style={styles.mapLink}
                onPress={() => openMaps(tour.coordinates)}
              >
                <Ionicons name="location" size={16} color="#dc143c" />
                <Text style={styles.mapLinkText}>{tour.city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Tour Info */}
      <View style={styles.tourInfoSection}>
        <Text style={styles.sectionTitle}>ℹ️ INFORMACIJE O TURNIJI</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="ticket" size={24} color="#dc143c" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Vstopnice</Text>
              <Text style={styles.infoText}>
                Vstopnice so na voljo na Eventim.si in na vseh prodajnih mestih.
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="accessibility" size={24} color="#dc143c" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Dostopnost</Text>
              <Text style={styles.infoText}>
                Vsi prostori so dostopni invalidskim vozičkom.
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time" size={24} color="#dc143c" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Začetek</Text>
              <Text style={styles.infoText}>
                Vrata se odprejo ob 20:00, koncert ob 21:00.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Newsletter CTA */}
      <View style={styles.newsletterSection}>
        <Text style={styles.newsletterTitle}>📧 OBVESTI ME</Text>
        <Text style={styles.newsletterText}>
          Prijavi se in dobi obvestilo o novih koncertih!
        </Text>
        <TouchableOpacity style={styles.newsletterButton}>
          <Text style={styles.newsletterButtonText}>PRIJAVI SE</Text>
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
    marginBottom: 20,
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#dc143c',
  },
  toggleText: {
    color: '#cccccc',
    fontWeight: '600',
    fontSize: 14,
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  filterScroll: {
    maxHeight: 40,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#dc143c',
  },
  filterText: {
    color: '#cccccc',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc143c',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  tourList: {
    padding: 20,
  },
  tourCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  tourCardSoldOut: {
    opacity: 0.7,
    borderColor: '#dc143c',
  },
  dateBadge: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc143c',
    borderRadius: 10,
    padding: 10,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 3,
  },
  tourInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  tourCity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  tourVenue: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  tourMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tourCountry: {
    fontSize: 12,
    color: '#666666',
  },
  tourActions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10,
  },
  soldOutBadge: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  soldOutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc143c',
  },
  ticketButton: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ticketButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    textAlign: 'center',
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
  },
  mapLinks: {
    marginTop: 30,
    width: '100%',
  },
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 10,
  },
  mapLinkText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  tourInfoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  newsletterSection: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: 'rgba(220, 20, 60, 0.1)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#dc143c',
    alignItems: 'center',
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  newsletterText: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  newsletterButton: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  newsletterButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    marginTop: 20,
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 5,
  },
});
