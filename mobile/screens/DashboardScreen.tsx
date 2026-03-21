import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Venue {
  id: string;
  city: string;
  venue: string;
  date: string;
  capacity: number;
  sold: number;
  price: number;
  viewers: number;
  trending: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: number;
  current: number;
  deadline: string;
  reward: string;
  active: boolean;
}

const venues: Venue[] = [
  {
    id: 'venue-1',
    city: 'Ljubljana',
    venue: 'Orto Bar',
    date: '2026-04-15',
    capacity: 500,
    sold: 347,
    price: 15,
    viewers: 45,
    trending: true,
  },
  {
    id: 'venue-2',
    city: 'Maribor',
    venue: 'Pekarna',
    date: '2026-04-22',
    capacity: 400,
    sold: 289,
    price: 12,
    viewers: 23,
    trending: true,
  },
  {
    id: 'venue-3',
    city: 'Koper',
    venue: 'Dvorišče',
    date: '2026-05-03',
    capacity: 350,
    sold: 350,
    price: 10,
    viewers: 0,
    trending: false,
  },
  {
    id: 'venue-4',
    city: 'Zagreb',
    venue: 'Močvara',
    date: '2026-05-10',
    capacity: 600,
    sold: 412,
    price: 20,
    viewers: 31,
    trending: false,
  },
  {
    id: 'venue-5',
    city: 'Trieste',
    venue: 'Teatro Miela',
    date: '2026-05-17',
    capacity: 350,
    sold: 198,
    price: 18,
    viewers: 12,
    trending: false,
  },
  {
    id: 'venue-6',
    city: 'Vienna',
    venue: 'Arena',
    date: '2026-06-01',
    capacity: 500,
    sold: 156,
    price: 22,
    viewers: 67,
    trending: true,
  },
];

const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Weekend Warrior',
    description: 'Sell 50 tickets this weekend → Unlock acoustic livestream!',
    goal: 50,
    current: 37,
    deadline: '2026-03-23T23:59:59',
    reward: 'Acoustic Livestream',
    active: true,
  },
  {
    id: 'challenge-2',
    title: 'Sell Out Ljubljana',
    description: 'Help us sell out Orto Bar! Only 153 tickets left!',
    goal: 500,
    current: 347,
    deadline: '2026-04-14T20:00:00',
    reward: 'Exclusive Backstage Access',
    active: true,
  },
];

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    // Update challenge countdown every second
    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(challenges[0].deadline);
      const diff = deadline.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalCapacity = venues.reduce((sum, v) => sum + v.capacity, 0);
  const totalSold = venues.reduce((sum, v) => sum + v.sold, 0);
  const totalRevenue = venues.reduce((sum, v) => sum + (v.sold * v.price), 0);
  const tourGoal = 50000;
  const tourProgress = (totalRevenue / tourGoal) * 100;

  const sortedVenues = [...venues].sort((a, b) => 
    (b.sold / b.capacity) - (a.sold / a.capacity)
  );

  function getPercentage(sold: number, capacity: number) {
    return Math.round((sold / capacity) * 100);
  }

  function getRevenue(sold: number, price: number) {
    return sold * price;
  }

  function handleBuyTickets(venueId: string) {
    const venue = venues.find(v => v.id === venueId);
    if (venue) {
      Alert.alert(
        `Buy Tickets - ${venue.city}`,
        `${venue.venue}\n${venue.date}\n\nOnly ${venue.capacity - venue.sold} tickets remaining!`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Buy Now', onPress: () => Alert.alert('Redirecting to ticket purchase...') }
        ]
      );
    }
  }

  function handleShare(venue: Venue) {
    Alert.alert('Share', `Help us sell out ${venue.city}! Only ${venue.capacity - venue.sold} tickets left!`);
  }

  function handleChallengeShare(challenge: Challenge) {
    Alert.alert('Share Challenge', `${challenge.title}\n\n${challenge.description}`);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(220, 20, 60, 0.9)', 'rgba(10, 10, 10, 0.95)']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>📊 TOUR DASHBOARD</Text>
        <Text style={styles.headerSubtitle}>Real-Time Tour Revenue & Fan Engagement</Text>
      </LinearGradient>

      {/* Tour Goal Thermometer */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 TOUR GOAL</Text>
        <View style={styles.thermometerCard}>
          <View style={styles.thermometerHeader}>
            <Text style={styles.thermometerLabel}>Total Raised</Text>
            <Text style={styles.thermometerAmount}>€{totalRevenue.toLocaleString()}</Text>
          </View>
          
          <View style={styles.thermometerTrack}>
            <View 
              style={[
                styles.thermometerFill, 
                { width: `${Math.min(tourProgress, 100)}%` }
              ]} 
            />
          </View>
          
          <View style={styles.thermometerStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{getPercentage(totalSold, totalCapacity)}%</Text>
              <Text style={styles.statLabel}>Sold</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalSold.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Tickets</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalCapacity.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Capacity</Text>
            </View>
          </View>
          
          <Text style={styles.thermometerGoal}>Goal: €{tourGoal.toLocaleString()}</Text>
        </View>
      </View>

      {/* Venue Leaderboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 VENUE LEADERBOARD</Text>
        <Text style={styles.sectionSubtitle}>Ranked by % sold</Text>
        
        {sortedVenues.map((venue, index) => {
          const percentage = getPercentage(venue.sold, venue.capacity);
          const revenue = getRevenue(venue.sold, venue.price);
          const remaining = venue.capacity - venue.sold;
          const isSoldOut = remaining === 0;
          
          return (
            <TouchableOpacity
              key={venue.id}
              style={[styles.venueCard, venue.trending && styles.venueCardTrending]}
              onPress={() => handleBuyTickets(venue.id)}
              activeOpacity={0.7}
            >
              {/* Rank Badge */}
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </Text>
              </View>
              
              {/* Venue Info */}
              <View style={styles.venueInfo}>
                <View style={styles.venueHeader}>
                  <Text style={styles.venueCity}>{venue.city}</Text>
                  {venue.trending && (
                    <View style={styles.trendingBadge}>
                      <Ionicons name="flame" size={14} color="#ff6b35" />
                      <Text style={styles.trendingText}>Hot</Text>
                    </View>
                  )}
                  {isSoldOut && (
                    <View style={styles.soldOutBadge}>
                      <Text style={styles.soldOutText}>SOLD OUT</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.venueName}>{venue.venue}</Text>
                <Text style={styles.venueDate}>{new Date(venue.date).toLocaleDateString('sl-SI')}</Text>
                
                {/* Progress Bar */}
                <View style={styles.venueProgress}>
                  <View style={styles.venueProgressTrack}>
                    <View 
                      style={[
                        styles.venueProgressFill,
                        { width: `${percentage}%`, backgroundColor: percentage >= 70 ? '#dc143c' : '#ff6b35' }
                      ]} 
                    />
                  </View>
                  <Text style={styles.venueProgressText}>{percentage}%</Text>
                </View>
                
                {/* Stats Row */}
                <View style={styles.venueStats}>
                  <Text style={styles.venueStat}>{venue.sold}/{venue.capacity} tickets</Text>
                  {!isSoldOut && (
                    <>
                      <Text style={styles.venueStat}>•</Text>
                      <Text style={styles.venueStatRemaining}>{remaining} left</Text>
                      <Text style={styles.venueStat}>•</Text>
                      <Text style={styles.venueStatViewers}>🔥 {venue.viewers} viewing</Text>
                    </>
                  )}
                </View>
                
                {/* Revenue */}
                <Text style={styles.venueRevenue}>€{revenue.toLocaleString()} revenue</Text>
              </View>
              
              {/* Action Buttons */}
              {!isSoldOut && (
                <View style={styles.venueActions}>
                  <TouchableOpacity 
                    style={styles.buyButton}
                    onPress={() => handleBuyTickets(venue.id)}
                  >
                    <Text style={styles.buyButtonText}>BUY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.shareButton}
                    onPress={() => handleShare(venue)}
                  >
                    <Ionicons name="share-social" size={20} color="#dc143c" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Fan Challenges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 FAN CHALLENGES</Text>
        
        {challenges.map((challenge) => {
          const progress = (challenge.current / challenge.goal) * 100;
          
          return (
            <View key={challenge.id} style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                {challenge.active && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeText}>ACTIVE</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.challengeDescription}>{challenge.description}</Text>
              
              {/* Progress */}
              <View style={styles.challengeProgress}>
                <View style={styles.challengeProgressTrack}>
                  <View 
                    style={[
                      styles.challengeProgressFill,
                      { width: `${Math.min(progress, 100)}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.challengeProgressText}>
                  {challenge.current}/{challenge.goal} ({Math.round(progress)}%)
                </Text>
              </View>
              
              {/* Reward & Deadline */}
              <View style={styles.challengeFooter}>
                <View style={styles.challengeReward}>
                  <Ionicons name="gift" size={16} color="#dc143c" />
                  <Text style={styles.challengeRewardText}>Reward: {challenge.reward}</Text>
                </View>
                <View style={styles.challengeDeadline}>
                  <Ionicons name="time" size={16} color="#ff6b35" />
                  <Text style={styles.challengeDeadlineText}>⏰ {timeRemaining}</Text>
                </View>
              </View>
              
              {/* Share Button */}
              <TouchableOpacity 
                style={styles.challengeShareButton}
                onPress={() => handleChallengeShare(challenge)}
              >
                <Ionicons name="share-social" size={18} color="#ffffff" />
                <Text style={styles.challengeShareButtonText}>SHARE CHALLENGE</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.quickStatItem}>
          <Ionicons name="people" size={24} color="#dc143c" />
          <Text style={styles.quickStatValue}>{venues.reduce((sum, v) => sum + v.viewers, 0)}</Text>
          <Text style={styles.quickStatLabel}>Fans Viewing</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Ionicons name="ticket" size={24} color="#dc143c" />
          <Text style={styles.quickStatValue}>{totalCapacity - totalSold}</Text>
          <Text style={styles.quickStatLabel}>Tickets Left</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Ionicons name="calendar" size={24} color="#dc143c" />
          <Text style={styles.quickStatValue}>{venues.length}</Text>
          <Text style={styles.quickStatLabel}>Venues</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Data updates every 60 seconds</Text>
        <Text style={styles.footerText}>Last updated: {new Date().toLocaleTimeString('sl-SI')}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={() => setRefreshing(true)}>
          <Ionicons name="refresh" size={20} color="#ffffff" />
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  section: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  thermometerCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dc143c',
  },
  thermometerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  thermometerLabel: {
    fontSize: 16,
    color: '#cccccc',
  },
  thermometerAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dc143c',
  },
  thermometerTrack: {
    height: 20,
    backgroundColor: '#333333',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  thermometerFill: {
    height: '100%',
    backgroundColor: '#dc143c',
    borderRadius: 10,
  },
  thermometerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 3,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#333333',
  },
  thermometerGoal: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  venueCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  venueCardTrending: {
    borderColor: '#ff6b35',
    borderWidth: 2,
  },
  rankBadge: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 32,
  },
  venueInfo: {
    flex: 1,
    marginLeft: 10,
  },
  venueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  venueCity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendingText: {
    color: '#ff6b35',
    fontSize: 12,
    fontWeight: 'bold',
  },
  soldOutBadge: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  soldOutText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  venueName: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 3,
  },
  venueDate: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
  },
  venueProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  venueProgressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  venueProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  venueProgressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    width: 40,
    textAlign: 'right',
  },
  venueStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  venueStat: {
    fontSize: 12,
    color: '#666666',
  },
  venueStatRemaining: {
    fontSize: 12,
    color: '#ff6b35',
    fontWeight: '600',
  },
  venueStatViewers: {
    fontSize: 12,
    color: '#dc143c',
    fontWeight: '600',
  },
  venueRevenue: {
    fontSize: 14,
    color: '#dc143c',
    fontWeight: 'bold',
  },
  venueActions: {
    justifyContent: 'center',
    gap: 10,
  },
  buyButton: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  activeBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  challengeProgressTrack: {
    flex: 1,
    height: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: '#dc143c',
    borderRadius: 5,
  },
  challengeProgressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    width: 80,
    textAlign: 'right',
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  challengeReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeRewardText: {
    color: '#dc143c',
    fontSize: 14,
    fontWeight: '600',
  },
  challengeDeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeDeadlineText: {
    color: '#ff6b35',
    fontSize: 14,
    fontWeight: 'bold',
  },
  challengeShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#dc143c',
    padding: 12,
    borderRadius: 10,
  },
  challengeShareButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc143c',
    marginTop: 5,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 3,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666666',
    fontSize: 12,
    marginBottom: 3,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
