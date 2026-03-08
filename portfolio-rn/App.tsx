import React, { useRef, useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from 'react-native';
import Header from './src/components/Header';
import HeroSection from './src/components/HeroSection';
import SkillsSection from './src/components/SkillsSection';
import AboutSection from './src/components/AboutSection';
import PortfolioSection from './src/components/PortfolioSection';
import ExperienceSection from './src/components/ExperienceSection';
import ContactSection from './src/components/ContactSection';
import { Colors } from './src/constants/colors';

type Section = 'home' | 'skills' | 'about' | 'portfolio' | 'experience' | 'contact';

export default function App() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [offsets, setOffsets] = useState<Partial<Record<Section, number>>>({});

  const setOffset = (section: Section) => (e: LayoutChangeEvent) => {
    setOffsets(prev => ({ ...prev, [section]: e.nativeEvent.layout.y }));
  };

  const scrollToSection = (section: Section) => {
    const offset = offsets[section];
    if (offset !== undefined) {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, offset - 8), animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlue} />
      <Header onNavigate={scrollToSection} />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View onLayout={setOffset('home')}>
          <HeroSection
            onContact={() => scrollToSection('contact')}
            onPortfolio={() => scrollToSection('portfolio')}
          />
        </View>
        <View onLayout={setOffset('skills')}>
          <SkillsSection />
        </View>
        <View onLayout={setOffset('about')}>
          <AboutSection />
        </View>
        <View onLayout={setOffset('portfolio')}>
          <PortfolioSection />
        </View>
        <View onLayout={setOffset('experience')}>
          <ExperienceSection />
        </View>
        <View onLayout={setOffset('contact')}>
          <ContactSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
