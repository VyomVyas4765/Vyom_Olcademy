import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { C } from '../constants/Colors';
import BottomNav from '../components/BottomNav';

export default function ProfileScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.surfaceContainerLowest} />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color={C.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.headerAvatarWrap}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYismkIcteHaL_LtbTQAQqJhb_u5kcNTNj68yC0XOLoSbJNZVb9pZ2KroDiF0ekV3c4zhuMj8MrhWDErztGs8M6ZdbokA0RC1uriUPgtCSn5Kyg7VX-llcuT7w4eUYaMA5GnYlltlDnsOnL9ELXJNdNGBlAVP7SQbbkzjmqSruZuxCuYsjE5ekuF-tGQRMJtS8X7dOnWN81haMQWBcKa9Q1jRRGwRl7bR67Yzr-KfLhE3cEOa8xOj9ypDtFAf0I-4CnJAhJDiA9yQ_' }}
            style={styles.headerAvatar}
          />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* User Identity */}
        <View style={styles.identitySection}>
          <View style={styles.profileImageWrap}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1FbC2yFvG3ntAjt2WWP2QMrtc8VHBTTBV1YgW4c_x9BE_7S6OVViV4CnY7hFXhu5aJfV4XrvjaVpJ1kQoK-uT80ArvsOuIx__iAAC4YPSGY3mMBmMJz8YRwwDRlovnPGsKckkszXWVOolHWKRVNuGJor73hqLIK6gDfPrRpsMlLEuneaCGaoEyc8dV5SDSarLjZHzDDRqQ8i-FLMjMLFCNiFEmXQ5kSctbTxooRteFk7Vhk9SwWQoHxJJ801HPqzwz9pYlj-6A7EO' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editBtn}>
              <MaterialIcons name="edit" size={16} color={C.onPrimaryContainer} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Arjun Kapoor</Text>
          <Text style={styles.userEmail}>arjun.k@example.com</Text>
          <View style={styles.badgeWrap}>
            <MaterialIcons name="stars" size={18} color={C.primaryContainer} />
            <Text style={styles.badgeTxt}>PREMIUM MEMBER</Text>
          </View>
        </View>

        {/* Options Grid */}
        <View style={styles.grid}>
          {/* My Orders */}
          <TouchableOpacity style={styles.cardHalf}>
            <View style={styles.cardIconRow}>
              <View style={[styles.iconWrap, { backgroundColor: C.primaryContainer + '33' }]}>
                <MaterialIcons name="restaurant-menu" size={24} color={C.primaryContainer} />
              </View>
              <MaterialIcons name="chevron-right" size={20} color={C.outlineVariant} />
            </View>
            <Text style={styles.cardTitle}>My Orders</Text>
            <Text style={styles.cardSub}>Track & reorder</Text>
          </TouchableOpacity>

          {/* Saved Addresses */}
          <TouchableOpacity style={styles.cardHalf}>
            <View style={styles.cardIconRow}>
              <View style={styles.iconWrap}>
                <MaterialIcons name="location-on" size={24} color={C.onSurfaceVariant} />
              </View>
              <MaterialIcons name="chevron-right" size={20} color={C.outlineVariant} />
            </View>
            <Text style={styles.cardTitle}>Saved Addresses</Text>
            <Text style={styles.cardSub}>Home, Work</Text>
          </TouchableOpacity>

          {/* Payment Methods */}
          <TouchableOpacity style={styles.cardHalf}>
            <View style={styles.cardIconRow}>
              <View style={styles.iconWrap}>
                <MaterialIcons name="payments" size={24} color={C.onSurfaceVariant} />
              </View>
              <MaterialIcons name="chevron-right" size={20} color={C.outlineVariant} />
            </View>
            <Text style={styles.cardTitle}>Payment Methods</Text>
            <Text style={styles.cardSub}>Cards, UPI</Text>
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity style={styles.cardHalf}>
            <View style={styles.cardIconRow}>
              <View style={styles.iconWrap}>
                <MaterialIcons name="notifications" size={24} color={C.onSurfaceVariant} />
              </View>
              <MaterialIcons name="chevron-right" size={20} color={C.outlineVariant} />
            </View>
            <Text style={styles.cardTitle}>Notifications</Text>
            <Text style={styles.cardSub}>Offers, Updates</Text>
          </TouchableOpacity>

          {/* Help & Support (Full Width) */}
          <TouchableOpacity style={styles.cardFull}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 }}>
              <View style={[styles.iconWrap, { backgroundColor: C.secondaryFixed }]}>
                <MaterialIcons name="support-agent" size={24} color={C.secondary} />
              </View>
              <View>
                <Text style={styles.cardTitle}>Help & Support</Text>
                <Text style={styles.cardSub}>Chat with us</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={C.outlineVariant} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialIcons name="logout" size={20} color={C.secondary} />
          <Text style={styles.logoutTxt}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

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
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: C.primary, letterSpacing: -0.5 },
  headerAvatarWrap: { width: 32, height: 32, borderRadius: 16, overflow: 'hidden' },
  headerAvatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 },
  identitySection: { alignItems: 'center', marginBottom: 32 },
  profileImageWrap: { width: 112, height: 112, borderRadius: 56, borderWidth: 4, borderColor: C.surfaceContainerLowest, shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.2, shadowRadius: 30, elevation: 6, marginBottom: 16, position: 'relative' },
  profileImage: { width: '100%', height: '100%', borderRadius: 56, resizeMode: 'cover' },
  editBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: C.primaryContainer, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.surfaceContainerLowest },
  userName: { fontSize: 32, fontWeight: '800', color: C.onSurface, marginBottom: 4 },
  userEmail: { fontSize: 14, color: C.onSurfaceVariant, marginBottom: 16 },
  badgeWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.surfaceContainerLow, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  badgeTxt: { fontSize: 12, fontWeight: '700', color: C.onSurface, letterSpacing: 0.5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  cardHalf: { width: '47%', backgroundColor: C.surfaceContainerLowest, borderRadius: 16, padding: 16, shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 1 },
  cardIconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  iconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: C.onSurface, marginBottom: 4 },
  cardSub: { fontSize: 12, color: C.onSurfaceVariant },
  cardFull: { width: '100%', backgroundColor: C.surfaceContainerLowest, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 1 },
  logoutBtn: { width: '100%', marginTop: 24, paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: C.secondary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  logoutTxt: { fontSize: 16, fontWeight: '600', color: C.secondary },
});
