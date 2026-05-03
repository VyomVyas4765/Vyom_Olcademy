import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useCart } from '../src/context/CartContext';
import { C } from '../constants/Colors';
import BottomNav from '../components/BottomNav';

export default function ConfirmationScreen() {
  const { orderId } = useLocalSearchParams();
  const { clearCart, deliveryAddress } = useCart();

  // Pulse animation for the success ring
  const pulse = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in the whole screen
    Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    // Pulse the ring
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleBackToHome = () => {
    clearCart();
    router.replace('/(tabs)');
  };

  const shortId = orderId ? String(orderId).slice(0, 8).toUpperCase() : 'SK-00000';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.background} />

      {/* Background blobs */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      <Animated.ScrollView style={{ flex: 1, opacity: fadeIn }} contentContainerStyle={styles.content}>

        {/* Success illustration */}
        <View style={styles.illustrationWrap}>
          <Animated.View style={[styles.outerRing, { transform: [{ scale: pulse }] }]} />
          <View style={styles.innerRing} />
          <View style={styles.checkCircle}>
            <MaterialIcons name="check-circle" size={72} color={C.onPrimaryContainer} />
          </View>
        </View>

        {/* Header text */}
        <Text style={styles.headline}>Order Placed{'\n'}Successfully!</Text>
        <Text style={styles.subline}>Your feast is being prepared with love.</Text>

        {/* Order details card */}
        <View style={styles.detailsCard}>
          {/* Order ID */}
          <View style={styles.detailRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialIcons name="receipt" size={20} color={C.onSurfaceVariant} />
              <Text style={styles.detailLabel}>Order ID</Text>
            </View>
            <Text style={styles.orderId}>#{shortId}</Text>
          </View>

          <View style={styles.divider} />

          {/* Estimated delivery */}
          <View style={styles.etaRow}>
            <View style={styles.etaIconWrap}>
              <MaterialIcons name="schedule" size={22} color={C.primary} />
            </View>
            <View>
              <Text style={styles.etaLabel}>ESTIMATED ARRIVAL</Text>
              <Text style={styles.etaTime}>35 – 45 mins</Text>
              <Text style={styles.etaAddress} numberOfLines={1}>Delivering to {deliveryAddress?.replace(/\n/g, ', ')}</Text>
            </View>
          </View>
        </View>

        {/* Notification hint */}
        <View style={styles.notifBanner}>
          <MaterialIcons name="notifications-active" size={22} color={C.secondary} />
          <Text style={styles.notifTxt}>
            We'll send you notifications as your order progresses.
          </Text>
        </View>

        {/* Back to Home */}
        <TouchableOpacity style={styles.homeBtn} onPress={handleBackToHome}>
          <MaterialIcons name="home" size={22} color={C.onPrimary} />
          <Text style={styles.homeBtnTxt}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  blob1: {
    position: 'absolute', width: 300, height: 300,
    borderRadius: 150, backgroundColor: C.primaryContainer + '33',
    top: '10%', alignSelf: 'center',
  },
  blob2: {
    position: 'absolute', width: 240, height: 240,
    borderRadius: 120, backgroundColor: C.secondaryContainer + '22',
    bottom: '15%', alignSelf: 'center',
  },
  content: {
    flexGrow: 1, paddingHorizontal: 24, paddingTop: 32,
    paddingBottom: 16, alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationWrap: {
    width: 180, height: 180,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
  },
  outerRing: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: C.primaryContainer + '33',
  },
  innerRing: {
    position: 'absolute', width: 140, height: 140, borderRadius: 70,
    backgroundColor: C.primaryContainer + '60',
  },
  checkCircle: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: C.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 8,
  },
  headline: {
    fontSize: 30, fontWeight: '800', color: C.onSurface,
    textAlign: 'center', letterSpacing: -0.5, lineHeight: 36, marginBottom: 10,
  },
  subline: { fontSize: 15, color: C.onSurfaceVariant, fontWeight: '500', textAlign: 'center', marginBottom: 28 },
  detailsCard: {
    width: '100%', backgroundColor: C.surfaceContainerLowest, borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: C.surfaceVariant,
    shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 12, elevation: 2,
    marginBottom: 16,
  },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16 },
  detailLabel: { fontSize: 14, color: C.onSurfaceVariant },
  orderId: { fontSize: 18, fontWeight: '700', color: C.onSurface },
  divider: { height: 1, backgroundColor: C.surfaceVariant, marginBottom: 16 },
  etaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  etaIconWrap: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: C.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  etaLabel: { fontSize: 10, fontWeight: '700', color: C.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  etaTime: { fontSize: 22, fontWeight: '700', color: C.primary },
  etaAddress: { fontSize: 13, color: C.onSurfaceVariant, marginTop: 2 },
  notifBanner: {
    width: '100%', backgroundColor: C.surfaceContainerLow, borderRadius: 12,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24,
  },
  notifTxt: { flex: 1, fontSize: 13, color: C.onSurface, lineHeight: 18 },
  homeBtn: {
    width: '100%', backgroundColor: C.primary, borderRadius: 14,
    paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    shadowColor: C.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 5,
  },
  homeBtnTxt: { fontSize: 16, fontWeight: '700', color: C.onPrimary },
});
