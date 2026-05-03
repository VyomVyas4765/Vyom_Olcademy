import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  FlatList, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '../src/context/CartContext';
import { C } from '../constants/Colors';
import BottomNav from '../components/BottomNav';

const DELIVERY_FEE = 49;
const TAX_RATE = 0.09;

export default function CartScreen() {
  const { items, totalPrice, itemCount, updateQty, removeItem } = useCart();
  const taxes = Math.round(totalPrice * TAX_RATE);
  const grandTotal = totalPrice + DELIVERY_FEE + taxes;

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Image */}
      <View style={styles.itemImageWrap}>
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      </View>

      {/* Info */}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
          {/* Qty stepper */}
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => item.quantity === 1 ? removeItem(item.id) : updateQty(item.id, item.quantity - 1)}
            >
              <MaterialIcons name={item.quantity === 1 ? 'delete' : 'remove'} size={16} color={item.quantity === 1 ? C.error : C.onSurface} />
            </TouchableOpacity>
            <Text style={styles.stepQty}>{item.quantity}</Text>
            <TouchableOpacity style={styles.stepBtn} onPress={() => updateQty(item.id, item.quantity + 1)}>
              <MaterialIcons name="add" size={16} color={C.onSurface} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Delete */}
      <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
        <MaterialIcons name="delete" size={20} color={C.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );

  if (itemCount === 0) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor={C.surfaceContainerLowest} />
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} edges={['top']}>
          <MaterialIcons name="shopping-cart" size={64} color={C.outlineVariant} />
          <Text style={{ fontSize: 20, fontWeight: '700', color: C.onSurface, marginTop: 16 }}>Your cart is empty</Text>
          <TouchableOpacity style={[styles.checkoutBtn, { marginTop: 24 }]} onPress={() => router.back()}>
            <Text style={styles.checkoutTxt}>Browse Menu</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.surfaceContainerLowest} />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={24} color={C.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.cartIconWrap}>
          <MaterialIcons name="shopping-cart" size={22} color={C.primary} />
        </View>
      </SafeAreaView>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        ListFooterComponent={() => (
          <View>
            {/* Add More */}
            <TouchableOpacity style={styles.addMoreBtn} onPress={() => router.back()}>
              <MaterialIcons name="add-circle" size={18} color={C.primary} />
              <Text style={styles.addMoreTxt}>Add More Items</Text>
            </TouchableOpacity>

            {/* Bill Summary */}
            <View style={styles.billCard}>
              <Text style={styles.billTitle}>Bill Summary</Text>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billValue}>₹{totalPrice}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>₹{DELIVERY_FEE}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Taxes & Fees</Text>
                <Text style={styles.billValue}>₹{taxes}</Text>
              </View>
              <View style={styles.billDivider} />
              <View style={styles.billRow}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
              </View>
            </View>

            <View style={{ height: 100 }} />
          </View>
        )}
      />

      {/* Checkout */}
      <SafeAreaView edges={['bottom']} style={styles.checkoutBar}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push({ pathname: '/order-summary', params: { total: grandTotal } })}>
          <Text style={styles.checkoutTxt}>Proceed to Order Summary</Text>
          <MaterialIcons name="arrow-forward" size={20} color={C.onPrimary} />
        </TouchableOpacity>
      </SafeAreaView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  safe: { flex: 1, backgroundColor: C.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: C.surfaceContainerLowest,
    borderBottomWidth: 1, borderBottomColor: C.surfaceVariant,
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: C.primaryContainer },
  cartIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.surfaceContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  list: { paddingHorizontal: 20, paddingTop: 16 },
  cartItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.surfaceContainerLowest, borderRadius: 14, padding: 12,
    marginBottom: 12,
    shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 2,
  },
  itemImageWrap: { width: 90, height: 90, borderRadius: 10, overflow: 'hidden', backgroundColor: C.surfaceContainer },
  itemImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '700', color: C.onSurface, marginBottom: 4 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  itemPrice: { fontSize: 16, fontWeight: '700', color: C.primaryContainer },
  stepper: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.surfaceContainerLow, borderRadius: 999,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  stepBtn: { width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  stepQty: { fontSize: 14, fontWeight: '700', color: C.onSurface, width: 20, textAlign: 'center' },
  deleteBtn: { padding: 4, position: 'absolute', top: 12, right: 12 },
  addMoreBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 14, marginBottom: 16,
    borderWidth: 2, borderStyle: 'dashed', borderColor: C.outlineVariant, borderRadius: 14,
  },
  addMoreTxt: { fontSize: 12, fontWeight: '700', color: C.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  billCard: {
    backgroundColor: C.surfaceContainerLowest, borderRadius: 14, padding: 20,
    shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 2,
  },
  billTitle: { fontSize: 18, fontWeight: '700', color: C.onSurface, marginBottom: 14, borderBottomWidth: 1, borderBottomColor: C.surfaceVariant, paddingBottom: 10 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  billLabel: { fontSize: 14, color: C.onSurfaceVariant },
  billValue: { fontSize: 14, fontWeight: '600', color: C.onSurface },
  billDivider: { height: 1, backgroundColor: C.surfaceVariant, marginVertical: 12 },
  grandTotalLabel: { fontSize: 18, fontWeight: '700', color: C.onSurface },
  grandTotalValue: { fontSize: 22, fontWeight: '800', color: C.primaryContainer },
  checkoutBar: {
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
    backgroundColor: C.surfaceContainerLowest,
    borderTopWidth: 1, borderTopColor: C.surfaceVariant,
  },
  checkoutBtn: {
    backgroundColor: C.primary, borderRadius: 999,
    paddingVertical: 16, paddingHorizontal: 24,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    shadowColor: C.secondary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 5,
  },
  checkoutTxt: { fontSize: 16, fontWeight: '700', color: C.onPrimary },
});
