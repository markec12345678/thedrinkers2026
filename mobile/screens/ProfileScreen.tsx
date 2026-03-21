import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface User {
  name: string;
  email: string;
  memberSince: string;
  tier: 'free' | 'vip' | 'og';
  totalSpent: number;
  orders: number;
  points: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'processing' | 'pending';
  items: number;
}

const mockUser: User = {
  name: 'Jan Novak',
  email: 'jan.novak@email.com',
  memberSince: '2024',
  tier: 'vip',
  totalSpent: 127.50,
  orders: 3,
  points: 1275,
};

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-03-15',
    total: 45.00,
    status: 'delivered',
    items: 2,
  },
  {
    id: 'ORD-002',
    date: '2026-03-10',
    total: 52.50,
    status: 'delivered',
    items: 3,
  },
  {
    id: 'ORD-003',
    date: '2026-03-05',
    total: 30.00,
    status: 'processing',
    items: 1,
  },
];

export default function ProfileScreen() {
  const [user] = useState<User>(mockUser);
  const [orders] = useState<Order[]>(mockOrders);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function getTierBadge(tier: string) {
    switch (tier) {
      case 'og':
        return { icon: '👑', color: '#FFD700', label: 'OG Member' };
      case 'vip':
        return { icon: '⭐', color: '#dc143c', label: 'VIP Member' };
      default:
        return { icon: '🎫', color: '#666666', label: 'Free Member' };
    }
  }

  function getProgressToNextTier() {
    if (user.tier === 'og') return 100;
    if (user.tier === 'vip') {
      return Math.min((user.totalSpent / 200) * 100, 100);
    }
    return Math.min((user.totalSpent / 50) * 100, 100);
  }

  function getNextTierGoal() {
    if (user.tier === 'free') return 50;
    if (user.tier === 'vip') return 200;
    return 0;
  }

  function handleLogin() {
    Alert.alert(
      'Prijava',
      'Preusmerjeni boste na prijavo.',
      [
        { text: 'Prekliči', style: 'cancel' },
        { text: 'Prijava', onPress: () => setIsLoggedIn(true) }
      ]
    );
  }

  function handleLogout() {
    Alert.alert(
      'Odjava',
      'Ali ste prepričani?',
      [
        { text: 'Prekliči', style: 'cancel' },
        { text: 'Odjava', style: 'destructive', onPress: () => setIsLoggedIn(false) }
      ]
    );
  }

  function openSettings() {
    Alert.alert('Nastavitve', 'Nastavitve bodo kmalu na voljo');
  }

  function openOrderDetails(orderId: string) {
    Alert.alert('Naročilo', `Podrobnosti za ${orderId}`);
  }

  const tierBadge = getTierBadge(user.tier);
  const progress = getProgressToNextTier();
  const nextGoal = getNextTierGoal();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Profile */}
      <LinearGradient
        colors={['rgba(220, 20, 60, 0.9)', 'rgba(10, 10, 10, 0.95)']}
        style={styles.header}
      >
        {/* Settings Button */}
        <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
          <Ionicons name="settings" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Ionicons name="person" size={60} color="#ffffff" />
          </View>
          
          {/* Tier Badge */}
          <View style={[styles.tierBadge, { backgroundColor: tierBadge.color }]}>
            <Text style={styles.tierBadgeIcon}>{tierBadge.icon}</Text>
          </View>
        </View>

        {/* User Info */}
        <Text style={styles.userName}>{isLoggedIn ? user.name : 'Gost'}</Text>
        <Text style={styles.userEmail}>{isLoggedIn ? user.email : 'Prijavi se za dostop'}</Text>
        <Text style={styles.memberSince}>{isLoggedIn ? `Član od ${user.memberSince}` : ''}</Text>

        {/* Membership Progress */}
        {isLoggedIn && user.tier !== 'og' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Napredek do {user.tier === 'free' ? 'VIP' : 'OG'}</Text>
              <Text style={styles.progressPercent}>{progress.toFixed(0)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${progress}%`, backgroundColor: tierBadge.color }]} 
              />
            </View>
            <Text style={styles.progressText}>
              Porabljenih €{user.totalSpent.toFixed(2)} od €{nextGoal}
            </Text>
          </View>
        )}

        {/* Login/Logout Button */}
        <TouchableOpacity 
          style={styles.authButton}
          onPress={isLoggedIn ? handleLogout : handleLogin}
        >
          <Ionicons 
            name={isLoggedIn ? 'log-out-outline' : 'log-in-outline'} 
            size={20} 
            color="#ffffff" 
          />
          <Text style={styles.authButtonText}>
            {isLoggedIn ? 'ODJAVA' : 'PRIJAVA'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Stats Cards */}
      {isLoggedIn && (
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="wallet" size={24} color="#dc143c" />
            <Text style={styles.statNumber}>€{user.totalSpent.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Porabljeno</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="bag" size={24} color="#dc143c" />
            <Text style={styles.statNumber}>{user.orders}</Text>
            <Text style={styles.statLabel}>Naročil</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color="#dc143c" />
            <Text style={styles.statNumber}>{user.points}</Text>
            <Text style={styles.statLabel}>Točk</Text>
          </View>
        </View>
      )}

      {/* Membership Benefits */}
      {isLoggedIn && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎁 TVOJE UGODNOSTI</Text>
          <View style={styles.benefitsCard}>
            {user.tier === 'free' && (
              <>
                <View style={styles.benefitItem}>
                  <Ionicons name="close-circle" size={20} color="#666666" />
                  <Text style={styles.benefitTextDisabled}>Dostop do /bar</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="close-circle" size={20} color="#666666" />
                  <Text style={styles.benefitTextDisabled}>Popust na merch</Text>
                </View>
                <TouchableOpacity style={styles.upgradeButton}>
                  <Text style={styles.upgradeButtonText}>NADGRADI NA VIP</Text>
                </TouchableOpacity>
              </>
            )}
            
            {user.tier === 'vip' && (
              <>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#dc143c" />
                  <Text style={styles.benefitText}>Dostop do /bar</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#dc143c" />
                  <Text style={styles.benefitText}>10% popust na merch</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#dc143c" />
                  <Text style={styles.benefitText}>Zgodnji dostop do vstopnic</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="close-circle" size={20} color="#666666" />
                  <Text style={styles.benefitTextDisabled}>20% popust</Text>
                </View>
                <TouchableOpacity style={styles.upgradeButton}>
                  <Text style={styles.upgradeButtonText}>NADGRADI NA OG</Text>
                </TouchableOpacity>
              </>
            )}
            
            {user.tier === 'og' && (
              <>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#FFD700" />
                  <Text style={styles.benefitTextGold}>Vse VIP ugodnosti</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#FFD700" />
                  <Text style={styles.benefitTextGold}>20% popust na merch</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#FFD700" />
                  <Text style={styles.benefitTextGold}>Free shipping</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#FFD700" />
                  <Text style={styles.benefitTextGold}>Meet & Greet dostop</Text>
                </View>
                <View style={styles.ogBadge}>
                  <Text style={styles.ogBadgeText}>👑 OG ČLAN</Text>
                </View>
              </>
            )}
          </View>
        </View>
      )}

      {/* Recent Orders */}
      {isLoggedIn && orders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 ZADNJA NAROČILA</Text>
          {orders.map((order) => (
            <TouchableOpacity 
              key={order.id} 
              style={styles.orderCard}
              onPress={() => openOrderDetails(order.id)}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{order.id}</Text>
                <View style={[
                  styles.statusBadge,
                  order.status === 'delivered' && styles.statusDelivered,
                  order.status === 'processing' && styles.statusProcessing,
                  order.status === 'pending' && styles.statusPending,
                ]}>
                  <Text style={styles.statusText}>
                    {order.status === 'delivered' ? 'DOSTAVLJENO' : 
                     order.status === 'processing' ? 'V OBRATNAVI' : 'ČAKA'}
                  </Text>
                </View>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString('sl-SI')}</Text>
                <Text style={styles.orderItems}>{order.items} izdelkov</Text>
                <Text style={styles.orderTotal}>€{order.total.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>POGLEJ VSA NAROČILA</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ HITRI LINKI</Text>
        <View style={styles.linksGrid}>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="musical-notes" size={24} color="#dc143c" />
            <Text style={styles.linkText}>Glasba</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="calendar" size={24} color="#dc143c" />
            <Text style={styles.linkText}>Koncerti</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="shirt" size={24} color="#dc143c" />
            <Text style={styles.linkText}>Merch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="beer" size={24} color="#dc143c" />
            <Text style={styles.linkText}>Fan Club</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❓ PODPORA</Text>
        <TouchableOpacity style={styles.supportItem}>
          <Ionicons name="mail-outline" size={24} color="#cccccc" />
          <Text style={styles.supportText}>Kontaktiraj nas</Text>
          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportItem}>
          <Ionicons name="help-circle-outline" size={24} color="#cccccc" />
          <Text style={styles.supportText}>Pogosta vprašanja</Text>
          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportItem}>
          <Ionicons name="document-text-outline" size={24} color="#cccccc" />
          <Text style={styles.supportText}>Pogoji uporabe</Text>
          <Ionicons name="chevron-forward" size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>The Drinkers App v1.0.0</Text>
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
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#0a0a0a',
  },
  tierBadgeIcon: {
    fontSize: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
  },
  authButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc143c',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  benefitsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#ffffff',
  },
  benefitTextDisabled: {
    fontSize: 14,
    color: '#666666',
  },
  benefitTextGold: {
    fontSize: 14,
    color: '#FFD700',
  },
  upgradeButton: {
    backgroundColor: '#dc143c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ogBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  ogBadgeText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusDelivered: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  statusProcessing: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  statusPending: {
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  orderItems: {
    fontSize: 14,
    color: '#666666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc143c',
  },
  viewAllButton: {
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dc143c',
  },
  viewAllButtonText: {
    color: '#dc143c',
    fontWeight: 'bold',
    fontSize: 14,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  linkItem: {
    width: '22%',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  linkText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  supportText: {
    flex: 1,
    color: '#ffffff',
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
