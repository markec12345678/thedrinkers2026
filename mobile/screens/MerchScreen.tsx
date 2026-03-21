import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Pijemo ga radi T-Shirt',
    price: 25.00,
    category: 'Majice',
    image: 'https://via.placeholder.com/300x300/dc143c/ffffff?text=PGR+T-Shirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Crimson'],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'The Drinkers Hoodie',
    price: 55.00,
    originalPrice: 65.00,
    category: 'Hoodies',
    image: 'https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey'],
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-3',
    name: 'Lepi in trezni Vinyl',
    price: 35.00,
    category: 'Vinyl',
    image: 'https://via.placeholder.com/300x300/dc143c/ffffff?text=Vinyl',
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-4',
    name: 'The Drinkers Cap',
    price: 20.00,
    category: 'Kape',
    image: 'https://via.placeholder.com/300x300/000000/ffffff?text=Cap',
    colors: ['Black', 'Navy'],
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Beer Mug',
    price: 15.00,
    category: 'Dodatki',
    image: 'https://via.placeholder.com/300x300/dc143c/ffffff?text=Mug',
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'Recidiv CD',
    price: 12.00,
    category: 'CD-ji',
    image: 'https://via.placeholder.com/300x300/ff3333/ffffff?text=CD',
    inStock: false,
  },
];

const categories = ['Vsi', 'Majice', 'Hoodies', 'Vinyl', 'Kape', 'Dodatki', 'CD-ji'];

export default function MerchScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Vsi');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = selectedCategory === 'Vsi'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    Alert.alert('Dodano v košarico', `${product.name} je dodan v košarico!`);
  }

  function removeFromCart(productId: string) {
    setCart(prev => prev.filter(item => item.id !== productId));
  }

  function updateQuantity(productId: string, delta: number) {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
    Alert.alert('Košarica izpraznjena', 'Vsi izdelki so odstranjeni');
  }

  function checkout() {
    Alert.alert(
      'Zaključek nakupa',
      `Skupaj: €${cartTotal.toFixed(2)}\n\nPreusmerjeni boste na Stripe checkout.`,
      [
        { text: 'Prekliči', style: 'cancel' },
        { text: 'Nakup', onPress: () => Alert.alert('Hvala za nakup!') }
      ]
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(220, 20, 60, 0.9)', 'rgba(10, 10, 10, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>👕 TRGOVINA</Text>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => setShowCart(!showCart)}
          >
            <Ionicons name="shopping-bag" size={24} color="#ffffff" />
            {cartItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerSubtitle}>Uradni merchandise The Drinkers</Text>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Shopping Cart */}
      {showCart && cart.length > 0 && (
        <View style={styles.cartSection}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartTitle}>🛒 KOŠARICA ({cartItems})</Text>
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearCartText}>IZPRAZNI</Text>
            </TouchableOpacity>
          </View>
          
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>€{item.price.toFixed(2)}</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Ionicons name="remove" size={16} color="#ffffff" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Ionicons name="add" size={16} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Ionicons name="close" size={20} color="#dc143c" />
              </TouchableOpacity>
            </View>
          ))}
          
          <View style={styles.cartTotal}>
            <Text style={styles.cartTotalLabel}>Skupaj:</Text>
            <Text style={styles.cartTotalAmount}>€{cartTotal.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton} onPress={checkout}>
            <Text style={styles.checkoutButtonText}>ZAKLJUČI NAKUP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Featured Products */}
      {selectedCategory === 'Vsi' && (
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>⭐ IZPOSTAVLJENO</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.filter(p => p.featured).map((product) => (
              <TouchableOpacity key={product.id} style={styles.featuredCard}>
                <Image source={{ uri: product.image }} style={styles.featuredImage} />
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{product.name}</Text>
                  <Text style={styles.featuredPrice}>€{product.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.featuredButton}
                  onPress={() => addToCart(product)}
                >
                  <Ionicons name="add" size={20} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Products Grid */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'Vsi' ? 'VSI IZDELKI' : selectedCategory.toUpperCase()}
        </Text>
        
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={[styles.productCard, !product.inStock && styles.productCardOutOfStock]}
              activeOpacity={product.inStock ? 0.8 : 1}
            >
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {!product.inStock && (
                  <View style={styles.outOfStockOverlay}>
                    <Text style={styles.outOfStockText}>NI NA ZALOGI</Text>
                  </View>
                )}
                {product.originalPrice && (
                  <View style={styles.saleBadge}>
                    <Text style={styles.saleText}>AKCIJA</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>€{product.price.toFixed(2)}</Text>
                  {product.originalPrice && (
                    <Text style={styles.originalPrice}>€{product.originalPrice.toFixed(2)}</Text>
                  )}
                </View>
                
                {product.inStock ? (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(product)}
                  >
                    <Ionicons name="cart" size={18} color="#ffffff" />
                    <Text style={styles.addButtonText}>DODAJ</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.notifyButton} disabled>
                    <Text style={styles.notifyButtonText}>OBVESTI ME</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Shipping Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="truck" size={24} color="#dc143c" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Brezplačna dostava</Text>
              <Text style={styles.infoText}>Pri naročilih nad €50</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="refresh" size={24} color="#dc143c" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Enostaven povratek</Text>
              <Text style={styles.infoText}>30-dnevna garancija</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark" size={24} color="#dc143c" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Varen nakup</Text>
              <Text style={styles.infoText}>Šifrirano plačevanje</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Newsletter */}
      <View style={styles.newsletterSection}>
        <Ionicons name="mail" size={40} color="#dc143c" />
        <Text style={styles.newsletterTitle}>PRIDI NA NEWSLETTER</Text>
        <Text style={styles.newsletterText}>
          10% popust na prvi nakup + obvestila o novem merchu
        </Text>
        <TouchableOpacity style={styles.newsletterButton}>
          <Text style={styles.newsletterButtonText}>PRIJAVI SE</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 The Drinkers</Text>
        <Text style={styles.footerText}>Uradni merchandise 🍺</Text>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
  },
  cartButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dc143c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryScroll: {
    maxHeight: 40,
  },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: '#dc143c',
  },
  categoryText: {
    color: '#cccccc',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  cartSection: {
    margin: 20,
    marginTop: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#dc143c',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  clearCartText: {
    color: '#dc143c',
    fontWeight: '600',
    fontSize: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc143c',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#dc143c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    marginTop: 10,
  },
  cartTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cartTotalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc143c',
  },
  checkoutButton: {
    backgroundColor: '#dc143c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  featuredCard: {
    width: 200,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc143c',
  },
  featuredButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dc143c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productsSection: {
    padding: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  productCardOutOfStock: {
    opacity: 0.6,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  outOfStockOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outOfStockText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saleBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#dc143c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  saleText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    height: 40,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc143c',
  },
  originalPrice: {
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'line-through',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#dc143c',
    padding: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  notifyButton: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  notifyButtonText: {
    color: '#666666',
    fontWeight: '600',
    fontSize: 14,
  },
  infoSection: {
    padding: 20,
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
  },
  newsletterSection: {
    margin: 20,
    padding: 30,
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
    marginTop: 15,
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
