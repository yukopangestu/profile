import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Colors } from '../constants/colors';
import { portfolioItems } from '../data';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export default function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 12));
    setActiveIndex(index);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Portfolio Showcase</Text>
      <Text style={styles.subtitle}>Featured projects and achievements</Text>

      <FlatList
        ref={flatListRef}
        data={portfolioItems}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {portfolioItems.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 48,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.darkBlue,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryBlue,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.darkBlue,
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: Colors.lightGray,
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.gray,
    lineHeight: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
    paddingHorizontal: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderGray,
  },
  dotActive: {
    backgroundColor: Colors.primaryBlue,
    width: 24,
  },
});
