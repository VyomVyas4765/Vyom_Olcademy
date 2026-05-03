import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView,
  FlatList, Image, TouchableOpacity, StatusBar, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import { router } from 'expo-router';
import { useMenu } from '../../src/hooks/useMenu';
import { useCart } from '../../src/context/CartContext';
import { C } from '../../constants/Colors';

export default function HomeScreen() {
  const { items, loading, error } = useMenu();
  const { itemCount, totalPrice, addItem, deliveryAddress } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories from items + 'All'
  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];

  const filteredItems = items.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const renderCard = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.card, index % 2 === 0 ? { marginRight: 6 } : { marginLeft: 6 }]}
      onPress={() =>
        router.push({
          pathname: '/item-detail',
          params: {
            id: item.id,
            name: item.name,
            price: String(item.price),
            category: item.category,
            description: item.description,
            imageUrl: item.imageUrl,
            prepTime: item.prepTime,
            rating: String(item.rating),
          },
        })
      }
      activeOpacity={0.85}
    >
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardPrice}>₹{item.price}</Text>
        </View>
        <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.cardMeta}>
            <MaterialIcons name="star" size={14} color="#EAB308" />
            <Text style={styles.metaTxt}> {item.rating}</Text>
            <MaterialIcons name="schedule" size={14} color={C.onSurfaceVariant} style={{ marginLeft: 8 }} />
            <Text style={styles.metaTxt}> {item.prepTime}</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addItem({
              id: item.id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl,
              quantity: 1,
            })}
          >
            <MaterialIcons name="add" size={16} color={C.onPrimaryContainer} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]} edges={['top']}>
        <MaterialIcons name="error-outline" size={48} color={C.error} />
        <Text style={{ color: C.error, marginTop: 12, fontSize: 16, fontWeight: '600' }}>Failed to load menu</Text>
        <Text style={{ color: C.onSurfaceVariant, marginTop: 6, textAlign: 'center', paddingHorizontal: 20 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn}>
          <MaterialIcons name="menu" size={24} color={C.onSurfaceVariant} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.logo}>Saffron Kitchen</Text>
          <View style={[styles.locationRow, { maxWidth: '85%' }]}>
            <MaterialIcons name="location-on" size={12} color={C.onSurfaceVariant} />
            <Text style={[styles.locationTxt, { flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">
              Deliver to: {deliveryAddress ? deliveryAddress.split(',')[0].split('\n')[0] : 'Home'}
            </Text>
            <MaterialIcons name="expand-more" size={14} color={C.onSurfaceVariant} />
          </View>
        </View>

        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmaV6utlyp7AVkBZKo3WeDyzWGdU-V2C6LBgDhNI_P8SGTM9HKyTovbgKvTscloQJHm1lkqk1VCRqKWgTz23f5sPNE-ybT45OPexlHjxyjrym-jLCS56DassYi4nt-IF3dEfTAZaVRbKDpYq5H34WTodIdepbxEix8cLyRthwWA_GNwEVIjmw93mhZfGd4IVjslqdw41A4UkRaRzB3i8qlpKRhthc0LvIRkZdXcuIRgK8Z_LAXpfRDTTV5-ryQKLDH8HlYKRVyej2h' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>What are you craving?</Text>
          <Text style={styles.welcomeSub}>Authentic Indian flavors delivered quick.</Text>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color={C.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Butter Chicken, Naan..."
            placeholderTextColor={C.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catContent}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, selectedCategory === cat && styles.catPillActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catTxt, selectedCategory === cat && styles.catTxtActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grid Header */}
        <View style={styles.gridHeader}>
          <Text style={styles.gridTitle}>Popular Right Now</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={styles.seeAll}>See All</Text>
            <MaterialIcons name="arrow-forward" size={14} color={C.primary} />
          </TouchableOpacity>
        </View>

        {/* Grid */}
        {loading ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={C.primary} />
            <Text style={[styles.loadingTxt, { marginTop: 12 }]}>Loading menu...</Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <MaterialIcons name="search-off" size={48} color={C.outlineVariant} />
            <Text style={[styles.loadingTxt, { marginTop: 12 }]}>No items found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
          />
        )}

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Cart FAB */}
      {itemCount > 0 && (
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/cart')}>
          <MaterialIcons name="shopping-bag" size={20} color={C.onSecondary} />
          <View>
            <Text style={styles.fabItemsTxt}>{itemCount} Items</Text>
            <Text style={styles.fabPriceTxt}>₹{totalPrice}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={C.onSecondary} />
        </TouchableOpacity>
      )}
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.surface },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: C.surfaceVariant,
    backgroundColor: C.surface,
  },
  menuBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: 'center' },
  logo: { fontSize: 18, fontWeight: '800', color: C.primaryContainer, letterSpacing: -0.5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 2 },
  locationTxt: { fontSize: 11, color: C.onSurfaceVariant, fontWeight: '600' },
  avatarWrap: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: C.surfaceVariant },
  avatar: { width: '100%', height: '100%' },
  welcomeSection: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 16 },
  welcomeTitle: { fontSize: 28, fontWeight: '800', color: C.onSurface, letterSpacing: -0.5 },
  welcomeSub: { fontSize: 16, color: C.onSurfaceVariant, fontWeight: '500', marginTop: 4 },
  searchBar: {
    marginHorizontal: 20, marginBottom: 16,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.surfaceContainerLow, borderRadius: 12,
    paddingHorizontal: 12, height: 48,
  },
  searchInput: { flex: 1, fontSize: 14, color: C.onSurface },
  catContent: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  catPill: {
    paddingHorizontal: 18, paddingVertical: 10,
    backgroundColor: C.surfaceContainerLowest, borderRadius: 999,
    borderWidth: 1, borderColor: C.surfaceVariant,
  },
  catPillActive: { backgroundColor: C.primaryContainer, borderColor: C.primary },
  catTxt: { fontSize: 12, fontWeight: '700', color: C.onSurfaceVariant },
  catTxtActive: { color: C.onPrimaryContainer },
  gridHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 12,
  },
  gridTitle: { fontSize: 20, fontWeight: '700', color: C.onSurface },
  seeAll: { fontSize: 12, fontWeight: '700', color: C.primary },
  grid: { paddingHorizontal: 14 },
  card: {
    flex: 1, backgroundColor: C.surfaceContainerLowest,
    borderRadius: 12, overflow: 'hidden', marginBottom: 12,
    borderWidth: 1, borderColor: C.surfaceVariant,
    shadowColor: C.primaryContainer,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2,
  },
  cardImageWrap: { width: '100%', aspectRatio: 16 / 9 },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardBody: { padding: 10 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  cardName: { flex: 1, fontSize: 13, fontWeight: '700', color: C.onSurface, marginRight: 4 },
  cardPrice: { fontSize: 11, fontWeight: '700', color: C.primary, backgroundColor: C.primaryFixed + '44', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  cardDesc: { fontSize: 11, color: C.onSurfaceVariant, lineHeight: 15, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardMeta: { flexDirection: 'row', alignItems: 'center' },
  metaTxt: { fontSize: 11, color: C.onSurfaceVariant, fontWeight: '600' },
  addBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: C.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  loadingTxt: { textAlign: 'center', color: C.onSurfaceVariant, fontSize: 14 },
  fab: {
    position: 'absolute', bottom: 90, right: 20,
    backgroundColor: C.secondary, paddingHorizontal: 18, paddingVertical: 12,
    borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 10,
    shadowColor: C.secondary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
  },
  fabItemsTxt: { fontSize: 10, color: C.onSecondary, fontWeight: '600', opacity: 0.85, textTransform: 'uppercase' },
  fabPriceTxt: { fontSize: 14, color: C.onSecondary, fontWeight: '700' },
});