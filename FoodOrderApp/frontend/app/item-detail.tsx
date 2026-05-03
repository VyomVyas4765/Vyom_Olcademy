import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, StatusBar, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCart } from '../src/context/CartContext';
import { C } from '../constants/Colors';
import BottomNav from '../components/BottomNav';

const ADD_ONS = [
  {
    id: 'naan', name: 'Garlic Naan', price: 49,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDDnEmd9KD5xucV8XJolIOgc-98jb0U3nwgCQX8MFBuWtdH52oSxK-F_BvaiTWX59sOruZYXOO2WnEQPxKUzbOhKrA4ETG6kCqrlSuClrEs7hUxwjuSm-oLzToIvTd7899483Mi9t-qdFpi_X0KYOMFaPxM_sSghPvxG-nps6LqjTinioNwDRH_ExcIrmddzokvfx70JW89EroVjs-bSWHezn4ChyQQ71FZV2-N_CykK0XBDOhu4tMDVyQ-oEbnwItwugmAINL4KPZ',
  },
  {
    id: 'rice', name: 'Jeera Rice', price: 59,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL6Biax83e_hwhnqtVM2ExQP7U_JS6O35t7RIIHKk72M12_5a-vIBj_aIMe1yUnlBW_aYF2pkorfu4z9Y2bi1aV8i9CtJ3iv_xPAcP1IGCUXAJfxidZiB8vgiS9IoVCA3r-vMMNrFZ7ekRLRTGcOa_SgZzAcyCOBU7fLznH7FqVqRux87fUPr-m-31s7cDItRd08dmo9rXSr0izVaRDqJ0ARo7LmvcDEkugkSh3ko8_I_r38j0JgBRCMXjC_ZEjd3eaL3qwmOt8X7j',
  },
];

export default function ItemDetailScreen() {
  const params = useLocalSearchParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedAddon, setSelectedAddon] = useState(null);

  // Parse params (they come as strings from route)
  const item = useMemo(() => ({
    id: String(params.id || ''),
    name: String(params.name || 'Item'),
    price: Number(params.price || 0),
    category: String(params.category || ''),
    description: String(params.description || ''),
    imageUrl: String(params.imageUrl || ''),
    prepTime: String(params.prepTime || ''),
    rating: Number(params.rating || 0),
  }), [params]);

  const addonPrice = selectedAddon ? ADD_ONS.find(a => a.id === selectedAddon)?.price ?? 0 : 0;
  const total = (item.price + addonPrice) * qty;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price + addonPrice,
      imageUrl: item.imageUrl,
      quantity: qty,
    });
    router.back();
  };

  if (!item.id) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={C.primary} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: item.imageUrl }} style={styles.heroImage} />
          <View style={styles.heroGradient} />
          {/* Back & Favourite overlay */}
          <SafeAreaView style={styles.heroOverlay} edges={['top']}>
            <TouchableOpacity style={styles.overlayBtn} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.overlayBtn}>
              <MaterialIcons name="favorite-border" size={22} color="#fff" />
            </TouchableOpacity>
          </SafeAreaView>
          {/* Veg indicator */}
          <View style={[styles.dietIndicator, { top: 80, left: 20 }]}>
            <View style={styles.vegDot} />
          </View>
        </View>

        {/* Details */}
        <View style={styles.details}>
          {/* Title & Price */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={18} color={C.primary} />
                <Text style={styles.ratingTxt}> {item.rating} (245 Reviews)</Text>
              </View>
            </View>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {[item.category, item.prepTime].filter(Boolean).map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagTxt}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.desc}>{item.description}</Text>

          {/* Add-ons */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Frequently Ordered With</Text>
          <View style={styles.addonsGrid}>
            {ADD_ONS.map(addon => {
              const active = selectedAddon === addon.id;
              return (
                <TouchableOpacity
                  key={addon.id}
                  style={[styles.addonCard, active && styles.addonCardActive]}
                  onPress={() => setSelectedAddon(active ? null : addon.id)}
                >
                  <Image source={{ uri: addon.imageUrl }} style={styles.addonImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.addonName}>{addon.name}</Text>
                    <Text style={styles.addonPrice}>+₹{addon.price}</Text>
                  </View>
                  <View style={[styles.addonCheck, active && styles.addonCheckActive]}>
                    {active && <MaterialIcons name="check" size={14} color={C.onPrimary} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
        {/* Qty selector */}
        <View style={styles.qtySel}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => Math.max(1, q - 1))}>
            <MaterialIcons name="remove" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text style={styles.qtyTxt}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => q + 1)}>
            <MaterialIcons name="add" size={20} color={C.primary} />
          </TouchableOpacity>
        </View>

        {/* Add to Cart */}
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartTxt}>Add to Cart</Text>
          <Text style={styles.addToCartTxt}>₹{total}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  heroWrap: { width: '100%', aspectRatio: 4 / 3, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroGradient: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '33%',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heroOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 8,
  },
  overlayBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  dietIndicator: {
    position: 'absolute', width: 20, height: 20, backgroundColor: C.surfaceContainerLowest,
    borderRadius: 3, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#16A34A',
  },
  vegDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#16A34A' },
  details: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  itemName: { fontSize: 26, fontWeight: '800', color: C.onSurface, letterSpacing: -0.5 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingTxt: { fontSize: 12, fontWeight: '700', color: C.primary },
  itemPrice: { fontSize: 26, fontWeight: '800', color: C.primary },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: C.surfaceContainer, borderRadius: 999 },
  tagTxt: { fontSize: 11, fontWeight: '600', color: C.onSurfaceVariant },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.onSurface, marginBottom: 8 },
  desc: { fontSize: 14, color: C.onSurfaceVariant, lineHeight: 22 },
  addonsGrid: { gap: 10 },
  addonCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.surfaceContainerLowest, borderRadius: 12, padding: 10,
    borderWidth: 1, borderColor: C.outlineVariant,
  },
  addonCardActive: { borderColor: C.primary, shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 },
  addonImage: { width: 60, height: 60, borderRadius: 10, resizeMode: 'cover' },
  addonName: { fontSize: 12, fontWeight: '700', color: C.onSurface },
  addonPrice: { fontSize: 13, fontWeight: '700', color: C.primary, marginTop: 4 },
  addonCheck: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 1, borderColor: C.outline,
    alignItems: 'center', justifyContent: 'center',
  },
  addonCheckActive: { backgroundColor: C.primary, borderColor: C.primary },
  bottomBar: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 10,
    backgroundColor: C.surface,
    borderTopWidth: 1, borderTopColor: C.surfaceVariant,
  },
  qtySel: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: C.surfaceContainer, borderRadius: 999,
    paddingHorizontal: 6, paddingVertical: 4,
  },
  qtyBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  qtyTxt: { fontSize: 18, fontWeight: '700', color: C.onSurface, width: 30, textAlign: 'center' },
  addToCartBtn: {
    flex: 1, backgroundColor: C.primary, borderRadius: 14,
    paddingVertical: 16, paddingHorizontal: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: C.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  addToCartTxt: { fontSize: 14, fontWeight: '700', color: C.onPrimary, textTransform: 'uppercase' },
});