import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

// Pre-computed barcode pattern to avoid Math.random() in render
const BARCODE_BARS = [3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2];

interface HeroSectionProps {
  onContact: () => void;
  onPortfolio: () => void;
}

export default function HeroSection({ onContact, onPortfolio }: HeroSectionProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.section}>
      <Animated.View
        style={[styles.cardWrapper, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        {/* Lanyard */}
        <View style={styles.lanyardWrapper}>
          <View style={styles.lanyardRope} />
          <View style={styles.lanyardHook} />
        </View>

        {/* ID Card */}
        <View style={styles.idCard}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.orgRow}>
              <FontAwesome5 name="code" size={12} color={Colors.accent} />
              <Text style={styles.orgText}>Personal Profile</Text>
            </View>
            <Text style={styles.idNumber}>ID #YP-001</Text>
          </View>

          {/* Body */}
          <View style={styles.cardBody}>
            <View style={styles.photoCol}>
              <View style={styles.photoFrame}>
                <Image
                  source={require('../../assets/hero_img.jpg')}
                  style={styles.photo}
                />
              </View>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>ACTIVE</Text>
              </View>
            </View>

            <View style={styles.infoCol}>
              <Text style={styles.name}>Yuko Pangestu</Text>
              <Text style={styles.role}>Technical Lead</Text>
              <Text style={styles.dept}>Software Engineering</Text>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <FontAwesome5 name="map-marker-alt" size={10} color={Colors.accent} />
                <Text style={styles.detailText}>Jakarta, Indonesia</Text>
              </View>
              <View style={styles.detailRow}>
                <FontAwesome5 name="envelope" size={10} color={Colors.accent} />
                <Text style={styles.detailText} numberOfLines={1}>
                  yuko.pangestu@gmail.com
                </Text>
              </View>
              <View style={styles.skillTags}>
                {['Go', 'PHP', 'Vue.js', 'MySQL'].map(tag => (
                  <View key={tag} style={styles.skillTag}>
                    <Text style={styles.skillTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.cardFooter}>
            <View style={styles.barcode}>
              <View style={styles.barcodeImg}>
                {BARCODE_BARS.map((w, i) => (
                  <View
                    key={i}
                    style={[styles.barcodeLine, { width: w, marginHorizontal: 1 }]}
                  />
                ))}
              </View>
              <Text style={styles.barcodeText}>YP · 2024 · PAPER.ID</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnPrimary} onPress={onContact}>
                <FontAwesome5 name="envelope" size={11} color={Colors.white} />
                <Text style={styles.btnPrimaryText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnOutline} onPress={onPortfolio}>
                <FontAwesome5 name="folder" size={11} color={Colors.primaryBlue} />
                <Text style={styles.btnOutlineText}>Portfolio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.veryLightBlue,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cardWrapper: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
  },
  lanyardWrapper: {
    alignItems: 'center',
    height: 50,
  },
  lanyardRope: {
    width: 2,
    height: 36,
    backgroundColor: Colors.primaryBlue,
    opacity: 0.4,
  },
  lanyardHook: {
    width: 12,
    height: 8,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: Colors.primaryBlue,
    opacity: 0.4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  idCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.darkBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  cardHeader: {
    backgroundColor: Colors.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  orgRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
  idNumber: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 16,
    gap: 14,
  },
  photoCol: {
    alignItems: 'center',
    gap: 8,
  },
  photoFrame: {
    width: 90,
    height: 110,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.lightBlue,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.green,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.green,
    letterSpacing: 1,
    marginLeft: 4,
  },
  infoCol: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.darkBlue,
    marginBottom: 2,
  },
  role: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryBlue,
    marginBottom: 1,
  },
  dept: {
    fontSize: 11,
    color: Colors.gray,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderGray,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 10,
    color: Colors.gray,
    marginLeft: 6,
    flexShrink: 1,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  skillTagText: {
    fontSize: 10,
    color: Colors.primaryBlue,
    fontWeight: '600',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barcode: {
    alignItems: 'center',
  },
  barcodeImg: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'flex-end',
    marginBottom: 3,
  },
  barcodeLine: {
    height: '100%',
    backgroundColor: Colors.dark,
    opacity: 0.7,
  },
  barcodeText: {
    fontSize: 8,
    color: Colors.gray,
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: Colors.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    gap: 5,
  },
  btnPrimaryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    gap: 5,
  },
  btnOutlineText: {
    color: Colors.primaryBlue,
    fontSize: 12,
    fontWeight: '600',
  },
});
