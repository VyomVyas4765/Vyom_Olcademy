import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useCart } from '../src/context/CartContext';
import { C } from '../constants/Colors';

const TABS = [
  { label: 'Home',    icon: 'home',          route: '/(tabs)' },
  { label: 'Cart',    icon: 'shopping-cart', route: '/cart' },
  { label: 'Summary', icon: 'receipt',       route: '/order-summary' },
  { label: 'Profile', icon: 'person',        route: '/profile' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const isActive = (route) => {
    if (!route) return false;
    if (route === '/(tabs)') return pathname === '/' || pathname === '/index';
    return pathname.startsWith(route);
  };

  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const active = isActive(tab.route);
        const isCart = tab.label === 'Cart';
        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tab}
            onPress={() => tab.route && router.push(tab.route)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrap}>
              <MaterialIcons
                name={tab.icon}
                size={24}
                color={active ? C.primaryContainer : C.onSurfaceVariant}
              />
              {/* Cart badge */}
              {isCart && itemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeTxt}>{itemCount > 9 ? '9+' : itemCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
            {active && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderTopWidth: 1,
    borderTopColor: C.surfaceVariant,
    paddingBottom: 20,   // safe area padding for home indicator
    paddingTop: 10,
    shadowColor: C.primaryContainer,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
  },
  iconWrap: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: C.secondary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: C.onSecondary,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: C.onSurfaceVariant,
  },
  labelActive: {
    color: C.primaryContainer,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: C.primaryContainer,
  },
});
