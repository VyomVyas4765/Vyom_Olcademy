import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, TextInput, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCart } from '../src/context/CartContext';
import { useOrder } from '../src/hooks/useOrder';
import { C } from '../constants/Colors';
import BottomNav from '../components/BottomNav';

export default function OrderSummaryScreen() {
  const { items, totalPrice, clearCart, deliveryAddress, setDeliveryAddress } = useCart();
  const { submitOrder, loading } = useOrder();
  const params = useLocalSearchParams();
  const [notes, setNotes] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const grandTotal = Number(params.total ?? totalPrice);

  const handlePlaceOrder = async () => {
    try {
      const orderId = await submitOrder(items, grandTotal, notes, deliveryAddress);
      clearCart();
      router.replace({ pathname: '/confirmation', params: { orderId } });
    } catch (e) {
      // error shown via useOrder's error state
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.surfaceContainerLowest} />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={C.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={{ width: 24 }} />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Delivery Address */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => setIsEditingAddress(!isEditingAddress)}>
              <Text style={styles.editTxt}>{isEditingAddress ? 'Done' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressRow}>
            <MaterialIcons name="location-on" size={20} color={C.primary} style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.addressTitle}>Home</Text>
              {isEditingAddress ? (
                <TextInput
                  style={[styles.addressSub, { padding: 0, borderBottomWidth: 1, borderBottomColor: C.primary, minHeight: 40 }]}
                  value={deliveryAddress}
                  onChangeText={setDeliveryAddress}
                  multiline
                  autoFocus
                />
              ) : (
                <Text style={styles.addressSub}>{deliveryAddress}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Order Items */}
        <Text style={styles.sectionTitle}>Your Order</Text>
        <View style={{ gap: 10 }}>
          {items.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemThumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemFooterRow}>
                  <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyTxt}>×{item.quantity}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addMoreBtn} onPress={() => router.back()}>
          <MaterialIcons name="add-circle" size={18} color={C.primary} />
          <Text style={styles.addMoreTxt}>Add More Items</Text>
        </TouchableOpacity>

        {/* Special Instructions */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <MaterialIcons name="edit" size={20} color={C.outline} />
            <Text style={styles.cardTitle}>Special Instructions</Text>
          </View>
          <TextInput
            style={styles.notesInput}
            placeholder="Any allergies or special requests?"
            placeholderTextColor={C.onSurfaceVariant}
            multiline
            numberOfLines={3}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        {/* Bill */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { marginBottom: 14 }]}>Bill Summary</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billVal}>₹{totalPrice}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billVal}>₹49</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes & Charges</Text>
            <Text style={styles.billVal}>₹{Math.round(totalPrice * 0.09)}</Text>
          </View>
          <View style={styles.billDivider} />
          <View style={styles.billRow}>
            <Text style={styles.grandLabel}>Grand Total</Text>
            <Text style={styles.grandVal}>₹{grandTotal}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Place Order */}
      <SafeAreaView edges={['bottom']} style={styles.placeOrderBar}>
        <TouchableOpacity style={[styles.placeOrderBtn, loading && { opacity: 0.6 }]} onPress={handlePlaceOrder} disabled={loading}>
          <Text style={styles.placeOrderLeft}>{loading ? 'Placing Order...' : 'Place Order'}</Text>
          {!loading && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.placeOrderRight}>₹{grandTotal}</Text>
              <MaterialIcons name="arrow-forward" size={20} color={C.onPrimaryContainer} />
            </View>
          )}
        </TouchableOpacity>
      </SafeAreaView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: C.surfaceContainerLowest,
    borderBottomWidth: 1, borderBottomColor: C.surfaceVariant,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: C.onSurface },
  content: { paddingHorizontal: 20, paddingTop: 16, gap: 16 },
  card: {
    backgroundColor: C.surfaceContainerLowest, borderRadius: 14, padding: 16,
    shadowColor: C.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 1,
    borderWidth: 1, borderColor: C.surfaceVariant + '80',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.onSurface },
  editTxt: { fontSize: 12, fontWeight: '700', color: C.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  addressRow: { flexDirection: 'row', gap: 8 },
  addressTitle: { fontSize: 14, fontWeight: '700', color: C.onSurface },
  addressSub: { fontSize: 13, color: C.onSurfaceVariant, lineHeight: 20, marginTop: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: C.onSurface, paddingHorizontal: 2 },
  orderItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.surfaceContainerLowest, borderRadius: 12, padding: 10,
    borderWidth: 1, borderColor: C.surfaceVariant + '80',
    shadowColor: C.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 1,
  },
  itemThumb: { width: 78, height: 78, borderRadius: 10, resizeMode: 'cover' },
  itemName: { fontSize: 14, fontWeight: '700', color: C.onSurface, marginBottom: 6 },
  itemFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemPrice: { fontSize: 15, fontWeight: '700', color: C.primary },
  qtyBadge: { backgroundColor: C.surfaceContainerHigh, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  qtyTxt: { fontSize: 12, fontWeight: '700', color: C.onSurface },
  addMoreBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: C.primary + '44',
    borderRadius: 12,
  },
  addMoreTxt: { fontSize: 12, fontWeight: '700', color: C.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  notesInput: {
    backgroundColor: C.surfaceContainerLow, borderRadius: 10, padding: 12,
    fontSize: 14, color: C.onSurface, minHeight: 80,
  },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  billLabel: { fontSize: 14, color: C.onSurfaceVariant },
  billVal: { fontSize: 14, fontWeight: '600', color: C.onSurface },
  billDivider: { height: 1, backgroundColor: C.surfaceVariant, marginVertical: 10 },
  grandLabel: { fontSize: 17, fontWeight: '700', color: C.onSurface },
  grandVal: { fontSize: 18, fontWeight: '800', color: C.primary },
  placeOrderBar: {
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8,
    backgroundColor: C.surfaceContainerLowest,
    borderTopWidth: 1, borderTopColor: C.surfaceVariant,
  },
  placeOrderBtn: {
    backgroundColor: C.primaryContainer, borderRadius: 14,
    paddingVertical: 16, paddingHorizontal: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6,
  },
  placeOrderLeft: { fontSize: 16, fontWeight: '700', color: C.onPrimaryContainer },
  placeOrderRight: { fontSize: 16, fontWeight: '700', color: C.onPrimaryContainer },
});
